import { createFrenchExactText } from "../application-french";
import { syntheticBiologyEsExactText } from "./synthetic-biology-application.es";

export const syntheticBiologyFrExactText = createFrenchExactText(
  syntheticBiologyEsExactText,
  {
    "合成生物": "Biologie synthétique",
    "面向合成生物系统的": "Pour les systèmes de biologie synthétique",
    "稳定液路控制方案": "Solutions de commande fluidique stable",
    "服务补料、取样、排液、清洗与过程状态监测场景。":
      "Composants pour l’alimentation, le prélèvement, la vidange, le lavage et la surveillance des processus.",
    "合成生物类型": "Types de systèmes de biologie synthétique",
    "选择具体合成生物应用后，下方内容会同步展示该场景的液路关注重点、关键部位和对应产品能力。":
      "Sélectionnez une application de biologie synthétique pour consulter ses priorités fluidiques, ses modules clés et les capacités des produits associés.",
    "当前系统关注重点": "Priorités du système sélectionné",
    "有合成生物设备液路设计或国产替代需求？":
      "Vous devez concevoir le circuit fluidique d’un équipement de biologie synthétique ou évaluer une solution de remplacement locale ?",
    "可提交合成生物类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与合成生物液路方案。":
      "Transmettez le type de système, le fluide, le débit cible, la plage de pression, les dimensions des tubes, les contraintes d’encombrement et le problème actuel. L’équipe d’ingénierie FOREACH vous aidera à évaluer la combinaison de pompes, de vannes et de tubes, la compatibilité des matériaux et la solution fluidique.",
  },
);
