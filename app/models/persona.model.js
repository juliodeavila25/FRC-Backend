module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define("personas", {
      documento: {
        type: Sequelize.STRING,
        unique: true
      },
      nombres: {
        type: Sequelize.STRING
      },
      apellidos: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      celular: {
        type: Sequelize.STRING
      },
      cargo: {
        type: Sequelize.STRING
      }
    });
  
    return Persona;
  };
  