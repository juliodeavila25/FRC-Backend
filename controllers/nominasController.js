import Nominas from "../models/Nominas.js";

const obtenerNominas = async (req, res) => {
  const nominas = await Nominas.find().sort({ updatedAt: -1 });
  res.json(nominas);
};

const obtenerNominasbyPeriodo = async (req, res) => {
  /*res.json({"id":"12"});
  console.log(req);
   console.log(res);*/
  
  //const { identificacion, periodo } = req.body;
  const { id } = req.params;
  //let  identificacion = "1050953869"; 
  let  periodo = "202302";
  const nomina = await Nominas.findOne({identificacion : id}).where("periodo").equals(periodo);
  if (!nomina) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }
  res.json(nomina);
};

const nuevaNomina = async (req, res) => {
  const nomina = new Nominas(req.body);
  nomina.creador = req.usuario._id;
  try {
    const nominaAlmacenada = await nomina.save();
    res.json(nominaAlmacenada);
  } catch (error) {
    console.log(erorr);
  }
};

const obtenerNomina = async (req, res) => {
  const { id } = req.params;

  const nomina = await Nominas.findById(id);
  if (!nomina) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }
  res.json(nomina);
};

const editarNomina = async (req, res) => {
  const { id } = req.params;

  const nomina = await Nominas.findById(id);

  if (!nomina) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  nomina.consecutivo = req.body.consecutivo || nomina.consecutivo;
  nomina.identificacion = req.body.identificacion || nomina.identificacion;
  nomina.nombre_completo = req.body.nombre_completo || nomina.nombre_completo;
  nomina.dias = req.body.dias || nomina.dias;
  nomina.sueldo_basico = req.body.sueldo_basico || nomina.sueldo_basico;
  nomina.sueldo = req.body.sueldo || nomina.sueldo;
  nomina.aux_transp = req.body.aux_transp || nomina.aux_transp;
  nomina.horas_extras = req.body.horas_extras || nomina.horas_extras;
  nomina.rec_nocturno = req.body.rec_nocturno || nomina.rec_nocturno;
  nomina.auxilios = req.body.auxilios || nomina.auxilios;
  nomina.otros_pagos = req.body.otros_pagos || nomina.otros_pagos;
  nomina.total_pagos = req.body.total_pagos || nomina.total_pagos;
  nomina.apt_salud = req.body.apt_salud || nomina.apt_salud;
  nomina.apt_pension = req.body.apt_pension || nomina.apt_pension;
  nomina.ret_fuente = req.body.ret_fuente || nomina.ret_fuente;
  nomina.otros_descuentos = req.body.otros_descuentos || nomina.otros_descuentos;
  nomina.total_descuentos = req.body.total_descuentos || nomina.total_descuentos;
  nomina.total_neto_pagado = req.body.total_neto_pagado || nomina.total_neto_pagado;
  nomina.cargo = req.body.cargo || nomina.cargo;
  nomina.fecha_pago = req.body.fecha_pago || nomina.fecha_pago;
  nomina.vacaciones = req.body.vacaciones || nomina.vacaciones;
  nomina.periodo = req.body.periodo || nomina.periodo;


  try {
    const nominaAlmacenada = await nomina.save();
    res.json(nominaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

export { obtenerNominas,obtenerNominasbyPeriodo, nuevaNomina, obtenerNomina, editarNomina };
