const altTemplates: Record<string, string> = {
  zh: "同系列接头实拍图 {0}",
  en: "Fitting series photograph {0}",
  es: "Fotografía de la serie de racores {0}",
  fr: "Photo de la gamme de raccords {0}",
  ko: "피팅 시리즈 실물 사진 {0}",
  ru: "Фото серии фитингов {0}",
};

export function getSharedFittingPhotoAlt(sources: unknown, src: string, locale: string): string | undefined {
  if (!Array.isArray(sources)) return undefined;
  const index = sources.indexOf(src);
  return index < 0 ? undefined : (altTemplates[locale] || altTemplates.zh).replace("{0}", String(index + 1));
}
