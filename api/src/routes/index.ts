import { Router } from "express";
import videogamesRouter from "./videogames";

const router = Router();

router.use("/videogames", videogamesRouter);

export default router;
