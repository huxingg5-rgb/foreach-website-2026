import type { ApplicationDocument } from "./analytical-documents/types";
import type { EnglishApplicationKind } from "./application-english";

// These hubs describe liquid supply, serviceable connections and module maintenance.
// The guide is further reading, not an application approval for every Q-series model.
export const quickDisconnectApplicationKinds: readonly EnglishApplicationKind[] = [
  "ivd", "lab-automation", "analytical-instruments", "environmental-monitoring",
];

type ApplicationContext = Pick<ApplicationDocument, "kind" | "slug" | "reviewContext">;

export function relatesToQuickDisconnects(kind: EnglishApplicationKind, document: ApplicationContext) {
  if (!quickDisconnectApplicationKinds.includes(kind)) return false;
  if (document.kind === "hub") return true;
  if (["fluidics", "fluidics-fittings", "diaphragm-replenishment", "guide-system-integration", "guide-lab-analyzer"].includes(document.slug)) return true;
  const context = document.reviewContext;
  return context?.family === "fluidics"
    && context.level === "product"
    && context.topic !== "gasPretreatment"
    && context.products.includes("fittings");
}
