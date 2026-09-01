import type { SelectionLocale } from "@/data/products/selection/product-selection.types";
import type { ProductMotorComparisonContent } from "@/data/products/detail/product-detail.types";
import {
  diaphragmPumpReferenceModels,
  type DiaphragmPumpReferenceCopyKey,
} from "@/data/products/detail/diaphragm-pump-reference-models";
import { getDiaphragmPumpPath } from "@/data/products/detail/diaphragm-pump-routes";

type MotorComparisonCopyKey = Extract<
  DiaphragmPumpReferenceCopyKey,
  "dpl30-brushed" | "dpl30-brushless" | "dpl60-brushed" | "dpl60-brushless"
>;

type MotorComparisonSeries = "DPL30" | "DPL60";

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
  const series: MotorComparisonSeries = copyKey.startsWith("dpl30")
    ? "DPL30"
    : "DPL60";

  return {
    title: copy.title,
    brushed: {
      title: copy.brushed.title,
      paragraphs: [
        copy.brushed.seriesParagraph[series],
        ...copy.brushed.paragraphs,
      ],
    },
    brushless: {
      title: copy.brushless.title,
      paragraphs: [
        copy.brushless.seriesParagraph[series],
        ...copy.brushless.paragraphs,
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
