import { getInstrumentProductGuide, type GuideFigure, type InstrumentProductGuide } from "./instrument-product-guides.zh";
import { getValvelessLocaleCopy } from "./valveless-pump-locales";
import { getEnglishRplGuide } from "./rpl-guide-locales/en";
import { getSpanishRplGuide } from "./rpl-guide-locales/es";
import { getFrenchRplGuide } from "./rpl-guide-locales/fr";
import { getKoreanRplGuide } from "./rpl-guide-locales/ko";
import { getRussianRplGuide } from "./rpl-guide-locales/ru";
import type { RplFigureKey, RplGuideLocale } from "./rpl-guide-locales/types";
import { getRplSelectionArticles } from "@/data/resources/technical-articles/rpl-valveless-metering-pump-selection.article";
import { getValvelessMeteringPumpOverviewArticles } from "@/data/resources/technical-articles/what-is-a-valveless-metering-pump.article";
import { getMeteringPumpAccuracyRepeatabilityArticles } from "@/data/resources/technical-articles/metering-pump-accuracy-repeatability.article";

const builders = { en: getEnglishRplGuide, es: getSpanishRplGuide, fr: getFrenchRplGuide, ko: getKoreanRplGuide, ru: getRussianRplGuide };
const models = {
  "rpl-p4": { model: "RPL-P4", range: "12–80", port: "1/4-28 UNF-2B", rinse: false, testRpm: 100, ceramic: "alumina" },
  "rpl-p635": { model: "RPL-P6.35", range: "50–300", port: "1/4-28 UNF-2B", rinse: true, testRpm: 100, ceramic: "zirconia" },
  "rpl-p15": { model: "RPL-P15", range: "300–1200", port: "G1/8", rinse: true, testRpm: 300, ceramic: "alumina" },
} as const;

function figureKey(file: string): RplFigureKey {
  if (file.includes("working-cycle")) return "cycle";
  if (file.includes("components")) return "components";
  if (file.includes("range-adjustment")) return "adjustment";
  if (file.includes("motor-wiring")) return file.startsWith("rpl-p4-") ? "motor4" : "motor6";
  if (file.includes("optocoupler")) return "optical";
  if (file.includes("installation")) return "installation";
  if (file.includes("start-stop")) return "position";
  if (file.includes("gravimetric")) return "measurement";
  throw new Error(`Unknown RPL guide figure: ${file}`);
}

const windingLegends: Record<RplGuideLocale, readonly string[]> = {
  en: ["I Bipolar drive: H = half winding, F = full winding. II Unipolar drive.", "① Driver terminals · ② Motor connector · # Pin number · φ Phase."],
  es: ["I Accionamiento bipolar: H = medio devanado, F = devanado completo. II Accionamiento unipolar.", "① Bornes del controlador · ② Conector del motor · # Número de pin · φ Fase."],
  fr: ["I Commande bipolaire : H = demi-enroulement, F = enroulement complet. II Commande unipolaire.", "① Bornes du pilote · ② Connecteur moteur · # Numéro de broche · φ Phase."],
  ko: ["I 바이폴라 구동: H = 반권선, F = 전체 권선. II 유니폴라 구동.", "① 드라이버 단자 · ② 모터 커넥터 · # 핀 번호 · φ 상."],
  ru: ["I Биполярный привод: H — полуобмотка, F — полная обмотка. II Униполярный привод.", "① Клеммы драйвера · ② Разъём двигателя · # Номер контакта · φ Фаза."],
};

function adjustmentLegend(locale: RplGuideLocale, large: boolean): readonly string[] {
  const volume = large ? "74" : "16.5";
  const example = large ? "800 → 950 μL" : "100 → 150 μL";
  const divisions = large ? 2 : 3;
  return {
    en: [`One scale division gives an approximate change of ${volume} μL per revolution. The scale is for coarse adjustment; verify the final setting by weighing.`, `Adjustment example: ${example}, approximately ${divisions} divisions in the illustrated head-down direction. Loosen the locking screw only enough to permit adjustment, then retighten it.`],
    es: [`Una división de escala cambia aproximadamente ${volume.replace(".", ",")} μL por vuelta. La escala sirve para el ajuste aproximado; verifique el ajuste final por pesada.`, `Ejemplo: ${example}, unas ${divisions} divisiones en el sentido ilustrado que baja el cabezal. Afloje el tornillo solo lo necesario para ajustar y vuelva a apretarlo.`],
    fr: [`Une division correspond à environ ${volume.replace(".", ",")} μL par tour. L’échelle sert au réglage grossier ; vérifiez le réglage final par pesée.`, `Exemple : ${example}, environ ${divisions} divisions dans le sens illustré d’inclinaison de la tête vers le bas. Desserrez la vis juste assez pour régler, puis resserrez-la.`],
    ko: [`눈금 한 칸당 회전당 토출량은 약 ${volume} μL 변합니다. 눈금은 대략적인 조정용이며 최종 설정은 중량 측정으로 확인하세요.`, `조정 예: ${example}, 그림과 같이 헤드를 아래로 기울이는 방향으로 약 ${divisions}칸입니다. 고정 나사는 조정 가능한 정도만 풀고 조정 후 다시 조이세요.`],
    ru: [`Одно деление соответствует изменению примерно на ${volume.replace(".", ",")} мкл за оборот. Шкала предназначена для грубой настройки; окончательное значение проверяйте взвешиванием.`, `Пример: ${example}, около ${divisions} делений в показанном направлении наклона головки вниз. Ослабьте винт лишь настолько, насколько нужно для регулировки, затем затяните его.`],
  }[locale];
}

/** Localize the approved RPL structure only; Chinese and every DRPL route stay independent. */
export function getLocalizedRplGuide(slug: string, locale: string): InstrumentProductGuide | undefined {
  const profile = models[slug as keyof typeof models];
  const build = builders[locale as RplGuideLocale];
  const source = profile && getInstrumentProductGuide(slug);
  const terminology = getValvelessLocaleCopy(locale);
  if (!profile || !source || !build || !terminology) return undefined;
  const language = locale as RplGuideLocale;
  const text = build({ ...profile, ceramic: terminology.materials[profile.ceramic] });
  const translateFigure = (figure: GuideFigure): GuideFigure => {
    const key = figureKey(figure.file);
    return { file: figure.file, ...text.figures[key],
      ...(key === "motor6" ? { legend: windingLegends[language] } : {}),
      ...(key === "adjustment" ? { legend: adjustmentLegend(language, slug === "rpl-p15") } : {}),
    };
  };
  const article = (item: { slug: string; title: string }) => ({ href: `/${locale}/resources/technical-articles/${item.slug}/`, label: item.title });
  const links = {
    principle: [article(getValvelessMeteringPumpOverviewArticles(language)[0])],
    displacement: [article(getRplSelectionArticles(language)[0])],
    commissioning: [article(getMeteringPumpAccuracyRepeatabilityArticles(language)[0])],
  };
  return {
    ...source,
    productType: text.productType,
    lead: text.lead,
    features: text.features,
    documents: text.documents,
    sections: source.sections.map(section => {
      const translated = text.sections[section.id];
      if (!translated) throw new Error(`Missing ${locale} RPL guide section: ${section.id}`);
      return {
        ...section, ...translated,
        ...(section.figure ? { figure: translateFigure(section.figure) } : {}),
        ...(section.figures ? { figures: section.figures.map(translateFigure) } : {}),
        ...(section.id in links ? { links: links[section.id as keyof typeof links] } : {}),
      };
    }),
  };
}
