import { getCanonicalUrl } from "@/lib/seo/site-url";
import { hindiSyringeSelectionCriteria } from "../selection/instrument-pump-selection.hi";
import { getSyringeModelPath } from "../selection/syringe-pump-routes";
import { getSyringeSeriesCopy } from "../selection/syringe-pump-series";
import { syringePumpCardsLocales } from "../selection/syringe-pump-cards.locales";
import { applySyringePumpDetailCopy } from "./syringe-pump-detail-copy";
import { applyPipettingPumpIntroduction } from "./pipetting-pump-introductions.locales";
import { applyPipettingPumpFaq } from "./pipetting-pump-faq.locales";
import { localizeProductDetailData } from "./product-detail.intl";
import type { GermanProductDetailContent } from "./product-detail-content.de";
import pipettingCopy from "./pipetting-pump-content.hi.json";
import syringeCopy from "./syringe-pump-content.hi.json";

const pipetting: Readonly<Record<string, string>> = pipettingCopy;
const syringe: Readonly<Record<string, string>> = {
  ...syringeCopy,
  [getSyringeSeriesCopy("en", 0).paragraphs[1]]: hindiSyringeSelectionCriteria,
  Applications: "अनुप्रयोग", "Product Series": "उत्पाद सीरीज़", Stroke: "स्ट्रोक", "Number of Channels": "चैनलों की संख्या",
  "Full-Stroke Travel Time": "पूरे स्ट्रोक का ट्रैवल समय", "Linear Speed": "रैखिक गति", Resolution: "रिज़ॉल्यूशन",
  "Valve Head Material": "वाल्व हेड की सामग्री", "Standard Port": "मानक पोर्ट",
  "Volume Range (Glass Syringe)": "आयतन की रेंज (ग्लास सिरिंज)", Specification: "विनिर्देश",
  "Valve Configuration (Solenoid Valve)": "वाल्व कॉन्फ़िगरेशन (सोलनॉइड वाल्व)", "Operating Pressure Range": "कार्य दाब की रेंज",
  "Communication Type": "संचार इंटरफ़ेस", "Installation Dimensions (L × W × H)": "इंस्टॉलेशन के आयाम (L × W × H)",
  "Valve Switching Time": "वाल्व स्विचिंग का समय", "Valve Configuration": "वाल्व कॉन्फ़िगरेशन",
  "Rotary Valve Pressure Rating": "रोटरी वाल्व का रेटेड दाब",
  "HMD3 Solenoid Valve Syringe Pump Series": "HMD3 सोलनॉइड वाल्व सिरिंज पंप सीरीज़",
  "HMD6 Solenoid Valve Syringe Pump Series": "HMD6 सोलनॉइड वाल्व सिरिंज पंप सीरीज़",
  "HLD3 Rotary Valve Syringe Pump Series": "HLD3 रोटरी वाल्व सिरिंज पंप सीरीज़",
  "HLD6 / HLD6M Rotary Valve Syringe Pump Series": "HLD6 / HLD6M रोटरी वाल्व सिरिंज पंप सीरीज़",
  "1 channel": "1 चैनल", "1, 2, 3, 4, 6, 8 channels Optional": "1, 2, 3, 4, 6, 8 चैनल विकल्प",
  "Standard Mode: 3000 increments; Microstep Mode: 24000 increments": "मानक मोड में 3000 इन्क्रिमेंट। माइक्रोस्टेप मोड में 24000 इन्क्रिमेंट।",
  "Standard Mode: 6000 increments; Microstep Mode: 48000 increments": "मानक मोड में 6000 इन्क्रिमेंट। माइक्रोस्टेप मोड में 48000 इन्क्रिमेंट।",
  "Repeatability ≤0.05% (250 μL and above); ≤0.1% (100 μL and below)": "पुनरावृत्ति की त्रुटि ≤0.05% (250 μL और उससे ऊपर), ≤0.1% (100 μL और उससे नीचे)",
  "2 ports / 3 ports / 3 ports": "2 पोर्ट / 3 पोर्ट / 3 पोर्ट",
  "-75 kPa–0.2 MPa; Distribution Valve Configuration: -75 kPa–0.1 MPa": "-75 kPa–0.2 MPa। डिस्ट्रिब्यूशन वाल्व कॉन्फ़िगरेशन में -75 kPa–0.1 MPa।",
  "25 μL–25 mL; with more than 1 channel, not supported 10 mL and 25 mL": "25 μL–25 mL। 1 से अधिक चैनल पर 10 mL और 25 mL उपलब्ध नहीं हैं।",
  "118 × Depends on Channel Count × 254 mm": "118 × चैनलों की संख्या के अनुसार × 254 mm",
  "Adjacent Ports ≤250 ms": "पास के पोर्ट ≤250 ms",
  "Planar Rotary Valve / Cylindrical Rotary Valve": "प्लेनर रोटरी वाल्व / सिलिंड्रिकल रोटरी वाल्व",
  "Planar Rotary Valve: 3-way Distribution Valve; Cylindrical Rotary Valve: 3-way Non-Distribution Valve / 3-way Distribution Valve / 9-way Distribution Valve": "प्लेनर रोटरी वाल्व में 3-वे डिस्ट्रिब्यूशन वाल्व। सिलिंड्रिकल रोटरी वाल्व में 3-वे नॉन-डिस्ट्रिब्यूशन, 3-वे डिस्ट्रिब्यूशन या 9-वे डिस्ट्रिब्यूशन वाल्व।",
  "Planar Rotary Valve: 3-way Non-Distribution Valve / 5-way Distribution Valve / 9-way Distribution Valve; Cylindrical Rotary Valve: 3-way Non-Distribution Valve / 9-way Distribution Valve": "प्लेनर रोटरी वाल्व में 3-वे नॉन-डिस्ट्रिब्यूशन, 5-वे डिस्ट्रिब्यूशन या 9-वे डिस्ट्रिब्यूशन। सिलिंड्रिकल रोटरी वाल्व में 3-वे नॉन-डिस्ट्रिब्यूशन या 9-वे डिस्ट्रिब्यूशन।",
  "HMD3 30 mm Solenoid Valve Syringe Pump": "30 mm स्ट्रोक वाला HMD3 सोलनॉइड वाल्व सिरिंज पंप",
  "HMD6 60 mm Solenoid Valve Syringe Pump": "60 mm स्ट्रोक वाला HMD6 सोलनॉइड वाल्व सिरिंज पंप",
  "HLD3 30 mm Rotary Valve Syringe Pump": "30 mm स्ट्रोक वाला HLD3 रोटरी वाल्व सिरिंज पंप",
  "HLD6 60 mm Rotary Valve Syringe Pump": "60 mm स्ट्रोक वाला HLD6 रोटरी वाल्व सिरिंज पंप",
  "FOREACH HLD3 rotary-valve syringe pump on a white background, showing the rotary valve, metering mechanism and mounting side plate": "सफ़ेद पृष्ठभूमि पर FOREACH HLD3 सिरिंज पंप, जिसमें रोटरी वाल्व, मीटरिंग मैकेनिज़्म और माउंटिंग की साइड प्लेट दिखती है",
  "Syringe Pump": "सिरिंज पंप", "Syringe Pumps": "सिरिंज पंप",
};

export const hindiPipettingDetailText = (text: string) => pipetting[text] ?? text;
export const hindiSyringeDetailText = (text: string) => syringe[text] ?? text;

function translate(value: unknown, text: (value: string) => string): unknown {
  if (typeof value === "string") return text(value);
  if (Array.isArray(value)) return value.map(item => translate(item, text));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translate(item, text)]));
  }
  return value;
}

const fields = [
  "specs", "specifications", "specList", "technicalSpecifications", "specificationGroups",
  "faqs", "faq", "faqItems", "faqList", "detailFaqs", "commonApplications", "applicationDetails", "imageAlt",
  "mainImageAlt", "imageAltEn", "additionalImageAlts", "productTypeName",
] as const;

const cta = {
  syringe: {
    title: "आपके द्रव सर्किट के लिए कॉन्फ़िगर किए गए सिरिंज पंप",
    description: "सिरिंज की क्षमता, स्ट्रोक, चैनलों की संख्या, वाल्व कॉन्फ़िगरेशन, संचार इंटरफ़ेस, माउंटिंग की जगह और द्रव सर्किट की ज़रूरतें बताएँ। FOREACH की तकनीकी टीम उपयुक्त कॉन्फ़िगरेशन चुनने में मदद करेगी।",
  },
  pipetting: {
    title: "आपके स्वचालित सिस्टम के लिए पिपेटिंग मॉड्यूल",
    description: "कार्य आयतन, द्रव, टिप, कंटेनर, पहचान की ज़रूरतें, संचार इंटरफ़ेस और माउंटिंग की जगह बताएँ। FOREACH की तकनीकी टीम उपयुक्त कॉन्फ़िगरेशन चुनने में मदद करेगी।",
  },
};

export function getHindiInstrumentPumpDetail(data: Record<string, any>, kind: "syringe" | "pipetting") {
  const isSyringe = kind === "syringe";
  const source = localizeProductDetailData(data);
  const english = isSyringe ? applySyringePumpDetailCopy(source, "en")
    : applyPipettingPumpFaq(applyPipettingPumpIntroduction(source, "en"), "en");
  const text = isSyringe ? hindiSyringeDetailText : hindiPipettingDetailText;
  const intro = isSyringe ? "syringeIntroductionParagraphs" : "pipettingIntroductionParagraphs";
  const originalHeading = isSyringe ? syringePumpCardsLocales.en[english.slug]?.heading : english.h1Title;
  if (!originalHeading || !english[intro]) return undefined;
  const detail: Record<string, any> = { ...english, __locale: "hi" };
  for (const field of [...fields, intro, "h1Title", "name", "title", "productName"]) {
    if (english[field] !== undefined) detail[field] = translate(english[field], text);
  }
  const title = text(originalHeading);
  detail.h1Title = title;
  detail.description = detail[intro].join("\n\n");
  detail.summary = detail.description;
  detail.overview = detail.description;
  const presentation: GermanProductDetailContent = {
    title,
    description: detail.description,
    imageAlt: detail.imageAlt,
    faqs: detail.faqs,
    bottomCta: { ...cta[kind], buttonText: "कस्टम कॉन्फ़िगरेशन की पूछताछ भेजें", href: "/hi/contact/" },
  };
  return { data: detail, presentation };
}

export function getHindiSyringeModelMetadata(slug: string, model: string) {
  const english = syringePumpCardsLocales.en[slug]?.heading;
  const path = getSyringeModelPath("hi", slug);
  if (!english || !path) return {};
  const heading = hindiSyringeDetailText(english);
  const title = model.toUpperCase() + " | " + heading + " | FOREACH";
  const url = getCanonicalUrl(path);
  return {
    title: { absolute: title }, description: heading, alternates: { canonical: url },
    robots: { index: false, follow: true },
    openGraph: { type: "website" as const, locale: "hi_IN", url, title, description: heading },
    twitter: { card: "summary" as const, title, description: heading },
  };
}
