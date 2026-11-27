import type { InkjetRouteKey } from "@/data/applications/inkjet-guide-navigation";
import routes from "@/data/applications/industrial-inkjet-routes.json";
import { germanInkjetChildDraftPaths } from "@/lib/i18n/german-application-draft-paths";
import type { GermanApplicationCopy } from "@/services/applications/german-review";

export type GermanInkjetChildKey = Exclude<InkjetRouteKey, "hub">;

type GermanInkjetChildEdition = {
  keys: readonly GermanInkjetChildKey[];
  loadCopy?: () => Promise<{ default: GermanApplicationCopy }>;
};

export const germanInkjetChildEdition: GermanInkjetChildEdition = {
  keys: (Object.keys(routes) as InkjetRouteKey[]).filter((key): key is GermanInkjetChildKey =>
    key !== "hub" && germanInkjetChildDraftPaths.includes(routes[key].slice("/en".length)),
  ),
  loadCopy: () => import("./de.json"),
};
