import { hindiProductDetailText } from "./product-detail.hi";

const roles: Readonly<Record<string, string>> = {
  "Male end": "मेल सिरा", "Female end": "फ़ीमेल सिरा", Insert: "इंसर्ट", Plug: "प्लग",
};
const fields: Readonly<Record<string, string>> = {
  "tubing ID": "ट्यूब का आंतरिक व्यास", material: "सामग्री", color: "रंग",
  structure: "बनावट", mounting: "माउंटिंग", selection: "चयन",
};
const copy: Readonly<Record<string, string>> = {
  ...roles,
  Natural: "प्राकृतिक", White: "सफ़ेद", Black: "काला", Red: "लाल", Green: "हरा", Blue: "नीला", Orange: "नारंगी", Yellow: "पीला",
  "Luer insert": "लुअर इंसर्ट",
  "Locking collar": "लॉकिंग कॉलर",
  "Identification ring": "पहचान रिंग",
  Nut: "नट",
  "Mounting nut": "माउंटिंग नट",
  "Matching collar": "उपयुक्त कॉलर",
  "Fixed-collar male Luer": "स्थिर कॉलर वाला मेल लुअर",
  "Rotating-collar male Luer": "घूमने वाले कॉलर वाला मेल लुअर",
  "One-piece male Luer": "एक-टुकड़ा मेल लुअर",
  "Fixed male Luer insert": "स्थिर मेल लुअर इंसर्ट",
  "Rotating male Luer insert": "घूमने वाला मेल लुअर इंसर्ट",
  "Inline female Luer": "लाइन में लगने वाला फ़ीमेल लुअर",
  "Bulkhead female Luer": "पैनल-माउंट फ़ीमेल लुअर",
  "Luer locking collar": "लुअर लॉकिंग कॉलर",
  "Male Luer plug": "मेल लुअर प्लग",
  "Inline female": "लाइन में लगने वाला फ़ीमेल सिरा",
  "Bulkhead female": "पैनल-माउंट फ़ीमेल सिरा",
  "Fixed insert": "स्थिर इंसर्ट",
  "Rotating insert": "घूमने वाला इंसर्ट",
  "Rotating collar LPR": "घूमने वाले कॉलर वाला LPR",
  "Fixed collar LPS": "स्थिर कॉलर वाला LPS",
  "One-piece LP": "एक-टुकड़ा LP",
  "Fixed insert LSL": "स्थिर इंसर्ट LSL",
  "Rotating insert LRL": "घूमने वाला इंसर्ट LRL",
  "Luer plug LPBL": "लुअर प्लग LPBL",
  "Inline female LS": "लाइन में लगने वाला फ़ीमेल सिरा LS",
  "Bulkhead female PMLS": "पैनल-माउंट फ़ीमेल सिरा PMLS",
  "Insert + collar": "इंसर्ट + कॉलर",
  "Bulkhead Luer assembly": "पैनल-माउंट लुअर असेंबली",
  "Inline Luer assembly": "लाइन में लगने वाली लुअर असेंबली",
  "Plug closure assembly": "प्लग से बंद करने की असेंबली",
  "Male/female assembly": "मेल–फ़ीमेल असेंबली",
  "Close with a plug": "प्लग से बंद करें",
  "Current insert only": "केवल वर्तमान इंसर्ट",
  "Current fitting only": "केवल वर्तमान फिटिंग",
  "Assembly type": "असेंबली का प्रकार",
  "Selection mode": "चयन का तरीका",
  "Assembly specifications": "असेंबली के विनिर्देश",
  "Selected assembly": "चुनी गई असेंबली",
  "Selection result": "चयन का परिणाम",
  "Matching accessories": "साथ लगने वाले पुर्जे",
  "Panel-mount accessories": "पैनल माउंटिंग के पुर्जे",
  "Collar for the insert": "इंसर्ट का कॉलर",
  "current model": "वर्तमान मॉडल",
  required: "ज़रूरी",
  "Current fitting": "वर्तमान फिटिंग",
  "Current insert": "वर्तमान इंसर्ट",
  "Luer assembly selector": "लुअर असेंबली चुनें",
  "Luer fitting selector": "लुअर फिटिंग चुनें",
  "After confirming, open “3D model” under “Drawings and documentation” to inspect the assembly and dimensions.":
    "पुष्टि के बाद “ड्रॉइंग और दस्तावेज़” में “3D मॉडल” खोलकर असेंबली और उसके आयाम देखें।",
  "After confirming, open “3D model” under “Drawings and documentation” to inspect this part and its dimensions.":
    "पुष्टि के बाद “ड्रॉइंग और दस्तावेज़” में “3D मॉडल” खोलकर यह पुर्जा और उसके आयाम देखें।",
  "1 part type, quantity 1. Adjust the quantity in your list.": "1 तरह का पुर्जा, मात्रा 1। मात्रा अपनी सूची में बदलें।",
  "Add to list": "सूची में जोड़ें",
  "Add assembly": "असेंबली जोड़ें",
  Added: "जोड़ा गया",
  "Add and request drawings": "जोड़ें और ड्रॉइंग माँगें",
  "Confirm and request drawings": "पुष्टि करें और ड्रॉइंग माँगें",
  "Confirm selection": "चयन की पुष्टि करें",
  "Confirm assembly": "असेंबली की पुष्टि करें",
  "Close assembly selector": "असेंबली चयन बंद करें",
  "View drawing": "ड्रॉइंग देखें",
  "No published model matches these specifications. Contact us to check availability.":
    "इन विनिर्देशों से कोई सूचीबद्ध मॉडल मेल नहीं खाता। उपलब्धता जानने के लिए हमसे संपर्क करें।",
  "Selected parts": "चुने गए पुर्जे", Part: "पुर्जा", Model: "मॉडल", "Product code": "उत्पाद कोड",
  "Single-part illustration; refer to its drawing for dimensions.": "एक पुर्जे का चित्र। आयाम के लिए उसकी ड्रॉइंग देखें।",
  "Assembly illustration; refer to the part drawings for dimensions.": "असेंबली का चित्र। आयाम के लिए पुर्जों की ड्रॉइंग देखें।",
  "Choose each end’s tubing ID independently. See “Selection and use” for cutout and installation requirements.":
    "दोनों सिरों की ट्यूब का आंतरिक व्यास अलग-अलग चुनें। कटआउट और माउंटिंग की ज़रूरतें “चयन और उपयोग” में देखें।",
  "LPBL closes a female Luer port and has no tubing end. Choose the female end’s tubing size for its connected tube.":
    "LPBL फ़ीमेल लुअर पोर्ट बंद करता है। इसमें ट्यूब लगाने का सिरा नहीं है। फ़ीमेल सिरे का आकार उससे जुड़ी ट्यूब के अनुसार चुनें।",
  "Panel thickness ≤3.5 mm. Omit rings or nuts already available.": "पैनल की मोटाई ≤3.5 mm। पहले से मौजूद रिंग या नट को चयन से हटा सकते हैं।",
  "Select only this insert if you already have its matching collar.": "उपयुक्त कॉलर पहले से है तो केवल यह इंसर्ट चुनें।",
  "Only the current part is included; accessories are excluded.": "केवल वर्तमान पुर्जा चुना गया है। साथ लगने वाले पुर्जे शामिल नहीं हैं।",
  "Only the current model is included, without mating fittings or accessories.": "केवल वर्तमान मॉडल चुना गया है। उससे जुड़ने वाली फिटिंग या सहायक पुर्जे शामिल नहीं हैं।",
  "Choose a valid female end": "उपयुक्त फ़ीमेल सिरा चुनें",
  "Choose valid mating-end specifications before confirming.": "पुष्टि से पहले साथ लगने वाले सिरे के उपयुक्त विनिर्देश चुनें।",
  "Need another model? Contact us to check compatibility and availability.": "दूसरा मॉडल चाहिए? संगतता और उपलब्धता जानने के लिए हमसे संपर्क करें।",
  "ring and nut": "पहचान रिंग और नट",
  "鲁尔装配组合:": "लुअर असेंबली",
};

export function hindiLuerUiText(text: string): string {
  const value = text.trim();
  const direct = copy[value] ?? hindiProductDetailText(value);
  if (direct !== value) return text.replace(value, direct);
  if (value.includes(" · ")) return value.split(" · ").map(hindiLuerUiText).join(" · ");

  const structured = /^(Luer assembly:|Mating female:|e\.g\.) (.+)$/.exec(value);
  if (structured) {
    const labels: Record<string, string> = { "Luer assembly:": "लुअर असेंबली:", "Mating female:": "साथ लगने वाला फ़ीमेल सिरा:", "e.g.": "उदाहरण" };
    return text.replace(value, labels[structured[1]] + " " + hindiLuerUiText(structured[2]));
  }
  const model = /^(.+?) ([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+|\d+(?:\.\d+)? mm)$/.exec(value);
  if (model) return text.replace(value, hindiLuerUiText(model[1]) + " " + model[2]);
  const count = /^(\d+) part types, one of each\. Adjust quantities in your list\.$/.exec(value);
  if (count) return count[1] + " तरह के पुर्जे, हर तरह का एक। मात्रा अपनी सूची में बदलें।";
  const only = /^(.+) only$/.exec(value);
  if (only) return "केवल " + hindiLuerUiText(only[1]);
  const current = /^Current (.+)$/.exec(value);
  if (current) return "वर्तमान चयन: " + hindiLuerUiText(current[1]);
  const required = /^(.+) \((current model|required)\)$/.exec(value);
  if (required) return hindiLuerUiText(required[1]) + " (" + copy[required[2]] + ")";
  const choose = /^Choose (Male end|Female end|Insert|Plug)$/.exec(value);
  if (choose) return roles[choose[1]] + " चुनें";
  const field = /^(Male end|Female end|Insert|Plug) (tubing ID|material|color|structure|mounting|selection)$/.exec(value);
  if (field) return roles[field[1]] + " – " + fields[field[2]];
  const lookup = /^Know the (Male end|Female end|Insert|Plug) model\? Enter it here$/.exec(value);
  if (lookup) return roles[lookup[1]] + ": मॉडल से खोजें";
  const noMatch = /^No available (Male end|Female end|Insert|Plug) model found\. Check the spelling\.$/.exec(value);
  if (noMatch) return roles[noMatch[1]] + ": मॉडल नहीं मिला। कोड जाँचें।";
  const accessory = /^(Matching collar|Identification ring|Mounting nut) color$/.exec(value);
  if (accessory) return hindiLuerUiText(accessory[1]) + " – रंग";
  const excluded = /^(.+) excluded\. Make sure the required accessories are already available\.$/.exec(value);
  if (excluded) return "चयन से हटाए गए: " + hindiLuerUiText(excluded[1]) + "। जाँचें कि ज़रूरी पुर्जे आपके पास हैं।";
  const insert = /^Insert ([A-Z0-9-]+) and an LPT collar form a (rotating|fixed)-collar male Luer assembly\. The two parts are listed separately\.$/.exec(value);
  if (insert) return insert[1] + " इंसर्ट और LPT कॉलर मिलकर " + (insert[2] === "rotating" ? "घूमने वाले" : "स्थिर") + " कॉलर वाला मेल लुअर बनाते हैं। दोनों पुर्जे अलग-अलग सूचीबद्ध हैं।";
  const preview = /^(.+) part preview$/.exec(value);
  return preview ? preview[1] + " पुर्जे का प्रीव्यू" : text;
}
