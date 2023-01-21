module.exports = (sequelize, Sequelize) => {
    const Condicion = sequelize.define("condiciones", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      condicion: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Condicion;
  };
  