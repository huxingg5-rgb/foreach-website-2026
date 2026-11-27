import type { ApplicationIndexCopy } from './types';

export const it: ApplicationIndexCopy = {
  seoTitle: 'Componenti fluidici per applicazione | FOREACH',
  seoDescription: 'Pompe, valvole, sonde, tubazioni e raccordi per strumenti e apparecchiature industriali. Consulta le guide alle applicazioni e ai flussi di lavoro.',
  heroEyebrow: 'FOREACH · Applicazioni',
  heroTitle: 'Componenti fluidici',
  heroHighlight: 'per applicazione',
  heroDescription: 'Pompe, valvole, sonde, tubazioni e raccordi per la manipolazione di precisione dei liquidi in strumenti e apparecchiature industriali.',
  heroImageAlt: 'Personale di laboratorio al lavoro con strumenti diagnostici',
  breadcrumbHome: 'Home',
  breadcrumbCurrent: 'Applicazioni',
  breadcrumbAriaLabel: 'Navigazione tra le applicazioni',
  heading: 'Trova lo strumento o il flusso di lavoro di tuo interesse',
  intro: 'Scegli un ambito per esaminare i circuiti fluidici dello strumento, le funzioni dei componenti e le condizioni che ne guidano la selezione. Queste guide aiutano i team OEM a confrontare le configurazioni e a pianificare la validazione. Inviaci lo schema fluidico, i fluidi utilizzati e i requisiti operativi per valutare una soluzione standard o personalizzata.',
  topicNavLabel: 'Strumenti e attività tipici per {area}',
  detailsLabel: 'Esplora: {area}',
  detailsAriaLabel: 'Consulta tutte le guide per {area}',
  guidanceHeading: 'Da dove iniziare?',
  guidanceIntro: 'Parti dallo strumento o dall’attività che stai sviluppando. Consulta gli ambiti correlati quando il progetto interessa anche altre parti del circuito fluidico.',
  choiceTitles: [
    'Analisi e monitoraggio delle acque',
    'Flussi di lavoro diagnostici e di ricerca',
    'Stazioni di lavoro e sistemi di coltura',
  ],
  choiceLabels: [
    [
      'Sistemi di monitoraggio in linea: campionamento sul campo, trasferimento del campione e manutenzione',
      'Analizzatori per acque: dosaggio e reazioni con i reagenti all’interno dello strumento',
    ],
    [
      'Analizzatori clinici e sistemi di diagnostica molecolare',
      'Sistemi di ricerca per la preparazione di acidi nucleici, cellule e proteine',
    ],
    [
      'Sistemi di manipolazione dei liquidi, stazioni per micropiastre e dosatori di reagenti',
      'Screening di ceppi, microbioreattori, alimentazione delle colture e campionamento di processo',
    ],
  ],
  contactHeading: 'Parliamo del tuo strumento e dei requisiti fluidici',
  contactDescription: 'Indica il tipo di strumento, i fluidi utilizzati, i volumi o le portate di lavoro, le pressioni nelle diverse condizioni operative e le funzioni richieste. Possiamo valutare le configurazioni in base allo schema fluidico e agli obiettivi di validazione.',
  contactLabel: 'Parliamo della tua applicazione',
  areas: {
    ivd: {
      title: 'Diagnostica in vitro (IVD)',
      description: 'Dosaggio di campioni e reagenti, lavaggio delle sonde e gestione degli scarichi negli analizzatori clinici.',
      imageAlt: 'Strumento per la diagnostica in vitro che elabora provette di campione',
      topics: ['Chimica clinica', 'Immunodosaggi', 'Ematologia', 'Coagulazione', 'Diagnostica molecolare'],
    },
    'life-science': {
      title: 'Scienze della vita',
      description: 'Aggiunta di reagenti, trasferimento di liquidi e commutazione tra soluzioni tampone nei flussi di lavoro con acidi nucleici, cellule e proteine.',
      imageAlt: 'Ricerca nelle scienze della vita e trattamento dei campioni in laboratorio',
      topics: ['Preparazione degli acidi nucleici', 'Coltura e trasferimento di cellule', 'Proteine e anticorpi'],
    },
    'lab-automation': {
      title: 'Automazione di laboratorio',
      description: 'Pipettaggio, dispensazione di reagenti, lavaggio di micropiastre e gestione degli scarichi nelle stazioni automatizzate.',
      imageAlt: 'Piattaforma automatizzata di laboratorio per la manipolazione dei liquidi',
      topics: ['Pipettaggio automatizzato', 'Dispensazione e lavaggio delle micropiastre', 'Dispensazione di reagenti', 'Stazioni di preparazione dei campioni'],
    },
    'analytical-instruments': {
      title: 'Strumenti analitici',
      description: 'Introduzione del campione, diluizione, dosaggio dei reagenti e commutazione dei flussi all’interno degli strumenti analitici.',
      imageAlt: 'Strumenti analitici in un laboratorio di analisi dei campioni',
      topics: ['Cromatografia liquida', 'Analisi elementare', 'Analizzatori per la qualità dell’acqua', 'Preparazione dei campioni per l’analisi'],
    },
    'environmental-monitoring': {
      title: 'Monitoraggio ambientale',
      description: 'Trasferimento e condizionamento del campione, risciacquo e gestione degli scarichi nei sistemi di monitoraggio delle acque e dei gas di campionamento.',
      imageAlt: 'Apparecchiature per il monitoraggio in linea della qualità dell’acqua',
      topics: ['Campionamento delle acque in linea', 'Acque reflue industriali', 'Condizionamento del gas campione', 'Preparazione dei campioni ambientali'],
    },
    'synthetic-biology': {
      title: 'Biologia sintetica',
      description: 'Alimentazione di liquidi per lo screening dei ceppi, il mantenimento delle colture, il campionamento di processo e il risciacquo delle linee.',
      imageAlt: 'Ricerca in biologia sintetica e processi di coltura',
      topics: ['Microbioreattori', 'Biofoundry', 'Alimentazione continua', 'Campionamento in linea'],
    },
  },
};

export const italianInkjetIndexCopy = {
  title: 'Stampa industriale a getto d’inchiostro',
  description: 'Alimentazione, ritorno e ricircolo dell’inchiostro, pulizia delle testine e gestione dell’inchiostro di scarto nelle apparecchiature industriali di stampa a getto d’inchiostro.',
  imageAlt: 'Schema di serbatoi d’inchiostro, linea di alimentazione, filtro e pompa all’interno della stampante',
  topics: {
    supply: 'Pompe per il rabbocco dell’inchiostro',
    recirculation: 'Pompe per il ricircolo dell’inchiostro',
    cleaning: 'Pompe per l’inchiostro di scarto',
  },
  choiceTitle: 'Circuiti dell’inchiostro nelle stampanti industriali',
  choicePrompts: ['Segui le linee di alimentazione, ritorno e scarico', 'Analizza la perdita di pressione attraverso un filtro'],
  choiceDomains: { guide: 'Guida ai circuiti fluidici delle stampanti industriali a getto d’inchiostro', inkFiltration: 'Filtrazione dell’inchiostro per la stampa industriale a getto d’inchiostro' },
} as const;
