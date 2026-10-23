import autorModel from "../models/autor.model.js";
import mangaModel from "../models/manga.model.js";

export const createAutor = async (req, res) => {
  try {
    const autor = await autorModel.create(req.body);
    return res
      .status(201)
      .json({ msg: "Autor creado correctamente", data: autor });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al crear el autor", error: error.message });
  }
};

export const getAutores = async (req, res) => {
  try {
    const autores = await autorModel.find({ activo: true });
    return res
      .status(200)
      .json({ msg: "Autores obtenidos correctamente", data: autores });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al obtener los autores", error: error.message });
  }
};

export const getAutorById = async (req, res) => {
  try {
    const autor = await autorModel.findById(req.params.id);
    if (!autor || !autor.activo) {
      return res.status(404).json({ msg: "Autor no encontrado" });
    }
    return res
      .status(200)
      .json({ msg: "Autor obtenido correctamente", data: autor });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al obtener el autor", error: error.message });
  }
};

export const updateAutor = async (req, res) => {
  try {
    const autor = await autorModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!autor) {
      return res.status(404).json({ msg: "autor no encontrado" });
    }
    return res
      .status(200)
      .json({ msg: "Autor actualizado correctamente", data: autor });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al actualizar el autor", error: error.message });
  }
};

export const deleteAutor = async (req, res) => {
  try {
    const autor = await autorModel.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { returnDocument: "after" },
    );
    if (!autor) {
      return res.status(404).json({ msg: "Autor no encontrado" });
    }
    await mangaModel.updateMany({ autor: req.params.id }, { activo: false });
    return res
      .status(200)
      .json({ msg: "Autor y sus mangas eliminados correctamente" });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error al eliminar el autor", error: error.message });
  }
};
