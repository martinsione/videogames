import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState, getGames } from "../../state";
import { IGame } from "../../types";
import { GameCard } from "./GameCard";
import styles from "./Games.module.css";

export const Games: React.FC = () => {
  const dispatch = useDispatch();
  const games = useSelector((store: AppState) => store.games);

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {games.length ? (
        games.map((game: IGame) => <GameCard key={game.id} game={game} />)
      ) : (
        <p>hola</p>
      )}
    </div>
  );
};
