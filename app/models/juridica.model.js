module.exports = (sequelize, Sequelize) => {
  const Juridica = sequelize.define("juridica_asesorias", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha_atencion_juridico: {
      type: Sequelize.DATE
    },
    remitido_juridico: {
      type: Sequelize.INTEGER
    },
    entidad_juridico: {
      type: Sequelize.STRING
    },
    tiempo_espera_juridico: {
      type: Sequelize.INTEGER
    },
    resumen_juridico: {
      type: Sequelize.STRING
    },
    tuvo_solucion_juridico: {
      type: Sequelize.INTEGER
    },
    observaciones_juridico: {
      type: Sequelize.STRING
    },
    estado_juridico: {
      type: Sequelize.STRING
    }
  });

  return Juridica;
};
