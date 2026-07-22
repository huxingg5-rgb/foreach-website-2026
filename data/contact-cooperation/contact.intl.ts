/* =========================================================
   contact.intl.ts
   恒永达官网｜外语版联系我们页面数据

   文件路径：
   data/contact-cooperation/contact.intl.ts

   作用：
   1. 为 /en/contact、/es/contact、/fr/contact、/ko/contact、/ru/contact 提供外语联系我们页面数据
   2. 中文 /contact 继续使用 contact.zh.ts，不受影响
   3. 本文件以 contactZhData 为基础，保留图片、地图坐标、页面结构和样式字段
   4. 外语页面所有主要可见文案在这里统一维护
   5. 后期如果要接 CMS / 后端，只需要把这里的数据迁移到接口即可

   重要说明：
   1. 中文页面不走 /zh-CN/contact
   2. 外语页面统一走 /en/contact /es/contact /fr/contact /ko/contact /ru/contact
   3. 不要把这些文案写到 page.tsx 或组件里，避免后期维护混乱
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

   作用：
   1. page.tsx 中会使用这个函数判断 locale 是否合法
   2. 非法语言会进入 notFound()
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
   多语言联系我们页面文案

   说明：
   1. 这里不再使用 es: { ...enText } 这种大面积英文兜底方式
   2. 每种语言都提供完整主要字段，避免页面看起来只有英文
   3. 产品型号、公司名、邮箱、网址等专有信息保持英文或通用写法
========================================================= */

const contactIntlText: Record<ContactIntlLocaleCode, ContactIntlText> = {
  en: {
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
        options: [
          "Not sure, need support",
          "Other product or custom requirement",
        ],
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
  },

  es: {
    seoTitle: "Contáctenos | FOREACH",
    seoDescription:
      "Contacte con FOREACH para selección de productos, soporte técnico, pruebas de muestras, solicitud de planos, revisión de BOM y comunicación de proyectos microfluídicos.",

    heroTitlePrefix: "Contacte con FOREACH para",
    heroHighlightText: "selección de productos",
    heroTitleSuffix: "y soporte técnico",
    heroImageAlt:
      "Soporte técnico y comunicación de proyectos de productos microfluídicos de FOREACH",
    heroSupportButton: "Ver soporte",
    heroFormButton: "Enviar consulta",

    supportTitle: "Opciones de soporte",
    supportDescription:
      "FOREACH ofrece soporte desde la evaluación inicial hasta la introducción del proyecto, incluyendo selección de productos, solicitud de documentos, pruebas de muestras, soluciones, personalización y posventa.",
    supportItems: [
      {
        title: "Soporte de selección de productos",
        description:
          "Recomendamos productos adecuados según caudal, presión, medio, interfaz, vida útil, método de control y requisitos de instalación.",
        requestType: "Soporte técnico y de selección",
      },
      {
        title: "Solicitud de documentos y planos",
        description:
          "Solicite fichas técnicas, catálogos, dimensiones de instalación, información de interfaces y materiales de selección.",
        requestType: "Solicitud de documentos y planos",
      },
      {
        title: "Soporte para pruebas de muestras",
        description:
          "Apoyamos la verificación de muestras, confirmación de parámetros y retroalimentación de pruebas de aplicación.",
        requestType: "Solicitud de prueba de muestras",
      },
      {
        title: "Comunicación de soluciones fluídicas",
        description:
          "Analizamos combinaciones de bombas, válvulas, tubos, sensores y otros componentes fluídicos.",
        requestType: "Soporte técnico y de selección",
      },
      {
        title: "Comunicación de requisitos personalizados",
        description:
          "Evaluamos la viabilidad de requisitos especiales de estructura, interfaz, materiales y métodos de control.",
        requestType: "Consulta de producto y cotización",
      },
      {
        title: "Soporte posventa",
        description:
          "Ofrecemos soporte de instalación, operación, mantenimiento, retroalimentación de problemas y gestión de calidad.",
        requestType: "Posventa y retroalimentación de calidad",
      },
    ],

    formTitle: "Enviar consulta",
    formDescription:
      "Indique el escenario de aplicación, producto objetivo, parámetros clave, etapa actual del proyecto y archivos adjuntos para que podamos evaluar su solicitud rápidamente.",
    formPanelTitle: "Formulario de consulta",
    fileTip:
      "Admite planos, archivos PDF, BOM, imágenes y otros documentos. Cada archivo no debe superar los 20 MB.",
    submitButton: "Enviar consulta",
    uploadButton: "Subir archivos",

    emailLabel: "Email",
    emailPlaceholder: "Introduzca su dirección de email",
    emailSendButton: "Enviar código",
    emailCodePlaceholder: "Introduzca el código de verificación",
    emailVerifyButton: "Verificar",
    emailTip: "Se requiere verificación de email.",
    emailCodeSentTip: "Código de verificación enviado. Código de prueba: ",
    emailInvalidCodeTip: "Código de verificación incorrecto. Código de prueba: ",
    emailVerifiedTip: "Email verificado.",

    nameLabel: "Nombre",
    namePlaceholder: "Introduzca su nombre",
    companyLabel: "Empresa",
    companyPlaceholder: "Introduzca el nombre de su empresa",
    phoneLabel: "Teléfono / WhatsApp",
    phonePlaceholder: "Opcional, para una comunicación más rápida",
    targetModelLabel: "Modelo específico / modelo competidor",
    targetModelPlaceholder: "Modelo o modelo competidor a reemplazar",
    messageLabel: "Descripción de requisitos",
    messagePlaceholder:
      "Describa su escenario de aplicación, producto objetivo, parámetros clave o solicitud de documentos.",

    requestTypeLabel: "Tipo de solicitud",
    productTypeLabel: "Producto / componente objetivo",
    projectStageLabel: "Etapa actual",

    productTypePlaceholder: "Seleccione el tipo principal de producto",
    projectStagePlaceholder: "Seleccione la etapa actual",

    removeFile: "Eliminar",
    emailVerifiedButton: "Verificado",
    resendCountdownSuffix: "s para reenviar",
    retryCountdownSuffix: "s para reintentar",

    emailRequiredAlert: "Introduzca primero su dirección de email.",
    invalidEmailAlert: "Introduzca una dirección de email válida.",
    sendCodeFirstAlert:
      "Envíe primero el código de verificación por email.",
    codeRequiredAlert: "Introduzca el código de verificación.",
    verifyEmailFirstAlert:
      "Haga clic en Verificar y complete la verificación del email antes de enviar.",
    popupBlockedAlert:
      "El navegador bloqueó la nueva ventana. Permita ventanas emergentes y envíe de nuevo.",
    fileTooLargePrefix: "El archivo “",
    fileTooLargeSuffix: "” supera los 20 MB. Elija otro archivo.",

    mapLoading: "Cargando mapa...",
    mapError:
      "El mapa no está disponible temporalmente. Compruebe la clave del mapa, la lista blanca del dominio o la red.",
    openMap: "Abrir Amap",

    successTitle: "Enviado correctamente",
    successDescription:
      "Hemos recibido su consulta y responderemos dentro de 24 horas en días laborables.",
    successPdfTip:
      "Si se ha abierto la ventana de vista previa del PDF, puede guardar o imprimir el formulario según las indicaciones del navegador.",
    successCloseButton: "Entendido",

    pdfDocumentTitle: "Formulario de solicitud de contacto",
    pdfDocumentSubtitle:
      "Formulario de confirmación de información de requisitos del cliente.",
    pdfRequestNumber: "N.º de solicitud",
    pdfCreatedAt: "Fecha de creación",
    pdfSource: "Fuente",
    pdfSourceValue: "Formulario de contacto del sitio web",
    pdfCustomerInfo: "1. Información del cliente",
    pdfRequirementInfo: "2. Información de requisitos",
    pdfRequirementDescription: "3. Descripción de requisitos",
    pdfAttachmentList: "4. Lista de archivos adjuntos",
    pdfNotFilled: "No completado",
    pdfNotSelected: "No seleccionado",
    pdfNoAttachment: "No se han subido archivos adjuntos",
    pdfIndex: "N.º",
    pdfAttachmentName: "Nombre del archivo",
    pdfAttachmentType: "Tipo",
    pdfAttachmentSize: "Tamaño",
    pdfFooterNote:
      "Este archivo se utiliza para comunicación de requisitos, seguimiento interno y archivo documental.",
    pdfPrintTip: "Puede guardarse como formulario PDF de solicitud.",

    requestTypes: [
      "Consulta de producto y cotización",
      "Solicitud de documentos y planos",
      "Soporte técnico y de selección",
      "Solicitud de prueba de muestras",
      "Posventa y retroalimentación de calidad",
      "Otra solicitud",
    ],

    productGroups: [
      {
        groupName: "Productos de bomba",
        options: [
          "Bomba de diafragma",
          "Bomba de jeringa",
          "Bomba de pipeteo",
          "Bomba de pistón cerámico",
        ],
      },
      {
        groupName: "Productos de válvula",
        options: [
          "Válvula solenoide",
          "Válvula de pinzamiento",
          "Válvula rotativa",
          "Válvula de alta presión",
        ],
      },
      {
        groupName: "Sensores y componentes fluídicos",
        options: [
          "Sensor de presión",
          "Detector de burbujas",
          "Módulo de conductividad / TDS",
          "Tubos / conectores / aguja de muestreo",
        ],
      },
      {
        groupName: "Otros",
        options: [
          "No estoy seguro, necesito soporte",
          "Otro producto o requisito personalizado",
        ],
      },
    ],

    projectStages: [
      "Evaluación de selección",
      "Prueba de muestras",
      "Desarrollo de proyecto",
      "Introducción a producción en masa",
      "Solicitud de documentos",
      "Retroalimentación posventa",
      "Otra etapa",
    ],

    guideTitle: "Guía de llenado",
    guideDescription:
      "Recomendamos incluir la siguiente información para que podamos evaluar rápidamente la dirección del producto y el método de soporte.",
    guideItems: [
      {
        title: "Escenario de aplicación",
        description:
          "Por ejemplo: IVD, ciencias de la vida, instrumentos analíticos, automatización de laboratorio, biología sintética, etc.",
      },
      {
        title: "Producto objetivo",
        description:
          "Por ejemplo: bomba de diafragma, bomba de jeringa, bomba de pipeteo, bomba de pistón, válvula solenoide, válvula rotativa, sensor, etc.",
      },
      {
        title: "Parámetros clave",
        description:
          "Incluya medio, caudal, presión, interfaz, dimensiones, vida útil, método de control, espacio de instalación, etc.",
      },
      {
        title: "Etapa actual",
        description:
          "Por ejemplo: evaluación de selección, prueba de muestras, desarrollo de proyecto, introducción a producción, solicitud de documentos o retroalimentación posventa.",
      },
      {
        title: "Archivos adjuntos",
        description:
          "Si tiene planos, especificaciones PDF, BOM, fotos del sitio o información de modelos competidores, puede subirlos juntos.",
      },
    ],
    guideNote:
      "Si aún no dispone de parámetros completos, primero puede describir la aplicación del equipo y la función esperada.",

    contactInfoTitle: "Información de contacto",
    contactInfoDescription:
      "Para una comunicación directa, puede contactarnos por teléfono o email, o utilizar la dirección para confirmar la ubicación de visita.",
    companyName: "Shenzhen Foreach Technology Co., Ltd.",
    companyPosition:
      "Proveedor de componentes microfluídicos clave y soluciones de sistemas fluídicos",
    contactRows: [
      {
        label: "Tel.",
        value: "0755-8655 3831",
      },
      {
        label: "Email",
        value: "sales@foreachtek.com",
      },
      {
        label: "Sitio web",
        value: "www.foreachtek.com",
      },
      {
        label: "Dirección",
        value:
          "13th Floor, Building 2, Yufengda Industrial Park, No.1008 Guangqiao Avenue, Guangming District, Shenzhen, China",
      },
      {
        label: "Horario",
        value: "Lunes a viernes 08:30 - 18:00",
      },
    ],
    mapTitle: "Ubicación de la empresa",
    mapAddress:
      "13th Floor, Building 2, Yufengda Industrial Park, No.1008 Guangqiao Avenue, Guangming District, Shenzhen, China",

    bottomCtaTitle: "¿Necesita selección de productos o soporte técnico?",
    bottomCtaDescription:
      "Envíe su escenario de aplicación y requisitos de producto, y le ayudaremos a evaluar la dirección de producto adecuada.",
    bottomCtaFormButton: "Enviar consulta",
    bottomCtaContactButton: "Ver información de contacto",
  },

  fr: {
    seoTitle: "Contactez-nous | FOREACH",
    seoDescription:
      "Contactez FOREACH pour la sélection de produits, le support technique, les essais d’échantillons, les demandes de plans, la revue de BOM et les projets microfluidiques.",

    heroTitlePrefix: "Contactez FOREACH pour",
    heroHighlightText: "la sélection produit",
    heroTitleSuffix: "et le support technique",
    heroImageAlt:
      "Support technique et communication de projet pour les produits microfluidiques FOREACH",
    heroSupportButton: "Voir le support",
    heroFormButton: "Envoyer une demande",

    supportTitle: "Options de support",
    supportDescription:
      "FOREACH fournit un support depuis l’évaluation initiale jusqu’à l’introduction du projet, couvrant la sélection produit, les documents, les essais d’échantillons, les solutions, la personnalisation et l’après-vente.",
    supportItems: [
      {
        title: "Support de sélection produit",
        description:
          "Nous recommandons des produits adaptés selon le débit, la pression, le fluide, l’interface, la durée de vie, le mode de contrôle et les exigences d’installation.",
        requestType: "Support technique et sélection",
      },
      {
        title: "Demande de documents et de plans",
        description:
          "Demandez des fiches techniques, catalogues, dimensions d’installation, informations d’interface et supports de sélection.",
        requestType: "Demande de documents et de plans",
      },
      {
        title: "Support d’essais d’échantillons",
        description:
          "Nous aidons à la vérification d’échantillons, à la confirmation des paramètres et au retour d’essais d’application.",
        requestType: "Demande d’essai d’échantillon",
      },
      {
        title: "Discussion de solution fluidique",
        description:
          "Nous discutons de l’intégration de pompes, vannes, tubes, capteurs et autres composants fluidiques.",
        requestType: "Support technique et sélection",
      },
      {
        title: "Discussion de besoins personnalisés",
        description:
          "Nous évaluons la faisabilité d’exigences spécifiques en structure, interface, matériaux et méthodes de contrôle.",
        requestType: "Demande produit et devis",
      },
      {
        title: "Support après-vente",
        description:
          "Nous fournissons un support pour l’installation, l’utilisation, la maintenance, le retour de problèmes et la gestion qualité.",
        requestType: "Après-vente et retour qualité",
      },
    ],

    formTitle: "Envoyer une demande",
    formDescription:
      "Veuillez indiquer votre scénario d’application, le produit cible, les paramètres clés, l’étape actuelle du projet et les pièces jointes afin que nous puissions évaluer rapidement votre demande.",
    formPanelTitle: "Formulaire de demande",
    fileTip:
      "Prend en charge les plans, fichiers PDF, BOM, images et autres documents. Chaque fichier ne doit pas dépasser 20 MB.",
    submitButton: "Envoyer la demande",
    uploadButton: "Téléverser des fichiers",

    emailLabel: "E-mail",
    emailPlaceholder: "Veuillez saisir votre adresse e-mail",
    emailSendButton: "Envoyer le code",
    emailCodePlaceholder: "Saisir le code de vérification",
    emailVerifyButton: "Vérifier",
    emailTip: "La vérification de l’e-mail est requise.",
    emailCodeSentTip: "Code de vérification envoyé. Code de test : ",
    emailInvalidCodeTip: "Code de vérification incorrect. Code de test : ",
    emailVerifiedTip: "E-mail vérifié.",

    nameLabel: "Nom",
    namePlaceholder: "Veuillez saisir votre nom",
    companyLabel: "Entreprise",
    companyPlaceholder: "Veuillez saisir le nom de votre entreprise",
    phoneLabel: "Téléphone / WhatsApp",
    phonePlaceholder: "Optionnel, pour une communication plus rapide",
    targetModelLabel: "Modèle spécifique / modèle concurrent",
    targetModelPlaceholder: "Modèle ou modèle concurrent à remplacer",
    messageLabel: "Description de la demande",
    messagePlaceholder:
      "Décrivez votre scénario d’application, le produit cible, les paramètres clés ou la demande de documents.",

    requestTypeLabel: "Type de demande",
    productTypeLabel: "Produit / composant cible",
    projectStageLabel: "Étape actuelle",

    productTypePlaceholder: "Veuillez sélectionner le type de produit principal",
    projectStagePlaceholder: "Veuillez sélectionner l’étape actuelle",

    removeFile: "Supprimer",
    emailVerifiedButton: "Vérifié",
    resendCountdownSuffix: "s avant renvoi",
    retryCountdownSuffix: "s avant nouvel essai",

    emailRequiredAlert: "Veuillez d’abord saisir votre adresse e-mail.",
    invalidEmailAlert: "Veuillez saisir une adresse e-mail valide.",
    sendCodeFirstAlert:
      "Veuillez d’abord envoyer le code de vérification par e-mail.",
    codeRequiredAlert: "Veuillez saisir le code de vérification.",
    verifyEmailFirstAlert:
      "Veuillez cliquer sur Vérifier et terminer la vérification de l’e-mail avant l’envoi.",
    popupBlockedAlert:
      "Le navigateur a bloqué la nouvelle fenêtre. Autorisez les fenêtres contextuelles puis renvoyez le formulaire.",
    fileTooLargePrefix: "Le fichier « ",
    fileTooLargeSuffix: " » dépasse 20 MB. Veuillez choisir un autre fichier.",

    mapLoading: "Chargement de la carte...",
    mapError:
      "La carte est temporairement indisponible. Vérifiez la clé de carte, la liste blanche du domaine ou l’état du réseau.",
    openMap: "Ouvrir Amap",

    successTitle: "Demande envoyée",
    successDescription:
      "Nous avons reçu votre demande et répondrons sous 24 heures les jours ouvrables.",
    successPdfTip:
      "Si la fenêtre d’aperçu PDF s’est ouverte, vous pouvez enregistrer ou imprimer le formulaire selon les indications du navigateur.",
    successCloseButton: "Compris",

    pdfDocumentTitle: "Formulaire de demande de contact",
    pdfDocumentSubtitle:
      "Formulaire de confirmation des informations de besoin client.",
    pdfRequestNumber: "N° de demande",
    pdfCreatedAt: "Créé le",
    pdfSource: "Source",
    pdfSourceValue: "Formulaire de contact du site web",
    pdfCustomerInfo: "1. Informations client",
    pdfRequirementInfo: "2. Informations de demande",
    pdfRequirementDescription: "3. Description de la demande",
    pdfAttachmentList: "4. Liste des pièces jointes",
    pdfNotFilled: "Non renseigné",
    pdfNotSelected: "Non sélectionné",
    pdfNoAttachment: "Aucune pièce jointe téléversée",
    pdfIndex: "N°",
    pdfAttachmentName: "Nom du fichier",
    pdfAttachmentType: "Type",
    pdfAttachmentSize: "Taille",
    pdfFooterNote:
      "Ce fichier est utilisé pour la communication des besoins, le suivi interne et l’archivage documentaire.",
    pdfPrintTip: "Peut être enregistré comme formulaire de demande PDF.",

    requestTypes: [
      "Demande produit et devis",
      "Demande de documents et de plans",
      "Support technique et sélection",
      "Demande d’essai d’échantillon",
      "Après-vente et retour qualité",
      "Autre demande",
    ],

    productGroups: [
      {
        groupName: "Produits de pompage",
        options: [
          "Pompe à membrane",
          "Pompe seringue",
          "Pompe de pipetage",
          "Pompe à piston céramique",
        ],
      },
      {
        groupName: "Produits de vannes",
        options: [
          "Électrovanne",
          "Vanne à pincement",
          "Vanne rotative",
          "Vanne haute pression",
        ],
      },
      {
        groupName: "Capteurs et composants fluidiques",
        options: [
          "Capteur de pression",
          "Détecteur de bulles",
          "Module de conductivité / TDS",
          "Tubes / raccords / aiguille d’échantillonnage",
        ],
      },
      {
        groupName: "Autres",
        options: [
          "Pas sûr, besoin de support",
          "Autre produit ou besoin personnalisé",
        ],
      },
    ],

    projectStages: [
      "Évaluation de sélection",
      "Essai d’échantillons",
      "Développement de projet",
      "Introduction en production de masse",
      "Demande de documents",
      "Retour après-vente",
      "Autre étape",
    ],

    guideTitle: "Guide de remplissage",
    guideDescription:
      "Nous vous recommandons d’inclure les informations suivantes afin que nous puissions évaluer rapidement l’orientation produit et la méthode de support.",
    guideItems: [
      {
        title: "Scénario d’application",
        description:
          "Par exemple : IVD, sciences de la vie, instruments analytiques, automatisation de laboratoire, biologie synthétique, etc.",
      },
      {
        title: "Produit cible",
        description:
          "Par exemple : pompe à membrane, pompe seringue, pompe de pipetage, pompe à piston, électrovanne, vanne rotative, capteur, etc.",
      },
      {
        title: "Paramètres clés",
        description:
          "Incluez le fluide, le débit, la pression, l’interface, les dimensions, la durée de vie, le mode de contrôle, l’espace d’installation, etc.",
      },
      {
        title: "Étape actuelle",
        description:
          "Par exemple : évaluation de sélection, essai d’échantillons, développement de projet, introduction en production, demande de documents ou retour après-vente.",
      },
      {
        title: "Pièces jointes",
        description:
          "Si vous avez des plans, spécifications PDF, BOM, photos de site ou informations de modèles concurrents, vous pouvez les téléverser ensemble.",
      },
    ],
    guideNote:
      "Si vous n’avez pas encore de paramètres complets, vous pouvez d’abord décrire l’application de l’équipement et la fonction attendue.",

    contactInfoTitle: "Coordonnées",
    contactInfoDescription:
      "Pour une communication directe, vous pouvez nous contacter par téléphone ou e-mail, ou utiliser l’adresse pour confirmer le lieu de visite.",
    companyName: "Shenzhen Foreach Technology Co., Ltd.",
    companyPosition:
      "Fournisseur de composants microfluidiques clés et de solutions de systèmes fluidiques",
    contactRows: [
      {
        label: "Tél.",
        value: "0755-8655 3831",
      },
      {
        label: "E-mail",
        value: "sales@foreachtek.com",
      },
      {
        label: "Site web",
        value: "www.foreachtek.com",
      },
      {
        label: "Adresse",
        value:
          "13th Floor, Building 2, Yufengda Industrial Park, No.1008 Guangqiao Avenue, Guangming District, Shenzhen, China",
      },
      {
        label: "Horaires",
        value: "Lundi à vendredi 08:30 - 18:00",
      },
    ],
    mapTitle: "Localisation de l’entreprise",
    mapAddress:
      "13th Floor, Building 2, Yufengda Industrial Park, No.1008 Guangqiao Avenue, Guangming District, Shenzhen, China",

    bottomCtaTitle:
      "Besoin d’une sélection produit ou d’un support technique ?",
    bottomCtaDescription:
      "Envoyez votre scénario d’application et vos exigences produit, nous vous aiderons à évaluer l’orientation produit adaptée.",
    bottomCtaFormButton: "Envoyer la demande",
    bottomCtaContactButton: "Voir les coordonnées",
  },

  ko: {
    seoTitle: "문의하기 | FOREACH",
    seoDescription:
      "제품 선정, 기술 지원, 샘플 테스트, 도면 요청, BOM 검토 및 마이크로플루이딕 시스템 프로젝트 상담을 위해 FOREACH에 문의하세요.",

    heroTitlePrefix: "FOREACH에 문의하여",
    heroHighlightText: "제품 선정",
    heroTitleSuffix: "및 기술 지원을 받으세요",
    heroImageAlt:
      "FOREACH 마이크로플루이딕 제품 기술 상담 및 프로젝트 지원",
    heroSupportButton: "지원 보기",
    heroFormButton: "문의 제출",

    supportTitle: "지원 항목",
    supportDescription:
      "FOREACH는 초기 평가부터 프로젝트 도입까지 제품 선정, 자료 요청, 샘플 테스트, 솔루션 상담, 맞춤 요구 및 애프터서비스를 지원합니다.",
    supportItems: [
      {
        title: "제품 선정 지원",
        description:
          "유량, 압력, 유체, 인터페이스, 수명, 제어 방식 및 설치 요구에 따라 적합한 제품을 추천합니다.",
        requestType: "기술 및 선정 지원",
      },
      {
        title: "자료 및 도면 요청",
        description:
          "데이터시트, 제품 카탈로그, 설치 치수, 인터페이스 정보 및 선정 자료를 요청할 수 있습니다.",
        requestType: "자료 및 도면 요청",
      },
      {
        title: "샘플 테스트 지원",
        description:
          "샘플 검증, 파라미터 확인 및 애플리케이션 테스트 피드백을 지원하여 초기 선정 리스크를 줄입니다.",
        requestType: "샘플 테스트 요청",
      },
      {
        title: "유체 솔루션 상담",
        description:
          "펌프, 밸브, 튜빙, 센서 및 기타 유체 부품의 조합을 함께 검토합니다.",
        requestType: "기술 및 선정 지원",
      },
      {
        title: "맞춤 요구 상담",
        description:
          "구조, 인터페이스, 재료 및 제어 방식 등 특수 요구의 실현 가능성을 상담합니다.",
        requestType: "제품 문의 및 견적",
      },
      {
        title: "애프터서비스 지원",
        description:
          "설치, 사용, 유지보수 제안, 문제 피드백 및 품질 처리를 지원합니다.",
        requestType: "애프터서비스 및 품질 피드백",
      },
    ],

    formTitle: "문의 제출",
    formDescription:
      "애플리케이션 시나리오, 대상 제품, 주요 파라미터, 현재 프로젝트 단계 및 첨부 파일을 입력해 주시면 요청을 빠르게 평가하고 후속 대응을 진행하겠습니다.",
    formPanelTitle: "문의 제출 양식",
    fileTip:
      "도면, PDF, BOM, 이미지 및 기타 문서를 지원합니다. 각 파일은 20 MB를 초과하지 않아야 합니다.",
    submitButton: "문의 제출",
    uploadButton: "파일 업로드",

    emailLabel: "이메일",
    emailPlaceholder: "이메일 주소를 입력하세요",
    emailSendButton: "코드 전송",
    emailCodePlaceholder: "인증 코드를 입력하세요",
    emailVerifyButton: "인증",
    emailTip: "이메일 인증이 필요합니다.",
    emailCodeSentTip: "인증 코드가 전송되었습니다. 테스트 코드: ",
    emailInvalidCodeTip: "인증 코드가 올바르지 않습니다. 테스트 코드: ",
    emailVerifiedTip: "이메일 인증이 완료되었습니다.",

    nameLabel: "이름",
    namePlaceholder: "이름을 입력하세요",
    companyLabel: "회사명",
    companyPlaceholder: "회사명을 입력하세요",
    phoneLabel: "전화 / WhatsApp",
    phonePlaceholder: "빠른 연락을 위한 선택 입력 항목입니다",
    targetModelLabel: "특정 모델 / 경쟁사 모델",
    targetModelPlaceholder: "대체하려는 모델 또는 경쟁사 모델",
    messageLabel: "요구사항 설명",
    messagePlaceholder:
      "애플리케이션 시나리오, 대상 제품, 주요 파라미터 또는 자료 요청 내용을 입력하세요.",

    requestTypeLabel: "요청 유형",
    productTypeLabel: "대상 제품 / 부품 유형",
    projectStageLabel: "현재 단계",

    productTypePlaceholder: "주요 제품 유형을 선택하세요",
    projectStagePlaceholder: "현재 단계를 선택하세요",

    removeFile: "삭제",
    emailVerifiedButton: "인증 완료",
    resendCountdownSuffix: "초 후 재전송",
    retryCountdownSuffix: "초 후 재시도",

    emailRequiredAlert: "먼저 이메일 주소를 입력하세요.",
    invalidEmailAlert: "올바른 이메일 주소를 입력하세요.",
    sendCodeFirstAlert: "먼저 이메일 인증 코드를 전송하세요.",
    codeRequiredAlert: "이메일 인증 코드를 입력하세요.",
    verifyEmailFirstAlert:
      "제출 전에 인증 버튼을 클릭하여 이메일 인증을 완료하세요.",
    popupBlockedAlert:
      "브라우저가 새 창을 차단했습니다. 팝업을 허용한 후 다시 제출하세요.",
    fileTooLargePrefix: "파일 “",
    fileTooLargeSuffix: "”의 크기가 20 MB를 초과합니다. 다른 파일을 선택하세요.",

    mapLoading: "지도를 불러오는 중...",
    mapError:
      "지도를 일시적으로 사용할 수 없습니다. 지도 키, 도메인 화이트리스트 또는 네트워크 상태를 확인하세요.",
    openMap: "Amap 열기",

    successTitle: "제출 완료",
    successDescription:
      "문의가 접수되었습니다. 영업일 기준 24시간 이내에 답변드리겠습니다.",
    successPdfTip:
      "PDF 미리보기 창이 열렸다면 브라우저 안내에 따라 요청서를 저장하거나 인쇄할 수 있습니다.",
    successCloseButton: "확인",

    pdfDocumentTitle: "문의 요청서",
    pdfDocumentSubtitle: "고객 요구사항 정보 확인 양식입니다.",
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
    pdfFooterNote:
      "이 파일은 요구사항 상담, 내부 후속 조치 및 문서 보관에 사용됩니다.",
    pdfPrintTip: "PDF 요청서로 저장할 수 있습니다.",

    requestTypes: [
      "제품 문의 및 견적",
      "자료 및 도면 요청",
      "기술 및 선정 지원",
      "샘플 테스트 요청",
      "애프터서비스 및 품질 피드백",
      "기타 요청",
    ],

    productGroups: [
      {
        groupName: "펌프 제품",
        options: [
          "다이어프램 펌프",
          "시린지 펌프",
          "피펫팅 펌프",
          "세라믹 피스톤 펌프",
        ],
      },
      {
        groupName: "밸브 제품",
        options: [
          "솔레노이드 밸브",
          "핀치 밸브",
          "로터리 밸브",
          "고압 밸브",
        ],
      },
      {
        groupName: "센서 및 유체 부품",
        options: [
          "압력 센서",
          "기포 감지기",
          "전도도 / TDS 모듈",
          "튜빙 / 피팅 / 샘플링 프로브",
        ],
      },
      {
        groupName: "기타",
        options: ["잘 모르겠음, 지원 필요", "기타 제품 또는 맞춤 요구"],
      },
    ],

    projectStages: [
      "선정 평가",
      "샘플 테스트",
      "프로젝트 개발",
      "양산 도입",
      "자료 요청",
      "애프터서비스 피드백",
      "기타 단계",
    ],

    guideTitle: "작성 안내",
    guideDescription:
      "제품 방향과 지원 방식을 빠르게 평가할 수 있도록 아래 정보를 함께 입력하는 것을 권장합니다.",
    guideItems: [
      {
        title: "애플리케이션 시나리오",
        description:
          "예: IVD, 생명과학, 분석 장비, 실험실 자동화, 합성생물학 등",
      },
      {
        title: "대상 제품",
        description:
          "예: 다이어프램 펌프, 시린지 펌프, 피펫팅 펌프, 피스톤 펌프, 솔레노이드 밸브, 로터리 밸브, 센서 등",
      },
      {
        title: "주요 파라미터",
        description:
          "유체, 유량, 압력, 인터페이스, 크기, 수명, 제어 방식, 설치 공간 등을 포함합니다.",
      },
      {
        title: "현재 단계",
        description:
          "예: 선정 평가, 샘플 테스트, 프로젝트 개발, 양산 도입, 자료 요청 또는 애프터서비스 피드백",
      },
      {
        title: "첨부 파일",
        description:
          "도면, PDF 사양서, BOM, 현장 사진 또는 경쟁사 모델 정보가 있다면 함께 업로드할 수 있습니다.",
      },
    ],
    guideNote:
      "아직 완전한 파라미터가 없다면 장비 애플리케이션과 원하는 기능을 먼저 설명해도 됩니다.",

    contactInfoTitle: "연락처 정보",
    contactInfoDescription:
      "직접 상담을 원하시면 전화 또는 이메일로 연락하시거나, 주소 정보를 통해 방문 위치를 확인할 수 있습니다.",
    companyName: "Shenzhen Foreach Technology Co., Ltd.",
    companyPosition:
      "핵심 마이크로플루이딕 부품 및 유체 시스템 솔루션 공급업체",
    contactRows: [
      {
        label: "전화",
        value: "0755-8655 3831",
      },
      {
        label: "이메일",
        value: "sales@foreachtek.com",
      },
      {
        label: "웹사이트",
        value: "www.foreachtek.com",
      },
      {
        label: "주소",
        value:
          "13th Floor, Building 2, Yufengda Industrial Park, No.1008 Guangqiao Avenue, Guangming District, Shenzhen, China",
      },
      {
        label: "업무 시간",
        value: "월요일 - 금요일 08:30 - 18:00",
      },
    ],
    mapTitle: "회사 위치",
    mapAddress:
      "13th Floor, Building 2, Yufengda Industrial Park, No.1008 Guangqiao Avenue, Guangming District, Shenzhen, China",

    bottomCtaTitle: "제품 선정 또는 기술 지원이 필요하신가요?",
    bottomCtaDescription:
      "애플리케이션 시나리오와 제품 요구사항을 제출하시면 적합한 제품 방향을 평가해 드립니다.",
    bottomCtaFormButton: "문의 제출",
    bottomCtaContactButton: "연락처 보기",
  },

  ru: {
    seoTitle: "Свяжитесь с нами | FOREACH",
    seoDescription:
      "Свяжитесь с FOREACH по вопросам подбора продукции, технической поддержки, испытания образцов, запроса чертежей, проверки BOM и микрофлюидных проектов.",

    heroTitlePrefix: "Свяжитесь с FOREACH для",
    heroHighlightText: "подбора продукции",
    heroTitleSuffix: "и технической поддержки",
    heroImageAlt:
      "Техническая коммуникация и поддержка проектов микрофлюидной продукции FOREACH",
    heroSupportButton: "Посмотреть поддержку",
    heroFormButton: "Отправить запрос",

    supportTitle: "Варианты поддержки",
    supportDescription:
      "FOREACH предоставляет поддержку от первичной оценки до внедрения проекта, включая подбор продукции, запрос документов, испытания образцов, обсуждение решений, кастомизацию и послепродажную обратную связь.",
    supportItems: [
      {
        title: "Поддержка подбора продукции",
        description:
          "Мы рекомендуем подходящие продукты с учетом расхода, давления, среды, интерфейса, срока службы, метода управления и требований к установке.",
        requestType: "Техническая поддержка и подбор",
      },
      {
        title: "Запрос документов и чертежей",
        description:
          "Запросите технические паспорта, каталоги, установочные размеры, информацию об интерфейсах и материалы для подбора.",
        requestType: "Запрос документов и чертежей",
      },
      {
        title: "Поддержка испытания образцов",
        description:
          "Мы поддерживаем проверку образцов, подтверждение параметров и обратную связь по прикладным испытаниям.",
        requestType: "Запрос испытания образцов",
      },
      {
        title: "Обсуждение флюидного решения",
        description:
          "Обсуждаем сочетание насосов, клапанов, трубок, датчиков и других флюидных компонентов.",
        requestType: "Техническая поддержка и подбор",
      },
      {
        title: "Обсуждение индивидуальных требований",
        description:
          "Оцениваем реализуемость специальных требований к конструкции, интерфейсу, материалам и методам управления.",
        requestType: "Запрос продукта и цены",
      },
      {
        title: "Послепродажная поддержка",
        description:
          "Предоставляем поддержку по установке, эксплуатации, обслуживанию, обратной связи по проблемам и качеству.",
        requestType: "Послепродажная поддержка и качество",
      },
    ],

    formTitle: "Отправить запрос",
    formDescription:
      "Укажите сценарий применения, целевой продукт, ключевые параметры, текущий этап проекта и вложения, чтобы мы могли быстро оценить ваш запрос.",
    formPanelTitle: "Форма запроса",
    fileTip:
      "Поддерживаются чертежи, PDF, BOM, изображения и другие документы. Каждый файл не должен превышать 20 MB.",
    submitButton: "Отправить запрос",
    uploadButton: "Загрузить файлы",

    emailLabel: "E-mail",
    emailPlaceholder: "Введите адрес e-mail",
    emailSendButton: "Отправить код",
    emailCodePlaceholder: "Введите код подтверждения",
    emailVerifyButton: "Проверить",
    emailTip: "Требуется подтверждение e-mail.",
    emailCodeSentTip: "Код подтверждения отправлен. Тестовый код: ",
    emailInvalidCodeTip: "Неверный код подтверждения. Тестовый код: ",
    emailVerifiedTip: "E-mail подтвержден.",

    nameLabel: "Имя",
    namePlaceholder: "Введите ваше имя",
    companyLabel: "Компания",
    companyPlaceholder: "Введите название компании",
    phoneLabel: "Телефон / WhatsApp",
    phonePlaceholder: "Необязательно, для более быстрой связи",
    targetModelLabel: "Модель / модель конкурента",
    targetModelPlaceholder: "Модель или модель конкурента для замены",
    messageLabel: "Описание требований",
    messagePlaceholder:
      "Опишите сценарий применения, целевой продукт, ключевые параметры или запрос документов.",

    requestTypeLabel: "Тип запроса",
    productTypeLabel: "Целевой продукт / компонент",
    projectStageLabel: "Текущий этап",

    productTypePlaceholder: "Выберите основной тип продукта",
    projectStagePlaceholder: "Выберите текущий этап",

    removeFile: "Удалить",
    emailVerifiedButton: "Подтверждено",
    resendCountdownSuffix: "с до повторной отправки",
    retryCountdownSuffix: "с до повторной попытки",

    emailRequiredAlert: "Сначала введите адрес e-mail.",
    invalidEmailAlert: "Введите корректный адрес e-mail.",
    sendCodeFirstAlert: "Сначала отправьте код подтверждения на e-mail.",
    codeRequiredAlert: "Введите код подтверждения.",
    verifyEmailFirstAlert:
      "Перед отправкой нажмите Проверить и завершите подтверждение e-mail.",
    popupBlockedAlert:
      "Браузер заблокировал новое окно. Разрешите всплывающие окна и отправьте снова.",
    fileTooLargePrefix: "Файл «",
    fileTooLargeSuffix: "» превышает 20 MB. Выберите другой файл.",

    mapLoading: "Загрузка карты...",
    mapError:
      "Карта временно недоступна. Проверьте ключ карты, белый список домена или состояние сети.",
    openMap: "Открыть Amap",

    successTitle: "Запрос отправлен",
    successDescription:
      "Мы получили ваш запрос и ответим в течение 24 часов в рабочие дни.",
    successPdfTip:
      "Если окно предварительного просмотра PDF открылось, вы можете сохранить или распечатать форму согласно подсказкам браузера.",
    successCloseButton: "Понятно",

    pdfDocumentTitle: "Форма контактного запроса",
    pdfDocumentSubtitle:
      "Форма подтверждения информации о требованиях клиента.",
    pdfRequestNumber: "№ запроса",
    pdfCreatedAt: "Создано",
    pdfSource: "Источник",
    pdfSourceValue: "Контактная форма сайта",
    pdfCustomerInfo: "1. Информация о клиенте",
    pdfRequirementInfo: "2. Информация о требованиях",
    pdfRequirementDescription: "3. Описание требований",
    pdfAttachmentList: "4. Список вложений",
    pdfNotFilled: "Не заполнено",
    pdfNotSelected: "Не выбрано",
    pdfNoAttachment: "Вложения не загружены",
    pdfIndex: "№",
    pdfAttachmentName: "Имя файла",
    pdfAttachmentType: "Тип",
    pdfAttachmentSize: "Размер",
    pdfFooterNote:
      "Этот файл используется для коммуникации по требованиям, внутреннего сопровождения и архивирования документов.",
    pdfPrintTip: "Можно сохранить как PDF-форму запроса.",

    requestTypes: [
      "Запрос продукта и цены",
      "Запрос документов и чертежей",
      "Техническая поддержка и подбор",
      "Запрос испытания образцов",
      "Послепродажная поддержка и качество",
      "Другой запрос",
    ],

    productGroups: [
      {
        groupName: "Насосы",
        options: [
          "Мембранный насос",
          "Шприцевой насос",
          "Пипетирующий насос",
          "Керамический поршневой насос",
        ],
      },
      {
        groupName: "Клапаны",
        options: [
          "Соленоидный клапан",
          "Пережимной клапан",
          "Поворотный клапан",
          "Клапан высокого давления",
        ],
      },
      {
        groupName: "Датчики и флюидные компоненты",
        options: [
          "Датчик давления",
          "Детектор пузырьков",
          "Модуль проводимости / TDS",
          "Трубки / фитинги / пробоотборная игла",
        ],
      },
      {
        groupName: "Другое",
        options: [
          "Не уверен, нужна поддержка",
          "Другой продукт или индивидуальное требование",
        ],
      },
    ],

    projectStages: [
      "Оценка подбора",
      "Испытание образцов",
      "Разработка проекта",
      "Внедрение в массовое производство",
      "Запрос документов",
      "Послепродажная обратная связь",
      "Другой этап",
    ],

    guideTitle: "Рекомендации по заполнению",
    guideDescription:
      "Рекомендуем указать следующую информацию, чтобы мы могли быстро оценить направление продукта и способ поддержки.",
    guideItems: [
      {
        title: "Сценарий применения",
        description:
          "Например: IVD, науки о жизни, аналитические приборы, лабораторная автоматизация, синтетическая биология и т. д.",
      },
      {
        title: "Целевой продукт",
        description:
          "Например: мембранный насос, шприцевой насос, пипетирующий насос, поршневой насос, соленоидный клапан, поворотный клапан, датчик и т. д.",
      },
      {
        title: "Ключевые параметры",
        description:
          "Укажите среду, расход, давление, интерфейс, размеры, срок службы, метод управления, монтажное пространство и т. д.",
      },
      {
        title: "Текущий этап",
        description:
          "Например: оценка подбора, испытание образцов, разработка проекта, внедрение в производство, запрос документов или послепродажная обратная связь.",
      },
      {
        title: "Вложения",
        description:
          "Если у вас есть чертежи, PDF-спецификации, BOM, фото объекта или данные моделей конкурентов, вы можете загрузить их вместе.",
      },
    ],
    guideNote:
      "Если у вас пока нет полных параметров, сначала опишите применение оборудования и желаемую функцию.",

    contactInfoTitle: "Контактная информация",
    contactInfoDescription:
      "Для прямой связи вы можете связаться с нами по телефону или e-mail, либо использовать адрес для уточнения места визита.",
    companyName: "Shenzhen Foreach Technology Co., Ltd.",
    companyPosition:
      "Поставщик ключевых микрофлюидных компонентов и решений для флюидных систем",
    contactRows: [
      {
        label: "Тел.",
        value: "0755-8655 3831",
      },
      {
        label: "E-mail",
        value: "sales@foreachtek.com",
      },
      {
        label: "Сайт",
        value: "www.foreachtek.com",
      },
      {
        label: "Адрес",
        value:
          "13th Floor, Building 2, Yufengda Industrial Park, No.1008 Guangqiao Avenue, Guangming District, Shenzhen, China",
      },
      {
        label: "Рабочие часы",
        value: "Понедельник - пятница 08:30 - 18:00",
      },
    ],
    mapTitle: "Местоположение компании",
    mapAddress:
      "13th Floor, Building 2, Yufengda Industrial Park, No.1008 Guangqiao Avenue, Guangming District, Shenzhen, China",

    bottomCtaTitle: "Нужен подбор продукта или техническая поддержка?",
    bottomCtaDescription:
      "Отправьте сценарий применения и требования к продукту, и мы поможем оценить подходящее направление продукта.",
    bottomCtaFormButton: "Отправить запрос",
    bottomCtaContactButton: "Контактная информация",
  },
};

/* =========================================================
   外语联系页按钮链接修正函数

   作用：
   1. 中文 contact.zh.ts 里的按钮 href 可能是 /contact#xxx
   2. 外语页面不能继续跳回中文 /contact
   3. 这里自动把按钮改成 /en/contact#xxx、/es/contact#xxx 等

   示例：
   原始 href: /contact#contact-form
   英文页面: /en/contact#contact-form
   西语页面: /es/contact#contact-form
========================================================= */

function buildIntlContactHref(locale: ContactIntlLocaleCode, href: string) {
  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";

  return `/${locale}/contact${hash}`;
}

/* =========================================================
   根据顺序替换支持项

   说明：
   1. 保留中文数据中的 key 等结构字段
   2. 只替换外语页面需要显示的 title / description / requestType
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

   说明：
   1. 页面入口 app/[locale]/contact/page.tsx 会调用这个函数
   2. 根据 locale 返回对应语言页面数据
   3. 中文页面不要调用这个函数，中文仍然使用 contactZhData
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
          href: buildIntlContactHref(
            locale,
            contactZhData.hero.buttons.support.href,
          ),
        },
        form: {
          ...contactZhData.hero.buttons.form,
          label: text.heroFormButton,
          href: buildIntlContactHref(locale, contactZhData.hero.buttons.form.href),
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
          href: buildIntlContactHref(
            locale,
            contactZhData.bottomCta.buttons.form.href,
          ),
        },
        contact: {
          ...contactZhData.bottomCta.buttons.contact,
          label: text.bottomCtaContactButton,
          href: buildIntlContactHref(
            locale,
            contactZhData.bottomCta.buttons.contact.href,
          ),
        },
      },
    },
  };
} 