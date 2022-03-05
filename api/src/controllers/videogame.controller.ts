import axios from "axios";
import type { Request, Response } from "express";
import { genreModel, videogameModel } from "../db";
import type { IGenre, IPlatform, IVideogame } from "../types";

const API = "https://api.rawg.io/api/games";
const { API_KEY } = process.env;

const getVideogameByIdFromApi = async (id: string) => {
  const { data }: { data: IVideogame } = await axios.get(`${API}/${id}`, {
    params: { key: API_KEY },
  });

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    genres: data.genres.map((genre: IGenre) => genre.name),
    release: data.released,
    rating: data.rating,
    platforms: data.platforms.map(
      (platform: IPlatform) => platform.platform.name
    ),
    image: data.background_image,
  };
};

const getVideogameByIdFromDb = async (id: string) => {
  const videogame = await videogameModel
    .findByPk(id, {
      include: [
        {
          model: genreModel,
          as: "genres",
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    })
    .then((videogame: any) => videogame.toJSON());

  videogame.genres = videogame.genres.map((genre: IGenre) => genre.name);
  return videogame;
};

const isUUID = (id: string): boolean => {
  const regex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return regex.test(id);
};

export const getVideogameById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Missing id" });

  try {
    if (isUUID(id)) {
      const videogame = await getVideogameByIdFromDb(id);
      return res.json(videogame);
    }
    const videogame = await getVideogameByIdFromApi(id);
    res.json(videogame);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export const addVideogame = async (req: Request, res: Response) => {
  const {
    name,
    description,
    platforms,
    genres,
    release,
    rating,
    image,
    onlyRequired,
  } = req.body;

  const isValidDate = (value: string | number) => {
    const dateWrapper = new Date(value);
    return !isNaN(dateWrapper.getDate());
  };

  interface errors {
    field: string;
    msg: string;
    required: boolean;
  }

  const errors = [];
  if (
    typeof name !== "string" ||
    name?.trim().length < 6 ||
    name?.trim().length > 100
  )
    errors.push({
      field: "name",
      msg: "Name should be an string between 6 and 100 characters",
      required: true,
    });
  if (
    typeof description !== "string" ||
    description?.trim().length < 10 ||
    description?.trim().length > 2000
  ) {
    errors.push({
      field: "description",
      msg: "Description should be an string between 10 and 2000 characters",
      required: true,
    });
  }
  if (
    !platforms ||
    !Array.isArray(platforms) ||
    !platforms.every((item: any) => typeof item === "string")
  ) {
    errors.push({
      field: "platforms",
      msg: "Platforms should be an array of strings",
      required: true,
    });
  }
  if (
    !genres ||
    !Array.isArray(genres) ||
    // Check if it is an array of integers
    genres.some((i: any) => !Number.isInteger(Number(i)))
  ) {
    errors.push({
      field: "genres",
      msg: "Genres should be an array of integers",
      required: true,
    });
  }
  if (rating < 1 || rating > 5 || !Number.isInteger(Number(rating))) {
    errors.push({
      field: "rating",
      msg: "Rating should be an integer between 1 and 5",
      required: false,
    });
  }
  if (!isValidDate(release)) {
    errors.push({
      field: "release",
      msg: "release should be a valid date",
      required: false,
    });
  }
  if (!image) {
    errors.push({
      field: "image",
      msg: "image should be a valid image url",
      required: false,
    });
  }
  const requiredFields = errors.filter((e: errors) => e.required);
  let err: any = [];
  errors.forEach((e) => {
    return (err = { ...err, [e.field]: { msg: e.msg, required: e.required } });
  });
  if ((requiredFields.length && errors.length) || !onlyRequired)
    return res.status(400).json(err);

  const game: any = { name, description, platforms };
  if (release) game.released = release;
  if (rating) game.rating = rating;
  if (image) game.image = image;

  const [videogame, created] = await videogameModel.findOrCreate({
    where: { ...game },
  });

  if (created) {
    await videogame.addGenres(genres);
  }

  const videogameWithGenres = await getVideogameByIdFromDb(videogame.id);
  res.json({ videogame: videogameWithGenres, created: created });
};

export const deleteVideogame = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "Missing id" });

  try {
    await videogameModel.destroy({ where: { id } });
    res.json({ message: `Item ${id} successfully deleted`, success: true });
  } catch (e) {
    return res.status(500).json(e);
  }
};
