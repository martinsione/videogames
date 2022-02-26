import { Router } from "express";
import { getVideogames } from "../controllers/videogames.controller";

const router = Router();

router.get("/", getVideogames);

export default router;
