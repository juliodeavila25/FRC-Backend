const db = require("../models");
const config = require("../config/auth.config");
//const { caraterizacion } = require("../models");
const Persona = db.persona;
const Caracterizacion = db.caracterizacion;

const Op = db.Sequelize.Op;

exports.getAll = (req, res) => {
  Persona
  .findAll()
  .then(function(el){
    return el;
   })
  .then(function(personaList){
    res.json(personaList);
   });
};

exports.register = (req, res) => {
  // Save User to Database
  Persona.create({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    tipo_documento: req.body.tipo_documento,
    documento: req.body.documento,
    sexo: req.body.sexo,
    genero: req.body.genero,
    descripcion_otro: req.body.descripcion_otro,
    apellido: req.body.apellido,
    edad: req.body.edad,
    origen_pais: req.body.origen_pais,
    origen_departamento: req.body.origen_departamento,
    origen_ciudad: req.body.origen_ciudad,
  })
    .then(persona => {
      Caracterizacion.create({        
        telefono: req.body.telefono,
        correo_electronico: req.body.correo_electronico,
        ciudad_domicilio: req.body.ciudad_domicilio,
        barrio_domicilio: req.body.barrio_domicilio,
        digitadorId: req.body.userId,
        personaId: persona.id,
        estado: "borrador"
      })
      .then(caraterizacion => {
        res.send({ message: "Usuario registrado satisfactoriamente!", id: caraterizacion.id});
      })      
      .catch(err => {
        res.status(500).send({ message: err.message });
      })
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
