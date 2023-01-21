module.exports = (sequelize, Sequelize) => {
  const Espacio = sequelize.define("espacios", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: Sequelize.TEXT,
    },
    caracteristicas: {
      type: Sequelize.TEXT,
    },
    avatarurl: {
      type: Sequelize.STRING,
    },
    estado: {
      type: Sequelize.STRING,
    },
  });
  return Espacio;
};
