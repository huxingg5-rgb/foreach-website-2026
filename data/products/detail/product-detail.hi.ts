import { hindiProductSelectionLabel } from "../selection/product-selection.hi";
import { getHardTubePlugPresentation, isHardTubePlug } from "./hard-tube-plugs";
import detailTexts from "./product-detail.hi.json";

const copy: Readonly<Record<string, string>> = detailTexts;

export function hindiProductDetailText(value: string): string {
  const direct = copy[value] ?? copy[value.trim()];
  if (direct !== undefined) return value.replace(value.trim(), direct);
  return hindiProductSelectionLabel(value);
}

const hflTitle = "मानक आकार की नर्ल्ड समतल-तल फिटिंग";

export const hindiHardTubeFittingSlugs = [
  "hbl-m6-pv-b",
  "hbl-m6-pv-n",
  "hbl-u28-pv-b",
  "hbl-u28-pv-n",
  "hbl6-m6-ps-b",
  "hbl6-u28-ps-b",
  "hbl6x-m6-pv-n",
  "hbl6x-u28-pv-n",
  "pnc-u32-16-pk-n",
  "pnc6-u32-16-pk-n",
  "pnf-u32-16-ss-n",
  "pu-u32-08-ss-n",
  "pu-u32-u28-08-ss-n",
  "put-u32-05-ss-n",
  "hnf-m6-16-pv-b",
  "hnf-m6-16-pv-n",
  "hnf-m6-20-pv-b",
  "hnf-m6-20-pv-n",
  "hnf-m6-25-pv-b",
  "hnf-m6-25-pv-n",
  "hnf-m6-30-pv-b",
  "hnf-m6-30-pv-n",
  "hnf-m6-32-pv-b",
  "hnf-m6-32-pv-n",
  "hnf-u28-16-pv-b",
  "hnf-u28-16-pv-n",
  "hnf-u28-20-pv-b",
  "hnf-u28-20-pv-n",
  "hnf-u28-25-pv-b",
  "hnf-u28-25-pv-n",
  "hnf-u28-30-pv-b",
  "hnf-u28-30-pv-n",
  "hnf-u28-32-pv-b",
  "hnf-u28-32-pv-n",
  "hnf6-m6-16-ps-b",
  "hnf6-m6-20-ps-b",
  "hnf6-m6-25-ps-b",
  "hnf6-m6-30-ps-b",
  "hnf6-m6-32-ps-b",
  "hnf6-u28-25-ps-b",
  "hnf6-u28-30-ps-b",
  "hnf6-u28-32-ps-b",
  "hn-m6-16-pk-n",
  "hn-m6-16-pv-n",
  "hn-m6-32-pk-n",
  "hn-m6-32-pv-n",
  "hn-u28-16-pk-n",
  "hn-u28-16-pv-n",
  "hn-u28-32-pk-n",
  "hn-u28-32-pv-n",
  "hn6-m6-16-pk-n",
  "hn6-m6-16-pv-n",
  "hn6-m6-32-pk-n",
  "hn6-u28-16-pk-n",
  "hn6-u28-16-pv-n",
  "hfl6-m6-16-ps-b",
  "hfl6-m6-20-ps-b",
  "hfl6-m6-30-ps-b",
  "hfl6-m6-32-ps-b",
  "hfl6-u28-25-ps-b",
  "hfl6-u28-30-ps-b",
  "hfl6-u28-32-ps-b",
  "hfl6-u40-16-pk-n",
  "hf-m6-20-pk-n",
  "hf-m6-20-ps-b",
  "hf-m6-20-pv-n",
  "hf-m6-25-pk-n",
  "hf-m6-25-ps-b",
  "hf-m6-25-pv-n",
  "hf-m6-32-pk-n",
  "hf-m6-32-ps-b",
  "hf-m6-32-pv-n",
  "hf-u28-20-pk-n",
  "hf-u28-20-ps-b",
  "hf-u28-20-pv-n",
  "hf-u28-25-pk-n",
  "hf-u28-25-ps-b",
  "hf-u28-25-pv-n",
  "hf-u28-32-pk-n",
  "hf-u28-32-ps-b",
  "hf-u28-32-pv-n",
  "hf6-m6-20-pk-n",
  "hf6-m6-20-ps-b",
  "hf6-m6-20-pv-n",
  "hf6-m6-25-pk-n",
  "hf6-m6-25-ps-b",
  "hf6-m6-25-pv-n",
  "hf6-m6-32-pk-n",
  "hf6-m6-32-ps-b",
  "hf6-m6-32-pv-n",
  "hf6-u28-20-pk-n",
  "hf6-u28-20-ps-b",
  "hf6-u28-20-pv-n",
  "hf6-u28-25-pk-n",
  "hf6-u28-25-ps-b",
  "hf6-u28-25-pv-n",
  "hf6-u28-32-pk-n",
  "hf6-u28-32-ps-b",
  "hf6-u28-32-pv-n",
  "hfl-m6-16-pv-b",
  "hfl-m6-16-pv-n",
  "hfl-m6-20-pv-b",
  "hfl-m6-20-pv-n",
  "hfl-m6-25-pv-b",
  "hfl-m6-25-pv-n",
  "hfl-m6-30-pv-b",
  "hfl-m6-30-pv-n",
  "hfl-m6-32-pv-b",
  "hfl-m6-32-pv-n",
  "hfl-u28-16-pv-b",
  "hfl-u28-16-pv-n",
  "hfl-u28-20-pv-b",
  "hfl-u28-20-pv-n",
  "hfl-u28-25-pv-b",
  "hfl-u28-25-pv-n",
  "hfl-u28-30-pv-b",
  "hfl-u28-30-pv-n",
  "hfl-u28-32-pv-b",
  "hfl-u28-32-pv-n"
] as const;

const hindiFittingBottomCta = {
  title: "बड़ी मात्रा के ऑर्डर और कस्टम उपयोग के लिए फिटिंग",
  description: "पोर्ट के प्रकार, ट्यूब के आकार, सामग्री, सील, माउंटिंग और कार्य स्थितियों के आधार पर FOREACH फिटिंग चुनने, बड़ी मात्रा में आपूर्ति करने और कस्टम विकल्प तय करने में मदद कर सकता है।",
  buttonText: "हमसे संपर्क करें",
  href: "/en/contact/",
};

const hindiPressureFittings: Readonly<Record<string, { title: string; description: string; selectionNote: string }>> = {
  "PNC-U32-16-PK-N": {
    title: "मानक आकार की उच्च-दाब फिटिंग",
    description: "इसकी बॉडी एक ही PEEK टुकड़े से बनी है। यह 1.6 mm बाहरी व्यास वाली कठोर ट्यूब और 10-32 UNF शंक्वाकार तली वाले पोर्ट के लिए है। टेपर, पोर्ट की गहराई और ट्यूब के सिरे की स्थिति जाँचें।",
    selectionNote: "959021 बिट और T-ST 956002 से कसाव नियंत्रित कर सकते हैं। ट्यूब, पोर्ट और ट्यूब डालने की गहराई के अनुसार टॉर्क की पहले पुष्टि करें।",
  },
  "PNC6-U32-16-PK-N": {
    title: "कॉम्पैक्ट उच्च-दाब फिटिंग",
    description: "इसकी बॉडी एक ही PEEK टुकड़े से बनी है। यह 1.6 mm बाहरी व्यास वाली कठोर ट्यूब और 10-32 UNF शंक्वाकार तली वाले पोर्ट के लिए है। PNC से इसकी बॉडी पतली और लंबी है और औज़ार के लिए षट्कोणीय भाग दिया गया है।",
    selectionNote: "षट्कोणीय भाग के अनुसार बिट या सॉकेट चुनें। PNC का 959021 बिट PNC6 के लिए पुष्टि किया हुआ विकल्प नहीं है।",
  },
  "PNF-U32-16-SS-N": {
    title: "उच्च-दाब फेरूल फिटिंग किट",
    description: "किट में SUS फिटिंग और अलग धातु फेरूल है। यह 1.6 mm बाहरी व्यास वाली कठोर ट्यूब को 10-32 UNF शंक्वाकार तली वाले पोर्ट से जोड़ती है। किट का धातु फेरूल और ट्यूब की टॉलरेंस जाँचें।",
    selectionNote: "मैनुअल का धातु फिटिंग के लिए संदर्भ कसाव टॉर्क 2.2 N·m है। इस किट, ट्यूब और पोर्ट के अनुसार कसाव की पुष्टि करें और उपयुक्त रेंज का षट्कोणीय टॉर्क औज़ार लें।",
  },
  "PU-U32-08-SS-N": {
    title: "आंतरिक थ्रेड वाला सीधा उच्च-दाब यूनियन",
    description: "SUS बॉडी के दोनों सिरों पर 10-32 UNF आंतरिक थ्रेड है। द्रव मार्ग का आंतरिक व्यास 0.8 mm है। दोनों सिरों पर पोर्ट के अनुरूप बाहरी थ्रेड वाली फिटिंग और ट्यूब चुनें।",
    selectionNote: "द्रव मार्ग के 0.8 mm व्यास और जुड़ने वाली ट्यूब के बाहरी व्यास को अलग-अलग जाँचें। ट्यूब का व्यास दोनों बाहरी फिटिंग पर निर्भर है।",
  },
  "PU-U32-U28-08-SS-N": {
    title: "आंतरिक थ्रेड वाला सीधा उच्च-दाब यूनियन",
    description: "SUS बॉडी के एक सिरे पर 10-32 UNF और दूसरे पर 1/4-28 UNF आंतरिक थ्रेड है। द्रव मार्ग का आंतरिक व्यास 0.8 mm है। दोनों सिरों का थ्रेड, सीलिंग सतह और गहराई अलग-अलग जाँचें।",
    selectionNote: "U32 और U28 सिरों के लिए बाहरी थ्रेड वाली फिटिंग अलग-अलग चुनें। एक सिरे का कसाव टॉर्क दूसरे सिरे पर सीधे लागू न करें।",
  },
  "PUT-U32-05-SS-N": {
    title: "आंतरिक थ्रेड वाला उच्च-दाब T कनेक्टर",
    description: "SUS बॉडी पर तीन 10-32 UNF आंतरिक थ्रेड वाले पोर्ट हैं। मुख्य द्रव मार्ग का आंतरिक व्यास 0.5 mm है। यह प्रवाह बाँटने या मिलाने के लिए है। हर पोर्ट की फिटिंग और ट्यूब अलग चुनें।",
    selectionNote: "हर शाखा के प्रवाह पर सिस्टम के प्रतिरोध का असर पड़ता है। मुख्य द्रव मार्ग के 0.5 mm व्यास से तीनों शाखाओं का प्रवाह बराबर होना तय नहीं होता।",
  },
};


export function getHindiHardTubeFittingContent(detail: { slug: string; model: string; specs?: { label?: string; value?: unknown }[]; specifications?: { label?: string; value?: unknown }[] }) {
  if (!hindiHardTubeFittingSlugs.some(slug => slug === detail.slug)) return undefined;
  const model = detail.model;
  if (isHardTubePlug(detail)) {
    const plug = getHardTubePlugPresentation(detail, "hi");
    return {
      title: plug.name,
      description: plug.description,
      metaTitle: `${model} | ${plug.name} | FOREACH`,
      imageAlt: `${model}, ${plug.material} का ${plug.name}`,
      faqs: plug.copy.faq.map(([question, answer]) => ({ question, answer })),
      bottomCta: { title: plug.copy.request, description: plug.copy.requestText, buttonText: plug.copy.contact, href: "/en/contact/" },
    };
  }
  const pressure = hindiPressureFittings[model];
  if (pressure) {
    return {
      title: pressure.title,
      description: `${model}। ${pressure.description}`,
      metaTitle: `${model} | ${pressure.title} | FOREACH`,
      imageAlt: `${model}, ${pressure.title}`,
      faqs: [
        { question: "पोर्ट और ट्यूब का मेल कैसे जाँचें?", answer: pressure.description },
        { question: "इस मॉडल को चुनते समय क्या जाँचें?", answer: pressure.selectionNote },
        { question: "पूरी असेंबली का कार्य दाब कैसे तय करें?", answer: "मॉडल की दाब स्पेसिफिकेशन के साथ ट्यूब, पोर्ट, तापमान और असेंबली की परिस्थितियाँ जाँचें। पूरी द्रव लाइन की उपयोग सीमा सभी जुड़े घटकों पर निर्भर है।" },
      ],
      bottomCta: hindiFittingBottomCta,
    };
  }
  const compact = model.startsWith("HF6-") || model.startsWith("HFL6-");
  const title = compact ? "कॉम्पैक्ट समतल-तल फिटिंग" : hflTitle;
  const specs = detail.specs ?? detail.specifications ?? [];
  const value = (label: string) => specs.find(item => item.label === label)?.value;
  const thread = value("螺纹规格");
  const tubeOd = value("接管外径");
  const material = value("主体材质");
  if (typeof thread !== "string" || typeof tubeOd !== "string" || typeof material !== "string" || !["PVDF", "PPS", "PEEK"].includes(material)) return undefined;
  if (/^HNF?6?-/.test(model)) {
    const compactFerrule = /^HNF?6-/.test(model);
    const hnf = model.startsWith("HNF");
    const ferruleSeries = hnf ? "CL-0" : "CL-0X";
    const ferruleTitle = compactFerrule ? "कॉम्पैक्ट फेरूल फिटिंग" : "मानक नर्ल्ड फेरूल फिटिंग";
    const bitCode = hnf ? (compactFerrule ? "959019" : "959006") : (compactFerrule ? "809738" : "809739");
    const compatibleTubeOd = !hnf && tubeOd === "3.2 mm" ? "2.0 / 2.5 / 3.0 / 3.2 mm" : tubeOd;
    return {
      title: ferruleTitle,
      description: `${model} बिना फ्लैंज वाली कठोर ट्यूब के लिए ${ferruleTitle} है। इसमें ${thread} थ्रेड और ${material} बॉडी है। ट्यूब का बाहरी व्यास ${compatibleTubeOd} होना चाहिए। ट्यूब का सिरा मौके पर समतल काटें और उसके वास्तविक बाहरी व्यास के लिए उपयुक्त ${ferruleSeries} फेरूल चुनें। फेरूल एक बार लगाने के लिए है।`,
      metaTitle: `${model} | ${ferruleTitle} | FOREACH`,
      imageAlt: `${model}, ${material} की ${ferruleTitle}`,
      faqs: [
        { question: "कौन-सा थ्रेड और ट्यूब व्यास चाहिए?", answer: `${thread} थ्रेड वाला उपयुक्त समतल-तल पोर्ट और ${compatibleTubeOd} बाहरी व्यास वाली कठोर ट्यूब चाहिए। सील के लिए पोर्ट की तली और छेद की गहराई जाँचें।` },
        { question: `${ferruleSeries} फेरूल कैसे चुनें?`, answer: "ट्यूब के वास्तविक बाहरी व्यास के अनुसार आकार चुनें और द्रव व इस्तेमाल की परिस्थितियों के अनुसार PP या ETFE चुनें। काटे गए ट्यूब के सिरे पर फेरूल सही दिशा में लगाएँ।" },
        { question: "फिटिंग को कसने और फिर लगाने का तरीका क्या है?", answer: `नियंत्रित कसाव के लिए ${bitCode} बिट और T-ST टॉर्क स्क्रूड्राइवर इस्तेमाल करें। फिटिंग निकालकर फिर लगाते समय नया फेरूल लगाएँ और ट्यूब पर क्लैंप की पुरानी जगह जाँचें।` },
      ],
      bottomCta: hindiFittingBottomCta,
    };
  }
  if (model === "HFL6-U40-16-PK-N") {
    return {
      title: "कम्प्रेशन रिंग और सील किट के लिए 6-40 UNF फिटिंग",
      description: `${model} 1.6 mm बाहरी व्यास वाली कठोर ट्यूब के लिए 6-40 UNF की कॉम्पैक्ट समतल-तल फिटिंग है। PEEK बॉडी प्राकृतिक रंग की है। पोर्ट और ट्यूब के सिरे के अनुसार WS-27 सपोर्ट वॉशर के साथ फ्लैंज वाला सिरा या CL-1X-16 कम्प्रेशन रिंग किट चुनें। दोनों विकल्पों के घटक अलग हैं।`,
      metaTitle: `${model} | 6-40 UNF कम्प्रेशन रिंग और सील किट फिटिंग | FOREACH`,
      imageAlt: `${model}, PEEK की 6-40 UNF कॉम्पैक्ट समतल-तल फिटिंग`,
      faqs: [
        { question: "कौन-सा थ्रेड और ट्यूब आकार चाहिए?", answer: "6-40 UNF पोर्ट और 1.6 mm बाहरी व्यास वाली कठोर ट्यूब चाहिए। पोर्ट की तली, छेद की गहराई और फिटिंग के आगे की जगह जाँचें।" },
        { question: "कम्प्रेशन रिंग और फ्लैंज में से कैसे चुनें?", answer: "कम्प्रेशन रिंग के लिए CL-1X-16 किट लगाएँ। फ्लैंज वाले सिरे के लिए WS-27 सीरीज़ का SUS सपोर्ट वॉशर चुनें। दोनों विकल्पों के घटक एक ही सील में न मिलाएँ।" },
        { question: "इस फिटिंग को कसने के लिए कौन-सा बिट चाहिए?", answer: "959027 टॉर्क स्क्रूड्राइवर बिट इस्तेमाल करें। पोर्ट पर कसने का टॉर्क चुनी गई असेंबली और पोर्ट के अनुसार जाँचें।" },
      ],
      bottomCta: hindiFittingBottomCta,
    };
  }
  return {
    title,
    description: `${model} कठोर ट्यूब के लिए ${title} है। यह ${tubeOd} बाहरी व्यास वाली ट्यूब के लिए है। इसमें ${thread} थ्रेड और ${material} बॉडी है। फ़्लैंज गैस्केट पोर्ट के समतल तल पर सील बनाती है। यह माइक्रोफ्लुइडिक सर्किट, IVD उपकरण, विश्लेषण उपकरण और प्रयोगशाला स्वचालन सिस्टम में कठोर ट्यूब जोड़ती है।`,
    imageAlt: `${model}, ${material} की ${title}`,
    faqs: [
      { question: `${model} के लिए कठोर ट्यूब का बाहरी व्यास कितना होना चाहिए?`, answer: `इस मॉडल के लिए कठोर ट्यूब का बाहरी व्यास ${tubeOd} है। फिटिंग चुनने से पहले बाहरी व्यास की टॉलरेंस और ट्यूब के सिरे की ज़रूरी तैयारी जाँचें।` },
      { question: `${model} में कौन-सा थ्रेड है?`, answer: `इस मॉडल में ${thread} थ्रेड है। इंस्टॉलेशन से पहले देखें कि थ्रेड और सील की ज्यामिति उपकरण के पोर्ट से मेल खाती हैं।` },
      { question: `${material} और द्रव की अनुकूलता कैसे जाँचें?`, answer: `${material} की अनुकूलता जाँचते समय द्रव की सांद्रता, तापमान, संपर्क समय और सफ़ाई की विधि ध्यान में रखें।` },
      { question: `${title} लगाते समय क्या जाँचें?`, answer: "इंस्टॉलेशन से पहले देखें कि ट्यूब का सिरा, थ्रेड, सील और पोर्ट की सतह साफ़ हों और उनमें कोई क्षति न हो। ज़रूरत से ज़्यादा कसाव से बचें।" },
      { question: `क्या ${model} की 2D ड्रॉइंग माँग सकते हैं?`, answer: "हाँ। इस मॉडल को सूची में जोड़ें और बताएँ कि ड्रॉइंग चाहिए। हमारी तकनीकी टीम लागू संस्करण की पुष्टि करके ड्रॉइंग देगी।" },
    ],
    bottomCta: hindiFittingBottomCta,
  };
}
