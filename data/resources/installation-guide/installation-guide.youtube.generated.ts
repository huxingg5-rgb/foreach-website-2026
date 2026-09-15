/* =========================================================
   installation-guide.youtube.generated.ts

   说明：
   1. 此文件由本地脚本生成
   2. 中文页面仍使用本地 MP4
   3. 五种外语统一使用 YouTube
   4. 封面复用中文教程封面
========================================================= */

import type {
  InstallationGuideCard,
  InstallationGuideLocale,
} from "./installation-guide.types";

type InstallationGuideIntlLocale =
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

type InstallationGuideTutorialCopy = {
  title: string;
  tags: string[];
};

const installationGuideYouTubeVideos = [
  {
    "key": "dpl60-brushed-pressure-test",
    "videoId": "yeOkzvD86xI",
    "thumbnail": "/images/resources/installation-guide/youtube/dpl60-brushed-pressure-test-cover.jpg"
  },
  {
    "key": "dpl60-brushed-flow-rate-test",
    "videoId": "WRBdbi1A83U",
    "thumbnail": "/images/resources/installation-guide/youtube/dpl60-brushed-flow-rate-test-cover.jpg"
  },
  {
    "key": "dpl60-brushless-flow-rate-test",
    "videoId": "pZV2uQOMt5I",
    "thumbnail": "/images/resources/installation-guide/youtube/dpl60-brushless-flow-rate-test-cover.jpg"
  },
  {
    "key": "dpl30-brushed-pressure-test",
    "videoId": "p5_Brvhf9Qo",
    "thumbnail": "/images/resources/installation-guide/youtube/dpl30-brushed-pressure-test-cover.jpg"
  },
  {
    "key": "dpl30-brushless-pressure-test",
    "videoId": "Lzox2V0DiYs",
    "thumbnail": "/images/resources/installation-guide/youtube/dpl30-brushless-pressure-test-cover.jpg"
  },
  {
    "key": "dpl30-brushless-flow-rate-test",
    "videoId": "esCbqosu9NU",
    "thumbnail": "/images/resources/installation-guide/youtube/dpl30-brushless-flow-rate-test-cover.jpg"
  },
  {
    "key": "dpl30-brushed-flow-rate-test",
    "videoId": "RqgFil-5YAo",
    "thumbnail": "/images/resources/installation-guide/youtube/dpl30-brushed-flow-rate-test-cover.jpg"
  },
  {
    "key": "five-wire-brushless-control-wires",
    "videoId": "hIR9dg47_wU",
    "thumbnail": "/images/resources/installation-guide/youtube/five-wire-brushless-control-wires-cover.jpg"
  },
  {
    "key": "two-wire-brushless-diaphragm-pump",
    "videoId": "p3PlAdfx9Sk",
    "thumbnail": "/images/resources/installation-guide/youtube/two-wire-brushless-diaphragm-pump-cover.jpg"
  },
  {
    "key": "diaphragm-pump-hose-barb-protection",
    "videoId": "rSFDAexeFmU",
    "thumbnail": "/images/resources/installation-guide/youtube/diaphragm-pump-hose-barb-protection-cover.jpg"
  },
  {
    "key": "diaphragm-pump-placement-stability",
    "videoId": "ag48EKqdPyU",
    "thumbnail": "/images/resources/installation-guide/youtube/diaphragm-pump-placement-stability-cover.jpg"
  },
  {
    "key": "diaphragm-installation",
    "videoId": "bVbg038KImo",
    "thumbnail": "/images/resources/installation-guide/zh/zh-tutorial-001-6cadad8155.png"
  },
  {
    "key": "800-series-gas-liquid",
    "videoId": "UwleXANBWvQ",
    "thumbnail": "/images/resources/installation-guide/youtube/800-series-gas-liquid-cover-fixed-v006.png"
  },
  {
    "key": "brushed-vs-brushless-lifespan",
    "videoId": "EUt7BG3WWwA",
    "thumbnail": "/images/resources/installation-guide/zh/zh-tutorial-005-c4e9e2aa2a.png"
  },
  {
    "key": "60-series-pressure",
    "videoId": "fH9ofJfE4Us",
    "thumbnail": "/images/resources/installation-guide/zh/zh-tutorial-003-57a6bc1c94.png"
  },
  {
    "key": "motor-selection",
    "videoId": "FGQFrcs9cWI",
    "thumbnail": "/images/resources/installation-guide/zh/zh-tutorial-005-c4e9e2aa2a.png"
  },
  {
    "key": "30h-series-pressure",
    "videoId": "ntivZyFe1B0",
    "thumbnail": "/images/resources/installation-guide/zh/zh-tutorial-002-a92d2b71b4.png"
  },
  {
    "key": "diaphragm-selection",
    "videoId": "zgP7udU0asI",
    "thumbnail": "/images/resources/installation-guide/zh/zh-tutorial-004-5733a4bdad.png"
  }
] as const;

const installationGuideYouTubeCopies: Record<
  InstallationGuideIntlLocale,
  Record<string, InstallationGuideTutorialCopy>
> = {
  "en": {
    "dpl60-brushed-pressure-test": {
      "title": "600 mL/min Brushed Micro Diaphragm Pump Pressure Test",
      "tags": [
        "DPL60",
        "Brushed Motor",
        "Pressure Test"
      ]
    },
    "dpl60-brushed-flow-rate-test": {
      "title": "600 mL/min Brushed Diaphragm Pump Flow Rate Test",
      "tags": [
        "DPL60",
        "Brushed Motor",
        "Flow Rate Test"
      ]
    },
    "dpl60-brushless-flow-rate-test": {
      "title": "600 mL/min Brushless Micro Diaphragm Pump Flow Rate Test",
      "tags": [
        "DPL60",
        "Brushless Motor",
        "Flow Rate Test"
      ]
    },
    "dpl30-brushed-pressure-test": {
      "title": "DPL30 Brushed Micro Diaphragm Pump Pressure Test",
      "tags": [
        "DPL30",
        "Brushed Motor",
        "Pressure Test"
      ]
    },
    "dpl30-brushless-pressure-test": {
      "title": "300mL/min Brushless Diaphragm Pump Pressure Test! ⚡️",
      "tags": [
        "DPL30",
        "Brushless Motor",
        "Pressure Test"
      ]
    },
    "dpl30-brushless-flow-rate-test": {
      "title": "300 mL/min Brushless Diaphragm Pump - Flow Performance Test",
      "tags": [
        "DPL30",
        "Brushless Motor",
        "Flow Performance"
      ]
    },
    "dpl30-brushed-flow-rate-test": {
      "title": "DPL30 Brushed Diaphragm Pump - Flow Rate Test",
      "tags": [
        "DPL30",
        "Brushed Motor",
        "Flow Rate Test"
      ]
    },
    "five-wire-brushless-control-wires": {
      "title": "What is the Function of Control Wires in a 5-Wire Brushless Diaphragm Pump?",
      "tags": [
        "5-Wire Motor",
        "Control Wires",
        "Brushless Motor"
      ]
    },
    "two-wire-brushless-diaphragm-pump": {
      "title": "Why Choose a 2-Wire Brushless Diaphragm Pump?",
      "tags": [
        "2-Wire Motor",
        "Brushless Motor",
        "DPL60"
      ]
    },
    "diaphragm-pump-hose-barb-protection": {
      "title": "How to Prevent Diaphragm Pump Hose Barb Breakage",
      "tags": [
        "Hose Barb",
        "Installation",
        "Diaphragm Pump"
      ]
    },
    "diaphragm-pump-placement-stability": {
      "title": "Why is the diaphragm pump unstable when placed?",
      "tags": [
        "Mounting",
        "Stability",
        "Diaphragm Pump"
      ]
    },
    "diaphragm-installation": {
      "title": "Diaphragm Pump Installation and Precautions",
      "tags": [
        "Diaphragm Pump",
        "Installation",
        "Precautions"
      ]
    },
    "800-series-gas-liquid": {
      "title": "800 Series Gas-Liquid Diaphragm Pump | 6 L/min Flow Rate, 24V Brushless Motor",
      "tags": [
        "800 Series",
        "Gas-Liquid Pump",
        "Brushless Motor"
      ]
    },
    "brushed-vs-brushless-lifespan": {
      "title": "Brushed vs. Brushless Motors: The Difference Is More Than Just Lifespan",
      "tags": [
        "Brushed Motor",
        "Brushless Motor",
        "Service Life"
      ]
    },
    "60-series-pressure": {
      "title": "Tested Maximum Pressure of the 60 Series Diaphragm Pump",
      "tags": [
        "60 Series",
        "Pressure Test",
        "Diaphragm Pump"
      ]
    },
    "motor-selection": {
      "title": "Should a Diaphragm Pump Use a Brushed or Brushless Motor?",
      "tags": [
        "Motor Selection",
        "Brushed Motor",
        "Brushless Motor"
      ]
    },
    "30h-series-pressure": {
      "title": "Measured Pressure Resistance of the 30H Series Diaphragm Pump",
      "tags": [
        "30H Series",
        "Pressure Resistance",
        "Pressure Test"
      ]
    },
    "diaphragm-selection": {
      "title": "How to Choose a Diaphragm Pump",
      "tags": [
        "Pump Selection",
        "Diaphragm Pump",
        "Application"
      ]
    }
  },
  "es": {
    "dpl60-brushed-pressure-test": {
      "title": "Prueba de presión de la microbomba de diafragma con escobillas de 600 mL/min",
      "tags": [
        "DPL60",
        "Motor con escobillas",
        "Prueba de presión"
      ]
    },
    "dpl60-brushed-flow-rate-test": {
      "title": "Prueba de caudal de la bomba de diafragma con escobillas de 600 mL/min",
      "tags": [
        "DPL60",
        "Motor con escobillas",
        "Prueba de caudal"
      ]
    },
    "dpl60-brushless-flow-rate-test": {
      "title": "Prueba de caudal de la microbomba de diafragma sin escobillas de 600 mL/min",
      "tags": [
        "DPL60",
        "Motor sin escobillas",
        "Prueba de caudal"
      ]
    },
    "dpl30-brushed-pressure-test": {
      "title": "Prueba de presión de la microbomba de diafragma DPL30 con escobillas",
      "tags": [
        "DPL30",
        "Motor con escobillas",
        "Prueba de presión"
      ]
    },
    "dpl30-brushless-pressure-test": {
      "title": "Prueba de presión de la bomba de diafragma sin escobillas de 300 mL/min",
      "tags": [
        "DPL30",
        "Motor sin escobillas",
        "Prueba de presión"
      ]
    },
    "dpl30-brushless-flow-rate-test": {
      "title": "Prueba de rendimiento de caudal de la bomba de diafragma sin escobillas de 300 mL/min",
      "tags": [
        "DPL30",
        "Motor sin escobillas",
        "Rendimiento de caudal"
      ]
    },
    "dpl30-brushed-flow-rate-test": {
      "title": "Prueba de caudal de la bomba de diafragma DPL30 con escobillas",
      "tags": [
        "DPL30",
        "Motor con escobillas",
        "Prueba de caudal"
      ]
    },
    "five-wire-brushless-control-wires": {
      "title": "¿Qué función cumplen los cables de control de una bomba de diafragma sin escobillas de 5 hilos?",
      "tags": [
        "Motor de 5 hilos",
        "Cables de control",
        "Motor sin escobillas"
      ]
    },
    "two-wire-brushless-diaphragm-pump": {
      "title": "¿Por qué elegir una bomba de diafragma sin escobillas de 2 hilos?",
      "tags": [
        "Motor de 2 hilos",
        "Motor sin escobillas",
        "DPL60"
      ]
    },
    "diaphragm-pump-hose-barb-protection": {
      "title": "Cómo evitar que se rompa la espiga de la bomba de diafragma",
      "tags": [
        "Espiga para manguera",
        "Instalación",
        "Bomba de diafragma"
      ]
    },
    "diaphragm-pump-placement-stability": {
      "title": "¿Por qué la bomba de diafragma es inestable cuando se coloca?",
      "tags": [
        "Montaje",
        "Estabilidad",
        "Bomba de diafragma"
      ]
    },
    "diaphragm-installation": {
      "title": "Instalación de una bomba de diafragma y precauciones",
      "tags": [
        "Bomba de diafragma",
        "Instalación",
        "Precauciones"
      ]
    },
    "800-series-gas-liquid": {
      "title": "Bomba de diafragma gas-líquido serie 800 | 6 L/min y motor sin escobillas de 24 V",
      "tags": [
        "Serie 800",
        "Gas-líquido",
        "Motor sin escobillas"
      ]
    },
    "brushed-vs-brushless-lifespan": {
      "title": "Motores con y sin escobillas: la diferencia no es solo la vida útil",
      "tags": [
        "Motor con escobillas",
        "Motor sin escobillas",
        "Vida útil"
      ]
    },
    "60-series-pressure": {
      "title": "Prueba de presión máxima de la bomba de diafragma serie 60",
      "tags": [
        "Serie 60",
        "Prueba de presión",
        "Bomba de diafragma"
      ]
    },
    "motor-selection": {
      "title": "¿Motor con o sin escobillas para una bomba de diafragma?",
      "tags": [
        "Selección de motor",
        "Con escobillas",
        "Sin escobillas"
      ]
    },
    "30h-series-pressure": {
      "title": "Resistencia a la presión medida de la bomba de diafragma serie 30H",
      "tags": [
        "Serie 30H",
        "Resistencia a presión",
        "Prueba de presión"
      ]
    },
    "diaphragm-selection": {
      "title": "Cómo elegir una bomba de diafragma",
      "tags": [
        "Selección de bomba",
        "Bomba de diafragma",
        "Aplicación"
      ]
    }
  },
  "fr": {
    "dpl60-brushed-pressure-test": {
      "title": "Essai de pression de la micropompe à membrane à balais de 600 mL/min",
      "tags": [
        "DPL60",
        "Moteur à balais",
        "Essai de pression"
      ]
    },
    "dpl60-brushed-flow-rate-test": {
      "title": "Essai de débit de la pompe à membrane à balais de 600 mL/min",
      "tags": [
        "DPL60",
        "Moteur à balais",
        "Essai de débit"
      ]
    },
    "dpl60-brushless-flow-rate-test": {
      "title": "Essai de débit de la micropompe à membrane brushless de 600 mL/min",
      "tags": [
        "DPL60",
        "Moteur brushless",
        "Essai de débit"
      ]
    },
    "dpl30-brushed-pressure-test": {
      "title": "Essai de pression de la micropompe à membrane DPL30 à balais",
      "tags": [
        "DPL30",
        "Moteur à balais",
        "Essai de pression"
      ]
    },
    "dpl30-brushless-pressure-test": {
      "title": "Essai de pression de la pompe à membrane brushless de 300 mL/min",
      "tags": [
        "DPL30",
        "Moteur brushless",
        "Essai de pression"
      ]
    },
    "dpl30-brushless-flow-rate-test": {
      "title": "Essai de performance de débit de la pompe à membrane brushless de 300 mL/min",
      "tags": [
        "DPL30",
        "Moteur brushless",
        "Performance de débit"
      ]
    },
    "dpl30-brushed-flow-rate-test": {
      "title": "Essai de débit de la pompe à membrane DPL30 à balais",
      "tags": [
        "DPL30",
        "Moteur à balais",
        "Essai de débit"
      ]
    },
    "five-wire-brushless-control-wires": {
      "title": "À quoi servent les fils de commande d’une pompe à membrane brushless à 5 fils ?",
      "tags": [
        "Moteur à 5 fils",
        "Fils de commande",
        "Moteur brushless"
      ]
    },
    "two-wire-brushless-diaphragm-pump": {
      "title": "Pourquoi choisir une pompe à membrane brushless à 2 fils ?",
      "tags": [
        "Moteur à 2 fils",
        "Moteur brushless",
        "DPL60"
      ]
    },
    "diaphragm-pump-hose-barb-protection": {
      "title": "Comment éviter la rupture de l’embout cannelé d’une pompe à membrane",
      "tags": [
        "Embout cannelé",
        "Installation",
        "Pompe à membrane"
      ]
    },
    "diaphragm-pump-placement-stability": {
      "title": "Pourquoi la pompe à membrane est-elle instable lorsqu’elle est posée ?",
      "tags": [
        "Montage",
        "Stabilité",
        "Pompe à membrane"
      ]
    },
    "diaphragm-installation": {
      "title": "Installation d’une pompe à membrane et précautions",
      "tags": [
        "Pompe à membrane",
        "Installation",
        "Précautions"
      ]
    },
    "800-series-gas-liquid": {
      "title": "Pompe à membrane gaz-liquide série 800 | 6 L/min et moteur brushless 24 V",
      "tags": [
        "Série 800",
        "Gaz-liquide",
        "Moteur brushless"
      ]
    },
    "brushed-vs-brushless-lifespan": {
      "title": "Moteurs à balais ou brushless : la différence ne se limite pas à la durée de vie",
      "tags": [
        "Moteur à balais",
        "Moteur brushless",
        "Durée de vie"
      ]
    },
    "60-series-pressure": {
      "title": "Test de pression maximale de la pompe à membrane série 60",
      "tags": [
        "Série 60",
        "Test de pression",
        "Pompe à membrane"
      ]
    },
    "motor-selection": {
      "title": "Moteur à balais ou brushless pour une pompe à membrane ?",
      "tags": [
        "Choix du moteur",
        "Moteur à balais",
        "Moteur brushless"
      ]
    },
    "30h-series-pressure": {
      "title": "Résistance à la pression mesurée de la pompe à membrane série 30H",
      "tags": [
        "Série 30H",
        "Résistance à la pression",
        "Test de pression"
      ]
    },
    "diaphragm-selection": {
      "title": "Comment choisir une pompe à membrane",
      "tags": [
        "Sélection de pompe",
        "Pompe à membrane",
        "Application"
      ]
    }
  },
  "ko": {
    "dpl60-brushed-pressure-test": {
      "title": "600 mL/min 브러시형 미니 다이어프램 펌프 압력 테스트",
      "tags": [
        "DPL60",
        "브러시 모터",
        "압력 테스트"
      ]
    },
    "dpl60-brushed-flow-rate-test": {
      "title": "600 mL/min 브러시형 다이어프램 펌프 유량 테스트",
      "tags": [
        "DPL60",
        "브러시 모터",
        "유량 테스트"
      ]
    },
    "dpl60-brushless-flow-rate-test": {
      "title": "600 mL/min 브러시리스 미니 다이어프램 펌프 유량 테스트",
      "tags": [
        "DPL60",
        "브러시리스 모터",
        "유량 테스트"
      ]
    },
    "dpl30-brushed-pressure-test": {
      "title": "DPL30 브러시형 미니 다이어프램 펌프 압력 테스트",
      "tags": [
        "DPL30",
        "브러시 모터",
        "압력 테스트"
      ]
    },
    "dpl30-brushless-pressure-test": {
      "title": "300 mL/min 브러시리스 다이어프램 펌프 압력 테스트",
      "tags": [
        "DPL30",
        "브러시리스 모터",
        "압력 테스트"
      ]
    },
    "dpl30-brushless-flow-rate-test": {
      "title": "300 mL/min 브러시리스 다이어프램 펌프 유량 성능 테스트",
      "tags": [
        "DPL30",
        "브러시리스 모터",
        "유량 성능"
      ]
    },
    "dpl30-brushed-flow-rate-test": {
      "title": "DPL30 브러시형 다이어프램 펌프 유량 테스트",
      "tags": [
        "DPL30",
        "브러시 모터",
        "유량 테스트"
      ]
    },
    "five-wire-brushless-control-wires": {
      "title": "5선식 브러시리스 다이어프램 펌프 제어선의 기능은 무엇인가요?",
      "tags": [
        "5선식 모터",
        "제어선",
        "브러시리스 모터"
      ]
    },
    "two-wire-brushless-diaphragm-pump": {
      "title": "2선식 브러시리스 다이어프램 펌프를 선택하는 이유",
      "tags": [
        "2선식 모터",
        "브러시리스 모터",
        "DPL60"
      ]
    },
    "diaphragm-pump-hose-barb-protection": {
      "title": "다이어프램 펌프 호스 바브 파손을 방지하는 방법",
      "tags": [
        "호스 바브",
        "설치",
        "다이어프램 펌프"
      ]
    },
    "diaphragm-pump-placement-stability": {
      "title": "다이어프램 펌프를 놓았을 때 불안정한 이유는 무엇인가요?",
      "tags": [
        "장착",
        "안정성",
        "다이어프램 펌프"
      ]
    },
    "diaphragm-installation": {
      "title": "다이어프램 펌프 설치 방법 및 주의사항",
      "tags": [
        "다이어프램 펌프",
        "설치",
        "주의사항"
      ]
    },
    "800-series-gas-liquid": {
      "title": "800 시리즈 기액 다이어프램 펌프 | 6 L/min 유량, 24V 브러시리스 모터",
      "tags": [
        "800 시리즈",
        "기액 펌프",
        "브러시리스 모터"
      ]
    },
    "brushed-vs-brushless-lifespan": {
      "title": "브러시 모터와 브러시리스 모터: 차이는 수명만이 아닙니다",
      "tags": [
        "브러시 모터",
        "브러시리스 모터",
        "사용 수명"
      ]
    },
    "60-series-pressure": {
      "title": "60 시리즈 다이어프램 펌프 최대 압력 테스트",
      "tags": [
        "60 시리즈",
        "압력 테스트",
        "다이어프램 펌프"
      ]
    },
    "motor-selection": {
      "title": "다이어프램 펌프에는 브러시 모터와 브러시리스 모터 중 무엇을 선택해야 할까요?",
      "tags": [
        "모터 선택",
        "브러시 모터",
        "브러시리스 모터"
      ]
    },
    "30h-series-pressure": {
      "title": "30H 시리즈 다이어프램 펌프 내압 측정",
      "tags": [
        "30H 시리즈",
        "내압 성능",
        "압력 테스트"
      ]
    },
    "diaphragm-selection": {
      "title": "다이어프램 펌프 선택 방법",
      "tags": [
        "펌프 선택",
        "다이어프램 펌프",
        "적용 분야"
      ]
    }
  },
  "ru": {
    "dpl60-brushed-pressure-test": {
      "title": "Испытание давления щёточного микромембранного насоса 600 мл/мин",
      "tags": [
        "DPL60",
        "Щёточный двигатель",
        "Испытание давления"
      ]
    },
    "dpl60-brushed-flow-rate-test": {
      "title": "Испытание расхода щёточного мембранного насоса 600 мл/мин",
      "tags": [
        "DPL60",
        "Щёточный двигатель",
        "Испытание расхода"
      ]
    },
    "dpl60-brushless-flow-rate-test": {
      "title": "Испытание расхода бесщёточного микромембранного насоса 600 мл/мин",
      "tags": [
        "DPL60",
        "Бесщёточный двигатель",
        "Испытание расхода"
      ]
    },
    "dpl30-brushed-pressure-test": {
      "title": "Испытание давления щёточного микромембранного насоса DPL30",
      "tags": [
        "DPL30",
        "Щёточный двигатель",
        "Испытание давления"
      ]
    },
    "dpl30-brushless-pressure-test": {
      "title": "Испытание давления бесщёточного мембранного насоса 300 мл/мин",
      "tags": [
        "DPL30",
        "Бесщёточный двигатель",
        "Испытание давления"
      ]
    },
    "dpl30-brushless-flow-rate-test": {
      "title": "Испытание производительности по расходу бесщёточного мембранного насоса 300 мл/мин",
      "tags": [
        "DPL30",
        "Бесщёточный двигатель",
        "Расход"
      ]
    },
    "dpl30-brushed-flow-rate-test": {
      "title": "Испытание расхода щёточного мембранного насоса DPL30",
      "tags": [
        "DPL30",
        "Щёточный двигатель",
        "Испытание расхода"
      ]
    },
    "five-wire-brushless-control-wires": {
      "title": "Для чего нужны управляющие провода в 5-проводном бесщёточном мембранном насосе?",
      "tags": [
        "5-проводной двигатель",
        "Управляющие провода",
        "Бесщёточный двигатель"
      ]
    },
    "two-wire-brushless-diaphragm-pump": {
      "title": "Почему стоит выбрать 2-проводной бесщёточный мембранный насос?",
      "tags": [
        "2-проводной двигатель",
        "Бесщёточный двигатель",
        "DPL60"
      ]
    },
    "diaphragm-pump-hose-barb-protection": {
      "title": "Как предотвратить поломку штуцера мембранного насоса",
      "tags": [
        "Штуцер",
        "Установка",
        "Мембранный насос"
      ]
    },
    "diaphragm-pump-placement-stability": {
      "title": "Почему мембранный насос неустойчив при установке?",
      "tags": [
        "Монтаж",
        "Устойчивость",
        "Мембранный насос"
      ]
    },
    "diaphragm-installation": {
      "title": "Установка мембранного насоса и меры предосторожности",
      "tags": [
        "Мембранный насос",
        "Установка",
        "Меры предосторожности"
      ]
    },
    "800-series-gas-liquid": {
      "title": "Газожидкостный мембранный насос серии 800 | 6 л/мин и бесщёточный двигатель 24 В",
      "tags": [
        "Серия 800",
        "Газожидкостный насос",
        "Бесщёточный двигатель"
      ]
    },
    "brushed-vs-brushless-lifespan": {
      "title": "Щёточные и бесщёточные двигатели: разница не только в сроке службы",
      "tags": [
        "Щёточный двигатель",
        "Бесщёточный двигатель",
        "Срок службы"
      ]
    },
    "60-series-pressure": {
      "title": "Испытание максимального давления мембранного насоса серии 60",
      "tags": [
        "Серия 60",
        "Испытание давления",
        "Мембранный насос"
      ]
    },
    "motor-selection": {
      "title": "Какой двигатель выбрать для мембранного насоса: щёточный или бесщёточный?",
      "tags": [
        "Выбор двигателя",
        "Щёточный двигатель",
        "Бесщёточный двигатель"
      ]
    },
    "30h-series-pressure": {
      "title": "Измеренная стойкость к давлению мембранного насоса серии 30H",
      "tags": [
        "Серия 30H",
        "Стойкость к давлению",
        "Испытание давления"
      ]
    },
    "diaphragm-selection": {
      "title": "Как выбрать мембранный насос",
      "tags": [
        "Выбор насоса",
        "Мембранный насос",
        "Применение"
      ]
    }
  }
};

const installationGuideYouTubeRelations: Record<
  string,
  string[]
> = {
  "dpl60-brushed-pressure-test": ["series:dpl60"],
  "dpl60-brushed-flow-rate-test": ["series:dpl60"],
  "dpl60-brushless-flow-rate-test": ["series:dpl60"],
  "dpl30-brushed-pressure-test": ["series:dpl30"],
  "dpl30-brushless-pressure-test": ["series:dpl30"],
  "dpl30-brushless-flow-rate-test": ["series:dpl30"],
  "dpl30-brushed-flow-rate-test": ["series:dpl30"],
  "five-wire-brushless-control-wires": ["series:dpl60"],
  "two-wire-brushless-diaphragm-pump": ["series:dpl60"],
  "diaphragm-pump-hose-barb-protection": [
    "series:dpl30",
    "series:dpl60",
    "series:dpl30h",
  ],
  "diaphragm-pump-placement-stability": [
    "series:dpl30",
    "series:dpl60",
    "series:dpl30h",
  ],
  "diaphragm-installation": ["series:dpl30"],
  "800-series-gas-liquid": ["series:dpgl800"],
  "brushed-vs-brushless-lifespan": ["series:dpl30"],
  "60-series-pressure": ["series:dpl60"],
  "motor-selection": ["series:dpl30"],
  "30h-series-pressure": ["series:dpl30h"],
  "diaphragm-selection": ["series:dpl30"],
};

function normalizeInstallationGuideLocale(
  locale: InstallationGuideLocale,
): InstallationGuideIntlLocale {
  if (
    locale === "es" ||
    locale === "fr" ||
    locale === "ko" ||
    locale === "ru"
  ) {
    return locale;
  }

  return "en";
}

function getInstallationGuideVideoDescription(
  locale: InstallationGuideIntlLocale,
  title: string,
): string {
  if (locale === "es") {
    return `Tutorial en vídeo: ${title}.`;
  }

  if (locale === "fr") {
    return `Tutoriel vidéo : ${title}.`;
  }

  if (locale === "ko") {
    return `${title} 영상 튜토리얼입니다.`;
  }

  if (locale === "ru") {
    return `Видеоруководство: ${title}.`;
  }

  return `Video tutorial: ${title}.`;
}

function getInstallationGuideYouTubeUrl(
  videoId: string,
  locale: InstallationGuideIntlLocale,
): string {
  const parameters = new URLSearchParams({
    rel: "0",
    playsinline: "1",
    cc_load_policy: "1",
    cc_lang_pref: locale,
    hl: locale,
  });

  return (
    `https://www.youtube.com/embed/${videoId}` +
    `?${parameters.toString()}`
  );
}

export function getInstallationGuideYouTubeGuides(
  locale: InstallationGuideLocale,
): InstallationGuideCard[] {
  const targetLocale =
    normalizeInstallationGuideLocale(locale);

  const copies =
    installationGuideYouTubeCopies[targetLocale];

  return installationGuideYouTubeVideos.map(
    (video) => {
      const copy = copies[video.key];
      const relationKeys =
        installationGuideYouTubeRelations[video.key] ?? [];

      return {
        id: `youtube-${video.key}`,
        relationKeys,
        title: copy.title,
        category: "pumps",
        series: "diaphragm-pump",
        tags: copy.tags,
        description:
          getInstallationGuideVideoDescription(
            targetLocale,
            copy.title,
          ),
        thumbnail: video.thumbnail,
        videoPlatform: "youtube",
        videoUrl:
          getInstallationGuideYouTubeUrl(
            video.videoId,
            targetLocale,
          ),
        keywords: [
          copy.title,
          ...copy.tags,
        ],
        steps: [],
      };
    },
  );
}
