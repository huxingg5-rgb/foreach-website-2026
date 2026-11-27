/* =========================================================
   ContactInquiryForm.tsx
   恒永达官网｜联系我们需求表单组件

   文件路径：
   components/contact/ContactInquiryForm.tsx

   当前方案：
   1. 管理联系我们页面的需求提交表单
   2. 管理姓名、公司、邮箱、电话、需求类型、产品类型、当前阶段等字段
   3. 提交询盘及附件
   4. 提交成功后显示结果，并支持页面版需求单的打印
========================================================= */

"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import type { ContactPageData } from "@/data/contact-cooperation";
import { getInquiryTransportLocale } from "@/data/contact-cooperation/inquiry-transport";
import {
  buildContactPdfHtml,
  formatFileSize,
  type ContactFormState,
} from "@/components/contact/buildContactPdfHtml";
import {
  trackBeginInquiry,
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
  initialValues?: Partial<Pick<ContactFormState, "requestType" | "productType" | "targetModel" | "projectStage">>;
  idPrefix?: string;
  variant?: "page" | "modal";
  onSuccessClose?: () => void;
  onDraftStart?: () => void;
  analyticsFormId?: string;
  analyticsSourceSection?: string;
  onAnalyticsStart?: () => void;
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
  payload: FormData,
): Promise<InquiryApiResponse> {
  let response: Response;

  try {
    response = await fetch("/api/inquiry/submit/", {
      method: "POST",
      cache: "no-store",
      body: payload,
    });
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
  | "de"
  | "it"
  | "hi"
  | "es"
  | "fr"
  | "ko"
  | "ru";

type InquiryRuntimeText = {
  rateLimited: string;
  networkError: string;
  configurationError: string;
  genericError: string;
  requiredFieldsMissing: string;
};

const INQUIRY_RUNTIME_TEXT: Record<
  InquiryRuntimeLocale,
  InquiryRuntimeText
> = {
  "zh-CN": {
    requiredFieldsMissing: "请填写姓名、公司名称和邮箱。",
    rateLimited: "提交过于频繁，请稍后再试。",
    networkError:
      "网络连接失败，请检查网络后重试。",
    configurationError:
      "邮件服务尚未配置完成，请联系网站管理员。",
    genericError:
      "操作失败，请稍后重试，或直接通过邮箱联系我们。",
  },

  en: {
    requiredFieldsMissing: "Enter your name, company name, and email address.",
    rateLimited: "Too many submissions. Please try again later.",
    networkError:
      "The network request failed. Please check your connection and try again.",
    configurationError:
      "The email service has not been configured. Please contact the website administrator.",
    genericError:
      "The operation failed. Please try again later or contact us by email.",
  },

  de: {
    requiredFieldsMissing: "Geben Sie Ihren Namen, den Firmennamen und Ihre E-Mail-Adresse ein.",
    rateLimited: "Zu viele Anfragen in kurzer Zeit. Versuchen Sie es später erneut.",
    networkError: "Die Anfrage konnte nicht gesendet werden. Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
    configurationError: "Der E-Mail-Dienst ist noch nicht eingerichtet. Wenden Sie sich an den Website-Administrator.",
    genericError: "Der Vorgang ist fehlgeschlagen. Versuchen Sie es später erneut oder kontaktieren Sie uns per E-Mail.",
  },

  hi: {
    requiredFieldsMissing: "अपना नाम, कंपनी का नाम और ईमेल पता दर्ज करें।",
    rateLimited: "बहुत कम समय में कई अनुरोध भेजे गए। कुछ समय बाद फिर कोशिश करें।",
    networkError: "अनुरोध नहीं भेजा जा सका। नेटवर्क कनेक्शन जाँचें और फिर कोशिश करें।",
    configurationError: "ईमेल सेवा अभी सेट नहीं है। वेबसाइट के व्यवस्थापक से संपर्क करें।",
    genericError: "कार्रवाई पूरी नहीं हुई। बाद में फिर कोशिश करें या ईमेल से संपर्क करें।",
  },

  it: {
    requiredFieldsMissing: "Inserisci il tuo nome, il nome dell’azienda e l’indirizzo e-mail.",
    rateLimited: "Hai inviato troppe richieste. Riprova più tardi.",
    networkError: "La richiesta non è stata inviata. Controlla la connessione e riprova.",
    configurationError: "Il servizio e-mail non è ancora configurato. Contatta l’amministratore del sito.",
    genericError: "L’operazione non è riuscita. Riprova più tardi o contattaci via e-mail.",
  },

  es: {
    requiredFieldsMissing: "Indique su nombre, empresa y dirección de correo electrónico.",
    rateLimited: "Demasiados envíos. Vuelva a intentarlo más tarde.",
    networkError:
      "La solicitud de red ha fallado. Compruebe su conexión e inténtelo de nuevo.",
    configurationError:
      "El servicio de correo aún no está configurado. Contacte con el administrador.",
    genericError:
      "La operación ha fallado. Inténtelo más tarde o contáctenos por correo.",
  },

  fr: {
    requiredFieldsMissing: "Indiquez votre nom, votre entreprise et votre adresse e-mail.",
    rateLimited: "Trop d’envois. Veuillez réessayer plus tard.",
    networkError:
      "La requête réseau a échoué. Vérifiez votre connexion et réessayez.",
    configurationError:
      "Le service d’e-mail n’est pas encore configuré. Contactez l’administrateur.",
    genericError:
      "L’opération a échoué. Réessayez plus tard ou contactez-nous par e-mail.",
  },

  ko: {
    requiredFieldsMissing: "이름, 회사명, 이메일 주소를 입력해 주세요.",
    rateLimited: "제출 횟수가 너무 많습니다. 잠시 후 다시 시도해 주세요.",
    networkError:
      "네트워크 요청에 실패했습니다. 연결 상태를 확인해 주세요.",
    configurationError:
      "이메일 서비스 설정이 완료되지 않았습니다. 관리자에게 문의해 주세요.",
    genericError:
      "작업에 실패했습니다. 잠시 후 다시 시도하거나 이메일로 문의해 주세요.",
  },

  ru: {
    requiredFieldsMissing: "Укажите имя, название компании и адрес электронной почты.",
    rateLimited: "Слишком много запросов. Повторите попытку позже.",
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

  if (rawLocale.startsWith("de")) {
    return "de";
  }

  if (rawLocale.startsWith("hi")) return "hi";

  if (rawLocale.startsWith("it")) {
    return "it";
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
    case "required_fields_missing":
    case "name_required":
    case "company_required":
      return runtimeText.requiredFieldsMissing;

    case "invalid_email":
      return data.form.alerts.invalidEmail;

    case "too_many_requests":
      return runtimeText.rateLimited;

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

function createInitialFormData(): ContactFormState {
  return {
    name: "", // 姓名
    company: "", // 公司名称
    email: "", // 邮箱
    phone: "", // 电话 / 微信
    requestType: "", // 需求类型
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
  initialValues,
  idPrefix = "contact",
  variant = "page",
  onSuccessClose,
  onDraftStart,
  analyticsFormId = "contact_inquiry_form",
  analyticsSourceSection = "contact_form_section",
  onAnalyticsStart,
}: ContactInquiryFormProps) {
  const [formData, setFormData] = useState<ContactFormState>(() =>
    ({
      ...createInitialFormData(), ...initialValues,
      ...(presetRequestType ? { requestType: presetRequestType } : {}),
    }),
  );
  const [previousRequestType, setPreviousRequestType] = useState(presetRequestType);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [internalArchiveFileName, setInternalArchiveFileName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [referenceId, setReferenceId] = useState("");
  const formStartedRef = useRef(false);
  const inquiryEnteredRef = useRef(false);
  const nativeValidationReportedRef = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant === "modal" && showSuccessModal) {
      successRef.current?.focus({ preventScroll: true });
    }
  }, [variant, showSuccessModal]);

  function getAnalyticsLocale() {
    return document.documentElement.lang || "zh-CN";
  }

  function trackInquiryEntry() {
    if (variant !== "page" || inquiryEnteredRef.current) return;
    inquiryEnteredRef.current = true;
    if (onAnalyticsStart) {
      onAnalyticsStart();
      return;
    }
    trackBeginInquiry({
      formId: analyticsFormId,
      formType: "general_inquiry",
      sourceSection: analyticsSourceSection,
      locale: getAnalyticsLocale(),
    });
  }

  function trackFirstFormInteraction() {
    if (formStartedRef.current) return;

    formStartedRef.current = true;
    trackInquiryEntry();
    onDraftStart?.();
    trackFormStart({
      formId: analyticsFormId,
      formType: "general_inquiry",
      sourceSection: analyticsSourceSection,
      locale: getAnalyticsLocale(),
    });
  }

  function trackSubmitFailure(
    errorType: InquiryErrorType,
    submissionStage: string,
  ) {
    trackInquirySubmitError({
      formId: analyticsFormId,
      formType: "general_inquiry",
      sourceSection: analyticsSourceSection,
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

  // Update only the externally selected request type, preserving the rest of the draft.
  if (presetRequestType !== previousRequestType) {
    setPreviousRequestType(presetRequestType);
    if (presetRequestType) {
      setFormData((prev) => ({ ...prev, requestType: presetRequestType }));
    }
  }

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

    if (showSuccessModal) {
      setShowSuccessModal(false);
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

      const { submissionValues } = data.form;
      const submissionFields:
        Record<string, string> = {
          formType: "general_inquiry",
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          requestType:
            submissionValues?.requestType[formData.requestType] ?? formData.requestType,
          productType:
            submissionValues?.productType[formData.productType] ?? formData.productType,
          targetModel:
            formData.targetModel,
          projectStage:
            submissionValues?.projectStage[formData.projectStage] ?? formData.projectStage,
          message: formData.message,
          locale: getInquiryTransportLocale(currentLang),
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

      const apiResult = await postInquiryApi(submissionFormData);

      const nextReferenceId =
        apiResult.referenceId || "";

      const requestNumber =
        nextReferenceId
          ? "Foreach-" +
            nextReferenceId
          : createRequestNumber();

      setReferenceId(
        nextReferenceId,
      );

      /*
       * 邮件已经发送成功。
       * 接下来生成浏览器打印版需求单。
       */
      if (variant === "page") {
        printRequirementFromHiddenIframe(
          generatedFileName,
          requestNumber,
          createdAtText,
        );
      }

      setShowSuccessModal(true);
      trackLeadGenerated({
        formId: analyticsFormId,
        formType: "general_inquiry",
        sourceSection: analyticsSourceSection,
        locale: currentLang,
      });
      formStartedRef.current = false;
      inquiryEnteredRef.current = false;
    } catch (error) {
      const message =
        getInquiryApiErrorMessage(
          error,
          data,
        );

      let analyticsErrorType: InquiryErrorType = "api_error";

      if (error instanceof TypeError || (error instanceof InquiryApiError && error.code === "network_error")) {
        analyticsErrorType = "network_error";
      } else if (error instanceof InquiryApiError) {
        if (error.status === 429) {
          analyticsErrorType = "rate_limit";
        } else if (error.code.includes("attachment")) {
          analyticsErrorType = "attachment_error";

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

  if (variant === "modal" && showSuccessModal) {
    return (
      <div className="contact-inline-success" ref={successRef} tabIndex={-1} role="status">
        <div className="contact-success-icon" aria-hidden="true">✓</div>
        <h3>{data.form.successModal.title}</h3>
        <p>{data.form.successModal.description}</p>
        {referenceId ? <p>{data.form.pdfTexts.requestNumber}：{referenceId}</p> : null}
        <button type="button" className="contact-success-button" onClick={() => {
          setShowSuccessModal(false);
          setFormData({ ...createInitialFormData(), ...initialValues });
          setSelectedFiles([]);
          onSuccessClose?.();
        }}>{data.form.successModal.closeButton}</button>
      </div>
    );
  }

  return (
    <section className="contact-form-panel" aria-label={data.form.panelTitle}>
      <div className="contact-form-panel-head">
        <h3>{data.form.panelTitle}</h3>
      </div>

      <form
        className="contact-form"
        onSubmit={handleSubmit}
        onFocusCapture={(event) => {
          if ((event.target as HTMLElement).matches("input, select, textarea")) trackInquiryEntry();
        }}
        onInvalidCapture={handleNativeValidationFailure}
      >
        <div className="contact-form-grid">
          {/* 姓名 */}
          <div className="contact-field">
            <label htmlFor={`${idPrefix}-name`}>
              {data.form.fields.name.label}
              <span>*</span>
            </label>
            <input
              id={`${idPrefix}-name`}
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
            <label htmlFor={`${idPrefix}-company`}>
              {data.form.fields.company.label}
              <span>*</span>
            </label>
            <input
              id={`${idPrefix}-company`}
              name="company"
              type="text"
              value={formData.company}
              placeholder={data.form.fields.company.placeholder}
              onChange={handleFieldChange}
              required
            />
          </div>

          {/* 邮箱 */}
          <div className="contact-field">
            <label htmlFor={`${idPrefix}-email`}>
              {data.form.emailVerification.emailLabel}
              <span>*</span>
            </label>

            <input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              placeholder={data.form.emailVerification.emailPlaceholder}
              onChange={handleFieldChange}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* 电话 / 微信 */}
          <div className="contact-field">
            <label htmlFor={`${idPrefix}-phone`}>{data.form.fields.phone.label} {data.form.labels.optional}</label>
            <input
              id={`${idPrefix}-phone`}
              name="phone"
              type="text"
              value={formData.phone}
              placeholder={data.form.fields.phone.placeholder}
              onChange={handleFieldChange}
              disabled={isSubmitting}
            />
          </div>

          {/* 需求类型 */}
          <div className="contact-field">
            <label htmlFor={`${idPrefix}-request-type`}>
              {data.form.labels.requestType} {data.form.labels.optional}
            </label>
            <select
              id={`${idPrefix}-request-type`}
              name="requestType"
              value={formData.requestType}
              onChange={handleFieldChange}
              disabled={isSubmitting}
            >
              <option value="">{data.form.labels.optional}</option>
              {data.form.requestTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* 目标产品 / 部件类型 */}
          <div className="contact-field">
            <label htmlFor={`${idPrefix}-product-type`}>
              {data.form.labels.productType} {data.form.labels.optional}
            </label>
            <select
              id={`${idPrefix}-product-type`}
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
            <label htmlFor={`${idPrefix}-project-stage`}>
              {data.form.labels.projectStage} {data.form.labels.optional}
            </label>
            <select
              id={`${idPrefix}-project-stage`}
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
          <div className="contact-field">
            <label htmlFor={`${idPrefix}-target-model`}>
              {data.form.fields.targetModel.label} {data.form.labels.optional}
            </label>
            <input
              id={`${idPrefix}-target-model`}
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
            <label htmlFor={`${idPrefix}-message`}>
              {data.form.fields.message.label} {data.form.labels.optional}
            </label>
            <textarea
              id={`${idPrefix}-message`}
              name="message"
              value={formData.message}
              placeholder={data.form.fields.message.placeholder}
              onChange={handleFieldChange}
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
                {data.form.uploadButton} {data.form.labels.optional}
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.zip,.rar,.dxf,.dwg"
                  onChange={handleFileChange}
                  disabled={isSubmitting}
                />
              </label>

              <button
                className={`contact-submit-button${variant === "page" ? " brand-navy-button-motion" : ""}`}
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
