import { validarCampos } from "../middlewares/validar.middleware.js";
import {
  createGeneroValidator,
  updateGeneroValidator,
  idGeneroValidator,
} from "../middlewares/genero.validators.js";

router.post("/", createGeneroValidator, validarCampos, createGenero);
router.get("/", getGeneros);
router.get("/:id", idGeneroValidator, validarCampos, getGeneroById);
router.put("/:id", updateGeneroValidator, validarCampos, updateGenero);
router.delete("/:id", idGeneroValidator, validarCampos, deleteGenero);