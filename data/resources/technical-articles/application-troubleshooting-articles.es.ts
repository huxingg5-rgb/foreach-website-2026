import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const LAB_WASTE_ASSET_BASE =
  "/images/resources/technical-articles/lab-liquid-waste-aspiration-troubleshooting";
const IVD_WASTE_ASSET_BASE =
  "/images/resources/technical-articles/ivd-waste-aspiration-pump-selection";
const GAS_LIQUID_PUMP_HREF =
  "/es/products/pumps/diaphragm-pumps/dpgl800-gas-liquid-diaphragm-pump";

export const labLiquidWasteAspirationTroubleshootingEsCopy = {
  metadata: {
    title:
      "¿Qué hacer si una bomba de aspiración de residuos líquidos de laboratorio pierde succión? Diagnóstico de fugas, filtro obstruido y arrastre de líquido",
    seoTitle:
      "Bomba de aspiración de residuos con poca succión: fugas, filtro obstruido y arrastre de líquido",
    seoDescription:
      "¿La bomba de aspiración de residuos líquidos del laboratorio pierde succión, no aspira líquido o tarda más en generar vacío? Revise fugas en tapa y tuberías, obstrucción del filtro hidrófobo, protección antidesbordamiento, punta de aspiración y arrastre de residuos; además, evalúe vacío, caudal de gas y validación del sistema completo.",
    coverImage:
      LAB_WASTE_ASSET_BASE + "/waste-aspiration-protection-path-es.webp",
    coverAlt:
      "Esquema de un sistema de aspiración por vacío formado por bomba de residuos líquidos de laboratorio, frasco colector, protección antidesbordamiento y filtro hidrófobo",
  },
  deck: "En un sistema de aspiración de residuos líquidos de laboratorio, la bomba suele situarse después del frasco colector, la protección antidesbordamiento y el filtro hidrófobo, y crea vacío extrayendo el gas del frasco. Si disminuye la succión, primero hay que distinguir entre un cambio de la propia bomba y una fuga, un filtro obstruido, la activación de la protección antidesbordamiento, una punta bloqueada o el arrastre de residuos.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "La bomba de aspiración de residuos líquidos de laboratorio también se denomina bomba de aspiración por vacío o bomba de vacío para residuos. Se utiliza para recoger medio de cultivo, sobrenadantes y soluciones de lavado en cultivo celular, lavado de microplacas y estaciones automatizadas. No trabaja como un componente aislado: es la fuente de vacío de toda la cadena de aspiración.",
    },
    {
      type: "notice",
      label: "Conclusión principal:",
      text: "La bomba extrae gas y genera vacío; el frasco colector, la protección antidesbordamiento y el filtro mantienen los residuos líquidos y la espuma antes de la bomba. Si la línea base medida en la bomba es normal y el sistema solo se ralentiza al volver a conectarlo, revise primero los elementos periféricos en lugar de sustituir de inmediato la bomba por otra de mayor vacío.",
    },
  ],
  sections: [
    {
      title:
        "1. ¿Qué función cumple la bomba de aspiración de residuos en el sistema?",
      blocks: [
        {
          type: "paragraph",
          text: "El recorrido típico es «punta de aspiración—tubo de aspiración—frasco colector—protección antidesbordamiento—filtro hidrófobo—bomba de aspiración». Por la punta entran líquido, aire y espuma; en funcionamiento normal, los residuos deben quedar en el frasco. La bomba extrae el gas de la parte superior y crea una diferencia de presión entre la punta y el frasco.",
        },
        {
          type: "figure",
          src:
            LAB_WASTE_ASSET_BASE + "/waste-aspiration-protection-path-es.webp",
          alt: "Posición de la bomba de aspiración de residuos líquidos de laboratorio después del frasco colector, la protección antidesbordamiento y el filtro hidrófobo",
          width: 1600,
          height: 900,
          caption:
            "Figura 1 | La bomba es la fuente de vacío; el frasco colector, la protección antidesbordamiento y el filtro son protecciones periféricas situadas antes de ella. El paso de líquido y espuma a través de la bomba no debe considerarse una trayectoria normal.",
        },
        {
          type: "table",
          headers: [
            "Etapa",
            "Medio que entra por la punta",
            "Carga observada en la bomba",
            "Datos recomendados",
          ],
          rows: [
            [
              "Contacto con la superficie del líquido",
              "Principalmente líquido",
              "Se extrae continuamente la fase gaseosa del frasco",
              "Tiempo de aspiración, altura de la columna y volumen residual",
            ],
            [
              "Descenso del nivel",
              "Alternancia de líquido y aire",
              "Aumentan la entrada de aire y la carga de gas",
              "Forma de onda de presión, altura de espuma y sonido",
            ],
            [
              "Fondo alcanzado",
              "Principalmente aire",
              "El punto de trabajo pasa a extracción de gas y mantenimiento del vacío",
              "Presión estable, tiempo de aspiración en seco y aumento de temperatura",
            ],
            [
              "Sobrellenado anómalo",
              "Líquido o espuma supera la protección",
              "Puede aparecer líquido antes de la bomba",
              "Nivel, tiempo de enclavamiento y estado del filtro",
            ],
          ],
        },
        {
          type: "notice",
          label: "Definición del término:",
          text: "En este artículo, «arrastre de líquido» significa que los residuos o la espuma superan el frasco colector, la protección antidesbordamiento o el límite de filtración y llegan a la tubería anterior a la bomba o incluso a su cámara. No es una fase normal de aspiración ni un riesgo que deba dejarse únicamente a la capacidad gas-líquido de la bomba.",
        },
      ],
    },
    {
      title:
        "2. La capacidad de aspiración no se evalúa solo con el vacío máximo",
      blocks: [
        {
          type: "paragraph",
          text: "El vacío máximo indica el límite al que puede aproximarse la bomba; el caudal de gas en vacío libre indica el orden de magnitud transportado con una diferencia de presión baja. No representan el mismo punto de trabajo. Con tubos, filtro, tapa y racores instalados, la velocidad real de aspiración depende conjuntamente de la curva de la bomba y de la resistencia del sistema.",
        },
        {
          type: "formula",
          expression: "S_eq ≈ (V_g / t_build) × ln(p₀ / p₁)",
          note: "V_g es el volumen real de gas durante la prueba y t_build es el tiempo necesario para que la presión absoluta baje de p₀ a p₁. La relación permite comparar la capacidad equivalente de generación de vacío en un mismo sistema, pero no equivale al caudal nominal de la bomba; la humedad, las fugas, la desgasificación de materiales y la temperatura modifican el resultado.",
        },
        {
          type: "table",
          headers: [
            "Observación",
            "Más probable fuera de la bomba",
            "Más probable en la bomba o el accionamiento",
          ],
          rows: [
            [
              "La línea base con un tubo corto y limpio es normal, pero el equipo completo se ralentiza",
              "Filtro, fugas, tubos, punta o protección antidesbordamiento",
              "Menos probable",
            ],
            [
              "La línea base de la bomba y el equipo completo disminuyen progresivamente",
              "También deben comprobarse la alimentación y el entorno",
              "Revisar válvulas, membrana, accionamiento o desgaste",
            ],
            [
              "Se genera vacío, pero la aspiración de líquido sigue siendo lenta",
              "Punta obstruida, tubo estrecho, altura de elevación o viscosidad",
              "Este dato por sí solo no demuestra un fallo de la bomba",
            ],
            [
              "La presión sube rápidamente al detener la bomba",
              "Fuga en tapa, racores, tubos o límite antirretorno",
              "Aislar por tramos antes de concluir",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Para seleccionar una solución deben definirse al mismo tiempo el caudal de gas disponible al vacío objetivo, el tiempo de evacuación de un volumen especificado, el calentamiento en funcionamiento continuo, la alimentación y la resistencia de todo el sistema. Una petición genérica de «más succión» no permite determinar el punto de trabajo dentro del equipo real.",
        },
      ],
    },
    {
      title:
        "3. Las fugas, un filtro obstruido y el arrastre de residuos dejan indicios diferentes",
      blocks: [
        {
          type: "table",
          headers: [
            "Fallo",
            "Manifestación habitual",
            "Método de verificación seguro",
            "Punto principal de intervención",
          ],
          rows: [
            [
              "Fuga en tapa o racor",
              "No se alcanza el vacío objetivo y persiste el sonido de aspiración de aire",
              "Aislar por tramos y comparar curvas de presión-tiempo",
              "Juntas, roscas, tubos y tensiones de montaje",
            ],
            [
              "Filtro hidrófobo húmedo u obstruido",
              "La succión disminuye gradualmente y aumenta la caída de presión en el filtro",
              "Sustituirlo por un filtro conforme a las instrucciones de mantenimiento y repetir la prueba",
              "Seguir buscando el origen de espuma, gotas y contaminación",
            ],
            [
              "Tubo o punta obstruidos",
              "Una sola rama funciona lentamente aunque la bomba todavía genera vacío",
              "Restablecer la geometría del tubo, limpiar la punta y repetir la prueba",
              "Pliegues, aplastamientos, cristalización y residuos de proteínas",
            ],
            [
              "Protección antidesbordamiento activada",
              "La aspiración se detiene o el caudal cae bruscamente cerca del llenado",
              "Comprobar nivel y estado de rearme según el procedimiento normalizado",
              "No puentear la protección para continuar aspirando",
            ],
            [
              "Arrastre de residuos líquidos",
              "Líquido visible en el filtro, cambio de sonido de la bomba o escape anómalo",
              "Detener, aislar y evaluar según el procedimiento de descontaminación",
              "No asumir que el equipo vuelve a ser utilizable con solo dejarlo secar",
            ],
          ],
        },
        {
          type: "subheading",
          title:
            "Confirmación de fugas mediante el método de aumento de presión",
        },
        {
          type: "paragraph",
          text: "Con el sistema limpio, seco, a temperatura relativamente estable y dentro del procedimiento de mantenimiento, puede evacuarse hasta una presión absoluta definida, aislar la bomba y registrar el aumento de presión dentro de un volumen de gas conocido. Las pruebas repetidas y una línea base de equipo nuevo revelan mejor el deterioro gradual de las juntas que una evaluación basada solo en el sonido.",
        },
        {
          type: "formula",
          expression: "q_L = V_gas × (Δp / Δt)",
          note: "q_L es la carga de gas equivalente obtenida con el método de aumento de presión. V_gas debe ser el volumen real de gas y Δp la variación de presión absoluta. La evaporación de un frasco húmedo, la rotura de espuma y la desgasificación de materiales también elevan el resultado; por ello debe utilizarse primero para comparaciones relativas en las mismas condiciones, no como un límite de aceptación universal.",
        },
        {
          type: "notice",
          label: "Límite del diagnóstico:",
          text: "No retire el frasco colector, el filtro o la protección antidesbordamiento para efectuar pruebas prolongadas de derivación mientras haya residuos líquidos. Cuando deba compararse la línea base de la bomba, utilice un límite de prueba controlado, limpio y conforme al procedimiento de mantenimiento del equipo.",
        },
      ],
    },
    {
      title:
        "4. La compatibilidad de materiales debe incluir residuos, vapores y gotas anómalas",
      blocks: [
        {
          type: "paragraph",
          text: "En condiciones normales, la bomba de aspiración entra principalmente en contacto con gas, pero también puede recibir vapores de residuos, aerosoles y gotas arrastradas de forma anómala. La evaluación de materiales no debe limitarse al frasco y los tubos: debe abarcar la entrada, los materiales en contacto dentro de la cámara, la membrana, las válvulas y el destino del escape.",
        },
        {
          type: "table",
          headers: [
            "Información del medio que debe declararse",
            "Por qué es importante",
            "Qué no puede sustituirla",
          ],
          rows: [
            [
              "Composición, concentración, temperatura y pH",
              "Determinan hinchamiento, corrosión y carga de vapores",
              "No basta con escribir «residuos de laboratorio»",
            ],
            [
              "Espuma, proteínas, partículas y cristalización",
              "Pueden obstruir punta, válvulas y filtro",
              "No basta con probar un vaso de agua limpia",
            ],
            [
              "Desinfectantes y procedimiento de limpieza",
              "El tiempo de permanencia y el orden de mezcla modifican el riesgo",
              "No basta con consultar el nombre del material",
            ],
            [
              "Riesgo biológico y volatilidad",
              "Determinan filtración, tratamiento del escape y protección durante el mantenimiento",
              "La estanqueidad a gases no equivale a bioseguridad",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Los residuos infecciosos, corrosivos, inflamables, volátiles o que contengan disolventes orgánicos requieren una evaluación específica según las normas EHS del laboratorio, el procedimiento de residuos y el medio real. Poder extraer gas o manejar mezclas gas-líquido no demuestra bioseguridad, protección contra explosiones ni compatibilidad con todas las sustancias químicas.",
        },
      ],
    },
    {
      title:
        "5. La validación del equipo debe combinar condiciones normales, con carga y anómalas",
      blocks: [
        {
          type: "table",
          headers: [
            "Condición de prueba",
            "Entrada controlada",
            "Registrar como mínimo",
            "Objetivo",
          ],
          rows: [
            [
              "Línea base limpia de la bomba",
              "Volumen de gas, tuberías, alimentación y temperatura fijos",
              "Tiempo de evacuación, presión, corriente, temperatura y ruido",
              "Establecer una referencia para comparar la bomba",
            ],
            [
              "Ciclo real de residuos",
              "Líquido, espuma, tiempo de aspiración en seco y ciclo operativo reales",
              "Tiempo de aspiración, volumen residual y altura de espuma",
              "Verificar que la tarea se completa",
            ],
            [
              "Carga del filtro",
              "Estado simulado y definido de humedad o contaminación",
              "Caída de presión, tiempo de evacuación y alarma",
              "Confirmar el punto de mantenimiento y su detectabilidad",
            ],
            [
              "Fuga leve controlada",
              "Fuga repetible introducida en una posición segura definida",
              "Aumento de presión, tiempo de alarma y cambio de aspiración",
              "Distinguir aspiración normal de aire y anomalía de sellado",
            ],
            [
              "Nivel alto y espuma",
              "Aumento gradual del nivel y de la espuma",
              "Tiempo de enclavamiento y presencia de líquido aguas abajo",
              "Validar el límite de protección contra líquidos",
            ],
            [
              "Parada y reinicio",
              "Instalación final, estado posterior al mantenimiento y parada máxima",
              "Primera evacuación, tiempo de recuperación y recuento de anomalías",
              "Validar la recuperación después de un uso prolongado",
            ],
          ],
        },
        {
          type: "notice",
          label: "Criterio de aceptación:",
          text: "No busque un vacío, una tasa de fuga o una caída de presión del filtro fija para todos los laboratorios. Defina primero las consecuencias inaceptables mediante el análisis de riesgos y convierta el tiempo de aspiración, el volumen residual, la presencia de líquido aguas abajo, el tiempo de alarma y el intervalo de mantenimiento en límites del proyecto.",
        },
      ],
    },
    {
      title: "6. Si la bomba pierde succión, siga estos seis pasos",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Detenga el sistema y compruebe si hubo sobrellenado, espuma fuera del límite o arrastre de residuos; si son residuos peligrosos, aísle primero según el procedimiento normalizado.",
            "Compruebe el nivel del frasco y si se ha activado la protección antidesbordamiento; no la puentee.",
            "Revise si el filtro hidrófobo está húmedo, contaminado, obstruido o montado en dirección incorrecta.",
            "Compruebe si tubos, punta y ramas anteriores están doblados, aplastados, sueltos u obstruidos por residuos.",
            "Revise fugas en tapa, juntas y racores, y confírmelas por tramos con la línea base presión-tiempo.",
            "Solo después de excluir fallos periféricos, compruebe la bomba, la alimentación, el accionamiento y la lógica de control con una línea base limpia.",
          ],
        },
        {
          type: "figure",
          src:
            LAB_WASTE_ASSET_BASE +
            "/waste-aspiration-troubleshooting-sequence-es.webp",
          alt: "Secuencia de diagnóstico de una bomba de aspiración de residuos líquidos de laboratorio con poca succión: nivel, filtro, tuberías, sellado y bomba",
          width: 1600,
          height: 900,
          caption:
            "Figura 2 | Revise primero los elementos periféricos y después la bomba. Antes de desmontar, detenga el sistema, libere el vacío y gestione los residuos de acuerdo con el riesgo y el procedimiento del laboratorio.",
        },
      ],
    },
    {
      title: "7. Conclusiones de ingeniería, referencias y límites de uso",
      blocks: [
        {
          type: "paragraph",
          text: "La bomba de aspiración es la fuente de vacío, no el frasco colector. Cuando disminuye la succión, comparar por separado la línea base limpia de la bomba y la curva del sistema completo suele localizar el problema más rápido que aumentar directamente el vacío máximo. La recogida, la protección antidesbordamiento, la filtración, la detección de fugas y las alarmas determinan si una anomalía queda contenida antes de la bomba.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "Aplicación relacionada:",
              label: "Automatización de laboratorio",
              href: "/es/applications/lab-automation/",
              suffix: ".",
            },
            {
              prefix: "Referencia:",
              label:
                "Descripción de KNF sobre sistemas de aspiración de fluidos de laboratorio",
              href: "https://knf.com/en/global/solutions/lab-applications/fluid-aspiration",
              suffix: ".",
            },
            {
              prefix: "Referencia:",
              label:
                "Protección y mantenimiento del sistema de aspiración por vacío VACUSAFE de INTEGRA",
              href: "https://www.integra-biosciences.com/global/en/aspiration-systems/vacusafe",
              suffix: ".",
            },
            {
              prefix: "Referencia:",
              label:
                "Método de aumento de presión y cálculo de fugas en sistemas de vacío",
              href: "https://www.leybold.com/content/leybold/en-us/knowledge/vacuum-fundamentals/leak-detection/pressure-rise-and-drop-tests.html",
              suffix: ".",
            },
          ],
        },
        {
          type: "notice",
          label: "Límite de uso:",
          text: "Este artículo se destina a la selección y el diagnóstico general de sistemas de aspiración de residuos líquidos de laboratorio. No constituye una clasificación de peligros, una conclusión de compatibilidad de materiales, bioseguridad, protección contra explosiones o aptitud médica. El medio, la instalación, los riesgos y la vida útil reales deben validarse en el proyecto.",
        },
      ],
    },
  ],
  faqTitle:
    "Preguntas frecuentes sobre bombas de aspiración de residuos líquidos de laboratorio",
  faqItems: [
    {
      question: "Si la bomba pierde succión, ¿qué debe comprobarse primero?",
      answer:
        "Detenga primero el sistema y confirme si hay sobrellenado, espuma fuera del límite o arrastre de líquido. Después revise, por orden, la protección antidesbordamiento, el filtro hidrófobo, los tubos y la punta, y las fugas en tapa y racores. Solo tras excluir los elementos periféricos, compruebe la bomba con una línea base limpia.",
    },
    {
      question:
        "La bomba genera vacío, pero sigue aspirando el líquido muy lentamente. ¿Por qué?",
      answer:
        "Generar vacío solo demuestra que el circuito de gas alcanza una presión determinada. Una punta obstruida, tubos estrechos, altura de elevación, deformación de los tubos, viscosidad del residuo o resistencia del filtro todavía pueden limitar la velocidad real de aspiración.",
    },
    {
      question:
        "¿Un filtro hidrófobo húmedo u obstruido puede reducir la succión?",
      answer:
        "Sí. La humedad, la contaminación o un montaje incorrecto aumentan la resistencia del circuito de gas y suelen alargar el tiempo de evacuación y reducir progresivamente la aspiración. Después de sustituirlo, investigue también de dónde proceden la espuma o las gotas.",
    },
    {
      question: "¿Cómo se detectan fugas en tapa, racores o tubos?",
      answer:
        "En condiciones controladas, limpias, secas y térmicamente estables, aísle el sistema por tramos y compare la curva de aumento de presión de un volumen de gas conocido. La evaporación de humedad y la desgasificación de materiales también afectan al resultado, por lo que debe compararse con una línea base obtenida en las mismas condiciones.",
    },
    {
      question:
        "Si los residuos líquidos han llegado a la bomba, ¿puede seguir utilizándose?",
      answer:
        "No debe darse por utilizable con solo dejarla secar. Detenga y aísle el equipo; revise filtro, tuberías y cámara de la bomba conforme al riesgo del medio, el procedimiento de descontaminación y las instrucciones del fabricante, y evalúe materiales, rendimiento y seguridad del escape.",
    },
    {
      question:
        "¿Basta con el vacío máximo para seleccionar una bomba de aspiración de residuos?",
      answer:
        "No. También deben considerarse el caudal de gas útil al vacío objetivo, el volumen de gas del frasco, el tiempo de evacuación, las fugas, la resistencia de filtración, el calentamiento continuo, el ciclo real y la protección frente a anomalías.",
    },
  ],
  cta: {
    title:
      "¿Está seleccionando o diagnosticando una bomba de aspiración de residuos líquidos de laboratorio?",
    description:
      "Facilite el tipo de residuo, el tiempo objetivo de aspiración, el volumen del frasco, el vacío requerido, el diámetro y la longitud de los tubos, el filtro, la protección antidesbordamiento y las condiciones anómalas para revisar el punto de trabajo, los límites de materiales y el plan de validación del equipo.",
    contactLabel: "Consultar con ingeniería",
    productsLabel: "Ver bombas de diafragma para mezclas gas-líquido",
    productsHref: GAS_LIQUID_PUMP_HREF,
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const ivdWasteAspirationPumpSelectionEsCopy = {
  metadata: {
    title:
      "Aspiración de residuos en IVD: ¿bomba de líquido o bomba de vacío? Diferencias entre aspiración directa e indirecta",
    seoTitle:
      "Aspiración de residuos IVD: bomba de líquido o de vacío, transferencia directa e indirecta",
    seoDescription:
      "Análisis de la transferencia directa con bomba de líquido, la aspiración indirecta por vacío y las condiciones gas-líquido en residuos de lavado de agujas y cubetas de reacción IVD, con comparación de recorridos, caudal, vacío, protección antidesbordamiento, materiales y validación del equipo.",
    coverImage:
      IVD_WASTE_ASSET_BASE + "/ivd-direct-vs-vacuum-aspiration-es.webp",
    coverAlt:
      "Comparación de recorridos del medio entre transferencia directa con bomba de líquido y aspiración indirecta por vacío en residuos IVD",
  },
  deck: "En los equipos IVD, el lavado de agujas, el lavado de cubetas de reacción y la evacuación rutinaria se denominan «aspiración de residuos». Sin embargo, que los residuos pasen directamente por una bomba de líquido o entren primero en un frasco colector cuyo vacío genera otra bomba conduce a lógicas de selección completamente distintas.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Antes de seleccionar, responda cuatro preguntas: ¿los residuos atraviesan la bomba?, ¿seguirá entrando aire después de extraer el líquido?, ¿el sistema necesita descarga continua o una evacuación breve y periódica?, ¿los residuos contienen espuma, partículas, cristales o agentes de limpieza corrosivos?",
    },
    {
      type: "notice",
      label: "Diferencia esencial:",
      text: "En la transferencia directa, la bomba transporta el líquido y entra en contacto con todos los residuos. En la aspiración indirecta por vacío, la bomba extrae principalmente gas de la parte superior del frasco y los residuos permanecen normalmente dentro. La capacidad para mezclas gas-líquido es una propiedad de manejo del medio, no una tercera arquitectura que permita eliminar las protecciones.",
    },
  ],
  sections: [
    {
      title:
        "1. Dibuje primero el recorrido de los residuos y después elija la bomba",
      blocks: [
        {
          type: "figure",
          src:
            IVD_WASTE_ASSET_BASE + "/ivd-direct-vs-vacuum-aspiration-es.webp",
          alt: "Comparación de la posición de la bomba, el frasco colector y la protección antidesbordamiento en transferencia directa y aspiración indirecta por vacío IVD",
          width: 1600,
          height: 900,
          caption:
            "Figura 1 | En la transferencia directa, los residuos atraviesan la bomba; en la aspiración indirecta, quedan en el frasco y la bomba crea vacío desde la fase gaseosa. Los elementos de protección pertenecen al sistema y no son capacidades incorporadas en la bomba.",
        },
        {
          type: "table",
          headers: [
            "Concepto",
            "Medio principal en contacto con la bomba",
            "¿Los residuos atraviesan el cabezal?",
            "Tarea principal",
          ],
          rows: [
            [
              "Transferencia directa con bomba de líquido",
              "Residuos, posiblemente con burbujas",
              "Sí",
              "Enviar directamente los residuos al contenedor",
            ],
            [
              "Aspiración indirecta por vacío",
              "Aire, humedad y aerosoles",
              "Normalmente no",
              "Generar y mantener vacío en el frasco colector",
            ],
            [
              "Capacidad para mezclas gas-líquido",
              "Alternancia de líquido, burbujas y aire",
              "Depende de la arquitectura",
              "Manejar aspiración en seco, tapones de líquido o humedad, no dosificación precisa",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "La capacidad para mezclas gas-líquido puede utilizarse tanto en una trayectoria directa como para tolerar anomalías en el lado de vacío. No elimina la necesidad de definir cuál es el medio principal de la bomba, ni permite prescindir de detección de nivel, protección antidesbordamiento y filtración.",
        },
      ],
    },
    {
      title: "2. Los residuos IVD rara vez son un líquido único y estable",
      blocks: [
        {
          type: "paragraph",
          text: "La evacuación en estaciones de lavado de agujas y cubetas de reacción suele ser intermitente: al abrirse la válvula entra primero líquido, aparecen burbujas cuando baja el nivel y puede seguir aspirándose aire después de retirar el líquido para reducir el volumen residual. Los tensioactivos generan espuma y los restos de proteínas o reactivos pueden depositarse, cristalizar u obstruir pasos pequeños.",
        },
        {
          type: "table",
          headers: [
            "Etapa del ciclo",
            "Estado del medio",
            "Parámetro que suele interpretarse mal",
            "Qué debe validarse",
          ],
          rows: [
            [
              "Entrada de líquido",
              "Residuos continuos o intermitentes",
              "Tratar el caudal de gas en vacío libre como caudal de líquido",
              "Volumen realmente descargado, contrapresión, viscosidad y residuo",
            ],
            [
              "Descenso del nivel",
              "Alternancia de tapones de líquido y burbujas",
              "Considerar solo el caudal medio",
              "Oscilaciones de presión, reaspiración de líquido y secuencia de válvulas",
            ],
            [
              "Aspiración en seco",
              "Principalmente aire",
              "Suponer que el funcionamiento en seco no tiene efecto",
              "Tiempo permitido en seco, temperatura, ruido y vida útil",
            ],
            [
              "Reposo después de la limpieza",
              "Residuos, depósitos o cristalización",
              "Probar únicamente un equipo nuevo con agua limpia",
              "Reinicio, recuperación tras limpieza y estanqueidad a largo plazo",
            ],
          ],
        },
        {
          type: "notice",
          label: "Límite de los parámetros:",
          text: "El caudal de gas en vacío libre, el caudal continuo de líquido y la velocidad real de aspiración de residuos son tres indicadores distintos. El vacío máximo tampoco significa que se mantenga el caudal libre a esa presión. El tiempo final de evacuación debe medirse en el circuito real.",
        },
      ],
    },
    {
      title:
        "3. Transferencia directa: recorrido corto, pero todos los riesgos pasan por la bomba",
      blocks: [
        {
          type: "paragraph",
          text: "La transferencia directa coloca la bomba en el conducto de residuos. Es adecuada para sistemas con pocas ramas, descarga continua o control directo del transporte de líquido. A cambio, los agentes de limpieza, residuos de muestra, espuma, cristales y partículas llegan al cabezal; la membrana, las válvulas, la cámara y la contrapresión aguas abajo pasan a formar parte de la validación.",
        },
        {
          type: "table",
          headers: [
            "Dimensión",
            "Ventaja de la transferencia directa",
            "Coste que debe asumirse",
          ],
          rows: [
            [
              "Estructura",
              "Recorrido corto y relativamente pocos componentes",
              "La bomba entra en contacto con todos los residuos",
            ],
            [
              "Descarga",
              "Puede enviar residuos continuamente al depósito",
              "Deben controlarse la contrapresión de salida y el retorno",
            ],
            [
              "Múltiples ramas",
              "Las ramas independientes son fáciles de ajustar por separado",
              "Puede aumentar el número de bombas o válvulas controladas",
            ],
            [
              "Mantenimiento",
              "No requiere vaciado periódico de un frasco de vacío",
              "Son más críticos los residuos internos, la limpieza y los depósitos en las válvulas",
            ],
            [
              "Aspiración en seco",
              "Puede reducir el residuo final",
              "Debe confirmarse que la bomba admite alternancia gas-líquido y reaspiración",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "No basta con comprobar si la bomba «consigue aspirar líquido». También deben evaluarse la transición de funcionamiento húmedo a aspiración en seco, la capacidad de volver a aspirar líquido, la pérdida de estanqueidad de las válvulas por depósitos después de muchos ciclos y el volumen final residual en la peor condición de residuos.",
        },
      ],
    },
    {
      title:
        "4. Aspiración indirecta por vacío: separa la bomba de los residuos, pero exige protección",
      blocks: [
        {
          type: "paragraph",
          text: "La aspiración indirecta utiliza una bomba de vacío para reducir la presión de la fase gaseosa sobre el frasco colector y aspira los residuos mediante la diferencia de presión. Una fuente de vacío puede dar servicio a varias ramas mediante un bloque de válvulas y no necesita entrar en contacto directo con la mayor parte de los residuos; sin embargo, el frasco, el nivel, el filtro, la protección antidesbordamiento, la ventilación y la secuencia de válvulas deben funcionar conjuntamente.",
        },
        {
          type: "table",
          headers: [
            "Elemento de protección",
            "Objetivo principal",
            "Riesgo típico si falta",
          ],
          rows: [
            [
              "Frasco colector apto para vacío",
              "Contener residuos y soportar la diferencia de presión",
              "Deformación, fugas o entrada de líquido en la línea de vacío",
            ],
            [
              "Detección de nivel",
              "Generar alarma o parada al llenarse",
              "Los residuos y la espuma continúan avanzando",
            ],
            [
              "Protección antidesbordamiento",
              "Impedir que un líquido anómalo alcance la bomba",
              "Contaminación de bomba, filtro y escape",
            ],
            [
              "Filtración hidrófoba",
              "Limitar el avance de gotas y aerosoles",
              "Aumento de resistencia o pérdida de protección aguas abajo",
            ],
            [
              "Ventilación y despresurización",
              "Liberar el vacío antes del mantenimiento",
              "Salpicaduras al abrir o dificultad para abrir el frasco",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Que «la bomba no toque los residuos» es el objetivo en funcionamiento normal. La espuma, el sobrellenado, el fallo del nivel y la condensación todavía pueden llevar gotas al lado de vacío; por tanto, conectar una bomba de gas convencional a un frasco vacío no constituye por sí solo un sistema completo de aspiración de residuos.",
        },
      ],
    },
    {
      title:
        "5. ¿Cuándo debe incluirse la capacidad gas-líquido en la selección?",
      blocks: [
        {
          type: "table",
          headers: [
            "Condición que puede evaluarse",
            "Capacidad que no se puede deducir",
          ],
          rows: [
            [
              "Alternancia repetida de tapones de líquido y aire al final de la transferencia directa",
              "No significa que pueda dosificar muestras o reactivos con precisión",
            ],
            [
              "Residuos de lavado de agujas con burbujas o espuma",
              "No admite automáticamente cualquier volumen de espuma, partículas o tapones de líquido",
            ],
            [
              "Evacuación periódica de tuberías y aspiración breve en seco",
              "No implica el mismo rendimiento en transporte continuo de líquido puro",
            ],
            [
              "Posible contacto del lado de vacío con humedad o poco condensado",
              "No permite eliminar recogida, protección antidesbordamiento ni filtración",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Si el líquido atraviesa la bomba por diseño, deben definirse proporción gas-líquido, duración del tapón de líquido, tiempo en seco, partículas y espuma. Si la bomba se sitúa después del frasco, deben definirse volumen gaseoso, fuga, resistencia de filtración y límite anómalo de presencia de líquido. Ambas arquitecturas exigen validar materiales con el medio real.",
        },
        {
          type: "notice",
          label: "Separación funcional:",
          text: "La evacuación de residuos y la dosificación de reactivos tienen objetivos de control diferentes. La bomba de residuos o de vacío no debe asumir además la dosificación precisa de muestras o reactivos; poder manejar una mezcla gas-líquido tampoco demuestra baja pulsación o dispensación altamente repetible.",
        },
      ],
    },
    {
      title:
        "6. Transferencia directa o aspiración indirecta: seleccione por tarea, no por un solo parámetro",
      blocks: [
        {
          type: "figure",
          src: IVD_WASTE_ASSET_BASE + "/ivd-waste-pump-decision-tree-es.webp",
          alt: "Árbol de selección para aspiración de residuos IVD según si el medio atraviesa la bomba, si requiere caudal continuo y si existe alternancia gas-líquido",
          width: 1600,
          height: 900,
          caption:
            "Figura 2 | La primera pregunta es si los residuos atraviesan la bomba; después se distingue entre líquido continuo, generación de vacío o alternancia gas-líquido. El caudal de gas libre, el caudal de residuos y el vacío máximo no son intercambiables.",
        },
        {
          type: "table",
          headers: [
            "Criterio de selección",
            "Transferencia directa con bomba de líquido",
            "Aspiración indirecta por vacío",
          ],
          rows: [
            ["¿Los residuos atraviesan la bomba?", "Sí", "Normalmente no"],
            [
              "Descarga continua",
              "Relativamente sencilla",
              "Debe considerarse el vaciado del frasco",
            ],
            [
              "Ampliación a varias ramas",
              "Añadir bombas o control de válvulas",
              "Una fuente de vacío puede servir varias ramas mediante secuencias de válvulas",
            ],
            [
              "Riesgo principal para materiales",
              "Todos los residuos entran en contacto directo con la bomba",
              "Humedad, aerosoles y arrastre anómalo",
            ],
            [
              "Punto principal de mantenimiento",
              "Residuos internos, válvulas y membrana",
              "Frasco, filtro, nivel y sellado",
            ],
            [
              "Criterio esencial de aceptación",
              "Volumen realmente descargado, aspiración en seco y reaspiración",
              "Tiempo de evacuación, interferencia entre ramas y protección antidesbordamiento",
            ],
          ],
        },
        {
          type: "formula",
          expression: "Q_cycle = V_waste / t_cycle",
          note: "Q_cycle solo describe la demanda media de residuos de un ciclo. Para transferencia directa deben incluirse el caudal instantáneo, la contrapresión de salida y la aspiración en seco. Para aspiración indirecta deben incluirse el volumen gaseoso del frasco, el tiempo de evacuación, las fugas y la recuperación de presión después de abrir las válvulas.",
        },
      ],
    },
    {
      title: "7. Seis errores de selección frecuentes y cómo prevenirlos",
      blocks: [
        {
          type: "table",
          headers: ["Error frecuente", "Por qué falla", "Cómo prevenirlo"],
          rows: [
            [
              "Tratar el caudal de gas libre como caudal de residuos",
              "El medio de prueba y la resistencia son distintos",
              "Medir el tiempo de evacuación y el residuo en el circuito real",
            ],
            [
              "Comparar únicamente el vacío máximo",
              "La velocidad real depende de tubos, válvulas, filtro y fugas",
              "Registrar la curva de presión-tiempo del sistema completo",
            ],
            [
              "Dimensionar solo con el volumen de solución de lavado",
              "Después del líquido entra una cantidad importante de aire",
              "Registrar a la vez volumen de líquido, tiempo en seco y ciclo",
            ],
            [
              "Omitir la protección antidesbordamiento en aspiración indirecta",
              "La espuma y el sobrellenado pueden llegar al lado de vacío",
              "Incluir nivel, parada, filtración y protección secundaria",
            ],
            [
              "Considerar solo el nombre del material",
              "Concentración, temperatura y tiempo de contacto modifican el resultado",
              "Validar inmersión, circulación, limpieza y vida útil",
            ],
            [
              "Usar la bomba de residuos para dosificación precisa",
              "La evacuación y la dosificación tienen objetivos distintos",
              "Diseñar por separado la dosificación de reactivos y la aspiración de residuos",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Los datos relevantes del equipo no son «aspira/no aspira», sino el tiempo de evacuación por ciclo, el volumen residual final, la reaspiración después del funcionamiento en seco, la interferencia entre ramas, la caída de presión del filtro, el tiempo de evacuación del frasco, los cambios de materiales y la respuesta de la protección ante sobrellenado.",
        },
      ],
    },
    {
      title: "8. Lista de validación instalada, referencias y límites de uso",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Definir agentes de limpieza, residuos de muestra, espuma, partículas, cristales y posibles vapores peligrosos.",
            "Confirmar si la bomba toca la mayor parte de los residuos o solo el gas húmedo sobre el frasco.",
            "Probar con diámetro y longitud reales, válvulas, filtro y peor nivel de líquido.",
            "Medir tiempo de evacuación por ciclo, volumen residual, tiempo en seco y capacidad de reaspiración.",
            "Validar recuperación de presión e interferencia cuando varias ramas actúan simultáneamente o en secuencia.",
            "Validar alarma de nivel, parada por llenado, protección antidesbordamiento, ventilación y mantenimiento.",
            "Completar validaciones de compatibilidad, limpieza, depósitos, ciclos continuos y vida útil.",
          ],
        },
        {
          type: "links",
          items: [
            {
              prefix: "Aplicación relacionada:",
              label: "Circuitos fluidos para diagnóstico in vitro",
              href: "/es/applications/ivd/",
              suffix: ".",
            },
            {
              prefix: "Referencia:",
              label:
                "Comparación de KNF entre transferencia directa de líquido y transferencia indirecta por vacío",
              href: "https://knf.com/en/it/stories-events/news-stories/article/direct-liquid-transfer-vs-vacuum-over-liquid-transfer",
              suffix: ".",
            },
            {
              prefix: "Referencia:",
              label:
                "Nota de KNF sobre residuos de lavado de agujas y condiciones gas-líquido",
              href: "https://knf.com/fileadmin/Local_files/USA/Downloads/OEM_Process_downloads/application_note/Application_Note_needle-washing_KNF_USA.pdf",
              suffix: ".",
            },
            {
              prefix: "Referencia:",
              label:
                "Información de Iwaki sobre bombas para transferencia gas-líquido y recogida de residuos",
              href: "https://www.iwaki.hk/catalog/products_details.php?cPath=6&id=40&language=en",
              suffix: ".",
            },
          ],
        },
        {
          type: "notice",
          label: "Límite de uso:",
          text: "Este artículo trata el circuito general de residuos en equipos IVD y no se aplica a la dosificación precisa de muestras o reactivos. Antes de integrar cualquier bomba deben completarse las validaciones de riesgos del equipo, materiales, vida útil, seguridad eléctrica médica y sistema de calidad. Los medios inflamables, tóxicos o corrosivos requieren una solución específica.",
        },
      ],
    },
  ],
  faqTitle:
    "Preguntas frecuentes sobre selección para aspiración de residuos IVD",
  faqItems: [
    {
      question:
        "¿Un vacío más profundo siempre aumenta la velocidad de aspiración de residuos IVD?",
      answer:
        "No necesariamente. La velocidad real también depende del diámetro y la longitud de los tubos, las válvulas, la caída de presión del filtro, las fugas, el volumen del frasco y las propiedades del líquido. Un vacío excesivo también puede aumentar salpicaduras y espuma.",
    },
    {
      question:
        "¿Puede convertirse directamente el caudal de gas libre en caudal de residuos líquidos?",
      answer:
        "No. El medio, la presión y la resistencia del sistema son diferentes. El caudal de residuos debe medirse con las tuberías, válvulas, nivel y contrapresión reales.",
    },
    {
      question:
        "¿Puede una bomba de líquido convencional aspirar directamente residuos de lavado de agujas?",
      answer:
        "Debe confirmarse que admite la aspiración en seco y la alternancia gas-líquido previstas, que puede volver a aspirar líquido y que sus materiales son compatibles; también deben validarse espuma, residuos y depósitos a largo plazo.",
    },
    {
      question:
        "¿La aspiración indirecta garantiza que la bomba de vacío nunca entre en contacto con líquido?",
      answer:
        "No puede garantizarlo de forma absoluta. El sobrellenado, la espuma, la condensación o un fallo de protección todavía pueden llevar líquido al lado de vacío, por lo que son imprescindibles detección de nivel, protección antidesbordamiento y filtración.",
    },
    {
      question:
        "¿Una bomba de vacío puede dar servicio a varias ramas de residuos al mismo tiempo?",
      answer:
        "Puede evaluarse, pero deben validarse el número de ramas abiertas simultáneamente, la secuencia de válvulas, el volumen del frasco, la recuperación de presión y la interferencia entre ramas. Una fuga en una rama puede ralentizar las demás.",
    },
    {
      question:
        "¿Cómo se seleccionan materiales si los residuos contienen hipoclorito, tensioactivos o proteínas?",
      answer:
        "No basta con el nombre del material. La inmersión, la circulación y la vida útil deben validarse con concentración, temperatura, tiempo de contacto, ciclo de limpieza y depósitos reales, incluyendo bomba, tubos, válvulas y juntas.",
    },
  ],
  cta: {
    title:
      "¿Está comparando transferencia directa y aspiración indirecta para residuos IVD?",
    description:
      "Facilite el volumen de residuos por ciclo, el tiempo de aspiración en seco, el número de ramas, el volumen del frasco, las tuberías y válvulas, el medio real, la espuma y la protección contra sobrellenado para revisar la arquitectura, el punto de trabajo y la matriz de validación.",
    contactLabel: "Consultar con ingeniería",
    productsLabel: "Ver bombas de diafragma para mezclas gas-líquido",
    productsHref: GAS_LIQUID_PUMP_HREF,
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
