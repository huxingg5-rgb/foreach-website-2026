import { germanFittingDraftPathPattern } from '@/data/products/detail/german-fitting-draft-routes';
import { getGermanDraftLink } from '@/lib/i18n/draft-languages';
import type { ApplicationBlock } from './analytical-documents/types';
import { getLocalizedInkjetPage } from './industrial-inkjet-localized';

const germanCopy: Readonly<Record<string, string>> = {
  "Ink supply, return and circulation pumps compared": "Tintenversorgung, Rücklauf und Rezirkulation im Vergleich",
  "Distinguish the three duties by circuit position, head pressure and operating flow.": "Unterscheiden Sie die drei Aufgaben anhand ihrer Position im Kreislauf, des Drucks und des Volumenstroms im Betrieb.",
  "Choosing a 300 or 600 mL/min pump for ink supply or return": "Pumpenauswahl für Tintenzufuhr oder Rücklauf mit 300 oder 600 mL/min",
  "Compare the two flow ratings against ink viscosity, tubing, filtration and the actual operating point.": "Vergleichen Sie beide Nennfördermengen anhand von Tintenviskosität, Leitungen, Filtration und tatsächlichem Betriebspunkt.",
  "White ink circulation pump selection and pigment settling": "Pumpenauswahl für den Weißtintenumlauf und die Pigmentablagerung",
  "Check low-flow regions in the tank, restart flow and wetted materials.": "Prüfen Sie schwach durchströmte Bereiche im Tank, den Volumenstrom beim Wiederanlauf und die medienberührten Werkstoffe.",
  "Troubleshooting ink starvation in industrial inkjet printers": "Unzureichende Tintenversorgung bei industriellen Tintenstrahldruckern beheben",
  "Trace the supply from tank through pump, filter and lines to the affected printhead.": "Verfolgen Sie die Versorgung vom Tank über Pumpe, Filter und Leitungen bis zum betroffenen Druckkopf.",
  "Fluidic Components for Industrial Inkjet Printers": "Fluidikkomponenten für industrielle Tintenstrahldrucker",
  "Industrial Inkjet Printing": "Industrieller Tintenstrahldruck",
  "Fluidic Components for Industrial Inkjet Printers | FOREACH": "Fluidikkomponenten für industrielle Tintenstrahldrucker | FOREACH",
  "Select diaphragm pumps, tubing assemblies, fittings, filters, valves and sensors for ink supply, recirculation and waste removal in industrial inkjet printers.": "Wählen Sie Membranpumpen, Schlauchbaugruppen, Fittings, Filter, Ventile und Sensoren für die Tintenzufuhr, Rezirkulation und Abfallentsorgung in industriellen Tintenstrahldruckern aus.",
  "Ink supply and refill": "Tintenzufuhr und Nachfüllen",
  "Ink recirculation": "Tintenrezirkulation",
  "Printhead cleaning": "Druckkopfreinigung",
  "Waste ink removal": "Abführung von Alttinte",
  "Miniature liquid diaphragm pumps": "Miniatur-Flüssigkeitsmembranpumpen",
  "In an industrial drop-on-demand printer, the same ink can follow three different paths. The main tank replenishes the secondary tank while printing consumes ink. A recirculating printhead returns unused ink to the designated tank. The maintenance station sends residual ink and cleaning fluid to a waste container. Mark the start and end of each path on the printer fluid circuit diagram before choosing where to measure flow, liquid level or pressure.": "In einem industriellen Drop-on-Demand-Drucker kann dieselbe Tinte drei verschiedene Wege nehmen. Der Haupttank füllt den Zwischentank nach, während beim Drucken Tinte verbraucht wird. Ein Druckkopf mit Rezirkulation führt ungenutzte Tinte in den vorgesehenen Tank zurück. Die Wartungsstation leitet Tintenreste und Reinigungsflüssigkeit in einen Abfallbehälter. Markieren Sie im Flüssigkeitsschema des Druckers Anfang und Ende jedes Pfads. Legen Sie danach fest, wo Sie Volumenstrom, Flüssigkeitsstand oder Druck messen.",
  "printer fluid circuit diagram": "Flüssigkeitsschema des Druckers",
  "What should refill, return and waste removal each achieve?": "Welche Aufgaben haben Nachfüllen, Rücklauf und Abführung von Alttinte?",
  "Printing applications": "Anwendungen im Drucksystem",
  "When designing a printer, start with the task below. On an installed machine with missing nozzles, record when the defect first appears: during a high-coverage run, on the first print after a tank change, or on the nozzle check after cleaning. Each points to a different part of the circuit to measure first.": "Gehen Sie bei der Druckerauslegung von der jeweiligen Aufgabe aus. Wenn bei einem vorhandenen Drucker einzelne Düsen ausfallen, halten Sie fest, wann der Fehler zuerst auftritt. Das kann bei einem Auftrag mit hoher Flächendeckung, beim ersten Druck nach einem Tankwechsel oder beim Düsentest nach der Reinigung sein. Der Zeitpunkt zeigt, welchen Abschnitt des Tintenkreislaufs Sie zuerst messen sollten.",
  "Determine the required transfer rate from the main tank to the secondary tank using the refill volume, available time and actual line resistance.": "Bestimmen Sie die nötige Förderrate vom Haupttank zum Zwischentank anhand des Nachfüllvolumens, der verfügbaren Zeit und des tatsächlichen Leitungswiderstands.",
  "Ink recirculation and return": "Tintenrezirkulation und Rücklauf",
  "Assess the return branch against the printhead pressure limits and required circulation flow. With white ink, also check recovery after idle periods.": "Prüfen Sie den Rücklaufzweig anhand der Druckgrenzen des Druckkopfs und des erforderlichen Volumenstroms im Umlauf. Prüfen Sie bei Weißtinte auch den Wiederanlauf nach Stillstandszeiten.",
  "Printhead cleaning and waste ink removal": "Druckkopfreinigung und Abführung von Alttinte",
  "Evaluate the maintenance branch using the volume to remove per cycle, the time allowed to drain it and the actual mixture of ink and cleaning fluid.": "Bewerten Sie den Wartungszweig anhand des je Zyklus abzuführenden Volumens, der verfügbaren Entleerungszeit und des tatsächlichen Gemischs aus Tinte und Reinigungsflüssigkeit.",
  "Does the fault originate in the supply circuit or near the printhead?": "Liegt die Störung in der Tintenzufuhr oder am Druckkopf?",
  "Locating the fault": "Störung lokalisieren",
  "An operator reported that one color dropped out partway through a long print and recovered temporarily after cleaning. To check whether supply keeps up with consumption, repeat the same job and record when the color drops out, the secondary tank level at that point and whether it rises once refill starts. Follow the ink starvation troubleshooting guide to check each section from the bulk container to the printhead.": "Ein Anwender berichtete, dass bei einem langen Druckauftrag eine Farbe ausfiel und nach der Reinigung vorübergehend zurückkehrte. Um zu prüfen, ob die Zufuhr mit dem Verbrauch Schritt hält, wiederholen Sie denselben Auftrag. Erfassen Sie den Zeitpunkt des Ausfalls, den Füllstand im Zwischentank und ob der Füllstand nach Beginn des Nachfüllens steigt. Der Leitfaden zur Fehlersuche bei unzureichender Tintenversorgung führt vom Haupttank bis zum Druckkopf durch die einzelnen Abschnitte.",
  "ink starvation troubleshooting guide": "Leitfaden zur Fehlersuche bei unzureichender Tintenversorgung",
  "If the secondary tank refills on time but nozzles still drip or drop out, check the printhead model and supply design. For a through-flow head, measure both the pressure that maintains the nozzle meniscus and the pressure difference that drives ink through the head. The ink recirculation and return guide explains where to measure and how to compare pressures and return flow during the same print run.": "Wenn der Zwischentank rechtzeitig nachgefüllt wird, Düsen jedoch weiter tropfen oder ausfallen, prüfen Sie das Druckkopfmodell und die Auslegung der Versorgung. Messen Sie bei einem Durchflussdruckkopf den Druck, der den Meniskus an der Düse hält, und die Druckdifferenz, die den Tintenstrom durch den Druckkopf antreibt. Der Leitfaden zu Tintenrezirkulation und Rücklauf zeigt die Messstellen und erklärt, wie sich Drücke und Rücklaufmenge im selben Drucklauf vergleichen lassen.",
  "ink recirculation and return guide": "Leitfaden zu Tintenrezirkulation und Rücklauf",
  "How do you select pumps, tubing assemblies and valves for an existing circuit?": "Wie wählen Sie Pumpen, Schlauchbaugruppen und Ventile für einen vorhandenen Tintenkreislauf aus?",
  "Component selection": "Komponentenauswahl",
  "If the refill volume and time are known, start with diaphragm pump selection. When evaluating the DPL30-DB, run the intended ink through the selected filter at operating temperature and measure how much reaches the secondary tank within the refill window. When modifying tubing or changing tanks frequently, identify the fixed lines and removable connections. If ink flows back after shutdown, flow falls after filtration, or cleaning fluid enters the wrong branch, review filtration, backflow and valve positions. Check wetted tubing, seals and valve chambers against both the ink and the cleaning fluid.": "Wenn Nachfüllvolumen und verfügbare Zeit bekannt sind, beginnen Sie mit der Membranpumpenauswahl. Prüfen Sie die DPL30-DB mit der vorgesehenen Tinte und dem gewählten Filter bei Betriebstemperatur. Messen Sie das Volumen, das in der verfügbaren Zeit den Zwischentank erreicht. Ermitteln Sie bei Änderungen an Leitungen oder häufigem Tankwechsel die fest installierten Leitungen und lösbaren Anschlüsse. Wenn nach dem Abschalten Tinte zurückfließt, der Volumenstrom nach dem Filter sinkt oder Reinigungsflüssigkeit in den falschen Zweig gelangt, prüfen Sie Filtration, Rückfluss und Ventilstellungen. Prüfen Sie die medienberührten Schläuche, Dichtungen und Ventilkammern auf Verträglichkeit mit Tinte und Reinigungsflüssigkeit.",
  "diaphragm pump selection": "Membranpumpenauswahl",
  "DPL30-DB": "DPL30-DB",
  "fixed lines and removable connections": "fest installierten Leitungen und lösbaren Anschlüsse",
  "filtration, backflow and valve positions": "Filtration, Rückfluss und Ventilstellungen",
  "DPL30-DB miniature liquid diaphragm pump": "Miniatur-Flüssigkeitsmembranpumpe DPL30-DB",
  "During refill from the main tank, use the actual ink and filter to measure how long the pump takes to bring the secondary tank to its stop level.": "Messen Sie beim Nachfüllen aus dem Haupttank mit eingesetzter Tinte und Filter, wie lange die Pumpe bis zum Abschaltfüllstand des Zwischentanks benötigt.",
  "FEP flanged tubing assembly": "Konfektionierte FEP-Leitung mit Bördelenden",
  "For a fixed supply line with flat-bottom ports, match the flared FEP sealing face to the fittings at both ends. Size the bore against flow and allowable pressure drop.": "Stimmen Sie bei einer fest eingebauten Zuleitung mit flachem Dichtsitz die gebördelte FEP-Dichtfläche auf die Fittings an beiden Enden ab. Legen Sie den Innendurchmesser anhand von Volumenstrom und zulässigem Druckverlust fest.",
  "SV10-B16-3 three-way barbed solenoid valve": "3-Wege-Magnetventil SV10-B16-3 mit Schlauchtüllen",
  "When the maintenance station shares an inlet line, identify the common port and both branches. Check the amount of residual ink after switching.": "Wenn die Wartungsstation dieselbe Zulaufleitung nutzt, bestimmen Sie den gemeinsamen Anschluss und beide Zweige. Prüfen Sie die Resttintenmenge nach dem Umschalten.",
  "KNF guide to pumps for drop-on-demand inkjet supply, recirculation and maintenance": "KNF-Leitfaden zu Pumpen für Zufuhr, Rezirkulation und Wartung bei Drop-on-Demand-Druckern",
  "Xaar Hydra ink supply system datasheet: meniscus pressure, circulation differential and temperature": "Datenblatt des Xaar-Hydra-Tintenversorgungssystems zu Meniskusdruck, Druckdifferenz im Umlauf und Temperatur",
  "Mimaki UJF-3042/6042 MkII series operation manual, chapter 4: cleaning the nozzles and drain path": "Bedienungsanleitung der Mimaki-Baureihe UJF-3042/6042 MkII, Kapitel 4 zur Reinigung von Düsen und Ablauf",
  "Signs101 operator report: one color drops out during a long print and recovers temporarily after cleaning": "Anwenderbericht auf Signs101 über einen Farbausfall bei einem langen Druckauftrag und die vorübergehende Erholung nach der Reinigung"
};

export const germanInkjetHubHref = '/de/applications/industrial-inkjet-printing/';

export const germanInkjetHubUi = {
  home: 'Startseite', applications: 'Anwendungen', breadcrumb: 'Brotkrümelnavigation', back: 'Zurück',
  navigation: 'Anwendungsleitfäden zum industriellen Tintenstrahldruck',
  guide: 'Anwendungsleitfäden', browse: 'Leitfäden öffnen', close: 'Leitfaden-Navigation schließen',
  onThisPage: 'Auf dieser Seite', references: 'Quellen', viewReferences: 'Quellen anzeigen',
  related: 'Verwandte Leitfäden', sources: 'Quellen', reference: 'Quelle', viewDetails: 'Produktdetails ansehen',
  contactTitle: 'Lassen Sie uns über Ihren Tintenkreislauf sprechen',
  contactDescription: 'Nennen Sie das Druckermodell, die Tinte und Reinigungsflüssigkeit sowie den benötigten Volumenstrom, die Temperatur und den Betriebsdruck.',
  connectionContactDescription: 'Nennen Sie die Schlauchmaße, die Anschlüsse an beiden Enden, die Tinte und Reinigungsflüssigkeit sowie den benötigten Volumenstrom und Druck.',
  contactButton: 'Anwendung besprechen',
} as const;

export const germanInkjetGuideLabel = 'Leitfaden zum Tintenkreislauf';

function translate<T>(value: T): T {
  if (typeof value === 'string') return (germanCopy[value] ?? value) as T;
  if (Array.isArray(value)) return value.map(translate) as T;
  if (value && typeof value === 'object') return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, translate(item)]),
  ) as T;
  return value;
}

export function getGermanInkjetDraftLink(href: string) {
  return getGermanDraftLink(href, germanFittingDraftPathPattern);
}

function translateLinks(block: ApplicationBlock): ApplicationBlock {
  if (block.type === 'links') {
    return { ...block, items: block.items.map(item => {
      const destination = getGermanInkjetDraftLink(item.href);
      return { ...item, href: destination.href, label: destination.hrefLang === 'en' ? item.label + ' (Englisch)' : item.label };
    }) };
  }
  if (block.type !== 'paragraph' || !block.inlineLinks?.length) return block;
  let text = block.text;
  const inlineLinks = block.inlineLinks.map(link => {
    const destination = getGermanInkjetDraftLink(link.href);
    if (destination.hrefLang !== 'en') return { ...link, href: destination.href };
    const label = link.text + ' (Englisch)';
    text = text.replace(link.text, label);
    return { ...link, text: label };
  });
  return { ...block, text, inlineLinks };
}

export function getGermanInkjetHubPage() {
  const page = translate(getLocalizedInkjetPage('en', 'hub'));
  return {
    ...page,
    document: {
      ...page.document,
      intro: page.document.intro.map(translateLinks),
      sections: page.document.sections.map(section => ({ ...section, blocks: section.blocks.map(translateLinks) })),
    },
  };
}
