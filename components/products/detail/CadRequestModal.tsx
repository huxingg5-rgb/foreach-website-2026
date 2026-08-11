"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  getProductDetailResourceCopy,
  type ProductDetailResourceLocale,
} from "@/data/products/detail/product-detail-resources";

import requestStyles from "@/components/forms/company-info-request/CompanyInfoRequestModal.module.css";

const EMAIL_CODE_COOLDOWN_SECONDS = 60;

type InquiryApiResponse = {
  success?: boolean;
  error?: string;
  referenceId?: string;
};

type CadRequestModalProps = {
  locale: ProductDetailResourceLocale;
  productName: string;
  productSeries: string;
  productModel: string;
  onClose: () => void;
};

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

function getErrorMessage(
  error: unknown,
  locale: ProductDetailResourceLocale,
): string {
  const copy = getProductDetailResourceCopy(locale);
  const code = error instanceof Error ? error.message : "request_failed";

  if (code === "invalid_email") return copy.invalidEmail;
  if (code === "company_required") return copy.companyRequired;
  if (code === "send_too_frequently") return copy.sendTooFrequently;
  if (code === "invalid_verification_data") return copy.enterCode;
  if (code === "verification_code_incorrect") return copy.codeIncorrect;
  if (
    code === "verification_code_missing" ||
    code === "verification_code_expired"
  ) {
    return copy.codeExpired;
  }
  if (
    code === "email_not_verified" ||
    code === "email_verification_expired"
  ) {
    return copy.verificationExpired;
  }
  if (
    code === "storage_not_configured" ||
    code === "email_service_not_configured"
  ) {
    return copy.serviceUnavailable;
  }

  return copy.requestFailed;
}

export default function CadRequestModal({
  locale,
  productName,
  productSeries,
  productModel,
  onClose,
}: CadRequestModalProps) {
  const copy = getProductDetailResourceCopy(locale);
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [hasCodeSent, setHasCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [formError, setFormError] = useState("");

  const normalizedEmail = email.trim().toLowerCase();
  const isEmailVerified =
    Boolean(normalizedEmail) && verifiedEmail === normalizedEmail;

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = window.setTimeout(() => {
      setCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [countdown]);

  async function handleSendCode() {
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setFormError(copy.invalidEmail);
      return;
    }

    setIsSendingCode(true);
    setFormError("");
    setVerifiedEmail("");

    try {
      await postInquiryApi("/api/inquiry/send-code", {
        email: normalizedEmail,
      });

      setHasCodeSent(true);
      setVerificationCode("");
      setCountdown(EMAIL_CODE_COOLDOWN_SECONDS);
    } catch (error) {
      setFormError(getErrorMessage(error, locale));
    } finally {
      setIsSendingCode(false);
    }
  }

  async function handleVerifyEmail() {
    if (!hasCodeSent) {
      setFormError(copy.requestCodeFirst);
      return;
    }

    if (!/^\d{6}$/.test(verificationCode)) {
      setFormError(copy.enterCode);
      return;
    }

    setIsVerifying(true);
    setFormError("");

    try {
      await postInquiryApi("/api/inquiry/verify-code", {
        email: normalizedEmail,
        code: verificationCode,
      });

      setVerifiedEmail(normalizedEmail);
    } catch (error) {
      setVerifiedEmail("");
      setFormError(getErrorMessage(error, locale));
    } finally {
      setIsVerifying(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!company.trim()) {
      setFormError(copy.companyRequired);
      return;
    }

    if (!isEmailVerified) {
      setFormError(copy.requestCodeFirst);
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const response = await postInquiryApi("/api/inquiry/submit", {
        company: company.trim(),
        email: normalizedEmail,
        requestType: "CAD",
        productType: productName || productSeries || productModel,
        targetModel: productModel,
        message: message.trim(),
        locale,
        productName,
        productSeries,
        productModel,
        currentUrl: window.location.href,
      });

      setReferenceId(response.referenceId || "");
      setIsSubmitted(true);
    } catch (error) {
      const errorCode = error instanceof Error ? error.message : "";

      if (
        errorCode === "email_not_verified" ||
        errorCode === "email_verification_expired"
      ) {
        setVerifiedEmail("");
        setHasCodeSent(false);
      }

      setFormError(getErrorMessage(error, locale));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className={requestStyles.modalLayer}
      data-product-cad-request-modal="true"
    >
      <button
        className={requestStyles.modalMask}
        type="button"
        aria-label={copy.close}
        onClick={onClose}
      />

      <section
        className={requestStyles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-cad-request-title"
      >
        <div className={requestStyles.modalHead}>
          <div>
            <span>CAD</span>
            <h2 id="product-cad-request-title">{copy.cadTitle}</h2>
            <p>{copy.cadDescription}</p>
          </div>

          <button type="button" onClick={onClose} aria-label={copy.close}>
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
          <div className={requestStyles.success}>
            <strong>{copy.successTitle}</strong>
            <p>{copy.successDescription}</p>
            {referenceId ? <p>Reference: {referenceId}</p> : null}
            <div className={requestStyles.successActions}>
              <button type="button" onClick={onClose}>
                {copy.closeSuccess}
              </button>
            </div>
          </div>
        ) : (
          <form className={requestStyles.form} onSubmit={handleSubmit}>
            <div className={requestStyles.itemList}>
              <article className={requestStyles.requestItem}>
                <span>CAD</span>
                <div>
                  <strong>{productName || productModel}</strong>
                </div>
              </article>
            </div>

            <div className={requestStyles.fields}>
              <label className={requestStyles.fieldWide}>
                <span>
                  {copy.company}
                  <em className={requestStyles.requiredMark}>*</em>
                </span>
                <input
                  type="text"
                  value={company}
                  placeholder={copy.companyPlaceholder}
                  required
                  onChange={(event) => {
                    setCompany(event.target.value);
                    setFormError("");
                  }}
                />
              </label>

              <label className={requestStyles.emailField}>
                <span>
                  {copy.businessEmail}
                  <em className={requestStyles.requiredMark}>*</em>
                </span>
                <div className={requestStyles.emailInputGroup}>
                  <input
                    type="email"
                    value={email}
                    placeholder={copy.businessEmailPlaceholder}
                    required
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setVerificationCode("");
                      setHasCodeSent(false);
                      setVerifiedEmail("");
                      setFormError("");
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={
                      countdown > 0 ||
                      isSendingCode ||
                      isVerifying ||
                      isSubmitting
                    }
                  >
                    {isSendingCode
                      ? copy.sendingCode
                      : countdown > 0
                        ? `${countdown}s`
                        : hasCodeSent
                          ? copy.resendCode
                          : copy.sendCode}
                  </button>
                </div>
                {hasCodeSent || isEmailVerified ? (
                  <em className={requestStyles.emailCodeHint} aria-live="polite">
                    {isEmailVerified ? copy.emailVerified : copy.codeSent}
                  </em>
                ) : null}
              </label>

              <label className={requestStyles.emailField}>
                <span>
                  {copy.verificationCode}
                  <em className={requestStyles.requiredMark}>*</em>
                </span>
                <div className={requestStyles.emailInputGroup}>
                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={verificationCode}
                    placeholder={copy.verificationCodePlaceholder}
                    required
                    disabled={isEmailVerified}
                    onChange={(event) => {
                      setVerificationCode(
                        event.target.value.replace(/\D/g, "").slice(0, 6),
                      );
                      setVerifiedEmail("");
                      setFormError("");
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={
                      !hasCodeSent ||
                      verificationCode.length !== 6 ||
                      isEmailVerified ||
                      isVerifying ||
                      isSubmitting
                    }
                  >
                    {isVerifying ? copy.verifyingEmail : copy.verifyEmail}
                  </button>
                </div>
              </label>

              <label className={requestStyles.fieldWide}>
                <span>{copy.message}</span>
                <textarea
                  value={message}
                  placeholder={copy.messagePlaceholder}
                  rows={4}
                  onChange={(event) => {
                    setMessage(event.target.value);
                    setFormError("");
                  }}
                />
              </label>
            </div>

            {formError ? (
              <div className={requestStyles.formError} role="alert">
                {formError}
              </div>
            ) : null}

            <div className={requestStyles.actions}>
              <button
                className={requestStyles.submitButton}
                type="submit"
                disabled={
                  !isEmailVerified ||
                  isSendingCode ||
                  isVerifying ||
                  isSubmitting
                }
              >
                {isSubmitting ? copy.submittingCad : copy.submitCad}
              </button>
              <button
                className={requestStyles.backButton}
                type="button"
                onClick={onClose}
              >
                {copy.closeSuccess}
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
