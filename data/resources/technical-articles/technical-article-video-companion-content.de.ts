import type { PistonPumpArticleCopy, PistonPumpArticlePart } from "./piston-pump-articles.types";

const paragraph = (text: string): PistonPumpArticlePart => ({ type: "paragraph", text });
const notice = (label: string, text: string): PistonPumpArticlePart => ({ type: "notice", label, text });
const pistonPumpProductsHref = "/products/pumps/piston-pump/";
const pistonPumpActions = { contactLabel: "Technische Beratung anfragen", productsLabel: "Kolbenpumpen ansehen" };

export const germanPistonTutorialArticles: Record<string, PistonPumpArticleCopy> = {
  "piston-pump-head-material-selection": {
    slug: "piston-pump-head-material-selection",
    title: "Werkstoffe für Kolbenpumpenköpfe auswählen",
    summary: "Vergleichen Sie PMMA, PCTG, PPS, PVDF, PP, PTFE, PEEK, POM und PSU als Pumpenkopfwerkstoffe und prüfen Sie den vollständigen medienberührten Flüssigkeitsweg.",
    seoTitle: "Werkstoffe für Kolbenpumpenköpfe: PMMA, PEEK und weitere Optionen | FOREACH",
    seoDescription: "Vergleichen Sie PMMA, PCTG, PPS, PVDF, PP, PTFE, PEEK, POM und PSU für Kolbenpumpenköpfe. Prüfen Sie die Eignung im vollständigen medienberührten Flüssigkeitsweg.",
    date: "2026-09-06",
    coverImage: "/images/resources/technical-articles/piston-pump/piston-pump-head-material-selection-cover.webp",
    coverAlt: "FOREACH Kolbenpumpen EA, SM und TM zur Auswahl des Pumpenkopfwerkstoffs",
    intro: [
      paragraph("Im Pumpenkopf finden Ansaugen, Dosieren und Abgeben statt. Sein Werkstoff beeinflusst die Medienverträglichkeit, die mechanische Stabilität, das Abdichten, die Reinigung, die Lebensdauer und die Projektkosten. Berücksichtigen Sie deshalb das tatsächliche Medium, Temperatur, Druck, Kontaktzeit und sämtliche medienberührten Bauteile."),
      paragraph("Für Kolbenpumpenköpfe kann FOREACH PCTG-Copolyester, Acrylglas (PMMA), Polyphenylensulfid (PPS), Polyvinylidenfluorid (PVDF), Polypropylen (PP), Polytetrafluorethylen (PTFE), Polyetheretherketon (PEEK), Polyoxymethylen (POM), Polysulfon (PSU) und weitere technische Werkstoffe prüfen. Welche Kombination verfügbar ist, hängt von Medium, Kopfgeometrie, Fertigbarkeit, Einbauraum und Projektanforderungen ab. Die Auswahlmöglichkeiten gehen über die lagernden Standardmodelle hinaus."),
      notice("Auswahlgrundsatz: ", "Ermitteln Sie zuerst Medium und Betriebsbedingungen. Prüfen Sie Pumpenkopf, Kolben, Dichtungen, Ventile, Leitungen und Fittings als vollständigen medienberührten Flüssigkeitsweg."),
    ],
    sections: [
      {
        title: "Warum Kolbenpumpen unterschiedliche Pumpenkopfwerkstoffe benötigen",
        parts: [
          paragraph("Kolbenpumpen fördern beispielsweise Puffer, Spüllösungen, Kalibratoren, biochemische Reagenzien oder Rezepturen mit organischen Bestandteilen. Quellung, Spannungsrisse, Permeation, extrahierbare Stoffe und Adsorption hängen vom Medium ab. Temperatur, Druck und lange Kontaktzeiten können das Ergebnis verändern."),
          paragraph("Der Pumpenkopf nimmt auch mechanische Belastungen aus Gewindeanschlüssen, Dichtungsvorspannung und Druckwechseln auf. Die Werkstoffwahl berücksichtigt deshalb Chemie, Mechanik, Fertigung und Kosten. Eine günstige Einstufung in einer Beständigkeitstabelle allein belegt keine Eignung für eine konkrete Pumpenkopfgeometrie."),
        ],
      },
      {
        title: "Gängige Werkstoffe für Kolbenpumpenköpfe im Vergleich",
        parts: [
          {
            type: "table",
            headers: ["Werkstoff", "Typischer Einsatz für die Vorauswahl", "Zu prüfende Merkmale"],
            rows: [
              ["Acrylglas (PMMA)", "Übliche Medien und Betriebsbedingungen bei begrenzten Kosten", "Organische Lösungsmittel, Spannungsrisse, Temperatur und lange Kontaktzeiten"],
              ["PCTG-Copolyester", "Allgemeine Flüssigkeitswege mit Anforderungen an Zähigkeit und Fertigbarkeit", "Tatsächliche Rezeptur, Reinigungsmittel und Maßhaltigkeit"],
              ["Polyphenylensulfid (PPS)", "Höhere Anforderungen an Temperaturbeständigkeit, Steifigkeit oder Maßhaltigkeit", "Medienverträglichkeit, Bearbeitung, Dichtflächen und Kosten"],
              ["Polyvinylidenfluorid (PVDF)", "Ausgewählte Säuren, Laugen und Salzlösungen", "Konzentration, Temperatur, Druck und Kombination mit der Dichtung"],
              ["Polypropylen (PP)", "Ausgewählte wässrige, saure, alkalische oder andere chemische Medien", "Steifigkeit, Temperatur, Gewindebelastung, Vorspannung und Dauerlast"],
              ["Polytetrafluorethylen (PTFE)", "Anwendungen mit breit geforderter chemischer Beständigkeit", "Kriechen, Steifigkeit, Maßhaltigkeit und realisierbare Geometrie"],
              ["Polyetheretherketon (PEEK)", "Höhere thermische, mechanische und chemische Anforderungen", "Konkretes Medium, Bearbeitung, sämtliche medienberührten Teile und Projektkosten"],
              ["Polyoxymethylen (POM)", "Bauteile mit Anforderungen an Mechanik und wirtschaftliche Bearbeitung", "Säuren, Laugen, Oxidationsmittel, Temperatur und lange Einwirkdauer"],
              ["Polysulfon (PSU)", "Gerätefluidik mit Anforderungen an Steifigkeit und Wärmebeständigkeit", "Konkrete Chemikalien, Spannungen, Reinigungsverfahren und Werkstoffsorte"],
            ],
          },
          paragraph("Die Angaben dienen der Vorauswahl. Werkstoffsorte, Bearbeitungsspannungen und Einbauzustand können bei demselben Polymer zu unterschiedlichen Ergebnissen führen."),
        ],
      },
      {
        title: "Auswahlhinweise zu den einzelnen Werkstoffen",
        parts: [{
          type: "subsections",
          items: [
            { title: "Pumpenköpfe aus Acrylglas (PMMA)", paragraphs: ["Polymethylmethacrylat (PMMA), auch Acrylglas genannt, ist häufig eine wirtschaftliche Ausgangsoption für übliche Medien bei moderaten Temperaturen und Drücken und ohne besondere Beständigkeitsanforderungen. Prüfen Sie bei Rezepturen mit Lösungsmitteln, Ketonen oder Estern die Zusammensetzung und testen Sie repräsentative Bauteile."] },
            { title: "Pumpenköpfe aus PCTG-Copolyester", paragraphs: ["PCTG kann Zähigkeit und Bearbeitbarkeit mit den Anforderungen allgemeiner Fluidikanwendungen verbinden. Prüfen Sie Rezeptur, Reinigungsmedium, Temperatur und Maßänderungen nach längerer Einwirkung."] },
            { title: "Pumpenköpfe aus Polypropylen (PP)", paragraphs: ["PP kommt für ausgewählte wässrige, saure, alkalische und andere chemische Medien infrage. Für den Pumpenkopf sind außerdem ausreichende Steifigkeit, Gewindebelastbarkeit, Dichtungsvorspannung und Stabilität bei Druckwechseln zu prüfen."] },
            { title: "Pumpenköpfe aus Polyoxymethylen (POM)", paragraphs: ["POM, auch Acetal genannt, eignet sich für mechanisch stabile und gut bearbeitbare Bauteile. Säuren, Laugen, oxidierende Medien und lange Einwirkzeiten erfordern Versuche mit der gewählten Werkstoffsorte unter den konkreten Einsatzbedingungen."] },
            { title: "Pumpenköpfe aus Polyphenylensulfid (PPS)", paragraphs: ["PPS ist eine Option bei Anforderungen an Temperaturbeständigkeit, Steifigkeit und Maßhaltigkeit. Prüfen Sie Medium, Reinigung, mechanische Belastung, Dichtfläche und Werkstoffsorte gemeinsam."] },
            { title: "Pumpenköpfe aus Polyvinylidenfluorid (PVDF)", paragraphs: ["PVDF kann für ausgewählte Säuren, Laugen und Salzlösungen geeignet sein. Die Eignung hängt von Stoff, Konzentration, Temperatur, Druck, Kontaktzeit, Dichtungen und Ventilen ab."] },
            { title: "Pumpenköpfe aus Polytetrafluorethylen (PTFE)", paragraphs: ["PTFE ist gegen viele Chemikalien beständig. Für den Pumpenkopf sind zusätzlich Steifigkeit, Kriechverhalten, Gewinde, Dichtungen und Fertigbarkeit zu prüfen."] },
            { title: "Pumpenköpfe aus Polyetheretherketon (PEEK)", paragraphs: ["PEEK ist eine Option bei hohen Anforderungen an Temperaturbeständigkeit, Mechanik, Maßhaltigkeit und Medienverträglichkeit. Prüfen Sie Rezeptur, Temperatur, Druck, Reinigung und den gesamten Flüssigkeitsweg. Berücksichtigen Sie Bearbeitung und Kosten."] },
            { title: "Pumpenköpfe aus Polysulfon (PSU)", paragraphs: ["PSU kommt in der Gerätefluidik bei Anforderungen an Steifigkeit, Temperaturbeständigkeit und Maßhaltigkeit infrage. Prüfen Sie Chemikalien, Spannungen, Reinigungsverfahren, Werkstoffsorte und lange Einwirkzeiten."] },
          ],
        }],
      },
      {
        title: "EA-500-PMMA und EA-500-PEEK bei gleichem Nennvolumen",
        parts: [
          paragraph("Die FOREACH Modelle EA-500-PMMA und EA-500-PEEK zeigen zwei Pumpenkopfwerkstoffe bei demselben Nennvolumen von 500 μL. Die gezeigten Ausführungen haben Anschlüsse mit 1/4-28 UNF oder M6 und 2000 Schritte je Vollhub. Unter den spezifizierten Prüfbedingungen betragen Genauigkeit und Wiederholbarkeit bei Vollhub jeweils ≤0,5 %."),
          {
            type: "table",
            headers: ["Merkmal", "EA-500-PMMA", "EA-500-PEEK"],
            rows: [
              ["Nennvolumen", "500 μL", "500 μL"],
              ["Gezeigter Kopfwerkstoff", "Acrylglas (PMMA)", "PEEK"],
              ["Gezeigter Kolben", "Keramikkolben", "Gewählte Ausführung bestätigen lassen"],
              ["Flüssigkeitsanschlüsse", "1/4-28 UNF oder M6", "1/4-28 UNF oder M6"],
              ["Schritte je Vollhub", "2000", "2000"],
              ["Leistung bei Vollhub", "Genauigkeit und Wiederholbarkeit ≤0,5 %", "Genauigkeit und Wiederholbarkeit ≤0,5 %"],
              ["Typische Auswahl", "Übliche Medien und begrenzte Projektkosten", "Höhere Werkstoffanforderungen"],
            ],
          },
          notice("Geltungsbereich der Angaben: ", "Die Werte gelten unter den angegebenen Prüfbedingungen. Ein geänderter Kopfwerkstoff verändert die Dosierleistung nicht zwangsläufig. Gezeigte Modelle belegen keine Lagerverfügbarkeit aller Werkstoff- und Volumenkombinationen."),
          { type: "links", items: [
            { prefix: "Aktuelle Ausführungen ansehen: ", label: "EA-500-PMMA", href: "/products/pumps/piston-pump/ea-500-pmma/", suffix: " und" },
            { label: "EA-500-PEEK", href: "/products/pumps/piston-pump/ea-500-peek/", suffix: "." },
          ] },
        ],
      },
      {
        title: "Kolben und vollständigen medienberührten Flüssigkeitsweg prüfen",
        parts: [
          paragraph("Der Pumpenkopf ist Teil des medienberührten Systems. FOREACH kann Kolben aus Zirkonoxidkeramik, Aluminiumoxidkeramik, PEEK und Saphir prüfen und Anschlüsse, Motoren, optische Rückmeldung, Ventile und Steuerung auf das Projekt abstimmen."),
          { type: "bullets", items: [
            "Pumpenkopf und innere Strömungskanäle",
            "Kolben und zugehöriger Dichtungsaufbau",
            "Ventilgehäuse, Funktionselement, Membran oder Rückschlagmechanismus",
            "Leitungen, Fittings, Filter, Sonden und Düsen",
            "Klebstoffe, Schmierstoffe und sonstige Hilfsstoffe mit möglichem Medienkontakt",
          ] },
          paragraph("Ein anderer Kopfwerkstoff allein behebt keine Quellung, Adsorption, extrahierbaren Stoffe, Undichtheiten, Verstopfungen oder Lebensdauerprobleme an anderen Stellen im Flüssigkeitsweg."),
        ],
      },
      {
        title: "Angaben für die Werkstoffauswahl",
        parts: [{ type: "steps", items: [
          { label: "Medium", text: "Name, Hauptbestandteile, Konzentration, pH-Wert, Lösungsmittel, Partikel oder Kristallisationsrisiko. Bei Bedarf Sicherheitsdatenblatt oder Rezepturbereich bereitstellen." },
          { label: "Temperatur und Kontaktzeit", text: "Betrieb, Reinigung, Desinfektion, Einweichen und Lagerung getrennt angeben. Festhalten, ob das Medium im Flüssigkeitsweg verbleibt." },
          { label: "Volumen und Arbeitszyklus", text: "Sollvolumen, typischer Hub, Zykluszeit, Ansaug- und Abgabegeschwindigkeit, Druck oder Gegendruck und erwartete Lebensdauer." },
          { label: "Flüssigkeitsweg und Einbau", text: "Anschlussnorm, Ventilanordnung, Leitungsabmessungen, Dichtungsbauform, Einbauraum und Montagelasten." },
          { label: "Projektrahmen", text: "Prototypenmenge, Produktionsplanung, regulatorische und Reinheitsanforderungen sowie Kostenrahmen." },
        ] }],
      },
      {
        title: "Werkstoffverträglichkeit validieren",
        parts: [{ type: "steps", items: [
          { label: "Unterlagen sichten", text: "Werkstoffdaten für Stoff, Konzentration und Temperatur prüfen, um ungeeignete Optionen auszuscheiden." },
          { label: "Repräsentative Probekörper einlegen", text: "Masse, Abmessungen, Aussehen, Härte, Risse, Quellung, extrahierbare Stoffe und Farbe über eine repräsentative Kontaktzeit kontrollieren." },
          { label: "Aufbau und Abdichtung prüfen", text: "Repräsentative Teile fertigen. Gewinde, Dichtflächen und Vorspannung sowie das Verhalten bei Druckwechseln prüfen." },
          { label: "Vollständiges System testen", text: "Reales oder repräsentatives Medium mit Zielvolumen, Temperatur, Ventilen, Leitungen, Gegendruck, Reinigungsverfahren und Zyklusrate einsetzen. Genauigkeit, Wiederholbarkeit, Dichtheit und Lebensdauer messen." },
        ] }],
      },
    ],
    faqTitle: "Häufig gestellte Fragen",
    faq: [
      { question: "Sind PMMA, PCTG und PEEK die einzigen FOREACH Pumpenkopfwerkstoffe?", answer: "Projektabhängig kommen PCTG-Copolyester, Acrylglas (PMMA), PPS, PVDF, PP, PTFE, PEEK, POM, PSU und weitere technische Werkstoffe infrage." },
      { question: "Ist jeder Werkstoff in jedem Nennvolumen als Standardmodell verfügbar?", answer: "Die Modelle auf der Website dienen der Vorauswahl. Stimmen Sie die konkrete Kombination aus Nennvolumen und Werkstoff anhand von Medium, Anschlüssen, Ventilen, Einbauraum und Projektmenge ab." },
      { question: "Welcher Kopfwerkstoff hat die beste Korrosionsbeständigkeit?", answer: "Die Eignung hängt von Zusammensetzung, Konzentration, Temperatur, Druck, Kontaktzeit, Reinigung und dem vollständigen medienberührten Flüssigkeitsweg ab." },
      { question: "Muss ein PEEK-Pumpenkopf auf Medienverträglichkeit geprüft werden?", answer: "Ja. Prüfen Sie Medium und Bedingungen anhand der Werkstoffdaten, Einlegeversuche, Maß- und Dichtheitsprüfungen sowie im Systembetrieb." },
      { question: "Kann ein PTFE-Pumpenkopf mit jeder Chemikalie eingesetzt werden?", answer: "Die erforderliche Steifigkeit, das Kriechverhalten, die Maßhaltigkeit, Gewinde, Dichtungen, Druckbelastung und Fertigbarkeit sind für den Pumpenkopf ebenfalls zu berücksichtigen." },
      { question: "Kann ein anderer Kopfwerkstoff das Dosierergebnis verändern?", answer: "Steifigkeit, Maßhaltigkeit, Oberflächenzustand und Zusammenspiel mit Dichtungen und Ventilen können die Systemleistung beeinflussen. Validieren Sie das System nach Änderungen an Werkstoff oder Geometrie erneut." },
    ],
    conclusion: {
      title: "Pumpenkopfwerkstoff anhand der Einsatzbedingungen wählen",
      parts: [
        paragraph("PMMA ist für übliche Medien häufig wirtschaftlich. PCTG, PP und POM decken unterschiedliche mechanische und fertigungstechnische Anforderungen ab. PPS, PVDF, PTFE, PEEK und PSU erweitern die Auswahl bei höheren thermischen, mechanischen oder chemischen Anforderungen. Der Polymername ist der Ausgangspunkt für die Vorauswahl."),
        paragraph("Stimmen Sie nach der Kopfwahl Kolben, Dichtungen, Ventile, Leitungen, Fittings, Anschlüsse und Steuerung ab und prüfen Sie das vollständige System bei den Zielvolumina."),
        { type: "links", items: [
          { prefix: "Zu den Grundlagen: ", label: "Was ist eine Präzisionskolbenpumpe?", href: "/resources/technical-articles/micro-plunger-pump-selection/", suffix: "." },
          { prefix: "Zu den Leistungskennwerten: ", label: "Genauigkeit, Wiederholbarkeit und Auflösung bei Kolbenpumpen", href: "/resources/technical-articles/piston-pump-accuracy-repeatability-resolution/", suffix: "." },
          { prefix: "Zum Produktsortiment: ", label: "FOREACH Kolbenpumpen-Konfigurationen", href: pistonPumpProductsHref, suffix: "." },
        ] },
      ],
    },
    cta: {
      title: "Benötigen Sie Unterstützung bei der Werkstoffwahl?",
      description: "Nennen Sie uns Zusammensetzung, Konzentration und Temperatur des Mediums, Sollvolumen, Druck, Reinigungsverfahren, Anschlüsse, Ventile, Arbeitszyklus und Einbauraum. So können wir alle medienberührten Bauteile gemeinsam prüfen.",
      ...pistonPumpActions,
    },
    subject: {
      about: ["Werkstoffe für Kolbenpumpenköpfe", "Verträglichkeit medienberührter Werkstoffe", "Werkstoffwahl für Kolbenpumpen"],
      mentions: ["PMMA", "PCTG", "PPS", "PVDF", "PP", "PTFE", "PEEK", "POM", "PSU", "EA-500-PMMA", "EA-500-PEEK"],
    },
  },
  "piston-pump-accuracy-repeatability-resolution": {
    slug: "piston-pump-accuracy-repeatability-resolution",
    title: "Genauigkeit, Wiederholbarkeit und Auflösung bei Kolbenpumpen",
    summary: "Erfahren Sie, warum das theoretische Volumen je Schritt kein verlässliches Mindestdosiervolumen angibt und wie Genauigkeit, Wiederholbarkeit, Ventile, Luftblasen und Arbeitshub das Dosierergebnis beeinflussen.",
    seoTitle: "Genauigkeit, Wiederholbarkeit und Auflösung bei Kolbenpumpen | FOREACH",
    seoDescription: "Was bedeuten Genauigkeit, Wiederholbarkeit und Auflösung bei Kolbenpumpen? Erfahren Sie, wie Sie kleine Dosiervolumina unter Betriebsbedingungen validieren.",
    date: "2026-09-06",
    coverImage: "/images/resources/technical-articles/piston-pump/piston-pump-accuracy-repeatability-resolution-cover.webp",
    coverAlt: "FOREACH Kolbenpumpenkopf mit angeschlossenen Flüssigkeitsleitungen",
    intro: [
      paragraph("Kolbenpumpenspezifikationen nennen häufig Nennvolumen, Schritte je Vollhub, Genauigkeit und Wiederholbarkeit zusammen. Die Angaben beschreiben verschiedene Merkmale der Dosierleistung."),
      paragraph("Eine höhere Schrittzahl allein verbessert die Dosiergenauigkeit nicht. Das theoretische Volumen je Schritt gibt kein verlässliches Mindestdosiervolumen an. Die tatsächlich abgegebene Menge hängt auch von Mechanik, Ventilen, Leitungen, Luftblasen, Flüssigkeitseigenschaften, Bewegungssteuerung und Messverfahren ab."),
    ],
    sections: [
      {
        title: "Was bedeutet Auflösung bei einer Kolbenpumpe?",
        parts: [
          paragraph("Die Auflösung beschreibt das kleinste theoretische Verdrängungsinkrement, das die Steuerung vorgibt. Bei einer Schrittmotorpumpe lässt sich das theoretische Volumen je Schritt aus Nennvolumen und Schrittzahl je Vollhub abschätzen."),
          { type: "formula", expression: "Theoretisches Volumen je Schritt = Nennvolumen ÷ Schritte je Vollhub", note: "Für die gezeigte EA-500-PMMA-Ausführung: 500 μL ÷ 2000 Schritte ≈ 0,25 μL je Schritt." },
          paragraph("0,25 μL ist ein geometrischer Sollwertschritt. Ob 0,25 μL mit einem bestimmten Medium und Flüssigkeitsweg zuverlässig dosiert werden können, muss geprüft werden. Aus der Auflösung lassen sich weder der tatsächliche Fehler noch das validierte Mindestdosiervolumen ablesen."),
        ],
      },
      {
        title: "Was bedeutet Genauigkeit bei einer Kolbenpumpe?",
        parts: [
          paragraph("Die Genauigkeit beschreibt die Nähe des abgegebenen Volumens zum Sollwert. Zur Einordnung sind der geprüfte Hub, das Zielvolumen, Medium und Temperatur, der vollständige Flüssigkeitsweg, das Messverfahren und die Definition der Kennzahl erforderlich."),
          { type: "bullets", items: [
            "Vollhub oder Teilhub",
            "Zieldosiervolumen",
            "Medium und Temperatur",
            "Im Versuch verwendete Ventile, Leitungen, Fittings und Auslass",
            "Gravimetrisches, fotometrisches oder anderes Messverfahren",
            "Mittlere systematische Abweichung, größter Einzelfehler oder andere Definition",
          ] },
        ],
      },
      {
        title: "Was bedeutet Wiederholbarkeit bei einer Kolbenpumpe?",
        parts: [
          paragraph("Die Wiederholbarkeit beschreibt die Streuung von Messergebnissen unter identischen Bedingungen. Sie lässt sich als Spannweite, Standardabweichung, relative Standardabweichung oder Variationskoeffizient angeben."),
          paragraph("Eine geringe Streuung garantiert keine hohe Genauigkeit. Wiederholte Ergebnisse um 96 μL bei einem Zielvolumen von 100 μL können eng beieinanderliegen und dennoch systematisch abweichen. Ein Mittelwert um 100 μL kann umgekehrt eine hohe Streuung verdecken."),
          { type: "table", headers: ["Messbefund", "Genauigkeit", "Wiederholbarkeit", "Technische Einordnung"], rows: [
            ["Mittelwert nahe am Soll, geringe Streuung", "Gut", "Gut", "Stabile quantitative Leistung"],
            ["Mittelwert weicht ab, geringe Streuung", "Gering", "Gut", "Kalibrieren oder systematische Abweichung korrigieren"],
            ["Mittelwert nahe am Soll, hohe Streuung", "Scheinbar gut", "Gering", "Die Zufallsstreuung ist zu hoch"],
            ["Mittelwert weicht ab, hohe Streuung", "Gering", "Gering", "Pumpe, Ventile, Flüssigkeitsweg, Medium und Steuerung prüfen"],
          ] },
        ],
      },
      {
        title: "Warum mehr Schritte die Dosiergenauigkeit nicht automatisch erhöhen",
        parts: [
          paragraph("Die Schrittzahl bestimmt die Feinheit der Ansteuerung. Die Flüssigkeit durchläuft das gesamte System, in dem konstante und zeitabhängige Einflüsse zu Abweichungen zwischen theoretischer Kolbenverdrängung und abgegebenem Volumen führen können."),
          { type: "subsections", items: [
            { title: "Mechanisches Umkehrspiel und Übertragungsfehler", paragraphs: ["Gewindespindel, Mutter, Kupplungen und bewegliche Teile können Spiel aufweisen. Beim Richtungswechsel wird ein Teil der vorgegebenen Bewegung zum Überwinden des Spiels verbraucht, bevor wirksame Flüssigkeitsverdrängung beginnt."] },
            { title: "Ventilreaktion und Schaltzeiten", paragraphs: ["Sind Kolbenbewegung und Ventilschaltung unzureichend abgestimmt, kann Flüssigkeit zurückströmen, Luft eingesaugt werden, Druck noch nicht ausgeglichen sein oder Flüssigkeit im System zurückbleiben."] },
            { title: "Luftblasen und elastische Leitungen", paragraphs: ["Kompressibles Gas und sich dehnende Schläuche können Verdrängungsvolumen zunächst aufnehmen und später wieder abgeben. Dadurch sind Unterdosierung, Verzögerung und Wechselwirkungen zwischen Zyklen möglich."] },
            { title: "Medium und Umgebung", paragraphs: ["Viskosität, Oberflächenspannung, Flüchtigkeit, gelöste Gase, Partikel, Kristallisation und Temperatur beeinflussen Ansaugen, Abgabe und Tropfenablösung."] },
            { title: "Bewegungsablauf und Dosierverfahren", paragraphs: ["Ansaug- und Abgabegeschwindigkeit, Beschleunigung, Beruhigungszeit, Befüllen und Entlüften, Sondenposition und Abgabe mit oder ohne Kontakt können stärker wirken als zusätzliche Mikroschritte."] },
          ] },
        ],
      },
      {
        title: "Warum sich Vollhubwerte nicht auf kleine Dosiervolumina übertragen lassen",
        parts: [
          paragraph("Umkehrspiel, Ventilschaltzeiten und Blasenkompression können gemessen am Vollhub gering sein, bei kurzen Hüben aber einen großen Anteil ausmachen. Genauigkeit und Wiederholbarkeit ändern sich daher möglicherweise mit dem Hubanteil."),
          { type: "table", headers: ["Prüfpunkt", "Volumen", "Genauigkeit", "Wiederholbarkeit"], rows: [
            ["100 % Hub", "500 μL", "≤0,5 %", "≤0,5 %"],
            ["2 % Hub", "10 μL", "≤2,0 %", "≤1,5 %"],
          ] },
          notice("Geltungsbereich der Angaben: ", "Die Werte für EA-500-PMMA gelten unter den spezifizierten Prüfbedingungen. Übertragen Sie das Vollhubergebnis nicht auf 10 μL. Aus dem theoretischen Schrittvolumen von 0,25 μL lässt sich kein verlässliches Mindestdosiervolumen ableiten."),
        ],
      },
      {
        title: "Genauigkeit und Wiederholbarkeit validieren",
        parts: [{ type: "steps", items: [
          { label: "Kritische Arbeitsvolumina festlegen", text: "Kleinstes, typisches und größtes Dosiervolumen dokumentieren und feststellen, welches für Assay, Mischungsverhältnis oder Ausbeute ausschlaggebend ist." },
          { label: "Akzeptanzkriterien definieren", text: "Mittlere systematische Abweichung, maximalen Fehler, Standardabweichung, Variationskoeffizient und branchenspezifische Anforderungen getrennt festlegen." },
          { label: "Tatsächlichen Flüssigkeitsweg aufbauen", text: "Nach Möglichkeit die in Serie vorgesehenen Ventile, Leitungen, Fittings, Filter, Sonden oder Düsen einsetzen." },
          { label: "Reales oder repräsentatives Medium einsetzen", text: "Viskosität, Oberflächenspannung, Flüchtigkeit und Partikel berücksichtigen. Temperatur, Gegendruck, Geschwindigkeit und Befüll- und Entlüftungszustand dokumentieren." },
          { label: "Geeignetes Messverfahren wählen", text: "Gravimetrisch Waagenauflösung, Dichte, Verdunstung und Umgebungseinflüsse kontrollieren. Bei sehr kleinen Volumina gegebenenfalls geeignete fotometrische Verfahren einsetzen." },
          { label: "Ergebnisse für jeden Betriebspunkt angeben", text: "Mittelwert, systematische Abweichung und Streuung für kleinstes, typisches und größtes Volumen getrennt ausweisen." },
        ] }],
      },
      {
        title: "Spezifikationen der FOREACH Baureihen EA, SM und TM einordnen",
        parts: [
          { type: "table", headers: ["Baureihe", "Aktuelle Angaben", "Auswahlkriterien"], rows: [
            ["Präzisionskolbenpumpe EA", "2000 Schritte je Vollhub in der Basisausführung. Daten bei Vollhub und 2 % Hub unter spezifizierten Bedingungen.", "Das Nennvolumen auf die kritischen Arbeitsvolumina abstimmen"],
            ["Miniatur-Kolbenpumpe SM", "2000 Schritte je Vollhub. Wiederholbarkeit bei Vollhub ≤0,5 % unter spezifizierten Bedingungen. Genauigkeit für die gewählte Ausführung bestätigen.", "Einbauraum, Volumen, Fluidikkomponenten und Systemvalidierung gemeinsam berücksichtigen"],
            ["Ultrakompakte Kolbenpumpe TM", "Die gezeigten Ausführungen verwenden 2540 Schritte je Vollhub. Genauigkeit und Wiederholbarkeit für die gewählte Ausführung bestätigen.", "Dosierleistung nicht aus der Schrittzahl allein ableiten"],
          ] },
          paragraph("Schrittzahlen lassen sich nur unter Berücksichtigung von Nennvolumen, Kolbendurchmesser, Kraftübertragung und Prüfbedingungen vergleichen. Die größte Pumpe für das maximale Dosiervolumen kann für das kleinste kritische Volumen ungeeignet sein."),
          { type: "links", items: [
            { prefix: "Zu den Grundlagen: ", label: "Was ist eine Präzisionskolbenpumpe?", href: "/resources/technical-articles/micro-plunger-pump-selection/", suffix: "." },
            { prefix: "Zum Produktsortiment: ", label: "FOREACH Kolbenpumpen-Konfigurationen", href: pistonPumpProductsHref, suffix: "." },
          ] },
        ],
      },
    ],
    faqTitle: "Häufig gestellte Fragen",
    faq: [
      { question: "Ist das theoretische Volumen je Schritt das Mindestdosiervolumen?", answer: "Es bezeichnet ein theoretisches Verdrängungsinkrement. Prüfen Sie das verlässliche Mindestdosiervolumen mit tatsächlichem Medium, Ventilen, Leitungen, Gegendruck und Steuerung." },
      { question: "Sind mehr Motorschritte immer vorteilhaft?", answer: "Sie ermöglichen feinere Sollwertschritte. Die erreichbare Genauigkeit und Wiederholbarkeit muss unter Einsatzbedingungen geprüft werden." },
      { question: "Warum kann ein wiederholbares Ergebnis trotzdem ungenau sein?", answer: "Ein konstanter systematischer Fehler kann zu eng beieinanderliegenden Ergebnissen führen, die alle vom Sollwert abweichen." },
      { question: "Lässt die Genauigkeit bei Vollhub Rückschlüsse auf 10 % oder 2 % Hub zu?", answer: "Konstante Fehler und zeitabhängige Effekte können bei kurzen Hüben einen größeren Anteil ausmachen. Prüfen Sie die Genauigkeit am vorgesehenen Arbeitshub." },
      { question: "Wie lässt sich die Dosierleistung bei kleinen Volumina verbessern?", answer: "Wählen Sie ein geeignetes Nennvolumen, befüllen und entlüften Sie den Flüssigkeitsweg, optimieren Sie Leitungen und Geschwindigkeiten, stimmen Sie die Ventilschaltung ab, stabilisieren Sie die Temperatur und kalibrieren Sie mit dem vorgesehenen Medium." },
    ],
    conclusion: {
      title: "Arbeitsvolumen vor dem Pumpenvergleich festlegen",
      parts: [
        paragraph("Auflösung bezeichnet den theoretischen Sollwertschritt, Genauigkeit die Nähe zum Sollwert und Wiederholbarkeit die Streuung zwischen wiederholten Ergebnissen."),
        paragraph("Definieren Sie zuerst kleinstes, typisches und größtes Arbeitsvolumen und prüfen Sie dann Genauigkeit und Wiederholbarkeit an den entsprechenden Hüben. Die Motorschrittzahl unterstützt die Auslegung der Bewegung. Das verlässliche Mindestdosiervolumen und die Leistung des Gesamtsystems müssen gemessen werden."),
      ],
    },
    cta: {
      title: "Möchten Sie Genauigkeit und Wiederholbarkeit einer Kolbenpumpe prüfen?",
      description: "Nennen Sie uns Zielvolumen, zulässigen Fehler, geforderte Wiederholbarkeit, Medium, Temperatur, Gegendruck, Ventile, Leitungen, Zykluszeit und Einbauraum für die Bewertung von EA, SM oder TM.",
      ...pistonPumpActions,
    },
    subject: {
      about: ["Genauigkeit von Kolbenpumpen", "Wiederholbarkeit von Kolbenpumpen", "Auflösung von Kolbenpumpen"],
      mentions: ["Kolbenpumpe EA", "Kolbenpumpe SM", "Kolbenpumpe TM", "verlässliches Mindestdosiervolumen", "Validierung der Flüssigkeitshandhabung"],
    },
  },
};
