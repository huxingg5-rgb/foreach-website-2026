import { createFrenchExactText } from "../application-french";
import { labAutomationEsExactText } from "./lab-automation-application.es";

export const labAutomationFrExactText = createFrenchExactText(
  labAutomationEsExactText,
  {
    "实验室自动化": "Automatisation de laboratoire",
    "面向实验室自动化的": "Pour l’automatisation de laboratoire",
    "精密液路集成方案": "Solutions d’intégration fluidique de précision",
    "服务移液、分液、清洗、排废与多工位液路集成场景。":
      "Composants pour le pipetage, la distribution, le lavage, l’évacuation des déchets et l’intégration fluidique multiposte.",
    "自动化设备类型": "Types d’équipements automatisés",
    "选择具体实验室自动化应用后，下方内容会同步展示该场景的液路关注重点、关键部位和对应产品能力。":
      "Sélectionnez une application d’automatisation de laboratoire pour consulter ses priorités fluidiques, ses modules clés et les capacités des produits associés.",
    "当前设备关注重点": "Priorités de l’équipement sélectionné",
    "有实验室自动化设备液路设计或国产替代需求？":
      "Vous devez concevoir le circuit fluidique d’un équipement d’automatisation de laboratoire ou évaluer une solution de remplacement locale ?",
    "可提交自动化设备类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与液路集成方案。":
      "Transmettez le type d’équipement, le fluide, le débit cible, la plage de pression, les dimensions des tubes, les contraintes d’encombrement et le problème actuel. L’équipe d’ingénierie FOREACH vous aidera à évaluer la combinaison de pompes, de vannes et de tubes, la compatibilité des matériaux et l’intégration fluidique.",
  },
);
