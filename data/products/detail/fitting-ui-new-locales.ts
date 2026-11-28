import { germanProductDetailText } from "./product-detail-ui.de";
import { hindiProductDetailText } from "./product-detail.hi";
import { italianProductDetailText } from "./product-detail.it";

const detailTranslations = {
  de: germanProductDetailText,
  it: italianProductDetailText,
  hi: hindiProductDetailText,
};

export type NewProductLocale = keyof typeof detailTranslations;

export function isNewProductLocale(locale: string): locale is NewProductLocale {
  return Object.hasOwn(detailTranslations, locale);
}

// Existing English presentation strings are stable keys for the shared fitting UI.
const rows: Readonly<Record<string, readonly [string, string, string]>> = {
  "Preview mode": ["Vorschaumodus", "Modalità di anteprima", "प्रीव्यू का तरीका"],
  "Assembly preview": ["Baugruppenvorschau", "Anteprima dell’assemblaggio", "असेंबली का प्रीव्यू"],
  "Part preview": ["Einzelteilvorschau", "Anteprima del componente", "पुर्ज़े का प्रीव्यू"],
  "Insert preview": ["Vorschau des Einsatzes", "Anteprima dell’inserto", "इन्सर्ट का प्रीव्यू"],
  "Loading assembly preview…": ["Baugruppenvorschau wird geladen …", "Caricamento dell’anteprima dell’assemblaggio…", "असेंबली का प्रीव्यू लोड हो रहा है…"],
  "Illustration updates with the selected parts; assembly dimensions follow the part drawings.": ["Die Vorschau zeigt die ausgewählten Teile. Die Montagemaße finden Sie in den Teilezeichnungen.", "L’anteprima si aggiorna in base ai componenti scelti. Per le dimensioni di montaggio, consulta i disegni dei componenti.", "प्रीव्यू चुने हुए पुर्ज़ों के साथ बदलता है। असेंबली के आयाम पुर्ज़ों की ड्रॉइंग में देखें।"],
  "Current part only; dimensions are given in its drawing.": ["Die Vorschau zeigt das aktuelle Einzelteil. Maße finden Sie in seiner Zeichnung.", "L’anteprima mostra il singolo componente. Consulta il relativo disegno per le dimensioni.", "प्रीव्यू में मौजूदा पुर्जा दिखता है। आयाम उसकी ड्रॉइंग में देखें।"],
  "Assembly preview is unavailable. Refer to the part images below.": ["Die Baugruppenvorschau ist nicht verfügbar. Verwenden Sie die Teilebilder unten.", "Anteprima non disponibile. Consulta le immagini dei componenti qui sotto.", "असेंबली का प्रीव्यू उपलब्ध नहीं है। नीचे पुर्ज़ों के चित्र देखें।"],
  "Choose valid specifications to preview the assembly": ["Wählen Sie eine gültige Kombination für die Vorschau.", "Scegli una combinazione valida per visualizzare l’anteprima.", "प्रीव्यू देखने के लिए सही संयोजन चुनें।"],
  "Male end": ["Steckerseite", "Estremità maschio", "नर सिरा"],
  "Female end": ["Buchsenseite", "Estremità femmina", "मादा सिरा"],
  "Bulkhead female": ["Schottbuchse", "Estremità femmina passaparete", "बल्कहेड मादा सिरा"],
  "Identification ring": ["Kennring", "Anello di identificazione", "पहचान रिंग"],
  "Nut": ["Mutter", "Dado", "नट"],
  "Mounting nut": ["Befestigungsmutter", "Dado di fissaggio", "माउंटिंग नट"],
  "Locking collar": ["Verriegelungsring", "Ghiera di bloccaggio", "लॉकिंग कॉलर"],
  "Insert": ["Einsatz", "Inserto", "इन्सर्ट"],
  "Plug": ["Verschlussstopfen", "Tappo", "प्लग"],
  "Natural": ["Natur", "Naturale", "प्राकृतिक रंग"],
  "Black": ["Schwarz", "Nero", "काला"],
  "White": ["Weiß", "Bianco", "सफ़ेद"],
  "Blue": ["Blau", "Blu", "नीला"],
  "Red": ["Rot", "Rosso", "लाल"],
  "Yellow": ["Gelb", "Giallo", "पीला"],
  "Green": ["Grün", "Verde", "हरा"],
  "Orange": ["Orange", "Arancione", "नारंगी"],
  "2D drawing": ["2D-Zeichnung", "Disegno 2D", "2D ड्रॉइंग"],
  "3D model": ["3D-Modell", "Modello 3D", "3D मॉडल"],
  "2D drawings and 3D models": ["2D-Zeichnungen und 3D-Modelle", "Disegni 2D e modelli 3D", "2D ड्रॉइंग और 3D मॉडल"],
  "Switch 2D/3D resources": ["Zwischen 2D-Zeichnung und 3D-Modell wechseln", "Passa da disegno 2D a modello 3D", "2D ड्रॉइंग और 3D मॉडल के बीच बदलें"],
  "Choose “2D drawing” or “3D model” above to begin.": ["Wählen Sie oben „2D-Zeichnung“ oder „3D-Modell“.", "Scegli «Disegno 2D» o «Modello 3D» per iniziare.", "देखने के लिए ऊपर «2D ड्रॉइंग» या «3D मॉडल» चुनें।"],
  "Preparing 3D model": ["3D-Modell wird vorbereitet", "Preparazione del modello 3D", "3D मॉडल तैयार हो रहा है"],
  "View 3D assembly": ["3D-Baugruppe ansehen", "Visualizza l’assemblaggio in 3D", "3D असेंबली देखें"],
  "Choose a part drawing": ["Bauteilzeichnung auswählen", "Scegli il disegno di un componente", "पुर्ज़े की ड्रॉइंग चुनें"],
  "No public 3D model is available. Check structure and dimensions against the corresponding drawing.": ["Für dieses Modell ist kein öffentliches 3D-Modell verfügbar. Prüfen Sie Aufbau und Maße in der zugehörigen Zeichnung.", "Il modello 3D non è disponibile al pubblico. Verifica struttura e dimensioni nel disegno corrispondente.", "इसका 3D मॉडल सार्वजनिक रूप से उपलब्ध नहीं है। बनावट और आयाम संबंधित ड्रॉइंग में देखें।"],
  "No public 2D drawing is available for this part. Use “Request drawings” to submit your request.": ["Für dieses Bauteil ist keine öffentliche 2D-Zeichnung verfügbar. Wählen Sie „Zeichnungen anfragen“.", "Non è disponibile un disegno 2D pubblico del componente. Seleziona «Richiedi disegni».", "इस पुर्ज़े की 2D ड्रॉइंग सार्वजनिक नहीं है। इसे पाने के लिए «ड्रॉइंग का अनुरोध करें» चुनें।"],
  "Loading 2D drawing": ["2D-Zeichnung wird geladen", "Caricamento del disegno 2D", "2D ड्रॉइंग लोड हो रही है"],
  "Click to preview drawing": ["Zeichnung ansehen", "Visualizza il disegno", "ड्रॉइंग देखें"],
  "Drawing failed to load. Refresh the page and try again.": ["Die Zeichnung konnte nicht geladen werden. Laden Sie die Seite neu und versuchen Sie es erneut.", "Impossibile caricare il disegno. Aggiorna la pagina e riprova.", "ड्रॉइंग लोड नहीं हुई। पेज रीफ़्रेश करके फिर कोशिश करें।"],
  "Previous page": ["Vorherige Seite", "Pagina precedente", "पिछला पेज"],
  "Next page": ["Nächste Seite", "Pagina successiva", "अगला पेज"],
  "Reload": ["Neu laden", "Ricarica", "फिर लोड करें"],
  "page": ["Seite", "Pagina", "पेज"],
  "Select another model": ["Anderes Modell auswählen", "Scegli un altro modello", "दूसरा मॉडल चुनें"],
  "Select a Model": ["Modell auswählen", "Scegli un modello", "मॉडल चुनें"],
  "Contact Us": ["Kontakt aufnehmen", "Contattaci", "हमसे संपर्क करें"],
  "Drawing": ["Zeichnung", "Disegno", "ड्रॉइंग"],
  "Technical Drawing": ["Technische Zeichnung", "Disegno tecnico", "तकनीकी ड्रॉइंग"],
  "Product resources": ["Produktunterlagen", "Documentazione del prodotto", "उत्पाद के दस्तावेज़"],
  "Valve configuration": ["Ventilausführung", "Configurazione della valvola", "वाल्व कॉन्फ़िगरेशन"],
  "Thread size": ["Gewindegröße", "Misura della filettatura", "थ्रेड साइज़"],
};

const position: Readonly<Record<NewProductLocale, number>> = { de: 0, it: 1, hi: 2 };

export function localizeFittingPresentation(english: string, locale: NewProductLocale): string {
  const key = english.trim();
  const translated = rows[key]?.[position[locale]] ?? detailTranslations[locale](key);
  return translated === key ? english : english.replace(key, translated);
}
