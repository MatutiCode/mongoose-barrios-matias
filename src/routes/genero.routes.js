import { Router } from "express";
import { createGenero, getGeneros, getGeneroById, updateGenero, deleteGenero } from "../controllers/genero.controller.js";

const router = Router();

router.post("/", createGenero)
router.get("/", getGeneros)
router.get("/:id", getGeneroById)
router.put("/:id", updateGenero)
router.delete("/:id", deleteGenero)

export default router;