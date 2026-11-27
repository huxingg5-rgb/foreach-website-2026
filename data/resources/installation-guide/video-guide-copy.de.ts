type Highlight = readonly [title: string, description: string];

export type GermanVideoCopy = {
  title: string;
  description: string;
  highlights: readonly Highlight[];
};

export const germanVideoCopy: Record<string, GermanVideoCopy> = {
  "sv10-solenoid-valve-overview": {
    title: "Miniatur-Magnetventile SV10 im Überblick",
    description: "Der 45-sekündige Überblick zeigt Miniatur-Wippenmembran-Magnetventile SV10 von FOREACH zur Steuerung von Luft und Flüssigkeiten mit 2 oder 3 Anschlüssen.",
    highlights: [
      ["Anschlussarten und Ventilkonfigurationen", "Vergleichen Sie die Gehäuse und Anschlüsse der gezeigten 2-Wege- und 3-Wege-Varianten. Die verlinkten Produktseiten helfen bei der Wahl der passenden Ausführung."],
      ["Durchflusskoeffizient", "Im Video wird Cv 0.03 angegeben. Die genaue Spezifikation und die zugehörigen Betriebsbedingungen finden Sie in der Dokumentation der gewählten Variante."],
      ["Membranwerkstoffe", "Vorgestellt werden EPDM, FKM und FFKM. Prüfen Sie alle medienberührten Teile anhand des tatsächlichen Mediums und der Betriebsbedingungen."],
      ["Druckbereich im Überblick", "Das Video nennt −75 kPa bis 0.25 MPa. Die verbindlichen Betriebsgrenzen entnehmen Sie der Dokumentation des gewählten Ventils."],
      ["Optionale Stromsparschaltung", "Die optionale Stromsparschaltung begrenzt laut Video die Erwärmung im Dauerbetrieb. Verfügbarkeit und elektrische Daten stehen in der Produktdokumentation."],
      ["Integrierter Ventilblock", "Das Video stellt einen integrierten Ventilblock und kundenspezifische Ausführungen vor. Geben Sie zur Abstimmung die erforderlichen Anschlüsse und den Einbauraum an."],
    ],
  },
  "youtube-piston-pump-liquid-dispensing": {
    title: "Präzisionskolbenpumpen zum Dosieren von Flüssigkeiten",
    description: "FOREACH Präzisionskolbenpumpen EA mit 50 μL bis 20 mL Nennvolumen, Pumpenköpfen aus PMMA, PCTG oder PEEK, integrierten Pumpen-Ventil-Einheiten und OEM-Ausführungen für die Flüssigkeitshandhabung in Geräten.",
    highlights: [
      ["Dosiervolumen und Zykluszeit", "Halten Sie kleinstes, typisches und größtes Dosiervolumen, die Zeit für Ansaugen und Abgeben sowie etwaige Nachfüllintervalle fest. Eine Pumpe, die das größte Volumen abdeckt, muss auch für die kleinste kritische Dosis geprüft werden."],
      ["Genauigkeit und Wiederholbarkeit", "Die Genauigkeit beschreibt die Nähe zum Sollwert, die Wiederholbarkeit die Streuung wiederholter Ergebnisse. Legen Sie separate Akzeptanzgrenzen fest und vergleichen Sie Messwerte bei gleichem Volumen und gleichen Betriebsbedingungen."],
      ["Vollständiger medienberührter Flüssigkeitsweg", "Prüfen Sie Pumpenkopf, Kolben, Dichtungen, Ventile, Leitungen und Auslass auf Eignung für Reagenz und Reinigungsverfahren. Ein beständiger Pumpenkopf allein belegt die Eignung der gesamten Baugruppe nicht."],
    ],
  },
  "youtube-flexible-tubing-laboratory-fluid-lines": {
    title: "Flexible Schläuche für Flüssigkeitsleitungen im Labor",
    description: "Flexible PVC-Schläuche für Geräte von FOREACH. Innendurchmesser 0.8–19.1 mm, Außendurchmesser 2.4–25.4 mm, Härte Shore A 55/65 sowie OEM-Schlauchausführungen.",
    highlights: [
      ["Werkstoff und Medienkontakt", "Erfassen Sie Medium, Konzentration, Temperatur, Kontaktzeit und Reinigungsmittel. Prüfen Sie den konkreten Werkstoff und seine Rezeptur unter diesen Bedingungen, bevor Sie Angaben zur chemischen Beständigkeit anwenden."],
      ["Innen- und Außendurchmesser", "Der Innendurchmesser bestimmt den Strömungsquerschnitt und den Sitz auf der Schlauchtülle. Der Außendurchmesser beeinflusst den Platzbedarf und Anschlüsse, die den Schlauch außen greifen oder abdichten. Halten Sie beide Maße samt Toleranzen fest."],
      ["Verlegung und Anschluss", "Prüfen Sie Biegeradius, Schlauchhalt und Abstützung am Fitting. Ein enger Bogen oder wiederholter Zug kann den Strömungsweg verändern oder den Anschluss belasten, auch wenn der Schlauch zunächst passt."],
    ],
  },
  "youtube-quick-connect-sealing-compatibility": {
    title: "Schnellkupplungen: Abdichtung und Kompatibilität",
    description: "FOREACH Schnellkupplungen Q20, Q40 und Q60 für Schläuche mit 1.6 bis 19.0 mm Innendurchmesser, mit verschiedenen Gehäuse- und Dichtungswerkstoffen, Absperrvarianten und OEM-Anschlusslösungen.",
    highlights: [
      ["Kupplungsschnittstelle und Verriegelung", "Prüfen Sie die vorgesehene Paarung von Stecker und Buchse, die Geometrie der Verriegelung und den Dichtungssitz. Gleiche Schlauchgrößen belegen keine Kompatibilität. Prüfen Sie Einrasten und Halt nach Anleitung für das gewählte Paar."],
      ["Gehäuse- und Dichtungswerkstoffe", "Prüfen Sie Gehäusewerkstoff und Elastomer getrennt auf Eignung für Flüssigkeit, Reinigungsmittel und Temperatur. Ein geeignetes Gehäuse gleicht eine ungeeignete Dichtung nicht aus."],
      ["Absperrung beim Trennen", "Klären Sie, auf welcher Seite die Flüssigkeit beim Trennen zurückgehalten werden soll und ob eine oder beide Hälften absperren müssen. Befolgen Sie das zulässige Trennverfahren. Eine absperrende Kupplung ist nicht automatisch tropffrei."],
    ],
  },
  "youtube-quick-connect-coupling-types": {
    title: "Größen von Schnellkupplungen: Nennweite und Schlauchmaße",
    description: "Unterscheiden Sie die Nennweite des Strömungskanals, Schlauchinnen- und -außendurchmesser sowie Gewindegröße. Prüfen Sie Volumenstrom, Druckverlust und Kompatibilität der Kupplungshälften.",
    highlights: [
      ["Nennweite des Strömungskanals", "Sie bezeichnet eine nominelle Abmessung der inneren Durchströmung und keine Förderleistung. Bei Bedarf lesen Sie die kleinste tatsächliche Bohrung aus der Produktzeichnung ab."],
      ["Schlauchanschlussgröße", "Für Schlauchtüllen ist der Schlauchinnendurchmesser (ID) maßgeblich. Andere Anschlussarten können über den Außendurchmesser (OD) definiert sein. Folgen Sie der Maßangabe des gewählten Anschlusses."],
      ["Gewindespezifikation", "Ergänzen Sie die Nenngröße um Gewindenorm und Dichtungsart. Die Angabe 1/4 Zoll allein verrät weder die Nennweite der Kupplung noch den passenden Schlauch."],
    ],
  },
  "youtube-f-ss-water-circulation-filter": {
    title: "Wasserfilter F-SS für Umwälzkreisläufe",
    description: "FOREACH stellt den Wasserfilter F-SS vor. Prüfen Sie Filtrationsanforderungen, Strömungsbedingungen und Leitungsanschlüsse für Ihren Wasserkreislauf.",
    highlights: [
      ["Filtrationsanforderungen", "Legen Sie fest, was der Kreislauf ausfiltern soll. Prüfen Sie Filtermedium und Filterfeinheit der gewählten Variante."],
      ["Strömungsbedingungen", "Prüfen Sie den erforderlichen Umlaufvolumenstrom und den zulässigen Druckabfall am Filter. Bewerten Sie den gesamten Kreislauf einschließlich Pumpe und Leitungen."],
      ["Geeignete Anschlüsse", "Stimmen Sie die Filteranschlüsse auf die Leitungen ab. Kontrollieren Sie zudem die Werkstoffverträglichkeit für Wasseraufbereitung und Reinigungsbedingungen."],
    ],
  },
  "youtube-thread-to-barb-fittings": {
    title: "Gewinde-Schlauchtüllen für flexible Schlauchleitungen",
    description: "So verbinden Gewinde-Schlauchtüllen einen flexiblen Schlauch mit einem Gewindeanschluss. Prüfen Sie Gewindespezifikation, Schlauchinnendurchmesser und medienberührte Werkstoffe.",
    highlights: [
      ["Gewindeanschluss", "Stimmen Sie Gewindenorm und Dichtungsart auf den Gegenanschluss ab. Ähnlich aussehende Gewinde belegen keine Kompatibilität."],
      ["Flexibler Schlauch", "Gleichen Sie den Schlauchinnendurchmesser mit der Spezifikation der Schlauchtülle ab. Prüfen Sie Schlauchwerkstoff und Betriebsbedingungen für die gesamte Verbindung."],
      ["Medium und Betriebsbedingungen", "Prüfen Sie alle medienberührten Werkstoffe auf Eignung für Medium und Reinigungsverfahren. Erproben Sie die montierte Verbindung bei vorgesehenem Druck und vorgesehener Temperatur."],
    ],
  },
  "youtube-rigid-tubing-fittings": {
    title: "Fittings für starre Rohre in Fluidsystemen",
    description: "Prüfen Sie Rohraußendurchmesser, Anschlussspezifikation und Dichtungsart, wenn Sie Pumpen, Ventile und Flüssigkeitsleitungen verbinden.",
    highlights: [
      ["Rohraußendurchmesser", "Ermitteln Sie den tatsächlichen Rohraußendurchmesser samt Maßtoleranz. Das Fitting muss für Rohrmaß und Rohrwerkstoff geeignet sein."],
      ["Anschluss und Abdichtung", "Stimmen Sie Gewinde, Anschlussgeometrie und Dichtkomponenten ab. Bördel- und bördellose Verbindungen werden unterschiedlich montiert. Befolgen Sie die Anleitung für das gewählte Produkt."],
      ["Anwendungsanforderungen", "Prüfen Sie Medienverträglichkeit, Druck, Temperatur und Einbauraum. Verifizieren Sie die vollständige Verbindung im vorgesehenen Flüssigkeitskreislauf."],
    ],
  },
  "youtube-syringe-installation": {
    title: "Spritzenpumpe: Spritze montieren",
    description: "Die Demonstration zur FOREACH HLD6 zeigt die Antriebsposition, die Ausrichtung des Sicherungsclips und die Befestigung der Spritze.",
    highlights: [
      ["Antriebsposition prüfen", "Prüfen Sie vor dem Einsetzen der Spritze die Position des Antriebsstifts. So erhalten Sie den für die gezeigte Montagefolge benötigten Platz."],
      ["Sicherungsclip ausrichten", "Schieben Sie den Sicherungsclip so auf die Spritze, dass die Schraube nach außen zeigt. Die Nahaufnahme zeigt die Ausrichtung am Spritzenzylinder."],
      ["Obere Verbindung sichern", "Nach dem Positionieren der Spritze auf der Pumpe wird im Video der obere Sicherungsclip befestigt und von Hand angezogen."],
      ["Befestigung abschließen", "Der zweite Anziehschritt erfolgt mit einem Drehmomentschraubendreher. Die angezeigte Einstellung gilt für die demonstrierte Baugruppe. Verwenden Sie den bestätigten Wert für Ihre Ausführung."],
    ],
  },
  "youtube-q60-quick-fitting": {
    title: "Schnellkupplungen Q60 mit oder ohne Absperrung und für den Platteneinbau",
    description: "Wählen Sie Schnellkupplungen nach Absperrfunktion, Plattenmontage und Schlauchgröße. Das Video zeigt den Einfluss der passenden Kupplungshälften und Ventiloptionen.",
    highlights: [
      ["Stecker und Buchse", "Das Video stellt Stecker und Buchsen vor und zeigt, wie das passende Paar eine Schnellverbindung bildet."],
      ["Platteneinbau und Einbau in der Leitung", "Varianten mit und ohne Plattenmontage eignen sich für unterschiedliche Einbausituationen. Prüfen Sie Plattenstärke und Montagebohrung in der Zeichnung."],
      ["Mit und ohne Absperrventil", "Das Video zeigt Kupplungshälften mit oder ohne Ventil und erläutert, wie die Ventilausführung den Flüssigkeitsstrom beim Trennen absperrt."],
      ["Kupplungshälften kombinieren", "Die Absperrausführung kann auf beiden Seiten unterschiedlich sein. Wählen Sie das Paar danach, auf welcher Seite die Flüssigkeit beim Trennen zurückgehalten werden soll."],
      ["Schlauchanschlüsse", "Vergleichen Sie die gezeigten Anschlussgrößen. Stimmen Sie jedes Ende auf den jeweiligen Schlauch ab und prüfen Sie das vollständige Paar anhand der Produktseiten."],
    ],
  },
  "youtube-female-thread-conversion": {
    title: "Innengewindeadapter für Flüssigkeitsanschlüsse mit M6 und 1/4-28",
    description: "Vergleichen Sie Innengewindeadapter für kompakte Flüssigkeitsanschlüsse. Prüfen Sie M6 und 1/4-28, Dichtgeometrie, Werkstoffe und Anschlussanordnung vor der Montage.",
    highlights: [
      ["Verbinder aus technischen Kunststoffen", "Das Video stellt Kunststoffvarianten für Flüssigkeits- und Gasanschlüsse vor. Prüfen Sie die Werkstoffwahl anhand von Medium, Temperatur und Produktdokumentation."],
      ["Gewindeanschlüsse", "Gezeigt werden M6 und 1/4-28 UNF. Prüfen Sie Gewinde, Dichtungsart und Gegenfitting an beiden Enden des gewählten Adapters."],
      ["Kompakter Einbau und Demontage", "Der Abschluss zeigt die kompakte Bauform und die einfache Demontage bei der Integration in Fluidsysteme."],
    ],
  },
  "youtube-bubble-detection-module": {
    title: "Luftblasenerkennung in transparenten Schläuchen",
    description: "Das Video zeigt ein Modul zur Luftblasenerkennung. Prüfen Sie geeignete Schläuche, Ansprechverhalten und Ausgangseinstellungen für den Flüssigkeitsweg im Gerät.",
    highlights: [
      ["Schlauchverträglichkeit", "Der eingeblendete Text nennt transparente und halbtransparente Schläuche. Prüfen Sie Werkstoff, Außendurchmesser und Flüssigkeit für die gewählte ABD-Konfiguration."],
      ["Ansprechverhalten", "Die Ansprechzeit allein gibt weder die kleinste erkennbare Blase noch die Reaktionszeit des gesamten Geräts an. Prüfen Sie diese Anforderungen mit dem tatsächlichen Schlauch, Medium, Volumenstrom und Steuergerät."],
      ["Softwareparameter und Ausgangszustand", "Die Software zeigt Parameter, Signalinformationen und Ausgangseinstellungen zur Integration des Moduls."],
    ],
  },
  "youtube-dpl30-vs-dpl30h": {
    title: "Flüssigkeits-Membranpumpen für höheren Gegendruck auswählen",
    description: "Vergleichen Sie Flüssigkeits-Membranpumpen mit gleichem Nennvolumenstrom und unterschiedlicher Druckleistung. Berücksichtigen Sie Gegendruck und Leitungsanschlüsse.",
    highlights: [
      ["Betriebspunkt vergleichen", "Der Überblick nennt 100 kPa für DPL30 und 600 kPa für DPL30H. Die Druckangaben gelten getrennt von 300 mL/min bei freiem Auslauf. Sie bedeuten nicht, dass die Pumpen bei maximalem Druck diesen Volumenstrom liefern."],
      ["Leitungsanschlüsse abstimmen", "Die DPL30 hat Schlauchtüllen, die DPL30H Gewindeanschlüsse. Prüfen Sie Gegenfitting, Schlauch, Dichtung und Einbauraum, bevor Sie eine Pumpe ersetzen."],
      ["Gesamten Flüssigkeitskreislauf berücksichtigen", "Filter, Ventile, enge Leitungen und die aufnehmende Kammer tragen zum Gegendruck bei. Vergleichen Sie die Druck-Volumenstrom-Kennlinie am Betriebspunkt und testen Sie mit dem vorgesehenen Medium bei der vorgesehenen Temperatur."],
    ],
  },
  "youtube-dpgl800-vacuum-test": {
    title: "Vakuumtest einer Miniatur-Membranpumpe zur Abfallabsaugung",
    description: "Der Vakuumtest einer Gas-Flüssigkeits-Membranpumpe zeigt, welche Druck-, Leitungs- und Anschlussbedingungen bei der Abfallabsaugung relevant sind.",
    highlights: [
      ["Pumpenköpfe und Verschaltung", "Die Doppelpumpe besitzt vier Anschlüsse. Erfassen Sie, ob ein Kopf allein oder beide parallel beziehungsweise in Reihe betrieben werden. Die Verschaltung beeinflusst die Saugleistung."],
      ["Gasstrom und Flüssigkeitsförderung", "6 L/min bezeichnen den lastfreien Gasvolumenstrom eines Kopfes. Der Wert gilt weder für Flüssigkeit noch für den Gasstrom beim Endvakuum. Messen Sie die Abfallabsaugung mit der tatsächlichen Flüssigkeit und Leitung."],
      ["Vakuum am Einsatzort", "Leckagen, Engstellen, Auffangbehälter und Leitungslänge verändern den Druck an der Absaugstelle. Messen Sie Druck und Entleerungszeit im Einbauzustand einschließlich der erwarteten Gas-Flüssigkeits-Wechsel."],
    ],
  },
  "youtube-dpl-series-introduction": {
    title: "Miniatur-Membranpumpen für den Flüssigkeitstransfer in Geräten",
    description: "Vergleichen Sie bei Miniatur-Flüssigkeitsmembranpumpen den benötigten Volumenstrom, den Druckbereich, die Motorvarianten und die Leitungsanschlüsse.",
    highlights: [
      ["Volumenstrom bei Arbeitsdruck", "Wählen Sie nach dem erforderlichen Volumenstrom am Betriebspunkt. Enge Leitungen, Filter und nachgeschaltete Ventile können die Förderleistung gegenüber freiem Auslauf verringern."],
      ["Motor und Ansteuerung", "Motoren mit und ohne Bürsten stellen unterschiedliche Anforderungen an die Ansteuerung. Prüfen Sie Spannung, Einschaltdauer, Verdrahtung, Drehzahlregelung und Rückmeldung."],
      ["Medienverträglichkeit und Einbau", "Prüfen Sie alle medienberührten Werkstoffe für Reagenz und Reinigungsfolge. Kontrollieren Sie Ein- und Auslass, Platzbedarf und Zulaufbedingungen vor dem Gerätetest."],
    ],
  },
  "youtube-lld-liquid-level-detection": {
    title: "Flüssigkeitsstanderkennung für automatisiertes Pipettieren",
    description: "Das Video zeigt den Einsatz der Flüssigkeitsstanderkennung beim automatisierten Pipettieren. Prüfen Sie Sondengeometrie, Flüssigkeit und Steuerungsreaktion vor dem Ansaugen.",
    highlights: [
      ["Flüssigkeitsoberfläche und Sondenposition", "Die Steuerung braucht ein verwertbares Signal an der vorgesehenen Position. Prüfen Sie Annäherungsgeschwindigkeit, Eintauchtiefe und das Verhalten bei leeren Gefäßen. Das Signal ist keine eigenständige Volumenmessung."],
      ["Sonde, Flüssigkeit und Gefäß", "Sondengeometrie, Flüssigkeitseigenschaften und Gefäß beeinflussen die Erkennung. Testen Sie mit den tatsächlichen Proben und Reagenzien und berücksichtigen Sie Schaum und Rückstände."],
      ["Ansaugen und Fehlerbehandlung", "Prüfen Sie, wie die Steuerung die Bewegung nach dem Signal stoppt oder ändert und auf fehlende oder unerwartete Signale reagiert. Das Modul allein belegt weder Dosiergenauigkeit noch Geräteleistung."],
    ],
  },
  "youtube-about-foreach": {
    title: "Fluidikkomponenten für Laborgeräte",
    description: "Der Unternehmensüberblick von FOREACH stellt Fluidikkomponenten für Laborgeräte vor, vom Flüssigkeitstransfer bis zum automatisierten Pipettieren.",
    highlights: [
      ["Fördern, Dosieren und Überwachen", "Förderpumpe, Pipettiermechanik und Fluidiksensor haben unterschiedliche Aufgaben. Legen Sie fest, wo jede Komponente im Flüssigkeitsweg sitzt, bevor Sie Varianten vergleichen."],
      ["Betriebsbedingungen erfassen", "Nennen Sie Flüssigkeit, Arbeitsvolumenstrom und -druck, erforderliches Volumen oder Wiederholbarkeit, Zykluszeiten und Reinigungsverfahren. Diese Angaben helfen bei der Auswahl einer passenden Konfiguration."],
      ["Komponenten- und Geräteprüfung", "Bewerten Sie Komponenten anhand ihrer Spezifikationen, Zeichnungen und Schnittstellen. Prüfen Sie den fertig aufgebauten Flüssigkeitskreislauf unter realen Bedingungen. Ein Unternehmensüberblick ersetzt keine Gerätequalifizierung."],
    ],
  },
  "youtube-dpl60-brushed-pressure-test": {
    title: "Druckprüfung der Flüssigkeits-Membranpumpe DPL60 mit Bürstenmotor",
    description: "Sehen Sie die Druckprüfung und prüfen Sie die Druckleistung getrennt von der Angabe 600 mL/min bei freiem Auslauf.",
    highlights: [
      ["Druckmessung einordnen", "Erfassen Sie Messort und Strömungszustand. Ein Messwert allein beschreibt keinen nutzbaren Druck-Volumenstrom-Betriebspunkt."],
      ["Ausführung mit Bürstenmotor prüfen", "Gleichen Sie Spannung und Motortyp mit dem Produkt ab. Übertragen Sie das Ergebnis einer Motor- und Versorgungskonfiguration nicht auf eine andere."],
      ["Vorgesehenen Betrieb testen", "Prüfen Sie bei wiederholten Spül- oder Förderzyklen den Volumenstrom, die Stromaufnahme und die Temperatur über den vorgesehenen Arbeitszyklus. Die Spezifikation bestimmt die Betriebsgrenzen. Ein Kurztest belegt keine Dauerbetriebsgrenze."],
    ],
  },
  "youtube-dpl60-brushed-flow-rate-test": {
    title: "Volumenstromprüfung der DPL60 mit Bürstenmotor: 600 mL/min-Klasse",
    description: "Die Prüfung zeigt, wie Zulaufbedingungen, Leitungen und Gegendruck den tatsächlichen Volumenstrom einer Flüssigkeits-Membranpumpe der 600 mL/min-Klasse beeinflussen.",
    highlights: [
      ["Flüssigkeitsmenge und Zeit erfassen", "Teilen Sie das aufgefangene Volumen durch die Sammelzeit. Nennen Sie das Intervall und wiederholen Sie die Messung. Ein kurzer Sichttest belegt keine Dosierwiederholbarkeit."],
      ["Zulaufhöhe und Schlauch berücksichtigen", "Die Quelle nennt für die Saughöhe einen Schlauch mit 3.2 mm Innendurchmesser. Für den Vergleich mit dem eingebauten Flüssigkeitsweg sind auch Schlauchlänge, Füllstand und Engstellen relevant."],
      ["Mit angeschlossenem Auslass messen", "Filter, Ventile und ein höher liegender Auslass erzeugen Gegendruck. Messen Sie den Sollvolumenstrom mit diesen Komponenten im Kreislauf."],
    ],
  },
  "youtube-dpl60-brushless-flow-rate-test": {
    title: "Volumenstromprüfung der bürstenlosen DPL60: 600 mL/min-Klasse",
    description: "Volumenstromprüfung einer bürstenlosen Flüssigkeits-Membranpumpe der 600 mL/min-Klasse mit Hinweisen zu Motorsteuerung, Gegendruck und Arbeitszyklus.",
    highlights: [
      ["Ansteuerung dokumentieren", "Halten Sie Versorgungsspannung und etwaige Drehzahlvorgaben fest. Prüfen Sie, ob die gewählte bürstenlose Pumpe nur Versorgungsleitungen oder zusätzliche Steuerleitungen hat."],
      ["Förderleistung unter Last", "Einlass und Auslass beeinflussen den Volumenstrom. Prüfen Sie den benötigten Flüssigkeitstransfer mit den vorgesehenen Leitungen, Ventilen und Filtern."],
      ["Volumenstrom und Lebensdauer getrennt bewerten", "Ein kurzer Test belegt keine Tausenden Betriebsstunden. Prüfen Sie Angaben zur Lebensdauer anhand ihrer Testbedingungen und validieren Sie Schaltzyklen, Temperatur und Medienkontakt."],
    ],
  },
  "youtube-dpl30-brushed-pressure-test": {
    title: "Druckprüfung der Mikro-Membranpumpe DPL30 mit Bürstenmotor",
    description: "Die Druckprüfung zeigt, wie Arbeitsdruck, Volumenstrom und Anschlussart die Eignung der Pumpe für einen Flüssigkeitskreislauf bestimmen.",
    highlights: [
      ["Druck und Förderaufgabe", "Klären Sie, ob der Druck durch Leitungswiderstand, Filter, Ventile oder ein druckbeaufschlagtes Ziel entsteht. Die Pumpe muss gegen die Gesamtlast den benötigten Volumenstrom liefern."],
      ["Montage der Schlauchtülle", "Der Anschluss ist Teil der drucktragenden Verbindung. Stimmen Sie den Schlauch auf die Tülle ab und prüfen Sie Halt, Werkstoffverträglichkeit und Montagequalität vor dem Betrieb."],
      ["Grenzen des Kurztests", "Ein kurzer Drucktest belegt keine Langzeitdichtheit, Temperaturstabilität oder Lebensdauer. Beurteilen Sie den Dauer- und Wiederholbetrieb anhand der Produktgrenzen und eines Arbeitszyklustests."],
    ],
  },
  "youtube-dpl30-brushless-pressure-test": {
    title: "Druckprüfung der bürstenlosen Mikro-Membranpumpe DPL30",
    description: "Vergleichen Sie Nennvolumenstrom, Druckleistung und tatsächliche Förderleistung einer eingebauten bürstenlosen Mikro-Membranpumpe.",
    highlights: [
      ["Elektrische Bedingungen einheitlich halten", "Erfassen Sie Versorgungsspannung, Steuermethode und Testdauer. Das Ergebnis gilt für die geprüfte Ansteuerung und lässt sich nicht auf jede bürstenlose Variante übertragen."],
      ["Flüssigkeitsförderung mitmessen", "Ein Kreislauf kann hohen Druck bei geringem Volumenstrom erreichen. Prüfen Sie den tatsächlichen Bedarf der nachgeschalteten Anwendung, insbesondere bei Widerständen durch Ventile, enge Leitungen oder Filter."],
      ["Alle druckbelasteten Teile prüfen", "Leitungen, Fittings, Dichtungen und nachgeschaltete Komponenten müssen für Arbeitsdruck und Medium geeignet sein. Prüfen Sie auch Anlaufen und Abschalten."],
    ],
  },
  "youtube-dpl30-brushless-flow-rate-test": {
    title: "Volumenstromprüfung der bürstenlosen DPL30: 300 mL/min-Klasse",
    description: "Sehen Sie den Volumenstromtest einer bürstenlosen Membranpumpe der 300 mL/min-Klasse und vergleichen Sie die Einlass-, Auslass- und Ansteuerungsbedingungen.",
    highlights: [
      ["Messbedingungen dokumentieren", "Erfassen Sie Medium, Temperatur, Versorgungseinstellung und Sammelintervall. Messen Sie bei allen Varianten Volumen und Zeit nach demselben Verfahren."],
      ["Ansaugen getrennt prüfen", "Die Quelle spezifiziert die Saughöhe für Leitungen mit 3.2 mm Innendurchmesser. Prüfen Sie sowohl das erstmalige Ansaugen als auch die anschließende Förderung und berücksichtigen Sie Vorratshöhe und Einlassdichtheit."],
      ["Tatsächliche Auslasslast prüfen", "Messen Sie mit angeschlossener Förderleitung, Filter und Ventil. Ein Test bei freiem Auslauf belegt nicht denselben Volumenstrom gegen Widerstand oder in eine druckbeaufschlagte Kammer."],
    ],
  },
  "youtube-dpl30-brushed-flow-rate-test": {
    title: "Volumenstromprüfung der DPL30 mit Bürstenmotor: 300 mL/min-Klasse",
    description: "Die Vorführung zeigt die Flüssigkeitsförderung einer Membranpumpe der 300 mL/min-Klasse und die für einen aussagekräftigen Vergleich nötigen Bedingungen.",
    highlights: [
      ["Spannung und Messzeitraum", "Erfassen Sie Spannung an der Pumpe und Vorlauf- sowie Messzeit. Unterscheiden Sie Start, Ansaugen und stationäre Förderphase."],
      ["Volumen, Zeit und Wiederholungsmessungen", "Messen Sie aufgefangenes Volumen und Zeit und wiederholen Sie unter gleichen Bedingungen. Berichten Sie mittleren Fördervolumenstrom und Wiederholbarkeit der Einzeldosierungen getrennt."],
      ["Arbeitszyklus und Wartung", "Der Volumenstromtest ist kein Motor-Dauertest. Berücksichtigen Sie reale Starts, Stopps und Betriebszeiten beim Vergleich von Varianten mit und ohne Bürsten."],
    ],
  },
  "youtube-five-wire-brushless-control-wires": {
    title: "Bürstenlose Membranpumpe mit 5 Leitungen: PWM und Drehzahlrückmeldung",
    description: "Das Video erläutert die PWM-Drehzahlsteuerung, die FG-Rückmeldung und die Drehrichtungssteuerung an einer bürstenlosen Ausführung mit 5 Leitungen.",
    highlights: [
      ["PWM-Vorgabe", "PWM gibt bei unterstützten Varianten die Motordrehzahl vor. Frequenz, Logikpegel und zulässiger Tastgrad stehen in der Motordokumentation. Die Vorgabe ist keine kalibrierte Durchflussmessung."],
      ["FG-Rückmeldung", "FG meldet die Motordrehung. Die Steuerung muss die dokumentierten Impulse pro Umdrehung auswerten. Der Motor kann sich auch bei unterbrochener Förderung drehen. Die Rückmeldung allein bestätigt keinen Volumenstrom."],
      ["Drehrichtung", "Die Drehrichtungsumschaltung des Motors macht den Flüssigkeitsweg nicht automatisch umkehrbar. Die Rückschlagventile bestimmen die Flussrichtung. Prüfen Sie zulässige Drehrichtung und Betriebsverhalten."],
    ],
  },
  "youtube-two-wire-brushless-diaphragm-pump": {
    title: "Bürstenlose Membranpumpen mit 2 Leitungen: Anschluss und Auswahl",
    description: "Vergleichen Sie eine einfache Spannungsversorgung mit den Anforderungen an Steuerung und Rückmeldung im Gerät.",
    highlights: [
      ["Polarität und Spannung", "Im gezeigten Aufbau ist Rot positiv und Schwarz negativ. Prüfen Sie die Kennzeichnung und Verdrahtung des gelieferten Motors. Übertragen Sie den Farbcode nicht pauschal auf andere Varianten."],
      ["Ein/Aus-Steuerung und Drehzahlrückmeldung", "Zwei Versorgungsleitungen stellen keinen separaten FG-Ausgang bereit. Für eine Drehzahlvorgabe oder -rückmeldung benötigen Sie eine Ausführung mit geeigneter Schnittstelle."],
      ["Zulässige Ansteuerung prüfen", "Unterstellen Sie weder beliebige Spannungsabsenkung noch PWM auf der Versorgungsleitung. Prüfen Sie unterstützte Verfahren, Anlaufverhalten und Schutzanforderungen des 2-Leiter-Treibers."],
    ],
  },
  "youtube-diaphragm-pump-hose-barb-protection": {
    title: "Schlauchtüllen an Membranpumpen beim Anschließen schützen",
    description: "So schließen Sie Schläuche an eine Miniatur-Membranpumpe an und prüfen Passung, Aufschubrichtung und Zugentlastung.",
    highlights: [
      ["Schlauch vor der Montage prüfen", "Prüfen Sie Innendurchmesser, Wandstärke und Werkstoff. Ein zu enger Schlauch erfordert hohe Kraft. Ein zu weiter Schlauch kann undicht sein oder sich lösen."],
      ["Axial aufschieben", "Stützen Sie die Pumpe ab und schieben Sie den Schlauch entlang der Tüllenachse auf. Vermeiden Sie seitliches Hebeln oder das Eigengewicht der Pumpe als Hebel. Ein im Video gezeigter Kraftwert gilt nicht pauschal."],
      ["Montierte Leitung entlasten", "Verlegen und stützen Sie die Leitung so, dass enge Bögen, bewegte Behälter und Zugkräfte den Anschluss nicht belasten. Prüfen Sie die Verbindung unter vorgesehenem Druck und bei vorgesehener Temperatur auf Dichtheit."],
    ],
  },
  "youtube-diaphragm-pump-placement-stability": {
    title: "Warum eine Miniatur-Membranpumpe auf ebener Fläche wackeln kann",
    description: "Ein Vorsprung im Motorgehäuse kann ein planes Aufliegen verhindern. So erkennen Sie vorgesehene Montageflächen und Befestigungspunkte.",
    highlights: [
      ["Gehäusemerkmal und Montagebezug", "Das Motorgehäuse bildet nicht zwingend eine plane Auflage. Entnehmen Sie Ausrichtung und Befestigungspunkte der Produktzeichnung."],
      ["Vorsprung erhalten", "Schleifen Sie den Vorsprung nicht ab. Nutzen Sie die vorgesehenen Montagepunkte, damit Motor und Lagerung unverändert bleiben."],
      ["Wackeln und Betriebsvibration unterscheiden", "Eine lose Pumpe auf der Werkbank und eine schwingende eingebaute Pumpe sind unterschiedliche Fälle. Prüfen Sie bei Betriebsvibrationen Befestigung, Steifigkeit der Auflage, Leitungskräfte und Drehzahl."],
    ],
  },
  "youtube-diaphragm-installation": {
    title: "Eine Miniatur-Flüssigkeitsmembranpumpe installieren",
    description: "Das Video zeigt Montage, Leitungsanschlüsse, elektrische Prüfungen und den kontrollierten Anlauf einer Miniatur-Flüssigkeitsmembranpumpe.",
    highlights: [
      ["Montage und Platzbedarf", "Verwenden Sie die zulässigen Befestigungsflächen. Lassen Sie Platz für Schläuche, Kabel und Wartung. Pressen Sie ein unebenes Gehäuse nicht auf eine plane Platte und verwenden Sie die vorgegebene Schraubenlänge."],
      ["Ein- und Auslass anschließen", "Beachten Sie die Durchflussmarkierungen und verwenden Sie passende Schläuche. Stützen Sie die Leitungen gegen Biegelasten ab, dichten Sie den Einlass angemessen ab und vermeiden Sie Engstellen nahe der Pumpe."],
      ["Kontrollierter Anlauf", "Kontrollieren Sie Spannung und Polarität, führen Sie das vorgesehene Medium zu und prüfen Sie Ansaugen, Volumenstrom und Dichtheit. Vergleichen Sie Druck und Arbeitszyklus mit den Vorgaben, bevor Sie den normalen Gerätebetrieb starten."],
    ],
  },
  "youtube-800-series-gas-liquid": {
    title: "Gas-Flüssigkeits-Membranpumpen für Abfallabsaugung und Vakuumerzeugung",
    description: "Unterscheiden Sie lastfreien Gasvolumenstrom, Vakuum und Flüssigkeitsförderung bei Miniatur-Gas-Flüssigkeits-Membranpumpen für Absaugaufgaben.",
    highlights: [
      ["Medien im gesamten Zyklus", "Prüfen Sie, ob Flüssigkeit, Luft oder wechselnde Anteile anfallen. Berücksichtigen Sie Abfallzusammensetzung und Spülmedien bei der Auswahl medienberührter Werkstoffe."],
      ["Volumenstrom mit Prüfmedium lesen", "6 L/min bezeichnet den lastfreien Gasvolumenstrom eines Pumpenkopfes. Der Wert ist weder ein Flüssigkeitsvolumenstrom noch ein Wert für den Betriebspunkt des Endvakuums."],
      ["Pumpenköpfe und Leitungen prüfen", "Die Doppelpumpe erlaubt je nach Produktvorgabe verschiedene Verschaltungen. Verifizieren Sie die gewählte Anordnung und messen Sie Absaugzeit, Leitungsdruck und Verhalten bei Gas-Flüssigkeits-Wechseln im gesamten Kreislauf."],
    ],
  },
  "youtube-brushed-vs-brushless-lifespan": {
    title: "Bürstenmotor oder bürstenloser Motor: Verschleiß, Sauberkeit und EMV",
    description: "Vergleichen Sie Membranpumpenmotoren anhand von Lebensdauer, Bürstenabrieb, möglichen Verunreinigungen und elektromagnetischen Störungen.",
    highlights: [
      ["Bürstenverschleiß und Partikel", "Der mechanische Bürstenkontakt kann Abrieb erzeugen. Prüfen Sie Motorlage und Gehäuse im Hinblick auf benachbarte empfindliche Komponenten. Abrieb am Motor ist kein Nachweis einer Verunreinigung im abgedichteten Flüssigkeitsweg."],
      ["Elektronisches Schalten und Störungen", "Bürstenlose Motoren kommutieren elektronisch. Störungen hängen von Treiber, Kabeln, Erdung und Einbau ab. Die Motorkategorie allein sagt die Emissionen des fertigen Geräts nicht voraus."],
      ["Lebensdauer im vorgesehenen Zyklus", "Vergleichen Sie Lebensdauerangaben unter ihren jeweiligen Prüfbedingungen. Starts, Stopps, Temperatur, Last und flüssigkeitsseitiger Verschleiß beeinflussen die Lebensdauer auch ohne Kohlebürsten."],
    ],
  },
  "youtube-60-series-pressure": {
    title: "Membranpumpen der Serie DPL60: Maximaldruck und Arbeitsdruck",
    description: "Unterscheiden Sie den im Versuch abgelesenen Druck, die spezifizierte Druckgrenze und den nutzbaren Druck-Volumenstrom-Betriebspunkt.",
    highlights: [
      ["Messwert und Versuchsaufbau", "Für die Bewertung benötigen Sie Messort, Auslasswiderstand, Versorgungsbedingungen und Messzeit. Ohne diese Angaben eignet sich der Spitzenwert nicht als Bemessungsdruck des Systems."],
      ["Verbleibende Förderung", "Der Maximaldruck sagt nichts über einen nutzbaren Volumenstrom aus. Wählen Sie den Betriebspunkt so, dass der erforderliche Volumenstrom beim tatsächlichen Gegendruck innerhalb der veröffentlichten Grenzen liegt."],
      ["Druckbelastete Bauteile", "Pumpe, Leitungen, Fittings, Ventile und Zielkomponenten haben jeweils eigene Grenzwerte. Prüfen Sie Druckspitzen und längeren Betrieb zusätzlich zur Kurzprüfung."],
    ],
  },
  "youtube-motor-selection": {
    title: "Bürstenmotor oder bürstenlosen Motor für eine Membranpumpe auswählen",
    description: "Berücksichtigen Sie Laufzeit, Start-Stopp-Zyklen, Ansteuerung und elektrische Integration bei der Wahl des Motors und der passenden Pumpenkonfiguration.",
    highlights: [
      ["Betriebsstunden und Starts", "Erfassen Sie tägliche Laufzeit und Starthäufigkeit. Vergleichen Sie Lebensdauer und Wartungsaufwand bei vergleichbarer Last und Einschaltdauer."],
      ["Steuerung und Rückmeldung", "Klären Sie, ob Ein/Aus-Betrieb genügt oder ob Drehzahlvorgabe und Drehzahlrückmeldung erforderlich sind. Prüfen Sie Verkabelung und Signale der konkreten bürstenlosen Variante."],
      ["Integrationsaufwand und Prüfung", "Beziehen Sie Stromversorgung, Treiber, Kabelverlegung und Störminderung ein. Prüfen Sie nach der Motorwahl den gesamten Flüssigkeitskreislauf auf Volumenstrom, Druck und Medienverträglichkeit."],
    ],
  },
  "youtube-30h-series-pressure": {
    title: "Druckprüfung der Hochdruck-Miniatur-Membranpumpe DPL30H",
    description: "Sehen Sie die Druckprüfung und prüfen Sie Druckgrenzen, Gewindeanschlüsse und Flüssigkeitsvolumenstrom bei Gegendruck.",
    highlights: [
      ["Förderung beim erforderlichen Gegendruck", "Ermitteln Sie den benötigten Volumenstrom anhand der Kennlinie. 300 mL/min bei freiem Auslauf gelten nicht pauschal beim Maximaldruck. Ein Kurztest belegt keinen Dauerbetrieb."],
      ["Gewindeanschluss und Dichtung", "Die DPL30H verwendet andere Anschlüsse als DPL30-Varianten mit Schlauchtülle. Prüfen Sie Gegenfitting, Dichtung, Montageanleitung und Druckeignung der gesamten Verbindung."],
      ["Arbeitszyklus und Systemverhalten", "Erfassen Sie Druck bei Anlauf, normalem Betrieb und Ventilschaltung. Bewerten Sie Strom, Temperatur, Dichtheit und Volumenstrom im vorgesehenen Zyklus anhand der formalen Grenzwerte."],
    ],
  },
  "youtube-diaphragm-selection": {
    title: "Die passende Miniatur-Membranpumpe für ein Fluidsystem auswählen",
    description: "Vergleichen Sie Flüssigkeits- und Gas-Flüssigkeits-Ausführungen anhand von Medium, Arbeitsvolumenstrom, Druck, Werkstoffen und Steuerung.",
    highlights: [
      ["Flüssigkeit oder Gas-Flüssigkeits-Wechsel", "Klären Sie, ob die Pumpe kontinuierlich Flüssigkeit fördert oder beim Absaugen wechselnd mit Luft und Flüssigkeit in Kontakt kommt. Wählen Sie für diesen Einsatz eine geeignete Variante und vergleichen Sie Messwerte mit demselben Prüfmedium."],
      ["Volumenstrom, Gegendruck und Zulauf", "Geben Sie Arbeitsvolumenstrom, Gegendruck, Saughöhe und Leitungswiderstand gemeinsam an. Freier Volumenstrom, Maximaldruck und Endvakuum gehören zu unterschiedlichen Betriebspunkten."],
      ["Werkstoffe, Anschlüsse und Ansteuerung", "Prüfen Sie alle medienberührten Werkstoffe für Flüssigkeit und Reinigung. Klären Sie Leitungsanschlüsse, Einbauraum, Spannung, Arbeitszyklus und Steuersignale vor der Prototypenauswahl."],
    ],
  },
};
