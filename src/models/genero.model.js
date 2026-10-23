import { Schema, model } from "mongoose";

const generoSchema = new Schema(
    {
        nombre: { type: String, required: true, unique: true, trim: true, minlenght: 2, maxlenght: 40},
        descripcion: { type: String, trim: true},
        activo: { type: Boolean, default: true}
    },
    { timestamps: true, versionKey: false }
);

export default model ("Genero", generoSchema)