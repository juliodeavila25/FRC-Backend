import {
  obtenerOfertas,
  nuevaOferta,
  obtenerOferta,
  editarOferta,
} from "../controllers/ofertasController.js";

import checkAuth from "../middleware/checkAuth.js";
import express from "express";

const router = express.Router();

router.route("/").get(checkAuth, obtenerOfertas).post(checkAuth, nuevaOferta);

router.route("/:id").get(checkAuth, obtenerOferta).put(checkAuth, editarOferta);
// .delete(checkAuth, eliminarProyecto);

export default router;
