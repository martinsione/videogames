import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AppState, deleteGame, getGameById } from "../../state";
import { IGameDetail } from "../../types";
import { Loader } from "../Loader";
import { NotFound } from "../NotFound";
import styles from "./GameDetail.module.css";

export const GameDetail: React.FC = () => {
  const dispatch = useDispatch();
  const game: IGameDetail = useSelector((store: AppState) => store.gameDetail);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getGameById(id));
    }
  }, [dispatch, id]);

  if (game === null) {
    return <NotFound status={404} message={`Game "${id}" was not found`} />;
  }

  return (
    <>
      {game ? (
        <div className={styles.center}>
          <div className={styles.container}>
            <div>
              <div className={styles.body}>
                <div className={styles.header}>
                  <p className={styles.title}>{game.name}</p>
                </div>

                <div className={styles.subheader}>
                  <span className={styles.released}>📅 {game.released}</span>
                  <span className={styles.rating}>⭐ {game.rating}</span>
                </div>

                <p className={styles.description}>
                  {game.description.replace(/(<([^>]+)>)/gi, "")}
                </p>
                <div className={styles.genresContainer}>
                  {game.genres.map((genre) => (
                    <span key={genre}>{genre}</span>
                  ))}
                </div>

                <div className={styles.platformsContainer}>
                  {game.platforms.map((platform) => (
                    <span key={platform}>{platform}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.imageContainer}>
              {game.createdInDb && (
                <div className={styles.editableContainer}>
                  <Link to={`/games/edit/${id}`}>
                    <button className={styles.edit}>Edit</button>
                  </Link>
                  <Link
                    className={styles.delete}
                    onClick={() => id && dispatch(deleteGame(id))}
                    to="/games"
                  >
                    Delete
                  </Link>
                </div>
              )}
              <img className={styles.image} src={game.image} alt={game.name} />
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
