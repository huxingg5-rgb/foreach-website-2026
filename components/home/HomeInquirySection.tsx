// components/home/HomeInquirySection.tsx
"use client";

// 首页第六屏：在线询盘
//
// 说明：
// 1. 这个组件只负责表单状态、邮箱验证码逻辑、提交逻辑和页面渲染
// 2. 所有文字、表单标签、下拉选项、提示信息，统一从 data/home-inquiry.ts 读取
// 3. 表单提交时，product / application 使用稳定英文 value，不再提交中文文字
// 4. 后期接后台 / CRM / 邮件系统时，数据会更稳定

import { FormEvent, useState } from "react";

import type { LocaleCode } from "@/lib/i18n";

import {
  getHomeInquiryText,
  homeInquiryData,
} from "@/data/home-inquiry";

/* ================================
   组件参数类型
================================ */

type HomeInquirySectionProps = {
  locale: LocaleCode; // 当前语言，例如 zh-CN / en / es / fr / ko / ru
};

/* ================================
   API 返回类型

   说明：
   后端接口后面可以返回：
   {
     message: "..."
   }
================================ */

type ApiResponse = {
  message?: string;
};

/* ================================
   简单邮箱格式判断

   说明：
   当前只做基础判断，避免用户明显填错。
   后端正式上线时，还需要后端再次校验。
================================ */

function isValidEmail(email: string) {
  return email.includes("@") && email.includes(".");
}

/* ================================
   验证码倒计时按钮文字

   说明：
   这里不单独放进 data 文件，是因为它带动态数字 countdown。
================================ */

function getCountdownLabel(countdown: number, locale: LocaleCode) {
  if (locale === "zh-CN") {
    return `${countdown}秒后重发`;
  }

  if (locale === "ko") {
    return `${countdown}초 후 재전송`;
  }

  if (locale === "ru") {
    return `${countdown} с`;
  }

  return `${countdown}s`;
}

/**
 * HomeInquirySection
 * 首页第 6 屏：在线询盘
 *
 * 后端接口预留：
 * 1. 发送验证码：/api/inquiry/send-code
 * 2. 校验验证码：/api/inquiry/verify-code
 * 3. 提交询盘：/api/inquiry/submit
 */
export default function HomeInquirySection({ locale }: HomeInquirySectionProps) {
  // 感兴趣产品
  const [product, setProduct] = useState("");

  // 应用领域
  const [application, setApplication] = useState("");

  // 其他应用领域
  const [otherApplication, setOtherApplication] = useState("");

  // 邮箱是否验证通过
  const [emailVerified, setEmailVerified] = useState(false);

  // 验证码倒计时
  const [countdown, setCountdown] = useState(0);

  // 页面提示信息
  const [message, setMessage] = useState("");

  // 是否正在提交询盘
  const [isSubmitting, setIsSubmitting] = useState(false);

  const text = homeInquiryData;

  /**
   * 发送邮箱验证码
   * 当前请求预留 API：/api/inquiry/send-code
   */
  async function handleSendCode() {
    const emailInput = document.getElementById(
      "email",
    ) as HTMLInputElement | null;

    const email = emailInput?.value.trim() || "";

    setMessage("");

    if (!isValidEmail(email)) {
      setMessage(getHomeInquiryText(text.messages.invalidEmail, locale));
      return;
    }

    try {
      const res = await fetch("/api/inquiry/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json().catch(() => ({}))) as ApiResponse;

      if (!res.ok) {
        setMessage(
          data.message ||
            getHomeInquiryText(text.messages.sendCodeFailed, locale),
        );
        return;
      }

      setEmailVerified(false);

      setMessage(
        data.message ||
          getHomeInquiryText(text.messages.sendCodeSuccess, locale),
      );

      setCountdown(60);

      const timer = window.setInterval(() => {
        setCountdown((current) => {
          if (current <= 1) {
            window.clearInterval(timer);
            return 0;
          }

          return current - 1;
        });
      }, 1000);
    } catch {
      setMessage(getHomeInquiryText(text.messages.sendCodeFailed, locale));
    }
  }

  /**
   * 校验邮箱验证码
   * 当前请求预留 API：/api/inquiry/verify-code
   */
  async function handleVerifyCode() {
    const emailInput = document.getElementById(
      "email",
    ) as HTMLInputElement | null;

    const codeInput = document.getElementById(
      "verifyCode",
    ) as HTMLInputElement | null;

    const email = emailInput?.value.trim() || "";
    const code = codeInput?.value.trim() || "";

    setMessage("");

    if (!isValidEmail(email)) {
      setMessage(getHomeInquiryText(text.messages.invalidEmail, locale));
      return;
    }

    if (!code) {
      setMessage(getHomeInquiryText(text.messages.verifyCodeFailed, locale));
      return;
    }

    try {
      const res = await fetch("/api/inquiry/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = (await res.json().catch(() => ({}))) as ApiResponse;

      if (!res.ok) {
        setEmailVerified(false);

        setMessage(
          data.message ||
            getHomeInquiryText(text.messages.verifyCodeFailed, locale),
        );

        return;
      }

      setEmailVerified(true);

      setMessage(
        data.message ||
          getHomeInquiryText(text.messages.verifyCodeSuccess, locale),
      );
    } catch {
      setEmailVerified(false);
      setMessage(getHomeInquiryText(text.messages.verifyCodeFailed, locale));
    }
  }

  /**
   * 提交询盘表单
   * 当前请求预留 API：/api/inquiry/submit
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    ).value.trim();

    const company = (
      form.elements.namedItem("company") as HTMLInputElement
    ).value.trim();

    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value.trim();

    const region = (
      form.elements.namedItem("region") as HTMLInputElement
    ).value.trim();

    const requirementMessage = (
      form.elements.namedItem("message") as HTMLTextAreaElement
    ).value.trim();

    const finalApplication =
      application === "other" ? otherApplication.trim() : application;

    const formData = {
      name,
      company,
      email,
      product,
      region,
      application: finalApplication,
      message: requirementMessage,
      locale,
    };

    setMessage("");

    if (!formData.name) {
      setMessage(getHomeInquiryText(text.messages.requiredName, locale));
      return;
    }

    if (!formData.company) {
      setMessage(getHomeInquiryText(text.messages.requiredCompany, locale));
      return;
    }

    if (!isValidEmail(formData.email)) {
      setMessage(getHomeInquiryText(text.messages.invalidEmail, locale));
      return;
    }

    if (!emailVerified) {
      setMessage(
        getHomeInquiryText(text.messages.requiredEmailVerified, locale),
      );
      return;
    }

    if (!formData.product) {
      setMessage(getHomeInquiryText(text.messages.requiredProduct, locale));
      return;
    }

    if (!formData.application) {
      setMessage(getHomeInquiryText(text.messages.requiredApplication, locale));
      return;
    }

    if (!formData.message) {
      setMessage(getHomeInquiryText(text.messages.requiredMessage, locale));
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiry/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = (await res.json().catch(() => ({}))) as ApiResponse;

      if (!res.ok) {
        setMessage(
          data.message ||
            getHomeInquiryText(text.messages.submitFailed, locale),
        );
        return;
      }

      setMessage(
        data.message ||
          getHomeInquiryText(text.messages.submitSuccess, locale),
      );

      form.reset();
      setProduct("");
      setApplication("");
      setOtherApplication("");
      setEmailVerified(false);
    } catch {
      setMessage(getHomeInquiryText(text.messages.submitFailed, locale));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      className="screen-section contact-screen"
      id={homeInquiryData.sectionId}
      aria-labelledby="inquiry-title"
    >
      <div className="screen-inner">
        <div className="contact-layout">
          {/* 左侧需求说明区域 */}
          <aside className="demand-panel">
            <h2 className="demand-title">
              {getHomeInquiryText(text.left.title, locale)}
            </h2>

            <p className="demand-intro">
              {getHomeInquiryText(text.left.description, locale)}
            </p>

            <div className="demand-list">
              {text.supportItems.map((item, index) => (
                <div className="demand-item" key={item.key}>
                  <span className="demand-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h3 className="demand-item-title">
                      {getHomeInquiryText(item.title, locale)}
                    </h3>

                    <p className="demand-item-text">
                      {getHomeInquiryText(item.description, locale)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* 右侧在线询盘表单 */}
          <aside
            className="inquiry-panel"
            aria-label={getHomeInquiryText(text.form.title, locale)}
          >
            <div className="inquiry-panel-head">
              <h3 id="inquiry-title" className="inquiry-title">
                {getHomeInquiryText(text.form.title, locale)}
              </h3>

              <p className="inquiry-desc">
                {getHomeInquiryText(text.form.description, locale)}
              </p>
            </div>

            <form className="inquiry-form" onSubmit={handleSubmit}>
              <div className="form-grid-two">
                <div className="field">
                  <label htmlFor="name">
                    {getHomeInquiryText(text.form.nameLabel, locale)}
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={getHomeInquiryText(
                      text.form.namePlaceholder,
                      locale,
                    )}
                  />
                </div>

                <div className="field">
                  <label htmlFor="company">
                    {getHomeInquiryText(text.form.companyLabel, locale)}
                  </label>

                  <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder={getHomeInquiryText(
                      text.form.companyPlaceholder,
                      locale,
                    )}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="email">
                  {getHomeInquiryText(text.form.emailLabel, locale)}
                </label>

                <div className="verify-row">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={getHomeInquiryText(
                      text.form.emailPlaceholder,
                      locale,
                    )}
                    onChange={() => {
                      setEmailVerified(false);
                    }}
                  />

                  <button
                    className="plain-btn small-btn"
                    type="button"
                    onClick={handleSendCode}
                    disabled={countdown > 0}
                  >
                    {countdown > 0
                      ? getCountdownLabel(countdown, locale)
                      : getHomeInquiryText(text.form.sendCodeButton, locale)}
                  </button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="verifyCode">
                  {getHomeInquiryText(
                    text.form.verificationCodeLabel,
                    locale,
                  )}
                </label>

                <div className="verify-code-row">
                  <input
                    id="verifyCode"
                    name="verifyCode"
                    type="text"
                    placeholder={getHomeInquiryText(
                      text.form.verificationCodePlaceholder,
                      locale,
                    )}
                  />

                  <button
                    className="plain-btn small-btn"
                    type="button"
                    onClick={handleVerifyCode}
                  >
                    {emailVerified
                      ? getHomeInquiryText(text.form.verifiedLabel, locale)
                      : getHomeInquiryText(text.form.verifyCodeButton, locale)}
                  </button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="productSelect">
                  {getHomeInquiryText(text.form.productLabel, locale)}
                </label>

                <select
                  id="productSelect"
                  value={product}
                  onChange={(event) => setProduct(event.target.value)}
                >
                  <option value="">
                    {getHomeInquiryText(text.form.productPlaceholder, locale)}
                  </option>

                  {text.productOptions.map((option) => (
                    <option value={option.value} key={option.value}>
                      {getHomeInquiryText(option.label, locale)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-grid-two">
                <div className="field">
                  <label htmlFor="region">
                    {getHomeInquiryText(text.form.countryLabel, locale)}
                  </label>

                  <input
                    id="region"
                    name="region"
                    type="text"
                    placeholder={getHomeInquiryText(
                      text.form.countryPlaceholder,
                      locale,
                    )}
                  />
                </div>

                <div className="field">
                  <label htmlFor="application">
                    {getHomeInquiryText(text.form.applicationLabel, locale)}
                  </label>

                  <select
                    id="application"
                    value={application}
                    onChange={(event) => {
                      const nextApplication = event.target.value;

                      setApplication(nextApplication);

                      if (nextApplication !== "other") {
                        setOtherApplication("");
                      }
                    }}
                  >
                    <option value="">
                      {getHomeInquiryText(
                        text.form.applicationPlaceholder,
                        locale,
                      )}
                    </option>

                    {text.applicationOptions.map((option) => (
                      <option value={option.value} key={option.value}>
                        {getHomeInquiryText(option.label, locale)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                className={`field other-application-field ${
                  application === "other" ? "show" : ""
                }`}
              >
                <label htmlFor="otherApplication">
                  {getHomeInquiryText(
                    text.form.otherApplicationLabel,
                    locale,
                  )}
                </label>

                <input
                  id="otherApplication"
                  name="otherApplication"
                  type="text"
                  placeholder={getHomeInquiryText(
                    text.form.otherApplicationPlaceholder,
                    locale,
                  )}
                  value={otherApplication}
                  onChange={(event) =>
                    setOtherApplication(event.target.value)
                  }
                />
              </div>

              <div className="field">
                <label htmlFor="message">
                  {getHomeInquiryText(text.form.messageLabel, locale)}
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder={getHomeInquiryText(
                    text.form.messagePlaceholder,
                    locale,
                  )}
                />
              </div>

              {message && <div className="result-box show">{message}</div>}

              <div className="submit-row">
                <p className="submit-tip">
                  {getHomeInquiryText(text.form.description, locale)}
                </p>

                <button
                  className="primary-btn submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? getHomeInquiryText(text.form.submittingButton, locale)
                    : getHomeInquiryText(text.form.submitButton, locale)}
                </button>
              </div>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
}