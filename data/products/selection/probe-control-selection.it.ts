import { controlIntrosEn, probeIntrosEn, probeTypesEn, controlTypesEn } from "./probe-control-selection.en";
import type { FittingIntroZh } from "./fitting-headings.zh";

export const italianProbeControlOverview = {
  needles: {
    title: "Sonde, aghi e palette di agitazione",
    paragraphs: [
      "FOREACH sviluppa sonde di campionamento, sonde perforanti, sonde di lavaggio e palette di agitazione su disegno per analizzatori automatici e apparecchiature per la manipolazione di liquidi. Scegliete il componente in base alla funzione: aspirazione ed erogazione di campioni o reagenti, accesso a consumabili sigillati, lavaggio e rimozione degli scarti oppure miscelazione di liquidi di reazione.",
      "I componenti sono progettati a partire da disegni dello strumento o da campioni. Dimensioni delle sonde, geometria delle punte e delle aperture, estremità di fissaggio e forma delle palette dipendono dal contenitore, dal percorso fluidico e dallo spazio disponibile per il movimento. Per la configurazione e le condizioni di esercizio previste si valutano lucidatura, rivestimenti, saldatura e compatibilità con il rilevamento capacitivo del livello del liquido.",
    ],
  },
  control: {
    title: "Rilevatori di bolle d’aria e sensori di pressione per strumenti",
    paragraphs: [
      "FOREACH offre rilevatori di bolle d’aria e sensori di pressione per la diagnostica in vitro (IVD), le scienze della vita e la strumentazione analitica automatizzata. ABD rileva bolle, gocce e la presenza di aria o liquido nei tubi trasparenti. PDM5 misura la pressione nel circuito fluidico. I relativi segnali permettono al sistema di controllo dello strumento di verificare l’alimentazione del liquido, valutare eventuali ostruzioni e segnalare condizioni anomale.",
      "Scegliete il modulo in base alla condizione da monitorare, alla sua posizione nel circuito fluidico e all’interfaccia elettrica necessaria. ABD usa il rilevamento a infrarossi senza contatto. PDM5 usa un percorso fluidico in PEEK e comunica tramite I2C. Prima della convalida sullo strumento completo, verificate i requisiti dei tubi o degli attacchi, le condizioni di esercizio e la gestione del segnale del modello scelto.",
    ],
  },
};

type IntroText = { title: string; paragraphs: string[]; imageAlt: string; features: [title: string, description: string][] };
const localizedIntroText: Record<string, IntroText> = {
  "sampling-probes": {
    title: "Sonde di campionamento per la manipolazione automatizzata di liquidi",
    imageAlt: "Sonde di campionamento FOREACH su disegno per campioni e reagenti",
    paragraphs: [
      "Le sonde di campionamento costituiscono il punto di contatto con il liquido durante l’aspirazione e l’erogazione di campioni o reagenti negli analizzatori automatici. Scegliete la sonda in base a contenitore, volume di liquido richiesto e movimento dello strumento. Adattate quindi il collegamento al circuito fluidico circostante.",
      "FOREACH sviluppa la sonda a partire da disegni o campioni e concorda dimensioni, geometria della punta e dettagli di montaggio in funzione dello strumento. Indicate i liquidi, il ciclo di lavaggio e i requisiti sui residui per valutare i trattamenti superficiali e l’eventuale interfaccia di rilevamento del livello del liquido.",
    ],
    features: [
      ["Punta e aperture di passaggio", "Punte aguzze, piatte o a V e aperture laterali sono adattate alla funzione di aspirazione o erogazione, alla posizione del contenitore e alla direzione del flusso."],
      ["Geometria del tubo e fissaggio", "Controllate diametro interno ed esterno, lunghezza totale e utile, piegature ed estremità di fissaggio rispetto al disegno dello strumento e allo spazio di manovra disponibile."],
      ["Superfici e requisiti di rilevamento", "Valutate lucidatura interna, rivestimenti esterni e compatibilità con il rilevamento capacitivo del livello in base a fluido, metodo di lavaggio e sistema di controllo effettivi."],
    ],
  },
  "piercing-probes": {
    title: "Sonde perforanti per contenitori sigillati di campioni e reagenti",
    imageAlt: "Sonde perforanti FOREACH su disegno per consumabili sigillati",
    paragraphs: [
      "Le sonde perforanti consentono di raggiungere il liquido attraversando pellicole o tappi di serbatoi per reagenti, contenitori per campioni e consumabili sigillati. La scelta parte dal consumabile da perforare, considerando materiale, spessore e posizione nello strumento.",
      "Fornite un disegno o un campione, indicando profondità di penetrazione, traiettoria e collegamento fluidico. FOREACH valuta insieme punta, corpo ed eventuali elementi di sfiato. Le prestazioni si verificano con il consumabile effettivo e la sequenza reale di trasferimento del liquido.",
    ],
    features: [
      ["Punta perforante", "Angolo della punta e orientamento del tagliente si valutano insieme alla forza di penetrazione, alla resistenza della sonda e al movimento richiesto dallo strumento."],
      ["Percorsi del liquido e dello sfiato", "La posizione di aperture laterali, fori di sfiato o scanalature dipende dal punto di aspirazione e dai percorsi richiesti per liquido e aria."],
      ["Integrazione nello strumento", "Controllate lunghezza, piegature ed estremità di fissaggio rispetto alla posizione del consumabile, allo spazio disponibile e al collegamento fluidico."],
    ],
  },
  "wash-probes": {
    title: "Sonde di lavaggio per le stazioni degli analizzatori",
    imageAlt: "Sonde di lavaggio FOREACH su disegno e gruppi di lavaggio a più testine",
    paragraphs: [
      "Le sonde di lavaggio si integrano nelle stazioni degli analizzatori per il lavaggio e il risciacquo delle sonde, l’aspirazione degli scarti e la rimozione del liquido residuo. Partite dall’area da pulire e individuate separatamente il percorso di alimentazione del liquido di lavaggio e quello di scarico.",
      "FOREACH adatta la configurazione delle sonde al disegno della stazione, allo spazio disponibile e alla sequenza di pulizia. Indicate i liquidi di lavaggio e di scarto, la portata richiesta e i tempi del ciclo per valutare posizione dei fori, collegamenti e trattamenti superficiali prima di verificare l’intera operazione.",
    ],
    features: [
      ["Configurazione delle testine", "Le soluzioni a una, due o più testine e le versioni piegate sono progettate in base alla disposizione della stazione e al movimento dei componenti da pulire."],
      ["Aperture di lavaggio e scarico", "Dimensioni, posizione e direzione dei fori dipendono dall’area da lavare, dall’uscita degli scarti e dal percorso di aspirazione previsto."],
      ["Compatibilità con la pulizia", "Valutate saldature, lucidatura e rivestimenti in base alla composizione del liquido di lavaggio, alle proprietà degli scarti e alla durata utile richiesta."],
    ],
  },
  "stirring-paddles": {
    title: "Palette di agitazione per analizzatori automatici",
    imageAlt: "Palette di agitazione FOREACH su disegno per recipienti di reazione",
    paragraphs: [
      "Le palette di agitazione miscelano campioni, reagenti, diluenti o liquidi di reazione nei recipienti degli analizzatori automatici. Scegliete la geometria in base alla forma del recipiente, al volume di lavoro del liquido e al movimento disponibile dell’azionamento.",
      "Per un progetto su disegno, fornite il disegno del recipiente di reazione, l’intervallo di velocità e il tempo di miscelazione richiesto. Paletta ed estremità di fissaggio si valutano insieme, verificando miscelazione, bolle, schizzi e residui con il liquido e il recipiente effettivi.",
    ],
    features: [
      ["Geometria della paletta", "Le versioni piatte, elicoidali e piegate a 90° si scelgono in base al liquido, al recipiente e al tipo di miscelazione richiesto."],
      ["Distanze e accoppiamento all’azionamento", "Controllate dimensioni, posizione di lavoro, concentricità ed estremità di fissaggio rispetto al fondo del recipiente, al livello del liquido e allo spazio di manovra."],
      ["Superfici e pulizia", "Materiali, saldature e rivestimenti si valutano in base alla compatibilità con il liquido, alle condizioni di pulizia e alla resistenza meccanica richiesta."],
    ],
  },
  "air-bubble-detectors": {
    title: "Rilevatori di bolle d’aria per tubi trasparenti",
    imageAlt: "Rilevatore di bolle d’aria FOREACH ABD per tubi trasparenti",
    paragraphs: [
      "I rilevatori di bolle d’aria controllano lo stato del liquido in un punto definito di un tubo trasparente. FOREACH ABD rileva a infrarossi bolle, gocce e la presenza di aria o liquido, senza contatto con il fluido.",
      "Scegliete la configurazione in base al tubo e all’evento da rilevare. Parete del tubo, proprietà ottiche del liquido, condizioni di flusso e posizione di montaggio influiscono sul rilevamento. L’interpretazione del segnale e la gestione degli allarmi si verificano sul sistema assemblato.",
    ],
    features: [
      ["Compatibilità con il tubo", "Controllate diametro esterno, parete e trasparenza del tubo per la configurazione ABD scelta. Per la verifica usate il tubo e il liquido effettivi."],
      ["Funzione di rilevamento", "Definite se lo strumento deve rilevare bolle, gocce o un passaggio da aria a liquido, o viceversa. Consultate le specifiche di rilevamento e risposta del modello."],
      ["Interfaccia di controllo", "Verificate che collegamenti TTL/UART, comunicazione Modbus RTU e uscite IO della configurazione siano compatibili con il sistema di controllo dell’apparecchiatura."],
    ],
  },
  "pressure-sensors": {
    title: "Sensori di pressione per circuiti fluidici di strumenti",
    imageAlt: "Sensore di pressione FOREACH PDM5 per circuiti fluidici di strumenti",
    paragraphs: [
      "I sensori di pressione forniscono una misura per il monitoraggio e il controllo del circuito fluidico. FOREACH PDM5 trasmette un segnale digitale di pressione tramite I2C per la retroazione della pompa, la valutazione di eventuali ostruzioni e il rilevamento di anomalie nella strumentazione automatizzata.",
      "Scegliete posizione e configurazione del sensore in base a pressione di esercizio, oscillazioni di pressione e rapidità di risposta richiesta. Verificate la compatibilità degli attacchi fluidici e dei materiali a contatto con il fluido. Controllate quindi come lo strumento usa il segnale misurato per il controllo e gli allarmi.",
    ],
    features: [
      ["Pressione e campionamento", "Verificate che il campo di pressione e la configurazione di campionamento del PDM5 siano adatti alla pressione a regime, alle oscillazioni previste e alla funzione di monitoraggio."],
      ["Collegamento fluidico", "Il percorso fluidico in PEEK e gli attacchi con filettatura femmina 1/4-28 UNF richiedono liquidi, raccordi e configurazioni di tenuta compatibili."],
      ["Integrazione nel sistema", "Verificate alimentazione, comunicazione I2C, temperatura e spazio di montaggio. Convalidate quindi l’interpretazione del segnale sul circuito fluidico completo."],
    ],
  },
};

export function getItalianProbeControlTypeIntro(type: string): FittingIntroZh | undefined {
  const source = probeIntrosEn[type] ?? controlIntrosEn[type];
  const copy = localizedIntroText[type];
  if (!source || !copy) return undefined;
  return {
    title: copy.title,
    paragraphs: copy.paragraphs,
    image: { ...source.image, alt: copy.imageAlt },
    features: copy.features.map(([title, description]) => ({ title, description })),
  };
}

export const italianProbeControlSelectionSegments = [
  ["probes"],
  ...probeTypesEn.map(({ id }) => ["probes", "selection", id]),
  ["control"],
  ...controlTypesEn.map(({ id }) => ["control", id]),
];
