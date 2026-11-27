import { germanFittingDraftPathPattern } from "@/data/products/detail/german-fitting-draft-routes";
import { getGermanDraftLink } from "@/lib/i18n/draft-languages";

import { datasheetEnFilterOptions, datasheetEnItems, datasheetsEnPageText } from "./datasheets.en";
import type { DatasheetCategory, DatasheetsPageData } from "./datasheets.types";

const categoryLabels: Record<DatasheetCategory, string> = {
  all: "Alle", pump: "Pumpen", valve: "Ventile", needle: "Sonden",
  tubing: "Schläuche und Fittings", smart: "Steuer- und Sensormodule",
};

const copy: Record<string, readonly [title: string, description: string]> = {
  "ea-piston-pump": ["Datenblatt zur Kolbenpumpe EA", "Kolbenpumpen der Baureihe EA zum präzisen Dosieren, Dispensieren und automatisierten Handhaben von Flüssigkeiten. Die Nennvolumina reichen von 50 µL bis 20 mL."],
  "eas-piston-pump": ["Datenblatt zur Kolbenpumpe EAS", "Leicht zu entlüftende Kolbenpumpen der Baureihe EAS für die präzise Flüssigkeitshandhabung, wenn schnelles Ansaugen und zuverlässiges Entfernen von Luftblasen erforderlich sind."],
  "sm-piston-pump": ["Datenblatt zur Kolbenpumpe SM", "Kompakte Kolbenpumpen der Baureihe SM zum präzisen Dosieren kleiner Volumina und für den Einbau in kompakte automatisierte Geräte."],
  "dpl30-diaphragm-pump": ["Datenblatt zur Membranpumpe DPL30", "Membranpumpe DPL30 für kompakte Flüssigkeitstransfersysteme mit einem Volumenstrom von bis zu 300 mL/min."],
  "dpl60-diaphragm-pump": ["Datenblatt zur Membranpumpe DPL60", "Membranpumpe DPL60 zur Flüssigkeitsversorgung und -förderung mit einem Volumenstrom von bis zu 600 mL/min."],
  "dpl30h-diaphragm-pump": ["Datenblatt zur Hochdruck-Membranpumpe DPL30H", "Hochdruck-Membranpumpe DPL30H für Filtration, Sprühanwendungen und Flüssigkeitsförderung in Geräten. Der Nenndruck beträgt 600 kPa."],
  "dpgl800-diaphragm-pump": ["Datenblatt zur Membranpumpe DPGL800", "Gas-Flüssigkeits-Membranpumpe DPGL800 zum Ansaugen von Gas und Gas-Flüssigkeits-Gemischen, zur Vakuumerzeugung und zum Absaugen von Abfallflüssigkeiten."],
  "fittings-and-tubing-catalog": ["Katalog für Fittings, Schläuche und Rohre", "Englischsprachiger Gesamtkatalog zu FOREACH Fittings, Verbindern, starren Rohren, flexiblen Schläuchen und konfektionierten Leitungen."],
  "smtp2-smtp4-pipetting-pump": ["Datenblatt zu den Pipettierpumpen SMTP2 und SMTP4", "Gemeinsames Datenblatt zu den Pipettierpumpen SMTP2 und SMTP4 mit Luftverdrängung für die automatisierte Proben- und Reagenzienhandhabung."],
  "rpl-p635-p15-valveless-pump": ["Datenblatt zur ventillosen Dosierpumpe RPL", "Gemeinsames Datenblatt zu den ventillosen Dosierpumpen RPL-P6.35 und RPL-P15, Version 001 (2025-07). Es enthält Angaben zu Verdrängung, medienberührten Werkstoffen, Anschlüssen, Einbau und Antriebskonfiguration."],
  "hld3-syringe-pump": ["Datenblatt zur Spritzenpumpe HLD3 mit Drehventil", "Spritzenpumpe HLD3 mit 30 mm Hub und verschiedenen Drehventil-Konfigurationen für die präzise Flüssigkeitshandhabung."],
  "hld6-syringe-pump": ["Datenblatt zur Spritzenpumpe HLD6 mit Drehventil", "Spritzenpumpe HLD6 mit 60 mm Hub und verschiedenen Drehventil-Konfigurationen für die Flüssigkeitshandhabung im µL- bis mL-Bereich."],
  "hmd3-syringe-pump": ["Datenblatt zur Spritzenpumpe HMD3 mit Magnetventil", "Spritzenpumpe HMD3 mit 30 mm Hub und integrierten Magnetventil-Konfigurationen für die automatisierte Flüssigkeitsabgabe."],
  "hmd6-syringe-pump": ["Datenblatt zur Spritzenpumpe HMD6 mit Magnetventil", "Spritzenpumpe HMD6 mit 60 mm Hub und integrierten Magnetventilen für die mehrkanalige Flüssigkeitshandhabung."],
  "mrv3-multi-channel-rotary-valve": ["Datenblatt zum Mehrkanal-Drehventil MRV3", "Mehrkanal-Drehventil MRV3 zum Umschalten von Flüssigkeitswegen mit mehreren Anschlüssen, zum Verteilen von Reagenzien und zur Integration in Fluidsysteme."],
  "hp-2-position-6-port-high-pressure-valve": ["Datenblatt zum Hochdruckventil HP mit 2 Schaltstellungen und 6 Anschlüssen", "Hochdruckventil HP mit 2 Schaltstellungen, 6 Anschlüssen und einem Entlüftungspfad zum Umschalten von Flüssigkeitswegen unter Druck."],
  "6010-solenoid-valve": ["Datenblatt zum Magnetventil SV10 (6010)", "Datenblatt zum Magnetventil SV10 (6010) mit Varianten für Plattenmontage, Gewindeanschlüsse und Schlauchtüllen für die 2-Wege- und 3-Wege-Steuerung."],
  "abd-air-bubble-detector": ["Datenblatt zum Luftblasendetektor ABD", "Berührungsloser ABD-Detektor zur Erkennung von Luftblasen und Flüssigkeit in transparenten Schläuchen. Er unterstützt TTL-Kommunikation und Modbus RTU."],
  "pdm5-pressure-sensor": ["Datenblatt zum Drucksensormodul PDM5", "Datenblatt zum PDM5 mit vier Absolutdruck-Messbereichen sowie Angaben zu medienberührten Werkstoffen, elektrischen Anschlüssen und Bestellvarianten."],
  "sample-probe": ["Sondenbaureihen", "Derzeit ist kein Datenblatt verfügbar. Kundenspezifische Ausführungen sind anhand von Zeichnungen oder Mustern möglich."],
};

export const germanDatasheetAccessibilityLabels = {
  breadcrumb: "Brotkrümelnavigation",
  categoryFilter: "Filter nach Produktkategorie",
  thumbnail: " – Vorschaubild",
};

export const datasheetsDeData: DatasheetsPageData = {
  pageText: {
    seo: {
      title: "Produktdatenblätter und Kataloge | FOREACH",
      description: "Laden Sie FOREACH Produktdatenblätter zu mikrofluidischen Pumpen, Ventilen, Schläuchen, Fittings, Sonden und Steuer- und Sensormodulen herunter.",
    },
    hero: {
      ...datasheetsEnPageText.hero,
      title: "Datenblätter",
      description: "Laden Sie FOREACH Datenblätter zu Pumpen, Ventilen, Schläuchen, Fittings sowie Steuer- und Sensormodulen herunter. Dort finden Sie technische Daten, Werkstoffe, Anschlüsse und Anwendungshinweise.",
      imageAlt: "FOREACH Datenblätter",
    },
    breadcrumb: { home: "Startseite", homeHref: "/de/", resources: "Ressourcen", resourcesHref: "/de/resources/", current: "Datenblätter" },
    search: {
      placeholder: "Produktname oder Stichwort suchen, z. B. Kolbenpumpe, Drehventil, Drucksensor oder Fitting",
      buttonText: "Suchen",
    },
    section: {
      title: "Produktdatenblätter",
      description: "Hier finden Sie Produktdatenblätter und Kataloge. Sonden können nach Zeichnung gefertigt werden. Produktzeichnungen finden Sie, sofern verfügbar, auf den jeweiligen Produktseiten.",
      resultPrefix: "", resultSuffix: "Treffer",
      emptyTitle: "Keine passenden Unterlagen gefunden",
      emptyDescription: "Suchen Sie nach Produktname, Stichwort oder Produktkategorie. Wenn Sie die benötigte Unterlage weiterhin nicht finden, helfen wir Ihnen gerne weiter.",
    },
    labels: {
      language: "Sprache", version: "Version", update: "Aktualisiert",
      fieldSeparator: ": ", viewProduct: "Produkt ansehen", download: "PDF herunterladen (Englisch)", custom: "Sonderanfertigung anfragen",
    },
    support: {
      title: "Fehlt das gewünschte Datenblatt?",
      description: "Nennen Sie uns das Produkt, die Anwendung oder die gesuchte Unterlage. Wir helfen Ihnen bei der Beschaffung des Datenblatts und unterstützen Sie bei Bedarf bei der technischen Auswahl.",
      buttonText: "Unterlagen anfragen", buttonHref: "/de/contact/?type=datasheet",
    },
  },
  filterOptions: datasheetEnFilterOptions.map(option => ({ ...option, label: categoryLabels[option.value] })),
  datasheetItems: datasheetEnItems.map(item => {
    const [title, description] = copy[item.id];
    const productLink = item.productHref ? getGermanDraftLink(item.productHref, germanFittingDraftPathPattern) : undefined;
    return {
      ...item,
      title,
      description,
      label: categoryLabels[item.category],
      language: item.actionType === "download" ? "Englisch" : item.language,
      productHref: productLink?.href,
      productHrefLang: productLink?.hrefLang,
      productLinkLabel: productLink?.hrefLang === "en" ? "Produkt auf Englisch ansehen" : undefined,
      downloadHref: item.actionType === "custom" ? "/de/contact/?type=custom-probe" : item.downloadHref,
    };
  }),
};
