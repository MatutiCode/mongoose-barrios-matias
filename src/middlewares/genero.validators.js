import { body, param } from "express-validator";
import generoModel from "../models/genero.model.js";

export const idGeneroValidator = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
];

export const createGeneroValidator = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 40 })
    .withMessage("El nombre debe tener entre 2 y 40 caracteres")
    .custom(async (value) => {
      const existe = await generoModel.findOne({ nombre: value });
      if (existe) throw new Error("Ya existe un género con ese nombre");
    }),
  body("descripcion")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede superar los 200 caracteres"),
];

export const updateGeneroValidator = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
  body("nombre")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isLength({ min: 2, max: 40 })
    .withMessage("El nombre debe tener entre 2 y 40 caracteres")
    .custom(async (value, { req }) => {
      const existe = await generoModel.findOne({
        nombre: value,
        _id: { $ne: req.params.id },
      });
      if (existe) throw new Error("Ya existe un género con ese nombre");
    }),
  body("descripcion")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("La descripción no puede superar los 200 caracteres"),
];
