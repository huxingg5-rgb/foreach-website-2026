import type { EngineeringArticleBlock } from "../../diaphragm-pump-engineering-article.types";
import type { TechnicalArticleLocale } from "../../technical-articles.types";

export const trappedVolumeFigure = {
  src: "/images/resources/technical-articles/virtual-leaks/trapped-volume-neutral.webp",
  width: 1200,
  height: 760,
} as const;

export const blindThreadFigure = {
  src: "/images/resources/technical-articles/virtual-leaks/blind-thread-neutral.webp",
  width: 1200,
  height: 800,
} as const;

export const virtualLeakEquations = {
  balance: "q_total ≈ S_eff × p",
  isolatedVolume: "q_apparent ≈ V × Δp / Δt",
} as const;

export function virtualLeakReferences(
  locale: Exclude<TechnicalArticleLocale, "zh-CN">,
  labels: readonly [string, string, string, string, string],
): EngineeringArticleBlock {
  return {
    type: "links",
    ordered: true,
    items: [
      { href: `/${locale}/resources/technical-articles/hard-tube-fittings-selection-guide/`, label: labels[0] },
      { href: `/${locale}/resources/technical-articles/fitting-material-selection-guide/`, label: labels[1] },
      { href: "https://www.pfeiffervacuum.com/il/en/knowledge/vacuum-technology/knowledge-book/3-mechanical-components-in-vacuum/3.3-connections.html", label: labels[2] },
      { href: "https://www.pfeiffervacuum.com/il/en/knowledge/vacuum-technology/knowledge-book/3-mechanical-components-in-vacuum/3.2-materials.html", label: labels[3] },
      { href: "https://www.leybold.com/content/leybold/en/knowledge/vacuum-fundamentals/leak-detection/pressure-rise-and-drop-tests.html", label: labels[4] },
    ],
  };
}

export const virtualLeaksMentions: Record<TechnicalArticleLocale, string[]> = {
  "zh-CN": ["虚漏", "封闭腔穴", "材料放气", "盲孔螺纹", "串联密封", "压升测试"],
  en: ["Virtual leaks", "Trapped volumes", "Outgassing", "Blind tapped holes", "Tandem seals", "Rate-of-rise testing"],
  es: ["Fugas virtuales", "Volúmenes atrapados", "Desgasificación", "Orificios roscados ciegos", "Juntas en serie", "Prueba de aumento de presión"],
  fr: ["Fuites virtuelles", "Volumes piégés", "Dégazage", "Taraudages borgnes", "Joints en série", "Essai de remontée de pression"],
  ko: ["가상 누설", "갇힌 체적", "가스 방출", "막힌 나사 구멍", "직렬 씰", "압력 상승 시험"],
  ru: ["Мнимые течи", "Замкнутые полости", "Газовыделение", "Глухие резьбовые отверстия", "Последовательные уплотнения", "Испытание по росту давления"],
};
