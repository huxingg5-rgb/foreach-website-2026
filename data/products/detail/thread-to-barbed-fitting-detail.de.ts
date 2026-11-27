import detailRows from "../generated/fittings/thread-to-barbed-fittings/detail/index.json";
import {
  getPublishedFittingProductByCode,
  isPublishedFittingDetailRoute,
  isPublishedFittingProduct,
} from "../selection/fitting-publication.generated";

const productType = "thread-to-barbed-fittings";

const seriesCopy: Partial<Record<string, { title: string; bodyType: string }>> = {
  SA: {
    title: "Gerade Gewinde-Schlauchtülle mit Gewindeabdichtung",
    bodyType: "eine gerade Schlauchtülle mit Außengewinde",
  },
  SAL: {
    title: "Winkel-Gewinde-Schlauchtülle mit Gewindeabdichtung",
    bodyType: "eine Winkel-Schlauchtülle mit Außengewinde",
  },
  SB: {
    title: "Gerade Gewinde-Schlauchtülle mit Stirnflächenabdichtung",
    bodyType: "eine gerade Schlauchtülle mit Außengewinde",
  },
  SBS: {
    title: "Gerade Gewinde-Schlauchtülle mit Stirnflächenabdichtung",
    bodyType: "eine gerade Schlauchtülle mit Außengewinde",
  },
  SBR: {
    title: "Drehbare Gewinde-Schlauchtülle",
    bodyType: "eine drehbare Schlauchtülle mit Außengewinde",
  },
  SC: {
    title: "Schlauchtülle mit Innengewinde",
    bodyType: "eine gerade Schlauchtülle mit Innengewinde",
  },
};

const sealingCopy: Partial<Record<string, string>> = {
  螺纹密封: "Die Abdichtung erfolgt im Gewindebereich.",
  底面密封: "Die Abdichtung erfolgt an der flachen Stirnfläche.",
  内螺纹转倒刺: "Anschlussausführung: Innengewinde mit Schlauchtülle.",
};

const colorCopy: Partial<Record<string, string>> = {
  本色: "Naturfarbe",
  白色: "Weiß",
  黑色: "Schwarz",
};

const commonApplications = [
  "Anpassung von Flüssigkeitspfaden innerhalb von Geräten",
  "Schlauchanschlüsse an Gewindeanschlüsse von Pumpen und Ventilen",
  "Flüssigkeitspfade in IVD- und Analysegeräten",
  "Flüssigkeitskreisläufe in Geräten für die Laborautomatisierung",
] as const;

// Follow the published detail records. The cards' generic portValues do not
// describe the specific tubing ID on every threaded fitting.
const publishedModels = new Map(detailRows.flatMap((row) => {
  const published = getPublishedFittingProductByCode(row.productCode);
  if (
    !isPublishedFittingProduct(row) ||
    published?.foreachModel !== row.model ||
    !isPublishedFittingDetailRoute(productType, row.slug)
  ) return [];

  const copy = seriesCopy[row.seriesCode];
  const spec = Object.fromEntries(row.specs.map(({ label, value }) => [label, value]));
  const thread = spec["螺纹规格"];
  const tubingId = spec["接管内径"];
  const material = spec["材质"];
  const seal = sealingCopy[spec["密封方式"]];
  const color = colorCopy[spec["颜色"]];
  if (!copy || !thread || !tubingId || !material || !seal || !color) return [];

  return [[row.slug, { model: row.model, copy, thread, tubingId, material, seal, color }] as const];
}));

export const germanThreadToBarbedFittingSlugs = [...publishedModels.keys()];

export function getGermanThreadToBarbedFittingContent(slug: string) {
  const record = publishedModels.get(slug.trim().toLowerCase());
  if (!record) return;

  const { model, copy, thread, tubingId, material, seal, color } = record;
  const threadDescription = thread === "3.4 锥螺纹" ? "Kegelgewinde 3.4" : thread;
  const description = `${model} ist ${copy.bodyType} für den Übergang von einem Geräteanschluss (${threadDescription}) zu einem Schlauch mit ${tubingId} Innendurchmesser. Werkstoff: ${material}. ${seal} Farbe: ${color}. Prüfen Sie bei der Auswahl die Gewindenorm, Werkstoff und Härte des Schlauchs, die Medienverträglichkeit und den verfügbaren Einbauraum.`;

  return {
    title: copy.title,
    description,
    faqs: [
      {
        question: `Für welches Gewinde und welchen Schlauchinnendurchmesser eignet sich ${model}?`,
        answer: `Dieses Modell verbindet einen Geräteanschluss (${threadDescription}) mit einem Schlauch, dessen Innendurchmesser ${tubingId} beträgt.`,
      },
      {
        question: "Bezieht sich die Tüllengröße auf den Innen- oder den Außendurchmesser des Schlauchs?",
        answer: `Die Angabe ${tubingId} bezeichnet den passenden Schlauchinnendurchmesser. Berücksichtigen Sie bei der Montage außerdem Schlauchwerkstoff, Wandstärke und Härte.`,
      },
      {
        question: "Wie unterscheiden sich Gewindeabdichtung und Stirnflächenabdichtung am flachen Anschlussboden?",
        answer: "Die Gewindeabdichtung wirkt im Bereich des Gewindeeingriffs. Die Stirnflächenabdichtung wirkt an der flachen Dichtfläche. Stimmen Sie die Dichtungsart auf den Geräteanschluss ab.",
      },
      {
        question: `Ist ${material} mit meinem Medium verträglich?`,
        answer: `Prüfen Sie die chemische Beständigkeit von ${material} anhand des eingesetzten Mediums, der Temperatur, des Drucks und der Reinigungsanforderungen.`,
      },
      {
        question: "Kann ich eine 2D-Maßzeichnung einsehen?",
        answer: "Aktuell ist keine öffentliche 2D-Zeichnung verlinkt. Fragen Sie über das Anfrageformular bei unserem technischen Team nach der Verfügbarkeit.",
        drawingPreviewAnswer: "Die 2D-Maßzeichnung für dieses Modell finden Sie als PDF im Reiter „2D-Zeichnung“ unter „Zeichnungen und Unterlagen“.",
      },
    ],
    commonApplications,
    imageAlt: `${copy.title}, ${threadDescription}, Schlauchinnendurchmesser ${tubingId}, ${material}, ${color} (${model})`,
  };
}
