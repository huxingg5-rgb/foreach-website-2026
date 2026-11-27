import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";

const paragraph = (text: string): EngineeringArticleBlock => ({ type: "paragraph", text });
const subheading = (title: string): EngineeringArticleBlock => ({ type: "subheading", title });
const formula = (expression: string, note: string): EngineeringArticleBlock => ({ type: "formula", expression, note });
const calculator = "/resources/calculators/fluid-resistance/";
const figures = "/images/resources/technical-articles/fluid-resistance-guide/";

export const germanFluidResistanceArticle: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "Wozu dient eine Strömungswiderstandsberechnung? Flüssigkeitskreisläufe mit dem FOREACH-Rechner auslegen",
    seoTitle: "Strömungswiderstand und Druckverlust berechnen",
    seoDescription: "Rohrdurchmesser und Ventil-Cv vergleichen, Druckverlust und Durchfluss berechnen und den größten Widerstand mit FOREACH-Rechner, Pumpenkennlinie und Messdaten bestimmen.",
    coverImage: `${figures}comparison.de.svg`,
    coverAlt: "FOREACH-Beispielrechnung: Druckverlust vor und nach einer Änderung von Rohrinnendurchmesser und Ventil-Cv",
  },
  deck: "Die Pumpe liefert im freien Durchfluss die erforderliche Menge. Nach Einbau von Leitungen, Ventilen und Fittings gelangt dennoch zu wenig Flüssigkeit zum Verbraucher. Mit der Strömungswiderstandsberechnung können Sie die nötige Druckdifferenz beim Sollvolumenstrom ermitteln, den größten Druckverlust lokalisieren und die Auswirkungen einer Änderung von Rohrdurchmesser, Rohrlänge, Bauteil-Cv oder Viskosität vergleichen. Ein nachrechenbares Beispiel zeigt, wie Sie die Ergebnisse des FOREACH-Rechners für Auslegung, Produktauswahl, Fehlersuche und Prototypprüfung einsetzen.",
  leadBlocks: [
    paragraph("In den Flüssigkeitskreisläufen von Analysengeräten, IVD-Systemen und der Laborautomation muss die Pumpe die Wandreibung in Leitungen, örtliche Widerstände in Ventilen und Fittings sowie weitere Druckbedingungen des Systems überwinden. Bei zu geringem Durchfluss kann eine größere Pumpe den Stromverbrauch und den Abstimmungsaufwand erhöhen, ohne einen engen Leitungsabschnitt oder ein Drosselelement als Ursache zu beseitigen."),
    paragraph("Im FOREACH-Rechner können Sie Zeilen vom Typ ID für Leitungsinnendurchmesser und -länge und Zeilen vom Typ Cv für Bauteile mit Durchflusskoeffizient anlegen. Er berechnet den Druckverlust bei bekanntem Durchfluss und den Durchfluss bei bekanntem Druckverlust. Außerdem bietet er eine Verlustübersicht, P-Q-Kennlinien für den Flüssigkeitskreislauf und einen Excel-Export. Damit können Sie den Druckbedarf eines Entwurfs vorab abschätzen und nach Versuchen mit bekannten Parametern erneut berechnen."),
    paragraph("Legen Sie vor der Berechnung den betrachteten Strömungsweg und die Betriebsbedingungen fest. Das Beispiel betrachtet einen stationären, einphasigen Flüssigkeitsstrom in einem durchgehend in Reihe geschalteten Pfad. Die Ergebnisse sind Modellschätzungen. Prüfen Sie die Leistung von Pumpe, Ventilen und Gesamtgerät zusätzlich mit dem tatsächlichen Medium."),
    { type: "links", items: [{ href: calculator, label: "FOREACH-Rechner öffnen und das Beispiel nachrechnen" }] },
  ],
  sections: [
    {
      title: "1. Was beschreibt die Strömungswiderstandsberechnung?",
      blocks: [
        paragraph("Der Volumenstrom bezeichnet das Flüssigkeitsvolumen pro Zeiteinheit. Der Druckverlust ist die Druckdifferenz vor und nach einem durchströmten Leitungsabschnitt oder Bauteil. Bei gegebenem Medium und Strömungsweg erfordert ein bestimmter Volumenstrom eine entsprechende Druckdifferenz. Die Strömungswiderstandsberechnung stellt diesen Zusammenhang dar und hilft, den erforderlichen Antriebsdruck bei der Auslegung zu bestimmen."),
        subheading("Rohrreibung und örtliche Verluste unterscheiden"),
        paragraph("Reibungsverluste entstehen vor allem an der Rohrwand. Sie hängen von Innendurchmesser, Länge, Strömungsgeschwindigkeit und Stoffeigenschaften ab. Örtliche Verluste entstehen beispielsweise an Einlässen, Umlenkungen, Querschnittsverengungen und Ventilen. Fittings mit gleichen Außenmaßen können sich in Strömungskanal und Widerstand unterscheiden. Auch Schläuche mit gleichem Außendurchmesser können unterschiedliche wirksame Innendurchmesser haben."),
        formula("Δp_path = ΣΔp_friction + ΣΔp_local", "Die Gleichung summiert die Widerstandsverluste entlang desselben definierten Strömungswegs. Bei parallelen Zweigen entspricht die Summe aller Zweigverluste nicht der erforderlichen Druckdifferenz zwischen ihren gemeinsamen Knoten."),
        paragraph("In Leitungen mit kleinem Innendurchmesser kann eine geringe Durchmesseränderung den Druckverlust erheblich verändern. Eine längere Leitung erhöht in der Regel den Reibungsverlust. Mehr Volumenstrom erhöht die Strömungsgeschwindigkeit. Der Verlauf von Druck und Durchfluss hängt auch vom Strömungsregime ab. Eine quadratische Näherung gilt daher nur unter bestimmten Bedingungen."),
        {
          type: "figure", src: `${figures}path.de.svg`, width: 1400, height: 620,
          alt: "Berechnungsschema für Pumpe, Leitung, Cv-Bauteil, Auslass und getrennt zu prüfende Druckgrenzen",
          caption: "Legen Sie zuerst den zu berechnenden Reihenpfad fest. Geben Sie dann Leitungen und Bauteile abschnittsweise ein. Der Rechner summiert die Verluste der erfassten Abschnitte. Druck im Vorratsbehälter, Höhenunterschied und Druck am Verbraucher gehen zusätzlich in die vollständige Druckbilanz ein.",
        },
      ],
    },
    {
      title: "2. Welche Fragen beantwortet die Berechnung zuerst?",
      blocks: [
        {
          type: "table",
          headers: ["Technische Frage", "Berechnungsergebnis", "Entscheidung"],
          rows: [
            ["Welcher Druck ist für den Sollvolumenstrom erforderlich?", "Gesamtdruckverlust und Verluste je Bauteil bei vorgegebenem Durchfluss", "Druckbilanz erstellen und Betriebsbedingungen möglicher Pumpen bewerten"],
            ["Wie viel Flüssigkeit fließt ungefähr bei der verfügbaren Druckdifferenz?", "Geschätzter Volumenstrom nach dem eingegebenen Verlustmodell", "Prüfen, ob die bestehende Leitung die Zykluszeit voraussichtlich einhält"],
            ["Wo entsteht der größte Widerstand?", "Druckverlust, Reibungs- und Einzelverluste sowie Anteil je Zeile", "Vorrangig anzupassende Leitungsabschnitte und Bauteile ermitteln"],
            ["Wirkt ein größerer Rohrdurchmesser oder ein anderes Ventil stärker?", "Vergleich mehrerer Eingabevarianten", "Nutzen der Änderungen vergleichen und unnötigen Teiletausch vermeiden"],
            ["Was ändert sich bei höherer Viskosität?", "Druckverlust und Strömungsregime bei unterschiedlichen Dichten und Viskositäten", "Unterschiede zwischen Versuchen mit gereinigtem Wasser und dem tatsächlichen Medium erkennen"],
            ["Wie ändert sich der Druckbedarf bei höherer Prozessgeschwindigkeit?", "P-Q-Kennlinie, Berechnungspunkte und Kurvenanpassung des Flüssigkeitskreislaufs", "Widerstand bei unterschiedlichen Durchflüssen auswerten und den Prüfbereich festlegen"],
          ],
        },
        paragraph("In der Konzeptphase können Sie Leitungen und Bauteilkombinationen vergleichen. Am Prototyp hilft die Berechnung, Abweichungen zwischen gemessenem und erwartetem Durchfluss zu erklären. Bei Überarbeitungen zeigt sie die Folgen eines geänderten Leitungsinnendurchmessers, einer anderen Länge, eines anderen Ventils oder Mediums. Bei der endgültigen Lösung zählen außerdem Einbau, Werkstoffverträglichkeit, Restvolumen, Kosten und Wartung."),
      ],
    },
    {
      title: "3. Eingabedaten für den Flüssigkeitskreislauf zusammenstellen",
      blocks: [
        paragraph("Teilen Sie den Strömungsweg dort in Leitungsabschnitte, wo sich Parameter ändern, und dokumentieren Sie wirksamen Innendurchmesser, Länge und Bauteile. Erfassen Sie zwei Abschnitte mit unterschiedlichen Innendurchmessern getrennt. Gesamtlänge und mittlerer Innendurchmesser können den hohen Widerstandsanteil einer lokalen Engstelle verdecken. Berücksichtigen Sie bei der Bestimmung des Innendurchmessers Toleranzen, druckbedingte Schlauchverformung und Einengungen durch Montage."),
        {
          type: "table",
          headers: ["Eingabe", "Datenquelle", "Bei der Eingabe beachten"],
          rows: [
            ["Dichte, Viskosität und Temperatur", "Medienangaben, gemessene Stoffwerte oder Referenzwerte für die Betriebsbedingungen", "Eine ähnlich benannte Medienvorgabe bildet die tatsächliche Rezeptur möglicherweise nur näherungsweise ab."],
            ["Leitungsinnendurchmesser und Leitungslänge", "Zeichnungen, Spezifikationen und gemessene Einbaumaße", "Verwenden Sie den Innendurchmesser. Geben Sie die Leitungslänge im Rechner in mm ein."],
            ["Cv des Bauteils", "Produktdaten für Modell, Ventilstellung und Prüfbedingungen", "Anschlussgröße, Kv und maximaler Durchfluss sind keine direkten Cv-Eingabewerte."],
            ["Örtlicher Widerstandsbeiwert ξ", "Daten zur realen Geometrie und zum zutreffenden Strömungsregime", "Ist der Verlust eines Bauteils bereits durch Cv erfasst, addieren Sie ihn nicht erneut."],
            ["Sollvolumenstrom oder verfügbare Druckdifferenz", "Funktionsanforderungen des Geräts oder definierte Druckgrenzen", "Der maximale Pumpendruck steht nur anteilig zur Überwindung der Leitungsverluste zur Verfügung."],
          ],
        },
        paragraph("Der Rechner verarbeitet dynamische oder kinematische Viskosität. Prüfen Sie die Einheit vor der Eingabe: 1 mPa·s = 0.001 Pa·s und 1 cSt = 10⁻⁶ m²/s. Es gilt μ = ρν. Dabei ist μ die dynamische Viskosität, ρ die Dichte und ν die kinematische Viskosität. Unverändert übernommene Tabellenwerte können bei abweichender Eingabeeinheit Fehler um Größenordnungen verursachen."),
        paragraph("Das Werkzeug berechnet die Stoffwerte für Wasser aus der eingegebenen Temperatur. Einige andere Medienvorgaben enthalten nur feste Stoffwerte. Für ein Reagenz mit bekannter Temperatur, Konzentration oder Zusammensetzung verwenden Sie passende Werte für Dichte und Viskosität als benutzerdefinierte Eingaben. Der Name einer Medienvorgabe allein bestimmt die tatsächlichen Stoffeigenschaften nicht."),
      ],
    },
    {
      title: "4. Was liefern die beiden Berechnungsarten?",
      blocks: [
        subheading("Bekannter Durchfluss: Druckverlust des Strömungswegs berechnen"),
        paragraph("Rechnen Sie ein festgelegtes Reinigungsvolumen, eine Förderzeit oder ein Zyklusziel zunächst in einen Arbeitsvolumenstrom um. Sollen beispielsweise 30 mL in 30 s effektiver Förderzeit abgegeben werden, beträgt der mittlere Sollvolumenstrom 60 mL/min. Mit diesem Wert berechnen Sie abschnittsweise den Druckverlust der aktuellen Kombination aus Leitungen und Bauteilen."),
        paragraph("In einem stationären Reihenpfad ohne Verzweigung oder Leckage ist der Volumenstrom in allen Abschnitten gleich. Im Modus für bekannten Durchfluss können Sie jeder Zeile einen eigenen Wert zuweisen. Bei der Berechnung gilt jeweils der Zeilenwert. Prüfen Sie daher die einzelnen Zeilen, statt nur das Eingabefeld oberhalb der Tabelle zu ändern. Ob das Summieren von Druckverlusten bei unterschiedlichen Durchflüssen sinnvoll ist, hängt von der tatsächlichen Verschaltung ab."),
        subheading("Bekannter Druckverlust: Durchfluss zur verfügbaren Druckdifferenz abschätzen"),
        paragraph("Ist die für den betrachteten Strömungsweg verfügbare Druckdifferenz bekannt, sucht die Rückrechnung nach dem Volumenstrom, für den der berechnete Verlust dem vorgegebenen Wert entspricht. Die Rückrechnung verwendet einen gemeinsamen Durchfluss für alle Zeilen und eignet sich für definierte Reihenpfade. Die Verteilung auf parallele Zweige ist gesondert zu bestimmen."),
        formula("Δp_available,loss = Δp_drive − Δp_boundary − ρgΔz", "In einer vereinfachten Druckbilanz für stationäre, inkompressible Strömung gehen auch die Druckdifferenz zwischen den Endpunkten und der Höhenunterschied ein. Berücksichtigen Sie relevante Unterschiede der Geschwindigkeitshöhe separat. Geben Sie für die Rückrechnung die Druckdifferenz ein, die für die erfassten Verluste verfügbar ist. Ziehen Sie die übrigen Bilanzterme zuvor vom Antriebsdruck ab."),
        paragraph("Bei einer Membranpumpe ändert sich die Förderleistung mit dem Durchfluss und den Einlass- und Auslassbedingungen. Die Rückrechnung zeigt, bei welchem Durchfluss die eingegebene Druckdifferenz mit dem Widerstandsmodell übereinstimmt. Prüfen Sie zusätzlich die Pumpenkennlinie, die Ansaugbedingungen und bei Bedarf den tatsächlichen Betriebspunkt durch Messung."),
      ],
    },
    {
      title: "5. Rechenbeispiel: Rohrdurchmesser erhöhen oder Ventil austauschen?",
      blocks: [
        paragraph("Die FOREACH-Berechnung verwendet hier Wasser bei 20 °C, 60 mL/min Sollvolumenstrom und ein gerades Rohr von 1 m in Reihe mit einem Cv-Bauteil. Der zusätzliche Widerstandsbeiwert des Rohrs beträgt null. Für das Cv-Bauteil wird ein Drosselblendenmodell mit einer scharfkantigen dünnen Blende verwendet. Behälter- und Auslassdruck, Höhendifferenz und weitere Bauteile sind in der Tabelle nicht enthalten."),
        paragraph("Legen Sie zwei Zeilen an. Geben Sie in Zeile eins für den Typ ID 60 mL/min, 1 mm Innendurchmesser, 1000 mm Länge und ξ = 0 ein. Wählen Sie für Zeile zwei den Typ Cv, 60 mL/min und Cv = 0.02. Berechnen Sie zuerst die Ausgangsvariante. Ändern Sie danach jeweils nur den Innendurchmesser oder Cv und halten Sie die übrigen Bedingungen konstant."),
        {
          type: "table",
          headers: ["Variante", "Druckverlust im geraden Rohr", "Druckverlust am Cv-Bauteil", "Gesamtdruckverlust"],
          rows: [
            ["A: Innendurchmesser 1 mm, Cv = 0.02", "40.80 kPa", "4.41 kPa", "45.21 kPa"],
            ["B: Innendurchmesser 2 mm, Cv = 0.02", "2.55 kPa", "4.41 kPa", "6.96 kPa"],
            ["C: Innendurchmesser 1 mm, Cv = 0.04", "40.80 kPa", "1.11 kPa", "41.92 kPa"],
          ],
        },
        {
          type: "figure", src: `${figures}comparison.de.svg`, width: 1400, height: 740,
          alt: "Gestapelte Druckverluste von Rohr und Cv-Bauteil für A, B und C. In der Ausgangsvariante überwiegt die Rohrreibung.",
          caption: "Die Ergebnisse stammen aus einer Modellrechnung. In der Ausgangsvariante entfallen rund 90 % des Verlusts auf das gerade Rohr. Bei größerem Rohrdurchmesser überwiegt der Widerstand am Cv-Bauteil. Durch Rundung kann die Summe geringfügig von den angezeigten Einzelwerten abweichen.",
        },
        paragraph("In der Ausgangsvariante entfallen rund 90 % des Gesamtverlusts auf das gerade Rohr. Ein höheres Ventil-Cv senkt den Verlust am Ventil. Das gerade Rohr verursacht weiterhin rund 40.80 kPa. Ein größerer Rohrdurchmesser reduziert den Gesamtverlust auf rund 6.96 kPa. Diese Ergebnisse sprechen dafür, zuerst die Rohrabmessungen zu prüfen. Bauteilname und äußere Form reichen zur Bestimmung der Engstelle nicht aus."),
        subheading("Warum wirkt sich der Rohrdurchmesser so stark aus?"),
        formula("Δp = 128μLQ / (πd⁴)", "Die Beziehung gilt bei voll ausgebildeter laminarer Strömung einer newtonschen Flüssigkeit in einem starren geraden Rohr mit rundem Querschnitt. Verwenden Sie SI-Einheiten. Die Reynolds-Zahlen für die beiden Durchmesser betragen im Beispiel rund 1269 und 635. Das erklärt, warum das laminare Modell für die Reibungsverluste geeignet ist."),
        paragraph("Bei gleichem Durchfluss, gleicher Viskosität und gleicher Länge sinkt der Druckverlust im geraden Rohr bei laminarer Strömung auf etwa 1/16, wenn der Innendurchmesser von 1 mm auf 2 mm steigt. Zugleich erhöht sich das geometrische Rohrvolumen von etwa 0.785 mL auf 3.142 mL, also auf das 4-Fache. Wägen Sie den niedrigeren Druckverlust gegen Befüllung, notwendiges Volumen beim Medienwechsel und Verschleppung ab."),
        paragraph("Ob eine Vergrößerung des Rohrdurchmessers sinnvoll ist, hängt von der Verlustverteilung ab. In Variante B verursacht das Ventil bereits mehr Verlust als das gerade Rohr. Weitere Durchmessererhöhungen bringen deshalb weniger. Prüfen Sie nach jeder Änderung, welcher Widerstand nun überwiegt, und richten Sie den nächsten Schritt danach aus."),
      ],
    },
    {
      title: "6. Welche Werte sind in der Ergebnistabelle zuerst wichtig?",
      blocks: [
        paragraph("Betrachten Sie zuerst den Gesamtdruckverlust, danach den Verlust und seinen prozentualen Anteil je Zeile. Prüfen Sie anschließend anhand von Geschwindigkeit und Reynolds-Zahl, ob Betriebsbedingungen und Modellannahmen zusammenpassen. Die detaillierten Ergebnisfelder erläutern die Berechnung und haben unterschiedliche Aussagefunktionen."),
        {
          type: "table",
          headers: ["Ergebnis", "Technische Bedeutung", "Verwendung"],
          rows: [
            ["Gesamtdruckverlust ΔPt", "Summe der erfassten Widerstandsverluste", "In die vollständige Druckbilanz einsetzen und mit dem verfügbaren Antriebsdruck vergleichen"],
            ["Reibungsverlust ΔPy und örtlicher Verlust ΔPj", "Verlustanteile durch Wandreibung und durch örtliche Bauteile", "Zuerst Durchmesser und Länge oder Bauteile und Verengungen prüfen"],
            ["Strömungsgeschwindigkeit und Reynolds-Zahl Re", "Strömungszustand bei gegebenen Stoffwerten und wirksamem Querschnitt", "Strömungsregime und Modellannahmen prüfen und Übergangsbereiche oder ungewöhnliche Eingaben erkennen"],
            ["Größte Verlustquelle und ihr Anteil", "Zeile mit dem größten Verlust unter den gewählten Eingabebedingungen", "Verbesserungen priorisieren und nach einer Änderung erneut prüfen"],
            ["Gesamt-Cv oder äquivalenter Cv", "Widerstand durch einen Durchflusskoeffizienten unter bestimmten Bedingungen ausgedrückt", "Als Vergleichswert unter den verwendeten Durchflüssen, Medien und Korrekturannahmen heranziehen"],
          ],
        },
        paragraph("Bestimmen Sie den größten Widerstand anhand des Druckverlusts beim tatsächlich eingegebenen Durchfluss. Bei unterschiedlichen Zeilendurchflüssen muss der kleinste äquivalente Cv nicht zum größten Verlust führen. Ein Bauteil, das unter einer Bedingung dominiert, kann nach einer Änderung der Leitung oder des Arbeitsvolumenstroms weniger relevant sein."),
      ],
    },
    {
      title: "7. Wie zeigt die P-Q-Kennlinie die Auslegungsreserve?",
      blocks: [
        paragraph("Der Rechner erzeugt die P-Q-Kennlinie aus den Verlusten des eingegebenen Strömungswegs bei mehreren Durchflüssen. Die Hochachse zeigt den Druckverlust. Die Kennlinie beschreibt, welche Druckdifferenz der modellierte Strömungsweg bei einer Durchflussänderung benötigt. Eine Pumpenkennlinie wird separat betrachtet."),
        {
          type: "figure", src: `${figures}curve.de.svg`, width: 1400, height: 800,
          alt: "Berechnete Widerstandskennlinien der Varianten A und B mit markierten Punkten bei 60 mL/min",
          caption: "Bei gleichem Medium und gleichem Cv ergeben die beiden Rohrdurchmesser unterschiedliche Widerstandskennlinien. Die Markierungen zeigen die berechneten Punkte bei 60 mL/min. Eine Pumpenkennlinie und statische Druckgrenzen sind nicht enthalten.",
        },
        paragraph("Vergleichen Sie die Pumpenleistung für dasselbe Medium und die zutreffenden Betriebsbedingungen mit dem Systembedarf bei gleichem Druckbezug. Berücksichtigen Sie Druckgrenzen, Füllstandsunterschiede, Ansaugbedingungen, Betriebsbereich und Stabilität. Das Werkzeug importiert keine Pumpenkennlinien, berechnet keine Schnittpunkte zwischen Pumpen- und Systemkennlinie und empfiehlt keine konkreten Modelle."),
        paragraph("Wenn Sie den Durchfluss je Zeile vorgeben, skaliert die Kurvenberechnung alle Zeilendurchflüsse mit demselben Faktor. Die eingegebenen Verhältnisse bleiben erhalten. Das Werkzeug löst dabei kein paralleles Netz für jeden Druck neu. Benennen Sie bei unterschiedlichen Zeilendurchflüssen den Referenzdurchfluss auf der Horizontalachse und geben Sie das Verhältnis jeder Zeile dazu an."),
        paragraph("Die Kurvenanpassung beschreibt den Verlauf innerhalb des berechneten Bereichs. Vermeiden Sie eine weite Extrapolation über die Stützstellen hinaus. R², Residuen und weitere Gütemaße zeigen die Nähe der Kurve zu den Rechenpunkten. Auch bei kleinen Anpassungsfehlern müssen Stoffwerte, Bauteildaten und das Modell für das reale Gerät separat geprüft werden."),
      ],
    },
    {
      title: "8. Kleine Innendurchmesser, niedrige Reynolds-Zahlen und Cv-Daten",
      blocks: [
        paragraph("Bei kleinen Innendurchmessern und geringen Durchflüssen kann die Viskosität den Widerstand stark beeinflussen. Die Reynolds-Zahl Re = ρud/μ verknüpft Dichte, mittlere Geschwindigkeit, Innendurchmesser und dynamische Viskosität. Sie hilft bei der Einordnung des Strömungsregimes. Für die genauen Verluste komplexer Bauteile sind weitere Daten nötig."),
        paragraph("Der Rechner verwendet für Leitungen die Darcy-Weisbach-Gleichung und schätzt den Reibungsbeiwert nach Churchill. Da die Oberfläche keine Eingabe der Wandrauheit vorsieht, setzt das aktuelle Leitungsmodell eine glatte Wand voraus. Blenden- und Cv-Korrekturen sind Modellschätzungen. Gemessene Druckverlustkennlinien sowie die vollständigen Korrekturverfahren einschlägiger Normen bleiben bei Bedarf erforderlich."),
        paragraph("Wählen Sie Cv-Daten für das konkrete Modell, die Ventilstellung, das Medium und die Kalibrierbedingungen. Ein aus Cv berechneter äquivalenter Blendendurchmesser ist eine Modellgröße. Die tatsächliche Mindestbohrung, der Partikeldurchlass, das Verstopfungsrisiko und Fertigungsmaße lassen sich daraus nicht unmittelbar ableiten."),
        paragraph("Auch die Stoffannahmen sind begrenzt. Vollblut und manche Polymerlösungen können nichtnewtonsch fließen. Eine feste Viskosität ist dann nur unter den jeweiligen Annahmen eine Näherung. Die Medienvorgabe für Luft bildet kompressible Strömung nur begrenzt ab. Bei großer Druckdifferenz, erheblicher Dichteänderung, kritischer Strömung oder Gas-Flüssigkeits-Gemischen benötigen Sie geeignetere Modelle oder Messungen."),
        { type: "links", items: [{ href: "/resources/technical-articles/cv-kv-correction-for-microfluidics/", label: "Cv- und Kv-Berechnung und Korrektur in Mikrofluidik und Präzisionsdrosselung" }] },
      ],
    },
    {
      title: "9. Von der Berechnung zur Messung: Abweichungen lokalisieren",
      blocks: [
        paragraph("Legen Sie zuerst dieselben Grenzen für Messung und Berechnung fest. Messen Sie an den beiden Knoten, zwischen denen Sie gerechnet haben. Liegen zwischen den Druckmessstellen zusätzliche Filter, Schnellkupplungen oder Leitungen, kann deren Verlust einen höheren Messwert erklären. Berücksichtigen Sie die hydrostatische Druckdifferenz bei unterschiedlich hohen Messstellen."),
        {
          type: "list", ordered: true,
          items: [
            "Referenz ermitteln. Prüfen Sie mit bekanntem Medium, bekannter Temperatur, kurzen Leitungen und bestätigten Bauteilparametern. Erfassen Sie Durchfluss und Druckdifferenz im stationären Betrieb.",
            "Einheiten und Geometrie kontrollieren. Prüfen Sie Innendurchmesser, Länge, Volumenstromeinheit, Cv/Kv, Dichte und Viskosität. Stellen Sie sicher, dass kein Verlust doppelt erfasst ist.",
            "Den tatsächlichen Flüssigkeitskreislauf schrittweise aufbauen. Vergleichen Sie nach jedem zusätzlichen Leitungsabschnitt oder Bauteil den Anstieg des Druckverlusts und bestimmen Sie, wo die Abweichung beginnt.",
            "Randbedingungen prüfen. Berücksichtigen Sie niedrigen Füllstand, Filterbeladung, Temperaturänderungen, verschiedene Ventilstellungen und Arbeitsvolumenströme.",
            "Rohdaten sichern. Dokumentieren Sie Versuchsaufbau, Messstellen, Messgeräte, Medien, Parameterstände und Auffälligkeiten zusätzlich zum Endmittelwert.",
          ],
        },
        paragraph("Momentanwerte von Durchfluss und Druck können bei einer Membranpumpe pulsieren. Geben Sie beim Vergleich mit den stationären Rechenwerten das Mittelungsfenster für Durchfluss und Druck an und erfassen Sie anwendungsrelevante Spitzenwerte. Ähnliche Mittelwerte können mit unterschiedlichen Drucktransienten, Düsenschwankungen oder Reinigungsergebnissen einhergehen."),
        paragraph("Bei fehlendem, unterbrochenem oder im Betrieb abnehmendem Durchfluss prüfen Sie außerdem Lufteintritt, Behälterbelüftung, Gasblasen, Ventilstellung, Verstopfungen und Stromversorgung. Die Strömungswiderstandsberechnung bewertet Widerstandsannahmen. Fehlererkennung, Werkstoffverträglichkeit, Selbstansaugung und Langzeitzuverlässigkeit sind gesondert zu prüfen."),
      ],
    },
    {
      title: "10. Rechenergebnisse für nachvollziehbare Variantenvergleiche exportieren",
      blocks: [
        paragraph("Nach der Berechnung können Sie Ergebnisse, statistische Übersicht und P-Q-Kurvendaten nach Excel exportieren. Verwenden Sie die Datei zur Ablage von Variantenständen, zum Vergleich von Bauteiländerungen und für die Abstimmung mit Lieferanten. Ergänzen Sie Eingabebedingungen, Flüssigkeitsschema und Versuchsdaten."),
        paragraph("Benennen Sie Leitungsabschnitte und Bauteile eindeutig, etwa „Reinigungsmittelbehälter bis Pumpeneinlass“ oder „1 mm Leitung hinter der Ventilgruppe“. Vermerken Sie Datenquelle und Besonderheiten. Dokumentieren Sie Medienrezeptur, Temperatur, Herkunft der Stoffdaten, Cv-Modell, Geometrieannahmen, Softwareversion und Rechendatum separat. Der Export allein enthält nicht den gesamten Projektkontext."),
        paragraph("Halten Sie bei einem A/B-Vergleich Medium, Sollvolumenstrom und alle nicht untersuchten Parameter konstant. Dokumentieren Sie jede Änderung. Wenn sich mehrere Bedingungen zugleich ändern, erklären Sie deren Beiträge einzeln, damit Wirkungen von geringerer Viskosität, größerem Rohrdurchmesser und geändertem Ventil-Cv nachvollziehbar bleiben."),
      ],
    },
    {
      title: "11. Mit den Ergebnissen Pumpen, Ventile und Leitungen von FOREACH auswählen",
      blocks: [
        paragraph("Nennen Sie bei der Auswahl einer FOREACH-Miniaturpumpe oder passender Ventile, Fittings und Leitungen den Sollvolumenstrom, die einzelnen Druckverluste, die Ansaugbedingungen und den Auslassdruck. Diese Angaben sind für die technische Abstimmung aussagekräftiger als der freie Durchfluss allein. Die Berechnung zeigt die Bedingungen zur Prüfung der möglichen Ausführungen und ob zuerst die Leitungen verbessert werden sollten."),
        paragraph("Überwiegt der Verlust in engen Rohrabschnitten, vergleichen Sie zuerst Innendurchmesser und Länge. Liegt er an Bauteilen, benötigen Sie Cv, Druckverlustkennlinie und Medienverträglichkeit für das konkrete Modell beziehungsweise die Ventilstellung. Wenn sich der Aufbau nicht ändern lässt und höherer Druck tatsächlich erforderlich ist, bewerten Sie die Pumpe anhand ihrer Kennlinie, der Druckfestigkeit der Anschlüsse und des Schutzes des Gesamtgeräts. Der Rechner kann die Eignung eines bestimmten Modells für die Geräteanforderungen nicht garantieren."),
        paragraph("Fügen Sie Ihrer Anfrage ein Flüssigkeitsschema, Eingabedaten, Rechenergebnisse und gemessene Durchfluss- und Druckwerte bei. FOREACH kann damit die Komponenten gemeinsam mit Ihnen auswählen und klären, welche Daten und Prüfbedingungen am Prototyp noch benötigt werden."),
        {
          type: "links", items: [
            { href: calculator, label: "Druckverlustrechner öffnen" },
            { href: "/resources/technical-articles/foreach-miniature-diaphragm-pump-oem-integration/", label: "FOREACH-Membranpumpen in OEM-Geräte integrieren: Betriebspunkte und Gerätevalidierung" },
            { href: "/products/", label: "FOREACH-Pumpen, Ventile und Flüssigkeitskomponenten ansehen" },
          ],
        },
      ],
    },
  ],
  faqTitle: "Häufig gestellte Fragen",
  faqItems: [
    {
      question: "Kann der Druckverlustrechner direkt eine Pumpe empfehlen?",
      answer: "Er berechnet den Widerstandsverlauf des eingegebenen Strömungswegs. Für die Pumpenauswahl kombinieren Sie das Ergebnis mit Pumpenkennlinie, Ansaugbedingungen, Auslassdruck, Füllstandsunterschied, Medium und Zykluszeit. Prüfen Sie die mögliche Ausführung danach im System.",
    },
    {
      question: "Entspricht der aus bekanntem Druckverlust berechnete Durchfluss dem tatsächlichen Durchfluss?",
      answer: "Der Wert ist eine Schätzung auf Basis der eingegebenen Stoffwerte und der Leitungs- und Bauteilmodelle. Am eingebauten Gerät beeinflussen der tatsächlich verfügbare Antriebsdruck, nicht berücksichtigte Verluste, Gasblasen, Verstopfungen und Pulsation das Ergebnis.",
    },
    {
      question: "Kann ich die Verluste aller parallelen Zweige addieren?",
      answer: "Die Summe der Verluste verschiedener paralleler Zweige entspricht nicht der Druckdifferenz zwischen den gemeinsamen Knoten. Das aktuelle Werkzeug löst die Durchflussverteilung im Parallelnetz nicht automatisch. Legen Sie zuerst Pfad, bekannten Durchfluss und Druckgrenzen fest und analysieren Sie mit der passenden Methode.",
    },
    {
      question: "Warum wirkt ein größerer Rohrdurchmesser manchmal stärker als ein höheres Ventil-Cv?",
      answer: "Es kommt auf die ursprüngliche Verlustverteilung an. Entsteht der größte Druckverlust in einem langen engen Rohrabschnitt, senkt ein höheres Ventil-Cv nur den kleineren Teil. Im Beispiel verursacht das gerade Rohr rund 90 % des Gesamtverlusts. Ein größerer Durchmesser wirkt daher stärker, erhöht aber auch das Flüssigkeitsvolumen in der Leitung.",
    },
    {
      question: "Belegt eine sehr gute Kurvenanpassung eine hohe Rechengenauigkeit?",
      answer: "Sie zeigt, dass die angepasste Kurve nahe an den Rechenpunkten liegt. Sie prüft weder Stoffwerte noch Geometrieannahmen oder Bauteildaten am realen Gerät. Bestätigen Sie die Genauigkeit durch geeignete Druck- und Durchflussmessungen.",
    },
    {
      question: "Kann der Rechner anhand des eingegebenen Mediums die Werkstoffverträglichkeit der Pumpe bestimmen?",
      answer: "Nein. Der Rechner schätzt die Verluste aus den Stoffwerten. Die chemische Verträglichkeit von Pumpenkopf, Membran, Ventilen, Dichtungen und Leitungen sowie die Eignung für den Anwendungsprozess sind separat zu bestätigen.",
    },
  ],
  cta: {
    title: "Komponenten anhand Ihres Flüssigkeitsschemas und der Berechnung besprechen",
    description: "Nennen Sie uns Medium, Temperatur, Sollvolumenstrom, Leitungsabmessungen, Bauteilparameter und Ein- und Auslassdruck. Mit Ihren Rechen- oder Messwerten kann FOREACH gemeinsam mit Ihnen die Kriterien für Produktauswahl und Prüfung bestimmen.",
    contactLabel: "Daten zum Flüssigkeitskreislauf übermitteln",
    productsLabel: "Druckverlustrechner verwenden",
    productsHref: calculator,
  },
};
