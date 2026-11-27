import type { DiaphragmPumpEngineeringArticleCopy, EngineeringArticleBlock } from "./diaphragm-pump-engineering-article.types";

const paragraph = (text: string): EngineeringArticleBlock => ({ type: "paragraph", text });
const formula = (expression: string, note: string): EngineeringArticleBlock => ({ type: "formula", expression, note });
const note = (label: string, text: string): EngineeringArticleBlock => ({ type: "notice", label, text });
const list = (items: readonly string[], ordered = false): EngineeringArticleBlock => ({ type: "list", items, ...(ordered ? { ordered } : {}) });

const materialsDeck = "Vergleichen Sie die Werkstoffe von Pumpenkopf, Membran und Ventilen. Prüfen Sie vor der Auswahl einer Ausführung Zusammensetzung und Konzentration des Mediums, Temperatur, Einwirkdauer und Reinigungsbedingungen.";
const materialsSupport = "Nennen Sie FOREACH Medium und Konzentration, Betriebstemperatur, Reinigungsverfahren sowie die Anforderungen an Durchfluss und Druck. So lassen sich ein geeignetes Modell und die passende Werkstoffkombination auswählen.";

export const germanDiaphragmMaterialsArticle: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "Welche Werkstoffe stehen für Miniatur-Membranpumpen zur Verfügung?",
    seoTitle: "Werkstoffauswahl für Miniatur-Membranpumpen",
    seoDescription: materialsDeck,
    coverImage: "/images/resources/technical-articles/life-science-instrument-dpl60-diaphragm-pump-selection-guide/dpl60-product.webp",
    coverAlt: "Miniatur-Flüssigkeitsmembranpumpe FOREACH DPL60",
  },
  deck: materialsDeck,
  leadBlocks: [
    paragraph("Prüfen Sie bei der Auswahl einer Miniatur-Membranpumpe neben Durchfluss, Druck und Einbaumaßen alle medienberührten Werkstoffe. Das ist besonders bei Reagenzien, Reinigungsflüssigkeiten und Abfallflüssigkeiten wichtig. FOREACH bietet die folgenden zwei Hauptkombinationen an. Die Verfügbarkeit hängt vom gewählten Modell ab."),
    {
      type: "table",
      headers: ["Pumpenkopf", "Membran", "Ventile"],
      rows: [
        ["Polyphenylensulfid (PPS)", "Ethylen-Propylen-Dien-Kautschuk (EPDM)", "Ethylen-Propylen-Dien-Kautschuk (EPDM)"],
        ["Polyphenylensulfid (PPS)", "Polytetrafluorethylen (PTFE)", "Perfluorelastomer (FFKM)"],
      ],
    },
    paragraph("Beide Kombinationen verwenden einen Pumpenkopf aus PPS und unterscheiden sich bei Membran und Ventilen. Bewerten Sie alle drei Bauteile zusammen als medienberührtes Werkstoffsystem."),
  ],
  sections: [
    {
      title: "1. Pumpenkopf und Pumpenkammer berücksichtigen",
      blocks: [
        paragraph("Der Pumpenkopf bildet die Kammer, in der sich das Medium befindet und aus der es gefördert wird. Sein Werkstoff muss daher ebenfalls verträglich sein. Bei beiden FOREACH-Kombinationen besteht der Pumpenkopf aus PPS. Prüfen Sie die Eignung von PPS für das tatsächliche Medium auch bei einer PTFE-Membran mit FFKM-Ventilen."),
        paragraph("Eine PTFE-Membran sagt nichts über den Werkstoff der übrigen medienberührten Bauteile aus. Prüfen Sie die vollständige Werkstoffangabe, bevor Sie die Pumpe beurteilen."),
      ],
    },
    {
      title: "2. Membran: Medienkontakt und wiederholte Bewegung",
      blocks: [
        paragraph("Die Membran bewegt sich hin und her und verändert so das Kammervolumen zum Ansaugen und Ausstoßen. Berücksichtigen Sie bei der Auswahl die Medienverträglichkeit und die wiederholte Bewegung unter Betriebsbedingungen. FOREACH bietet EPDM-Membranen mit EPDM-Ventilen und PTFE-Membranen mit FFKM-Ventilen an."),
        paragraph("Für gereinigtes Wasser kann EPDM für Membran und Ventile eine erste Option sein, sofern das Modell die Anforderungen an Durchfluss, Druck und Betrieb erfüllt. Prüfen Sie bei Reagenzien und Reinigungsflüssigkeiten beide Kombinationen anhand der tatsächlichen Zusammensetzung. Allgemeine Begriffe wie wässrige Flüssigkeit, saure Flüssigkeit oder organisches Lösungsmittel reichen dafür nicht aus. Änderungen von Konzentration oder Temperatur erfordern eine erneute Bewertung."),
      ],
    },
    {
      title: "3. Ventile gemeinsam mit der Membran bewerten",
      blocks: [
        paragraph("Ventile bestimmen die Strömungsrichtung mit. Ihre Öffnungs-, Schließ- und Dichteigenschaften beeinflussen Ansaugen und Ausstoßen. Da sie medienberührt sind, muss ihre Werkstoffverträglichkeit auch bei geeigneter Membran separat geprüft werden."),
        paragraph("In den beiden genannten Kombinationen bestehen die FOREACH-Ventile aus EPDM oder FFKM. Prüfen Sie Pumpenkopf, Membran und Ventile gemeinsam, bevor Sie die Eignung der vollständigen Pumpe beurteilen."),
      ],
    },
    {
      title: "4. Betriebsdaten für die Auswahl ermitteln",
      blocks: [
        paragraph("Erfassen Sie für die tatsächliche Anwendung die folgenden Angaben."),
        list([
          "Zusammensetzung und Konzentration: Flüssigkeit, Lösungsmittel, Zusätze und gegebenenfalls gemischte Abfallströme.",
          "Temperatur: Förder- und Reinigungstemperaturen sowie zulässiger Medientemperaturbereich des Modells.",
          "Exposition: Intervallbetrieb, Dauerbetrieb und in der Kammer verbleibende Flüssigkeit bei Stillstand.",
          "Reinigung: Mittel, Häufigkeit, Temperatur und Dauer jeder Einwirkung.",
          "Betrieb: tatsächlicher Durchfluss, Betriebsdruck, Start-Stopp-Häufigkeit und Betriebsstunden pro Tag.",
        ]),
        paragraph("Berücksichtigen Sie bei der Verträglichkeitsprüfung sowohl das Arbeitsmedium als auch die Reinigungsflüssigkeit. Prüfen Sie außerdem medienberührte Fittings, Leitungen und weitere Dichtungen der konkreten Konstruktion."),
      ],
    },
    {
      title: "5. Mit dem tatsächlichen Medium validieren",
      blocks: [
        paragraph("Ein bestandener Versuch mit gereinigtem Wasser belegt keine Langzeitleistung mit dem tatsächlichen Reagenz. Prüfen Sie nach der Vorauswahl das reale Medium unter einbaunahen Bedingungen und innerhalb der Modellgrenzen. Kontrollieren Sie nach dem Betrieb Durchfluss, Ansaugverhalten, Dichtheit und Werkstoffzustand."),
        paragraph(materialsSupport),
      ],
    },
  ],
  faqTitle: "Häufig gestellte Fragen",
  faqItems: [],
  cta: {
    title: "Pumpenwerkstoffe und Modellauswahl besprechen",
    description: materialsSupport,
    contactLabel: "Technischen Support kontaktieren",
    productsLabel: "Miniatur-Membranpumpen ansehen",
    productsHref: "/products/pumps/miniature-diaphragm-pumps/",
  },
};

export const germanMotorRunsNoFlowArticle: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "Der Motor einer Miniatur-Flüssigkeitsmembranpumpe mit 300 mL/min läuft, aber die Pumpe fördert nicht",
    seoTitle: "Membranpumpe: Motor läuft, aber die Pumpe fördert nicht",
    seoDescription: "Prüfen Sie bei einer Miniatur-Flüssigkeitsmembranpumpe mit 300 mL/min ohne Durchfluss die Zulaufdichtheit, Verstopfungen, Rückschlagventile, Gegendruck und Motorstrom.",
    coverImage: "/images/resources/technical-articles/dpl30-troubleshooting/300-ml-min-liquid-diaphragm-pump-motor-power-check.webp",
    coverAlt: "FOREACH DPL30 für die Fehlersuche im Flüssigkeitskreislauf",
  },
  deck: "Ein laufender Motor zeigt, dass der Antrieb arbeitet. Ob sich die Pumpenkammer füllt, die Rückschlagventile wirksam schalten und die Last auf der Druckseite zulässig ist, muss gesondert geprüft werden. Kombinieren Sie Einlass- und Auslassdruck, Durchfluss und Motorstrom, um die Ursache schneller einzugrenzen.",
  leadBlocks: [
    formula("Q_net ≈ fV_sη_fillη_valve − Q_leak", "Dieses Diagnosemodell unterscheidet Zyklusfrequenz, wirksames Hubvolumen, Füllgrad, Ventilwirkungsgrad und Leckage. Es ist keine Produktgleichung für die DPL30."),
    note("Sicher arbeiten:", "Schalten Sie vor dem Öffnen der Leitungen oder des Pumpenkopfs die Stromversorgung ab und bauen Sie den Druck ab. Entleeren und dekontaminieren Sie das System entsprechend der tatsächlichen chemischen oder biologischen Gefährdung."),
  ],
  sections: [
    {
      title: "1. Ein laufender Motor zeigt noch keine wirksame Förderung an",
      blocks: [
        paragraph("Eine Flüssigkeitsmembranpumpe benötigt einen wirksamen Membranhub, ausreichende Kammerfüllung, gerichtetes Öffnen und Schließen der Einlass- und Auslassventile und genügend Druck, um die Druckdifferenz des Systems zu überwinden. Eine Störung an jeder dieser Stellen kann dazu führen, dass der Motor hörbar läuft, am Auslass jedoch keine Flüssigkeit austritt."),
        paragraph("Beginnen Sie mit zwei Messungen. Baut der Einlass Unterdruck auf? Steigt der Druck am Auslass ungewöhnlich stark? Diese Befunde grenzen den Fehler meist schneller ein als ein sofortiger Ausbau."),
      ],
    },
    {
      title: "2. Wenig oder kein Unterdruck am Einlass: Dichtheit, Ventile und Hub prüfen",
      blocks: [
        paragraph("Sinkt der Druck am Einlass kaum und tritt keine Flüssigkeit ein, prüfen Sie Lufteintritt im Zulauf, vertauschte Anschlüsse, undichte Ventile, Verunreinigungen im Pumpenkopf und einen unzureichend wirksamen Hub von Membran oder Antriebsmechanik."),
        paragraph("Häufige Ursachen für Ansaugprobleme und schwache Förderung sind undichte Schlauchanschlüsse, Partikel im Pumpenkopf, ein geschlossenes Systemventil, ein zugesetzter Filter oder unverträgliche Werkstoffe im Pumpenkopf. Prüfen Sie diese Einflussgrößen einzeln."),
        note("Schnellprüfung:", "Verwenden Sie einen kurzen, dichten und transparenten Zulaufschlauch. Kontrollieren Sie Durchflussrichtung und Füllstand und wiederholen Sie den Versuch. Prüfen Sie den Pumpenkopf erst, wenn die Pumpe weiterhin keinen Unterdruck aufbaut."),
      ],
    },
    {
      title: "3. Starker Unterdruck ohne Flüssigkeit: Zulauf zwischen Behälter und Pumpe prüfen",
      blocks: [
        formula("P_in,abs = P_tank,abs − ρgh − ΔP_tube − ΣΔP_components", "Der Einlassdruck hängt vom Behälterdruck, von der Ansaughöhe sowie von Leitungs- und Bauteilverlusten ab. In einem geschlossenen Vorratsbehälter ohne Luftnachströmung sinkt P_tank,abs bei der Entnahme."),
        paragraph("Starker Unterdruck spricht dafür, dass die Pumpe ansaugt und der Zufluss behindert ist. Prüfen Sie Zulauffilter, eingedrückte oder geknickte Leitungen, Ventilstellung, Behälterbelüftung, Flüssigkeitsstand und Ansaughöhe."),
        list([
          "Belüften Sie den Vorratsbehälter, sofern der Prozess dies zulässt.",
          "Verkürzen und vergrößern Sie die Zulaufleitung und verringern Sie unnötige Ansaughöhe.",
          "Überbrücken Sie vorübergehend entbehrliche Filter und Ventile und setzen Sie sie anschließend einzeln wieder ein.",
          "Erfassen Sie nach jeder Änderung den Einlassdruck und die Zeit bis zum Beginn der Förderung.",
        ], true),
      ],
    },
    {
      title: "4. Flüssigkeit tritt ein, aber nicht aus: Gegendruck und Widerstände auf der Druckseite",
      blocks: [
        formula("ΔP_pump = P_out − P_in", "Die Pumpe muss die gesamte Druckdifferenz vom Einlass zum Auslass überwinden. Der Relativdruck am Auslass allein reicht für die Bewertung nicht aus."),
        paragraph("Ein blockierter Auslass, beladener Filter, geschlossenes Ventil, eine feine Nadel oder Düse oder ein unter Druck stehender Auffangbehälter kann den Auslassdruck erhöhen. Ventile, Düsen, Leitungen und Fittings verändern außerdem den Gegendruck und damit den tatsächlichen Pumpenbetriebspunkt."),
        note("Geltungsbereich der Angabe:", "Die 300 mL/min der DPL30 gelten für freien Durchfluss. Bei beliebigem Gegendruck ist dieser Wert nicht garantiert. Bewerten Sie einen Flüssigkeitskreislauf mit hohem Widerstand anhand des Sollvolumenstroms und der gesamten Druckdifferenz."),
      ],
    },
    {
      title: "5. Den Fehler anhand von Einlass- und Auslassdruck eingrenzen",
      blocks: [{
        type: "table",
        headers: ["Befund", "Einlassdruck", "Auslassdruck", "Zuerst prüfen"],
        rows: [
          ["Motor läuft, Pumpe saugt nicht an", "Kaum Unterdruck", "Niedrig", "Lufteintritt, vertauschte Anschlüsse, Ventildichtheit, Membranhub"],
          ["Unterdruck steigt, Flüssigkeit kommt nicht an", "Deutlich niedriger", "Niedrig", "Zulaufblockade, zu große Ansaughöhe, unbelüfteter Behälter"],
          ["Flüssigkeit tritt ein, Auslassförderung ist gering", "Nahe dem Referenzwert", "Hoch", "Auslassventil, Filter, Nadel, Düse oder Gegendruck"],
          ["Durchfluss und Blasen schwanken", "Schwankend", "Kann ebenfalls schwanken", "Lufteintritt, Ausgasung, Verdampfung oder Kavitation"],
          ["Nassansaugen möglich, Trockenansaugen schlägt fehl", "Beim Trockenstart unzureichend", "Erholt sich bei gefüllter Pumpe", "Innere oder äußere Luftdichtheit und Ventilschluss"],
        ],
      }],
    },
    {
      title: "6. Motorstrom als zusätzlichen Messwert nutzen",
      blocks: [
        formula("P_in(t), P_out(t), Q(t) und I(t) gleichzeitig aufzeichnen", "Erfassen Sie Einlassdruck, Auslassdruck, Volumenstrom und Motorstrom synchron. Die vier Signale helfen, Strömungswiderstand, mangelnde Förderwirkung und Änderungen der Antriebslast zu unterscheiden."),
        paragraph("Leerlauf, normale Flüssigkeitslast, hoher Gegendruck und mechanische Behinderung erzeugen häufig unterschiedliche Stromverläufe. Der Strom hängt auch von Versorgung, Motorvariante und Steuerung ab. Vergleichen Sie daher unter gleichartigen Bedingungen und ziehen Sie für die Diagnose weitere Messwerte heran."),
        list([
          "Kontrollieren Sie das Medium im Vorratsbehälter, Anschlussrichtung, vorgegebene Versorgungsspannung und einen offenen Auslass.",
          "Erstellen Sie mit Wasser und kurzen Leitungen eine Referenz und erfassen Sie alle vier Signale.",
          "Setzen Sie die Zulaufbauteile nacheinander wieder ein, um den Fehler auf der Saugseite zu lokalisieren.",
          "Setzen Sie die Auslassbauteile nacheinander wieder ein, um die Ursache des Gegendrucks zu lokalisieren.",
          "Öffnen Sie den Pumpenkopf erst, nachdem Sie Fehler im äußeren Flüssigkeitskreislauf eingegrenzt haben.",
        ], true),
      ],
    },
  ],
  faqTitle: "Häufig gestellte Fragen",
  faqItems: [
    { question: "Belegt ein normales Motorgeräusch, dass die Pumpe fehlerfrei ist?", answer: "Nein. Es bestätigt weder den wirksamen Membranhub noch ausreichende Kammerfüllung, dichte Ventile oder eine zulässige Druckdifferenz." },
    { question: "Warum sollte bei starkem Unterdruck am Einlass zuerst die Saugseite geprüft werden?", answer: "Starker Unterdruck zeigt, dass die Pumpe ansaugt. Prüfen Sie dann vorrangig Behälterbelüftung, Zulaufblockaden, zu große Ansaughöhe und eingedrückte Leitungen." },
    { question: "Soll ich die Spannung erhöhen, damit die Flüssigkeit durchfließt?", answer: "Nein. Prüfen Sie die Versorgungsspannung anhand der Spezifikation und lokalisieren Sie zuerst die Engstelle oder den Gegendruck. Eine zu hohe Spannung kann Motor, Antriebsmechanik oder Pumpenkopf überlasten." },
    { question: "Warum werden bei gedrosseltem Auslass keine 300 mL/min erreicht?", answer: "300 mL/min gelten bei freiem Durchfluss. Zusätzlicher Auslasswiderstand verschiebt den Betriebspunkt auf der Pumpenkennlinie und senkt den tatsächlichen Durchfluss." },
    { question: "Welche Messwerte brauche ich mindestens?", answer: "Erfassen Sie zuverlässig Versorgungsspannung und Strom, Einlassabsolutdruck oder Unterdruck, Auslassdruck und Durchfluss, beispielsweise durch Auffangen eines Volumens während einer festgelegten Zeit." },
  ],
  cta: {
    title: "Die DPL30 läuft, fördert aber im eingebauten Flüssigkeitskreislauf nicht?",
    description: "Geben Sie Einlass- und Auslassdruck, eingebaute Leitungen, Vorratshöhe, Last auf der Druckseite, Medium, Versorgungsspannung und Strom an. Beschreiben Sie auch den Unterschied zwischen Trocken- und Nassansaugen, damit sich der Fehler zwischen Zulauf, Pumpe und Auslass eingrenzen lässt.",
    contactLabel: "Technische Beratung anfragen",
    productsLabel: "Miniatur-Flüssigkeitsmembranpumpe DPL30 ansehen",
    productsHref: "/products/pumps/miniature-diaphragm-pumps/dpl30-liquid-diaphragm-pump",
  },
};
