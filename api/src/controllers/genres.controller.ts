import axios from "axios";
import type { Request, Response } from "express";
import { genreModel } from "../db";
import type { IGenre, IGenres } from "../types";

const API = "https://api.rawg.io/api/genres";
const { API_KEY } = process.env;

const getGenresFromApi = async (): Promise<IGenres> => {
  const { data }: { data: IGenres } = await axios.get(API, {
    params: { key: API_KEY },
  });
  return data;
};

const getGenresFromDb = async () => {
  const data = await genreModel.findAll({ attributes: ["id", "name"] });
  return data;
};

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genresFromDb = await getGenresFromDb();
    if (genresFromDb.length) {
      return res.json(genresFromDb);
    }

    const genresFromApi = await getGenresFromApi();
    const mappedGenres = genresFromApi.results.map((genre: IGenre) => ({
      name: genre.name,
    }));
    const genres = await genreModel.bulkCreate(mappedGenres);
    res.json(genres);
  } catch (e) {
    res.status(500).json(e);
  }
};
