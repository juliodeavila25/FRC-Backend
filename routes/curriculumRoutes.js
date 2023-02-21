import {
  nuevoCurriculum,
  obtenerCurriculum,
  editarCurriculum,
} from "../controllers/curriculumController.js";

import checkAuth from "../middleware/checkAuth.js";
import express from "express";
import upload from "../middleware/upload.js";

const router = express.Router();

router
  .route("/")
  .post(
    checkAuth,
    upload.fields([
      { name: "soporteExp" },
      { name: "soporteEps" },
      { name: "soportePension" },
    ]),
    nuevoCurriculum
  );

router
  .route("/:id")
  .get(checkAuth, obtenerCurriculum)
  .put(
    checkAuth,
    upload.fields([
      { name: "soporteExp" },
      { name: "soporteEps" },
      { name: "soportePension" },
    ]),
    editarCurriculum
  );

export default router;
