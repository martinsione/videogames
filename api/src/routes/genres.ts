import { Router } from "express";
import { getGenres } from "../controllers/genres.controller";

const router = Router();

router.get("/", getGenres);

export default router;
