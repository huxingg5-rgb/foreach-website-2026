import type { HomeHeroLocale } from "@/data/home-hero.intl";

export const homeCarouselRole: Record<HomeHeroLocale, string> = {
  hi: "स्लाइड शो",
  de: "Karussell",
  it: "carosello",
  "zh-CN": "轮播图", en: "carousel", es: "carrusel", fr: "carrousel", ko: "캐러셀", ru: "карусель",
};

export const homeUiText: Record<HomeHeroLocale, { banners: string; chooseBanner: string; showBanner: (number: number) => string; videoFallback: string }> = {
  "zh-CN": { banners: "首页轮播图", chooseBanner: "切换首页轮播图", showBanner: (n) => `显示第 ${n} 张轮播图`, videoFallback: "当前浏览器不支持视频播放。" },
  en: { banners: "Homepage banners", chooseBanner: "Choose a homepage banner", showBanner: (n) => `Show banner ${n}`, videoFallback: "Your browser does not support video playback." },
  hi: { banners: "होम पेज के बैनर", chooseBanner: "बैनर चुनें", showBanner: (n) => "बैनर " + n + " दिखाएँ", videoFallback: "आपका ब्राउज़र वीडियो नहीं चला सकता।" },
  it: { banners: "Banner della pagina iniziale", chooseBanner: "Seleziona un banner", showBanner: (n) => "Mostra banner " + n, videoFallback: "Il browser non supporta la riproduzione video." },
  de: { banners: "Startseitenbanner", chooseBanner: "Startseitenbanner wählen", showBanner: (n) => "Banner " + n + " anzeigen", videoFallback: "Ihr Browser unterstützt keine Videowiedergabe." },
  es: { banners: "Diapositivas de la página de inicio", chooseBanner: "Elegir una diapositiva de inicio", showBanner: (n) => `Mostrar diapositiva ${n}`, videoFallback: "Su navegador no admite la reproducción de vídeo." },
  fr: { banners: "Diaporama de la page d’accueil", chooseBanner: "Choisir une diapositive d’accueil", showBanner: (n) => `Afficher la diapositive ${n}`, videoFallback: "Votre navigateur ne prend pas en charge la lecture vidéo." },
  ko: { banners: "홈페이지 배너", chooseBanner: "홈페이지 배너 선택", showBanner: (n) => `배너 ${n} 표시`, videoFallback: "이 브라우저는 동영상 재생을 지원하지 않습니다." },
  ru: { banners: "Слайды главной страницы", chooseBanner: "Выбрать слайд главной страницы", showBanner: (n) => `Показать слайд ${n}`, videoFallback: "Ваш браузер не поддерживает воспроизведение видео." },
};
