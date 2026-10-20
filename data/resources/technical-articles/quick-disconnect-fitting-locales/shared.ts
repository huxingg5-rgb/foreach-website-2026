import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "../diaphragm-pump-engineering-article.types";

export type QuickDisconnectTranslation = DiaphragmPumpEngineeringArticleCopy & {
  navigationLabels: readonly string[];
  about: readonly string[];
  productTitles: readonly [string, string, string, string];
};

export const coverImage = "/images/resources/technical-articles/quick-disconnect-fitting/quick-disconnect-fittings-photo.webp";
export const productPath = "/products/fittings/quick-connect-fittings/";
export const paragraph = (text: string, lead?: string): EngineeringArticleBlock => ({ type: "paragraph", text, ...(lead ? { lead } : {}) });
export const table = (headers: string[], rows: string[][]): EngineeringArticleBlock => ({ type: "table", headers, rows });
export const list = (items: string[], ordered = false): EngineeringArticleBlock => ({ type: "list", items, ordered });
export const figure = (kind: "pair" | "valves" | "panel", alt: string, caption: string): EngineeringArticleBlock => ({
  type: "figure", src: "", width: 1000, height: kind === "pair" ? 470 : kind === "valves" ? 1120 : 680,
  quickDisconnectDiagram: kind, alt, caption,
});
