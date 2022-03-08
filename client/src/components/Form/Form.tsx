import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  addGame,
  AppState,
  editGame,
  getGameById,
  getGenres,
} from "../../state";
import { IGenre } from "../../types";
import { NotFound } from "../NotFound";
import styles from "./Form.module.css";
import platforms from "./platforms.json";

const initialState = {
  name: "",
  description: "",
  image: "",
  released: "",
  genres: [],
  rating: "",
  platforms: [],
};

export const Form = () => {
  const dispatch = useDispatch();
  const genres = useSelector((store: AppState) => store.genres);
  const game = useSelector((store: AppState) => store.gameDetail);

  const { id } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    if (id) {
      dispatch(getGameById(id));
    }
    dispatch(getGenres());
  }, [dispatch, id, pathname]);

  useEffect(() => {
    if (pathname.includes("edit") && game?.id) {
      const { id: gameId, ...restOfGame } = game;

      restOfGame.genres = genres.filter((genre: IGenre) => {
        return restOfGame.genres.includes(genre.name) && genre;
      });
      restOfGame.genres = restOfGame.genres.map((genre: IGenre) => {
        return genre.id.toString();
      });
      setValues(restOfGame);
    } else {
      setValues(initialState);
    }
  }, [game, id, pathname, genres]);

  const [values, setValues] = useState<any>(initialState);
  const [errors, setErrors] = useState<any>(initialState);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;
    if (name === "rating") {
      if (value !== "" && value < "1") {
        value = "1";
      } else if (value > "5") {
        value = "5";
      }
      value = value.slice(0, 1);
    }
    setValues({ ...values, [name]: value });
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValues({
        ...values,
        [e.target.name]: [...values[e.target.name], e.target.value],
      });
    } else {
      setValues({
        ...values,
        [e.target.name]: [...values[e.target.name]].filter(
          (item: string) => item !== e.target.value
        ),
      });
    }
  };

  // TODO: Search why keyof IGameDetail doesnt work
  const register = (name: any) => {
    return {
      autoComplete: "off",
      name,
      value: values[name] === null ? undefined : values[name],
      className: name === "description" ? styles.textarea : styles.input,
      onChange,
    };
  };

  const validate = () => {
    const err = [];
    setErrors(initialState);
    if (values.name.trim().length < 6 || values.name.trim().length > 100) {
      err.push({ name: "Name must be between 6 and 100 characters" });
    }
    if (
      values.description.trim().length < 10 ||
      values.description.trim().length > 2000
    ) {
      err.push({
        description: "Description must be between 10 and 2000 characters",
      });
    }
    if (values.rating < 1 || values.rating > 5) {
      err.push({ rating: "Rating must be a valid number between 1 and 5" });
    }
    if (!values.genres.length) {
      err.push({ genres: "You must select at least 1 genre" });
    }
    if (!values.platforms.length) {
      err.push({ platforms: "You must select at least 1 platform" });
    }

    err.forEach((e) => setErrors((state: any) => ({ ...state, ...e })));
    return !err.length;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValidated = validate();
    if (isValidated) {
      if (id) {
        dispatch(editGame({ id, ...values }));
      } else {
        dispatch(addGame(values));
        setValues(initialState);
      }
    }
  };

  if (pathname.includes("edit") && game === null) {
    return <NotFound status={404} message={`Game "${id}" was not found`} />;
  }

  return (
    <div className={styles.center}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input {...register("name")} placeholder="Name" />
        <label className={styles.error}>{errors.name}</label>
        <textarea
          {...register("description")}
          placeholder="Write a description for your game"
        />
        <label className={styles.error}>{errors.description}</label>
        <input {...register("image")} placeholder="Image url" />
        {values.image && (
          <img className={styles.image} src={values.image} alt="" />
        )}
        <label className={styles.error}>{errors.image}</label>
        <input {...register("released")} type="date" />
        <input
          {...register("rating")}
          type="number"
          placeholder="Rate from 1 to 5"
        />
        <label className={styles.error}>{errors.rating}</label>
        <div className={styles.genresContainer}>
          {genres.map((genre: IGenre) => (
            <div className={styles.genre} key={genre.id}>
              <span>{genre.name}</span>
              <input
                name="genres"
                onChange={handleCheck}
                value={genre.id}
                // it is necesary to convert id toString() otherwise it will always return false
                checked={values.genres.includes(genre.id.toString())}
                type="checkbox"
              />
            </div>
          ))}
        </div>
        <label className={styles.error}>{errors.genres}</label>
        <div className={styles.platformsContainer}>
          {platforms.map((platform: IGenre) => (
            <div className={styles.platform} key={platform.id}>
              <span>{platform.name}</span>
              <input
                name="platforms"
                onChange={handleCheck}
                value={platform.name}
                checked={values.platforms.includes(platform.name)}
                type="checkbox"
              />
            </div>
          ))}
        </div>
        <label className={styles.error}>{errors.platforms}</label>
        <button className={styles.button} type="submit">
          {id ? "Save" : "Add"}
        </button>
      </form>
    </div>
  );
};
