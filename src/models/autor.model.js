import { Schema, model } from "mongoose";

const autorSchema = new Schema(
    {
        nombre: { type: String, required: true, trim: true, minlenght: 2, maxlenght: 80},
        pais: { type: String, required: true, trim: true},
        anioNacimiento: { type: Number },
        activo: { type: Boolean, default: true}
    },
    { timestamps: true, versionKey: false }
);

export default model ("Autor", autorSchema)