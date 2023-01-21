module.exports = (sequelize, Sequelize) => {
    const Electrodomestico = sequelize.define("electrodomesticos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      electrodomestico: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Electrodomestico;
  };
  