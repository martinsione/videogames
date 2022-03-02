import axios from "axios";
import type { Request, Response } from "express";
import { Op } from "sequelize";
import { videogameModel } from "../db";
import type { IGenre, IVideogame, IVideogames } from "../types";

const API = "https://api.rawg.io/api/games";
const { API_KEY } = process.env;

const getFromApi = async (name: any) => {
  type Data = { data: IVideogames };
  if (name) {
    return axios
      .get(API, { params: { key: API_KEY, page_size: 15, search: name } })
      .then((response: Data) => {
        return response.data.results.map((game: IVideogame) => ({
          id: game.id,
          name: game.name,
          image: game.background_image,
          genres: game.genres.map((genre: IGenre) => genre.name),
        }));
      });
  } else {
    return Promise.all([
      axios.get(API, { params: { key: API_KEY, page_size: 40 } }),
      axios.get(API, { params: { key: API_KEY, page_size: 40, page: 2 } }),
    ]).then(([page1, page2]: Data[]) => {
      // Concate page 1 and page 2
      const data = page1.data.results.concat(page2.data.results);
      return data.map((game: IVideogame) => ({
        id: game.id,
        name: game.name,
        image: game.background_image,
        genres: game.genres.map((genre: IGenre) => genre.name),
      }));
    });
  }
};

const getFromDb = async (name: any) => {
  const whereStatement: any = {};
  if (name) {
    whereStatement.name = { [Op.iLike]: `%${name}%` };
  }
  const data = await videogameModel.findAll({
    attributes: ["id", "name", "image"],
    where: whereStatement,
  });
  return data;
};

export const getVideogames = async (req: Request, res: Response) => {
  const { name } = req.query;

  Promise.all([getFromDb(name), getFromApi(name)])
    .then(([dataFromDb, dataFromApi]) => {
      if (dataFromDb.length === 0) {
        return res.json(dataFromApi);
      }
      res.json([...dataFromDb, ...dataFromApi]);
    })
    .catch((e) => res.status(404).json(e));
};
