import Curriculum from "../models/Curriculum.js";

const nuevoCurriculum = async (req, res) => {
  const curriculum = new Curriculum(req.body);
  curriculum.creador = req.usuario._id;
  curriculum.estado = true;
  try {
    const curriculumAlmacenado = await curriculum.save();
    res.json(curriculumAlmacenado);
  } catch (error) {
    console.log(erorr);
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
  console.log(req.body);
  const curriculum = await Curriculum.find().where("creador").equals(id);
  console.log(curriculum);
  if (!curriculum) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (curriculum[0].creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(401).json({ msg: error.message });
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

  try {
    const curriculumAlmacenado = await curriculum[0].save();
    res.json(curriculumAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

export { nuevoCurriculum, obtenerCurriculum, editarCurriculum };
