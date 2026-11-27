const italianInkjetExtra: Readonly<Record<string, string>> = {
  'Industrial Inkjet Printer Fluidics Guide': 'Guida ai circuiti fluidici delle stampanti industriali a getto d’inchiostro',
  'Ink Refill Pumps': 'Pompe per il rabbocco dell’inchiostro',
  'Ink Recirculation Pumps': 'Pompe per il ricircolo dell’inchiostro',
  'Waste Ink Pumps': 'Pompe per l’inchiostro di scarto',
  'Tubing Assemblies and Fittings for Industrial Inkjet Printers': 'Tubazioni assemblate e raccordi per stampanti industriali a getto d’inchiostro',
  'Fixed Ink Lines and Tubing Assemblies': 'Linee fisse dell’inchiostro e tubazioni assemblate',
  'Ink Tank Changes and Maintenance Quick Disconnects': 'Cambio dei serbatoi d’inchiostro e innesti rapidi per la manutenzione',
  'Ink Filtration, Check Valves and Flow Control': 'Filtrazione dell’inchiostro, valvole di ritegno e controllo della portata',
  'Ink Filtration for Industrial Inkjet Printers': 'Filtrazione dell’inchiostro per stampanti industriali a getto d’inchiostro',
  'Cleaning Fluid Switching and Branch Isolation': 'Commutazione del liquido di pulizia e isolamento dei rami',
  'Diaphragm pump selection': 'Selezione delle pompe a membrana',
  'Overview': 'Panoramica',
  'Ink Starvation in Inkjet Printers: Causes and Troubleshooting': 'Alimentazione insufficiente d’inchiostro nelle stampanti a getto d’inchiostro: cause e diagnosi',
  'Ink starvation occurs when ink reaches the printhead more slowly than the head consumes it. If one color fades during a long, high-coverage print and recovers after a pause, save the nozzle check and watch the tank level as the fault develops. Then trace the supply line for a restriction or incoming air, and measure flow under the print load that caused the dropout.': 'L’alimentazione è insufficiente quando l’inchiostro raggiunge la testina più lentamente di quanto venga consumato. Se un colore sbiadisce durante una stampa prolungata ad alta copertura e torna dopo una pausa, conserva il risultato del controllo ugelli e osserva il livello del serbatoio mentre si manifesta il guasto. Verifica poi eventuali ostruzioni o ingressi d’aria lungo la linea di alimentazione e misura la portata al carico di stampa che ha causato il difetto.',
  'What Is the Difference Between an Ink Circulation Pump, Ink Supply Pump and Ink Return Pump?': 'Qual è la differenza tra pompe di ricircolo, alimentazione e ritorno dell’inchiostro?',
  'Ink supply pump, ink return pump and ink circulation pump are fluidic functions, not three fixed mechanical pump types. A supply pump moves ink toward a sub-tank or printhead, a return pump moves unused ink back toward a reservoir, and a circulation pump maintains flow around a loop. Whether those functions need one, two or several pumps depends on the printhead, reservoirs, gravity or vacuum control, filters and supply-return architecture.': 'Le pompe di alimentazione, ritorno e ricircolo prendono il nome dalla funzione svolta nel circuito. La pompa di alimentazione invia l’inchiostro verso un serbatoio secondario o la testina, quella di ritorno riporta l’inchiostro inutilizzato a un serbatoio e quella di ricircolo mantiene la portata in un circuito chiuso. Il numero di pompe necessarie dipende da testina, serbatoi, controllo per gravità o depressione, filtri e architettura di mandata e ritorno.',
  '300 or 600 mL/min? How to Select an Ink Circulation or Ink Return Pump': '300 o 600 mL/min? Come scegliere una pompa di ricircolo o di ritorno dell’inchiostro',
  'Define the target working flow in the ink circulation or return circuit, then calculate or measure system differential pressure at that flow. The DPL30 300 mL/min and DPL60 600 mL/min values are no-load flow classes, not guaranteed flow after adding ink, filters, tubing and a printhead. The closer the target is to the nominal limit, the more important curve and installed testing become.': 'Definisci la portata di esercizio obiettivo del circuito di ricircolo o ritorno, poi calcola o misura a quella portata la pressione differenziale del sistema. I 300 mL/min per DPL30 e 600 mL/min per DPL60 indicano classi di portata a vuoto. La portata effettiva con inchiostro, filtri, tubazioni e testina va verificata. Quanto più l’obiettivo è vicino al limite nominale, tanto più contano le curve e le prove sul circuito montato.',
  'Why Is White Ink Recirculation More Difficult, and How Should a White Ink Circulation Pump Be Selected?': 'Perché il ricircolo dell’inchiostro bianco è più difficile e come scegliere la pompa?',
  'White ink normally uses high-refractive-index, high-specific-gravity pigment for opacity. TiO₂ is common, but density difference, dispersion, agglomeration and idle time affect settling. The objective is not simply a larger pump flow. The reservoir, tubing, filter and printhead region need controlled flow that reaches critical dead zones while respecting printhead pressure, ink condition and material compatibility.': 'L’inchiostro bianco usa in genere un pigmento ad alto indice di rifrazione e alta densità relativa per ottenere opacità. Il TiO₂ è comune. Differenza di densità, dispersione, agglomerazione e durata delle soste influiscono sulla sedimentazione. L’obiettivo è controllare la portata in serbatoio, tubazioni, filtro e zona della testina per raggiungere le zone critiche di ristagno, rispettando pressione della testina, condizioni dell’inchiostro e compatibilità dei materiali.',
};

export const italianInkjetUi = {
  home: 'Home', applications: 'Applicazioni', breadcrumb: 'Percorso di navigazione',
  back: 'Indietro', guide: 'Guida applicativa', navigation: 'Guide alla stampa industriale a getto d’inchiostro',
  browse: 'Sfoglia le guide', close: 'Chiudi la navigazione delle guide',
  onThisPage: 'In questa pagina', references: 'Riferimenti', viewReferences: 'Visualizza i riferimenti',
  related: 'Guide correlate', sources: 'Fonti', reference: 'Riferimento', viewDetails: 'Vedi dettagli del prodotto',
  contactTitle: 'Parliamo del tuo circuito d’inchiostro',
  contactDescription: 'Indica modello della stampante, inchiostro e liquido di pulizia, portata obiettivo, temperatura e pressione di esercizio.',
  contactButton: 'Parliamo della tua applicazione',
  connectionContactDescription: 'Indica dimensioni dei tubi, raccordi alle estremità, inchiostro e liquido di pulizia, portata e pressione richieste.',
};

export { italianInkjetExtra };
