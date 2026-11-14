import { normalizeDrawingTypes } from "@/data/products/detail/drawing-requirements";
import { assemblyText } from "./tubing-assembly.intl";
import { localizedAssemblySummary } from "./tubing-assembly-presentation";
import { normalizeFlangedChoice, validateFlangedChoice } from "./flanged-tubing";
import { getAssemblyTube } from "./tubing-assembly-catalog";
import { parseFlangedConfigurationStore, type FlangedConfiguration } from "./flanged-tubing-configurations";
import type { SelectionCartItemInput } from "@/components/selection-cart/selection-cart.types";
import type { GeneratedPdfAttachment } from "@/lib/inquiry/pdf-attachments";

export function flangedConfigurationValidationError(records: readonly FlangedConfiguration[], locale = "zh"): string | null {
  for (const record of records) {
    try {
      const invalid = validateFlangedChoice(normalizeFlangedChoice(record.choice));
      if (invalid) return `${record.name}: ${assemblyText(invalid, locale)} ${assemblyText("请重新编辑配置并加入清单。", locale)}`;
    } catch { return assemblyText("清单中的管组件配置无法校验，请重新编辑配置并加入清单。", locale); }
  }
  return null;
}

export function snapshotFlangedConfiguration(record: FlangedConfiguration): FlangedConfiguration {
  // Validate and deep copy; later edits must not alter an already attached drawing.
  const copy = { ...record, choice: normalizeFlangedChoice(record.choice) };
  return parseFlangedConfigurationStore(JSON.stringify({ version: 1, nextNumber: record.number + 1, activeId: record.id, configurations: [copy] })).configurations[0];
}

export function flangedConfigurationCartId(record: FlangedConfiguration) {
  return `custom:flanged-configuration:${record.id}:r${record.revision}`;
}
export function flangedConfigurationProductName(record: FlangedConfiguration, locale = "zh") {
  return assemblyText(`${getAssemblyTube(record.choice.tubeModel)?.material} 定制管组件`, locale);
}

export function createFlangedConfigurationCartItem(record: FlangedConfiguration, attachment: GeneratedPdfAttachment, detailHref?: string, imagePath?: string, locale = "zh"): SelectionCartItemInput {
  const invalid = validateFlangedChoice(normalizeFlangedChoice(record.choice));
  if (invalid) throw new Error(invalid);
  const snapshot = snapshotFlangedConfiguration(record);
  return {
    id: flangedConfigurationCartId(snapshot), sourceType: "custom", sourceLabel: assemblyText("管组件搭配选型", locale),
    productName: flangedConfigurationProductName(snapshot, locale), productCode: assemblyText("待确认", locale), foreachModel: `${snapshot.name} · R${snapshot.revision}`,
    competitorModels: [], quantity: 1, needDrawing: true, drawingTypes: normalizeDrawingTypes(snapshot.drawingTypes), detailHref, imagePath,
    flangedConfiguration: snapshot, drawingAttachment: { ...attachment },
  };
}

export function flangedConfigurationInquirySummary(record: FlangedConfiguration, locale = "zh") {
  return `${record.name} · R${record.revision}\n${assemblyText("配置标识", locale)}: ${record.id}\n${localizedAssemblySummary(record.choice, locale)}`;
}
