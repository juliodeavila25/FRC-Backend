const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Persona = db.persona;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.getAll = (req, res) => {
  User
  .findAll({
    include: [{
      model: Role,
    }]
  })
  .then(function(el){
    return el;
   })
  .then(function(userList){
    res.json(userList);
   });
};

exports.deleteRow = (req, res) => {
    User.destroy({
      where: {
        id: req.body.id
       }
   }).then(() => {
    res.status(404).send({error: 'Usuario Eliminado'});
   });
/*
  const user = User
  .findOne(
    {
      where: {id: req.body.id}
    }
  )
  if (!user){
    console.log("err");
  }
  user.destroy();
  res.json("Eliminado");

  .then(function(el){
    return el;
   })
  .then(function(userList){
    res.json(userList);
   });*/
};


exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.getAllAsesor = (req, res) => {
  User
  .findAll({
    include: [{
      model: Role,
      where: {
        id: 2
      }
    }]
  })
  .then(function(el){
    return el;
   })
  .then(function(userList){
    res.json(userList);
   });
};

exports.updateUsuario = (req, res) => {
  User.findOne({
    where: {
      id: req.body.userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }  
      User
      .update({
         password: bcrypt.hashSync(req.body.password, 8),
      }, {
        where: { id: req.body.userId },
        returning: true,
        plain: true
      }).then(() => {
        res.status(200).send({message: 'Contraseña Actualizada', data: req.query.id});
       });  
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.updateUserAdmin = (req, res) => {
  if(req.body.password){
    User
      .update({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        tipo_asesoria: req.body.tipo_asesoria
      }, {
        where: { id: req.body.id },
        returning: true,
        plain: true
      })
      .then(caraterizacion => {
        res.send({ message: "Usuario actualizado satisfactoriamente!", id: req.body.id});
      })      
      .catch(err => {
        res.status(500).send({ message: err.message });
      })
  } else{
    User
      .update({
        username: req.body.username,
        email: req.body.email,
        tipo_asesoria: req.body.tipo_asesoria
      }, {
        where: { id: req.body.id },
        returning: true,
        plain: true
      })
      .then(caraterizacion => {
        res.send({ message: "Usuario actualizado satisfactoriamente!", id: req.body.id});
      })      
      .catch(err => {
        res.status(500).send({ message: err.message });
      })
  }
  
};

exports.deleteUsuario = (req, res) => {
  User
  .destroy({
    where: {
      id: req.query.id
     }
 }).then(() => {
  res.status(200).send({message: 'Usuario Eliminado', data: req.query.id});
 });
};