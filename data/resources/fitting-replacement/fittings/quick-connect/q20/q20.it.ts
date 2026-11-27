const breadcrumbs = [
  { label: "Home", href: "/it" },
  { label: "Risorse", href: "/it/resources" },
  { label: "Ricerca di raccordi compatibili", href: "/it/resources/selection-support/fitting-replacement" },
];

export const fittingReplacementHomeIt = {
  banner: {
    eyebrow: "Risorse",
    title: "Ricerca di raccordi compatibili",
    description: "Inserisci il codice del modello in uso per trovare i prodotti FOREACH compatibili.",
  },
  breadcrumbs,
  search: { placeholder: "Inserisci un modello compatibile", buttonText: "Cerca" },
  homeText: {
    tabs: { replace: "Ricerca di modelli compatibili", guide: "" },
    history: { label: "Esempi" },
    guide: {
      title: "Guida alla scelta dei raccordi",
      description: "Seleziona la misura del tubo, il tipo di attacco, il montaggio, la configurazione della valvola e il materiale. Il sistema filtra i modelli corrispondenti.",
      clearButton: "Azzera le selezioni",
      resultTitle: "Modelli corrispondenti",
      emptyBeforeSelection: "Seleziona i requisiti per visualizzare i modelli corrispondenti.",
      selectedResultTemplate: "{selectedCount} requisiti selezionati, {matchCount} modelli corrispondenti.",
      noMatchText: "Non ci sono modelli che soddisfano tutti i requisiti. Prova a ridurre il numero di filtri.",
    },
    productSection: {
      title: "Prodotti compatibili",
      description: "Inserisci un modello compatibile per vedere i prodotti corrispondenti e aggiungerli all’elenco.",
      countTemplate: "Da {start} a {end} di {total} prodotti",
    },
    productCard: {
      productName: "Raccordo FOREACH", productCode: "Codice prodotto:", foreachModel: "Modello FOREACH:",
      compatibleModels: "Modelli compatibili:", viewDetail: "Vedi dettagli",
      addToCart: "Aggiungi all’elenco", addedToCart: "Aggiunto",
    },
    emptyResult: {
      title: "Nessun modello compatibile trovato",
      description: "Verifica il codice completo del modello oppure invia il modello in uso, il disegno e una foto del prodotto per una verifica tecnica.",
    },
    pagination: { previous: "Indietro", next: "Avanti" },
  },
};

export const fittingReplacementDetailIt = {
  breadcrumbs,
  tableLabels: { productCode: "Codice prodotto", compatibleModels: "Modelli compatibili" },
  actions: {
    addToCart: "Aggiungi all’elenco", addedToCart: "Aggiunto",
    addDrawing: "Aggiungi il disegno", addedDrawing: "Disegno aggiunto",
  },
  drawingPreview: {
    title: "Disegno 2D",
    iframeTitle: "Anteprima del disegno 2D",
    loadingLabel: "Caricamento del disegno 2D…",
    previewButton: "Anteprima del disegno",
    description: "Per richiedere il file del disegno, aggiungilo all’elenco.",
    errorLabel: "Impossibile caricare il disegno. Aggiorna la pagina e riprova.",
    pageLabel: "Pagina",
    retryLabel: "Riprova",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Domande frequenti",
    description: "Indicazioni su modelli compatibili, anteprima e richiesta dei disegni e invio dell’elenco.",
    items: [
      {
        question: "Qual è la differenza tra visualizzare l’anteprima e aggiungere un disegno?",
        answer: "Nell’anteprima puoi vedere online la struttura e le quote. Aggiungendo il disegno indichi che desideri ricevere il disegno 2D ufficiale quando invii l’elenco dei prodotti selezionati.",
      },
      {
        question: "Perché il disegno non è scaricabile direttamente?",
        answer: "I disegni vengono preparati per i modelli che aggiungi all’elenco e per i quali richiedi il file. In questo modo si evita di scaricare il modello sbagliato. I file possono poi essere forniti tramite un modulo di richiesta, via e-mail o in un pacchetto di documenti.",
      },
      {
        question: "Posso selezionare più modelli insieme?",
        answer: "Sì. Puoi aggiungere più modelli allo stesso elenco e indicare separatamente per ciascuno se ti serve il disegno 2D.",
      },
    ],
  },
};

export const italianReplacementFieldText: Record<string, string> = {
  Series: "Serie",
  "Tube Size or Thread": "Misura del tubo o filettatura",
  "Male/Female": "Maschio o femmina",
  "Panel Mount": "Montaggio a pannello",
  Valved: "Con valvola",
  Shape: "Forma",
  "Housing Material": "Materiale del corpo",
  "Sealing Ring Material": "Materiale dell’anello di tenuta",
  "Q20 Quick Disconnect Coupling": "Innesto rapido Q20",
  Male: "Maschio",
  Female: "Femmina",
  "Non Panel Mount": "Senza montaggio a pannello",
  "Non-Valved": "Senza valvola",
  "In-line": "Diritto",
  Elbow: "A gomito",
};
