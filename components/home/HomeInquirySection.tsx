// 这是关于 components/home/HomeInquirySection.tsx 的文件：用于管理首页第六屏“在线询盘”模块
// 这个文件的作用：负责询盘表单状态、邮箱验证码逻辑、表单提交逻辑和询盘页面渲染
// 后端接口预留说明：当前保留 3 个接口：发送验证码、校验验证码、提交询盘
// 后端接口 1：/api/inquiry/send-code
// 后端接口 2：/api/inquiry/verify-code
// 后端接口 3：/api/inquiry/submit

"use client"; // 这个组件需要表单交互、验证码倒计时和接口请求，所以必须是客户端组件

import { type FormEvent, useRef, useState } from "react"; // 引入表单事件类型和 useState 状态管理

import { getCountdownLabel, isValidEmail } from "@/components/home/HomeInquiryUtils"; // 引入询盘模块工具函数：邮箱校验和验证码倒计时文字

import type { LocaleCode } from "@/lib/i18n"; // 引入官网支持的语言代码类型，例如 zh-CN、en、es、fr、ko、ru
import {
  trackBeginInquiry,
  trackFormStart,
  trackInquirySubmitError,
  trackLeadGenerated,
  type InquiryErrorType,
} from "@/lib/analytics/track-event";

import { // 引入首页询盘模块的数据和多语言文字读取函数
  getHomeInquiryText, // 根据当前语言读取询盘模块文字
  homeInquiryData, // 首页询盘模块本地数据
} from "@/data/home-inquiry"; // 首页询盘模块数据文件路径

type HomeInquirySectionProps = { // 定义 HomeInquirySection 组件接收的参数类型
  locale: LocaleCode; // 当前语言，例如 zh-CN / en / es / fr / ko / ru
}; // HomeInquirySectionProps 类型定义结束

type ApiResponse = { // 定义后端接口返回数据类型
  message?: string; // 后端可选返回 message，用于显示接口提示信息
}; // ApiResponse 类型定义结束

export default function HomeInquirySection({ locale }: HomeInquirySectionProps) { // 定义并导出首页第六屏在线询盘组件
  const [product, setProduct] = useState(""); // 感兴趣产品，提交时使用稳定英文 value
  const [application, setApplication] = useState(""); // 应用领域，提交时使用稳定英文 value
  const [otherApplication, setOtherApplication] = useState(""); // 其他应用领域，当 application 为 other 时使用
  const [emailVerified, setEmailVerified] = useState(false); // 邮箱是否验证通过
  const [countdown, setCountdown] = useState(0); // 验证码倒计时秒数
  const [message, setMessage] = useState(""); // 页面提示信息，例如错误、成功、接口返回信息
  const [isSubmitting, setIsSubmitting] = useState(false); // 是否正在提交询盘，用于禁用提交按钮
  const formStartedRef = useRef(false);

  const text = homeInquiryData; // 读取询盘模块本地数据，后期可替换为后端返回的数据

  function handleFormInteraction() {
    if (formStartedRef.current) return;

    formStartedRef.current = true;
    trackBeginInquiry({
      formId: "home_inquiry_form",
      formType: "general_inquiry",
      sourceSection: "home_inquiry_section",
      locale,
    });
    trackFormStart({
      formId: "home_inquiry_form",
      formType: "general_inquiry",
      sourceSection: "home_inquiry_section",
      locale,
    });
  }

  function trackSubmitFailure(
    errorType: InquiryErrorType,
    submissionStage: string,
  ) {
    trackInquirySubmitError({
      formId: "home_inquiry_form",
      formType: "general_inquiry",
      sourceSection: "home_inquiry_section",
      locale,
      errorType,
      submissionStage,
    });
  }

  async function handleSendCode() { // 定义发送邮箱验证码函数，对接 /api/inquiry/send-code
    const emailInput = document.getElementById("email") as HTMLInputElement | null; // 获取邮箱输入框 DOM

    const email = emailInput?.value.trim() || ""; // 获取邮箱输入值，并去掉前后空格

    setMessage(""); // 每次发送验证码前先清空页面提示信息

    if (!isValidEmail(email)) { // 如果邮箱格式不符合基础要求
      setMessage(getHomeInquiryText(text.messages.invalidEmail, locale)); // 显示邮箱格式错误提示
      return; // 阻止继续发送验证码
    } // 邮箱校验结束

    try { // 开始请求发送验证码接口
      const res = await fetch("/api/inquiry/send-code", { // 请求发送验证码接口
        method: "POST", // 使用 POST 方法
        headers: { // 设置请求头
          "Content-Type": "application/json", // 告诉后端当前提交的是 JSON 数据
        }, // 请求头结束
        body: JSON.stringify({ email }), // 把邮箱提交给后端
      }); // fetch 请求结束

      const data = (await res.json().catch(() => ({}))) as ApiResponse; // 读取接口返回 JSON，如果读取失败就使用空对象

      if (!res.ok) { // 如果接口返回失败状态
        setMessage( // 设置失败提示
          data.message || getHomeInquiryText(text.messages.sendCodeFailed, locale), // 优先显示后端 message，否则显示前端多语言默认提示
        ); // 设置失败提示结束
        return; // 阻止继续执行
      } // 接口失败判断结束

      setEmailVerified(false); // 重新发送验证码后，邮箱验证状态重置为未验证

      setMessage( // 设置验证码发送成功提示
        data.message || getHomeInquiryText(text.messages.sendCodeSuccess, locale), // 优先显示后端 message，否则显示前端多语言默认提示
      ); // 设置成功提示结束

      setCountdown(60); // 设置倒计时为 60 秒

      const timer = window.setInterval(() => { // 创建 1 秒一次的倒计时定时器
        setCountdown((current) => { // 根据当前秒数更新倒计时
          if (current <= 1) { // 如果倒计时即将结束
            window.clearInterval(timer); // 清除定时器
            return 0; // 倒计时归零
          } // 倒计时结束判断结束

          return current - 1; // 倒计时减少 1 秒
        }); // setCountdown 结束
      }, 1000); // 每 1000 毫秒执行一次
    } catch { // 捕获接口请求异常
      setMessage(getHomeInquiryText(text.messages.sendCodeFailed, locale)); // 显示发送验证码失败提示
    } // try / catch 结束
  } // handleSendCode 函数结束

  async function handleVerifyCode() { // 定义校验邮箱验证码函数，对接 /api/inquiry/verify-code
    const emailInput = document.getElementById("email") as HTMLInputElement | null; // 获取邮箱输入框 DOM
    const codeInput = document.getElementById("verifyCode") as HTMLInputElement | null; // 获取验证码输入框 DOM

    const email = emailInput?.value.trim() || ""; // 获取邮箱输入值
    const code = codeInput?.value.trim() || ""; // 获取验证码输入值

    setMessage(""); // 校验验证码前先清空页面提示

    if (!isValidEmail(email)) { // 如果邮箱格式不符合基础要求
      setMessage(getHomeInquiryText(text.messages.invalidEmail, locale)); // 显示邮箱格式错误提示
      return; // 阻止继续校验验证码
    } // 邮箱校验结束

    if (!code) { // 如果用户没有填写验证码
      setMessage(getHomeInquiryText(text.messages.verifyCodeFailed, locale)); // 显示验证码错误提示
      return; // 阻止继续请求接口
    } // 验证码为空判断结束

    try { // 开始请求校验验证码接口
      const res = await fetch("/api/inquiry/verify-code", { // 请求校验验证码接口
        method: "POST", // 使用 POST 请求
        headers: { // 设置请求头
          "Content-Type": "application/json", // 告诉后端当前提交的是 JSON
        }, // 请求头结束
        body: JSON.stringify({ email, code }), // 把邮箱和验证码提交给后端
      }); // fetch 请求结束

      const data = (await res.json().catch(() => ({}))) as ApiResponse; // 读取接口返回 JSON，如果失败则使用空对象

      if (!res.ok) { // 如果接口返回失败
        setEmailVerified(false); // 标记邮箱未验证通过

        setMessage( // 设置验证码校验失败提示
          data.message || getHomeInquiryText(text.messages.verifyCodeFailed, locale), // 优先使用后端 message，否则使用前端默认提示
        ); // 设置提示结束

        return; // 阻止继续执行
      } // 接口失败判断结束

      setEmailVerified(true); // 标记邮箱验证通过

      setMessage( // 设置验证码校验成功提示
        data.message || getHomeInquiryText(text.messages.verifyCodeSuccess, locale), // 优先使用后端 message，否则使用前端默认提示
      ); // 设置成功提示结束
    } catch { // 捕获接口请求异常
      setEmailVerified(false); // 请求异常时标记邮箱未验证通过
      setMessage(getHomeInquiryText(text.messages.verifyCodeFailed, locale)); // 显示验证码校验失败提示
    } // try / catch 结束
  } // handleVerifyCode 函数结束

  async function handleSubmit(event: FormEvent<HTMLFormElement>) { // 定义提交询盘表单函数，对接 /api/inquiry/submit
    event.preventDefault(); // 阻止浏览器默认表单提交刷新页面

    const form = event.currentTarget; // 获取当前表单 DOM

    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim(); // 获取姓名
    const company = (form.elements.namedItem("company") as HTMLInputElement).value.trim(); // 获取公司名称
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim(); // 获取邮箱
    const region = (form.elements.namedItem("region") as HTMLInputElement).value.trim(); // 获取国家 / 地区
    const requirementMessage = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(); // 获取需求描述

    const finalApplication = application === "other" ? otherApplication.trim() : application; // 如果选择其他应用领域，就提交用户手填内容，否则提交下拉框 value

    const formData = { // 组合最终提交给后端的询盘数据
      name, // 姓名
      company, // 公司名称
      email, // 邮箱
      product, // 感兴趣产品
      region, // 国家 / 地区
      application: finalApplication, // 应用领域
      message: requirementMessage, // 需求描述
      locale, // 当前语言，方便后端区分来源语言
    }; // 表单数据对象结束

    setMessage(""); // 提交前清空页面提示

    if (!formData.name) { // 如果姓名为空
      setMessage(getHomeInquiryText(text.messages.requiredName, locale)); // 显示姓名必填提示
      trackSubmitFailure("validation_error", "client_validation");
      return; // 阻止提交
    } // 姓名校验结束

    if (!formData.company) { // 如果公司名称为空
      setMessage(getHomeInquiryText(text.messages.requiredCompany, locale)); // 显示公司必填提示
      trackSubmitFailure("validation_error", "client_validation");
      return; // 阻止提交
    } // 公司校验结束

    if (!isValidEmail(formData.email)) { // 如果邮箱格式不正确
      setMessage(getHomeInquiryText(text.messages.invalidEmail, locale)); // 显示邮箱格式错误提示
      trackSubmitFailure("validation_error", "client_validation");
      return; // 阻止提交
    } // 邮箱校验结束

    if (!emailVerified) { // 如果邮箱还没有验证通过
      setMessage(getHomeInquiryText(text.messages.requiredEmailVerified, locale)); // 显示请先验证邮箱提示
      trackSubmitFailure("captcha_error", "email_verification");
      return; // 阻止提交
    } // 邮箱验证状态校验结束

    if (!formData.product) { // 如果没有选择感兴趣产品
      setMessage(getHomeInquiryText(text.messages.requiredProduct, locale)); // 显示产品必选提示
      trackSubmitFailure("validation_error", "client_validation");
      return; // 阻止提交
    } // 产品校验结束

    if (!formData.application) { // 如果没有选择应用领域
      setMessage(getHomeInquiryText(text.messages.requiredApplication, locale)); // 显示应用领域必选提示
      trackSubmitFailure("validation_error", "client_validation");
      return; // 阻止提交
    } // 应用领域校验结束

    if (!formData.message) { // 如果需求描述为空
      setMessage(getHomeInquiryText(text.messages.requiredMessage, locale)); // 显示需求描述必填提示
      trackSubmitFailure("validation_error", "client_validation");
      return; // 阻止提交
    } // 需求描述校验结束

    setIsSubmitting(true); // 设置正在提交状态，禁用提交按钮

    try { // 开始请求提交询盘接口
      const res = await fetch("/api/inquiry/submit", { // 请求提交询盘接口
        method: "POST", // 使用 POST 请求
        headers: { // 设置请求头
          "Content-Type": "application/json", // 告诉后端当前提交 JSON
        }, // 请求头结束
        body: JSON.stringify(formData), // 把询盘表单数据提交给后端
      }); // fetch 请求结束

      const data = (await res.json().catch(() => ({}))) as ApiResponse; // 读取接口返回 JSON，如果失败则使用空对象

      if (!res.ok) { // 如果接口返回失败
        setMessage( // 设置提交失败提示
          data.message || getHomeInquiryText(text.messages.submitFailed, locale), // 优先使用后端 message，否则使用前端默认提示
        ); // 设置失败提示结束
        trackSubmitFailure("api_error", "api_submit");
        return; // 阻止继续执行
      } // 接口失败判断结束

      setMessage( // 设置提交成功提示
        data.message || getHomeInquiryText(text.messages.submitSuccess, locale), // 优先使用后端 message，否则使用前端默认提示
      ); // 设置成功提示结束

      form.reset(); // 重置表单原生输入框
      setProduct(""); // 清空感兴趣产品状态
      setApplication(""); // 清空应用领域状态
      setOtherApplication(""); // 清空其他应用领域输入状态
      setEmailVerified(false); // 提交成功后重置邮箱验证状态
      trackLeadGenerated({
        formId: "home_inquiry_form",
        formType: "general_inquiry",
        sourceSection: "home_inquiry_section",
        locale,
      });
      formStartedRef.current = false;
    } catch { // 捕获接口请求异常
      setMessage(getHomeInquiryText(text.messages.submitFailed, locale)); // 显示提交失败提示
      trackSubmitFailure("network_error", "api_submit");
    } finally { // 无论成功失败都会执行
      setIsSubmitting(false); // 取消正在提交状态
    } // try / catch / finally 结束
  } // handleSubmit 函数结束

  return ( // 返回在线询盘模块页面结构
    <section className="screen-section contact-screen" id={homeInquiryData.sectionId} aria-labelledby="inquiry-title">
      <div className="screen-inner">
        <div className="contact-layout">
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

          <aside className="inquiry-panel" aria-label={getHomeInquiryText(text.form.title, locale)}>
            <div className="inquiry-panel-head">
              <h3 id="inquiry-title" className="inquiry-title">
                {getHomeInquiryText(text.form.title, locale)}
              </h3>

              <p className="inquiry-desc">
                {getHomeInquiryText(text.form.description, locale)}
              </p>
            </div>

            <form
              className="inquiry-form"
              onSubmit={handleSubmit}
              onInputCapture={handleFormInteraction}
            >
              <div className="form-grid-two">
                <div className="field">
                  <label htmlFor="name">
                    {getHomeInquiryText(text.form.nameLabel, locale)}
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={getHomeInquiryText(text.form.namePlaceholder, locale)}
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
                    placeholder={getHomeInquiryText(text.form.companyPlaceholder, locale)}
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
                    placeholder={getHomeInquiryText(text.form.emailPlaceholder, locale)}
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
                  {getHomeInquiryText(text.form.verificationCodeLabel, locale)}
                </label>

                <div className="verify-code-row">
                  <input
                    id="verifyCode"
                    name="verifyCode"
                    type="text"
                    placeholder={getHomeInquiryText(text.form.verificationCodePlaceholder, locale)}
                  />

                  <button className="plain-btn small-btn" type="button" onClick={handleVerifyCode}>
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
                    placeholder={getHomeInquiryText(text.form.countryPlaceholder, locale)}
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
                      {getHomeInquiryText(text.form.applicationPlaceholder, locale)}
                    </option>

                    {text.applicationOptions.map((option) => (
                      <option value={option.value} key={option.value}>
                        {getHomeInquiryText(option.label, locale)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={`field other-application-field ${application === "other" ? "show" : ""}`}>
                <label htmlFor="otherApplication">
                  {getHomeInquiryText(text.form.otherApplicationLabel, locale)}
                </label>

                <input
                  id="otherApplication"
                  name="otherApplication"
                  type="text"
                  placeholder={getHomeInquiryText(text.form.otherApplicationPlaceholder, locale)}
                  value={otherApplication}
                  onChange={(event) => setOtherApplication(event.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="message">
                  {getHomeInquiryText(text.form.messageLabel, locale)}
                </label>

                <textarea
                  id="message"
                  name="message"
                  placeholder={getHomeInquiryText(text.form.messagePlaceholder, locale)}
                />
              </div>

              {message && <div className="result-box show">{message}</div>}

              <div className="submit-row">
                <p className="submit-tip">
                  {getHomeInquiryText(text.form.description, locale)}
                </p>

                <button className="primary-btn submit-btn" type="submit" disabled={isSubmitting}>
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
  ); // 在线询盘模块页面结构返回结束
} // HomeInquirySection 组件结束
