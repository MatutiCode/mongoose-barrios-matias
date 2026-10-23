import { Router } from "express";
import { createAutor, getAutores, getAutorById, updateAutor, deleteAutor } from "../controllers/autor.controller.js";

const router = Router();

router.post("/", createAutor)
router.get("/", getAutores)
router.get("/:id", getAutorById)
router.put("/:id", updateAutor)
router.delete("/:id", deleteAutor)

export default router;