import { Router } from "express";
import {
  addVideogame,
  deleteVideogame,
  getVideogameById,
} from "../controllers/videogame.controller";

const router = Router();

router.get("/:id", getVideogameById);
router.post("/", addVideogame);
router.delete("/:id", deleteVideogame);

export default router;
