import type { GermanProductDetailContent } from "./product-detail-content.de";
import { isPublishedFittingDetailRoute } from "../selection/fitting-publication.generated";

const bottomCta = {
  title: "बड़ी मात्रा के ऑर्डर और कस्टम उपयोग के लिए फिटिंग",
  description: "पोर्ट, ट्यूब, सामग्री, सील, माउंटिंग और कार्य स्थितियों के अनुसार FOREACH फिटिंग चुनने, मात्रा में आपूर्ति और कस्टम विकल्प तय करने में मदद कर सकता है।",
  buttonText: "हमसे संपर्क करें",
  href: "/en/contact/",
};

export const hindiCompactFittingSlugs = {
  "bulkhead-barbed-fittings": ["pmb-u28-16d-pa-w", "pmb-u28-16d-pp-n", "pmb-u28-24d-pa-w", "pmb-u28-24d-pp-n", "pmb-u28-32d-pa-w", "pmb-u28-32d-pp-n"],
  filters: ["f-pe-60-32-pp-n", "f-pe-100-32-pp-n"],
  "check-valves": ["cv-be-32-pp-n"],
} as const;

const tubeSizes: Readonly<Record<string, string>> = { "16D": "1.6 mm", "24D": "2.4 mm", "32D": "3.2 mm" };

export function getHindiCompactFittingContent(family: string, slug: string): GermanProductDetailContent | undefined {
  const candidates: Readonly<Record<string, readonly string[]>> = hindiCompactFittingSlugs;
  if (!candidates[family]?.includes(slug) || !isPublishedFittingDetailRoute(family, slug)) return;
  const model = slug.toUpperCase();
  if (family === "bulkhead-barbed-fittings") {
    const [, , tubeCode, material] = model.split("-");
    const tubeId = tubeSizes[tubeCode];
    const title = "पैनल के आर-पार लगने वाली होज़ बार्ब फिटिंग";
    return {
      title,
      description: `${model} पैनल के आर-पार लगने वाली होज़ बार्ब फिटिंग है। इसका 1/4-28 UNF माउंटिंग थ्रेड पैनल पर इसे स्थिर करता है। दोनों सिरों पर ${tubeId} आंतरिक व्यास वाली ट्यूब लगती है। बॉडी ${material} की है। यह पैनल, एनक्लोज़र या उपकरण के भीतर की दीवार के दोनों ओर ट्यूब जोड़ती है।`,
      imageAlt: `${model}, ${title}, 1/4-28 UNF थ्रेड, ट्यूब का आंतरिक व्यास ${tubeId}, ${material}`,
      faqs: [
        { question: "इस मॉडल का माउंटिंग थ्रेड कौन-सा है?", answer: "इसका 1/4-28 UNF माउंटिंग थ्रेड है। लगाने से पहले पैनल की मोटाई और नट चलाने की जगह के अनुसार माप जाँचें।" },
        { question: "कौन-सा ट्यूब आकार उपयुक्त है?", answer: `दोनों सिरों पर ${tubeId} आंतरिक व्यास वाली ट्यूब लगती है। ट्यूब की सामग्री और माप की टॉलरेंस जाँचें।` },
        { question: "बॉडी किस सामग्री की है?", answer: `बॉडी ${material} की है। वास्तविक द्रव, तापमान और कार्य स्थितियों के अनुसार अनुकूलता जाँचें।` },
        { question: "इसे कैसे लगाएँ?", answer: "मॉडल को पैनल, एनक्लोज़र या विभाजन के छेद से गुज़ारकर नट से लगाएँ और दोनों ओर ट्यूब जोड़ें।" },
        { question: "क्या 2D ड्रॉइंग है?", answer: "मॉडल पेज पर 2D ड्रॉइंग देख सकते हैं।" },
      ],
      bottomCta,
    };
  }
  if (family === "filters") {
    const code = model.split("-")[2];
    const drawing = code === "100" ? "इस मॉडल के दस्तावेज़ों में 2D ड्रॉइंग है। डिज़ाइन या असेंबली से पहले उसका संस्करण जाँचें।" : "उत्पाद सूची में जोड़कर ड्रॉइंग माँगें। तकनीकी टीम उत्पाद और पार्ट कोड के आधार पर दस्तावेज़ का संस्करण देखेगी।";
    const title = "PE फ़िल्टर एलिमेंट वाला इनलाइन फ़िल्टर";
    return {
      title,
      description: `${model} PE सीरीज़ का इनलाइन फ़िल्टर है, जिसमें 3.2 mm कनेक्शन और PP हाउसिंग है। फ़िल्ट्रेशन कोड ${code} है। यह द्रव के कण रोकता है और पंप, वाल्व तथा दूसरे घटकों से पहले प्रारंभिक फ़िल्ट्रेशन करता है। द्रव, फ़िल्ट्रेशन की ज़रूरत, प्रवाह, दाब और तापमान के अनुसार चुनें।`,
      imageAlt: `${model}, PE सीरीज़ का इनलाइन फ़िल्टर`,
      faqs: [
        { question: "यह किस तरह का फ़िल्टर है?", answer: "यह PE सीरीज़ का इनलाइन फ़िल्टर है। फ़िल्ट्रेशन की ज़रूरत, कनेक्शन का माप और वास्तविक कार्य स्थितियाँ जाँचें।" },
        { question: "कनेक्शन का माप क्या है?", answer: "कनेक्शन के लिए 3.2 mm दिया गया है। लगाने से पहले उपयुक्त ट्यूब के माप और कनेक्शन का प्रकार जाँचें।" },
        { question: "फ़िल्ट्रेशन स्पेसिफिकेशन कहाँ जाँचें?", answer: `मॉडल का फ़िल्ट्रेशन कोड ${code} है। रेंज और वास्तविक प्रदर्शन के लिए तकनीकी दस्तावेज़ देखें या हमारी तकनीकी टीम से पुष्टि करें।` },
        { question: "क्या PP इस्तेमाल होने वाले द्रव के अनुकूल है?", answer: "द्रव की संरचना, तापमान, दाब, सफ़ाई की ज़रूरत और इस्तेमाल की अवधि साथ में जाँचें।" },
        { question: "क्या 2D ड्रॉइंग माँग सकते हैं?", answer: drawing },
      ],
      bottomCta,
    };
  }
  return {
    title: "डायफ्राम चेक वाल्व",
    description: "CV-BE-32-PP-N 3.2 mm कनेक्शन और PP हाउसिंग वाला डायफ्राम चेक वाल्व है। यह सर्किट में उलटा प्रवाह सीमित करता है। द्रव, प्रवाह, खुलने की स्थिति, कार्य दाब, तापमान और लगाने की दिशा के अनुसार चुनें।",
    imageAlt: "CV-BE-32-PP-N डायफ्राम चेक वाल्व",
    faqs: [
      { question: "यह किस तरह का चेक वाल्व है?", answer: "यह डायफ्राम चेक वाल्व है। खुलने की स्थिति, प्रवाह और द्रव की अनुकूलता संरचना के अनुसार बदलती है।" },
      { question: "कनेक्शन का माप क्या है?", answer: "कनेक्शन के लिए 3.2 mm दिया गया है। लगाने से पहले उपयुक्त ट्यूब का माप जाँचें।" },
      { question: "चेक वाल्व किस दिशा में लगाएँ?", answer: "निशान या ड्रॉइंग से इनलेट और आउटलेट पहचानें। उलटा लगाने से सर्किट के काम पर असर पड़ता है।" },
      { question: "क्या PP इस्तेमाल होने वाले द्रव के अनुकूल है?", answer: "द्रव की संरचना, तापमान, दाब, सफ़ाई की ज़रूरत और इस्तेमाल की अवधि साथ में जाँचें।" },
      { question: "क्या 2D ड्रॉइंग है?", answer: "यहाँ 2D ड्रॉइंग उपलब्ध है। डिज़ाइन या असेंबली में इस्तेमाल से पहले उत्पाद कोड और ड्रॉइंग का संस्करण जाँचें।" },
    ],
    bottomCta,
  };
};
