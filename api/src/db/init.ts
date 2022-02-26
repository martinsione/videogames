import { Genre, Videogame } from "../models";

export const dbSync = () =>
  Promise.all([Videogame.sync({ force: true }), Genre.sync({ force: true })]);
