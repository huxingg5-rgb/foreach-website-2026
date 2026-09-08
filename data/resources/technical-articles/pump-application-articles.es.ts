import type { PumpApplicationArticleCopy, PumpApplicationArticleSlug } from "./pump-application-articles.types";

export const pumpApplicationArticlesEs = {
  "clinical-chemistry-piston-pump-100-250-500-ul-selection": {
    "metadata": {
      "title": "Selección de una bomba de pistón de 100, 250 o 500 μL para dosificación en química clínica",
      "seoTitle": "Bombas de pistón de 100, 250 o 500 μL para química clínica | FOREACH",
      "seoDescription": "Compare el volumen por dosis, el aprovechamiento de la carrera, el número de dispensaciones y los tiempos de recarga; después evalúe las configuraciones FOREACH EA, SM y TM con el circuito real del analizador.",
      "coverImage": "/images/resources/technical-articles/pump-application-guides/piston-capacity-series.png",
      "coverAlt": "Bombas de pistón FOREACH de distintas capacidades, incluidas 100, 250 y 500 μL"
    },
    "deck": "Compare el volumen por dosis, el aprovechamiento de la carrera, el número de dispensaciones y los tiempos de recarga; después evalúe las configuraciones FOREACH EA, SM y TM con el circuito real del analizador.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Para seleccionar una bomba de pistón para química clínica, identifique primero la función del circuito: dispensación directa de reactivo, dosificación de muestra, adición de diluyente o accionamiento de una punta de muestreo mediante líquido de sistema. Los valores de 100, 250 y 500 μL indican capacidades nominales. La decisión depende del volumen realmente entregado por dosis, de cuántas dosis deben dispensarse después de una aspiración y del tiempo disponible para completar la secuencia."
      }
    ],
    "sections": [
      {
        "title": "1. Convierta la tarea de dosificación en datos concretos",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Si el reactivo atraviesa la cámara de bombeo, la compatibilidad debe abarcar cabezal, pistón, juntas y válvulas. Cuando el líquido de sistema impulsa la muestra en la punta, también deben comprobarse la interfaz entre líquidos, la muestra residual y la transferencia completa. Por ello, volúmenes programados similares pueden exigir circuitos en contacto con el líquido y métodos de verificación distintos."
          },
          {
            "type": "table",
            "headers": [
              "Dato de entrada",
              "Qué especificar",
              "Decisión que permite tomar"
            ],
            "rows": [
              [
                "Volúmenes por dosis",
                "Volumen mínimo, habitual y máximo realmente entregado, en μL",
                "Intervalo de carrera de trabajo y puntos de ensayo"
              ],
              [
                "Secuencia de dispensación",
                "Dosis por aspiración; volúmenes iguales o variables",
                "Balance de capacidad y número de aspiraciones"
              ],
              [
                "Tiempo disponible",
                "Aspiración, conmutación de válvulas, dispensación, estabilización y recarga",
                "Viabilidad del ciclo completo"
              ],
              [
                "Circuito de líquido",
                "Composición, temperatura, niveles, contrapresión, válvulas y punta",
                "Materiales y entrega real"
              ],
              [
                "Integración",
                "CAD de la capacidad elegida, conexiones, cables y requisitos del accionamiento",
                "Selección de serie y configuración"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Defina por completo la tarea antes de ordenar las capacidades candidatas. El nombre de un sector no determina el tamaño de la bomba, y los distintos canales de dosificación de un mismo instrumento no tienen por qué utilizar igual capacidad."
          }
        ]
      },
      {
        "title": "2. Una orden de 20 μL utiliza fracciones diferentes de la carrera",
        "blocks": [
          {
            "type": "formula",
            "expression": "Aprovechamiento de la carrera ≈ volumen de dosis programado / capacidad correspondiente a la carrera completa",
            "note": "Comparación inicial válida cuando desplazamiento y volumen son aproximadamente lineales y las definiciones de orden y carrera útil son coherentes. No predice la exactitud del volumen entregado."
          },
          {
            "type": "table",
            "headers": [
              "Orden hipotética de 20 μL",
              "Capacidad de 100 μL",
              "Capacidad de 250 μL",
              "Capacidad de 500 μL"
            ],
            "rows": [
              [
                "Aprovechamiento nominal de la carrera",
                "20%",
                "8%",
                "4%"
              ],
              [
                "Aspectos que verificar",
                "Entrega real de 20 μL y duración del ciclo",
                "Entrega con carrera corta y dispensación repetida",
                "Entrega con carrera aún menor, ventaja de recarga y espacio"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Estos porcentajes solo describen el intervalo de movimiento. No demuestran que la bomba de 100 μL sea más exacta ni permiten aplicar una especificación de exactitud a carrera completa a una carrera del 4%. Influyen la transmisión, la sincronización de válvulas, las burbujas, la elasticidad de los tubos, las velocidades de aspiración y dispensación y la punta de entrega. La resolución de la orden y el volumen nominal por paso no determinan una dosis mínima fiable."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/piston-pump-accuracy-repeatability-resolution/",
                "label": "Diferencias entre exactitud, repetibilidad y resolución"
              }
            ]
          }
        ]
      },
      {
        "title": "3. Incluya las dosis repetidas y el volumen de reserva",
        "blocks": [
          {
            "type": "formula",
            "expression": "n = floor((Vusable − Vreserve) / Vdose)",
            "note": "Para dosis iguales, n estima inicialmente las dispensaciones completas por aspiración. Vusable es el volumen aspirado utilizable confirmado, Vreserve la reserva del proceso y Vdose la dosis programada. Vusable debe ser al menos igual a Vreserve y Vdose debe ser positivo. floor indica redondeo al entero inferior."
          },
          {
            "type": "notice",
            "text": "Ejemplo exclusivamente aritmético: dispensar 20 μL en cada una de ocho cubetas, reservar 10 μL después de cada aspiración y suponer provisionalmente que el volumen aspirado utilizable coincide con la capacidad nominal. La reserva de 10 μL no es una especificación general de FOREACH. Confirme la carrera útil, el cebado y la reserva necesarios en el circuito real.",
            "label": "Supuestos del ejemplo"
          },
          {
            "type": "table",
            "headers": [
              "Capacidad candidata",
              "Dosis completas por aspiración",
              "Aspiraciones para ocho cubetas",
              "Recargas después de la aspiración inicial"
            ],
            "rows": [
              [
                "100 μL",
                "4",
                "2",
                "1"
              ],
              [
                "250 μL",
                "12",
                "1",
                "0"
              ],
              [
                "500 μL",
                "24",
                "1",
                "0"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Tanto 250 como 500 μL cubren el balance supuesto de ocho cubetas sin otra recarga. Aumentar la capacidad a partir de ahí no reduce las recargas de este lote. Compare después el rendimiento real de las dosis, el espacio y los requisitos de cambio de líquido. Si difieren el volumen útil o las dosis, recalcule las órdenes individuales."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/pump-application-guides/piston-cycle-es.webp",
            "alt": "Depósito, válvula de conmutación y bomba de pistón que dispensa en varias cubetas",
            "width": 1200,
            "height": 500,
            "caption": "Esquema del circuito y de la secuencia. Utilice la configuración real de válvulas y accionamiento; el dibujo no implica que un modelo concreto incorpore esos accesorios."
          }
        ]
      },
      {
        "title": "4. Compare la secuencia completa, además de la velocidad de dispensación",
        "blocks": [
          {
            "type": "formula",
            "expression": "Tlote = Σ(Taspiración + Tválvula + Tdispensación + Testabilización + Tmovimiento y otras acciones necesarias)",
            "note": "Cuente cada acción tal como ocurre realmente. Si se solapan acciones, determine la ruta crítica a partir de la secuencia de control, sin sumar dos veces los tiempos simultáneos."
          },
          {
            "type": "paragraph",
            "text": "Evitar una recarga solo ahorra tiempo si esta limita la ruta crítica. Un instrumento que aspira mientras se mueve otro mecanismo difiere de uno que detiene la dosificación para recargar. Una bomba mayor también puede modificar el recorrido de aspiración, las conexiones y las limitaciones de instalación."
          },
          {
            "type": "list",
            "items": [
              "Mantenga constantes el tamaño del lote, las dosis y el líquido, y conserve el registro completo de órdenes.",
              "Distinga la primera dispensación, la primera tras una recarga, las intermedias y la última.",
              "Compruebe el volumen entregado antes de comparar la duración del ciclo.",
              "Al aumentar la velocidad, observe las burbujas, la respuesta de las válvulas y el final de la entrega. La finalización de la orden del motor no demuestra que todo el líquido haya llegado a la cubeta."
            ]
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/piston-pump-acceleration-deceleration-curves/",
                "label": "Aceleración y desaceleración en bombas de pistón"
              },
              {
                "href": "/resources/technical-articles/precision-piston-pump-backlash-compensation/",
                "label": "Inversión del movimiento y compensación de holgura"
              }
            ]
          }
        ]
      },
      {
        "title": "5. Compare las configuraciones reales EA, SM y TM",
        "blocks": [
          {
            "type": "paragraph",
            "text": "La información de las series FOREACH incluye opciones de 100, 250 y 500 μL en EA, SM y TM. Distinga el posicionamiento de cada serie de las capacidades de una configuración particular. Igual capacidad nominal no implica iguales dimensiones, materiales, conexiones, requisitos de accionamiento ni condiciones de rendimiento."
          },
          {
            "type": "table",
            "headers": [
              "Serie",
              "Comparación principal en esta etapa",
              "Información que confirmar"
            ],
            "rows": [
              [
                "Bomba de pistón de precisión EA",
                "Adaptación de una plataforma de amplio rango de capacidades a la función del canal",
                "Plano de la capacidad concreta, materiales, conexiones y control"
              ],
              [
                "Bomba de pistón miniatura SM",
                "Distribución de bomba, válvula, tubos y cables en un instrumento compacto",
                "Envolvente completa de instalación y rendimiento con la dosis de trabajo"
              ],
              [
                "Bomba de pistón ultracompacta TM",
                "Integración cuando el espacio es aún más limitado",
                "Plano del modelo; cabezal de PMMA y pistón cerámico en la configuración mostrada, con otras configuraciones evaluadas por separado"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "La información de EA y SM incluye conexiones de líquido 1/4-28 UNF o M6; las configuraciones TM mostradas utilizan 6-40 UNF. Confirme el plano real y reserve espacio para los racores, las curvas de los tubos y el mantenimiento. Las métricas EA a carrera completa, la información de repetibilidad SM y la validación específica de TM no deben combinarse en una única promesa para las tres series."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/piston-pump/standard-piston-pump/",
                "label": "Bombas de pistón de precisión EA"
              },
              {
                "href": "/products/pumps/piston-pump/miniature-piston-pump/",
                "label": "Bombas de pistón miniatura SM"
              },
              {
                "href": "/products/pumps/piston-pump/ultra-compact-piston-pump/",
                "label": "Bombas de pistón ultracompactas TM"
              },
              {
                "href": "/resources/technical-articles/piston-pump-head-material-selection/",
                "label": "Selección de materiales del cabezal y de todo el circuito en contacto con el líquido"
              }
            ]
          }
        ]
      },
      {
        "title": "6. Verifique las dosis de trabajo, además de la carrera completa",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Incluya las dosis mínima, habitual y máxima realmente utilizadas y los estados operativos que puedan modificar la entrega. Elija el número de repeticiones y los criterios de aceptación según los requisitos del instrumento y el objetivo de verificación; un artículo general no sustituye el plan de aceptación del proyecto."
          },
          {
            "type": "table",
            "headers": [
              "Grupo de registros",
              "Qué conservar"
            ],
            "rows": [
              [
                "Muestra y circuito",
                "Modelo, configuración, identificador de muestra, válvula, punta, tubos, niveles y contrapresión"
              ],
              [
                "Líquido y medición",
                "Medio real, temperatura, densidad, instrumento, método e incertidumbre"
              ],
              [
                "Condiciones de las órdenes",
                "Dosis o pasos, velocidades, tiempos de válvulas, estabilización y tiempo de espera"
              ],
              [
                "Resultados originales",
                "Masas o volúmenes individuales, identificación de primera dosis/recarga/régimen estable y anomalías"
              ],
              [
                "Aceptación",
                "Exactitud, repetibilidad, tiempo de entrega, comportamiento de la punta y fundamento de cada criterio"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "El ensayo gravimétrico requiere conocer la densidad a la temperatura del líquido y controlar evaporación, gotas retenidas y pérdidas de transferencia. Un procedimiento formal debe evaluar también efectos como las correcciones por empuje del aire y la incertidumbre de medida. Dividir una lectura de masa por la densidad no constituye, por sí solo, un procedimiento completo de calibración."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "https://www.nist.gov/publications/nistir-7383-selected-procedures-volumetric-calibrations-2019-ed",
                "label": "Fundamento del método: procedimientos NIST de calibración volumétrica; no certifican el rendimiento microlítrico de esta bomba"
              }
            ]
          }
        ]
      },
      {
        "title": "7. Documente una selección justificada",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Indique las dosis y los tiempos requeridos, por qué se retuvo esa capacidad, por qué se eligieron la serie y los materiales, qué condiciones se ensayaron y qué queda sin verificar. En el ejemplo aritmético anterior, 250 μL es una capacidad candidata para reducir recargas. No es una recomendación final para un analizador de química clínica real."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/products/pumps/piston-pump/",
                "label": "Consulte los productos y series de bombas de pistón FOREACH"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Preguntas frecuentes",
    "faqItems": [
      {
        "question": "¿Por qué no elegir siempre 500 μL?",
        "answer": "Si 250 μL ya cubren las dosis repetidas necesarias, 500 μL quizá no eliminen ninguna recarga adicional. Compare el rendimiento real con dosis pequeñas, los tiempos, la instalación y los requisitos de cambio de líquido."
      },
      {
        "question": "¿Una bomba de 100 μL solo puede dispensar 100 μL cada vez?",
        "answer": "No. La capacidad nominal y el volumen por dosis son distintos. El intervalo de dosis utilizable depende de las órdenes, la carrera efectiva y la verificación de la entrega real."
      },
      {
        "question": "¿Puede utilizarse en el firmware la reserva de 10 μL del ejemplo?",
        "answer": "No sin verificarla. Es un valor ilustrativo del balance, no un requisito del producto. El cebado, la carrera útil, los circuitos de válvulas y la estrategia de dispensación determinan la reserva real."
      },
      {
        "question": "¿Son intercambiables las bombas EA, SM y TM de igual capacidad?",
        "answer": "La capacidad por sí sola no demuestra intercambiabilidad. Verifique planos, conexiones, materiales, disposición de válvulas y accionamiento, y rendimiento con la dosis y los tiempos reales."
      },
      {
        "question": "¿Qué puede hacerse antes del ensayo con reactivo real?",
        "answer": "Utilice especificaciones formales y cálculos con supuestos explícitos para preseleccionar candidatos y preparar el circuito de ensayo. La compatibilidad con el medio real y el rendimiento de entrega siguen requiriendo verificación."
      }
    ],
    "cta": {
      "title": "Convierta sus condiciones de trabajo en una especificación de bomba verificable",
      "description": "Comparta el líquido, el volumen o caudal objetivo, los tiempos, el circuito y las limitaciones de instalación para evaluar la configuración de la bomba y el método de verificación.",
      "contactLabel": "Contactar con soporte técnico",
      "productsLabel": "Explorar productos relacionados",
      "productsHref": "/products/pumps/piston-pump/"
    }
  },
  "diaphragm-pump-multiple-wash-nozzles-flow-balance": {
    "metadata": {
      "title": "¿Por qué varias boquillas de lavado reciben caudales distintos de una sola bomba de diafragma miniatura?",
      "seoTitle": "Varias boquillas de lavado: equilibrado de caudal con bomba de diafragma | FOREACH",
      "seoDescription": "Calcule la demanda a partir del volumen y el tiempo de cada boquilla, distinga una entrega total insuficiente de un reparto desigual y verifique cada ramal mediante recogida de líquido y mediciones de presión.",
      "coverImage": "/images/resources/technical-articles/pump-application-guides/dpl60-brushless-side-photo.jpg",
      "coverAlt": "Vista lateral de una bomba de diafragma miniatura FOREACH DPL60 con el cabezal y las conexiones de líquido"
    },
    "deck": "Calcule la demanda a partir del volumen y el tiempo de cada boquilla, distinga una entrega total insuficiente de un reparto desigual y verifique cada ramal mediante recogida de líquido y mediciones de presión.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Una bomba y un colector no garantizan la misma entrega en todas las boquillas de lavado. Un analizador de química clínica u otro instrumento con circuitos de lavado en paralelo necesita dos comprobaciones: caudal total suficiente a la presión de trabajo real y entrega aceptable en cada ramal. Medir solo el caudal total puede ocultar una boquilla insuficientemente alimentada. Todos los ejemplos numéricos siguientes son cálculos hipotéticos, no resultados medidos del producto."
      }
    ],
    "sections": [
      {
        "title": "1. Defina la tarea de lavado de cada boquilla",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Sustituya la petición general de una bomba de lavado por requisitos medibles: número de boquillas simultáneas, volumen por boquilla, tiempo de apertura de válvulas, posibilidad de llenado previo y criterios de aceptación del primer ciclo y los posteriores. El funcionamiento secuencial modifica tanto la demanda máxima de caudal como el tiempo para completar un lote."
          },
          {
            "type": "table",
            "headers": [
              "Dato necesario",
              "Por qué importa",
              "Qué registrar"
            ],
            "rows": [
              [
                "Volumen y tolerancia por boquilla",
                "Fija la entrega exigida a cada ramal",
                "Volúmenes recogidos individualmente, además del promedio"
              ],
              [
                "Tiempo efectivo de entrega",
                "El cebado, el arranque y los retrasos de válvulas consumen tiempo",
                "Retraso entre la orden y la salida real de líquido"
              ],
              [
                "Número de ramales abiertos",
                "Determina la demanda simultánea máxima",
                "Simultaneidad habitual y máxima"
              ],
              [
                "Líquido, temperatura y circuito",
                "Afectan la resistencia, la compatibilidad y el punto de trabajo",
                "Lote de líquido, temperatura, diámetro interior, longitud y componentes"
              ]
            ]
          }
        ]
      },
      {
        "title": "2. Calcule la demanda total a partir de las entregas individuales",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Suponga cuatro boquillas funcionando simultáneamente, cada una con una entrega de 3 mL en dos segundos efectivos. Cada ramal necesita un caudal medio de 90 mL/min y el total es 360 mL/min. Si esos dos segundos solo representan la ventana de orden del controlador, reste los intervalos sin entrega útil antes de calcular el requisito."
          },
          {
            "type": "formula",
            "expression": "Qᵢ = 60 × Vᵢ / tᵢ; Qtotal = ΣQᵢ",
            "note": "Con V en mL y t en segundos, Q se obtiene en mL/min. Sume los ramales activos simultáneamente; el ejemplo no incluye un caudal independiente de derivación o retorno."
          },
          {
            "type": "paragraph",
            "text": "Las guías FOREACH DPL30 y DPL60 describen clases de caudal de 300 y 600 mL/min respectivamente. El valor nominal DPL30 no demuestra capacidad para esta tarea hipotética de 360 mL/min. DPL60 es un candidato que evaluar: sus 600 mL/min no equivalen automáticamente al caudal disponible a través de los tubos, válvulas y boquillas instalados. Confirme el punto de trabajo con la tensión, el líquido, las condiciones de entrada y la presión de salida requeridos."
          },
          {
            "type": "notice",
            "text": "Los 360 mL/min proceden de una tarea de lavado supuesta. No son la especificación de un analizador concreto ni una recomendación universal para sistemas de lavado en paralelo."
          }
        ]
      },
      {
        "title": "3. Un caudal total suficiente no demuestra un reparto uniforme",
        "blocks": [
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/pump-application-guides/wash-branches-es.webp",
            "alt": "Una bomba alimenta un colector y varios tubos y boquillas descargan en recipientes de recogida medidos individualmente",
            "width": 1200,
            "height": 500,
            "caption": "Esquema conceptual: verifique por separado el suministro total y la entrega individual. El dibujo no especifica dimensiones reales de tubos ni prestaciones de un producto."
          },
          {
            "type": "paragraph",
            "text": "Para flujo estacionario aproximadamente incompresible, sin derivaciones ni almacenamiento significativo de líquido, el caudal total es la suma de los ramales. Cada ramal sigue respondiendo a su propia diferencia de presión efectiva y resistencia. Aproximar una presión común solo resulta útil si las presiones de alimentación del colector, las presiones de salida y las cotas son suficientemente similares."
          },
          {
            "type": "paragraph",
            "text": "El tubo común y la entrada del colector transportan el caudal total; cada tubo posterior transporta solo su caudal de ramal. Aplicar el caudal total al cálculo de todos los ramales sobrestima sus pérdidas. Aplicar el caudal de un ramal al tubo común subestima las pérdidas compartidas."
          },
          {
            "type": "table",
            "headers": [
              "Origen de la diferencia",
              "Observación posible",
              "Dónde revisar"
            ],
            "rows": [
              [
                "Diámetro interior, longitud o deformación del tubo",
                "Un ramal permanece sistemáticamente bajo",
                "Tolerancias, profundidad de inserción, curvas y zonas aplastadas"
              ],
              [
                "Diferencias entre boquillas o válvulas",
                "El caudal bajo cambia de posición al intercambiar un componente",
                "Orificio de boquilla, suciedad, apertura de válvula y sincronización"
              ],
              [
                "Cota de salida o inmersión",
                "El reparto cambia al modificar la instalación",
                "Altura e inmersión de boquillas y presión del recipiente receptor"
              ],
              [
                "Burbujas o almacenamiento elástico",
                "El primer ciclo difiere de los posteriores",
                "Gas atrapado, dilatación de tubos y estado de cebado"
              ]
            ]
          }
        ]
      },
      {
        "title": "4. Utilice la sensibilidad al diámetro como modelo de diagnóstico",
        "blocks": [
          {
            "type": "formula",
            "expression": "ΔP = 128 μ L Q / (π d⁴)",
            "note": "Para flujo laminar estacionario y completamente desarrollado de un líquido newtoniano en un tubo recto rígido de sección circular. μ es la viscosidad dinámica, L la longitud y d el diámetro interior. Con unidades SI coherentes, la pérdida de presión se expresa en Pa."
          },
          {
            "type": "paragraph",
            "text": "En un tramo ideal idéntico en todo lo demás, reducir el diámetro interior un 10% aumenta la resistencia aproximadamente 1/0.9⁴ = 1.52 veces. A igual diferencia de presión, el caudal pasa a aproximadamente 0.9⁴ = 65.6% del original. Este cálculo describe la sensibilidad de un tramo idealizado; no predice una reducción del 34.4% para todo el sistema de bombeo."
          },
          {
            "type": "paragraph",
            "text": "El circuito instalado también incluye orificios de boquilla, racores, válvulas, filtros y flujo pulsante. Los orificios cortos, el flujo en desarrollo, la turbulencia o los tubos muy deformables requieren modelos adecuados o datos del componente. Utilice curvas de pérdida de presión disponibles y verifique el montaje real. Los cambios en la red también pueden desplazar el punto de trabajo de la bomba."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "https://openstax.org/books/college-physics/pages/12-4-viscosity-and-laminar-flow-poiseuilles-law",
                "label": "Referencia física: OpenStax sobre viscosidad, flujo laminar y ley de Poiseuille"
              }
            ]
          }
        ]
      },
      {
        "title": "5. Mida el total y cada ramal en un mismo ensayo",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Cebe el sistema según el diseño. Fije líquido, temperatura, tensión de alimentación, nivel del depósito, altura de instalación y tubos. Identifique cada boquilla y recipiente.",
              "Recoja el líquido de cada ramal durante la secuencia de control real. Calcule Qᵢ = Vᵢ/t cuando sea útil; en un pulso corto de lavado, la magnitud principal es el volumen entregado por evento.",
              "Registre la presión de entrada, salida o colector, indicando posiciones de sensores, rangos y frecuencias de muestreo. Un promedio lento puede ocultar los transitorios de apertura.",
              "Compare la suma recogida en los ramales con la entrega total durante la misma ventana. Contabilice por separado derivación, retorno, fugas y variaciones del líquido almacenado.",
              "Evalúe por separado arranque, funcionamiento repetido y simultaneidad máxima. Antes del ensayo, defina repeticiones y límites de aceptación a partir de los requisitos de lavado del instrumento."
            ]
          },
          {
            "type": "paragraph",
            "text": "Si la entrega total cumple pero un ramal falla, investigue el reparto y los tiempos. Si todos son bajos, utilice las presiones para distinguir suministro insuficiente, pérdidas en el tramo común, limitaciones de entrada o problemas eléctricos. Al intercambiar una boquilla o un tubo sospechoso, cambie un solo factor y observe si la desviación sigue al componente."
          }
        ]
      },
      {
        "title": "6. Compare los cambios considerando tiempos y presión",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Modificación",
              "Ventaja posible",
              "Qué volver a verificar"
            ],
            "rows": [
              [
                "Uniformar dimensiones y montaje de ramales",
                "Reduce diferencias de fabricación y recorrido",
                "Las boquillas, válvulas y cotas de salida siguen influyendo"
              ],
              [
                "Añadir resistencia controlada en ramales de mayor caudal",
                "Puede equilibrar una condición de funcionamiento determinada",
                "Consume margen de presión y modifica el caudal total"
              ],
              [
                "Lavar por grupos o secuencialmente",
                "Reduce la demanda simultánea",
                "Recalcular duración del lote, servicio de válvulas y control"
              ],
              [
                "Cambiar la bomba o mejorar el tramo común",
                "Puede mejorar la entrega total en el punto de trabajo",
                "No elimina automáticamente las diferencias de resistencia entre ramales"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Parta de la entrega requerida por el ramal que falla. Aumentar tensión, elegir una bomba mayor o añadir restricciones sin medir cada ramal puede cambiar el total y dejar sin resolver la causa. Tras el ajuste, repita el mismo método de aceptación, incluyendo todas las boquillas, el primer ciclo y el tiempo total de lavado."
          }
        ]
      },
      {
        "title": "7. Consulte las guías de selección relacionadas",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Esta página trata el reparto desde una bomba a varios circuitos de lavado. La selección también requiere compatibilidad con el líquido y requisitos reales de presión y control. Si la entrega disminuye con el tiempo de funcionamiento, investigue por separado la ventilación del depósito y la alimentación de entrada."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/ivd-cleaning-wash-rinse-pump-diaphragm-pump/",
                "label": "Selección de bombas de lavado y enjuague para instrumentos"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Localizar el punto de trabajo mediante una curva caudal-presión"
              },
              {
                "href": "/resources/technical-articles/tube-inner-diameter-affects-diaphragm-pump-flow/",
                "label": "Cómo afecta el diámetro interior al caudal de una bomba de diafragma miniatura"
              },
              {
                "href": "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide/",
                "label": "Guía de selección de bombas de diafragma para líquidos DPL30"
              },
              {
                "href": "/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/",
                "label": "Guía de selección de bombas de diafragma para líquidos DPL60"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-drop-reservoir-venting/",
                "label": "Caudal que disminuye durante el funcionamiento: revisión de la ventilación"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Bombas de diafragma miniatura para líquidos"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Preguntas frecuentes",
    "faqItems": [
      {
        "question": "¿Puedo dividir el caudal total entre el número de boquillas?",
        "answer": "Obtendrá un promedio, no una prueba de que cada boquilla cumple. Recoja los volúmenes individuales durante la misma ventana de orden y compruebe la entrega mínima y la variación permitida."
      },
      {
        "question": "¿Tubos de igual longitud garantizan igual caudal?",
        "answer": "No. También influyen diámetro interior, boquillas, válvulas, racores, cota de salida y gas atrapado. La igualdad de longitud solo resuelve una parte de la uniformidad del montaje."
      },
      {
        "question": "¿Una bomba de 600 mL/min resolverá el problema?",
        "answer": "Una mayor capacidad de suministro es relevante si el caudal total en el punto real de trabajo es insuficiente. Las resistencias desiguales de los ramales requieren atención independiente, y el caudal nominal debe contrastarse con la curva de la bomba."
      },
      {
        "question": "¿Debo medir caudal medio o volumen por lavado?",
        "answer": "El caudal medio ayuda a diagnosticar entrega continua. Para lavados breves, incluya volumen entregado y tiempo de finalización, porque arranque, cebado y movimiento de válvulas pueden ocupar gran parte de la ventana."
      },
      {
        "question": "¿Qué porcentaje de desequilibrio es aceptable?",
        "answer": "No existe un límite único para todos los instrumentos. Derive los criterios de aceptación del resultado de limpieza, los requisitos de contaminación residual y el método de medida; después distribuya tolerancias entre bomba, válvulas, tubos y control."
      }
    ],
    "cta": {
      "title": "Convierta sus condiciones de trabajo en una especificación de bomba verificable",
      "description": "Comparta el líquido, el volumen o caudal objetivo, los tiempos, el circuito y las limitaciones de instalación para evaluar la configuración de la bomba y el método de verificación.",
      "contactLabel": "Contactar con soporte técnico",
      "productsLabel": "Explorar productos relacionados",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  },
  "diaphragm-pump-flow-drop-reservoir-venting": {
    "metadata": {
      "title": "El caudal empieza bien y después baja: ¿cómo revisar la ventilación del depósito de una bomba de diafragma miniatura?",
      "seoTitle": "Caída de caudal en bombas de diafragma: ventilación del depósito | FOREACH",
      "seoDescription": "Registre conjuntamente la presión del espacio de gas, la presión de entrada y la entrega para investigar restricciones de ventilación y distinguir cambios de nivel, obstrucciones, entradas de aire y contrapresión de salida.",
      "coverImage": "/images/resources/technical-articles/pump-application-guides/dpl30-brushless-rear-photo.jpg",
      "coverAlt": "Vista posterior de una bomba de diafragma miniatura FOREACH DPL30 con el cuerpo y las conexiones de líquido"
    },
    "deck": "Registre conjuntamente la presión del espacio de gas, la presión de entrada y la entrega para investigar restricciones de ventilación y distinguir cambios de nivel, obstrucciones, entradas de aire y contrapresión de salida.",
    "leadBlocks": [
      {
        "type": "paragraph",
        "text": "Una bomba de diafragma miniatura que entrega normalmente al principio y después pierde caudal no está necesariamente dañada. Al aspirar de un depósito, conviene comprobar si el gas repone el volumen de líquido retirado según el diseño. La caída también puede deberse al nivel, los filtros, los tubos o la carga de salida. El síntoma por sí solo no demuestra una ventilación obstruida."
      }
    ],
    "sections": [
      {
        "title": "1. Identifique cómo compensa el recipiente el líquido retirado",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Botellas rígidas, bolsas colapsables y depósitos de presión controlada funcionan de manera distinta. Una botella rígida suele necesitar un circuito diseñado de intercambio de gas o control de presión. Una bolsa colapsable puede compensar mediante deformación; en un depósito presurizado deben comprobarse regulador y suministro de gas. Revise el esquema y las instrucciones del recipiente antes de considerar anormal su cierre."
          },
          {
            "type": "paragraph",
            "text": "En una botella rígida ventilada, revise todo el circuito de gas: entrada ambiental, filtro, tubo, conexión del tapón y abertura interior. Un orificio visible no demuestra capacidad suficiente durante el funcionamiento. Una membrana mojada, un tubo doblado o una abertura sumergida pueden cambiar la pérdida de presión efectiva."
          },
          {
            "type": "figure",
            "src": "/images/resources/technical-articles/pump-application-guides/reservoir-vent-es.webp",
            "alt": "El gas entra por la ventilación prevista y el líquido sale por una toma sumergida hacia la bomba; las presiones del espacio de gas y de entrada se miden por separado",
            "width": 1200,
            "height": 500,
            "caption": "Disposición conceptual: medir por separado el espacio de gas y la entrada ayuda a distinguir restricciones del circuito de gas de pérdidas en el circuito líquido. No es un plano de un recipiente específico."
          }
        ]
      },
      {
        "title": "2. Por qué una botella rígida sellada puede vaciarse con creciente dificultad",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Considere este modelo explicativo: botella rígida completamente sellada, cantidad fija de gas y temperatura constante, despreciando provisionalmente evaporación, gas disuelto y fugas. Al retirar líquido aumenta el espacio de gas y disminuye su presión absoluta."
          },
          {
            "type": "formula",
            "expression": "P₂,abs = P₁,abs × Vg₁ / (Vg₁ + ΔVliquid)",
            "note": "Aproximación isotérmica de gas ideal con cantidad fija de gas. P es presión absoluta, Vg₁ el volumen inicial del espacio de gas y ΔVliquid el volumen de líquido retirado. No sustituya presión manométrica."
          },
          {
            "type": "paragraph",
            "text": "Suponga un espacio inicial de gas de 100 mL a 101.3 kPa absolutos. Tras retirar 20 mL, el modelo da 101.3 × 100/120 ≈ 84.4 kPa absolutos, equivalentes a unos −16.9 kPa manométricos respecto a la presión ambiental inicial. Son cálculos ilustrativos, no mediciones de una bomba FOREACH ni de un depósito real."
          },
          {
            "type": "paragraph",
            "text": "Los recipientes reales pueden deformarse o tener fugas; los líquidos pueden evaporarse o liberar gas disuelto; la temperatura puede variar. Por ello, el volumen retirado no determina por sí solo la presión real del espacio de gas. El modelo explica por qué una reposición de gas restringida puede dificultar progresivamente la aspiración. El diagnóstico sigue necesitando mediciones."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "https://www.grc.nasa.gov/www/k-12/BGP/boyle.html",
                "label": "Referencia física: NASA sobre la ley de Boyle"
              }
            ]
          }
        ]
      },
      {
        "title": "3. Separe la presión del espacio de gas de las pérdidas de aspiración",
        "blocks": [
          {
            "type": "formula",
            "expression": "Pentrada,abs ≈ Pgas,abs + ρg(zsuperficie − zentrada) − ΔPaspiración",
            "note": "Relación estacionaria aproximada con unidades de presión coherentes. ρ es la densidad del líquido y z la cota. Pulsaciones rápidas, aceleración y flujo bifásico requieren análisis adicional."
          },
          {
            "type": "paragraph",
            "text": "La disminución de presión del espacio de gas, el descenso del nivel y el aumento de resistencia de aspiración pueden reducir la presión de entrada de la bomba. Medir el espacio de gas permite identificar las condiciones de reposición del recipiente. Medir además la entrada muestra el efecto combinado de la columna líquida y la toma de aspiración. El caudal de salida por sí solo no distingue de forma fiable estas causas."
          },
          {
            "type": "paragraph",
            "text": "La aspiración de una bomba de diafragma varía durante el ciclo. Un sensor lento puede indicar solo el promedio y no descartar dificultades breves. La instrumentación no debe introducir nuevas entradas de aire ni un volumen muerto significativo."
          }
        ]
      },
      {
        "title": "4. Acote la causa mediante observaciones y comparaciones controladas",
        "blocks": [
          {
            "type": "table",
            "headers": [
              "Causa posible",
              "Evidencia que examinar",
              "Comprobación posterior"
            ],
            "rows": [
              [
                "Reposición de gas restringida",
                "La presión del espacio de gas sale de su condición prevista mientras cambia la entrega",
                "Compruebe la pérdida de presión del circuito de gas y compare un componente de ventilación aprobado y verificado en un banco controlado"
              ],
              [
                "Descenso de nivel o cambio de altura de aspiración",
                "La presión del gas es normal, pero las condiciones de entrada siguen la altura del líquido",
                "Repita al mismo nivel y altura de instalación"
              ],
              [
                "Filtro de aspiración obstruido o tubo deformado",
                "Presión del gas normal y mayor diferencia de presión en aspiración",
                "Revise filtro, racores y curvas, cambiando un factor cada vez"
              ],
              [
                "Entrada de aire en aspiración",
                "Burbujas o recuperación temporal después del cebado",
                "Compruebe la integridad de conexiones; las burbujas visibles no son la única evidencia"
              ],
              [
                "Cambio de carga de salida",
                "La presión de salida aumenta mientras disminuye la entrega",
                "Revise válvulas, boquillas y tubos posteriores, y la presión del recipiente receptor"
              ],
              [
                "Cambios eléctricos, térmicos o del líquido",
                "Cambian tensión, corriente, temperatura o condiciones relacionadas con viscosidad",
                "Mantenga constantes las demás condiciones antes de comparar"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Estas observaciones organizan la investigación; ninguna fila identifica por sí sola una avería exclusiva. Por ejemplo, una presión de entrada cada vez más negativa puede deberse tanto a ventilación restringida como a un filtro de aspiración obstruido. Combine las posiciones de medida con comparaciones controladas."
          }
        ]
      },
      {
        "title": "5. Haga reproducible la comprobación de ventilación",
        "blocks": [
          {
            "type": "list",
            "items": [
              "Registre tipo de recipiente, límites de presión y vacío, líquido, temperatura, nivel inicial, volumen del espacio de gas, altura de instalación y circuito de ventilación previsto.",
              "Con iguales condiciones eléctricas y de control, registre tiempo transcurrido, volumen acumulado retirado, caudal y presiones de gas, entrada y salida. Conserve también tensión, corriente y nivel.",
              "Inspeccione los circuitos de gas y líquido antes y durante el síntoma. Busque filtro mojado, líquido en la ventilación, abertura de gas sumergida o deformación de tubos.",
              "Si necesita comparar, utilice un banco controlado con agua u otro sustituto adecuado y sustituya el componente de ventilación solo mediante un método permitido por el diseño. Mantenga iguales nivel inicial, temperatura, tubos y tiempos.",
              "Compare los historiales de presión y los volúmenes entregados antes y después. La mejora de ambos, respaldada por inspección del componente, refuerza el diagnóstico; una recuperación breve del caudal no basta."
            ]
          },
          {
            "type": "notice",
            "text": "Con reactivos reales, líquidos volátiles o sistemas que exigen esterilidad, no afloje simplemente el tapón ni anule filtración o control de vapores. La comparación debe respetar el diseño del recipiente y del instrumento; abrir temporalmente no es una solución de ingeniería terminada."
          },
          {
            "type": "paragraph",
            "text": "La aceptación debe cubrir el intervalo de niveles previsto, el periodo de funcionamiento más largo y la demanda máxima de extracción. Unos segundos desde una botella llena no bastan. Los límites de presión y la duración del ensayo deben derivarse del recipiente, los requisitos de entrada de la bomba y el servicio del instrumento."
          }
        ]
      },
      {
        "title": "6. Dimensione el circuito de gas según demanda y pérdida admisible",
        "blocks": [
          {
            "type": "paragraph",
            "text": "A presión y temperatura aproximadamente iguales, el caudal volumétrico de gas entrante normalmente debe reponer el volumen de líquido retirado. Antes de comparar capacidades de gas, conviértalas a condiciones de referencia compatibles de presión y temperatura. El caudal indicado de un filtro solo tiene sentido con su diferencia de presión y condiciones de ensayo."
          },
          {
            "type": "table",
            "headers": [
              "Dato de selección",
              "Información necesaria"
            ],
            "rows": [
              [
                "Demanda máxima de extracción",
                "Caudales de líquido simultáneo y de pico, y reposición de gas correspondiente"
              ],
              [
                "Desviación admisible de presión del espacio de gas",
                "Límites del recipiente, requisitos de entrada de la bomba y restricciones del proceso"
              ],
              [
                "Pérdida de presión del circuito de gas",
                "Pérdidas del filtro, tubos y racores al caudal de gas pertinente"
              ],
              [
                "Mojado y exposición química",
                "Compatibilidad con líquido y vapor, orientación de montaje y drenaje"
              ],
              [
                "Servicio y mantenimiento",
                "Criterios de sustitución del proveedor y método para detectar pérdidas anormales"
              ]
            ]
          },
          {
            "type": "paragraph",
            "text": "Un orificio mayor no constituye por sí solo una regla completa de selección. No asigne un tamaño de poro ni una alarma universal de vacío sin los requisitos de la aplicación. Filtración, control de contaminación, compatibilidad química y resistencia del circuito de gas deben evaluarse conjuntamente."
          }
        ]
      },
      {
        "title": "7. Retome la selección de bomba tras verificar la alimentación",
        "blocks": [
          {
            "type": "paragraph",
            "text": "Restablezca el depósito, la aspiración y la carga de salida a sus condiciones previstas; después evalúe si la bomba completa la tarea. Las clases de 300 mL/min DPL30 y 600 mL/min DPL60 sirven para preseleccionar, pero la entrega utilizable sigue dependiendo de presión de trabajo, líquido y condiciones de entrada."
          },
          {
            "type": "paragraph",
            "text": "Si la reposición de gas o la aspiración están restringidas, una bomba mayor puede elevar la demanda instantánea de extracción sin garantizar recuperación. Una vez establecidas las condiciones, utilice la curva correspondiente y mediciones del sistema montado para decidir si deben cambiar modelo, diámetro interior o tiempos de control."
          },
          {
            "type": "links",
            "items": [
              {
                "href": "/resources/technical-articles/suction-vs-discharge-resistance-diaphragm-pump/",
                "label": "Resistencia en aspiración frente a resistencia en descarga"
              },
              {
                "href": "/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
                "label": "Diagnóstico de una pérdida de capacidad autocebante"
              },
              {
                "href": "/resources/technical-articles/lab-liquid-waste-aspiration-troubleshooting/",
                "label": "Diagnóstico de aspiración: fugas y filtros obstruidos"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
                "label": "Curvas caudal-presión y punto de trabajo real"
              },
              {
                "href": "/resources/technical-articles/dpl30-liquid-diaphragm-pump-selection-guide/",
                "label": "Guía de selección de bombas de diafragma para líquidos DPL30"
              },
              {
                "href": "/resources/technical-articles/dpl60-liquid-diaphragm-pump-selection-guide/",
                "label": "Guía de selección de bombas de diafragma para líquidos DPL60"
              },
              {
                "href": "/resources/technical-articles/diaphragm-pump-multiple-wash-nozzles-flow-balance/",
                "label": "Entrega desigual a través de varias boquillas de lavado"
              },
              {
                "href": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/",
                "label": "Bombas de diafragma miniatura para líquidos"
              }
            ]
          }
        ]
      }
    ],
    "faqTitle": "Preguntas frecuentes",
    "faqItems": [
      {
        "question": "¿La recuperación al abrir el tapón demuestra que la bomba está bien?",
        "answer": "Muestra que cambiar las condiciones del recipiente afectó la entrega. No descarta por sí solo problemas de bomba o entradas de aire. Confirme la causa comparando una ventilación aprobada y midiendo presiones de forma sincronizada."
      },
      {
        "question": "¿Por qué puede aparecer vacío en una botella ventilada?",
        "answer": "El gas necesita una diferencia de presión para atravesar filtros, tubos y racores. Un circuito pequeño, obstruido, mojado o sumergido puede no reponer gas a la velocidad requerida por la extracción de líquido."
      },
      {
        "question": "¿Todo recipiente sellado debe tener un orificio de ventilación?",
        "answer": "No. Bolsas colapsables, depósitos presurizados y recipientes de atmósfera controlada utilizan sus propios métodos de compensación de volumen o control de presión. Compruebe el diseño previsto en lugar de convertir todo recipiente en uno abierto."
      },
      {
        "question": "¿A qué vacío debe activarse una alarma?",
        "answer": "Fíjelo según los límites del recipiente, las condiciones de entrada de la bomba y el rendimiento requerido por el instrumento. Los −16.9 kPa del artículo son un cálculo hipotético, no un umbral de alarma ni una presión admisible del producto."
      },
      {
        "question": "¿Una bomba mayor evitará la caída gradual de caudal?",
        "answer": "No puede suponerse. Resuelva primero las restricciones de reposición de gas o alimentación de entrada y después verifique la entrega y el régimen de servicio exigidos en las condiciones reales."
      }
    ],
    "cta": {
      "title": "Convierta sus condiciones de trabajo en una especificación de bomba verificable",
      "description": "Comparta el líquido, el volumen o caudal objetivo, los tiempos, el circuito y las limitaciones de instalación para evaluar la configuración de la bomba y el método de verificación.",
      "contactLabel": "Contactar con soporte técnico",
      "productsLabel": "Explorar productos relacionados",
      "productsHref": "/products/pumps/miniature-diaphragm-pumps/liquid-diaphragm-pumps/"
    }
  }
} satisfies Record<PumpApplicationArticleSlug, PumpApplicationArticleCopy>;
