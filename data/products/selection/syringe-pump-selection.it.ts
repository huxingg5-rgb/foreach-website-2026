type ProductSelectionIntro = { title: string; paragraphs: readonly string[]; imageAlt: string };

const selection = "Per scegliere la pompa a siringa, considerate volume da erogare, accuratezza e ripetibilità, insieme a numero di canali di dosaggio, percorsi fluidici e durata del ciclo di erogazione. Valutate anche compatibilità dei materiali a contatto con il fluido, spazio di montaggio e interfacce di comunicazione. I canali di dosaggio corrispondono alle unità di dosaggio a siringa. La configurazione delle valvole determina come commutano i percorsi fluidici. Scegliete canali e valvole secondo le esigenze di erogazione e di instradamento dei fluidi. Le opzioni RS-232, RS-485 e CAN consentono allo strumento di comandare aspirazione, erogazione e commutazione delle valvole.";
const hmdConfiguration = "La serie HMD usa elettrovalvole per commutare i percorsi fluidici e offre corse di 30 mm e 60 mm. Le pompe a siringa nelle configurazioni a uno, 2, 3, 4, 6 e 8 canali consentono di erogare reagenti, diluire campioni ed erogare liquidi su più canali. Le configurazioni delle elettrovalvole e gli attacchi fluidici si possono adattare al circuito richiesto.";
const hldConfiguration = "La serie HLD usa valvole rotative per commutare i percorsi fluidici, con corse di 30 mm e 60 mm e configurazioni di valvole personalizzabili, tra cui versioni a 3, 5 e 9 vie. Le valvole collegano reagenti, diluenti, liquidi di lavaggio e linee di erogazione per aspirare ed erogare volumi dosati in sequenza.";

export const italianSyringeSelectionCopy: Readonly<Record<string, ProductSelectionIntro>> = {
  "syringe-pumps": {
    title: "Pompe a siringa OEM per la manipolazione automatizzata dei liquidi",
    imageAlt: "Pompe a siringa OEM FOREACH per la manipolazione automatizzata dei liquidi",
    paragraphs: [
      "Le pompe a siringa OEM FOREACH integrano il dosaggio tramite siringhe in vetro con elettrovalvole o valvole rotative per l'erogazione di reagenti, la diluizione di campioni e il trasferimento di liquidi negli strumenti di analisi automatizzati. La gamma comprende le pompe a siringa HMD con elettrovalvole e le HLD con valvole rotative, con corse di 30 mm e 60 mm. Numero di canali di dosaggio, configurazioni delle valvole e attacchi fluidici si possono adattare ad analizzatori IVD, strumenti di laboratorio e sistemi automatizzati di manipolazione dei liquidi.",
      selection,
      hmdConfiguration + " " + hldConfiguration,
    ],
  },
  "solenoid-valve-syringe-pumps": {
    title: "Pompe a siringa OEM HMD con elettrovalvole per il dosaggio di reagenti",
    imageAlt: "Pompe a siringa FOREACH HMD con elettrovalvole",
    paragraphs: [
      "Le pompe a siringa OEM FOREACH HMD combinano il dosaggio con siringhe di vetro e la commutazione tramite elettrovalvole per erogare reagenti, diluire campioni ed erogare liquidi su più canali negli strumenti di analisi automatizzati. L'azionamento della siringa controlla aspirazione ed erogazione. Le elettrovalvole commutano tra i percorsi fluidici collegati.",
      selection, hmdConfiguration,
    ],
  },
  "rotary-valve-syringe-pumps": {
    title: "Pompe a siringa OEM HLD con valvole rotative per selezionare ed erogare reagenti",
    imageAlt: "Pompe a siringa FOREACH HLD con valvole rotative",
    paragraphs: [
      "Le pompe a siringa OEM FOREACH HLD combinano il dosaggio con siringhe di vetro e le valvole rotative a più vie per selezionare reagenti, diluire campioni ed erogare volumi dosati negli strumenti di analisi automatizzati. La valvola rotativa seleziona la sorgente del liquido o il percorso di erogazione. La siringa controlla aspirazione ed erogazione.",
      selection, hldConfiguration,
    ],
  },
};

export const italianSyringeCategoryDescription = "Scoprite le pompe a siringa OEM FOREACH con elettrovalvole o valvole rotative, corsa di 30/60 mm e configurazioni a uno o più canali per la manipolazione automatizzata dei liquidi.";
