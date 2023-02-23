import {
  obtenerNominas,
  nuevaNomina,
  obtenerNomina,
  editarNomina,
  obtenerNominasbyPeriodo
} from "../controllers/nominasController.js";

import checkAuth from "../middleware/checkAuth.js";
import express from "express";

const router = express.Router();

router.route("/").get(checkAuth, obtenerNominas).post(checkAuth, nuevaNomina);
router.route("/obtener").get(checkAuth, obtenerNominasbyPeriodo);

router.route("/:id").get(checkAuth, obtenerNomina).put(checkAuth, editarNomina);

export default router;
