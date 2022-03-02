import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGameByName } from "../../state";
import styles from "./SearchBar.module.css";

export const SearchBar = ({
  setLoading,
}: {
  setLoading: (arg: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if value is not an empty string
    if (value.trim()) {
      setLoading(true);
      dispatch(getGameByName(value));
      setValue("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        onChange={handleChange}
        value={value}
        placeholder="Search..."
      />
    </form>
  );
};
