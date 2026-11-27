const breadcrumbs = [
  { label: "Startseite", href: "/de" },
  { label: "Ressourcen", href: "/de/resources" },
  { label: "Kompatible Fitting-Modelle finden", href: "/de/resources/selection-support/fitting-replacement" },
];

export const fittingReplacementHomeDe = {
  banner: {
    eyebrow: "Ressourcen",
    title: "Kompatible Fitting-Modelle finden",
    description: "Geben Sie die aktuell verwendete Modellnummer ein, um kompatible Produkte von FOREACH zu finden.",
  },
  breadcrumbs,
  search: { placeholder: "Kompatibles Modell eingeben", buttonText: "Suchen" },
  homeText: {
    tabs: { replace: "Suche nach kompatiblen Modellen", guide: "" },
    history: { label: "Beispielmodelle" },
    guide: {
      title: "Auswahlhilfe für Fittings",
      description: "Wählen Sie nacheinander Leitungsgröße, Anschlussart, Montageart, Ventilausführung und Werkstoff. Die passenden Modelle werden automatisch gefiltert.",
      clearButton: "Auswahl zurücksetzen", resultTitle: "Passende Modelle",
      emptyBeforeSelection: "Wählen Sie die Anforderungen oben aus, um passende Modelle zu finden.",
      selectedResultTemplate: "{selectedCount} Kriterien ausgewählt, {matchCount} passende Modelle gefunden.",
      noMatchText: "Kein genau passendes Modell gefunden. Verringern Sie die Zahl der Filter.",
    },
    productSection: {
      title: "Kompatible Produkte",
      description: "Geben Sie ein kompatibles Modell ein, um passende Produkte anzuzeigen und zur Merkliste hinzuzufügen.",
      countTemplate: "{start}–{end} von {total} Produkten",
    },
    productCard: {
      productName: "FOREACH Fitting", productCode: "Artikelnummer:", foreachModel: "FOREACH-Modell:",
      compatibleModels: "Kompatible Modelle:", viewDetail: "Details ansehen",
      addToCart: "Zur Merkliste hinzufügen", addedToCart: "Hinzugefügt",
    },
    emptyResult: {
      title: "Kein kompatibles Produkt gefunden",
      description: "Prüfen Sie die vollständige Modellnummer oder senden Sie Modellnummer, Zeichnung und Produktfoto zur technischen Prüfung.",
    },
    pagination: { previous: "Zurück", next: "Weiter" },
  },
};

export const fittingReplacementDetailDe = {
  breadcrumbs,
  tableLabels: { productCode: "Artikelnummer", compatibleModels: "Kompatible Modelle" },
  actions: {
    addToCart: "Zur Merkliste hinzufügen", addedToCart: "Hinzugefügt",
    addDrawing: "Zeichnung anfragen", addedDrawing: "Zeichnung vorgemerkt",
  },
  drawingPreview: {
    title: "2D-Zeichnung",
    iframeTitle: "Vorschau der 2D-Zeichnung",
    loadingLabel: "2D-Zeichnung wird geladen …",
    previewButton: "Zeichnung ansehen",
    description: "Merken Sie die Zeichnung in Ihrer Liste vor, um die Datei anzufragen.",
    errorLabel: "Die Zeichnung konnte nicht geladen werden. Laden Sie die Seite neu und versuchen Sie es erneut.",
    pageLabel: "Seite",
    retryLabel: "Erneut versuchen",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Häufig gestellte Fragen",
    description: "Hinweise zu Ersatzmodellen, Zeichnungsvorschau, Zeichnungsanfragen und zum Einreichen der Merkliste.",
    items: [
      {
        question: "Was ist der Unterschied zwischen Zeichnungsvorschau und einer Zeichnungsanfrage?",
        answer: "In der Vorschau sehen Sie Aufbau und Maße online. Wenn Sie die Zeichnung vormerken, bitten Sie beim Einreichen der Merkliste darum, die offizielle 2D-Zeichnung beizufügen.",
      },
      {
        question: "Warum gibt es hier keine Schaltfläche für den direkten Download?",
        answer: "Die Zeichnungen werden für die Modelle zusammengestellt, die Sie in der Merkliste für eine Zeichnungsanfrage markiert haben. So vermeiden Sie Verwechslungen. Die Unterlagen können anschließend über das Anfrageformular angefordert und per E-Mail oder als Dokumentenpaket bereitgestellt werden.",
      },
      {
        question: "Kann ich mehrere Modelle gleichzeitig auswählen?",
        answer: "Ja. Sie können mehrere Modelle zur selben Merkliste hinzufügen und für jedes Modell einzeln angeben, ob Sie eine 2D-Zeichnung benötigen.",
      },
    ],
  },
};

export const germanReplacementFieldText: Record<string, string> = {
  Series: "Baureihe",
  "Tube Size or Thread": "Leitungsgröße oder Gewinde",
  "Male/Female": "Kupplungshälfte",
  "Panel Mount": "Schottmontage",
  Valved: "Mit Absperrventil",
  Shape: "Bauform",
  "Housing Material": "Gehäusewerkstoff",
  "Sealing Ring Material": "Dichtringwerkstoff",
  "Q20 Quick Disconnect Coupling": "Q20-Schnellkupplung",
  Male: "Stecker",
  Female: "Kupplungsdose",
  "Non Panel Mount": "Ohne Schottmontage",
  "Non-Valved": "Ohne Absperrventil",
  "In-line": "Gerade",
  Elbow: "Winkel",
};
