import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";
import { medicalPvcTubingDiameters, medicalPvcTubingImages, medicalPvcTubingSizeRows } from "./medical-pvc-tubing.shared";

/* =========================================================
   Tubos de PVC de grado médico — español
   Adaptado para lectores internacionales (contexto EU GMP /
   FED-STD-209E en lugar de la normativa china); no es una
   traducción literal. Los enlaces usan rutas del sitio chino y
   localizeTubingArticle añade el prefijo /es; /about/... va completo.
========================================================= */

const photos = {
  line: { ...medicalPvcTubingImages.line, alt: "Operario con traje de sala limpia y capucha ajustando el panel de control de una extrusora de tubos en la sala limpia ISO 8 de FOREACH" },
  gauge: { ...medicalPvcTubingImages.gauge, alt: "Medidor de diámetro en línea sin contacto en una línea de extrusión; el tubo transparente pasa por la ventana de medición entre rodillos guía" },
  resin: { ...medicalPvcTubingImages.resin, alt: "Secadores de material y cargadores por vacío dentro de la sala limpia" },
  die: { ...medicalPvcTubingImages.die, alt: "Detalle del cabezal de extrusión y la entrada de calibración; el tubo transparente sale de la boquilla y entra en el baño de agua" },
  tank: { ...medicalPvcTubingImages.tank, alt: "Tina de enfriamiento y calibración en la sala limpia, con difusores de aire e iluminación en el techo" },
};

export const medicalPvcTubingMentionsEs = ["tubos de PVC de grado médico", "tolerancias dimensionales", "sala limpia ISO 8", "ISO 13485"];

export const medicalPvcTubingCopyEs: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "Tubos de PVC de grado médico: cómo evaluar tolerancias, fabricación en sala limpia y certificaciones",
    seoTitle: "Tubos de PVC de grado médico: tolerancias, sala limpia ISO 8 y certificaciones | FOREACH",
    seoDescription: "Qué distingue un tubo de PVC de grado médico de una manguera de vinilo de ferretería: propiedades, tolerancias de DI y DE, extrusión en sala limpia ISO 8, ISO 13485 y RoHS.",
    coverImage: photos.line.src,
    coverAlt: photos.line.alt,
  },
  deck: "Los tubos de PVC de grado médico y las mangueras de vinilo de uso general parten del mismo polímero. Lo que los separa es el compuesto y el plastificante, la consistencia dimensional, el entorno de fabricación y la documentación de cada lote. Esta guía repasa cuatro comprobaciones —propiedades del material, precisión dimensional, fabricación en sala limpia y certificaciones— y muestra cómo FOREACH extruye e inspecciona sus tubos de PVC en una sala limpia ISO 8 (clase 100 000).",
  leadBlocks: [
    { type: "paragraph", text: "Un tubo de PVC de grado médico es un tubo flexible de policloruro de vinilo que se usa en dispositivos médicos, sistemas de diagnóstico in vitro (IVD) e instrumentos analíticos, sobre todo en líneas de lavado, reactivos, muestras y residuos, y en líneas de gas de baja presión. Químicamente pertenece a la misma familia que la manguera transparente de vinilo que se vende en ferreterías y tiendas de acuarios. La diferencia está en el grado de control sobre el compuesto, las dimensiones, el entorno de fabricación y la documentación." },
    { type: "paragraph", text: "Al especificarlo, conviene revisar cuatro aspectos por orden: si el material es adecuado para el fluido y la temperatura; si las tolerancias de diámetro interior (DI) y exterior (DE) mantienen la estanqueidad de los racores y un caudal uniforme entre equipos; si el entorno de fabricación evita partículas y residuos en el interior del tubo; y si el proveedor respalda cada lote con un sistema de gestión certificado, informes de cumplimiento y registros de trazabilidad. Al final encontrará una lista de preguntas para adjuntar a su solicitud de oferta." },
  ],
  sections: [
    { title: "Tubo de PVC de grado médico frente a manguera de vinilo de uso general", tocLabel: "Médico frente a general", blocks: [
      { type: "paragraph", text: "Ambos son PVC plastificado. La pregunta no es si el tubo es de PVC, sino si la formulación está fijada, el proceso está controlado y un problema puede rastrearse hasta su origen. La tabla resume las diferencias habituales." },
      { type: "table", headers: ["Aspecto", "Manguera de vinilo de uso general", "Tubo para dispositivos médicos e instrumentos"], rows: [
        ["Materia prima", "Puede contener material reciclado o remolido; la composición entre lotes es difícil de rastrear", "Compuesto virgen con formulación fija y lotes de resina registrados"],
        ["Plastificante", "Con frecuencia DEHP u otros ortoftalatos, rara vez declarados", "Sistema plastificante declarado; informes de ensayo de sustancias restringidas disponibles"],
        ["Control dimensional", "Muestreo puntual; las fichas suelen indicar solo medidas nominales", "DE medido en línea durante la extrusión; DI y pared verificados por lote frente a tolerancias declaradas"],
        ["Entorno de fabricación", "Nave de producción convencional", "Extrusión en sala limpia que mantiene partículas, fibras y aceite fuera del tubo"],
        ["Documentación", "Normalmente sin registros de lote", "Fabricado bajo un sistema de gestión de calidad certificado, con registros trazables de material, proceso e inspección"],
        ["Usos típicos", "Jardín, desagües, acuarios, conducción general de agua", "Líneas de fluidos y gases en dispositivos médicos, instrumentos IVD y analíticos y automatización de laboratorio"],
      ] },
      { type: "paragraph", text: "«Grado médico» suele implicar además datos de biocompatibilidad del compuesto, como ensayos USP Clase VI o ISO 10993. Esos datos corresponden a una formulación concreta, no al PVC como material. Si el tubo entra en contacto con el paciente o con soluciones de fármacos, o forma parte de un producto sanitario regulado, solicite los datos del grado exacto y complete la evaluación a nivel de equipo." },
    ] },
    { title: "Propiedades del tubo de PVC", tocLabel: "Propiedades", blocks: [
      { type: "paragraph", text: "El tubo de PVC es transparente, flexible, poco permeable a los gases y económico. Permite ver el líquido y las burbujas en la línea, por lo que encaja bien con fluidos acuosos a temperatura ambiente y baja presión. Sus límites son un rango de temperatura moderado, una mala resistencia a la mayoría de los disolventes orgánicos y un plastificante que puede migrar o liberarse." },
      { type: "table", headers: ["Propiedad", "Tubo de PVC FOREACH (valor típico)", "Qué implica en el diseño"], rows: [
        ["Dureza (Shore A)", "55A / 65A", "55A es más blando y entra mejor en las espigas; 65A mantiene la forma y resiste el colapso por vacío"],
        ["DI / DE", `${medicalPvcTubingDiameters.inner} mm / ${medicalPvcTubingDiameters.outer} mm`, "Un mismo DI se ofrece con varios espesores de pared: especifique DI × DE, no solo la «medida»"],
        ["Temperatura de servicio", "-42 a 75 °C", "Valor típico; confírmelo con su fluido, presión y racores"],
        ["Temperatura de fragilidad", "-46 °C", "Deje margen en ambientes fríos"],
        ["Resistencia a la tracción", "14.3 MPa", "Adecuado para líneas de baja presión"],
        ["Densidad / absorción de agua", "1.18 g/cm³ / 0.12%", "—"],
      ] },
      { type: "paragraph", text: "El PVC solo se vuelve flexible con un plastificante, y las formulaciones tradicionales usan ortoftalatos como el DEHP. La Directiva Delegada (UE) 2015/863 —conocida como RoHS 3— añadió DEHP, BBP, DBP y DIBP a la lista de sustancias restringidas de RoHS con un límite del 0.1% en peso en materiales homogéneos. Para productos sanitarios (incluidos los de diagnóstico in vitro) e instrumentos de vigilancia y control, la restricción se aplica desde el 22 de julio de 2021. Si su equipo se comercializa en la UE, el informe RoHS del tubo debe cubrir las cuatro sustancias." },
      { type: "paragraph", text: "El PVC plastificado también puede retener componentes del fluido. Fármacos lipófilos como la nitroglicerina y el diazepam se absorben en los tubos de PVC, y proteínas como la insulina se adsorben en la pared. Con reactivos, muestras o patrones sensibles a la concentración, compare la concentración antes y después de la línea con su fluido real; con disolventes orgánicos, pase a tubos fluoropoliméricos como PTFE o FEP." },
      { type: "notice", label: "Documentación FOREACH", text: "FOREACH puede facilitar informes de ensayo RoHS de sus tubos de PVC por referencia. Si necesita confirmar por separado los resultados de DEHP, BBP, DBP y DIBP, indíquelo en su consulta." },
      { type: "links", items: [
        { label: "Tubos PVC: dureza, recorrido y racores para tubos flexibles", href: "/resources/technical-articles/what-is-pvc-tubing/" },
      ] },
    ] },
    { title: "Precisión dimensional: por qué importan las tolerancias de DI y DE", tocLabel: "Precisión dimensional", blocks: [
      { type: "paragraph", text: "En un tubo flexible, precisión significa constancia de DI, DE, espesor de pared, concentricidad y ovalidad, además de la longitud de corte en tubos cortados a medida. Dos rollos con la misma medida nominal pueden comportarse de forma distinta en el mismo instrumento si sus dimensiones reales varían." },
      { type: "list", items: [
        "Estanqueidad y retención en el racor: los racores de espiga sellan por la expansión elástica del DI y la pared del tubo; los racores instantáneos que sujetan el DE necesitan un DE dentro de tolerancia. Un tubo sobredimensionado fuga o se suelta; uno infradimensionado cuesta montarlo y daña el extremo.",
        "Caudal uniforme: en flujo laminar, la resistencia es inversamente proporcional a la cuarta potencia del DI. Una pequeña desviación del DI se convierte en una desviación de resistencia mucho mayor, y el caudal, el tiempo de cebado y la eficacia del lavado varían de un equipo a otro.",
        "Pared uniforme: un tubo con pared desigual u ovalado colapsa localmente con vacío y se acoda con más facilidad en las curvas.",
      ] },
      { type: "formula", expression: "R = 128μL / (πd⁴); con una desviación del DI de ±5%, la resistencia varía aprox. −18% a +23%", note: "R = resistencia hidráulica, μ = viscosidad dinámica, L = longitud, d = diámetro interior (flujo laminar, tubo circular rígido). En un tubo de 0.8 mm de DI, ±0.05 mm cambian la resistencia aprox. −22% a +29%. Cuanto menor es el diámetro, más pesa una misma tolerancia absoluta." },
      { type: "figure", ...photos.gauge, caption: "Medidor de diámetro en línea en una línea de extrusión de FOREACH: el tubo pasa de forma continua por la ventana de medición y el DE se mide durante la producción." },
      { type: "paragraph", text: "Las líneas de extrusión de tubo de FOREACH incorporan un medidor de diámetro en línea sin contacto (Proton Products InteliSENS serie DGk). Mide el DE en varios ejes a la vez con óptica de estado sólido LED/CCD, calcula el diámetro medio y la ovalidad, y puede emitir una alarma cuando el DE sale de la banda de tolerancia. A diferencia del muestreo con la línea parada, la medición en línea cubre toda la longitud de cada rollo." },
      { type: "paragraph", text: "Un medidor de DE no ve el interior del tubo. El DI y el espesor de pared se miden fuera de línea sobre secciones cortadas; el laboratorio de calidad de FOREACH dispone de un instrumento de medición por imagen y de sistemas de visión para la inspección dimensional. Cada referencia tiene tolerancias de DI/DE y un plan de muestreo definidos, que podemos facilitar junto con la especificación." },
      { type: "links", items: [
        { label: "Compruebe DI y caída de presión con la calculadora de resistencia de fluidos", href: "/resources/calculators/fluid-resistance/" },
        { label: "Cómo calcular la relación de expansión en racores de espiga", href: "/resources/technical-articles/barbed-fitting-expansion-ratio/" },
      ] },
    ] },
    { title: "Fabricación en sala limpia: qué significa ISO 8 (clase 100 000)", tocLabel: "Sala limpia", blocks: [
      { type: "paragraph", text: "Muchas fichas de proveedores siguen hablando de «clase 100 000». Esa denominación procede de la norma federal estadounidense FED-STD-209E, anulada en 2001. La norma vigente es la ISO 14644-1, y la clase equivalente es ISO 8: no más de 3 520 000 partículas ≥0.5 µm por metro cúbico de aire. El aire exterior de una ciudad típica contiene unos 35 millones, aproximadamente ISO 9." },
      { type: "table", headers: ["Clase ISO 14644-1", "Antigua clase FED-STD-209E", "Máx. partículas ≥0.5 µm por m³"], rows: [
        ["ISO 5", "Clase 100", "3 520"],
        ["ISO 6", "Clase 1 000", "35 200"],
        ["ISO 7", "Clase 10 000", "352 000"],
        ["ISO 8", "Clase 100 000", "3 520 000"],
        ["ISO 9", "— (aprox. aire ambiente normal)", "35 200 000"],
      ] },
      { type: "figure", ...photos.line, caption: "Zona de extrusión en sala limpia de FOREACH: un operario con traje con capucha y mascarilla ajusta los parámetros en el panel de control de la extrusora." },
      { type: "paragraph", text: "FOREACH opera sus líneas de extrusión de tubo dentro de una sala limpia ISO 8 (clase 100 000). El aire impulsado con filtros HEPA, la cascada de presiones, la vestimenta específica y el control de la entrada de materiales mantienen partículas, fibras, cabellos y aceite lejos del fundido, de la pared del tubo y de los extremos abiertos. En un tubo transparente, esa contaminación se ve como puntos negros o residuos en el interior, o más tarde como fondo de partículas en su ensayo." },
      { type: "paragraph", text: "Conviene tener claro el alcance: una sala limpia controla la contaminación por partículas y microorganismos durante la fabricación. No hace estéril el tubo ni dice nada sobre su biocompatibilidad. Las líneas que deben ser estériles necesitan una etapa de esterilización validada; la biocompatibilidad depende de los datos de ensayo del compuesto y del tubo acabado." },
      { type: "paragraph", text: "Como referencia, ISO 8 coincide con el límite de partículas en reposo del grado D del Anexo 1 de las GMP de la UE, el grado que la industria farmacéutica usa para sus etapas menos críticas, como la manipulación de componentes después del lavado. Una sala limpia ISO 8 para tubos es, por tanto, un entorno controlado para mantener limpio el producto, no una zona de procesado aséptico." },
    ] },
    { title: "Cómo extruye FOREACH sus tubos de PVC", tocLabel: "Proceso de extrusión", blocks: [
      { type: "paragraph", text: "El tubo de PVC se fabrica fundiendo la granza del compuesto en una extrusora, dando forma de tubo al fundido en la boquilla y, después, enfriándolo, calibrándolo, midiéndolo y enrollándolo. En las líneas de FOREACH, todos los pasos siguientes se realizan dentro de la sala limpia:" },
      { type: "list", ordered: true, items: [
        "Manipulación del material: la granza se seca cuando el material lo requiere y un cargador por vacío la transporta en circuito cerrado hasta la tolva de la extrusora, evitando el polvo de la alimentación manual con sacos abiertos.",
        "Extrusión: el husillo funde y homogeneiza el compuesto, y el fundido toma forma de tubo en la boquilla. Las temperaturas y la velocidad del husillo se ajustan en el panel de control, y los datos clave del proceso se registran en el MES.",
        "Enfriamiento y calibración: el tubo entra en una tina de calibración refrigerada por agua, donde se fijan su DI y DE finales.",
        "Medición en línea: el tubo acabado pasa de forma continua por el medidor de diámetro, que mide el DE y la ovalidad en tiempo real y da una alarma si se salen de los límites.",
        "Arrastre, bobinado e inspección: el tubo se enrolla o se corta a medida, se comprueban fuera de línea el DI, el espesor de pared y el aspecto, y se embala.",
      ] },
      { type: "figure", ...photos.resin, caption: "Secadores y cargadores por vacío dentro de la sala limpia alimentan la extrusora a través de conductos cerrados." },
      { type: "figure", ...photos.die, caption: "Boquilla de extrusión y entrada de calibración: el tubo sale de la boquilla y entra directamente en el baño de enfriamiento." },
      { type: "figure", ...photos.tank, caption: "Tina de enfriamiento y calibración en la sala limpia; el tubo se enfría aquí antes de la medición y el arrastre." },
    ] },
    { title: "Certificaciones y documentación: SGC, informes de cumplimiento y trazabilidad por lote", tocLabel: "Certificaciones", blocks: [
      { type: "paragraph", text: "Cuando un proveedor dice que su tubo está «certificado», pregunte qué se certificó exactamente. Un certificado del sistema de gestión de calidad demuestra que los procesos de la empresa están controlados; un informe de cumplimiento demuestra que las sustancias restringidas del material están por debajo de los límites legales; los registros de lote permiten rastrear un problema hasta su causa. Ninguno sustituye a los demás." },
      { type: "table", headers: ["Nivel", "Qué demuestra", "Disponible en FOREACH"], rows: [
        ["Sistema de gestión de calidad", "Diseño, compras, producción, inspección y entrega están controlados", "Certificación ISO 9001 e ISO 13485"],
        ["Cumplimiento del material", "Las sustancias restringidas están por debajo de los límites reglamentarios", "Informes RoHS y de otros requisitos por referencia"],
        ["Datos de biocompatibilidad", "El compuesto o el tubo acabado superó ensayos USP Clase VI, ISO 10993 u otros similares", "Se confirman por proyecto bajo petición"],
        ["Trazabilidad por lote", "Se pueden recuperar el lote de resina, los parámetros de proceso y los resultados de inspección", "Datos clave de material, proceso e inspección registrados en PDM, ERP y MES"],
      ] },
      { type: "paragraph", text: "La ISO 13485 es la norma de gestión de calidad del sector de los productos sanitarios. Certifica el sistema del proveedor —cómo se gestionan el diseño, las compras, la producción y los cambios—, no un tubo concreto. No convierte el tubo en un producto sanitario ni sustituye a los ensayos de biocompatibilidad." },
      { type: "links", items: [
        { label: "Sistema de calidad de FOREACH", href: "/es/about/quality/" },
      ] },
    ] },
    { title: "7 preguntas para un proveedor de tubos de PVC de grado médico", tocLabel: "Lista para el proveedor", blocks: [
      { type: "paragraph", text: "Envíe estas preguntas junto con su solicitud de oferta. Cuanto más concretas sean las respuestas, más corta será la cualificación." },
      { type: "list", ordered: true, items: [
        "¿El compuesto es material virgen? ¿Nos avisarán antes de cambiar la formulación o el proveedor de resina?",
        "¿Qué plastificante utilizan? ¿Pueden facilitar informes de ensayo de sustancias restringidas, y su informe RoHS cubre DEHP, BBP, DBP y DIBP?",
        "¿Cuáles son las tolerancias de DI, DE y espesor de pared? ¿Se mide el DE en línea y cómo se muestrean el DI y la pared?",
        "¿Dónde se extruye, corta y embala el tubo? ¿Qué clase tiene la sala limpia y se monitoriza?",
        "¿Qué certificados de sistema de calidad tienen? ¿Hay datos USP Clase VI o ISO 10993 del compuesto o del tubo acabado?",
        "¿Cada envío puede rastrearse hasta el lote de resina, la fecha de producción y los registros de inspección?",
        "¿Pueden enviar muestras para ensayarlas con nuestros fluidos, temperaturas y racores reales?",
      ] },
      { type: "paragraph", text: "Puede plantear todas estas preguntas directamente a FOREACH; nuestros ingenieros confirmarán qué documentos están disponibles para cada referencia." },
    ] },
    { title: "Medidas y opciones a medida de los tubos de PVC FOREACH", tocLabel: "Medidas FOREACH", blocks: [
      { type: "paragraph", text: "Los tubos de PVC FOREACH se ofrecen en dureza 55A y 65A. Puede comprarlos por rollo, cortados a medida según su plano o como conjuntos de tubo con racores. La tabla resume las medidas disponibles actualmente." },
      { type: "table", headers: ["Dureza", "Referencias", "Rango de DI (mm)", "Rango de DE (mm)"], rows: medicalPvcTubingSizeRows },
      { type: "paragraph", text: "Al hacer un pedido o crear una lista de materiales, conserve la referencia completa, la dureza, DI × DE y la unidad de embalaje. Para cortes a medida, conjuntos o medidas especiales, envíe también el fluido, la temperatura, la presión o el vacío, el recorrido y los planos de los racores, para que podamos confirmar viabilidad, cantidad mínima y plazo de entrega." },
      { type: "links", items: [
        { label: "Ver especificaciones completas del tubo de PVC", href: "/products/tubing/pvc-tubing/" },
        { label: "Racores de conexión rápida", href: "/products/fittings/quick-connect-fittings/" },
        { label: "Racores de espiga", href: "/products/fittings/barbed-fittings/" },
      ] },
    ] },
    { title: "Otros tubos para instrumentos", tocLabel: "Tubos relacionados", blocks: [
      { type: "links", items: [
        { label: "Tubos PVC: dureza, recorrido y racores para tubos flexibles", href: "/resources/technical-articles/what-is-pvc-tubing/" },
        { label: "Tubos PTFE: material, resistencia hidráulica y racores", href: "/resources/technical-articles/what-is-ptfe-tubing/" },
        { label: "Tubos FEP: transparencia y conexiones con reborde", href: "/resources/technical-articles/what-is-fep-tubing/" },
        { label: "Tubos PFA: reactivos y control de limpieza", href: "/resources/technical-articles/what-is-pfa-tubing/" },
      ] },
    ] },
  ],
  faqTitle: "Preguntas frecuentes sobre tubos de PVC de grado médico",
  faqItems: [
    { question: "¿Por qué un tubo de PVC de grado médico cuesta más que una manguera de vinilo de ferretería?", answer: "La diferencia procede de todo el sistema de producción y calidad: compuesto virgen y un sistema plastificante declarado, el coste de operar una sala limpia, la medición en línea más la inspección fuera de línea y el rechazo que detectan, y los registros de lote e informes de cumplimiento de cada envío. Cambiar solo el plastificante suele encarecer relativamente poco. Una manguera de uso general sirve para jardín o desagües; en los circuitos de fluidos de un instrumento, los retrabajos y paradas causados por desviaciones dimensionales o residuos suelen costar mucho más que la diferencia de precio." },
    { question: "¿Es estéril un tubo fabricado en sala limpia ISO 8?", answer: "No. La sala limpia controla la contaminación por partículas y microorganismos durante la fabricación; el tubo no se esteriliza antes del envío. Si la línea debe ser estéril, el fabricante del equipo o del conjunto la esteriliza y valida el proceso, con un método adecuado al compuesto de PVC concreto." },
    { question: "¿El tubo de PVC absorbe fármacos o reactivos?", answer: "Algunas sustancias, sí. Fármacos lipófilos como la nitroglicerina y el diazepam se absorben en el PVC plastificado, y proteínas como la insulina se adsorben en la pared interior de muchos materiales de tubo. Con reactivos, muestras o patrones sensibles a la concentración, compare la concentración antes y después de la línea con su fluido real y, si hace falta, acorte el tramo mojado o pase a PTFE o FEP." },
    { question: "¿Qué implica RoHS para los tubos de PVC de equipos comercializados en la UE?", answer: "La Directiva (UE) 2015/863 (RoHS 3) limita DEHP, BBP, DBP y DIBP al 0.1% en peso cada uno en materiales homogéneos, y la restricción se aplica a los productos sanitarios (incluidos los de diagnóstico in vitro) y a los instrumentos de vigilancia y control desde el 22 de julio de 2021. Confirme que el informe RoHS del tubo cubre los cuatro ftalatos e indique en su consulta cualquier requisito REACH u otro." },
    { question: "¿FOREACH corta el tubo de PVC a medida o suministra conjuntos de tubo?", answer: "Sí. El tubo está disponible por rollo, cortado a medida según su plano o como conjunto con racores de espiga o de conexión rápida. Indique longitud, DI/DE, dureza, racores de los extremos y condiciones de uso, y nuestros ingenieros confirmarán viabilidad, cantidad mínima y plazo." },
  ],
  cta: {
    title: "Solicite muestras y documentación de tubos de PVC",
    description: "Indíquenos la aplicación, el fluido, DI/DE, dureza, longitud y los documentos que necesita —como informes RoHS o registros de lote— y los ingenieros de FOREACH le ayudarán a confirmar la especificación y a preparar muestras para ensayo.",
    contactLabel: "Contactar con ingeniería",
    productsLabel: "Ver especificaciones PVC",
    productsHref: "/products/tubing/pvc-tubing/",
  },
};
