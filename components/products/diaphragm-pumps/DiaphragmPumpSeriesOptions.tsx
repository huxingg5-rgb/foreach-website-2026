import Link from "next/link";

import { diaphragmPumpReferenceModels } from "@/data/products/detail/diaphragm-pump-reference-models";
import {
  getDiaphragmPumpPath,
  normalizeDiaphragmPumpLocale,
} from "@/data/products/detail/diaphragm-pump-routes";
import { getDiaphragmPumpSeriesCopy } from "@/data/products/detail/diaphragm-pump-series-copy";

import styles from "./DiaphragmPumpSeriesOptions.module.css";

type DiaphragmPumpSeriesOptionsProps = {
  locale: "zh-CN" | "en" | "es" | "fr" | "ko" | "ru";
  seriesSlug: string;
};

const VIEW_CONFIGURATION_COPY = {
  zh: (model: string) => `查看 ${model} 配置详情`,
  en: (model: string) => `View ${model} configuration`,
  es: (model: string) => `Ver la configuración ${model}`,
  fr: (model: string) => `Voir la configuration ${model}`,
  ko: (model: string) => `${model} 구성 상세 보기`,
  ru: (model: string) => `Открыть исполнение ${model}`,
} as const;

export default function DiaphragmPumpSeriesOptions({
  locale,
  seriesSlug,
}: DiaphragmPumpSeriesOptionsProps) {
  const normalizedLocale = normalizeDiaphragmPumpLocale(locale);
  const copy = getDiaphragmPumpSeriesCopy(seriesSlug, normalizedLocale);

  if (!copy) return null;

  const configurations = diaphragmPumpReferenceModels.filter(
    (reference) => reference.sourceSeriesSlug === copy.seriesSlug,
  );

  if (configurations.length === 0) return null;

  const headingId = `${copy.seriesSlug}-configurations-title`;

  return (
    <section
      aria-labelledby={headingId}
      className={styles.section}
      data-diaphragm-series-configurations={copy.seriesSlug}
    >
      <div className={styles.header}>
        <h2 id={headingId}>{copy.optionsTitle}</h2>
        <p>{copy.optionsIntro}</p>
      </div>

      <div className={styles.grid}>
        {configurations.map((reference) => (
          <article className={styles.card} key={reference.slug}>
            <div>
              <h3>{reference.model}</h3>
              <p>{reference.localized[normalizedLocale].cardSubtitle}</p>
            </div>
            <Link
              className={styles.link}
              href={getDiaphragmPumpPath(normalizedLocale, reference.slug)}
            >
              {VIEW_CONFIGURATION_COPY[normalizedLocale](reference.model)}
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
