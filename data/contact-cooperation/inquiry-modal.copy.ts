import type { LocaleCode } from "@/lib/i18n";

type InquiryModalCopy = {
  title: string;
  description: string;
  closeLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
};

export const inquiryModalCopy: Record<LocaleCode, InquiryModalCopy> = {
  "zh-CN": {
    title: "联系我们",
    description: "请留下联系方式并说明您的需求，我们会安排相关人员与您沟通。",
    closeLabel: "关闭联系我们",
    messageLabel: "问题描述",
    messagePlaceholder: "请描述产品型号、介质、运行条件和问题现象，也可以上传现场照片或相关文件。",
  },
  en: {
    title: "Contact us",
    description: "Leave your contact details and tell us what you need. Our team will get in touch with you.",
    closeLabel: "Close contact form",
    messageLabel: "Issue description",
    messagePlaceholder: "Include the product model, fluid, operating conditions and symptoms. You can also attach photos or relevant documents.",
  },
  es: {
    title: "Contacto",
    description: "Deje sus datos de contacto y describa lo que necesita. Nuestro equipo se pondrá en contacto con usted.",
    closeLabel: "Cerrar formulario de contacto",
    messageLabel: "Descripción del problema",
    messagePlaceholder: "Indique el modelo, el fluido, las condiciones de funcionamiento y los síntomas. También puede adjuntar fotos o documentos pertinentes.",
  },
  fr: {
    title: "Nous contacter",
    description: "Laissez vos coordonnées et précisez votre demande. Notre équipe vous contactera.",
    closeLabel: "Fermer le formulaire de contact",
    messageLabel: "Description du problème",
    messagePlaceholder: "Précisez le modèle, le fluide, les conditions de fonctionnement et les symptômes. Vous pouvez joindre des photos ou des documents utiles.",
  },
  ko: {
    title: "문의하기",
    description: "연락처와 요청 내용을 남겨 주세요. 담당자가 연락드리겠습니다.",
    closeLabel: "문의 양식 닫기",
    messageLabel: "문제 설명",
    messagePlaceholder: "제품 모델, 유체, 운전 조건 및 증상을 기재해 주세요. 현장 사진이나 관련 문서도 첨부할 수 있습니다.",
  },
  ru: {
    title: "Свяжитесь с нами",
    description: "Оставьте контактные данные и опишите ваш запрос. Наш специалист свяжется с вами.",
    closeLabel: "Закрыть форму обращения",
    messageLabel: "Описание проблемы",
    messagePlaceholder: "Укажите модель, рабочую среду, условия эксплуатации и признаки неисправности. Можно приложить фотографии и необходимые документы.",
  },
};
