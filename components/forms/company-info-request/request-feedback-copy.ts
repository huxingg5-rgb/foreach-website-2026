import { getCompanyInfoRequestCopy } from "./copy";
import { getInquiryAttachmentError } from "./InquiryAttachmentField.copy";

type RuntimeCopy = {
  sendTooFrequently: string;
  codeMissing: string;
  codeExpired: string;
  codeIncorrect: string;
  emailNotVerified: string;
  verificationExpired: string;
  storageNotConfigured: string;
  emailServiceNotConfigured: string;
  nameRequired: string;
  companyRequired: string;
  fieldsRequired: string;
  serverError: string;
};

const copies: Record<"es" | "fr" | "ko" | "ru", RuntimeCopy> = {
  es: {
    sendTooFrequently: "Se ha enviado un código recientemente. Espere 60 segundos antes de solicitar otro.",
    codeMissing: "El código de verificación no está disponible. Solicite uno nuevo.",
    codeExpired: "El código de verificación ha caducado. Solicite uno nuevo.",
    codeIncorrect: "El código de verificación es incorrecto.",
    emailNotVerified: "Vuelva a verificar su dirección de correo electrónico.",
    verificationExpired: "La verificación del correo ha caducado. Verifíquelo de nuevo.",
    storageNotConfigured: "El servicio de verificación no está configurado. Contacte con el administrador del sitio.",
    emailServiceNotConfigured: "El servicio de correo no está configurado. Contacte con el administrador del sitio.",
    nameRequired: "Introduzca su nombre.", companyRequired: "Introduzca el nombre de su empresa.",
    fieldsRequired: "Complete todos los campos obligatorios.",
    serverError: "El servidor no pudo completar la solicitud. Inténtelo de nuevo más tarde.",
  },
  fr: {
    sendTooFrequently: "Un code vient d’être envoyé. Patientez 60 secondes avant d’en demander un autre.",
    codeMissing: "Le code de vérification n’est pas disponible. Demandez un nouveau code.",
    codeExpired: "Le code de vérification a expiré. Demandez un nouveau code.",
    codeIncorrect: "Le code de vérification est incorrect.",
    emailNotVerified: "Veuillez vérifier à nouveau votre adresse e-mail.",
    verificationExpired: "La vérification de l’adresse e-mail a expiré. Vérifiez-la à nouveau.",
    storageNotConfigured: "Le service de vérification n’est pas configuré. Contactez l’administrateur du site.",
    emailServiceNotConfigured: "Le service de messagerie n’est pas configuré. Contactez l’administrateur du site.",
    nameRequired: "Saisissez votre nom.", companyRequired: "Saisissez le nom de votre société.",
    fieldsRequired: "Renseignez tous les champs obligatoires.",
    serverError: "Le serveur n’a pas pu traiter la demande. Réessayez plus tard.",
  },
  ko: {
    sendTooFrequently: "인증 코드가 이미 전송되었습니다. 60초 후에 다시 요청해 주세요.",
    codeMissing: "인증 코드를 사용할 수 없습니다. 새 코드를 요청해 주세요.",
    codeExpired: "인증 코드가 만료되었습니다. 새 코드를 요청해 주세요.",
    codeIncorrect: "인증 코드가 올바르지 않습니다.",
    emailNotVerified: "이메일 주소를 다시 인증해 주세요.",
    verificationExpired: "이메일 인증이 만료되었습니다. 다시 인증해 주세요.",
    storageNotConfigured: "인증 서비스가 설정되지 않았습니다. 사이트 관리자에게 문의해 주세요.",
    emailServiceNotConfigured: "이메일 서비스가 설정되지 않았습니다. 사이트 관리자에게 문의해 주세요.",
    nameRequired: "이름을 입력해 주세요.", companyRequired: "회사명을 입력해 주세요.",
    fieldsRequired: "필수 항목을 모두 입력해 주세요.",
    serverError: "서버에서 요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.",
  },
  ru: {
    sendTooFrequently: "Код уже был отправлен. Подождите 60 секунд перед повторным запросом.",
    codeMissing: "Код подтверждения недоступен. Запросите новый код.",
    codeExpired: "Срок действия кода истёк. Запросите новый код.",
    codeIncorrect: "Неверный код подтверждения.",
    emailNotVerified: "Подтвердите адрес электронной почты ещё раз.",
    verificationExpired: "Срок действия подтверждения адреса истёк. Подтвердите его ещё раз.",
    storageNotConfigured: "Сервис подтверждения не настроен. Обратитесь к администратору сайта.",
    emailServiceNotConfigured: "Почтовый сервис не настроен. Обратитесь к администратору сайта.",
    nameRequired: "Введите своё имя.", companyRequired: "Введите название компании.",
    fieldsRequired: "Заполните все обязательные поля.",
    serverError: "Сервер не смог выполнить запрос. Повторите попытку позже.",
  },
};

export function getLocalizedCompanyInfoError(locale: string, errorCode: string): string {
  const copy = getCompanyInfoRequestCopy(locale);
  const attachmentError = getInquiryAttachmentError(locale, errorCode);
  if (attachmentError) return attachmentError;
  const runtime = copies[locale as keyof typeof copies];
  if (!runtime) return copy.requestFailed;
  const errors: Record<string, string> = {
    invalid_email: copy.invalidEmail,
    invalid_verification_data: copy.enterCode,
    send_too_frequently: runtime.sendTooFrequently,
    verification_code_missing: runtime.codeMissing,
    verification_code_expired: runtime.codeExpired,
    verification_code_incorrect: runtime.codeIncorrect,
    email_not_verified: runtime.emailNotVerified,
    email_verification_expired: runtime.verificationExpired,
    storage_not_configured: runtime.storageNotConfigured,
    email_service_not_configured: runtime.emailServiceNotConfigured,
    name_required: runtime.nameRequired,
    company_required: runtime.companyRequired,
    required_fields_missing: runtime.fieldsRequired,
    request_failed: copy.requestFailed,
    server_error: runtime.serverError,
  };
  return errors[errorCode] ?? copy.requestFailed;
}

export function formatInquiryCodeCountdown(locale: string, seconds: number): string {
  if (locale === "ko") return `${seconds}초`;
  if (locale === "ru") return `${seconds} с`;
  return `${seconds}s`;
}
