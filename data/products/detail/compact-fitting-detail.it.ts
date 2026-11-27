import type { GermanProductDetailContent } from "./product-detail-content.de";
import { isPublishedFittingDetailRoute } from "../selection/fitting-publication.generated";

const cta: GermanProductDetailContent["bottomCta"] = {
  title: "Raccordi per ordini in quantità e applicazioni su misura",
  description: "FOREACH può assistervi nella scelta dei raccordi, nella fornitura in quantità e nella personalizzazione in base al tipo di attacco, alle dimensioni del tubo, ai materiali, alla tenuta, al montaggio e alle condizioni d'impiego.",
  buttonText: "Contattaci",
  href: "/en/contact/",
};

const bulkheadModels: Readonly<Record<string, { model: string; tubingId: string; material: string }>> = {
  "pmb-u28-16d-pa-w": { model: "PMB-U28-16D-PA-W", tubingId: "1.6 mm", material: "PA" },
  "pmb-u28-16d-pp-n": { model: "PMB-U28-16D-PP-N", tubingId: "1.6 mm", material: "PP" },
  "pmb-u28-24d-pa-w": { model: "PMB-U28-24D-PA-W", tubingId: "2.4 mm", material: "PA" },
  "pmb-u28-24d-pp-n": { model: "PMB-U28-24D-PP-N", tubingId: "2.4 mm", material: "PP" },
  "pmb-u28-32d-pa-w": { model: "PMB-U28-32D-PA-W", tubingId: "3.2 mm", material: "PA" },
  "pmb-u28-32d-pp-n": { model: "PMB-U28-32D-PP-N", tubingId: "3.2 mm", material: "PP" },
};

const filterModels: Readonly<Record<string, { model: string; code: string; drawing: string }>> = {
  "f-pe-60-32-pp-n": {
    model: "F-PE-60-32-PP-N",
    code: "60",
    drawing: "Aggiungete il prodotto alla lista e richiedete il disegno. Il nostro team tecnico verificherà la revisione del documento in base al codice articolo e al codice del componente.",
  },
  "f-pe-100-32-pp-n": {
    model: "F-PE-100-32-PP-N",
    code: "100",
    drawing: "Il disegno 2D del modello è incluso nei documenti disponibili. Controllate la revisione del disegno prima di usarlo per la progettazione o il montaggio.",
  },
};
const checkSlug = "cv-be-32-pp-n";
export const italianCompactFittingSlugs = {
  "bulkhead-barbed-fittings": Object.keys(bulkheadModels),
  filters: Object.keys(filterModels),
  "check-valves": [checkSlug],
};

export function getItalianCompactFittingContent(family: string, slug: string): GermanProductDetailContent | undefined {
  if (!isPublishedFittingDetailRoute(family, slug)) return;
  const bulkhead = family === "bulkhead-barbed-fittings" ? bulkheadModels[slug] : undefined;
  if (bulkhead) {
    const { model, tubingId, material } = bulkhead;
    const title = "Raccordo portagomma passaparete";
    return {
      title,
      description: model + " è un raccordo portagomma passaparete con filettatura 1/4-28 UNF per tubi di diametro interno " + tubingId + ". Corpo in " + material + ". Collega i tubi sui lati opposti di un pannello, di un involucro o di una paratia dello strumento.",
      imageAlt: title + " " + model + ", filettatura 1/4-28 UNF, diametro interno del tubo " + tubingId + ", " + material + (material === "PA" ? " bianco" : " naturale"),
      faqs: [
        { question: "Quale filettatura usa " + model + "?", answer: "Il modello usa una filettatura 1/4-28 UNF. Prima del montaggio, verificate le quote di montaggio in base allo spessore del pannello e allo spazio disponibile." },
        { question: "Quale diametro interno del tubo è compatibile con " + model + "?", answer: "Il modello è adatto a tubi di diametro interno " + tubingId + ". Durante il montaggio, controllate il materiale del tubo e le tolleranze dimensionali." },
        { question: "Qual è il materiale del corpo di " + model + "?", answer: "Il corpo è in " + material + ". Verificate la compatibilità con il fluido alla temperatura e nelle condizioni di esercizio previste." },
        { question: "Come si monta un raccordo portagomma passaparete?", answer: "Si monta attraverso il pannello, l'involucro o la paratia dello strumento per collegare i tubi sui due lati." },
        { question: "È disponibile un disegno 2D di " + model + "?", answer: "L'anteprima del disegno 2D è disponibile nella pagina del modello." },
      ],
      bottomCta: cta,
    };
  }
  const filter = family === "filters" ? filterModels[slug] : undefined;
  if (filter) {
    const { model, code, drawing } = filter;
    const title = "Filtro in linea con elemento filtrante in PE";
    return {
      title,
      description: model + " è un filtro in linea della serie PE con attacco da 3.2 mm e corpo in PP. Codice di filtrazione: " + code + ". Trattiene le particelle e prefiltra i fluidi dello strumento per proteggere pompe, valvole e altri componenti. Nella scelta verificate fluido, requisiti di filtrazione, portata, pressione e temperatura.",
      imageAlt: model + " filtro in linea della serie PE",
      faqs: [
        { question: "Che tipo di filtro è " + model + "?", answer: "È un filtro in linea della serie PE. Prima della scelta, verificate i requisiti di filtrazione, la misura dell'attacco e le condizioni di esercizio." },
        { question: "Qual è la misura dell'attacco di " + model + "?", answer: "La misura indicata per l'attacco è 3.2 mm. Prima del montaggio, controllate le dimensioni del tubo abbinato e il tipo di collegamento." },
        { question: "Come posso verificare le specifiche di filtrazione di " + model + "?", answer: "Il codice di filtrazione riportato nel modello è " + code + ". Per il grado e le prestazioni effettive di filtrazione, consultate la documentazione tecnica ufficiale o chiedete conferma al nostro team tecnico." },
        { question: "Il PP è compatibile con il fluido previsto?", answer: "Valutate insieme composizione del fluido, temperatura, pressione, requisiti di pulizia e durata di esercizio. Se la compatibilità è incerta, comunicateci le condizioni di esercizio." },
        { question: "Posso richiedere un disegno 2D di " + model + "?", answer: drawing },
      ],
      bottomCta: cta,
    };
  }
  if (family !== "check-valves" || slug !== checkSlug) return;
  const model = "CV-BE-32-PP-N";
  const title = "Valvola di ritegno a membrana";
  return {
    title,
    description: model + " è una valvola di ritegno a membrana con attacco da 3.2 mm e corpo in PP. Limita il flusso inverso per ridurre il riflusso nel circuito. Sceglietela in base a fluido, portata, condizioni di apertura, pressione di esercizio, temperatura e direzione di montaggio.",
    imageAlt: model + " valvola di ritegno a membrana",
    faqs: [
      { question: "Che tipo di valvola di ritegno è " + model + "?", answer: "È una valvola di ritegno a membrana. Strutture diverse possono avere caratteristiche di apertura, prestazioni di flusso e compatibilità con i fluidi diverse." },
      { question: "Qual è la misura dell'attacco di " + model + "?", answer: "La misura indicata per l'attacco è 3.2 mm. Prima del montaggio, controllate anche le dimensioni del tubo abbinato." },
      { question: "In quale direzione si monta la valvola di ritegno?", answer: "Identificate ingresso e uscita dai contrassegni o dal disegno. Un montaggio in senso inverso può compromettere il funzionamento del circuito." },
      { question: "Il PP è compatibile con il fluido previsto?", answer: "Valutate insieme composizione del fluido, temperatura, pressione, requisiti di pulizia e durata di esercizio prevista." },
      { question: "Posso richiedere un disegno 2D di " + model + "?", answer: "Per questo modello è disponibile un disegno 2D. Prima di usarlo per la progettazione o il montaggio, controllate il codice articolo e la revisione del disegno." },
    ],
    bottomCta: cta,
  };
}
