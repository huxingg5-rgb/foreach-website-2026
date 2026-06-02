/* =========================================================
   contact.intl.ts
   恒永达官网｜外语版联系我们页面数据

   文件路径：
   data/contact-cooperation/contact.intl.ts

   作用：
   1. 为 /en/contact、/es/contact、/fr/contact、/ko/contact、/ru/contact 提供外语联系我们页面数据
   2. 中文 /contact 继续使用 contact.zh.ts，不受影响
   3. 本文件以 contactZhData 为基础，保留图片、地图坐标、页面结构和样式所需字段
   4. 覆盖外语页面主要文案，避免外语页面继续显示中文
   5. 英文优先完整，其他语种先做可用翻译，后续可继续精修
========================================================= */

import { contactZhData } from "./contact.zh";
import type { ContactPageData } from "./types";

/* =========================================================
   外语联系我们页面支持的语言

   说明：
   1. 中文默认页面是 /contact
   2. 外语页面走 /[locale]/contact
========================================================= */

export const CONTACT_INTL_LOCALES = ["en", "es", "fr", "ko", "ru"] as const;

export type ContactIntlLocaleCode = (typeof CONTACT_INTL_LOCALES)[number];

/* =========================================================
   判断当前 locale 是否为外语联系我们页面支持语言
========================================================= */

export function isContactIntlLocale(
  locale: string,
): locale is ContactIntlLocaleCode {
  return CONTACT_INTL_LOCALES.includes(locale as ContactIntlLocaleCode);
}

/* =========================================================
   外语页面文案类型

   说明：
   这个类型只管理需要覆盖的文案。
   页面结构、图片、地图坐标等仍然沿用 contact.zh.ts。
========================================================= */

type ContactIntlText = {
  seoTitle: string;
  seoDescription: string;

  heroTitlePrefix: string;
  heroHighlightText: string;
  heroTitleSuffix: string;
  heroImageAlt: string;
  heroSupportButton: string;
  heroFormButton: string;

  supportTitle: string;
  supportDescription: string;
  supportItems: Array<{
    title: string;
    description: string;
    requestType: string;
  }>;

  formTitle: string;
  formDescription: string;
  formPanelTitle: string;
  fileTip: string;
  submitButton: string;
  uploadButton: string;

  emailLabel: string;
  emailPlaceholder: string;
  emailSendButton: string;
  emailCodePlaceholder: string;
  emailVerifyButton: string;
  emailTip: string;
  emailCodeSentTip: string;
  emailInvalidCodeTip: string;
  emailVerifiedTip: string;

  nameLabel: string;
  namePlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  targetModelLabel: string;
  targetModelPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;

  requestTypeLabel: string;
  productTypeLabel: string;
  projectStageLabel: string;

  productTypePlaceholder: string;
  projectStagePlaceholder: string;

  removeFile: string;
  emailVerifiedButton: string;
  resendCountdownSuffix: string;
  retryCountdownSuffix: string;

  emailRequiredAlert: string;
  invalidEmailAlert: string;
  sendCodeFirstAlert: string;
  codeRequiredAlert: string;
  verifyEmailFirstAlert: string;
  popupBlockedAlert: string;
  fileTooLargePrefix: string;
  fileTooLargeSuffix: string;

  mapLoading: string;
  mapError: string;
  openMap: string;

  successTitle: string;
  successDescription: string;
  successPdfTip: string;
  successCloseButton: string;

  pdfDocumentTitle: string;
  pdfDocumentSubtitle: string;
  pdfRequestNumber: string;
  pdfCreatedAt: string;
  pdfSource: string;
  pdfSourceValue: string;
  pdfCustomerInfo: string;
  pdfRequirementInfo: string;
  pdfRequirementDescription: string;
  pdfAttachmentList: string;
  pdfNotFilled: string;
  pdfNotSelected: string;
  pdfNoAttachment: string;
  pdfIndex: string;
  pdfAttachmentName: string;
  pdfAttachmentType: string;
  pdfAttachmentSize: string;
  pdfFooterNote: string;
  pdfPrintTip: string;

  requestTypes: string[];

  productGroups: Array<{
    groupName: string;
    options: string[];
  }>;

  projectStages: string[];

  guideTitle: string;
  guideDescription: string;
  guideItems: Array<{
    title: string;
    description: string;
  }>;
  guideNote: string;

  contactInfoTitle: string;
  contactInfoDescription: string;
  companyName: string;
  companyPosition: string;
  contactRows: Array<{
    label: string;
    value: string;
  }>;
  mapTitle: string;
  mapAddress: string;

  bottomCtaTitle: string;
  bottomCtaDescription: string;
  bottomCtaFormButton: string;
  bottomCtaContactButton: string;
};

/* =========================================================
   英文基础文案

   说明：
   其他语种会在此基础上覆盖主要字段。
   如果某个小字段暂时没有精修翻译，至少会显示英文，不会显示中文。
========================================================= */

const enText: ContactIntlText = {
  seoTitle: "Contact Us | FOREACH",
  seoDescription:
    "Contact FOREACH for product selection, technical support, sample testing, drawing requests, BOM review, and microfluidic system project communication.",

  heroTitlePrefix: "Contact FOREACH for",
  heroHighlightText: "Product Selection",
  heroTitleSuffix: "and Technical Support",
  heroImageAlt:
    "FOREACH microfluidic product technical communication and cooperation support",
  heroSupportButton: "View Support",
  heroFormButton: "Submit Inquiry",

  supportTitle: "Support Options",
  supportDescription:
    "FOREACH provides communication support from early evaluation to project introduction, covering product selection, document requests, sample testing, solution discussion, customization, and after-sales feedback.",
  supportItems: [
    {
      title: "Product Selection Support",
      description:
        "Recommend suitable products based on flow rate, pressure, media, interface, lifetime, control method, and installation requirements.",
      requestType: "Technical & Selection Support",
    },
    {
      title: "Documents & Drawing Request",
      description:
        "Request datasheets, product catalogs, installation dimensions, interface information, and selection materials.",
      requestType: "Documents & Drawing Request",
    },
    {
      title: "Sample Testing Support",
      description:
        "Support sample verification, parameter confirmation, and application testing feedback to reduce early selection risks.",
      requestType: "Sample Testing Request",
    },
    {
      title: "Fluidic Solution Discussion",
      description:
        "Discuss the combination of pumps, valves, tubing, sensors, and other fluidic components.",
      requestType: "Technical & Selection Support",
    },
    {
      title: "Custom Requirement Discussion",
      description:
        "Communicate feasibility for special requirements such as structure, interface, materials, and control methods.",
      requestType: "Product Inquiry & Quotation",
    },
    {
      title: "After-sales Support",
      description:
        "Provide support for installation, operation, maintenance suggestions, issue feedback, and quality handling.",
      requestType: "After-sales & Quality Feedback",
    },
  ],

  formTitle: "Submit Inquiry",
  formDescription:
    "Please provide your application scenario, target product, key parameters, current project stage, and attachments so that we can evaluate your request and arrange follow-up quickly.",
  formPanelTitle: "Inquiry Submission Form",
  fileTip:
    "Supports drawings, PDF files, BOM, images, and other documents. Each file should not exceed 20 MB.",
  submitButton: "Submit Inquiry",
  uploadButton: "Upload Files",

  emailLabel: "Email",
  emailPlaceholder: "Please enter your email address",
  emailSendButton: "Send Code",
  emailCodePlaceholder: "Enter verification code",
  emailVerifyButton: "Verify",
  emailTip: "Email verification is required.",
  emailCodeSentTip: "Verification code sent. Test code: ",
  emailInvalidCodeTip: "Incorrect verification code. Test code: ",
  emailVerifiedTip: "Email verified.",

  nameLabel: "Name",
  namePlaceholder: "Please enter your name",
  companyLabel: "Company Name",
  companyPlaceholder: "Please enter your company name",
  phoneLabel: "Phone / WhatsApp",
  phonePlaceholder: "Optional, for faster communication",
  targetModelLabel: "Specific Model / Competitor Model",
  targetModelPlaceholder: "Model or competitor model to be replaced",
  messageLabel: "Requirement Description",
  messagePlaceholder:
    "Please describe your application scenario, target product, key parameters, or document request.",

  requestTypeLabel: "Request Type",
  productTypeLabel: "Target Product / Component Type",
  projectStageLabel: "Current Stage",

  productTypePlaceholder: "Please select the main product type",
  projectStagePlaceholder: "Please select the current stage",

  removeFile: "Remove",
  emailVerifiedButton: "Verified",
  resendCountdownSuffix: "s to resend",
  retryCountdownSuffix: "s to retry",

  emailRequiredAlert: "Please enter your email address first.",
  invalidEmailAlert: "Please enter a valid email address.",
  sendCodeFirstAlert: "Please send the email verification code first.",
  codeRequiredAlert: "Please enter the email verification code.",
  verifyEmailFirstAlert:
    "Please click Verify and complete email verification before submitting.",
  popupBlockedAlert:
    "The browser blocked the new window. Please allow pop-ups and submit again.",
  fileTooLargePrefix: "File “",
  fileTooLargeSuffix: "” exceeds 20 MB. Please choose another file.",

  mapLoading: "Loading map...",
  mapError:
    "The map is temporarily unavailable. Please check the map key, domain whitelist, or network status.",
  openMap: "Open Amap",

  successTitle: "Submitted Successfully",
  successDescription:
    "We have received your inquiry and will reply within 24 hours on working days.",
  successPdfTip:
    "If the PDF preview window has opened, you can save or print the request form according to the browser prompt.",
  successCloseButton: "Got it",

  pdfDocumentTitle: "Contact Request Form",
  pdfDocumentSubtitle: "Customer requirement information confirmation form.",
  pdfRequestNumber: "Request No.",
  pdfCreatedAt: "Created At",
  pdfSource: "Source",
  pdfSourceValue: "Website Contact Form",
  pdfCustomerInfo: "1. Customer Information",
  pdfRequirementInfo: "2. Requirement Information",
  pdfRequirementDescription: "3. Requirement Description",
  pdfAttachmentList: "4. Attachment List",
  pdfNotFilled: "Not filled",
  pdfNotSelected: "Not selected",
  pdfNoAttachment: "No attachment uploaded",
  pdfIndex: "No.",
  pdfAttachmentName: "Attachment Name",
  pdfAttachmentType: "Type",
  pdfAttachmentSize: "Size",
  pdfFooterNote:
    "This file is used for requirement communication, internal follow-up, and document archiving.",
  pdfPrintTip: "Can be saved as a PDF request form.",

  requestTypes: [
    "Product Inquiry & Quotation",
    "Documents & Drawing Request",
    "Technical & Selection Support",
    "Sample Testing Request",
    "After-sales & Quality Feedback",
    "Other Request",
  ],

  productGroups: [
    {
      groupName: "Pump Products",
      options: [
        "Diaphragm Pump",
        "Syringe Pump",
        "Pipetting Pump",
        "Ceramic Piston Pump",
      ],
    },
    {
      groupName: "Valve Products",
      options: [
        "Solenoid Valve",
        "Pinch Valve",
        "Rotary Valve",
        "High-pressure Valve",
      ],
    },
    {
      groupName: "Sensors & Fluidic Components",
      options: [
        "Pressure Sensor",
        "Bubble Detector",
        "Conductivity / TDS Module",
        "Tubing / Fittings / Sampling Probe",
      ],
    },
    {
      groupName: "Others",
      options: ["Not sure, need support", "Other product or custom requirement"],
    },
  ],

  projectStages: [
    "Selection Evaluation",
    "Sample Testing",
    "Project Development",
    "Mass Production Introduction",
    "Document Request",
    "After-sales Feedback",
    "Other Stage",
  ],

  guideTitle: "Filling Guide",
  guideDescription:
    "We recommend including the following information in your requirement description so that we can quickly evaluate the product direction and support method.",
  guideItems: [
    {
      title: "Application Scenario",
      description:
        "For example: IVD, life science, analytical instruments, laboratory automation, synthetic biology, etc.",
    },
    {
      title: "Target Product",
      description:
        "For example: diaphragm pump, syringe pump, pipetting pump, piston pump, solenoid valve, rotary valve, sensor, etc.",
    },
    {
      title: "Key Parameters",
      description:
        "Including media, flow rate, pressure, interface, dimensions, lifetime, control method, installation space, etc.",
    },
    {
      title: "Current Stage",
      description:
        "For example: selection evaluation, sample testing, project development, mass production introduction, document request, or after-sales feedback.",
    },
    {
      title: "Attachments",
      description:
        "If you have drawings, PDF specifications, BOM, site photos, or competitor model information, you can upload them together.",
    },
  ],
  guideNote:
    "If you do not have complete parameters yet, you can describe the equipment application and desired function first.",

  contactInfoTitle: "Contact Information",
  contactInfoDescription:
    "For direct communication, you can contact us by phone or email, or use the address information to confirm the visit location.",
  companyName: "Shenzhen Foreach Technology Co., Ltd.",
  companyPosition:
    "Supplier of core microfluidic components and fluidic system solutions",
  contactRows: [
    {
      label: "Tel",
      value: "0755-8655 3831",
    },
    {
      label: "Email",
      value: "sales@foreachtek.com",
    },
    {
      label: "Website",
      value: "www.foreachtek.com",
    },
    {
      label: "Address",
      value:
        "13th Floor, Building 2, Yufengda Industrial Park, No.1008 Guangqiao Avenue, Guangming District, Shenzhen, China",
    },
    {
      label: "Business Hours",
      value: "Monday to Friday 08:30 - 18:00",
    },
  ],
  mapTitle: "Company Location",
  mapAddress:
    "13th Floor, Building 2, Yufengda Industrial Park, No.1008 Guangqiao Avenue, Guangming District, Shenzhen, China",

  bottomCtaTitle: "Need product selection or technical support?",
  bottomCtaDescription:
    "Submit your application scenario and product requirements, and we will help evaluate the suitable product direction.",
  bottomCtaFormButton: "Submit Inquiry",
  bottomCtaContactButton: "View Contact Information",
};

/* =========================================================
   多语言文案

   说明：
   1. 英文为完整精修版本
   2. 其他语种先覆盖主要可见文案
   3. 没覆盖的小字段会显示英文，不会再显示中文
========================================================= */

const contactIntlText: Record<ContactIntlLocaleCode, ContactIntlText> = {
  en: enText,

  es: {
    ...enText,
    seoTitle: "Contáctenos | FOREACH",
    seoDescription:
      "Contacte con FOREACH para selección de productos, soporte técnico, muestras, planos, revisión de BOM y proyectos microfluídicos.",
    heroTitlePrefix: "Contacte con FOREACH para",
    heroHighlightText: "selección de productos",
    heroTitleSuffix: "y soporte técnico",
    heroSupportButton: "Ver soporte",
    heroFormButton: "Enviar consulta",
    supportTitle: "Opciones de soporte",
    supportDescription:
      "FOREACH ofrece soporte de comunicación para selección de productos, documentos, muestras, soluciones, personalización y posventa.",
    formTitle: "Enviar consulta",
    formDescription:
      "Complete la aplicación, producto objetivo, parámetros clave, etapa actual y archivos adjuntos para que podamos evaluar su solicitud.",
    formPanelTitle: "Formulario de consulta",
    submitButton: "Enviar consulta",
    uploadButton: "Subir archivos",
    emailLabel: "Email",
    emailPlaceholder: "Introduzca su email",
    emailSendButton: "Enviar código",
    emailCodePlaceholder: "Código de verificación",
    emailVerifyButton: "Verificar",
    emailTip: "Se requiere verificación de email.",
    emailVerifiedTip: "Email verificado.",
    nameLabel: "Nombre",
    namePlaceholder: "Introduzca su nombre",
    companyLabel: "Empresa",
    companyPlaceholder: "Introduzca el nombre de la empresa",
    phoneLabel: "Teléfono / WhatsApp",
    phonePlaceholder: "Opcional, para comunicación rápida",
    targetModelLabel: "Modelo específico / modelo competidor",
    targetModelPlaceholder: "Modelo o modelo competidor a reemplazar",
    messageLabel: "Descripción de requisitos",
    messagePlaceholder:
      "Describa la aplicación, producto objetivo, parámetros clave o solicitud de documentos.",
    requestTypeLabel: "Tipo de solicitud",
    productTypeLabel: "Producto / componente objetivo",
    projectStageLabel: "Etapa actual",
    productTypePlaceholder: "Seleccione el tipo principal de producto",
    projectStagePlaceholder: "Seleccione la etapa actual",
    removeFile: "Eliminar",
    emailVerifiedButton: "Verificado",
    mapLoading: "Cargando mapa...",
    openMap: "Abrir mapa",
    successTitle: "Enviado correctamente",
    successDescription:
      "Hemos recibido su consulta y responderemos dentro de 24 horas en días laborables.",
    successCloseButton: "Entendido",
    pdfDocumentTitle: "Formulario de solicitud",
    pdfRequestNumber: "N.º de solicitud",
    pdfCreatedAt: "Fecha de creación",
    pdfSource: "Fuente",
    pdfSourceValue: "Formulario web",
    pdfCustomerInfo: "1. Información del cliente",
    pdfRequirementInfo: "2. Información de requisitos",
    pdfRequirementDescription: "3. Descripción de requisitos",
    pdfAttachmentList: "4. Lista de archivos adjuntos",
    pdfNotFilled: "No completado",
    pdfNotSelected: "No seleccionado",
    pdfNoAttachment: "Sin archivos adjuntos",
    pdfIndex: "N.º",
    pdfAttachmentName: "Nombre del archivo",
    pdfAttachmentType: "Tipo",
    pdfAttachmentSize: "Tamaño",
    guideTitle: "Guía de llenado",
    contactInfoTitle: "Información de contacto",
    bottomCtaTitle: "¿Necesita selección de producto o soporte técnico?",
    bottomCtaFormButton: "Enviar consulta",
    bottomCtaContactButton: "Ver información de contacto",
  },

  fr: {
    ...enText,
    seoTitle: "Contactez-nous | FOREACH",
    seoDescription:
      "Contactez FOREACH pour la sélection de produits, le support technique, les échantillons, les plans, la revue de BOM et les projets microfluidiques.",
    heroTitlePrefix: "Contactez FOREACH pour",
    heroHighlightText: "la sélection produit",
    heroTitleSuffix: "et le support technique",
    heroSupportButton: "Voir le support",
    heroFormButton: "Envoyer une demande",
    supportTitle: "Options de support",
    formTitle: "Envoyer une demande",
    formPanelTitle: "Formulaire de demande",
    submitButton: "Envoyer la demande",
    uploadButton: "Téléverser des fichiers",
    emailLabel: "E-mail",
    emailPlaceholder: "Veuillez saisir votre e-mail",
    emailSendButton: "Envoyer le code",
    emailCodePlaceholder: "Code de vérification",
    emailVerifyButton: "Vérifier",
    nameLabel: "Nom",
    companyLabel: "Entreprise",
    phoneLabel: "Téléphone / WhatsApp",
    targetModelLabel: "Modèle spécifique / modèle concurrent",
    messageLabel: "Description de la demande",
    requestTypeLabel: "Type de demande",
    productTypeLabel: "Produit / composant cible",
    projectStageLabel: "Étape actuelle",
    removeFile: "Supprimer",
    emailVerifiedButton: "Vérifié",
    successTitle: "Demande envoyée",
    successCloseButton: "Compris",
    pdfDocumentTitle: "Formulaire de demande",
    pdfRequestNumber: "N° de demande",
    pdfCreatedAt: "Créé le",
    pdfSource: "Source",
    pdfSourceValue: "Formulaire de contact du site",
    pdfCustomerInfo: "1. Informations client",
    pdfRequirementInfo: "2. Informations de demande",
    pdfRequirementDescription: "3. Description de la demande",
    pdfAttachmentList: "4. Liste des pièces jointes",
    pdfNotFilled: "Non renseigné",
    pdfNotSelected: "Non sélectionné",
    pdfNoAttachment: "Aucune pièce jointe",
    pdfIndex: "N°",
    pdfAttachmentName: "Nom du fichier",
    pdfAttachmentType: "Type",
    pdfAttachmentSize: "Taille",
    guideTitle: "Guide de remplissage",
    contactInfoTitle: "Coordonnées",
    bottomCtaTitle: "Besoin d’une sélection produit ou d’un support technique ?",
    bottomCtaFormButton: "Envoyer la demande",
    bottomCtaContactButton: "Voir les coordonnées",
  },

  ko: {
    ...enText,
    seoTitle: "문의하기 | FOREACH",
    seoDescription:
      "제품 선정, 기술 지원, 샘플 테스트, 도면 요청, BOM 검토 및 마이크로플루이딕 프로젝트 상담을 위해 FOREACH에 문의하세요.",
    heroTitlePrefix: "FOREACH에 문의하여",
    heroHighlightText: "제품 선정",
    heroTitleSuffix: "및 기술 지원을 받으세요",
    heroSupportButton: "지원 보기",
    heroFormButton: "문의 제출",
    supportTitle: "지원 항목",
    formTitle: "문의 제출",
    formPanelTitle: "문의 제출 양식",
    submitButton: "문의 제출",
    uploadButton: "파일 업로드",
    emailLabel: "이메일",
    emailPlaceholder: "이메일 주소를 입력하세요",
    emailSendButton: "코드 전송",
    emailCodePlaceholder: "인증 코드 입력",
    emailVerifyButton: "인증",
    nameLabel: "이름",
    companyLabel: "회사명",
    phoneLabel: "전화 / WhatsApp",
    targetModelLabel: "특정 모델 / 경쟁 제품 모델",
    messageLabel: "요구사항 설명",
    requestTypeLabel: "요청 유형",
    productTypeLabel: "대상 제품 / 부품 유형",
    projectStageLabel: "현재 단계",
    removeFile: "삭제",
    emailVerifiedButton: "인증 완료",
    successTitle: "제출 완료",
    successCloseButton: "확인",
    pdfDocumentTitle: "문의 요청서",
    pdfRequestNumber: "요청 번호",
    pdfCreatedAt: "생성 시간",
    pdfSource: "출처",
    pdfSourceValue: "웹사이트 문의 양식",
    pdfCustomerInfo: "1. 고객 정보",
    pdfRequirementInfo: "2. 요청 정보",
    pdfRequirementDescription: "3. 요청 설명",
    pdfAttachmentList: "4. 첨부 파일 목록",
    pdfNotFilled: "미입력",
    pdfNotSelected: "미선택",
    pdfNoAttachment: "첨부 파일 없음",
    pdfIndex: "번호",
    pdfAttachmentName: "파일명",
    pdfAttachmentType: "유형",
    pdfAttachmentSize: "크기",
    guideTitle: "작성 안내",
    contactInfoTitle: "연락처 정보",
    bottomCtaTitle: "제품 선정 또는 기술 지원이 필요하신가요?",
    bottomCtaFormButton: "문의 제출",
    bottomCtaContactButton: "연락처 보기",
  },

  ru: {
    ...enText,
    seoTitle: "Свяжитесь с нами | FOREACH",
    seoDescription:
      "Свяжитесь с FOREACH по вопросам подбора продукции, технической поддержки, образцов, чертежей, BOM и микрофлюидных проектов.",
    heroTitlePrefix: "Свяжитесь с FOREACH для",
    heroHighlightText: "подбора продукции",
    heroTitleSuffix: "и технической поддержки",
    heroSupportButton: "Посмотреть поддержку",
    heroFormButton: "Отправить запрос",
    supportTitle: "Варианты поддержки",
    formTitle: "Отправить запрос",
    formPanelTitle: "Форма запроса",
    submitButton: "Отправить запрос",
    uploadButton: "Загрузить файлы",
    emailLabel: "E-mail",
    emailPlaceholder: "Введите e-mail",
    emailSendButton: "Отправить код",
    emailCodePlaceholder: "Введите код подтверждения",
    emailVerifyButton: "Проверить",
    nameLabel: "Имя",
    companyLabel: "Компания",
    phoneLabel: "Телефон / WhatsApp",
    targetModelLabel: "Модель / модель конкурента",
    messageLabel: "Описание требований",
    requestTypeLabel: "Тип запроса",
    productTypeLabel: "Целевой продукт / компонент",
    projectStageLabel: "Текущий этап",
    removeFile: "Удалить",
    emailVerifiedButton: "Подтверждено",
    successTitle: "Запрос отправлен",
    successCloseButton: "Понятно",
    pdfDocumentTitle: "Форма запроса",
    pdfRequestNumber: "№ запроса",
    pdfCreatedAt: "Дата создания",
    pdfSource: "Источник",
    pdfSourceValue: "Форма обратной связи сайта",
    pdfCustomerInfo: "1. Информация о клиенте",
    pdfRequirementInfo: "2. Информация о запросе",
    pdfRequirementDescription: "3. Описание запроса",
    pdfAttachmentList: "4. Список вложений",
    pdfNotFilled: "Не заполнено",
    pdfNotSelected: "Не выбрано",
    pdfNoAttachment: "Нет вложений",
    pdfIndex: "№",
    pdfAttachmentName: "Имя файла",
    pdfAttachmentType: "Тип",
    pdfAttachmentSize: "Размер",
    guideTitle: "Рекомендации по заполнению",
    contactInfoTitle: "Контактная информация",
    bottomCtaTitle: "Нужен подбор продукта или техническая поддержка?",
    bottomCtaFormButton: "Отправить запрос",
    bottomCtaContactButton: "Контактная информация",
  },
};

/* =========================================================
   根据顺序替换支持项
========================================================= */

function buildSupportItems(
  text: ContactIntlText,
): ContactPageData["support"]["items"] {
  return contactZhData.support.items.map((item, index) => ({
    ...item,
    title: text.supportItems[index]?.title ?? item.title,
    description: text.supportItems[index]?.description ?? item.description,
    requestType: text.supportItems[index]?.requestType ?? item.requestType,
  }));
}

/* =========================================================
   根据顺序替换填写说明
========================================================= */

function buildGuideItems(
  text: ContactIntlText,
): ContactPageData["guide"]["items"] {
  return contactZhData.guide.items.map((item, index) => ({
    ...item,
    title: text.guideItems[index]?.title ?? item.title,
    description: text.guideItems[index]?.description ?? item.description,
  }));
}

/* =========================================================
   根据顺序替换联系方式
========================================================= */

function buildContactRows(
  text: ContactIntlText,
): ContactPageData["contactInfo"]["rows"] {
  return contactZhData.contactInfo.rows.map((row, index) => ({
    ...row,
    label: text.contactRows[index]?.label ?? row.label,
    value: text.contactRows[index]?.value ?? row.value,
  }));
}

/* =========================================================
   生成外语联系我们页面数据
========================================================= */

export function getContactIntlData(
  locale: ContactIntlLocaleCode,
): ContactPageData {
  const text = contactIntlText[locale];

  return {
    ...contactZhData,

    seo: {
      ...contactZhData.seo,
      title: text.seoTitle,
      description: text.seoDescription,
    },

    hero: {
      ...contactZhData.hero,
      titlePrefix: text.heroTitlePrefix,
      highlightText: text.heroHighlightText,
      titleSuffix: text.heroTitleSuffix,
      image: {
        ...contactZhData.hero.image,
        alt: text.heroImageAlt,
      },
      buttons: {
        support: {
          ...contactZhData.hero.buttons.support,
          label: text.heroSupportButton,
        },
        form: {
          ...contactZhData.hero.buttons.form,
          label: text.heroFormButton,
        },
      },
    },

    support: {
      ...contactZhData.support,
      title: text.supportTitle,
      description: text.supportDescription,
      items: buildSupportItems(text),
    },

    form: {
      ...contactZhData.form,
      title: text.formTitle,
      description: text.formDescription,
      panelTitle: text.formPanelTitle,
      fileTip: text.fileTip,
      submitButton: text.submitButton,
      uploadButton: text.uploadButton,

      emailVerification: {
        ...contactZhData.form.emailVerification,
        emailLabel: text.emailLabel,
        emailPlaceholder: text.emailPlaceholder,
        sendButton: text.emailSendButton,
        codePlaceholder: text.emailCodePlaceholder,
        verifyButton: text.emailVerifyButton,
        tip: text.emailTip,
        codeSentTip: text.emailCodeSentTip,
        invalidCodeTip: text.emailInvalidCodeTip,
        verifiedTip: text.emailVerifiedTip,
      },

      fields: {
        ...contactZhData.form.fields,
        name: {
          ...contactZhData.form.fields.name,
          label: text.nameLabel,
          placeholder: text.namePlaceholder,
        },
        company: {
          ...contactZhData.form.fields.company,
          label: text.companyLabel,
          placeholder: text.companyPlaceholder,
        },
        phone: {
          ...contactZhData.form.fields.phone,
          label: text.phoneLabel,
          placeholder: text.phonePlaceholder,
        },
        targetModel: {
          ...contactZhData.form.fields.targetModel,
          label: text.targetModelLabel,
          placeholder: text.targetModelPlaceholder,
        },
        message: {
          ...contactZhData.form.fields.message,
          label: text.messageLabel,
          placeholder: text.messagePlaceholder,
        },
      },

      labels: {
        ...contactZhData.form.labels,
        requestType: text.requestTypeLabel,
        productType: text.productTypeLabel,
        projectStage: text.projectStageLabel,
      },

      placeholders: {
        ...contactZhData.form.placeholders,
        productType: text.productTypePlaceholder,
        projectStage: text.projectStagePlaceholder,
      },

      actions: {
        ...contactZhData.form.actions,
        removeFile: text.removeFile,
        emailVerified: text.emailVerifiedButton,
        resendCountdownSuffix: text.resendCountdownSuffix,
        retryCountdownSuffix: text.retryCountdownSuffix,
      },

      alerts: {
        ...contactZhData.form.alerts,
        emailRequired: text.emailRequiredAlert,
        invalidEmail: text.invalidEmailAlert,
        sendCodeFirst: text.sendCodeFirstAlert,
        codeRequired: text.codeRequiredAlert,
        verifyEmailFirst: text.verifyEmailFirstAlert,
        popupBlocked: text.popupBlockedAlert,
        fileTooLargePrefix: text.fileTooLargePrefix,
        fileTooLargeSuffix: text.fileTooLargeSuffix,
      },

      mapTexts: {
        ...contactZhData.form.mapTexts,
        loading: text.mapLoading,
        error: text.mapError,
        openMap: text.openMap,
      },

      successModal: {
        ...contactZhData.form.successModal,
        title: text.successTitle,
        description: text.successDescription,
        pdfTip: text.successPdfTip,
        closeButton: text.successCloseButton,
      },

      pdfTexts: {
        ...contactZhData.form.pdfTexts,
        documentTitle: text.pdfDocumentTitle,
        documentSubtitle: text.pdfDocumentSubtitle,
        requestNumber: text.pdfRequestNumber,
        createdAt: text.pdfCreatedAt,
        source: text.pdfSource,
        sourceValue: text.pdfSourceValue,
        customerInfo: text.pdfCustomerInfo,
        requirementInfo: text.pdfRequirementInfo,
        requirementDescription: text.pdfRequirementDescription,
        attachmentList: text.pdfAttachmentList,
        notFilled: text.pdfNotFilled,
        notSelected: text.pdfNotSelected,
        noAttachment: text.pdfNoAttachment,
        index: text.pdfIndex,
        attachmentName: text.pdfAttachmentName,
        attachmentType: text.pdfAttachmentType,
        attachmentSize: text.pdfAttachmentSize,
        footerNote: text.pdfFooterNote,
        printTip: text.pdfPrintTip,
      },

      requestTypes: text.requestTypes,
      productGroups: text.productGroups,
      projectStages: text.projectStages,
    },

    guide: {
      ...contactZhData.guide,
      title: text.guideTitle,
      description: text.guideDescription,
      items: buildGuideItems(text),
      note: text.guideNote,
    },

    contactInfo: {
      ...contactZhData.contactInfo,
      title: text.contactInfoTitle,
      description: text.contactInfoDescription,
      companyName: text.companyName,
      companyPosition: text.companyPosition,
      rows: buildContactRows(text),
      map: {
        ...contactZhData.contactInfo.map,
        title: text.mapTitle,
        address: text.mapAddress,
      },
    },

    bottomCta: {
      ...contactZhData.bottomCta,
      title: text.bottomCtaTitle,
      description: text.bottomCtaDescription,
      buttons: {
        form: {
          ...contactZhData.bottomCta.buttons.form,
          label: text.bottomCtaFormButton,
        },
        contact: {
          ...contactZhData.bottomCta.buttons.contact,
          label: text.bottomCtaContactButton,
        },
      },
    },
  };
} 