import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const TUBE_DIAMETER_ARTICLE_ASSET_BASE =
  "/images/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow";

const SUCTION_DISCHARGE_ARTICLE_ASSET_BASE =
  "/images/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump";

export const tubeInnerDiameterAffectsDiaphragmPumpFlowEsCopy = {
  metadata: {
    title: "¿Por qué cambia tanto el caudal real al modificar el diámetro del tubo con la misma microbomba de diafragma?",
    seoTitle: "Caudal tras cambiar el diámetro interior del tubo: diagnóstico por presión | FOREACH",
    seoDescription:
      "Si el caudal de una microbomba de diafragma disminuye tras cambiar el tubo, conviene distinguir entre diámetro interior, longitud, paso interno de los conectores y estado de la bomba. Esta guía propone medir conjuntamente presión de entrada, presión de salida y caudal.",
    coverImage: `${TUBE_DIAMETER_ARTICLE_ASSET_BASE}/article-cover.webp`,
    coverAlt: "Tubos y ensayo de caudal de una microbomba de diafragma FOREACH en un vídeo oficial de Douyin",
  },
  deck:
    "Incluso si no se reemplaza la bomba, el caudal instalado también puede cambiar debido al diámetro interior, la longitud, la curvatura y el diámetro mínimo de la manguera. Cuando se encuentra \"el caudal cae después de cambiar las tuberías\", la forma eficaz de solucionarlo no es dudar de la bomba primero, ni engrosar todas las mangueras, sino medir simultáneamente la presión de entrada, la presión de salida y el caudal acumulado para determinar dónde se agrega la resistencia.",
  leadBlocks: [
    {
      type: "notice",
      text:
        "Primero confirme que el cambio sea real y después compare la presión antes de la bomba, la presión después de la bomba y el caudal: una caída de la presión absoluta de entrada apunta al lado de aspiración, mientras que un aumento de la contrapresión de salida apunta al lado de descarga. Si ambas presiones se mantienen cerca del estado original pero el caudal sigue siendo anómalo, revise las fugas de aire, la alimentación, las válvulas de la bomba, el fluido y el método de medición.",
    },
    {
      type: "paragraph",
      text:
        "El diámetro exterior de la manguera está relacionado principalmente con la instalación de la interfaz y el fluido pasa a través del orificio interior. Las mangueras con el mismo diámetro exterior pueden tener diferentes diámetros interiores debido a los diferentes espesores de pared; doblar, apretar demasiado la brida o insertar la junta demasiado profundamente también puede formar un canal efectivo que sea más pequeño que el diámetro interior nominal localmente. Lo que realmente es necesario inventariar es el diámetro mínimo efectivo de todo el recorrido del líquido y la caída de presión de cada sección, no el tamaño único del paquete.",
    },
    {
      type: "figure",
      src: `${TUBE_DIAMETER_ARTICLE_ASSET_BASE}/article-figure-en.webp`,
      alt: "Los cambios en el diámetro interior del tubo mueven la curva del sistema y cambian el punto de funcionamiento de la microbomba de diafragma.",
      width: 2560,
      height: 2160,
      caption:
        "Cambiar la tubería no cambiará directamente la curva de la bomba, pero cambiará la diferencia de presión requerida por el sistema en cada caudal y, en última instancia, moverá el punto de intersección de la curva de la bomba y la curva del sistema. La imagen muestra el principio de diagnóstico y no representa los datos medidos reales del modelo específico.",
    },
  ],
  sections: [
    {
      title: "1. Primero, convierta “la caída del caudal después de cambiar la tubería” en datos comparables.",
      blocks: [
        {
          type: "paragraph",
          text:
            "Los caudales antes y después del reemplazo de la tubería solo se pueden comparar cuando los límites de la prueba son consistentes. Cualquier cambio en el voltaje del terminal de la bomba, el medio, la temperatura del líquido, el nivel de almacenamiento del líquido, el extremo de salida, el tiempo de funcionamiento y el método de estadísticas de flujo puede superponerse a los cambios en la tubería. Se recomienda mantener la tubería antigua como referencia y completar las pruebas A/B en la misma bomba.",
        },
        {
          type: "table",
          headers: ["Elementos que deben arreglarse o registrarse", "Método de grabación sugerido", "Error de juicio a evitar"],
          rows: [
            ["Bombas y accionamientos", "La misma bomba; registrar el voltaje de carga final de la bomba, la corriente y los parámetros PWM", "Evaluación errónea de la caída de presión de suministro o el cambio de regulación de velocidad como influencia del diámetro de la tubería"],
            ["Medio y temperatura", "Mismo lote de medios; registrar la temperatura del líquido, la viscosidad o el estado de la fórmula", "Malinterpretar los cambios de viscosidad como diferencias en las mangueras"],
            ["Límite del camino líquido", "Nivel fijo, altura de la punta, posición de la válvula, filtro y aguja.", "Cambiando múltiples elementos de resistencia a la vez, no se puede posicionar"],
            ["Estado de la manguera", "Registre el material, el diámetro interior medido, la longitud, el lote, el radio de curvatura y el método de fijación.", "Compare solo por diámetro exterior o nombre del producto"],
            ["medición de caudal", "Utilice el mismo tiempo acumulativo y realice una validación cruzada mediante el método de pesaje si es necesario", "El flujo pulsante hace que las lecturas instantáneas sean incomparables"],
          ],
        },
        {
          type: "notice",
          text:
            "Si el caudal se recupera después de reinstalar la tubería vieja, pero el problema reaparece después de reinstalar la tubería nueva, hay razones suficientes para centrar la investigación en la tubería nueva, sus uniones, dirección y estado de montaje.",
        },
      ],
    },
    {
      title: "2. Use la presión de entrada, la presión de salida y el caudal para localizar el lado del cuello de botella",
      blocks: [
        {
          type: "paragraph",
          text:
            "El punto de medición de presión debe estar lo más cerca posible de la entrada y salida de la bomba. Mantenga constante el diámetro de presión antes y después de cambiar la tubería y registre el caudal promedio después de la estabilización. Con solo mirar la caída del caudal solo se puede confirmar que el punto de operación ha cambiado; registrar las presiones en ambos extremos juntos hace que sea más fácil determinar si el cambio proviene de la sección de succión, la sección de descarga o fuera del recorrido del líquido.",
        },
        {
          type: "formula",
          expression: "ΔPpump = Pout - Pin",
          note:
            "Pin y Pout deben utilizar la misma referencia de presión. Al comparar la presión diferencial de la bomba, se puede utilizar uniformemente la presión manométrica o la presión absoluta; cuando hay cavitación, se debe utilizar presión absoluta.",
        },
        {
          type: "table",
          headers: ["Principales fenómenos tras la sustitución de tuberías.", "evidencia de presión", "verificación de prioridad"],
          rows: [
            ["La infusión se vuelve más lenta y el flujo disminuye", "La presión de entrada disminuye con respecto a la línea base y la presión de salida no aumenta significativamente.", "El tubo de aspiración es demasiado fino o demasiado largo, está doblado y aplanado, la junta de entrada tiene un diámetro reducido y tiene fugas."],
            ["Capaz de drenar líquido, pero el caudal de descarga disminuye", "La entrada está cerca de la línea base y la contrapresión de salida aumenta.", "Tubo de descarga, accesorio de salida, filtro, válvula, aguja o cámara final"],
            ["La entrada es más baja y la salida es más alta.", "La diferencia de presión en ambos extremos de la bomba se expande al mismo tiempo.", "Agregue resistencia tanto a la sección de succión como a la de descarga, o se cambia toda la tubería al mismo tiempo."],
            ["La presión está cerca de la línea base pero el flujo aún es bajo", "La presión estática promedio en ambos extremos no cambia significativamente.", "Fugas de entrada, burbujas de aire, dinámica de válvulas, voltaje del terminal de la bomba, respuesta del medio o de la medición"],
            ["El caudal aumenta y disminuye de forma cíclica", "La forma de onda de presión fluctúa de manera sincronizada", "Aplanamiento o cierre periódico de la manguera, burbujas, fugas en conexiones, orientación de válvulas o medición inadecuada de un caudal pulsante"],
          ],
        },
        {
          type: "paragraph",
          text:
            "La presión promedio puede enmascarar pulsaciones transitorias en una bomba de diafragma. Si el problema solo ocurre durante el arranque, el cambio de válvula o las fases de alto flujo, se deben observar al mismo tiempo la forma de onda de presión, las burbujas en la sección de tubería transparente y la deformación de la manguera en lugar de simplemente transcribir un valor de visualización estable.",
        },
      ],
    },
    {
      title: "3. ¿Por qué un pequeño cambio en el diámetro interior puede provocar un cambio significativo en la caída de presión?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Cuando se establecen condiciones ideales, como tuberías rectas circulares con diámetros iguales, fluido newtoniano y flujo laminar completamente desarrollado, la sensibilidad de la caída de presión de la tubería recta con respecto al diámetro interior se puede estimar utilizando la relación de Hagen-Poiseuille:",
        },
        {
          type: "formula",
          expression: "ΔP = 128μLQ / (πd⁴)",
          note:
            "μ es la viscosidad dinámica, L es la longitud del tubo, Q es el caudal volumétrico y d es el diámetro interior del tubo. Esta fórmula no incluye efectos de entrada, juntas, válvulas, filtros, deformaciones de mangueras ni pulsaciones de bombas de diafragma, y ​​solo puede usarse para detección primaria bajo las condiciones aplicables.",
        },
        {
          type: "paragraph",
          text:
            "En una comparación teórica, manteniendo el caudal, la longitud y la viscosidad iguales, cuando el diámetro interior se reduce de 3,2 mm a 2,0 mm, la relación de caída de presión de la tubería recta es de aproximadamente 6,55; cuando se reduce a 1,6 mm, la relación es de aproximadamente 16. Esto muestra que el diámetro interior merece ser verificado como prioridad, pero no significa que el caudal real se reducirá 6,55 veces o 16 veces. El caudal real se volverá a estabilizar en el punto donde la curva del nuevo sistema se cruza con la curva de la bomba.",
        },
        {
          type: "links",
          items: [
            {
              prefix: "Para comprender la relación completa entre las curvas de la bomba, las curvas del sistema y los puntos de operación, lea",
              label: "Guía para leer la curva caudal-presión de una bomba de diafragma",
              href: "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide",
              suffix: ".",
            },
            {
              prefix: "Se puede utilizar una estimación preliminar del recorrido del líquido.",
              label: "Herramienta de cálculo de resistencia de fluidos",
              href: "/resources/calculators/fluid-resistance/",
              suffix: ", al final, todavía debe basarse en la prueba real del circuito de líquido.",
            },
          ],
        },
      ],
    },
    {
      title: "4. No te fijes sólo en la manguera: el diámetro mínimo puede quedar oculto dentro de las juntas y componentes",
      blocks: [
        {
          type: "table",
          headers: ["Posibles puntos limitantes", "Métodos de inspección in situ", "Base para el juicio"],
          rows: [
            ["Cuerpo de manguera", "Mida el diámetro interior real, la longitud total y la sección transversal doblada", "¿Se restablecerán la presión y el flujo después de reemplazar el tubo recto corto?"],
            ["Conector o adaptador Pagoda", "Verifique el diámetro mínimo interno del orificio, el paso y la profundidad de inserción", "¿Disminuye la caída de presión después de puentear o reemplazar el conector?"],
            ["Válvulas y filtros", "Pruebe los estados sin carga, acceso a nuevos componentes y cargado, respectivamente.", "Si la diferencia de presión antes y después del componente se convierte en el elemento de presión principal"],
            ["Agujas, boquillas, capilares.", "Compruebe el diámetro interior, la longitud y la forma de entrada.", "Incluso si la longitud es muy corta, puede dominar la resistencia de todo el camino."],
            ["posición fija de la manguera", "Observe ataduras, hebillas, curvas pronunciadas y zonas suavizadas por las altas temperaturas.", "¿Se produce algún aplanamiento parcial o cierre periódico durante el funcionamiento?"],
          ],
        },
        {
          type: "paragraph",
          text:
            "Las dimensiones de la conexión de manguera en los datos del producto se utilizan primero para ilustrar la adaptación de la interfaz y no significan que se pueda mantener el mismo caudal con cualquier longitud, cualquier material y cualquier método de enrutamiento de tubería. Si los filtros, válvulas o agujas ya representan la mayor parte de la caída de presión, es posible que se obtenga poco beneficio al aumentar el diámetro interior de una tubería recta simple.",
        },
      ],
    },
    {
      title: "5. Proceso de diagnóstico de reemplazo segmentado recomendado",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Registre la presión de entrada, la presión de salida, el voltaje del terminal de la bomba, la corriente, el caudal acumulado y el tiempo de arranque bajo la configuración de tubería anterior para establecer una línea de base reproducible.",
            "Reemplace solo un lado de la manguera, dejando el otro lado y los componentes del extremo sin cambios; Pruebe primero el lado de succión y luego el lado de descarga.",
            "Primero use un tubo corto y recto para probar el cuerpo de la manguera y luego agregue gradualmente curvas, juntas, válvulas y filtros de acuerdo con la dirección real.",
            "Cada vez que se agrega un elemento, se registran los cambios de presión y los cambios de flujo antes y después del elemento para encontrar el paso con el mayor aumento en la caída de presión.",
            "Si existe alguna sospecha de una reducción del diámetro local o de la junta, utilice un componente de derivación con un diámetro conocido para verificar el reemplazo y no juzgue según la apariencia.",
            "Repita el ensayo en la posición de instalación final, con el nivel de líquido y el fluido reales y con el programa de control completo; conserve el lote de mangueras, las fotografías y la versión de los datos.",
          ],
        },
        {
          type: "notice",
          text:
            "El propósito de las pruebas segmentarias no es demostrar que \"un determinado diámetro de tubería debe ser correcto\", sino mapear los cambios de flujo en cambios de presión mensurables. Sólo de esta manera habrá límites de proyecto reutilizables cuando se cambien lotes, se cambie el cableado o se agreguen componentes.",
        },
      ],
    },
    {
      title: "6. ¿Cuándo no se puede atribuir el problema al diámetro de la tubería?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Si la prueba A/B no se puede reproducir, o la presión en ambos extremos no cambia de manera constante con los cambios en la tubería, se debe ampliar el alcance del diagnóstico. Las fugas de entrada, el aire atrapado, la viscosidad y temperatura del líquido, la orientación de la válvula, el estado del filtro, el suministro de energía a la bomba, el desgaste de la muestra y la respuesta del medidor de flujo al flujo pulsante pueden causar fenómenos similares.",
        },
        {
          type: "table",
          headers: ["Otros elementos de confirmación", "sugerir evidencia", "Límites que requieren confirmación de ingeniería"],
          rows: [
            ["¿La bomba es normal?", "Repita la prueba en el bucle de referencia de resistencia media y baja especificado", "Los límites de juicio deben derivarse de las especificaciones controladas del modelo correspondiente o de las especificaciones de inspección."],
            ["¿Está calificada la nueva tubería?", "Diámetro interior real medido, espesor de pared, dureza, resistencia a la deformación por presión negativa y por lotes", "Las tolerancias dimensionales y materiales deben ser confirmadas por la cadena de suministro y el departamento de I+D."],
            ["¿Cumple el punto de funcionamiento los requisitos del equipo?", "Registrar de forma continua el caudal, la presión, el aumento de temperatura y el arranque en las condiciones reales", "Los criterios de aceptación deben derivarse del tiempo de ciclo, la precisión de dosificación y los objetivos de vida útil"],
            ["¿Es estable a largo plazo?", "Repita las pruebas al final de la vida útil del filtro, nivel mínimo de líquido y límites de temperatura.", "Las pruebas de agua limpia a corto plazo no se pueden utilizar como sustituto de la verificación de la vida real del medio."],
          ],
        },
      ],
    },
  ],
  faqTitle: "Preguntas frecuentes | Cambios de caudal después de sustituir la tubería",
  faqItems: [
    {
      question: "¿Por qué el caudal sigue siendo diferente después de reemplazar mangueras con el mismo diámetro exterior?",
      answer:
        "Debido a que la tolerancia del espesor de la pared cambiará el diámetro interior, la dureza del material, el estado de flexión y la resistencia a la deformación por presión negativa también cambiarán el diámetro efectivo. Se deben registrar el diámetro interior, la longitud, el radio de curvatura y el lote reales en lugar de simplemente comparar el diámetro exterior.",
    },
    {
      question: "¿Aumentará definitivamente el caudal si se reemplazan todas las mangueras con diámetros interiores más grandes?",
      answer:
        "No necesariamente. Si el tamaño mínimo del orificio de la aguja, filtro, válvula, conector o cavidad final domina la resistencia del sistema, los beneficios de aumentar el diámetro interior de la tubería recta ordinaria pueden ser limitados. Los principales obstáculos deberían identificarse primero mediante diferencias de presión segmentadas.",
    },
    {
      question: "Después de que el diámetro de la tubería se reduzca, ¿la bomba aumentará automáticamente a la presión nominal?",
      answer:
        "Esto no se puede inferir. Los cambios en las tuberías desplazan la curva del sistema y la bomba opera en la intersección de su propia curva de rendimiento y la nueva curva del sistema. La nueva presión y caudal dependen del circuito hidráulico completo, de las curvas de accionamiento y de bomba, y la presión nominal no es un punto de funcionamiento que se alcance automáticamente.",
    },
    {
      question: "¿La reducción repentina del diámetro de sólo una pequeña sección afectará significativamente el caudal?",
      answer:
        "Posiblemente. Además de la pérdida a lo largo del tubo delgado, el diámetro acortado también provocará pérdidas locales como contracción y expansión; cuando su diámetro es mucho menor que el resto del recorrido del líquido, aún puede convertirse en un punto de restricción importante. Debe confirmarse mediante una medición real con derivación o piezas de repuesto.",
    },
    {
      question: "¿Cómo determinar rápidamente si se trata de un problema de tubería nueva o de una bomba?",
      answer:
        "Utilice la misma bomba para realizar una prueba A/B repetible entre las tuberías viejas y nuevas, mientras registra la presión de entrada, la presión de salida, el voltaje del terminal de la bomba y el caudal acumulado. Sólo cuando la tubería vieja se restaura después del reensamblaje y la tubería nueva puede desencadenar excepciones repetidamente, se puede localizar el problema en la tubería nueva y su ensamblaje.",
    },
  ],
  cta: {
    title: "El caudal es anormal después de reemplazar la tubería. ¿Necesitamos localizar juntos el cuello de botella de la línea de líquido?",
    description:
      "Puede facilitar el modelo de bomba, el fluido, el diámetro interior y la longitud reales de la manguera, el paso del conector, las presiones de entrada y salida, la tensión en bornes de la bomba y el caudal antes y después de sustituir la tubería. Con esos datos, el ingeniero podrá evaluar el punto de funcionamiento real.",
    contactLabel: "contacta a un ingeniero",
    productsLabel: "Ver productos de bombas de diafragma",
    productsHref: "/products/pumps/miniature-diaphragm-pumps",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const suctionVsDischargeResistanceDiaphragmPumpEsCopy = {
  metadata: {
    title: "¿Qué resistencia afecta más a una microbomba de diafragma: la del tubo de aspiración o la del tubo de descarga?",
    seoTitle: "Resistencia de aspiración y contrapresión de descarga en microbombas de diafragma | FOREACH",
    seoDescription:
      "La resistencia de aspiración y la de descarga aumentan la presión diferencial exigida a la microbomba, pero producen síntomas distintos. Esta guía utiliza presión absoluta de entrada, contrapresión de salida y caudal para diferenciar problemas de cebado, cavitación y presión sin caudal.",
    coverImage: `${SUCTION_DISCHARGE_ARTICLE_ASSET_BASE}/article-cover.webp`,
    coverAlt: "Ensayo de aspiración y descarga de una microbomba de diafragma FOREACH en un vídeo oficial de Douyin",
  },
  deck:
    "Las pérdidas de ambos lados aumentan la presión diferencial de la microbomba, pero ningún lado es siempre el más importante. La aspiración condiciona especialmente el cebado, el llenado de la cámara, la sensibilidad a fugas, la desgasificación y la cavitación; la descarga suele manifestarse como mayor contrapresión, menor caudal o funcionamiento contra una obstrucción. El diagnóstico debe registrar en el mismo eje temporal la presión absoluta de entrada, la presión de salida y el caudal.",
  leadBlocks: [
    {
      type: "notice",
      text:
        "Desde el punto de operación, las pérdidas en ambos lados aumentarán la presión diferencial de la bomba; Desde el modo de falla, el lado de succión también está sujeto a la presión absoluta de entrada y a las condiciones de sellado, por lo que el mismo valor de pérdida de presión puede producir un rendimiento en el sitio completamente diferente.",
    },
    {
      type: "figure",
      src: `${SUCTION_DISCHARGE_ARTICLE_ASSET_BASE}/article-figure-en.webp`,
      alt: "Comparación de los efectos de la resistencia a la succión y la resistencia a la descarga en el estado de funcionamiento de las bombas de diafragma.",
      width: 2560,
      height: 1920,
      caption:
        "La resistencia del lado de succión reduce la presión absoluta en la entrada de la bomba y la resistencia del lado de descarga aumenta la contrapresión de salida; ambos ampliarán la diferencia de presión que la bomba necesita establecer, pero la evidencia de la investigación y los límites de riesgo son diferentes.",
    },
  ],
  sections: [
    {
      title: "1. Primero coloque la resistencia de ambos lados en la misma relación de presión.",
      blocks: [
        {
          type: "formula",
          expression: "ΔPpump = Pout - Pin",
          note:
            "Pin and Pout debe utilizar una referencia de presión constante. Desde la perspectiva de la presión diferencial de la bomba, la presión manométrica o la presión absoluta se pueden utilizar de manera uniforme; Al analizar la cavitación, la presión absoluta de entrada debe usarse sola.",
        },
        {
          type: "paragraph",
          text:
            "En una comparación aproximada con otras condiciones iguales, una pérdida de presión adicional de 20 kPa antes de la bomba, o una contrapresión adicional de 20 kPa después de la bomba, puede mover el punto de operación a un caudal más bajo. Sin embargo, la pérdida en el lado de succión también reducirá la presión absoluta local en la entrada y la cámara de la bomba, y amplificará los efectos de pequeñas fugas de aire, caídas del nivel de líquido y precipitación de gas. Por lo tanto, la gravedad de la falla no puede juzgarse únicamente por la presión diferencial total.",
        },
        {
          type: "table",
          headers: ["Comparar dimensiones", "La resistencia del lado de succión aumenta", "La resistencia del lado de descarga aumenta"],
          rows: [
            ["cambio de presión directa", "La presión absoluta de entrada disminuye y el valor absoluto de la presión manométrica negativa aumenta.", "Aumento de la presión manométrica o absoluta de salida"],
            ["Síntomas comunes de inicio", "La introducción inicial de líquido es lenta y puede resultar difícil establecer una columna de líquido estable.", "Por lo general, todavía se puede drenar el líquido, pero el drenaje es más lento"],
            ["Manifestación habitual", "Burbujas, fluctuaciones de caudal y ruido que empeoran al bajar el nivel del líquido", "Aumenta la presión de salida, disminuye el caudal y se acumula presión cuando hay una obstrucción"],
            ["Principales riesgos adicionales", "Sensible a fugas de aire, reposición insuficiente de líquido en la cámara de la bomba, desprendimiento de gas o cavitación.", "Carga estructural y del motor, aumento de temperatura, resistencia a la presión del filtro o de la tubería"],
            ["medidas clave", "Presión absoluta cerca de la entrada de la bomba y su forma de onda", "Contrapresión cerca de la salida de la bomba y su forma de onda"],
          ],
        },
      ],
    },
    {
      title: "2. Cuando la resistencia en el lado de succión es demasiado alta, ¿por qué es más fácil \"no poder succionar\"?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Cuanto más larga sea la línea de succión, menor sea el diámetro interior, más curvaturas tenga o cuanto mayor sea la caída de presión a través de la válvula de entrada, el filtro y los accesorios, menor será normalmente la presión absoluta de entrada de la bomba. Cuando el nivel de almacenamiento de líquido disminuye o la altura de succión aumenta, también se superpondrá el efecto de presión estática. Al arrancar por primera vez, hay aire en el tubo y primero es necesario ventilar la cámara de la bomba y establecer la columna de líquido, por lo que el problema suele ser más evidente que durante el funcionamiento estable.",
        },
        {
          type: "list",
          ordered: false,
          items: [
            "El tiempo de arranque inicial es significativamente mayor y se recuperará temporalmente después de llenar o bajar la altura de succión.",
            "Hay una ligera fuga de aire en la junta de entrada y es posible que no haya una fuga de líquido desde el exterior, pero la bomba tiene dificultades para establecer una columna de líquido estable.",
            "El caudal disminuye a medida que disminuye el nivel del líquido de almacenamiento, o se vuelve más inestable en condiciones de alta temperatura y medios volátiles.",
            "Se veían burbujas en la sección de tubería transparente y las pulsaciones de presión y flujo se intensificaron, acompañadas de un ruido anormal.",
          ],
        },
        {
          type: "notice",
          text:
            "La presión manométrica de entrada negativa no se puede comparar directamente con la presión de vapor líquido. Para juzgar la cavitación, se debe utilizar la presión absoluta y la presión de vapor saturado se debe obtener en función de la temperatura real del medio. Las lecturas del sensor cerca de la entrada de la bomba aún no son iguales a la presión local instantánea más baja en la cámara de la bomba, y se deben conservar los márgenes de pérdida dinámica y local.",
        },
        {
          type: "formula",
          expression: "Pin,abs = Patm + Pin,gauge",
          note:
            "Esta conversión se puede realizar cuando el sensor de presión manométrica toma la presión atmosférica local como punto cero; La presión manométrica negativa hará que la presión absoluta de entrada sea inferior a la presión atmosférica local. Las fuentes de fluido presurizadas cerradas o diferentes condiciones de referencia deben convertirse de acuerdo con la presión real.",
        },
        {
          type: "formula",
          expression: "Plocal,abs > Pvapor(T) + engineering margin",
          note:
            "Esta es una expresión de las restricciones de ingeniería necesarias para evitar la vaporización de líquidos en áreas localizadas de baja presión. El vapor debe corresponder al medio y a la temperatura reales; el margen requerido debe determinarse en función de la pulsación de presión, la ubicación del punto de medición, la pérdida de la tubería y los resultados de la verificación.",
        },
      ],
    },
    {
      title: "3. Cuando la resistencia en el lado de descarga es demasiado grande, ¿por qué es más como \"hay presión pero flujo insuficiente\"?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Los tubos delgados, válvulas, filtros, agujas, boquillas y cámaras de presión positiva en el lado de descarga pueden aumentar la contrapresión de salida. A medida que aumenta la contrapresión, la microbomba de diafragma generalmente se mueve a lo largo de su curva caudal-presión hasta un punto de operación de flujo más bajo; al mismo tiempo, también pueden cambiar la corriente de funcionamiento, el aumento de temperatura, las pulsaciones de presión y la carga estructural.",
        },
        {
          type: "table",
          headers: ["Fenómeno in situ", "Evidencias que respaldan una mayor resistencia en el lado de la descarga", "Necesita ser excluido"],
          rows: [
            ["Puede drenar líquido normalmente pero drena lentamente", "La presión de entrada está cerca de la línea base y la contrapresión de salida aumenta significativamente.", "Viscosidad del medio, voltaje del terminal de la bomba y error del medidor de flujo"],
            ["El caudal disminuye después de que el filtro se ha utilizado durante un período de tiempo.", "La diferencia de presión entre la parte delantera y trasera del elemento filtrante aumenta con el tiempo.", "Pérdidas de succión debido al filtro de entrada."],
            ["El caudal cambia repentinamente después del cambio de válvula", "La presión de salida cambia sincrónicamente bajo la posición correspondiente de la válvula.", "Dirección de válvula, apertura incompleta o sincronización de control"],
            ["Acumulación de presión o actuación de la protección cuando el extremo está obstruido", "La presión de salida aumenta rápidamente y el caudal se acerca a cero", "Presión nominal admisible y medidas de alivio seguro para todo el circuito de líquido"],
          ],
        },
        {
          type: "paragraph",
          text:
            "La presión nominal no es una licencia para mantener la presión por mucho tiempo, ni puede reemplazar la verificación de la presión del sistema. Las mangueras, juntas, válvulas, filtros, sensores y cavidades deben comprobarse según sus respectivas clasificaciones controladas; La lógica de protección y la duración permitida en condiciones de bloqueo deben ser confirmadas por el producto y la ingeniería completa de la máquina.",
        },
      ],
    },
    {
      title: "4. Utilice una combinación de presión y fenómeno para distinguir fallas en ambos lados.",
      blocks: [
        {
          type: "table",
          headers: ["fenómeno", "Características de la presión de entrada", "Características de la presión de salida", "Priorizar la resolución de problemas"],
          rows: [
            ["Arranque lento o falla al aspirar líquido por primera vez", "La presión absoluta de entrada es baja o fluctúa anormalmente", "No necesariamente aumentó significativamente", "Línea de succión, nivel de líquido, juntas con fugas, válvula de entrada y filtro de entrada"],
            ["Se ha aspirado líquido pero el caudal es bajo", "cerca de la línea de base", "La contrapresión es mayor que la línea base.", "Tubos de descarga, filtros, válvulas, agujas y cámaras finales."],
            ["El caudal fluctúa y aparecen burbujas", "Presión absoluta o forma de onda anómalas", "Posibles fluctuaciones simultáneas", "Desgasificación, fuga en la entrada, vaporización local o deformación de las válvulas y de la manguera"],
            ["Reflujo o sifón después del apagado", "Afectado por el nivel de líquido, la presión estática y el sellado.", "Estado anormal de liberación de presión residual", "Válvulas antirretorno, alturas de instalación, recorridos de sifón y riesgo de fugas"],
            ["La presión en ambos extremos se desvía de la línea base.", "Caída de presión absoluta en la entrada", "La contrapresión de salida aumenta", "Hay nueva resistencia en ambos lados al mismo tiempo y se requieren desvíos en secciones."],
          ],
        },
        {
          type: "paragraph",
          text:
            "El sensor debe estar lo más cerca posible de la entrada y salida de la bomba y registrar sincrónicamente el caudal, el nivel del líquido, la posición de la válvula, el voltaje del terminal de la bomba y el tiempo. Al medir solo una presión en el extremo remoto, se perderá la caída de presión a lo largo del camino y la bomba entre el punto de medición y la bomba; Solo mirar el valor promedio estable puede pasar por alto problemas transitorios durante el arranque y el cambio de válvula.",
        },
      ],
    },
    {
      title: "5. ¿Se debe colocar el filtro antes o después de la bomba? Debe decidirse según el propósito y los límites.",
      blocks: [
        {
          type: "paragraph",
          text:
            "La posición del filtro no se puede resumir en \"todos los componentes de alta resistencia deben colocarse en el lado de descarga\". Antes de decidir la ubicación, primero debe aclarar el propósito de la filtración, dónde se generan las partículas, la tolerancia de la bomba a las partículas, la presión positiva o negativa permitida del material del filtro, la diferencia de presión en el peor de los casos después del bloqueo y si el sistema necesita proteger la bomba o proteger la corriente abajo.",
        },
        {
          type: "table",
          headers: ["Opciones de diseño", "Finalidades a las que puede aplicarse", "Límites que deben ser verificados"],
          rows: [
            ["Filtrado de entrada", "Evitar que las partículas aguas arriba entren en la bomba y proteger sus válvulas y su cámara", "Presión absoluta de entrada con el elemento filtrante cargado, primer cebado, tiempo de autocebado, riesgo de entrada de aire y resistencia del material filtrante al colapso"],
            ["Salir del filtrado", "Proteja los componentes posteriores o realice una filtración fina de líquidos posteriores a la bomba", "Contrapresión adicional, diferencia de presión máxima cuando está obstruido, resistencia a la presión de la carcasa del filtro, punto de funcionamiento de la bomba y protección contra sobrepresión."],
            ["Filtración gruesa de entrada + filtración fina de salida", "Los riesgos de partículas aguas arriba coexisten con los requisitos de limpieza aguas abajo", "Diferencia de presión superpuesta y estrategia de mantenimiento de dos filtros al final de su vida útil"],
            ["No coloque un filtro universal", "El medio está limpio y el sistema tiene control de contaminación.", "La tolerancia a las partículas de las bombas y los componentes posteriores debe confirmarse mediante datos controlados."],
          ],
        },
        {
          type: "notice",
          text:
            "Si el filtro está ubicado en la entrada, la presión absoluta de entrada y la capacidad de arranque deben verificarse de acuerdo con las peores condiciones después de la carga; si está ubicado en la salida, la contrapresión, el punto de funcionamiento de la bomba y la resistencia a la presión de todos los componentes aguas abajo deben verificarse de acuerdo con el peor de los casos después de la carga. La selección de la ubicación debe determinarse mediante una combinación del propósito del filtrado y los resultados de la verificación.",
        },
      ],
    },
    {
      title: "6. Secuencia práctica de diseño y verificación del circuito de líquido.",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Dibuje el recorrido completo del líquido desde la fuente del líquido hasta el final, marcando la diferencia de nivel del líquido, el diámetro interior de la manguera, la longitud, las válvulas, las juntas, los filtros y el diámetro mínimo.",
            "Mantenga la bomba lo más cerca posible de la fuente de líquido para reducir la altura de succión innecesaria; Mantenga la manguera de entrada corta, con diámetro suficiente, pocas curvaturas y sellado confiable.",
            "Establezca puntos de medición de presión cerca de la entrada y salida de la bomba y registre la presión absoluta en el lado de entrada o conserve un punto de referencia de presión que pueda convertirse de manera confiable.",
            "Primero establezca una línea base de baja resistencia, luego agregue componentes en el lado de succión y en el lado de descarga respectivamente, y confirme las respectivas caídas de presión a través de un bypass segmentado.",
            "Las condiciones operativas más adversas se vuelven a probar en el nivel de líquido más bajo, la temperatura real del medio, el final de la vida útil del filtro, el cambio de válvula y la postura de instalación final.",
            "Registre simultáneamente el flujo, la forma de onda de presión, el voltaje del terminal de la bomba, la corriente, el tiempo de inicio, las burbujas, el ruido y el aumento de temperatura para formar un registro de aceptación rastreable.",
          ],
        },
        {
          type: "links",
          items: [
            {
              prefix: "Para profundizar en la lectura del punto de funcionamiento y de la curva de presión:",
              label: "Guía para leer la curva caudal-presión de una bomba de diafragma",
              href: "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide",
              suffix: ".",
            },
          ],
        },
      ],
    },
    {
      title: "7. ¿Qué conclusiones deben confirmarse mediante pruebas o ingeniería reales del producto?",
      blocks: [
        {
          type: "table",
          headers: ["Contenido por confirmar", "Razones que no pueden determinarse únicamente con este artículo", "sugerir evidencia"],
          rows: [
            ["Presión absoluta de entrada permitida y límite de autocebado", "Afectado por el modelo, velocidad, medio, temperatura, estado de la tubería y de la válvula.", "Especificaciones controladas por el modelo correspondiente y prueba de arranque del circuito de fluido real"],
            ["Margen de seguridad para cavitación o desprendimiento de gases.", "Es difícil representar completamente la presión instantánea más baja en la cámara de la bomba mediante un único punto de medición de entrada.", "Forma de onda de presión, presión de vapor media, observación de tubo transparente y verificación de durabilidad."],
            ["Contrapresión máxima de salida continua", "La presión nominal, la presión máxima y el límite de pérdida a corto plazo no son los mismos conceptos", "Especificaciones del producto, pruebas de aumento de temperatura, corriente, vida útil y estrategia de protección."],
            ["Ubicación de instalación del filtro", "Depende del propósito de la filtración, el riesgo de partículas, la tolerancia de la bomba y la resistencia a la presión del filtro.", "Análisis de riesgos y pruebas completas de la máquina al final de su vida útil."],
            ["Criterios de aceptación de fallas", "Diferentes equipos tienen diferentes requisitos en cuanto a tiempo de arranque, fluctuación de flujo, ruido y error de dosis.", "Requisitos completos de la máquina, especificaciones de inspección y estadísticas de prototipos."],
          ],
        },
        {
          type: "paragraph",
          text:
            "Lo que este artículo ofrece es un método de identificación de fallas, no un valor garantizado para ningún tipo de bomba específico. La presión de entrada, la contrapresión, la posición del filtro y las condiciones de funcionamiento continuo permitidas deben devolverse a los datos controlados del modelo correspondiente y verificarse con el medio final y el circuito de líquido completo.",
        },
      ],
    },
  ],
  faqTitle: "Preguntas frecuentes: Preguntas frecuentes sobre la resistencia a la succión y la contrapresión de descarga",
  faqItems: [
    {
      question: "Si la pérdida de presión en el lado de succión y en el lado de descarga aumenta en 10 kPa cada uno, ¿el impacto será exactamente el mismo?",
      answer:
        "Las contribuciones a la presión diferencial total de la bomba pueden ser similares, pero los modos de falla son diferentes. El lado de succión también reducirá la presión absoluta de entrada, aumentando el riesgo de reposición insuficiente de fluido, sensibilidad a las fugas de aire, separación de gases y cavitación; el lado de descarga mostrará más directamente un aumento en la contrapresión y una disminución en el caudal.",
    },
    {
      question: "¿Debe instalarse el filtro antes o después de la bomba?",
      answer:
        "Depende del propósito de la filtración, la fuente de partículas, la resistencia a las partículas de la bomba y el diferencial de presión permitido del filtro. La filtración de entrada necesita verificar la presión absoluta de entrada después de la carga y la primera introducción de líquido; La filtración de salida necesita verificar la contrapresión después de la carga, la resistencia a la presión de la carcasa del filtro y la protección contra sobrepresión. No se puede generalizar.",
    },
    {
      question: "La bomba emite un sonido pero no descarga líquido. ¿Qué lado debo comprobar primero?",
      answer:
        "Primero confirme la fuente de líquido, el nivel de líquido, la tubería de entrada, la fuga en la junta, la dirección de la válvula y la introducción inicial del líquido, y luego confirme si la salida está bloqueada o si la contrapresión es demasiado alta. La forma más rápida de distinguir es medir la presión cerca de la entrada y salida de la bomba al mismo tiempo y observar burbujas en la sección de tubería transparente.",
    },
    {
      question: "¿Se puede juzgar la cavitación observando únicamente la presión negativa de entrada?",
      answer:
        "No. La presión de entrada debe convertirse a presión absoluta y compararse con la presión de vapor saturado del fluido a la temperatura real. También deben considerarse la presión local instantánea mínima dentro de la cámara, las pulsaciones y las pérdidas entre el punto de medida y la cámara de la bomba. La confirmación final requiere ensayos con el fluido real.",
    },
    {
      question: "¿Es necesariamente mejor tener la bomba por debajo del nivel del líquido?",
      answer:
        "La presión estática positiva en la entrada suele ser beneficiosa para la rehidratación, pero no es incondicionalmente mejor. También es necesario evaluar el sifonaje, el cierre del contraflujo, las fugas, los cambios de presión de la fuente de líquido y los límites de seguridad del equipo, y confirmar la presión de entrada permitida de la bomba y los componentes aguas arriba.",
    },
    {
      question: "¿Medir sólo la presión de salida puede determinar problemas en la línea de líquido?",
      answer:
        "No. La presión de salida no puede indicar pérdidas de succión de entrada, fugas de aire o presión absoluta de entrada insuficiente. Al menos se deben medir simultáneamente la presión de entrada, la presión de salida y el caudal, y se debe registrar el nivel del líquido, la posición de la válvula, la temperatura del medio y el suministro de energía del extremo de la bomba.",
    },
  ],
  cta: {
    title: "¿Necesita distinguir entre una aspiración insuficiente y una contrapresión de salida excesiva?",
    description:
      "Puede facilitar el modelo de bomba, el fluido y su temperatura, la diferencia de nivel, las dimensiones de las tuberías de aspiración y descarga, la posición del filtro, la presión absoluta de entrada, la contrapresión de salida y el caudal medido. Con esos datos, el ingeniero podrá diagnosticar el circuito completo.",
    contactLabel: "contacta a un ingeniero",
    productsLabel: "Ver productos de bombas de diafragma",
    productsHref: "/products/pumps/miniature-diaphragm-pumps",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
