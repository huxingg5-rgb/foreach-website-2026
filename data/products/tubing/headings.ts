// Material cards and detail H1s share these headings in every supported locale.
const materialDescriptions = {
  pvc: {
    zh: "聚氯乙烯管材，内径 0.8–19.1 mm，55A / 65A 硬度可选",
    en: "Polyvinyl chloride tubing, ID 0.8–19.1 mm, 55A / 65A hardness options",
    es: "Tubo de policloruro de vinilo, diámetro interior 0.8–19.1 mm, durezas 55A / 65A disponibles",
    fr: "Tube en polychlorure de vinyle, diamètre intérieur 0.8–19.1 mm, duretés 55A / 65A au choix",
    ko: "폴리염화비닐 튜브, 내경 0.8–19.1 mm, 경도 55A / 65A 선택 가능",
    ru: "Трубка из поливинилхлорида, внутренний диаметр 0.8–19.1 мм, твёрдость 55A / 65A на выбор",
  },
  tpu: {
    zh: "热塑性聚氨酯管材，内径 1.6–7.0 mm，80A / 85A / 95A 硬度可选",
    en: "Thermoplastic polyurethane tubing, ID 1.6–7.0 mm, 80A / 85A / 95A hardness options",
    es: "Tubo de poliuretano termoplástico, diámetro interior 1.6–7.0 mm, durezas 80A / 85A / 95A disponibles",
    fr: "Tube en polyuréthane thermoplastique, diamètre intérieur 1.6–7.0 mm, duretés 80A / 85A / 95A au choix",
    ko: "열가소성 폴리우레탄 튜브, 내경 1.6–7.0 mm, 경도 80A / 85A / 95A 선택 가능",
    ru: "Трубка из термопластичного полиуретана, внутренний диаметр 1.6–7.0 мм, твёрдость 80A / 85A / 95A на выбор",
  },
  fep: {
    zh: "聚全氟乙丙烯管材，内径 0.3–2.0 mm",
    en: "Fluorinated ethylene propylene tubing, ID 0.3–2.0 mm",
    es: "Tubo de etileno propileno fluorado, diámetro interior 0.3–2.0 mm",
    fr: "Tube en éthylène-propylène fluoré, diamètre intérieur 0.3–2.0 mm",
    ko: "불소화 에틸렌 프로필렌 튜브, 내경 0.3–2.0 mm",
    ru: "Трубка из фторированного этилен-пропилена, внутренний диаметр 0.3–2.0 мм",
  },
  ptfe: {
    zh: "聚四氟乙烯管材，内径 0.5–4.0 mm",
    en: "Polytetrafluoroethylene tubing, ID 0.5–4.0 mm",
    es: "Tubo de politetrafluoroetileno, diámetro interior 0.5–4.0 mm",
    fr: "Tube en polytétrafluoroéthylène, diamètre intérieur 0.5–4.0 mm",
    ko: "폴리테트라플루오로에틸렌 튜브, 내경 0.5–4.0 mm",
    ru: "Трубка из политетрафторэтилена, внутренний диаметр 0.5–4.0 мм",
  },
  peek: {
    zh: "聚醚醚酮管材，内径 0.2 / 0.8 mm 可选",
    en: "Polyether ether ketone tubing, ID options 0.2 / 0.8 mm",
    es: "Tubo de polieteretercetona, diámetros interiores de 0.2 / 0.8 mm disponibles",
    fr: "Tube en polyétheréthercétone, diamètres intérieurs 0.2 / 0.8 mm au choix",
    ko: "폴리에테르에테르케톤 튜브, 내경 0.2 / 0.8 mm 선택 가능",
    ru: "Трубка из полиэфирэфиркетона, внутренний диаметр 0.2 / 0.8 мм на выбор",
  },
  pfa: {
    zh: "全氟烷氧基聚合物管材，外径 1.6 mm，内径 0.5 / 0.8 / 1.0 mm 可选",
    en: "Perfluoroalkoxy polymer tubing, OD 1.6 mm, ID options 0.5 / 0.8 / 1.0 mm",
    es: "Tubo de polímero perfluoroalcoxi, diámetro exterior 1.6 mm, diámetros interiores de 0.5 / 0.8 / 1.0 mm disponibles",
    fr: "Tube en polymère perfluoroalcoxy, diamètre extérieur 1.6 mm, diamètres intérieurs 0.5 / 0.8 / 1.0 mm au choix",
    ko: "퍼플루오로알콕시 폴리머 튜브, 외경 1.6 mm, 내경 0.5 / 0.8 / 1.0 mm 선택 가능",
    ru: "Трубка из перфторалкоксиполимера, наружный диаметр 1.6 мм, внутренний диаметр 0.5 / 0.8 / 1.0 мм на выбор",
  },
} as const;

export function getTubingMaterialHeading(slug: string, locale: string) {
  const key = slug.replace(/-tubing$/, "") as keyof typeof materialDescriptions;
  const descriptions = materialDescriptions[key];
  const description = descriptions?.[locale as keyof typeof descriptions];
  if (!description) return undefined;

  const label = key.toUpperCase();
  return { label, description, h1: `FOREACH ${label} ${description}` };
}
