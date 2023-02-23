import mongoose from "mongoose";

const documentosSchema = mongoose.Schema(
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
      type: String,
      trim: true,
      default: "activo",
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

const Documentos = mongoose.model("Documentos", documentosSchema);
export default Documentos;
