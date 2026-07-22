import type { Metadata } from "next";

type KoreanApplicationSlug =
  | "analytical-instruments"
  | "environmental-monitoring"
  | "lab-automation"
  | "life-science"
  | "synthetic-biology";

const KOREAN_APPLICATION_METADATA: Record<
  KoreanApplicationSlug,
  { title: string; description: string; imageAlt: string }
> = {
  "analytical-instruments": {
    title: "분석 장비용 정밀 유로 솔루션 | FOREACH",
    description:
      "분석 장비의 샘플 주입, 시약 공급, 세척, 폐액 배출 및 유로 제어를 위한 펌프, 밸브, 니들, 피팅, 튜빙과 센서를 제공합니다.",
    imageAlt: "분석 장비용 정밀 유로 솔루션",
  },
  "environmental-monitoring": {
    title: "환경 모니터링 장비용 유로 솔루션 | FOREACH",
    description:
      "환경 모니터링 장비의 수질 샘플링, 시약 분주, 여과, 세척, 배액 및 장기 온라인 운전을 위한 유체 부품을 제공합니다.",
    imageAlt: "환경 모니터링 장비용 유로 솔루션",
  },
  "lab-automation": {
    title: "실험실 자동화용 정밀 유로 솔루션 | FOREACH",
    description:
      "자동 피펫팅, 분주, 세척, 마이크로플레이트 처리 및 시스템 통합을 위한 펌프, 밸브, 니들, 피팅, 튜빙과 센서를 제공합니다.",
    imageAlt: "실험실 자동화용 정밀 유로 솔루션",
  },
  "life-science": {
    title: "생명과학 장비용 정밀 유로 솔루션 | FOREACH",
    description:
      "샘플 전처리, 세포 배양, 피펫팅, 단백질 분석, 바이오프로세스 및 생명과학 자동화를 위한 유체 부품을 제공합니다.",
    imageAlt: "생명과학 장비용 정밀 유로 솔루션",
  },
  "synthetic-biology": {
    title: "합성생물학 시스템용 유로 솔루션 | FOREACH",
    description:
      "합성생물학 시스템의 배지 공급, 샘플링, 스크리닝, 세척 및 공정 제어를 위한 펌프, 밸브, 니들, 피팅, 튜빙과 센서를 제공합니다.",
    imageAlt: "합성생물학 시스템용 유로 솔루션",
  },
};

const LANGUAGE_PREFIXES = {
  "zh-CN": "",
  en: "/en",
  es: "/es",
  fr: "/fr",
  ko: "/ko",
  ru: "/ru",
};

export function createKoreanApplicationMetadata(
  slug: KoreanApplicationSlug,
): Metadata {
  const config = KOREAN_APPLICATION_METADATA[slug];
  const route = `/applications/${slug}/`;
  const canonical = `https://www.foreachtek.com/ko${route}`;
  const languages = Object.fromEntries(
    Object.entries(LANGUAGE_PREFIXES).map(([locale, prefix]) => [
      locale,
      `https://www.foreachtek.com${prefix}${route}`,
    ]),
  );
  const imageUrl = `https://www.foreachtek.com/images/applications/${slug}/${slug}-hero-bg-1920x800-v001.webp`;

  return {
    title: config.title,
    description: config.description,
    alternates: { canonical, languages },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonical,
      locale: "ko_KR",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1920,
          height: 800,
          alt: config.imageAlt,
        },
      ],
    },
  };
}
