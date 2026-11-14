import { assemblyText, assemblyLocale } from "@/data/products/configurator/tubing-assembly.intl";
import { snapshotFlangedConfiguration } from "@/data/products/configurator/flanged-tubing-cart";
import { normalizeFlangedChoice, validateFlangedChoice } from "@/data/products/configurator/flanged-tubing";
import type { FlangedConfiguration } from "@/data/products/configurator/flanged-tubing-configurations";
import { attachmentDigest, findPdfAttachment, readPdfAttachment, storePdfAttachment, type GeneratedPdfAttachment } from "@/lib/inquiry/pdf-attachments";
import { buildFlangedDrawingSheets, createFlangedDrawingPdf } from "./flanged-tubing-drawing";

const pending = new Map<string, Promise<GeneratedPdfAttachment>>();
const RENDERER_VERSION = "tubing-original-pdf-v15";
export function flangedDrawingFilename(record: FlangedConfiguration, locale = "zh") {
  return `${record.name}-R${record.revision}-${assemblyText("管组件矢量选型图", locale)}.pdf`.replace(/[\\/:*?"<>|\u0000-\u001f]/g, "_");
}

export async function prepareFlangedPdfAttachment(value: FlangedConfiguration, locale = "zh"): Promise<GeneratedPdfAttachment> {
  const invalid = validateFlangedChoice(normalizeFlangedChoice(value.choice));
  if (invalid) throw new Error(invalid);
  const record = snapshotFlangedConfiguration(value);
  const signature = await attachmentDigest(new TextEncoder().encode(JSON.stringify(record)).buffer);
  const key = `${RENDERER_VERSION}:${assemblyLocale(locale)}:${record.id}:r${record.revision}:${signature}`;
  const existing = pending.get(key);
  if (existing) return existing;
  const task = (async () => {
    const cached = await findPdfAttachment(key);
    if (cached) {
      try { await readPdfAttachment(cached); return cached; }
      catch { /* Rebuild a damaged cache from this exact frozen snapshot. */ }
    }
    const sheets = buildFlangedDrawingSheets(record, locale);
    const bytes = await createFlangedDrawingPdf(sheets, `${record.name} · R${record.revision}`);
    return storePdfAttachment(key, new File([new Uint8Array(bytes)], flangedDrawingFilename(record, locale), { type: "application/pdf", lastModified: 0 }), sheets.length);
  })();
  pending.set(key, task);
  try { return await task; } finally { pending.delete(key); }
}
