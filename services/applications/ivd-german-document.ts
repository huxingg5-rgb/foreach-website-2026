import type { ApplicationDocument } from "@/data/applications/analytical-documents/types";
import { getGermanIvdText } from "@/data/applications/ivd-locales/de";
import { addClinicalDegassingReview } from "@/data/applications/english-locales/degassing-review";
import { addEnglishTaskParagraphLinks } from "@/data/applications/english-locales/task-contextual-links";
import type { GermanIvdDraftSlug } from "@/lib/i18n/german-application-draft-paths";
import { getLocalizedIvdDocument } from "./ivd-localized";

const textFields = new Set([
  "title", "navLabel", "seoTitle", "description", "eyebrow", "label", "text",
  "caption", "note", "tocLabel", "viewDetails", "alt", "highlight",
  "headers", "nodes", "keywords", "items", "rows",
]);

function applyGermanIvdDocumentCopy(
  source: ApplicationDocument,
  copy: Readonly<Record<string, string>>,
): ApplicationDocument {
  function localize(value: unknown, key = ""): unknown {
    // References are handled separately so bibliographic titles and IDs are preserved.
    if (key === "references") return value;
    if (Array.isArray(value)) return value.map(item => localize(item, key));
    if (value && typeof value === "object") {
      return Object.fromEntries(Object.entries(value)
        .map(([field, item]) => [field, localize(item, field)]));
    }
    if (typeof value !== "string" || !value.trim() || !textFields.has(key)) return value;
    const german = copy[value];
    if (!german) throw new Error(`Missing German IVD translation in ${source.slug}: ${value}`);
    return german;
  }

  const document = localize(source) as ApplicationDocument;
  return {
    ...document,
    references: source.references.map(reference =>
      reference.href.startsWith("/en/products/")
        ? { ...reference, title: getGermanIvdText(reference.title) }
        : reference,
    ),
  };
}

const dictionaryLoaders = {
  "guide-clinical": () => import("@/data/applications/ivd-locales/de/guide-clinical.json"),
  "guide-immunoassay": () => import("@/data/applications/ivd-locales/de/guide-immunoassay.json"),
  "guide-hematology": () => import("@/data/applications/ivd-locales/de/guide-hematology.json"),
  "guide-coagulation": () => import("@/data/applications/ivd-locales/de/guide-coagulation.json"),
  "guide-molecular": () => import("@/data/applications/ivd-locales/de/guide-molecular.json"),
  "clinical-diaphragm-pumps": () => import("@/data/applications/ivd-locales/de/clinical-diaphragm-pumps.json"),
  "clinical-cleaning": () => import("@/data/applications/ivd-locales/de/clinical-cleaning.json"),
  "clinical-fluid-monitoring": () => import("@/data/applications/ivd-locales/de/clinical-fluid-monitoring.json"),
  "clinical-fluidic-connections": () => import("@/data/applications/ivd-locales/de/clinical-fluidic-connections.json"),
  "clinical-fluidic-valves": () => import("@/data/applications/ivd-locales/de/clinical-fluidic-valves.json"),
  "clinical-switching": () => import("@/data/applications/ivd-locales/de/clinical-switching.json"),
  "clinical-piston-pumps": () => import("@/data/applications/ivd-locales/de/clinical-piston-pumps.json"),
  "piston-reagent-dispensing": () => import("@/data/applications/ivd-locales/de/piston-reagent-dispensing.json"),
  "piston-sample-transfer": () => import("@/data/applications/ivd-locales/de/piston-sample-transfer.json"),
  "clinical-probes": () => import("@/data/applications/ivd-locales/de/clinical-probes.json"),
  "clinical-syringe-pumps": () => import("@/data/applications/ivd-locales/de/clinical-syringe-pumps.json"),
  "coagulation-diaphragm-pumps": () => import("@/data/applications/ivd-locales/de/coagulation-diaphragm-pumps.json"),
  "coagulation-cleaning": () => import("@/data/applications/ivd-locales/de/coagulation-cleaning.json"),
  "coagulation-fluid-monitoring": () => import("@/data/applications/ivd-locales/de/coagulation-fluid-monitoring.json"),
  "coagulation-fluidic-connections": () => import("@/data/applications/ivd-locales/de/coagulation-fluidic-connections.json"),
  "coagulation-fluidic-valves": () => import("@/data/applications/ivd-locales/de/coagulation-fluidic-valves.json"),
  "coagulation-switching": () => import("@/data/applications/ivd-locales/de/coagulation-switching.json"),
  "coagulation-piston-pumps": () => import("@/data/applications/ivd-locales/de/coagulation-piston-pumps.json"),
  "coagulation-sample": () => import("@/data/applications/ivd-locales/de/coagulation-sample.json"),
  "coagulation-probes": () => import("@/data/applications/ivd-locales/de/coagulation-probes.json"),
  "coagulation-syringe-pumps": () => import("@/data/applications/ivd-locales/de/coagulation-syringe-pumps.json"),
  "coagulation-reagent": () => import("@/data/applications/ivd-locales/de/coagulation-reagent.json"),
  "hematology-diaphragm-pumps": () => import("@/data/applications/ivd-locales/de/hematology-diaphragm-pumps.json"),
  "hematology-cleaning": () => import("@/data/applications/ivd-locales/de/hematology-cleaning.json"),
  "hematology-fluid-monitoring": () => import("@/data/applications/ivd-locales/de/hematology-fluid-monitoring.json"),
  "hematology-fluidic-connections": () => import("@/data/applications/ivd-locales/de/hematology-fluidic-connections.json"),
  "hematology-fluidic-valves": () => import("@/data/applications/ivd-locales/de/hematology-fluidic-valves.json"),
  "hematology-channel": () => import("@/data/applications/ivd-locales/de/hematology-channel.json"),
  "hematology-piston-pumps": () => import("@/data/applications/ivd-locales/de/hematology-piston-pumps.json"),
  "hematology-sample": () => import("@/data/applications/ivd-locales/de/hematology-sample.json"),
  "hematology-probes": () => import("@/data/applications/ivd-locales/de/hematology-probes.json"),
  "hematology-syringe-pumps": () => import("@/data/applications/ivd-locales/de/hematology-syringe-pumps.json"),
  "hematology-dilution": () => import("@/data/applications/ivd-locales/de/hematology-dilution.json"),
  "immunoassay-diaphragm-pumps": () => import("@/data/applications/ivd-locales/de/immunoassay-diaphragm-pumps.json"),
  "immunoassay-bead-wash": () => import("@/data/applications/ivd-locales/de/immunoassay-bead-wash.json"),
  "immunoassay-fluid-monitoring": () => import("@/data/applications/ivd-locales/de/immunoassay-fluid-monitoring.json"),
  "immunoassay-fluidic-connections": () => import("@/data/applications/ivd-locales/de/immunoassay-fluidic-connections.json"),
  "immunoassay-fluidic-valves": () => import("@/data/applications/ivd-locales/de/immunoassay-fluidic-valves.json"),
  "immunoassay-switching": () => import("@/data/applications/ivd-locales/de/immunoassay-switching.json"),
  "immunoassay-piston-pumps": () => import("@/data/applications/ivd-locales/de/immunoassay-piston-pumps.json"),
  "immunoassay-sample": () => import("@/data/applications/ivd-locales/de/immunoassay-sample.json"),
  "immunoassay-probes": () => import("@/data/applications/ivd-locales/de/immunoassay-probes.json"),
  "immunoassay-syringe-pumps": () => import("@/data/applications/ivd-locales/de/immunoassay-syringe-pumps.json"),
  "immunoassay-reagent": () => import("@/data/applications/ivd-locales/de/immunoassay-reagent.json"),
  "molecular-diaphragm-pumps": () => import("@/data/applications/ivd-locales/de/molecular-diaphragm-pumps.json"),
  "molecular-fluid-monitoring": () => import("@/data/applications/ivd-locales/de/molecular-fluid-monitoring.json"),
  "molecular-fluidic-connections": () => import("@/data/applications/ivd-locales/de/molecular-fluidic-connections.json"),
  "molecular-fluidic-valves": () => import("@/data/applications/ivd-locales/de/molecular-fluidic-valves.json"),
  "molecular-switching": () => import("@/data/applications/ivd-locales/de/molecular-switching.json"),
  "molecular-pipetting-pumps": () => import("@/data/applications/ivd-locales/de/molecular-pipetting-pumps.json"),
  "molecular-wash": () => import("@/data/applications/ivd-locales/de/molecular-wash.json"),
  "molecular-syringe-pumps": () => import("@/data/applications/ivd-locales/de/molecular-syringe-pumps.json"),
  "molecular-lysis": () => import("@/data/applications/ivd-locales/de/molecular-lysis.json"),
} satisfies Record<GermanIvdDraftSlug, () => Promise<{ default: Readonly<Record<string, string>> }>>;

export async function getGermanIvdDocument(slug: GermanIvdDraftSlug): Promise<ApplicationDocument> {
  const [english, { default: copy }] = await Promise.all([
    getLocalizedIvdDocument("en", slug),
    dictionaryLoaders[slug](),
  ]);
  const source = addEnglishTaskParagraphLinks(addClinicalDegassingReview(english), "ivd");
  return applyGermanIvdDocumentCopy(source, copy);
}
