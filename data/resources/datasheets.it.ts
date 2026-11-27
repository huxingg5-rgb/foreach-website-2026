import { getItalianDraftLink } from "@/lib/i18n/draft-languages";

import { datasheetEnFilterOptions, datasheetEnItems, datasheetsEnPageText } from "./datasheets.en";
import type { DatasheetCategory, DatasheetsPageData } from "./datasheets.types";

const categoryLabels: Record<DatasheetCategory, string> = {
  all: "Tutti",
  pump: "Pompe",
  valve: "Valvole",
  needle: "Sonde",
  tubing: "Tubi e raccordi",
  smart: "Moduli di controllo e sensori",
};

const copy: Record<string, readonly [title: string, description: string]> = {
  "ea-piston-pump": ["Scheda tecnica della pompa a pistone EA", "Pompe a pistone EA per il dosaggio, l’erogazione e la manipolazione automatizzata di liquidi. Le capacità vanno da 50 µL a 20 mL."],
  "eas-piston-pump": ["Scheda tecnica della pompa a pistone EAS", "Pompe a pistone EAS per la manipolazione di precisione dei liquidi, con adescamento rapido e rimozione affidabile delle bolle d’aria."],
  "sm-piston-pump": ["Scheda tecnica della pompa a pistone SM", "Pompe a pistone SM compatte per dosare con precisione piccoli volumi e per l’integrazione in apparecchiature automatizzate di dimensioni ridotte."],
  "dpl30-diaphragm-pump": ["Scheda tecnica della pompa a membrana DPL30", "Pompa a membrana DPL30 per sistemi compatti di trasferimento dei liquidi, con portata fino a 300 mL/min."],
  "dpl60-diaphragm-pump": ["Scheda tecnica della pompa a membrana DPL60", "Pompa a membrana DPL60 per l’alimentazione e il trasferimento dei liquidi, con portata fino a 600 mL/min."],
  "dpl30h-diaphragm-pump": ["Scheda tecnica della pompa a membrana ad alta pressione DPL30H", "Pompa a membrana ad alta pressione DPL30H per filtrazione, nebulizzazione e trasferimento di liquidi all’interno delle apparecchiature. La pressione nominale è di 600 kPa."],
  "dpgl800-diaphragm-pump": ["Scheda tecnica della pompa a membrana DPGL800", "Pompa a membrana DPGL800 per gas e liquidi, adatta all’aspirazione di gas e miscele gas-liquido, alla generazione del vuoto e all’aspirazione di liquidi di scarto."],
  "fittings-and-tubing-catalog": ["Catalogo di raccordi e tubi", "Catalogo FOREACH in inglese di raccordi, connettori, tubi rigidi e flessibili e assemblaggi di tubi."],
  "smtp2-smtp4-pipetting-pump": ["Scheda tecnica delle pompe per pipettaggio SMTP2 e SMTP4", "Scheda tecnica comune delle pompe a spostamento d’aria SMTP2 e SMTP4, per la manipolazione automatizzata di campioni e reagenti."],
  "rpl-p635-p15-valveless-pump": ["Scheda tecnica della pompa dosatrice senza valvole RPL", "Scheda tecnica comune delle pompe dosatrici senza valvole RPL-P6.35 e RPL-P15, versione 001 (2025-07). Riporta cilindrata, materiali a contatto con il fluido, porte, montaggio e configurazione dell’azionamento."],
  "hld3-syringe-pump": ["Scheda tecnica della pompa a siringa HLD3 con valvola rotativa", "Pompa a siringa HLD3 con corsa di 30 mm e diverse configurazioni della valvola rotativa per la manipolazione di precisione dei liquidi."],
  "hld6-syringe-pump": ["Scheda tecnica della pompa a siringa HLD6 con valvola rotativa", "Pompa a siringa HLD6 con corsa di 60 mm e diverse configurazioni della valvola rotativa per la manipolazione di volumi da µL a mL."],
  "hmd3-syringe-pump": ["Scheda tecnica della pompa a siringa HMD3 con elettrovalvola", "Pompa a siringa HMD3 con corsa di 30 mm e configurazioni con elettrovalvole integrate per l’erogazione automatizzata dei liquidi."],
  "hmd6-syringe-pump": ["Scheda tecnica della pompa a siringa HMD6 con elettrovalvola", "Pompa a siringa HMD6 con corsa di 60 mm ed elettrovalvole integrate per la manipolazione multicanale dei liquidi."],
  "mrv3-multi-channel-rotary-valve": ["Scheda tecnica della valvola rotativa multicanale MRV3", "Valvola rotativa multicanale MRV3 per la commutazione dei circuiti fluidici a più porte, la distribuzione di reagenti e l’integrazione in sistemi fluidici."],
  "hp-2-position-6-port-high-pressure-valve": ["Scheda tecnica della valvola HP ad alta pressione a 2 posizioni e 6 porte", "Valvola HP ad alta pressione con 2 posizioni, 6 porte e un percorso di sfiato per commutare i circuiti fluidici in pressione."],
  "6010-solenoid-valve": ["Scheda tecnica dell’elettrovalvola SV10 (6010)", "Scheda tecnica dell’elettrovalvola SV10 (6010), con versioni a montaggio su piastra, con attacchi filettati o portagomma per il controllo a 2 e 3 vie."],
  "abd-air-bubble-detector": ["Scheda tecnica del rilevatore di bolle d’aria ABD", "Il rilevatore ABD individua senza contatto le bolle d’aria e il liquido nei tubi trasparenti. Supporta la comunicazione TTL e Modbus RTU."],
  "pdm5-pressure-sensor": ["Scheda tecnica del modulo sensore di pressione PDM5", "Scheda tecnica del PDM5 con quattro campi di misura della pressione assoluta e dettagli su materiali a contatto con il fluido, connessioni elettriche e varianti ordinabili."],
  "sample-probe": ["Sonde", "Al momento la scheda tecnica non è disponibile. È possibile richiedere una versione su disegno o su campione."],
};

export const italianDatasheetAccessibilityLabels = {
  breadcrumb: "Percorso di navigazione",
  categoryFilter: "Filtro per categoria di prodotto",
  thumbnail: " – miniatura",
};

export function getItalianDatasheetsPageData(): DatasheetsPageData {
  return {
    pageText: {
      seo: {
        title: "Schede tecniche e cataloghi dei prodotti | FOREACH",
        description: "Scarica le schede tecniche FOREACH di pompe, valvole, tubi, raccordi, sonde e moduli di controllo per la microfluidica.",
      },
      hero: {
        ...datasheetsEnPageText.hero,
        title: "Schede tecniche",
        description: "Cerca e scarica le schede tecniche FOREACH di pompe, valvole, tubi, raccordi e moduli di controllo. Consulta le specifiche principali, i materiali, gli attacchi e le indicazioni d’uso.",
        imageAlt: "Banner delle schede tecniche FOREACH",
      },
      breadcrumb: {
        home: "Home",
        homeHref: getItalianDraftLink("/en/").href,
        resources: "Risorse",
        resourcesHref: getItalianDraftLink("/en/resources/").href,
        current: "Schede tecniche",
      },
      search: {
        placeholder: "Cerca per nome o parola chiave, ad esempio pompa a pistone, valvola rotativa, sensore di pressione, tubi e raccordi",
        buttonText: "Cerca",
      },
      section: {
        title: "Schede tecniche dei prodotti",
        description: "Qui trovi le schede tecniche dei prodotti. Le sonde possono essere realizzate su disegno. I disegni dei prodotti, quando disponibili, sono nelle rispettive pagine di dettaglio.",
        resultPrefix: "",
        resultSuffix: "risorse",
        emptyTitle: "Nessuna risorsa corrispondente",
        emptyDescription: "Prova a cercare per nome, parola chiave o categoria. Se non trovi il documento che ti serve, inviaci una richiesta.",
      },
      labels: {
        language: "Lingua",
        version: "Versione",
        update: "Aggiornamento",
        fieldSeparator: ": ",
        viewProduct: "Vedi prodotto",
        download: "Scarica PDF (in inglese)",
        custom: "Richiedi una versione personalizzata",
      },
      support: {
        title: "Non trovi la scheda tecnica che ti serve?",
        description: "Indicaci il prodotto, l’applicazione o il documento che cerchi. Ti aiuteremo a reperire la scheda tecnica e, se necessario, a scegliere il prodotto.",
        buttonText: "Invia una richiesta",
        buttonHref: getItalianDraftLink("/en/contact/?type=datasheet").href,
      },
    },
    filterOptions: datasheetEnFilterOptions.map(option => ({ ...option, label: categoryLabels[option.value] })),
    datasheetItems: datasheetEnItems.map(item => {
      const [title, description] = copy[item.id];
      const productLink = item.productHref ? getItalianDraftLink(item.productHref) : undefined;
      return {
        ...item,
        title,
        description,
        label: categoryLabels[item.category],
        language: item.actionType === "download" ? "Inglese" : item.language,
        productHref: productLink?.href,
        productHrefLang: productLink?.hrefLang,
        productLinkLabel: productLink?.hrefLang === "en" ? "Vedi prodotto (in inglese)" : undefined,
        downloadHref: item.actionType === "custom" ? getItalianDraftLink("/en/contact/?type=custom-probe").href : item.downloadHref,
      };
    }),
  };
}
