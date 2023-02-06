import {
  obtenerOfertas,
  nuevaOferta,
} from "../controllers/ofertasController.js";

import checkAuth from "../middleware/checkAuth.js";
import express from "express";

const router = express.Router();

router.route("/").get(checkAuth, obtenerOfertas).post(checkAuth, nuevaOferta);

export default router;
