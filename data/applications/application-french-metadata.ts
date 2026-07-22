import type { Metadata } from "next";

type FrenchApplicationSlug =
  | "analytical-instruments"
  | "environmental-monitoring"
  | "lab-automation"
  | "life-science"
  | "synthetic-biology";

type FrenchApplicationMetadataConfig = {
  title: string;
  description: string;
  imageAlt: string;
};

const FRENCH_APPLICATION_METADATA: Record<
  FrenchApplicationSlug,
  FrenchApplicationMetadataConfig
> = {
  "analytical-instruments": {
    title: "Solutions fluidiques pour instruments analytiques | FOREACH",
    description:
      "Pompes, vannes, sondes, raccords, tubes et capteurs pour l’injection des échantillons, les réactifs, le lavage, l’évacuation et la commande fluidique.",
    imageAlt: "Solutions fluidiques pour instruments analytiques",
  },
  "environmental-monitoring": {
    title: "Solutions fluidiques pour la surveillance environnementale | FOREACH",
    description:
      "Composants fluidiques pour le prélèvement d’eau, le dosage des réactifs, la filtration, le lavage, la vidange et le fonctionnement continu.",
    imageAlt:
      "Solutions fluidiques pour équipements de surveillance environnementale",
  },
  "lab-automation": {
    title: "Solutions fluidiques pour l’automatisation de laboratoire | FOREACH",
    description:
      "Pompes, vannes, sondes, raccords, tubes et capteurs pour le pipetage, la distribution, le lavage, les microplaques et l’intégration de systèmes automatisés.",
    imageAlt: "Solutions fluidiques pour l’automatisation de laboratoire",
  },
  "life-science": {
    title: "Solutions fluidiques pour les sciences de la vie | FOREACH",
    description:
      "Composants fluidiques pour la préparation des échantillons, la culture cellulaire, le pipetage, l’analyse des protéines, les bioprocédés et l’automatisation.",
    imageAlt:
      "Solutions fluidiques pour instruments de sciences de la vie",
  },
  "synthetic-biology": {
    title: "Solutions fluidiques pour la biologie synthétique | FOREACH",
    description:
      "Pompes, vannes, sondes, raccords, tubes et capteurs pour l’alimentation, le prélèvement, le criblage, le lavage et la maîtrise des bioprocédés.",
    imageAlt: "Solutions fluidiques pour systèmes de biologie synthétique",
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

export function createFrenchApplicationMetadata(
  slug: FrenchApplicationSlug,
): Metadata {
  const config = FRENCH_APPLICATION_METADATA[slug];
  const route = `/applications/${slug}/`;
  const canonical = `https://www.foreachtek.com/fr${route}`;
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
      locale: "fr_FR",
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
