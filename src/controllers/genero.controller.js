import generoModel from "../models/genero.model.js";
import { matchedData } from "express-validator";


export const createGenero = async (req, res) => {
  try {
    const genero = await generoModel.create(req.body);
    return res
      .status(201)
      .json({ msg: "genero creado correctamente", data: genero });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error al crear el genero", error: error.message });
  }
};

export const getGeneros = async (req, res) => {
  try {
    const genero = await generoModel.find({ activo: true });
    return res
      .status(200)
      .json({ msg: "generos obtenidos correctamente", data: genero });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error al obtener los generos", error: error.message });
  }
};

export const getGeneroById = async (req, res) => {
  try {
    const genero = await generoModel.findById(req.params.id);
    if (!genero || !genero.activo) {
      return res.status(404).json({ msg: "Género no encontrado" });
    }
    return res
      .status(200)
      .json({ msg: "Género obtenido correctamente", data: genero });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al obtener el género", error: error.message });
  }
};

export const updateGenero = async (req, res) => {
  try {
    const genero = await generoModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!genero) {
      return res.status(404).json({ msg: "Género no encontrado" });
    }
    return res
      .status(200)
      .json({ msg: "Género actualizado correctamente", data: genero });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al actualizar el género", error: error.message });
  }
};

export const deleteGenero = async (req, res) => {
  try {
    const genero = await generoModel.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { returnDocument: "after" },
    );
    if (!genero) {
      return res.status(404).json({ msg: "genero no encontrado" });
    }
    return res.status(200).json({ msg: "genero eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error al eliminar el genero", error: error.message });
  }
};
