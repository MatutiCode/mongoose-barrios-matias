import animeModel from "../models/anime.model.js";
import mangaModel from "../models/manga.model.js";

export const createManga = async (req, res) => {
  try {
    const manga = await mangaModel.create(req.body);
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
    const manga = mangaModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
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
