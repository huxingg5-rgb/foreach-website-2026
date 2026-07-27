/* =========================================================
   data/about-culture.ts
   恒永达官网｜关于我们 / 恒永达文化页面数据

   作用：
   1. 统一管理企业文化页面 6 种语言文案
   2. 页面结构后续统一放到 components/about/CulturePageContent.tsx
   3. 中文页面 /about/culture 和多语言页面 /en/about/culture 等共用这份数据
   4. 后期接后台时，可以把这里的数据替换成接口返回数据
========================================================= */

/* ================================
   1. 页面支持语言
================================ */

export const aboutCultureLocales = [
  "zh-CN",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

export type AboutCultureLocale = (typeof aboutCultureLocales)[number];

export type LocalizedCultureText = Record<AboutCultureLocale, string>;

/* ================================
   2. 页面数据类型
================================ */

export type CultureCoreItem = {
  icon: "vision" | "values" | "conduct";
  title: LocalizedCultureText;
  description: LocalizedCultureText;
};

export type CultureBrandActionItem = {
  title: LocalizedCultureText;
  description: LocalizedCultureText;
  imageSrc: string;
  imageAlt: LocalizedCultureText;
  reverse: boolean;
};

export type CultureProjectItem = {
  title: LocalizedCultureText;
  description: LocalizedCultureText;
  imageSrc: string;
  imageAlt: LocalizedCultureText;
};

export type AboutCulturePageText = {
  metadataTitle: string;
  metadataDescription: string;

  bannerTitle: LocalizedCultureText;
  bannerDesc: LocalizedCultureText;

  breadcrumbHome: LocalizedCultureText;
  breadcrumbAbout: LocalizedCultureText;

  sectionTitle: LocalizedCultureText;

  organizationTitle: LocalizedCultureText;
  organizationDesc: LocalizedCultureText;

  projectMainTitle: LocalizedCultureText;
  projectMainDesc: LocalizedCultureText;
};

/* ================================
   3. 多语言页面链接
================================ */

export const aboutCultureLinks: Record<AboutCultureLocale, string> = {
  "zh-CN": "/about/culture",
  en: "/en/about/culture",
  es: "/es/about/culture",
  fr: "/fr/about/culture",
  ko: "/ko/about/culture",
  ru: "/ru/about/culture",
};

/* ================================
   4. 判断是否为企业文化页面支持语言
================================ */

export function isAboutCultureLocale(
  locale: string
): locale is AboutCultureLocale {
  return aboutCultureLocales.includes(locale as AboutCultureLocale);
}

/* ================================
   5. 根据当前语言读取文案
================================ */

export function getCultureText(
  text: LocalizedCultureText,
  locale: AboutCultureLocale
) {
  return text[locale] || text["zh-CN"];
}

/* ================================
   6. 页面通用文案
================================ */

export const aboutCulturePageText: AboutCulturePageText = {
  metadataTitle: "恒永达文化｜恒永达 FOREACH",
  metadataDescription:
    "了解恒永达文化、企业愿景、核心价值观、行为准则、爱心品牌、健康品牌与三大工程。",

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
};

/* ================================
   7. 恒永达文化核心数据
================================ */

export const cultureCoreItems: CultureCoreItem[] = [
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
      "zh-CN": "成为微流体领域的领航者",
      en: "To become a leader in the field of microfluidics",
      es: "Convertirse en un líder en el campo de la microfluídica",
      fr: "Devenir un leader dans le domaine de la microfluidique",
      ko: "미세유체 분야의 선도 기업이 되는 것",
      ru: "Стать лидером в области микрофлюидики",
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
      "zh-CN": "专注、原创、可靠、卓越、积极、合作、诚信",
      en: "Focus, Original, Reliable, Excellence, Active, Cooperation, Honesty",
      es: "Enfoque, originalidad, confiabilidad, excelencia, proactividad, cooperación y honestidad",
      fr: "Concentration, originalité, fiabilité, excellence, proactivité, coopération et honnêteté",
      ko: "집중, 독창성, 신뢰성, 탁월함, 적극성, 협력, 정직",
      ru: "Сосредоточенность, оригинальность, надежность, совершенство, активность, сотрудничество и честность",
    },
  },
];

/* ================================
   8. 爱心品牌 / 健康品牌数据
================================ */

export const brandActionItems: CultureBrandActionItem[] = [
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
];

/* ================================
   9. 三大工程数据
================================ */

export const cultureProjectItems: CultureProjectItem[] = [
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
];    