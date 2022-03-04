import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.css";

const NAV_ITEMS = [
  { name: "Intro", path: "/" },
  { name: "Games", path: "/games" },
  { name: "Add Game", path: "/games/add" },
  { name: "About", path: "/about" },
];

export const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        {NAV_ITEMS.map((item) => (
          <Link
            className={item.path === pathname ? styles.activeLink : styles.link}
            key={item.name}
            to={item.path}
          >
            {item.name}
          </Link>
        ))}
      </div>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};
