import type { GermanProductDetailContent } from "./product-detail-content.de";
import { isPublishedFittingDetailRoute } from "../selection/fitting-publication.generated";

const shapes = {
  straight: "raccordo diritto a due vie con filettatura femmina",
  square: "raccordo a due vie con corpo quadrato e filettatura femmina",
  tee: "raccordo a T con filettatura femmina",
  wye: "raccordo a Y con filettatura femmina",
  bulkhead: "raccordo passaparete a due vie con filettatura femmina",
};

type Model = { model: string; shape: keyof typeof shapes; thread: string; bore: string; material: string; };
const models: Readonly<Record<string, Model>> = {
  "pmu-m12-u28-20-pp-n": { model: "PMU-M12-U28-20-PP-N", shape: "bulkhead", thread: "1/4-28 UNF", bore: "2.0 mm", material: "PP" },
  "u-m6-20-ac-b": { model: "U-M6-20-AC-B", shape: "straight", thread: "M6", bore: "2.0 mm", material: "AC" },
  "u-m6-20-pp-n": { model: "U-M6-20-PP-N", shape: "straight", thread: "M6", bore: "2.0 mm", material: "PP" },
  "u-u28-20-pp-n": { model: "U-U28-20-PP-N", shape: "straight", thread: "1/4-28 UNF", bore: "2.0 mm", material: "PP" },
  "us-m6-05-ac-b": { model: "US-M6-05-AC-B", shape: "square", thread: "M6", bore: "0.5 mm", material: "AC" },
  "us-m6-05-pp-n": { model: "US-M6-05-PP-N", shape: "square", thread: "M6", bore: "0.5 mm", material: "PP" },
  "us-m6-10-ac-b": { model: "US-M6-10-AC-B", shape: "square", thread: "M6", bore: "1.0 mm", material: "AC" },
  "us-m6-10-pp-n": { model: "US-M6-10-PP-N", shape: "square", thread: "M6", bore: "1.0 mm", material: "PP" },
  "us-m6-15-ac-b": { model: "US-M6-15-AC-B", shape: "square", thread: "M6", bore: "1.5 mm", material: "AC" },
  "us-m6-15-pp-n": { model: "US-M6-15-PP-N", shape: "square", thread: "M6", bore: "1.5 mm", material: "PP" },
  "ut-u28-15-pp-n": { model: "UT-U28-15-PP-N", shape: "tee", thread: "1/4-28 UNF", bore: "1.5 mm", material: "PP" },
  "ut-u28-15-ps-b": { model: "UT-U28-15-PS-B", shape: "tee", thread: "1/4-28 UNF", bore: "1.5 mm", material: "PPS" },
  "ut-u28-20-pp-n": { model: "UT-U28-20-PP-N", shape: "tee", thread: "1/4-28 UNF", bore: "2.0 mm", material: "PP" },
  "ut-u28-20-ps-b": { model: "UT-U28-20-PS-B", shape: "tee", thread: "1/4-28 UNF", bore: "2.0 mm", material: "PPS" },
  "uy-u28-10-pp-n": { model: "UY-U28-10-PP-N", shape: "wye", thread: "1/4-28 UNF", bore: "1.0 mm", material: "PP" },
  "uy-u28-15-pp-n": { model: "UY-U28-15-PP-N", shape: "wye", thread: "1/4-28 UNF", bore: "1.5 mm", material: "PP" },
  "uy-u28-20-pp-n": { model: "UY-U28-20-PP-N", shape: "wye", thread: "1/4-28 UNF", bore: "2.0 mm", material: "PP" },
};

export const italianFemaleAdapterSlugs = Object.keys(models);

export function getItalianFemaleAdapterContent(slug: string): GermanProductDetailContent | undefined {
  const current = models[slug];
  if (!current || !isPublishedFittingDetailRoute("female-thread-adapters", slug)) return;
  const { model, shape, thread, bore, material } = current;
  const name = shapes[shape];
  return {
    title: name.charAt(0).toUpperCase() + name.slice(1),
    description: model + " è un " + name + ", con attacchi " + thread + " e diametro di passaggio " + bore + ". Corpo in " + material + ". Collega circuiti fluidici nei sistemi microfluidici e negli strumenti per diagnostica in vitro (IVD), analisi e automazione di laboratorio.",
    imageAlt: model + ", " + name + ", attacchi " + thread + ", diametro di passaggio " + bore + ", " + material,
    faqs: [
      { question: "Quando scegliere un raccordo a due vie o un raccordo a T?", answer: "Un raccordo a due vie unisce due attacchi. Un raccordo a T divide una linea in due o ne riunisce due. Scegliete secondo la configurazione del circuito." },
      { question: "Il diametro di passaggio e la filettatura indicano la stessa misura?", answer: "Il diametro di passaggio descrive la sezione interna del circuito. La misura del filetto identifica lo standard dell'attacco. Verificate le due quote separatamente." },
      { question: "È possibile adattare filettature di tipo diverso?", answer: "Usate le combinazioni di attacchi indicate per il modello disponibile. Per combinazioni non elencate inviate una richiesta personalizzata." },
      { question: "Come scegliere tra PP, PA e SS?", answer: "Scegliete il materiale in base a compatibilità con il fluido, pressione di esercizio, temperatura e resistenza meccanica." },
      { question: "Sono disponibili disegni 2D e modelli 3D?", answer: "I file disponibili sono riportati nella pagina del prodotto. Se il file del modello non è presente, richiedetelo con l'opzione disegno o con una nota nella lista della richiesta." },
    ],
    bottomCta: {
      title: "Raccordi per ordini in quantità e applicazioni su misura",
      description: "FOREACH può assistervi nella scelta dei raccordi, nella fornitura in quantità e nella personalizzazione in base al tipo di attacco, alle dimensioni del tubo, ai materiali, alla tenuta, al montaggio e alle condizioni d'impiego.",
      buttonText: "Contattaci",
      href: "/en/contact/",
    },
  };
}
