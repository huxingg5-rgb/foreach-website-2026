import { fittingOverviewVideoRelations } from "@/data/resources/installation-guide/fitting-video-relations";
import type { InstallationGuideCard, InstallationGuideLocale } from "./installation-guide.types";
import { getInstallationGuideYouTubeGuides } from "./installation-guide.youtube.generated";

// Channel additions matched by YouTube video ID. Three fitting/filter videos verified on 2026-10-27.
// Keep the existing local Chinese tutorials and the 18 translated YouTube guides intact.
const videos = [
  {"key":"f-ss-water-circulation-filter","videoId":"2K0r5MMFcHs","thumbnail":"/images/resources/installation-guide/youtube/f-ss-water-circulation-filter-cover.jpg","category":"fittings","series":"filters","relationKeys":["topic:f-ss-water-circulation"],"keywords":["F-SS","water circulation filter","water loop filtration"]},
  {"key":"thread-to-barb-fittings","videoId":"i7Gr86k5xoI","thumbnail":"/images/resources/installation-guide/youtube/thread-to-barb-fittings-cover.jpg","category":"fittings","series":"thread-to-barbed-fittings","relationKeys":fittingOverviewVideoRelations["youtube-thread-to-barb-fittings"],"keywords":["thread-to-barb fittings","threaded hose barb","flexible tubing","tubing inner diameter"]},
  {"key":"rigid-tubing-fittings","videoId":"20BZArgyibY","thumbnail":"/images/resources/installation-guide/youtube/rigid-tubing-fittings-cover.jpg","category":"fittings","series":"hard-tube-fittings","relationKeys":fittingOverviewVideoRelations["youtube-rigid-tubing-fittings"],"keywords":["rigid tubing fittings","hard tube fittings","tubing outer diameter","flanged fitting","flangeless fitting"]},
  { key: "syringe-installation", videoId: "llwyaeH9Ti4", category: "pumps", series: "syringe-pump", relationKeys: ["category:syringe-pumps"], keywords: ["syringe installation"] },
  { key: "q60-quick-fitting", videoId: "tmwsLxhxBPQ", category: "fittings", series: "quick-connect-fittings", relationKeys: ["series:q60"], keywords: ["Q60", "quick fitting"] },
  { key: "female-thread-conversion", videoId: "W1FQgD9sVK8", category: "fittings", series: "female-thread-adapters", relationKeys: [], keywords: ["female thread conversion"] },
  { key: "bubble-detection-module", videoId: "iafwYrNZs9k", category: "sensors", series: "bubble-detection", relationKeys: [], keywords: ["bubble detection module"] },
  { key: "dpl30-vs-dpl30h", videoId: "ReMmjMTZgjM", category: "pumps", series: "diaphragm-pump", relationKeys: ["series:dpl30", "series:dpl30h"], keywords: ["DPL30", "DPL30H", "selection comparison"] },
  { key: "dpgl800-vacuum-test", videoId: "zIRjV3F279I", category: "pumps", series: "diaphragm-pump", relationKeys: ["series:dpgl800"], keywords: ["DPGL800", "vacuum test"] },
  { key: "dpl-series-introduction", videoId: "FfOkY6ZA8yc", category: "pumps", series: "diaphragm-pump", relationKeys: [], keywords: ["DPL", "diaphragm pumps"] },
  { key: "lld-liquid-level-detection", videoId: "TlwZ3Ba6H_M", category: "sensors", series: "liquid-level-detection", relationKeys: [], keywords: ["LLD", "liquid level detection", "automated pipetting"] },
  { key: "about-foreach", videoId: "4lJCbmfZZEs", category: "company", series: "company", relationKeys: [], keywords: ["FOREACH", "Foreach Fluid", "ForeachTechnology"] },
] as const;

type VideoKey = (typeof videos)[number]["key"];
type ChannelCopy = {
  companyCategory: string;
  watchOnYouTube: string;
  videoLabel: string;
  videos: Record<VideoKey, readonly [title: string, tag: string]>;
};

export const channelVideoCopy: Record<InstallationGuideLocale, ChannelCopy> = {
  "zh-CN": {
    companyCategory: "公司介绍", watchOnYouTube: "在 YouTube 观看", videoLabel: "FOREACH 视频",
    videos: {
      "f-ss-water-circulation-filter": ["F-SS 水循环过滤器：循环水路过滤","水循环过滤"],
      "thread-to-barb-fittings": ["螺纹转倒刺接头：连接软管与螺纹接口","螺纹转倒刺接头"],
      "rigid-tubing-fittings": ["硬管接头：液路系统连接","硬管接头"],
      "syringe-installation": ["注射泵的注射器安装教程", "注射器安装"],
      "q60-quick-fitting": ["Q60 系列快速接头介绍", "快速接头"],
      "female-thread-conversion": ["内螺纹转换连接方案", "螺纹转换"],
      "bubble-detection-module": ["气泡检测模块介绍", "气泡检测"],
      "dpl30-vs-dpl30h": ["DPL30 与 DPL30H 微型隔膜液体泵选型对比", "选型对比"],
      "dpgl800-vacuum-test": ["DPGL800 双头隔膜气液混合泵负压实测", "负压测试"],
      "dpl-series-introduction": ["DPL 系列隔膜泵介绍", "产品介绍"],
      "lld-liquid-level-detection": ["LLD 液位检测模块与自动移液", "液位检测"],
      "about-foreach": ["FOREACH 公司介绍", "公司介绍"],
    },
  },
  en: {
    companyCategory: "About FOREACH", watchOnYouTube: "Watch on YouTube", videoLabel: "FOREACH video",
    videos: {
      "f-ss-water-circulation-filter": ["F-SS Water Circulation Filter | Water Loop Filtration","Water filtration"],
      "thread-to-barb-fittings": ["Thread-to-Barb Fittings | Connect Flexible Tubing to Threaded Ports","Thread-to-barb fittings"],
      "rigid-tubing-fittings": ["Rigid Tubing Fittings | Fluid System Connections","Rigid tubing fittings"],
      "syringe-installation": ["Syringe Pump: Syringe Installation Guide", "Syringe installation"],
      "q60-quick-fitting": ["Q60 Series Quick Fittings", "Quick fittings"],
      "female-thread-conversion": ["Female Thread Conversion Solutions", "Thread adapters"],
      "bubble-detection-module": ["Bubble Detection Module", "Bubble detection"],
      "dpl30-vs-dpl30h": ["DPL30 vs. DPL30H: Micro Diaphragm Liquid Pump Selection", "Pump selection"],
      "dpgl800-vacuum-test": ["DPGL800 Dual-Head Gas-Liquid Diaphragm Pump Vacuum Test", "Vacuum test"],
      "dpl-series-introduction": ["Introducing DPL Series Diaphragm Pumps", "Product overview"],
      "lld-liquid-level-detection": ["LLD Liquid Level Detection for Automated Pipetting", "Liquid level detection"],
      "about-foreach": ["About FOREACH", "Company overview"],
    },
  },
  es: {
    companyCategory: "Acerca de FOREACH", watchOnYouTube: "Ver en YouTube", videoLabel: "Vídeo de FOREACH",
    videos: {
      "f-ss-water-circulation-filter": ["Filtro de circulación de agua F-SS para circuitos de recirculación","Filtración de agua"],
      "thread-to-barb-fittings": ["Racores roscados con espiga para conectar tubos flexibles","Racores roscados con espiga"],
      "rigid-tubing-fittings": ["Racores para tubos rígidos en sistemas de fluidos","Racores para tubos rígidos"],
      "syringe-installation": ["Bomba de jeringa: guía de instalación de la jeringa", "Instalación de la jeringa"],
      "q60-quick-fitting": ["Conectores rápidos de la serie Q60", "Conectores rápidos"],
      "female-thread-conversion": ["Soluciones de adaptación de roscas hembra", "Adaptadores de rosca"],
      "bubble-detection-module": ["Módulo de detección de burbujas", "Detección de burbujas"],
      "dpl30-vs-dpl30h": ["DPL30 y DPL30H: selección de microbombas de diafragma para líquidos", "Selección de bombas"],
      "dpgl800-vacuum-test": ["DPGL800: ensayo de vacío de la bomba de diafragma de doble cabezal para gas y líquido", "Ensayo de vacío"],
      "dpl-series-introduction": ["Presentación de las bombas de diafragma de la serie DPL", "Presentación del producto"],
      "lld-liquid-level-detection": ["Detección de nivel de líquido LLD para pipeteo automatizado", "Detección de nivel"],
      "about-foreach": ["Acerca de FOREACH", "Presentación de la empresa"],
    },
  },
  fr: {
    companyCategory: "À propos de FOREACH", watchOnYouTube: "Voir sur YouTube", videoLabel: "Vidéo FOREACH",
    videos: {
      "f-ss-water-circulation-filter": ["Filtre de circulation d’eau F-SS pour circuits en boucle","Filtration de l’eau"],
      "thread-to-barb-fittings": ["Raccords filetés à embout cannelé pour tubes souples","Raccords filetés cannelés"],
      "rigid-tubing-fittings": ["Raccords pour tubes rigides dans les circuits de fluides","Raccords pour tubes rigides"],
      "syringe-installation": ["Pompe à seringue : guide d’installation de la seringue", "Installation de la seringue"],
      "q60-quick-fitting": ["Raccords rapides de la série Q60", "Raccords rapides"],
      "female-thread-conversion": ["Solutions d’adaptation de filetages femelles", "Adaptateurs filetés"],
      "bubble-detection-module": ["Module de détection de bulles", "Détection de bulles"],
      "dpl30-vs-dpl30h": ["DPL30 ou DPL30H : choisir une micropompe à membrane pour liquides", "Choix de pompe"],
      "dpgl800-vacuum-test": ["DPGL800 : essai de vide de la pompe à membrane à double tête pour gaz et liquides", "Essai de vide"],
      "dpl-series-introduction": ["Présentation des pompes à membrane de la série DPL", "Présentation du produit"],
      "lld-liquid-level-detection": ["Détection de niveau de liquide LLD pour le pipetage automatisé", "Détection de niveau"],
      "about-foreach": ["À propos de FOREACH", "Présentation de l’entreprise"],
    },
  },
  ko: {
    companyCategory: "FOREACH 소개", watchOnYouTube: "YouTube에서 보기", videoLabel: "FOREACH 동영상",
    videos: {
      "f-ss-water-circulation-filter": ["F-SS 순환수 필터: 순환수 회로 여과","순환수 여과"],
      "thread-to-barb-fittings": ["나사-호스 바브 피팅: 연질 튜브와 나사 포트 연결","나사-호스 바브 피팅"],
      "rigid-tubing-fittings": ["경질 튜브 피팅: 유체 시스템 연결","경질 튜브 피팅"],
      "syringe-installation": ["시린지 펌프의 시린지 설치 가이드", "시린지 설치"],
      "q60-quick-fitting": ["Q60 시리즈 퀵 커넥터 소개", "퀵 커넥터"],
      "female-thread-conversion": ["암나사 변환 연결 솔루션", "나사 어댑터"],
      "bubble-detection-module": ["기포 감지 모듈 소개", "기포 감지"],
      "dpl30-vs-dpl30h": ["DPL30과 DPL30H 소형 액체 다이어프램 펌프 선정 비교", "펌프 선정"],
      "dpgl800-vacuum-test": ["DPGL800 듀얼 헤드 기체·액체 다이어프램 펌프 진공 시험", "진공 시험"],
      "dpl-series-introduction": ["DPL 시리즈 다이어프램 펌프 소개", "제품 소개"],
      "lld-liquid-level-detection": ["자동 피펫팅을 위한 LLD 액면 감지 모듈", "액면 감지"],
      "about-foreach": ["FOREACH 회사 소개", "회사 소개"],
    },
  },
  ru: {
    companyCategory: "О компании FOREACH", watchOnYouTube: "Смотреть на YouTube", videoLabel: "Видео FOREACH",
    videos: {
      "f-ss-water-circulation-filter": ["Фильтр F-SS для рециркуляционных водяных контуров","Фильтрация воды"],
      "thread-to-barb-fittings": ["Резьбовые штуцеры для соединения гибких трубок с резьбовыми портами","Резьбовые штуцеры"],
      "rigid-tubing-fittings": ["Фитинги для жёстких трубок в жидкостных системах","Фитинги для жёстких трубок"],
      "syringe-installation": ["Шприцевой насос: руководство по установке шприца", "Установка шприца"],
      "q60-quick-fitting": ["Быстроразъёмные соединения серии Q60", "Быстроразъёмные соединения"],
      "female-thread-conversion": ["Переходники с внутренней резьбой", "Резьбовые переходники"],
      "bubble-detection-module": ["Модуль обнаружения пузырьков", "Обнаружение пузырьков"],
      "dpl30-vs-dpl30h": ["DPL30 и DPL30H: выбор миниатюрного мембранного насоса для жидкости", "Выбор насоса"],
      "dpgl800-vacuum-test": ["DPGL800: вакуумное испытание двухголовочного мембранного насоса для газа и жидкости", "Вакуумное испытание"],
      "dpl-series-introduction": ["Обзор мембранных насосов серии DPL", "Обзор продукта"],
      "lld-liquid-level-detection": ["Обнаружение уровня жидкости LLD для автоматического пипетирования", "Определение уровня"],
      "about-foreach": ["О компании FOREACH", "О компании"],
    },
  },
};

export function getChannelVideoAdditions(locale: InstallationGuideLocale): InstallationGuideCard[] {
  const copy = channelVideoCopy[locale];
  const language = locale === "zh-CN" ? "zh-Hans" : locale;
  return videos.map(video => {
    const [title, tag] = copy.videos[video.key];
    return {
      id: `youtube-${video.key}`,
      relationKeys: video.key === "female-thread-conversion" && locale !== "zh-CN"
        ? ["category:female-thread-adapters"] : [...video.relationKeys],
      title,
      category: video.category,
      series: video.series,
      tags: [tag],
      description: `${copy.videoLabel}: ${title}`,
      thumbnail: "thumbnail" in video ? video.thumbnail : `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`,
      videoPlatform: "youtube",
      videoUrl: `https://www.youtube.com/embed/${video.videoId}?rel=0&playsinline=1&hl=${language}&cc_lang_pref=${language}`,
      keywords: [title, tag, ...video.keywords, video.videoId],
      steps: [],
    };
  });
}

// The five Chinese MP4 tutorials already cover bVbg038KImo, ntivZyFe1B0,
// fH9ofJfE4Us, zgP7udU0asI and EUt7BG3WWwA. Preserve their IDs and local playback.
const chineseBackfill: Record<string, readonly [title: string, tag: string]> = {
  "youtube-dpl60-brushed-pressure-test": ["DPL60 有刷微型隔膜泵耐压测试", "耐压测试"],
  "youtube-dpl60-brushed-flow-rate-test": ["DPL60 有刷隔膜泵流量测试", "流量测试"],
  "youtube-dpl60-brushless-flow-rate-test": ["DPL60 无刷微型隔膜泵流量测试", "流量测试"],
  "youtube-dpl30-brushed-pressure-test": ["DPL30 有刷微型隔膜泵耐压测试", "耐压测试"],
  "youtube-dpl30-brushless-pressure-test": ["DPL30 无刷隔膜泵耐压测试", "耐压测试"],
  "youtube-dpl30-brushless-flow-rate-test": ["DPL30 无刷隔膜泵流量实测", "流量测试"],
  "youtube-dpl30-brushed-flow-rate-test": ["DPL30 有刷隔膜泵流量实测", "流量测试"],
  "youtube-five-wire-brushless-control-wires": ["五线无刷隔膜泵各控制线的作用", "控制接线"],
  "youtube-two-wire-brushless-diaphragm-pump": ["为什么选择两线无刷隔膜泵？", "电机选型"],
  "youtube-diaphragm-pump-hose-barb-protection": ["如何预防隔膜泵软管接嘴断裂", "安装注意事项"],
  "youtube-diaphragm-pump-placement-stability": ["隔膜泵放置不稳的原因", "安装注意事项"],
  "youtube-800-series-gas-liquid": ["800 系列气液两用隔膜泵介绍", "产品介绍"],
  "youtube-motor-selection": ["隔膜泵选择有刷电机还是无刷电机？", "电机选型"],
};

export function getChineseChannelBackfill(): InstallationGuideCard[] {
  return getInstallationGuideYouTubeGuides("en").flatMap(guide => {
    const copy = chineseBackfill[guide.id];
    if (!copy) return [];
    const [title, tag] = copy;
    return [{
      ...guide,
      title,
      tags: [tag],
      description: `FOREACH 视频：${title}`,
      keywords: [title, tag, ...guide.keywords],
      videoUrl: guide.videoUrl?.replace(/([?&](?:hl|cc_lang_pref)=)en\b/g, "$1zh-Hans"),
    }];
  });
}
