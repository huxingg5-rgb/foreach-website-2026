import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";
import { blindThreadFigure, trappedVolumeFigure, virtualLeakEquations, virtualLeakReferences } from "./shared";

export const copy = {
  metadata: {
    title: "Pruebas de estanqueidad: cómo identificar y prevenir fugas virtuales",
    seoTitle: "Prueba de estanqueidad: fugas virtuales | FOREACH",
    seoDescription: "¿Evacuación lenta sin señal de helio? Distinga fugas reales y virtuales, evalúe cavidades atrapadas y desgasificación, y utilice pruebas de aumento de presión.",
    coverImage: trappedVolumeFigure.src,
    coverAlt: "Esquema en sección de gas atrapado entre dos soldaduras que se libera lentamente hacia una cámara de vacío",
  },
  deck: "Si la prueba de estanqueidad no localiza una fuga, pero la evacuación se vuelve más lenta, revise los volúmenes atrapados y la desgasificación de los materiales, además de las fugas reales. Los orificios roscados ciegos, las juntas en serie y los espacios entre soldaduras pueden almacenar gas y liberarlo por pasos estrechos. Las curvas de evacuación y las pruebas de aumento de presión orientan el diagnóstico; ni la ausencia de señal de helio ni una única curva permiten descartar una fuga real.",
  leadBlocks: [
    { type: "paragraph", text: "En la inspección final de componentes o conjuntos estancos al gas, la lectura de fuga puede oscilar alrededor del límite de aceptación: una medición es baja y la siguiente aumenta. En equipos de vacío y circuitos de instrumentos que trabajan a presión inferior a la atmosférica puede ocurrir algo parecido: el detector no encuentra un punto concreto, pero la evacuación tarda más y no se alcanza la presión de trabajo requerida." },
    { type: "paragraph", text: "Además de buscar aberturas al exterior, hay que buscar fuentes internas de gas. El gas retenido durante la fabricación o el montaje puede salir únicamente por un conducto de baja conductancia: es una fuga virtual típica por volumen atrapado. La desgasificación, la desorción de humedad y la reevaporación de líquidos residuales producen síntomas parecidos y deben evaluarse por separado." },
  ],
  sections: [
    {
      title: "¿En qué se diferencian las fugas reales, externas, internas y virtuales?", tocLabel: "Tipos de fuga",
      blocks: [
        { type: "paragraph", text: "Estos términos describen aspectos distintos. La distinción entre fuga real y virtual se refiere principalmente al origen del gas; la distinción entre externa e interna, a su recorrido. No son cuatro categorías excluyentes. Antes de elegir el método de ensayo, determine de dónde procede el gas y hacia dónde circula." },
        { type: "list", items: [
          "Fuga real: el gas pasa de mayor a menor presión por un orificio, una grieta o un defecto de sellado. Puede localizarse con un detector si la sensibilidad, el acceso del gas trazador y el tiempo de respuesta son adecuados.",
          "Fuga externa: el gas atraviesa el límite entre el sistema y el entorno. En vacío suele entrar gas del exterior; en un circuito presurizado, el fluido también puede salir al ambiente.",
          "Fuga interna: el gas pasa entre cámaras o conductos que deberían estar aislados, por ejemplo a través de una válvula cerrada. Aísle tramos, compruebe el mantenimiento o el aumento de presión y, según el procedimiento, aplique gas trazador en el lado correspondiente.",
          "Fuga virtual: el gas almacenado en un espacio muerto interno entra lentamente en la cámara por un paso de baja conductancia y simula una fuga persistente. La desgasificación, la desorción, la reevaporación y la permeación también elevan la carga de gas; aunque a veces se agrupan bajo el mismo nombre, conviene distinguirlas al localizar la causa.",
        ] },
        { type: "paragraph", text: "En una fuga real se investiga el paso de fuga; en una virtual, el gas almacenado y las fuentes internas de liberación. La ausencia de respuesta al rociar helio solo indica que no se detectó una señal en las condiciones de esa prueba. No demuestra que el sistema carezca de fugas reales." },
      ],
    },
    {
      title: "¿Por qué una fuga virtual retrasa la evacuación sin dar señal de helio?", tocLabel: "Mecanismo de la fuga virtual",
      blocks: [
        { type: "paragraph", text: "Cuanto más largo y estrecho es el paso entre la cavidad y la cámara, menor suele ser su conductancia y más lentamente sale el gas retenido. Aunque la cámara ya esté a baja presión, el gas de la cavidad sigue entrando y alarga la parte final de la curva de evacuación." },
        { type: "formula", expression: virtualLeakEquations.balance, note: "Balance aproximado en régimen estable: q_total es la carga total de gas en mbar·L/s; S_eff, la velocidad efectiva de bombeo en la cámara en L/s; y p, la presión absoluta en mbar. Esta simplificación requiere una carga aproximadamente estable y una influencia despreciable de la presión de base de la bomba. El caudal de placa de la bomba no equivale automáticamente a S_eff." },
        { type: "paragraph", text: "Aumentar la velocidad efectiva de bombeo puede reducir la presión para una misma carga de gas, pero no elimina la cavidad. Entre dos cordones de soldadura, el exterior puede ser estanco e impedir que el helio alcance el gas retenido, mientras un pequeño paso en el cordón del lado de vacío permite su liberación. Por eso pueden coexistir una presión anormal y la ausencia de una señal clara de helio." },
        { type: "figure", ...trappedVolumeFigure, alt: "Fuga virtual por cavidad atrapada: el gas sale hacia el vacío y la soldadura exterior impide la entrada de helio", caption: "1 Cámara de vacío; 2 pared; 3 bolsa de gas atrapado; 4 liberación lenta por un paso hacia el vacío; 5 soldadura exterior estanca; 6 helio externo sin acceso a la cavidad. Esquema en sección, sin escala. El bombeo no elimina la geometría que retiene el gas." },
        { type: "paragraph", text: "Al ventear el sistema hasta la presión atmosférica, algunos espacios muertos se llenan de nuevo. La siguiente evacuación puede repetir el mismo comportamiento y confundirse con una fuga real estable. La humedad adsorbida o condensada en superficies frías también puede desorberse y reevaporarse repetidamente, prolongando la evacuación." },
      ],
    },
    {
      title: "¿Qué estructuras pueden retener gas y generar fugas virtuales?", tocLabel: "Volúmenes atrapados",
      blocks: [
        { type: "paragraph", text: "Estas fugas suelen originarse en el diseño o el montaje. Busque a la vez un volumen que almacene gas y un paso restringido hacia el lado de baja presión. La mera presencia de un orificio ciego o de dos juntas no permite diagnosticar la avería." },
        { type: "subheading", title: "Orificios roscados ciegos: el gas bajo el tornillo sale por las holguras de la rosca" },
        { type: "paragraph", text: "Un tornillo en un orificio ciego puede dejar gas retenido bajo su extremo. Sin un conducto de venteo específico, el gas debe recorrer lentamente las holguras de la rosca hasta la cámara, y el helio exterior no alcanza directamente el fondo. Pueden utilizarse tornillos ventilados u orificios de venteo adecuados. Como estos modifican la sección y la capacidad de carga del tornillo, también hay que verificar la resistencia mecánica." },
        { type: "figure", ...blindThreadFigure, alt: "Gas retenido bajo un tornillo en un orificio ciego que asciende hacia la cámara por la holgura de la rosca", caption: "1 Cámara de vacío; 2 cabeza del tornillo; 3 pared; 4 espacio muerto bajo el tornillo; 5 paso restringido por la rosca; 6 fondo cerrado del orificio. Las roscas y holguras son esquemáticas, no dimensiones de ajuste. El cierre exterior impide que el helio alcance directamente la cavidad." },
        { type: "subheading", title: "Doble soldadura, juntas en serie y bridas: gas entre dos barreras" },
        { type: "list", items: [
          "Dos soldaduras en ángulo: un cordón exterior estanco y un pequeño paso del lado de vacío pueden encerrar una bolsa de gas. Defina el límite de sellado y la vía de evacuación durante el diseño. Una soldadura intermitente o un venteo específico deben evaluarse según las cargas, la limpieza y la estanqueidad requeridas.",
          "Juntas en serie: dos juntas tóricas sin venteo ni conexión de control pueden retener gas entre ellas. El helio aplicado fuera puede no alcanzar la junta interior. Cuando el diseño lo permita, prevea una conexión intermedia de venteo, bombeo o ensayo y compruebe cada junta; no añada ranuras arbitrarias que comprometan el sellado.",
          "Bridas y juntas: una compresión inadecuada, contactos locales o deformaciones pueden dejar huecos difíciles de evacuar. Controle la compresión y el apriete conforme al montaje previsto, en lugar de aumentar la fuerza para compensar problemas de contacto o venteo.",
        ] },
      ],
    },
    {
      title: "¿Cómo imita la desgasificación de materiales y superficies una fuga virtual?", tocLabel: "Desgasificación",
      blocks: [
        { type: "paragraph", text: "Los materiales y las superficies pueden liberar gas aunque no haya cavidades cerradas. El tratamiento difiere del de un espacio muerto geométrico: la selección del material, la limpieza, el secado y un horneado compatible reducen ciertas fuentes de desgasificación; los volúmenes atrapados suelen exigir mejorar su vía de evacuación." },
        { type: "list", items: [
          "Grasas, juntas y residuos de limpieza: el agua, el aire, los disolventes retenidos y los gases presentes en el material pueden liberarse por desorción, difusión o evaporación. Seleccione materiales adecuados al vacío objetivo y limite las cantidades y residuos innecesarios.",
          "Presión de vapor y temperatura: la liberación de gas de lubricantes, aceite y agua depende de la temperatura. En alto y ultraalto vacío también hay que evaluar metales, materiales de soldadura y acabados. La compatibilidad con un circuito de líquidos convencional no demuestra aptitud para vacío.",
          "Capas anodizadas y porosas: aumentan las posibilidades de adsorción y retención de gas. La aptitud depende del tratamiento concreto, la limpieza y la presión objetivo; la resistencia a la corrosión no basta para establecer el comportamiento en vacío.",
          "Cerámica, metal y vidrio: la porosidad y densidad de una cerámica dependen de su fabricación. Incluso una base densa adquiere capas adsorbidas tras exponerse al aire. El horneado puede reducir parte de la carga de gas de materiales compatibles, pero no repara poros pasantes, grietas ni fugas reales.",
        ] },
        { type: "paragraph", text: "La limpieza, el secado y el horneado deben respetar los límites de juntas, adhesivos, sensores y demás componentes. No aplique una misma temperatura elevada a todo el circuito para acelerar la eliminación de gas." },
      ],
    },
    {
      title: "¿Cómo ayudan las curvas de evacuación y de aumento de presión al diagnóstico?", tocLabel: "Diagnóstico y comprobaciones",
      blocks: [
        { type: "paragraph", text: "Compare la presión en función del tiempo con un registro del sistema en buen estado. Mantenga lo más constantes posible el volumen, la bomba, las posiciones de válvula, las tuberías, la temperatura y el historial de venteo. Una evacuación más lenta que finalmente se aproxima a la presión límite anterior sugiere desgasificación o fuga virtual. Una presión estabilizada más alta también puede deberse a una fuga real, a desgasificación continua o a cambios en el bombeo; por sí sola no identifica la causa." },
        { type: "paragraph", text: "Para una prueba de aumento de presión, evacúe la cámara, aíslela de la bomba y registre la presión absoluta. Con volumen y temperatura estables y otras influencias controladas, una pendiente relativamente constante sugiere una fuente continua de gas; una pendiente decreciente es más compatible con desgasificación o vaciado gradual de una cavidad. Continúe bombeando y repita el mismo intervalo de prueba. Una fuga real y la desgasificación pueden coexistir." },
        { type: "formula", expression: virtualLeakEquations.isolatedVolume, note: "V es el volumen efectivo de gas aislado en L; Δp, la variación de presión absoluta en mbar; y Δt, el tiempo en s. q_apparent se expresa en mbar·L/s. Utilice la relación con volumen y temperatura aproximadamente constantes. Hasta separar fugas reales, desgasificación, gas retenido y fugas de la válvula de aislamiento, el resultado es una carga aparente de gas, no una tasa confirmada de fuga externa." },
        { type: "paragraph", text: "La tabla sirve para priorizar comprobaciones; ningún síntoma aislado constituye un criterio de aceptación." },
        { type: "table", headers: ["Comportamiento observado", "Posibles causas iniciales", "Comprobaciones siguientes"], rows: [
          ["Evacuación más lenta que se aproxima a la presión límite anterior tras mucho tiempo", "Desgasificación o fuga virtual; revisar también el conducto de bombeo", "Comprobar bomba, válvulas, limpieza, secado y volúmenes muertos; tratar según los límites del material"],
          ["Presión estabilizada más alta y pendientes de aumento repetidas casi constantes", "Fuga real u otra fuente continua de gas", "Verificar temperatura y volumen efectivo; aislar tramos y localizar la fuga con un gas trazador adecuado"],
          ["Tras cerrar una válvula, la presión del otro lado aún afecta a la cámara aislada", "Fuga de la válvula de aislamiento o entre cámaras", "Controlar ambos lados por separado, comprobar la presión por tramos y aplicar trazador en el lado sospechoso según el método"],
          ["Prueba estática sin anomalías claras, pero señal de fuga durante el movimiento", "Junta móvil o variación de las cargas mecánicas", "Ensayar con el movimiento y diferencial de presión previstos; revisar vástago, juntas y esfuerzos, y valorar un aislamiento por fuelle apropiado"],
          ["Evacuación más lenta tras usar gas húmedo o exponer mucho tiempo el sistema al aire", "Adsorción, desorción o reevaporación de agua", "Revisar gas y venteo; limpiar, secar y prolongar el bombeo o el horneado dentro de los límites de los componentes"],
        ] },
        { type: "paragraph", text: "Si las lecturas fluctúan, revise también calibración, señal de fondo, rango, acceso del trazador y tiempo de espera. Use la ausencia de señal de helio como indicio solo después de confirmar que el método puede cubrir y resolver la zona sospechosa." },
      ],
    },
    {
      title: "¿Cómo reducir las fugas virtuales durante el diseño y el montaje?", tocLabel: "Diseño y prevención",
      blocks: [
        { type: "paragraph", text: "Revise dónde puede almacenarse gas y por qué vía se evacúa. Priorice orificios roscados ciegos, soldaduras a ambos lados, juntas en serie e interfaces de brida. Un espacio muerto no implica necesariamente una fuga virtual, pero una vía de evacuación mal definida requiere evaluación." },
        { type: "paragraph", text: "Revise qué pueden liberar los materiales y las superficies, y cómo se tratarán. Defina antes del montaje la limpieza, el secado, el almacenamiento y la desgasificación compatibles con superficies que retienen humedad, lubricantes, residuos y capas porosas. Conserve registros iniciales de evacuación y aumento de presión para distinguir después contaminación, cambios geométricos y fugas reales." },
        { type: "paragraph", text: "En conexiones de circuitos de instrumentos a presión subatmosférica también deben comprobarse la posición de las juntas, el ajuste del tubo y los espacios creados al montar. Los racores FOREACH para tubos rígidos enlazados abajo permiten comparar estructuras de conexión. Estos esquemas no certifican su aptitud para alto o ultraalto vacío ni una tasa de fuga medida; seleccione según la documentación del modelo y valide en las condiciones reales." },
        { type: "paragraph", text: "Las fugas virtuales suelen ser más fáciles de evitar durante el diseño. Comprobar desde el principio los volúmenes atrapados, los pasos de venteo y el estado de los materiales puede reducir ensayos, desmontajes y limpiezas repetidos después del montaje." },
      ],
    },
    { title: "Lecturas relacionadas y referencias técnicas", tocLabel: "Referencias", blocks: [virtualLeakReferences("es", ["Selección de racores para tubos rígidos: estructura, instalación y mantenimiento", "Materiales de racores: cuerpo, juntas y fluidos", "Manual de vacío de Pfeiffer: conexiones y venteo de orificios ciegos", "Manual de vacío de Pfeiffer: materiales y desgasificación superficial", "Fundamentos de vacío de Leybold: pruebas de aumento y caída de presión"])] },
  ],
  faqTitle: "Preguntas frecuentes", faqItems: [],
  cta: {
    title: "Revise las conexiones y juntas de su circuito de vacío",
    description: "Indique el fluido, la presión absoluta objetivo, la temperatura, las conexiones y los registros de presión y tiempo para definir las condiciones de selección y validación.",
    contactLabel: "Contactar con soporte técnico", productsLabel: "Ver productos para fluidos", productsHref: "/es/products/",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
