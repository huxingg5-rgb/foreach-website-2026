import { useEffect, useState } from "react";

type SearchPageCopy = Readonly<Record<string, { title: string; description: string; subtitle?: string }>>;
const empty: SearchPageCopy = {};
const requests = new Map<string, Promise<SearchPageCopy>>();

export function useLocalizedSearchPageCopy(locale: string | undefined) {
  const [loaded, setLoaded] = useState<{ locale: string; pages: SearchPageCopy }>();

  useEffect(() => {
    if (!locale) return;

    let request = requests.get(locale);
    if (!request) {
      request = fetch(`/search-data/localized-page-copy.${locale}.v1.json`)
        .then(response => {
          if (!response.ok) throw new Error(`Localized search page copy: ${response.status}`);
          return response.json() as Promise<SearchPageCopy>;
        })
        .catch(() => {
          requests.delete(locale);
          return empty;
        });
      requests.set(locale, request);
    }

    let active = true;
    void request.then(pages => {
      if (active) setLoaded({ locale, pages });
    });
    return () => { active = false; };
  }, [locale]);

  const current = loaded?.locale === locale ? loaded?.pages : undefined;
  return { pages: current ?? empty, isLoading: Boolean(locale && !current) };
}

export function getLocalizedSearchPageCopy(pages: SearchPageCopy, href: string, sourceTitle?: string) {
  const key = href.replace(/\/+($|(?=[?#]))/, "");
  return pages[key] ?? (sourceTitle ? pages[`${key}|${sourceTitle}`] : undefined);
}
