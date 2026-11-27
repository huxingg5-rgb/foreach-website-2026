import type { Metadata } from "next";
import { publishedTranslationBuild } from "@/lib/i18n/published-translations";
import { draftLanguages } from "@/lib/i18n/draft-language-identifiers";
import { SITE_ORIGIN } from "@/lib/seo/site-url";

type LocalePageProps = { params: Promise<{ locale: string }> };
type RouteParams = Readonly<Record<string, string | readonly string[] | undefined>>;

function routePath(template: string, params: RouteParams) {
  const path = template.split("/").filter(Boolean).flatMap(segment => {
    if (!segment.startsWith("[")) return [segment];
    const key = segment.slice(1, -1).replace(/^\.\.\./, "");
    const value = params[key];
    const parts = typeof value === "string" ? [value] : value ?? [];
    return parts.map(part => encodeURIComponent(part));
  });
  return "/" + [params.locale, ...path].join("/") + "/";
}

export function withPublishedTranslationMetadata<Props extends LocalePageProps>(
  route: string,
  getPageMetadata: (props: Props) => Promise<Metadata>,
) {
  return async (props: Props): Promise<Metadata> => {
    const metadata = await getPageMetadata(props);
    if (!publishedTranslationBuild || !metadata.robots || typeof metadata.robots === "string") return metadata;

    const params = await props.params;
    if (!Object.hasOwn(draftLanguages, params.locale) || metadata.robots.index !== false) return metadata;

    // Translate the preview indexing flag only for a page claiming its own locale route.
    const canonical = metadata.alternates?.canonical;
    if (typeof canonical !== "string" && !(canonical instanceof URL)) return metadata;
    const url = new URL(canonical, SITE_ORIGIN);
    const canonicalPath = url.pathname.replace(/\/+$/, "") + "/";
    if (
      url.origin !== SITE_ORIGIN ||
      url.search ||
      url.hash ||
      canonicalPath !== routePath(route, params as unknown as RouteParams)
    ) return metadata;

    return { ...metadata, robots: { ...metadata.robots, index: true } };
  };
}
