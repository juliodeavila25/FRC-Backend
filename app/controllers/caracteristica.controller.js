const db = require("../models");
const config = require("../config/auth.config");
//const { caraterizacion } = require("../models");
const Caracteristica = db.caracteristica;
const multer = require("multer");
const path = require("path");
//const Caracterizacion = db.caracterizacion;

const Op = db.Sequelize.Op;
//Get All Caracteristicas
exports.getAllCaracteristica = (req, res) => {
  Caracteristica.findAll()
    .then(function (el) {
      return el;
    })
    .then(function (caracteristicaList) {
      res.json(caracteristicaList);
    });
};
//Get One Caracteristicas
exports.getOneCaracteristica = (req, res) => {
  Caracteristica.findOne({
    where: {
      id: req.query.id,
    },
  })
    .then(function (caracteristica) {
      if (!caracteristica) {
        return res.status(404).send({ message: "Caracteristica no encontrada." });
      } else {
        res.json(caracteristica);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Register Caracteristica
exports.registerCaracteristica = (req, res) => {
  Caracteristica.create({
    nombre: req.body.nombre,
    tipo: req.body.tipo,
    estado: "activo"
  })
    .then((caracteristica) => {
      res.send({
        message: "Caracteristica registrada satisfactoriamente!",
        id: caracteristica.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Update Caracteristica
exports.updateCaracteristica = (req, res) => {
  Caracteristica.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((caracteristica) => {
      if (!caracteristica) {
        return res.status(404).send({ message: "Caracteristica no encontrada." });
      }
      Caracteristica.update(
        {
          nombre: req.body.nombre,
          tipo: req.body.tipo,
          estado: req.body.estado
        },
        {
          where: { id: req.body.id },
          returning: true,
          plain: true,
        }
      ).then(() => {
        res.status(200).send({
          message: "Caracteristica actualizada satisfactoriamente!",
          data: req.query.id,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Delete Caracteristica
exports.deleteCaracteristica = (req, res) => {
  //console.log(req.query.id);
  Caracteristica.findOne({
    where: {
      id: req.query.id,
    },
  })
    .then((caracteristica) => {
      if (!caracteristica) {
        return res.status(404).send({ message: "Caracteristica no encontrada." });
      }
      Caracteristica.destroy({
        where: { id: req.query.id },
      }).then(() => {
        res
          .status(200)
          .send({ message: "Caracteristica eliminada!", data: req.query.id });
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
