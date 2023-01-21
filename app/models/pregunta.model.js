module.exports = (sequelize, Sequelize) => {
    const Pregunta = sequelize.define("preguntas", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: Sequelize.TEXT,
      },
      respuesta: {
        type: Sequelize.TEXT,
      },
      estado: {
        type: Sequelize.STRING,
      },
    });
    return Pregunta;
  };
  