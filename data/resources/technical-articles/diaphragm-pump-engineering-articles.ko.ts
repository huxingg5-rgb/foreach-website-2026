import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";

const FLOW_ASSET_BASE =
  "/images/resources/technical-articles/diaphragm-pump-flow-pressure-curve-guide";
const LIFE_ASSET_BASE =
  "/images/resources/technical-articles/micro-diaphragm-pump-continuous-duty-life";

export const diaphragmPumpFlowPressureCurveKoCopy = {
  metadata: {
    title: "다이어프램 펌프 유량-압력 곡선 읽는 법과 실제 작동점 계산",
    seoTitle: "다이어프램 펌프 유량-압력 곡선과 시스템 작동점 | FOREACH",
    seoDescription:
      "펌프 곡선, 시스템 저항, 입구 음압, 출구 배압, 튜브 내경, 점도와 시험 조건으로 소형 다이어프램 펌프의 장착 유량을 판단하는 방법을 설명합니다.",
    coverImage: `${FLOW_ASSET_BASE}/article-cover.webp`,
    coverAlt: "유량과 압력을 시험 중인 FOREACH 소형 다이어프램 펌프",
  },
  deck:
    "카탈로그의 300 또는 600 mL/min은 장비 내부에서 항상 유지되는 유량이 아닙니다. 실제 유량은 실제 유체, 입·출구 압력, 튜브, 밸브, 필터와 전원 조건에서 펌프 곡선과 시스템 곡선이 만나는 지점에서 결정됩니다.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "동일한 펌프라도 물, 짧은 튜브와 낮은 배압에서는 자유 유량에 근접할 수 있지만, 필터·밸브·니들·작은 내경 또는 점도가 높은 시약을 추가하면 유량이 크게 낮아질 수 있습니다. 이것만으로 펌프 불량을 의미하지는 않습니다.",
    },
    {
      type: "notice",
      label: "핵심:",
      text:
        "장착 유량은 펌프 하나가 아니라 펌프 곡선, 시스템 곡선과 시험 조건이 함께 결정합니다.",
    },
    {
      type: "figure",
      src: `${FLOW_ASSET_BASE}/article-cover.webp`,
      alt: "계측기에 연결된 소형 다이어프램 펌프",
      width: 1304,
      height: 837,
      caption: "자유 유량은 출발점이며 실제 작동점은 완성된 유로에서 확인해야 합니다.",
    },
  ],
  sections: [
    {
      title: "1. 곡선의 정의와 시험 조건부터 확인하십시오",
      blocks: [
        {
          type: "table",
          headers: ["항목", "확인할 조건", "일반적인 오해"],
          rows: [
            ["전원", "펌프 단자 전압, 전류 제한과 PWM", "서로 다른 회전수 곡선 비교"],
            ["유체", "점도, 온도, 밀도와 혼입 기체", "물 곡선을 다른 시약에 그대로 적용"],
            ["압력", "입구 음압, 출구 게이지압과 측정 위치", "정의되지 않은 두 압력의 단순 합산"],
            ["유로", "내경, 길이, 밸브, 필터와 말단 저항", "저저항 벤치 유량을 장착 유량으로 간주"],
          ],
        },
        { type: "formula", expression: "ΔPpump = Pout - Pin" },
      ],
    },
    {
      title: "2. 펌프 곡선과 시스템 곡선의 교점이 작동점입니다",
      blocks: [
        {
          type: "paragraph",
          text:
            "차압이 증가하면 펌프 곡선의 유량은 보통 낮아집니다. 반면 시스템 곡선은 유량이 증가할수록 튜브, 피팅, 밸브와 필터에서 더 큰 압력이 필요하므로 상승합니다. 두 곡선의 교점이 실제 장착 작동점입니다.",
        },
        {
          type: "formula",
          expression:
            "ΔPsystem = ΔPstatic + ΔPfriction + ΣΔPlocal + ΔPterminal",
        },
        {
          type: "figure",
          src: `${FLOW_ASSET_BASE}/pump-system-operating-point-en.webp`,
          alt: "펌프 곡선과 저항이 다른 시스템 곡선의 작동점",
          width: 1200,
          height: 658,
          caption:
            "내경을 키우면 작동점은 고유량 쪽으로, 필터 막힘이나 작은 니들은 저유량·고차압 쪽으로 이동합니다. 개념도이며 특정 모델의 시험 데이터가 아닙니다.",
        },
      ],
    },
    {
      title: "3. 튜브 내경은 압력 손실을 크게 좌우합니다",
      blocks: [
        {
          type: "formula",
          expression: "ΔP = 128μLQ / (πD⁴)",
          note:
            "원형 튜브의 안정된 층류 조건에서 압력 손실은 D에 매우 민감하며 점도, 길이와 유량에 따라 증가합니다.",
        },
        {
          type: "figure",
          src: `${FLOW_ASSET_BASE}/tube-diameter-pressure-loss-en.webp`,
          alt: "1.6, 2.0 및 3.2 mm 내경 튜브의 압력 손실 비교",
          width: 1200,
          height: 600,
          caption:
            "20 °C 물, 1 m, 100 mL/min에서 내경을 3.2에서 1.6 mm로 줄이면 이상적인 직관 손실은 약 16배가 됩니다. 실제 장비에는 밸브, 필터와 높이 차가 추가됩니다.",
        },
      ],
    },
    {
      title: "4. 반복 가능한 시험으로 장착 작동점을 확인하십시오",
      blocks: [
        {
          type: "figure",
          src: `${FLOW_ASSET_BASE}/installed-flow-test-loop-en.webp`,
          alt: "소형 다이어프램 펌프의 반복 가능한 장착 유량 시험 회로",
          width: 1200,
          height: 600,
          caption:
            "유체와 온도를 고정하고 Pin, Pout, 펌프 단자 전압·전류를 동시에 기록한 뒤 누적 질량 또는 체적으로 유량을 교차 확인합니다.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "동일한 절차로 프라이밍과 배기를 수행합니다.",
            "튜브, 밸브, 필터, 높이와 측정 방식을 고정합니다.",
            "정의된 열적·유동 정상 상태까지 기다립니다.",
            "압력, 전압, 전류, 온도와 유량을 동기 기록합니다.",
            "각 조건을 최소 3회 반복하고 원시 데이터를 보존합니다.",
          ],
        },
      ],
    },
  ],
  faqTitle: "자주 묻는 질문",
  faqItems: [
    {
      question: "장비에 설치한 유량이 사양서보다 낮은 이유는 무엇입니까?",
      answer:
        "튜브, 필터, 밸브, 높이 차, 입·출구 압력, 점도, 펌프 단자 전압과 측정 방식이 작동점을 이동시키기 때문입니다.",
    },
    {
      question: "300 mL/min 표시는 정격 압력에서도 300 mL/min이라는 뜻입니까?",
      answer:
        "반드시 그렇지는 않습니다. 자유 유량과 정격 압력은 서로 다른 작동점을 나타낼 수 있으므로 요구 압력에서 측정 곡선을 읽어야 합니다.",
    },
    {
      question: "장착 시험에서 무엇을 기록해야 합니까?",
      answer:
        "입·출구 압력, 펌프 단자 전압과 전류, 유체 온도, 누적 질량 또는 체적과 샘플링 시간을 기록하고 유로 조건을 고정하십시오.",
    },
  ],
  cta: {
    title: "실제 작동점 확인이 필요하십니까?",
    description:
      "목표 유량, 압력 범위, 유체와 점도, 튜브, 필터, 밸브, 전원과 듀티 사이클을 공유하면 적합한 펌프와 시험 조건을 검토할 수 있습니다.",
    contactLabel: "엔지니어 문의",
    productsLabel: "다이어프램 펌프 보기",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;

export const microDiaphragmPumpContinuousDutyLifeKoCopy = {
  metadata: {
    title: "소형 다이어프램 펌프는 얼마나 오래 연속 운전할 수 있습니까?",
    seoTitle: "소형 다이어프램 펌프 연속 운전과 수명 평가 | FOREACH",
    seoDescription:
      "연속 운전, 누적 수명, 브러시·브러시리스 모터, 임무 프로파일, 고장 기준, 내구 시험과 B10 신뢰성의 차이를 설명합니다.",
    coverImage: `${LIFE_ASSET_BASE}/article-cover.webp`,
    coverAlt: "연속 운전 시험 중인 FOREACH 소형 다이어프램 펌프",
  },
  deck:
    "연속 운전 가능은 무제한 수명을 뜻하지 않습니다. 연속 운전 능력, 누적 운전 수명, 달력 수명과 통계적 신뢰성은 서로 다른 개념이며 실제 부하, 유체, 구동과 환경 조건에 따라 달라집니다.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "OEM 장비에서는 모터가 계속 회전하는지만 볼 수 없습니다. 실제 임무 프로파일 동안 정상 시동, 요구 압력에서의 유량, 전류와 온도 제한, 누설, 소음과 제어 기능을 모두 유지해야 합니다.",
    },
    {
      type: "notice",
      label: "엔지니어링 원칙:",
      text:
        "수명 시간은 전압, 부하, 유체, 온도, 운전 패턴, 샘플 수와 고장 판정 기준과 함께 읽어야 합니다.",
    },
    {
      type: "figure",
      src: `${LIFE_ASSET_BASE}/article-cover.webp`,
      alt: "내구 시험 계측기에 연결된 소형 다이어프램 펌프",
      width: 1304,
      height: 837,
      caption: "연속 운전은 운전 모드이고, 수명은 정의된 기능 한계에 도달할 때까지의 누적 시간입니다.",
    },
  ],
  sections: [
    {
      title: "1. 장비 임무 프로파일을 펌프 수명 요구로 변환하십시오",
      blocks: [
        {
          type: "formula",
          expression: "Ttotal = Σ(Ni × ti)",
          note: "상태별 통전 시간을 합산하고 시동 횟수와 부하 분포는 별도로 관리합니다.",
        },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/duty-profile-lifetime-demand-en.webp`,
          alt: "운전 시간, 시동 횟수와 부하 분포를 포함한 임무 프로파일",
          width: 1200,
          height: 675,
          caption:
            "장비 사용 연수는 펌프 운전 시간이 아닙니다. 각 상태의 통전 시간, 시동, 압력, 전류와 온도를 기록하십시오.",
        },
      ],
    },
    {
      title: "2. 브러시와 브러시리스 모터의 수명 차이",
      blocks: [
        {
          type: "paragraph",
          text:
            "브러시 DC 모터는 브러시와 정류자의 기계 접촉으로 마모와 아크가 발생합니다. 전자 정류는 이 마모 원인을 제거하지만 베어링, 권선, 전자부품, 다이어프램과 밸브의 수명 한계까지 없애지는 않습니다.",
        },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/brushed-vs-brushless-commutation-en.webp`,
          alt: "기계식 브러시 정류와 전자식 브러시리스 정류 비교",
          width: 1200,
          height: 675,
          caption: "브러시리스는 브러시 마모를 제거하지만 모터와 펌프 헤드 전체의 검증은 여전히 필요합니다.",
        },
      ],
    },
    {
      title: "3. 실제 부하를 재현하고 시험 전에 고장을 정의하십시오",
      blocks: [
        { type: "formula", expression: "Pcopper = I²R" },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/lifetime-load-factors-en.webp`,
          alt: "유로 부하에서 전류, 온도, 부품 응력과 수명으로 이어지는 인과 관계",
          width: 1200,
          height: 675,
          caption:
            "배압, 입구 저항, PWM, 시동, 유체와 온도는 지배적인 고장 모드를 바꿀 수 있습니다.",
        },
        {
          type: "notice",
          text:
            "시험 전 시동, 유량, 전류, 온도, 누설, 소음과 제어의 허용 한계를 정하십시오. 계속 회전하는 펌프도 장비 요구에서는 이미 고장일 수 있습니다.",
        },
      ],
    },
    {
      title: "4. 단일 샘플 내구와 B10 신뢰성은 같은 증거가 아닙니다",
      blocks: [
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/reliability-evidence-levels-en.webp`,
          alt: "단일 내구 시험에서 통계적 신뢰성 선언까지의 증거 수준",
          width: 1200,
          height: 675,
          caption:
            "한 대가 10,000시간을 달성하면 그 샘플의 내구 결과를 뒷받침합니다. B10에는 여러 샘플, 고장 정의, 통계 처리와 신뢰 수준이 필요합니다.",
        },
        { type: "formula", expression: "R(t) = exp[-(t / η)^β]" },
        {
          type: "figure",
          src: `${LIFE_ASSET_BASE}/b10-weibull-reliability-en.webp`,
          alt: "R(t)=0.9에서 B10을 표시한 개념적 Weibull 신뢰도 곡선",
          width: 1200,
          height: 675,
          caption:
            "B10은 모델에서 누적 고장률 10%에 해당하는 시간입니다. 그림은 개념도이며 FOREACH 모델의 측정 수명 분포가 아닙니다.",
        },
      ],
    },
  ],
  faqTitle: "자주 묻는 질문",
  faqItems: [
    {
      question: "소형 다이어프램 펌프를 하루 24시간 운전할 수 있습니까?",
      answer:
        "선택한 구성이 지정 전압, 압력, 유체, 주위 온도와 냉각 조건에서 연속 운전으로 검증된 경우에만 가능합니다. 24/7 운전 중에도 누적 수명은 계속 증가합니다.",
    },
    {
      question: "브러시리스 버전이 일반적으로 더 긴 이유는 무엇입니까?",
      answer:
        "브러시와 정류자 사이의 기계적 마모를 제거하기 때문입니다. 베어링, 권선, 전자부품과 펌프 헤드는 각각의 한계가 남습니다.",
    },
    {
      question: "한 대가 10,000시간을 달성하면 B10을 선언할 수 있습니까?",
      answer:
        "아닙니다. B10은 다수 샘플, 고장 정의, 수명 데이터, 통계 모델과 신뢰 수준이 필요한 모집단 지표입니다.",
    },
  ],
  cta: {
    title: "3,000시간과 10,000시간 버전 중 무엇이 필요합니까?",
    description:
      "목표 사용 연수, 일일 운전 시간, 시동 횟수, 유체, 입·출구 압력, PWM, 온도와 유지보수 전략을 공유하면 브러시·브러시리스 후보를 검토할 수 있습니다.",
    contactLabel: "엔지니어 문의",
    productsLabel: "다이어프램 펌프 보기",
  },
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
