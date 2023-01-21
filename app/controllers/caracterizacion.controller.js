const db = require("../models");
const config = require("../config/auth.config");
const { juridica, empleabilidad } = require("../models");
const { QueryTypes } = require("sequelize");
//Datos Basicos
const User = db.user;
const Persona = db.persona;
const Caracterizacion = db.caracterizacion;
const Motivo_Migracion = db.motivo_migracion;
const Vivia_Origen = db.vivia_origen;
const Vivia_Origen_Venezuela = db.vivia_origen_venezuela;
const Acompanado = db.acompanado;
const Paradero = db.paradero;
const Cambios_Familia = db.cambios_familia;
const Composicion_Familiar = db.composicion_familiar;
//Entorno Familiar
const Viviendo = db.viviendo;
const Electrodomestico = db.electrodomesticos;
const Dormir = db.dormir;
//Salud Familiar
const Condicion = db.condiciones;
//MorbilidadMayores
const Familiar_Enfermedad = db.familiar_enfermedad;
//Salud Mental
const Dedicacion = db.dedicacion;
//Juridica
const Asistio_Organizacion = db.asistio_organizacion;
const Requerimiento_Organizacion = db.requerimientos_organizacion;
const Principal_Necesidad = db.principal_necesidad;
//Tipo Asignacion
const Asesor_Caracterizacion = db.asesor_caracterizacion;
//Asesorias
const Asesoria_Juridica = db.juridica;
const Asesoria_Empleabilidad = db.empleabilidad;
const Asesoria_Psicosocial = db.psicologica;

const Op = db.Sequelize.Op;

exports.getAllExcel = (req, res) => {
  // Callee is the model definition. This allows you to easily map a query to a predefined model

  Caracterizacion.sequelize
    .query(
      "SELECT personas.nombre, personas.apellido, CASE WHEN personas.sexo = 1 THEN 'Masculino' WHEN personas.sexo = 2 THEN 'Femenino' END AS sexo, CASE WHEN personas.genero = 1 THEN 'Hombre' WHEN personas.genero = 2 THEN 'Mujer' WHEN personas.genero = 3 THEN 'Hombre Transgenero' WHEN personas.genero = 4 THEN 'Mujer Transgenero' WHEN personas.genero = 5 THEN 'Intersexual' END AS genero, personas.edad, caracterizaciones.telefono, caracterizaciones.correo_electronico, caracterizaciones.ciudad_domicilio, caracterizaciones.barrio_domicilio, CASE WHEN personas.tipo_documento = 1 THEN 'Cédula de identidad venezolana' WHEN personas.tipo_documento = 2 THEN 'Cedula de ciudadanía' WHEN personas.tipo_documento = 3 THEN 'Cédula de Extranjería' WHEN personas.tipo_documento = 4 THEN 'Pasaporte' WHEN personas.tipo_documento = 5 THEN 'Registro Civil' WHEN personas.tipo_documento = 6 THEN 'Tarjeta de identidad' WHEN personas.tipo_documento = 7 THEN 'PEP' WHEN personas.tipo_documento = 8 THEN 'Visa' WHEN personas.tipo_documento = 9 THEN 'Otro' END AS tipo_documento, personas.descripcion_otro, personas.documento, personas.origen_ciudad, personas.origen_departamento, personas.origen_pais, /* 1. Datos personales del encuestado */ CASE WHEN caracterizaciones.condicion_migratoria = 1 THEN 'Migrante regular' WHEN caracterizaciones.condicion_migratoria = 2 THEN 'Migrante irregular' WHEN caracterizaciones.condicion_migratoria = 3 THEN 'Colombiano retornado' END AS condicion_migratoria, /* 14. Array */ (SELECT GROUP_CONCAT( CASE WHEN motivos_migraciones.motivo = 1 THEN 'Escasez de alimentos' WHEN motivos_migraciones.motivo = 2 THEN 'Ausencia de servicios médicos y medicinas' WHEN motivos_migraciones.motivo = 3 THEN 'Necesidad de buscar mayores ingresos' WHEN motivos_migraciones.motivo = 4 THEN 'Inseguridad en el país' WHEN motivos_migraciones.motivo = 5 THEN 'Amenazas directas a su vida o familiares' WHEN motivos_migraciones.motivo = 6 THEN 'Alto costo de bienes y servicios' WHEN motivos_migraciones.motivo = 7 THEN 'Dificultades de acceso a la educación' ELSE 0 END ) FROM motivos_migraciones WHERE motivos_migraciones.caracterizacioneId = caracterizaciones.id) AS motivos_migraciones, caracterizaciones.permanencia_anos, caracterizaciones.permanencia_mes, CASE WHEN caracterizaciones.estado_civil = 1 THEN 'Soltero(a)' WHEN caracterizaciones.estado_civil = 2 THEN 'Casado(a)' WHEN caracterizaciones.estado_civil = 3 THEN 'Unión libre' WHEN caracterizaciones.estado_civil = 4 THEN 'Otro' END AS estado_civil, CASE WHEN caracterizaciones.sabe_leer = 1 THEN 'Si' WHEN caracterizaciones.sabe_leer = 2 THEN 'No' END AS sabe_leer, CASE WHEN caracterizaciones.sabe_escribir = 1 THEN 'Si' WHEN caracterizaciones.sabe_escribir = 2 THEN 'No' END AS sabe_escribir, CASE WHEN caracterizaciones.escolaridad = 1 THEN 'Primaria Completa' WHEN caracterizaciones.escolaridad = 2 THEN 'Primaria Incompleta' WHEN caracterizaciones.escolaridad = 3 THEN 'Secundaria Completa' WHEN caracterizaciones.escolaridad = 4 THEN 'Secundaria Incompleta' WHEN caracterizaciones.escolaridad = 5 THEN 'Técnica o Tecnológica' WHEN caracterizaciones.escolaridad = 6 THEN 'Universitaria' WHEN caracterizaciones.escolaridad = 7 THEN 'Postgrado' WHEN caracterizaciones.escolaridad = 8 THEN 'Oficio' END AS escolaridad, caracterizaciones.escolaridad_cual, CASE WHEN caracterizaciones.homologacion = 1 THEN 'Si' WHEN caracterizaciones.homologacion = 2 THEN 'No' END AS homologacion, CASE WHEN caracterizaciones.discapacidad = 1 THEN 'Motora' WHEN caracterizaciones.discapacidad = 2 THEN 'Auditiva' WHEN caracterizaciones.discapacidad = 3 THEN 'Visual' WHEN caracterizaciones.discapacidad = 4 THEN 'Del habla' WHEN caracterizaciones.discapacidad = 5 THEN 'Mental' WHEN caracterizaciones.discapacidad = 6 THEN 'Otra' WHEN caracterizaciones.discapacidad = 7 THEN 'Ninguna' END AS discapacidad, /* 20. Array */ (SELECT GROUP_CONCAT(composicion_familiares.parentezco,'(',composicion_familiares.edad,')') FROM composicion_familiares WHERE composicion_familiares.caracterizacioneId = caracterizaciones.id) AS composicion_familiares, CASE WHEN caracterizaciones.hijos_estudiando = 1 THEN 'Si' WHEN caracterizaciones.hijos_estudiando = 2 THEN 'No' WHEN caracterizaciones.hijos_estudiando = 3 THEN 'No tiene' END AS hijos_estudiando, caracterizaciones.hijos_estudiando_porque, CASE WHEN caracterizaciones.obstaculos = 1 THEN 'Si' WHEN caracterizaciones.obstaculos = 2 THEN 'No' WHEN caracterizaciones.obstaculos = 3 THEN 'No tiene' END AS obstaculos, CASE WHEN caracterizaciones.obstaculos_razon = 1 THEN 'Documentación' WHEN caracterizaciones.obstaculos_razon = 2 THEN 'Edad del menor' WHEN caracterizaciones.obstaculos_razon = 3 THEN 'Validación de los cursos aprobados' WHEN caracterizaciones.obstaculos_razon = 4 THEN 'Otro' END AS obstaculos_razon, obstaculos_cual, CASE WHEN caracterizaciones.ocupacion = 1 THEN 'Empleado' WHEN caracterizaciones.ocupacion = 2 THEN 'Ama de Casa' WHEN caracterizaciones.ocupacion = 3 THEN 'Desempleado' WHEN caracterizaciones.ocupacion = 4 THEN 'Estudiante' WHEN caracterizaciones.ocupacion = 5 THEN 'Trabajador independiente' WHEN caracterizaciones.ocupacion = 6 THEN 'Informal' WHEN caracterizaciones.ocupacion = 7 THEN 'Negocio propio' END AS ocupacion, ocupacion_cual, CASE WHEN caracterizaciones.prestaciones_sociales = 1 THEN 'Si' WHEN caracterizaciones.prestaciones_sociales = 2 THEN 'No' END AS prestaciones_sociales, CASE WHEN caracterizaciones.cuidado_hijos = 1 THEN 'Su pareja' WHEN caracterizaciones.cuidado_hijos = 2 THEN 'Algun familiar' WHEN caracterizaciones.cuidado_hijos = 3 THEN 'Vecina(o)' WHEN caracterizaciones.cuidado_hijos = 4 THEN 'Nadie, los deja solos' WHEN caracterizaciones.cuidado_hijos = 5 THEN 'Se los lleva al lugar de trabajo' WHEN caracterizaciones.cuidado_hijos = 6 THEN 'No aplica' END AS cuidado_hijos, caracterizaciones.horas, caracterizaciones.miembros_horas, caracterizaciones.ingresos_semanales, caracterizaciones.ingresos_hogar, /* 30. Array */ (SELECT GROUP_CONCAT( CASE WHEN vivia_origenes.vivia_origen = 1 THEN 'Pareja' WHEN vivia_origenes.vivia_origen = 2 THEN 'Hijos' WHEN vivia_origenes.vivia_origen = 3 THEN 'Hijas' WHEN vivia_origenes.vivia_origen = 4 THEN 'Madre' WHEN vivia_origenes.vivia_origen = 5 THEN 'Padre' WHEN vivia_origenes.vivia_origen = 6 THEN 'Tíos(as)' WHEN vivia_origenes.vivia_origen = 7 THEN 'Abuelo' WHEN vivia_origenes.vivia_origen = 8 THEN 'Abuela' WHEN vivia_origenes.vivia_origen = 9 THEN 'Hermanos(as)' WHEN vivia_origenes.vivia_origen = 10 THEN 'Otro' ELSE 0 END ) FROM vivia_origenes WHERE vivia_origenes.caracterizacioneId = caracterizaciones.id) AS vivia_origenes, caracterizaciones.cuantos_hijos, caracterizaciones.cuantas_hijas, caracterizaciones.quien_origen, /* 31. Array */ (SELECT GROUP_CONCAT( CASE WHEN viven_venezuelas.vivia_origen_venezuela = 1 THEN 'Pareja' WHEN viven_venezuelas.vivia_origen_venezuela = 2 THEN 'Hijos' WHEN viven_venezuelas.vivia_origen_venezuela = 3 THEN 'Hijas' WHEN viven_venezuelas.vivia_origen_venezuela = 4 THEN 'Madre' WHEN viven_venezuelas.vivia_origen_venezuela = 5 THEN 'Padre' WHEN viven_venezuelas.vivia_origen_venezuela = 6 THEN 'Tíos(as)' WHEN viven_venezuelas.vivia_origen_venezuela = 7 THEN 'Abuelo' WHEN viven_venezuelas.vivia_origen_venezuela = 8 THEN 'Abuela' WHEN viven_venezuelas.vivia_origen_venezuela = 9 THEN 'Hermanos(as)' WHEN viven_venezuelas.vivia_origen_venezuela = 10 THEN 'Otro' ELSE 0 END ) FROM viven_venezuelas WHERE viven_venezuelas.caracterizacioneId = caracterizaciones.id) AS viven_venezuelas, caracterizaciones.cuantos_hijos_vnzla, caracterizaciones.cuantas_hijas_vnzla, caracterizaciones.quien_vnzla, CASE WHEN caracterizaciones.ciudad_anterior = 1 THEN 'Si' WHEN caracterizaciones.ciudad_anterior = 2 THEN 'No' END AS ciudad_anterior, caracterizaciones.ciudad_anterior_cual, CASE WHEN caracterizaciones.razon_cartagena = 1 THEN 'Tiene familiares' WHEN caracterizaciones.razon_cartagena = 2 THEN 'Conocidos' WHEN caracterizaciones.razon_cartagena = 3 THEN 'Oferta laboral' WHEN caracterizaciones.razon_cartagena = 4 THEN 'Falta de ingresos' WHEN caracterizaciones.razon_cartagena = 5 THEN 'Recomendación de alguien' WHEN caracterizaciones.razon_cartagena = 6 THEN 'Otro' END AS razon_cartagena, caracterizaciones.razon_cartagena_cual, CASE WHEN caracterizaciones.quedarse_colombia = 1 THEN 'De paso' WHEN caracterizaciones.quedarse_colombia = 2 THEN 'Quedarse' END AS quedarse_colombia, caracterizaciones.quedarse_colombia_donde, /* 35. Array */ (SELECT GROUP_CONCAT( CASE WHEN acompanados.acompanado = 1 THEN 'Llegó solo' WHEN acompanados.acompanado = 2 THEN 'Amigos' WHEN acompanados.acompanado = 3 THEN 'Familiares' WHEN acompanados.acompanado = 4 THEN 'Desconocidos' WHEN acompanados.acompanado = 5 THEN 'Todos los anteriores' ELSE 0 END ) FROM acompanados WHERE acompanados.caracterizacioneId = caracterizaciones.id) AS acompanados, /* 36. Array */ (SELECT GROUP_CONCAT( CASE WHEN paraderos.paradero = 1 THEN 'Se fueron para otras ciudades' WHEN paraderos.paradero = 2 THEN 'Se quedaron en Cartagena' WHEN paraderos.paradero = 3 THEN 'Desconoce su paradero' WHEN paraderos.paradero = 4 THEN 'Otro' ELSE 0 END ) FROM paraderos WHERE paraderos.caracterizacioneId = caracterizaciones.id) AS paraderos, caracterizaciones.paradero_ciudades_cuales, caracterizaciones.paradero_cartagena, caracterizaciones.paradero_desconocido, caracterizaciones.paradero_otro, /* 37. Array */ (SELECT GROUP_CONCAT( CASE WHEN cambios_familiares.cambios_familia = 1 THEN 'Están más unidos' WHEN cambios_familiares.cambios_familia = 2 THEN 'Se desintegro la familia' WHEN cambios_familiares.cambios_familia = 3 THEN 'Hay problemas familiares' WHEN cambios_familiares.cambios_familia = 4 THEN 'Ningún cambio' WHEN cambios_familiares.cambios_familia = 5 THEN 'Otro' ELSE 0 END ) FROM cambios_familiares WHERE cambios_familiares.caracterizacioneId = caracterizaciones.id) AS cambios_familiares, caracterizaciones.cambios_familia_especifique, CASE WHEN caracterizaciones.condiciones_vida = 1 THEN 'Totalmente' WHEN caracterizaciones.condiciones_vida = 2 THEN 'En algunos aspectos' WHEN caracterizaciones.condiciones_vida = 3 THEN 'Regularmente' WHEN caracterizaciones.condiciones_vida = 4 THEN 'Poco' WHEN caracterizaciones.condiciones_vida = 5 THEN 'Nada' END AS condiciones_vida, CASE WHEN caracterizaciones.apoyo_economico = 1 THEN 'Si' WHEN caracterizaciones.apoyo_economico = 2 THEN 'No' END AS apoyo_economico, CASE WHEN caracterizaciones.envia_dinero = 1 THEN 'Mensualmente' WHEN caracterizaciones.envia_dinero = 2 THEN 'Semanalmente' WHEN caracterizaciones.envia_dinero = 3 THEN 'Diariamente' WHEN caracterizaciones.envia_dinero = 4 THEN 'Otro' END AS envia_dinero, caracterizaciones.envia_dinero_especifique, /*1.2 Datos del entorno familiar (vivienda)*/ /* 41. Array */ (SELECT GROUP_CONCAT( CASE WHEN viviendos.viviendo = 1 THEN 'Pareja' WHEN viviendos.viviendo = 2 THEN 'Hijos' WHEN viviendos.viviendo = 3 THEN 'Hijas' WHEN viviendos.viviendo = 4 THEN 'Madre' WHEN viviendos.viviendo = 5 THEN 'Padre' WHEN viviendos.viviendo = 6 THEN 'Tíos(as)' WHEN viviendos.viviendo = 7 THEN 'Abuelo' WHEN viviendos.viviendo = 8 THEN 'Abuela' WHEN viviendos.viviendo = 9 THEN 'Otro' ELSE 0 END ) FROM viviendos WHERE viviendos.caracterizacioneId = caracterizaciones.id) AS viviendos, caracterizaciones.viviendo_hijos, caracterizaciones.viviendo_hijas, caracterizaciones.viviendo_quien, caracterizaciones.integrantes_totales, caracterizaciones.integrantes_ninos, caracterizaciones.integrantes_adultos, caracterizaciones.hogares_residen, CASE WHEN caracterizaciones.tipo_vivienda = 1 THEN 'Casa' WHEN caracterizaciones.tipo_vivienda = 2 THEN 'Apartamento' WHEN caracterizaciones.tipo_vivienda = 3 THEN 'Cuartos en inquilinatos' WHEN caracterizaciones.tipo_vivienda = 4 THEN 'Improvisada Carpa, refugios naturales, plásticos' WHEN caracterizaciones.tipo_vivienda = 5 THEN 'Arriendos colectivos' END AS tipo_vivienda, CASE WHEN caracterizaciones.tenencia_vivienda = 1 THEN 'Propia' WHEN caracterizaciones.tenencia_vivienda = 2 THEN 'En arriendo' WHEN caracterizaciones.tenencia_vivienda = 3 THEN 'Familiar' WHEN caracterizaciones.tenencia_vivienda = 4 THEN 'En cuidado-prestada' WHEN caracterizaciones.tenencia_vivienda = 5 THEN 'A cambio de trabajo' WHEN caracterizaciones.tenencia_vivienda = 6 THEN 'Otra' END AS tenencia_vivienda, caracterizaciones.tenencia_otra, CASE WHEN caracterizaciones.condiciones_vivienda = 1 THEN 'Altamente adecuadas' WHEN caracterizaciones.condiciones_vivienda = 2 THEN 'Adecuaciones buenas' WHEN caracterizaciones.condiciones_vivienda = 3 THEN 'Adecuaciones regulares' WHEN caracterizaciones.condiciones_vivienda = 4 THEN 'Adecuaciones poco aptas' WHEN caracterizaciones.condiciones_vivienda = 5 THEN 'Inadecuadas' END AS condiciones_vivienda, CASE WHEN caracterizaciones.ambiente_cocina = 1 THEN 'Si' WHEN caracterizaciones.ambiente_cocina = 2 THEN 'No' END AS ambiente_cocina, CASE WHEN caracterizaciones.ambiente_sala = 1 THEN 'Si' WHEN caracterizaciones.ambiente_sala = 2 THEN 'No' END AS ambiente_sala, CASE WHEN caracterizaciones.ambiente_habitacion = 1 THEN 'Si' WHEN caracterizaciones.ambiente_habitacion = 2 THEN 'No' END AS ambiente_habitacion, CASE WHEN caracterizaciones.ambiente_bano = 1 THEN 'Si' WHEN caracterizaciones.ambiente_bano = 2 THEN 'No' END AS ambiente_bano, /* 48. Array */ (SELECT GROUP_CONCAT( CASE WHEN electrodomesticos.electrodomestico = 1 THEN 'Televisor' WHEN electrodomesticos.electrodomestico = 2 THEN 'Refrigerador/Nevera' WHEN electrodomesticos.electrodomestico = 3 THEN 'Lavadora' WHEN electrodomesticos.electrodomestico = 4 THEN 'Estufa' WHEN electrodomesticos.electrodomestico = 5 THEN 'Computadora' WHEN electrodomesticos.electrodomestico = 6 THEN 'Licuadora' WHEN electrodomesticos.electrodomestico = 7 THEN 'Radio' ELSE 0 END ) FROM electrodomesticos WHERE electrodomesticos.caracterizacioneId = caracterizaciones.id) AS electrodomesticos, CASE WHEN caracterizaciones.prepara_alimentos = 1 THEN 'Mesa en la sala' WHEN caracterizaciones.prepara_alimentos = 2 THEN 'En un cuarto' WHEN caracterizaciones.prepara_alimentos = 3 THEN 'En el patio' WHEN caracterizaciones.prepara_alimentos = 4 THEN 'En la puerta de la calle' WHEN caracterizaciones.prepara_alimentos = 5 THEN 'No aplica' END AS prepara_alimentos, CASE WHEN caracterizaciones.cuenta_bano = 1 THEN 'Presta un baño a un vecino' WHEN caracterizaciones.cuenta_bano = 2 THEN 'Terreno baldío' WHEN caracterizaciones.cuenta_bano = 3 THEN 'Baños públicos' WHEN caracterizaciones.cuenta_bano = 4 THEN 'Otro' WHEN caracterizaciones.cuenta_bano = 5 THEN 'No aplica' END AS cuenta_bano, caracterizaciones.otro_bano, /* 51. Array */ (SELECT GROUP_CONCAT( CASE WHEN dormirs.dormir = 1 THEN 'Cama con colchón' WHEN dormirs.dormir = 2 THEN 'Cama sin colchón' WHEN dormirs.dormir = 3 THEN 'Colchón al piso' WHEN dormirs.dormir = 4 THEN 'Colchonetas' WHEN dormirs.dormir = 5 THEN 'Hamaca/Chinchorro' WHEN dormirs.dormir = 6 THEN 'Esteras' WHEN dormirs.dormir = 7 THEN 'Otro' ELSE 0 END ) FROM dormirs WHERE dormirs.caracterizacioneId = caracterizaciones.id) AS dormir, caracterizaciones.dormir_otro, CASE WHEN caracterizaciones.espacio_seguro = 1 THEN 'Si' WHEN caracterizaciones.espacio_seguro = 2 THEN 'No' END AS espacio_seguro, caracterizaciones.espacio_seguro_porque, CASE WHEN caracterizaciones.cambia_vivienda = 1 THEN 'Si' WHEN caracterizaciones.cambia_vivienda = 2 THEN 'No' END AS cambia_vivienda, caracterizaciones.motivo_vivienda, /*1.5 Condiciones de salud familiar*/ CASE WHEN caracterizaciones.afiliacion = 1 THEN 'Contributivo' WHEN caracterizaciones.afiliacion = 2 THEN 'Subsidiado' WHEN caracterizaciones.afiliacion = 3 THEN 'Sisbén' WHEN caracterizaciones.afiliacion = 4 THEN 'Ninguno' END AS afiliacion, /* 55. Array */ (SELECT GROUP_CONCAT( CASE WHEN condiciones.condicion = 1 THEN 'Madre Gestante' WHEN condiciones.condicion = 2 THEN 'Madre Lactante' WHEN condiciones.condicion = 3 THEN 'Cáncer' WHEN condiciones.condicion = 4 THEN 'VIH' WHEN condiciones.condicion = 5 THEN 'Hipertensión' WHEN condiciones.condicion = 6 THEN 'Diabetes' WHEN condiciones.condicion = 7 THEN 'Lupus' WHEN condiciones.condicion = 8 THEN 'Epoc' WHEN condiciones.condicion = 9 THEN 'Otras enfermedades' ELSE 0 END ) FROM condiciones WHERE condiciones.caracterizacioneId = caracterizaciones.id) AS condiciones, caracterizaciones.condiciones_cuales, CASE WHEN caracterizaciones.enfermedad = 1 THEN 'Si' WHEN caracterizaciones.enfermedad = 2 THEN 'No' END AS enfermedad, caracterizaciones.enfermedad_cual, CASE WHEN caracterizaciones.enfermedad_quien = 1 THEN 'Hijos' WHEN caracterizaciones.enfermedad_quien = 2 THEN 'Conyugue' WHEN caracterizaciones.enfermedad_quien = 3 THEN 'Madre' WHEN caracterizaciones.enfermedad_quien = 4 THEN 'Padre' WHEN caracterizaciones.enfermedad_quien = 5 THEN 'Tíos' WHEN caracterizaciones.enfermedad_quien = 6 THEN 'Abuelos' WHEN caracterizaciones.enfermedad_quien = 7 THEN 'Otro' END AS enfermedad_quien, caracterizaciones.enfermedad_otro, CASE WHEN caracterizaciones.atendio_enfermedad = 1 THEN 'Acudió al medico' WHEN caracterizaciones.atendio_enfermedad = 2 THEN 'Compro medicina por su cuenta' WHEN caracterizaciones.atendio_enfermedad = 3 THEN 'Usó remedios caseros' WHEN caracterizaciones.atendio_enfermedad = 4 THEN 'No usó ningún medicamento' END AS atendio_enfermedad, CASE WHEN caracterizaciones.medidas_aislamiento = 1 THEN 'Si' WHEN caracterizaciones.medidas_aislamiento = 2 THEN 'No' END AS medidas_aislamiento, caracterizaciones.medidas_aislamiento_porque, CASE WHEN caracterizaciones.prueba_covid = 1 THEN 'Si' WHEN caracterizaciones.prueba_covid = 2 THEN 'No' END AS prueba_covid, CASE WHEN caracterizaciones.resultado = 1 THEN 'Positivo' WHEN caracterizaciones.resultado = 2 THEN 'Negativo' END AS resultado, CASE WHEN caracterizaciones.tratado = 1 THEN 'Si' WHEN caracterizaciones.tratado = 2 THEN 'No' END AS tratado, /*1.5.1 Morbilidad sentida en menores de 5 años*/ CASE WHEN caracterizaciones.enfermedades = 1 THEN 'Accidente casero, familiar o escolar' WHEN caracterizaciones.enfermedades = 2 THEN 'Diarrea o malestar en el estómago' WHEN caracterizaciones.enfermedades = 3 THEN 'Alergias' WHEN caracterizaciones.enfermedades = 4 THEN 'Gripe, tos, resfriado, pulmonía o bronquitis' WHEN caracterizaciones.enfermedades = 5 THEN 'Covid-19' WHEN caracterizaciones.enfermedades = 6 THEN 'Alguna otra enfermedad' WHEN caracterizaciones.enfermedades = 7 THEN 'No aplica' END AS enfermedades, caracterizaciones.enfermedad_otra, CASE WHEN caracterizaciones.tratamiento = 1 THEN 'No buscó ayuda' WHEN caracterizaciones.tratamiento = 2 THEN 'Hospital público' WHEN caracterizaciones.tratamiento = 3 THEN 'Farmacia' WHEN caracterizaciones.tratamiento = 4 THEN 'Otro' END AS enfermedades, caracterizaciones.tratamiento_otro, CASE WHEN caracterizaciones.sin_ayuda = 1 THEN 'No sabía dónde ir' WHEN caracterizaciones.sin_ayuda = 2 THEN 'Queda lejos' WHEN caracterizaciones.sin_ayuda = 3 THEN 'No tiene seguro medico' WHEN caracterizaciones.sin_ayuda = 4 THEN 'No lo considero necesario' WHEN caracterizaciones.sin_ayuda = 5 THEN 'Pensó que no estaba enfermo' WHEN caracterizaciones.sin_ayuda = 6 THEN 'Prestan un mal servicio' WHEN caracterizaciones.sin_ayuda = 7 THEN 'Otro' END AS sin_ayuda, caracterizaciones.sin_ayuda_otro, /* 1.5.2 Morbilidad en mayores de 5 años */ CASE WHEN caracterizaciones.accidentes = 1 THEN 'Accidente casero, familiar o escolar' WHEN caracterizaciones.accidentes = 2 THEN 'Diarrea o malestar en el estómago' WHEN caracterizaciones.accidentes = 3 THEN 'Alergias' WHEN caracterizaciones.accidentes = 4 THEN 'Gripe, tos, resfriado, pulmonía o bronquitis' WHEN caracterizaciones.accidentes = 5 THEN 'Covid-19' WHEN caracterizaciones.accidentes = 6 THEN 'Otra' WHEN caracterizaciones.accidentes = 7 THEN 'No aplica' END AS accidentes, caracterizaciones.accidentes_otro, CASE WHEN caracterizaciones.busco_ayuda = 1 THEN 'No buscó ayuda' WHEN caracterizaciones.busco_ayuda = 2 THEN 'Hospital público' WHEN caracterizaciones.busco_ayuda = 3 THEN 'Farmacia' WHEN caracterizaciones.busco_ayuda = 4 THEN 'Otro' END AS busco_ayuda, caracterizaciones.busco_ayuda_otro, CASE WHEN caracterizaciones.razon_ayuda = 1 THEN 'No sabía dónde ir' WHEN caracterizaciones.razon_ayuda = 2 THEN 'Queda lejos' WHEN caracterizaciones.razon_ayuda = 3 THEN 'No tiene seguro medico' WHEN caracterizaciones.razon_ayuda = 4 THEN 'No lo considero necesario' WHEN caracterizaciones.razon_ayuda = 5 THEN 'Pensó que no estaba enfermo' WHEN caracterizaciones.razon_ayuda = 6 THEN 'Prestan un mal servicio' WHEN caracterizaciones.razon_ayuda = 7 THEN 'Otro' END AS razon_ayuda, caracterizaciones.razon_ayuda_otro, /* 69. Array */ (SELECT GROUP_CONCAT( CASE WHEN familiar_enfermedades.familiar_enfermedad = 1 THEN 'Malaria' WHEN familiar_enfermedades.familiar_enfermedad = 2 THEN 'Dengue' WHEN familiar_enfermedades.familiar_enfermedad = 3 THEN 'Fiebre amarilla' WHEN familiar_enfermedades.familiar_enfermedad = 4 THEN 'Cólera' WHEN familiar_enfermedades.familiar_enfermedad = 5 THEN 'Leishmaniasis' WHEN familiar_enfermedades.familiar_enfermedad = 6 THEN 'Covid-19' WHEN familiar_enfermedades.familiar_enfermedad = 7 THEN 'Ninguna' ELSE 0 END ) FROM familiar_enfermedades WHERE familiar_enfermedades.caracterizacioneId = caracterizaciones.id) AS familiar_enfermedades, /* 1.5.3 Morbilidad Crónica */ CASE WHEN caracterizaciones.familiares_enfermedades = 1 THEN 'Tensión Alta' WHEN caracterizaciones.familiares_enfermedades = 2 THEN 'Azúcar en la sangre' WHEN caracterizaciones.familiares_enfermedades = 3 THEN 'Asma/otra enfermedad pulmonar' WHEN caracterizaciones.familiares_enfermedades = 4 THEN 'Enfermedad de la piel/alergias graves' WHEN caracterizaciones.familiares_enfermedades = 5 THEN 'Cáncer o tumores' WHEN caracterizaciones.familiares_enfermedades = 6 THEN 'Enfermedad cardiaca o cerebrovascular' WHEN caracterizaciones.familiares_enfermedades = 7 THEN 'Otra' WHEN caracterizaciones.familiares_enfermedades = 8 THEN 'Ninguna' END AS familiares_enfermedades, caracterizaciones.familiares_enfermedades_cuales, /* 1.5.4 Mortalidad */ CASE WHEN caracterizaciones.muerte_violenta = 1 THEN 'Violenta / Accidente' WHEN caracterizaciones.muerte_violenta = 2 THEN 'Enfermedad crónica' WHEN caracterizaciones.muerte_violenta = 3 THEN 'Enfermedad infecciosa' WHEN caracterizaciones.muerte_violenta = 4 THEN 'Covid-19' WHEN caracterizaciones.muerte_violenta = 5 THEN 'Otra' WHEN caracterizaciones.muerte_violenta = 6 THEN 'Ninguno' END AS lugares_discriminacion, caracterizaciones.muerte_violenta_especifique, /* 2. Salud Mental */ CASE WHEN caracterizaciones.discriminacion = 1 THEN 'Si' WHEN caracterizaciones.discriminacion = 2 THEN 'No' END AS discriminacion, CASE WHEN caracterizaciones.lugares_discriminacion = 1 THEN 'Trabajo' WHEN caracterizaciones.lugares_discriminacion = 2 THEN 'Calle' WHEN caracterizaciones.lugares_discriminacion = 3 THEN 'Comunidad' WHEN caracterizaciones.lugares_discriminacion = 4 THEN 'Vivienda' WHEN caracterizaciones.lugares_discriminacion = 5 THEN 'Escuela' WHEN caracterizaciones.lugares_discriminacion = 6 THEN 'Otro' END AS lugares_discriminacion, caracterizaciones.lugares_discriminacion_otro, CASE WHEN caracterizaciones.produjo_discriminacion = 1 THEN 'Cansancio, irritabilidad, problemas de sueño' WHEN caracterizaciones.produjo_discriminacion = 2 THEN 'Estrés en la vida diaria' WHEN caracterizaciones.produjo_discriminacion = 3 THEN 'Falta de apetito' WHEN caracterizaciones.produjo_discriminacion = 4 THEN 'Alejamiento de amistades' WHEN caracterizaciones.produjo_discriminacion = 5 THEN 'Sentimientos de tristeza o desanimo' WHEN caracterizaciones.produjo_discriminacion = 6 THEN 'Preocupaciones o miedos excesivos' WHEN caracterizaciones.produjo_discriminacion = 7 THEN 'Cambios en el deseo sexual' WHEN caracterizaciones.produjo_discriminacion = 8 THEN 'Pensamiento suicida' WHEN caracterizaciones.produjo_discriminacion = 9 THEN 'Exceso de enojo, hostilidad o violencia' WHEN caracterizaciones.produjo_discriminacion = 10 THEN 'Ninguno' END AS produjo_discriminacion, CASE WHEN caracterizaciones.produjo_atendio = 1 THEN 'Hice ejercicio' WHEN caracterizaciones.produjo_atendio = 2 THEN 'En el trabajo' WHEN caracterizaciones.produjo_atendio = 3 THEN 'En casa con mi familia' WHEN caracterizaciones.produjo_atendio = 4 THEN 'No le presta atención' END AS produjo_atendio, /* 76. Array */ (SELECT GROUP_CONCAT( CASE WHEN dedicaciones.dedicacion = 1 THEN 'Hacer reuniones familiares' WHEN dedicaciones.dedicacion = 2 THEN ' Paseos' WHEN dedicaciones.dedicacion = 3 THEN 'Practicar algún tipo de deporte' WHEN dedicaciones.dedicacion = 4 THEN 'Cólera' WHEN dedicaciones.dedicacion = 5 THEN 'Dormir, descansar.' WHEN dedicaciones.dedicacion = 6 THEN 'Cada uno se dedicas a hacer distintas cosas' WHEN dedicaciones.dedicacion = 7 THEN 'Estar en la casa' WHEN dedicaciones.dedicacion = 8 THEN 'Otro' ELSE 0 END ) FROM dedicaciones WHERE dedicaciones.caracterizacioneId = caracterizaciones.id) AS dedicaciones, caracterizaciones.dedicacion_otro, CASE WHEN caracterizaciones.sabe_abuso_sexual = 1 THEN 'Si' WHEN caracterizaciones.sabe_abuso_sexual = 2 THEN 'No' END AS sabe_abuso_sexual, CASE WHEN caracterizaciones.abuso_sexual = 1 THEN 'Si' WHEN caracterizaciones.abuso_sexual = 2 THEN 'No' END AS abuso_sexual, caracterizaciones.abuso_sexual_observacion, CASE WHEN caracterizaciones.caso_denunciado = 1 THEN 'Denunciado' WHEN caracterizaciones.caso_denunciado = 2 THEN 'No denunciado' END AS caso_denunciado, CASE WHEN caracterizaciones.capturado_culpable = 1 THEN 'Si' WHEN caracterizaciones.capturado_culpable = 2 THEN 'No' END AS capturado_culpable, CASE WHEN caracterizaciones.maltratos = 1 THEN 'Si' WHEN caracterizaciones.maltratos = 2 THEN 'No' END AS maltratos, CASE WHEN caracterizaciones.tipo_maltratos = 1 THEN 'Físico' WHEN caracterizaciones.tipo_maltratos = 2 THEN 'Verbal' WHEN caracterizaciones.tipo_maltratos = 3 THEN 'Psicológico' WHEN caracterizaciones.tipo_maltratos = 4 THEN 'Infantil' WHEN caracterizaciones.tipo_maltratos = 5 THEN 'Otro' END AS tipo_maltratos, caracterizaciones.tipo_maltratos_otro, CASE WHEN caracterizaciones.denuncia_caso = 1 THEN 'Si' WHEN caracterizaciones.denuncia_caso = 2 THEN 'No' END AS denuncia_caso, CASE WHEN caracterizaciones.integrante_familia = 1 THEN 'Niños o niñas' WHEN caracterizaciones.integrante_familia = 2 THEN 'Pareja' WHEN caracterizaciones.integrante_familia = 3 THEN 'Madre' WHEN caracterizaciones.integrante_familia = 4 THEN 'Otro' END AS integrante_familia, caracterizaciones.integrante_familia_otro, caracterizaciones.cambios, CASE WHEN caracterizaciones.consumo_sustancias = 1 THEN 'Alcohol' WHEN caracterizaciones.consumo_sustancias = 2 THEN 'Cigarillo' WHEN caracterizaciones.consumo_sustancias = 3 THEN 'Otro' WHEN caracterizaciones.consumo_sustancias = 4 THEN 'No consume' END AS consumo_sustancias, caracterizaciones.consumo_sustancias_cuales, CASE WHEN caracterizaciones.sentir_relaciones = 1 THEN 'Satisfecho' WHEN caracterizaciones.sentir_relaciones = 2 THEN 'Poco Satisfecho' WHEN caracterizaciones.sentir_relaciones = 3 THEN 'Insatisfecho' END AS sentir_relaciones, CASE WHEN caracterizaciones.situacion_migrante = 1 THEN 'Si' WHEN caracterizaciones.situacion_migrante = 2 THEN 'No' END AS situacion_migrante, CASE WHEN caracterizaciones.necesidad_retornar = 1 THEN 'Si' WHEN caracterizaciones.necesidad_retornar = 2 THEN 'No' END AS necesidad_retornar, /*3. Asesoría Jurídica*/ CASE WHEN caracterizaciones.medio_atencion = 1 THEN 'Presencial' WHEN caracterizaciones.medio_atencion = 2 THEN 'Telefónica' WHEN caracterizaciones.medio_atencion = 3 THEN 'Brigada Jurídica' WHEN caracterizaciones.medio_atencion = 4 THEN 'Virtual' END AS medio_atencion, CASE WHEN caracterizaciones.recibido_tipo_ayuda = 1 THEN 'Si' WHEN caracterizaciones.recibido_tipo_ayuda = 2 THEN 'No' END AS recibido_tipo_ayuda, /* 92. Array */ (SELECT GROUP_CONCAT( CASE WHEN asistio_organizaciones.asistio_organizacion = 1 THEN 'Migración Colombia' WHEN asistio_organizaciones.asistio_organizacion = 2 THEN 'Institución de salud ' WHEN asistio_organizaciones.asistio_organizacion = 3 THEN 'Institución educativa' WHEN asistio_organizaciones.asistio_organizacion = 4 THEN 'Registraduría ' WHEN asistio_organizaciones.asistio_organizacion = 5 THEN 'Casa de justicia' WHEN asistio_organizaciones.asistio_organizacion = 6 THEN 'Otro' ELSE 0 END ) FROM asistio_organizaciones WHERE asistio_organizaciones.caracterizacioneId = caracterizaciones.id) AS asistio_organizaciones, caracterizaciones.asistio_organizacion_otro, /* 93. Array */ (SELECT GROUP_CONCAT( CASE WHEN requerimientos_organizaciones.requerimientos_organizacion = 1 THEN 'Jurídicos' WHEN requerimientos_organizaciones.requerimientos_organizacion = 2 THEN 'Educación' WHEN requerimientos_organizaciones.requerimientos_organizacion = 3 THEN 'Salud' WHEN requerimientos_organizaciones.requerimientos_organizacion = 4 THEN 'Empleo' WHEN requerimientos_organizaciones.requerimientos_organizacion = 5 THEN 'Documentación' WHEN requerimientos_organizaciones.requerimientos_organizacion = 6 THEN 'Otro' ELSE 0 END ) FROM requerimientos_organizaciones WHERE requerimientos_organizaciones.caracterizacioneId = caracterizaciones.id) AS requerimientos_organizaciones, caracterizaciones.requerimientos_organizacion_otro, CASE WHEN caracterizaciones.califica_atencion = 1 THEN 'Muy bueno' WHEN caracterizaciones.califica_atencion = 2 THEN 'Regular' WHEN caracterizaciones.califica_atencion = 3 THEN 'Malo' END AS recibido_tipcalifica_atenciono_ayuda, caracterizaciones.califica_atencion_porque, CASE WHEN caracterizaciones.resolver_situacion = 1 THEN 'Si me ayudaron enseguida' WHEN caracterizaciones.resolver_situacion = 2 THEN 'Toco hacer una serie de trámites y al final no se solucionó' WHEN caracterizaciones.resolver_situacion = 3 THEN 'Toco hacer una serie de trámites y al final se solucionó' WHEN caracterizaciones.resolver_situacion = 4 THEN 'No ayudaron' WHEN caracterizaciones.resolver_situacion = 5 THEN 'Aún está a la espera de respuesta' END AS resolver_situacion, CASE WHEN caracterizaciones.tiempo_solicitud = 1 THEN 'N° de Meses' WHEN caracterizaciones.tiempo_solicitud = 2 THEN 'Inmediato' WHEN caracterizaciones.tiempo_solicitud = 3 THEN 'Se demoraron mucho' WHEN caracterizaciones.tiempo_solicitud = 4 THEN 'Nunca le respondieron' WHEN caracterizaciones.tiempo_solicitud = 5 THEN 'Otro' END AS tiempo_solicitud, caracterizaciones.tiempo_solicitud_otro, /* 97. Array */ (SELECT GROUP_CONCAT( CASE WHEN principal_necesidades.principal_necesidad = 1 THEN 'Empleo digno' WHEN principal_necesidades.principal_necesidad = 2 THEN 'Educación' WHEN principal_necesidades.principal_necesidad = 3 THEN 'Afiliación a la salud' WHEN principal_necesidades.principal_necesidad = 4 THEN 'Vivienda' WHEN principal_necesidades.principal_necesidad = 5 THEN 'Alimentos' WHEN principal_necesidades.principal_necesidad = 6 THEN 'Legalización de la situación' WHEN principal_necesidades.principal_necesidad = 7 THEN 'Otro' ELSE 0 END ) FROM principal_necesidades WHERE principal_necesidades.caracterizacioneId = caracterizaciones.id) AS principal_necesidades, caracterizaciones.principal_necesidad_otro, caracterizaciones.resumen_consulta, caracterizaciones.documentos_entregados, /* 3. Asesoría Psicologica */ CASE WHEN caracterizaciones.atencion_red = 1 THEN 'Atención por la red' WHEN caracterizaciones.atencion_red = 2 THEN 'Remisión a otras entidades' END AS atencion_red, caracterizaciones.atencion_red_cuales, CASE WHEN caracterizaciones.ubicacion_red = 1 THEN 'Universidad San Buenaventura-Ternera' WHEN caracterizaciones.ubicacion_red = 2 THEN 'Universidad del Sinú - Almirante Colón' END AS ubicacion_red, /* 3. Asesoría Empleabilidad */ caracterizaciones.formacion_empleo, caracterizaciones.orientacion_empresas FROM caracterizaciones LEFT JOIN personas ON personas.id = caracterizaciones.personaId;",
      {
        raw: true,
        type: QueryTypes.SELECT,
      }
    )
    .then(function (caracterizacion) {
      // Each record will now be an instance of Project
      console.log(caracterizacion);
      return res.json(caracterizacion);
    });
};

exports.getAllAdmin = (req, res) => {
  Caracterizacion.findAll({
    attributes: ["id", "createdAt", "estado"],
    include: [
      {
        model: Persona,
        as: "persona",
      },
      {
        model: User,
        as: "digitador",
      },
      {
        model: Asesor_Caracterizacion,
      },
    ],
    where: {
      estado: req.query.estado,
    },
  })
    .then(function (el) {
      var array = el;
      let new_array = [];
      for (let j = 0; j < array.length; j++) {
        let data = el[j].toJSON();
        // Array Data
        if (data.asesor_caracterizaciones) {
          let objArray = data.asesor_caracterizaciones;
          data["estado_asesoria_juridica"] = "N/A";
          data["estado_asesoria_empleabilidad"] = "N/A";
          data["estado_asesoria_psicosocial"] = "N/A";
          for (let i = 0; i < objArray.length; i++) {
            objArray[i].tipo === "1"
              ? (data["estado_asesoria_juridica"] = objArray[i].estado)
              : null;
            objArray[i].tipo === "2"
              ? (data["estado_asesoria_empleabilidad"] = objArray[i].estado)
              : null;
            objArray[i].tipo === "3"
              ? (data["estado_asesoria_psicosocial"] = objArray[i].estado)
              : null;
          }
        }
        new_array.push(data);
      }
      console.log(new_array);
      return new_array;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getAllAsesor = (req, res) => {
  //console.log(req.query.estado);
  Caracterizacion.findAll({
    attributes: [
      "id",
      "n_radicado",
      "telefono",
      "correo_electronico",
      "ciudad_domicilio",
      "barrio_domicilio",
      "estado",
      "tipo_asesoria",
      "createdAt",
      "updatedAt",
      "personaId",
      "digitadorId",
      "asesorId",
      [
        Caracterizacion.sequelize.literal(
          'CASE WHEN tipo_asesoria = 1 THEN "Asesoria Juridica" WHEN tipo_asesoria = 2 THEN "Atención Psicosocial" ELSE "Empleabilidad" END'
        ),
        "tipo_asesoria_label",
      ],
    ],
    include: [
      { all: true },
      /* {
      model: Persona,
      as: 'persona'
    },{
      model: User,
      as: 'digitador'
    },{
      model: User,
      as: 'asesor'
    }*/
    ],
    where: {
      estado: req.query.estado,
      asesorId: req.query.id,
    },
  })
    .then(function (el) {
      return el;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getAllBorrador = (req, res) => {
  Caracterizacion.findAll({
    attributes: ["id", "createdAt", "estado"],
    include: [
      {
        attributes: ["nombre", "apellido"],
        model: Persona,
        as: "persona",
      },
      //  ,{
      //    model: User,
      //    as: 'digitador'
      //  }
      //  },{
      //   model: Motivo_Migracion,
      //   attributes:['motivo'],
      //   raw : true
      //  }
    ],
    where: {
      estado: req.query.estado,
      digitadorId: req.query.id,
    },
  })
    .then(function (el) {
      return el;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.updateCartacterizacion = (req, res) => {
  Persona.update(
    {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      tipo_documento: req.body.tipo_documento,
      documento: req.body.documento,
      sexo: req.body.sexo,
      genero: req.body.genero,
      descripcion_otro: req.body.descripcion_otro,
      apellido: req.body.apellido,
      edad: req.body.edad,
      origen_pais: req.body.origen_pais,
      origen_departamento: req.body.origen_departamento,
      origen_ciudad: req.body.origen_ciudad,
    },
    {
      where: { id: req.body.personaId },
      returning: true,
      plain: true,
    }
  )
    .then((persona) => {
      if ((req.body.userId = 1)) {
        Caracterizacion.update(
          {
            telefono: req.body.telefono,
            correo_electronico: req.body.correo_electronico,
            ciudad_domicilio: req.body.ciudad_domicilio,
            barrio_domicilio: req.body.barrio_domicilio,
            personaId: req.body.personaId,
          },
          {
            where: { id: req.body.id },
            returning: true,
            plain: true,
          }
        )
          .then((caraterizacion) => {
            res.send({
              message: "Caraterización actualizada satisfactoriamente!",
              id: req.body.id,
            });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      } else {
        Caracterizacion.update(
          {
            telefono: req.body.telefono,
            correo_electronico: req.body.correo_electronico,
            ciudad_domicilio: req.body.ciudad_domicilio,
            barrio_domicilio: req.body.barrio_domicilio,
            digitadorId: req.body.userId,
            personaId: req.body.personaId,
            estado: "borrador",
          },
          {
            where: { id: req.body.id },
            returning: true,
            plain: true,
          }
        )
          .then((caraterizacion) => {
            res.send({
              message: "Caraterización actualizada satisfactoriamente!",
              id: req.body.id,
            });
          })
          .catch((err) => {
            res.status(500).send({ message: err.message });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionEstado = (req, res) => {
  Caracterizacion.update(
    {
      estado: "finalizado",
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.status(200).send({
        message: "Caraterización cerrada satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllDatosBasicosByID = (req, res) => {
  Caracterizacion.findOne({
    include: [
      {
        model: Persona,
        as: "persona",
      },
      {
        model: User,
        as: "digitador",
      },
    ],
    where: { id: req.query.data },
  })
    .then(function (el) {
      let data = el.toJSON();
      return data;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getAllDatosPersonalesByID = (req, res) => {
  Caracterizacion.findOne({
    attributes: ["id"],
    include: [
      {
        model: Composicion_Familiar,
      },
      {
        model: Motivo_Migracion,
      },
      {
        model: Vivia_Origen,
      },
      {
        model: Vivia_Origen_Venezuela,
      },
      {
        model: Acompanado,
      },
      {
        model: Paradero,
      },
      {
        model: Cambios_Familia,
      },
    ],
    where: { id: req.query.data },
  })
    .then(function (el) {
      let data = el.toJSON();
      // Array Motivos Migracion
      if (data.motivos_migraciones) {
        let objArray = data.motivos_migraciones;
        let motivos_migracion = [];
        for (let i = 0; i < objArray.length; i++) {
          motivos_migracion[i] = objArray[i].motivo;
        }
        data["motivos_migracion"] = motivos_migracion;
      } else {
        data["motivos_migracion"] = [];
      }
      //Array Composicion Familiares
      if (data.composicion_familiares) {
        data["composicion"] = data.composicion_familiares;
      } else {
        data["composicion"] = [];
      }
      //Array Viven Venezuela
      if (data.viven_venezuelas) {
        let objArray = data.viven_venezuelas;
        let viven_venezuela = [];
        for (let b = 0; b < objArray.length; b++) {
          viven_venezuela[b] = parseInt(objArray[b].vivia_origen_venezuela);
        }
        data["viven_venezuela"] = viven_venezuela;
      } else {
        data["viven_venezuela"] = [];
      }
      //Array Vivian
      if (data.vivia_origenes) {
        let objArray = data.vivia_origenes;
        let vivia_origen = [];
        for (let c = 0; c < objArray.length; c++) {
          vivia_origen[c] = parseInt(objArray[c].vivia_origen);
        }
        data["vivia_origenes"] = vivia_origen;
      } else {
        data["vivia_origenes"] = [];
      }
      //Array Paradero
      if (data.paraderos) {
        let objArray = data.paraderos;
        let paradero = [];
        for (let d = 0; d < objArray.length; d++) {
          paradero[d] = parseInt(objArray[d].paradero);
        }
        data["paradero"] = paradero;
      } else {
        data["paradero"] = [];
      }
      //Array Acompanados
      if (data.acompanados) {
        let objArray = data.acompanados;
        let acompanado = [];
        for (let e = 0; e < objArray.length; e++) {
          acompanado[e] = parseInt(objArray[e].acompanado);
        }
        data["acompanado"] = acompanado;
      } else {
        data["acompanado"] = [];
      }
      //Array Cambios Familiares
      if (data.cambios_familiares) {
        let objArray = data.cambios_familiares;
        let cambios_familia = [];
        for (let f = 0; f < objArray.length; f++) {
          cambios_familia[f] = parseInt(objArray[f].cambios_familia);
        }
        data["cambios_familia"] = cambios_familia;
      } else {
        data["cambios_familia"] = [];
      }
      return data;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getAllEntornoFamiliarByID = (req, res) => {
  Caracterizacion.findOne({
    attributes: ["id"],
    include: [
      {
        model: Viviendo,
      },
      {
        model: Electrodomestico,
      },
      {
        model: Dormir,
      },
    ],
    where: { id: req.query.data },
  })
    .then(function (el) {
      let data = el.toJSON();

      //Array Viviendo
      if (data.viviendos) {
        let objArray = data.viviendos;
        let viviendo = [];
        for (let g = 0; g < objArray.length; g++) {
          viviendo[g] = parseInt(objArray[g].viviendo);
        }
        data["viviendo"] = viviendo;
      } else {
        data["viviendo"] = [];
      }

      //Array Electrodomestico
      if (data.electrodomesticos) {
        let objArray = data.electrodomesticos;
        let electrodomestico = [];
        for (let h = 0; h < objArray.length; h++) {
          electrodomestico[h] = parseInt(objArray[h].electrodomestico);
        }
        data["electrodomesticos"] = electrodomestico;
      } else {
        data["electrodomesticos"] = [];
      }

      //Array Dormir
      if (data.dormirs) {
        let objArray = data.dormirs;
        let dormir = [];
        for (let i = 0; i < objArray.length; i++) {
          dormir[i] = parseInt(objArray[i].dormir);
        }
        data["dormir"] = dormir;
      } else {
        data["dormir"] = [];
      }

      return data;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getAllSaludFamiliarByID = (req, res) => {
  Caracterizacion.findOne({
    attributes: ["id"],
    include: [
      {
        model: Condicion,
      },
    ],
    where: { id: req.query.data },
  })
    .then(function (el) {
      let data = el.toJSON();
      //Array Condiciones
      if (data.condiciones) {
        let objArray = data.condiciones;
        let condicion = [];
        for (let g = 0; g < objArray.length; g++) {
          condicion[g] = parseInt(objArray[g].condicion);
        }
        data["condiciones"] = condicion;
      } else {
        data["condiciones"] = [];
      }
      return data;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getAllMorbilidadByID = (req, res) => {
  Caracterizacion.findOne({
    attributes: ["id"],
    include: [
      {
        model: Familiar_Enfermedad,
      },
    ],
    where: { id: req.query.data },
  })
    .then(function (el) {
      let data = el.toJSON();
      //Array Familiar Enfermedades
      if (data.familiar_enfermedades) {
        let objArray = data.familiar_enfermedades;
        let familiar_enfermedad = [];
        for (let g = 0; g < objArray.length; g++) {
          familiar_enfermedad[g] = parseInt(objArray[g].familiar_enfermedad);
        }
        data["familiar_enfermedad"] = familiar_enfermedad;
      } else {
        data["familiar_enfermedad"] = [];
      }
      return data;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getAllSaludMentalByID = (req, res) => {
  Caracterizacion.findOne({
    attributes: ["id"],
    include: [
      {
        model: Dedicacion,
      },
    ],
    where: { id: req.query.data },
  })
    .then(function (el) {
      let data = el.toJSON();
      //Array Dedicaciones
      if (data.dedicaciones) {
        let objArray = data.dedicaciones;
        let dedicacion = [];
        for (let g = 0; g < objArray.length; g++) {
          dedicacion[g] = parseInt(objArray[g].dedicacion);
        }
        data["dedicacion"] = dedicacion;
      } else {
        data["dedicacion"] = [];
      }
      return data;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getAllAsesoriaJuridicaByID = (req, res) => {
  Caracterizacion.findOne({
    attributes: ["id"],
    include: [
      { model: Asistio_Organizacion },
      { model: Requerimiento_Organizacion },
      { model: Principal_Necesidad },
    ],
    where: { id: req.query.data },
  })
    .then(function (el) {
      let data = el.toJSON();
      //Array Asistio Organizaciones
      if (data.asistio_organizaciones) {
        let objArray = data.asistio_organizaciones;
        let asistio_organizacion = [];
        for (let g = 0; g < objArray.length; g++) {
          asistio_organizacion[g] = parseInt(objArray[g].asistio_organizacion);
        }
        data["asistio_organizacion"] = asistio_organizacion;
      } else {
        data["asistio_organizacion"] = [];
      }
      //Array Requerimiento Organizaciones
      if (data.requerimientos_organizaciones) {
        let objArray = data.requerimientos_organizaciones;
        let requerimientos_organizacion = [];
        for (let g = 0; g < objArray.length; g++) {
          requerimientos_organizacion[g] = parseInt(
            objArray[g].requerimientos_organizacion
          );
        }
        data["requerimientos_organizacion"] = requerimientos_organizacion;
      } else {
        data["requerimientos_organizacion"] = [];
      }
      //Array Requerimiento Organizaciones
      if (data.principal_necesidades) {
        let objArray = data.principal_necesidades;
        let principal_necesidad = [];
        for (let g = 0; g < objArray.length; g++) {
          principal_necesidad[g] = parseInt(objArray[g].principal_necesidad);
        }
        data["principal_necesidad"] = principal_necesidad;
      } else {
        data["principal_necesidad"] = [];
      }
      return data;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getAllAsignacionByID = (req, res) => {
  Caracterizacion.findOne({
    attributes: ["id"],
    include: [
      { model: Persona, as: "persona" },
      {
        model: Asesor_Caracterizacion,
      },
    ],
    where: { id: req.query.data },
  })
    .then(function (el) {
      let data = el.toJSON();
      //Array Asesorias
      if (data.asesor_caracterizaciones) {
        let objArray = data.asesor_caracterizaciones;
        let asesor_caracterizacion = [];
        for (let h = 0; h < objArray.length; h++) {
          asesor_caracterizacion[h] = parseInt(objArray[h].tipo);
        }
        data["tipo_asignacion"] = asesor_caracterizacion;
      } else {
        data["tipo_asignacion"] = [];
      }
      return data;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getAllDataAsignacionByID = (req, res) => {
  Caracterizacion.findAll({
    include: [
      {
        model: Persona,
        as: "persona",
      },
      {
        model: Asesor_Caracterizacion,
        where: {
          userId: req.query.id,
        },
      },
    ],
    where: { estado: req.query.estado },
  })
    .then(function (el) {
      return el;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getAllDataAsignacionByIDEstado = (req, res) => {
  if (req.query.estado_seguimiento == "sin_completar") {
    Caracterizacion.findAll({
      include: [
        {
          model: Persona,
          as: "persona",
        },
        {
          model: Asesor_Caracterizacion,
          where: {
            [Op.and]: [
              { userId: req.query.id },
              //{ estado: req.query.estado_seguimiento },
              { estado: ["sin_completar", "en_seguimiento"] },
            ],
          },
        },
      ],
      where: { estado: req.query.estado },
    })
      .then(function (el) {
        return el;
      })
      .then(function (caracterizacionList) {
        res.json(caracterizacionList);
      });
  } else {
    Caracterizacion.findAll({
      include: [
        {
          model: Persona,
          as: "persona",
        },
        {
          model: Asesor_Caracterizacion,
          where: {
            [Op.and]: [
              { userId: req.query.id },
              { estado: req.query.estado_seguimiento },
            ],
          },
        },
      ],
      where: { estado: req.query.estado },
    })
      .then(function (el) {
        return el;
      })
      .then(function (caracterizacionList) {
        res.json(caracterizacionList);
      });
  }
};

exports.getAllByID = (req, res) => {
  Caracterizacion.findOne({
    include: [
      { all: true },
      {
        model: Persona,
        as: "persona",
      },
      {
        model: User,
        as: "digitador",
      },
    ],
    where: { id: req.query.data },
  })
    .then(function (el) {
      let data = el.toJSON();
      // Array Motivos Migracion
      if (data.motivos_migraciones) {
        let objArray = data.motivos_migraciones;
        let motivos_migracion = [];
        for (let i = 0; i < objArray.length; i++) {
          motivos_migracion[i] = objArray[i].motivo;
        }
        data["motivos_migracion"] = motivos_migracion;
      } else {
        data["motivos_migracion"] = [];
      }
      //Array Viven Venezuela
      if (data.viven_venezuelas) {
        let objArray = data.viven_venezuelas;
        let viven_venezuela = [];
        for (let b = 0; b < objArray.length; b++) {
          viven_venezuela[b] = parseInt(objArray[b].vivia_origen_venezuela);
        }
        data["viven_venezuela"] = viven_venezuela;
      } else {
        data["viven_venezuela"] = [];
      }
      //Array Vivian
      if (data.vivia_origenes) {
        let objArray = data.vivia_origenes;
        let vivia_origen = [];
        for (let c = 0; c < objArray.length; c++) {
          vivia_origen[c] = parseInt(objArray[c].vivia_origen);
        }
        data["vivia_origenes"] = vivia_origen;
      } else {
        data["vivia_origenes"] = [];
      }
      //Array Paradero
      if (data.paraderos) {
        let objArray = data.paraderos;
        let paradero = [];
        for (let d = 0; d < objArray.length; d++) {
          paradero[d] = parseInt(objArray[d].paradero);
        }
        data["paradero"] = paradero;
      } else {
        data["paradero"] = [];
      }
      //Array Acompanados
      if (data.acompanados) {
        let objArray = data.acompanados;
        let acompanado = [];
        for (let e = 0; e < objArray.length; e++) {
          acompanado[e] = parseInt(objArray[e].acompanado);
        }
        data["acompanado"] = acompanado;
      } else {
        data["acompanado"] = [];
      }

      //Array Cambios Familiares
      if (data.cambios_familiares) {
        let objArray = data.cambios_familiares;
        let cambios_familia = [];
        for (let f = 0; f < objArray.length; f++) {
          cambios_familia[f] = parseInt(objArray[f].cambios_familia);
        }
        data["cambios_familia"] = cambios_familia;
      } else {
        data["cambios_familia"] = [];
      }

      //Array Composicion Familiares
      if (data.composicion_familiares) {
        data["composicion"] = data.composicion_familiares;
      } else {
        data["composicion"] = [];
      }

      //Array Viviendo
      if (data.viviendos) {
        let objArray = data.viviendos;
        let viviendo = [];
        for (let g = 0; g < objArray.length; g++) {
          viviendo[g] = parseInt(objArray[g].viviendo);
        }
        data["viviendo"] = viviendo;
      } else {
        data["viviendo"] = [];
      }

      //Array Electrodomestico
      if (data.electrodomesticos) {
        let objArray = data.electrodomesticos;
        let electrodomestico = [];
        for (let h = 0; h < objArray.length; h++) {
          electrodomestico[h] = parseInt(objArray[h].electrodomestico);
        }
        data["electrodomesticos"] = electrodomestico;
      } else {
        data["electrodomesticos"] = [];
      }

      //Array Dormir
      if (data.dormirs) {
        let objArray = data.dormirs;
        let dormir = [];
        for (let i = 0; i < objArray.length; i++) {
          dormir[i] = parseInt(objArray[i].dormir);
        }
        data["dormir"] = dormir;
      } else {
        data["dormir"] = [];
      }

      //Array Condiciones
      if (data.condiciones) {
        let objArray = data.condiciones;
        let condicion = [];
        for (let g = 0; g < objArray.length; g++) {
          condicion[g] = parseInt(objArray[g].condicion);
        }
        data["condiciones"] = condicion;
      } else {
        data["condiciones"] = [];
      }

      //Array Familiar Enfermedades
      if (data.familiar_enfermedades) {
        let objArray = data.familiar_enfermedades;
        let familiar_enfermedad = [];
        for (let g = 0; g < objArray.length; g++) {
          familiar_enfermedad[g] = parseInt(objArray[g].familiar_enfermedad);
        }
        data["familiar_enfermedad"] = familiar_enfermedad;
      } else {
        data["familiar_enfermedad"] = [];
      }

      //Array Dedicaciones
      if (data.dedicaciones) {
        let objArray = data.dedicaciones;
        let dedicacion = [];
        for (let g = 0; g < objArray.length; g++) {
          dedicacion[g] = parseInt(objArray[g].dedicacion);
        }
        data["dedicacion"] = dedicacion;
      } else {
        data["dedicacion"] = [];
      }

      //Array Asistio Organizaciones
      if (data.asistio_organizaciones) {
        let objArray = data.asistio_organizaciones;
        let asistio_organizacion = [];
        for (let g = 0; g < objArray.length; g++) {
          asistio_organizacion[g] = parseInt(objArray[g].asistio_organizacion);
        }
        data["asistio_organizacion"] = asistio_organizacion;
      } else {
        data["asistio_organizacion"] = [];
      }

      //Array Requerimiento Organizaciones
      if (data.requerimientos_organizaciones) {
        let objArray = data.requerimientos_organizaciones;
        let requerimientos_organizacion = [];
        for (let g = 0; g < objArray.length; g++) {
          requerimientos_organizacion[g] = parseInt(
            objArray[g].requerimientos_organizacion
          );
        }
        data["requerimientos_organizacion"] = requerimientos_organizacion;
      } else {
        data["requerimientos_organizacion"] = [];
      }

      //Array Principal Necesidades
      if (data.principal_necesidades) {
        let objArray = data.principal_necesidades;
        let principal_necesidad = [];
        for (let g = 0; g < objArray.length; g++) {
          principal_necesidad[g] = parseInt(objArray[g].principal_necesidad);
        }
        data["principal_necesidad"] = principal_necesidad;
      } else {
        data["principal_necesidad"] = [];
      }

      //Array Asesorias
      if (data.asesor_caracterizaciones) {
        let objArray = data.asesor_caracterizaciones;
        let asesor_caracterizacion = [];
        for (let h = 0; h < objArray.length; h++) {
          asesor_caracterizacion[h] = parseInt(objArray[h].tipo);
        }
        data["tipo_asignacion"] = asesor_caracterizacion;
      } else {
        data["tipo_asignacion"] = [];
      }

      return data;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.deleteCartacterizacion = (req, res) => {
  Caracterizacion.destroy({
    where: {
      id: req.query.id,
    },
  }).then(() => {
    res.status(200).send({ message: "Caraterización eliminada" });
  });
};

// 2da Actua
exports.updateAsesor = (req, res) => {
  //  console.log(req.body[0].asignaciones)
  const asignaciones = req.body[0].asignaciones;
  // console.log(asignaciones.length)
  for (var a = 0; a < asignaciones.length; a++) {
    Asesor_Caracterizacion.update(
      {
        userId: asignaciones[a].asesor,
      },
      {
        where: {
          [Op.and]: [
            { caracterizacioneId: asignaciones[a].id },
            { tipo: asignaciones[a].tipo },
          ],
        },
      }
    );
  }
  Caracterizacion.update(
    {
      estado: "asignada",
    },
    {
      where: { id: req.body[0].id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Caraterización actualizada satisfactoriamente!",
        id: req.body[0].id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionNames = (req, res) => {
  //Array Motivos Migracion
  //Vaciar
  Motivo_Migracion.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  }).then(() => {
    //Almacenar
    const motivos = req.body.motivos_migracion;
    for (var a = 0; a < motivos.length; a++) {
      Motivo_Migracion.upsert({
        motivo: motivos[a],
        caracterizacioneId: req.body.id,
      });
    }
  });

  //Array Composición Familiar
  //Vaciar
  Composicion_Familiar.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  }).then(() => {
    //Almacenar
    const composicion = req.body.composicion;
    for (var i = 0; i < composicion.length; i++) {
      Composicion_Familiar.create({
        parentezco: composicion[i].parentezco,
        edad: composicion[i].edad,
        caracterizacioneId: req.body.id,
      });
    }
  });

  //Array Con quien vivia
  //Eliminar
  Vivia_Origen.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  }).then(() => {
    //Almacenar
    const vivia = req.body.vivia_origenes;
    for (var b = 0; b < vivia.length; b++) {
      Vivia_Origen.create({
        vivia_origen: vivia[b],
        caracterizacioneId: req.body.id,
      });
    }
  });

  //Array Con quien vivia Venezuela
  //Eliminar
  Vivia_Origen_Venezuela.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  }).then(() => {
    //Almacenar
    const vivia_venezuela = req.body.viven_venezuela;
    for (var c = 0; c < vivia_venezuela.length; c++) {
      Vivia_Origen_Venezuela.create({
        vivia_origen_venezuela: vivia_venezuela[c],
        caracterizacioneId: req.body.id,
      });
    }
  });

  //Acompañado
  //Eliminar
  Acompanado.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  }).then(() => {
    //Almacenar
    const acompanado = req.body.acompanado;
    for (var i = 0; i < acompanado.length; i++) {
      Acompanado.create({
        acompanado: acompanado[i],
        caracterizacioneId: req.body.id,
      });
    }
  });

  //Paradero
  //Eliminar
  Paradero.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  }).then(() => {
    //Almacenar
    const paradero = req.body.paradero;
    for (var i = 0; i < paradero.length; i++) {
      Paradero.create({
        paradero: paradero[i],
        caracterizacioneId: req.body.id,
      });
    }
  });

  //Cambio Familia
  //Eliminar
  Cambios_Familia.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  }).then(() => {
    //Almacenar
    const cambios_familia = req.body.cambios_familia;
    for (var i = 0; i < cambios_familia.length; i++) {
      Cambios_Familia.create({
        cambios_familia: cambios_familia[i],
        caracterizacioneId: req.body.id,
      });
    }
  });
  Caracterizacion.update(
    {
      condicion_migratoria: req.body.condicion_migratoria,
      permanencia_anos: req.body.permanencia_anos,
      permanencia_mes: req.body.permanencia_mes,
      estado_civil: req.body.estado_civil,
      sabe_leer: req.body.sabe_leer,
      sabe_escribir: req.body.sabe_escribir,
      escolaridad: req.body.escolaridad,
      escolaridad_cual: req.body.escolaridad_cual,
      homologacion: req.body.homologacion,
      discapacidad: req.body.discapacidad,
      hijos_estudiando: req.body.hijos_estudiando,
      hijos_estudiando_porque: req.body.hijos_estudiando_porque,
      obstaculos: req.body.obstaculos,
      obstaculos_razon: req.body.obstaculos_razon,
      obstaculos_cual: req.body.obstaculos_cual,
      ocupacion: req.body.ocupacion,
      ocupacion_cual: req.body.ocupacion_cual,
      prestaciones_sociales: req.body.prestaciones_sociales,
      cuidado_hijos: req.body.cuidado_hijos,
      horas: req.body.horas,
      miembros_horas: req.body.miembros_horas,
      ingresos_semanales: req.body.ingresos_semanales,
      ingresos_hogar: req.body.ingresos_hogar,
      cuantos_hijos: req.body.cuantos_hijos,
      cuantas_hijas: req.body.cuantas_hijas,
      quien_origen: req.body.quien_origen,
      cuantos_hijos_vnzla: req.body.cuantos_hijos_vnzla,
      cuantas_hijas_vnzla: req.body.cuantas_hijas_vnzla,
      quien_vnzla: req.body.quien_vnzla,
      ciudad_anterior: req.body.ciudad_anterior,
      ciudad_anterior_cual: req.body.ciudad_anterior_cual,
      razon_cartagena: req.body.razon_cartagena,
      razon_cartagena_cual: req.body.razon_cartagena_cual,
      quedarse_colombia: req.body.quedarse_colombia,
      quedarse_colombia_donde: req.body.quedarse_colombia_donde,
      paradero_ciudades_cuales: req.body.paradero_ciudades_cuales,
      paradero_cartagena: req.body.paradero_cartagena,
      paradero_desconocido: req.body.paradero_desconocido,
      paradero_otro: req.body.paradero_otro,
      cambios_familia_especifique: req.body.cambios_familia_especifique,
      condiciones_vida: req.body.condiciones_vida,
      apoyo_economico: req.body.apoyo_economico,
      envia_dinero: req.body.envia_dinero,
      descripcion_otro: req.body.descripcion_otro,
      envia_dinero_especifique: req.body.envia_dinero_especifique,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Datos personales actualizados satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionEntornoFamiliar = (req, res) => {
  //Arrays Viviendo
  Viviendo.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  });
  //Almacenar
  const viviendo = req.body.viviendo;
  for (var x = 0; x < viviendo.length; x++) {
    Viviendo.create({
      viviendo: viviendo[x],
      caracterizacioneId: req.body.id,
    });
  }
  //Arrays Electrodomesticos
  Electrodomestico.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  });
  //Almacenar
  const electrodomestico = req.body.electrodomesticos;
  for (var i = 0; i < electrodomestico.length; i++) {
    Electrodomestico.create({
      electrodomestico: electrodomestico[i],
      caracterizacioneId: req.body.id,
    });
  }
  //Arrays Dormir
  Dormir.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  });
  //Almacenar
  const dormir = req.body.dormir;
  for (var i = 0; i < dormir.length; i++) {
    Dormir.create({
      dormir: dormir[i],
      caracterizacioneId: req.body.id,
    });
  }
  Caracterizacion.update(
    {
      viviendo_hijos: req.body.viviendo_hijos,
      viviendo_hijas: req.body.viviendo_hijas,
      viviendo_quien: req.body.viviendo_quien,
      integrantes_totales: req.body.integrantes_totales,
      integrantes_ninos: req.body.integrantes_ninos,
      integrantes_adultos: req.body.integrantes_adultos,
      hogares_residen: req.body.hogares_residen,
      tipo_vivienda: req.body.tipo_vivienda,
      tenencia_vivienda: req.body.tenencia_vivienda,
      tenencia_otra: req.body.tenencia_otra,
      condiciones_vivienda: req.body.condiciones_vivienda,
      ambiente_cocina: req.body.ambiente_cocina,
      ambiente_sala: req.body.ambiente_sala,
      ambiente_habitacion: req.body.ambiente_habitacion,
      ambiente_bano: req.body.ambiente_bano,
      electrodomesticos_otro: req.body.electrodomesticos_otro,
      prepara_alimentos: req.body.prepara_alimentos,
      cuenta_bano: req.body.cuenta_bano,
      otro_bano: req.body.otro_bano,
      dormir_otro: req.body.dormir_otro,
      espacio_seguro: req.body.espacio_seguro,
      espacio_seguro_porque: req.body.espacio_seguro_porque,
      cambia_vivienda: req.body.cambia_vivienda,
      motivo_vivienda: req.body.motivo_vivienda,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Datos etorno familiar actualizados satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionSaludFamiliar = (req, res) => {
  //Arrays Condiciones
  Condicion.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  });
  //Almacenar
  const condicion = req.body.condiciones;
  for (var i = 0; i < condicion.length; i++) {
    Condicion.create({
      condicion: condicion[i],
      caracterizacioneId: req.body.id,
    });
  }
  Caracterizacion.update(
    {
      afiliacion: req.body.afiliacion,
      condiciones: req.body.condiciones.toString(),
      condiciones_cuales: req.body.condiciones_cuales,
      enfermedad: req.body.enfermedad,
      enfermedad_cual: req.body.enfermedad_cual,
      enfermedad_quien: req.body.enfermedad_quien,
      enfermedad_otro: req.body.enfermedad_otro,
      atendio_enfermedad: req.body.atendio_enfermedad,
      medidas_aislamiento: req.body.medidas_aislamiento,
      medidas_aislamiento_porque: req.body.medidas_aislamiento_porque,
      prueba_covid: req.body.prueba_covid,
      resultado: req.body.resultado,
      tratado: req.body.tratado,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Datos salud familiar actualizados satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionMorbilidadMenores = (req, res) => {
  Caracterizacion.update(
    {
      enfermedades: req.body.enfermedades,
      enfermedad_otra: req.body.enfermedad_otra,
      tratamiento: req.body.tratamiento,
      tratamiento_otro: req.body.tratamiento_otro,
      sin_ayuda: req.body.sin_ayuda,
      sin_ayuda_otro: req.body.sin_ayuda_otro,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Datos Morbilidad Menores actualizados satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionMorbilidadMayores = (req, res) => {
  //Arrays Familiar Enfermedad
  Familiar_Enfermedad.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  });
  //Almacenar
  const familiar_enfermedad = req.body.familiar_enfermedad;
  for (var i = 0; i < familiar_enfermedad.length; i++) {
    Familiar_Enfermedad.create({
      familiar_enfermedad: familiar_enfermedad[i],
      caracterizacioneId: req.body.id,
    });
  }
  Caracterizacion.update(
    {
      accidentes: req.body.accidentes,
      accidentes_otro: req.body.accidentes_otro,
      busco_ayuda: req.body.busco_ayuda,
      busco_ayuda_otro: req.body.busco_ayuda_otro,
      razon_ayuda: req.body.razon_ayuda,
      razon_ayuda_otro: req.body.razon_ayuda_otro,
      // familiar_enfermedad: (req.body.familiar_enfermedad).toString()
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Datos Morbilidad Mayores actualizados satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionMorbilidadCronica = (req, res) => {
  Caracterizacion.update(
    {
      familiares_enfermedades: req.body.familiares_enfermedades,
      familiares_enfermedades_cuales: req.body.familiares_enfermedades_cuales,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Datos Morbilidad Cronica actualizados satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionMortalidad = (req, res) => {
  Caracterizacion.update(
    {
      muerte_violenta: req.body.muerte_violenta,
      muerte_violenta_especifique: req.body.muerte_violenta_especifique,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Datos Mortalidad actualizados satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionSaludMental = (req, res) => {
  //Arrays Dedicacion
  Dedicacion.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  });
  //Almacenar
  const dedicacion = req.body.dedicacion;
  for (var i = 0; i < dedicacion.length; i++) {
    Dedicacion.create({
      dedicacion: dedicacion[i],
      caracterizacioneId: req.body.id,
    });
  }
  Caracterizacion.update(
    {
      muerte_violenta_especifique: req.body.muerte_violenta_especifique,
      discriminacion: req.body.discriminacion,
      lugares_discriminacion: req.body.lugares_discriminacion,
      lugares_discriminacion_otro: req.body.lugares_discriminacion_otro,
      produjo_discriminacion: req.body.produjo_discriminacion,
      produjo_atendio: req.body.produjo_atendio,
      dedicacion_otro: req.body.dedicacion_otro,
      sabe_abuso_sexual: req.body.sabe_abuso_sexual,
      abuso_sexual: req.body.abuso_sexual,
      abuso_sexual_observacion: req.body.abuso_sexual_observacion,
      caso_denunciado: req.body.caso_denunciado,
      capturado_culpable: req.body.capturado_culpable,
      maltratos: req.body.maltratos,
      tipo_maltratos: req.body.tipo_maltratos,
      tipo_maltratos_otro: req.body.tipo_maltratos_otro,
      denuncia_caso: req.body.denuncia_caso,
      integrante_familia: req.body.integrante_familia,
      integrante_familia_otro: req.body.integrante_familia_otro,
      cambios: req.body.cambios,
      consumo_sustancias: req.body.consumo_sustancias,
      consumo_sustancias_cuales: req.body.consumo_sustancias_cuales,
      sentir_relaciones: req.body.sentir_relaciones,
      situacion_migrante: req.body.situacion_migrante,
      necesidad_retornar: req.body.necesidad_retornar,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Datos Salud Mental actualizados satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionJuridica = (req, res) => {
  //Arrays Asistio Organizacion
  Asistio_Organizacion.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  });
  //Almacenar
  const asistio_organizacion = req.body.asistio_organizacion;
  for (var i = 0; i < asistio_organizacion.length; i++) {
    Asistio_Organizacion.create({
      asistio_organizacion: asistio_organizacion[i],
      caracterizacioneId: req.body.id,
    });
  }
  //Arrays Requerimiento Organizacion
  Requerimiento_Organizacion.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  });
  //Almacenar
  const requerimientos_organizacion = req.body.requerimientos_organizacion;
  for (var i = 0; i < requerimientos_organizacion.length; i++) {
    Requerimiento_Organizacion.create({
      requerimientos_organizacion: requerimientos_organizacion[i],
      caracterizacioneId: req.body.id,
    });
  }
  //Arrays Principal Necesidad
  Principal_Necesidad.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  });
  //Almacenar
  const principal_necesidad = req.body.principal_necesidad;
  for (var i = 0; i < principal_necesidad.length; i++) {
    Principal_Necesidad.create({
      principal_necesidad: principal_necesidad[i],
      caracterizacioneId: req.body.id,
    });
  }

  Caracterizacion.update(
    {
      medio_atencion: req.body.medio_atencion,
      recibido_tipo_ayuda: req.body.recibido_tipo_ayuda,
      asistio_organizacion_otro: req.body.asistio_organizacion_otro,
      requerimientos_organizacion_otro:
        req.body.requerimientos_organizacion_otro,
      califica_atencion: req.body.califica_atencion,
      califica_atencion_porque: req.body.califica_atencion_porque,
      resolver_situacion: req.body.resolver_situacion,
      tiempo_solicitud: req.body.tiempo_solicitud,
      tiempo_solicitud_otro: req.body.tiempo_solicitud_otro,
      principal_necesidad_otro: req.body.principal_necesidad_otro,
      resumen_consulta: req.body.resumen_consulta,
      documentos_entregados: req.body.documentos_entregados,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Datos Asesoria Juridica actualizados satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionPsicologica = (req, res) => {
  Caracterizacion.update(
    {
      atencion_red: req.body.atencion_red,
      atencion_red_cuales: req.body.atencion_red_cuales,
      ubicacion_red: req.body.ubicacion_red,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Datos Asesoria Psicologica actualizados satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateCartacterizacionEmpleabilidad = (req, res) => {
  Caracterizacion.update(
    {
      formacion_empleo: req.body.formacion_empleo,
      orientacion_empresas: req.body.orientacion_empresas,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message:
          "Datos Asesoria Empleabilidad actualizados satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//1era en ejecutarse
exports.updateTipoAsesoria = (req, res) => {
  const asesorias = req.body.tipo_asignacion;
  Asesor_Caracterizacion.destroy({
    where: {
      caracterizacioneId: req.body.id,
    },
  }).then(() => {
    for (var i = 0; i < asesorias.length; i++) {
      Asesor_Caracterizacion.create({
        tipo: asesorias[i],
        estado: "sin_completar",
        caracterizacioneId: req.body.id,
        userId: req.body.userId,
      });
    }
    Caracterizacion.update(
      {
        estado: "sin_asignar",
      },
      {
        where: { id: req.body.id },
        returning: true,
        plain: true,
      }
    )
      .then((caraterizacion) => {
        res.send({
          message: "Tipo de asesoria actualizada satisfactoriamente!",
          id: req.body.id,
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
  });
};

//3era ejecutarse
exports.updateTipoAsesoriaFinal = (req, res) => {
  const asesorias = req.body.tipo_asignacion;
  for (var i = 0; i < asesorias.length; i++) {
    Asesor_Caracterizacion.create({
      tipo: asesorias[i],
      estado: "sin_completar",
      caracterizacioneId: req.body.id,
      userId: req.body.userId,
    });
  }
  const asignaciones = req.body[0].asignaciones;
  for (var a = 0; a < asignaciones.length; a++) {
    Asesor_Caracterizacion.update(
      {
        userId: asignaciones[a].asesor,
      },
      {
        where: {
          [Op.and]: [
            { caracterizacioneId: asignaciones[a].id },
            { tipo: asignaciones[a].tipo },
          ],
        },
      }
    );
  }
  Caracterizacion.update(
    {
      estado: "asignada",
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Tipo de asesoria actualizada satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateTipoAsesoriaEstado = (req, res) => {
  Asesor_Caracterizacion.update(
    {
      estado: "finalizada",
    },
    {
      where: {
        [Op.and]: [
          { caracterizacioneId: req.body.id },
          { userId: req.body.userId },
        ],
      },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.status(200).send({
        message: "Estado asesoria actualizada satisfactoriamente!",
        id: req.body.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllAsesoriaJuridica = (req, res) => {
  //console.log(req.query)
  Asesoria_Juridica.findAll({
    where: {
      estado_juridico: req.query.estado,
      caracterizacioneId: req.query.id,
    },
  })
    .then(function (el) {
      return el;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getOneAsesoriaJuridica = (req, res) => {
  Asesoria_Juridica.findOne({
    where: { id: req.query.data },
  })
    .then(function (el) {
      return el;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.registerAsesoriaJuridica = (req, res) => {
  Asesoria_Juridica.create({
    fecha_atencion_juridico: req.body.fecha_atencion_juridico,
    remitido_juridico: req.body.remitido_juridico,
    entidad_juridico: req.body.entidad_juridico,
    tiempo_espera_juridico: req.body.tiempo_espera_juridico,
    resumen_juridico: req.body.resumen_juridico,
    tuvo_solucion_juridico: req.body.tuvo_solucion_juridico,
    observaciones_juridico: req.body.observaciones_juridico,
    estado_juridico: "borrador",
    userId: req.body.userId,
    caracterizacioneId: req.body.caracterizacioneId,
  })
    .then((juridica) => {
      Asesor_Caracterizacion.update(
        {
          estado: "en_seguimiento",
        },
        {
          where: {
            [Op.and]: [
              { userId: req.body.userId },
              { caracterizacioneId: req.body.caracterizacioneId },
            ],
          },
          returning: true,
          plain: true,
        }
      );
      //  .then((caraterizacion) => {
      //    res.status(200).send({
      //      message: "Estado asesoria actualizada satisfactoriamente!",
      //      id: req.body.id,
      //    });
      //  })
      //  .catch((err) => {
      //    res.status(500).send({ message: err.message });
      //  });
      res.send({
        message: "Seguimiento registrada satisfactoriamente!",
        data: juridica,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateAsesoriaJuridica = (req, res) => {
  Asesoria_Juridica.update(
    {
      fecha_atencion_juridico: req.body.fecha_atencion_juridico,
      remitido_juridico: req.body.remitido_juridico,
      entidad_juridico: req.body.entidad_juridico,
      tiempo_espera_juridico: req.body.tiempo_espera_juridico,
      resumen_juridico: req.body.resumen_juridico,
      tuvo_solucion_juridico: req.body.tuvo_solucion_juridico,
      observaciones_juridico: req.body.observaciones_juridico,
      estado_juridico: req.body.estado_juridico,
      userId: req.body.userId,
      caracterizacioneId: req.body.caracterizacioneId,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({ message: "Seguimiento actualizado satisfactoriamente!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteAsesoriaJuridica = (req, res) => {
  Asesoria_Juridica.destroy({
    where: {
      id: req.query.id,
    },
  }).then(() => {
    res
      .status(200)
      .send({ message: "Seguimiento eliminado", data: req.query.id });
  });
};

exports.getAllAsesoriaPsicosocial = (req, res) => {
  Asesoria_Psicosocial.findAll({
    where: {
      estado_psicosocial: req.query.estado,
      caracterizacioneId: req.query.id,
    },
  })
    .then(function (el) {
      return el;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getOneAsesoriaPsicosocial = (req, res) => {
  Asesoria_Psicosocial.findOne({
    where: { id: req.query.data },
  })
    .then(function (el) {
      return el;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.registerAsesoriaPsicosocial = (req, res) => {
  Asesoria_Psicosocial.create({
    fecha_atencion_psicosocial: req.body.fecha_atencion_psicosocial,
    tipo_poblacion_psicosocial: req.body.tipo_poblacion_psicosocial,
    edad_psicosocial: req.body.edad_psicosocial,
    temas_psicosocial: req.body.temas_psicosocial,
    avances_psicosocial: req.body.avances_psicosocial,
    reportes_psicosocial: req.body.reportes_psicosocial,
    tuvo_solucion_psicosocial: req.body.tuvo_solucion_psicosocial,
    observaciones_psicosocial: req.body.observaciones_psicosocial,
    estado_psicosocial: "borrador",
    userId: req.body.userId,
    caracterizacioneId: req.body.caracterizacioneId,
  })
    .then((juridica) => {
      Asesor_Caracterizacion.update(
        {
          estado: "en_seguimiento",
        },
        {
          where: {
            [Op.and]: [
              { userId: req.body.userId },
              { caracterizacioneId: req.body.caracterizacioneId },
            ],
          },
          returning: true,
          plain: true,
        }
      );
      res.send({
        message: "Seguimiento registrada satisfactoriamente!",
        data: juridica,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateAsesoriaPsicosocial = (req, res) => {
  Asesoria_Psicosocial.update(
    {
      fecha_atencion_psicosocial: req.body.fecha_atencion_psicosocial,
      tipo_poblacion_psicosocial: req.body.tipo_poblacion_psicosocial,
      edad_psicosocial: req.body.edad_psicosocial,
      temas_psicosocial: req.body.temas_psicosocial,
      avances_psicosocial: req.body.avances_psicosocial,
      reportes_psicosocial: req.body.reportes_psicosocial,
      tuvo_solucion_psicosocial: req.body.tuvo_solucion_psicosocial,
      observaciones_psicosocial: req.body.observaciones_psicosocial,
      estado_psicosocial: req.body.estado_psicosocial,
      userId: req.body.userId,
      caracterizacioneId: req.body.caracterizacioneId,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({ message: "Seguimiento actualizado satisfactoriamente!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteAsesoriaPsicosocial = (req, res) => {
  Asesoria_Psicosocial.destroy({
    where: {
      id: req.query.id,
    },
  }).then(() => {
    res
      .status(200)
      .send({ message: "Seguimiento eliminado", data: req.query.id });
  });
};

exports.getAllAsesoriaEmpleabilidad = (req, res) => {
  Asesoria_Empleabilidad.findAll({
    where: {
      estado_empleabilidad: req.query.estado,
      caracterizacioneId: req.query.id,
    },
  })
    .then(function (el) {
      return el;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.getOneAsesoriaEmpleabilidad = (req, res) => {
  Asesoria_Empleabilidad.findOne({
    where: { id: req.query.data },
  })
    .then(function (el) {
      return el;
    })
    .then(function (caracterizacionList) {
      res.json(caracterizacionList);
    });
};

exports.registerAsesoriaEmpleabilidad = (req, res) => {
  Asesoria_Empleabilidad.create({
    fecha_atencion_empleabilidad: req.body.fecha_atencion_empleabilidad,
    genero_empleabilidad: req.body.genero_empleabilidad,
    edad_empleabilidad: req.body.edad_empleabilidad,
    tipo_empleabilidad: req.body.tipo_empleabilidad,
    nombre_empleabilidad: req.body.nombre_empleabilidad,
    descripcion_empleabilidad: req.body.descripcion_empleabilidad,
    responsable_empleabilidad: req.body.responsable_empleabilidad,
    tuvo_solucion_empleabilidad: req.body.tuvo_solucion_empleabilidad,
    observaciones_empleabilidad: req.body.observaciones_empleabilidad,
    estado_empleabilidad: "borrador",
    userId: req.body.userId,
    caracterizacioneId: req.body.caracterizacioneId,
  })
    .then((juridica) => {
      Asesor_Caracterizacion.update(
        {
          estado: "en_seguimiento",
        },
        {
          where: {
            [Op.and]: [
              { userId: req.body.userId },
              { caracterizacioneId: req.body.caracterizacioneId },
            ],
          },
          returning: true,
          plain: true,
        }
      );
      res.send({
        message: "Seguimiento registrada satisfactoriamente!",
        data: juridica,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.updateAsesoriaEmpleabilidad = (req, res) => {
  Asesoria_Empleabilidad.update(
    {
      fecha_atencion_empleabilidad: req.body.fecha_atencion_empleabilidad,
      genero_empleabilidad: req.body.genero_empleabilidad,
      edad_empleabilidad: req.body.edad_empleabilidad,
      tipo_empleabilidad: req.body.tipo_empleabilidad,
      nombre_empleabilidad: req.body.nombre_empleabilidad,
      descripcion_empleabilidad: req.body.descripcion_empleabilidad,
      responsable_empleabilidad: req.body.responsable_empleabilidad,
      tuvo_solucion_empleabilidad: req.body.tuvo_solucion_empleabilidad,
      observaciones_empleabilidad: req.body.observaciones_empleabilidad,
      estado_empleabilidad: req.body.estado_empleabilidad,
      userId: req.body.userId,
      caracterizacioneId: req.body.caracterizacioneId,
    },
    {
      where: { id: req.body.id },
      returning: true,
      plain: true,
    }
  )
    .then((caraterizacion) => {
      res.send({
        message: "Seguimiento actualizado satisfactoriamente!",
        data: req.query.id,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteAsesoriaEmpleabilidad = (req, res) => {
  Asesoria_Empleabilidad.destroy({
    where: {
      id: req.query.id,
    },
  }).then(() => {
    res
      .status(200)
      .send({ message: "Seguimiento eliminado", data: req.query.id });
  });
};
