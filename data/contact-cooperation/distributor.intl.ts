/* =========================================================
   data/contact-cooperation/distributor.intl.ts
   经销商合作页面｜非中文多语言数据

   说明：
   1. 这个文件只负责经销商合作页面的文案与数据
   2. 页面结构不要写在这里
   3. 中文站不使用经销商页面，所以这里不放 zh-CN
   4. 当前支持：en / es / fr / ko / ru
   5. 页面组件：components/contact/DistributorPageContent.tsx
========================================================= */

/* =========================================================
   01. 语言类型
========================================================= */

export type DistributorLocale = "en" | "es" | "fr" | "ko" | "ru";

/* =========================================================
   02. 通用类型
========================================================= */

export type DistributorSimpleCard = {
  index: string;
  title: string;
  desc: string;
};

export type DistributorProductItem = {
  title: string;
  desc: string;
  tags: string[];
  image: string;
};

export type DistributorFormOption = {
  label: string;
  value: string;
};

export type DistributorPageData = {
  hero: {
    titlePrefix: string;
    titleBrand: string;
    titleSuffix: string;
    titleSecondLine: string;
    desc: string;
    primaryButton: string;
    secondaryButton: string;
  };

  advantagesHead: {
    title: string;
    desc: string;
  };

  advantages: DistributorSimpleCard[];

  productsHead: {
    title: string;
    desc: string;
  };

  products: DistributorProductItem[];

  partnersHead: {
    title: string;
    desc: string;
  };

  partners: DistributorSimpleCard[];

  processHead: {
    title: string;
    desc: string;
  };

  process: DistributorSimpleCard[];

  guide: {
    title: string;
    desc: string;
    items: DistributorSimpleCard[];
  };

  form: {
    title: string;

    companyName: string;
    companyNamePlaceholder: string;

    country: string;
    countryPlaceholder: string;

    contactName: string;
    contactNamePlaceholder: string;

    phone: string;
    phonePlaceholder: string;

    emailVerification: string;
    emailPlaceholder: string;
    sendCode: string;
    codePlaceholder: string;
    verify: string;
    verified: string;
    emailTipDefault: string;
    emailTipVerified: string;

    website: string;
    websitePlaceholder: string;

    industry: string;
    industryPlaceholder: string;

    productInterest: string;
    productInterestPlaceholder: string;

    requirement: string;
    requirementPlaceholder: string;

    uploadTip: string;
    uploadButton: string;
    submitButton: string;

    options: DistributorFormOption[];
  };

  toast: {
    invalidEmail: string;
    codeSent: string;
    wrongCode: string;
    emailVerified: string;
    fileTooLarge: string;
    needVerifyEmail: string;
    submitted: string;
  };

  bottomCta: {
    title: string;
    desc: string;
    button: string;
  };
};

/* =========================================================
   03. 产品图片路径
   实际文件放置位置：
   public/images/contact-cooperation/distributor-products/
========================================================= */

const distributorProductImages = {
  pump: "/images/contact-cooperation/distributor-products/01-pump-series.webp",
  valve: "/images/contact-cooperation/distributor-products/02-valve-series.webp",
  control: "/images/contact-cooperation/distributor-products/03-control-module.webp",
  fitting: "/images/contact-cooperation/distributor-products/04-fitting-series.webp",
  tubing: "/images/contact-cooperation/distributor-products/05-tubing-series.webp",
  needle: "/images/contact-cooperation/distributor-products/06-needle-series.webp",
};

/* =========================================================
   04. 英文数据
========================================================= */

const en: DistributorPageData = {
  hero: {
    titlePrefix: "Become a",
    titleBrand: "FOREACH",
    titleSuffix: "Distributor",
    titleSecondLine: "",
    desc: "Build a long-term partnership with FOREACH and expand local opportunities in microfluidic core components and fluidic system solutions for IVD, life sciences, analytical instruments, synthetic biology, and laboratory automation.",
    primaryButton: "Apply for Partnership",
    secondaryButton: "View Products",
  },

  advantagesHead: {
    title: "Support local customers with a complete microfluidic product portfolio.",
    desc: "FOREACH supports partners through a broad product matrix, technical documents, selection support, sample coordination, and project communication.",
  },

  advantages: [
    {
      index: "01",
      title: "Complete Product Portfolio",
      desc: "Covers pumps, valves, intelligent control modules, fittings, tubing, needles, and key fluidic system components.",
    },
    {
      index: "02",
      title: "Documentation & Certification",
      desc: "Product catalogs, specifications, drawings, quality certificates, and company qualification materials support customer introduction and supplier evaluation.",
    },
    {
      index: "03",
      title: "Selection & Sample Support",
      desc: "We support product selection and sample validation based on media, flow rate, pressure, interfaces, lifetime, and installation space.",
    },
    {
      index: "04",
      title: "Project Introduction Support",
      desc: "We help partners follow up on replacement evaluation, sample validation, technical communication, and project-stage development.",
    },
  ],

  productsHead: {
    title: "Core product categories for distributor cooperation.",
    desc: "For IVD, life sciences, analytical instruments, synthetic biology, and laboratory automation, FOREACH provides pumps, valves, intelligent control modules, fittings, tubing, and needle products.",
  },

  products: [
    {
      title: "Pump Series",
      desc: "For precision metering, continuous transfer, reagent dispensing, sample handling, and high-pressure fluidic applications.",
      tags: ["Piston Pump", "Valveless Pump", "Diaphragm Pump", "Pipetting Pump", "Syringe Pump", "High-pressure Pump"],
      image: distributorProductImages.pump,
    },
    {
      title: "Valve Series",
      desc: "For fluid on/off control, flow-path switching, multi-channel distribution, and high-pressure fluid control.",
      tags: ["Solenoid Valve", "Rotary Valve", "High-pressure Valve"],
      image: distributorProductImages.valve,
    },
    {
      title: "Intelligent Control Modules",
      desc: "For fluidic status monitoring, pressure feedback, bubble detection, and signal sensing in system control.",
      tags: ["Pressure Sensor", "Bubble Sensor"],
      image: distributorProductImages.control,
    },
    {
      title: "Fitting Series",
      desc: "For reliable connection, sealing adaptation, and quick assembly between tubing, interfaces, and instrument modules.",
      tags: ["Rigid Tubing Fitting", "Barbed Connector", "Quick Connector", "Luer Fitting", "Thread Adapter"],
      image: distributorProductImages.fitting,
    },
    {
      title: "Tubing Series",
      desc: "Multiple tubing materials are available, with customized tubing assemblies and complete fluidic tubing sets based on drawings, interfaces, lengths, and system layout.",
      tags: ["PVC", "FEP", "TPU", "PTFE", "FPA", "Custom Tubing Assembly", "Fluidic Tubing Set"],
      image: distributorProductImages.tubing,
    },
    {
      title: "Needle Series",
      desc: "For automatic sampling, piercing, washing, stirring, and fluid transfer in automated fluidic systems.",
      tags: ["Sampling Needle", "Piercing Needle", "Stirring Paddle", "Wash Needle"],
      image: distributorProductImages.needle,
    },
  ],

  partnersHead: {
    title: "We welcome partners with local customer resources and technical communication capabilities.",
    desc: "If your company has channel resources, project follow-up capabilities, technical sales experience, or local service support, FOREACH looks forward to building a stable long-term partnership with you.",
  },

  partners: [
    {
      index: "01",
      title: "Instrument Distributors",
      desc: "Serving customers in IVD, life science instruments, laboratory automation, or high-end testing equipment.",
    },
    {
      index: "02",
      title: "Fluid Control Product Distributors",
      desc: "With sales channels related to pumps, valves, tubing, fittings, sensors, and fluid control products.",
    },
    {
      index: "03",
      title: "Automation System Integrators",
      desc: "Providing fluidic systems, sample handling, reagent dispensing, and modular solutions for end customers.",
    },
    {
      index: "04",
      title: "Local Technical Service Partners",
      desc: "Supporting local project follow-up, customer communication, installation assistance, and after-sales service.",
    },
  ],

  processHead: {
    title: "From initial communication to project cooperation.",
    desc: "We aim to make the cooperation process clear, traceable, and practical. After submission, FOREACH will gradually confirm the suitable cooperation method and support scope based on market region, customer type, product direction, and project needs.",
  },

  process: [
    {
      index: "01",
      title: "Submit Partnership Interest",
      desc: "Provide company background, target market, interested products, and cooperation needs so we can understand the direction.",
    },
    {
      index: "02",
      title: "Partnership Matching",
      desc: "Evaluate cooperation fit based on regional market, customer resources, existing product lines, and service capabilities.",
    },
    {
      index: "03",
      title: "Product & Technical Communication",
      desc: "Communicate product documents, selection suggestions, certification information, and technical questions.",
    },
    {
      index: "04",
      title: "Samples & Project Follow-up",
      desc: "Promote sample validation, feedback follow-up, and project introduction according to customer applications and test needs.",
    },
  ],

  guide: {
    title: "Filling Guide",
    desc: "Please provide the following information so we can quickly evaluate cooperation opportunities, product directions, and support methods.",
    items: [
      {
        index: "01",
        title: "Target Market",
        desc: "Country or region, local industry direction, customer type, and key application areas.",
      },
      {
        index: "02",
        title: "Company Background",
        desc: "Existing product lines, channel resources, technical sales capability, and local service resources.",
      },
      {
        index: "03",
        title: "Interested Products",
        desc: "Pumps, valves, intelligent control modules, fittings, tubing, needles, or system-level fluidic solutions.",
      },
      {
        index: "04",
        title: "Cooperation Needs",
        desc: "Product documents, sample support, technical communication, project support, or market development assistance.",
      },
    ],
  },

  form: {
    title: "Partnership Application Form",

    companyName: "Company Name",
    companyNamePlaceholder: "Enter company name",

    country: "Country / Region",
    countryPlaceholder: "e.g. United States",

    contactName: "Contact Person",
    contactNamePlaceholder: "Enter contact name",

    phone: "Phone / WhatsApp",
    phonePlaceholder: "Optional, for faster communication",

    emailVerification: "Email Verification",
    emailPlaceholder: "Enter business email",
    sendCode: "Send Code",
    codePlaceholder: "Code",
    verify: "Verify",
    verified: "Verified",
    emailTipDefault: "Email verification is required before submission.",
    emailTipVerified: "Email verified.",

    website: "Company Website",
    websitePlaceholder: "https://",

    industry: "Main Industry",
    industryPlaceholder: "Select industry",

    productInterest: "Interested FOREACH Products",
    productInterestPlaceholder: "e.g. Piston pump, solenoid valve, quick connector, custom tubing assembly",

    requirement: "Cooperation Background / Project Needs",
    requirementPlaceholder: "Please briefly describe your local market, customer industry, existing projects, current needs, or support expected from FOREACH.",

    uploadTip: "Company profile, product list, BOM files, images, and project documents are supported. Each file should not exceed 20 MB.",
    uploadButton: "Upload Files",
    submitButton: "Submit Partnership Interest",

    options: [
      { label: "IVD", value: "ivd" },
      { label: "Life Sciences", value: "life-science" },
      { label: "Analytical Instruments", value: "analytical-instrument" },
      { label: "Synthetic Biology", value: "synthetic-biology" },
      { label: "Laboratory Automation", value: "lab-automation" },
      { label: "Other", value: "other" },
    ],
  },

  toast: {
    invalidEmail: "Please enter a valid email address.",
    codeSent: "Verification code sent. Test code: ",
    wrongCode: "Incorrect verification code.",
    emailVerified: "Email verified.",
    fileTooLarge: "exceeds 20 MB.",
    needVerifyEmail: "Please verify your email before submission.",
    submitted:
  "We have received your partnership application. The FOREACH team will review your information and follow up based on your market region, product interest, and cooperation needs.",
  },

  bottomCta: {
    title: "Looking for a long-term microfluidic partner?",
    desc: "Work with FOREACH to bring product portfolios, technical documents, selection support, and project introduction capabilities to more local customers.",
    button: "Apply Now",
  },
};

/* =========================================================
   05. 西班牙语数据
========================================================= */

const es: DistributorPageData = {
  ...en,

  hero: {
    titlePrefix: "Conviértase en distribuidor de",
    titleBrand: "FOREACH",
    titleSuffix: "",
    titleSecondLine: "",
    desc: "Establezca una cooperación a largo plazo con FOREACH y amplíe las oportunidades locales en componentes microfluídicos clave y soluciones de sistemas fluídicos para IVD, ciencias de la vida, instrumentos analíticos, biología sintética y automatización de laboratorio.",
    primaryButton: "Solicitar cooperación",
    secondaryButton: "Ver productos",
  },

  advantagesHead: {
    title: "Apoye a sus clientes locales con una cartera completa de productos microfluídicos.",
    desc: "FOREACH apoya a sus socios mediante una amplia matriz de productos, documentación técnica, soporte de selección, coordinación de muestras y comunicación de proyectos.",
  },

  productsHead: {
    title: "Categorías principales de productos para la cooperación con distribuidores.",
    desc: "Para IVD, ciencias de la vida, instrumentos analíticos, biología sintética y automatización de laboratorio, FOREACH ofrece bombas, válvulas, módulos de control inteligente, conexiones, tubos y productos de aguja.",
  },

  partnersHead: {
    title: "Damos la bienvenida a socios con recursos locales de clientes y capacidad de comunicación técnica.",
    desc: "Si su empresa cuenta con canales, capacidad de seguimiento de proyectos, experiencia en ventas técnicas o soporte de servicio local, FOREACH espera construir una cooperación estable y a largo plazo con usted.",
  },

  processHead: {
    title: "Desde la comunicación inicial hasta la cooperación del proyecto.",
    desc: "Buscamos que el proceso de cooperación sea claro, trazable y práctico. Después del envío, FOREACH confirmará gradualmente el método de cooperación y el alcance de soporte adecuados.",
  },

  guide: {
    ...en.guide,
    title: "Guía de llenado",
    desc: "Proporcione la siguiente información para que podamos evaluar rápidamente las oportunidades de cooperación, las líneas de productos y los métodos de soporte.",
  },

  form: {
    ...en.form,
    title: "Formulario de solicitud de cooperación",
    companyName: "Nombre de la empresa",
    companyNamePlaceholder: "Ingrese el nombre de la empresa",
    country: "País / Región",
    countryPlaceholder: "Ej.: Estados Unidos",
    contactName: "Persona de contacto",
    contactNamePlaceholder: "Ingrese el nombre del contacto",
    phone: "Teléfono / WhatsApp",
    phonePlaceholder: "Opcional, para una comunicación más rápida",
    emailVerification: "Verificación de correo electrónico",
    emailPlaceholder: "Ingrese el correo electrónico comercial",
    sendCode: "Enviar código",
    codePlaceholder: "Código",
    verify: "Verificar",
    verified: "Verificado",
    emailTipDefault: "Se requiere verificación de correo electrónico antes del envío.",
    emailTipVerified: "Correo electrónico verificado.",
    website: "Sitio web de la empresa",
    industry: "Industria principal",
    industryPlaceholder: "Seleccione industria",
    productInterest: "Productos FOREACH de interés",
    requirement: "Antecedentes de cooperación / Necesidades del proyecto",
    uploadButton: "Subir archivos",
    submitButton: "Enviar solicitud",
  },

  toast: {
    invalidEmail: "Ingrese una dirección de correo electrónico válida.",
    codeSent: "Código de verificación enviado. Código de prueba: ",
    wrongCode: "Código de verificación incorrecto.",
    emailVerified: "Correo electrónico verificado.",
    fileTooLarge: "supera los 20 MB.",
    needVerifyEmail: "Verifique su correo electrónico antes de enviar.",
    submitted: "Solicitud enviada. Esta es una interacción de vista previa.",
  },

  bottomCta: {
    title: "¿Busca un socio microfluídico estable a largo plazo?",
    desc: "Coopere con FOREACH para llevar carteras de productos, documentación técnica, soporte de selección y capacidades de introducción de proyectos a más clientes locales.",
    button: "Solicitar ahora",
  },
};

/* =========================================================
   06. 法语数据
========================================================= */

const fr: DistributorPageData = {
  ...en,

  hero: {
    titlePrefix: "Devenez distributeur",
    titleBrand: "FOREACH",
    titleSuffix: "",
    titleSecondLine: "",
    desc: "Construisez un partenariat à long terme avec FOREACH et développez les opportunités locales dans les composants microfluidiques essentiels et les solutions de systèmes fluidiques pour l’IVD, les sciences de la vie, les instruments analytiques, la biologie synthétique et l’automatisation de laboratoire.",
    primaryButton: "Demander un partenariat",
    secondaryButton: "Voir les produits",
  },

  advantagesHead: {
    title: "Soutenez vos clients locaux avec une gamme complète de produits microfluidiques.",
    desc: "FOREACH accompagne ses partenaires avec une large matrice de produits, des documents techniques, un support de sélection, une coordination des échantillons et une communication de projet.",
  },

  productsHead: {
    title: "Catégories principales de produits pour la coopération avec les distributeurs.",
    desc: "Pour l’IVD, les sciences de la vie, les instruments analytiques, la biologie synthétique et l’automatisation de laboratoire, FOREACH fournit des pompes, vannes, modules de contrôle intelligents, raccords, tubes et aiguilles.",
  },

  partnersHead: {
    title: "Nous accueillons les partenaires disposant de ressources clients locales et de capacités de communication technique.",
    desc: "Si votre entreprise dispose de canaux, de capacités de suivi de projet, d’une expérience en vente technique ou d’un support de service local, FOREACH souhaite établir un partenariat stable et durable avec vous.",
  },

  processHead: {
    title: "De la communication initiale à la coopération de projet.",
    desc: "Nous souhaitons rendre le processus de coopération clair, traçable et concret. Après la soumission, FOREACH confirmera progressivement la méthode de coopération et le périmètre de support adaptés.",
  },

  guide: {
    ...en.guide,
    title: "Guide de remplissage",
    desc: "Veuillez fournir les informations suivantes afin que nous puissions évaluer rapidement les opportunités de coopération, les orientations produits et les méthodes de support.",
  },

  form: {
    ...en.form,
    title: "Formulaire de demande de partenariat",
    companyName: "Nom de l’entreprise",
    companyNamePlaceholder: "Saisissez le nom de l’entreprise",
    country: "Pays / Région",
    countryPlaceholder: "Ex. : États-Unis",
    contactName: "Contact",
    contactNamePlaceholder: "Saisissez le nom du contact",
    phone: "Téléphone / WhatsApp",
    phonePlaceholder: "Optionnel, pour une communication plus rapide",
    emailVerification: "Vérification de l’e-mail",
    emailPlaceholder: "Saisissez l’e-mail professionnel",
    sendCode: "Envoyer le code",
    codePlaceholder: "Code",
    verify: "Vérifier",
    verified: "Vérifié",
    emailTipDefault: "La vérification de l’e-mail est requise avant l’envoi.",
    emailTipVerified: "E-mail vérifié.",
    website: "Site web de l’entreprise",
    industry: "Secteur principal",
    industryPlaceholder: "Sélectionnez le secteur",
    productInterest: "Produits FOREACH d’intérêt",
    requirement: "Contexte de coopération / Besoins du projet",
    uploadButton: "Téléverser des fichiers",
    submitButton: "Soumettre la demande",
  },

  toast: {
    invalidEmail: "Veuillez saisir une adresse e-mail valide.",
    codeSent: "Code de vérification envoyé. Code de test : ",
    wrongCode: "Code de vérification incorrect.",
    emailVerified: "E-mail vérifié.",
    fileTooLarge: "dépasse 20 Mo.",
    needVerifyEmail: "Veuillez vérifier votre e-mail avant l’envoi.",
    submitted: "Demande soumise. Ceci est une interaction de prévisualisation.",
  },

  bottomCta: {
    title: "Vous recherchez un partenaire microfluidique stable à long terme ?",
    desc: "Collaborez avec FOREACH pour apporter des gammes de produits, des documents techniques, un support de sélection et des capacités d’introduction de projet à davantage de clients locaux.",
    button: "Demander maintenant",
  },
};

/* =========================================================
   07. 韩语数据
========================================================= */

const ko: DistributorPageData = {
  ...en,

  hero: {
    titlePrefix: "FOREACH",
    titleBrand: "",
    titleSuffix: "공식 유통 파트너가 되세요",
    titleSecondLine: "",
    desc: "FOREACH와 장기적인 파트너십을 구축하고 IVD, 생명과학, 분석기기, 합성생물학 및 실험실 자동화 분야에서 마이크로플루이딕 핵심 부품과 유체 시스템 솔루션의 현지 시장 기회를 확대하십시오.",
    primaryButton: "파트너십 신청",
    secondaryButton: "제품 보기",
  },

  advantagesHead: {
    title: "완전한 마이크로플루이딕 제품 포트폴리오로 현지 고객을 지원합니다.",
    desc: "FOREACH는 폭넓은 제품 라인업, 기술 문서, 제품 선정 지원, 샘플 조율 및 프로젝트 커뮤니케이션을 통해 파트너를 지원합니다.",
  },

  productsHead: {
    title: "유통 파트너 협력에 적합한 핵심 제품군.",
    desc: "FOREACH는 IVD, 생명과학, 분석기기, 합성생물학 및 실험실 자동화 분야를 위해 펌프, 밸브, 지능형 제어 모듈, 피팅, 튜빙 및 니들 제품을 제공합니다.",
  },

  partnersHead: {
    title: "현지 고객 자원과 기술 커뮤니케이션 역량을 갖춘 파트너를 환영합니다.",
    desc: "채널 자원, 프로젝트 후속 대응 능력, 기술 영업 경험 또는 현지 서비스 지원 역량을 보유한 기업과 장기적이고 안정적인 협력 관계를 구축하길 기대합니다.",
  },

  processHead: {
    title: "초기 상담부터 프로젝트 협력까지.",
    desc: "협력 절차를 명확하고 추적 가능하며 실행 가능하게 만들고자 합니다. 제출 후 FOREACH는 시장 지역, 고객 유형, 제품 방향 및 프로젝트 요구에 따라 적합한 협력 방식과 지원 범위를 확인합니다.",
  },

  guide: {
    ...en.guide,
    title: "작성 안내",
    desc: "협력 기회, 제품 방향 및 지원 방식을 빠르게 평가할 수 있도록 다음 정보를 입력해 주세요.",
  },

  form: {
    ...en.form,
    title: "파트너십 신청서",
    companyName: "회사명",
    companyNamePlaceholder: "회사명을 입력하세요",
    country: "국가 / 지역",
    countryPlaceholder: "예: United States",
    contactName: "담당자",
    contactNamePlaceholder: "담당자 이름을 입력하세요",
    phone: "전화 / WhatsApp",
    phonePlaceholder: "빠른 연락을 위한 선택 입력",
    emailVerification: "이메일 인증",
    emailPlaceholder: "업무용 이메일을 입력하세요",
    sendCode: "코드 전송",
    codePlaceholder: "인증 코드",
    verify: "인증",
    verified: "인증 완료",
    emailTipDefault: "제출 전 이메일 인증이 필요합니다.",
    emailTipVerified: "이메일 인증이 완료되었습니다.",
    website: "회사 웹사이트",
    industry: "주요 산업",
    industryPlaceholder: "산업을 선택하세요",
    productInterest: "관심 있는 FOREACH 제품",
    requirement: "협력 배경 / 프로젝트 요구",
    uploadButton: "파일 업로드",
    submitButton: "파트너십 신청 제출",
  },

  toast: {
    invalidEmail: "유효한 이메일 주소를 입력하세요.",
    codeSent: "인증 코드가 전송되었습니다. 테스트 코드: ",
    wrongCode: "인증 코드가 올바르지 않습니다.",
    emailVerified: "이메일 인증이 완료되었습니다.",
    fileTooLarge: "20MB를 초과합니다.",
    needVerifyEmail: "제출 전 이메일 인증을 완료하세요.",
    submitted: "파트너십 신청이 제출되었습니다. 현재는 미리보기 동작입니다.",
  },

  bottomCta: {
    title: "장기적으로 안정적인 마이크로플루이딕 파트너를 찾고 계신가요?",
    desc: "FOREACH와 협력하여 제품 포트폴리오, 기술 문서, 선정 지원 및 프로젝트 도입 역량을 더 많은 현지 고객에게 제공하십시오.",
    button: "지금 신청",
  },
};

/* =========================================================
   08. 俄语数据
========================================================= */

const ru: DistributorPageData = {
  ...en,

  hero: {
    titlePrefix: "Станьте дистрибьютором",
    titleBrand: "FOREACH",
    titleSuffix: "",
    titleSecondLine: "",
    desc: "Постройте долгосрочное партнерство с FOREACH и развивайте локальные возможности в области ключевых микрофлюидных компонентов и решений жидкостных систем для IVD, наук о жизни, аналитических приборов, синтетической биологии и лабораторной автоматизации.",
    primaryButton: "Подать заявку",
    secondaryButton: "Посмотреть продукты",
  },

  advantagesHead: {
    title: "Поддерживайте локальных клиентов с помощью полного портфеля микрофлюидных продуктов.",
    desc: "FOREACH поддерживает партнеров широкой продуктовой матрицей, технической документацией, помощью в подборе, координацией образцов и проектной коммуникацией.",
  },

  productsHead: {
    title: "Основные продуктовые направления для сотрудничества с дистрибьюторами.",
    desc: "Для IVD, наук о жизни, аналитических приборов, синтетической биологии и лабораторной автоматизации FOREACH предлагает насосы, клапаны, интеллектуальные модули управления, фитинги, трубки и иглы.",
  },

  partnersHead: {
    title: "Мы приветствуем партнеров с локальными клиентскими ресурсами и технической коммуникационной компетенцией.",
    desc: "Если у вашей компании есть каналы продаж, опыт сопровождения проектов, технические продажи или локальная сервисная поддержка, FOREACH готова выстроить с вами стабильное долгосрочное партнерство.",
  },

  processHead: {
    title: "От первичного общения до проектного сотрудничества.",
    desc: "Мы стремимся сделать процесс сотрудничества понятным, отслеживаемым и практичным. После отправки заявки FOREACH постепенно подтвердит подходящий формат сотрудничества и объем поддержки.",
  },

  guide: {
    ...en.guide,
    title: "Рекомендации по заполнению",
    desc: "Пожалуйста, предоставьте следующую информацию, чтобы мы могли быстро оценить возможности сотрудничества, продуктовые направления и формат поддержки.",
  },

  form: {
    ...en.form,
    title: "Форма заявки на партнерство",
    companyName: "Название компании",
    companyNamePlaceholder: "Введите название компании",
    country: "Страна / Регион",
    countryPlaceholder: "Например: США",
    contactName: "Контактное лицо",
    contactNamePlaceholder: "Введите имя контактного лица",
    phone: "Телефон / WhatsApp",
    phonePlaceholder: "Необязательно, для более быстрой связи",
    emailVerification: "Подтверждение e-mail",
    emailPlaceholder: "Введите рабочий e-mail",
    sendCode: "Отправить код",
    codePlaceholder: "Код",
    verify: "Проверить",
    verified: "Подтверждено",
    emailTipDefault: "Перед отправкой требуется подтверждение e-mail.",
    emailTipVerified: "E-mail подтвержден.",
    website: "Сайт компании",
    industry: "Основная отрасль",
    industryPlaceholder: "Выберите отрасль",
    productInterest: "Интересующие продукты FOREACH",
    requirement: "Контекст сотрудничества / Потребности проекта",
    uploadButton: "Загрузить файлы",
    submitButton: "Отправить заявку",
  },

  toast: {
    invalidEmail: "Введите корректный адрес e-mail.",
    codeSent: "Код подтверждения отправлен. Тестовый код: ",
    wrongCode: "Неверный код подтверждения.",
    emailVerified: "E-mail подтвержден.",
    fileTooLarge: "превышает 20 МБ.",
    needVerifyEmail: "Пожалуйста, подтвердите e-mail перед отправкой.",
    submitted: "Заявка отправлена. Это предварительное взаимодействие.",
  },

  bottomCta: {
    title: "Ищете долгосрочного и стабильного партнера в области микрофлюидики?",
    desc: "Сотрудничайте с FOREACH, чтобы предоставить локальным клиентам продуктовые портфели, техническую документацию, поддержку подбора и возможности внедрения проектов.",
    button: "Подать заявку",
  },
};

/* =========================================================
   09. 数据集合
========================================================= */

export const distributorIntlData: Record<DistributorLocale, DistributorPageData> = {
  en,
  es,
  fr,
  ko,
  ru,
};

/* =========================================================
   10. 语言标准化
========================================================= */

export function normalizeDistributorLocale(locale?: string): DistributorLocale {
  if (locale === "es") return "es";
  if (locale === "fr") return "fr";
  if (locale === "ko") return "ko";
  if (locale === "ru") return "ru";

  return "en";
}

/* =========================================================
   11. 获取当前语言数据
========================================================= */

export function getDistributorPageData(locale?: string): DistributorPageData {
  const normalizedLocale = normalizeDistributorLocale(locale);

  return distributorIntlData[normalizedLocale] || distributorIntlData.en;
} 