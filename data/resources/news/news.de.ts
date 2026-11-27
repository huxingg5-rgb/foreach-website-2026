import { getAdlm2026OnsiteArticle } from "./adlm-2026-onsite";
import type { GermanNewsArticleSlug } from "./news-draft-slugs.de";
import type { NewsArticle, NewsPageData } from "./news.types";

type GermanNewsCopy = readonly [
  title: string,
  summary: string,
  sections: readonly (readonly [title: string, content: string])[],
];

type GermanOverlaySlug = Exclude<GermanNewsArticleSlug, "adlm-2026-onsite">;

const articles: Record<GermanOverlaySlug, GermanNewsCopy> = {
  "medica-2026": [
    "FOREACH auf der MEDICA 2026 | Stand 1H39-1",
    "Vom 16. bis 19. November 2026 war FOREACH auf der MEDICA in Düsseldorf am Stand 1H39-1 vertreten. Im Mittelpunkt standen die Qualifizierung als Zweitlieferant, Musterprüfungen und die langfristige Versorgung von OEM-Geräteherstellern mit Pumpen, Ventilen und Fluidikkomponenten.",
    [
      ["Schwerpunkte am Stand 1H39-1", `Die MEDICA zählt zu den größten B2B-Fachmessen der Medizinbranche. 2026 fand sie parallel zur COMPAMED statt, der Fachmesse für die Zulieferkette der Medizintechnik. Im Fokus von FOREACH standen OEM-Geräte in Serie und in der Entwicklung. Hersteller können uns als Zweitquelle prüfen, als Alternative qualifizieren und langfristig nutzen, um die Abhängigkeit von einem einzelnen Lieferanten zu verringern.

Lieferantenqualifizierung: Wir unterstützen die Erstbewertung von Lieferanten und Audits des Qualitätsmanagementsystems.
Schnelle Musterprüfung: Muster von Pumpen, Ventilen und Fluidikkomponenten stehen kurzfristig für die Validierung in Ihrem Gerät zur Verfügung.
Kompatibilitätsprüfung: Wir vergleichen die Schnittstellen, Leistung und Werkstoffverträglichkeit mit Ihren vorhandenen Bauteilen.
Langfristige Belieferung: Kontinuierliche und planbare Serienversorgung für OEM-Geräteprojekte.`],
      ["Produktgruppen am Messestand", `Am Messestand ging es um die Auswahl, den Ersatz und die Anpassung von Komponenten aus den folgenden Produktgruppen.

[Pumpen](/de/products/pumps/): präzises Dosieren, kontinuierliche Versorgung, automatisiertes Pipettieren und gleichmäßige Förderung
[Ventile](/de/products/valves/): Ein- und Ausschalten, Absperren von Schläuchen und Umschalten mehrerer Kanäle
[Sonden, Kanülen und Rührpaddel](/de/products/probes/): Probenahme-, Spül- und Durchstechsonden, Rührpaddel und kundenspezifische Baugruppen
[Fluidik-Fittings](/de/products/fittings/): Schlauchverbinder, Fittings für starre Leitungen, Luer-Fittings, Schnellkupplungen und kundenspezifische Leitungsbaugruppen
[Schläuche und Kapillaren](/de/products/tubing/): flexible Schläuche aus verschiedenen Werkstoffen, starre Leitungen und transparente Flüssigkeitsleitungen
[Sensor- und Detektionsmodule](/de/products/control/): Drucküberwachung, Blasenerkennung und Systemschutz`],
      ["Qualität und Qualifikationen", `Für die Bewertung eines Zweitlieferanten sind gleichbleibende Qualität und kontrollierte Prozesse entscheidend.

Zertifizierte Systeme: Qualitätsmanagement nach ISO 9001 und Qualitätsmanagement für Medizinprodukte nach ISO 13485.
Kontrollierte Fertigung: In einem Reinraum der Klasse 100.000 extrudieren wir die Schläuche in der eigenen Fertigung. Für jede Ausführung sind Toleranzen von Innen- und Außendurchmesser sowie die Häufigkeit der Stichprobenprüfungen festgelegt. Wichtige Strukturteile für Pumpen, Ventile und Anschlüsse bearbeiten wir im eigenen Fertigungszentrum.
![Extrusionszentrum im Reinraum](/images/about/research-manufacturing/ability/extrusion-center.webp 1220x760)
![Zerspanungszentrum](/images/about/research-manufacturing/ability/machining-center.webp 1220x760)
![Qualitätsprüfung](/images/about/quality-management.webp 1200x760)
Konformitätsunterlagen: Werkstoff- und Konformitätsdokumente wie RoHS-Berichte für Schläuche sind auf Anfrage erhältlich.
Unternehmensqualifikationen: Das 2012 gegründete Unternehmen FOREACH ist in China als spezialisiertes und innovatives „Little Giant“-Unternehmen auf nationaler Ebene sowie als „Gazelle Enterprise“ in Shenzhen anerkannt. Es betreibt ein Forschungszentrum für Ingenieurtechnik in Guangdong.
![Spezialisiertes und innovatives „Little Giant“-Unternehmen](/images/about/foreach/honors/honor-row2-little-giant.webp 692x460)
![„Gazelle Enterprise“ in Shenzhen](/images/about/foreach/honors/honor-row2-gazelle.webp 634x460)
![Forschungszentrum für Ingenieurtechnik in Guangdong](/images/about/foreach/honors/honor-row2-engineering-center.webp 756x460)`],
      ["Kontakt nach der Messe", `Wenn Sie für ein Seriengerät einen zweiten Lieferanten suchen oder Pumpen, Ventile und Fluidikanschlüsse für ein neues Projekt auswählen, hilft Ihnen unser Team gerne weiter.

Nennen Sie in Ihrer Anfrage die gewünschten Produkte oder vorhandenen Teilenummern und Ihr Anliegen, etwa die Prüfung von Alternativen, eine Musterprüfung oder ein Lieferantenaudit.

[Kontakt zum FOREACH-Team](/de/contact/)`],
    ],
  ],
  "adlm-2026-team-departure": [
    "Treffen Sie FOREACH auf der ADLM 2026",
    "FOREACH stellt vom 26. bis 30. Juli 2026 auf der ADLM in Anaheim aus. Am Stand 4105 zeigen wir Präzisionskomponenten und Fluidiklösungen für IVD, Life Sciences, Analysengeräte und Laborautomation.",
    [
      ["Treffen Sie FOREACH in Anaheim", "Die ADLM 2026 findet vom 26. bis 30. Juli 2026 in Anaheim, Kalifornien, statt.\n\nAm Stand 4105 bespricht unser Team mit Geräteherstellern, Ingenieuren und Partnern Aufgaben der Fluidikregelung, Komponentenauswahl und Systemintegration."],
      ["Was wir zeigen", "Wir stellen Präzisionspumpen, Miniaturventile, Fluidik-Fittings, Schläuche, Drucksensoren, Module zur Blasenerkennung und kundenspezifische Fluidiklösungen vor.\n\nSie unterstützen präzise Dosierung, Flüssigkeitstransfer, Umschalten von Flüssigkeitswegen, Drucküberwachung, Blasenerkennung und zuverlässige Fluidikanschlüsse."],
      ["Technische Unterstützung für Geräteanwendungen", "FOREACH unterstützt Anwendungen in In-vitro-Diagnostik, Life Sciences, Analysengerätebau und Laborautomation.\n\nNeben der Komponentenlieferung unterstützt unser Technikteam die Beurteilung von Werkstoffen, die Produktauswahl, die Bewertung alternativer Bauteile und die Fluidikintegration."],
      ["Erfahrung in der präzisen Fluidikregelung", "FOREACH entwickelt und industrialisiert Präzisionsfluidik für Pumpen, Ventile, Sonden, Fittings, Schläuche, Sensoren und integrierte Systeme.\n\nIn China wurde das Unternehmen für spezialisierte Innovation und dynamisches Wachstum ausgezeichnet. Es investiert weiter in Entwicklung, technische Kompetenz und Fertigung."],
      ["Besuchen Sie Stand 4105", "Besuchen Sie uns für neue Komponenten, geeignete Alternativen oder Unterstützung bei Werkstoffverträglichkeit und Integration.\n\nVeranstaltung: ADLM 2026\nDatum: 26.–30. Juli 2026\nOrt: Anaheim, Kalifornien, USA\nStand: 4105\n\nWir freuen uns darauf, Sie in Anaheim zu treffen."],
    ],
  ],
  "quality-manufacturing-capability-2026": [
    "Von der technischen Validierung bis zur Lieferung: Fertigung und Qualitätssicherung bei FOREACH",
    "FOREACH verbindet Lieferantenkontrolle, technische Validierung, Produktion, Endprüfung, Auslieferung und Kundenfeedback im Qualitätsmanagement für mikrofluidische Komponenten.",
    [
      ["Qualität über den Produktlebenszyklus", "Mikrofluidische Komponenten sind kompakt und beeinflussen dennoch Durchfluss, Druck, Dichtheit und langfristige Gerätestabilität. Die Qualitätsanforderungen gelten vom Lieferantenmanagement über Werkstoffprüfung, technische Validierung und Montage bis zur Endprüfung und Lieferung."],
      ["Standardisierte Prozesse und digitale Aufzeichnungen", "PDM, ERP, MES und SVN unterstützen die Verwaltung wichtiger Werkstoffdaten, Prozessinformationen, Prüfprotokolle, Dokumentversionen und Lieferdaten. So lassen sich Informationen über den Produktlebenszyklus prüfen und zurückverfolgen."],
      ["Prüfung für eine zuverlässige Lieferung", "FOREACH verifiziert kritische Maße, Aussehen, Montagezustand, Dichtheit, Druck, Durchfluss und elektrische Funktion mit Präzisionsmessmitteln, speziellen Prüfvorrichtungen und Prozessaufzeichnungen."],
      ["Kontinuierliche Verbesserung für Kundenanwendungen", "Qualitätsabweichungen bei Wareneingang, Produktion, Endprüfung oder Kundeneinsatz werden erfasst. Es folgen die Kontrolle nichtkonformer Produkte, Ursachenanalyse, Korrekturmaßnahmen, Nachprüfung und Verbesserung."],
    ],
  ],
  "adlm-2026": [
    "FOREACH zeigt Fluidikkomponenten auf der ADLM 2026",
    "FOREACH präsentiert auf der ADLM 2026 Pumpen, Ventile, Fittings, Schläuche, Sensoren und weitere Fluidikkomponenten für IVD, Laborautomation und Life-Science-Geräte.",
    [
      ["Für IVD und Laborautomation", "Zum Messeangebot gehören Kolbenpumpen, Spritzenpumpen, Membranpumpen, Magnetventile, Drehventile, Fittings, Schläuche und Sensoren."],
      ["Zuverlässige Fluidik für die langfristige Integration", "FOREACH bespricht mit Kunden und Partnern die Produktauswahl, Werkstoffverträglichkeit, Systemintegration und Anforderungen ihrer Anwendungen."],
      ["Treffen Sie unser Team", "Wir laden Kunden aus IVD, Life Sciences, Laborautomation und Analysengerätebau ein, mit uns über Fluidikregelung, Anschlussintegration und Systemanforderungen zu sprechen."],
    ],
  ],
  "me-supply-chain-expo-2026": [
    "FOREACH auf der ME Supply Chain Expo 2026",
    "FOREACH stellt auf der ME Supply Chain Expo 2026 am Stand 2-M46 zentrale Produkte, technische Kompetenzen und Lösungen für unterschiedliche Anwendungen vor.",
    [
      ["Informationen zur Messe", "FOREACH nimmt an der ME Supply Chain Expo 2026 im Shenzhen World Exhibition & Convention Center in China teil. Unser Stand ist 2-M46."],
      ["Was wir zeigen", "Besucher können sich über zentrale Produkte, technische Kompetenzen und Lösungen für unterschiedliche Anwendungen informieren und unser Leistungsangebot kennenlernen."],
      ["Austausch vor Ort", "Am Stand 2-M46 sprechen wir mit Ihnen über Produktanwendungen, Marktanforderungen und Möglichkeiten der Zusammenarbeit."],
    ],
  ],
  "guangzhou-high-med-expo-2026": [
    "Einladung zur Guangzhou High Medical Expo 2026",
    "FOREACH stellt vom 30. März bis zum 1. April auf der Guangzhou High Medical Expo 2026 am Stand B529 aus.",
    [
      ["Informationen zur Messe", "FOREACH ist vom 30. März bis zum 1. April 2026 auf der Guangzhou High Medical Expo im Guangzhou Airport Expo Center in China vertreten. Unser Stand ist B529."],
      ["Produkte und Lösungen", "Wir präsentieren zentrale Produkte, technische Kompetenzen und Lösungen für Branchenanwendungen. Besucher können sich über Produkteigenschaften und unsere Lösungen informieren."],
      ["Besuchen Sie Stand B529", "Wir laden Kunden, Partner und Fachleute ein, mit uns über Anwendungsanforderungen, Produktauswahl und Zusammenarbeit zu sprechen."],
    ],
  ],
  "caclp-2026": [
    "Einladung: Treffen Sie FOREACH auf der CACLP 2026",
    "FOREACH stellt vom 21. bis 23. März auf der CACLP 2026 am Stand 2-0424 aus.",
    [
      ["Informationen zur Messe", "FOREACH nimmt vom 21. bis 23. März 2026 an der CACLP im Xiamen International Expo Center in China teil. Unser Stand ist 2-0424."],
      ["Was wir zeigen", "Am Stand stellen wir Kernprodukte, technische Kompetenzen und Branchenlösungen vor. Dort erfahren Sie mehr über Produkteigenschaften und unser Leistungsangebot."],
      ["Besuchen Sie Stand 2-0424", "Wir laden Kunden, Partner und Branchenfachleute zum Austausch über Produkte und Möglichkeiten der Zusammenarbeit ein."],
    ],
  ],
  "whx-labs-dubai-2026": [
    "FOREACH auf der WHX Labs Dubai 2026",
    "FOREACH präsentiert an Stand H2.F34 zentrale Fluidikprodukte, technische Kompetenzen und Anwendungslösungen.",
    [
      ["Informationen zur Messe", "FOREACH stellt vom 10. bis 13. Februar 2026 auf der WHX Labs Dubai im Dubai World Trade Centre in den Vereinigten Arabischen Emiraten aus. Unser Stand ist H2.F34."],
      ["Internationaler Austausch", "Die Messe dient dem Austausch mit internationalen Kunden und Partnern. Wir zeigen Kernprodukte, technische Kompetenzen und Lösungen für verschiedene Anwendungen."],
      ["Treffen Sie unser Team", "Besucher können mit uns über Produkteigenschaften, Anwendungen, kundenspezifische Anforderungen und Formen der Zusammenarbeit sprechen."],
    ],
  ],
  "specialized-new-conference-2025": [
    "FOREACH auf der Konferenz für spezialisierte und innovative KMU 2025",
    "FOREACH nahm als eines der eingeladenen Unternehmen aus Shenzhen an der Entwicklungskonferenz für spezialisierte und innovative KMU 2025 teil.",
    [
      ["Als Vertreter aus Shenzhen eingeladen", "Die Konferenz wurde am 12. November in Chongqing eröffnet. FOREACH nahm als eines der ausgewählten Unternehmen aus Shenzhen teil."],
      ["Delegation aus Shenzhen", "Zur Delegation gehörten Vertreter der Regierung, von Branchenorganisationen und von national anerkannten spezialisierten und innovativen „Little Giant“-Unternehmen."],
      ["Weiterer Schwerpunkt auf Mikrofluidik", "Als national anerkanntes spezialisiertes und innovatives „Little Giant“-Unternehmen konzentriert sich FOREACH weiterhin auf mikrofluidische Kernkomponenten, technische Systemunterstützung und anwendungsbezogene Innovation."],
    ],
  ],
  "medical-device-innovation-2025": [
    "Einladung zur Medical Device Innovation Expo 2025",
    "FOREACH stellt vom 21. bis 23. August auf der Medical Device Innovation Expo 2025 am Stand B36 aus.",
    [
      ["Informationen zur Messe", "FOREACH nimmt vom 21. bis 23. August 2025 an der Medical Device Innovation Expo im Suzhou International Expo Center in China teil. Unser Stand ist B36."],
      ["Produktpräsentation", "Wir zeigen zentrale Produkte, technische Kompetenzen und Branchenlösungen. Besucher können sich über Eigenschaften und unser Leistungsangebot informieren."],
      ["Besuchen Sie Stand B36", "Wir laden Kunden, Partner und Fachleute ein, sich über Branchentrends, Anwendungsanforderungen und Möglichkeiten der Zusammenarbeit auszutauschen."],
    ],
  ],
  "gazelle-enterprise-2025": [
    "FOREACH als „Gazelle Enterprise“ anerkannt",
    "FOREACH wurde aufgrund seiner Innovationsfähigkeit, Wachstumsdynamik und Marktleistung als „Gazelle Enterprise“ anerkannt.",
    [
      ["Anerkennung für Wachstum und Innovation", "Die Auszeichnung als „Gazelle Enterprise“ würdigt die Innovationsfähigkeit, Wachstumsdynamik und Marktleistung von FOREACH."],
      ["Schwerpunkt auf präziser Mikrofluidik", "FOREACH entwickelt und industrialisiert Technologien zur präzisen Mikrofluidikregelung für medizinische Diagnostik, Umweltüberwachung, Laborausrüstung, Life Sciences und synthetische Biologie."],
      ["Weiterentwicklung für Kundenanwendungen", "FOREACH entwickelt Pumpen, Ventile, Sonden, Fittings, Sensoren und die technische Systemunterstützung weiter, um Kunden verlässlich zu beliefern und zu betreuen."],
    ],
  ],
  "guangming-quality-cultivation-2024": [
    "FOREACH besteht die Prüfung des Qualitätsförderprogramms im Bezirk Guangming",
    "FOREACH bestand 2024 die Prüfung des Qualitätsförderprogramms im Bezirk Guangming. Das Ergebnis würdigt Fortschritte im Qualitätsmanagement und in der Technologieentwicklung.",
    [
      ["Programmprüfung bestanden", "FOREACH bestand 2024 die Prüfung des Qualitätsförderprogramms im Bezirk Guangming. Gewürdigt wurden der Ausbau des Qualitätsmanagements, Technologieinnovation und kontinuierliche Verbesserungen."],
      ["Kontinuierliche Verbesserung des Qualitätsmanagements", "Das Qualitätsmanagement bildet eine Grundlage für die zuverlässige Lieferung mikrofluidischer Kernkomponenten. FOREACH baut sein Qualitätsmanagement und sein Serviceangebot weiter aus."],
      ["Unterstützung für Kunden", "FOREACH unterstützt Kunden aus IVD, Life Sciences, Laborautomation und verwandten Bereichen weiterhin mit zuverlässigen Produkten und technischer Betreuung."],
    ],
  ],
  "national-little-giant-2024": [
    "FOREACH als nationales „Little Giant“-Unternehmen anerkannt",
    "FOREACH erhielt für Spezialisierung, Technologieentwicklung und Innovation in der Mikrofluidik eine Anerkennung auf nationaler Ebene in China.",
    [
      ["Nationale Anerkennung", "FOREACH wurde in die nationale Liste spezialisierter und innovativer „Little Giant“-Unternehmen aufgenommen. Damit werden die Spezialisierung und Innovationsfähigkeit in der Mikrofluidikregelung gewürdigt."],
      ["Langfristiger Schwerpunkt auf Fluidikkomponenten", "FOREACH entwickelt Pumpen, Ventile, Sonden, Sensoren, Fittings und Leitungskomponenten und unterstützt die Fluidikintegration in IVD, Life Sciences, Laborautomation und Analysengeräten."],
      ["Technische Kompetenz für Kundenanwendungen", "Die Anerkennung würdigt die Spezialisierung und Innovation des Unternehmens. FOREACH entwickelt Produktentwicklung, Fertigung, Qualitätssicherung und technische Unterstützung weiter."],
    ],
  ],
  "iso-9001-certification": [
    "FOREACH erhält die Zertifizierung nach ISO 9001",
    "Die ISO-9001-Zertifizierung stärkt standardisierte Abläufe bei Produktentwicklung, Fertigung, Prüfung, Lieferung und kontinuierlicher Verbesserung.",
    [
      ["Standardisiertes Qualitätsmanagementsystem", "Die ISO-9001-Zertifizierung bietet FOREACH einen strukturierten Rahmen für Qualitätsziele, Prozesslenkung, Dokumentenmanagement, interne Audits und kontinuierliche Verbesserung."],
      ["Unterstützung von Entwicklung, Fertigung und Lieferung", "Qualitätsanforderungen gelten für Anforderungsprüfung, Entwicklung, Lieferantenmanagement, Fertigung, Zwischenprüfung, Endfreigabe und Kundenfeedback."],
      ["Kontinuierliche Verbesserung für Kunden", "Mit Prozessaufzeichnungen, nachvollziehbarer Bearbeitung von Abweichungen und Verbesserungsmaßnahmen stärkt FOREACH die Produktkonsistenz, Lieferzuverlässigkeit und Reaktionsfähigkeit."],
    ],
  ],
  "iso-13485-certification": [
    "FOREACH erhält die Zertifizierung nach ISO 13485",
    "Die Zertifizierung nach ISO 13485 stärkt Prozesslenkung, Dokumentation, Rückverfolgbarkeit und kontinuierliche Verbesserung bei Kundenprojekten in Medizintechnik, IVD und Life Sciences.",
    [
      ["Qualitätsmanagement für Medizinprodukte", "ISO 13485 legt Qualitätsmanagementanforderungen für Medizinprodukte und zugehörige Dienstleistungen fest. Bei FOREACH stärkt die Zertifizierung Risikobewusstsein, Dokumentation, Prozesslenkung, Qualitätsaufzeichnungen und kontinuierliche Verbesserung."],
      ["Unterstützung von IVD- und Life-Science-Projekten", "Fluidikpumpen, Ventile, Sensoren, Sonden, Fittings und Leitungsbaugruppen kommen in IVD-, Life-Science- und Laborgeräten zum Einsatz. Ein strukturiertes Qualitätsmanagementsystem unterstützt Lieferantenaudits, Projekteinführungen, Chargenmanagement und Rückverfolgbarkeit."],
      ["Prozesslenkung und Rückverfolgbarkeit", "Produktanforderungen, Designvalidierung, Lieferantenmanagement, Fertigung, Prüffreigabe und Umgang mit Nichtkonformitäten werden durch dokumentierte Qualitätsprozesse gelenkt."],
      ["Geltungsbereich der Zertifizierung", "Die ISO-13485-Zertifizierung gilt für das Qualitätsmanagementsystem. Sie bescheinigt keine separate Medizinprodukteregistrierung oder individuelle Produktzertifizierung für jedes FOREACH-Produkt."],
    ],
  ],
  "cmef-icmd-2014": [
    "FOREACH schließt die CMEF & ICMD Herbst 2014 erfolgreich ab",
    "FOREACH präsentierte auf der CMEF & ICMD Herbst 2014 neue Produktreihen und besprach mit Kunden Anwendungen mikrofluidischer Systeme.",
    [
      ["Erfolgreicher Messeauftritt", "Auf der CMEF & ICMD Herbst 2014 stellte FOREACH weiterentwickelte Produkte und neue Produktreihen vor. Zahlreiche Besucher und Kunden informierten sich am Stand."],
      ["Fachlicher Austausch", "Auf dem Forum für technologische Innovation bei kundenspezifischen Dienstleistungen in der Medizinproduktefertigung stellte FOREACH technische Ansätze vor und diskutierte Branchenaufgaben und Lösungen."],
      ["Unterstützung für IVD und verwandte Bereiche", "Kunden informierten sich über Produktreihen und die Unterstützung bei mikrofluidischen Systemen. FOREACH betreut IVD und verwandte Branchen weiterhin mit Produkten und technischen Dienstleistungen."],
    ],
  ],
};

function translateArticle(article: NewsArticle): NewsArticle {
  if (article.slug === "adlm-2026-onsite") return getAdlm2026OnsiteArticle("de");
  const copy = Object.hasOwn(articles, article.slug)
    ? articles[article.slug as GermanOverlaySlug]
    : undefined;
  if (!copy) return article;
  const [title, summary, sections] = copy;
  return {
    ...article,
    title,
    summary,
    coverAlt: article.slug === "medica-2026" ? "Eingang zum Messegelände Düsseldorf" : title,
    seoTitle: title,
    seoDescription: summary,
    content: sections.map(([title, content]) => ({ title, content })),
  };
}

export function localizeNewsToGerman(englishPage: NewsPageData): NewsPageData {
  return {
    ...englishPage,
    locale: "de",
    hero: {
      ...englishPage.hero,
      title: "Unternehmensnachrichten",
      description: "Aktuelles zu Messen, Unternehmensentwicklung, technischen Neuerungen, Qualitätsmanagement und wichtigen Mitteilungen von FOREACH.",
    },
    breadcrumbs: [
      { label: "Startseite", href: "/de/" },
      { label: "Ressourcen", href: "/de/resources/" },
      { label: "Unternehmensnachrichten" },
    ],
    search: { placeholder: "Nachrichten durchsuchen" },
    categories: [
      { key: "all", label: "Alle" },
      { key: "exhibition", label: "Messen" },
      { key: "company", label: "Unternehmensmeldungen" },
      { key: "notice", label: "Mitteilungen" },
    ],
    sectionTitle: "Aktuelle Meldungen",
    articles: englishPage.articles.map(translateArticle),
    bottomBanner: {
      title: "Kontakt zum FOREACH-Team",
      description: "Bei Fragen zu Produkten, Anwendungen oder einer Zusammenarbeit hilft Ihnen unser Team weiter.",
      actions: englishPage.bottomBanner.actions.map((action) => ({
        ...action,
        label: action.label === "Contact Us" ? "Kontakt aufnehmen" : "Produkte ansehen",
        href: action.href.replace(/^\/en(?=\/|$)/, "/de"),
      })),
    },
  };
}
