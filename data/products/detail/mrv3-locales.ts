import en from "./mrv3-locales/en.json";
import hi from "./mrv3-locales/hi.json";
import de from "./mrv3-locales/de.json";
import es from "./mrv3-locales/es.json";
import fr from "./mrv3-locales/fr.json";
import it from "./mrv3-locales/it.json";
import ko from "./mrv3-locales/ko.json";
import ru from "./mrv3-locales/ru.json";

export const mrv3Locales = ["zh", "en", "es", "fr", "ko", "ru"] as const;
export type Mrv3Locale = (typeof mrv3Locales)[number] | "de" | "it" | "hi";
export type Mrv3MessageKey = keyof typeof en;
const messages = { en, de, es, fr, hi, it, ko, ru } satisfies Record<
  Exclude<Mrv3Locale, "zh">,
  Record<Mrv3MessageKey, string>
>;

export function isMrv3Locale(locale: string): locale is Mrv3Locale {
  return locale === "hi" || locale === "de" || locale === "it" || mrv3Locales.some(value => value === locale);
}

/** Keep model identifiers, dimensions and URLs shared while translating complete sentences. */
export function translateMrv3(locale: Exclude<Mrv3Locale, "zh">, key: Mrv3MessageKey, values: readonly string[] = []): string {
  return messages[locale][key].replace(/\{(\d+)\}/g, (_, index: string) => {
    const value = values[Number(index)];
    if (value === undefined) throw new Error(`Missing MRV3 message argument: ${locale}.${key}[${index}]`);
    return value;
  });
}
