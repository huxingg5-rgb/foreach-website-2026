import type { Dpgl800ArticleCopy } from "./dpgl800-gas-liquid-diaphragm-pump.types";

export const dpgl800ArticleEsCopy = {
  metadata: {
    title: "Cómo seleccionar una bomba de diafragma para gas y líquido: caudal, vacío y tiempo de generación de vacío del DPGL800",
    seoTitle: "Cómo elegir una bomba de diafragma gas-líquido | DPGL800 | FOREACH",
    seoDescription: "Guía del DPGL800 para mezclas gas-líquido: 6 L/min de gas sin carga, vacío de ＜-90 kPa, presión de 30 kPa y tiempo de vacío en una cámara de ensayo de 5 L.",
    coverAlt: "Bomba de diafragma gas-líquido FOREACH DPGL800 sin escobillas, 6 L/min y vacío de ＜-90 kPa",
  },
  section1: {
    title: "1. Por qué el DPGL800 no se elige como una bomba para líquido convencional",
    paragraphs: [
      "El DPGL800 trabaja con gas y mezclas gas-líquido. Está pensado para aspirar residuos con aire, vaciar tuberías, generar vacío y mantener la aspiración cuando el líquido llega de forma intermitente.",
      "Por ello, un único dato de caudal no basta. Hay que definir el estado del medio, el vacío objetivo, el tiempo de generación permitido, el volumen del sistema, la presión de descarga, las pérdidas, los materiales mojados y la conexión. La plataforma DPGL800-24BS usa motor CC sin escobillas, DC 24 V ±10% y consume ≤17 W.",
    ],
  },
  section2: {
    title: "2. Datos que deben definirse antes de seleccionar",
    intro: "Estas condiciones permiten saber si 6 L/min y ＜-90 kPa responden realmente al equipo.",
    headers: ["Punto", "Dato necesario", "Importancia"],
    rows: [
      ["Estado del medio", "Gas, mezcla gas-líquido, tapones intermitentes, espuma o partículas", "Define la bomba, los materiales y la validación"],
      ["Objetivo de aspiración", "Vacío objetivo y tiempo admisible", "El vacío límite y la velocidad de evacuación no son lo mismo"],
      ["Volumen del sistema", "Volumen gaseoso de cámara, tubos, filtros y accesorios", "Modifica directamente el tiempo de generación"],
      ["Descarga", "Escape libre o contrapresión y presión positiva necesaria", "La contrapresión cambia el caudal real"],
      ["Circuito", "Longitud y diámetro, válvulas, racores, filtros, juntas y fugas", "La restricción y las fugas ralentizan el vacío"],
      ["Medio y temperatura", "Composición, concentración y trabajo entre +5℃ y +40℃", "Base de la evaluación química"],
      ["Integración", "Espacio, rosca hembra G1/8, dirección de puertos y cableado", "Confirma la viabilidad mecánica"],
    ],
  },
  section3: {
    title: "3. Qué significa realmente 6 L/min",
    paragraphs: [
      "6 L/min es el caudal de gas de un cabezal sin carga. Sitúa al DPGL800 en una clase de rendimiento, pero no es el caudal real de líquido puro ni un valor constante con cualquier vacío o contrapresión.",
      "El caudal cambia al aumentar el vacío de entrada o la resistencia de salida. Tubos, válvulas, racores, filtros, estanqueidad, tapones de líquido y proporción gas-líquido desplazan el punto de trabajo; después de consultar la curva debe ensayarse el conjunto.",
    ],
    noticeStrong: "6 L/min y ＜-90 kPa no corresponden al mismo punto de trabajo.",
    noticeText: "El primero es un caudal de gas sin carga; el segundo es la capacidad máxima de vacío. No significa 6 L/min a ＜-90 kPa.",
  },
  section4: {
    title: "4. Especificaciones esenciales del DPGL800-24BS",
    intro: "Estos límites técnicos son invariantes; los materiales y la orientación se confirman con el modelo completo.",
    headers: ["Parámetro", "DPGL800-24BS"],
    rows: [
      ["Motor", "CC sin escobillas"], ["Tensión", "DC 24 V ±10%"], ["Potencia", "≤17 W"],
      ["Caudal de un cabezal sin carga", "6 L/min (capacidad de gas, no caudal real de líquido puro)"],
      ["Presión positiva máxima", "30 kPa"], ["Presión negativa / vacío máximo", "＜-90 kPa"],
      ["Medios", "Gas y mezclas gas-líquido"], ["Temperatura del medio / ambiente", "+5℃ a +40℃"],
      ["Conexión", "Rosca hembra G1/8"], ["Peso", "Aprox. 600 g"],
      ["Vida especificada", "10000 h a tensión nominal y funcionamiento continuo"],
      ["Materiales mojados", "Cabezal PPS; diafragma EPDM o PTFE y válvula EPDM o FFKM según modelo"],
    ],
  },
  section5: {
    title: "5. Cómo interpretar la curva de caudal de gas y presión",
    paragraphs: [
      "Cerca de una diferencia de presión nula, la curva alcanza aproximadamente 6 L/min. El caudal cambia cuando aumenta el vacío en aspiración o la presión en descarga.",
      "Se parte del intervalo de presión que exige el instrumento y se lee el caudal disponible con margen. La curva explica la tendencia; el límite formal de presión positiva sigue siendo 30 kPa.",
    ],
    figureAlt: "Curva del DPGL800 de caudal de gas frente a presión, con unos 6 L/min cerca de presión cero",
    figureCaption: "Curva caudal-presión del DPGL800; 6 L/min y ＜-90 kPa son puntos distintos",
    notice: "Tubos, válvulas, racores, filtros, sellado y proporción gas-líquido alteran el punto real; es obligatorio validar el circuito instalado.",
  },
  section6: {
    title: "6. Qué representa el tiempo de vacío en una cámara de ensayo de 5 L",
    paragraphs: [
      "La curva mide el tiempo de generación de vacío con una cámara fija de 5 L y un circuito de ensayo definido. Al acercarse al vacío límite, la última parte suele requerir más tiempo, por lo que no existe una conversión lineal simple.",
      "5 L es una condición de ensayo, no un límite de capacidad, producto o aplicación. Un sistema real de 0,5 L, 2 L o 10 L dará otro resultado y dependerá también de tubos, válvulas, racores, filtros, sellado y fugas.",
    ],
    figureAlt: "Curva de tiempo de generación de vacío del DPGL800 en una cámara de ensayo fija de 5 L hasta -90 kPa",
    figureCaption: "Vacío del DPGL800 en una cámara de ensayo de 5 L; 5 L no limita la aplicación",
    notice: "Para calcular el ciclo, ensaye la cámara y el circuito reales con su fuga admisible; no escale directamente la curva de 5 L.",
  },
  section7: {
    title: "7. Aspiración gas-líquido o transporte continuo de líquido puro",
    paragraphs: [
      "El DPGL800 es adecuado para gas, mezclas gas-líquido, residuos, vaciado de líneas y generación de vacío. Los 6 L/min describen gas y no deben usarse como caudal dosificado continuo de líquido puro.",
      "Para transferir líquido puro de forma estable conviene comparar caudal bajo presión, autocebado, pulsación y compatibilidad. Si hay mucho aire o se necesita alto vacío, el DPGL800 debe validarse en el circuito real.",
    ],
    dpl60Prefix: "Para una solución de líquido continuo de la clase 600 mL/min, consulte la",
    dpl60Label: "guía de selección de la bomba de diafragma DPL60",
    dpl60Suffix: ".",
  },
  section8: {
    title: "8. Rosca G1/8, dimensiones y orientación de puertos",
    paragraphs: [
      "El DPGL800 incorpora roscas hembra G1/8. El paso interior del racor, el sellado y el diámetro de tubo influyen en la restricción y las fugas. Antes de cerrar el diseño, compruebe unos 118,8 mm de longitud, los taladros, el peso aproximado de 600 g y el espacio para cables.",
      "La orientación queda definida por el código del modelo. El plano muestra opciones; la entrega debe coincidir con el modelo completo y el plano aprobados.",
    ],
    figureAlt: "Plano dimensional del DPGL800 con roscas hembra G1/8, orificios de montaje y envolvente",
    figureCaption: "Dimensiones del DPGL800; integrar con el plano 2D aprobado y el modelo final",
    headers: ["Código", "Dirección", "Comprobación"],
    rows: [["3", "Derecha", "Racor y mantenimiento a la derecha"], ["6", "Abajo", "Radio de curvatura inferior"], ["9", "Izquierda", "Racor y mantenimiento a la izquierda"], ["C", "Arriba", "Altura para tubo y carcasa"]],
  },
  section9: {
    title: "9. Codificación e interpretación del DPGL800",
    intro: "El código completo identifica serie, tensión, motor, conexión, dirección, materiales mojados y personalización.",
    modelCode: "DPGL800 - 24 - B - S - 6 - EP/PS - X",
    modelCodeDescription: "Serie · tensión · motor sin escobillas · rosca · dirección · materiales de diafragma/válvula/cabezal · personalización",
    headers: ["Campo", "Código", "Significado"],
    rows: [
      ["Serie", "DPGL800", "Bomba de diafragma para gas y mezcla gas-líquido"], ["Tensión", "24 / 12", "DC 24 V; el código 12 V existe en la nomenclatura"],
      ["Motor", "B", "CC sin escobillas"], ["Conexión", "S", "Rosca hembra G1/8"], ["Dirección", "3 / 6 / 9 / C", "Derecha / abajo / izquierda / arriba"],
      ["Materiales", "EP/PS / FF/PS", "EPDM+EPDM+PPS / PTFE+FFKM+PPS"], ["Personalización", "X", "Identificador de configuración especial"],
    ],
    exampleTitle: "Ejemplo: DPGL800-24BS6-EP/PS",
    exampleText: "Serie DPGL800, 24 V, motor sin escobillas, G1/8 hembra, puertos hacia abajo, diafragma EPDM, válvula EPDM y cabezal PPS.",
    standardModelsTitle: "Tres modelos estándar actuales",
    standardModelsIntro: "Los códigos y modelos se muestran como texto HTML indexable para ingeniería y compras.",
    standardModelHeaders: ["Código", "Modelo", "Tensión", "Motor", "Dirección", "Diafragma", "Válvula", "Cabezal"],
    standardModelRows: [
      ["459039", "DPGL800-24BS6-EP/PS", "24 V", "Sin escobillas", "Abajo", "EPDM", "EPDM", "PPS"],
      ["459040", "DPGL800-24BS6-FF/PS", "24 V", "Sin escobillas", "Abajo", "PTFE", "FFKM", "PPS"],
      ["459041", "DPGL800-24BSC-EP/PS", "24 V", "Sin escobillas", "Arriba", "EPDM", "EPDM", "PPS"],
    ],
    notice: "El código 12 V existe en la nomenclatura, pero actualmente no hay SKU estándar de 12 V. No debe inventarse un modelo estándar de 12 V.",
  },
  section10: {
    title: "10. Secuencia completa de selección",
    steps: [
      ["Definir el medio", "Indicar proporción gas-líquido, tapones, espuma, partículas y fases líquidas prolongadas."],
      ["Fijar vacío y ciclo", "Especificar vacío objetivo y tiempo admisible, no solo ＜-90 kPa."],
      ["Calcular el volumen efectivo", "Incluir cámara, tubos, filtros, válvulas y accesorios."],
      ["Definir la contrapresión", "Localizar el punto real en la curva de caudal-presión."],
      ["Revisar materiales", "Elegir EP/PS o FF/PS según composición, concentración, temperatura y contacto."],
      ["Elegir la dirección", "Seleccionar 3, 6, 9 o C y comprobar racores G1/8 y espacio."],
      ["Comprobar alimentación y vida", "DC 24 V ±10%, ≤17 W y condición continua de 10000 h."],
      ["Validar el sistema", "Medir vacío, tiempo, caudal, fugas, ruido, temperatura y transiciones gas-líquido."],
    ],
  },
  section11: {
    title: "11. Materiales y límites de uso",
    intro: "La compatibilidad se evalúa en todo el recorrido mojado: cabezal, diafragma, válvula, racores, juntas y tubos.",
    headers: ["Combinación", "Construcción", "Criterio"],
    rows: [
      ["EP/PS", "Diafragma EPDM + válvula EPDM + cabezal PPS", "Base de evaluación; validar con el medio real"],
      ["FF/PS", "Diafragma PTFE + válvula FFKM + cabezal PPS", "Para exigencia química mayor; no es compatibilidad universal"],
      ["Temperatura", "+5℃ a +40℃", "Medio y ambiente dentro del intervalo"],
      ["Vida", "10000 h", "A tensión nominal y continuo; carga, temperatura, ciclos y medio influyen"],
    ],
  },
  conclusion: {
    title: "Conclusión",
    paragraphs: [
      "Considere por separado el caudal de gas sin carga de 6 L/min, el vacío máximo de ＜-90 kPa y el tiempo medido con una cámara de 5 L. Después aplique volumen, pérdidas, fugas, medio y materiales reales.",
      "Para líquido puro continuo, compare una bomba como DPL60. Para aire, residuos, vaciado o alto vacío, valide el DPGL800 en el circuito gas-líquido definitivo.",
    ],
  },
  internalLinks: {
    productPrefix: "Consulte configuraciones, dimensiones y descargas en la",
    productLabel: "página de producto del DPGL800",
    productSuffix: ".",
    categoryPrefix: "Para comparar otros caudales, presiones y medios, vuelva a",
    categoryLabel: "bombas de diafragma",
    categorySuffix: ".",
  },
} as const satisfies Dpgl800ArticleCopy;
