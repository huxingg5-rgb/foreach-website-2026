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

import { getValvelessPumpNames } from "../products/detail/valveless-pump-names";

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
    sendTooFrequently: string;
    codeSendFailed: string;
    codeExpired: string;
    codeVerifyFailed: string;
    verificationExpired: string;
    submitFailed: string;
    pdfPreviewBlocked: string;
    sending: string;
    verifying: string;
    submitting: string;
    secondsSuffix: string;
    submittedTitle: string;
    dismissSuccess: string;
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
    titleBrand: "Foreach Technology",
    titleSuffix: "Distributor",
    titleSecondLine: "",
    desc: "Build a long-term partnership with Foreach and expand local opportunities in microfluidic core components and fluidic system solutions for IVD, life sciences, analytical instruments, synthetic biology, and laboratory automation.",
  },

  advantagesHead: {
    title: "Support local customers with a complete microfluidic product portfolio.",
    desc: "Foreach supports partners through a broad product matrix, technical documents, selection support, sample coordination, and project communication.",
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
    desc: "For IVD, life sciences, analytical instruments, synthetic biology, and laboratory automation, Foreach provides pumps, valves, intelligent control modules, fittings, tubing, and needle products.",
  },

  products: [
    {
      title: "Pump Series",
      desc: "For precision metering, continuous transfer, reagent dispensing, sample handling, and high-pressure fluidic applications.",
      tags: ["Piston Pump", getValvelessPumpNames("en").categoryName, "Diaphragm Pump", "Pipetting Pump", "Syringe Pump", "High-pressure Pump"],
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
      tags: ["PVC", "FEP", "TPU", "PTFE", "PFA", "Custom Tubing Assembly", "Fluidic Tubing Set"],
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
    desc: "If your company has channel resources, project follow-up capabilities, technical sales experience, or local service support, Foreach looks forward to building a stable long-term partnership with you.",
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
    desc: "We aim to make the cooperation process clear, traceable, and practical. After submission, Foreach will gradually confirm the suitable cooperation method and support scope based on market region, customer type, product direction, and project needs.",
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

    productInterest: "Interested Foreach Products",
    productInterestPlaceholder: "e.g. Piston pump, solenoid valve, quick connector, custom tubing assembly",

    requirement: "Cooperation Background / Project Needs",
    requirementPlaceholder: "Please briefly describe your local market, customer industry, existing projects, current needs, or support expected from Foreach.",

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
    codeSent: "Verification code sent. Please check your email.",
    sendTooFrequently: "A verification code was sent recently. Please wait before trying again.",
    codeSendFailed: "The verification email could not be sent. Please try again later.",
    codeExpired: "The verification code has expired. Please request a new code.",
    codeVerifyFailed: "The verification code could not be checked. Please try again later.",
    verificationExpired: "Email verification has expired. Please request a new code.",
    submitFailed: "The distributor application could not be submitted. Please try again later or contact us by email.",
    pdfPreviewBlocked: "The browser blocked the PDF preview window.",
    sending: "Sending…",
    verifying: "Verifying…",
    submitting: "Submitting…",
    secondsSuffix: "s",
    submittedTitle: "Application submitted",
    dismissSuccess: "Got it",
    wrongCode: "Incorrect verification code.",
    emailVerified: "Email verified.",
    fileTooLarge: "This file exceeds the 20 MB limit.",
    needVerifyEmail: "Please verify your email before submission.",
    submitted: "We have received your partnership application. The Foreach team will review your information and follow up based on your market region, product interest, and cooperation needs.",
  },

  bottomCta: {
    title: "Looking for a long-term microfluidic partner?",
    desc: "Work with Foreach to bring product portfolios, technical documents, selection support, and project introduction capabilities to more local customers.",
    button: "Apply Now",
  },
};

/* =========================================================
   05. 西班牙语数据
========================================================= */

const es: DistributorPageData = {
  hero: {
    titlePrefix: "Conviértase en distribuidor de",
    titleBrand: "Foreach Technology",
    titleSuffix: "",
    titleSecondLine: "",
    desc: "Establezca una cooperación a largo plazo con Foreach y amplíe las oportunidades locales en componentes microfluídicos clave y soluciones de sistemas fluídicos para IVD, ciencias de la vida, instrumentos analíticos, biología sintética y automatización de laboratorio.",
  },

  advantagesHead: {
    title: "Apoye a sus clientes locales con una cartera completa de productos microfluídicos.",
    desc: "Foreach apoya a sus socios mediante una amplia matriz de productos, documentación técnica, soporte de selección, coordinación de muestras y comunicación de proyectos.",
  },

  advantages: [
    { index: "01", title: "Cartera completa de productos",
      desc: "Incluye bombas, válvulas, módulos de control inteligente, racores, tubos, sondas y componentes clave de los sistemas fluídicos." },
    { index: "02", title: "Documentación y certificaciones",
      desc: "Los catálogos, las especificaciones, los planos, los certificados de calidad y la documentación de la empresa ayudan a presentar los productos a los clientes y facilitan la evaluación del proveedor." },
    { index: "03", title: "Selección de productos y apoyo con muestras",
      desc: "Ayudamos a seleccionar productos y validar muestras según el fluido, el caudal, la presión, las conexiones, la vida útil y el espacio de instalación." },
    { index: "04", title: "Apoyo a la implantación de proyectos",
      desc: "Ayudamos a los socios a evaluar sustituciones, validar muestras, resolver cuestiones técnicas y dar seguimiento a las distintas etapas del proyecto." },
  ],

  productsHead: {
    title: "Categorías principales de productos para la cooperación con distribuidores.",
    desc: "Para IVD, ciencias de la vida, instrumentos analíticos, biología sintética y automatización de laboratorio, Foreach ofrece bombas, válvulas, módulos de control inteligente, conexiones, tubos y productos de aguja.",
  },

  products: [
    {
      title: "Series de bombas",
      desc: "Para dosificación de precisión, trasvase continuo, dispensación de reactivos, manipulación de muestras y aplicaciones fluídicas de alta presión.",
      tags: [
        "Bomba de pistón",
        getValvelessPumpNames("es").categoryName,
        "Bomba de diafragma",
        "Bomba de pipeteo",
        "Bomba de jeringa",
        "Bomba de alta presión",
      ],
      image: distributorProductImages.pump,
    },
    {
      title: "Series de válvulas",
      desc: "Para abrir y cerrar el paso del fluido, conmutar circuitos, distribuir el flujo entre varios canales y controlarlo a alta presión.",
      tags: [
        "Válvula solenoide",
        "Válvula rotativa",
        "Válvula de alta presión",
      ],
      image: distributorProductImages.valve,
    },
    {
      title: "Módulos de control inteligente",
      desc: "Para supervisar el estado del circuito, obtener realimentación de presión, detectar burbujas y captar señales de los sensores.",
      tags: [
        "Sensor de presión",
        "Sensor de burbujas",
      ],
      image: distributorProductImages.control,
    },
    {
      title: "Series de racores",
      desc: "Para realizar conexiones fiables, asegurar la estanqueidad y agilizar el montaje entre tubos, puertos y módulos de instrumentos.",
      tags: [
        "Racores para tubos rígidos",
        "Racores de espiga",
        "Conectores rápidos",
        "Racores Luer",
        "Adaptadores de rosca",
      ],
      image: distributorProductImages.fitting,
    },
    {
      title: "Series de tubos",
      desc: "Disponibles en distintos materiales. Ofrecemos conjuntos de tubos personalizados y juegos completos para sistemas fluídicos según los planos, las conexiones, las longitudes y la disposición del sistema.",
      tags: [
        "PVC",
        "FEP",
        "TPU",
        "PTFE",
        "PFA",
        "Conjuntos de tubos personalizados",
        "Juegos de tubos para sistemas fluídicos",
      ],
      image: distributorProductImages.tubing,
    },
    {
      title: "Series de sondas",
      desc: "Para muestreo automático, perforación, enjuague, agitación y transferencia de fluidos en sistemas automatizados.",
      tags: [
        "Sonda de muestreo",
        "Sonda de perforación",
        "Agitador",
        "Sonda de enjuague",
      ],
      image: distributorProductImages.needle,
    },
  ],

  partnersHead: {
    title: "Damos la bienvenida a socios con recursos locales de clientes y capacidad de comunicación técnica.",
    desc: "Si su empresa cuenta con canales, capacidad de seguimiento de proyectos, experiencia en ventas técnicas o soporte de servicio local, Foreach espera construir una cooperación estable y a largo plazo con usted.",
  },

  partners: [
    { index: "01", title: "Distribuidores de instrumentos",
      desc: "Para empresas que atienden a clientes de diagnóstico in vitro, instrumentación para ciencias de la vida, automatización de laboratorio o equipos de ensayos de altas prestaciones." },
    { index: "02", title: "Distribuidores de productos de control de fluidos",
      desc: "Para empresas con canales de venta de bombas, válvulas, tubos, racores, sensores y otros componentes de control de fluidos." },
    { index: "03", title: "Integradores de sistemas de automatización",
      desc: "Para empresas que suministran sistemas fluídicos y soluciones modulares para la manipulación de muestras y la dispensación de reactivos." },
    { index: "04", title: "Socios locales de servicio técnico",
      desc: "Para empresas que ofrecen seguimiento local de proyectos, atención al cliente, asistencia durante la instalación y servicio posventa." },
  ],

  processHead: {
    title: "Desde la comunicación inicial hasta la cooperación del proyecto.",
    desc: "Buscamos que el proceso de cooperación sea claro, trazable y práctico. Después del envío, Foreach confirmará gradualmente el método de cooperación y el alcance de soporte adecuados.",
  },

  process: [
    { index: "01", title: "Presentación de la solicitud de colaboración",
      desc: "Describa su empresa, el mercado objetivo, los productos de interés y sus necesidades de colaboración para que podamos entender el enfoque." },
    { index: "02", title: "Evaluación de la colaboración",
      desc: "Evaluamos la idoneidad de la colaboración según el mercado regional, la cartera de clientes, las líneas de producto existentes y la capacidad de servicio." },
    { index: "03", title: "Intercambio técnico y de producto",
      desc: "Compartimos documentación, sugerencias de selección e información de certificación, y resolvemos dudas técnicas." },
    { index: "04", title: "Muestras y seguimiento del proyecto",
      desc: "Facilitamos la validación de muestras, el seguimiento de los resultados y la implantación según la aplicación y las necesidades de ensayo." },
  ],

  guide: {
    title: "Guía de llenado",
    desc: "Proporcione la siguiente información para que podamos evaluar rápidamente las oportunidades de cooperación, las líneas de productos y los métodos de soporte.",
    items: [
      { index: "01", title: "Mercado objetivo",
        desc: "Indique el país o la región, el sector local, el tipo de cliente y las principales aplicaciones." },
      { index: "02", title: "Perfil de la empresa",
        desc: "Describa sus líneas de producto, canales de venta, capacidad de venta técnica y recursos de servicio local." },
      { index: "03", title: "Productos de interés",
        desc: "Indique si le interesan bombas, válvulas, módulos de control inteligente, racores, tubos, sondas o soluciones fluídicas completas." },
      { index: "04", title: "Necesidades de colaboración",
        desc: "Indique si necesita documentación, muestras, asesoramiento técnico, apoyo a proyectos o ayuda para desarrollar el mercado." },
    ],
  },

  form: {
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
    websitePlaceholder: "https://",
    industry: "Industria principal",
    industryPlaceholder: "Seleccione industria",
    productInterest: "Productos Foreach de interés",
    requirement: "Antecedentes de cooperación / Necesidades del proyecto",
    uploadButton: "Subir archivos",
    submitButton: "Enviar solicitud",
    productInterestPlaceholder: "Ej.: bomba de pistón, válvula solenoide, conector rápido o conjunto de tubos personalizado",
    requirementPlaceholder: "Describa brevemente su mercado local, el sector de sus clientes, sus proyectos y necesidades actuales o el apoyo que espera de Foreach.",
    uploadTip: "Puede adjuntar el perfil de la empresa, el catálogo de productos, listas de materiales (BOM), imágenes y documentos de proyecto. Tamaño máximo por archivo: 20 MB.",
    options: [
      { label: "Diagnóstico in vitro (IVD)", value: "ivd" },
      { label: "Ciencias de la vida", value: "life-science" },
      { label: "Instrumentos analíticos", value: "analytical-instrument" },
      { label: "Biología sintética", value: "synthetic-biology" },
      { label: "Automatización de laboratorio", value: "lab-automation" },
      { label: "Otro", value: "other" },
    ],
  },

  toast: {
    invalidEmail: "Ingrese una dirección de correo electrónico válida.",
    codeSent: "Se ha enviado el código de verificación. Revise su correo electrónico.",
    sendTooFrequently: "Ya se ha enviado un código. Espere antes de solicitar otro.",
    codeSendFailed: "No se pudo enviar el correo de verificación. Inténtelo más tarde.",
    codeExpired: "El código de verificación ha caducado. Solicite uno nuevo.",
    codeVerifyFailed: "No se pudo verificar el código. Inténtelo más tarde.",
    verificationExpired: "La verificación del correo electrónico ha caducado. Solicite un código nuevo.",
    submitFailed: "No se pudo enviar la solicitud de colaboración. Inténtelo más tarde o contáctenos por correo electrónico.",
    pdfPreviewBlocked: "El navegador ha bloqueado la ventana de vista previa del PDF.",
    sending: "Enviando…",
    verifying: "Verificando…",
    submitting: "Enviando…",
    secondsSuffix: " s",
    submittedTitle: "Solicitud enviada",
    dismissSuccess: "Entendido",
    wrongCode: "Código de verificación incorrecto.",
    emailVerified: "Correo electrónico verificado.",
    fileTooLarge: "El archivo supera el límite de 20 MB.",
    needVerifyEmail: "Verifique su correo electrónico antes de enviar.",
    submitted: "Hemos recibido su solicitud de colaboración. El equipo de Foreach revisará su información y se pondrá en contacto con usted según su mercado, los productos de interés y sus necesidades.",
  },

  bottomCta: {
    title: "¿Busca un socio microfluídico estable a largo plazo?",
    desc: "Coopere con Foreach para llevar carteras de productos, documentación técnica, soporte de selección y capacidades de introducción de proyectos a más clientes locales.",
    button: "Solicitar ahora",
  },
};

/* =========================================================
   06. 法语数据
========================================================= */

const fr: DistributorPageData = {
  hero: {
    titlePrefix: "Devenez distributeur",
    titleBrand: "Foreach Technology",
    titleSuffix: "",
    titleSecondLine: "",
    desc: "Construisez un partenariat à long terme avec Foreach et développez les opportunités locales dans les composants microfluidiques essentiels et les solutions de systèmes fluidiques pour l’IVD, les sciences de la vie, les instruments analytiques, la biologie synthétique et l’automatisation de laboratoire.",
  },

  advantagesHead: {
    title: "Soutenez vos clients locaux avec une gamme complète de produits microfluidiques.",
    desc: "Foreach accompagne ses partenaires avec une large matrice de produits, des documents techniques, un support de sélection, une coordination des échantillons et une communication de projet.",
  },

  advantages: [
    { index: "01", title: "Gamme complète de produits",
      desc: "Pompes, vannes, modules de commande intelligents, raccords, tubes, sondes et principaux composants pour circuits fluidiques." },
    { index: "02", title: "Documentation et certifications",
      desc: "Les catalogues, fiches techniques, plans, certificats de qualité et documents d’entreprise facilitent la présentation des produits aux clients et l’évaluation du fournisseur." },
    { index: "03", title: "Aide à la sélection et à la validation des échantillons",
      desc: "Nous aidons à sélectionner les produits et à valider les échantillons selon le fluide, le débit, la pression, les raccordements, la durée de vie et l’espace de montage." },
    { index: "04", title: "Accompagnement à l’intégration",
      desc: "Nous aidons nos partenaires à évaluer les substitutions, à valider les échantillons, à traiter les questions techniques et à suivre les étapes du projet." },
  ],

  productsHead: {
    title: "Catégories principales de produits pour la coopération avec les distributeurs.",
    desc: "Pour l’IVD, les sciences de la vie, les instruments analytiques, la biologie synthétique et l’automatisation de laboratoire, Foreach fournit des pompes, vannes, modules de contrôle intelligents, raccords, tubes et aiguilles.",
  },

  products: [
    {
      title: "Séries de pompes",
      desc: "Pour le dosage de précision, le transfert continu, la distribution de réactifs, la manipulation d’échantillons et les applications fluidiques à haute pression.",
      tags: [
        "Pompe à piston",
        getValvelessPumpNames("fr").categoryName,
        "Pompe à membrane",
        "Pompe de pipetage",
        "Pompe seringue",
        "Pompe haute pression",
      ],
      image: distributorProductImages.pump,
    },
    {
      title: "Séries de vannes",
      desc: "Pour ouvrir et fermer le débit, commuter les circuits, répartir le fluide entre plusieurs voies et commander des flux à haute pression.",
      tags: [
        "Électrovanne",
        "Vanne rotative",
        "Vanne haute pression",
      ],
      image: distributorProductImages.valve,
    },
    {
      title: "Modules de commande intelligents",
      desc: "Pour surveiller l’état du circuit, obtenir un retour de pression, détecter les bulles et capter les signaux des capteurs.",
      tags: [
        "Capteur de pression",
        "Détecteur de bulles",
      ],
      image: distributorProductImages.control,
    },
    {
      title: "Séries de raccords",
      desc: "Pour assurer la fiabilité et l’étanchéité des connexions et faciliter l’assemblage entre tubes, orifices et modules d’instruments.",
      tags: [
        "Raccords pour tubes rigides",
        "Raccords cannelés",
        "Raccords rapides",
        "Raccords Luer",
        "Adaptateurs filetés",
      ],
      image: distributorProductImages.fitting,
    },
    {
      title: "Séries de tubes",
      desc: "Plusieurs matériaux sont disponibles. Nous proposons des assemblages de tubes sur mesure et des jeux complets pour circuits fluidiques selon les plans, les raccordements, les longueurs et l’implantation.",
      tags: [
        "PVC",
        "FEP",
        "TPU",
        "PTFE",
        "PFA",
        "Assemblages de tubes sur mesure",
        "Jeux de tubes pour circuits fluidiques",
      ],
      image: distributorProductImages.tubing,
    },
    {
      title: "Séries de sondes",
      desc: "Pour l’échantillonnage automatique, le perçage, le rinçage, l’agitation et le transfert de fluides dans des systèmes automatisés.",
      tags: [
        "Sonde d’échantillonnage",
        "Sonde de perçage",
        "Agitateur",
        "Sonde de rinçage",
      ],
      image: distributorProductImages.needle,
    },
  ],

  partnersHead: {
    title: "Nous accueillons les partenaires disposant de ressources clients locales et de capacités de communication technique.",
    desc: "Si votre entreprise dispose de canaux, de capacités de suivi de projet, d’une expérience en vente technique ou d’un support de service local, Foreach souhaite établir un partenariat stable et durable avec vous.",
  },

  partners: [
    { index: "01", title: "Distributeurs d’instruments",
      desc: "Pour les entreprises qui servent des clients dans le diagnostic in vitro, l’instrumentation pour les sciences de la vie, l’automatisation de laboratoire ou les équipements d’essai haut de gamme." },
    { index: "02", title: "Distributeurs de composants fluidiques",
      desc: "Pour les entreprises qui disposent de canaux de vente de pompes, vannes, tubes, raccords, capteurs et autres composants de commande fluidique." },
    { index: "03", title: "Intégrateurs de systèmes d’automatisation",
      desc: "Pour les entreprises qui fournissent aux utilisateurs finaux des systèmes fluidiques et des solutions modulaires pour la manipulation des échantillons et la distribution des réactifs." },
    { index: "04", title: "Partenaires locaux de service technique",
      desc: "Pour les entreprises qui assurent le suivi local des projets, les échanges avec les clients, l’aide à l’installation et le service après-vente." },
  ],

  processHead: {
    title: "De la communication initiale à la coopération de projet.",
    desc: "Nous souhaitons rendre le processus de coopération clair, traçable et concret. Après la soumission, Foreach confirmera progressivement la méthode de coopération et le périmètre de support adaptés.",
  },

  process: [
    { index: "01", title: "Dépôt de la demande de partenariat",
      desc: "Présentez votre entreprise, votre marché cible, les produits qui vous intéressent et vos besoins afin de préciser le projet de partenariat." },
    { index: "02", title: "Évaluation du partenariat",
      desc: "Nous évaluons les possibilités de collaboration selon le marché régional, la clientèle, les gammes existantes et les capacités de service." },
    { index: "03", title: "Échanges sur les produits et les aspects techniques",
      desc: "Nous partageons la documentation, les recommandations de sélection et les informations de certification, et répondons aux questions techniques." },
    { index: "04", title: "Échantillons et suivi du projet",
      desc: "Nous facilitons la validation des échantillons, le suivi des retours et l’intégration selon l’application et les besoins d’essai." },
  ],

  guide: {
    title: "Guide de remplissage",
    desc: "Veuillez fournir les informations suivantes afin que nous puissions évaluer rapidement les opportunités de coopération, les orientations produits et les méthodes de support.",
    items: [
      { index: "01", title: "Marché cible",
        desc: "Indiquez le pays ou la région, le secteur local, le type de clientèle et les principales applications." },
      { index: "02", title: "Profil de l’entreprise",
        desc: "Décrivez vos gammes actuelles, vos canaux de distribution, votre expérience en vente technique et vos capacités de service local." },
      { index: "03", title: "Produits recherchés",
        desc: "Précisez si vous recherchez des pompes, vannes, modules de commande intelligents, raccords, tubes, sondes ou des solutions fluidiques complètes." },
      { index: "04", title: "Besoins de collaboration",
        desc: "Précisez l’aide souhaitée : documentation, échantillons, échanges techniques, accompagnement du projet ou développement du marché." },
    ],
  },

  form: {
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
    websitePlaceholder: "https://",
    industry: "Secteur principal",
    industryPlaceholder: "Sélectionnez le secteur",
    productInterest: "Produits Foreach d’intérêt",
    requirement: "Contexte de coopération / Besoins du projet",
    uploadButton: "Téléverser des fichiers",
    submitButton: "Soumettre la demande",
    productInterestPlaceholder: "Ex. : pompe à piston, électrovanne, raccord rapide ou assemblage de tubes sur mesure",
    requirementPlaceholder: "Décrivez brièvement votre marché local, le secteur de vos clients, vos projets et besoins actuels ou l’assistance attendue de Foreach.",
    uploadTip: "Vous pouvez joindre une présentation de l’entreprise, une liste de produits, des nomenclatures (BOM), des images et des documents de projet. Taille maximale par fichier : 20 Mo.",
    options: [
      { label: "Diagnostic in vitro (IVD)", value: "ivd" },
      { label: "Sciences de la vie", value: "life-science" },
      { label: "Instruments analytiques", value: "analytical-instrument" },
      { label: "Biologie synthétique", value: "synthetic-biology" },
      { label: "Automatisation de laboratoire", value: "lab-automation" },
      { label: "Autre", value: "other" },
    ],
  },

  toast: {
    invalidEmail: "Veuillez saisir une adresse e-mail valide.",
    codeSent: "Le code de vérification a été envoyé. Consultez votre boîte de réception.",
    sendTooFrequently: "Un code a déjà été envoyé. Veuillez patienter avant d’en demander un nouveau.",
    codeSendFailed: "L’e-mail de vérification n’a pas pu être envoyé. Veuillez réessayer plus tard.",
    codeExpired: "Le code de vérification a expiré. Demandez un nouveau code.",
    codeVerifyFailed: "Le code n’a pas pu être vérifié. Veuillez réessayer plus tard.",
    verificationExpired: "La vérification de l’adresse e-mail a expiré. Demandez un nouveau code.",
    submitFailed: "La demande de partenariat n’a pas pu être envoyée. Réessayez plus tard ou contactez-nous par e-mail.",
    pdfPreviewBlocked: "Le navigateur a bloqué la fenêtre d’aperçu du PDF.",
    sending: "Envoi en cours…",
    verifying: "Vérification…",
    submitting: "Envoi en cours…",
    secondsSuffix: " s",
    submittedTitle: "Demande envoyée",
    dismissSuccess: "Compris",
    wrongCode: "Code de vérification incorrect.",
    emailVerified: "E-mail vérifié.",
    fileTooLarge: "Ce fichier dépasse la limite de 20 Mo.",
    needVerifyEmail: "Veuillez vérifier votre e-mail avant l’envoi.",
    submitted: "Nous avons reçu votre demande de partenariat. L’équipe Foreach examinera vos informations et vous recontactera en fonction de votre marché, des produits recherchés et de vos besoins.",
  },

  bottomCta: {
    title: "Vous recherchez un partenaire microfluidique stable à long terme ?",
    desc: "Collaborez avec Foreach pour apporter des gammes de produits, des documents techniques, un support de sélection et des capacités d’introduction de projet à davantage de clients locaux.",
    button: "Demander maintenant",
  },
};

/* =========================================================
   07. 韩语数据
========================================================= */

const ko: DistributorPageData = {
  hero: {
    titlePrefix: "Foreach Technology",
    titleBrand: "",
    titleSuffix: "공식 유통 파트너가 되세요",
    titleSecondLine: "",
    desc: "Foreach와 장기적인 파트너십을 구축하고 IVD, 생명과학, 분석기기, 합성생물학 및 실험실 자동화 분야에서 마이크로플루이딕 핵심 부품과 유체 시스템 솔루션의 현지 시장 기회를 확대하십시오.",
  },

  advantagesHead: {
    title: "완전한 마이크로플루이딕 제품 포트폴리오로 현지 고객을 지원합니다.",
    desc: "Foreach는 폭넓은 제품 라인업, 기술 문서, 제품 선정 지원, 샘플 조율 및 프로젝트 커뮤니케이션을 통해 파트너를 지원합니다.",
  },

  advantages: [
    { index: "01", title: "다양한 제품 라인업",
      desc: "펌프, 밸브, 지능형 제어 모듈, 피팅, 튜빙, 프로브 및 유체 시스템의 핵심 부품을 제공합니다." },
    { index: "02", title: "문서 및 인증 자료",
      desc: "제품 카탈로그, 사양서, 도면, 품질 인증서 및 회사 자격 자료를 제공해 고객 안내와 공급업체 평가를 지원합니다." },
    { index: "03", title: "제품 선정 및 샘플 지원",
      desc: "유체, 유량, 압력, 접속 규격, 수명 및 설치 공간을 고려해 제품을 선정하고 샘플을 검증하도록 지원합니다." },
    { index: "04", title: "프로젝트 도입 지원",
      desc: "파트너의 대체품 평가, 샘플 검증, 기술 협의 및 프로젝트 단계별 진행을 지원합니다." },
  ],

  productsHead: {
    title: "유통 파트너 협력에 적합한 핵심 제품군.",
    desc: "Foreach는 IVD, 생명과학, 분석기기, 합성생물학 및 실험실 자동화 분야를 위해 펌프, 밸브, 지능형 제어 모듈, 피팅, 튜빙 및 니들 제품을 제공합니다.",
  },

  products: [
    {
      title: "펌프 시리즈",
      desc: "정밀 정량, 연속 이송, 시약 분주, 샘플 처리 및 고압 유체 시스템에 사용됩니다.",
      tags: [
        "피스톤 펌프",
        getValvelessPumpNames("ko").categoryName,
        "다이어프램 펌프",
        "피펫팅 펌프",
        "시린지 펌프",
        "고압 펌프",
      ],
      image: distributorProductImages.pump,
    },
    {
      title: "밸브 시리즈",
      desc: "유체 흐름의 개폐, 유로 전환, 다채널 분배 및 고압 유체 제어에 사용됩니다.",
      tags: [
        "솔레노이드 밸브",
        "로터리 밸브",
        "고압 밸브",
      ],
      image: distributorProductImages.valve,
    },
    {
      title: "지능형 제어 모듈",
      desc: "유체 시스템의 상태 모니터링, 압력 피드백, 기포 감지 및 센서 신호 수집에 사용됩니다.",
      tags: [
        "압력 센서",
        "기포 센서",
      ],
      image: distributorProductImages.control,
    },
    {
      title: "피팅 시리즈",
      desc: "튜브, 포트 및 장비 모듈을 안정적으로 연결하고 밀봉하며 빠르게 조립할 수 있습니다.",
      tags: [
        "경질 튜브 피팅",
        "바브 피팅",
        "퀵 커넥터",
        "루어 피팅",
        "나사 어댑터",
      ],
      image: distributorProductImages.fitting,
    },
    {
      title: "튜빙 시리즈",
      desc: "다양한 소재의 튜빙을 제공하며 도면, 연결 규격, 길이 및 시스템 배치에 맞춘 튜빙 어셈블리와 유체 시스템용 튜빙 세트를 제작할 수 있습니다.",
      tags: [
        "PVC",
        "FEP",
        "TPU",
        "PTFE",
        "PFA",
        "맞춤형 튜빙 어셈블리",
        "유체 시스템용 튜빙 세트",
      ],
      image: distributorProductImages.tubing,
    },
    {
      title: "프로브 시리즈",
      desc: "자동화 유체 시스템에서 샘플 채취, 천공, 세척, 교반 및 유체 이송에 사용됩니다.",
      tags: [
        "샘플링 프로브",
        "피어싱 프로브",
        "교반기",
        "린싱 프로브",
      ],
      image: distributorProductImages.needle,
    },
  ],

  partnersHead: {
    title: "현지 고객 자원과 기술 커뮤니케이션 역량을 갖춘 파트너를 환영합니다.",
    desc: "채널 자원, 프로젝트 후속 대응 능력, 기술 영업 경험 또는 현지 서비스 지원 역량을 보유한 기업과 장기적이고 안정적인 협력 관계를 구축하길 기대합니다.",
  },

  partners: [
    { index: "01", title: "장비 유통사",
      desc: "체외진단, 생명과학 장비, 실험실 자동화 또는 고성능 시험 장비 분야의 고객을 지원하는 기업입니다." },
    { index: "02", title: "유체 제어 제품 유통사",
      desc: "펌프, 밸브, 튜빙, 피팅, 센서 및 유체 제어 제품의 판매 채널을 보유한 기업입니다." },
    { index: "03", title: "자동화 시스템 통합업체",
      desc: "최종 고객에게 유체 시스템, 샘플 처리, 시약 분주 및 모듈형 솔루션을 제공하는 기업입니다." },
    { index: "04", title: "현지 기술 서비스 파트너",
      desc: "현지 프로젝트 진행, 고객 소통, 설치 지원 및 사후 서비스를 제공하는 기업입니다." },
  ],

  processHead: {
    title: "초기 상담부터 프로젝트 협력까지.",
    desc: "협력 절차를 명확하고 추적 가능하며 실행 가능하게 만들고자 합니다. 제출 후 Foreach는 시장 지역, 고객 유형, 제품 방향 및 프로젝트 요구에 따라 적합한 협력 방식과 지원 범위를 확인합니다.",
  },

  process: [
    { index: "01", title: "파트너십 신청",
      desc: "회사 소개, 목표 시장, 관심 제품 및 협력 요구 사항을 알려주시면 협력 방향을 파악할 수 있습니다." },
    { index: "02", title: "협력 적합성 검토",
      desc: "지역 시장, 고객 기반, 기존 제품군 및 서비스 역량을 바탕으로 협력 적합성을 검토합니다." },
    { index: "03", title: "제품 및 기술 협의",
      desc: "제품 문서, 선정 제안 및 인증 정보를 공유하고 기술 문의에 답변합니다." },
    { index: "04", title: "샘플 검증 및 프로젝트 지원",
      desc: "고객의 적용 분야와 시험 요구에 맞춰 샘플 검증, 피드백 확인 및 제품 도입을 지원합니다." },
  ],

  guide: {
    title: "작성 안내",
    desc: "협력 기회, 제품 방향 및 지원 방식을 빠르게 평가할 수 있도록 다음 정보를 입력해 주세요.",
    items: [
      { index: "01", title: "목표 시장",
        desc: "국가 또는 지역, 현지 산업 분야, 고객 유형 및 주요 적용 분야를 알려주세요." },
      { index: "02", title: "회사 소개",
        desc: "기존 제품군, 유통 채널, 기술 영업 역량 및 현지 서비스 역량을 설명해 주세요." },
      { index: "03", title: "관심 제품",
        desc: "펌프, 밸브, 지능형 제어 모듈, 피팅, 튜빙, 프로브 또는 유체 시스템 솔루션 중 관심 제품을 알려주세요." },
      { index: "04", title: "협력 요구 사항",
        desc: "제품 문서, 샘플, 기술 상담, 프로젝트 지원 또는 시장 개발 지원 중 필요한 항목을 알려주세요." },
    ],
  },

  form: {
    title: "파트너십 신청서",
    companyName: "회사명",
    companyNamePlaceholder: "회사명을 입력하세요",
    country: "국가 / 지역",
    countryPlaceholder: "예: 미국",
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
    websitePlaceholder: "https://",
    industry: "주요 산업",
    industryPlaceholder: "산업을 선택하세요",
    productInterest: "관심 있는 Foreach 제품",
    requirement: "협력 배경 / 프로젝트 요구",
    uploadButton: "파일 업로드",
    submitButton: "파트너십 신청 제출",
    productInterestPlaceholder: "예: 피스톤 펌프, 솔레노이드 밸브, 퀵 커넥터 또는 맞춤형 튜빙 어셈블리",
    requirementPlaceholder: "현지 시장, 고객의 산업 분야, 진행 중인 프로젝트와 요구 사항 또는 Foreach에 원하는 지원을 간략히 설명해 주세요.",
    uploadTip: "회사 소개서, 제품 목록, 자재 명세서(BOM), 이미지 및 프로젝트 문서를 첨부할 수 있습니다. 파일당 최대 크기는 20MB입니다.",
    options: [
      { label: "체외진단(IVD)", value: "ivd" },
      { label: "생명과학", value: "life-science" },
      { label: "분석기기", value: "analytical-instrument" },
      { label: "합성생물학", value: "synthetic-biology" },
      { label: "실험실 자동화", value: "lab-automation" },
      { label: "기타", value: "other" },
    ],
  },

  toast: {
    invalidEmail: "유효한 이메일 주소를 입력하세요.",
    codeSent: "인증 코드를 전송했습니다. 이메일을 확인해 주세요.",
    sendTooFrequently: "인증 코드를 이미 전송했습니다. 잠시 기다린 후 다시 요청해 주세요.",
    codeSendFailed: "인증 이메일을 보내지 못했습니다. 잠시 후 다시 시도해 주세요.",
    codeExpired: "인증 코드가 만료되었습니다. 새 코드를 요청해 주세요.",
    codeVerifyFailed: "인증 코드를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.",
    verificationExpired: "이메일 인증이 만료되었습니다. 새 코드를 요청해 주세요.",
    submitFailed: "파트너십 신청서를 제출하지 못했습니다. 잠시 후 다시 시도하거나 이메일로 문의해 주세요.",
    pdfPreviewBlocked: "브라우저에서 PDF 미리보기 창을 차단했습니다.",
    sending: "전송 중…",
    verifying: "확인 중…",
    submitting: "제출 중…",
    secondsSuffix: "초",
    submittedTitle: "신청서가 접수되었습니다",
    dismissSuccess: "확인",
    wrongCode: "인증 코드가 올바르지 않습니다.",
    emailVerified: "이메일 인증이 완료되었습니다.",
    fileTooLarge: "파일 크기가 20MB를 초과합니다.",
    needVerifyEmail: "제출 전 이메일 인증을 완료하세요.",
    submitted: "파트너십 신청서를 받았습니다. Foreach 팀이 내용을 검토한 후 시장 지역, 관심 제품 및 협력 요구 사항에 맞춰 연락드리겠습니다.",
  },

  bottomCta: {
    title: "장기적으로 안정적인 마이크로플루이딕 파트너를 찾고 계신가요?",
    desc: "Foreach와 협력하여 제품 포트폴리오, 기술 문서, 선정 지원 및 프로젝트 도입 역량을 더 많은 현지 고객에게 제공하십시오.",
    button: "지금 신청",
  },
};

/* =========================================================
   08. 俄语数据
========================================================= */

const ru: DistributorPageData = {
  hero: {
    titlePrefix: "Станьте дистрибьютором",
    titleBrand: "Foreach Technology",
    titleSuffix: "",
    titleSecondLine: "",
    desc: "Постройте долгосрочное партнерство с Foreach и развивайте локальные возможности в области ключевых микрофлюидных компонентов и решений жидкостных систем для IVD, наук о жизни, аналитических приборов, синтетической биологии и лабораторной автоматизации.",
  },

  advantagesHead: {
    title: "Поддерживайте локальных клиентов\nс помощью полного портфеля\nмикрофлюидных продуктов.",
    desc: "Foreach поддерживает партнеров широкой продуктовой матрицей, технической документацией, помощью в подборе, координацией образцов и проектной коммуникацией.",
  },

  advantages: [
    { index: "01", title: "Полный ассортимент продукции",
      desc: "Насосы, клапаны, интеллектуальные модули управления, фитинги, трубки, зонды и другие ключевые компоненты жидкостных систем." },
    { index: "02", title: "Документация и сертификаты",
      desc: "Каталоги, технические характеристики, чертежи, сертификаты качества и документы о компании помогают представить продукцию клиентам и пройти оценку поставщика." },
    { index: "03", title: "Подбор продукции и образцы",
      desc: "Помогаем подобрать изделия и проверить образцы с учётом рабочей среды, расхода, давления, присоединительных размеров, ресурса и монтажного пространства." },
    { index: "04", title: "Поддержка при внедрении",
      desc: "Помогаем партнёрам оценивать замену компонентов, проверять образцы, обсуждать технические вопросы и сопровождать проект на разных этапах." },
  ],

  productsHead: {
    title: "Основные продуктовые направления\nдля сотрудничества\nс дистрибьюторами.",
    desc: "Для IVD, наук о жизни, аналитических приборов, синтетической биологии и лабораторной автоматизации Foreach предлагает насосы, клапаны, интеллектуальные модули управления, фитинги, трубки и иглы.",
  },

  products: [
    {
      title: "Серии насосов",
      desc: "Для точного дозирования, непрерывной подачи, дозирования реагентов, обработки проб и работы с жидкостями под высоким давлением.",
      tags: [
        "Поршневой насос",
        getValvelessPumpNames("ru").categoryName,
        "Мембранный насос",
        "Пипеточный насос",
        "Шприцевой насос",
        "Насос высокого давления",
      ],
      image: distributorProductImages.pump,
    },
    {
      title: "Серии клапанов",
      desc: "Для открытия и перекрытия потока, переключения жидкостных линий, распределения по нескольким каналам и управления потоком под высоким давлением.",
      tags: [
        "Соленоидный клапан",
        "Роторный клапан",
        "Клапан высокого давления",
      ],
      image: distributorProductImages.valve,
    },
    {
      title: "Интеллектуальные модули управления",
      desc: "Для контроля состояния жидкостной системы, обратной связи по давлению, обнаружения пузырьков и регистрации сигналов датчиков.",
      tags: [
        "Датчик давления",
        "Датчик пузырьков",
      ],
      image: distributorProductImages.control,
    },
    {
      title: "Серии фитингов",
      desc: "Для надёжного соединения, герметизации и быстрой сборки трубок, портов и приборных модулей.",
      tags: [
        "Фитинги для жёстких трубок",
        "Штуцерные фитинги",
        "Быстроразъёмные соединители",
        "Фитинги Люэра",
        "Резьбовые переходники",
      ],
      image: distributorProductImages.fitting,
    },
    {
      title: "Серии трубок",
      desc: "Предлагаем трубки из разных материалов, трубные сборки на заказ и комплекты для жидкостных систем по чертежам, типам подключения, длине и компоновке.",
      tags: [
        "PVC",
        "FEP",
        "TPU",
        "PTFE",
        "PFA",
        "Трубные сборки на заказ",
        "Комплекты трубок для жидкостных систем",
      ],
      image: distributorProductImages.tubing,
    },
    {
      title: "Серии зондов",
      desc: "Для автоматического отбора проб, прокалывания, промывки, перемешивания и переноса жидкостей в автоматизированных системах.",
      tags: [
        "Пробоотборный зонд",
        "Прокалывающий зонд",
        "Мешалка",
        "Промывочный зонд",
      ],
      image: distributorProductImages.needle,
    },
  ],

  partnersHead: {
    title: "Мы приветствуем партнеров\nс локальными клиентскими ресурсами\nи технической коммуникационной компетенцией.",
    desc: "Если у вашей компании есть каналы продаж, опыт сопровождения проектов, технические продажи или локальная сервисная поддержка, Foreach готова выстроить с вами стабильное долгосрочное партнерство.",
  },

  partners: [
    { index: "01", title: "Дистрибьюторы приборов",
      desc: "Для компаний, работающих с клиентами в области диагностики in vitro, приборов для наук о жизни, лабораторной автоматизации или высокоточного измерительного оборудования." },
    { index: "02", title: "Дистрибьюторы компонентов для жидкостных систем",
      desc: "Для компаний с каналами сбыта насосов, клапанов, трубок, фитингов, датчиков и других компонентов для управления потоками." },
    { index: "03", title: "Интеграторы систем автоматизации",
      desc: "Для компаний, которые поставляют конечным заказчикам жидкостные системы, решения для обработки проб и дозирования реагентов, а также модульные системы." },
    { index: "04", title: "Местные партнёры по техническому обслуживанию",
      desc: "Для компаний, которые сопровождают проекты, общаются с клиентами, помогают с монтажом и обеспечивают послепродажное обслуживание." },
  ],

  processHead: {
    title: "От первичного общения до проектного сотрудничества.",
    desc: "Мы стремимся сделать процесс сотрудничества понятным, отслеживаемым и практичным. После отправки заявки Foreach постепенно подтвердит подходящий формат сотрудничества и объем поддержки.",
  },

  process: [
    { index: "01", title: "Подача заявки на партнёрство",
      desc: "Расскажите о компании, целевом рынке, интересующих изделиях и задачах сотрудничества, чтобы мы могли понять ваши потребности." },
    { index: "02", title: "Оценка возможностей партнёрства",
      desc: "Оцениваем возможности сотрудничества с учётом регионального рынка, клиентской базы, имеющегося ассортимента и сервисных возможностей." },
    { index: "03", title: "Обсуждение продукции и технических вопросов",
      desc: "Предоставляем документацию, рекомендации по подбору и сведения о сертификации, отвечаем на технические вопросы." },
    { index: "04", title: "Образцы и сопровождение проекта",
      desc: "Помогаем проверить образцы, собрать обратную связь и внедрить продукцию с учётом применения и требований к испытаниям." },
  ],

  guide: {
    title: "Рекомендации по заполнению",
    desc: "Пожалуйста, предоставьте следующую информацию, чтобы мы могли быстро оценить возможности сотрудничества, продуктовые направления и формат поддержки.",
    items: [
      { index: "01", title: "Целевой рынок",
        desc: "Укажите страну или регион, отрасль, тип клиентов и основные области применения." },
      { index: "02", title: "Сведения о компании",
        desc: "Опишите текущий ассортимент, каналы сбыта, опыт технических продаж и возможности местного обслуживания." },
      { index: "03", title: "Интересующая продукция",
        desc: "Укажите насосы, клапаны, интеллектуальные модули управления, фитинги, трубки, зонды или комплексные решения для жидкостных систем." },
      { index: "04", title: "Потребности в сотрудничестве",
        desc: "Уточните, какая помощь нужна: документация, образцы, технические консультации, сопровождение проектов или развитие рынка." },
    ],
  },

  form: {
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
    websitePlaceholder: "https://",
    industry: "Основная отрасль",
    industryPlaceholder: "Выберите отрасль",
    productInterest: "Интересующие продукты Foreach",
    requirement: "Контекст сотрудничества / Потребности проекта",
    uploadButton: "Загрузить файлы",
    submitButton: "Отправить заявку",
    productInterestPlaceholder: "Например: поршневой насос, соленоидный клапан, быстроразъёмный соединитель, трубная сборка на заказ",
    requirementPlaceholder: "Кратко опишите местный рынок, отрасль ваших клиентов, текущие проекты и потребности либо укажите, какую поддержку вы ожидаете от Foreach.",
    uploadTip: "Можно приложить сведения о компании, перечень продукции, спецификации состава (BOM), изображения и проектную документацию. Максимальный размер одного файла — 20 МБ.",
    options: [
      { label: "Диагностика in vitro (IVD)", value: "ivd" },
      { label: "Науки о жизни", value: "life-science" },
      { label: "Аналитические приборы", value: "analytical-instrument" },
      { label: "Синтетическая биология", value: "synthetic-biology" },
      { label: "Лабораторная автоматизация", value: "lab-automation" },
      { label: "Другое", value: "other" },
    ],
  },

  toast: {
    invalidEmail: "Введите корректный адрес e-mail.",
    codeSent: "Код подтверждения отправлен. Проверьте электронную почту.",
    sendTooFrequently: "Код уже отправлен. Подождите перед повторным запросом.",
    codeSendFailed: "Не удалось отправить письмо с кодом. Повторите попытку позже.",
    codeExpired: "Срок действия кода истёк. Запросите новый код.",
    codeVerifyFailed: "Не удалось проверить код. Повторите попытку позже.",
    verificationExpired: "Срок подтверждения электронной почты истёк. Запросите новый код.",
    submitFailed: "Не удалось отправить заявку. Повторите попытку позже или свяжитесь с нами по электронной почте.",
    pdfPreviewBlocked: "Браузер заблокировал окно предварительного просмотра PDF.",
    sending: "Отправка…",
    verifying: "Проверка…",
    submitting: "Отправка…",
    secondsSuffix: " с",
    submittedTitle: "Заявка отправлена",
    dismissSuccess: "Понятно",
    wrongCode: "Неверный код подтверждения.",
    emailVerified: "E-mail подтвержден.",
    fileTooLarge: "Размер файла превышает допустимые 20 МБ.",
    needVerifyEmail: "Пожалуйста, подтвердите e-mail перед отправкой.",
    submitted: "Мы получили вашу заявку на партнёрство. Команда Foreach рассмотрит ваши данные и свяжется с вами с учётом региона, интересующей продукции и задач сотрудничества.",
  },

  bottomCta: {
    title: "Ищете долгосрочного и стабильного партнера в области микрофлюидики?",
    desc: "Сотрудничайте с Foreach, чтобы предоставить локальным клиентам продуктовые портфели, техническую документацию, поддержку подбора и возможности внедрения проектов.",
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
  return distributorIntlData[normalizeDistributorLocale(locale)];
}
