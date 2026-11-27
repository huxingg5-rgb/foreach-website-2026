export const germanSyringeSelection = {
  category: {
    title: "OEM-Spritzenpumpen für die automatisierte Flüssigkeitshandhabung",
    metaDescription: "OEM-Spritzenpumpen von FOREACH mit Magnet- oder Drehschaltventilen, 30 mm oder 60 mm Hub sowie Ein- und Mehrkanalausführungen für die automatisierte Flüssigkeitshandhabung.",
    imageAlt: "OEM-Spritzenpumpen von FOREACH für die automatisierte Flüssigkeitshandhabung",
    paragraphs: [
      "OEM-Spritzenpumpen von FOREACH kombinieren die Dosierung über Glasspritzen mit Magnet- oder Drehschaltventilen zur Reagenziendosierung, Probenverdünnung und Flüssigkeitsübertragung in automatisierten Analysengeräten. Das Sortiment umfasst HMD-Spritzenpumpen mit Magnetventilen und HLD-Spritzenpumpen mit Drehschaltventilen mit 30 mm oder 60 mm Hub. Kanalzahl, Ventilkonfiguration und Flüssigkeitsanschlüsse lassen sich an IVD-Analysatoren, Laborgeräte und automatisierte Flüssigkeitshandhabung anpassen.",
      "Berücksichtigen Sie bei der Auswahl das Dosiervolumen, Genauigkeit und Wiederholbarkeit, die Zahl der Dosierkanäle, die Fluidpfade und die Dosierzykluszeit. Prüfen Sie auch die Verträglichkeit der medienberührten Werkstoffe, den Einbauraum und die Kommunikationsschnittstellen. Dosierkanäle bezeichnen die Dosierstellen der Spritzen. Die Ventilausführung bestimmt die Umschaltung der Fluidpfade. Wählen Sie beides entsprechend dem Dosierbedarf und der Leitungsführung. RS-232, RS-485 und CAN ermöglichen die gerätegesteuerte Ansaugung, Dosierung und Ventilumschaltung.",
      "Die HMD-Baureihe schaltet Fluidpfade mit Magnetventilen und bietet 30 mm oder 60 mm Hub. Ausführungen mit einem Kanal sowie mit 2, 3, 4, 6 und 8 Kanälen unterstützen Reagenziendosierung, Probenverdünnung und mehrkanalige Flüssigkeitsabgabe. Magnetventile und Flüssigkeitsanschlüsse lassen sich an den Zielfluidpfad anpassen. Die HLD-Baureihe schaltet Fluidpfade mit Drehschaltventilen und bietet 30 mm oder 60 mm Hub. Zur wählbaren Konfiguration gehören unter anderem 3-, 5- und 9-Wege-Drehschaltventile. Sie verbinden Reagenzien, Verdünnungs- und Spülflüssigkeiten sowie Abgabeleitungen zum aufeinanderfolgenden Ansaugen und Dosieren.",
    ],
  },
  series: [
    {
      title: "HMD OEM-Spritzenpumpen mit Magnetventilen zur Reagenziendosierung",
      imageAlt: "HMD OEM-Spritzenpumpen von FOREACH mit Magnetventilen zur Reagenziendosierung",
      introduction: "HMD-OEM-Spritzenpumpen von FOREACH kombinieren die Dosierung über Glasspritzen mit Magnetventilschaltung zur Reagenziendosierung, Probenverdünnung und mehrkanaligen Flüssigkeitsabgabe in automatisierten Analysengeräten. Der Spritzenantrieb steuert Ansaugen und Dosieren. Die Magnetventile schalten die verbundenen Fluidpfade um.",
    },
    {
      title: "HLD OEM-Spritzenpumpen mit Drehschaltventilen zur Reagenzienauswahl und -dosierung",
      imageAlt: "HLD OEM-Spritzenpumpen von FOREACH mit Drehschaltventilen zur Reagenzienauswahl und -dosierung",
      introduction: "HLD-OEM-Spritzenpumpen von FOREACH verbinden die Dosierung über Glasspritzen mit Mehrwege-Drehschaltventilen zur Reagenzienauswahl, Probenverdünnung und dosierten Abgabe in automatisierten Analysengeräten. Das Drehschaltventil wählt die Flüssigkeitsquelle oder den Abgabepfad. Die Spritze steuert Ansaugen und Dosieren.",
    },
  ],
};

export function getGermanSyringeSelectionCopy(index: number) {
  const { category, series } = germanSyringeSelection;
  const choice = series[index];
  if (!choice) return category;
  const [head, rest] = category.paragraphs[2].split(" Die HLD-Baureihe");
  return {
    title: choice.title,
    imageAlt: choice.imageAlt,
    paragraphs: [choice.introduction, category.paragraphs[1], index === 0 ? head : "Die HLD-Baureihe" + rest],
  };
}
