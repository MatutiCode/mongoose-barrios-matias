import { body, param } from "express-validator";
import animeModel from "../models/anime.model.js";
import mangaModel from "../models/manga.model.js";

const anioActual = new Date().getFullYear();

export const idAnimeValidator = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
];

export const createAnimeValidator = [
  body("estudio")
    .trim()
    .notEmpty()
    .withMessage("El estudio es obligatorio")
    .isLength({ min: 2, max: 80 })
    .withMessage("El estudio debe tener entre 2 y 80 caracteres"),
  body("anioEstreno")
    .optional()
    .isInt({ min: 1950, max: anioActual })
    .withMessage(`El año debe estar entre 1950 y ${anioActual}`),
  body("episodios")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Los episodios deben ser un número entero mayor a 0"),
  body("manga")
    .notEmpty()
    .withMessage("El manga es obligatorio")
    .isMongoId()
    .withMessage("El id del manga no es válido")
    .custom(async (value) => {
      const manga = await mangaModel.findById(value);
      if (!manga || !manga.activo) throw new Error("El manga no existe");
      const yaTiene = await animeModel.findOne({ manga: value });
      if (yaTiene) throw new Error("Ese manga ya tiene un anime asociado");
    }),
];

export const updateAnimeValidator = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
  body("estudio")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El estudio no puede estar vacío")
    .isLength({ min: 2, max: 80 })
    .withMessage("El estudio debe tener entre 2 y 80 caracteres"),
  body("anioEstreno")
    .optional()
    .isInt({ min: 1950, max: anioActual })
    .withMessage(`El año debe estar entre 1950 y ${anioActual}`),
  body("episodios")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Los episodios deben ser un número entero mayor a 0"),
  body("manga")
    .optional()
    .isMongoId()
    .withMessage("El id del manga no es válido")
    .custom(async (value, { req }) => {
      const manga = await mangaModel.findById(value);
      if (!manga || !manga.activo) throw new Error("El manga no existe");
      const yaTiene = await animeModel.findOne({
        manga: value,
        _id: { $ne: req.params.id },
      });
      if (yaTiene) throw new Error("Ese manga ya tiene un anime asociado");
    }),
];
