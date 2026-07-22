"use client";

/* =========================================================
   CompanyInfoRequestModal.tsx
   恒永达官网｜通用公司信息申请弹窗组件

   文件路径：
   components/forms/company-info-request/CompanyInfoRequestModal.tsx

   作用：
   1. 抽离通用的“填写公司信息”弹窗
   2. 当前用于：申请图纸
   3. 后续可复用到：规格书申请、资料包申请、询盘、样品申请
   4. 当前阶段只做前端视觉与模拟提交
   5. 新增测试版邮箱验证码：
      - 不发送真实邮件
      - 1 分钟只能发送 1 次
      - 测试验证码固定为 123456
      - 使用 localStorage 记录发送时间，避免关闭弹窗后立刻重新发送
   6. 真正邮件发送后续放到 services 层，例如：
      services/resources/requestDrawing.ts

   注意：
   1. 真实邮箱验证码不能写在前端
   2. 后期必须由后端生成验证码、发送邮件、校验验证码
   3. 当前只是为了先把前端流程和视觉跑通
========================================================= */

import { useEffect, useState, type FormEvent } from "react";

import { getCompanyInfoRequestCopy } from "./copy";
import styles from "./CompanyInfoRequestModal.module.css";

/* 邮箱验证码冷却时间
   说明：
   当前设为 60 秒，也就是 1 分钟只能发送 1 次。
*/
const EMAIL_CODE_COOLDOWN_SECONDS = 60;

type InquiryApiResponse = {
  success?: boolean;
  error?: string;
  referenceId?: string;
};

/**
 * 调用正式询盘接口。
 *
 * 说明：
 * 1. 接口必须返回 JSON
 * 2. HTTP 状态异常或 success 不为 true 时统一抛出错误码
 * 3. 页面只显示友好错误信息，不显示服务端密钥等敏感信息
 */
async function postInquiryApi(
  url: string,
  payload: Record<string, unknown>,
 ): Promise<InquiryApiResponse> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
    body: JSON.stringify(payload),
  });

  const data = (await response
    .json()
    .catch(() => ({}))) as InquiryApiResponse;

  if (!response.ok || data.success !== true) {
    throw new Error(data.error || "request_failed");
  }

  return data;
}

/** 将服务端错误码转换成用户可理解的提示。 */
function getInquiryErrorMessage(error: unknown, isEnglish: boolean) {
  const errorCode =
    error instanceof Error ? error.message : "request_failed";

  const messages: Record<string, [string, string]> = {
    invalid_email: [
      "Please enter a valid email address.",
      "请输入正确的邮箱地址。",
    ],
    send_too_frequently: [
      "A verification code was sent recently. Please try again in 60 seconds.",
      "验证码发送过于频繁，请在 60 秒后重新发送。",
    ],
    invalid_verification_data: [
      "Enter the complete six-digit verification code.",
      "请输入完整的六位邮箱验证码。",
    ],
    verification_code_missing: [
      "The verification code is unavailable. Please request a new code.",
      "验证码不存在或已失效，请重新发送验证码。",
    ],
    verification_code_expired: [
      "The verification code has expired. Please request a new code.",
      "验证码已过期，请重新发送验证码。",
    ],
    verification_code_incorrect: [
      "The verification code is incorrect.",
      "邮箱验证码不正确，请重新检查。",
    ],
    email_not_verified: [
      "Please verify your email address again.",
      "邮箱验证状态无效，请重新获取验证码。",
    ],
    email_verification_expired: [
      "Email verification has expired. Please verify it again.",
      "邮箱验证已过期，请重新获取验证码。",
    ],
    storage_not_configured: [
      "The verification service is not configured. Please contact the website administrator.",
      "验证码存储服务尚未配置，请联系网站管理员。",
    ],
    email_service_not_configured: [
      "The email service is not configured. Please contact the website administrator.",
      "邮件服务尚未配置，请联系网站管理员。",
    ],
    name_required: [
      "Please enter your name.",
      "请输入联系人姓名。",
    ],
    company_required: [
      "Please enter your company name.",
      "请输入公司名称。",
    ],
    required_fields_missing: [
      "Please complete all required information.",
      "请完整填写必填信息。",
    ],
    request_failed: [
      "The request could not be completed. Please try again later.",
      "请求未能完成，请稍后重新尝试。",
    ],
    server_error: [
      "The server could not complete the request. Please try again later.",
      "服务器暂时无法完成请求，请稍后重试。",
    ],
  };

  const matchedMessage = messages[errorCode];

  if (matchedMessage) {
    return isEnglish ? matchedMessage[0] : matchedMessage[1];
  }

  if (
    error instanceof Error &&
    error.message &&
    !/^[a-z0-9_]+$/i.test(error.message)
  ) {
    return error.message;
  }

  return isEnglish
    ? "The request could not be completed. Please try again later."
    : "请求未能完成，请稍后重新尝试。";
}

/* =========================================================
   弹窗中展示的申请条目

   说明：
   1. 图纸申请时，title 可以是恒永达型号
   2. metaLines 可以放商品编码、兼容编码等说明
   3. 后续规格书申请也可以复用这个结构
========================================================= */
export interface CompanyInfoRequestItem {
  id: string;
  title: string;
  metaLines?: string[];
}

/* =========================================================
   客户填写的信息结构

   说明：
   当前只是前端视觉。
   后续接邮件接口时，这个数据会提交给 service 层。
========================================================= */
export interface CompanyInfoFormValue {
  email: string;
  emailCode: string;
  name: string;
  company: string;
  country: string;
  phone: string;
  message: string;
}

/* =========================================================
   组件参数
========================================================= */
interface CompanyInfoRequestModalProps {
  /* 当前界面语言；未传时保持现有中文行为 */
  locale?: string;

  /* 是否打开弹窗 */
  isOpen: boolean;

  /*
     弹窗顶部小标题

     说明：
     1. 可选字段
     2. 如果不传，就不显示顶部英文小标题
     3. 当前图纸申请弹窗不显示 Drawing Request
  */
  eyebrow?: string;

  /* 弹窗主标题，例如 申请图纸 */
  title: string;

  /* 弹窗说明 */
  description: string;

  /* 当前申请条目 */
  items: CompanyInfoRequestItem[];

  /* 没有条目时的标题 */
  emptyTitle: string;

  /* 没有条目时的说明 */
  emptyDescription: string;

  /* 提交按钮文案 */
  submitLabel: string;

  /* 成功标题 */
  successTitle: string;

  /* 成功说明 */
  successDescription: string;

  /* 是否启用邮箱验证码 */
  enableEmailVerification?: boolean;

  /* 关闭弹窗 */
  onClose: () => void;

  /*
     前端模拟提交回调
     说明：
     1. 当前可以不传
     2. 后续接后端时，可以在这里调用 service
     3. 例如 requestDrawing(formValue, items)
  */
  onSubmitPreview?: (formValue: CompanyInfoFormValue) => void | Promise<void>;
}

/* =========================================================
   空表单默认值
========================================================= */
const EMPTY_FORM_VALUE: CompanyInfoFormValue = {
  email: "",
  emailCode: "",
  name: "",
  company: "",
  country: "",
  phone: "",
  message: "",
};

/* =========================================================
   通用公司信息申请弹窗
========================================================= */
export default function CompanyInfoRequestModal({
  locale = "zh-CN",
  isOpen,
  eyebrow,
  title,
  description,
  items,
  emptyTitle,
  emptyDescription,
  submitLabel,
  successTitle,
  successDescription,
  enableEmailVerification = true,
  onClose,
  onSubmitPreview,
}: CompanyInfoRequestModalProps) {
  const isEnglish = locale !== "zh-CN";
  const copy = getCompanyInfoRequestCopy(locale);
  const getLocalizedInquiryError = (error: unknown) =>
    locale === "zh-CN" || locale === "en"
      ? getInquiryErrorMessage(error, locale === "en")
      : copy.requestFailed;

  const [formValue, setFormValue] =
    useState<CompanyInfoFormValue>(EMPTY_FORM_VALUE);

  const [isSubmitted, setIsSubmitted] = useState(false);

  /* 邮箱验证码是否已发送 */
  const [hasEmailCodeSent, setHasEmailCodeSent] = useState(false);

  /* 邮箱验证码倒计时 */
  const [emailCodeCountdown, setEmailCodeCountdown] = useState(0);

  /* 表单错误提示 */
  const [formError, setFormError] = useState("");

  /* 正在发送验证码 */
  const [isSendingEmailCode, setIsSendingEmailCode] = useState(false);

  /* 正在校验验证码 */
  const [isVerifyingEmailCode, setIsVerifyingEmailCode] = useState(false);

  /* 正在正式提交申请 */
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* 当前邮箱是否已经通过服务端验证 */
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  const hasItems = items.length > 0;

  /* =========================================================
     弹窗每次打开时重置表单状态

     说明：
     1. 避免上一次提交成功状态残留
     2. 避免上一次填写内容残留
     3. 验证码倒计时不会简单清零，而是从 localStorage 读取剩余时间
     4. 这样关闭弹窗再打开，也不能绕过 1 分钟限制
  ========================================================= */
  useEffect(() => {
    if (!isOpen) return;

    setFormValue(EMPTY_FORM_VALUE);
    setIsSubmitted(false);
    setHasEmailCodeSent(false);
    setEmailCodeCountdown(0);
    setFormError("");
    setIsSendingEmailCode(false);
    setIsVerifyingEmailCode(false);
    setIsSubmitting(false);
    setIsEmailVerified(false);
    setVerifiedEmail("");
  }, [isOpen]);

  /* =========================================================
     邮箱验证码倒计时

     说明：
     1. 点击发送验证码后倒计时 60 秒
     2. 倒计时期间不能再次发送
     3. 当前只是前端测试版，不发送真实邮件
  ========================================================= */
  useEffect(() => {
    if (emailCodeCountdown <= 0) return;

    const timer = window.setTimeout(() => {
      setEmailCodeCountdown((currentValue) => {
        return Math.max(0, currentValue - 1);
      });
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [emailCodeCountdown]);

  /* 如果没打开，不渲染任何内容 */
  if (!isOpen) {
    return null;
  }

  /* =========================================================
     更新表单字段
  ========================================================= */
  function updateField(field: keyof CompanyInfoFormValue, value: string) {
    if (field === "email") {
      setHasEmailCodeSent(false);
      setEmailCodeCountdown(0);
      setIsEmailVerified(false);
      setVerifiedEmail("");
    }

    setFormValue((currentValue) => {
      return {
        ...currentValue,
        [field]: value,
        ...(field === "email" ? { emailCode: "" } : {}),
      };
    });

    setFormError("");
  }
  /* =========================================================
     发送正式邮箱验证码

     流程：
     1. 调用 /api/inquiry/send-code
     2. Resend 向客户邮箱发送真实六位验证码
     3. Upstash Redis 保存验证码和 60 秒发送锁
  ========================================================= */
  async function handleSendEmailCode() {
    const email = formValue.email.trim();

    if (!email) {
      setFormError(
        isEnglish
          ? copy.invalidEmail
          : "请先填写邮箱，再发送验证码。",
      );
      return;
    }

    setIsSendingEmailCode(true);
    setFormError("");
    setIsEmailVerified(false);
    setVerifiedEmail("");

    try {
      await postInquiryApi("/api/inquiry/send-code", {
        email,
      });

      setHasEmailCodeSent(true);
      setEmailCodeCountdown(EMAIL_CODE_COOLDOWN_SECONDS);
    } catch (error) {
      setFormError(getLocalizedInquiryError(error));
    } finally {
      setIsSendingEmailCode(false);
    }
  }
  /* =========================================================
     提交表单

     说明：
     1. 当前只做前端模拟提交
     2. 不发送邮件
     3. 如果启用邮箱验证，测试版要求输入 123456
     4. 后续真实提交时，在 onSubmitPreview 中调用 service
  ========================================================= */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasItems || isSubmitting) return;

    const email = formValue.email.trim();

    if (enableEmailVerification) {
      if (!hasEmailCodeSent && !isEmailVerified) {
        setFormError(
          isEnglish
            ? copy.requestCodeFirst
            : "请先发送邮箱验证码。",
        );
        return;
      }

      if (!isEmailVerified && !formValue.emailCode.trim()) {
        setFormError(
          isEnglish
            ? copy.enterCode
            : "请输入邮箱验证码。",
        );
        return;
      }
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const requiresVerification =
        enableEmailVerification &&
        (!isEmailVerified || verifiedEmail !== email);

      if (requiresVerification) {
        setIsVerifyingEmailCode(true);

        await postInquiryApi("/api/inquiry/verify-code", {
          email,
          code: formValue.emailCode.trim(),
        });

        setIsEmailVerified(true);
        setVerifiedEmail(email);
      }

      await onSubmitPreview?.({
        ...formValue,
        email,
      });

      setIsSubmitted(true);
    } catch (error) {
      const errorCode =
        error instanceof Error ? error.message : "";

      if (
        errorCode === "email_not_verified" ||
        errorCode === "email_verification_expired"
      ) {
        setIsEmailVerified(false);
        setVerifiedEmail("");
        setHasEmailCodeSent(false);
      }

      setFormError(getLocalizedInquiryError(error));
    } finally {
      setIsVerifyingEmailCode(false);
      setIsSubmitting(false);
    }
  }
  return (
    <div className={styles.modalLayer}>
      <button
        className={styles.modalMask}
        type="button"
        aria-label={copy.close}
        onClick={onClose}
      />

      <section className={styles.modal} aria-label={title}>
        <div className={styles.modalHead}>
          <div>
            {/*
              顶部小标题
              说明：
              1. 有 eyebrow 时才显示
              2. 图纸申请弹窗当前不显示 Drawing Request
            */}
            {eyebrow ? <span>{eyebrow}</span> : null}

            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
          >
            <svg
              viewBox="0 0 20 20"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M5 5L15 15M15 5L5 15" />
            </svg>
          </button>
        </div>

        {isSubmitted ? (
          <div className={styles.success}>
            <strong>{successTitle}</strong>

            <p>{successDescription}</p>

            <div className={styles.successActions}>
              <button type="button" onClick={onClose}>
                {copy.back}
              </button>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.summary}>
              <div>
                <span>{copy.requestedItems}</span>
                <strong>{items.length}</strong>
                <em>{copy.items}</em>
              </div>

              <p>
                {isEnglish
                  ? copy.summary
                  : "请确认需要申请的资料项目并填写公司信息。六位验证码将发送至您填写的邮箱。"}
              </p>
            </div>

            {hasItems ? (
              <div className={styles.itemList}>
                {items.map((item, index) => {
                  return (
                    <article className={styles.requestItem} key={item.id}>
                      <span>{String(index + 1).padStart(2, "0")}</span>

                      <div>
                        <strong>{item.title}</strong>

                        {item.metaLines && item.metaLines.length > 0 ? (
                          <p>
                            {item.metaLines.map((line) => {
                              return (
                                <span key={line}>
                                  {line}
                                  <br />
                                </span>
                              );
                            })}
                          </p>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className={styles.empty}>
                <strong>{emptyTitle}</strong>
                <p>{emptyDescription}</p>
              </div>
            )}

            <div className={styles.fields}>
              <label className={styles.emailField}>
                <span>
                  {copy.email.replace(/\s*\*$/, "")}
                  <em className={styles.requiredMark}>*</em>
                </span>

                <div className={styles.emailInputGroup}>
                  <input
                    type="email"
                    value={formValue.email}
                    placeholder={
                      isEnglish
                        ? copy.emailPlaceholder
                        : "请输入接收资料的邮箱"
                    }
                    required={hasItems}
                    onChange={(event) => {
                      updateField("email", event.target.value);
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleSendEmailCode}
                    disabled={
                      !hasItems ||
                      emailCodeCountdown > 0 ||
                      isSendingEmailCode ||
                      isSubmitting
                    }
                  >
                    {isSendingEmailCode
                      ? isEnglish
                        ? copy.sending
                        : "发送中..."
                      : emailCodeCountdown > 0
                        ? `${emailCodeCountdown}s`
                        : hasEmailCodeSent
                          ? isEnglish
                            ? copy.resendCode
                            : "重新发送"
                          : isEnglish
                            ? copy.sendCode
                            : "发送验证码"}
                  </button>
                </div>

                {enableEmailVerification && hasEmailCodeSent ? (
                  <em className={styles.emailCodeHint}>
                    {isEmailVerified
                      ? isEnglish
                        ? copy.verified
                        : "邮箱已验证。"
                      : isEnglish
                        ? copy.codeSent
                        : "验证码已发送，有效期为 10 分钟。"}
                  </em>
                ) : null}
              </label>

              {enableEmailVerification ? (
                <label>
                  <span>
                    {copy.code.replace(/\s*\*$/, "")}
                    <em className={styles.requiredMark}>*</em>
                  </span>
                  <input
                    type="text"
                    value={formValue.emailCode}
                    placeholder={
                      isEnglish
                        ? copy.codePlaceholder
                        : "请输入邮箱验证码"
                    }
                    required={hasItems}
                    onChange={(event) => {
                      updateField("emailCode", event.target.value);
                    }}
                  />
                </label>
              ) : null}

              <label>
                <span>
                  {copy.name.replace(/\s*\*$/, "")}
                  <em className={styles.requiredMark}>*</em>
                </span>
                <input
                  type="text"
                  value={formValue.name}
                  placeholder={
                    isEnglish ? copy.namePlaceholder : "请输入联系人姓名"
                  }
                  required={hasItems}
                  onChange={(event) => {
                    updateField("name", event.target.value);
                  }}
                />
              </label>

              <label>
                <span>
                  {copy.company.replace(/\s*\*$/, "")}
                  <em className={styles.requiredMark}>*</em>
                </span>
                <input
                  type="text"
                  value={formValue.company}
                  placeholder={
                    isEnglish ? copy.companyPlaceholder : "请输入公司名称"
                  }
                  required={hasItems}
                  onChange={(event) => {
                    updateField("company", event.target.value);
                  }}
                />
              </label>

              <label>
                <span>{copy.country}</span>
                <input
                  type="text"
                  value={formValue.country}
                  placeholder={
                    isEnglish ? copy.countryPlaceholder : "请输入国家或地区"
                  }
                  onChange={(event) => {
                    updateField("country", event.target.value);
                  }}
                />
              </label>

              <label>
                <span>{copy.phone}</span>
                <input
                  type="text"
                  value={formValue.phone}
                  placeholder={
                    isEnglish
                      ? copy.phonePlaceholder
                      : "选填，便于进一步沟通"
                  }
                  onChange={(event) => {
                    updateField("phone", event.target.value);
                  }}
                />
              </label>

              <label className={styles.fieldWide}>
                <span>{copy.notes}</span>
                <textarea
                  value={formValue.message}
                  placeholder={
                    isEnglish
                      ? copy.notesPlaceholder
                      : "可补充应用场景、资料用途或其他需求"
                  }
                  rows={4}
                  onChange={(event) => {
                    updateField("message", event.target.value);
                  }}
                />
              </label>
            </div>

            {formError ? (
              <div className={styles.formError}>{formError}</div>
            ) : null}

            <div className={styles.actions}>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={
                  !hasItems ||
                  isSubmitting ||
                  isSendingEmailCode
                }
              >
                {isSubmitting
                  ? isEnglish
                    ? isVerifyingEmailCode
                      ? copy.verifying
                      : copy.submitting
                    : isVerifyingEmailCode
                      ? "验证中..."
                      : "提交中..."
                  : submitLabel}
              </button>

              <button
                className={styles.backButton}
                type="button"
                onClick={onClose}
              >
                {copy.back}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
