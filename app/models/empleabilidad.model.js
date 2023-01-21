module.exports = (sequelize, Sequelize) => {
    const Empleabilidad = sequelize.define("empleabilidad_asesorias", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fecha_atencion_empleabilidad: {
        type: Sequelize.DATE
      },
      genero_empleabilidad: {
        type: Sequelize.INTEGER
      },
      edad_empleabilidad: {
        type: Sequelize.INTEGER
      },
      tipo_empleabilidad: {
        type: Sequelize.STRING
      },
      nombre_empleabilidad: {
        type: Sequelize.STRING
      },
      descripcion_empleabilidad: {
        type: Sequelize.STRING
      },
      responsable_empleabilidad: {
        type: Sequelize.STRING
      },
      tuvo_solucion_empleabilidad: {
        type: Sequelize.INTEGER
      },
      observaciones_empleabilidad: {
        type: Sequelize.STRING
      },
      estado_empleabilidad: {
        type: Sequelize.STRING
      }
    });
  
    return Empleabilidad;
  };
  