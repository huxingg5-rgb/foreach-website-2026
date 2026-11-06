/* =========================================================
   medica-2026-booking.ts
   恒永达官网｜MEDICA 2026 现场洽谈预约表单文案（6 种语言）

   说明：
   1. 快速预约：姓名* / 邮箱* / 联系方式（选填）/ 留言（选填）/ 上传附件 / 发送
   2. 提交到 /api/inquiry/booking（不需要公司、不需要邮箱验证码）
   3. 产品 key 与后端 lib/cloudflare/booking.ts 共用一份
========================================================= */

import {
  BOOKING_PRODUCTS,
  type BookingProduct,
} from "@/lib/cloudflare/booking";

export type MedicaBookingLocale = "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

export const MEDICA_BOOKING_FORM_ID = "medica_2026_booking_form";
export const MEDICA_BOOKING_ANCHOR_ID = "medica-booking";

/* 产品系列 key 与后端共用 */
export const MEDICA_BOOKING_PRODUCTS = BOOKING_PRODUCTS;
export type MedicaBookingProduct = BookingProduct;

export type MedicaBookingCopy = {
  title: string;
  subtitle: string;
  name: string;
  namePlaceholder: string;
  contact: string;
  contactPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  products: string;
  productsPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  /** 附件按钮 */
  attach: string;
  /** 附件说明 */
  attachTip: string;
  /** 删除已选附件（读屏用） */
  removeFile: string;
  productLabels: Record<MedicaBookingProduct, string>;
  submit: string;
  submitting: string;
  privacyPrefix: string;
  privacyLink: string;
  privacyHref: string;
  messages: {
    nameRequired: string;
    emailInvalid: string;
    productsRequired: string;
    tooFrequent: string;
    closed: string;
    submitSuccess: string;
    submitFailed: string;
    attachmentInvalid: string;
  };
};

export const MEDICA_BOOKING_COPY: Record<MedicaBookingLocale, MedicaBookingCopy> = {
  "zh-CN": {
    title: "预约现场洽谈",
    subtitle: "MEDICA 2026 · 展位 1H39-1 · 11\u00a0月\u00a016\u00a0–\u2060\u00a019\u00a0日", // 日期用不换行空格，窄屏不拆行
    name: "姓名",
    namePlaceholder: "请输入姓名",
    contact: "联系方式（选填）",
    contactPlaceholder: "电话 / WhatsApp / 微信",
    email: "邮箱",
    emailPlaceholder: "name@company.com",
    products: "感兴趣产品",
    productsPlaceholder: "请选择",
    message: "留言（选填）",
    messagePlaceholder: "例如：想了解的型号、样品需求或方便洽谈的时间",
    attach: "上传附件",
    attachTip: "支持图纸、PDF、图片等，最多 5 个，合计不超过 20 MB",
    removeFile: "删除",
    productLabels: {
      pumps: "泵系列",
      valves: "阀系列",
      probes: "针系列",
      fittings: "接头系列",
      tubing: "管路系列",
      "smart-control": "智控系列",
      other: "其他 / 不确定",
    },
    submit: "发送",
    submitting: "发送中…",
    privacyPrefix: "提交即表示同意",
    privacyLink: "隐私政策",
    privacyHref: "/privacy-policy",
    messages: {
      nameRequired: "请填写姓名。",
      emailInvalid: "请填写有效的邮箱地址。",
      productsRequired: "请选择感兴趣的产品。",
      tooFrequent: "发送太频繁，请稍后再试。",
      closed: "展会预约已暂停，如需联系请访问「联系我们」页面。",
      submitSuccess: "预约已收到，我们会尽快通过邮件与您确认洽谈时间。",
      submitFailed: "发送失败，请稍后重试，或直接致电 0755-8655 3831。",
      attachmentInvalid: "附件不符合要求：最多 5 个，合计不超过 20 MB，支持 PDF、Office、图片、压缩包、DXF/DWG。",
    },
  },
  en: {
    title: "Book a Meeting",
    subtitle: "MEDICA 2026 · Booth 1H39-1 · Nov 16–19",
    name: "Name",
    namePlaceholder: "Your name",
    contact: "Phone / WhatsApp (optional)",
    contactPlaceholder: "Phone, WhatsApp or WeChat",
    email: "Email",
    emailPlaceholder: "name@company.com",
    products: "Products of interest",
    productsPlaceholder: "Select a product",
    message: "Message (optional)",
    messagePlaceholder: "e.g. models of interest, sample needs or a preferred meeting time",
    attach: "Attach files",
    attachTip: "Drawings, PDFs, images, etc. Up to 5 files, 20 MB in total.",
    removeFile: "Remove",
    productLabels: {
      pumps: "Pumps",
      valves: "Valves",
      probes: "Probes",
      fittings: "Fittings",
      tubing: "Tubing",
      "smart-control": "Smart Control",
      other: "Other / not sure",
    },
    submit: "Send",
    submitting: "Sending…",
    privacyPrefix: "By sending, you agree to our",
    privacyLink: "Privacy Policy",
    privacyHref: "/en/privacy-policy",
    messages: {
      nameRequired: "Please enter your name.",
      emailInvalid: "Please enter a valid email address.",
      productsRequired: "Please select a product of interest.",
      tooFrequent: "Too many requests. Please wait a moment.",
      closed: "Booking is currently closed. Please reach us via the Contact page.",
      submitSuccess: "Thank you. We will email you shortly to confirm a meeting time.",
      submitFailed: "Sending failed. Please try again later.",
      attachmentInvalid: "Attachment not accepted: up to 5 files, 20 MB in total; PDF, Office, image, ZIP/RAR or DXF/DWG only.",
    },
  },
  es: {
    title: "Reserve una reunión",
    subtitle: "MEDICA 2026 · Stand 1H39-1 · 16–19 de noviembre",
    name: "Nombre",
    namePlaceholder: "Su nombre",
    contact: "Teléfono / WhatsApp (opcional)",
    contactPlaceholder: "Teléfono, WhatsApp o WeChat",
    email: "Correo electrónico",
    emailPlaceholder: "nombre@empresa.com",
    products: "Productos de interés",
    productsPlaceholder: "Seleccione un producto",
    message: "Mensaje (opcional)",
    messagePlaceholder: "p. ej., modelos de interés, muestras o la hora preferida para la reunión",
    attach: "Adjuntar archivos",
    attachTip: "Planos, PDF, imágenes, etc. Hasta 5 archivos, 20 MB en total.",
    removeFile: "Eliminar",
    productLabels: {
      pumps: "Bombas",
      valves: "Válvulas",
      probes: "Sondas",
      fittings: "Racores",
      tubing: "Tubos",
      "smart-control": "Control inteligente",
      other: "Otro / no lo sé",
    },
    submit: "Enviar",
    submitting: "Enviando…",
    privacyPrefix: "Al enviar, acepta nuestra",
    privacyLink: "Política de privacidad",
    privacyHref: "/es/privacy-policy",
    messages: {
      nameRequired: "Introduzca su nombre.",
      emailInvalid: "Introduzca un correo electrónico válido.",
      productsRequired: "Seleccione un producto de interés.",
      tooFrequent: "Demasiadas solicitudes. Espere un momento.",
      closed: "Las reservas están cerradas. Contáctenos desde la página de contacto.",
      submitSuccess: "Gracias. Le escribiremos en breve para confirmar la hora de la reunión.",
      submitFailed: "No se pudo enviar. Inténtelo de nuevo más tarde.",
      attachmentInvalid: "Archivo no admitido: hasta 5 archivos y 20 MB en total; solo PDF, Office, imágenes, ZIP/RAR o DXF/DWG.",
    },
  },
  fr: {
    title: "Prendre rendez-vous",
    subtitle: "MEDICA 2026 · Stand 1H39-1 · 16–19 novembre",
    name: "Nom",
    namePlaceholder: "Votre nom",
    contact: "Téléphone / WhatsApp (facultatif)",
    contactPlaceholder: "Téléphone, WhatsApp ou WeChat",
    email: "E-mail",
    emailPlaceholder: "nom@societe.com",
    products: "Produits concernés",
    productsPlaceholder: "Sélectionnez un produit",
    message: "Message (facultatif)",
    messagePlaceholder: "ex. : modèles concernés, besoin d’échantillons ou créneau souhaité",
    attach: "Joindre des fichiers",
    attachTip: "Plans, PDF, images, etc. 5 fichiers max., 20 MB au total.",
    removeFile: "Supprimer",
    productLabels: {
      pumps: "Pompes",
      valves: "Vannes",
      probes: "Sondes",
      fittings: "Raccords",
      tubing: "Tubes",
      "smart-control": "Contrôle intelligent",
      other: "Autre / je ne sais pas",
    },
    submit: "Envoyer",
    submitting: "Envoi…",
    privacyPrefix: "En envoyant, vous acceptez notre",
    privacyLink: "Politique de confidentialité",
    privacyHref: "/fr/privacy-policy",
    messages: {
      nameRequired: "Veuillez saisir votre nom.",
      emailInvalid: "Veuillez saisir une adresse e-mail valide.",
      productsRequired: "Veuillez sélectionner un produit.",
      tooFrequent: "Trop de demandes. Patientez un instant.",
      closed: "Les réservations sont fermées. Contactez-nous via la page Contact.",
      submitSuccess: "Merci. Nous vous écrirons rapidement pour confirmer l’heure du rendez-vous.",
      submitFailed: "Échec de l’envoi. Veuillez réessayer plus tard.",
      attachmentInvalid: "Pièce jointe refusée : 5 fichiers max., 20 MB au total ; PDF, Office, images, ZIP/RAR ou DXF/DWG uniquement.",
    },
  },
  ko: {
    title: "현장 미팅 예약",
    subtitle: "MEDICA 2026 · 부스 1H39-1 · 11월 16–19일",
    name: "이름",
    namePlaceholder: "이름을 입력하세요",
    contact: "연락처 (선택)",
    contactPlaceholder: "전화 / WhatsApp / WeChat",
    email: "이메일",
    emailPlaceholder: "name@company.com",
    products: "관심 제품",
    productsPlaceholder: "제품을 선택하세요",
    message: "메시지 (선택)",
    messagePlaceholder: "예: 관심 모델, 샘플 요청, 희망 미팅 시간",
    attach: "파일 첨부",
    attachTip: "도면, PDF, 이미지 등 최대 5개, 합계 20 MB 이하",
    removeFile: "삭제",
    productLabels: {
      pumps: "펌프",
      valves: "밸브",
      probes: "프로브",
      fittings: "피팅",
      tubing: "튜빙",
      "smart-control": "스마트 제어",
      other: "기타 / 미정",
    },
    submit: "보내기",
    submitting: "전송 중…",
    privacyPrefix: "보내기를 누르면 다음에 동의하게 됩니다:",
    privacyLink: "개인정보 처리방침",
    privacyHref: "/ko/privacy-policy",
    messages: {
      nameRequired: "이름을 입력해 주세요.",
      emailInvalid: "올바른 이메일 주소를 입력해 주세요.",
      productsRequired: "관심 제품을 선택해 주세요.",
      tooFrequent: "요청이 너무 잦습니다. 잠시 후 다시 시도해 주세요.",
      closed: "현재 예약이 마감되었습니다. 문의 페이지를 통해 연락해 주세요.",
      submitSuccess: "감사합니다. 미팅 시간을 확정하기 위해 곧 이메일로 연락드리겠습니다.",
      submitFailed: "전송에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      attachmentInvalid: "첨부 파일을 확인해 주세요: 최대 5개, 합계 20 MB 이하, PDF·Office·이미지·ZIP/RAR·DXF/DWG만 가능합니다.",
    },
  },
  ru: {
    title: "Записаться на встречу",
    subtitle: "MEDICA 2026 · Стенд 1H39-1 · 16–19 ноября",
    name: "Имя",
    namePlaceholder: "Ваше имя",
    contact: "Телефон / WhatsApp (необязательно)",
    contactPlaceholder: "Телефон, WhatsApp или WeChat",
    email: "E-mail",
    emailPlaceholder: "name@company.com",
    products: "Интересующие продукты",
    productsPlaceholder: "Выберите продукт",
    message: "Сообщение (необязательно)",
    messagePlaceholder: "Например: интересующие модели, образцы или удобное время встречи",
    attach: "Прикрепить файлы",
    attachTip: "Чертежи, PDF, изображения и др. До 5 файлов, не более 20 MB в сумме.",
    removeFile: "Удалить",
    productLabels: {
      pumps: "Насосы",
      valves: "Клапаны",
      probes: "Зонды",
      fittings: "Фитинги",
      tubing: "Трубки",
      "smart-control": "Интеллектуальное управление",
      other: "Другое / не знаю",
    },
    submit: "Отправить",
    submitting: "Отправка…",
    privacyPrefix: "Отправляя форму, вы соглашаетесь с",
    privacyLink: "Политикой конфиденциальности",
    privacyHref: "/ru/privacy-policy",
    messages: {
      nameRequired: "Укажите ваше имя.",
      emailInvalid: "Укажите корректный e-mail.",
      productsRequired: "Выберите интересующий продукт.",
      tooFrequent: "Слишком много запросов. Подождите немного.",
      closed: "Запись сейчас закрыта. Свяжитесь с нами через страницу «Контакты».",
      submitSuccess: "Спасибо. Мы скоро напишем вам, чтобы согласовать время встречи.",
      submitFailed: "Не удалось отправить. Попробуйте позже.",
      attachmentInvalid: "Файл не принят: до 5 файлов, не более 20 MB в сумме; только PDF, Office, изображения, ZIP/RAR или DXF/DWG.",
    },
  },
};
