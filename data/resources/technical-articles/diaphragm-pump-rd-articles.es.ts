import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

export const diaphragmPumpRdArticlesEs = {
  "self-priming-miniature-liquid-diaphragm-pump-selection": {
    "metadata": {
      "title": "Selección de una microbomba de diafragma autocebante para líquidos: altura, tiempo y arranque en seco o húmedo",
      "seoTitle": "Bomba miniatura de diafragma autocebante: selección | Foreach Technology",
      "seoDescription": "Evalúe la altura de aspiración, el tiempo hasta la primera llegada de líquido y el suministro estable. Las especificaciones DPL30, DPL60 y DPL30H ayudan a definir candidatos, pero el autocebado debe validarse en el instrumento completo.",
      "coverImage": "/images/resources/technical-articles/diaphragm-pump-rd/covers/dpl30-brushless-port-side-photo.jpg",
      "coverAlt": "Vista del lado de las conexiones de una bomba de diafragma miniatura Foreach DPL30 con el motor"
    },
    "deck": "Evalúe la altura de aspiración, el tiempo hasta la primera llegada de líquido y el suministro estable. Las especificaciones DPL30, DPL60 y DPL30H ayudan a definir candidatos, pero el autocebado debe validarse en el instrumento completo.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Un instrumento puede necesitar líquido de limpieza inmediatamente después del encendido. Aunque el desnivel entre depósito y entrada sea menor que la altura de autocebado especificada, el primer ciclo puede tardar demasiado, exigir varios arranques tras cambiar la botella o dejar burbujas en el extremo final."
      },
      {
        "type": "paragraph",
        "text": "La altura describe solo una dimensión del autocebado. I+D debe confirmar el estado inicial de la cámara y los tubos, la salida del aire desplazado, la primera llegada de líquido y el momento en que el suministro es estable. Estos aspectos deben evaluarse junto con el caudal real de trabajo de la bomba Foreach DPL."
      }
    ],
    "sections": [
      {
        "title": "Convertir el autocebado en un requisito verificable",
        "blocks": [
          {
            "type": "paragraph",
            "text": "El diafragma cambia el volumen de la cámara y las válvulas dirigen la aspiración y la descarga. Un tubo inicialmente vacío presenta primero aire, después fases alternas de gas y líquido y, finalmente, un circuito lleno. La estanqueidad de las válvulas, la compresibilidad y el desplazamiento efectivo cambian durante estas etapas."
          },
          {
            "type": "paragraph",
            "text": "Elevar líquido y suministrarlo al punto final dentro del tiempo permitido son requisitos distintos."
          },
          {
            "type": "table",
            "headers": [
              "Magnitud",
              "Definición propuesta",
              "Pregunta de diseño"
            ],
            "rows": [
              [
                "Altura geométrica de aspiración",
                "Desnivel vertical entre el nivel mínimo permitido y la entrada de la bomba",
                "¿Qué carga estática añade la instalación?"
              ],
              [
                "Tiempo hasta el primer líquido",
                "Desde la orden efectiva de arranque hasta la primera llegada al punto indicado",
                "¿Cuánto tarda el llenado inicial o el cambio de botella?"
              ],
              [
                "Tiempo hasta suministro estable",
                "Desde el arranque hasta que caudal y burbujas cumplen los límites en el extremo",
                "¿Cuándo puede comenzar la siguiente acción?"
              ],
              [
                "Recuperación al rearrancar",
                "Arranques repetidos tras una parada y un estado residual definidos",
                "¿Se recupera de forma fiable el funcionamiento intermitente?"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Identifique el punto de observación. La salida de líquido de la bomba no demuestra que el tubo posterior, una cámara de válvula o una aguja de lavado estén llenos. Defina variación de caudal, intervalo de observación y criterio de burbujas según la tarea; una gota visible no basta."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/diaphragm-pump-rd/es/01.svg",
            "alt": "Tres eventos durante el autocebado",
            "width": 1000,
            "height": 650,
            "caption": "Esquema: la primera aparición de líquido y la entrega estable al destino son eventos distintos. Las separaciones no representan tiempos medidos de una bomba."
          }
        ]
      },
      {
        "title": "Separar las magnitudes de las especificaciones Foreach",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Los valores siguientes proceden de la página 5 de cada especificación china. Son parámetros independientes, no un punto de funcionamiento simultáneo. [F1–F3]"
          },
          {
            "type": "table",
            "headers": [
              "Serie",
              "Caudal sin carga",
              "Presión nominal",
              "Altura de autocebado",
              "Conexión estándar"
            ],
            "rows": [
              [
                "DPL30",
                "300 mL/min",
                "100 kPa",
                "6 mH₂O",
                "Tubo flexible de 3,2 mm de diámetro interior"
              ],
              [
                "DPL60",
                "600 mL/min",
                "100 kPa",
                "3 mH₂O",
                "Tubo flexible de 3,2 mm de diámetro interior"
              ],
              [
                "DPL30H",
                "300 mL/min",
                "600 kPa",
                "3 mH₂O",
                "Racor de compresión para tubo rígido de 6 × 4 mm, exterior × interior"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Más caudal sin carga no implica mayor altura de aspiración, y una presión de salida superior no sustituye el análisis de entrada. Compare DPL60 para mayor capacidad de suministro y DPL30H para mayor contrapresión, comprobando en ambos casos el nivel mínimo y el arranque."
          },
          {
            "type": "paragraph",
            "text": "Las tablas no definen el tiempo asociado hasta el primer líquido, el estado seco/húmedo ni el circuito completo de ensayo. Por tanto, 6 mH₂O no significa autocebado rápido desde 6 m con cualquier fluido o tubería, ni permite calcular por sí solo el tiempo de arranque del instrumento."
          }
        ]
      },
      {
        "title": "Por qué un tubo mayor puede seguir cebándose lentamente",
        "blocks": [
          {
            "type": "paragraph",
            "text": "En un circuito lleno, diámetro, longitud y restricciones determinan parte de las pérdidas de aspiración. Durante el cebado también importa el aire que debe evacuarse. Aumentar el diámetro puede reducir la resistencia al líquido y aumentar simultáneamente el volumen por llenar."
          },
          {
            "type": "paragraph",
            "text": "Un tubo recto de 1 m y 3,2 mm interiores contiene aproximadamente 8,0 mL; con 4,0 mm interiores, unos 12,6 mL. Son cálculos geométricos, sin racores, válvulas ni cámara, y no mediciones de una bomba."
          },
          {
            "type": "paragraph",
            "text": "No divida esos volúmenes por el caudal líquido sin carga para predecir el cebado. También intervienen la capacidad de evacuar aire, el cierre de las válvulas y la presión de salida. Mantenga la aspiración lo más corta posible y reduzca racores y volumen de llenado innecesarios. Ante un cebado difícil, revise por separado fugas de entrada, válvulas o filtros obstruidos, aire atrapado en el cabezal y presión de salida."
          },
          {
            "type": "paragraph",
            "text": "En un depósito abierto, bajar el nivel aumenta la carga estática. En uno cerrado, examine además la admisión de aire: extraer líquido puede reducir la presión del espacio de gas sin cambiar el desnivel. Los puntos altos, válvulas y racores pueden retener cantidades distintas de aire entre arranques."
          }
        ]
      },
      {
        "title": "Ensayar por separado el arranque seco y húmedo",
        "blocks": [
          {
            "type": "paragraph",
            "text": "En un arranque húmedo, la cámara o superficies críticas de las válvulas ya están mojadas. Para un arranque seco, defina si cámara y aspiración están vacías, el método de vaciado y la restauración del estado inicial. No mezcle ambos resultados."
          },
          {
            "type": "paragraph",
            "text": "La humectación puede modificar el contacto de las válvulas y la evacuación inicial. Un rearranque correcto tras prellenar no demuestra el primer arranque después de un almacenamiento prolongado. Separe unidades nuevas o vaciadas, paradas breves, esperas largas y entrada de aire al cambiar la botella."
          },
          {
            "type": "paragraph",
            "text": "El autocebado no autoriza un funcionamiento ilimitado sin líquido. Confirme duración, ciclo de trabajo y aumento de temperatura para el modelo exacto. Si se repiten vaciados o transiciones gas-líquido, evalúe esa tarea específicamente. DPGL800 admite gas y mezclas gas-líquido; sus 6 L/min de caudal de gas sin carga por cabezal no sirven para calcular el cebado de un circuito líquido DPL. [F4]"
          }
        ]
      },
      {
        "title": "Localizar el cuello de botella mediante comparaciones",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Establezca una referencia con el agua purificada especificada, tubos cortos, poca altura y buena estanqueidad. Añada el sistema real progresivamente, variando un factor principal. Registre modelo, materiales, alimentación, humectación inicial, presiones, tensión en la bomba, tiempos y posición de las burbujas."
          },
          {
            "type": "table",
            "headers": [
              "Comparación",
              "Observación",
              "Investigación"
            ],
            "rows": [
              [
                "Aspiración corta frente a la real",
                "Tiempo y presión de entrada",
                "Resistencia, volumen o fugas"
              ],
              [
                "Nivel habitual frente al mínimo",
                "Retraso o pérdida de estabilidad final",
                "Carga estática y margen de aspiración"
              ],
              [
                "Salida de baja contrapresión frente a la real",
                "Arranque con tubo vacío",
                "Evacuación del aire, válvulas y contrapresión inicial"
              ],
              [
                "Prellenado frente a vaciado definido",
                "Diferencias entre primer arranque y rearranque",
                "Humectación, aire retenido y estado inicial"
              ],
              [
                "Agua purificada frente al fluido real",
                "Tiempo, presión y burbujas",
                "Viscosidad, liberación de gas y compatibilidad"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Los puertos de medida añaden volumen y posibles fugas: compruebe su estanqueidad. Use componentes compatibles con fluido y presión; evite ensayos prolongados con salida bloqueada o marcha en seco arbitraria. Registre por separado la formación de vacío y la llegada de líquido: el giro o la caída de presión de entrada no prueban la llegada al punto requerido."
          }
        ]
      },
      {
        "title": "Qué debe quedar documentado",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Identifique qué modelo y combinación de materiales ceba al nivel mínimo, temperatura y salida reales, la dispersión entre arranques y las secuencias o prellenados necesarios. Respete el número de muestras, repeticiones y etapas de vida exigidos por el proyecto. Un arranque correcto de una bomba nueva no valida la producción."
          },
          {
            "type": "paragraph",
            "text": "Para evaluar DPL30, DPL60 o DPL30H, facilite desnivel, volumen y resistencia del circuito, caudal objetivo, contrapresión, formulación del fluido, estado seco/húmedo y espera permitida."
          }
        ]
      },
      {
        "title": "Especificaciones y referencias",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Los parámetros de producto proceden de las especificaciones Foreach indicadas. Verifique los principios y ensayos propuestos para el modelo exacto y las condiciones reales."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00001_A04_cn_DPL30规格书.pdf",
                "label": "[F1] Foreach DPL30 especificación en chino (A04)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00002_A02_cn_DPL60规格书.pdf",
                "label": "[F2] Foreach DPL60 especificación en chino (A02)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2504-00001_A00_cn_DPL30H规格书.pdf",
                "label": "[F3] Foreach DPL30H especificación en chino (A00)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2506-00001_A00_cn_DPGL800气液混合泵规格书.pdf",
                "label": "[F4] Foreach DPGL800 especificación en chino (A00)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              }
            ]
          }
        ]
      },
      {
        "title": "Guías relacionadas de selección y validación",
        "blocks": [
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
                "label": "Medición y reducción de pulsaciones"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-noise-vibration-reduction/",
                "label": "Reducción de ruido y vibraciones"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-backflow-check-valve/",
                "label": "Retorno al parar y diseño antisifón"
              },
              {
                "href": "/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
                "label": "Compatibilidad de materiales en contacto"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Curvas caudal-presión y punto de trabajo"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Selección de bombas miniatura de diafragma para líquidos"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/",
                "label": "Gama de bombas miniatura de diafragma"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Preguntas frecuentes",
    "faqItems": [
      {
        "question": "¿La mayor altura de DPL30 garantiza un arranque más fácil que DPL60?",
        "answer": "No. También influyen volumen, válvulas, fluido y contrapresión. Compare desde el mismo estado inicial."
      },
      {
        "question": "¿Funcionar después de prellenar demuestra que la bomba es adecuada?",
        "answer": "Ayuda a diagnosticar, pero confirme si el instrumento permite prellenado y si unidades nuevas, envejecidas y cambios de botella cumplen la tarea."
      },
      {
        "question": "¿Puede omitirse el ensayo si la altura instalada es inferior a la especificada?",
        "answer": "No. El desnivel no incluye fugas, pérdidas en tubos, admisión de aire al depósito ni evacuación del aire desplazado."
      }
    ],
    "cta": {
      "title": "Consulte la selección de su bomba para líquidos",
      "description": "Indique el fluido, caudal necesario, presiones, tuberías y condiciones de arranque y parada para definir modelo, materiales y validación.",
      "contactLabel": "Contactar con soporte técnico",
      "productsLabel": "Ver bombas miniatura para líquidos",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "miniature-diaphragm-pump-flow-pulsation-reduction": {
    "metadata": {
      "title": "Pulsaciones de caudal en microbombas de diafragma: medición y medidas de reducción",
      "seoTitle": "Pulsaciones de caudal en bombas miniatura: reducción | Foreach Technology",
      "seoDescription": "Separe la pulsación real de los errores de medida antes de comparar amortiguadores, tubos y regulación de velocidad. Valide el resultado en el punto de consumo y bajo condiciones equivalentes.",
      "coverImage": "/images/resources/technical-articles/diaphragm-pump-rd/covers/dpl60-brushless-horizontal-photo.jpg",
      "coverAlt": "Vista horizontal de una bomba de diafragma miniatura Foreach DPL60 con el cabezal y el motor"
    },
    "deck": "Separe la pulsación real de los errores de medida antes de comparar amortiguadores, tubos y regulación de velocidad. Valide el resultado en el punto de consumo y bajo condiciones equivalentes.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Ante pulsaciones excesivas, compruebe primero la forma de onda y el volumen acumulado en la carga. Revise aspiración, alimentación eléctrica y medición antes de cambiar amortiguación, tubos o velocidad. Una lectura inestable del caudalímetro no demuestra por sí sola una avería ni cuantifica la pulsación real."
      },
      {
        "type": "paragraph",
        "text": "El bombeo periódico, la reducción del volumen entregado y el muestreo distorsionado requieren respuestas distintas: aceptación según la aplicación, diagnóstico del punto de trabajo o fallo, y corrección de la cadena de medida. Un filtrado fuerte puede limitarse a estabilizar el número mostrado."
      }
    ],
    "sections": [
      {
        "title": "Caudal medio e instantáneo",
        "blocks": [
          {
            "type": "paragraph",
            "text": "El desplazamiento alternativo y las válvulas generan variaciones de caudal. Tubos, filtros y carga acoplan caudal y presión. El desfase de varios diafragmas y un elemento de amortiguación compatible son posibles vías de diseño. Mida su efecto en la carga real antes de especificar las prestaciones de pulsación."
          },
          {
            "type": "paragraph",
            "text": "El promedio indica la entrega en un intervalo; la onda instantánea indica cómo llega a la carga. Dos ondas pueden tener igual promedio y diferentes picos, pausas o breves flujos inversos. Para rellenar depósitos puede dominar el volumen total; las celdas de flujo, ciclos cortos y cargas sensibles a presión también dependen de la onda. Indique ubicación e intervalo: medir junto a la bomba no equivale a medir después de un amortiguador."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/diaphragm-pump-rd/es/02.svg",
            "alt": "Misma media, distinto caudal instantáneo",
            "width": 1000,
            "height": 650,
            "caption": "Esquema conceptual: curvas sintéticas con la misma media y distintas amplitudes. El caudal está normalizado; no son mediciones Foreach."
          }
        ]
      },
      {
        "title": "Contrastar el volumen acumulado",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Con las mismas condiciones hidráulicas, pese la masa neta recogida durante un intervalo y conviértala a volumen con la densidad a la temperatura real. NIST también utiliza la variación de masa con el tiempo como principio de medida; la precisión de su equipo no se transfiere a este banco propuesto. [N1]"
          },
          {
            "type": "paragraph",
            "text": "Con masa en g, densidad en g/mL y tiempo en s, el caudal medio en mL/min es 60 × masa neta ÷ densidad ÷ tiempo. No presuponga densidad 1 para líquidos distintos del agua. Considere evaporación, salpicaduras y líquido retenido en el recipiente."
          },
          {
            "type": "paragraph",
            "text": "Compare el mismo intervalo y mantenga boquilla y contrapresión. Contrastar todo el arranque del medidor con una recogida solo estable, o quitar una restricción para pesar, cambia los límites del ensayo. Para caudal estable, espere la estabilización de presión y almacenamiento en los tubos. Para ciclos de arranque-parada incluya el ciclo completo, los cambios de volumen almacenado y la descarga posterior."
          },
          {
            "type": "paragraph",
            "text": "Repita intervalos iguales registrando masa, total del medidor y presión. Si ambos totales coinciden y son estables, puede existir pulsación real sin pérdida de entrega. Si la pesada es estable y cambia el promedio del medidor, revise rango, calibración, muestreo y burbujas. Si cambian ambos, investigue variaciones reales de suministro."
          }
        ]
      },
      {
        "title": "Actualización de pantalla y ancho de banda no son equivalentes",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La respuesta del sensor, muestreo y promedio internos, comunicaciones, filtrado y pantalla tienen escalas temporales diferentes. Leer varias veces un mismo resultado no añade muestras útiles."
          },
          {
            "type": "paragraph",
            "text": "El muestreo insuficiente de un flujo pulsante puede producir aliasing. Para una pantalla de actualización lenta, adquiera muestras suficientes dentro del ancho de banda efectivo y después calcule la media del intervalo requerido. El disparo, la duración de medida y el promedio interno influyen en la adquisición; la frecuencia de lectura no define por sí sola el ancho de banda."
          },
          {
            "type": "paragraph",
            "text": "Confirme respuesta dinámica, líquido calibrado y rango útil antes de elegir muestreo y antialiasing. Superar el doble de la máxima frecuencia de interés es un requisito básico, no una garantía de medir bien picos estrechos. Se necesitan ancho de banda y resolución temporal suficientes; confirme ajustes con el fabricante. Un promedio dentro de rango no excluye saturación en los picos. Si existe flujo inverso breve, verifique medición bidireccional e integración con el signo correcto."
          }
        ]
      },
      {
        "title": "Relacionar la onda con otras señales",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Registre caudal, presiones de entrada/salida y realimentación del motor o tensión en una base temporal común. Los tubos transparentes ayudan a localizar burbujas, pero su forma no distingue por sí sola fuga, desgasificación y vaporización local. Revise conjuntamente calibración del fluido, respuesta del sensor a pulsaciones rápidas, burbujas y perturbación mecánica para no confundir errores de medida con cambios reales de suministro."
          },
          {
            "type": "table",
            "headers": [
              "Observación",
              "Primera comprobación",
              "Posible explicación"
            ],
            "rows": [
              [
                "Periodo repetible y volumen estable",
                "Comparar velocidad y presión sincronizadas",
                "Ciclo de bombeo y dinámica del circuito"
              ],
              [
                "Interrupciones con burbujas",
                "Origen de las burbujas y presión de entrada",
                "Fuga, falta de suministro o liberación de gas"
              ],
              [
                "Menor promedio tras añadir un filtro",
                "Pérdida de carga y punto de trabajo",
                "Resistencia o estado del filtro"
              ],
              [
                "Promedio sensible al ajuste de adquisición",
                "Muestreo efectivo, rango y volumen acumulado",
                "Aliasing, saturación o procesado"
              ],
              [
                "Caudal cambia con tensión o velocidad",
                "Fuente y orden de control",
                "Inestabilidad eléctrica o de regulación"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Son indicios, no diagnósticos unívocos. Un pico de presión no permite calcular directamente el caudal instantáneo: influyen resistencia dinámica y posición del sensor."
          }
        ]
      },
      {
        "title": "Amortiguar también modifica la respuesta",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Si entrega y medición son correctas pero la carga no tolera la onda, evalúe amortiguadores compatibles, elasticidad de tubos, velocidad permitida o configuración de bombeo. Un amortiguador almacena y libera líquido según la fase de presión; selecciónelo por presión, fluido, conexiones y espacio."
          },
          {
            "type": "paragraph",
            "text": "Una mayor capacidad elástica puede retrasar la subida de presión y prolongar la descarga tras parar. Los tubos flexibles largos también modifican resistencia y volumen de cebado. Compruebe arranque, promedio estable y volumen residual, además de la suavidad de la onda."
          },
          {
            "type": "paragraph",
            "text": "Cambiar velocidad exige revisar el punto de trabajo: a baja velocidad, respuesta de válvulas y desplazamiento efectivo por ciclo no siempre son proporcionales. En lazo cerrado, ajuste muestreo, filtrado y dinámica del actuador para evitar que el controlador persiga cada pulsación y haga oscilar la orden. Use únicamente interfaces disponibles en la configuración real."
          }
        ]
      },
      {
        "title": "Comparar las medidas en la carga",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Medida",
              "Objetivo",
              "Verificación complementaria"
            ],
            "rows": [
              [
                "Corregir fugas, suministro o tensión",
                "Eliminar fluctuaciones anormales superpuestas",
                "Nivel mínimo, burbujas, tensión y total"
              ],
              [
                "Añadir amortiguador compatible",
                "Reducir variación real de presión o caudal",
                "Presión admisible, fluido, limpieza, arranque y descarga residual"
              ],
              [
                "Cambiar elasticidad o posición de tubos",
                "Modificar respuesta dinámica",
                "Pérdida de carga, volumen de llenado y onda final"
              ],
              [
                "Ajustar velocidad autorizada",
                "Cambiar ciclo y punto de funcionamiento",
                "Válvulas, caudal objetivo, muestreo y estabilidad del lazo"
              ],
              [
                "Comparar estructuras de bombeo",
                "Actuar sobre la fuente de pulsación",
                "Mediciones en la misma tarea, no solo tipo de motor"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Defina baja pulsación para un fluido, caudal, contrapresión, ubicación y ancho de banda concretos. Documente el límite y su método de cálculo; una pantalla muy filtrada no especifica la prestación hidráulica."
          }
        ]
      },
      {
        "title": "Evaluación de las series Foreach DPL",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Las especificaciones DPL30, DPL60 y DPL30H proporcionan caudal sin carga y curvas caudal-presión. No son ondas instantáneas ni establecen amplitud pico a pico, espectro o atenuación en cada condición. [F1–F3]"
          },
          {
            "type": "paragraph",
            "text": "Los 600 mL/min de DPL60 no prueban una mayor pulsación que DPL30; tampoco un motor sin escobillas garantiza baja pulsación. Compare materiales, velocidad, aspiración y circuito bajo las mismas condiciones. Registre promedio e intervalo, máximos y mínimos, presión, ancho de banda, punto de medida, temperatura, burbujas y modelo completo. La aceptación procede de los requisitos del instrumento, no de un porcentaje universal sin condiciones."
          }
        ]
      },
      {
        "title": "Especificaciones y referencias",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Los parámetros de producto proceden de las especificaciones Foreach indicadas. Verifique los principios y ensayos propuestos para el modelo exacto y las condiciones reales."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00001_A04_cn_DPL30规格书.pdf",
                "label": "[F1] Foreach DPL30 especificación en chino (A04)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00002_A02_cn_DPL60规格书.pdf",
                "label": "[F2] Foreach DPL60 especificación en chino (A02)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2504-00001_A00_cn_DPL30H规格书.pdf",
                "label": "[F3] Foreach DPL30H especificación en chino (A00)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              },
              {
                "href": "https://www.nist.gov/laboratories/tools-instruments/gravimetric-standard-liquid-micro-flow",
                "label": "[N1] NIST: patrón gravimétrico de microcaudal de líquidos"
              }
            ]
          }
        ]
      },
      {
        "title": "Guías relacionadas de selección y validación",
        "blocks": [
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
                "label": "Autocebado y tiempo de arranque"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-noise-vibration-reduction/",
                "label": "Reducción de ruido y vibraciones"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-backflow-check-valve/",
                "label": "Retorno al parar y diseño antisifón"
              },
              {
                "href": "/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
                "label": "Compatibilidad de materiales en contacto"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Curvas caudal-presión y punto de trabajo"
              },
              {
                "href": "/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/",
                "label": "Control de bombas sin escobillas de dos y cinco hilos"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Selección de bombas miniatura de diafragma para líquidos"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/",
                "label": "Gama de bombas miniatura de diafragma"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Preguntas frecuentes",
    "faqItems": [
      {
        "question": "¿Una pesada estable demuestra que la pulsación no afecta al instrumento?",
        "answer": "No. Valida el total; las tareas breves y los componentes sensibles a presión pueden responder a variaciones instantáneas."
      },
      {
        "question": "¿Basta con aumentar el filtrado del caudalímetro?",
        "answer": "El filtrado modifica presentación y retardo de control, no elimina físicamente la pulsación. Conserve datos originales y totales."
      },
      {
        "question": "¿Conviene instalar inmediatamente un amortiguador?",
        "answer": "Primero descarte fugas de aire, rango y muestreo. Después valide limpieza, llenado, respuesta y descarga al parar."
      }
    ],
    "cta": {
      "title": "Consulte la selección de su bomba para líquidos",
      "description": "Indique el fluido, caudal necesario, presiones, tuberías y condiciones de arranque y parada para definir modelo, materiales y validación.",
      "contactLabel": "Contactar con soporte técnico",
      "productsLabel": "Ver bombas miniatura para líquidos",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "miniature-diaphragm-pump-noise-vibration-reduction": {
    "metadata": {
      "title": "Ruido en microbombas de diafragma: causas, aislamiento de vibraciones y reducción",
      "seoTitle": "Ruido en bombas miniatura de diafragma: causas y medidas | Foreach Technology",
      "seoDescription": "Analice el ruido de una microbomba de diafragma manteniendo el punto de trabajo. Revise motor, cabezal, soporte, tubos y carcasa, y compruebe caudal, temperatura y fiabilidad después de cada mejora.",
      "coverImage": "/images/resources/technical-articles/diaphragm-pump-rd/covers/dpl30-brushless-bottom-photo.jpg",
      "coverAlt": "Vista inferior de una bomba de diafragma miniatura Foreach DPL30 con la base y los orificios de montaje"
    },
    "deck": "Analice el ruido de una microbomba de diafragma manteniendo el punto de trabajo. Revise motor, cabezal, soporte, tubos y carcasa, y compruebe caudal, temperatura y fiabilidad después de cada mejora.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Si una microbomba resulta ruidosa, revise primero el funcionamiento y las vías de transmisión antes de elegir aislamiento, cambios de soporte o amortiguación hidráulica. Los ensayos independientes e instalados deben mantener caudal, presión y condiciones acústicas comparables."
      },
      {
        "type": "paragraph",
        "text": "Una bomba aceptable en el banco puede generar zumbidos, tonos o golpes periódicos al fijarla a la base y conectar los tubos. Determine si ha cambiado la excitación o si la instalación amplifica una existente. Cambiar la bomba ayuda a comparar, pero otra unidad puede comportarse igual si permanece la vía de transmisión."
      }
    ],
    "sections": [
      {
        "title": "Separar fuentes y vías de transmisión",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La rotación del motor, la transmisión y el diafragma generan excitación mecánica. Las válvulas y las variaciones de presión excitan el circuito. La energía llega al micrófono por el aire o pasa por soportes, abrazaderas, racores y carcasa, cuyos paneles pueden radiar sonido."
          },
          {
            "type": "paragraph",
            "text": "La instalación puede empeorar la alimentación de entrada, elevar contrapresión o alterar tensión. También puede mantener un punto de trabajo similar y aumentar la respuesta estructural. Ambos efectos pueden coexistir. Reducir el acoplamiento mecánico puede limitar la transmisión de vibraciones. Investigue también cómo las fluctuaciones de presión excitan tubos y carcasa. Diseñe el aislamiento para las conexiones, dimensiones y carga reales de Foreach y compárelo en el mismo punto de trabajo."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/diaphragm-pump-rd/es/03.svg",
            "alt": "Rutas entre la excitación y el sonido",
            "width": 1000,
            "height": 650,
            "caption": "Esquema de diagnóstico: la excitación mecánica e hidráulica puede generar ruido por varias rutas. Valídelas en el mismo punto de trabajo."
          }
        ]
      },
      {
        "title": "Un límite en decibelios requiere condiciones de ensayo",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La página 5 de las especificaciones chinas DPL30, DPL60 y DPL30H indica ruido ≤80 dB. Los documentos revisados no detallan distancia, ponderación frecuencial o temporal, ruido de fondo, montaje ni condición hidráulica asociados. [F1–F3]"
          },
          {
            "type": "paragraph",
            "text": "Conserve esa expresión: no la convierta en 80 dB(A) a 1 m ni prometa el mismo nivel dentro de cualquier instrumento. Un límite tampoco es el valor típico medido de cada unidad."
          },
          {
            "type": "paragraph",
            "text": "En desarrollo puede compararse presión sonora ponderada A en una posición acordada, conservando espectros o registros originales. La aceptación formal debe usar el método aplicable al proyecto. El nivel de presión sonora depende del punto y del campo acústico; el de potencia sonora describe la potencia emitida. Sus valores no son intercambiables. Registre ruido de fondo, reflexiones y ajustes de medición, manteniendo condiciones iguales para atribuir los cambios a la modificación de montaje o funcionamiento estudiada."
          },
          {
            "type": "table",
            "headers": [
              "Condición",
              "Mantener o registrar"
            ],
            "rows": [
              [
                "Bomba y accionamiento",
                "Modelo completo, motor, tensión, velocidad u orden"
              ],
              [
                "Punto hidráulico",
                "Temperatura, presiones, caudal medio y burbujas"
              ],
              [
                "Montaje",
                "Soporte, fijaciones, aisladores, apriete, abrazaderas y cables"
              ],
              [
                "Medición acústica",
                "Calibración, posición, ponderación, duración y fondo"
              ],
              [
                "Instrumento",
                "Carcasa abierta/cerrada, otros motores y ventiladores, estado térmico"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Un teléfono ayuda a comparar el carácter del sonido, pero la ganancia automática, supresión de ruido y respuesta del micrófono modifican la amplitud. Una grabación sin calibrar no demuestra una reducción en decibelios."
          }
        ]
      },
      {
        "title": "Incorporar el montaje por etapas",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Establezca una referencia repetible y añada progresivamente soporte definitivo, tubos y abrazaderas reales y carcasa. Sujetar una bomba suspendida con la mano no constituye una referencia adecuada: el agarre modifica la vibración. Use una fijación definida y documentada."
          },
          {
            "type": "paragraph",
            "text": "Mantenga el punto de trabajo. Si cambiar un tubo modifica presión o caudal, registre ese cambio en vez de atribuir toda diferencia acústica a la estructura."
          },
          {
            "type": "table",
            "headers": [
              "Resultado",
              "Revisar primero",
              "Comparación posterior"
            ],
            "rows": [
              [
                "Aumenta una banda al instalar el soporte",
                "Rigidez, fijación y modos estructurales",
                "Cambiar soporte o aislamiento y repetir"
              ],
              [
                "Abrazaderas o conexiones rígidas aumentan ruido",
                "Transmisión del tubo a la carcasa",
                "Aislar progresivamente las conexiones"
              ],
              [
                "Cerrar la carcasa modifica el sonido",
                "Radiación del panel, cavidad y acoplamientos",
                "Comparar vibración y espectro acústico"
              ],
              [
                "Aparecen más burbujas y cambia el ruido",
                "Entrada, fugas o liberación de gas",
                "Presión de entrada y estado visible"
              ],
              [
                "Velocidad o tensión inestables",
                "Fuente, orden o accionamiento",
                "Registrar señales eléctricas"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Modifique estructuras con la bomba parada. Repita con iguales posiciones y ajustes para distinguir cambios ambientales y de montaje."
          }
        ]
      },
      {
        "title": "Investigar resonancias variando la velocidad",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Si la configuración admite regulación, varíe la velocidad dentro de los límites autorizados y registre sonido, vibración, caudal y ambas presiones. Una banda estrecha de mayor ruido puede indicar excitación próxima a una respuesta estructural; descarte también cambios de válvulas o suministro."
          },
          {
            "type": "paragraph",
            "text": "Compare espectros con frecuencias de giro, ciclos de bombeo y control. La velocidad determina la frecuencia de una vuelta, pero los eventos de bombeo y pulsos de realimentación por revolución dependen del mecanismo y motor. No iguale frecuencia PWM, realimentación y pulsación del líquido."
          },
          {
            "type": "paragraph",
            "text": "Si un cambio de soporte desplaza la banda ruidosa manteniendo condiciones hidráulicas y eléctricas, hay fundamento para seguir investigando resonancia. La impresión auditiva por sí sola no la confirma."
          }
        ]
      },
      {
        "title": "Validar el aislamiento junto con la prestación",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Un aislador más blando no siempre mejora el resultado: importan rigidez, precarga, dirección de carga y frecuencia. Un movimiento excesivo puede fatigar conexiones y cables. Busque caminos rígidos alternativos, contacto con carcasa, tubos tensos o abrazaderas que reintroduzcan vibración."
          },
          {
            "type": "paragraph",
            "text": "DPL30 y DPL60 especifican tubo flexible de 3,2 mm interiores; DPL30H, tubo rígido de 6 × 4 mm y racor de compresión. No sustituya este último por una manguera corriente solo para reducir vibración. Un tubo flexible largo también cambia la hidráulica. [F1–F3]"
          },
          {
            "type": "paragraph",
            "text": "Ante excitación hidráulica, evalúe amortiguación y tubos adecuados; ante respuesta de paneles, soportes, aislamiento y tratamientos disipativos. Si añade material acústico o encierra la bomba, compruebe temperatura del motor, ventilación, visibilidad de fugas y mantenimiento. Retenga la mejora solo si sonido, caudal, temperatura y fiabilidad cumplen conjuntamente."
          }
        ]
      },
      {
        "title": "Comparar Foreach según la misma tarea",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Las versiones con y sin escobillas difieren en vida y control, pero sin escobillas no significa automáticamente menos ruido. Comparar DPL30 y DPL60 cada una a plena velocidad sin carga no identifica cuál conviene al instrumento."
          },
          {
            "type": "paragraph",
            "text": "Compare al mismo caudal requerido, contrapresión real, fluido y montaje; documente velocidades diferentes. La capacidad de presión de DPL30H no establece una ventaja acústica general. Registre fuente, vías, condiciones antes/después y cumplimiento de arranque, caudal y temperatura. Para consultar a Foreach, añada fotos, esquema hidráulico y punto de trabajo a los archivos de sonido."
          }
        ]
      },
      {
        "title": "Especificaciones y referencias",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Los parámetros de producto proceden de las especificaciones Foreach indicadas. Verifique los principios y ensayos propuestos para el modelo exacto y las condiciones reales."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00001_A04_cn_DPL30规格书.pdf",
                "label": "[F1] Foreach DPL30 especificación en chino (A04)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00002_A02_cn_DPL60规格书.pdf",
                "label": "[F2] Foreach DPL60 especificación en chino (A02)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2504-00001_A00_cn_DPL30H规格书.pdf",
                "label": "[F3] Foreach DPL30H especificación en chino (A00)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              }
            ]
          }
        ]
      },
      {
        "title": "Guías relacionadas de selección y validación",
        "blocks": [
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
                "label": "Autocebado y tiempo de arranque"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
                "label": "Medición y reducción de pulsaciones"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-backflow-check-valve/",
                "label": "Retorno al parar y diseño antisifón"
              },
              {
                "href": "/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
                "label": "Compatibilidad de materiales en contacto"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Curvas caudal-presión y punto de trabajo"
              },
              {
                "href": "/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/",
                "label": "Control de bombas sin escobillas de dos y cinco hilos"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Selección de bombas miniatura de diafragma para líquidos"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/",
                "label": "Gama de bombas miniatura de diafragma"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Preguntas frecuentes",
    "faqItems": [
      {
        "question": "¿Si solo hace ruido dentro de la carcasa, puede descartarse un problema de bomba?",
        "answer": "Todavía no. Compare presión, caudal, tensión y burbujas antes de separar excitación y amplificación del montaje."
      },
      {
        "question": "¿Un motor sin escobillas siempre reduce el ruido?",
        "answer": "No. También intervienen velocidad, cabezal, estructura y circuito."
      },
      {
        "question": "¿Solo hay que revisar los decibelios tras una mejora?",
        "answer": "Compruebe caudal, arranque, aumento de temperatura, conexiones y posibles tonos nuevos o efectos de arranque-parada."
      }
    ],
    "cta": {
      "title": "Consulte la selección de su bomba para líquidos",
      "description": "Indique el fluido, caudal necesario, presiones, tuberías y condiciones de arranque y parada para definir modelo, materiales y validación.",
      "contactLabel": "Contactar con soporte técnico",
      "productsLabel": "Ver bombas miniatura para líquidos",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "miniature-diaphragm-pump-backflow-check-valve": {
    "metadata": {
      "title": "Retorno de líquido al parar una microbomba de diafragma: válvulas antirretorno y diseño antisifón",
      "seoTitle": "Retorno al parar una bomba de diafragma y efecto sifón | Foreach Technology",
      "seoDescription": "Distinga el flujo inverso después de la parada del sifonado directo y el goteo residual. Evalúe apertura y cierre de válvulas, secuencia de control y estanqueidad estática en el circuito completo.",
      "coverImage": "/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-2-wire-real-product-photo.webp",
      "coverAlt": "Fotografía de la bomba miniatura de diafragma para líquidos Foreach DPL30 sin escobillas de dos hilos"
    },
    "deck": "Distinga el flujo inverso después de la parada del sifonado directo y el goteo residual. Evalúe apertura y cierre de válvulas, secuencia de control y estanqueidad estática en el circuito completo.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Ante un aparente retorno, confirme primero que el líquido se desplaza hacia la entrada e identifique el origen de la presión inversa. Después decida si necesita una válvula antirretorno adicional. Si sigue fluyendo en la dirección de bombeo, revise gravedad o sifonado; si solo gotea brevemente, examine presión residual y volumen final."
      },
      {
        "type": "paragraph",
        "text": "Dirección, duración y presión motriz determinan la solución. Añadir una válvula corriente a todos estos casos puede no resolverlos e introducir resistencia o dificultades de arranque."
      }
    ],
    "sections": [
      {
        "title": "Parar el motor no elimina presión ni líquido almacenado",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La parada termina el bombeo activo, pero no elimina inmediatamente desniveles, presión de depósitos, gas comprimido o deformación elástica. Un tubo presurizado o amortiguador puede seguir liberando líquido hacia la salida."
          },
          {
            "type": "paragraph",
            "text": "Las válvulas del cabezal dirigen aspiración y descarga; no son automáticamente válvulas de corte validadas. Sin datos de estanqueidad estática, presión de apertura y fuga no puede afirmarse aislamiento hermético. Evalúe por separado presión de apertura, capacidad de flujo directo y fuga interna con la válvula cerrada; ninguna sustituye a las demás."
          },
          {
            "type": "paragraph",
            "text": "Las especificaciones DPL30, DPL60 y DPL30H no establecen un umbral de flujo directo en reposo, fuga inversa estática o volumen posterior a la parada suficientes para prometer corte. Defina y ensaye estas prestaciones en el instrumento. [F1–F3]"
          }
        ]
      },
      {
        "title": "Distinguir retorno, sifonado y goteo",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Observación",
              "Mecanismo posible",
              "Comprobación útil"
            ],
            "rows": [
              [
                "Goteo breve que termina",
                "Líquido final, recuperación del tubo, amortiguador o gas",
                "Baja la presión y el volumen adicional se estabiliza"
              ],
              [
                "Flujo continuo en dirección original",
                "Desnivel o presión del recipiente; posible sifón",
                "Cambia al modificar niveles o presión"
              ],
              [
                "Líquido retrocede hacia el depósito",
                "Presión aguas abajo, gravedad inversa o fuga de válvula",
                "Medir flujo inverso y presión; excluir redistribución elástica"
              ],
              [
                "Pocas gotas se desprenden de la boquilla",
                "Humectación, tensión superficial y retención",
                "Presión anterior estable; origen en el extremo"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Son categorías de diagnóstico, no prueba de un fallo concreto. La descarga residual puede combinar varias causas; un pequeño retroceso puede redistribuir volumen elástico sin representar fuga inversa a través de la bomba."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/diaphragm-pump-rd/es/04.svg",
            "alt": "Volumen acumulado después de parar",
            "width": 1000,
            "height": 650,
            "caption": "Esquema conceptual: una meseta puede indicar liberación de un volumen finito; un aumento continuo requiere comprobar la presión motriz restante. Registre el flujo inverso por separado."
          }
        ]
      },
      {
        "title": "Por qué una válvula antirretorno puede no impedir un sifón directo",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Si hay presión o altura suficiente aguas arriba y una columna continua, el líquido puede seguir en la dirección de bombeo. Si el tubo pasa por un punto alto y descarga más abajo, evalúe continuidad del sifón, presión en el punto alto y aire retenido."
          },
          {
            "type": "paragraph",
            "text": "Como ejemplo, con agua, ambos extremos a presión atmosférica y descarga libre, una superficie de origen 0,5 m sobre la salida genera unos 4,9 kPa estáticos. Se calcula con densidad aproximada 1000 kg/m³ y gravedad 9,81 m/s², antes de descontar pérdidas; no es un parámetro de apertura o sellado Foreach. Si la salida está sumergida, utilice el nivel libre del recipiente receptor y las presiones de ambos espacios de gas."
          },
          {
            "type": "paragraph",
            "text": "La dirección libre de la válvula suele coincidir con el bombeo. Si la presión residual la mantiene abierta, el flujo continúa. Además de apertura, examine presión de reasiento, histéresis, influencia de presión de salida y fuga cerrada. Un solo valor nominal no basta."
          },
          {
            "type": "paragraph",
            "text": "Puede evaluarse cambiar la posición de depósito o salida, usar un dispositivo antisifón/de contrapresión adecuado o una válvula de corte controlada. En un dispositivo antisifón o de contrapresión cargado por muelle, compruebe apertura, cierre, precarga y pérdida real de presión al caudal requerido. Confirme compatibilidad química, presión admisible y conexiones del circuito completo."
          }
        ]
      },
      {
        "title": "Tratar el goteo residual por separado",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Si el volumen acumulado alcanza una meseta, revise presión al parar, elasticidad de tubos, gas, amortiguador y volumen entre cierre y boquilla. Tubos elásticos y gas comprimido almacenan energía; por ello, amortiguar pulsaciones puede prolongar la descarga tras parar."
          },
          {
            "type": "paragraph",
            "text": "Una válvula cerrada lejos aguas arriba no retiene todo el líquido ya situado después de ella. Para límites estrictos de goteo, evalúe corte cerca de la salida y secuencia válvula-bomba, incluyendo retención, limpieza y mantenimiento. La retracción necesita una hidráulica o actuador que la permita; una entrada de inversión del motor no demuestra bombeo líquido reversible."
          },
          {
            "type": "paragraph",
            "text": "Para flujo realmente inverso, localice primero la presión que lo impulsa y evalúe después sellado y válvulas adicionales. Partículas, cristales, incompatibilidad o deformación prolongada pueden modificar el contacto. Verifíquelo con comparaciones de limpieza, fluido y vida útil, sin atribuirlo automáticamente a un material."
          }
        ]
      },
      {
        "title": "Recalcular el punto de funcionamiento",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Una válvula añadida consume capacidad de presión diferencial. Use la curva de pérdida de carga al caudal y fluido reales y confirme apertura/cierre. Si la curva ya incluye la pérdida total con válvula abierta, no vuelva a sumar su presión nominal de apertura."
          },
          {
            "type": "paragraph",
            "text": "DPL30 y DPL60 especifican 100 kPa; DPL30H, 600 kPa. No combine estas presiones con el caudal sin carga como si fueran simultáneos. [F1–F3] Tras añadir contrapresión, compruebe caudal a la presión objetivo y repita cebado y nivel mínimo."
          },
          {
            "type": "paragraph",
            "text": "Coordine órdenes de bomba y válvula: cerrar aguas abajo con la bomba en marcha puede elevar rápidamente la presión. Limite el bloqueo anormal y disponga la protección necesaria según el componente de menor presión admisible del circuito, no solo la bomba. Evalúe también presión residual y cambios térmicos en líquido atrapado entre dos cierres."
          }
        ]
      },
      {
        "title": "Incluir la parada en la validación",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Use la geometría final real, alcance el estado de funcionamiento definido y dispare parada y registro con el mismo evento. Conserve presión, tensión o habilitación, señal de válvula y volumen recogido. Para retorno use instrumento bidireccional adecuado o un método definido y contrastado de volumen de columna."
          },
          {
            "type": "table",
            "headers": [
              "Ensayo",
              "Condiciones",
              "Resultado"
            ],
            "rows": [
              [
                "Flujo directo en reposo",
                "Máximo nivel de origen, mínima salida y presiones de depósitos",
                "Continuidad del flujo y presión motriz"
              ],
              [
                "Descarga residual",
                "Contrapresiones, tubos y amortiguadores distintos",
                "Volumen acumulado y tiempo de finalización"
              ],
              [
                "Sellado inverso",
                "Presiones inversas bajas y altas posibles",
                "Volumen inverso durante la espera definida"
              ],
              [
                "Rearranque",
                "Paradas breves, habituales y prolongadas",
                "Recuperación, burbujas y primera entrega"
              ],
              [
                "Después de durabilidad",
                "Fluido, limpieza y etapas de vida requeridas",
                "Cambios en fuga, descarga y arranque"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Espere la redistribución breve de presión y volumen antes de interpretar fuga persistente. Calibre el volumen de gota o pese: boquilla y fluido cambian su tamaño. Los intervalos y volúmenes admisibles proceden de la tarea del instrumento, no de una afirmación antirretorno sin definir."
          }
        ]
      },
      {
        "title": "Definir la función en reposo para seleccionar Foreach",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Facilite posición de depósito y salida, cierre de recipientes, contrapresión en reposo, válvulas y boquilla, espera máxima y volúmenes residual/inverso permitidos, además del caudal normal. Los parámetros estándar delimitan candidatos; el control de parada se valida con circuito y secuencia reales."
          },
          {
            "type": "paragraph",
            "text": "Si se requiere aislamiento, asigne esa función a un componente o sistema validado. Así evita dar por probado el corte de las válvulas del cabezal o añadir resistencia sin resolver el problema final."
          }
        ]
      },
      {
        "title": "Especificaciones y referencias",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Los parámetros de producto proceden de las especificaciones Foreach indicadas. Verifique los principios y ensayos propuestos para el modelo exacto y las condiciones reales."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00001_A04_cn_DPL30规格书.pdf",
                "label": "[F1] Foreach DPL30 especificación en chino (A04)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2412-00002_A02_cn_DPL60规格书.pdf",
                "label": "[F2] Foreach DPL60 especificación en chino (A02)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              },
              {
                "href": "/downloads/resources/datasheets/zh-CN/Pumps/PS-150B-2504-00001_A00_cn_DPL30H规格书.pdf",
                "label": "[F3] Foreach DPL30H especificación en chino (A00)",
                "suffix": "pp. 5–6: prestaciones y configuración; pp. 3–4: montaje"
              }
            ]
          }
        ]
      },
      {
        "title": "Guías relacionadas de selección y validación",
        "blocks": [
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
                "label": "Autocebado y tiempo de arranque"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
                "label": "Medición y reducción de pulsaciones"
              },
              {
                "href": "/resources/technical-articles/miniature-diaphragm-pump-noise-vibration-reduction/",
                "label": "Reducción de ruido y vibraciones"
              },
              {
                "href": "/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
                "label": "Compatibilidad de materiales en contacto"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Curvas caudal-presión y punto de trabajo"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Selección de bombas miniatura de diafragma para líquidos"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/",
                "label": "Gama de bombas miniatura de diafragma"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Preguntas frecuentes",
    "faqItems": [
      {
        "question": "¿Una válvula puede impedir a la vez sifonado y retorno?",
        "answer": "No necesariamente. Normalmente limita el flujo inverso; para el directo deben comprobarse presión motriz, apertura y reasiento."
      },
      {
        "question": "¿DPL30H reducirá el goteo?",
        "answer": "Más capacidad de presión no significa mejor sellado estático. Diagnostique el origen y evalúe válvulas y tubos."
      },
      {
        "question": "¿Un pequeño volumen residual indica avería?",
        "answer": "No. Puede proceder del extremo o de la liberación de presión. Júzguelo en el intervalo definido según la aplicación."
      }
    ],
    "cta": {
      "title": "Consulte la selección de su bomba para líquidos",
      "description": "Indique el fluido, caudal necesario, presiones, tuberías y condiciones de arranque y parada para definir modelo, materiales y validación.",
      "contactLabel": "Contactar con soporte técnico",
      "productsLabel": "Ver bombas miniatura para líquidos",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  }
} satisfies Record<string, DiaphragmPumpEngineeringArticleCopy>;
