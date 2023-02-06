import mongoose from "mongoose";

const ofertasSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    convocatoria: {
      type: String,
      trim: true,
      required: true,
    },
    ciudad: {
      type: String,
      trim: true,
      required: true,
    },
    salario: {
      type: String,
      trim: true,
      required: true,
    },
    auxilio: {
      type: String,
      trim: true,
      required: true,
    },
    bonificaciones: {
      type: String,
      trim: true,
      required: true,
    },
    perfil: {
      type: String,
      trim: true,
      required: true,
    },
    funciones: {
      type: String,
      trim: true,
      required: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

const Ofertas = mongoose.model("Ofertas", ofertasSchema);
export default Ofertas;
