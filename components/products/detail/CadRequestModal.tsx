"use client";

import DrawingRequirements from "@/components/products/configurator/DrawingRequirements";
import { normalizeDrawingTypes } from "@/data/products/detail/drawing-requirements";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import ConfiguratorButton from "@/components/products/configurator/ConfiguratorButton";
import ConfiguratorDialogFrame from "@/components/products/configurator/ConfiguratorDialogFrame";
import formStyles from "@/components/products/configurator/FlangedTubingConfigurator.module.css";
import { cadRequestMessage, getCadRequestCopy, type CadDrawingType, type CadRequestConfiguration } from "@/data/products/detail/cad-request";
import { getSelectionWorkspaceCopy } from "@/data/products/detail/selection-workspace-copy";
import type { ProductDetailResourceLocale } from "@/data/products/detail/product-detail-resources";
import { getProductDetailResourceCopy } from "@/data/products/detail/product-detail-resources";
import styles from "./PistonCadRequestModal.module.css";

type Props = {
  locale: ProductDetailResourceLocale;
  productName: string; productSeries: string; productModel: string; productType?: string;
  configurations?: CadRequestConfiguration[]; initialConfigurationId?: string | null;
  referenceConfiguration?: CadRequestConfiguration;
  onDrawingTypesChange?: (id: string, value: CadDrawingType[]) => void;
  onClose: () => void;
};

type Phase = "idle" | "sending" | "verifying" | "submitting";

async function postInquiry(url: string, payload: Record<string, unknown>) {
  const response = await fetch(url, {
    method: "POST", credentials: "same-origin",
    headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({})) as {
    success?: boolean; error?: string; referenceId?: string;
  };
  if (!response.ok || result.success !== true) throw new Error(result.error || "request_failed");
  return result;
}

function errorMessage(error: unknown, locale: ProductDetailResourceLocale) {
  const copy = getProductDetailResourceCopy(locale);
  const code = error instanceof Error ? error.message : "request_failed";
  const messages: Record<string, string> = {
    invalid_email: copy.invalidEmail,
    company_required: copy.companyRequired,
    send_too_frequently: copy.sendTooFrequently,
    invalid_verification_data: copy.enterCode,
    verification_code_incorrect: copy.codeIncorrect,
    verification_code_missing: copy.codeExpired,
    verification_code_expired: copy.codeExpired,
    verification_code_invalid: copy.codeExpired,
    email_not_verified: copy.verificationExpired,
    email_verification_expired: copy.verificationExpired,
    storage_not_configured: copy.serviceUnavailable,
    email_service_not_configured: copy.serviceUnavailable,
  };
  return messages[code] || copy.requestFailed;
}

/** All detail pages share the EA CAD dialog, including configuration and drawing selection. */
export default function CadRequestModal({ locale, productName, productSeries, productModel, productType,
  configurations: savedConfigurations = [], initialConfigurationId, referenceConfiguration, onDrawingTypesChange, onClose }: Props) {
  const copy = getProductDetailResourceCopy(locale), cadCopy = getCadRequestCopy(locale);
  const workspaceCopy = getSelectionWorkspaceCopy(locale);
  const drawingOptions: { value: CadDrawingType; label: string }[] = [
    { value: "2d", label: cadCopy.twoD }, { value: "3d", label: cadCopy.threeD },
  ];
  const prefix = useId();
  const [selectedId, setSelectedId] = useState(() =>
    savedConfigurations.find(item => item.id === initialConfigurationId)?.id ?? savedConfigurations[0]?.id ?? "",
  );
  const [drawingOverrides, setDrawingOverrides] = useState<Record<string, CadDrawingType[]>>({});
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [notes, setNotes] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const busyRef = useRef(false);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const onCloseRef = useRef(onClose);
  const busy = phase !== "idle";
  const normalizedEmail = email.trim().toLowerCase();
  const hasCodeSent = Boolean(sentTo) && sentTo === normalizedEmail;
  const isVerified = Boolean(verifiedEmail) && verifiedEmail === normalizedEmail;
  const selectedIndex = savedConfigurations.findIndex(item => item.id === selectedId);
  const selected = savedConfigurations[selectedIndex];
  const configuration: CadRequestConfiguration = selected ?? referenceConfiguration ?? { id: "reference", model: productModel,
    rows: [], productType, productSeries };
  const drawings = drawingOverrides[configuration.id] ?? normalizeDrawingTypes(configuration.drawingTypes);
  function setDrawings(value: CadDrawingType[]) {
    const next = normalizeDrawingTypes(value);
    setDrawingOverrides(previous => ({ ...previous, [configuration.id]: next }));
    onDrawingTypesChange?.(configuration.id, next);
    setError("");
  }
  const rows = configuration.rows;
  const model = configuration.model;
  const configurationLabel = configuration.label || (selected ? workspaceCopy.configuration(selectedIndex + 1) : cadCopy.current);
  const requestMessage = cadRequestMessage(locale, configuration, selectedIndex + 1, drawings, notes);

  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    const backdrop = dialogRef.current?.parentElement;
    const background = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== backdrop)
      .map(element => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const handleKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key === "Escape" && !(event.target instanceof HTMLSelectElement)) {
        event.preventDefault();
        if (!busyRef.current) onCloseRef.current();
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button, input, select, textarea, summary, [tabindex]") || [])
        .filter(element => !element.matches(":disabled") && element.tabIndex >= 0 && element.getClientRects().length);
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0]?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = overflow;
      background.forEach(({ element, inert }) => { element.inert = inert; });
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setTimeout(() => setCountdown(value => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [countdown]);
  useEffect(() => { if (hasCodeSent) codeRef.current?.focus(); }, [hasCodeSent]);
  useEffect(() => { if (submitted) successRef.current?.focus(); }, [submitted]);

  function close() {
    if (busyRef.current) { setError(cadCopy.wait); return; }
    onClose();
  }

  function updateEmail(value: string) {
    if (value.trim().toLowerCase() !== normalizedEmail) {
      setSentTo(""); setVerifiedEmail(""); setCode(""); setCountdown(0);
    }
    setEmail(value); setError("");
  }

  async function sendCode() {
    if (busyRef.current || countdown > 0) return;
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) { setError(copy.invalidEmail); return; }
    busyRef.current = true;
    setPhase("sending"); setError("");
    try {
      await postInquiry("/api/inquiry/send-code", { email: normalizedEmail });
      setVerifiedEmail(""); setCode(""); setSentTo(normalizedEmail); setCountdown(60);
    } catch (failure) {
      if (failure instanceof Error && failure.message === "send_too_frequently") setCountdown(60);
      setError(errorMessage(failure, locale));
    } finally {
      busyRef.current = false; setPhase("idle");
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busyRef.current || submitted) return;
    if (!drawings.length) { setError(cadCopy.selectDrawing); return; }
    if (!company.trim()) { setError(copy.companyRequired); return; }
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) { setError(copy.invalidEmail); return; }
    // The existing API accepts up to 4,000 characters. Never silently truncate a configuration.
    if (requestMessage.length > 4000) { setError(cadCopy.tooLong); return; }
    if (!isVerified && !hasCodeSent) { setError(copy.requestCodeFirst); return; }
    if (!isVerified && !/^\d{6}$/.test(code)) { setError(copy.enterCode); codeRef.current?.focus(); return; }
    busyRef.current = true;
    setError("");
    try {
      if (!isVerified) {
        setPhase("verifying");
        await postInquiry("/api/inquiry/verify-code", { email: normalizedEmail, code });
        // A successful verification consumes the code. Keep it for retries if submission fails.
        setVerifiedEmail(normalizedEmail);
      }
      setPhase("submitting");
      const result = await postInquiry("/api/inquiry/submit", {
        company: company.trim(), email: normalizedEmail, requestType: "CAD", locale,
        productType: configuration.productType || productType || productName,
        productName, productSeries: configuration.productSeries || productSeries,
        productModel: model, targetModel: model, message: requestMessage,
        currentUrl: window.location.href,
      });
      setReferenceId(result.referenceId || ""); setSubmitted(true);
    } catch (failure) {
      const reason = failure instanceof Error ? failure.message : "";
      if (["email_not_verified", "email_verification_expired", "verification_code_missing", "verification_code_expired", "verification_code_invalid"].includes(reason)) {
        setVerifiedEmail(""); setSentTo(""); setCode("");
      }
      setError(errorMessage(failure, locale));
    } finally {
      busyRef.current = false; setPhase("idle");
    }
  }

  return <ConfiguratorDialogFrame
    dialogRef={dialogRef} closeRef={closeRef} locale={locale} className={styles.dialog}
    titleId={`${prefix}-title`} descriptionId={`${prefix}-description`}
    title={copy.cadTitle} description={cadCopy.description}
    closeLabel={copy.close} onClose={close}
    notice={submitted ? "" : cadCopy.notice}
    actions={submitted ? <ConfiguratorButton onClick={close}>{copy.closeSuccess}</ConfiguratorButton> : <>
      <ConfiguratorButton onClick={close} disabled={busy}>{workspaceCopy.cancel}</ConfiguratorButton>
      <ConfiguratorButton type="submit" form={`${prefix}-form`} variant="primary" disabled={busy}>
        {phase === "verifying" ? copy.verifyingEmail : phase === "submitting" ? copy.submittingCad : copy.submitCad}
      </ConfiguratorButton>
    </>}
  >
    {submitted ? <div className={`${styles.body} ${styles.success}`} role="status">
      <h3 ref={successRef} tabIndex={-1}>{copy.successTitle}</h3>
      <p>{copy.successDescription} <strong>{normalizedEmail}</strong></p>
      <p>{model} · {drawingOptions.filter(option => drawings.includes(option.value)).map(option => option.label).join(" + ")}</p>
      {referenceId ? <p className={styles.hint}>{cadCopy.referenceId}: {referenceId}</p> : null}
    </div> : <form id={`${prefix}-form`} className={`${formStyles.body} ${styles.body}`} onSubmit={submit} aria-busy={busy}>
      <fieldset className={styles.fields} disabled={busy}>
        <div className={styles.product}>
          <div className={styles.productHeading}>
            <div><span className={styles.hint}>{cadCopy.reference}</span><h3>{model}</h3></div>
            {savedConfigurations.length ? <div className={`${formStyles.field} ${styles.configurationPicker}`}>
              <label htmlFor={`${prefix}-configuration`}>{cadCopy.requestFor}</label>
              <select id={`${prefix}-configuration`} value={selectedId} onChange={event => { setSelectedId(event.target.value); setError(""); }}>

                {savedConfigurations.map((item, index) => <option key={item.id} value={item.id}>
                  {item.label || workspaceCopy.configuration(index + 1)}
                </option>)}
              </select>
            </div> : <span className={styles.hint}>{configurationLabel}</span>}
          </div>
          <p className={styles.overview}>{rows.slice(0, 3).map(([, value]) => value).join(" · ")}</p>
          {rows.length ? <details key={selectedId} className={styles.details}>
            <summary>{cadCopy.details}</summary>
            <dl>{rows.map(([label, value], index) => <div key={`${index}:${label}`}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </details> : null}
        </div>
        <DrawingRequirements locale={locale} value={drawings} onChange={setDrawings} />
        <div className={styles.contactFields}>
          <div className={formStyles.field}>
            <label htmlFor={`${prefix}-company`}>{copy.company} *</label>
            <input id={`${prefix}-company`} name="company" autoComplete="organization" required maxLength={200}
              value={company} onChange={event => setCompany(event.target.value)} placeholder={copy.companyPlaceholder} />
          </div>
          <div className={formStyles.field}>
            <label htmlFor={`${prefix}-email`}>{copy.businessEmail} *</label>
            <div className={styles.emailRow}>
              <input id={`${prefix}-email`} name="email" type="email" autoComplete="email" required maxLength={254}
                value={email} onChange={event => updateEmail(event.target.value)} placeholder={copy.businessEmailPlaceholder} />
              <ConfiguratorButton disabled={busy || countdown > 0} onClick={sendCode}>
                {phase === "sending" ? copy.sendingCode : countdown > 0 ? cadCopy.resend(countdown) : hasCodeSent ? copy.resendCode : copy.sendCode}
              </ConfiguratorButton>
            </div>
          </div>
        </div>
        {hasCodeSent ? <div className={styles.codeRow}>
          <div className={formStyles.field}>
            <label htmlFor={`${prefix}-code`}>{copy.verificationCode} *</label>
            <input ref={codeRef} id={`${prefix}-code`} name="code" inputMode="numeric" autoComplete="one-time-code"
              maxLength={6} value={code} disabled={isVerified} placeholder={copy.verificationCodePlaceholder}
              onChange={event => { setCode(event.target.value.replace(/\D/g, "")); setError(""); }} />
          </div>
          <p className={styles.hint} role="status">{isVerified ? copy.emailVerified : copy.codeSent}</p>
        </div> : null}
        <div className={formStyles.field}>
          <label htmlFor={`${prefix}-notes`}>{cadCopy.notes}</label>
          <textarea id={`${prefix}-notes`} name="notes" rows={2} maxLength={1000} value={notes} onChange={event => setNotes(event.target.value)}
            placeholder={cadCopy.placeholder} />
        </div>
      </fieldset>
      {error ? <p className={`${styles.error} ${formStyles.error}`} role="alert">{error}</p> : null}
    </form>}
  </ConfiguratorDialogFrame>;
}
