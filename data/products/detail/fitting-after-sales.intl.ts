import { contactZhData } from "@/data/contact-cooperation/contact.zh";
import { contactDeData } from "@/data/contact-cooperation/contact.de";
import { getContactIntlData } from "@/data/contact-cooperation/contact.intl";
import { contactHiData } from "@/data/contact-cooperation/contact.hi";
import { contactItData } from "@/data/contact-cooperation/contact.it";
import type { ContactPageData } from "@/data/contact-cooperation";
import { fittingLocale, type FittingLocale } from "./fitting-ui.intl";

type AfterSalesText = {
  title: string; description: string; panelTitle: string; submitButton: string;
  modelLabel: string; modelPlaceholder: string; messageLabel: string; messagePlaceholder: string;
  successDescription: string; closeButton: string; guideTitle: string; guideDescription: string;
  guideItems: readonly { title: string; description: string }[]; guideNote: string;
};

/** Translate the current Chinese after-sales copy; retain the shared form contract. */
export const FITTING_AFTER_SALES_TEXT: Record<FittingLocale, AfterSalesText> = {
  zh: {
    title: "在线售后反馈",
    description: "请留下联系方式并说明问题，我们会在工作时间内回复，并协助对接相应售后人员。",
    panelTitle: "售后反馈表单",
    submitButton: "提交售后反馈",
    modelLabel: "产品型号", modelPlaceholder: "请输入产品型号",
    messageLabel: "问题描述", messagePlaceholder: "请简单描述您遇到的问题，也可上传现场照片或相关文件。",
    successDescription: "您的售后反馈已提交，我们会在工作时间内与您联系。", closeButton: "返回表单",
    guideTitle: "售后填写说明",
    guideDescription: "如方便，请在问题描述或附件中补充以下信息，便于我们更快了解情况、减少往返确认。",
    guideItems: [
      { title: "产品与批次", description: "核对已带入的产品型号；如方便，可补充批次号、订单号或收货标签照片。" },
      { title: "问题现象", description: "说明哪里出现异常，例如渗漏、松动、堵塞或连接异常，以及偶发还是持续发生。" },
      { title: "使用条件", description: "尽量补充介质、压力或真空、温度，以及管路规格和配套零件型号。" },
      { title: "发生过程与已做检查", description: "是首次安装时出现，还是使用一段时间后出现？可补充与启停、换管、清洗等操作的关系，以及已做过的检查。" },
      { title: "照片与附件", description: "可上传产品整体、接口、异常部位和标签照片；已有测试记录或图纸也可一并提供。" },
    ],
    guideNote: "先描述主要现象即可，其他信息可在后续沟通时补充。",
  },
  en: {
    title: "Online after-sales feedback",
    description: "Leave your contact details and describe the issue. We will respond during working hours and connect you with the appropriate support staff.",
    panelTitle: "After-sales feedback form", submitButton: "Submit after-sales feedback",
    modelLabel: "Product model", modelPlaceholder: "Enter the product model",
    messageLabel: "Issue description", messagePlaceholder: "Briefly describe the issue. You can also attach site photos or relevant documents.",
    successDescription: "Your after-sales feedback has been submitted. We will contact you during working hours.", closeButton: "Return to form",
    guideTitle: "After-sales form guidance",
    guideDescription: "If available, add the details below to your description or attachments so we can understand the issue more quickly and reduce follow-up questions.",
    guideItems: [
      { title: "Product and batch", description: "Check the prefilled product model. If available, add the batch number, order number or a photo of the delivery label." },
      { title: "Symptoms", description: "Explain where the problem occurs, such as leakage, loosening, blockage or connection issues, and whether it is intermittent or continuous." },
      { title: "Operating conditions", description: "If available, include the fluid, pressure or vacuum, temperature, tubing specifications and mating part models." },
      { title: "When it happens and checks made", description: "Did it occur during the first installation or after a period of use? Describe any link to start/stop cycles, tubing changes or cleaning, and checks already performed." },
      { title: "Photos and attachments", description: "You can attach photos of the complete product, ports, affected area and label, along with any existing test records or drawings." },
    ],
    guideNote: "Start with the main symptoms; other details can be added during follow-up.",
  },
  es: {
    title: "Consulta posventa en línea",
    description: "Deje sus datos de contacto y describa el problema. Responderemos en horario laboral y le pondremos en contacto con el personal de posventa correspondiente.",
    panelTitle: "Formulario de consulta posventa", submitButton: "Enviar consulta posventa",
    modelLabel: "Modelo del producto", modelPlaceholder: "Introduzca el modelo del producto",
    messageLabel: "Descripción del problema", messagePlaceholder: "Describa brevemente el problema. También puede adjuntar fotos de la instalación o documentos relacionados.",
    successDescription: "Su consulta posventa se ha enviado. Nos pondremos en contacto con usted en horario laboral.", closeButton: "Volver al formulario",
    guideTitle: "Cómo completar la consulta posventa",
    guideDescription: "Si dispone de ellos, incluya los siguientes datos en la descripción o los archivos adjuntos para ayudarnos a comprender el problema y reducir las consultas posteriores.",
    guideItems: [
      { title: "Producto y lote", description: "Compruebe el modelo del producto que ya figura en el formulario. Si dispone de ellos, añada el número de lote, el número de pedido o una foto de la etiqueta de entrega." },
      { title: "Síntomas", description: "Indique dónde se produce la anomalía, por ejemplo fugas, aflojamiento, obstrucciones o problemas de conexión, y si ocurre de forma intermitente o continua." },
      { title: "Condiciones de uso", description: "Si es posible, indique el fluido, la presión o el vacío, la temperatura, las especificaciones de los tubos y los modelos de las piezas conectadas." },
      { title: "Cuándo ocurre y comprobaciones realizadas", description: "¿Se presentó durante la primera instalación o después de un tiempo de uso? Describa si está relacionado con arranques o paradas, cambios de tubos o limpieza, y las comprobaciones ya realizadas." },
      { title: "Fotos y archivos adjuntos", description: "Puede adjuntar fotos del producto completo, las conexiones, la zona afectada y la etiqueta, así como registros de pruebas o planos que ya tenga." },
    ],
    guideNote: "Empiece por describir los síntomas principales; el resto de la información puede añadirse durante el seguimiento.",
  },
  fr: {
    title: "Demande de SAV en ligne",
    description: "Laissez vos coordonnées et décrivez le problème. Nous vous répondrons pendant nos heures de travail et vous orienterons vers le personnel compétent.",
    panelTitle: "Formulaire de demande de SAV", submitButton: "Envoyer la demande de SAV",
    modelLabel: "Modèle du produit", modelPlaceholder: "Saisissez le modèle du produit",
    messageLabel: "Description du problème", messagePlaceholder: "Décrivez brièvement le problème. Vous pouvez également joindre des photos de l’installation ou des documents utiles.",
    successDescription: "Votre demande de SAV a été envoyée. Nous vous contacterons pendant nos heures de travail.", closeButton: "Revenir au formulaire",
    guideTitle: "Comment remplir la demande de SAV",
    guideDescription: "Si vous en disposez, ajoutez les informations ci-dessous à votre description ou aux pièces jointes pour nous aider à comprendre le problème et limiter les échanges complémentaires.",
    guideItems: [
      { title: "Produit et lot", description: "Vérifiez le modèle du produit prérempli. Si possible, ajoutez le numéro de lot, le numéro de commande ou une photo de l’étiquette de livraison." },
      { title: "Symptômes", description: "Précisez où apparaît l’anomalie, par exemple une fuite, un desserrage, une obstruction ou un problème de raccordement, et si elle est intermittente ou permanente." },
      { title: "Conditions d’utilisation", description: "Si possible, indiquez le fluide, la pression ou le niveau de vide, la température, les caractéristiques des tubes et les modèles des pièces raccordées." },
      { title: "Apparition du problème et vérifications effectuées", description: "Le problème est-il apparu à la première installation ou après une période d’utilisation ? Précisez tout lien avec les démarrages et arrêts, les changements de tubes ou le nettoyage, ainsi que les vérifications déjà effectuées." },
      { title: "Photos et pièces jointes", description: "Vous pouvez joindre des photos du produit complet, des raccordements, de la zone concernée et de l’étiquette, ainsi que les relevés d’essai ou plans déjà disponibles." },
    ],
    guideNote: "Commencez par décrire les principaux symptômes ; les autres informations pourront être ajoutées lors du suivi.",
  },
  ko: {
    title: "온라인 사후 지원 문의",
    description: "연락처와 문제 내용을 남겨 주세요. 근무시간에 답변하고 해당 사후 지원 담당자와 연결해 드립니다.",
    panelTitle: "사후 지원 문의 양식", submitButton: "사후 지원 문의 제출",
    modelLabel: "제품 모델", modelPlaceholder: "제품 모델을 입력하세요",
    messageLabel: "문제 설명", messagePlaceholder: "겪고 계신 문제를 간단히 설명해 주세요. 현장 사진이나 관련 파일을 첨부하셔도 됩니다.",
    successDescription: "사후 지원 문의가 제출되었습니다. 근무시간에 연락드리겠습니다.", closeButton: "양식으로 돌아가기",
    guideTitle: "사후 지원 문의 작성 안내",
    guideDescription: "가능한 경우 아래 정보를 문제 설명이나 첨부 파일에 함께 제공해 주세요. 상황을 더 빨리 파악하고 추가 확인을 줄이는 데 도움이 됩니다.",
    guideItems: [
      { title: "제품 및 로트", description: "자동 입력된 제품 모델을 확인해 주세요. 가능한 경우 로트 번호, 주문 번호 또는 수령 라벨 사진을 추가해 주세요." },
      { title: "문제 증상", description: "누출, 연결부 풀림, 막힘 또는 연결 이상 등 문제가 발생한 부위와 증상이 간헐적인지 지속적인지 알려 주세요." },
      { title: "사용 조건", description: "가능한 경우 유체, 압력 또는 진공, 온도, 배관 규격 및 연결된 부품 모델을 알려 주세요." },
      { title: "발생 과정 및 확인 사항", description: "최초 설치 시 발생했는지, 일정 기간 사용한 뒤 발생했는지 알려 주세요. 기동·정지, 튜브 교체, 세척과의 관련성 및 이미 확인한 사항도 설명해 주세요." },
      { title: "사진 및 첨부 파일", description: "제품 전체, 연결부, 이상 부위 및 라벨 사진을 첨부할 수 있습니다. 기존 시험 기록이나 도면이 있다면 함께 제공해 주세요." },
    ],
    guideNote: "주요 증상부터 설명해 주세요. 나머지 정보는 후속 상담에서 추가하셔도 됩니다.",
  },
  ru: {
    title: "Обращение в послепродажную поддержку",
    description: "Оставьте контактные данные и опишите проблему. Мы ответим в рабочее время и поможем связаться с нужным специалистом поддержки.",
    panelTitle: "Форма обращения в поддержку", submitButton: "Отправить обращение",
    modelLabel: "Модель изделия", modelPlaceholder: "Укажите модель изделия",
    messageLabel: "Описание проблемы", messagePlaceholder: "Кратко опишите возникшую проблему. Можно приложить фотографии установки или относящиеся к ней документы.",
    successDescription: "Ваше обращение в поддержку отправлено. Мы свяжемся с вами в рабочее время.", closeButton: "Вернуться к форме",
    guideTitle: "Информация для обращения",
    guideDescription: "По возможности добавьте указанные ниже сведения в описание или приложения. Это поможет быстрее разобраться в ситуации и сократить дополнительные уточнения.",
    guideItems: [
      { title: "Изделие и партия", description: "Проверьте автоматически подставленную модель изделия. По возможности добавьте номер партии, номер заказа или фотографию этикетки поставки." },
      { title: "Проявления проблемы", description: "Укажите место и характер неисправности, например утечку, ослабление соединения, засорение или проблемы с подключением, а также возникает ли она периодически или постоянно." },
      { title: "Условия эксплуатации", description: "По возможности укажите рабочую среду, давление или вакуум, температуру, параметры трубок и модели сопрягаемых деталей." },
      { title: "Когда возникла проблема и что уже проверено", description: "Проблема появилась при первой установке или после некоторого времени работы? Укажите связь с пусками и остановками, заменой трубок или очисткой, а также уже выполненные проверки." },
      { title: "Фотографии и приложения", description: "Можно приложить фотографии изделия целиком, соединений, проблемного участка и этикетки, а также имеющиеся записи испытаний или чертежи." },
    ],
    guideNote: "Начните с основных проявлений проблемы; остальные сведения можно добавить при дальнейшем общении.",
  },
};

const requestIndex = contactZhData.form.requestTypes.indexOf("售后与质量反馈");
const stageIndex = contactZhData.form.projectStages.indexOf("售后反馈");
const groupIndex = contactZhData.form.productGroups.findIndex(group => group.options.includes("管路 / 接头 / 采样针"));
const productIndex = contactZhData.form.productGroups[groupIndex].options.indexOf("管路 / 接头 / 采样针");

const germanAfterSalesText: AfterSalesText = {
  title: "Online-Anfrage an den Kundendienst",
  description: "Hinterlassen Sie Ihre Kontaktdaten und beschreiben Sie das Problem. Wir antworten während unserer Arbeitszeiten und leiten Ihre Anfrage an die zuständige Stelle weiter.",
  panelTitle: "Kundendienstformular",
  submitButton: "Kundendienstanfrage senden",
  modelLabel: "Produktmodell",
  modelPlaceholder: "Produktmodell eingeben",
  messageLabel: "Beschreibung des Problems",
  messagePlaceholder: "Beschreiben Sie das Problem kurz. Sie können auch Fotos vom Einsatzort oder Unterlagen anhängen.",
  successDescription: "Ihre Anfrage wurde übermittelt. Wir kontaktieren Sie während unserer Arbeitszeiten.",
  closeButton: "Zum Formular zurück",
  guideTitle: "Hinweise zur Kundendienstanfrage",
  guideDescription: "Ergänzen Sie nach Möglichkeit die folgenden Angaben in Ihrer Beschreibung oder den Anhängen. Dadurch können wir das Problem schneller einordnen und Rückfragen reduzieren.",
  guideItems: [
    { title: "Produkt und Charge", description: "Prüfen Sie das vorausgefüllte Modell. Ergänzen Sie nach Möglichkeit die Chargennummer, die Bestellnummer oder ein Foto des Lieferetiketts." },
    { title: "Fehlerbild", description: "Beschreiben Sie, wo das Problem auftritt, etwa eine Undichtigkeit, eine lockere Verbindung, eine Verstopfung oder ein Anschlussproblem. Geben Sie an, ob es sporadisch oder dauerhaft auftritt." },
    { title: "Betriebsbedingungen", description: "Nennen Sie nach Möglichkeit das Medium, den Druck oder das Vakuum, die Temperatur, die Leitungsdaten und die Modelle der verbundenen Bauteile." },
    { title: "Zeitpunkt und bisherige Prüfungen", description: "Trat das Problem bei der ersten Montage oder erst nach einiger Betriebszeit auf? Beschreiben Sie einen möglichen Zusammenhang mit Starts und Stopps, Schlauchwechseln oder Reinigung und nennen Sie bereits durchgeführte Prüfungen." },
    { title: "Fotos und Anhänge", description: "Sie können Fotos des gesamten Produkts, der Anschlüsse, der betroffenen Stelle und des Etiketts sowie vorhandene Prüfprotokolle oder Zeichnungen anhängen." },
  ],
  guideNote: "Beschreiben Sie zunächst das wichtigste Fehlerbild. Weitere Angaben können Sie im weiteren Austausch ergänzen.",
};

const italianAfterSalesText = {
  title: "Assistenza post-vendita online",
  description: "Lasciate i vostri recapiti e descrivete il problema. Risponderemo durante l'orario di lavoro e vi metteremo in contatto con il personale di assistenza competente.",
  panelTitle: "Modulo di assistenza post-vendita", submitButton: "Invia richiesta di assistenza",
  modelLabel: "Modello del prodotto", modelPlaceholder: "Inserisci il modello del prodotto",
  messageLabel: "Descrizione del problema", messagePlaceholder: "Descrivi brevemente il problema. Puoi anche allegare foto dell'installazione o documenti pertinenti.",
  successDescription: "La richiesta di assistenza è stata inviata. Vi contatteremo durante l'orario di lavoro.", closeButton: "Torna al modulo",
  guideTitle: "Come compilare la richiesta di assistenza",
  guideDescription: "Se disponibili, aggiungete alla descrizione o agli allegati i dati seguenti. Ci aiuteranno a capire più rapidamente il problema e a ridurre le richieste di chiarimento.",
  guideItems: [
    { title: "Prodotto e lotto", description: "Controllate il modello già inserito. Se disponibili, aggiungete il numero di lotto, il numero d'ordine o una foto dell'etichetta di consegna." },
    { title: "Sintomi", description: "Indicate dove si verifica il problema, per esempio perdite, allentamenti, ostruzioni o difficoltà di collegamento, e se si presenta in modo intermittente o continuo." },
    { title: "Condizioni operative", description: "Se disponibili, indicate il fluido, la pressione o il vuoto, la temperatura, le specifiche dei tubi e i modelli dei componenti collegati." },
    { title: "Comparsa del problema e verifiche eseguite", description: "È comparso durante il primo montaggio o dopo un periodo di utilizzo? Descrivete eventuali legami con avvii e arresti, cambi di tubi o pulizie e indicate le verifiche già eseguite." },
    { title: "Foto e allegati", description: "Potete allegare foto del prodotto completo, degli attacchi, della zona interessata e dell'etichetta, oltre a registrazioni di prova o disegni disponibili." },
  ],
  guideNote: "Iniziate dai sintomi principali. Potrete aggiungere gli altri dettagli durante il seguito della richiesta.",
};

const hindiAfterSalesText: AfterSalesText = {
  title: "बिक्री के बाद ऑनलाइन सहायता",
  description: "अपना संपर्क विवरण दें और समस्या बताएँ। हम कार्य समय में जवाब देंगे और आपको सही सहायता टीम से जोड़ेंगे।",
  panelTitle: "बिक्री के बाद सहायता का फ़ॉर्म", submitButton: "सहायता अनुरोध भेजें",
  modelLabel: "उत्पाद मॉडल", modelPlaceholder: "उत्पाद मॉडल डालें",
  messageLabel: "समस्या का विवरण", messagePlaceholder: "समस्या संक्षेप में बताएँ। साइट की फ़ोटो या संबंधित दस्तावेज़ जोड़ सकते हैं।",
  successDescription: "आपका सहायता अनुरोध भेज दिया गया है। हम कार्य समय में संपर्क करेंगे।", closeButton: "फ़ॉर्म पर लौटें",
  guideTitle: "सहायता फ़ॉर्म कैसे भरें",
  guideDescription: "अगर जानकारी उपलब्ध है, तो उसे विवरण या अटैचमेंट में जोड़ें। इससे हमें समस्या समझने और कम सवाल पूछने में मदद मिलेगी।",
  guideItems: [
    { title: "उत्पाद और बैच", description: "पहले से भरा मॉडल जाँचें। अगर उपलब्ध हो तो बैच नंबर, ऑर्डर नंबर या डिलीवरी लेबल की फ़ोटो जोड़ें।" },
    { title: "लक्षण", description: "बताएँ समस्या कहाँ है, जैसे रिसाव, ढीलापन, रुकावट या कनेक्शन की दिक्कत। यह भी बताएँ कि समस्या बीच-बीच में होती है या लगातार।" },
    { title: "कार्य स्थितियाँ", description: "अगर उपलब्ध हों तो द्रव, दाब या वैक्यूम, तापमान, ट्यूब के विनिर्देश और मेल खाने वाले घटकों के मॉडल बताएँ।" },
    { title: "समस्या का समय और जाँच", description: "क्या समस्या पहली बार लगाते समय आई या कुछ समय इस्तेमाल के बाद? स्टार्ट-स्टॉप, ट्यूब बदलने या सफ़ाई से संबंध और पहले की जाँच बताएँ।" },
    { title: "फ़ोटो और अटैचमेंट", description: "पूरे उत्पाद, पोर्ट, प्रभावित जगह और लेबल की फ़ोटो के साथ परीक्षण रिकॉर्ड या ड्रॉइंग जोड़ सकते हैं।" },
  ],
  guideNote: "मुख्य लक्षणों से शुरू करें। बाकी जानकारी बाद में जोड़ सकते हैं।",
};

const localizedAfterSales = {
  de: { source: contactDeData, text: germanAfterSalesText },
  it: { source: contactItData, text: italianAfterSalesText },
  hi: { source: contactHiData, text: hindiAfterSalesText },
};

export function getFittingAfterSalesFormConfig(localeValue: string, productModel: string) {
  const locale = fittingLocale(localeValue);
  const localized = localeValue === "de" || localeValue === "it" || localeValue === "hi" ? localizedAfterSales[localeValue] : undefined;
  const source = localized?.source ?? (locale === "zh" ? contactZhData : getContactIntlData(locale));
  const text = localized?.text ?? FITTING_AFTER_SALES_TEXT[locale];
  const data: ContactPageData = {
    ...source,
    form: {
      ...source.form,
      title: text.title, description: text.description, panelTitle: text.panelTitle, submitButton: text.submitButton,
      fields: {
        ...source.form.fields,
        targetModel: { label: text.modelLabel, placeholder: text.modelPlaceholder },
        message: { label: text.messageLabel, placeholder: text.messagePlaceholder },
      },
      successModal: { ...source.form.successModal, description: text.successDescription, closeButton: text.closeButton },
    },
    guide: {
      ...source.guide,
      title: text.guideTitle, description: text.guideDescription,
      items: text.guideItems.map((item, index) => ({ number: String(index + 1).padStart(2, "0"), ...item })),
      note: text.guideNote,
    },
  };
  return {
    data,
    initialValues: {
      requestType: source.form.requestTypes[requestIndex],
      productType: source.form.productGroups[groupIndex].options[productIndex],
      targetModel: productModel,
      projectStage: source.form.projectStages[stageIndex],
    },
  };
}
