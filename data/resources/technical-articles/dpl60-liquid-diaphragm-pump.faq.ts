import type { Dpl60FaqCopyMap } from "./dpl60-liquid-diaphragm-pump.types";

export const dpl60ArticleFaqCopy = {
  "zh-CN": {
    title: "常见问题 FAQ",
    items: [
      {
        question: "DPL60的600 mL/min是实际装机流量吗？",
        answer:
          "不是固定装机流量。600 mL/min为空载流量基准，实际流量会受到入口负压、出口压力、管路、阀、过滤器、接头、液位差和介质状态影响。",
      },
      {
        question: "DPL60在100 kPa时还能达到600 mL/min吗？",
        answer:
          "不能把600 mL/min与100 kPa视为同一个工作点。额定压力和空载流量是不同指标，目标压力下的流量应结合正式流量—压力曲线和装机测试判断。",
      },
      {
        question: "DPL60有刷和无刷版本怎么选？",
        answer:
          "有刷版本规格寿命为3000 h，无刷版本为10000 h，均对应额定电压、连续运行条件。长期运行或需要PWM、方向控制、转速反馈的设备可优先评估无刷版本。",
      },
    ],
  },
  en: {
    title: "Frequently asked questions",
    items: [
      {
        question: "Is 600 mL/min the installed flow rate of the DPL60?",
        answer:
          "No. It is the no-load flow reference. In-system flow changes with inlet vacuum, outlet pressure, tubing, valves, filters, fittings, liquid level and fluid properties.",
      },
      {
        question: "Does the DPL60 still deliver 600 mL/min at 100 kPa?",
        answer:
          "The 600 mL/min no-load flow and the 100 kPa rated pressure are not one operating point. Read the official flow-pressure curve and verify the assembled circuit at the required pressure.",
      },
      {
        question: "How should I choose between brushed and brushless DPL60 versions?",
        answer:
          "The specified life is 3,000 h for the brushed version and 10,000 h for the brushless version, both at rated voltage under continuous operation. Consider brushless configurations for longer duty or when PWM, direction control or speed feedback is required.",
      },
    ],
  },
  es: {
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿600 mL/min es el caudal real del DPL60 una vez instalado?",
        answer:
          "No. Es la referencia de caudal sin carga. El caudal en el equipo cambia con el vacío de entrada, la presión de salida, los tubos, las válvulas, los filtros, los racores, el desnivel y las propiedades del líquido.",
      },
      {
        question: "¿El DPL60 mantiene 600 mL/min a 100 kPa?",
        answer:
          "El caudal sin carga de 600 mL/min y la presión nominal de 100 kPa no corresponden al mismo punto de trabajo. Debe consultarse la curva oficial y validarse el circuito montado.",
      },
      {
        question: "¿Cómo elegir entre DPL60 con escobillas y sin escobillas?",
        answer:
          "La vida especificada es de 3.000 h para la versión con escobillas y 10.000 h para la versión sin escobillas, a tensión nominal y en funcionamiento continuo. La versión sin escobillas es preferible para ciclos largos o control PWM, de sentido y realimentación de velocidad.",
      },
    ],
  },
  fr: {
    title: "Questions fréquentes",
    items: [
      {
        question: "Les 600 mL/min correspondent-ils au débit réel du DPL60 installé ?",
        answer:
          "Non. Il s'agit du débit de référence à vide. Le débit dans l'instrument varie avec la dépression d'aspiration, la pression de refoulement, les tuyaux, vannes, filtres, raccords, différences de niveau et propriétés du liquide.",
      },
      {
        question: "Le DPL60 fournit-il encore 600 mL/min à 100 kPa ?",
        answer:
          "Le débit à vide de 600 mL/min et la pression nominale de 100 kPa ne constituent pas un même point de fonctionnement. Il faut lire la courbe officielle et valider le circuit assemblé.",
      },
      {
        question: "Comment choisir entre DPL60 à balais et sans balais ?",
        answer:
          "La durée de vie spécifiée est de 3 000 h pour la version à balais et de 10 000 h pour la version sans balais, à la tension nominale en fonctionnement continu. La version sans balais convient mieux aux longues durées ou aux besoins PWM, sens de rotation et retour vitesse.",
      },
    ],
  },
  ko: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "DPL60의 600 mL/min은 장비 장착 후 실제 유량입니까?",
        answer:
          "아닙니다. 600 mL/min은 무부하 유량 기준입니다. 실제 유량은 입구 진공도, 출구 압력, 튜브, 밸브, 필터, 피팅, 액면 높이 차이와 유체 특성에 따라 달라집니다.",
      },
      {
        question: "DPL60은 100 kPa에서도 600 mL/min을 유지합니까?",
        answer:
          "600 mL/min 무부하 유량과 100 kPa 정격 압력은 하나의 운전점이 아닙니다. 공식 유량-압력 곡선을 확인하고 실제 유로에서 목표 압력 조건을 검증해야 합니다.",
      },
      {
        question: "DPL60 브러시형과 브러시리스형은 어떻게 선택합니까?",
        answer:
          "정격 전압·연속 운전 조건에서 규격 수명은 브러시형 3,000 h, 브러시리스형 10,000 h입니다. 장시간 운전이나 PWM, 방향 제어, 속도 피드백이 필요하면 브러시리스 구성을 우선 검토할 수 있습니다.",
      },
    ],
  },
  ru: {
    title: "Часто задаваемые вопросы",
    items: [
      {
        question: "Являются ли 600 мл/мин фактической подачей DPL60 после установки?",
        answer:
          "Нет. Это значение подачи без нагрузки. Реальная подача зависит от разрежения на входе, давления на выходе, трубок, клапанов, фильтров, фитингов, перепада уровней и свойств жидкости.",
      },
      {
        question: "Обеспечивает ли DPL60 600 мл/мин при 100 кПа?",
        answer:
          "Подача без нагрузки 600 мл/мин и номинальное давление 100 кПа не являются одной рабочей точкой. Нужно использовать официальную напорно-расходную характеристику и испытать собранный контур.",
      },
      {
        question: "Как выбрать щёточную или бесщёточную версию DPL60?",
        answer:
          "Указанный ресурс составляет 3000 ч для щёточной и 10 000 ч для бесщёточной версии при номинальном напряжении и непрерывной работе. Бесщёточную версию целесообразно рассматривать для длительной работы, ШИМ, управления направлением и обратной связи по скорости.",
      },
    ],
  },
} as const satisfies Dpl60FaqCopyMap;
