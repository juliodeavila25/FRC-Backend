const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var bcrypt = require("bcryptjs");

const app = express();
/*
var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));*/

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Sede = db.sede;
const Unidad_Academica = db.unidad_academica;

//db.sequelize.sync();
//force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Database with { force: true }");
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

//static images folder
app.use("/Images", express.static("./Images"));

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/persona.routes")(app);
require("./app/routes/espacio.routes")(app);
require("./app/routes/solicitud.routes")(app);
require("./app/routes/sede.routes")(app);
require("./app/routes/caracteristica.routes")(app);
require("./app/routes/pregunta.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });

  Sede.create({
    id: 1,
    nombre: "Ciencias de la Salud",
  });

  Sede.create({
    id: 2,
    nombre: "Ciencias Económicas e Ingeniería",
  });

  Sede.create({
    id: 3,
    nombre: "Claustro de San Agustín",
  });

  Sede.create({
    id: 4,
    nombre: "Claustro La Merced",
  });

  Sede.create({
    id: 5,
    nombre: "Ciencias Exactas y Naturales",
  });

  Unidad_Academica.create({
    id: 1,
    nombre: "No Aplica",
  });

  Unidad_Academica.create({
    id: 2,
    nombre: "Facultad de Ciencias Económicas",
  });

  Unidad_Academica.create({
    id: 3,
    nombre: "Facultad de Ingeniería",
  });

  Unidad_Academica.create({
    id: 4,
    nombre: "Facultad de Ciencias Exactas y Naturales",
  });

  Unidad_Academica.create({
    id: 5,
    nombre: "Facultad de Odontología",
  });

  Unidad_Academica.create({
    id: 6,
    nombre: "Facultad de Enfermería",
  });

  Unidad_Academica.create({
    id: 7,
    nombre: "Facultad de Ciencias Farmacéuticas",
  });

  Unidad_Academica.create({
    id: 8,
    nombre: "Facultad de Medicina",
  });

  Unidad_Academica.create({
    id: 9,
    nombre: "Facultad de Ciencias Sociales y Educación",
  });

  Unidad_Academica.create({
    id: 10,
    nombre: "Facultad de Ciencias Humanas",
  });

  Unidad_Academica.create({
    id: 11,
    nombre: "Facultad de Derecho y Ciencias Políticas",
  });

  Unidad_Academica.create({
    id: 12,
    nombre: "Dependencia Administrativa",
  });
  /*
  User.create({
    "username":"Admin",
    "email":"admin@gmail.com",
    "password":bcrypt.hashSync("123456789", 8) ,
    "roles":["admin"]
  });

  User.create({
    "username":"Digitador",
    "email":"digitadora@gmail.com",
    "password":bcrypt.hashSync("123456789", 8) ,
    "roles":["user"]
  });*/
}
