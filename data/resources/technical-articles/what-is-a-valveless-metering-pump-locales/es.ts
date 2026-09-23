import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";
import {
  getValvelessMeteringPumpOverviewArticleHref,
  getValvelessMeteringPumpOverviewProductHref,
  valvelessMeteringPumpOverviewCoverImage,
} from "./shared";

const locale = "es" as const;
const productHref = (slug?: string) =>
  getValvelessMeteringPumpOverviewProductHref(locale, slug);
const articleHref = (slug: string) =>
  getValvelessMeteringPumpOverviewArticleHref(locale, slug);

export const valvelessMeteringPumpOverviewEs = {
  metadata: {
    title: "¿Qué es una bomba dosificadora sin válvulas? Principio de funcionamiento, aplicaciones y selección",
    seoTitle: "¿Qué es una bomba dosificadora sin válvulas? | FOREACH",
    seoDescription:
      "Descubra cómo funciona una bomba dosificadora sin válvulas, cómo se calculan el desplazamiento y el caudal, dónde se utiliza y cómo elegir una bomba RPL o DRPL.",
    coverImage: valvelessMeteringPumpOverviewCoverImage,
    coverAlt: "Bombas dosificadoras sin válvulas de pistón cerámico FOREACH RPL y DRPL",
  },
  deck:
    "Una bomba dosificadora sin válvulas es una bomba de desplazamiento positivo que combina el giro y el movimiento alternativo axial de un pistón para conmutar el recorrido del fluido, aspirar y descargar líquido. El mecanismo de bombeo no depende de válvulas de retención convencionales de entrada y salida. Puede utilizarse para dosificar reactivos, realizar titulaciones, llenar recipientes y suministrar dos líquidos en proporción, pero el rendimiento debe verificarse con el fluido, la presión, la tubería, el accionamiento y la limpieza reales.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "Una bomba dosificadora sin válvulas es una bomba de desplazamiento positivo que combina el giro y el movimiento alternativo axial de un pistón para conmutar el recorrido del fluido, aspirar y descargar líquido. El mecanismo de bombeo no depende de válvulas de retención convencionales de entrada y salida. Puede utilizarse para dosificar reactivos, realizar titulaciones, llenar recipientes y suministrar dos líquidos en proporción, pero el rendimiento debe verificarse con el fluido, la presión, la tubería, el accionamiento y la limpieza reales.",
    },
    {
      type: "notice",
      label: "Límite importante:",
      text:
        "sin válvulas describe el mecanismo de bombeo. No significa que el instrumento completo nunca necesite una válvula de conmutación, de aislamiento u otro componente de control de fluidos.",
    },
  ],
  sections: [
    {
      title: "¿Cómo funciona una bomba dosificadora sin válvulas?",
      blocks: [
        {
          type: "paragraph",
          text:
            "El pistón cerámico gira mientras se desplaza axialmente. El giro alinea alternativamente la cámara de dosificación con la entrada y la salida, mientras que el desplazamiento axial modifica el volumen de la cámara. Cuando ambos movimientos mantienen la relación de fase necesaria, la bomba repite un ciclo de aspiración y descarga.",
        },
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-working-cycle-es.webp",
          alt: "Ciclo de aspiración y descarga en cuatro etapas de una bomba dosificadora sin válvulas",
          width: 1390,
          height: 646,
          caption:
            "Ciclo de trabajo de una bomba dosificadora sin válvulas: la rotación del pistón conmuta entre la entrada y la salida, mientras el movimiento axial alternativo aspira y descarga el líquido.",
        },
        {
          type: "table",
          headers: ["Etapa", "Estado del pistón y los puertos", "Acción del fluido"],
          rows: [
            ["Preparación de la aspiración", "La cámara gira hacia la entrada y el pistón comienza a retroceder", "La entrada se comunica con la cámara"],
            ["Aspiración", "El pistón continúa retrocediendo y aumenta el volumen de la cámara", "El líquido entra en la cámara"],
            ["Conmutación del recorrido", "El pistón gira la cámara desde la entrada hacia la salida", "La entrada se cierra y la salida se prepara para abrirse"],
            ["Descarga", "El pistón avanza y disminuye el volumen de la cámara", "El líquido sale por la salida"],
          ],
        },
        {
          type: "paragraph",
          text:
            "La geometría de los puertos, la fase de movimiento y el ajuste del desplazamiento dependen del diseño del cabezal. El ciclo explica el principio, pero la especificación del modelo y la prueba del sistema siguen siendo la referencia para la selección.",
        },
      ],
    },
    {
      title: "Desplazamiento por revolución, volumen por dosis y caudal medio",
      blocks: [
        {
          type: "paragraph",
          text:
            "El desplazamiento de una bomba dosificadora sin válvulas suele expresarse en μL/rev: el volumen nominal suministrado durante una revolución completa con el ajuste actual. El volumen por dosis también depende del número de revoluciones, mientras que el caudal medio depende además de la velocidad de giro. Son tres magnitudes diferentes.",
        },
        {
          type: "formula",
          expression: "Volumen por dosis = desplazamiento por revolución × número de revoluciones",
          note: "Mantenga coherentes las unidades de volumen. Es una estimación nominal para ciclos completos.",
        },
        {
          type: "formula",
          expression: "Caudal medio = desplazamiento por revolución × velocidad de giro",
          note: "Con μL/rev y rev/min, el resultado se expresa en μL/min.",
        },
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/rpl-manual-flow-adjustment.webp",
          alt: "Mando de ajuste manual del caudal de una bomba dosificadora sin válvulas FOREACH RPL",
          width: 1200,
          height: 1200,
          caption:
            "Ajuste manual del caudal en una bomba RPL: al girar el mando se modifica el ajuste mecánico del desplazamiento.",
        },
        {
          type: "notice",
          text:
            "El límite inferior del intervalo de desplazamiento no equivale a la dosis mínima fiable. Los resultados de pequeño volumen también dependen del posicionamiento del accionamiento, la holgura, el fluido, las burbujas, la elasticidad de la tubería, el líquido retenido en la punta y el método de medición. Valide la exactitud y la repetibilidad en las condiciones objetivo.",
        },
      ],
    },
    {
      title: "Ventajas y límites del mecanismo sin válvulas",
      blocks: [
        {
          type: "table",
          headers: ["Aspecto técnico", "Valor potencial", "Límite que debe comprobarse"],
          rows: [
            ["Sin válvulas de retención convencionales en el mecanismo de bombeo", "Reduce la dependencia del asiento y del movimiento de válvulas en cada ciclo", "Las partículas, la cristalización y los depósitos pueden afectar los ajustes cerámicos y los puertos"],
            ["Movimiento rotativo y alternativo acoplado", "Integra la conmutación del recorrido y el desplazamiento positivo en un cabezal", "Requiere posicionamiento, fase y ciclos completos correctos"],
            ["Conjunto de pistón cerámico", "Favorece una dosificación repetible con materiales mojados seleccionados para el fluido", "La compatibilidad depende de la concentración, la temperatura, el tiempo de contacto y el líquido de limpieza"],
            ["Ajuste mecánico del desplazamiento y de la velocidad", "Permite adaptar tanto el volumen de la dosis como el tiempo del proceso", "Los ajustes deben calibrarse por método gravimétrico o volumétrico en el circuito real"],
          ],
        },
        {
          type: "paragraph",
          text:
            "Sin válvulas no significa automáticamente ausencia de pulsaciones, funcionamiento en seco, imposibilidad de obstrucción ni compatibilidad con cualquier viscosidad o contrapresión. Una alimentación deficiente, las burbujas, la resistencia de salida, los depósitos y una limpieza inadecuada pueden modificar la estabilidad del suministro y la vida útil.",
        },
      ],
    },
    {
      title: "¿Dónde se utilizan las bombas dosificadoras sin válvulas?",
      blocks: [
        {
          type: "paragraph",
          text:
            "Las tareas habituales incluyen la dosificación de reactivos, la adición de titulante, la adición de soluciones de calibración o tampones, el llenado cuantitativo y el suministro proporcional de dos líquidos. Estos nombres describen la tarea dentro del instrumento; no significan que todos los instrumentos con esa tarea deban utilizar una bomba sin válvulas.",
        },
        {
          type: "table",
          headers: ["Serie FOREACH", "Configuración mostrada", "Tarea típica"],
          rows: [
            ["RPL-P4", "12–80 μL/rev, un cabezal", "Adición de reactivos en pequeños volúmenes, titulación y dispensación repetida"],
            ["RPL-P6.35", "50–300 μL/rev, un cabezal", "Dosificación de reactivos, titulación y llenado cuantitativo"],
            ["RPL-P15", "300–1200 μL/rev, un cabezal", "Adiciones de mayor volumen, tampones y transferencia dosificada"],
            ["DRPL-0109", "Dos cabezales, 1:9; 100 μL + 900 μL", "Suministro proporcional de concentrado y diluyente"],
            ["DRPL-0119", "Dos cabezales, 1:19; 60 μL + 1140 μL", "Suministro de dos líquidos con una relación de dilución mayor"],
          ],
        },
        {
          type: "notice",
          text:
            "Una bomba DRPL dosifica dos corrientes de líquido. La uniformidad final de la mezcla también depende de la unión, el mezclador, el volumen aguas abajo y la secuencia de control.",
        },
      ],
    },
    {
      title: "Cómo seleccionar una bomba dosificadora sin válvulas",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Defina primero la tarea: dosificación discreta, titulación, llenado, suministro continuo o suministro proporcional de dos líquidos.",
            "Fije la dosis objetivo, el tiempo disponible, el número diario de ciclos y el error aceptable; después calcule el desplazamiento, las revoluciones y la velocidad necesarios.",
            "Registre la identidad y concentración del fluido, la viscosidad, el riesgo de partículas o cristalización, la temperatura de trabajo, el líquido de limpieza y el tiempo de parada.",
            "Registre el nivel del depósito, la altura de aspiración, la longitud y el diámetro interior de la tubería y las restricciones de salida causadas por filtros, agujas, mezcladores u otros componentes.",
            "Confirme los materiales mojados, los puertos de trabajo y lavado, el montaje, el motor y el método de control, diferenciando la configuración mostrada de las opciones específicas del proyecto.",
            "Mida el volumen por dosis, la repetibilidad, el tiempo, las burbujas, las fugas y la recuperación tras la limpieza en el circuito real antes de fijar los parámetros de producción.",
          ],
        },
      ],
    },
    {
      title: "Comprobaciones de instalación, puesta en marcha y mantenimiento",
      blocks: [
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-installation-orientation.png",
          alt: "Orientaciones de instalación permitidas y no permitidas de la bomba dosificadora sin válvulas FOREACH",
          width: 2113,
          height: 1024,
          caption:
            "Orientaciones de instalación de la bomba dosificadora sin válvulas: utilice las posiciones marcadas con una marca de verificación verde y evite la posición marcada con una X roja. Siga las instrucciones de instalación del modelo correspondiente.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Elimine el aire de la tubería de entrada y de la cámara antes de evaluar la exactitud, para no confundir el volumen de las burbujas con un error de la bomba.",
            "Mantenga una alimentación estable y evite una altura de aspiración excesiva, tuberías largas y estrechas o filtros obstruidos que generen una caída de presión elevada en la entrada.",
            "No interprete un valor de resistencia a la presión como contrapresión de trabajo continua permitida; utilice la definición de la especificación y una prueba del circuito real.",
            "Para fluidos que cristalizan, dejan depósitos o se cambian con frecuencia, defina el lavado al detener el equipo, la compatibilidad del líquido de limpieza y la gestión de residuos.",
            "Documente el fluido, la temperatura, el ajuste de desplazamiento, la velocidad, la contrapresión, el número de ciclos y el método de medición para que el resultado pueda reproducirse.",
          ],
        },
      ],
    },
    {
      title: "Productos y orientación adicional para la selección",
      blocks: [
        {
          type: "links",
          ordered: true,
          items: [
            { href: productHref(), label: "Ver bombas dosificadoras sin válvulas" },
            { href: articleHref("rpl-valveless-metering-pump-selection-guide"), label: "Consultar la guía de selección RPL de un cabezal" },
          ],
        },
      ],
    },
  ],
  faqTitle: "Preguntas frecuentes sobre bombas dosificadoras sin válvulas",
  faqItems: [
    {
      question: "¿En qué se diferencia una bomba dosificadora sin válvulas de otras bombas dosificadoras?",
      answer:
        "La diferencia principal está en el mecanismo de bombeo y conmutación. Una bomba sin válvulas utiliza el giro y el movimiento alternativo del pistón para alternar entre entrada y salida mientras cambia el volumen de la cámara, sin válvulas de retención convencionales. Otras bombas pueden usar válvulas de retención, diafragmas u otros mecanismos. La selección final sigue dependiendo de la dosis, la presión, el fluido y el control.",
    },
    {
      question: "¿Un menor desplazamiento por revolución siempre significa una dosis mínima menor?",
      answer:
        "No. El desplazamiento por revolución es la salida nominal de un ciclo completo. La dosis mínima fiable también depende del posicionamiento del motor, la holgura, el fluido, la tubería, las burbujas, la punta y el método de medición. Confírmela mediante ensayos repetidos en las condiciones objetivo.",
    },
    {
      question: "¿Sin válvulas significa que el instrumento completo nunca necesita una válvula?",
      answer:
        "No. Sin válvulas describe el mecanismo de bombeo. El sistema completo puede necesitar válvulas de conmutación, aislamiento, control de retorno o seguridad según las funciones de alimentación, limpieza, retorno y protección.",
    },
    {
      question: "¿Cuál es la diferencia entre RPL y DRPL?",
      answer:
        "RPL es una bomba dosificadora sin válvulas de un cabezal para un solo recorrido de fluido. DRPL es una configuración de dos cabezales para suministrar dos líquidos con una relación volumétrica definida. La dosificación de ambas corrientes y la mezcla aguas abajo son funciones distintas y deben validarse por separado.",
    },
  ],
  cta: {
    title: "¿Necesita revisar una aplicación real con una bomba sin válvulas?",
    description:
      "Comparta con FOREACH la dosis o el caudal medio objetivo, el tiempo disponible, el fluido, las condiciones de entrada y salida, las conexiones y el método de control para revisar una configuración RPL o DRPL y sus condiciones de validación.",
    contactLabel: "Consultar la aplicación",
    productsLabel: "Ver bombas dosificadoras sin válvulas",
    productsHref: productHref(),
  },
} satisfies DiaphragmPumpEngineeringArticleCopy;
