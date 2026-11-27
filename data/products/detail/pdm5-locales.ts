type Pdm5Locale = "hi" | "it" | "de" | "es" | "fr" | "ko" | "ru";
type Pdm5Copy = {
  name: string;
  description: string;
  intro: string[];
  labels: string[];
  values: Record<string, string>;
  applications: string[];
  faqs: { question: string; answer: string }[];
};

// Match stable source labels, never parameter positions. Numbers and units stay
// in the source data; only values containing natural-language text are translated.
const sourceLabels = [
  "产品类型", "压力范围", "输出信号", "通讯接口", "默认 I2C 地址", "推荐电压",
  "工作电压", "工作电流", "压力分辨率", "绝对精度 / TEB", "绝对总误差",
  "默认采样率", "最高采样率", "流道材料", "螺纹接口", "内部体积",
  "推荐接头扭矩", "外形尺寸", "重量", "工作温度", "使用寿命",
] as const;

const pdm5Copy: Record<Pdm5Locale, Pdm5Copy> = {
  hi: {
    name: "PDM5 दाब सेंसर",
    description: "द्रव पथ के निरपेक्ष दाब की निगरानी के लिए FOREACH PDM5 सेंसर। 1200 kPa तक के चार विकल्प, I2C संचार, PEEK का द्रव पथ और 1/4-28 UNF पोर्ट।",
    intro: [
      "FOREACH PDM5 दाब संवेदन मॉड्यूल उपकरणों और स्वचालित मशीनों के द्रव पथ में निरपेक्ष दाब मापता है। डिजिटल I2C सिग्नल से पंप के आउटलेट के बाद दाब की निगरानी की जा सकती है। उपकरण का कंट्रोलर इस सिग्नल से रुकावट का आकलन और असामान्य स्थिति का पता लगा सकता है।",
      "निरपेक्ष दाब की चार मानक रेंज 10–200, 10–400, 10–700 और 10–1200 kPa हैं। अंदरूनी आयतन ≤55 μL है और मानक विनिर्देश के अनुसार प्रभावी सैंपलिंग दर 100 Hz है। आपूर्ति किए गए फ़र्मवेयर की सेटिंग की पुष्टि करें। दाब के उतार-चढ़ाव, अपेक्षित प्रतिक्रिया और द्रव पथ के आयतन के अनुसार सेंसर की जगह और सैंपलिंग चुनें।",
      "जाँचें कि PEEK का द्रव पथ और 1/4-28 UNF-2B आंतरिक थ्रेड वाले पोर्ट फिटिंग और सील से मेल खाते हैं। द्रव के संपर्क वाले हिस्सों की अनुकूलता, तापमान, बिजली की आपूर्ति और संचार की पुष्टि करें। पूरे द्रव पथ पर दाब सिग्नल की व्याख्या और अलार्म लॉजिक का सत्यापन करें।",
    ],
    labels: ["उत्पाद प्रकार", "निरपेक्ष दाब की रेंज", "आउटपुट सिग्नल", "संचार इंटरफ़ेस", "डिफ़ॉल्ट I2C पता", "अनुशंसित वोल्टेज", "ऑपरेटिंग वोल्टेज", "ऑपरेटिंग करंट", "दाब रिज़ॉल्यूशन", "निरपेक्ष सटीकता / TEB", "कुल निरपेक्ष त्रुटि", "सैंपलिंग सेटिंग", "प्रभावी सैंपलिंग दर", "द्रव पथ की सामग्री", "थ्रेड वाला पोर्ट", "अंदरूनी आयतन", "फिटिंग कसने का अनुशंसित टॉर्क", "बाहरी आयाम", "वज़न", "ऑपरेटिंग तापमान", "सेवा अवधि"],
    values: { "压力检测模块": "दाब संवेदन मॉड्यूल", Digital: "डिजिटल", "30 mA Peak": "30 mA पीक", "Better than 1%FS": "1% FS से बेहतर", ">1.5 million pressure cycles": ">1.5 मिलियन दाब चक्र" },
    applications: ["द्रव पथ के दाब की निगरानी", "रुकावट की चेतावनी", "पंप के आउटलेट के बाद दाब फ़ीडबैक", "उपकरण के द्रव पथ की सुरक्षा"],
    faqs: [
      { question: "PDM5 दाब सेंसर किस काम आता है?", answer: "यह उपकरण के द्रव पथ के दाब की निगरानी, रुकावट की चेतावनी, पंप के आउटलेट के बाद दाब फ़ीडबैक और द्रव पथ की सुरक्षा में मदद करता है।" },
      { question: "PDM5 की दाब रेंज क्या है?", answer: "निरपेक्ष दाब की मानक रेंज 10–200, 10–400, 10–700 और 10–1200 kPa हैं। मॉडल के अनुसार रेंज और कुल निरपेक्ष त्रुटि बदलती है।" },
      { question: "PDM5 किस संचार इंटरफ़ेस का उपयोग करता है?", answer: "PDM5 में I2C है। डिफ़ॉल्ट 7-बिट I2C पता 0x6D है।" },
      { question: "PDM5 में द्रव के लिए कौन-सा पोर्ट है?", answer: "पोर्ट में 1/4-28 UNF-2B आंतरिक थ्रेड है। साथ में अनुकूल द्रव फिटिंग और ट्यूब लगाएँ।" },
      { question: "क्या PDM5 कम डेड वॉल्यूम वाले द्रव पथ के लिए उपयुक्त है?", answer: "डेटाशीट में अंदरूनी आयतन ≤55 µL है। पूरे द्रव पथ का कुल आयतन और कैरीओवर जाँचें।" },
    ],
  },
  it: {
    name: "Sensore di pressione PDM5",
    description: "Sensore FOREACH PDM5 per la pressione assoluta nel circuito fluidico, con quattro campi fino a 1200 kPa, comunicazione I2C, percorso in PEEK e attacchi 1/4-28 UNF.",
    intro: [
      "Il sensore FOREACH PDM5 misura la pressione assoluta nei circuiti fluidici di strumenti e apparecchiature automatizzate. Il segnale digitale I2C consente di monitorare la pressione a valle della pompa e aiuta il controllore a valutare ostruzioni e condizioni anomale.",
      "I quattro campi assoluti sono 10–200, 10–400, 10–700 e 10–1200 kPa. Il volume interno è ≤55 μL e la frequenza effettiva di campionamento è 100 Hz secondo la specifica standard. Confermate le impostazioni per il firmware fornito. Scegliete posizione e campionamento in base a variazioni di pressione, risposta richiesta e volume del circuito.",
      "Verificate che percorso fluidico in PEEK e attacchi con filettatura femmina 1/4-28 UNF-2B siano compatibili con raccordi e tenute. Controllate compatibilità del fluido con i materiali bagnati, temperatura, alimentazione e comunicazione. Convalidate poi interpretazione della pressione e logica di allarme sul circuito completo.",
    ],
    labels: ["Tipo di prodotto", "Campi di pressione assoluta", "Segnale di uscita", "Interfaccia di comunicazione", "Indirizzo I2C predefinito", "Tensione consigliata", "Tensione di esercizio", "Corrente di esercizio", "Risoluzione di pressione", "Accuratezza assoluta / TEB", "Errore assoluto totale", "Impostazioni di campionamento", "Frequenza effettiva di campionamento", "Materiale del percorso fluidico", "Attacco filettato", "Volume interno", "Coppia consigliata per il raccordo", "Dimensioni d’ingombro", "Peso", "Temperatura di esercizio", "Durata"],
    values: {
      "压力检测模块": "Modulo di rilevamento della pressione",
      "Digital": "Digitale",
      "30 mA Peak": "30 mA di picco",
      "Better than 1%FS": "Migliore di 1% FS",
      ">1.5 million pressure cycles": ">1.5 milioni di cicli di pressione",
    },
    applications: ["Monitoraggio della pressione del circuito fluidico", "Segnalazione di ostruzioni", "Retroazione di pressione a valle della pompa", "Protezione del circuito fluidico dello strumento"],
    faqs: [
      { question: "A cosa serve il sensore di pressione PDM5?", answer: "Monitora la pressione, consente di segnalare ostruzioni, fornisce una misura a valle della pompa e aiuta a proteggere i circuiti fluidici degli strumenti." },
      { question: "Quali campi di pressione offre PDM5?", answer: "I campi di pressione assoluta standard sono 10–200, 10–400, 10–700 e 10–1200 kPa. Il modello determina il campo e il relativo errore assoluto totale." },
      { question: "Quale interfaccia di comunicazione usa PDM5?", answer: "PDM5 usa I2C. L’indirizzo predefinito a 7 bit è 0x6D." },
      { question: "Che tipo di attacco fluidico ha PDM5?", answer: "Gli attacchi hanno filettatura femmina 1/4-28 UNF-2B e si usano con raccordi e tubi fluidici compatibili." },
      { question: "PDM5 è adatto a un circuito con basso volume morto?", answer: "La scheda tecnica indica un volume interno ≤55 µL. Verificate il volume totale e il trascinamento nell’intero circuito." },
    ],
  },
  de: {
    name: "PDM5-Drucksensor",
    description: "FOREACH PDM5-Drucksensor zur Absolutdruckmessung in Flüssigkeitswegen. Vier Messbereiche bis 1200 kPa, I2C, PEEK-Flüssigkeitskanal und 1/4-28 UNF-Anschlüsse.",
    intro: [
      "Das Drucksensormodul FOREACH PDM5 misst den Absolutdruck in den Flüssigkeitswegen von Instrumenten und automatisierten Geräten. Das digitale I2C-Signal dient der Druckrückmeldung hinter der Pumpe. Die Gerätesteuerung kann damit Verstopfungen beurteilen und ungewöhnliche Betriebszustände erkennen.",
      "Die vier Standardmessbereiche für Absolutdruck sind 10–200, 10–400, 10–700 und 10–1200 kPa. Das Innenvolumen beträgt ≤55 μL. Laut Datenblatt beträgt die effektive Abtastrate 100 Hz. Prüfen Sie die Einstellungen für die gelieferte Firmware. Wählen Sie Einbauort und Abtastrate anhand der Druckschwankungen, der erforderlichen Reaktionszeit und des Volumens des Flüssigkeitswegs.",
      "Der Flüssigkeitskanal aus PEEK und die Anschlüsse mit 1/4-28 UNF-2B-Innengewinde müssen zu den Fittings und Dichtungen passen. Prüfen Sie Medienverträglichkeit, Temperatur, Spannungsversorgung und Kommunikation. Validieren Sie anschließend die Auswertung der Druckwerte und die Alarmlogik im vollständigen Flüssigkeitsweg.",
    ],
    labels: ["Produkttyp", "Absolutdruck-Messbereiche", "Ausgangssignal", "Kommunikationsschnittstelle", "I2C-Standardadresse", "Empfohlene Spannung", "Betriebsspannung", "Betriebsstrom", "Druckauflösung", "Absolute Genauigkeit / TEB", "Absoluter Gesamtfehler", "Abtasteinstellungen", "Effektive Abtastrate", "Werkstoff des Flüssigkeitskanals", "Gewindeanschluss", "Innenvolumen", "Empfohlenes Anziehdrehmoment für Fittings", "Abmessungen", "Gewicht", "Betriebstemperatur", "Lebensdauer"],
    values: {
      "压力检测模块": "Drucksensormodul", Digital: "Digital", "30 mA Peak": "30 mA Spitzenstrom",
      "Better than 1%FS": "Besser als 1 % FS",
      ">1.5 million pressure cycles": ">1.5 Millionen Druckzyklen",
    },
    applications: ["Drucküberwachung in Flüssigkeitswegen von Instrumenten", "Früherkennung von Verstopfungen", "Druckrückmeldung hinter der Pumpe", "Systemschutz"],
    faqs: [
      { question: "Wofür eignet sich der PDM5-Drucksensor?", answer: "PDM5 eignet sich zur Drucküberwachung, Früherkennung von Verstopfungen, Druckrückmeldung hinter der Pumpe und zum Systemschutz in Flüssigkeitswegen von Instrumenten." },
      { question: "Welche Druckmessbereiche bietet der PDM5?", answer: "Die Standardmessbereiche für Absolutdruck sind 10–200, 10–400, 10–700 und 10–1200 kPa. Der absolute Gesamtfehler hängt vom Messbereich des Modells ab." },
      { question: "Welche Kommunikationsschnittstelle nutzt PDM5?", answer: "PDM5 verwendet I2C. Die 7-Bit-Standardadresse ist 0x6D." },
      { question: "Welchen Flüssigkeitsanschluss hat PDM5?", answer: "Der Flüssigkeitsanschluss hat ein 1/4-28 UNF-2B-Innengewinde und lässt sich mit passenden Fluidik-Fittings und Leitungen verbinden." },
      { question: "Eignet sich PDM5 für einen Flüssigkeitsweg mit geringem Totvolumen?", answer: "Ja. Das Datenblatt gibt ein Innenvolumen von ≤55 µL an." },
    ],
  },
  es: {
    name: "Sensor de presión PDM5",
    description: "Sensor de presión PDM5 de 10–1200 kPa con comunicación I2C, canal de PEEK y volumen interno ≤55 µL para supervisar la presión en circuitos de instrumentos.",
    intro: [
      "El módulo de detección de presión FOREACH PDM5 mide la presión en los circuitos de fluidos de instrumentos y equipos automatizados. Su señal digital I2C permite obtener información de presión aguas abajo de la bomba, evaluar obstrucciones y detectar estados anómalos mediante el sistema de control del equipo.",
      "El rango de presión estándar es de 10–1200 kPa y el volumen interno es ≤55 µL. La frecuencia de muestreo predeterminada es de 37.5 Hz, ajustable hasta 100 Hz. Seleccione la posición de montaje y el muestreo según las fluctuaciones de presión, la respuesta requerida y el volumen del circuito.",
      "El canal de PEEK y los puertos con rosca hembra 1/4-28 UNF deben ser compatibles con los conectores y las juntas. Confirme la compatibilidad del fluido, la temperatura, la alimentación y la comunicación; después valide la interpretación de la presión y la lógica de alarma en el circuito completo.",
    ],
    labels: ["Tipo de producto", "Rango de presión", "Señal de salida", "Interfaz de comunicación", "Dirección I2C predeterminada", "Tensión recomendada", "Tensión de funcionamiento", "Corriente de funcionamiento", "Resolución de presión", "Precisión absoluta / TEB", "Error absoluto total", "Frecuencia de muestreo predeterminada", "Frecuencia de muestreo máxima", "Material del canal", "Conexión roscada", "Volumen interno", "Par de apriete recomendado del conector", "Dimensiones", "Peso", "Temperatura de funcionamiento", "Vida útil"],
    values: { "压力检测模块": "Módulo de detección de presión", Digital: "Digital", "30 mA Peak": "30 mA de pico", "Better than 5 Pa": "Mejor que 5 Pa", "Better than 1%FS": "Mejor que 1%FS", "Better than 7 kPa": "Mejor que 7 kPa", "100 Hz 可调": "100 Hz, ajustable", "1/4-28 UNF 内螺纹": "1/4-28 UNF, rosca hembra", ">1.5 million pressure cycles": ">1.5 millones de ciclos de presión" },
    applications: ["Supervisión de presión en circuitos de instrumentos", "Aviso de obstrucciones", "Medición de presión aguas abajo de la bomba", "Protección del sistema"],
    faqs: [
      { question: "¿Para qué se utiliza el PDM5?", answer: "Para supervisar la presión, avisar de obstrucciones, proporcionar información de presión aguas abajo de la bomba y proteger los circuitos de fluidos de instrumentos." },
      { question: "¿Cuál es el rango de presión del PDM5?", answer: "El rango de presión estándar es de 10–1200 kPa." },
      { question: "¿Qué interfaz de comunicación utiliza el PDM5?", answer: "Utiliza I2C; la dirección I2C predeterminada de 7 bits es 0x6D." },
      { question: "¿Qué conexión de fluidos tiene el PDM5?", answer: "Tiene puertos con rosca hembra 1/4-28 UNF para integrarse con conectores y tubos microfluídicos compatibles." },
      { question: "¿Es adecuado para circuitos de bajo volumen muerto?", answer: "Sí. La ficha técnica especifica un volumen interno ≤55 µL." },
    ],
  },
  fr: {
    name: "Capteur de pression PDM5",
    description: "Capteur de pression PDM5 de 10–1200 kPa avec communication I2C, canal en PEEK et volume interne ≤55 µL pour surveiller la pression des circuits d’instruments.",
    intro: [
      "Le module de détection de pression FOREACH PDM5 mesure la pression dans les circuits fluidiques des instruments et équipements automatisés. Son signal numérique I2C permet au système de commande de surveiller la pression en aval de la pompe, d’évaluer les obstructions et de détecter les états anormaux.",
      "La plage de pression standard est de 10–1200 kPa et le volume interne est ≤55 µL. La fréquence d’échantillonnage par défaut est de 37.5 Hz, réglable jusqu’à 100 Hz. Choisissez la position de montage et l’échantillonnage selon les fluctuations de pression, la réponse requise et le volume du circuit.",
      "Le canal en PEEK et les orifices à filetage femelle 1/4-28 UNF doivent être compatibles avec les raccords et les joints. Vérifiez la compatibilité du fluide, la température, l’alimentation et la communication, puis validez l’interprétation de la pression et la logique d’alarme dans le circuit complet.",
    ],
    labels: ["Type de produit", "Plage de pression", "Signal de sortie", "Interface de communication", "Adresse I2C par défaut", "Tension recommandée", "Tension de fonctionnement", "Courant de fonctionnement", "Résolution de pression", "Précision absolue / TEB", "Erreur absolue totale", "Fréquence d’échantillonnage par défaut", "Fréquence d’échantillonnage maximale", "Matériau du canal", "Raccord fileté", "Volume interne", "Couple de serrage recommandé du raccord", "Dimensions", "Masse", "Température de fonctionnement", "Durée de vie"],
    values: { "压力检测模块": "Module de détection de pression", Digital: "Numérique", "30 mA Peak": "30 mA en crête", "Better than 5 Pa": "Meilleure que 5 Pa", "Better than 1%FS": "Meilleure que 1%FS", "Better than 7 kPa": "Inférieure à 7 kPa", "100 Hz 可调": "100 Hz, réglable", "1/4-28 UNF 内螺纹": "1/4-28 UNF, filetage femelle", ">1.5 million pressure cycles": ">1.5 million de cycles de pression" },
    applications: ["Surveillance de pression dans les circuits d’instruments", "Alerte d’obstruction", "Mesure de pression en aval de la pompe", "Protection du système"],
    faqs: [
      { question: "À quoi sert le PDM5 ?", answer: "Il sert à surveiller la pression, signaler les obstructions, fournir un retour de pression en aval de la pompe et protéger les circuits fluidiques des instruments." },
      { question: "Quelle est la plage de pression du PDM5 ?", answer: "La plage de pression standard est de 10–1200 kPa." },
      { question: "Quelle interface de communication utilise le PDM5 ?", answer: "Il utilise I2C ; son adresse I2C à 7 bits par défaut est 0x6D." },
      { question: "Quel est le raccordement fluidique du PDM5 ?", answer: "Les orifices à filetage femelle 1/4-28 UNF permettent l’intégration avec des raccords et tubes microfluidiques compatibles." },
      { question: "Convient-il aux circuits à faible volume mort ?", answer: "Oui. La fiche technique indique un volume interne ≤55 µL." },
    ],
  },
  ko: {
    name: "PDM5 압력 센서",
    description: "PDM5 압력 센서는 10–1200 kPa 범위, I2C 통신, PEEK 유로 및 ≤55 µL 내부 체적으로 기기 유로의 압력을 모니터링합니다.",
    intro: [
      "FOREACH PDM5 압력 감지 모듈은 기기 및 자동화 장비의 유로 압력을 측정합니다. I2C 디지털 신호를 통해 장비 제어 시스템에서 펌프 후단 압력 피드백, 막힘 판단 및 이상 상태 감지에 사용할 수 있습니다.",
      "표준 압력 범위는 10–1200 kPa이며 내부 체적은 ≤55 µL입니다. 기본 샘플링 주파수는 37.5 Hz이고 최대 100 Hz까지 조절할 수 있습니다. 압력 변동, 필요한 응답 속도 및 유로 체적에 맞춰 설치 위치와 샘플링 설정을 선택하십시오.",
      "PEEK 유로와 1/4-28 UNF 암나사 포트는 피팅 및 씰 구조와 맞아야 합니다. 유체 호환성, 온도, 전원 및 통신 조건을 확인한 후 전체 유로에서 압력 해석과 경보 로직을 검증하십시오.",
    ],
    labels: ["제품 유형", "압력 범위", "출력 신호", "통신 인터페이스", "기본 I2C 주소", "권장 전압", "작동 전압", "작동 전류", "압력 분해능", "절대 정확도 / TEB", "절대 총 오차", "기본 샘플링 주파수", "최대 샘플링 주파수", "유로 재질", "나사 연결", "내부 체적", "권장 피팅 체결 토크", "외형 치수", "무게", "작동 온도", "사용 수명"],
    values: { "压力检测模块": "압력 감지 모듈", Digital: "디지털", "30 mA Peak": "30 mA 피크", "Better than 5 Pa": "5 Pa 미만", "Better than 1%FS": "1%FS 미만", "Better than 7 kPa": "7 kPa 미만", "100 Hz 可调": "100 Hz, 조절 가능", "1/4-28 UNF 内螺纹": "1/4-28 UNF 암나사", ">1.5 million pressure cycles": ">1.5백만 회 압력 사이클" },
    applications: ["기기 유로의 압력 모니터링", "막힘 경보", "펌프 후단 압력 피드백", "시스템 보호"],
    faqs: [
      { question: "PDM5는 어떤 용도로 사용합니까?", answer: "기기 유로의 압력 모니터링, 막힘 경보, 펌프 후단 압력 피드백 및 시스템 보호에 사용합니다." },
      { question: "PDM5의 압력 범위는 얼마입니까?", answer: "표준 압력 범위는 10–1200 kPa입니다." },
      { question: "PDM5의 통신 방식은 무엇입니까?", answer: "I2C 통신을 사용하며 기본 7비트 I2C 주소는 0x6D입니다." },
      { question: "PDM5의 유로 연결 방식은 무엇입니까?", answer: "1/4-28 UNF 암나사 포트를 사용하며 호환되는 미세유체 피팅 및 튜브와 연결할 수 있습니다." },
      { question: "저사체적 유로에 적합합니까?", answer: "예. 사양서에 명시된 내부 체적은 ≤55 µL입니다." },
    ],
  },
  ru: {
    name: "Датчик давления PDM5",
    description: "Датчик давления PDM5: диапазон 10–1200 kPa, связь I2C, канал из PEEK и внутренний объём ≤55 µL для контроля давления в жидкостных контурах приборов.",
    intro: [
      "Модуль измерения давления FOREACH PDM5 измеряет давление в жидкостных контурах приборов и автоматизированного оборудования. Цифровой сигнал I2C позволяет системе управления получать обратную связь по давлению после насоса, оценивать засорение и выявлять нештатные состояния.",
      "Стандартный диапазон давления составляет 10–1200 kPa, внутренний объём — ≤55 µL. Частота выборки по умолчанию составляет 37.5 Hz и регулируется до 100 Hz. Выбирайте место установки и частоту выборки с учётом колебаний давления, требуемого быстродействия и объёма контура.",
      "Канал из PEEK и порты с внутренней резьбой 1/4-28 UNF должны соответствовать фитингам и уплотнениям. Проверьте совместимость жидкости, температуру, питание и связь, затем подтвердите корректность интерпретации давления и логики сигнализации в полном контуре.",
    ],
    labels: ["Тип изделия", "Диапазон давления", "Выходной сигнал", "Интерфейс связи", "Адрес I2C по умолчанию", "Рекомендуемое напряжение", "Рабочее напряжение", "Рабочий ток", "Разрешение по давлению", "Абсолютная точность / TEB", "Полная абсолютная погрешность", "Частота выборки по умолчанию", "Максимальная частота выборки", "Материал канала", "Резьбовое соединение", "Внутренний объём", "Рекомендуемый момент затяжки фитинга", "Габариты", "Масса", "Рабочая температура", "Срок службы"],
    values: { "压力检测模块": "Модуль измерения давления", Digital: "Цифровой", "30 mA Peak": "30 mA, пиковый", "Better than 5 Pa": "Лучше 5 Pa", "Better than 1%FS": "Лучше 1%FS", "Better than 7 kPa": "Менее 7 kPa", "100 Hz 可调": "100 Hz, регулируемая", "1/4-28 UNF 内螺纹": "1/4-28 UNF, внутренняя резьба", ">1.5 million pressure cycles": ">1.5 млн циклов давления" },
    applications: ["Контроль давления в контурах приборов", "Предупреждение о засорении", "Обратная связь по давлению после насоса", "Защита системы"],
    faqs: [
      { question: "Для чего используется PDM5?", answer: "Для контроля давления, предупреждения о засорении, обратной связи по давлению после насоса и защиты жидкостных контуров приборов." },
      { question: "Каков диапазон давления PDM5?", answer: "Стандартный диапазон давления составляет 10–1200 kPa." },
      { question: "Какой интерфейс связи использует PDM5?", answer: "Используется I2C; 7-битный адрес I2C по умолчанию — 0x6D." },
      { question: "Как подключается PDM5 к жидкостному контуру?", answer: "Порты с внутренней резьбой 1/4-28 UNF предназначены для подключения совместимых микрофлюидных фитингов и трубок." },
      { question: "Подходит ли PDM5 для контуров с малым мёртвым объёмом?", answer: "Да. В техническом описании указан внутренний объём ≤55 µL." },
    ],
  },
};

export function getPdm5LocaleCopy(locale: string) {
  return Object.hasOwn(pdm5Copy, locale) ? pdm5Copy[locale as Pdm5Locale] : undefined;
}

// PS-110B-2607-00001_A00_en, Table 3. The legacy site table uses earlier values.
const pdm5DatasheetSpecValues: Readonly<Record<string, string>> = {
  "压力分辨率": "5 Pa",
  "最高采样率": "100 Hz",
  "推荐接头扭矩": "0.32–0.4 N·m",
  "重量": "≤35 g",
  "工作温度": "0–70 °C",
};

const italianPdm5SpecValues: Readonly<Record<string, string>> = {
  ...pdm5DatasheetSpecValues,
  "压力范围": "10–200, 10–400, 10–700 e 10–1200 kPa",
  "绝对总误差": "<2 / <4 / <7 / <10 kPa (nei campi corrispondenti)",
  "默认采样率": "Da confermare per firmware e impostazioni forniti",
  "螺纹接口": "Filettatura femmina 1/4-28 UNF-2B, profondità 7.5 mm",
};

const hindiPdm5SpecValues: Readonly<Record<string, string>> = {
  ...pdm5DatasheetSpecValues,
  "压力范围": "10–200, 10–400, 10–700 और 10–1200 kPa",
  "绝对总误差": "संबंधित रेंज में <2 / <4 / <7 / <10 kPa",
  "默认采样率": "आपूर्ति किए गए फ़र्मवेयर और सेटिंग के अनुसार पुष्टि करें",
  "螺纹接口": "1/4-28 UNF-2B आंतरिक थ्रेड, 7.5 mm गहराई",
};

const germanPdm5SpecValues: Readonly<Record<string, string>> = {
  ...pdm5DatasheetSpecValues,
  "压力范围": "10–200, 10–400, 10–700 und 10–1200 kPa",
  "绝对总误差": "<2 / <4 / <7 / <10 kPa (je nach Messbereich)",
  "默认采样率": "Gelieferte Firmware und Einstellungen prüfen",
  "螺纹接口": "1/4-28 UNF-2B-Innengewinde, 7.5 mm tief",
};

const pdm5SpecValuesByLocale: Record<string, Readonly<Record<string, string>>> = {
  de: germanPdm5SpecValues,
  hi: hindiPdm5SpecValues,
  it: italianPdm5SpecValues,
};

const chineseValues: Record<string, string> = {
  Digital: "数字信号", "30 mA Peak": "30 mA 峰值", "Better than 5 Pa": "优于 5 Pa",
  "Better than 1%FS": "优于 1%FS", "Better than 7 kPa": "优于 7 kPa",
  ">1.5 million pressure cycles": ">150 万次压力循环",
};

export function applyPdm5LocaleCopy<T extends Record<string, unknown>>(source: T, localized: T, locale: string): T {
  if (source.slug !== "pdm5-pressure-sensor") return localized;
  const copy = getPdm5LocaleCopy(locale);
  if (!copy && locale !== "zh" && locale !== "zh-CN") return localized;
  const labels = copy ? Object.fromEntries(sourceLabels.map((key, index) => [key, copy.labels[index]])) : {};
  const values = copy?.values ?? chineseValues;
  const specs = (source.specs as { label: string; value: string }[]).map((item) => ({
    ...item, label: labels[item.label] ?? item.label,
    value: pdm5SpecValuesByLocale[locale]?.[item.label] ?? values[item.value] ?? item.value,
  }));
  if (!copy) return { ...localized, specs, specifications: specs };
  return {
    ...localized, specs, specifications: specs,
    title: copy.name, name: copy.name,
    ...(locale === "de" || locale === "it" || locale === "hi" ? { model: "PDM5", foreachModel: "PDM5", modelDisplay: "PDM5", displayModel: "PDM5" } : {}),
    description: copy.intro.join("\n\n"),
    pdm5IntroductionParagraphs: copy.intro,
    advantages: specs.filter((_, index) => [1, 3, 8, 11, 12, 13, 14, 15].includes(index)).map((item) => `${item.label}: ${item.value}`),
    commonApplications: copy.applications,
    faqs: copy.faqs, faq: copy.faqs,
    mainImageAlt: copy.name, imageAlt: copy.name,
    seo: { title: `${copy.name} | Foreach Technology`, description: copy.description },
  };
}
