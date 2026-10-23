import { Schema, model } from "mongoose";

const animeSchema = new Schema(
    {
        estudio: { type: String, required: true, trim: true },
        anioEstreno: { type: Number },
        episodios: { type: Number, min: 1 },

        manga: { type: Schema.Types.ObjectId, ref: "Manga", required: true, unique: true },

        activo: { type: Boolean, default: true },
    },
    { timestamps: true, versionKey: false }
);

export default model("Anime", animeSchema)