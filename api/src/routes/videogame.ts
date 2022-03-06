import { Router } from "express";
import {
  addVideogame,
  deleteVideogame,
  getVideogameById,
  updateVideogame,
} from "../controllers/videogame.controller";

const router = Router();

router.get("/:id", getVideogameById);
router.post("/", addVideogame);
router.delete("/", deleteVideogame);
router.put("/", updateVideogame);

export default router;
