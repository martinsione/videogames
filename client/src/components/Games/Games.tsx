import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppState, getGames } from "../../state";
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

  return (
    <>
      <SearchBar setLoading={setLoading} />
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
