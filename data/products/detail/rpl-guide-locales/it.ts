import type { RplGuideParameters, RplGuideText } from "./types";

export function getItalianRplGuide(p: RplGuideParameters): RplGuideText {
  const motor = `${p.rinse ? "sei fili" : "quattro fili"}, 1.5 A/fase, passo intero di 1.8°`;
  return {
    productType: "Pompa dosatrice a pistone senza valvole",
    lead: `${p.model} aspira ed eroga il liquido con il moto rotatorio e alternativo del pistone ceramico. Prima di scegliere cilindrata, velocità e tubi, definire dose obiettivo, tempo disponibile, liquido di processo e liquido di lavaggio. Misurare il volume erogato all'uscita effettiva.`,
    features: [
      ["Regolare separatamente cilindrata e velocità", `${p.range} μL/giro è la gamma di cilindrata per giro. La regolazione meccanica modifica il volume per giro. La velocità determina il tempo per compiere quei giri.`],
      ["Gruppo ceramico pistone-cilindro", `La configurazione illustrata abbina la testata in PVDF al gruppo in ${p.ceramic}. Verificare la compatibilità di tutti i componenti a contatto con il liquido.`],
      ["Montare in modo da favorire l'espulsione dell'aria", "L'orientamento della testata, la direzione del flusso e la posizione del motore influiscono sulla rimozione dell'aria e sulla protezione contro le perdite. Lasciare spazio per regolare la testata e collegare i tubi."],
      [p.rinse ? "Circuiti distinti di processo e lavaggio" : "Pulizia attraverso il circuito di processo", p.rinse ? "Gli attacchi di processo convogliano il reagente e quelli di lavaggio sciacquano la zona del pistone. Anche se le filettature coincidono, gli attacchi svolgono funzioni distinte." : "Espellere il liquido residuo dal circuito di processo. Per liquidi con sali o soggetti a cristallizzazione, definire insieme liquido di lavaggio, volume di risciacquo e procedura di arresto."],
    ],
    documents: [
      ["Modello e cilindrata", `${p.model}, ${p.range} μL/giro. All'ordine indicare cilindrata, azionamento e configurazione della retroazione di posizione.`],
      ["Attacchi e materiali a contatto con il fluido", `Gli attacchi di processo sono ${p.port}. La testata è in PVDF e il gruppo ceramico in ${p.ceramic}. ${p.rinse ? "Gli attacchi di lavaggio sono 1/4-28 UNF-2B." : "Questa configurazione esegue il risciacquo attraverso il circuito di processo."}`],
      ["Condizioni di prova delle prestazioni", `Le prove si effettuano con acqua pura, a ${p.testRpm} rpm, pressione nel circuito ≤50 kPa e rotazione del motore in avanti. Valutare accuratezza, ripetibilità e durata rispetto a queste condizioni.`],
      ["Verifiche di integrazione", "Prima di mettere in servizio azionamento e circuito, confermare orientamento di montaggio, spazio di regolazione della testata, avvolgimenti, interfaccia del sensore ottico e cablaggio fornito."],
    ],
    sections: {
      principle: {
        title: "Come il pistone aspira ed eroga il liquido",
        intro: "Il pistone ceramico ruota e si muove alternativamente lungo l'asse. La rotazione collega il passaggio sul lato piatto del pistone alternativamente all'ingresso e all'uscita. Il moto assiale cambia il volume della camera di pompaggio. Un ciclo completo comprende aspirazione, fine aspirazione, mandata e fine mandata.",
      },
      displacement: {
        title: "Scelta di cilindrata, velocità e tempo di dispensazione",
        intro: `La regolazione meccanica imposta la cilindrata. Il numero di giri completi determina la dose nominale e la velocità incide sul tempo di erogazione. Per ${p.model}, ${p.range} μL/giro è la gamma di cilindrata. Portata al minuto e dose minima affidabile vanno verificate separatamente.`,
        rows: [
          ["Dispensazione a dosi", "Dose nominale = cilindrata × giri completi", "Scegliere la cilindrata adatta alla dose. Verificare effetti di avvio e arresto, gocce residue e prima dose dopo una sosta. Validare separatamente l'erogazione per frazioni di giro."],
          ["Alimentazione continua", "Portata media nominale = cilindrata × rpm", "Moltiplicando μL/giro per giri/min si ottengono μL/min. La portata effettiva dipende anche da alimentazione, contropressione e proprietà del liquido. Verificare separatamente le pulsazioni."],
          ["Tempo di erogazione", "Verificare la velocità ammessa per modello e azionamento", "Controllare la velocità con azionamento e condizioni effettivi. Il ciclo dello strumento comprende anche posizionamento del contenitore, movimento dell'ago e stabilizzazione."],
          ["Pressione e accuratezza", "Distinguere pressione nominale, contropressione di prova e punto di lavoro", `La pressione nominale di 150 kPa non costituisce una convalida del funzionamento continuo a tale contropressione. I risultati a ${p.testRpm} rpm si riferiscono alle condizioni di prova indicate.`],
        ],
      },
      materials: {
        title: "Scelta di testata, gruppo ceramico e liquido di lavaggio",
        intro: `La configurazione illustrata abbina la testata in PVDF al gruppo in ${p.ceramic}. Nella scelta dei materiali considerare fluidi di processo e lavaggio, concentrazione, temperatura e tempo di contatto. Verificare la compatibilità di tutta la pompa, oltre alla resistenza alla corrosione della ceramica.`,
        rows: [
          ["Liquido di processo", "Registrare composizione, viscosità, particelle e tendenza a cristallizzare", "Per liquidi con particelle o soggetti a cristallizzazione, valutare filtrazione, lavaggio e arresto. Verificare poi movimento ed erogazione con un campione."],
          ["Liquido di lavaggio", p.rinse ? "Progettare separatamente il lavaggio del circuito di processo e il risciacquo del pistone" : "Definire la pulizia attraverso il circuito di processo del modello", p.rinse ? "Il circuito RINSE non pompa autonomamente e richiede alimentazione esterna del liquido di lavaggio. Usare un liquido compatibile con tutti i materiali a contatto. Dopo il cambio di liquido, verificare precipitati, bolle e tenuta." : "Usare un liquido di lavaggio compatibile per espellere i residui. Dopo il cambio di liquido, verificare precipitati, bolle e tenuta."],
          ["Residui all'arresto", "Evitare che liquidi salini o soggetti a cristallizzazione si asciughino nel gruppo dosatore", "Espellere il liquido di processo con il lavaggio prima di arrestare la pompa. Riadescare e provare prima di ripartire. Se il pistone si blocca, fermare l'azionamento e contattare l'assistenza tecnica."],
        ],
      },
      drive: {
        title: "Azionamento, avvolgimenti e retroazione della posizione di riferimento",
        intro: `Il motore ha ${motor}. Cablare separatamente motore e sensore ottico. Verificare la configurazione dell'azionamento prima di controllare alimentazione e segnali.`,
        rows: [
          ["Collegamento degli avvolgimenti", motor, p.rinse ? "I collegamenti ad avvolgimento intero o a mezzo avvolgimento influiscono su coppia e velocità. Impostare la corrente con lo schema e il driver selezionato." : "Nero e verde formano un avvolgimento, rosso e blu l'altro. Collegare le due fasi al driver secondo lo schema specifico del motore a quattro fili."],
          ["Alimentazione del sensore ottico", "5–24 V CC ±10%", "Controllare alimentazione, massa, tipo di uscita e ingresso del controllore, poi verificare la commutazione. Il segnale di posizione rileva la posizione. La dose erogata richiede una misura separata."],
          ["Avvio e posizionamento", "Verificare rotazione, posizione di riferimento e posizione di arresto", "Confermare movimento e direzione del flusso a bassa velocità, prima di impostare accelerazione, decelerazione e numero di cicli. Togliere tensione prima di modificare il cablaggio."],
        ],
        note: "Verificare colori dei fili, connettori e impostazioni della corrente in base a motore e sensore ottico forniti. Disalimentare prima di collegare o scollegare i cablaggi.",
      },
      installation: {
        title: p.rinse ? "Orientamento di montaggio, attacchi di processo e di lavaggio" : "Orientamento di montaggio, fissaggio e attacchi di processo",
        intro: "Montare la pompa in modo che l'aria esca dalla testata e che eventuali perdite non colino verso il motore. Nel progetto del circuito considerare i dislivelli tra serbatoio, testata e ago di dispensazione.",
        rows: [
          ["Attacchi di processo", p.port, "Verificare filettature, superfici di tenuta, raccordi e tubi. Sostenere i tubi affinché non carichino la testata."],
          [p.rinse ? "Attacchi di lavaggio del pistone" : "Pulizia del circuito di processo", p.rinse ? "1/4-28 UNF-2B con eventuali tappi di serie" : "Espellere i residui dagli attacchi di processo", p.rinse ? "Collegare mandata e ritorno del lavaggio secondo le marcature, tenendoli separati dall'ingresso e dall'uscita del reagente. Confermare liquido e collegamenti prima dell'uso." : "Questa configurazione usa gli attacchi di processo anche per il risciacquo. Definire la pulizia in base al liquido di processo e mantenere gli attacchi originali della testata."],
          ["Fissaggio meccanico", "Usare disegno del modello, angolo di regolazione e orientamento di montaggio", "Lasciare spazio per raccordi, cablaggi, regolazione della cilindrata e manutenzione. Ricontrollare orientamento della testata e carichi dei tubi dopo il fissaggio."],
        ],
      },
      commissioning: {
        title: "Prima messa in servizio e verifica del volume erogato",
        intro: p.rinse ? "Prima dell'adescamento verificare le posizioni di avvio e arresto del pistone e la bandierina del sensore ottico. L'illustrazione presuppone rotazione oraria vista dal lato anteriore del motore. Con rotazione inversa si invertono le posizioni di ingresso, lato piatto del pistone e bandierina." : "Stabilizzare l'adescamento ed eliminare l'aria prima di regolare la dose. Se le bolle destabilizzano l'erogazione, eliminarle prima di modificare la cilindrata.",
        steps: [
          ["Effettuare i controlli con alimentazione scollegata", "Verificare modello, impostazione della cilindrata, avvolgimenti e cablaggio del sensore. Identificare i circuiti di processo e lavaggio."],
          ["Adescare ed espellere l'aria", "Usare un liquido compatibile e avviare a bassa velocità. Cercare perdite e bolle dal serbatoio alla testata e all'uscita. Confermare la direzione del flusso."],
          ["Fissare le condizioni di prova", p.rinse ? "Mantenere costanti cilindrata, velocità, contropressione, ago e tubo. Effettuare un giro completo a ogni misura e registrare 10 volte la massa erogata." : "Mantenere costanti cilindrata, numero di cicli, velocità, contropressione, ago e tubo. Raccogliere più erogazioni alla stessa dose obiettivo."],
          ["Provare separatamente prima dose e dosi in continuo", "Registrare la prima erogazione dopo una sosta, quelle ripetute e le gocce residue. Correggere le impostazioni secondo le misure. Ripetere le verifiche quando cambiano liquidi o tubi."],
        ],
        note: "Nella misura gravimetrica, convertire la massa in volume usando la densità effettiva del liquido alla temperatura di prova. Registrare metodo e risultati.",
      },
      care: {
        title: "Manutenzione ordinaria, arresto e ricerca guasti",
        intro: "Distinguere prima i problemi di alimentazione, movimento e uscita e verificarli uno per volta. Contattare l'assistenza tecnica prima di smontare o intervenire sul gruppo dosatore.",
        rows: [
          ["Erogazione assente o bolle ricorrenti", "Livello del liquido, tenuta all'ingresso, direzione del flusso e orientamento", "Escludere ingresso d'aria, serbatoio vuoto e tubi piegati prima di riadescare. Risolvere la causa prima di modificare la velocità."],
          ["Dosi ripetute stabili con prima dose errata", "Arretramento durante le pause, gocce sulla punta e posizione di avvio e arresto", "Registrare separatamente durata della pausa e prima dose. Regolare la sequenza di arresto e di movimento nel circuito completo."],
          ["La portata diminuisce nel tempo", "Cristalli, resistenza all'ingresso, raccordi ostruiti e impostazioni dell'azionamento", "Arrestare la pompa e seguire una procedura di pulizia compatibile. Controllare tubi e filtri. Se il pistone si blocca, evitare di forzarne la rotazione."],
          ["Perdite o rumore insolito", "Carichi sui raccordi, tenute e fissaggi meccanici", "Interrompere il funzionamento. Conservare foto e registrazioni del liquido e delle impostazioni di azionamento, poi contattare l'assistenza tecnica."],
        ],
      },
    },
    figures: {
      cycle: { alt: "Quattro fasi del ciclo di dosaggio RPL senza valvole: aspirazione, fine aspirazione, mandata e fine mandata", caption: "1 Aspirazione → 2 Fine aspirazione → 3 Mandata → 4 Fine mandata." },
      components: { alt: `Componenti di ${p.model} con riferimenti numerati per regolazione, attacchi, sensore e montaggio`, caption: p.rinse ? "1 Manopola di regolazione · 2 Scala · 3 Attacco di lavaggio · 4 Attacco di processo · 5 Testata · 6 Sensore ottico · 7 Staffa di montaggio · 8 Connettore elettrico." : "1 Manopola di regolazione · 2 Scala · 3 Testata · 4 Attacco di processo · 5 Sensore ottico · 6 Staffa di montaggio · 7 Connettore elettrico." },
      adjustment: { alt: `Quattro fasi di regolazione meccanica della cilindrata di ${p.model}`, caption: "1 Allentare la vite di bloccaggio → 2 Leggere la scala → 3 Regolare e verificare pesando → 4 Serrare di nuovo la vite." },
      motor4: { alt: "Schema degli avvolgimenti del motore a quattro fili RPL-P4 con coppie nero-verde e rosso-blu", caption: "Motore a quattro fili. Nero e verde formano un avvolgimento e rosso e blu l'altro." },
      motor6: { alt: "Numerazione dei pin del connettore e avvolgimenti di fase del motore RPL a sei fili", caption: "Motore a sei fili. Gli avvolgimenti di fase e i pin sono indicati nello schema. RED, BLK, YEL, BLU, WHT e ORG identificano i fili rosso, nero, giallo, blu, bianco e arancione." },
      optical: { alt: "Sensore ottico RPL con collegamenti numerati per alimentazione, massa, uscite e carico", caption: "1 Marrone, alimentazione · 2 Nero, uscita 1, luce ON · 3 Bianco, uscita 2, al buio ON · 4 Blu, 0 V · 5 Carico. Isolare le uscite inutilizzate." },
      installation: { alt: `Orientamenti di montaggio corretti e scorretti di ${p.model} e frecce di flusso`, caption: "Seguire le frecce di flusso, consentire all'aria di uscire dalla testata e impedire che le perdite raggiungano il motore. ✓ Orientamento corretto, ✕ orientamento errato." },
      position: { alt: "Il lato piatto del pistone RPL è rivolto verso l'ingresso, con la bandierina ottica in posizione di avvio e arresto", caption: "In posizione di avvio e arresto, il lato piatto del pistone è rivolto verso l'ingresso. Il sensore ottico rileva il bordo della bandierina." },
      measurement: { alt: "Circuito di misura gravimetrica RPL con serbatoio, tubo di ingresso, pompa, tubo di uscita, ago di prelievo e bilancia", caption: "1 Serbatoio di alimentazione · 2 Tubo d'ingresso · 3 Pompa RPL e azionamento · 4 Tubo d'uscita · 5 Ago di prelievo a punta piatta · 6 Bilancia di precisione · 7 Recipiente di raccolta." },
    },
  };
}
