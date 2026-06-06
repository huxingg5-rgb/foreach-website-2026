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

import styles from "./CompanyInfoRequestModal.module.css";

/* 测试版验证码
   说明：
   当前前端测试阶段固定为 123456。
   后期接后端后，这里会删除，验证码由后端生成和校验。
*/
const TEST_EMAIL_CODE = "123456";

/* 邮箱验证码冷却时间
   说明：
   当前设为 60 秒，也就是 1 分钟只能发送 1 次。
*/
const EMAIL_CODE_COOLDOWN_SECONDS = 60;

/* 测试版验证码发送时间缓存 key
   说明：
   1. 用于前端测试阶段限制 1 分钟内只能发送 1 次
   2. 真实上线后应由后端限制发送频率
*/
const EMAIL_CODE_LAST_SENT_AT_KEY =
  "foreach_company_info_request_email_code_last_sent_at_v1";

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
   获取当前验证码剩余冷却时间

   说明：
   1. 当前是前端测试版逻辑
   2. 通过 localStorage 记录上次点击“发送验证码”的时间
   3. 如果 60 秒没到，则返回剩余秒数
========================================================= */
function getEmailCodeRemainingSeconds() {
  if (typeof window === "undefined") return 0;

  const lastSentAtText = window.localStorage.getItem(
    EMAIL_CODE_LAST_SENT_AT_KEY,
  );

  if (!lastSentAtText) return 0;

  const lastSentAt = Number(lastSentAtText);

  if (!Number.isFinite(lastSentAt)) return 0;

  const elapsedSeconds = Math.floor((Date.now() - lastSentAt) / 1000);
  const remainingSeconds = EMAIL_CODE_COOLDOWN_SECONDS - elapsedSeconds;

  return Math.max(0, remainingSeconds);
}

/* =========================================================
   通用公司信息申请弹窗
========================================================= */
export default function CompanyInfoRequestModal({
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
  const [formValue, setFormValue] =
    useState<CompanyInfoFormValue>(EMPTY_FORM_VALUE);

  const [isSubmitted, setIsSubmitted] = useState(false);

  /* 邮箱验证码是否已发送 */
  const [hasEmailCodeSent, setHasEmailCodeSent] = useState(false);

  /* 邮箱验证码倒计时 */
  const [emailCodeCountdown, setEmailCodeCountdown] = useState(0);

  /* 表单错误提示 */
  const [formError, setFormError] = useState("");

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

    const remainingSeconds = getEmailCodeRemainingSeconds();

    setFormValue(EMPTY_FORM_VALUE);
    setIsSubmitted(false);
    setHasEmailCodeSent(remainingSeconds > 0);
    setEmailCodeCountdown(remainingSeconds);
    setFormError("");
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
    setFormValue((currentValue) => {
      return {
        ...currentValue,
        [field]: value,
      };
    });

    setFormError("");
  }

  /* =========================================================
     发送测试版邮箱验证码

     说明：
     1. 当前不发送真实邮件
     2. 当前测试验证码固定为 123456
     3. 点击后 60 秒内不能再次发送
     4. 使用 localStorage 限制关闭弹窗后立刻再次发送
     5. 后期这里会改成调用后端接口：
        services/resources/requestDrawing.ts
        或 services/common/sendEmailCode.ts
  ========================================================= */
  function handleSendEmailCode() {
    if (!formValue.email.trim()) {
      setFormError("请先填写邮箱，再发送验证码。");
      return;
    }

    const remainingSeconds = getEmailCodeRemainingSeconds();

    if (remainingSeconds > 0) {
      setEmailCodeCountdown(remainingSeconds);
      setHasEmailCodeSent(true);
      return;
    }

    window.localStorage.setItem(EMAIL_CODE_LAST_SENT_AT_KEY, String(Date.now()));

    setHasEmailCodeSent(true);
    setEmailCodeCountdown(EMAIL_CODE_COOLDOWN_SECONDS);
    setFormError("");
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

    if (!hasItems) return;

    if (enableEmailVerification) {
      if (!hasEmailCodeSent) {
        setFormError("请先发送邮箱验证码。");
        return;
      }

      if (!formValue.emailCode.trim()) {
        setFormError("请输入邮箱验证码。");
        return;
      }

      if (formValue.emailCode.trim() !== TEST_EMAIL_CODE) {
        setFormError("测试版验证码不正确，请输入 123456。");
        return;
      }
    }

    await onSubmitPreview?.(formValue);

    setIsSubmitted(true);
  }

  return (
    <div className={styles.modalLayer}>
      <button
        className={styles.modalMask}
        type="button"
        aria-label="关闭弹窗"
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

          <button type="button" onClick={onClose} aria-label="关闭弹窗">
            ×
          </button>
        </div>

        {isSubmitted ? (
          <div className={styles.success}>
            <strong>{successTitle}</strong>

            <p>{successDescription}</p>

            <div className={styles.successActions}>
              <button type="button" onClick={onClose}>
                返回清单
              </button>
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.summary}>
              <div>
                <span>申请项目</span>
                <strong>{items.length}</strong>
                <em>项</em>
              </div>

              <p>
                请确认需要申请的资料项目，并填写公司信息。当前邮箱验证码为测试版，
                不会发送真实邮件。
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
                <span>邮箱 *</span>

                <div className={styles.emailInputGroup}>
                  <input
                    type="email"
                    value={formValue.email}
                    placeholder="请输入接收资料的邮箱"
                    required={hasItems}
                    onChange={(event) => {
                      updateField("email", event.target.value);
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleSendEmailCode}
                    disabled={!hasItems || emailCodeCountdown > 0}
                  >
                    {emailCodeCountdown > 0
                      ? `${emailCodeCountdown}s`
                      : hasEmailCodeSent
                        ? "重新发送"
                        : "发送验证码"}
                  </button>
                </div>

                {enableEmailVerification && hasEmailCodeSent ? (
                  <em className={styles.emailCodeHint}>
                    测试验证码：{TEST_EMAIL_CODE}
                  </em>
                ) : null}
              </label>

              {enableEmailVerification ? (
                <label>
                  <span>邮箱验证码 *</span>
                  <input
                    type="text"
                    value={formValue.emailCode}
                    placeholder="请输入邮箱验证码"
                    required={hasItems}
                    onChange={(event) => {
                      updateField("emailCode", event.target.value);
                    }}
                  />
                </label>
              ) : null}

              <label>
                <span>姓名 *</span>
                <input
                  type="text"
                  value={formValue.name}
                  placeholder="请输入联系人姓名"
                  required={hasItems}
                  onChange={(event) => {
                    updateField("name", event.target.value);
                  }}
                />
              </label>

              <label>
                <span>公司名称 *</span>
                <input
                  type="text"
                  value={formValue.company}
                  placeholder="请输入公司名称"
                  required={hasItems}
                  onChange={(event) => {
                    updateField("company", event.target.value);
                  }}
                />
              </label>

              <label>
                <span>国家 / 地区</span>
                <input
                  type="text"
                  value={formValue.country}
                  placeholder="请输入国家或地区"
                  onChange={(event) => {
                    updateField("country", event.target.value);
                  }}
                />
              </label>

              <label>
                <span>电话 / WhatsApp</span>
                <input
                  type="text"
                  value={formValue.phone}
                  placeholder="选填，便于进一步沟通"
                  onChange={(event) => {
                    updateField("phone", event.target.value);
                  }}
                />
              </label>

              <label className={styles.fieldWide}>
                <span>备注说明</span>
                <textarea
                  value={formValue.message}
                  placeholder="可补充应用场景、资料用途或其他需求"
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
                disabled={!hasItems}
              >
                {submitLabel}
              </button>

              <button
                className={styles.backButton}
                type="button"
                onClick={onClose}
              >
                返回清单
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
} 