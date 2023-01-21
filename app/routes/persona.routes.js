const { authJwt } = require("../middleware");
const controller = require("../controllers/persona.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //Get All
  app.get(
    "/api/personas",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.getAll
  );
  //Get One - GET
  //Create - POST
  app.post(
    "/api/personas/register",
    controller.register
  );
  //Update - PUT  
  //Delete - DELETE
};
