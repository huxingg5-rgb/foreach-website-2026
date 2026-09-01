import type { SelectionLocale } from "@/data/products/selection/product-selection.types";
import type { ProductMotorComparisonContent } from "@/data/products/detail/product-detail.types";
import {
  diaphragmPumpReferenceModels,
  type DiaphragmPumpReferenceCopyKey,
} from "@/data/products/detail/diaphragm-pump-reference-models";
import { getDiaphragmPumpPath } from "@/data/products/detail/diaphragm-pump-routes";

type MotorComparisonCopyKey = Extract<
  DiaphragmPumpReferenceCopyKey,
  | "dpl30-brushed"
  | "dpl30-brushless"
  | "dpl60-brushed"
  | "dpl60-brushless"
  | "dpl30h-brushed"
  | "dpl30h-brushless"
>;

type MotorComparisonSeries = "DPL30" | "DPL60" | "DPL30H";

type MotorComparisonColumnLocaleCopy = {
  title: string;
  seriesParagraph: Record<MotorComparisonSeries, string>;
  paragraphs: string[];
};

type MotorComparisonLocaleCopy = {
  title: string;
  brushed: MotorComparisonColumnLocaleCopy;
  brushless: MotorComparisonColumnLocaleCopy;
  counterpartLinkText: Record<MotorComparisonCopyKey, string>;
};

const MOTOR_COMPARISON_PAGES: Record<
  MotorComparisonCopyKey,
  { counterpart: MotorComparisonCopyKey }
> = {
  "dpl30-brushed": { counterpart: "dpl30-brushless" },
  "dpl30-brushless": { counterpart: "dpl30-brushed" },
  "dpl60-brushed": { counterpart: "dpl60-brushless" },
  "dpl60-brushless": { counterpart: "dpl60-brushed" },
  "dpl30h-brushed": { counterpart: "dpl30h-brushless" },
  "dpl30h-brushless": { counterpart: "dpl30h-brushed" },
};

const HIGH_PRESSURE_MOTOR_COMPARISON_COPY: Record<
  SelectionLocale,
  {
    title: string;
    brushedAdditionalParagraph: string;
    brushlessAdditionalParagraph: string;
  }
> = {
  zh: {
    title: "有刷与无刷高压微型液体隔膜泵怎么选？",
    brushedAdditionalParagraph:
      "有刷电机内部存在机械电刷与换向器接触，长期运行会产生电刷磨损颗粒，同时机械换向过程中可能产生火花和瞬态电气噪声。如果整机对维护周期、内部洁净度或 EMC 有更高要求，应进一步评估无刷版本。",
    brushlessAdditionalParagraph:
      "无刷电机并不意味着不存在电磁干扰。电子换向及驱动电路仍可能产生电磁噪声，最终 EMC 表现需要结合整机电源、线束、接地、屏蔽和控制系统进行验证。",
  },
  en: {
    title:
      "Brushed vs Brushless High-Pressure Miniature Liquid Diaphragm Pump: Which Should You Choose?",
    brushedAdditionalParagraph:
      "Mechanical brushes remain in contact with the commutator inside the motor, so extended operation produces brush-wear particles and mechanical commutation may generate arcing and transient electrical noise. If the complete instrument has stricter maintenance, internal-cleanliness or EMC requirements, the brushless version should be evaluated.",
    brushlessAdditionalParagraph:
      "Brushless operation does not eliminate electromagnetic interference. Electronic commutation and the driver circuitry can still generate electromagnetic noise, so final EMC performance must be verified with the complete power supply, wiring, grounding, shielding and control system.",
  },
  es: {
    title:
      "¿Bomba miniatura de diafragma de alta presión con motor con escobillas o sin escobillas?",
    brushedAdditionalParagraph:
      "Las escobillas mecánicas permanecen en contacto con el conmutador dentro del motor, por lo que el funcionamiento prolongado genera partículas de desgaste y la conmutación mecánica puede producir chispas y ruido eléctrico transitorio. Si el equipo completo tiene requisitos más estrictos de mantenimiento, limpieza interna o EMC, debe evaluarse la versión sin escobillas.",
    brushlessAdditionalParagraph:
      "Un motor sin escobillas no elimina las interferencias electromagnéticas. La conmutación electrónica y el circuito de accionamiento aún pueden generar ruido electromagnético, por lo que el comportamiento EMC final debe verificarse con la fuente de alimentación, el cableado, la puesta a tierra, el apantallamiento y el sistema de control completos.",
  },
  fr: {
    title:
      "Pompe à membrane miniature haute pression à moteur à balais ou sans balais : laquelle choisir ?",
    brushedAdditionalParagraph:
      "Les balais mécaniques restent en contact avec le collecteur à l’intérieur du moteur ; un fonctionnement prolongé produit donc des particules d’usure, tandis que la commutation mécanique peut générer des étincelles et du bruit électrique transitoire. Si l’instrument présente des exigences plus strictes de maintenance, de propreté interne ou de CEM, la version sans balais doit être évaluée.",
    brushlessAdditionalParagraph:
      "Un moteur sans balais n’élimine pas les interférences électromagnétiques. La commutation électronique et le circuit de commande peuvent encore produire du bruit électromagnétique ; les performances CEM finales doivent donc être vérifiées avec l’alimentation, le câblage, la mise à la terre, le blindage et le système de commande complets.",
  },
  ko: {
    title:
      "유브러시와 무브러시 고압 소형 액체 다이어프램 펌프는 어떻게 선택해야 합니까?",
    brushedAdditionalParagraph:
      "모터 내부의 기계식 브러시와 정류자는 계속 접촉하므로 장시간 운전 시 브러시 마모 입자가 발생하고 기계식 정류 과정에서 스파크와 순간적인 전기 노이즈가 생길 수 있습니다. 완성 장비의 유지보수 주기, 내부 청정도 또는 EMC 요구가 더 엄격하면 무브러시 버전을 검토해야 합니다.",
    brushlessAdditionalParagraph:
      "무브러시 모터라고 해서 전자기 간섭이 없어지는 것은 아닙니다. 전자식 정류와 드라이버 회로에서도 전자기 노이즈가 발생할 수 있으므로 최종 EMC 성능은 완성 장비의 전원, 배선, 접지, 차폐 및 제어 시스템과 함께 검증해야 합니다.",
  },
  ru: {
    title:
      "Миниатюрный жидкостный мембранный насос высокого давления со щеточным или бесщеточным двигателем: что выбрать?",
    brushedAdditionalParagraph:
      "Механические щетки постоянно контактируют с коллектором внутри двигателя, поэтому при длительной работе образуются частицы износа, а механическая коммутация может сопровождаться искрением и кратковременными электрическими помехами. Если к обслуживанию, внутренней чистоте или ЭМС готового прибора предъявляются повышенные требования, следует оценить бесщеточную версию.",
    brushlessAdditionalParagraph:
      "Бесщеточный двигатель не устраняет электромагнитные помехи полностью. Электронная коммутация и схема драйвера могут создавать электромагнитный шум, поэтому итоговые характеристики ЭМС необходимо проверять вместе с источником питания, проводкой, заземлением, экранированием и системой управления готового прибора.",
  },
};

const MOTOR_COMPARISON_COPY: Record<SelectionLocale, MotorComparisonLocaleCopy> = {
  zh: {
    title: "有刷与无刷微型液体隔膜泵怎么选？",
    brushed: {
      title: "有刷电机",
      seriesParagraph: {
        DPL30:
          "有刷版本采用机械电刷与换向器进行换向，结构成熟，适合工作周期明确、对成本较敏感的仪器设备。DPL30 有刷版本的规定使用寿命为 3,000 h，实际寿命仍会受到负载、启停频率、环境温度和整机工作周期影响。",
        DPL60:
          "有刷版本采用机械电刷与换向器进行换向，结构成熟，适合工作周期明确、对成本较敏感的仪器设备。DPL60 有刷版本的规定使用寿命为 3,000 h，实际寿命仍会受到负载、启停频率、环境温度和整机工作周期影响。",
        DPL30H:
          "DPL30H 有刷版本采用直流有刷电机，规定使用寿命为 3,000 h，适合工作周期明确、对成本较敏感，并且高压输送任务不是长期连续运行的仪器设备。",
      },
      paragraphs: [
        "电刷与换向器长期接触会在电机内部产生磨损颗粒，机械换向过程中也可能产生火花和瞬态电气噪声。因此，如果设备对维护周期、内部洁净度或 EMC 有更高要求，应结合整机设计进一步评估无刷版本。电刷磨损发生在电机内部，不应描述为会直接污染泵送液体。",
      ],
    },
    brushless: {
      title: "无刷电机",
      seriesParagraph: {
        DPL30:
          "无刷版本采用电子换向，不存在机械电刷磨损和电刷换向火花。DPL30 无刷版本的规定使用寿命为 10,000 h，更适合长时间运行、维护周期较长，或对设备内部洁净度要求较高的仪器。",
        DPL60:
          "无刷版本采用电子换向，不存在机械电刷磨损和电刷换向火花。DPL60 无刷版本的规定使用寿命为 10,000 h，更适合长时间运行、维护周期较长，或对设备内部洁净度要求较高的仪器。",
        DPL30H:
          "DPL30H 无刷版本采用电子换向，没有机械电刷磨损和电刷换向火花，规定使用寿命为 10,000 h，更适合运行时间较长或维护周期要求较高的高阻力液路设备。",
      },
      paragraphs: [
        "无刷电机并不代表没有电磁干扰。电子换向和驱动器的开关过程仍可能产生电磁噪声，最终 EMC 表现需要结合整机电源、驱动电路、线束、接地、屏蔽和结构设计进行验证。",
      ],
    },
    counterpartLinkText: {
      "dpl30-brushed": "查看 300 mL/min 无刷微型液体隔膜泵 →",
      "dpl30-brushless": "查看 300 mL/min 有刷微型液体隔膜泵 →",
      "dpl60-brushed": "查看 600 mL/min 无刷微型液体隔膜泵 →",
      "dpl60-brushless": "查看 600 mL/min 有刷微型液体隔膜泵 →",
      "dpl30h-brushed": "查看 DPL30H 无刷高压微型液体隔膜泵 →",
      "dpl30h-brushless": "查看 DPL30H 有刷高压微型液体隔膜泵 →",
    },
  },
  en: {
    title: "Brushed vs Brushless Diaphragm Pump: Which Motor Version Should You Choose?",
    brushed: {
      title: "Brushed Motor",
      seriesParagraph: {
        DPL30:
          "The brushed version uses mechanical brushes and a commutator for motor commutation. It is a mature and cost-effective configuration for instruments with a defined operating cycle. The specified service life of the brushed DPL30 version is 3,000 h, while actual life also depends on load, start-stop frequency, ambient temperature and the equipment duty cycle.",
        DPL60:
          "The brushed version uses mechanical brushes and a commutator for motor commutation. It is a mature and cost-effective configuration for instruments with a defined operating cycle. The specified service life of the brushed DPL60 version is 3,000 h, while actual life also depends on load, start-stop frequency, ambient temperature and the equipment duty cycle.",
        DPL30H:
          "The brushed DPL30H version uses a brushed DC motor and has a specified service life of 3,000 h. It is suited to cost-sensitive instruments with a defined duty cycle where high-pressure transfer is not required for continuous long-term operation.",
      },
      paragraphs: [
        "Long-term contact between the brushes and commutator produces wear particles inside the motor, and mechanical commutation can also generate arcing and transient electrical noise. For instruments with stricter requirements on maintenance intervals, internal cleanliness or EMC, the brushless version should also be evaluated. Brush wear occurs inside the motor and must not be described as direct contamination of the pumped liquid.",
      ],
    },
    brushless: {
      title: "Brushless Motor",
      seriesParagraph: {
        DPL30:
          "The brushless version uses electronic commutation and has no mechanical carbon brushes or brush-commutation arcing. The specified service life of the brushless DPL30 version is 10,000 h, making it more suitable for longer operating cycles, extended maintenance intervals or instruments with higher internal-cleanliness requirements.",
        DPL60:
          "The brushless version uses electronic commutation and has no mechanical carbon brushes or brush-commutation arcing. The specified service life of the brushless DPL60 version is 10,000 h, making it more suitable for longer operating cycles, extended maintenance intervals or instruments with higher internal-cleanliness requirements.",
        DPL30H:
          "The brushless DPL30H version uses electronic commutation, with no mechanical brush wear or brush-commutation arcing. Its specified service life is 10,000 h, making it better suited to high-resistance fluid systems that require longer operating periods or extended maintenance intervals.",
      },
      paragraphs: [
        "Brushless does not mean zero electromagnetic interference. Electronic commutation and switching in the motor driver can still generate electrical noise. Final EMC performance should therefore be verified with the complete power supply, driver electronics, wiring, grounding, shielding and enclosure design.",
      ],
    },
    counterpartLinkText: {
      "dpl30-brushed": "Compare with the 300 mL/min Brushless Liquid Diaphragm Pump →",
      "dpl30-brushless": "Compare with the 300 mL/min Brushed Liquid Diaphragm Pump →",
      "dpl60-brushed": "Compare with the 600 mL/min Brushless Liquid Diaphragm Pump →",
      "dpl60-brushless": "Compare with the 600 mL/min Brushed Liquid Diaphragm Pump →",
      "dpl30h-brushed": "Compare with the DPL30H Brushless High-Pressure Liquid Diaphragm Pump →",
      "dpl30h-brushless": "Compare with the DPL30H Brushed High-Pressure Liquid Diaphragm Pump →",
    },
  },
  es: {
    title: "¿Bomba de diafragma con motor con escobillas o sin escobillas?",
    brushed: {
      title: "Motor con escobillas",
      seriesParagraph: {
        DPL30:
          "La versión con escobillas utiliza escobillas mecánicas y un conmutador para realizar la conmutación del motor. Es una configuración madura y rentable para instrumentos con un ciclo de funcionamiento definido. La vida útil especificada de la versión DPL30 con escobillas es de 3.000 h, aunque la vida real también depende de la carga, la frecuencia de arranque y parada, la temperatura ambiente y el ciclo de trabajo del equipo.",
        DPL60:
          "La versión con escobillas utiliza escobillas mecánicas y un conmutador para realizar la conmutación del motor. Es una configuración madura y rentable para instrumentos con un ciclo de funcionamiento definido. La vida útil especificada de la versión DPL60 con escobillas es de 3.000 h, aunque la vida real también depende de la carga, la frecuencia de arranque y parada, la temperatura ambiente y el ciclo de trabajo del equipo.",
        DPL30H:
          "La versión DPL30H con escobillas utiliza un motor CC con escobillas y tiene una vida útil especificada de 3.000 h. Es adecuada para instrumentos sensibles al coste, con un ciclo de trabajo definido y sin funcionamiento continuo prolongado en tareas de transferencia a alta presión.",
      },
      paragraphs: [
        "El contacto prolongado entre las escobillas y el conmutador genera partículas de desgaste dentro del motor, y la conmutación mecánica también puede producir chispas y ruido eléctrico transitorio. Para equipos con requisitos más estrictos de mantenimiento, limpieza interna o EMC, conviene evaluar la versión sin escobillas. El desgaste de las escobillas se produce dentro del motor y no debe describirse como contaminación directa del líquido bombeado.",
      ],
    },
    brushless: {
      title: "Motor sin escobillas",
      seriesParagraph: {
        DPL30:
          "La versión sin escobillas utiliza conmutación electrónica y no dispone de escobillas de carbón ni produce chispas por conmutación mecánica. La vida útil especificada de la versión DPL30 sin escobillas es de 10.000 h, por lo que resulta más adecuada para ciclos de funcionamiento prolongados, intervalos de mantenimiento más largos o instrumentos con mayores requisitos de limpieza interna.",
        DPL60:
          "La versión sin escobillas utiliza conmutación electrónica y no dispone de escobillas de carbón ni produce chispas por conmutación mecánica. La vida útil especificada de la versión DPL60 sin escobillas es de 10.000 h, por lo que resulta más adecuada para ciclos de funcionamiento prolongados, intervalos de mantenimiento más largos o instrumentos con mayores requisitos de limpieza interna.",
        DPL30H:
          "La versión DPL30H sin escobillas utiliza conmutación electrónica, sin desgaste de escobillas mecánicas ni chispas de conmutación. Su vida útil especificada es de 10.000 h, por lo que resulta más adecuada para circuitos de alta resistencia con tiempos de funcionamiento prolongados o intervalos de mantenimiento más largos.",
      },
      paragraphs: [
        "Un motor sin escobillas no significa ausencia total de interferencias electromagnéticas. La conmutación electrónica y los circuitos de potencia del controlador también pueden generar ruido eléctrico. El comportamiento EMC final debe verificarse junto con la fuente de alimentación, el controlador, el cableado, la puesta a tierra, el apantallamiento y la carcasa del equipo.",
      ],
    },
    counterpartLinkText: {
      "dpl30-brushed": "Comparar con la bomba de diafragma para líquidos sin escobillas de 300 mL/min →",
      "dpl30-brushless": "Comparar con la bomba de diafragma para líquidos con escobillas de 300 mL/min →",
      "dpl60-brushed": "Comparar con la bomba de diafragma para líquidos sin escobillas de 600 mL/min →",
      "dpl60-brushless": "Comparar con la bomba de diafragma para líquidos con escobillas de 600 mL/min →",
      "dpl30h-brushed": "Comparar con la bomba de diafragma de alta presión DPL30H sin escobillas →",
      "dpl30h-brushless": "Comparar con la bomba de diafragma de alta presión DPL30H con escobillas →",
    },
  },
  fr: {
    title: "Pompe à membrane à moteur à balais ou sans balais : laquelle choisir ?",
    brushed: {
      title: "Moteur à balais",
      seriesParagraph: {
        DPL30:
          "La version à balais utilise des balais mécaniques et un collecteur pour assurer la commutation du moteur. Cette architecture éprouvée convient aux instruments dont le cycle de fonctionnement est clairement défini et pour lesquels le coût constitue un critère important. La durée de vie spécifiée de la version DPL30 à balais est de 3 000 h, tandis que la durée réelle dépend également de la charge, de la fréquence des démarrages, de la température ambiante et du cycle d’utilisation de l’équipement.",
        DPL60:
          "La version à balais utilise des balais mécaniques et un collecteur pour assurer la commutation du moteur. Cette architecture éprouvée convient aux instruments dont le cycle de fonctionnement est clairement défini et pour lesquels le coût constitue un critère important. La durée de vie spécifiée de la version DPL60 à balais est de 3 000 h, tandis que la durée réelle dépend également de la charge, de la fréquence des démarrages, de la température ambiante et du cycle d’utilisation de l’équipement.",
        DPL30H:
          "La version DPL30H à balais utilise un moteur CC à balais et présente une durée de vie spécifiée de 3 000 h. Elle convient aux instruments sensibles au coût, avec un cycle de fonctionnement défini, lorsque le transfert haute pression ne fonctionne pas en continu sur de longues périodes.",
      },
      paragraphs: [
        "Le contact prolongé entre les balais et le collecteur produit des particules d’usure à l’intérieur du moteur, et la commutation mécanique peut également provoquer des étincelles et du bruit électrique transitoire. Pour les équipements ayant des exigences plus élevées en matière de maintenance, de propreté interne ou de CEM, la version sans balais doit être envisagée. L’usure des balais se produit à l’intérieur du moteur et ne doit pas être présentée comme une contamination directe du liquide pompé.",
      ],
    },
    brushless: {
      title: "Moteur sans balais",
      seriesParagraph: {
        DPL30:
          "La version sans balais utilise une commutation électronique et ne comporte pas de balais en carbone ni d’étincelles dues à la commutation mécanique. La durée de vie spécifiée de la version DPL30 sans balais est de 10 000 h, ce qui la rend mieux adaptée aux cycles de fonctionnement prolongés, aux intervalles de maintenance plus longs ou aux instruments présentant des exigences plus élevées de propreté interne.",
        DPL60:
          "La version sans balais utilise une commutation électronique et ne comporte pas de balais en carbone ni d’étincelles dues à la commutation mécanique. La durée de vie spécifiée de la version DPL60 sans balais est de 10 000 h, ce qui la rend mieux adaptée aux cycles de fonctionnement prolongés, aux intervalles de maintenance plus longs ou aux instruments présentant des exigences plus élevées de propreté interne.",
        DPL30H:
          "La version DPL30H sans balais utilise une commutation électronique, sans usure de balais mécaniques ni étincelles de commutation. Sa durée de vie spécifiée est de 10 000 h, ce qui la rend mieux adaptée aux circuits à forte résistance nécessitant des périodes de fonctionnement prolongées ou des intervalles de maintenance plus longs.",
      },
      paragraphs: [
        "Un moteur sans balais ne signifie pas une absence totale d’interférences électromagnétiques. La commutation électronique et les circuits de puissance du pilote peuvent encore générer du bruit électrique. Les performances CEM finales doivent être vérifiées avec l’alimentation, l’électronique de commande, le câblage, la mise à la terre, le blindage et le boîtier complet de l’équipement.",
      ],
    },
    counterpartLinkText: {
      "dpl30-brushed": "Comparer avec la pompe à membrane pour liquides sans balais de 300 mL/min →",
      "dpl30-brushless": "Comparer avec la pompe à membrane pour liquides à balais de 300 mL/min →",
      "dpl60-brushed": "Comparer avec la pompe à membrane pour liquides sans balais de 600 mL/min →",
      "dpl60-brushless": "Comparer avec la pompe à membrane pour liquides à balais de 600 mL/min →",
      "dpl30h-brushed": "Comparer avec la pompe à membrane haute pression DPL30H sans balais →",
      "dpl30h-brushless": "Comparer avec la pompe à membrane haute pression DPL30H à balais →",
    },
  },
  ko: {
    title: "유브러시와 무브러시 액체 다이어프램 펌프는 어떻게 선택해야 합니까?",
    brushed: {
      title: "유브러시 모터",
      seriesParagraph: {
        DPL30:
          "유브러시 버전은 기계식 브러시와 정류자를 이용해 모터를 정류합니다. 구조가 성숙하고 운전 주기가 명확하며 비용을 중요하게 고려하는 장비에 적합합니다. DPL30 유브러시 버전의 규정 수명은 3,000 h이며 실제 수명은 부하, 기동·정지 빈도, 주변 온도 및 장비의 운전 주기에 따라 달라질 수 있습니다.",
        DPL60:
          "유브러시 버전은 기계식 브러시와 정류자를 이용해 모터를 정류합니다. 구조가 성숙하고 운전 주기가 명확하며 비용을 중요하게 고려하는 장비에 적합합니다. DPL60 유브러시 버전의 규정 수명은 3,000 h이며 실제 수명은 부하, 기동·정지 빈도, 주변 온도 및 장비의 운전 주기에 따라 달라질 수 있습니다.",
        DPL30H:
          "DPL30H 유브러시 버전은 유브러시 DC 모터를 사용하며 규정 수명은 3,000 h입니다. 운전 주기가 명확하고 비용을 중요하게 고려하며 고압 이송을 장기간 연속 운전하지 않는 장비에 적합합니다.",
      },
      paragraphs: [
        "브러시와 정류자가 장기간 접촉하면 모터 내부에 마모 입자가 발생할 수 있으며, 기계식 정류 과정에서 스파크와 순간적인 전기적 노이즈가 발생할 수 있습니다. 유지보수 주기, 장비 내부 청정도 또는 EMC 요구가 높은 경우에는 무브러시 버전을 함께 검토하는 것이 좋습니다. 브러시 마모는 모터 내부에서 발생하므로 펌핑되는 액체를 직접 오염시킨다고 표현해서는 안 됩니다.",
      ],
    },
    brushless: {
      title: "무브러시 모터",
      seriesParagraph: {
        DPL30:
          "무브러시 버전은 전자식 정류를 사용하며 기계식 카본 브러시의 마모와 브러시 정류 스파크가 없습니다. DPL30 무브러시 버전의 규정 수명은 10,000 h로, 더 긴 운전 주기, 긴 유지보수 간격 또는 높은 내부 청정도 요구가 있는 장비에 더 적합합니다.",
        DPL60:
          "무브러시 버전은 전자식 정류를 사용하며 기계식 카본 브러시의 마모와 브러시 정류 스파크가 없습니다. DPL60 무브러시 버전의 규정 수명은 10,000 h로, 더 긴 운전 주기, 긴 유지보수 간격 또는 높은 내부 청정도 요구가 있는 장비에 더 적합합니다.",
        DPL30H:
          "DPL30H 무브러시 버전은 전자식 정류를 사용하므로 기계식 브러시 마모와 브러시 정류 스파크가 없습니다. 규정 수명은 10,000 h이며 장시간 운전 또는 긴 유지보수 주기가 필요한 고저항 유로 장비에 더 적합합니다.",
      },
      paragraphs: [
        "무브러시 모터라고 해서 전자기 간섭이 전혀 없는 것은 아닙니다. 전자식 정류와 모터 드라이버의 스위칭 회로에서도 전기적 노이즈가 발생할 수 있습니다. 최종 EMC 성능은 전원 공급 장치, 드라이버 회로, 배선, 접지, 차폐 및 장비 하우징을 포함한 완성 시스템에서 검증해야 합니다.",
      ],
    },
    counterpartLinkText: {
      "dpl30-brushed": "300 mL/min 무브러시 액체 다이어프램 펌프와 비교 →",
      "dpl30-brushless": "300 mL/min 유브러시 액체 다이어프램 펌프와 비교 →",
      "dpl60-brushed": "600 mL/min 무브러시 액체 다이어프램 펌프와 비교 →",
      "dpl60-brushless": "600 mL/min 유브러시 액체 다이어프램 펌프와 비교 →",
      "dpl30h-brushed": "DPL30H 무브러시 고압 액체 다이어프램 펌프와 비교 →",
      "dpl30h-brushless": "DPL30H 유브러시 고압 액체 다이어프램 펌프와 비교 →",
    },
  },
  ru: {
    title: "Мембранный насос со щеточным или бесщеточным двигателем: что выбрать?",
    brushed: {
      title: "Щеточный двигатель",
      seriesParagraph: {
        DPL30:
          "Версия со щеточным двигателем использует механические щетки и коллектор для коммутации. Это проверенная и экономичная конструкция для оборудования с определённым режимом работы. Указанный ресурс щеточной версии DPL30 составляет 3 000 h, при этом фактический ресурс также зависит от нагрузки, частоты пусков и остановок, температуры окружающей среды и рабочего цикла оборудования.",
        DPL60:
          "Версия со щеточным двигателем использует механические щетки и коллектор для коммутации. Это проверенная и экономичная конструкция для оборудования с определённым режимом работы. Указанный ресурс щеточной версии DPL60 составляет 3 000 h, при этом фактический ресурс также зависит от нагрузки, частоты пусков и остановок, температуры окружающей среды и рабочего цикла оборудования.",
        DPL30H:
          "Версия DPL30H со щеточным двигателем постоянного тока имеет указанный ресурс 3 000 h. Она подходит для оборудования с заданным рабочим циклом и повышенными требованиями к стоимости, если режим подачи под высоким давлением не является длительным и непрерывным.",
      },
      paragraphs: [
        "При длительном контакте щеток с коллектором внутри двигателя образуются частицы износа, а механическая коммутация может сопровождаться искрением и кратковременными электрическими помехами. Для приборов с более высокими требованиями к интервалам обслуживания, внутренней чистоте или ЭМС следует также рассмотреть бесщеточную версию. Износ щеток происходит внутри двигателя и не должен описываться как прямое загрязнение перекачиваемой жидкости.",
      ],
    },
    brushless: {
      title: "Бесщеточный двигатель",
      seriesParagraph: {
        DPL30:
          "Бесщеточная версия использует электронную коммутацию и не имеет механических угольных щеток и искрения, связанного со щеточной коммутацией. Указанный ресурс бесщеточной версии DPL30 составляет 10 000 h, поэтому она лучше подходит для длительных рабочих циклов, увеличенных межсервисных интервалов или оборудования с повышенными требованиями к внутренней чистоте.",
        DPL60:
          "Бесщеточная версия использует электронную коммутацию и не имеет механических угольных щеток и искрения, связанного со щеточной коммутацией. Указанный ресурс бесщеточной версии DPL60 составляет 10 000 h, поэтому она лучше подходит для длительных рабочих циклов, увеличенных межсервисных интервалов или оборудования с повышенными требованиями к внутренней чистоте.",
        DPL30H:
          "Бесщеточная версия DPL30H использует электронную коммутацию, поэтому в ней нет механического износа щеток и искрения при щеточной коммутации. Указанный ресурс составляет 10 000 h, что лучше подходит для контуров с высоким гидравлическим сопротивлением, длительной работой или увеличенными межсервисными интервалами.",
      },
      paragraphs: [
        "Бесщеточный двигатель не означает полного отсутствия электромагнитных помех. Электронная коммутация и силовые ключи драйвера также могут создавать электрический шум. Итоговые характеристики ЭМС необходимо проверять вместе с источником питания, драйвером, проводкой, заземлением, экранированием и корпусом оборудования.",
      ],
    },
    counterpartLinkText: {
      "dpl30-brushed": "Сравнить с бесщеточным мембранным жидкостным насосом 300 mL/min →",
      "dpl30-brushless": "Сравнить со щеточным мембранным жидкостным насосом 300 mL/min →",
      "dpl60-brushed": "Сравнить с бесщеточным мембранным жидкостным насосом 600 mL/min →",
      "dpl60-brushless": "Сравнить со щеточным мембранным жидкостным насосом 600 mL/min →",
      "dpl30h-brushed": "Сравнить с бесщеточным мембранным насосом высокого давления DPL30H →",
      "dpl30h-brushless": "Сравнить со щеточным мембранным насосом высокого давления DPL30H →",
    },
  },
};

function isMotorComparisonCopyKey(
  copyKey: DiaphragmPumpReferenceCopyKey,
): copyKey is MotorComparisonCopyKey {
  return copyKey in MOTOR_COMPARISON_PAGES;
}

export function getDiaphragmPumpMotorComparison(
  copyKey: DiaphragmPumpReferenceCopyKey,
  locale: SelectionLocale,
): ProductMotorComparisonContent | undefined {
  if (!isMotorComparisonCopyKey(copyKey)) return undefined;

  const counterpartCopyKey = MOTOR_COMPARISON_PAGES[copyKey].counterpart;
  const counterpart = diaphragmPumpReferenceModels.find(
    (model) => model.copyKey === counterpartCopyKey,
  );
  const copy = MOTOR_COMPARISON_COPY[locale];
  const highPressureCopy = HIGH_PRESSURE_MOTOR_COMPARISON_COPY[locale];
  const series: MotorComparisonSeries = copyKey.startsWith("dpl30h")
    ? "DPL30H"
    : copyKey.startsWith("dpl30")
      ? "DPL30"
      : "DPL60";

  return {
    title:
      series === "DPL30H"
        ? highPressureCopy.title
        : copy.title,
    brushed: {
      title: copy.brushed.title,
      paragraphs: [
        copy.brushed.seriesParagraph[series],
        ...(series === "DPL30H"
          ? [highPressureCopy.brushedAdditionalParagraph]
          : copy.brushed.paragraphs),
      ],
    },
    brushless: {
      title: copy.brushless.title,
      paragraphs: [
        copy.brushless.seriesParagraph[series],
        ...(series === "DPL30H"
          ? [highPressureCopy.brushlessAdditionalParagraph]
          : copy.brushless.paragraphs),
      ],
    },
    ...(counterpart
      ? {
          counterpartHref: getDiaphragmPumpPath(locale, counterpart.slug),
          counterpartLinkText: copy.counterpartLinkText[copyKey],
        }
      : {}),
  };
}

export const DIAPHRAGM_PUMP_MOTOR_COMPARISON_COPY_KEYS = Object.keys(
  MOTOR_COMPARISON_PAGES,
) as MotorComparisonCopyKey[];
