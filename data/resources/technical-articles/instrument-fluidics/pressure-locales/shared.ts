import { copy as chineseCopy } from "../quick-disconnect-coupling-pressure-rating.zh";
import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "../../diaphragm-pump-engineering-article.types";

export const coverImage = "/images/resources/technical-articles/instrument-fluidics/quick-disconnect-coupling-pressure-rating-cover.webp";
export const paragraph = (text: string): EngineeringArticleBlock => ({ type: "paragraph", text });
export const list = (...items: string[]): EngineeringArticleBlock => ({ type: "list", ordered: true, items });
export const table = (headers: string[], rows: string[][]): EngineeringArticleBlock => ({ type: "table", headers, rows });
export const formula = (expression: string, note: string): EngineeringArticleBlock => ({ type: "formula", expression, note });
export const links = (locale: string, items: readonly [string, string][], ordered = false): EngineeringArticleBlock => ({
  type: "links", ordered, items: items.map(([slug, label]) => ({ href: `/${locale}/resources/technical-articles/${slug}/`, label })),
});

/** Keep configuration-specific numerical ratings in the confirmed Chinese source. */
export function ratingRows(q60Temperature: string, decimalComma = false): string[][] {
  const source: DiaphragmPumpEngineeringArticleCopy = chineseCopy;
  const ratings = source.sections[0].blocks.find(block => block.type === "table");
  if (!ratings || ratings.type !== "table") throw new Error("Missing quick-disconnect pressure ratings");
  return ratings.rows.map(row => row.map((cell, index) => {
    if (row[0] === "Q60" && index === 3) return q60Temperature;
    const value = cell.replace(/（/g, " (").replace(/）/g, ")").replace(/～/g, " … ").replace(/℃/g, "°C");
    return decimalComma ? value.replace(/(\d)\.(\d)/g, "$1,$2") : value;
  }));
}

export const flowSlug = "quick-disconnect-coupling-flow-pressure-drop";
export const overviewSlug = "what-is-a-quick-disconnect-fitting";
export const materialsSlug = "fitting-material-selection-guide";
