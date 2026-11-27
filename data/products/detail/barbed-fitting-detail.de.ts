import { barbedFittingSelectionProducts } from "../selection/barbed-fitting-selection.generated";
import { FITTING_PUBLISHED_PRODUCTS } from "../selection/fitting-publication.generated";

const straightApplications = [
  "Gerade Verbindung gleich dimensionierter Schläuche",
  "Verlängerung von Schlauchleitungen in Geräten",
  "Anschluss von Schläuchen an Pumpen und Ventile",
  "Gerade Verbindungen im Flüssigkeitspfad",
];

const reducingStraightApplications = [
  "Übergänge zwischen unterschiedlichen Schlauchinnendurchmessern",
  "Übergänge zwischen Schlauchgrößen in Geräten",
  "Anpassung von Pumpen- und Ventilanschlüssen an Schläuche",
  "Gerade Verbindungen im Flüssigkeitspfad",
];

const elbowApplications = [
  "Änderung der Schlauchrichtung",
  "Schlauchführung bei beengten Platzverhältnissen",
  "Flüssigkeitsanschlüsse im Bereich von Pumpen und Ventilen",
  "Umlenkung von Schläuchen in Geräten",
];

const teeApplications = [
  "Aufteilen oder Zusammenführen von drei Schlauchleitungen",
  "Verteilung von Reagenzien und Spülflüssigkeiten",
  "Anschluss von Abzweigen in Geräten",
  "Schlauchanschlüsse für Pumpen und Ventile",
];

const yApplications = [
  "Aufteilen oder Zusammenführen von drei Schlauchleitungen",
  "Abzweige für Proben oder Reagenzien",
  "Verzweigte Schlauchführung in Geräten",
  "Flüssigkeitspfade in der Laborautomatisierung",
];

const plugApplications = [
  "Verschließen von Schlauchenden",
  "Vorübergehendes Verschließen ungenutzter Abzweige",
  "Verschließen von Schläuchen bei der Gerätewartung",
  "Schutz bei Transport und Montage",
];

type ShapeCopy = {
  label: string;
  describe: (ids: readonly string[], reducing: boolean) => string;
  applications: readonly string[];
  reducingApplications?: readonly string[];
};

// These sentence patterns follow the English detail copy for the five body
// shapes. Diameter, material, color and model come from the released catalog.
const shapeCopy: Partial<Record<string, ShapeCopy>> = {
  BA: {
    label: "Gerader Schlauchverbinder mit Tüllen",
    describe: (ids, reducing) => reducing
      ? `verbindet Schläuche unterschiedlicher Innendurchmesser in einer geraden Schlauchstrecke. Die beiden Enden passen zu Schläuchen mit ${ids[0]} und ${ids[1]} Innendurchmesser. Damit lässt sich die Schlauchgröße im Flüssigkeitspfad des Geräts wechseln.`
      : `verbindet oder verlängert Schläuche gleicher Größe in einem geraden Leitungsverlauf. Beide Enden passen zu Schläuchen mit ${ids[0]} Innendurchmesser. Der Verbinder eignet sich für gerade Schlauchstrecken in Geräten.`,
    applications: straightApplications,
    reducingApplications: reducingStraightApplications,
  },
  BL: {
    label: "Winkel-Schlauchverbinder mit Tüllen",
    describe: (ids, reducing) => reducing
      ? `ändert die Richtung einer Schlauchstrecke und verbindet dabei unterschiedliche Schlauchinnendurchmesser. Die beiden Enden passen zu Schläuchen mit ${ids[0]} und ${ids[1]} Innendurchmesser. Der Verbinder eignet sich für beengte Einbauräume und Schlauchstrecken, die umgelenkt werden müssen.`
      : `lenkt den Schlauchverlauf bei begrenztem Platz für einen geraden Einbau um. Beide Anschlüsse passen zu Schläuchen mit ${ids[0]} Innendurchmesser. Der Verbinder eignet sich für Richtungswechsel in Geräten.`,
    applications: elbowApplications,
  },
  BT: {
    label: "T-Schlauchverbinder mit Tüllen",
    describe: (ids, reducing) => "dient zum Aufteilen, Zusammenführen oder Abzweigen von drei Schlauchleitungen. "
      + (reducing
        ? `Die drei Schlauchanschlüsse sind für Innendurchmesser von ${ids.join(" / ")} ausgelegt.`
        : `Alle drei Anschlüsse passen zu Schläuchen mit ${ids[0]} Innendurchmesser.`)
      + " Einsatzbereiche sind Reagenz- und Spülleitungen sowie Abzweige in Geräten.",
    applications: teeApplications,
  },
  BY: {
    label: "Y-Schlauchverbinder mit Tüllen",
    describe: (ids, reducing) => "dient zum Aufteilen, Zusammenführen oder Abzweigen von drei Schlauchleitungen. "
      + (reducing
        ? `Die drei Schlauchanschlüsse sind für Innendurchmesser von ${ids.join(" / ")} ausgelegt.`
        : `Alle drei Anschlüsse passen zu Schläuchen mit ${ids[0]} Innendurchmesser.`)
      + " Der Verbinder eignet sich für Y-förmige Abzweige in Geräten.",
    applications: yApplications,
  },
  BBL: {
    label: "Schlauchstopfen mit Tülle",
    describe: ids => `verschließt Schläuche mit ${ids[0]} Innendurchmesser oder sperrt einen ungenutzten Abzweig vorübergehend ab. Der Stopfen kann zum Verschließen von Schläuchen bei Gerätemontage, Inbetriebnahme, Wartung und Transport eingesetzt werden.`,
    applications: plugApplications,
  },
};

const materialLabels: Partial<Record<string, string>> = { PP: "PP", PA: "PA", PV: "PVDF" };
const colorLabels: Partial<Record<string, string>> = { N: "Naturfarbe", W: "Weiß" };

const selectionByCode = new Map(barbedFittingSelectionProducts.map(row => [row.productCode, row]));
const pathPrefix = "/products/fittings/barbed-fittings/";
const publishedBarbedModels = new Map(
  FITTING_PUBLISHED_PRODUCTS.flatMap(product => {
    if (product.productTypeId !== "barbed-fittings" || !product.detailHref.startsWith(pathPrefix)) return [];
    const slug = product.detailHref.slice(pathPrefix.length).replace(/\/+$/, "");
    return [[slug, product] as const];
  }),
);

export const germanBarbedFittingSlugs = [...publishedBarbedModels.keys()];

export function getGermanBarbedFittingContent(slug: string) {
  const model = publishedBarbedModels.get(slug.trim().toLowerCase());
  const row = model && selectionByCode.get(model.productCode);
  if (!model || !row || row.model !== model.foreachModel) return;

  const shape = shapeCopy[row.seriesCode];
  const material = materialLabels[row.materialCode];
  const color = colorLabels[row.colorCode];
  const ids: readonly string[] = row.portValues ?? [];
  if (!shape || !material || !color || !ids.length || ids.some(id => !id)) return;

  const modelName = model.foreachModel;
  const reducing = new Set(ids).size > 1;
  const isPlug = row.seriesCode === "BBL";
  const title = isPlug
    ? shape.label
    : shape.label + (reducing ? " für unterschiedliche Schlauchinnendurchmesser" : " für gleiche Schlauchgrößen");
  const description = `${modelName} ${shape.describe(ids, reducing)} Werkstoff: ${material}. Farbe: ${color}. Prüfen Sie bei der Auswahl den Schlauchwerkstoff, die Härte und die Maßtoleranzen. Überprüfen Sie anschließend den Sitz unter den vorgesehenen Montagebedingungen.`;
  const matchingDiameter = reducing
    ? `Die Anschlüsse passen zu Schläuchen mit Innendurchmessern von ${ids.join(" / ")}.`
    : `${isPlug ? "Der Stopfen" : "Der Verbinder"} passt zu Schläuchen mit ${ids[0]} Innendurchmesser.`;
  const faqs = [
    {
      question: `Welche Schlauchgröße passt zu ${modelName}?`,
      answer: `${matchingDiameter} Prüfen Sie bei der Auswahl den tatsächlichen Schlauchinnendurchmesser und den Sitz unter den vorgesehenen Montagebedingungen.`,
    },
    {
      question: "Wie unterscheiden sich gleich dimensionierte und reduzierende Schlauchverbinder?",
      answer: "Bei gleich dimensionierten Verbindern passen alle Anschlüsse zum selben Schlauchinnendurchmesser. Reduzierverbinder verbinden Schläuche mit unterschiedlichen Innendurchmessern.",
    },
    {
      question: "Bezieht sich die Tüllengröße auf den Innen- oder Außendurchmesser des Schlauchs?",
      answer: "Die Anschlussmaße auf dieser Seite beziehen sich auf den passenden Schlauchinnendurchmesser. Prüfen Sie vor der Montage auch den Schlauchwerkstoff, die Härte und die Maßtoleranzen.",
    },
    {
      question: `Ist ${material} mit dem vorgesehenen Medium verträglich?`,
      answer: "Prüfen Sie die Verträglichkeit anhand des Fördermediums, der Betriebstemperatur, des Drucks und der Reinigungsanforderungen. Bei unklarer Verträglichkeit können Sie diese Betriebsbedingungen zur technischen Prüfung einreichen.",
    },
    {
      question: `Kann ich eine 2D-Zeichnung für ${modelName} anfordern?`,
      answer: "Ja. Fügen Sie das Modell Ihrer Liste hinzu und geben Sie an, dass Sie eine Zeichnung benötigen. Unser technisches Team prüft die passende Ausführung und stellt Ihnen die Zeichnung bereit.",
    },
  ];

  return {
    title,
    description,
    faqs,
    commonApplications: reducing ? shape.reducingApplications ?? shape.applications : shape.applications,
    imageAlt: `${modelName}, ${title}, Schlauchinnendurchmesser ${(reducing ? ids : ids.slice(0, 1)).join(" / ")}, ${material}, ${color}`,
  };
}
