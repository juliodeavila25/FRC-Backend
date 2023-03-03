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
      trim: false,
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
      required: false,
    },
    fechaIngreso: {
      type: String,
      trim: true,
      required: false,
    },
    fechaFin: {
      type: String,
      trim: true,
      required: false,
    },
    empresa: {
      type: String,
      trim: true,
      required: false,
    },
    nomina: {
      type: String,
      trim: true,
      required: false,
    },
    codigoIngreso: {
      type: Number,
      trim: true,
      required: false,
    },
    sueldo: {
      type: Number,
      trim: true,
      required: false,
    },
    soporteContrato: {
      type: String,
      required: false,
    },
    cargo: {
      type: String,
      trim: true,
      required: false,
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
      required: false,
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
      required: false,
    },
    telefonoRefB: {
      type: String,
      trim: true,
      required: false,
    },
    correoRefB: {
      type: String,
      trim: true,
      required: false,
    },
    eps: {
      type: String,
      trim: true,
      required: false,
    },
    soporteEps: {
      type: String,
      required: false,
    },
    pension: {
      type: String,
      trim: true,
      required: false,
    },
    soportePension: {
      type: String,
      required: false,
    },
    tipoCuenta: {
      type: String,
      trim: true,
      required: false,
    },
    entidadBancaria: {
      type: String,
      trim: true,
      required: false,
    },
    numeroCuenta: {
      type: String,
      trim: true,
      required: false,
    },
    estado: {
      type: Boolean,
      default: false,
    },
    inputFinanciera: [
      {
        type: {},
        required: false,
        trim: true,
      },
    ],
    rut: {
      type: String,
      required: false,
    },
    numeroRut: {
      type: String,
      trim: true,
      required: false,
    },
    fechaCorte: {
      type: String,
      trim: true,
      required: false,
    },
    ingresosAnuales: {
      type: Number,
      //trim: true,
      required: false,
    },
    egresosAnuales: {
      type: Number,
      //trim: true,
      required: false,
    },
    otrosIngresos: {
      type: Number,
      //trim: true,
      required: false,
    },
    patrimonio: {
      type: Number,
      //trim: true,
      required: false,
    },
    activos: {
      type: Number,
      //trim: true,
      required: false,
    },
    pasivos: {
      type: Number,
      //trim: true,
      required: false,
    },
    descripcionIngresos: {
      type: String,
      // trim: true,
      required: false,
    },
    poseeCuenta: {
      type: String,
      //trim: true,
      required: false,
    },
    inputCuentas: [
      {
        type: {},
        required: false,
        //trim: true,
      },
    ],
    operacionesExtranjera: {
      type: String,
      //trim: true,
      required: false,
    },
    exportaciones: {
      type: Boolean,
      //trim: true,
      required: false,
    },
    transferencias: {
      type: Boolean,
      //trim: true,
      required: false,
    },
    pagoServicios: {
      type: Boolean,
      //trim: true,
      required: false,
    },
    importaciones: {
      type: Boolean,
      //trim: true,
      required: false,
    },
    prestamos: {
      type: Boolean,
      //trim: true,
      required: false,
    },
    otras: {
      type: Boolean,
      //trim: true,
      required: false,
    },
    inputExtranjera: [
      {
        type: {},
        required: false,
        //trim: true,
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
