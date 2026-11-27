import media from "./detail-media.intl.json";
import { assemblyDetailText } from "./detail-localization";
import type { TubingAssemblyDetailLocale } from "./locales";

type Image = { src: string; width: number; height: number; alt: string; caption: string; sha256?: string };
type Media = Partial<Record<TubingAssemblyDetailLocale, Record<string, Partial<Image>>>>;
const sources: Media = media;
const aliases: Record<string, string> = { sealing: "flangeSealing", configuration: "flangeConfiguration", hfDimensions: "flangeStandardDimensions", hf6Dimensions: "flangeCompactDimensions", torque: "torqueTool" };

export function getAssemblyDetailMedia(locale: TubingAssemblyDetailLocale, name: string, original: Image): Image {
  if (locale === "zh-CN") return original;
  const replacement = sources[locale === "de" || locale === "it" || locale === "hi" ? "en" : locale]?.[aliases[name] ?? name] ?? {};
  return { ...original, ...replacement, alt: assemblyDetailText(original.alt, locale), caption: assemblyDetailText(original.caption, locale) };
}
