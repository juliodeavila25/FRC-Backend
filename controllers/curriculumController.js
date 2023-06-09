import Curriculum from "../models/Curriculum.js";

const nuevoCurriculum = async (req, res) => {
  const curriculum = new Curriculum(req.body);
  curriculum.creador = req.usuario._id;
  curriculum.estado = true;

  let arrayInputFinanciera = [];
  if (typeof req.body.inputFinanciera === "string") {
    arrayInputFinanciera = JSON.parse(req.body.inputFinanciera);
  } else {
    for (let i = 0; i < [req.body.inputFinanciera.length]; i++) {
      arrayInputFinanciera.push(JSON.parse(req.body.inputFinanciera[i]));
    }
  }
  curriculum.inputFinanciera = arrayInputFinanciera;
  //Posee Cuentas
  let arrayInputCuenta = [];
  if (typeof req.body.inputCuentas === "string") {
    arrayInputCuenta = JSON.parse(req.body.inputCuentas);
  } else {
    for (let i = 0; i < [req.body.inputCuentas.length]; i++) {
      arrayInputCuenta.push(JSON.parse(req.body.inputCuentas[i]));
    }
  }
  curriculum.inputCuentas = arrayInputCuenta;
  //Cuentas Extranjeras
  let arrayInputExtranjera = [];

  if (typeof req.body.inputExtranjera === "string") {
    arrayInputExtranjera = JSON.parse(req.body.inputExtranjera);
  } else {
    for (let i = 0; i < [req.body.inputExtranjera.length]; i++) {
      arrayInputExtranjera.push(JSON.parse(req.body.inputExtranjera[i]));
    }
  }
  curriculum.inputExtranjera = arrayInputExtranjera;

  if (Object.keys(req.files).length !== 0 && req.files) {
    curriculum.soporteExp = req.files?.soporteExp[0]?.filename;
    curriculum.soporteEps = req.files?.soporteEps[0]?.filename;
    curriculum.soportePension = req.files?.soportePension[0]?.filename;
    curriculum.rut = req.files?.rut[0]?.filename;
    curriculum.soporteContrato = req.files?.soporteContrato[0]?.filename;
  }

  try {
    const curriculumAlmacenado = await curriculum.save();
    res.json(curriculumAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerCurriculum = async (req, res) => {
  const { id } = req.params;

  const curriculum = await Curriculum.find().where("creador").equals(id);

  if (!curriculum) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (
    curriculum.length > 0 &&
    curriculum[0].creador.toString() !== req.usuario._id.toString()
  ) {
    const error = new Error("Acción no válida");
    return res.status(404).json({ msg: error.message });
  }

  res.json(curriculum);
};

const editarCurriculum = async (req, res) => {
  const { id } = req.params;

  const curriculum = await Curriculum.find().where("creador").equals(id);

  if (!curriculum) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (curriculum[0].creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(401).json({ msg: error.message });
  }

  let arrayInputFinanciera = [];

  if (typeof req.body.inputFinanciera === "string") {
    arrayInputFinanciera = JSON.parse(req.body.inputFinanciera);
  } else {
    for (let i = 0; i < [req.body.inputFinanciera.length]; i++) {
      arrayInputFinanciera.push(JSON.parse(req.body.inputFinanciera[i]));
    }
  }
  //Cuentas
  let arrayInputCuenta = [];

  if (typeof req?.body?.inputCuentas === "string") {
    arrayInputCuenta = JSON.parse(req?.body?.inputCuentas);
  } else {
    for (let i = 0; i < [req?.body?.inputCuentas?.length]; i++) {
      arrayInputCuenta.push(JSON.parse(req?.body?.inputCuentas[i]));
    }
  }
  //Extranjeras
  let arrayInputExtranjera = [];

  if (typeof req.body.inputExtranjera === "string") {
    arrayInputExtranjera = JSON.parse(req.body.inputExtranjera);
  } else {
    for (let i = 0; i < [req.body.inputExtranjera.length]; i++) {
      arrayInputExtranjera.push(JSON.parse(req.body.inputExtranjera[i]));
    }
  }

  curriculum[0].nombre = req.body.nombre || curriculum[0].nombre;
  curriculum[0].tipoDocumento =
    req.body.tipoDocumento || curriculum[0].tipoDocumento;
  curriculum[0].numeroDocumento =
    req.body.numeroDocumento || curriculum[0].numeroDocumento;
  curriculum[0].fechaNacimiento =
    req.body.fechaNacimiento || curriculum[0].fechaNacimiento;
  curriculum[0].lugarNacimiento =
    req.body.lugarNacimiento || curriculum[0].lugarNacimiento;
  curriculum[0].telefono = req.body.telefono || curriculum[0].telefono;
  curriculum[0].correo = req.body.correo || curriculum[0].correo;
  curriculum[0].direccion = req.body.direccion || curriculum[0].direccion;
  curriculum[0].estadoCivil = req.body.estadoCivil || curriculum[0].estadoCivil;
  curriculum[0].pais = req.body.pais || curriculum[0].pais;
  curriculum[0].departamento =
    req.body.departamento || curriculum[0].departamento;
  curriculum[0].ciudad = req.body.ciudad || curriculum[0].ciudad;
  curriculum[0].numeroHijos = req.body.numeroHijos || curriculum[0].numeroHijos;
  curriculum[0].tipoSangre = req.body.tipoSangre || curriculum[0].tipoSangre;
  curriculum[0].estado = req.body.estado || curriculum[0].estado;
  curriculum[0].nivel = req.body.nivel || curriculum[0].nivel;
  curriculum[0].titulo = req.body.titulo || curriculum[0].titulo;
  curriculum[0].anioTitulo = req.body.anioTitulo || curriculum[0].anioTitulo;
  curriculum[0].institucionTitulo =
    req.body.institucionTitulo || curriculum[0].institucionTitulo;
  curriculum[0].empresaExp = req.body.empresaExp || curriculum[0].empresaExp;
  curriculum[0].fechaInicioExp =
    req.body.fechaInicioExp || curriculum[0].fechaInicioExp;
  curriculum[0].fechaFinExp = req.body.fechaFinExp || curriculum[0].fechaFinExp;
  curriculum[0].nombreRefA = req.body.nombreRefA || curriculum[0].nombreRefA;
  curriculum[0].telefonoRefA =
    req.body.telefonoRefA || curriculum[0].telefonoRefA;
  curriculum[0].correoRefA = req.body.correoRefA || curriculum[0].correoRefA;
  curriculum[0].nombreRefB = req.body.nombreRefB || curriculum[0].nombreRefB;
  curriculum[0].telefonoRefB =
    req.body.telefonoRefB || curriculum[0].telefonoRefB;
  curriculum[0].correoRefB = req.body.correoRefB || curriculum[0].correoRefB;
  curriculum[0].eps = req.body.eps || curriculum[0].eps;
  curriculum[0].pension = req.body.pension || curriculum[0].pension;
  curriculum[0].tipoCuenta = req.body.tipoCuenta || curriculum[0].tipoCuenta;
  curriculum[0].entidadBancaria =
    req.body.entidadBancaria || curriculum[0].entidadBancaria;
  curriculum[0].numeroCuenta =
    req.body.numeroCuenta || curriculum[0].numeroCuenta;
  curriculum[0].soporteExp =
    (req.files.soporteExp && req.files.soporteExp[0].filename) ||
    curriculum[0].soporteExp;
  curriculum[0].soporteEps =
    (req.files.soporteEps && req.files.soporteEps[0].filename) ||
    curriculum[0].soporteEps;
  curriculum[0].soportePension =
    (req.files.soportePension && req.files.soportePension[0]?.filename) ||
    curriculum[0].soportePension;
  curriculum[0].inputFinanciera =
    arrayInputFinanciera || curriculum[0].inputFinanciera;
  //Financiera
  curriculum[0].rut =
    (req.files.rut && req.files.rut[0].filename) || curriculum[0].rut;
  curriculum[0].numeroRut = req.body.numeroRut || curriculum[0].numeroRut;
  curriculum[0].fechaCorte = req.body.fechaCorte || curriculum[0].fechaCorte;
  curriculum[0].ingresosAnuales =
    req.body.ingresosAnuales || curriculum[0].ingresosAnuales;
  curriculum[0].egresosAnuales =
    req.body.egresosAnuales || curriculum[0].egresosAnuales;
  curriculum[0].otrosIngresos =
    req.body.otrosIngresos || curriculum[0].otrosIngresos;
  curriculum[0].patrimonio = req.body.patrimonio || curriculum[0].patrimonio;
  curriculum[0].activos = req.body.activos || curriculum[0].activos;
  curriculum[0].pasivos = req.body.pasivos || curriculum[0].pasivos;
  curriculum[0].descripcionIngresos =
    req.body.descripcionIngresos || curriculum[0].descripcionIngresos;
  curriculum[0].poseeCuenta = req.body.poseeCuenta || curriculum[0].poseeCuenta;
  curriculum[0].inputCuentas = arrayInputCuenta || curriculum[0].inputCuentas;
  curriculum[0].operacionesExtranjera =
    req.body.operacionesExtranjera || curriculum[0].operacionesExtranjera;
  curriculum[0].exportaciones =
    req.body.exportaciones || curriculum[0].exportaciones;
  curriculum[0].transferencias =
    req.body.transferencias || curriculum[0].transferencias;
  curriculum[0].pagoServicios =
    req.body.pagoServicios || curriculum[0].pagoServicios;
  curriculum[0].importaciones =
    req.body.importaciones || curriculum[0].importaciones;
  curriculum[0].prestamos = req.body.prestamos || curriculum[0].prestamos;
  curriculum[0].otras = req.body.otras || curriculum[0].otras;
  curriculum[0].inputExtranjera =
    arrayInputExtranjera || curriculum[0].inputExtranjera;
  //Contrato
  curriculum[0].tipoContrato =
    req.body.tipoContrato || curriculum[0].tipoContrato;
  curriculum[0].fechaIngreso =
    req.body.fechaIngreso || curriculum[0].fechaIngreso;
  curriculum[0].fechaFin = req.body.fechaFin || curriculum[0].fechaFin;
  curriculum[0].empresa = req.body.empresa || curriculum[0].empresa;
  curriculum[0].nomina = req.body.nomina || curriculum[0].nomina;
  curriculum[0].codigoIngreso =
    req.body.codigoIngreso || curriculum[0].codigoIngreso;
  curriculum[0].sueldo = req.body.sueldo || curriculum[0].sueldo;
  curriculum[0].soporteContrato =
    (req.files.soporteContrato && req.files.soporteContrato[0]?.filename) ||
    curriculum[0].soporteContrato;
  curriculum[0].cargo = req.body.cargo || curriculum[0].cargo;
  try {
    const curriculumAlmacenado = await curriculum[0].save();

    res.json(curriculumAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

export { nuevoCurriculum, obtenerCurriculum, editarCurriculum };
