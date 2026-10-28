import { Router } from "express";

import { createAnime, getAnimes, getAnimeById, updateAnime, deleteAnime } from "../controllers/anime.controller.js";


const router = Router();

router.post("/", createAnime)
router.get("/", getAnimes)
router.get("/:id", getAnimeById)
router.put("/:id", updateAnime)
router.delete("/:id", deleteAnime)

export default router;