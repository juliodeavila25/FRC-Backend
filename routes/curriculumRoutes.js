import {
  nuevoCurriculum,
  obtenerCurriculum,
  editarCurriculum,
} from "../controllers/curriculumController.js";

import checkAuth from "../middleware/checkAuth.js";
import express from "express";

const router = express.Router();

router.route("/").post(checkAuth, nuevoCurriculum);

router
  .route("/:id")
  .get(checkAuth, obtenerCurriculum)
  .put(checkAuth, editarCurriculum);

export default router;
