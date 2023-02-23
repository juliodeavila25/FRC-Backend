import Documentos from "../models/Documentos.js";

const obtenerDocumentos = async (req, res) => {
  const documentos = await Documentos.find().sort({ updatedAt: -1 });
  res.json(documentos);
};

const nuevoDocumento = async (req, res) => {
  const documento = new Documentos(req.body);
  documento.creador = req.usuario._id;
  try {
    const documentoAlmacenada = await documento.save();
    res.json(documentoAlmacenada);
  } catch (error) {
    console.log(erorr);
  }
};

const obtenerDocumento = async (req, res) => {
  const { id } = req.params;

  const documento = await Documentos.findById(id);
  if (!documento) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // console.log(oferta.creador.toString(), req.usuario._id.toString());
  // if (oferta.creador.toString() !== req.usuario._id.toString()) {
  //   const error = new Error("Acción no válida");
  //   return res.status(404).json({ msg: error.message });
  // }

  //Obtener las tareas del Proyecto
  //const tareas = await Tarea.find().where("proyecto").equals(proyecto._id);

  res.json(documento);
};

const editarDocumento = async (req, res) => {
  const { id } = req.params;

  const documento = await Documentos.findById(id);

  if (!documento) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // if (proyecto.creador.toString() !== req.usuario._id.toString()) {
  //   const error = new Error("Acción no válida");
  //   return res.status(401).json({ msg: error.message });
  // }

  documento.nombre = req.body.nombre || documento.nombre;
  documento.convocatoria = req.body.convocatoria || documento.convocatoria;
  documento.ciudad = req.body.ciudad || documento.ciudad;
  documento.salario = req.body.salario || documento.salario;
  documento.auxilio = req.body.auxilio || documento.auxilio;
  documento.bonificaciones = req.body.bonificaciones || documento.bonificaciones;
  documento.perfil = req.body.perfil || documento.perfil;
  documento.funciones = req.body.funciones || documento.funciones;

  try {
    const documentoAlmacenada = await documento.save();
    res.json(documentoAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

export { obtenerDocumentos, nuevoDocumento, obtenerDocumento, editarDocumento };
