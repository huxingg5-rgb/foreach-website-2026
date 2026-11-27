import type { Dpl30hArticleCopy } from "./dpl30h-high-pressure-liquid-diaphragm-pump.types";

export const dpl30hArticleDeCopy: Dpl30hArticleCopy = {
  "metadata": {
    "title": "Hochdruck-Membranpumpe auswählen: DPL30H mit 300 mL/min und 600 kPa",
    "seoTitle": "Auswahlhilfe für die Hochdruck-Membranpumpe DPL30H | Foreach Technology",
    "seoDescription": "Wählen Sie die Foreach DPL30H anhand der Fördermenge beim Zielgegendruck, des Nenndrucks von 600 kPa, des Anschlusses für starre Rohre mit 6×4 mm, des Motors, der medienberührten Werkstoffe und des Modellcodes aus. Der Leitfaden zeigt die Auswahl in sechs Schritten.",
    "coverAlt": "Hochdruck-Membranpumpen für Flüssigkeiten Foreach DPL30H mit Bürstenmotor oder bürstenlosem Motor und Anschlüssen für starre Rohre mit 6×4 mm"
  },
  "section1": {
    "title": "1. Warum Fluidpfade mit hohem Gegendruck eine andere Pumpe erfordern",
    "paragraphs": [
      "Filter, starre Leitungen mit kleinem Querschnitt, Ventile, Mischkammern und lange Leitungswege verursachen Druckverluste. Mit steigendem Gegendruck sinkt die Fördermenge. Die Fördermenge bei freiem Auslauf allein reicht daher nicht zur Auswahl. Die DPL30H ist für Flüssigkeitspfade mit höherem Druckbedarf ausgelegt und hat eine Fördermenge bei freiem Auslauf von 300 mL/min sowie einen Nenndruck von 600 kPa.",
      "Die DPL30H ist für selbstansaugende Förderung in Geräten mit höherem Gegendruck ausgelegt und trennt Flüssigkeit und Gas. Das Nennmedium ist gereinigtes Wasser. Prüfen Sie andere Flüssigkeiten bei der tatsächlichen Konzentration, Temperatur, Einwirkdauer, dem vorgesehenen Druck und der angestrebten Nutzungsdauer.",
      "Diese Hochdruckpumpe ist als eigenständige Bauart ausgelegt. Druckbereich, Anschluss für starre Rohre, medienberührte Werkstoffe und Motoransteuerung müssen zusammen für das System geprüft werden."
    ]
  },
  "section2": {
    "title": "2. Zuerst sechs Anwendungsdaten klären",
    "intro": "Legen Sie den Fluidpfad fest, bevor Sie den Modellcode auswerten.",
    "headers": [
      "Eingangsgröße",
      "Festzulegende Größe",
      "Bedeutung für die Auswahl"
    ],
    "rows": [
      [
        "Zielfördermenge",
        "Erforderliche Fördermenge im Dauerbetrieb beim Zielgegendruck",
        "300 mL/min bei freiem Auslauf geben die Fördermenge am Betriebspunkt nicht an"
      ],
      [
        "Gegendruck des Systems",
        "Gesamtdruckverlust an Filtern, Ventilen, Rohren und Kammern sowie statischer Druckanteil aus dem Höhenunterschied",
        "Ergibt den Druck, den die Pumpe überwinden muss"
      ],
      [
        "Fördermedium",
        "Stoffbezeichnung, Konzentration, Temperatur und Reinigungsmedien",
        "Grundlage für die Vorauswahl von EP/PS oder FF/PS"
      ],
      [
        "Flüssigkeitsleitung",
        "Starre Rohre mit 6×4 mm (Außendurchmesser × Innendurchmesser) und alle Anschlüsse",
        "Die Zuverlässigkeit hängt vom gesamten Leitungsweg ab"
      ],
      [
        "Steuergröße",
        "Nur Ein- und Ausschalten oder zusätzlich Drehzahl, Drehrichtung und Drehzahlrückmeldung",
        "Bestimmt die Wahl zwischen Bürstenmotor und bürstenlosem Motor mit fünf Leitungen"
      ],
      [
        "Nutzungsdauer",
        "Tägliche Laufzeit, Dauer- oder Intervallbetrieb und Wartungsintervall",
        "Beeinflusst die Motorwahl und den Umfang der Validierung"
      ]
    ]
  },
  "section3": {
    "title": "3. 300 mL/min und 600 kPa bezeichnen unterschiedliche Betriebspunkte",
    "paragraphs": [
      "300 mL/min ist die Fördermenge der DPL30H bei freiem Auslauf. 600 kPa ist ihr Nenndruck. Diese Werte beschreiben verschiedene Punkte der Pumpenkennlinie. Eine Fördermenge von 300 mL/min bei 600 kPa lässt sich daraus nicht ableiten.",
      "Bei steigendem Überdruck am Auslass sinkt die Fördermenge. Lesen Sie in der freigegebenen Kennlinie die verfügbare Fördermenge beim Zielgegendruck ab. Planen Sie Reserve für Schwankungen des Systems, zunehmende Filterbeladung und Toleranzen zwischen einzelnen Pumpen ein."
    ],
    "noticeStrong": "Entscheidend für die Auswahl ist die verbleibende Fördermenge beim Zielgegendruck. Die höchste Fördermenge bei freiem Auslauf allein ist dafür kein Maßstab.",
    "noticeText": "300 mL/min ist die Fördermenge bei freiem Auslauf, 600 kPa ist der Nenndruck. Beide Werte gelten für unterschiedliche Betriebspunkte."
  },
  "section4": {
    "title": "4. Technische Daten und Einsatzgrenzen der DPL30H",
    "intro": "Prüfen Sie anhand dieser Werte, welche Modelle infrage kommen. Gleichen Sie anschließend das konkrete Modell mit dem Medium, dem Leitungsweg und der Ansteuerung ab.",
    "headers": [
      "Parameter",
      "DPL30H",
      "Hinweis zur Auswahl"
    ],
    "rows": [
      [
        "Freier Förderstrom",
        "300 mL/min",
        "Bei 600 kPa nicht garantiert"
      ],
      [
        "Nenndruck",
        "600 kPa",
        "Betriebspunkt aus der Fördermengen-Druck-Kennlinie bestimmen"
      ],
      [
        "Selbstansaughöhe",
        "3 mH₂O",
        "Die tatsächliche Ansaughöhe hängt von Medium, Leitungen und Dichtheit ab"
      ],
      [
        "Leistung",
        "≤7 W",
        "Stromversorgung für Anlauf und Betrieb dimensionieren"
      ],
      [
        "Nennmedium",
        "Gereinigtes Wasser",
        "Andere Flüssigkeiten unter tatsächlichen Bedingungen prüfen"
      ],
      [
        "Mediumtemperatur",
        "+5°C bis +40°C",
        "Die Temperaturgrenze der DPL30 von +80°C ist hier nicht anwendbar"
      ],
      [
        "Anschluss",
        "Gewindeanschluss für starre Rohre mit 6 × 4 mm",
        "Bauteil mit dem niedrigsten zulässigen Betriebsdruck prüfen"
      ],
      [
        "Geräuschpegel",
        "≤80 dB",
        "Der Geräteaufbau beeinflusst das Gesamtgeräusch"
      ],
      [
        "Pumpenkopf",
        "Polyphenylensulfid (PPS)",
        "Membran- und Ventilwerkstoff sind modellabhängig"
      ],
      [
        "Membran",
        "Je nach Modell EPDM oder PTFE",
        "Die Eignung hängt vom Einsatz ab"
      ],
      [
        "Ventil",
        "Je nach Modell EPDM oder FFKM",
        "Für Medium und Temperatur validieren"
      ]
    ]
  },
  "section5": {
    "title": "5. DPL30 und DPL30H: gleiche Fördermenge bei freiem Auslauf, unterschiedliche Einsatzbereiche",
    "paragraphs": [
      "Beide Pumpen erreichen 300 mL/min bei freiem Auslauf. Ihre Grenzen bei Druck, Selbstansaughöhe, Anschluss und Mediumtemperatur unterscheiden sich. Aus Druck, Anschluss und Einsatzgrenzen ergibt sich für die DPL30H eine eigenständige Plattform gegenüber der DPL30. Sie ist für hohen Gegendruck und starre Rohre ausgelegt."
    ],
    "headers": [
      "Merkmal",
      "DPL30",
      "DPL30H"
    ],
    "rows": [
      [
        "Freier Förderstrom",
        "300 mL/min",
        "300 mL/min"
      ],
      [
        "Nenndruck",
        "100 kPa",
        "600 kPa"
      ],
      [
        "Selbstansaughöhe",
        "6 mH₂O",
        "3 mH₂O"
      ],
      [
        "Schlauch",
        "Flexibler Schlauch mit 3.2 mm Innendurchmesser",
        "Gewindeanschluss für starre Rohre mit 6 × 4 mm"
      ],
      [
        "Maximale Mediumtemperatur",
        "+80°C",
        "+40°C"
      ],
      [
        "Entscheidende Auswahlkriterien",
        "Niedrigerer Druck, Ansaughöhe und höhere zulässige Mediumtemperatur",
        "Hoher Gegendruck, starre Leitungen und Druckfestigkeit des Systems"
      ]
    ],
    "dpl30Prefix": "Für etwa 100 kPa, flexible Schläuche mit 3.2 mm Innendurchmesser und eine höhere zulässige Mediumtemperatur lesen Sie die",
    "dpl30Label": "Auswahlleitfaden für die Flüssigkeits-Membranpumpe DPL30",
    "dpl30Suffix": "."
  },
  "section6": {
    "title": "6. Die Fördermengen-Druck-Kennlinie der DPL30H lesen",
    "paragraphs": [
      "Die freigegebene Kennlinie zeigt bei einem Auslassdruck nahe null eine Fördermenge von annähernd 300 mL/min. Mit zunehmendem Überdruck sinkt die Fördermenge. Die Pumpe fördert weiterhin bei hohem Gegendruck, allerdings unterhalb der Fördermenge bei freiem Auslauf.",
      "Grenzen Sie mit der Kennlinie den möglichen Betriebsbereich ein und bestätigen Sie ihn durch Prüfungen im Gerät. Berücksichtigen Sie den Druckverlust am Filter am Ende der Nutzungsdauer, Druckspitzen bei Ventilschaltungen, Leitungstoleranzen und die erforderliche Fördermengenreserve."
    ],
    "figureAlt": "Freigegebene Fördermengen-Druck-Kennlinie der Hochdruck-Membranpumpe für Flüssigkeiten DPL30H mit sinkender Fördermenge bei steigendem Überdruck",
    "figureCaption": "Fördermengen-Druck-Kennlinie der DPL30H. 300 mL/min ist der Endpunkt bei freiem Auslauf. Die Fördermenge im Betrieb sinkt mit steigendem Gegendruck.",
    "notice": "Leiten Sie keine exakten unmarkierten Werte durch Extrapolation ab. Die Angabe „300 mL/min @ 600 kPa“ ist unzulässig."
  },
  "section7": {
    "title": "7. Anschluss für starre Rohre mit 6×4 mm: Maßgeblich ist das Bauteil mit der niedrigsten Druckfestigkeit",
    "paragraphs": [
      "Der Gewindeanschluss ist für starre Rohre mit 6 × 4 mm vorgesehen. Prüfen Sie Rohrwerkstoff, Außendurchmessertoleranz, rechtwinkligen Schnitt und Einstecktiefe. Führen Sie anschließend Druckhalte- und Dichtheitsprüfungen durch.",
      "Der druckbelastete Leitungsweg kann auch Fittings, Ventile, Filter, Sensoren und Kammern enthalten. Prüfen Sie die Druckfestigkeit dieser Bauteile jeweils separat."
    ],
    "noticeStrong": "Die Druckangabe von 600 kPa für die DPL30H bedeutet nicht automatisch, dass alle Rohre mit 6×4 mm, Fittings, Ventile, Filter und Kammern für 600 kPa geeignet sind.",
    "noticeText": "Der zulässige Betriebsdruck des gesamten Fluidpfads richtet sich nach dem Bauteil mit dem niedrigsten zulässigen Betriebsdruck."
  },
  "section8": {
    "title": "8. Varianten mit Bürstenmotor und bürstenlosem Motor: Abmessungen, Nutzungsdauer und Ansteuerung",
    "paragraphs": [
      "Bei der Variante mit Bürstenmotor kann die Versorgung mit 12/24 V direkt geschaltet werden. Die bürstenlose Variante mit fünf Leitungen bietet zusätzlich Drehrichtung, Drehzahlvorgabe und Drehzahlrückmeldung. Die Einbaumaße unterscheiden sich. Prüfen Sie die jeweilige Maßzeichnung für Ihre Einbausituation.",
      "Die Nutzungsdauer gilt bei Nennspannung im Dauerbetrieb. Gegendruck, Schaltzyklen, Umgebungstemperatur, Medium und Wärmeabfuhr können die Nutzungsdauer im Gerät beeinflussen."
    ],
    "brushedFigureAlt": "Kontur und Befestigungsmaße der Hochdruck-Membranpumpe für Flüssigkeiten DPL30H mit Bürstenmotor",
    "brushedFigureCaption": "Abmessungen der DPL30H mit Bürstenmotor. Legen Sie für die Gerätekonstruktion die freigegebene Zeichnung zugrunde.",
    "brushlessFigureAlt": "Abmessungen und Belegung der fünf Leitungen der bürstenlosen Hochdruck-Membranpumpe für Flüssigkeiten DPL30H",
    "brushlessFigureCaption": "Abmessungen und Belegung der fünf Leitungen der bürstenlosen DPL30H.",
    "motorHeaders": [
      "Merkmal",
      "Mit Bürstenmotor",
      "Bürstenlos"
    ],
    "motorRows": [
      [
        "Nennspannung",
        "12 V oder 24 V",
        "12 V oder 24 V"
      ],
      [
        "Gewicht (ca.)",
        "135 g",
        "155 g"
      ],
      [
        "Referenzwert für die Nutzungsdauer",
        "3000 h",
        "10000 h"
      ],
      [
        "Bedingung für die Nutzungsdauer",
        "Dauerbetrieb bei Nennspannung",
        "Dauerbetrieb bei Nennspannung"
      ],
      [
        "Steuergröße",
        "Ein- und Ausschalten der Versorgung",
        "Drehrichtung, Drehzahl über PWM/0–5 V, FG-Rückmeldung"
      ]
    ],
    "wiringTitle": "Bürstenlose Schnittstelle mit fünf Leitungen",
    "wiringIntro": "Berücksichtigen Sie bei der Ansteuerung die Spannungsbereiche, offene Eingänge und die Anforderungen an die Auswertung des FG-Signals.",
    "wiringHeaders": [
      "Signal",
      "Farbe",
      "Funktion"
    ],
    "wiringRows": [
      [
        "VCC",
        "Rot",
        "Positiver Versorgungspol"
      ],
      [
        "GND",
        "Schwarz",
        "Masse"
      ],
      [
        "DIR",
        "Gelb",
        "High oder offen: CW. Low: CCW."
      ],
      [
        "FG",
        "Grün",
        "Drehzahlsignal"
      ],
      [
        "PWM",
        "Blau",
        "Drehzahlvorgabe"
      ]
    ],
    "wiringNotes": [
      "Bei 0–0.25 V am PWM-Eingang steht die Pumpe.",
      "Ein offener PWM-Eingang oder 4.5–5 V gibt die maximale Drehzahl vor.",
      "Die Drehzahl lässt sich über PWM oder eine Analogspannung von 0–5 V einstellen. Bei PWM ist sie proportional zum Tastgrad.",
      "FG liefert drei Rechteckimpulse pro Rotorumdrehung."
    ]
  },
  "section9": {
    "title": "9. Medienberührte Werkstoffe EP/PS oder FF/PS auswählen",
    "intro": "Der Suffix kennzeichnet eine Werkstoffkombination. Die chemische Verträglichkeit ist für das jeweilige Medium zu prüfen.",
    "headers": [
      "Code",
      "Membran",
      "Ventil",
      "Pumpenkopf",
      "Kriterien für die Vorauswahl"
    ],
    "rows": [
      [
        "EP/PS",
        "EPDM",
        "EPDM",
        "PPS",
        "Von der Anwendung mit gereinigtem Wasser ausgehen und die tatsächliche Verträglichkeit prüfen"
      ],
      [
        "FF/PS",
        "PTFE",
        "FFKM",
        "PPS",
        "Alternative Kombination aus Membran- und Elastomerwerkstoff, die für den Einsatz validiert werden muss"
      ]
    ],
    "noticeStrong": "Die Werkstoffkennung ersetzt keine Verträglichkeitsprüfung.",
    "noticeText": "Berücksichtigen Sie Stoffbezeichnung, Konzentration, Temperatur, Druck, Einwirkdauer und angestrebte Nutzungsdauer. Prüfen Sie bei Bedarf mit Proben."
  },
  "section10": {
    "title": "10. Modellcode und vollständiger Auswahlablauf",
    "intro": "Der Modellcode der DPL30H enthält Spannung, Motor, Anschluss, Anschlussrichtung, Werkstoffe und kundenspezifische Ausführung.",
    "modelCode": "DPL30H - 24 - D - S - C - EP/PS - X",
    "modelCodeDescription": "Diese Erläuterung gilt für die DPL30H. Leiten Sie den Modellcode nicht aus der DPL60 oder einer anderen Serie ab.",
    "headers": [
      "Feld",
      "Werte",
      "Bedeutung"
    ],
    "rows": [
      [
        "Spannung",
        "24 / 12",
        "24 V oder 12 V"
      ],
      [
        "Motor",
        "D / B / C",
        "D mit Bürstenmotor, B bürstenlos, C mit eisenlosem Motor"
      ],
      [
        "Anschluss",
        "S",
        "Anschluss gemäß Spezifikation"
      ],
      [
        "Anschlussrichtung",
        "C / 3 / 6 / 9",
        "C standardmäßig nach oben, 3 rechts, 6 unten, 9 links"
      ],
      [
        "Werkstoffe",
        "EP/PS / FF/PS",
        "EPDM+EPDM+PPS oder PTFE+FFKM+PPS"
      ],
      [
        "Kundenspezifische Ausführung",
        "X",
        "Kundenspezifische Anforderung"
      ]
    ],
    "standardModelsTitle": "DPL30H-Standardmodelle",
    "standardModelsIntro": "Acht Standard-SKUs stehen für Varianten mit Bürstenmotor und bürstenlosem Motor, 12/24 V und zwei Werkstoffkombinationen zur Verfügung.",
    "standardModelHeaders": [
      "SKU",
      "Modell",
      "Motor",
      "Spannung",
      "Werkstoffe"
    ],
    "standardModelRows": [
      [
        "459007",
        "DPL30H-24DS-EP/PS",
        "Mit Bürstenmotor",
        "24 V",
        "EP/PS"
      ],
      [
        "459008",
        "DPL30H-24BS-EP/PS",
        "Bürstenlos",
        "24 V",
        "EP/PS"
      ],
      [
        "459019",
        "DPL30H-12DS-EP/PS",
        "Mit Bürstenmotor",
        "12 V",
        "EP/PS"
      ],
      [
        "459020",
        "DPL30H-12BS-EP/PS",
        "Bürstenlos",
        "12 V",
        "EP/PS"
      ],
      [
        "459034",
        "DPL30H-24DS-FF/PS",
        "Mit Bürstenmotor",
        "24 V",
        "FF/PS"
      ],
      [
        "459035",
        "DPL30H-24BS-FF/PS",
        "Bürstenlos",
        "24 V",
        "FF/PS"
      ],
      [
        "459036",
        "DPL30H-12DS-FF/PS",
        "Mit Bürstenmotor",
        "12 V",
        "FF/PS"
      ],
      [
        "459037",
        "DPL30H-12BS-FF/PS",
        "Bürstenlos",
        "12 V",
        "FF/PS"
      ]
    ],
    "notice": "Prüfen Sie auch bei einem Standardmodell den Betriebspunkt, die Werkstoffe, den Leitungsweg und die Ansteuerung.",
    "stepsTitle": "Empfohlener Auswahlablauf",
    "steps": [
      [
        "Betriebspunkt festlegen",
        "Erforderliche Fördermenge beim Zielgegendruck angeben. Die Fördermenge bei freiem Auslauf allein reicht dafür nicht aus."
      ],
      [
        "Gesamtdruckverlust berechnen",
        "Filter am Ende ihrer Nutzungsdauer, Ventile, starre Rohre, Kammern und Höhenunterschiede einbeziehen."
      ],
      [
        "Zulässigen Betriebsdruck jedes Bauteils prüfen",
        "Die Systemgrenze nach dem Bauteil mit dem niedrigsten zulässigen Betriebsdruck festlegen und eine Druckhalteprüfung durchführen."
      ],
      [
        "Werkstoffe auswählen",
        "EP/PS oder FF/PS vorauswählen und mit dem tatsächlichen Medium validieren."
      ],
      [
        "Motor und Spannung auswählen",
        "Anforderungen an Ein- und Ausschalten, Drehzahl, Drehrichtung, FG, Nutzungsdauer und Stromversorgung berücksichtigen."
      ],
      [
        "Prototyp validieren",
        "Fördermenge, Druck, Temperaturanstieg, Geräusch, Leckage und Entwicklung über die Nutzungsdauer erfassen."
      ]
    ]
  },
  "conclusion": {
    "title": "Fazit: DPL30H nach der Fördermenge beim Zielgegendruck auswählen",
    "paragraphs": [
      "Die Werte 300 mL/min und 600 kPa gelten für unterschiedliche Betriebspunkte. Die DPL30H bietet eine anhand der Kennlinie überprüfbare Druckreserve für Flüssigkeitspfade mit hohem Gegendruck, einen Anschluss für starre Rohre mit 6×4 mm und eine Auswahl an Motoren und Werkstoffkombinationen.",
      "Liegt die Priorität auf einer höheren Fördermenge bei freiem Auslauf von 400–600 mL/min und genügt ein niedrigerer Druck als in der 600-kPa-Klasse, vergleichen Sie die DPL60. Kommt die DPL30H infrage, prüfen Sie sie anhand der Kennlinie, des Bauteils mit dem niedrigsten zulässigen Betriebsdruck und des tatsächlichen Mediums."
    ]
  },
  "internalLinks": {
    "dpl60Prefix": "Steht eine höhere Fördermenge von 400–600 mL/min im Vordergrund, lesen Sie den",
    "dpl60Label": "Auswahlleitfaden für die Flüssigkeits-Membranpumpe DPL60",
    "dpl60Suffix": ".",
    "productPrefix": "Besuchen Sie die",
    "productLabel": "Serienseite der Hochdruck-Membranpumpe für Flüssigkeiten DPL30H",
    "productSuffix": " für Details zu den Varianten mit Bürstenmotor und bürstenlosem Motor.",
    "categoryPrefix": "Sehen Sie sich die",
    "categoryLabel": "Kategorie der Membranpumpen",
    "categorySuffix": " an, um andere Fördermengen- und Druckbereiche zu vergleichen."
  }
};
