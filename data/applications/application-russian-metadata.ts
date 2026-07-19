import type { Metadata } from "next";

type RussianApplicationSlug =
  | "analytical-instruments"
  | "environmental-monitoring"
  | "lab-automation"
  | "life-science"
  | "synthetic-biology";

type RussianApplicationMetadataConfig = {
  title: string;
  description: string;
  imageAlt: string;
};

const RUSSIAN_APPLICATION_METADATA: Record<
  RussianApplicationSlug,
  RussianApplicationMetadataConfig
> = {
  "analytical-instruments": {
    title: "Жидкостные решения для аналитических приборов | FOREACH",
    description:
      "Насосы, клапаны, иглы, фитинги, трубки и датчики для ввода образцов, подачи реагентов, промывки, удаления отходов и управления потоками.",
    imageAlt: "Жидкостные решения для аналитических приборов",
  },
  "environmental-monitoring": {
    title: "Жидкостные решения для экологического мониторинга | FOREACH",
    description:
      "Жидкостные компоненты для отбора проб воды, дозирования реагентов, фильтрации, промывки, слива и длительной непрерывной работы.",
    imageAlt:
      "Жидкостные решения для оборудования экологического мониторинга",
  },
  "lab-automation": {
    title: "Жидкостные решения для лабораторной автоматизации | FOREACH",
    description:
      "Насосы, клапаны, иглы, фитинги, трубки и датчики для пипетирования, дозирования, промывки, обработки микропланшетов и интеграции автоматизированных систем.",
    imageAlt: "Жидкостные решения для лабораторной автоматизации",
  },
  "life-science": {
    title: "Жидкостные решения для наук о жизни | FOREACH",
    description:
      "Жидкостные компоненты для подготовки образцов, культивирования клеток, пипетирования, анализа белков, биопроцессов и автоматизации.",
    imageAlt:
      "Жидкостные решения для оборудования в области наук о жизни",
  },
  "synthetic-biology": {
    title: "Жидкостные решения для синтетической биологии | FOREACH",
    description:
      "Насосы, клапаны, иглы, фитинги, трубки и датчики для подачи среды, отбора проб, скрининга, промывки и управления биопроцессами.",
    imageAlt: "Жидкостные решения для систем синтетической биологии",
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

export function createRussianApplicationMetadata(
  slug: RussianApplicationSlug,
): Metadata {
  const config = RUSSIAN_APPLICATION_METADATA[slug];
  const route = `/applications/${slug}/`;
  const canonical = `https://www.foreachtek.com/ru${route}`;
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
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonical,
      locale: "ru_RU",
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
