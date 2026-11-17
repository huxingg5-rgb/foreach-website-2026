import type { RplGuideParameters, RplGuideText } from "./types";

export function getSpanishRplGuide(p: RplGuideParameters): RplGuideText {
  const motor = `${p.rinse ? "seis" : "cuatro"} hilos, 1,5 A/fase, paso completo de 1,8°`;
  return {
    productType: "Bomba dosificadora sin válvulas",
    lead: `${p.model} aspira e impulsa el líquido mediante la rotación y el movimiento alternativo de un pistón cerámico. Defina la dosis, el tiempo de dispensación disponible, el líquido de proceso y el de limpieza antes de elegir el desplazamiento, la velocidad y los tubos. Mida el volumen entregado en la salida real.`,
    features: [
      ["Ajuste por separado desplazamiento y velocidad", `${p.range} μL/rev es el intervalo de desplazamiento por vuelta. El ajuste mecánico modifica la entrega por vuelta; la velocidad modifica el tiempo necesario para completar esas vueltas.`],
      ["Conjunto dosificador cerámico", `La configuración mostrada combina un cabezal de PVDF con ${p.ceramic}. Compruebe la compatibilidad del líquido con todos los componentes mojados.`],
      ["Montaje que facilite la purga", "La orientación del cabezal, el sentido del flujo y la posición del motor influyen en la purga y la protección frente a fugas. Reserve espacio para el ajuste del cabezal y las conexiones."],
      [p.rinse ? "Circuitos de proceso y lavado separados" : "Limpieza por el circuito de proceso", p.rinse ? "Las conexiones de proceso transportan el reactivo; las de lavado limpian la zona del pistón. Que tengan la misma rosca no permite intercambiarlas." : "Desplace los residuos a través del circuito de proceso. Para líquidos con sales o que cristalizan, defina conjuntamente el líquido de limpieza, el volumen de lavado y la secuencia de parada."],
    ],
    documents: [
      ["Modelo y desplazamiento", `${p.model}: ${p.range} μL/rev. Especifique el ajuste de desplazamiento, el accionamiento y la detección de posición al realizar el pedido.`],
      ["Conexiones y materiales mojados", `Conexiones de proceso: ${p.port}; cabezal de PVDF y ${p.ceramic}. ${p.rinse ? "Conexiones de lavado: 1/4-28 UNF-2B." : "Esta configuración no tiene conexiones RINSE independientes."}`],
      ["Condiciones de ensayo del rendimiento", `Condiciones de ensayo: agua pura, ${p.testRpm} rpm, presión del circuito ≤50 kPa y giro del motor en sentido directo. Evalúe la exactitud, la repetibilidad y la vida útil teniendo en cuenta estas condiciones.`],
      ["Comprobaciones de integración", "Confirme la orientación de montaje, el espacio para ajustar el cabezal, los devanados, la interfaz del sensor óptico y la versión de cableado suministrada antes de poner en marcha el accionamiento y el circuito."],
    ],
    sections: {
      principle: {
        title: "Cómo aspira e impulsa el líquido el pistón",
        intro: "El pistón cerámico gira y se desplaza axialmente al mismo tiempo. La rotación comunica alternativamente el paso formado por la cara plana del pistón con la entrada y la salida; el movimiento axial modifica el volumen de la cámara dosificadora. El ciclo completo comprende aspiración, fin de aspiración, impulsión y fin de impulsión.",
      },
      displacement: {
        title: "Selección del desplazamiento, la velocidad y el ciclo de dispensación",
        intro: `El ajuste mecánico determina el desplazamiento por vuelta; las vueltas completas, la dosis nominal; y la velocidad, el tiempo de entrega. El intervalo de ${p.range} μL/rev de ${p.model} no es un caudal por minuto ni garantiza la dosis mínima fiable.`,
        rows: [
          ["Dispensación por dosis", "Dosis nominal = desplazamiento × vueltas completas", "Elija un desplazamiento adecuado para la dosis y compruebe los efectos del arranque y la parada, las gotas residuales y la primera dosis tras una pausa. Valide por separado la entrega en fracciones de vuelta."],
          ["Suministro continuo", "Caudal medio nominal = desplazamiento × rpm", "μL/rev multiplicado por rev/min da μL/min. La alimentación, la contrapresión y el líquido también afectan al caudal real. El caudal medio no implica ausencia de pulsaciones."],
          ["Tiempo de entrega", "Confirme la velocidad admisible para el modelo y el accionamiento", "Compruebe la velocidad con el accionamiento y las condiciones seleccionados. El ciclo del equipo también incluye el cambio de recipiente, el movimiento de la aguja y la espera de estabilización."],
          ["Presión y exactitud", "Diferencie presión nominal, contrapresión de ensayo y punto de trabajo", `La resistencia a 150 kPa no demuestra funcionamiento continuo validado a esa contrapresión. Los resultados a ${p.testRpm} rpm no se extienden automáticamente a todas las velocidades.`],
        ],
      },
      materials: {
        title: "Selección del cabezal, la cerámica y el líquido de limpieza",
        intro: `La configuración mostrada utiliza un cabezal de PVDF con ${p.ceramic}. Considere los líquidos de proceso y limpieza, su concentración, temperatura y tiempo de contacto. La resistencia química de la cerámica por sí sola no demuestra la compatibilidad de toda la bomba.`,
        rows: [
          ["Líquido de proceso", "Registre composición, viscosidad, partículas y tendencia a cristalizar", "Para líquidos con partículas o que cristalizan, evalúe filtración, lavado y parada antes de comprobar el movimiento y la entrega con una muestra."],
          ["Líquido de limpieza", p.rinse ? "Diseñe por separado la limpieza del circuito y el lavado del pistón" : "Defina la limpieza a través del circuito de proceso de este modelo", p.rinse ? "El circuito RINSE no bombea por sí mismo y necesita una alimentación externa de lavado. Use un líquido compatible con todos los materiales mojados y compruebe precipitados, burbujas y juntas tras cambiar de líquido." : "Use un líquido compatible capaz de desplazar los residuos. Tras cambiar de líquido, compruebe precipitados, burbujas y anomalías en las juntas."],
          ["Residuos durante la parada", "Evite que las sales o los líquidos cristalizables se sequen en el conjunto dosificador", "Desplace completamente el líquido de proceso antes de parar. Cebe y pruebe antes de reiniciar; si el pistón se atasca, detenga el accionamiento y contacte con soporte técnico."],
        ],
      },
      drive: {
        title: "Accionamiento, devanados y detección de posición inicial",
        intro: `El motor es de ${motor}. Cablee el motor y el sensor óptico por separado. Confirme el tipo de accionamiento antes de revisar alimentación y señales.`,
        rows: [
          ["Conexión de devanados", motor, p.rinse ? "Las conexiones de devanado completo y medio devanado afectan al par y a la velocidad. Ajuste la corriente según el esquema y el controlador seleccionado." : "Negro y verde forman un devanado; rojo y azul, el otro. Conecte ambas fases al controlador y no aplique un esquema de seis hilos."],
          ["Alimentación del sensor óptico", "5–24 VDC ±10%", "Confirme alimentación, masa, tipo de salida y entrada del controlador; después verifique la conmutación. La señal de posición no mide el volumen de cada dosis."],
          ["Arranque y posicionamiento", "Compruebe sentido de giro, posición inicial y posición de parada", "Verifique movimiento y flujo a baja velocidad antes de ajustar aceleración, deceleración y número de ciclos. Desconecte la alimentación antes de modificar el cableado."],
        ],
        note: "Confirme colores, conectores y corriente según el motor y el sensor óptico suministrados. No conecte ni desconecte sus cables con alimentación.",
      },
      installation: {
        title: p.rinse ? "Orientación de montaje y conexiones de proceso y lavado" : "Orientación, fijación y conexiones de proceso",
        intro: "Monte la bomba de modo que el aire pueda salir del cabezal y una fuga accidental no alcance el motor. Incluya los desniveles entre depósito, cabezal y aguja de dispensación en el diseño del circuito.",
        rows: [
          ["Conexiones de proceso", p.port, "Compruebe roscas, superficies de sellado, racores y tubos. Sujete los tubos para que no tiren del cabezal."],
          [p.rinse ? "Conexiones de lavado del pistón" : "Limpieza del circuito de proceso", p.rinse ? "1/4-28 UNF-2B; pueden llevar tapones de serie" : "Desplace los residuos por las conexiones de proceso", p.rinse ? "Conecte alimentación y retorno de lavado según su identificación. No los confunda con la entrada y salida de reactivo. Confirme líquido y conexiones antes de utilizarlos." : "Esta configuración no incluye conexiones RINSE independientes. Planifique el lavado para el líquido utilizado y no modifique las conexiones del cabezal."],
          ["Fijación mecánica", "Respete plano, ángulo de ajuste y orientación del modelo", "Deje espacio para racores, cables, ajuste de desplazamiento y mantenimiento. Tras fijar la bomba, revise de nuevo orientación y esfuerzos de los tubos."],
        ],
      },
      commissioning: {
        title: "Primera puesta en marcha y verificación del volumen entregado",
        intro: p.rinse ? "Compruebe las posiciones de arranque y parada del pistón y de la bandera del sensor antes de cebar. La imagen corresponde al giro horario visto desde el frente del motor. Al invertir el giro, se invierten las posiciones de entrada, cara plana y bandera." : "Establezca un cebado estable y sin burbujas antes de ajustar la dosis. No compense una entrega inestable por aire modificando el desplazamiento.",
        steps: [
          ["Compruebe sin alimentación", "Confirme modelo, ajuste de desplazamiento, devanados y cableado del sensor; identifique los circuitos de proceso y lavado."],
          ["Cebe y purgue", "Use un líquido compatible y baja velocidad. Observe burbujas y fugas desde el depósito hasta el cabezal y la salida; confirme el sentido del flujo."],
          ["Fije las condiciones de ensayo", p.rinse ? "Mantenga constantes desplazamiento, velocidad, contrapresión, aguja y tubos. Ejecute una vuelta completa por medición y registre 10 veces la masa entregada." : "Mantenga constantes desplazamiento, ciclos, velocidad, contrapresión, aguja y tubos. Recoja repetidamente la misma dosis objetivo."],
          ["Separe primera dosis y dosis continuas", "Registre la primera entrega tras una pausa, las entregas sucesivas y las gotas residuales. Corrija según la medición y repita la verificación al cambiar líquido o tubos."],
        ],
        note: "En medición gravimétrica, convierta masa a volumen con la densidad real del líquido a la temperatura de ensayo. Registre el método y cada resultado.",
      },
      care: {
        title: "Mantenimiento, parada y diagnóstico",
        intro: "Distinga primero problemas de alimentación, movimiento y salida; después compruébelos uno a uno. Consulte con soporte técnico antes de desmontar o intervenir en el conjunto dosificador.",
        rows: [
          ["Sin entrega o con burbujas recurrentes", "Nivel, estanqueidad de entrada, sentido del flujo y orientación", "Descarte entrada de aire, depósito vacío y tubos doblados antes de volver a cebar. No aumente simplemente la velocidad."],
          ["Dosis continuas estables y primera dosis desviada", "Retracción durante la pausa, gotas en la punta y posición de parada", "Registre duración de pausa y primera dosis por separado. Ajuste la secuencia de parada y movimiento con el circuito completo."],
          ["El caudal disminuye con el tiempo", "Cristales, resistencia de aspiración, racores obstruidos y ajuste del accionamiento", "Detenga y aplique una limpieza compatible. Compruebe tubos y filtros; no fuerce el giro de un pistón atascado."],
          ["Fugas o ruido anormal", "Esfuerzos en racores, juntas y fijación mecánica", "Detenga el funcionamiento. Conserve fotos y datos del líquido y del accionamiento; contacte con soporte técnico."],
        ],
      },
    },
    figures: {
      cycle: { alt: "Ciclo de dosificación RPL en cuatro fases: aspiración, fin de aspiración, impulsión y fin de impulsión", caption: "1 Aspiración → 2 Fin de aspiración → 3 Impulsión → 4 Fin de impulsión." },
      components: { alt: `Componentes de ${p.model} con referencias numeradas de ajuste, conexiones, sensor y montaje`, caption: p.rinse ? "1 Mando de ajuste · 2 Escala · 3 Conexión de lavado · 4 Conexión de proceso · 5 Cabezal · 6 Sensor óptico · 7 Soporte · 8 Conector eléctrico." : "1 Mando de ajuste · 2 Escala · 3 Cabezal · 4 Conexión de proceso · 5 Sensor óptico · 6 Soporte · 7 Conector eléctrico." },
      adjustment: { alt: `Ajuste mecánico del desplazamiento de ${p.model} en cuatro pasos`, caption: "1 Aflojar el tornillo de bloqueo → 2 Leer la escala → 3 Ajustar y verificar por pesada → 4 Apretar el tornillo." },
      motor4: { alt: "Devanados del motor RPL-P4 de cuatro hilos: pares negro–verde y rojo–azul", caption: "Motor de cuatro hilos: negro–verde forman un devanado; rojo–azul, el otro." },
      motor6: { alt: "Numeración de pines y devanados del motor RPL de seis hilos", caption: "Motor de seis hilos: numeración del conector y devanados. RED, BLK, YEL, BLU, WHT y ORG indican rojo, negro, amarillo, azul, blanco y naranja." },
      optical: { alt: "Sensor óptico RPL: alimentación, masa, salidas y cargas numeradas", caption: "1 Marrón: alimentación · 2 Negro: salida 1, ON con luz · 3 Blanco: salida 2, ON sin luz · 4 Azul: 0 V · 5 Carga. Aísle las salidas no utilizadas." },
      installation: { alt: `Orientaciones correctas e incorrectas y flechas de flujo de ${p.model}`, caption: "Siga las flechas de flujo, facilite la purga y evite fugas hacia el motor. ✓ Orientación correcta; ✕ incorrecta." },
      position: { alt: "Cara plana del pistón RPL hacia la entrada y bandera del sensor en posición de arranque y parada", caption: "Posición de arranque y parada: cara plana hacia la entrada; el sensor detecta el borde de la bandera." },
      measurement: { alt: "Circuito gravimétrico RPL con depósito, tubos, bomba, aguja y balanza", caption: "1 Depósito de alimentación · 2 Tubo de entrada · 3 Bomba RPL y accionamiento · 4 Tubo de salida · 5 Aguja de muestreo de extremo plano · 6 Balanza de precisión · 7 Recipiente receptor." },
    },
  };
}
