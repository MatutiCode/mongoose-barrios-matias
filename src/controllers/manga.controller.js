import animeModel from "../models/anime.model.js";
import mangaModel from "../models/manga.model.js";
import generoModel from "../models/genero.model.js";
import { matchedData } from "express-validator";

export const createManga = async (req, res) => {
  try {
    const manga = await mangaModel.create(
      matchedData(req, { locations: ["body"] }),
    );
    return res
      .status(201)
      .json({ msg: "manga creado correctamente", data: manga });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error al crear el manga", error: error.message });
  }
};

export const getMangas = async (req, res) => {
  try {
    const mangas = await mangaModel
      .find({ activo: true })
      .populate("autor", "nombre pais")
      .populate("generos", "nombre");
    return res
      .status(200)
      .json({ msg: "mangas obtenidos correctamente", data: mangas });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error al obtener los mangas", error: error.message });
  }
};

export const getMangaById = async (req, res) => {
  try {
    const manga = await mangaModel
      .findById(req.params.id)
      .populate("autor", "nombre pais")
      .populate("generos", "nombre");
    if (!manga || !manga.activo) {
      return res.status(404).json({ msg: "manga no encontrado" });
    }
    return res
      .status(200)
      .json({ msg: "manga obtenido correctamente", data: manga });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error al obtener el", error: error.message });
  }
};

export const updateManga = async (req, res) => {
  try {
    const manga = await mangaModel.findByIdAndUpdate(
      req.params.id,
      matchedData(req, { locations: ["body"] }),
      { returnDocument: "after", runValidators: true },
    );
    if (!manga) {
      return res.status(404).json({ msg: "manga no encontrado" });
    }
    return res
      .status(200)
      .json({ msg: "manga actualziado correctamente", data: manga });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "error al actualziar el manga", error: error.message });
  }
};

export const deleteManga = async (req, res) => {
  try {
    const manga = await mangaModel.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { returnDocument: "after" },
    );
    if (!manga) {
      return res.status(404).json({ msg: "Manga no encontrado" });
    }

    await animeModel.updateMany({ manga: req.params.id }, { activo: false });

    return res
      .status(200)
      .json({ msg: "Manga y su anime eliminados correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al eliminar el manga", error: error.message });
  }
};

export const addGeneroToManga = async (req, res) => {
  try {
    const { mangaId, generoId } = req.params;

    const manga = await mangaModel.findById(mangaId);
    if (!manga || !manga.activo) {
      return res.status(404).json({ msg: "Manga no encontrado" });
    }

    const genero = await generoModel.findById(generoId);
    if (!genero || !genero.activo) {
      return res.status(404).json({ msg: "Género no encontrado" });
    }
    if (manga.generos.includes(generoId)) {
      return res.status(400).json({ msg: "El manga ya tiene ese género" });
    }

    const actualizado = await mangaModel
      .findByIdAndUpdate(
        mangaId,
        { $addToSet: { generos: generoId } },
        { returnDocument: "after" },
      )
      .populate("generos", "nombre");

    return res
      .status(200)
      .json({
        msg: "Género agregado al manga correctamente",
        data: actualizado,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al agregar el género", error: error.message });
  }
};
