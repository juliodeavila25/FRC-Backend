module.exports = (sequelize, Sequelize) => {
    const Cambios_Familia = sequelize.define("cambios_familiares", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      cambios_familia: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Cambios_Familia;
  };
  