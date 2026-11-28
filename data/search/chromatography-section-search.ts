const sections = [
  ["pump-names", "Sample metering and loop loading"],
  ["pump-names", "Solvent and wash-path selection"],
  ["product-direction", "Needle-wash supply and drainage"],
  ["selection-start", "Injection-path connections"],
] as const;

const copy = {
  de: [
    ["Probendosierung und Befüllen der Probenschleife", "Unterscheiden Sie zwischen Ansaugen, vollständigem oder teilweisem Befüllen der Probenschleife und der eigentlichen Injektion."],
    ["Auswahl der Lösungsmittel- und Spülwege", "Wählen Sie das Ventil anhand der Anschlüsse und des Drucks in jeder Schaltstellung des Spül- oder Analysenpfads."],
    ["Spülmittelzufuhr und Ablauf für die Injektionsnadel", "Legen Sie die Spülmittelzufuhr und die Absaugung lufthaltiger Abfälle anhand des eingebauten Strömungswiderstands getrennt aus."],
    ["Anschlüsse im Injektionspfad", "Prüfen Sie durchströmte Volumina, Spalte und Druck an Sonde, Ventil, Probenschleife und Fittings im tatsächlichen Injektionsbetrieb."],
  ],
  it: [
    ["Dosaggio del campione e riempimento del loop", "Distingui l’aspirazione, il riempimento totale o parziale del loop e l’iniezione vera e propria."],
    ["Selezione dei percorsi del solvente e di lavaggio", "Scegli la valvola in base ai collegamenti e alla pressione in ogni posizione del circuito di lavaggio o del circuito analitico."],
    ["Alimentazione e scarico per il lavaggio dell’ago", "Dimensiona separatamente la mandata del liquido di lavaggio e l’aspirazione degli scarichi contenenti aria in base alla resistenza del circuito installato."],
    ["Collegamenti nel percorso di iniezione", "Verifica i volumi attraversati dal fluido, i giochi e la pressione di sonda, valvola, loop e raccordi nelle condizioni reali di iniezione."],
  ],
  hi: [
    ["सैंपल की मीटरिंग और सैंपल लूप भरना", "सैंपल खींचने, लूप को पूरा या आंशिक भरने और वास्तविक इंजेक्शन के बीच अंतर करें।"],
    ["सॉल्वेंट और धुलाई के द्रव पथ का चयन", "धुलाई या विश्लेषण वाले पथ की हर स्विचिंग स्थिति में पोर्ट कनेक्शन और दाब के अनुसार वाल्व चुनें।"],
    ["नीडल की धुलाई के लिए आपूर्ति और निकासी", "स्थापित सर्किट के प्रवाह प्रतिरोध के आधार पर धुलाई द्रव की आपूर्ति और हवा मिले अपशिष्ट का सक्शन अलग-अलग तय करें।"],
    ["इंजेक्शन पथ के कनेक्शन", "वास्तविक इंजेक्शन स्थिति में प्रोब, वाल्व, सैंपल लूप और फिटिंग से होकर गुजरने वाला द्रव आयतन, खाली जगह और दाब जाँचें।"],
  ],
} as const;

export function getChromatographySearchSectionCopy(locale: keyof typeof copy) {
  const page = `/${locale}/applications/analytical-instruments/liquid-chromatography`;
  return sections.map(([anchor, sourceTitle], index) => {
    const [title, description] = copy[locale][index];
    return { href: `${page}#${anchor}`, sourceTitle: `Chromatography and autosamplers · ${sourceTitle}`, title, description };
  });
}
