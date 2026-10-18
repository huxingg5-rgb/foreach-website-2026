import reviewedFrenchCopy from "./application-french-reviewed.json";
import {
  ivdFrExactText,
  ivdFrReplacements,
  ivdFrTermText,
} from "./ivd/ivd-application.fr";

export type FrenchApplicationExactText = Record<string, string>;

export const reviewedFrenchApplicationText: FrenchApplicationExactText =
  reviewedFrenchCopy;

const APPLICATION_FR_TERMS: Record<string, string> = {
  "首页": "Accueil",
  "应用领域": "Applications",
  "生命科学": "Sciences de la vie",
  "实验室自动化": "Automatisation de laboratoire",
  "分析仪器": "Instruments analytiques",
  "高端分析仪器": "Instruments d’analyse avancés",
  "合成生物": "Biologie synthétique",
  "合成生物学": "Biologie synthétique",
  "环保监测": "Surveillance environnementale",
  "环保与水质分析": "Surveillance environnementale et analyse de l’eau",
  "应用类型": "Types d’applications",
  "当前应用关注重点": "Priorités de l’application sélectionnée",
  "当前设备关注重点": "Priorités de l’équipement sélectionné",
  "当前仪器关注重点": "Priorités de l’instrument sélectionné",
  "当前系统关注重点": "Priorités du système sélectionné",
  "关键液路部位与产品能力":
    "Modules fluidiques clés et capacités des produits",
  "样本前处理": "Préparation des échantillons",
  "样品前处理": "Préparation des échantillons",
  "样本制备": "Préparation des échantillons",
  "清洗与洗脱": "Lavage et élution",
  "路径切换": "Commutation des circuits",
  "低残留连接": "Raccordements à faible résidu",
  "培养基补液": "Alimentation en milieu de culture",
  "细胞液转移": "Transfert de suspension cellulaire",
  "状态监测": "Surveillance de l’état",
  "移液与分液": "Pipetage et distribution",
  "清洗与废液": "Lavage et déchets",
  "模块化连接": "Raccordements modulaires",
  "样本进样": "Injection des échantillons",
  "样品进样": "Injection des échantillons",
  "缓冲液切换": "Commutation des tampons",
  "补料加液": "Alimentation et ajout de liquides",
  "在线取样": "Prélèvement en ligne",
  "排液与清洗": "Vidange et lavage",
  "液体转移": "Transfert de liquides",
  "试剂分配": "Distribution de réactifs",
  "分液控制": "Commande de distribution",
  "样本处理": "Traitement des échantillons",
  "样品处理": "Traitement des échantillons",
  "流路切换": "Commutation des circuits",
  "液路切换": "Commutation des circuits",
  "液路保护": "Protection du circuit fluidique",
  "路径管理": "Gestion des circuits",
  "过程监测": "Surveillance du processus",
  "过滤保护": "Protection par filtration",
  "防回流保护": "Protection contre le reflux",
  "防堵保护": "Protection contre le colmatage",
  "系统保护": "Protection du système",
  "泵阀保护": "Protection des pompes et des vannes",
  "系统稳定": "Stabilité du système",
  "阀位稳定": "Position stable de la vanne",
  "稀释分配": "Dosage des diluants",
  "多路径切换": "Commutation multivoie",
  "多通道切换": "Commutation multicanal",
  "多通道": "Multicanal",
  "液位检测": "Détection de niveau",
  "液位监测": "Surveillance du niveau",
  "压力监测": "Surveillance de la pression",
  "压力反馈": "Retour de pression",
  "气泡检测": "Détection des bulles",
  "气泡识别": "Détection des bulles",
  "堵塞判断": "Détection des obstructions",
  "堵塞识别": "Détection des obstructions",
  "异常反馈": "Retour d’anomalie",
  "低死体积": "Faible volume mort",
  "低吸附": "Faible adsorption",
  "低残留": "Faible résidu",
  "材料兼容": "Compatibilité des matériaux",
  "介质兼容": "Compatibilité chimique",
  "化学兼容": "Compatibilité chimique",
  "密封连接": "Raccordement étanche",
  "密封可靠": "Étanchéité fiable",
  "稳定补液": "Alimentation stable",
  "稳定补料": "Alimentation stable",
  "稳定输送": "Transfert stable",
  "稳定取样": "Prélèvement stable",
  "稳定进样": "Injection stable",
  "稳定定量": "Dosage stable",
  "重复加液": "Ajout répétitif",
  "重复分配": "Distribution répétitive",
  "长期运行": "Fonctionnement prolongé",
  "长期可靠": "Fiabilité à long terme",
  "流程稳定": "Stabilité du processus",
  "节拍稳定": "Stabilité du cycle",
  "分配一致": "Distribution régulière",
  "分配一致性": "Régularité de la distribution",
  "移液一致性": "Régularité du pipetage",
  "体积一致性": "Régularité volumétrique",
  "取样一致性": "Régularité du prélèvement",
  "清洗充分性": "Efficacité du lavage",
  "残留控制": "Maîtrise des résidus",
  "污染控制": "Maîtrise de la contamination",
  "防污染": "Prévention de la contamination",
  "防回流": "Prévention du reflux",
  "防误通": "Prévention des erreurs de circuit",
  "降低污染": "Réduction de la contamination",
  "温和输送": "Transfert en douceur",
  "封闭转移": "Transfert en circuit fermé",
  "低剪切": "Faible cisaillement",
  "废液抽排": "Évacuation des déchets liquides",
  "废液排放": "Évacuation des déchets liquides",
  "管路冲洗": "Rinçage des tubes",
  "针路清洗": "Lavage de la sonde",
  "快速维护": "Maintenance rapide",
  "维护便利": "Maintenance simple",
  "维护效率": "Efficacité de la maintenance",
  "管径适配": "Adaptation du diamètre des tubes",
  "模块化集成": "Intégration modulaire",
  "样本吸取": "Aspiration des échantillons",
  "样品吸取": "Aspiration des échantillons",
  "样本转移": "Transfert des échantillons",
  "样品转移": "Transfert des échantillons",
  "试剂加入": "Ajout de réactifs",
  "缓冲液": "Tampon",
  "清洗液": "Solution de lavage",
  "洗脱液": "Éluant",
  "培养基": "Milieu de culture",
  "诱导剂": "Inducteur",
  "营养液": "Solution nutritive",
  "添加液": "Solution d’appoint",
  "裂解液": "Solution de lyse",
  "结合液": "Solution de liaison",
  "细胞悬液": "Suspension cellulaire",
  "培养液": "Milieu de culture",
  "废液": "Déchets liquides",
  "样本": "Échantillons",
  "样品": "Échantillons",
  "试剂": "Réactifs",
  "液路": "Circuit fluidique",
  "流路": "Circuit fluidique",
  "管路": "Tubes",
  "泵": "Pompes",
  "阀": "Vannes",
  "针": "Sondes",
  "传感器": "Capteurs",
  "取样": "Prélèvement",
  "进样": "Injection des échantillons",
  "分液": "Distribution",
  "移液": "Pipetage",
  "清洗": "Lavage",
  "洗脱": "Élution",
  "过滤": "Filtration",
  "排液": "Vidange",
  "补料": "Alimentation",
  "加液": "Ajout de liquides",
  "连接": "Raccordement",
  "切换": "Commutation",
  "监测": "Surveillance",
  "识别": "Détection",
  "一致性": "Régularité",
  "稳定性": "Stabilité",
  "可靠性": "Fiabilité",
  "重复性": "Répétabilité",
  "自动化": "Automatisation",
};

const APPLICATION_FR_REPLACEMENTS: ReadonlyArray<readonly [string, string]> = [
  ["面向", "Pour "],
  ["用于", "Utilisé pour "],
  ["适合", "Adapté à "],
  ["重点关注", "en accordant une attention particulière à "],
  ["重点控制", "en maîtrisant "],
  ["重点降低", "en réduisant "],
  ["由恒永达工程团队协助评估", "pour évaluation par l’équipe d’ingénierie Foreach "],
  ["可提交", "Vous pouvez transmettre "],
  ["有", "Vous avez "],
  ["需求？", "des besoins ?"],
  ["选择", "Sélectionnez "],
  ["点击产品", "Ouvrez un produit"],
  ["只展示", "afficher uniquement "],
  ["相关产品", "produits associés"],
  ["参数", "paramètres"],
  ["优势", "avantages"],
  ["解决问题", "problèmes traités"],
  ["和", " et "],
  ["与", " et "],
  ["及", " et "],
  ["或", " ou "],
  ["等", " et autres "],
  ["中的", " dans "],
  ["之间", " entre "],
  ["过程", " processus "],
  ["场景", " applications "],
  ["设备", " équipements "],
  ["系统", " système "],
  ["应用", " application "],
  ["功能", " fonction "],
  ["能力", " capacité "],
  ["风险", " risque "],
  ["问题", " problèmes "],
  ["要求", " exigences "],
  ["范围", " plage "],
  ["空间", " espace "],
  ["控制", " commande "],
  ["管理", " gestion "],
  ["保护", " protection "],
  ["支持", " assistance "],
  ["降低", " réduire "],
  ["减少", " réduire "],
  ["提升", " améliorer "],
  ["改善", " améliorer "],
  ["完成", " réaliser "],
  ["实现", " réaliser "],
  ["提供", " fournir "],
  ["稳定", " stable "],
  ["精密", " précis "],
  ["小体积", "petit volume"],
  ["较大流量", "débit plus élevé"],
];

function localizeFrenchHref(value: string) {
  if (!value.startsWith("/")) {
    return value;
  }

  if (value === "/") {
    return "/fr";
  }

  if (value.startsWith("/fr/") || value === "/fr") {
    return value;
  }

  return `/fr${value}`;
}

function translateFrenchText(
  value: string,
  exactText: FrenchApplicationExactText,
) {
  if (value.startsWith("/")) {
    return localizeFrenchHref(value);
  }

  // Reviewed non-IVD hubs must never fall back to word-by-word translation.
  if (
    exactText === reviewedFrenchApplicationText &&
    /[\u3400-\u9fff]/.test(value) &&
    !exactText[value]
  ) {
    throw new Error(`Missing reviewed French application text: ${value}`);
  }

  const exact =
    exactText[value] ??
    ivdFrExactText[value] ??
    APPLICATION_FR_TERMS[value] ??
    ivdFrTermText[value];

  if (exact) {
    return exact;
  }

  const replacements = [
    ...Object.entries(APPLICATION_FR_TERMS),
    ...Object.entries(ivdFrTermText),
    ...APPLICATION_FR_REPLACEMENTS,
    ...ivdFrReplacements,
  ].sort((a, b) => b[0].length - a[0].length);

  let translated = value;

  for (const [source, target] of replacements) {
    translated = translated.replaceAll(source, target);
  }

  return translated
    .replaceAll("、", ", ")
    .replaceAll("，", ", ")
    .replaceAll("；", "; ")
    .replaceAll("：", " : ")
    .replaceAll("。", ". ")
    .replaceAll("“", "« ")
    .replaceAll("”", " »")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[.;]\s*$/, "");
}

export function translateFrenchApplicationData<T>(
  source: T,
  exactText: FrenchApplicationExactText,
): T {
  if (typeof source === "string") {
    return translateFrenchText(source, exactText) as T;
  }

  if (Array.isArray(source)) {
    return source.map((item) =>
      translateFrenchApplicationData(item, exactText),
    ) as T;
  }

  if (source && typeof source === "object") {
    return Object.fromEntries(
      Object.entries(source).map(([key, value]) => [
        key,
        translateFrenchApplicationData(value, exactText),
      ]),
    ) as T;
  }

  return source;
}
