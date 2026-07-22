import {
  ivdEsExactText,
  ivdEsReplacements,
  ivdEsTermText,
} from "./ivd/ivd-application.es";

export type SpanishApplicationExactText = Record<string, string>;

const APPLICATION_ES_TERMS: Record<string, string> = {
  "首页": "Inicio",
  "应用领域": "Aplicaciones",
  "生命科学": "Ciencias de la vida",
  "实验室自动化": "Automatización de laboratorio",
  "分析仪器": "Instrumentos analíticos",
  "高端分析仪器": "Instrumentos analíticos avanzados",
  "合成生物": "Biología sintética",
  "合成生物学": "Biología sintética",
  "环保监测": "Monitoreo ambiental",
  "环保与水质分析": "Monitoreo ambiental y análisis de agua",
  "应用类型": "Tipos de aplicación",
  "当前应用关注重点": "Prioridades de la aplicación seleccionada",
  "当前系统关注重点": "Prioridades del sistema seleccionado",
  "关键液路部位与产品能力": "Módulos fluídicos clave y capacidades de producto",
  "样本前处理": "Preparación de muestras",
  "样本制备": "Preparación de muestras",
  "清洗与洗脱": "Lavado y elución",
  "路径切换": "Conmutación de circuitos",
  "低残留连接": "Conexiones de bajo residuo",
  "培养基补液": "Suministro de medio de cultivo",
  "细胞液转移": "Transferencia de suspensión celular",
  "状态监测": "Monitorización de estado",
  "移液与分液": "Pipeteo y dispensación",
  "清洗与废液": "Lavado y residuos",
  "模块化连接": "Conexiones modulares",
  "样本进样": "Introducción de muestras",
  "缓冲液切换": "Conmutación de tampones",
  "补料加液": "Alimentación y adición de líquidos",
  "在线取样": "Muestreo en línea",
  "排液与清洗": "Drenaje y lavado",
  "液体转移": "Transferencia de líquidos",
  "试剂分配": "Dispensación de reactivos",
  "分液控制": "Control de dispensación",
  "样本处理": "Procesamiento de muestras",
  "流路切换": "Conmutación de circuitos",
  "液路切换": "Conmutación de circuitos",
  "液路保护": "Protección del circuito fluídico",
  "路径管理": "Gestión de circuitos",
  "过程监测": "Monitorización del proceso",
  "过滤保护": "Protección por filtración",
  "防回流保护": "Protección contra el retorno",
  "防堵保护": "Protección contra obstrucciones",
  "系统保护": "Protección del sistema",
  "泵阀保护": "Protección de bombas y válvulas",
  "系统稳定": "Estabilidad del sistema",
  "阀位稳定": "Posición estable de la válvula",
  "稀释分配": "Dosificación para dilución",
  "多路径切换": "Conmutación multivía",
  "多通道切换": "Conmutación multicanal",
  "多通道": "Multicanal",
  "液位检测": "Detección de nivel",
  "液位监测": "Monitorización de nivel",
  "压力监测": "Monitorización de presión",
  "压力反馈": "Realimentación de presión",
  "气泡检测": "Detección de burbujas",
  "气泡识别": "Detección de burbujas",
  "堵塞判断": "Detección de obstrucciones",
  "堵塞识别": "Detección de obstrucciones",
  "异常反馈": "Realimentación de anomalías",
  "低死体积": "Bajo volumen muerto",
  "低吸附": "Baja adsorción",
  "低残留": "Bajo residuo",
  "材料兼容": "Compatibilidad de materiales",
  "介质兼容": "Compatibilidad química",
  "化学兼容": "Compatibilidad química",
  "密封连接": "Conexión estanca",
  "密封可靠": "Sellado fiable",
  "稳定补液": "Suministro estable",
  "稳定补料": "Alimentación estable",
  "稳定输送": "Suministro estable",
  "稳定取样": "Muestreo estable",
  "稳定进样": "Introducción estable",
  "稳定定量": "Dosificación estable",
  "重复加液": "Adición repetida",
  "重复分配": "Dispensación repetida",
  "长期运行": "Funcionamiento prolongado",
  "长期可靠": "Fiabilidad a largo plazo",
  "流程稳定": "Estabilidad del proceso",
  "节拍稳定": "Estabilidad del ciclo",
  "分配一致": "Dispensación uniforme",
  "分配一致性": "Uniformidad de dispensación",
  "移液一致性": "Uniformidad de pipeteo",
  "体积一致性": "Uniformidad de volumen",
  "取样一致性": "Uniformidad de muestreo",
  "清洗充分性": "Eficacia del lavado",
  "残留控制": "Control de residuos",
  "污染控制": "Control de contaminación",
  "防污染": "Prevención de contaminación",
  "防回流": "Prevención del retorno",
  "防误通": "Prevención de rutas erróneas",
  "降低污染": "Reducción de la contaminación",
  "温和输送": "Transferencia suave",
  "封闭转移": "Transferencia cerrada",
  "低剪切": "Bajo cizallamiento",
  "废液抽排": "Evacuación de residuos",
  "废液排放": "Evacuación de residuos",
  "管路冲洗": "Enjuague de tubos",
  "针路清洗": "Lavado de la sonda",
  "快速维护": "Mantenimiento rápido",
  "维护便利": "Mantenimiento sencillo",
  "维护效率": "Eficiencia de mantenimiento",
  "管径适配": "Adaptación del diámetro de tubo",
  "模块化集成": "Integración modular",
  "样本吸取": "Aspiración de muestras",
  "样本转移": "Transferencia de muestras",
  "试剂加入": "Adición de reactivos",
  "缓冲液": "Tampón",
  "清洗液": "Solución de lavado",
  "洗脱液": "Eluyente",
  "培养基": "Medio de cultivo",
  "诱导剂": "Inductor",
  "营养液": "Solución nutritiva",
  "添加液": "Solución de adición",
  "裂解液": "Solución de lisis",
  "结合液": "Solución de unión",
  "细胞悬液": "Suspensión celular",
  "培养液": "Medio de cultivo",
  "废液": "Residuos líquidos",
  "样本": "Muestras",
  "试剂": "Reactivos",
  "液路": "Circuito fluídico",
  "流路": "Circuito fluídico",
  "管路": "Tubos",
  "泵": "Bombas",
  "阀": "Válvulas",
  "针": "Sondas",
  "传感器": "Sensores",
  "取样": "Muestreo",
  "进样": "Introducción de muestras",
  "分液": "Dispensación",
  "移液": "Pipeteo",
  "清洗": "Lavado",
  "洗脱": "Elución",
  "过滤": "Filtración",
  "排液": "Drenaje",
  "补料": "Alimentación",
  "加液": "Adición de líquidos",
  "连接": "Conexión",
  "切换": "Conmutación",
  "监测": "Monitorización",
  "识别": "Detección",
  "一致性": "Uniformidad",
  "稳定性": "Estabilidad",
  "可靠性": "Fiabilidad",
  "重复性": "Repetibilidad",
  "自动化": "Automatización",
};

const APPLICATION_ES_REPLACEMENTS: ReadonlyArray<readonly [string, string]> = [
  ["面向", "Para "],
  ["用于", "Se utiliza para "],
  ["适合", "Adecuado para "],
  ["重点关注", "con especial atención a "],
  ["重点控制", "controlando "],
  ["重点降低", "reduciendo "],
  ["由恒永达工程团队协助评估", "para que el equipo de ingeniería de FOREACH evalúe "],
  ["可提交", "Puede enviar "],
  ["有", "¿Tiene "],
  ["需求？", "necesidades?"],
  ["选择", "Seleccione "],
  ["点击产品", "Abra un producto"],
  ["只展示", "mostrar únicamente "],
  ["相关产品", "productos relacionados"],
  ["参数", "parámetros"],
  ["优势", "ventajas"],
  ["解决问题", "problemas que ayuda a resolver"],
  ["和", " y "],
  ["与", " y "],
  ["及", " y "],
  ["或", " o "],
  ["等", " y otros "],
  ["中的", " en "],
  ["之间", " entre "],
  ["过程", " proceso "],
  ["场景", " aplicaciones "],
  ["设备", " equipos "],
  ["系统", " sistema "],
  ["应用", " aplicación "],
  ["功能", " función "],
  ["能力", " capacidad "],
  ["风险", " riesgo "],
  ["问题", " problemas "],
  ["要求", " requisitos "],
  ["范围", " rango "],
  ["空间", " espacio "],
  ["控制", " control "],
  ["管理", " gestión "],
  ["保护", " protección "],
  ["支持", " soporte "],
  ["降低", " reducir "],
  ["减少", " reducir "],
  ["提升", " mejorar "],
  ["改善", " mejorar "],
  ["完成", " completar "],
  ["实现", " realizar "],
  ["提供", " proporcionar "],
  ["稳定", " estable "],
  ["精密", " preciso "],
  ["小体积", "pequeño volumen"],
  ["较大流量", "mayor caudal"],
];

function localizeSpanishHref(value: string) {
  if (!value.startsWith("/")) {
    return value;
  }

  if (value === "/") {
    return "/es";
  }

  if (value.startsWith("/es/") || value === "/es") {
    return value;
  }

  return `/es${value}`;
}

function translateSpanishText(
  value: string,
  exactText: SpanishApplicationExactText,
) {
  if (value.startsWith("/")) {
    return localizeSpanishHref(value);
  }

  const exact =
    exactText[value] ??
    ivdEsExactText[value] ??
    APPLICATION_ES_TERMS[value] ??
    ivdEsTermText[value];

  if (exact) {
    return exact;
  }

  const replacements = [
    ...Object.entries(APPLICATION_ES_TERMS),
    ...Object.entries(ivdEsTermText),
    ...APPLICATION_ES_REPLACEMENTS,
    ...ivdEsReplacements,
  ].sort((a, b) => b[0].length - a[0].length);

  let translated = value;

  for (const [source, target] of replacements) {
    translated = translated.replaceAll(source, target);
  }

  return translated
    .replaceAll("、", ", ")
    .replaceAll("，", ", ")
    .replaceAll("；", "; ")
    .replaceAll("：", ": ")
    .replaceAll("。", ". ")
    .replaceAll("“", "«")
    .replaceAll("”", "»")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.;]\s*$/, "");
}

export function translateSpanishApplicationData<T>(
  source: T,
  exactText: SpanishApplicationExactText,
): T {
  if (typeof source === "string") {
    return translateSpanishText(source, exactText) as T;
  }

  if (Array.isArray(source)) {
    return source.map((item) =>
      translateSpanishApplicationData(item, exactText),
    ) as T;
  }

  if (source && typeof source === "object") {
    return Object.fromEntries(
      Object.entries(source).map(([key, value]) => [
        key,
        translateSpanishApplicationData(value, exactText),
      ]),
    ) as T;
  }

  return source;
}
