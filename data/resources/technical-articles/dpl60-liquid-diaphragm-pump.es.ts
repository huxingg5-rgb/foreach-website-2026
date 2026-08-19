import type { Dpl60ArticleCopy } from "./dpl60-liquid-diaphragm-pump.types";

export const dpl60ArticleEsCopy = {
  metadata: {
    title: "Cómo seleccionar una bomba de diafragma de 600 mL/min: guía DPL60 de caudal, presión y modelos",
    seoTitle: "Selección de bomba de diafragma de 600 mL/min: punto de trabajo y modelos DPL60",
    seoDescription:
      "Guía de la bomba de diafragma para líquidos FOREACH DPL60: caudal sin carga de 600 mL/min, presión nominal de 100 kPa, curva, motores, materiales, codificación, lógica de configuración y método de selección.",
  },
  diagram: {
    ariaLabel: "Explicación del punto de trabajo de la bomba DPL60",
    suctionTitle: "Condición de entrada",
    dischargeTitle: "Condición de salida",
    inletOpen: "Vacío de entrada",
    outletClosed: "Resistencia del circuito",
    suctionDescription: "La aspiración modifica el caudal real",
    inletClosed: "Contrapresión",
    outletOpen: "Caudal real",
    dischargeDescription: "Las curvas de la bomba y del sistema fijan el punto de trabajo",
    caption: "Punto de trabajo del DPL60",
  },
  section1: {
    title: "1. ¿Qué necesidad cubre el DPL60 de 600 mL/min?",
    paragraphs: [
      "El DPL60 es la bomba miniatura de diafragma para líquidos de FOREACH destinada a circuitos instrumentales de mayor caudal. Resulta adecuada para lavado, enjuague, circulación, transferencia de volúmenes mayores y evacuación de residuos líquidos.",
      "Los 600 mL/min son el caudal de referencia sin carga. La presión nominal es 100 kPa, la altura de autocebado 3 mH₂O y existen configuraciones de 12 V o 24 V CC, con o sin escobillas y con materiales EP/PS o FF/PS.",
      "Como otras bombas de diafragma, utiliza el movimiento alternativo de una membrana y válvulas antirretorno. En el DPL60, la cuestión decisiva es el punto de trabajo después de integrarlo en el circuito real.",
      "Para necesidades en torno a 300 mL/min conviene comparar el DPL30. Si la limitación principal es una contrapresión elevada, debe evaluarse una bomba de mayor presión y no seleccionar solo por el caudal sin carga.",
    ],
  },
  section2: {
    title: "2. ¿Qué debe definirse antes de seleccionar una bomba de 600 mL/min?",
    intro:
      "La clase de caudal no basta para seleccionar. Hay que definir conjuntamente el punto de trabajo, el líquido, la aspiración, los materiales mojados, el motor, el ciclo de servicio y la resistencia total del circuito.",
    headers: ["Criterio", "Qué confirmar", "Error habitual"],
    rows: [
      ["Caudal objetivo", "Caudal sin carga o caudal requerido a una presión concreta", "Tratar 600 mL/min como caudal fijo una vez instalado"],
      ["Presión del sistema", "Pérdidas en filtros, válvulas, racores, tubos estrechos, boquillas y extremo", "Leer 100 kPa sin comprobar el caudal a la presión objetivo"],
      ["Aspiración", "Desnivel, longitud del tubo, estanqueidad y estado del primer arranque", "Suponer que 3 mH₂O están garantizados en cualquier montaje"],
      ["Materiales mojados", "Cabezal, membrana, válvulas y condiciones completas del fluido", "Deducir la compatibilidad de toda la bomba solo por PTFE o FFKM"],
      ["Motor y alimentación", "12 V / 24 V, escobillas / sin escobillas y señales de control", "Elegir únicamente por precio o vida nominal"],
      ["Circuito", "Longitud, curvas y componentes con tubo de 3,2 mm de diámetro interior", "Ignorar resistencia o fugas del circuito montado"],
      ["Servicio", "Uso continuo o intermitente, horas diarias, arranques y disipación", "Comparar vidas sin conservar las condiciones de ensayo"],
    ],
  },
  section3: {
    title: "3. ¿Por qué 600 mL/min no es un caudal fijo en el equipo?",
    paragraphs: [
      "Los 600 mL/min del DPL60 son una referencia sin carga cerca de una diferencia de presión baja. Los 100 kPa son una especificación nominal de presión independiente, no el mismo punto de trabajo.",
      "Al instalar la bomba, los tubos, filtros, válvulas, racores, restricciones, desniveles y propiedades del líquido generan vacío de entrada y presión de salida. El caudal cambia siguiendo la curva oficial.",
      "Si el instrumento debe mantener aproximadamente 600 mL/min, determine primero la presión del sistema a ese caudal, compruebe el margen en la curva y valide el circuito completo.",
    ],
    noticeStrong: "El DPL60 pertenece a la clase de 600 mL/min; no es una bomba de caudal constante.",
    noticeText:
      "No se deben combinar “600 mL/min sin carga” y “100 kPa nominales” para afirmar que entrega 600 mL/min a 100 kPa.",
  },
  section4: {
    title: "4. Especificaciones técnicas completas del DPL60",
    intro:
      "Estos valores proceden de la especificación vigente. Las versiones con y sin escobillas comparten clase de prestaciones, pero difieren en masa y vida especificada.",
    headers: ["Parámetro", "Con escobillas", "Sin escobillas"],
    rows: [
      { label: "Producto", value: "Bomba de diafragma para líquidos DPL60" },
      { label: "Modelos de ejemplo", brushed: "DPL60-24DB, DPL60-12DB", brushless: "DPL60-24BB, DPL60-12BB" },
      { label: "Motor", brushed: "CC con escobillas", brushless: "CC sin escobillas" },
      { label: "Tensión nominal", value: "12 V CC ±10% o 24 V CC ±10%" },
      { label: "Potencia nominal", value: "≤8,4 W" },
      { label: "Caudal sin carga", value: "600 mL/min" },
      { label: "Presión nominal", value: "100 kPa" },
      { label: "Altura de autocebado", value: "3 mH₂O" },
      { label: "Medio especificado", value: "Agua purificada; otros líquidos requieren evaluación" },
      { label: "Temperatura del medio", value: "+5°C a +80°C" },
      { label: "Tubo", value: "Diámetro interior de 3,2 mm" },
      { label: "Cabezal", value: "PPS" },
      { label: "Membrana", value: "EPDM o PTFE según el modelo" },
      { label: "Válvula", value: "EPDM o FFKM según el modelo" },
      { label: "Masa", brushed: "Aprox. 170 g", brushless: "Aprox. 195 g" },
      { label: "Vida especificada", brushed: "3.000 h, tensión nominal, funcionamiento continuo", brushless: "10.000 h, tensión nominal, funcionamiento continuo" },
    ],
  },
  section5: {
    title: "5. ¿Cómo se lee la curva caudal-presión del DPL60?",
    paragraphs: [
      "La curva oficial muestra la evolución del caudal al variar el vacío de entrada o la presión positiva de salida. El caudal es mayor cerca de una diferencia de presión nula y cambia al aumentar la dificultad de aspiración o la contrapresión.",
      "La curva sirve para localizar el caudal disponible a la presión objetivo, no solo para repetir la cifra de 600 mL/min. En circuitos con filtros, válvulas pequeñas, tubos largos o cámaras presurizadas, estime o mida primero la pérdida de presión.",
    ],
    figureAlt: "Curva oficial de caudal y presión de la bomba DPL60",
    figureCaption: "Curva caudal-presión del DPL60; 600 mL/min es la referencia sin carga",
    notice:
      "La viscosidad, el trazado, los racores, las válvulas, los filtros, el montaje y el nivel del líquido pueden desplazar el punto de trabajo. Valide el circuito completo.",
  },
  section6: {
    title: "6. ¿Cómo elegir los materiales mojados del DPL60?",
    intro:
      "Las principales piezas mojadas son el cabezal de PPS, la membrana y las válvulas. La compatibilidad debe evaluarse para el conjunto completo y las condiciones reales del fluido.",
    headers: ["Conjunto", "Membrana / válvula", "Cabezal y evaluación"],
    rows: [
      ["EP/PS", "Membrana EPDM + válvula EPDM", "PPS; confirmar fluido, concentración, temperatura y contacto"],
      ["FF/PS", "Membrana PTFE + válvula FFKM", "PPS; confirmar fluido, concentración, temperatura y contacto"],
    ],
    epTitle: "Conjunto EP/PS",
    epText:
      "EP/PS significa membrana EPDM, válvulas EPDM y cabezal PPS. Es una configuración inicial para agua purificada y determinados líquidos convencionales tras evaluación.",
    ffTitle: "Conjunto FF/PS",
    ffText:
      "FF/PS significa membrana PTFE, válvulas FFKM y cabezal PPS. Puede evaluarse para mayores exigencias químicas, pero no convierte toda la bomba en universalmente compatible.",
    noticeStrong: "El medio de trabajo especificado es agua purificada.",
    noticeText:
      "Para otro líquido, indique identidad, composición, concentración, temperatura, tiempo de contacto y limpieza; evalúe la ruta mojada completa y valide una muestra.",
  },
  section7: {
    title: "7. ¿DPL60 con escobillas o sin escobillas?",
    intro:
      "Además de la vida especificada, cambian la masa, la envolvente del motor, el cableado y el control. Reserve espacio a partir del plano formal correspondiente.",
    headers: ["Comparación", "Con escobillas", "Sin escobillas"],
    rows: [
      ["Motor", "CC con escobillas", "CC sin escobillas"],
      ["Vida especificada", "3.000 h", "10.000 h"],
      ["Condición", "Tensión nominal, funcionamiento continuo", "Tensión nominal, funcionamiento continuo"],
      ["Uso típico", "Tiempo limitado, control simple, sensibilidad al coste", "Servicio largo, mayor vida del equipo o control y realimentación"],
      ["Masa", "Aprox. 170 g", "Aprox. 195 g"],
      ["Control", "Alimentación / marcha-paro", "PWM, DIR y FG según configuración"],
    ],
    afterTable:
      "La vida conserva sus condiciones de ensayo. La contrapresión, la alimentación, la temperatura, los arranques, la refrigeración y el fluido modifican la vida real.",
    brushedTitle: "Dimensiones de la versión con escobillas",
    brushedAlt: "Plano recortado de dimensiones del DPL60 con escobillas",
    brushedCaption: "Cuerpo del plano DPL60 con escobillas; use el plano 2D oficial para el montaje",
    brushedText:
      "Compruebe longitud, cabezal, orificios, espiga y dirección del tubo en el plano con escobillas; no utilice la envolvente del DPL30 ni la versión sin escobillas.",
    brushlessTitle: "Dimensiones de la versión sin escobillas",
    brushlessAlt: "Plano recortado de dimensiones del DPL60 sin escobillas",
    brushlessCaption: "Cuerpo del plano DPL60 sin escobillas; use el plano 2D oficial para el montaje",
    brushlessText:
      "El motor, la longitud total y el mazo difieren de la versión con escobillas. Confirme la variante de producción, ya que materiales de motor equivalentes pueden presentar diferencias locales de montaje.",
  },
  section8: {
    title: "8. Codificación e interpretación del DPL60",
    intro:
      "El código completo identifica serie, tensión, motor, número de conductores, conexión, orientación, materiales de membrana/válvula/cabezal y personalización.",
    noticeStrong: "DPL60 - 24 - D - 2 - B - C - EP/PS - X",
    noticeText: "Serie · tensión · motor · conductores · conexión · orientación · materiales mojados · personalización",
    headers: ["Campo", "Código", "Significado"],
    rows: [
      ["Serie", "DPL60", "Bomba DPL60 de la clase 600 mL/min"],
      ["Tensión", "24 / 12", "24 V CC / 12 V CC"],
      ["Motor", "D / B / C / BP", "D: CC con escobillas; B: CC sin escobillas; C: sin núcleo; BP: sin escobillas con PWM externo"],
      ["Conductores", "2 / 3 / 5", "2, 3 o 5; los campos predeterminados pueden omitirse"],
      ["Conexión", "B / S", "B: espiga; S: rosca"],
      ["Orientación", "3 / 6 / 9 / C", "3: derecha; 6: abajo; 9: izquierda; C: arriba, omitible por defecto"],
      ["Materiales", "EP/PS / FF/PS", "EPDM + EPDM + PPS / PTFE + FFKM + PPS"],
      ["Personalización", "X", "Código específico; no se usa sin personalización"],
    ],
    exampleTitle: "Ejemplo: DPL60-24DB-EP/PS",
    exampleText:
      "El modelo se desarrolla como DPL60-24-D-2-B-C-EP/PS; se omiten los dos conductores y la orientación superior predeterminados.",
    exampleHeaders: ["Campo", "Interpretación"],
    exampleRows: [
      ["DPL60", "Serie de bomba de 600 mL/min"],
      ["24", "24 V CC"],
      ["D", "Motor CC con escobillas"],
      ["2 (omitido)", "Dos conductores"],
      ["B", "Conexión de espiga"],
      ["C (omitido)", "Orientación hacia arriba"],
      ["EP/PS", "Membrana EPDM + válvula EPDM + cabezal PPS"],
    ],
    notice:
      "“DB” no es un único código: D indica motor con escobillas y B conexión de espiga. En DPL60-24BB-EP/PS, la primera B indica motor sin escobillas y la segunda B la espiga.",
    standardModelsTitle: "Ocho modelos DPL60 estándar actuales",
    standardModelsIntro:
      "La tabla formal cubre 12 V / 24 V × con / sin escobillas × EP/PS / FF/PS. Todos los modelos y códigos aparecen como texto HTML indexable.",
    standardModelHeaders: ["N.º", "Código", "Modelo estándar", "Tensión", "Motor", "Membrana", "Válvula", "Cabezal"],
    standardModelRows: [
      ["1", "459003", "DPL60-24DB-EP/PS", "24 V", "Con escobillas", "EPDM", "EPDM", "PPS"],
      ["2", "459004", "DPL60-24BB-EP/PS", "24 V", "Sin escobillas", "EPDM", "EPDM", "PPS"],
      ["3", "459015", "DPL60-12DB-EP/PS", "12 V", "Con escobillas", "EPDM", "EPDM", "PPS"],
      ["4", "459016", "DPL60-12BB-EP/PS", "12 V", "Sin escobillas", "EPDM", "EPDM", "PPS"],
      ["5", "459030", "DPL60-24DB-FF/PS", "24 V", "Con escobillas", "PTFE", "FFKM", "PPS"],
      ["6", "459031", "DPL60-24BB-FF/PS", "24 V", "Sin escobillas", "PTFE", "FFKM", "PPS"],
      ["7", "459032", "DPL60-12DB-FF/PS", "12 V", "Con escobillas", "PTFE", "FFKM", "PPS"],
      ["8", "459033", "DPL60-12BB-FF/PS", "12 V", "Sin escobillas", "PTFE", "FFKM", "PPS"],
    ],
  },
  section9: {
    title: "9. Secuencia completa de selección",
    steps: [
      ["Definir el caudal de trabajo", "Distinguir 600 mL/min casi sin carga del caudal requerido a una presión definida."],
      ["Determinar la presión", "Contabilizar tubos, racores, filtros, válvulas, restricciones, desnivel y presión final."],
      ["Leer la curva oficial", "Localizar el punto objetivo y confirmar el margen."],
      ["Definir el líquido", "Indicar identidad, composición, concentración, temperatura, viscosidad, partículas y contacto."],
      ["Definir la aspiración", "Registrar elevación, longitud y diámetro, estanqueidad y primer arranque."],
      ["Elegir tensión y motor", "Seleccionar 12 V / 24 V y con / sin escobillas según alimentación, servicio, vida y control."],
      ["Elegir materiales", "Evaluar EP/PS o FF/PS frente a las condiciones completas."],
      ["Comprobar montaje", "Verificar tubo de 3,2 mm, dimensiones, orientación, mazo y acceso."],
      ["Validar en el equipo", "Ensayar caudal, cebado, ruido, temperatura, estabilidad y funcionamiento prolongado."],
    ],
  },
  section10: {
    title: "10. Usos adecuados y límites",
    intro:
      "El DPL60 puede evaluarse para manipulación de mayor caudal en IVD, automatización de laboratorio e instrumentos analíticos: lavado, enjuague, circulación, transferencia y residuos.",
    headers: ["Tema", "Límite"],
    rows: [
      ["600 mL/min", "Referencia sin carga, no caudal fijo en todas las instalaciones."],
      ["100 kPa", "Presión nominal separada del caudal sin carga; consultar la curva."],
      ["Otros líquidos", "El medio especificado es agua purificada; otros requieren evaluación y prueba."],
      ["Autocebado", "3 mH₂O bajo condiciones especificadas; el arranque depende de toda la aspiración."],
      ["Vida", "3.000 h y 10.000 h conservan la condición de tensión nominal y uso continuo."],
      ["Validación final", "Especificaciones, curvas, planos y materiales orientan; el equipo real decide."],
    ],
  },
  section11: {
    title: "Conclusión",
    paragraphs: [
      "Seleccione el DPL60 separando “bomba de clase 600 mL/min” del caudal real del sistema y combinando la presión de 100 kPa, la curva, el fluido, la aspiración, los materiales, la alimentación, la vida del motor y el espacio.",
      "Si el equipo debe mantenerse cerca de 600 mL/min con contrapresión, use el valor de la curva a esa presión y un ensayo del circuito completo, no el caudal sin carga.",
    ],
  },
  internalLinks: {
    dpl30Prefix: "Para estudiar el ciclo completo de diafragma y válvulas o comparar la clase de 300 mL/min, consulte la",
    dpl30Label: "guía de selección DPL30",
    dpl30Suffix: ".",
    productPrefix: "Para configuraciones, planos y descargas, abra la",
    productLabel: "página de producto DPL60",
    productSuffix: ".",
    categoryPrefix: "Para comparar otras clases de caudal y presión, vuelva a",
    categoryLabel: "bombas de diafragma para líquidos",
    categorySuffix: ".",
  },
} as const satisfies Dpl60ArticleCopy;
