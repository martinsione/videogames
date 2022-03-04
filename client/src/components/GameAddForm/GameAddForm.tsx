import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGame, AppState, getGenres } from "../../state";
import { IGenre } from "../../types";
import styles from "./GameAddForm.module.css";

const initialState = {
  name: "",
  description: "",
  image: "",
  release: "",
  genres: [],
  rating: "",
  platforms: [],
};

export const GameAddForm = () => {
  const dispatch = useDispatch();
  const genres = useSelector((store: AppState) => store.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const [values, setValues] = useState<any>(initialState);
  const [errors, setErrors] = useState<any>(initialState);

  // TODO: Search why keyof IGameDetail doesnt work
  const register = (name: any) => {
    return {
      autoComplete: "off",
      name,
      value: values[name],
      className: styles.input,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => setValues({ ...values, [e.target.name]: e.target.value }),
    };
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValues({ ...values, genres: [...values.genres, e.target.value] });
    } else {
      const genres = values.genres.filter((g: string) => g !== e.target.value);
      setValues({ ...values, genres });
    }
  };

  const validateNotEmpty = () => {
    const err = [];
    if (!values.name.trim()) {
      err.push({ name: "Name is required" });
    }
    if (!values.description.trim()) {
      err.push({ description: "Description is required" });
    }
    if (!values.image.trim()) {
      err.push({ image: "Image is required" });
    }
    if (!values.release) {
      err.push({ release: "Release is required" });
    }
    if (!values.rating) {
      err.push({ rating: "Rating is required" });
    }
    if (!values.genres.length) {
      err.push({ genres: "You must select at least 1 genre" });
    }
    if (!values.platforms.length) {
      err.push({ ...err, platforms: "You must select at least 1 platform" });
    }
    err.forEach((e) => setErrors((state: any) => ({ ...state, ...e })));

    return !err.length;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isNotEmpty = validateNotEmpty();
    if (isNotEmpty) {
      dispatch(addGame(values));
      setValues(initialState);
    }
  };

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
        <label className={styles.error}>{errors.image}</label>
        <input {...register("release")} type="date" />
        <label className={styles.error}>{errors.release}</label>
        <input
          {...register("rating")}
          type="number"
          placeholder="Rate from 1 to 5"
        />
        <label className={styles.error}>{errors.rating}</label>
        <div className={styles.genresContainer}>
          {genres.map((genre: IGenre) => (
            <div key={genre.id}>
              <span>{genre.name}</span>
              <input onChange={handleCheck} value={genre.id} type="checkbox" />
            </div>
          ))}
        </div>
        <label className={styles.error}>{errors.genres}</label>
        <h1>TODO: Add platforms</h1>
        <label className={styles.error}>{errors.platforms}</label>
        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
