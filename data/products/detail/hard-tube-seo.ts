type HardTubeSeoSource = {
  productTypeId?: string;
  seriesId?: string;
  model?: string;
  foreachModel?: string;
  specs?: Array<{ label?: string; value?: unknown }>;
  specifications?: Array<{ label?: string; value?: unknown }>;
  additionalImages?: string[];
  additionalImageAlts?: string[];
};

type HardTubeSeoLocale = "en" | "es" | "fr" | "ko" | "ru";

const SERIES_NAMES: Record<HardTubeSeoLocale, Record<string, string>> = {
  en: {
    "standard-flat-bottom-fitting": "Standard Flat-Bottom Fitting",
    "compact-flat-bottom-fitting": "Compact Flat-Bottom Fitting",
    "standard-ferrule-fitting": "Standard Ferrule Fitting",
    "compact-ferrule-fitting": "Compact Ferrule Fitting",
    "retaining-ring-fitting": "Retaining-Ring Fitting",
    "high-pressure-fitting": "High-Pressure Fitting",
  },
  es: {
    "standard-flat-bottom-fitting": "Racor estándar de fondo plano",
    "compact-flat-bottom-fitting": "Racor compacto de fondo plano",
    "standard-ferrule-fitting": "Racor estándar con férula",
    "compact-ferrule-fitting": "Racor compacto con férula",
    "retaining-ring-fitting": "Racor con anillo de retención",
    "high-pressure-fitting": "Racor de alta presión",
  },
  fr: {
    "standard-flat-bottom-fitting": "Raccord standard à fond plat",
    "compact-flat-bottom-fitting": "Raccord compact à fond plat",
    "standard-ferrule-fitting": "Raccord standard à bague",
    "compact-ferrule-fitting": "Raccord compact à bague",
    "retaining-ring-fitting": "Raccord à anneau de retenue",
    "high-pressure-fitting": "Raccord haute pression",
  },
  ko: {
    "standard-flat-bottom-fitting": "표준 평저 피팅",
    "compact-flat-bottom-fitting": "컴팩트 평저 피팅",
    "standard-ferrule-fitting": "표준 페룰 피팅",
    "compact-ferrule-fitting": "컴팩트 페룰 피팅",
    "retaining-ring-fitting": "리테이닝 링 피팅",
    "high-pressure-fitting": "고압 피팅",
  },
  ru: {
    "standard-flat-bottom-fitting": "Стандартный фитинг с плоским дном",
    "compact-flat-bottom-fitting": "Компактный фитинг с плоским дном",
    "standard-ferrule-fitting": "Стандартный фитинг с феррулой",
    "compact-ferrule-fitting": "Компактный фитинг с феррулой",
    "retaining-ring-fitting": "Фитинг со стопорным кольцом",
    "high-pressure-fitting": "Фитинг высокого давления",
  },
};

const GALLERY_LABELS: Record<HardTubeSeoLocale, Record<string, string>> = {
  en: { assembly: "Tubing connection assembly", parts: "Fitting and sealing components", seals: "Sealing components", bodies: "Fitting bodies", view: "Product view" },
  es: { assembly: "Conjunto de conexión de tubos", parts: "Componentes del racor y de sellado", seals: "Componentes de sellado", bodies: "Cuerpos de racor", view: "Vista del producto" },
  fr: { assembly: "Assemblage de raccordement de tubes", parts: "Composants du raccord et d’étanchéité", seals: "Composants d’étanchéité", bodies: "Corps de raccords", view: "Vue du produit" },
  ko: { assembly: "튜브 연결 어셈블리", parts: "피팅 및 밀봉 부품", seals: "밀봉 부품", bodies: "피팅 본체", view: "제품 이미지" },
  ru: { assembly: "Узел соединения трубок", parts: "Детали фитинга и уплотнения", seals: "Уплотнительные детали", bodies: "Корпуса фитингов", view: "Вид изделия" },
};

function sourceSpec(data: HardTubeSeoSource, label: string) {
  const rows = Array.isArray(data.specs) ? data.specs : data.specifications || [];
  return String(rows.find((row) => row.label === label)?.value || "").trim();
}

function galleryAlt(src: string, series: string, locale: HardTubeSeoLocale) {
  const kind = /assembly|assemblies/.test(src) ? "assembly"
    : /washer|ferrule-seal/.test(src) ? "seals"
    : /components|body-and-seal|nut-and-ferrule/.test(src) ? "parts"
    : /body|bodies/.test(src) ? "bodies" : "view";
  return `${series} — ${GALLERY_LABELS[locale][kind]}`;
}

// Metadata and image alternatives only: never adapt the visible product data.
// The source series ID determines the fitting type; model prefixes do not.
export function getHardTubeSeo(data: HardTubeSeoSource, locale: string) {
  if (!Object.prototype.hasOwnProperty.call(SERIES_NAMES, locale) || data.productTypeId !== "hard-tube-fittings") return null;
  const language = locale as HardTubeSeoLocale;
  const series = SERIES_NAMES[language][String(data.seriesId || "")];
  if (!series) return null;

  const model = String(data.foreachModel || data.model || "").trim();
  const material = sourceSpec(data, "主体材质").replace(/不锈钢/g, {
    en: "stainless steel", es: "acero inoxidable", fr: "acier inoxydable", ko: "스테인리스강", ru: "нержавеющая сталь",
  }[language]);
  const thread = sourceSpec(data, "螺纹规格");
  const od = sourceSpec(data, "接管外径");
  const id = sourceSpec(data, "接管内径");
  const dimension = od || id;
  const sizeLabel = {
    en: od ? "tubing OD" : "tubing ID",
    es: od ? "DE del tubo" : "DI del tubo",
    fr: od ? "Ø ext. du tube" : "Ø int. du tube",
    ko: od ? "튜브 외경" : "튜브 내경",
    ru: od ? "наружный Ø трубки" : "внутренний Ø трубки",
  }[language];
  const specs = [material, thread, dimension && `${sizeLabel} ${dimension}`].filter(Boolean).join("; ");

  return {
    title: `${model} ${series} | Foreach Technology`,
    description: `${model} — ${series}.${specs ? ` ${specs}.` : ""}`,
    imageAlt: [`${model} ${series}`, material].filter(Boolean).join(" — "),
    additionalImageAlts: (data.additionalImages || []).map((src, index) => {
      const original = data.additionalImageAlts?.[index];
      return language === "en" && typeof original === "string" && original.trim() && !/[\u3400-\u9fff]/.test(original)
        ? original : galleryAlt(src, series, language);
    }),
  };
}
