import type { HomeProductsCopy } from "../home-products.types";

const materialOptions = "Verfügbare Abmessungen und Werkstoffoptionen ansehen.";

const de: HomeProductsCopy = {
  title: "Unsere Produkte",
  categoriesAriaLabel: "Produktkategorien",
  productCenter: "Produktübersicht",
  explore: "{name} ansehen",
  discuss: "Über {name} sprechen",
  conceptAlt: "Prinzipdarstellung einer konfektionierten Schlauchleitung",
  conceptLabel: "Prinzipdarstellung",
  resultCount: "Angezeigte Produktfamilien: {count}",
  groups: {
    Featured: "Ausgewählte Produkte",
    Pumps: "Pumpen",
    Valves: "Ventile",
    Probes: "Sonden und Kanülen",
    Tubing: "Schläuche und Kapillaren",
    Fittings: "Fluidik-Fittings",
    "Smart Control": "Sensor- und Detektionsmodule",
    "Tubing Assemblies": "Schlauchkonfektionen",
  },
  products: {
    plunger: {
      name: "Präzisionskolbenpumpen",
      description: "Kontrolliertes Ansaugen und Abgeben von Proben und Reagenzien zur präzisen Flüssigkeitsdosierung in Geräten.",
      imageAlt: "Präzisionskolbenpumpen der FOREACH-Serien EA, SM und TM nebeneinander",
    },
    dpl: {
      name: "Miniatur-Membranpumpen",
      description: "Fördern, Ansaugen und Spülen für die Flüssigkeitsversorgung und Entleerung von Geräten.",
      imageAlt: "Miniatur-Membranpumpe von FOREACH mit Motor und schwarzem Pumpenkopf",
    },
    smtp2: {
      name: "SMTP2 – Pipettiermodul mit Luftverdrängung",
      description: "Integrierter Antrieb und Steuerung mit Erkennung von Flüssigkeitsstand, Pipettenspitze und Verstopfung für automatisiertes Pipettieren.",
      imageAlt: "FOREACH SMTP2 mit Pipettierschaft und Steuerplatine",
    },
    rpl: {
      name: "Ventillose Kolbendosierpumpen",
      description: "Ventillose Bauweise zum Abmessen und Dosieren von Flüssigkeiten und zum Fördern von Reagenzien in Geräten.",
      imageAlt: "Ventillose Kolbendosierpumpe von FOREACH mit Motor und Pumpenkopf",
    },
    assembly: {
      name: "Konfektionierte Schlauch- und Kapillarleitungen",
      description: "Kundenspezifische Konfektionen mit gebördelten Enden, Klemmring-Dichtsätzen oder Klemmkonus-Sätzen für Flüssigkeitskreisläufe in Geräten.",
      imageAlt: "Konfektionierte Schlauchleitungen von FOREACH mit montierten Anschlüssen",
    },
    tube: {
      name: "Schläuche und Kapillaren",
      description: "Starre und flexible Leitungen aus PVC und weiteren Werkstoffen mit anpassbaren Innen- und Außendurchmessern und Längen.",
      imageAlt: "Transparente und durchscheinende FOREACH-Schläuche für Instrumente",
    },
    quick: {
      name: "Schnellverschlusskupplungen für Flüssigkeitsleitungen",
      description: "Für Schlauchinnendurchmesser von 1,6 bis 19,0 mm. Für den Schalttafeleinbau oder den Einbau in die Leitung, mit oder ohne Ventil. Sonderausführungen sind möglich.",
      imageAlt: "Schnellverschlusskupplungen von FOREACH in unterschiedlichen Bauformen und Größen",
    },
    needle: {
      name: "Sonden, Kanülen und Rührpaddel",
      description: "Anpassbare Sondenbauformen für Probenahme, Einstechen und Spülen.",
      imageAlt: "FOREACH-Instrumentensonden mit Metallschäften und Anschlussbaugruppen",
    },
    "flanged-tubing": {
      name: "Schlauchkonfektion mit gebördelten Enden",
      description: "Kundenspezifische Schlauchleitungen mit ein- oder beidseitig gebördelten Enden für passende Flachbodenanschlüsse.",
    },
    "retaining-ring-kits": {
      name: "Klemmring-Dichtsätze",
      description: "Anschlusssätze für Schläuche mit Haltehülsen und Dichtringen. Sonderausführungen sind möglich.",
    },
    "ferrule-kits": {
      name: "Klemmkonus-Sätze",
      description: "Sätze aus Fittings und Klemmkonen zum Anschluss von Schläuchen ohne vorheriges Bördeln. Sonderausführungen sind möglich.",
    },
    family0: { name: "OEM-Spritzenpumpen", description: "Baugruppen mit integrierter Spritze und integriertem Ventil." },
    mrv: {
      name: "Drehschaltventile für Flüssigkeiten",
      description: "Zur Auswahl und Umschaltung von Flüssigkeitswegen.",
      imageAlt: "Zwei FOREACH-Drehschaltventile der Serie MRV3 mit unterschiedlichen Ventilköpfen",
    },
    family2: {
      name: "Miniatur-Magnetventile",
      description: "Elektrisches Schalten der Flüssigkeitswege in Instrumenten.",
      imageAlt: "FOREACH-Magnetventile der Serie SV10 für Montage auf einem Verteiler sowie mit Schlauchtüllen und Gewindeanschlüssen",
    },
    family3: { name: "Hochdruck-Drehschaltventile", description: "Ventiloptionen für anspruchsvolle Flüssigkeitskreisläufe." },
    family4: { name: "Kundenspezifische Probenahmesonden", description: "Ansaugen und Übertragen von Proben." },
    family5: { name: "Kundenspezifische Einstechsonden", description: "Sondenoptionen für Anwendungen mit Einstich." },
    family6: { name: "Kundenspezifische Spülsonden", description: "Sonden für Spülvorgänge in Geräten." },
    family7: { name: "Kundenspezifische Rührpaddel", description: "Komponenten zum Mischen in Geräten." },
    family8: { name: "PVC-Schläuche", description: materialOptions },
    family9: { name: "TPU-Schläuche", description: materialOptions },
    family10: { name: "FEP-Schläuche", description: materialOptions },
    family11: { name: "PTFE-Schläuche", description: materialOptions },
    family12: { name: "PEEK-Kapillaren", description: materialOptions },
    family13: { name: "PFA-Schläuche", description: materialOptions },
    family14: { name: "Fittings für starre Kapillaren und Rohre", description: "Verbindungen für starre Leitungen." },
    family15: { name: "Schlauchtüllen und Schlauchverbinder", description: "Verbindungen für flexible Leitungen." },
    family16: { name: "Gewinde-Schlauchtüllen", description: "Verbinden Gewindeanschlüsse mit Schläuchen." },
    family17: { name: "Luer-Verbinder", description: "Verbindungsoptionen für Luer-Anschlüsse." },
    family18: { name: "Fluidik-Verbinder und Adapter mit Innengewinde", description: "Adapter für Gewindeanschlüsse." },
    family19: { name: "Schottverschraubungen mit Schlauchtülle", description: "Schlauchanschlüsse für den Schalttafeleinbau." },
    family20: { name: "Filter und Rückschlagventile", description: "Komponenten für Ihre Flüssigkeitskreisläufe." },
    family21: { name: "Module zur Luftblasendetektion", description: "Erkennen Luftblasen in Schläuchen." },
    family22: { name: "Druckmessmodule für Flüssigkeitsleitungen", description: "Überwachen den Druck in Flüssigkeitskreisläufen." },
  },
};

export default de;
