const db = require("../models");
const config = require("../config/auth.config");
//const { caraterizacion } = require("../models");
const Unidad_Academica = db.unidad_academica;
//const Caracterizacion = db.caracterizacion;

const Op = db.Sequelize.Op;
//Get All Sedes
exports.getAllSede= (req, res) => {
  Unidad_Academica
  .findAll()
  .then(function(el){
    return el;
   })
  .then(function(unidadList){
    res.json(unidadList);
   });
};
/*
//Get One Espacios
exports.getOneEspacio = (req, res) => {
  Espacio
  .findOne({
    include: [{
      model: Sede,
    }],
    where: {
      id: req.body.id
    }
  })
  .then(function(espacio){
    if (!espacio) {
      return res.status(404).send({ message: "Espacio no encontrado." });
    }  
    else{
      res.json(espacio);
    }    
   })
   .catch(err => {
    res.status(500).send({ message: err.message });
  });
};
//Register Espacio
exports.registerEspacio = (req, res) => {
  Espacio.create({
    nombre: req.body.nombre,
    caracteristicas: req.body.caracteristicas,
    sedeId: req.body.sedeId,
    estado: req.body.estado
  })
    .then(espacio => {
      res.send({ message: "Espacio registrado satisfactoriamente!", id: espacio.id});
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
//Update Espacio
exports.updateEspacio = (req, res) => {
  Espacio.findOne({
    where: {
      id: req.body.id
    }
  })
    .then(espacio => {
      if (!espacio) {
        return res.status(404).send({ message: "Espacio no encontrado." });
      }  
      Espacio
      .update({
          nombre: req.body.nombre,
          caracteristicas: req.body.caracteristicas,
          sedeId: req.body.sedeId
      }, {
        where: { id: req.body.id },
        returning: true,
        plain: true
      }).then(() => {
        res.status(200).send({message: 'Espacio actualizado satisfactoriamente!', data: req.query.id});
       });  
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
//Delete Espacio
exports.deleteEspacio = (req, res) => {
  console.log(req.query.id);
  Espacio.findOne({
    where: {
      id: req.query.id
    }
  })
    .then(espacio => {
      if (!espacio) {
        return res.status(404).send({ message: "Espacio no encontrado." });
      }  
      Espacio
      .destroy({
        where: { id: req.query.id },
      }).then(() => {
        res.status(200).send({message: 'Espacio eliminado!', data: req.query.id});
       });  
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
*/