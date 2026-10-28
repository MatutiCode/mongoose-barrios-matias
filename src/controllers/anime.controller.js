import animeModel from "../models/anime.model.js";
import { matchedData } from "express-validator";


export const createAnime = async (req, res) => {
  try {
    const anime = await animeModel.create(matchedData(req, { locations: ["body"] }));
    return res
      .status(201)
      .json({ msg: "Anime creado correctamente", data: anime });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al crear el anime", data: error.message });
  }
};

export const getAnimes = async (req, res) => {
  try {
    const animes = await animeModel
      .find({ activo: true })
      .populate("manga", "titulo estado");
    return res
      .status(200)
      .json({ msg: "Animes obtenidos correctamente", data: animes });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error al obtener los animes", error: error.message });
  }
};

export const getAnimeById = async (req, res) => {
  try {
    const anime = await animeModel
      .findById(req.params.id)
      .populate("manga", "titulo estado");
    if (!anime || !anime.activo) {
      return res.status(404).json({ msg: "anime no encontrado" });
    }
    return res
      .status(200)
      .json({ msg: "anime obtenido correctamente", data: anime });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error al obtener el anime", error: error.message });
  }
};

export const updateAnime = async (req, res) => {
  try {
    const anime = await animeModel.findByIdAndUpdate(
  req.params.id,
  matchedData(req, { locations: ["body"] }),
  { returnDocument: "after", runValidators: true }
);
    if (!anime) {
      return res.status(404).json({ msg: "Anime no encontrado" });
    }
    return res
      .status(200)
      .json({ msg: "Anime actualizado correctamente", data: anime });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al actualizar el anime", error: error.message });
  }
};

export const deleteAnime = async (req, res) => {
  try {
    const anime = await animeModel.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { returnDocument: "after" },
    );
    if (!anime) {
      return res.status(404).json({ msg: "Anime no encontrado" });
    }
    return res.status(200).json({ msg: "Anime eliminado correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al eliminar el anime", error: error.message });
  }
};
