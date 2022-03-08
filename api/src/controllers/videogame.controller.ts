import axios from "axios";
import type { Request, Response } from "express";
import { genreModel, videogameModel } from "../db";
import { validateGame } from "../helpers/validateGame";
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
    released: data.released,
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
    released,
    rating,
    image,
    onlyRequired,
  } = req.body;

  const errors = validateGame({ ...req.body });
  const requiredFields = errors.filter((e) => e.required);
  let err: any = [];
  errors.forEach((e) => {
    return (err = { ...err, [e.field]: { msg: e.msg, required: e.required } });
  });
  if ((requiredFields.length && errors.length) || !onlyRequired)
    return res.status(400).json(err);

  const game: any = { name, description, platforms };
  if (released) game.released = released;
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

export const updateVideogame = async (req: Request, res: Response) => {
  const { id, genres, ...attributes } = req.body;
  const errors = validateGame({ ...attributes, genres });
  const requiredFields = errors.filter((e) => e.required);
  let err: any = [];
  errors.forEach((e) => {
    return (err = { ...err, [e.field]: { msg: e.msg, required: e.required } });
  });
  if (requiredFields.length) return res.status(400).json(err);
  try {
    const videogame = await videogameModel.findByPk(id);
    await videogame.setGenres(genres);
    await videogame.update(attributes);
    await videogame.save();
    const videogameWithGenres = await getVideogameByIdFromDb(id);
    res.json(videogameWithGenres);
  } catch (e) {
    res.status(500).json(e);
  }
};
