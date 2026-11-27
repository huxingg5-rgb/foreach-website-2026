import type { Dpl30ArticleCopy, Dpl30FaqCopy } from "./dpl30-liquid-diaphragm-pump.types";

export const dpl30ArticleDeCopy: Dpl30ArticleCopy = {
  "metadata": {
    "title": "Flüssigkeits-Membranpumpe mit 300 mL/min auswählen: Funktionsprinzip und Modellübersicht der DPL30",
    "seoTitle": "Membranpumpe für Flüssigkeiten mit 300 mL/min auswählen | DPL30-Modellübersicht",
    "seoDescription": "Erfahren Sie, wie die DPL30 arbeitet und welches Modell zu Ihrer Anwendung passt. Der Leitfaden behandelt 300 mL/min bei freiem Auslauf, 100 kPa Nenndruck, die Fördermengen-Druck-Kennlinie, medienberührte Werkstoffe und Varianten mit Bürstenmotor oder bürstenlosem Motor."
  },
  "diagram": {
    "ariaLabel": "Schaubild zum Ansaugen und Fördern von Flüssigkeit in einer Membranpumpe",
    "suctionTitle": "Ansaugen",
    "dischargeTitle": "Fördern",
    "inletOpen": "Einlassventil offen",
    "outletClosed": "Auslassventil geschlossen",
    "suctionDescription": "Das Kammervolumen steigt, Flüssigkeit strömt ein",
    "inletClosed": "Einlassventil geschlossen",
    "outletOpen": "Auslassventil offen",
    "dischargeDescription": "Das Kammervolumen sinkt, Flüssigkeit strömt aus",
    "caption": "Saug- und Förderhub einer Membranpumpe für Flüssigkeiten"
  },
  "section1": {
    "title": "1. Wie saugt eine Membranpumpe Flüssigkeit an und fördert sie weiter?",
    "paragraphs": [
      "Eine Membranpumpe für Flüssigkeiten ist eine Verdrängerpumpe. Sie fördert Flüssigkeit durch die Hin- und Herbewegung einer flexiblen Membran. Ihre Hauptbestandteile sind Pumpenkammer, Membran, Einlassventil, Auslassventil und Antrieb.",
      "Der Motor bewegt die Membran über einen Exzenter hin und her. Dadurch ändert sich das Volumen der Pumpenkammer zyklisch. Beim Saughub vergrößert die Membranbewegung das Kammervolumen und senkt den Kammerdruck unter den Einlassdruck. Das Einlassventil öffnet, das Auslassventil schließt und Flüssigkeit strömt in die Kammer. Beim Förderhub kehrt die Membran ihre Bewegungsrichtung um. Das Kammervolumen sinkt, der Kammerdruck steigt, das Einlassventil schließt und das Auslassventil öffnet. Die Flüssigkeit wird in die nachgeschaltete Leitung gefördert.",
      "Die Membran trennt das Fördermedium vom Antrieb. Die Flüssigkeit berührt hauptsächlich Pumpenkopf, Membran und Ventilplättchen. Daher lassen sich für verschiedene Medien unterschiedliche Kombinationen medienberührter Werkstoffe prüfen.",
      "Die Hin- und Herbewegung führt zu Pulsationen von Volumenstrom und Druck. Kammergeometrie, Drehzahl, Membranhub, Ventilverhalten, Leitungselastizität, Gegendruck und Dämpfungselemente beeinflussen deren Stärke. Bei hohen Anforderungen an einen gleichmäßigen Volumenstrom ist die Prüfung im vollständigen Fluidpfad erforderlich."
    ]
  },
  "section2": {
    "title": "2. Was muss bei der Auswahl einer Membranpumpe für Flüssigkeiten geklärt werden?",
    "intro": "Eine Angabe von „300 mL/min“ allein reicht für die Auswahl einer Membranpumpe nicht aus. Klären Sie zusätzlich das Fördermedium, die Messbedingungen der Fördermenge, den Systemdruck, die Selbstansaughöhe, die medienberührten Werkstoffe, den Motortyp, die Betriebsdauer und den Strömungswiderstand.",
    "headers": [
      "Auswahlkriterium",
      "Was zu prüfen ist",
      "Häufiger Fehler"
    ],
    "rows": [
      [
        "Fördermedium",
        "Bezeichnung der Flüssigkeit, Konzentration, Temperatur, Viskosität, Partikel und dauerhafte Kontaktzeit",
        "Von PTFE oder FFKM auf die Verträglichkeit der gesamten Pumpe mit jeder Chemikalie schließen"
      ],
      [
        "Fördermenge",
        "Klären, ob die Angabe für freien Auslauf, den Nennwert, die maximale Fördermenge oder den Betrieb bei einem bestimmten Druck gilt",
        "Die Fördermenge bei freiem Auslauf mit der tatsächlichen Fördermenge im Gerät gleichsetzen"
      ],
      [
        "Druck",
        "Widerstand durch nachgeschaltete Filter, Leitungen, Fittings, Ventile, Düsen und unterschiedliche Flüssigkeitsspiegel",
        "Nur den Höchstdruck prüfen und die Fördermenge beim Zieldruck übergehen"
      ],
      [
        "Selbstansaugung",
        "Höhenunterschied zwischen Flüssigkeitsspiegel und Pumpeneinlass sowie Füllzustand der Leitung beim Start",
        "Die Selbstansaughöhe im Datenblatt als Zusage für stabiles Ansaugen unter allen Bedingungen verstehen"
      ],
      [
        "Medienberührte Werkstoffe",
        "Werkstoffe von Pumpenkopf, Membran und Ventilplättchen",
        "Nur die Membran prüfen und Ventile sowie Pumpenkopf außer Acht lassen"
      ],
      [
        "Motor und Nutzungsdauer",
        "12 V oder 24 V, tägliche Betriebszeit und Dauer- oder Intervallbetrieb",
        "Angaben zur Nutzungsdauer ohne die zugehörigen Prüfbedingungen verwenden"
      ],
      [
        "Leitungsbedingungen",
        "Leitungsinnendurchmesser, Leitungslänge, Bögen, Filter und Anzahl der Anschlüsse",
        "Den Einfluss des Leitungswiderstands auf die tatsächliche Fördermenge übergehen"
      ],
      [
        "Pulsation und Geräusch",
        "Anforderungen des Systems an gleichmäßigen Volumenstrom, Schwingungen und Geräuschemission",
        "Eine Membranpumpe als völlig pulsationsfrei oder geräuschlos beschreiben"
      ]
    ]
  },
  "section3": {
    "title": "3. Warum reicht die Angabe von 300 mL/min zur Auswahl der DPL30 nicht aus?",
    "paragraphs": [
      "Die Angabe „300 mL/min“ gilt in Verbindung mit den jeweiligen Prüfbedingungen. Sie kann die Fördermenge bei freiem Auslauf, die maximale Fördermenge, den Nennwert oder die Fördermenge im Betrieb bei einem bestimmten Druck bezeichnen.",
      "Im eingebauten Zustand verursachen Leitungen, Filter, Fittings, Ventile, Düsen und der Höhenunterschied der Flüssigkeitsspiegel einen Strömungswiderstand. Bei zunehmendem Unterdruck am Einlass oder steigendem Auslassdruck ändert sich die tatsächliche Fördermenge.",
      "„Etwa 300 mL/min bei freiem Auslauf“ und „300 mL/min beim tatsächlichen Systemdruck“ sind daher unterschiedliche Anforderungen. Bestimmen Sie im zweiten Fall zuerst den Systemdruck. Ermitteln Sie anschließend den Betriebspunkt anhand der Fördermengen-Druck-Kennlinie und einer Prüfung im eingebauten Zustand."
    ],
    "noticeStrong": "Die 300 mL/min im DPL30-Datenblatt bezeichnen die Fördermenge bei freiem Auslauf.",
    "noticeText": "Der Nenndruck beträgt 100 kPa. Die beiden Angaben gehören zu verschiedenen Betriebspunkten. Sie belegen keine Fördermenge der DPL30 von 300 mL/min bei 100 kPa."
  },
  "section4": {
    "title": "4. Vollständige technische Daten der DPL30",
    "intro": "Die DPL30 ist mit 12 V und 24 V sowie mit Bürstenmotor oder bürstenlosem Motor erhältlich. Die folgenden Werte stammen aus dem aktuellen DPL30-Datenblatt.",
    "headers": [
      "Parameter",
      "Ausführung mit Bürstenmotor",
      "Bürstenlose Ausführung"
    ],
    "rows": [
      {
        "label": "Produktbezeichnung",
        "value": "Membranpumpe für Flüssigkeiten DPL30"
      },
      {
        "label": "Basismodelle",
        "brushed": "DPL30-24DB, DPL30-12DB",
        "brushless": "DPL30-24BB, DPL30-12BB"
      },
      {
        "label": "Motortyp",
        "brushed": "Gleichstrommotor mit Bürsten",
        "brushless": "Bürstenloser Gleichstrommotor"
      },
      {
        "label": "Nennspannung",
        "value": "DC 12V ±10% oder DC 24V ±10%"
      },
      {
        "label": "Nennleistung",
        "value": "≤8W"
      },
      {
        "label": "Freier Förderstrom",
        "value": "300 mL/min"
      },
      {
        "label": "Nenndruck",
        "value": "100 kPa"
      },
      {
        "label": "Selbstansaughöhe",
        "value": "6 mH₂O"
      },
      {
        "label": "Fördermedium",
        "value": "Gereinigtes Wasser. Andere Flüssigkeiten muss der Kunde unter tatsächlichen Betriebsbedingungen prüfen."
      },
      {
        "label": "Mediumtemperatur",
        "value": "+5℃ bis +80℃"
      },
      {
        "label": "Schlauchanschluss",
        "value": "Für Schläuche mit 3.2 mm Innendurchmesser"
      },
      {
        "label": "Werkstoff des Pumpenkopfs",
        "value": "PPS"
      },
      {
        "label": "Membranwerkstoff",
        "value": "EPDM oder PTFE"
      },
      {
        "label": "Ventilwerkstoff",
        "value": "EPDM oder FFKM"
      },
      {
        "label": "Gewicht",
        "brushed": "Ca. 160 g",
        "brushless": "Ca. 185 g"
      },
      {
        "label": "Nutzungsdauer",
        "brushed": "3000 h bei Nennspannung im Dauerbetrieb",
        "brushless": "10000 h bei Nennspannung im Dauerbetrieb"
      },
      {
        "label": "Geräuschpegel",
        "value": "≤80 dB"
      },
      {
        "label": "Umgebungstemperatur im Betrieb",
        "value": "+5℃ bis +40℃"
      },
      {
        "label": "Relative Luftfeuchte im Betrieb",
        "value": "30% bis 85% relative Luftfeuchte, nicht kondensierend"
      },
      {
        "label": "Lagertemperatur",
        "value": "-10℃ bis +40℃"
      },
      {
        "label": "Relative Luftfeuchte bei Lagerung",
        "value": "10% bis 90% relative Luftfeuchte, nicht kondensierend"
      }
    ]
  },
  "section5": {
    "title": "5. Wie liest man die Fördermengen-Druck-Kennlinie der DPL30?",
    "paragraphs": [
      "Die Kennlinie zeigt die Fördermenge der DPL30 bei Unterdruck am Einlass und Überdruck am Auslass. Die linke Seite der horizontalen Achse gibt den Unterdruck am Einlass an, die rechte Seite den Überdruck am Auslass. Die vertikale Achse zeigt den Volumenstrom.",
      "Nahezu ohne Gegendruck fördert die DPL30 etwa 300 mL/min. Mit steigendem Auslassdruck nimmt die Fördermenge allmählich ab. Sie sinkt auch bei zunehmendem Unterdruck am Einlass, wenn sich die Ansaugbedingungen verschlechtern."
    ],
    "figureAlt": "Fördermengen-Druck-Kennlinie der Membranpumpe für Flüssigkeiten DPL30",
    "figureCaption": "Fördermengen-Druck-Kennlinie der DPL30",
    "notice": "Die Fördermengen-Druck-Kennlinie dient der Vorauswahl. Viskosität, Leitungsgröße, Filter, Ventile, Fittings, Einbauart und unterschiedliche Flüssigkeitsspiegel beeinflussen den tatsächlichen Betriebspunkt. Bestätigen Sie ihn am realen Fluidpfad."
  },
  "section6": {
    "title": "6. Wie wählt man die medienberührten Werkstoffe der DPL30?",
    "intro": "Die wichtigsten medienberührten Bauteile der DPL30 sind Pumpenkopf, Membran und Ventilplättchen. Prüfen Sie die Verträglichkeit der vollständigen Kombination medienberührter Werkstoffe.",
    "headers": [
      "Medienberührtes Bauteil",
      "Verfügbarer Werkstoff",
      "Zuordnung im Modellcode"
    ],
    "rows": [
      [
        "Pumpenkopf",
        "Polyphenylensulfid (PPS)",
        "PS"
      ],
      [
        "Membran",
        "EPDM oder PTFE",
        "EPDM bei EP/PS, PTFE bei FF/PS"
      ],
      [
        "Ventilplättchen",
        "EPDM oder FFKM",
        "EPDM bei EP/PS, FFKM bei FF/PS"
      ]
    ],
    "epTitle": "Werkstoffkombination EP/PS",
    "epText": "EP/PS steht für eine EPDM-Membran, EPDM-Ventilplättchen und einen PPS-Pumpenkopf. Die Kombination dient als Ausgangspunkt für die Prüfung mit gereinigtem Wasser und einigen gängigen Flüssigkeiten.",
    "ffTitle": "Werkstoffkombination FF/PS",
    "ffText": "FF/PS steht für eine PTFE-Membran, FFKM-Ventilplättchen und einen PPS-Pumpenkopf. Die Kombination kommt für Anwendungen mit höheren Anforderungen an die Werkstoffverträglichkeit zur Prüfung infrage.",
    "noticeStrong": "Die Verträglichkeit der gesamten Pumpe muss für die vollständige Werkstoffkombination beurteilt werden.",
    "noticeText": "Geben Sie vor der Auswahl Flüssigkeitsbezeichnung, Rezeptur, Konzentration, Temperatur, dauerhafte Kontaktzeit, Reinigungsverfahren und Betriebsbedingungen an. Prüfen Sie den gesamten medienberührten Pfad."
  },
  "section7": {
    "title": "7. Wie wählt man zwischen Bürstenmotor und bürstenlosem Motor?",
    "intro": "Die beiden Motorvarianten unterscheiden sich bei Nutzungsdauer, Gewicht, Gesamtlänge und Anschlussbelegung.",
    "headers": [
      "Vergleichskriterium",
      "Ausführung mit Bürstenmotor",
      "Bürstenlose Ausführung"
    ],
    "rows": [
      [
        "Motortyp",
        "Gleichstrommotor mit Bürsten",
        "Bürstenloser Gleichstrommotor"
      ],
      [
        "Angegebene Nutzungsdauer",
        "3000 h bei Nennspannung im Dauerbetrieb",
        "10000 h bei Nennspannung im Dauerbetrieb"
      ],
      [
        "Typischer Einsatz",
        "Geräte mit begrenzter Betriebszeit und engen Kostenvorgaben",
        "Geräte mit längerer Betriebszeit und höheren Anforderungen an die Gerätelebensdauer"
      ],
      [
        "Gewicht",
        "Ca. 160 g",
        "Ca. 185 g"
      ],
      [
        "Ansteuerung",
        "Einfacher Anschluss an Plus- und Minuspol der Versorgung",
        "Je nach Ausführung sind PWM, Drehrichtungssteuerung oder Drehzahlrückmeldung möglich"
      ]
    ],
    "afterTable": "Beurteilen Sie Angaben zur Nutzungsdauer immer zusammen mit den Prüfbedingungen. Gegendruck, Schwankungen der Versorgungsspannung, Umgebungstemperatur, häufiges Starten und Stoppen, Wärmeabfuhr im Einbau und Zustand der Flüssigkeit können die tatsächliche Nutzungsdauer beeinflussen.",
    "brushedTitle": "Abmessungen der Variante mit Bürstenmotor",
    "brushedAlt": "Abmessungen der Membranpumpe für Flüssigkeiten DPL30 mit Bürstenmotor",
    "brushedCaption": "Maßzeichnung der DPL30 mit Bürstenmotor",
    "brushedText": "Die Variante mit Bürstenmotor ist etwa 83.2 mm lang und 57.3 mm hoch. Die maximale Gehäusebreite beträgt etwa 30 mm, die Breite des Pumpenkopfs etwa 26 mm. Die Schlauchtülle hat einen Außendurchmesser von etwa φ4.5 mm für Schläuche mit 3.2 mm Innendurchmesser. Entnehmen Sie der freigegebenen Maßzeichnung die exakten Befestigungsbohrungen, Abmessungen und die Anschlussrichtung.",
    "brushlessTitle": "Abmessungen der bürstenlosen Variante",
    "brushlessAlt": "Abmessungen der bürstenlosen Membranpumpe für Flüssigkeiten DPL30",
    "brushlessCaption": "Maßzeichnung der bürstenlosen DPL30",
    "brushlessText": "Für die bürstenlose Variante stehen zwei gleichwertige Motorausführungen A und B mit gleichen elektrischen Parametern und gleicher Leistung zur Verfügung. Sie unterscheiden sich hauptsächlich bei den Einbaumaßen. Die Gehäuselänge beträgt etwa 70 mm oder 68 mm, die Gesamthöhe etwa 57.3 mm und die maximale Gehäusebreite etwa 30 mm."
  },
  "section8": {
    "title": "8. Modellcode und verfügbare Ausführungen der DPL30",
    "intro": "Der vollständige DPL30-Modellcode enthält Serie, Betriebsspannung, Motortyp, Leitungszahl, Anschlussart, Anschlussrichtung, Werkstoffe von Membran, Ventilen und Pumpenkopf sowie eine Kennung für optionale Sonderausführungen.",
    "noticeStrong": "DPL30 - 24 - D - 2 - B - C - EP/PS - X",
    "noticeText": "Produktserie · Betriebsspannung · Motortyp · Verdrahtung · Anschlussart · Anschlussrichtung · Medienberührte Werkstoffe · Kundenspezifische Ausführung",
    "headers": [
      "Feld",
      "Code",
      "Bedeutung"
    ],
    "rows": [
      [
        "Produktserie",
        "DPL30",
        "Serie DPL30 für Membranpumpen für Flüssigkeiten"
      ],
      [
        "Betriebsspannung",
        "24 / 12",
        "DC 24V / DC 12V"
      ],
      [
        "Motortyp",
        "D / B / C / BP",
        "D: Gleichstrommotor mit Bürsten. B: bürstenloser Gleichstrommotor. C: eisenloser Motor. BP: bürstenloser Gleichstrommotor mit externem PWM-Signal."
      ],
      [
        "Verdrahtung",
        "2 / 3 / 5",
        "2, 3 oder 5 Leitungen. Bei der Standardausführung mit 2 Leitungen kann die Kennung entfallen."
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
        "Werkstoffe von Membran, Ventilen und Pumpenkopf",
        "EP/PS / FF/PS",
        "EP/PS: EPDM-Membran und EPDM-Ventile mit PPS-Pumpenkopf. FF/PS: PTFE-Membran, FFKM-Ventile und PPS-Pumpenkopf."
      ],
      [
        "Kundenspezifische Ausführung",
        "X",
        "Kundenspezifischer Code. Es gilt die abschließende Projektfreigabe."
      ]
    ],
    "exampleTitle": "Modellbeispiel: DPL30-24DB-EP/PS",
    "exampleText": "Die vollständige Kennung lautet DPL30-24-D-2-B-C-EP/PS: Serie DPL30, DC 24V, Gleichstrommotor mit Bürsten, 2 Leitungen, Schlauchtülle, Anschlussrichtung nach oben, EPDM-Membran und EPDM-Ventilplättchen sowie PPS-Pumpenkopf.",
    "notice": "Die Kennung „DB“ setzt sich aus D für Gleichstrommotor mit Bürsten und B für Schlauchtülle zusammen. Bei DPL30-24BB-EP/PS steht entsprechend das erste B für den bürstenlosen Motor und das zweite B für die Schlauchtülle."
  },
  "section9": {
    "title": "9. Vollständiger Auswahlablauf für die DPL30",
    "steps": [
      [
        "Zielfördermenge klären",
        "Unterscheiden Sie etwa 300 mL/min bei freiem Auslauf von der erforderlichen Fördermenge beim tatsächlichen Systemdruck."
      ],
      [
        "Systemdruck klären",
        "Schätzen Sie den Widerstand durch Filter, Leitungen, Fittings, Ventile, Düsen und unterschiedliche Flüssigkeitsspiegel ab. Verwenden Sie anschließend die Fördermengen-Druck-Kennlinie."
      ],
      [
        "Fördermedium klären",
        "Geben Sie Flüssigkeitsbezeichnung, Rezeptur, Konzentration, Temperatur, Viskosität, Partikel und dauerhafte Kontaktzeit an."
      ],
      [
        "Betriebsspannung auswählen",
        "Wählen Sie entsprechend der Versorgung des Geräts DC 12V oder DC 24V."
      ],
      [
        "Motortyp auswählen",
        "Prüfen Sie für eine begrenzte Laufzeit und enge Kostenvorgaben die Variante mit Bürstenmotor. Berücksichtigen Sie bei längerer Laufzeit oder höheren Anforderungen an die Nutzungsdauer zuerst die bürstenlose Variante."
      ],
      [
        "Verdrahtung und Ansteuerung klären",
        "Klären Sie, ob 2, 3 oder 5 Leitungen sowie die Funktionen PWM, DIR und FG erforderlich sind."
      ],
      [
        "Fluidanschluss klären",
        "Wählen Sie je nach Leitung und Aufbau des Fluidpfads eine Schlauchtülle oder einen Gewindeanschluss."
      ],
      [
        "Anschlussrichtung klären",
        "Wählen Sie oben, rechts, unten oder links je nach Einbauraum, Leitungsverlauf, Biegeradius und Zugang für die Wartung."
      ],
      [
        "Medienberührte Werkstoffe klären",
        "Wählen Sie EP/PS oder FF/PS nach Werkstoffverträglichkeit aus und prüfen Sie den vollständigen medienberührten Pfad."
      ],
      [
        "Einbauvalidierung abschließen",
        "Bestätigen Sie den Einbauraum anhand der Maßzeichnung und prüfen Sie Fördermenge, Druck, Geräusch, Nutzungsdauer und Betriebsstabilität im tatsächlichen Fluidpfad."
      ]
    ]
  },
  "section10": {
    "title": "10. Anwendungsbereiche und Einsatzgrenzen",
    "intro": "Die DPL30 kann für die Flüssigkeitsförderung in IVD-Geräten, Laboranalysegeräten und medizinischen Geräten geprüft werden. Dazu gehören die Förderung von gereinigtem Wasser, Wasch- und Spülleitungen sowie die Förderung von Abfallflüssigkeit.",
    "headers": [
      "Merkmal",
      "Erläuterung"
    ],
    "rows": [
      [
        "Für die Geräteauslegung prüfbar",
        "Prüfen Sie die Eignung für das konkrete Gerät anhand von Flüssigkeit, Fördermenge, Druck, Betriebszeit und sämtlichen Geräteanforderungen."
      ],
      [
        "Zertifizierung des Medizinprodukts",
        "Die Auswahl für den Einbau in ein medizinisches Gerät belegt keine Zertifizierung der Pumpe als vollständiges Medizinprodukt."
      ],
      [
        "Andere Flüssigkeiten erfordern eine Prüfung",
        "Als Fördermedium ist gereinigtes Wasser angegeben. Für andere Flüssigkeiten sind Verträglichkeitsprüfung und Prüfung mit Mustern erforderlich."
      ],
      [
        "Längerer Trockenlauf erfordert eine gesonderte Bestätigung",
        "Die aktuelle Spezifikation gibt keine ausdrückliche Zusage für längeren Trockenlauf. Anwendungen mit Trockenlauf müssen gesondert geprüft werden."
      ],
      [
        "Prüfbedingungen für die Nutzungsdauer",
        "3000 h und 10000 h gelten bei Nennspannung im Dauerbetrieb. Last, Temperatur und Starthäufigkeit beeinflussen die tatsächliche Nutzungsdauer ebenfalls."
      ],
      [
        "Geräteprüfung zur abschließenden Bestätigung",
        "Kennlinien, Abmessungen und Werkstoffdaten unterstützen die Auswahl. Bestätigen Sie die Eignung abschließend im tatsächlichen Fluidpfad und Gerät."
      ]
    ]
  },
  "section11": {
    "title": "Fazit",
    "paragraphs": [
      "Legen Sie zur Auswahl der DPL30 zuerst die angestrebte Fördermenge im Betrieb und den Systemdruck fest. Der Wert von „300 mL/min“ allein reicht dafür nicht aus. Bestimmen Sie die Ausführung anschließend anhand der Flüssigkeit, der medienberührten Werkstoffe, der Stromversorgung, der Motornutzungsdauer, der Anschlussart, der Einbaulage und des verfügbaren Bauraums.",
      "Erfassen Sie vor der Auswahl die Zielfördermenge im Betrieb, den normalen Betriebsdruck, Bezeichnung, Konzentration und Temperatur der Flüssigkeit, tägliche Laufzeit, Versorgungsspannung, Leitungsinnendurchmesser und -länge, Filter- und Ventilkonfiguration, Bauraum und Anschlussrichtung. Auf dieser Grundlage lässt sich die passende DPL30-Ausführung bestätigen."
    ]
  }
};

export const dpl30ArticleDeFaq: Dpl30FaqCopy = {
  "title": "Häufig gestellte Fragen",
  "items": [
    {
      "question": "Wofür steht die Fördermengenangabe von 300 mL/min bei der DPL30?",
      "answer": "300 mL/min ist die Fördermenge bei freiem Auslauf gemäß aktuellem DPL30-Datenblatt unter den angegebenen Prüfbedingungen. Die Pumpe erreicht 300 mL/min nicht bei beliebigem Gegendruck, beliebiger Ansaughöhe oder allen Leitungs- und Medienbedingungen. Bestimmen Sie die tatsächliche Fördermenge anhand des Strömungswiderstands, der Fördermengen-Druck-Kennlinie und des Betriebspunkts."
    },
    {
      "question": "Fördert die DPL30 auch bei 100 kPa noch 300 mL/min?",
      "answer": "Nein. Die Angabe von 300 mL/min gilt bei freiem Auslauf, 100 kPa ist der Nenndruck. Die beiden Kennwerte bezeichnen unterschiedliche Betriebszustände und belegen nicht, dass die DPL30 300 mL/min bei 100 kPa erreicht. Bestätigen Sie die Fördermenge unter Druck anhand der Kennlinie und im tatsächlichen Fluidpfad."
    },
    {
      "question": "Wie hoch ist die Selbstansaughöhe der DPL30?",
      "answer": "Die Selbstansaughöhe der DPL30 beträgt unter den angegebenen Prüfbedingungen 6 mH₂O. Eigenschaften der Flüssigkeit, Durchmesser und Länge der Leitung, Einlasswiderstand, Höhenunterschied der Flüssigkeitsspiegel, Dichtheit und Einbaubedingungen können die tatsächliche Ansaughöhe beeinflussen. Prüfen Sie die Leistung unter realen Systembedingungen."
    },
    {
      "question": "Eignet sich die DPL30 zur Förderung von Abfallflüssigkeit in medizinischen Geräten oder IVD-Geräten?",
      "answer": "Die DPL30 kommt als Kandidat für den Abtransport von Abfallflüssigkeit aus IVD-Geräten, Analysegeräten und Systemen zur Laborautomation infrage. Prüfen Sie Eigenschaften der Abfallflüssigkeit, Fördermenge im Betrieb, Gegendruck, erforderliche Selbstansaughöhe, medienberührte Werkstoffe, Betriebszeit und Bauraum. Bestätigen Sie die Eignung durch eine Prüfung im tatsächlichen Fluidpfad."
    },
    {
      "question": "Wie wähle ich bei der DPL30 zwischen Bürstenmotor und bürstenlosem Motor?",
      "answer": "Für Geräte mit kurzer Betriebszeit und höherem Kostendruck kommt die Variante mit Bürstenmotor zuerst infrage. Bei längerer Betriebszeit oder höheren Anforderungen an die Lebensdauer kann die bürstenlose Variante vorrangig geprüft werden. Das aktuelle Datenblatt nennt 3000 h für die Ausführung mit Bürstenmotor und 10000 h für die bürstenlose Ausführung, jeweils bei Nennspannung im Dauerbetrieb. Diese Referenzwerte gelten für definierte Prüfbedingungen."
    },
    {
      "question": "Welche Flüssigkeiten kann die DPL30 fördern?",
      "answer": "Das aktuelle Datenblatt nennt gereinigtes Wasser als Standardmedium. Prüfen Sie andere Flüssigkeiten mit der vollständigen Kombination medienberührter Werkstoffe, also PPS-Pumpenkopf, EPDM- oder PTFE-Membran sowie EPDM- oder FFKM-Ventilplättchen. Klären Sie außerdem Flüssigkeitsbezeichnung, Konzentration, Temperatur, Kontaktzeit und Reinigungsverfahren. PTFE oder FFKM allein geben keine Auskunft über die Verträglichkeit der gesamten Pumpe."
    },
    {
      "question": "Wo finde ich das Datenblatt der DPL30?",
      "answer": "Wählen Sie unter „Verwandte Produkte“ unterhalb des Artikels das passende DPL30-Produkt. Öffnen Sie die Produktdetailseite, um das aktuell zugeordnete Datenblatt einzusehen. Verwenden Sie die Seite des tatsächlichen Motortyps und Modells, damit keine Dokumente unterschiedlicher Ausführungen vermischt werden."
    },
    {
      "question": "Wie kann ich eine CAD-/3D-Zeichnung für die DPL30 anfordern?",
      "answer": "Wählen Sie unter „Verwandte Produkte“ unterhalb des Artikels das passende DPL30-Modell aus. Öffnen Sie dessen Detailseite und fordern Sie dort eine CAD-/3D-Zeichnung an. Die Einbaumaße können je nach Motortyp und Ausführung abweichen. Fordern Sie daher die Zeichnung für das endgültig ausgewählte Modell an."
    }
  ]
};
