module.exports = (sequelize, Sequelize) => {
    const Unidad_Academica = sequelize.define("unidad_academicas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.TEXT
      }
    });  
    return Unidad_Academica;
  };
  