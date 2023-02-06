import mongoose from "mongoose";

const curriculumSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    tipoDocumento: {
      type: String,
      trim: true,
      required: true,
    },
    numeroDocumento: {
      type: Number,
      trim: true,
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      default: Date.now(),
    },
    lugarNacimiento: {
      type: String,
      trim: true,
      required: true,
    },
    telefono: {
      type: Number,
      trim: true,
      required: true,
    },
    correo: {
      type: String,
      trim: true,
      required: true,
    },
    direccion: {
      type: String,
      trim: true,
      required: true,
    },
    estadoCivil: {
      type: String,
      trim: true,
      required: true,
    },
    pais: {
      type: String,
      trim: true,
      required: true,
    },
    departamento: {
      type: String,
      trim: true,
      required: true,
    },
    ciudad: {
      type: String,
      trim: true,
      required: true,
    },
    numeroHijos: {
      type: Number,
      trim: true,
      required: true,
    },
    tipoSangre: {
      type: String,
      trim: true,
      required: true,
    },
    estado: {
      type: Boolean,
      default: false,
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

const Curriculum = mongoose.model("Curriculum", curriculumSchema);
export default Curriculum;
