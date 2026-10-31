import assert from "node:assert/strict";
import { getPumpSeriesProductDetailAdapter } from "../../services/products/adapters/getPumpSeriesProductDetailAdapter";
import { PISTON_PUMP_MARKETING_MODELS, getPistonPumpMarketingCopy } from "../../data/products/piston-pump-marketing-copy";
import { getPistonPumpIntroduction } from "../../data/products/detail/piston-pump-introductions";
import { formatPistonPumpDisplayText } from "../../data/products/detail/piston-pump-display-locale";
import { getPistonPumpIntroCopy, type PistonSeriesKey } from "../../data/products/selection/piston-pump-series-copy";
import type { SelectionLocale } from "../../data/products/selection/product-selection.types";
import catalog from "../../data/products/detail/applications/piston-pump-translations.json";

const locales: SelectionLocale[] = ["zh", "en", "es", "fr", "ko", "ru"];
const errors: string[] = [];
let pages = 0;
let specificationRows = 0;
let seriesVersions = 0;
const check = (condition: unknown, message: string) => { if (!condition) errors.push(message); };
const numbers = (value: string) => (value.replace(/500\s*万次/g, "5 million cycles").replace(/(\d),(\d)/g, "$1.$2").match(/\d+(?:\.\d+)?/g) || []).map(Number);
const materials = (value: string) => [...new Set(value.match(/\b(?:PMMA|PCTG|PEEK|PVDF|PPS|POM|PSU|PTFE|PEI|PP)\b/g) || [])].sort();
const foreignEnglish = /\b(?:Accuracy at|Repeatability at|Full-stroke|Designed life|Pump head material|Piston material|Confirm for the selected|The displayed|under the specified|Step)\b/;
function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}
function checkLanguage(value: unknown, locale: SelectionLocale, label: string) {
  for (const text of strings(value)) {
    check(!/\{\d+\}|undefined|\uFFFD/.test(text), label + ": unresolved placeholder");
    if (locale !== "zh") check(!/[\u3400-\u9fff]/.test(text), label + ": Chinese text in " + locale);
    if (locale !== "ko") check(!/[\uac00-\ud7af]/.test(text), label + ": Korean text in " + locale);
    if (locale !== "ru") check(!/[\u0400-\u04ff]/.test(text), label + ": Russian text in " + locale);
    if (locale !== "en") check(!foreignEnglish.test(text), label + ": untranslated English");
  }
}
for (const model of PISTON_PUMP_MARKETING_MODELS) {
  const english = getPumpSeriesProductDetailAdapter(model.toLowerCase(), "en");
  assert(english, model);
  for (const locale of locales) {
    const detail = getPumpSeriesProductDetailAdapter(model.toLowerCase(), locale);
    assert(detail, model + "/" + locale);
    const label = model + "/" + locale;
    const introduction = getPistonPumpIntroduction(model, locale);
    const marketing = getPistonPumpMarketingCopy(model, locale);
    check(JSON.stringify(detail.advantages) === JSON.stringify(introduction), label + ": introduction drift");
    check(introduction?.length === 3, label + ": introduction paragraph count");
    check(detail.model === marketing?.heading, label + ": H1 drift");
    check(Array.from(marketing?.heading || "").length <= 80, label + ": card heading length");
    check(detail.specs.length === english.specs.length, label + ": missing or duplicate specification rows");
    check(new Set(detail.specs.map(row => row.label)).size === detail.specs.length, label + ": repeated specification label");
    detail.specs.forEach((row, index) => {
      const reference = english.specs[index];
      if (!reference) return;
      check(JSON.stringify(numbers(row.value)) === JSON.stringify(numbers(reference.value)), label + "/" + row.label + ": numeric value mismatch");
      check(JSON.stringify(materials(row.value)) === JSON.stringify(materials(reference.value)), label + "/" + row.label + ": material option mismatch");
      if (locale === "zh") check(/[\u3400-\u9fff]/.test(row.label), label + "/" + row.label + ": untranslated Chinese table label");
      if (["es", "fr", "ru"].includes(locale)) check(!/\d\.\d/.test(row.value), label + "/" + row.label + ": decimal notation");
      if (locale === "ru") check(!/[μµ]L|\bmL\b|\bmm\b|\bkPa\b|\bMPa\b|\bRPM\b/.test(row.value), label + "/" + row.label + ": untranslated display unit");
      specificationRows++;
    });
    const extra = detail as typeof detail & { customNotice?: string; sectionTitleMap?: Record<string, string> };
    checkLanguage({
      model: detail.model, advantages: detail.advantages, specs: detail.specs, faqs: detail.faqs,
      applications: detail.applicationDetails, commonApplications: detail.commonApplications,
      customNotice: extra.customNotice, sectionTitleMap: extra.sectionTitleMap,
    }, locale, label);
    const byLabel = Object.fromEntries(english.specs.map(row => [row.label, row.value]));
    if (model.startsWith("SM-")) check(/Confirm/.test(byLabel["Accuracy at 100% stroke"]), label + ": unverified SM accuracy");
    if (model.startsWith("TM-")) {
      for (const key of ["Accuracy at 100% stroke", "Repeatability at 100% stroke", "Design life", "Max fluid pressure"]) {
        check(/Confirm/.test(byLabel[key]), label + ": unverified TM " + key);
      }
    }
    pages++;
  }
}
for (const locale of locales) for (const series of ["category", "ea", "sm", "tm"] as PistonSeriesKey[]) {
  const entry = getPistonPumpIntroCopy(series, locale);
  checkLanguage(entry, locale, series + "/" + locale);
  check(entry.paragraphs.length >= 4, series + "/" + locale + ": missing series paragraphs");
  if (["es", "fr", "ru"].includes(locale)) check(!/\d\.\d/.test(entry.paragraphs.join(" ")), series + "/" + locale + ": decimal notation");
  seriesVersions++;
}
for (const [bucket, entries] of Object.entries({ atoms: catalog.atoms, templates: catalog.templates })) {
  for (const [key, translations] of Object.entries(entries)) {
    const expected = [...new Set(key.match(/\{\d+\}/g) || [])].sort();
    for (const [locale, text] of Object.entries(translations)) {
      check(key.trim() ? Boolean(text.trim()) : text === "", bucket + "/" + key + "/" + locale + ": empty translation");
      check(JSON.stringify([...new Set(text.match(/\{\d+\}/g) || [])].sort()) === JSON.stringify(expected), bucket + "/" + key + "/" + locale + ": placeholder mismatch");
    }
  }
}
// Formatting must never alter a technical interface, model, link, or number of steps.
for (const locale of locales) {
  for (const value of ["1/4-28 UNF / M6", "6-40 UNF", "EA-2500-PMMA", "RPL-P6.35", "RS-232 / RS-485 / CAN", "https://example.com/v1.2/"]) {
    check(formatPistonPumpDisplayText(value, locale) === value, locale + ": changed technical identity " + value);
  }
  const link = "[1.25 mL](https://example.com/v1.2/)";
  check(formatPistonPumpDisplayText(link, locale).endsWith("](https://example.com/v1.2/)"), locale + ": changed Markdown URL");
}
console.log(JSON.stringify({ models: PISTON_PUMP_MARKETING_MODELS.length, pages, specificationRows, seriesVersions, errors }, null, 2));
if (errors.length) process.exitCode = 1;

