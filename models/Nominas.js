import mongoose from "mongoose";

const nominasSchema = mongoose.Schema(
  {
    identificacion: {
      type: Number,
      trim: true,
      required: true,
    },
    nombre_completo: {
      type: String,
      trim: true,
      required: true,
    },
    dias: {
      type: Number,
      trim: true,
      required: true,
    },
    sueldo_basico: {
      type: Number,
      trim: true,
      required: true,
    },
    sueldo: {
      type: Number,
      trim: true,
      required: true,
    },
    aux_transp: {
      type: Number,
      trim: true,
      required: true,
    },
    horas_extras: {
      type: Number,
      trim: true,
      required: true,
    },
    rec_nocturno: {
      type: Number,
      trim: true,
      required: true,
    },
    auxilios: {
      type: Number,
      trim: true,
      required: true,
    },
    otros_pagos: {
      type: Number,
      trim: true,
      required: true,
    },
    total_pagos: {
      type: Number,
      trim: true,
      required: true,
    },
    apt_salud: {
      type: Number,
      trim: true,
      required: true,
    },
    apt_pension: {
      type: Number,
      trim: true,
      required: true,
    },
    ret_fuente: {
      type: Number,
      trim: true,
      required: true,
    },
    otros_descuentos: {
      type: Number,
      trim: true,
      required: true,
    },
    total_descuentos: {
      type: Number,
      trim: true,
      required: true,
    },
    total_neto_pagado: {
      type: Number,
      trim: true,
      required: true,
    },
    cargo: {
      type: String,
      trim: true,
      required: true,
    },
    fecha_pago: {
      type: String,
      trim: true,
      required: true,
    },
    vacaciones: {
      type: String,
      trim: true,
      default: "NO",
    },
    periodo: {
      type: Number,
      trim: true,
      required: true,
    },
    anio: {
      type: Number,
      trim: true,
      required: true,
    },
    periodo_inicio: {
      type: String,
      trim: true,
      required: true,
    },
    periodo_fin: {
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

const Nominas = mongoose.model("Nominas", nominasSchema);
export default Nominas;
