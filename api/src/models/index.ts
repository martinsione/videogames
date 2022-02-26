import { Genre } from "./Genre";
import { Videogame } from "./Videogame";

Genre.belongsToMany(Videogame, { through: "VideogameGenre" });
Videogame.belongsToMany(Genre, { through: "VideogameGenre" });

export { Genre, Videogame };
