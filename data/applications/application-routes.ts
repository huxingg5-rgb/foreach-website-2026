import routeMap from './application-route-map.json';
import type { EnglishApplicationKind } from './application-english';

export type ApplicationRoute = {
  readonly path: string;
  readonly kind: EnglishApplicationKind;
  /** Stable content ID: moving a URL never changes its source document slug. */
  readonly slug: string;
  readonly template: 'review' | 'analytical';
  readonly aliases: readonly string[];
};

// Keep this module independent of document registries and hierarchy builders.
// Those builders use these helpers themselves when creating navigation links.
export const applicationRoutes: readonly ApplicationRoute[] = routeMap.entries as ApplicationRoute[];
const byDocument = new Map(applicationRoutes.map(route => [`${route.kind}/${route.slug}`, route]));
const byPath = new Map(applicationRoutes.map(route => [route.path, route]));
const byAlias = new Map(applicationRoutes.flatMap(route => route.aliases.map(alias => [alias, route] as const)));
const base = (kind: string) => `/en/applications/${kind}/`;
const withTrailingSlash = (path: string) => path.endsWith('/') ? path : `${path}/`;

/** Resolve a stable document ID, including the two former analytical/clinical IDs. */
export function applicationDocumentHref(kind: string, slug = ''): string {
  const route = byDocument.get(`${kind}/${slug}`) ?? byAlias.get(`${base(kind)}${slug}/`);
  if (!route) throw new Error(`Unknown application document: ${kind}/${slug}`);
  return route.path;
}

/** Rewrite known English paths only, preserving the original query and fragment. */
export function resolveApplicationHref(href: string): string {
  if (!href.startsWith('/en/applications/')) return href;
  const boundary = href.search(/[?#]/);
  const pathname = boundary === -1 ? href : href.slice(0, boundary);
  const suffix = boundary === -1 ? '' : href.slice(boundary);
  const path = withTrailingSlash(pathname);
  const route = byPath.get(path) ?? byAlias.get(path);
  return route ? route.path + suffix : href;
}

/** Validate the whole hierarchy; a valid final slug under a wrong parent is a 404. */
export function resolveApplicationRoute(kind: string, segments: readonly string[]): ApplicationRoute | undefined {
  if (segments.some(segment => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(segment))) return undefined;
  const path = base(kind) + (segments.length ? `${segments.join('/')}/` : '');
  const route = byPath.get(path);
  return route?.kind === kind ? route : undefined;
}

/** Domain hubs have separate page files; only article paths belong to [...segments]. */
export function getApplicationStaticParams(kind: string): { locale: 'en'; segments: string[] }[] {
  const prefix = base(kind);
  return applicationRoutes.filter(route => route.kind === kind && route.slug !== '').map(route => ({
    locale: 'en',
    segments: route.path.slice(prefix.length, -1).split('/'),
  }));
}

/** Every alias points directly to its final URL, with no alias-to-alias chains. */
export function getApplicationRedirectEntries(): { source: string; destination: string; permanent: true }[] {
  return applicationRoutes.flatMap(route => route.aliases.map(source => ({
    source,
    destination: route.path,
    permanent: true as const,
  })));
}
