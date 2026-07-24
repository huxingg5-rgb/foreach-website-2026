import styles from "../../news/NewsArticleClient.module.css";

type SupportedLocale =
  | "zh-CN"
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

type FormulaCard = {
  label: string;
  value: string;
  description: string;
};

type EngineeringRule = {
  title: string;
  description: string;
};

type TableAssessment = {
  assessment: string;
};

type ArticleCopy = {
  intro: {
    title: string;
    paragraphs: string[];
    notice: string;
  };

  assumptions: {
    title: string;
    paragraphs: string[];
    cards: FormulaCard[];
  };

  correction: {
    title: string;
    paragraphs: string[];
    cards: FormulaCard[];
  };

  channel: {
    title: string;
    paragraphs: string[];
    card: FormulaCard;
    tableHeaders: string[];
    assessments: TableAssessment[];
    notice: string;
  };

  orifice: {
    title: string;
    paragraphs: string[];
    cards: FormulaCard[];
  };

  rules: {
    title: string;
    items: EngineeringRule[];
  };

  code: {
    title: string;
    introduction: string;
    note: string;
  };

  conclusion: {
    title: string;
    paragraphs: string[];
  };
};

const BASE_TABLE_ROWS = [
  {
    diameter: "0.1 mm",
    reynolds: "200",
    friction: "0.320",
  },
  {
    diameter: "0.5 mm",
    reynolds: "1100",
    friction: "0.058",
  },
  {
    diameter: "1.0 mm",
    reynolds: "2700",
    friction: "0.029",
  },
  {
    diameter: "2.0 mm",
    reynolds: "8400",
    friction: "0.024",
  },
  {
    diameter: "10.0 mm",
    reynolds: "78000",
    friction: "0.019",
  },
];

const PYTHON_CODE = [
  "import numpy as np",
  "",
  "def churchill_f(Re, eps_d):",
  "    # Churchill 1977 unified friction-factor correlation",
  "    Re = max(Re, 1e-12)",
  "    A = (2.457 * np.log(",
  "        1.0 / ((7.0 / Re) ** 0.9 + 0.27 * eps_d)",
  "    )) ** 16",
  "    B = (37530.0 / Re) ** 16",
  "    return 8.0 * (",
  "        (8.0 / Re) ** 12 +",
  "        1.0 / (A + B) ** 1.5",
  "    ) ** (1.0 / 12.0)",
  "",
  "def v_cal_max(",
  "    d_mm,",
  "    v_micro=2.0,",
  "    v_macro=8.0,",
  "    d_c=3.0,",
  "    n=4,",
  "):",
  "    return v_macro + (v_micro - v_macro) / (",
  "        1.0 + (d_mm / d_c) ** n",
  "    ) ** 0.25",
  "",
  "def pipe_FR(",
  "    Re,",
  "    d_m,",
  "    rho,",
  "    mu,",
  "    eps_d,",
  "    L_over_d,",
  "    zeta_local=0.0,",
  "):",
  "    if eps_d >= 0.001:",
  "        f0 = churchill_f(1e9, eps_d)",
  "    else:",
  "        d_mm = d_m * 1000.0",
  "        v_max = v_cal_max(d_mm)",
  "        Re_cal = rho * v_max * d_m / mu",
  "        f0 = churchill_f(Re_cal, eps_d)",
  "",
  "    f_re = churchill_f(Re, eps_d)",
  "    K0 = f0 * L_over_d + zeta_local",
  "    K_re = f_re * L_over_d + zeta_local",
  "",
  "    return np.sqrt(K0 / K_re)",
  "",
  "def orifice_FR(Re, Re_c=30):",
  "    if Re < 0.01:",
  "        return np.sqrt(Re / Re_c)",
  "",
  "    return 1.0 / np.sqrt(1.0 + Re_c / Re)",
].join("\n");

const COPY: Record<SupportedLocale, ArticleCopy> = {
  "zh-CN": {
    intro: {
      title:
        "为什么传统 Cv/Kv 计算会在微流控中失真",

      paragraphs: [
        "在 IVD、分析仪器、实验室自动化和精密液路系统中，Cv 或 Kv 是描述微型阀、微孔、毛细管及节流元件流通能力的重要参数。",
        "传统工业计算通常建立在充分发展湍流和阻力平方区假设上。此时阻力系数近似保持不变，压降与流量平方成正比。",
        "微流控系统常见通径只有 0.1～0.5 mm，实际流动可能处于层流区或过渡区。直接套用传统平方律，可能明显低估实际压降。",
      ],

      notice:
        "关键问题通常不是公式本身错误，而是实际工况已经超出标称 Cv/Kv 的适用边界。",
    },

    assumptions: {
      title: "工业经典算法的底层假设",

      paragraphs: [
        "传统图算因子法，本质上是把压差开方和介质比重修正转换为图表查询，还原后仍然是标准液体流量系数关系。",
        "经典手册也通过粘度限制和临界压降规则，划定平方律的适用范围。",
      ],

      cards: [
        {
          label: "图算关系",
          value: "Kv = Q ÷（Fgm × Fsg）",
          description:
            "流量除以压差因子和比重因子。",
        },
        {
          label: "压差因子",
          value: "Fgm = √Δp",
          description:
            "压差通过平方根关系进入计算。",
        },
        {
          label: "比重因子",
          value: "Fsg = 1 ÷ √SG",
          description:
            "SG 表示介质相对密度。",
        },
        {
          label: "还原公式",
          value: "Kv = Q × √（SG ÷ Δp）",
          description:
            "核心前提仍然是 Δp 与 Q² 成正比。",
        },
      ],
    },

    correction: {
      title: "雷诺修正系数 Fᵣ",

      paragraphs: [
        "雷诺修正系数 Fᵣ 用于描述实际工况相对于标定工况的流通能力衰减。",
        "当 Fᵣ 小于 1 时，实际流量系数降低，而实际压降会按照 Fᵣ 的平方关系增加。",
      ],

      cards: [
        {
          label: "实际流量系数",
          value: "Cv（Re）= Cv₀ × Fᵣ（Re）",
          description:
            "把标称流量系数换算为当前工况值。",
        },
        {
          label: "实际压降",
          value: "ΔPactual = ΔPcalc ÷ Fᵣ²",
          description:
            "修正系数下降后，实际压降可能成倍增加。",
        },
        {
          label: "阻力定义",
          value: "Fᵣ（Re）= √［K₀ ÷ K（Re）］",
          description:
            "比较标定工况和实际工况的总阻力。",
        },
      ],
    },

    channel: {
      title:
        "长微通道与毛细管：Churchill 法",

      paragraphs: [
        "当流道长径比 L/d 较大时，沿程摩擦通常是主要阻力来源。Churchill 公式可以连续覆盖层流、过渡区和紊流。",
        "光滑微通道的基准摩擦因子应结合测试台实际可达到的标定雷诺数确定，不能直接套用大型工业管道的极限值。",
      ],

      card: {
        label: "长通道修正",
        value:
          "Fᵣ = √［（f₀·L/d + ζlocal）÷（f（Re）·L/d + ζlocal）］",
        description:
          "f₀ 为标定摩擦因子，f（Re）为当前工况摩擦因子。",
      },

      tableHeaders: [
        "管径",
        "物理可及 Recal",
        "对应 f₀",
        "工程评估",
      ],

      assessments: [
        {
          assessment:
            "微流控极限，摩擦很大，计算结果偏安全",
        },
        {
          assessment: "典型微通道标定工况",
        },
        {
          assessment: "刚脱离层流区",
        },
        {
          assessment: "由过渡区逐步进入紊流",
        },
        {
          assessment: "接近完全湍流工况",
        },
      ],

      notice:
        "对于 0.1 mm 光滑微通道，错误采用大型工业管道的高雷诺数摩擦因子，可能显著低估实际阻力。",
    },

    orifice: {
      title:
        "薄壁小孔与短孔：局部阻力修正",

      paragraphs: [
        "薄壁小孔和短孔通常以局部阻力为主，可以根据流量系数与雷诺数的关系建立连续修正。",
        "倒角、圆角、孔长和入口结构都会改变临界雷诺数，最终参数应结合真实产品结构和测试结果确定。",
      ],

      cards: [
        {
          label: "小孔修正",
          value:
            "Fᵣ（Re）= 1 ÷ √（1 + Rec ÷ Re）",
          description:
            "锐边薄壁孔可以使用 Rec = 30 作为工程起点。",
        },
        {
          label: "几何影响",
          value:
            "倒角和圆角会改变临界雷诺数",
          description:
            "圆角孔的 Rec 可能提高至约 200～400。",
        },
      ],
    },

    rules: {
      title: "工程设计中的五项红线",

      items: [
        {
          title:
            "低雷诺数工况不能直接使用平方律",
          description:
            "层流和过渡区的阻力系数会随雷诺数变化。",
        },
        {
          title:
            "微通道不能套用大型工业管道经验值",
          description:
            "两者实际可达到的标定工况不同。",
        },
        {
          title:
            "过渡区不宜使用简单迭代",
          description:
            "约 2000～4000 区间应使用更稳定的数值方法。",
        },
        {
          title:
            "局部损失必须符合真实几何结构",
          description:
            "等径连接不能机械套用大容器入口损失。",
        },
        {
          title:
            "外部管路损失不能计入元件本征 Cv/Kv",
          description:
            "测试管路、接头及沿程摩擦应单独扣除。",
        },
      ],
    },

    code: {
      title: "Python 核心计算实现",

      introduction:
        "以下代码包括 Churchill 摩擦因子、标定流速包络、长通道修正和小孔修正。",

      note:
        "临界雷诺数、粗糙度、局部损失系数和标定流速，仍需根据真实产品和测试数据调整。",
    },

    conclusion: {
      title: "结语",

      paragraphs: [
        "Cv/Kv 在宏观、高雷诺数工况下仍然是有效的工程参数，但不能被视为所有工况下都保持不变的常数。",
        "微流控设计应先判断流态，再结合真实流道结构、摩擦因子和局部阻力进行修正。",
        "最终结果仍需通过实际介质、产品结构和完整液路系统测试验证。",
      ],
    },
  },

  en: {
    intro: {
      title:
        "Why conventional Cv/Kv calculations can fail at microscale",

      paragraphs: [
        "Cv and Kv are widely used to compare the flow capacity of valves, restrictions and other fluidic components.",
        "Microfluidic instruments commonly use passages between 0.1 and 0.5 mm. Their operating point may be laminar or transitional rather than fully turbulent.",
        "Under these conditions, treating a published coefficient as constant can underpredict pressure drop and lead to incorrect component or pump sizing.",
      ],

      notice:
        "The equation is not inherently wrong. The risk appears when it is applied outside the flow regime used to establish the published coefficient.",
    },

    assumptions: {
      title:
        "Engineering assumptions behind standard Cv/Kv methods",

      paragraphs: [
        "Traditional chart-based selection methods are simplified versions of the liquid flow-coefficient equation.",
        "Their key assumption is that pressure drop remains proportional to the square of flow. Published viscosity and critical-pressure limits define the practical boundary of this assumption.",
      ],

      cards: [
        {
          label: "Chart relationship",
          value: "Kv = Q ÷ (Fgm × Fsg)",
          description:
            "Flow divided by pressure-drop and specific-gravity factors.",
        },
        {
          label: "Pressure factor",
          value: "Fgm = √Δp",
          description:
            "Pressure drop enters through a square-root relationship.",
        },
        {
          label: "Specific gravity",
          value: "Fsg = 1 ÷ √SG",
          description:
            "SG represents the specific gravity of the fluid.",
        },
        {
          label: "Equivalent equation",
          value: "Kv = Q × √(SG ÷ Δp)",
          description:
            "The underlying assumption is still Δp proportional to Q².",
        },
      ],
    },

    correction: {
      title:
        "A Reynolds correction framework for operating conditions",

      paragraphs: [
        "The Reynolds correction factor Fᵣ describes the reduction in effective flow capacity as the operating point moves away from the calibration condition.",
        "This approach connects a published coefficient with the expected resistance of the actual passage.",
      ],

      cards: [
        {
          label: "Effective coefficient",
          value: "Cv(Re) = Cv₀ × Fᵣ(Re)",
          description:
            "Converts the published coefficient to the operating condition.",
        },
        {
          label: "Corrected pressure drop",
          value: "ΔPactual = ΔPcalc ÷ Fᵣ²",
          description:
            "A moderate reduction in Fᵣ can create a much larger pressure increase.",
        },
        {
          label: "Resistance basis",
          value: "Fᵣ(Re) = √[K₀ ÷ K(Re)]",
          description:
            "Compares total resistance at calibration and operating conditions.",
        },
      ],
    },

    channel: {
      title:
        "Long microchannels and capillaries: the Churchill approach",

      paragraphs: [
        "For passages with a high L/d ratio, distributed wall friction is usually the dominant resistance.",
        "The Churchill correlation provides one continuous expression across laminar, transitional and turbulent regimes. Smooth microchannels should use a physically attainable calibration Reynolds number.",
      ],

      card: {
        label: "Long-channel correction",
        value:
          "Fᵣ = √[(f₀·L/d + ζlocal) ÷ (f(Re)·L/d + ζlocal)]",
        description:
          "f₀ is the calibration friction factor and f(Re) is the operating value.",
      },

      tableHeaders: [
        "Diameter",
        "Attainable Recal",
        "Reference f₀",
        "Engineering interpretation",
      ],

      assessments: [
        {
          assessment:
            "Extreme microscale condition with very high friction",
        },
        {
          assessment:
            "Representative microchannel calibration condition",
        },
        {
          assessment:
            "Leaving the laminar regime",
        },
        {
          assessment:
            "Transitioning toward turbulent flow",
        },
        {
          assessment:
            "Approaching fully turbulent flow",
        },
      ],

      notice:
        "Applying a large-pipe high-Reynolds-number friction factor to a 0.1 mm smooth passage may substantially underpredict its actual resistance.",
    },

    orifice: {
      title:
        "Thin orifices and short restrictions: local-loss correction",

      paragraphs: [
        "Thin orifices and short restrictions are often governed by local losses rather than distributed wall friction.",
        "Entrance shape, edge radius, chamfer and passage length can change the characteristic Reynolds number.",
      ],

      cards: [
        {
          label: "Orifice correction",
          value:
            "Fᵣ(Re) = 1 ÷ √(1 + Rec ÷ Re)",
          description:
            "Rec = 30 can be used as an initial engineering value for a sharp-edged thin orifice.",
        },
        {
          label: "Geometry dependence",
          value:
            "Chamfers and radiused entrances change Rec",
          description:
            "A radiused entrance may increase Rec to approximately 200–400.",
        },
      ],
    },

    rules: {
      title:
        "Five engineering checks before using a published Cv/Kv",

      items: [
        {
          title:
            "Do not apply the square law automatically at low Reynolds numbers",
          description:
            "Laminar and transitional resistance changes with Reynolds number.",
        },
        {
          title:
            "Do not use large-pipe values for smooth microchannels",
          description:
            "The attainable calibration conditions are fundamentally different.",
        },
        {
          title:
            "Use a robust solver in the transitional regime",
          description:
            "The approximately 2000–4000 range may produce non-monotonic behaviour.",
        },
        {
          title:
            "Match local-loss coefficients to the real geometry",
          description:
            "A straight equal-diameter connection is not a reservoir entrance.",
        },
        {
          title:
            "Remove external tubing losses from intrinsic Cv/Kv",
          description:
            "Test tubing and fittings must be separated from component resistance.",
        },
      ],
    },

    code: {
      title:
        "Python implementation for engineering evaluation",

      introduction:
        "The example implements the Churchill friction factor, an attainable calibration-velocity envelope and corrections for long channels and orifices.",

      note:
        "Critical Reynolds number, roughness, local-loss coefficients and calibration velocity should be validated against the real component and test setup.",
    },

    conclusion: {
      title: "Engineering takeaway",

      paragraphs: [
        "Published Cv/Kv values remain useful, but they should be treated as calibrated parameters rather than universal constants.",
        "The practical workflow is to identify the flow regime, account for the real geometry and verify the corrected result against test data.",
        "This reduces pump-sizing risk and improves the predictability of valves and complete fluidic networks.",
      ],
    },
  },

  es: {
    intro: {
      title:
        "Qué cambia cuando el conducto se reduce a escala microfluídica",

      paragraphs: [
        "Cv y Kv permiten comparar la capacidad de paso de válvulas y elementos restrictivos.",
        "En equipos IVD, instrumentos analíticos y automatización, los diámetros pueden situarse entre 0.1 y 0.5 mm, con flujo laminar o de transición.",
        "Aplicar el coeficiente publicado sin revisar el régimen puede dar como resultado una presión real muy superior a la prevista.",
      ],

      notice:
        "Antes de utilizar un Cv/Kv publicado, conviene comparar las condiciones de ensayo con las condiciones reales del proyecto.",
    },

    assumptions: {
      title:
        "Límites prácticos del método Cv/Kv convencional",

      paragraphs: [
        "Los métodos gráficos clásicos son una forma simplificada de la ecuación de caudal para líquidos.",
        "Su validez depende de una relación aproximadamente cuadrática entre presión y caudal.",
      ],

      cards: [
        {
          label: "Relación gráfica",
          value: "Kv = Q ÷ (Fgm × Fsg)",
          description:
            "El caudal se corrige mediante presión y densidad relativa.",
        },
        {
          label: "Factor de presión",
          value: "Fgm = √Δp",
          description:
            "La presión entra mediante una relación de raíz cuadrada.",
        },
        {
          label: "Densidad relativa",
          value: "Fsg = 1 ÷ √SG",
          description:
            "SG representa la densidad relativa del fluido.",
        },
        {
          label: "Ecuación equivalente",
          value: "Kv = Q × √(SG ÷ Δp)",
          description:
            "La hipótesis central sigue siendo Δp proporcional a Q².",
        },
      ],
    },

    correction: {
      title:
        "Corrección por Reynolds para condiciones reales",

      paragraphs: [
        "El factor Fᵣ representa la pérdida de capacidad de paso cuando el punto real se aleja de la condición de calibración.",
        "Esta corrección resulta útil al comparar alternativas o integrar un componente en un circuito existente.",
      ],

      cards: [
        {
          label: "Coeficiente efectivo",
          value: "Cv(Re) = Cv₀ × Fᵣ(Re)",
          description:
            "Adapta el valor publicado a la condición real.",
        },
        {
          label: "Presión corregida",
          value: "ΔPactual = ΔPcalc ÷ Fᵣ²",
          description:
            "Una reducción moderada de Fᵣ puede multiplicar la pérdida de presión.",
        },
        {
          label: "Base física",
          value: "Fᵣ(Re) = √[K₀ ÷ K(Re)]",
          description:
            "Compara la resistencia de calibración con la resistencia real.",
        },
      ],
    },

    channel: {
      title:
        "Microcanales largos y capilares: método de Churchill",

      paragraphs: [
        "Cuando la relación L/d es elevada, domina la fricción distribuida a lo largo del conducto.",
        "La expresión de Churchill permite trabajar de forma continua entre flujo laminar, transición y turbulencia.",
      ],

      card: {
        label: "Corrección del canal",
        value:
          "Fᵣ = √[(f₀·L/d + ζlocal) ÷ (f(Re)·L/d + ζlocal)]",
        description:
          "Compara la fricción de referencia con la del punto real.",
      },

      tableHeaders: [
        "Diámetro",
        "Recal alcanzable",
        "f₀ de referencia",
        "Evaluación",
      ],

      assessments: [
        {
          assessment:
            "Condición microfluídica extrema",
        },
        {
          assessment:
            "Condición típica de calibración",
        },
        {
          assessment:
            "Salida del régimen laminar",
        },
        {
          assessment:
            "Transición hacia turbulencia",
        },
        {
          assessment:
            "Próximo al flujo plenamente turbulento",
        },
      ],

      notice:
        "Utilizar un factor de fricción industrial en un paso liso de 0.1 mm puede subestimar de forma importante la resistencia.",
    },

    orifice: {
      title:
        "Orificios finos y pasos cortos: corrección de pérdidas locales",

      paragraphs: [
        "En orificios finos y pasos cortos, las pérdidas locales pueden ser más importantes que la fricción distribuida.",
        "La entrada, el radio, el chaflán y la longitud modifican el número de Reynolds característico.",
      ],

      cards: [
        {
          label: "Corrección del orificio",
          value:
            "Fᵣ(Re) = 1 ÷ √(1 + Rec ÷ Re)",
          description:
            "Rec = 30 puede utilizarse como punto inicial para un orificio de borde vivo.",
        },
        {
          label: "Efecto geométrico",
          value:
            "El radio y el chaflán modifican Rec",
          description:
            "Una entrada redondeada puede elevar Rec hasta aproximadamente 200–400.",
        },
      ],
    },

    rules: {
      title:
        "Cinco comprobaciones antes de seleccionar el componente",

      items: [
        {
          title:
            "No aplicar automáticamente la ley cuadrática con Reynolds bajo",
          description:
            "La resistencia cambia en régimen laminar y de transición.",
        },
        {
          title:
            "No trasladar valores industriales a microcanales",
          description:
            "Las condiciones de calibración alcanzables son diferentes.",
        },
        {
          title:
            "Utilizar un método numérico estable en transición",
          description:
            "El intervalo aproximado 2000–4000 puede presentar un comportamiento no monótono.",
        },
        {
          title:
            "Asignar pérdidas según la geometría real",
          description:
            "Una unión recta no equivale a una entrada desde un depósito.",
        },
        {
          title:
            "Separar las pérdidas del banco de ensayo",
          description:
            "Tubos y racores externos no forman parte del Cv/Kv intrínseco.",
        },
      ],
    },

    code: {
      title:
        "Implementación Python para evaluación técnica",

      introduction:
        "El ejemplo incluye el factor de Churchill, una envolvente de velocidad de calibración y las correcciones de canales y orificios.",

      note:
        "Los parámetros deben ajustarse con la geometría del producto, el fluido y los datos obtenidos durante las pruebas.",
    },

    conclusion: {
      title: "Aplicación práctica",

      paragraphs: [
        "Cv/Kv sigue siendo una referencia útil para comparar componentes, pero no sustituye la revisión del régimen de flujo.",
        "En un proyecto real debe utilizarse como punto de partida, corregirse según la geometría y validarse en el circuito completo.",
        "Este proceso facilita la selección de alternativas y reduce los riesgos durante la integración.",
      ],
    },
  },

  fr: {
    intro: {
      title:
        "Pourquoi le Cv/Kv doit être réévalué à l’échelle microfluidique",

      paragraphs: [
        "Cv et Kv caractérisent la capacité de passage des vannes et des restrictions.",
        "Dans les instruments de diagnostic et d’analyse, les passages peuvent atteindre 0.1 à 0.5 mm et fonctionner en régime laminaire ou transitoire.",
        "L’hypothèse d’un coefficient de résistance constant n’est alors plus suffisante pour prévoir la perte de charge.",
      ],

      notice:
        "La valeur publiée reste une référence d’étalonnage, mais elle doit être reliée aux conditions de mesure et à la géométrie réelle.",
    },

    assumptions: {
      title:
        "Hypothèses physiques des méthodes Cv/Kv classiques",

      paragraphs: [
        "Les méthodes graphiques traditionnelles sont une représentation simplifiée de l’équation de débit liquide.",
        "Elles supposent que la perte de charge varie avec le carré du débit.",
      ],

      cards: [
        {
          label: "Relation graphique",
          value: "Kv = Q ÷ (Fgm × Fsg)",
          description:
            "Le débit est corrigé par la pression et la densité relative.",
        },
        {
          label: "Facteur de pression",
          value: "Fgm = √Δp",
          description:
            "La pression intervient selon une relation en racine carrée.",
        },
        {
          label: "Densité relative",
          value: "Fsg = 1 ÷ √SG",
          description:
            "SG représente la densité relative du fluide.",
        },
        {
          label: "Équation équivalente",
          value: "Kv = Q × √(SG ÷ Δp)",
          description:
            "L’hypothèse reste Δp proportionnelle à Q².",
        },
      ],
    },

    correction: {
      title:
        "Facteur de correction de Reynolds",

      paragraphs: [
        "Le facteur Fᵣ décrit la diminution de la capacité de passage lorsque le fonctionnement s’éloigne de l’étalonnage.",
        "Il permet d’adapter explicitement la valeur publiée au régime réel.",
      ],

      cards: [
        {
          label: "Coefficient effectif",
          value: "Cv(Re) = Cv₀ × Fᵣ(Re)",
          description:
            "Conversion du coefficient publié vers la condition réelle.",
        },
        {
          label: "Perte de charge corrigée",
          value: "ΔPactual = ΔPcalc ÷ Fᵣ²",
          description:
            "Une diminution de Fᵣ peut fortement augmenter la pression requise.",
        },
        {
          label: "Définition physique",
          value: "Fᵣ(Re) = √[K₀ ÷ K(Re)]",
          description:
            "Comparaison des résistances à l’étalonnage et en fonctionnement.",
        },
      ],
    },

    channel: {
      title:
        "Microcanaux longs et capillaires : corrélation de Churchill",

      paragraphs: [
        "Lorsque L/d est élevé, les pertes réparties le long de la paroi dominent généralement.",
        "La corrélation de Churchill couvre de façon continue les régimes laminaire, transitoire et turbulent.",
      ],

      card: {
        label: "Correction du canal",
        value:
          "Fᵣ = √[(f₀·L/d + ζlocal) ÷ (f(Re)·L/d + ζlocal)]",
        description:
          "Comparaison du frottement de référence et du frottement réel.",
      },

      tableHeaders: [
        "Diamètre",
        "Recal accessible",
        "f₀ de référence",
        "Interprétation",
      ],

      assessments: [
        {
          assessment:
            "Condition microfluidique extrême",
        },
        {
          assessment:
            "Condition représentative d’un microcanal",
        },
        {
          assessment:
            "Sortie du régime laminaire",
        },
        {
          assessment:
            "Transition vers la turbulence",
        },
        {
          assessment:
            "Proche du régime pleinement turbulent",
        },
      ],

      notice:
        "Un facteur de frottement issu des grandes conduites peut fortement sous-estimer la résistance d’un passage lisse de 0.1 mm.",
    },

    orifice: {
      title:
        "Orifices minces et passages courts : pertes singulières",

      paragraphs: [
        "Dans un orifice mince, les pertes singulières peuvent dominer le frottement réparti.",
        "Le rayon d’entrée, le chanfrein et la longueur modifient le nombre de Reynolds caractéristique.",
      ],

      cards: [
        {
          label: "Correction de l’orifice",
          value:
            "Fᵣ(Re) = 1 ÷ √(1 + Rec ÷ Re)",
          description:
            "Rec = 30 constitue un point de départ pour une arête vive.",
        },
        {
          label: "Influence géométrique",
          value:
            "Les rayons et chanfreins modifient Rec",
          description:
            "Une entrée arrondie peut conduire à Rec ≈ 200–400.",
        },
      ],
    },

    rules: {
      title:
        "Cinq règles de contrôle pour la conception",

      items: [
        {
          title:
            "Ne pas appliquer automatiquement la loi quadratique à bas Reynolds",
          description:
            "La résistance varie en régime laminaire et transitoire.",
        },
        {
          title:
            "Ne pas transposer les valeurs des grandes conduites aux microcanaux",
          description:
            "Les conditions d’étalonnage accessibles sont différentes.",
        },
        {
          title:
            "Employer une résolution numérique robuste en transition",
          description:
            "La zone approximative 2000–4000 peut présenter une réponse non monotone.",
        },
        {
          title:
            "Associer les pertes singulières à la géométrie réelle",
          description:
            "Un raccord droit n’est pas une entrée depuis un réservoir.",
        },
        {
          title:
            "Séparer les pertes du montage d’essai",
          description:
            "Les tubes et raccords externes ne font pas partie du Cv/Kv intrinsèque.",
        },
      ],
    },

    code: {
      title:
        "Mise en œuvre Python pour l’évaluation",

      introduction:
        "L’exemple regroupe la corrélation de Churchill, la vitesse d’étalonnage et les corrections de canal et d’orifice.",

      note:
        "Les paramètres doivent être vérifiés à partir de la géométrie, du fluide et des essais du composant.",
    },

    conclusion: {
      title: "Conclusion d’ingénierie",

      paragraphs: [
        "Cv/Kv reste une référence efficace lorsque ses conditions d’utilisation sont connues.",
        "En microfluidique, il convient d’identifier le régime, de tenir compte de la géométrie et de valider le résultat corrigé.",
        "Cette démarche améliore la prévisibilité du circuit et réduit le risque de sous-dimensionnement.",
      ],
    },
  },

  ko: {
    intro: {
      title:
        "미세 유로에서 기존 Cv/Kv 계산이 달라지는 이유",

      paragraphs: [
        "Cv와 Kv는 밸브와 유량 제한 부품의 통과 능력을 비교하는 대표적인 지표입니다.",
        "IVD 및 분석기기에서는 0.1～0.5 mm 수준의 유로가 사용되며, 유동이 층류 또는 천이 영역에 위치할 수 있습니다.",
        "표시된 Cv/Kv를 그대로 적용하면 실제 압력 손실과 필요한 펌프 압력을 낮게 평가할 수 있습니다.",
      ],

      notice:
        "표시된 계수가 어떤 시험 조건에서 얻어졌는지 먼저 확인해야 합니다.",
    },

    assumptions: {
      title:
        "일반 Cv/Kv 계산의 적용 조건",

      paragraphs: [
        "기존 도표 방식은 액체 유량계수 공식을 빠르게 사용하도록 단순화한 방법입니다.",
        "핵심 전제는 압력 손실이 유량 제곱에 비례한다는 것입니다.",
      ],

      cards: [
        {
          label: "도표 관계",
          value: "Kv = Q ÷ (Fgm × Fsg)",
          description:
            "압력차와 비중 보정계수를 사용합니다.",
        },
        {
          label: "압력차 계수",
          value: "Fgm = √Δp",
          description:
            "압력차가 제곱근 관계로 반영됩니다.",
        },
        {
          label: "비중 계수",
          value: "Fsg = 1 ÷ √SG",
          description:
            "SG는 유체 비중을 의미합니다.",
        },
        {
          label: "환산 공식",
          value: "Kv = Q × √(SG ÷ Δp)",
          description:
            "기본 전제는 Δp가 Q²에 비례한다는 것입니다.",
        },
      ],
    },

    correction: {
      title:
        "실제 운전 조건을 위한 레이놀즈수 보정",

      paragraphs: [
        "Fᵣ는 실제 운전점이 기준 시험 조건에서 벗어날 때 발생하는 유량계수 감소를 나타냅니다.",
        "이를 통해 표시된 Cv/Kv와 실제 유로 저항을 비교할 수 있습니다.",
      ],

      cards: [
        {
          label: "실제 유량계수",
          value: "Cv(Re) = Cv₀ × Fᵣ(Re)",
          description:
            "표시된 계수를 실제 운전 조건으로 환산합니다.",
        },
        {
          label: "보정 압력 손실",
          value: "ΔPactual = ΔPcalc ÷ Fᵣ²",
          description:
            "Fᵣ가 감소하면 필요한 압력이 크게 증가할 수 있습니다.",
        },
        {
          label: "저항 기반 정의",
          value: "Fᵣ(Re) = √[K₀ ÷ K(Re)]",
          description:
            "기준 조건과 실제 조건의 저항을 비교합니다.",
        },
      ],
    },

    channel: {
      title:
        "긴 미세 유로와 모세관: Churchill 방법",

      paragraphs: [
        "L/d가 큰 유로에서는 벽면 마찰 손실이 주요 저항이 됩니다.",
        "Churchill 식은 층류, 천이 및 난류 영역을 하나의 연속식으로 계산합니다.",
      ],

      card: {
        label: "긴 유로 보정",
        value:
          "Fᵣ = √[(f₀·L/d + ζlocal) ÷ (f(Re)·L/d + ζlocal)]",
        description:
          "기준 마찰계수와 실제 마찰계수를 비교합니다.",
      },

      tableHeaders: [
        "유로 직경",
        "도달 가능한 Recal",
        "기준 f₀",
        "평가",
      ],

      assessments: [
        {
          assessment:
            "마찰이 매우 큰 미세유체 조건",
        },
        {
          assessment:
            "대표적인 미세 유로 시험 조건",
        },
        {
          assessment:
            "층류 영역을 벗어나는 조건",
        },
        {
          assessment:
            "난류로 전환되는 조건",
        },
        {
          assessment:
            "완전 난류에 가까운 조건",
        },
      ],

      notice:
        "0.1 mm의 매끄러운 유로에 산업용 배관의 마찰계수를 적용하면 실제 저항을 크게 낮게 평가할 수 있습니다.",
    },

    orifice: {
      title:
        "얇은 오리피스와 짧은 유로: 국부 손실 보정",

      paragraphs: [
        "얇은 오리피스와 짧은 유로에서는 벽면 마찰보다 국부 손실이 중요할 수 있습니다.",
        "모따기, 라운드, 입구 형상과 유로 길이는 임계 레이놀즈수에 영향을 줍니다.",
      ],

      cards: [
        {
          label: "오리피스 보정",
          value:
            "Fᵣ(Re) = 1 ÷ √(1 + Rec ÷ Re)",
          description:
            "날카로운 얇은 오리피스는 Rec = 30을 초기값으로 사용할 수 있습니다.",
        },
        {
          label: "형상 영향",
          value:
            "라운드와 모따기는 Rec를 변화시킵니다",
          description:
            "라운드 입구의 Rec는 약 200～400까지 증가할 수 있습니다.",
        },
      ],
    },

    rules: {
      title:
        "설계 검토 시 확인할 다섯 가지 항목",

      items: [
        {
          title:
            "저레이놀즈수에서 제곱 법칙을 바로 적용하지 않습니다",
          description:
            "층류와 천이 영역에서는 저항계수가 일정하지 않습니다.",
        },
        {
          title:
            "산업용 대구경 배관 값을 미세 유로에 적용하지 않습니다",
          description:
            "실제로 도달 가능한 시험 조건이 다릅니다.",
        },
        {
          title:
            "천이 영역에서는 안정적인 수치해석 방법을 사용합니다",
          description:
            "약 2000～4000 영역에서는 비단조 거동이 나타날 수 있습니다.",
        },
        {
          title:
            "국부 손실계수는 실제 형상에 맞춰 설정합니다",
          description:
            "동일 직경의 직선 연결은 탱크 입구 조건과 다릅니다.",
        },
        {
          title:
            "외부 튜빙 손실을 부품 Cv/Kv에 포함하지 않습니다",
          description:
            "시험용 튜빙과 피팅 손실을 분리해야 합니다.",
        },
      ],
    },

    code: {
      title:
        "엔지니어링 검토용 Python 구현",

      introduction:
        "예제에는 Churchill 마찰계수, 기준 시험 속도, 긴 유로 보정 및 오리피스 보정이 포함됩니다.",

      note:
        "임계 레이놀즈수와 손실계수는 실제 제품과 시험 데이터로 검증해야 합니다.",
    },

    conclusion: {
      title: "설계 적용 요약",

      paragraphs: [
        "Cv/Kv는 부품 비교에 유용하지만 모든 유동 조건에서 일정한 값은 아닙니다.",
        "장비 설계 시 유동 영역과 실제 형상을 확인한 뒤 시스템 시험으로 결과를 검증해야 합니다.",
        "이 과정은 펌프 압력과 유로 부품 선정 위험을 줄이는 데 도움이 됩니다.",
      ],
    },
  },

  ru: {
    intro: {
      title:
        "Почему стандартный Cv/Kv требует проверки в микрофлюидной системе",

      paragraphs: [
        "Cv и Kv применяются для сравнения пропускной способности клапанов и дросселирующих элементов.",
        "В диагностическом и аналитическом оборудовании диаметр канала может составлять 0.1～0.5 mm, а поток — находиться в ламинарной или переходной области.",
        "Применение паспортного коэффициента без проверки режима может значительно занизить фактический перепад давления.",
      ],

      notice:
        "Паспортный коэффициент следует рассматривать как результат калибровки в определённых условиях, а не как универсальную постоянную.",
    },

    assumptions: {
      title:
        "Физические ограничения классической методики Cv/Kv",

      paragraphs: [
        "Графические методы являются упрощённой формой стандартного уравнения расхода жидкости.",
        "Они предполагают квадратичную зависимость перепада давления от расхода.",
      ],

      cards: [
        {
          label: "Графическая зависимость",
          value: "Kv = Q ÷ (Fgm × Fsg)",
          description:
            "Расход корректируется по давлению и относительной плотности.",
        },
        {
          label: "Фактор давления",
          value: "Fgm = √Δp",
          description:
            "Перепад давления входит через квадратный корень.",
        },
        {
          label: "Относительная плотность",
          value: "Fsg = 1 ÷ √SG",
          description:
            "SG обозначает относительную плотность среды.",
        },
        {
          label: "Эквивалентная формула",
          value: "Kv = Q × √(SG ÷ Δp)",
          description:
            "Основная гипотеза: Δp пропорционален Q².",
        },
      ],
    },

    correction: {
      title:
        "Коррекция по числу Рейнольдса",

      paragraphs: [
        "Коэффициент Fᵣ описывает уменьшение эффективной пропускной способности при отклонении режима от условий калибровки.",
        "Такой подход позволяет заранее оценить риск по давлению.",
      ],

      cards: [
        {
          label: "Эффективный коэффициент",
          value: "Cv(Re) = Cv₀ × Fᵣ(Re)",
          description:
            "Преобразование паспортного значения к рабочему режиму.",
        },
        {
          label: "Скорректированный перепад",
          value: "ΔPactual = ΔPcalc ÷ Fᵣ²",
          description:
            "Снижение Fᵣ может многократно увеличить необходимый перепад.",
        },
        {
          label: "Определение через сопротивление",
          value: "Fᵣ(Re) = √[K₀ ÷ K(Re)]",
          description:
            "Сравнение сопротивления при калибровке и в работе.",
        },
      ],
    },

    channel: {
      title:
        "Длинные микроканалы и капилляры: метод Черчилля",

      paragraphs: [
        "При большом отношении L/d основное сопротивление создаёт распределённое трение.",
        "Формула Черчилля непрерывно описывает ламинарную, переходную и турбулентную области.",
      ],

      card: {
        label: "Коррекция длинного канала",
        value:
          "Fᵣ = √[(f₀·L/d + ζlocal) ÷ (f(Re)·L/d + ζlocal)]",
        description:
          "Сравнение базового и рабочего коэффициентов трения.",
      },

      tableHeaders: [
        "Диаметр",
        "Достижимый Recal",
        "Базовый f₀",
        "Оценка",
      ],

      assessments: [
        {
          assessment:
            "Предельный микромасштаб с высоким трением",
        },
        {
          assessment:
            "Характерный режим микроканала",
        },
        {
          assessment:
            "Выход из ламинарной области",
        },
        {
          assessment:
            "Переход к турбулентности",
        },
        {
          assessment:
            "Режим, близкий к полностью турбулентному",
        },
      ],

      notice:
        "Использование промышленного коэффициента трения для гладкого канала 0.1 mm может значительно занизить его реальное сопротивление.",
    },

    orifice: {
      title:
        "Тонкие отверстия и короткие дроссели: местные потери",

      paragraphs: [
        "В тонком отверстии или коротком канале местное сопротивление может преобладать над распределённым трением.",
        "Кромка, фаска, радиус входа и длина изменяют характерное число Рейнольдса.",
      ],

      cards: [
        {
          label: "Коррекция отверстия",
          value:
            "Fᵣ(Re) = 1 ÷ √(1 + Rec ÷ Re)",
          description:
            "Для отверстия с острой кромкой Rec = 30 можно использовать как начальное значение.",
        },
        {
          label: "Влияние геометрии",
          value:
            "Радиус и фаска изменяют Rec",
          description:
            "Для скруглённого входа Rec может достигать примерно 200–400.",
        },
      ],
    },

    rules: {
      title:
        "Пять обязательных инженерных проверок",

      items: [
        {
          title:
            "Не применять квадратичный закон автоматически при низком Re",
          description:
            "В ламинарной и переходной областях сопротивление меняется.",
        },
        {
          title:
            "Не переносить данные крупных трубопроводов на микроканалы",
          description:
            "Достижимые условия калибровки различаются.",
        },
        {
          title:
            "Использовать устойчивый численный метод в переходной области",
          description:
            "В диапазоне примерно 2000–4000 возможна немонотонная зависимость.",
        },
        {
          title:
            "Связывать местные потери с фактической геометрией",
          description:
            "Прямое соединение не является входом из резервуара.",
        },
        {
          title:
            "Отделять потери испытательного контура",
          description:
            "Трубки и фитинги не должны входить в собственный Cv/Kv компонента.",
        },
      ],
    },

    code: {
      title:
        "Реализация расчёта на Python",

      introduction:
        "Пример включает формулу Черчилля, модель калибровочной скорости и коррекции канала и отверстия.",

      note:
        "Параметры должны подтверждаться испытаниями конкретного компонента.",
    },

    conclusion: {
      title: "Практический вывод",

      paragraphs: [
        "Cv/Kv остаётся удобным параметром сравнения, если известны условия его определения.",
        "Для микрофлюидного оборудования необходимо определить режим, учесть реальную геометрию и проверить результат испытанием.",
        "Такой подход снижает риск недостаточного давления и повышает надёжность жидкостного контура.",
      ],
    },
  },
};

function normalizeLocale(
  locale: string
): SupportedLocale {
  if (
    locale === "en" ||
    locale === "es" ||
    locale === "fr" ||
    locale === "ko" ||
    locale === "ru"
  ) {
    return locale;
  }

  return "zh-CN";
}

interface CvKvMicrofluidicsArticleProps {
  locale: string;
}

export default function CvKvMicrofluidicsArticle({
  locale,
}: CvKvMicrofluidicsArticleProps) {
  const copy =
    COPY[normalizeLocale(locale)];

  const tableRows =
    BASE_TABLE_ROWS.map(
      (row, index) => ({
        ...row,
        assessment:
          copy.channel.assessments[index]
            ?.assessment ?? "",
      })
    );

  return (
    <>
      <article className={styles.contentBlock}>
        <h2>{copy.intro.title}</h2>

        {copy.intro.paragraphs.map(
          (paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          )
        )}

        <aside className={styles.technicalNotice}>
          {copy.intro.notice}
        </aside>
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.assumptions.title}</h2>

        {copy.assumptions.paragraphs.map(
          (paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          )
        )}

        <div className={styles.pagerGrid}>
          {copy.assumptions.cards.map(
            (card) => (
              <div
                className={styles.pagerCard}
                key={card.label}
              >
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <em>{card.description}</em>
              </div>
            )
          )}
        </div>
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.correction.title}</h2>

        {copy.correction.paragraphs.map(
          (paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          )
        )}

        <div className={styles.pagerGrid}>
          {copy.correction.cards.map(
            (card) => (
              <div
                className={styles.pagerCard}
                key={card.label}
              >
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <em>{card.description}</em>
              </div>
            )
          )}
        </div>
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.channel.title}</h2>

        {copy.channel.paragraphs.map(
          (paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          )
        )}

        <div className={styles.pagerGrid}>
          <div className={styles.pagerCard}>
            <span>
              {copy.channel.card.label}
            </span>

            <strong>
              {copy.channel.card.value}
            </strong>

            <em>
              {copy.channel.card.description}
            </em>
          </div>
        </div>

        <div className={styles.technicalTableWrap}>
          <table className={styles.technicalTable}>
            <thead>
              <tr>
                {copy.channel.tableHeaders.map(
                  (header) => (
                    <th key={header}>
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>
              {tableRows.map((row) => (
                <tr key={row.diameter}>
                  <td>{row.diameter}</td>
                  <td>{row.reynolds}</td>
                  <td>{row.friction}</td>
                  <td>{row.assessment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className={styles.technicalNotice}>
          {copy.channel.notice}
        </aside>
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.orifice.title}</h2>

        {copy.orifice.paragraphs.map(
          (paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          )
        )}

        <div className={styles.pagerGrid}>
          {copy.orifice.cards.map(
            (card) => (
              <div
                className={styles.pagerCard}
                key={card.label}
              >
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <em>{card.description}</em>
              </div>
            )
          )}
        </div>
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.rules.title}</h2>

        <ol className={styles.technicalRuleList}>
          {copy.rules.items.map(
            (rule) => (
              <li key={rule.title}>
                <strong>
                  {rule.title}
                </strong>

                <p>
                  {rule.description}
                </p>
              </li>
            )
          )}
        </ol>
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.code.title}</h2>

        <p>{copy.code.introduction}</p>

        <pre className={styles.technicalCode}>
          <code>{PYTHON_CODE}</code>
        </pre>

        <p>{copy.code.note}</p>
      </article>

      <article className={styles.contentBlock}>
        <h2>{copy.conclusion.title}</h2>

        {copy.conclusion.paragraphs.map(
          (paragraph) => (
            <p key={paragraph}>
              {paragraph}
            </p>
          )
        )}
      </article>
    </>
  );
}