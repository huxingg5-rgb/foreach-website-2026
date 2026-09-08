import type { DiaphragmPumpEngineeringArticleCopy, DiaphragmPumpEngineeringArticleSlug } from "./diaphragm-pump-engineering-article.types";

export const remainingPumpArticlesEs = {
  "ink-circulation-supply-return-pump-diaphragm-pump": {
    "metadata": {
      "title": "¿Qué diferencia hay entre una bomba de circulación, una bomba de suministro y una bomba de retorno de tinta?",
      "seoTitle": "Bombas de circulación, suministro y retorno de tinta | FOREACH",
      "seoDescription": "Conozca las funciones de suministro, retorno y circulación de tinta, las arquitecturas de inyección, la presión del cabezal, el caudal instalado y la validación de bombas de diafragma.",
      "coverImage": "/images/resources/technical-articles/ink-circulation-supply-return-pump/ink-supply-return-circulation-cover.webp",
      "coverAlt": "Bomba de diafragma miniatura para líquidos FOREACH serie DPL mostrada en un vídeo del producto"
    },
    "deck": "Suministro, retorno y circulación de tinta describen funciones del circuito, no tres tipos mecánicos fijos de bomba. La bomba de suministro lleva tinta al depósito auxiliar o al cabezal; la de retorno devuelve la tinta no utilizada al depósito; y la de circulación mantiene el flujo en un circuito. Que estas funciones requieran una, dos o varias bombas depende del cabezal, los depósitos, el control por gravedad o vacío, los filtros y la arquitectura de suministro y retorno.",
    "leadBlocks": [
      {
        "type": "notice",
        "label": "Respuesta breve:",
        "text": "No determine el número de bombas por sus nombres funcionales. Dibuje el recorrido real Depósito → Suministro → Depósito auxiliar / Amortiguador → Cabezal → Retorno y defina el caudal, la presión, la presencia de aire y la compatibilidad de materiales en cada tramo."
      },
      {
        "type": "links",
        "items": [
          {
            "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
            "label": "categoría de bombas de diafragma miniatura para líquidos",
            "prefix": "Consulte la ",
            "suffix": " para identificar modelos que evaluar."
          }
        ]
      }
    ],
    "sections": [
      {
        "title": "1. ¿Qué significan los tres nombres?",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Nombre funcional",
              "Tarea habitual",
              "Lo que no debe darse por supuesto"
            ],
            "rows": [
              [
                "Bomba de suministro de tinta",
                "Transporta tinta del depósito principal al auxiliar, a una etapa de control de presión o al cabezal",
                "No siempre presuriza directamente el cabezal"
              ],
              [
                "Bomba de retorno de tinta",
                "Devuelve la tinta no expulsada desde el circuito posterior al depósito auxiliar o principal",
                "No todos los sistemas requieren una bomba de retorno independiente"
              ],
              [
                "Bomba de circulación de tinta",
                "Mantiene un flujo continuo o intermitente por el depósito, el filtro, los tubos y/o el cabezal",
                "No corresponde a una única tecnología de bomba ni a una ubicación fija"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Una bomba puede realizar el suministro y la circulación. Dos bombas pueden controlar por separado el suministro y el retorno. Otros sistemas establecen el punto de funcionamiento mediante el nivel del depósito auxiliar, la gravedad, el vacío neumático, las válvulas y los amortiguadores. Los nombres describen tareas del sistema; no definen su arquitectura mecánica."
          }
        ]
      },
      {
        "title": "2. ¿El suministro y el retorno necesitan siempre bombas separadas?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "No. Una arquitectura con dos bombas puede establecer la presión diferencial de circulación ajustando las velocidades relativas de suministro y retorno. Una arquitectura tradicional puede utilizar depósitos de cabecera de suministro y retorno, mientras el nivel y el vacío neumático mantienen el menisco del cabezal. Algunos cabezales sin circulación interna necesitan reposición y mantenimiento, pero la tinta no los atraviesa continuamente."
          },
          {
            "type": "notice",
            "label": "Límite de la arquitectura:",
            "text": "El esquema explica funciones. No es una disposición universal para todas las impresoras DOD, CIJ, de barrido o de una sola pasada."
          }
        ]
      },
      {
        "title": "3. ¿Por qué algunos sistemas de inyección hacen circular la tinta?",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Mantener en movimiento los pigmentos propensos a sedimentar en las zonas de flujo efectivo y reducir los gradientes locales de concentración.",
              "En cabezales con circulación interna, acercar el flujo a las boquillas para reducir los riesgos de secado, precipitación o estancamiento.",
              "Combinar la circulación con desgasificación, filtración y control de temperatura para estabilizar el estado de la tinta en el cabezal.",
              "Facilitar la eliminación de aire del circuito durante el cebado, la reposición o el mantenimiento."
            ]
          },
          {
            "type": "paragraph",
            "text": "No todos los sistemas de inyección requieren circulación continua. Las tintas de colorantes, los cabezales sin circulación interna, los recorridos cortos o los sistemas con cartucho o depósito auxiliar pueden utilizar circulación intermitente, solo para tinta blanca u otra arquitectura de mantenimiento. Respete los requisitos de la tinta y del cabezal."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/white-ink-circulation-pump-selection-sedimentation/",
                "label": "guía de circulación de tinta blanca, sedimentación de pigmentos y zonas muertas",
                "prefix": "Para la tinta blanca, consulte la ",
                "suffix": "."
              }
            ]
          }
        ]
      },
      {
        "title": "4. ¿Por qué se utilizan bombas de diafragma miniatura en los circuitos de tinta?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "En circuitos OEM con poco espacio, una bomba de diafragma miniatura para líquidos puede ofrecer transferencia compacta y autocebante, con un caudal ajustable mediante el motor o el control del sistema. Puede evaluarse para reposición desde el depósito principal, suministro a baja presión, retorno o circulación externa."
          },
          {
            "type": "notice",
            "label": "Prestaciones específicas del modelo:",
            "text": "La baja pulsación, la capacidad de funcionamiento en seco, la resistencia a la abrasión y a los disolventes, y la aptitud para circular tinta blanca a largo plazo deben demostrarse para el modelo y las condiciones concretas. Los datos públicos actuales de FOREACH no prueban por sí solos que DPL30 o DPL60 sea adecuado para una tinta determinada."
          }
        ]
      },
      {
        "title": "5. ¿Por qué no basta con el caudal libre de la bomba?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "El caudal libre corresponde a una condición de ensayo con baja resistencia, no al punto de funcionamiento instalado. La viscosidad de la tinta, la pérdida de presión del filtro, los desgasificadores, el diámetro interior y la longitud de los tubos, los racores, las válvulas, los pasos del cabezal y el desnivel componen la resistencia del sistema. El caudal instalado se determina por la intersección de las curvas de la bomba y del sistema."
          },
          {
            "type": "formula",
            "expression": "Punto de funcionamiento instalado = Curva de la bomba ∩ Curva del sistema",
            "note": "Mídalo con la tinta prevista y el circuito completo."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "guía de curvas de caudal y presión de bombas de diafragma"
              },
              {
                "href": "/resources/technical-articles/300-vs-600-ml-min-ink-circulation-return-pump-selection/",
                "label": "guía de selección de bombas de tinta de 300 frente a 600 mL/min"
              }
            ]
          }
        ]
      },
      {
        "title": "6. ¿Por qué una presión de bomba mayor no es mejor cerca del cabezal?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Los cabezales DOD normalmente requieren un menisco controlado. Una presión positiva excesiva puede causar rezume o goteo; un vacío excesivo puede retraer el menisco, limitar la reposición o introducir aire. La presión diferencial de circulación y la presión del menisco de la boquilla son variables relacionadas, pero distintas."
          },
          {
            "type": "notice",
            "label": "Límite de aplicación de DPL30H:",
            "text": "Una capacidad de alta presión de 600 kPa no hace que una bomba sea más adecuada para alimentar directamente un cabezal. Evalúe una bomba de alta presión únicamente en una etapa de transferencia con alta resistencia, aislada de la zona sensible a la presión del cabezal, con regulación, alivio de presión y ensayos de fallo."
          }
        ]
      },
      {
        "title": "7. ¿Cómo preseleccionar DPL30 y DPL60?",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Serie FOREACH",
              "Límites de producto verificados",
              "Evaluación para inyección de tinta"
            ],
            "rows": [
              [
                "DPL30",
                "Caudal sin carga de la clase 300 mL/min; presión nominal de 100 kPa; diámetro interior del tubo de 3.2 mm",
                "Candidato para suministro, retorno o circulación externa de menor caudal; consulte la curva y valide las prestaciones instaladas"
              ],
              [
                "DPL60",
                "Caudal sin carga de la clase 600 mL/min; presión nominal de 100 kPa; diámetro interior del tubo de 3.2 mm",
                "Candidato para un caudal objetivo mayor o más margen frente a la resistencia; compruebe los efectos del filtro y la viscosidad"
              ]
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/",
                "label": "Página del producto DPL30"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/",
                "label": "Página del producto DPL60"
              }
            ]
          }
        ]
      },
      {
        "title": "8. La compatibilidad con cada tinta requiere una validación independiente",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Las tintas acuosas, de disolvente, curables por UV y pigmentadas difieren en disolventes, monómeros, dispersantes, partículas, viscosidad y temperatura. El nombre del material no sustituye los ensayos de concentración, temperatura, tiempo de inmersión, circulación dinámica, arranque y parada, y precipitación."
          },
          {
            "type": "notice",
            "label": "Respuesta directa:",
            "text": "DPL30 o DPL60 no es automáticamente compatible con tinta blanca, UV o de disolvente porque su clase de caudal parezca adecuada. Hay que validar la compatibilidad con la tinta concreta."
          }
        ]
      },
      {
        "title": "9. Lista de comprobación para seleccionar la bomba del sistema de tinta",
        "blocks": [
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Confirme si el sistema es DOD o CIJ, si el cabezal admite circulación interna y cuáles son sus límites de presión de suministro, retorno y menisco.",
              "Represente el depósito principal, el auxiliar, el amortiguador, el desgasificador, el filtro, las válvulas y las líneas de suministro y retorno.",
              "Defina el caudal de trabajo para impresión, espera, cebado, limpieza, eliminación de aire y rearranque tras una parada.",
              "Estime la resistencia con la viscosidad y temperatura reales de la tinta y consulte la curva oficial de la bomba.",
              "Valide la pulsación, las burbujas, la carga del filtro, las zonas muertas, los cambios de nivel y los fallos de los sensores de presión.",
              "Complete los ensayos de inmersión de los materiales mojados y de circulación dinámica prolongada antes de confirmar la vida útil y los intervalos de mantenimiento."
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/",
                "label": "guía de control de bombas de diafragma sin escobillas de 2 y 5 hilos",
                "prefix": "Para integrar el control, consulte la ",
                "suffix": "."
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Preguntas frecuentes sobre circulación, suministro y retorno de tinta",
    "faqItems": [
      {
        "question": "¿Qué es una bomba de circulación de tinta?",
        "answer": "Es un nombre funcional para la bomba que mantiene el flujo de tinta por un depósito, tubos, filtro y/o cabezal con circulación interna. No define un único tipo mecánico ni una ubicación fija."
      },
      {
        "question": "¿Qué es una bomba de retorno de tinta?",
        "answer": "Devuelve la tinta no expulsada desde el tramo posterior al depósito auxiliar o principal. Solo se utiliza una bomba de retorno independiente cuando la arquitectura la necesita."
      },
      {
        "question": "¿La bomba de suministro y la de circulación son la misma?",
        "answer": "Pueden serlo. Una sola bomba de suministro puede crear la circulación; un sistema de dos bombas puede controlar suministro y retorno por separado. Decídalo a partir del circuito real."
      },
      {
        "question": "¿Todos los sistemas de inyección necesitan circulación continua?",
        "answer": "No. Depende de la formulación de la tinta, la capacidad de circulación interna del cabezal, la estrategia de espera y el mantenimiento. Algunos sistemas solo hacen circular tinta blanca o lo hacen a intervalos."
      },
      {
        "question": "¿Por qué no aumentar simplemente la presión antes del cabezal?",
        "answer": "Las boquillas necesitan un menisco estable. Una presión de suministro excesiva puede causar rezume; un vacío excesivo puede limitar la reposición o introducir aire."
      },
      {
        "question": "¿Los valores nominales de DPL30 y DPL60 equivalen al caudal de circulación instalado?",
        "answer": "No. Los valores de 300 y 600 mL/min son clases de caudal sin carga. El caudal instalado depende de la curva de la bomba, la viscosidad, el filtro, los tubos y la diferencia de presión entre suministro y retorno."
      },
      {
        "question": "¿DPL30 es automáticamente compatible con tinta blanca?",
        "answer": "No. Primero solo puede preseleccionarse por caudal y presión. Deben validarse la compatibilidad química, las partículas, la sedimentación, la circulación prolongada y el rearranque después de una parada."
      },
      {
        "question": "¿DPL30H alimenta mejor un cabezal por tener más presión?",
        "answer": "No puede suponerse. DPL30H está orientada a circuitos de alta resistencia; una presión alta no es intrínsecamente adecuada para la zona de un cabezal sensible a la presión."
      }
    ],
    "cta": {
      "title": "Seleccione la bomba a partir del circuito real de suministro y retorno",
      "description": "Indique el tipo de tinta, viscosidad y temperatura, caudal de trabajo objetivo, ventana de presión del cabezal, filtro, tubos, ubicación de la bomba y estrategia de cebado y parada.",
      "contactLabel": "Enviar condiciones del circuito de tinta",
      "productsLabel": "Ver bombas de diafragma para líquidos",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "300-vs-600-ml-min-ink-circulation-return-pump-selection": {
    "metadata": {
      "title": "¿300 o 600 mL/min? Cómo seleccionar una bomba de circulación o retorno de tinta",
      "seoTitle": "Selección de bombas de tinta de 300 o 600 mL/min | FOREACH",
      "seoDescription": "Evalúe bombas de circulación o retorno de tinta de 300 o 600 mL/min según el caudal de trabajo, la curva, la viscosidad, el filtro, los tubos y la presión de suministro y retorno.",
      "coverImage": "/images/resources/technical-articles/ink-circulation-flow-selection/ink-pump-300-vs-600-flow-selection-cover.webp",
      "coverAlt": "Bombas de diafragma miniatura para líquidos FOREACH DPL30 y DPL60 mostradas en un vídeo del producto"
    },
    "deck": "Defina el caudal de trabajo objetivo del circuito de circulación o retorno y calcule o mida la presión diferencial del sistema a ese caudal. Los valores de 300 mL/min de DPL30 y 600 mL/min de DPL60 son clases de caudal sin carga, no caudales garantizados después de añadir tinta, filtros, tubos y un cabezal. Cuanto más se acerque el objetivo al límite nominal, más importantes serán la curva y las pruebas con el circuito instalado.",
    "leadBlocks": [
      {
        "type": "notice",
        "label": "Preselección rápida:",
        "text": "Por debajo de 300 mL/min, evalúe primero DPL30. A partir de 300 mL/min, normalmente evalúe primero DPL60. Cada intervalo identifica candidatos, no prestaciones garantizadas."
      },
      {
        "type": "links",
        "items": [
          {
            "href": "/resources/technical-articles/ink-circulation-supply-return-pump-diaphragm-pump/",
            "label": "guía de funciones de suministro, retorno y circulación de tinta",
            "prefix": "Si aún no ha definido la tarea de la bomba, empiece por la ",
            "suffix": "."
          }
        ]
      }
    ],
    "sections": [
      {
        "title": "1. ¿300 o 600 mL/min? Empiece con esta tabla de candidatos",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Caudal de trabajo objetivo",
              "Candidato inicial",
              "Qué verificar"
            ],
            "rows": [
              [
                "0–100 mL/min",
                "DPL30 como candidato",
                "Estabilidad a baja velocidad, pulsación, control y aumento de temperatura"
              ],
              [
                ">100–200 mL/min",
                "DPL30 como candidato",
                "Punto de la curva a la presión diferencial objetivo"
              ],
              [
                ">200–<300 mL/min",
                "DPL30 como candidato",
                "Margen cerca del límite superior; evaluar DPL60 en paralelo si es necesario"
              ],
              [
                "300–400 mL/min",
                "DPL60 como candidato",
                "Filtro, viscosidad y presión diferencial entre suministro y retorno"
              ],
              [
                ">400–500 mL/min",
                "DPL60 como candidato",
                "Margen de la curva y estado del filtro cargado"
              ],
              [
                ">500–600 mL/min",
                "DPL60 como candidato",
                "Muy cerca del límite de caudal libre; ensayar y considerar una bomba mayor"
              ]
            ]
          },
          {
            "type": "notice",
            "label": "Límite de 300:",
            "text": "Si el objetivo es exactamente 300 mL/min, no suponga que DPL30, de clase 300 mL/min, lo entregará. Con una presión diferencial real, preseleccione primero DPL60."
          }
        ]
      },
      {
        "title": "2. El caudal de trabajo objetivo no es el caudal libre",
        "blocks": [
          {
            "type": "paragraph",
            "text": "El caudal de trabajo objetivo es el necesario para imprimir, mantener la espera o circular tinta a una presión diferencial real. El caudal libre se mide cerca de una condición de baja resistencia y bajo condiciones de ensayo definidas. La tinta, los filtros, los tubos, las válvulas, los racores, los desgasificadores y los pasos de la cabeza explican la diferencia."
          },
          {
            "type": "formula",
            "expression": "Caudal de trabajo objetivo ≠ Caudal libre de la bomba",
            "note": "Solo la intersección entre las curvas de la bomba y del sistema representa un punto de funcionamiento instalado que se puede verificar."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "guía de curvas de caudal y presión"
              },
              {
                "href": "/resources/technical-articles/300-vs-600-ml-min-diaphragm-pump-selection/",
                "label": "criterios generales de selección entre 300 y 600 mL/min"
              }
            ]
          }
        ]
      },
      {
        "title": "3. ¿Cómo afectan la viscosidad, el diámetro interior y la longitud del tubo?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Para un flujo laminar estacionario ideal de un líquido newtoniano en un tubo recto de sección circular, la relación de Hagen–Poiseuille explica la tendencia: mayor viscosidad, longitud y caudal objetivo requieren más presión diferencial; el diámetro interior tiene una influencia especialmente fuerte."
          },
          {
            "type": "formula",
            "expression": "ΔP ∝ μLQ / D⁴",
            "note": "μ es la viscosidad dinámica, L la longitud, Q el caudal y D el diámetro interior. Use esta relación para analizar tendencias, no como modelo completo de selección de una bomba de tinta."
          },
          {
            "type": "paragraph",
            "text": "El sistema real también incluye filtros, racores, válvulas, codos, desgasificadores, ramales y conductos complejos de la cabeza. Algunas tintas dependen mucho de la temperatura o tienen comportamiento no newtoniano. Use la ecuación para un análisis inicial de sensibilidad y, para decidir, curvas de componentes y mediciones de presión en el circuito instalado."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow/",
                "label": "por qué el diámetro interior influye tanto en el caudal"
              },
              {
                "href": "/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump/",
                "label": "resistencia de aspiración frente a impulsión"
              }
            ]
          }
        ]
      },
      {
        "title": "4. No dimensione la bomba solo con un filtro limpio",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La pérdida de presión del filtro cambia con su grado de filtración, área, caudal, viscosidad, temperatura y carga de contaminantes. La tinta blanca o muy pigmentada añade problemas de dispersión y depósitos a largo plazo. Seleccionar la bomba solo con el filtro limpio puede dejarla sin margen durante el uso."
          },
          {
            "type": "list",
            "items": [
              "Registre la presión diferencial con el filtro limpio, con una carga habitual y cerca del umbral de sustitución.",
              "Mida conjuntamente la presión de entrada y salida de la bomba, el caudal, la corriente y la temperatura de la tinta.",
              "Respete los requisitos de filtración del cabezal y del proveedor de tinta; no compense una filtración incorrecta aumentando la presión."
            ]
          }
        ]
      },
      {
        "title": "5. Los caudales de suministro y retorno deben evaluarse junto con el control de presión",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Una cabeza DOD con circulación interna puede depender de la presión de suministro, la de retorno, su diferencia y la presión del menisco. Aumentar el caudal de circulación suele requerir más presión diferencial, pero un control o una amortiguación deficientes pueden alterar el menisco, causar rezume, limitar la reposición, introducir aire o transmitir pulsaciones."
          },
          {
            "type": "notice",
            "label": "Criterio de ingeniería:",
            "text": "Evalúe la bomba junto con depósitos auxiliares, amortiguadores, sensores de presión, dispositivos de alivio o derivación y la estrategia de control. Nunca suponga que la presión máxima de la bomba puede aplicarse directamente a la cabeza."
          }
        ]
      },
      {
        "title": "6. Límites verificados de DPL30 y DPL60",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Parámetro",
              "DPL30",
              "DPL60"
            ],
            "rows": [
              [
                "Clase de caudal sin carga",
                "300 mL/min",
                "600 mL/min"
              ],
              [
                "Presión nominal",
                "100 kPa",
                "100 kPa"
              ],
              [
                "Altura de autocebado",
                "6 mH₂O",
                "3 mH₂O"
              ],
              [
                "Conexión estándar",
                "Tubo de diámetro interior 3.2 mm",
                "Tubo de diámetro interior 3.2 mm"
              ],
              [
                "Conclusión para inyección de tinta",
                "Solo candidato de menor caudal",
                "Solo candidato de mayor caudal"
              ]
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/",
                "label": "Página de DPL30, clase 300 mL/min"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/",
                "label": "Página de DPL60, clase 600 mL/min"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "categoría de bombas de diafragma miniatura para líquidos"
              }
            ]
          },
          {
            "type": "notice",
            "label": "Límite de compatibilidad:",
            "text": "La tabla no demuestra compatibilidad con tinta ni caudal sin carga a 100 kPa. Debe validarse la compatibilidad con la tinta concreta."
          }
        ]
      },
      {
        "title": "7. Validación recomendada en banco y en el equipo",
        "blocks": [
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Separe los modos de impresión, espera, circulación, cebado y limpieza, cada uno con sus ventanas de caudal y presión.",
              "Mida la viscosidad u obtenga datos del proveedor a las temperaturas mínima, nominal y máxima de la tinta.",
              "Reproduzca la configuración real de tubos, filtro, válvulas, racores, desgasificador y desnivel.",
              "Comience a baja velocidad y registre caudal, presión de suministro y retorno, menisco, pulsación, corriente y aumento de temperatura.",
              "Valide filtros limpios y cargados, nivel bajo del depósito y obstrucciones parciales.",
              "Realice pruebas de circulación prolongada, sedimentación durante la parada y recuperación al reiniciar antes de fijar la bomba y su control."
            ]
          }
        ]
      },
      {
        "title": "8. ¿Cuándo buscar alternativas a DPL30 y DPL60?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Amplíe los candidatos o cambie la arquitectura cuando el objetivo se acerque o supere 600 mL/min, la presión diferencial no deje margen en la curva DPL60, la cabeza necesite menos pulsación, la tinta contenga partículas sensibles al cizallamiento o la abrasión, o el ciclo de trabajo sea especialmente exigente. No convierta DPL60 en una solución garantizada."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/white-ink-circulation-pump-selection-sedimentation/",
                "label": "validación adicional para la circulación de tinta blanca",
                "prefix": "Para tinta blanca, continúe con la ",
                "suffix": "."
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Preguntas frecuentes sobre bombas de tinta de 300 y 600 mL/min",
    "faqItems": [
      {
        "question": "¿Cómo elegir entre 300 y 600 mL/min para circular tinta?",
        "answer": "Defina primero el caudal de trabajo y la presión diferencial del sistema. Por debajo de 300 mL/min, evalúe primero DPL30; desde 300 mL/min, normalmente DPL60. Después valide la curva y el circuito instalado."
      },
      {
        "question": "¿Por qué no usar directamente el caudal libre?",
        "answer": "Los filtros, la viscosidad, los tubos, las válvulas, los racores y los conductos de la cabeza crean pérdidas de presión. El caudal instalado corresponde a la intersección de las curvas de la bomba y del sistema."
      },
      {
        "question": "¿DPL30 garantiza un objetivo de 250 mL/min?",
        "answer": "No. 250 mL/min está cerca de su clase sin carga de 300 mL/min. Compruebe la curva a la presión diferencial objetivo y considere DPL60 en paralelo."
      },
      {
        "question": "¿Se puede elegir DPL30 si el objetivo es exactamente 300 mL/min?",
        "answer": "No a partir del valor nominal por sí solo. La pérdida de presión real normalmente elimina el margen de caudal libre; preseleccione primero DPL60 y pruebe el circuito instalado."
      },
      {
        "question": "¿DPL60 garantiza circular tinta blanca a 500 mL/min?",
        "answer": "No. Solo es un candidato en ese intervalo. Deben validarse viscosidad real, filtro, presión diferencial, compatibilidad de materiales y circulación prolongada."
      },
      {
        "question": "¿Por qué el diámetro interior es más sensible que la longitud?",
        "answer": "En la tendencia ideal de flujo laminar, la pérdida de presión es proporcional a la longitud e inversamente proporcional a la cuarta potencia del diámetro interior. Los circuitos reales también requieren curvas de pérdidas locales y de componentes."
      },
      {
        "question": "¿Cuándo medir la pérdida de presión del filtro?",
        "answer": "Como mínimo, con el filtro limpio, con carga habitual y cerca de su sustitución, usando la temperatura real de la tinta y el caudal objetivo."
      },
      {
        "question": "¿Una presión mayor compensa cualquier falta de caudal?",
        "answer": "No. La cabeza tiene una ventana de presión de menisco y los componentes tienen límites nominales. Redistribuya resistencia, capacidad de bombeo y control de presión en vez de aumentarla a ciegas."
      }
    ],
    "cta": {
      "title": "Convierta 300 o 600 mL/min en un punto de funcionamiento verificado",
      "description": "Indique el caudal de trabajo objetivo, viscosidad y temperatura, pérdida de presión del filtro, tubos, presión de suministro y retorno y ciclos de operación y parada.",
      "contactLabel": "Enviar condiciones de caudal de tinta",
      "productsLabel": "Comparar DPL30 y DPL60",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "white-ink-circulation-pump-selection-sedimentation": {
    "metadata": {
      "title": "¿Por qué es más difícil recircular tinta blanca y cómo seleccionar su bomba de circulación?",
      "seoTitle": "Circulación de tinta blanca y sedimentación | FOREACH",
      "seoDescription": "Comprenda la sedimentación del TiO₂, el recorrido y caudal de circulación, las zonas muertas, los filtros, la viscosidad, la presión y el rearranque antes de evaluar DPL30 o DPL60.",
      "coverImage": "/images/resources/technical-articles/white-ink-circulation-pump/white-ink-circulation-dead-zone-cover.webp",
      "coverAlt": "Circuito de tinta blanca con depósito, bomba de diafragma, filtro y ramal con pocas zonas muertas"
    },
    "deck": "La tinta blanca suele utilizar pigmentos de alto índice de refracción y elevada densidad para aportar opacidad. El TiO₂ es habitual, pero la diferencia de densidad, la dispersión, la aglomeración y el tiempo de parada influyen en su sedimentación. El objetivo no es simplemente aumentar el caudal. El depósito, los tubos, el filtro y la zona del cabezal necesitan un flujo controlado que alcance las zonas muertas críticas y respete la presión del cabezal, el estado de la tinta y la compatibilidad de materiales.",
    "leadBlocks": [
      {
        "type": "notice",
        "label": "Respuesta breve:",
        "text": "Seleccione la bomba de tinta blanca junto con la formulación, el cabezal de circulación interna, el recorrido, el filtro y la estrategia de parada. DPL30 y DPL60 son solo candidatos por clase de caudal. Hay que validar la compatibilidad con la tinta concreta."
      },
      {
        "type": "links",
        "items": [
          {
            "href": "/resources/technical-articles/ink-circulation-supply-return-pump-diaphragm-pump/",
            "label": "arquitectura de suministro, retorno y circulación de tinta",
            "prefix": "Defina primero la tarea de la bomba mediante la ",
            "suffix": "."
          }
        ]
      }
    ],
    "sections": [
      {
        "title": "1. ¿Por qué la sedimentación es más difícil de controlar con tinta blanca?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La tinta blanca debe cubrir sustratos oscuros o transparentes y suele contener pigmentos inorgánicos como TiO₂. Este tiene alta densidad; una diferencia grande entre pigmento y vehículo aumenta la tendencia a sedimentar por gravedad. El tamaño de partícula, la aglomeración, el dispersante, la concentración de sólidos, la viscosidad del vehículo, la temperatura y el tiempo de parada afectan a la estabilidad real."
          },
          {
            "type": "notice",
            "label": "No todas las tintas blancas son iguales:",
            "text": "Las tintas blancas acuosas, de disolvente y UV utilizan distintos pigmentos, distribuciones de tamaño, sistemas de dispersión y reología. No suponga que todas tienen viscosidad alta o una misma velocidad de sedimentación."
          }
        ]
      },
      {
        "title": "2. ¿Qué explica el concepto de sedimentación de Stokes?",
        "blocks": [
          {
            "type": "formula",
            "expression": "Vₛ ∝ (ρp − ρf)d² / μ",
            "note": "La tendencia indica que una mayor diferencia de densidad o un mayor tamaño de partícula o aglomerado aumentan la sedimentación, mientras que una mayor viscosidad de la fase continua la reduce."
          },
          {
            "type": "paragraph",
            "text": "Esta relación supone partículas ideales y una suspensión diluida. La tinta blanca concentrada puede presentar distribución de tamaños, interacciones, floculación, tixotropía, flujo no newtoniano y sedimentación impedida. Use Stokes solo para explicar tendencias, no para calcular el caudal de circulación ni sustituir los datos del proveedor y las pruebas del circuito."
          }
        ]
      },
      {
        "title": "3. ¿Qué pretende conseguir la circulación de tinta blanca?",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Reducir gradientes locales de concentración de pigmento en depósitos, tubos y conductos del cabezal.",
              "En cabezales con circulación interna, mantener en movimiento cerca de las boquillas los líquidos que sedimentan o se secan rápidamente.",
              "Trabajar junto con agitación, control térmico, desgasificación y filtración para mantener un estado de tinta más uniforme.",
              "Mejorar la homogeneización y el rearranque tras una parada, sin suponer que todo depósito endurecido se puede redispersar."
            ]
          },
          {
            "type": "paragraph",
            "text": "La circulación puede reducir el riesgo de sedimentación, pero no corrige una formulación inestable, filtración incorrecta, depósitos endurecidos o zonas muertas estancadas. Agitar el depósito y circular por un circuito externo son tareas distintas y pueden necesitar actuadores diferentes."
          }
        ]
      },
      {
        "title": "4. ¿Por qué importan más las zonas muertas que una sola cifra de caudal?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Aunque el circuito principal alcance el caudal objetivo, los extremos de ramales, cavidades de válvulas, escalones de racores, esquinas del depósito, puntos bajos, volúmenes sobredimensionados y derivaciones pueden quedar casi estancados. Acorte los ramales ciegos, reduzca el volumen retenido, evite puntos bajos de acumulación y confirme que el flujo alcanza la zona del cabezal que necesita protección."
          }
        ]
      },
      {
        "title": "5. ¿Por qué no aumentar simplemente el caudal de tinta blanca?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Un caudal mayor puede renovar mejor algunas zonas, pero eleva la pérdida de presión en filtros y tubos estrechos. Sin control adecuado de suministro y retorno, las perturbaciones llegan al menisco. Una velocidad excesiva también puede aumentar pulsación, espuma, liberación de gas, temperatura o desgaste de partículas y piezas mojadas. Con tinta UV, respete los límites del proveedor sobre luz, temperatura y exposición de materiales."
          },
          {
            "type": "notice",
            "label": "Objetivo correcto:",
            "text": "Encuentre la menor circulación eficaz que cubra los recorridos críticos, respete la ventana de presión del cabezal y conserve margen para la carga del filtro; no busque la máxima velocidad de la bomba."
          }
        ]
      },
      {
        "title": "6. ¿Cómo interactúan filtro, viscosidad, presión y pigmento?",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Variable",
              "Efecto sobre la circulación de tinta blanca",
              "Validación"
            ],
            "rows": [
              [
                "Viscosidad y temperatura",
                "Cambian la pérdida de presión del tubo, el punto de la bomba y el estado de inyección",
                "Medir viscosidad, caudal y presión en todo el intervalo térmico"
              ],
              [
                "Filtro",
                "La pérdida de presión crece con caudal, viscosidad y carga; el grado de filtración también debe seguir los requisitos del cabezal",
                "Probar el filtro limpio, con carga habitual y cerca de su sustitución"
              ],
              [
                "Pigmento y aglomerados",
                "Afectan a sedimentación, obstrucción y riesgo de abrasión",
                "Observar tamaño, dispersión, sedimentación y circulación prolongada"
              ],
              [
                "Presión de suministro y retorno",
                "Establece el diferencial de circulación y afecta al menisco",
                "Medir conjuntamente suministro, retorno, presión diferencial y estado del cabezal"
              ],
              [
                "Tubos y recorrido",
                "Definen distribución de velocidad, pérdidas de presión y zonas muertas",
                "Usar un circuito de ensayo transparente y comprobar presiones por tramos y equilibrio de caudales"
              ]
            ]
          }
        ]
      },
      {
        "title": "7. ¿Se puede utilizar DPL30 o DPL60 como bomba de tinta blanca?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "DPL30 o DPL60 puede entrar en una lista inicial según el caudal objetivo y la clase de presión de 100 kPa, pero ninguna debe presentarse como bomba de tinta blanca ya validada. DPL30 es de clase 300 mL/min y DPL60 de 600 mL/min; ambas cifras son caudales sin carga, no caudales instalados con tinta blanca."
          },
          {
            "type": "table",
            "headers": [
              "Candidato",
              "Dato verificado para la preselección",
              "Pendiente de verificar"
            ],
            "rows": [
              [
                "DPL30",
                "Clase 300 mL/min; 100 kPa",
                "Punto de funcionamiento, estabilidad a baja velocidad, pulsación, partículas y materiales mojados"
              ],
              [
                "DPL60",
                "Clase 600 mL/min; 100 kPa",
                "Punto de funcionamiento, margen del filtro, circulación prolongada y materiales"
              ],
              [
                "DPL30H",
                "Clase 300 mL/min; orientación a alta presión de 600 kPa",
                "Una presión alta no implica aptitud para el cabezal; no es el candidato predeterminado aquí"
              ]
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump/",
                "label": "Página del producto DPL30"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/dpl60-liquid-diaphragm-pump/",
                "label": "Página del producto DPL60"
              },
              {
                "href": "/resources/technical-articles/300-vs-600-ml-min-ink-circulation-return-pump-selection/",
                "label": "selección de caudal de tinta entre 300 y 600 mL/min"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "categoría de bombas de diafragma miniatura para líquidos"
              }
            ]
          },
          {
            "type": "notice",
            "label": "Conclusión que debe quedar clara:",
            "text": "DPL30 no es automáticamente compatible con tinta blanca y DPL60 no es una bomba de tinta blanca por defecto. Debe validarse la compatibilidad con la tinta específica."
          }
        ]
      },
      {
        "title": "8. ¿Por qué probar la circulación prolongada y el rearranque?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Una breve prueba con agua no representa la exposición prolongada a pigmentos, disolventes o monómeros, dispersantes y temperatura. El ensayo dinámico debe seguir caudal, presión diferencial, pulsación, corriente, calentamiento, cambios de material, depósitos y carga del filtro. El ensayo de parada debe cubrir sedimentación, acumulación en puntos bajos, adhesión de válvulas y tiempo de homogeneización."
          },
          {
            "type": "list",
            "items": [
              "Utilice ciclos de funcionamiento, espera y desconexión representativos de la impresora.",
              "Compare concentración o indicadores ópticos en varios puntos de muestreo antes y después de la parada.",
              "Valide la secuencia de rearranque, el tiempo de agitación y circulación, la eliminación de aire, el diferencial del filtro y el estado del cabezal.",
              "Inspeccione tubos, cabeza de bomba, diafragma, válvulas, juntas y uniones adheridas para detectar cambios dimensionales, de dureza, hinchamiento, fisuras o extracción de componentes."
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/300-ml-min-micro-liquid-diaphragm-pump-epdm-ptfe-ffkm/",
                "label": "guía de validación de materiales EPDM, PTFE y FFKM",
                "prefix": "Para preseleccionar materiales, consulte la ",
                "suffix": "."
              }
            ]
          }
        ]
      },
      {
        "title": "9. Lista de selección de una bomba de circulación de tinta blanca",
        "blocks": [
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Pida al proveedor el sistema de pigmentos, datos de viscosidad y temperatura, requisitos de filtración y condiciones permitidas de cizallamiento y circulación.",
              "Confirme la circulación interna del cabezal, el diferencial permitido y la ventana del menisco.",
              "Marque agitación del depósito, circuito principal, ramales, cabezal, puntos bajos y todas las zonas muertas.",
              "Evalúe DPL30, DPL60 u otros candidatos mediante curvas; nunca use el caudal libre como punto de trabajo.",
              "Valide filtros limpios y cargados, cambios de nivel, burbujas, fallos de presión y rango de temperatura.",
              "Complete circulación prolongada, sedimentación en parada, recuperación al reiniciar y ensayos de materiales mojados antes de la puesta en servicio."
            ]
          }
        ]
      }
    ],
    "faqTitle": "Preguntas frecuentes sobre circulación de tinta blanca",
    "faqItems": [
      {
        "question": "¿Por qué se hace circular la tinta blanca?",
        "answer": "La circulación ayuda a reducir sedimentación local y gradientes de concentración de pigmentos densos en depósitos, tubos y cabezales con circulación interna; también apoya el control térmico, la filtración y la eliminación de aire."
      },
      {
        "question": "¿Por qué tiende a sedimentar el TiO₂?",
        "answer": "Su densidad difiere sustancialmente de la del vehículo. En la tendencia ideal, partículas o aglomerados mayores sedimentan más rápido; la dispersión, la concentración de sólidos y la reología modifican el comportamiento real."
      },
      {
        "question": "¿La circulación elimina por completo la sedimentación?",
        "answer": "No se puede garantizar. Puede reducirla en zonas con flujo eficaz, pero una formulación inestable, depósitos duros y zonas muertas pueden seguir causando problemas."
      },
      {
        "question": "¿Un caudal de circulación mayor siempre es mejor?",
        "answer": "No. Aumenta las pérdidas de presión y puede afectar al cabezal, pulsación, espuma, temperatura o desgaste. Valide la menor condición eficaz."
      },
      {
        "question": "¿Qué es una zona muerta en un circuito de tinta blanca?",
        "answer": "Una región de poco flujo o estancada: ramal ciego, punto bajo, cavidad de válvula, esquina de depósito o conducto del cabezal que no recibe recirculación."
      },
      {
        "question": "¿La ley de Stokes determina directamente el caudal de circulación?",
        "answer": "No. Describe una tendencia ideal de sedimentación. Las interacciones, aglomeración y reología no newtoniana de la tinta concentrada requieren ensayos."
      },
      {
        "question": "¿DPL30 es automáticamente compatible con tinta blanca?",
        "answer": "No. Solo es un candidato de clase 300 mL/min. Deben validarse materiales, partículas, filtración, circulación prolongada y rearranque."
      },
      {
        "question": "¿Basta con encender la bomba de circulación después de una parada?",
        "answer": "No siempre. También pueden necesitarse agitación del depósito, circulación escalonada a baja velocidad, purga de aire y mantenimiento del cabezal. Determine la secuencia mediante ensayos de tinta y sistema."
      }
    ],
    "cta": {
      "title": "Valide la bomba y el circuito con la tinta blanca real",
      "description": "Indique composición de la tinta, información sobre pigmentos y partículas, viscosidad y temperatura, ventana de presión del cabezal, recorrido, filtro y ciclo de parada.",
      "contactLabel": "Enviar condiciones de circulación de tinta blanca",
      "productsLabel": "Ver bombas de diafragma para líquidos",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "300-ml-min-micro-liquid-diaphragm-pump-self-priming-loss": {
    "metadata": {
      "title": "¿Por qué una bomba de diafragma miniatura para líquidos de 300 mL/min pierde autocebado con el tiempo?",
      "seoTitle": "Pérdida de autocebado en bombas de 300 mL/min | FOREACH",
      "seoDescription": "Analice la pérdida de autocebado: fugas en válvulas antirretorno o entrada, pérdidas de aspiración, presión de vapor y cambios de materiales.",
      "coverImage": "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-self-priming-test.webp",
      "coverAlt": "Bomba de diafragma miniatura para líquidos FOREACH DPL30 de 300 mL/min"
    },
    "deck": "La pérdida de autocebado significa que la bomba y el recorrido de aspiración ya no crean y mantienen la misma baja presión absoluta de entrada que al principio. Las fugas de válvulas antirretorno, entradas de aire, mayores pérdidas de aspiración, presión de vapor y cambios de materiales pueden producir el mismo síntoma. Que el motor gire no identifica la causa.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "El autocebado no es una altura fija independiente de las condiciones. Depende de la presión absoluta mínima que la bomba logra en la entrada, de la presión sobre la superficie del líquido, la altura, las pérdidas de aspiración, la temperatura y la presión de vapor."
      },
      {
        "type": "notice",
        "label": "Alcance:",
        "text": "Este artículo trata la transferencia de líquidos. Los 300 mL/min de DPL30 son un caudal libre, mientras que 6 mH₂O es una altura de autocebado bajo condiciones de ensayo especificadas. Ninguno garantiza sin condiciones las prestaciones instaladas con cualquier recorrido o líquido."
      }
    ],
    "sections": [
      {
        "title": "1. Convierta la altura de autocebado en un balance de presión",
        "blocks": [
          {
            "type": "paragraph",
            "text": "En la carrera de aspiración, el diafragma aumenta el volumen de la cámara y reduce la presión absoluta de entrada. El líquido solo entra cuando la presión sobre su superficie vence la altura hidrostática y todas las pérdidas de aspiración."
          },
          {
            "type": "formula",
            "expression": "ΔP_h = ρgh",
            "note": "Para agua cerca de 20 °C, una columna de 6 m representa aproximadamente 58.7 kPa de diferencia estática. Los tubos, racores, válvulas, filtros y contracciones locales añaden pérdidas."
          },
          {
            "type": "formula",
            "expression": "H_available ≈ (P_surface,abs − P_in,min,abs − ΔP_suction loss) / (ρg)",
            "note": "Este modelo sirve para comprender el margen de aspiración, no es una ecuación de aceptación de DPL30. Perder 10 kPa de capacidad de vacío utilizable equivale aproximadamente a 1.02 m de columna de agua."
          },
          {
            "type": "notice",
            "label": "Significado para el diagnóstico:",
            "text": "Cualquier cambio que eleve la presión mínima de entrada o aumente las pérdidas puede reducir la altura de autocebado, alargar el cebado inicial o impedir el arranque de un circuito seco."
          }
        ]
      },
      {
        "title": "2. Una válvula antirretorno puede moverse sin sellar",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Las válvulas de entrada y salida deben abrir, cerrar y retener presión diferencial en cada ciclo. Partículas, residuos cristalizados, líquido seco, desgaste o pequeñas deformaciones pueden dejar una válvula aparentemente intacta que permite fuga inversa al cerrar."
          },
          {
            "type": "paragraph",
            "text": "La fuga inversa disipa parte de la presión diferencial recién creada por el diafragma. El sellado de las válvulas, el volumen retenido y la presencia de vapor o gas influyen en el caudal útil y el autocebado. Esta explicación del mecanismo no constituye un dato de rendimiento de DPL30."
          },
          {
            "type": "notice",
            "label": "Qué medir:",
            "text": "Compruebe con qué rapidez baja la presión de entrada, cuánto sube tras parar y si limpiar recupera la altura de aspiración y el caudal. La inspección visual no basta."
          }
        ]
      },
      {
        "title": "3. Una fuga de aire en aspiración puede no perder líquido hacia fuera",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Durante el cebado, la entrada normalmente está por debajo de la presión atmosférica. Una manguera envejecida, abrazadera floja, superficie rayada o tapa de botella con fugas puede aspirar aire sin mostrar salida de líquido, reduciendo altura, presión o caudal."
          },
          {
            "type": "formula",
            "expression": "Q_pump = Q_liquid + Q_air leak",
            "note": "Como aproximación diagnóstica, el aire ocupa parte del volumen de aspiración que podría transportar líquido. Los términos volumétricos deben compararse a una misma presión de referencia; la compresibilidad del gas impide tratar esta expresión como un modelo bifásico completo."
          },
          {
            "type": "paragraph",
            "text": "Por eso el sistema puede funcionar después de cebarlo manualmente con líquido y fallar tras vaciarse. El cebado en seco empieza con aire en el recorrido y es más sensible al sellado de válvulas y a la estanqueidad de entrada."
          }
        ]
      },
      {
        "title": "4. También importan la temperatura, la presión de vapor y las pérdidas de aspiración",
        "blocks": [
          {
            "type": "formula",
            "expression": "P_in,abs > P_vapour + P_margin",
            "note": "La presión local de entrada debe superar la presión de vapor con margen de ingeniería; de lo contrario pueden aparecer desgasificación, vaporización y cavitación."
          },
          {
            "type": "paragraph",
            "text": "Los tubos de aspiración largos o estrechos, codos, válvulas y filtros aumentan las pérdidas; una temperatura mayor eleva la presión de vapor y una viscosidad mayor aumenta la pérdida de presión. La misma bomba puede comportarse de forma distinta con agua a 20 °C, limpiador caliente, reactivo con alcohol o formulación con tensioactivos."
          },
          {
            "type": "notice",
            "label": "No atribuya todas las burbujas a una fuga de aire:",
            "text": "Pueden proceder de una fuga externa, liberación de gas disuelto o vaporización local. Registre presión absoluta de entrada, temperatura, lugar donde aparece la primera burbuja y efecto de usar líquido desgasificado."
          }
        ]
      },
      {
        "title": "5. Pequeños cambios de material pueden manifestarse primero en el sellado",
        "blocks": [
          {
            "type": "paragraph",
            "text": "ISO 1817 contempla efectos de líquidos sobre cauchos como absorción, extracción de componentes solubles y reacción química. Incluso sin grietas visibles, los cambios de volumen, masa, dureza o recuperación elástica pueden modificar el contacto entre válvula y asiento."
          },
          {
            "type": "formula",
            "expression": "ΔV, Δm, ΔH + comportamiento dinámico de sellado",
            "note": "La inmersión compara cambios del material, pero las válvulas y diafragmas requieren validación dinámica de la bomba completa con el líquido, temperatura, presión diferencial y número de ciclos reales."
          },
          {
            "type": "paragraph",
            "text": "La información oficial de DPL30 indica dos combinaciones mojadas: diafragma EPDM, válvulas EPDM y cabeza PPS; o diafragma PTFE, válvulas FFKM y cabeza PPS. Los nombres de materiales sirven para preseleccionar, no demuestran compatibilidad universal con reactivos."
          }
        ]
      },
      {
        "title": "6. Use un circuito de referencia para separar bomba e instrumento",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Mantenga la bomba, alimentación y líquido de ensayo especificado. Sustituya la entrada por un tubo corto, de gran diámetro y estanco, y sitúe el líquido cerca de la entrada. Hágalo antes de abrir la bomba o cambiar el motor."
          },
          {
            "type": "table",
            "headers": [
              "Resultado de referencia",
              "Evidencia de presión de entrada",
              "Comprobaciones prioritarias"
            ],
            "rows": [
              [
                "Se recupera el autocebado",
                "El vacío se forma a la velocidad original",
                "Tubo de aspiración del instrumento, ventilación de botella, filtro, válvulas, racores y altura"
              ],
              [
                "Sigue por debajo del estado inicial",
                "La presión mínima es mayor o desciende más lentamente",
                "Contaminación de cabeza, sellado de válvulas, carrera del diafragma y cambios de materiales"
              ],
              [
                "La presión sube rápido tras parar",
                "Mala retención de presión",
                "Entrada de aire externa o fuga inversa interna; aislar tramos para distinguirlas"
              ],
              [
                "Funciona con agua pero no con el líquido de proceso",
                "Burbujas o presión inestable",
                "Presión de vapor, viscosidad, desgasificación y compatibilidad de materiales"
              ]
            ]
          },
          {
            "type": "list",
            "items": [
              "Tiempo de cebado inicial y máxima altura de aspiración estable",
              "Presión absoluta mínima de entrada y tiempo para alcanzarla",
              "Caudal real, tensión de alimentación, corriente y temperatura del líquido",
              "Tendencia de subida de presión tras la parada",
              "Mediciones comparables a 0 h, media vida y final de vida"
            ]
          }
        ]
      }
    ],
    "faqTitle": "FAQ | Pérdida de autocebado en una bomba miniatura de 300 mL/min",
    "faqItems": [
      {
        "question": "¿Menos autocebado significa siempre envejecimiento del motor?",
        "answer": "No. Fugas de entrada, válvulas contaminadas o con fugas, mayor resistencia, temperatura y presión de vapor o cambios de materiales pueden aparecer antes que un problema de motor. Compare primero la curva de presión de entrada y un circuito de referencia."
      },
      {
        "question": "¿Por qué funciona después de cebar con líquido pero no desde seco?",
        "answer": "El arranque en seco exige crear baja presión a través de un recorrido lleno de aire y es especialmente sensible al sellado y la estanqueidad. El cebado húmedo reduce esa exigencia y puede ocultar temporalmente una pequeña fuga."
      },
      {
        "question": "¿Puedo descartar una fuga de entrada si no sale líquido?",
        "answer": "No. Una conexión bajo presión atmosférica puede aspirar aire sin perder líquido. Use aislamiento por tramos, retención de presión o un circuito de referencia con tubo corto."
      },
      {
        "question": "¿6 mH₂O significa que DPL30 siempre elevará líquido 6 m instalada?",
        "answer": "No. El valor corresponde a condiciones definidas. Tubos, racores, válvulas, filtros, propiedades del líquido, alimentación y variación entre unidades consumen margen de aspiración."
      },
      {
        "question": "¿Qué indica una subida rápida de presión al parar?",
        "answer": "Mala retención por una fuga externa de entrada o una fuga inversa interna. Separe la bomba del recorrido de aspiración externo para localizarla."
      }
    ],
    "cta": {
      "title": "¿Necesita diagnosticar la pérdida de autocebado de DPL30?",
      "description": "Indique tiempos de cebado iniciales y actuales, curvas de presión, altura, dimensiones de tubos, líquido, temperatura, alimentación y horas de uso para separar causas de cabeza, materiales y circuito.",
      "contactLabel": "Contactar con un ingeniero",
      "productsLabel": "Ver la bomba de diafragma miniatura DPL30",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump"
    }
  },
  "300-ml-min-micro-liquid-diaphragm-pump-motor-runs-no-flow": {
    "metadata": {
      "title": "El motor de una bomba de diafragma miniatura de 300 mL/min gira, pero no sale líquido: ¿qué revisar primero?",
      "seoTitle": "El motor de la bomba gira, pero no hay caudal | FOREACH",
      "seoDescription": "Diagnostique falta de caudal revisando fugas de entrada, obstrucciones, válvulas antirretorno, contrapresión y corriente del motor.",
      "coverImage": "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-motor-power-check.webp",
      "coverAlt": "Bomba de diafragma miniatura FOREACH DPL30 usada para diagnosticar un circuito de líquido"
    },
    "deck": "La rotación del motor confirma actividad del accionamiento, no el llenado efectivo, la acción direccional de las válvulas ni una carga de salida admisible. El diagnóstico más rápido combina presión de entrada, presión de salida, caudal y corriente en lugar de basarse solo en el sonido.",
    "leadBlocks": [
      {
        "type": "formula",
        "expression": "Q_net ≈ fV_sη_fillη_valve − Q_leak",
        "note": "Este modelo diagnóstico separa frecuencia de ciclos, volumen efectivo por carrera, eficiencia de llenado, eficiencia de válvulas y fugas. No es una ecuación de producto DPL30."
      },
      {
        "type": "notice",
        "label": "Trabajo seguro:",
        "text": "Desconecte la alimentación y libere la presión antes de abrir tubos o la cabeza. Vacíe y descontamine según el riesgo químico o biológico real."
      }
    ],
    "sections": [
      {
        "title": "1. Un motor en marcha no demuestra bombeo efectivo",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La bomba necesita carrera efectiva del diafragma, llenado de cámara, válvulas de entrada y salida con acción direccional y capacidad para superar el diferencial del sistema. Cualquier fallo puede dejar el motor funcionando con la salida seca."
          },
          {
            "type": "paragraph",
            "text": "Transforme el síntoma en dos mediciones: ¿se forma vacío en la entrada y aparece presión anormal en la salida? Suelen acotar la avería más rápido que desmontar inmediatamente."
          }
        ]
      },
      {
        "title": "2. Poco o ningún vacío: revisar fugas, válvulas y carrera",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Si la presión apenas baja y no entra líquido, revise entradas de aire, puertos invertidos, válvulas que no sellan, contaminación de cabeza y movimientos del diafragma o transmisión que no generan desplazamiento efectivo."
          },
          {
            "type": "paragraph",
            "text": "Conexiones no estancas, partículas en la cabeza, válvulas del sistema cerradas, filtros bloqueados y piezas incompatibles con el líquido son causas habituales de falta de cebado o bajo rendimiento. Aísle cada variable por separado."
          },
          {
            "type": "notice",
            "label": "Prueba rápida:",
            "text": "Use un tubo de entrada transparente, corto y estanco; confirme el sentido de flujo y el nivel de origen y repita la prueba. Inspeccione la cabeza solo si sigue sin crear vacío."
          }
        ]
      },
      {
        "title": "3. Vacío fuerte sin llegada de líquido: revisar el recorrido de aspiración",
        "blocks": [
          {
            "type": "formula",
            "expression": "P_in,abs = P_tank,abs − ρgh − ΔP_tube − ΣΔP_components",
            "note": "La presión de entrada depende de la presión del depósito, altura y pérdidas de tubos y componentes. En un recipiente sellado sin aire de reposición, P_tank,abs disminuye al extraer líquido."
          },
          {
            "type": "paragraph",
            "text": "Un vacío fuerte sugiere que la bomba aspira, pero hay restricción en la alimentación. Revise filtro de entrada, tubo aplastado o doblado, apertura de válvulas, ventilación de botella, nivel y altura."
          },
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Ventile el recipiente de origen cuando el proceso lo permita.",
              "Acorte y aumente el diámetro de entrada y reduzca la altura innecesaria.",
              "Puentee temporalmente filtros y válvulas no críticos y restáurelos uno a uno.",
              "Registre presión de entrada y tiempo hasta el primer flujo tras cada cambio."
            ]
          }
        ]
      },
      {
        "title": "4. Entra líquido, pero no sale: revisar contrapresión y restricciones de salida",
        "blocks": [
          {
            "type": "formula",
            "expression": "ΔP_pump = P_out − P_in",
            "note": "La bomba debe superar el diferencial total entre entrada y salida, no solo la presión manométrica de salida."
          },
          {
            "type": "paragraph",
            "text": "Una salida bloqueada, filtro cargado, válvula cerrada, aguja fina, boquilla o recipiente presurizado elevan la presión de impulsión. Válvulas, boquillas, tubos y racores modifican la contrapresión y el punto de funcionamiento."
          },
          {
            "type": "notice",
            "label": "Límite del valor nominal:",
            "text": "Los 300 mL/min de DPL30 son caudal libre, no caudal garantizado a cualquier contrapresión. Evalúe un circuito de alta resistencia a su caudal objetivo y diferencial total."
          }
        ]
      },
      {
        "title": "5. Acotar la avería mediante las presiones de entrada y salida",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Síntoma",
              "Presión de entrada",
              "Presión de salida",
              "Comprobación prioritaria"
            ],
            "rows": [
              [
                "Motor en marcha sin cebado",
                "Casi sin vacío",
                "Baja",
                "Fuga de aire, puertos invertidos, sellado de válvulas, carrera del diafragma"
              ],
              [
                "Aumenta el vacío, pero no llega líquido",
                "Claramente más baja",
                "Baja",
                "Entrada bloqueada, altura excesiva, recipiente sin ventilación"
              ],
              [
                "Entra líquido, pero el caudal de salida es bajo",
                "Cerca de la referencia",
                "Alta",
                "Válvula de salida, filtro, aguja, boquilla o contrapresión"
              ],
              [
                "Fluctúan caudal y burbujas",
                "Fluctuante",
                "Puede fluctuar a la vez",
                "Fuga de aire, desgasificación, vaporización o cavitación"
              ],
              [
                "Ceba con líquido, pero falla desde seco",
                "Insuficiente durante el arranque seco",
                "Se recupera al mojarse",
                "Estanqueidad interna o externa y cierre de válvulas"
              ]
            ]
          }
        ]
      },
      {
        "title": "6. Añadir corriente del motor sin interpretarla de forma aislada",
        "blocks": [
          {
            "type": "formula",
            "expression": "Registrar: P_in(t) + P_out(t) + Q(t) + I(t)",
            "note": "Estas señales juntas ayudan a distinguir resistencia del circuito, fallo de bombeo y cambios de carga del accionamiento."
          },
          {
            "type": "paragraph",
            "text": "El funcionamiento sin carga, con carga normal de líquido, con alta contrapresión o con restricción mecánica suele producir curvas de corriente diferentes. La corriente también depende de alimentación, versión del motor y control. Úsela para comparar condiciones equivalentes, no como veredicto independiente."
          },
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Confirme líquido de origen, dirección de puertos, tensión especificada y salida abierta.",
              "Prepare una referencia con agua y tubo corto y registre las cuatro señales.",
              "Restaure los componentes de entrada uno a uno para localizar el fallo de aspiración.",
              "Restaure los componentes de salida uno a uno para localizar la contrapresión.",
              "Abra la cabeza solo después de aislar el circuito externo."
            ]
          }
        ]
      }
    ],
    "faqTitle": "FAQ | El motor gira, pero no sale líquido",
    "faqItems": [
      {
        "question": "¿Un sonido normal demuestra que la bomba está bien?",
        "answer": "No. No demuestra carrera efectiva, llenado, sellado de válvulas ni diferencial admisible del sistema."
      },
      {
        "question": "¿Por qué un vacío fuerte puede indicar que la bomba no es el primer problema?",
        "answer": "Demuestra que se genera aspiración. Cobran prioridad el recipiente sin ventilación, la obstrucción de entrada, la altura excesiva o el tubo aplastado."
      },
      {
        "question": "¿Debo subir la tensión para forzar el líquido?",
        "answer": "No. Confirme la alimentación dentro de especificación y localice primero la restricción o contrapresión. Aumentar la tensión puede sobrecargar motor, transmisión o cabeza."
      },
      {
        "question": "¿Por qué desaparecen los 300 mL/min al restringir la salida?",
        "answer": "Porque son un valor de caudal libre. La resistencia añadida desplaza el punto de funcionamiento por la curva de la bomba y reduce el caudal real."
      },
      {
        "question": "¿Cuál es el conjunto mínimo útil de mediciones?",
        "answer": "Alimentación fiable y medición de corriente, presión absoluta o vacío de entrada, presión de salida y caudal, por ejemplo mediante volumen recogido en un tiempo conocido."
      }
    ],
    "cta": {
      "title": "¿El motor DPL30 gira y el circuito sigue sin caudal?",
      "description": "Indique presiones de entrada y salida, tubos instalados, altura de origen, carga de descarga, líquido, tensión y corriente, y diferencias entre cebado seco y húmedo para aislar entrada, bomba y salida.",
      "contactLabel": "Contactar con un ingeniero",
      "productsLabel": "Ver la bomba de diafragma miniatura DPL30",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump"
    }
  },
  "300-ml-min-micro-liquid-diaphragm-pump-water-vs-reagent": {
    "metadata": {
      "title": "¿Por qué una bomba de diafragma miniatura de 300 mL/min pierde caudal y autocebado al cambiar agua por un reactivo?",
      "seoTitle": "Bomba de diafragma: rendimiento con agua y reactivo | FOREACH",
      "seoDescription": "Comprenda cómo viscosidad, presión de vapor, desgasificación y compatibilidad de materiales reducen caudal o autocebado al usar reactivos.",
      "coverImage": "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-water-versus-reagent-flow-test.webp",
      "coverAlt": "Bomba de diafragma miniatura FOREACH DPL30 para validar reactivos de proceso"
    },
    "deck": "Superar una prueba con agua solo demuestra rendimiento con esa temperatura, tubos, nivel, alimentación y duración. Un reactivo puede cambiar viscosidad, densidad, presión de vapor, tensión superficial, humectación, desgasificación y estado de materiales, desplazando el punto de funcionamiento de la misma bomba.",
    "leadBlocks": [
      {
        "type": "formula",
        "expression": "Cambio de líquido: μ, ρ, P_vapour, γ, θ, gas disuelto",
        "note": "Estas variables afectan pérdidas de presión, altura estática, margen frente a vaporización, humectación y burbujas. El contacto prolongado añade un efecto de materiales dependiente del tiempo."
      },
      {
        "type": "notice",
        "label": "Límite de DPL30:",
        "text": "El líquido de ensayo oficial de DPL30 es agua purificada. Otros líquidos deben evaluarse con su concentración, temperatura, tiempo de contacto y condiciones reales. Un ensayo satisfactorio con agua no demuestra compatibilidad universal con reactivos."
      }
    ],
    "sections": [
      {
        "title": "1. Empiece por la viscosidad y el circuito, no solo por el caudal libre",
        "blocks": [
          {
            "type": "formula",
            "expression": "ΔP = 128μLQ / (πD⁴)",
            "note": "La relación de Hagen–Poiseuille supone un conducto circular rígido y flujo laminar newtoniano plenamente desarrollado. Estima tendencias y orden de magnitud, no un circuito instalado completo."
          },
          {
            "type": "paragraph",
            "text": "Con esas hipótesis, la pérdida de presión es proporcional a la viscosidad e inversamente proporcional a la cuarta potencia del diámetro. Un pequeño aumento de viscosidad o una reducción del diámetro interior real puede consumir una parte relevante del diferencial disponible."
          },
          {
            "type": "table",
            "headers": [
              "Condición ilustrativa",
              "1.0 mPa·s",
              "3.0 mPa·s",
              "Interpretación"
            ],
            "rows": [
              [
                "300 mL/min por 1 m de tubo ideal con diámetro interior de 3.2 mm",
                "Aproximadamente 1.94 kPa",
                "Aproximadamente 5.83 kPa",
                "La demanda del tubo recto ideal aumenta unos 3.89 kPa; los racores, válvulas, filtros y codos reales añaden pérdidas"
              ]
            ]
          },
          {
            "type": "formula",
            "expression": "Re = ρvD / μ",
            "note": "El ejemplo con agua da Re cercano a 2000, próximo al límite convencional de transición laminar. Trátelo como ilustración y verifique el reactivo y el recorrido completo."
          }
        ]
      },
      {
        "title": "2. Una presión de vapor mayor reduce el margen de aspiración",
        "blocks": [
          {
            "type": "formula",
            "expression": "P_in,abs > P_vapour + P_margin",
            "note": "Al acercarse la presión local de entrada a la presión de vapor de saturación, aumenta la probabilidad de vapor, burbujas y cavitación."
          },
          {
            "type": "paragraph",
            "text": "Con los datos de Antoine de NIST, cerca de 20 °C la presión de vapor de saturación es aproximadamente 2.34 kPa para agua y 5.85 kPa para etanol. Un reactivo real no es etanol puro, pero la comparación muestra por qué una viscosidad similar no garantiza igual aspiración."
          },
          {
            "type": "paragraph",
            "text": "Una temperatura mayor eleva aún más la presión de vapor. A la vez, tubos de aspiración largos y estrechos, altura elevada, filtro cargado o alta viscosidad reducen la presión local de entrada."
          }
        ]
      },
      {
        "title": "3. Las burbujas en un tubo transparente no implican automáticamente fuga de aire",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Origen de la burbuja",
              "Desencadenante habitual",
              "Cómo distinguirlo"
            ],
            "rows": [
              [
                "Entrada externa de aire",
                "Fuga en racor, manguera o sello de botella bajo presión negativa",
                "Aislamiento por tramos, retención de presión y referencia con tubo corto"
              ],
              [
                "Liberación de gas disuelto",
                "Menor presión de entrada, reactivo sin desgasificar o tensioactivo",
                "Comparar con líquido desgasificado y observar el primer punto de aparición"
              ],
              [
                "Vaporización local o cavitación",
                "Alta presión de vapor, temperatura y pérdidas de aspiración",
                "Reducir temperatura, altura y restricción de entrada; comparar ruido y recuperación de caudal"
              ]
            ]
          },
          {
            "type": "notice",
            "label": "Evidencias necesarias:",
            "text": "Antes de atribuirlo a un diafragma roto, registre presión absoluta de entrada, temperatura, primera burbuja, fluctuación de caudal y comparación con líquido desgasificado."
          }
        ]
      },
      {
        "title": "4. Separe efectos inmediatos del líquido y efectos prolongados de materiales",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Un cambio inmediato al sustituir el líquido apunta primero a viscosidad, presión de vapor, humectación, desgasificación o resistencia. Una caída gradual durante días o semanas también exige revisar absorción, extracción, hinchamiento, dureza, depósitos y cristalización."
          },
          {
            "type": "paragraph",
            "text": "ISO 1817 y ASTM D471 comparan masa, volumen, dureza y propiedades mecánicas del caucho antes y después de exponerlo al líquido. Sus ensayos controlados no permiten predecir directamente la vida dinámica de una pieza terminada a partir de la inmersión."
          },
          {
            "type": "notice",
            "label": "Cadena mojada completa:",
            "text": "No valide solo un diafragma PTFE. Incluya válvulas FFKM, cabeza PPS, tubos, racores y sellos externos de la combinación real."
          }
        ]
      },
      {
        "title": "5. Amplíe la prueba con agua a una validación comparable del reactivo",
        "blocks": [
          {
            "type": "formula",
            "expression": "R_Q = Q_reagent / Q_water ; R_H = H_reagent / H_water",
            "note": "RQ y RH comparan caudal y aspiración del reactivo con la referencia de agua. Los programas de duración pueden seguir RQ(t) y RH(t)."
          },
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Mantenga la misma bomba, tensión, altura de entrada, longitud y diámetro interior de tubos.",
              "Registre temperatura, viscosidad, densidad y límites de composición conocidos de agua y reactivo.",
              "Mida presión de entrada y salida, caudal, tiempo inicial de cebado y burbujas.",
              "Compare inmediatamente tras el cambio para separar efectos del punto de funcionamiento.",
              "Realice ciclos y ensayos de contacto en parada correspondientes a la vida objetivo y siga la retención de prestaciones.",
              "Confirme los peores casos de concentración, temperatura, nivel, carga del filtro y tolerancia del tubo en el equipo."
            ]
          }
        ]
      },
      {
        "title": "6. Pregunte por el punto de trabajo real, no solo si puede mover el reactivo",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La pregunta de ingeniería es: con la temperatura, viscosidad, presión de vapor, compatibilidad de materiales y resistencia reales del reactivo, ¿qué caudal, autocebado y vida útil ofrece esta bomba de clase 300 mL/min?"
          },
          {
            "type": "paragraph",
            "text": "Así se reúnen caudal libre, curvas, propiedades, materiales y criterios de aceptación en una matriz de validación, sin tratar una prueba de agua como evidencia universal."
          }
        ]
      }
    ],
    "faqTitle": "FAQ | Cambiar de agua a reactivo",
    "faqItems": [
      {
        "question": "¿Por qué cambia mucho el caudal si la viscosidad apenas aumenta?",
        "answer": "También pueden cambiar diámetro efectivo, pérdidas de racores y filtros, presión de vapor, desgasificación, humectación y materiales. Mida ambas presiones para comprobar el desplazamiento del punto de trabajo."
      },
      {
        "question": "¿Basta con apretar racores para quitar burbujas?",
        "answer": "No siempre. Pueden ser gas disuelto o vapor. Compare presión absoluta, temperatura, ubicación de burbujas y un ensayo con líquido desgasificado."
      },
      {
        "question": "¿Una prueba de agua satisfactoria demuestra compatibilidad de materiales?",
        "answer": "No. El reactivo requiere selección de materiales, inmersión, ciclos dinámicos, contacto en parada y retención de rendimiento de la bomba completa."
      },
      {
        "question": "¿Hagen–Poiseuille predice directamente el caudal instalado?",
        "answer": "No. Requiere condiciones específicas de geometría y flujo. Tubos flexibles, codos, racores, válvulas, filtros, efectos de entrada y comportamiento no newtoniano exigen validar el sistema completo mediante medición."
      },
      {
        "question": "¿Cómo comparar distintos reactivos?",
        "answer": "Use la misma bomba, alimentación, tubos y nivel. Compare caudal, autocebado, presión mínima de entrada, tiempo inicial, burbujas y retención a largo plazo, registrando temperatura y lote."
      }
    ],
    "cta": {
      "title": "¿Quiere pasar de validar DPL30 con agua a un reactivo de proceso?",
      "description": "Indique composición, concentración, temperatura, viscosidad, volatilidad, caudal objetivo, altura, tubos, filtros y requisitos de funcionamiento continuo y contacto en parada para crear una matriz de validación real.",
      "contactLabel": "Contactar con un ingeniero",
      "productsLabel": "Ver la bomba de diafragma miniatura DPL30",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump"
    }
  },
  "300-ml-min-micro-liquid-diaphragm-pump-epdm-ptfe-ffkm": {
    "metadata": {
      "title": "¿Cómo elegir EPDM, PTFE y FFKM para una bomba de diafragma miniatura de 300 mL/min?",
      "seoTitle": "Selección de EPDM, PTFE y FFKM para bombas miniatura | FOREACH",
      "seoDescription": "Compare compatibilidad química, hinchamiento, sellado dinámico y validación con el líquido real al seleccionar EPDM, PTFE y FFKM.",
      "coverImage": "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-wetted-material-inspection.webp",
      "coverAlt": "Bomba de diafragma miniatura FOREACH DPL30 con combinaciones alternativas de materiales mojados"
    },
    "deck": "EPDM, PTFE y FFKM no forman una clasificación simple de menor a mayor calidad. EPDM y FFKM son elastómeros; PTFE es un fluoropolímero. Diafragma, válvulas y cabeza cumplen funciones mecánicas distintas. Se selecciona una estructura mojada completa sometida a cargas dinámicas, no un nombre de material.",
    "leadBlocks": [
      {
        "type": "notice",
        "label": "Combinaciones oficiales de DPL30:",
        "text": "Diafragma EPDM / válvulas EPDM / cabeza PPS, o diafragma PTFE / válvulas FFKM / cabeza PPS. No reorganice estos materiales en configuraciones comerciales no publicadas."
      },
      {
        "type": "paragraph",
        "text": "Las válvulas deben deformarse, recuperarse y volver a sellar rápidamente; el diafragma debe flexionar repetidamente y aislar el líquido; la cabeza mantiene geometría e interfaces de sellado. Una resistencia química más amplia no garantiza mejor comportamiento dinámico en cualquier posición."
      }
    ],
    "sections": [
      {
        "title": "1. Compare la función del componente antes de clasificar materiales",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Material",
              "Clase de material",
              "Aspectos principales en la bomba",
              "Conclusión que no debe suponerse"
            ],
            "rows": [
              [
                "EPDM",
                "Elastómero reticulado",
                "Preselección para líquidos acuosos y polares, recuperación elástica, hinchamiento y extracción",
                "El nombre EPDM no demuestra compatibilidad con toda formulación acuosa"
              ],
              [
                "PTFE",
                "Fluoropolímero",
                "Amplia resistencia química, construcción del diafragma, fatiga por flexión y diseño compuesto",
                "No es automáticamente el mejor material dinámico de válvula ni compatible con cualquier medio"
              ],
              [
                "FFKM",
                "Familia de perfluoroelastómeros",
                "Amplia resistencia química y sellado elástico, con comportamiento dependiente del compuesto",
                "El límite químico o térmico de un grado no se aplica a todos los compuestos FFKM"
              ]
            ]
          }
        ]
      },
      {
        "title": "2. ¿Por qué EPDM suele ser un candidato inicial para líquidos acuosos?",
        "blocks": [
          {
            "type": "paragraph",
            "text": "EPDM se usa habitualmente con agua caliente, vapor, numerosos ácidos, bases, limpiadores y líquidos polares, pero generalmente no es adecuado para aceites y combustibles derivados del petróleo. El resultado depende de formulación, temperatura, concentración y esfuerzo."
          },
          {
            "type": "formula",
            "expression": "δ² = δ_D² + δ_P² + δ_H²",
            "note": "Los parámetros de solubilidad de Hansen separan las interacciones de dispersión, polaridad y puentes de hidrógeno. Ayudan a interpretar tendencias de afinidad e hinchamiento, pero el compuesto concreto requiere ensayos."
          },
          {
            "type": "paragraph",
            "text": "Un elastómero reticulado puede no disolverse como un termoplástico sin reticular; aun así, el líquido puede difundirse por su red y causar absorción e hinchamiento. También puede extraer plastificantes u otros componentes solubles, cambiando masa, dureza y recuperación."
          }
        ]
      },
      {
        "title": "3. PTFE tiene estabilidad química, pero importa su construcción dinámica",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La estructura muy fluorada del PTFE, sus enlaces carbono–flúor fuertes y la protección de la cadena carbonada por el flúor contribuyen a su elevada estabilidad química y térmica. Esto no equivale a compatibilidad ilimitada en cualquier condición."
          },
          {
            "type": "paragraph",
            "text": "PTFE no es un elastómero de caucho. En un diafragma alternativo deben validarse construcción real, soportes o capas compuestas, deformación admisible, presión diferencial, frecuencia y ciclos objetivo. Preguntar únicamente si es PTFE no basta."
          },
          {
            "type": "notice",
            "label": "Límite funcional:",
            "text": "Un diafragma PTFE cambia una parte de la barrera mojada. No sustituye la validación de válvulas FFKM, cabeza PPS, tubos o racores."
          }
        ]
      },
      {
        "title": "4. FFKM mantiene el sellado elástico, pero sus compuestos difieren",
        "blocks": [
          {
            "type": "paragraph",
            "text": "FFKM es una familia de perfluoroelastómeros que combina resistencia química amplia y sellado elástico. No es una formulación única ni debe reducirse a la denominación imprecisa «perfluoroéter» o a una temperatura universal."
          },
          {
            "type": "paragraph",
            "text": "Los grados FFKM emplean formulaciones diferentes para agua caliente y vapor, ácidos, aminas, alta temperatura o prestaciones mecánicas. Incluso dentro de la familia, el cambio de volumen y la retención de propiedades pueden diferir con la misma exposición."
          },
          {
            "type": "notice",
            "label": "Especificación correcta:",
            "text": "Asocie cada afirmación sobre sustancia, concentración y temperatura al compuesto o grado y a la construcción de la pieza; después verifique el servicio previsto."
          }
        ]
      },
      {
        "title": "5. Primera etapa: inmersión sin inventar un límite universal de aceptación",
        "blocks": [
          {
            "type": "paragraph",
            "text": "ISO 1817 y ASTM D471 comparan propiedades del caucho antes y después de exposición, como masa, volumen, dimensiones, dureza, resistencia a tracción y elongación. Cubra concentración, temperatura y tiempo reales, y cuando proceda las diferencias antes y después del secado."
          },
          {
            "type": "formula",
            "expression": "Δm% = (m₁−m₀)/m₀×100% ; ΔV% = (V₁−V₀)/V₀×100% ; ΔH = H₁−H₀",
            "note": "También puede registrarse la retención de resistencia a tracción y elongación. Un método normalizado no establece un límite universal de ±5% para todas las válvulas o diafragmas."
          },
          {
            "type": "paragraph",
            "text": "Los requisitos funcionales deben fijar los límites: ¿cuánto puede variar espesor, dureza o recuperación de la válvula sin perder sellado? ¿Cuánto puede cambiar el diafragma y seguir cumpliendo carrera, presión y vida?"
          }
        ]
      },
      {
        "title": "6. Segunda etapa: validar dinámicamente la bomba completa",
        "blocks": [
          {
            "type": "formula",
            "expression": "R_Q(t) = Q_t / Q_0 ; R_H(t) = H_t / H_0",
            "note": "Siga retención de caudal y autocebado junto con presión mínima de entrada, fugas, corriente, ruido y observaciones de desmontaje."
          },
          {
            "type": "list",
            "ordered": true,
            "items": [
              "Evalúe probetas a concentración, temperatura y lote de líquido más desfavorables.",
              "Cicle la combinación real de materiales de cabeza tanto continuamente como en arranque y parada.",
              "Incluya contacto prolongado en parada, transiciones húmedo–seco, limpieza y recebado.",
              "Compare caudal, presión, autocebado y fugas a 0 h, media vida y final de vida.",
              "Inspeccione asiento de válvulas, deformación de diafragma, depósitos, grietas y cambios dimensionales.",
              "Apruebe bomba, tubos, racores, válvulas externas y sellos como una única cadena mojada."
            ]
          },
          {
            "type": "notice",
            "label": "Diferencia típica:",
            "text": "Una probeta supera la inmersión, pero la válvula dinámica falla en vida útil. Compatibilidad química estática, fatiga cíclica, contacto con asiento y velocidad de recuperación son dimensiones distintas de validación."
          }
        ]
      },
      {
        "title": "7. ¿Cómo entran las combinaciones oficiales DPL30 en la selección?",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Combinación oficial",
              "Papel como candidato",
              "Pendiente de confirmar"
            ],
            "rows": [
              [
                "Diafragma EPDM + válvulas EPDM + cabeza PPS",
                "Candidato inicial para líquidos acuosos y polares compatibles",
                "Formulación, concentración, temperatura, contacto en parada, vida dinámica y materiales mojados externos"
              ],
              [
                "Diafragma PTFE + válvulas FFKM + cabeza PPS",
                "Candidato para evaluar líquidos químicamente más complejos",
                "Compuesto FFKM concreto, límite del PPS, construcción del diafragma y compatibilidad de tubos y racores"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "La tabla muestra vías de preselección, no promesas de compatibilidad. La conclusión final debe incluir composición, concentración, temperatura, presión, contacto, limpieza y vida objetivo."
          }
        ]
      }
    ],
    "faqTitle": "FAQ | EPDM, PTFE y FFKM en una bomba miniatura",
    "faqItems": [
      {
        "question": "¿PTFE siempre es mejor que EPDM para el diafragma?",
        "answer": "No. Suele ofrecer resistencia química más amplia, pero un diafragma dinámico también debe cumplir construcción, fatiga por flexión, presión y vida cíclica. Compare diafragmas terminados, no solo nombres."
      },
      {
        "question": "¿FFKM es compatible con cualquier sustancia?",
        "answer": "No. Es una familia cuyos compuestos difieren en respuesta química, temperatura, cambios de volumen y retención mecánica. Valide el grado y servicio concretos."
      },
      {
        "question": "Si EPDM funciona con agua, ¿sirve para todo reactivo acuoso?",
        "answer": "No. Puede contener alcoholes, tensioactivos, sales, ácidos, bases, oxidantes u otros aditivos; concentración, temperatura y contacto cambian el resultado."
      },
      {
        "question": "¿Poco hinchamiento de una probeta significa que la bomba pasa?",
        "answer": "No. Sellado, fatiga del diafragma, depósitos, recuperación tras limpieza, transiciones húmedo–seco y vida cíclica requieren ensayos dinámicos de bomba completa."
      },
      {
        "question": "¿Qué componentes deben incluirse en la validación?",
        "answer": "Cabeza, diafragma, válvulas de entrada y salida, tubos, racores, válvulas externas, filtros y sellos. El componente mojado más débil fija el límite del sistema."
      }
    ],
    "cta": {
      "title": "¿Selecciona DPL30 con EPDM o con PTFE/FFKM?",
      "description": "Indique composición, concentración, temperatura, presión, tiempo de contacto, método de limpieza y ciclos objetivo para planificar desde preselección e inmersión hasta validación dinámica completa.",
      "contactLabel": "Contactar con un ingeniero",
      "productsLabel": "Ver la bomba de diafragma miniatura DPL30",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump"
    }
  }
} satisfies Partial<Record<DiaphragmPumpEngineeringArticleSlug, DiaphragmPumpEngineeringArticleCopy>>;
