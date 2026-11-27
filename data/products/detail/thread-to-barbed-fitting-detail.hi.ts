import type { GermanProductDetailContent } from "./product-detail-content.de";
import detailRows from "../generated/fittings/thread-to-barbed-fittings/detail/index.json";
import { getPublishedFittingProductByCode, isPublishedFittingDetailRoute } from "../selection/fitting-publication.generated";

const seriesCopy: Partial<Record<string, { title: string; description: string; seal: string }>> = {
  SA: { title: "थ्रेड पर सील वाली सीधी होज़ बार्ब फिटिंग", description: "मेल थ्रेड वाली सीधी फिटिंग", seal: "थ्रेड पर सील" },
  SAL: { title: "थ्रेड पर सील वाली एल्बो होज़ बार्ब फिटिंग", description: "मेल थ्रेड वाली एल्बो फिटिंग", seal: "थ्रेड पर सील" },
  SB: { title: "तली पर सील वाली सीधी होज़ बार्ब फिटिंग", description: "मेल थ्रेड वाली सीधी फिटिंग", seal: "समतल तली की सतह पर सील" },
  SBS: { title: "तली पर सील वाली छोटी सीधी होज़ बार्ब फिटिंग", description: "मेल थ्रेड वाली छोटी सीधी फिटिंग", seal: "समतल तली की सतह पर सील" },
  SC: { title: "फ़ीमेल थ्रेड से होज़ बार्ब फिटिंग", description: "फ़ीमेल थ्रेड वाली सीधी फिटिंग", seal: "फ़ीमेल थ्रेड वाले सिरे पर उपयुक्त कठोर ट्यूब फिटिंग से सील" },
  SBR: { title: "दिशा समायोजित करने वाली थ्रेड से होज़ बार्ब फिटिंग", description: "मेल थ्रेड वाली घूमने योग्य फिटिंग", seal: "समतल तली की सतह पर सील" },
};

const colorCopy: Partial<Record<string, string>> = { 本色: "प्राकृतिक रंग", 白色: "सफ़ेद", 黑色: "काला" };


export const hindiThreadToBarbedFittingSlugs: readonly string[] = [
  "sa-u28-16d-pp-n",
  "sa-u28-24d-pa-w",
  "sa-u28-24d-pp-n",
  "sa-u28-32d-pa-w",
  "sa-u28-32d-pp-n",
  "sa-u28-40d-pa-w",
  "sa-u28-40d-pp-n",
  "sa-u28-48d-pa-w",
  "sa-u28-48d-pp-n",
  "sa-u32-32f-pa-w",
  "sa-u32-32f-pp-n",
  "sa-x32-24d-pa-w",
  "sa-x32-24d-pp-n",
  "sa-x32-32d-pa-w",
  "sa-x32-32d-pp-n",
  "sal-u28-16d-pa-w",
  "sal-u28-16d-pp-n",
  "sal-u28-32d-pa-w",
  "sal-u28-32d-pp-n",
  "sal-u32-16d-pa-w",
  "sal-u32-16d-pp-n",
  "sal-u32-32d-pa-w",
  "sal-u32-32d-pp-n",
  "sb-m5-16d-pa-w",
  "sb-m5-16d-pp-n",
  "sb-m5-24d-pa-w",
  "sb-m5-24d-pp-n",
  "sb-m5-32d-pa-w",
  "sb-m5-32d-pp-n",
  "sb-m5-40d-pa-w",
  "sb-m5-40d-pp-n",
  "sb-m6-24-ac-b",
  "sb-m6-40-ac-b",
  "sb-u28-16-ac-b",
  "sb-u28-40-ac-b",
  "sbs-m6-24d-pa-w",
  "sbs-m6-24d-pp-n",
  "sbs-m6-32d-pa-w",
  "sbs-m6-32d-pp-n",
  "sbr-u28-16-pp-n",
  "sbr-u28-24-pp-n",
  "sbr-u28-32-pp-n",
  "sc-m6-16-pp-n",
  "sc-m6-32-pp-n",
  "sc-u28-16d-pp-n",
  "sc-u28-24d-pp-n",
  "sc-u28-32d-pp-n",
];
const reviewedSlugs = new Set(hindiThreadToBarbedFittingSlugs);
const models = new Map(detailRows.flatMap(row => {
  if (!reviewedSlugs.has(row.slug) || getPublishedFittingProductByCode(row.productCode)?.foreachModel !== row.model
    || !isPublishedFittingDetailRoute("thread-to-barbed-fittings", row.slug)) return [];
  const copy = seriesCopy[row.seriesCode];
  const specs = Object.fromEntries(row.specs.map(({label, value}) => [label, value]));
  const tubingId = specs["接管内径"];
  const thread = specs["螺纹规格"] === "3.4 锥螺纹" ? "3.4 टेपर थ्रेड" : specs["螺纹规格"];
  const material = specs["材质"];
  const color = colorCopy[specs["颜色"]];
  return copy && tubingId && thread && material && color
    ? [[row.slug, { model: row.model, copy, tubingId, thread, material, color }] as const]
    : [];
}));

export function getHindiThreadToBarbedFittingContent(slug: string): GermanProductDetailContent | undefined {
  const record = models.get(slug);
  if (!record) return;
  const { model, copy, tubingId, thread, material, color } = record;
  const appearance = color === "प्राकृतिक रंग" ? "इसका रंग प्राकृतिक है।" : `इसका रंग ${color} है।`;
  return {
    title: copy.title,
    description: `${model}, ${material} की ${copy.description} है। यह ${thread} थ्रेड वाले उपकरण पोर्ट को ${tubingId} आंतरिक व्यास वाली ट्यूब से जोड़ती है। ${copy.seal}। ${appearance} चुनते समय थ्रेड, ट्यूब की सामग्री और कठोरता, द्रव की अनुकूलता और इंस्टॉलेशन की जगह जाँचें।`,
    imageAlt: `${model}, ${copy.title}, ${thread} थ्रेड, ट्यूब का आंतरिक व्यास ${tubingId}, ${material}, ${color}`,
    bottomCta: {
      title: "बड़ी मात्रा के ऑर्डर और कस्टम उपयोग के लिए फिटिंग",
      description: "पोर्ट के प्रकार, ट्यूब के आकार, सामग्री, सील, माउंटिंग और कार्य स्थितियों के आधार पर FOREACH फिटिंग चुनने, बड़ी मात्रा में आपूर्ति करने और कस्टम विकल्प तय करने में मदद कर सकता है।",
      buttonText: "हमसे संपर्क करें",
      href: "/en/contact/",
    },
    faqs: [
      { question: `${model} किस थ्रेड और ट्यूब माप के लिए है?`, answer: `यह ${thread} थ्रेड और ${tubingId} आंतरिक व्यास वाली ट्यूब जोड़ती है।` },
      { question: "बार्ब के माप में ट्यूब का आंतरिक या बाहरी व्यास दिया है?", answer: `${tubingId} उपयुक्त ट्यूब का आंतरिक व्यास है। लगाने से पहले सामग्री, दीवार की मोटाई और कठोरता जाँचें।` },
      { question: "थ्रेड पर सील और तली पर सील कैसे काम करती हैं?", answer: "थ्रेड वाली सील जुड़े हुए थ्रेड क्षेत्र में बनती है। तली वाली सील पोर्ट की संपर्क सतह पर बनती है। उपकरण के पोर्ट के अनुसार सीलिंग चुनें।" },
      { question: `क्या ${material} इस्तेमाल किए जाने वाले द्रव के अनुकूल है?`, answer: `वास्तविक द्रव, काम का तापमान, दाब और सफ़ाई की ज़रूरतों के लिए ${material} की रासायनिक अनुकूलता जाँचें।` },
      { question: "क्या माप वाली 2D ड्रॉइंग उपलब्ध है?", answer: "इस समय सार्वजनिक 2D ड्रॉइंग का लिंक उपलब्ध नहीं है। उपलब्धता की पुष्टि के लिए तकनीकी टीम को अनुरोध भेजें।", drawingPreviewAnswer: "इस मॉडल की माप वाली PDF ड्रॉइंग ड्रॉइंग और दस्तावेज़ सेक्शन में 2D ड्रॉइंग टैब पर है।" },
    ],
  };
};
