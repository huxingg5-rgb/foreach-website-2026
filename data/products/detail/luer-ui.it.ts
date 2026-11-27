import { italianProductDetailText } from "./product-detail.it";

const roles: Readonly<Record<string, string>> = {
  "Male end": "Raccordo maschio", "Female end": "Raccordo femmina", Insert: "Inserto", Plug: "Tappo",
};
const fields: Readonly<Record<string, string>> = {
  "tubing ID": "diametro interno del tubo", material: "materiale", color: "colore",
  structure: "struttura", mounting: "montaggio", selection: "selezione",
};
const copy: Readonly<Record<string, string>> = {
  ...roles,
  Natural: "Naturale", White: "Bianco", Black: "Nero", Red: "Rosso", Green: "Verde", Blue: "Blu", Orange: "Arancione", Yellow: "Giallo",
  "Luer insert": "Inserto Luer",
  "Locking collar": "Ghiera di bloccaggio",
  "Identification ring": "Anello di identificazione",
  Nut: "Dado",
  "Mounting nut": "Dado di montaggio",
  "Matching collar": "Ghiera compatibile",
  "Fixed-collar male Luer": "Luer maschio con ghiera fissa",
  "Rotating-collar male Luer": "Luer maschio con ghiera girevole",
  "One-piece male Luer": "Luer maschio monopezzo",
  "Fixed male Luer insert": "Inserto Luer maschio fisso",
  "Rotating male Luer insert": "Inserto Luer maschio girevole",
  "Inline female Luer": "Luer femmina in linea",
  "Bulkhead female Luer": "Luer femmina passaparete",
  "Luer locking collar": "Ghiera di bloccaggio Luer",
  "Male Luer plug": "Tappo Luer maschio",
  "Inline female": "Femmina in linea",
  "Bulkhead female": "Femmina passaparete",
  "Fixed insert": "Inserto fisso",
  "Rotating insert": "Inserto girevole",
  "Rotating collar LPR": "LPR con ghiera girevole",
  "Fixed collar LPS": "LPS con ghiera fissa",
  "One-piece LP": "LP monopezzo",
  "Fixed insert LSL": "Inserto fisso LSL",
  "Rotating insert LRL": "Inserto girevole LRL",
  "Luer plug LPBL": "Tappo Luer LPBL",
  "Inline female LS": "Femmina in linea LS",
  "Bulkhead female PMLS": "Femmina passaparete PMLS",
  "Insert + collar": "Inserto + ghiera",
  "Bulkhead Luer assembly": "Assemblaggio Luer passaparete",
  "Inline Luer assembly": "Assemblaggio Luer in linea",
  "Plug closure assembly": "Assemblaggio di chiusura con tappo",
  "Male/female assembly": "Accoppiamento maschio–femmina",
  "Close with a plug": "Chiudi con un tappo",
  "Current insert only": "Solo l’inserto corrente",
  "Current fitting only": "Solo il raccordo corrente",
  "Assembly type": "Tipo di assemblaggio",
  "Selection mode": "Modalità di selezione",
  "Assembly specifications": "Specifiche dell’assemblaggio",
  "Selected assembly": "Assemblaggio selezionato",
  "Selection result": "Risultato della selezione",
  "Matching accessories": "Accessori compatibili",
  "Panel-mount accessories": "Accessori per montaggio a pannello",
  "Collar for the insert": "Ghiera per l’inserto",
  "current model": "modello corrente",
  required: "obbligatorio",
  "Current fitting": "Raccordo corrente",
  "Current insert": "Inserto corrente",
  "Luer assembly selector": "Selettore dell’assemblaggio Luer",
  "Luer fitting selector": "Selettore dei raccordi Luer",
  "After confirming, open “3D model” under “Drawings and documentation” to inspect the assembly and dimensions.":
    "Dopo la conferma, aprite «Modello 3D» in «Disegni e documentazione» per esaminare l’assemblaggio e le dimensioni.",
  "After confirming, open “3D model” under “Drawings and documentation” to inspect this part and its dimensions.":
    "Dopo la conferma, aprite «Modello 3D» in «Disegni e documentazione» per esaminare il componente e le dimensioni.",
  "1 part type, quantity 1. Adjust the quantity in your list.": "1 tipo di componente, quantità 1. La quantità è modificabile nell’elenco.",
  "Add to list": "Aggiungi all’elenco",
  "Add assembly": "Aggiungi l’assemblaggio",
  Added: "Aggiunto",
  "Add and request drawings": "Aggiungi e richiedi i disegni",
  "Confirm and request drawings": "Conferma e richiedi i disegni",
  "Confirm selection": "Conferma la selezione",
  "Confirm assembly": "Conferma l’assemblaggio",
  "Close assembly selector": "Chiudi il selettore dell’assemblaggio",
  "View drawing": "Vedi il disegno",
  "No published model matches these specifications. Contact us to check availability.":
    "Nessun modello a catalogo corrisponde a queste specifiche. Contattateci per verificare la disponibilità.",
  "Selected parts": "Componenti selezionati", Part: "Componente", Model: "Modello", "Product code": "Codice articolo",
  "Single-part illustration; refer to its drawing for dimensions.": "Illustrazione del componente singolo. Consultate il disegno per le dimensioni.",
  "Assembly illustration; refer to the part drawings for dimensions.": "Illustrazione dell’assemblaggio. Consultate i disegni dei componenti per le dimensioni.",
  "Choose each end’s tubing ID independently. See “Selection and use” for cutout and installation requirements.":
    "Scegliete separatamente il diametro interno del tubo alle due estremità. Consultate «Scelta e utilizzo» per l’apertura e il montaggio.",
  "LPBL closes a female Luer port and has no tubing end. Choose the female end’s tubing size for its connected tube.":
    "LPBL chiude un attacco Luer femmina ed è privo di portagomma. Scegliete la misura lato femmina in base al tubo da collegare.",
  "Panel thickness ≤3.5 mm. Omit rings or nuts already available.": "Spessore del pannello ≤3.5 mm. Escludete anelli o dadi già disponibili.",
  "Select only this insert if you already have its matching collar.": "Se avete già la ghiera compatibile, selezionate solo l’inserto.",
  "Only the current part is included; accessories are excluded.": "La selezione include solo il componente corrente, senza accessori.",
  "Only the current model is included, without mating fittings or accessories.": "La selezione include solo il modello corrente, senza raccordo di accoppiamento o accessori.",
  "Choose a valid female end": "Scegliete un raccordo femmina compatibile",
  "Choose valid mating-end specifications before confirming.": "Prima di confermare, scegliete le specifiche del raccordo di accoppiamento.",
  "Need another model? Contact us to check compatibility and availability.": "Serve un altro modello? Contattateci per verificare compatibilità e disponibilità.",
  "ring and nut": "anello di identificazione e dado",
  "鲁尔装配组合:": "Assemblaggio Luer",
};

export function italianLuerUiText(text: string): string {
  const value = text.trim();
  const direct = copy[value] ?? italianProductDetailText(value);
  if (direct !== value) return text.replace(value, direct);
  if (value.includes(" · ")) return value.split(" · ").map(italianLuerUiText).join(" · ");

  const structured = /^(Luer assembly:|Mating female:|e\.g\.) (.+)$/.exec(value);
  if (structured) {
    const labels: Record<string, string> = { "Luer assembly:": "Assemblaggio Luer:", "Mating female:": "Femmina compatibile:", "e.g.": "ad es." };
    return text.replace(value, labels[structured[1]] + " " + italianLuerUiText(structured[2]));
  }
  const model = /^(.+?) ([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+|\d+(?:\.\d+)? mm)$/.exec(value);
  if (model) return text.replace(value, italianLuerUiText(model[1]) + " " + model[2]);
  const count = /^(\d+) part types, one of each\. Adjust quantities in your list\.$/.exec(value);
  if (count) return count[1] + " tipi di componente, uno per tipo. Le quantità sono modificabili nell’elenco.";
  const only = /^(.+) only$/.exec(value);
  if (only) return "Solo: " + italianLuerUiText(only[1]);
  const current = /^Current (.+)$/.exec(value);
  if (current) return "Selezione corrente: " + italianLuerUiText(current[1]);
  const required = /^(.+) \((current model|required)\)$/.exec(value);
  if (required) return italianLuerUiText(required[1]) + " (" + copy[required[2]] + ")";
  const choose = /^Choose (Male end|Female end|Insert|Plug)$/.exec(value);
  if (choose) return "Seleziona: " + roles[choose[1]];
  const field = /^(Male end|Female end|Insert|Plug) (tubing ID|material|color|structure|mounting|selection)$/.exec(value);
  if (field) return roles[field[1]] + " – " + fields[field[2]];
  const lookup = /^Know the (Male end|Female end|Insert|Plug) model\? Enter it here$/.exec(value);
  if (lookup) return roles[lookup[1]] + ": cerca per modello";
  const noMatch = /^No available (Male end|Female end|Insert|Plug) model found\. Check the spelling\.$/.exec(value);
  if (noMatch) return roles[noMatch[1]] + ": nessun modello trovato. Controllate il codice.";
  const accessory = /^(Matching collar|Identification ring|Mounting nut) color$/.exec(value);
  if (accessory) return italianLuerUiText(accessory[1]) + " – colore";
  const excluded = /^(.+) excluded\. Make sure the required accessories are already available\.$/.exec(value);
  if (excluded) return "Esclusi: " + italianLuerUiText(excluded[1]) + ". Verificate di avere gli accessori necessari.";
  const insert = /^Insert ([A-Z0-9-]+) and an LPT collar form a (rotating|fixed)-collar male Luer assembly\. The two parts are listed separately\.$/.exec(value);
  if (insert) return "L’inserto " + insert[1] + " e la ghiera LPT formano un Luer maschio con ghiera " + (insert[2] === "rotating" ? "girevole" : "fissa") + ". I due componenti sono elencati separatamente.";
  const preview = /^(.+) part preview$/.exec(value);
  return preview ? "Anteprima del componente " + preview[1] : text;
}
