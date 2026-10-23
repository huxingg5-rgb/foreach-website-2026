import { getRplSelectionGuide } from "@/data/resources/technical-articles/rpl-selection-links";
import type { ValvelessLocaleCopy } from "./types";
import { getValvelessPumpNames } from "../valveless-pump-names";

const rplSelectionGuideHref = getRplSelectionGuide("es").href;

export const es: ValvelessLocaleCopy = {
  ...getValvelessPumpNames("es"),
  category: { title: "Bombas dosificadoras de precisión sin válvulas", metaDescription: "Bombas dosificadoras sin válvulas FOREACH RPL y DRPL para reactivos, titulación, llenado y dilución. Compare volúmenes por vuelta, proporciones y materiales.", paragraphs: [
    "Las bombas dosificadoras sin válvulas FOREACH aspiran e impulsan el líquido mediante el movimiento combinado de rotación y vaivén de un pistón cerámico. Se destinan a la dispensación de reactivos, adición de valorante, llenado y preparación proporcional en instrumentos analíticos, equipos de laboratorio y sistemas de envasado de reactivos. RPL dispone de un cabezal para una vía; DRPL suministra dos líquidos en una proporción volumétrica determinada.",
    "El nombre depende de la función: bomba dispensadora de reactivos, bomba dosificadora de valorante o bomba de llenado. Para diluir concentrados o preparar tampones, la configuración de doble cabezal suministra concentrado y diluyente proporcionalmente. Estos nombres describen tareas, no mecanismos diferentes.",
    `La serie RPL cubre 12–80 μL/rev, 50–300 μL/rev y 300–1200 μL/rev. RPL-P6.35 y RPL-P15 permiten ajustar mecánicamente el desplazamiento y combinarlo con la velocidad del motor. El desplazamiento por vuelta, [el volumen por dosis](${rplSelectionGuideHref}) y el caudal por minuto son magnitudes distintas. La exactitud y repetibilidad deben comprobarse con el líquido, la contrapresión y la secuencia reales.`,
    "La serie DRPL ofrece relaciones de volumen concentrado:diluyente de 1:9 y 1:19 para dilución, preparación de tampones y dosificación proporcional. Especifique el volumen de cada vía, la proporción y el tiempo de ciclo. La bomba suministra los líquidos; la unión y mezcla aguas abajo determinan la homogeneidad de la solución preparada.",
    "RPL-P6.35 utiliza un cabezal de fluoruro de polivinilideno (PVDF) y un conjunto cerámico de dióxido de zirconio (ZrO₂). RPL-P15 utiliza un cabezal de fluoruro de polivinilideno (PVDF) y un conjunto de óxido de aluminio (Al₂O₃). Compruebe la compatibilidad de todos los componentes mojados con el reactivo y el líquido de limpieza, y prevea la eliminación de residuos o cristales. Las conexiones, el accionamiento y el montaje dependen de la configuración.",
    "Indique el volumen por dosis o el caudal, el tiempo de ciclo, la composición del líquido, la contrapresión y el espacio disponible. Para preparación proporcional, añada la relación de volúmenes y la cantidad requerida de cada vía."
  ] },
  single: { title: "Bombas dosificadoras sin válvulas RPL de un cabezal", paragraphs: [
    `RPL suministra cantidades definidas por una vía en instrumentos analíticos, valoradores, módulos de laboratorio y equipos de llenado. RPL-P4, RPL-P6.35 y RPL-P15 cubren respectivamente 12–80 μL/rev, 50–300 μL/rev y 300–1200 μL/rev. Seleccione según [el volumen por dosis y el tiempo disponible](${rplSelectionGuideHref}).`,
    "Según la tarea, puede actuar como bomba dispensadora de reactivos, dosificadora de valorante, dispensadora de tampón o bomba de llenado volumétrico. RPL-P4 se orienta a cantidades menores; RPL-P6.35, a dispensación y valoración; RPL-P15, a llenado y suministro que requieren mayor volumen por vuelta.",
    "RPL-P6.35 y RPL-P15 combinan ajuste mecánico del desplazamiento y selección de velocidad. El desplazamiento por vuelta no equivale a la dosis mínima fiable. Verifique la salida con el líquido, la contrapresión y la secuencia de dosificación previstos.",
    "RPL-P6.35 tiene cabezal de fluoruro de polivinilideno (PVDF), conjunto de dióxido de zirconio (ZrO₂) y conexión de trabajo 1/4-28 UNF-2B. RPL-P15 tiene cabezal de fluoruro de polivinilideno (PVDF), conjunto de óxido de aluminio (Al₂O₃) y conexión G1/8. Confirme limpieza, tuberías y montaje."
  ] },
  dual: { title: "Bombas dosificadoras sin válvulas DRPL de doble cabezal", paragraphs: [
    "DRPL suministra dos líquidos proporcionalmente en módulos de dilución de analizadores, equipos de laboratorio y preparación de reactivos. DRPL-0109 y DRPL-0119 ofrecen relaciones concentrado:diluyente de 1:9 y 1:19, respectivamente.",
    "Según su función, puede denominarse bomba de dilución de concentrados, bomba de dosificación proporcional o bomba dosificadora de dos vías. Suministra concentrado y diluyente para preparar reactivos o tampones en una relación definida.",
    "1:9 significa una parte de concentrado y nueve de diluyente; 1:19, una parte y diecinueve. Defina la cantidad de cada vía, el volumen total y el tiempo de ciclo. Dosificar proporcionalmente y mezclar son funciones distintas: compruebe la homogeneidad con el circuito aguas abajo.",
    "Indique por separado composición, viscosidad, condiciones de entrada y contrapresión de cada líquido, además de proporción, conexiones, control y espacio. Revise los materiales mojados de ambas vías."
  ] },
  materials: { pvdf: "fluoruro de polivinilideno (PVDF)", alumina: "óxido de aluminio (Al₂O₃)", zirconia: "dióxido de zirconio (ZrO₂)" },
  // Adapted from the reviewed Chinese cards and three-paragraph introductions (2026-10-23).
  cards: {
    "p4": "RPL-P4, bomba miniatura sin válvulas con pistón cerámico, 12–80 μL/rev, para pequeñas dosis de reactivo y adición de valorante.",
    "p635": "RPL-P6.35, bomba sin válvulas de pistón rotativo, 50–300 μL/rev, con conexiones de lavado para dispensación de reactivos y llenado volumétrico.",
    "p15": "RPL-P15, bomba dosificadora de pistón cerámico, 300–1200 μL/rev, con conexiones de lavado para llenado de reactivos y dispensación de soluciones tampón.",
    "dual9": "DRPL-0109, bomba dosificadora de doble cabezal con pistones cerámicos para dilución de reactivos y preparación de tampones en una relación concentrado:diluyente de 1:9.",
    "dual19": "DRPL-0119, bomba dosificadora de pistón y doble cabezal para dilución de reactivos concentrados y dosificación proporcional en una relación concentrado:diluyente de 1:19."
  },
  introductions: {
    "p4": {
      "title": "RPL-P4: bomba dosificadora sin válvulas de pistón cerámico, 12–80 μL/rev, para reactivos y titulación",
      "paragraphs": [
        "RPL-P4 es una bomba dosificadora sin válvulas, de un cabezal y pistón cerámico, con un desplazamiento de 12–80 μL por vuelta. La rotación del pistón conecta alternativamente la cámara con la aspiración y la impulsión; el movimiento axial alternativo aspira y expulsa el líquido. El mecanismo no necesita válvulas antirretorno independientes en la entrada y la salida. El volumen nominal de cada dosis depende del desplazamiento y del número de vueltas, mientras que el accionamiento coordina las dosificaciones repetidas.",
        "Puede seleccionarse para dispensar pequeños volúmenes de reactivo en analizadores automatizados, suministrar valorante en tituladores y llenar viales o tubos de reactivo en el laboratorio. Su menor desplazamiento por vuelta facilita ajustar los ciclos a dosis pequeñas. Los incrementos próximos al punto final de una titulación deben comprobarse con el posicionamiento del accionamiento y el volumen que realmente sale de la punta.",
        "La configuración mostrada combina un cabezal de fluoruro de polivinilideno (PVDF) y un conjunto cerámico de alúmina (Al₂O₃), conectados al circuito del instrumento mediante racores. Compruebe la compatibilidad de los materiales en contacto con el líquido tanto con el reactivo como con la solución de limpieza. El intervalo de desplazamiento no equivale a un volumen mínimo de dosificación validado."
      ],
      "commonApplications": [
        "Analizadores automatizados: dispensación y dosificación de pequeños volúmenes de reactivo",
        "Tituladores automáticos: suministro de valorante y dosificación incremental",
        "Equipos de laboratorio: llenado volumétrico de viales y tubos de reactivo"
      ],
      "metaDescription": "Bomba dosificadora sin válvulas RPL-P4, 12–80 μL/rev, para reactivos y titulación. Cabezal de PVDF y conjunto cerámico de alúmina."
    },
    "p635": {
      "title": "RPL-P6.35: bomba dosificadora sin válvulas, 50–300 μL/rev, con lavado para dispensación y llenado",
      "paragraphs": [
        "RPL-P6.35 es una bomba dosificadora sin válvulas de un cabezal con pistón cerámico y desplazamiento de 50–300 μL por vuelta. La rotación del pistón alterna la conexión entre entrada y salida; su movimiento axial modifica el volumen de la cámara para aspirar e impulsar el líquido. Así se eliminan las válvulas antirretorno independientes del mecanismo de bombeo. El ajuste mecánico fija el volumen nominal por vuelta y la velocidad del motor permite adaptar el caudal medio y el tiempo de dosificación.",
        "Sus aplicaciones incluyen la adición de reactivos por etapas en analizadores automatizados, el suministro de valorante en tituladores de laboratorio y el llenado volumétrico de tubos y frascos pequeños. Una dosis puede acumular uno o varios ciclos completos, de acuerdo con el volumen requerido y el tiempo disponible en el equipo.",
        "La configuración mostrada emplea un cabezal de fluoruro de polivinilideno (PVDF), un conjunto cerámico de zirconia (ZrO₂) y conexiones de lavado de la zona del pistón. El circuito de trabajo aspira e impulsa el reactivo; el de lavado limpia la zona del pistón. Planifique la limpieza habitual y al detener el equipo según las propiedades del líquido. Vuelva a calibrar el volumen suministrado después de ajustar el desplazamiento o modificar el circuito."
      ],
      "commonApplications": [
        "Analizadores automatizados: dispensación y adición de reactivos por etapas",
        "Tituladores de laboratorio: suministro y dosificación de valorante",
        "Equipos de envasado de reactivos: llenado volumétrico de tubos y frascos"
      ],
      "metaDescription": "RPL-P6.35, bomba dosificadora sin válvulas de 50–300 μL/rev para reactivos, titulación y llenado. Cabezal de PVDF, zirconia y conexiones de lavado."
    },
    "p15": {
      "title": "RPL-P15: bomba dosificadora sin válvulas, 300–1200 μL/rev, con lavado para llenado y dispensación de tampones",
      "paragraphs": [
        "RPL-P15 es una bomba dosificadora sin válvulas de un cabezal con pistón cerámico y desplazamiento de 300–1200 μL por vuelta. La rotación alterna la conexión entre aspiración e impulsión, y el movimiento axial aspira y expulsa el líquido sin válvulas antirretorno independientes en el mecanismo. El ajuste mecánico del desplazamiento, la velocidad y el número de vueltas permiten adaptar el caudal medio y el volumen por dosis.",
        "Está orientada al llenado volumétrico de frascos de reactivo, la dispensación de tampones ya preparados en estaciones de laboratorio y el suministro dosificado en instrumentos analíticos. Para un mismo volumen objetivo, un mayor desplazamiento requiere menos vueltas y ayuda a ajustar el tiempo de entrega en tareas de mayor volumen.",
        "La configuración mostrada combina un cabezal de fluoruro de polivinilideno (PVDF), un conjunto cerámico de alúmina (Al₂O₃) y conexiones para lavar la zona del pistón. La limpieza debe adaptarse a las características del reactivo. Compruebe los materiales en contacto con el líquido frente al fluido de proceso y al de limpieza, y calibre el volumen y el caudal en el circuito real del equipo."
      ],
      "commonApplications": [
        "Envasado de reactivos: llenado volumétrico de frascos",
        "Estaciones de preparación de laboratorio: dispensación de tampones preparados y reposición de depósitos",
        "Módulos de instrumentos analíticos: suministro y transferencia dosificados"
      ],
      "metaDescription": "RPL-P15, bomba dosificadora sin válvulas de 300–1200 μL/rev para llenado de reactivos y dispensación de tampones. PVDF, alúmina y conexiones de lavado."
    },
    "dual9": {
      "title": "DRPL-0109: bomba dosificadora sin válvulas de doble cabezal para dilución 1:9 y dosificación proporcional",
      "paragraphs": [
        "DRPL-0109 es una bomba dosificadora sin válvulas de doble cabezal y pistones cerámicos que suministra concentrado y diluyente en una relación volumétrica de 1:9. Cada cabezal dosifica una de las dos vías. La rotación y el movimiento axial alternativo de los pistones conmutan los pasos, aspiran e impulsan el líquido sin válvulas antirretorno independientes en el mecanismo. La integración de ambas vías en un solo conjunto facilita diseñar el circuito para una proporción fija.",
        "Sus aplicaciones incluyen la dilución en línea de reactivos concentrados en analizadores, la preparación de tampones en equipos de laboratorio y la dosificación proporcional por lotes en producción de reactivos. La relación 1:9 indica una parte de concentrado y nueve de diluyente. Esta configuración se selecciona para recetas que requieren esa proporción y un suministro repetido de ambos líquidos.",
        "Cada circuito de trabajo se conecta a su depósito correspondiente. Las conexiones de lavado permiten preparar la limpieza de la zona del pistón según el líquido de cada vía. La unión de las salidas y los elementos de mezcla posteriores forman la solución de trabajo. Verifique por separado la proporción suministrada y la homogeneidad de la mezcla; seleccione materiales y líquidos de limpieza para la configuración concreta."
      ],
      "commonApplications": [
        "Analizadores automatizados: dilución en línea de reactivos en relación concentrado:diluyente 1:9",
        "Equipos de laboratorio: preparación de tampones en proporción fija",
        "Producción de reactivos: dosificación proporcional de dos líquidos por lotes"
      ],
      "metaDescription": "Bomba dosificadora sin válvulas DRPL-0109 de doble cabezal, relación concentrado:diluyente 1:9, para dilución de reactivos y preparación de tampones."
    },
    "dual19": {
      "title": "DRPL-0119: bomba dosificadora sin válvulas de doble cabezal para dilución 1:19 y preparación de soluciones",
      "paragraphs": [
        "DRPL-0119 es una bomba dosificadora sin válvulas de doble cabezal y pistones cerámicos que suministra concentrado y diluyente en una relación volumétrica de 1:19. Los cabezales dosifican ambos líquidos por separado. La rotación del pistón conecta alternativamente entrada y salida; su movimiento axial realiza la aspiración y la impulsión. Este mecanismo prescinde de válvulas antirretorno independientes y permite alimentar dos vías en una proporción fija.",
        "Se puede seleccionar para diluir reactivos concentrados en analizadores automatizados, preparar soluciones de trabajo en el laboratorio y suministrar líquidos proporcionalmente por lotes. La relación 1:19 significa una parte de concentrado y diecinueve de diluyente. La elección depende de la receta; esta configuración aporta una mayor proporción de diluyente que la de 1:9.",
        "Conecte las vías de trabajo a sus respectivos depósitos y utilice las conexiones de lavado para configurar la limpieza de la zona de los pistones. Ajuste los ciclos al volumen de preparación y al tiempo disponible, con los elementos de mezcla y almacenamiento necesarios aguas abajo. Cambiar la proporción exige revisar los cabezales y el desplazamiento; variar únicamente la velocidad general no convierte 1:19 en otra proporción."
      ],
      "commonApplications": [
        "Analizadores automatizados: dilución de reactivos en relación concentrado:diluyente 1:19",
        "Sistemas de laboratorio: preparación de soluciones de trabajo en proporción fija",
        "Preparación de reactivos: suministro proporcional de concentrado y diluyente por lotes"
      ],
      "metaDescription": "DRPL-0119, bomba dosificadora sin válvulas de doble cabezal para relación concentrado:diluyente 1:19, dilución y preparación de soluciones de trabajo."
    }
  },
  intros: {
    p4: "RPL-P4 se orienta a pequeñas dosis por una vía. Según la tarea, puede denominarse bomba dispensadora de reactivos, dosificadora de valorante o bomba de llenado volumétrico. Los nombres describen funciones, no mecanismos distintos. Las aplicaciones siguientes relacionan dosis, secuencia y tiempo.",
    p635: "RPL-P6.35 se orienta a dispensación y llenado por una vía. Los términos bomba dispensadora de reactivos, dosificadora de valorante y bomba de llenado corresponden a tareas. Su desplazamiento es mayor que el de RPL-P4: seleccione por cantidad y tiempo, no solo por sector.",
    p15: "RPL-P15 se orienta a tareas que requieren mayor volumen por vuelta. Puede actuar como bomba de llenado de reactivos, dispensadora de tampón o bomba de suministro cuantitativo. El llenado controla volumen por recipiente; el suministro continuo, volumen por tiempo; la reposición debe coordinarse con el nivel.",
    dual: "{{model}} prepara dos líquidos en relación concentrado:diluyente {{ratio}}. Puede denominarse bomba de dilución de concentrados, bomba proporcional o dosificadora de dos vías. {{ratio}} es una relación volumétrica, no un ajuste de velocidad ni un volumen final de solo {{parts}} veces el concentrado."
  },
  reagentSetup: {
    p4: "Prepare el circuito mediante cebado y purga de aire, fije desplazamiento y ciclos, recoja varias dosis y calibre la salida. Compare dosificación continua y primera dosis después de una pausa. Si solo esta última se desvía, revise burbujas, gotas en la punta y retroceso del líquido. Suministrar reactivo desde un depósito no equivale a aspirar y transferir muestras.",
    p635: "Cebar la vía de trabajo y lavar la zona del pistón son operaciones distintas. El cebado establece una columna líquida estable; el lavado elimina residuos alrededor del pistón. Para reactivos salinos o cristalizables, defina líquido compatible y secuencia de parada. La presencia de lavado no garantiza compatibilidad con todo líquido corrosivo."
  },
  applications: {
    reagent: { title: "Análisis automatizado y diagnóstico in vitro: dispensación de reactivos", paragraphs: [
      "En analizadores y circuitos de diagnóstico in vitro (IVD), el líquido pasa del frasco de reactivo a la bomba, tubería y punta, hasta el recipiente de reacción. El componente puede denominarse bomba dispensadora de reactivos o bomba de adición de reactivo. Defina cantidad y tiempo de cada etapa analítica, no solo el caudal por minuto.",
      "El desplazamiento y las vueltas completas determinan la dosis nominal. Ejemplo de cálculo: {{exampleQ}} μL/rev × 5 vueltas = {{exampleDose}} μL. A 150 rpm constantes, el tiempo teórico es 2 segundos, sin aceleración, parada ni otros movimientos. Es un cálculo de dimensionamiento, no una prestación medida. Recalibre cuando cambie el desplazamiento.",
      "{{reagentSetup}}"
    ] },
    titration: { title: "Valoración automática: adición incremental de valorante", paragraphs: [
      "En un valorador de laboratorio, la bomba dosificadora de valorante añade líquido al recipiente bajo control del instrumento. La secuencia combina adición, mezcla y respuesta del electrodo antes de decidir el siguiente incremento. La bomba transporta líquido; el instrumento detecta y determina el punto final.",
      "Defina por separado la velocidad inicial y el incremento mínimo fiable cerca del punto final. Manteniendo desplazamiento y vueltas completas, bajar la velocidad aumenta principalmente el tiempo, no reduce la dosis. {{minimum}} μL/rev es el límite inferior del desplazamiento, no un incremento mínimo validado. No deduzca dosis arbitrariamente pequeñas dividiendo por los pasos del motor.",
      "Mida incrementos repetidos con el valorante, punta y tubería reales. Revise las gotas posteriores a la parada y deje tiempo de mezcla y estabilización. La posición y el arranque/parada del accionamiento deben responder a la secuencia; la exactitud de la bomba no es la exactitud analítica del valorador completo."
    ] },
    smallfill: { title: "Producción de reactivos y laboratorio: llenado de pequeños recipientes", paragraphs: [
      "En estaciones de pequeños viales o tubos, RPL-P4 puede evaluarse como bomba de llenado de reactivos o dispensadora volumétrica. Tras la adición por la punta, se posiciona el siguiente recipiente. Compruebe el volumen realmente recibido durante funcionamiento continuo y después de pausas.",
      "Separe el ciclo en suministro de la bomba, cambio de recipiente, movimiento de punta y espera. En el ejemplo de 400 μL a 80 μL/rev y 150 rpm, 2 segundos solo representan el tiempo teórico de bomba; no demuestran 30 frascos por minuto. Si falta tiempo, evalúe juntos desplazamiento, velocidad y movimientos.",
      "Mida por separado los primeros llenados, los consecutivos y el primero tras una pausa. Para control gravimétrico, convierta masa en volumen con la densidad a la temperatura de ensayo y una balanza adecuada. En líquidos espumantes o que mojan las paredes, compruebe retención en la punta y entrada completa de la gota."
    ] },
    midfill: { title: "Envasado de reactivos: llenado de microlitros a mililitros", paragraphs: [
      "Para llenar tubos y pequeños frascos repetidamente, RPL-P6.35 puede seleccionarse como bomba de llenado de reactivos o dispensadora de líquidos. Una dosis puede acumular uno o varios ciclos completos; no está limitada al volumen de una vuelta. Coordine suministro, cambio de recipiente y movimiento de punta.",
      "Ejemplo de cálculo: a 200 μL/rev, un llenado nominal de 1 mL requiere 5 vueltas. A 150 rpm constantes, la bomba funciona teóricamente 2 segundos. Añada posicionamiento, movimiento y espera para obtener el ciclo de estación. No es una velocidad de producción ni exactitud verificadas.",
      "Ensaye llenados consecutivos y reinicios con la punta y tubería previstas, observando goteo y espuma. Compruebe el cabezal de fluoruro de polivinilideno (PVDF) y el conjunto de dióxido de zirconio (ZrO₂), junto con conexiones y demás piezas mojadas, frente al reactivo y líquido de limpieza."
    ] },
    largefill: { title: "Producción de reactivos diagnósticos: llenado volumétrico de frascos", paragraphs: [
      "En producción de reactivos o envasado de laboratorio, el líquido pasa del depósito a cada frasco mediante bomba y punta. RPL-P15 puede evaluarse como bomba de llenado de reactivos o dispensadora volumétrica. Equilibre cantidad por recipiente y ciclo: distintos desplazamientos requieren diferentes números de vueltas para la misma dosis.",
      "Ejemplo: un llenado nominal de 5 mL a 1000 μL/rev requiere 5 vueltas completas. A 150 rpm constantes, el tiempo teórico de bomba es 2 segundos. Cambio de frasco, aceleración, parada y movimiento de punta son adicionales; no es una capacidad de línea garantizada. Calibre el volumen real a la salida.",
      "Antes de aumentar velocidad, compruebe alimentación, resistencia de la punta y desprendimiento de gotas. Para líquidos espumantes, evalúe también altura y movimiento. Mida llenados consecutivos y el primero tras una pausa para valorar la estación completa y no solo la bomba."
    ] },
    buffer: { title: "Preparación de laboratorio: distribución de tampón y reposición", paragraphs: [
      "La bomba que reparte tampón ya preparado puede denominarse dispensadora de tampón; la que rellena un depósito intermedio, bomba de reposición. Ninguna tarea equivale a preparar tampón a partir de dos líquidos. RPL-P15, de un cabezal, no controla por sí sola la relación concentrado:diluyente.",
      "Para dispensación repetida, ajuste volumen, desplazamiento y ciclos. Para reposición, el nivel o una orden del equipo determina arranque y parada. Detección de nivel, protección contra falta de líquido y prevención de desbordamiento pertenecen al sistema; no se presuponen incluidas en la bomba.",
      "Con tampones salinos, incluya un enjuague compatible al parar para limitar secado y cristalización alrededor del pistón. G1/8 de trabajo y 1/4-28 UNF-2B de lavado corresponden a circuitos distintos. Conecte según el plano y compruebe si entra aire tras la reposición."
    ] },
    continuous: { title: "Suministro a instrumentos analíticos: dosificación continua", paragraphs: [
      "Si el equipo necesita líquido durante un periodo prolongado, RPL-P15 puede evaluarse como bomba dosificadora de líquidos o de suministro cuantitativo. A diferencia del llenado por recipiente, las entradas principales son caudal medio, duración y tolerancia del proceso a fluctuaciones.",
      "Estime el caudal medio nominal multiplicando desplazamiento por velocidad. Ejemplo: 500 μL/rev × 120 rpm = 60000 μL/min, es decir, 60 mL/min. Es un promedio, no un caudal instantáneo constante ni un sustituto de la medición con líquido y contrapresión reales.",
      "Recoja líquido durante un intervalo definido con la resistencia de salida real y compruebe los efectos de la pulsación. Si añade un mezclador u otra restricción, revise contrapresión y alimentación. La construcción sin válvulas no garantiza por sí sola flujo sin pulsaciones ni funcionamiento continuo ilimitado."
    ] },
    dilution: { title: "Analizadores automáticos: dilución de concentrados en el equipo", paragraphs: [
      "Una vía aspira concentrado y la otra diluyente; se unen y mezclan antes del depósito de solución de trabajo. Para esta tarea, {{model}} puede seleccionarse como bomba de dilución de concentrados o de reactivos. La bomba establece el suministro proporcional; la mezcla aguas abajo determina la homogeneidad.",
      "Cálculo: {{ratio}} significa una parte de concentrado y {{parts}} de diluyente. Suponiendo volúmenes aditivos, diluyente sin el soluto objetivo y ausencia de reacción, el volumen final es {{factor}} veces el concentrado y su concentración es 1/{{factor}} de la inicial. {{concentrate}} μL + {{diluent}} μL suman nominalmente {{total}} mL. Confirme la concentración midiendo ambas salidas y la solución preparada.",
      "Cebe y purgue ambas vías antes de evaluar la entrada al mezclador, especialmente tras arrancar o cambiar líquidos. La falta de líquido o burbujas en una vía puede alterar la concentración aunque el volumen total parezca correcto. Mida cada vía por separado y después analice la mezcla."
    ] },
    preparation: { title: "Laboratorio y reactivos: preparación de tampón a proporción fija", paragraphs: [
      "En equipos de preparación, el componente que combina concentrado y diluyente puede llamarse bomba de preparación de tampón o bomba proporcional. Seleccione {{model}} porque la formulación exige {{ratio}}, no simplemente porque la aplicación mencione tampones.",
      "Ejemplo: un lote nominal de 100 mL a {{ratio}} requiere {{batchConcentrate}} mL de concentrado y {{batchDiluent}} mL de diluyente. Es un cálculo de formulación, no una garantía de exactitud por lote. Compruebe fuerza iónica, acidez y estado de disolución según el proceso.",
      "Una proporción correcta no asegura mezcla uniforme. Dimensione unión, mezclador y depósito según volumen, ritmo y tiempo de residencia. Ensaye formulaciones que puedan precipitar o formar espuma. El pistón cerámico no acredita compatibilidad de todos los componentes de ambas vías."
    ] },
    batch: { title: "Producción de reactivos: dosificación proporcional por lotes", paragraphs: [
      "Cuando dos líquidos entran en un recipiente en relación fija, {{model}} puede denominarse bomba proporcional o dosificadora de dos vías. Especifique relación, volumen total y tiempo permitido. Envasar después la mezcla en frascos es otra tarea; el doble cabezal no implica un control de llenado integrado.",
      "Aumentar o reducir ambas salidas por el mismo factor no cambia la proporción. Por ello, ajustar la velocidad global no convierte 1:9 en 1:19. Otra formulación exige revisar cabezales y desplazamientos. En arranque y parada, considere volúmenes de tubería, tiempos de llegada al mezclador y líquido residual.",
      "Las conexiones de trabajo mostradas son 1/4-28 UNF-2B para reactivo A y G1/8 para B; ambas de lavado son 1/4-28 UNF-2B. Verifique en el plano qué líquido corresponde a A/B, no lo deduzca solo del tamaño de conexión. Revise presión y alimentación por separado."
    ] }
  },
  modelFaqs: {
    "p635": [
      {
        "question": "¿Cómo elegir entre RPL-P6.35 y RPL-P4?",
        "answer": "Sus desplazamientos son de 50–300 μL/rev y 12–80 μL/rev, respectivamente. A partir de la dosis y el tiempo disponible, calcule el desplazamiento y las vueltas necesarias; después compare el comportamiento con dosis pequeñas y las opciones de accionamiento. Un desplazamiento mayor no implica mayor exactitud."
      },
      {
        "question": "¿Qué modifican el ajuste del desplazamiento y la velocidad?",
        "answer": "El ajuste mecánico cambia el volumen nominal por vuelta completa. La velocidad determina cuántas vueltas se realizan por unidad de tiempo. Estime la dosis multiplicando desplazamiento por vueltas y el caudal medio multiplicando desplazamiento por velocidad; calibre después la salida real."
      },
      {
        "question": "¿En qué se diferencian las conexiones de lavado y de trabajo?",
        "answer": "En la configuración mostrada ambas tienen rosca 1/4-28 UNF-2B, pero sirven a circuitos diferentes. Las de trabajo aspiran e impulsan el reactivo; las de lavado limpian la zona del pistón. No son intercambiables por tener la misma rosca. Conéctelas según el plano de la configuración suministrada."
      }
    ],
    "p15": [
      {
        "question": "¿Qué diferencia hay entre RPL-P15 y RPL-P6.35?",
        "answer": "Sus desplazamientos son de 300–1200 μL/rev y 50–300 μL/rev, respectivamente. RPL-P15 puede evaluarse para llenado y suministro de mayores volúmenes. Compare volumen objetivo, tiempo disponible y necesidades de dosis pequeñas; el caudal por sí solo no basta para elegir."
      },
      {
        "question": "¿300–1200 μL/rev es un caudal?",
        "answer": "No. Es el desplazamiento por vuelta; el caudal depende también de la velocidad. Por ejemplo, 500 μL/rev × 120 rpm dan un caudal medio nominal de 60 mL/min. Calibre el valor real con el líquido y la contrapresión previstos. Un caudal medio no implica ausencia de pulsaciones."
      },
      {
        "question": "¿RPL-P15 puede preparar por sí sola una mezcla proporcional?",
        "answer": "Es una bomba de un cabezal para dosificar o suministrar un líquido. La preparación proporcional de dos líquidos necesita una segunda vía y el control correspondiente. Para relaciones fijas concentrado:diluyente de 1:9 o 1:19, puede evaluarse por separado una configuración DRPL de doble cabezal."
      }
    ]
  },
  faqSingle: [
    { question: "¿Cómo se relacionan los nombres de uso con una bomba sin válvulas?", answer: "Bomba dosificadora sin válvulas describe mecanismo y función. Dispensadora de reactivos, dosificadora de valorante y bomba de llenado describen tareas en un equipo; no significan que todas las bombas de esas aplicaciones usen el mismo mecanismo." },
    { question: "¿{{range}} es el volumen de cada dosis?", answer: "Es el desplazamiento por vuelta, no una dosis garantizada ni el mínimo fiable. Para vueltas completas, multiplique desplazamiento por número de vueltas y después calibre en la salida. No presuponga entrega proporcional para cualquier ángulo parcial." },
    { question: "¿Reducir la velocidad disminuye la dosis?", answer: "Con el mismo desplazamiento y número de vueltas completas, alargar el tiempo no reduce la dosis nominal. Una dosis menor exige ajuste y control adecuados. El caudal medio es desplazamiento por velocidad, pero debe comprobarse con el circuito y líquido reales." },
    { question: "¿Qué materiales y conexiones se muestran para {{model}}?", answer: "{{materialDetails}} Compruebe todos los componentes mojados frente al reactivo y líquido de limpieza. Confirme accionamiento, montaje e interfaces para la configuración suministrada." },
    { question: "¿Cómo interpretar exactitud, presión y vida útil?", answer: "Confirme definición y condiciones de ensayo: líquido, temperatura, desplazamiento, velocidad y contrapresión. La resistencia a presión no equivale automáticamente a contrapresión operativa admisible, ni los ciclos a una garantía universal. Una bomba sin válvulas no elimina necesariamente las válvulas de conmutación o cierre del equipo." }
  ],
  faqDual: [
    { question: "¿Qué factor de dilución representa {{ratio}}?", answer: "Es concentrado:diluyente, una parte más {{parts}}. Con volúmenes aditivos, diluyente sin soluto objetivo y sin reacción, se obtienen {{factor}} partes con concentración 1/{{factor}} de la original. No confunda proporción de líquidos y factor final de dilución." },
    { question: "¿Qué cantidad se muestra para {{model}}?", answer: "{{concentrate}} μL de concentrado más {{diluent}} μL de diluyente, nominalmente {{total}} mL. Confirme la cantidad por lote con el accionamiento y secuencia reales; no es un mínimo validado para todas las condiciones." },
    { question: "¿El suministro proporcional garantiza la mezcla?", answer: "No. La bomba controla la relación de suministro; uniones, mezclador y depósito determinan homogeneidad. Mida ambas vías y ensaye la solución preparada: el volumen total no basta para confirmar proporción o concentración." },
    { question: "¿La velocidad puede cambiar 1:9 por 1:19?", answer: "No mediante un ajuste global solamente. Si ambas cantidades cambian en el mismo factor, la relación se mantiene. Otra proporción requiere confirmar cabezales y desplazamientos, no solo otra velocidad." },
    { question: "¿Cómo especificar las dos vías?", answer: "A y B tienen conexiones de trabajo 1/4-28 UNF-2B y G1/8; ambas de lavado son 1/4-28 UNF-2B. Revise materiales por vía en su configuración, sin trasladar automáticamente los de un modelo RPL. Confirme la contrapresión operativa separadamente de la resistencia a presión." }
  ],
  materialDetails: {
    p4: "La configuración mostrada tiene cabezal de fluoruro de polivinilideno (PVDF), conjunto de óxido de aluminio (Al₂O₃) y conexión de trabajo 1/4-28 UNF-2B.",
    p635: "La configuración mostrada tiene cabezal y tapón de fluoruro de polivinilideno (PVDF), conjunto de dióxido de zirconio (ZrO₂) y conexiones de trabajo y lavado 1/4-28 UNF-2B. La misma rosca no hace intercambiables los circuitos.",
    p15: "La configuración mostrada tiene cabezal y tapón de fluoruro de polivinilideno (PVDF), conjunto de óxido de aluminio (Al₂O₃), conexión de trabajo G1/8 y de lavado 1/4-28 UNF-2B."
  },
  selectionSingle: "Indique composición, dosis o caudal continuo, tiempo de adición, duración diaria, condiciones de entrada, contrapresión y control. Dimensione desplazamiento y ciclo y verifique después en el circuito real. Las aplicaciones son orientaciones de selección, no validación en todos los equipos citados.",
  selectionDual: "Indique ambos líquidos, relación volumétrica, lote o caudal total, tiempo, condiciones de entrada y contrapresión por vía, y mezcla aguas abajo. Evalúe por separado suministro proporcional, control y homogeneidad; las aplicaciones no implican validación universal.",
  specs: { "产品类型": "Tipo de producto", "排量范围": "Desplazamiento por vuelta", "转速": "Velocidad", "准确度": "Exactitud", "准确性": "Exactitud", "重复性": "Repetibilidad", "耐压": "Resistencia a presión", "寿命": "Vida útil", "泵头材质": "Material del cabezal", "堵头材质": "Material del tapón", "陶瓷套件": "Conjunto cerámico", "工作液路接口": "Conexión de trabajo", "清洗液路接口": "Conexión de lavado", "整体尺寸": "Dimensiones totales", "重量": "Peso", "配置方式": "Configuración", "稀释比": "Relación volumétrica concentrado:diluyente", "浓缩液份数": "Partes de concentrado", "稀释液份数": "Partes de diluyente", "浓缩液定量（μL）": "Volumen de concentrado (μL)", "稀释液定量（μL）": "Volumen de diluyente (μL)", "配液量（mL）": "Volumen total (mL)", "流量 QMin，mL/min": "Caudal mínimo QMin (mL/min)", "流量 QMax，mL/min": "Caudal máximo QMax (mL/min)", "试剂A 工作液路接口": "Conexión de trabajo, reactivo A", "试剂B 工作液路接口": "Conexión de trabajo, reactivo B", "试剂A 清洗液路接口": "Conexión de lavado, reactivo A", "试剂B 清洗液路接口": "Conexión de lavado, reactivo B", "试剂A 端耐压": "Resistencia a presión, vía A", "试剂B 端耐压": "Resistencia a presión, vía B", "尺寸/mm": "Dimensiones (mm)" },
  customConfiguration: "Configuración personalizada", metalFitting: "G1/8 (racor rápido metálico de serie)",
  applicationsTab: "Aplicaciones", applicationsTitle: "Aplicaciones típicas", selectionTitle: "Definir la tarea y la configuración",
  ctaTitle: "Confirme la configuración {{model}} para su equipo", ctaButton: "Enviar requisitos",
  drawingUnavailable: "No hay un plano 2D público de {{model}}. Añada la solicitud de plano a la lista de selección y envíe la consulta; la configuración y revisión del plano se confirman por separado.",
  modelUnavailable: "No hay un modelo 3D público de {{model}}. Indique el espacio de instalación y la configuración al solicitar el archivo.",
  specNotesSingle: ["El desplazamiento por vuelta no es la dosis ni el volumen mínimo fiable; verifique la salida con el líquido, accionamiento y circuito.", "Exactitud, repetibilidad y vida útil dependen de las condiciones de ensayo. Confirme la contrapresión operativa admisible por separado."],
  specNotesDual: ["La relación compara concentrado y diluyente. Compruebe cada salida; el volumen total no establece por sí solo la concentración.", "Dosificar proporcionalmente y mezclar son tareas distintas. Confirme materiales, contrapresión y condiciones de rendimiento de cada vía."]
};
