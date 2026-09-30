import { syringePumpIntroLocales } from "./syringe-pump-intro.locales";
import { syringePumpIntroEn } from "./syringe-pump-intro.en";
import { instrumentIntrosZh } from "./instrument-fluidics-copy.zh";
export const syringeSeriesSlugs = ["solenoid-valve-syringe-pumps", "rotary-valve-syringe-pumps"];
export function getSyringeSeriesIndex(slug: string) { return syringeSeriesSlugs.indexOf(slug); }
export const syringeSeriesFilters = ["HMD 电磁阀系列注射泵", "HLD 旋转阀系列注射泵"];
const titles: Record<string, string[]> = {
  "zh": [
    "HMD 系列电磁阀注射泵",
    "HLD 系列旋转阀注射泵"
  ],
  "en": [
    "HMD OEM Syringe Pumps with Solenoid Valves for Reagent Dispensing",
    "HLD OEM Syringe Pumps with Rotary Valves for Reagent Selection and Dispensing"
  ],
  "es": [
    "Bombas de jeringa OEM HMD con electroválvulas para dosificación de reactivos",
    "Bombas de jeringa OEM HLD con válvulas rotativas para selección y dosificación de reactivos"
  ],
  "fr": [
    "Pompes à seringue OEM HMD avec électrovannes pour le dosage de réactifs",
    "Pompes à seringue OEM HLD avec vannes rotatives pour la sélection et le dosage de réactifs"
  ],
  "ko": [
    "시약 분주용 솔레노이드 밸브 탑재 HMD OEM 시린지 펌프",
    "시약 선택 및 분주용 로터리 밸브 탑재 HLD OEM 시린지 펌프"
  ],
  "ru": [
    "OEM-шприцевые насосы HMD с электромагнитными клапанами для дозирования реагентов",
    "OEM-шприцевые насосы HLD с поворотными клапанами для выбора и дозирования реагентов"
  ]
};
const intros: Record<string, string[]> = {
  "zh": [
    "恒永达 HMD 电磁阀注射泵将玻璃注射器计量与电磁阀液路切换结合，用于自动化分析仪器的试剂定量加液、样本稀释和多通道液体分配。注射器驱动机构控制吸液与排液，电磁阀切换连接的液体路径。",
    "恒永达 HLD 旋转阀注射泵将玻璃注射器计量与多通旋转阀选路结合，用于自动化分析仪器的多试剂选择、样本稀释和定量分配。旋转阀选择连接的液源或输出路径，注射器完成吸液与排液。"
  ],
  "en": [
    "FOREACH HMD OEM syringe pumps combine glass-syringe metering with solenoid-valve switching for reagent dispensing, sample dilution and multichannel liquid dispensing in automated analytical instruments. The syringe drive controls aspiration and dispensing, while the solenoid valves switch the connected fluid paths.",
    "FOREACH HLD OEM syringe pumps combine glass-syringe metering with multi-way rotary valves for reagent selection, sample dilution and metered dispensing in automated analytical instruments. The rotary valve selects the liquid source or delivery path, while the syringe controls aspiration and dispensing."
  ],
  "es": [
    "Las bombas de jeringa OEM HMD FOREACH combinan dosificación por jeringa de vidrio y conmutación mediante electroválvulas para dispensar reactivos, diluir muestras y distribuir líquidos en varios canales en instrumentos analíticos automatizados.",
    "Las bombas de jeringa OEM HLD FOREACH combinan dosificación por jeringa de vidrio y selección mediante válvulas rotativas para seleccionar reactivos, diluir muestras y dispensar volúmenes dosificados en instrumentos analíticos automatizados."
  ],
  "fr": [
    "Les pompes à seringue OEM HMD FOREACH associent le dosage par seringue en verre à la commutation par électrovannes pour distribuer des réactifs, diluer des échantillons et distribuer des liquides sur plusieurs canaux dans les instruments d’analyse automatisés.",
    "Les pompes à seringue OEM HLD FOREACH associent le dosage par seringue en verre à la sélection par vannes rotatives pour sélectionner des réactifs, diluer des échantillons et distribuer des volumes dosés dans les instruments d’analyse automatisés."
  ],
  "ko": [
    "FOREACH HMD OEM 시린지 펌프는 유리 시린지 정량 기구와 솔레노이드 밸브 유로 전환을 결합하여 자동 분석 장비의 시약 분주, 시료 희석 및 다중 채널 액체 분주에 사용됩니다. 시린지는 흡입과 토출을 제어하고 솔레노이드 밸브는 연결된 유로를 전환합니다.",
    "FOREACH HLD OEM 시린지 펌프는 유리 시린지 정량 기구와 다방향 로터리 밸브를 결합하여 자동 분석 장비의 시약 선택, 시료 희석 및 정량 분주에 사용됩니다. 로터리 밸브가 액체 공급원 또는 토출 경로를 선택하고 시린지가 흡입과 토출을 수행합니다."
  ],
  "ru": [
    "OEM-шприцевые насосы HMD FOREACH объединяют дозирование стеклянным шприцем с переключением электромагнитных клапанов для подачи реагентов, разведения образцов и многоканального распределения жидкостей в автоматизированных аналитических приборах.",
    "OEM-шприцевые насосы HLD FOREACH объединяют дозирование стеклянным шприцем с выбором пути поворотным клапаном для выбора реагентов, разведения образцов и дозированной подачи в автоматизированных аналитических приборах."
  ]
};
export function getSyringeSeriesCopy(locale: string, index: number) {
  const lang = titles[locale] ? locale : "en";
  const category = lang === "zh" ? instrumentIntrosZh["syringe-pump"] : lang === "en" ? syringePumpIntroEn.category : syringePumpIntroLocales[lang];
  const splitMarkers: Record<string, string> = { zh: "HLD 系列", en: "The HLD series", es: "La serie HLD", fr: "La série HLD", ko: "HLD 시리즈", ru: "Серия HLD" };
  const config = category.paragraphs[2];
  const split = config.indexOf(splitMarkers[lang]);
  return { title: titles[lang][index], paragraphs: [intros[lang][index], category.paragraphs[1], index === 0 ? config.slice(0, split).trim() : config.slice(split).trim()], imageAlt: titles[lang][index] };
}
export function getSyringeSeriesPath(locale: string, index: number) {
  return (locale === "zh" ? "" : "/" + locale) + "/products/pumps/syringe-pumps/" + syringeSeriesSlugs[index] + "/";
}
