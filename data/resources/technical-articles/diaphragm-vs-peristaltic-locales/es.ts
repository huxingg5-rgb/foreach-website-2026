import { createComparisonCopy, type ComparisonTranslation } from "./shared";

const translation: ComparisonTranslation = {
  metadata: {
    title: "Bomba de diafragma miniatura o peristáltica: ventajas, desventajas y selección para instrumentos",
    seoTitle: "Bomba de diafragma o peristáltica: diferencias y selección | FOREACH",
    seoDescription: "Compare bombas de diafragma miniatura y peristálticas: diferencias, ventajas, precisión y mantenimiento para lavado, reactivos y residuos en instrumentos.",
    coverAlt: "Bomba miniatura de diafragma para líquidos FOREACH DPL30H-BS, de alta presión y sin escobillas",
  },
  deck: "Compare bombas de diafragma miniatura para líquidos y bombas peristálticas en analizadores y equipos de laboratorio. Revise su funcionamiento, ventajas y desventajas, precisión de dosificación y costes de mantenimiento, y aplique los criterios de selección al suministro de líquido de lavado, la transferencia de reactivos y la aspiración de residuos.",
  lead: "Para un circuito fijo que pueda limpiarse y reutilizarse, conviene evaluar una bomba de diafragma miniatura para líquidos. Si el recorrido mojado debe cambiarse entre lotes o se necesita transporte bidireccional, conviene evaluar una peristáltica. Ambas deben cumplir los requisitos reales de fluido, caudal, presión y mantenimiento; la precisión, las pulsaciones y el coste dependen de la configuración.",
  scopeLabel: "Alcance",
  scope: "La comparación se refiere a bombas eléctricas de diafragma miniatura para líquidos y bombas peristálticas de rodillos en instrumentos. Las bombas neumáticas de doble diafragma y las bombas industriales de manguera tienen otros límites de trabajo. Una bomba de diafragma para gases no es automáticamente apta para aspirar líquidos.",
  overview: {
    title: "Bombas de diafragma miniatura y peristálticas: diferencias y tabla comparativa",
    headers: ["Aspecto", "Bomba de diafragma miniatura para líquidos", "Bomba peristáltica"],
    rows: [
      ["Ventajas principales", "Cámara reutilizable; reduce los consumibles asociados a tubos comprimidos por rodillos y facilita la integración en circuitos fijos.", "El líquido permanece en el tubo, facilitando su sustitución y el aislamiento del fluido. Los modelos reversibles permiten transporte bidireccional."],
      ["Limitaciones principales", "La cámara y las válvulas requieren limpieza. Las partículas o los cristales pueden afectar a las válvulas antirretorno. El caudal presenta pulsaciones.", "El tubo se fatiga y debe sustituirse. Su montaje y desgaste pueden modificar el caudal y la dosis."],
      ["Cambio de fluido", "Eliminar residuos de cámara, diafragma, válvulas y tubería externa.", "Sustituir los componentes mojados facilita el cambio, pero los elementos compartidos también requieren atención."],
      ["Mantenimiento", "Diafragma, válvulas, juntas y limpieza interna.", "Vida del tubo, montaje, fugas y calibración tras sustituirlo."],
      ["Aplicaciones prioritarias", "Alimentación, reposición y recirculación en circuitos fijos, limpiables y reutilizables.", "Cambio del recorrido mojado por lote, conjuntos de un solo uso y transferencia bidireccional."],
      ["Precisión y pulsaciones", "Evaluar el modelo, el control y el resultado medido en el punto de uso.", "También exige ensayos, incluyendo la evolución del tubo durante su intervalo de servicio."],
    ],
    note: "La utilidad de estas ventajas depende del circuito. Compruebe materiales mojados, caudal a la presión de trabajo, ciclo de servicio y acceso para mantenimiento. La tecnología por sí sola no demuestra mayor precisión ni menor coste total.",
  },
  principle: {
    title: "¿Cómo funcionan una bomba de diafragma y una peristáltica?",
    paragraphs: [
      "La bomba de diafragma varía el volumen de la cámara mediante una membrana flexible. Las válvulas de entrada y salida dirigen la aspiración y la descarga. El líquido toca la cámara, el diafragma y las válvulas; por ello, compatibilidad y limpieza deben cubrir todo el conjunto mojado.",
      "La bomba peristáltica desplaza rodillos sobre un tubo flexible. La compresión impulsa el líquido y el tubo recupera su forma detrás del rodillo para volver a llenarse. En funcionamiento normal, el líquido no toca los rodillos. El tubo es a la vez barrera del fluido y pieza sometida a deformación repetida: material, dimensiones, recuperación y estado afectan al rendimiento.",
    ],
    diaphragmAlt: "Animación del desplazamiento del diafragma y de la apertura alternada de las válvulas de entrada y salida",
    diaphragmCaption: "En aspiración aumenta el volumen de la cámara, se abre la válvula de entrada y se cierra la de salida. En descarga se invierte la secuencia.",
    animationLabel: "Abrir la animación",
    peristalticAlt: "Tres posiciones del rotor muestran la compresión del tubo y el sentido de circulación del líquido",
    peristalticCaption: "Los rodillos forman puntos de oclusión móviles que desplazan el líquido. La recuperación del tubo detrás de ellos permite la entrada de más líquido.",
  },
  details: {
    title: "Ventajas y desventajas: precisión, pulsaciones y mantenimiento de ambas bombas",
    groups: [
      { title: "¿Cómo influye el recorrido mojado en la limpieza y el cambio de fluido?", paragraphs: [
        "En una bomba de diafragma, cambiar de fluido exige limpiar las piezas internas mojadas: sustituir el tubo externo no elimina residuos de la cámara ni de las válvulas. Una cámara reutilizable resulta útil en un circuito fijo con el mismo líquido de lavado si se valida la limpieza. Compruebe por separado los materiales del cabezal, diafragma y válvulas frente al líquido y a los agentes de limpieza.",
        "En una peristáltica, cambiar el tubo elimina residuos de ese tramo y puede formar parte del cambio de lote. Los depósitos, conectores y elementos aguas abajo que se comparten también deben limpiarse o sustituirse. La esterilidad y la contaminación por arrastre se evalúan en el circuito completo. El tubo debe resistir productos químicos, temperatura, presión y compresión repetida; un tubo de transferencia ordinario no es necesariamente un tubo de bomba válido.",
      ] },
      { title: "¿Qué necesita mantenimiento en cada bomba?", paragraphs: [
        "La bomba de diafragma evita la fatiga del tubo causada por rodillos, pero diafragma, válvulas y juntas siguen siendo piezas de desgaste. Depósitos, fibras o cristales pueden impedir el cierre de una válvula, provocando retorno, cebado más lento o menor caudal. Revise limpieza, estanqueidad y rendimiento, y confirme si el cabezal admite mantenimiento en campo.",
        "En la peristáltica, la fatiga del tubo puede alterar la recuperación y el caudal; una rotura puede provocar fugas. El mantenimiento incluye inspección y sustitución según las condiciones reales, montaje correcto y recalibración cuando corresponda. La facilidad de sustitución es una ventaja, pero tubo, mano de obra y paradas siguen siendo costes recurrentes.",
        "Reserve acceso para ambas soluciones. Compare compra, consumibles, limpieza, trabajo de mantenimiento, calibración y paradas con el mismo programa de operación. El precio de compra o el tipo de bomba no bastan para determinar el coste durante toda su vida útil.",
      ] },
      { title: "¿Qué ocurre si se necesita retroaspiración o transferencia bidireccional?", paragraphs: [
        "En una bomba de diafragma convencional, las válvulas antirretorno determinan el sentido del flujo; invertir el motor normalmente no invierte el líquido. Puede ser necesario un diseño especial o conmutar el circuito. Una peristáltica reversible cambia el sentido del líquido al invertir el rotor, por lo que puede servir para retroaspiración o transferencia entre dos recipientes. Confirme cabezal, tubo, accionamiento y control compatibles, y compruebe residuos y goteo tras la retroaspiración.",
      ] },
      { title: "¿Cuál ofrece mayor precisión o menos pulsaciones?", paragraphs: [
        "No puede deducirse solo de la tecnología. Tanto el movimiento del diafragma y las válvulas como la compresión y recuperación del tubo generan un caudal periódico. Un promedio estable puede ocultar picos e intervalos de poco caudal. La reposición de un depósito puede depender principalmente del volumen acumulado; una celda de flujo puede necesitar además estabilidad instantánea. Mida en el punto de uso antes de decidir amortiguación, combinación de cabezales o compensación de control.",
        "Compare la dosificación con la misma dosis objetivo, líquido, nivel de entrada, presión de salida y ciclo. Registre el error medio y la dispersión entre dosis, incluyendo el rearranque tras una parada. En la peristáltica, compare tubos nuevos y próximos al cambio programado. Los resultados deben conservar sus condiciones de ensayo: el caudal libre no demuestra la precisión en el equipo instalado.",
      ] },
    ],
    linkLabels: ["Medición y reducción de pulsaciones en bombas de diafragma", "Precisión y repetibilidad en la dosificación de reactivos"],
  },
  selection: {
    title: "Selección para instrumentos: ¿cuándo elegir una bomba de diafragma o peristáltica?",
    intro: "Priorice el diafragma en circuitos fijos, limpiables y reutilizables con el mismo líquido. Priorice la peristáltica si se cambia el recorrido mojado por lote o se requiere invertir el flujo mediante el motor. Seleccione después por caudal, contrapresión, materiales y mantenimiento.",
    diaphragmTitle: "Casos en los que conviene evaluar primero el diafragma",
    diaphragmParagraphs: [
      "El suministro fijo de líquido de lavado, la reposición de depósitos y la recirculación en analizadores son casos típicos. Suelen transportar un líquido de composición estable y requieren completar un volumen en un tiempo dado o mantener caudal bajo carga. La cámara reutilizable reduce el trabajo de cambio de tubo, siempre que los materiales sean compatibles, la limpieza resulte eficaz y el mantenimiento sea viable.",
      "Si hay tubos estrechos, filtros o boquillas de lavado, compruebe el caudal a la contrapresión necesaria. La presión máxima y el caudal libre no describen un único punto de trabajo. Si es difícil cambiar tubos dentro del instrumento, compare los intervalos de mantenimiento sin eliminar el acceso para reparación.",
    ],
    peristalticTitle: "Casos en los que conviene evaluar primero la peristáltica",
    peristalticParagraphs: [
      "Cuando cada lote de reactivo, muestra o medio de cultivo exige sustituir componentes mojados, el tubo desmontable facilita esa operación y el uso de conjuntos desechables. Incluya en el cambio los frascos, conectores, válvulas y agujas compartidos: cambiar solo el tubo del cabezal no elimina la contaminación del resto del circuito. Los procesos estériles requieren validar el conjunto y su manipulación.",
      "Para retroaspirar después de dispensar o transferir en ambos sentidos entre recipientes, una peristáltica reversible puede reducir los componentes de conmutación. Verifique compatibilidad, presión y duración del tubo, y reserve espacio y tiempo para sustituirlo y recalibrar.",
    ],
    tableTitle: "Selección de bombas para líquidos de lavado, reactivos y residuos",
    headers: ["Tarea", "Primera opción que evaluar", "Condiciones que comprobar"],
    rows: [
      ["Lavado fijo o reposición de un depósito", "Bomba de diafragma miniatura para líquidos", "Líquido estable y circuito limpiable; comprobar el tiempo de llenado con el caudal bajo carga."],
      ["Recirculación fija con menos cambios de tubo", "Bomba de diafragma miniatura para líquidos", "Servicio continuo o intermitente e intervalos de mantenimiento de diafragma, válvulas y juntas."],
      ["Reactivos, muestras o medios con cambio por lote", "Bomba peristáltica", "Definir todo el conjunto sustituible; compatibilidad, vida del tubo y residuos en conectores compartidos."],
      ["Retroaspiración o transporte bidireccional", "Peristáltica reversible", "Compatibilidad del cabezal y accionamiento; volumen de retroaspiración, residuos y goteo."],
      ["Residuos conocidos en una línea fija de evacuación", "Evaluar primero un diafragma compatible", "Partículas, cristales, obstrucción de válvulas y admisión de gas-líquido. Comparar la peristáltica si se necesita aislamiento por sustitución del tubo."],
      ["Dosis pequeñas en ciclos cortos o alimentación de un detector con pocas pulsaciones", "Decidir con ensayos en el punto de uso", "Error de dosis, repetibilidad o forma de onda; evaluar amortiguación, control o dosificación de precisión."],
    ],
    limitsTitle: "¿Cuándo no basta con elegir la tecnología?",
    limits: [
      "Si los residuos cambian de composición o contienen partículas, fibras, cristales o aire intermitente, ambas opciones requieren verificar el fluido y los pasos internos. La ausencia de válvulas en una peristáltica no garantiza que cualquier partícula pase sin dañar el tubo. Distinga el bombeo directo de residuos de la aspiración por vacío en un recipiente: una bomba de gases no apta para líquidos debe protegerse de su entrada. El autocebado no autoriza funcionamiento en seco indefinido.",
      "Para dosificación precisa, mida la dosis real en la salida. El retardo de arranque, gas atrapado, presión de salida, elasticidad del tubo y líquido residual en la aguja afectan al resultado. Ensaye el ciclo completo. Si ninguna opción cumple la tolerancia, compare bombas de pistón de precisión o mecanismos dosificadores de jeringa.",
    ],
  },
  validation: {
    title: "¿Qué validar después de seleccionar la bomba?",
    steps: [
      "Definir transferencia, reposición, evacuación, recirculación o dosificación y el resultado exigido en la salida.",
      "Especificar líquido y agentes de limpieza: concentración, temperatura, viscosidad, partículas y burbujas.",
      "Fijar caudal o dosis, condiciones de aspiración, presión de salida, ciclo de arranque-parada y horas diarias.",
      "Dibujar el recorrido mojado completo y asignar limpieza o sustitución a sus componentes.",
      "Comparar curvas, materiales, control, espacio y acceso de mantenimiento de modelos concretos.",
      "Ensayar el circuito instalado en las condiciones y etapas de servicio previstas; registrar caudal o dosis, fugas, arranque y criterios de aceptación del proceso.",
    ],
    paragraph: "Las fichas FOREACH DPL30 y DPL60 permiten iniciar la comparación entre modelos de diafragma. Use las especificaciones vigentes y la curva caudal-presión de la configuración seleccionada. Elegir un modelo no demuestra por sí mismo compatibilidad con reactivos, precisión de dosificación ni sustitución directa de una peristáltica.",
    linkLabels: ["Ver bombas de diafragma FOREACH para líquidos", "Guía de selección DPL30", "Guía de selección DPL60", "Altura de aspiración, tiempo de cebado y rearranque"],
  },
  faqTitle: "Preguntas frecuentes",
  faqItems: [
    { question: "Si ambas bombas indican 300 mL/min, ¿pueden intercambiarse directamente?", answer: "Ese valor no basta. Compruebe líquido, velocidad o tensión y condiciones de entrada y salida de cada dato. Tubos estrechos, filtros o agujas pueden dar caudales instalados distintos. La sustitución cambia además materiales mojados, limpieza, control y mantenimiento. Compare caudal, dosis, arranque-parada y servicio en el circuito original. Si este exige cambiar todo el recorrido mojado entre lotes, pasar a una cámara de diafragma reutilizable requiere reevaluar la limpieza." },
    { question: "¿Cada cuánto debe sustituirse el tubo de una bomba peristáltica?", answer: "No existe un intervalo universal ni conviene esperar a una fuga. Material, dimensiones, compresión, velocidad, temperatura, líquido y presiones influyen en la vida útil. Parta de las indicaciones aplicables del proveedor y establezca un cambio preventivo con horas reales, evolución del caudal y estado del tubo. Aplastamiento persistente, mala recuperación, grietas, hinchamiento o una desviación significativa de la entrega requieren revisión. El diafragma reduce el consumo de tubo comprimido, pero sus membranas, válvulas y juntas también necesitan mantenimiento." },
    { question: "¿Por qué cambia la dosis al instalar un tubo nuevo de la misma medida?", answer: "La medida nominal no garantiza el mismo volumen por vuelta. Influyen las tolerancias de diámetro y pared, posición, tensión y deformación inicial del tubo. Siga las instrucciones de montaje y rodaje del cabezal y recalibre con el líquido y circuito reales. Recoja varias dosis, mida el volumen o péselas y convierta la masa con la densidad del líquido. Compruebe error medio y repetibilidad. Repita la verificación tras cambiar líquido, tubería o contrapresión; no reutilice automáticamente el factor anterior." },
    { question: "La bomba gira, pero no aspira o el caudal disminuye. ¿Qué revisar primero?", answer: "Compruebe suministro de líquido, inmersión del tubo y sentido de los puertos; después, entradas de aire, dobleces, filtros obstruidos y contrapresión. Si el circuito externo está correcto, revise tipo de tubo, montaje, oclusión y recuperación en la peristáltica; contaminación de válvulas, depósitos y daños del diafragma o juntas en la de diafragma. Compare con el mismo líquido, nivel y control. Para intervenir en el cabezal, pare, despresurice y siga las instrucciones del modelo. Aumentar la velocidad no identifica la causa." },
    { question: "¿Cambiar de tipo de bomba elimina el goteo o retorno tras detenerla?", answer: "Primero distinga sifonamiento por desnivel, descarga de presión residual y gotas retenidas en la salida. Las válvulas de una bomba de diafragma dirigen el ciclo; no debe darse por supuesta la estanqueidad de cierre que necesita el sistema. Una peristáltica depende de la oclusión del tubo, que puede fallar por montaje o desgaste, y puede quedar líquido después del cabezal. Evalúe cierre, medidas antisifón o retroaspiración validada según la causa y ensaye la parada. Cambiar la bomba no garantiza por sí solo ausencia de goteo." },
    { question: "Al cambiar de reactivo, ¿basta con sustituir el tubo dentro del cabezal peristáltico?", answer: "Solo si ese tramo incluye todo el recorrido mojado que debe sustituirse. Tubos de aspiración, conexiones de frasco, válvulas, conectores y agujas compartidos pueden conservar el reactivo anterior. Trace el circuito completo, asigne limpieza o sustitución a cada elemento y compruebe los residuos en las primeras dosis tras el cambio. En una bomba de diafragma incluya cámara, membrana y válvulas. El tubo desechable facilita el cambio, pero por sí solo no demuestra esterilidad ni ausencia de contaminación por arrastre." },
  ],
  cta: { title: "¿Está evaluando una bomba de diafragma para su circuito?", description: "Indique líquido, caudal o dosis, condiciones de entrada y salida, ciclo de trabajo y limpieza para evaluar configuraciones y validación en el equipo.", contactLabel: "Consultar la aplicación", productsLabel: "Ver bombas de diafragma" },
};

export const diaphragmVsPeristalticEs = createComparisonCopy("es", translation);
