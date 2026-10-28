import { body, param } from "express-validator";
import { isValidObjectId } from "mongoose";
import mangaModel from "../models/manga.model.js";
import autorModel from "../models/autor.model.js";
import generoModel from "../models/genero.model.js";

const ESTADOS = ["en emisión", "finalizado", "pausado"];

export const idMangaValidator = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
];


const autorExiste = async (value) => {
  const autor = await autorModel.findById(value);
  if (!autor || !autor.activo) throw new Error("El autor no existe");
};

const generosExisten = async (value) => {
  const ids = [...new Set(value)];
  if (ids.length !== value.length) throw new Error("Hay géneros repetidos");
  const cantidad = await generoModel.countDocuments({ _id: { $in: ids }, activo: true });
  if (cantidad !== ids.length) throw new Error("Alguno de los géneros no existe");
};

export const createMangaValidator = [
  body("titulo")
    .trim()
    .notEmpty().withMessage("El título es obligatorio")
    .isLength({ min: 2, max: 120 }).withMessage("El título debe tener entre 2 y 120 caracteres")
    .custom(async (value) => {
      const existe = await mangaModel.findOne({ titulo: value, activo: true });
      if (existe) throw new Error("Ya existe un manga con ese título");
    }),
  body("sinopsis")
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage("La sinopsis no puede superar los 1000 caracteres"),
  body("estado")
    .optional()
    .isIn(ESTADOS).withMessage(`El estado debe ser: ${ESTADOS.join(", ")}`),

  
  body("editorial").isObject().withMessage("La editorial es obligatoria y debe ser un objeto"),
  body("editorial.nombre")
    .trim()
    .notEmpty().withMessage("El nombre de la editorial es obligatorio")
    .isLength({ min: 2, max: 80 }).withMessage("El nombre de la editorial debe tener entre 2 y 80 caracteres"),
  body("editorial.pais")
    .optional()
    .trim()
    .isLength({ min: 2, max: 60 }).withMessage("El país de la editorial debe tener entre 2 y 60 caracteres"),


  body("autor")
    .notEmpty().withMessage("El autor es obligatorio")
    .isMongoId().withMessage("El id del autor no es válido")
    .custom(autorExiste),
  body("generos")
    .optional()
    .isArray().withMessage("Los géneros deben enviarse en un array"),
  body("generos.*").isMongoId().withMessage("Alguno de los ids de género no es válido"),
  body("generos").optional().isArray().bail().custom(generosExisten),
];

export const updateMangaValidator = [
  param("id").isMongoId().withMessage("El id no es un ObjectId válido"),
  body("titulo")
    .optional()
    .trim()
    .notEmpty().withMessage("El título no puede estar vacío")
    .isLength({ min: 2, max: 120 }).withMessage("El título debe tener entre 2 y 120 caracteres")
    .custom(async (value, { req }) => {
      const existe = await mangaModel.findOne({
        titulo: value,
        activo: true,
        _id: { $ne: req.params.id },
      });
      if (existe) throw new Error("Ya existe un manga con ese título");
    }),
  body("sinopsis")
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage("La sinopsis no puede superar los 1000 caracteres"),
  body("estado")
    .optional()
    .isIn(ESTADOS).withMessage(`El estado debe ser: ${ESTADOS.join(", ")}`),


  body("editorial").optional().isObject().withMessage("La editorial debe ser un objeto"),
  body("editorial.nombre")
    .if(body("editorial").exists())
    .trim()
    .notEmpty().withMessage("El nombre de la editorial es obligatorio")
    .isLength({ min: 2, max: 80 }).withMessage("El nombre de la editorial debe tener entre 2 y 80 caracteres"),
  body("editorial.pais")
    .optional()
    .trim()
    .isLength({ min: 2, max: 60 }).withMessage("El país de la editorial debe tener entre 2 y 60 caracteres"),

  body("autor")
    .optional()
    .isMongoId().withMessage("El id del autor no es válido")
    .custom(autorExiste),
  body("generos")
    .optional()
    .isArray().withMessage("Los géneros deben enviarse en un array"),
  body("generos.*").isMongoId().withMessage("Alguno de los ids de género no es válido"),
  body("generos").optional().isArray().bail().custom(generosExisten),
];


export const addGeneroValidator = [
  param("mangaId")
    .isMongoId().withMessage("El id del manga no es válido")
    .bail()
    .custom(async (value) => {
      const manga = await mangaModel.findById(value);
      if (!manga || !manga.activo) throw new Error("El manga no existe");
    }),
  param("generoId")
    .isMongoId().withMessage("El id del género no es válido")
    .bail()
    .custom(async (value, { req }) => {
      const genero = await generoModel.findById(value);
      if (!genero || !genero.activo) throw new Error("El género no existe");

      // vínculo duplicado
      if (isValidObjectId(req.params.mangaId)) {
        const manga = await mangaModel.findById(req.params.mangaId);
        if (manga && manga.generos.some((g) => g.equals(value))) {
          throw new Error("El manga ya tiene ese género");
        }
      }
    }),
];