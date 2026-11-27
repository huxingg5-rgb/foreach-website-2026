import type { GermanProductDetailContent } from "./product-detail-content.de";
import { barbedFittingSelectionProducts } from "../selection/barbed-fitting-selection.generated";
import { FITTING_PUBLISHED_PRODUCTS } from "../selection/fitting-publication.generated";

const pathPrefix = "/products/fittings/barbed-fittings/";
const selectionByCode = new Map(barbedFittingSelectionProducts.map(row => [row.productCode, row]));
const publishedModels = new Map(FITTING_PUBLISHED_PRODUCTS.flatMap(row =>
  row.productTypeId === "barbed-fittings" && row.detailHref.startsWith(pathPrefix)
    ? [[row.detailHref.slice(pathPrefix.length).replace(/\/+$/, ""), row] as const]
    : []
));

// Detail and selection copy is reviewed for each listed released model.
export const italianBarbedFittingSlugs: readonly string[] = [
  "ba-16c-pa-w",
  "ba-16c-pp-n",
  "ba-16d-24d-pa-w",
  "ba-16d-24d-pp-n",
  "ba-16d-32d-pa-w",
  "ba-16d-32d-pp-n",
  "ba-16f-24f-pa-w",
  "ba-16f-24f-pp-n",
  "ba-16f-24f-pv-n",
  "ba-16f-32f-pa-w",
  "ba-16f-32f-pp-n",
  "ba-16f-pa-w",
  "ba-16f-pp-n",
  "ba-16v-40v-pa-w",
  "ba-16v-40v-pp-n",
  "ba-24c-48c-pa-w",
  "ba-24c-48c-pp-n",
  "ba-24d-32d-pa-w",
  "ba-24d-32d-pp-n",
  "ba-24d-pa-w",
  "ba-24d-pp-n",
  "ba-24f-32f-pa-w",
  "ba-24f-32f-pp-n",
  "ba-24f-pa-w",
  "ba-24f-pp-n",
  "ba-24v-40v-pa-w",
  "ba-24v-40v-pp-n",
  "ba-32c-64c-pa-w",
  "ba-32c-64c-pp-n",
  "ba-32d-pa-w",
  "ba-32d-pp-n",
  "ba-32f-pa-w",
  "ba-32f-pp-n",
  "ba-32v-40v-pa-w",
  "ba-32v-40v-pp-n",
  "ba-40f-pa-w",
  "ba-40f-pp-n",
  "ba-64c-pa-w",
  "ba-64c-pp-n",
  "ba-64v-79v-pa-w",
  "ba-64v-79v-pp-n",
  "ba-64v-95v-pa-w",
  "ba-64v-95v-pp-n",
  "ba-64x-127x-pa-w",
  "ba-64x-127x-pp-n",
  "bl-127v-pp-n",
  "bl-16d-24d-pa-w",
  "bl-16d-24d-pp-n",
  "bl-16d-32d-pa-w",
  "bl-16d-32d-pp-n",
  "bl-16d-pa-w",
  "bl-16d-pp-n",
  "bl-16f-pa-w",
  "bl-16f-pp-n",
  "bl-24d-32d-pa-w",
  "bl-24d-32d-pp-n",
  "bl-24d-pa-w",
  "bl-24d-pp-n",
  "bl-24f-pa-w",
  "bl-24f-pp-n",
  "bl-32d-pa-w",
  "bl-32d-pp-n",
  "bl-32f-pa-w",
  "bl-32f-pp-n",
  "bl-40f-pa-w",
  "bl-40f-pp-n",
  "bl-64f-pa-w",
  "bl-64f-pp-n",
  "bl-95d-pa-w",
  "bl-95d-pp-n",
  "bt-127v-pp-n",
  "bt-16d-24d-24d-pa-w",
  "bt-16d-24d-24d-pp-n",
  "bt-16d-32d-32d-pa-w",
  "bt-16d-32d-32d-pp-n",
  "bt-16d-pa-w",
  "bt-16d-pp-n",
  "bt-16f-pa-w",
  "bt-16f-pp-n",
  "bt-24d-24d-16d-pa-w",
  "bt-24d-24d-16d-pp-n",
  "bt-24d-32d-32d-pa-w",
  "bt-24d-32d-32d-pp-n",
  "bt-24d-pa-w",
  "bt-24d-pp-n",
  "bt-24f-pa-w",
  "bt-24f-pp-n",
  "bt-32d-16d-16d-pa-w",
  "bt-32d-16d-16d-pp-n",
  "bt-32d-24d-24d-pa-w",
  "bt-32d-24d-24d-pp-n",
  "bt-32d-32d-16d-pa-w",
  "bt-32d-32d-16d-pp-n",
  "bt-32d-32d-24d-pa-w",
  "bt-32d-32d-24d-pp-n",
  "bt-32d-64t-64t-pa-w",
  "bt-32d-64t-64t-pp-n",
  "bt-32d-pa-w",
  "bt-32d-pp-n",
  "bt-32f-pa-w",
  "bt-32f-pp-n",
  "bt-40c-pa-w",
  "bt-40c-pp-n",
  "bt-64c-pa-w",
  "bt-64c-pp-n",
  "bt-64d-64d-32d-pa-w",
  "bt-64d-64d-32d-pp-n",
  "bt-64v-95v-95v-pa-w",
  "bt-64v-95v-95v-pp-n",
  "bt-95x-pa-w",
  "bt-95x-pp-n",
  "by-127v-pp-n",
  "by-16d-pa-w",
  "by-16d-pp-n",
  "by-16f-pa-w",
  "by-16f-pp-n",
  "by-24d-16d-16d-pa-w",
  "by-24d-16d-16d-pp-n",
  "by-24d-pa-w",
  "by-24d-pp-n",
  "by-24f-pa-w",
  "by-24f-pp-n",
  "by-32d-16d-16d-pa-w",
  "by-32d-16d-16d-pp-n",
  "by-32d-pa-w",
  "by-32d-pp-n",
  "by-32f-pa-w",
  "by-32f-pp-n",
  "by-40d-pa-w",
  "by-40d-pp-n",
  "by-48f-pa-w",
  "by-48f-pp-n",
  "by-64d-32d-32d-pa-w",
  "by-64d-32d-32d-pp-n",
  "by-64f-pa-w",
  "by-64f-pp-n",
  "by-95x-pa-w",
  "by-95x-pp-n",
  "bbl-16d-pa-w",
  "bbl-16d-pp-n",
  "bbl-24d-pa-w",
  "bbl-24d-pp-n",
  "bbl-32d-pa-w",
  "bbl-32d-pp-n",
];

type FittingGeometry = {
  title: string;
  diameterSeparator: string;
  describe: (reducing: boolean, portSizes: string, diameters: [string, string, string]) => string;
};

const describeThreeWay = (reducing: boolean, portSizes: string, diameters: [string, string, string], application: string) => {
  const sizes = reducing ? diameters.map(value => value.replace(/ mm$/, "")).join(" / ") + " mm" : portSizes;
  return "per dividere, riunire o diramare tre linee. Le tre estremità accettano tubi di diametro interno " + sizes + ", " + application + ".";
};

const fittingGeometry: Partial<Record<string, FittingGeometry>> = {
  BA: {
    title: "raccordo portagomma diritto",
    diameterSeparator: " e ",
    describe: (reducing, sizes) => reducing
      ? "per collegare in linea tubi di diametro interno diverso. Le due estremità sono adatte a tubi di diametro interno " + sizes + " e consentono di passare da una misura all'altra nel circuito dello strumento."
      : "per collegare e prolungare tubi della stessa misura. Entrambe le estremità sono adatte a tubi di diametro interno " + sizes + " per tratti diritti all'interno degli strumenti.",
  },
  BL: {
    title: "raccordo portagomma a gomito",
    diameterSeparator: " e ",
    describe: (reducing, sizes) => reducing
      ? "per cambiare direzione e collegare tubi di diametro interno diverso. Le due estremità sono adatte a tubi di diametro interno " + sizes + " per installazioni in spazi ristretti o percorsi che richiedono un cambio di direzione."
      : "per cambiare la direzione del tubo quando lo spazio per l'installazione in linea è limitato. Entrambe le estremità sono adatte a tubi di diametro interno " + sizes + " per i cambi di direzione all'interno degli strumenti.",
  },
  BT: {
    title: "raccordo portagomma a T",
    diameterSeparator: " / ",
    describe: (reducing, sizes, diameters) => describeThreeWay(reducing, sizes, diameters, "per linee di reagente, linee di lavaggio e diramazioni all'interno degli strumenti"),
  },
  BY: {
    title: "raccordo portagomma a Y",
    diameterSeparator: " / ",
    describe: (reducing, sizes, diameters) => describeThreeWay(reducing, sizes, diameters, "per diramazioni a Y all'interno degli strumenti"),
  },
  BBL: {
    title: "tappo portagomma",
    diameterSeparator: " / ",
    describe: (_reducing, size) => "per chiudere tubi di diametro interno " + size + " o isolare temporaneamente una diramazione inutilizzata. Può chiudere i tubi durante il montaggio, la messa in servizio, la manutenzione e il trasporto dello strumento.",
  },
};

export function getItalianBarbedFittingContent(slug: string): GermanProductDetailContent | undefined {
  if (!italianBarbedFittingSlugs.includes(slug)) return;
  const product = publishedModels.get(slug);
  const row = product && selectionByCode.get(product.productCode);
  if (!row || row.model !== product?.foreachModel) return;

  const model = row.model;
  const diameters = row.portValues ?? [];
  const [first, second = first, third = first] = diameters;
  if (!first) return;
  const reducing = new Set(diameters).size > 1;
  const geometry = fittingGeometry[row.seriesCode];
  if (!geometry) return;
  const title = geometry.title + (row.seriesCode === "BBL" ? "" : reducing ? " di riduzione" : " a diametri uguali");
  const material = ({ PP: "PP", PA: "PA", PV: "PVDF" } as const)[row.materialCode as "PP" | "PA" | "PV"];
  const color = ({ N: "naturale", W: "bianco" } as const)[row.colorCode as "N" | "W"];
  if (!material || !color) return;

  const portSizes = reducing ? diameters.join(geometry.diameterSeparator) : first;
  const description = model + " è un " + title + " " + geometry.describe(reducing, portSizes, [first, second, third]) + " Materiale: " + material + ". Colore: " + color + ". Controllate materiale, durezza e tolleranze del tubo, quindi verificate l'accoppiamento nelle condizioni di montaggio previste.";
  const fit = "È adatto a tubi di diametro interno " + portSizes + ".";
  return {
    title: title.charAt(0).toUpperCase() + title.slice(1),
    description,
    imageAlt: model + ", " + title + ", diametro interno del tubo " + (reducing ? diameters.join(" / ") : first) + ", " + material + " " + color,
    faqs: [
      { question: "Quale misura di tubo è adatta a " + model + "?", answer: fit + " Per la scelta, usate il diametro interno effettivo del tubo e verificate l'accoppiamento dopo il montaggio." },
      { question: "Qual è la differenza tra le versioni a diametri uguali e quelle di riduzione?", answer: "Nelle versioni a diametri uguali, tutte le estremità accettano tubi dello stesso diametro interno. Le versioni di riduzione collegano tubi di diametri interni diversi." },
      { question: "La misura del portagomma si riferisce al diametro interno o esterno del tubo?", answer: "Le misure di collegamento riportate qui si riferiscono al diametro interno del tubo compatibile. Prima del montaggio, controllate anche materiale, durezza e tolleranze dimensionali del tubo." },
      { question: material + " è compatibile con il fluido impiegato?", answer: "Verificate la compatibilità per fluido, temperatura di esercizio, pressione e requisiti di pulizia. Se avete dubbi, sottoponete queste condizioni al nostro team tecnico." },
      { question: "Posso richiedere un disegno 2D di " + model + "?", answer: "Sì. Aggiungete il modello alla lista e specificate che vi occorre un disegno. Il nostro team tecnico verificherà e fornirà la versione applicabile." },
    ],
    bottomCta: {
      title: "Raccordi per ordini in quantità e applicazioni su misura",
      description: "FOREACH può assistervi nella scelta dei raccordi, nella fornitura in quantità e nella personalizzazione in base al tipo di attacco, alle dimensioni del tubo, ai materiali, alla tenuta, al montaggio e alle condizioni d'impiego.",
      buttonText: "Contattaci",
      href: "/en/contact/",
    },
  };
}
