const { authJwt } = require("../middleware");
const controller = require("../controllers/caracteristica.controller");

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
    "/api/caracteristicas",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllCaracteristica
  );
  //Get All Public
  app.get("/api/caracteristicas/public", controller.getAllCaracteristica);
  //Get One - GET
  app.get(
    "/api/caracteristicas/one",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOneCaracteristica
  );
  //Create - POST
  app.post(
    "/api/caracteristicas/register",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.registerCaracteristica
  );
  //Update - PUT
  app.put(
    "/api/caracteristicas/update",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.upload,
    controller.updateCaracteristica
  );
  //Delete - DELETE
  app.delete(
    "/api/caracteristicas/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteCaracteristica
  );
};
