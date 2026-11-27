import type { ProductSelectionPageText } from "./product-selection-ui.types";

export const germanSelectionPageText: ProductSelectionPageText = {
  breadcrumbHome: "Startseite",
  breadcrumbCurrent: "Produkte",
  searchPlaceholder: "Nach Produktname, Baureihe, Volumen, Werkstoff oder Stichwort suchen",
  searchButton: "Suchen",
  mobileCategoryPrefix: "Kategorie: ",
  productTypeLabel: "Produkttyp",
  resultPrefix: "",
  resultSuffix: " Konfigurationen gefunden",
  resultSingularSuffix: " Konfiguration gefunden",
  resetFilters: "Filter zurücksetzen",
  submitRequirement: "Anfrage senden",
  detailButton: "Details ansehen",
  addToList: "Zur Liste hinzufügen",
  addedToList: "Hinzugefügt",
  previousPage: "Zurück",
  nextPage: "Weiter",
  filterEmpty: "Für diese Kategorie stehen keine Filter zur Verfügung.",
  emptyTitle: "Keine passenden Konfigurationen",
  emptyDescription: "Entfernen Sie einige Filter oder senden Sie uns Ihre Anforderungen für eine technische Beratung.",
};

export const germanSelectionA11y = {
  breadcrumbAriaLabel: "Brotkrümelnavigation",
  productTypeOverviewSuffix: ": Übersicht zum Produkttyp",
  currentPrefix: "Ausgewählt: ",
  paginationAriaLabel: "Produktseiten",
  barbedPortLabel: "Schlauchinnendurchmesser",
};

const taxonomyLabels: Readonly<Record<string, string>> = {
  pumps: "Pumpen",
  valves: "Ventile",
  needles: "Sonden, Kanülen und Rührpaddel",
  fittings: "Fluidik-Fittings und Leitungszubehör",
  tubing: "Schläuche und Kapillaren",
  control: "Sensor- und Detektionsmodule",
  "tubing-assemblies": "Konfektionierte Schlauch- und Kapillarleitungen",
  "plunger-pump": "Präzisionskolbenpumpe",
  "diaphragm-pump": "Miniatur-Membranpumpe",
  "pipette-pump": "Pipettiermodul mit Luftverdrängung",
  "syringe-pump": "OEM-Spritzenpumpe",
  "valveless-pump": "Ventillose Kolbendosierpumpe",
  "hard-tube-fittings": "Fittings für starre Kapillaren und Rohre",
  "barbed-fittings": "Schlauchtüllen und Schlauchverbinder",
  "thread-to-barbed-fittings": "Gewinde-Schlauchtülle",
  "luer-fittings": "Luer-Verbinder",
  "quick-connect-fittings": "Schnellverschlusskupplung für Flüssigkeitsleitungen",
  "female-thread-adapters": "Fluidik-Verbinder und Adapter mit Innengewinde",
  "bulkhead-barbed-fittings": "Schottverschraubung mit Schlauchtülle",
  "degassing-modules": "Membran-Entgasungsmodule",
  filters: "Filter und Rückschlagventile",
  "control-module": "Sensor- und Detektionsmodule",
  "air-bubble-detectors": "Luftblasendetektoren",
  "pressure-sensors": "Drucksensoren",
  "sampling-probes": "Kundenspezifische Probenahmesonde",
  "piercing-probes": "Kundenspezifische Einstechsonde",
  "wash-probes": "Kundenspezifische Spülsonde",
  "stirring-paddles": "Kundenspezifisches Rührpaddel",
  "solenoid-valves": "Miniatur-Magnetventile",
  "rotary-valves": "Drehschaltventile für Flüssigkeiten",
  "high-pressure-valves": "Hochdruck-Drehschaltventile",
  "pvc-tubing": "PVC-Schlauch",
  "tpu-tubing": "TPU-Schlauch",
  "fep-tubing": "FEP-Schlauch",
  "ptfe-tubing": "PTFE-Schlauch",
  "peek-tubing": "PEEK-Kapillare",
  "pfa-tubing": "PFA-Schlauch",
};

const selectionLabels = new Map([
  ["Home", "Startseite"],
  ["Product Center", "Produkte"],
  ["Products", "Produkte"],
  ["Pumps", "Pumpen"],
  ["Valves", "Ventile"],
  ["Probes", taxonomyLabels.needles],
  ["Probe Series", taxonomyLabels.needles],
  ["Sampling Probes", "Probenahmesonden"],
  ["Piercing Probes", "Einstechsonden"],
  ["Wash Probes", "Spülsonden"],
  ["Mixing Paddles", "Rührpaddel"],
  ["Air Bubble Detectors", taxonomyLabels["air-bubble-detectors"]],
  ["Pressure Sensors", taxonomyLabels["pressure-sensors"]],
  ["Tubing", taxonomyLabels.tubing],
  ["Control", taxonomyLabels.control],
  ["Fittings", taxonomyLabels.fittings],
  ["Tubing Assemblies", taxonomyLabels["tubing-assemblies"]],
  ["Pipetting Pumps", taxonomyLabels["pipette-pump"]],
  ["Valveless Piston Pumps", taxonomyLabels["valveless-pump"]],
  ["Solenoid Valves", taxonomyLabels["solenoid-valves"]],
  ["Rotary Selector Valves", taxonomyLabels["rotary-valves"]],
  ["High-Pressure Rotary Valve", "Hochdruck-Drehschaltventil"],
  ["Hard Tube Fittings", taxonomyLabels["hard-tube-fittings"]],
  ["Barbed Fittings", taxonomyLabels["barbed-fittings"]],
  ["Thread to Barb Fittings", taxonomyLabels["thread-to-barbed-fittings"]],
  ["Luer Fittings", taxonomyLabels["luer-fittings"]],
  ["Quick-connect Fittings", taxonomyLabels["quick-connect-fittings"]],
  ["Female Thread Adapters", taxonomyLabels["female-thread-adapters"]],
  ["Bulkhead Barbed Fitting", taxonomyLabels["bulkhead-barbed-fittings"]],
  ["Bulkhead Barbed Fittings", taxonomyLabels["bulkhead-barbed-fittings"]],
  ["Membrane Degassing Modules", taxonomyLabels["degassing-modules"]],
  ["Degassing Membrane Modules", taxonomyLabels["degassing-modules"]],
  ["Filters & Check Valves", taxonomyLabels.filters],
  ["Filter Media", "Filtermedium"],
  ["Filter Type", "Filtertyp"],
  ["Filtration Rating", "Filterfeinheit"],
  ["Filter Precision", "Filterfeinheit"],
  ["Body Material", "Gehäusewerkstoff"],
  ["Housing Material", "Gehäusewerkstoff"],
  ["Pump Head Material", "Werkstoff des Pumpenkopfs"],
  ["Capacity", "Nennvolumen"],
  ["Standard Piston Pump", "EA Präzisionskolbenpumpe in Standardbaugröße"],
  ["Miniature Piston Pump", "SM Miniatur-Präzisionskolbenpumpe"],
  ["Ultra-Compact Piston Pump", "TM Ultrakompakte Präzisionskolbenpumpe"],
  ["Diaphragm Material", "Membranwerkstoff"],
  ["Seal Material", "Dichtungswerkstoff"],
  ["Seal Type", "Dichtungstyp"],
  ["Sealing Method", "Dichtungsart"],
  ["Sealing Type", "Dichtungsart"],
  ["Wetted Material", "Medienberührter Werkstoff"],
  ["Wetted Materials", "Medienberührte Werkstoffe"],
  ["Color", "Farbe"],
  ["Connection Structure", "Anschlussbauform"],
  ["Connection", "Anschluss"],
  ["Flow Path Diameter", "Durchgangsdurchmesser"],
  ["Flow Rate", "Durchfluss"],
  ["Free Flow Rate", "Volumenstrom ohne Gegendruck"],
  ["Nominal Pressure", "Nenndruck"],
  ["Rated Pressure", "Nenndruck"],
  ["Back Pressure", "Gegendruck"],
  ["Male / Female", "Männlich / weiblich"],
  ["Material", "Werkstoff"],
  ["Motor Type", "Motortyp"],
  ["Mounting", "Montage"],
  ["Pressure", "Druck"],
  ["Product Series", "Baureihe"],
  ["Product Structure", "Bauform"],
  ["Product Type", "Produkttyp"],
  ["Pump Type", "Pumpentyp"],
  ["Series", "Baureihe"],
  ["Shape", "Form"],
  ["Stroke", "Hub"],
  ["Displacement", "Verdrängungsvolumen"],
  ["Structure", "Bauform"],
  ["Thread", "Gewinde"],
  ["Thread Size", "Gewindegröße"],
  ["Tube I.D. or Thread", "Schlauchinnendurchmesser oder Gewinde"],
  ["Tube ID / Thread", "Schlauchinnendurchmesser / Gewinde"],
  ["Tube ID", "Schlauchinnendurchmesser"],
  ["Tube Inner Diameter", "Schlauchinnendurchmesser"],
  ["Tubing ID", "Schlauchinnendurchmesser"],
  ["Tube OD", "Schlauchaußendurchmesser"],
  ["Tube Outer Diameter", "Schlauchaußendurchmesser"],
  ["Tubing Outer Diameter", "Schlauchaußendurchmesser"],
  ["Size (OD / ID)", "Abmessung (Außen- / Innendurchmesser)"],
  ["Valve Configuration", "Ventilkonfiguration"],
  ["Volume", "Volumen"],
  ["Model", "Modell"],
  ["Order Number", "Bestellnummer"],
  ["Product Code", "Produktcode"],
  ["Dimensions", "Abmessungen"],
  ["Piston Pump", taxonomyLabels["plunger-pump"]],
  ["Miniature Diaphragm Pump", taxonomyLabels["diaphragm-pump"]],
  ["Miniature Diaphragm Pumps", "Miniatur-Membranpumpen"],
  ["Miniature Liquid Diaphragm Pumps", "Miniatur-Membranpumpen für Flüssigkeiten"],
  ["Miniature Gas-Liquid Diaphragm Pumps", "Miniatur-Membranpumpen für Gas-Flüssigkeits-Gemische"],
  ["Pipetting Pump", taxonomyLabels["pipette-pump"]],
  ["Valveless Pump", taxonomyLabels["valveless-pump"]],
  ["Valveless Metering Pump", "Ventillose Kolbendosierpumpen"],
  ["RPL Single-Head Valveless Metering Pump", "RPL Ventillose Kolbendosierpumpe mit einem Pumpenkopf"],
  ["DRPL Dual-Head Valveless Metering Pump", "DRPL Ventillose Kolbendosierpumpe mit zwei Pumpenköpfen"],
  ["Syringe Pump", taxonomyLabels["syringe-pump"]],
  ["EA Standard Piston Pump", "EA Präzisionskolbenpumpe in Standardbaugröße"],
  ["SM Miniature Piston Pump", "SM Miniatur-Präzisionskolbenpumpe"],
  ["TM Ultra-Compact Piston Pump", "TM Ultrakompakte Präzisionskolbenpumpe"],
  ["DPL Liquid Diaphragm Pump", "DPL Miniatur-Membranpumpe für Flüssigkeiten"],
  ["DPL Gas-Liquid Diaphragm Pump", "DPL Membranpumpe für Gas und Gas-Flüssigkeits-Gemische"],
  ["Miniature Liquid Diaphragm Pump", "Miniatur-Membranpumpe für Flüssigkeiten"],
  ["Miniature Gas-Liquid Diaphragm Pump", "Miniatur-Membranpumpe für Gas und Gas-Flüssigkeits-Gemische"],
  ["Liquid Pump", "Flüssigkeitspumpe"],
  ["Gas-Liquid Mixing Pump", "Pumpe für Gas-Flüssigkeits-Gemische"],
  ["6 L/min per head", "6 L/min pro Pumpenkopf"],
  ["Brushed Motor", "Bürstenmotor"],
  ["Brushless Motor", "Bürstenloser Motor"],
  ["SMTP2 Programmable Air Displacement Pipetting Pump", "SMTP2 Programmierbares Pipettiermodul mit Luftverdrängung"],
  ["SMTP4 Air Displacement Pipetting Pump", "SMTP4 Pipettiermodul mit Luftverdrängung"],
  ["HMD Solenoid Valve Syringe Pump", "HMD OEM-Spritzenpumpe mit Magnetventil"],
  ["HLD Rotary Valve Syringe Pump", "HLD OEM-Spritzenpumpe mit Drehschaltventil"],
  ["RPL Single-Head Valveless Pump", "RPL Ventillose Kolbendosierpumpe mit einem Pumpenkopf"],
  ["DRPL Dual-Head Valveless Pump", "DRPL Ventillose Kolbendosierpumpe mit zwei Pumpenköpfen"],
  ["SV10 Solenoid Valve", "SV10 Miniatur-Magnetventil mit Wippenmechanismus und Trennmembran"],
  ["MRV3 Rotary Selector Valves", "MRV3-Keramik-Drehwahlventile"],
  ["MRV3 Multi-Port Rotary Valve", "MRV3 Keramik-Mehrwege-Drehschaltventil"],
  ["MRV3 Multi-channel Rotary Valve", "MRV3 Keramik-Mehrwege-Drehschaltventil"],
  ["MRV3 Multiport Rotary Valve", "MRV3 Keramik-Mehrwege-Drehschaltventil"],
  ["HP High-Pressure Rotary Valve", "HP Hochdruck-Drehschaltventil"],
  ["Solenoid Valve", "Magnetventil"],
  ["Sampling Probe", "Probenahmesonde"],
  ["Piercing Probe", "Einstechsonde"],
  ["Wash Probe", "Spülsonde"],
  ["Stirring Paddle", "Rührpaddel"],
  ["Smart Control Module", "Sensor- und Detektionsmodul"],
  ["Pressure Monitoring Module", "Druckmessmodul für Flüssigkeitsleitungen"],
  ["Air Bubble Detection Module", "Modul zur Luftblasendetektion"],
  ["Standard Flanged Fittings", "Flachboden-Fittings in Standardbaugröße"],
  ["Compact Flanged Fittings", "Kompakte Flachboden-Fittings"],
  ["Standard Ferrule Fittings", "Fittings mit Klemmkonus in Standardbaugröße"],
  ["Compact Ferrule Fittings", "Kompakte Fittings mit Klemmkonus"],
  ["Snap Ring Fittings", "Fittings für Klemmring-Dichtsätze"],
  ["High-Pressure Fittings", "Hochdruck-Fittings"],
  ["Natural", "Natur"],
  ["White", "Weiß"],
  ["Black", "Schwarz"],
  ["Red", "Rot"],
  ["Green", "Grün"],
  ["Blue", "Blau"],
  ["Orange", "Orange"],
  ["Yellow", "Gelb"],
  ["Straight Through", "Gerade"],
  ["Elbow", "Winkel"],
  ["Tee", "T-Stück"],
  ["π-Type", "π-Form"],
  ["Cross", "Kreuz"],
  ["Barbed Plug", "Schlauchstopfen mit Tülle"],
  ["Thread Seal", "Gewindeabdichtung"],
  ["Bottom-Face Seal", "Stirnflächenabdichtung"],
  ["Female Thread to Barb", "Schlauchtülle mit Innengewinde"],
  ["Rotary Straight Through", "Gerade, drehbar"],
  ["3.4 Tapered Thread", "3.4-Kegelgewinde"],
  ["Male Luer Stationary Lock", "Feststehender männlicher Luer-Einsatz"],
  ["Male Luer Rotating Lock", "Drehbarer männlicher Luer-Einsatz"],
  ["Male Luer Rotating Lock Ring Fitting", "Männlicher Luer-Verbinder mit drehbarem Verriegelungsring"],
  ["Male Luer Stationary Lock Ring Fitting", "Männlicher Luer-Verbinder mit festem Verriegelungsring"],
  ["Male Luer Integral Lock Ring Fitting", "Einteiliger männlicher Luer-Verbinder"],
  ["Female Luer Integral Fitting", "Weiblicher Luer-Verbinder"],
  ["Female Luer Panel Mount Fitting", "Weiblicher Luer-Schottverbinder"],
  ["Color Coding Ring", "Farbkennring"],
  ["Luer Lock Ring", "Luer-Verriegelungsring"],
  ["Panel Mount Lock Nut", "Befestigungsmutter für Schottfittings"],
  ["LPBL Male Luer Plug", "LPBL Männlicher Luer-Verschlussstopfen"],
  ["Male", "Männlich"],
  ["Female", "Weiblich"],
  ["Panel Mount", "Schottmontage"],
  ["Non-Panel Mount", "Ohne Schottmontage"],
  ["Valved", "Mit Absperrventil"],
  ["Non-Valved", "Ohne Absperrventil"],
  ["In-line", "Gerade"],
  ["2-Way", "2-Wege"],
  ["3-Way", "3-Wege"],
  ["Hex Nut", "Sechskantmutter"],
  ["Filters", "Filter"],
  ["Check Valves", "Rückschlagventile"],
  ["Filter", "Filter"],
  ["Check Valve", "Rückschlagventil"],
  ["Normally Closed", "Stromlos geschlossen"],
  ["Normally Open", "Stromlos offen"],
  ["1/4-28 UNF port; M6 optional", "Anschluss 1/4-28 UNF, M6 optional"],
  ["6-40 UNF port", "Anschluss 6-40 UNF"],
  ["Body material", "Gehäusewerkstoff"],
  ["Tube I.D.", "Schlauchinnendurchmesser"],
  ["Sealing method", "Dichtungsart"],
  ["Port thread", "Anschlussgewinde"],
  ["Max. liquid pressure", "Maximaler Flüssigkeitsdruck"],
  ["Overall Dimensions", "Gesamtabmessungen"],
  ["Pressure rating", "Druckstufe"],
  ["Flow path ID", "Durchgangsdurchmesser"],
  ["Flange gasket bottom seal", "Bodenseitige Abdichtung mit Flanschdichtung"],
  ["Ferrule seal", "Abdichtung mit Klemmkonus"],
  ["Retaining-ring seal", "Abdichtung mit Sicherungsring"],
  ["Fluidic port closure", "Verschluss für Fluidikanschlüsse"],
  ["For bulkhead fitting installation", "Zur Montage von Schottverschraubungen"],
  ["Straight Barbed Fitting", "Gerader Schlauchverbinder mit Tüllen"],
  ["Tee Barbed Fitting", "T-Schlauchverbinder mit Tüllen"],
  ["Y Barbed Fitting", "Y-Schlauchverbinder mit Tüllen"],
  ["Elbow Barbed Fitting", "Winkel-Schlauchverbinder mit Tüllen"],
  ["Pi-shaped Barbed Fitting", "π-förmiger Schlauchverbinder mit Tüllen"],
  ["Cross Barbed Fitting", "Kreuz-Schlauchverbinder mit Tüllen"],
  ["Male Luer Plug", "Männlicher Luer-Verschlussstopfen"],
  ["Plug for Luer fittings", "Verschlussstopfen für Luer-Verbinder"],
  ["Straight Thread-Seal Thread to Barb Fitting", "Gerade Gewinde-Schlauchtülle mit Gewindeabdichtung"],
  ["Straight Bottom-Face-Seal Thread to Barb Fitting", "Gerade Gewinde-Schlauchtülle mit Stirnflächenabdichtung"],
  ["Elbow Thread-Seal Thread to Barb Fitting", "Gewinkelte Gewinde-Schlauchtülle mit Gewindeabdichtung"],
  ["Straight Female Thread to Barb Fitting", "Gerade Schlauchtülle mit Innengewinde"],
  ["Swivel Bottom-Face-Seal Thread to Barb Fitting", "Drehbare Gewinde-Schlauchtülle mit Stirnflächenabdichtung"],
  ["Diaphragm Check Valve", "Membran-Rückschlagventil"],
  ["Duckbill Check Valve", "Entenschnabel-Rückschlagventil"],
  ["SUS Mesh Filter", "Edelstahlgewebefilter"],
  ["HDPE Mesh Filter", "HDPE-Gewebefilter"],
  ["PA Mesh Filter", "PA-Gewebefilter"],
  ["Water Circulation Filter Assembly", "Filterbaugruppe für Wasserkreisläufe"],
  ["SUS Mesh Filter Assembly", "Edelstahlgewebefilter-Baugruppe"],
  ["Full-stroke repeatability ≤0.5% (specified conditions)", "Wiederholgenauigkeit bei vollem Hub ≤0.5% (unter festgelegten Bedingungen)"],
  ["Displayed pump head: Acrylic (PMMA)", "Abgebildeter Pumpenkopf: Acryl (PMMA)"],
  ["CV <0.5% repeatability at full stroke", "Wiederholgenauigkeit bei vollem Hub: CV <0.5%"],
]);

export function getGermanSelectionLabel(label: string, taxonomyId?: string): string {
  const taxonomyLabel = taxonomyId && Object.hasOwn(taxonomyLabels, taxonomyId) ? taxonomyLabels[taxonomyId] : undefined;
  if (taxonomyLabel) return taxonomyLabel;
  const direct = selectionLabels.get(label);
  if (direct) return direct;
  const barb = /^(?:Barb ([1-3]) ID|接管内径([1-3]))$/.exec(label);
  return barb ? "Schlauchinnendurchmesser " + (barb[1] || barb[2]) : label;
}

export function getGermanCardSpec(value: string): string {
  const whole = getGermanSelectionLabel(value);
  if (whole !== value) return whole;
  const resolution = /^([\d,]+(?: \/ [\d,]+)?)-step full-stroke resolution$/.exec(value);
  if (resolution) return "Auflösung bei vollem Hub: " + resolution[1].replace(/,/g, "") + " Schritte";
  const parts = /^([^:：]+)[:：](\s*)(.*)$/.exec(value);
  if (!parts) return value;
  const [, label, spacing, spec] = parts;
  const translatedLabel = getGermanSelectionLabel(label);
  const translatedSpec = getGermanSelectionLabel(spec);
  return translatedLabel === label && translatedSpec === spec
    ? value
    : translatedLabel + ":" + spacing + translatedSpec;
}


function getGermanFittingCardLine(line: string): string {
  const translated = getGermanCardSpec(line);
  if (translated !== line) return translated.replace(/ \(gauge\)$/, " (Überdruck)");

  const material = /^([A-Z][A-Z0-9-]*) (body|housing|material)$/.exec(line);
  if (material) return (material[2] === "material" ? "Werkstoff: " : "Gehäusewerkstoff: ") + material[1];

  const connection = /^(.*) thread, ([A-Z][A-Z0-9-]*) (housing|material)$/.exec(line);
  if (connection) return "Gewinde: " + connection[1] + ", "
    + (connection[3] === "housing" ? "Gehäusewerkstoff: " : "Werkstoff: ") + connection[2];

  const tubingFit = /^(?:Fits|For) (.+) (?:ID tubing|tube ID)$/.exec(line);
  if (tubingFit) {
    const adapterFit = /^(.*) to (.+)$/.exec(tubingFit[1]);
    return adapterFit
      ? "Für Gewinde " + adapterFit[1].replace(/ 锥螺纹$/, " (kegelig)") + " und Schläuche mit " + adapterFit[2] + " Innendurchmesser"
      : "Für Schläuche mit " + tubingFit[1] + " Innendurchmesser";
  }

  const threadFit = /^Fits (.+) thread$/.exec(line);
  if (threadFit) return "Passend für Gewinde " + threadFit[1];

  const femaleAdapter = /^([23])-Way (.+) Female Thread Adapter$/.exec(line);
  if (femaleAdapter) return femaleAdapter[1] + "-Wege-Adapter mit Innengewinde " + femaleAdapter[2];

  const quickConnect = /^(Male|Female) (In-line|Elbow) (Valved|Non-Valved) Quick-Connect Fitting$/.exec(line);
  if (quickConnect) {
    const end = quickConnect[1] === "Male" ? "Stecker" : "Buchse";
    const shape = quickConnect[2] === "In-line" ? "gerade" : "gewinkelt";
    const valve = quickConnect[3] === "Valved" ? "mit Absperrventil" : "ohne Absperrventil";
    return "Schnellverschlusskupplung, " + end + ", " + shape + ", " + valve;
  }

  return line;
}

export function getGermanFittingCardSubtitle(subtitle: string): string {
  return subtitle.split(/(\n| \| |; )/).map(getGermanFittingCardLine).join("");
}
