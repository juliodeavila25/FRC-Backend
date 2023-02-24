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

  documento.titulo = req.body.titulo || documento.titulo;
  documento.codigo = req.body.codigo || documento.codigo;
  documento.proceso = req.body.proceso || documento.proceso;
  documento.servicio = req.body.servicio || documento.servicio;
  documento.tipo = req.body.tipo || documento.tipo;
  documento.implementacion =
    req.body.implementacion || documento.implementacion;
  documento.descripcion = req.body.descripcion || documento.descripcion;
  documento.especialidad = req.body.especialidad || documento.especialidad;
  documento.responsable = req.body.responsable || documento.responsable;
  documento.fuente = req.body.fuente || documento.fuente;
  documento.link = req.body.link || documento.link;

  try {
    const documentoAlmacenada = await documento.save();
    res.json(documentoAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

export { obtenerDocumentos, nuevoDocumento, obtenerDocumento, editarDocumento };
