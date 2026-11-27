import { germanReplacementDraftPaths } from "../../data/resources/fitting-replacement/german-replacement-draft-routes";
import { germanInstallationGuidePreviewPaths } from "../../data/resources/installation-guide/german-installation-guide-routes";
import { germanNewsArticleSlugs } from "../../data/resources/news/news-draft-slugs.de";
import { germanTechnicalArticleSlugs } from "../../data/resources/technical-articles/technical-article-slugs.de";

export const germanResourceDraftPaths: readonly string[] = [
  "/resources/",
  "/resources/datasheets/",
  "/resources/faq/",
  "/resources/material-compatibility/",
  "/resources/calculators/fluid-resistance/",
  "/resources/selection-support/fitting-replacement/",
  "/resources/technical-articles/",
  "/resources/news/",
  ...germanReplacementDraftPaths,
  ...germanInstallationGuidePreviewPaths,
  ...germanNewsArticleSlugs.map((slug) => `/resources/news/${slug}/`),
  ...germanTechnicalArticleSlugs.map((slug) => `/resources/technical-articles/${slug}/`),
];

export function isResourcePath(path: string) {
  return path === "/resources" || path.startsWith("/resources/");
}
