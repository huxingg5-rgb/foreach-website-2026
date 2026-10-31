// Material cards and detail H1s share these headings in every supported locale.
const materialDescriptions = {
  pvc: {
    zh: "聚氯乙烯管材，内径 0.8–19.1 mm，55A / 65A 硬度可选",
    en: "Clear PVC Tubing for Liquid Handling, 0.8–19.1 mm ID, 55A/65A",
    es: "Tubo de PVC transparente para manipulación de líquidos, ID 0,8–19,1 mm, durezas 55A/65A",
    fr: "Tube PVC transparent pour la manipulation des liquides, DI 0,8–19,1 mm, duretés 55A/65A",
    ko: "액체 취급용 투명 PVC 튜브, 내경 0.8–19.1 mm, 경도 55A/65A",
    ru: "Прозрачная трубка из ПВХ для работы с жидкостями, внутренний диаметр 0,8–19,1 мм, твёрдость 55A/65A",
  },
  tpu: {
    zh: "热塑性聚氨酯管材，内径 1.6–7.0 mm，80A / 85A / 95A 硬度可选",
    en: "TPU Polyurethane Tubing for Liquid Handling, 1.6–7.0 mm ID, 80A/85A/95A",
    es: "Tubo de poliuretano TPU para manipulación de líquidos, ID 1,6–7,0 mm, durezas 80A/85A/95A",
    fr: "Tube en polyuréthane TPU pour la manipulation des liquides, DI 1,6–7,0 mm, duretés 80A/85A/95A",
    ko: "액체 취급용 TPU 폴리우레탄 튜브, 내경 1.6–7.0 mm, 경도 80A/85A/95A",
    ru: "Полиуретановая трубка TPU для работы с жидкостями, внутренний диаметр 1,6–7,0 мм, твёрдость 80A/85A/95A",
  },
  fep: {
    zh: "聚全氟乙丙烯管材，内径 0.3–2.0 mm",
    en: "Clear FEP Tubing for Reagent Lines, 0.3–2.0 mm ID, 1.6–3.2 mm OD",
    es: "Tubo FEP transparente para líneas de reactivos, ID 0,3–2,0 mm, OD 1,6–3,2 mm",
    fr: "Tube FEP transparent pour lignes de réactifs, DI 0,3–2,0 mm, DE 1,6–3,2 mm",
    ko: "시약 라인용 투명 FEP 튜브, 내경 0.3–2.0 mm, 외경 1.6–3.2 mm",
    ru: "Прозрачная трубка FEP для линий реагентов, внутренний диаметр 0,3–2,0 мм, наружный диаметр 1,6–3,2 мм",
  },
  ptfe: {
    zh: "聚四氟乙烯管材，内径 0.5–4.0 mm",
    en: "Chemical-Resistant PTFE Tubing for Liquid Handling, 0.5–4.0 mm ID",
    es: "Tubo PTFE resistente a productos químicos para manipulación de líquidos, ID 0,5–4,0 mm",
    fr: "Tube PTFE résistant aux produits chimiques pour la manipulation des liquides, DI 0,5–4,0 mm",
    ko: "액체 취급용 내화학성 PTFE 튜브, 내경 0.5–4.0 mm",
    ru: "Химически стойкая трубка PTFE для работы с жидкостями, внутренний диаметр 0,5–4,0 мм",
  },
  peek: {
    zh: "聚醚醚酮管材，内径 0.2 / 0.8 mm 可选",
    en: "PEEK Capillary Tubing for HPLC, 1/16\" and 1/32\" OD, 0.8/0.2 mm ID",
    es: "Tubo capilar de PEEK para HPLC, OD 1/16\" y 1/32\", ID 0,8/0,2 mm",
    fr: "Tube capillaire PEEK pour HPLC, DE 1/16\" et 1/32\", DI 0,8/0,2 mm",
    ko: "HPLC용 PEEK 모세관 튜브, 외경 1/16\" 및 1/32\", 내경 0.8/0.2 mm",
    ru: "Капиллярная трубка PEEK для ВЭЖХ (HPLC), наружный диаметр 1/16\" и 1/32\", внутренний диаметр 0,8/0,2 мм",
  },
  pfa: {
    zh: "全氟烷氧基聚合物管材，外径 1.6 mm，内径 0.5 / 0.8 / 1.0 mm 可选",
    en: "PFA Tubing for Analytical Liquid Lines, 1/16\" OD, 0.5/0.8/1.0 mm ID",
    es: "Tubo PFA para líneas de líquidos analíticos, OD 1/16\", ID 0,5/0,8/1,0 mm",
    fr: "Tube PFA pour lignes de liquides analytiques, DE 1/16\", DI 0,5/0,8/1,0 mm",
    ko: "분석 액체 라인용 PFA 튜브, 외경 1/16\", 내경 0.5/0.8/1.0 mm",
    ru: "Трубка PFA для аналитических жидкостных линий, наружный диаметр 1/16\", внутренний диаметр 0,5/0,8/1,0 мм",
  },
} as const;

export function getTubingMaterialHeading(slug: string, locale: string) {
  const key = slug.replace(/-tubing$/, "") as keyof typeof materialDescriptions;
  const descriptions = materialDescriptions[key];
  const description = descriptions?.[locale as keyof typeof descriptions];
  if (!description) return undefined;

  const label = key.toUpperCase();
  return { label, description, h1: `${label} ${description}` };
}
