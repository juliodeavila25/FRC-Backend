module.exports = (sequelize, Sequelize) => {
    const Vivia_Origen_Venezuela = sequelize.define("viven_venezuela", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      vivia_origen_venezuela: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Vivia_Origen_Venezuela;
  };
  