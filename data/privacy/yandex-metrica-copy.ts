import type { LocaleCode } from "@/lib/i18n";

type MetricaPrivacyCopy = {
  providers: string;
  lastUpdated: string;
  paragraphs: string[];
};

export const yandexMetricaPrivacyCopy: Record<LocaleCode, MetricaPrivacyCopy> = {
  "zh-CN": {
    providers: "Google Analytics 和 Yandex Metrica",
    lastUpdated: "最后更新：2026年10月20日",
    paragraphs: [
      "在您同意分析 Cookie 后，我们也使用 Yandex Metrica 统计页面访问、访问来源、网站语言、询盘成功、联系入口点击、资料下载及选型清单操作。Yandex Metrica 可能使用 _ym 开头的 Cookie 和本地存储标识符。",
      "本网站的 Metrica 接入不启用会话回放、点击热图或表单内容录制。我们不通过自定义事件发送姓名、邮箱、电话、询盘正文或附件；页面地址只保留必要的营销归因参数。您可以通过页脚的 Cookie 设置撤回同意，停止后续 Metrica 统计并清除本网站可访问的相关标识符。",
      "上述统计数据由 Yandex 按照其服务条款和隐私政策处理，保存期限取决于相应服务规则和账户设置。接入 Yandex Metrica 后，原先仅针对 Google Analytics 的同意需要重新确认。",
    ],
  },
  en: {
    providers: "Google Analytics and Yandex Metrica",
    lastUpdated: "Last updated: 20 October 2026",
    paragraphs: [
      "After you consent to analytics cookies, we also use Yandex Metrica to measure page visits, traffic sources, website language, successful inquiries, contact clicks, resource downloads and inquiry-list actions. Metrica may use cookies starting with _ym and identifiers in local storage.",
      "Our Metrica integration does not enable Session Replay, click maps or form-content recording. Custom events do not include names, email addresses, phone numbers, inquiry text or attachments; page URLs retain only necessary campaign-attribution parameters. You can withdraw consent through Cookie settings in the footer to stop further Metrica measurement and clear related identifiers accessible to this website.",
      "Yandex processes this analytics data under its terms and privacy policy. Retention depends on the relevant service rules and account settings. Consent previously given for Google Analytics alone must be renewed when Yandex Metrica is introduced.",
    ],
  },
  es: {
    providers: "Google Analytics y Yandex Metrica",
    lastUpdated: "Última actualización: 20 de octubre de 2026",
    paragraphs: [
      "Tras consentir las cookies analíticas, también utilizamos Yandex Metrica para medir visitas, fuentes de tráfico, idioma del sitio, consultas enviadas correctamente, clics de contacto, descargas y acciones en la lista de consultas. Metrica puede utilizar cookies que empiezan por _ym e identificadores en el almacenamiento local.",
      "Nuestra integración no activa la reproducción de sesiones, mapas de clics ni grabación del contenido de formularios. Los eventos personalizados no incluyen nombres, correos, teléfonos, textos de consultas ni adjuntos; las URL conservan únicamente los parámetros necesarios de atribución de campañas. Puede retirar su consentimiento desde Configuración de cookies en el pie de página para detener la medición y eliminar los identificadores relacionados accesibles al sitio.",
      "Yandex trata estos datos conforme a sus condiciones y política de privacidad. La conservación depende de las reglas del servicio y la configuración de la cuenta. El consentimiento anterior limitado a Google Analytics debe renovarse al incorporar Yandex Metrica.",
    ],
  },
  fr: {
    providers: "Google Analytics et Yandex Metrica",
    lastUpdated: "Dernière mise à jour : 20 octobre 2026",
    paragraphs: [
      "Après votre consentement aux cookies analytiques, nous utilisons également Yandex Metrica pour mesurer les visites, les sources de trafic, la langue du site, les demandes envoyées avec succès, les clics de contact, les téléchargements et les actions sur la liste de demandes. Metrica peut utiliser des cookies commençant par _ym et des identifiants dans le stockage local.",
      "Notre intégration n’active ni la relecture des sessions, ni les cartes de clics, ni l’enregistrement du contenu des formulaires. Les événements personnalisés ne contiennent pas de noms, d’e-mails, de téléphones, de textes de demandes ou de pièces jointes ; les URL ne conservent que les paramètres nécessaires à l’attribution des campagnes. Vous pouvez retirer votre consentement via Paramètres des cookies dans le pied de page pour arrêter la mesure et effacer les identifiants associés accessibles au site.",
      "Yandex traite ces données selon ses conditions et sa politique de confidentialité. La conservation dépend des règles du service et des paramètres du compte. Le consentement antérieur limité à Google Analytics doit être renouvelé lors de l’ajout de Yandex Metrica.",
    ],
  },
  ko: {
    providers: "Google Analytics 및 Yandex Metrica",
    lastUpdated: "최종 업데이트: 2026년 10월 20일",
    paragraphs: [
      "분석 쿠키에 동의하면 Yandex Metrica를 사용하여 페이지 방문, 유입 경로, 사이트 언어, 문의 전송 성공, 연락처 클릭, 자료 다운로드 및 문의 목록 작업을 측정합니다. Metrica는 _ym으로 시작하는 쿠키와 로컬 저장소 식별자를 사용할 수 있습니다.",
      "당사의 연동은 세션 재생, 클릭 맵 또는 양식 내용 기록을 활성화하지 않습니다. 사용자 정의 이벤트에는 이름, 이메일, 전화번호, 문의 본문 또는 첨부파일이 포함되지 않으며 페이지 URL에는 캠페인 유입 분석에 필요한 매개변수만 유지합니다. 바닥글의 쿠키 설정에서 동의를 철회하면 이후 측정이 중단되고 사이트에서 접근할 수 있는 관련 식별자가 삭제됩니다.",
      "Yandex는 자사의 약관과 개인정보 처리방침에 따라 통계 데이터를 처리합니다. 보관 기간은 서비스 규칙과 계정 설정에 따라 달라집니다. Yandex Metrica가 추가되면 기존 Google Analytics에만 적용된 동의를 다시 확인합니다.",
    ],
  },
  ru: {
    providers: "Google Analytics и Яндекс Метрику",
    lastUpdated: "Последнее обновление: 20 октября 2026 года",
    paragraphs: [
      "После вашего согласия на аналитические Cookie мы также используем Яндекс Метрику для учёта посещений, источников переходов, языка сайта, успешно отправленных запросов, кликов по контактам, скачиваний материалов и действий со списком запросов. Метрика может использовать Cookie с префиксом _ym и идентификаторы в локальном хранилище.",
      "В нашей интеграции не включены Вебвизор, карты кликов и запись содержимого форм. Пользовательские события не содержат имён, адресов электронной почты, телефонов, текстов запросов или вложений; в адресах страниц сохраняются только необходимые параметры атрибуции кампаний. Через «Настройки Cookie» в нижней части сайта можно отозвать согласие, остановить дальнейший сбор статистики и удалить доступные сайту связанные идентификаторы.",
      "Яндекс обрабатывает эти статистические данные согласно своим условиям и политике конфиденциальности. Срок хранения зависит от правил сервиса и настроек аккаунта. После подключения Метрики прежнее согласие только на Google Analytics необходимо подтвердить заново.",
    ],
  },
};
