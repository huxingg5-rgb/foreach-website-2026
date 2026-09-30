import type { DiaphragmPumpEngineeringArticleCopy } from "../diaphragm-pump-engineering-article.types";
import {
  getValvelessMeteringPumpOverviewArticleHref,
  getValvelessMeteringPumpOverviewProductHref,
  valvelessMeteringPumpOverviewCoverImage,
} from "./shared";

const locale = "ko" as const;
const productHref = (slug?: string) =>
  getValvelessMeteringPumpOverviewProductHref(locale, slug);
const articleHref = (slug: string) =>
  getValvelessMeteringPumpOverviewArticleHref(locale, slug);

export const valvelessMeteringPumpOverviewKo = {
  metadata: {
    title: "무밸브 정량펌프란? 작동 원리, 적용 분야 및 선정 요점",
    seoTitle: "무밸브 정량펌프란? 작동 원리와 선정 | FOREACH",
    seoDescription:
      "무밸브 정량펌프의 회전·왕복 피스톤 원리, 1회전당 변위량과 유량 계산, 적용 분야, 한계 및 RPL·DRPL 선정 방법을 알아보십시오.",
    coverImage: valvelessMeteringPumpOverviewCoverImage,
    coverAlt: "FOREACH RPL 및 DRPL 세라믹 피스톤 무밸브 정량펌프",
  },
  deck:
    "무밸브 정량펌프는 피스톤의 회전 운동과 축 방향 왕복 운동을 결합하여 유로를 전환하고 액체를 흡입·토출하는 용적식 펌프입니다. 펌핑 기구는 기존의 흡입 및 토출 체크 밸브에 의존하지 않습니다. 시약 분주, 적정, 정량 충전 및 두 액체의 비례 공급에 사용할 수 있지만, 실제 정량 성능은 사용하는 유체, 압력, 배관, 구동 장치 및 세정 조건에서 검증해야 합니다.",
  leadBlocks: [
    {
      type: "paragraph",
      text:
        "무밸브 정량펌프는 피스톤의 회전 운동과 축 방향 왕복 운동을 결합하여 유로를 전환하고 액체를 흡입·토출하는 용적식 펌프입니다. 펌핑 기구는 기존의 흡입 및 토출 체크 밸브에 의존하지 않습니다. 시약 분주, 적정, 정량 충전 및 두 액체의 비례 공급에 사용할 수 있지만, 실제 정량 성능은 사용하는 유체, 압력, 배관, 구동 장치 및 세정 조건에서 검증해야 합니다.",
    },
    {
      type: "notice",
      label: "중요한 적용 범위:",
      text:
        "‘무밸브’는 펌핑 기구를 설명하는 용어입니다. 전체 장비에 전환 밸브, 차단 밸브 또는 기타 유체 제어 부품이 전혀 필요하지 않다는 뜻은 아닙니다.",
    },
  ],
  sections: [
    {
      title: "무밸브 정량펌프는 어떻게 작동합니까?",
      blocks: [
        {
          type: "paragraph",
          text:
            "세라믹 피스톤은 회전하면서 축 방향으로 왕복합니다. 회전 운동은 계량 챔버를 흡입구와 토출구에 번갈아 맞추고, 축 방향 운동은 챔버 체적을 변화시킵니다. 두 운동이 필요한 위상 관계를 유지하면 펌프는 흡입과 토출 사이클을 반복합니다.",
        },
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-working-cycle-ko.webp",
          alt: "무밸브 정량펌프의 4단계 흡입 및 토출 작동 사이클",
          width: 1390,
          height: 646,
          caption:
            "무밸브 정량펌프 작동 사이클: 피스톤 회전으로 입구와 출구가 전환되고 축 방향 왕복 운동으로 액체를 흡입·토출합니다.",
        },
        {
          type: "table",
          headers: ["단계", "피스톤 및 포트 상태", "액체 동작"],
          rows: [
            ["흡입 준비", "챔버가 흡입구 쪽으로 회전하고 피스톤이 후퇴하기 시작함", "흡입구와 챔버가 연결됨"],
            ["흡입", "피스톤이 계속 후퇴하여 챔버 체적이 증가함", "액체가 챔버로 들어옴"],
            ["유로 전환", "피스톤이 챔버를 흡입구에서 토출구 쪽으로 회전시킴", "흡입구가 닫히고 토출구가 열릴 준비를 함"],
            ["토출", "피스톤이 전진하여 챔버 체적이 감소함", "액체가 토출구로 나감"],
          ],
        },
        {
          type: "paragraph",
          text:
            "포트 형상, 운동 위상 및 변위량 조절 방식은 펌프 헤드 설계에 따라 달라집니다. 이 사이클은 원리를 이해하는 데 도움이 되지만, 모델 사양서와 실제 시스템 시험이 선정의 기준입니다.",
        },
      ],
    },
    {
      title: "1회전당 변위량, 1회 주입량 및 평균 유량의 차이",
      blocks: [
        {
          type: "paragraph",
          text:
            "무밸브 정량펌프의 변위량은 일반적으로 μL/rev로 표시하며, 현재 설정에서 한 번의 완전한 회전 사이클 동안 토출되는 명목 체적을 뜻합니다. 1회 주입량은 회전 수에도 좌우되고, 평균 유량은 회전 속도에도 좌우됩니다. 세 값은 서로 다른 파라미터입니다.",
        },
        {
          type: "formula",
          expression: "1회 주입량 = 1회전당 변위량 × 회전 수",
          note: "체적 단위를 동일하게 사용하십시오. 완전한 사이클에 대한 명목 계산식입니다.",
        },
        {
          type: "formula",
          expression: "평균 유량 = 1회전당 변위량 × 회전 속도",
          note: "μL/rev와 rev/min을 사용하면 결과 단위는 μL/min입니다.",
        },
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/rpl-manual-flow-adjustment.webp",
          alt: "FOREACH RPL 무밸브 정량펌프 수동 유량 조절 노브",
          width: 1200,
          height: 1200,
          caption:
            "RPL 무밸브 정량펌프의 수동 유량 조절 구조: 조절 노브를 돌리면 기계식 변위량 설정이 바뀝니다.",
        },
        {
          type: "notice",
          text:
            "변위량 범위의 하한이 최소 신뢰 주입량을 의미하지는 않습니다. 소량 토출 결과는 구동 위치 정밀도, 백래시, 유체, 기포, 배관 탄성, 니들 팁의 잔류액 및 측정 방법에도 영향을 받습니다. 목표 조건에서 정확도와 반복성을 검증하십시오.",
        },
      ],
    },
    {
      title: "무밸브 구조의 장점과 한계",
      blocks: [
        {
          type: "table",
          headers: ["엔지니어링 관점", "기대할 수 있는 가치", "함께 확인할 한계"],
          rows: [
            ["펌핑 기구에 기존 체크 밸브가 없음", "각 펌핑 사이클에서 밸브 시트와 밸브 요소의 움직임에 대한 의존도를 줄임", "입자, 결정 및 침전물이 세라믹 맞춤면과 포트에 영향을 줄 수 있음"],
            ["회전과 왕복 운동의 연동", "하나의 펌프 헤드에서 유로 전환과 용적 계량을 결합", "정확한 구동 위치, 위상 및 완전한 작동 사이클이 필요함"],
            ["세라믹 피스톤 어셈블리", "유체에 맞는 접액 재질을 선택하여 반복 정량에 사용 가능", "호환성은 농도, 온도, 접촉 시간 및 세정액에 따라 달라짐"],
            ["기계식 변위량 및 속도 조절", "주입 체적과 공정 시간 양쪽에 맞출 수 있음", "실제 유로에서 중량법 또는 체적법으로 설정값을 교정해야 함"],
          ],
        },
        {
          type: "paragraph",
          text:
            "무밸브 구조가 자동으로 무맥동, 공회전 가능, 막힘 방지 또는 모든 점도와 배압에 적합함을 의미하지는 않습니다. 불안정한 흡입 공급, 기포, 토출 저항, 침전물 및 부적절한 세정 방법은 토출 안정성과 수명에 영향을 줄 수 있습니다.",
        },
      ],
    },
    {
      title: "무밸브 정량펌프는 어디에 사용합니까?",
      blocks: [
        {
          type: "paragraph",
          text:
            "주요 작업에는 시약 분주, 적정액 주입, 교정액 또는 완충액 추가, 정량 충전 및 두 액체의 비례 공급이 포함됩니다. 이러한 적용 명칭은 장비 내부의 작업을 설명하며, 같은 작업을 수행하는 모든 장비가 반드시 무밸브 펌프를 사용해야 한다는 뜻은 아닙니다.",
        },
        {
          type: "table",
          headers: ["FOREACH 시리즈", "현재 표시 구성", "대표 작업"],
          rows: [
            ["RPL-P4", "12–80 μL/rev, 단일 헤드", "소량 시약 주입, 적정 및 반복 분주"],
            ["RPL-P6.35", "50–300 μL/rev, 단일 헤드", "시약 분주, 적정 및 정량 충전"],
            ["RPL-P15", "300–1200 μL/rev, 단일 헤드", "비교적 큰 체적의 주입, 완충액 추가 및 정량 이송"],
            ["DRPL-0109", "듀얼 헤드, 1:9; 100 μL + 900 μL", "농축액과 희석액의 비례 공급"],
            ["DRPL-0119", "듀얼 헤드, 1:19; 60 μL + 1140 μL", "더 높은 희석비의 두 액체 공급"],
          ],
        },
        {
          type: "notice",
          text:
            "DRPL 펌프는 두 액체 흐름을 각각 정량 공급합니다. 최종 혼합 균일도는 합류 지점, 혼합 구조, 하류 체적 및 제어 타이밍에도 좌우됩니다.",
        },
      ],
    },
    {
      title: "무밸브 정량펌프 선정 방법",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "먼저 작업을 정의하십시오. 1회 정량 주입, 적정, 충전, 연속 공급 또는 두 액체의 비례 공급인지 구분합니다.",
            "목표 1회 주입량, 허용 시간, 일일 사이클 수 및 허용 오차를 정한 다음 필요한 변위량, 회전 수 및 속도를 계산합니다.",
            "유체명, 농도, 점도, 입자 또는 결정화 위험, 작동 온도, 세정액 및 정지 시간을 기록합니다.",
            "저장 용기의 액면, 흡입 높이, 배관 길이와 내경, 그리고 필터, 니들, 믹서 등에서 발생하는 토출 저항을 기록합니다.",
            "접액 재질, 작동 및 세정 포트, 설치 방향, 모터와 제어 방식을 확인하고 표시된 구성과 프로젝트별 옵션을 구분합니다.",
            "양산 조건을 확정하기 전에 실제 유로에서 1회 토출량, 반복성, 시간, 기포, 누설 및 세정 후 회복 상태를 측정합니다.",
          ],
        },
      ],
    },
    {
      title: "설치, 시운전 및 유지보수 확인 사항",
      blocks: [
        {
          type: "figure",
          src:
            "/images/resources/technical-articles/what-is-a-valveless-metering-pump/valveless-metering-pump-installation-orientation.png",
          alt: "FOREACH 밸브리스 정량 펌프의 허용 및 금지 설치 방향",
          width: 2113,
          height: 1024,
          caption:
            "밸브리스 정량 펌프 설치 방향: 녹색 체크 표시가 있는 방향으로 설치하고 빨간색 X 표시가 있는 방향은 피하십시오. 해당 모델의 설치 지침을 따르십시오.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "주입 정확도를 평가하기 전에 흡입 튜브와 펌프 챔버의 공기를 제거하여 기포 체적을 펌프 오차로 오인하지 않도록 합니다.",
            "안정적인 흡입 공급을 유지하고, 흡입구 압력 강하를 크게 만드는 과도한 흡입 높이, 길고 가는 튜브 또는 막힌 필터를 피합니다.",
            "내압 값을 허용 연속 운전 배압으로 간주하지 마십시오. 사양의 정의와 실제 유로 시험을 기준으로 작동점을 확인합니다.",
            "결정화되거나 침전물이 생기거나 자주 교체되는 유체에는 정지 후 플러싱, 세정액 호환성 및 폐액 처리 절차를 정합니다.",
            "검증 결과를 재현할 수 있도록 유체, 온도, 변위량 설정, 속도, 배압, 사이클 수 및 측정 방법을 기록합니다.",
          ],
        },
      ],
    },
    {
      title: "제품 및 추가 선정 가이드",
      blocks: [
        {
          type: "links",
          ordered: true,
          items: [
            { href: productHref(), label: "무밸브 정량펌프 제품 보기" },
            { href: articleHref("rpl-valveless-metering-pump-selection-guide"), label: "RPL 단일 헤드 선정 가이드 보기" },
          ],
        },
      ],
    },
  ],
  faqTitle: "무밸브 정량펌프 자주 묻는 질문",
  faqItems: [
    {
      question: "무밸브 정량펌프는 다른 정량펌프와 무엇이 다릅니까?",
      answer:
        "가장 큰 차이는 펌핑과 유로 전환 방식입니다. 무밸브 정량펌프는 기존의 흡입 및 토출 체크 밸브 없이 피스톤의 회전과 왕복 운동으로 흡입구와 토출구를 전환하면서 챔버 체적을 변화시킵니다. 다른 정량펌프는 체크 밸브, 다이어프램 또는 다른 기구를 사용할 수 있습니다. 최종 선정은 주입량, 압력, 유체 및 제어 요구 사항에 따라 결정됩니다.",
    },
    {
      question: "1회전당 변위량이 작으면 최소 주입량도 항상 작아집니까?",
      answer:
        "그렇지 않습니다. 1회전당 변위량은 완전한 사이클의 명목 토출량입니다. 최소 신뢰 주입량은 모터 위치 정밀도, 백래시, 유체, 배관, 기포, 니들 팁 및 측정 방법에도 좌우됩니다. 목표 조건에서 반복 주입 시험으로 확인해야 합니다.",
    },
    {
      question: "무밸브 구조이면 전체 장비에 밸브가 전혀 필요하지 않습니까?",
      answer:
        "아닙니다. 무밸브는 펌핑 기구를 설명합니다. 전체 시스템에는 공급, 세정, 역류 제어 및 안전 기능에 따라 전환 밸브, 차단 밸브, 역류 방지 부품 또는 안전 밸브가 필요할 수 있습니다.",
    },
    {
      question: "RPL과 DRPL의 차이는 무엇입니까?",
      answer:
        "RPL은 하나의 유로를 정량 공급하는 단일 헤드 무밸브 정량펌프입니다. DRPL은 정해진 체적비로 두 액체를 공급하는 듀얼 헤드 구성입니다. 두 유체의 정량 공급과 하류 혼합은 별도의 기능이므로 각각 검증해야 합니다.",
    },
  ],
  cta: {
    title: "실제 무밸브 정량펌프 적용 조건을 검토해야 합니까?",
    description:
      "목표 1회 주입량 또는 평균 유량, 허용 시간, 유체, 흡입 및 토출 조건, 인터페이스와 제어 방식을 FOREACH에 알려주시면 RPL 또는 DRPL 구성과 검증 조건을 함께 검토할 수 있습니다.",
    contactLabel: "적용 조건 상담",
    productsLabel: "무밸브 정량펌프 보기",
    productsHref: productHref(),
  },
} satisfies DiaphragmPumpEngineeringArticleCopy;
