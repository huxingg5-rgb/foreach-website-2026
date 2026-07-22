import { createFrenchExactText } from "../application-french";
import { analyticalInstrumentsEsExactText } from "./analytical-instruments-application.es";

export const analyticalInstrumentsFrExactText = createFrenchExactText(
  analyticalInstrumentsEsExactText,
  {
    "分析仪器": "Instruments analytiques",
    "面向分析检测设备的": "Pour les équipements d’analyse et d’essai",
    "精密液路控制方案": "Solutions de commande fluidique de précision",
    "服务进样、试剂、清洗、排废与低残留液路场景。":
      "Composants pour l’injection des échantillons, les réactifs, le lavage, l’évacuation et les circuits à faible résidu.",
    "分析仪器类型": "Types d’instruments analytiques",
    "选择具体分析仪器应用后，下方内容会同步展示该场景的液路关注重点、关键部位和对应产品能力。":
      "Sélectionnez une application d’instrumentation analytique pour consulter ses priorités fluidiques, ses modules clés et les capacités des produits associés.",
    "当前仪器关注重点": "Priorités de l’instrument sélectionné",
    "有分析仪器设备液路设计或国产替代需求？":
      "Vous devez concevoir le circuit fluidique d’un instrument analytique ou évaluer une solution de remplacement locale ?",
    "可提交分析仪器类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与分析液路集成方案。":
      "Transmettez le type d’instrument, le fluide, le débit cible, la plage de pression, les dimensions des tubes, les contraintes d’encombrement et le problème actuel. L’équipe d’ingénierie FOREACH vous aidera à évaluer la combinaison de pompes, de vannes et de tubes, la compatibilité des matériaux et l’intégration du circuit analytique.",
  },
);
