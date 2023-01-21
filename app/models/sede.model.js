module.exports = (sequelize, Sequelize) => {
    const Sede = sequelize.define("sedes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.TEXT
      }
    });  
    return Sede;
  };
  