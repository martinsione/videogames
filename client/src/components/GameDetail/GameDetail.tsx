import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppState, getGameById } from "../../state";
import { IGameDetail } from "../../types";
import { Loader } from "../Loader";
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

  return (
    <>
      {game ? (
        <div className={styles.center}>
          <div className={styles.container}>
            <div>
              <div className={styles.body}>
                <p className={styles.title}>{game.name}</p>

                <div className={styles.subheader}>
                  <span className={styles.release}>📅 {game.release}</span>
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
