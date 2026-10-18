import type { AssemblyConfiguration, AssemblyFamily } from "../detail/tubing-assemblies.review.zh";

/** One release boundary for cards, static routes and search in every supported locale. */
const publishedConfigurations: Record<AssemblyFamily, readonly AssemblyConfiguration[]> = {
  "flanged-tubing": ["fep", "ptfe", "pfa", "black-ptfe"],
  "ferrule-kits": ["fep", "ptfe", "pfa", "black-ptfe"],
  "retaining-ring-kits": ["fep", "ptfe", "black-ptfe"],
};

export function getPublishedAssemblyConfigurations(family: AssemblyFamily): readonly AssemblyConfiguration[] {
  return publishedConfigurations[family];
}

export function isPublishedAssemblyConfiguration(family: AssemblyFamily, configuration: string): configuration is AssemblyConfiguration {
  return publishedConfigurations[family].some(item => item === configuration);
}

export function isPublishedAssemblyPath(href: string): boolean {
  const match = href.split(/[?#]/, 1)[0].match(/^\/(?:en|es|fr|ko|ru)\/products\/tubing-assemblies\/([^/]+)\/details\/([^/]+)\/?$/);
  if (!match) return true;
  const [, family, configuration] = match;
  return Object.prototype.hasOwnProperty.call(publishedConfigurations, family)
    && isPublishedAssemblyConfiguration(family as AssemblyFamily, configuration);
}

export const publishedAssemblyPageCount = 1 + Object.values(publishedConfigurations)
  .reduce((total, configurations) => total + 2 + configurations.length, 0);
