import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";
import { dpgl800Card, dpgl800CurveImage, dpl30Card, dpl30CurveImage, imageBase, principleDiagram } from "./shared";

// Spanish localization of what-is-a-diaphragm-pump.zh.ts. Product and category names follow the
// miniature diaphragm pump product pages; third-party photos keep their CC BY-SA attribution.
export const copy = {
  "metadata": {
    "title": "¿Qué es una bomba de diafragma? Principio de funcionamiento, tipos, ventajas, limitaciones y selección",
    "seoTitle": "¿Qué es una bomba de diafragma? Funcionamiento, tipos y selección | FOREACH",
    "seoDescription": "Cómo funciona una bomba de diafragma, diferencias entre bombas AODD, eléctricas, dosificadoras, de vacío y miniatura, ventajas, límites, aplicaciones y criterios de selección.",
    "coverImage": dpl30Card,
    "coverAlt": "Microbomba de diafragma para líquidos FOREACH DPL30"
  },
  "deck": "Una bomba de diafragma es una bomba de desplazamiento positivo que impulsa líquidos o gases mediante un diafragma flexible de movimiento alternativo y válvulas antirretorno de entrada y salida. Esta guía explica su funcionamiento, los tipos principales, sus ventajas y limitaciones, sus aplicaciones y los criterios de selección.",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "Una bomba de diafragma es una bomba de desplazamiento positivo. Un diafragma flexible se mueve hacia delante y hacia atrás y, junto con dos válvulas antirretorno situadas en la entrada y la salida, aspira el líquido o el gas por la entrada y lo expulsa por la salida."
    },
    {
      "type": "paragraph",
      "text": "El fluido bombeado solo entra en contacto con la cámara de bombeo, el diafragma y las válvulas, nunca con el motor, los rodamientos u otros componentes de accionamiento. Al no tener sellos dinámicos, la bomba de diafragma es poco propensa a las fugas y resulta adecuada para fluidos corrosivos, sensibles a la contaminación o que deben mantenerse limpios."
    },
    {
      "type": "paragraph",
      "text": "El principio de funcionamiento es el mismo en una gran bomba neumática que transporta lodos en una planta química y en una bomba de diafragma miniatura que impulsa desde unos pocos hasta varios cientos de mililitros por minuto dentro de un instrumento."
    }
  ],
  "sections": [
    {
      "title": "¿Cómo funciona una bomba de diafragma?",
      "tocLabel": "Funcionamiento",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Cada ciclo de trabajo consta de una carrera de aspiración y una carrera de impulsión. La bomba transporta el fluido mediante la variación del volumen de la cámara y la acción coordinada de dos válvulas antirretorno."
        },
        {
          "type": "figure",
          "src": principleDiagram("es"),
          "alt": "Esquema de las carreras de aspiración e impulsión de una bomba de diafragma",
          "width": 1520,
          "height": 640,
          "caption": "Principio de funcionamiento de una bomba de diafragma: las barras rojas indican válvulas antirretorno cerradas y las flechas azules, el sentido del flujo."
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "Carrera de aspiración: el diafragma baja, el volumen de la cámara aumenta y la presión disminuye. La diferencia de presión abre la válvula antirretorno de entrada mientras la de salida permanece cerrada, y el fluido entra en la cámara.",
            "Carrera de impulsión: el diafragma sube, el volumen de la cámara disminuye y la presión aumenta. Se abre la válvula antirretorno de salida, se cierra la de entrada y el fluido sale de la cámara."
          ]
        },
        {
          "type": "paragraph",
          "text": "Las dos carreras se alternan sin interrupción y generan un flujo continuo pero pulsante. Una bomba de una sola cámara solo descarga durante la carrera de impulsión, por lo que las pulsaciones son marcadas; los diseños de doble diafragma o de varias cámaras descargan por turnos y producen un flujo mucho más uniforme."
        },
        {
          "type": "subheading",
          "title": "Componentes principales"
        },
        {
          "type": "list",
          "items": [
            "Diafragma: separa el fluido del accionamiento y se deforma repetidamente para variar el volumen de la cámara. Los materiales habituales son EPDM, FKM y PTFE, que se eligen según la agresividad química y la temperatura del fluido.",
            "Válvulas antirretorno: solo permiten el paso del fluido en un sentido. La estanqueidad de las válvulas influye directamente en el autocebado y en el caudal real.",
            "Cabezal de la bomba: la carcasa que forma la cámara y está en contacto con el fluido. Suele fabricarse en plásticos técnicos como PP, PPS o PVDF; las bombas industriales también pueden ser de aleación de aluminio o de acero inoxidable.",
            "Mecanismo de accionamiento: la fuente de potencia que mueve el diafragma; puede ser un motor con excéntrica o biela, aire comprimido o un electroimán. Cada tipo de accionamiento da lugar a un tipo distinto de bomba de diafragma."
          ]
        },
        {
          "type": "subheading",
          "title": "¿De qué depende el caudal?"
        },
        {
          "type": "paragraph",
          "text": "El caudal teórico es igual al volumen desplazado por carrera multiplicado por la frecuencia de carreras. Una vez instalada la bomba, el caudal real también depende de la altura de aspiración, la contrapresión de salida, el diámetro de los tubos y la viscosidad del fluido, y suele ser inferior al caudal libre indicado en la ficha técnica."
        },
        {
          "type": "paragraph",
          "text": "Por eso, al seleccionar una bomba hay que consultar su curva caudal-presión y comprobar cuánto caudal queda a la presión real del circuito, en lugar de fijarse solo en el caudal máximo."
        },
        {
          "type": "paragraph",
          "text": "A continuación se muestra la curva caudal-presión de la microbomba de diafragma para líquidos FOREACH DPL30. A presión cero, el caudal es algo superior a 300 mL/min; cuando la contrapresión de salida sube a 100 kPa, el caudal baja a unos 160 mL/min, aproximadamente la mitad. El caudal también disminuye cuando aumenta el vacío en la entrada (mayor altura de aspiración o más resistencia en la entrada)."
        },
        {
          "type": "figure",
          "src": dpl30CurveImage("es"),
          "alt": "Curva caudal-presión de la microbomba de diafragma para líquidos FOREACH DPL30",
          "width": 2080,
          "height": 668,
          "caption": "Curva caudal-presión de la DPL30: a la izquierda del eje horizontal, la presión negativa en la entrada; a la derecha, la presión positiva en la salida; en el eje vertical, el caudal.",
          "link": {
            "href": "/es/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
            "label": "Más información: cómo interpretar la curva caudal-presión de una bomba de diafragma"
          }
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "Para estimar la caída de presión en la tubería, utilice la ",
              "href": "/es/resources/calculators/fluid-resistance/",
              "label": "calculadora de resistencia al flujo",
              "suffix": " con el diámetro, la longitud y el caudal, y lea después en la curva el caudal correspondiente a esa presión."
            }
          ]
        }
      ]
    },
    {
      "title": "¿Qué tipos de bombas de diafragma existen?",
      "tocLabel": "Tipos principales",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Las bombas de diafragma se clasifican principalmente por el tipo de accionamiento y por su uso. En la industria, las más comunes son las bombas neumáticas de doble diafragma; en instrumentos y equipos, las bombas de diafragma eléctricas miniatura."
        },
        {
          "type": "table",
          "headers": ["Tipo", "Accionamiento", "Orden de caudal", "Usos habituales"],
          "rows": [
            ["Bomba neumática de doble diafragma (AODD)", "El aire comprimido mueve dos diafragmas de forma alterna", "Alto: de decenas a cientos de litros por minuto", "Química, pinturas, aguas residuales y lodos"],
            ["Bomba de diafragma eléctrica", "Un motor mueve el diafragma mediante una excéntrica o una biela", "Muy amplio: de unos mililitros a decenas de litros por minuto", "Transporte dentro de equipos, pulverización, depuración de agua"],
            ["Bomba de diafragma electromagnética / bomba dosificadora de diafragma", "Electroimán o motor, con longitud y frecuencia de carrera ajustables", "Bajo a medio, con prioridad en la precisión de dosificación", "Dosificación de reactivos en tratamiento de agua, dosificación de productos químicos"],
            ["Bomba de vacío / bomba de gas de diafragma", "Accionada por motor; transporta gases", "Se expresa como caudal de aspiración", "Filtración al vacío en laboratorio, muestreo de gases, aspiración de líquidos por vacío"],
            ["Bomba de diafragma miniatura", "Versión reducida de la bomba eléctrica, con motor de CC con o sin escobillas", "De unos pocos a varios cientos de mililitros por minuto (líquidos)", "Instrumentos analíticos, automatización de laboratorio, monitorización ambiental, circuitos de tinta"]
          ]
        },
        {
          "type": "subheading",
          "title": "Bombas neumáticas de doble diafragma (AODD)"
        },
        {
          "type": "paragraph",
          "text": "Una bomba AODD utiliza aire comprimido para mover dos diafragmas de forma alterna: mientras uno aspira, el otro impulsa. No necesita electricidad, por lo que es adecuada para zonas con requisitos de protección contra explosiones, y puede transportar lodos con partículas y líquidos de alta viscosidad. Como inconvenientes, requiere una fuente de aire comprimido, consume mucho aire y su escape es bastante ruidoso."
        },
        {
          "type": "figure",
          "src": `${imageBase}/aodd-tapflo-t50.jpg`,
          "alt": "Bomba neumática de doble diafragma Tapflo T50",
          "width": 900,
          "height": 480,
          "caption": "Bomba neumática de doble diafragma Tapflo T50. Imagen: Aleksander Ma, CC BY-SA 4.0, vía Wikimedia Commons."
        },
        {
          "type": "subheading",
          "title": "Bombas de diafragma eléctricas"
        },
        {
          "type": "paragraph",
          "text": "En una bomba de diafragma eléctrica, un motor imprime al diafragma un movimiento alternativo mediante una excéntrica o una biela. El caudal sigue a la velocidad del motor y puede ajustarse con la tensión de alimentación o con el controlador. Las bombas eléctricas grandes se usan en el transporte industrial y las pequeñas se integran en todo tipo de equipos."
        },
        {
          "type": "subheading",
          "title": "Bombas de diafragma electromagnéticas y bombas dosificadoras de diafragma"
        },
        {
          "type": "paragraph",
          "text": "Una bomba de diafragma electromagnética empuja el diafragma con un electroimán y completa una carrera con cada impulso eléctrico. La dosis se controla ajustando la frecuencia de impulsos y la longitud de carrera. Las bombas dosificadoras de diafragma priorizan la precisión de dosificación y se usan habitualmente para dosificar reactivos en el tratamiento de agua y productos químicos en procesos industriales."
        },
        {
          "type": "subheading",
          "title": "Bombas de vacío y bombas de gas de diafragma"
        },
        {
          "type": "paragraph",
          "text": "Estas bombas de diafragma transportan gases. La cámara no contiene aceite, por lo que el gas aspirado no se contamina con aceite. Son habituales en la filtración al vacío de laboratorio, el muestreo de gases y la aspiración de líquidos por vacío dentro de los equipos."
        },
        {
          "type": "figure",
          "src": dpgl800CurveImage("es"),
          "alt": "Curva caudal de gas-presión de la bomba de diafragma gas-líquido FOREACH DPGL800",
          "width": 2363,
          "height": 1100,
          "caption": "Curva caudal de gas-presión de la FOREACH DPGL800: a presión cero, el caudal de gas por cabezal es de unos 6 L/min; al aumentar el vacío, el caudal disminuye y se acerca a cero hacia -90 kPa, el vacío límite de la bomba."
        },
        {
          "type": "subheading",
          "title": "Bombas de diafragma miniatura"
        },
        {
          "type": "paragraph",
          "text": "Las bombas de diafragma miniatura son compactas, de bajo consumo y se alimentan con corriente continua, por lo que se integran con facilidad en instrumentos y equipos. Para seleccionarlas, conviene fijarse en tres diferencias:"
        },
        {
          "type": "list",
          "items": [
            "Bombas de líquido y bombas gas-líquido: las de líquido transportan líquidos para tareas como el lavado, la reposición y la circulación. Las gas-líquido pueden manejar gas y líquido a la vez y son adecuadas para la aspiración de residuos y la aspiración de líquidos por vacío.",
            "Motor con escobillas o sin escobillas: el motor sin escobillas tiene mayor vida útil y es más silencioso, ideal para el funcionamiento continuo prolongado; el motor con escobillas es más sencillo y económico, adecuado para un uso intermitente.",
            "Presión estándar o alta presión: los circuitos con una contrapresión de salida elevada, como los de tubos finos, líneas largas o boquillas, requieren un modelo de alta presión."
          ]
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "Las microbombas de diafragma FOREACH siguen estas mismas tres distinciones: ",
              "href": "/es/products/pumps/miniature-diaphragm-pumps/dpl30-bb/",
              "label": "DPL30",
              "suffix": " (300 mL/min) y "
            },
            {
              "href": "/es/products/pumps/miniature-diaphragm-pumps/dpl60-bb/",
              "label": "DPL60",
              "suffix": " (600 mL/min) son bombas de líquidos de presión estándar, con presión nominal de 100 kPa; "
            },
            {
              "href": "/es/products/pumps/miniature-diaphragm-pumps/dpl30h-bs/",
              "label": "DPL30H",
              "suffix": " es la bomba de líquidos de alta presión, con 600 kPa nominales. Las tres series se ofrecen con motor con o sin escobillas. "
            },
            {
              "href": "/es/products/pumps/miniature-diaphragm-pumps/dpgl800-bs/",
              "label": "DPGL800",
              "suffix": " es una bomba de diafragma gas-líquido de 24 V sin escobillas, con 6 L/min de gas sin carga por cabezal, para aspiración de residuos y aspiración por vacío; no está pensada para bombear líquido al 100 %."
            }
          ]
        },
        {
          "type": "figure",
          "src": dpl30Card,
          "alt": "Microbomba de diafragma para líquidos FOREACH DPL30",
          "width": 2000,
          "height": 1500,
          "caption": "Microbomba de diafragma para líquidos FOREACH DPL30."
        },
        {
          "type": "figure",
          "src": dpgl800Card,
          "alt": "Bomba miniatura de diafragma gas-líquido FOREACH DPGL800",
          "width": 1500,
          "height": 1500,
          "caption": "Bomba miniatura de diafragma gas-líquido FOREACH DPGL800."
        }
      ]
    },
    {
      "title": "Ventajas y limitaciones de las bombas de diafragma",
      "tocLabel": "Ventajas y limitaciones",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Las principales ventajas de la bomba de diafragma son un sellado fiable y la capacidad de autocebado; sus principales limitaciones, un caudal pulsante que además varía con la contrapresión. Conviene valorar ambos aspectos antes de elegir."
        },
        {
          "type": "subheading",
          "title": "Ventajas"
        },
        {
          "type": "list",
          "items": [
            "Sin sellos dinámicos, bajo riesgo de fugas: el diafragma separa el fluido del accionamiento, de modo que no hay juntas de eje ni otros puntos propensos a fugas.",
            "Autocebado: al arrancar, la bomba evacua el aire de la línea de entrada y después aspira el líquido, sin necesidad de cebado previo. Eso sí, la altura de aspiración es limitada: en las microbombas suele ser de solo unos metros de columna de agua.",
            "La mayoría admite una marcha en seco breve: una falta temporal de líquido en la línea difícilmente la daña; consulte los límites en el manual del producto.",
            "Maneja gases y mezclas gas-líquido: los modelos gas-líquido sirven directamente para la aspiración de residuos y la aspiración de líquidos por vacío.",
            "Materiales en contacto con el fluido seleccionables: el diafragma, las válvulas y el cabezal pueden elegirse según el fluido, incluidos ácidos, bases, disolventes y todo tipo de reactivos.",
            "Bajo cizallamiento: agita y cizalla el fluido menos que una bomba de engranajes o centrífuga, lo que la hace adecuada para fluidos sensibles al cizallamiento."
          ]
        },
        {
          "type": "subheading",
          "title": "Limitaciones"
        },
        {
          "type": "list",
          "items": [
            "Caudal pulsante: en los circuitos que exigen un flujo estable hay que añadir un amortiguador de pulsaciones o elegir una bomba de varias cámaras.",
            "El caudal varía con la contrapresión: cuanto más finos y largos son los tubos, menor es el caudal real. Para una dosificación precisa son más adecuadas las bombas de pistón o de jeringa.",
            "Ruido y vibración: el montaje y el aislamiento de vibraciones influyen notablemente en el ruido del equipo.",
            "Desgaste del diafragma y las válvulas: son piezas de desgaste cuya vida útil depende de las condiciones de trabajo y del tipo de motor.",
            "Las bombas miniatura son sensibles a las partículas y a la alta viscosidad: sus válvulas tienen holguras pequeñas, por lo que con fluidos con partículas, muy viscosos o que se vaporizan con facilidad hay que confirmar antes su idoneidad."
          ]
        }
      ]
    },
    {
      "title": "¿Dónde se usan las bombas de diafragma?",
      "tocLabel": "Aplicaciones",
      "blocks": [
        {
          "type": "paragraph",
          "text": "En la industria, las bombas AODD se utilizan sobre todo para transportar productos químicos, pinturas y aguas residuales. En instrumentos y equipos automatizados, las bombas de diafragma miniatura se encargan principalmente del lavado, la reposición, la circulación y la aspiración de residuos:"
        },
        {
          "type": "table",
          "headers": ["Sector", "Función de la bomba de diafragma"],
          "rows": [
            ["Instrumentos analíticos", "Suministro de solución de lavado, reposición, circulación y aspiración de residuos; lavado de aguja en cromatografía líquida"],
            ["Monitorización ambiental", "Toma de muestras de agua, transporte de reactivos y drenaje; evacuación de condensados en el pretratamiento de gases"],
            ["Automatización de laboratorio", "Lavado de placas en lavadores de microplacas; limpieza de equipos de preparación de muestras"],
            ["Ciencias de la vida", "Cambio de medio en cultivo celular, lavado automatizado y gestión de residuos"],
            ["Biología sintética", "Alimentación y retirada de residuos en microbiorreactores"],
            ["Diagnóstico in vitro (IVD)", "Lavado y residuos en analizadores de bioquímica, hematología, inmunoensayo y coagulación"],
            ["Impresión y circuitos de tinta", "Circulación de suministro y retorno de tinta para evitar la sedimentación de la tinta blanca y de otras tintas"]
          ]
        },
        {
          "type": "paragraph",
          "text": "Dentro de un mismo equipo, el lavado, la reposición y la aspiración de residuos suelen exigir cosas distintas a la bomba. Por ejemplo, en el lavado importan el caudal y la presión, mientras que en la aspiración de residuos lo decisivo es poder manejar mezclas gas-líquido. Lo mejor es seleccionar la bomba para cada tarea por separado."
        }
      ]
    },
    {
      "title": "¿Cómo elegir una bomba de diafragma?",
      "tocLabel": "Criterios de selección",
      "blocks": [
        {
          "type": "paragraph",
          "text": "No elija una bomba de diafragma solo por el caudal máximo de la ficha técnica. Parta del fluido y del circuito real y compruebe los siguientes puntos por orden:"
        },
        {
          "type": "list",
          "ordered": true,
          "items": [
            "¿Cuál es el fluido? Líquido, gas o mezcla gas-líquido; si es corrosivo o contiene partículas; su viscosidad y su temperatura. Esto determina el tipo de bomba y los materiales en contacto con el fluido.",
            "¿Qué caudal se necesita? Calcúlelo en el punto de trabajo real tras la instalación y deje margen, en lugar de comparar directamente el caudal libre de las fichas técnicas.",
            "¿Qué altura de aspiración y qué contrapresión hay? La altura que debe aspirar la entrada y la resistencia en la salida determinan si se necesita un modelo estándar o de alta presión.",
            "¿Son compatibles los materiales en contacto con el fluido? Compruebe por separado el diafragma, las válvulas y el cabezal, no solo uno de ellos.",
            "Motor y control: con o sin escobillas, tensión de alimentación y si se necesita regulación de velocidad y señal de estado.",
            "Régimen de trabajo y vida útil: funcionamiento continuo o intermitente y horas de uso diarias; estime la vida útil a partir de las condiciones reales.",
            "Instalación y tubos: ruido, vibración, pulsaciones, diámetro de los tubos y si el depósito está ventilado."
          ]
        },
        {
          "type": "subheading",
          "title": "Materiales en contacto con el fluido"
        },
        {
          "type": "paragraph",
          "text": "Materiales habituales en contacto con el fluido en bombas de diafragma (orientación general: confirme cada fluido según su composición, concentración y temperatura)"
        },
        {
          "type": "table",
          "headers": ["Material", "Piezas habituales", "Puntos fuertes", "Precauciones"],
          "rows": [
            ["EPDM (caucho de etileno-propileno-dieno)", "Diafragma, válvulas", "Resiste agua, ácidos y bases diluidos y alcoholes; adecuado para medios acuosos", "No resiste aceites minerales, combustibles ni disolventes hidrocarbonados"],
            ["FKM (fluoroelastómero)", "Diafragma, válvulas", "Resiste aceites, combustibles y la mayoría de los ácidos", "No resiste cetonas como la acetona, aminas ni bases fuertes"],
            ["FFKM (perfluoroelastómero)", "Válvulas, juntas", "Resistencia química cercana al PTFE, conservando la elasticidad del caucho", "Coste elevado"],
            ["PTFE (politetrafluoroetileno)", "Diafragma", "Muy inerte; resiste la mayoría de los ácidos y bases fuertes y de los disolventes orgánicos", "Menos elástico que el caucho"],
            ["PPS (polisulfuro de fenileno)", "Cabezal de la bomba", "Resistente al calor y a los productos químicos; buena estabilidad dimensional", "Compatibilidad solo limitada con ácido clorhídrico concentrado, peróxido de hidrógeno y medios similares"],
            ["PP (polipropileno)", "Cabezal de la bomba", "Resiste ácidos, bases y disolventes orgánicos comunes; bajo coste", "Menor límite de temperatura; no resiste xileno, diclorometano ni disolventes similares"],
            ["PVDF (fluoruro de polivinilideno)", "Cabezal de la bomba", "Resistente a productos químicos, con buenas propiedades mecánicas", "Compatibilidad solo limitada con cetonas como la acetona"]
          ]
        },
        {
          "type": "paragraph",
          "text": "Las microbombas de diafragma para líquidos FOREACH (DPL30, DPL60 y DPL30H) llevan cabezal de PPS y ofrecen dos combinaciones de materiales en contacto con el fluido: diafragma de EPDM con válvulas de EPDM, o diafragma de PTFE con válvulas de FFKM. Para agua purificada, empiece evaluando la combinación de EPDM; para reactivos y líquidos de limpieza, compruebe ambas combinaciones según la composición, la concentración y la temperatura reales, incluidos los fluidos que se usen en la limpieza."
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "Consulte cada fluido en la ",
              "href": "/es/resources/material-compatibility/",
              "label": "tabla de compatibilidad de materiales",
              "suffix": " para PPS, PTFE y otros materiales; para elegir entre las dos combinaciones, vea "
            },
            {
              "href": "/es/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
              "label": "¿Qué materiales ofrecen las bombas miniatura de diafragma?",
              "suffix": "."
            }
          ]
        },
        {
          "type": "paragraph",
          "text": "En la fase de prototipo, conviene medir el caudal y la presión en el circuito real y confirmar los resultados antes de cerrar el diseño."
        }
      ]
    },
    {
      "title": "Resumen",
      "tocLabel": "Resumen",
      "blocks": [
        {
          "type": "paragraph",
          "text": "La bomba de diafragma transporta fluidos mediante un diafragma de movimiento alternativo y dos válvulas antirretorno. Sella de forma fiable, es autocebante y se utiliza ampliamente, desde el transporte industrial hasta los circuitos de fluidos de instrumentos. Al seleccionarla, defina primero el fluido y el punto de trabajo real y, después, confirme los materiales, el motor y las condiciones de instalación."
        },
        {
          "type": "paragraph",
          "text": "Si está eligiendo una bomba de diafragma miniatura para su equipo, FOREACH ofrece bombas de diafragma miniatura para líquidos y gas-líquido. Envíenos el fluido, el caudal objetivo y la configuración del circuito, y nuestros ingenieros le ayudarán a determinar el punto de trabajo y el modelo adecuado."
        },
        {
          "type": "subheading",
          "title": "Lecturas recomendadas"
        },
        {
          "type": "links",
          "ordered": true,
          "items": [
            {
              "href": "/es/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide/",
              "label": "Cómo interpretar la curva caudal-presión de una bomba de diafragma"
            },
            {
              "href": "/es/resources/technical-articles/micro-diaphragm-pump-materials-selection/",
              "label": "¿Qué materiales ofrecen las bombas miniatura de diafragma y qué considerar al elegirlos?"
            },
            {
              "href": "/es/resources/technical-articles/diaphragm-pump-vs-peristaltic-pump/",
              "label": "Bomba de diafragma miniatura o peristáltica: ventajas, desventajas y selección para instrumentos"
            },
            {
              "href": "/es/resources/technical-articles/miniature-diaphragm-pump-flow-pulsation-reduction/",
              "label": "Pulsaciones de caudal en microbombas de diafragma: medición y medidas de reducción"
            },
            {
              "href": "/es/resources/technical-articles/self-priming-miniature-liquid-diaphragm-pump-selection/",
              "label": "Selección de una microbomba de diafragma autocebante para líquidos: altura, tiempo y arranque en seco o húmedo"
            },
            {
              "href": "/es/resources/technical-articles/brushed-vs-brushless-diaphragm-pump-3000h-10000h/",
              "label": "¿Por qué una bomba de diafragma con escobillas dura unas 3000 horas y una sin escobillas unas 10 000 horas?"
            }
          ]
        }
      ]
    }
  ],
  "faqTitle": "Preguntas frecuentes",
  "faqItems": [
    {
      "question": "¿Puede funcionar en seco una bomba de diafragma?",
      "answer": "La mayoría de las bombas de diafragma no se dañan por una marcha en seco breve, ya que no tienen sellos dinámicos lubricados por el líquido. Sin embargo, la marcha en seco prolongada acelera el desgaste del diafragma y de las válvulas; consulte los límites en el manual del producto."
    },
    {
      "question": "¿Es autocebante una bomba de diafragma?",
      "answer": "Sí. Puede aspirar el líquido aunque la línea de entrada contenga aire, pero la altura de aspiración es limitada. En las microbombas de diafragma para líquidos FOREACH es de 6 mH₂O en la DPL30 y de 3 mH₂O en la DPL60 y la DPL30H. Si el autocebado empeora, las causas habituales son una entrada de aire en la aspiración o el desgaste de las válvulas."
    },
    {
      "question": "¿Por qué el caudal es menor que el nominal una vez instalada la bomba?",
      "answer": "El caudal nominal suele ser el caudal libre, sin contrapresión. Una vez instalada la bomba, el diámetro y la longitud de los tubos, la altura de aspiración y la contrapresión reducen el caudal; un depósito sin ventilación o una entrada de aire en la aspiración también lo disminuyen."
    },
    {
      "question": "¿Bomba de diafragma o bomba peristáltica?",
      "answer": "La bomba peristáltica impulsa el fluido comprimiendo un tubo flexible; el caudal sigue directamente a la velocidad de giro, pero el tubo debe sustituirse periódicamente. La bomba de diafragma no requiere cambios de tubo y tiene un buen autocebado, pero su caudal es pulsante. Las peristálticas se usan más cuando se requiere dosificación; las de diafragma se prefieren para el transporte, el lavado y la aspiración de residuos con poco mantenimiento a largo plazo."
    },
    {
      "question": "¿Qué diferencia hay entre una bomba de diafragma neumática y una eléctrica?",
      "answer": "La bomba neumática se acciona con aire comprimido, ofrece caudales altos y se usa sobre todo en el transporte industrial. La eléctrica se acciona con un motor, puede fabricarse en tamaños muy pequeños y es fácil de controlar, por lo que es adecuada para integrarse en instrumentos y equipos."
    },
    {
      "question": "¿Sirve una bomba de diafragma para dosificar con precisión?",
      "answer": "El caudal de una bomba de diafragma convencional varía con la contrapresión, por lo que no es adecuada para una dosificación de alta precisión. Para dosificar con precisión, elija una bomba dosificadora de diafragma, una bomba de pistón o una bomba de jeringa."
    },
    {
      "question": "¿Cuánto dura una bomba de diafragma?",
      "answer": "Depende sobre todo del tipo de motor y de las condiciones de trabajo. En las microbombas de diafragma FOREACH, la vida útil nominal es de unas 3000 horas en las versiones con escobillas y de unas 10 000 horas en las versiones sin escobillas; el funcionamiento continuo, una contrapresión alta y las temperaturas elevadas acortan la vida útil real."
    }
  ],
  "cta": {
    "title": "¿Necesita una bomba de diafragma miniatura para su equipo?",
    "description": "Indíquenos el fluido, el caudal objetivo, la altura de aspiración, la contrapresión y la configuración del circuito. Los ingenieros de FOREACH le ayudarán a determinar el punto de trabajo y el modelo adecuado.",
    "contactLabel": "Contactar con un ingeniero",
    "productsLabel": "Ver bombas de diafragma miniatura",
    "productsHref": "/es/products/pumps/miniature-diaphragm-pumps/"
  }
} satisfies DiaphragmPumpEngineeringArticleCopy;
