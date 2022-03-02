import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState, getGames, orderByName, orderByRating } from "../../state";
import { IGame } from "../../types";
import { GameCard } from "../GameCard";
import { Loader } from "../Loader";
import { SearchBar } from "../SearchBar";
import styles from "./Games.module.css";

export const Games: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const games = useSelector((store: AppState) => store.games);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  useEffect(() => {
    if (games.length) {
      setLoading(false);
    }
  }, [games]);

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "rating-asc") {
      console.log("ascending");
      dispatch(orderByRating("asc"));
    } else if (value === "rating") {
      dispatch(orderByRating());
    } else if (value === "name-asc") {
      dispatch(orderByName("asc"));
    } else if (value === "name") {
      dispatch(orderByName());
    }
  };

  return (
    <>
      <SearchBar setLoading={setLoading} />
      <select className={styles.sort} onChange={onChangeSelect}>
        <option className="option" value="default">
          Sort by
        </option>

        <option value="rating-asc">Rating Asc</option>
        <option value="rating">Rating Des</option>
        <option value="name-asc">A-Z</option>
        <option value="name">Z-A</option>
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
