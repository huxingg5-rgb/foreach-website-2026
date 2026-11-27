import type { LocaleCode } from "@/lib/i18n";
import { homeApplicationFlowData } from "./home-application-flow";
import hindi from "./home-applications.hi.json";

import { getGermanDraftLink, getItalianDraftLink, getHindiDraftLink } from "@/lib/i18n/draft-languages";

export type HomeApplicationsLocale = Exclude<LocaleCode, "zh-CN"> | "de" | "it" | "hi";

const applicationSlugs = [
  "ivd", "life-science", "lab-automation", "analytical-instruments",
  "environmental-monitoring", "synthetic-biology",
] as const;

type ApplicationSlug = (typeof applicationSlugs)[number];
type HomeApplicationsCopy = {
  title: string;
  subtitle: string;
  imageAlt: string;
  industryTitle: string;
  introduction: string;
  allApplications: string;
  tasksAriaLabel: string;
  applications: Record<ApplicationSlug, { name: string; description: string }>;
};

const localizedCopy: Record<HomeApplicationsLocale, HomeApplicationsCopy> = {
  hi: hindi.copy,
  en: {
    title: "Product Applications",
    subtitle: "Fluid Handling · Instrumentation · Automation",
    imageAlt: "FOREACH technician working on fluidic equipment",
    industryTitle: "Explore by Industry",
    introduction: "Our fluidic components support instruments and workflows across key industries. Explore your industry below to find relevant applications and component options for your system.",
    allApplications: "All applications",
    tasksAriaLabel: "Fluid-handling tasks",
    applications: {
      ivd: { name: "IVD Diagnostics", description: "Reagent dispensing · Washing · Waste handling" },
      "life-science": { name: "Life Sciences", description: "Sample preparation · Reagent handling · Liquid transfer" },
      "lab-automation": { name: "Laboratory Automation", description: "Liquid handling · Dispensing · System integration" },
      "analytical-instruments": { name: "Analytical Instruments", description: "Sample preparation · Fluid routing · Monitoring" },
      "environmental-monitoring": { name: "Environmental Monitoring", description: "Sample collection · Reagent dosing · Fluid monitoring" },
      "synthetic-biology": { name: "Synthetic Biology", description: "Culture media delivery · Multi-channel dispensing · Flow control" },
    },
  },
  it: {
    title: "Applicazioni",
    subtitle: "Gestione dei fluidi · Strumentazione · Automazione",
    imageAlt: "Tecnico FOREACH al lavoro su un’apparecchiatura fluidica",
    industryTitle: "Applicazioni per settore",
    introduction: "I nostri componenti fluidici sono utilizzati in strumenti e processi di diversi settori. Scopri le applicazioni e i componenti adatti al tuo sistema.",
    allApplications: "Tutte le applicazioni",
    tasksAriaLabel: "Funzioni per la gestione dei fluidi",
    applications: {
      ivd: { name: "Diagnostica in vitro (IVD)", description: "Dosaggio di reagenti · Lavaggio · Gestione dei reflui" },
      "life-science": { name: "Scienze della vita", description: "Preparazione dei campioni · Gestione dei reagenti · Trasferimento di liquidi" },
      "lab-automation": { name: "Automazione di laboratorio", description: "Gestione dei liquidi · Dosaggio · Integrazione del sistema" },
      "analytical-instruments": { name: "Strumenti di analisi", description: "Preparazione dei campioni · Instradamento dei fluidi · Monitoraggio" },
      "environmental-monitoring": { name: "Monitoraggio ambientale", description: "Prelievo di campioni · Dosaggio di reagenti · Monitoraggio dei fluidi" },
      "synthetic-biology": { name: "Biologia sintetica", description: "Alimentazione con terreni di coltura · Dosaggio multicanale · Regolazione della portata" },
    },
  },
  de: {
    title: "Anwendungen",
    subtitle: "Flüssigkeitshandhabung · Geräte · Automation",
    imageAlt: "FOREACH-Techniker bei der Arbeit an einem Fluidikgerät",
    industryTitle: "Anwendungen nach Branche",
    introduction: "Unsere Fluidikkomponenten kommen in Geräten und Arbeitsabläufen verschiedener Branchen zum Einsatz. Finden Sie Anwendungen und passende Komponenten für Ihr System.",
    allApplications: "Alle Anwendungen",
    tasksAriaLabel: "Aufgaben der Flüssigkeitshandhabung",
    applications: {
      ivd: { name: "In-vitro-Diagnostik (IVD)", description: "Reagenzien dosieren · Spülen · Flüssigabfall abführen" },
      "life-science": { name: "Lebenswissenschaften", description: "Proben vorbereiten · Reagenzien handhaben · Flüssigkeiten fördern" },
      "lab-automation": { name: "Laborautomation", description: "Flüssigkeiten handhaben · Dosieren · Systeme integrieren" },
      "analytical-instruments": { name: "Analysengeräte", description: "Proben vorbereiten · Flüssigkeiten leiten · Überwachen" },
      "environmental-monitoring": { name: "Umweltüberwachung", description: "Proben entnehmen · Reagenzien dosieren · Fluidik überwachen" },
      "synthetic-biology": { name: "Synthetische Biologie", description: "Kulturmedien fördern · Mehrkanaldosierung · Durchfluss regeln" },
    },
  },
  es: {
    title: "Aplicaciones de productos",
    subtitle: "Manejo de fluidos · Instrumentación · Automatización",
    imageAlt: "Técnico de FOREACH trabajando en un equipo fluídico",
    industryTitle: "Explore por sector",
    introduction: "Nuestros componentes fluídicos se integran en instrumentos y procesos de sectores clave. Explore su sector para encontrar aplicaciones y opciones de componentes para su sistema.",
    allApplications: "Todas las aplicaciones",
    tasksAriaLabel: "Tareas de manejo de fluidos",
    applications: {
      ivd: { name: "Diagnóstico in vitro", description: "Dispensación de reactivos · Lavado · Gestión de residuos" },
      "life-science": { name: "Ciencias de la vida", description: "Preparación de muestras · Manejo de reactivos · Transferencia de líquidos" },
      "lab-automation": { name: "Automatización de laboratorio", description: "Manejo de líquidos · Dispensación · Integración de sistemas" },
      "analytical-instruments": { name: "Instrumentos analíticos", description: "Preparación de muestras · Distribución de fluidos · Monitorización" },
      "environmental-monitoring": { name: "Monitorización ambiental", description: "Toma de muestras · Dosificación de reactivos · Monitorización de fluidos" },
      "synthetic-biology": { name: "Biología sintética", description: "Suministro de medios de cultivo · Dispensación multicanal · Control de flujo" },
    },
  },
  fr: {
    title: "Applications des produits",
    subtitle: "Gestion des fluides · Instrumentation · Automatisation",
    imageAlt: "Technicien FOREACH travaillant sur un équipement fluidique",
    industryTitle: "Explorez par secteur",
    introduction: "Nos composants fluidiques équipent les instruments et les procédés de secteurs clés. Explorez votre secteur pour découvrir les applications et les composants adaptés à votre système.",
    allApplications: "Toutes les applications",
    tasksAriaLabel: "Fonctions de gestion des fluides",
    applications: {
      ivd: { name: "Diagnostic in vitro", description: "Distribution de réactifs · Lavage · Gestion des déchets" },
      "life-science": { name: "Sciences de la vie", description: "Préparation des échantillons · Gestion des réactifs · Transfert de liquides" },
      "lab-automation": { name: "Automatisation de laboratoire", description: "Manipulation de liquides · Distribution · Intégration de systèmes" },
      "analytical-instruments": { name: "Instruments analytiques", description: "Préparation des échantillons · Distribution des fluides · Surveillance" },
      "environmental-monitoring": { name: "Surveillance environnementale", description: "Prélèvement d’échantillons · Dosage de réactifs · Surveillance des fluides" },
      "synthetic-biology": { name: "Biologie de synthèse", description: "Alimentation en milieux de culture · Distribution multicanal · Contrôle du débit" },
    },
  },
  ko: {
    title: "제품 응용 분야",
    subtitle: "유체 처리 · 계측 장비 · 자동화",
    imageAlt: "유체 장비를 작업 중인 FOREACH 기술자",
    industryTitle: "산업별 응용 분야",
    introduction: "당사의 유체 부품은 주요 산업의 장비와 작업 공정에 사용됩니다. 해당 산업을 선택하여 시스템에 적합한 응용 분야와 부품을 살펴보세요.",
    allApplications: "모든 응용 분야",
    tasksAriaLabel: "유체 처리 작업",
    applications: {
      ivd: { name: "체외진단", description: "시약 분주 · 세척 · 폐액 처리" },
      "life-science": { name: "생명과학", description: "시료 전처리 · 시약 처리 · 액체 이송" },
      "lab-automation": { name: "실험실 자동화", description: "액체 처리 · 분주 · 시스템 통합" },
      "analytical-instruments": { name: "분석 장비", description: "시료 전처리 · 유로 제어 · 모니터링" },
      "environmental-monitoring": { name: "환경 모니터링", description: "시료 채취 · 시약 정량 주입 · 유체 모니터링" },
      "synthetic-biology": { name: "합성생물학", description: "배양 배지 공급 · 다채널 분주 · 유량 제어" },
    },
  },
  ru: {
    title: "Применение продукции",
    subtitle: "Работа с жидкостями · Приборы · Автоматизация",
    imageAlt: "Техник FOREACH за работой с жидкостным оборудованием",
    industryTitle: "Выберите отрасль",
    introduction: "Наши компоненты для управления жидкостями используются в приборах и рабочих процессах ключевых отраслей. Выберите отрасль, чтобы найти подходящие области применения и компоненты для вашей системы.",
    allApplications: "Все области применения",
    tasksAriaLabel: "Задачи работы с жидкостями",
    applications: {
      ivd: { name: "Диагностика in vitro", description: "Дозирование реагентов · Промывка · Отвод отходов" },
      "life-science": { name: "Науки о жизни", description: "Подготовка образцов · Работа с реагентами · Перенос жидкостей" },
      "lab-automation": { name: "Лабораторная автоматизация", description: "Работа с жидкостями · Дозирование · Интеграция систем" },
      "analytical-instruments": { name: "Аналитические приборы", description: "Подготовка образцов · Распределение потоков · Мониторинг" },
      "environmental-monitoring": { name: "Экологический мониторинг", description: "Отбор проб · Дозирование реагентов · Контроль жидкостей" },
      "synthetic-biology": { name: "Синтетическая биология", description: "Подача питательных сред · Многоканальное дозирование · Управление потоком" },
    },
  },
};

const germanTaskCopy: Record<string, { title: string; description: string }> = {
  "sample-processing": { title: "Probenverarbeitung", description: "Proben ansaugen, übertragen, mischen und vorbehandeln sowie Flüssigkeiten vor der Detektion steuern." },
  "reagent-dispensing": { title: "Reagenziendosierung", description: "Kleinste Volumina dosieren, über mehrere Kanäle abgeben und Flüssigkeiten kontinuierlich und gleichmäßig zuführen." },
  "fluid-path-switching": { title: "Flüssigkeitswege umschalten", description: "Präzise zwischen Reagenzien, Proben und Detektionskanälen umschalten." },
  "status-monitoring": { title: "Zustände überwachen", description: "Druck, Luftblasen, Leitfähigkeit und andere wichtige Zustände im Flüssigkeitskreislauf überwachen." },
};

const italianTaskCopy: typeof germanTaskCopy = {
  "sample-processing": { title: "Preparazione dei campioni", description: "Aspirazione, trasferimento, miscelazione e pretrattamento dei campioni, con controllo dei fluidi prima della rilevazione." },
  "reagent-dispensing": { title: "Dosaggio dei reagenti", description: "Dosaggio di microvolumi, erogazione multicanale, alimentazione continua e distribuzione uniforme." },
  "fluid-path-switching": { title: "Commutazione del circuito", description: "Commutazione precisa tra reagenti, campioni e canali di rilevazione." },
  "status-monitoring": { title: "Monitoraggio del circuito", description: "Monitoraggio della pressione, delle bolle, della conducibilità e di altri parametri del circuito fluidico." },
};

export function getHomeApplicationsSectionData(locale: HomeApplicationsLocale) {
  const { applications, ...copy } = localizedCopy[locale];
  return {
    locale,
    copy,
    applications: applicationSlugs.map(slug => ({
      slug,
      ...applications[slug],
      ...(locale === "de"
        ? getGermanDraftLink(`/en/applications/${slug}/`)
        : locale === "it" ? getItalianDraftLink(`/en/applications/${slug}/`)
        : locale === "hi" ? getHindiDraftLink("/en/applications/" + slug + "/")
        : { href: `/${locale}/applications/${slug}/`, hrefLang: undefined, title: undefined }),
    })),
    allApplicationsHref: locale === "hi" ? getHindiDraftLink("/en/applications/").href : locale === "it" ? getItalianDraftLink("/en/applications/").href : `/${locale}/applications/`,
    // These four tasks already have localized copy; leave the Chinese source intact.
    tasks: homeApplicationFlowData.processCards.map(task => ({
      key: task.key,
      ...(locale === "de" ? germanTaskCopy[task.key] : locale === "it" ? italianTaskCopy[task.key] : locale === "hi" ? hindi.tasks[task.key as keyof typeof hindi.tasks] : { title: task.title[locale], description: task.description[locale] }),
    })),
  };
}

export type HomeApplicationsSectionData = ReturnType<typeof getHomeApplicationsSectionData>;
