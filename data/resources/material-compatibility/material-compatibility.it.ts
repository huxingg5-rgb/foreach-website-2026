import type { MaterialCompatibilityPageData } from "./material-compatibility.types";

export const italianChemicalNames: Record<string, string> = {
  "Acetamide acetic acid 50%": "Acetammide / acido acetico, 50 %",
  Acetone: "Acetone", "Formic acid 10%": "Acido formico, 10 %",
  "Ammonia solution 10%": "Soluzione di ammoniaca, 10 %", Cyclohexanol: "Cicloesanolo", Gasoline: "Benzina",
  Benzene: "Benzene", "Boric acid solution 10%": "Soluzione di acido borico, 10 %", "Butyl acetate": "Acetato di butile",
  "Calcium chloride solution 10%": "Soluzione di cloruro di calcio, 10 %", Chlorobenzene: "Clorobenzene",
  Chloroform: "Cloroformio", "Chlorinated biphenyl 50%": "Bifenile clorurato, 50 %",
  Cyclohexylamine: "Cicloesilammina", Cyclohexanone: "Cicloesanone", Decahydronaphthalene: "Decaidronaftalene",
  Diesel: "Gasolio", Formamide: "Formammide", "Dioctyl phthalate": "Ftalato di diottile", Dioxane: "Diossano",
  "Concentrated acetic acid": "Acido acetico concentrato", "Acetic acid 10%": "Acido acetico, 10 %",
  "Acetic acid 5%": "Acido acetico, 5 %", "Ethanol 96%": "Etanolo, 96 %", "Ethyl acetate": "Acetato di etile",
  "Diethyl ether": "Etere dietilico", "Vinyl chloride": "Cloruro di vinile", "Hydrofluoric acid 40%": "Acido fluoridrico, 40 %",
  "Formaldehyde solution 30%": "Soluzione di formaldeide, 30 %", Freon: "Freon", "Fruit juice": "Succo di frutta",
  "Ethylene glycol": "Glicole etilenico", "Ethylene glycol solution 40%": "Soluzione di glicole etilenico, 40 %",
  Glycerol: "Glicerolo", "Fuel oil": "Olio combustibile", Octane: "Ottano", Isopropanol: "Isopropanolo",
  "Iodine tincture": "Tintura di iodio", "Potassium hydroxide solution 50%": "Soluzione di idrossido di potassio, 50 %",
  "Potassium hydroxide solution 10%": "Soluzione di idrossido di potassio, 10 %", "Potassium dichromate solution 10%": "Soluzione di dicromato di potassio, 10 %",
  "Copper sulfate solution 1%": "Soluzione di solfato di rame, 1 %", Xylene: "Xilene", "Linseed oil": "Olio di lino",
  Methanol: "Metanolo", "Methyl ethyl ketone": "Metiletilchetone", Dichloromethane: "Diclorometano",
  "Sodium bisulfite solution 10%": "Soluzione di bisolfito di sodio, 10 %", "Sodium carbonate solution 10%": "Soluzione di carbonato di sodio, 10 %",
  "Sodium chloride solution 10%": "Soluzione di cloruro di sodio, 10 %", "Sodium nitrate solution 10%": "Soluzione di nitrato di sodio, 10 %",
  "Sodium thiosulfate 10%": "Tiosolfato di sodio, 10 %", "Soda solution 50%": "Soluzione di soda, 50 %",
  Nitrobenzene: "Nitrobenzene", "Oxalic acid solution 10%": "Soluzione di acido ossalico, 10 %", Ozone: "Ozono",
  "Paraffin oil": "Olio di paraffina", Tetrachloroethylene: "Tetracloroetilene", Petroleum: "Petrolio",
  "Phenol solution": "Soluzione di fenolo", "Concentrated phosphoric acid": "Acido fosforico concentrato",
  "Phosphoric acid solution 10%": "Soluzione di acido fosforico, 10 %", Propanol: "Propanolo", Pyridine: "Piridina",
  "Salicylic acid": "Acido salicilico", "Nitric acid solution 2%": "Soluzione di acido nitrico, 2 %",
  "Hydrochloric acid solution 36%": "Soluzione di acido cloridrico, 36 %", "Hydrochloric acid solution 2%": "Soluzione di acido cloridrico, 2 %",
  "Sulfur dioxide": "Biossido di zolfo", "Sulfuric acid solution 98%": "Soluzione di acido solforico, 98 %",
  "Sulfuric acid solution 2%": "Soluzione di acido solforico, 2 %",
  "Saturated hydrogen sulfide solution": "Soluzione satura di solfuro di idrogeno",
  "Silicone oil": "Olio siliconico", "Soda solution 10%": "Soluzione di soda, 10 %", Styrene: "Stirene", Tar: "Catrame",
  Tetrahydrofuran: "Tetraidrofurano", "1,2,3,4-Tetrahydronaphthalene": "1,2,3,4-tetraidronaftalene",
  Ink: "Inchiostro", Toluene: "Toluene", Triethanolamine: "Trietanolammina", Trichloroethylene: "Tricloroetilene",
  "Aminocarboxylate complexing agent 10%": "Agente complessante amminocarbossilato, 10 %",
  "Hydrogen peroxide 30%": "Perossido di idrogeno, 30 %", "Tartaric acid": "Acido tartarico",
};

export const italianMaterialFeatures = {
  PP: { name: "Polipropilene", feature: "Leggero e resistente alla fatica, con buona resistenza ad acidi, basi e solventi organici comuni.", application: "Circuiti fluidici generici, attacchi per reagenti e consumabili monouso" },
  PVDF: { name: "Polivinilidenfluoruro", feature: "Buon equilibrio fra resistenza chimica e proprietà meccaniche, con buona resistenza ai raggi UV e alle radiazioni.", application: "Tubi per reagenti, raccordi fluidici e componenti per circuiti" },
  POM: { name: "Poliossimetilene", feature: "Elevate durezza, rigidità e resistenza all’usura, adatte a componenti strutturali e di precisione.", application: "Componenti strutturali e di precisione, connettori meccanici" },
  ETFE: { name: "Copolimero etilene-tetrafluoroetilene", feature: "Buona stabilità chimica e resistenza agli agenti atmosferici e agli urti. Resistenza meccanica maggiore di quella del PTFE.", application: "Tubi e raccordi fluidici resistenti alla corrosione" },
  PEEK: { name: "Polietereterchetone", feature: "Elevata resistenza meccanica e termica, con buona resistenza chimica per circuiti fluidici con requisiti elevati.", application: "Raccordi ad alte prestazioni, corpi valvola e circuiti degli strumenti analitici" },
  PPS: { name: "Polisolfuro di fenilene", feature: "Elevata resistenza termica e chimica, con ottima stabilità dimensionale.", application: "Componenti strutturali tecnici per un funzionamento stabile nel tempo" },
  PTFE: { name: "Politetrafluoroetilene", feature: "Elevata inerzia chimica, basso attrito e resistenza alle alte temperature. Resiste a molti acidi e basi forti e solventi organici.", application: "Circuiti con fluidi molto corrosivi, guarnizioni e componenti per tubazioni" },
  PFA: { name: "Perfluoroalcossi alcano", feature: "Proprietà simili al PTFE, con migliore lavorabilità allo stato fuso per impieghi che richiedono elevata purezza e resistenza alla corrosione.", application: "Impieghi che richiedono elevata purezza e resistenza alla corrosione" },
};

export const italianMaterialCompatibilityCopy = {
  banner: {
    eyebrow: "",
    title: "Compatibilità dei materiali e criteri di scelta",
    highlight: "",
    description: "Dati di riferimento per la scelta dei materiali in base ai prodotti chimici più comuni, alle proprietà dei tecnopolimeri e alla documentazione di conformità per tubi, raccordi, valvole e circuiti microfluidici.",
  },
  tabs: [
    { key: "compatibility", label: "Compatibilità" },
    { key: "features", label: "Proprietà dei materiali" },
    { key: "certification", label: "Certificati" },
  ],
  searchCopy: {
    compatibility: { placeholder: "Cerca per sostanza chimica", quickKeywords: ["Etanolo", "Metanolo", "Acido solforico", "Benzina"] },
    features: { placeholder: "Cerca per materiale", quickKeywords: ["PEEK", "PTFE", "PVDF", "PP", "PFA"] },
    certification: { placeholder: "Cerca per materiale o certificato", quickKeywords: ["PEEK", "PP", "RoHS", "FDA", "REACH"] },
  },
  certificationColumns: ["Materiale", "ISO 10993", "USP CLASS VI", "FDA", "UL", "NSF/ANSI 61", "M/SDS", "RoHS", "REACH"],
  ui: {
    breadcrumbAriaLabel: "Percorso di navigazione", breadcrumbHome: "Home",
    breadcrumbResources: "Risorse", breadcrumbCurrent: "Compatibilità dei materiali",
    searchButtonText: "Cerca", recentLabel: "Ricerche frequenti", noteLabel: "Nota: ",
    tableCopy: {
      compatibility: {
        title: "Tabella di compatibilità dei materiali",
        description: "Dati indicativi sulla compatibilità tra le sostanze chimiche più comuni e i tecnopolimeri.",
        note: "+ Compatibile. (+) Compatibilità limitata. − Sconsigliato. I risultati dipendono da concentrazione, temperatura e tempo di contatto.",
      },
      features: {
        title: "Proprietà dei materiali",
        description: "Proprietà principali, intervalli di temperatura e applicazioni tipiche dei tecnopolimeri più comuni.",
        note: "Le proprietà sono indicative. Verificale in base alla struttura del prodotto, al fluido e alle condizioni operative.",
      },
      certification: {
        title: "Certificati dei materiali e documenti di conformità",
        description: "Documentazione di conformità disponibile per i tecnopolimeri più comuni.",
        note: "I certificati applicabili dipendono dal modello, dal lotto del materiale e dai requisiti dell’applicazione.",
      },
    },
    compatibilityTable: {
      chemicalMedium: "Sostanza chimica",
      emptyText: "Nessun dato corrispondente. Prova un altro termine o contatta l’assistenza tecnica.",
    },
    featureTable: {
      columns: { material: "Materiale", name: "Nome del materiale", feature: "Proprietà principali", temperature: "Intervallo di temperatura", application: "Applicazioni tipiche" },
      emptyText: "Nessun materiale corrispondente. Prova un altro termine.",
    },
    certificationTable: {
      emptyText: "Nessun certificato corrispondente. Prova un altro termine o contatta il reparto vendite.",
    },
    supportCta: {
      kicker: "ASSISTENZA ALLA SCELTA",
      title: "Ti serve aiuto per verificare la compatibilità dei materiali?",
      description: "Indicaci la sostanza, la concentrazione, la temperatura, la pressione e il tempo di contatto. I tecnici FOREACH ti aiuteranno a verificare la scelta dei materiali per la tua applicazione.",
      buttonText: "Contatta l’assistenza tecnica",
    },
  },
} satisfies Pick<MaterialCompatibilityPageData, "banner" | "tabs" | "searchCopy" | "certificationColumns" | "ui">;
