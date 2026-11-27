import { controlModuleDetails } from "../control-modules/control-module-detail.generated";

type AbdLocale = "hi" | "en" | "it" | "de" | "es" | "fr" | "ko" | "ru";
type AbdCopy = {
  name: string; intro: string[]; applications: string[]; highlights: string[];
  labels: string[]; values: Record<string, string>;
  faqs: { question: string; answer: string }[];
};

// Product limits and interfaces are taken from the Chinese ABD record. In
// particular TTL is the electrical interface; Modbus RTU is the protocol.
const copies: Record<AbdLocale, AbdCopy> = {
  en: {
    name: "ABD Air Bubble Detector",
    intro: [
      "The ABD air bubble detector detects bubbles, droplets and gas/liquid states in transparent tubing. It uses non-contact infrared sensing to distinguish gas from liquid by their different optical responses. The sensor does not contact the fluid, avoiding additional contamination and flow resistance.",
      "Designed for fluid-line monitoring in IVD, life science, laboratory automation, environmental monitoring and food testing equipment, ABD supports bubble alarms, droplet detection, reagent-line status monitoring and equipment fault protection. Configurations cover common transparent tubing ODs from 1.6 mm to 6.4 mm; choose the configuration to match the actual tubing OD.",
    ],
    applications: ["Bubble alarms", "Droplet detection", "Transparent tubing status monitoring", "Reagent-line status detection", "Fluid-circuit fault protection", "Tubing monitoring in automated instruments"],
    highlights: ["Non-contact bubble / droplet detection", "For transparent tubing OD 1.6–6.4 mm", "TTL interface / Modbus RTU protocol", "UART/TTL digital signal, IO analog voltage output and IO digital alarm output", "Detectable bubble / liquid width > 0.8 mm", "Bubble detection response time: 6 ms", "Liquid detection response time: 6 ms"],
    labels: ["Product type", "Detection method", "Detected states", "Compatible tubing OD", "Compatible tubing materials", "Detected media", "Detectable width", "Communication interface", "Communication protocol", "Outputs", "Operating voltage", "Operating current", "Response time", "Operating temperature", "Storage temperature", "Dimensions", "Weight"],
    values: { "气泡检测模块": "Air bubble detector", "非接触式红外检测": "Non-contact infrared sensing", "气泡 / 液滴 / 气液状态": "Bubbles / droplets / gas-liquid states", "PU / PVC / PTFE / PFA / FEP 透明管": "Transparent PU / PVC / PTFE / PFA / FEP tubing", "> 0.8 mm 宽度": "Width > 0.8 mm", "UART/TTL 数字信号、IO 模拟电压 0–5V、IO 数字报警信号": "UART/TTL digital signal; IO analog voltage 0–5V; IO digital alarm signal", "气泡检测 6 ms；液体检测 6 ms": "Bubble detection: 6 ms; liquid detection: 6 ms" },
    faqs: [
      { question: "Does the ABD air bubble detector contact the liquid?", answer: "No. It senses through the wall of transparent tubing, reducing the risk of fluid-circuit contamination and additional flow resistance." },
      { question: "Which tubing diameters can ABD monitor?", answer: "Standard configurations cover transparent tubing ODs of 1.6, 2.0, 2.5, 3.2, 4.0, 4.8, 6.0 and 6.4 mm." },
      { question: "Does ABD support Modbus RTU?", answer: "Yes. The module uses a TTL electrical interface and supports the Modbus RTU communication protocol." },
      { question: "Can ABD detect very small microbubbles?", answer: "Check the actual bubble size. The specified detectable bubble or liquid width is > 0.8 mm; smaller bubbles or liquid columns may not be detected reliably." },
    ],
  },
  hi: {
    name: "ABD हवा के बुलबुले पहचानने वाला सेंसर",
    intro: [
      "ABD पारदर्शी ट्यूब में हवा के बुलबुले, द्रव की बूँदें और गैस या द्रव की मौजूदगी पहचानता है। यह गैस और द्रव की ऑप्टिकल प्रतिक्रिया में अंतर को बिना संपर्क वाले इन्फ़्रारेड सेंसर से पहचानता है। सेंसर द्रव को नहीं छूता, जिससे अतिरिक्त संदूषण और प्रवाह प्रतिरोध से बचा जा सकता है।",
      "ABD का उपयोग IVD, लाइफ़ साइंस, लैब ऑटोमेशन, पर्यावरण निगरानी और खाद्य परीक्षण उपकरणों में द्रव लाइन की निगरानी के लिए किया जाता है। इससे बुलबुले की चेतावनी, बूँद की पहचान, रीएजेंट लाइन की स्थिति की निगरानी और उपकरण को खराबी से बचाने में मदद मिलती है। कॉन्फ़िगरेशन पारदर्शी ट्यूब के 1.6 mm से 6.4 mm तक के सामान्य बाहरी व्यास के लिए उपलब्ध हैं। वास्तविक बाहरी व्यास के अनुसार कॉन्फ़िगरेशन चुनें।",
    ],
    applications: ["बुलबुले की चेतावनी", "द्रव की बूँद की पहचान", "पारदर्शी ट्यूब की स्थिति की निगरानी", "रीएजेंट लाइन की स्थिति की पहचान", "द्रव सर्किट को खराबी से बचाना", "स्वचालित उपकरणों में ट्यूब की निगरानी"],
    highlights: ["बिना संपर्क के बुलबुले और बूँद की पहचान", "1.6–6.4 mm बाहरी व्यास वाली पारदर्शी ट्यूब के लिए", "TTL इंटरफ़ेस / Modbus RTU प्रोटोकॉल", "UART/TTL डिजिटल सिग्नल, IO एनालॉग वोल्टेज आउटपुट और IO डिजिटल अलार्म आउटपुट", "पहचाने जा सकने वाले बुलबुले या द्रव की चौड़ाई > 0.8 mm", "बुलबुले की पहचान का प्रतिक्रिया समय: 6 ms", "द्रव की पहचान का प्रतिक्रिया समय: 6 ms"],
    labels: ["उत्पाद प्रकार", "पहचान विधि", "पहचानी जाने वाली स्थितियाँ", "अनुकूल ट्यूब का बाहरी व्यास", "अनुकूल ट्यूब सामग्री", "पहचाने जाने वाले माध्यम", "पहचानी जा सकने वाली चौड़ाई", "संचार इंटरफ़ेस", "संचार प्रोटोकॉल", "आउटपुट", "ऑपरेटिंग वोल्टेज", "ऑपरेटिंग करंट", "प्रतिक्रिया समय", "ऑपरेटिंग तापमान", "भंडारण तापमान", "आयाम", "वज़न"],
    values: { "气泡检测模块": "हवा के बुलबुले पहचानने वाला सेंसर", "非接触式红外检测": "बिना संपर्क के इन्फ़्रारेड से पहचान", "气泡 / 液滴 / 气液状态": "बुलबुले / द्रव की बूँदें / गैस या द्रव की मौजूदगी", "PU / PVC / PTFE / PFA / FEP 透明管": "पारदर्शी PU / PVC / PTFE / PFA / FEP ट्यूब", "> 0.8 mm 宽度": "चौड़ाई > 0.8 mm", "UART/TTL 数字信号、IO 模拟电压 0–5V、IO 数字报警信号": "UART/TTL डिजिटल सिग्नल, IO एनालॉग वोल्टेज 0–5V और IO डिजिटल अलार्म सिग्नल", "气泡检测 6 ms；液体检测 6 ms": "बुलबुले की पहचान 6 ms, द्रव की पहचान 6 ms" },
    faqs: [
      { question: "क्या ABD सेंसर द्रव को छूता है?", answer: "सेंसर पारदर्शी ट्यूब की दीवार के पार स्थिति पहचानता है। इससे द्रव सर्किट में संदूषण और अतिरिक्त प्रवाह प्रतिरोध का जोखिम कम होता है।" },
      { question: "ABD किस बाहरी व्यास वाली ट्यूब की निगरानी कर सकता है?", answer: "मानक कॉन्फ़िगरेशन 1.6, 2.0, 2.5, 3.2, 4.0, 4.8, 6.0 और 6.4 mm बाहरी व्यास वाली पारदर्शी ट्यूब के लिए हैं।" },
      { question: "क्या ABD Modbus RTU का समर्थन करता है?", answer: "हाँ। मॉड्यूल में TTL विद्युत इंटरफ़ेस है और यह Modbus RTU संचार प्रोटोकॉल का समर्थन करता है।" },
      { question: "क्या ABD बेहद छोटे बुलबुले पहचान सकता है?", answer: "बुलबुले का वास्तविक आकार जाँचें। विनिर्देश के अनुसार पहचाने जा सकने वाले बुलबुले या द्रव की चौड़ाई > 0.8 mm है। इससे छोटे बुलबुले या द्रव स्तंभ भरोसेमंद तरीके से पहचाने न जा सकें।" },
    ],
  },
  it: {
    name: "Rilevatore di bolle d’aria ABD",
    intro: [
      "Il rilevatore di bolle d’aria ABD identifica bolle, gocce e la presenza di aria o liquido nei tubi trasparenti. Il rilevamento a infrarossi senza contatto distingue il gas dal liquido in base alla diversa risposta ottica. Il sensore resta all’esterno del tubo e non introduce contaminazione o resistenza al flusso nel circuito.",
      "ABD monitora linee fluidiche in apparecchiature per diagnostica in vitro (IVD), scienze della vita, automazione di laboratorio, monitoraggio ambientale e analisi alimentare. Permette di rilevare bolle e gocce, monitorare le linee di reagenti e segnalare guasti. Le configurazioni coprono tubi trasparenti con diametro esterno da 1.6 mm a 6.4 mm. Scegliete quella che corrisponde al diametro esterno effettivo.",
    ],
    applications: ["Allarmi per bolle", "Rilevamento di gocce", "Monitoraggio dello stato del tubo trasparente", "Rilevamento dello stato delle linee dei reagenti", "Protezione del circuito fluidico in caso di guasti", "Monitoraggio dei tubi negli strumenti automatizzati"],
    highlights: ["Rilevamento di bolle e gocce senza contatto", "Per tubi trasparenti con diametro esterno 1.6–6.4 mm", "Interfaccia TTL e protocollo Modbus RTU", "Segnale digitale UART/TTL, uscita analogica in tensione IO e uscita digitale di allarme IO", "Larghezza rilevabile della bolla o del liquido > 0.8 mm", "Risposta al rilevamento di bolle: 6 ms", "Risposta al rilevamento del liquido: 6 ms"],
    labels: ["Tipo di prodotto", "Metodo di rilevamento", "Stati rilevati", "Diametro esterno del tubo compatibile", "Materiali dei tubi compatibili", "Fluidi rilevati", "Larghezza rilevabile", "Interfaccia di comunicazione", "Protocollo di comunicazione", "Uscite", "Tensione di esercizio", "Corrente di esercizio", "Tempo di risposta", "Temperatura di esercizio", "Temperatura di stoccaggio", "Dimensioni", "Peso"],
    values: {
      "气泡检测模块": "Rilevatore di bolle d’aria",
      "非接触式红外检测": "Rilevamento a infrarossi senza contatto",
      "气泡 / 液滴 / 气液状态": "Bolle / gocce / presenza di gas o liquido",
      "PU / PVC / PTFE / PFA / FEP 透明管": "Tubo trasparente in PU / PVC / PTFE / PFA / FEP",
      "Liquid / Gas": "Liquido / gas",
      "> 0.8 mm 宽度": "Larghezza > 0.8 mm",
      "UART/TTL 数字信号、IO 模拟电压 0–5V、IO 数字报警信号": "Segnale digitale UART/TTL, tensione analogica IO 0–5V e segnale digitale di allarme IO",
      "气泡检测 6 ms；液体检测 6 ms": "Rilevamento di bolle: 6 ms. Rilevamento del liquido: 6 ms.",
    },
    faqs: [
      { question: "Il rilevatore di bolle d’aria ABD entra a contatto con il liquido?", answer: "Il rilevamento avviene attraverso la parete del tubo trasparente. Questo riduce il rischio di contaminazione e di aumento della resistenza al flusso." },
      { question: "Quali diametri dei tubi può monitorare ABD?", answer: "Le configurazioni standard coprono tubi trasparenti con diametro esterno di 1.6, 2.0, 2.5, 3.2, 4.0, 4.8, 6.0 e 6.4 mm." },
      { question: "ABD supporta Modbus RTU?", answer: "Sì. Il modulo usa un’interfaccia elettrica TTL e supporta il protocollo di comunicazione Modbus RTU." },
      { question: "ABD è in grado di rilevare microbolle molto piccole?", answer: "Controllate le dimensioni reali delle bolle. La larghezza della bolla o del liquido rilevabile è > 0.8 mm. Il rilevamento di bolle o colonne di liquido più piccole può essere inaffidabile." },
    ],
  },
  de: {
    name: "ABD-Luftblasendetektor",
    intro: [
      "Der ABD-Luftblasendetektor erkennt Luftblasen, Tropfen und Gas- oder Flüssigkeitszustände in transparenten Schläuchen. Der Sensor unterscheidet Gas und Flüssigkeit anhand ihrer unterschiedlichen optischen Eigenschaften mit berührungsloser Infraroterkennung. Er kommt nicht mit dem Medium in Kontakt und verursacht dadurch keine zusätzliche Verunreinigung oder Strömungsbehinderung.",
      "ABD überwacht Flüssigkeitsleitungen in Geräten für In-vitro-Diagnostik, Life Sciences, Laborautomation, Umweltüberwachung und Lebensmittelanalytik. Das Modul unterstützt Luftblasenalarme, Tropfenerkennung, die Überwachung von Reagenzienleitungen und den Schutz vor Gerätestörungen. Ausführungen sind für transparente Schläuche mit Außendurchmessern von 1.6 mm bis 6.4 mm verfügbar. Wählen Sie die Ausführung passend zum tatsächlichen Außendurchmesser.",
    ],
    applications: ["Luftblasenalarme", "Tropfenerkennung", "Zustandsüberwachung transparenter Schläuche", "Überwachung von Reagenzienleitungen", "Schutz vor Störungen im Flüssigkeitsweg", "Schlauchüberwachung in automatisierten Geräten"],
    highlights: ["Berührungslose Erkennung von Luftblasen und Tropfen", "Für transparente Schläuche mit 1.6–6.4 mm Außendurchmesser", "TTL-Schnittstelle / Modbus-RTU-Protokoll", "UART/TTL-Digitalsignal, analoger IO-Spannungsausgang und digitaler IO-Alarmausgang", "Erfassbare Luftblasen- oder Flüssigkeitsbreite > 0.8 mm", "Ansprechzeit bei Luftblasen: 6 ms", "Ansprechzeit bei Flüssigkeit: 6 ms"],
    labels: ["Produkttyp", "Erkennungsverfahren", "Erfasste Zustände", "Passender Schlauchaußendurchmesser", "Geeignete Schlauchwerkstoffe", "Erfasste Medien", "Erfassbare Breite", "Kommunikationsschnittstelle", "Kommunikationsprotokoll", "Ausgänge", "Betriebsspannung", "Betriebsstrom", "Ansprechzeit", "Betriebstemperatur", "Lagertemperatur", "Abmessungen", "Gewicht"],
    values: {
      "气泡检测模块": "Luftblasendetektor", "非接触式红外检测": "Berührungslose Infraroterkennung",
      "气泡 / 液滴 / 气液状态": "Luftblasen / Tropfen / Gas- oder Flüssigkeitszustand",
      "PU / PVC / PTFE / PFA / FEP 透明管": "Transparente Schläuche aus PU / PVC / PTFE / PFA / FEP",
      "Liquid / Gas": "Flüssigkeit / Gas", "> 0.8 mm 宽度": "Breite > 0.8 mm",
      "UART/TTL 数字信号、IO 模拟电压 0–5V、IO 数字报警信号": "UART/TTL-Digitalsignal, analoges IO-Spannungssignal 0–5V, digitales IO-Alarmsignal",
      "气泡检测 6 ms；液体检测 6 ms": "Luftblasenerkennung: 6 ms. Flüssigkeitserkennung: 6 ms.",
    },
    faqs: [
      { question: "Berührt der ABD-Luftblasendetektor die Flüssigkeit?", answer: "Der Sensor erkennt den Inhalt durch die Wand eines transparenten Schlauchs. Dadurch verringert sich das Risiko für Verunreinigungen und zusätzlichen Strömungswiderstand im Flüssigkeitsweg." },
      { question: "Welche Schlauchdurchmesser kann ABD überwachen?", answer: "Die Standardausführungen sind für transparente Schläuche mit Außendurchmessern von 1.6, 2.0, 2.5, 3.2, 4.0, 4.8, 6.0 und 6.4 mm vorgesehen." },
      { question: "Unterstützt ABD Modbus RTU?", answer: "Ja. Das Modul verwendet eine elektrische TTL-Schnittstelle und unterstützt das Kommunikationsprotokoll Modbus RTU." },
      { question: "Kann ABD sehr kleine Mikroblasen erkennen?", answer: "Prüfen Sie die tatsächliche Blasengröße. Die spezifizierte erfassbare Luftblasen- oder Flüssigkeitsbreite beträgt > 0.8 mm. Kleinere Luftblasen oder Flüssigkeitssäulen werden möglicherweise nicht zuverlässig erkannt." },
    ],
  },
  es: {
    name: "Detector de burbujas de aire ABD",
    intro: [
      "El detector ABD identifica burbujas, gotas y estados gas/líquido en tubos transparentes. Utiliza detección infrarroja sin contacto y distingue el gas del líquido por su diferente respuesta óptica. El módulo no entra en contacto con el fluido, por lo que evita añadir contaminación y resistencia al flujo.",
      "Está diseñado para supervisar circuitos de equipos IVD, ciencias de la vida, automatización de laboratorio, control ambiental y análisis de alimentos. Permite generar alarmas de burbujas, detectar gotas, identificar el estado de las líneas de reactivos y proteger el equipo ante anomalías. Las configuraciones cubren diámetros exteriores habituales de tubo transparente de 1.6 mm a 6.4 mm; elija la configuración según el diámetro exterior real.",
    ],
    applications: ["Alarmas de burbujas", "Detección de gotas", "Supervisión del estado de tubos transparentes", "Identificación del estado de líneas de reactivos", "Protección ante anomalías del circuito", "Supervisión de tubos en instrumentos automatizados"],
    highlights: ["Detección de burbujas / gotas sin contacto", "Para tubo transparente de DE 1.6–6.4 mm", "Interfaz TTL / protocolo Modbus RTU", "Señal digital UART/TTL, salida de tensión analógica IO y salida digital de alarma IO", "Anchura detectable de burbuja / líquido > 0.8 mm", "Tiempo de respuesta para burbujas: 6 ms", "Tiempo de respuesta para líquido: 6 ms"],
    labels: ["Tipo de producto", "Método de detección", "Elementos detectados", "DE de tubo compatible", "Materiales de tubo compatibles", "Medios detectados", "Anchura detectable", "Interfaz de comunicación", "Protocolo de comunicación", "Salidas", "Tensión de funcionamiento", "Corriente de funcionamiento", "Tiempo de respuesta", "Temperatura de funcionamiento", "Temperatura de almacenamiento", "Dimensiones", "Peso"],
    values: { "气泡检测模块": "Detector de burbujas de aire", "非接触式红外检测": "Detección infrarroja sin contacto", "气泡 / 液滴 / 气液状态": "Burbujas / gotas / estados gas-líquido", "PU / PVC / PTFE / PFA / FEP 透明管": "Tubo transparente de PU / PVC / PTFE / PFA / FEP", "Liquid / Gas": "Líquido / gas", "> 0.8 mm 宽度": "Anchura > 0.8 mm", "UART/TTL 数字信号、IO 模拟电压 0–5V、IO 数字报警信号": "Señal digital UART/TTL; tensión analógica IO de 0–5V; señal digital de alarma IO", "气泡检测 6 ms；液体检测 6 ms": "Detección de burbujas: 6 ms; detección de líquido: 6 ms" },
    faqs: [
      { question: "¿El detector de burbujas ABD entra en contacto con el líquido?", answer: "No entra en contacto directo con el líquido. El módulo se coloca sobre el tubo transparente para realizar la detección, reduciendo el riesgo de contaminación del circuito y la resistencia adicional al flujo." },
      { question: "¿Qué diámetros de tubo puede supervisar ABD?", answer: "Las configuraciones estándar cubren diámetros exteriores de tubo transparente de 1.6, 2.0, 2.5, 3.2, 4.0, 4.8, 6.0 y 6.4 mm." },
      { question: "¿ABD admite Modbus RTU?", answer: "Sí. El módulo utiliza una interfaz eléctrica TTL y admite el protocolo de comunicación Modbus RTU." },
      { question: "¿ABD puede detectar microburbujas muy pequeñas?", answer: "Debe comprobarse el tamaño real. La anchura detectable especificada de la burbuja o del líquido es > 0.8 mm; las burbujas o columnas de líquido más pequeñas pueden no detectarse de forma fiable." },
    ],
  },
  fr: {
    name: "Détecteur de bulles d’air ABD",
    intro: [
      "Le détecteur ABD identifie les bulles, les gouttes et les états gaz/liquide dans les tubes transparents. Sa détection infrarouge sans contact distingue le gaz du liquide grâce à leur réponse optique différente. Le module n’entre pas en contact avec le fluide, évitant ainsi une contamination et une résistance à l’écoulement supplémentaires.",
      "Il est destiné à la surveillance des circuits des équipements IVD, des sciences de la vie, de l’automatisation de laboratoire, du contrôle environnemental et de l’analyse alimentaire. Il permet les alarmes de bulles, la détection de gouttes, l’identification de l’état des lignes de réactifs et la protection des équipements en cas d’anomalie. Les configurations couvrent les diamètres extérieurs courants de tubes transparents de 1.6 mm à 6.4 mm ; choisissez celle qui correspond au diamètre extérieur réel du tube.",
    ],
    applications: ["Alarmes de bulles", "Détection de gouttes", "Surveillance de l’état des tubes transparents", "Identification de l’état des lignes de réactifs", "Protection contre les anomalies du circuit fluidique", "Surveillance des tubes d’instruments automatisés"],
    highlights: ["Détection de bulles / gouttes sans contact", "Pour tubes transparents de DE 1.6–6.4 mm", "Interface TTL / protocole Modbus RTU", "Signal numérique UART/TTL, sortie analogique en tension IO et sortie d’alarme numérique IO", "Largeur détectable de bulle / liquide > 0.8 mm", "Temps de réponse en détection de bulles : 6 ms", "Temps de réponse en détection de liquide : 6 ms"],
    labels: ["Type de produit", "Méthode de détection", "Éléments détectés", "DE de tube compatible", "Matériaux de tube compatibles", "Fluides détectés", "Largeur détectable", "Interface de communication", "Protocole de communication", "Sorties", "Tension de fonctionnement", "Courant de fonctionnement", "Temps de réponse", "Température de fonctionnement", "Température de stockage", "Dimensions", "Masse"],
    values: { "气泡检测模块": "Détecteur de bulles d’air", "非接触式红外检测": "Détection infrarouge sans contact", "气泡 / 液滴 / 气液状态": "Bulles / gouttes / états gaz-liquide", "PU / PVC / PTFE / PFA / FEP 透明管": "Tubes transparents en PU / PVC / PTFE / PFA / FEP", "Liquid / Gas": "Liquide / gaz", "> 0.8 mm 宽度": "Largeur > 0.8 mm", "UART/TTL 数字信号、IO 模拟电压 0–5V、IO 数字报警信号": "Signal numérique UART/TTL ; tension analogique IO de 0–5V ; signal d’alarme numérique IO", "气泡检测 6 ms；液体检测 6 ms": "Détection de bulles : 6 ms ; détection de liquide : 6 ms" },
    faqs: [
      { question: "Le détecteur de bulles ABD entre-t-il en contact avec le liquide ?", answer: "Il n’entre pas en contact direct avec le liquide. Le module se fixe sur le tube transparent pour effectuer la détection, ce qui réduit les risques de contamination du circuit et de résistance à l’écoulement supplémentaire." },
      { question: "Quels diamètres de tube ABD peut-il surveiller ?", answer: "Les configurations standard couvrent les diamètres extérieurs de tubes transparents de 1.6, 2.0, 2.5, 3.2, 4.0, 4.8, 6.0 et 6.4 mm." },
      { question: "ABD prend-il en charge Modbus RTU ?", answer: "Oui. Le module utilise une interface électrique TTL et prend en charge le protocole de communication Modbus RTU." },
      { question: "ABD peut-il détecter de très petites microbulles ?", answer: "Vérifiez la taille réelle des bulles. La largeur détectable spécifiée de la bulle ou du liquide est > 0.8 mm ; les bulles ou colonnes de liquide plus petites peuvent ne pas être détectées de manière fiable." },
    ],
  },
  ko: {
    name: "ABD 기포 감지 모듈",
    intro: [
      "ABD 기포 감지 모듈은 투명 튜브 안의 기포, 액적 및 기체·액체 상태를 감지합니다. 기체와 액체의 적외선 응답 차이를 이용하는 비접촉 방식으로 유로 상태를 판별합니다. 유체에 직접 접촉하지 않아 추가 오염과 유동 저항을 방지합니다.",
      "IVD, 생명과학, 실험실 자동화, 환경 모니터링 및 식품 분석 장비의 유로 상태 감시에 사용됩니다. 기포 경보, 액적 식별, 시약 라인 상태 판별 및 장비 이상 보호에 적용할 수 있습니다. 일반적인 투명 튜브 외경 1.6 mm부터 6.4 mm까지 지원하며 실제 튜브 외경에 맞는 구성을 선택해야 합니다.",
    ],
    applications: ["기포 경보", "액적 감지", "투명 튜브 상태 감시", "시약 라인 상태 판별", "유로 이상 보호", "자동화 기기 튜브 모니터링"],
    highlights: ["비접촉 기포 / 액적 감지", "투명 튜브 외경 1.6–6.4 mm 지원", "TTL 인터페이스 / Modbus RTU 프로토콜", "UART/TTL 디지털 신호, IO 아날로그 전압 출력 및 IO 디지털 경보 출력", "감지 가능한 기포 / 액체 폭 > 0.8 mm", "기포 감지 응답 시간: 6 ms", "액체 감지 응답 시간: 6 ms"],
    labels: ["제품 유형", "감지 방식", "감지 대상", "적용 튜브 외경", "적용 튜브 재질", "감지 매체", "감지 가능한 폭", "통신 인터페이스", "통신 프로토콜", "출력 방식", "사용 전압", "사용 전류", "응답 시간", "사용 온도", "보관 온도", "외형 치수", "무게"],
    values: { "气泡检测模块": "기포 감지 모듈", "非接触式红外检测": "비접촉 적외선 감지", "气泡 / 液滴 / 气液状态": "기포 / 액적 / 기체·액체 상태", "PU / PVC / PTFE / PFA / FEP 透明管": "PU / PVC / PTFE / PFA / FEP 투명 튜브", "Liquid / Gas": "액체 / 기체", "> 0.8 mm 宽度": "폭 > 0.8 mm", "UART/TTL 数字信号、IO 模拟电压 0–5V、IO 数字报警信号": "UART/TTL 디지털 신호, IO 아날로그 전압 0–5V, IO 디지털 경보 신호", "气泡检测 6 ms；液体检测 6 ms": "기포 감지 6 ms, 액체 감지 6 ms" },
    faqs: [
      { question: "ABD 기포 감지 모듈은 액체와 접촉합니까?", answer: "액체와 직접 접촉하지 않습니다. 투명 튜브를 외부에서 감지하므로 유로 오염 위험과 추가 유동 저항을 줄일 수 있습니다." },
      { question: "ABD가 지원하는 튜브 직경은 얼마입니까?", answer: "표준 구성은 외경 1.6, 2.0, 2.5, 3.2, 4.0, 4.8, 6.0 및 6.4 mm의 투명 튜브를 지원합니다." },
      { question: "ABD는 Modbus RTU를 지원합니까?", answer: "지원합니다. 모듈은 TTL 전기 인터페이스를 사용하며 Modbus RTU 통신 프로토콜을 지원합니다." },
      { question: "ABD로 매우 작은 미세 기포도 감지할 수 있습니까?", answer: "실제 기포 크기를 확인해야 합니다. 사양에 명시된 감지 가능한 기포 또는 액체의 폭은 > 0.8 mm이며, 이보다 작은 기포나 액주는 안정적으로 식별되지 않을 수 있습니다." },
    ],
  },
  ru: {
    name: "Датчик пузырьков воздуха ABD",
    intro: [
      "Датчик ABD обнаруживает пузырьки, капли и состояния газ/жидкость в прозрачных трубках. Бесконтактный инфракрасный метод различает газ и жидкость по разнице их оптического отклика. Модуль не соприкасается с рабочей средой, поэтому не вносит дополнительного загрязнения и сопротивления потоку.",
      "Предназначен для контроля жидкостных линий в оборудовании IVD, биологических исследований, лабораторной автоматизации, экологического мониторинга и анализа пищевых продуктов. Применяется для сигнализации о пузырьках, обнаружения капель, определения состояния линий реагентов и защиты оборудования при неисправностях. Конфигурации охватывают распространённые наружные диаметры прозрачных трубок от 1.6 mm до 6.4 mm; выбирайте исполнение по фактическому наружному диаметру трубки.",
    ],
    applications: ["Сигнализация о пузырьках", "Обнаружение капель", "Контроль состояния прозрачных трубок", "Определение состояния линий реагентов", "Защита при неисправностях жидкостного тракта", "Контроль трубок автоматизированных приборов"],
    highlights: ["Бесконтактное обнаружение пузырьков / капель", "Для прозрачных трубок с наружным диаметром 1.6–6.4 mm", "Интерфейс TTL / протокол Modbus RTU", "Цифровой сигнал UART/TTL, аналоговый выход напряжения IO и цифровой аварийный выход IO", "Обнаруживаемая ширина пузырька / жидкости > 0.8 mm", "Время отклика при обнаружении пузырьков: 6 ms", "Время отклика при обнаружении жидкости: 6 ms"],
    labels: ["Тип изделия", "Метод обнаружения", "Обнаруживаемые объекты", "Совместимый наружный диаметр трубки", "Совместимые материалы трубок", "Обнаруживаемые среды", "Обнаруживаемая ширина", "Интерфейс связи", "Протокол связи", "Выходы", "Рабочее напряжение", "Рабочий ток", "Время отклика", "Рабочая температура", "Температура хранения", "Габариты", "Масса"],
    values: { "气泡检测模块": "Датчик пузырьков воздуха", "非接触式红外检测": "Бесконтактное инфракрасное обнаружение", "气泡 / 液滴 / 气液状态": "Пузырьки / капли / состояния газ-жидкость", "PU / PVC / PTFE / PFA / FEP 透明管": "Прозрачные трубки из PU / PVC / PTFE / PFA / FEP", "Liquid / Gas": "Жидкость / газ", "> 0.8 mm 宽度": "Ширина > 0.8 mm", "UART/TTL 数字信号、IO 模拟电压 0–5V、IO 数字报警信号": "Цифровой сигнал UART/TTL; аналоговое напряжение IO 0–5V; цифровой аварийный сигнал IO", "气泡检测 6 ms；液体检测 6 ms": "Обнаружение пузырьков: 6 ms; обнаружение жидкости: 6 ms" },
    faqs: [
      { question: "Соприкасается ли датчик пузырьков ABD с жидкостью?", answer: "Прямого контакта с жидкостью нет. Модуль устанавливается на прозрачную трубку и обнаруживает среду через её стенку, снижая риск загрязнения тракта и дополнительного сопротивления потоку." },
      { question: "Какие диаметры трубок поддерживает ABD?", answer: "Стандартные конфигурации рассчитаны на прозрачные трубки с наружным диаметром 1.6, 2.0, 2.5, 3.2, 4.0, 4.8, 6.0 и 6.4 mm." },
      { question: "Поддерживает ли ABD протокол Modbus RTU?", answer: "Да. Модуль использует электрический интерфейс TTL и поддерживает протокол связи Modbus RTU." },
      { question: "Может ли ABD обнаруживать очень мелкие микропузырьки?", answer: "Необходимо учитывать фактический размер пузырьков. Указанная обнаруживаемая ширина пузырька или жидкости составляет > 0.8 mm; более мелкие пузырьки или столбики жидкости могут определяться нестабильно." },
    ],
  },
};

const chinese = controlModuleDetails.find(detail => detail.slug === "abd-air-bubble-detector")!;
export function getAbdLocaleCopy(locale: string) {
  if (!Object.hasOwn(copies, locale)) return undefined;
  const copy = copies[locale as AbdLocale];
  return { ...copy, description: copy.intro[0], specs: chinese.specs.map((item, index) => ({
    label: copy.labels[index], value: copy.values[item.value] ?? item.value,
  })) };
}

export function applyAbdLocaleCopy<T extends Record<string, unknown>>(source: T, localized: T, locale: string): T {
  if (source.slug !== chinese.slug) return localized;
  const copy = getAbdLocaleCopy(locale);
  if (!copy) return localized;
  return {
    ...localized, title: copy.name, name: copy.name, model: copy.name,
    foreachModel: copy.name, modelDisplay: copy.name, displayModel: copy.name,
    ...(locale === "it" || locale === "hi" ? { model: "ABD", foreachModel: "ABD", modelDisplay: "ABD", displayModel: "ABD" } : {}),
    description: copy.intro.join("\n\n"), abdIntroductionParagraphs: copy.intro,
    specs: copy.specs, specifications: copy.specs, advantages: copy.highlights,
    commonApplications: copy.applications, faqs: copy.faqs, faq: copy.faqs,
    mainImageAlt: copy.name, imageAlt: copy.name,
    seo: { title: `${copy.name} | FOREACH`, description: copy.description },
  };
}
