module.exports = (sequelize, Sequelize) => {
    const Acompanado = sequelize.define("acompanados", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      acompanado: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Acompanado;
  };
  