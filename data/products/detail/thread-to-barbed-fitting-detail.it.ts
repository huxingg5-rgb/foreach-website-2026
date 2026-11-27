import type { GermanProductDetailContent } from "./product-detail-content.de";
import detailRows from "../generated/fittings/thread-to-barbed-fittings/detail/index.json";
import { getPublishedFittingProductByCode, isPublishedFittingDetailRoute } from "../selection/fitting-publication.generated";

const seriesCopy: Partial<Record<string, { title: string; description: string; seal: string }>> = {
  SA: {
    title: "Raccordo portagomma diritto con tenuta sul filetto",
    description: "raccordo portagomma diritto con filettatura maschio",
    seal: "tenuta sul filetto",
  },
  SAL: {
    title: "Raccordo portagomma a gomito con tenuta sul filetto",
    description: "raccordo portagomma a gomito con filettatura maschio",
    seal: "tenuta sul filetto",
  },
  SB: {
    title: "Raccordo portagomma diritto con tenuta frontale",
    description: "raccordo portagomma con filettatura maschio e tenuta frontale a fondo piatto",
    seal: "tenuta frontale a fondo piatto",
  },
  SBS: {
    title: "Raccordo portagomma diritto corto con tenuta frontale",
    description: "raccordo portagomma con filettatura maschio e tenuta frontale a fondo piatto",
    seal: "tenuta frontale a fondo piatto",
  },
  SC: {
    title: "Raccordo portagomma con filettatura femmina",
    description: "raccordo portagomma diritto con filettatura femmina",
    seal: "filettatura femmina e portagomma",
  },
  SBR: {
    title: "Raccordo portagomma filettato orientabile",
    description: "raccordo portagomma orientabile con filettatura maschio",
    seal: "tenuta frontale a fondo piatto",
  },
};

const colorCopy: Partial<Record<string, string>> = { 本色: "naturale", 白色: "bianco", 黑色: "nero" };

export const italianThreadToBarbedFittingSlugs: readonly string[] = [
  "sa-u28-16d-pp-n",
  "sa-u28-24d-pa-w",
  "sa-u28-24d-pp-n",
  "sa-u28-32d-pa-w",
  "sa-u28-32d-pp-n",
  "sa-u28-40d-pa-w",
  "sa-u28-40d-pp-n",
  "sa-u28-48d-pa-w",
  "sa-u28-48d-pp-n",
  "sa-u32-32f-pa-w",
  "sa-u32-32f-pp-n",
  "sa-x32-24d-pa-w",
  "sa-x32-24d-pp-n",
  "sa-x32-32d-pa-w",
  "sa-x32-32d-pp-n",
  "sal-u28-16d-pa-w",
  "sal-u28-16d-pp-n",
  "sal-u28-32d-pa-w",
  "sal-u28-32d-pp-n",
  "sal-u32-16d-pa-w",
  "sal-u32-16d-pp-n",
  "sal-u32-32d-pa-w",
  "sal-u32-32d-pp-n",
  "sb-m5-16d-pa-w",
  "sb-m5-16d-pp-n",
  "sb-m5-24d-pa-w",
  "sb-m5-24d-pp-n",
  "sb-m5-32d-pa-w",
  "sb-m5-32d-pp-n",
  "sb-m5-40d-pa-w",
  "sb-m5-40d-pp-n",
  "sb-m6-24-ac-b",
  "sb-m6-40-ac-b",
  "sb-u28-16-ac-b",
  "sb-u28-40-ac-b",
  "sbs-m6-24d-pa-w",
  "sbs-m6-24d-pp-n",
  "sbs-m6-32d-pa-w",
  "sbs-m6-32d-pp-n",
  "sbr-u28-16-pp-n",
  "sbr-u28-24-pp-n",
  "sbr-u28-32-pp-n",
  "sc-m6-16-pp-n",
  "sc-m6-32-pp-n",
  "sc-u28-16d-pp-n",
  "sc-u28-24d-pp-n",
  "sc-u28-32d-pp-n",
];
const reviewedSlugs = new Set(italianThreadToBarbedFittingSlugs);
const models = new Map(detailRows.flatMap(row => {
  if (!reviewedSlugs.has(row.slug) || getPublishedFittingProductByCode(row.productCode)?.foreachModel !== row.model
    || !isPublishedFittingDetailRoute("thread-to-barbed-fittings", row.slug)) return [];
  const copy = seriesCopy[row.seriesCode];
  const specs = Object.fromEntries(row.specs.map(({label, value}) => [label, value]));
  const tubingId = specs["接管内径"];
  const thread = specs["螺纹规格"] === "3.4 锥螺纹" ? "Filettatura conica 3.4" : specs["螺纹规格"];
  const material = specs["材质"];
  const color = colorCopy[specs["颜色"]];
  return copy && tubingId && thread && material && color
    ? [[row.slug, { model: row.model, copy, tubingId, thread, material, color }] as const]
    : [];
}));

export function getItalianThreadToBarbedFittingContent(slug: string): GermanProductDetailContent | undefined {
  const record = models.get(slug);
  if (!record) return;
  const { model, copy, tubingId, thread, material, color } = record;
  return {
    title: copy.title,
    description: model + " è un " + copy.description + " per collegare un attacco filettato " + thread + " dello strumento a un tubo di diametro interno " + tubingId + ". Materiale: " + material + ". Collegamento e tenuta: " + copy.seal + ". Colore: " + color + ". Prima della scelta, verificate norma della filettatura, materiale e durezza del tubo, compatibilità con il fluido e spazio di montaggio disponibile.",
    imageAlt: copy.title + " " + model + ", filettatura " + thread + ", tubo di diametro interno " + tubingId + ", " + material + " " + color,
    bottomCta: {
      title: "Raccordi per ordini in quantità e applicazioni su misura",
      description: "FOREACH può assistervi nella scelta dei raccordi, nella fornitura in quantità e nella personalizzazione in base al tipo di attacco, alle dimensioni del tubo, ai materiali, alla tenuta, al montaggio e alle condizioni d'impiego.",
      buttonText: "Contattaci",
      href: "/en/contact/",
    },
    faqs: [
      { question: "Con quale filettatura e misura del tubo è compatibile " + model + "?", answer: "Collega una filettatura " + thread + " a un tubo di diametro interno " + tubingId + "." },
      { question: "La misura del portagomma si riferisce al diametro interno o esterno del tubo?", answer: "La misura " + tubingId + " è il diametro interno del tubo compatibile. Per il montaggio, considerate anche materiale, spessore della parete e durezza del tubo." },
      { question: "Come funzionano la tenuta sul filetto e la tenuta frontale a fondo piatto?", answer: "La tenuta sul filetto agisce nella zona di accoppiamento filettato. La tenuta frontale agisce sulla superficie di battuta. Scegliete il sistema di tenuta in base all’attacco dello strumento." },
      { question: material + " è compatibile con il fluido impiegato?", answer: "Verificate la compatibilità chimica di " + material + " per il fluido effettivo, la temperatura, la pressione e i requisiti di pulizia." },
      { question: "È disponibile un disegno quotato 2D?", answer: "Al momento non è presente un collegamento a un disegno 2D pubblico. Contattate il nostro team tecnico tramite il modulo di richiesta per verificarne la disponibilità.", drawingPreviewAnswer: "Il disegno quotato 2D di questo modello è disponibile in PDF nella scheda «Disegno 2D» di «Disegni e documentazione»." },
    ],
  };
}
