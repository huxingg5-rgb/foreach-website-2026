import { getRplSelectionGuide } from "@/data/resources/technical-articles/rpl-selection-links";
import type { ValvelessLocaleCopy } from "./types";
import { getValvelessPumpNames } from "../valveless-pump-names";

const selectionGuide = getRplSelectionGuide("en").href;

export const de: ValvelessLocaleCopy = {
  ...getValvelessPumpNames("de"),
  category: {
    title: "Ventillose Präzisions-Kolbendosierpumpen",
    metaDescription: "Ventillose Dosierpumpen der Baureihen RPL und DRPL von FOREACH zur Reagenziendosierung, Titration, Abfüllung und Verdünnung. Vergleichen Sie Fördervolumen, Mischungsverhältnisse und medienberührte Werkstoffe.",
    paragraphs: [
      "Ventillose Präzisions-Kolbendosierpumpen von FOREACH saugen Flüssigkeit an und fördern sie durch die kombinierte Dreh- und Hubbewegung eines Keramikkolbens. Sie eignen sich zur Reagenziendosierung, zur Zufuhr von Titriermitteln, zum Abfüllen und zum Ansetzen von Flüssigkeiten in einem definierten Verhältnis. Anwendungsbereiche sind automatisierte Analysengeräte, Laborgeräte zur Flüssigkeitshandhabung und Reagenziendosiersysteme. RPL-Pumpen mit einem Pumpenkopf bedienen einen Flüssigkeitspfad. DRPL-Pumpen mit zwei Pumpenköpfen fördern zwei Flüssigkeiten in einem festgelegten Volumenverhältnis.",
      "Die Bezeichnung richtet sich nach der Aufgabe, beispielsweise Reagenziendosierpumpe, Titriermitteldosierpumpe oder Flüssigkeitsabfüllpumpe. Pumpen mit zwei Köpfen fördern Konzentrat und Verdünnungsmittel proportional, etwa zum Verdünnen eines Konzentrats oder zum Ansetzen eines Puffers. Die Funktionsbezeichnungen beschreiben verschiedene Anwendungen desselben Pumpenprinzips.",
      "Die RPL-Baureihe deckt Fördervolumina von 12–80 μL/rev, 50–300 μL/rev und 300–1200 μL/rev ab. Bei RPL-P6.35 und RPL-P15 lässt sich das Fördervolumen mechanisch einstellen. Die Motordrehzahl wird passend zum benötigten Volumenstrom gewählt. Fördervolumen pro Umdrehung, [Volumen je Dosiervorgang](" + selectionGuide + ") und Volumenstrom pro Minute sind unterschiedliche Größen. Prüfen Sie Genauigkeit und Wiederholbarkeit mit der tatsächlichen Flüssigkeit, dem Gegendruck und dem Betriebsablauf.",
      "Die DRPL-Baureihe ermöglicht die Reagenzienverdünnung, Pufferherstellung und proportionale Dosierung bei Volumenverhältnissen von Konzentrat zu Verdünnungsmittel von 1:9 und 1:19. Geben Sie die Fördermenge beider Pfade, das Verhältnis und die Zykluszeit an. Die Pumpe fördert die beiden Flüssigkeiten. Die nachgeschaltete Zusammenführung und Mischung bestimmen, wie homogen die angesetzte Lösung wird.",
      "RPL-P6.35 verwendet einen Pumpenkopf aus Polyvinylidenfluorid (PVDF) und einen Keramiksatz aus Zirkoniumdioxid (ZrO₂). RPL-P15 verwendet einen Pumpenkopf aus Polyvinylidenfluorid (PVDF) und einen Keramiksatz aus Aluminiumoxid (Al₂O₃). Prüfen Sie alle medienberührten Bauteile auf Verträglichkeit mit Reagenz und Reinigungsflüssigkeit. Planen Sie die Reinigung bei Kristallbildung oder Rückständen. Anschlüsse, Ansteuerung und Montage hängen von Modell und Konfiguration ab.",
      "Geben Sie das benötigte Dosiervolumen oder den Volumenstrom, die Zykluszeit, die Zusammensetzung der Flüssigkeit, den Gegendruck und die Einbaumaße an. Für die proportionale Zubereitung benötigen wir außerdem das Zielvolumenverhältnis und die Fördermenge je Flüssigkeitspfad.",
    ],
  },
  single: {
    title: "RPL Ventillose Kolbendosierpumpen mit einem Pumpenkopf",
    paragraphs: [
      "RPL-Pumpen von FOREACH fördern über einen Flüssigkeitspfad dosierte Mengen in Analysengeräten, Titriergeräten, Labordosiermodulen und Reagenzienabfüllsystemen. RPL-P4, RPL-P6.35 und RPL-P15 decken jeweils 12–80 μL/rev, 50–300 μL/rev und 300–1200 μL/rev ab. Wählen Sie das Fördervolumen anhand von [Dosiervolumen und Zykluszeit](" + selectionGuide + ").",
      "Je nach Aufgabe dient eine RPL-Pumpe zum Dosieren von Reagenz, Titriermittel oder Puffer oder zum volumetrischen Abfüllen. RPL-P4 eignet sich für kleine Fördermengen, RPL-P6.35 zur Reagenzien- und Titriermitteldosierung und RPL-P15 zum Abfüllen und Zuführen bei größerem Fördervolumen pro Umdrehung.",
      "Bei RPL-P6.35 und RPL-P15 lässt sich das Fördervolumen mechanisch einstellen. Zusammen mit der Motordrehzahl ergibt sich der Volumenstrom. Das Fördervolumen pro Umdrehung ist eine andere Größe als das kleinste zuverlässig dosierbare Volumen. Prüfen Sie die tatsächliche Fördermenge mit der Flüssigkeit, dem Gegendruck und dem Dosierablauf des vorgesehenen Systems.",
      "Die RPL-P6.35 hat einen Pumpenkopf aus Polyvinylidenfluorid (PVDF), einen Keramiksatz aus Zirkoniumdioxid (ZrO₂) und einen Prozessanschluss mit 1/4-28 UNF-2B. Die RPL-P15 hat einen Pumpenkopf aus Polyvinylidenfluorid (PVDF), einen Keramiksatz aus Aluminiumoxid (Al₂O₃) und einen Prozessanschluss mit G1/8. Prüfen Sie die Anforderungen an Reinigung, Leitungen und Montage der gewählten Ausführung.",
    ],
  },
  dual: {
    title: "DRPL Ventillose Kolbendosierpumpen mit zwei Pumpenköpfen",
    paragraphs: [
      "DRPL-Pumpen von FOREACH fördern zwei Flüssigkeiten proportional in Verdünnungsmodulen für Analysengeräte, Laborgeräten und Anlagen zur Reagenzienherstellung. Das Volumenverhältnis von Konzentrat zu Verdünnungsmittel beträgt bei DRPL-0109 1:9 und bei DRPL-0119 1:19.",
      "Je nach Aufgabe wird die Ausführung als Pumpe zur Konzentratverdünnung, Proportionaldosierpumpe oder Zweikanal-Dosierpumpe eingesetzt. Sie fördert Konzentrat und Verdünnungsmittel im erforderlichen Verhältnis zur Reagenzienverdünnung, zum Ansetzen von Puffern und zur proportionalen Dosierung.",
      "1:9 bedeutet ein Teil Konzentrat und neun Teile Verdünnungsmittel. 1:19 bedeutet ein Teil Konzentrat und neunzehn Teile Verdünnungsmittel. Legen Sie die Fördermengen beider Pfade, das Gesamtvolumen und die Zykluszeit fest. Proportionale Förderung und Mischung sind getrennte Funktionen. Prüfen Sie die Homogenität mit der nachgeschalteten Fluidik.",
      "Geben Sie Zusammensetzung, Viskosität, Einlassbedingungen und Gegendruck am Auslass für jede Flüssigkeit an. Ergänzen Sie das Verhältnis, die Leitungen, die Ansteuerung und den verfügbaren Bauraum. Prüfen Sie Werkstoffe und Konfiguration beider Pfade getrennt.",
    ],
  },
  materials: { pvdf: "Polyvinylidenfluorid (PVDF)", alumina: "Aluminiumoxid (Al₂O₃)", zirconia: "Zirkoniumdioxid (ZrO₂)" },
  cards: {
    p4: "Ventillose Miniaturkolbenpumpe P4 zur Reagenzdosierung in Analysengeräten",
    p635: "Ventillose OEM-Drehkolbenpumpe P6.35 für die Flüssigkeitshandhabung im Labor",
    p15: "Dosierpumpe mit Keramikkolben P15 zur Reagenzabfüllung in den Lebenswissenschaften",
    dual9: "Keramikkolbenpumpe DRPL-0109 mit zwei Pumpenköpfen zur Reagenzverdünnung in der In-vitro-Diagnostik",
    dual19: "Kolbenpumpe DRPL-0119 mit zwei Pumpenköpfen zur proportionalen Dosierung im Labor",
  },
  introductions: {
    p4: {
      title: "RPL-P4 Ventillose Miniaturkolbenpumpe zur Reagenziendosierung in Analysengeräten",
      paragraphs: [
        "RPL-P4 ist eine ventillose Miniatur-Dosierpumpe mit Keramikkolben. Sie dient zur Reagenziendosierung in Analysengeräten für die In-vitro-Diagnostik und klinische Chemie, zur Titriermitteldosierung und zum Abfüllen kleiner Mengen in Fläschchen und Reagenzienröhrchen. Das Fördervolumen beträgt 12–80 μL/rev, die Betriebsdrehzahl 5–300 rpm und der Volumenstrom 0.06–24 mL/min.",
        "Der Keramikkolben dreht sich im Zylinder und führt eine Hubbewegung aus. Dadurch verbindet er die Pumpenkammer abwechselnd mit dem Einlass und dem Auslass. Die Pumpe fördert Flüssigkeit und schaltet die Anschlüsse um, ohne dass separate Rückschlagventile am Einlass oder Auslass eingebaut und gewartet werden müssen. Das kleine Fördervolumen eignet sich zum Dosieren geringer Mengen. Fördervolumen und Anzahl der Umdrehungen ergeben die rechnerische Dosis. Die Drehzahl bestimmt die Förderzeit.",
        "Die abgebildete Ausführung hat einen Pumpenkopf aus Polyvinylidenfluorid (PVDF) und einen Satz aus Kolben und Zylinder aus Aluminiumoxid-Keramik (Al₂O₃). Die Flüssigkeitsanschlüsse mit 1/4-28 UNF-2B nehmen passende Flachdichtungsfittings und Leitungsanschlüsse auf. Mit 57 × 57 × 115 mm und 500 g eignet sich die Pumpe für Reagenziendosiermodule mit begrenztem Bauraum.",
      ],
      commonApplications: [
        "Automatisierte Analysengeräte: Zuführen und Dosieren kleiner Reagenzienmengen",
        "Automatische Titriergeräte: Zufuhr und schrittweise Dosierung des Titriermittels",
        "Laborabfüllsysteme: volumetrisches Abfüllen in Fläschchen und Reagenzienröhrchen",
      ],
      metaDescription: "Ventillose Dosierpumpe RPL-P4 mit Keramikkolben und 12–80 μL/rev zur Reagenziendosierung kleiner Mengen und zur Titration. PVDF-Kopf und Aluminiumoxid-Keramiksatz.",
    },
    p635: {
      title: "RPL-P6.35 Ventillose OEM-Drehkolbenpumpe zur Flüssigkeitshandhabung im Labor",
      paragraphs: [
        "RPL-P6.35 ist eine ventillose Dosierpumpe mit einem Pumpenkopf und einem Keramikkolben. Das Fördervolumen lässt sich mechanisch von 50 bis 300 μL/rev einstellen. Bei 5–300 rpm beträgt der Volumenstrom 0.25–90 mL/min. Zu den Anwendungen zählen Reagenzienzufuhr und aufeinanderfolgende Dosierschritte in Analysengeräten, Titriermittelzufuhr sowie das volumetrische Abfüllen in Reagenzienröhrchen und kleine Flaschen.",
        "Die kombinierte Dreh- und Hubbewegung des Kolbens übernimmt Ansaugen, Fördern und Umschalten der Anschlüsse ohne separate Rückschlagventile. Die mechanische Einstellung verändert den Kolbenhub und das Fördervolumen pro Umdrehung. Die Anzahl der Umdrehungen bestimmt das rechnerische Dosiervolumen, die Drehzahl die Förderzeit. Wählen Sie bei Geräten mit mehreren Füllvolumina eine Einstellung passend zu Volumen und Zykluszeit und kalibrieren Sie die Förderung in dieser Einstellung.",
        "Die abgebildete Ausführung hat einen Pumpenkopf und Verschlussstopfen aus Polyvinylidenfluorid (PVDF) sowie einen Satz aus Kolben und Zylinder aus Zirkoniumdioxid-Keramik (ZrO₂). Prozess- und Spülanschlüsse haben 1/4-28 UNF-2B. Der separate Spülkreis ermöglicht das Spülen des Kolbenbereichs bei salzhaltigen oder zur Kristallbildung neigenden Flüssigkeiten. Die Pumpe misst 78 × 78 × 145 mm, wiegt 750 g und ist für die OEM-Integration in Analysengeräte und automatische Labordosiermodule vorgesehen.",
      ],
      commonApplications: [
        "Automatisierte Analysengeräte: Reagenzienzufuhr und Dosieren in mehreren Stufen",
        "Labortitriergeräte: Zufuhr und Dosierung von Titriermitteln",
        "Reagenzienabfüllsysteme: volumetrisches Befüllen von Röhrchen und kleinen Flaschen",
      ],
      metaDescription: "Ventillose Dosierpumpe RPL-P6.35, 50–300 μL/rev, zur Reagenziendosierung, Titration und Abfüllung. PVDF-Kopf, Zirkoniumdioxid-Keramiksatz und Kolbenspülanschlüsse.",
    },
    p15: {
      title: "RPL-P15 Dosierpumpe mit Keramikkolben zur Reagenzienabfüllung in den Life Sciences",
      paragraphs: [
        "RPL-P15 ist eine ventillose Dosierpumpe mit Keramikkolben für größere Dosiervolumina und höhere Fördermengen. Das mechanisch einstellbare Fördervolumen von 300–1200 μL/rev ergibt bei 5–300 rpm einen Volumenstrom von 1.5–360 mL/min. Typische Aufgaben sind das Abfüllen diagnostischer Reagenzien, die Pufferdosierung, das Nachfüllen von Vorratsbehältern und die dosierte Flüssigkeitszufuhr in Analysengeräte.",
        "Der Keramikkolben saugt und fördert Flüssigkeit durch seine Dreh- und Hubbewegung und schaltet dabei die Anschlüsse ohne separate Rückschlagventile um. Bei größerem Fördervolumen sind für dieselbe Füllmenge weniger Umdrehungen nötig. Beispielsweise ergeben 10 Umdrehungen bei 1000 μL/rev rechnerisch 10 mL. Für unterschiedliche Füllmengen lassen sich die Umdrehungszahl oder das Fördervolumen ändern. Anschließend wird die Fördermenge im vorgesehenen Füllzyklus kalibriert.",
        "Die abgebildete Ausführung verbindet einen Pumpenkopf und Verschlussstopfen aus Polyvinylidenfluorid (PVDF) mit einem Kolben und Zylinder aus Aluminiumoxid-Keramik (Al₂O₃). Die Prozessanschlüsse G1/8 verbinden den Arbeitskreis. Die Spülanschlüsse mit 1/4-28 UNF-2B ermöglichen das Spülen des Kolbenbereichs, um Ablagerungen und Kristallbildung zu begrenzen. Die Pumpe misst 78 × 78 × 160 mm und wiegt 900 g.",
      ],
      commonApplications: [
        "Reagenzienabfüllsysteme: volumetrisches Befüllen von Flaschen",
        "Laborarbeitsplätze zur Flüssigkeitsvorbereitung: Dosieren vorgemischter Puffer und Nachfüllen von Vorratsbehältern",
        "Versorgungsmodule für Analysengeräte: dosierte Flüssigkeitszufuhr",
      ],
      metaDescription: "Ventillose Dosierpumpe RPL-P15, 300–1200 μL/rev, zur Reagenzienabfüllung und Pufferdosierung. PVDF-Kopf, Aluminiumoxid-Keramiksatz und Kolbenspülanschlüsse.",
    },
    dual9: {
      title: "DRPL-0109 Keramikkolbenpumpe mit zwei Pumpenköpfen zur Reagenzienverdünnung in der In-vitro-Diagnostik",
      paragraphs: [
        "DRPL-0109 ist eine ventillose Dosierpumpe mit Keramikkolben und zwei Pumpenköpfen zur Förderung von Konzentrat und Verdünnungsmittel im Volumenverhältnis 1:9. Die abgebildete Ausführung fördert 100 μL + 900 μL pro Umdrehung. Bei 60–300 rpm beträgt der gemeinsame Volumenstrom 60–300 mL/min. Sie dient zum Verdünnen von Reagenzienkonzentraten und Spüllösungen im Gerät, zum Ansetzen von Puffern in einem festen Verhältnis und zur proportionalen Dosierung bei der Reagenzienherstellung.",
        "Ein gemeinsamer Antrieb betreibt beide Pumpenköpfe. Dadurch entfällt die Synchronisierung zweier separater Pumpenantriebe. Jeder Keramikkolben führt eine Dreh- und Hubbewegung aus, um seine Flüssigkeit zu dosieren. Die Drehzahl ändert den Gesamtvolumenstrom. Die eingestellten Fördervolumina bestimmen das Nennvolumenverhältnis. Ein Teil Konzentrat und neun Teile Verdünnungsmittel können aus einer geeigneten 10×-Formulierung eine 1×-Arbeitslösung ergeben. Die Mischung erfolgt nach der Pumpe.",
        "Kanal A hat Prozessanschlüsse mit 1/4-28 UNF-2B, Kanal B hat G1/8-Prozessanschlüsse mit serienmäßigen metallischen Steckanschlüssen. Beide Kanäle haben Spülanschlüsse mit 1/4-28 UNF-2B. Die Baugruppe misst 180 × 83.7 × 75 mm. Verbinden Sie die Auslässe mit nachgeschalteten Komponenten zur Zusammenführung und Mischung. Kalibrieren Sie beide Kanäle einzeln und prüfen Sie Konzentration und Homogenität der hergestellten Lösung.",
      ],
      commonApplications: [
        "Automatisierte Analysengeräte: Inline-Reagenzienverdünnung im Verhältnis 1:9 von Konzentrat zu Verdünnungsmittel",
        "Laborgeräte zur Flüssigkeitsvorbereitung: Ansatz von Puffern in einem festen Verhältnis",
        "Reagenzienherstellung: proportionale Chargendosierung zweier Flüssigkeiten",
      ],
      metaDescription: "Ventillose Dosierpumpe DRPL-0109 mit zwei Pumpenköpfen für die Dosierung von Konzentrat und Verdünnungsmittel im Verhältnis 1:9. Für Reagenzienverdünnung und Pufferherstellung.",
    },
    dual19: {
      title: "DRPL-0119 Kolbenpumpe mit zwei Pumpenköpfen zur proportionalen Dosierung im Labor",
      paragraphs: [
        "DRPL-0119 ist eine ventillose Dosierpumpe mit Keramikkolben und zwei Pumpenköpfen zur Konzentratverdünnung im Volumenverhältnis 1:19. Die abgebildete Ausführung fördert 60 μL + 1140 μL pro Umdrehung. Bei 60–300 rpm beträgt der gemeinsame Volumenstrom 72–360 mL/min. Sie dient zur Verdünnung von 20×-Reagenzien und Spülkonzentraten in Analysengeräten, zum Ansatz von Arbeitslösungen im Labor und zur Dosierung zweier Flüssigkeiten in einem festen Verhältnis.",
        "Beide Pumpenköpfe nutzen einen gemeinsamen Antrieb. Die Keramikkolben dosieren die Flüssigkeiten durch ihre Dreh- und Hubbewegung. Beim Verhältnis 1:19 ergeben ein Teil Konzentrat und neunzehn Teile Verdünnungsmittel die Arbeitskonzentration, sofern die Formulierung auf die Verdünnung eines 20×-Konzentrats ausgelegt ist. Bei gleichem Endvolumen und gleicher Zielkonzentration benötigt eine 20×-Formulierung halb so viel Konzentrat wie eine 10×-Formulierung. Dadurch lässt sich der Konzentratbehälter kleiner auslegen oder bei gleicher Behältergröße seltener nachfüllen.",
        "Kanal A hat Prozessanschlüsse mit 1/4-28 UNF-2B, Kanal B hat G1/8-Prozessanschlüsse mit serienmäßigen metallischen Steckanschlüssen. Beide Kanäle haben Spülanschlüsse mit 1/4-28 UNF-2B. Mit 180 × 83.7 × 75 mm hat die Baugruppe dieselben Außenabmessungen wie DRPL-0109. Da pro Umdrehung nur 60 μL Konzentrat gefördert werden, kalibrieren Sie beide Kanäle einzeln. Der Gesamtvolumenstrom allein belegt das Verdünnungsverhältnis nicht. Nachgeschaltete Mischung und Ansatzreihenfolge bestimmen die Homogenität der Lösung.",
      ],
      commonApplications: [
        "Automatisierte Analysengeräte: Reagenzienverdünnung im Verhältnis 1:19 von Konzentrat zu Verdünnungsmittel",
        "Systeme zur Laborvorbereitung: Ansatz von Arbeitslösungen in einem festen Verhältnis",
        "Reagenzienherstellung: proportionale Chargenförderung von Konzentrat und Verdünnungsmittel",
      ],
      metaDescription: "Ventillose Dosierpumpe DRPL-0119 mit zwei Pumpenköpfen für die Dosierung von Konzentrat und Verdünnungsmittel im Verhältnis 1:19 zur Verdünnung und Herstellung von Arbeitslösungen.",
    },
  },
  intros: {
    p4: "RPL-P4 dosiert kleine Mengen über einen Flüssigkeitspfad. Je nach Aufgabe dient sie als Reagenziendosierpumpe, Titriermitteldosierpumpe oder volumetrische Abfüllpumpe. Diese Namen bezeichnen Anwendungen desselben Pumpenprinzips. Die folgenden Beispiele verbinden Dosiervolumen, Betriebsablauf und verfügbare Zeit.",
    p635: "RPL-P6.35 dient zur Reagenziendosierung und zum Abfüllen über einen Flüssigkeitspfad. Reagenziendosierpumpe, Titriermitteldosierpumpe und Reagenzienabfüllpumpe bezeichnen die jeweilige Aufgabe. Da ihr Fördervolumen größer als das der RPL-P4 ist, wählen Sie das Modell anhand des benötigten Volumens und der verfügbaren Zeit.",
    p15: "RPL-P15 eignet sich für Förder- und Abfüllaufgaben mit größerem Fördervolumen pro Umdrehung. Sie lässt sich zur Reagenzienabfüllung, zur Pufferdosierung oder als Dosierpumpe zur Flüssigkeitsversorgung einsetzen. Beim Abfüllen ist das Volumen pro Behälter maßgeblich, bei kontinuierlicher Zufuhr das Volumen pro Zeiteinheit. Zum Nachfüllen eines Vorratsbehälters ist die Füllstandssteuerung abzustimmen.",
    dual: "{{model}} bereitet zwei Flüssigkeiten im Volumenverhältnis von Konzentrat zu Verdünnungsmittel von {{ratio}} vor. Je nach Aufgabe dient die Ausführung als Pumpe zur Konzentratverdünnung, Proportionaldosierpumpe oder Zweikanal-Dosierpumpe. {{ratio}} bezeichnet das Volumenverhältnis der Flüssigkeiten. Daraus folgt weder eine Drehzahleinstellung noch ein Endvolumen vom nur {{parts}}-Fachen des Konzentratvolumens.",
  },
  reagentSetup: {
    p4: "Befüllen und entlüften Sie den Flüssigkeitspfad bei der Inbetriebnahme. Legen Sie das Fördervolumen und die Anzahl der Umdrehungen fest, erfassen Sie mehrere Dosierungen und korrigieren Sie die Abgabemenge. Vergleichen Sie den kontinuierlichen Betrieb mit der ersten Dosis nach einer Pause. Prüfen Sie bei einer Abweichung Luftblasen, Tropfen an der Spitze und den Rückzug der Flüssigkeit. Die Reagenzienzufuhr aus einem Vorratsbehälter unterscheidet sich vom Ansaugen und Überführen einer Probe.",
    p635: "Das Befüllen des Prozesskreises und das Spülen am Kolben sind getrennte Arbeitsschritte. Beim Befüllen entsteht eine stabile Flüssigkeitssäule. Der Spülkreis entfernt Rückstände im Kolbenbereich. Wählen Sie bei salzhaltigen oder kristallisierenden Reagenzien eine geeignete Reinigungsflüssigkeit und einen passenden Abschaltablauf. Ein Spülanschluss allein belegt keine Beständigkeit gegenüber korrosiven Medien.",
  },
  applications: {
    reagent: {
      title: "Automatisierte Analytik und In-vitro-Diagnostik: Reagenziendosierung",
      paragraphs: [
        "In automatisierten Analysengeräten und IVD-Reagenzienkreisen fließt die Flüssigkeit aus einer Reagenzienflasche durch Pumpe, Leitungen und Dosierspitze in ein Reaktionsgefäß. Die Pumpe kann als Reagenzienzuführ- oder Reagenziendosierpumpe bezeichnet werden. Legen Sie das benötigte Volumen und die verfügbare Zeit je Analyseschritt zusätzlich zum Volumenstrom pro Minute fest.",
        "Das Fördervolumen und die Anzahl vollständiger Umdrehungen bestimmen das Nenndosiervolumen. Rechenbeispiel: {{exampleQ}} μL/rev × 5 Umdrehungen = {{exampleDose}} μL. Bei konstanten 150 rpm dauern diese Umdrehungen 2 Sekunden, ohne Beschleunigung, Anhalten und weitere Maschinenbewegungen. Der Wert dient zur Auslegung. Kalibrieren Sie die Fördermenge nach einer Änderung des Fördervolumens erneut.",
        "{{reagentSetup}}",
      ],
    },
    titration: {
      title: "Automatische Titration: schrittweise Dosierung des Titriermittels",
      paragraphs: [
        "In Labortitriergeräten fördert eine Titriermitteldosierpumpe unter Gerätesteuerung Flüssigkeit in das Titriergefäß. Der Zyklus umfasst Zugabe, Mischen und Elektrodenreaktion. Danach entscheidet das Gerät über die nächste Zugabe. Die Pumpe fördert die Flüssigkeit, das Gerät ermittelt den Endpunkt.",
        "Legen Sie die anfängliche Fördergeschwindigkeit und den kleinsten zuverlässigen Dosierschritt nahe dem Endpunkt getrennt fest. Bei gleichem Fördervolumen und gleicher Anzahl vollständiger Umdrehungen verlängert eine geringere Drehzahl vor allem die Förderzeit. {{minimum}} μL/rev bezeichnet die Untergrenze des Fördervolumenbereichs. Der kleinste zuverlässige Titrierschritt ist durch Messung zu bestimmen. Das Teilen der Angabe durch Motorschritte ergibt keine beliebig kleinen Dosen.",
        "Sammeln und messen Sie wiederholt die angestrebten Dosierschritte mit dem tatsächlichen Titriermittel, der Spitze und der Leitung. Prüfen Sie nach dem Stopp zurückbleibende Tropfen und planen Sie Zeit zum Mischen und für stabile Messwerte ein. Antriebspositionierung sowie Start- und Stoppverhalten müssen den Ablauf unterstützen. Die Pumpengenauigkeit allein gibt die analytische Genauigkeit des Titriergeräts nicht an.",
      ],
    },
    smallfill: {
      title: "Reagenzienherstellung und Labordosierung: Abfüllen in kleine Gefäße",
      paragraphs: [
        "An einer Abfüllstation für kleine Fläschchen oder Reagenzienröhrchen kommt die RPL-P4 als Reagenzienabfüllpumpe oder volumetrische Dosierpumpe infrage. Nach der Flüssigkeitsabgabe positioniert das Gerät das nächste Gefäß. Prüfen Sie das tatsächlich im Gefäß ankommende Volumen im Dauerbetrieb und nach Pausen.",
        "Teilen Sie die Zykluszeit in Pumpenförderung, Gefäßpositionierung, Spitzenbewegung und Beruhigungszeit auf. Im Beispiel mit 400 μL bei 80 μL/rev und 150 rpm entsprechen 2 Sekunden der theoretischen Pumpenlaufzeit. Daraus lassen sich 30 Flaschen pro Minute nicht ableiten. Ist der Zyklus zu lang, prüfen Sie Fördervolumen, Antriebsdrehzahl und Stationsbewegung gemeinsam.",
        "Messen Sie die ersten Füllungen, aufeinanderfolgende Füllungen und die erste Füllung nach einer Pause getrennt. Rechnen Sie bei gravimetrischen Messungen die mit einer geeigneten Waage ermittelte Masse anhand der Flüssigkeitsdichte bei Prüftemperatur in Volumen um. Prüfen Sie bei schäumenden oder wandbenetzenden Flüssigkeiten außerdem, ob Flüssigkeit an der Spitze zurückbleibt und ob der ganze Tropfen ins Gefäß gelangt.",
      ],
    },
    midfill: {
      title: "Reagenziendosierung: Abfüllstationen für Mikroliter bis Milliliter",
      paragraphs: [
        "Beim wiederholten Befüllen von Reagenzienröhrchen und kleinen Flaschen kann die RPL-P6.35 als Reagenzienabfüllpumpe oder Flüssigkeitsdosierpumpe eingesetzt werden. Eine Füllung kann aus einer oder mehreren vollständigen Umdrehungen bestehen. Stimmen Sie Förderzeit, Gefäßpositionierung und Bewegung der Dosierspitze aufeinander ab.",
        "Rechenbeispiel: Bei 200 μL/rev erfordert ein Nennfüllvolumen von 1 mL insgesamt 5 Umdrehungen. Bei konstanten 150 rpm beträgt die theoretische Pumpenlaufzeit 2 Sekunden. Die Zykluszeit der Station umfasst zusätzlich Positionierung, Spitzenbewegung und Beruhigungszeit. Füllrate und Genauigkeit sind im Betrieb zu prüfen.",
        "Prüfen Sie aufeinanderfolgende Füllungen und Füllungen nach dem Neustart mit der vorgesehenen Leitung und Dosierspitze. Achten Sie auf Nachtröpfeln und Schaum. Prüfen Sie PVDF-Pumpenkopf, Zirkoniumdioxid-Keramiksatz (ZrO₂), Anschlüsse, Leitungen und alle weiteren medienberührten Teile auf Verträglichkeit mit Reagenz und Reinigungsflüssigkeit.",
      ],
    },
    largefill: {
      title: "Herstellung diagnostischer Reagenzien: volumetrische Flaschenabfüllung",
      paragraphs: [
        "Bei der Reagenzienherstellung und Laborabfüllung fließt die Flüssigkeit aus einem Vorratsbehälter durch Pumpe und Füllspitze in die Flasche. Für diese Aufgabe kommt die RPL-P15 als Reagenzienabfüllpumpe oder volumetrische Dosierpumpe infrage. Stimmen Sie das Volumen je Gefäß auf die Zykluszeit ab. Für dieselbe Füllmenge sind je nach eingestelltem Fördervolumen unterschiedlich viele Umdrehungen nötig.",
        "Rechenbeispiel: Bei 1000 μL/rev erfordern nominal 5 mL insgesamt 5 vollständige Umdrehungen. Bei konstanten 150 rpm beträgt die theoretische Pumpenlaufzeit 2 Sekunden. Hinzu kommen Gefäßpositionierung, Beschleunigung, Anhalten und Bewegung der Füllspitze. Der Durchsatz der Abfüllanlage ist gesondert zu ermitteln. Kalibrieren Sie die tatsächlich am Auslass abgegebene Menge.",
        "Prüfen Sie vor einer Drehzahlerhöhung die Flüssigkeitszufuhr, den Durchflusswiderstand an der Spitze und die Tropfenablösung. Bei schäumenden Flüssigkeiten sind auch Dosierhöhe und Bewegung zu berücksichtigen. Messen Sie mehrere aufeinanderfolgende Füllungen und die erste Füllung nach einer Pause, um die Leistung der gesamten Station zu beurteilen.",
      ],
    },
    buffer: {
      title: "Laborvorbereitung: Pufferdosierung und Nachfüllen",
      paragraphs: [
        "Eine Pumpe zum Verteilen vorgemischter Puffer auf Gefäße kann als Pufferdosierpumpe bezeichnet werden. Eine Pumpe zum Nachfüllen eines Zwischenbehälters dient der Nachspeisung. Beide Aufgaben unterscheiden sich vom Ansetzen eines Puffers aus zwei Flüssigkeiten. Die RPL-P15 mit einem Pumpenkopf regelt das Verhältnis von Konzentrat zu Verdünnungsmittel nicht selbstständig.",
        "Stimmen Sie beim wiederholten Dosieren Volumen, Fördervolumen und Betriebszyklen ab. Beim Nachfüllen eines Behälters löst der gemessene Füllstand oder ein Gerätebefehl den Start und Stopp aus. Die Füllstandserfassung sowie der Schutz vor Trockenlauf und Überlaufen müssen im System vorgesehen werden.",
        "Planen Sie bei salzhaltigen Puffern eine verträgliche Spülung vor dem Abschalten ein, um eingetrocknete Rückstände und Kristallbildung am Kolben zu begrenzen. Prozessanschluss G1/8 und Spülanschluss 1/4-28 UNF-2B gehören zu unterschiedlichen Kreisen. Schließen Sie beide laut Ausführungszeichnung an und prüfen Sie nach dem Nachfüllen, ob Luft eingedrungen ist.",
      ],
    },
    continuous: {
      title: "Versorgung von Analysengeräten: kontinuierliche dosierte Flüssigkeitszufuhr",
      paragraphs: [
        "Benötigt ein Gerät über längere Zeit Flüssigkeit, kommt die RPL-P15 als Flüssigkeitsdosierpumpe für die Versorgung infrage. Im Unterschied zum Befüllen einzelner Behälter sind der mittlere Volumenstrom, die Laufzeit und die Toleranz des Folgeprozesses gegenüber Durchflussschwankungen maßgeblich.",
        "Der mittlere Nennvolumenstrom ergibt sich aus dem Fördervolumen pro Umdrehung und der Drehzahl. Rechenbeispiel: 500 μL/rev × 120 rpm = 60000 μL/min, entsprechend 60 mL/min. Dieser Mittelwert erlaubt keinen Rückschluss auf einen konstanten momentanen Durchfluss. Messen Sie die tatsächliche Förderung mit der Betriebsflüssigkeit und dem vorgesehenen Gegendruck.",
        "Messen Sie bei tatsächlichem Auslasswiderstand die in einem definierten Zeitraum gesammelte Menge. Prüfen Sie, wie sich Pulsationen auf den nachgeschalteten Prozess auswirken. Wenn ein Mischer oder ein anderer Strömungswiderstand hinzukommt, prüfen Sie den Gegendruck und die Einlassversorgung erneut. Pulsationsarmer Durchfluss und zulässige Dauerlaufzeit sind für den vorgesehenen Betrieb zu prüfen.",
      ],
    },
    dilution: {
      title: "Automatisierte Analysengeräte: Konzentratverdünnung im Gerät",
      paragraphs: [
        "Ein Pfad saugt Konzentrat an, der andere Verdünnungsmittel. Die Förderströme treffen zusammen und werden vor dem Vorratsbehälter für die Arbeitslösung gemischt. Für diese Aufgabe dient {{model}} als Konzentrat- oder Reagenzienverdünnungspumpe. Die Pumpe fördert proportional. Die nachgeschaltete Mischung bestimmt die Homogenität.",
        "Berechnung des Verhältnisses: {{ratio}} entspricht einem Teil Konzentrat und {{parts}} Teilen Verdünnungsmittel. Bei additiven Volumina, ohne den Zielstoff im Verdünnungsmittel und ohne Reaktion beträgt das Gesamtvolumen das {{factor}}-Fache des Konzentratvolumens. Die Konzentration des Zielstoffs beträgt 1/{{factor}} des Ausgangswerts. Die gezeigte Ausführung mit {{concentrate}} μL + {{diluent}} μL fördert nominal {{total}} mL. Bestätigen Sie die Konzentration anhand der gemessenen Fördermengen und einer Prüfung der angesetzten Flüssigkeit.",
        "Befüllen und entlüften Sie beide Pfade, bevor Sie die zum Mischer gelangende Flüssigkeit beurteilen. Dies gilt besonders nach dem Einschalten oder einem Flüssigkeitswechsel. Ein leerer Vorratsbehälter oder Luftblasen in einem Pfad können die Konzentration verändern, obwohl das Gesamtvolumen plausibel erscheint. Messen Sie beide Pfade getrennt, bevor Sie die gemischte Arbeitslösung beurteilen.",
      ],
    },
    preparation: {
      title: "Labor- und Reagenzienvorbereitung: Pufferverdünnung in festem Verhältnis",
      paragraphs: [
        "In Laborgeräten zur Flüssigkeitsvorbereitung dient eine Pumpe zur Zusammenführung von Konzentrat und Verdünnungsmittel als Pufferansatz- oder Proportionaldosierpumpe. Wählen Sie {{model}} für Formulierungen mit dem geforderten Volumenverhältnis {{ratio}}.",
        "Rechenbeispiel: Bei {{ratio}} benötigt eine Charge von nominal 100 mL insgesamt {{batchConcentrate}} mL Konzentrat und {{batchDiluent}} mL Verdünnungsmittel. Die Rezepturberechnung gibt die tatsächliche Chargengenauigkeit nicht vor. Prüfen Sie die angesetzte Flüssigkeit anhand der Anforderungen an Ionenstärke, Säuregrad und Lösungszustand.",
        "Prüfen Sie die Gleichmäßigkeit der Mischung zusätzlich zum Volumenverhältnis. Legen Sie Zusammenführung, Mischer und Behälter anhand von Chargenvolumen, Förderzeitpunkt und Verweilzeit aus. Prüfen Sie Gemische, die ausfallen oder schäumen können. Bewerten Sie die Medienverträglichkeit sämtlicher Teile beider Flüssigkeitspfade, einschließlich der Keramikkolben.",
      ],
    },
    batch: {
      title: "Reagenzienherstellung: proportionale Chargendosierung",
      paragraphs: [
        "Wenn zwei Flüssigkeiten in einem festen Verhältnis in ein Ansatzgefäß gelangen, dient {{model}} als Proportional- oder Zweikanal-Dosierpumpe. Geben Sie das Verhältnis, das Gesamtvolumen der Charge und die zulässige Ansatzzeit an. Das Abfüllen der angesetzten Flüssigkeit in einzelne Flaschen erfolgt in einem nachgelagerten Arbeitsschritt.",
        "Wenn sich beide Fördermengen um denselben Faktor ändern, bleibt das Verhältnis gleich. Eine Änderung der Gesamtdrehzahl kann daher eine 1:9-Ausführung nicht in eine 1:19-Ausführung umwandeln. Für eine andere Rezeptur sind Pumpenkopfkonfiguration und Fördervolumen neu zu bewerten. Berücksichtigen Sie beim Starten und Beenden einer Charge die Pfadvolumina, die Ankunftszeit am Mischer und die Restflüssigkeit.",
        "Die gezeigten Prozessanschlüsse haben 1/4-28 UNF-2B für Reagenz A und G1/8 für Reagenz B. Beide Spülanschlüsse haben 1/4-28 UNF-2B. Entnehmen Sie die Zuordnung der Flüssigkeiten zu A und B der Ausführungszeichnung. Prüfen Sie Druck und Flüssigkeitszufuhr beider Pfade getrennt.",
      ],
    },
  },
  modelFaqs: {
    p635: [
      { question: "Wie wähle ich zwischen RPL-P6.35 und RPL-P4?", answer: "Die Fördervolumenbereiche betragen 50–300 μL/rev bzw. 12–80 μL/rev. Schätzen Sie anhand der Zieldosis und der verfügbaren Zeit zunächst Fördervolumen und Umdrehungszahl ab. Vergleichen Sie anschließend die Förderleistung bei kleinen Dosen und die Antriebsoptionen. Die Dosiergenauigkeit ergibt sich nicht aus der Größe des Fördervolumens." },
      { question: "Welche Wirkung haben die Einstellung des Fördervolumens und die Motordrehzahl?", answer: "Die mechanische Einstellung ändert das Nennfördervolumen je vollständiger Umdrehung. Die Motordrehzahl bestimmt die Anzahl der Umdrehungen pro Zeiteinheit. Berechnen Sie die Dosis als Fördervolumen × Umdrehungszahl und den mittleren Volumenstrom als Fördervolumen × Drehzahl. Kalibrieren Sie dann die tatsächliche Fördermenge." },
      { question: "Wie unterscheiden sich Spül- und Prozessanschlüsse?", answer: "Beide haben in der gezeigten Ausführung ein Gewinde 1/4-28 UNF-2B. Über die Prozessanschlüsse strömt Reagenz in die Pumpe und wieder aus ihr heraus. Die Spülanschlüsse dienen zur Reinigung des Kolbenbereichs. Beachten Sie für die Zuordnung die Zeichnung der gelieferten Ausführung." },
    ],
    p15: [
      { question: "Wie unterscheidet sich RPL-P15 von RPL-P6.35?", answer: "Die Fördervolumenbereiche betragen 300–1200 μL/rev bzw. 50–300 μL/rev. RPL-P15 ist eine Option zum Abfüllen größerer Mengen und zur Flüssigkeitszufuhr. Vergleichen Sie Zielfüllmenge, Förderzeit und Anforderungen an kleine Dosen zusätzlich zum Volumenstrom." },
      { question: "Bezeichnen 300–1200 μL/rev den Volumenstrom?", answer: "Die Angabe bezeichnet das Fördervolumen pro Umdrehung. Der Volumenstrom hängt zusätzlich von der Drehzahl ab. Beispielsweise ergeben 500 μL/rev × 120 rpm einen mittleren Nennvolumenstrom von 60 mL/min. Kalibrieren Sie ihn bei Betriebsflüssigkeit und Gegendruck. Auch bei konstantem mittlerem Volumenstrom können Pulsationen auftreten." },
      { question: "Kann die RPL-P15 eigenständig zwei Flüssigkeiten mischen?", answer: "Die Pumpe hat einen Pumpenkopf zur Dosierung oder Abgabe einer Flüssigkeit. Zur proportionalen Zubereitung aus zwei Flüssigkeiten sind ein weiterer Fluidpfad und eine passende Steuerung nötig. Prüfen Sie bei festen Volumenverhältnissen von Konzentrat zu Verdünnungsmittel von 1:9 oder 1:19 die DRPL-Ausführung mit zwei Pumpenköpfen." },
    ],
  },
  faqSingle: [
    { question: "Wie hängen die Anwendungsnamen mit einer ventillosen Dosierpumpe zusammen?", answer: "Ventillose Dosierpumpe beschreibt Pumpenprinzip und Dosierfunktion. Reagenziendosierpumpe, Titriermitteldosierpumpe und Abfüllpumpe beschreiben Aufgaben innerhalb eines Geräts. Je nach Geräteauslegung können andere Pumpenprinzipien dieselbe Aufgabe erfüllen." },
    { question: "Bezeichnet {{range}} das Volumen je Dosierung?", answer: "Der Bereich bezeichnet das Fördervolumen pro Umdrehung. Bei vollständigen Umdrehungen ergibt die Multiplikation des eingestellten Fördervolumens mit der Umdrehungszahl das Nenndosiervolumen. Kalibrieren Sie die tatsächlich abgegebene Menge am Auslass, insbesondere für kleine Dosen. Aus dem Drehwinkel allein lässt sich bei Teilumdrehungen keine proportionale Fördermenge ableiten." },
    { question: "Verkleinert eine niedrigere Motordrehzahl die Dosis?", answer: "Bei gleichem Fördervolumen und gleicher Anzahl vollständiger Umdrehungen verlängert eine geringere Drehzahl vor allem die Förderzeit. Eine kleinere Dosis erfordert ein passendes Fördervolumen und eine geeignete Ansteuerung. Der mittlere Volumenstrom ergibt sich aus Fördervolumen mal Drehzahl. Prüfen Sie die tatsächliche Fördermenge mit Flüssigkeit und Fluidpfad." },
    { question: "Welche Werkstoffe und Anschlüsse hat die gezeigte Ausführung von {{model}}?", answer: "{{materialDetails}} Prüfen Sie sämtliche medienberührten Teile auf Verträglichkeit mit Reagenz und Reinigungsflüssigkeit. Prüfen Sie Antrieb, Montage und Schnittstellen der gelieferten Ausführung." },
    { question: "Wie sind die Angaben zu Genauigkeit, Druck und Lebensdauer zu verwenden?", answer: "Prüfen Sie Definitionen und Prüfbedingungen einschließlich Flüssigkeit, Temperatur, Fördervolumen, Drehzahl und Gegendruck. Ermitteln Sie den zulässigen Betriebsgegendruck getrennt von der Druckfestigkeit. Die in Zyklen angegebene Lebensdauer hängt von den Betriebsbedingungen ab. Im vollständigen Gerät können weiterhin Umschalt- und Absperrventile erforderlich sein." },
  ],
  faqDual: [
    { question: "Welchem Verdünnungsfaktor entspricht {{ratio}}?", answer: "Die Angabe bezeichnet das Volumenverhältnis von Konzentrat zu Verdünnungsmittel. Ein Teil Konzentrat trifft auf {{parts}} Teile Verdünnungsmittel. Bei additiven Volumina, ohne Zielstoff im Verdünnungsmittel und ohne Reaktion beträgt das Endvolumen {{factor}} Teile, die Konzentration 1/{{factor}} der Konzentration des Konzentrats. Das Volumenverhältnis und der Verdünnungsfaktor sind unterschiedliche Größen." },
    { question: "Welche Fördermenge hat die gezeigte Ausführung von {{model}}?", answer: "Die gezeigte Ausführung fördert {{concentrate}} μL Konzentrat und {{diluent}} μL Verdünnungsmittel, insgesamt nominal {{total}} mL. Prüfen Sie die Fördermenge der Charge mit tatsächlichem Antrieb und Betriebsablauf. Die Werte sind Nennmengen. Verlässliche Mindestmengen sind im vorgesehenen Betrieb zu prüfen." },
    { question: "Sorgt die proportionale Förderung zugleich für eine homogene Mischung?", answer: "Die Pumpe gibt das Verhältnis der beiden Fördermengen vor. Zusammenführung, Mischen und Lagerung bestimmen die Homogenität im weiteren Verlauf. Messen Sie beide geförderten Mengen einzeln und prüfen Sie die angesetzte Flüssigkeit. Das Gesamtvolumen allein belegt weder Verhältnis noch Konzentration." },
    { question: "Lässt sich 1:9 durch eine Drehzahländerung auf 1:19 umstellen?", answer: "Wenn sich beide Fördermengen um denselben Faktor ändern, bleibt das Verhältnis gleich. Für ein neues Verhältnis müssen Pumpenkopfkonfiguration und Fördervolumen geprüft werden." },
    { question: "Welche Anforderungen gelten für die beiden Flüssigkeitspfade?", answer: "Die Prozessanschlüsse A und B sind mit 1/4-28 UNF-2B bzw. G1/8 ausgeführt. Beide Spülanschlüsse haben 1/4-28 UNF-2B. Entnehmen Sie die medienberührten Werkstoffe beider Pfade der Ausführungsspezifikation. Prüfen Sie den Betriebsgegendruck getrennt von der Druckfestigkeit." },
  ],
  materialDetails: {
    p4: "Die gezeigte Ausführung hat einen Pumpenkopf aus Polyvinylidenfluorid (PVDF), einen Keramiksatz aus Aluminiumoxid (Al₂O₃) und einen Prozessanschluss mit 1/4-28 UNF-2B.",
    p635: "Die gezeigte Ausführung hat einen Kopf und Verschlussstopfen aus Polyvinylidenfluorid (PVDF) sowie einen Keramiksatz aus Zirkoniumdioxid (ZrO₂). Prozess- und Spülanschlüsse haben 1/4-28 UNF-2B und gehören zu unterschiedlichen Kreisen.",
    p15: "Die gezeigte Ausführung hat einen Kopf und Verschlussstopfen aus Polyvinylidenfluorid (PVDF), einen Keramiksatz aus Aluminiumoxid (Al₂O₃), einen Prozessanschluss mit G1/8 und einen Spülanschluss mit 1/4-28 UNF-2B.",
  },
  selectionSingle: "Geben Sie Medienzusammensetzung, Dosiervolumen oder kontinuierlichen Volumenstrom, zulässige Förderzeit, tägliche Laufzeit, Einlassbedingungen, Gegendruck am Auslass und Anforderungen an den Antrieb an. Legen Sie damit Fördervolumen und Zeitablauf aus und prüfen Sie die tatsächliche Fördermenge im Fluidpfad. Die aufgeführten Anwendungen dienen der Vorauswahl. Die Eignung ist im vorgesehenen Gerät zu prüfen.",
  selectionDual: "Geben Sie beide Flüssigkeiten, das Zielvolumenverhältnis, Chargenvolumen oder Gesamtvolumenstrom, Zubereitungszeit, Einlassbedingungen und Gegendruck beider Pfade sowie die nachgeschaltete Mischeinrichtung an. Bewerten Sie proportionale Förderung, Gerätesteuerung und Homogenität getrennt. Die aufgeführten Anwendungen dienen der Vorauswahl und sind im tatsächlichen System zu prüfen.",
  specs: {
    "产品类型": "Produkttyp",
    "排量范围": "Fördervolumen pro Umdrehung",
    "转速": "Drehzahl",
    "准确度": "Genauigkeit",
    "准确性": "Genauigkeit",
    "重复性": "Wiederholbarkeit",
    "耐压": "Druckfestigkeit",
    "寿命": "Lebensdauer",
    "泵头材质": "Werkstoff des Pumpenkopfs",
    "堵头材质": "Werkstoff der Verschlussstopfen",
    "陶瓷套件": "Keramiksatz",
    "工作液路接口": "Prozessanschluss",
    "清洗液路接口": "Spülanschluss",
    "整体尺寸": "Außenabmessungen",
    "重量": "Gewicht",
    "配置方式": "Konfiguration",
    "稀释比": "Volumenverhältnis Konzentrat zu Verdünnungsmittel",
    "浓缩液份数": "Teile Konzentrat",
    "稀释液份数": "Teile Verdünnungsmittel",
    "浓缩液定量（μL）": "Konzentratvolumen (μL)",
    "稀释液定量（μL）": "Verdünnungsmittelvolumen (μL)",
    "配液量（mL）": "Gesamtvolumen (mL)",
    "流量 QMin，mL/min": "Minimaler Volumenstrom QMin (mL/min)",
    "流量 QMax，mL/min": "Maximaler Volumenstrom QMax (mL/min)",
    "试剂A 工作液路接口": "Prozessanschluss Reagenz A",
    "试剂B 工作液路接口": "Prozessanschluss Reagenz B",
    "试剂A 清洗液路接口": "Spülanschluss Reagenz A",
    "试剂B 清洗液路接口": "Spülanschluss Reagenz B",
    "试剂A 端耐压": "Druckfestigkeit auf der Seite von Reagenz A",
    "试剂B 端耐压": "Druckfestigkeit auf der Seite von Reagenz B",
    "尺寸/mm": "Abmessungen (mm)",
  },
  customConfiguration: "Kundenspezifische Konfiguration",
  metalFitting: "G1/8 (serienmäßig mit metallischem Steckanschluss)",
  applicationsTab: "Anwendungen",
  applicationsTitle: "Typische Anwendungen",
  selectionTitle: "Fluidikaufgabe und Konfiguration festlegen",
  ctaTitle: "Konfiguration von {{model}} für Ihr Gerät abstimmen",
  ctaButton: "Anforderungen übermitteln",
  drawingUnavailable: "Für {{model}} steht keine öffentliche 2D-Zeichnung bereit. Fügen Sie die Zeichnungsanfrage zur Auswahlliste hinzu und senden Sie Ihre Anfrage. Konfiguration und Zeichnungsrevision werden gesondert bestätigt.",
  modelUnavailable: "Für {{model}} steht kein öffentliches 3D-Modell bereit. Fragen Sie eine geeignete Datei an und geben Sie Einbauraum und Konfiguration an.",
  specNotesSingle: [
    "Der Volumenstrombereich ergibt sich rechnerisch aus Fördervolumen und Drehzahl. Kalibrieren Sie die tatsächliche Fördermenge mit der vorgesehenen Flüssigkeit, dem Gegendruck und dem Fluidpfad.",
    "Das Fördervolumen pro Umdrehung beschreibt weder die Dosis noch das kleinste zuverlässige Dosiervolumen. Prüfen Sie die Fördermenge mit Antrieb, Flüssigkeit und Fluidpfad.",
    "Für Genauigkeit, Wiederholbarkeit und Lebensdauer gelten die jeweiligen Prüfbedingungen. Prüfen Sie den zulässigen Betriebsgegendruck getrennt von der Druckfestigkeit.",
  ],
  specNotesDual: [
    "Der Gesamtvolumenstrom ergibt sich rechnerisch aus dem Gesamtfördervolumen beider Pumpenköpfe und der Drehzahl. Prüfen Sie die Fördermenge je Kanal und das Volumenverhältnis unter den vorgesehenen Medien- und Druckbedingungen.",
    "Das Verhältnis bezeichnet das Konzentratvolumen zum Verdünnungsmittelvolumen. Prüfen Sie die Fördermengen beider Pfade getrennt, da sich aus dem Gesamtvolumen allein die Konzentration nicht ergibt.",
    "Proportionale Förderung und Mischung sind getrennte Funktionen. Prüfen Sie medienberührte Werkstoffe, Betriebsgegendruck und Leistungsbedingungen je Pfad.",
  ],
};
