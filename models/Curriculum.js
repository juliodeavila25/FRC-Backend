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
    tipoContrato: {
      type: String,
      trim: true,
      required: true,
    },
    fechaIngreso: {
      type: String,
      trim: true,
      required: true,
    },
    fechaFin: {
      type: String,
      trim: true,
      required: true,
    },
    nivel: {
      type: String,
      trim: true,
      required: true,
    },
    titulo: {
      type: String,
      trim: true,
      required: true,
    },
    anioTitulo: {
      type: Number,
      trim: true,
      required: true,
    },
    institucionTitulo: {
      type: String,
      trim: true,
      required: true,
    },
    empresaExp: {
      type: String,
      trim: true,
      required: true,
    },
    fechaInicioExp: {
      type: Date,
      default: Date.now(),
    },
    fechaFinExp: {
      type: Date,
      default: Date.now(),
    },
    soporteExp: {
      type: String,
      required: true,
    },
    nombreRefA: {
      type: String,
      trim: true,
      required: true,
    },
    telefonoRefA: {
      type: String,
      trim: true,
      required: true,
    },
    correoRefA: {
      type: String,
      trim: true,
      required: true,
    },
    nombreRefB: {
      type: String,
      trim: true,
      required: true,
    },
    telefonoRefB: {
      type: String,
      trim: true,
      required: true,
    },
    correoRefB: {
      type: String,
      trim: true,
      required: true,
    },
    eps: {
      type: String,
      trim: true,
      required: true,
    },
    soporteEps: {
      type: String,
      required: true,
    },
    pension: {
      type: String,
      trim: true,
      required: true,
    },
    soportePension: {
      type: String,
      required: true,
    },
    tipoCuenta: {
      type: String,
      trim: true,
      required: true,
    },
    entidadBancaria: {
      type: String,
      trim: true,
      required: true,
    },
    numeroCuenta: {
      type: String,
      trim: true,
      required: true,
    },
    estado: {
      type: Boolean,
      default: false,
    },
    inputFinanciera: [
      {
        type: {},
        required: true,
        trim: true,
      },
    ],
    rut: {
      type: String,
      required: true,
    },
    numeroRut: {
      type: String,
      trim: true,
      required: true,
    },
    fechaCorte: {
      type: String,
      trim: true,
      required: true,
    },
    ingresosAnuales: {
      type: Number,
      trim: true,
      required: true,
    },
    egresosAnuales: {
      type: Number,
      trim: true,
      required: true,
    },
    otrosIngresos: {
      type: Number,
      trim: true,
      required: true,
    },
    patrimonio: {
      type: Number,
      trim: true,
      required: true,
    },
    activos: {
      type: Number,
      trim: true,
      required: true,
    },
    pasivos: {
      type: Number,
      trim: true,
      required: true,
    },
    descripcionIngresos: {
      type: String,
      trim: true,
      required: true,
    },
    poseeCuenta: {
      type: String,
      trim: true,
      required: true,
    },
    inputCuentas: [
      {
        type: {},
        required: false,
        trim: true,
      },
    ],
    operacionesExtranjera: {
      type: String,
      trim: true,
      required: true,
    },
    exportaciones: {
      type: String,
      trim: true,
      required: false,
    },
    transferencias: {
      type: String,
      trim: true,
      required: false,
    },
    pagoServicios: {
      type: String,
      trim: true,
      required: false,
    },
    importaciones: {
      type: String,
      trim: true,
      required: false,
    },
    prestamos: {
      type: String,
      trim: true,
      required: false,
    },
    otras: {
      type: String,
      trim: true,
      required: false,
    },
    inputExtranjera: [
      {
        type: {},
        required: false,
        trim: true,
      },
    ],
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
