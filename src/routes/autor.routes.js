import { validarCampos } from "../middlewares/validar.middleware.js";
import {
  createAutorValidator,
  updateAutorValidator,
  idAutorValidator,
} from "../middlewares/autor.validators.js";

router.post("/", createAutorValidator, validarCampos, createAutor);
router.get("/", getAutores);
router.get("/:id", idAutorValidator, validarCampos, getAutorById);
router.put("/:id", updateAutorValidator, validarCampos, updateAutor);
router.delete("/:id", idAutorValidator, validarCampos, deleteAutor);