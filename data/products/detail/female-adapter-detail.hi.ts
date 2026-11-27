import type { GermanProductDetailContent } from "./product-detail-content.de";
import models from "../generated/fittings/female-thread-adapters/detail/index.json";
import { isPublishedFittingDetailRoute } from "../selection/fitting-publication.generated";

export const hindiFemaleAdapterSlugs: readonly string[] = [
  "pmu-m12-u28-20-pp-n",
  "u-m6-20-ac-b",
  "u-m6-20-pp-n",
  "u-u28-20-pp-n",
  "us-m6-05-ac-b",
  "us-m6-05-pp-n",
  "us-m6-10-ac-b",
  "us-m6-10-pp-n",
  "us-m6-15-ac-b",
  "us-m6-15-pp-n",
  "ut-u28-15-pp-n",
  "ut-u28-15-ps-b",
  "ut-u28-20-pp-n",
  "ut-u28-20-ps-b",
  "uy-u28-10-pp-n",
  "uy-u28-15-pp-n",
  "uy-u28-20-pp-n",
];
const bySlug = new Map(models.map(model => [model.slug, model]));
const names: Readonly<Record<string, string>> = {
  U: "सीधी दो-पोर्ट फ़ीमेल थ्रेड फिटिंग",
  US: "चौकोर बॉडी वाली दो-पोर्ट फ़ीमेल थ्रेड फिटिंग",
  UT: "T आकार की फ़ीमेल थ्रेड फिटिंग",
  UY: "Y आकार की फ़ीमेल थ्रेड फिटिंग",
  PMU: "पैनल के आर-पार लगने वाली दो-पोर्ट फ़ीमेल थ्रेड फिटिंग",
};

export function getHindiFemaleAdapterContent(slug: string): GermanProductDetailContent | undefined {
  const record = bySlug.get(slug);
  if (!record || !hindiFemaleAdapterSlugs.includes(slug) || !isPublishedFittingDetailRoute("female-thread-adapters", slug)) return;
  const { model } = record;
  const series = model.split("-")[0];
  const name = names[series];
  const specs = Object.fromEntries(record.specs.map(({ label, value }) => [label, value]));
  const thread = specs["螺纹规格"];
  const bore = specs["通径"];
  const material = specs["材质"];
  if (!name || !thread || !bore || !material) return;
  const materialLabel = material === "AC" ? "POM (AC)" : material;
  return {
    title: name,
    description: `${model} ${name} है। इसमें ${thread} पोर्ट और ${bore} व्यास का द्रव मार्ग है। बॉडी ${materialLabel} की है। यह माइक्रोफ्लुइडिक्स, इन विट्रो डायग्नोस्टिक्स (IVD), विश्लेषण और प्रयोगशाला स्वचालन उपकरणों में द्रव लाइनें जोड़ती है।`,
    imageAlt: `${model}, ${name}, ${thread} पोर्ट, ${bore} द्रव मार्ग का व्यास, ${materialLabel}`,
    faqs: [
      { question: "दो-पोर्ट फिटिंग या टी कब चुनें?", answer: "दो-पोर्ट फिटिंग दो कनेक्शन जोड़ती है। टी एक लाइन को दो शाखाओं में बाँटती है या दो लाइन मिलाती है। द्रव सर्किट के लेआउट के अनुसार चुनें।" },
      { question: "द्रव मार्ग का व्यास और थ्रेड माप कैसे जाँचें?", answer: "द्रव मार्ग का व्यास अंदर के छिद्र का माप है। थ्रेड माप पोर्ट का मानक बताता है। दोनों अलग-अलग जाँचें।" },
      { question: "क्या अलग-अलग थ्रेड के लिए अडैप्टर लगा सकते हैं?", answer: "मॉडल के लिए दिए पोर्ट संयोजन इस्तेमाल करें। सूची में न दिए संयोजन के लिए कस्टम अनुरोध भेजें।" },
      { question: "बॉडी की सामग्री कैसे चुनें?", answer: "द्रव की अनुकूलता, कार्य दाब, तापमान और यांत्रिक मज़बूती के अनुसार चुनें।" },
      { question: "क्या 2D ड्रॉइंग और 3D मॉडल उपलब्ध हैं?", answer: "उपलब्ध फ़ाइलें उत्पाद पेज पर देखें। जिस मॉडल की फ़ाइल न हो उसके लिए ड्रॉइंग का विकल्प चुनें या अनुरोध सूची में नोट जोड़ें।" },
    ],
    bottomCta: {
      title: "बड़ी मात्रा के ऑर्डर और कस्टम उपयोग के लिए फिटिंग",
      description: "पोर्ट, ट्यूब, सामग्री, सील और कार्य स्थितियों के आधार पर FOREACH का चयन, मात्रा में आपूर्ति और कस्टम विकल्प उपलब्ध हैं।",
      buttonText: "हमसे संपर्क करें",
      href: "/en/contact/",
    },
  };
};
