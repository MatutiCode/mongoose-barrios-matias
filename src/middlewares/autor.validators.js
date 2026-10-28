import { body, param } from "express-validator";
import autorModel from "../models/autor.model.js";

const anioActual = new Date().getFullYear();

export const idAutorValidator = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
];

export const createAutorValidator = [
  body("nombre")
    .trim()
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 80 }).withMessage("El nombre debe tener entre 2 y 80 caracteres")
    .custom(async (value) => {
      const existe = await autorModel.findOne({ nombre: value, activo: true });
      if (existe) throw new Error("Ya existe un autor con ese nombre");
    }),
  body("pais")
    .trim()
    .notEmpty().withMessage("El país es obligatorio")
    .isLength({ min: 2, max: 60 }).withMessage("El país debe tener entre 2 y 60 caracteres"),
  body("anioNacimiento")
    .optional()
    .isInt({ min: 1800, max: anioActual }).withMessage(`El año debe estar entre 1800 y ${anioActual}`),
];

export const updateAutorValidator = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
  body("nombre")
    .optional()
    .trim()
    .notEmpty().withMessage("El nombre no puede estar vacío")
    .isLength({ min: 2, max: 80 }).withMessage("El nombre debe tener entre 2 y 80 caracteres")
    .custom(async (value, { req }) => {
      // no cuenta como duplicado el propio autor que se está editando
      const existe = await autorModel.findOne({
        nombre: value,
        activo: true,
        _id: { $ne: req.params.id },
      });
      if (existe) throw new Error("Ya existe un autor con ese nombre");
    }),
  body("pais")
    .optional()
    .trim()
    .notEmpty().withMessage("El país no puede estar vacío")
    .isLength({ min: 2, max: 60 }).withMessage("El país debe tener entre 2 y 60 caracteres"),
  body("anioNacimiento")
    .optional()
    .isInt({ min: 1800, max: anioActual }).withMessage(`El año debe estar entre 1800 y ${anioActual}`),
];