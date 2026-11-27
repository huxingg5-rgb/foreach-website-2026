import type { Dpl30FaqCopy } from "./dpl30-liquid-diaphragm-pump.types";
import type { Dpl60ArticleCopy } from "./dpl60-liquid-diaphragm-pump.types";

export const dpl60ArticleDeCopy: Dpl60ArticleCopy & { metadata: { coverAlt: string } } = {
  "metadata": {
    "title": "Membranpumpe für Flüssigkeiten mit 600 mL/min auswählen: DPL60-Leitfaden zu Fördermenge, Druck und Modellen",
    "seoTitle": "Membranpumpe für Flüssigkeiten mit 600 mL/min auswählen: Betriebspunkt und DPL60-Modelle",
    "seoDescription": "Wählen Sie die Foreach Miniatur-Membranpumpe DPL60 anhand der Fördermenge bei freiem Auslauf, des Nenndrucks von 100 kPa, der Fördermengen-Druck-Kennlinie, des Motors, der medienberührten Werkstoffe und des Modellcodes aus. Der Leitfaden erläutert Ausführungen und Auswahlablauf.",
    "coverAlt": "Membranpumpen für Flüssigkeiten FOREACH DPL60 mit Bürstenmotor und bürstenlosem Motor, 600 mL/min"
  },
  "diagram": {
    "ariaLabel": "Schaubild zum Betriebspunkt der Membranpumpe für Flüssigkeiten DPL60",
    "suctionTitle": "Einlassbedingungen",
    "dischargeTitle": "Auslassbedingungen",
    "inletOpen": "Unterdruck am Einlass",
    "outletClosed": "Strömungswiderstand",
    "suctionDescription": "Die Ansaugbedingungen beeinflussen die Fördermenge",
    "inletClosed": "Gegendruck am Auslass",
    "outletOpen": "Erreichte Fördermenge",
    "dischargeDescription": "Pumpen- und Anlagenkennlinie bestimmen den Betriebspunkt",
    "caption": "Betriebspunkt der DPL60"
  },
  "section1": {
    "title": "1. Für welche Aufgaben eignet sich die DPL60 mit 600 mL/min?",
    "paragraphs": [
      "Die DPL60 ist die Miniatur-Membranpumpe von Foreach für Flüssigkeiten in Gerätefluidpfaden mit höherem Durchfluss. Sie ist für Waschen, Spülen, Umwälzen, die Förderung größerer Flüssigkeitsmengen und den Abtransport von Abfallflüssigkeit vorgesehen, wenn die Flüssigkeit schneller ausgetauscht werden muss als in einem Fluidpfad der 300-mL/min-Klasse.",
      "600 mL/min ist der Referenzwert für die Fördermenge bei freiem Auslauf. Der Nenndruck beträgt 100 kPa, die Selbstansaughöhe 3 mH₂O. Zu den Standardoptionen gehören 12 V oder 24 V Gleichspannung, Bürstenmotor oder bürstenloser Motor sowie die medienberührten Werkstoffkombinationen EP/PS oder FF/PS.",
      "Wie andere Miniatur-Membranpumpen für Flüssigkeiten fördert sie durch die Hin- und Herbewegung der Membran und den Takt der Rückschlagventile. Für die DPL60 ist bei der Auswahl vor allem der Betriebspunkt im tatsächlichen Fluidpfad maßgeblich.",
      "Liegt die geforderte Fördermenge hauptsächlich bei etwa 300 mL/min, vergleichen Sie die DPL30. Wenn vor allem der Gegendruck die Auswahl begrenzt, prüfen Sie eine Pumpe für höheren Druck anhand des Betriebspunkts. Die Fördermenge bei freiem Auslauf allein reicht in diesem Fall nicht aus."
    ]
  },
  "section2": {
    "title": "2. Was muss vor der Auswahl einer Pumpe mit 600 mL/min geklärt werden?",
    "intro": "Die Fördermengenklasse allein bestimmt die Auswahl nicht. Klären Sie Betriebspunkt, Medium, Ansaugbedingungen, medienberührte Werkstoffe, Motor, Betriebszyklus und Gesamtwiderstand des Fluidpfads zusammen.",
    "headers": [
      "Auswahlkriterium",
      "Was zu prüfen ist",
      "Häufiger Fehler"
    ],
    "rows": [
      [
        "Zielfördermenge",
        "Fördermenge bei freiem Auslauf oder erforderliche Fördermenge bei einem bestimmten Druck",
        "600 mL/min als feste Fördermenge im eingebauten Zustand ansehen"
      ],
      [
        "Systemdruck",
        "Verluste an Filtern, Ventilen, Fittings, engen Leitungen, Düsen und am Ende des Fluidpfads",
        "100 kPa ablesen, ohne die Fördermenge beim Zieldruck zu prüfen"
      ],
      [
        "Ansaugbedingungen",
        "Höhenunterschied der Flüssigkeitsspiegel, Länge der Saugleitung, Luftdichtheit und erster Start",
        "3 mH₂O für jede Einbausituation als gewährleistet ansehen"
      ],
      [
        "Medienberührte Werkstoffe",
        "Pumpenkopf, Membran, Ventile und sämtliche Eigenschaften und Einsatzbedingungen des Mediums",
        "Von PTFE oder FFKM allein auf die Verträglichkeit der gesamten Pumpe schließen"
      ],
      [
        "Motor und Stromversorgung",
        "12 V oder 24 V, Bürstenmotor oder bürstenloser Motor und erforderliche Steuersignale",
        "Nur nach Preis oder nomineller Nutzungsdauer auswählen"
      ],
      [
        "Aufbau des Fluidpfads",
        "Länge, Bögen und Bauteile in Verbindung mit Schläuchen mit 3.2 mm Innendurchmesser",
        "Widerstände und Leckagen im eingebauten Fluidpfad übergehen"
      ],
      [
        "Betriebszyklus",
        "Dauer- oder Intervallbetrieb, Betriebsstunden pro Tag, Starts und Temperaturbedingungen",
        "Angaben zur Nutzungsdauer ohne die Prüfbedingungen vergleichen"
      ]
    ]
  },
  "section3": {
    "title": "3. Warum sind 600 mL/min im eingebauten Zustand kein fester Wert?",
    "paragraphs": [
      "Die 600 mL/min der DPL60 dienen als Referenz für die Fördermenge bei freiem Auslauf im Bereich kleiner Druckdifferenzen. Der Nenndruck von 100 kPa gilt für einen anderen Betriebspunkt.",
      "Im eingebauten Zustand entstehen Unterdruck am Einlass und Überdruck am Auslass durch Leitungen, Filter, Ventile, Fittings, Engstellen, unterschiedliche Flüssigkeitsspiegel und Eigenschaften des Mediums. Ändert sich die Druckdifferenz, folgt die Fördermenge der freigegebenen Fördermengen-Druck-Kennlinie.",
      "Muss ein Gerät etwa 600 mL/min dauerhaft fördern, bestimmen Sie zuerst den Systemdruck bei dieser Fördermenge, prüfen Sie die verfügbare Reserve anhand der Kennlinie und testen Sie anschließend den vollständigen Fluidpfad."
    ],
    "noticeStrong": "Die DPL60 gehört zur 600-mL/min-Klasse. Die Fördermenge von 600 mL/min gilt bei freiem Auslauf und kann sich im Betrieb ändern.",
    "noticeText": "Aus „600 mL/min bei freiem Auslauf“ und „100 kPa Nenndruck“ ergibt sich keine zugesicherte Fördermenge von 600 mL/min bei 100 kPa."
  },
  "section4": {
    "title": "4. Vollständige technische Daten der DPL60",
    "intro": "Die folgenden Werte stammen aus der aktuellen DPL60-Spezifikation. Die Ausführungen mit Bürstenmotor und bürstenlosem Motor gehören zur selben Leistungsklasse und unterscheiden sich bei Masse und angegebener Nutzungsdauer.",
    "headers": [
      "Parameter",
      "Ausführung mit Bürstenmotor",
      "Bürstenlose Ausführung"
    ],
    "rows": [
      {
        "label": "Produkt",
        "value": "Membranpumpe für Flüssigkeiten DPL60"
      },
      {
        "label": "Modellbeispiele",
        "brushed": "DPL60-24DB, DPL60-12DB",
        "brushless": "DPL60-24BB, DPL60-12BB"
      },
      {
        "label": "Motor",
        "brushed": "Gleichstrommotor mit Bürsten",
        "brushless": "Bürstenloser Gleichstrommotor"
      },
      {
        "label": "Nennspannung",
        "value": "DC 12 V ±10% oder DC 24 V ±10%"
      },
      {
        "label": "Nennleistung",
        "value": "≤8.4 W"
      },
      {
        "label": "Freier Förderstrom",
        "value": "600 mL/min"
      },
      {
        "label": "Nenndruck",
        "value": "100 kPa"
      },
      {
        "label": "Selbstansaughöhe",
        "value": "3 mH₂O"
      },
      {
        "label": "Spezifiziertes Fördermedium",
        "value": "Gereinigtes Wasser. Andere Flüssigkeiten sind für die jeweilige Anwendung zu prüfen."
      },
      {
        "label": "Mediumtemperatur",
        "value": "+5°C bis +80°C"
      },
      {
        "label": "Schlauch",
        "value": "3.2 mm Innendurchmesser"
      },
      {
        "label": "Pumpenkopf",
        "value": "PPS"
      },
      {
        "label": "Membran",
        "value": "Je nach Modell EPDM oder PTFE"
      },
      {
        "label": "Ventil",
        "value": "Je nach Modell EPDM oder FFKM"
      },
      {
        "label": "Masse",
        "brushed": "Ca. 170 g",
        "brushless": "Ca. 195 g"
      },
      {
        "label": "Angegebene Nutzungsdauer",
        "brushed": "3.000 h bei Nennspannung im Dauerbetrieb",
        "brushless": "10.000 h bei Nennspannung im Dauerbetrieb"
      }
    ]
  },
  "section5": {
    "title": "5. Wie liest man die Fördermengen-Druck-Kennlinie der DPL60?",
    "paragraphs": [
      "Die freigegebene Kennlinie zeigt, wie sich die Fördermenge mit dem Unterdruck am Einlass und dem Überdruck am Auslass verändert. Sie ist bei einer Druckdifferenz nahe null am höchsten und ändert sich, wenn das Ansaugen schwieriger wird oder der Gegendruck am Auslass steigt.",
      "Ermitteln Sie anhand der Kennlinie die verfügbare Fördermenge beim Zieldruck. Der Referenzwert von 600 mL/min reicht hierfür nicht aus. Schätzen oder messen Sie zuerst die Druckverluste des Fluidpfads, wenn er Filter, Ventile mit kleiner Durchgangsweite, lange enge Leitungen oder druckbeaufschlagte Kammern enthält."
    ],
    "figureAlt": "Freigegebene Fördermengen-Druck-Kennlinie der Membranpumpe für Flüssigkeiten DPL60",
    "figureCaption": "Fördermengen-Druck-Kennlinie der DPL60. 600 mL/min ist der Referenzwert bei freiem Auslauf.",
    "notice": "Die Kennlinie ist eine Grundlage für die Auswahl. Viskosität, Leitungsverlauf, Fittings, Ventile, Filter, Einbau und Flüssigkeitsspiegel können den tatsächlichen Betriebspunkt verschieben. Prüfen Sie den vollständig aufgebauten Fluidpfad."
  },
  "section6": {
    "title": "6. Wie wählt man die medienberührten Werkstoffe der DPL60?",
    "intro": "Die wichtigsten medienberührten Teile sind der Pumpenkopf aus Polyphenylensulfid (PPS), die Membran und die Ventile. Prüfen Sie die Verträglichkeit für die vollständige Werkstoffkombination und die tatsächlichen Medienbedingungen.",
    "headers": [
      "Werkstoffkombination",
      "Membran / Ventil",
      "Pumpenkopf und Hinweise zur Prüfung"
    ],
    "rows": [
      [
        "EP/PS",
        "EPDM-Membran + EPDM-Ventil",
        "PPS-Pumpenkopf. Medium, Konzentration, Temperatur und Kontaktzeit bestätigen."
      ],
      [
        "FF/PS",
        "PTFE-Membran + FFKM-Ventil",
        "PPS-Pumpenkopf. Medium, Konzentration, Temperatur und Kontaktzeit bestätigen."
      ]
    ],
    "epTitle": "Werkstoffkombination EP/PS",
    "epText": "EP/PS steht für eine EPDM-Membran, EPDM-Ventile und einen PPS-Pumpenkopf. Die Kombination dient nach Prüfung als Ausgangspunkt für gereinigtes Wasser und ausgewählte gängige Flüssigkeiten.",
    "ffTitle": "Werkstoffkombination FF/PS",
    "ffText": "FF/PS steht für eine PTFE-Membran, FFKM-Ventile und einen PPS-Pumpenkopf. Die Kombination kommt bei höheren Verträglichkeitsanforderungen zur Prüfung infrage. Die Verträglichkeit der gesamten Pumpe ist für jede Chemikalie einzeln zu beurteilen.",
    "noticeStrong": "Das spezifizierte Arbeitsmedium ist gereinigtes Wasser.",
    "noticeText": "Geben Sie für andere Flüssigkeiten Bezeichnung, Zusammensetzung, Konzentration, Temperatur, dauerhafte Kontaktzeit und Reinigungsverfahren an. Bewerten Sie anschließend den gesamten medienberührten Pfad und prüfen Sie ein Muster."
  },
  "section7": {
    "title": "7. DPL60 mit Bürstenmotor oder bürstenlosem Motor?",
    "intro": "Die Ausführungen unterscheiden sich bei der angegebenen Nutzungsdauer, der Masse, den Motoreinbaumaßen, der Verdrahtung und der Ansteuerung. Legen Sie den Bauraum anhand der geltenden freigegebenen Zeichnung fest.",
    "headers": [
      "Vergleich",
      "Mit Bürstenmotor",
      "Bürstenlos"
    ],
    "rows": [
      [
        "Motor",
        "Gleichstrommotor mit Bürsten",
        "Bürstenloser Gleichstrommotor"
      ],
      [
        "Angegebene Nutzungsdauer",
        "3.000 h",
        "10.000 h"
      ],
      [
        "Bedingung für die Nutzungsdauer",
        "Nennspannung, Dauerbetrieb",
        "Nennspannung, Dauerbetrieb"
      ],
      [
        "Typischer Einsatz",
        "Begrenzte Laufzeit, einfache Ansteuerung, Geräte mit engen Kostenvorgaben",
        "Längere Betriebszeiten, höhere Anforderungen an die Gerätelebensdauer oder Bedarf an Ansteuerung und Rückmeldung"
      ],
      [
        "Masse",
        "Ca. 170 g",
        "Ca. 195 g"
      ],
      [
        "Steuergröße",
        "Einfache Stromversorgung / Start-Stopp",
        "PWM, DIR und FG je nach Ausführung"
      ]
    ],
    "afterTable": "Beurteilen Sie die Nutzungsdauer zusammen mit den Prüfbedingungen. Gegendruck, Schwankungen der Versorgung, Umgebungstemperatur, Starthäufigkeit, Kühlung und Zustand der Flüssigkeit können die Nutzungsdauer im Gerät beeinflussen.",
    "brushedTitle": "Abmessungen der Variante mit Bürstenmotor",
    "brushedAlt": "Ausschnitt der Maßzeichnung der Membranpumpe für Flüssigkeiten DPL60 mit Bürstenmotor",
    "brushedCaption": "Zeichnungsausschnitt der DPL60 mit Bürstenmotor. Entnehmen Sie die Einbaumaße der freigegebenen 2D-Zeichnung.",
    "brushedText": "Prüfen Sie in der Zeichnung der Variante mit Bürstenmotor Gesamtlänge, Pumpenkopf, Befestigungsbohrungen, Schlauchtülle und Leitungsrichtung. Verwenden Sie zur Bauraumauslegung die Zeichnung der gewählten Ausführung. Maße der DPL30 oder der bürstenlosen Variante gelten dafür nicht.",
    "brushlessTitle": "Abmessungen der bürstenlosen Variante",
    "brushlessAlt": "Ausschnitt der Maßzeichnung der bürstenlosen Membranpumpe für Flüssigkeiten DPL60",
    "brushlessCaption": "Zeichnungsausschnitt der bürstenlosen DPL60. Entnehmen Sie die Einbaumaße der freigegebenen 2D-Zeichnung.",
    "brushlessText": "Motorgehäuse, Gesamtlänge und Leitungsbaum der bürstenlosen Variante unterscheiden sich von der Variante mit Bürstenmotor. Gleichwertige Motorausführungen in freigegebenen Unterlagen können sich bei einzelnen Befestigungsmaßen unterscheiden. Bestätigen Sie die Serienausführung vor der Freigabe."
  },
  "section8": {
    "title": "8. Modellcode der DPL60 und seine Bedeutung",
    "intro": "Der vollständige Modellcode der DPL60 gibt Serie, Spannung, Motor, Leitungszahl, Anschlussart, Anschlussrichtung, Werkstoffe von Membran, Ventilen und Pumpenkopf sowie Sonderausführungen an.",
    "noticeStrong": "DPL60 - 24 - D - 2 - B - C - EP/PS - X",
    "noticeText": "Serie · Spannung · Motor · Leitungszahl · Anschlussart · Anschlussrichtung · Medienberührte Werkstoffe · Kundenspezifische Ausführung",
    "headers": [
      "Feld",
      "Code",
      "Bedeutung"
    ],
    "rows": [
      [
        "Baureihe",
        "DPL60",
        "Membranpumpe für Flüssigkeiten DPL60 der 600-mL/min-Klasse"
      ],
      [
        "Spannung",
        "24 / 12",
        "DC 24 V / DC 12 V"
      ],
      [
        "Motor",
        "D / B / C / BP",
        "D: Gleichstrommotor mit Bürsten. B: bürstenloser Gleichstrommotor. C: eisenloser Motor. BP: bürstenloser Gleichstrommotor mit externem PWM-Signal."
      ],
      [
        "Leitungen",
        "2 / 3 / 5",
        "2, 3 oder 5 Leitungen. Angaben zur Standardausführung können in den Modellnamen entfallen."
      ],
      [
        "Verbindung",
        "B / S",
        "B: Schlauchtülle. S: Gewindeanschluss."
      ],
      [
        "Anschlussrichtung",
        "3 / 6 / 9 / C",
        "3: rechts. 6: unten. 9: links. C: oben. Bei dieser Standardrichtung kann die Kennung entfallen."
      ],
      [
        "Medienberührte Werkstoffe",
        "EP/PS / FF/PS",
        "EPDM + EPDM + PPS / PTFE + FFKM + PPS"
      ],
      [
        "Kundenspezifische Ausführung",
        "X",
        "Projektbezogene Kennung. Sie entfällt bei der Standardausführung."
      ]
    ],
    "exampleTitle": "Beispiel: DPL60-24DB-EP/PS",
    "exampleText": "Die vollständige Kennung dieses Standardmodells lautet DPL60-24-D-2-B-C-EP/PS. Die Standardfelder für zwei Leitungen und die Anschlussrichtung nach oben entfallen im kurzen Modellnamen.",
    "exampleHeaders": [
      "Feld",
      "Einordnung"
    ],
    "exampleRows": [
      [
        "DPL60",
        "Produktserie, Membranpumpe für Flüssigkeiten der 600-mL/min-Klasse"
      ],
      [
        "24",
        "DC 24 V"
      ],
      [
        "D",
        "Gleichstrommotor mit Bürsten"
      ],
      [
        "2 (Standard, entfällt)",
        "Zwei Leitungen"
      ],
      [
        "B",
        "Schlauchtülle"
      ],
      [
        "C (Standard, entfällt)",
        "Anschlussrichtung nach oben"
      ],
      [
        "EP/PS",
        "EPDM-Membran + EPDM-Ventil + PPS-Pumpenkopf"
      ]
    ],
    "notice": "Die Kennung „DB“ setzt sich aus D für den Bürstenmotor und B für die Schlauchtülle zusammen. Bei DPL60-24BB-EP/PS steht das erste B für den bürstenlosen Motor und das zweite für die Schlauchtülle.",
    "standardModelsTitle": "Acht aktuelle Standardmodelle der DPL60",
    "standardModelsIntro": "Die freigegebene Auswahltabelle umfasst 12 V / 24 V × Bürstenmotor / bürstenlos × EP/PS / FF/PS. Alle Modellbezeichnungen und Artikelnummern unten sind als durchsuchbarer HTML-Text verfügbar.",
    "standardModelHeaders": [
      "Nr.",
      "Artikelnummer",
      "Standardmodell",
      "Spannung",
      "Motor",
      "Membran",
      "Ventil",
      "Pumpenkopf"
    ],
    "standardModelRows": [
      [
        "1",
        "459003",
        "DPL60-24DB-EP/PS",
        "24 V",
        "Mit Bürstenmotor",
        "EPDM",
        "EPDM",
        "PPS"
      ],
      [
        "2",
        "459004",
        "DPL60-24BB-EP/PS",
        "24 V",
        "Bürstenlos",
        "EPDM",
        "EPDM",
        "PPS"
      ],
      [
        "3",
        "459015",
        "DPL60-12DB-EP/PS",
        "12 V",
        "Mit Bürstenmotor",
        "EPDM",
        "EPDM",
        "PPS"
      ],
      [
        "4",
        "459016",
        "DPL60-12BB-EP/PS",
        "12 V",
        "Bürstenlos",
        "EPDM",
        "EPDM",
        "PPS"
      ],
      [
        "5",
        "459030",
        "DPL60-24DB-FF/PS",
        "24 V",
        "Mit Bürstenmotor",
        "PTFE",
        "FFKM",
        "PPS"
      ],
      [
        "6",
        "459031",
        "DPL60-24BB-FF/PS",
        "24 V",
        "Bürstenlos",
        "PTFE",
        "FFKM",
        "PPS"
      ],
      [
        "7",
        "459032",
        "DPL60-12DB-FF/PS",
        "12 V",
        "Mit Bürstenmotor",
        "PTFE",
        "FFKM",
        "PPS"
      ],
      [
        "8",
        "459033",
        "DPL60-12BB-FF/PS",
        "12 V",
        "Bürstenlos",
        "PTFE",
        "FFKM",
        "PPS"
      ]
    ]
  },
  "section9": {
    "title": "9. Vollständiger Auswahlablauf für die DPL60",
    "steps": [
      [
        "Erforderliche Fördermenge im Betrieb festlegen",
        "Unterscheiden Sie 600 mL/min bei nahezu freiem Auslauf von der Fördermenge, die bei einem bestimmten Systemdruck benötigt wird."
      ],
      [
        "Systemdruck bestimmen",
        "Leitungen, Fittings, Filter, Ventile, Engstellen, unterschiedliche Flüssigkeitsspiegel und Druck am Ende des Fluidpfads berücksichtigen."
      ],
      [
        "Freigegebene Kennlinie lesen",
        "Zielbetriebspunkt ermitteln und ausreichende Leistungsreserve bestätigen."
      ],
      [
        "Fördermedium festlegen",
        "Stoffbezeichnung, Zusammensetzung, Konzentration, Temperatur, Viskosität, Partikel und Kontaktzeit angeben."
      ],
      [
        "Ansaugbedingungen festlegen",
        "Ansaughöhe, Länge und Durchmesser der Saugleitung, Luftdichtheit und Zustand beim ersten Start erfassen."
      ],
      [
        "Spannung und Motor auswählen",
        "12 V oder 24 V und Bürstenmotor oder bürstenlosen Motor anhand von Versorgung, Betriebszyklus, Nutzungsdauer und Ansteuerung wählen."
      ],
      [
        "Medienberührte Werkstoffe auswählen",
        "EP/PS oder FF/PS für die vollständigen Medienbedingungen prüfen."
      ],
      [
        "Einbau und Anschlüsse prüfen",
        "Schlauch mit 3.2 mm Innendurchmesser, Zeichnungsmaße, Anschlussrichtung, Leitungsbaum und Wartungszugang prüfen."
      ],
      [
        "Im Gerät validieren",
        "Fördermenge, Ansaugen, Geräusch, Temperaturanstieg, Stabilität und Langzeitbetrieb im tatsächlichen Fluidpfad prüfen."
      ]
    ]
  },
  "section10": {
    "title": "10. Geeignete Aufgaben und Einsatzgrenzen",
    "intro": "Die DPL60 kann für die Förderung größerer Flüssigkeitsmengen in IVD-Geräten, Laborautomationssystemen und Analysegeräten geprüft werden. Typische Aufgaben sind Waschflüssigkeitsversorgung, Leitungsspülung, Umwälzung, Förderung größerer Volumina und Abtransport von Abfallflüssigkeit.",
    "headers": [
      "Thema",
      "Auslegungsgrenze"
    ],
    "rows": [
      [
        "600 mL/min",
        "Referenzwert bei freiem Auslauf. Im eingebauten Zustand hängt die Fördermenge vom Betriebspunkt ab."
      ],
      [
        "100 kPa",
        "Der Nenndruck ist eine separate Angabe. Entnehmen Sie der Kennlinie die Fördermenge beim Zieldruck."
      ],
      [
        "Andere Flüssigkeiten",
        "Gereinigtes Wasser ist das spezifizierte Medium. Andere Flüssigkeiten erfordern eine Verträglichkeitsprüfung und Prüfungen mit Mustern."
      ],
      [
        "Selbstansaugung",
        "3 mH₂O gelten für festgelegte Bedingungen. Das tatsächliche Anlaufverhalten hängt vom vollständigen saugseitigen Fluidpfad ab."
      ],
      [
        "Nutzungsdauer",
        "3.000 h mit Bürstenmotor und 10.000 h bürstenlos gelten jeweils bei Nennspannung im Dauerbetrieb."
      ],
      [
        "Abschließende Validierung",
        "Spezifikationen, Kennlinien, Zeichnungen und Werkstoffe unterstützen die Auswahl. Bestätigen Sie die Leistung im tatsächlichen Gerät."
      ]
    ]
  },
  "section11": {
    "title": "Fazit",
    "paragraphs": [
      "Unterscheiden Sie zur Auswahl der DPL60 die 600-mL/min-Klasse von der tatsächlich erforderlichen Fördermenge im Gerät. Legen Sie die Ausführung anhand des Nenndrucks von 100 kPa, der freigegebenen Kennlinie, des Mediums, der Ansaugbedingungen, der Werkstoffe, der Stromversorgung, der Motornutzungsdauer und des Bauraums fest.",
      "Muss das Gerät bei nennenswertem Gegendruck annähernd 600 mL/min fördern, legen Sie den Kennlinienwert beim Zieldruck und die Prüfung des gesamten Fluidpfads zugrunde. Die Fördermenge bei freiem Auslauf allein reicht hierfür nicht aus."
    ]
  },
  "internalLinks": {
    "dpl30Prefix": "Den vollständigen Pumpzyklus mit Membran und Rückschlagventilen sowie den Vergleich mit der 300-mL/min-Klasse finden Sie im",
    "dpl30Label": "Auswahlleitfaden für die Flüssigkeits-Membranpumpe DPL30",
    "dpl30Suffix": ".",
    "productPrefix": "Verfügbare Ausführungen, Zeichnungen und Downloads finden Sie auf der",
    "productLabel": "Produktseite der Membranpumpe für Flüssigkeiten DPL60",
    "productSuffix": ".",
    "categoryPrefix": "Weitere Fördermengen- und Druckklassen finden Sie in der",
    "categoryLabel": "Kategorie für Membranpumpen für Flüssigkeiten",
    "categorySuffix": "."
  }
};

export const dpl60ArticleDeFaq: Dpl30FaqCopy = {
  "title": "Häufige Fragen",
  "items": [
    {
      "question": "Sind 600 mL/min die Fördermenge der DPL60 im eingebauten Zustand?",
      "answer": "Der angegebene Wert gilt bei freiem Auslauf. Im Gerät hängt die Fördermenge von Unterdruck am Einlass, Auslassdruck, Leitungen, Ventilen, Filtern, Fittings, Flüssigkeitsspiegel und Eigenschaften des Mediums ab."
    },
    {
      "question": "Fördert die DPL60 bei 100 kPa noch 600 mL/min?",
      "answer": "Die Angaben von 600 mL/min bei freiem Auslauf und 100 kPa Nenndruck beschreiben verschiedene Betriebspunkte. Lesen Sie die freigegebene Fördermengen-Druck-Kennlinie und prüfen Sie den eingebauten Fluidpfad beim benötigten Druck."
    },
    {
      "question": "Wie wähle ich bei der DPL60 zwischen Bürstenmotor und bürstenlosem Motor?",
      "answer": "Die angegebene Nutzungsdauer beträgt 3.000 h mit Bürstenmotor und 10.000 h bei der bürstenlosen Ausführung, jeweils bei Nennspannung im Dauerbetrieb. Prüfen Sie bürstenlose Ausführungen für längere Laufzeiten oder wenn PWM, Drehrichtungssteuerung oder Drehzahlrückmeldung erforderlich sind."
    }
  ]
};
