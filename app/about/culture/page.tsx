import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

/* ================================
   恒永达文化页面
   路径：app/about/culture/page.tsx

   说明：
   1. 这是“关于我们 / 恒永达文化”页面
   2. 当前页面支持 6 种语言：
      中文、英文、西班牙语、法语、韩语、俄语
   3. 页面语言通过 Cookie：foreach_locale 判断
   4. 当前阶段多语言 URL 还没完全建立，所以仍然使用 /about/culture 这一个路径
   5. Footer 已经在 app/layout.tsx 中统一引用，这里不重复写 Footer
================================ */

export const metadata = {
  title: "恒永达文化｜恒永达 FOREACH",
  description:
    "了解恒永达文化、企业愿景、核心价值观、行为准则、爱心品牌、健康品牌与三大工程。",
};

/* ================================
   语言类型
================================ */
type LocaleCode = "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";

type LocalizedText = Record<LocaleCode, string>;

const LOCALE_COOKIE_NAME = "foreach_locale";

const supportedLocales: LocaleCode[] = ["zh-CN", "en", "es", "fr", "ko", "ru"];

/**
 * 判断 Cookie 里的语言是否属于当前官网支持的语言
 */
function isSupportedLocale(value: string | undefined): value is LocaleCode {
  return Boolean(value && supportedLocales.includes(value as LocaleCode));
}

/**
 * 获取当前页面语言
 *
 * 说明：
 * 1. 优先读取 Cookie：foreach_locale
 * 2. 如果 Cookie 不存在或不合法，默认使用中文
 */
async function getCurrentLocale(): Promise<LocaleCode> {
  const cookieStore = await cookies();

  const savedLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value;

  if (isSupportedLocale(savedLocale)) {
    return savedLocale;
  }

  return "zh-CN";
}

/**
 * 根据当前语言读取文案
 */
function getText(text: LocalizedText, locale: LocaleCode) {
  return text[locale] || text["zh-CN"];
}

/* ================================
   页面通用文案
================================ */
const pageText = {
  bannerTitle: {
    "zh-CN": "恒永达文化",
    en: "FOREACH Culture",
    es: "Cultura de FOREACH",
    fr: "Culture FOREACH",
    ko: "FOREACH 문화",
    ru: "Культура FOREACH",
  },
  bannerDesc: {
    "zh-CN":
      "以客户价值为导向，以工程实践为基础，在持续创新、团队协同与长期主义中，建设积极、可靠、向上的组织文化。",
    en: "Guided by customer value and grounded in engineering practice, FOREACH builds a positive, reliable, and long-term-oriented culture through continuous innovation and teamwork.",
    es: "Guiada por el valor para el cliente y basada en la práctica de ingeniería, FOREACH construye una cultura positiva, confiable y orientada al largo plazo mediante innovación continua y trabajo en equipo.",
    fr: "Guidée par la valeur client et fondée sur la pratique d’ingénierie, FOREACH développe une culture positive, fiable et orientée long terme grâce à l’innovation continue et au travail d’équipe.",
    ko: "FOREACH는 고객 가치와 엔지니어링 실천을 기반으로 지속적인 혁신과 팀워크를 통해 긍정적이고 신뢰할 수 있는 장기 지향의 조직 문화를 구축합니다.",
    ru: "Ориентируясь на ценность для клиента и опираясь на инженерную практику, FOREACH формирует позитивную, надежную и долгосрочно ориентированную организационную культуру.",
  },
  breadcrumbHome: {
    "zh-CN": "首页",
    en: "Home",
    es: "Inicio",
    fr: "Accueil",
    ko: "홈",
    ru: "Главная",
  },
  breadcrumbAbout: {
    "zh-CN": "关于我们",
    en: "About Us",
    es: "Sobre nosotros",
    fr: "À propos",
    ko: "회사 소개",
    ru: "О нас",
  },
  sectionTitle: {
    "zh-CN": "恒永达文化",
    en: "FOREACH Culture",
    es: "Cultura de FOREACH",
    fr: "Culture FOREACH",
    ko: "FOREACH 문화",
    ru: "Культура FOREACH",
  },
  organizationTitle: {
    "zh-CN": "打造积极、可靠、长期主义的组织文化",
    en: "Building a positive, reliable, and long-term-oriented culture",
    es: "Construir una cultura positiva, confiable y orientada al largo plazo",
    fr: "Construire une culture positive, fiable et orientée long terme",
    ko: "긍정적이고 신뢰할 수 있는 장기 지향 조직 문화 구축",
    ru: "Формирование позитивной, надежной и долгосрочной культуры",
  },
  organizationDesc: {
    "zh-CN":
      "恒永达重视研发、制造、质量、销售与服务团队之间的协同，通过持续学习、工程实践、团队活动和社会责任行动，推动企业文化融入日常工作，形成稳定向上、务实协作的组织氛围。",
    en: "FOREACH values collaboration among R&D, manufacturing, quality, sales, and service teams. Through continuous learning, engineering practice, team activities, and social responsibility initiatives, we integrate culture into daily work and build a stable, practical, and collaborative organization.",
    es: "FOREACH valora la colaboración entre los equipos de I+D, fabricación, calidad, ventas y servicio. Mediante aprendizaje continuo, práctica de ingeniería, actividades de equipo e iniciativas de responsabilidad social, integramos la cultura en el trabajo diario y construimos una organización estable, práctica y colaborativa.",
    fr: "FOREACH valorise la collaboration entre les équipes R&D, fabrication, qualité, ventes et service. Grâce à l’apprentissage continu, à la pratique d’ingénierie, aux activités d’équipe et aux actions de responsabilité sociale, nous intégrons la culture dans le travail quotidien et construisons une organisation stable, pragmatique et collaborative.",
    ko: "FOREACH는 연구개발, 제조, 품질, 영업 및 서비스 팀 간의 협업을 중시합니다. 지속 학습, 엔지니어링 실천, 팀 활동 및 사회적 책임 활동을 통해 기업 문화를 일상 업무에 녹여 안정적이고 실용적이며 협력적인 조직 분위기를 만들어 갑니다.",
    ru: "FOREACH ценит взаимодействие между командами R&D, производства, качества, продаж и сервиса. Через постоянное обучение, инженерную практику, командные мероприятия и социальную ответственность мы внедряем культуру в повседневную работу и формируем стабильную, практичную и совместную организацию.",
  },
  projectMainTitle: {
    "zh-CN": "三大工程",
    en: "Three Cultural Initiatives",
    es: "Tres iniciativas culturales",
    fr: "Trois initiatives culturelles",
    ko: "세 가지 문화 실천",
    ru: "Три культурные инициативы",
  },
  projectMainDesc: {
    "zh-CN": "以公益行动、健康活动和文化建设为主线，持续推进团队文化建设工作。",
    en: "Focused on social responsibility, health activities, and culture building, we continue to strengthen our team culture.",
    es: "Centrados en la responsabilidad social, las actividades saludables y la construcción cultural, seguimos fortaleciendo la cultura del equipo.",
    fr: "Axés sur la responsabilité sociale, les activités de santé et la construction culturelle, nous renforçons continuellement la culture d’équipe.",
    ko: "사회적 책임, 건강 활동, 문화 구축을 중심으로 팀 문화를 지속적으로 강화합니다.",
    ru: "Сосредоточившись на социальной ответственности, оздоровительных мероприятиях и развитии культуры, мы продолжаем укреплять командную культуру.",
  },
} satisfies Record<string, LocalizedText>;

/* ================================
   恒永达文化核心数据
   说明：
   1. 已去掉“企业使命”
   2. 当前保留：企业愿景、核心价值观、行为准则
   3. icon 是图标 key，用来匹配下面 CultureCoreIcon 里的 SVG
================================ */
const cultureCoreItems = [
  {
    icon: "vision",
    title: {
      "zh-CN": "企业愿景",
      en: "Vision",
      es: "Visión",
      fr: "Vision",
      ko: "비전",
      ru: "Видение",
    },
    description: {
      "zh-CN": "成为微流体系统领域值得信赖的创新型企业",
      en: "To become a trusted and innovative company in microfluidic systems",
      es: "Ser una empresa innovadora y confiable en sistemas microfluídicos",
      fr: "Devenir une entreprise innovante et fiable dans les systèmes microfluidiques",
      ko: "미세유체 시스템 분야에서 신뢰받는 혁신 기업이 되는 것",
      ru: "Стать надежной инновационной компанией в области микрофлюидных систем",
    },
  },
  {
    icon: "values",
    title: {
      "zh-CN": "核心价值观",
      en: "Core Values",
      es: "Valores fundamentales",
      fr: "Valeurs fondamentales",
      ko: "핵심 가치",
      ru: "Ключевые ценности",
    },
    description: {
      "zh-CN": "求实守信｜追求卓越｜成就客户",
      en: "Pragmatism and integrity | Pursuit of excellence | Customer success",
      es: "Pragmatismo e integridad | Búsqueda de excelencia | Éxito del cliente",
      fr: "Pragmatisme et intégrité | Recherche de l’excellence | Réussite client",
      ko: "실용과 신뢰 | 탁월함 추구 | 고객 성공",
      ru: "Практичность и честность | Стремление к совершенству | Успех клиента",
    },
  },
  {
    icon: "conduct",
    title: {
      "zh-CN": "行为准则",
      en: "Code of Conduct",
      es: "Código de conducta",
      fr: "Code de conduite",
      ko: "행동 기준",
      ru: "Принципы поведения",
    },
    description: {
      "zh-CN": "专注、可靠、协作、创新、担当",
      en: "Focus, reliability, collaboration, innovation, and responsibility",
      es: "Enfoque, confiabilidad, colaboración, innovación y responsabilidad",
      fr: "Concentration, fiabilité, collaboration, innovation et responsabilité",
      ko: "집중, 신뢰, 협업, 혁신, 책임",
      ru: "Фокус, надежность, сотрудничество, инновации и ответственность",
    },
  },
] satisfies Array<{
  icon: "vision" | "values" | "conduct";
  title: LocalizedText;
  description: LocalizedText;
}>;

/* ================================
   爱心品牌 / 健康品牌数据
================================ */
const brandActionItems = [
  {
    title: {
      "zh-CN": "爱心品牌",
      en: "Charity Brand",
      es: "Marca solidaria",
      fr: "Marque solidaire",
      ko: "나눔 브랜드",
      ru: "Бренд заботы",
    },
    description: {
      "zh-CN":
        "恒永达关注社会责任与公益行动，在企业发展的同时积极回馈社会。通过公益捐赠、物资支持等实际行动，传递企业温度，践行长期向善的责任理念。",
      en: "FOREACH cares about social responsibility and public welfare. While developing the company, we give back to society through donations, material support, and practical actions that reflect warmth and long-term responsibility.",
      es: "FOREACH presta atención a la responsabilidad social y a las acciones de bienestar público. Mientras desarrolla la empresa, retribuye a la sociedad mediante donaciones, apoyo material y acciones concretas que transmiten calidez y responsabilidad a largo plazo.",
      fr: "FOREACH accorde de l’importance à la responsabilité sociale et aux actions d’intérêt public. Tout en développant l’entreprise, nous redonnons à la société par des dons, du soutien matériel et des actions concrètes qui reflètent chaleur humaine et responsabilité durable.",
      ko: "FOREACH는 사회적 책임과 공익 활동을 중요하게 생각합니다. 회사의 성장과 함께 기부, 물품 지원 등 실질적인 활동을 통해 사회에 따뜻함을 전하고 장기적인 책임 의식을 실천합니다.",
      ru: "FOREACH уделяет внимание социальной ответственности и общественно полезным действиям. Развивая компанию, мы возвращаем пользу обществу через пожертвования, материальную поддержку и практические инициативы, отражающие заботу и долгосрочную ответственность.",
    },
    imageSrc: "/images/about/culture/love-brand.webp",
    imageAlt: {
      "zh-CN": "恒永达爱心品牌公益活动",
      en: "FOREACH charity brand activity",
      es: "Actividad solidaria de FOREACH",
      fr: "Activité solidaire de FOREACH",
      ko: "FOREACH 나눔 활동",
      ru: "Благотворительная деятельность FOREACH",
    },
    reverse: false,
  },
  {
    title: {
      "zh-CN": "健康品牌",
      en: "Health Brand",
      es: "Marca saludable",
      fr: "Marque santé",
      ko: "건강 브랜드",
      ru: "Бренд здоровья",
    },
    description: {
      "zh-CN":
        "恒永达重视员工身心健康与团队凝聚力，通过运动、文体活动和团队交流，营造积极、协作、健康的工作氛围，让团队在共同成长中保持活力。",
      en: "FOREACH values employee well-being and team cohesion. Through sports, cultural activities, and team communication, we create a positive, collaborative, and healthy working atmosphere.",
      es: "FOREACH valora el bienestar físico y mental de los empleados y la cohesión del equipo. Mediante deportes, actividades culturales y comunicación interna, creamos un ambiente de trabajo positivo, colaborativo y saludable.",
      fr: "FOREACH valorise le bien-être des employés et la cohésion d’équipe. Grâce au sport, aux activités culturelles et aux échanges internes, nous créons un environnement de travail positif, collaboratif et sain.",
      ko: "FOREACH는 직원의 심신 건강과 팀 결속력을 중시합니다. 스포츠, 문화 활동 및 팀 교류를 통해 긍정적이고 협력적이며 건강한 근무 분위기를 조성합니다.",
      ru: "FOREACH ценит благополучие сотрудников и сплоченность команды. Через спорт, культурные мероприятия и командное общение мы создаем позитивную, совместную и здоровую рабочую атмосферу.",
    },
    imageSrc: "/images/about/culture/health-brand.webp",
    imageAlt: {
      "zh-CN": "恒永达健康品牌团队活动",
      en: "FOREACH health brand team activity",
      es: "Actividad de equipo saludable de FOREACH",
      fr: "Activité d’équipe santé de FOREACH",
      ko: "FOREACH 건강 팀 활동",
      ru: "Командная активность FOREACH в сфере здоровья",
    },
    reverse: true,
  },
] satisfies Array<{
  title: LocalizedText;
  description: LocalizedText;
  imageSrc: string;
  imageAlt: LocalizedText;
  reverse: boolean;
}>;

/* ================================
   三大工程数据
================================ */
const projectItems = [
  {
    title: {
      "zh-CN": "社会爱心工程",
      en: "Social Care Initiative",
      es: "Iniciativa de apoyo social",
      fr: "Initiative de solidarité sociale",
      ko: "사회 나눔 활동",
      ru: "Социальная инициатива заботы",
    },
    description: {
      "zh-CN":
        "围绕公益捐赠、物资支持和社会责任行动，恒永达在力所能及的范围内持续传递企业温度，推动爱心文化长期落地。",
      en: "Through donations, material support, and social responsibility actions, FOREACH continues to share warmth within its capabilities and promote a long-term culture of care.",
      es: "A través de donaciones, apoyo material y acciones de responsabilidad social, FOREACH continúa transmitiendo calidez dentro de sus capacidades y promueve una cultura solidaria a largo plazo.",
      fr: "Par des dons, du soutien matériel et des actions de responsabilité sociale, FOREACH continue de transmettre de la chaleur humaine selon ses moyens et de promouvoir une culture solidaire durable.",
      ko: "기부, 물품 지원 및 사회적 책임 활동을 통해 FOREACH는 가능한 범위에서 따뜻함을 전하고 장기적인 나눔 문화를 실천합니다.",
      ru: "Через пожертвования, материальную поддержку и социальную ответственность FOREACH продолжает делиться заботой в пределах своих возможностей и развивать долгосрочную культуру помощи.",
    },
    imageSrc: "/images/about/culture/project-love.webp",
    imageAlt: {
      "zh-CN": "恒永达社会爱心工程",
      en: "FOREACH social care initiative",
      es: "Iniciativa de apoyo social de FOREACH",
      fr: "Initiative de solidarité sociale de FOREACH",
      ko: "FOREACH 사회 나눔 활동",
      ru: "Социальная инициатива заботы FOREACH",
    },
  },
  {
    title: {
      "zh-CN": "健康活力工程",
      en: "Health and Vitality Initiative",
      es: "Iniciativa de salud y vitalidad",
      fr: "Initiative santé et vitalité",
      ko: "건강 활력 활동",
      ru: "Инициатива здоровья и энергии",
    },
    description: {
      "zh-CN":
        "通过篮球活动、文体活动和团队交流，增强员工活力与团队凝聚力，营造健康、积极、协作的组织氛围。",
      en: "Through basketball, cultural activities, and team communication, we enhance employee vitality and team cohesion while creating a healthy, positive, and collaborative atmosphere.",
      es: "Mediante baloncesto, actividades culturales y comunicación de equipo, fortalecemos la vitalidad de los empleados y la cohesión del equipo, creando un ambiente saludable, positivo y colaborativo.",
      fr: "Grâce au basket-ball, aux activités culturelles et aux échanges d’équipe, nous renforçons la vitalité des employés et la cohésion du groupe, tout en créant une atmosphère saine, positive et collaborative.",
      ko: "농구 활동, 문화 체육 활동 및 팀 교류를 통해 직원의 활력과 팀 결속력을 높이고 건강하고 긍정적이며 협력적인 조직 분위기를 조성합니다.",
      ru: "Через баскетбол, культурные мероприятия и командное общение мы повышаем энергию сотрудников и сплоченность команды, создавая здоровую, позитивную и совместную атмосферу.",
    },
    imageSrc: "/images/about/culture/project-health.webp",
    imageAlt: {
      "zh-CN": "恒永达健康活力工程",
      en: "FOREACH health and vitality initiative",
      es: "Iniciativa de salud y vitalidad de FOREACH",
      fr: "Initiative santé et vitalité de FOREACH",
      ko: "FOREACH 건강 활력 활동",
      ru: "Инициатива здоровья и энергии FOREACH",
    },
  },
  {
    title: {
      "zh-CN": "恒永达文化工程",
      en: "FOREACH Culture Initiative",
      es: "Iniciativa cultural de FOREACH",
      fr: "Initiative culturelle FOREACH",
      ko: "FOREACH 문화 활동",
      ru: "Культурная инициатива FOREACH",
    },
    description: {
      "zh-CN":
        "围绕求实守信、追求卓越、成就客户的核心价值观，将文化建设融入日常管理、团队协作和工程实践之中。",
      en: "Centered on pragmatism, integrity, excellence, and customer success, we integrate culture building into daily management, teamwork, and engineering practice.",
      es: "Centrados en el pragmatismo, la integridad, la excelencia y el éxito del cliente, integramos la construcción cultural en la gestión diaria, la colaboración y la práctica de ingeniería.",
      fr: "Axés sur le pragmatisme, l’intégrité, l’excellence et la réussite client, nous intégrons la construction culturelle dans la gestion quotidienne, le travail d’équipe et la pratique d’ingénierie.",
      ko: "실용, 신뢰, 탁월함, 고객 성공을 중심으로 문화 구축을 일상 관리, 팀 협업 및 엔지니어링 실천에 녹여냅니다.",
      ru: "Опираясь на практичность, честность, стремление к совершенству и успех клиента, мы внедряем культурное развитие в ежедневное управление, командную работу и инженерную практику.",
    },
    imageSrc: "/images/about/culture/project-culture.webp",
    imageAlt: {
      "zh-CN": "恒永达文化工程",
      en: "FOREACH culture initiative",
      es: "Iniciativa cultural de FOREACH",
      fr: "Initiative culturelle FOREACH",
      ko: "FOREACH 문화 활동",
      ru: "Культурная инициатива FOREACH",
    },
  },
] satisfies Array<{
  title: LocalizedText;
  description: LocalizedText;
  imageSrc: string;
  imageAlt: LocalizedText;
}>;

/* ================================
   恒永达文化核心图标组件
   说明：
   1. vision：企业愿景
   2. values：核心价值观
   3. conduct：行为准则
   4. 所有 SVG 都使用 currentColor，方便 hover 时自动变色
================================ */
function CultureCoreIcon({ icon }: { icon: "vision" | "values" | "conduct" }) {
  if (icon === "vision") {
    return (
      <svg viewBox="0 0 1024 1024" aria-hidden="true">
        <path
          d="M397.8752 981.64224c-200.05888 0-304.87552-78.29504-323.85536-93.98784-6.8352-5.89312-9.42592-15.1808-6.36416-23.03488 2.74944-8.03328 10.07104-13.68576 19.22048-15.00672l0.45056-0.00512c38.70208-2.56 115.4048-39.20896 146.58048-54.85056l7.55712-3.7888-10.10176-7.27552c-8.04864-5.7856-15.65696-11.24864-22.02112-16.64-66.66752-54.68672-145.3056-171.54048-147.73248-321.08544-5.65248-299.7504 116.55168-386.7648 141.1072-401.16224a21.13536 21.13536 0 0 1 9.99936-2.44224c5.52448 0 11.07968 2.06848 15.6416 5.82144 7.7568 6.0672 10.0096 16.29696 5.5808 24.95488l-0.5632 1.09568v0.896c-2.29888 7.27552-7.15776 29.69088 6.30272 61.45024 16.03584 37.69856 55.17312 76.73856 113.1776 112.896l7.09632 4.42368 0.71168-8.33536c1.29024-15.13984 3.55328-35.31776 9.67168-57.21088 18.24768-64.76288 57.51808-107.58656 113.56672-123.83744a22.77376 22.77376 0 0 1 6.4-0.91136c6.10304 0 11.98592 2.3296 16.13824 6.38464 5.44768 5.3248 5.79584 13.96736 5.35552 22.50752-1.23904 43.98592 32.90624 179.59936 153.71264 228.5056l3.44064 1.39264 2.39616-2.8416c6.68672-7.92576 16.40448-17.91488 28.11392-28.88192l0.55808-0.54272c0.27136-0.21504 45.99808-37.6576 114.74944-37.6576 38.58944 0 76.8 11.91424 113.57184 35.40992 17.44896 11.37152 23.98208 24.80128 28.7488 34.60608l0.93184 1.85856c3.42016 8.16128 7.12192 16.9472 18.19648 27.77088 6.784 6.62528 8.23808 17.14176 3.53792 25.56416-4.2496 7.26016-12.07808 12.01664-19.8912 12.01664-0.82944 0-1.65888-0.05632-2.47808-0.16896a125.0816 125.0816 0 0 0-11.19744-0.52736c-23.79264 0-42.57792 7.7056-55.83872 22.89664-31.91808 35.41504-31.17568 102.23104-20.8128 148.67456 22.73792 97.408-21.75488 188.41088-22.21056 189.32224l0.06656-0.11264c-0.10752 0.19968-0.25088 0.4608-0.4096 0.78336-10.18368 20.03968-106.54208 196.6336-350.33088 224.8448-32.37376 4.1984-64.66048 6.23104-98.77504 6.23104zM286.70976 815.9744c-7.10144 3.87584-71.12704 38.47168-130.6112 59.7504l-11.38688 4.0704 10.84928 5.34528c47.43168 23.35744 128.42496 51.2 244.89984 51.2 29.88032 0 60.98432-1.86368 92.45184-5.53472 222.87872-25.49248 311.19872-193.16224 314.84928-200.28416l0.5632-1.1008v-0.32256c0.10752-0.256 0.20992-0.54784 0.29696-0.88064 8.66816-20.5568 34.3808-90.23488 18.25792-159.33952-19.52256-88.3968 2.65728-154.47552 29.92128-186.8288 16.28672-18.56512 42.66496-28.97408 61.92128-34.42176l3.72736-1.05472v-5.00736l-0.47616-1.50528c-2.64704-5.67808-2.86208-6.13888-4.51584-7.7568-7.2704-8.22272-15.19104-14.43328-23.95648-18.71872-24.83712-12.84608-50.62144-19.38944-76.53888-19.38944-48.10752 0-81.81248 22.528-88.07936 27.04384l-0.25088 0.1792-0.22528 0.20992c-4.84864 4.46976-47.54944 44.66688-53.23264 79.85152l-0.06656 0.4096v4.64896l1.7408 1.53088c29.48608 25.92768 49.79712 53.13536 62.09536 83.16416 35.64544 83.87584-4.34176 153.08288-6.06208 155.99104-2.16064 3.9168-6.11328 8.8064-13.12256 10.62912a25.13408 25.13408 0 0 1-6.79424 0.96256 21.62176 21.62176 0 0 1-10.18368-2.4576c-5.16608-2.62144-8.92416-6.9632-10.6496-12.27264-1.792-5.50912-1.2544-11.52 1.5104-16.91648l0.49664-0.96768c1.152-2.06336 29.82912-55.12192 3.6096-118.66112-27.93472-67.26656-106.66496-120.1664-234.00448-157.25056l-1.39264-0.2816-0.13824-0.13312-0.95232-0.37888C318.32064 292.28032 230.06208 225.4592 198.94784 150.88128a224.18944 224.18944 0 0 1-7.16288-21.48352l-2.8416-10.40896-6.26688 8.78592c-36.25472 50.82624-78.64832 147.32288-74.73664 318.39232 2.49856 135.8336 72.53504 240.25088 131.74784 288.39424 48.64512 38.80448 106.58816 62.94016 172.25728 71.7568l0.33792 0.04608h0.34304c0.7424 0 1.00864 0.05632 1.46944 0.1536 0.46592 0.10752 1.06496 0.23552 1.75616 0.29696 0.62464 0.13312 1.24928 0.24064 1.87392 0.34304 1.0496 0.16896 1.87392 0.3072 2.5088 0.60928l0.36352 0.1792 0.39424 0.11776c5.12 1.54112 9.4976 5.00224 12.32384 9.73824 2.9952 4.75648 3.65568 10.81344 1.92 17.17248-3.15392 8.8064-11.69408 14.97088-21.13024 14.97088-1.18272 0-2.36544-0.30208-2.70848-0.45056l-0.99328-0.44544-1.21856-0.06144h-0.73728l-0.74752-1.1008-2.28352-0.29696a414.6688 414.6688 0 0 1-114.19136-31.81056l-2.304-1.01376-2.21184 1.20832zM462.22848 123.73504C401.6384 168.39168 404.08576 263.936 404.56704 274.68288l0.13312 3.03616 2.73408 1.8176c19.67616 9.61024 40.71424 18.84672 68.21888 29.94688 62.68416 18.35008 113.44384 39.86944 155.65312 65.93536l5.4784 3.38432 2.05824-6.09792a33.31072 33.31072 0 0 1 3.79904-7.8848l3.46112-5.06368-5.59616-2.50368c-104.77056-46.80704-157.16352-153.28768-170.19904-230.25152l-1.38752-8.20224-6.69184 4.93568z"
          fill="currentColor"
        />
        <path
          d="M845.64992 307.9168c-7.13216 0-13.7472 2.48832-18.3296 7.46496a24.95488 24.95488 0 0 0-7.63904 17.90976c0 6.96832 2.54464 13.43488 7.63904 17.90976a26.1376 26.1376 0 0 0 18.3296 7.46496c14.25408 0 25.96352-11.4432 25.96352-25.37472s-11.70944-25.37472-25.96352-25.37472z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (icon === "values") {
    return (
      <svg viewBox="0 0 1024 1024" aria-hidden="true">
        <path
          d="M560.493714 894.208a68.571429 68.571429 0 0 1-96.987428 0L56.649143 489.398857A67.876571 67.876571 0 0 1 36.571429 441.124571c0-17.481143 6.692571-34.925714 20.114285-48.274285l264.338286-263.058286a68.571429 68.571429 0 0 1 97.024 0L512 223.341714l93.988571-93.549714a68.827429 68.827429 0 0 1 97.024 0l264.374858 263.094857a67.949714 67.949714 0 0 1 0 96.548572L560.493714 894.208z m110.153143-197.12l41.545143-41.325714L622.811429 566.857143l43.958857-43.739429 89.380571 88.941715 29.257143-29.110858-126.976-126.354285-8.484571 8.411428a134.582857 134.582857 0 0 1-95.195429 39.204572 134.582857 134.582857 0 0 1-95.195429-39.168l-46.701714-46.445715a67.876571 67.876571 0 0 1 0-96.548571l55.149714-54.857143-98.486857-98.011428-273.371428 271.945142L512 855.04l33.755429-33.572571-89.417143-89.014858 43.995428-43.776 89.417143 88.978286 36.973714-36.790857-89.417142-88.978286 43.958857-43.776 89.417143 89.014857h-0.036572z m257.206857-255.890286l-273.298285-272.091428-202.24 201.142857 51.2 51.017143c14.153143 14.043429 32.658286 21.065143 51.2 21.065143 18.541714 0 37.083429-6.985143 51.2-21.065143l3.986285-3.986286 53.028572-52.809143 5.705143-5.741714 171.081142 170.130286 88.210286-87.698286h-0.073143z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1024 1024" aria-hidden="true">
      <path
        d="M706.816 399.67744c0-52.65408-21.06368-105.30304-59.6736-140.40576-35.0976-35.10272-84.23936-59.6736-140.40576-59.6736-56.16128 0-105.30304 21.06368-140.40576 59.6736-35.10272 35.10272-59.6736 84.24448-59.6736 140.40576 0 56.16128 21.05856 105.30304 59.6736 140.40576 35.0976 35.09248 84.24448 59.66336 140.40576 59.66336 52.64896 0 105.30304-21.05856 140.40576-59.66336 38.60992-35.10272 59.6736-84.24448 59.6736-140.40576z m-196.57216 150.93248c-42.12224 0-77.22496-17.55136-105.30304-42.12224-28.0832-28.07808-45.63456-66.69312-45.63456-108.81024 0-42.12224 17.55136-77.22496 42.12224-105.30304 28.07808-28.0832 63.1808-42.12224 105.30304-42.12224s77.22496 17.55136 105.30304 42.12224c28.07808 28.07808 42.12224 63.1808 42.12224 105.30304s-17.55136 77.21984-42.12224 105.30304c-24.56576 28.07808-63.1808 45.62944-101.79072 45.62944z"
        fill="currentColor"
      />
      <path
        d="M938.48064 747.18208l-126.3616-200.07936c24.57088-45.62944 38.6048-98.28352 38.6048-154.4448 0-94.7712-38.6048-179.01568-98.2784-242.2016-63.18592-56.16128-147.42528-94.7712-242.2016-94.7712-94.7712 0-179.01568 38.60992-238.68928 101.79072-63.1808 59.6736-101.79072 143.91808-101.79072 238.68928 0 56.16128 14.03904 112.32256 38.60992 157.95712L82.00704 757.7088l-21.05856 35.10784 42.12224 3.5072 147.42528 7.01952 63.1808 129.87392 21.05856 35.0976 24.57088-38.6048 122.8544-196.57728h28.0832c10.53184 0 24.57088 0 35.0976-3.5072l115.83488 186.0352 24.57088 35.10272 21.06368-38.61504 66.688-129.87392 143.91296-3.51744h45.62944l-24.56064-31.57504zM341.76 866.52416l-52.65408-101.79584-7.01952-14.03904h-14.03904l-119.34208-3.51232 91.264-147.4304c3.51232 7.02464 45.04576 57.3184 77.22496 77.23008 0 0 70.22592 44.08832 108.81536 49.13664L341.76 866.52416z m168.47872-186.48576c-159.60576 0-288.98816-129.38752-288.98816-288.9984 0-159.60576 129.38752-288.99328 288.98816-288.99328 159.61088 0 288.99328 129.38752 288.99328 288.99328 0.00512 159.61088-129.3824 288.9984-288.99328 288.9984z m249.22624 60.12416h-14.03904l-7.01952 14.03904-56.1664 105.30304-84.24448-133.39136c38.61504-10.53184 73.71264-24.56576 105.30304-45.62944 31.5904-21.05856 59.6736-49.14176 84.24448-77.21984l84.23936 136.89344h-112.31744z"
        fill="currentColor"
      />
    </svg>
  );
}

export default async function AboutCulturePage() {
  const currentLocale = await getCurrentLocale();

  return (
    <main className="about-culture-page">
      {/* ================================
          Banner 区域
      ================================ */}
      <section
        className="about-culture-banner"
        aria-label={getText(pageText.bannerTitle, currentLocale)}
      >
        <div className="about-culture-container about-culture-banner-inner">
          <h1>{getText(pageText.bannerTitle, currentLocale)}</h1>
          <p>{getText(pageText.bannerDesc, currentLocale)}</p>
        </div>
      </section>

      {/* ================================
          面包屑
      ================================ */}
      <nav className="about-culture-breadcrumb" aria-label="Breadcrumb">
        <div className="about-culture-container about-culture-breadcrumb-inner">
          <Link href="/">{getText(pageText.breadcrumbHome, currentLocale)}</Link>
          <span>&gt;</span>
          <Link href="/#about">
            {getText(pageText.breadcrumbAbout, currentLocale)}
          </Link>
          <span>&gt;</span>
          <strong>{getText(pageText.sectionTitle, currentLocale)}</strong>
        </div>
      </nav>

      {/* ================================
          页面标题
      ================================ */}
      <section className="about-culture-section-title">
        <h2>{getText(pageText.sectionTitle, currentLocale)}</h2>
        <i aria-hidden="true" />
      </section>

      {/* ================================
          恒永达文化核心
      ================================ */}
      <section className="about-culture-core-section">
        <div className="about-culture-container">
          <ul className="about-culture-core-list">
            {cultureCoreItems.map((item) => (
              <li
                className="about-culture-core-item"
                key={getText(item.title, currentLocale)}
              >
                <div className="about-culture-core-icon" aria-hidden="true">
                  <CultureCoreIcon icon={item.icon} />
                </div>

                <h3>{getText(item.title, currentLocale)}</h3>
                <p>{getText(item.description, currentLocale)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================================
          组织文化横幅
      ================================ */}
      <section
        className="about-culture-organization-hero"
        aria-label={getText(pageText.organizationTitle, currentLocale)}
      >
        <div className="about-culture-organization-content">
          <h2>{getText(pageText.organizationTitle, currentLocale)}</h2>
          <p>{getText(pageText.organizationDesc, currentLocale)}</p>
        </div>
      </section>

      {/* ================================
          爱心品牌 / 健康品牌
      ================================ */}
      <section className="about-culture-brand-section">
        <div className="about-culture-container about-culture-brand-layout">
          {brandActionItems.map((item) => (
            <article
              className={
                item.reverse
                  ? "about-culture-brand-row about-culture-brand-row-reverse"
                  : "about-culture-brand-row"
              }
              key={getText(item.title, currentLocale)}
            >
              <div className="about-culture-brand-text">
                <h3>{getText(item.title, currentLocale)}</h3>
                <p>{getText(item.description, currentLocale)}</p>
              </div>

              <div className="about-culture-brand-image">
                <Image
                  src={item.imageSrc}
                  alt={getText(item.imageAlt, currentLocale)}
                  width={900}
                  height={520}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ================================
          三大工程
      ================================ */}
      <section className="about-culture-project-section">
        <div className="about-culture-container">
          <div className="about-culture-project-title">
            <h2>{getText(pageText.projectMainTitle, currentLocale)}</h2>
            <i aria-hidden="true" />
            <p>{getText(pageText.projectMainDesc, currentLocale)}</p>
          </div>

          <div className="about-culture-project-list">
            {projectItems.map((item) => (
              <article
                className="about-culture-project-card"
                key={getText(item.title, currentLocale)}
              >
                <div className="about-culture-project-image">
                  <Image
                    src={item.imageSrc}
                    alt={getText(item.imageAlt, currentLocale)}
                    width={680}
                    height={420}
                    sizes="(max-width: 900px) 100vw, 33vw"
                  />
                </div>

                <div className="about-culture-project-content">
                  <h3>{getText(item.title, currentLocale)}</h3>
                  <p>{getText(item.description, currentLocale)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}