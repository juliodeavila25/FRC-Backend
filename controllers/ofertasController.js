import Ofertas from "../models/Ofertas.js";

const obtenerOfertas = async (req, res) => {
  const ofertas = await Ofertas.find();
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

export { obtenerOfertas, nuevaOferta };
