module.exports = (sequelize, Sequelize) => {
    const Familiar_Enfermedad = sequelize.define("familiar_enfermedades", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      familiar_enfermedad: {
        type: Sequelize.TEXT
      }
    },
    {
      timestamps: false
    });
  
    return Familiar_Enfermedad;
  };
  