module.exports = (sequelize, Sequelize) => {
    const Principal_Necesidad = sequelize.define("principal_necesidades", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      principal_necesidad: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Principal_Necesidad;
  };
  