module.exports = (sequelize, Sequelize) => {
    const Viviendo = sequelize.define("viviendo", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      viviendo: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Viviendo;
  };
  