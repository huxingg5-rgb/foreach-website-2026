// data/home-inquiry.ts
// 首页第六屏「在线询盘」数据配置文件
//
// 说明：
// 1. 这个文件专门管理首页询盘模块的文字、表单字段、选项和提示信息
// 2. HomeInquirySection.tsx 后面只负责表单状态、验证码逻辑、提交逻辑和页面渲染
// 3. 当前支持语言：zh-CN / en / es / fr / ko / ru
// 4. 表单选项使用 value 作为提交值，不使用中文作为提交值
// 5. 这样后期接后台 / CRM / 邮件系统时，不会因为语言不同导致数据混乱

import type { LocaleCode } from "@/lib/i18n";

/* ================================
   多语言文本类型
================================ */

export type HomeInquiryText = Partial<Record<LocaleCode, string>>;

/* ================================
   表单选项类型

   说明：
   value 是提交给后端的稳定字段
   label 是页面显示文字，支持多语言
================================ */

export type HomeInquiryOption = {
  value: string;
  label: HomeInquiryText;
};

/* ================================
   左侧服务说明类型
================================ */

export type HomeInquirySupportItem = {
  key: string;
  title: HomeInquiryText;
  description: HomeInquiryText;
};

/* ================================
   首页询盘模块数据
================================ */

export const homeInquiryData = {
  sectionId: "contact",

  /* ================================
     左侧说明区域
  ================================ */

  left: {
    eyebrow: {
      "zh-CN": "CONTACT US",
      en: "CONTACT US",
      es: "CONTACT US",
      fr: "CONTACT US",
      ko: "CONTACT US",
      ru: "CONTACT US",
    },

    title: {
      "zh-CN": "告诉我们您的液路需求",
      en: "Tell Us About Your Fluidic Requirements",
      es: "Cuéntenos sus requisitos fluídicos",
      fr: "Parlez-nous de vos besoins fluidiques",
      ko: "필요한 유체 제어 요구사항을 알려주세요",
      ru: "Расскажите о ваших требованиях к жидкостной системе",
    },

    description: {
      "zh-CN":
        "您可以提交产品选型、液路方案、资料下载或项目支持需求，我们会根据产品类型、应用场景和地区信息安排对应支持。",
      en:
        "Submit your requirements for product selection, fluidic solutions, documentation, or project support. We will arrange suitable support based on product type, application, and region.",
      es:
        "Envíe sus requisitos de selección de productos, soluciones fluídicas, documentación o soporte de proyecto. Organizaremos el soporte adecuado según el tipo de producto, la aplicación y la región.",
      fr:
        "Soumettez vos besoins en sélection de produits, solutions fluidiques, documentation ou support projet. Nous organiserons le support adapté selon le type de produit, l’application et la région.",
      ko:
        "제품 선정, 유체 솔루션, 자료 요청 또는 프로젝트 지원 요구사항을 제출해 주세요. 제품 유형, 응용 분야 및 지역에 따라 적절한 지원을 배정합니다.",
      ru:
        "Отправьте запрос на подбор продукции, жидкостное решение, документацию или проектную поддержку. Мы организуем поддержку с учетом типа продукта, области применения и региона.",
    },
  },

  supportItems: [
    {
      key: "product-selection",
      title: {
        "zh-CN": "产品选型支持",
        en: "Product Selection Support",
        es: "Soporte de selección de productos",
        fr: "Support à la sélection de produits",
        ko: "제품 선정 지원",
        ru: "Поддержка подбора продукции",
      },
      description: {
        "zh-CN": "根据流量、压力、介质、接口和控制方式，协助判断合适的泵、阀、传感器与管路组件。",
        en:
          "Support selection of pumps, valves, sensors, and tubing components based on flow rate, pressure, media, interfaces, and control methods.",
        es:
          "Ayudamos a seleccionar bombas, válvulas, sensores y componentes de tubería según caudal, presión, medio, interfaces y método de control.",
        fr:
          "Nous aidons à sélectionner les pompes, vannes, capteurs et composants de tubulure selon le débit, la pression, le fluide, les interfaces et le mode de contrôle.",
        ko:
          "유량, 압력, 매체, 인터페이스 및 제어 방식에 따라 펌프, 밸브, 센서 및 튜빙 부품 선정을 지원합니다.",
        ru:
          "Помогаем подобрать насосы, клапаны, датчики и трубки с учетом расхода, давления, среды, интерфейсов и способа управления.",
      },
    },
    {
      key: "fluidic-solution",
      title: {
        "zh-CN": "液路方案沟通",
        en: "Fluidic Solution Discussion",
        es: "Comunicación sobre soluciones fluídicas",
        fr: "Échange sur les solutions fluidiques",
        ko: "유체 솔루션 상담",
        ru: "Обсуждение жидкостного решения",
      },
      description: {
        "zh-CN": "围绕样本处理、试剂分配、清洗废液、多通道切换等场景，提供系统级液路思路。",
        en:
          "Discuss system-level fluidic ideas for sample processing, reagent dispensing, washing, waste handling, and multi-channel switching.",
        es:
          "Analizamos ideas de sistemas fluídicos para procesamiento de muestras, distribución de reactivos, lavado, residuos y conmutación multicanal.",
        fr:
          "Nous discutons des idées de systèmes fluidiques pour le traitement des échantillons, la distribution de réactifs, le lavage, les déchets et la commutation multicanal.",
        ko:
          "시료 처리, 시약 분주, 세척, 폐액 처리 및 다채널 전환 등 시스템 수준의 유체 솔루션을 논의합니다.",
        ru:
          "Обсуждаем системные жидкостные решения для обработки образцов, дозирования реагентов, промывки, отходов и многоканального переключения.",
      },
    },
    {
      key: "documentation-compliance",
      title: {
        "zh-CN": "资料与合规支持",
        en: "Documentation & Compliance Support",
        es: "Soporte documental y normativo",
        fr: "Support documentaire et conformité",
        ko: "자료 및 규정 지원",
        ru: "Документация и соответствие требованиям",
      },
      description: {
        "zh-CN": "支持产品资料、规格参数、认证信息和后续项目沟通所需的基础文件。",
        en:
          "Provide product documents, specifications, certification information, and basic files required for further project communication.",
        es:
          "Proporcionamos documentos de producto, especificaciones, información de certificación y archivos básicos para la comunicación del proyecto.",
        fr:
          "Nous fournissons les documents produits, spécifications, informations de certification et fichiers nécessaires aux échanges projet.",
        ko:
          "제품 자료, 사양, 인증 정보 및 후속 프로젝트 커뮤니케이션에 필요한 기본 문서를 제공합니다.",
        ru:
          "Предоставляем документацию, спецификации, информацию о сертификации и базовые файлы для дальнейшего проектного общения.",
      },
    },
  ] satisfies HomeInquirySupportItem[],

  /* ================================
     表单基础文案
  ================================ */

  form: {
    title: {
      "zh-CN": "在线询盘",
      en: "Online Inquiry",
      es: "Consulta en línea",
      fr: "Demande en ligne",
      ko: "온라인 문의",
      ru: "Онлайн-запрос",
    },

    description: {
      "zh-CN": "请填写以下信息，我们会尽快与您联系。",
      en: "Please fill in the form below. We will contact you as soon as possible.",
      es: "Complete el siguiente formulario. Nos pondremos en contacto con usted lo antes posible.",
      fr: "Veuillez remplir le formulaire ci-dessous. Nous vous contacterons dès que possible.",
      ko: "아래 양식을 작성해 주세요. 가능한 한 빨리 연락드리겠습니다.",
      ru: "Заполните форму ниже. Мы свяжемся с вами как можно скорее.",
    },

    nameLabel: {
      "zh-CN": "姓名",
      en: "Name",
      es: "Nombre",
      fr: "Nom",
      ko: "이름",
      ru: "Имя",
    },

    namePlaceholder: {
      "zh-CN": "请输入您的姓名",
      en: "Enter your name",
      es: "Ingrese su nombre",
      fr: "Entrez votre nom",
      ko: "이름을 입력하세요",
      ru: "Введите ваше имя",
    },

    companyLabel: {
      "zh-CN": "公司名称",
      en: "Company",
      es: "Empresa",
      fr: "Entreprise",
      ko: "회사명",
      ru: "Компания",
    },

    companyPlaceholder: {
      "zh-CN": "请输入公司名称",
      en: "Enter company name",
      es: "Ingrese el nombre de la empresa",
      fr: "Entrez le nom de l’entreprise",
      ko: "회사명을 입력하세요",
      ru: "Введите название компании",
    },

    emailLabel: {
      "zh-CN": "邮箱",
      en: "Email",
      es: "Correo electrónico",
      fr: "E-mail",
      ko: "이메일",
      ru: "Эл. почта",
    },

    emailPlaceholder: {
      "zh-CN": "请输入邮箱地址",
      en: "Enter your email address",
      es: "Ingrese su correo electrónico",
      fr: "Entrez votre adresse e-mail",
      ko: "이메일 주소를 입력하세요",
      ru: "Введите адрес электронной почты",
    },

    verificationCodeLabel: {
      "zh-CN": "验证码",
      en: "Verification Code",
      es: "Código de verificación",
      fr: "Code de vérification",
      ko: "인증 코드",
      ru: "Код подтверждения",
    },

    verificationCodePlaceholder: {
      "zh-CN": "请输入验证码",
      en: "Enter verification code",
      es: "Ingrese el código de verificación",
      fr: "Entrez le code de vérification",
      ko: "인증 코드를 입력하세요",
      ru: "Введите код подтверждения",
    },

    sendCodeButton: {
      "zh-CN": "发送验证码",
      en: "Send Code",
      es: "Enviar código",
      fr: "Envoyer le code",
      ko: "코드 전송",
      ru: "Отправить код",
    },

    resendCodeButton: {
      "zh-CN": "重新发送",
      en: "Resend",
      es: "Reenviar",
      fr: "Renvoyer",
      ko: "다시 보내기",
      ru: "Отправить повторно",
    },

    verifyCodeButton: {
      "zh-CN": "验证邮箱",
      en: "Verify Email",
      es: "Verificar correo",
      fr: "Vérifier l’e-mail",
      ko: "이메일 인증",
      ru: "Подтвердить почту",
    },

    verifiedLabel: {
      "zh-CN": "邮箱已验证",
      en: "Email verified",
      es: "Correo verificado",
      fr: "E-mail vérifié",
      ko: "이메일 인증 완료",
      ru: "Почта подтверждена",
    },

    productLabel: {
      "zh-CN": "感兴趣产品",
      en: "Product of Interest",
      es: "Producto de interés",
      fr: "Produit d’intérêt",
      ko: "관심 제품",
      ru: "Интересующий продукт",
    },

    productPlaceholder: {
      "zh-CN": "请选择感兴趣产品",
      en: "Select a product",
      es: "Seleccione un producto",
      fr: "Sélectionnez un produit",
      ko: "관심 제품을 선택하세요",
      ru: "Выберите продукт",
    },

    countryLabel: {
      "zh-CN": "国家 / 地区",
      en: "Country / Region",
      es: "País / Región",
      fr: "Pays / Région",
      ko: "국가 / 지역",
      ru: "Страна / Регион",
    },

    countryPlaceholder: {
      "zh-CN": "请输入国家或地区",
      en: "Enter country or region",
      es: "Ingrese país o región",
      fr: "Entrez le pays ou la région",
      ko: "국가 또는 지역을 입력하세요",
      ru: "Введите страну или регион",
    },

    applicationLabel: {
      "zh-CN": "应用领域",
      en: "Application",
      es: "Aplicación",
      fr: "Application",
      ko: "응용 분야",
      ru: "Область применения",
    },

    applicationPlaceholder: {
      "zh-CN": "请选择应用领域",
      en: "Select an application",
      es: "Seleccione una aplicación",
      fr: "Sélectionnez une application",
      ko: "응용 분야를 선택하세요",
      ru: "Выберите область применения",
    },

    otherApplicationLabel: {
      "zh-CN": "其他应用领域",
      en: "Other Application",
      es: "Otra aplicación",
      fr: "Autre application",
      ko: "기타 응용 분야",
      ru: "Другая область применения",
    },

    otherApplicationPlaceholder: {
      "zh-CN": "请填写具体应用领域",
      en: "Please specify the application",
      es: "Especifique la aplicación",
      fr: "Veuillez préciser l’application",
      ko: "구체적인 응용 분야를 입력하세요",
      ru: "Укажите область применения",
    },

    messageLabel: {
      "zh-CN": "需求描述",
      en: "Requirement Description",
      es: "Descripción de requisitos",
      fr: "Description du besoin",
      ko: "요구사항 설명",
      ru: "Описание требований",
    },

    messagePlaceholder: {
      "zh-CN": "请简单描述您的产品需求、应用场景、参数要求或项目背景",
      en: "Briefly describe your product requirements, application scenario, parameters, or project background",
      es: "Describa brevemente sus requisitos de producto, aplicación, parámetros o contexto del proyecto",
      fr: "Décrivez brièvement vos besoins produit, votre application, vos paramètres ou le contexte du projet",
      ko: "제품 요구사항, 응용 시나리오, 파라미터 또는 프로젝트 배경을 간단히 설명해 주세요",
      ru: "Кратко опишите требования к продукту, сценарий применения, параметры или контекст проекта",
    },

    submitButton: {
      "zh-CN": "提交询盘",
      en: "Submit Inquiry",
      es: "Enviar consulta",
      fr: "Envoyer la demande",
      ko: "문의 제출",
      ru: "Отправить запрос",
    },

    submittingButton: {
      "zh-CN": "提交中...",
      en: "Submitting...",
      es: "Enviando...",
      fr: "Envoi en cours...",
      ko: "제출 중...",
      ru: "Отправка...",
    },
  },

  /* ================================
     产品选项

     注意：
     value 是提交给后端的稳定字段，不随语言变化。
  ================================ */

  productOptions: [
    {
      value: "diaphragm-pump",
      label: {
        "zh-CN": "隔膜泵",
        en: "Diaphragm Pump",
        es: "Bomba de diafragma",
        fr: "Pompe à membrane",
        ko: "다이어프램 펌프",
        ru: "Мембранный насос",
      },
    },
    {
      value: "syringe-pump",
      label: {
        "zh-CN": "注射泵",
        en: "Syringe Pump",
        es: "Bomba de jeringa",
        fr: "Pompe seringue",
        ko: "시린지 펌프",
        ru: "Шприцевой насос",
      },
    },
    {
      value: "pipetting-pump",
      label: {
        "zh-CN": "移液泵",
        en: "Pipetting Pump",
        es: "Bomba de pipeteo",
        fr: "Pompe de pipetage",
        ko: "피펫팅 펌프",
        ru: "Пипетирующий насос",
      },
    },
    {
      value: "solenoid-valve",
      label: {
        "zh-CN": "电磁阀",
        en: "Solenoid Valve",
        es: "Válvula solenoide",
        fr: "Électrovanne",
        ko: "솔레노이드 밸브",
        ru: "Соленоидный клапан",
      },
    },
    {
      value: "pinch-valve",
      label: {
        "zh-CN": "夹管阀",
        en: "Pinch Valve",
        es: "Válvula de pinza",
        fr: "Vanne à pincement",
        ko: "핀치 밸브",
        ru: "Пережимной клапан",
      },
    },
    {
      value: "rotary-valve",
      label: {
        "zh-CN": "旋转阀",
        en: "Rotary Valve",
        es: "Válvula rotativa",
        fr: "Vanne rotative",
        ko: "로터리 밸브",
        ru: "Поворотный клапан",
      },
    },
    {
      value: "pressure-sensor",
      label: {
        "zh-CN": "压力传感器",
        en: "Pressure Sensor",
        es: "Sensor de presión",
        fr: "Capteur de pression",
        ko: "압력 센서",
        ru: "Датчик давления",
      },
    },
    {
      value: "bubble-detector",
      label: {
        "zh-CN": "气泡检测器",
        en: "Bubble Detector",
        es: "Detector de burbujas",
        fr: "Détecteur de bulles",
        ko: "기포 감지기",
        ru: "Детектор пузырьков",
      },
    },
    {
      value: "tubing-and-fittings",
      label: {
        "zh-CN": "管路与连接件",
        en: "Tubing & Fittings",
        es: "Tubos y conectores",
        fr: "Tubes et raccords",
        ko: "튜빙 및 피팅",
        ru: "Трубки и соединители",
      },
    },
    {
      value: "sampling-probe",
      label: {
        "zh-CN": "采样针",
        en: "Sampling Probe",
        es: "Aguja de muestreo",
        fr: "Aiguille de prélèvement",
        ko: "샘플링 프로브",
        ru: "Пробоотборная игла",
      },
    },
    {
      value: "other",
      label: {
        "zh-CN": "其他产品",
        en: "Other Products",
        es: "Otros productos",
        fr: "Autres produits",
        ko: "기타 제품",
        ru: "Другая продукция",
      },
    },
  ] satisfies HomeInquiryOption[],

  /* ================================
     应用领域选项
  ================================ */

  applicationOptions: [
    {
      value: "ivd",
      label: {
        "zh-CN": "IVD 体外诊断",
        en: "IVD",
        es: "IVD",
        fr: "IVD",
        ko: "IVD",
        ru: "IVD",
      },
    },
    {
      value: "life-sciences",
      label: {
        "zh-CN": "生命科学",
        en: "Life Sciences",
        es: "Ciencias de la vida",
        fr: "Sciences de la vie",
        ko: "생명과학",
        ru: "Науки о жизни",
      },
    },
    {
      value: "synthetic-biology",
      label: {
        "zh-CN": "合成生物",
        en: "Synthetic Biology",
        es: "Biología sintética",
        fr: "Biologie synthétique",
        ko: "합성생물학",
        ru: "Синтетическая биология",
      },
    },
    {
      value: "analytical-instruments",
      label: {
        "zh-CN": "高端分析仪器",
        en: "High-end Analytical Instruments",
        es: "Instrumentos analíticos avanzados",
        fr: "Instruments d’analyse avancés",
        ko: "고급 분석 장비",
        ru: "Высокоточные аналитические приборы",
      },
    },
    {
      value: "laboratory-automation",
      label: {
        "zh-CN": "实验室自动化",
        en: "Laboratory Automation",
        es: "Automatización de laboratorio",
        fr: "Automatisation de laboratoire",
        ko: "실험실 자동화",
        ru: "Лабораторная автоматизация",
      },
    },
    {
      value: "other",
      label: {
        "zh-CN": "其他",
        en: "Other",
        es: "Otro",
        fr: "Autre",
        ko: "기타",
        ru: "Другое",
      },
    },
  ] satisfies HomeInquiryOption[],

  /* ================================
     表单提示与错误信息
  ================================ */

  messages: {
    invalidEmail: {
      "zh-CN": "请输入正确的邮箱格式。",
      en: "Please enter a valid email address.",
      es: "Ingrese una dirección de correo electrónico válida.",
      fr: "Veuillez saisir une adresse e-mail valide.",
      ko: "올바른 이메일 주소를 입력하세요.",
      ru: "Введите корректный адрес электронной почты.",
    },

    sendCodeSuccess: {
      "zh-CN": "验证码已发送，请查看邮箱。",
      en: "Verification code has been sent. Please check your email.",
      es: "El código de verificación ha sido enviado. Revise su correo.",
      fr: "Le code de vérification a été envoyé. Veuillez vérifier votre e-mail.",
      ko: "인증 코드가 전송되었습니다. 이메일을 확인해 주세요.",
      ru: "Код подтверждения отправлен. Проверьте вашу почту.",
    },

    sendCodeFailed: {
      "zh-CN": "验证码发送失败，请稍后再试。",
      en: "Failed to send verification code. Please try again later.",
      es: "No se pudo enviar el código. Inténtelo más tarde.",
      fr: "Échec de l’envoi du code. Veuillez réessayer plus tard.",
      ko: "인증 코드 전송에 실패했습니다. 나중에 다시 시도해 주세요.",
      ru: "Не удалось отправить код. Повторите попытку позже.",
    },

    verifyCodeSuccess: {
      "zh-CN": "邮箱验证成功。",
      en: "Email verification successful.",
      es: "Correo verificado correctamente.",
      fr: "E-mail vérifié avec succès.",
      ko: "이메일 인증이 완료되었습니다.",
      ru: "Почта успешно подтверждена.",
    },

    verifyCodeFailed: {
      "zh-CN": "验证码错误或已过期。",
      en: "Verification code is incorrect or expired.",
      es: "El código es incorrecto o ha expirado.",
      fr: "Le code est incorrect ou a expiré.",
      ko: "인증 코드가 잘못되었거나 만료되었습니다.",
      ru: "Код неверен или истек.",
    },

    requiredName: {
      "zh-CN": "请填写姓名。",
      en: "Please enter your name.",
      es: "Ingrese su nombre.",
      fr: "Veuillez saisir votre nom.",
      ko: "이름을 입력하세요.",
      ru: "Введите ваше имя.",
    },

    requiredCompany: {
      "zh-CN": "请填写公司名称。",
      en: "Please enter your company name.",
      es: "Ingrese el nombre de la empresa.",
      fr: "Veuillez saisir le nom de votre entreprise.",
      ko: "회사명을 입력하세요.",
      ru: "Введите название компании.",
    },

    requiredProduct: {
      "zh-CN": "请选择感兴趣产品。",
      en: "Please select a product.",
      es: "Seleccione un producto.",
      fr: "Veuillez sélectionner un produit.",
      ko: "제품을 선택하세요.",
      ru: "Выберите продукт.",
    },

    requiredApplication: {
      "zh-CN": "请选择应用领域。",
      en: "Please select an application.",
      es: "Seleccione una aplicación.",
      fr: "Veuillez sélectionner une application.",
      ko: "응용 분야를 선택하세요.",
      ru: "Выберите область применения.",
    },

    requiredMessage: {
      "zh-CN": "请填写需求描述。",
      en: "Please describe your requirements.",
      es: "Describa sus requisitos.",
      fr: "Veuillez décrire votre besoin.",
      ko: "요구사항을 입력하세요.",
      ru: "Опишите ваши требования.",
    },

    requiredEmailVerified: {
      "zh-CN": "请先完成邮箱验证。",
      en: "Please verify your email first.",
      es: "Verifique su correo electrónico primero.",
      fr: "Veuillez d’abord vérifier votre e-mail.",
      ko: "먼저 이메일 인증을 완료하세요.",
      ru: "Сначала подтвердите вашу электронную почту.",
    },

    submitSuccess: {
      "zh-CN": "询盘已提交，我们会尽快与您联系。",
      en: "Your inquiry has been submitted. We will contact you soon.",
      es: "Su consulta ha sido enviada. Nos pondremos en contacto pronto.",
      fr: "Votre demande a été envoyée. Nous vous contacterons bientôt.",
      ko: "문의가 제출되었습니다. 곧 연락드리겠습니다.",
      ru: "Ваш запрос отправлен. Мы скоро свяжемся с вами.",
    },

    submitFailed: {
      "zh-CN": "提交失败，请稍后再试。",
      en: "Submission failed. Please try again later.",
      es: "Error al enviar. Inténtelo más tarde.",
      fr: "Échec de l’envoi. Veuillez réessayer plus tard.",
      ko: "제출에 실패했습니다. 나중에 다시 시도해 주세요.",
      ru: "Ошибка отправки. Повторите попытку позже.",
    },
  },
};

/* ================================
   多语言文本读取函数
================================ */

export function getHomeInquiryText(
  text: HomeInquiryText,
  locale: LocaleCode,
) {
  return text[locale] || text["zh-CN"] || text.en || "";
}