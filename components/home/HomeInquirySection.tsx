"use client";

import { FormEvent, useState } from "react";

/**
 * HomeInquirySection
 * 首页第 6 屏：在线询盘
 *
 * 后端接口预留：
 * 1. 发送验证码：/api/inquiry/send-code
 * 2. 校验验证码：/api/inquiry/verify-code
 * 3. 提交询盘：/api/inquiry/submit
 */
export default function HomeInquirySection() {
  /** 感兴趣产品 */
  const [product, setProduct] = useState("");

  /** 应用领域 */
  const [application, setApplication] = useState("");

  /** 其他应用领域 */
  const [otherApplication, setOtherApplication] = useState("");

  /** 邮箱是否验证通过 */
  const [emailVerified, setEmailVerified] = useState(false);

  /** 验证码倒计时 */
  const [countdown, setCountdown] = useState(0);

  /** 页面提示信息 */
  const [message, setMessage] = useState("");

  /**
   * 发送邮箱验证码
   * 当前请求预留 API：/api/inquiry/send-code
   */
  async function handleSendCode() {
    const emailInput = document.getElementById("email") as HTMLInputElement | null;
    const email = emailInput?.value.trim() || "";

    setMessage("");

    if (!email.includes("@") || !email.includes(".")) {
      setMessage("请输入正确的邮箱格式。");
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

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "验证码发送失败。");
        return;
      }

      setEmailVerified(false);
      setMessage(data.message || "验证码已发送，请查看邮箱。");

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
      setMessage("网络异常，验证码发送失败。");
    }
  }

  /**
   * 校验邮箱验证码
   * 当前请求预留 API：/api/inquiry/verify-code
   */
  async function handleVerifyCode() {
    const emailInput = document.getElementById("email") as HTMLInputElement | null;
    const codeInput = document.getElementById("verifyCode") as HTMLInputElement | null;

    const email = emailInput?.value.trim() || "";
    const code = codeInput?.value.trim() || "";

    setMessage("");

    if (!email || !code) {
      setMessage("请填写邮箱和验证码。");
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

      const data = await res.json();

      if (!res.ok) {
        setEmailVerified(false);
        setMessage(data.message || "验证码校验失败。");
        return;
      }

      setEmailVerified(true);
      setMessage(data.message || "邮箱验证通过。");
    } catch {
      setMessage("网络异常，验证码校验失败。");
    }
  }

  /**
   * 提交询盘表单
   * 当前请求预留 API：/api/inquiry/submit
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      company: (form.elements.namedItem("company") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      product,
      region: (form.elements.namedItem("region") as HTMLInputElement).value.trim(),
      application: application === "其他" ? otherApplication.trim() : application,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    setMessage("");

    if (!formData.name) {
      setMessage("请填写姓名。");
      return;
    }

    if (!formData.company) {
      setMessage("请填写公司名称。");
      return;
    }

    if (!formData.email.includes("@")) {
      setMessage("请填写正确的邮箱。");
      return;
    }

    if (!emailVerified) {
      setMessage("请先完成邮箱验证码校验。");
      return;
    }

    if (!formData.product) {
      setMessage("请选择感兴趣产品。");
      return;
    }

    if (application === "其他" && !otherApplication.trim()) {
      setMessage("请填写其他应用领域。");
      return;
    }

    if (!formData.message) {
      setMessage("请填写需求描述。");
      return;
    }

    try {
      const res = await fetch("/api/inquiry/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "询盘提交失败。");
        return;
      }

      setMessage(data.message || "询盘提交成功，我们会尽快与您联系。");

      form.reset();
      setProduct("");
      setApplication("");
      setOtherApplication("");
      setEmailVerified(false);
    } catch {
      setMessage("网络异常，询盘提交失败。");
    }
  }

  return (
    <section className="screen-section contact-screen" aria-labelledby="inquiry-title">
      <div className="screen-inner">
        <div className="contact-layout">
          <aside className="demand-panel">
            <h2 className="demand-title">告诉我们您的液路需求</h2>

            <p className="demand-intro">
              无论您正在进行产品选型、样机验证、液路方案设计，还是需要产品资料与合规文件，
              恒永达都可以围绕您的应用场景、流量范围、压力需求、介质类型和系统结构，提供对应的产品与工程支持。
            </p>

            <div className="demand-list">
              <div className="demand-item">
                <span className="demand-index">01</span>
                <div>
                  <h3 className="demand-item-title">产品选型支持</h3>
                  <p className="demand-item-text">
                    根据流量、压力、介质、通道数量和安装空间，协助筛选泵、阀、传感器与管路组件。
                  </p>
                </div>
              </div>

              <div className="demand-item">
                <span className="demand-index">02</span>
                <div>
                  <h3 className="demand-item-title">液路方案沟通</h3>
                  <p className="demand-item-text">
                    围绕样本处理、试剂分配、清洗废液、流路切换与高压控制等场景，提供组合建议。
                  </p>
                </div>
              </div>

              <div className="demand-item">
                <span className="demand-index">03</span>
                <div>
                  <h3 className="demand-item-title">资料与合规支持</h3>
                  <p className="demand-item-text">
                    提供产品目录、规格书、安装说明、选型资料及 RoHS、REACH、CE、MSDS 等合规资料支持。
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <aside className="inquiry-panel" aria-label="在线询盘表单">
            <div className="inquiry-panel-head">
              <h3 id="inquiry-title" className="inquiry-title">
                在线询盘
              </h3>
              <p className="inquiry-desc">
                提交前需完成邮箱验证。正式上线后可接入真实邮件验证码、邮件通知、数据库和 CRM。
              </p>
            </div>

            <form className="inquiry-form" onSubmit={handleSubmit}>
              <div className="form-grid-two">
                <div className="field">
                  <label htmlFor="name">姓名</label>
                  <input id="name" name="name" type="text" placeholder="请输入姓名" />
                </div>

                <div className="field">
                  <label htmlFor="company">公司名称</label>
                  <input id="company" name="company" type="text" placeholder="请输入公司名称" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="email">邮箱验证</label>
                <div className="verify-row">
                  <input id="email" name="email" type="email" placeholder="请输入常用邮箱" />
                  <button
                    className="plain-btn small-btn"
                    type="button"
                    onClick={handleSendCode}
                    disabled={countdown > 0}
                  >
                    {countdown > 0 ? `${countdown}秒后重发` : "发送验证码"}
                  </button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="verifyCode">验证码</label>
                <div className="verify-code-row">
                  <input id="verifyCode" name="verifyCode" type="text" placeholder="请输入邮箱验证码" />
                  <button className="plain-btn small-btn" type="button" onClick={handleVerifyCode}>
                    校验验证码
                  </button>
                </div>
              </div>

              <div className="field">
                <label htmlFor="productSelect">感兴趣产品</label>
                <select
                  id="productSelect"
                  value={product}
                  onChange={(event) => setProduct(event.target.value)}
                >
                  <option value="">请选择感兴趣产品</option>

                  <optgroup label="泵类产品">
                    <option value="隔膜泵">隔膜泵</option>
                    <option value="注射泵">注射泵</option>
                    <option value="移液泵">移液泵</option>
                    <option value="柱塞泵">柱塞泵</option>
                  </optgroup>

                  <optgroup label="阀类产品">
                    <option value="电磁阀">电磁阀</option>
                    <option value="夹管阀">夹管阀</option>
                    <option value="旋转阀">旋转阀</option>
                    <option value="高压阀">高压阀</option>
                  </optgroup>

                  <optgroup label="传感器与检测模块">
                    <option value="压力传感器">压力传感器</option>
                    <option value="气泡检测器">气泡检测器</option>
                    <option value="电导率检测模块">电导率检测模块</option>
                  </optgroup>

                  <optgroup label="管路与连接件">
                    <option value="管路">管路</option>
                    <option value="连接件">连接件</option>
                    <option value="采样针">采样针</option>
                  </optgroup>

                  <option value="液路系统解决方案">液路系统解决方案</option>
                  <option value="其他产品">其他产品</option>
                </select>
              </div>

              <div className="form-grid-two">
                <div className="field">
                  <label htmlFor="region">国家 / 地区</label>
                  <input id="region" name="region" type="text" placeholder="例如：中国、德国、美国" />
                </div>

                <div className="field">
                  <label htmlFor="application">应用领域</label>
                  <select
                    id="application"
                    value={application}
                    onChange={(event) => setApplication(event.target.value)}
                  >
                    <option value="">请选择应用领域</option>
                    <option value="IVD 体外诊断">IVD 体外诊断</option>
                    <option value="生命科学">生命科学</option>
                    <option value="高端分析仪器">高端分析仪器</option>
                    <option value="合成生物">合成生物</option>
                    <option value="实验室自动化">实验室自动化</option>
                    <option value="其他">其他</option>
                  </select>
                </div>
              </div>

              <div className={`field other-application-field ${application === "其他" ? "show" : ""}`}>
                <label htmlFor="otherApplication">其他应用领域</label>
                <input
                  id="otherApplication"
                  name="otherApplication"
                  type="text"
                  placeholder="请填写具体应用领域"
                  value={otherApplication}
                  onChange={(event) => setOtherApplication(event.target.value)}
                />
              </div>

              <div className="field">
                <label htmlFor="message">需求描述</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="请填写应用场景、目标产品、流量范围、压力要求、介质类型、接口形式或其他项目需求。"
                />
              </div>

              {message && <div className="result-box show">{message}</div>}

              <div className="submit-row">
                <p className="submit-tip">提交后可由销售或工程人员进一步联系您。</p>
                <button className="primary-btn submit-btn" type="submit">
                  提交询盘
                </button>
              </div>
            </form>
          </aside>
        </div>
      </div>
    </section>
  );
}