import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppState,
  filterByGenre,
  filterByOrigin,
  getGames,
  getGenres,
  orderByName,
  orderByRating,
} from "../../state";
import { IGame, IGenre } from "../../types";
import { GameCard } from "../GameCard";
import { Loader } from "../Loader";
import { SearchBar } from "../SearchBar";
import styles from "./Games.module.css";

export const Games: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { games, genres } = useSelector((store: AppState) => store);

  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (games.length) {
      setLoading(false);
    }
  }, [games]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    switch (value) {
      case "rating-asc":
        return dispatch(orderByRating("asc"));
      case "rating":
        return dispatch(orderByRating());
      case "name-asc":
        return dispatch(orderByName("asc"));
      case "name":
        return dispatch(orderByName());
      case "api":
        return dispatch(filterByOrigin("api"));
      case "database":
        return dispatch(filterByOrigin("database"));
      case "default":
        return dispatch(getGames());
      default:
        dispatch(filterByGenre(value));
    }
  };

  console.log(games);
  return (
    <>
      <SearchBar setLoading={setLoading} />

      <select className={styles.filter} onChange={handleSelect}>
        <option className="option" value="default">
          Filter by
        </option>

        <optgroup label="Origin">
          <option value="api">Api</option>
          <option value="database">Database</option>
        </optgroup>
        <optgroup label="Genre">
          {genres.map((genre: IGenre) => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </optgroup>
      </select>
      <select className={styles.sort} onChange={handleSelect}>
        <option className="option" value="default">
          Sort by
        </option>

        <optgroup label="Rating">
          <option value="rating-asc">Rating Asc</option>
          <option value="rating">Rating Des</option>
        </optgroup>
        <optgroup label="Name">
          <option value="name-asc">A-Z</option>
          <option value="name">Z-A</option>
        </optgroup>
      </select>
      <div className={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          games.map((game: IGame) => (
            <Link key={game.id} to={`/games/${game.id}`}>
              <GameCard game={game} />
            </Link>
          ))
        )}
      </div>
    </>
  );
};
