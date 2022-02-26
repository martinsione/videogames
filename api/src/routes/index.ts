import { Router } from "express";
import genresRouter from "./genres";
import videogamesRouter from "./videogames";

const router = Router();

router.use("/genres", genresRouter);
router.use("/videogames", videogamesRouter);

export default router;
