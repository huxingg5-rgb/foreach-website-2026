import { germanCvKvCopy } from "@/data/resources/technical-articles/cv-kv-microfluidics.de";
import { getTechnicalArticlesPageData } from "./getTechnicalArticlesPageData";
import { germanGeneralArticleCards } from "@/data/resources/technical-articles/technical-article-cards.de";
import { germanPumpArticleCards } from "@/data/resources/technical-articles/technical-article-cards.de.pumps";
import { germanTechnicalArticleSlugs } from "@/data/resources/technical-articles/technical-article-slugs.de";
import { getGermanTechnicalArticleCopy } from "./getGermanTechnicalArticleCopy";
import { samplingProbeSelectionSlug } from "@/data/resources/technical-articles/technical-article-availability";
import type { EngineeringArticleBlock } from "@/data/resources/technical-articles/diaphragm-pump-engineering-article.types";
import { pistonPumpCopyToArticle } from "@/data/resources/technical-articles/piston-pump-articles.types";
import type {
  ClassifiedTechnicalArticleItem,
  TechnicalArticlePrimaryCategory,
  TechnicalArticleSecondaryCategory,
  TechnicalArticlesPageData,
} from "@/data/resources/technical-articles/technical-articles.types";

export interface GermanTechnicalArticleCard extends ClassifiedTechnicalArticleItem {
  sourceLanguage?: "en";
}

export interface GermanTechnicalArticlesPageData extends Omit<TechnicalArticlesPageData, "locale" | "articles"> {
  locale: "de";
  articles: GermanTechnicalArticleCard[];
}

const cardCopy: Record<string, readonly [title: string, summary: string]> = {
  ...germanGeneralArticleCards,
  ...germanPumpArticleCards,
};

export function getGermanTechnicalArticleCardText(slug: string) {
  const copy = cardCopy[slug];
  return copy ? { title: copy[0], summary: copy[1] } : undefined;
}

const primaryLabels: Record<TechnicalArticlePrimaryCategory, string> = {
  pumps: "Pumpen",
  valves: "Ventile",
  "fittings-tubing": "Fittings und Leitungen",
  "fluid-detection-control": "Flüssigkeitsüberwachung und -steuerung",
  "general-fluidics": "Grundlagen der Fluidik",
  "applications-solutions": "Anwendungen und Lösungen",
};

const secondaryLabels: Record<TechnicalArticleSecondaryCategory, string> = {
  "miniature-diaphragm-pumps": "Miniatur-Membranpumpen",
  "plunger-pumps": "Kolbenpumpen",
  "valveless-metering-pump": "Ventillose Dosierpumpen",
  "syringe-pumps": "Spritzenpumpen",
  "pipetting-pumps": "Pipettierpumpen",
  "solenoid-valves": "Magnetventile",
  "multi-port-valves": "Mehrwegeventile",
  "high-pressure-valves": "Hochdruckventile",
  "fluid-switching-valves": "Umschaltventile",
  fittings: "Fittings",
  "ferrules-connectors": "Klemmkonen und Verbinder",
  "flexible-rigid-tubing": "Schläuche und starre Leitungen",
  "tubing-accessories": "Leitungszubehör",
  "pressure-detection-control": "Druckmessung und -regelung",
  "liquid-level-detection": "Füllstandserfassung",
  "fluid-state-detection": "Überwachung des Flüssigkeitszustands",
  "intelligent-fluid-control": "Intelligente Flüssigkeitssteuerung",
  "flow-operating-point": "Durchfluss und Betriebspunkt",
  "pressure-backpressure": "Druck und Gegendruck",
  "self-priming-negative-pressure-vacuum": "Selbstansaugung, Unterdruck und Vakuum",
  "tubing-resistance-pressure-drop": "Leitungswiderstand und Druckverlust",
  "material-chemical-compatibility": "Werkstoff- und Medienverträglichkeit",
  "sealing-leakage": "Dichtheit und Leckagen",
  "bubbles-pulsation": "Luftblasen und Pulsation",
  "lifetime-reliability": "Lebensdauer und Zuverlässigkeit",
  "testing-validation": "Prüfung und Validierung",
  "ivd-medical-devices": "IVD und Medizinprodukte",
  "life-science-synthetic-biology": "Life Sciences und synthetische Biologie",
  "laboratory-automation": "Laborautomation",
  "analytical-instruments": "Analysengeräte",
  "cleaning-waste": "Reinigung und Abfallflüssigkeiten",
  "reagent-sample-handling": "Reagenzien- und Probenhandhabung",
  "printing-inkjet": "Tintenstrahldruck",
  "oem-fluidic-systems": "OEM-Flüssigkeitssysteme",
};

const tagLabels: Record<string, string> = {
  "2-wire": "2-adrig", "2D drawings": "2D-Zeichnungen", "5-wire": "5-adrig",
  "Air in ink lines": "Luft in Tintenleitungen",
  "Automated pipetting": "Automatisiertes Pipettieren",
  Backpressure: "Gegendruck",
  "Barb expansion ratio": "Aufweitungsverhältnis der Schlauchtülle",
  "Barbed fittings": "Schlauchtüllen und Schlauchverbinder",
  "Bore diameter": "Bohrungsdurchmesser",
  "Brushed motor": "Bürstenmotor", "Brushless motor": "Bürstenloser Motor",
  "Bulkhead barbed fittings": "Schott-Schlauchtüllen",
  "Check valve": "Rückschlagventil",
  Cleaning: "Reinigung", "Cleaning pump": "Reinigungspumpe",
  "Compression-ring fittings": "Klemmring-Fittings", "Continuous duty": "Dauerbetrieb",
  "Dimensional tolerances": "Maßtoleranzen", Discharge: "Druckseite", Dosing: "Dosierung",
  "Engineering calculation": "Technische Berechnung",
  "Expansion percentage": "Aufweitung in Prozent", "Face sealing": "Stirnflächenabdichtung",
  "Female thread unions": "Innengewindeverbinder", "Fitting materials": "Fittingwerkstoffe",
  "Flanged tubing assemblies": "Gebördelte Leitungsbaugruppen",
  "Flangeless ferrule fittings": "Bördellose Klemmkonus-Fittings",
  Flow: "Durchfluss", "Flow pulsation": "Durchflusspulsation",
  "Fluid switching": "Umschaltung von Flüssigkeitswegen", "Fluidic system": "Flüssigkeitssystem",
  "Gas-liquid": "Gas-Flüssigkeits-Gemisch", "High pressure": "Hochdruck",
  "Ink circulation": "Tintenumlauf", "Ink dropout": "Tinten- oder Düsenaussetzer",
  "Ink return pump": "Tintenrückförderpumpe", "Ink starvation": "Unzureichende Tintenzufuhr",
  "Ink supply pump": "Tintenzufuhrpumpe", Inkjet: "Tintenstrahldruck",
  "Inkjet printer pump": "Pumpe für Tintenstrahldrucker",
  Installation: "Montage", "Instrument tubing assemblies": "Leitungsbaugruppen für Geräte",
  "Liquid pump": "Flüssigkeitspumpe", "Luer fittings": "Luer-Anschlüsse",
  "Male/female pairing": "Passende Innen- und Außenanschlüsse",
  "Manual pipetting": "Manuelles Pipettieren", "Material compatibility": "Werkstoffverträglichkeit",
  "Metering pump accuracy": "Dosiergenauigkeit",
  "Metering pump repeatability": "Wiederholbarkeit der Dosierung",
  "Micro diaphragm pump": "Miniatur-Membranpumpe", "Motor life": "Motorlebensdauer",
  "Noise and vibration": "Geräusche und Vibrationen", "OEM integration": "OEM-Integration",
  "Online configuration": "Online-Konfiguration", "Operating point": "Betriebspunkt",
  "PMU bulkhead unions": "PMU-Schottverbinder", "Panel mounting": "Plattenmontage",
  "Pigment sedimentation": "Pigmentsedimentation", Pipetting: "Pipettieren",
  "Piston pump": "Kolbenpumpe", Precision: "Präzision", Pressure: "Druck",
  "Pressure budget": "Druckbudget", "Pressure drop": "Druckverlust",
  "Pull-off force": "Abzugskraft", "Pump curve": "Pumpenkennlinie",
  "Quality system": "Qualitätsmanagementsystem", "Quick disconnect fittings": "Schnellkupplungen",
  "Rated pressure": "Nenndruck", "Reagent dispensing": "Reagenziendosierung",
  "Rinse pump": "Spülpumpe", "Sealing & leakage": "Dichtheit und Leckagen",
  "Sampling probes": "Probennadeln", "Working length": "Arbeitslänge",
  "Side ports": "Seitenbohrungen",
  "Automated analyzers": "Automatisierte Analysegeräte",
  Selection: "Auswahl", "Self-priming": "Selbstansaugung", "Solenoid valve": "Magnetventil",
  "Straight and branch connections": "Gerade Verbindungen und Abzweige",
  Suction: "Saugseite", "Testing & validation": "Prüfung und Validierung",
  "Threaded hose barb fittings": "Gewinde-Schlauchtüllen",
  Troubleshooting: "Fehlersuche", Tubing: "Schläuche und Leitungen",
  "Tubing diameter": "Leitungsdurchmesser", "Tubing inner diameter": "Leitungsinnendurchmesser",
  "Tubing resistance": "Leitungswiderstand", "UV ink pump": "Pumpe für UV-Tinte",
  Vacuum: "Vakuum", Valved: "Mit Ventil", "Valveless metering pump": "Ventillose Dosierpumpe",
  "Wash pump": "Waschpumpe", "Waste aspiration pump": "Abfallflüssigkeits-Absaugpumpe",
  "Waste handling": "Abfallflüssigkeitsentsorgung", "Waste liquid pump": "Abfallflüssigkeitspumpe",
  "Wetted materials": "Medienberührte Werkstoffe", "White ink": "Weiße Tinte",
  "Wiring & control": "Verdrahtung und Ansteuerung", "Working principle": "Funktionsprinzip",
};

export const germanTechnicalArticlesMetadata = {
  title: "Fachartikel | Ressourcen | Foreach Technology",
  description: "Fachartikel über Produktauswahl, Werkstoffverträglichkeit, Leitungsanschlüsse, Dichtungsarten und Anwendungen mikrofluidischer Systeme.",
};

function engineeringSearchText(block: EngineeringArticleBlock) {
  switch (block.type) {
    case "paragraph": return block.text;
    case "notice": return [block.label, block.text].filter(Boolean).join(" ");
    case "formula": return [block.expression, block.note].filter(Boolean).join(" ");
    case "figure": return `${block.alt} ${block.caption}`;
    case "subheading": return block.title;
    case "table": return [block.headers, ...block.rows].flat().join(" ");
    case "list": return block.items.join(" ");
    case "links": return block.items.map((link) => link.label).join(" ");
  }
}

export function getGermanTechnicalArticlesPageData(): GermanTechnicalArticlesPageData {
  const source = getTechnicalArticlesPageData("en");
  return {
    ...source,
    locale: "de",
    hero: {
      ...source.hero,
      title: "Fachartikel",
      description: germanTechnicalArticlesMetadata.description,
    },
    breadcrumbs: [
      { label: "Startseite", href: "/de/" },
      { label: "Ressourcen", href: "/de/resources/" },
      { label: "Fachartikel" },
    ],
    search: { placeholder: "Fachartikel nach Thema, Produkt oder Werkstoff durchsuchen" },
    sectionTitle: "Fachartikel",
    bottomBanner: {
      title: "Benötigen Sie technische Unterstützung bei der Produktauswahl?",
      description: "Nennen Sie uns Medium, Druckbereich, Leitungsabmessungen und Einsatzbedingungen oder senden Sie uns Ihre Zeichnungen. FOREACH unterstützt Sie bei der Auswahl und technischen Prüfung.",
      actions: [{ label: "Kontakt aufnehmen", href: "/de/contact/" }],
    },
    taxonomy: source.taxonomy.map((group) => ({
      ...group,
      label: primaryLabels[group.key],
      children: group.children.map((child) => ({ ...child, label: secondaryLabels[child.key] })),
    })),
    articles: source.articles.map((article) => {
      const card = getGermanTechnicalArticleCardText(article.slug);
      const edition = germanTechnicalArticleSlugs.includes(article.slug) ? getGermanTechnicalArticleCopy(article.slug) : null;
      const detailedCopy: Partial<ClassifiedTechnicalArticleItem> | null = edition?.kind === "piston"
        ? pistonPumpCopyToArticle(edition.copy)
        : edition?.kind === "cv-kv" ? {
          ...edition.copy.metadata,
          content: [
            { title: germanCvKvCopy.intro.title, content: germanCvKvCopy.intro.paragraphs.join(" ") },
            { title: germanCvKvCopy.correction.title, content: germanCvKvCopy.correction.paragraphs.join(" ") },
            { title: germanCvKvCopy.conclusion.title, content: germanCvKvCopy.conclusion.paragraphs.join(" ") },
          ],
        } : edition?.kind === "standard-diaphragm" ? {
          ...edition.copy.metadata,
          summary: edition.copy.deck,
          content: [
            { title: edition.copy.section1.title, content: edition.copy.section1.paragraphs.join(" ") },
            { title: edition.copy.section8.title, content: edition.copy.section8.rows.map((row) => row.join(" ")).join(" ") },
            ...(edition.series === "dpl60" ? [{
              title: edition.copy.section8.standardModelsTitle,
              content: edition.copy.section8.standardModelRows.map((row) => row.join(" ")).join(" "),
            }] : []),
            { title: edition.faq.title, content: edition.faq.items.map(({ question, answer }) => `${question} ${answer}`).join(" ") },
          ],
        } : edition?.kind === "dpgl800" ? {
          ...edition.copy.metadata,
          summary: edition.copy.deck,
          content: [
            { title: edition.copy.section1.title, content: edition.copy.section1.paragraphs.join(" ") },
            { title: edition.copy.section9.standardModelsTitle, content: edition.copy.section9.standardModelRows.map((row) => row.join(" ")).join(" ") },
          ],
        } : edition?.kind === "dpl30h" ? {
          ...edition.copy.metadata,
          summary: edition.copy.deck,
          content: [
            { title: edition.copy.section1.title, content: edition.copy.section1.paragraphs.join(" ") },
            { title: edition.copy.section10.standardModelsTitle, content: edition.copy.section10.standardModelRows.map((row) => row.join(" ")).join(" ") },
          ],
        } : edition?.kind === "brushless-wiring" ? {
          ...edition.copy.metadata,
          summary: edition.copy.deck,
          content: [
            { title: edition.copy.conclusion.title, content: edition.copy.conclusion.text },
            { title: edition.copy.faqTitle, content: edition.copy.faqItems.map(({ question, answer }) => `${question} ${answer}`).join(" ") },
          ],
        } : edition ? {
          ...edition.copy.metadata,
          summary: edition.copy.deck,
          content: [{ title: "", content: edition.copy.leadBlocks.map(engineeringSearchText).join(" ") },
            ...edition.copy.sections.map((section) => ({ title: section.title, content: section.blocks.map(engineeringSearchText).join(" ") })),
            { title: edition.copy.faqTitle, content: edition.copy.faqItems.map(({ question, answer }) => `${question} ${answer}`).join(" ") }],
        } : null;
      return {
        ...article,
        title: detailedCopy?.title ?? card?.title ?? article.title,
        summary: detailedCopy?.summary ?? card?.summary ?? article.summary,
        coverImage: detailedCopy?.coverImage ?? article.coverImage,
        coverAlt: detailedCopy?.coverAlt ?? card?.title ?? article.coverAlt,
        ...((article.slug === samplingProbeSelectionSlug && edition?.kind === "engineering") || edition?.kind === "cv-kv" || edition?.kind === "dpl30h" || edition?.kind === "dpgl800" || edition?.kind === "standard-diaphragm" ? {
          seoTitle: edition.copy.metadata.seoTitle,
          seoDescription: edition.copy.metadata.seoDescription,
        } : {}),
        content: detailedCopy?.content ?? [],
        tags: article.tags.map((tag) => tagLabels[tag] ?? tag),
        sourceLanguage: detailedCopy ? undefined : "en",
      };
    }),
  };
}
