import { Router } from "express";
import {
  createManga,
  getMangas,
  getMangaById,
  updateManga,
  deleteManga,
  addGeneroToManga
} from "../controllers/manga.controller.js";

const router = Router();

router.post("/", createManga);
router.get("/", getMangas);
router.get("/:id", getMangaById);
router.put("/:id", updateManga);
router.delete("/:id", deleteManga);
router.patch("/mangaId/generos/:generoId", addGeneroToManga)
export default router;