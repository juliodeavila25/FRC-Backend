module.exports = (sequelize, Sequelize) => {
  const Caracterizacion = sequelize.define("caracterizaciones", {
    //Datos Generales
    n_radicado: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    telefono: {
      type: Sequelize.BIGINT,
    },
    correo_electronico: {
      type: Sequelize.TEXT,
    },
    ciudad_domicilio: {
      type: Sequelize.TEXT,
    },
    barrio_domicilio: {
      type: Sequelize.TEXT,
    },
    estado: {
      type: Sequelize.TEXT,
    },
    tipo_asesoria: {
      type: Sequelize.INTEGER,
    },
    //Datos Personales
    condicion_migratoria: {
      type: Sequelize.TEXT,
    },
    permanencia_anos: {
      type: Sequelize.TEXT,
    },
    permanencia_mes: {
      type: Sequelize.TEXT,
    },
    estado_civil: {
      type: Sequelize.TEXT,
    },
    sabe_leer: {
      type: Sequelize.TEXT,
    },
    sabe_escribir: {
      type: Sequelize.TEXT,
    },
    escolaridad: {
      type: Sequelize.TEXT,
    },
    escolaridad_cual: {
      type: Sequelize.TEXT,
    },
    homologacion: {
      type: Sequelize.TEXT,
    },
    discapacidad: {
      type: Sequelize.TEXT,
    },
    hijos_estudiando: {
      type: Sequelize.TEXT,
    },
    hijos_estudiando_porque: {
      type: Sequelize.STRING,
    },
    obstaculos: {
      type: Sequelize.TEXT,
    },
    obstaculos_razon: {
      type: Sequelize.TEXT,
    },
    obstaculos_cual: {
      type: Sequelize.STRING,
    },
    ocupacion: {
      type: Sequelize.TEXT,
    },
    ocupacion_cual: {
      type: Sequelize.STRING,
    },
    prestaciones_sociales: {
      type: Sequelize.TEXT,
    },
    cuidado_hijos: {
      type: Sequelize.TEXT,
    },
    horas: {
      type: Sequelize.TEXT,
    },
    miembros_horas: {
      type: Sequelize.TEXT,
    },
    ingresos_semanales: {
      type: Sequelize.BIGINT,
    },
    ingresos_hogar: {
      type: Sequelize.BIGINT,
    },
    cuantos_hijos: {
      type: Sequelize.TEXT,
    },
    cuantas_hijas: {
      type: Sequelize.TEXT,
    },
    quien_origen: {
      type: Sequelize.STRING,
    },
    cuantos_hijos_vnzla: {
      type: Sequelize.TEXT,
    },
    cuantas_hijas_vnzla: {
      type: Sequelize.TEXT,
    },
    quien_vnzla: {
      type: Sequelize.STRING,
    },
    ciudad_anterior: {
      type: Sequelize.TEXT,
    },
    ciudad_anterior_cual: {
      type: Sequelize.STRING,
    },
    razon_cartagena: {
      type: Sequelize.TEXT,
    },
    razon_cartagena_cual: {
      type: Sequelize.STRING,
    },
    quedarse_colombia: {
      type: Sequelize.TEXT,
    },
    quedarse_colombia_donde: {
      type: Sequelize.STRING,
    },
    paradero_ciudades_cuales: {
      type: Sequelize.TEXT,
    },
    paradero_cartagena: {
      type: Sequelize.STRING,
    },
    paradero_desconocido: {
      type: Sequelize.STRING,
    },
    paradero_otro: {
      type: Sequelize.STRING,
    },
    cambios_familia_especifique: {
      type: Sequelize.STRING,
    },
    condiciones_vida: {
      type: Sequelize.TEXT,
    },
    apoyo_economico: {
      type: Sequelize.TEXT,
    },
    envia_dinero: {
      type: Sequelize.TEXT,
    },
    descripcion_otro: {
      type: Sequelize.STRING,
    },
    envia_dinero_especifique: {
      type: Sequelize.STRING,
    },
    viviendo_hijos: {
      type: Sequelize.TEXT,
    },
    viviendo_hijas: {
      type: Sequelize.TEXT,
    },
    viviendo_quien: {
      type: Sequelize.STRING,
    },
    integrantes_totales: {
      type: Sequelize.TEXT,
    },
    integrantes_ninos: {
      type: Sequelize.TEXT,
    },
    integrantes_adultos: {
      type: Sequelize.TEXT,
    },
    hogares_residen: {
      type: Sequelize.TEXT,
    },
    tipo_vivienda: {
      type: Sequelize.TEXT,
    },
    tenencia_vivienda: {
      type: Sequelize.TEXT,
    },
    tenencia_otra: {
      type: Sequelize.STRING,
    },
    condiciones_vivienda: {
      type: Sequelize.TEXT,
    },
    ambiente_cocina: {
      type: Sequelize.TEXT,
    },
    ambiente_sala: {
      type: Sequelize.TEXT,
    },
    ambiente_habitacion: {
      type: Sequelize.TEXT,
    },
    ambiente_bano: {
      type: Sequelize.TEXT,
    },
    electrodomesticos_otro: {
      type: Sequelize.TEXT,
    },
    prepara_alimentos: {
      type: Sequelize.TEXT,
    },
    cuenta_bano: {
      type: Sequelize.TEXT,
    },
    otro_bano: {
      type: Sequelize.STRING,
    },
    dormir_otro: {
      type: Sequelize.STRING,
    },
    espacio_seguro: {
      type: Sequelize.TEXT,
    },
    espacio_seguro_porque: {
      type: Sequelize.STRING,
    },
    cambia_vivienda: {
      type: Sequelize.TEXT,
    },
    motivo_vivienda: {
      type: Sequelize.STRING,
    },
    afiliacion: {
      type: Sequelize.TEXT,
    },
    condiciones_cuales: {
      type: Sequelize.STRING,
    },
    enfermedad: {
      type: Sequelize.TEXT,
    },
    enfermedad_cual: {
      type: Sequelize.STRING,
    },
    enfermedad_quien: {
      type: Sequelize.TEXT,
    },
    enfermedad_otro: {
      type: Sequelize.STRING,
    },
    atendio_enfermedad: {
      type: Sequelize.TEXT,
    },
    medidas_aislamiento: {
      type: Sequelize.TEXT,
    },
    medidas_aislamiento_porque: {
      type: Sequelize.STRING,
    },
    prueba_covid: {
      type: Sequelize.TEXT,
    },
    resultado: {
      type: Sequelize.TEXT,
    },
    tratado: {
      type: Sequelize.TEXT,
    },
    enfermedades: {
      type: Sequelize.TEXT,
    },
    enfermedad_otra: {
      type: Sequelize.STRING,
    },
    tratamiento: {
      type: Sequelize.TEXT,
    },
    tratamiento_otro: {
      type: Sequelize.STRING,
    },
    sin_ayuda: {
      type: Sequelize.TEXT,
    },
    sin_ayuda_otro: {
      type: Sequelize.STRING,
    },
    accidentes: {
      type: Sequelize.TEXT,
    },
    accidentes_otro: {
      type: Sequelize.STRING,
    },
    busco_ayuda: {
      type: Sequelize.TEXT,
    },
    busco_ayuda_otro: {
      type: Sequelize.STRING,
    },
    razon_ayuda: {
      type: Sequelize.TEXT,
    },
    razon_ayuda_otro: {
      type: Sequelize.STRING,
    },
    familiares_enfermedades: {
      type: Sequelize.TEXT,
    },
    familiares_enfermedades_cuales: {
      type: Sequelize.STRING,
    },
    muerte_violenta: {
      type: Sequelize.TEXT,
    },
    muerte_violenta_especifique: {
      type: Sequelize.STRING,
    },
    //SaludMental
    discriminacion: {
      type: Sequelize.TEXT,
    },
    lugares_discriminacion: {
      type: Sequelize.TEXT,
    },
    lugares_discriminacion_otro: {
      type: Sequelize.STRING,
    },
    produjo_discriminacion: {
      type: Sequelize.TEXT,
    },
    produjo_atendio: {
      type: Sequelize.TEXT,
    },
    dedicacion_otro: {
      type: Sequelize.STRING,
    },
    sabe_abuso_sexual: {
      type: Sequelize.TEXT,
    },
    abuso_sexual: {
      type: Sequelize.TEXT,
    },
    abuso_sexual_observacion: {
      type: Sequelize.STRING,
    },
    caso_denunciado: {
      type: Sequelize.TEXT,
    },
    capturado_culpable: {
      type: Sequelize.TEXT,
    },
    maltratos: {
      type: Sequelize.TEXT,
    },
    tipo_maltratos: {
      type: Sequelize.TEXT,
    },
    tipo_maltratos_otro: {
      type: Sequelize.STRING,
    },
    denuncia_caso: {
      type: Sequelize.TEXT,
    },
    integrante_familia: {
      type: Sequelize.TEXT,
    },
    integrante_familia_otro: {
      type: Sequelize.STRING,
    },
    cambios: {
      type: Sequelize.STRING,
    },
    consumo_sustancias: {
      type: Sequelize.TEXT,
    },
    consumo_sustancias_cuales: {
      type: Sequelize.STRING,
    },
    sentir_relaciones: {
      type: Sequelize.TEXT,
    },
    situacion_migrante: {
      type: Sequelize.TEXT,
    },
    necesidad_retornar: {
      type: Sequelize.TEXT,
    },
    //Juridica
    medio_atencion: {
      type: Sequelize.TEXT,
    },
    recibido_tipo_ayuda: {
      type: Sequelize.TEXT,
    },
    asistio_organizacion_otro: {
      type: Sequelize.STRING,
    },
    requerimientos_organizacion_otro: {
      type: Sequelize.STRING,
    },
    califica_atencion: {
      type: Sequelize.TEXT,
    },
    califica_atencion_porque: {
      type: Sequelize.STRING,
    },
    resolver_situacion: {
      type: Sequelize.TEXT,
    },
    tiempo_solicitud: {
      type: Sequelize.TEXT,
    },
    tiempo_solicitud_otro: {
      type: Sequelize.STRING,
    },
    principal_necesidad_otro: {
      type: Sequelize.STRING,
    },
    resumen_consulta: {
      type: Sequelize.STRING,
    },
    documentos_entregados: {
      type: Sequelize.STRING,
    },
    //Psicologica
    atencion_red: {
      type: Sequelize.TEXT,
    },
    atencion_red_cuales: {
      type: Sequelize.STRING,
    },
    ubicacion_red: {
      type: Sequelize.TEXT,
    },
    //Empleabilidad
    formacion_empleo: {
      type: Sequelize.STRING,
    },
    orientacion_empresas: {
      type: Sequelize.STRING,
    },
  });

  return Caracterizacion;
};
