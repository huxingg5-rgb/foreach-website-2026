import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const PRESSURE_TERMS_ASSET_BASE =
  "/images/resources/technical-articles/diaphragm-pump-pressure-rating-terms";
const PRESSURE_LEVEL_SELECTION_ASSET_BASE =
  "/images/resources/technical-articles/100-kpa-vs-600-kpa-diaphragm-pump-selection";
const HIGH_BACKPRESSURE_BUDGET_ASSET_BASE =
  "/images/resources/technical-articles/high-backpressure-fluid-path-pressure-budget";

export const diaphragmPumpPressureRatingTermsEsCopy = {
  metadata: {
    title:
      "¿En qué se diferencian la presión nominal de trabajo, la presión máxima de salida, la presión de prueba y la presión de rotura de una microbomba de diafragma?",
    seoTitle:
      "Presión nominal, máxima, de prueba y de rotura de una microbomba de diafragma | FOREACH",
    seoDescription:
      "La presión nominal de trabajo, la presión máxima de salida, la presión de prueba y la presión de rotura describen límites distintos. Esta guía ofrece una tabla terminológica, una lista de datos que deben confirmarse y un método para revisar la especificación.",
    coverImage: PRESSURE_TERMS_ASSET_BASE + "/article-cover.webp",
    coverAlt: "Microbomba de diafragma FOREACH y banco de ensayo de presión en un vídeo oficial de Douyin",
  },
  deck: "Un valor de presión solo tiene significado técnico cuando se acompaña de su definición, fluido de ensayo, condición de entrada, caudal, duración y criterio de aceptación. La presión nominal puede delimitar el funcionamiento permitido; la presión máxima de salida, la presión de prueba y la presión de rotura no son por sí mismas puntos de trabajo continuo.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Rated Pressure, Max. Pressure, Output Pressure, Proof Pressure, Pressure Test y Burst Pressure aparecen con frecuencia en las fichas de microbombas de diafragma. En chino pueden agruparse de forma imprecisa como «presión», «presión máxima» o «resistencia a la presión», lo que facilita comparar en una misma columna datos que describen límites distintos.",
    },
    {
      type: "paragraph",
      text: "Para decidir si un parámetro de presión sirve para seleccionar un modelo no basta con mirar su valor. Deben confirmarse, como mínimo, el fluido de ensayo, la temperatura, la presión de entrada, el caudal correspondiente, la duración, el régimen de servicio y el criterio de aceptación. Aunque varias fichas indiquen 600 kPa, no describen la misma prestación si esas condiciones difieren.",
    },
    {
      type: "notice",
      label: "Conclusión del proyecto:",
      text: "La presión de trabajo nominal, la presión máxima de salida, la presión de prueba y la presión de rotura son límites diferentes. Sin una especificación controlada y una definición del ensayo, los datos de prueba o de rotura no deben reescribirse como presiones admisibles para funcionamiento continuo.",
    },
  ],
  sections: [
    {
      title: "1. ¿Por qué un mismo valor de 600 kPa puede describir límites completamente distintos?",
      blocks: [
        {
          type: "paragraph",
          text: "La presión de trabajo real indica la diferencia de presión que la bomba debe vencer durante el funcionamiento del equipo. La presión de trabajo nominal define el intervalo permitido o especificado por la documentación controlada bajo condiciones concretas. La presión máxima de salida suele describir un extremo de la curva de prestaciones; la presión de prueba y la presión de rotura verifican, respectivamente, un límite estructural y un límite de fallo. Cada término responde a una pregunta distinta.",
        },
        {
          type: "figure",
          src: PRESSURE_TERMS_ASSET_BASE + "/article-figure-en.webp",
          alt: "Cinco tarjetas explican la presión de trabajo real, la presión nominal, la presión máxima de salida, la presión de prueba y la presión de rotura de una microbomba de diafragma",
          width: 2560,
          height: 2040,
          caption:
            "Figura 5. Los términos de presión habituales de una microbomba de diafragma no deben compararse como si representaran el mismo límite.",
        },
      ],
    },
    {
      title: "2. ¿Qué preguntas responden los cinco términos comunes?",
      blocks: [
        {
          type: "table",
          headers: [
            "Término",
            "Significado técnico",
            "¿Puede usarse directamente como punto continuo?",
            "Qué debe confirmarse",
          ],
          rows: [
            [
              "Presión de trabajo real",
              "Diferencia de presión real entre la entrada y la salida de la bomba durante el funcionamiento",
              "Es un dato operativo que debe verificarse",
              "Condiciones de entrada, caudal y carácter estacionario o transitorio",
            ],
            [
              "Presión de trabajo nominal",
              "Intervalo de presión de trabajo permitido o especificado por la documentación controlada bajo condiciones concretas",
              "Puede utilizarse como límite si se respetan sus condiciones de aplicación",
              "Fluido, temperatura, régimen de servicio y curva caudal-presión",
            ],
            [
              "Presión máxima de salida",
              "Extremo o intervalo de presión que la bomba puede alcanzar o garantizar",
              "Por lo general, no puede considerarse por sí sola un punto de funcionamiento continuo",
              "Qué caudal queda en ese punto y durante cuánto tiempo puede mantenerse",
            ],
            [
              "Presión de prueba o de comprobación",
              "Presión aplicada a una estructura o un cierre con un fluido, una duración y unos criterios definidos",
              "No",
              "Fluido de ensayo, duración y criterios de fuga o deformación",
            ],
            [
              "Presión de estallido",
              "Límite en el que la muestra presenta daño permanente o fallo funcional",
              "Nunca",
              "Estado de la muestra, velocidad de presurización y criterio de fallo",
            ],
          ],
        },
        {
          type: "notice",
          label: "Límite de la documentación controlada:",
          text: "Las páginas públicas sirven para una preselección y para formular preguntas; las entradas finales de diseño deben proceder de una versión vigente de la especificación controlada. Si ésta no publica la presión de prueba o de rotura, esos datos no deben inferirse a partir del material, la estructura o parámetros parecidos.",
        },
      ],
    },
    {
      title: "3. ¿Por qué un único valor de presión no representa por sí solo la capacidad de funcionamiento?",
      blocks: [
        {
          type: "paragraph",
          text: "En la bomba de diafragma para líquidos de alta presión FOREACH DPL30H, la información del sitio indica una «presión nominal de 600 kPa». Ese valor debe interpretarse junto con el caudal correspondiente, el fluido, las condiciones de entrada, la temperatura, el régimen de servicio y la curva caudal-presión completa. No puede extrapolarse automáticamente como presión de prueba, presión de rotura o capacidad de transporte continuo en cualquier condición.",
        },
        {
          type: "paragraph",
          text: "Cuando una ficha emplee Rated Pressure, Max. Pressure, Output Pressure, Pressure Test o Burst Pressure, confirme primero la definición del campo y después las condiciones de ensayo y el criterio de aceptación. Un mismo valor tras convertir las unidades no implica un mismo límite técnico.",
        },
        {
          type: "table",
          headers: ["Campo de la ficha", "Información mínima confirmable", "Lo que no puede inferirse directamente"],
          rows: [
            [
              "Rated Pressure / presión de trabajo nominal",
              "La documentación controlada define el límite de trabajo bajo condiciones especificadas",
              "Que a esa presión se mantenga el caudal sin carga o que sea válida para todos los fluidos",
            ],
            [
              "Max. Pressure / Output Pressure",
              "La ficha proporciona un extremo o un intervalo de presión de salida",
              "Que ese valor sea una presión admisible para funcionamiento continuo prolongado",
            ],
            [
              "Pressure Test / Proof Pressure",
              "La estructura o el cierre se han verificado a presión bajo condiciones especificadas",
              "Que la presión de prueba sea la presión de trabajo nominal o la presión de rotura",
            ],
            [
              "Burst Pressure / presión de rotura",
              "Límite de daño permanente o fallo funcional de la muestra",
              "Que pueda aumentarse por ello la presión de trabajo admisible del sistema",
            ],
          ],
        },
      ],
    },
    {
      title: "4. Al comprobar los parámetros de presión, haga al menos nueve preguntas.",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "La definición formal del término en una especificación controlada.",
            "Si el medio de prueba es agua, gas u otro líquido.",
            "La temperatura del fluido y la temperatura ambiente.",
            "Si la entrada de la bomba está a presión atmosférica, negativa o positiva.",
            "El caudal correspondiente a esta presión y si existe una curva caudal-presión completa.",
            "Si la prueba es de estado estacionario o transitoria y cuánto dura.",
            "Si el régimen de servicio es continuo, intermitente o sólo admite una acumulación de presión breve.",
            "Si el criterio de aceptación exige mantener el transporte, no presentar fugas ni deformación, o simplemente no romperse.",
            "Si el número de muestras, el suministro de energía, las tuberías y los métodos de conexión son consistentes con las condiciones del proyecto.",
          ],
        },
      ],
    },
    {
      title: "5. Cómo evitar un mal uso cuando las especificaciones no están escritas claramente",
      blocks: [
        {
          type: "paragraph",
          text: "Si la página pública sólo muestra un valor de presión, márquelo primero como «parámetro pendiente de confirmar» y no lo clasifique por cuenta propia como presión nominal, de prueba o de rotura. La tabla del proyecto debe conservar el texto original de la especificación controlada y añadir campos como «definición del término», «caudal correspondiente», «duración», «régimen de servicio» y «criterio de aceptación».",
        },
        {
          type: "paragraph",
          text: "Este principio también se aplica estrictamente al contenido de FOREACH: si la especificación controlada publica una presión nominal, debe describirse como tal; los datos no publicados de presión de prueba o de rotura no deben deducirse de la estructura, el material ni de parámetros parecidos. Un artículo web puede explicar el método de selección, pero no sustituye la documentación de liberación del producto.",
        },
      ],
    },
    {
      title: "Datos del sitio FOREACH y límites de evidencia",
      blocks: [
        {
          type: "links",
          items: [
            {
              label: "FOREACH: Guía de selección de bomba de diafragma para líquidos de alta presión DPL30H",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
            },
          ],
        },
        {
          type: "notice",
          label: "Límites de la evidencia:",
          text: "La información pública del sitio se utiliza para explicar el significado de los parámetros de presión y el método de selección. Las fórmulas y los ejemplos sirven únicamente para una evaluación técnica preliminar y no sustituyen las especificaciones controladas, la evaluación con el fluido real ni la validación del prototipo completo.",
        },
      ],
    },
  ],
  faqTitle: "Preguntas frecuentes | ¿Cómo distinguir entre términos de presión de bombas de diafragma?",
  faqItems: [
    {
      question: "¿La presión máxima de salida es la presión cuando la bomba está bloqueada?",
      answer:
        "Algunas fichas pueden definir el extremo de la curva de prestaciones cerca de caudal cero, pero no puede generalizarse. Deben comprobarse la especificación controlada del modelo, su curva caudal-presión y el método de ensayo.",
    },
    {
      question: "Si la resistencia a la presión es mayor que la presión nominal, ¿significa que la presión de trabajo se puede aumentar a largo plazo?",
      answer:
        "No. La resistencia a la presión o las pruebas de presión generalmente tienen medios, duración y criterios de calificación específicos. Solo verifica la estructura correspondiente o el límite de sellado y no representa el rendimiento operativo ni la vida útil a largo plazo.",
    },
    {
      question: "¿Cuanto mayor sea la presión de rotura, mejor será la bomba?",
      answer:
        "No puedes juzgar así. La presión de estallido pertenece al límite del daño; La selección real presta más atención a la presión de trabajo permitida en el caudal objetivo, la compatibilidad del medio, la vida útil y el límite de seguridad de todo el recorrido del líquido.",
    },
    {
      question: "¿Son exactamente iguales 6 bar y 600 kPa?",
      answer:
        "La conversión de unidades es equivalente: 1 bar = 100 kPa. Sin embargo, la terminología, las condiciones de ensayo y el régimen de funcionamiento pueden diferir entre páginas; una unidad equivalente no implica el mismo alcance de prestaciones.",
    },
    {
      question: "¿Cómo registrar el campo de presión en la tabla de parámetros del proyecto?",
      answer:
        "Conserve el texto original y el modelo completo de la especificación controlada, y añada campos normalizados: presión de trabajo nominal, presión máxima de salida, presión de prueba, presión de rotura, caudal a la presión objetivo, fluido, temperatura, condiciones de entrada, duración, régimen de servicio y criterio de aceptación.",
    },
  ],
  cta: {
    title: "¿Necesita comprobar los parámetros de presión de su microbomba de diafragma?",
    description:
      "Puede enviar el caudal objetivo, las presiones de entrada y salida, el fluido y su temperatura, el régimen de servicio y el circuito completo. El ingeniero comprobará los puntos de funcionamiento candidatos con las especificaciones y curvas controladas.",
    contactLabel: "contacta a un ingeniero",
    productsLabel: "Ver productos de bombas de diafragma",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const diaphragmPump100KpaVs600KpaSelectionEsCopy = {
  metadata: {
    title: "¿Bastan 100 kPa? Cómo decidir si el circuito necesita una microbomba de diafragma de 600 kPa",
    seoTitle: "Microbomba de 100 o 600 kPa: selección mediante presupuesto de presión | FOREACH",
    seoDescription:
      "El nombre de la aplicación no basta para decidir si 100 kPa son suficientes. La selección entre plataformas de 100 y 600 kPa debe considerar caudal objetivo, tuberías, válvulas, filtros, agujas, presión terminal y curva de la bomba.",
    coverImage: PRESSURE_LEVEL_SELECTION_ASSET_BASE + "/article-cover.webp",
    coverAlt: "Microbomba de diafragma FOREACH y ensayo de presión del circuito en un vídeo oficial de Douyin",
  },
  deck: "100 y 600 kPa no equivalen a una versión normal y otra simplemente mejorada. Primero debe calcularse el presupuesto de presión de todo el circuito al caudal objetivo y después leerse la curva de la bomba candidata. Una plataforma de mayor presión solo aporta valor cuando el circuito presenta una contrapresión real que la justifica.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "La presión nominal de una bomba no puede determinarse mediante nombres de aplicaciones como \"limpieza\", \"muestreo\" y \"entrega con aguja\". La misma aplicación puede caer en rangos de trabajo completamente diferentes debido a diferentes caudales, diámetros de tubería, condiciones del filtro, tamaños de aguja o presiones de la cámara final.",
    },
    {
      type: "paragraph",
      text: "El punto de partida para la selección debe ser el caudal objetivo Q objetivo y la diferencia de presión en estado estacionario más desfavorable entre la entrada y la salida de la bomba a ese caudal. Los transitorios como el arranque y la conmutación de válvulas deben verificarse individualmente como límites de protección, en lugar de utilizar una vaga \"contrapresión del sistema\" para reemplazar la condición operativa completa.",
    },
    {
      type: "notice",
      label: "Conclusión del proyecto:",
      text: "Primero calcule o mida el requisito de presión hidráulica bajo el caudal objetivo y luego lea el caudal correspondiente en la curva de la bomba. La presión nominal es solo un límite y no puede probar que la bomba mantendrá el caudal sin carga en este punto final de presión.",
    },
  ],
  sections: [
    {
      title: "1. Para determinar el nivel de presión, primero se debe indicar el caudal objetivo.",
      blocks: [
        {
          type: "paragraph",
          text: "La caída de presión hidráulica cambia con el caudal. La misma tubería tiene diferentes requisitos de presión a 100 mL/min y 300 mL/min; La misma aguja también cambiará la caída de presión después de que cambie la viscosidad del medio. Por lo tanto, \"este equipo requiere aproximadamente 100 kPa\" no es una condición de selección completa si no existe un caudal correspondiente.",
        },
        {
          type: "formula",
          expression:
            "ΔPrequired(Qtarget) = Pout(Qtarget) − Pin(Qtarget)",
          note: "El presupuesto de presión debe corresponder al caudal objetivo. La presión más adversa en estado estacionario y los límites transitorios, como el arranque, el cambio de válvula o el bloqueo, deben registrarse por separado.",
        },
        {
          type: "figure",
          src: PRESSURE_LEVEL_SELECTION_ASSET_BASE + "/article-figure-en.webp",
          alt: "Determine el caudal objetivo, enumere las pérdidas de la línea de líquido y lea el proceso de toma de decisiones sobre el nivel de presión de la curva de la bomba.",
          width: 2560,
          height: 2160,
          caption:
            "Figura 6 Para determinar si 100 kPa es suficiente, comience con el requisito de presión total al caudal objetivo.",
        },
      ],
    },
    {
      title: "2. Enumere todos los elementos de consumo de presión.",
      blocks: [
        {
          type: "table",
          headers: ["término de presión", "Fuentes típicas", "¿Por qué no se puede omitir?"],
          rows: [
            [
              "pérdida del lado de succión",
              "Tubo de succión, válvula de entrada, filtro, nivel de líquido bajo",
              "Afecta la presión absoluta de entrada y el reabastecimiento de fluido de la cámara de la bomba.",
            ],
            [
              "Pérdida en tubería recta del lado de descarga",
              "Tubos finos, tubos largos, mayor viscosidad.",
              "Aumenta a medida que aumenta el caudal objetivo",
            ],
            [
              "pérdida local",
              "Accesorios, codos, válvulas, celdas de flujo.",
              "El diámetro interno puede convertirse en el punto más estrecho.",
            ],
            [
              "Caída de presión del filtro",
              "Nuevas piezas llegando al final de su vida útil",
              "Puede aumentar significativamente a largo plazo",
            ],
            [
              "resistencia terminal",
              "Aguja, boquilla, cámara de presión positiva.",
              "A menudo se convierten en la principal fuente de contrapresión alta.",
            ],
            [
              "presión estática y transitoria",
              "Diferencia de altura, conmutación de válvulas, bloqueo, arranque y parada.",
              "La presión estática entra en el presupuesto de estado estacionario; Los transitorios se utilizan para comprobar los límites de protección.",
            ],
          ],
        },
      ],
    },
    {
      title: "3. ¿Qué circuitos de líquido tienen más probabilidades de caer en el rango de presión más bajo?",
      blocks: [
        {
          type: "paragraph",
          text: "Las siguientes características generalmente significan un requisito de presión relativamente baja, pero aún requieren cálculos y pruebas: líneas cortas, diámetros internos grandes, menos válvulas, salidas abiertas, baja viscosidad del medio, sin filtros de alta resistencia o agujas finas, y el nivel del depósito no crea una presión negativa de succión significativa.",
        },
        {
          type: "paragraph",
          text: "Las presiones nominales públicas de las bombas de diafragma para líquidos ordinarias FOREACH DPL30 y DPL60 son ambas de 100 kPa, y los niveles de caudal sin carga correspondientes son de 300 mL/min y 600 mL/min respectivamente. Para lo que son adecuados no es un nombre industrial fijo, sino un recorrido de líquido cuyo punto de operación objetivo puede caer dentro de la curva controlada y el rango de condiciones de operación permitidas.",
        },
      ],
    },
    {
      title: "4. ¿Qué estructuras tienen más probabilidades de entrar en el rango de contrapresión alta?",
      blocks: [
        {
          type: "list",
          items: [
            "Agujas finas, capilares, microboquillas o celdas de flujo estrecho.",
            "Tubería dura de larga distancia y diámetro interior pequeño o reducción repentina del diámetro en varias etapas.",
            "Filtros de alta precisión, especialmente cuando la caída de presión aumenta al final de su vida.",
            "Entregar líquido a una cavidad que ya tiene presión positiva.",
            "Se requiere un lavado rápido o una pulverización a alta velocidad en poco tiempo.",
            "Se conectan en serie varias válvulas, juntas y sensores y se acumulan pérdidas locales.",
          ],
        },
        {
          type: "paragraph",
          text: "La bomba de diafragma para líquidos de alta presión FOREACH DPL30H publica un caudal sin carga de 300 mL/min y una presión nominal de 600 kPa. Esos dos valores no pertenecen al mismo punto de funcionamiento; para saber qué caudal queda a una contrapresión elevada debe consultarse una versión vigente de la curva caudal-presión.",
        },
      ],
    },
    {
      title: "5. Tres escenarios ilustrativos: por qué no basta con mirar la presión total estimada",
      blocks: [
        {
          type: "table",
          headers: [
            "Escenarios ilustrativos (no proceden de casos de clientes)",
            "Caudal objetivo",
            "Demanda de presión en estado estacionario menos adversa",
            "sentencia preliminar",
          ],
          rows: [
            [
              "Tubería corta, salida abierta, pocas válvulas.",
              "180 mL/min",
              "Alrededor de 40 kPa",
              "Puede haber margen para la meseta de presión más baja, continúe leyendo la curva",
            ],
            [
              "Aguja fina, filtro, cámara de presión positiva.",
              "250 mL/min",
              "Aproximadamente 95 kPa",
              "Cerca del límite de 100 kPa, no podemos simplemente mirar el valor nominal",
            ],
            [
              "Aguja fina, tubo largo, extremo de alta presión.",
              "220 mL/min",
              "Aproximadamente 180 kPa",
              "Una plataforma común de 100 kPa generalmente no debería ser una candidata directa.",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Los 95 kPa en la ilustración no significan que \"una bomba de 100 kPa definitivamente servirá\". Si 100 kPa es la presión nominal de la bomba candidata, el punto objetivo está cerca del límite y también se deben verificar el caudal, la carga del filtro, la temperatura del medio, la dispersión de la muestra y el margen de diseño en este punto; Los picos de arranque o conmutación de válvulas ingresan a una verificación de protección transitoria independiente.",
        },
      ],
    },
    {
      title: "6. Las bombas de alta presión no son automáticamente mejores que las de baja presión",
      blocks: [
        {
          type: "paragraph",
          text: "Si el circuito de líquido no requiere una contrapresión alta, la selección directa de una plataforma de 600 kPa puede aumentar las limitaciones en los métodos de conexión, los límites de material y temperatura, el suministro de energía, la estrategia de control, el espacio de instalación y el costo. Tomando como ejemplo la información pública de FOREACH, la altura autocebante del DPL30 es 6 mH₂O, el límite superior de temperatura media es +80 ℃; la altura autocebante del DPL30H es 3 mH₂O, el límite superior de temperatura media es +40 ℃ y utiliza una conexión de casquillo de tubo duro de 6×4 mm.",
        },
        {
          type: "paragraph",
          text: "Por tanto, una presión mayor no es una mejora universal, sino otro conjunto de límites para circuitos de alta resistencia. Una plataforma de alta presión sólo es una opción eficaz cuando coinciden el punto de funcionamiento objetivo, el fluido, las condiciones de entrada y el régimen de servicio.",
        },
      ],
    },
    {
      title: "7. Cuatro condiciones antes de la liberación final",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Se han calculado o medido los requisitos de presión normales en estado estacionario y en el peor de los casos en estado estacionario al caudal objetivo.",
            "La curva de la bomba controlada muestra que las condiciones operativas de estado estable más adversas aún cumplen con el caudal objetivo y mantienen los márgenes de presión y flujo definidos por el proyecto.",
            "Se han comprobado las presiones de trabajo admisibles de tuberías, juntas, válvulas, filtros, sensores y cámaras; Los datos de presión de prueba o resistencia a la presión no reemplazan la presión de trabajo permitida.",
            "Se ha verificado el equipo completo en cuanto a arranque, estado estable, conmutación de válvulas, protección de bloqueo, fugas y operación a largo plazo.",
          ],
        },
        {
          type: "notice",
          label: "Límites del sistema:",
          text: "La presión de trabajo mínima permitida de todo el circuito hidráulico está determinada por la presión de trabajo más baja permitida de todos los componentes que soportan presión. La clasificación de presión de una bomba no sustituye la calificación de presión de funcionamiento de mangueras, accesorios, válvulas, filtros, sensores o cámaras.",
        },
      ],
    },
    {
      title: "Datos del sitio FOREACH y límites de evidencia",
      blocks: [
        {
          type: "links",
          items: [
            {
              label: "FOREACH: Guía de selección de bomba de diafragma para líquidos de alta presión DPL30H",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
            },
            {
              label: "FOREACH: Guía de selección de bombas de diafragma para líquidos DPL30",
              href: "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide",
            },
            {
              label: "FOREACH: Guía de selección de bomba de diafragma para líquidos DPL60",
              href: "/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide",
            },
          ],
        },
        {
          type: "notice",
          label: "Límites de la evidencia:",
          text: "La información, las fórmulas y los ejemplos del sitio sirven únicamente para una evaluación técnica preliminar. No sustituyen las especificaciones controladas, las curvas completas, la evaluación con el fluido real ni la validación del prototipo completo.",
        },
      ],
    },
  ],
  faqTitle: "Preguntas frecuentes | ¿Cómo elegir entre microbombas de diafragma de 100 kPa y 600 kPa?",
  faqItems: [
    {
      question: "El sistema estima una contrapresión de 80 kPa. ¿Es suficiente una bomba de 100 kPa?",
      answer:
        "No se puede juzgar basándose sólo en dos números. Se debe confirmar el caudal objetivo correspondiente a 80 kPa y si es el estado estacionario más desfavorable, y el caudal y el margen en este punto se deben leer en la curva de la bomba controlada.",
    },
    {
      question: "¿Se pueden solucionar todas las deficiencias de flujo utilizando una bomba de 600 kPa?",
      answer:
        "No. Si el problema procede de una entrada de aire en aspiración, una válvula defectuosa, alimentación insuficiente, viscosidad elevada o reposición insuficiente en la entrada, una plataforma de alta presión puede no resolverlo y además introducir nuevas restricciones en el sistema.",
    },
    {
      question: "¿Una aguja fina requiere necesariamente 600 kPa?",
      answer:
        "No necesariamente. Los requisitos de presión dependen del diámetro interno de la aguja, la longitud efectiva, el caudal objetivo, la viscosidad del medio y la presión terminal y deben juzgarse utilizando los datos de caída de presión del proveedor, cálculos o mediciones reales.",
    },
    {
      question: "¿Por qué una bomba de 100 kPa aún no puede suministrar un caudal sin carga a 100 kPa?",
      answer:
        "El caudal sin carga y la presión nominal suelen ser puntos finales de rendimiento diferentes. A medida que aumenta la diferencia de presión a través de la bomba, el caudal generalmente disminuye y el caudal correspondiente a la presión objetivo debe leerse en la curva.",
    },
    {
      question: "¿Por qué debemos comprobar la presión mínima de trabajo permitida de todo el circuito hidráulico?",
      answer:
        "La presión de trabajo permitida del sistema está determinada por la presión de trabajo más baja permitida de todos los componentes que soportan presión. La presión de prueba o presión de prueba se utiliza para diferentes propósitos de verificación y no puede reemplazar la presión de trabajo permitida de mangueras, accesorios, válvulas, filtros y cámaras.",
    },
  ],
  cta: {
    title: "¿Necesita juzgar si el circuito de líquido es adecuado para una plataforma de 100 kPa o 600 kPa?",
    description:
      "Puede enviar el fluido, el caudal objetivo, las condiciones de entrada, las tuberías, las válvulas, los filtros, las agujas, la presión en el extremo y el régimen de servicio. El ingeniero ayudará a verificar el presupuesto de presión y las curvas de las bombas candidatas.",
    contactLabel: "Enviar condiciones de funcionamiento",
    productsLabel: "Ver productos de bombas de diafragma",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const highBackpressureFluidPathPressureBudgetEsCopy = {
  metadata: {
    title: "¿Cómo elaborar el presupuesto de presión de un circuito con alta contrapresión? Ejemplo de selección FOREACH de 600 kPa",
    seoTitle: "Presupuesto de presión para circuitos de alta contrapresión y bombas de 600 kPa | FOREACH",
    seoDescription:
      "Antes de seleccionar una bomba para un circuito de alta contrapresión deben presupuestarse por separado las pérdidas de aspiración, descarga, válvulas, filtros, agujas, cámara terminal y altura estática; el margen y la protección frente a transitorios se verifican aparte.",
    coverImage: HIGH_BACKPRESSURE_BUDGET_ASSET_BASE + "/article-cover.webp",
    coverAlt: "Ensayo de un circuito con contrapresión mediante una microbomba FOREACH en un vídeo oficial de Douyin",
  },
  deck: "En un circuito de alta contrapresión no basta con indicar al proveedor que se necesitan 6 bar. Cada pérdida estable debe calcularse al caudal objetivo, separando el estado normal, el peor estado estable, el margen de presión y los límites de protección transitoria, para contrastarlos después con la curva controlada de la bomba candidata.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Una línea de líquido de alta contrapresión generalmente consta de una botella de almacenamiento de líquido, un tubo de succión, una bomba, una válvula, un conector, un filtro, una aguja o boquilla y una cavidad final. Cada componente tiene el potencial de consumir presión diferencial; la bomba debe superar estas pérdidas en estado estacionario al caudal objetivo para completar la tarea de entrega.",
    },
    {
      type: "paragraph",
      text: "El presupuesto de presión no debe combinar las condiciones de funcionamiento normales, las peores condiciones de funcionamiento, los márgenes de diseño y los picos de conmutación o obstrucción de válvulas en un solo número. Los dos primeros se utilizan para determinar el punto de funcionamiento, los márgenes se utilizan para determinar la tolerancia de un candidato a las desviaciones y los transitorios se utilizan para definir los límites de detección, apagado, alivio de presión y protección de componentes.",
    },
    {
      type: "notice",
      label: "Conclusión del proyecto:",
      text: "El estado estable normal, el estado estable en el peor de los casos, el margen de presión y la protección transitoria deben registrarse por separado. Los picos transitorios no son puntos de funcionamiento continuo y no deben agregarse mecánicamente al presupuesto de estado estable como una caída de presión.",
    },
  ],
  sections: [
    {
      title: "1. El punto de partida del balance de presión no es la bomba, sino el recorrido completo del líquido.",
      blocks: [
        {
          type: "formula",
          expression:
            "ΔPsteady(Qtarget) = Pout,steady(Qtarget) − Pin,steady(Qtarget)",
          note: "Primero unifique la presión manométrica, la presión absoluta y la dirección de la señal, y luego calcule las presiones de entrada y salida bajo el mismo caudal objetivo.",
        },
        {
          type: "paragraph",
          text: "Si es necesario dividirlo por componente, el presupuesto en estado estacionario puede estar compuesto por la pérdida en estado estacionario en el lado de succión, la pérdida en estado estacionario de la tubería de descarga, la pérdida local de la válvula y la junta, la caída de presión del filtro, la caída de presión de la aguja o boquilla, la presión de la cámara terminal y la diferencia de presión estática. Sólo los datos que pertenecen al mismo estado, al mismo caudal objetivo y con el mismo signo pueden ingresar al mismo presupuesto de estado estacionario.",
        },
        {
          type: "figure",
          src: HIGH_BACKPRESSURE_BUDGET_ASSET_BASE + "/article-figure-en.webp",
          alt: "El diagrama de dos carriles muestra el presupuesto de presión continua y el límite de protección de presión transitoria del circuito hidráulico de alta contrapresión, respectivamente.",
          width: 2560,
          height: 2360,
          caption:
            "Figura 7 Presupuesto de presión hidráulica de alta contrapresión: desmonte la pérdida de estado estacionario de cada sección y luego compruébelo con la curva de la bomba; el valor pico transitorio ingresa al diseño de protección por separado.",
        },
      ],
    },
    {
      title: "2. Para un circuito de alta contrapresión, facilite al menos doce categorías de datos",
      blocks: [
        {
          type: "table",
          headers: ["Proyecto", "Datos requeridos", "fuente de datos"],
          rows: [
            [
              "medio",
              "Nombre, concentración, temperatura, viscosidad, si contiene partículas o burbujas.",
              "Condiciones de fórmula y proceso.",
            ],
            [
              "Caudal objetivo",
              "Desviación mínima, nominal, máxima y permitida",
              "Golpe del equipo",
            ],
            [
              "Condiciones de almacenamiento",
              "Rango de nivel de líquido, presión del recipiente, si se seca la succión por primera vez",
              "Disposición del equipo",
            ],
            [
              "tubo de succión",
              "Diámetro interior, longitud, materiales, codos y uniones.",
              "Dibujos u objetos",
            ],
            [
              "tubo de descarga",
              "Diámetro interior, longitud, materiales, codos y uniones.",
              "Dibujos u objetos",
            ],
            ["Piezas de válvula", "Modelo completo, diámetro, Cv o curva de caída de presión.", "Información del proveedor"],
            [
              "filtrar",
              "Modelo completo, caída de presión de pieza nueva, caída de presión al final de su vida útil",
              "Información del proveedor o medición real.",
            ],
            [
              "Aguja o boquilla",
              "Modelo completo, diámetro, longitud, datos de caída de presión de flujo.",
              "Información del proveedor o medición real.",
            ],
            ["cavidad terminal", "Rango de presión normal, presión negativa o presión positiva", "definición del sistema"],
            [
              "Régimen de servicio",
              "Continuo o intermitente, frecuencia de inicio y parada, duración única",
              "ritmo del programa",
            ],
            [
              "Transitorios y anomalías",
              "Conmutación de válvulas, bloqueo, valores máximos de arranque y parada, duración y acciones de protección.",
              "Pruebas dinámicas",
            ],
            [
              "Alimentación y control",
              "Rango de voltaje, PWM, límite de corriente, retroalimentación",
              "diseño electrico",
            ],
          ],
        },
      ],
    },
    {
      title: "3. Los cuatro límites deben establecerse por separado",
      blocks: [
        {
          type: "subheading",
          title: "1. Punto de funcionamiento normal en estado estable",
        },
        {
          type: "formula",
          expression:
            "ΔPnormal,steady(Qtarget) = Pout,normal-steady(Qtarget) − Pin,normal-steady(Qtarget)",
          note: "Se utilizan niveles de líquido típicos, filtros nuevos, voltaje nominal y medios de temperatura normal para confirmar los puntos de operación diarios y los rangos de control.",
        },
        {
          type: "subheading",
          title: "2. El punto de funcionamiento en estado estacionario más desfavorable",
        },
        {
          type: "formula",
          expression:
            "ΔPworst,steady(Qtarget) = Pout,worst-steady(Qtarget) − Pin,worst-steady(Qtarget)",
          note: "El nivel mínimo de fluido, el final de la vida útil del filtro, la viscosidad del medio o los límites de temperatura y la presión final máxima sostenible se utilizan para identificar los requisitos más adversos de la línea de fluido.",
        },
        {
          type: "subheading",
          title: "3. Margen de presión",
        },
        {
          type: "formula",
          expression:
            "Mpressure(Qtarget) = ΔPcandidate-allowed(Qtarget) − ΔPworst,steady(Qtarget)",
          note: "Los límites de las bombas candidatas deben derivarse de curvas controladas o especificaciones para el mismo medio, temperatura, condiciones de entrada, suministro de energía mínimo permitido y ciclo de trabajo; Los márgenes aceptables deben ser definidos individualmente por el proyecto.",
        },
        {
          type: "subheading",
          title: "4. Protección transitoria y anormal",
        },
        {
          type: "paragraph",
          text: "Para los picos causados por la conmutación, el arranque y la parada de la válvula, el bloqueo de terminales, el mal funcionamiento de la válvula o el bloqueo de la tubería, se debe registrar la presión máxima, la duración, la ubicación de ocurrencia y las condiciones de activación, y se deben verificar el rango del sensor de presión, el umbral de apagado, la ruta de alivio de presión y los límites transitorios permitidos de cada componente, respectivamente. Es una entrada de diseño de protección y no es un punto de operación de dimensionamiento continuo para la bomba.",
        },
        {
          type: "table",
          headers: ["frontera", "¿Qué debería incluirse?", "Propósito"],
          rows: [
            [
              "estado estacionario normal",
              "Nivel de líquido típico, filtro nuevo, voltaje nominal, temperatura normal del medio",
              "Confirmar el punto de funcionamiento normal y el rango de control.",
            ],
            [
              "El estado estacionario más desfavorable",
              "Nivel mínimo de líquido, fin de vida útil del filtro, límites de presión media y final; suministro de energía mínimo permitido, verifique la capacidad de la bomba por separado",
              "Confirme el caudal objetivo, el margen de maniobra y la disponibilidad a largo plazo",
            ],
            [
              "margen de presión",
              "Límites operativos permitidos para la bomba candidata menos la demanda en estado estacionario menos adversa",
              "Absorber la dispersión de fabricación, medida, envejecimiento y condiciones de funcionamiento",
            ],
            [
              "Protección transitoria o anormal",
              "Conmutación, bloqueo, conmutación errónea, sujeción, valor máximo de arranque y parada de válvulas",
              "Determinar los límites de detección, apagado, alivio de presión y protección de componentes.",
            ],
          ],
        },
      ],
    },
    {
      title: "4. Ejemplo de presupuesto: sume las pérdidas estacionarias y trate por separado los transitorios y el margen",
      blocks: [
        {
          type: "paragraph",
          text: "Lo siguiente solo muestra métodos y no representa equipos reales del cliente. Suponga un caudal objetivo de 220 mL/min; En las condiciones de estado estable más desfavorables pero sostenibles, los datos medidos o del proveedor arrojan: pérdidas en el lado de succión 10 kPa, línea de descarga recta 18 kPa, válvula 12 kPa, fin de vida útil del filtro 35 kPa, aguja 95 kPa, cámara final 20 kPa.",
        },
        {
          type: "formula",
          expression:
            "ΔPworst,steady(220 mL/min) ≈ 10 + 18 + 12 + 35 + 95 + 20 = 190 kPa",
          note: "Estos seis elementos se pueden agregar sólo si pertenecen al mismo caudal objetivo y al mismo estado estacionario más desfavorable.",
        },
        {
          type: "paragraph",
          text: "190 kPa ilustra que las plataformas ordinarias de clase 100 kPa generalmente no deberían ser candidatas directas, pero esto no excluye la declaración de que cualquier bomba de 600 kPa será suficiente. El siguiente paso es leer la curva controlada de la bomba candidata a 220 mL/min y calcular el margen de presión mientras se verifica el medio, la temperatura, las condiciones de entrada, las conexiones, el suministro de energía y el ciclo de trabajo.",
        },
        {
          type: "paragraph",
          text: "Si hay un valor pico de corta duración en la conmutación de la válvula, debe registrarse como un evento transitorio independiente y la protección debe diseñarse de acuerdo con su amplitud, duración y lugar de ocurrencia. No se suma al punto de funcionamiento de estado estacionario de 190 kPa, ni el margen de presión se suma a la ecuación de estado estacionario como caída de presión adicional.",
        },
      ],
    },
    {
      title: "5. Ejemplo con FOREACH DPL30H: cómo trasladar el análisis a la selección del producto",
      blocks: [
        {
          type: "paragraph",
          text: "Los parámetros públicos de la bomba de diafragma para líquidos de alta presión FOREACH DPL30H incluyen un caudal sin carga de 300 mL/min, una presión nominal de 600 kPa, una altura autocebante de 3 mH₂O y una conexión de casquillo de tubo duro de 6×4 mm. Puede ingresar al grupo de candidatos de alta contrapresión, pero el enfoque de selección aún está en el caudal que se puede proporcionar a la contrapresión objetivo y si el punto de operación se encuentra dentro del medio, la temperatura y el rango de operación permitido por la especificación controlada.",
        },
        {
          type: "paragraph",
          text: "Si la resistencia principal procede de la aguja y del filtro, deben obtenerse sus caídas de presión con el fluido real, a la temperatura prevista y en las etapas de vida pertinentes. Si el problema principal es una presión de entrada insuficiente o una reposición deficiente, la capacidad de alta presión en la salida no compensa automáticamente las condiciones de aspiración.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "Para la aceptación del producto, consulte:",
              label: "Guía de selección de bomba de diafragma para líquidos de alta presión DPL30H",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
              suffix: ".",
            },
          ],
        },
      ],
    },
    {
      title: "6. Después del presupuesto de presión, verifique la menor presión de trabajo admisible de todo el circuito",
      blocks: [
        {
          type: "paragraph",
          text: "Las bombas están clasificadas para 600 kPa, lo que no significa que todas las tuberías rígidas, accesorios, válvulas, filtros, sensores de presión y cámaras de 6 × 4 mm estén automáticamente calificados para un funcionamiento permitido a 600 kPa. La presión de trabajo permitida de todo el circuito hidráulico está determinada por la presión de trabajo más baja permitida de todos los componentes que soportan presión.",
        },
        {
          type: "list",
          items: [
            "Confirme el material de la tubería, la tolerancia del diámetro exterior, la calidad del corte, la profundidad de inserción y los requisitos de bloqueo del casquillo.",
            "Confirme la presión de trabajo permitida, la presión de prueba y las condiciones correspondientes de la válvula, el filtro, el sensor y la cámara respectivamente, y no mezcle los términos.",
            "Seleccione el rango del sensor, el apagado por sobrepresión y la ruta de alivio de presión de acuerdo con el estado estable normal, el estado estable más desfavorable y el límite de protección transitorio.",
            "Mantenimiento completo de presión, fugas, arranque-parada, conmutación de válvulas, protección de bloqueo y pruebas de etapa de vida.",
          ],
        },
      ],
    },
    {
      title: "7. Plantilla recomendada para enviar las condiciones de funcionamiento en una consulta",
      blocks: [
        {
          type: "table",
          headers: ["campo", "Complete el ejemplo (reemplácelo con un proyecto real)"],
          rows: [
            ["Medio y temperatura", "Agua purificada, 20-30 ℃"],
            ["Caudal objetivo", "Nominal 220 mL/min, mínimo 200 mL/min"],
            [
              "Condiciones de entrada",
              "El nivel del líquido en el depósito está 0,4 m por debajo de la bomba; hay aire en el tubo cuando se inicia por primera vez",
            ],
            [
              "Línea de descarga",
              "2,0 mm de diámetro interior, 1,2 m de longitud, 2 válvulas, 1 filtro y aguja final",
            ],
            [
              "Datos de presión en estado estacionario",
              "Registre el estado estable normal y el estado estable más desfavorable, como el final de la vida útil del filtro, respectivamente.",
            ],
            [
              "Transitorios y Protección",
              "Registro individual de picos de conmutación de válvulas, duraciones, umbrales de parada y rutas de alivio de presión.",
            ],
            ["Régimen de servicio", "45 s por ciclo, 1200 ciclos al día; indicar también el intervalo de temperatura ambiente"],
            ["controlar", "24 V, regulación de velocidad PWM, requiere retroalimentación FG"],
            [
              "Verificar objetivo",
              "Flujo, presión en estado estacionario, picos transitorios, arranque, aumento de temperatura, fugas y tendencias de vida",
            ],
          ],
        },
      ],
    },
    {
      title: "Datos del sitio FOREACH y límites de evidencia",
      blocks: [
        {
          type: "links",
          items: [
            {
              label: "FOREACH: Guía de selección de bomba de diafragma para líquidos de alta presión DPL30H",
              href: "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
            },
          ],
        },
        {
          type: "notice",
          label: "Límites de la evidencia:",
          text: "La información pública del sitio se utiliza únicamente para describir el método; el diseño final debe basarse en especificaciones controladas, evaluación con el fluido real, ensayos de presión dinámica y validación del equipo completo.",
        },
      ],
    },
  ],
  faqTitle: "Preguntas frecuentes | ¿Cómo presupuestar líneas hidráulicas de alta contrapresión?",
  faqItems: [
    {
      question: "¿El presupuesto de presión debe ser exacto para cada componente?",
      answer:
        "En la etapa de selección preliminar, se puede identificar primero la resistencia principal; al entrar en la etapa de finalización, se deben verificar todas las reducciones obvias y los componentes clave. En los circuitos de microfluidos, una junta de pequeño diámetro también puede convertirse en la principal fuente de caída de presión.",
    },
    {
      question: "¿Qué hacer si no hay datos de fin de vida útil del filtro?",
      answer:
        "Primero solicite al proveedor la curva flujo-caída de presión del modelo correspondiente y luego establezca límites mediante pruebas de carga o estrangulamiento equivalente. No se pueden utilizar únicamente datos de nuevos elementos filtrantes para representar todo el ciclo de vida.",
    },
    {
      question: "¿Se puede sumar el pico de presión instantáneo directamente a la presión en estado estacionario?",
      answer:
        "No debería manejarse de esta manera. El valor máximo transitorio debe registrarse por separado según la amplitud, la duración, la ubicación del suceso y las condiciones de activación para el alcance del sensor, el apagado, el alivio de presión y la verificación de los límites transitorios de los componentes; no es una presión de trabajo continua y no agrega un punto de operación de estado estable.",
    },
    {
      question: "Si el presupuesto de presión es inferior a 600 kPa, ¿puedo definitivamente utilizar una bomba de 600 kPa?",
      answer:
        "No necesariamente. Confirme también el caudal a la presión objetivo, el margen de presión, el fluido, la temperatura, las condiciones de entrada, el régimen de servicio, el control, el método de conexión y la menor presión de trabajo admisible de todo el circuito.",
    },
    {
      question: "¿En qué etapa del proyecto conviene elaborar el presupuesto de presión?",
      answer:
        "En la etapa de diseño conceptual, primero se realizan cálculos preliminares. En la etapa de prototipo, se utilizan sensores para medir el estado estable normal, el estado estable más desfavorable y el valor máximo transitorio. Antes de congelar el diseño, se forman límites de trabajo, márgenes y protección controlados.",
    },
  ],
  cta: {
    title: "¿Necesita verificar su presupuesto de presión para una línea de fluido de alta contrapresión?",
    description:
      "Puede enviar el fluido, el caudal objetivo, las condiciones de entrada, el circuito completo, las presiones estacionarias normal y más desfavorable, los eventos transitorios, el régimen de servicio y los requisitos de control. El ingeniero ayudará a comprobar la curva de la bomba candidata y los límites de todo el circuito.",
    contactLabel: "Enviar condiciones de funcionamiento",
    productsLabel: "Ver bombas de diafragma de alta presión",
    productsHref:
      "/resources/technical-articles/dpl30h-high-pressure-liquid-diaphragm-pump-selection-guide",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
