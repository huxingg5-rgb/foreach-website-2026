import type { DiaphragmPumpEngineeringArticleCopy } from "../../diaphragm-pump-engineering-article.types";
import { getFlowTableRows } from "./shared";

// Editorial localization; FOREACH facts retained. Industry terminology checked against CPC and Nordson MEDICAL.
const flowTableLabels = {
  "outsideRange": "그래프 범위 초과",
  "flowAtOneBar": "압력 강하 1 bar에서의 유량(L/min)",
  "coefficients": "추정 Kv / Cv",
  "steepCurve": "곡선이 너무 가팔라 추정하지 않음"
};

export const copy = {
  "metadata": {
    "title": "퀵 디스커넥트 커플링 유량 계산: 유량–압력 강하 곡선과 Kv/Cv",
    "seoTitle": "퀵 디스커넥트 커플링 유량·압력 강하 계산 | FOREACH",
    "seoDescription": "Q20, Q40, Q60의 유량–압력 강하 곡선과 Kv/Cv 추정값으로 커플링을 선정하는 방법. 차단 밸브, 펌프 흡입 라인, 다중 분기 공급 조건을 설명합니다.",
    "coverImage": "/images/resources/technical-articles/instrument-fluidics/quick-disconnect-coupling-flow-pressure-drop-cover.webp",
    "coverAlt": "흰색 배경에 연결 상태와 분리 상태로 배치한 회색 Q60 퀵 디스커넥트 커플링"
  },
  "deck": "퀵 디스커넥트 커플링의 통과 유량은 허용 압력 강하, 튜브 크기, 밸브 구성, 유체 특성에 따라 달라집니다. 먼저 필요한 유량을 정한 뒤 유량–압력 강하 곡선이나 Kv/Cv로 압력 손실을 계산하고, 회로에 남아 있는 압력 여유와 비교해야 합니다. 이 글은 FOREACH Q20, Q40, Q60을 예로 들어 곡선 읽기와 계산, 펌프 흡입 라인 및 다중 분기 회로의 선정·검증 방법을 설명합니다.",
  "leadBlocks": [
    {
      "type": "paragraph",
      "text": "퀵 디스커넥트 커플링의 통과 유량은 허용 압력 강하, 튜브 크기, 밸브 구성, 유체 특성에 따라 달라집니다. 먼저 필요한 유량을 정한 뒤 유량–압력 강하 곡선이나 Kv/Cv로 압력 손실을 계산하고, 회로에 남아 있는 압력 여유와 비교해야 합니다. 이 글은 FOREACH Q20, Q40, Q60을 예로 들어 곡선 읽기와 계산, 펌프 흡입 라인 및 다중 분기 회로의 선정·검증 방법을 설명합니다."
    },
    {
      "type": "paragraph",
      "text": "물과 점도가 비슷한 액체의 난류 조건에서는 ΔP ≈ SG × (Q ÷ Kv)²로 압력 강하를, Q ≈ Kv × √(ΔP ÷ SG)로 허용 압력 강하에서의 유량을 추정할 수 있습니다. Q는 m³/h, ΔP는 bar, SG는 액체의 비중입니다. 아래에는 곡선에서 읽은 근사값, Kv/Cv 추정값, 계산 예와 함께 밸브·점도·설치 위치의 영향을 정리했습니다."
    }
  ],
  "sections": [
    {
      "title": "퀵 디스커넥트 커플링의 유량을 결정하는 요소는?",
      "blocks": [
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/quick-disconnect-couplings-photo.webp",
          "alt": "직선형, 엘보형, 나사형 연결부와 서로 다른 본체를 보여 주는 세 가지 커플링 조립체",
          "caption": "본체 형상과 연결 방식이 다른 퀵 디스커넥트 커플링.",
          "width": 2000,
          "height": 2000
        },
        {
          "type": "paragraph",
          "text": "유량을 만드는 것은 펌프나 압력원이며, 커플링은 흐름에 압력 손실을 더합니다. 일반적인 난류 조건에서는 압력 강하가 대략 유량의 제곱에 비례합니다. Q40 3/8″ 곡선을 보면 10 L/min에서 약 0.23 bar, 20 L/min에서 약 0.95 bar입니다. 유량이 두 배가 되면 압력 강하는 거의 네 배가 됩니다."
        },
        {
          "type": "paragraph",
          "text": "같은 유량에서 압력 강하를 좌우하는 주요 요소는 다음과 같습니다."
        },
        {
          "type": "list",
          "items": [
            "튜브 크기: 동일 시리즈에서 1/8″ 대신 1/4″ 연결을 사용하면 압력 강하가 10분의 1 이하로 줄어드는 경우가 있습니다.",
            "밸브 구성: 밸브가 없는 직선 유로의 저항이 가장 작으며, 차단 밸브와 스프링은 유로의 일부를 차지합니다.",
            "연결부 형상: 직선 호스 바브, 엘보, 나사 연결은 내부 유로가 다릅니다.",
            "유체 특성: 비중이나 점도가 높아지면 같은 유량에서 압력 손실이 커집니다."
          ]
        },
        {
          "type": "paragraph",
          "text": "튜브 내경은 연결할 튜브의 안지름이며, 커플링 내부의 최소 유로 직경과는 다릅니다. 「퀵 디스커넥트 커플링이란?」의 치수 설명을 참고하세요."
        }
      ]
    },
    {
      "title": "유량–압력 강하 곡선은 어떻게 읽나요?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "가로축은 유량으로, 액체는 L/min, 기체는 Nm³/min을 사용합니다. 세로축은 커플링 전후의 압력 강하(bar)입니다. 각 곡선은 튜브 연결 크기에 대응하며 두 방향으로 읽을 수 있습니다."
        },
        {
          "type": "list",
          "items": [
            "유량으로 압력 강하 찾기: 목표 유량에서 위로 이동해 해당 곡선과 만난 뒤, 왼쪽 축에서 압력 강하를 읽습니다.",
            "허용 압력 강하로 유량 찾기: 압력 강하 값에서 오른쪽으로 이동해 곡선과 만난 뒤, 아래쪽 축에서 유량을 읽습니다."
          ]
        },
        {
          "type": "table",
          "headers": [
            "그래프 항목",
            "의미",
            "혼동하면 안 되는 값"
          ],
          "rows": [
            [
              "세로축의 압력 강하",
              "커플링 입구와 출구 사이의 압력 손실",
              "펌프 토출 압력 또는 커플링의 허용 사용 압력"
            ],
            [
              "가로축의 마지막 눈금",
              "그래프에 표시된 범위",
              "커플링의 정격 유량"
            ],
            [
              "기체 유량 곡선",
              "표준 상태로 환산한 기체의 체적 유량",
              "액체 유량으로 직접 환산할 수 있는 근거"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "단위 환산: 0.69 bar는 약 10 psi, 1.9 L/min은 약 0.5 US gpm, 4.83 bar는 약 70 psi입니다."
        }
      ]
    },
    {
      "title": "Q20·Q40·Q60 유량–압력 강하 참조표",
      "blocks": [
        {
          "type": "paragraph",
          "text": "표의 값은 액체 곡선에서 읽은 근사값으로, 초기 선정과 동일 시리즈 내 튜브 크기 비교에 사용합니다. Kv와 Cv는 적용 범위 내의 예비 계산을 위해 곡선에서 역산한 추정값입니다. 곡선 판독값과 계수 계산값이 모든 지점에서 일치하는 것은 아니며, 제품 검수는 완전히 연결된 조립체의 실측 결과를 기준으로 합니다."
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q20-series-white.webp",
          "alt": "Q20 퀵 디스커넥트 커플링의 연결·분리 상태",
          "caption": "Q20 시리즈",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q40-series-white.webp",
          "alt": "Q40 퀵 디스커넥트 커플링의 연결·분리 상태",
          "caption": "Q40 시리즈",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/q60-series-white.webp",
          "alt": "Q60 퀵 디스커넥트 커플링의 연결·분리 상태",
          "caption": "Q60 시리즈",
          "width": 1500,
          "height": 1500
        },
        {
          "type": "subheading",
          "title": "Q20 시리즈: 튜브 내경 1.6–6.4 mm"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/localized/q20-flow-pressure-drop.ko.svg",
          "alt": "Q20 기체·액체 유량–압력 강하 곡선",
          "caption": "그림 1 | Q20 유량–압력 강하 곡선. 위: 기체 Nm³/min. 아래: 액체 L/min. 두 세로축 모두 압력 강하(bar)를 나타냅니다.",
          "width": 1000,
          "height": 1260
        },
        {
          "type": "paragraph",
          "text": "Q20 액체 유량과 압력 강하(bar)"
        },
        {
          "type": "table",
          "headers": [
            "유량(L/min)",
            "1/16″ (1.6 mm)",
            "1/8″ (3.2 mm)",
            "1/4″ (6.4 mm)"
          ],
          "rows": getFlowTableRows("q20", flowTableLabels)
        },
        {
          "type": "paragraph",
          "text": "‘그래프 범위 초과’는 해당 유량에서 압력 강하가 그래프 상한인 4.83 bar를 넘는다는 뜻입니다."
        },
        {
          "type": "paragraph",
          "text": "Q20 1/16″ 연결은 매우 낮은 유량에 적합합니다. 약 0.1 L/min에서 이미 1 bar, 0.5 L/min에서는 4 bar를 넘습니다. 저장 용기 공급이나 세척 회로처럼 1 L/min 이상이 필요하다면 1/8″ 또는 1/4″ 연결을 먼저 검토하세요."
        },
        {
          "type": "subheading",
          "title": "Q40 시리즈: 튜브 내경 6.4–9.5 mm"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/localized/q40-flow-pressure-drop.ko.svg",
          "alt": "Q40 기체·액체 유량–압력 강하 곡선",
          "caption": "그림 2 | Q40 유량–압력 강하 곡선. 위: 기체 Nm³/min. 아래: 액체 L/min. 두 세로축 모두 압력 강하(bar)를 나타냅니다.",
          "width": 1000,
          "height": 1428
        },
        {
          "type": "paragraph",
          "text": "Q40 액체 유량과 압력 강하(bar)"
        },
        {
          "type": "table",
          "headers": [
            "유량(L/min)",
            "1/4″ (6.4 mm)",
            "3/8″ (9.5 mm)"
          ],
          "rows": getFlowTableRows("q40", flowTableLabels)
        },
        {
          "type": "subheading",
          "title": "Q60 시리즈: 튜브 내경 9.5–19.0 mm"
        },
        {
          "type": "figure",
          "src": "/images/resources/technical-articles/instrument-fluidics/localized/q60-flow-pressure-drop.ko.svg",
          "alt": "Q60 기체·액체 유량–압력 강하 곡선",
          "caption": "그림 3 | Q60 유량–압력 강하 곡선. 위: 기체 Nm³/min. 아래: 액체 L/min. 두 세로축 모두 압력 강하(bar)를 나타냅니다.",
          "width": 1000,
          "height": 1355
        },
        {
          "type": "paragraph",
          "text": "Q60 액체 유량과 압력 강하(bar)"
        },
        {
          "type": "table",
          "headers": [
            "유량(L/min)",
            "3/8″ (9.5 mm)",
            "1/2″ (12.7 mm)"
          ],
          "rows": getFlowTableRows("q60", flowTableLabels)
        },
        {
          "type": "paragraph",
          "text": "* 이 압력 강하는 Q60-PP의 사용 압력 4.2 bar보다 높습니다. 곡선의 경향을 보여 주는 값으로만 보세요."
        },
        {
          "type": "paragraph",
          "text": "이 Q60 곡선은 3/8″와 1/2″ 연결에 해당합니다. 튜브 직경 비율로 3/4″(19.0 mm) 연결에 외삽해서는 안 됩니다. Q60-PP의 사용 압력은 4.2 bar이므로, 출구가 대기압 또는 양의 게이지 압력인 회로에서는 이 값을 넘는 압력 강하 지점을 운전 조건으로 사용할 수 없습니다."
        }
      ]
    },
    {
      "title": "Kv 또는 Cv로 유량과 압력 강하 계산하기",
      "blocks": [
        {
          "type": "paragraph",
          "text": "유량 계수는 곡선의 범위와 적용 가능한 유동 조건 안에서 사용합니다. Kv는 압력 강하 1 bar에서의 물 유량(m³/h), Cv는 압력 강하 1 psi에서의 물 유량(US gpm)입니다. 환산 관계는 Cv ≈ 1.156 × Kv이며, 그래프 바깥 조건으로 외삽하지 않습니다."
        },
        {
          "type": "formula",
          "expression": "유량에서 압력 강하 계산: ΔP = SG × (Q ÷ Kv)²"
        },
        {
          "type": "formula",
          "expression": "허용 압력 강하에서 유량 계산: Q = Kv × √(ΔP ÷ SG)"
        },
        {
          "type": "paragraph",
          "text": "Q의 단위는 m³/h(1 m³/h ≈ 16.7 L/min), ΔP는 bar입니다. SG는 액체의 비중이며 물은 1입니다."
        },
        {
          "type": "paragraph",
          "text": "예 1 — 세척 회로에 12 L/min이 필요하고 Q40 3/8″(Kv ≈ 1.22)을 사용한다고 가정합니다. 세척액의 비중을 1.0으로 두면, 12 L/min = 0.72 m³/h이므로 ΔP = 1.0 × (0.72 ÷ 1.22)² ≈ 0.35 bar입니다. 표의 근사값 0.33 bar와 비슷합니다."
        },
        {
          "type": "paragraph",
          "text": "예 2 — 한 분기에서 커플링에 허용되는 압력 강하가 0.5 bar이고 Q20 1/4″(Kv ≈ 0.43)을 사용합니다. Q = 0.43 × √0.5 ≈ 0.30 m³/h, 약 5 L/min입니다."
        },
        {
          "type": "paragraph",
          "text": "예 3 — 동일한 커플링 두 쌍을 직렬로 연결하면 같은 유량에서 압력 강하는 한 쌍의 두 배가 됩니다. 등가 Kv는 한 쌍의 Kv를 √2로 나눈 값입니다. 서로 다른 부품을 직렬 연결할 때는 1/Kv_total² = 1/Kv₁² + 1/Kv₂² + … 로 계산합니다."
        },
        {
          "type": "paragraph",
          "text": "FOREACH 유체 저항 계산기의 Cv 행에 값을 입력하면 튜브, 밸브와 함께 전체 회로의 압력 강하를 계산할 수 있습니다. 사용 방법은 글 끝의 계산기 안내를 참고하세요."
        },
        {
          "type": "paragraph",
          "text": "이 식은 물과 점도가 비슷한 액체의 난류 조건에 적용합니다. 유량이 매우 작거나 점도가 높으면 층류에 가까워져 압력 강하가 유량에 더 선형적으로 변할 수 있습니다. 이때 제곱식의 정확도가 낮아지므로 실제 유체로 시험해야 합니다. 본문의 Kv/Cv는 초기 선정을 위한 곡선 기반 추정값입니다."
        },
        {
          "type": "links",
          "items": [
            {
              "href": "/ko/resources/calculators/fluid-resistance/",
              "label": "유체 저항 계산기 열기"
            }
          ]
        }
      ]
    },
    {
      "title": "차단 밸브가 압력 강하에 미치는 영향은?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "밸브가 있는 커플링은 분리할 때 해당 쪽의 유로를 자동으로 차단합니다. 연결 상태에서도 밸브와 스프링이 유로를 차지하므로, 동등한 직선형 무밸브 제품보다 압력 강하가 커집니다. 양쪽 모두 밸브가 있으면 유로에 두 개의 밸브가 들어가 일반적으로 저항이 가장 큽니다."
        },
        {
          "type": "paragraph",
          "text": "유량 여유가 부족할 때는 다음 순서로 검토하세요."
        },
        {
          "type": "list",
          "items": [
            "분리 후 차단이 필요한 쪽에만 밸브형을 사용하고, 용도상 허용된다면 반대쪽에는 무밸브형을 사용합니다.",
            "양쪽 차단이 모두 필요하다면 필요한 밸브를 없애기보다 더 큰 튜브 연결 크기를 먼저 검토합니다.",
            "완전히 결합되지 않으면 밸브가 일부만 열려 유량이 크게 줄 수 있습니다. 이상이 생기면 먼저 두 부품이 끝까지 잠겼는지 확인합니다."
          ],
          "ordered": true
        },
        {
          "type": "links",
          "items": [
            {
              "prefix": "분리 후 잔류액과 액체 유출에 대해서는 ",
              "label": "「퀵 디스커넥트 커플링이란?」",
              "href": "/ko/resources/technical-articles/what-is-a-quick-disconnect-fitting/",
              "suffix": "를 참고하세요."
            }
          ]
        }
      ]
    },
    {
      "title": "모델 코드와 곡선의 연결 크기는 어떻게 대응하나요?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "호스 바브 모델에서는 시리즈 다음 두 자리 숫자가 호환 튜브의 내경을 나타냅니다. 아래 표로 제품 모델과 곡선 범례를 대응시킬 수 있습니다."
        },
        {
          "type": "table",
          "headers": [
            "크기 코드",
            "튜브 내경",
            "곡선 범례",
            "시리즈"
          ],
          "rows": [
            [
              "01",
              "1.6 mm",
              "1/16″",
              "Q20"
            ],
            [
              "02",
              "3.2 mm",
              "1/8″",
              "Q20"
            ],
            [
              "03",
              "4.8 mm",
              "3/16″(이 곡선의 적용 대상 아님)",
              "Q20"
            ],
            [
              "04",
              "6.4 mm",
              "1/4″",
              "Q20、Q40"
            ],
            [
              "06",
              "9.5 mm",
              "3/8″",
              "Q40、Q60"
            ],
            [
              "08",
              "12.7 mm",
              "1/2″",
              "Q60"
            ],
            [
              "12",
              "19.0 mm",
              "3/4″(이 곡선의 적용 대상 아님)",
              "Q60"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Q2004-PNV-SPPE를 예로 들면 Q20은 시리즈, 04는 6.4 mm(1/4″) 튜브, P는 수형 부품, N은 비패널 장착, V는 밸브형을 뜻합니다. S, PP, E는 각각 직선 연결부, PP 본체, EPDM 씰입니다. 나사 연결은 다른 코드를 사용합니다. 예를 들어 Q4005는 나사 연결이므로 전체 모델을 기준으로 확인해야 합니다."
        }
      ]
    },
    {
      "title": "펌프 흡입 라인에서는 왜 압력 강하를 더 낮게 잡아야 하나요?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "개방형 저장 용기의 경우 대기압 약 1 bar에 펌프 입구보다 높은 액면의 정수두를 더한 값은 이론적 한계이며, 그대로 사용할 수 있는 설계 여유가 아닙니다. 펌프에 필요한 입구 압력과 튜브·필터의 손실을 빼면 커플링에 남는 여유는 수십 kPa 정도일 수 있습니다. 흡입 손실이 크면 공급 유량이 감소하고 용존 가스가 기포로 석출되기 쉽습니다."
        },
        {
          "type": "paragraph",
          "text": "따라서 흡입용 커플링은 더 낮은 압력 강하를 기준으로 선정합니다. 2 L/min에서 Q20 1/8″의 손실은 약 1.0 bar로 대기압에 의한 이론적 한계에 가깝지만, 1/4″는 약 0.07 bar입니다."
        },
        {
          "type": "paragraph",
          "text": "진공 상태의 기밀성도 확인해야 합니다. 재연결 때 들어간 공기와 배기 시간은 첫 공급량에 영향을 줍니다. 간헐 세척은 분당 평균 소비량이 아니라 실제 세척 동작 중의 순간 유량으로 평가합니다."
        }
      ]
    },
    {
      "title": "여러 분기가 하나의 커플링을 공유하면 어느 유량으로 선정하나요?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "공통 입구의 커플링은 동시에 동작하는 분기 유량의 합을 통과시켜야 합니다."
        },
        {
          "type": "formula",
          "expression": "Q_입구 = Q_분기1 + Q_분기2 + … (동시에 작동하는 분기만 합산)"
        },
        {
          "type": "paragraph",
          "text": "각각 0.5 L/min을 사용하는 세척 분기 세 개가 동시에 작동하면 입구에는 1.5 L/min이 필요합니다. Kv로 계산하면 Q20 1/8″의 손실은 약 0.56 bar, 1/4″는 약 0.04 bar입니다. 흡입 라인이라면 1/4″를 먼저 검토하고 완전한 조립체에서 입구 압력 여유를 검증하세요."
        },
        {
          "type": "paragraph",
          "text": "분기가 순차적으로 작동하면 단일 동작의 최대 요구량을 기준으로 합니다. 총 유량이 충분해도 균등 분배되는 것은 아닙니다. 튜브 길이, 밸브, 니들 구경에 따라 저항이 달라지므로 각 분기 말단의 공급량을 측정해야 합니다."
        }
      ]
    },
    {
      "title": "기체 곡선을 액체에 써도 되나요? 점도는 어떻게 반영하나요?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "안 됩니다. 기체 곡선은 표준 상태로 환산한 체적 유량입니다. 기체는 압축성이 있고 입구 압력도 통과 유량에 영향을 줍니다. 액체와 기체는 유동 관계가 다르므로 단위만 바꿔 곡선을 서로 사용할 수 없습니다."
        },
        {
          "type": "paragraph",
          "text": "비중 보정은 앞의 식에 포함되어 있지만 점도는 별도로 평가해야 합니다. 글리세롤, 단백질 또는 고농도 염을 포함한 용액은 물보다 점도가 높을 수 있고, 온도가 낮아지면 점도가 더 증가할 수 있습니다. 압력 강하가 표보다 커질 수 있으므로 실제 액체와 운전 온도로 전체 연결부를 시험하세요."
        }
      ]
    },
    {
      "title": "장착 후 유량과 압력 강하는 어떻게 검증하나요?",
      "blocks": [
        {
          "type": "table",
          "headers": [
            "검증 항목",
            "기록할 내용",
            "목적"
          ],
          "rows": [
            [
              "전체 구성",
              "암수 부품의 전체 모델, 밸브 조합, 튜브 내경과 길이",
              "동일 조건의 조립체 비교"
            ],
            [
              "커플링 압력 강하",
              "목표 유량에서 입구·출구 압력 측정; 장착 전후 말단 유량은 별도의 기능 점검으로 비교",
              "압력 여유 충족 여부 확인"
            ],
            [
              "단일 분기 운전",
              "말단 유량, 시작 지연, 반복 동작의 일관성",
              "동작 요구량 충족 여부 확인"
            ],
            [
              "다중 분기 동시 운전",
              "총 유량, 분기별 분배, 공통 입구 압력 강하",
              "유량 분배 확인"
            ],
            [
              "흡입 라인",
              "입구 압력, 기포, 낮은 액면에서의 공급량",
              "진공 상태의 공기 유입과 공급 여유 평가"
            ],
            [
              "필터를 일정 기간 사용한 후",
              "말단 유량 변화",
              "장기 유량 여유 평가"
            ],
            [
              "분리 후 재시작",
              "연결부 밀봉, 유입 공기량, 배기 후 회복 시간",
              "정비가 후속 동작에 미치는 영향 확인"
            ]
          ]
        }
      ]
    },
    {
      "title": "퀵 디스커넥트 커플링 선정 관련 자료",
      "blocks": [
        {
          "type": "links",
          "items": [
            {
              "href": "/ko/resources/technical-articles/what-is-a-quick-disconnect-fitting/",
              "label": "퀵 디스커넥트 커플링이란? 암수 결합, 밸브와 선정 방법"
            },
            {
              "href": "/ko/resources/technical-articles/fitting-material-selection-guide/",
              "label": "피팅 재질 선정: PP, PA, POM, PVDF, PEEK의 차이"
            },
            {
              "href": "/ko/resources/technical-articles/fluid-resistance-calculator-liquid-path-design-guide/",
              "label": "유체 저항 계산기로 압력 강하와 유량 분석하기"
            }
          ],
          "ordered": true
        }
      ]
    }
  ],
  "faqTitle": "유량·압력 강하 자주 묻는 질문",
  "faqItems": [
    {
      "question": "퀵 디스커넥트 커플링의 유량은 어떻게 계산하나요?",
      "answer": "허용 압력 강하를 정하고 Q = Kv × √(ΔP ÷ SG)를 사용합니다. Q는 m³/h, ΔP는 bar입니다. 곡선에서 허용 압력 강하와 만나는 지점의 유량을 직접 읽어도 됩니다. 앞에서 설명한 액체 유동 적용 조건을 지켜야 합니다."
    },
    {
      "question": "어느 정도의 압력 강하가 적절한가요?",
      "answer": "일률적인 합격 기준은 없으며 회로의 압력 여유에 따라 정합니다. 토출 측에서는 목표 유량에서 펌프가 제공하는 압력을 배분합니다. 흡입 측은 실제 여유가 작습니다. 개방형 용기의 대기압과 정수두 합은 이론적 상한일 뿐이므로 커플링 손실을 낮게 유지해야 합니다."
    },
    {
      "question": "튜브 연결 크기를 키우면 유량이 항상 늘어나나요?",
      "answer": "동일 시리즈와 밸브 구성에서는 큰 연결부가 압력 손실을 줄입니다. Q20은 2 L/min에서 1/8″가 약 1.0 bar, 1/4″가 약 0.07 bar입니다. 그러나 전체 유량은 다른 튜브, 밸브, 오리피스의 영향도 받으므로 회로 전체에서 효과를 평가해야 합니다."
    },
    {
      "question": "대유량용 퀵 디스커넥트 커플링은 어떻게 선정하나요?",
      "answer": "목표 유량, 허용 압력 강하, 최대 시스템 압력을 정한 뒤 암수 부품, 튜브 크기, 밸브를 선택합니다. 액체 곡선의 손실이 압력 여유 안에 있는지, 사용 압력과 온도도 적합한지 확인합니다. 공통 입구는 동시 분기 유량을 합산하고, 장착 후 커플링 손실과 각 말단 유량을 측정합니다."
    },
    {
      "question": "세척액용 커플링을 기체 유량 곡선으로 선정해도 되나요?",
      "answer": "안 됩니다. 액체 곡선을 사용하거나 Kv로 추정한 뒤 시험하세요. 기체와 액체는 적용되는 유동 관계가 다릅니다."
    }
  ],
  "cta": {
    "title": "실제 유체 회로에 맞는 커플링 구성 검토",
    "description": "목표 유량, 유체와 온도, 설치 위치(흡입 또는 토출), 허용 압력 강하를 알려 주세요. FOREACH 엔지니어가 Q20·Q40·Q60의 암수 조합, 튜브 연결 크기와 밸브 구성을 검토해 드립니다.",
    "contactLabel": "커플링 선정 문의",
    "productsLabel": "퀵 디스커넥트 모델 보기",
    "productsHref": "/ko/products/fittings/quick-connect-fittings/"
  }
} as const satisfies DiaphragmPumpEngineeringArticleCopy;
