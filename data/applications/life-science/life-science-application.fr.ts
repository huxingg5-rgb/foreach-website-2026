import { createFrenchExactText } from "../application-french";
import { lifeScienceEsExactText } from "./life-science-application.es";

export const lifeScienceFrExactText = createFrenchExactText(
  lifeScienceEsExactText,
  {
    "生命科学": "Sciences de la vie",
    "面向生命科学实验的": "Pour les expériences en sciences de la vie",
    "自动化液体处理方案":
      "Solutions automatisées de manipulation des liquides",
    "服务样本制备、移液分液、细胞培养与实验自动化场景。":
      "Composants fluidiques pour la préparation des échantillons, le pipetage, la distribution, la culture cellulaire et l’automatisation de laboratoire.",
    "应用类型": "Types d’applications",
    "选择具体生命科学应用后，下方内容会同步展示该场景的液路关注重点、关键部位和对应产品能力。":
      "Sélectionnez une application en sciences de la vie pour consulter ses priorités fluidiques, ses modules clés et les capacités des produits associés.",
    "当前应用关注重点": "Priorités de l’application sélectionnée",
    "关键液路部位与产品能力":
      "Modules fluidiques clés et capacités des produits",
    "选择液路部位后，只展示该部位相关产品。点击产品可展开参数、优势和解决问题。":
      "Sélectionnez un module fluidique pour afficher les produits associés. Ouvrez un produit pour consulter ses paramètres, ses avantages et les problèmes traités.",
    "有生命科学设备液路设计或国产替代需求？":
      "Vous devez concevoir le circuit fluidique d’un équipement de sciences de la vie ou évaluer une solution de remplacement locale ?",
    "可提交应用类型、液体介质、目标流量、压力范围、管路尺寸、空间限制和当前问题，由恒永达工程团队协助评估泵阀管路组合、材料兼容性与实验液路方案。":
      "Transmettez le type d’application, le fluide, le débit cible, la plage de pression, les dimensions des tubes, les contraintes d’encombrement et le problème actuel. L’équipe d’ingénierie FOREACH vous aidera à évaluer la combinaison de pompes, de vannes et de tubes, la compatibilité des matériaux et la solution fluidique.",
    "提交应用需求": "Soumettre les exigences de l’application",
  },
);
