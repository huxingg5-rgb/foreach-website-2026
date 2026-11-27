import { diaphragmPumpPressureRatingTermsEnCopy as source } from "./diaphragm-pump-flow-pressure-series-05-07.en";
import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

export const germanDiaphragmPressureTermsArticle = {
  metadata: {
    ...source.metadata,
    title: "Nennbetriebsdruck, maximaler Ausgangsdruck, Prüfdruck und Berstdruck bei Miniatur-Membranpumpen",
    seoTitle: "Druckangaben bei Miniatur-Membranpumpen richtig einordnen",
    seoDescription: "Was Nennbetriebsdruck, maximaler Ausgangsdruck, Prüfdruck und Berstdruck bedeuten und welche Prüfbedingungen bei der Auswahl zu beachten sind.",
    coverAlt: "Miniatur-Membranpumpe und Druckprüfung aus dem offiziellen Douyin-Kanal von FOREACH",
  },
  deck: "Eine Druckangabe ist erst zusammen mit ihrer Definition, dem Prüfmedium, den Einlassbedingungen, dem zugehörigen Volumenstrom, der Prüfdauer und den Abnahmekriterien aussagekräftig. Der Nennbetriebsdruck kann eine Betriebsgrenze angeben. Maximaler Ausgangsdruck, Prüfdruck und Berstdruck lassen sich für sich allein nicht als Dauerbetriebspunkte verwenden.",
  leadBlocks: [
    { type: "paragraph", text: "In Unterlagen zu Miniatur-Membranpumpen finden sich Bezeichnungen wie Rated Pressure, Max. Pressure, Output Pressure, Proof Pressure, Pressure Test und Burst Pressure. Chinesischsprachige Unterlagen fassen sie mitunter unter Oberbegriffen wie Druck, Maximaldruck oder Druckbeständigkeit zusammen. In derselben Tabellenspalte lassen sich dadurch Werte vergleichen, die unterschiedliche technische Grenzen beschreiben." },
    { type: "paragraph", text: "Für die Auswahl genügt der Zahlenwert allein nicht. Prüfen Sie mindestens Prüfmedium, Temperatur, Einlassdruck, zugehörigen Volumenstrom, Prüfdauer, Betriebszyklus und Abnahmekriterien. Stehen in zwei Unterlagen jeweils 600 kPa, ergeben sich bei verschiedenen Prüfbedingungen unterschiedliche technische Aussagen." },
    { type: "notice", label: "Technische Schlussfolgerung", text: "Nennbetriebsdruck, maximaler Ausgangsdruck, Prüfdruck und Berstdruck beschreiben unterschiedliche Grenzen. Ohne eine freigegebene Spezifikation mit definierten Prüfbedingungen dürfen Prüf- und Berstwerte nicht als zulässiger Dauerbetriebsdruck angesetzt werden." },
  ],
  sections: [
    {
      title: "1. Warum 600 kPa je nach Druckangabe etwas anderes bedeuten",
      blocks: [
        { type: "paragraph", text: "Der tatsächliche Betriebsdruck beschreibt die Differenz zwischen Einlass und Auslass, gegen die die Pumpe im Betrieb fördern muss. Der Nennbetriebsdruck ergibt sich aus dem zulässigen oder spezifizierten Betriebsbereich unter definierten Bedingungen. Der maximale Ausgangsdruck bezeichnet meist einen Grenzpunkt der Förderkennlinie. Prüfdruck und Berstdruck betreffen die strukturelle Belastungsgrenze beziehungsweise die Versagensgrenze." },
        {
          ...source.sections[0].blocks[1],
          src: "/images/resources/technical-articles/diaphragm-pump-pressure-rating-terms/article-figure-de.svg",
          alt: "Fünf Begriffskarten zu Betriebsdruck, Nennbetriebsdruck, maximalem Ausgangsdruck, Prüfdruck und Berstdruck einer Miniatur-Membranpumpe",
          caption: "Abbildung 5. Die Druckangaben beschreiben unterschiedliche technische Grenzen.",
        },
      ],
    },
    {
      title: "2. Welche Frage die fünf Druckangaben beantworten",
      blocks: [
        {
          type: "table",
          headers: ["Begriff", "Technische Bedeutung", "Direkt als Dauerbetriebspunkt verwendbar?", "Was ist zu klären?"],
          rows: [
            ["Tatsächlicher Betriebsdruck", "Druckdifferenz zwischen Pumpeneinlass und Pumpenauslass im laufenden Gerät", "Der Messwert im Betrieb muss validiert werden", "Stationärer oder transienter Zustand, Volumenstrom und Einlassbedingungen"],
            ["Nennbetriebsdruck", "In einer freigegebenen Spezifikation unter definierten Bedingungen zulässiger oder festgelegter Betriebsdruckbereich", "Kann bei Einhaltung aller geltenden Bedingungen die Grenze vorgeben", "Medium, Temperatur, Betriebszyklus und Druck-Förderstrom-Kennlinie"],
            ["Maximaler Ausgangsdruck", "Druckgrenzpunkt oder Ausgangsdruckbereich, den die Pumpe erreichen kann oder für den sie spezifiziert ist", "Als alleinige Angabe in der Regel ungeeignet", "Ob an diesem Punkt noch gefördert wird und wie lange der Zustand zulässig ist"],
            ["Prüfdruck", "Druck zur Überprüfung von Bauteilen oder Dichtungen bei festgelegtem Prüfmedium, festgelegter Dauer und definierten Abnahmekriterien", "Nein", "Prüfmedium, Prüfdauer sowie Kriterien für Leckage oder Verformung"],
            ["Berstdruck", "Grenze, bei der der Prüfling bleibend beschädigt wird oder seine Funktion verliert", "Nein", "Zustand des Prüflings, Druckanstiegsgeschwindigkeit und Versagenskriterium"],
          ],
        },
        { type: "notice", label: "Freigegebene Spezifikation", text: "Öffentliche Webseiten dienen der Vorauswahl und helfen, offene Fragen zu erkennen. Für die Auslegung ist eine gültige Revision der freigegebenen Spezifikation maßgeblich. Unveröffentlichte Prüf- und Berstwerte lassen sich weder aus Werkstoffen und Bauweise noch aus anderen Druckangaben ableiten." },
      ],
    },
    {
      title: "3. Warum ein einzelner Druckwert die Betriebsgrenzen nicht bestimmt",
      blocks: [
        { type: "paragraph", text: "Bei der Hochdruck-Flüssigkeitsmembranpumpe FOREACH DPL30H gibt die Website einen Nenndruck von 600 kPa an. Bewerten Sie diesen Wert zusammen mit dem zugehörigen Volumenstrom, Medium, Einlasszustand, Temperatur, Betriebszyklus und der vollständigen Druck-Förderstrom-Kennlinie. Daraus folgen weder Prüf- oder Berstdruck noch eine Dauerförderleistung unter beliebigen Bedingungen." },
        { type: "paragraph", text: "Bei Angaben wie Rated Pressure, Max. Pressure, Output Pressure, Pressure Test oder Burst Pressure prüfen Sie zuerst die Definition und danach Prüfbedingungen und Abnahmekriterien. Übereinstimmende Zahlen nach der Einheitenumrechnung sagen nichts darüber aus, ob dieselben technischen Grenzen gemeint sind." },
        {
          type: "table",
          headers: ["Angabe in der Spezifikation", "Was sich mindestens feststellen lässt", "Was sich daraus nicht direkt ableiten lässt"],
          rows: [
            ["Rated Pressure / Nennbetriebsdruck", "Die gültige Spezifikation definiert eine Betriebsdruckgrenze unter bestimmten Bedingungen", "Dass die Pumpe bei diesem Druck den freien Förderstrom erreicht oder der Wert für jedes Medium gilt"],
            ["Max. Pressure / Output Pressure", "Die Unterlage nennt einen Druckgrenzpunkt oder Ausgangsdruckbereich", "Dass dieser Druck dauerhaft anliegen darf"],
            ["Pressure Test / Proof Pressure", "Bauteile oder Dichtungen wurden unter den angegebenen Bedingungen druckgeprüft", "Dass der Prüfdruck dem Nennbetriebs- oder Berstdruck entspricht"],
            ["Burst Pressure / Berstdruck", "Grenze für bleibende Beschädigung oder Funktionsausfall des Prüflings", "Dass sich der zulässige Betriebsdruck des Systems erhöhen lässt"],
          ],
        },
      ],
    },
    {
      title: "4. Neun Angaben zur Prüfung eines Druckparameters",
      blocks: [
        { type: "list", ordered: true, items: [
          "Offizielle Definition des Begriffs in der freigegebenen Spezifikation.",
          "Prüfmedium wie Wasser, Gas oder eine andere Flüssigkeit.",
          "Medien- und Umgebungstemperatur.",
          "Atmosphärischer Druck, Unterdruck oder Überdruck am Pumpeneinlass.",
          "Zugehöriger Volumenstrom und Verfügbarkeit einer vollständigen Druck-Förderstrom-Kennlinie.",
          "Stationäre oder transiente Prüfung und Prüfdauer.",
          "Dauerbetrieb, intermittierender Betrieb oder nur kurzzeitig zulässiger Betrieb gegen geschlossenen Auslass.",
          "Abnahmekriterium wie fortgesetzte Förderung, Dichtheit, keine Verformung oder kein Bersten.",
          "Übereinstimmung von Stichprobenumfang, Stromversorgung, Leitungen und Anschlüssen mit den Projektbedingungen.",
        ] },
      ],
    },
    {
      title: "5. Mit mehrdeutigen Angaben in der Spezifikation umgehen",
      blocks: [
        { type: "paragraph", text: "Nennt eine öffentliche Seite nur einen einzelnen Druckwert, kennzeichnen Sie ihn zunächst als zu bestätigen. Ordnen Sie ihn nicht eigenständig als Nennbetriebs-, Prüf- oder Berstdruck ein. Übernehmen Sie den genauen Wortlaut der freigegebenen Spezifikation und ergänzen Sie in der Projekttabelle Definition, zugehörigen Volumenstrom, Prüfdauer, Betriebszyklus und Abnahmekriterien." },
        { type: "paragraph", text: "FOREACH verwendet die gleiche Abgrenzung. Ein in der freigegebenen Spezifikation ausgewiesener Nenndruck wird als solcher angegeben. Unveröffentlichte Prüf- und Berstwerte werden nicht aus Bauweise, Werkstoffen oder ähnlichen Parametern geschätzt. Eine Webseite kann bei der Vorauswahl helfen, die Dokumentation zur Produktfreigabe bleibt maßgeblich." },
      ],
    },
    {
      title: "FOREACH Ressourcen und Geltungsbereich der Angaben",
      blocks: [
        { type: "links", items: [{ ...source.sections[5].blocks[0].items[0], label: "FOREACH Auswahlleitfaden zur Hochdruck-Flüssigkeitsmembranpumpe DPL30H" }] },
        { type: "notice", label: "Geltungsbereich", text: "Öffentliche FOREACH Ressourcen erläutern Druckbegriffe und Auswahlmethoden. Formeln und Beispiele dienen der technischen Vorauswahl. Für die Auslegung bleiben eine freigegebene Spezifikation, die Prüfung mit dem tatsächlichen Medium und die Validierung des Gesamtsystems am Prototyp erforderlich." },
      ],
    },
  ],
  faqTitle: "Häufig gestellte Fragen zu Druckangaben bei Membranpumpen",
  faqItems: [
    { question: "Entspricht der maximale Ausgangsdruck dem Druck am geschlossenen Pumpenauslass?", answer: "Manche Unterlagen definieren den maximalen Ausgangsdruck als Kennlinienendpunkt bei nahezu null Förderstrom. Prüfen Sie für das konkrete Modell die freigegebene Spezifikation, Druck-Förderstrom-Kennlinie und Prüfmethode." },
    { question: "Darf die Pumpe bei höherem Prüfdruck dauerhaft oberhalb des Nenndrucks betrieben werden?", answer: "Nein. Eine Druckprüfung erfolgt üblicherweise mit festgelegtem Medium, festgelegter Dauer und definierten Abnahmekriterien. Geprüft wird die strukturelle Belastbarkeit oder Dichtheit. Dauerförderleistung und Lebensdauer müssen separat beurteilt werden." },
    { question: "Bedeutet ein höherer Berstdruck eine bessere Pumpe?", answer: "Der Berstdruck kennzeichnet das Versagen des Prüflings. Für die Auswahl sind der zulässige Betriebsdruck bei Zielvolumenstrom, Medienverträglichkeit, Lebensdauer und die Sicherheitsgrenzen des vollständigen Flüssigkeitswegs entscheidender." },
    { question: "Sind 6 bar und 600 kPa genau gleich?", answer: "Die umgerechneten Werte sind gleich: 1 bar = 100 kPa. Begriffe, Prüfbedingungen und Betriebszyklus können je nach Unterlage unterschiedlich definiert sein. Gleiche Zahlenwerte bedeuten daher keine übereinstimmende Leistungsdefinition." },
    { question: "Wie sollten Druckangaben in einer Projekttabelle erfasst werden?", answer: "Übernehmen Sie den genauen Wortlaut der freigegebenen Spezifikation und die vollständige Modellnummer. Ergänzen Sie getrennte Felder für Nennbetriebsdruck, maximalen Ausgangsdruck, Prüfdruck, Berstdruck, Volumenstrom beim Zieldruck, Medium, Temperatur, Einlassbedingungen, Prüfdauer, Betriebszyklus und Abnahmekriterien." },
  ],
  cta: {
    title: "Druckparameter einer Miniatur-Membranpumpe prüfen lassen",
    description: "Übermitteln Sie Zielvolumenstrom, Einlass- und Auslassdruck, Medientemperatur, Betriebszyklus und den vollständigen Aufbau des Flüssigkeitswegs. Ein Techniker kann den vorgesehenen Betriebspunkt mit der freigegebenen Spezifikation und Kennlinie abgleichen.",
    contactLabel: "Technische Beratung anfragen",
    productsLabel: "Membranpumpen ansehen",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
