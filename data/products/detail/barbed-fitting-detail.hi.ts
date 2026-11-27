import type { GermanProductDetailContent } from "./product-detail-content.de";
import { barbedFittingSelectionProducts } from "../selection/barbed-fitting-selection.generated";
import { FITTING_PUBLISHED_PRODUCTS } from "../selection/fitting-publication.generated";

const pathPrefix = "/products/fittings/barbed-fittings/";
const selectionByCode = new Map(barbedFittingSelectionProducts.map(row => [row.productCode, row]));
const publishedModels = new Map(FITTING_PUBLISHED_PRODUCTS.flatMap(row =>
  row.productTypeId === "barbed-fittings" && row.detailHref.startsWith(pathPrefix)
    ? [[row.detailHref.slice(pathPrefix.length).replace(/\/+$/, ""), row] as const]
    : []
));

export const hindiBarbedFittingSlugs: readonly string[] = [
  "bl-127v-pp-n",
  "bl-16d-24d-pa-w",
  "bl-16d-24d-pp-n",
  "bl-16d-32d-pa-w",
  "bl-16d-32d-pp-n",
  "bl-16d-pa-w",
  "bl-16d-pp-n",
  "bl-16f-pa-w",
  "bl-16f-pp-n",
  "bl-24d-32d-pa-w",
  "bl-24d-32d-pp-n",
  "bl-24d-pa-w",
  "bl-24d-pp-n",
  "bl-24f-pa-w",
  "bl-24f-pp-n",
  "bl-32d-pa-w",
  "bl-32d-pp-n",
  "bl-32f-pa-w",
  "bl-32f-pp-n",
  "bl-40f-pa-w",
  "bl-40f-pp-n",
  "bl-64f-pa-w",
  "bl-64f-pp-n",
  "bl-95d-pa-w",
  "bl-95d-pp-n",
  "bt-127v-pp-n",
  "bt-16d-24d-24d-pa-w",
  "bt-16d-24d-24d-pp-n",
  "bt-16d-32d-32d-pa-w",
  "bt-16d-32d-32d-pp-n",
  "bt-16d-pa-w",
  "bt-16d-pp-n",
  "bt-16f-pa-w",
  "bt-16f-pp-n",
  "bt-24d-24d-16d-pa-w",
  "bt-24d-24d-16d-pp-n",
  "bt-24d-32d-32d-pa-w",
  "bt-24d-32d-32d-pp-n",
  "bt-24d-pa-w",
  "bt-24d-pp-n",
  "bt-24f-pa-w",
  "bt-24f-pp-n",
  "bt-32d-16d-16d-pa-w",
  "bt-32d-16d-16d-pp-n",
  "bt-32d-24d-24d-pa-w",
  "bt-32d-24d-24d-pp-n",
  "bt-32d-32d-16d-pa-w",
  "bt-32d-32d-16d-pp-n",
  "bt-32d-32d-24d-pa-w",
  "bt-32d-32d-24d-pp-n",
  "bt-32d-64t-64t-pa-w",
  "bt-32d-64t-64t-pp-n",
  "bt-32d-pa-w",
  "bt-32d-pp-n",
  "bt-32f-pa-w",
  "bt-32f-pp-n",
  "bt-40c-pa-w",
  "bt-40c-pp-n",
  "bt-64c-pa-w",
  "bt-64c-pp-n",
  "bt-64d-64d-32d-pa-w",
  "bt-64d-64d-32d-pp-n",
  "bt-64v-95v-95v-pa-w",
  "bt-64v-95v-95v-pp-n",
  "bt-95x-pa-w",
  "bt-95x-pp-n",
  "by-127v-pp-n",
  "by-16d-pa-w",
  "by-16d-pp-n",
  "by-16f-pa-w",
  "by-16f-pp-n",
  "by-24d-16d-16d-pa-w",
  "by-24d-16d-16d-pp-n",
  "by-24d-pa-w",
  "by-24d-pp-n",
  "by-24f-pa-w",
  "by-24f-pp-n",
  "by-32d-16d-16d-pa-w",
  "by-32d-16d-16d-pp-n",
  "by-32d-pa-w",
  "by-32d-pp-n",
  "by-32f-pa-w",
  "by-32f-pp-n",
  "by-40d-pa-w",
  "by-40d-pp-n",
  "by-48f-pa-w",
  "by-48f-pp-n",
  "by-64d-32d-32d-pa-w",
  "by-64d-32d-32d-pp-n",
  "by-64f-pa-w",
  "by-64f-pp-n",
  "by-95x-pa-w",
  "by-95x-pp-n",
  "bbl-16d-pa-w",
  "bbl-16d-pp-n",
  "bbl-24d-pa-w",
  "bbl-24d-pp-n",
  "bbl-32d-pa-w",
  "bbl-32d-pp-n",
  "ba-16c-pa-w",
  "ba-16c-pp-n",
  "ba-16d-24d-pa-w",
  "ba-16d-24d-pp-n",
  "ba-16d-32d-pa-w",
  "ba-16d-32d-pp-n",
  "ba-16f-24f-pa-w",
  "ba-16f-24f-pp-n",
  "ba-16f-24f-pv-n",
  "ba-16f-32f-pa-w",
  "ba-16f-32f-pp-n",
  "ba-16f-pa-w",
  "ba-16f-pp-n",
  "ba-16v-40v-pa-w",
  "ba-16v-40v-pp-n",
  "ba-24c-48c-pa-w",
  "ba-24c-48c-pp-n",
  "ba-24d-32d-pa-w",
  "ba-24d-32d-pp-n",
  "ba-24d-pa-w",
  "ba-24d-pp-n",
  "ba-24f-32f-pa-w",
  "ba-24f-32f-pp-n",
  "ba-24f-pa-w",
  "ba-24f-pp-n",
  "ba-24v-40v-pa-w",
  "ba-24v-40v-pp-n",
  "ba-32c-64c-pa-w",
  "ba-32c-64c-pp-n",
  "ba-32d-pa-w",
  "ba-32d-pp-n",
  "ba-32f-pa-w",
  "ba-32f-pp-n",
  "ba-32v-40v-pa-w",
  "ba-32v-40v-pp-n",
  "ba-40f-pa-w",
  "ba-40f-pp-n",
  "ba-64c-pa-w",
  "ba-64c-pp-n",
  "ba-64v-79v-pa-w",
  "ba-64v-79v-pp-n",
  "ba-64v-95v-pa-w",
  "ba-64v-95v-pp-n",
  "ba-64x-127x-pa-w",
  "ba-64x-127x-pp-n",
];

type FittingGeometry = {
  title: string;
  usage: (reducing: boolean) => string;
};

const geometryBySeries: Readonly<Record<string, FittingGeometry>> = {
  BA: {
    title: "सीधी होज़ बार्ब फिटिंग",
    usage: reducing => reducing ? "अलग माप की ट्यूब को सीध में जोड़ती है।" : "समान माप की ट्यूब को सीध में जोड़ती या बढ़ाती है।",
  },
  BL: {
    title: "एल्बो होज़ बार्ब फिटिंग",
    usage: reducing => reducing ? "अलग माप की ट्यूब जोड़ती है और द्रव लाइन की दिशा बदलती है।" : "समान माप की ट्यूब जोड़ती है और कम जगह में द्रव लाइन की दिशा बदलती है।",
  },
  BT: {
    title: "T आकार की होज़ बार्ब फिटिंग",
    usage: () => "तीन ट्यूब जोड़कर रीएजेंट, धुलाई या दूसरी द्रव लाइन का प्रवाह बाँटती या मिलाती है।",
  },
  BY: {
    title: "Y आकार की होज़ बार्ब फिटिंग",
    usage: () => "तीन ट्यूब जोड़कर उपकरण के अंदर Y आकार की शाखा बनाती है।",
  },
  BBL: {
    title: "होज़ बार्ब प्लग",
    usage: () => "ट्यूब का सिरा बंद करता है या इस्तेमाल न होने वाली शाखा को अस्थायी रूप से अलग रखता है।",
  },
};

export function getHindiBarbedFittingContent(slug: string): GermanProductDetailContent | undefined {
  if (!hindiBarbedFittingSlugs.includes(slug)) return;
  const product = publishedModels.get(slug);
  const row = product && selectionByCode.get(product.productCode);
  if (!row || row.model !== product.foreachModel) return;
  const { model, seriesCode, materialCode, colorCode } = row;
  const geometry = geometryBySeries[seriesCode];
  const diameters = row.portValues ?? [];
  const material = ({ PP: "PP", PA: "PA", PV: "PVDF" } as const)[materialCode as "PP" | "PA" | "PV"];
  const color = ({ N: "प्राकृतिक रंग", W: "सफ़ेद" } as const)[colorCode as "N" | "W"];
  if (!geometry || !diameters[0] || !material || !color) return;
  const reducing = new Set(diameters).size > 1;
  const plug = seriesCode === "BBL";
  const title = plug ? geometry.title : `${reducing ? "रिड्यूसिंग" : "समान आकार की"} ${geometry.title}`;
  const sizes = reducing ? diameters.join(" / ") : diameters[0];
  const appearance = colorCode === "N" ? "इसका रंग प्राकृतिक है।" : "इसका रंग सफ़ेद है।";
  const fit = reducing ? `सिरों पर क्रम से ${sizes} आंतरिक व्यास वाली ट्यूब लगती है।` : `${sizes} आंतरिक व्यास वाली ट्यूब इसके लिए उपयुक्त है।`;
  return {
    title,
    description: `${model}, ${material} की ${title} है। ${geometry.usage(reducing)} ${fit} ${appearance} लगाने से पहले ट्यूब की सामग्री, कठोरता, माप की टॉलरेंस और पकड़ जाँचें।`,
    imageAlt: `${model}, ${title}, ट्यूब का आंतरिक व्यास ${sizes}, ${material}, ${color}`,
    faqs: [
      { question: `${model} के लिए ट्यूब का कौन-सा आकार उपयुक्त है?`, answer: `${fit} वास्तविक आंतरिक व्यास के अनुसार चुनें और लगाने के बाद फिट की पुष्टि करें।` },
      { question: "बार्ब का आकार ट्यूब के आंतरिक या बाहरी व्यास से तय होता है?", answer: "यहाँ दिए कनेक्शन माप उपयुक्त ट्यूब के आंतरिक व्यास हैं। लगाने से पहले ट्यूब की सामग्री, कठोरता और माप की टॉलरेंस भी जाँचें।" },
      { question: plug ? "प्लग लगाने के बाद क्या जाँचें?" : "समान आकार और रिड्यूसिंग मॉडल में क्या फ़र्क है?", answer: plug ? "देखें कि प्लग ट्यूब पर सही बैठा है और अपेक्षित कार्य स्थितियों में रिसाव नहीं है।" : "समान आकार में सभी सिरों पर एक ही आंतरिक व्यास की ट्यूब लगती है। रिड्यूसिंग मॉडल में अलग-अलग आंतरिक व्यास की ट्यूब लगती हैं।" },
      { question: `क्या ${material} इस्तेमाल किए जाने वाले द्रव के अनुकूल है?`, answer: "द्रव, कार्य तापमान, दाब और सफ़ाई की परिस्थितियों के अनुसार अनुकूलता जाँचें। ज़रूरत हो तो ये विवरण हमारी तकनीकी टीम को दें।" },
      { question: `क्या ${model} की 2D ड्रॉइंग माँग सकते हैं?`, answer: "हाँ। मॉडल को सूची में जोड़ें और लिखें कि ड्रॉइंग चाहिए। तकनीकी टीम लागू संस्करण की पुष्टि करके ड्रॉइंग देगी।" },
    ],
    bottomCta: {
      title: "बड़ी मात्रा के ऑर्डर और कस्टम उपयोग के लिए फिटिंग",
      description: "पोर्ट के प्रकार, ट्यूब के आकार, सामग्री, सील, माउंटिंग और कार्य स्थितियों के आधार पर FOREACH फिटिंग चुनने, बड़ी मात्रा में आपूर्ति करने और कस्टम विकल्प तय करने में मदद कर सकता है।",
      buttonText: "हमसे संपर्क करें",
      href: "/en/contact/",
    },
  };
};
