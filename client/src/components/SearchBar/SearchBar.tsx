import { useState } from "react";
import styles from "./SearchBar.module.css";

export const SearchBar = ({
  setSearchParams,
}: {
  setSearchParams: (value: any) => void;
}) => {
  const [value, setValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if value is not an empty string
    if (value.trim()) {
      setSearchParams({ search: value });
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
