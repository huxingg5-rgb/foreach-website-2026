import type { GermanProductDetailContent } from "./product-detail-content.de";
import detailRows from "../generated/fittings/luer-fittings/detail/index.json";
import { getPublishedFittingProductByCode, isPublishedFittingDetailRoute } from "../selection/fitting-publication.generated";

const series: Readonly<Record<string, { name: string; collar?: string; use?: string }>> = {
  LSL: { name: "स्थिर मेल लुअर इंसर्ट", collar: "स्थिर" },
  LRL: { name: "घूमने वाला मेल लुअर इंसर्ट", collar: "घूमने वाला" },
  LPR: { name: "घूमने वाले लॉकिंग कॉलर वाला मेल लुअर" },
  LPS: { name: "स्थिर लॉकिंग कॉलर वाला मेल लुअर" },
  LP: { name: "एक-टुकड़ा मेल लुअर" },
  LS: { name: "एक-टुकड़ा फ़ीमेल लुअर" },
  PMLS: { name: "पैनल-माउंट फ़ीमेल लुअर", use: "पैनल पर कसने के लिए उपयुक्त LNS-U28 नट चुनें।" },
  LPT: { name: "आंतरिक थ्रेड वाला लुअर लॉकिंग कॉलर", use: "यह LSL या LRL इंसर्ट का साथ लगने वाला भाग है।" },
  LCR: { name: "लुअर की रंगीन पहचान रिंग", use: "यह पैनल-माउंट फ़ीमेल लुअर पर द्रव लाइन की पहचान देती है।" },
  LNS: { name: "लुअर नर्ल्ड नट", use: "यह PMLS फ़ीमेल सिरे को पैनल पर कसता है।" },
  LPBL: { name: "मेल लुअर प्लग", use: "यह उपयुक्त फ़ीमेल लुअर पोर्ट बंद करता है।" },
};

const colors: Readonly<Record<string, string>> = {
  本色: "प्राकृतिक", 白色: "सफ़ेद", 黑色: "काला", 红色: "लाल",
  绿色: "हरा", 蓝色: "नीला", 橙色: "नारंगी", 黄色: "पीला",
};
const models = new Map(detailRows.flatMap(row => {
  if (getPublishedFittingProductByCode(row.productCode)?.foreachModel !== row.model
    || !isPublishedFittingDetailRoute("luer-fittings", row.slug)) return [];
  const copy = series[row.seriesCode];
  if (!copy) return [];
  const specs = Object.fromEntries(row.specs.map(({ label, value }) => [label, value]));
  return [[row.slug, { model: row.model, copy, tubingId: specs["接管内径"],
    thread: specs["螺纹规格"], material: specs["材质"], color: colors[specs["颜色"]],
  }] as const];
}));
export const hindiLuerFittingSlugs: readonly string[] = [...models.keys()];

const faqs = [
  { question: "मेल या फ़ीमेल लुअर कैसे चुनें?", answer: "साथ लगने वाले सिरे के आधार पर मेल या फ़ीमेल चुनें, फिर देखें कि लॉकिंग कॉलर चाहिए या नहीं।" },
  { question: "लॉकिंग कॉलर और एक-टुकड़ा फिटिंग में क्या अंतर है?", answer: "लॉकिंग कॉलर को घुमाकर कनेक्शन कसते हैं। एक-टुकड़ा फिटिंग कम जगह लेती है। उपलब्ध जगह और लगाने की विधि देखकर तय करें।" },
  { question: "ट्यूब का आकार कैसे चुनें?", answer: "ट्यूब का आंतरिक व्यास देखें। लगाने के बाद सामग्री, कठोरता और वास्तविक फिट की भी जाँच करें।" },
  { question: "कौन-सी सामग्री चुनें?", answer: "द्रव की संगतता, तापमान, आवश्यक मजबूती और सफ़ाई के अनुसार PP, PA, PVDF या सूची में दी गई अन्य सामग्री चुनें।" },
  { question: "कौन-से रंग उपलब्ध हैं?", answer: "मानक रंग उपलब्ध मॉडल के अनुसार हैं। कोई दूसरा रंग चाहिए तो पूछताछ सूची में लिखें।" },
];

export function getHindiLuerFittingContent(slug: string): GermanProductDetailContent | undefined {
  const record = models.get(slug);
  if (!record) return;
  const { model, copy, tubingId, thread, material, color } = record;
  const threadCopy = thread ? "। इसका थ्रेड " + thread + " है" : "";
  const size = tubingId ? "। इसमें " + tubingId + " आंतरिक व्यास वाली ट्यूब लगती है" : "";
  const use = copy.use ?? "यह IVD उपकरणों, सूक्ष्म द्रव प्रणालियों, विश्लेषण उपकरणों और प्रयोगशाला स्वचालन में द्रव कनेक्शन के लिए है।";
  const assembly = copy.collar ? " LPT लॉकिंग कॉलर के साथ लगाने पर यह " + copy.collar + " कॉलर वाला पूरा मेल लुअर लॉक बनता है।" : "";
  return {
    title: copy.name,
    description: model + " " + material + " से बना " + copy.name + " है" + threadCopy + size + "। " + use + assembly,
    imageAlt: [model, copy.name, thread, tubingId, material, color].filter(Boolean).join(", "),
    faqs,
    bottomCta: {
      title: "बड़ी मात्रा के ऑर्डर और कस्टम उपयोग के लिए फिटिंग",
      description: "पोर्ट, ट्यूब, सामग्री, सील, माउंटिंग और काम की स्थितियों के अनुसार FOREACH फिटिंग चुनने, बड़ी मात्रा में आपूर्ति करने और कस्टम विकल्प तय करने में मदद कर सकता है।",
      buttonText: "हमसे संपर्क करें",
      href: "/en/contact/",
    },
  };
}
