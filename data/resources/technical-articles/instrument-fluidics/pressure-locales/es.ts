import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";
import { coverImage, paragraph as p, list, table, formula, links, ratingRows, flowSlug, overviewSlug, materialsSlug } from "./shared";

// Terminología: Stäubli España y Parker; acoplamiento rápido, doble cierre, pérdida de carga y presión de trabajo.
// https://www.staubli.com/es/es/fluid-connectors/products/quick-and-dry-disconnect-couplings/thermal-management/rme-double-shutoff.html
const deck = "La presión de trabajo de un acoplamiento rápido depende de la serie, los materiales y las condiciones de servicio. Las configuraciones estándar FOREACH Q20 y Q40 de POM/NBR y PP/EPDM admiten 8,3 bar (aprox. 0,83 MPa); Q60 de PP/EPDM, 4,2 bar (aprox. 0,42 MPa). La selección debe considerar la pérdida de carga al caudal requerido, los picos de presión, el fluido y la temperatura. Incorporar válvulas de cierre no implica que se permita conectar o desconectar bajo presión.";

export const copy = {
  metadata: { title: "Presión de trabajo de los acoplamientos rápidos: temperatura y conexión bajo presión", seoTitle: "Acoplamientos rápidos: presión y temperatura | FOREACH", seoDescription: "Cómo seleccionar Q20, Q40 y Q60 según presión de trabajo, pérdida de carga, contrapresión y temperatura. Presión residual, mantenimiento y validación del conjunto.", coverImage, coverAlt: "Mitades de acoplamientos rápidos Q20, Q40 y Q60 separadas sobre fondo blanco" },
  deck,
  leadBlocks: [p(deck), p("Este artículo trata los acoplamientos de dos mitades separables —cuerpo y espiga de acoplamiento— utilizados en líneas de suministro, lavado, residuos y depósitos de instrumentos. La guía de caudal calcula la presión diferencial consumida por el paso del líquido. Aquí se comprueba si la conexión completa admite la presión y la temperatura reales, con ejemplos de contrapresión, mantenimiento y validación en el equipo."), links("es", [[flowSlug, "Caudal de los acoplamientos rápidos: curvas de pérdida de carga y cálculo Kv/Cv"]])],
  sections: [
    { title: "¿Qué presión de trabajo admiten los acoplamientos Q20, Q40 y Q60?", tocLabel: "Presión de trabajo", blocks: [
      p("Q20 y Q40 ofrecen 8,3 bar en las dos combinaciones estándar indicadas; Q60-PP, 4,2 bar. La tabla permite una primera selección por temperatura y diámetro interior de manguera. Los valores máximos de presión y temperatura no constituyen, por sí solos, una condición de servicio simultánea."),
      table(["Serie", "Cuerpo / junta tórica", "Presión de trabajo", "Temperatura de servicio", "Diámetro interior de manguera"], ratingRows("Máximo 71 °C; confirmar el mínimo para el modelo", true)),
      p("Aunque POM/NBR y PP/EPDM tengan la misma presión de trabajo en Q20 y Q40, deben compararse la compatibilidad química y la temperatura de limpieza. Al cambiar la junta tórica, hay que verificar de nuevo las dos mitades completas: una junta más resistente al calor no amplía automáticamente el rango del acoplamiento."),
      list("1 bar = 0,1 MPa ≈ 14,5 psi ≈ 1,02 kgf/cm².", "8,3 bar ≈ 0,83 MPa ≈ 8,5 kgf/cm²; 120 psi es la equivalencia aproximada del catálogo.", "4,2 bar ≈ 0,42 MPa ≈ 4,3 kgf/cm²; 60 psi es la equivalencia aproximada del catálogo."),
      p("Indique siempre la unidad. La expresión informal «kilos de presión» suele referirse a kgf/cm², no a kilogramos de masa."),
      p("La documentación disponible de Q60 no coincide en el límite inferior de temperatura; por ello solo se recoge el máximo confirmado de 71 °C. La presión admisible a cada temperatura, el servicio en vacío y otras combinaciones de materiales requieren datos del modelo concreto."),
    ] },
    { title: "¿Un acoplamiento rápido de mayor paso soporta más presión?", tocLabel: "Paso y presión", blocks: [
      p("El paso influye en la capacidad de caudal; la resistencia a la presión también depende del cuerpo, el enclavamiento, las juntas y los materiales. Q60 admite mangueras mayores, pero su configuración estándar de PP trabaja a 4,2 bar, frente a los 8,3 bar de Q20/Q40 indicados arriba. Un tamaño mayor no acredita una presión superior."),
      formula("Fuerza por presión: F = ΔP × Aef", "ΔP: diferencia de presión en Pa; Aef: área efectiva sometida a presión en m²; F: fuerza en N. El diámetro interior de la manguera no equivale al diámetro efectivo de presión."),
      p("Con una superficie efectiva mayor, la misma diferencia de presión genera más fuerza sobre los elementos de retención y sellado. Esta relación no permite calcular por sí sola la presión nominal ni explica de forma exclusiva el límite de Q60. Debe utilizarse la especificación de la configuración seleccionada."),
      list("Comprobar el caudal: estimar la pérdida de carga mediante la curva aplicable o Kv/Cv.", "Comprobar la presión: determinar el máximo en la conexión. El mayor caudal de Q60 no autoriza a superar 4,2 bar.", "Comprobar las ramas en paralelo: distribuyen caudal y pueden reducir pérdidas, pero no aumentan la presión admisible de cada acoplamiento."),
    ] },
    { title: "¿Cómo se relacionan presión de trabajo, pérdida de carga y contrapresión?", tocLabel: "Pérdida y contrapresión", blocks: [
      p("La presión de trabajo establece el límite de servicio de la conexión en condiciones definidas. La pérdida de carga es la caída de presión al atravesarla el fluido. Si ambos extremos están a alta presión, una pérdida pequeña puede coexistir con una presión de servicio excesiva."),
      table(["Parámetro", "Para qué sirve", "Qué no acredita"], [
        ["Presión de trabajo nominal", "Verificar el servicio para un fluido, temperatura y configuración definidos", "La presión permitida para conectar o desconectar"],
        ["Pérdida de carga ΔP", "Calcular la presión diferencial consumida al caudal requerido", "La presión de entrada o salida respecto al ambiente"],
        ["Presión de prueba mantenida durante un tiempo definido", "Evaluar una muestra con duración, fluido, temperatura y criterio definidos", "Una presión continua de trabajo no confirmada"],
        ["Presión de rotura", "Identificar el fallo en un ensayo destructivo", "La presión de servicio, un pico admisible o la presión de conexión"],
        ["Máximo de la escala gráfica", "Delimitar el gráfico, por ejemplo un eje de 4,83 bar", "La presión o el caudal nominal del producto"],
      ]),
      formula("Paguas arriba = Paguas abajo + ΔPacoplamiento", "Estimación en régimen estacionario, con diferencias de altura y velocidad despreciables. Las presiones deben compartir referencia; los ejemplos usan presión manométrica respecto a la atmósfera."),
      list("Q40 con manguera de 3/8″: a 12 L/min y densidad relativa 1,0, Kv ≈ 1,22 da una pérdida de unos 0,35 bar. Con 3,0 bar aguas abajo resultan unos 3,35 bar aguas arriba; con 8,0 bar aguas abajo resultan 8,35 bar, por encima de 8,3 bar. Comparar únicamente 0,35 bar de pérdida con la presión nominal sería incorrecto.", "Q60 con manguera de 1/2″: a 50 L/min, la curva indica aproximadamente 0,8 bar de pérdida. Una contrapresión de 3,6 bar produce unos 4,4 bar aguas arriba, superiores a los 4,2 bar de Q60-PP. Que el caudal aparezca en una curva no valida ese punto de funcionamiento."),
      p("Son ejemplos de cálculo para explicar la relación entre presiones; no son resultados de ensayo de un conjunto completo."),
      p("Si la salida descarga a la atmósfera o tiene presión manométrica positiva, la presión de entrada es como mínimo igual a la pérdida de carga. Los tramos de la curva Q60 con pérdidas superiores a 4,2 bar no son una base válida para esas condiciones. En aspiración puede existir presión manométrica negativa: debe verificarse aparte la estanqueidad en vacío, sin reinterpretar los tramos fuera de especificación como utilizables."),
      links("es", [[flowSlug, "Curvas Q20, Q40 y Q60 y condiciones del cálculo Kv/Cv"]]),
    ] },
    { title: "¿Qué presiones del sistema deben comprobarse al seleccionar un acoplamiento rápido?", tocLabel: "Comprobaciones", blocks: [
      p("Importa la presión donde se instala la conexión, no solo la placa de la bomba o una lectura normal. Una salida bloqueada, una maniobra rápida de válvula o líquido atrapado tras la parada pueden cambiar las condiciones."),
      table(["Situación", "Datos necesarios", "Criterio de evaluación"], [
        ["Suministro y lavado normales", "Presión a ambos lados al caudal objetivo", "Revisar entrada y presupuesto de pérdidas; no basta el dato de caudal libre de la bomba"],
        ["Arranque, parada y conmutación", "Pico transitorio junto al acoplamiento", "El sensor y el muestreo deben resolver el transitorio"],
        ["Salida obstruida o válvulas cerradas", "Máximo posible con bomba, regulación y dispositivos limitadores", "Prever limitación de presión o enclavamientos y verificar su actuación"],
        ["Parada de mantenimiento", "Presión residual a ambos lados y entre válvulas de aislamiento", "Parar la bomba no demuestra que la conexión esté despresurizada"],
        ["Calentamiento de líquido atrapado", "Presión tras elevarse la temperatura del fluido o del ambiente", "Considerar expansión térmica y alivio o protección"],
        ["Línea de aspiración", "Presión mínima de entrada, burbujas y estabilidad de suministro", "Verificar el rango de vacío por separado de la presión positiva"],
      ]),
      p("Con fluctuaciones, utilice el caso más desfavorable medido o validado, no la media. Cerca del límite deben considerarse incertidumbre de medida, variación del control, temperatura y estado de las juntas tras el uso. No se establece un factor de seguridad universal."),
    ] },
    { title: "¿Cómo afecta la temperatura a la presión admisible de un acoplamiento rápido?", tocLabel: "Temperatura", blocks: [
      p("El calentamiento modifica la rigidez y el comportamiento bajo carga prolongada de los polímeros, así como la compresión y recuperación de las juntas. Cerca de los límites del producto no debe trasladarse sin más la presión de trabajo habitual: presión y temperatura deben evaluarse conjuntamente."),
      table(["Condición", "Primera conclusión", "Qué falta verificar"], [
        ["Lavado a 80 °C con PP/EPDM", "Supera el máximo de 71 °C de las configuraciones estándar indicadas", "Cambiar el lavado o la conexión; bajar la presión no autoriza por sí solo el exceso de temperatura"],
        ["Lavado a 80 °C con Q20/Q40 POM/NBR", "No supera 82 °C, pero no demuestra que se admitan 8,3 bar a esa temperatura", "Presión a temperatura, duración, compatibilidad química y ciclos térmicos"],
        ["Junta tórica más resistente al calor", "Su rango no es el del conjunto", "Límites de cuerpo, válvulas, mitades acopladas y unión a manguera"],
        ["Arranque en frío o refrigeración", "La aptitud depende del modelo", "Recuperación de la junta, enclavamiento y fluido; no trasladar a Q60 el mínimo de otra serie"],
      ]),
      p("La ausencia de fugas con agua no garantiza el mismo sellado o resistencia con reactivos o detergentes. Para las piezas mojadas, registre:"),
      list("Identidad y concentración del fluido.", "Temperaturas máxima y mínima de servicio.", "Tiempo de contacto y frecuencia de limpieza."),
      p("Los datos disponibles no incluyen curvas completas de reducción de presión admisible con la temperatura para estas configuraciones. No debe inventarse un porcentaje de reducción ni combinar simultáneamente los dos máximos."),
      links("es", [[materialsSlug, "Materiales de los racores y compatibilidad química"]]),
    ] },
    { title: "¿Se pueden conectar y desconectar acoplamientos rápidos bajo presión?", tocLabel: "Conexión y despresurización", blocks: [
      p("Una válvula de cierre o una presión de trabajo de 8,3 bar no autorizan esas maniobras. La válvula cierra el paso de su mitad al separarla. La conexión y la desconexión bajo presión afectan a la fuerza de acoplamiento, la liberación del enclavamiento, el líquido liberado y la diferencia de presión; sus límites deben confirmarse por separado."),
      p("La presión residual puede oponerse a la válvula o al mecanismo e impedir un acoplamiento completo. Al separar las mitades puede salir líquido antes o durante el cierre. El doble cierre aísla ambos lados, pero no garantiza cero goteo ni elimina la presión atrapada."),
      p("Para las configuraciones Q20, Q40 y Q60 descritas, salvo autorización expresa del modelo y sus condiciones de maniobra bajo presión, siga una parada con aislamiento y despresurización:"),
      list("Pare la bomba o fuente de presión e impida un rearranque accidental. Deje enfriar el líquido caliente hasta una temperatura de mantenimiento adecuada.", "Aísle depósitos, ramales y fuentes que puedan seguir aportando presión o líquido. Localice volúmenes atrapados a ambos lados, incluidos los delimitados por válvulas antirretorno o cerradas.", "Use los puntos de alivio y drenaje previstos en el equipo y compruebe la ausencia de presión en la conexión. No afloje el acoplamiento para sondear o liberar presión.", "Sujete la manguera y recoja el líquido residual antes de liberar el enclavamiento y separar las mitades. Si aparece una resistencia anormal, vuelva a comprobar presión y bloqueo.", "Antes de reconectar, revise juntas tóricas, superficies de contacto y enclavamiento. Confirme el acoplamiento completo y, tras arrancar, compruebe fugas, entrada de aire y suministro."),
      p("Tras separar dos mitades con válvula, cada línea puede conservar presión. Vuelva a comprobar ambos lados antes de reconectar; haber desconectado una vez no prueba que estén despresurizados."),
      links("es", [[overviewSlug, "Mitades de acoplamiento y configuraciones de cierre"]]),
    ] },
    { title: "¿Qué debe revisarse al instalar un acoplamiento rápido de gran paso?", tocLabel: "Instalación Q60", blocks: [
      p("La evaluación incluye cuerpo, espiga, juntas, conexiones terminales, manguera y retención. Por ejemplo, los 4,2 bar de trabajo de Q60 PP/EPDM no atribuyen esa misma capacidad a la manguera. El componente con menor presión admisible en las condiciones reales limita el conjunto."),
      list("Diámetro: Q60 admite mangueras de 9,5–19,0 mm de diámetro interior. Esa medida no es el paso mínimo interno ni el diámetro efectivo para calcular la carga del enclavamiento.", "Configuración de 3/4″ (19,0 mm): no hay curva de caudal en los datos de referencia. Obtenga la curva aplicable o ensaye una muestra; no extrapole la de 1/2″ por proporción de diámetros.", "Soporte: la manguera grande y el líquido añaden peso y flexión. Un soporte debe absorber las cargas laterales sostenidas; no suspenda la línea del enclavamiento.", "Cuerpo pasamuros: Q60 admite paneles de hasta 7,5 mm, con orificio Ø31 mm y rosca de fijación M30×3.5. Reserve espacio para desbloquear, extraer, apretar la tuerca y curvar la manguera.", "Aspiración: además de pérdida de carga, compruebe entrada de aire en vacío y recuperación de la purga después de reconectar. No perder líquido hacia fuera no demuestra estanqueidad al aire hacia dentro."),
      p("Registre el espacio y las conexiones junto con fluido, temperatura, picos de presión y mantenimiento. Así puede comprobarse si la mejora de caudal de un paso mayor es compatible con el servicio previsto."),
    ] },
    { title: "¿Cómo validar presión y estanqueidad del acoplamiento rápido en el equipo?", tocLabel: "Validación del conjunto", blocks: [
      p("Utilice las mitades, juntas, manguera y soportes previstos para el montaje. Un ensayo breve de mantenimiento de presión con agua a temperatura ambiente no representa limpieza caliente, ciclos de presión ni reconexiones repetidas."),
      table(["Ensayo o comprobación", "Qué registrar", "Objetivo"], [
        ["Configuración y servicio", "Referencias completas, materiales, válvulas, manguera, diámetro, fluido y temperatura", "Reproducir la conexión que se instalará"],
        ["Presión estable y pérdida de carga", "Presión a ambos lados y caudal entregado", "Separar resistencia a la presión y presupuesto de presión diferencial"],
        ["Arranques y conmutaciones", "Forma de onda, picos, respuesta del sensor y muestreo", "Detectar sobrepresiones ocultas por la media"],
        ["Protecciones y anomalías", "Condición de actuación y máximo posterior", "Verificar bloqueo o cierre de válvulas sin anular protecciones para provocar sobrepresión"],
        ["Temperatura y fluido real", "Fugas, deformación y enclavamiento tras ciclos térmicos y de lavado", "Evaluar el conjunto en servicio"],
        ["Parada, alivio y reconexión", "Presión residual en cada lado, encaje, líquido retenido y rearranque", "Validar mantenimiento y sellado; la presión de trabajo no autoriza ensayos de conexión bajo presión"],
        ["Aspiración", "Presión mínima, burbujas, nivel bajo y purga tras reconexión", "Comprobar entrada de aire y estabilidad"],
      ]),
      p("Defina antes del ensayo la presión permitida, la duración, el número de ciclos y el criterio de fuga conforme al modelo y al equipo. No se prescribe un multiplicador de sobrepresión, valor de rotura o vida útil universal. Un ensayo sin fugas no sustituye la evaluación de fiabilidad a largo plazo."),
    ] },
    { title: "Más información para seleccionar acoplamientos rápidos", tocLabel: "Lecturas relacionadas", blocks: [links("es", [[flowSlug, "Curvas de pérdida de carga y cálculo Kv/Cv"], [overviewSlug, "Acoplamientos rápidos: mitades y válvulas de cierre"], [materialsSlug, "Materiales PP, PA, POM, PVDF y PEEK"]], true)] },
  ],
  faqTitle: "Preguntas frecuentes sobre presión en acoplamientos rápidos", faqTocLabel: "Preguntas frecuentes",
  faqItems: [
    { question: "¿Es adecuado un acoplamiento de 8,3 bar si el sistema funciona normalmente a 8 bar?", answer: "Esos dos valores no bastan. Si los 8 bar se miden aguas abajo, añada la pérdida del acoplamiento; si son la presión estable aguas arriba, revise picos, variaciones del control y presión permitida a la temperatura real. Cerca del límite debe evaluarse el conjunto de condiciones antes de seleccionar." },
    { question: "¿La presión del acoplamiento se aplica también al conjunto de manguera?", answer: "No automáticamente. El material, espesor de pared, temperatura y retención de los terminales pueden limitar la manguera antes que el acoplamiento. Seleccione por la menor presión admisible de las mitades, juntas, manguera y demás conexiones, y valide estanqueidad y retención del conjunto." },
    { question: "¿Cómo comparar los datos de presión de dos proveedores?", answer: "Distinga presión de trabajo, presión de prueba mantenida durante un tiempo definido y presión de rotura. Compare las mitades completas, válvulas, juntas, fluido, temperatura, duración, ciclos y criterios de fallo. Para maniobras bajo presión, solicite por separado las condiciones permitidas de conexión y desconexión. No ordene datos de condiciones distintas solo por su valor; una sustitución exige validar el equipo." },
  ],
  cta: { title: "Revise el acoplamiento para sus condiciones de servicio", description: "Documente la conexión completa y las condiciones indicadas. El equipo técnico de FOREACH puede ayudar a evaluar configuraciones Q20, Q40 y Q60 y los ensayos necesarios.", contactLabel: "Consultar la selección", productsLabel: "Ver modelos de acoplamientos", productsHref: "/es/products/fittings/quick-connect-fittings/" },
} satisfies DiaphragmPumpEngineeringArticleCopy;
