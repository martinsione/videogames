import { conn } from "../db/config";
import { Genre, Videogame } from "../models";

// Init models
const videogameModel: any = Videogame(conn);
const genreModel: any = Genre(conn);

// Setup relations
const config = { through: "VideogameGenre", timestamps: false };
genreModel.belongsToMany(videogameModel, config);
videogameModel.belongsToMany(genreModel, config);

// Sync db
export const dbSync = () => conn.sync({ force: true });

export { videogameModel, genreModel };
