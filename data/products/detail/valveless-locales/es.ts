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
    "p4": "P4 Bomba miniatura de émbolo sin válvulas para dosificar reactivos en analizadores",
    "p635": "P6.35 Bomba OEM de émbolo rotativo sin válvulas para manejo de líquidos en laboratorio",
    "p15": "P15 Bomba dosificadora de émbolo cerámico para llenado de reactivos en ciencias de la vida",
    "dual9": "DRPL-0109 Bomba de doble cabezal con émbolos cerámicos para dilución de reactivos en diagnóstico in vitro",
    "dual19": "DRPL-0119 Bomba de émbolo de doble cabezal para dosificación proporcional en laboratorio"
  },
  introductions: {
    "p4": {
      "title": "RPL-P4 Bomba miniatura de émbolo sin válvulas para dosificar reactivos en analizadores",
      "paragraphs": [
        "La RPL-P4 es una bomba dosificadora miniatura de pistón cerámico sin válvulas para dispensar reactivos en analizadores de diagnóstico in vitro y de bioquímica clínica, añadir titulante y llenar pequeños viales y tubos de reactivo. Su desplazamiento es de 12–80 μL por vuelta. Trabaja a 5–300 rpm, con un caudal de 0,06–24 mL/min.",
        "El pistón cerámico gira y se desplaza axialmente dentro del cilindro, conectando la cámara de bombeo de forma alterna con la entrada y la salida. Así realiza la aspiración, la impulsión y la conmutación sin válvulas de retención independientes, por lo que no requiere el mantenimiento de esos componentes. Su reducido desplazamiento facilita la dosificación de pequeños volúmenes: el desplazamiento y el número de vueltas determinan el volumen calculado de cada dosis, mientras que la velocidad ajusta el tiempo de dispensación.",
        "La configuración mostrada incorpora un cabezal de fluoruro de polivinilideno (PVDF) y un conjunto de pistón y cilindro de alúmina (Al₂O₃). Los puertos de proceso 1/4-28 UNF-2B permiten conectar racores de fondo plano y tubos de las dimensiones correspondientes. Con unas dimensiones de 57 × 57 × 115 mm y un peso de 500 g, se integra en módulos de dispensación con espacio de montaje limitado."
      ],
      "commonApplications": [
        "Analizadores automatizados: dispensación y dosificación de pequeños volúmenes de reactivo",
        "Tituladores automáticos: suministro de valorante y dosificación incremental",
        "Equipos de laboratorio: llenado volumétrico de viales y tubos de reactivo"
      ],
      "metaDescription": "Bomba dosificadora sin válvulas RPL-P4, 12–80 μL/rev, para reactivos y titulación. Cabezal de PVDF y conjunto cerámico de alúmina."
    },
    "p635": {
      "title": "RPL-P6.35 Bomba OEM de émbolo rotativo sin válvulas para manejo de líquidos en laboratorio",
      "paragraphs": [
        "La RPL-P6.35 es una bomba dosificadora de un cabezal con pistón cerámico sin válvulas y desplazamiento regulable mecánicamente entre 50 y 300 μL por vuelta. Funciona a 5–300 rpm y ofrece un caudal de 0,25–90 mL/min. Está indicada para dispensar reactivos y realizar adiciones secuenciales en analizadores, suministrar titulante y llenar tubos de reactivo o pequeños frascos.",
        "El movimiento combinado de rotación y vaivén del pistón realiza la aspiración, la impulsión y el cambio entre puertos sin válvulas de retención independientes. El ajuste mecánico modifica la carrera y el desplazamiento por vuelta; el número de vueltas determina la dosis calculada y la velocidad permite ajustar el tiempo de entrega. En equipos que trabajan con varios volúmenes de llenado, se elige el desplazamiento según el volumen y el tiempo de ciclo requeridos y se calibra la entrega en ese ajuste.",
        "La configuración mostrada utiliza un cabezal y tapones de fluoruro de polivinilideno (PVDF), junto con un conjunto de pistón y cilindro de zirconia (ZrO₂). Tanto los puertos de proceso como los de lavado son 1/4-28 UNF-2B. El circuito de lavado permite enjuagar la zona del pistón al trabajar con reactivos salinos o líquidos propensos a cristalizar. Sus dimensiones son 78 × 78 × 145 mm y su peso, 750 g, para integración OEM en analizadores y módulos automáticos de dosificación."
      ],
      "commonApplications": [
        "Analizadores automatizados: dispensación y adición de reactivos por etapas",
        "Tituladores de laboratorio: suministro y dosificación de valorante",
        "Equipos de envasado de reactivos: llenado volumétrico de tubos y frascos"
      ],
      "metaDescription": "RPL-P6.35, bomba dosificadora sin válvulas de 50–300 μL/rev para reactivos, titulación y llenado. Cabezal de PVDF, zirconia y conexiones de lavado."
    },
    "p15": {
      "title": "RPL-P15 Bomba dosificadora de émbolo cerámico para llenado de reactivos en ciencias de la vida",
      "paragraphs": [
        "La RPL-P15 es una bomba dosificadora de pistón cerámico sin válvulas para mayores volúmenes de llenado y necesidades de suministro de líquido. Su desplazamiento se regula mecánicamente entre 300 y 1200 μL por vuelta. A una velocidad de 5–300 rpm, el caudal abarca 1,5–360 mL/min. Sus aplicaciones incluyen el llenado de frascos de reactivos de diagnóstico, la dispensación de soluciones tampón, la reposición de depósitos y la alimentación dosificada de instrumentos analíticos.",
        "El pistón combina rotación y movimiento alternativo para aspirar, impulsar y conmutar entre puertos sin válvulas de retención independientes. Un mayor desplazamiento reduce el número de vueltas necesario para un mismo volumen de llenado. Por ejemplo, a 1000 μL por vuelta, 10 vueltas equivalen a un volumen calculado de 10 mL. Para cambiar de formato, se ajusta el número de vueltas o el desplazamiento y se calibra la entrega al ritmo de llenado requerido.",
        "La configuración mostrada incorpora un cabezal y tapones de fluoruro de polivinilideno (PVDF), con un conjunto de pistón y cilindro de alúmina (Al₂O₃). Los puertos de proceso son G1/8 y los de lavado, 1/4-28 UNF-2B. Estos últimos permiten enjuagar la zona del pistón para reducir la acumulación de residuos y el riesgo de cristalización. La bomba mide 78 × 78 × 160 mm y pesa 900 g."
      ],
      "commonApplications": [
        "Envasado de reactivos: llenado volumétrico de frascos",
        "Estaciones de preparación de laboratorio: dispensación de tampones preparados y reposición de depósitos",
        "Módulos de instrumentos analíticos: suministro y transferencia dosificados"
      ],
      "metaDescription": "RPL-P15, bomba dosificadora sin válvulas de 300–1200 μL/rev para llenado de reactivos y dispensación de tampones. PVDF, alúmina y conexiones de lavado."
    },
    "dual9": {
      "title": "DRPL-0109 Bomba de doble cabezal con émbolos cerámicos para dilución de reactivos en diagnóstico in vitro",
      "paragraphs": [
        "La DRPL-0109 es una bomba dosificadora de doble cabezal con pistones cerámicos sin válvulas para suministrar concentrado y diluyente en una proporción volumétrica de 1:9. La configuración mostrada entrega 100 μL + 900 μL por vuelta. A 60–300 rpm, el caudal total es de 60–300 mL/min. Se utiliza para la dilución en línea de reactivos y soluciones de lavado concentrados en analizadores, la preparación de tampones a proporción fija y la dosificación proporcional en la producción de reactivos.",
        "Un mismo accionamiento mueve los dos cabezales, evitando tener que sincronizar dos bombas independientes. Cada pistón cerámico dosifica su líquido mediante rotación y movimiento alternativo. La velocidad modifica el caudal total; los desplazamientos configurados definen la proporción volumétrica nominal. Una parte de concentrado y nueve de diluyente permiten preparar una solución de trabajo 1× a partir de una formulación 10× compatible, con mezcla posterior a la bomba.",
        "El canal A dispone de puertos de proceso 1/4-28 UNF-2B. El canal B utiliza G1/8 y se suministra por defecto con racores rápidos metálicos. Ambos canales incorporan conexiones de lavado 1/4-28 UNF-2B. El conjunto mide 180 × 83,7 × 75 mm. Las salidas se conectan a los componentes de unión y mezcla; durante la puesta en marcha se calibra cada canal por separado y se comprueban la concentración y la homogeneidad de la solución preparada."
      ],
      "commonApplications": [
        "Analizadores automatizados: dilución en línea de reactivos en relación concentrado:diluyente 1:9",
        "Equipos de laboratorio: preparación de tampones en proporción fija",
        "Producción de reactivos: dosificación proporcional de dos líquidos por lotes"
      ],
      "metaDescription": "Bomba dosificadora sin válvulas DRPL-0109 de doble cabezal, relación concentrado:diluyente 1:9, para dilución de reactivos y preparación de tampones."
    },
    "dual19": {
      "title": "DRPL-0119 Bomba de émbolo de doble cabezal para dosificación proporcional en laboratorio",
      "paragraphs": [
        "La DRPL-0119 es una bomba dosificadora de doble cabezal con pistones cerámicos sin válvulas para diluir concentrados en una proporción volumétrica de 1:19. La configuración mostrada entrega 60 μL + 1140 μL por vuelta. Con una velocidad de 60–300 rpm, el caudal total es de 72–360 mL/min. Está destinada a diluir reactivos y soluciones de lavado 20× en analizadores, preparar soluciones de trabajo de laboratorio y dosificar dos líquidos a proporción fija.",
        "Los dos cabezales comparten accionamiento y dosifican mediante el movimiento rotativo y alternativo de sus pistones cerámicos. La proporción 1:19 combina una parte de concentrado con diecinueve de diluyente para formulaciones previstas para diluir un concentrado 20× hasta su concentración de uso. Para obtener el mismo volumen final a la misma concentración, una formulación 20× requiere la mitad de volumen de concentrado que una 10×. Esto permite elegir entre reducir el tamaño del depósito de concentrado o mantener su capacidad y espaciar las reposiciones.",
        "El canal A utiliza puertos de proceso 1/4-28 UNF-2B; el canal B, G1/8, con racores rápidos metálicos por defecto. Ambos disponen de conexiones de lavado 1/4-28 UNF-2B. Sus dimensiones, 180 × 83,7 × 75 mm, coinciden con las de la DRPL-0109. Dado que el canal de concentrado entrega 60 μL por vuelta, debe calibrarse cada canal individualmente: el caudal total no basta para confirmar la proporción. La homogeneidad depende de la mezcla posterior y de la secuencia de preparación."
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
  specNotesSingle: ["El intervalo de caudal se calcula a partir del desplazamiento por vuelta y la velocidad. Calibre la entrega real con el líquido, la contrapresión y el circuito previstos.","El desplazamiento por vuelta no es la dosis ni el volumen mínimo fiable; verifique la salida con el líquido, accionamiento y circuito.","Exactitud, repetibilidad y vida útil dependen de las condiciones de ensayo. Confirme la contrapresión operativa admisible por separado."],
  specNotesDual: ["El caudal total se calcula con la suma de los desplazamientos de ambos cabezales y la velocidad. Compruebe la entrega de cada canal y la proporción volumétrica en las condiciones reales de líquido y presión.","La relación compara concentrado y diluyente. Compruebe cada salida; el volumen total no establece por sí solo la concentración.","Dosificar proporcionalmente y mezclar son tareas distintas. Confirme materiales, contrapresión y condiciones de rendimiento de cada vía."]
};
