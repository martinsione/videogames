import image from "../../assets/images/about.png";
import styles from "./About.module.css";

export const About = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Videogames Project</p>
      <p className={styles.name}>
        Coded by
        <a
          className={styles.link}
          href="https://linkedin.com/in/martinsione"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Martin Sione
        </a>
      </p>
      <img className={styles.image} src={image} alt="mario bros" />
      <div className={styles.social}>
        <a
          className={styles.github}
          href="https://github.com/martinsione"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>

        <a
          className={styles.linkedin}
          href="https://linkedin.com/in/martinsione"
          target="_blank"
          rel="noopener noreferrer"
        >
          Linkedin
        </a>
      </div>
    </div>
  );
};
