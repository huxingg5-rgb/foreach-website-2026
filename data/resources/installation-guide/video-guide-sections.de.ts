type SectionCopy = {
  title: string;
  paragraphs: string[];
  linkTitle?: string;
};

export const germanVideoSections: Record<string, {
  leadParagraphs: string[];
  media: { title: string; description: string };
  highlightsIntroduction: string;
  productHeading: string;
  support: { title: string; description: string };
  sections: SectionCopy[];
}> = {
  "youtube-piston-pump-liquid-dispensing": {
    leadParagraphs: [
      "Präzisionskolbenpumpen der FOREACH Baureihe EA verwenden einen Schrittmotor, der den Kolben vor- und zurückbewegt. Der Kolbenweg bestimmt das Ansaugen und die dosierte Abgabe. Nennvolumina von 50 μL bis 20 mL decken die Reagenzzugabe, Probenverdünnung und weitere Flüssigkeitshandhabungsaufgaben in klinisch-chemischen Analysegeräten, Immunoassay-Analysatoren und der Laborautomation ab. Die geschätzte Lebensdauer beträgt 5 Millionen Zyklen mit Reinwasser bei Umgebungstemperatur und 50 kPa Gegendruck.",
      "Pumpenköpfe sind aus PMMA, PCTG oder PEEK erhältlich. Für die Kolben stehen Keramik, PEEK oder Saphir zur Verfügung. Integrierte Pumpen-Ventil-Einheiten und OEM-Sonderanfertigungen sind möglich. Pumpenkopf, Kolben, Flüssigkeitsanschlüsse, Motor, Ventileinheit und Steuerung lassen sich an Reagenz, Dosierfolge und Einbauraum des Flüssigkeitsmoduls anpassen.",
    ],
    media: { title: "Produktüberblick zur Kolbenpumpe EA", description: "Kurze Einführung zu FOREACH Kolbenpumpen der Reihe EA mit Nahaufnahmen und Einsatzbeispielen für die Flüssigkeitshandhabung. Sprechertext auf Englisch." },
    highlightsIntroduction: "Nutzen Sie den Produktüberblick als Ausgangspunkt und legen Sie dann die Dosieraufgabe fest. Die folgenden Hinweise helfen Ihnen, die Pumpenspezifikation mit den Anforderungen des eingebauten Flüssigkeitswegs zu vergleichen.",
    productHeading: "Nennvolumina und Pumpenkopfwerkstoffe der EA vergleichen",
    support: { title: "Suchen Sie eine Kolbenpumpe für Ihre Dosieraufgabe?", description: "Nennen Sie uns Dosiervolumenbereich, Reagenz, Zykluszeit, Gegendruck, Anforderungen an medienberührte Materialien sowie Grenzwerte für Genauigkeit und Wiederholbarkeit." },
    sections: [
      { title: "Bestimmt die Kolbenpumpenkapazität das kleinste Dosiervolumen?", paragraphs: [
        "Das Vollhubvolumen und das theoretische Volumen je Motorschritt beschreiben Verdrängung und Ansteuerungsauflösung. Die abgegebene Flüssigkeitsmenge kann durch mechanisches Spiel, Ventilschaltzeiten, eingeschlossenes Gas, Schlauchausdehnung und Tropfenablösung abweichen. Bei kurzem Hub machen diese Einflüsse einen größeren Anteil aus.",
        "Wählen Sie ein Nennvolumen, das die benötigte Förderfolge abdeckt und die Validierung der kleinsten Dosis ermöglicht. Lesen Sie Angaben zu Genauigkeit und Wiederholbarkeit zusammen mit Prüfvolumen und Prüfbedingungen. Ergebnisse bei Vollhub lassen sich nicht auf jeden Teilhub übertragen. Eine kleine Sollwertschrittweite belegt kein validiertes Mindestdosiervolumen.",
      ], linkTitle: "Genauigkeit, Wiederholbarkeit und Auflösung bei Kolbenpumpen" },
      { title: "Wie beeinflussen Befüllen, Entlüften und Ventilschaltzeiten die Fördermenge?", paragraphs: [
        "Bei steigendem Druck wird eine Blase komprimiert. Ein Teil der Kolbenbewegung kann deshalb zunächst Gas verdichten, bevor Flüssigkeit austritt. Flexible Schläuche können bei Druckänderungen ebenfalls Volumen aufnehmen und wieder abgeben. Selbst bei wiederholbarer Ansteuerung ist dadurch eine verzögerte oder ungleichmäßige Abgabe möglich.",
        "Befüllen und entlüften Sie den gesamten Flüssigkeitsweg nach der Anleitung für die gewählte Baugruppe. Prüfen Sie Einlassdichtheit, Füllstand, Ventilschaltung und Druckberuhigungszeit. Bewerten Sie Anlauf und stationären Betrieb getrennt, besonders nach Behälterwechsel, Reinigung oder längerem Stillstand.",
      ], linkTitle: "Luftblasen und Dosierfehler bei Kolbenpumpen beurteilen" },
      { title: "Wie lässt sich eine Kolbenpumpe im Gerät validieren?", paragraphs: [
        "Prüfen Sie kleinstes, typisches und größtes Arbeitsvolumen mit dem vorgesehenen Reagenz oder einem begründet repräsentativen Prüfmedium. Verwenden Sie die Serienventile, -leitungen, -fittings und -dosierspitze. Protokollieren Sie Flüssigkeitstemperatur, Zulaufbedingungen, Gegendruck, Bewegungsparameter und Zykluszeiten. Messen Sie mittlere Fördermenge und Streuung getrennt.",
        "Prüfen Sie Werkstoffverträglichkeit und Leistung nach repräsentativen Reinigungs- und Betriebszyklen erneut. Die verlinkten EA-Ausführungen zeigen konkrete Nennvolumina und Pumpenkopfoptionen. Nutzen Sie die aktuelle Modellspezifikation und validieren Sie das Einbauergebnis, bevor Sie Angaben aus dem allgemeinen Produktüberblick auf Ihr Gerät übertragen.",
      ], linkTitle: "Pumpenkopfwerkstoff für das tatsächliche Medium auswählen" },
    ],
  },
  "youtube-flexible-tubing-laboratory-fluid-lines": {
    leadParagraphs: [
      "FOREACH PVC-Schläuche (Polyvinylchlorid) sind für Gas- und Flüssigkeitstransfer, Spülen, Entleeren und interne Flüssigkeitsverbindungen in Analysengeräten, der Laborautomation und der In-vitro-Diagnostik (IVD) ausgelegt. Der flexible Aufbau erleichtert die Verlegung, und die Transparenz macht Flüssigkeiten und Blasen sichtbar. Die verfügbaren Abmessungen decken 0.8–19.1 mm Innendurchmesser und 2.4–25.4 mm Außendurchmesser bei Shore A 55 oder 65 ab. Wählen Sie anhand von Einbauraum, Wandstärke und Anschlussanforderungen.",
      "Für OEM-Geräte sind kundenspezifische Ausführungen möglich. Abmessungen, Härte und Anschlüsse lassen sich auf Medium, Geräteaufbau und Fittingspezifikationen abstimmen. Aktuelle Ausführungen sind unter anderem mit 15, 30 und 50 Metern je Rolle erhältlich. Abweichende Abmessungen, Härten und Rollenlängen können für einzelne Projekte zur Gerätemontage und Serienfertigung geprüft werden.",
    ],
    media: { title: "Produktüberblick zu flexiblen Schläuchen", description: "Nahaufnahmen transparenter FOREACH Schläuche und ihrer Enden, eine Biegedemonstration und Anwendungsbeispiele für Labor- und Analysegeräte. Sprechertext auf Englisch." },
    highlightsIntroduction: "Das Video zeigt Aussehen und Flexibilität. Für die Auswahl benötigen Sie außerdem Angaben zur Werkstoffrezeptur, zu Abmessungen und Druckbedingungen sowie zum gesamten Anschluss.",
    productHeading: "Schlauchwerkstoffe und verfügbare Abmessungen vergleichen",
    support: { title: "Suchen Sie einen Schlauch für den Flüssigkeitsweg Ihres Geräts?", description: "Teilen Sie uns Flüssigkeit und Reinigungsmittel, Innen- und Außendurchmesser, Länge, Druck oder Vakuum, Temperatur sowie das passende Fitting mit." },
    sections: [
      { title: "Wie wählen Sie das Material für Laborschläuche aus?", paragraphs: [
        "Gehen Sie von der tatsächlichen Flüssigkeit und dem Reinigungsverfahren aus. FOREACH bietet PVC- und TPU-Schläuche sowie Ausführungen aus FEP, PTFE, PEEK und PFA. Diese Werkstoffe unterscheiden sich mechanisch und chemisch auch bei gleichem Nenndurchmesser.",
        "Fordern Sie technische Daten und gegebenenfalls Konformitätsunterlagen zur gewählten Rezeptur und zum gelieferten Bauteil an. Für die jeweilige Anwendung sind das Freisetzungsverhalten potenziell herauslösbarer Stoffe, die chemische Beständigkeit, die Sterilisationseignung und die Druckfestigkeit zu belegen. Transparenz, eine glatte Oberfläche oder eine manuelle Biegeprobe reichen dafür allein nicht aus.",
      ] },
      { title: "Wie beeinflussen Innen- und Außendurchmesser den Anschluss?", paragraphs: [
        "Bei Schlauchtüllen sind der Schlauchinnendurchmesser und das spezifizierte Tüllenprofil der Ausgangspunkt. Wandstärke, Härte und Elastizität beeinflussen Aufweitung, Sitz und Abziehfestigkeit. Ein zu großer Schlauch kann locker sitzen, ein zu kleiner kann übermäßige Kraft erfordern oder Bauteile beschädigen.",
        "Bei Anschlüssen mit definiertem Schlauchaußendurchmesser gelten die zugehörige Dichtgeometrie und Montageanleitung. Gleiche Nennmaße allein belegen keine Kompatibilität. Halten Sie tatsächliche Maße und Toleranzen fest und prüfen Sie Halt und Dichtheit unter repräsentativen Bedingungen.",
      ], linkTitle: "Aufweitungsverhältnis und Passung bei Schlauchtüllen prüfen" },
      { title: "Was ist nach dem Verlegen flexibler Schläuche zu prüfen?", paragraphs: [
        "Kontrollieren Sie den Einbau auf Knicke, enge Bögen, Scheuerstellen und nicht abgefangene Kräfte an den Fittings. Prüfen Sie Verformungen durch Bewegung, Temperatur oder Unterdruck. Eine stationär dichte Verbindung kann sich bei Behälterbewegung oder im Gerätezyklus anders verhalten.",
        "Betreiben Sie den vollständigen Flüssigkeitsweg mit dem Sollvolumenstrom und den vorgesehenen Ein- und Auslassbedingungen. Achten Sie auf Leckagen, Lufteintritt, Schlauchbewegung und Änderungen nach Reinigung oder Wiederholbetrieb. Legen Sie Akzeptanzkriterien für die konkrete Aufgabe fest, da Zulauf, Ablauf und Präzisionsdosierung unterschiedliche Anforderungen stellen können.",
      ] },
    ],
  },
  "youtube-quick-connect-sealing-compatibility": {
    leadParagraphs: [
      "FOREACH Schnellkupplungen mit Stecker und Buchse lassen sich für Reagenzientransfer, Behälteranschlüsse und die Wartung von Leitungen in Analysegeräten, Laborautomation und Gerätefluidik schnell verbinden und trennen. Q20 hat eine Nennweite von 1/8 Zoll und deckt Schlauchinnendurchmesser von 1.6–6.4 mm ab, Q40 hat 1/4 Zoll und 6.4–9.5 mm, Q60 hat 3/8 Zoll und 9.5–19.0 mm. Jede Reihe bietet einzelne Größen innerhalb ihres Bereichs.",
      "Q20 und Q40 bieten POM-Gehäuse mit NBR-Dichtungen oder PP-Gehäuse mit EPDM-Dichtungen. Q60 verwendet PP mit EPDM. Gerade und abgewinkelte Anschlüsse sowie Schott- und Gewindevarianten sind verfügbar. Je nach Kombination von Stecker und Buchse ist die Kupplung ohne, mit einseitiger oder mit beidseitiger Absperrung ausgeführt. Für OEM-Anwendungen sind Anschlüsse passend zu Medium, Schlauchmaßen, Einbauraum und Absperrverhalten beim Trennen möglich.",
    ],
    media: { title: "Schnellkupplungen verbinden und trennen", description: "Kurzer FOREACH Überblick mit Kupplungsgrößen und manueller Demonstration des Verbindens und Trennens. Sprechertext auf Englisch." },
    highlightsIntroduction: "Das Video zeigt die Handhabung der Kupplungshälften. Prüfen Sie mit den folgenden Punkten den gesamten Anschluss eines Behälters, eines Wechselmoduls oder eines wartbaren Geräte-Flüssigkeitswegs.",
    productHeading: "Ausführungen von Schnellkupplungen vergleichen",
    support: { title: "Suchen Sie ein passendes Kupplungspaar oder Ersatz?", description: "Nennen Sie beide Artikelnummern oder fügen Sie Zeichnungen bei. Ergänzen Sie Schlauchmaße, Medium, Druck, Temperatur, gewünschte Absperrung und das vorgesehene Wartungsverfahren." },
    sections: [
      { title: "Warum kann eine eingerastete Schnellkupplung undicht sein?", paragraphs: [
        "Die Verriegelung hält die beiden Hälften zusammen. Die Dichtung muss an der vorgesehenen Gegenfläche anliegen. Schmutz, Dichtungsschäden, ungeeignete Werkstoffe oder unvollständiges Einrasten können die Dichtheit beeinträchtigen. Kräfte aus der Schlauchführung können zusätzlich die Kupplung oder den Schlauchanschluss belasten.",
        "Befolgen Sie die Montageanleitung und prüfen Sie die Dichtflächen. Verlegen Sie Leitungen ohne erzwungene Biegung oder dauernden Zug. Testen Sie die Dichtheit bei tatsächlichem Betriebsdruck, tatsächlicher Temperatur, typischen Druckänderungen und wiederholtem Verbinden. Die kurze Demonstration ist kein Dichtheits- oder Lebensdauernachweis.",
      ] },
      { title: "Sind ähnlich aussehende Schnellkupplungen austauschbar?", paragraphs: [
        "Vergleichen Sie Schnittstellenmaße, Verriegelung, Dichtungssitz und Ventilöffnung beider Hälften. Auch mechanisch verbindbare Teile können den Durchfluss einschränken, unvollständig einrasten oder die Dichtung falsch positionieren. Lassen Sie beim herstellerübergreifenden Austausch die konkrete Teilekombination bestätigen und prüfen Sie sie im vorgesehenen Kreislauf.",
        "Die Kompatibilität der Hälften ist getrennt von Schlauchmaß, Gewindegröße und Nennweite zu prüfen. Der Größenleitfaden erklärt die Maße. Die Kupplungsspezifikation nennt zulässige Paarungen und Anschlüsse. Prüfen Sie beides bei der Ersatzteilwahl.",
      ], linkTitle: "Nennweite, Schlauchmaß und Gewindegröße von Schnellkupplungen unterscheiden" },
      { title: "Unter welchen Betriebsbedingungen ist ein Kupplungspaar zu prüfen?", paragraphs: [
        "Legen Sie Flüssigkeit, Sollvolumenstrom, Betriebsdruck oder Vakuum, Temperatur und Reinigung fest. Prüfen Sie den Bemessungsdruck der Ausführung sowie die Zulässigkeit von Verbinden und Trennen unter Druck. Der Arbeitsdruck allein ist keine Freigabe, die Entriegelung unter Druck zu betätigen.",
        "Messen Sie nach repräsentativen Betriebszyklen Dichtheit, gegebenenfalls zurückgehaltene Flüssigkeit oder Austritt, Strömungswiderstand und Halt. Verwenden Sie die tatsächlichen Schläuche und gegebenenfalls die Plattenmontage. Eine absperrende Variante kann einen Behälter isolieren. Prüfen Sie dennoch die gesamte Baugruppe auf das gewünschte Absperrverhalten und den zulässigen Druckverlust.",
      ], linkTitle: "Druckgrenzen und Kuppeln unter Druck prüfen" },
    ],
  },
  "youtube-quick-connect-coupling-types": {
    leadParagraphs: ["Größenangaben bei Schnellkupplungen können den inneren Strömungskanal, den Schlauchanschluss oder das Gewinde bezeichnen. Prüfen Sie vor der Auswahl die Bedeutung jeder Angabe, die Kompatibilität der Gegenstücke, den benötigten Durchfluss und den zulässigen Druckverlust."],
    media: { title: "Nennweiten von Schnellkupplungen", description: "Kurzer Überblick über Schnellkupplungen mit Nennweiten von 1/8, 1/4 und 3/8 Zoll, Anschlussoptionen und kundenspezifischen Ausführungen. Sprechertext auf Englisch." },
    highlightsIntroduction: "Klären Sie die Bedeutung der drei Größenangaben, bevor Sie Kupplungshälften oder Anschlussvarianten vergleichen.",
    productHeading: "Verfügbare Schnellkupplungen vergleichen",
    support: { title: "Benötigen Sie Unterstützung bei der Kupplungsauswahl?", description: "Nennen Sie Schlauchinnen- und -außendurchmesser, Gewindenorm, Sollvolumenstrom, zulässigen Druckverlust und die passenden Gegenstücke." },
    sections: [
      { title: "Sind Nennweite und Schlauchgröße dasselbe?", paragraphs: [
        "Eine Nennweite von 1/4 Zoll legt weder Schlauchinnen- und -außendurchmesser noch Gewindegröße fest. Eine Kupplungsbaureihe kann mehrere Schlauch- oder Gewindeanschlüsse bei gleicher Nennweite bieten. Lesen Sie die Angaben zu Nennweite und Anschlussgröße getrennt.",
        "Bei einem Schlauchanschluss vermerken Sie Innen- und Außendurchmesser, Werkstoff und Anschlussart. Stimmen Sie eine Schlauchtülle auf den spezifizierten Innendurchmesser ab und prüfen Sie Wandstärke, Flexibilität und den erforderlichen Sitz. Erfassen Sie bei Gewindeanschlüssen Norm und Größe.",
      ] },
      { title: "Wie beeinflusst die Nennweite die Kupplungsauswahl?", paragraphs: [
        "Bei gleichem Volumenstrom hängt der Druckverlust von den inneren Kanälen, dem Ventil, der Paarung und den Medieneigenschaften ab. Ein größerer Schlauchanschluss kann eine Engstelle im Inneren unverändert lassen. Aus der Nennweite allein lässt sich der Volumenstrom durch die Verbindung nicht ablesen.",
        "Gehen Sie von benötigtem Volumenstrom und zulässigem Druckverlust aus. Prüfen Sie eine Druckverlustkennlinie oder eine geeignete Berechnung mit dem Durchflusskoeffizienten der Ausführung unter den Medienbedingungen. Prüfen Sie beide Hälften und ihre Ventile und verifizieren Sie die Leistung im eingebauten Flüssigkeitsweg.",
      ], linkTitle: "Durchfluss und Druckverlust von Schnellkupplungen" },
      { title: "Passen Schnellkupplungen mit gleicher Größe zusammen?", paragraphs: [
        "Gleiche Schlauchgrößen oder Nennweiten belegen keine passende Paarung. Schnittstelle, Verriegelung, Dichtungssitz und Ventilanordnung müssen zusammenpassen. Zwei Hälften für denselben Schlauch können unterschiedlichen Kupplungsbaureihen angehören.",
        "Entnehmen Sie das vorgesehene Kupplungspaar der Herstellerspezifikation. Vergleichen Sie bei Ersatz oder herstellerübergreifender Paarung die Schnittstellenmaße und prüfen Sie Halt, Dichtheit und gegebenenfalls vollständige Ventilöffnung. Wählen Sie Werkstoffe und Druck- und Temperaturgrenzen passend zum Betrieb und validieren Sie Dichtheit und Volumenstrom an der konkreten Baugruppe.",
      ], linkTitle: "Schnittstellen, Ventile und Kompatibilität von Schnellkupplungen" },
    ],
  },
};
