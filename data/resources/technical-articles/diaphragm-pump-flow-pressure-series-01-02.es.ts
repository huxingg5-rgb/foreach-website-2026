import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const ARTICLE_01_ASSET_BASE =
  "/images/resources/technical-articles/300-vs-600-ml-min-diaphragm-pump-selection";
const ARTICLE_02_ASSET_BASE =
  "/images/resources/technical-articles/300-ml-min-diaphragm-pump-flow-margin";

export const diaphragmPump300Vs600SelectionEsCopy = {
  metadata: {
    title:
      "¿Cómo elegir entre microbombas de diafragma de 300 y 600 mL/min? Calcule primero el caudal requerido y después el punto de funcionamiento real",
    seoTitle:
      "Microbomba de diafragma de 300 o 600 mL/min: caudal y punto de funcionamiento | FOREACH",
    seoDescription:
      "Para comparar microbombas de diafragma de 300 y 600 mL/min no basta con mirar el caudal sin carga. Esta guía relaciona el volumen por ciclo, el tiempo efectivo de bombeo, la presión del circuito, la curva de la bomba y la validación en prototipo.",
    coverImage: `${ARTICLE_01_ASSET_BASE}/article-cover.webp`,
    coverAlt: "Microbombas de diafragma FOREACH y ensayo de caudal en un vídeo oficial de Douyin",
  },
  deck:
    "300 y 600 mL/min son clases de caudal, no valores fijos después de instalar la bomba. La selección debe convertir primero la tarea de líquido en un caudal mínimo, determinar después la presión que exige el circuito real y, por último, confirmar el punto de funcionamiento mediante la curva de la bomba y un ensayo del prototipo.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "En tareas de limpieza, cambio de fluido, prellenado, circulación y evacuación de residuos, el equipo no necesita un valor de catálogo aislado de sus condiciones, sino completar el volumen objetivo dentro del tiempo y del circuito especificados. Las bombas de las clases 300 mL/min y 600 mL/min sólo son comparables cuando el caudal y la presión se refieren al mismo punto de funcionamiento.",
    },
    {
      type: "notice",
      label: "Conclusión del proyecto:",
      text: "Calcule primero el caudal requerido y después calcule o mida la diferencia de presión del sistema a ese caudal objetivo. A continuación, consulte la curva oficial de caudal-presión y verifíquela en el circuito completo del prototipo. No combine el caudal sin carga y la presión nominal para formar un punto de funcionamiento inexistente.",
    },
  ],
  sections: [
    {
      title: "1. Primero, sitúe “300” y “600” en sus condiciones de ensayo",
      blocks: [
        {
          type: "paragraph",
          text: "300 mL/min o 600 mL/min en las especificaciones de las microbombas de diafragma generalmente describen el caudal sin carga o el caudal máximo en condiciones específicas de medio, suministro de energía y baja diferencia de presión. Después de instalar la bomba en el instrumento, la tubería de succión, la tubería de descarga, la válvula, el conector, el filtro, la celda de flujo, la aguja, la diferencia de nivel del líquido y la viscosidad del medio cambiarán la diferencia de presión a través de la bomba y el caudal real se moverá a otro punto de la curva.",
        },
        {
          type: "figure",
          src: `${ARTICLE_01_ASSET_BASE}/article-figure-en.webp`,
          alt: "Proceso de selección de una microbomba de diafragma: del caudal requerido y la resistencia del sistema al punto de funcionamiento real",
          width: 2560,
          height: 1920,
          caption:
            "Ruta de selección para microbombas de diafragma de 300 mL/min y 600 mL/min. Las curvas y valores de la figura se utilizan para ilustrar el método y no representan las curvas medidas reales de modelos específicos.",
        },
        {
          type: "table",
          headers: ["cantidad a comparar", "significado correcto", "no debe entenderse de esta manera"],
          rows: [
            [
              "caudal sin carga",
              "Especificar puntos finales de caudal o niveles de caudal en condiciones de carga baja",
              "El dispositivo puede generar continuamente este caudal bajo cualquier contrapresión.",
            ],
            [
              "Presión nominal",
              "Se permite el uso de indicadores de capacidad de presión en condiciones específicas",
              "La bomba aún mantiene el caudal sin carga bajo esta presión.",
            ],
            [
              "Punto de funcionamiento real",
              "La intersección de la curva de la bomba y la curva del sistema actual.",
              "Se puede determinar basándose únicamente en el modelo de bomba o en la presión estática de salida.",
            ],
          ],
        },
      ],
    },
    {
      title: "2. Paso 1: Calcule el caudal mínimo utilizando el volumen de la tarea y el tiempo de bombeo efectivo",
      blocks: [
        {
          type: "formula",
          expression: "Qrequired = Vtask ÷ teffective",
          note: "V tarea es el volumen único de entrega, limpieza o desperdicio, y t efectivo es el tiempo de bombeo real permitido en el programa. Si se usa mL para V y min para t, el resultado es directamente mL/min; si se usa s para t, primero se obtiene mL/s y luego se multiplica por 60 para convertir a mL/min.",
        },
        {
          type: "paragraph",
          text: "Los ritmos del equipo a menudo no equivalen al tiempo de bombeo efectivo. El cambio de válvula, el juicio de nivel, el remojo, la ventilación y los retrasos de control ocupan ciclos, y estas fases sin bombeo deben deducirse del tiempo total del ciclo al realizar el cálculo. Si el programa tiene un segmento de descarga rápida a corto plazo, la demanda promedio y la demanda máxima del segmento también deben definirse por separado.",
        },
        {
          type: "table",
          headers: [
            "Indicar tareas (casos no de clientes)",
            "Volumen de tareas",
            "Tiempo de bombeo efectivo",
            "caudal promedio más bajo",
            "Puntos clave para comprobar más tarde",
          ],
          rows: [
            ["Precarga de pequeño volumen", "120 mL", "45 s", "160 mL/min", "Arranque, autocebado y escape"],
            ["Limpieza rápida", "400 mL", "60 s", "400 mL/min", "Caída de presión en la tubería con flujo alto"],
            ["ciclo de residuos", "250 mL", "50 s", "300 mL/min", "Cambios de nivel de líquido y contrapresión terminal"],
          ],
        },
        {
          type: "notice",
          label: "Inspección unitaria:",
          text: "Por ejemplo, 120 mL ÷ 45 s = 2,667 mL/s; convertido a minutos, es 160 mL/min. La unidad de tiempo no está unificada, que es el lugar donde es más probable que se produzca un error de 60 veces en el cálculo del caudal requerido.",
        },
      ],
    },
    {
      title: "3. Paso 2: escriba la resistencia del camino del líquido en un balance de presión direccional",
      blocks: [
        {
          type: "paragraph",
          text: "Primero, estipule que el líquido fluya desde el extremo de la fuente hasta el final y utilice uniformemente presión manométrica o presión absoluta. La diferencia de presión que el sistema requiere que la bomba proporcione bajo el caudal objetivo Q se puede enumerar en la siguiente fórmula; tanto la pérdida en el camino como la pérdida local toman valores positivos según la dirección del flujo.",
        },
        {
          type: "formula",
          expression:
            "ΔPrequired(Q) = ΔPfriction(Q) + ΣΔPlocal(Q) + [Pterminal − Psource] + ρg[zterminal − zsource]",
          note: "La diferencia zterminal − zsource se toma con signo: es positiva cuando el terminal está por encima de la fuente, porque la bomba debe vencer la presión estática, y negativa cuando la gravedad favorece el flujo. Pterminal − Psource se calcula con la misma referencia de presión y también conserva su signo.",
        },
        {
          type: "paragraph",
          text: "Esta relación se utiliza para evitar que falten términos y no significa que todos los componentes puedan predecirse con precisión mediante una fórmula simplificada. Los componentes clave como filtros, válvulas, agujas y celdas de flujo deben dar prioridad a la curva de caída de presión del fabricante o a los datos medidos reales al caudal correspondiente; el lado de succión también debe verificar por separado la presión absoluta de entrada, la reposición de líquido y el riesgo de cavitación.",
        },
        {
          type: "table",
          headers: ["Fuente de resistencia", "por qué cambia", "Impacto en la selección"],
          rows: [
            ["tubería", "Diferentes diámetros interiores, longitudes, curvaturas y deformaciones de mangueras.", "La misma bomba tiene diferentes caudales en diferentes tuberías."],
            ["Válvulas y accesorios", "El diámetro interno, Cv/Kv y la reducción local son diferentes", "Puede convertirse en el cuello de botella de toda la línea de líquido."],
            ["filtrar", "La caída de presión es diferente entre piezas nuevas y después de la carga.", "Debería cubrir los estados cercanos al punto de reemplazo."],
            ["Nivel de líquido y presión del recipiente.", "Cambios en el nivel del líquido de origen, la altura de la terminal o la presión del recipiente", "Cambiará el término de presión estática y las condiciones de entrada."],
            ["estructura terminal", "Resistencia de la aguja, boquilla, cámara de presión positiva o celda de flujo", "Puede convertir los problemas de flujo en problemas de alta contrapresión."],
          ],
        },
      ],
    },
    {
      title: "4. Ejemplo con parámetros públicos de FOREACH: un caudal mayor no implica mayor capacidad en todos los aspectos",
      blocks: [
        {
          type: "paragraph",
          text: "DPL30 y DPL60 en la información pública de FOREACH se pueden utilizar para ilustrar diferentes dimensiones de parámetros. Los niveles de caudal sin carga de los dos son diferentes, la presión nominal pública es de 100 kPa y las alturas de autocebado son de 6 mH₂O y 3 mH₂O respectivamente. El caudal, la autocebación y la presión deben comprobarse por separado.",
        },
        {
          type: "table",
          headers: ["Comparar dimensiones", "Parámetros representativos del DPL30", "Parámetros representativos del DPL60", "Significado de la selección"],
          rows: [
            ["Caudal público sin carga", "300 mL/min", "600 mL/min", "El punto final de baja diferencia de presión no es un valor garantizado para la máquina instalada."],
            ["Calificación de presión pública", "100 kPa", "100 kPa", "El caudal disponible debe leerse a la presión objetivo"],
            ["Altura autocebante pública", "6 mH₂O", "3 mH₂O", "Un mayor flujo no significa una mayor autocebado"],
            ["Conexiones de uso común", "Manguera de 3,2 mm de diámetro interior.", "Manguera de 3,2 mm de diámetro interior.", "La misma interfaz no significa la misma resistencia del sistema"],
            [
              "Priorizar escenarios de evaluación",
              "Menor flujo de trabajo o mayor enfoque en la altura de succión",
              "Transferencias de mayor volumen, cambios rápidos de fluidos o limpieza",
              "El punto de funcionamiento real sigue siendo la referencia final",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Si la restricción principal proviene de una aguja fina, un tubo angosto, un filtro o una cámara de presión positiva, primero verifique el diferencial de presión total al caudal objetivo. Cuando las plataformas de flujo ordinarias no tienen capacidad suficiente en esta área, es necesario evaluar plataformas de alta presión como la DPL30H en lugar de simplemente reemplazar 300 mL/min por 600 mL/min.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "Ver",
              label: "Bomba de diafragma líquido DPL30",
              href: "/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump",
              suffix: ".",
            },
            {
              prefix: "Ver",
              label: "Bomba de diafragma líquido DPL60",
              href: "/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump",
              suffix: ".",
            },
            {
              prefix: "entender",
              label: "Método de lectura de la curva caudal-presión de la microbomba de diafragma",
              href: "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide",
              suffix: ".",
            },
          ],
        },
      ],
    },
    {
      title: "5. Compare las bombas candidatas en el mismo punto de funcionamiento",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Anote el volumen de la tarea, el tiempo de bombeo efectivo, la cantidad de ciclos por día y si hay períodos de caudal máximo.",
            "Dibuje la ruta completa del fluido desde la fuente hasta el final, registrando el diámetro y la longitud de la tubería, válvulas, accesorios, filtros, agujas, cámaras, presiones de los recipientes y diferencias de altura con signos.",
            "Calcule o mida la pérdida de entrada, la pérdida de salida y la diferencia de presión a través de la bomba al caudal objetivo.",
            "Alinee las definiciones de medio, temperatura, suministro de energía, velocidad y presión de la curva de la bomba candidata para leer el caudal disponible alrededor de la presión diferencial objetivo.",
            "Cubre los niveles mínimos de líquido, la carga del filtro, el voltaje mínimo permitido, los límites de los medios y las diferencias de muestras para confirmar que las condiciones operativas más adversas aún cumplen con la misión.",
            "Luego verifique el autocebante, los materiales, la vida útil, el ruido, el aumento de temperatura, el rango de control y el espacio de instalación, y libérelo en el prototipo completo.",
          ],
        },
      ],
    },
    {
      title: "6. La verificación del prototipo debe cubrir la línea de base y las condiciones más desfavorables.",
      blocks: [
        {
          type: "table",
          headers: ["variable", "condiciones base", "condiciones más desfavorables", "registro sugerido"],
          rows: [
            ["Nivel del depósito", "Nivel habitual o máximo", "Nivel mínimo permitido", "Presión de entrada, tiempo de arranque y caudal"],
            ["filtrar", "piezas nuevas", "Caída de presión equivalente cerca del punto de reemplazo", "Diferencial de presión del filtro y flujo de la bomba"],
            ["Fuente de alimentación", "Tensión nominal", "Voltaje mínimo permitido en el extremo de la bomba", "Tensión, corriente, velocidad y arranque."],
            ["Fluido", "Temperatura y viscosidad de referencia", "Límites permitidos", "Caudal, burbujas y respuesta de las válvulas"],
            ["Muestras de bomba", "Varias muestras iniciales", "Muestras de bajo rendimiento o de distintas etapas de vida", "Promedio, dispersión, tendencia y fugas"],
          ],
        },
        {
          type: "notice",
          label: "Límites de la evidencia:",
          text: "Los parámetros de este artículo explican el criterio de selección publicado; las fórmulas y los ejemplos sirven para una evaluación técnica preliminar. El resultado final debe basarse en especificaciones controladas, curvas oficiales, el fluido real y ensayos del prototipo completo.",
        },
      ],
    },
    {
      title: "Conclusión: elija el punto operativo que cumpla con la tarea, no un número de catálogo mayor",
      blocks: [
        {
          type: "paragraph",
          text: "Una bomba de la clase de 300 mL/min puede ser más adecuada cuando el caudal requerido es menor y preocupa la altura de aspiración; una de 600 mL/min puede convenir más para cambios rápidos de líquido y transferencias de mayor volumen. Pero toda conclusión debe indicar también la versión de presión, el nivel del líquido, el fluido, la alimentación y la versión del circuito. Incluir el caudal requerido, la diferencia de presión del sistema y la curva de la bomba en una misma tabla de validación ayuda a evitar tanto el subdimensionamiento como un sobredimensionamiento inútil.",
        },
      ],
    },
  ],
  faqTitle: "Preguntas frecuentes｜Selección de microbombas de diafragma de 300 mL/min y 600 mL/min",
  faqItems: [
    {
      question: "El equipo requiere 300 mL/min. ¿Debo seleccionar directamente una bomba de 600 mL/min y dejar un margen?",
      answer:
        "Esto no se puede juzgar directamente. Primero se debe aclarar la diferencia de presión, el nivel de líquido, el medio y el tiempo de bombeo efectivo correspondiente a la demanda de 300 mL/min y luego se debe leer la curva de bombeo candidata. Una plataforma de gran tamaño también puede reducir la resolución de control de baja velocidad y aumentar el ruido, la ondulación, el consumo de energía y los costos de espacio.",
    },
    {
      question: "Si la velocidad de la bomba de 600 mL/min se ajusta a 300 mL/min, ¿es equivalente a una bomba de 300 mL/min?",
      answer:
        "No equivalente. La cámara de la bomba, la respuesta de la válvula, el autocebado, la pulsación, el motor y la estabilidad a baja velocidad de los dos tipos de productos pueden ser diferentes. El ajuste de velocidad también cambiará la curva de la bomba y debe probarse a la velocidad objetivo y a la contrapresión real.",
    },
    {
      question: "¿Por qué DPL30 y DPL60 no son intercambiables aunque ambos tienen una presión nominal de 100 kPa?",
      answer:
        "La presión nominal es sólo una dimensión. Diferentes flujos sin carga, altura autocebante, potencia, estructura, curva de trabajo y rango de control determinan sus rangos de trabajo disponibles en el equipo.",
    },
    {
      question: "¿Cuándo debería cambiar de una plataforma de flujo convencional a una bomba de diafragma de alta presión?",
      answer:
        "Cuando la diferencia de presión total del sistema al caudal objetivo está cerca o excede la curva disponible de una bomba convencional, y la resistencia principal proviene de agujas finas, tubos estrechos, filtros, cámaras de presión positiva o extremos de alta resistencia, se debe evaluar una plataforma de mayor presión y se debe verificar simultáneamente la presión de trabajo permitida de toda la línea de líquido.",
    },
  ],
  cta: {
    title: "¿Necesita comparar bombas de diafragma de 300 mL/min con 600 mL/min?",
    description:
      "Se pueden proporcionar el volumen de la tarea, el tiempo de bombeo efectivo, el medio, el diámetro de la tubería, la longitud de la tubería, el nivel del líquido, la presión de entrada, la contrapresión de salida, las válvulas, los filtros y las condiciones de suministro de energía para facilitar la evaluación de las bombas candidatas en función de puntos de operación reales.",
    contactLabel: "contacta a un ingeniero",
    productsLabel: "Ver productos de bombas de diafragma",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const diaphragmPump300MlMinFlowMarginEsCopy = {
  metadata: {
    title: "¿Qué margen de caudal debe dejarse al integrar una microbomba de diafragma de 300 mL/min? Ejemplo con FOREACH",
    seoTitle:
      "Margen de caudal para una microbomba de 300 mL/min: peor caso y aceptación | FOREACH",
    seoDescription:
      "El margen de caudal instalado de una microbomba de diafragma de 300 mL/min no es un porcentaje fijo. La guía define escenarios de peor caso e incorpora contrapresión, carga del filtro, alimentación, fluido, variación entre muestras, incertidumbre de medida y criterios de aceptación.",
    coverImage: `${ARTICLE_02_ASSET_BASE}/article-cover.webp`,
    coverAlt: "Ensayo de caudal de una microbomba de diafragma FOREACH en un vídeo oficial de Douyin",
  },
  deck:
    "El margen no se obtiene multiplicando siempre el caudal objetivo por 1,2 o 1,3. Debe comparar el caudal conservador disponible con la demanda máxima del equipo dentro de un mismo escenario de peor caso, con un tratamiento predefinido de la incertidumbre de medida y criterios de aceptación explícitos.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Cada circuito consume el margen de forma distinta: la caída de presión del filtro aumenta con la carga; el nivel mínimo empeora las condiciones de entrada; y la viscosidad, la alimentación, las tolerancias de la tubería, la dispersión entre bombas y las etapas de vida también desplazan el punto de funcionamiento. Restar la demanda media al valor sin carga de 300 mL/min no produce por sí solo un margen demostrable para la liberación.",
    },
    {
      type: "notice",
      label: "Conclusión del proyecto:",
      text: "Primero defina la demanda máxima del dispositivo y luego obtenga caudal disponible conservador para cada uno de los peores escenarios que pueden ocurrir. Sólo cuando el límite inferior del caudal disponible en el mismo escenario cumple con el límite superior de la demanda y el margen mínimo especificado por el proyecto se puede determinar que el margen es suficiente.",
    },
  ],
  sections: [
    {
      title: "1. ¿Por qué no es riguroso aplicar siempre un margen del 20 % o del 30 %?",
      blocks: [
        {
          type: "paragraph",
          text: "Del 20% al 30% se puede utilizar como recordatorio en la etapa de diseño conceptual, pero no debería convertirse directamente en el estándar de lanzamiento para todos los proyectos. Algunos equipos se ven afectados principalmente por la caída de presión al final de la vida útil del filtro, y otros se ven afectados por el nivel mínimo de líquido, la viscosidad a baja temperatura o el voltaje del terminal de la bomba; las fuentes de cambios y las consecuencias permisibles son diferentes, y los márgenes requeridos también son diferentes.",
        },
        {
          type: "figure",
          src: `${ARTICLE_02_ASSET_BASE}/article-figure-en.webp`,
          alt: "El límite superior de demanda y el límite inferior disponible se combinan para calcular el margen de caudal conservador de la microbomba de diafragma y pasan a través de las dos compuertas de liberación.",
          width: 2560,
          height: 2160,
          caption:
            "El margen de caudal debe comparar la demanda máxima con la capacidad disponible en las condiciones operativas más adversas, en lugar de comparar el caudal objetivo con el caudal sin carga. La curva de la figura es una representación esquemática del método.",
        },
        {
          type: "paragraph",
          text: "El cálculo del saldo incluye tanto el aumento de la demanda como la disminución de la oferta. El lado de la demanda debe cubrir el volumen máximo de tareas, el tiempo efectivo más corto y la tolerancia permitida; el lado del suministro debe cubrir la presión real, el suministro de energía, los medios, los filtros, las diferencias de muestra y las etapas de vida.",
        },
      ],
    },
    {
      title: "2. Escriba el margen en una relación verificable.",
      blocks: [
        {
          type: "formula",
          expression: "M = Qavailable,worst ÷ Qrequired,max − 1",
          note: "Qavailable,worst debe proceder de la curva o de una medición real a la presión especificada y en el escenario más desfavorable; no puede sustituirse por el valor sin carga de 300 mL/min. Qrequired,max se determina con el volumen máximo de la tarea, el tiempo efectivo de bombeo más corto y la tolerancia de la demanda.",
        },
        {
          type: "paragraph",
          text: "La M dada por la fórmula sólo pertenece al escenario definido. Si la versión del circuito de líquido, el estado del filtro, los medios, el control de la bomba o los límites ambientales cambian, se deben recalcular o probar, y el porcentaje obtenido de una vez no se puede copiar directamente a otros equipos.",
        },
      ],
    },
    {
      title: "3. Las condiciones más desfavorables sólo deben combinarse si pueden coexistir en un mismo escenario",
      blocks: [
        {
          type: "paragraph",
          text: "El peor de los casos es no superponer mecánicamente los valores extremos de cada columna de la tabla. Debe describir un conjunto de condiciones que realmente pueden ocurrir en un dispositivo durante una determinada etapa operativa, estado del ciclo de vida y condición ambiental, y explicar por qué cada condición existe al mismo tiempo. Los límites que no pueden ocurrir simultáneamente deben dividirse en múltiples escenarios y evaluarse por separado.",
        },
        {
          type: "table",
          headers: ["Procesamiento de escena", "Ejemplo", "Método contable"],
          rows: [
            [
              "Se puede combinar",
              "Si las especificaciones permiten que la unidad arranque a bajas temperaturas, voltaje mínimo del terminal de la bomba, nivel mínimo de líquido y cuando el filtro está cerca del punto de cambio.",
              "Como prueba de escenario de arranque a baja temperatura al final de su vida útil basada en evidencia",
            ],
            [
              "debe evaluarse por separado",
              "La baja temperatura, la alta viscosidad y la temperatura máxima del líquido pertenecen a límites ambientales mutuamente excluyentes",
              "Cree escenas de baja temperatura y escenas de alta temperatura por separado y no las superponga en el mismo cálculo.",
            ],
            [
              "Necesita evidencia adicional",
              "Multiplique la disminución de la vida útil de la bomba, las muestras de rendimiento más bajo y las tolerancias extremas del diámetro de la tubería por el peor caso de un solo punto.",
              "Confirmar la correlación estadística, la cobertura de la muestra y las fuentes de tolerancia antes de definir límites conservadores.",
            ],
          ],
        },
        {
          type: "notice",
          label: "Registro de escena:",
          text: "Cada peor de los casos debe tener al menos un nombre, etapa del ciclo de vida, versión del circuito de fluido, medio y temperatura, suministro de energía, nivel de fluido, estado del filtro, estado de la muestra de la bomba y procedimientos de control. De esta manera se puede reproducir la prueba y evitar que valores extremos mutuamente excluyentes generen estados inexistentes del dispositivo.",
        },
      ],
    },
    {
      title: "4. ¿Qué factores consumirán el margen de caudal?",
      blocks: [
        {
          type: "table",
          headers: ["factores", "Que comprobar", "¿Por qué se consume el saldo?"],
          rows: [
            ["Máxima demanda de equipos.", "Volumen máximo, tiempo mínimo de validez, segmento pico y tolerancia del programa", "La demanda promedio puede subestimar el valor máximo"],
            ["presión del sistema", "Presión de entrada, presión de salida y diferencia de presión total al caudal objetivo", "El caudal generalmente disminuye a medida que aumenta el diferencial de presión."],
            ["estado del filtro", "Piezas nuevas, curvas de carga y caída de presión cerca del punto de reemplazo", "El punto de operación se moverá hacia un menor caudal a medida que se carga."],
            ["Tuberías y montaje", "Diámetro interior real, longitud, curvatura, diámetro de ajuste y tolerancia de lote", "La reducción local del diámetro puede convertirse en la principal resistencia."],
            ["Fluido y entorno", "Viscosidad, temperatura, desgasificación, partículas y respuesta de las válvulas", "Las curvas públicas obtenidas con agua no representan necesariamente el fluido real"],
            ["Poder y control", "Voltaje mínimo de la bomba, límite de corriente, rango de PWM y caída de presión del arnés", "La velocidad y la capacidad de arranque pueden disminuir."],
            ["Muestras y vida útil", "Dispersión de bombas múltiples, rodaje, horas de funcionamiento y tendencias de rendimiento", "Una única muestra inicial no puede representar la producción en masa ni las etapas de vida."],
            ["Sistema de medición", "Método de flujo, tiempo de muestreo, calibración, repetibilidad y efectos ambientales.", "La incertidumbre de la medición comprime los márgenes demostrables"],
          ],
        },
      ],
    },
    {
      title: "5. Incorpore la incertidumbre de medida a los criterios de aceptación",
      blocks: [
        {
          type: "paragraph",
          text: "El mismo caudal real también puede dar resultados diferentes debido a la precisión del medidor de flujo, la resolución de pesaje, la conversión de densidad, el tiempo de muestreo, la pulsación y la repetibilidad. Los proyectos deben determinar presupuestos de incertidumbre, reglas de cobertura y reglas de decisión antes de realizar las pruebas, en lugar de interpretaciones ad hoc cuando los resultados se acercan a los límites.",
        },
        {
          type: "formula",
          expression: "Mconservative = Qavailable,lower ÷ Qrequired,upper − 1",
          note: "Qavailable,lower se obtiene a partir del ensayo del escenario más desfavorable, incorporando la incertidumbre de medida, la repetibilidad y las reglas de cobertura de muestras. Qrequired,upper incluye el volumen de la tarea, el tiempo efectivo y la tolerancia de control. El proyecto debe definir de antemano la confianza estadística o la regla de cobertura de ingeniería aplicada a ambos límites.",
        },
        {
          type: "table",
          headers: ["Aspecto de liberación", "Criterio preliminar recomendado"],
          rows: [
            [
              "Capacidad de caudal",
              "Qavailable,lower ≥ Qrequired,upper; si el proyecto define además un margen mínimo Mmin, también debe cumplirse Mconservative ≥ Mmin",
            ],
            ["Arranque y autocebado", "Cada escenario prescrito logra la tasa de éxito definida por el proyecto y el tiempo máximo de inicio."],
            ["límite de presión", "El estado estable y el estado transitorio permitido no exceden los límites de trabajo permitidos de cada componente del circuito de líquido bajo el medio y la temperatura reales."],
            ["Aumento eléctrico y de temperatura.", "El voltaje, la corriente, la protección del variador y el aumento de temperatura en estado estable de los terminales de la bomba están dentro de los límites de diseño."],
            ["Repetibilidad y cobertura de muestra.", "El número especificado de muestras, el número de repeticiones y las etapas de vida cumplen los mismos criterios."],
          ],
        },
        {
          type: "paragraph",
          text: "Si el proyecto utiliza una regla de determinación con una banda de protección, el tamaño de la banda de protección debe determinarse según las capacidades de medición y el riesgo de error de cálculo. No existe un valor k uniforme o un porcentaje fijo que sea adecuado para todos los sistemas de medición. La clave es hacer que las reglas sean rastreables, recalculables y congeladas antes de realizar las pruebas.",
        },
      ],
    },
    {
      title: "6. Cálculo esquemático: el margen original y el margen demostrable son diferentes",
      blocks: [
        {
          type: "paragraph",
          text: "Los siguientes números sólo se utilizan para ilustrar el método y no representan la medición real de los equipos del cliente ni de los productos FOREACH. Suponga una demanda máxima de 180 mL/min; la bomba candidata puede suministrar 260 mL/min a voltaje nominal y contrapresión objetivo; En el peor de los casos confirmado que podría ocurrir, el caudal disponible medido en el peor de los casos es de 230 mL/min.",
        },
        {
          type: "formula",
          expression: "Mraw = 230 ÷ 180 − 1 ≈ 27.8%",
          note: "Si se calcula directamente con una carga en vacío de 300 mL/min, se obtendrá un margen de superficie del 66,7%, pero esta cifra no incluye la presión del sistema ni las condiciones más desfavorables.",
        },
        {
          type: "paragraph",
          text: "Suponga que el proyecto obtiene un límite inferior de caudal disponible de 225 mL/min de acuerdo con las reglas de incertidumbre establecidas, e incorpora el volumen de la tarea y la tolerancia de tiempo para obtener un límite superior de demanda de 185 mL/min. El margen conservador es de aproximadamente el 21,6%. El proyecto debería comparar el 21,6% con el mínimo M predefinido, en lugar de utilizar el 27,8% o el 66,7% para elegir una conclusión que sea más beneficiosa para sí mismo.",
        },
        {
          type: "formula",
          expression: "Mconservative = 225 ÷ 185 − 1 ≈ 21.6%",
          note: "225 mL/min y 185 mL/min son ambos límites esquemáticos. Los proyectos reales deben utilizar sus propias capacidades de medición, tolerancias de tareas, planes de muestra y reglas de juicio.",
        },
      ],
    },
    {
      title: "7. Tomando como ejemplo la bomba FOREACH de 300 mL/min, debe comenzar desde la contrapresión objetivo.",
      blocks: [
        {
          type: "paragraph",
          text: "La información pública de FOREACH DPL30 indica 300 mL/min de caudal sin carga, 100 kPa de presión nominal y 6 mH₂O de altura de autocebado. El margen disponible no se obtiene con «300 menos el caudal objetivo»: debe partir de la curva oficial a la contrapresión objetivo y verificarse después en el circuito final, midiendo entrada, salida y caudal real.",
        },
        {
          type: "paragraph",
          text: "Se recomienda dividir la verificación en tres niveles: condiciones operativas base, fluctuaciones normales y escenarios más adversos. Si el requisito del equipo todavía está cerca de 300 mL/min bajo contrapresión alta, se debe volver a verificar la plataforma de presión requerida; el punto final sin carga no se convertirá en una capacidad de trabajo de alta contrapresión debido a un aumento en el margen porcentual.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "Ver",
              label: "Bomba de diafragma líquido DPL30",
              href: "/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump",
              suffix: ".",
            },
            {
              prefix: "Referencia",
              label: "Guía de selección de bomba de diafragma para líquidos DPL30",
              href: "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide",
              suffix: ".",
            },
          ],
        },
      ],
    },
    {
      title: "8. Matriz de prueba de márgenes y registro de datos.",
      blocks: [
        {
          type: "table",
          headers: ["dimensiones de prueba", "nivel de referencia", "límite o nivel de vida", "Resultado sugerido"],
          rows: [
            ["Alimentación", "Tensión nominal en bornes de la bomba", "Tensión mínima admisible en bornes", "Caudal, tiempo de arranque y corriente"],
            ["filtrar", "piezas nuevas", "Caída de presión equivalente cerca del punto de reemplazo", "Diferencia de presión del filtro, presión y caudal en ambos extremos de la bomba."],
            ["nivel de liquido", "Nivel de líquido común o máximo", "Nivel de líquido mínimo permitido", "Presión de entrada, primer arranque y tiempo de asentamiento."],
            ["Fluido", "Fluido y temperatura de referencia", "Límites permitidos de viscosidad, temperatura y contenido de gas", "Caudal, burbujas, ruido y respuesta de las válvulas"],
            ["muestra de bomba", "Varias muestras iniciales", "Muestras de bajo rendimiento o etapa de vida útil", "Modos de media, dispersión, tendencia y fallo"],
            ["Sistema de medida", "Medición de referencia tras la calibración", "Caudal bajo o pulsante y muestreo prolongado", "Datos brutos, incertidumbre y decisión de aceptación"],
          ],
        },
        {
          type: "notice",
          label: "Límites de la evidencia:",
          text: "Las fórmulas y cifras de este artículo sirven para establecer el método de cálculo; no constituyen un compromiso general de margen. La liberación formal debe citar las especificaciones controladas, la versión de la curva, la versión del circuito, el fluido real, la definición del escenario, los datos originales del ensayo y los criterios de aceptación aprobados.",
        },
      ],
    },
    {
      title: "Conclusión: El margen debe demostrarse mediante escenarios, datos y criterios.",
      blocks: [
        {
          type: "paragraph",
          text: "Un margen de caudal razonable no es que cuanto mayor sea mejor, ni tampoco es un ratio empírico fijo. Debería responder a tres preguntas: cómo se obtiene la demanda máxima, por qué puede ocurrir el peor de los casos y cuánta capacidad demostrable queda después de tener en cuenta la incertidumbre de la medición. Escriba estas condiciones en la matriz de prueba y las reglas de publicación. Sólo cuando se cambie más tarde el filtro, la tubería, el medio o la versión del control, sabrá qué pieza debe volver a validarse.",
        },
      ],
    },
  ],
  faqTitle: "Preguntas frecuentes｜margen de caudal de microbomba de diafragma de 300 mL/min",
  faqItems: [
    {
      question: "Si la bomba de 300 mL/min se utiliza para una demanda de 200 mL/min, ¿tiene naturalmente un margen del 50 %?",
      answer:
        "No. Este cálculo solo es posible si el caudal conservador disponible de la bomba bajo la misma presión objetivo, medio, suministro de energía y el peor de los casos sigue siendo 300 mL/min, y el límite de demanda superior es 200 mL/min. El valor sin carga no se puede utilizar directamente como caudal disponible.",
    },
    {
      question: "¿Se puede utilizar directamente el margen del 20%-30% como estándar de la empresa?",
      answer:
        "Puede utilizarse como referencia de diseño para activar una verificación detallada, pero no debe utilizarse como criterio de publicación independiente. Los estándares de la empresa también deben estipular principios de combinación de escenarios, versiones de circuitos de líquido, cobertura de vida y muestra, incertidumbre de medición, límites superiores de requisitos y criterios de aprobación claros.",
    },
    {
      question: "¿Por qué debería comprobarse el filtro lo más cerca posible del punto de sustitución?",
      answer:
        "La caída de presión generalmente aumenta después de cargar el filtro y el punto de funcionamiento de la bomba puede cambiar hacia caudales más bajos. La prueba puede utilizar el elemento filtrante de la etapa de vida real o utilizar la caída de presión equivalente con evidencia para reproducir el límite. El nuevo estado del elemento filtrante no puede considerarse como un estado a largo plazo.",
    },
    {
      question: "¿Cómo demostrar que pueden ocurrir varias peores condiciones al mismo tiempo?",
      answer:
        "Vuelva a colocarlos en un estado específico del equipo: misma etapa del ciclo de vida, entorno, niveles de fluido, estado del filtro, suministro de energía y procedimientos de control, y confirme que las especificaciones del producto permitan esa combinación. Las condiciones mutuamente excluyentes deben dividirse en diferentes escenarios y los valores extremos que carecen de evidencia de correlación no deben multiplicarse mecánicamente.",
    },
    {
      question: "El caudal medido es exactamente igual a la demanda mínima. ¿Se puede considerar calificado?",
      answer:
        "Por lo general, no se puede simplemente mirar que las lecturas sean iguales. También se deben considerar la incertidumbre de la medición, la repetibilidad, la dispersión de la muestra y las tolerancias de la demanda de acuerdo con reglas de decisión preespecificadas; si el límite inferior del caudal disponible es inferior al límite superior de la demanda, no se ha demostrado un margen suficiente.",
    },
  ],
  cta: {
    title: "¿Necesita calcular el margen de caudal al integrar una bomba de diafragma de 300 mL/min?",
    description:
      "Puede facilitar el volumen máximo por tarea, el tiempo efectivo de bombeo, la diferencia de presión del circuito, el fluido y la temperatura, la tensión mínima, el nivel del líquido, el estado del filtro a lo largo de su vida útil, el plan de muestreo y la capacidad de medida disponible. Con esos datos pueden definirse escenarios desfavorables reproducibles y criterios de aceptación.",
    contactLabel: "contacta a un ingeniero",
    productsLabel: "Ver productos de bombas de diafragma",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
