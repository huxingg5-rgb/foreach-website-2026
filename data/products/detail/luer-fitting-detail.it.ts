import type { GermanProductDetailContent } from "./product-detail-content.de";
import detailRows from "../generated/fittings/luer-fittings/detail/index.json";
import { getPublishedFittingProductByCode, isPublishedFittingDetailRoute } from "../selection/fitting-publication.generated";

const series = {
  LSL: { name: "inserto Luer maschio fisso", collar: "fissa" },
  LRL: { name: "inserto Luer maschio girevole", collar: "girevole" },
  LPR: { name: "raccordo Luer maschio con ghiera di bloccaggio girevole" },
  LPS: { name: "raccordo Luer maschio con ghiera di bloccaggio fissa" },
  LP: { name: "raccordo Luer maschio monopezzo" },
  LS: { name: "raccordo Luer femmina" },
  PMLS: { name: "raccordo Luer femmina passaparete" },
  LPT: { name: "ghiera Luer con filettatura interna" },
  LCR: { name: "anello di identificazione Luer" },
  LNS: { name: "dado zigrinato Luer" },
  LPBL: { name: "tappo Luer maschio" },
} satisfies Record<string, { name: string; collar?: string }>;

const colors: Record<string, string> = {
  本色: "naturale", 白色: "bianco", 黑色: "nero", 红色: "rosso",
  绿色: "verde", 蓝色: "blu", 橙色: "arancione", 黄色: "giallo",
};
const models = new Map(detailRows.flatMap(row => {
  if (getPublishedFittingProductByCode(row.productCode)?.foreachModel !== row.model
    || !isPublishedFittingDetailRoute("luer-fittings", row.slug)) return [];
  const copy = (series as Record<string, { name: string; collar?: string }>)[row.seriesCode];
  if (!copy) return [];
  const specs = Object.fromEntries(row.specs.map(({label, value}) => [label, value]));
  return [[row.slug, { model: row.model, copy, tubingId: specs["接管内径"],
    thread: specs["螺纹规格"], material: specs["材质"], color: colors[specs["颜色"]],
  }] as const];
}));
export const italianLuerFittingSlugs: readonly string[] = [...models.keys()];

const application = "nei sistemi microfluidici, nelle apparecchiature per IVD, nella strumentazione analitica e nell’automazione di laboratorio";
const faqs = [
  { question: "Come scelgo fra un connettore Luer maschio e uno femmina?", answer: "Scegliete il genere del Luer in base al raccordo di accoppiamento, poi verificate se serve una ghiera di bloccaggio." },
  { question: "Che differenza c’è tra un raccordo con ghiera di bloccaggio e uno monopezzo?", answer: "La ghiera si serra per trattenere il collegamento. Un raccordo monopezzo è più compatto. Scegliete in base allo spazio e alla modalità di impiego." },
  { question: "Come scelgo la misura del tubo?", answer: "Usate il diametro interno del tubo, poi controllate il materiale, la durezza e l’accoppiamento effettivo dopo il montaggio." },
  { question: "Quale materiale devo scegliere?", answer: "Scegliete PP, PA, PVDF o un altro materiale indicato in funzione della compatibilità con il fluido, della temperatura, della resistenza e dei requisiti di pulizia." },
  { question: "Quali colori sono disponibili?", answer: "I colori di serie sono quelli dei modelli disponibili. Indicate eventuali altri requisiti di colore nell’elenco della richiesta." },
];

export function getItalianLuerFittingContent(slug: string): GermanProductDetailContent | undefined {
  const record = models.get(slug);
  if (!record) return;
  const { model, copy, tubingId, thread, material, color } = record;
  const article = slug.startsWith("lpt-") ? "una" : "un";
  const threadCopy = thread ? " con filettatura " + thread : "";
  const size = tubingId ? " per tubi di diametro interno " + tubingId : "";
  const description = model + " è " + article + " " + copy.name + threadCopy + size + ", in " + material + ". "
    + (slug.startsWith("lpbl-") ? "Chiude un attacco Luer femmina compatibile."
      : (size ? "È destinato a collegamenti fluidici " : "Si usa negli assemblaggi fluidici ") + application + ".")
    + (copy.collar ? " Abbinatelo a una ghiera di bloccaggio LPT per ottenere un raccordo Luer lock maschio con ghiera " + copy.collar + "." : "");
  return {
    title: copy.name.charAt(0).toUpperCase() + copy.name.slice(1),
    description,
    imageAlt: [model + ", " + copy.name + threadCopy + size, material, color].filter(Boolean).join(", "),
    faqs,
    bottomCta: {
      title: "Raccordi per forniture in quantità e applicazioni su misura",
      description: "FOREACH può assistervi nella scelta dei raccordi, nella fornitura in quantità e nella personalizzazione in base al tipo di attacco, alle dimensioni del tubo, ai materiali, alla tenuta, al montaggio e alle condizioni d’impiego.",
      buttonText: "Contattaci",
      href: "/en/contact/",
    },
  };
}
