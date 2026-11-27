import type { RplGuideParameters, RplGuideText } from "./types";

export function getGermanRplGuide(p: RplGuideParameters): RplGuideText {
  const motor = "mit " + (p.rinse ? "sechs" : "vier") + " Leitungen, 1.5 A/Phase, 1.8° je Vollschritt";
  return {
    productType: "Ventillose Kolbendosierpumpe",
    lead: p.model + " saugt Flüssigkeit an und fördert sie durch die kombinierte Dreh- und Hubbewegung eines Keramikkolbens. Legen Sie Zieldosiervolumen, verfügbare Dosierzeit, Prozessflüssigkeit und Reinigungsflüssigkeit fest. Wählen Sie daraufhin Fördervolumen, Drehzahl und Leitungen. Messen Sie das abgegebene Volumen am tatsächlichen Auslass.",
    features: [
      ["Fördervolumen und Drehzahl getrennt einstellen", p.range + " μL/rev ist der Fördervolumenbereich pro Umdrehung. Die mechanische Einstellung ändert das Fördervolumen je Umdrehung. Die Drehzahl ändert die Zeit für diese Umdrehungen."],
      ["Satz aus Keramikkolben und Zylinder", "Die dargestellte Ausführung kombiniert einen Pumpenkopf aus PVDF mit einem Keramiksatz aus " + p.ceramic + ". Prüfen Sie die Verträglichkeit aller medienberührten Bauteile mit der Flüssigkeit."],
      ["Montage für eine wirksame Entlüftung", "Ausrichtung des Pumpenkopfs, Strömungsrichtung und Motorposition beeinflussen Entlüftung und Schutz vor Leckagen. Lassen Sie Platz für die Verstellung des Pumpenkopfs und für die Leitungen."],
      [p.rinse ? "Getrennte Prozess- und Spülkreise" : "Reinigung über den Prozesskreis", p.rinse ? "Die Prozessanschlüsse führen Reagenz, die Spülanschlüsse spülen den Kolbenbereich. Bei identischen Gewinden erfüllen die Anschlüsse unterschiedliche Aufgaben." : "Verdrängen Sie die Restflüssigkeit über den Prozesskreis. Legen Sie bei salzhaltigen oder kristallisierenden Flüssigkeiten Reinigungsflüssigkeit, Spülvolumen und Abschaltverfahren gemeinsam fest."],
    ],
    documents: [
      ["Modell und Fördervolumen", p.model + ": " + p.range + " μL/rev. Geben Sie bei der Bestellung die Fördervolumeneinstellung, den Antrieb und die Ausführung der Positionsrückmeldung an."],
      ["Anschlüsse und medienberührte Werkstoffe", "Prozessanschlüsse: " + p.port + ". Pumpenkopf aus PVDF und Keramiksatz aus " + p.ceramic + ". " + (p.rinse ? "Spülanschlüsse: 1/4-28 UNF-2B." : "Diese Ausführung hat keine separaten Spülanschlüsse (RINSE).")],
      ["Prüfbedingungen für die Leistungsdaten", "Prüfbedingungen: reines Wasser, " + p.testRpm + " rpm, Fluidkreisdruck ≤50 kPa und Vorwärtslauf des Motors. Bewerten Sie Genauigkeit, Wiederholbarkeit und Lebensdauer unter Berücksichtigung dieser Bedingungen."],
      ["Prüfpunkte für die Integration", "Prüfen Sie vor der Inbetriebnahme von Antrieb und Flüssigkeitspfad die Einbaulage, den Platz zur Kopfverstellung, die Motorwicklungen, die Schnittstelle des optischen Sensors und die gelieferte Verdrahtungsausführung."],
    ],
    sections: {
      principle: {
        title: "Ansaugen und Fördern durch den Kolben",
        intro: "Der Keramikkolben dreht sich und bewegt sich gleichzeitig axial hin und her. Die Drehung verbindet den abgeflachten Durchlass am Kolben abwechselnd mit Einlass und Auslass. Der Hub ändert das Volumen der Pumpenkammer. Ein vollständiger Zyklus umfasst Ansaugen, Ende des Ansaugens, Fördern und Ende des Förderns.",
      },
      displacement: {
        title: "Fördervolumen, Drehzahl und Dosierzyklus auswählen",
        intro: "Die mechanische Einstellung legt das Fördervolumen pro Umdrehung fest. Die Summe der vollständigen Umdrehungen ergibt die Nenndosis. Die Drehzahl beeinflusst die Förderzeit. Der Bereich " + p.range + " μL/rev der " + p.model + " bezeichnet das Fördervolumen pro Umdrehung. Volumenstrom pro Minute und kleinste zuverlässige Dosis sind getrennt zu bestimmen.",
        rows: [
          ["Einzeldosierung", "Nenndosis = Fördervolumen × vollständige Umdrehungen", "Wählen Sie ein passendes Fördervolumen und prüfen Sie Start- und Stoppeffekte, Resttropfen am Auslass und die erste Dosis nach Pausen. Prüfen Sie die Fördermenge bei Teilumdrehungen separat."],
          ["Kontinuierliche Zufuhr", "Mittlerer Nennvolumenstrom = Fördervolumen × rpm", "Die Multiplikation von μL/rev mit rev/min ergibt μL/min. Der tatsächliche Durchfluss hängt auch von Zufuhr, Gegendruck und Flüssigkeitseigenschaften ab. Prüfen Sie Durchflusspulsationen gesondert."],
          ["Förderzeit", "Zulässige Drehzahl für Modell und Antrieb bestätigen", "Prüfen Sie die Drehzahl mit dem gewählten Antrieb und unter Betriebsbedingungen. Der Gerätezyklus umfasst auch das Positionieren der Gefäße, die Nadelbewegung und die Beruhigungszeit."],
          ["Druck und Genauigkeit", "Druckfestigkeit, Prüfgegendruck und Betriebspunkt unterscheiden", "Die Druckfestigkeit von 150 kPa belegt keinen Dauerbetrieb bei diesem Gegendruck. Die Prüfergebnisse bei " + p.testRpm + " rpm sind nicht ohne Weiteres auf andere Drehzahlen übertragbar."],
        ],
      },
      materials: {
        title: "Pumpenkopf, Keramiksatz und Reinigungsflüssigkeit auswählen",
        intro: "Die gezeigte Ausführung hat einen Pumpenkopf aus PVDF und einen Keramiksatz aus " + p.ceramic + ". Berücksichtigen Sie Prozess- und Reinigungsflüssigkeiten, Konzentration, Temperatur und Kontaktzeit. Prüfen Sie die Medienverträglichkeit der gesamten Pumpe, einschließlich aller medienberührten Werkstoffe.",
        rows: [
          ["Prozessflüssigkeit", "Zusammensetzung, Viskosität, Partikel und Kristallisationsneigung erfassen", "Prüfen Sie bei partikelhaltigen oder kristallisierenden Flüssigkeiten zuerst Filtration, Spülung und Abschaltverfahren. Prüfen Sie dann Bewegung und Fördermenge mit einer Probe."],
          ["Reinigungsflüssigkeit", p.rinse ? "Reinigung des Prozesskreises und Kolbenspülung getrennt auslegen" : "Reinigung über den Prozesskreis vorsehen", p.rinse ? "Der Spülkreis (RINSE) fördert nicht selbstständig. Er erfordert eine externe Spülmittelzufuhr. Verwenden Sie eine für alle medienberührten Werkstoffe geeignete Flüssigkeit. Prüfen Sie nach einem Medienwechsel auf Ausfällungen, Luftblasen und Dichtheitsprobleme." : "Verwenden Sie eine verträgliche Reinigungsflüssigkeit, die Rückstände verdrängt. Prüfen Sie nach dem Medienwechsel auf Ausfällungen, Luftblasen und Dichtheitsprobleme."],
          ["Rückstände nach Abschaltung", "Eintrocknen salzhaltiger oder kristallisierender Flüssigkeiten im Dosiersatz vermeiden", "Spülen Sie die Prozessflüssigkeit vor dem Abschalten aus. Befüllen und prüfen Sie die Anlage vor dem Wiederanlauf. Bei einem festsitzenden Kolben stoppen Sie den Antrieb und wenden sich an den technischen Support."],
        ],
      },
      drive: {
        title: "Motoransteuerung, Wicklungen und Referenzpositionssignal",
        intro: "Der Motor ist ausgeführt " + motor + ". Verdrahten Sie Motor und optischen Sensor getrennt. Prüfen Sie zuerst die Antriebsausführung, danach Versorgungs- und Signalanschlüsse.",
        rows: [
          ["Wicklungsanschluss", motor, p.rinse ? "Voll- und Halbwicklungsanschluss beeinflussen Drehmoment und Drehzahl. Stellen Sie den Motorstrom nach Schaltplan und verwendetem Treiber ein." : "Schwarz und Grün bilden eine Wicklung, Rot und Blau die andere. Schließen Sie beide Phasen nach dem Anschlussplan für den Motor mit vier Leitungen an den Treiber an."],
          ["Versorgung des optischen Sensors", "5–24 VDC ±10%", "Prüfen Sie Sensorversorgung, Masse, Ausgangstyp und Steuerungseingang. Prüfen Sie danach den Schaltvorgang. Das Positionssignal erfasst keine Dosiervolumina."],
          ["Starten und Positionieren", "Drehrichtung, Referenzposition und Stoppstellung prüfen", "Bestätigen Sie bei niedriger Drehzahl Bewegung und Strömungsrichtung. Stellen Sie danach Beschleunigung, Verzögerung und Umdrehungszahl ein. Schalten Sie vor Änderungen an der Verdrahtung die Versorgung ab."],
        ],
        note: "Prüfen Sie Aderfarben, Steckverbinder und Stromeinstellung anhand des gelieferten Motors und optischen Sensors. Verbinden oder trennen Sie Kabelbäume nur im spannungsfreien Zustand.",
      },
      installation: {
        title: p.rinse ? "Einbaulage, Prozess- und Spülanschlüsse" : "Einbaulage, Befestigung und Prozessanschlüsse",
        intro: "Montieren Sie die Pumpe so, dass Luft aus dem Pumpenkopf entweichen kann und austretende Flüssigkeit nicht zum Motor gelangt. Berücksichtigen Sie bei der Auslegung des Flüssigkeitspfads die Höhenunterschiede zwischen Vorratsbehälter, Pumpenkopf und Dosiernadel.",
        rows: [
          ["Prozessanschlüsse", p.port, "Prüfen Sie Gewinde, Dichtflächen, Fittings und Leitungen. Stützen Sie die Leitungen ab, damit sie keinen Zug auf den Pumpenkopf ausüben."],
          [p.rinse ? "Kolbenspülanschlüsse" : "Reinigung des Prozesskreises", p.rinse ? "1/4-28 UNF-2B. Standardmäßig können Verschlussstopfen eingesetzt sein." : "Rückstände über die Prozessanschlüsse verdrängen", p.rinse ? "Schließen Sie Zu- und Rücklauf des Spülkreises entsprechend der Kennzeichnung an. Halten Sie diese Anschlüsse getrennt von Reagenzieneinlass und -auslass. Prüfen Sie vor dem Einsatz Spülflüssigkeit und Anschlüsse." : "Diese Ausführung hat keine separaten Spülanschlüsse (RINSE). Planen Sie die Spülung für die Prozessflüssigkeit über den Prozesskreis. Belassen Sie die Anschlüsse des Pumpenkopfs in ihrer gelieferten Ausführung."],
          ["Mechanische Befestigung", "Zeichnung, Verstellwinkel und Einbaulage berücksichtigen", "Halten Sie Platz für Fittings, Kabelbäume, Fördervolumeneinstellung und Wartung frei. Prüfen Sie nach dem Befestigen die Ausrichtung des Pumpenkopfs und die Belastung durch Leitungen erneut."],
        ],
      },
      commissioning: {
        title: "Erstinbetriebnahme und Prüfung der Fördermenge",
        intro: p.rinse ? "Prüfen Sie vor dem Befüllen die Start- und Stoppstellungen von Kolben und Schaltfahne des optischen Sensors. Die Abbildung zeigt den Rechtslauf von der Motorvorderseite aus. Bei umgekehrter Drehrichtung kehren sich die Positionen von Einlass, Kolbenabflachung und Schaltfahne um." : "Sorgen Sie für eine stabile, blasenfreie Befüllung, bevor Sie das Fördervolumen einstellen. Beseitigen Sie Luftblasen und andere Ursachen einer instabilen Förderung vor der Einstellung.",
        steps: [
          ["Im spannungsfreien Zustand prüfen", "Bestätigen Sie Modell, Fördervolumeneinstellung, Motorwicklungen und Sensorverdrahtung. Ordnen Sie Prozess- und Spülkreise zu."],
          ["Befüllen und entlüften", "Verwenden Sie eine verträgliche Flüssigkeit und fahren Sie mit niedriger Drehzahl. Prüfen Sie den Pfad vom Vorratsbehälter über den Pumpenkopf zum Auslass auf Luftblasen und Undichtigkeiten. Bestätigen Sie die vorgesehene Strömungsrichtung."],
          ["Prüfbedingungen konstant halten", p.rinse ? "Halten Sie Fördervolumen, Drehzahl, Gegendruck, Nadel und Leitungen konstant. Führen Sie pro Messung eine vollständige Umdrehung aus und erfassen Sie die geförderte Masse 10-mal." : "Halten Sie Fördervolumen, Umdrehungszahl, Drehzahl, Gegendruck, Nadel und Leitungen konstant. Sammeln Sie mehrere Dosierungen für dasselbe Zielvolumen."],
          ["Erste Dosis und Folgedosen getrennt prüfen", "Erfassen Sie die erste Dosis nach einer Pause, mehrere Folgedosen und Resttropfen. Korrigieren Sie die Einstellungen anhand der Messergebnisse. Wiederholen Sie die Prüfung nach Änderungen an Flüssigkeit oder Leitungen."],
        ],
        note: "Rechnen Sie bei der gravimetrischen Messung die Masse anhand der tatsächlichen Dichte der Flüssigkeit bei Prüftemperatur in Volumen um. Dokumentieren Sie das Verfahren und jedes Ergebnis.",
      },
      care: {
        title: "Wartung, Abschaltung und Störungsbehebung",
        intro: "Unterscheiden Sie zunächst zwischen Problemen der Zufuhr, der Bewegung und des Auslasses. Prüfen Sie die Ursachen einzeln. Wenden Sie sich vor einer Demontage oder Arbeiten am Dosiersatz an den technischen Support.",
        rows: [
          ["Keine Förderung oder wiederkehrende Luftblasen", "Füllstand, Dichtheit am Einlass, Strömungsrichtung und Einbaulage", "Schließen Sie Lufteintritt, einen leeren Vorratsbehälter und abgeknickte Leitungen aus, bevor Sie erneut befüllen. Klären Sie die Ursache, bevor Sie die Drehzahl erhöhen."],
          ["Stabile Folgedosen, aber fehlerhafte erste Dosis", "Flüssigkeitsrückzug in Pausen, Tropfen an der Spitze und Start-/Stoppstellung", "Erfassen Sie Pausendauer und erste Dosis getrennt. Passen Sie Stopp- und Bewegungsablauf im vollständigen Fluidpfad an."],
          ["Volumenstrom fällt mit der Zeit ab", "Kristalle, Ansaugwiderstand, verstopfte Anschlüsse und Antriebseinstellungen", "Stoppen Sie die Pumpe und reinigen Sie sie mit einem geeigneten Verfahren. Prüfen Sie Leitungen und Filter. Bei festsitzendem Kolben darf der Antrieb nicht weiterlaufen."],
          ["Leckagen oder ungewöhnliche Geräusche", "Belastung der Fittings, Dichtungen und mechanische Befestigung", "Stellen Sie den Betrieb ein. Bewahren Sie Fotos und Aufzeichnungen zu Flüssigkeit und Antriebseinstellungen auf und wenden Sie sich an den technischen Support."],
        ],
      },
    },
    figures: {
      cycle: { alt: "Vier Phasen der ventillosen RPL-Dosierung: Ansaugen, Ende des Ansaugens, Fördern, Ende des Förderns", caption: "1 Ansaugen → 2 Ende des Ansaugens → 3 Fördern → 4 Ende des Förderns." },
      components: { alt: p.model + " mit nummerierten Teilen für Einstellung, Anschlüsse, Sensor und Befestigung", caption: p.rinse ? "1 Einstellknopf · 2 Skala · 3 Spülanschluss · 4 Prozessanschluss · 5 Pumpenkopf · 6 Optischer Sensor · 7 Montagehalterung · 8 Elektrischer Steckverbinder." : "1 Einstellknopf · 2 Skala · 3 Pumpenkopf · 4 Prozessanschluss · 5 Optischer Sensor · 6 Montagehalterung · 7 Elektrischer Steckverbinder." },
      adjustment: { alt: p.model + " mechanische Einstellung des Fördervolumens in vier Schritten", caption: "1 Feststellschraube lösen → 2 Skala ablesen → 3 Einstellen und durch Wiegen prüfen → 4 Feststellschraube anziehen." },
      motor4: { alt: "RPL-P4 Motorwicklungsplan für vier Leitungen mit den Paaren Schwarz–Grün und Rot–Blau", caption: "Motor mit vier Leitungen: Schwarz–Grün und Rot–Blau bilden je eine Wicklung." },
      motor6: { alt: "Pinbelegung des RPL-Motorsteckers für sechs Leitungen und Schaltplan der Phasenwicklungen", caption: "Motor mit sechs Leitungen: Steckernummerierung und Phasenwicklungen. RED, BLK, YEL, BLU, WHT und ORG bezeichnen Rot, Schwarz, Gelb, Blau, Weiß und Orange." },
      optical: { alt: "Optischer RPL-Sensor mit nummerierten Anschlüssen für Versorgung, Masse, Ausgang und Last", caption: "1 Braun: Versorgung · 2 Schwarz: Ausgang 1, hellschaltend · 3 Weiß: Ausgang 2, dunkelschaltend · 4 Blau: 0 V · 5 Last. Isolieren Sie unbenutzte Ausgangsleitungen." },
      installation: { alt: p.model + " korrekte und falsche Einbaulagen mit Pfeilen für die Strömungsrichtung", caption: "Beachten Sie die Strömungspfeile. Ermöglichen Sie die Entlüftung des Pumpenkopfs und vermeiden Sie Flüssigkeit am Motor. ✓ Richtige Einbaulage. ✕ Falsche Einbaulage." },
      position: { alt: "RPL-Kolbenabflachung zeigt zum Einlass, Schaltfahne des optischen Sensors in der Start-/Stoppstellung", caption: "Start-/Stoppstellung: Die Kolbenabflachung zeigt zum Einlass. Der optische Sensor erkennt die Kante der Schaltfahne." },
      measurement: { alt: "Gravimetrischer RPL-Messaufbau mit Behälter, Einlassleitung, Pumpe, Auslassleitung, Probenahmenadel und Waage", caption: "1 Vorratsbehälter · 2 Einlassleitung · 3 RPL-Pumpe und Antrieb · 4 Auslassleitung · 5 Probenahmenadel mit flachem Ende · 6 Präzisionswaage · 7 Auffanggefäß." },
    },
  };
}
