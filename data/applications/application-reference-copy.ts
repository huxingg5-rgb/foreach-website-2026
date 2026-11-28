import type { ApplicationReference } from "./analytical-documents/types";

const languageIndex = { de: 0, it: 1, hi: 2 } as const;
const englishDocumentSuffix = { de: " (Englisch)", it: " (in inglese)", hi: " (अंग्रेज़ी में)" };

const referenceTitles: Readonly<Record<string, readonly [string, string, string]>> = {
  "FOREACH CV-BE-32-PP-N dimensional drawing and opening pressure (PDF)": [
    "FOREACH CV-BE-32-PP-N: Maßzeichnung und Öffnungsdruck (PDF)",
    "FOREACH CV-BE-32-PP-N: disegno quotato e pressione di apertura (PDF)",
    "FOREACH CV-BE-32-PP-N: आयामी चित्र और खुलने का दबाव (PDF)",
  ],
  "FOREACH — EA Piston Pump Datasheet, basic capacities and test conditions": [
    "FOREACH — Datenblatt der EA-Kolbenpumpe, Nennvolumina und Prüfbedingungen",
    "FOREACH — Scheda tecnica della pompa a pistone EA, volumi nominali e condizioni di prova",
    "FOREACH — EA पिस्टन पंप की डेटाशीट, नाममात्र आयतन और परीक्षण की शर्तें",
  ],
  "FOREACH — EA Piston Pump Datasheet, capacities and test conditions": [
    "FOREACH — Datenblatt der EA-Kolbenpumpe, Volumina und Prüfbedingungen",
    "FOREACH — Scheda tecnica della pompa a pistone EA, volumi e condizioni di prova",
    "FOREACH — EA पिस्टन पंप की डेटाशीट, आयतन और परीक्षण की शर्तें",
  ],
  "FOREACH — EA Piston Pump Datasheet, capacities, drive options and test conditions": [
    "FOREACH — Datenblatt der EA-Kolbenpumpe, Volumina, Antriebsoptionen und Prüfbedingungen",
    "FOREACH — Scheda tecnica della pompa a pistone EA, volumi, opzioni di azionamento e condizioni di prova",
    "FOREACH — EA पिस्टन पंप की डेटाशीट, आयतन, ड्राइव विकल्प और परीक्षण की शर्तें",
  ],
  "FOREACH — EAS Easy-to-Degas Piston Pump Datasheet": [
    "FOREACH — Datenblatt der leicht zu entlüftenden EAS-Kolbenpumpe",
    "FOREACH — Scheda tecnica della pompa a pistone EAS a degasaggio facilitato",
    "FOREACH — आसानी से गैस निकालने योग्य EAS पिस्टन पंप की डेटाशीट",
  ],
  "FOREACH — Piston-pump head and wetted-material selection": [
    "FOREACH — Auswahl von Kolbenpumpenkopf und medienberührten Werkstoffen",
    "FOREACH — Selezione della testa della pompa a pistone e dei materiali a contatto",
    "FOREACH — पिस्टन पंप हेड और द्रव-संपर्क सामग्री का चयन",
  ],
  "FOREACH: DPGL800 Diaphragm Pump Specification Sheet": [
    "FOREACH: Datenblatt der Membranpumpe DPGL800",
    "FOREACH: scheda tecnica della pompa a membrana DPGL800",
    "FOREACH: DPGL800 डायफ्राम पंप की विनिर्देश शीट",
  ],
  "FOREACH: EA Piston Pump Datasheet, PS-120B-2507-00001_001": [
    "FOREACH: Datenblatt der EA-Kolbenpumpe, PS-120B-2507-00001_001",
    "FOREACH: scheda tecnica della pompa a pistone EA, PS-120B-2507-00001_001",
    "FOREACH: EA पिस्टन पंप की डेटाशीट, PS-120B-2507-00001_001",
  ],
  "FOREACH: EAS Easy-to-Degas Piston Pump Datasheet, PS-120B-2507-00002_001": [
    "FOREACH: Datenblatt der leicht zu entlüftenden EAS-Kolbenpumpe, PS-120B-2507-00002_001",
    "FOREACH: scheda tecnica della pompa a pistone EAS a degasaggio facilitato, PS-120B-2507-00002_001",
    "FOREACH: आसानी से गैस निकालने योग्य EAS पिस्टन पंप की डेटाशीट, PS-120B-2507-00002_001",
  ],
  "FOREACH: PDM5 Pressure Sensor User Manual": [
    "FOREACH: Bedienungsanleitung für den Drucksensor PDM5",
    "FOREACH: manuale utente del sensore di pressione PDM5",
    "FOREACH: PDM5 दबाव सेंसर की उपयोगकर्ता पुस्तिका",
  ],
  "FOREACH: SM Piston Pump Datasheet, PS-120B-2507-00004_001": [
    "FOREACH: Datenblatt der SM-Kolbenpumpe, PS-120B-2507-00004_001",
    "FOREACH: scheda tecnica della pompa a pistone SM, PS-120B-2507-00004_001",
    "FOREACH: SM पिस्टन पंप की डेटाशीट, PS-120B-2507-00004_001",
  ],
  "FOREACH: SMTP2 / SMTP4 Pipetting Pump Datasheet": [
    "FOREACH: Datenblatt der Pipettierpumpen SMTP2 und SMTP4",
    "FOREACH: scheda tecnica delle pompe di pipettaggio SMTP2 e SMTP4",
    "FOREACH: SMTP2 और SMTP4 पिपेटिंग पंप की डेटाशीट",
  ],
};

export function getLocalizedApplicationReferences(
  references: readonly ApplicationReference[],
  locale: string | undefined,
) {
  const language = locale?.split("-", 1)[0];
  if (language !== "de" && language !== "it" && language !== "hi") return references;

  return references.map(reference => {
    const destination = new URL(reference.href, "https://www.foreachtek.com/");
    if (destination.hostname !== "www.foreachtek.com" && destination.hostname !== "foreachtek.com") return reference;

    const title = referenceTitles[reference.title]?.[languageIndex[language]] ?? reference.title;
    const isEnglishDatasheet = /^\/downloads\/resources\/datasheets\/en\/.*\.pdf$/i.test(destination.pathname);
    if (!isEnglishDatasheet) return title === reference.title ? reference : { ...reference, title };

    const suffix = englishDocumentSuffix[language];
    return {
      ...reference,
      title: title.endsWith(suffix) ? title : title + suffix,
      hrefLang: "en" as const,
    };
  });
}
