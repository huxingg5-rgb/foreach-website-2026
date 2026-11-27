import type { PistonSeriesKey } from "./piston-pump-series-copy";

type GermanPistonPumpSeriesCopy = {
  title: string;
  paragraphs: string[];
  imageAlt: string;
  metaDescription: string;
};

export const germanPistonPumpSeriesCopy: Record<PistonSeriesKey, GermanPistonPumpSeriesCopy> = {
  category: {
    title: "Präzisionskolbenpumpen zum Dosieren vom Mikro- bis zum Milliliterbereich",
    metaDescription: "Vergleichen Sie die FOREACH Kolbenpumpen der Serien EA, SM und TM für Reagenzdosierung, Probenahme und Flüssigkeitsabgabe nach Nennvolumen, Werkstoff und Anschluss.",
    paragraphs: [
      "FOREACH bietet EA-Präzisionskolbenpumpen, SM-Miniatur-Präzisionskolbenpumpen und ultrakompakte Präzisionskolbenpumpen der TM-Serie zum Ansaugen, Abmessen und Dosieren von Flüssigkeiten in automatisierten Geräten. Die EA-Serie deckt 50 μL–20 mL ab, die gezeigten SM-Ausführungen 50 μL–1 mL und die TM-Ausführungen 50–500 μL. Die kleinste zuverlässig dosierbare Menge lässt sich weder aus dem Nennvolumen noch aus dem rechnerischen Volumen je Schritt ableiten.",
      "Für klinische Chemie, Immunoassays, Laborautomation, Probenvorbereitung, Life Sciences sowie Wasser- und Umweltanalytik lässt sich die Pumpe nach der jeweiligen Aufgabe auswählen. Dazu zählen Reagenzdosierung, Probenahme, Probenverdünnung, Dosierung von Puffern und Reaktionsflüssigkeiten sowie Standardaddition. Prüfen Sie die Eignung mit dem tatsächlichen Medium und dem Ablauf im Gerät.",
      "Genauigkeit und Wiederholpräzision beim Vollhub der EA-Serie betragen unter festgelegten Prüfbedingungen jeweils ≤0,5%. Die Wiederholpräzision beim Vollhub der SM-Serie beträgt ≤0,5%. Die Genauigkeit hängt von der Ausführung ab. Prüfen Sie bei TM Genauigkeit, Wiederholpräzision, Druck und Lebensdauer für die gewählte Ausführung und die tatsächlichen Betriebsbedingungen. Die Werte anderer Serien gelten hier nicht.",
      "Für EA sind Pumpenköpfe aus Acryl (PMMA), PCTG-Copolyester oder PEEK und Kolben aus Zirkonoxidkeramik, Aluminiumoxidkeramik, PEEK oder Saphir erhältlich. Für SM stehen Pumpenköpfe aus Acryl (PMMA), Polysulfon (PSU), Polyoxymethylen (POM) oder PEEK und Kolben aus Keramik, Edelstahl oder PEEK zur Wahl. Die gezeigten TM-Ausführungen haben einen Pumpenkopf aus Acryl (PMMA) und einen Keramikkolben. Andere Werkstoffe werden projektbezogen bewertet. Prüfen Sie Pumpenkopf, Kolben, Dichtungen und Ventile gemeinsam. Der Lichtschutz des vollständigen Fluidpfads erfordert eine gesonderte konstruktive Bewertung. Weitere Informationen finden Sie im [Leitfaden zur Wahl des Pumpenkopfwerkstoffs](/en/resources/technical-articles/piston-pump-head-material-selection/).",
      "EA und SM unterstützen Fluidanschlüsse mit 1/4-28 UNF oder M6. Die gezeigten TM-Ausführungen verwenden 6-40 UNF. Ventile, Rückmeldung, Antriebssteuerung, Leitungen und Montage werden auf das Projekt abgestimmt. Planen Sie Platz für Verschraubungen, Leitungsbögen und Wartungszugang ein.",
      "Eine Präzisionskolbenpumpe kann im Gerät für Probenahme, Flüssigkeitsabgabe, Mengenmessung oder Dosierung eingesetzt werden. Geben Sie das Einzeldosiervolumen, die angestrebte Zykluszeit, die Medienzusammensetzung, den Gegendruck und die Einbaumaße an. Anhand dieser Angaben lassen sich Nennvolumen, medienberührte Werkstoffe und Steuerung festlegen.",
    ],
    imageAlt: "Präzisionskolbenpumpen der FOREACH Serien EA, SM und TM",
  },
  ea: {
    title: "EA-Präzisionskolbenpumpen zum Abmessen und Dosieren von 50 μL bis 20 mL",
    metaDescription: "FOREACH EA-Präzisionskolbenpumpen mit 50 μL–20 mL für automatisiertes Abmessen und Dosieren. Vergleichen Sie Werkstoffe, Anschlüsse und Integrationsoptionen.",
    paragraphs: [
      "Die EA-Serie von FOREACH ist eine vielseitige Kolbenpumpenplattform für die präzise Flüssigkeitshandhabung vom Mikro- bis zum Milliliterbereich. Sie reicht von 50 μL bis 20 mL und umfasst 50 μL, 100 μL, 250 μL, 500 μL, 1 mL, 1,2 mL, 2,5 mL, 5 mL, 6 mL, 7,5 mL, 10 mL und 20 mL. So lässt sich das Nennvolumen auf die übliche Dosis im Gerät abstimmen.",
      "Genauigkeit und Wiederholpräzision beim Vollhub der EA-Serie betragen unter festgelegten Prüfbedingungen jeweils ≤0,5%. Die erwartete Lebensdauer von fünf Millionen Zyklen wurde mit Reinwasser bei Raumtemperatur und 50 kPa Gegendruck ermittelt. Für klinische Chemie, Immunoassays, Probenvorbereitung, Laborautomation und Wasseranalytik lassen sich Reagenzzugabe, Verdünnung, Pufferdosierung, Standardaddition, dosiertes Spülen und Befüllen konfigurieren. Die Leistung bei kleinen Dosiervolumina ist gesondert zu prüfen.",
      "Für den Pumpenkopf stehen unter anderem Acryl (PMMA), PCTG-Copolyester und PEEK zur Wahl. Kolben sind unter anderem aus Zirkonoxidkeramik, Aluminiumoxidkeramik, PEEK oder Saphir erhältlich. Weitere Werkstoffe werden anhand des Mediums, der Konstruktion und der Projektanforderungen bewertet. Prüfen Sie Dichtungen und Ventile gemeinsam. Ein PEEK-Pumpenkopf allein gewährleistet weder die Verträglichkeit aller medienberührten Bauteile noch den Lichtschutz des gesamten Fluidpfads.",
      "EA unterstützt Flachbodenanschlüsse mit 1/4-28 UNF oder M6. Motoren, optische Rückmeldung, Ventile und Steuergeräte werden auf das Projekt abgestimmt. Bei Ausführungen mit 2,5 mL und 2000 oder 2236 Schritten sind die tatsächliche Spindelsteigung und die zugehörige Zeichnung maßgeblich. Die Grundausführungen mit 5 mL und 10 mL haben jeweils ein rechnerisches Volumen von 2,5 μL pro Schritt. Ein größeres Nennvolumen bedeutet keine feinere Dosierung.",
    ],
    imageAlt: "FOREACH EA-Präzisionskolbenpumpe zum Dosieren von Reagenzien, Verdünnern und Puffern",
  },
  sm: {
    title: "SM-Miniatur-Präzisionskolbenpumpen für die Dosierung im Mikroliterbereich",
    metaDescription: "FOREACH SM-Miniatur-Präzisionskolbenpumpen mit 50 μL–1 mL für Reagenzdosierung und Probenahme. Vergleichen Sie Pumpenkopfwerkstoffe und Anschlüsse.",
    paragraphs: [
      "Die SM-Miniatur-Präzisionskolbenpumpen von FOREACH sind mit 50 μL, 100 μL, 250 μL, 500 μL und 1 mL erhältlich. In kompakten automatisierten Geräten und Probenahmemechanismen dienen sie zur Reagenzzugabe, automatisierten Probenahme, Probenverdünnung und Pufferdosierung. Die Fluidpfade lassen sich für klinische Chemie, Immunoassays, Laborautomation, Life Sciences und Wasseranalytik konfigurieren.",
      "Die SM-Grundausführung hat 2000 Schritte je Vollhub. Ihre Wiederholpräzision beim Vollhub beträgt unter festgelegten Bedingungen ≤0,5%. Die kleinste zuverlässig dosierbare Menge lässt sich weder aus dem Nennvolumen noch aus dem rechnerischen Volumen je Schritt ableiten. Prüfen Sie die Genauigkeit beim tatsächlichen Dosiervolumen. Die erwartete Lebensdauer von fünf Millionen Zyklen wurde mit Reinwasser bei Raumtemperatur und 50 kPa Gegendruck ermittelt.",
      "Die gezeigten Ausführungen haben Pumpenköpfe aus Acryl (PMMA) oder PEEK. Für Pumpenköpfe stehen Acryl (PMMA), Polysulfon (PSU), Polyoxymethylen (POM) und PEEK zur Wahl. Kolben sind aus Keramik, Edelstahl oder PEEK erhältlich. Stimmen Sie Pumpenkopf, Kolben, Dichtungen und Ventile gemeinsam auf das Medium ab. Der Lichtschutz des vollständigen Fluidpfads erfordert eine gesonderte konstruktive Bewertung.",
      "SM unterstützt Anschlüsse mit 1/4-28 UNF oder M6 sowie projektspezifische optische Sensoren, Ventile, Sonden, Leitungen und Steuergeräte. Prüfen Sie die Zeichnung für das jeweilige Nennvolumen und planen Sie Platz für Verschraubungen, Leitungen und Wartungszugang ein.",
    ],
    imageAlt: "FOREACH SM-Miniatur-Präzisionskolbenpumpe für die automatisierte Probenahme und Probenverdünnung",
  },
  tm: {
    title: "Ultrakompakte TM-Präzisionskolbenpumpen für begrenzten Einbauraum",
    metaDescription: "FOREACH TM-Präzisionskolbenpumpen mit 50–500 μL, Pumpenkopf aus PMMA und Anschlüssen 6-40 UNF zur Dosierung in Geräten mit begrenztem Bauraum.",
    paragraphs: [
      "Die gezeigten ultrakompakten TM-Präzisionskolbenpumpen von FOREACH haben Pumpenköpfe aus Acryl (PMMA) und Nennvolumina von 50 μL, 100 μL, 250 μL und 500 μL. Sie sind für OEM-Analysenmodule mit begrenztem Bauraum vorgesehen. Aufgaben sind die Reagenzzugabe im Mikroliterbereich, Probendosierung, Zugabe von Reaktionsflüssigkeiten und dosierte Pufferförderung.",
      "Bei der Auswahl der TM-Serie steht der Einbau von Pumpe, Ventilen, Leitungen und Detektionskomponenten auf engem Raum im Vordergrund. Die gezeigten Ausführungen verwenden Anschlüsse mit 6-40 UNF und 2540 Schritte je Vollhub. Prüfen Sie die Zeichnung für das jeweilige Nennvolumen und berücksichtigen Sie Verschraubungen, Leitungsbögen und Wartungszugang.",
      "Fluidpfade lassen sich für klinische Chemie, Immunoassays, Probenvorbereitung, Life Sciences und Wasseranalytik bewerten. Je nach Aufgabe kann die Pumpe zur Reagenzdosierung, zur Probenahme oder zur Dosierung von Reaktionsflüssigkeiten oder Puffern eingesetzt werden. Die Eignung hängt vom tatsächlichen Dosiervolumen, den Zeitvorgaben, der Werkstoffverträglichkeit und dem vollständigen Fluidpfad ab.",
      "Die gezeigte Ausführung hat einen Pumpenkopf aus Acryl (PMMA) und einen Keramikkolben. Andere Werkstoffe werden anhand der Reagenzchemie, der Dichtungen und des Bauraums bewertet. Montage, Leitungen, Ventile und Antriebssteuerung werden auf das Projekt abgestimmt. Prüfen Sie Genauigkeit, Wiederholpräzision, Betriebsdruck und Lebensdauer für die gewählte Ausführung unter tatsächlichen Betriebsbedingungen.",
    ],
    imageAlt: "Ultrakompakte FOREACH TM-Präzisionskolbenpumpe für Analysenmodule mit begrenztem Einbauraum",
  },
};

export function getGermanPistonPumpSelectionCopy(filterValue?: string) {
  const series = filterValue === "EA 常规柱塞泵" ? "ea"
    : filterValue === "SM 微型柱塞泵" ? "sm"
      : filterValue === "TM 超微型柱塞泵" ? "tm"
        : "category";
  return germanPistonPumpSeriesCopy[series];
}
