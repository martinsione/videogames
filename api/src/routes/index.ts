import { Router } from "express";

const router = Router();

router.get("/", (req, res) => res.json("Hello World"));

export default router;
