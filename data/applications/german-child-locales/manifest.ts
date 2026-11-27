import { germanChildApplicationDraftPaths } from "@/lib/i18n/german-application-draft-paths";
import type { EnglishApplicationKind } from "@/data/applications/application-english";
import type { GermanApplicationCopy } from "@/services/applications/german-review";

type GermanChildApplicationEdition = {
  /** Canonical English paths from application-route-map.json, with trailing slash. */
  paths: readonly string[];
  loadCopy: () => Promise<{ default: GermanApplicationCopy }>;
};

export const germanChildApplicationEditions: Partial<Record<EnglishApplicationKind, GermanChildApplicationEdition>> = {
  "analytical-instruments": {
    paths: germanChildApplicationDraftPaths.filter(path => path.startsWith("/applications/analytical-instruments/")).map(path => "/en" + path),
    loadCopy: () => import("./analytical-instruments.json"),
  },
  "environmental-monitoring": {
    paths: germanChildApplicationDraftPaths.filter(path => path.startsWith("/applications/environmental-monitoring/")).map(path => "/en" + path),
    loadCopy: () => import("./environmental-monitoring.json"),
  },
  "lab-automation": {
    paths: germanChildApplicationDraftPaths.filter(path => path.startsWith("/applications/lab-automation/")).map(path => "/en" + path),
    loadCopy: () => import("./lab-automation.json"),
  },
  "life-science": {
    paths: germanChildApplicationDraftPaths.filter(path => path.startsWith("/applications/life-science/")).map(path => "/en" + path),
    loadCopy: () => import("./life-science.json"),
  },
  "synthetic-biology": {
    paths: germanChildApplicationDraftPaths.filter(path => path.startsWith("/applications/synthetic-biology/")).map(path => "/en" + path),
    loadCopy: () => import("./synthetic-biology.json"),
  },
};
