/** All six fitting detail routes use the same published catalog identity. */
export function getFittingDetailAlternates(canonicalUrl: string) {
  const path = new URL(canonicalUrl, "https://www.foreachtek.com").pathname;
  const chinesePath = path.replace(/^\/(?:en|es|fr|ko|ru)(?=\/)/, "").replace(/\/$/, "") + "/";
  if (!/^\/products\/fittings\/[^/]+\/[^/]+\/$/.test(chinesePath)) return undefined;
  return {
    canonical: path.replace(/\/$/, "") + "/",
    languages: {
      "zh-CN": chinesePath,
      "en-US": `/en${chinesePath}`,
      es: `/es${chinesePath}`,
      fr: `/fr${chinesePath}`,
      ko: `/ko${chinesePath}`,
      ru: `/ru${chinesePath}`,
      "x-default": chinesePath,
    },
  };
}
