const db = require("../models");
const config = require("../config/auth.config");
//const { caraterizacion } = require("../models");
const Espacio = db.espacio;
const Sede = db.sede;
const multer = require("multer");
const path = require("path");
//const Caracterizacion = db.caracterizacion;

const Op = db.Sequelize.Op;
//Get All Espacios
exports.getAllEspacio = (req, res) => {
  Espacio.findAll({
    include: [
      {
        model: Sede,
      },
    ],
  })
    .then(function (el) {
      return el;
    })
    .then(function (espacioList) {
      res.json(espacioList);
    });
};
//Get One Espacios
exports.getOneEspacio = (req, res) => {
  Espacio.findOne({
    include: [
      {
        model: Sede,
      },
    ],
    where: {
      id: req.query.id,
    },
  })
    .then(function (espacio) {
      if (!espacio) {
        return res.status(404).send({ message: "Espacio no encontrado." });
      } else {
        res.json(espacio);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Register Espacio
exports.registerEspacio = (req, res) => {
  console.log(req.file);
  Espacio.create({
    nombre: req.body.nombre,
    caracteristicas: req.body.caracteristicas,
    sedeId: req.body.sedeId,
    estado: "activo",
    avatarurl: req.file.path,
  })
    .then((espacio) => {
      res.send({
        message: "Espacio registrado satisfactoriamente!",
        id: espacio.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Update Espacio
exports.updateEspacio = (req, res) => {
  Espacio.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((espacio) => {
      if (!espacio) {
        return res.status(404).send({ message: "Espacio no encontrado." });
      }
      Espacio.update(
        {
          nombre: req.body.nombre,
          caracteristicas: req.body.caracteristicas,
          sedeId: req.body.sedeId,
          estado: req.body.estado,
          avatarurl: req.file ? req.file.path : req.body.path,
        },
        {
          where: { id: req.body.id },
          returning: true,
          plain: true,
        }
      ).then(() => {
        res.status(200).send({
          message: "Espacio actualizado satisfactoriamente!",
          data: req.query.id,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Delete Espacio
exports.deleteEspacio = (req, res) => {
 // console.log(req.query.id);
  Espacio.findOne({
    where: {
      id: req.query.id,
    },
  })
    .then((espacio) => {
      if (!espacio) {
        return res.status(404).send({ message: "Espacio no encontrado." });
      }
      Espacio.destroy({
        where: { id: req.query.id },
      }).then(() => {
        res
          .status(200)
          .send({ message: "Espacio eliminado!", data: req.query.id });
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
