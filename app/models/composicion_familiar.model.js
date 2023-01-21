module.exports = (sequelize, Sequelize) => {
    const Composicion_Familiar = sequelize.define("composicion_familiares", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      parentezco: {
        type: Sequelize.TEXT
      },
      edad: {
        type: Sequelize.INTEGER
      }
    },
    {
      timestamps: false
    });
  
    return Composicion_Familiar;
  };
  