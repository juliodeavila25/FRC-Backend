const db = require("../models");
const config = require("../config/auth.config");
const { solicitud } = require("../models");
const { QueryTypes } = require("sequelize");
const SibApiV3Sdk = require("sib-api-v3-sdk");
//const { caraterizacion } = require("../models");
const Solicitud = db.solicitud;
const Persona = db.persona;
const Espacio = db.espacio;
const User = db.user;
const Unidad_Acadamica = db.unidad_academica;
const { v4: UUIDV4 } = require("uuid");
//const Caracterizacion = db.caracterizacion;
const multer = require("multer");
const path = require("path");

const Op = db.Sequelize.Op;

exports.getAllSolicitud = (req, res) => {
  // Callee is the model definition. This allows you to easily map a query to a predefined model

  Solicitud.sequelize
    .query(
      "SELECT solicitudes.id, CONCAT(personas.nombres,' ',personas.apellidos) AS solicitante,fecha_inicio,CONCAT(DATE_FORMAT(fecha_inicio,'%d/%m/%Y'),' - ', TIME_FORMAT(fecha_inicio, '%H:%i')) as fecha_inicio_formated,fecha_fin,CONCAT(DATE_FORMAT(fecha_fin,'%d/%m/%Y'),' - ', TIME_FORMAT(fecha_fin, '%H:%i')) as fecha_fin_formated,solicitudes.estado,celular,espacios_solicitado.nombre, espacios_solicitado.avatarurl FROM solicitudes LEFT JOIN personas ON solicitudes.personaId = personas.id LEFT JOIN espacios AS espacios_solicitado ON solicitudes.espacioSolicitadoId = espacios_solicitado.id",
      {
        raw: true,
        type: QueryTypes.SELECT,
      }
    )
    .then(function (solicitud) {
      // Each record will now be an instance of Project
      // console.log(solicitud);
      return res.json(solicitud);
    });
};

exports.getAllSolicitudEvent = (req, res) => {
  // Callee is the model definition. This allows you to easily map a query to a predefined model

  Solicitud.sequelize
    .query(
      "SELECT descripcion as description,fecha_fin as end,solicitudes.id,fecha_inicio as start, CASE WHEN solicitudes.estado = 'pendiente' THEN '#FFC107' WHEN solicitudes.estado = 'asignado' THEN '#00AB55' WHEN solicitudes.estado = 'sugerencia' THEN '#7A0C2E' ELSE '#FF4842' END AS textColor,CONCAT(personas.nombres,' ',personas.apellidos,' ', espacios_solicitado.nombre) AS title FROM solicitudes LEFT JOIN personas ON solicitudes.personaId = personas.id LEFT JOIN espacios AS espacios_solicitado ON solicitudes.espacioSolicitadoId = espacios_solicitado.id",
      {
        raw: true,
        type: QueryTypes.SELECT,
      }
    )
    .then(function (solicitud) {
      // Each record will now be an instance of Project
      // console.log(solicitud);
      return res.json(solicitud);
    });
};
//Get All Solicituds
exports.getAllSolicitudA = (req, res) => {
  Solicitud.findAll({
    include: [
      {
        model: Persona,
        as: "persona",
      },
      {
        model: Espacio,
        as: "espacioSolicitado",
      },
      {
        model: Espacio,
        as: "espacioAsignado",
      },
      {
        model: User,
        as: "validador",
      },
    ],
  })
    .then(function (solicitud) {
      res.json(solicitud);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Get One Solicitudes
exports.getOneSolicitud = (req, res) => {
  Solicitud.findOne({
    include: [
      {
        model: Persona,
        as: "persona",
      },
      {
        model: Espacio,
        as: "espacioSolicitado",
      },
      {
        model: Espacio,
        as: "espacioAsignado",
      },
      {
        model: User,
        as: "validador",
      },
      {
        model: Unidad_Acadamica,
      },
    ],
    where: {
      id: req.query.id,
    },
  })
    .then(function (solicitud) {
      if (!solicitud) {
        return res.status(404).send({ message: "Solicitud no encontrada." });
      } else {
        res.json(solicitud);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Get One Solicituds
exports.getOneSolicitudByRadicado = (req, res) => {
  Solicitud.findOne({
    include: [
      {
        model: Persona,
        as: "persona",
      },
      {
        model: Espacio,
        as: "espacioSolicitado",
      },
      {
        model: Espacio,
        as: "espacioAsignado",
      },
      {
        model: User,
        as: "validador",
      },
      {
        model: Unidad_Acadamica,
      },
    ],
    where: {
      n_radicado: req.query.n_radicado,
    },
  })
    .then(function (solicitud) {
      if (!solicitud) {
        return res.status(404).send({ message: "Solicitud no encontrada." });
      } else {
        res.json(solicitud);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Register Solicitud
exports.registerSolicitud = (req, res) => {
  //Buscar Solicitante
  Persona.findOne({
    where: {
      documento: req.body.documento,
    },
  }).then((personaFind) => {
    if (!personaFind) {
      //No existe solicitante
      Persona.create({
        documento: req.body.documento,
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        email: req.body.email,
        celular: req.body.celular,
        cargo: req.body.cargo,
      })
        .then((personaCreate) => {
          Solicitud.create({
            descripcion: req.body.descripcion,
            fecha_inicio: req.body.fechaInicio,
            fecha_fin: req.body.fechaFinal,
            observaciones: "",
            estado: "pendiente",
            personaId: personaCreate.id,
            espacioSolicitadoId: req.body.espacioId,
            tipo_origen: req.body.tipo_origen,
            unidadAcademicaId: req.body.origenId,
            tipo_solicitud: req.body.tipo_solicitud,
            asistentes: req.body.asistentes,
          })
            .then((solicitud) => {
              sendEmailConfirm(solicitud, personaCreate);
              res.send({
                message:
                  "Solicitud y solicitante registrados satisfactoriamente!",
                data: solicitud,
              });
            })
            .catch((err) => {
              res.status(500).send({ message: err.message });
            });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    } else {
      //Existe solicitante
      Solicitud.create({
        descripcion: req.body.descripcion,
        fecha_inicio: req.body.fechaInicio,
        fecha_fin: req.body.fechaFinal,
        observaciones: req.body.observaciones,
        estado: "pendiente",
        personaId: personaFind.id,
        espacioSolicitadoId: req.body.espacioId,
        tipo_origen: req.body.tipo_origen,
        unidadAcademicaId: req.body.origenId,
        tipo_solicitud: req.body.tipo_solicitud,
        asistentes: req.body.asistentes,
      })
        .then((solicitud) => {
          sendEmailConfirm(solicitud, personaFind);
          res.send({
            message: "Solicitud registrada satisfactoriamente!",
            data: solicitud,
          });
        })
        .catch((err) => {
          res.status(500).send({ message: err.message });
        });
    }
  });
};
//Update Solicitud Estado
exports.updateSolicitudEstado = (req, res) => {
  console.log(req.params);
  Solicitud.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((solicitud) => {
      if (!solicitud) {
        return res.status(404).send({ message: "Solicitud no encontrada." });
      }
      Solicitud.update(
        {
          estado: req.body.estado,
          observaciones: req.body.observaciones,
          espacioAsignadoId: req.body.destinoId,
          document: req.file.path,
          validadorId: 1,
        },
        {
          where: { id: req.body.id },
          returning: true,
          plain: true,
        }
      ).then(() => {
        res.status(200).send({
          message: "Solicitud actualizada satisfactoriamente!",
          data: req.query.id,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
//Delete Solicitud
exports.deleteSolicitud = (req, res) => {
  Solicitud.findOne({
    where: {
      id: req.body.id,
    },
  })
    .then((solicitud) => {
      if (!solicitud) {
        return res.status(404).send({ message: "Solicitud no encontrada." });
      }
      Solicitud.destroy({
        where: { id: req.body.id },
      }).then(() => {
        res
          .status(200)
          .send({ message: "Solicitud eliminada!", data: req.query.id });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const sendEmailConfirm = (solicitud, persona) => {
  console.log(solicitud.dataValues.n_radicado);
  console.log(persona.dataValues.email);

  let data = {};
  data["email"] = persona.dataValues.email;

  console.log(data);

  var SibApiV3Sdk = require("sib-api-v3-sdk");
  SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey =
    "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";

  new SibApiV3Sdk.TransactionalEmailsApi()
    .sendTransacEmail({
      subject: "Solicitud registrada exitosamente",
      sender: { email: "api@sendinblue.com", name: "Sendinblue" },
      replyTo: { email: "api@sendinblue.com", name: "Sendinblue" },
      to: [data],
      templateId: 1,
      params: {
        Codigo: solicitud.dataValues.n_radicado,
      },
    })
    .then(
      function (data) {
        console.log(data);
      },
      function (error) {
        console.error(error);
      }
    );
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
}).single("document");
