module.exports = (sequelize, Sequelize) => {
    const Carcteristica = sequelize.define("caracteristicas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.TEXT,
      },
      tipo: {
        type: Sequelize.INTEGER,
      },
      estado: {
        type: Sequelize.STRING,
      },
    });
    return Carcteristica;
  };
  