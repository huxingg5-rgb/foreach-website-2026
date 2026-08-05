/* =========================================================
   ContactInquiryForm.tsx
   恒永达官网｜联系我们需求表单组件

   文件路径：
   components/contact/ContactInquiryForm.tsx

   当前方案：
   1. 管理联系我们页面的需求提交表单
   2. 管理姓名、公司、邮箱、电话、需求类型、产品类型、当前阶段等字段
   3. 调用 Vercel API 发送并验证真实邮箱验证码
   4. 管理附件上传、附件显示和附件删除
   5. 提交后使用 buildContactPdfHtml.ts 生成 A4 需求单 HTML
   6. 使用隐藏 iframe 调出浏览器打印 / 保存 PDF 窗口
   7. 不再引用 pdfmake 的 buildContactPdfDocument.ts
   8. buildContactPdfDocument.ts 可以先保留，但本文件不再使用它

   注意：
   1. 邮箱验证码由 Vercel API 和 Resend 真实发送
   2. 询盘提交后由 Vercel API 发送公司通知和客户确认邮件
========================================================= */

"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import type { ContactPageData } from "@/data/contact-cooperation";
import {
  buildContactPdfHtml,
  formatFileSize,
  type ContactFormState,
} from "@/components/contact/buildContactPdfHtml";
import {
  trackFormStart,
  trackInquirySubmitError,
  trackLeadGenerated,
  type InquiryErrorType,
} from "@/lib/analytics/track-event";

/* =========================================================
   组件 Props 类型
========================================================= */

type ContactInquiryFormProps = {
  data: ContactPageData; // 当前语言页面数据
  presetRequestType?: string; // 外部卡片点击后传进来的需求类型
};

type InquiryApiResponse = {
  success: boolean;
  error?: string;
  referenceId?: string;
};

class InquiryApiError extends Error {
  code: string;
  status: number;

  constructor(code: string, status: number) {
    super(code);

    this.name = "InquiryApiError";
    this.code = code;
    this.status = status;
  }
}

async function postInquiryApi(
  pathname: string,
  payload:
    | Record<string, unknown>
    | FormData,
): Promise<InquiryApiResponse> {
  let response: Response;

  const requestInit: RequestInit = {
    method: "POST",
    cache: "no-store",
  };

  if (payload instanceof FormData) {
    /*
     * 不能手动设置 Content-Type。
     * 浏览器会自动生成 multipart boundary。
     */
    requestInit.body = payload;
  } else {
    requestInit.headers = {
      "Content-Type": "application/json",
    };

    requestInit.body =
      JSON.stringify(payload);
  }

  try {
    response = await fetch(
      pathname,
      requestInit,
    );
  } catch {
    throw new InquiryApiError(
      "network_error",
      0,
    );
  }

  let result: InquiryApiResponse;

  try {
    result =
      (await response.json()) as InquiryApiResponse;
  } catch {
    result = {
      success: false,
      error: "invalid_response",
    };
  }

  if (!response.ok || !result.success) {
    throw new InquiryApiError(
      result.error || "request_failed",
      response.status,
    );
  }

  return result;
}

type InquiryRuntimeLocale =
  | "zh-CN"
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

type InquiryRuntimeText = {
  codeSent: string;
  sendTooFrequently: string;
  codeIncorrect: string;
  codeExpired: string;
  emailNotVerified: string;
  networkError: string;
  configurationError: string;
  genericError: string;
};

const INQUIRY_RUNTIME_TEXT: Record<
  InquiryRuntimeLocale,
  InquiryRuntimeText
> = {
  "zh-CN": {
    codeSent: "验证码已发送，请查收邮箱。",
    sendTooFrequently:
      "验证码发送过于频繁，请在 60 秒后重试。",
    codeIncorrect:
      "验证码不正确，请重新检查后填写。",
    codeExpired:
      "验证码不存在或已过期，请重新发送。",
    emailNotVerified:
      "邮箱验证状态不存在或已过期，请重新验证。",
    networkError:
      "网络连接失败，请检查网络后重试。",
    configurationError:
      "邮件服务尚未配置完成，请联系网站管理员。",
    genericError:
      "操作失败，请稍后重试，或直接通过邮箱联系我们。",
  },

  en: {
    codeSent:
      "The verification code has been sent. Please check your email.",
    sendTooFrequently:
      "Please wait 60 seconds before requesting another code.",
    codeIncorrect:
      "The verification code is incorrect. Please check it and try again.",
    codeExpired:
      "The verification code is missing or has expired. Please request a new one.",
    emailNotVerified:
      "Your email verification has expired. Please verify your email again.",
    networkError:
      "The network request failed. Please check your connection and try again.",
    configurationError:
      "The email service has not been configured. Please contact the website administrator.",
    genericError:
      "The operation failed. Please try again later or contact us by email.",
  },

  es: {
    codeSent:
      "El código de verificación se ha enviado. Revise su correo electrónico.",
    sendTooFrequently:
      "Espere 60 segundos antes de solicitar otro código.",
    codeIncorrect:
      "El código de verificación es incorrecto. Revíselo e inténtelo de nuevo.",
    codeExpired:
      "El código no existe o ha caducado. Solicite uno nuevo.",
    emailNotVerified:
      "La verificación del correo ha caducado. Verifique su correo de nuevo.",
    networkError:
      "La solicitud de red ha fallado. Compruebe su conexión e inténtelo de nuevo.",
    configurationError:
      "El servicio de correo aún no está configurado. Contacte con el administrador.",
    genericError:
      "La operación ha fallado. Inténtelo más tarde o contáctenos por correo.",
  },

  fr: {
    codeSent:
      "Le code de vérification a été envoyé. Consultez votre boîte de réception.",
    sendTooFrequently:
      "Veuillez attendre 60 secondes avant de demander un nouveau code.",
    codeIncorrect:
      "Le code de vérification est incorrect. Vérifiez-le et réessayez.",
    codeExpired:
      "Le code est introuvable ou a expiré. Demandez un nouveau code.",
    emailNotVerified:
      "La vérification de votre adresse e-mail a expiré. Veuillez recommencer.",
    networkError:
      "La requête réseau a échoué. Vérifiez votre connexion et réessayez.",
    configurationError:
      "Le service d’e-mail n’est pas encore configuré. Contactez l’administrateur.",
    genericError:
      "L’opération a échoué. Réessayez plus tard ou contactez-nous par e-mail.",
  },

  ko: {
    codeSent:
      "인증 코드가 전송되었습니다. 이메일을 확인해 주세요.",
    sendTooFrequently:
      "새 코드를 요청하기 전에 60초 동안 기다려 주세요.",
    codeIncorrect:
      "인증 코드가 올바르지 않습니다. 다시 확인해 주세요.",
    codeExpired:
      "인증 코드가 없거나 만료되었습니다. 새 코드를 요청해 주세요.",
    emailNotVerified:
      "이메일 인증이 만료되었습니다. 다시 인증해 주세요.",
    networkError:
      "네트워크 요청에 실패했습니다. 연결 상태를 확인해 주세요.",
    configurationError:
      "이메일 서비스 설정이 완료되지 않았습니다. 관리자에게 문의해 주세요.",
    genericError:
      "작업에 실패했습니다. 잠시 후 다시 시도하거나 이메일로 문의해 주세요.",
  },

  ru: {
    codeSent:
      "Код подтверждения отправлен. Проверьте электронную почту.",
    sendTooFrequently:
      "Подождите 60 секунд перед повторным запросом кода.",
    codeIncorrect:
      "Код подтверждения указан неверно. Проверьте его и повторите попытку.",
    codeExpired:
      "Код отсутствует или истёк. Запросите новый код.",
    emailNotVerified:
      "Подтверждение электронной почты истекло. Выполните проверку повторно.",
    networkError:
      "Ошибка сетевого запроса. Проверьте подключение и повторите попытку.",
    configurationError:
      "Почтовый сервис ещё не настроен. Обратитесь к администратору сайта.",
    genericError:
      "Не удалось выполнить операцию. Повторите попытку позже или напишите нам.",
  },
};

function getInquiryRuntimeLocale():
  InquiryRuntimeLocale {
  if (typeof document === "undefined") {
    return "zh-CN";
  }

  const rawLocale =
    document.documentElement.lang
      .trim()
      .toLowerCase();

  if (rawLocale.startsWith("zh")) {
    return "zh-CN";
  }

  if (rawLocale.startsWith("es")) {
    return "es";
  }

  if (rawLocale.startsWith("fr")) {
    return "fr";
  }

  if (rawLocale.startsWith("ko")) {
    return "ko";
  }

  if (rawLocale.startsWith("ru")) {
    return "ru";
  }

  return "en";
}

function getInquiryRuntimeText():
  InquiryRuntimeText {
  return INQUIRY_RUNTIME_TEXT[
    getInquiryRuntimeLocale()
  ];
}

function getInquiryApiErrorMessage(
  error: unknown,
  data: ContactPageData,
): string {
  const runtimeText =
    getInquiryRuntimeText();

  const errorCode =
    error instanceof InquiryApiError
      ? error.code
      : "unknown_error";

  switch (errorCode) {
    case "invalid_email":
      return data.form.alerts.invalidEmail;

    case "send_too_frequently":
      return runtimeText.sendTooFrequently;

    case "invalid_verification_data":
    case "verification_code_incorrect":
      return runtimeText.codeIncorrect;

    case "verification_code_missing":
    case "verification_code_invalid":
    case "verification_code_expired":
      return runtimeText.codeExpired;

    case "email_not_verified":
    case "email_verification_expired":
      return runtimeText.emailNotVerified;

    case "storage_not_configured":
    case "email_service_not_configured":
      return runtimeText.configurationError;

    case "network_error":
      return runtimeText.networkError;

    default:
      return runtimeText.genericError;
  }
}

/* =========================================================
   表单初始值
========================================================= */

function createInitialFormData(data: ContactPageData): ContactFormState {
  return {
    name: "", // 姓名
    company: "", // 公司名称
    email: "", // 邮箱
    emailCode: "", // 邮箱验证码
    phone: "", // 电话 / 微信
    requestType: data.form.requestTypes[0] ?? "", // 默认需求类型
    productType: "", // 目标产品 / 部件类型
    targetModel: "", // 具体型号 / 竞品型号
    projectStage: "", // 当前阶段
    message: "", // 需求描述
  };
}

/* =========================================================
   获取年月日
   输出示例：20260601
========================================================= */

function createDateStamp() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

/* =========================================================
   生成需求单号
   输出示例：FYD-20260601-143025
========================================================= */

function createRequestNumber() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");

  const hour = String(now.getHours()).padStart(2, "0");

  const minute = String(now.getMinutes()).padStart(2, "0");

  const second = String(now.getSeconds()).padStart(2, "0");

  return `FYD-${year}${month}${day}-${hour}${minute}${second}`;
}

/* =========================================================
   清理文件名片段
   说明：
   1. 删除 Windows 文件名非法字符
   2. 删除多余空格
   3. 控制长度，避免文件名过长
========================================================= */

function sanitizeFileNamePart(value: string, fallback: string) {
  const cleanedValue = value
    .trim()
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, "")
    .slice(0, 40);

  return cleanedValue || fallback;
}

/* =========================================================
   生成内部归档文件名
   规则：
   公司名称_部件类型_需求类型_年月日.pdf

   示例：
   深圳某某医疗_注射泵_样品测试申请_20260601.pdf
========================================================= */

function createInternalArchiveFileName(formData: ContactFormState) {
  const dateStamp = createDateStamp();

  const companyPart = sanitizeFileNamePart(
    formData.company || formData.name,
    "未填写公司",
  );

  const productPart = sanitizeFileNamePart(
    formData.productType || formData.targetModel || formData.requestType,
    "产品需求",
  );

  const requestPart = sanitizeFileNamePart(formData.requestType, "其他需求");

  return `${companyPart}_${productPart}_${requestPart}_${dateStamp}.pdf`;
}

/* =========================================================
   等待 iframe 中图片加载完成
   说明：
   1. 页眉页脚是 SVG 图片
   2. 打印前等图片加载完成，避免打印时页眉页脚空白
========================================================= */

function waitForIframeImages(iframeDocument: Document) {
  const images = Array.from(iframeDocument.images);

  if (images.length === 0) {
    return Promise.resolve();
  }

  return Promise.all(
    images.map((image) => {
      if (image.complete) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        image.onload = () => resolve();
        image.onerror = () => resolve();
      });
    }),
  ).then(() => undefined);
}

/* =========================================================
   ContactInquiryForm 组件
========================================================= */

export default function ContactInquiryForm({
  data,
  presetRequestType,
}: ContactInquiryFormProps) {
  const [formData, setFormData] = useState<ContactFormState>(() =>
    createInitialFormData(data),
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [emailCodeSent, setEmailCodeSent] = useState(false);

  const [emailCodeVerified, setEmailCodeVerified] = useState(false);

  const [isSendingCode, setIsSendingCode] = useState(false);

  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const [emailTip, setEmailTip] = useState(data.form.emailVerification.tip);

  const [sendCountdown, setSendCountdown] = useState(0);

  const [verifyCountdown, setVerifyCountdown] = useState(0);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [internalArchiveFileName, setInternalArchiveFileName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [referenceId, setReferenceId] = useState("");
  const formStartedRef = useRef(false);
  const nativeValidationReportedRef = useRef(false);

  function getAnalyticsLocale() {
    return document.documentElement.lang || "zh-CN";
  }

  function trackFirstFormInteraction() {
    if (formStartedRef.current) return;

    formStartedRef.current = true;
    trackFormStart({
      formId: "contact_inquiry_form",
      formType: "general_inquiry",
      sourceSection: "contact_form_section",
      locale: getAnalyticsLocale(),
    });
  }

  function trackSubmitFailure(
    errorType: InquiryErrorType,
    submissionStage: string,
  ) {
    trackInquirySubmitError({
      formId: "contact_inquiry_form",
      formType: "general_inquiry",
      sourceSection: "contact_form_section",
      locale: getAnalyticsLocale(),
      errorType,
      submissionStage,
    });
  }

  function handleNativeValidationFailure() {
    if (nativeValidationReportedRef.current) return;

    nativeValidationReportedRef.current = true;
    trackSubmitFailure("validation_error", "client_validation");
    window.setTimeout(() => {
      nativeValidationReportedRef.current = false;
    }, 0);
  }

  /* =========================================================
     同步外部传入的需求类型
     说明：
     点击页面上的支持卡片后，可以自动切换表单需求类型
  ========================================================= */

  useEffect(() => {
    if (!presetRequestType) return;

    setFormData((prev) => ({
      ...prev,
      requestType: presetRequestType,
    }));
  }, [presetRequestType]);

  /* =========================================================
     通用表单字段修改
  ========================================================= */

  function handleFieldChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    trackFirstFormInteraction();
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setEmailCodeVerified(false);
      setEmailCodeSent(false);

      setFormData((prev) => ({
        ...prev,
        emailCode: "",
      }));

      setEmailTip(
        data.form.emailVerification.tip,
      );
    }

    if (showSuccessModal) {
      setShowSuccessModal(false);
    }
  }


  /* =========================================================
     发送真实邮箱验证码

     接口：
     POST /api/inquiry/send-code/
  ========================================================= */

  async function handleSendEmailCode() {
    if (isSendingCode || sendCountdown > 0) {
      return;
    }

    const email = formData.email.trim();

    if (!email) {
      window.alert(
        data.form.alerts.emailRequired,
      );

      return;
    }

    const emailReg =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailReg.test(email)) {
      window.alert(
        data.form.alerts.invalidEmail,
      );

      return;
    }

    setIsSendingCode(true);
    setEmailCodeVerified(false);
    setEmailCodeSent(false);

    try {
      await postInquiryApi(
        "/api/inquiry/send-code/",
        {
          email,
        },
      );

      setEmailCodeSent(true);

      setFormData((prev) => ({
        ...prev,
        emailCode: "",
      }));

      setEmailTip(
        getInquiryRuntimeText().codeSent,
      );

      setSendCountdown(60);

      const timer =
        window.setInterval(() => {
          setSendCountdown((prev) => {
            if (prev <= 1) {
              window.clearInterval(timer);

              return 0;
            }

            return prev - 1;
          });
        }, 1000);
    } catch (error) {
      const message =
        getInquiryApiErrorMessage(
          error,
          data,
        );

      setEmailCodeSent(false);
      setEmailCodeVerified(false);
      setEmailTip(message);

      window.alert(message);
    } finally {
      setIsSendingCode(false);
    }
  }


  /* =========================================================
     验证真实邮箱验证码

     接口：
     POST /api/inquiry/verify-code/
  ========================================================= */

  async function handleVerifyEmailCode() {
    if (
      isVerifyingCode ||
      verifyCountdown > 0
    ) {
      return;
    }

    if (!emailCodeSent) {
      window.alert(
        data.form.alerts.sendCodeFirst,
      );

      return;
    }

    const email =
      formData.email.trim();

    const code =
      formData.emailCode.trim();

    if (!code) {
      window.alert(
        data.form.alerts.codeRequired,
      );

      return;
    }

    setIsVerifyingCode(true);

    try {
      await postInquiryApi(
        "/api/inquiry/verify-code/",
        {
          email,
          code,
        },
      );

      setEmailCodeVerified(true);

      setEmailTip(
        data.form.emailVerification.verifiedTip,
      );
    } catch (error) {
      const message =
        getInquiryApiErrorMessage(
          error,
          data,
        );

      setEmailCodeVerified(false);
      setEmailTip(message);

      const errorCode =
        error instanceof InquiryApiError
          ? error.code
          : "";

      if (
        errorCode ===
          "verification_code_missing" ||
        errorCode ===
          "verification_code_invalid" ||
        errorCode ===
          "verification_code_expired"
      ) {
        setEmailCodeSent(false);
      }

      if (
        errorCode ===
        "verification_code_incorrect"
      ) {
        setVerifyCountdown(5);

        const timer =
          window.setInterval(() => {
            setVerifyCountdown((prev) => {
              if (prev <= 1) {
                window.clearInterval(timer);

                return 0;
              }

              return prev - 1;
            });
          }, 1000);
      }

      window.alert(message);
    } finally {
      setIsVerifyingCode(false);
    }
  }

  /* =========================================================
     附件上传
  ========================================================= */

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    trackFirstFormInteraction();
    const files = Array.from(event.target.files ?? []);

    const maxFileSize = 20 * 1024 * 1024;

    const validFiles: File[] = [];

    files.forEach((file) => {
      if (file.size > maxFileSize) {
        window.alert(
          `${data.form.alerts.fileTooLargePrefix}${file.name}${data.form.alerts.fileTooLargeSuffix}`,
        );
        return;
      }

      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setSelectedFiles((prev) => [...prev, ...validFiles]);
    }

    event.target.value = "";
  }

  /* =========================================================
     删除附件
  ========================================================= */

  function handleRemoveFile(fileIndex: number) {
    setSelectedFiles((prev) => prev.filter((_, index) => index !== fileIndex));
  }

  /* =========================================================
     使用隐藏 iframe 调出浏览器打印 / 保存 PDF 窗口

     说明：
     1. 不打开 about:blank 新标签页
     2. 在当前页面创建隐藏 iframe
     3. 把 buildContactPdfHtml 生成的 A4 HTML 写入 iframe
     4. 等页眉页脚图片加载完成后调用 print()
  ========================================================= */

  function printRequirementFromHiddenIframe(
    internalFileName: string,
    requestNumber: string,
    createdAtText: string,
  ) {
    const currentLang =
      typeof document !== "undefined"
        ? document.documentElement.lang || "zh-CN"
        : "zh-CN";

    const pdfHtml = buildContactPdfHtml({
      data,
      formData,
      selectedFiles,
      requestNumber,
      createdAtText,
      htmlLang: currentLang,
    });

    const iframe = document.createElement("iframe");

    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.setAttribute("aria-hidden", "true");

    document.body.appendChild(iframe);

    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow?.document;

    if (!iframeDocument || !iframe.contentWindow) {
      document.body.removeChild(iframe);
      window.alert(data.form.alerts.popupBlocked);
      return false;
    }

    iframeDocument.open();
    iframeDocument.write(pdfHtml);
    iframeDocument.close();

    iframeDocument.title = internalFileName.replace(/\.pdf$/i, "");

    window.setTimeout(async () => {
      await waitForIframeImages(iframeDocument);

      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }, 600);

    window.setTimeout(() => {
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    }, 60000);

    return true;
  }


  /* =========================================================
     提交真实询盘

     执行顺序：
     1. 检查邮箱验证状态
     2. 把询盘内容和附件提交至官网 API
     3. 后端向公司和客户发送邮件
     4. 邮件发送成功后生成并打印需求单
     5. 显示提交成功弹窗

     接口：
     POST /api/inquiry/submit/
  ========================================================= */

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!emailCodeSent) {
      window.alert(
        data.form.alerts.sendCodeFirst,
      );
      trackSubmitFailure("captcha_error", "email_verification");

      return;
    }

    if (!emailCodeVerified) {
      window.alert(
        data.form.alerts.verifyEmailFirst,
      );
      trackSubmitFailure("captcha_error", "email_verification");

      return;
    }

    const generatedFileName =
      createInternalArchiveFileName(
        formData,
      );

    const currentLang =
      typeof document !== "undefined"
        ? document.documentElement.lang ||
          "zh-CN"
        : "zh-CN";

    const createdAtText =
      new Date().toLocaleString(
        currentLang,
        {
          hour12: false,
        },
      );

    setInternalArchiveFileName(
      generatedFileName,
    );

    setIsSubmitting(true);

    try {
      const submissionFormData =
        new FormData();

      const submissionFields:
        Record<string, string> = {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          requestType:
            formData.requestType,
          productType:
            formData.productType,
          targetModel:
            formData.targetModel,
          projectStage:
            formData.projectStage,
          message: formData.message,
          locale: currentLang,
        };

      Object.entries(
        submissionFields,
      ).forEach(([key, value]) => {
        submissionFormData.append(
          key,
          value,
        );
      });

      selectedFiles.forEach((file) => {
        submissionFormData.append(
          "attachments",
          file,
          file.name,
        );
      });

      const apiResult =
        await postInquiryApi(
          "/api/inquiry/submit/",
          submissionFormData,
        );

      const nextReferenceId =
        apiResult.referenceId || "";

      const requestNumber =
        nextReferenceId
          ? "FOREACH-" +
            nextReferenceId
          : createRequestNumber();

      setReferenceId(
        nextReferenceId,
      );

      /*
       * 邮件已经发送成功。
       * 接下来生成浏览器打印版需求单。
       */
      printRequirementFromHiddenIframe(
        generatedFileName,
        requestNumber,
        createdAtText,
      );

      /*
       * 后端提交成功后，邮箱验证状态会被消耗。
       * 前端同步重置验证状态，避免重复提交。
       */
      setEmailCodeVerified(false);
      setEmailCodeSent(false);

      setFormData((prev) => ({
        ...prev,
        emailCode: "",
      }));

      setEmailTip(
        data.form.emailVerification.tip,
      );

      setShowSuccessModal(true);
      trackLeadGenerated({
        formId: "contact_inquiry_form",
        formType: "general_inquiry",
        sourceSection: "contact_form_section",
        locale: currentLang,
      });
      formStartedRef.current = false;
    } catch (error) {
      const message =
        getInquiryApiErrorMessage(
          error,
          data,
        );

      const errorCode =
        error instanceof InquiryApiError
          ? error.code
          : "";

      if (
        errorCode ===
          "email_not_verified" ||
        errorCode ===
          "email_verification_expired"
      ) {
        setEmailCodeVerified(false);
        setEmailCodeSent(false);
        setEmailTip(message);
      }

      let analyticsErrorType: InquiryErrorType = "api_error";

      if (error instanceof TypeError) {
        analyticsErrorType = "network_error";
      } else if (error instanceof InquiryApiError) {
        if (error.status === 429) {
          analyticsErrorType = "rate_limit";
        } else if (error.code.includes("attachment")) {
          analyticsErrorType = "attachment_error";
        } else if (
          error.code === "email_not_verified" ||
          error.code === "email_verification_expired"
        ) {
          analyticsErrorType = "captcha_error";
        }
      }

      trackSubmitFailure(analyticsErrorType, "api_submit");

      console.error(
        "询盘提交失败：",
        error,
      );

      window.alert(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact-form-panel" aria-label={data.form.panelTitle}>
      <div className="contact-form-panel-head">
        <h3>{data.form.panelTitle}</h3>
      </div>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
        onInvalidCapture={handleNativeValidationFailure}
      >
        <div className="contact-form-grid">
          {/* 姓名 */}
          <div className="contact-field">
            <label htmlFor="contact-name">
              {data.form.fields.name.label}
              <span>*</span>
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              placeholder={data.form.fields.name.placeholder}
              onChange={handleFieldChange}
              required
            />
          </div>

          {/* 公司名称 */}
          <div className="contact-field">
            <label htmlFor="contact-company">
              {data.form.fields.company.label}
              <span>*</span>
            </label>
            <input
              id="contact-company"
              name="company"
              type="text"
              value={formData.company}
              placeholder={data.form.fields.company.placeholder}
              onChange={handleFieldChange}
              required
            />
          </div>

          {/* 邮箱验证码 */}
          <div className="contact-field contact-field-full">
            <label htmlFor="contact-email">
              {data.form.emailVerification.emailLabel}
              <span>*</span>
            </label>

            <div className="contact-email-row">
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                placeholder={data.form.emailVerification.emailPlaceholder}
                onChange={handleFieldChange}
                required
              />

              <button
                className="contact-mini-button brand-navy-button-motion"
                type="button"
                onClick={handleSendEmailCode}
                disabled={
                  sendCountdown > 0 ||
                  isSubmitting ||
                  isSendingCode ||
                  isVerifyingCode
                }
              >
                {isSendingCode
                  ? data.form.emailVerification.sendButton + "..."
                  : sendCountdown > 0
                    ? String(sendCountdown) +
                      data.form.actions.resendCountdownSuffix
                    : data.form.emailVerification.sendButton}
              </button>

              <input
                name="emailCode"
                type="text"
                value={formData.emailCode}
                placeholder={data.form.emailVerification.codePlaceholder}
                onChange={handleFieldChange}
                disabled={isSubmitting}
              />

              <button
                className="contact-mini-button brand-navy-button-motion"
                type="button"
                onClick={handleVerifyEmailCode}
                disabled={
                  verifyCountdown > 0 ||
                  emailCodeVerified ||
                  isSubmitting ||
                  isVerifyingCode ||
                  !emailCodeSent
                }
              >
                {isVerifyingCode
                  ? data.form.emailVerification.verifyButton + "..."
                  : emailCodeVerified
                    ? data.form.actions.emailVerified
                    : verifyCountdown > 0
                      ? String(verifyCountdown) +
                        data.form.actions.retryCountdownSuffix
                      : data.form.emailVerification.verifyButton}
              </button>
            </div>

            <p className="contact-email-tip">{emailTip}</p>
          </div>

          {/* 需求类型 */}
          <div className="contact-field">
            <label htmlFor="contact-request-type">
              {data.form.labels.requestType}
              <span>*</span>
            </label>
            <select
              id="contact-request-type"
              name="requestType"
              value={formData.requestType}
              onChange={handleFieldChange}
              required
              disabled={isSubmitting}
            >
              {data.form.requestTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* 电话 / 微信 */}
          <div className="contact-field">
            <label htmlFor="contact-phone">{data.form.fields.phone.label}</label>
            <input
              id="contact-phone"
              name="phone"
              type="text"
              value={formData.phone}
              placeholder={data.form.fields.phone.placeholder}
              onChange={handleFieldChange}
              disabled={isSubmitting}
            />
          </div>

          {/* 目标产品 / 部件类型 */}
          <div className="contact-field">
            <label htmlFor="contact-product-type">
              {data.form.labels.productType}
            </label>
            <select
              id="contact-product-type"
              name="productType"
              value={formData.productType}
              onChange={handleFieldChange}
              disabled={isSubmitting}
            >
              <option value="">{data.form.placeholders.productType}</option>

              {data.form.productGroups.map((group) => (
                <optgroup key={group.groupName} label={group.groupName}>
                  {group.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          {/* 当前阶段 */}
          <div className="contact-field">
            <label htmlFor="contact-project-stage">
              {data.form.labels.projectStage}
            </label>
            <select
              id="contact-project-stage"
              name="projectStage"
              value={formData.projectStage}
              onChange={handleFieldChange}
              disabled={isSubmitting}
            >
              <option value="">{data.form.placeholders.projectStage}</option>

              {data.form.projectStages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          {/* 具体型号 / 竞品型号 */}
          <div className="contact-field contact-field-full">
            <label htmlFor="contact-target-model">
              {data.form.fields.targetModel.label}
            </label>
            <input
              id="contact-target-model"
              name="targetModel"
              type="text"
              value={formData.targetModel}
              placeholder={data.form.fields.targetModel.placeholder}
              onChange={handleFieldChange}
              disabled={isSubmitting}
            />
          </div>

          {/* 需求描述 */}
          <div className="contact-field contact-field-full">
            <label htmlFor="contact-message">
              {data.form.fields.message.label}
              <span>*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              placeholder={data.form.fields.message.placeholder}
              onChange={handleFieldChange}
              required
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* 提交区 */}
        <div className="contact-submit-row">
          <p>{data.form.fileTip}</p>

          <div className="contact-submit-actions">
            <div className="contact-submit-buttons">
              <label className="contact-file-button brand-navy-button-motion">
                {data.form.uploadButton}
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.zip,.rar,.dxf,.dwg"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                />
              </label>

              <button
                className="contact-submit-button brand-navy-button-motion"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? data.form.submitButton + "..."
                  : data.form.submitButton}
              </button>
            </div>

            {selectedFiles.length > 0 ? (
              <div className="contact-file-list">
                {selectedFiles.map((file, index) => (
                  <div className="contact-file-item" key={`${file.name}-${index}`}>
                    <span>{file.name}</span>
                    <span>{formatFileSize(file.size)}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      disabled={isSubmitting}
                    >
                      {data.form.actions.removeFile}
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </form>

      {/* 提交成功弹窗 */}
      {showSuccessModal ? (
        <div
          className="contact-success-modal"
          role="dialog"
          aria-modal="true"
          aria-label={data.form.successModal.title}
          data-internal-file-name={internalArchiveFileName}
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="contact-success-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="contact-success-icon">✓</div>

            <h3>{data.form.successModal.title}</h3>

            <p>{data.form.successModal.description}</p>

            {referenceId ? (
              <p>
                <strong>Reference:</strong>{" "}
                {referenceId}
              </p>
            ) : null}

            <button
              className="contact-success-button"
              type="button"
              onClick={() => setShowSuccessModal(false)}
            >
              {data.form.successModal.closeButton}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
