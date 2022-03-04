import styles from "./Loader.module.css";

export const Loader = () => (
  <div className={styles.center} aria-label="Loading…">
    <div className={styles.loaderContainer} aria-hidden="true">
      <div className={styles.loader}></div>
      <div className={styles.loader}></div>
    </div>
  </div>
);
