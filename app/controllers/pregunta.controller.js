const db = require("../models");
const config = require("../config/auth.config");
//const { caraterizacion } = require("../models");
const Pregunta = db.pregunta;
const multer = require("multer");
const path = require("path");
//const Caracterizacion = db.caracterizacion;

const Op = db.Sequelize.Op;
//Get All Preguntas
exports.getAllPregunta = (req, res) => {
  Pregunta.findAll()
    .then(function (el) {
      return el;
    })
    .then(function (preguntaList) {
      res.json(preguntaList);
    });
};
//Get One Preguntas
exports.getOnePregunta = (req, res) => {
  Pregunta.findOne({
    where: {
      id: req.query.id,
    },
  })
    .then(function (pregunta) {
      if (!pregunta) {
        return res.status(404).send({ message: "Pregunta no encontrada." });
      } else {
        res.json(pregunta);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Register Pregunta
exports.registerPregunta = (req, res) => {
  Pregunta.create({
    nombre: req.body.nombre,
    respuesta: req.body.respuesta,
    estado: "activo"
  })
    .then((pregunta) => {
      res.send({
        message: "Pregunta registrada satisfactoriamente!",
        id: pregunta.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Update Pregunta
exports.updatePregunta = (req, res) => {
  Pregunta.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((pregunta) => {
      if (!pregunta) {
        return res.status(404).send({ message: "Pregunta no encontrada." });
      }
      Pregunta.update(
        {
          nombre: req.body.nombre,
          respuesta: req.body.respuesta,
          estado: req.body.estado
        },
        {
          where: { id: req.body.id },
          returning: true,
          plain: true,
        }
      ).then(() => {
        res.status(200).send({
          message: "Pregunta actualizada satisfactoriamente!",
          data: req.query.id,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Delete Pregunta
exports.deletePregunta = (req, res) => {
  //console.log(req.query.id);
  Pregunta.findOne({
    where: {
      id: req.query.id,
    },
  })
    .then((pregunta) => {
      if (!pregunta) {
        return res.status(404).send({ message: "Pregunta no encontrada." });
      }
      Pregunta.destroy({
        where: { id: req.query.id },
      }).then(() => {
        res
          .status(200)
          .send({ message: "Pregunta eliminada!", data: req.query.id });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: "5000000" },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|pdf/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Give proper files formate to upload");
  },
}).single("avatarurl");
