import { createFrenchExactText } from "../application-french";
import { environmentalMonitoringEsExactText } from "./environmental-monitoring-application.es";

export const environmentalMonitoringFrExactText = createFrenchExactText(
  environmentalMonitoringEsExactText,
  {
    "环保监测": "Surveillance environnementale",
    "面向环保监测设备的": "Pour les équipements de surveillance environnementale",
    "可靠液路控制方案": "Solutions fiables de commande fluidique",
    "服务取样、试剂、清洗、排废与长期在线监测场景。":
      "Composants pour le prélèvement, les réactifs, le lavage, l’évacuation et la surveillance continue.",
    "环保监测类型": "Types de surveillance environnementale",
    "选择具体环保监测应用后，下方内容会同步展示该场景的液路关注重点、关键部位和对应产品能力。":
      "Sélectionnez une application de surveillance environnementale pour consulter ses priorités fluidiques, ses modules clés et les capacités des produits associés.",
    "当前应用关注重点": "Priorités de l’application sélectionnée",
    "有环保设备液路设计或国产替代需求？":
      "Vous devez concevoir le circuit fluidique d’un équipement environnemental ou évaluer une solution de remplacement locale ?",
    "可提交环保类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与环保监测液路方案。":
      "Transmettez le type d’équipement, le fluide, le débit cible, la plage de pression, les dimensions des tubes, les contraintes d’encombrement et le problème actuel. L’équipe d’ingénierie FOREACH vous aidera à évaluer la combinaison de pompes, de vannes et de tubes, la compatibilité des matériaux et la solution fluidique de surveillance.",
  },
);
