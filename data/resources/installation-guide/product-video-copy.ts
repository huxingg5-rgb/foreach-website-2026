import en from "./product-video-copy.en.json";
import zh from "./product-video-copy.zh-CN.json";
import es from "./product-video-copy.es.json";
import fr from "./product-video-copy.fr.json";
import ko from "./product-video-copy.ko.json";
import ru from "./product-video-copy.ru.json";
import type { VideoGuideDetail } from "./video-guide-detail.types";

// Product facts follow the local EA series copy, published Q20/Q40/Q60 rows,
// and PVC content/configurator. English narration is distinct from page language.
export type ProductVideoCopy = Pick<VideoGuideDetail, "title" | "description" | "leadParagraphs" | "keywords"> &
  Partial<Pick<VideoGuideDetail, "breadcrumbLabel" | "watchHeading" | "caption" | "media" |
    "highlightsHeading" | "highlightsIntroduction" | "highlights" | "productHeading" |
    "productIntroduction" | "support">> & {
      productLinkTitle?: string;
      sections?: { title: string; paragraphs: string[]; linkTitle?: string }[];
    };

const copies: Record<string, Record<string, ProductVideoCopy>> = { en, "zh-CN": zh, es, fr, ko, ru };

export function getProductVideoCopy(locale: string, id: string): ProductVideoCopy | undefined {
  return copies[locale]?.[id.replace(/^youtube-/, "")];
}

export const videoGuideUi = {
  "zh-CN": { home: "首页", guides: "使用教程", back: "返回", contact: "联系技术支持", watch: "在 YouTube 上观看", highlights: "视频要点", duration: "42 秒" },
  en: { home: "Home", guides: "Installation Guides", back: "Back", contact: "Contact technical support", watch: "Watch on YouTube", highlights: "Video highlights", duration: "42 seconds" },
  es: { home: "Inicio", guides: "Guías de instalación", back: "Volver", contact: "Contactar con soporte técnico", watch: "Ver en YouTube", highlights: "Puntos destacados", duration: "42 segundos" },
  fr: { home: "Accueil", guides: "Guides d’installation", back: "Retour", contact: "Contacter le support technique", watch: "Voir sur YouTube", highlights: "Points clés", duration: "42 secondes" },
  ko: { home: "홈", guides: "설치 가이드", back: "돌아가기", contact: "기술 지원 문의", watch: "YouTube에서 보기", highlights: "영상 주요 내용", duration: "42초" },
  ru: { home: "Главная", guides: "Руководства по установке", back: "Назад", contact: "Связаться с технической поддержкой", watch: "Смотреть на YouTube", highlights: "Основные моменты", duration: "42 секунды" },
};
