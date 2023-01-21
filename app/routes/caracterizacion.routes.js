const { authJwt } = require("../middleware");
const controller = require("../controllers/caracterizacion.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //Get All excel
  app.get(
    "/api/caracterizaciones/excel",
    [authJwt.verifyToken],
    controller.getAllExcel
  );

  //Get All
  app.get(
    "/api/caracterizaciones/admin",
    [authJwt.verifyToken],
    controller.getAllAdmin
  );

  //Get All
  app.get(
    "/api/caracterizaciones/asesor",
    [authJwt.verifyToken],
    controller.getAllAsesor
  );

  //Get All
  app.get(
    "/api/caracterizaciones/borrador",
    [authJwt.verifyToken],
    controller.getAllBorrador
  );
  //Get One - GET
  app.get("/api/caracterizacion", [authJwt.verifyToken], controller.getAllByID);
  app.get(
    "/api/caracterizacion/DatosBasicos",
    [authJwt.verifyToken],
    controller.getAllDatosBasicosByID
  );
  app.get(
    "/api/caracterizacion/DatosPersonales",
    [authJwt.verifyToken],
    controller.getAllDatosPersonalesByID
  );
  app.get(
    "/api/caracterizacion/EntornoFamiliar",
    [authJwt.verifyToken],
    controller.getAllEntornoFamiliarByID
  );
  app.get(
    "/api/caracterizacion/SaludFamiliar",
    [authJwt.verifyToken],
    controller.getAllSaludFamiliarByID
  );
  app.get(
    "/api/caracterizacion/Morbilidad",
    [authJwt.verifyToken],
    controller.getAllMorbilidadByID
  );
  app.get(
    "/api/caracterizacion/SaludMental",
    [authJwt.verifyToken],
    controller.getAllSaludMentalByID
  );
  app.get(
    "/api/caracterizacion/AsesoriaJuridica",
    [authJwt.verifyToken],
    controller.getAllAsesoriaJuridicaByID
  );
  app.get(
    "/api/caracterizacion/Asignacion",
    [authJwt.verifyToken],
    controller.getAllAsignacionByID
  );

  app.get(
    "/api/caracterizacion/AsesorAsignado",
    [authJwt.verifyToken],
    controller.getAllDataAsignacionByID
  );

  app.get(
    "/api/caracterizacion/AsesorAsignadoEstado",
    [authJwt.verifyToken],
    controller.getAllDataAsignacionByIDEstado
  );

  //Create - POST
  //Update - PUT
  app.put(
    "/api/caracterizaciones/update",
    [authJwt.verifyToken],
    controller.updateCartacterizacion
  );

  //Update - PUT
  app.put(
    "/api/caracterizaciones/update/estado",
    [authJwt.verifyToken],
    controller.updateCartacterizacionEstado
  );

  //Update Step Names - PUT
  app.put(
    "/api/caracterizaciones/update_names",
    [authJwt.verifyToken],
    controller.updateCartacterizacionNames
  );

  //Update Step Datos Familiares - PUT
  app.put(
    "/api/caracterizaciones/update_familiar",
    [authJwt.verifyToken],
    controller.updateCartacterizacionEntornoFamiliar
  );

  //Update Step Datos Salud Familiar - PUT
  app.put(
    "/api/caracterizaciones/update_salud_familiar",
    [authJwt.verifyToken],
    controller.updateCartacterizacionSaludFamiliar
  );

  //Update Step Morbilidad Menores - PUT
  app.put(
    "/api/caracterizaciones/update_morbilidad_menores",
    [authJwt.verifyToken],
    controller.updateCartacterizacionMorbilidadMenores
  );

  //Update Step Morbilidad Mayores - PUT
  app.put(
    "/api/caracterizaciones/update_morbilidad_mayores",
    [authJwt.verifyToken],
    controller.updateCartacterizacionMorbilidadMayores
  );

  //Update Step Morbilidad Cronica - PUT
  app.put(
    "/api/caracterizaciones/update_morbilidad_cronica",
    [authJwt.verifyToken],
    controller.updateCartacterizacionMorbilidadCronica
  );

  //Update Step Mortalidad - PUT
  app.put(
    "/api/caracterizaciones/update_mortalidad",
    [authJwt.verifyToken],
    controller.updateCartacterizacionMortalidad
  );

  //Update Step Salud Mental - PUT
  app.put(
    "/api/caracterizaciones/update_salud_mental",
    [authJwt.verifyToken],
    controller.updateCartacterizacionSaludMental
  );

  //Update Step Juridica - PUT
  app.put(
    "/api/caracterizaciones/update_juridica",
    [authJwt.verifyToken],
    controller.updateCartacterizacionJuridica
  );

  //Update Step Psicologica - PUT
  app.put(
    "/api/caracterizaciones/update_psicologica",
    [authJwt.verifyToken],
    controller.updateCartacterizacionPsicologica
  );

  //Update Step Empleabilidad - PUT
  app.put(
    "/api/caracterizaciones/update_empleabilidad",
    [authJwt.verifyToken],
    controller.updateCartacterizacionEmpleabilidad
  );

  //Update - PUT Tipo Caraterización
  app.put(
    "/api/caracterizaciones/update/tipo",
    [authJwt.verifyToken],
    controller.updateTipoAsesoria
  );

  //Update - PUT Tipo Caraterización Final
  app.put(
    "/api/caracterizaciones/update/tipofinal",
    [authJwt.verifyToken],
    controller.updateTipoAsesoriaFinal
  );

  //Update - PUT Tipo Asesoria Estado
  app.put(
    "/api/caracterizaciones/update/tipo_estado",
    [authJwt.verifyToken],
    controller.updateTipoAsesoriaEstado
  );

  //Delete - DELETE
  app.delete(
    "/api/caracterizacion/delete",
    [authJwt.verifyToken],
    controller.deleteCartacterizacion
  );

  //Update - PUT Tipo Caraterización
  app.put(
    "/api/caracterizaciones/update/asesor",
    [authJwt.verifyToken],
    controller.updateAsesor
  );

  //Asesorias
  //Juridica
  app.get(
    "/api/caracterizaciones/getAll/asesoriajuridica",
    [authJwt.verifyToken],
    controller.getAllAsesoriaJuridica
  );
  app.get(
    "/api/caracterizaciones/getOne/asesoriajuridica",
    [authJwt.verifyToken],
    controller.getOneAsesoriaJuridica
  );
  app.post(
    "/api/caracterizaciones/create/asesoriajuridica",
    [authJwt.verifyToken],
    controller.registerAsesoriaJuridica
  );
  app.put(
    "/api/caracterizaciones/update/asesoriajuridica",
    [authJwt.verifyToken],
    controller.updateAsesoriaJuridica
  );
  app.delete(
    "/api/caracterizaciones/delete/asesoriajuridica",
    [authJwt.verifyToken],
    controller.deleteAsesoriaJuridica
  );
  //Empleabilidad
  app.get(
    "/api/caracterizaciones/getAll/asesoriaempleabilidad",
    [authJwt.verifyToken],
    controller.getAllAsesoriaEmpleabilidad
  );
  app.get(
    "/api/caracterizaciones/getOne/asesoriaempleabilidad",
    [authJwt.verifyToken],
    controller.getOneAsesoriaEmpleabilidad
  );
  app.post(
    "/api/caracterizaciones/create/asesoriaempleabilidad",
    [authJwt.verifyToken],
    controller.registerAsesoriaEmpleabilidad
  );
  app.put(
    "/api/caracterizaciones/update/asesoriaempleabilidad",
    [authJwt.verifyToken],
    controller.updateAsesoriaEmpleabilidad
  );
  app.delete(
    "/api/caracterizaciones/delete/asesoriaempleabilidad",
    [authJwt.verifyToken],
    controller.deleteAsesoriaEmpleabilidad
  );
  //Psicosocial
  app.get(
    "/api/caracterizaciones/getAll/asesoriapsicosocial",
    [authJwt.verifyToken],
    controller.getAllAsesoriaPsicosocial
  );
  app.get(
    "/api/caracterizaciones/getOne/asesoriapsicosocial",
    [authJwt.verifyToken],
    controller.getOneAsesoriaPsicosocial
  );
  app.post(
    "/api/caracterizaciones/create/asesoriapsicosocial",
    [authJwt.verifyToken],
    controller.registerAsesoriaPsicosocial
  );
  app.put(
    "/api/caracterizaciones/update/asesoriapsicosocial",
    [authJwt.verifyToken],
    controller.updateAsesoriaPsicosocial
  );
  app.delete(
    "/api/caracterizaciones/delete/asesoriapsicosocial",
    [authJwt.verifyToken],
    controller.deleteAsesoriaPsicosocial
  );
};
