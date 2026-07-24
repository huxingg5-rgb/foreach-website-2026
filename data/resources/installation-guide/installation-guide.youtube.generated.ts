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

      return {
        id: `youtube-${video.key}`,
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
