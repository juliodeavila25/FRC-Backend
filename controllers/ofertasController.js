import Ofertas from "../models/Ofertas.js";

const obtenerOfertas = async (req, res) => {
  const ofertas = await Ofertas.find().sort({ updatedAt: -1 });
  res.json(ofertas);
};

const nuevaOferta = async (req, res) => {
  const oferta = new Ofertas(req.body);
  oferta.creador = req.usuario._id;
  try {
    const ofertaAlmacenada = await oferta.save();
    res.json(ofertaAlmacenada);
  } catch (error) {
    console.log(erorr);
  }
};

const obtenerOferta = async (req, res) => {
  const { id } = req.params;

  const oferta = await Ofertas.findById(id);
  if (!oferta) {
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

  res.json(oferta);
};

const editarOferta = async (req, res) => {
  const { id } = req.params;

  const oferta = await Ofertas.findById(id);

  if (!oferta) {
    const error = new Error("No Encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // if (proyecto.creador.toString() !== req.usuario._id.toString()) {
  //   const error = new Error("Acción no válida");
  //   return res.status(401).json({ msg: error.message });
  // }

  oferta.nombre = req.body.nombre || oferta.nombre;
  oferta.convocatoria = req.body.convocatoria || oferta.convocatoria;
  oferta.ciudad = req.body.ciudad || oferta.ciudad;
  oferta.salario = req.body.salario || oferta.salario;
  oferta.auxilio = req.body.auxilio || oferta.auxilio;
  oferta.bonificaciones = req.body.bonificaciones || oferta.bonificaciones;
  oferta.perfil = req.body.perfil || oferta.perfil;
  oferta.funciones = req.body.funciones || oferta.funciones;

  try {
    const ofertaAlmacenada = await oferta.save();
    res.json(ofertaAlmacenada);
  } catch (error) {
    console.log(error);
  }
};

export { obtenerOfertas, nuevaOferta, obtenerOferta, editarOferta };
