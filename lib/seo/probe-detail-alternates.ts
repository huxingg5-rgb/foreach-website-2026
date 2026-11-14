import probes from "@/data/products/generated/probes/detail/index.json";

export function getProbeDetailAlternates(canonicalUrl: string) {
  const path = new URL(canonicalUrl, "https://www.foreachtek.com").pathname.replace(/^\/(?:en|es|fr|ko|ru)\//, "/");
  const slug = /^\/products\/probes\/([^/]+)\/?$/.exec(path)?.[1];
  if (!slug || !probes.some(item => item.slug === slug)) return undefined;
  const chinese = `/products/probes/${slug}/`;
  return {
    canonical: new URL(canonicalUrl, "https://www.foreachtek.com").pathname.replace(/\/?$/, "/"),
    languages: { "zh-CN": chinese, "en-US": `/en${chinese}`, es: `/es${chinese}`,
      fr: `/fr${chinese}`, ko: `/ko${chinese}`, ru: `/ru${chinese}`, "x-default": chinese },
  };
}
