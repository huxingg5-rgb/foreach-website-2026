import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const FLOW_ASSET_BASE =
  "/images/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide";
const LIFE_ASSET_BASE =
  "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life";

export const diaphragmPumpFlowPressureCurveEsCopy = {
  metadata: {
    title:
      "Cómo interpretar la curva caudal-presión de una bomba de diafragma",
    seoTitle:
      "Curva caudal-presión de una bomba de diafragma: punto de trabajo | FOREACH",
    seoDescription:
      "Guía para calcular el caudal instalado de una bomba de diafragma a partir de la curva de la bomba, la resistencia del circuito, la viscosidad, el diámetro del tubo y las condiciones de ensayo.",
    coverImage: `${FLOW_ASSET_BASE}/article-cover.webp`,
    coverAlt:
      "Bomba de diafragma miniatura FOREACH en un banco de ensayo de caudal y presión",
  },
  deck:
    "Un valor de catálogo como 300 o 600 mL/min no es un caudal fijo dentro del equipo. El caudal real aparece donde la curva de la bomba se cruza con la curva del circuito, bajo las condiciones reales de presión, fluido, tubería y alimentación.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "La misma bomba puede acercarse al caudal libre con agua, tubos cortos y poca contrapresión, pero entregar bastante menos después de añadir un filtro, una válvula, una aguja, un tubo estrecho o un reactivo viscoso. Esa diferencia no implica por sí sola una avería.",
    },
    {
      type: "notice",
      label: "Idea clave:",
      text:
        "el caudal instalado depende de la bomba, del circuito y del método de ensayo; no de un único dato del catálogo.",
    },
    {
      type: "figure",
      src: `${FLOW_ASSET_BASE}/article-cover.webp`,
      alt: "Bomba de diafragma miniatura conectada a instrumentación de laboratorio",
      width: 1304,
      height: 837,
      caption:
        "El caudal libre es un punto de referencia. El punto de trabajo debe verificarse con el circuito final.",
    },
  ],
  sections: [
    {
      title: "1. Compruebe primero cómo se obtuvo la curva",
      blocks: [
        {
          type: "paragraph",
          text:
            "Antes de comparar curvas, alinee tensión en la bomba, corriente limitada, PWM, fluido, viscosidad, temperatura, referencia de presión, diámetro y longitud de tubo, y método de medición del caudal.",
        },
        {
          type: "table",
          headers: ["Dato", "Qué debe definirse", "Error habitual"],
          rows: [
            ["Alimentación", "Tensión real en bornes, límite de corriente y PWM", "Comparar velocidades distintas"],
            ["Fluido", "Viscosidad, temperatura, densidad y gas", "Usar agua para predecir otro reactivo"],
            ["Presión", "Vacío de entrada, presión de salida y posición de las tomas", "Sumar valores sin una definición común"],
            ["Circuito", "Diámetro, longitud, válvulas, filtros y restricción final", "Confundir el banco con el equipo real"],
          ],
        },
        { type: "formula", expression: "ΔPpump = Pout - Pin" },
      ],
    },
    {
      title: "2. Curva de la bomba, curva del sistema y punto de trabajo",
      blocks: [
        {
          type: "paragraph",
          text:
            "La curva de la bomba suele bajar al aumentar la presión diferencial. La curva del sistema sube porque un caudal mayor exige más presión en tubos, conexiones, válvulas y filtros. La intersección de ambas es el punto de trabajo instalado.",
        },
        {
          type: "formula",
          expression:
            "ΔPsystem = ΔPstatic + ΔPfriction + ΣΔPlocal + ΔPterminal",
        },
        {
          type: "figure",
          src: `${FLOW_ASSET_BASE}/pump-system-operating-point-en.webp`,
          alt: "Curva de bomba y curvas de sistema con distintos puntos de trabajo",
          width: 1200,
          height: 658,
          caption:
            "Un tubo mayor desplaza el punto hacia más caudal; un filtro obstruido o una restricción menor lo desplaza hacia menos caudal y mayor ΔP. Es un esquema conceptual.",
        },
      ],
    },
    {
      title: "3. El diámetro interior puede dominar la pérdida de presión",
      blocks: [
        {
          type: "formula",
          expression: "ΔP = 128μLQ / (πD⁴)",
          note:
            "Para flujo laminar estable en un tubo circular, la pérdida es muy sensible a D y aumenta con viscosidad, longitud y caudal.",
        },
        {
          type: "figure",
          src: `${FLOW_ASSET_BASE}/tube-diameter-pressure-loss-en.webp`,
          alt: "Comparación de pérdida de presión en tubos de 1,6, 2,0 y 3,2 milímetros",
          width: 1200,
          height: 600,
          caption:
            "Con agua a 20 °C, 1 m y 100 mL/min, reducir el diámetro de 3,2 a 1,6 mm multiplica aproximadamente por 16 la pérdida ideal del tubo recto. El equipo real añade válvulas, filtros y desniveles.",
        },
      ],
    },
    {
      title: "4. Verifique el caudal instalado con un ensayo repetible",
      blocks: [
        {
          type: "figure",
          src: `${FLOW_ASSET_BASE}/installed-flow-test-loop-en.webp`,
          alt: "Circuito repetible para medir el punto de trabajo de una bomba de diafragma",
          width: 1200,
          height: 600,
          caption:
            "Controle fluido y temperatura, mida Pin y Pout, registre tensión y corriente en la bomba y contraste el caudal por masa o volumen acumulado.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Cebe y purgue siempre con el mismo procedimiento.",
            "Fije tubería, válvulas, filtro, altura y método de medida.",
            "Espere el estado térmico y de caudal definido.",
            "Registre presión, tensión, corriente, temperatura y caudal de forma simultánea.",
            "Repita cada condición al menos tres veces y conserve los datos brutos.",
          ],
        },
      ],
    },
  ],
  faqTitle: "Preguntas frecuentes",
  faqItems: [
    {
      question: "¿Por qué el caudal instalado es menor que el del catálogo?",
      answer:
        "Porque tubos, filtros, válvulas, desnivel, presión de entrada y salida, viscosidad, tensión en la bomba y método de medida desplazan el punto de trabajo.",
    },
    {
      question: "¿300 mL/min significa 300 mL/min a la presión nominal?",
      answer:
        "No necesariamente. El caudal libre y la presión nominal pueden corresponder a puntos distintos. Debe leerse la curva medida a la presión requerida.",
    },
    {
      question: "¿Qué variables debo registrar en el equipo?",
      answer:
        "Presión de entrada y salida, tensión y corriente en bornes, temperatura del fluido, masa o volumen acumulado y tiempo de muestreo, manteniendo fijo el circuito.",
    },
  ],
  cta: {
    title: "¿Necesita localizar el punto de trabajo real?",
    description:
      "Comparta caudal objetivo, presiones, fluido y viscosidad, tubería, filtros, válvulas, alimentación y ciclo de trabajo para definir una bomba y un ensayo adecuados.",
    contactLabel: "Contactar con ingeniería",
    productsLabel: "Ver bombas de diafragma",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const microDiaphragmPumpContinuousDutyLifeEsCopy = {
  metadata: {
    title:
      "¿Cuánto tiempo puede funcionar de forma continua una bomba de diafragma miniatura?",
    seoTitle:
      "Funcionamiento continuo y vida útil de bombas de diafragma | FOREACH",
    seoDescription:
      "Diferencias entre servicio continuo, vida acumulada, motores con escobillas y sin escobillas, perfil de misión, criterios de fallo, ensayos de duración y fiabilidad B10.",
    coverImage: `${LIFE_ASSET_BASE}/article-cover.webp`,
    coverAlt:
      "Bomba de diafragma miniatura FOREACH durante un ensayo de funcionamiento continuo",
  },
  deck:
    "Apta para servicio continuo no significa vida ilimitada. Capacidad de funcionamiento continuo, horas acumuladas, vida de calendario y fiabilidad estadística son especificaciones diferentes y dependen de carga, fluido, control y ambiente.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "En un equipo OEM no basta con que el motor siga girando. La bomba debe arrancar, mantener el caudal a presión, permanecer dentro de los límites eléctricos y térmicos, evitar fugas y conservar la función durante el perfil de uso real.",
    },
    {
      type: "notice",
      label: "Regla de ingeniería:",
      text:
        "lea siempre las horas de vida junto con tensión, carga, fluido, temperatura, patrón de uso, número de muestras y criterio de fallo.",
    },
    {
      type: "figure",
      src: `${LIFE_ASSET_BASE}/article-cover.webp`,
      alt: "Bomba de diafragma conectada a instrumentación de ensayo de duración",
      width: 1304,
      height: 837,
      caption:
        "El servicio continuo es un modo de operación; la vida útil termina cuando se alcanza un límite funcional definido.",
    },
  ],
  sections: [
    {
      title: "1. Convierta el uso del equipo en una demanda de vida",
      blocks: [
        {
          type: "formula",
          expression: "Ttotal = Σ(Ni × ti)",
          note:
            "Las horas alimentadas se calculan por estado; los arranques y la distribución de carga se registran por separado.",
        },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/duty-profile-lifetime-demand-en.webp`,
          alt: "Perfil de misión con horas, arranques y distribución de carga",
          width: 1200,
          height: 675,
          caption:
            "La vida de calendario no equivale a horas de bomba. Registre tiempo activo, arranques, presión, corriente y temperatura en cada estado.",
        },
      ],
    },
    {
      title: "2. Con escobillas frente a sin escobillas",
      blocks: [
        {
          type: "paragraph",
          text:
            "El motor con escobillas utiliza contacto mecánico con el conmutador y acumula desgaste y arco. La conmutación electrónica elimina ese mecanismo, pero no elimina la vida de rodamientos, bobinados, electrónica, diafragma o válvulas.",
        },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/brushed-vs-brushless-commutation-en.webp`,
          alt: "Comparación entre conmutación mecánica y electrónica",
          width: 1200,
          height: 675,
          caption:
            "Sin escobillas elimina el desgaste de escobillas; el resto del motor y el cabezal de bomba siguen requiriendo validación.",
        },
      ],
    },
    {
      title: "3. Ensaye la carga real y defina el fallo antes de empezar",
      blocks: [
        { type: "formula", expression: "Pcopper = I²R" },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/lifetime-load-factors-en.webp`,
          alt: "Cadena de carga hidráulica, corriente, temperatura, esfuerzo y vida",
          width: 1200,
          height: 675,
          caption:
            "La contrapresión, la restricción de entrada, el PWM, los arranques, el fluido y la temperatura pueden cambiar el modo de fallo.",
        },
        {
          type: "notice",
          text:
            "Defina antes del ensayo los límites de arranque, caudal, corriente, temperatura, fuga, ruido y control. Seguir girando no siempre significa seguir funcionando correctamente.",
        },
      ],
    },
    {
      title: "4. Duración de una unidad y B10 no son la misma evidencia",
      blocks: [
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/reliability-evidence-levels-en.webp`,
          alt: "Niveles de evidencia desde una unidad hasta una declaración estadística",
          width: 1200,
          height: 675,
          caption:
            "Una unidad que alcanza 10.000 horas demuestra ese ensayo individual; B10 requiere muestras, fallos definidos, tratamiento estadístico y confianza.",
        },
        { type: "formula", expression: "R(t) = exp[-(t / η)^β]" },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/b10-weibull-reliability-en.webp`,
          alt: "Curva Weibull conceptual con el punto B10 en R de t igual a 0,9",
          width: 1200,
          height: 675,
          caption:
            "B10 es el tiempo asociado a un 10% de fallos acumulados en el modelo. El gráfico no representa datos medidos de un modelo FOREACH.",
        },
      ],
    },
  ],
  faqTitle: "Preguntas frecuentes",
  faqItems: [
    {
      question: "¿Puede una bomba miniatura funcionar 24 horas al día?",
      answer:
        "Solo debe considerarse servicio continuo cuando la configuración se valida con la tensión, presión, fluido, temperatura y refrigeración previstas. Las horas de vida siguen acumulándose durante el funcionamiento 24/7.",
    },
    {
      question: "¿Por qué una versión sin escobillas suele durar más?",
      answer:
        "Porque elimina el desgaste mecánico entre escobilla y conmutador. Rodamientos, bobinados, electrónica y cabezal continúan teniendo límites propios.",
    },
    {
      question: "¿Una unidad que alcanza 10.000 horas permite declarar B10?",
      answer:
        "No. B10 es una métrica de población y requiere múltiples muestras, definición de fallo, datos de vida, modelo estadístico y nivel de confianza.",
    },
  ],
  cta: {
    title: "¿Debe elegir una versión de 3.000 o 10.000 horas?",
    description:
      "Comparta años objetivo, horas diarias, arranques, fluido, presiones, PWM, temperatura y estrategia de mantenimiento para comparar opciones con y sin escobillas.",
    contactLabel: "Contactar con ingeniería",
    productsLabel: "Ver bombas de diafragma",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
