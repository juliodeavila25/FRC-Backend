module.exports = (sequelize, Sequelize) => {
  const Solicitud = sequelize.define("solicitudes", {
    //Datos Generales
    n_radicado: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    descripcion: {
      type: Sequelize.TEXT,
    },
    fecha_inicio: {
      type: Sequelize.DATE,
    },
    fecha_fin: {
      type: Sequelize.DATE,
    },
    observaciones: {
      type: Sequelize.TEXT,
    },
    tipo_origen: {
      type: Sequelize.STRING,
    },
    tipo_solicitud: {
      type: Sequelize.STRING,
    },
    asistentes: {
      type: Sequelize.STRING,
    },
    estado: {
      type: Sequelize.STRING,
    },
    document: {
      type: Sequelize.STRING,
    },
  });

  return Solicitud;
};
