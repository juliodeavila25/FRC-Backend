module.exports = (sequelize, Sequelize) => {
    const Motivo_Migracion = sequelize.define("motivos_migraciones", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      motivo: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    }
    );  
    return Motivo_Migracion;
  };
  