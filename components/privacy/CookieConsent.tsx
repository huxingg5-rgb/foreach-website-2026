"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getLocaleFromPathname,
  type LocaleCode,
} from "@/lib/i18n";

import {
  OPEN_COOKIE_SETTINGS_EVENT_NAME,
  readCookieConsent,
  removeGoogleAnalyticsCookies,
  type CookieConsentState,
  writeCookieConsent,
} from "@/lib/privacy/cookie-consent";

import styles from "./CookieConsent.module.css";

type ConsentCopy = {
  bannerTitle: string;
  bannerDescription: string;
  privacyPolicy: string;
  rejectOptional: string;
  customize: string;
  acceptAll: string;
  settingsTitle: string;
  settingsDescription: string;
  necessaryTitle: string;
  necessaryDescription: string;
  alwaysActive: string;
  analyticsTitle: string;
  analyticsDescription: string;
  saveChoices: string;
  close: string;
};

const copyByLocale: Record<LocaleCode, ConsentCopy> = {
  "zh-CN": {
    bannerTitle: "我们重视您的隐私",
    bannerDescription:
      "我们使用必要技术保障网站正常运行，并在您同意后使用 Google Analytics 了解网站使用情况。",
    privacyPolicy: "隐私政策",
    rejectOptional: "拒绝可选项",
    customize: "自定义设置",
    acceptAll: "全部接受",
    settingsTitle: "Cookie 设置",
    settingsDescription:
      "您可以选择是否允许分析 Cookie。必要 Cookie 用于保存隐私选择和保障网站基本功能，无法关闭。",
    necessaryTitle: "必要 Cookie",
    necessaryDescription:
      "用于维持网站基本功能，并保存您的 Cookie 同意选择。",
    alwaysActive: "始终启用",
    analyticsTitle: "分析 Cookie",
    analyticsDescription:
      "帮助我们通过 Google Analytics 了解页面访问和功能使用情况，以改进网站。",
    saveChoices: "保存选择",
    close: "关闭",
  },
  en: {
    bannerTitle: "We value your privacy",
    bannerDescription:
      "We use essential technologies to keep the website working and, with your consent, Google Analytics to understand website usage.",
    privacyPolicy: "Privacy Policy",
    rejectOptional: "Reject optional",
    customize: "Customize",
    acceptAll: "Accept all",
    settingsTitle: "Cookie settings",
    settingsDescription:
      "You can choose whether to allow analytics cookies. Essential cookies support core website functions and save your privacy choices.",
    necessaryTitle: "Essential cookies",
    necessaryDescription:
      "Used for core website functions and to remember your cookie preferences.",
    alwaysActive: "Always active",
    analyticsTitle: "Analytics cookies",
    analyticsDescription:
      "Help us understand page visits and feature usage through Google Analytics so we can improve the website.",
    saveChoices: "Save choices",
    close: "Close",
  },
  es: {
    bannerTitle: "Valoramos su privacidad",
    bannerDescription:
      "Utilizamos tecnologías esenciales para el funcionamiento del sitio y, con su consentimiento, Google Analytics para comprender su uso.",
    privacyPolicy: "Política de privacidad",
    rejectOptional: "Rechazar opcionales",
    customize: "Personalizar",
    acceptAll: "Aceptar todo",
    settingsTitle: "Configuración de cookies",
    settingsDescription:
      "Puede decidir si permite las cookies analíticas. Las cookies esenciales mantienen las funciones básicas y guardan sus preferencias.",
    necessaryTitle: "Cookies esenciales",
    necessaryDescription:
      "Se utilizan para las funciones básicas del sitio y para recordar sus preferencias.",
    alwaysActive: "Siempre activas",
    analyticsTitle: "Cookies analíticas",
    analyticsDescription:
      "Nos ayudan a comprender las visitas y el uso de funciones mediante Google Analytics.",
    saveChoices: "Guardar selección",
    close: "Cerrar",
  },
  fr: {
    bannerTitle: "Nous respectons votre vie privée",
    bannerDescription:
      "Nous utilisons des technologies essentielles au fonctionnement du site et, avec votre accord, Google Analytics pour comprendre son utilisation.",
    privacyPolicy: "Politique de confidentialité",
    rejectOptional: "Refuser les options",
    customize: "Personnaliser",
    acceptAll: "Tout accepter",
    settingsTitle: "Paramètres des cookies",
    settingsDescription:
      "Vous pouvez choisir d’autoriser ou non les cookies analytiques. Les cookies essentiels assurent les fonctions de base et mémorisent vos choix.",
    necessaryTitle: "Cookies essentiels",
    necessaryDescription:
      "Utilisés pour les fonctions essentielles du site et pour mémoriser vos préférences.",
    alwaysActive: "Toujours actifs",
    analyticsTitle: "Cookies analytiques",
    analyticsDescription:
      "Ils nous aident à comprendre les visites et l’utilisation des fonctionnalités grâce à Google Analytics.",
    saveChoices: "Enregistrer",
    close: "Fermer",
  },
  ko: {
    bannerTitle: "개인정보를 소중히 보호합니다",
    bannerDescription:
      "웹사이트의 정상적인 운영을 위해 필수 기술을 사용하며, 동의한 경우 Google Analytics를 통해 이용 현황을 파악합니다.",
    privacyPolicy: "개인정보 처리방침",
    rejectOptional: "선택 항목 거부",
    customize: "설정",
    acceptAll: "모두 허용",
    settingsTitle: "쿠키 설정",
    settingsDescription:
      "분석 쿠키 허용 여부를 선택할 수 있습니다. 필수 쿠키는 기본 기능과 개인정보 설정 저장에 사용됩니다.",
    necessaryTitle: "필수 쿠키",
    necessaryDescription:
      "웹사이트의 기본 기능과 쿠키 선택 사항 저장에 사용됩니다.",
    alwaysActive: "항상 활성화",
    analyticsTitle: "분석 쿠키",
    analyticsDescription:
      "Google Analytics를 통해 페이지 방문과 기능 사용 현황을 파악하여 웹사이트를 개선합니다.",
    saveChoices: "선택 저장",
    close: "닫기",
  },
  ru: {
    bannerTitle: "Мы ценим вашу конфиденциальность",
    bannerDescription:
      "Мы используем необходимые технологии для работы сайта и, с вашего согласия, Google Analytics для анализа его использования.",
    privacyPolicy: "Политика конфиденциальности",
    rejectOptional: "Отклонить необязательные",
    customize: "Настроить",
    acceptAll: "Принять все",
    settingsTitle: "Настройки Cookie",
    settingsDescription:
      "Вы можете разрешить или запретить аналитические Cookie. Необходимые Cookie поддерживают основные функции и сохраняют ваш выбор.",
    necessaryTitle: "Необходимые Cookie",
    necessaryDescription:
      "Используются для основных функций сайта и сохранения ваших настроек.",
    alwaysActive: "Всегда активны",
    analyticsTitle: "Аналитические Cookie",
    analyticsDescription:
      "Помогают анализировать посещения и использование функций через Google Analytics.",
    saveChoices: "Сохранить выбор",
    close: "Закрыть",
  },
};

function getPrivacyPolicyHref(locale: LocaleCode) {
  if (locale === "zh-CN") {
    return "/privacy-policy";
  }

  return `/${locale}/privacy-policy`;
}

export default function CookieConsent() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const copy = copyByLocale[locale];

  const [isReady, setIsReady] = useState(false);
  const [consent, setConsent] =
    useState<CookieConsentState | null>(null);
  const [settingsOpen, setSettingsOpen] =
    useState(false);
  const [draftAnalytics, setDraftAnalytics] =
    useState(false);

  const privacyPolicyHref = useMemo(
    () => getPrivacyPolicyHref(locale),
    [locale],
  );

  useEffect(() => {
    const storedConsent = readCookieConsent();

    setConsent(storedConsent);
    setDraftAnalytics(storedConsent?.analytics ?? false);
    setIsReady(true);
  }, []);

  useEffect(() => {
    function handleOpenSettings() {
      const storedConsent = readCookieConsent();

      setConsent(storedConsent);
      setDraftAnalytics(storedConsent?.analytics ?? false);
      setSettingsOpen(true);
    }

    window.addEventListener(
      OPEN_COOKIE_SETTINGS_EVENT_NAME,
      handleOpenSettings,
    );

    return () => {
      window.removeEventListener(
        OPEN_COOKIE_SETTINGS_EVENT_NAME,
        handleOpenSettings,
      );
    };
  }, []);

  useEffect(() => {
    if (!settingsOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSettingsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [settingsOpen]);

  function saveConsent(analytics: boolean) {
    const nextConsent = writeCookieConsent(analytics);

    if (!analytics) {
      removeGoogleAnalyticsCookies();
    }

    setConsent(nextConsent);
    setDraftAnalytics(analytics);
    setSettingsOpen(false);
  }

  function openSettings() {
    setDraftAnalytics(consent?.analytics ?? false);
    setSettingsOpen(true);
  }


  if (!isReady) {
    return null;
  }

  const showBanner = !consent && !settingsOpen;

  return (
    <>
      {showBanner ? (
        <section
          className={styles.banner}
          aria-label={copy.bannerTitle}
        >
          <div className={styles.bannerInner}>
            <p className={styles.description}>
              {copy.bannerDescription}{" "}

              <Link
                className={styles.policyLink}
                href={privacyPolicyHref}
              >
                {copy.privacyPolicy}
              </Link>

              <span
                className={styles.linkSeparator}
                aria-hidden="true"
              >
                {" · "}
              </span>

              <button
                className={styles.settingsLink}
                type="button"
                onClick={openSettings}
              >
                {copy.settingsTitle}
              </button>
            </p>

            <div className={styles.actions}>
              <button
                className={`${styles.button} ${styles.buttonSecondary}`}
                type="button"
                onClick={() => saveConsent(false)}
              >
                {copy.rejectOptional}
              </button>

              <button
                className={`${styles.button} ${styles.buttonPrimary}`}
                type="button"
                onClick={() => saveConsent(true)}
              >
                {copy.acceptAll}
              </button>
            </div>
</div>
        </section>
      ) : null}
      {settingsOpen ? (
        <div
          className={styles.overlay}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSettingsOpen(false);
            }
          }}
        >
          <section
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby="foreach-cookie-settings-title"
          >
            <header className={styles.dialogHeader}>
              <h2
                className={styles.dialogTitle}
                id="foreach-cookie-settings-title"
              >
                {copy.settingsTitle}
              </h2>

              <button
                className={styles.closeButton}
                type="button"
                aria-label={copy.close}
                onClick={() => setSettingsOpen(false)}
              >
                ×
              </button>
            </header>

            <div className={styles.dialogBody}>
              <p className={styles.intro}>
                {copy.settingsDescription}{" "}
                <Link
                  className={styles.policyLink}
                  href={privacyPolicyHref}
                >
                  {copy.privacyPolicy}
                </Link>
              </p>

              <div className={styles.category}>
                <div>
                  <h3 className={styles.categoryTitle}>
                    {copy.necessaryTitle}
                  </h3>

                  <p className={styles.categoryDescription}>
                    {copy.necessaryDescription}
                  </p>
                </div>

                <span className={styles.alwaysActive}>
                  {copy.alwaysActive}
                </span>
              </div>

              <div className={styles.category}>
                <div>
                  <h3 className={styles.categoryTitle}>
                    {copy.analyticsTitle}
                  </h3>

                  <p className={styles.categoryDescription}>
                    {copy.analyticsDescription}
                  </p>
                </div>

                <label className={styles.toggle}>
                  <input
                    className={styles.toggleInput}
                    type="checkbox"
                    checked={draftAnalytics}
                    aria-label={copy.analyticsTitle}
                    onChange={(event) =>
                      setDraftAnalytics(event.target.checked)
                    }
                  />

                  <span
                    className={styles.toggleTrack}
                    aria-hidden="true"
                  />
                </label>
              </div>
            </div>

            <footer className={styles.dialogFooter}>
              <button
                className={`${styles.button} ${styles.buttonSecondary}`}
                type="button"
                onClick={() => saveConsent(false)}
              >
                {copy.rejectOptional}
              </button>

              <button
                className={`${styles.button} ${styles.buttonSecondary}`}
                type="button"
                onClick={() => saveConsent(draftAnalytics)}
              >
                {copy.saveChoices}
              </button>

              <button
                className={`${styles.button} ${styles.buttonPrimary}`}
                type="button"
                onClick={() => saveConsent(true)}
              >
                {copy.acceptAll}
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
