import { getHindiDraftLink, hindiEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import { datasheetEnFilterOptions, datasheetEnItems, datasheetsEnPageText } from "./datasheets.en";
import type { DatasheetCategory, DatasheetsPageData } from "./datasheets.types";

const categoryLabels: Record<DatasheetCategory, string> = {
  all: "सभी",
  pump: "पंप",
  valve: "वाल्व",
  needle: "प्रोब",
  tubing: "ट्यूबिंग और फिटिंग",
  smart: "सेंसर और नियंत्रण मॉड्यूल",
};

const copy: Record<string, readonly [title: string, description: string]> = {
  "ea-piston-pump": ["EA पिस्टन पंप की डेटाशीट", "सटीक डोज़िंग, डिस्पेंसिंग और स्वचालित द्रव संचालन के लिए EA पिस्टन पंप। क्षमताएँ 50 µL से 20 mL तक हैं।"],
  "eas-piston-pump": ["EAS पिस्टन पंप की डेटाशीट", "सटीक द्रव संचालन के लिए आसानी से हवा निकालने वाले EAS पिस्टन पंप। इनका उपयोग वहाँ करें जहाँ तेज़ प्राइमिंग और हवा के बुलबुले हटाना महत्त्वपूर्ण है।"],
  "sm-piston-pump": ["SM पिस्टन पंप की डेटाशीट", "कम आयतन की सटीक डोज़िंग और छोटे स्वचालित उपकरणों में लगाने के लिए कॉम्पैक्ट SM पिस्टन पंप।"],
  "dpl30-diaphragm-pump": ["DPL30 डायाफ्राम पंप की डेटाशीट", "कॉम्पैक्ट द्रव स्थानांतरण प्रणालियों के लिए DPL30 डायाफ्राम पंप। प्रवाह दर 300 mL/min तक है।"],
  "dpl60-diaphragm-pump": ["DPL60 डायाफ्राम पंप की डेटाशीट", "द्रव की आपूर्ति और स्थानांतरण के लिए DPL60 डायाफ्राम पंप। प्रवाह दर 600 mL/min तक है।"],
  "dpl30h-diaphragm-pump": ["DPL30H उच्च-दाब डायाफ्राम पंप की डेटाशीट", "उपकरणों में फ़िल्टरेशन, स्प्रे आपूर्ति और द्रव स्थानांतरण के लिए DPL30H उच्च-दाब डायाफ्राम पंप। रेटेड दाब 600 kPa है।"],
  "dpgl800-diaphragm-pump": ["DPGL800 डायाफ्राम पंप की विनिर्देश शीट", "गैस और गैस-द्रव मिश्रण के सक्शन, वैक्यूम उत्पन्न करने और अपशिष्ट द्रव निकालने के लिए DPGL800 डायाफ्राम पंप।"],
  "fittings-and-tubing-catalog": ["फिटिंग और ट्यूबिंग का कैटलॉग", "FOREACH की फिटिंग, कनेक्टर, कठोर और लचीली ट्यूबिंग, तथा ट्यूबिंग असेंबलियों का संयुक्त अंग्रेज़ी कैटलॉग।"],
  "smtp2-smtp4-pipetting-pump": ["SMTP2 / SMTP4 पिपेटिंग पंप की डेटाशीट", "नमूनों और अभिकर्मकों के स्वचालित संचालन में इस्तेमाल होने वाले SMTP2 और SMTP4 वायु-विस्थापन पिपेटिंग पंपों की संयुक्त डेटाशीट।"],
  "rpl-p635-p15-valveless-pump": ["RPL वाल्व-रहित मीटरिंग पंप की डेटाशीट", "RPL-P6.35 / RPL-P15 वाल्व-रहित मीटरिंग पंप की संयुक्त डेटाशीट, संस्करण 001 (2025-07)। इसमें विस्थापन, द्रव के संपर्क वाली सामग्री, पोर्ट, स्थापना और ड्राइव कॉन्फ़िगरेशन दिए गए हैं।"],
  "hld3-syringe-pump": ["रोटरी वाल्व वाले HLD3 सिरिंज पंप की डेटाशीट", "सटीक द्रव संचालन के लिए 30 mm स्ट्रोक और रोटरी वाल्व के विकल्पों वाला HLD3 सिरिंज पंप।"],
  "hld6-syringe-pump": ["रोटरी वाल्व वाले HLD6 सिरिंज पंप की डेटाशीट", "µL से mL के आयतन में द्रव संचालन के लिए 60 mm स्ट्रोक और रोटरी वाल्व के विकल्पों वाला HLD6 सिरिंज पंप।"],
  "hmd3-syringe-pump": ["सोलनॉइड वाल्व वाले HMD3 सिरिंज पंप की डेटाशीट", "स्वचालित डिस्पेंसिंग के लिए 30 mm स्ट्रोक और अंतर्निर्मित सोलनॉइड वाल्व के विकल्पों वाला HMD3 सिरिंज पंप।"],
  "hmd6-syringe-pump": ["सोलनॉइड वाल्व वाले HMD6 सिरिंज पंप की डेटाशीट", "कई चैनलों में द्रव संचालन के लिए 60 mm स्ट्रोक और अंतर्निर्मित सोलनॉइड वाल्व वाला HMD6 सिरिंज पंप।"],
  "mrv3-multi-channel-rotary-valve": ["MRV3 मल्टी-चैनल रोटरी वाल्व की डेटाशीट", "कई पोर्ट वाले द्रव पथों की स्विचिंग, अभिकर्मक वितरण और फ्लुइडिक सिस्टम में लगाने के लिए MRV3 मल्टी-चैनल रोटरी वाल्व।"],
  "hp-2-position-6-port-high-pressure-valve": ["वेंट वाला HP उच्च-दाब वाल्व, 2 पोज़िशन और 6 पोर्ट", "दाब में द्रव पथ बदलने के लिए वेंट पथ वाला HP उच्च-दाब वाल्व। इसमें 2 पोज़िशन और 6 पोर्ट हैं।"],
  "6010-solenoid-valve": ["SV10 (6010) सोलनॉइड वाल्व की डेटाशीट", "2-वे और 3-वे नियंत्रण के लिए SV10 (6010) सोलनॉइड वाल्व की डेटाशीट। इसमें बेस पर माउंट होने वाले, थ्रेड वाले और बार्ब वाले विकल्प दिए गए हैं।"],
  "abd-air-bubble-detector": ["ABD हवा के बुलबुले डिटेक्टर की डेटाशीट", "ABD पारदर्शी ट्यूबिंग में हवा के बुलबुले और द्रव का बिना संपर्क पता लगाता है। इसमें TTL संचार और Modbus RTU का समर्थन है।"],
  "pdm5-pressure-sensor": ["PDM5 दाब सेंसर मॉड्यूल की विनिर्देश शीट", "PDM5 के चार निरपेक्ष दाब रेंज, द्रव के संपर्क वाली सामग्री, विद्युत कनेक्शन और उपलब्ध ऑर्डर मॉडल।"],
  "sample-probe": ["प्रोब श्रृंखला", "डेटाशीट अभी उपलब्ध नहीं है। ड्रॉइंग या नमूने के आधार पर कस्टम प्रोब बनाए जा सकते हैं।"],
};

export const hindiDatasheetAccessibilityLabels = {
  breadcrumb: "पेज का नेविगेशन पथ",
  categoryFilter: "उत्पाद श्रेणी का फ़िल्टर",
  thumbnail: " की झलक",
};

export function getHindiDatasheetsPageData(): DatasheetsPageData {
  const request = getHindiDraftLink("/en/contact/?type=datasheet");
  return {
    pageText: {
      seo: {
        title: "उत्पाद डेटाशीट और कैटलॉग डाउनलोड | FOREACH",
        description: "माइक्रोफ्लुइडिक पंप, वाल्व, ट्यूबिंग, फिटिंग, प्रोब और नियंत्रण मॉड्यूल की FOREACH डेटाशीट डाउनलोड करें।",
      },
      hero: {
        ...datasheetsEnPageText.hero,
        title: "डेटाशीट",
        description: "FOREACH के पंप, वाल्व, ट्यूबिंग, फिटिंग और नियंत्रण मॉड्यूल की डेटाशीट खोजें और डाउनलोड करें। मुख्य विनिर्देश, सामग्री, इंटरफ़ेस और उपयोग की जानकारी देखें।",
        imageAlt: "FOREACH डेटाशीट पेज का बैनर",
      },
      breadcrumb: {
        home: "होम",
        homeHref: getHindiDraftLink("/en/").href,
        resources: "संसाधन",
        resourcesHref: getHindiDraftLink("/en/resources/").href,
        current: "डेटाशीट",
      },
      search: {
        placeholder: "उत्पाद का नाम या कीवर्ड खोजें, जैसे पिस्टन पंप, रोटरी वाल्व, दाब सेंसर, ट्यूबिंग या फिटिंग",
        buttonText: "खोजें",
      },
      section: {
        title: "उत्पादों की डेटाशीट",
        description: "यहाँ उत्पादों की डेटाशीट उपलब्ध हैं। प्रोब को ड्रॉइंग के अनुसार बनाया जा सकता है। उपलब्ध उत्पाद ड्रॉइंग के लिए संबंधित उत्पाद का विवरण पेज देखें।",
        resultPrefix: "",
        resultSuffix: "संसाधन",
        emptyTitle: "खोज से मेल खाने वाला कोई संसाधन नहीं मिला",
        emptyDescription: "उत्पाद के नाम, कीवर्ड या श्रेणी से खोजें। आवश्यक दस्तावेज़ न मिले तो उसका अनुरोध भेजें। हमारी टीम आपकी मदद करेगी।",
      },
      labels: {
        language: "भाषा",
        version: "संस्करण",
        update: "अपडेट",
        fieldSeparator: ": ",
        viewProduct: "उत्पाद देखें",
        download: "PDF डाउनलोड करें (अंग्रेज़ी में)",
        custom: "कस्टम उत्पाद का अनुरोध",
      },
      support: {
        title: "ज़रूरी डेटाशीट नहीं मिली?",
        description: "उत्पाद का नाम, उसका उपयोग या ज़रूरी दस्तावेज़ बताएँ। हमारी टीम सही डेटाशीट उपलब्ध कराने और आवश्यकता होने पर उत्पाद चयन या तकनीकी सहायता में मदद करेगी।",
        buttonText: "अनुरोध भेजें" + (request.hrefLang === "en" ? hindiEnglishFallbackSuffix : ""),
        buttonHref: request.href,
      },
    },
    filterOptions: datasheetEnFilterOptions.map(option => ({ ...option, label: categoryLabels[option.value] })),
    datasheetItems: datasheetEnItems.map(item => {
      const [title, description] = copy[item.id];
      const product = item.productHref ? getHindiDraftLink(item.productHref) : undefined;
      return {
        ...item,
        title,
        description,
        label: categoryLabels[item.category],
        language: item.actionType === "download" ? "अंग्रेज़ी" : item.language,
        productHref: product?.href,
        productHrefLang: product?.hrefLang,
        productLinkLabel: product?.hrefLang === "en" ? "उत्पाद देखें" + hindiEnglishFallbackSuffix : undefined,
        downloadHref: item.actionType === "custom" ? getHindiDraftLink("/en/contact/?type=custom-probe").href : item.downloadHref,
      };
    }),
  };
}
