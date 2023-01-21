module.exports = (sequelize, Sequelize) => {
    const Dedicacion = sequelize.define("dedicaciones", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      dedicacion: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Dedicacion;
  };
  