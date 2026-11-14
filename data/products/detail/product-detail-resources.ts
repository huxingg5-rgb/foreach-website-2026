import { datasheetEnItems } from "../../resources/datasheets.en";
import { datasheetZhItems } from "../../resources/datasheets.zh";
import { getAssemblyEntryPreset } from "../configurator/tubing-assembly-entry";
import { isTubingMaterial } from "../selection/tubing-selection-routes";

export const PRODUCT_DETAIL_RESOURCE_LOCALES = [
  "zh",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

export type ProductDetailResourceLocale =
  (typeof PRODUCT_DETAIL_RESOURCE_LOCALES)[number];

export type ProductDatasheet = {
  id: string;
  file: string;
  shortTitle: string;
  title: string;
  language?: "en" | "zh";
  kind?: "datasheet" | "catalog";
};

export const PRODUCT_CATALOG_EN = {
  id: "foreach-product-catalog-en",
  file: "/downloads/resources/catalogs/en/EN-B0BED2006-JIAN.pdf",
  title: "FOREACH Full Product Catalog (English)",
};

/*
 * Products store only a datasheetId. The registry owns the real PDF path and
 * title, so one series document can be shared by several product records and
 * a product-specific document can be added without changing the UI layer.
 */
export const PRODUCT_DATASHEETS: Record<string, ProductDatasheet> = {
  "sv10-series-en": {
    id: "sv10-series-en",
    file: datasheetEnItems.find(item => item.id === "6010-solenoid-valve")!.downloadHref!,
    shortTitle: "SV10 / 6010 (English)",
    title: "SV10 / 6010 Solenoid Valve Datasheet (English)",
  },
  "rpl-series-en": {
    id: "rpl-series-en",
    file: datasheetEnItems.find(item => item.id === "rpl-p635-p15-valveless-pump")!.downloadHref!,
    shortTitle: "RPL-P6.35 / RPL-P15 (English, 001 / 2025-07)",
    title: datasheetEnItems.find(item => item.id === "rpl-p635-p15-valveless-pump")!.title,
  },
  "ea-series-en": {
    id: "ea-series-en",
    file: datasheetEnItems.find(item => item.id === "ea-piston-pump")!.downloadHref!,
    shortTitle: "EA",
    title: "EA Piston Pump Datasheet",
  },
  "sm-series-en": {
    id: "sm-series-en",
    file: "/downloads/resources/datasheets/en/Pumps/ps-120b-2507-00004-001-en-sm-piston-pump.pdf",
    shortTitle: "SM",
    title: "SM Piston Pump Specification Sheet",
  },
  "dpl30-series-en": {
    id: "dpl30-series-en",
    file: "/downloads/resources/datasheets/en/Pumps/PS-150B-2507-00001_A03_en_DPL30 Diaphragm Pump Specification Sheet.pdf",
    shortTitle: "DPL30",
    title: "DPL30 Diaphragm Pump Specification Sheet",
  },
  "dpl60-series-en": {
    id: "dpl60-series-en",
    file: "/downloads/resources/datasheets/en/Pumps/PS-150B-2607-00001_A00_en_DPL60 Diaphragm Pump Specification Sheet.pdf",
    shortTitle: "DPL60",
    title: "DPL60 Diaphragm Pump Specification Sheet",
  },
  "dpgl800-series-en": {
    id: "dpgl800-series-en",
    file: "/downloads/resources/datasheets/en/Pumps/PS-150B-2608-00005_A00_en_DPGL800 Diaphragm Pump Specification Sheet.pdf",
    shortTitle: "DPGL800",
    title: "DPGL800 Diaphragm Pump Specification Sheet",
  },
};

export function getProductDatasheet(
  datasheetId: unknown,
): ProductDatasheet | null {
  const normalizedId = String(datasheetId || "").trim();

  if (!normalizedId) {
    return null;
  }

  return PRODUCT_DATASHEETS[normalizedId] ?? null;
}

/** Resolve only real files already published in the site's resource catalog. */
export function getDetailDatasheet(data: { slug?: string; model?: string; productTypeId?: string; datasheetId?: string }, locale: string): ProductDatasheet | null {
  const slug = String(data.slug || "").toLowerCase();
  const model = String(data.model || "").toUpperCase();
  const type = String(data.productTypeId || "");
  const ids = [
    [/^ea-/, "ea-piston-pump"], [/^sm-/, "sm-piston-pump"],
    [/^dpl30h(?:-|$)/, "dpl30h-diaphragm-pump"], [/^dpl30(?:-|$)/, "dpl30-diaphragm-pump"],
    [/^dpl60(?:-|$)/, "dpl60-diaphragm-pump"], [/^dpgl800(?:-|$)/, "dpgl800-diaphragm-pump"],
    [/^rpl-p(?:635|15)(?:-|$)/, locale === "zh" && /^rpl-p635/.test(slug) ? "rpl-p635-valveless-pump" : "rpl-p635-p15-valveless-pump"],
    [/^smtp[24](?:-|$)/, "smtp2-smtp4-pipetting-pump"],
    [/^hld3(?:-|$)/, "hld3-syringe-pump"], [/^hld6(?:-|$)/, "hld6-syringe-pump"],
    [/^hmd3(?:-|$)/, "hmd3-syringe-pump"], [/^hmd6(?:-|$)/, "hmd6-syringe-pump"],
    [/^mrv3(?:-|$)/, "mrv3-multi-channel-rotary-valve"], [/^(?:hp|high-pressure-valves)$/, "hp-2-position-6-port-high-pressure-valve"],
    [/^abd(?:-|$)/, "abd-air-bubble-detector"], [/^pdm5(?:-|$)/, "pdm5-pressure-sensor"],
  ] as const;
  const isTubingCatalog = type.includes("fitting") || type.includes("tubing")
    || ["female-thread-adapters", "filters", "check-valves"].includes(type)
    || isTubingMaterial(slug) || Boolean(getAssemblyEntryPreset(slug));
  const id = isTubingCatalog ? "fittings-and-tubing-catalog"
    : type === "solenoid-valves" || /^SV10(?:-|\b)/.test(model) ? "6010-solenoid-valve"
    : ids.find(([pattern]) => pattern.test(slug))?.[1];
  const fromCatalog = (language: "zh" | "en") => {
    const item = (language === "zh" ? datasheetZhItems : datasheetEnItems).find(row => row.id === id && row.actionType === "download" && row.downloadHref?.endsWith(".pdf"));
    return item?.downloadHref ? { id: `${item.id}-${language}`, file: item.downloadHref, title: item.title,
      shortTitle: item.title, language, kind: isTubingCatalog ? "catalog" as const : "datasheet" as const } : null;
  };
  // Chinese content may use its Chinese reference. Download menus on other
  // locales list English documents only, without falling back to a Chinese PDF.
  if (locale === "zh") return fromCatalog("zh") || fromCatalog("en") || getProductDatasheet(data.datasheetId);
  const registered = getProductDatasheet(data.datasheetId);
  return fromCatalog("en") || (registered && registered.language !== "zh" && registered.file.includes("/datasheets/en/")
    ? { ...registered, language: "en" as const } : null);
}

type ProductDetailResourceCopy = {
  datasheetTab: string;
  unavailableTitle: string;
  unavailableDescription: string;
  viewDatasheet: (title: string) => string;
  downloadDatasheet: (title: string) => string;
  previewLoading: string;
  previousPage: string;
  nextPage: string;
  previousPageShort: string;
  nextPageShort: string;
  previewButton: string;
  previewDescription: (title: string) => string;
  requestCad: string;
  cadTitle: string;
  cadDescription: string;
  company: string;
  companyPlaceholder: string;
  businessEmail: string;
  businessEmailPlaceholder: string;
  verificationCode: string;
  verificationCodePlaceholder: string;
  sendCode: string;
  resendCode: string;
  sendingCode: string;
  verifyEmail: string;
  verifyingEmail: string;
  emailVerified: string;
  codeSent: string;
  message: string;
  messagePlaceholder: string;
  submitCad: string;
  submittingCad: string;
  close: string;
  successTitle: string;
  successDescription: string;
  closeSuccess: string;
  invalidEmail: string;
  companyRequired: string;
  requestCodeFirst: string;
  enterCode: string;
  codeIncorrect: string;
  codeExpired: string;
  sendTooFrequently: string;
  verificationExpired: string;
  serviceUnavailable: string;
  requestFailed: string;
};

const RESOURCE_COPY: Record<
  ProductDetailResourceLocale,
  ProductDetailResourceCopy
> = {
  zh: {
    datasheetTab: "规格书", unavailableTitle: "暂无规格书", unavailableDescription: "可联系业务负责人获取本产品资料。",
    viewDatasheet: title => `查看 ${title}`, downloadDatasheet: title => `下载 ${title} PDF`, previewLoading: "正在加载规格书…",
    previousPage: "上一页", nextPage: "下一页", previousPageShort: "上一页", nextPageShort: "下一页", previewButton: "查看规格书",
    previewDescription: title => `在线预览 ${title}。`, requestCad: "申请 CAD", cadTitle: "申请 CAD",
    cadDescription: "填写公司信息并验证邮箱，我们会按所选产品与配置核对可提供的 CAD 文件。",
    company: "公司名称", companyPlaceholder: "请输入公司名称", businessEmail: "工作邮箱", businessEmailPlaceholder: "请输入工作邮箱",
    verificationCode: "验证码", verificationCodePlaceholder: "请输入六位验证码", sendCode: "发送验证码", resendCode: "重新发送",
    sendingCode: "正在发送…", verifyEmail: "验证邮箱", verifyingEmail: "正在验证…", emailVerified: "邮箱已验证。", codeSent: "验证码已发送，请查收邮件。",
    message: "补充说明（选填）", messagePlaceholder: "请说明所需 CAD 格式、配置或其他要求。", submitCad: "提交 CAD 申请", submittingCad: "正在提交…",
    close: "关闭对话框", successTitle: "CAD 申请已提交", successDescription: "我们已收到申请并发送确认邮件，将按所选产品核对可提供的文件。", closeSuccess: "关闭",
    invalidEmail: "请输入有效的工作邮箱。", companyRequired: "请输入公司名称。", requestCodeFirst: "请先获取验证码。", enterCode: "请输入完整的六位验证码。",
    codeIncorrect: "验证码不正确。", codeExpired: "验证码已过期，请重新获取。", sendTooFrequently: "验证码已发送，请等待 60 秒后再试。",
    verificationExpired: "邮箱验证已过期，请重新验证。", serviceUnavailable: "邮箱验证服务暂时不可用。", requestFailed: "提交未成功，请稍后重试。",
  },
  en: {
    datasheetTab: "Datasheet",
    unavailableTitle: "Datasheet not yet available",
    unavailableDescription:
      "The datasheet for this product has not been uploaded yet.",
    viewDatasheet: (title) => `Preview ${title} Datasheet`,
    downloadDatasheet: (title) => `Download ${title} PDF`,
    previewLoading: "Loading datasheet…",
    previousPage: "Previous page",
    nextPage: "Next page",
    previousPageShort: "Previous",
    nextPageShort: "Next",
    previewButton: "View Datasheet",
    previewDescription: (title) => `Preview ${title} online.`,
    requestCad: "Request CAD",
    cadTitle: "Request CAD",
    cadDescription:
      "Enter your company information and verify your business email. Our engineering team will review the CAD format available for this product.",
    company: "Company",
    companyPlaceholder: "Company name",
    businessEmail: "Business Email",
    businessEmailPlaceholder: "Business email address",
    verificationCode: "Verification Code",
    verificationCodePlaceholder: "Enter the six-digit code",
    sendCode: "Send Code",
    resendCode: "Resend Code",
    sendingCode: "Sending…",
    verifyEmail: "Verify Email",
    verifyingEmail: "Verifying…",
    emailVerified: "Email verified.",
    codeSent: "Code sent. Please check your email.",
    message: "Message (Optional)",
    messagePlaceholder:
      "Please let us know your preferred CAD format or any additional requirements.",
    submitCad: "Submit CAD Request",
    submittingCad: "Submitting…",
    close: "Close dialog",
    successTitle: "CAD Request Submitted",
    successDescription:
      "Your CAD request has been received. A confirmation email has been sent, and our engineering team will review the available files for this product.",
    closeSuccess: "Close",
    invalidEmail: "Please enter a valid business email address.",
    companyRequired: "Please enter your company name.",
    requestCodeFirst: "Please request a verification code first.",
    enterCode: "Enter the complete six-digit verification code.",
    codeIncorrect: "The verification code is incorrect.",
    codeExpired: "The verification code has expired. Please request a new code.",
    sendTooFrequently:
      "A code was sent recently. Please wait 60 seconds before trying again.",
    verificationExpired: "Email verification has expired. Please verify it again.",
    serviceUnavailable:
      "Email verification is temporarily unavailable. Please try again later.",
    requestFailed: "The request could not be completed. Please try again later.",
  },
  es: {
    datasheetTab: "Ficha técnica",
    unavailableTitle: "Ficha técnica aún no disponible",
    unavailableDescription:
      "La ficha técnica de este producto todavía no se ha publicado.",
    viewDatasheet: (title) => `Previsualizar ficha ${title}`,
    downloadDatasheet: (title) => `Descargar PDF ${title}`,
    previewLoading: "Cargando la ficha técnica…",
    previousPage: "Página anterior",
    nextPage: "Página siguiente",
    previousPageShort: "Anterior",
    nextPageShort: "Siguiente",
    previewButton: "Ver ficha técnica",
    previewDescription: (title) => `Vista previa en línea de ${title}.`,
    requestCad: "Solicitar CAD",
    cadTitle: "Solicitar archivo CAD",
    cadDescription:
      "Introduzca los datos de su empresa y verifique su correo profesional. Nuestro equipo de ingeniería revisará el formato CAD disponible para este producto.",
    company: "Empresa",
    companyPlaceholder: "Nombre de la empresa",
    businessEmail: "Correo profesional",
    businessEmailPlaceholder: "Dirección de correo profesional",
    verificationCode: "Código de verificación",
    verificationCodePlaceholder: "Introduzca el código de seis dígitos",
    sendCode: "Enviar código",
    resendCode: "Reenviar código",
    sendingCode: "Enviando…",
    verifyEmail: "Verificar correo",
    verifyingEmail: "Verificando…",
    emailVerified: "Correo verificado.",
    codeSent: "Código enviado. Revise su correo.",
    message: "Mensaje (opcional)",
    messagePlaceholder:
      "Indique el formato CAD que prefiere u otros requisitos adicionales.",
    submitCad: "Enviar solicitud CAD",
    submittingCad: "Enviando…",
    close: "Cerrar ventana",
    successTitle: "Solicitud CAD enviada",
    successDescription:
      "Hemos recibido su solicitud CAD. Se ha enviado un correo de confirmación y nuestro equipo revisará los archivos disponibles para este producto.",
    closeSuccess: "Cerrar",
    invalidEmail: "Introduzca una dirección de correo profesional válida.",
    companyRequired: "Introduzca el nombre de su empresa.",
    requestCodeFirst: "Solicite primero un código de verificación.",
    enterCode: "Introduzca el código completo de seis dígitos.",
    codeIncorrect: "El código de verificación no es correcto.",
    codeExpired: "El código ha caducado. Solicite uno nuevo.",
    sendTooFrequently: "Ya se ha enviado un código. Espere 60 segundos.",
    verificationExpired: "La verificación ha caducado. Verifique de nuevo su correo.",
    serviceUnavailable: "La verificación por correo no está disponible temporalmente.",
    requestFailed: "No se pudo completar la solicitud. Inténtelo de nuevo más tarde.",
  },
  fr: {
    datasheetTab: "Fiche technique",
    unavailableTitle: "Fiche technique pas encore disponible",
    unavailableDescription:
      "La fiche technique de ce produit n’a pas encore été publiée.",
    viewDatasheet: (title) => `Prévisualiser la fiche ${title}`,
    downloadDatasheet: (title) => `Télécharger le PDF ${title}`,
    previewLoading: "Chargement de la fiche technique…",
    previousPage: "Page précédente",
    nextPage: "Page suivante",
    previousPageShort: "Précédente",
    nextPageShort: "Suivante",
    previewButton: "Voir la fiche technique",
    previewDescription: (title) => `Aperçu en ligne de ${title}.`,
    requestCad: "Demander un fichier CAO",
    cadTitle: "Demander un fichier CAO",
    cadDescription:
      "Renseignez les informations de votre société et vérifiez votre adresse e-mail professionnelle. Notre équipe d’ingénierie examinera le format CAO disponible pour ce produit.",
    company: "Société",
    companyPlaceholder: "Nom de la société",
    businessEmail: "E-mail professionnel",
    businessEmailPlaceholder: "Adresse e-mail professionnelle",
    verificationCode: "Code de vérification",
    verificationCodePlaceholder: "Saisissez le code à six chiffres",
    sendCode: "Envoyer le code",
    resendCode: "Renvoyer le code",
    sendingCode: "Envoi…",
    verifyEmail: "Vérifier l’e-mail",
    verifyingEmail: "Vérification…",
    emailVerified: "E-mail vérifié.",
    codeSent: "Code envoyé. Consultez votre messagerie.",
    message: "Message (facultatif)",
    messagePlaceholder:
      "Indiquez votre format CAO préféré ou toute exigence complémentaire.",
    submitCad: "Envoyer la demande CAO",
    submittingCad: "Envoi…",
    close: "Fermer la fenêtre",
    successTitle: "Demande CAO envoyée",
    successDescription:
      "Votre demande CAO a bien été reçue. Un e-mail de confirmation a été envoyé et notre équipe vérifiera les fichiers disponibles pour ce produit.",
    closeSuccess: "Fermer",
    invalidEmail: "Saisissez une adresse e-mail professionnelle valide.",
    companyRequired: "Saisissez le nom de votre société.",
    requestCodeFirst: "Demandez d’abord un code de vérification.",
    enterCode: "Saisissez le code complet à six chiffres.",
    codeIncorrect: "Le code de vérification est incorrect.",
    codeExpired: "Le code a expiré. Demandez-en un nouveau.",
    sendTooFrequently: "Un code a déjà été envoyé. Patientez 60 secondes.",
    verificationExpired: "La vérification a expiré. Vérifiez de nouveau votre e-mail.",
    serviceUnavailable: "La vérification par e-mail est temporairement indisponible.",
    requestFailed: "La demande n’a pas pu être traitée. Réessayez plus tard.",
  },
  ko: {
    datasheetTab: "데이터시트",
    unavailableTitle: "데이터시트가 아직 제공되지 않습니다",
    unavailableDescription: "이 제품의 데이터시트는 아직 업로드되지 않았습니다.",
    viewDatasheet: (title) => `${title} 데이터시트 미리보기`,
    downloadDatasheet: (title) => `${title} PDF 다운로드`,
    previewLoading: "데이터시트 불러오는 중…",
    previousPage: "이전 페이지",
    nextPage: "다음 페이지",
    previousPageShort: "이전",
    nextPageShort: "다음",
    previewButton: "데이터시트 보기",
    previewDescription: (title) => `${title} 온라인 미리보기`,
    requestCad: "CAD 요청",
    cadTitle: "CAD 파일 요청",
    cadDescription:
      "회사 정보를 입력하고 업무용 이메일을 인증해 주세요. 엔지니어링 팀이 이 제품에 제공 가능한 CAD 형식을 검토합니다.",
    company: "회사명",
    companyPlaceholder: "회사명을 입력해 주세요",
    businessEmail: "업무용 이메일",
    businessEmailPlaceholder: "업무용 이메일 주소",
    verificationCode: "인증 코드",
    verificationCodePlaceholder: "6자리 인증 코드를 입력해 주세요",
    sendCode: "인증 코드 전송",
    resendCode: "인증 코드 재전송",
    sendingCode: "전송 중…",
    verifyEmail: "이메일 인증",
    verifyingEmail: "인증 중…",
    emailVerified: "이메일 인증이 완료되었습니다.",
    codeSent: "인증 코드가 전송되었습니다. 이메일을 확인해 주세요.",
    message: "메시지 (선택 사항)",
    messagePlaceholder: "선호하는 CAD 형식이나 추가 요구 사항을 알려 주세요.",
    submitCad: "CAD 요청 제출",
    submittingCad: "제출 중…",
    close: "창 닫기",
    successTitle: "CAD 요청이 제출되었습니다",
    successDescription:
      "CAD 요청이 접수되었습니다. 확인 이메일이 발송되었으며 담당자가 이 제품에 제공 가능한 파일을 검토합니다.",
    closeSuccess: "닫기",
    invalidEmail: "올바른 업무용 이메일 주소를 입력해 주세요.",
    companyRequired: "회사명을 입력해 주세요.",
    requestCodeFirst: "먼저 인증 코드를 요청해 주세요.",
    enterCode: "6자리 인증 코드를 모두 입력해 주세요.",
    codeIncorrect: "인증 코드가 올바르지 않습니다.",
    codeExpired: "인증 코드가 만료되었습니다. 새 코드를 요청해 주세요.",
    sendTooFrequently: "인증 코드가 이미 전송되었습니다. 60초 후 다시 시도해 주세요.",
    verificationExpired: "이메일 인증이 만료되었습니다. 다시 인증해 주세요.",
    serviceUnavailable: "이메일 인증 서비스를 일시적으로 사용할 수 없습니다.",
    requestFailed: "요청을 완료하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  },
  ru: {
    datasheetTab: "Техническое описание",
    unavailableTitle: "Техническое описание пока недоступно",
    unavailableDescription:
      "Техническое описание этого изделия ещё не загружено.",
    viewDatasheet: (title) => `Просмотреть описание ${title}`,
    downloadDatasheet: (title) => `Скачать PDF ${title}`,
    previewLoading: "Загрузка технического описания…",
    previousPage: "Предыдущая страница",
    nextPage: "Следующая страница",
    previousPageShort: "Назад",
    nextPageShort: "Вперёд",
    previewButton: "Открыть техническое описание",
    previewDescription: (title) => `Онлайн-просмотр документа «${title}».`,
    requestCad: "Запросить CAD",
    cadTitle: "Запросить CAD-файл",
    cadDescription:
      "Укажите данные компании и подтвердите рабочий адрес электронной почты. Наши инженеры проверят, какой формат CAD доступен для этого изделия.",
    company: "Компания",
    companyPlaceholder: "Название компании",
    businessEmail: "Рабочая эл. почта",
    businessEmailPlaceholder: "Рабочий адрес электронной почты",
    verificationCode: "Код подтверждения",
    verificationCodePlaceholder: "Введите шестизначный код",
    sendCode: "Отправить код",
    resendCode: "Отправить повторно",
    sendingCode: "Отправка…",
    verifyEmail: "Подтвердить адрес",
    verifyingEmail: "Проверка…",
    emailVerified: "Адрес подтверждён.",
    codeSent: "Код отправлен. Проверьте почту.",
    message: "Сообщение (необязательно)",
    messagePlaceholder:
      "Укажите предпочтительный формат CAD или дополнительные требования.",
    submitCad: "Отправить запрос CAD",
    submittingCad: "Отправка…",
    close: "Закрыть окно",
    successTitle: "Запрос CAD отправлен",
    successDescription:
      "Ваш запрос CAD получен. Вам отправлено подтверждение, а наши инженеры проверят доступные файлы для этого изделия.",
    closeSuccess: "Закрыть",
    invalidEmail: "Введите корректный рабочий адрес электронной почты.",
    companyRequired: "Введите название компании.",
    requestCodeFirst: "Сначала запросите код подтверждения.",
    enterCode: "Введите полный шестизначный код.",
    codeIncorrect: "Код подтверждения указан неверно.",
    codeExpired: "Срок действия кода истёк. Запросите новый код.",
    sendTooFrequently: "Код уже отправлен. Повторите попытку через 60 секунд.",
    verificationExpired: "Срок подтверждения истёк. Подтвердите адрес ещё раз.",
    serviceUnavailable: "Подтверждение по электронной почте временно недоступно.",
    requestFailed: "Не удалось отправить запрос. Повторите попытку позже.",
  },
};

export function getProductDetailResourceCopy(
  locale: ProductDetailResourceLocale,
): ProductDetailResourceCopy {
  return RESOURCE_COPY[locale];
}

export function isProductDetailResourceLocale(
  value: string,
): value is ProductDetailResourceLocale {
  return PRODUCT_DETAIL_RESOURCE_LOCALES.includes(
    value as ProductDetailResourceLocale,
  );
}
