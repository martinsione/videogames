import { IGame } from "../../types";
import styles from "./GameCard.module.css";

export const GameCard = ({ game }: { game: IGame }) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={game.image} alt={game.name} />
      <div className={styles.body}>
        <p className={styles.title}>{game.name}</p>
        <div className={styles.genresContainer}>
          {game.genres.map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
