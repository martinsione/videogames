import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import {
  AppState,
  filterByGenre,
  filterByOrigin,
  getGames,
  getGamesByName,
  orderByName,
  orderByRating,
  resetGameDetail,
  resetGameFilters,
} from "../../state";
import { IGame, IGenre } from "../../types";
import { GameCard } from "../GameCard";
import { Loader } from "../Loader";
import { Pagination } from "../Pagination";
import { SearchBar } from "../SearchBar";
import styles from "./Games.module.css";

export const Games: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [reset, setReset] = useState(true);
  const [search, setSearch] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const games = useSelector((state: AppState) => state.games);
  const genres = useSelector((state: AppState) => state.genres);

  useEffect(() => {
    setLoading(true);
    const searchValue = searchParams.get("search");
    if (searchValue) {
      setSearch(true);
      dispatch(getGamesByName(searchValue));
    } else if (!games.length || search) {
      setSearch(false);
      dispatch(getGames());
    }
  }, [games.length, search, searchParams, dispatch]);

  useEffect(() => {
    if (games.length) setLoading(false);
  }, [games]);

  const handleReset = () => {
    setReset(true);
    dispatch(resetGameFilters());
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setReset(false);
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
      case "reset":
        setReset(true);
        return dispatch(resetGameFilters());
      default:
        dispatch(filterByGenre(value));
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 12;
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = games.slice(indexOfFirstGame, indexOfLastGame);

  return (
    <>
      <div className={styles.header}>
        <SearchBar setSearchParams={setSearchParams} />

        <select className={styles.filter} onChange={handleSelect}>
          <option className={styles.defaultOption} value="reset">
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
          <option className={styles.defaultOption} value="reset">
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

        <button className={styles.reset} disabled={reset} onClick={handleReset}>
          Reset
        </button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className={styles.container}>
            {currentGames.map((game: IGame) => (
              <Link
                key={game.id}
                to={`/games/${game.id}`}
                // Reset the detail so the loader will show instead of flashing with another game
                onClick={() => dispatch(resetGameDetail())}
              >
                <GameCard game={game} />
              </Link>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={gamesPerPage}
            totalItems={games.length}
            setPage={(page: number) => setCurrentPage(page)}
          />
        </>
      )}
    </>
  );
};
