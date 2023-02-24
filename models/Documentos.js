import mongoose from "mongoose";

const documentosSchema = mongoose.Schema(
  {
    titulo: {
      type: String,
      trim: true,
      required: true,
    },
    codigo: {
      type: String,
      trim: true,
      required: true,
    },
    proceso: {
      type: String,
      trim: true,
      required: true,
    },
    servicio: {
      type: String,
      trim: true,
      required: true,
    },
    tipo: {
      type: String,
      trim: true,
      required: true,
    },
    implementacion: {
      type: String,
      trim: true,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true,
    },
    especialidad: {
      type: String,
      trim: true,
      required: true,
    },
    responsable: {
      type: String,
      trim: true,
      required: true,
    },
    fuente: {
      type: String,
      trim: true,
      required: true,
    },
    link: {
      type: String,
      trim: true,
      required: true,
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
