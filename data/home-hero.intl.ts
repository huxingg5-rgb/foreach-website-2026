import type { LocaleCode } from "@/lib/i18n";

type HomeHeroText = {
  slideNames: readonly [string, string, string];
  flow: { titleLine1: string; titleLine2: string; description: string; button: string };
  tubing: {
    titleLine1: string; titleLine2: string;
    descriptionLine1: string; descriptionLine2: string;
    button: string; drawingLabel: string;
    washer: string; ring: string; tag: string;
    material: string; fitting: string; endA: string; text: string;
    labelText: string; placeholder: string;
  };
};

export const homeHeroText: Record<LocaleCode, HomeHeroText> = {
  "zh-CN": {
    slideNames: ["微流体产品总览", "管组件实时配置", "流阻计算器"],
    flow: {
      titleLine1: "流阻计算器", titleLine2: "让液路设计更有依据",
      description: "支持多流体、多段管路以及阀、接头等阻力元件，可由流量计算压降，也可由压降反算流量，帮助您快速验证液路方案并识别主要阻力来源。",
      button: "立即开始计算",
    },
    tubing: {
      titleLine1: "管组件在线配置", titleLine2: "生成图纸，预览效果",
      descriptionLine1: "选择管材、接头与长度，按需添加 O 型圈、垫片和管标。",
      descriptionLine2: "实时预览配置效果，生成含尺寸与部件信息的 2D 图纸，便于方案确认。",
      button: "开始配置", drawingLabel: "管组件图纸配置",
      washer: "垫片", ring: "O 型圈", tag: "管标",
      material: "材质：", fitting: "接头：", endA: "A 端 HFL6", text: "文本：",
      labelText: "管标文字", placeholder: "输入文字",
    },
  },
  en: {
    slideNames: ["Fluidic components overview", "Tubing assembly configurator", "Flow resistance calculator"],
    flow: {
      titleLine1: "Flow Resistance", titleLine2: "Calculator",
      description: "Calculate pressure drop or flow for tubing, valves, and fittings.",
      button: "Calculate Now",
    },
    tubing: {
      titleLine1: "Configure tubing online", titleLine2: "Drawings and previews",
      descriptionLine1: "Select tubing, fittings and length. Add O-rings, washers and labels as needed.",
      descriptionLine2: "Preview the assembly and generate 2D drawings with dimensions and component details for design review.",
      button: "Start configuring", drawingLabel: "Tubing assembly drawing configurator",
      washer: "Washer", ring: "O-ring", tag: "Tube label",
      material: "Material: ", fitting: "Fitting:", endA: "End A · HFL6", text: "Text:",
      labelText: "Tube label text", placeholder: "Enter text",
    },
  },
  es: {
    slideNames: ["Componentes microfluídicos", "Configurador de conjuntos de tubos", "Calculadora de resistencia al flujo"],
    flow: {
      titleLine1: "Calculadora de", titleLine2: "resistencia al flujo",
      description: "Calcule la pérdida de presión o el caudal en tubos, válvulas y conectores.",
      button: "Calcular",
    },
    tubing: {
      titleLine1: "Configure sus tubos", titleLine2: "Planos y vista previa",
      descriptionLine1: "Elija el tubo, los racores y la longitud. Añada juntas tóricas, arandelas y etiquetas según sus necesidades.",
      descriptionLine2: "Revise su diseño con la vista previa y planos 2D con cotas y detalles de los componentes.",
      button: "Empezar a configurar", drawingLabel: "Configurador del plano del conjunto de tubos",
      washer: "Arandela", ring: "Junta tórica", tag: "Etiqueta",
      material: "Material: ", fitting: "Racor:", endA: "Extremo A · HFL6", text: "Texto:",
      labelText: "Texto de la etiqueta", placeholder: "Escriba texto",
    },
  },
  fr: {
    slideNames: ["Composants microfluidiques", "Configurateur d’assemblages de tubes", "Calculateur de perte de charge"],
    flow: {
      titleLine1: "Calculateur de", titleLine2: "perte de charge",
      description: "Calculez la perte de charge ou le débit des tubes, vannes et raccords.",
      button: "Calculer",
    },
    tubing: {
      titleLine1: "Configurez vos tubes", titleLine2: "Plans et aperçu",
      descriptionLine1: "Choisissez le tube, les raccords et la longueur. Ajoutez joints toriques, rondelles et étiquettes selon vos besoins.",
      descriptionLine2: "Validez votre conception avec un aperçu de l’assemblage et des plans 2D cotés détaillant les composants.",
      button: "Commencer", drawingLabel: "Configurateur du plan d’assemblage de tubes",
      washer: "Rondelle", ring: "Joint torique", tag: "Étiquette",
      material: "Matériau : ", fitting: "Raccord :", endA: "Extrémité A · HFL6", text: "Texte :",
      labelText: "Texte de l’étiquette", placeholder: "Saisir le texte",
    },
  },
  ko: {
    slideNames: ["미세유체 제품 안내", "튜빙 어셈블리 구성", "유체 저항 계산기"],
    flow: {
      titleLine1: "유체 저항 계산기", titleLine2: "",
      description: "튜빙, 밸브와 피팅의 압력 강하 또는 유량을 계산합니다.",
      button: "계산하기",
    },
    tubing: {
      titleLine1: "튜빙 어셈블리 구성", titleLine2: "도면 생성과 미리보기",
      descriptionLine1: "튜브, 피팅과 길이를 선택하고 필요에 따라 O링, 와셔와 라벨을 추가하세요.",
      descriptionLine2: "구성 미리보기와 치수·부품 정보가 포함된 2D 도면으로 설계를 확인하세요.",
      button: "구성 시작", drawingLabel: "튜빙 어셈블리 도면 구성",
      washer: "와셔", ring: "O링", tag: "튜브 라벨",
      material: "재질: ", fitting: "피팅:", endA: "A 끝단 · HFL6", text: "텍스트:",
      labelText: "튜브 라벨 텍스트", placeholder: "텍스트 입력",
    },
  },
  ru: {
    slideNames: ["Микрофлюидные компоненты", "Конфигуратор трубных сборок", "Калькулятор гидросопротивления"],
    flow: {
      titleLine1: "Калькулятор", titleLine2: "гидросопротивления",
      description: "Рассчитайте перепад давления или расход для трубок, клапанов и фитингов.",
      button: "Рассчитать",
    },
    tubing: {
      titleLine1: "Трубные сборки онлайн", titleLine2: "Чертежи и виды сборок",
      descriptionLine1: "Выберите трубку, фитинги и длину. При необходимости добавьте уплотнительные кольца, шайбы и метки.",
      descriptionLine2: "Проверьте проект на предпросмотре и 2D-чертеже с размерами и данными о компонентах.",
      button: "Настроить сборку", drawingLabel: "Конфигуратор чертежа трубной сборки",
      washer: "Шайба", ring: "Кольцо O-ring", tag: "Метка",
      material: "Материал: ", fitting: "Фитинг:", endA: "Конец A · HFL6", text: "Текст:",
      labelText: "Текст метки трубки", placeholder: "Введите текст",
    },
  },
};
