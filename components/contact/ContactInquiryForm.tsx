/* =========================================================
   ContactInquiryForm.tsx
   恒永达官网｜联系我们需求表单组件

   文件路径：
   components/contact/ContactInquiryForm.tsx

   当前方案：
   1. 管理联系我们页面的需求提交表单
   2. 管理姓名、公司、邮箱、电话、需求类型、产品类型、当前阶段等字段
   3. 管理邮箱验证码前端测试逻辑
   4. 管理附件上传、附件显示和附件删除
   5. 提交后使用 buildContactPdfHtml.ts 生成 A4 需求单 HTML
   6. 使用隐藏 iframe 调出浏览器打印 / 保存 PDF 窗口
   7. 不再引用 pdfmake 的 buildContactPdfDocument.ts
   8. buildContactPdfDocument.ts 可以先保留，但本文件不再使用它

   注意：
   1. 当前验证码仍然是前端测试验证码
   2. 正式上线后再接真实验证码接口和后台提交接口
========================================================= */

"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { ContactPageData } from "@/data/contact-cooperation";
import {
  buildContactPdfHtml,
  formatFileSize,
  type ContactFormState,
} from "@/components/contact/buildContactPdfHtml";

/* =========================================================
   组件 Props 类型
========================================================= */

type ContactInquiryFormProps = {
  data: ContactPageData; // 当前语言页面数据
  presetRequestType?: string; // 外部卡片点击后传进来的需求类型
};

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

  const [mockEmailCode, setMockEmailCode] = useState("");

  const [emailCodeVerified, setEmailCodeVerified] = useState(false);

  const [emailTip, setEmailTip] = useState(data.form.emailVerification.tip);

  const [sendCountdown, setSendCountdown] = useState(0);

  const [verifyCountdown, setVerifyCountdown] = useState(0);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [internalArchiveFileName, setInternalArchiveFileName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "email") {
      setEmailCodeVerified(false);
      setMockEmailCode("");
      setEmailTip(data.form.emailVerification.tip);
    }

    if (showSuccessModal) {
      setShowSuccessModal(false);
    }
  }

  /* =========================================================
     发送邮箱验证码
     当前为前端测试逻辑：
     1. 验证码来自 contact.zh.ts 等数据文件里的 mockCode
     2. 正式上线后改成后端接口发送真实验证码
  ========================================================= */

  function handleSendEmailCode() {
    const email = formData.email.trim();

    if (!email) {
      window.alert(data.form.alerts.emailRequired);
      return;
    }

    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailReg.test(email)) {
      window.alert(data.form.alerts.invalidEmail);
      return;
    }

    const code = data.form.emailVerification.mockCode;

    setMockEmailCode(code);
    setEmailCodeVerified(false);
    setEmailTip(`${data.form.emailVerification.codeSentTip}${code}`);
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
  }

  /* =========================================================
     验证邮箱验证码
  ========================================================= */

  function handleVerifyEmailCode() {
    if (verifyCountdown > 0) return;

    if (!mockEmailCode) {
      window.alert(data.form.alerts.sendCodeFirst);
      return;
    }

    if (!formData.emailCode.trim()) {
      window.alert(data.form.alerts.codeRequired);
      return;
    }

    if (formData.emailCode.trim() !== mockEmailCode) {
      setEmailCodeVerified(false);
      setEmailTip(`${data.form.emailVerification.invalidCodeTip}${mockEmailCode}`);
      setVerifyCountdown(60);

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
    setEmailTip(data.form.emailVerification.verifiedTip);
  }

  /* =========================================================
     附件上传
  ========================================================= */

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
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
     表单提交
     当前阶段：
     1. 校验邮箱验证码
     2. 生成需求单号
     3. 生成 PDF 文件名
     4. 调出浏览器打印 / 保存 PDF 窗口
     5. 显示提交成功弹窗

     后续接后台：
     1. 先把表单数据和附件提交给后台
     2. 后台保存成功后，再生成 / 打印 PDF
  ========================================================= */

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    if (!mockEmailCode) {
      window.alert(data.form.alerts.sendCodeFirst);
      return;
    }

    if (!emailCodeVerified) {
      window.alert(data.form.alerts.verifyEmailFirst);
      return;
    }

    const generatedFileName = createInternalArchiveFileName(formData);

    const requestNumber = createRequestNumber();

    const currentLang =
      typeof document !== "undefined"
        ? document.documentElement.lang || "zh-CN"
        : "zh-CN";

    const createdAtText = new Date().toLocaleString(currentLang, {
      hour12: false,
    });

    setInternalArchiveFileName(generatedFileName);

    setIsSubmitting(true);

    try {
      const printStarted = printRequirementFromHiddenIframe(
        generatedFileName,
        requestNumber,
        createdAtText,
      );

      if (!printStarted) {
        return;
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.error("需求单生成失败：", error);
      window.alert("需求单生成失败，请稍后重试，或直接通过邮箱联系我们。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="contact-form-panel" aria-label={data.form.panelTitle}>
      <div className="contact-form-panel-head">
        <h3>{data.form.panelTitle}</h3>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
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
                className="contact-mini-button"
                type="button"
                onClick={handleSendEmailCode}
                disabled={sendCountdown > 0 || isSubmitting}
              >
                {sendCountdown > 0
                  ? `${sendCountdown}${data.form.actions.resendCountdownSuffix}`
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
                className="contact-mini-button"
                type="button"
                onClick={handleVerifyEmailCode}
                disabled={verifyCountdown > 0 || emailCodeVerified || isSubmitting}
              >
                {emailCodeVerified
                  ? data.form.actions.emailVerified
                  : verifyCountdown > 0
                    ? `${verifyCountdown}${data.form.actions.retryCountdownSuffix}`
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

          <div className="contact-file-area">
            <label className="contact-file-button">
              {data.form.uploadButton}
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.zip,.rar,.dxf,.dwg"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
            </label>

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

          <button
            className="contact-submit-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "正在生成需求单..." : data.form.submitButton}
          </button>
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