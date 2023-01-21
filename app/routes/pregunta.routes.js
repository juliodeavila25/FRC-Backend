const { authJwt } = require("../middleware");
const controller = require("../controllers/pregunta.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //Get All
  app.get(
    "/api/preguntas",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllPregunta
  );
  //Get All Public
  app.get("/api/preguntas/public", controller.getAllPregunta);
  //Get One - GET
  app.get(
    "/api/preguntas/one",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOnePregunta
  );
  //Create - POST
  app.post(
    "/api/preguntas/register",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.registerPregunta
  );
  //Update - PUT
  app.put(
    "/api/preguntas/update",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.upload,
    controller.updatePregunta
  );
  //Delete - DELETE
  app.delete(
    "/api/preguntas/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deletePregunta
  );
};
