import { getGermanDiaphragmPumpSelectionCopy } from "@/data/products/selection/diaphragm-pump-selection.de";
import { getGermanPistonPumpSelectionCopy } from "@/data/products/selection/piston-pump-series-copy.de";

import { getMrv3Content } from "@/data/products/detail/mrv3-content";
import { getSolenoidContent } from "@/data/products/detail/solenoid-content";
import { getSolenoidSeriesIntroImage } from "@/data/products/detail/solenoid-images";
import { getMrv3SeriesImage } from "@/data/products/selection/mrv3-series-image";
import { getHpValveIntro } from "@/data/products/selection/hp-valve-intro";
import { getValveSeriesRoute } from "@/data/products/selection/valve-routes";
import { getValvelessLocaleCopy } from "@/data/products/detail/valveless-pump-locales";

import { getGermanSyringeSelectionCopy } from "@/data/products/selection/syringe-pump-selection.de";
import { syringeSeriesFilters } from "@/data/products/selection/syringe-pump-series";

import { getGermanPipettingSelectionCopy } from "@/data/products/selection/pipetting-pump-selection.de";
import { pipettingSeriesFilters } from "@/data/products/selection/pipetting-pump-seo";

type GermanProductCategoryContent = {
  title: string;
  paragraphs: string[];
  imageAlt?: string;
  features?: { title: string; description: string }[];
};

const productOverviews: Readonly<Record<string, GermanProductCategoryContent>> = {
  pumps: {
    title: "Miniatur-Präzisionspumpen für die Fluidik: Mikrodosierung, Förderung und Volumendosierung",
    paragraphs: [
      "FOREACH bietet Kolbenpumpen, Miniatur-Membranpumpen, Pipettierpumpen, ventillose Dosierpumpen und Spritzenpumpen für In-vitro-Diagnostik (IVD), Life Sciences, Laborautomatisierung und Analysengeräte. Wählen Sie eine Baureihe zur Reagenziendosierung, Probenaspiration, Flüssigkeitsförderung oder zum Ansaugen von Gas-Flüssigkeits-Gemischen. Stimmen Sie anschließend die Ansteuerung und Montage auf Ihr Gerät ab.",
      "Vergleichen Sie die Modelle anhand von Dosiervolumen oder Betriebsdurchfluss, Gegendruck und Zykluszeiten. Die Kolbenpumpen der EA-Baureihe decken Volumina von 50 μL bis 20 mL ab. Die DPL60 erreicht im freien Durchfluss 600 mL/min. Der Nenndruck von 600 kPa gilt für die DPL30H. Die ventillosen Pumpen der Reihe RPL-P15 fördern 300–1200 μL/rev. Prüfen Sie die Betriebsdaten der gewählten Konfiguration.",
      "Medienberührte Werkstoffe und Dichtungen unterscheiden sich je nach Baureihe und Modell. Berücksichtigen Sie Zusammensetzung, Konzentration, Viskosität und Temperatur des Mediums, die Kontaktzeit sowie die elektrischen Schnittstellen bei der Auswahl von Pumpenköpfen, Dosierkomponenten, Dichtungen, Leitungen und Anschlüssen. Wenn Dosiergenauigkeit und Wiederholbarkeit entscheidend sind, legen Sie die Spezifikationen und Prüfbedingungen des gewählten Modells zugrunde.",
    ],
  },
  valves: {
    title: "Miniaturventile für die Fluidik: Mehrwegeumschaltung, Hochdruckinjektion und Absperrung",
    paragraphs: [
      "FOREACH bietet Drehwahlventile, Hochdruck-Drehventile und Miniatur-Membranmagnetventile für IVD- und Analysengeräte. Sie dienen zur Auswahl der Flüssigkeitsquelle, zum Umschalten von Reagenzien- und Spülpfaden sowie zur Freigabe und Absperrung des Flüssigkeitsstroms. Ausgewählte Hochdruckausführungen unterstützen das Befüllen von HPLC-Probenschleifen, die Probeninjektion und das Entlüften.",
      "Die Drehventile der MRV3-Baureihe sind mit 10, 16 oder 24 Kanälen und RS232/RS485-Kommunikation verfügbar. Das HP-Ventil mit zwei Schaltstellungen und sechs Anschlüssen hat einen maximalen Betriebsdruck von 25 MPa und ein Innenvolumen von 0.8 μL. Die SV10-Magnetventile sind als stromlos geschlossene oder offene Zweiwegeventile sowie als Dreiwegeventile für einen Betriebsdruck von −75 kPa bis 0.25 MPa erhältlich. Die genannten Angaben gelten jeweils für das betreffende Modell.",
      "Wählen Sie das Ventil anhand des Systemdrucks, der Anforderungen an das Restvolumen, der Schaltzyklen, der stromlosen Stellung, der Anschlussgeometrie und der elektrischen Schnittstellen. Medienberührte Bauteile und Dichtungen richten sich nach der bestellten Ausführung. Prüfen Sie deren Verträglichkeit mit Reagenzien, Proben, mobilen Phasen und Reinigungsflüssigkeiten, bevor Sie das Ventil mit Pumpen, Leitungen und Fittings verbinden.",
    ],
  },
  needles: {
    title: "Kundenspezifische Sonden und Rührpaddel: Probenahme, Ansaugen nach dem Durchstechen, Spülen und Mischen",
    paragraphs: [
      "FOREACH entwickelt kundenspezifische Probenahmesonden, Einstechsonden, Spülsonden und Rührpaddel für automatische Analysengeräte und Liquid-Handling-Systeme. Die Auswahl richtet sich nach der Aufgabe: Aufnahme und Abgabe von Proben oder Reagenzien, Zugang zu verschlossenen Verbrauchsmaterialien, Spülen und Abführen von Abfallflüssigkeiten oder Mischen von Reaktionsflüssigkeiten.",
      "Die Auslegung erfolgt anhand von Gerätezeichnungen oder Mustern. Sondenabmessungen, Spitzen- und Anschlussgeometrie, Befestigungsenden und Paddelform richten sich nach dem Behälter, dem Flüssigkeitspfad und dem verfügbaren Bewegungsraum. Politur, Beschichtungen, Schweißverbindungen und die Eignung für eine kapazitive Flüssigkeitsstandserkennung werden für die gewählte Ausführung und die vorgesehenen Betriebsbedingungen geprüft.",
    ],
  },
  fittings: {
    title: "Mikrofluidik-Fittings: Leitungsverbindungen, Anschlussanpassung und schnelles Verbinden und Trennen",
    paragraphs: [
      "Mikrofluidik-Fittings von FOREACH verbinden Leitungen und passen Geräteanschlüsse in der In-vitro-Diagnostik (IVD), in den Life Sciences, in der Laborautomatisierung und in Analysengeräten an. Sie verbinden Pumpen, Ventile, Fluidikverteiler, Flüssigkeitsbehälter und weitere Geräteanschlüsse in Leitungen zur Reagenzienzufuhr, Probenhandhabung, Spülung, Zirkulation und Entleerung. Das Sortiment unterstützt die interne Leitungsführung, Übergänge zwischen starren und flexiblen Leitungen, Durchführungen durch Gerätewände und abnehmbare Außenleitungen. Fittings und Zubehör ermöglichen gerade Verbindungen, Richtungs- und Größenwechsel sowie das Aufteilen und Zusammenführen von Strömen. Filter und Rückschlagventile können zur Partikelabscheidung und zur Verhinderung von Rückfluss ergänzt werden.",
      "Das Sortiment umfasst Fittings für starre Kapillaren und Rohre, Schlauchtüllen und Schlauchverbinder, Gewinde-Schlauchtüllen, Luer-Verbinder, Schnellverschlusskupplungen, Adapter mit Innengewinde, Schottverschraubungen mit Schlauchtülle, Filter und Rückschlagventile. Fittings für starre Leitungen sind als Flachboden-Fittings für gebördelte Leitungen, mit Klemmkonus, für Klemmring-Dichtsätze und in Hochdruckausführung erhältlich. Für flexible Schläuche stehen gerade, abgewinkelte, T-förmige und reduzierende Ausführungen zur Verfügung. Luer-Verbinder und Schnellverschlusskupplungen bestehen aus passenden Steckern und Buchsen mit den jeweiligen Verriegelungen. Schnellverschlusskupplungen gibt es auch mit oder ohne Absperrventil sowie für den Schalttafeleinbau. Anschlussgewinde umfassen M6×1, 1/4-28 UNF, 10-32 UNF und NPT. Die Anschlussgröße richtet sich nach dem Außendurchmesser (OD) starrer Leitungen oder dem Innendurchmesser (ID) flexibler Schläuche. Für die Durchgangsbohrung stehen mehrere Größen zur Verfügung. Gehäusewerkstoffe sind je nach Modell PP, PA, POM, PVDF, PPS, PEEK oder Edelstahl. Die Dichtungen sind auf Schlauch und Anschluss abgestimmt. Länge, Endanschlüsse, Positionierelemente und Kennzeichnung konfektionierter FEP- und PTFE-Leitungen können kundenspezifisch festgelegt werden.",
      "Hochdruck-Fittings sind für Nenndrücke bis 34 MPa erhältlich. Filter mit HDPE-Filtermedium sind mit Filterfeinheiten von 10 μm, 40–60 μm und 80–100 μm verfügbar. Bei Schnellverschlusskupplungen mit Absperrventil schließt die mit einem Ventil ausgestattete Seite beim Trennen. Rückschlagventile verhindern Rückfluss. Die Komponenten können nach Betriebsdruck, Durchfluss, Druckverlust, Filteranforderungen und Wartungsbedarf kombiniert werden. Die Dichtwirkung hängt von der Leitung, dem Anschluss, der Dichtgeometrie und dem Montageverfahren ab. Berücksichtigen Sie bei der Werkstoffwahl Zusammensetzung, Konzentration und Temperatur der Prozess- und Reinigungsflüssigkeiten sowie deren Kontaktzeit. Stimmen Sie Leitungsgröße, Anschlussausrichtung, Befestigung und Zubehör anschließend auf die Geräteanordnung und den Wartungszugang ab.",
    ],
  },
  tubing: {
    title: "Schläuche und Kapillaren für die Fluidik: Fluorpolymere, PEEK und flexible Schläuche",
    paragraphs: [
      "FOREACH liefert Geräteschläuche und Kapillaren aus PVC, TPU, FEP, PTFE, PEEK und PFA zur Förderung von Flüssigkeiten und Gasen in IVD-Analysatoren, Analysengeräten und Laborsystemen. Vergleichen Sie die Werkstoffe und verfügbaren Modelle nach Medienverträglichkeit, Flexibilität bei der Verlegung, benötigtem Innen- und Außendurchmesser und verfügbarem Bauraum.",
      "Neben Schläuchen und Kapillaren als Einzelkomponenten bietet FOREACH kundenspezifische Leitungskonfektionen mit Bördel- oder Klemmkonus-Anschlüssen an. Mögliche Optionen sind ein- oder beidseitig gebördelte Enden, glockenförmig ausgeformte Schlauchenden, passende Fittings, Dichtungen, Halteelemente und Kennzeichnungen. Die Leitungsabmessungen und Endanschlüsse müssen zu den Geräteanschlüssen passen.",
      "Berücksichtigen Sie vor der Auswahl einer Leitungskonfektion Zusammensetzung und Konzentration des Mediums, Temperatur, Druck oder Vakuum, Leitungslänge, Wandstärke und Biegeradien bei der Verlegung. Durchfluss und Druckverlust hängen von der gesamten Leitung ab. Materialbezogene Dokumente zur Konformität, etwa zu RoHS und REACH, können je nach Werkstoff und Projektanforderungen bereitgestellt werden.",
    ],
  },
  control: {
    title: "Sensor- und Detektionsmodule für die Fluidik: Berührungslose Blasenerkennung und Drucküberwachung",
    paragraphs: [
      "FOREACH bietet Luftblasensensoren und Drucksensoren für In-vitro-Diagnostik (IVD), Life Sciences und automatisierte Analysengeräte. Der ABD erkennt Blasen, Tropfen sowie gas- oder flüssigkeitsgefüllte Abschnitte in transparenten Schläuchen. Der PDM5 misst den Druck im Flüssigkeitspfad. Die Signale unterstützen die Überwachung der Flüssigkeitszufuhr, die Beurteilung von Blockaden und die Meldung von Störungen in der Gerätesteuerung.",
      "Wählen Sie das Modul nach der zu überwachenden Größe, der Position im Flüssigkeitspfad und der benötigten elektrischen Schnittstelle aus. Der ABD nutzt eine berührungslose Infrarotdetektion. Der PDM5 verfügt über einen Flüssigkeitspfad aus PEEK und kommuniziert über I2C. Prüfen Sie die Schlauch- oder Anschlussanforderungen, die Betriebsbedingungen und die Signalverarbeitung des gewählten Modells, bevor Sie es im vollständigen Gerät validieren.",
    ],
  },
};

const fittingTypeOverviews: Readonly<Record<string, GermanProductCategoryContent>> = {
  "hard-tube-fittings": {
    title: "Fittings für starre Kapillaren und Rohre in Gerätefluidiken",
    paragraphs: [
      "FOREACH Fittings für starre Kapillaren und Rohre verbinden [Leitungen aus PTFE, FEP, PFA und PEEK](/en/products/tubing/) in der In-vitro-Diagnostik (IVD), in den Life Sciences, in der Laborautomatisierung und in Analysengeräten. Sie verbinden Pumpen, Ventile, Fluidikverteiler und weitere Geräteanschlüsse in Leitungen zur Reagenzienzufuhr, Probenhandhabung, Spülung, Zirkulation und Entleerung. Unterschiedliche Dichtkonzepte und Endanschlüsse eignen sich für fest verlegte interne Leitungen, beengten Bauraum und abnehmbare Leitungskonfektionen. Hochdruckausführungen kommen in analytischen Flüssigkeitspfaden wie der HPLC zum Einsatz. Wählen Sie die Ausführung für Leitungsverbindungen, Anschlussanpassungen und Abzweige passend zum Systemdruck und zur Anschlussgeometrie.",
      "Zum Sortiment gehören Flachboden-Fittings für gebördelte Leitungen, Fittings mit Klemmkonus, Fittings für Klemmring-Dichtsätze und Hochdruck-Fittings. Flachboden-Fittings dichten über ein vorgebördeltes Leitungsende und eine passende Dichtung am Anschlussboden ab. Ein Klemmkonus fixiert die Leitung ohne vorheriges Bördeln. Bei einem Klemmring-Dichtsatz sichern Fitting, Haltehülse und Scheibe das Leitungsende. Gängige Leitungsaußendurchmesser sind 1.6, 2.0, 2.5, 3.0 und 3.2 mm, mit Gewinden M6×1 oder 1/4-28 UNF und Gehäusen in Standard- oder Kompaktausführung. Hochdruckoptionen umfassen Fittings für Leitungen mit 1.6 mm Außendurchmesser und konische Anschlüsse mit 10-32 UNF sowie gerade Verbinder und T-Stücke für Hochdruckanwendungen. Gehäuse bestehen je nach Bauform und Modell aus PVDF, PPS, PEEK, POM oder Edelstahl. Klemmkonen aus PP und ETFE sind ebenfalls erhältlich. Dichtungen und Klemmring-Dichtsätze müssen zur Anschlussbauform passen. FEP- und PTFE-Schläuche sind als [kundenspezifisch konfektionierte Leitungen](/en/contact/) in festgelegten Längen mit ein- oder beidseitig gebördelten Enden, Klemmring-Anschlüssen, Positionierhülsen und Leitungskennzeichnungen erhältlich.",
      "Hochdruckausführungen sind für Nenndrücke bis 34 MPa erhältlich. Wählen Sie die Konfiguration nach Systemdruck, Modell, Leitung, Anschlussgeometrie und Montageverfahren aus. Die Dichtwirkung hängt vom Zusammenspiel von Leitungsaußendurchmesser, Vorbereitung des Leitungsendes, Dichtungen und Geräteanschluss ab. Ein rechtwinkliger Schnitt und die korrekte Positionierung des Leitungsendes helfen, das Totvolumen am Anschluss zu verringern. Bei manchen Bördel- und Klemmringausführungen kann sich das Fitting relativ zur Leitung drehen, sodass sich die Leitung beim Festziehen weniger verwindet. Diese Verbindungen können entsprechend den Montagevorgaben wiederholt demontiert werden. Beachten Sie bei Klemmkonen die Vorgaben der jeweiligen Bauform für eine einmalige Montage. Wählen Sie medienberührte Leitungen und Dichtungen passend zu Zusammensetzung, Konzentration, Temperatur und Kontaktzeit der Prozess- und Reinigungsflüssigkeiten. Prüfen Sie anschließend Dichtheit und Druckbelastbarkeit der vollständig montierten Leitungskonfektion.",
    ],
  },
  "barbed-fittings": {
    title: "Schlauchtüllen und Schlauchverbinder für flexible Schläuche",
    paragraphs: [
      "Miniatur-Schlauchtüllen und Schlauchverbinder von FOREACH verbinden flexible Schläuche in der In-vitro-Diagnostik (IVD), in den Life Sciences, in der Laborautomatisierung und in Analysengeräten. Sie kommen in Leitungen zur Reagenzienzufuhr, Spülung, Zirkulation, Flüssigkeitsversorgung und Entleerung zum Einsatz. Gerade Verbinder, Winkelstücke, T-Stücke und Stopfen dienen zum Verlängern von Schläuchen, für Übergänge zwischen Schlauchgrößen, für Richtungswechsel bei beengtem Bauraum und für mehrfache Abzweige. Damit lassen sich zwei oder mehr kompatible Silikon-, TPU-, TPE-, PU- oder PVC-Schläuche verbinden und passend zum Geräteaufbau verlegen.",
      "Das Sortiment umfasst gerade Verbinder der Reihe BA, Winkelstücke der Reihe BL, T-Stücke der Reihe BT, Y-Stücke der Reihe BY und Stopfen der Reihe BBL. Gerade Verbinder, Winkelstücke und Verteiler sind mit gleich großen Anschlüssen oder als Reduzierausführung erhältlich. Gerade Verbinder mit gleich großen Anschlüssen verbinden Schläuche mit demselben Innendurchmesser. Reduzierverbinder verbinden unterschiedliche Innendurchmesser, Winkelstücke ändern die Richtung, T- und Y-Stücke teilen oder vereinigen Ströme, und Stopfen verschließen Schlauchenden. Wählen Sie die Tülle nach Schlauchinnendurchmesser aus. Gängig sind 1.6, 2.4, 3.2, 4.0, 4.8 und 6.4 mm. Einige Modelle sind auch für 7.9, 9.5 und 12.7 mm erhältlich. Buchstaben wie C, D, F, V und X nach dem Größencode kennzeichnen unterschiedliche Tüllenausführungen. Die Gehäuse sind unter anderem in PP und PA und in modellabhängigen Farben erhältlich. Bei Verteilern und Reduzierverbindern muss jeder Anschluss zum jeweiligen Schlauch passen.",
      "Die Tülle dichtet an der Schlauchinnenwand ab und hält den Schlauch in Position. Toleranz des Schlauchinnendurchmessers, Wandstärke, Härte und Tüllengeometrie bestimmen zusammen die Aufsteckkraft, Dichtwirkung und Abzugskraft. Bewerten Sie die Druckbelastbarkeit der montierten Verbindung anhand des gewählten Schlauchs, Fittings und Sicherungsverfahrens. Berücksichtigen Sie Druckschwankungen, Vibration und äußere Zugkräfte. Achten Sie bei der Montage auf rechtwinklig geschnittene Schlauchenden, unbeschädigte Tüllenoberflächen, ausreichende Aufstecktiefe und genügend Platz für Schlauchbögen. Verlegen Sie Schläuche so, dass geringe Querkräfte auf das Fitting wirken. Stützen Sie Leitungen ab, die Zugbelastungen oder Vibration ausgesetzt sind. Wählen Sie Fitting- und Schlauchwerkstoffe passend zu Prozess- und Reinigungsflüssigkeit, Temperatur und Kontaktzeit. Planen Sie Prüfung und Austausch der Schläuche nach Betriebsbedingungen und Wartungsintervallen.",
    ],
  },
  "thread-to-barbed-fittings": {
    title: "Gewinde-Schlauchtüllen für Geräteleitungen",
    paragraphs: [
      "Gewinde-Schlauchtüllen von FOREACH verbinden Geräteanschlüsse mit Gewinde mit flexiblen Schläuchen in der In-vitro-Diagnostik (IVD), in den Life Sciences, in der Laborautomatisierung und in Analysengeräten. In Verbindungstechnik-Katalogen wird diese Bauart auch als Schlauchanschluss mit Gewinde bezeichnet. Die Fittings verbinden Pumpen, Ventile, Fluidikverteiler und weitere Fluidikkomponenten mit Gewinde in Leitungen zur Reagenzienzufuhr, Spülung, Zirkulation und Entleerung. Gerade, abgewinkelte und drehbare Ausführungen berücksichtigen die Anschlussausrichtung, den Gehäusebauraum und Übergänge von starren zu flexiblen Leitungen. Modelle mit Innengewinde und Schlauchtülle lassen sich mit kompatiblen Fittings für starre Leitungen kombinieren, um auf einen flexiblen Schlauch überzugehen.",
      "Das Sortiment umfasst die am Gewinde dichtende Bauart SA, die am Anschlussboden dichtende Bauart SB und die Bauart SC mit Innengewinde und Schlauchtülle. Die Standardausführungen der Reihe SA dichten am Gewindeanschluss ab, die SB-Ausführungen am entsprechenden Anschlussboden. Bei SC wird ein passendes Fitting in das Innengewinde und ein flexibler Schlauch auf die Tülle montiert. Modellabhängig stehen M6×1, 1/4-28 UNF, 10-32 UNF, 1/8-27 NPT, 1/4-18 NPT und G1/8 zur Verfügung. Ausführungen mit Tülle passen zu Schläuchen mit 1.6, 2.4, 3.2, 4.8 und 6.4 mm Innendurchmesser. Zu den Gehäusewerkstoffen gehören PP, PA, POM und PVDF. Ausgewählte Modelle sind in PEEK oder mit O-Ring erhältlich. Gerade Fittings führen den Schlauch entlang der Anschlussachse, Winkelstücke ändern die Richtung und drehbare Ausführungen erleichtern die Ausrichtung bei der Montage.",
      "Gewinde- und Tüllenverbindung bestimmen gemeinsam die Dichtwirkung und Druckbelastbarkeit der Baugruppe. Stimmen Sie Gewinde, Dichtfläche und Dichtung auf den Geräteanschluss ab. Zusätzliches Dichtmaterial muss den jeweiligen Montagevorgaben entsprechen. Wählen Sie die Tülle nach Schlauchinnendurchmesser, Wandstärke, Härte und Betriebsdruck. Drehbare Fittings erleichtern die Anpassung der Leitungsführung. Lassen Sie Platz zum Festziehen des Fittings und für Schlauchbögen. Werkstoffe von Fitting, Schlauch und Dichtung müssen für Prozess- und Reinigungsflüssigkeit sowie die Betriebstemperatur geeignet sein. Verwenden Sie ein zur Bauform und zum Werkstoff passendes Anzugsdrehmoment. Zu starkes Anziehen oder Querkräfte des Schlauchs können Kunststoffgewinde und Dichtflächen beschädigen.",
    ],
  },
  "luer-fittings": {
    title: "Luer-Verbinder für Geräteleitungen",
    paragraphs: [
      "Luer-Verbinder von FOREACH schaffen lösbare Flüssigkeitsanschlüsse in der In-vitro-Diagnostik (IVD), in den Life Sciences, in der Laborautomatisierung und in Analysengeräten. Sie verbinden Luer-Stecker und Luer-Buchsen oder adaptieren einen Luer-Anschluss auf einen flexiblen Schlauch. Typische Anwendungen sind Flüssigkeitsentnahme, Reagenzienzufuhr, Probenhandhabung, Spülung und weitere Leitungen, die sich trennen lassen müssen. Verriegelungen und Zubehör ermöglichen Steckverbindungen, Richtungswechsel der Leitungen, Befestigung an einer Gerätewand und Kennzeichnung mehrerer Leitungen. Anschlüsse lassen sich passend zum Geräteaufbau anordnen und für den Schlauchwechsel oder die Wartung lösen.",
      "Das Sortiment umfasst Luer-Stecker und Luer-Buchsen mit festen oder drehbaren Verriegelungsringen sowie Ausführungen mit integrierter Verriegelung. Stecker und Buchsen haben einen Konus mit 6% Steigung und dichten über die aufeinanderliegenden Kegelflächen. Als Zubehör stehen Verriegelungsringe, Befestigungsmuttern für den Schalttafeleinbau und farbige Kennringe zur Verfügung. Verriegelbare Ausführungen werden als Luer-Lock-Verbinder bezeichnet. Der LPS-Ring sitzt fest am Luer-Schaft, der LPR-Ring dreht sich um den Schaft. Luer-Stecker mit integrierter Verriegelung vereinen Gehäuse und Verriegelung. Bei den Buchsen gibt es Standardanschlüsse und PMLS-Modelle für den Schalttafeleinbau. Tüllenausführungen passen zu Schläuchen mit Innendurchmessern von 1.6, 2.4 und 3.2 mm. Gehäuse sind unter anderem in PP, PA und PVDF und in modellabhängigen Farben verfügbar. Stimmen Sie Stecker, Buchsen und Ringe auf die Anschlussbauform ab. Modelle für den Schalttafeleinbau verwenden ein Montagegewinde mit passender Mutter.",
      "Die ineinandergreifenden Kegelflächen dichten ab, und die Verriegelung sichert die Verbindung. Prüfen Sie Dichtwirkung und Druckbelastbarkeit anhand der gewählten Paarung, des Schlauchs, des Betriebsdrucks und der Bedingungen beim Verbinden und Trennen. Drehbare Ringe helfen, die Schlauchausrichtung beim Festziehen beizubehalten. Farbringe kennzeichnen Reagenzien-, Reinigungs- und weitere Leitungen für Anschluss und Wartung. Lassen Sie Raum zum Drehen des Rings, zum manuellen Bedienen und für Schlauchbögen. Halten Sie genügend Abstand zu benachbarten Anschlüssen. Werkstoffe von Fitting und Schlauch müssen für Prozess- und Reinigungsflüssigkeit und die Betriebstemperatur geeignet sein. Prüfen Sie bei häufig getrennten Anschlüssen die Dichtheit und planen Sie die Wartung nach der tatsächlichen Nutzung.",
    ],
  },
  "quick-connect-fittings": {
    title: "Schnellverschlusskupplungen für Flüssigkeitsleitungen",
    paragraphs: [
      "Mikrofluidik-Schnellverschlusskupplungen von FOREACH sind für Leitungen bestimmt, die sich schnell verbinden und trennen lassen müssen. Sie kommen in der In-vitro-Diagnostik (IVD), in den Life Sciences, in der Laborautomatisierung, in Analysengeräten und in weiteren Geräten zum Einsatz. Dazu zählen externe Flüssigkeitsbehälter, Reinigungsflüssigkeitszufuhren, Abfallsammelbehälter, Rezirkulationskreise und entnehmbare Fluidikmodule. Passende Stecker und Kupplungsbuchsen rasten hörbar ein und lassen sich per Druckknopf lösen. Das hörbare Einrasten bestätigt die Verbindung. Die Einhandbedienung erleichtert den Behälterwechsel, die Modulwartung und das Umstecken von Anschlüssen an Gerätewänden. Ausführungen mit Absperrventil eignen sich für Leitungen, bei denen sich beim Trennen eine oder beide Seiten automatisch schließen müssen.",
      "Die Reihen Q20, Q40 und Q60 haben Nennweiten von 1/8, 1/4 beziehungsweise 3/8 Zoll und umfassen Modelle für Schlauchinnendurchmesser von 1.6–6.4 mm, 6.4–9.5 mm beziehungsweise 9.5–19.0 mm. Stecker und Kupplungsbuchsen gibt es mit oder ohne Absperrventil, mit Schlauchtüllen oder Gewindeanschlüssen sowie in gerader, abgewinkelter oder für den Schalttafeleinbau vorgesehener Ausführung. Wählen Sie passende Kupplungshälften derselben Reihe. Jede Hälfte kann einen auf ihre Leitung abgestimmten Schlauchanschluss haben. Die Gehäuse von Q20 und Q40 sind in POM und PP erhältlich, Q60 verwendet PP. POM-Standardmodelle verwenden NBR-Dichtungen, PP-Standardmodelle EPDM-Dichtungen. Für ausgewählte Modelle sind FKM-Dichtungen spezifizierbar. Prüfen Sie Nennweite, Schlauchinnendurchmesser, Gewinde und Montageart separat. Modelle für den Schalttafeleinbau werden mit den zugehörigen Befestigungsmuttern montiert.",
      "Die Standardmodelle Q20 und Q40 in POM oder PP haben einen Betriebsdruck von 8.3 bar, die Modelle Q60-PP von 4.2 bar. Der Betriebstemperaturbereich beträgt für die POM-Modelle Q20 und Q40 −40 bis 82 °C und für die PP-Modelle Q20, Q40 und Q60 −20 bis 71 °C. Wählen Sie die passenden Kupplungshälften anhand von Medium, Dichtungswerkstoff, Betriebstemperatur und Betriebsdruck. Ist nur eine Seite mit einem Ventil ausgestattet, schließt diese beim Trennen. Bei Ventilen auf beiden Seiten schließen beide Seiten. Gelten Grenzwerte für austretende Restflüssigkeit beim Trennen oder für eingetragene Luft beim Wiederverbinden, prüfen Sie die Kupplung unter den tatsächlichen Betriebsbedingungen. Ermitteln Sie das Durchflussverhalten anhand von Anschlussgröße, Ventilkonfiguration und Durchfluss-Druckverlust-Kennlinien. Lassen Sie Platz für die Betätigung des Druckknopfs, das Stecken und Trennen der Kupplung und für Schlauchbögen.",
    ],
  },
  "female-thread-adapters": {
    title: "Fluidik-Verbinder und Adapter mit Innengewinde",
    paragraphs: [
      "Fluidik-Verbinder und Adapter mit Innengewinde von FOREACH verbinden, adaptieren, verzweigen und vereinigen Flüssigkeitsleitungen in der In-vitro-Diagnostik (IVD), in den Life Sciences, in der Laborautomatisierung und in Analysengeräten. Sie nehmen Fittings für starre Leitungen mit Außengewinde oder Gewinde-Schlauchtüllen auf, etwa für Reagenzienzufuhr, Spülung, Zirkulation und weitere Flüssigkeitspfade im Gerät. Verschiedene Kanalführungen und Befestigungsmöglichkeiten unterstützen Leitungsverlängerungen, mehrfache Abzweige und Gerätewand-Durchführungen. Mit passenden Fittings lassen sich starre oder flexible Leitungen anschließen und leichter im Gerät verlegen, verzweigen und befestigen.",
      "Das Sortiment umfasst gerade Standardverbinder der Reihe U, gerade Verbinder mit quadratischem Gehäuse der Reihe US, Schottverbinder der Reihe PMU, T-Stücke der Reihe UT und Y-Stücke der Reihe UY. Gerade Verbinder verbinden zwei Leitungen, T- und Y-Stücke bilden Abzweige und Schottverbinder fixieren die Verbindung an einer Gerätewand. Je nach Modell stehen Innengewinde M6×1 und 1/4-28 UNF sowie Durchgangsbohrungen von 0.5, 1.0, 1.5 und 2.0 mm zur Verfügung. Das Gewinde muss zum Fitting mit Außengewinde passen. Der Bohrungsdurchmesser bezeichnet den inneren Strömungsquerschnitt. Der PMU-M12-U28-20 hat ein Montagegewinde M12×1.5 für den Schalttafeleinbau, Flüssigkeitsanschlüsse mit 1/4-28 UNF Innengewinde und eine Durchgangsbohrung von 2.0 mm. Gehäusewerkstoffe umfassen PP, PPS und POM in modellabhängigen Farben. Wählen Sie passende Fittings und Dichtungen nach der Anschlussgeometrie aus.",
      "Dichtwirkung, Druckbelastbarkeit und Flüssigkeitsrückhalt hängen vom Zusammenspiel von Verbinder, passenden Fittings, Leitungsenden und Dichtungen ab. Wählen Sie die Durchgangsbohrung nach den Innendurchmessern der benachbarten Leitungen, dem benötigten Durchfluss und dem zulässigen Druckverlust. Rechtwinklig geschnittene Leitungsenden und eine korrekte Positionierung helfen, unnötige Hohlräume und zurückbleibende Flüssigkeit zu verringern. Der PMU-M12-U28-20 passt in Gerätewände bis 12.5 mm Dicke und wird mit einer passenden Mutter befestigt. Wählen Sie weitere Modelle nach ihren Einbaumaßen. Die Werkstoffe müssen zu Prozess- und Reinigungsflüssigkeit und Betriebstemperatur passen. Lassen Sie an Abzweigen Platz zum Festziehen der Fittings, zur Leitungsführung und für die Wartung. Prüfen Sie Druckbelastbarkeit und Druckverlust des vollständig montierten Flüssigkeitspfads.",
    ],
  },
  "bulkhead-barbed-fittings": {
    title: "Schottverschraubungen mit Schlauchtülle für den Schalttafeleinbau",
    paragraphs: [
      "Schottverschraubungen mit Schlauchtülle von FOREACH verbinden flexible Schläuche durch eine Gerätewand, ein Gehäuse oder eine interne Trennwand. Sie werden in der In-vitro-Diagnostik (IVD), in den Life Sciences, in der Laborautomatisierung und in Analysengeräten für die Flüssigkeitsversorgung, Spülung, Zirkulation und Entleerung eingesetzt. Das Fitting wird durch eine Montagebohrung geführt und mit einer passenden Mutter befestigt. Die Schläuche werden auf beiden Seiten auf die Tüllen gesteckt. Die Flüssigkeit strömt durch das Fitting über die Gerätewand hinweg. Der feste Anschluss bleibt in Position, und die Schläuche lassen sich auf jeder Seite separat austauschen. So können interne und externe Leitungen verbunden und Anschlüsse an der Gerätewand gruppiert werden.",
      "Das Sortiment umfasst PMB-Schottverschraubungen mit Schlauchtülle und passende Befestigungsmuttern wie die PMBSN. Modelle mit 1/4-28 UNF Montagegewinde passen zu Schläuchen mit 1.6, 2.4 und 3.2 mm Innendurchmesser. Metrische Ausführungen umfassen PMB-M6-40 mit M6-Gewinde für einen Schlauchinnendurchmesser von 4.0 mm, PMB-M10-64 mit M10-Gewinde für 6.4 mm und PMB-M12-79 mit M12-Gewinde für 7.9 mm. Das mittige Gewinde dient zur Befestigung an der Gerätewand. Die beiden Schlauchtüllen verbinden die Schläuche. Prüfen Sie Schlauchinnendurchmesser, Montagebohrung und Befestigungsmutter separat. Je nach Modell sind PP und PA und Farben wie Natur oder Weiß erhältlich. Die Auswahl richtet sich nach Schlauchabmessungen und Geräteaufbau.",
      "Modelle der Reihe PMB-U28 für Schläuche mit Innendurchmessern von 1.6, 2.4 und 3.2 mm passen in Gerätewände bis 3.5 mm Dicke. Wählen Sie Modelle mit metrischem Gewinde nach zulässiger Wandstärke, nutzbarer Montagelänge und Einbaumaßen aus. Prüfen Sie Dichtwirkung und Druckbelastbarkeit anhand von Schlauchinnendurchmesser, Wandstärke, Härte, Tüllengeometrie und Betriebsdruck. Die Befestigungsmutter hält das Fitting in Position. Externe Leitungen, die Zugbelastungen oder Vibration ausgesetzt sind, können eine zusätzliche Abstützung benötigen. Achten Sie auf unbeschädigte Bohrungskanten und Fittingoberflächen. Lassen Sie Platz zum Festziehen der Mutter, für das Aufstecken der Schläuche auf beiden Seiten und für Schlauchbögen. Die Werkstoffe müssen für Prozess- und Reinigungsflüssigkeit und die Betriebstemperatur geeignet sein. Wenn eine Abdichtung zwischen Fitting und Gerätewand erforderlich ist, wählen Sie passende Dichtelemente für das Gehäuse und prüfen Sie deren Funktion in der montierten Baugruppe.",
    ],
  },
  "degassing-modules": {
    title: "Inline-Membranmodule zur Vakuumentgasung",
    paragraphs: [
      "Die Inline-Vakuumentgasung entfernt gelöste Gase während der kontinuierlichen Flüssigkeitszufuhr und verringert die Blasenbildung im nachgeschalteten Flüssigkeitspfad. Im EF-AG3-B strömt die Flüssigkeit an der Außenseite der Hohlfasern entlang. Gelöste Gase treten durch die Membran und werden auf der Vakuumseite abgesaugt. Das Modul kann zur Entgasung der Wasserversorgung von Geräten und der Tintenzufuhr bei industriellen Tintenstrahlsystemen eingesetzt werden. Prüfen Sie bei der Reinwasser- oder Reagenzienzufuhr in biochemischen Analysatoren die Eignung für das Medium und die Betriebsbedingungen.",
      "Die beiden Flüssigkeitsanschlüsse und der Vakuumanschluss haben NPT 1/8 Innengewinde. Der seitliche Anschluss und einer der stirnseitigen Anschlüsse führen Flüssigkeit. Der andere stirnseitige Anschluss wird mit der Vakuumleitung verbunden. Beachten Sie die Anschlusskennzeichnung und lassen Sie Platz für den seitlichen Anschluss und den Ausbau des Moduls. Prüfen Sie die Verträglichkeit der medienberührten Werkstoffe mit Prozess- und Reinigungsflüssigkeiten. Prüfen Sie die Entgasungsleistung und den flüssigkeitsseitigen Druckverlust bei Soll-Durchfluss, vorgesehener Flüssigkeitstemperatur und vorgesehenem Absolutdruck auf der Vakuumseite.",
    ],
  },
  filters: {
    title: "Inline-Filter und Rückschlagventile für Flüssigkeitsleitungen in Geräten",
    paragraphs: [
      "Inline-Filter und Rückschlagventile von FOREACH filtern Partikel und steuern die Durchflussrichtung in der In-vitro-Diagnostik (IVD), in den Life Sciences, in der Laborautomatisierung und in Analysengeräten. Sie werden in Leitungen zur Reagenzienzufuhr, Spülung, Zirkulation und Entleerung eingesetzt. Filter halten Partikel zurück, Rückschlagventile verhindern Rückfluss. Beide Produktarten können je nach benötigter Funktion einzeln oder zusammen eingesetzt werden. Verschiedene Filterbauformen, Ventilmechanismen und Anschlussgrößen ermöglichen die Filtration oder Rückflussverhinderung in flexiblen Geräteleitungen und Wasserkreisläufen.",
      "Das Sortiment umfasst F-PE- und F-PA-Inline-Filter sowie F-SS-Filter für Wasserkreisläufe. Sie verwenden HDPE-Medium, PA-Medium beziehungsweise Edelstahlgewebe, mit modellabhängigen Gehäusen und Anschlüssen. Einige Inline-Filter passen zu Schläuchen mit 2.4 und 3.2 mm Innendurchmesser. Für Wasserkreisläufe gibt es Modelle für 12.7 mm Schlauchinnendurchmesser und Baugruppen mit 3/8-18 NPT Innengewinde, die passende Schlauchtüllen oder Schnellverschlusskupplungen aufnehmen können. Rückschlagventile sind als Membran- oder Entenschnabelventile für Schlauchinnendurchmesser von 1.6, 2.4, 3.2, 4.8, 6.4, 7.9 und 9.5 mm erhältlich. Zu den Gehäusewerkstoffen gehören PP und PVDF und zu den elastomeren Dichtwerkstoffen EPDM und FKM. Für ausgewählte Membran-Rückschlagventile steht auch FFKM zur Verfügung. Wählen Sie die Anschlussgrößen und Werkstoffe passend zum tatsächlichen Flüssigkeitspfad.",
      "Modelle mit HDPE-Medium sind mit Filterfeinheiten von 10 μm, 40–60 μm und 80–100 μm erhältlich. Modelle mit PA-Medium haben eine Filterfeinheit von 250 μm, Modelle mit Edelstahlgewebe für Wasserkreisläufe 150 μm. Wählen Sie Filter anhand der Partikelgröße, des benötigten Durchflusses und des zulässigen Differenzdrucks. Wählen Sie Rückschlagventile anhand von Öffnungsdruck, Durchfluss in Vorwärtsrichtung, Dichtheit gegen Rückfluss und Druckanforderungen. Der Öffnungsdruck ist der Differenzdruck, ab dem das Medium in Vorwärtsrichtung zu strömen beginnt. Beachten Sie die gekennzeichnete Durchflussrichtung und sorgen Sie für Zugang zur Filterprüfung und zum Austausch. Filtermedien, Gehäuse, Membranen oder Entenschnabel-Dichtelemente und Schläuche müssen für Prozess- und Reinigungsflüssigkeit und die Betriebstemperatur geeignet sein. Kombinieren Sie Filter und Rückschlagventile passend zu Durchfluss, Druck und Wartungsbedarf.",
    ],
  },
};

const probeTypeOverviews: Readonly<Record<string, GermanProductCategoryContent>> = {
  "sampling-probes": {
    title: "Probenahmesonden für das automatisierte Liquid Handling",
    imageAlt: "Kundenspezifische Probenahmesonden von FOREACH für Proben und Reagenzien",
    paragraphs: [
      "Probenahmesonden bilden die Schnittstelle zur Flüssigkeit beim Ansaugen und Abgeben von Proben oder Reagenzien in automatisierten Analysengeräten. Wählen Sie die Sonde passend zum Behälter, zum erforderlichen Flüssigkeitsvolumen und zur Bewegung im Gerät aus. Stimmen Sie ihren Anschluss auf den Flüssigkeitspfad ab.",
      "FOREACH entwickelt die Sonde anhand von Zeichnungen oder Mustern und stimmt Abmessungen, Spitzengeometrie und Befestigung auf das Gerät ab. Geben Sie die Medien, den Reinigungsablauf und die Anforderungen an Rückstände an, damit geeignete Oberflächenbehandlungen und eine gegebenenfalls benötigte Schnittstelle zur Flüssigkeitsstandserkennung geprüft werden können.",
    ],
    features: [
      {
        title: "Spitze und Strömungsöffnungen",
        description: "Spitz zulaufende, flache oder V-förmige Sondenspitzen und seitliche Öffnungen werden auf die Ansaug- und Dosieraufgabe, die Position des Behälters und die Fließrichtung abgestimmt.",
      },
      {
        title: "Rohrabmessungen und Befestigungsgeometrie",
        description: "Gleichen Sie Innen- und Außendurchmesser, Gesamt- und Arbeitslänge, Biegungen und Befestigungsenden mit der Gerätezeichnung und dem verfügbaren Bewegungsraum ab.",
      },
      {
        title: "Oberflächenanforderungen und Flüssigkeitsstandserkennung",
        description: "Prüfen Sie Innenwandpolitur, Außenbeschichtungen und die Eignung für die kapazitive Flüssigkeitsstandserkennung anhand des eingesetzten Mediums, des Reinigungsverfahrens und der Gerätesteuerung.",
      },
    ],
  },
  "piercing-probes": {
    title: "Einstechsonden für verschlossene Reagenzien- und Probenbehälter",
    imageAlt: "Kundenspezifische Einstechsonden von FOREACH für verschlossene Verbrauchsmaterialien",
    paragraphs: [
      "Einstechsonden durchdringen Folien oder Stopfen, um Flüssigkeit aus verschlossenen Reagenzienbehältern, Probengefäßen und Verbrauchsmaterialien zu entnehmen. Maßgeblich für die Auslegung sind Werkstoff, Dicke und Einbaulage des zu durchstechenden Verbrauchsmaterials.",
      "Stellen Sie eine Zeichnung oder ein Muster bereit und geben Sie Einstichtiefe, Bewegungsbahn und Flüssigkeitsanschluss an. FOREACH betrachtet Spitze, Sondenkörper und gegebenenfalls vorhandene Entlüftungselemente als Einheit. Die Funktion wird mit dem tatsächlich eingesetzten Verbrauchsmaterial und dem vorgesehenen Ablauf der Flüssigkeitsübertragung geprüft.",
    ],
    features: [
      {
        title: "Einstechspitze",
        description: "Spitzenwinkel und Ausrichtung der Schneide werden gemeinsam mit Einstichkraft, Sondenfestigkeit und dem erforderlichen Bewegungsablauf beurteilt.",
      },
      {
        title: "Flüssigkeits- und Entlüftungswege",
        description: "Seitliche Öffnungen, Entlüftungsbohrungen oder Nuten werden passend zur Ansaugstelle und zu den benötigten Strömungswegen für Flüssigkeit und Luft angeordnet.",
      },
      {
        title: "Einbau im Gerät",
        description: "Prüfen Sie Sondenlänge, Biegungen und Befestigungsenden anhand der Lage des Verbrauchsmaterials, des verfügbaren Bauraums und des Flüssigkeitsanschlusses.",
      },
    ],
  },
  "wash-probes": {
    title: "Spülsonden für Waschstationen in Analysengeräten",
    imageAlt: "Kundenspezifische Spülsonden und Mehrkopf-Spülanordnungen von FOREACH",
    paragraphs: [
      "Spülsonden werden in Waschstationen von Analysengeräten eingesetzt, um Sonden zu reinigen und durchzuspülen sowie Abfall- und Restflüssigkeiten abzusaugen. Bestimmen Sie zunächst den zu reinigenden Bereich und legen Sie die Leitungswege für die Spülmittelzufuhr und die Abfallabsaugung getrennt fest.",
      "FOREACH stimmt die Sondenanordnung auf die Zeichnung der Waschstation, den verfügbaren Bauraum und den Reinigungsablauf ab. Geben Sie die Spül- und Abfallflüssigkeiten, den erforderlichen Durchfluss und die Zykluszeiten an, damit Bohrungspositionen, Anschlüsse und Oberflächenbehandlungen vor der Prüfung des gesamten Reinigungsvorgangs bewertet werden können.",
    ],
    features: [
      {
        title: "Anordnung der Spülköpfe",
        description: "Ausführungen mit einem, zwei oder mehreren Köpfen sowie gebogene Bauformen werden passend zum Stationsaufbau und zur Bewegung der zu reinigenden Bauteile entwickelt.",
      },
      {
        title: "Spül- und Absaugöffnungen",
        description: "Größe, Position und Ausrichtung der Öffnungen werden auf den abzudeckenden Spülbereich, den Abfluss und den vorgesehenen Absaugweg abgestimmt.",
      },
      {
        title: "Eignung für den Reinigungsprozess",
        description: "Schweißverbindungen, Politur und Beschichtungen werden anhand der Zusammensetzung der Spülflüssigkeit, der Eigenschaften der Abfallflüssigkeit und der erforderlichen Lebensdauer geprüft.",
      },
    ],
  },
  "stirring-paddles": {
    title: "Rührpaddel für automatisierte Analysengeräte",
    imageAlt: "Kundenspezifische Rührpaddel von FOREACH für Reaktionsgefäße",
    paragraphs: [
      "Rührpaddel mischen Proben, Reagenzien, Verdünnungsmittel oder Reaktionsflüssigkeiten in den Gefäßen automatisierter Analysengeräte. Wählen Sie die Paddelgeometrie passend zur Gefäßform, zum Arbeitsvolumen und zur verfügbaren Antriebsbewegung aus.",
      "Stellen Sie für eine kundenspezifische Auslegung die Zeichnung des Reaktionsgefäßes, den Drehzahlbereich und die geforderte Mischzeit bereit. Paddel und Befestigungsende werden gemeinsam betrachtet. Mischleistung, Blasenbildung, Spritzer und Rückstände werden mit dem tatsächlich eingesetzten Medium und Gefäß beurteilt.",
    ],
    features: [
      {
        title: "Paddelgeometrie",
        description: "Flache, wendelförmige und im 90-Grad-Winkel ausgeführte Paddel werden nach Flüssigkeit, Gefäß und gewünschter Mischwirkung ausgewählt.",
      },
      {
        title: "Freiraum und Antriebsanschluss",
        description: "Gleichen Sie Paddelabmessungen, Arbeitsposition, Konzentrizität und Befestigungsenden mit Gefäßboden, Flüssigkeitsstand und Bewegungsraum ab.",
      },
      {
        title: "Oberfläche und Reinigung",
        description: "Werkstoffe, Schweißverbindungen und Beschichtungen werden auf Medienverträglichkeit, Reinigungsbedingungen und erforderliche mechanische Festigkeit geprüft.",
      },
    ],
  },
};

const controlTypeOverviews: Readonly<Record<string, GermanProductCategoryContent>> = {
  "air-bubble-detectors": {
    title: "Module zur Luftblasendetektion in transparenten Schläuchen",
    imageAlt: "FOREACH ABD zur Luftblasendetektion in transparenten Schläuchen",
    paragraphs: [
      "Module zur Luftblasendetektion überwachen an einer ausgewählten Stelle in einem transparenten Schlauch, ob sich dort Flüssigkeit befindet. Der FOREACH ABD erkennt per berührungsloser Infrarotdetektion Blasen und Tropfen und unterscheidet Gas von Flüssigkeit, ohne mit dem Medium in Berührung zu kommen.",
      "Wählen Sie die Ausführung passend zum Schlauch und zum Ereignis, das das Gerät erkennen soll. Schlauchwand, optische Eigenschaften des Mediums, Durchflussbedingungen und Montageposition beeinflussen die Erkennung. Signalauswertung und Alarmverarbeitung werden im montierten System geprüft.",
    ],
    features: [
      {
        title: "Passender Schlauch",
        description: "Prüfen Sie Schlauchaußendurchmesser, Wand und Transparenz für die gewählte ABD-Ausführung. Verwenden Sie bei der Prüfung den tatsächlich vorgesehenen Schlauch und das eingesetzte Medium.",
      },
      {
        title: "Detektionsaufgabe",
        description: "Legen Sie fest, ob das Gerät Blasen, Tropfen oder den Wechsel zwischen Gas und Flüssigkeit erkennen soll. Prüfen Sie anschließend die Erkennungs- und Ansprechdaten des Modells.",
      },
      {
        title: "Schnittstelle zur Gerätesteuerung",
        description: "Stimmen Sie die TTL/UART-Anschlüsse, die Modbus RTU-Kommunikation und die IO-Ausgänge der gewählten Ausführung auf die Gerätesteuerung ab.",
      },
    ],
  },
  "pressure-sensors": {
    title: "Drucksensoren für Flüssigkeitspfade in Geräten",
    imageAlt: "FOREACH PDM5-Drucksensor für Flüssigkeitspfade in Geräten",
    paragraphs: [
      "Drucksensoren liefern Messwerte zur Überwachung und Regelung von Flüssigkeitspfaden. Das Druckmessmodul FOREACH PDM5 stellt über I2C ein digitales Drucksignal bereit, das automatisierte Geräte zur Rückmeldung an die Pumpensteuerung, zur Beurteilung von Blockaden und zur Erkennung von Störungen verwenden können.",
      "Wählen Sie Sensorposition und Ausführung nach Betriebsdruck, Druckschwankungen und erforderlichem Ansprechverhalten. Stimmen Sie den Flüssigkeitsanschluss und die medienberührten Werkstoffe auf das System ab. Prüfen Sie anschließend, wie das Gerät das Messsignal für Rückmeldungen und Alarme nutzt.",
    ],
    features: [
      {
        title: "Druck und Abtastung",
        description: "Gleichen Sie Druckbereich und Abtasteinstellungen des PDM5 mit dem erwarteten stationären Druck, den Schwankungen und der Überwachungsaufgabe ab.",
      },
      {
        title: "Flüssigkeitsanschluss",
        description: "Der PEEK-Strömungskanal und die Anschlüsse mit 1/4-28 UNF Innengewinde erfordern kompatible Medien, Fittings und Dichtkonzepte.",
      },
      {
        title: "Systemintegration",
        description: "Prüfen Sie Versorgungsbedingungen, I2C-Kommunikation, Temperatur und Bauraum. Validieren Sie anschließend die Signalauswertung im vollständigen Flüssigkeitspfad.",
      },
    ],
  },
};

const certification = "FOREACH ist nach ISO 9001 und ISO 13485 für Qualitätsmanagementsysteme zertifiziert und unterstützt Prüfungen mit Mustern. Ob Konformitätsunterlagen wie RoHS-Prüfberichte verfügbar sind, wird für das gewählte Modell und die Projektanforderungen geprüft.";

const tubingTypeOverviews: Readonly<Record<string, GermanProductCategoryContent>> = {
  "pvc-tubing": {
    title: "Transparente PVC-Schläuche für die Flüssigkeitsführung, 0.8–19.1 mm Innendurchmesser, 55A/65A",
    imageAlt: "FOREACH PVC-Schläuche in verschiedenen Durchmessern mit farbigen Schlauchenden",
    paragraphs: [
      "Flexible PVC-Schläuche aus Polyvinylchlorid sind transparent und lassen sich leicht in Bögen verlegen. Die Flüssigkeit im Schlauch bleibt sichtbar. Sie bieten eine kostengünstige Lösung für Gas- und Flüssigkeitsanschlüsse sowie Spül- und Abfallleitungen in Instrumenten.",
      "Die Innendurchmesser reichen von 0.8–19.1 mm, die Außendurchmesser von 2.4–25.4 mm. Zur Wahl stehen die Härten 55A und 65A. Der weichere Schlauch mit 55A lässt sich leichter auf Schlauchtüllen aufstecken und flexibel verlegen. 65A ist vergleichsweise fester. Für gleiche Innendurchmesser sind je nach Modell unterschiedliche Wandstärken erhältlich. Die Schläuche werden als Rollenware geliefert. Wählen Sie Schlauchtüllen oder Schnellkupplungen mit Schlauchtülle nach Innendurchmesser, Wandstärke und Härte. Geben Sie Zuschnitt oder Vormontage bei der Angebotsanfrage an.",
      `${certification} PVC wird für längeren Kontakt mit organischen Lösungsmitteln wie Ketonen oder halogenierten Kohlenwasserstoffen nicht empfohlen. Prüfen Sie für Proben- und Reagenzienleitungen Adsorption, extrahierbare Stoffe und die Verträglichkeit mit der verwendeten Schlauchrezeptur und Flüssigkeit.`,
    ],
  },
  "tpu-tubing": {
    title: "TPU-Schläuche aus Polyurethan für die Flüssigkeitsführung, 1.6–7.0 mm Innendurchmesser, 80A/85A/95A",
    imageAlt: "Transparenter FOREACH TPU-Schlauch als Rolle mit freiliegenden Enden",
    paragraphs: [
      "Schläuche aus thermoplastischem Polyurethan (TPU), auch PU-Schläuche genannt, sind abriebfest und haben eine gute elastische Rückstellung. Sie eignen sich für Gasleitungen in Instrumenten, Anschlüsse pneumatischer Komponenten und flexibel verlegte Verbindungen zu beweglichen Teilen. Prüfen Sie für den Flüssigkeitstransfer die Medienverträglichkeit der konkreten Werkstoffqualität.",
      "Die Innendurchmesser reichen von 1.6–7.0 mm, die Außendurchmesser von 3.2–10 mm. Verfügbar sind die Härten 80A, 85A und 95A und je nach Modell die Farben Natur, Rot und Blau. Die Schläuche werden als Rollenware geliefert. Stimmen Sie die Fittings auf Abmessungen, Toleranzen, Härte und Anschlussgeometrie ab. Geben Sie Zuschnitt oder Vormontage bei der Angebotsanfrage an.",
      `${certification} Die Hydrolysebeständigkeit hängt vom TPU-Typ ab. Prüfen Sie bei längerem Kontakt mit Wasser oder Spülflüssigkeit die konkrete Qualität, Temperatur und Kontaktzeit. Berücksichtigen Sie bei beweglichen Anschlüssen außerdem Biegeradius, Bewegungsfrequenz und Befestigung der Enden.`,
    ],
  },
  "fep-tubing": {
    title: "Transparente FEP-Schläuche für Reagenzienleitungen, 0.3–2.0 mm Innendurchmesser, 1.6–3.2 mm Außendurchmesser",
    imageAlt: "Produktfoto eines FOREACH Schlauchs aus Fluorethylenpropylen (FEP)",
    paragraphs: [
      "Schläuche aus Fluorethylenpropylen (FEP), auch F46-Schläuche genannt, sind gut chemikalienbeständig. In transparenten Schläuchen lassen sich Flüssigkeiten und Luftblasen beobachten. Das ist in Reagenzien-, Proben- und Spülleitungen mit Sichtkontrolle relevant. FEP ist in der Regel transparenter als PTFE. Vergleichen Sie die Gasdurchlässigkeit für das vorgesehene Gas bei gleicher Wandstärke und Temperatur.",
      "Die Innendurchmesser reichen von 0.3–2.0 mm, die Außendurchmesser von 1.6–3.2 mm. Die Kombinationen richten sich nach den aufgeführten Größen. Die Schläuche sind als Rollenware oder als konfektionierte Leitungen mit Bördel-, Haltering- oder Klemmringanschluss erhältlich. Klemmringanschlüsse benötigen keine vorbereiteten Bördel. Anschlussvarianten sind für Außendurchmesser von 1.6, 2.0, 2.5, 3.0 und 3.2 mm erhältlich. Leitungslänge und Fittings an den Enden A und B lassen sich nach Zeichnung festlegen.",
      `${certification} Bei der Luftblasenerkennung durch transparentes FEP prüfen Sie die Funktion mit dem gewählten Sensor, den Schlauchabmessungen und dem tatsächlichen Medium. 200 °C ist ein Richtwert für die Temperaturgrenze des Werkstoffs. Der tatsächliche Einsatzbereich hängt von den Temperatur- und Druckgrenzen des Schlauchs und der Fittings ab.`,
    ],
  },
  "ptfe-tubing": {
    title: "Chemikalienbeständige PTFE-Schläuche für die Flüssigkeitsführung, 0.5–4.0 mm Innendurchmesser",
    imageAlt: "FOREACH PTFE-Schläuche als Rollen in Naturfarbe und Schwarz",
    paragraphs: [
      "Schläuche aus Polytetrafluorethylen (PTFE), oft Teflonschläuche genannt, sind gegen die meisten Säuren, Laugen und organischen Lösungsmittel beständig. Der glatte Innenkanal und die niedrige Oberflächenenergie erleichtern das Spülen. In IVD- und Analysengeräten werden sie für Reagenzien-, Spül- und Abfallleitungen eingesetzt.",
      "Die Baureihen TH1 und TH2 sind in Naturfarbe, Schwarz und weiteren modellabhängigen Farben erhältlich. Die Innendurchmesser reichen von 0.5–4.0 mm, die Außendurchmesser von 1.6–6.0 mm. Durchmesserkombinationen und Farben richten sich nach dem Modell. Schwarze PTFE-Schläuche eignen sich für lichtempfindliche Reagenzien. Prüfen Sie den Lichtschutz im relevanten Wellenlängenbereich. Die Schläuche sind als Rollenware und in passenden Größen als konfektionierte Leitungen mit Bördel-, Haltering- oder Klemmringanschluss erhältlich. Länge, ein- oder beidseitiger Anschluss und Fittings an den Enden A und B lassen sich nach Zeichnung festlegen, um den Bearbeitungs- und Montageaufwand vor Ort zu verringern.",
      `${certification} 260 °C ist ein Richtwert für die Temperaturgrenze des PTFE-Werkstoffs. Tatsächliche Betriebstemperatur und Druck hängen von Schlauchabmessungen, Medium und Anschlusskombination ab.`,
    ],
  },
  "peek-tubing": {
    title: 'PEEK-Kapillaren für HPLC, 1/16" und 1/32" Außendurchmesser, 0.8/0.2 mm Innendurchmesser',
    imageAlt: "Produktfoto eines FOREACH Schlauchs aus Polyetheretherketon (PEEK)",
    paragraphs: [
      "Schläuche aus Polyetheretherketon (PEEK) verbinden hohe Festigkeit und Steifigkeit mit guter Beständigkeit gegen viele gängige organische Lösungsmittel. Sie kommen in Flüssigkeitswegen mit kleinem Durchlass in der Flüssigchromatographie und anderen Analysengeräten sowie in Proben- und Reagenzienleitungen zum Einsatz, die nichtmetallische Leitungen erfordern.",
      "Zwei Größen sind als Rollenware erhältlich: 0.2 × 0.8 mm und 0.8 × 1.6 mm (Innen- × Außendurchmesser). Ein kleiner Durchlass erleichtert die Begrenzung des Innenvolumens. Wählen Sie die Abmessungen nach Leitungslänge, Zieldurchfluss und zulässigem Druckverlust. Prüfen Sie passende Fittings oder Adapterhülsen für den Außendurchmesser sowie Anschlussgeometrie und Dichtverfahren.",
      `${certification} PEEK wird für konzentrierte Schwefel- oder Salpetersäure sowie ähnliche Medien nicht empfohlen. Lösungsmittel wie Tetrahydrofuran (THF), Dichlormethan und Dimethylsulfoxid (DMSO) können Quellung oder Festigkeitsverlust verursachen. Prüfen Sie für Hochdruckanwendungen zuerst den zulässigen Betriebsdruck und die Temperatur für die gewählte Schlauchgröße und die Fittings.`,
    ],
  },
  "pfa-tubing": {
    title: 'PFA-Schläuche für Flüssigkeitswege in Analysengeräten, 1/16" Außendurchmesser, 0.5/0.8/1.0 mm Innendurchmesser',
    imageAlt: "Lichtdurchlässiger FOREACH PFA-Schlauch als Rolle mit freiliegendem Ende",
    paragraphs: [
      "PFA-Schläuche aus Perfluoralkoxy-Polymer sind lichtdurchlässig und ähnlich chemikalienbeständig wie PTFE. Der Werkstoff lässt sich durch Schmelzextrusion verarbeiten. Die Schläuche verbinden Korrosionsbeständigkeit mit guten mechanischen Eigenschaften für korrosive Reagenzien und Flüssigkeitsanschlüsse mit kleinem Durchlass in Analysengeräten.",
      "Die Schläuche haben einen Außendurchmesser von 1.6 mm und einen Innendurchmesser von 0.5, 0.8 oder 1.0 mm. Sie sind als Rollenware oder als konfektionierte Leitungen mit Bördel-, Haltering- oder Klemmringanschluss erhältlich. Leitungslänge und Fittings an den Enden A und B lassen sich nach Zeichnung festlegen, um Verlegung und Montage im Gerät zu vereinfachen.",
      `${certification} Prüfen Sie für ICP, andere Spurenanalysesysteme oder Anwendungen mit Anforderungen an extrahierbare Stoffe auch die konkrete Kunststoffqualität, die Reinheitsanforderungen der Verarbeitung und die Prüfunterlagen. Geben Sie Anforderungen an hohe Reinheit oder saubere Verpackung bei der Angebotsanfrage an, damit verfügbare Ausführungen und Unterlagen geprüft werden können.`,
    ],
  },
};

const productTypeOverviews: Readonly<Record<string, Readonly<Record<string, GermanProductCategoryContent>>>> = {
  tubing: tubingTypeOverviews,
  fittings: fittingTypeOverviews,
  needles: probeTypeOverviews,
  control: controlTypeOverviews,
};

export function getGermanProductCategoryContent(
  categoryId: string,
  productTypeId?: string,
  seriesFilter?: string,
): GermanProductCategoryContent | undefined {
  if (categoryId === "pumps" && productTypeId === "plunger-pump") {
    return getGermanPistonPumpSelectionCopy(seriesFilter);
  }
  if (categoryId === "pumps" && productTypeId === "diaphragm-pump") {
    return getGermanDiaphragmPumpSelectionCopy(seriesFilter);
  }
  if (categoryId === "pumps" && productTypeId === "valveless-pump") {
    const copy = getValvelessLocaleCopy("de");
    const intro = seriesFilter === "RPL 无阀泵" ? copy.single : seriesFilter === "DRPL 双头无阀泵" ? copy.dual : copy.category;
    return { ...intro, imageAlt: "Ventillose Kolbendosierpumpen von FOREACH" };
  }
  if (categoryId === "valves" && productTypeId) {
    const series = getValveSeriesRoute(productTypeId)?.slug;
    if (series === "high-pressure-valves") {
      const copy = getHpValveIntro("de");
      return {title:copy.title, paragraphs:copy.paragraphs, imageAlt:copy.image.alt};
    }
    if (series === "rotary-valves") {
      const copy = getMrv3Content(series, "de");
      return copy ? {title:copy.seriesTitle, paragraphs:copy.introParagraphs, imageAlt:getMrv3SeriesImage("de").alt} : undefined;
    }
    if (series === "solenoid-valves") {
      const copy = getSolenoidContent(series, "de");
      return copy ? {title:copy.seriesTitle, paragraphs:copy.introParagraphs, imageAlt:getSolenoidSeriesIntroImage("de").alt} : undefined;
    }
  }
  if (categoryId === "pumps" && productTypeId === "syringe-pump") {
    return getGermanSyringeSelectionCopy(syringeSeriesFilters.indexOf(seriesFilter || ""));
  }
  if (categoryId === "pumps" && productTypeId === "pipette-pump") {
    const index = pipettingSeriesFilters.indexOf(seriesFilter || "");
    return getGermanPipettingSelectionCopy(index === 0 ? "smtp2" : index === 1 ? "smtp4" : "category");
  }
  if (productTypeId) {
    const overviews = Object.hasOwn(productTypeOverviews, categoryId)
      ? productTypeOverviews[categoryId]
      : undefined;
    return overviews && Object.hasOwn(overviews, productTypeId) ? overviews[productTypeId] : undefined;
  }
  return Object.hasOwn(productOverviews, categoryId) ? productOverviews[categoryId] : undefined;
}
