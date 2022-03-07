import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
export const NotFound = ({
  message,
  status,
}: {
  message?: string;
  status?: number;
}) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>
        {status || "404"} - {message || "Page not found"}
      </p>

      <Link className={styles.returnButton} to="/games">
        Return home
      </Link>
    </div>
  );
};
