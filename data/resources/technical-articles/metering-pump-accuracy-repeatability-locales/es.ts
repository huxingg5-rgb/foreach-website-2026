import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";
import {
  getMeteringPumpAccuracyRepeatabilityArticleHref,
  getMeteringPumpAccuracyRepeatabilityProductHref,
  meteringPumpAccuracyRepeatabilityCoverImage,
} from "./shared";

const locale = "es" as const;
const articleHref = (slug: string) =>
  getMeteringPumpAccuracyRepeatabilityArticleHref(locale, slug);
const productHref = getMeteringPumpAccuracyRepeatabilityProductHref(locale);

export const meteringPumpAccuracyRepeatabilityEs = {
  metadata: {
    title:
      "¿Dosificación imprecisa o poco repetible? Causas y diagnóstico de la bomba dosificadora",
    seoTitle: "Exactitud y repetibilidad de bombas dosificadoras | FOREACH",
    seoDescription:
      "Diagnostique errores de dosificación y baja repetibilidad revisando burbujas, alimentación, fluido, tuberías, aguja y control del motor con una prueba de 10 ciclos.",
    coverImage: meteringPumpAccuracyRepeatabilityCoverImage,
    coverAlt: "bomba dosificadora sin válvulas FOREACH RPL-P4",
  },
  deck: "Si el mismo programa sigue produciendo volúmenes inestables, clasifique primero el patrón del error y después revise las burbujas, la alimentación de entrada, el fluido, las tuberías, la salida y los parámetros del motor. Esta guía ofrece un diagnóstico inicial directamente aplicable.",
  leadBlocks: [
    {
      type: "paragraph",
      text: "Conclusión: si varias dosificaciones son parecidas entre sí pero se desvían de forma constante del objetivo, suele tratarse de un problema de exactitud o de un sesgo sistemático; revise primero la calibración, el cálculo del desplazamiento y el punto de trabajo real. Si los resultados varían mucho con el mismo programa, suele ser un problema de repetibilidad; revise primero las burbujas, la alimentación de entrada, la elasticidad de la tubería, la aguja y la uniformidad del accionamiento. Si el resultado deriva con el tiempo, compruebe la temperatura, la viscosidad, la cristalización, la contaminación y el desgaste. El desplazamiento por vuelta no define directamente el volumen mínimo fiable; el resultado final debe validarse con el fluido y el circuito completos.",
    },
  ],
  sections: [
    {
      title: "Identifique el problema por el comportamiento de la dosificación",
      blocks: [
        {
          type: "table",
          headers: [
            "Comportamiento observado",
            "Revisar primero",
            "Primera acción",
          ],
          rows: [
            [
              "Todas las dosificaciones quedan altas o bajas, con poca dispersión",
              "Punto de trabajo, calibración, valor objetivo o conversión gravimétrica",
              "Vuelva a pesar el fluido objetivo y verifique desplazamiento, vueltas y densidad",
            ],
            [
              "Los resultados varían mucho con el mismo programa",
              "Burbujas, alimentación insuficiente, elasticidad de la tubería o líquido retenido en la aguja",
              "Vuelva a cebar y observe la entrada, el cabezal y la punta",
            ],
            [
              "Las primeras dosificaciones son incorrectas y después se estabilizan",
              "El cabezal o la tubería no están completamente llenos",
              "Añada ciclos de cebado y empiece a registrar tras la estabilización",
            ],
            [
              "El resultado deriva después de un tiempo de funcionamiento",
              "Temperatura, viscosidad, cristalización, contaminación o desgaste",
              "Mantenga la temperatura y compare antes y después de la limpieza",
            ],
            [
              "Ausencia de salida ocasional, gota retenida o salpicaduras",
              "Obstrucción de entrada, burbujas, tamaño de la aguja o rampas del motor",
              "Revise filtros, racores, aguja y aceleración/deceleración",
            ],
          ],
        },
      ],
    },
    {
      title: "Revise el circuito y el control en este orden",
      blocks: [
        {
          type: "table",
          headers: ["Elemento", "Cómo comprobarlo", "Acción correctiva"],
          rows: [
            [
              "Cabezal y burbujas",
              "Cebe lentamente y observe si quedan burbujas, se comprimen o se desplazan en ambos sentidos en el cabezal o la entrada",
              "Vuelva a cebar y purgar, y confirme que los racores no aspiren más aire",
            ],
            [
              "Alimentación de entrada",
              "Reduzca temporalmente la altura de aspiración o acorte la entrada y repita la prueba",
              "Reduzca la aspiración, acorte la tubería y revise la resistencia del filtro",
            ],
            [
              "Fluido y temperatura",
              "Ejecute el mismo programa con el fluido objetivo y uno de referencia, y compare tras cambiar el fluido o la temperatura",
              "Fije el fluido y la temperatura, y vuelva a calibrar y probar con el fluido objetivo",
            ],
            [
              "Salida y aguja",
              "Compruebe si quedan gotas, líquido residual o salpicaduras y si cada gota entra en el recipiente",
              "Limpie o sustituya la aguja y fije su posición, la condición de salida y los parámetros de arranque y parada",
            ],
            [
              "Elasticidad de la tubería y racores",
              "Mantenga la bomba sin cambios y compare tras instalar una tubería más corta o menos elástica",
              "Use una tubería más corta, de diámetro interior adecuado y con conexiones seguras",
            ],
            [
              "Motor y programa",
              "Verifique que vueltas, velocidad, fase de arranque/parada y rampas sean iguales en cada ciclo",
              "Fije el ciclo completo y los parámetros de accionamiento antes de comparar",
            ],
          ],
        },
      ],
    },
    {
      title: "Realice una comprobación rápida de 10 dosificaciones",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Limpie y cebe por completo el cabezal y la tubería, eliminando las burbujas visibles.",
            "Mantenga constantes el fluido, la temperatura, el nivel del depósito, la tubería, el filtro, la aguja y la posición de salida.",
            "Registre modelo, ajuste de desplazamiento, vueltas, velocidad, aceleración y deceleración.",
            "Realice 10 dosificaciones consecutivas con el mismo programa y pese cada una por separado, no solo el total.",
            "Convierta la masa en volumen mediante la densidad del fluido objetivo, calcule la media y compárela con el objetivo.",
            "Calcule la desviación estándar muestral o el RSD para evaluar la concentración de los resultados.",
            "Cambie una sola condición antes de repetir la prueba para conservar la trazabilidad de la causa.",
          ],
        },
        {
          type: "formula",
          expression:
            "Desviación media respecto al objetivo (%) = (volumen medio medido − volumen objetivo) ÷ volumen objetivo × 100%",
          note: "Un valor positivo indica una media superior al objetivo y uno negativo, inferior. Una desviación persistente dirige primero a calibración, punto de trabajo y conversión.",
        },
        {
          type: "formula",
          expression:
            "Volumen medido = masa neta del líquido ÷ densidad del fluido objetivo",
          note: "Use unidades compatibles. En volúmenes pequeños, confirme que la resolución de la balanza, la evaporación y el tiempo de pesaje permiten obtener una conclusión válida.",
        },
        {
          type: "formula",
          expression:
            "RSD (%) = desviación estándar muestral ÷ volumen medio medido × 100%",
          note: "Un RSD alto dirige primero a burbujas, alimentación, tuberías, salida y uniformidad del accionamiento.",
        },
        {
          type: "table",
          headers: [
            "Resultado de 10 ciclos",
            "Causa prioritaria",
            "Paso siguiente",
          ],
          rows: [
            [
              "Resultados agrupados, pero media siempre alta o baja",
              "Calibración, conversión del desplazamiento, densidad o contrapresión",
              "Recalibre con el fluido objetivo y verifique el punto de trabajo",
            ],
            [
              "Media próxima al objetivo, pero resultados individuales dispersos",
              "Burbujas, alimentación, elasticidad de tubería o accionamiento",
              "Purgue y fije por separado las condiciones del circuito y del control",
            ],
            [
              "Primeros resultados desviados y después estables",
              "Cebado insuficiente o cámara sin llenar por completo",
              "Añada ciclos de cebado y de descarga a residuos",
            ],
            [
              "El resultado cambia gradualmente con el tiempo",
              "Temperatura, viscosidad, cristalización, contaminación o desgaste",
              "Mantenga la temperatura y compare antes y después de limpiar",
            ],
            [
              "El resultado cambia tras sustituir aguja o tubería",
              "Cambio de resistencia de salida o volumen del circuito",
              "Vuelva a validar con el nuevo circuito",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "Diez mediciones sirven para un diagnóstico inicial en campo, no sustituyen una validación formal. Defina el tamaño de muestra, la desviación admisible y el equipo de medida según el proyecto.",
        },
      ],
    },
    {
      title: "Vuelva a comprobar después de estos cambios",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Cambio de fluido, concentración, lote o temperatura de trabajo;",
            "Cambio de tubería, filtro, racor, aguja o boquilla;",
            "Cambio de altura del depósito, aspiración, contrapresión o posición de salida;",
            "Cambio de desplazamiento, vueltas, velocidad, rampas o programa de arranque/parada;",
            "Limpieza del cabezal, sustitución de piezas mojadas o eliminación de cristales;",
            "Desplazamiento de la media, aumento de la dispersión o deriva con el tiempo.",
          ],
        },
        {
          type: "paragraph",
          text: "Para seleccionar o diagnosticar, facilite el volumen o caudal objetivo, el tiempo de ciclo, el fluido y su temperatura, el nivel de entrada, las dimensiones de la tubería, la contrapresión, la aguja y el método de accionamiento. Esta información define mejor el punto de trabajo real que preguntar solo por un porcentaje de exactitud.",
        },
      ],
    },
    {
      title: "Use el desplazamiento RPL solo para una preselección",
      blocks: [
        {
          type: "paragraph",
          text: "El desplazamiento por vuelta de RPL permite delimitar un intervalo nominal. La dosificación real debe probarse con las vueltas, el tiempo de ciclo, el fluido y el circuito completos.",
        },
        {
          type: "table",
          headers: [
            "Modelo",
            "Desplazamiento por vuelta",
            "Tareas para evaluar primero",
          ],
          rows: [
            [
              "RPL-P4",
              "12–80 μL/rev",
              "Dosificación de pequeños volúmenes, titulante y dispensación repetida",
            ],
            [
              "RPL-P6.35",
              "50–300 μL/rev",
              "Dispensación de reactivos, dosificación de titulante y llenado volumétrico",
            ],
            [
              "RPL-P15",
              "300–1200 μL/rev",
              "Llenado de mayor volumen, adición de tampón y suministro cuantitativo",
            ],
          ],
        },
        {
          type: "paragraph",
          text: "El límite inferior por vuelta no es el volumen mínimo fiable. Después de seleccionar el modelo, valídelo con el fluido, la tubería, la contrapresión, la aguja y el programa de control reales.",
        },
      ],
    },
    {
      title: "Páginas relacionadas",
      blocks: [
        {
          type: "links",
          ordered: true,
          items: [
            {
              href: articleHref("what-is-a-valveless-metering-pump"),
              label:
                "¿Qué es una bomba dosificadora sin válvulas? Principio, aplicaciones y selección",
            },
            {
              href: articleHref("rpl-valveless-metering-pump-selection-guide"),
              label:
                "Guía de selección de la bomba dosificadora sin válvulas RPL de un cabezal",
            },
            {
              href: productHref,
              label: "Ver bombas dosificadoras sin válvulas RPL y DRPL",
            },
          ],
        },
      ],
    },
  ],
  faqTitle: "Preguntas frecuentes sobre el diagnóstico de dosificación",
  faqItems: [
    {
      question:
        "Los resultados son parecidos, pero siempre quedan por debajo del objetivo. ¿Qué debo revisar?",
      answer:
        "Los resultados están agrupados, pero existe un sesgo persistente del punto de trabajo. Verifique con el fluido objetivo el desplazamiento, las vueltas, la conversión de densidad, la contrapresión y la calibración.",
    },
    {
      question: "¿Por qué cambia el volumen al sustituir el fluido?",
      answer:
        "La viscosidad, densidad, tensión superficial y volatilidad cambian el llenado del cabezal, la resistencia de la tubería y la formación de la gota. Tras cambiar el fluido, vuelva a cebar y a comprobar por gravimetría.",
    },
    {
      question: "¿El límite inferior por vuelta es el volumen mínimo fiable?",
      answer:
        "No. También influyen el posicionamiento del accionamiento, el ciclo completo, las burbujas, la tubería, la aguja y el método de medida. Debe validarse en el circuito objetivo.",
    },
  ],
  cta: {
    title:
      "¿Necesita diagnosticar la dosificación o seleccionar un modelo RPL?",
    description:
      "Envíe a FOREACH el volumen o caudal objetivo, el tiempo de ciclo, el fluido, la tubería, la contrapresión, la aguja y el accionamiento para revisar el punto de trabajo y las condiciones de validación.",
    contactLabel: "Consultar la selección técnica",
    productsLabel: "Ver bombas dosificadoras sin válvulas",
    productsHref: productHref,
  },
} satisfies DiaphragmPumpEngineeringArticleCopy;
