import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

export const fluidResistanceCalculatorGuideEsCopy = {
  "metadata": {
    "title": "¿Para qué sirve calcular la resistencia al flujo? Diseño y selección con el calculador FOREACH",
    "seoTitle": "Calculador de resistencia: caudal y pérdidas | FOREACH",
    "seoDescription": "Compare diámetro y Cv para estimar pérdidas, calcular caudal, localizar la resistencia dominante y evaluar fluidos y circuitos con el calculador FOREACH, curvas de bomba y mediciones.",
    "coverImage": "/images/resources/technical-articles/fluid-resistance-guide/comparison.es.svg",
    "coverAlt": "Caso de cálculo de la resistencia al flujo de FOREACH: comparación de la caída de presión antes y después de ajustar el diámetro de la tubería y el Cv de la válvula"
  },
  "deck": "El caudal en vacío de la bomba cumple los requisitos. Después de instalar las tuberías, válvulas y juntas, el suministro de líquido al final es insuficiente. Los cálculos de resistencia al flujo pueden dividir el problema en datos comparables: qué diferencial de presión se requiere para el caudal objetivo, dónde ocurre principalmente la pérdida de presión y qué sucede si se cambia el diámetro y la longitud de la tubería, el componente Cv o la viscosidad del medio. Este artículo combina la función real de la calculadora de resistencia al flujo FOREACH con un caso de circuito de líquido recalculable para explicar cómo utilizar los resultados del cálculo para el diseño, la selección, la resolución de problemas y la verificación del prototipo.",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "En instrumentos analíticos, equipos IVD y líneas de fluidos de automatización de laboratorio, la energía proporcionada por las bombas es necesaria para superar la fricción de la pared de la tubería, la resistencia local en válvulas y accesorios y otras condiciones de presión en el sistema real. Cuando el caudal es insuficiente, si reemplaza directamente la bomba con un caudal mayor, puede aumentar el consumo de energía y el trabajo de depuración, pero aún así no resuelve las limitaciones causadas por la sección de tubería más delgada o un determinado elemento estrangulador."
    },
    {
      "type": "paragraph",
      "text": "La calculadora de resistencia al flujo FOREACH admite la creación de filas de ID según el diámetro interior y la longitud de la tubería, y la creación de filas de Cv según el coeficiente de flujo del componente. También puede realizar cálculos de caída de presión con caudal conocido, cálculo de caudal con caída de presión conocida, estadísticas de pérdida, cálculo de la curva PQ de la trayectoria del líquido y exportación a Excel. Es adecuado para convertir conceptos de circuitos hidráulicos en estimaciones de presión preliminares y también es adecuado para recálculos utilizando parámetros conocidos después de las pruebas."
    },
    {
      "type": "paragraph",
      "text": "Antes de utilizarlo se deben determinar los caminos del flujo y las condiciones a analizar. A continuación se da prioridad al estado estacionario, líquido monofásico y la misma ruta en serie como ejemplo; Los resultados de los cálculos son estimaciones modelo y no pueden sustituir la confirmación del rendimiento de bombas, válvulas y máquinas completas en medios reales."
    },
    {
      "type": "links",
      "items": [
        {
          "href": "/resources/calculators/fluid-resistance/",
          "label": "Abra la calculadora de resistencia al flujo FOREACH y cree cálculos basados en el caso de este artículo."
        }
      ]
    }
  ],
  "sections": [
    {
      "title": "1. ¿Qué describe el cálculo de resistencia al flujo?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "El flujo representa el volumen pasado por unidad de tiempo y la caída de presión representa la presión perdida antes y después de que el fluido pase a través de una sección de tubería o componente. Bajo una determinada estructura de medio y trayectoria de flujo, para mantener un cierto caudal, se requiere una diferencia de presión correspondiente. El cálculo de la resistencia al flujo cuantifica esta relación para ayudar a determinar los requisitos de presión de conducción del diseño del circuito de líquido."
        },
        {
          "type": "subheading",
          "title": "Distinguir pérdidas por fricción y pérdidas locales"
        },
        {
          "type": "paragraph",
          "text": "La pérdida por fricción proviene principalmente de la fricción causada por el fluido que fluye a lo largo de la pared de la tubería, que está relacionada con el diámetro interior, la longitud, la velocidad y las propiedades físicas. Las pérdidas locales están asociadas con entradas, giros, reducciones, válvulas y otras estructuras. Las mismas dimensiones externas de las juntas no significa que los canales de flujo internos o las resistencias sean las mismas; La selección de mangueras con el mismo diámetro exterior no significa que sus diámetros interiores efectivos sean los mismos."
        },
        {
          "type": "formula",
          "expression": "Δp_path = ΣΔp_friction + ΣΔp_local",
          "note": "Este es un resumen de las pérdidas de resistencia enumeradas en el mismo camino definido. Las pérdidas de diferentes ramas paralelas no se pueden sumar todas directamente como la diferencia de presión requerida entre los dos nodos comunes."
        },
        {
          "type": "paragraph",
          "text": "En pasos pequeños, una variación de diámetro puede cambiar mucho la pérdida. Aumentar la longitud suele elevar la fricción; aumentar el caudal eleva la velocidad. La relación presión–caudal también depende del régimen, por lo que no siempre sigue el cuadrado del caudal."
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/fluid-resistance-guide/path.es.svg",
          "alt": "Diagrama esquemático del cálculo del circuito de líquido: bomba, tubería, elementos Cv y terminales, así como límites de presión que deben confirmarse individualmente.",
          "width": 1400,
          "height": 620,
          "caption": "Identifique el recorrido en serie y añada cada tubo y componente. El calculador suma las pérdidas introducidas; presión del recipiente fuente, desnivel y presión terminal se incorporan por separado al balance completo."
        }
      ]
    },
    {
      "title": "2. ¿Qué problemas de ingeniería son adecuados primero para el cálculo de la resistencia al flujo?",
      "blocks": [
        {
          "type": "table",
          "headers": [
            "Problema",
            "Resultado del cálculo",
            "Decisión apoyada"
          ],
          "rows": [
            [
              "¿Cuánta presión se requiere para el caudal objetivo?",
              "Pérdidas totales y por componente al caudal dado",
              "Establecer un presupuesto de presión de la línea hidráulica y evaluar las condiciones operativas de las bombas candidatas."
            ],
            [
              "¿Aproximadamente cuánto líquido puede fluir bajo la diferencia de presión disponible?",
              "Caudal estimado que satisface el modelo introducido",
              "Determinar si es probable que la tubería existente cumpla con los requisitos de ritmo."
            ],
            [
              "¿De dónde viene la principal resistencia?",
              "Caída de presión, pérdidas locales y a lo largo del proceso y proporciones de cada fila.",
              "Determinar qué segmentos o componentes de tubería deben priorizarse para el ajuste."
            ],
            [
              "¿Es más efectivo aumentar el diámetro de la tubería o reemplazar la válvula?",
              "Comparación de resultados de múltiples soluciones de entrada.",
              "Compare los beneficios de las modificaciones y reduzca el reemplazo de piezas sin base"
            ],
            [
              "¿Qué sucede cuando aumenta la viscosidad?",
              "Caída de presión y régimen de flujo a diferentes densidades y viscosidades.",
              "Identificar las diferencias entre las pruebas de agua pura y los medios reales."
            ],
            [
              "Cómo cambian las necesidades de presión a medida que aumenta la velocidad de procesamiento",
              "Curva PQ de la trayectoria del líquido, puntos de cálculo y resultados de ajuste",
              "Verifique los cambios de resistencia bajo diferentes caudales para determinar el rango de prueba posterior"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "En la etapa inicial del plan, es útil comparar tuberías y combinaciones de componentes; en la etapa de prototipo, ayuda a comprender la brecha entre el caudal medido y el esperado; en revisión, ayuda a evaluar el impacto de los cambios en la longitud de la tubería, el diámetro interior, el tipo de válvula o el medio. El propósito es proporcionar una base para el juicio, y la solución final también debe cumplir con los requisitos de instalación, compatibilidad de materiales, residuos, costos y mantenimiento."
        }
      ]
    },
    {
      "title": "3. Prepare una tabla de parámetros de ruta de líquido clara antes del cálculo.",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Divida las secciones de tubería cuyos parámetros cambian a lo largo de la dirección del flujo y registre el diámetro interior efectivo, la longitud y la información de los componentes. No se deben reemplazar dos secciones de tubería con diferentes diámetros internos solo por la longitud total y el diámetro interno promedio; Los canales delgados locales pueden representar una gran proporción de la resistencia. Al medir el diámetro interior, se debe prestar atención a las tolerancias, la deformación por presión de la manguera y la reducción del diámetro debido al montaje."
        },
        {
          "type": "table",
          "headers": [
            "Parámetro",
            "Fuente del dato",
            "Malentendidos a evitar"
          ],
          "rows": [
            [
              "Densidad, viscosidad y temperatura del fluido.",
              "Datos reales de los medios, propiedades físicas medidas o valores de referencia adecuados para las condiciones de trabajo.",
              "El uso de un medio preestablecido con un nombre similar no significa que se haya descrito la receta exacta."
            ],
            [
              "Diámetro interior de la tubería y longitud de la tubería",
              "Dibujos, especificaciones y dimensiones reales de las tuberías.",
              "El diámetro exterior no se puede utilizar directamente como diámetro interior; La longitud del tubo de herramienta se introduce en mm."
            ],
            [
              "Cv del componente",
              "Información del producto correspondiente al modelo, posición de la válvula y condiciones de prueba.",
              "El tamaño del puerto de conexión, Kv o el caudal máximo no se pueden considerar directamente como Cv"
            ],
            [
              "Coeficiente de resistencia local ξ",
              "Datos consistentes con la estructura real y los regímenes de flujo aplicables.",
              "Si el mismo componente ha sido descrito por Cv, la misma pérdida no debe superponerse repetidamente."
            ],
            [
              "Flujo objetivo o diferencial de presión disponible",
              "Requisitos de acción del equipo o límites de presión definidos",
              "La presión máxima de la bomba no es igual a la cantidad total disponible para superar la resistencia de la tubería."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "La herramienta permite el uso de viscosidad dinámica o cinemática. La unidad debe confirmarse antes de la entrada: 1 mPa·s = 0.001 Pa·s, 1 cSt = 10⁻⁶ m²/s. Las dos viscosidades satisfacen μ = ρν, donde μ es la viscosidad dinámica, ρ es la densidad y ν es la viscosidad cinemática. Copiar valores directamente de la tabla de datos a los cuadros de entrada de diferentes unidades puede provocar un error de orden de magnitud."
        },
        {
          "type": "paragraph",
          "text": "Las propiedades del agua se calculan según la temperatura introducida. No todos los demás preajustes disponen de un modelo completo dependiente de la temperatura. Para un reactivo de temperatura, concentración o fórmula definidas, obtenga densidad y viscosidad correspondientes y use entradas personalizadas. El nombre del preajuste no confirma las propiedades reales."
        }
      ]
    },
    {
      "title": "4. ¿Qué preguntas responden los dos modos de cálculo?",
      "blocks": [
        {
          "type": "subheading",
          "title": "Caudal conocido: primero calcule cuánta resistencia debe superar este camino de líquido"
        },
        {
          "type": "paragraph",
          "text": "Una vez determinado el volumen de limpieza, el tiempo de entrega o el objetivo del ciclo, los requisitos se convierten primero en caudales de trabajo. Por ejemplo, se deben administrar 30 mL de líquido en un tiempo de administración efectivo de 30 s, con un requisito de flujo promedio de 60 mL/min. Utilizando este caudal para calcular sección por sección, se puede obtener la pérdida de presión de la combinación actual de tubería y componentes."
        },
        {
          "type": "paragraph",
          "text": "Para un circuito de líquido en serie en estado estacionario sin divisiones ni fugas, el caudal de cada sección debe ser el mismo. El modo de flujo conocido actual permite establecer el caudal fila por fila, y el valor de cada fila se usa en el cálculo, por lo que se debe verificar cada fila en lugar de simplemente modificar el cuadro de entrada de arriba y asumir que todos los segmentos de tubería están sincronizados. Si el resumen de caída de presión de diferentes líneas de flujo tiene significado físico debe determinarse mediante la relación real de la trayectoria del flujo."
        },
        {
          "type": "subheading",
          "title": "Caída de presión conocida: estime el caudal correspondiente a una diferencia de presión de resistencia determinada"
        },
        {
          "type": "paragraph",
          "text": "Cuando se conoce el diferencial de presión disponible para la ruta analizada, el modo de retrocálculo busca el caudal que hace que la pérdida calculada sea consistente con el diferencial de presión objetivo. El cálculo retroactivo actual se basa en el flujo común de cada fila y es adecuado para rutas de series bien definidas. No calcula automáticamente cómo dividir las ramas paralelas."
        },
        {
          "type": "formula",
          "expression": "Δp_available,loss = Δp_drive − Δp_boundary − ρgΔz",
          "note": "En un balance simplificado estacionario e incompresible, el diferencial motor debe considerar presiones en los extremos y desnivel. Incluya aparte la diferencia de carga cinética si es significativa. La entrada del cálculo inverso debe ser el diferencial disponible para las pérdidas enumeradas, no la presión máxima de la bomba antes de descontar esos términos."
        },
        {
          "type": "paragraph",
          "text": "Si el accionamiento proviene de una bomba de diafragma, su capacidad de suministro variará según el flujo y las condiciones de entrada y salida. El cálculo retrospectivo del caudal solo puede mostrar que la diferencia de presión de entrada coincide con el modelo de resistencia, pero no puede probar que la bomba real definitivamente funcionará en ese punto. También es necesario verificar la curva de la bomba y las condiciones de succión correspondientes, y determinar mediante medición real si es necesario."
        }
      ]
    },
    {
      "title": "5. Caso de cálculo: ¿Debo cambiar primero el diámetro de la tubería o reemplazar la válvula primero?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "A continuación se utiliza el núcleo de cálculo de resistencia al flujo de FOREACH para calcular un caso simplificado: agua a 20 °C, caudal objetivo de 60 mL/min, tubería recta de 1 m conectada en serie con un elemento Cv. El coeficiente de resistencia local adicional de la tubería recta se establece en cero, y se supone el modelo de estrangulamiento de orificios pequeños y orificios de paredes delgadas y bordes afilados para el elemento Cv. Las presiones de fuente y terminal, las diferencias de nivel de líquido y otros componentes no enumerados no están incluidos en la tabla."
        },
        {
          "type": "paragraph",
          "text": "Cree dos filas en la herramienta: la primera fila tipo ID, caudal 60 mL/min, diámetro interior 1 mm, longitud del tubo 1000 mm, ξ = 0; la segunda fila tipo Cv, caudal 60 mL/min, Cv = 0.02. Calcule primero la solución original y luego cambie solo el diámetro interior del tubo o Cv respectivamente, manteniendo constantes las demás condiciones."
        },
        {
          "type": "table",
          "headers": [
            "Configuración",
            "Caída de presión de tubería recta",
            "Pérdida de presión del componente Cv",
            "Pérdida total"
          ],
          "rows": [
            [
              "A: Diámetro interior 1 mm, Cv = 0.02",
              "40.80 kPa",
              "4.41 kPa",
              "45.21 kPa"
            ],
            [
              "B: diámetro interior 2 mm, Cv = 0.02",
              "2.55 kPa",
              "4.41 kPa",
              "6.96 kPa"
            ],
            [
              "C: diámetro interior 1 mm, Cv = 0.04",
              "40.80 kPa",
              "1.11 kPa",
              "41.92 kPa"
            ]
          ]
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/fluid-resistance-guide/comparison.es.svg",
          "alt": "Comparación acumulada de pérdidas del tubo y del componente Cv para A, B y C; domina el tubo en la configuración inicial",
          "width": 1400,
          "height": 740,
          "caption": "Resultados de cálculo del modelo, no medidas reales del producto. Alrededor del 90% de las pérdidas en el plan original provienen de la tubería recta; Después de aumentar el diámetro de la tubería, la resistencia principal se desplaza al elemento Cv. El redondeo numérico puede provocar pequeñas diferencias entre los valores individuales y el valor total."
        },
        {
          "type": "paragraph",
          "text": "En el plan original, las pérdidas en el tubo recto representaban aproximadamente el 90% de las pérdidas totales. Aunque aumentar el Cv de la válvula reduce la caída de presión de la válvula, la tubería recta todavía consume aproximadamente 40.80 kPa; aumentar el diámetro de la tubería reduce la caída de presión total a aproximadamente 6.96 kPa. Los resultados respaldan la priorización de la investigación sobre el tamaño de las tuberías en lugar de determinar qué componente limita el flujo basándose únicamente en el nombre o la forma del componente."
        },
        {
          "type": "subheading",
          "title": "¿Por qué es tan obvio el impacto de los cambios en el diámetro de las tuberías?"
        },
        {
          "type": "formula",
          "expression": "Δp = 128μLQ / (πd⁴)",
          "note": "Esta relación es válida para flujo laminar completamente desarrollado, fluidos newtonianos y tuberías rectas rígidas circulares, utilizando unidades SI. Los números de Reynolds calculados para los dos diámetros de tubería en este ejemplo son aproximadamente 1269 y 635, y la relación de flujo laminar se puede utilizar para comprender las pérdidas por fricción."
        },
        {
          "type": "paragraph",
          "text": "Con el mismo caudal, viscosidad y longitud, cuando el diámetro interior aumenta de 1 mm a 2 mm, la caída de presión de la tubería recta de flujo laminar cae a aproximadamente 1/16 del valor original. Al mismo tiempo, el volumen geométrico en el tubo aumenta de aproximadamente 0.785 mL a 3.142 mL, que es 4 veces. Los beneficios de reducir la caída de presión deben evaluarse junto con el cebado, el volumen de cambio de fluido y el control del remanente, no solo la resistencia mínima."
        },
        {
          "type": "paragraph",
          "text": "Este ejemplo no significa que todas las líneas de líquido deban ampliarse primero. En el plan B, la pérdida de la válvula ya es mayor que la de la tubería recta, y los beneficios de seguir engrosando la tubería disminuirán. La distribución de pérdidas debe reexaminarse después de cada cambio y los nuevos límites principales deben usarse como base para un juicio posterior."
        }
      ]
    },
    {
      "title": "6. ¿Qué datos se deben mirar primero en la tabla de resultados?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Examine primero la pérdida total, después las filas y sus porcentajes, y finalmente velocidad y Reynolds para comprobar régimen e hipótesis. Los campos detallados explican el cálculo; no son todos objetivos de rendimiento independientes."
        },
        {
          "type": "table",
          "headers": [
            "resultado",
            "Significado de ingeniería",
            "Aplicación"
          ],
          "rows": [
            [
              "Caída de presión total ΔPt",
              "La suma de las pérdidas de resistencia ingresadas.",
              "Incorporar al balance completo y comparar con las condiciones motrices disponibles"
            ],
            [
              "Pérdida por fricción ΔPy y pérdida local ΔPj",
              "¿La pérdida proviene de la fricción de la tubería o de componentes locales?",
              "Decidir si priorizar la inspección del diámetro/longitud de la tubería o de los componentes y estructuras de reducción"
            ],
            [
              "Velocidad del flujo y número de Reynolds Re",
              "Estado de flujo según las propiedades físicas y la sección transversal efectiva dadas",
              "Verifique los regímenes de flujo y los supuestos del modelo para identificar zonas de transición o entradas inusuales."
            ],
            [
              "La mayor fuente de pérdidas y su proporción.",
              "Una fila con pérdidas más concentradas en las condiciones actuales de entrada",
              "Se utiliza para priorizar mejoras y no es una conclusión fija para todas las condiciones laborales."
            ],
            [
              "Cv global o equivalente",
              "Utilice el coeficiente de flujo para expresar la resistencia en condiciones específicas.",
              "Comparación auxiliar; no deben considerarse atributos constantes del producto bajo diferentes caudales, medios o supuestos de corrección."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "La resistencia principal debe determinarse en función de la caída de presión bajo el flujo de entrada real. Entre diferentes líneas de flujo, el Cv equivalente mínimo no necesariamente corresponde a la pérdida de presión máxima; Incluso si el mismo componente representa la proporción más alta en una condición de trabajo, pueden aparecer nuevas restricciones importantes después de cambiar la tubería o el flujo operativo."
        }
      ]
    },
    {
      "title": "7. Cómo ayuda la curva PQ a comprender los márgenes de diseño",
      "blocks": [
        {
          "type": "paragraph",
          "text": "La curva PQ en la herramienta se genera en función de los resultados del cálculo de la ruta del líquido de entrada bajo un conjunto de caudales, y el eje vertical es la pérdida de resistencia. Muestra cuánta caída de presión debe superar esta ruta del modelo al cambiar el flujo, no la curva de suministro de una bomba específica."
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/fluid-resistance-guide/curve.es.svg",
          "alt": "De acuerdo con las curvas de resistencia de la trayectoria del líquido del esquema A y del esquema B generadas por el núcleo de cálculo, marque el punto de cálculo de 60 mL/min.",
          "width": 1400,
          "height": 800,
          "caption": "Con el mismo fluido y Cv, los diámetros generan curvas distintas. Los puntos destacados corresponden a 60 mL/min. El gráfico no incluye curvas de bomba ni condiciones de presión estática."
        },
        {
          "type": "paragraph",
          "text": "Para determinar si una bomba es compatible con un sistema, se debe comparar el rendimiento de la bomba en el mismo medio y las condiciones relacionadas con los requisitos del sistema, incluidas las presiones límite y las diferencias de nivel de líquido en el mismo punto de referencia de presión. La combinación de los dos debe cumplir con las condiciones de succión, el rango operativo y los requisitos de estabilidad. La herramienta actual no importa automáticamente curvas de bombas, no resuelve intersecciones entre sistemas de bombas ni recomienda modelos específicos."
        },
        {
          "type": "paragraph",
          "text": "En el modo de caudal por fila, la curva escala todos los caudales con el mismo factor. Es un barrido que conserva las proporciones introducidas, no una nueva solución del reparto de una red paralela para cada presión. Defina el caudal de referencia del eje horizontal y su relación con cada fila."
        },
        {
          "type": "paragraph",
          "text": "La fórmula de ajuste es adecuada para describir la tendencia del intervalo calculado y no debe extrapolarse muy lejos del rango de muestreo. R², residuos y otros indicadores de ajuste evalúan la cercanía del ajuste al punto calculado; Incluso si el error de ajuste es pequeño, no puede probar que las propiedades físicas, los parámetros de los componentes o el modelo de cálculo sean consistentes con el dispositivo real."
        }
      ]
    },
    {
      "title": "8. Pasos pequeños, bajo Reynolds y datos Cv",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Después de que la ruta del líquido entra en un diámetro pequeño o en un rango de caudal más bajo, el efecto viscoso puede cambiar significativamente las características de resistencia. El número de Reynolds, Re = ρud/μ, relaciona la densidad, la velocidad media, el diámetro interior y la viscosidad dinámica. Ayuda a identificar los regímenes de flujo, pero las pérdidas precisas para todos los componentes complejos no pueden derivarse de un solo valor de Re."
        },
        {
          "type": "paragraph",
          "text": "El modelo de tubo usa Darcy–Weisbach y estima el factor de fricción mediante Churchill. No hay entrada de rugosidad, por lo que supone pared lisa. Las correcciones de orificio y Cv son estimaciones del modelo, no un sustituto universal de curvas medidas de válvulas ni de los procedimientos completos de las normas aplicables."
        },
        {
          "type": "paragraph",
          "text": "Seleccione Cv para el modelo, posición de válvula, fluido y condiciones de calibración. El diámetro equivalente derivado de Cv representa el modelo, no mide el paso mínimo real. No permite establecer directamente paso de partículas, riesgo de bloqueo ni dimensiones de fabricación."
        },
        {
          "type": "paragraph",
          "text": "Las propiedades físicas de los fluidos también tienen límites. La sangre total, las algunas soluciones de polímeros, etc. pueden presentar propiedades no newtonianas; el uso de una viscosidad fija es sólo una aproximación bajo los supuestos especificados. El ajuste preestablecido de aire no puede considerarse un modelo de flujo comprimible completo; Las grandes diferencias de presión, los cambios significativos de densidad, el flujo crítico y las condiciones de mezcla gas-líquido requieren modelos más adecuados o mediciones reales."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/technical-articles/cv-kv-correction-for-microfluidics/",
              "label": "Lectura adicional: Cálculo y corrección de Cv/Kv en microfluidos y regulación de precisión"
            }
          ]
        }
      ]
    },
    {
      "title": "9. Del cálculo a la medición real: cómo determinar de dónde viene la desviación",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Fije los límites de comparación y mida en los mismos nodos del cálculo. Si entre tomas hay filtros, conexiones rápidas o tubos no modelados, una pérdida medida mayor no demuestra por sí sola un error de fórmula. Considere la diferencia hidrostática cuando las tomas estén a distinta altura."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Establezca una línea de base: pruebe con medios conocidos, temperatura, tuberías cortas y parámetros de componentes confirmados, y registre el flujo estable y la diferencia de presión.",
            "Verifique las unidades y la geometría: verifique las entradas de ID, longitud, unidades de flujo, Cv/Kv, densidad y viscosidad para asegurarse de que la resistencia no se cuente dos veces.",
            "Conéctese gradualmente a la ruta real del líquido: cada vez que se agrega una sección de tubería o componente, se compara el incremento de caída de presión y se ubica la posición donde comienza a aparecer la desviación.",
            "Se cubren las condiciones límite: verificación de niveles bajos de fluido, carga de filtros, cambios de temperatura, diferentes posiciones de válvulas y flujos de operación.",
            "Conserve los datos originales: registre los dispositivos de prueba, los puntos de medición, los instrumentos, los medios, las versiones de parámetros y las excepciones, no solo el promedio final."
          ]
        },
        {
          "type": "paragraph",
          "text": "El flujo instantáneo y la presión de una bomba de diafragma pueden pulsar. Al comparar con los valores de estado estacionario en la calculadora, se debe identificar la ventana de tiempo promedio para la presión y el flujo, y se deben registrar los valores máximos asociados con el equipo. Promedios similares no sustituyen la presión transitoria, las fluctuaciones de las boquillas o la aceptación de la eficacia de la limpieza."
        },
        {
          "type": "paragraph",
          "text": "Si no hay flujo, descarga de líquido intermitente o una disminución gradual con el tiempo de funcionamiento, se deben verificar al mismo tiempo las fugas de aire, la ventilación de la tapa de la botella, las burbujas de aire, el estado de la válvula, el bloqueo y el suministro de energía. Los cálculos de resistencia al flujo pueden ayudar a evaluar las suposiciones de resistencia, pero no detectarán automáticamente estas fallas ni demostrarán la compatibilidad del material, el éxito del autocebado o la confiabilidad a largo plazo."
        }
      ]
    },
    {
      "title": "10. Exportar los resultados de los cálculos para poder rastrear las comparaciones de planes.",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Una vez que se completa el cálculo, se puede exportar a Excel y el archivo contiene los resultados del cálculo, el resumen estadístico y los datos de la curva PQ. Es adecuado para conservar versiones de soluciones, comparar cambios de componentes y comunicarse con proveedores, pero debe usarse junto con condiciones de entrada, diagramas de circuitos de fluidos y datos de prueba."
        },
        {
          "type": "paragraph",
          "text": "Se recomienda completar nombres identificables para las secciones de tubería y componentes, como \"botella de líquido de limpieza a la entrada de la bomba\" y \"sección de tubería de 1 mm después del grupo de válvulas\", e indicar la fuente de datos o el estado especial en las observaciones. Registre por separado la receta del medio, la temperatura, la fuente de las propiedades físicas, el modelo Cv y los supuestos geométricos, la versión del software y la fecha de cálculo; el archivo exportado no contiene automáticamente todo el contexto necesario para el proyecto."
        },
        {
          "type": "paragraph",
          "text": "Al comparar escenarios A/B, mantenga consistentes los medios, el caudal objetivo y otros parámetros no ajustados y deje claro qué se cambió cada vez. Si varias condiciones cambian al mismo tiempo, se deben explicar una por una para evitar agrupar los beneficios causados por la disminución de la viscosidad, el aumento del diámetro de la tubería y el cambio en el Cv de la válvula."
        }
      ]
    },
    {
      "title": "11. Utilice los resultados de resistencia al flujo para la selección y comunicación de bombas, válvulas y tuberías FOREACH.",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Al seleccionar una microbomba FOREACH o válvulas, conectores y tuberías de soporte, proporcionar \"flujo objetivo, pérdida por componente, condiciones de succión y presión terminal\" es más conveniente para la discusión que solo proporcionar un valor de caudal libre. Los resultados del cálculo pueden ayudar a aclarar las condiciones bajo las cuales se deben verificar las configuraciones candidatas y también pueden revelar si la canalización debe optimizarse primero."
        },
        {
          "type": "paragraph",
          "text": "Si la pérdida principal actual proviene de secciones de tubería delgadas, primero puede comparar el diámetro interior y la longitud; si se trata de componentes, se necesita el Cv, curva de caída de presión y adecuación del medio de la posición o modelo de válvula correspondiente. Si la estructura no se puede ajustar y realmente se requiere una presión más alta, entonces evalúe la bomba candidata según la curva de la bomba, el soporte de presión de la interfaz y el diseño general de protección de la máquina. La calculadora en sí no garantiza que un modelo en particular cumpla con los requisitos del equipo."
        },
        {
          "type": "paragraph",
          "text": "Al enviar una solicitud, se recomienda adjuntar un diagrama de ruta del fluido, parámetros de entrada, resultados de cálculo y flujo y presión medidos. FOREACH puede llevar a cabo la selección de modelos y la comunicación de ingeniería basada en parámetros de componentes relevantes, y aclarar aún más los datos y las condiciones de verificación del prototipo que deben complementarse."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/resources/calculators/fluid-resistance/",
              "label": "Abrir el calculador de resistencia al flujo"
            },
            {
              "href": "/resources/technical-articles/foreach-miniature-diaphragm-pump-oem-integration/",
              "label": "Lectura relacionada: integración OEM FOREACH, punto de funcionamiento y validación del instrumento"
            },
            {
              "href": "/products/",
              "label": "Ver bombas, válvulas y componentes de líneas de fluido FOREACH"
            }
          ]
        }
      ]
    }
  ],
  "faqTitle": "Preguntas frecuentes sobre la calculadora de resistencia al flujo",
  "faqItems": [
    {
      "question": "¿Puede una calculadora de resistencia al flujo decirme directamente qué bomba debo comprar?",
      "answer": "La selección de la bomba no se puede completar directamente. Calcula la relación de resistencia de la ruta del líquido de entrada y los resultados se combinan con la curva de la bomba, las condiciones de succión, la presión terminal, la diferencia de nivel del líquido, el medio y el ritmo de trabajo para formar una configuración candidata y verificarla."
    },
    {
      "question": "¿El caudal calculado a partir de un diferencial conocido es el caudal real?",
      "answer": "Es un valor estimado obtenido bajo la condición de que se establezcan las propiedades físicas de entrada, los modelos de tuberías y componentes. Si la fuente impulsora real puede proporcionar la diferencia de presión correspondiente, si hay pérdidas no contabilizadas, así como burbujas, bloqueos y pulsaciones, etc., pueden afectar los resultados de la instalación."
    },
    {
      "question": "¿Se pueden sumar directamente todas las ramas paralelas?",
      "answer": "La suma de las pérdidas de diferentes ramas paralelas no puede considerarse como la diferencia de presión del sistema entre nodos comunes. La herramienta actual no resuelve automáticamente la distribución de flujo de la red de tuberías paralelas; primero se deben definir claramente la ruta, el caudal conocido y el límite de presión y luego analizarlos de acuerdo con el método aplicable."
    },
    {
      "question": "¿Por qué a veces aumentar el diámetro de la tubería es más efectivo que aumentar el Cv de la válvula?",
      "answer": "Depende de la distribución de pérdidas de la solución original. Si la caída de presión principal proviene de una sección de tubería larga y delgada, aumentar el Cv de la válvula solo reducirá una porción menor de la pérdida. En el caso de este artículo, la tubería recta original representa aproximadamente el 90% de la pérdida total, por lo que cambiar el diámetro de la tubería es más efectivo, pero al mismo tiempo, es necesario evaluar el impacto del aumento del volumen del recorrido del líquido."
    },
    {
      "question": "El ajuste de la curva de la herramienta es muy bueno, ¿significa que el cálculo es muy preciso?",
      "answer": "El índice de ajuste solo muestra que la curva de ajuste está cerca del punto de cálculo y no puede verificar si las propiedades físicas, las suposiciones geométricas o los datos de los componentes son consistentes con el dispositivo real. La precisión de la ingeniería aún debe confirmarse mediante pruebas de presión y flujo adecuadas."
    },
    {
      "question": "Una vez que se ingresa un determinado medio, ¿se puede juzgar la compatibilidad del material de la bomba?",
      "answer": "No. Los cálculos de resistencia al flujo utilizan propiedades físicas para estimar la pérdida de flujo y no evalúan la compatibilidad química de los cabezales, diafragmas, válvulas, sellos o tuberías de las bombas. La idoneidad del material y del proceso debe confirmarse individualmente."
    }
  ],
  "cta": {
    "title": "Con los parámetros de la ruta del fluido y los resultados de los cálculos, analice las configuraciones de componentes más apropiadas.",
    "description": "Proporcione el medio, la temperatura, el flujo objetivo, el tamaño de la tubería, los parámetros de los componentes, las presiones de entrada y salida y los resultados calculados o medidos para que FOREACH pueda ayudar a determinar los puntos clave de selección y verificación.",
    "contactLabel": "Enviar requisitos de línea de fluido",
    "productsLabel": "Utilice la calculadora de resistencia al flujo",
    "productsHref": "/resources/calculators/fluid-resistance/"
  }
} satisfies DiaphragmPumpEngineeringArticleCopy;
