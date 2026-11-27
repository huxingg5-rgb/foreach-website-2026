import { buildContactIntlData, getContactIntlData, type ContactIntlText } from "./contact.intl";

const requestTypes = {
  quotation: "Informazioni sui prodotti e preventivi",
  documents: "Documentazione e disegni",
  selection: "Assistenza tecnica e scelta dei componenti",
  sample: "Prove su campioni",
  afterSales: "Assistenza post-vendita e segnalazioni sulla qualità",
  other: "Altra richiesta",
};

const address = "13° piano, edificio 2, Yufengda Industrial Park, n. 1008 Guangqiao Avenue, distretto di Guangming, Shenzhen, Cina";

const copy: ContactIntlText = {
  seoTitle: "Contatti | Foreach Technology",
  seoDescription:
    "Contatta Foreach per la scelta dei prodotti, l’assistenza tecnica, le prove su campioni, i disegni, la verifica delle distinte base e i progetti di microfluidica.",

  heroTitleFirstLine: "Contatta Foreach",
  heroTitlePrefix: "per la",
  heroHighlightText: "scelta dei prodotti",
  heroTitleSuffix: "e l’assistenza tecnica",
  heroImageAlt: "Assistenza tecnica Foreach per la scelta e l’integrazione di componenti microfluidici",

  supportTitle: "Come possiamo aiutarti",
  supportDescription:
    "Foreach ti affianca dalla valutazione iniziale all’avvio del progetto con assistenza nella scelta dei prodotti, richieste di documentazione, prove su campioni, valutazione delle soluzioni, personalizzazione e assistenza post-vendita.",
  supportItems: [
    {
      title: "Assistenza nella scelta dei prodotti",
      description:
        "Indichiamo i prodotti adatti in base a portata, pressione, fluido, connessioni, durata, modalità di comando e requisiti di installazione.",
      requestType: requestTypes.selection,
    },
    {
      title: requestTypes.documents,
      description:
        "Richiedi schede tecniche, cataloghi, quote di installazione, informazioni sulle connessioni e guide alla scelta.",
      requestType: requestTypes.documents,
    },
    {
      title: "Assistenza per le prove su campioni",
      description:
        "Ti aiutiamo a verificare i campioni, confermare i parametri e valutare i risultati delle prove applicative per ridurre i rischi nella scelta iniziale.",
      requestType: requestTypes.sample,
    },
    {
      title: "Valutazione delle soluzioni fluidiche",
      description: "Valutiamo come abbinare pompe, valvole, tubi, sensori e altri componenti del circuito fluidico.",
      requestType: requestTypes.selection,
    },
    {
      title: "Requisiti di personalizzazione",
      description: "Valutiamo la fattibilità di requisiti particolari per struttura, connessioni, materiali o modalità di comando.",
      requestType: requestTypes.quotation,
    },
    {
      title: "Assistenza post-vendita",
      description: "Forniamo assistenza per installazione e utilizzo, indicazioni di manutenzione e supporto per problemi e segnalazioni sulla qualità.",
      requestType: requestTypes.afterSales,
    },
  ],

  formTitle: "Invia una richiesta",
  formDescription: "Inserisci il tuo nome, il nome dell’azienda e l’indirizzo e-mail. Tutti gli altri campi sono facoltativi.",
  formPanelTitle: "Modulo di richiesta",
  fileTip: "Puoi allegare disegni, PDF, distinte base, immagini e altri documenti. Ogni file può avere una dimensione massima di 20 MB.",
  submitButton: "Invia la richiesta",
  uploadButton: "Carica file",

  emailLabel: "E-mail",
  emailPlaceholder: "Inserisci il tuo indirizzo e-mail",
  emailSendButton: "Invia codice",
  emailCodePlaceholder: "Inserisci il codice di verifica",
  emailVerifyButton: "Verifica",
  emailTip: "La verifica dell’indirizzo e-mail è obbligatoria.",
  emailCodeSentTip: "Codice di verifica inviato. Codice di prova: ",
  emailInvalidCodeTip: "Codice di verifica errato. Codice di prova: ",
  emailVerifiedTip: "Indirizzo e-mail verificato.",

  nameLabel: "Nome",
  namePlaceholder: "Inserisci il tuo nome",
  companyLabel: "Nome dell’azienda",
  companyPlaceholder: "Inserisci il nome dell’azienda",
  phoneLabel: "Telefono / WhatsApp",
  phonePlaceholder: "Facoltativo, per comunicazioni più rapide",
  targetModelLabel: "Modello richiesto / modello concorrente",
  targetModelPlaceholder: "Modello richiesto o modello concorrente da sostituire",
  messageLabel: "Descrizione dei requisiti",
  messagePlaceholder: "Descrivi l’applicazione, il prodotto richiesto, i parametri principali o la documentazione che ti occorre.",

  optionalLabel: "(facoltativo)",
  requestTypeLabel: "Tipo di richiesta",
  productTypeLabel: "Prodotto richiesto / tipo di componente",
  projectStageLabel: "Fase attuale del progetto",

  productTypePlaceholder: "Seleziona il tipo di prodotto principale",
  projectStagePlaceholder: "Seleziona la fase attuale",

  removeFile: "Rimuovi",
  emailVerifiedButton: "Verificato",
  resendCountdownSuffix: " s per inviare di nuovo il codice",
  retryCountdownSuffix: " s per riprovare",

  emailRequiredAlert: "Inserisci prima il tuo indirizzo e-mail.",
  invalidEmailAlert: "Inserisci un indirizzo e-mail valido.",
  sendCodeFirstAlert: "Richiedi prima il codice di verifica via e-mail.",
  codeRequiredAlert: "Inserisci il codice di verifica ricevuto via e-mail.",
  verifyEmailFirstAlert: "Seleziona «Verifica» e completa la verifica dell’e-mail prima di inviare la richiesta.",
  popupBlockedAlert: "Il browser ha bloccato la nuova finestra. Consenti le finestre popup e invia di nuovo la richiesta.",
  fileTooLargePrefix: "Il file «",
  fileTooLargeSuffix: "» supera 20 MB. Scegli un altro file.",

  mapLoading: "Caricamento della mappa…",
  mapError: "La mappa non è disponibile. Verifica la chiave della mappa, i domini autorizzati o la connessione.",
  openMap: "Apri in Amap",

  successTitle: "Richiesta inviata",
  successDescription: "Abbiamo ricevuto la tua richiesta e risponderemo entro 24 ore nei giorni lavorativi.",
  successPdfTip: "Se si è aperta l’anteprima PDF, puoi salvare o stampare il modulo seguendo le indicazioni del browser.",
  successCloseButton: "Ho capito",

  pdfDocumentTitle: "Richiesta di contatto",
  pdfDocumentSubtitle: "Conferma dei requisiti del cliente",
  pdfRequestNumber: "N. richiesta",
  pdfCreatedAt: "Data di creazione",
  pdfSource: "Origine",
  pdfSourceValue: "Modulo di contatto del sito",
  pdfCustomerInfo: "1. Dati del cliente",
  pdfRequirementInfo: "2. Dati della richiesta",
  pdfRequirementDescription: "3. Descrizione dei requisiti",
  pdfAttachmentList: "4. Elenco degli allegati",
  pdfNotFilled: "Non indicato",
  pdfNotSelected: "Non selezionato",
  pdfNoAttachment: "Nessun allegato caricato",
  pdfIndex: "N.",
  pdfAttachmentName: "Nome dell’allegato",
  pdfAttachmentType: "Tipo",
  pdfAttachmentSize: "Dimensione",
  pdfFooterNote: "Questo documento serve per comunicare i requisiti, seguire internamente la richiesta e archiviare la documentazione.",
  pdfPrintTip: "Puoi salvare il modulo di richiesta in formato PDF.",

  requestTypes: Object.values(requestTypes),
  productGroups: [
    {
      groupName: "Pompe",
      options: ["Pompa a membrana", "Pompa a siringa", "Pompa per pipettaggio", "Pompa a pistone in ceramica"],
    },
    {
      groupName: "Valvole",
      options: ["Elettrovalvola", "Valvola a pinza per tubi flessibili", "Valvola rotativa", "Valvola ad alta pressione"],
    },
    {
      groupName: "Sensori e componenti fluidici",
      options: ["Sensore di pressione", "Rilevatore di bolle", "Modulo per conducibilità / TDS", "Tubi / raccordi / sonde di campionamento", "Assemblaggi di tubi per circuiti fluidici"],
    },
    {
      groupName: "Altro",
      options: ["Mi serve assistenza nella scelta", "Altro prodotto o requisito personalizzato"],
    },
  ],

  projectStages: [
    "Valutazione dei componenti", "Prove su campioni", "Sviluppo del progetto", "Avvio della produzione in serie",
    "Richiesta di documentazione", "Segnalazione post-vendita", "Altra fase",
  ],

  guideTitle: "Guida alla compilazione",
  guideDescription: "Includi le informazioni qui sotto per aiutarci a individuare rapidamente i componenti e il supporto più adatti.",
  guideItems: [
    {
      title: "Applicazione",
      description: "Ad esempio diagnostica in vitro (IVD), scienze della vita, strumenti di analisi, automazione di laboratorio o biologia sintetica.",
    },
    {
      title: "Prodotto richiesto",
      description: "Ad esempio pompa a membrana, a siringa, per pipettaggio o a pistone, elettrovalvola, valvola rotativa o sensore.",
    },
    {
      title: "Parametri principali",
      description: "Ad esempio fluido, portata, pressione, connessioni, dimensioni, durata, modalità di comando e spazio di installazione.",
    },
    {
      title: "Fase attuale del progetto",
      description: "Ad esempio scelta dei componenti, prove su campioni, sviluppo, avvio della produzione in serie, documentazione o assistenza post-vendita.",
    },
    {
      title: "Allegati",
      description: "Puoi caricare disegni, specifiche in PDF, distinte base, foto dell’impianto o informazioni sui modelli concorrenti.",
    },
  ],
  guideNote: "Se i parametri non sono ancora completi, inizia descrivendo l’applicazione dell’apparecchiatura e la funzione desiderata.",

  contactInfoTitle: "Recapiti",
  contactInfoDescription: "Contattaci per telefono o e-mail. Per una visita, consulta l’indirizzo della sede.",
  companyName: "Shenzhen Foreach Technology Co., Ltd.",
  companyPosition: "Fornitore di componenti per la microfluidica e soluzioni per circuiti fluidici",
  contactRows: [
    { label: "Tel.", value: "0755-8655 3831" },
    { label: "E-mail", value: "sales@foreachtek.com" },
    { label: "Sito web", value: "www.foreachtek.com" },
    { label: "Indirizzo", value: address },
    { label: "Orari", value: "Da lunedì a venerdì 08:30 - 18:00" },
  ],
  mapTitle: "Dove siamo",
  mapAddress: address,

  bottomCtaTitle: "Ti serve aiuto nella scelta dei prodotti o assistenza tecnica?",
  bottomCtaDescription: "Descrivici l’applicazione e i requisiti del prodotto. Ti aiuteremo a valutare i componenti più adatti.",
  bottomCtaFormButton: "Invia una richiesta",
  bottomCtaContactButton: "Consulta i recapiti",
};

const data = buildContactIntlData("it", copy);
const englishForm = getContactIntlData("en").form;

function mapSubmissionValues(labels: readonly string[], values: readonly string[]) {
  return Object.fromEntries(labels.map((label, index) => [label, values[index]]));
}

export const contactItData = {
  ...data,
  form: {
    ...data.form,
    submissionValues: {
      requestType: mapSubmissionValues(copy.requestTypes, englishForm.requestTypes),
      productType: mapSubmissionValues(
        copy.productGroups.flatMap(group => group.options),
        englishForm.productGroups.flatMap(group => group.options),
      ),
      projectStage: mapSubmissionValues(copy.projectStages, englishForm.projectStages),
    },
  },
};
