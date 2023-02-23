import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";
import curriculumRoutes from "./routes/curriculumRoutes.js";
import ofertasRoutes from "./routes/ofertasRoutes.js";
import documentosRoutes from "./routes/documentosRoutes.js";
import nominasRoutes from "./routes/nominasRoutes.js";
const app = express();
app.use(express.json());
dotenv.config();

conectarDB();

//Ruta de imagenes
app.use(express.static("./public/uploads"));

//Configurar CORS
const whitelist = [process.env.FRONTEND_URL, "http://localhost:4000"];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origen", origin);
    if (whitelist.includes(origin)) {
      //Puede consultar la api
      console.log("Entrar");
      callback(null, true);
    } else {
      //No está permitido
      callback(new Error("Error de CORS"));
    }
  },
};

app.use(cors("*"));

//Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);
app.use("/api/curriculum", curriculumRoutes);
app.use("/api/ofertas", ofertasRoutes);
app.use("/api/documentos", documentosRoutes);
app.use("/api/nominas", nominasRoutes);
const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
