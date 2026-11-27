import { germanProductDetailText } from "./product-detail-ui.de";

const roles = {
  "Male end": "Stecker",
  "Female end": "Buchse",
  Insert: "Einsatz",
  Plug: "Verschlussstopfen",
} as const;

const fields = {
  "tubing ID": "Schlauch-Innendurchmesser",
  material: "Werkstoff",
  color: "Farbe",
  structure: "Bauform",
  mounting: "Montage",
  selection: "Auswahl",
} as const;

const copy: Readonly<Record<string, string>> = {
  Natural: "Natur",
  White: "Weiß",
  Black: "Schwarz",
  Red: "Rot",
  Green: "Grün",
  Blue: "Blau",
  Orange: "Orange",
  Yellow: "Gelb",
  ...roles,
  "Luer insert": "Luer-Einsatz",
  "Locking collar": "Verriegelungsring",
  "Identification ring": "Kennzeichnungsring",
  Nut: "Mutter",
  "Mounting nut": "Befestigungsmutter",
  "Matching collar": "Passender Verriegelungsring",
  "Fixed-collar male Luer": "Luer-Stecker mit festem Verriegelungsring",
  "Rotating-collar male Luer": "Luer-Stecker mit drehbarem Verriegelungsring",
  "One-piece male Luer": "Einteiliger Luer-Stecker",
  "Fixed male Luer insert": "Feststehender Luer-Steckeinsatz",
  "Rotating male Luer insert": "Drehbarer Luer-Steckeinsatz",
  "Inline female Luer": "Luer-Inline-Buchse",
  "Bulkhead female Luer": "Luer-Schottbuchse",
  "Luer locking collar": "Luer-Verriegelungsring",
  "Male Luer plug": "Luer-Steckstopfen",
  "Inline female": "Inline-Buchse",
  "Bulkhead female": "Schottbuchse",
  "Fixed insert": "Feststehender Einsatz",
  "Rotating insert": "Drehbarer Einsatz",
  "Rotating collar LPR": "LPR mit drehbarem Verriegelungsring",
  "Fixed collar LPS": "LPS mit festem Verriegelungsring",
  "One-piece LP": "Einteiliger LP-Stecker",
  "Fixed insert LSL": "LSL mit feststehendem Einsatz",
  "Rotating insert LRL": "LRL mit drehbarem Einsatz",
  "Luer plug LPBL": "Luer-Steckstopfen LPBL",
  "Inline female LS": "Luer-Inline-Buchse LS",
  "Bulkhead female PMLS": "Luer-Schottbuchse PMLS",
  "Insert + collar": "Einsatz mit Verriegelungsring",
  "Bulkhead Luer assembly": "Luer-Kombination für Schottmontage",
  "Inline Luer assembly": "Luer-Inline-Kombination",
  "Plug closure assembly": "Luer-Verschlusskombination",
  "Male/female assembly": "Stecker und Buchse kombinieren",
  "Close with a plug": "Mit Stopfen verschließen",
  "Current insert only": "Nur aktueller Einsatz",
  "Current fitting only": "Nur aktueller Verbinder",
  "Assembly type": "Kombinationsart",
  "Selection mode": "Auswahlmodus",
  "Assembly specifications": "Spezifikationen der Kombination",
  "Selected assembly": "Ausgewählte Kombination",
  "Selection result": "Auswahlergebnis",
  "Matching accessories": "Passendes Zubehör",
  "Panel-mount accessories": "Zubehör für Schottmontage",
  "Collar for the insert": "Verriegelungsring für den Einsatz",
  "current model": "aktuelles Modell",
  required: "erforderlich",
  "Current fitting": "Aktueller Verbinder",
  "Current insert": "Aktueller Einsatz",
  "Luer assembly selector": "Luer-Kombination auswählen",
  "Luer fitting selector": "Luer-Verbinder auswählen",
  "After confirming, open “3D model” under “Drawings and documentation” to inspect the assembly and dimensions.":
    "Öffnen Sie nach der Bestätigung unter „Zeichnungen und Unterlagen“ das 3D-Modell, um Kombination und Maße zu prüfen.",
  "After confirming, open “3D model” under “Drawings and documentation” to inspect this part and its dimensions.":
    "Öffnen Sie nach der Bestätigung unter „Zeichnungen und Unterlagen“ das 3D-Modell, um Bauteil und Maße zu prüfen.",
  "1 part type, quantity 1. Adjust the quantity in your list.":
    "1 Bauteil, Menge 1. Die Menge lässt sich in der Anfrageliste ändern.",
  "Add to list": "Zur Anfrageliste hinzufügen",
  "Add assembly": "Kombination zur Anfrageliste hinzufügen",
  Added: "Hinzugefügt",
  "Add and request drawings": "Hinzufügen und Zeichnungen anfragen",
  "Confirm and request drawings": "Bestätigen und Zeichnungen anfragen",
  "Confirm selection": "Auswahl bestätigen",
  "Confirm assembly": "Kombination bestätigen",
  "Close assembly selector": "Kombinationsauswahl schließen",
  "View drawing": "Zeichnung ansehen",
  "No published model matches these specifications. Contact us to check availability.":
    "In unserem Online-Katalog entspricht kein Modell diesen Spezifikationen. Kontaktieren Sie uns zur Klärung der Verfügbarkeit.",
  "Selected parts": "Ausgewählte Bauteile",
  Part: "Bauteil",
  Model: "Modell",
  "Product code": "Bestellnummer",
  "Single-part illustration; refer to its drawing for dimensions.":
    "Darstellung des Einzelteils. Die Maße finden Sie in der zugehörigen Zeichnung.",
  "Assembly illustration; refer to the part drawings for dimensions.":
    "Darstellung der Kombination. Die Maße finden Sie in den Teilezeichnungen.",
  "Choose each end’s tubing ID independently. See “Selection and use” for cutout and installation requirements.":
    "Der Schlauch-Innendurchmesser ist für beide Seiten separat wählbar. Hinweise zu Ausschnitt und Montage finden Sie unter „Auswahl und Einsatz“.",
  "LPBL closes a female Luer port and has no tubing end. Choose the female end’s tubing size for its connected tube.":
    "LPBL verschließt eine Luer-Buchse und hat keinen Schlauchanschluss. Wählen Sie die Buchse passend zum Innendurchmesser des anzuschließenden Schlauchs.",
  "Panel thickness ≤3.5 mm. Omit rings or nuts already available.":
    "Plattenstärke ≤3.5 mm. Bereits vorhandene Kennzeichnungsringe oder Befestigungsmuttern können abgewählt werden.",
  "Select only this insert if you already have its matching collar.":
    "Wählen Sie nur den Einsatz, wenn der passende Verriegelungsring bereits vorhanden ist.",
  "Only the current part is included; accessories are excluded.": "Die Auswahl umfasst nur das aktuelle Bauteil.",
  "Only the current model is included, without mating fittings or accessories.":
    "Die Auswahl umfasst nur das aktuelle Modell ohne Gegenstück und Zubehör.",
  "Choose a valid female end": "Wählen Sie eine passende Buchse.",
  "Choose valid mating-end specifications before confirming.": "Wählen Sie vor dem Bestätigen ein passendes Gegenstück.",
  "Need another model? Contact us to check compatibility and availability.":
    "Benötigen Sie ein anderes Modell? Kontaktieren Sie uns zur Prüfung von Kompatibilität und Verfügbarkeit.",
  "ring and nut": "Kennzeichnungsring und Befestigungsmutter",
  "鲁尔装配组合:": "Luer-Kombination",
};

export function germanLuerUiText(text: string): string {
  const value = text.trim();
  const direct = Object.hasOwn(copy, value) ? copy[value] : germanProductDetailText(value);
  if (direct !== value) return text.replace(value, direct);
  const structured = /^(Luer assembly:|Mating female:|e\.g\.) (.+)$/.exec(value);
  if (structured) {
    const labels = { "Luer assembly:": "Luer-Kombination:", "Mating female:": "Passende Buchse:", "e.g.": "z. B." };
    return text.replace(value, labels[structured[1] as keyof typeof labels] + " " + germanLuerUiText(structured[2]));
  }
  const model = /^(.+?) ([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+|\d+(?:\.\d+)? mm)$/.exec(value);
  if (model) return text.replace(value, germanLuerUiText(model[1]) + " " + model[2]);
  if (value.includes(" · ")) return value.split(" · ").map(germanLuerUiText).join(" · ");
  const count = /^(\d+) part types, one of each\. Adjust quantities in your list\.$/.exec(value);
  if (count) return count[1] + " unterschiedliche Bauteile mit je 1 Stück. Die Menge lässt sich in der Anfrageliste ändern.";
  const only = /^(.+) only$/.exec(value);
  if (only) return "Nur " + germanLuerUiText(only[1]);
  const current = /^(?:Current )(.+)$/.exec(value);
  if (current) return "Aktuelle Auswahl: " + germanLuerUiText(current[1]);
  const required = /^(.+) \((current model|required)\)$/.exec(value);
  if (required) return germanLuerUiText(required[1]) + " (" + copy[required[2]] + ")";
  const choose = /^Choose (Male end|Female end|Insert|Plug)$/.exec(value);
  if (choose) return roles[choose[1] as keyof typeof roles] + " auswählen";
  const field = /^(Male end|Female end|Insert|Plug) (tubing ID|material|color|structure|mounting|selection)$/.exec(value);
  if (field) return roles[field[1] as keyof typeof roles] + " – " + fields[field[2] as keyof typeof fields];
  const lookup = /^Know the (Male end|Female end|Insert|Plug) model\? Enter it here$/.exec(value);
  if (lookup) return roles[lookup[1] as keyof typeof roles] + " nach Modellnummer suchen";
  const noMatch = /^No available (Male end|Female end|Insert|Plug) model found\. Check the spelling\.$/.exec(value);
  if (noMatch) return "Für " + roles[noMatch[1] as keyof typeof roles] + " wurde keine passende Modellnummer gefunden.";
  const accessory = /^(Matching collar|Identification ring|Mounting nut) color$/.exec(value);
  if (accessory) return germanLuerUiText(accessory[1]) + " – Farbe";
  const excluded = /^(.+) excluded\. Make sure the required accessories are already available\.$/.exec(value);
  if (excluded) return "Nicht ausgewählt: " + germanLuerUiText(excluded[1]) + ". Halten Sie das benötigte Zubehör bereit.";
  const insert = /^Insert ([A-Z0-9-]+) and an LPT collar form a (rotating|fixed)-collar male Luer assembly\. The two parts are listed separately\.$/.exec(value);
  if (insert) {
    const collar = insert[2] === "rotating" ? "drehbarem" : "festem";
    return "Der Einsatz " + insert[1] + " bildet mit einem LPT-Ring einen Luer-Stecker mit " + collar
      + " Verriegelungsring. Beide Bauteile werden einzeln aufgeführt.";
  }
  const preview = /^(.+) part preview$/.exec(value);
  if (preview) return "Einzelteilvorschau " + preview[1];
  return text;
}
