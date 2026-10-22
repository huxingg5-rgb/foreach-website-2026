import type { ApplicationDocument } from "./analytical-documents/types";
import type { EnglishApplicationKind } from "./application-english";

// The guides cover instrument tubing junctions and fixed panel connections.
// A reading link does not imply application validation of a particular model.
export function relatesToPanelFittings(
  kind: EnglishApplicationKind,
  document: Pick<ApplicationDocument, "kind" | "slug" | "reviewContext">,
) {
  if (!["ivd", "lab-automation", "analytical-instruments"].includes(kind)) return false;
  if (document.kind === "hub") return true;
  if (["fluidics", "fluidics-fittings", "guide-system-integration", "guide-lab-analyzer"].includes(document.slug)) return true;
  const context = document.reviewContext;
  return context?.family === "fluidics" && context.level === "product"
    && context.topic !== "gasPretreatment" && context.products.includes("fittings");
}
