import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { startDB } from "./src/config/database.js";
import autorRoutes from "./src/routes/autor.routes.js";


const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cors());
app.use("/api/autores", autorRoutes);

app.listen(PORT, async () => {
    await startDB();
    console.log(`servidor listo en el puerto ${PORT}`);
})