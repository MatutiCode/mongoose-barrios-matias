import { Schema, model } from "mongoose";

const mangaSchema = new Schema(
    {
        titulo: { type: String, required: true, trim: true, minlength: 2, maxlenght: 120 },
        sinopsis: { type: String, trim: true, maxlenght: 1000 },
        estado: { type: String, enum: ["en emision", "finalizado", "pausado"], default: "en emision"},
        editorial: { 
            nombre: { type: String, required: true, trim: true},
            pais: { type: String, trim: true },
        },

        autor: { type: Schema.Types.ObjectId, ref: "Autor", required: true },

        generos: [{ type: Schema.Types.ObjectId, ref: "Genero"}],

        activo: { type: Boolean, default: true },
    },
    { timestamps: true, versionKey: false }
);

export default model("Manga", mangaSchema);