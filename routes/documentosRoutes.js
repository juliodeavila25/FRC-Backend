import {
  obtenerDocumentos,
  nuevoDocumento,
  obtenerDocumento,
  editarDocumento,
} from "../controllers/documentosController.js";

import checkAuth from "../middleware/checkAuth.js";
import express from "express";

const router = express.Router();

router.route("/").get(checkAuth, obtenerDocumentos).post(checkAuth, nuevoDocumento);

router.route("/:id").get(checkAuth, obtenerDocumento).put(checkAuth, editarDocumento);
// .delete(checkAuth, eliminarProyecto);

export default router;
