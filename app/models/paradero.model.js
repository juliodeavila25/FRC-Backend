module.exports = (sequelize, Sequelize) => {
    const Paradero = sequelize.define("paraderos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      paradero: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Paradero;
  };
  