const productAliases: Readonly<Record<string, string>> = {
  pumps: "पंप",
  "piston-pump": "पिस्टन पंप",
  "miniature-diaphragm-pumps": "मिनिएचर डायफ्राम पंप",
  "pipetting-pumps": "पिपेटिंग पंप",
  "valveless-metering-pumps": "वाल्वरहित मीटरिंग पंप",
  "syringe-pumps": "सिरिंज पंप",
  valves: "वाल्व",
  "rotary-valves": "रोटरी वाल्व",
  "solenoid-valves": "सोलनॉइड वाल्व",
  fittings: "फ्लुइडिक फिटिंग",
  "hard-tube-fittings": "कठोर ट्यूब फिटिंग",
  "barbed-fittings": "होज़ बार्ब फिटिंग",
  "thread-to-barbed-fittings": "थ्रेड से बार्ब फिटिंग",
  "luer-fittings": "लुअर फिटिंग",
  "quick-connect-fittings": "क्विक-कनेक्ट फिटिंग",
  "female-thread-adapters": "फ़ीमेल थ्रेड एडाप्टर",
  "bulkhead-barbed-fittings": "बल्कहेड बार्ब फिटिंग",
  "filters-and-check-valves": "फ़िल्टर चेक वाल्व",
  "membrane-degassers": "मेम्ब्रेन डीगैसर",
  tubing: "ट्यूब और कैपिलरी",
  probes: "प्रोब और सुइयाँ",
  "sampling-probes": "सैंपलिंग प्रोब",
  control: "सेंसर कंट्रोल मॉड्यूल",
  "tubing-assemblies": "ट्यूबिंग असेंबली",
};

export function getHindiProductSearchAliases(href: string): string[] {
  if (!/^\/(?:en\/|hi\/)?products\//.test(href)) return [];
  return href.split(/[/?#]/).flatMap(part => productAliases[part] ? [productAliases[part]] : []);
}
