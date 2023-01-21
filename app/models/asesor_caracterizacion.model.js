module.exports = (sequelize, Sequelize) => {
    const Asesor_Caracterizacion = sequelize.define("asesor_caracterizaciones", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      tipo: {
        type: Sequelize.TEXT
      },
      estado: {
        type: Sequelize.TEXT
      }
    }
    );  
    return Asesor_Caracterizacion;
  };
  