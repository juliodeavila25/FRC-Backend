module.exports = (sequelize, Sequelize) => {
    const Vivia_Origen = sequelize.define("vivia_origenes", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      vivia_origen: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Vivia_Origen;
  };
  