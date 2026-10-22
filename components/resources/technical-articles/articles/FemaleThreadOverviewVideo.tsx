import { getVideoGuideDetail } from "@/data/resources/installation-guide/video-guide-details.en";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";
import styles from "./FemaleThreadOverviewVideo.module.css";

type VideoLocale = Exclude<TechnicalArticleLocale, "zh-CN">;

const copy: Record<VideoLocale, { heading: string; caption: string; note: string; watch: string }> = {
  en: {
    heading: "Video overview: female thread connectors",
    caption: "Female thread connector overview",
    note: "See the connector shapes and M6 / 1/4-28 UNF interface options before the connection and selection details below. For different-thread adapters, confirm the specific model and availability.",
    watch: "Watch on YouTube",
  },
  es: {
    heading: "Vídeo de presentación: racores de rosca hembra",
    caption: "Presentación de los racores de rosca hembra",
    note: "Conozca las formas de los racores y las opciones de conexión M6 / 1/4-28 UNF antes de consultar los detalles de conexión y selección. Para adaptadores con roscas distintas, confirme el modelo concreto y su disponibilidad.",
    watch: "Ver en YouTube",
  },
  fr: {
    heading: "Présentation vidéo : raccords à filetage femelle",
    caption: "Présentation des raccords à filetage femelle",
    note: "Découvrez les formes des raccords et les interfaces M6 / 1/4-28 UNF avant de consulter les détails de raccordement et de sélection ci-dessous. Pour une adaptation entre filetages différents, confirmez le modèle précis et sa disponibilité.",
    watch: "Voir sur YouTube",
  },
  ko: {
    heading: "제품 소개 영상: 암나사 피팅",
    caption: "암나사 피팅 제품 소개",
    note: "아래의 연결 및 선정 설명을 읽기 전에 피팅 형상과 M6 / 1/4-28 UNF 연결 규격을 영상으로 확인하세요. 서로 다른 나사 규격을 연결하는 어댑터는 해당 모델과 공급 가능 여부를 별도로 확인해야 합니다.",
    watch: "YouTube에서 보기",
  },
  ru: {
    heading: "Видеообзор соединителей с внутренней резьбой",
    caption: "Обзор соединителей с внутренней резьбой",
    note: "Ознакомьтесь с формами соединителей и вариантами резьбы M6 / 1/4-28 UNF перед изучением подключения и выбора ниже. Для перехода между разными резьбами уточните конкретную модель и возможность поставки.",
    watch: "Смотреть на YouTube",
  },
};

export default function FemaleThreadOverviewVideo({ locale }: { locale: VideoLocale }) {
  const video = getVideoGuideDetail("en", "youtube-female-thread-conversion");
  if (!video) return null;
  const ui = copy[locale];
  const embedUrl = new URL(video.embedUrl);
  embedUrl.searchParams.set("hl", locale);
  embedUrl.searchParams.set("cc_lang_pref", locale);
  const duration = video.duration.replace(/^PT(?:(\d+)M)?(\d+)S$/, (_match, minutes = "0", seconds: string) => `${minutes}:${seconds.padStart(2, "0")}`);

  return (
    <div className={styles.overview} data-article-video>
      <p className={styles.heading}><strong>{ui.heading}</strong></p>
      <figure className={styles.figure}>
        <iframe
          className={styles.player}
          src={embedUrl.toString()}
          title={ui.caption}
          width={1280}
          height={720}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <figcaption className={styles.caption}>{ui.caption} · <time dateTime={video.duration}>{duration}</time> · FOREACH</figcaption>
      </figure>
      <p className={styles.note}>{ui.note}</p>
      <p><a href={video.watchUrl} target="_blank" rel="noopener noreferrer">{ui.watch} ↗</a></p>
    </div>
  );
}
