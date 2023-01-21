module.exports = (sequelize, Sequelize) => {
    const Dormir = sequelize.define("dormir", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      dormir: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Dormir;
  };
  