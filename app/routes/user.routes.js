const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get(
    "/api/users",
    [authJwt.verifyToken],
    controller.getAll
  );

  app.post(
    "/api/user/delete",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteRow
  );

  app.get(
    "/api/users/asesor",
    [authJwt.verifyToken],
    controller.getAllAsesor
  );

  app.put("/api/users/update",
  controller.updateUsuario
  );

  app.put("/api/users/updateadmin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.updateUserAdmin
  );
  
  app.delete("/api/users/delete",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.deleteUsuario
  );
  
};
