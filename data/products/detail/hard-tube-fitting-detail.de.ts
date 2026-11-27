const familyNames = {
  standardFlat: "Gerändeltes Flachboden-Fitting in Standardbaugröße",
  compactFlat: "Kompaktes Flachboden-Fitting",
  standardFerrule: "Gerändeltes Fitting mit Klemmkonus in Standardbaugröße",
  compactFerrule: "Kompaktes Fitting mit Klemmkonus",
  PNC: "Hochdruck-Fitting in Standardbaugröße",
  PNC6: "Kompaktes Hochdruck-Fitting",
  PNF: "Hochdruck-Fitting-Satz mit Klemmkonus",
  PU: "Gerader Hochdruckverbinder mit Innengewinde",
  PUT: "Hochdruck-T-Verbinder mit Innengewinde",
  HBL: "Gerändelter Gewindestopfen in Standardbaugröße",
  HBL6: "Kompakter Gewindestopfen",
  HBL6X: "Gewindestopfen in Madenschraubenform",
} as const;

type FittingFamily = keyof typeof familyNames;
type ReviewedModel = readonly [
  family: FittingFamily, model: string, thread: string, material: string,
  dimension?: string, pressure?: string,
];

// Reviewed against the published detail catalogue and its active English prose.
// The publication list may grow before a corresponding German review is ready.
const reviewedModels: readonly ReviewedModel[] = [
  ["HBL", "HBL-M6-PV-B", "M6×1", "PVDF"],
  ["HBL", "HBL-M6-PV-N", "M6×1", "PVDF"],
  ["HBL", "HBL-U28-PV-B", "1/4-28 UNF", "PVDF"],
  ["HBL", "HBL-U28-PV-N", "1/4-28 UNF", "PVDF"],
  ["HBL6", "HBL6-M6-PS-B", "M6×1", "PPS"],
  ["HBL6", "HBL6-U28-PS-B", "1/4-28 UNF", "PPS"],
  ["HBL6X", "HBL6X-M6-PV-N", "M6×1", "PVDF"],
  ["HBL6X", "HBL6X-U28-PV-N", "1/4-28 UNF", "PVDF"],
  ["standardFlat", "HF-M6-20-PK-N", "M6×1", "PEEK", "1.6–2.0 mm"],
  ["standardFlat", "HF-M6-20-PS-B", "M6×1", "PPS", "1.6–2.0 mm"],
  ["standardFlat", "HF-M6-20-PV-N", "M6×1", "PVDF", "1.6–2.0 mm"],
  ["standardFlat", "HF-M6-25-PK-N", "M6×1", "PEEK", "2.5 mm"],
  ["standardFlat", "HF-M6-25-PS-B", "M6×1", "PPS", "2.5 mm"],
  ["standardFlat", "HF-M6-25-PV-N", "M6×1", "PVDF", "2.5 mm"],
  ["standardFlat", "HF-M6-32-PK-N", "M6×1", "PEEK", "3.2 mm"],
  ["standardFlat", "HF-M6-32-PS-B", "M6×1", "PPS", "3.2 mm"],
  ["standardFlat", "HF-M6-32-PV-N", "M6×1", "PVDF", "3.2 mm"],
  ["standardFlat", "HF-U28-20-PK-N", "1/4-28 UNF", "PEEK", "1.6–2.0 mm"],
  ["standardFlat", "HF-U28-20-PS-B", "1/4-28 UNF", "PPS", "1.6–2.0 mm"],
  ["standardFlat", "HF-U28-20-PV-N", "1/4-28 UNF", "PVDF", "1.6–2.0 mm"],
  ["standardFlat", "HF-U28-25-PK-N", "1/4-28 UNF", "PEEK", "2.5 mm"],
  ["standardFlat", "HF-U28-25-PS-B", "1/4-28 UNF", "PPS", "2.5 mm"],
  ["standardFlat", "HF-U28-25-PV-N", "1/4-28 UNF", "PVDF", "2.5 mm"],
  ["standardFlat", "HF-U28-32-PK-N", "1/4-28 UNF", "PEEK", "3.2 mm"],
  ["standardFlat", "HF-U28-32-PS-B", "1/4-28 UNF", "PPS", "3.2 mm"],
  ["standardFlat", "HF-U28-32-PV-N", "1/4-28 UNF", "PVDF", "3.2 mm"],
  ["compactFlat", "HF6-M6-20-PK-N", "M6×1", "PEEK", "1.6–2.0 mm"],
  ["compactFlat", "HF6-M6-20-PS-B", "M6×1", "PPS", "1.6–2.0 mm"],
  ["compactFlat", "HF6-M6-20-PV-N", "M6×1", "PVDF", "1.6–2.0 mm"],
  ["compactFlat", "HF6-M6-25-PK-N", "M6×1", "PEEK", "2.5 mm"],
  ["compactFlat", "HF6-M6-25-PS-B", "M6×1", "PPS", "2.5 mm"],
  ["compactFlat", "HF6-M6-25-PV-N", "M6×1", "PVDF", "2.5 mm"],
  ["compactFlat", "HF6-M6-32-PK-N", "M6×1", "PEEK", "3.2 mm"],
  ["compactFlat", "HF6-M6-32-PS-B", "M6×1", "PPS", "3.2 mm"],
  ["compactFlat", "HF6-M6-32-PV-N", "M6×1", "PVDF", "3.2 mm"],
  ["compactFlat", "HF6-U28-20-PK-N", "1/4-28 UNF", "PEEK", "1.6–2.0 mm"],
  ["compactFlat", "HF6-U28-20-PS-B", "1/4-28 UNF", "PPS", "1.6–2.0 mm"],
  ["compactFlat", "HF6-U28-20-PV-N", "1/4-28 UNF", "PVDF", "1.6–2.0 mm"],
  ["compactFlat", "HF6-U28-25-PK-N", "1/4-28 UNF", "PEEK", "2.5 mm"],
  ["compactFlat", "HF6-U28-25-PS-B", "1/4-28 UNF", "PPS", "2.5 mm"],
  ["compactFlat", "HF6-U28-25-PV-N", "1/4-28 UNF", "PVDF", "2.5 mm"],
  ["compactFlat", "HF6-U28-32-PK-N", "1/4-28 UNF", "PEEK", "3.2 mm"],
  ["compactFlat", "HF6-U28-32-PS-B", "1/4-28 UNF", "PPS", "3.2 mm"],
  ["compactFlat", "HF6-U28-32-PV-N", "1/4-28 UNF", "PVDF", "3.2 mm"],
  ["standardFlat", "HFL-M6-16-PV-B", "M6×1", "PVDF", "1.6 mm"],
  ["standardFlat", "HFL-M6-16-PV-N", "M6×1", "PVDF", "1.6 mm"],
  ["standardFlat", "HFL-M6-20-PV-B", "M6×1", "PVDF", "2.0 mm"],
  ["standardFlat", "HFL-M6-20-PV-N", "M6×1", "PVDF", "2.0 mm"],
  ["standardFlat", "HFL-M6-25-PV-B", "M6×1", "PVDF", "2.5 mm"],
  ["standardFlat", "HFL-M6-25-PV-N", "M6×1", "PVDF", "2.5 mm"],
  ["standardFlat", "HFL-M6-30-PV-B", "M6×1", "PVDF", "3.0 mm"],
  ["standardFlat", "HFL-M6-30-PV-N", "M6×1", "PVDF", "3.0 mm"],
  ["standardFlat", "HFL-M6-32-PV-B", "M6×1", "PVDF", "3.2 mm"],
  ["standardFlat", "HFL-M6-32-PV-N", "M6×1", "PVDF", "3.2 mm"],
  ["standardFlat", "HFL-U28-16-PV-B", "1/4-28 UNF", "PVDF", "1.6 mm"],
  ["standardFlat", "HFL-U28-16-PV-N", "1/4-28 UNF", "PVDF", "1.6 mm"],
  ["standardFlat", "HFL-U28-20-PV-B", "1/4-28 UNF", "PVDF", "2.0 mm"],
  ["standardFlat", "HFL-U28-20-PV-N", "1/4-28 UNF", "PVDF", "2.0 mm"],
  ["standardFlat", "HFL-U28-25-PV-B", "1/4-28 UNF", "PVDF", "2.5 mm"],
  ["standardFlat", "HFL-U28-25-PV-N", "1/4-28 UNF", "PVDF", "2.5 mm"],
  ["standardFlat", "HFL-U28-30-PV-B", "1/4-28 UNF", "PVDF", "3.0 mm"],
  ["standardFlat", "HFL-U28-30-PV-N", "1/4-28 UNF", "PVDF", "3.0 mm"],
  ["standardFlat", "HFL-U28-32-PV-B", "1/4-28 UNF", "PVDF", "3.2 mm"],
  ["standardFlat", "HFL-U28-32-PV-N", "1/4-28 UNF", "PVDF", "3.2 mm"],
  ["compactFlat", "HFL6-M6-16-PS-B", "M6×1", "PPS", "1.6 mm"],
  ["compactFlat", "HFL6-M6-20-PS-B", "M6×1", "PPS", "2.0 mm"],
  ["compactFlat", "HFL6-M6-30-PS-B", "M6×1", "PPS", "3.0 mm"],
  ["compactFlat", "HFL6-M6-32-PS-B", "M6×1", "PPS", "3.2 mm"],
  ["compactFlat", "HFL6-U28-25-PS-B", "1/4-28 UNF", "PPS", "2.5 mm"],
  ["compactFlat", "HFL6-U28-30-PS-B", "1/4-28 UNF", "PPS", "3.0 mm"],
  ["compactFlat", "HFL6-U28-32-PS-B", "1/4-28 UNF", "PPS", "3.2 mm"],
  ["compactFlat", "HFL6-U40-16-PK-N", "6-40 UNF", "PEEK", "1.6 mm"],
  ["standardFerrule", "HN-M6-16-PK-N", "M6×1", "PEEK", "1.6 mm"],
  ["standardFerrule", "HN-M6-16-PV-N", "M6×1", "PVDF", "1.6 mm"],
  ["standardFerrule", "HN-M6-32-PK-N", "M6×1", "PEEK", "3.2 mm"],
  ["standardFerrule", "HN-M6-32-PV-N", "M6×1", "PVDF", "3.2 mm"],
  ["standardFerrule", "HN-U28-16-PK-N", "1/4-28 UNF", "PEEK", "1.6 mm"],
  ["standardFerrule", "HN-U28-16-PV-N", "1/4-28 UNF", "PVDF", "1.6 mm"],
  ["standardFerrule", "HN-U28-32-PK-N", "1/4-28 UNF", "PEEK", "3.2 mm"],
  ["standardFerrule", "HN-U28-32-PV-N", "1/4-28 UNF", "PVDF", "3.2 mm"],
  ["compactFerrule", "HN6-M6-16-PK-N", "M6×1", "PEEK", "1.6 mm"],
  ["compactFerrule", "HN6-M6-16-PV-N", "M6×1", "PVDF", "1.6 mm"],
  ["compactFerrule", "HN6-M6-32-PK-N", "M6×1", "PEEK", "3.2 mm"],
  ["compactFerrule", "HN6-U28-16-PK-N", "1/4-28 UNF", "PEEK", "1.6 mm"],
  ["compactFerrule", "HN6-U28-16-PV-N", "1/4-28 UNF", "PVDF", "1.6 mm"],
  ["standardFerrule", "HNF-M6-16-PV-B", "M6×1", "PVDF", "1.6 mm"],
  ["standardFerrule", "HNF-M6-16-PV-N", "M6×1", "PVDF", "1.6 mm"],
  ["standardFerrule", "HNF-M6-20-PV-B", "M6×1", "PVDF", "2.0 mm"],
  ["standardFerrule", "HNF-M6-20-PV-N", "M6×1", "PVDF", "2.0 mm"],
  ["standardFerrule", "HNF-M6-25-PV-B", "M6×1", "PVDF", "2.5 mm"],
  ["standardFerrule", "HNF-M6-25-PV-N", "M6×1", "PVDF", "2.5 mm"],
  ["standardFerrule", "HNF-M6-30-PV-B", "M6×1", "PVDF", "3.0 mm"],
  ["standardFerrule", "HNF-M6-30-PV-N", "M6×1", "PVDF", "3.0 mm"],
  ["standardFerrule", "HNF-M6-32-PV-B", "M6×1", "PVDF", "3.2 mm"],
  ["standardFerrule", "HNF-M6-32-PV-N", "M6×1", "PVDF", "3.2 mm"],
  ["standardFerrule", "HNF-U28-16-PV-B", "1/4-28 UNF", "PVDF", "1.6 mm"],
  ["standardFerrule", "HNF-U28-16-PV-N", "1/4-28 UNF", "PVDF", "1.6 mm"],
  ["standardFerrule", "HNF-U28-20-PV-B", "1/4-28 UNF", "PVDF", "2.0 mm"],
  ["standardFerrule", "HNF-U28-20-PV-N", "1/4-28 UNF", "PVDF", "2.0 mm"],
  ["standardFerrule", "HNF-U28-25-PV-B", "1/4-28 UNF", "PVDF", "2.5 mm"],
  ["standardFerrule", "HNF-U28-25-PV-N", "1/4-28 UNF", "PVDF", "2.5 mm"],
  ["standardFerrule", "HNF-U28-30-PV-B", "1/4-28 UNF", "PVDF", "3.0 mm"],
  ["standardFerrule", "HNF-U28-30-PV-N", "1/4-28 UNF", "PVDF", "3.0 mm"],
  ["standardFerrule", "HNF-U28-32-PV-B", "1/4-28 UNF", "PVDF", "3.2 mm"],
  ["standardFerrule", "HNF-U28-32-PV-N", "1/4-28 UNF", "PVDF", "3.2 mm"],
  ["compactFerrule", "HNF6-M6-16-PS-B", "M6×1", "PPS", "1.6 mm"],
  ["compactFerrule", "HNF6-M6-20-PS-B", "M6×1", "PPS", "2.0 mm"],
  ["compactFerrule", "HNF6-M6-25-PS-B", "M6×1", "PPS", "2.5 mm"],
  ["compactFerrule", "HNF6-M6-30-PS-B", "M6×1", "PPS", "3.0 mm"],
  ["compactFerrule", "HNF6-M6-32-PS-B", "M6×1", "PPS", "3.2 mm"],
  ["compactFerrule", "HNF6-U28-25-PS-B", "1/4-28 UNF", "PPS", "2.5 mm"],
  ["compactFerrule", "HNF6-U28-30-PS-B", "1/4-28 UNF", "PPS", "3.0 mm"],
  ["compactFerrule", "HNF6-U28-32-PS-B", "1/4-28 UNF", "PPS", "3.2 mm"],
  ["PNC", "PNC-U32-16-PK-N", "10-32 UNF", "PEEK", "1.6 mm", "25 MPa"],
  ["PNC6", "PNC6-U32-16-PK-N", "10-32 UNF", "PEEK", "1.6 mm", "25 MPa"],
  ["PNF", "PNF-U32-16-SS-N", "10-32 UNF", "SUS", "1.6 mm", "25 MPa"],
  ["PU", "PU-U32-08-SS-N", "10-32 UNF", "SUS", "0.8 mm", "25 MPa"],
  ["PU", "PU-U32-U28-08-SS-N", "10-32 UNF / 1/4-28 UNF", "SUS", "0.8 mm", "25 MPa"],
  ["PUT", "PUT-U32-05-SS-N", "10-32 UNF", "SUS", "0.5 mm", "25 MPa"],
];

const reviewedModelBySlug = new Map(reviewedModels.map(row => [row[1].toLowerCase(), row]));

export const germanHardTubeFittingSlugs = [...reviewedModelBySlug.keys()];

export const germanHardTubePlugText = {
  fields: ["Modell", "Bestellnummer", "Baureihe", "Gewinde", "Grundkörperwerkstoff", "Farbe", "Teilenummer"],
  coding: "Vierteiliger Modellcode",
  meaning: "Bedeutung",
  selection: "Auswahl und Montage",
  port: "Passenden Anschluss prüfen",
  portText: "Wählen Sie M6×1 oder 1/4-28 UNF zusammen mit der passenden Dichtgeometrie. Prüfen Sie auch bei übereinstimmenden Gewinden die Anschlusstiefe, die Dichtflächen und die wirksame Einschraublänge. Der Leitungsaußendurchmesser eines Durchgangsfittings ist für die Auswahl des Stopfens nicht maßgeblich.",
  space: "Montageraum vorsehen",
  spaceText: "HBL ist der Gewindestopfen in Standardbaugröße. HBL6 hat einen schmaleren Griffbereich. HBL6X hat einen Schraubenkörper mit Schlitz. Prüfen Sie die Zeichnung des jeweiligen Modells und den Platz für das Werkzeug. Die Baureihenbezeichnung allein gibt die Gesamtlänge nicht vor.",
  medium: "Medienkontakt prüfen",
  mediumText: "Prüfen Sie die Eignung von PVDF oder PPS für Betriebs- und Reinigungsmedien anhand von Konzentration, Temperatur und Kontaktzeit. Berücksichtigen Sie dabei auch den Anschluss und alle weiteren medienberührten Bauteile. Klären Sie den zulässigen Druck und das Anziehdrehmoment für die konkrete Montage und deren Betriebsbedingungen.",
  installation: "Ein- und Ausbau",
  steps: [
    "Unterbrechen Sie die Flüssigkeitszufuhr und lassen Sie den Druck ab. Entfernen Sie Restflüssigkeit und prüfen Sie, ob Gewinde und Dichtflächen sauber und unbeschädigt sind.",
    "Richten Sie den Stopfen am passenden Anschluss aus. Prüfen Sie den leichtgängigen Gewindeeingriff und ziehen Sie den Stopfen nach den Vorgaben des Modells an. Vermeiden Sie Verkanten und Überdrehen.",
    "Prüfen Sie die Abdichtung nach dem Wiederanlauf. Kontrollieren Sie vor einer erneuten Montage, ob Verschleiß oder Verformungen vorliegen, und ersetzen Sie beschädigte Bauteile.",
  ],
  validation: "Unter Betriebsbedingungen prüfen",
  validationText: "Berücksichtigen Sie das tatsächliche Medium, die Temperatur, den Druck sowie Anlauf und Stillstand des Geräts. Bei Undichtigkeit halten Sie das Gerät an und lassen den Druck ab. Prüfen Sie Gegenanschluss, Dichtung und Bauteile, montieren Sie erneut und prüfen Sie die Abdichtung.",
  allProducts: "Modelle für starre Leitungen ansehen",
  drawing: "2D-Zeichnung dieses Modells ansehen",
  request: "Stopfen und Gegenanschluss abstimmen",
  requestText: "Fügen Sie das Modell Ihrer Merkliste hinzu und geben Sie die Anschlusszeichnung, das Medium, die Temperatur, den Druck und die Wartungsanforderungen an. So kann unser technisches Team die Passung prüfen.",
  contact: "Technisches Team kontaktieren",
  image: "Produktdarstellung",
  colors: ["Naturfarben", "Schwarz"],
} as const;

const plugFaqs = [
  {
    question: "Muss ich für diesen Gewindestopfen einen Leitungsaußendurchmesser auswählen?",
    answer: "Wählen Sie das Gewinde und die passende Dichtgeometrie. Ein Stopfen verschließt den Flüssigkeitspfad. Die Auswahlregeln für Leitungsaußendurchmesser und Klemmkonus eines Durchgangsfittings gelten dafür nicht.",
  },
  {
    question: "Reicht ein passendes Gewinde für die Austauschbarkeit aus?",
    answer: "Prüfen Sie außerdem die Dichtgeometrie des Gegenanschlusses, dessen Tiefe und die wirksame Einschraublänge. Ein passendes Gewinde allein bestätigt die Kompatibilität der Baugruppe nicht.",
  },
  {
    question: "Kann ich den Druckwert oder das Drehmoment eines anderen Fittings übernehmen?",
    answer: "Bestimmen Sie diese Werte für das konkrete Modell, den Gegenanschluss, die Werkstoffe und die Betriebsbedingungen. Übernehmen Sie den Druckwert oder das Anziehdrehmoment einer anderen Baureihe nicht.",
  },
] as const;

const standardBody = {
  standardFlat: "ein gerändeltes Flachboden-Fitting in Standardbaugröße",
  compactFlat: "ein kompaktes Flachboden-Fitting",
  standardFerrule: "ein gerändeltes Fitting mit Klemmkonus in Standardbaugröße",
  compactFerrule: "ein kompaktes Fitting mit Klemmkonus",
} as const;

const highPressureBody = {
  PNC: "ein Hochdruck-Fitting in Standardbaugröße",
  PNC6: "ein kompaktes Hochdruck-Fitting",
  PNF: "ein Hochdruck-Fitting-Satz mit Klemmkonus",
} as const;

const plugBody = {
  HBL: "ein gerändelter Gewindestopfen in Standardbaugröße",
  HBL6: "ein kompakter Gewindestopfen",
  HBL6X: "ein Gewindestopfen in Madenschraubenform mit Schlitz",
} as const;

function drawingFaq(
  model: string,
  answer = "Ja. Fügen Sie das Modell Ihrer Merkliste hinzu und vermerken Sie den Zeichnungswunsch. Unser technisches Team prüft, welche Ausführung passt, und stellt die passende Zeichnung bereit.",
) {
  return {
    question: `Kann ich eine 2D-Zeichnung für ${model} anfordern?`,
    answer,
  };
}

export function getGermanHardTubeFittingContent(slug: string) {
  const row = reviewedModelBySlug.get(slug.trim().toLowerCase());
  if (!row) return;
  const [family, model, thread, material, dimension, pressure] = row;

  const title = model === "HFL6-U40-16-PK-N"
    ? "Kompaktes Flachboden-Fitting mit 6-40 UNF"
    : familyNames[family];
  const imageAlt = `${model} ${title} – ${material}`;

  if (family === "HBL" || family === "HBL6" || family === "HBL6X") {
    const copy = germanHardTubePlugText;
    return {
      title,
      description: `${model} ist ${plugBody[family]} aus ${material} mit ${thread}-Gewinde zum Verschließen eines passenden Fluidikanschlusses oder Fittings. Prüfen Sie bei der Auswahl die Dichtgeometrie des Gegenanschlusses, die wirksame Einschraublänge und die Einbautiefe gemeinsam.`,
      faqs: plugFaqs,
      imageAlt,
      bottomCta: { title: copy.request, description: copy.requestText, buttonText: copy.contact, href: "/de/contact/" },
    };
  }

  if (family === "PU" || family === "PUT") {
    const body = family === "PU"
      ? "ein gerader Hochdruckverbinder mit Innengewinde"
      : "ein Hochdruck-T-Verbinder mit Innengewinde";
    return {
      title,
      description: `${model} ist ${body} aus Edelstahl (SUS) mit einem Nenndruck von ${pressure}. Die Gewindegröße ist ${thread}. Der Innendurchmesser des Strömungskanals beträgt ${dimension}. Der Verbinder dient zum Anschließen von Flüssigkeitsleitungen in mikrofluidischen Hochdruckkreisläufen, Analysegeräten, IVD-Geräten und der Laborautomatisierung.`,
      faqs: [
        { question: `Welchen Nenndruck hat ${model}?`, answer: `Der Nenndruck beträgt ${pressure}. Prüfen Sie für den tatsächlichen Betrieb den Sicherheitsabstand unter Berücksichtigung des Mediums, der Temperatur, der Leitungsführung und möglicher Druckschwankungen.` },
        { question: `Welche Gewindegröße hat ${model}?`, answer: `Die Gewindegröße ist ${thread}. Prüfen Sie vor der Montage, ob Gewindegröße und Dichtgeometrie zum Geräteanschluss passen.` },
        { question: `Welchen Innendurchmesser hat der Strömungskanal von ${model}?`, answer: `Der Innendurchmesser des Strömungskanals beträgt ${dimension}. Er beeinflusst den Druckverlust, die Strömungsgeschwindigkeit und das Totvolumen im System.` },
        { question: "Wie lässt sich die Medienverträglichkeit von Edelstahl prüfen?", answer: "Prüfen Sie die Verträglichkeit von Edelstahl anhand des Mediums, seiner Konzentration, der Betriebstemperatur, der Kontaktzeit und des Reinigungsverfahrens." },
        drawingFaq(model, "Fügen Sie das Modell Ihrer Merkliste hinzu und vermerken Sie den Zeichnungswunsch. Unser technisches Team bestätigt die passende Zeichnungsversion."),
      ],
      imageAlt,
    };
  }

  let description: string;
  let installationName: string;
  if (family === "PNC" || family === "PNC6" || family === "PNF") {
    description = `${model} ist ${highPressureBody[family]} für starre Leitungen mit ${dimension} Außendurchmesser. Das Fitting hat ein ${thread}-Gewinde, einen Grundkörper aus ${material} und einen Nenndruck von ${pressure}. Es dient zum Anschließen starrer Leitungen unter Hochdruck in Analysegeräten und Systemen der Laborautomatisierung.`;
    installationName = "eines Hochdruck-Fittings";
  } else {
    const isFlat = family === "standardFlat" || family === "compactFlat";
    const sealing = isFlat ? "Eine Flanschdichtung dichtet am Anschlussboden ab." : "Die Abdichtung erfolgt über einen Klemmkonus.";
    description = `${model} ist ${standardBody[family]} für starre Leitungen mit ${dimension} Außendurchmesser. Es hat ein ${thread}-Gewinde und einen Grundkörper aus ${material}. ${sealing} Das Fitting dient zum Anschließen starrer Leitungen in mikrofluidischen Kreisläufen, IVD-Geräten, Analysegeräten und Systemen der Laborautomatisierung.`;
    installationName = family === "standardFlat" ? "des gerändelten Flachboden-Fittings"
      : family === "compactFlat" ? "des kompakten Flachboden-Fittings"
      : family === "standardFerrule" ? "des gerändelten Fittings mit Klemmkonus"
      : "des kompakten Fittings mit Klemmkonus";
  }

  return {
    title,
    description,
    faqs: [
      { question: `Für welchen Leitungsaußendurchmesser ist ${model} ausgelegt?`, answer: `Das Modell ist für starre Leitungen mit ${dimension} Außendurchmesser ausgelegt. Prüfen Sie bei der Auswahl auch die Toleranz des Außendurchmessers und wie das Leitungsende vorbereitet werden muss.` },
      { question: `Welches Gewinde hat ${model}?`, answer: `Das Modell verwendet ein ${thread}-Gewinde. Prüfen Sie vor der Montage, ob Gewinde und Dichtgeometrie des Geräteanschlusses zum Fitting passen.` },
      { question: `Wie lässt sich die Medienverträglichkeit von ${material} prüfen?`, answer: `Prüfen Sie die Verträglichkeit von ${material} anhand des Mediums, seiner Konzentration, der Temperatur, der Kontaktzeit und des Reinigungsverfahrens.` },
      { question: `Was ist bei der Montage ${installationName} zu beachten?`, answer: "Prüfen Sie vor der Montage, ob Leitungsende, Gewinde, Dichtungen und Anschlussfläche sauber und unbeschädigt sind. Ziehen Sie das Fitting nicht zu fest an." },
      drawingFaq(model),
    ],
    imageAlt,
  };
}
