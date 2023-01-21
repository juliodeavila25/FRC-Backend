module.exports = (sequelize, Sequelize) => {
    const Asistio_Organizacion = sequelize.define("asistio_organizaciones", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      asistio_organizacion: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Asistio_Organizacion;
  };
  