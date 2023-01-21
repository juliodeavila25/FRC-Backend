const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.persona = require("../models/persona.model.js")(sequelize, Sequelize);
db.solicitud = require("../models/solicitud.model.js")(sequelize, Sequelize);
db.espacio = require("../models/espacio.model.js")(sequelize, Sequelize);
db.sede = require("../models/sede.model.js")(sequelize, Sequelize);
db.unidad_academica = require("../models/unidad_academica.model")(sequelize, Sequelize);
db.caracteristica = require("../models/caracteristica.model.js")(sequelize, Sequelize);
db.pregunta = require("../models/pregunta.model.js")(sequelize, Sequelize);

//Selects
/*
db.caracterizacion = require("../models/caracterizacion.model.js")(sequelize, Sequelize);
//Arrays Datos Iniciales
db.composicion_familiar = require("../models/composicion_familiar.model.js")(sequelize, Sequelize);
db.motivo_migracion = require("../models/motivo_migracion.model.js")(sequelize, Sequelize);
db.vivia_origen = require("../models/vivia_origen.model.js")(sequelize, Sequelize);
db.vivia_origen_venezuela = require("../models/vivia_origen_venezuela.model.js")(sequelize, Sequelize);
db.acompanado = require("../models/acompanado.model.js")(sequelize, Sequelize);
db.paradero = require("../models/paradero.model.js")(sequelize, Sequelize);
db.cambios_familia = require("../models/cambios_familia.model.js")(sequelize, Sequelize);
//Arrays Entorno Familiar
db.viviendo = require("../models/viviendo.model.js")(sequelize, Sequelize);
db.electrodomesticos = require("../models/electrodomesticos.model.js")(sequelize, Sequelize);
db.dormir = require("../models/dormir.model.js")(sequelize, Sequelize);
//Arrays Salud familiar
db.condiciones = require("../models/condiciones.model.js")(sequelize, Sequelize);
//Arrays Morbilidad
db.familiar_enfermedad = require("../models/familiar_enfermedad.model.js")(sequelize, Sequelize);
//Arrays Salud Mental
db.dedicacion = require("../models/dedicacion.model.js")(sequelize, Sequelize);
//Arrays Asesoría Jurídica
db.asistio_organizacion = require("../models/asistio_organizacion.model.js")(sequelize, Sequelize);
db.requerimientos_organizacion = require("../models/requerimientos_organizacion.model.js")(sequelize, Sequelize);
db.principal_necesidad = require("../models/principal_necesidad.model.js")(sequelize, Sequelize);

db.asesor_caracterizacion = require("../models/asesor_caracterizacion.model.js")(sequelize, Sequelize);

db.empleabilidad = require("../models/empleabilidad.model.js")(sequelize, Sequelize);
db.juridica = require("../models/juridica.model.js")(sequelize, Sequelize);
db.psicologica = require("../models/psicologica.model.js")(sequelize, Sequelize);
*/
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.solicitud.belongsTo(db.persona);

db.solicitud.belongsTo(db.espacio, {
  as: 'espacioSolicitado',
  foreignkey: 'espacioSolicitadoid'
});

db.solicitud.belongsTo(db.espacio, {
  as: 'espacioAsignado',
  foreignkey: 'espacioAsignadoid'
});

db.solicitud.belongsTo(db.unidad_academica);

db.espacio.belongsTo(db.sede);

db.solicitud.belongsTo(db.user, {as: 'validador'});
/*
//db.caracterizacion.belongsTo(db.user, {as: 'asesor'});

db.caracterizacion.hasMany(db.motivo_migracion);

db.caracterizacion.hasMany(db.composicion_familiar);

db.caracterizacion.hasMany(db.vivia_origen);

db.caracterizacion.hasMany(db.vivia_origen_venezuela);

db.caracterizacion.hasMany(db.acompanado);

db.caracterizacion.hasMany(db.paradero);

db.caracterizacion.hasMany(db.cambios_familia);

db.caracterizacion.hasMany(db.viviendo);

db.caracterizacion.hasMany(db.electrodomesticos);

db.caracterizacion.hasMany(db.dormir);

db.caracterizacion.hasMany(db.condiciones);

db.caracterizacion.hasMany(db.familiar_enfermedad);

db.caracterizacion.hasMany(db.dedicacion);

db.caracterizacion.hasMany(db.asistio_organizacion);

db.caracterizacion.hasMany(db.requerimientos_organizacion);

db.caracterizacion.hasMany(db.principal_necesidad);

db.caracterizacion.hasMany(db.asesor_caracterizacion);

db.caracterizacion.hasMany(db.empleabilidad);

db.caracterizacion.hasMany(db.juridica);

db.caracterizacion.hasMany(db.psicologica);

db.empleabilidad.belongsTo(db.user);

db.juridica.belongsTo(db.user);

db.psicologica.belongsTo(db.user);

db.asesor_caracterizacion.belongsTo(db.user);*/

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
