import { validarCampos } from "../middlewares/validar.middleware.js";
import {
  createAnimeValidator,
  updateAnimeValidator,
  idAnimeValidator,
} from "../middlewares/anime.validators.js";

router.post("/", createAnimeValidator, validarCampos, createAnime);
router.get("/", getAnimes);
router.get("/:id", idAnimeValidator, validarCampos, getAnimeById);
router.put("/:id", updateAnimeValidator, validarCampos, updateAnime);
router.delete("/:id", idAnimeValidator, validarCampos, deleteAnime);