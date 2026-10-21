import { tubingAssemblyLocales } from "./locales";
import { tubingAssemblyTypes } from "../tubing-assemblies.en";

/** Retired foreign-language configurations now belong to their family's customization page.
 * Chinese coiled/sleeved pages were never published, so no legacy URLs are invented for them.
 */
export function getTubingAssemblyRedirectEntries() {
  return tubingAssemblyLocales.flatMap(locale => tubingAssemblyTypes.flatMap(family =>
    ["coiled", "sleeved"].flatMap(configuration => {
      const destination = `/${locale}/products/tubing-assemblies/${family.id}/details/`;
      const source = `${destination}${configuration}`;
      return [source, `${source}/`].map(source => ({ source, destination, statusCode: 301 as const }));
    }),
  ));
}
