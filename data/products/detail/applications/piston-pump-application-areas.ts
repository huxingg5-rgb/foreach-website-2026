import type { ProductApplicationAreaLink } from "../product-detail.types";

type ApplicationAreaKey =
  | "ivd"
  | "life-science"
  | "lab-automation"
  | "analytical-instruments"
  | "environmental-monitoring";

const APPLICATION_AREAS: Record<ApplicationAreaKey, ProductApplicationAreaLink> = {
  ivd: {
    label: "IVD",
    href: "/en/applications/ivd/",
  },
  "life-science": {
    label: "Life Sciences",
    href: "/en/applications/life-science/",
  },
  "lab-automation": {
    label: "Laboratory Automation",
    href: "/en/applications/lab-automation/",
  },
  "analytical-instruments": {
    label: "Analytical Instruments",
    href: "/en/applications/analytical-instruments/",
  },
  "environmental-monitoring": {
    label: "Environmental Monitoring",
    href: "/en/applications/environmental-monitoring/",
  },
};

/*
 * These are product-fit links, not a generic list of every market in which a
 * piston pump might be configured. Keep the set narrow enough to reflect the
 * capacity-specific tasks already documented on each product page.
 */
const EA_APPLICATION_AREAS: Record<string, readonly ApplicationAreaKey[]> = {
  "100": ["ivd", "life-science", "lab-automation", "analytical-instruments"],
  "250": ["ivd", "lab-automation", "analytical-instruments"],
  "500": ["ivd", "lab-automation", "environmental-monitoring", "analytical-instruments"],
  "1000": ["ivd", "lab-automation", "analytical-instruments"],
  "2500": ["lab-automation", "analytical-instruments", "environmental-monitoring"],
  "5000": ["lab-automation", "analytical-instruments", "environmental-monitoring"],
  "10000": ["analytical-instruments", "lab-automation"],
};

const COMPACT_APPLICATION_AREAS: Record<string, readonly ApplicationAreaKey[]> = {
  "sm-50-pmma": ["ivd", "life-science", "analytical-instruments"],
  "sm-100-pmma": ["lab-automation", "ivd", "analytical-instruments"],
  "sm-100-peek": ["ivd", "life-science", "analytical-instruments"],
  "sm-250-pmma": ["ivd", "lab-automation", "analytical-instruments"],
  "sm-250-peek": ["ivd", "life-science", "analytical-instruments"],
  "sm-500-pmma": ["ivd", "lab-automation", "analytical-instruments"],
  "sm-1000-pmma": ["lab-automation", "life-science", "analytical-instruments"],
  "tm-50-pmma": ["ivd", "analytical-instruments"],
  "tm-100-pmma": ["ivd", "analytical-instruments"],
  "tm-250-pmma": ["life-science", "analytical-instruments"],
  "tm-500-pmma": ["analytical-instruments", "lab-automation"],
};

export function getPistonPumpApplicationAreas(
  productId: string,
): ProductApplicationAreaLink[] {
  const normalizedId = productId.trim().toLowerCase();
  const eaCapacity = /^ea-(100|250|500|1000|2500|5000|10000)-(?:pmma|peek)$/.exec(
    normalizedId,
  )?.[1];
  const keys = eaCapacity
    ? EA_APPLICATION_AREAS[eaCapacity]
    : COMPACT_APPLICATION_AREAS[normalizedId];

  return (keys || []).map((key) => ({ ...APPLICATION_AREAS[key] }));
}
