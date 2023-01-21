const { authJwt } = require("../middleware");
const controller = require("../controllers/espacio.controller");

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
    "/api/espacios",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllEspacio
  );
  //Get All Public
  app.get("/api/espacios/public", controller.getAllEspacio);
  //Get One - GET
  app.get(
    "/api/espacios/one",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOneEspacio
  );
  //Create - POST
  app.post(
    "/api/espacios/register",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.upload,
    controller.registerEspacio
  );
  //Update - PUT
  app.put(
    "/api/espacios/update",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.upload,
    controller.updateEspacio
  );
  //Delete - DELETE
  app.delete(
    "/api/espacios/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteEspacio
  );
};
