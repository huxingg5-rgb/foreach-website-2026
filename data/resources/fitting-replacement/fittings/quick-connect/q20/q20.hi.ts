const breadcrumbs = [
  { label: "होम", href: "/hi/" },
  { label: "संसाधन", href: "/hi/resources/" },
  { label: "संगत फिटिंग की खोज", href: "/hi/resources/selection-support/fitting-replacement/" },
];

export const fittingReplacementHomeHi = {
  banner: {
    eyebrow: "संसाधन",
    title: "संगत फिटिंग की खोज",
    description: "संगत FOREACH उत्पाद खोजने के लिए अपने मौजूदा मॉडल का कोड डालें।",
  },
  breadcrumbs,
  search: { placeholder: "मौजूदा फिटिंग का मॉडल डालें", buttonText: "खोजें" },
  homeText: {
    tabs: { replace: "संगत मॉडल की खोज", guide: "" },
    history: { label: "उदाहरण" },
    guide: {
      title: "फिटिंग चयन गाइड",
      description: "ट्यूब का आकार, कनेक्शन का प्रकार, माउंटिंग, वाल्व कॉन्फ़िगरेशन और सामग्री चुनें। मेल खाने वाले मॉडल देखें।",
      clearButton: "चयन हटाएँ",
      resultTitle: "मेल खाने वाले मॉडल",
      emptyBeforeSelection: "मेल खाने वाले मॉडल देखने के लिए अपनी ज़रूरतें चुनें।",
      selectedResultTemplate: "{selectedCount} ज़रूरतें चुनी गईं, {matchCount} मॉडल मिले।",
      noMatchText: "सभी ज़रूरतों से मेल खाने वाला कोई मॉडल नहीं मिला। कुछ फ़िल्टर हटाकर देखें।",
    },
    productSection: {
      title: "संगत उत्पाद",
      description: "मेल खाने वाले उत्पाद देखने और सूची में जोड़ने के लिए मौजूदा फिटिंग का मॉडल डालें।",
      countTemplate: "{total} उत्पादों में से {start} से {end}",
    },
    productCard: {
      productName: "FOREACH फिटिंग", productCode: "उत्पाद कोड:", foreachModel: "FOREACH मॉडल:",
      compatibleModels: "संगत मॉडल:", viewDetail: "विवरण देखें",
      addToCart: "सूची में जोड़ें", addedToCart: "सूची में जोड़ा गया",
    },
    emptyResult: {
      title: "मेल खाने वाला कोई मॉडल नहीं मिला",
      description: "पूरा मॉडल कोड जाँचें या तकनीकी सत्यापन के लिए मौजूदा मॉडल, ड्रॉइंग और उत्पाद का फ़ोटो भेजें।",
    },
    pagination: { previous: "पिछला", next: "अगला" },
  },
};

export const fittingReplacementDetailHi = {
  breadcrumbs,
  tableLabels: { productCode: "उत्पाद कोड", compatibleModels: "संगत मॉडल" },
  actions: {
    addToCart: "सूची में जोड़ें", addedToCart: "सूची में जोड़ा गया",
    addDrawing: "ड्रॉइंग जोड़ें", addedDrawing: "ड्रॉइंग जोड़ी गई",
  },
  drawingPreview: {
    title: "2D ड्रॉइंग",
    iframeTitle: "2D ड्रॉइंग का प्रीव्यू",
    loadingLabel: "2D ड्रॉइंग लोड हो रही है…",
    previewButton: "ड्रॉइंग का प्रीव्यू",
    description: "ड्रॉइंग फ़ाइल का अनुरोध करने के लिए उसे सूची में जोड़ें।",
    errorLabel: "ड्रॉइंग लोड नहीं हो सकी। पेज रीफ़्रेश करके फिर कोशिश करें।",
    pageLabel: "पेज",
    retryLabel: "फिर कोशिश करें",
  },
  faq: {
    eyebrow: "FAQ",
    title: "अक्सर पूछे जाने वाले सवाल",
    description: "संगत मॉडल, ड्रॉइंग का प्रीव्यू और अनुरोध, तथा सूची भेजने की जानकारी।",
    items: [
      {
        question: "ड्रॉइंग का प्रीव्यू देखने और उसे जोड़ने में क्या अंतर है?",
        answer: "प्रीव्यू में आप बनावट और आयाम ऑनलाइन देख सकते हैं। ड्रॉइंग जोड़कर आप बताते हैं कि चुने हुए उत्पादों की सूची भेजते समय आपको उसकी आधिकारिक 2D ड्रॉइंग चाहिए।",
      },
      {
        question: "ड्रॉइंग सीधे डाउनलोड क्यों नहीं की जा सकती?",
        answer: "ड्रॉइंग उन मॉडलों के लिए तैयार की जाती हैं जिन्हें आपने सूची में जोड़ा है और जिनकी फ़ाइल आपने माँगी है। इससे गलत मॉडल की फ़ाइल डाउनलोड होने का जोखिम घटता है। फ़ाइलें अनुरोध फ़ॉर्म, ईमेल या दस्तावेज़ों के पैकेज में दी जा सकती हैं।",
      },
      {
        question: "क्या मैं एक साथ कई मॉडल चुन सकता हूँ?",
        answer: "हाँ। एक ही सूची में कई मॉडल जोड़ सकते हैं और हर मॉडल के लिए अलग से बता सकते हैं कि उसकी 2D ड्रॉइंग चाहिए या नहीं।",
      },
    ],
  },
};

export const hindiReplacementFieldText: Record<string, string> = {
  Series: "श्रृंखला",
  "Tube Size or Thread": "ट्यूब का आकार या थ्रेड",
  "Male/Female": "मेल / फ़ीमेल",
  "Panel Mount": "पैनल माउंट",
  Valved: "वाल्व सहित",
  Shape: "आकार",
  "Housing Material": "बॉडी की सामग्री",
  "Sealing Ring Material": "सीलिंग रिंग की सामग्री",
  "Q20 Quick Disconnect Coupling": "Q20 क्विक-डिस्कनेक्ट कपलिंग",
  Male: "मेल",
  Female: "फ़ीमेल",
  "Non Panel Mount": "पैनल माउंट के बिना",
  "Non-Valved": "वाल्व के बिना",
  "In-line": "सीधा",
  Elbow: "एल्बो",
};
