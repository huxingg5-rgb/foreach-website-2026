import messages from "./diaphragm-pump-ui.intl.json";
import { normalizeDiaphragmPumpLocale } from "./diaphragm-pump-routes";

const languages = ["en", "es", "fr", "ko", "ru"] as const;
const copy: Readonly<Record<string, readonly string[]>> = messages;
const modelPattern = /\b(?:DPL30H|DPL30|DPL60|DPGL800)(?:-[A-Za-z0-9]+(?:-[A-Za-z0-9/]+)*)?\b/g;

/** Only model identifiers are templated; ratings and operating limits stay explicit. */
export function canonicalDiaphragmText(value: string) {
  const models: string[] = [];
  const key = value.replace(/\s+/g, " ").trim().replace(modelPattern, model => {
    models.push(model);
    return `{${models.length - 1}}`;
  });
  return { key, models };
}

export function diaphragmText(value: string, locale: string): string {
  const lang = normalizeDiaphragmPumpLocale(locale);
  if (lang === "zh" || !/[\u3400-\u9fff]/.test(value)) return value;
  const { key, models } = canonicalDiaphragmText(value);
  const translated = copy[key]?.[languages.indexOf(lang)];
  if (!translated) return value;
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  return leading + translated.replace(/\{(\d+)\}/g, (_, index: string) => models[Number(index)] ?? `{${index}}`) + trailing;
}

export function diaphragmHref(href: string, locale: string): string {
  const lang = normalizeDiaphragmPumpLocale(locale);
  if (lang === "zh" || !/^\/(?:products|resources|contact)(?:\/|$)/.test(href)) return href;
  return `/${lang}${href}`;
}
