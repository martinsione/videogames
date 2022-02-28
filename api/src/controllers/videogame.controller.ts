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
  const { name, description, platforms, genres, released, rating, image } =
    req.body;

  const missing: string[] = [];

  if (!name) missing.push("name");
  if (!description) missing.push("description");
  if (!platforms) missing.push("platforms");
  if (!genres) missing.push("genres");

  if (missing.length) {
    return res.status(400).json({ message: `Missing: ${missing.join(", ")}` });
  }

  const game: any = { name, description, platforms };
  if (released) game.released = released;
  if (image) game.image = image;
  if (rating) {
    if (rating < 0 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be a number between 0 and 5" });
    }
    game.rating = rating;
  }

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
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Missing id" });

  try {
    await videogameModel.destroy({ where: { id } });
    res.json({ message: `Item ${id} successfully deleted` });
  } catch (e) {
    return res.status(500).json(e);
  }
};
