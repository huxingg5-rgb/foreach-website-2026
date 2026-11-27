import type { FaqUi } from "./faq.ui";

export const italianFaqTitle = "Domande frequenti";

export const italianFaqUi: FaqUi = {
  description: "Risposte su pompe, valvole, sonde, tubi, raccordi e sensori. Informazioni per la scelta, il montaggio, la tenuta, le verifiche e l’assistenza tecnica.",
  home: "Home", resources: "Risorse", breadcrumb: "Percorso di navigazione",
  all: "Tutte le domande", categories: "Categorie delle domande", products: "Domande sui prodotti", services: "Servizi e assistenza",
  searchPlaceholder: "Cerca per prodotto, modello o domanda", search: "Cerca", pagination: "Paginazione delle domande frequenti",
  previous: "Indietro", next: "Avanti", emptyTitle: "Nessuna domanda corrispondente",
  emptyDescription: "Cerca per nome del prodotto, modello o breve descrizione del problema. Puoi anche azzerare il filtro e il termine di ricerca.",
  clear: "Mostra tutte le domande", ctaTitle: "Hai ancora bisogno di aiuto?",
  ctaDescription: "Indicaci il modello, il fluido, le condizioni operative e i sintomi osservati. Potremo aiutarti nella scelta o nella diagnosi del problema.",
  contact: "Contatta l’assistenza tecnica", readMore: "Vedi dettagli",
};

export const italianFaqCategoryLabels: Record<string, string> = {
  pumps: "Pompe", piston: "Pompe a pistone", diaphragm: "Pompe a membrana", syringe: "Pompe a siringa",
  pipetting: "Pompe per pipettaggio", valveless: "Pompe dosatrici senza valvole",
  valves: "Valvole", rotary: "Valvole rotative", solenoid: "Elettrovalvole",
  "high-pressure-valve": "Valvole ad alta pressione", "check-valve": "Valvole di non ritorno",
  probes: "Sonde", "sampling-probe": "Sonde di campionamento e per reagenti",
  "piercing-probe": "Sonde perforanti", "wash-probe": "Sonde di lavaggio", stirrer: "Sonde e palette di agitazione",
  tubing: "Tubi e assemblaggi di tubi", "soft-tubing": "Tubi flessibili",
  "hard-tubing": "Tubi rigidi", "tubing-assembly": "Assemblaggi di tubi su misura",
  fittings: "Raccordi per circuiti fluidici", flanged: "Raccordi per tubi con estremità bordata", ferrule: "Raccordi a ogiva",
  "retaining-ring": "Raccordi con anello di serraggio", "high-pressure-fitting": "Raccordi per tubi ad alta pressione",
  barbed: "Raccordi portagomma", "threaded-barb": "Raccordi portagomma filettati",
  luer: "Raccordi Luer", "quick-connect": "Innesti rapidi",
  "thread-adapter": "Adattatori con filettatura femmina", bulkhead: "Raccordi passaparete",
  control: "Rilevamento e controllo", bubble: "Rilevamento delle bolle", pressure: "Misura della pressione del fluido",
  purchasing: "Scelta e acquisto", selection: "Dati per la scelta",
  samples: "Campioni e prototipazione", customization: "Personalizzazione", quotation: "Preventivi e consegna",
  quality: "Qualità e controlli", inspection: "Controlli dimensionali e delle prestazioni", compliance: "Documentazione sui materiali e sulla conformità",
  traceability: "Tracciabilità dei lotti", acceptance: "Criteri di accettazione", support: "Assistenza post-vendita",
  troubleshooting: "Segnalazione dei guasti", maintenance: "Manutenzione", replacement: "Ricambi",
  repair: "Riparazioni e resi", warranty: "Informazioni sulla garanzia",
};

export const italianFaqCopy: Record<string, readonly [string, ...string[]]> = {
  "piston-accuracy": [
    "EA: il limite ≤0.5% per accuratezza e ripetibilità vale a ogni dose?",
    "Il limite vale a corsa completa, nelle condizioni specificate. Al 2% della corsa, lo scostamento dal valore nominale è ≤2.0% e la variazione tra dosi ripetute è ≤1.5%. Le note si riferiscono alla prova sul volume spostato. Verifica le prestazioni con il reagente previsto prima di applicare questi valori a piccole dosi arbitrarie.",
  ],
  "piston-crystallization": [
    "EA: quali verifiche richiedono le soluzioni saline o i reagenti che tendono a cristallizzare?",
    "Verifica tutti i materiali a contatto con il fluido rispetto a composizione, concentrazione e temperatura. Prevedi il lavaggio allo spegnimento e la gestione del liquido residuo. Il lavaggio della tenuta è un’opzione prevista per la serie EA. La durata attesa di cinque milioni di cicli si riferisce ad acqua pura a temperatura ambiente e a una contropressione di 50 kPa. Per altri reagenti occorre valutare la durata in condizioni d’uso.",
  ],
  "diaphragm-free-flow": [
    "Che cosa indica la portata di 300 mL/min della DPL30?",
    "È la portata senza carico riportata nella scheda tecnica attuale della DPL30, alle condizioni di prova specificate. La portata effettiva varia con la contropressione, l’altezza di aspirazione, i tubi e il fluido. Determinala dalla resistenza del circuito, dalla curva portata-pressione e dal punto di lavoro.",
  ],
  "diaphragm-working-point": [
    "La DPL30 può erogare 300 mL/min a 100 kPa?",
    "No. I 300 mL/min indicano la portata senza carico. I 100 kPa indicano la pressione nominale. Sono due parametri misurati in condizioni diverse. Per conoscere la portata in pressione, consulta la curva portata-pressione e verifica il punto di lavoro nel circuito reale.",
  ],
  "syringe-capacity": [
    "Come si scelgono capacità e corsa utile della siringa?",
    "Prima di scegliere una siringa compatibile, definisci il volume minimo e massimo di erogazione, il volume totale del lotto e il tempo di riempimento accettabile. La capacità della siringa non determina il volume minimo erogabile in modo affidabile. Verifica le piccole dosi con il liquido, l’ago, i tubi e la contropressione effettivi.",
  ],
  "syringe-bottle-change": [
    "Che cosa verificare se le prime dosi dopo il cambio del flacone sono troppo piccole?",
    "Verifica che il tubo di aspirazione sia immerso e che i raccordi siano a tenuta. Adesca siringa e tubi per rimuovere l’aria. Convoglia il liquido di adescamento a uno scarico adatto prima di misurare il volume erogato. Se rimangono bolle, controlla la velocità di aspirazione, le infiltrazioni d’aria e lo stato del liquido.",
  ],
  "syringe-accuracy": [
    "Come si valutano accuratezza e ripetibilità?",
    "L’accuratezza descrive lo scostamento dal volume nominale. La ripetibilità descrive la variazione tra erogazioni ripetute. Entrambe vanno misurate indipendentemente dalla risoluzione dell’azionamento. Ripeti le prove al volume, con il liquido, alla velocità e alla contropressione previsti. Quando riporti le specifiche, indica la siringa usata e le condizioni di prova.",
  ],
  "syringe-continuity": [
    "La pompa può fornire una portata continua?",
    "Una singola siringa deve riempirsi di nuovo. Un ciclo completo comprende erogazione, commutazione della valvola e aspirazione. Se serve un’erogazione continua, valuta pompe alternate o un accumulatore e misura le fluttuazioni di portata. Una siringa più grande può ridurre la frequenza dei riempimenti in certi impieghi, ma da sola non garantisce una portata continua.",
  ],
  "pipetting-level": [
    "Come si distinguono pLLD, cLLD e hLLD e come si sceglie il metodo?",
    "pLLD è il rilevamento del livello del liquido basato sulla pressione, cLLD è il rilevamento capacitivo e hLLD è il rilevamento ibrido. Le specifiche di SMTP2 prevedono tutti e tre. Per la scelta, verifica le proprietà del liquido, la geometria del puntale, la messa a terra dello strumento e il movimento dell’asse. Convalida la posizione di rilevamento e le condizioni di attivazione con il liquido previsto. Il metodo più adatto dipende dall’applicazione.",
  ],
  "pipetting-multiple": [
    "Dopo una sola aspirazione, SMTP2 può erogare in più contenitori?",
    "La scheda tecnica documenta le prestazioni in erogazione multipla, da usare come base per valutare più erogazioni dopo una sola aspirazione. Lo strumento deve eseguire i comandi e i movimenti necessari. Confronta il volume totale previsto, inclusi i margini del metodo, con le capacità disponibili di pompa e puntale. Verifica separatamente la prima aliquota, quelle intermedie e l’ultima. La capacità nominale da sola non garantisce un numero determinato di aliquote.",
  ],
  "valveless-speed": [
    "RPL: diminuendo la velocità si riduce il volume di ogni dose?",
    "A parità di volume spostato per giro e numero di giri completi, una velocità minore aumenta soprattutto il tempo di erogazione. Il volume nominale della dose resta invariato. Se il controllo si basa su una durata fissa, la velocità modifica il numero di giri e il volume effettivo: occorre ricalibrare.",
  ],
  "valveless-system": [
    "Una pompa senza valvole consente di eliminare tutte le valvole dallo strumento?",
    "No. RPL combina la rotazione e il moto alternativo di un pistone ceramico per aspirare ed erogare il liquido senza valvole nel meccanismo della pompa. Il sistema completo può comunque richiedere valvole di commutazione, di intercettazione o altri componenti, in base ai circuiti di alimentazione e lavaggio e alle funzioni di sicurezza.",
  ],
  "rotary-metering": [
    "Una valvola rotativa può controllare direttamente il volume di ogni erogazione?",
    "La funzione principale di una valvola rotativa è commutare i collegamenti. Il volume erogato dipende in genere dal dosaggio della pompa, dalle condizioni del liquido e dal circuito installato. Il volume interno della valvola e il numero di commutazioni non equivalgono al volume erogato.",
  ],
  "rotary-solenoid": [
    "Qual è la differenza tra una valvola rotativa e un’elettrovalvola?",
    "Una tipica valvola rotativa elettrica commuta i collegamenti ruotando un rotore. Un’elettrovalvola usa la forza elettromagnetica per aprire, chiudere o commutare i percorsi. La funzione dipende anche dalla configurazione del circuito. Selezione del percorso, intercettazione indipendente e funzionamento simultaneo rispondono a esigenze diverse. Il tipo di azionamento da solo non determina la scelta.",
  ],
  "rotary-reset": [
    "Dopo un’interruzione di corrente si può riutilizzare l’ultimo numero di canale?",
    "Determina la posizione reale con la procedura di inizializzazione e conferma della posizione prevista per il modello. Il numero di canale salvato nel software non conferma la posizione fisica. Verifica la posizione prima di azionare la pompa.",
  ],
  "solenoid-sequence": [
    "Come si coordinano la commutazione dell’elettrovalvola e il movimento della siringa?",
    "Imposta il percorso di aspirazione o di erogazione prima di muovere la siringa. Conferma lo stato della valvola o il tempo di commutazione secondo il protocollo di controllo. Evita di azionare la siringa con il percorso chiuso. Includi adescamento, riempimento e lavaggio nella sequenza operativa.",
  ],
  "probe-drawing": [
    "Per personalizzare una sonda di campionamento serve un disegno?",
    "È preferibile fornire un disegno 2D, un file 3D o un campione fisico. Se i disegni completi non sono ancora disponibili, indica lo spazio di montaggio nello strumento, il liquido, il volume di aspirazione, la lunghezza della sonda e i requisiti dell’attacco. FOREACH potrà aiutarti a individuare i primi aspetti da confermare.",
  ],
  "probe-carryover": [
    "Come si riducono la ritenzione del liquido e la contaminazione incrociata nelle sonde di campionamento?",
    "Valuta insieme geometria della punta, lucidatura interna, rivestimento esterno, metodo di lavaggio e proprietà del liquido. Per campioni o reagenti che tendono a lasciare residui, presta particolare attenzione alla rugosità della superficie interna, ai trattamenti esterni che riducono la ritenzione del liquido e alla compatibilità con la stazione di lavaggio.",
  ],
  "piercing-difference": [
    "In che cosa una sonda perforante si distingue da una sonda di campionamento?",
    "Le sonde di campionamento servono soprattutto ad aspirare ed erogare liquidi. Le sonde perforanti sono progettate per raggiungere il liquido attraverso pellicole di chiusura, tappi o consumabili sigillati. In genere occorre verificare la resistenza della punta, l’angolo di perforazione e la geometria di sfiato.",
  ],
  "stirrer-dimensions": [
    "Perché la paletta di agitazione va abbinata alla cuvetta di reazione?",
    "Forma, diametro e lunghezza della paletta e geometria di montaggio dipendono dalle dimensioni della cuvetta, dal volume del liquido e dallo spazio di miscelazione disponibile. Per la scelta occorrono queste misure oltre alla sigla del modello.",
  ],
  "pvc-reagent": [
    "I tubi in PVC sono compatibili con ogni reagente?",
    "La compatibilità dipende dalla formulazione del tubo, dalla composizione e concentrazione del reagente, dalla temperatura e dal tempo di contatto. Per i circuiti di campioni sensibili valuta anche adsorbimento, sostanze estraibili e trascinamento di residui.",
  ],
  "tubing-wall": [
    "Perché sono disponibili più diametri esterni a parità di diametro interno?",
    "Diametri esterni diversi comportano spessori nominali della parete diversi, che influiscono sul percorso dei tubi e sulla compatibilità dei raccordi. Seleziona la combinazione completa di diametro interno ed esterno (ID/OD).",
  ],
  "pvc-peristaltic": [
    "Questi tubi in PVC possono essere usati in una pompa peristaltica?",
    "Verifica prima la formulazione specifica, le dimensioni della testa della pompa, la durata a fatica e la compatibilità con il fluido. Per un tubo di collegamento l’idoneità all’uso peristaltico richiede una verifica dedicata.",
  ],
  "ptfe-transparency": [
    "Tutti i tubi in PTFE sono trasparenti?",
    "Il PTFE è in genere opaco o traslucido. Se occorre vedere il liquido o le bolle, valuta il campione reale di tubo e confronta alternative come il FEP.",
  ],
  "barb-tube-size": [
    "I raccordi portagomma si scelgono per diametro interno o esterno del tubo?",
    "Per prima cosa scegli la misura dell’attacco in base al diametro interno. Poi controlla diametro esterno, spessore della parete, tolleranze, materiale e durezza. BA-32F-PP-N è adatto a tubi con diametro interno di 3.2 mm. Il diametro massimo del portagomma è una misura distinta. Il diametro esterno aiuta a determinare il fissaggio e lo spazio di montaggio. Se allo stesso diametro interno corrispondono più profili, consulta i disegni e convalida inserimento, tenuta e ritenzione con il tubo effettivo.",
  ],
  "barb-clamp": [
    "Serve sempre una fascetta per un raccordo portagomma?",
    "La necessità di una fascetta dipende dall’accoppiamento tra tubo e raccordo e dalle condizioni operative. Valuta materiale e durezza del tubo, temperatura, picchi di pressione, vibrazioni e trazione esterna. Verifica quindi tenuta e ritenzione in base ai requisiti dell’assemblaggio. Se serve una fascetta, abbinala al diametro esterno del tubo montato e posizionala nel punto di serraggio corretto, senza danneggiare tubo o raccordo. Una fascetta non compensa una misura errata del tubo.",
  ],
  "barb-reducer": [
    "Come si scelgono le due estremità di un raccordo portagomma di riduzione?",
    "Annota diametro interno, diametro esterno e materiale di ogni tubo, poi scegli il modello di riduzione corrispondente. BA-24F-32F-PP-N collega tubi con diametro interno di 2.4 mm e 3.2 mm. Controlla anche il codice di ogni portagomma, le quote del disegno e il diametro minimo di passaggio. Per le riduzioni a T o a Y, usa il disegno per identificare la misura di ogni porta. L’ordine delle cifre da solo non indica la direzione della diramazione.",
  ],
  "quick-valves": [
    "Qual è la differenza tra innesti rapidi con e senza valvola?",
    "Quando viene scollegata, la metà con valvola chiude automaticamente il proprio passaggio, mentre quella senza valvola rimane aperta. Se serve l’intercettazione su entrambi i lati, scegli una valvola sia nella metà maschio sia in quella femmina. Anche con la valvola può fuoriuscire del liquido.",
  ],
  "quick-push-in": [
    "In che cosa un innesto rapido si distingue da un raccordo a innesto per tubo?",
    "L’innesto rapido si separa tra le metà maschio e femmina. Il raccordo a innesto per tubo libera il tubo dal corpo del raccordo. Q20, Q40 e Q60 usano due metà accoppiate, quindi per scollegarli durante l’uso non occorre sfilare il tubo dall’attacco posteriore.",
  ],
  "quick-interchange": [
    "Si possono accoppiare innesti rapidi di produttori diversi?",
    "Oltre all’aspetto e alla misura del tubo, verifica le quote di accoppiamento, la ritenzione e la posizione della tenuta. Per le versioni con valvola, verifica che la valvola si apra completamente dopo il collegamento. Anche se esiste una corrispondenza tra serie, convalida la coppia effettiva.",
  ],
  "luer-pressure": [
    "Un Luer Lock regge sempre più pressione di un Luer Slip?",
    "Il bloccaggio aggiunge ritenzione meccanica. La pressione di esercizio ammissibile dipende comunque dalla coppia maschio-femmina specifica, dai tubi, dai materiali, dalla temperatura e dalle condizioni di montaggio. La sola ghiera non definisce una pressione nominale e i valori di un altro produttore non sono trasferibili a questa combinazione. Convalida il collegamento completo in base alle sue specifiche e condizioni di esercizio.",
  ],
  "luer-shutoff": [
    "Un raccordo Luer arresta automaticamente il flusso quando lo si scollega?",
    "I raccordi Luer a passaggio aperto descritti qui non hanno una chiusura automatica integrata. Per chiudere il passaggio allo scollegamento serve una valvola specifica. Se questa funzione è necessaria nel circuito, scegli un connettore o una valvola di controllo che la preveda.",
  ],
  "ferrule-tools": [
    "I raccordi senza bordatura si montano sempre senza attrezzi?",
    "No. Il serraggio manuale, l’uso di una chiave dedicata o di un utensile a coppia controllata dipendono dalla configurazione. L’espressione senza bordatura indica che l’estremità del tubo non viene bordata prima del montaggio. Per scegliere come serrare, consulta le indicazioni del modello.",
  ],
  "ferrule-pairing": [
    "CL-0 e CL-0X sono intercambiabili a parità di diametro esterno del tubo?",
    "Il diametro esterno da solo non basta. Le due geometrie sono diverse e devono corrispondere al dado e all’attacco. Verifica i codici completi e la combinazione di componenti approvata. Una prova di serraggio o una forza maggiore non dimostrano la compatibilità.",
  ],
  "ring-flangeless": [
    "Anche un raccordo con anello di serraggio è senza bordatura?",
    "Sì. Il sistema ad anello e ogiva qui descritto usa tubi tagliati in squadra con estremità non bordate. Anche i normali raccordi a ogiva possono essere senza bordatura. Poiché componenti e montaggio differiscono, la denominazione da sola non basta a stabilire l’intercambiabilità.",
  ],
  "ring-tools": [
    "Serve un utensile specifico per il montaggio?",
    "Sì. Per il premontaggio iniziale del kit servono pinze dedicate e compatibili: FOREACH T-SF-4-SS, codice prodotto 959016. Con la sola pressione manuale è difficile posizionare correttamente anello e ogiva. Una coppia maggiore sul dado non sostituisce il premontaggio. Verifica che l’utensile sia compatibile con il kit e la misura del tubo. Prima di ricollegare estremità già montate, verificane l’integrità.",
  ],
  "thread-unf-npt": [
    "Le filettature 1/4-28 UNF e 1/4 NPT sono intercambiabili?",
    "No. La filettatura 1/4-28 UNF è cilindrica e ha 28 filetti per pollice. SA-1/4NPT usa la filettatura 1/4-18 NPT, conica e con 18 filetti per pollice. Le dimensioni, il passo e la forma differiscono. Anche con lo stesso sigillante le due filettature non sono intercambiabili.",
  ],
  "thread-seal-tape": [
    "Tutti i raccordi portagomma filettati richiedono nastro in PTFE?",
    "No. FOREACH SA/SAL usa nastro in PTFE o un sigillante per filettature compatibile. SB/SBS/SBR fanno tenuta sulla superficie di fondo senza nastro né sigillante. Gli attacchi femmina SC seguono i requisiti del raccordo per tubo rigido e degli elementi di tenuta con cui si abbinano.",
  ],
  "adapter-leak": [
    "Conviene applicare nastro o stringere di più se un raccordo con filettatura femmina perde?",
    "Prima arresta il sistema e depressurizzalo. Controlla il posizionamento del tubo, gli elementi di tenuta e la sede dell’attacco. Se l’assemblaggio fa tenuta sulla superficie a fondo piatto, il nastro per filetti non ripara una perdita sulla superficie di tenuta e un ulteriore serraggio può danneggiare il corpo in plastica. Abbina correttamente i componenti o sostituisci quelli danneggiati, quindi serra ed esegui la prova di tenuta secondo le istruzioni di montaggio.",
  ],
  "bulkhead-leak": [
    "Stringere il dado del pannello può fermare una perdita all’estremità del tubo?",
    "Il dado PMBSN fissa il pannello. Il tubo fa tenuta per contatto con il portagomma. Arresta e depressurizza il sistema, poi controlla le dimensioni del tubo, l’inserimento, eventuali danni all’estremità e alterazioni del materiale. Ripeti la prova dopo l’intervento. Una coppia maggiore sul dado del pannello non corregge un accoppiamento inadeguato tra tubo e portagomma.",
  ],
  "bulkhead-tank": [
    "Questo raccordo portagomma passaparete può sigillare direttamente un passaggio nella parete di un serbatoio?",
    "Il raccordo PMB qui descritto fissa un collegamento a pannello e unisce tubi flessibili. Per attraversare la parete di un serbatoio serve anche una tenuta tra raccordo e parete, progettata e convalidata per quello scopo. Scegli l’assemblaggio di tenuta completo in base alla struttura del serbatoio, al fluido e alla pressione.",
  ],
  "abd-contact": [
    "Il rilevatore di bolle d’aria ABD entra in contatto con il liquido?",
    "Il modulo si aggancia all’esterno di un tubo trasparente e rileva le bolle senza contatto diretto con il liquido. Questo aiuta a ridurre il rischio di contaminazione e la resistenza aggiuntiva al flusso.",
  ],
  "abd-small-bubbles": [
    "ABD può rilevare microbolle molto piccole?",
    "Dipende dalla dimensione effettiva. La larghezza rilevabile della bolla o del segmento di liquido è > 0.8 mm. Bolle o segmenti più piccoli possono sfuggire al rilevamento.",
  ],
  "pdm5-interface": [
    "Quale interfaccia di comunicazione usa PDM5?",
    "PDM5 usa la comunicazione I2C. Il suo indirizzo I2C predefinito a 7 bit è 0x6D.",
  ],
  "assembly-inputs": [
    "Quali quote e dati degli attacchi servono per un assemblaggio di tubi su misura?",
    "Indica materiale del tubo, diametro interno ed esterno, lunghezza e tolleranze, disegni di entrambe le porte, requisiti dei raccordi e delle tenute, spazio di montaggio e requisiti di identificazione. Verifica gli abbinamenti per ogni tipo di estremità, come raccordi per tubi bordati, con anello di serraggio o a ogiva. Una filettatura identica da sola non rende i componenti intercambiabili.",
    "Indica anche i fluidi di processo e di lavaggio, la concentrazione, la temperatura, la pressione o il vuoto, la portata prevista e il ciclo di lavoro, così da convalidare il campione nelle condizioni reali di montaggio e funzionamento.",
  ],
  "selection-inputs": [
    "Quali informazioni servono per scegliere raccordi o tubi?",
    "Fornisci uno schema del circuito, i disegni delle filettature e delle superfici di tenuta di ogni porta, i diametri interno ed esterno e il materiale del tubo. Aggiungi fluido, concentrazione, pressione, temperatura, portata e spazio disponibile. Per ricambi o componenti già in uso, includi il codice completo, fotografie o dati del campione.",
    "Per gli innesti rapidi specifica quale lato deve chiudersi allo scollegamento. Per i raccordi passaparete indica spessore del pannello e forma del foro. Distingui i requisiti obbligatori dalle condizioni modificabili.",
  ],
  "sample-validation": [
    "Dopo l’approvazione dei campioni di raccordo, che cosa va definito prima degli acquisti in serie?",
    "Registra modello completo, configurazione dei materiali, revisione del disegno, specifica effettiva del tubo e procedura di montaggio approvata. Concorda i controlli di accettazione e i documenti richiesti sui materiali e sulla qualità. Convalida montaggio, tenuta, carico di trazione e condizioni effettive di avvio e arresto. Nei tratti in aspirazione controlla se entra aria sotto vuoto.",
    "Se cambiano raccordi o tubi, valuta se la convalida originale resta applicabile. Per riutilizzare l’approvazione dei campioni occorre verificare i componenti anche quando il loro aspetto è simile.",
  ],
  "material-documents": [
    "I documenti RoHS, REACH o SDS attestano la compatibilità con i reagenti?",
    "No. I documenti RoHS e REACH forniscono informazioni sulla conformità delle sostanze nell’ambito dichiarato. Una SDS fornisce informazioni sulla sicurezza, manipolazione e conservazione dei materiali. Questi documenti da soli non attestano la compatibilità a lungo termine con un reagente specifico né dimostrano la tenuta del collegamento.",
    "Controlla il materiale o modello, la revisione e l’ambito coperti dai documenti. Convalida poi compatibilità e tenuta con la composizione del reagente, la concentrazione, la temperatura, il tempo di contatto e il collegamento effettivamente assemblato.",
  ],
  "batch-traceability": [
    "Quali registrazioni controllare se tra due lotti di raccordi cambia la sensazione all’inserimento o la tenuta?",
    "Confronta il lotto in esame con i campioni approvati. Controlla modello completo, configurazione dei materiali, revisione del disegno, materiale e dimensioni del tubo, procedura di montaggio e registrazioni di consegna. Controlla profilo del portagomma, quote critiche, passaggio del fluido, eventuali bave o danni e identificazione di modello e materiale.",
    "Se cambiano i tubi, i materiali dei raccordi o le condizioni di montaggio, valuta e convalida nuovamente gli aspetti interessati. Frequenza di campionamento, verifiche e documenti forniti seguono i requisiti di qualità concordati per il progetto.",
  ],
  "support-leak-report": [
    "Quali informazioni aiutano a individuare perdite dai raccordi o ingressi d’aria in una linea?",
    "Arresta e depressurizza lo strumento seguendo le istruzioni d’uso. Indica se la perdita si trova alla porta filettata, all’estremità del tubo o tra le metà dell’innesto e se si presenta durante l’erogazione in pressione, l’aspirazione, l’avvio o l’arresto oppure dopo un aumento della temperatura.",
    "Fornisci il modello completo del raccordo, materiale e quote del tubo, fotografie o disegni dell’attacco, fluido, pressione, temperatura e gli ultimi smontaggi o sostituzioni. Una perdita all’estremità del tubo, un difetto di tenuta frontale e un accoppiamento difettoso richiedono controlli diversi. Aumentare il serraggio non risolve tutti i casi.",
  ],
  "support-replacement": [
    "Basta il diametro del tubo per scegliere guarnizioni o kit con anello di serraggio di ricambio?",
    "No. Controlla anche il corpo del raccordo, la geometria della sede di tenuta e il codice completo della guarnizione o del kit. Anche a parità di diametro esterno, serie diverse possono avere geometrie e requisiti di accoppiamento diversi.",
    "Ad esempio CL-1S-16 e CL-1X-16 sono entrambi per tubi con diametro esterno di 1.6 mm, ma usano raccordi e attacchi diversi. Prima della sostituzione consulta la documentazione degli abbinamenti e verifica l’estremità del tubo. Segui la procedura di montaggio indicata ed esegui poi una prova di tenuta.",
  ],
};
