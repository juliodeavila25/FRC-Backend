module.exports = (sequelize, Sequelize) => {
    const Requerimientos_Organizacion = sequelize.define("requerimientos_organizaciones", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      requerimientos_organizacion: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Requerimientos_Organizacion;
  };
  