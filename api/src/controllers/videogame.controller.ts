import axios from "axios";
import type { Request, Response } from "express";
import { Genre, Videogame } from "../models";
import type { IGenre, IPlatform, IVideogame } from "../types";

const API = "https://api.rawg.io/api/games";
const { API_KEY } = process.env;

const getVideogameByIdFromApi = async (id: string): Promise<IVideogame> => {
  const { data }: { data: IVideogame } = await axios.get(`${API}/${id}`, {
    params: { key: API_KEY },
  });
  return data;
};

export const getVideogameById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Missing id" });
  }

  try {
    const data = await getVideogameByIdFromApi(id);
    res.json({
      id: data.id,
      name: data.name,
      description: data.description,
      genre: data.genres.map((genre: IGenre) => genre.name),
      release: data.released,
      rating: data.rating,
      platforms: data.platforms.map(
        (platform: IPlatform) => platform.platform.name
      ),
      image: data.background_image,
    });
  } catch (e) {
    res.status(500).json(e);
  }
};

export const addVideogame = async (req: Request, res: Response) => {
  const { name, description, platforms, genre, released, rating, image } =
    req.body;

  const missing: string[] = [];

  if (!name) missing.push("name");
  if (!description) missing.push("description");
  if (!platforms) missing.push("platforms");
  if (!genre) missing.push("genre");

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

  const [videogame, created] = await Videogame.findOrCreate({
    where: { ...game },
  });

  if (!created) {
    return res.status(400).json({ message: "Videogame already exists" });
  }
  res.json(videogame);
};
