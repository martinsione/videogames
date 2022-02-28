import { Router } from "express";
import {
  addVideogame,
  getVideogameById,
} from "../controllers/videogame.controller";

const router = Router();

router.get("/:id", getVideogameById);
router.post("/", addVideogame);

export default router;
