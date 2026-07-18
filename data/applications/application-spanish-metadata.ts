import type { Metadata } from "next";

type SpanishApplicationSlug =
  | "analytical-instruments"
  | "environmental-monitoring"
  | "lab-automation"
  | "life-science"
  | "synthetic-biology";

type SpanishApplicationMetadataConfig = {
  title: string;
  description: string;
  imageAlt: string;
};

const SPANISH_APPLICATION_METADATA: Record<
  SpanishApplicationSlug,
  SpanishApplicationMetadataConfig
> = {
  "analytical-instruments": {
    title: "Soluciones fluídicas para instrumentos analíticos | FOREACH",
    description:
      "Bombas, válvulas, sondas, racores, tubos y sensores para introducción de muestras, reactivos, lavado, evacuación y control fluídico en instrumentos analíticos.",
    imageAlt: "Soluciones fluídicas para instrumentos analíticos",
  },
  "environmental-monitoring": {
    title: "Soluciones fluídicas para monitoreo ambiental | FOREACH",
    description:
      "Componentes fluídicos para muestreo de agua, dosificación de reactivos, filtración, lavado, drenaje y funcionamiento continuo en equipos ambientales.",
    imageAlt: "Soluciones fluídicas para equipos de monitoreo ambiental",
  },
  "lab-automation": {
    title: "Soluciones fluídicas para automatización de laboratorio | FOREACH",
    description:
      "Bombas, válvulas, sondas, racores, tubos y sensores para pipeteo, dispensación, lavado, microplacas e integración de sistemas automatizados.",
    imageAlt: "Soluciones fluídicas para automatización de laboratorio",
  },
  "life-science": {
    title: "Soluciones fluídicas para ciencias de la vida | FOREACH",
    description:
      "Componentes fluídicos para preparación de muestras, cultivo celular, pipeteo, análisis de proteínas, bioprocesos y automatización en ciencias de la vida.",
    imageAlt: "Soluciones fluídicas para instrumentos de ciencias de la vida",
  },
  "synthetic-biology": {
    title: "Soluciones fluídicas para biología sintética | FOREACH",
    description:
      "Bombas, válvulas, sondas, racores, tubos y sensores para alimentación, muestreo, cribado, lavado y control de procesos de biología sintética.",
    imageAlt: "Soluciones fluídicas para sistemas de biología sintética",
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

export function createSpanishApplicationMetadata(
  slug: SpanishApplicationSlug,
): Metadata {
  const config = SPANISH_APPLICATION_METADATA[slug];
  const route = `/applications/${slug}/`;
  const canonical = `https://www.foreachtek.com/es${route}`;
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
      locale: "es_ES",
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
