import type { BrushlessWiringArticleCopy } from "./brushless-diaphragm-pump-2-wire-vs-5-wire.types";

export const brushlessWiringArticleEsCopy = {
  metadata: {
    title:
      "Bomba de diafragma sin escobillas de 2 hilos vs. 5 hilos: diferencias y cómo elegir",
    seoTitle: "Bomba de diafragma sin escobillas de 2 y 5 hilos | FOREACH",
    seoDescription:
      "Conozca las diferencias entre las configuraciones de 2 y 5 hilos de una bomba de diafragma sin escobillas, las funciones VCC, GND, PWM, DIR y FG, cuándo utilizar cada opción y las configuraciones disponibles para las series FOREACH DPL30, DPL60, DPL30H y DPGL800.",
    coverAlt: "Motor sin escobillas FOREACH DPL60 de 2 hilos",
  },
  kicker: "Bomba de diafragma sin escobillas · 2 hilos vs. 5 hilos",
  deck:
    "Al seleccionar una bomba de diafragma en miniatura, un mismo tipo de motor de CC sin escobillas puede ofrecerse con 2 o 5 hilos. La diferencia principal no está en el principio básico de bombeo, sino en el grado de control y de información sobre el estado del motor que necesita el equipo.",
  conclusion: {
    title: "1. Conclusión directa",
    label: "En resumen:",
    text:
      "El motor sin escobillas de 2 hilos se utiliza principalmente para la alimentación y el arranque o parada. Su cableado sencillo es adecuado para el funcionamiento a velocidad fija. El motor de 5 hilos, además de la alimentación, puede incorporar control de velocidad PWM, control de dirección y realimentación de velocidad, por lo que resulta más apropiado cuando el controlador principal debe intervenir en el control. Si la bomba solo debe funcionar de forma estable, conviene considerar primero 2 hilos; si se requieren regulación, realimentación o un control más complejo, conviene elegir 5 hilos.",
  },
  twoWire: {
    title: "2. ¿Qué es un motor sin escobillas de 2 hilos?",
    intro: "La configuración de 2 hilos suele conservar únicamente las conexiones básicas de alimentación:",
    headers: ["Conexión", "Función principal"],
    rows: [
      ["VCC", "Positivo de alimentación"],
      ["GND", "Negativo de alimentación / tierra"],
    ],
    paragraphs: [
      "El control básico de accionamiento ya está integrado en el motor. El motor funciona al recibir alimentación y se detiene cuando se interrumpe.",
      "Por tanto, las principales características de la configuración de 2 hilos son un cableado sencillo, un control sencillo y una integración fácil en el sistema.",
    ],
    figureAlt: "Motor sin escobillas FOREACH DPL60 de 2 hilos",
    figureCaption:
      "Figura 1 | Motor sin escobillas DPL60 de 2 hilos. La configuración conserva las conexiones básicas de alimentación.",
    selectionTitle: "¿Cuándo elegir 2 hilos?",
    selectionIntro:
      "La configuración de 2 hilos suele ser la primera opción cuando el equipo cumple estas condiciones:",
    selectionItems: [
      "La bomba trabaja durante largos periodos a velocidad fija.",
      "Solo se necesita control de arranque y parada.",
      "No es necesario leer la velocidad del motor.",
      "No se requiere control de velocidad PWM externo.",
      "Los recursos de interfaz del controlador principal son limitados.",
      "Se desea reducir al mínimo la complejidad del mazo de cables y de la lógica de control.",
    ],
    closing:
      "En muchas aplicaciones de transferencia, vaciado y limpieza dentro de un intervalo de caudal fijo, 2 hilos cubre las necesidades básicas si el equipo completo no requiere regulación dinámica de la velocidad.",
  },
  fiveWire: {
    title: "3. ¿Qué es un motor sin escobillas de 5 hilos?",
    intro:
      "Además del positivo y la tierra de alimentación, la configuración de 5 hilos añade conexiones de control y realimentación.",
    exampleIntro: "Una configuración habitual es la siguiente:",
    headers: ["Conexión", "Función principal"],
    rows: [
      ["VCC", "Positivo de alimentación"],
      ["GND", "Tierra"],
      ["PWM", "Señal de control de velocidad, opcional"],
      ["DIR", "Señal de control de dirección, opcional"],
      ["FG", "Señal de realimentación de velocidad, opcional"],
    ],
    paragraphs: [
      "Frente a 2 hilos, la ventaja principal de 5 hilos es que el controlador del equipo puede controlar con mayor detalle el funcionamiento del motor y recibir la realimentación de velocidad.",
      "Por ejemplo, una señal PWM puede ajustar la velocidad del motor y una señal FG puede ayudar a determinar si funciona correctamente. El orden exacto de los hilos y la lógica de control pueden variar según el modelo; se debe utilizar siempre la especificación eléctrica del producto seleccionado.",
    ],
    figureAlt: "Motor sin escobillas FOREACH DPL60 de 5 hilos",
    figureCaption:
      "Figura 2 | Motor sin escobillas DPL60 de 5 hilos. Además de la alimentación, puede incorporar conexiones de control y realimentación.",
    selectionTitle: "¿Cuándo elegir 5 hilos?",
    selectionIntro:
      "La configuración de 5 hilos es más adecuada cuando el equipo presenta estas necesidades:",
    selectionItems: [
      "Es necesario ajustar la velocidad de la bomba mediante PWM.",
      "Las distintas etapas de trabajo requieren velocidades diferentes.",
      "Es necesario leer la velocidad del motor.",
      "El sistema debe determinar si la bomba funciona correctamente.",
      "La bomba debe coordinarse con el controlador principal.",
      "Se exige un mayor nivel de automatización y supervisión del funcionamiento.",
    ],
    closing:
      "En equipos de IVD, instrumentos analíticos y sistemas de automatización de laboratorio, por ejemplo, 5 hilos suele ser más apropiado cuando el circuito fluídico cambia la velocidad de la bomba entre etapas o cuando el controlador necesita recibir información del motor.",
  },
  diagramSectionTitle: "4. Lógica de conexión de 2 y 5 hilos",
  diagram: {
    ariaLabel: "Diagrama de control de motores sin escobillas de 2 y 5 hilos",
    twoWireTitle: "2 hilos",
    twoWireSubtitle: "Velocidad fija · Arranque y parada simples",
    fiveWireTitle: "5 hilos",
    fiveWireSubtitle: "Alimentación + control + realimentación",
    motor: "Motor sin escobillas",
    integratedDriver: "Driver integrado",
    controlInterface: "Interfaz de control",
    redPower: "Rojo · Positivo",
    blackGround: "Negro · Tierra",
    optional: "Opcional",
    typicalUse: "Uso típico",
    twoWireUses: [
      "Velocidad fija",
      "Arranque/parada por alimentación",
      "Sin regulación ni realimentación externa",
    ],
    fiveWireUses: [
      "Control de velocidad PWM",
      "Control de dirección DIR",
      "Realimentación FG",
      "Integración con el controlador",
    ],
    footer: "2/5 hilos indica el cableado y control, no el tipo con/sin escobillas",
    caption:
      "Figura 3 | Lógica de control de motores sin escobillas de 2 y 5 hilos. Los colores y las funciones siguen la especificación: VCC rojo, GND negro, PWM azul, DIR amarillo y FG verde. PWM, DIR y FG son funciones opcionales de control o realimentación. El orden exacto de pines, los parámetros eléctricos, la lógica de entrada/salida y la configuración final dependen de la especificación formal y de la confirmación del proyecto para el modelo elegido.",
  },
  comparison: {
    title: "5. Diferencias principales entre motores sin escobillas de 2 y 5 hilos",
    headers: ["Comparación", "Sin escobillas de 2 hilos", "Sin escobillas de 5 hilos"],
    rows: [
      ["Alimentación básica", "Compatible", "Compatible"],
      ["Arranque/parada", "Compatible", "Compatible"],
      ["Control PWM", "Normalmente no requiere control externo", "Puede admitirse"],
      ["Realimentación de velocidad", "Normalmente no disponible", "Puede admitir FG"],
      ["Control de dirección", "Normalmente sin control externo", "Puede admitirse"],
      ["Complejidad del cableado", "Baja", "Mayor"],
      ["Recursos de interfaz", "Pocos", "Más"],
      ["Aplicación adecuada", "Funcionamiento fijo", "Regulación, realimentación y automatización"],
    ],
    conclusion:
      "Por tanto, 2 o 5 hilos no indica un nivel de rendimiento superior o inferior, sino necesidades de control del sistema diferentes.",
  },
  selection: {
    title: "6. ¿Cuándo utilizar 2 hilos y cuándo 5 hilos?",
    intro: "La elección puede hacerse directamente a partir de las necesidades de control del equipo.",
    twoWireTitle: "Elegir 2 hilos",
    twoWireIntro: "Si la secuencia necesaria es:",
    twoWireLogicTitle: "Lógica típica de 2 hilos",
    twoWireLogic: "Conectar alimentación → transferir o vaciar el líquido → detener",
    twoWireClosing:
      "y durante todo el proceso no es necesario cambiar la velocidad ni leer el estado del motor, suele preferirse la configuración sin escobillas de 2 hilos.",
    fiveWireTitle: "Elegir 5 hilos",
    fiveWireIntro: "Si la secuencia necesaria es:",
    fiveWireLogicTitle: "Lógica típica de 5 hilos",
    fiveWireLogic:
      "El controlador cambia la velocidad según la etapa → recibe la realimentación → controla la bomba con mayor precisión",
    fiveWireClosing: "resulta más adecuada la configuración sin escobillas de 5 hilos.",
    decision:
      "La primera pregunta de selección no es si 2 o 5 hilos es mejor, sino si el controlador principal debe intervenir en la regulación de la bomba y en la supervisión de su estado.",
    fixedSpeedCaution:
      "Si el equipo solo necesita funcionar a velocidad fija, elegir 5 hilos no mejora automáticamente el resultado y, en cambio, aumenta la complejidad del mazo, las interfaces y el software de control.",
    futureControl:
      "Si más adelante se necesitarán regulación de velocidad, supervisión del funcionamiento o un control fluídico más preciso, elegir 5 hilos desde la fase inicial deja más margen al sistema de control.",
    confusionTitle: "Un concepto que suele confundirse",
    confusionText:
      "Con escobillas / sin escobillas describe el tipo de motor; 2 hilos / 5 hilos describe la salida de cables y el método de control. No son el mismo concepto. Dos hilos no significa motor con escobillas, ni cinco hilos es lo que convierte un motor en sin escobillas.",
  },
  products: {
    title: "¿Qué bombas de diafragma en miniatura FOREACH pueden usar 2 o 5 hilos?",
    intro:
      "Varias series de bombas de diafragma en miniatura FOREACH permiten confirmar la configuración de salida adecuada según el modelo concreto y las necesidades de control del proyecto, entre ellas:",
    cards: [
      {
        label: "Bomba de diafragma para líquidos",
        model: "DPL30",
        note: "Confirmar según el modelo y el proyecto",
        slug: "dpl30-liquid-diaphragm-pump",
      },
      {
        label: "Bomba de diafragma para líquidos",
        model: "DPL60",
        note: "Confirmar según el modelo y el proyecto",
        slug: "dpl60-liquid-diaphragm-pump",
      },
      {
        label: "Bomba de diafragma de alta presión",
        model: "DPL30H",
        note: "Confirmar según el modelo y el proyecto",
        slug: "dpl30h-liquid-diaphragm-pump",
      },
      {
        label: "Bomba de mezcla gas-líquido",
        model: "DPGL800",
        note: "Confirmar según el modelo y el proyecto",
        slug: "dpgl800-gas-liquid-diaphragm-pump",
      },
    ],
    paragraphs: [
      "Al seleccionar un modelo de estas series, además del caudal, la presión, la capacidad de autocebado, la tensión, el tipo de motor y los materiales en contacto con el fluido, debe confirmarse la salida de cables que necesita el sistema de control.",
      "Si el equipo solo requiere un arranque y parada simples, conviene evaluar primero 2 hilos. Si necesita regulación, realimentación o una automatización más compleja, debe confirmarse la opción de 5 hilos.",
      "La configuración final, el orden exacto de los hilos, la interfaz eléctrica y el método de control dependen de la especificación formal del modelo y de los documentos de confirmación del proyecto.",
    ],
  },
  faqTitle: "Preguntas frecuentes",
  faqItems: [
    {
      question:
        "1. ¿Cuál es la mayor diferencia entre una bomba de diafragma sin escobillas de 2 y de 5 hilos?",
      answer:
        "La principal diferencia son las funciones de control. Dos hilos se utiliza principalmente para la alimentación y el funcionamiento básicos; cinco hilos, además de la alimentación, puede ofrecer control de velocidad PWM, control de dirección y realimentación de velocidad FG.",
    },
    {
      question: "2. ¿Un motor sin escobillas de 2 hilos es en realidad un motor con escobillas?",
      answer:
        "No. Con escobillas / sin escobillas describe el tipo de motor, mientras que 2 hilos / 5 hilos describe la salida de cables y el método de control. Un motor sin escobillas puede utilizar distintas configuraciones según el diseño de control.",
    },
    {
      question:
        "3. ¿Una bomba de diafragma sin escobillas de 5 hilos siempre es mejor que una de 2 hilos?",
      answer:
        "No. Si el equipo solo necesita una velocidad fija, 2 hilos suele ser más sencillo y fácil de integrar. Las ventajas de 5 hilos son relevantes cuando se necesita regulación, realimentación o integración con el controlador principal.",
    },
    {
      question: "4. ¿Cuándo se necesita control de velocidad PWM?",
      answer:
        "Puede considerarse PWM cuando las distintas etapas requieren velocidades diferentes, por ejemplo aspiración rápida, vaciado a baja velocidad o cambios de ritmo del circuito fluídico.",
    },
    {
      question: "5. ¿Para qué sirve la realimentación FG?",
      answer:
        "FG suele proporcionar información sobre el funcionamiento o la velocidad del motor. El controlador puede utilizar la señal para saber si el motor está en marcha o combinarla con el programa de control para supervisar su estado.",
    },
    {
      question:
        "6. ¿DPL30, DPL60, DPL30H y DPGL800 pueden utilizar configuraciones de 2 y 5 hilos?",
      answer:
        "La configuración correspondiente puede seleccionarse según el modelo concreto y las necesidades de control del proyecto. En proyectos DPL30, DPL60, DPL30H y DPGL800, el requisito de 2 o 5 hilos se confirma durante la selección. La configuración final y las definiciones exactas de conexión dependen de la especificación aplicable y de la confirmación del proyecto.",
    },
  ],
  cta: {
    title: "¿Necesita confirmar 2 o 5 hilos?",
    description:
      "Para un proyecto DPL30, DPL60, DPL30H o DPGL800, indique la tensión de alimentación, el caudal objetivo, la presión de trabajo y si necesita control PWM, control DIR o realimentación FG para poder confirmar la configuración adecuada.",
    contactLabel: "Contactar con un ingeniero",
    productsLabel: "Ver el centro de productos",
  },
  sourceNote:
    "Nota: Los diagramas de 2 y 5 hilos de este artículo explican relaciones funcionales y no constituyen instrucciones finales de cableado. Los colores, el orden de los hilos, los parámetros de entrada/salida y la lógica de control pueden variar según el modelo. Debe seguirse la especificación formal o el documento de confirmación del proyecto correspondiente.",
} satisfies BrushlessWiringArticleCopy;
