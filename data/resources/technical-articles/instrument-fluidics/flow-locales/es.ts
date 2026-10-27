import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";
import { getFlowTableRows } from "./shared";

// Editorial localization; FOREACH facts retained. Industry terminology checked against CPC and Nordson MEDICAL.
const flowTableLabels = {
  "outsideRange": "Fuera del gráfico",
  "flowAtOneBar": "Caudal con una pérdida de 1 bar (L/min)",
  "coefficients": "Kv / Cv estimados",
  "steepCurve": "Pendiente excesiva para una estimación útil"
};

export const copy = {
  "metadata": {
    "title": "Caudal en acoplamientos rápidos: curvas de pérdida de presión y cálculo con Kv/Cv",
    "seoTitle": "Caudal y pérdida de presión en acoplamientos rápidos | FOREACH",
    "seoDescription": "Seleccione acoplamientos Q20, Q40 y Q60 con curvas de caudal y pérdida de presión y estimaciones Kv/Cv. Válvulas, aspiración de bombas y circuitos con varios ramales.",
    "coverImage": "/images/resources/technical-articles/instrument-fluidics/quick-disconnect-coupling-flow-pressure-drop-cover.webp",
    "coverAlt": "Acoplamientos rápidos Q60 grises, conectados y separados, sobre fondo blanco"
  },
  "deck": "El caudal que admite un acoplamiento rápido depende de la pérdida de presión permitida, el diámetro del tubo, las válvulas y las propiedades del fluido. Parta del caudal necesario y compruebe, mediante la curva o una estimación Kv/Cv, si la pérdida del acoplamiento cabe en el presupuesto de presión del circuito. Esta guía utiliza las series FOREACH Q20, Q40 y Q60 para explicar la lectura de curvas, el cálculo y la selección en aspiración y en circuitos con varios ramales.",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "El caudal que admite un acoplamiento rápido depende de la pérdida de presión permitida, el diámetro del tubo, las válvulas y las propiedades del fluido. Parta del caudal necesario y compruebe, mediante la curva o una estimación Kv/Cv, si la pérdida del acoplamiento cabe en el presupuesto de presión del circuito. Esta guía utiliza las series FOREACH Q20, Q40 y Q60 para explicar la lectura de curvas, el cálculo y la selección en aspiración y en circuitos con varios ramales."
    },
    {
      "type": "paragraph",
      "text": "Para líquidos de viscosidad próxima a la del agua y flujo turbulento, estime la pérdida con ΔP ≈ SG × (Q ÷ Kv)², o el caudal con Q ≈ Kv × √(ΔP ÷ SG). Q se expresa en m³/h, ΔP en bar y SG es la densidad relativa. A continuación se presentan lecturas aproximadas, valores Kv/Cv estimados y ejemplos, junto con el efecto de las válvulas, la viscosidad y la ubicación del acoplamiento."
    }
  ],
  "sections": [
    {
      "title": "¿Qué determina el caudal de un acoplamiento rápido?",
      "blocks": [
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/quick-disconnect-couplings-photo.webp",
          "alt": "Tres conjuntos de acoplamientos rápidos con cuerpos y terminaciones rectas, acodadas y roscadas",
          "caption": "Acoplamientos rápidos con distintas geometrías y conexiones terminales.",
          "width": 2000,
          "height": 2000
        },
        {
          "type": "paragraph",
          "text": "La bomba o la fuente de presión genera el caudal; el acoplamiento introduce una pérdida de presión. En régimen turbulento, esta pérdida aumenta aproximadamente con el cuadrado del caudal. En la curva Q40 de 3/8″, es de unos 0.23 bar a 10 L/min y 0.95 bar a 20 L/min: duplicar el caudal multiplica la pérdida casi por cuatro."
        },
        {
          "type": "paragraph",
          "text": "Para un mismo caudal, los factores principales son:"
        },
        {
          "type": "list",
          "items": [
            "Diámetro del tubo: dentro de una misma serie, pasar de 1/8″ a 1/4″ puede reducir la pérdida de presión en más de un orden de magnitud.",
            "Configuración de válvulas: un paso recto sin válvula ofrece menor resistencia; los obturadores y resortes ocupan parte del paso de fluido.",
            "Terminación: las espigas rectas, los codos y las conexiones roscadas tienen pasos internos diferentes.",
            "Fluido: una mayor densidad relativa o viscosidad aumenta la pérdida de presión al mismo caudal."
          ]
        },
        {
          "type": "paragraph",
          "text": "El diámetro interior indicado corresponde al tubo compatible, no al paso mínimo dentro del acoplamiento. Consulte la explicación de dimensiones en ¿Qué es un acoplamiento rápido?"
        }
      ]
    },
    {
      "title": "¿Cómo se interpreta una curva de caudal y pérdida de presión?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "El eje horizontal indica el caudal: L/min para líquidos y Nm³/min para gases. El vertical indica la pérdida de presión en bar. Cada curva corresponde a un diámetro de conexión. Hay dos formas de leerla:"
        },
        {
          "type": "list",
          "items": [
            "Con caudal conocido: suba desde el caudal requerido hasta la curva correspondiente y lea la pérdida de presión en el eje vertical.",
            "Con pérdida de presión permitida: avance horizontalmente hasta la curva y baje al eje de caudal."
          ]
        },
        {
          "type": "table",
          "headers": [
            "Elemento del gráfico",
            "Qué indica",
            "Qué no indica"
          ],
          "rows": [
            [
              "Pérdida de presión del eje vertical",
              "Pérdida entre la entrada y la salida del acoplamiento",
              "Presión de impulsión de la bomba o presión de trabajo admisible del acoplamiento"
            ],
            [
              "Última graduación del eje de caudal",
              "Límite del intervalo representado",
              "Caudal nominal del acoplamiento"
            ],
            [
              "Curva de gas",
              "Caudal volumétrico de gas referido a condiciones normales",
              "Una conversión directa al caudal de líquido"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Conversión de unidades: 0.69 bar equivale aproximadamente a 10 psi; 1.9 L/min, a 0.5 US gpm; y 4.83 bar, a 70 psi."
        }
      ]
    },
    {
      "title": "Tablas de caudal y pérdida de presión de Q20, Q40 y Q60",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Las tablas recogen lecturas aproximadas de las curvas de líquido para una selección inicial y para comparar diámetros dentro de una misma serie. Kv y Cv son estimaciones obtenidas de las curvas para cálculos preliminares en su intervalo de aplicación. No tienen por qué coincidir punto por punto con la lectura gráfica; la aceptación del producto debe basarse en ensayos del conjunto conectado."
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q20-series-white.webp",
          "alt": "Acoplamiento rápido Q20 conectado y separado",
          "caption": "Serie Q20",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q40-series-white.webp",
          "alt": "Acoplamiento rápido Q40 conectado y separado",
          "caption": "Serie Q40",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q60-series-white.webp",
          "alt": "Acoplamiento rápido Q60 conectado y separado",
          "caption": "Serie Q60",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "subheading",
          "title": "Serie Q20: diámetro interior del tubo de 1.6–6.4 mm"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/localized/q20-flow-pressure-drop.es.svg",
          "alt": "Curvas de caudal y pérdida de presión de Q20 para gas y líquido",
          "caption": "Figura 1 | Curvas Q20. Arriba: caudal de gas en Nm³/min. Abajo: caudal de líquido en L/min. Ambos ejes verticales indican la pérdida de presión en bar.",
          "width": 1000,
          "height": 1260
        },
        {
          "type": "paragraph",
          "text": "Q20: caudal de líquido y pérdida de presión (bar)"
        },
        {
          "type": "table",
          "headers": [
            "Caudal (L/min)",
            "1/16″ (1.6 mm)",
            "1/8″ (3.2 mm)",
            "1/4″ (6.4 mm)"
          ],
          "rows": getFlowTableRows("q20", flowTableLabels)
        },
        {
          "type": "paragraph",
          "text": "«Fuera del gráfico» significa que, a ese caudal, la pérdida supera el límite representado de 4.83 bar."
        },
        {
          "type": "paragraph",
          "text": "La conexión Q20 de 1/16″ está indicada para caudales muy bajos: alcanza aproximadamente 1 bar de pérdida a 0.1 L/min y supera 4 bar a 0.5 L/min. Para alimentación desde depósitos o lavado por encima de 1 L/min, evalúe primero conexiones de 1/8″ o 1/4″."
        },
        {
          "type": "subheading",
          "title": "Serie Q40: diámetro interior del tubo de 6.4–9.5 mm"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/localized/q40-flow-pressure-drop.es.svg",
          "alt": "Curvas de caudal y pérdida de presión de Q40 para gas y líquido",
          "caption": "Figura 2 | Curvas Q40. Arriba: caudal de gas en Nm³/min. Abajo: caudal de líquido en L/min. Ambos ejes verticales indican la pérdida de presión en bar.",
          "width": 1000,
          "height": 1428
        },
        {
          "type": "paragraph",
          "text": "Q40: caudal de líquido y pérdida de presión (bar)"
        },
        {
          "type": "table",
          "headers": [
            "Caudal (L/min)",
            "1/4″ (6.4 mm)",
            "3/8″ (9.5 mm)"
          ],
          "rows": getFlowTableRows("q40", flowTableLabels)
        },
        {
          "type": "subheading",
          "title": "Serie Q60: diámetro interior del tubo de 9.5–19.0 mm"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/localized/q60-flow-pressure-drop.es.svg",
          "alt": "Curvas de caudal y pérdida de presión de Q60 para gas y líquido",
          "caption": "Figura 3 | Curvas Q60. Arriba: caudal de gas en Nm³/min. Abajo: caudal de líquido en L/min. Ambos ejes verticales indican la pérdida de presión en bar.",
          "width": 1000,
          "height": 1355
        },
        {
          "type": "paragraph",
          "text": "Q60: caudal de líquido y pérdida de presión (bar)"
        },
        {
          "type": "table",
          "headers": [
            "Caudal (L/min)",
            "3/8″ (9.5 mm)",
            "1/2″ (12.7 mm)"
          ],
          "rows": getFlowTableRows("q60", flowTableLabels)
        },
        {
          "type": "paragraph",
          "text": "* Esta pérdida supera la presión de trabajo de Q60-PP, de 4.2 bar. El punto solo muestra la tendencia de la curva."
        },
        {
          "type": "paragraph",
          "text": "Estas curvas Q60 corresponden a conexiones de 3/8″ y 1/2″; no deben extrapolarse a 3/4″ (19.0 mm) en proporción al diámetro. Q60-PP admite una presión de trabajo de 4.2 bar. Con salida a presión atmosférica o manométrica positiva, los puntos cuya pérdida supera ese valor no son condiciones de funcionamiento utilizables."
        }
      ]
    },
    {
      "title": "Cómo calcular caudal y pérdida de presión con Kv o Cv",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Utilice los coeficientes dentro del intervalo de las curvas y de las condiciones de flujo aplicables. Kv es el caudal de agua en m³/h con una pérdida de 1 bar; Cv es el caudal de agua en US gpm con una pérdida de 1 psi. La conversión es Cv ≈ 1.156 × Kv. No extrapole fuera del gráfico."
        },
        {
          "type": "formula",
          "expression": "Pérdida a partir del caudal: ΔP = SG × (Q ÷ Kv)²"
        },
        {
          "type": "formula",
          "expression": "Caudal a partir de la pérdida permitida: Q = Kv × √(ΔP ÷ SG)"
        },
        {
          "type": "paragraph",
          "text": "Q se expresa en m³/h (1 m³/h ≈ 16.7 L/min), ΔP en bar y SG es la densidad relativa del líquido, igual a 1 para el agua."
        },
        {
          "type": "paragraph",
          "text": "Ejemplo 1 — Un circuito de lavado necesita 12 L/min con una conexión Q40 de 3/8″ (Kv ≈ 1.22) y densidad relativa 1.0. Como 12 L/min = 0.72 m³/h, ΔP = 1.0 × (0.72 ÷ 1.22)² ≈ 0.35 bar, próximo a los 0.33 bar de la tabla."
        },
        {
          "type": "paragraph",
          "text": "Ejemplo 2 — Un ramal reserva 0.5 bar para una conexión Q20 de 1/4″ (Kv ≈ 0.43). Q = 0.43 × √0.5 ≈ 0.30 m³/h, aproximadamente 5 L/min."
        },
        {
          "type": "paragraph",
          "text": "Ejemplo 3 — Dos pares de acoplamientos iguales en serie producen el doble de pérdida que un solo par al mismo caudal. Su Kv equivalente es el Kv de un par dividido por √2. Para componentes distintos en serie: 1/Kv_total² = 1/Kv₁² + 1/Kv₂² + … ."
        },
        {
          "type": "paragraph",
          "text": "Introduzca Cv en una fila Cv de la calculadora de resistencia hidráulica de FOREACH para calcular la pérdida del circuito junto con tubos y válvulas. La guía de la calculadora, enlazada al final, explica el procedimiento."
        },
        {
          "type": "paragraph",
          "text": "Estas ecuaciones se aplican a líquidos de viscosidad próxima a la del agua en régimen turbulento. Con caudal muy bajo o mayor viscosidad, el flujo puede acercarse al régimen laminar y la pérdida pasa a depender de forma más lineal del caudal. La estimación cuadrática pierde precisión: ensaye con el fluido real. Los Kv/Cv de este artículo son estimaciones para selección preliminar."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/es/resources/calculators/fluid-resistance/",
              "label": "Abrir la calculadora de resistencia hidráulica"
            }
          ]
        }
      ]
    },
    {
      "title": "¿Cómo afectan las válvulas de cierre a la pérdida de presión?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Una mitad con válvula cierra automáticamente su paso al desconectarse. Al conectar, el obturador y el resorte siguen ocupando parte del paso y aumentan la pérdida frente a una conexión recta equivalente sin válvula. Con válvulas en ambas mitades hay dos obturadores en el recorrido, normalmente con mayor restricción."
        },
        {
          "type": "paragraph",
          "text": "Cuando el margen de caudal es reducido:"
        },
        {
          "type": "list",
          "items": [
            "Coloque una válvula solo en el lado que deba cerrarse al desconectar; utilice una mitad sin válvula en el otro lado si la aplicación lo permite.",
            "Si ambos lados necesitan cierre, evalúe una conexión de mayor diámetro antes de eliminar válvulas necesarias.",
            "Un acoplamiento incompleto puede impedir que las válvulas se abran por completo y reducir mucho el caudal. Compruebe primero el enclavamiento de ambas mitades."
          ],
          "ordered": true
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "Para el líquido retenido y el derrame al desconectar, consulte ",
              "label": "¿Qué es un acoplamiento rápido?",
              "href": "/es/resources/technical-articles/what-is-a-quick-disconnect-fitting/",
              "suffix": "."
            }
          ]
        }
      ]
    },
    {
      "title": "¿Cómo se relacionan los códigos de modelo con las curvas?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "En los modelos con espiga, los dos dígitos que siguen a la serie identifican el diámetro interior del tubo compatible. Esta tabla relaciona los modelos con las leyendas de las curvas:"
        },
        {
          "type": "table",
          "headers": [
            "Código de tamaño",
            "Diámetro interior del tubo",
            "Leyenda de la curva",
            "Serie"
          ],
          "rows": [
            [
              "01",
              "1.6 mm",
              "1/16″",
              "Q20"
            ],
            [
              "02",
              "3.2 mm",
              "1/8″",
              "Q20"
            ],
            [
              "03",
              "4.8 mm",
              "3/16″ (sin curva en esta sección)",
              "Q20"
            ],
            [
              "04",
              "6.4 mm",
              "1/4″",
              "Q20、Q40"
            ],
            [
              "06",
              "9.5 mm",
              "3/8″",
              "Q40、Q60"
            ],
            [
              "08",
              "12.7 mm",
              "1/2″",
              "Q60"
            ],
            [
              "12",
              "19.0 mm",
              "3/4″ (sin curva en esta sección)",
              "Q60"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "En Q2004-PNV-SPPE, Q20 es la serie; 04 indica tubo de 6.4 mm (1/4″); P identifica la mitad macho; N, montaje fuera de panel; V, válvula; y S, PP y E indican terminación recta, cuerpo de PP y junta EPDM. Las terminaciones roscadas siguen otra codificación —por ejemplo, Q4005 corresponde a una conexión roscada—, por lo que debe comprobarse el modelo completo."
        }
      ]
    },
    {
      "title": "¿Por qué limitar más la pérdida de presión en la aspiración de la bomba?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Con un depósito abierto, una atmósfera (aproximadamente 1 bar), más la carga estática si el líquido está por encima de la entrada, es un límite teórico, no una reserva de presión utilizable. La presión de entrada que necesita la bomba y las pérdidas en tubos y filtros reducen el margen, dejando a menudo unas décimas de bar para el acoplamiento. Una pérdida excesiva reduce el caudal entregado y favorece la liberación de gases disueltos."
        },
        {
          "type": "paragraph",
          "text": "Seleccione una pérdida menor para aspiración. A 2 L/min, Q20 de 1/8″ consume aproximadamente 1.0 bar, cerca del límite atmosférico teórico; la conexión de 1/4″ consume unos 0.07 bar."
        },
        {
          "type": "paragraph",
          "text": "Compruebe también la estanqueidad bajo vacío. El aire introducido al reconectar y su tiempo de purga afectan a la primera dosis. En lavado intermitente, dimensione para el caudal instantáneo durante la operación, no para el consumo medio por minuto."
        }
      ]
    },
    {
      "title": "¿Qué caudal debe admitir un acoplamiento que alimenta varios ramales?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "El acoplamiento de entrada común conduce la suma de los caudales de los ramales que funcionan simultáneamente:"
        },
        {
          "type": "formula",
          "expression": "Q_entrada = Q_ramal1 + Q_ramal2 + … (solo ramales activos simultáneamente)"
        },
        {
          "type": "paragraph",
          "text": "Tres ramales de lavado de 0.5 L/min cada uno requieren 1.5 L/min si funcionan a la vez. Con Kv, la pérdida estimada en Q20 de 1/8″ es 0.56 bar; en 1/4″, 0.04 bar. En aspiración, evalúe primero 1/4″ y verifique el margen de presión de entrada con el conjunto completo."
        },
        {
          "type": "paragraph",
          "text": "Si los ramales funcionan por turnos, dimensione para la demanda máxima de una operación. Un caudal total suficiente no garantiza un reparto uniforme: longitud de tubos, válvulas y orificios de agujas generan resistencias diferentes. Mida la entrega en cada salida."
        }
      ]
    },
    {
      "title": "¿Sirven las curvas de gas para líquidos? ¿Cómo influye la viscosidad?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "No. Las curvas de gas expresan caudal volumétrico a condiciones normales. El gas es compresible y su caudal también depende de la presión de entrada. Las relaciones de flujo son diferentes; una conversión de unidades no permite intercambiar ambas curvas."
        },
        {
          "type": "paragraph",
          "text": "La densidad relativa ya está incluida en las fórmulas anteriores. La viscosidad requiere una evaluación aparte: formulaciones con glicerol, proteínas o sales concentradas pueden ser más viscosas que el agua, especialmente a baja temperatura. Su pérdida puede superar la tabla. Ensaye la conexión completa con el líquido real a la temperatura de trabajo."
        }
      ]
    },
    {
      "title": "¿Cómo verificar caudal y pérdida de presión después del montaje?",
      "blocks": [
        {
          "type": "table",
          "headers": [
            "Comprobación",
            "Datos que registrar",
            "Objetivo"
          ],
          "rows": [
            [
              "Configuración completa",
              "Modelos de ambas mitades, válvulas, diámetro interior y longitud del tubo",
              "Comparar conjuntos equivalentes"
            ],
            [
              "Pérdida del acoplamiento",
              "Presiones antes y después del acoplamiento al caudal objetivo; comparar además el caudal de salida antes y después del montaje como comprobación funcional",
              "Verificar el presupuesto de presión"
            ],
            [
              "Un ramal en servicio",
              "Caudal de salida, demora de arranque y repetibilidad entre ciclos",
              "Comprobar la demanda del proceso"
            ],
            [
              "Varios ramales simultáneos",
              "Caudal total, reparto entre ramales y pérdida en la entrada común",
              "Comprobar el reparto de caudal"
            ],
            [
              "Aspiración",
              "Presión de entrada, burbujas y suministro con nivel bajo",
              "Evaluar entrada de aire bajo vacío y margen de suministro"
            ],
            [
              "Filtro tras un periodo de uso",
              "Variación del caudal de salida",
              "Evaluar el margen a largo plazo"
            ],
            [
              "Reinicio tras desconectar",
              "Estanqueidad, aire introducido y tiempo de recuperación tras la purga",
              "Evaluar el efecto del mantenimiento en los ciclos siguientes"
            ]
          ]
        }
      ]
    },
    {
      "title": "Lecturas relacionadas sobre acoplamientos rápidos",
      "blocks": [
        {
          "type": "links",
          "items": [
            {
              "href": "/es/resources/technical-articles/what-is-a-quick-disconnect-fitting/",
              "label": "¿Qué es un acoplamiento rápido? Conexión macho/hembra, válvulas y selección"
            },
            {
              "href": "/es/resources/technical-articles/fitting-material-selection-guide/",
              "label": "Selección de materiales: PP, PA, POM, PVDF y PEEK"
            },
            {
              "href": "/es/resources/technical-articles/fluid-resistance-calculator-liquid-path-design-guide/",
              "label": "Calculadora de resistencia hidráulica: análisis de caudal y pérdida de presión"
            }
          ],
          "ordered": true
        }
      ]
    }
  ],
  "faqTitle": "Preguntas frecuentes sobre caudal y pérdida de presión",
  "faqItems": [
    {
      "question": "¿Cómo calcular el caudal de un acoplamiento rápido?",
      "answer": "Defina la pérdida permitida y aplique Q = Kv × √(ΔP ÷ SG), con Q en m³/h y ΔP en bar. También puede leer el caudal donde esa pérdida corta la curva correspondiente. Respete las condiciones de aplicación para líquidos indicadas arriba."
    },
    {
      "question": "¿Qué pérdida de presión es aceptable?",
      "answer": "No existe un valor universal: depende del presupuesto de presión del circuito. En impulsión se reparte la presión disponible de la bomba al caudal objetivo. En aspiración el margen útil es muy limitado; una atmósfera más la carga estática es solo un techo teórico con depósito abierto. Conviene minimizar la pérdida del acoplamiento."
    },
    {
      "question": "¿Una conexión mayor siempre aumenta el caudal?",
      "answer": "Dentro de la misma serie y configuración de válvulas, una conexión mayor reduce la pérdida. A 2 L/min, Q20 de 1/8″ pierde unos 1.0 bar y Q20 de 1/4″, 0.07 bar. El caudal total sigue limitado por tubos, válvulas y orificios; valore la mejora en el circuito completo."
    },
    {
      "question": "¿Cómo elegir un acoplamiento rápido para gran caudal?",
      "answer": "Defina caudal, pérdida permitida y presión máxima. Elija ambas mitades, diámetro y válvulas; consulte la curva de líquido y compruebe presión de trabajo y temperatura. Para una entrada común, sume las demandas simultáneas y mida tras el montaje la pérdida del acoplamiento y el caudal en cada salida."
    },
    {
      "question": "¿Puede usarse la curva de gas para elegir un acoplamiento para líquido de lavado?",
      "answer": "No. Utilice la curva de líquido o una estimación con Kv, seguida de ensayo. Las relaciones de flujo de gases y líquidos son diferentes."
    }
  ],
  "cta": {
    "title": "Defina el acoplamiento adecuado para su circuito",
    "description": "Indique caudal objetivo, fluido, temperatura, ubicación —aspiración o impulsión— y pérdida permitida. El equipo de FOREACH puede ayudarle a revisar las mitades, conexiones de tubo y válvulas de Q20, Q40 y Q60.",
    "contactLabel": "Consultar la selección",
    "productsLabel": "Ver modelos de acoplamientos rápidos",
    "productsHref": "/es/products/fittings/quick-connect-fittings/"
  }
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
