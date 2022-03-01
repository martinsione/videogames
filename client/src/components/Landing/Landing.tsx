import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export const Landing: React.FC = (props: any) => {
  return (
    <div className={styles.container}>
      <Link to="/games">
        <button className={styles.button}>Start!</button>
      </Link>
    </div>
  );
};
