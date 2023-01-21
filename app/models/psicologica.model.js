  module.exports = (sequelize, Sequelize) => {
    const Psicosocial = sequelize.define("psicologica_asesorias", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha_atencion_psicosocial: {
        type: Sequelize.DATE
      },
      tipo_poblacion_psicosocial: {
        type: Sequelize.TEXT
      },
      edad_psicosocial: {
        type: Sequelize.INTEGER
      },
      temas_psicosocial: {
        type: Sequelize.STRING
      },
      avances_psicosocial: {
        type: Sequelize.STRING
      },
      reportes_psicosocial: {
        type: Sequelize.STRING
      },
      tuvo_solucion_psicosocial: {
        type: Sequelize.INTEGER
      },
      observaciones_psicosocial: {
        type: Sequelize.STRING
      },
      estado_psicosocial: {
        type: Sequelize.STRING
      }
    });
  
    return Psicosocial;
  };
  