import type { DiagnosticsDraft, DiagnosticsLocaleUi, pumpDiagnosticsSlugs } from "./pump-diagnostics-articles.types";

export const germanPumpDiagnosticsUi: DiagnosticsLocaleUi = {
  faq: "Häufig gestellte Fragen",
  references: "Technische Quellen",
  related: "Weiterführende Artikel und Spezifikationen",
  cta: "Möchten Sie Ihren Flüssigkeitskreislauf prüfen?",
  description: "Nennen Sie FOREACH das Medium, das Arbeitsvolumen oder den Durchfluss, die Druckverhältnisse, die Geometrie und den Steuerungsablauf. Wir prüfen mit Ihnen die Konfiguration und die Bedingungen für die Validierung.",
  contact: "Anwendung besprechen",
  products: "Pumpen ansehen",
  referenceLabels: [
    "Hamilton: Druck- und Luftblasenüberwachung (Englisch)",
    "Tecan: Leitfaden zur Flüssigkeitshandhabung (Englisch). Die Geräteeinstellungen sind nicht übertragbar.",
    "KNF: Durchfluss- und Druckwellen in Flüssigkeitssystemen (Englisch)",
    "KNF: Kavitation erkennen und verhindern (Englisch)",
    "Berrebi et al., 2004: Abtastfehler bei pulsierendem Durchfluss (englische Zusammenfassung geprüft)",
    "KROHNE IFC090: Gerätespezifische Hinweise im englischen Handbuch",
  ],
};

type DiagnosticSlug = (typeof pumpDiagnosticsSlugs)[number];

export const germanPumpDiagnosticsDrafts: Partial<Record<DiagnosticSlug, DiagnosticsDraft>> = {
  "piston-pump-air-bubbles-dispensing-error": {
    title: "Warum verzögern oder verfälschen Luftblasen die Dosierung einer Kolbenpumpe?",
    seo: "Luftblasen in Kolbenpumpen: Dosierfehler und Entlüftungsprüfung",
    description: "Untersuchen Sie Dosierfehler mit Druckmessungen, einzelnen Dosiermassen und kontrolliertem Vorfüllen. Unterscheiden Sie eingeschlossenes Gas, Lufteintritt und Fehler bei der Tropfenübertragung.",
    deck: "Ein abgeschlossener Kolbenhub zeigt nicht, ob das beabsichtigte Flüssigkeitsvolumen das Zielgefäß erreicht. Beim Verdichten einer Luftblase wird ein Teil des Hubvolumens vorübergehend aufgenommen und kann später austreten oder den nächsten Zyklus beeinflussen. Suchen Sie die Stelle, an der die Blasen zuerst auftreten, und vergleichen Sie zeitlich abgeglichene Druckdaten und einzelne Dosiermassen vor und nach dem Entlüften.",
    sections: [
      {
        title: "Wo bleibt das verdrängte Volumen?",
        paragraphs: [
          "Das ideale Verdrängungsvolumen entspricht der wirksamen Kolbenfläche multipliziert mit dem Hubweg. Im realen Flüssigkeitskreislauf können Gas, flexible Leitungen und Hohlräume im Ventil einen Teil dieses Volumens zwischenspeichern. Als abgegeben gilt die Flüssigkeit, die das Ziel tatsächlich erreicht. Besonders empfindlich sind kurze Hübe, die erste Dosierung nach einem Richtungswechsel und die erste Dosierung nach dem Wiederanlauf.",
          "Ein Rechenbeispiel: Eine eingeschlossene Luftblase mit 10 μL nimmt bei einer isothermen Kompression von 100 auf 120 kPa Absolutdruck nach dem idealen Gasgesetz noch rund 8.33 μL ein. Etwa 1.67 μL Hubvolumen werden vorübergehend aufgenommen. Das ist weder ein an FOREACH-Pumpen gemessener Fehler noch eine Vorhersage für eine bleibende Unterdosierung. Beim Druckausgleich kann das Volumen später im selben oder in einem folgenden Zyklus abgegeben werden.",
        ],
      },
      {
        title: "Ort und Zeitpunkt der Blasenbildung erfassen",
        paragraphs: [
          "Halten Sie fest, ob Blasen zuerst vor der Pumpe, in der Kammer, am Ventil oder nahe dem Auslass sichtbar werden. Ordnen Sie jede Beobachtung dem Ansaugen, Umschalten oder Dosieren zu. Ein transparenter Beobachtungsschlauch sollte möglichst wenig Totvolumen und Strömungswiderstand hinzufügen. Eine blasenfreie Beobachtungsstelle schließt Gas in einer nicht einsehbaren Kammer nicht aus.",
          "Eine zu kleine erste Dosierung kann auch durch mechanisches Spiel, verspätetes Ventilschalten oder die Nachgiebigkeit der Leitungen entstehen. Aussagekräftiger ist eine wiederholbare Verbesserung, wenn Sie die Gasbedingungen gezielt ändern und die übrigen Einflussgrößen konstant halten.",
        ],
      },
      {
        title: "Restluft, Lufteintritt und Ausgasung unterscheiden",
        paragraphs: [
          "Stabilisiert sich die Dosierung nach kontrolliertem Vorfüllen rasch, spricht das für Restluft nach der Montage oder einem Medienwechsel. Treten am Zulaufanschluss dauerhaft Blasen auf, prüfen Sie seine Dichtheit unter Ansaugbedingungen. Am Einlass kann Luft eintreten, ohne dass außen Flüssigkeit austritt.",
          "Erwärmung oder ein örtlicher Druckabfall kann gelöstes Gas freisetzen. Vergleichen Sie dasselbe Medium vor und nach der Entgasung bei gleicher Temperatur, gleichem Füllstand und gleichen Druckbedingungen. Eine Verbesserung weist auf Gas als Einflussfaktor hin. Ändern sich Temperatur oder Viskosität gleichzeitig, ist keine eindeutige Zuordnung möglich.",
        ],
      },
      {
        title: "Vorfüllen und Entlüften anhand von Messdaten validieren",
        paragraphs: [
          "Halten Sie Sollvolumen, Temperatur, Behälterfüllstand, Ventilschaltzeiten und Belastung am Auslass konstant. Wiegen Sie jede einzelne Dosierung und zeichnen Sie den Druck am Einlass und am Auslass auf. Vergleichen Sie den Ausgangszustand, das kontrollierte Vorfüllen, den längeren Betrieb und den Wiederanlauf. Werten Sie die ersten Dosierungen getrennt vom stationären Betrieb aus.",
          "Legen Sie die Akzeptanzkriterien für das Vorfüllen projektspezifisch anhand wiederholbarer Dosiermassen, Druckverläufe und beobachtbarer Gasbedingungen fest. Eine allgemeingültige Zahl von Vorfüllzyklen oder ein festes Zusatzvolumen behebt nicht jede Ursache der Blasenbildung. Prüfen Sie, ob das Fehlerbild im längeren Betrieb wieder auftritt.",
        ],
      },
      {
        title: "Pumpenabgabe und Tropfenübertragung unterscheiden",
        paragraphs: [
          "Wenn das am Auslass aufgefangene Volumen stimmt, aber im Zielgefäß weniger ankommt, prüfen Sie hängende Tropfen, Spritzer, die Benetzung der Spitze und den Zeitpunkt der Übertragung. Halten Sie die Belastung am Auslass beim Wechsel der Auffanganordnung vergleichbar. Das Entfernen der Spitze verändert den Gegendruck.",
          "Wenn die Bauweise eine Druckhalteprüfung erlaubt, halten Sie Ventilstellung, Anfangsdruck und Temperatur konstant. Gasausdehnung, Entspannung der Leitungen und interne Leckagen wirken sich auf den Druckabfall aus. Aus der Steigung der Druckabfallkurve allein lässt sich kein defektes Fitting oder Ventil ableiten.",
        ],
      },
      {
        title: "EAS-Kammer bewerten und die vollständige Prüfung wiederholen",
        paragraphs: [
          "Die offizielle FOREACH-Spezifikation für EAS beschreibt eine leicht zu entlüftende Kammer. Die Kammer kann Lufteinschlüsse verringern. Blasenfreier Betrieb mit jedem Medium, jeder Einbaulage und jedem Ventilkreis ist damit nicht garantiert. Prüfen Sie Volumen, Anschlüsse und den tatsächlichen Ventilkreis anhand der offiziellen Spezifikation.",
          "Die dargestellte Konfiguration EA-500-PMMA hat ein Volumen von 500 μL bei 2000 Vollschritten. Das entspricht theoretisch 0.25 μL pro Schritt. Daraus lässt sich die Genauigkeit der Flüssigkeitsabgabe nicht ableiten. Prüfen Sie das tatsächliche Medium, das kleinste Sollvolumen, die erste Dosierung, den stationären Betrieb und den Wiederanlauf. Die Hamilton-Unterlagen zur Druck- und Luftblasenüberwachung stützen die Beobachtungsmethode. Sie belegen keine entsprechende Sensorausstattung von FOREACH-Pumpen.",
        ],
      },
    ],
    formula: {
      section: 0,
      expression: "P₁V₁ ≈ P₂V₂; ΔVgas = V₁(1 − P₁/P₂)",
      note: "Näherung zur Abschätzung der Größenordnung für eingeschlossenes ideales Gas, annähernd isotherm und ohne Lösung oder Stoffaustausch. Setzen Sie Absolutdrücke ein. ΔVgas beschreibt das vorübergehende Kompressionsvolumen und erlaubt keine Berechnung einer bleibenden Unterdosierung.",
    },
    table: {
      section: 1,
      headers: ["Ort oder Ereignis", "Zuerst prüfen", "Grenzen der Aussage"],
      rows: [
        ["Kammer, erste Dosierung nach Richtungswechsel", "Vorfüllen und Druckaufbau", "Mechanisches Spiel kann ebenfalls beitragen"],
        ["Fortlaufend Blasen am Einlass", "Anschlüsse, Füllstand und Temperatur", "Lufteintritt und Ausgasung können gleichzeitig auftreten"],
        ["Tropfen nach dem Stopp", "Volumenspeicherung in Gas und Leitungen, Ventilstellung", "Kein eindeutiger Nachweis einer Leckage"],
        ["Zu wenig Flüssigkeit nur im Zielgefäß", "Tropfenbildung und Übertragung", "Gegendruck der Referenzmessung vergleichbar halten"],
      ],
    },
    diagram: "Prinzipskizze: Der Kolbenhub verdichtet zunächst eine Luftblase. Beim Druckausgleich kann Flüssigkeit nachlaufen. Pfeile zeigen die Strömungsrichtung. Die Abmessungen entsprechen keinem realen Produkt.",
    faq: [
      {
        question: "Verringern Luftblasen immer jede einzelne Dosierung?",
        answer: "Nein. Verdichtung und Ausdehnung können die Abgabe verzögern, zu Nachlauf führen oder aufeinanderfolgende Zyklen beeinflussen. Ventilstellung, Druck und Auffangzeitpunkt bestimmen das Ergebnis.",
      },
      {
        question: "Reicht es aus, wenn zusätzliches Vorfüllen das Problem vorübergehend behebt?",
        answer: "Wiederholen Sie die Prüfung im längeren Betrieb und nach dem Wiederanlauf. Anhaltender Lufteintritt oder Ausgasung kann das Problem erneut auslösen. Ermitteln Sie die Ursache.",
      },
      {
        question: "Verhindert eine hohe Auflösung der Kolbenpumpe luftblasenbedingte Fehler?",
        answer: "Nein. Eine feine geometrische Auflösung verhindert weder Volumenspeicherung in Gas oder Leitungen noch Verluste bei der Tropfenübertragung.",
      },
      {
        question: "Garantiert EAS blasenfreien Betrieb für alle Reagenzien?",
        answer: "Aus dem Kammeraufbau lässt sich keine allgemeingültige Garantie ableiten. Validieren Sie das reale Medium, die Einbaulage, die Ventilhohlräume und den Vorfüllablauf.",
      },
    ],
    links: [
      "Genauigkeit, Wiederholbarkeit und Auflösung",
      "Ansauggeschwindigkeit und Wartezeit bei viskosen Medien",
      "Offizielle EAS-Spezifikation (Englisch)",
      "Präzisionskolbenpumpen",
    ],
  },
  "piston-pump-viscous-liquid-aspiration-speed": {
    title: "Wie lassen sich Ansauggeschwindigkeit und Wartezeit einer Kolbenpumpe für viskose Reagenzien einstellen?",
    seo: "Kolbenpumpen: Ansauggeschwindigkeit und Wartezeit bei viskosen Medien",
    description: "Ermitteln Sie Ansauggeschwindigkeit und Wartezeit für viskose Reagenzien. Die Versuchsmatrix berücksichtigt Druck, Abweichung, Wiederholbarkeit, Blasen und Gesamtzykluszeit.",
    deck: "Die stabile Ansaugphase hängt von Strömungswiderstand, Füllzeit und Druck ab. Prüfen Sie Ansauggeschwindigkeit und anschließende Wartezeit getrennt. Wählen Sie eine schnellere Kombination, die die Anforderungen an Abweichung, Wiederholbarkeit, Blasen und Zykluszeit erfüllt. Wassereinstellungen gelten nicht automatisch für Reagenzien. Ein abgeschlossener Hub belegt keinen Druckausgleich.",
    sections: [
      {
        title: "Einfluss von Viskosität und Innendurchmesser auf den Ansaugdruckverlust",
        paragraphs: [
          "Bei voll ausgebildeter laminarer Strömung einer newtonschen Flüssigkeit in einem Rohr mit rundem Querschnitt steigt der Druckverlust mit Viskosität und Rohrlänge. Der Innendurchmesser geht mit der vierten Potenz ein. Eine größere Hauptleitung kann helfen. Ventil, Fitting, Filter oder Nadel können jedoch weiterhin die engste Stelle bilden.",
          "Dieser stationäre Zusammenhang beschreibt einen Leitungsabschnitt. Vorgänge in der Kammer können zeitlich anders verlaufen. Übertragen Sie die Gleichung nicht direkt auf scherverdünnende, partikelhaltige oder stark nichtnewtonsche Reagenzien. Erfassen Sie Temperatur und rheologische Bedingungen und lokalisieren Sie Engstellen durch Druckmessungen.",
        ],
      },
      {
        title: "Warum kann die Kammer nach dem Kolbenstopp weiter volllaufen?",
        paragraphs: [
          "Beim Zurückziehen des Kolbens entsteht ein geometrisches Volumen, das sich über den Strömungswiderstand der vorgeschalteten Leitung füllt. Sind Gas oder elastische Leitungen vorhanden, können Befüllung und Druckausgleich nach Ende der Bewegung fortdauern. Bei sofortigem Umschalten des Ventils kann der Folgeschritt vor dem Druckausgleich beginnen.",
          "Wählen Sie die Wartezeit anhand der Druckerholung und reproduzierbarer Dosiermassen. Tecan empfiehlt geeignete Geschwindigkeiten und Wartezeiten für viskose Medien. Die geräte- und spitzenspezifischen Einstellungen begründen keine allgemeingültigen 200 ms oder 500 ms für FOREACH-Pumpen.",
        ],
      },
      {
        title: "Ansauggeschwindigkeit und Wartezeit in einer Versuchsmatrix prüfen",
        paragraphs: [
          "Vergleichen Sie im zulässigen Bereich von Pumpe und Ansteuerung niedrige, mittlere und hohe Ansauggeschwindigkeiten mit kurzen, mittleren und langen Wartezeiten in einem 3×3-Versuch. Beginnen Sie mit konservativen Einstellungen. Halten Sie Sollvolumen, Abgabeeinstellungen, Behälterfüllstand, Ventilsequenz und Gegendruck konstant.",
          "Erfassen Sie für jede Kombination einzelne Dosiermassen, mittlere Abweichung, Variationskoeffizient (CV), minimalen Einlassdruck, beobachtete Luftblasen und die vollständige Zykluszeit. Berücksichtigen Sie bei der Zahl der Wiederholungen die Messunsicherheit und die Akzeptanzkriterien. Die drei Stufen sind Versuchsparameter. Schalten Sie zwischen den Versuchen wiederholt auf die Ausgangseinstellung zurück, um temperaturbedingte Drift zu erkennen.",
        ],
      },
      {
        title: "Abgabe und Tropfenübertragung getrennt optimieren",
        paragraphs: [
          "Beim Ansaugen begrenzen Befüllung und Reserve bis zum unzulässigen Unterdruck die Geschwindigkeit. Bei der Abgabe spielen auch Gegendruck, Spritzer und Tropfenablösung eine Rolle. Die beiden Geschwindigkeiten können daher unterschiedlich sein. Stabilisieren Sie zuerst das Ansaugen und optimieren Sie danach Abgabegeschwindigkeit, Verzögerung am Hubende, Wartezeit und Bewegung der Spitze.",
          "Vergleichen Sie die gesamte Abfolge aus Ansaugen, Druckausgleich, Ventilumschaltung, Abgabe, Tropfenübertragung und Nachfüllen. Höhere Bewegungsgeschwindigkeiten können ihren Zeitvorteil verlieren, wenn sie längere Beruhigungszeiten oder mehr fehlerhafte Dosierungen verursachen.",
        ],
      },
      {
        title: "Wann muss der Flüssigkeitskreislauf angepasst werden?",
        paragraphs: [
          "Erfüllt nur sehr langsames Ansaugen die Anforderungen, messen Sie die Druckverluste in Leitungen, Ventilen und Filtern. Verkürzen Sie den Zulauf oder vergrößern Sie den kleinsten Innendurchmesser, wenn die Anwendung dies zulässt. Bewerten Sie nach jeder Änderung Totvolumen, Reagenzienverbrauch, Reinigung und Einbauraum erneut.",
          "Halten Sie die Reagenztemperatur reproduzierbar. Die Temperatur kann Viskosität, Dichte, Dampfdruck und Ausgasung zugleich verändern. Erwärmen Sie ein Reagenz nicht allein zur Verringerung der Viskosität. Validieren Sie die endgültige Formulierung unter den vorgesehenen Bedingungen und mit ihrer tatsächlichen Konzentration.",
        ],
      },
      {
        title: "Das gültige Betriebsfenster als Flüssigkeitsklasse dokumentieren",
        paragraphs: [
          "Dokumentieren Sie Volumenbereich, Charge und Temperatur, Leitungsgeometrie, Ventile und Spitzen, Geschwindigkeiten und Beschleunigungen beim Ansaugen und Abgeben, Wartezeiten, Ventilverzögerungen sowie die Prüfergebnisse. Wählen Sie einen kürzeren Zyklus, der sämtliche Anforderungen mit Reserve für Temperatur- und Füllstandsschwankungen erfüllt.",
          "Verwenden Sie die modellspezifischen Hubvolumina und Schrittzahlen. EA-500-PMMA und SM-500-PMMA sind beispielsweise mit 500 μL bei 2000 Vollschritten angegeben, TM-500-PMMA mit 500 μL bei 2540 Vollschritten. Die gleiche Impulsfrequenz ergibt daher unterschiedliche geometrische Durchflüsse. Validieren Sie nach der Umrechnung mit dem tatsächlichen Reagenz.",
        ],
      },
    ],
    formula: {
      section: 0,
      expression: "ΔP = 128 μ L Q / (π d⁴)",
      note: "μ ist die dynamische Viskosität, L die Länge, Q der Volumenstrom und d der Innendurchmesser. Verwenden Sie einheitliche SI-Einheiten. Die Gleichung gilt für voll ausgebildete laminare newtonsche Strömung in einem starren Rohr mit rundem Querschnitt. Einlaufeffekte, lokale Komponentenverluste und instationäre Effekte sind ausgenommen.",
    },
    table: {
      section: 2,
      headers: ["Versuchsgröße", "Konstant halten", "Aufzeichnen"],
      rows: [
        ["Niedrige, mittlere und hohe Ansauggeschwindigkeit", "Abgabe, Ventilsequenz und Volumen", "Einlassdruck und Luftblasen"],
        ["Kurze, mittlere und lange Wartezeit", "Gewählte Geschwindigkeit und Flüssigkeitsweg", "Einzelmassen, Abweichung und CV"],
        ["Zwischenmessungen mit der Ausgangseinstellung", "Reagenzcharge und Gegendruck", "Temperatur und Versuchsreihenfolge"],
        ["Validierung des Betriebsfensters", "Niedrigster Füllstand und Temperaturgrenzen", "Gesamte Zykluszeit und Anteil bestandener Prüfungen"],
      ],
    },
    diagram: "Technischer Zusammenhang: Viskosität μ, Leitungslänge L und Innendurchmesser d beeinflussen den Druckverlust beim Ansaugen. Überprüfen Sie nach dem Bewegungsende die Druckerholung vor der Ventilumschaltung.",
    faq: [
      { question: "Ist langsameres Ansaugen bei viskosen Flüssigkeiten immer besser?", answer: "Nein. Wählen Sie ein Fenster, das die Anforderungen an Volumen, Druck, Gas und Zykluszeit erfüllt. Eine zu geringe Geschwindigkeit kostet Zeit und dichtet einen undichten Einlass nicht ab." },
      { question: "Kann ich immer 500 ms Wartezeit verwenden?", answer: "Nein. Prüfen Sie Druckerholung und einzelne Dosierungen mit dem tatsächlichen Medium, der realen Geometrie und dem vorgesehenen Arbeitsvolumen." },
      { question: "Warum funktionieren Einstellungen für Wasser nicht immer mit Reagenzien?", answer: "Viskosität, Dichte, Oberflächenspannung, Flüchtigkeit und gelöstes Gas können Befüllung und Tropfenübertragung verändern. Ein Wassertest belegt die Leistung unter Wasserbedingungen." },
      { question: "Zeigt der Motorstrom, dass das Ansaugen abgeschlossen ist?", answer: "Der Motorstrom liefert einen ergänzenden Hinweis. Bestätigen Sie das aufgenommene Volumen über Druckmessungen, Gasbeobachtungen und die abschließende Massenmessung." },
    ],
    links: ["Beschleunigung und Verzögerung von Kolbenpumpen", "Werkstoffe des Kolbenpumpenkopfs", "Dosierfehler durch Luftblasen", "Präzisionskolbenpumpen"],
  },
  "piston-pump-dispensing-drift-diagnosis": {
    title: "Wie lässt sich eine zeitliche Abweichung beim Dosieren mit Kolbenpumpen eingrenzen?",
    seo: "Dosierdrift bei Kolbenpumpen: Zeitverlauf und Kreuztauschversuche",
    description: "Grenzen Sie die Dosierdrift bei Kolbenpumpen anhand von Zeitverlauf, Druck, Temperatur und Kreuztausch von Pumpen und Kreisläufen ein, bevor Sie Verschleiß an Ventilen oder Dichtungen annehmen.",
    deck: "Ein Volumentrend zeigt veränderte Systembedingungen. Ob Pumpenverschleiß vorliegt, bleibt zunächst offen. Zeichnen Sie jede Dosierung mit Temperatur, Füllstand, Richtungswechsel und Vorfüllvorgängen auf. Grenzen Sie Ursachen durch kontrolliertes Vorfüllen, konstanten Füllstand und den gezielten Tausch von Pumpe, Ventil oder Flüssigkeitsweg ein. Prüfen Sie mittlere Abweichung und Variationskoeffizient getrennt.",
    sections: [
      {
        title: "Zeitlichen Trend und zufällige Streuung unterscheiden",
        paragraphs: [
          "Berechnen Sie den relativen Fehler jeder Dosierung und bewahren Sie die Zeitreihenfolge der Messwerte. Anfangs- und Endmittelwerte allein reichen nicht aus. Auch bei kleinem CV innerhalb kurzer Zeitfenster kann sich der Mittelwert verschieben. Ein einzelner Ausreißer belegt keine langfristige Drift.",
          "Verwenden Sie zur gravimetrischen Umrechnung die Dichte bei der tatsächlichen Medientemperatur. Prüfen Sie zuerst Nullpunkt und Drift der Waage, Verdunstung und Auffangverfahren. Geänderte Messbedingungen können denselben Eindruck wie eine veränderte Pumpenleistung erzeugen.",
        ],
      },
      {
        title: "Ereignisse kennzeichnen, die die Drift auslösen können",
        paragraphs: [
          "Erfassen Sie Start, Richtungswechsel, Nachfüllen, Änderungen des Behälterfüllstands, Vorfüllen, Stopp und Wiederanlauf. Ordnen Sie jeder Dosierung die Flüssigkeitstemperatur, die Temperatur an der Pumpe und die Ein- und Auslassdrücke zu. Ähnliche Kurvenverläufe können verschiedene Ursachen haben. Die Ereignisse helfen bei der Wahl des nächsten kontrollierten Versuchs.",
          "Ein Fehler bei der ersten Dosierung nach einem Richtungswechsel deutet auf mechanisches Spiel, verspätetes Ventilschalten oder verzögerten Druckaufbau hin. Ein füllstandsabhängiger Trend spricht für die hydrostatische Druckhöhe oder die Behälterbelüftung. Eine kurze Verbesserung nach dem Vorfüllen mit erneutem Auftreten stützt die Vermutung von anhaltendem Lufteintritt oder Ausgasung. Die Quelle ist gesondert zu bestätigen.",
        ],
      },
      {
        title: "Zuerst reversible Bedingungen prüfen",
        paragraphs: [
          "Halten Sie Programm, Gegendruck und Temperatur gleich. Prüfen Sie kontrolliertes Vorfüllen, konstanten Behälterfüllstand, Behälterbelüftung und eine zulässige niedrigere Ansauggeschwindigkeit einzeln. Ändern Sie jeweils nur eine Größe und kehren Sie zur Ausgangseinstellung zurück, um Ursachen von Zeiteffekten zu trennen.",
          "Tauschen Sie Pumpe, Flüssigkeit und Leitungen nicht gleichzeitig. Ein Referenzkreislauf muss die erforderliche Ventilsequenz und eine vergleichbare Auslassbelastung beibehalten. Andernfalls zeigt eine Verbesserung lediglich, dass sich die Gesamtbedingungen verändert haben.",
        ],
      },
      {
        title: "Pumpen und Kreisläufe über Kreuz tauschen",
        paragraphs: [
          "Prüfen Sie die auffällige Pumpe und die Referenzpumpe zunächst im selben validierten Referenzkreislauf, danach beide im vollständigen Gerätekreislauf. So entsteht ein 2×2-Vergleich. Halten Sie Sollvolumen, Medientemperatur, Füllstand, Antrieb und Ventilsequenz gleich. Stellen Sie sicher, dass die Referenzpumpe selbst qualifiziert ist.",
          "Folgt das Fehlerbild einer bestimmten Pumpe, grenzen Sie anschließend deren Ventil, Dichtung und bewegliche Komponenten ein. Zeigen beide Pumpen nur im Gerätekreislauf Drift, prüfen Sie zuerst das System. Auch eine Wechselwirkung mit der Belastung oder der Anpassung der Ansteuerung ist möglich.",
        ],
      },
      {
        title: "Aussagegrenzen der Druckhalteprüfung berücksichtigen",
        paragraphs: [
          "Wenn Konstruktion und zulässiger Druck es erlauben, vergleichen Sie Druckhalteverläufe bei gleichem Anfangsdruck, gleicher Ventilstellung und gleicher Temperatur mit einer historischen Referenz oder einem Neuteil. Ein schnellerer Druckabfall spricht für Leckage oder veränderte Volumenspeicherung. Der Verlauf allein benennt keinen bestimmten defekten Ventilsitz.",
          "Gas, Relaxation der Leitungen, Temperatur und Sensorposition beeinflussen ebenfalls den Verlauf. Mechanisches Spiel zeigt sich meist beim Richtungswechsel und erfordert eine gesonderte Prüfung. Wiederholt erhöhte Kompensation kann Temperatur-, Leckage- oder Gasprobleme verdecken.",
        ],
      },
      {
        title: "Verschleiß erst bei übereinstimmenden Befunden feststellen",
        paragraphs: [
          "Schließen Sie zunächst Unterschiede bei Messung, Vorfüllen, Füllstand und Steuerung aus. Belastbarere Verschleißhinweise sind eine reproduzierbare Verschlechterung, die dem gealterten Teil folgt, eine Erholung nach dessen Austausch und ein zum Fehlerbild passender Prüfungsbefund. Erfassen Sie Verunreinigungen, Kristallisation und Werkstoffveränderungen getrennt.",
          "Dokumentieren Sie Referenzwerte von Neugeräten, verschiedenen Lebensdauerphasen und dem Zustand nach Wartung. Wiederholen Sie die Qualifizierung für die ursprüngliche Dauer bis zum Auftreten des Fehlers und unter ungünstigen Medien- und Temperaturbedingungen. Vollhubwerte von EA, EAS, SM oder TM begründen keine Driftgrenze für jedes Volumen und Reagenz. Maßgeblich sind Geräteanforderungen und Messunsicherheit.",
        ],
      },
    ],
    formula: {
      section: 0,
      expression: "eᵢ = (Vᵢ − Vtarget) / Vtarget × 100%",
      note: "Vtarget muss positiv sein. Speichern Sie die Dosierfehler in Zeitreihenfolge und berechnen Sie Mittelwerte und CV für feste Zeitfenster getrennt. Ein einzelner CV für den gesamten Versuch kann Drift verdecken.",
    },
    table: {
      section: 3,
      headers: ["Kombination", "Referenzkreislauf", "Gerätekreislauf"],
      rows: [
        ["Referenzpumpe", "Qualifizierte Referenz bestätigen", "Löst das System Drift aus?"],
        ["Auffällige Pumpe", "Folgt das Problem der Pumpe?", "Ursprüngliches Fehlerbild reproduzieren"],
        ["Gemeinsame Prüfbedingungen", "Gleiches Medium, gleiche Temperatur und gleiches Programm", "Vergleichbare Auslassbelastung, Einlassdruck erfassen"],
      ],
    },
    diagram: "Diagnoseskizze: Prüfen Sie den zeitlichen Verlauf und grenzen Sie die Ursache durch Vorfüllen, konstanten Behälterfüllstand und Kreuztausch ein. Der Verlauf ist synthetisch und stammt aus keinem Lebensdauertest. P₁/P₂ bezeichnen Referenzpumpe und auffällige Pumpe. C₁/C₂ bezeichnen Referenz- und Gerätekreislauf.",
    faq: [
      { question: "Beweist eine zunehmend geringere Abgabe eine Ventilleckage?", answer: "Nein. Füllstand, Belüftung, Gas, Temperatur und Messfehler können ähnliche Verläufe verursachen. Nutzen Sie kontrollierte Vergleiche und Befunde aus Druckhalteprüfungen." },
      { question: "Schließt ein CV innerhalb der Grenzwerte Drift aus?", answer: "Nein. Die Streuung in kurzen Fenstern kann gering bleiben, während sich der Mittelwert verschiebt. Prüfen Sie die mittlere Abweichung und die zeitlich geordneten Daten." },
      { question: "Schließt eine Verbesserung nach dem Vorfüllen Verschleiß aus?", answer: "Die Verbesserung stützt Gas als Einflussfaktor. Weitere Ursachen bleiben möglich. Setzen Sie den Betrieb fort, beobachten Sie ein erneutes Auftreten und vergleichen Sie die Komponenten." },
      { question: "Wie unterscheide ich pumpen- und geräteseitige Ursachen?", answer: "Kombinieren Sie die auffällige Pumpe und Referenzpumpe jeweils mit Referenz- und Gerätekreislauf. Halten Sie Medium, Programm und Belastung vergleichbar und prüfen Sie danach einzelne Komponenten." },
    ],
    links: ["Genauigkeit, Wiederholbarkeit und Auflösung", "Spielkompensation bei Kolbenpumpen", "Werkstoffauswahl am Kolbenpumpenkopf", "Luftblasen und Dosierfehler"],
  },
  "miniature-diaphragm-pump-pulsation-damper-validation": {
    title: "Braucht eine Miniatur-Membranpumpe einen Pulsationsdämpfer? Prüfung im A/B-Vergleich",
    seo: "Pulsationsdämpfer für Membranpumpen im A/B-Vergleich prüfen",
    description: "Prüfen Sie einen Pulsationsdämpfer im A/B-Vergleich. Berücksichtigen Sie Druckschwankungen am Verbraucher, mittlere Fördermenge, Anlauf, Nachlauf und Reinigung.",
    deck: "Der Nutzen eines Dämpfers bemisst sich an der Funktion am Verbraucher und den Auswirkungen auf Anlauf, Nachlauf, Reinigung und Totvolumen. Legen Sie die zulässige Schwankung am Verbraucher fest und vergleichen Sie stationäre Förderung und Start-Stopp-Zyklen unter denselben Bedingungen mit und ohne Dämpfung. Eine glattere Kurve allein belegt keine ausreichende Leistung.",
    sections: [
      {
        title: "Aus der gewünschten Laufruhe ein Akzeptanzkriterium am Verbraucher ableiten",
        paragraphs: [
          "Hubbewegungen erzeugen einen periodischen Durchfluss. Leitungswiderstand, Trägheit und Nachgiebigkeit bestimmen den Druck am Verbraucher. Der allgemeine Leitfaden zur Pulsation erläutert diese Ursachen. Hier geht es darum, einen zusätzlichen Dämpfer zu bewerten und bei Bedarf zu qualifizieren.",
          "Legen Sie Messort, Sensorbandbreite, zulässigen Spitze-Spitze-Wert oder eine andere definierte Kenngröße und die zu prüfende Funktion fest. Beispiele sind das Signal einer Durchflusszelle, die Gleichmäßigkeit des Sprühbilds oder unerwünschte Schutzabschaltungen. Fördert das System die benötigte Flüssigkeitsmenge bereits zuverlässig, kann ein Zusatzbauteil wenig Nutzen bringen.",
        ],
      },
      {
        title: "Zwischengespeicherte Flüssigkeit verändert Anlauf und Stopp",
        paragraphs: [
          "Ein Dämpfungselement nimmt bei höherem Druck Flüssigkeit auf und gibt sie bei sinkendem Druck wieder ab. Die wirksame Nachgiebigkeit entspricht näherungsweise der Volumenänderung pro Druckänderung und hängt von Druck und Bauweise ab. Aus 300 oder 600 mL/min lässt sich kein allgemeingültiges Kammervolumen ableiten.",
          "Ein größeres Speichervolumen kann den Druckaufbau verzögern und Nachlauf verursachen. Prüfen Sie Medienverträglichkeit, Reinigbarkeit, Lufteinschlüsse, Druckgrenze und Einbaulage. Bewusst belassene Blasen im Medium haben nicht die gleichen Eigenschaften wie ein qualifiziertes, vom Medium getrenntes Dämpfungselement.",
        ],
      },
      {
        title: "Dieselbe Förderaufgabe vergleichen und Betriebspunktänderungen dokumentieren",
        paragraphs: [
          "A ist der ursprüngliche Kreislauf. B enthält zusätzlich den Dämpfer. Halten Sie Pumpe, Medientemperatur, Behälterfüllstand, Hauptgeometrie, Verbraucherlast und Messorte gleich. Dokumentieren Sie das vollständige Modell, die Ansteuerung und den Steuerungsstand. Installieren und konfigurieren Sie den Dämpfer nach Herstellerangaben.",
          "Vergleichen Sie zuerst identische Ansteuerung, um Änderungen von mittlerem Durchfluss und Druck zu erkennen. Unterstützt die konkrete Pumpenausführung eine Drehzahlregelung, vergleichen Sie zusätzlich bei gleichem mittlerem Durchfluss und dokumentieren Sie die geänderte Ansteuerung. Eine glattere Kurve bei geringerem Durchfluss stammt aus einem anderen Betriebspunkt.",
        ],
      },
      {
        title: "Stationäre Förderung und kurze Zyklen getrennt messen",
        paragraphs: [
          "Erfassen Sie im stationären Betrieb Druckmaxima und -minima am Verbraucher, mittleren Durchfluss und Prozesssignal mit derselben Bandbreite. Relative Druckschwankungen sind nur bei einem aussagekräftigen Mittelwert ungleich null und einem konsistenten Druckbezug sinnvoll. Nahe null geben Sie absolute Spitze-Spitze-Werte an.",
          "Führen Sie den tatsächlichen Start-Stopp-Ablauf aus. Messen Sie die Zeit bis zum Funktionsdruck, das abgegebene Volumen, den Nachlauf und den Ausgangszustand des nächsten Zyklus. Stimmen Sie die Messfenster des Mengenzählers und der Auffangmessung ab. Im Dämpfer zurückgehaltene Flüssigkeit belegt keine Leckage.",
        ],
      },
      {
        title: "Den Dämpfer anhand des Gesamtergebnisses bewerten",
        paragraphs: [
          "Behalten Sie B bei, wenn sich die Druckschwankungen und die Funktion am Verbraucher verbessern und zugleich Fördervolumen, Anlauf, Nachlauf und Reinigung die Anforderungen erfüllen. Verbessert sich der stationäre Betrieb, während kurze Zyklen oder Nachtropfen die Grenzwerte überschreiten, passen Sie Geometrie, Einbau oder Steuerung an und wiederholen Sie die Prüfung.",
          "Erfüllt A die Funktionsanforderung bereits und beruhigt B lediglich die Anzeige bei mehr zurückgehaltener Flüssigkeit und Wartungsaufwand, kann A die passende Lösung sein. Erfüllt keine Variante die Vorgaben, prüfen Sie Zulauf, Strömungswiderstand und Pumpenbauart erneut.",
        ],
      },
      {
        title: "Aussage der Spezifikationen für DPL30 und DPL60",
        paragraphs: [
          "Die offiziellen Spezifikationen nennen für DPL30 300 mL/min freien Durchfluss, 100 kPa Nenndruck und 6 mH₂O Selbstansaughöhe. Für DPL60 lauten die Werte 600 mL/min, 100 kPa und 3 mH₂O. Diese getrennten Leistungskennwerte beschreiben weder einen garantierten gemeinsamen Betriebspunkt noch einen Pulsationsprozentsatz.",
          "Nutzen Sie Drehzahlregelung nur bei einer konkreten fünfadrigen oder anderen Ausführung, deren Schnittstelle die Funktion ausdrücklich unterstützt. Ein bürstenloser Motor unterstützt nicht grundsätzlich PWM-Ansteuerung. Halten Sie Modell, Ansteuerung, Sensorposition, Medientemperatur, Filterzustand und Lastbedingungen mit den A/B-Ergebnissen fest.",
        ],
      },
    ],
    formula: {
      section: 1,
      expression: "Ppp = Pmax − Pmin; Ceff ≈ ΔV / ΔP",
      note: "Vergleichen Sie Ppp am gleichen Messort und mit gleicher Bandbreite. Ceff beschreibt die wirksame Nachgiebigkeit über ein gewähltes Druckintervall. Sie liefert keine allgemeingültige Dimensionierungsregel oder garantierte Dämpfung.",
    },
    table: {
      section: 4,
      headers: ["Prüfmerkmal", "Messung in A und B", "Kriterium für B"],
      rows: [
        ["Stationäre Funktion", "Druck am Verbraucher und Prozesssignal", "Vorgegebene Funktionsgrenzen eingehalten"],
        ["Förderaufgabe", "Durchfluss und Volumen im selben Messfenster", "Aufgabe erfüllt und Unterschiede erklärt"],
        ["Start und Stopp", "Druckaufbauzeit, Nachlauf und Zustand im Folgezyklus", "Projektgrenzen eingehalten"],
        ["Wartung und Verträglichkeit", "Zurückgehaltene Flüssigkeit, Reinigung, Gas und Werkstoffe", "Zusätzlicher Aufwand vertretbar"],
      ],
    },
    diagram: "Synthetische Kurven: Bei gleichem mittlerem Durchfluss können sich Spitzen und Täler vor und nach der Dämpfung unterscheiden. Prüfen Sie zusätzlich Anlauf und Nachlauf.",
    faq: [
      { question: "Braucht jede Miniatur-Membranpumpe einen Dämpfer?", answer: "Nein. Prüfen Sie, ob die tatsächliche Pulsation den Verbraucher beeinträchtigt. Wägen Sie den Nutzen gegen Totvolumen, Reinigung, Anlauf und Nachlauf ab." },
      { question: "Ist ein größerer Dämpfer immer besser?", answer: "Nein. Volumen, Druckverhalten, Frequenz und Medium wirken zusammen. Mehr Speichervolumen kann Verzögerung und Nachlauf verstärken." },
      { question: "Kann Softwarefilterung die hydraulische Dämpfung ersetzen?", answer: "Filterung verändert das Signal oder die Anzeige. Die physischen Druckschwankungen an Ventilen, Düsen oder Durchflusszellen werden dadurch nicht kleiner." },
      { question: "Wie vergleiche ich einen geringeren Durchfluss nach der Dämpfung?", answer: "Geben Sie zuerst das Ergebnis bei identischer Ansteuerung an. Ist eine Drehzahlregelung möglich, vergleichen Sie zusätzlich bei gleichem mittlerem Durchfluss und dokumentieren Sie Ansteuerung und Betriebspunkt." },
    ],
    links: ["Allgemeiner Leitfaden zur Durchflusspulsation und ihrer Verringerung", "Mengenzähler mit gravimetrischer Referenz vergleichen", "Durchfluss-Druck-Kennlinien von Membranpumpen", "Miniatur-Membranpumpen"],
  },
  "miniature-liquid-diaphragm-pump-cavitation-diagnosis": {
    title: "Blasen und Geräusche bei Membranpumpen: Kavitation, Lufteintritt oder Ausgasung?",
    seo: "Kavitation bei Miniatur-Membranpumpen diagnostizieren",
    description: "Unterscheiden Sie Kavitation, Lufteintritt und Ausgasung anhand von absolutem Einlassdruck, Dampfdruck des Mediums und kontrollierten Vergleichsprüfungen.",
    deck: "Blasen, Geräusche und geringerer Durchfluss reichen jeweils nicht als Kavitationsnachweis aus. Unterscheiden Sie Lufteintritt, Freisetzung gelöster Gase und lokale Dampfbildung anhand synchronisierter Messungen von absolutem Einlassdruck, Medientemperatur, Blasenposition und Durchfluss. Ein normaler mittlerer Einlassdruck schließt kurzzeitige lokale Druckabfälle in der Pumpe nicht aus.",
    sections: [
      {
        title: "Absolutdruck für den Vergleich mit dem Dampfdruck verwenden",
        paragraphs: [
          "Bei Kavitation bildet sich lokal bei niedrigem Druck Dampf. Die Dampfblasen fallen bei wieder ansteigendem Druck zusammen. Von außen eindringende Luft und freigesetztes gelöstes Gas haben andere Ursachen und erfordern andere Abhilfen. Beide können neben Dampfbildung auftreten.",
          "Addieren Sie den örtlichen Atmosphärendruck zum Relativdruck, bevor Sie mit dem Dampfdruck des tatsächlichen Mediums bei seiner Temperatur vergleichen. Zwischen Einlasssensor und Pumpenkammer treten Druckverluste und instationäre Effekte auf. Ein mittlerer Einlassdruck oberhalb des Dampfdrucks belegt daher keinen kavitationsfreien Betrieb.",
        ],
      },
      {
        title: "Welche Befunde unterscheiden die drei Mechanismen?",
        paragraphs: [
          "Zeichnen Sie auf, wo zuerst Blasen auftreten, welcher Druck beim Ansaugen herrscht und wie warm das Medium ist. Ein Anschluss kann unter Unterdruck Luft einlassen, ohne dass außen Flüssigkeit austritt. Eine Verbesserung durch Entgasung spricht für gelöstes Gas als Einflussfaktor. Ob zusätzlich Dampf entsteht, bleibt damit offen.",
          "Dampfblasen können sich in der Pumpe bilden und wieder zusammenfallen, bevor sie stromabwärts sichtbar werden. Geräusche, eine schwächere Durchflussreaktion auf Drehzahländerungen und Druckschwankungen sind Hinweise. Bewerten Sie sie gemeinsam mit den Ergebnissen unter verbesserten Zulaufbedingungen.",
        ],
      },
      {
        title: "Zulaufwiderstände und Behälterbedingungen prüfen",
        paragraphs: [
          "Prüfen Sie Ansaughöhe, Mindestfüllstand, Behälterbelüftung, Filterbeladung, abgeflachte Leitungen und den kleinsten Fittingquerschnitt. Eine größere Hauptleitung beseitigt eine Engstelle am Ventil oder Filter möglicherweise nicht. Nutzen Sie abschnittsweise Druckmessungen oder zulässige Bauteilvergleiche.",
          "Höhere Temperaturen können die Viskosität senken, zugleich den Dampfdruck erhöhen und Ausgasung fördern. Eine bessere Fließfähigkeit vergrößert die Sicherheitsreserve daher nicht zwangsläufig. Bestimmen Sie bei warmen oder flüchtigen Formulierungen die Eigenschaften für die tatsächliche Zusammensetzung und Temperatur.",
        ],
      },
      {
        title: "Drei kontrollierte Vergleichsprüfungen durchführen",
        paragraphs: [
          "Behalten Sie zunächst das Medium bei und verkürzen Sie den Zulauf oder ersetzen Sie ein nachweislich drosselndes Bauteil. Prüfen Sie anschließend Dichtungen und erhöhen Sie die hydrostatische Zulaufhöhe innerhalb der zulässigen Grenzen. Vergleichen Sie dann dasselbe Medium vor und nach der Entgasung bei gleicher Temperatur. Kehren Sie zur Ausgangsbedingung zurück und erfassen Sie minimalen Einlassdruck, Durchfluss, Geräusche und Blasen.",
          "Ein separater Versuch mit geringerer Drehzahl ist nur sinnvoll, wenn die konkrete Ausführung eine geregelte Drehzahl unterstützt. Legen Sie kein inkompatibles PWM-Signal an zweipolige oder ungeprüfte Ausführungen an. Eine Verbesserung bei geringerem Ansaugbedarf kann auf mehrere Mechanismen zurückgehen. Sie bestätigt Kavitation nicht allein.",
        ],
      },
      {
        title: "Grenzen von Sensor und Schlussfolgerung angeben",
        paragraphs: [
          "Erfassen Sie absoluten Einlassdruck, Auslassdruck, Durchfluss und Temperatur zeitgleich. Dokumentieren Sie Sensorreaktion, Abtastung, Hohlräume an der Messstelle und Abstand zur Pumpe. Ein träges Instrument kann Druckminima verbergen. Der Einbau kann Gaspolster oder zusätzlichen Widerstand erzeugen.",
          "Legen Sie die Druckreserve anhand von Herstellerangaben, lokaler dynamischer Bewertung und Versuchen fest. Der Artikel gibt weder einen allgemeinen kPa-Grenzwert noch einen ungemessenen NPSH-Bedarf vor. Ist die kritische Zone nicht messbar, dokumentieren Sie die gestützten Hypothesen oder das verringerte Risiko.",
        ],
      },
      {
        title: "Was die Selbstansaughöhe über Kavitation aussagt",
        paragraphs: [
          "Die offizielle Selbstansaughöhe beträgt für DPL30 6 mH₂O und für DPL60 3 mH₂O. Diese mit Wasser ermittelten Werte garantieren keinen sicheren Betrieb mit jedem Reagenz bei 6 m beziehungsweise 3 m Einbauhöhe. Auch der Nennauslassdruck von 600 kPa für DPL30H bestimmt die Dampfdruckreserve am Einlass nicht.",
          "Wiederholen Sie die Qualifizierung bei maximaler Medientemperatur, minimalem Behälterfüllstand, repräsentativer Filterbeladung am Ende der Nutzungsdauer, maximalem gefordertem Durchfluss sowie beim Start, Stopp und Wiederanlauf. Speichern Sie mittlere Förderwerte und dynamische Signale und halten Sie Werkstoff- und Mediengrenzen ein. Eine Erholung mit Wasser bei Raumtemperatur beantwortet die Frage zum tatsächlichen Reagenz noch nicht.",
        ],
      },
    ],
    formula: {
      section: 0,
      expression: "Pabs = Pgauge + Patm; Plocal,min,abs > Pvapor(T) + margin",
      note: "Die zweite Beziehung ist ein Auslegungsziel. Die Anzeige eines Einlasssensors allein erlaubt keine Aussage über die Betriebssicherheit. Wählen Sie den Dampfdruck passend zu Medium und Temperatur und validieren Sie die erforderliche Reserve im realen System.",
    },
    table: {
      section: 1,
      headers: ["Mechanismus", "Gasquelle", "Vorrangiger Vergleich"],
      rows: [
        ["Lufteintritt", "Luft von außen", "Dichtheit auf der Saugseite und abschnittsweiser Bauteiltausch"],
        ["Ausgasung", "Gelöstes Gas", "Entgasung desselben Mediums bei gleicher Temperatur"],
        ["Dampfbildung oder Kavitation", "Dampf des Mediums", "Zulaufverluste, Absolutdruck und Temperatur"],
        ["Gleichzeitige Mechanismen", "Mehrere Quellen", "Schrittweise Änderungen und Wiederholungen der Ausgangsprüfung"],
      ],
    },
    diagram: "Drei mögliche Blasenquellen: ① Lufteintritt, ② Ausgasung, ③ örtliche Dampfbildung. Verwenden Sie Absolutdrücke und prüfen Sie die dargestellten Hypothesen durch Vergleiche.",
    faq: [
      { question: "Beweisen Blasen oder Geräusche Kavitation?", answer: "Nein. Lufteintritt, Ausgasung, Restgas und weitere Fehler können ähnlich aussehen. Bewerten Sie Druckbefunde zusammen mit kontrollierten Vergleichen." },
      { question: "Kann ich −50 kPa Relativdruck direkt mit dem Dampfdruck vergleichen?", answer: "Nein. Rechnen Sie mit dem örtlichen Atmosphärendruck um und berücksichtigen Sie Medium, Temperatur, Sensorposition und instationäre Verluste." },
      { question: "Bestätigt leiserer Betrieb bei niedriger Drehzahl Kavitation?", answer: "Er weist auf drehzahlabhängige Effekte im Zulauf oder System hin. Auch Lufteintritt, Ausgasung, Resonanzen und begrenzter Zulauf können sich mit der Drehzahl ändern." },
      { question: "Schließt die spezifizierte Selbstansaughöhe der DPL30 von 6 m Kavitation bei 6 m tatsächlicher Ansaughöhe aus?", answer: "Nein. Die Bedingungen der Ansaugprüfung unterscheiden sich vom Dauerbetrieb. Medium, Temperatur, Leitungsverluste, Füllstand und Pulsation beeinflussen das Risiko." },
    ],
    links: ["Widerstand auf Saug- und Druckseite", "Verlust der Selbstansaugung bei DPL30 untersuchen", "Pulsationsdämpfer prüfen", "Durchfluss-Druck-Kennlinien von Membranpumpen"],
  },
  "diaphragm-pump-flow-meter-totalizer-error": {
    title: "Warum weicht die Durchflusssumme einer Membranpumpe von der aufgefangenen Flüssigkeitsmasse ab?",
    seo: "Summenfehler bei Membranpumpen gravimetrisch überprüfen",
    description: "Prüfen Sie die Durchflusssumme anhand der aufgefangenen Masse. Gleichen Sie Messfenster ab und berücksichtigen Sie Dichte, gespeichertes Volumen, Nachlauf, Rückfluss und Abtastung.",
    deck: "Eine schwankende Anzeige und ein fehlerhafter Summenwert sind zwei verschiedene Probleme. Stimmen Sie Sammelzeiträume und hydraulische Bedingungen ab und rechnen Sie die Masse mit der tatsächlichen Mediendichte um. Prüfen Sie Speicherwirkungen, Nachlauf, Rückfluss, Messbereich und Abtastung. Nur eine unabhängige Referenzmessung zeigt, ob Filterung oder Dämpfung die Messgenauigkeit verbessert.",
    sections: [
      {
        title: "Dieselbe Messgröße definieren",
        paragraphs: [
          "Der Durchflussmesser erfasst Flüssigkeit an seiner Messstelle. Die Waage erfasst die Masse, die im Auffanggefäß ankommt. Dazwischen können Leitungen, ein Dämpfer oder eine Düse liegen. Bei stationärem Betrieb und unverändertem Speichervolumen ist ein direkter Vergleich sinnvoll. Beim Anlaufen oder Stoppen müssen Sie gespeichertes Volumen, Abzweige und Nachlauf einrechnen.",
          "Verwenden Sie die Dichte bei tatsächlicher Zusammensetzung und Temperatur. Kontrollieren Sie Verdunstung, Spritzer, außen anhaftende Tropfen und Zeitversatz. Entfernen Sie zur Auffangmessung kein Bauteil, das den Gegendruck bestimmt. Sonst verschiebt sich der Betriebspunkt der Pumpe.",
        ],
      },
      {
        title: "Volumenbilanz im selben Messfenster aufstellen",
        paragraphs: [
          "Gleichen Sie Start- und Endzeit sowie die Volumeneinheiten von Mengenzähler und Auffangmessung ab. Ohne Leckage, Abzweige oder Phasenwechsel zwischen Messgerät und Gefäß entspricht die Differenz der Änderung des gespeicherten Flüssigkeitsvolumens. Komplexere Kreisläufe erfordern eigene Bilanzterme für Abzweige und Verluste.",
          "Wiederholen Sie gleich lange stationäre Messungen und variieren Sie danach die Fensterlänge. Wird die Abweichung bei längeren Fenstern kleiner, prüfen Sie feste Zeitversätze, Speichervolumen und Nachlauf. Eine bleibende relative Abweichung erfordert die Prüfung von Dichte, Kalibrierung, Messbereich und dynamischer Eignung.",
        ],
      },
      {
        title: "Erfassung von Rückfluss und kurzzeitige Übersteuerung prüfen",
        paragraphs: [
          "Auch bei mittlerem Durchfluss innerhalb des Nennmessbereichs kann es kurzzeitig zur Übersteuerung kommen. Rückfluss ist für kurze Zeit möglich. Summiert der Zähler nur den Vorwärtsfluss oder setzt negative Werte auf null, kann er zu viel anzeigen. Prüfen Sie bidirektionale Messbarkeit und vorzeichenrichtige Summierung.",
          "Halten Sie die gerätespezifischen Vorgaben für eine vollständig gefüllte Leitung, Medienkalibrierung, Einbaulage, gerade Messstrecken und Druck ein. Die Empfindlichkeit gegenüber Gas, Viskosität und Pulsation hängt vom Messprinzip ab. Einbauvorgaben für ein Gerät gelten jeweils für dieses Gerät.",
        ],
      },
      {
        title: "Messung, Datenübertragung und Anzeigefilterung getrennt betrachten",
        paragraphs: [
          "Durch häufigeres Auslesen eines unveränderten Ausgangswerts entstehen keine neuen Informationen. Erfassen Sie Sensorbandbreite, interne Aktualisierung und Mittelung, Übertragungsrate und externe Filter. Integrieren Sie mit den tatsächlichen Zeitstempeln. Bei ungleichen Intervallen ergibt das arithmetische Mittel keinen zeitgewichteten Mittelwert.",
          "Wird jeweils dieselbe Phase der Kurve abgetastet, können ein systematischer Fehler oder eine scheinbar langsame Schwingung entstehen. Verwenden Sie Fenster mit mehreren vollständigen Perioden und prüfen Sie den Schutz vor Aliasing. Die doppelte höchste relevante Frequenz ist nur ein theoretisches Minimum und sichert keine genaue Erfassung schmaler Spitzen. Die Zusammenfassung der zitierten Studie stützt bessere Mittelung zur Verminderung von Abtastfehlern. Eine Korrektur von Übersteuerung oder Sensornichtlinearität folgt daraus nicht.",
        ],
      },
      {
        title: "Filterung, Dämpfung oder Messgerät anhand der Ergebnisse auswählen",
        paragraphs: [
          "Stimmen Summenwerte und Massenreferenz überein und schwankt nur die Anzeige, wählen Sie eine passende Anzeigemittelung und erhalten Sie die notwendige Reaktionszeit für die Fehlererkennung. Weichen auch die Summen ab, prüfen Sie zuerst Messbereich, Blasen, Einbau und Verarbeitung. Stärkere Filterung stellt bereits verlorene Informationen nicht wieder her.",
          "Wiegen Sie nach dem Einbau eines Dämpfers erneut mit gleichem Messfenster und gleicher Förderaufgabe. Erfassen Sie dabei mittleren Durchfluss und Nachlauf. Eine glattere Anzeige bei unverändertem Summenfehler erfordert weitere Prüfung. Die Pulsationseinstellungen des zitierten KROHNE-Handbuchs gelten für das dort beschriebene Gerät.",
        ],
      },
      {
        title: "Die Messung nachvollziehbar dokumentieren",
        paragraphs: [
          "Speichern Sie vollständiges Pumpenmodell und Steuerungsstand, Medientemperatur und Dichte, Behälterfüllstand, Leitungsabmessungen, Gegendruck, Messgerätemodell, Messbereich und Filterung, Zeitstempel, Rohdaten und Massenwerte. Geben Sie Volumenabweichung und Unsicherheit je Fenster getrennt für stationären Betrieb und Start-Stopp-Vorgänge an.",
          "300 mL/min für DPL30 und 600 mL/min für DPL60 sind freie Durchflüsse. Als Kalibrierwerte im eingebauten System sind sie ungeeignet. Bewerten Sie die tatsächliche Last anhand des aufgefangenen Fördervolumens. Variieren Sie die Drehzahl nur bei einer ausdrücklich unterstützten Steuerungsausführung. Ein bürstenloser Motor allein belegt keine Einstellbarkeit.",
        ],
      },
    ],
    formula: {
      section: 1,
      expression: "Qavg = 60 Δm / (ρ T); Vmeter − Vcollected = ΔVstored",
      note: "Für Qavg in mL/min setzen Sie Δm in g, ρ in g/mL und T in s ein. Die Bilanz setzt dasselbe Messfenster, keine Abzweige, Leckagen oder Phasenwechsel und näherungsweise dieselbe Dichte zwischen Messgerät und Gefäß voraus. Stationär gilt ΔVstored≈0. In Start-Stopp-Prüfungen zählen auch Speicherung und Nachlauf.",
    },
    table: {
      section: 4,
      headers: ["Beobachtung", "Zuerst prüfen", "Nächster Schritt"],
      rows: [
        ["Anzeige schwankt, Summen stimmen überein", "Messfenster und Unsicherheit", "Anwendungsgerechte Mittelung einstellen"],
        ["Größere Abweichung bei kurzen Fenstern", "Speicherung, Zeitversatz und Nachlauf", "Vollständigen Start-Stopp-Zyklus wiederholen"],
        ["Dauerhaft zu hohe Summe", "Vorzeichen des Rückflusses, Spitzen und Dichte", "Einstellungen korrigieren und erneut validieren"],
        ["Fehler bei Blasen", "Vollständig gefüllte Leitung und Gasquelle", "Gasproblem vor der Messgerätebewertung lösen"],
        ["Dämpfung beruhigt die Anzeige", "Mittlerer Durchfluss und Betriebspunktänderung", "Gravimetrische Abweichung erneut vergleichen"],
      ],
    },
    diagram: "Messkette: Pulsierender Pumpendurchfluss passiert den Zähler und wird im selben Zeitfenster mit einer Massenmessung am Auffanggefäß verglichen. Berücksichtigen Sie gespeichertes Volumen. Die dargestellte Kurve dient der Erläuterung und stammt aus keinem Produkttest.",
    faq: [
      { question: "Ist der Durchflussmesser bei einer springenden Anzeige defekt?", answer: "Eine springende Anzeige kann tatsächliche Pulsation oder das Abtast- und Anzeigeverhalten widerspiegeln. Vergleichen Sie Summenwerte desselben Fensters mit einer unabhängigen Massenmessung." },
      { question: "Entspricht der Mittelwert aus zehn Messungen dem tatsächlichen mittleren Durchfluss?", answer: "Überprüfen Sie, wie oft neue Messwerte vorliegen, welche Phasen erfasst sind, wie groß die tatsächlichen Zeitabstände sind und wie schnell der Sensor reagiert. Mehrfaches Auslesen desselben Ausgangs liefert keine neuen Stichproben." },
      { question: "Beweist eine stabile Anzeige nach der Dämpfung eine höhere Genauigkeit?", answer: "Nein. Vergleichen Sie Summe, Masse, Betriebspunkt und Änderung des gespeicherten Volumens erneut im selben Zeitfenster." },
      { question: "Warum ist die Abweichung beim Anlaufen am größten?", answer: "Die Flüssigkeit kann zuerst Leitungen oder Dämpfer füllen. Dadurch unterscheiden sich Durchfluss am Zähler und die abgegebene Menge vorübergehend. Prüfen Sie auch Zeitversatz, Abzweige, Nachlauf und Dichte." },
    ],
    links: ["A/B-Prüfung eines Pulsationsdämpfers", "Allgemeiner Leitfaden zur Messung der Durchflusspulsation", "Leitungsdurchmesser und Betriebspunkt", "Miniatur-Membranpumpen"],
  },
};
