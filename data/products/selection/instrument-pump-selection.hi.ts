import { getPipettingCopy, type PipettingPageKey } from "./pipetting-pump-seo";
import copy from "./pipetting-pump-selection.hi.json";

const pipettingTexts: Readonly<Record<string, string>> = copy;

export function getHindiPipettingSelectionCopy(key: PipettingPageKey) {
  const source = getPipettingCopy("en", key);
  const text = (value: string) => pipettingTexts[value] ?? value;
  return {
    title: text(source.title), paragraphs: source.paragraphs.map(text),
    seoTitle: text(source.seoTitle), description: text(source.description), imageAlt: text(source.imageAlt),
  };
}

export const hindiSyringeSelectionCriteria = "सिरिंज पंप चुनते समय डिस्पेंस किए जाने वाले आयतन, सटीकता और पुनरावृत्ति के साथ डोज़िंग चैनलों की संख्या, द्रव पथ और डिस्पेंसिंग चक्र का समय तय करें। द्रव के संपर्क वाली सामग्री की अनुकूलता, माउंटिंग की जगह और संचार इंटरफ़ेस भी जाँचें। हर डोज़िंग चैनल की अपनी सिरिंज मीटरिंग इकाई होती है। वाल्व कॉन्फ़िगरेशन द्रव पथ के स्विचिंग को तय करता है। चैनल और वाल्व द्रव की मात्रा और पथ बदलने की ज़रूरतों के अनुसार चुनें। RS-232, RS-485 और CAN विकल्पों से उपकरण द्रव खींचने, डिस्पेंसिंग और वाल्व स्विचिंग को नियंत्रित कर सकता है।";

const hmdConfiguration = "HMD सीरीज़ में सोलनॉइड वाल्व द्रव पथ बदलते हैं। 30 mm और 60 mm स्ट्रोक तथा एक, 2, 3, 4, 6 और 8 चैनलों के कॉन्फ़िगरेशन उपलब्ध हैं। ये रीएजेंट डिस्पेंसिंग, सैंपल तनुकरण और कई चैनलों पर द्रव डिस्पेंस करने के लिए हैं। सोलनॉइड वाल्व और द्रव कनेक्शन ज़रूरी सर्किट के अनुसार चुनें।";
const hldConfiguration = "HLD सीरीज़ में रोटरी वाल्व द्रव पथ बदलते हैं। 30 mm और 60 mm स्ट्रोक तथा 3-, 5- और 9-वे समेत कई कस्टम वाल्व कॉन्फ़िगरेशन उपलब्ध हैं। वाल्व रीएजेंट, तनुकारक, धुलाई द्रव और डिस्पेंसिंग लाइन को जोड़ते हैं, जिससे मापी हुई मात्रा क्रम से खींची और छोड़ी जा सकती है।";

export const hindiSyringeSelectionCopy = {
  "syringe-pumps": {
    title: "स्वचालित द्रव हैंडलिंग के लिए OEM सिरिंज पंप",
    imageAlt: "स्वचालित द्रव हैंडलिंग के लिए FOREACH OEM सिरिंज पंप",
    paragraphs: [
      "FOREACH OEM सिरिंज पंप ग्लास सिरिंज की मीटरिंग को सोलनॉइड या रोटरी वाल्व के साथ जोड़ते हैं। इनसे स्वचालित विश्लेषण उपकरणों में रीएजेंट डिस्पेंसिंग, सैंपल तनुकरण और द्रव स्थानांतरण होता है। HMD सीरीज़ में सोलनॉइड वाल्व और HLD सीरीज़ में रोटरी वाल्व हैं। दोनों में 30 mm और 60 mm स्ट्रोक विकल्प हैं। IVD विश्लेषकों, लैब उपकरणों और स्वचालित द्रव हैंडलिंग सिस्टम के लिए मीटरिंग चैनलों की संख्या, वाल्व और द्रव कनेक्शन चुने जा सकते हैं।",
      hindiSyringeSelectionCriteria,
      hmdConfiguration + " " + hldConfiguration,
    ],
  },
  "solenoid-valve-syringe-pumps": {
    title: "रीएजेंट डिस्पेंसिंग के लिए सोलनॉइड वाल्व वाले HMD OEM सिरिंज पंप",
    imageAlt: "सोलनॉइड वाल्व वाले FOREACH HMD सिरिंज पंप",
    paragraphs: [
      "FOREACH HMD OEM सिरिंज पंप में ग्लास सिरिंज की मीटरिंग और सोलनॉइड वाल्व की स्विचिंग एक साथ काम करती हैं। ये स्वचालित विश्लेषण उपकरणों में रीएजेंट डिस्पेंसिंग, सैंपल तनुकरण और कई चैनलों पर द्रव डिस्पेंस करने के लिए हैं। सिरिंज ड्राइव द्रव खींचने और छोड़ने को नियंत्रित करती है। सोलनॉइड वाल्व जुड़े हुए द्रव पथ बदलते हैं।",
      hindiSyringeSelectionCriteria, hmdConfiguration,
    ],
  },
  "rotary-valve-syringe-pumps": {
    title: "रीएजेंट चुनने और डिस्पेंस करने के लिए रोटरी वाल्व वाले HLD OEM सिरिंज पंप",
    imageAlt: "रोटरी वाल्व वाले FOREACH HLD सिरिंज पंप",
    paragraphs: [
      "FOREACH HLD OEM सिरिंज पंप ग्लास सिरिंज की मीटरिंग को मल्टी-वे रोटरी वाल्व के साथ जोड़ते हैं। ये स्वचालित विश्लेषण उपकरणों में रीएजेंट चयन, सैंपल तनुकरण और मापी हुई मात्रा डिस्पेंस करने के लिए हैं। रोटरी वाल्व द्रव का स्रोत या आपूर्ति पथ चुनता है। सिरिंज द्रव खींचने और छोड़ने को नियंत्रित करती है।",
      hindiSyringeSelectionCriteria, hldConfiguration,
    ],
  },
} as const;

export const hindiSyringeCategoryDescription = "स्वचालित द्रव हैंडलिंग के लिए FOREACH OEM सिरिंज पंप, सोलनॉइड या रोटरी वाल्व, 30/60 mm स्ट्रोक और सिंगल या मल्टीचैनल कॉन्फ़िगरेशन में।";
