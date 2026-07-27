"use client";

/* =========================================================
   components/contact/DistributorPageContent.tsx
   经销商合作页面主体组件

   说明：
   1. 负责经销商合作页面结构、表单交互、邮箱验证码预览、附件选择
   2. 提交后使用隐藏 iframe 调出浏览器打印 / 保存 PDF 窗口
   3. PDF 内容调用 buildDistributorPdfHtml.ts 生成
   4. 页眉页脚仍然沿用统一设计
   5. PDF 中间正文使用经销商专用字段结构，不再套用联系我们需求单字段
   6. 经销商页面主体文案来自 data/contact-cooperation/distributor.intl.ts
   7. 联系方式与地图文案由 page.tsx 服务端按语言传入，避免 Hydration mismatch

   注意：
   1. 邮箱验证码使用 /api/inquiry/send-code 和 /verify-code
   2. 表单提交使用 /api/inquiry/submit
   3. 附件当前只提交文件名称、类型和大小，原文件不上传
========================================================= */

import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState } from "react";

import AmapBlock from "@/components/contact/AmapBlock";

import type { getContactIntlData } from "@/data/contact-cooperation/contact.intl";

import type { DistributorPageData } from "@/data/contact-cooperation/distributor.intl";

import {
  buildDistributorPdfHtml,
  formatDistributorFileSize,
  type DistributorPdfFormState,
} from "@/components/contact/buildDistributorPdfHtml";

/* =========================================================
   组件参数类型

   说明：
   1. content：经销商合作页面主体文案
   2. contactPageData：联系方式与地图文案
   3. contactPageData 由 page.tsx 在服务端根据 locale 传入
   4. 这里不再用 window.location.pathname 判断语言
   5. 这样可以避免服务端英文、客户端西语导致 Hydration mismatch
========================================================= */

type DistributorPageContentProps = {
  content: DistributorPageData;
  contactPageData: ReturnType<typeof getContactIntlData>;
};

/* =========================================================
   表单值类型
   说明：
   与 buildDistributorPdfHtml.ts 中的 DistributorPdfFormState 保持一致
========================================================= */

type DistributorFormValues = DistributorPdfFormState;

/* =========================================================
   表单初始值
========================================================= */

const initialFormValues: DistributorFormValues = {
  companyName: "",
  country: "",
  contactName: "",
  phone: "",
  email: "",
  emailCode: "",
  website: "",
  industry: "",
  productInterest: "",
  requirement: "",
};

/* =========================================================
   获取年月日
   输出示例：20260602
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
   输出示例：FYD-DIST-20260602-143025
========================================================= */

function createRequestNumber() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");

  const hour = String(now.getHours()).padStart(2, "0");

  const minute = String(now.getMinutes()).padStart(2, "0");

  const second = String(now.getSeconds()).padStart(2, "0");

  return `FYD-DIST-${year}${month}${day}-${hour}${minute}${second}`;
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
   公司名称_产品方向_DistributorPartnership_年月日.pdf
========================================================= */

function createInternalArchiveFileName(formData: DistributorFormValues) {
  const dateStamp = createDateStamp();

  const companyPart = sanitizeFileNamePart(
    formData.companyName || formData.contactName,
    "Company",
  );

  const productPart = sanitizeFileNamePart(
    formData.productInterest || formData.industry,
    "Distributor",
  );

  return `${companyPart}_${productPart}_DistributorPartnership_${dateStamp}.pdf`;
}

/* =========================================================
   等待 iframe 中图片加载完成
   说明：
   1. PDF 页眉页脚是 SVG 图片
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
   页面主体组件
========================================================= */

export default function DistributorPageContent({
  content,
  contactPageData,
}: DistributorPageContentProps) {
  const [formValues, setFormValues] =
    useState<DistributorFormValues>(initialFormValues);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [emailCodeSent, setEmailCodeSent] = useState(false);

  const [emailCodeVerified, setEmailCodeVerified] = useState(false);

  const [emailTip, setEmailTip] = useState(content.form.emailTipDefault);

  const [sendCountdown, setSendCountdown] = useState(0);

  const [verifyCountdown, setVerifyCountdown] = useState(0);

  const [isSendingCode, setIsSendingCode] = useState(false);

  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [internalArchiveFileName, setInternalArchiveFileName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* 上传文件名称列表 */
  const fileNames = useMemo(
    () => selectedFiles.map((file) => file.name),
    [selectedFiles],
  );

  /* =========================================================
     更新表单字段
  ========================================================= */

  function updateFormValue(field: keyof DistributorFormValues, value: string) {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
      ...(field === "email" ? { emailCode: "" } : {}),
    }));

    if (field === "email") {
      setEmailCodeSent(false);
      setEmailCodeVerified(false);
      setEmailTip(content.form.emailTipDefault);
    }

    if (showSuccessModal) {
      setShowSuccessModal(false);
    }
  }

  /* =========================================================
     发送真实邮箱验证码
  ========================================================= */

  async function handleSendCode() {
    if (isSendingCode || sendCountdown > 0) return;

    const email = formValues.email.trim();

    if (!email) {
      window.alert(content.form.emailTipDefault);
      return;
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailReg.test(email)) {
      window.alert(content.toast.invalidEmail);
      return;
    }

    setIsSendingCode(true);
    setEmailCodeSent(false);
    setEmailCodeVerified(false);

    try {
      const response = await fetch("/api/inquiry/send-code/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({ email }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || result.success !== true) {
        if (result.error === "send_too_frequently") {
          setEmailTip(
            "A verification code was sent recently. Please wait before trying again.",
          );
        } else {
          setEmailTip(
            "The verification email could not be sent. Please try again later.",
          );
        }

        return;
      }

      setEmailCodeSent(true);
      setEmailTip(
        "Verification code sent. Please check your email.",
      );

      setSendCountdown(60);

      const timer = window.setInterval(() => {
        setSendCountdown((prev) => {
          if (prev <= 1) {
            window.clearInterval(timer);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error(
        "Distributor verification email failed:",
        error,
      );

      setEmailTip(
        "The verification email could not be sent. Please try again later.",
      );
    } finally {
      setIsSendingCode(false);
    }
  }

  /* =========================================================
     验证真实邮箱验证码
  ========================================================= */

  async function handleVerifyCode() {
    if (isVerifyingCode || verifyCountdown > 0) return;

    const email = formValues.email.trim();
    const code = formValues.emailCode.trim();

    if (!emailCodeSent) {
      window.alert(content.form.emailTipDefault);
      return;
    }

    if (!code) {
      window.alert(content.form.codePlaceholder);
      return;
    }

    setIsVerifyingCode(true);

    try {
      const response = await fetch("/api/inquiry/verify-code/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          email,
          code,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || result.success !== true) {
        setEmailCodeVerified(false);

        if (
          result.error === "verification_code_expired" ||
          result.error === "verification_code_missing"
        ) {
          setEmailCodeSent(false);

          setEmailTip(
            "The verification code has expired. Please request a new code.",
          );
        } else {
          setEmailTip(content.toast.wrongCode);
        }

        setVerifyCountdown(3);

        const timer = window.setInterval(() => {
          setVerifyCountdown((prev) => {
            if (prev <= 1) {
              window.clearInterval(timer);
              return 0;
            }

            return prev - 1;
          });
        }, 1000);

        return;
      }

      setEmailCodeVerified(true);
      setEmailTip(content.form.emailTipVerified);
    } catch (error) {
      console.error(
        "Distributor verification failed:",
        error,
      );

      setEmailCodeVerified(false);

      setEmailTip(
        "The verification code could not be checked. Please try again later.",
      );
    } finally {
      setIsVerifyingCode(false);
    }
  }

  /* =========================================================
     附件上传
  ========================================================= */

  function handleFilesChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    const maxFileSize = 20 * 1024 * 1024;

    const validFiles: File[] = [];

    files.forEach((file) => {
      if (file.size > maxFileSize) {
        window.alert(`File ${file.name} ${content.toast.fileTooLarge}`);
        return;
      }

      validFiles.push(file);
    });

    if (validFiles.length > 0) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }

    event.target.value = "";
  }

  /* =========================================================
     删除附件
  ========================================================= */

  function handleRemoveFile(fileIndex: number) {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== fileIndex),
    );
  }

  /* =========================================================
     使用隐藏 iframe 调出浏览器打印 / 保存 PDF 窗口

     说明：
     1. 和 ContactInquiryForm.tsx 保持一致
     2. 不打开 about:blank 新标签页
     3. 在当前页面创建隐藏 iframe
     4. 把 buildDistributorPdfHtml 生成的 A4 HTML 写入 iframe
     5. 等页眉页脚图片加载完成后调用 print()
  ========================================================= */

  function printRequirementFromHiddenIframe(
    internalFileName: string,
    requestNumber: string,
    createdAtText: string,
  ) {
    const currentLang =
      typeof document !== "undefined"
        ? document.documentElement.lang || "en"
        : "en";

    const pdfHtml = buildDistributorPdfHtml({
      content,
      formData: formValues,
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
      window.alert("The browser blocked the PDF preview window.");
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
     提交表单

     说明：
     1. 校验邮箱验证码
     2. 生成需求单号
     3. 使用经销商专用 PDF HTML 生成器
     4. 使用隐藏 iframe 打印 / 保存 PDF
     5. 显示成功弹窗
  ========================================================= */

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    if (!emailCodeSent) {
      window.alert(content.form.emailTipDefault);
      return;
    }

    if (!emailCodeVerified) {
      window.alert(content.toast.needVerifyEmail);
      return;
    }

    const generatedFileName =
      createInternalArchiveFileName(formValues);

    const requestNumber = createRequestNumber();

    const currentLang =
      typeof document !== "undefined"
        ? document.documentElement.lang || "en"
        : "en";

    const createdAtText =
      new Date().toLocaleString(currentLang, {
        hour12: false,
      });

    setInternalArchiveFileName(generatedFileName);
    setIsSubmitting(true);

    try {
      const requirementText = [
        `Country / Region: ${formValues.country.trim() || "-"}`,
        `Company Website: ${formValues.website.trim() || "-"}`,
        "",
        formValues.requirement.trim(),
      ].join("\n");

      const response = await fetch("/api/inquiry/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          name: formValues.contactName.trim(),
          company: formValues.companyName.trim(),
          email: formValues.email.trim(),
          phone: formValues.phone.trim(),

          requestType:
            "Distributor Partnership",

          productType:
            formValues.productInterest.trim() ||
            "Distributor Cooperation",

          targetModel:
            formValues.website.trim(),

          projectStage:
            formValues.industry.trim(),

          region:
            formValues.country.trim(),

          application:
            formValues.industry.trim(),

          message:
            requirementText,

          locale:
            currentLang,

          attachments:
            selectedFiles.map((file) => ({
              name: file.name,
              type:
                file.type ||
                "application/octet-stream",
              size: file.size,
            })),
        }),
      });

      const result =
        (await response
          .json()
          .catch(() => ({}))) as {
          success?: boolean;
          error?: string;
          referenceId?: string;
        };

      if (
        !response.ok ||
        result.success !== true
      ) {
        if (
          result.error === "email_not_verified" ||
          result.error ===
            "email_verification_expired"
        ) {
          setEmailCodeSent(false);
          setEmailCodeVerified(false);

          setEmailTip(
            "Email verification has expired. Please request a new code.",
          );
        }

        throw new Error(
          result.error ||
            "distributor_submit_failed",
        );
      }

      const printStarted =
        printRequirementFromHiddenIframe(
          generatedFileName,
          result.referenceId || requestNumber,
          createdAtText,
        );

      if (!printStarted) {
        console.warn(
          "Distributor PDF print window could not be opened.",
        );
      }

      setEmailCodeSent(false);
      setEmailCodeVerified(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error(
        "Distributor request submission failed:",
        error,
      );

      window.alert(
        "The distributor application could not be submitted. Please try again later or contact us by email.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="distributor-page">
      {/* =====================================================
          顶部 Banner
      ===================================================== */}
      <section className="distributor-hero">
        <div className="distributor-section-inner distributor-hero-inner">
          <div className="distributor-hero-content">
            <h1>
              {content.hero.titlePrefix}{" "}
              <span>{content.hero.titleBrand}</span>{" "}
              {content.hero.titleSuffix}
              {content.hero.titleSecondLine && (
                <>
                  <br />
                  {content.hero.titleSecondLine}
                </>
              )}
            </h1>

            <p>{content.hero.desc}</p>

            <div className="distributor-hero-actions">
              <a href="#form" className="distributor-btn distributor-btn-ghost">
                {content.hero.primaryButton}
              </a>

              <a
                href="#products"
                className="distributor-btn distributor-btn-ghost"
              >
                {content.hero.secondaryButton}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          合作优势
      ===================================================== */}
      <section className="distributor-section distributor-advantage-section">
        <div className="distributor-section-inner">
          <div className="distributor-section-head">
            <h2>{content.advantagesHead.title}</h2>
            <p>{content.advantagesHead.desc}</p>
          </div>

          <div className="distributor-card-grid distributor-card-grid-border">
            {content.advantages.map((item) => (
              <article className="distributor-info-card" key={item.index}>
                <div className="distributor-card-index">{item.index}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          合作产品
      ===================================================== */}
      <section
        className="distributor-section distributor-products-section"
        id="products"
      >
        <div className="distributor-section-inner">
          <div className="distributor-section-head">
            <h2>{content.productsHead.title}</h2>
            <p>{content.productsHead.desc}</p>
          </div>

          <div className="distributor-product-grid">
            {content.products.map((item) => (
              <article className="distributor-product-card" key={item.title}>
                <div className="distributor-product-image">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="distributor-product-content">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>

                  <div className="distributor-product-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          合作伙伴类型
      ===================================================== */}
      <section className="distributor-section distributor-partner-section">
        <div className="distributor-section-inner">
          <div className="distributor-section-head">
            <h2>{content.partnersHead.title}</h2>
            <p>{content.partnersHead.desc}</p>
          </div>

          <div className="distributor-card-grid distributor-card-grid-border">
            {content.partners.map((item) => (
              <article className="distributor-info-card" key={item.index}>
                <div className="distributor-card-index">{item.index}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          合作流程
      ===================================================== */}
      <section className="distributor-section distributor-process-section">
        <div className="distributor-section-inner">
          <div className="distributor-section-head distributor-section-head-light">
            <h2>{content.processHead.title}</h2>
            <p>{content.processHead.desc}</p>
          </div>

          <div className="distributor-process-grid">
            {content.process.map((item) => (
              <article className="distributor-process-card" key={item.index}>
                <div className="distributor-process-index">{item.index}</div>
                <div className="distributor-process-dot" />
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          合作申请表
      ===================================================== */}
      <section className="distributor-section distributor-form-section" id="form">
        <div className="distributor-section-inner distributor-form-layout">
          {/* 左侧填写指引 */}
          <aside className="distributor-guide-panel">
            <div className="distributor-guide-head">
              <h3>{content.guide.title}</h3>
              <p>{content.guide.desc}</p>
            </div>

            <div className="distributor-guide-list">
              {content.guide.items.map((item) => (
                <div className="distributor-guide-item" key={item.index}>
                  <div>{item.index}</div>

                  <section>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </section>
                </div>
              ))}
            </div>
          </aside>

          {/* 右侧合作申请表 */}
          <form className="distributor-form-panel" onSubmit={handleSubmit}>
            <h3>{content.form.title}</h3>

            <div className="distributor-form-grid">
              <label>
                <span className="distributor-field-title">
                  {content.form.companyName} <em>*</em>
                </span>
                <input
                  value={formValues.companyName}
                  onChange={(event) =>
                    updateFormValue("companyName", event.target.value)
                  }
                  type="text"
                  placeholder={content.form.companyNamePlaceholder}
                  required
                  disabled={isSubmitting}
                />
              </label>

              <label>
                <span className="distributor-field-title">
                  {content.form.country} <em>*</em>
                </span>
                <input
                  value={formValues.country}
                  onChange={(event) =>
                    updateFormValue("country", event.target.value)
                  }
                  type="text"
                  placeholder={content.form.countryPlaceholder}
                  required
                  disabled={isSubmitting}
                />
              </label>

              <label>
                <span className="distributor-field-title">
                  {content.form.contactName} <em>*</em>
                </span>
                <input
                  value={formValues.contactName}
                  onChange={(event) =>
                    updateFormValue("contactName", event.target.value)
                  }
                  type="text"
                  placeholder={content.form.contactNamePlaceholder}
                  required
                  disabled={isSubmitting}
                />
              </label>

              <label>
                <span className="distributor-field-title">
                  {content.form.phone}
                </span>
                <input
                  value={formValues.phone}
                  onChange={(event) =>
                    updateFormValue("phone", event.target.value)
                  }
                  type="text"
                  placeholder={content.form.phonePlaceholder}
                  disabled={isSubmitting}
                />
              </label>

              <label className="distributor-form-full">
                <span className="distributor-field-title">
                  {content.form.emailVerification} <em>*</em>
                </span>

                <div className="distributor-email-row">
                  <input
                    value={formValues.email}
                    onChange={(event) =>
                      updateFormValue("email", event.target.value)
                    }
                    type="email"
                    placeholder={content.form.emailPlaceholder}
                    required
                    disabled={isSubmitting}
                  />

                  <button
                    className="brand-navy-button-motion"
                    type="button"
                    onClick={handleSendCode}
                    disabled={sendCountdown > 0 || isSendingCode || isSubmitting}
                  >
                    {isSendingCode
                      ? "Sending..."
                      : sendCountdown > 0
                        ? `${sendCountdown}s`
                        : content.form.sendCode}
                  </button>

                  <input
                    value={formValues.emailCode}
                    onChange={(event) =>
                      updateFormValue("emailCode", event.target.value)
                    }
                    type="text"
                    placeholder={content.form.codePlaceholder}
                    disabled={isSubmitting}
                  />

                  <button
                    className="brand-navy-button-motion"
                    type="button"
                    onClick={handleVerifyCode}
                    disabled={
                      verifyCountdown > 0 ||
                      emailCodeVerified ||
                      isVerifyingCode ||
                      isSubmitting
                    }
                  >
                    {isVerifyingCode
                      ? "Verifying..."
                      : emailCodeVerified
                        ? content.form.verified
                        : verifyCountdown > 0
                          ? `${verifyCountdown}s`
                          : content.form.verify}
                  </button>
                </div>

                <small>{emailTip}</small>
              </label>

              <label>
                <span className="distributor-field-title">
                  {content.form.website}
                </span>
                <input
                  value={formValues.website}
                  onChange={(event) =>
                    updateFormValue("website", event.target.value)
                  }
                  type="url"
                  placeholder={content.form.websitePlaceholder}
                  disabled={isSubmitting}
                />
              </label>

              <label>
                <span className="distributor-field-title">
                  {content.form.industry}
                </span>

                <select
                  value={formValues.industry}
                  onChange={(event) =>
                    updateFormValue("industry", event.target.value)
                  }
                  disabled={isSubmitting}
                >
                  <option value="" disabled>
                    {content.form.industryPlaceholder}
                  </option>

                  {content.form.options.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="distributor-form-full">
                <span className="distributor-field-title">
                  {content.form.productInterest}
                </span>
                <input
                  value={formValues.productInterest}
                  onChange={(event) =>
                    updateFormValue("productInterest", event.target.value)
                  }
                  type="text"
                  placeholder={content.form.productInterestPlaceholder}
                  disabled={isSubmitting}
                />
              </label>

              <label className="distributor-form-full">
                <span className="distributor-field-title">
                  {content.form.requirement} <em>*</em>
                </span>
                <textarea
                  value={formValues.requirement}
                  onChange={(event) =>
                    updateFormValue("requirement", event.target.value)
                  }
                  placeholder={content.form.requirementPlaceholder}
                  required
                  disabled={isSubmitting}
                />
              </label>

              <div className="distributor-submit-row">
                <p>{content.form.uploadTip}</p>

                <label className="distributor-upload-btn brand-navy-button-motion">
                  {content.form.uploadButton}
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.zip,.rar,.dxf,.dwg"
                    onChange={handleFilesChange}
                    disabled={isSubmitting}
                  />
                </label>

                <button
                  type="submit"
                  className="distributor-submit-btn brand-navy-button-motion"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : content.form.submitButton}
                </button>
              </div>

              {fileNames.length > 0 && (
                <div className="distributor-file-list distributor-form-full">
                  {selectedFiles.map((file, index) => (
                    <button
                      key={`${file.name}-${index}`}
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      disabled={isSubmitting}
                    >
                      {file.name} · {formatDistributorFileSize(file.size)} ×
                    </button>
                  ))}
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* =====================================================
          联系方式 + 地图
          说明：
          1. 复用联系我们页面的信息模块
          2. 放在经销商表单和底部 CTA 之间
          3. contactPageData 由服务端 page.tsx 传入，不在客户端重新判断语言
      ===================================================== */}
      <section
        className="contact-section contact-info-section distributor-contact-info-section"
        id="distributor-contact-info"
      >
        <div className="contact-section-inner">
          <div className="contact-section-head">
            <h2 className="contact-section-title">
              {contactPageData.contactInfo.title}
            </h2>

            <p className="contact-section-desc">
              {contactPageData.contactInfo.description}
            </p>
          </div>

          <div className="contact-info-layout">
            {/* 左侧公司联系信息 */}
            <section className="contact-company-panel">
              <h3>
                {contactPageData.contactInfo.companyName}
                <span>{contactPageData.contactInfo.companyPosition}</span>
              </h3>

              {contactPageData.contactInfo.rows.map((row) => (
                <div className="contact-info-row" key={row.label}>
                  <div>{row.label}</div>
                  <div>{row.value}</div>
                </div>
              ))}
            </section>

            {/* 右侧地图 */}
            <AmapBlock
              title={contactPageData.contactInfo.map.title}
              address={contactPageData.contactInfo.map.address}
              lng={contactPageData.contactInfo.map.lng}
              lat={contactPageData.contactInfo.map.lat}
              mapUrl={contactPageData.contactInfo.map.mapUrl}
              loadingText={contactPageData.form.mapTexts.loading}
              errorText={contactPageData.form.mapTexts.error}
              openMapText={contactPageData.form.mapTexts.openMap}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          底部 CTA
      ===================================================== */}
      <section className="distributor-bottom-cta">
        <div className="distributor-section-inner distributor-bottom-cta-inner">
          <div>
            <h2>{content.bottomCta.title}</h2>
            <p>{content.bottomCta.desc}</p>
          </div>

          <a href="#form" className="distributor-btn distributor-btn-main">
            {content.bottomCta.button}
          </a>
        </div>
      </section>

      {/* 提交成功弹窗：复用联系我们页面成功弹窗样式 */}
      {showSuccessModal ? (
        <div
          className="contact-success-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Submitted Successfully"
          data-internal-file-name={internalArchiveFileName}
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="contact-success-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="contact-success-icon">✓</div>

            <h3>Submitted Successfully</h3>

            <p>
              We have received your partnership application. The FOREACH team
              will review your information and follow up based on your market
              region, product interest, and cooperation needs.
            </p>

            <button
              className="contact-success-button"
              type="button"
              onClick={() => setShowSuccessModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}
