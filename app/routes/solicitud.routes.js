const { authJwt } = require("../middleware");
const controller = require("../controllers/solicitud.controller");

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
    "/api/solicitudes",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllSolicitud
  );
  //Get All
  app.get(
    "/api/solicitudes/event",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getAllSolicitudEvent
  );
  //Get One - GET
  app.get(
    "/api/solicitudes/one",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOneSolicitud
  );
  //Get One by Radicado - GET
  app.get(
    "/api/solicitudes/one_radicado",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.getOneSolicitudByRadicado
  );
  //Create - POST
  app.post(
    "/api/solicitudes/register",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.registerSolicitud
  );
  //Update - PUT
  /*app.put("/api/solicitudes/update",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.updateSolicitud
  );*/
  //Update Estado - PUT
  app.put(
    "/api/solicitudes/update_estado",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.upload,
    controller.updateSolicitudEstado
  );
  //Delete - DELETE
  app.delete(
    "/api/solicitudes/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteSolicitud
  );
};
