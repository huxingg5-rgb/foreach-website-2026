import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/seo/site-url";
import { getTubingAssemblySelectionContent, type TubingAssemblySelectionContent, type TubingAssemblyUi } from "./localized";

export const germanTubingAssemblyUi: TubingAssemblyUi = {
  home: "Startseite",
  products: "Produkte",
  category: "Konfektionierte Schlauch- und Kapillarleitungen",
  pumps: "Pumpen",
  valves: "Ventile",
  probes: "Sonden, Kanülen und Rührpaddel",
  fittings: "Fluidik-Fittings und Leitungszubehör",
  tubing: "Schläuche und Kapillaren",
  control: "Sensor- und Detektionsmodule",
  productType: "Produkttyp",
  product: "Produkte",
  searchPlaceholder: "Produkt, Serie, Werkstoff, Gewinde oder Stichwort suchen",
  search: "Suchen",
  currentCategory: "Aktuelle Kategorie: ",
  showLess: "Weniger anzeigen",
  showMore: "Mehr anzeigen",
  noFilters: "Keine Filter verfügbar.",
  clearFilters: "Filter zurücksetzen",
  emptyTitle: "Keine passenden Produkte",
  emptyDescription: "Ändern Sie den Suchbegriff oder setzen Sie die Filter zurück, um alle Schlauchbaugruppen anzuzeigen.",
  details: "Details ansehen",
  added: "Hinzugefügt",
  addToList: "Zur Liste hinzufügen",
  parameters: "Baugruppenparameter",
  materialOd: "Werkstoff / Schlauch-Außendurchmesser (mm)",
  od: "Schlauch-Außendurchmesser (mm)",
  id: "Passender Schlauch-Innendurchmesser (mm)",
};

const certification = "FOREACH ist nach ISO 9001 und ISO 13485 für sein Qualitätsmanagementsystem zertifiziert.";

const overview = {
  title: "Kundenspezifisch konfektionierte Schlauchleitungen für Instrumente",
  paragraphs: [
    "FOREACH liefert kundenspezifische Schlauchkonfektionen mit gebördelten Enden, Klemmring-Dichtsätzen und Klemmkonus-Sätzen für Flüssigkeitsanschlüsse in der In-vitro-Diagnostik und in automatisierten Analysegeräten. Wir unterstützen Geräteentwicklung, Montage nach Zeichnung und Serienfertigung.",
    "Je nach Anschlussart stehen Schläuche aus FEP, PTFE, PFA oder schwarzem PTFE mit passenden Fittings zur Auswahl. Fittings für gebördelte Schläuche sind in Standard- und Kompaktbauform aus PPS, PVDF und PEEK erhältlich. Zu den Gewinden gehören M6×1 und 1/4-28 UNF. Für gebördelte Schläuche und Klemmring-Dichtsätze sind Miniaturkonfigurationen mit 6-40 UNF, PEEK-Fittings und 1.6 mm Schlauch-Außendurchmesser erhältlich. Die Außendurchmesser betragen 1.6, 2.0, 2.5, 3.0 oder 3.2 mm. Bei FEP reichen die Innendurchmesser in den für den jeweiligen Anschluss vorgesehenen Kombinationen von 0.3–2.0 mm. Legen Sie die Länge fest und wählen Sie ein- oder beidseitig gebördelte Enden oder gewendelte Schläuche. Werkstoff, Gewinde und Anschlussart lassen sich für Seite A und B separat festlegen. Schutzschläuche, Anschlaghülsen und Kennzeichnungen richten sich nach Leitungsführung, Einbauraum, Lichtschutz und Werkstoffverträglichkeit.",
    certification,
  ],
};

const intros: TubingAssemblySelectionContent["intros"] = {
  "flanged-tubing": {
    title: "Kundenspezifische Schlauchkonfektionen mit gebördelten Enden",
    paragraphs: [
      "FOREACH liefert Schlauchkonfektionen mit ein- oder beidseitig gebördelten Enden für Fluidikanschlüsse mit flachem Dichtgrund in der In-vitro-Diagnostik und in automatisierten Analysegeräten. Das gebördelte Schlauchende, das passende Fitting und die Dichtscheibe bilden eine Stirnflächendichtung. Wir unterstützen Geräteentwicklung, Montage nach Zeichnung und Serienfertigung.",
      "Wählen Sie FEP, PTFE oder PFA passend zum Bördelverfahren und Gegenanschluss. Fittings aus PPS, PVDF und PEEK sind in Standard- und Kompaktbauform mit den Gewinden M6×1 und 1/4-28 UNF erhältlich. Bestimmte Miniaturkonfigurationen unterstützen 6-40 UNF. Die Schlauch-Außendurchmesser betragen 1.6, 2.0, 2.5, 3.0 oder 3.2 mm. Bei FEP liegen die Innendurchmesser in den vorgegebenen Kombinationen bei 0.3–2.0 mm. Die Dichtscheiben aus SUS, PEEK oder PTFE werden modellabhängig ausgewählt. Länge, Fittings an Seite A und B, Wendeln, Schutzschläuche, Anschlaghülsen und Kennzeichnungen sind spezifizierbar.",
      certification,
    ],
  },
  "retaining-ring-kits": {
    title: "Kundenspezifische Schlauchkonfektionen mit Klemmring-Dichtsätzen",
    paragraphs: [
      "FOREACH kombiniert für die In-vitro-Diagnostik und automatisierte Analysegeräte passende Fittings, Klemmringe, Dichtkonen und Schläuche. Klemmring und Dichtkonus fixieren das Schlauchende und dichten es ab. Wir unterstützen Geräteentwicklung, Montage nach Zeichnung und Serienfertigung.",
      "Beide Klemmring-Ausführungen, 6-40 UNF und HSF6, sind mit FEP, PTFE, PFA oder schwarzem PTFE kombinierbar, auch mit Wendeln und Schutzschläuchen. Bei der 6-40 UNF-Konfiguration kommen ein PEEK-Fitting und ein Schlauch mit 1.6 mm Außendurchmesser zum Einsatz. HSF6 ist je nach Ausführung mit M6×1 oder 1/4-28 UNF und mit Schlauch-Außendurchmessern von 1.6, 2.0, 2.5, 3.0 oder 3.2 mm erhältlich. Klemmringe und Dichtkonen aus SUS oder PEEK werden nach Modell kombiniert. Die Innen- und Außendurchmesser sind als angegebene Paare zu wählen. Geben Sie Länge, Anschlüsse an Seite A und B, Anschlaghülsen und Kennzeichnung an.",
      certification,
    ],
  },
  "ferrule-kits": {
    title: "Kundenspezifische Schlauchkonfektionen mit Klemmkonus-Sätzen",
    paragraphs: [
      "FOREACH kombiniert passende Fittings, Klemmkonen und Schläuche für Flüssigkeitsanschlüsse in der In-vitro-Diagnostik und in automatisierten Analysegeräten. Die Schlauchenden müssen nicht vorgebördelt werden. Das Fitting presst den Klemmkonus zusammen und fixiert und dichtet so den Schlauch ab. Wir unterstützen Geräteentwicklung, Montage nach Zeichnung und Serienfertigung.",
      "Wählen Sie FEP, PTFE oder PFA passend zur Bauform des Klemmkonus. Je nach Baureihe sind die Fittings aus PPS, PVDF, PEEK, POM oder PP und die Klemmkonen aus PP oder ETFE erhältlich. Standard- und Kompaktbauformen passen zu Anschlüssen mit flachem Dichtgrund und M6×1- oder 1/4-28 UNF-Gewinde. Die Schlauch-Außendurchmesser betragen 1.6, 2.0, 2.5, 3.0 oder 3.2 mm. Bei FEP liegen die Innendurchmesser in den angegebenen Kombinationen bei 0.3–2.0 mm. Geben Sie Länge, A/B-Anschlüsse, Wendeln, Schutzschläuche, Anschlaghülsen und Kennzeichnung an. Stimmen Sie die Klemmkonen auf den Schlauch-Außendurchmesser ab und beachten Sie Einbaurichtung und Anzugsdrehmoment.",
      certification,
    ],
  },
};

const typeNames: TubingAssemblySelectionContent["typeNames"] = {
  "flanged-tubing": "Schlauchkonfektionen mit Bördelenden",
  "retaining-ring-kits": "Schlauchkonfektionen mit Klemmring",
  "ferrule-kits": "Schlauchkonfektionen mit Klemmkonus",
};

const introAlts: Record<keyof typeof intros, string> = {
  "flanged-tubing": "Schlauchkonfektionen mit gebördelten Enden und schwarzen und naturfarbenen Fittings an transparenten Schläuchen vor weißem Hintergrund",
  "retaining-ring-kits": "Schlauchkonfektionen mit naturfarbenen PEEK-Fittings, schwarzen Fittings, metallischen Klemmringen und Dichtkonen vor weißem Hintergrund",
  "ferrule-kits": "Schlauchkonfektion mit schwarzem Schlauch, schwarzem Fitting und Dichtteilen am Schlauchende",
};

const cardCopy: Record<string, readonly [title: string, description: string, alt: string]> = {
  "tubing-assembly-fep-flanged": [
    "FEP-Schlauchkonfektion mit Bördelenden",
    "Transparenter FEP-Schlauch mit Innendurchmesser 0.3–2.0 mm als Richtwert und aufeinander abgestimmten Innen- und Außendurchmessern. Ein- oder beidseitig gebördelte Enden, Schlauchlänge und A/B-Anschlüsse lassen sich spezifizieren.",
    "FEP-Schlauchkonfektion mit transparentem Bördelende, schwarzem Gewindefitting und passender Dichtscheibe in Explosionsdarstellung",
  ],
  "tubing-assembly-ptfe-flanged": [
    "PTFE-Schlauchkonfektion mit Bördelenden",
    "Naturfarbener PTFE-Schlauch mit Innendurchmesser 0.5–2.0 mm als Richtwert und passenden Innen- und Außendurchmesser-Kombinationen. Ein- oder beidseitig gebördelte Enden, Schlauchlänge und A/B-Anschlüsse lassen sich spezifizieren.",
    "Anschlussbeispiel für gebördelte Schläuche. Schlauch und Zubehör richten sich nach der gewählten Konfiguration.",
  ],
  "tubing-assembly-pfa-flanged": [
    "PFA-Schlauchkonfektion mit Bördelenden",
    "PFA-Schlauch mit 1.6 mm Außendurchmesser und 0.5, 0.8 oder 1.0 mm Innendurchmesser als Richtwert. Schlauchlänge und Endanschlüsse sind spezifizierbar. Bördel und Gegenanschluss werden anhand der Zeichnung bestätigt.",
    "PFA-Schlauchkonfektion mit transparentem Bördelende, durchscheinendem Gewindefitting und metallischer Stützscheibe",
  ],
  "tubing-assembly-black-ptfe-flanged": [
    "Schwarze PTFE-Schlauchkonfektion mit Bördelenden",
    "Schwarzer PTFE-Schlauch mit Innendurchmesser 0.8–2.0 mm als Richtwert sowie kundenspezifischer Länge und Endanschlüssen. Der Lichtschutz wird anhand der für das Reagenz relevanten Wellenlängen und des erforderlichen Abschirmgrads bewertet.",
    "Schrägansicht einer schwarzen PTFE-Schlauchkonfektion mit schwarzem Gewindefitting, Bördelende und metallischer Stützscheibe",
  ],
  "tubing-assembly-retaining-ring-fep": [
    "FEP-Schlauchkonfektion mit Klemmring",
    "Transparenter FEP-Schlauch mit passendem Klemmring und Dichtkonus. Geben Sie Innen- und Außendurchmesser, Länge und Anschlüsse an A/B an.",
    "FEP-Schlauchkonfektion mit transparentem Schlauch, beigefarbenem Gewindefitting, Metallklemmring und Dichtkonus",
  ],
  "tubing-assembly-retaining-ring-ptfe": [
    "PTFE-Schlauchkonfektion mit Klemmring",
    "Naturfarbener PTFE-Schlauch mit passendem Klemmring und Dichtkonus. Geben Sie Innen- und Außendurchmesser, Länge und Anschlüsse an A/B an.",
    "Anschlussbeispiel für einen Klemmring-Dichtsatz. Schlauch und Zubehör richten sich nach der gewählten Konfiguration.",
  ],
  "tubing-assembly-retaining-ring-pfa": [
    "PFA-Schlauchkonfektion mit Klemmring",
    "PFA-Schlauch mit passendem Klemmring und Dichtkonus. Schlauchmaße, Länge und Endanschlüsse sind spezifizierbar. Maße und Gegenanschlüsse werden anhand der Zeichnung bestätigt.",
    "PFA-Schlauchkonfektion mit transparentem Schlauch, beigefarbenem Gewindefitting, Metallklemmring und Dichtkonus",
  ],
  "tubing-assembly-retaining-ring-black-ptfe": [
    "Schwarze PTFE-Schlauchkonfektion mit Klemmring",
    "Schwarzer PTFE-Schlauch mit Klemmring-Anschlüssen sowie kundenspezifischen Maßen, Längen und Enden. Der Lichtschutz wird anhand der für das Reagenz relevanten Wellenlängen und des erforderlichen Abschirmgrads bewertet.",
    "Schwarze PTFE-Schlauchkonfektion mit schwarzem Schlauch, beigefarbenem Gewindefitting, Metallklemmring und Dichtkonus",
  ],
  "tubing-assembly-fep-ferrule": [
    "FEP-Schlauchkonfektion mit Klemmkonus",
    "Transparenter FEP-Schlauch mit Klemmkonus-Anschlüssen ohne vorheriges Bördeln. Außendurchmesser: 1.6, 2.0, 2.5, 3.0 oder 3.2 mm. Geben Sie Innendurchmesser, Länge und A/B-Anschlüsse an.",
    "FEP-Schlauchkonfektion mit transparentem Schlauch, schwarzem Gewindefitting und durchscheinendem Klemmkonus",
  ],
  "tubing-assembly-ptfe-ferrule": [
    "PTFE-Schlauchkonfektion mit Klemmkonus",
    "Naturfarbener PTFE-Schlauch mit Klemmkonus-Anschlüssen. Außendurchmesser: 1.6, 2.0, 2.5, 3.0 oder 3.2 mm. Geben Sie Innendurchmesser, Länge und Enden an und stimmen Sie die Werkstoffe auf Betriebs- und Reinigungsmedien ab.",
    "Schräge Vorderansicht einer PTFE-Schlauchkonfektion mit durchscheinendem weißem Gewindefitting, vorderem Klemmkonus und naturfarbenem PTFE-Schlauch",
  ],
  "tubing-assembly-pfa-ferrule": [
    "PFA-Schlauchkonfektion mit Klemmkonus",
    "PFA-Schlauch mit Klemmkonus-Anschlüssen ohne vorheriges Bördeln. Geben Sie Länge und Endanschlüsse an. Schlauchmaße, Klemmkonen und Gegenanschlüsse werden anhand der Zeichnungen und Betriebsbedingungen bestätigt.",
    "Seitenansicht einer PFA-Schlauchkonfektion mit durchscheinendem Gewindefitting, vorderem Klemmkonus und transparentem Schlauchanschluss",
  ],
  "tubing-assembly-black-ptfe-ferrule": [
    "Schwarze PTFE-Schlauchkonfektion mit Klemmkonus",
    "Schwarzer PTFE-Schlauch mit Klemmkonus-Anschlüssen und kundenspezifischen Maßen, Längen, Enden und Kennzeichnung. Der Lichtschutz wird anhand der für das Reagenz relevanten Wellenlängen und des erforderlichen Abschirmgrads bewertet.",
    "Schräge Vorderansicht einer schwarzen PTFE-Schlauchkonfektion mit Klemmkonusbohrung, schwarzem Gewindefitting und Schlauchanschluss",
  ],
};

export function getGermanTubingAssemblySelectionContent(): TubingAssemblySelectionContent {
  const english = getTubingAssemblySelectionContent("en");
  const introImages = { ...english.introImages };
  for (const type of Object.keys(introAlts) as (keyof typeof introAlts)[]) {
    const image = introImages[type];
    if (image) introImages[type] = { ...image, alt: introAlts[type] };
  }
  return {
    ...english,
    ui: germanTubingAssemblyUi,
    typeNames,
    overview,
    intros,
    introImages,
    cards: english.cards.map(card => {
      const copy = cardCopy[card.productId];
      if (!copy) return card;
      const [cardTitle, cardSubtitle, imageAlt] = copy;
      return {
        ...card,
        cardTitle,
        cardSubtitle,
        imageAlt,
        imageCaption: card.imageCaption === "Connection structure reference image" ? "Beispielabbildung der Anschlusskonstruktion" : card.imageCaption,
      };
    }),
  };
}

export function getGermanTubingAssemblyMetadata(type?: keyof typeof intros): Metadata {
  const intro = type ? intros[type] : overview;
  const path = "/de/products/tubing-assemblies/" + (type ? type + "/" : "");
  const url = getCanonicalUrl(path);
  const title = intro.title + " | FOREACH";
  const description = intro.paragraphs[0];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: { title, description, url, type: "website", locale: "de_DE" },
  };
}
