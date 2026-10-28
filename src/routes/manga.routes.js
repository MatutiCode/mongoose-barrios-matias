import { validarCampos } from "../middlewares/validar.middleware.js";
import {
  createMangaValidator,
  updateMangaValidator,
  idMangaValidator,
  addGeneroValidator,
} from "../middlewares/manga.validators.js";

router.post("/", createMangaValidator, validarCampos, createManga);
router.get("/", getMangas);
router.get("/:id", idMangaValidator, validarCampos, getMangaById);
router.put("/:id", updateMangaValidator, validarCampos, updateManga);
router.delete("/:id", idMangaValidator, validarCampos, deleteManga);
router.patch("/:mangaId/generos/:generoId", addGeneroValidator, validarCampos, addGeneroToManga);