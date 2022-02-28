import { Router } from "express";
import genresRouter from "./genres";
import videogameRouter from "./videogame";
import videogamesRouter from "./videogames";

const router = Router();

router.use("/genres", genresRouter);
router.use("/videogame", videogameRouter);
router.use("/videogames", videogamesRouter);

export default router;
