const { authJwt } = require("../middleware");
const controller = require("../controllers/sede.controller");

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
    "/api/sedes",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllSede
  );
  //Get All Public
  app.get(
    "/api/sedes/public",
    controller.getAllSede
  );
  /*
  //Get One - GET
  app.get(
    "/api/sedes/one",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOneSede
  );
  //Create - POST
  app.post(
    "/api/sedes/register",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.registerSede
  );
  //Update - PUT  
  app.put("/api/sedes/update",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.updateSede
  );
  //Delete - DELETE
  app.delete(
    "/api/sedes/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteSede
  ); */
};
