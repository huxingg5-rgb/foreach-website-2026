import {getSolenoidCardCopy} from "./solenoid-card-copy";
import {getSolenoidConfiguration, solenoidConfigurationName} from "./solenoid-configurations";
import type { SelectionLocale } from "../selection/product-selection.types";

const seriesIntroAltByLocale: Record<SelectionLocale, string> = {
  zh: "FOREACH SV10 微型隔膜电磁阀，展示基板式、倒刺式和螺纹式接口",
  en: "FOREACH SV10 miniature diaphragm solenoid valves with manifold-mount, barbed and threaded connections",
  es: "Electroválvulas de diafragma miniatura FOREACH SV10 con conexiones de base, de espiga y roscadas",
  fr: "Électrovannes à membrane miniatures FOREACH SV10 avec raccordements sur embase, cannelés et filetés",
  ko: "베이스 장착형, 바브형 및 나사형 연결을 보여 주는 FOREACH SV10 소형 다이어프램 솔레노이드 밸브",
  ru: "Миниатюрные мембранные электромагнитные клапаны FOREACH SV10 с монтажом на основание, штуцерными и резьбовыми подключениями",
};

export function getSolenoidSeriesIntroImage(locale: SelectionLocale) {
  return {
    src: "/images/products/valves/solenoid-valves/foreach-sv10-connection-options-intro.webp",
    alt: seriesIntroAltByLocale[locale],
    width: 2000,
    height: 1500,
  };
}

const imageAltByLocale: Record<SelectionLocale, (ways: "2" | "3") => string> = {
  zh: ways => `FOREACH SV10-${ways} ${ways === "2" ? "二通" : "三通"}微型电磁阀，展示螺纹接口和底部密封接口`,
  en: ways => `FOREACH SV10-${ways} ${ways}-way miniature solenoid valve, showing threaded ports and base seals`,
  es: ways => `Electroválvula miniatura FOREACH SV10-${ways} de ${ways} vías, con conexiones roscadas y juntas en la base`,
  fr: ways => `Électrovanne miniature FOREACH SV10-${ways} à ${ways} voies, avec raccords filetés et joints de base`,
  ko: ways => `나사식 포트와 하부 씰을 보여 주는 FOREACH SV10-${ways} ${ways}방향 소형 솔레노이드 밸브`,
  ru: ways => `Миниатюрный ${ways}-ходовой электромагнитный клапан FOREACH SV10-${ways} с резьбовыми портами и уплотнениями основания`,
};

export function getSolenoidConfigurationImage(slug: string, locale: SelectionLocale) {
  const c = getSolenoidConfiguration(slug);
  if (c) return {
    src: `/images/products/valves/solenoid-valves/foreach-sv10-${c.imageSlug}-main.webp`,
    cardSrc: `/images/products/valves/solenoid-valves/foreach-sv10-${c.imageSlug}-card.webp`,
    alt: `FOREACH ${c.model} ${getSolenoidCardCopy(slug, locale)?.name || solenoidConfigurationName(slug, locale)}`,
  };
  return {
    cardSrc: `/images/products/valves/solenoid-valves/foreach-sv10-${slug}-miniature-solenoid-valve.webp`,
    src: `/images/products/valves/solenoid-valves/foreach-sv10-${slug}-miniature-solenoid-valve.webp`,
    alt: imageAltByLocale[locale](slug === "2-way" ? "2" : "3"),
  };
}

const twoWayGalleryFiles = ["barbed-ports", "base-seals"] as const;

const twoWayGalleryAlts: Record<SelectionLocale, string[]> = {
  zh: [
    "FOREACH SV10-2 二通微型电磁阀实拍，展示两个倒刺接口",
    "FOREACH SV10-2 二通微型电磁阀底部两个端口及 O 形密封圈特写",
  ],
  en: [
    "FOREACH SV10-2 2-way miniature solenoid valve showing two barbed ports",
    "Close-up of two base ports and O-ring seals on a FOREACH SV10-2 2-way miniature solenoid valve",
  ],
  es: [
    "Electroválvula miniatura FOREACH SV10-2 de 2 vías con dos conexiones de espiga",
    "Detalle de los dos puertos de base y juntas tóricas de una electroválvula miniatura FOREACH SV10-2 de 2 vías",
  ],
  fr: [
    "Électrovanne miniature FOREACH SV10-2 à 2 voies avec deux raccords cannelés",
    "Détail des deux orifices de base et des joints toriques d’une électrovanne miniature FOREACH SV10-2 à 2 voies",
  ],
  ko: [
    "바브 포트 2개를 보여 주는 FOREACH SV10-2 2방향 소형 솔레노이드 밸브 실물 사진",
    "FOREACH SV10-2 2방향 소형 솔레노이드 밸브의 하부 포트 2개와 O링 씰 확대 사진",
  ],
  ru: [
    "Миниатюрный двухходовой электромагнитный клапан FOREACH SV10-2 с двумя штуцерами под шланг",
    "Два порта основания и кольцевые уплотнения миниатюрного двухходового электромагнитного клапана FOREACH SV10-2 крупным планом",
  ],
};

const threeWayGalleryFiles = [
  "assembly", "base-seals", "threaded-head", "barbed-ports", "connection-options", "manifold-assembly",
] as const;

const threeWayGalleryAlts: Record<SelectionLocale, string[]> = {
  zh: [
    "FOREACH 三通电磁阀实拍，展示阀体和接口组件",
    "FOREACH 三通电磁阀底部三个端口及 O 形密封圈特写",
    "FOREACH 三通电磁阀螺纹阀头及 NC、NO 标记特写",
    "FOREACH 三通电磁阀三个倒刺接口特写",
    "FOREACH 三通电磁阀底部密封、倒刺和螺纹接口外观",
    "FOREACH 多只三通电磁阀安装在透明集成流路板上的实拍",
  ],
  en: [
    "FOREACH 3-way solenoid valves showing the valve bodies and port assemblies",
    "Close-up of three base ports and O-ring seals on a FOREACH 3-way solenoid valve",
    "Threaded head and NC and NO markings on a FOREACH 3-way solenoid valve",
    "Close-up of three barbed ports on a FOREACH 3-way solenoid valve",
    "Base-seal, barbed and threaded connections on FOREACH 3-way solenoid valves",
    "Multiple FOREACH 3-way solenoid valves mounted on a transparent manifold",
  ],
  es: [
    "Electroválvulas FOREACH de 3 vías con sus cuerpos y conjuntos de conexiones",
    "Detalle de los tres puertos de base y juntas tóricas de una electroválvula FOREACH de 3 vías",
    "Cabezal roscado y marcas NC y NO de una electroválvula FOREACH de 3 vías",
    "Detalle de las tres conexiones de espiga de una electroválvula FOREACH de 3 vías",
    "Conexiones de base con juntas, de espiga y roscadas de electroválvulas FOREACH de 3 vías",
    "Varias electroválvulas FOREACH de 3 vías montadas sobre un colector transparente",
  ],
  fr: [
    "Électrovannes FOREACH à 3 voies présentant leurs corps et raccordements",
    "Détail des trois orifices de base et des joints toriques d’une électrovanne FOREACH à 3 voies",
    "Tête filetée et repères NC et NO d’une électrovanne FOREACH à 3 voies",
    "Détail des trois raccords cannelés d’une électrovanne FOREACH à 3 voies",
    "Raccordements de base avec joints, cannelés et filetés des électrovannes FOREACH à 3 voies",
    "Plusieurs électrovannes FOREACH à 3 voies montées sur un collecteur transparent",
  ],
  ko: [
    "밸브 본체와 포트 구성을 보여 주는 FOREACH 3방향 솔레노이드 밸브 실물 사진",
    "FOREACH 3방향 솔레노이드 밸브의 하부 포트 3개와 O링 씰 확대 사진",
    "FOREACH 3방향 솔레노이드 밸브의 나사식 헤드와 NC 및 NO 표시 확대 사진",
    "FOREACH 3방향 솔레노이드 밸브의 바브 포트 3개 확대 사진",
    "FOREACH 3방향 솔레노이드 밸브의 하부 씰, 바브 및 나사식 연결 구성",
    "투명 매니폴드에 장착된 여러 FOREACH 3방향 솔레노이드 밸브 실물 사진",
  ],
  ru: [
    "Трёхходовые электромагнитные клапаны FOREACH с корпусами и узлами подключения",
    "Три порта основания и кольцевые уплотнения трёхходового электромагнитного клапана FOREACH крупным планом",
    "Резьбовая головка и обозначения NC и NO трёхходового электромагнитного клапана FOREACH",
    "Три штуцера под шланг трёхходового электромагнитного клапана FOREACH крупным планом",
    "Подключения через уплотнения основания, штуцеры и резьбу у трёхходовых электромагнитных клапанов FOREACH",
    "Несколько трёхходовых электромагнитных клапанов FOREACH на прозрачном коллекторе",
  ],
};

const valveSeatComparisonAlts: Record<SelectionLocale, string> = {
  zh: "FOREACH SV10 二通与三通电磁阀的螺纹阀座并排特写",
  en: "Side-by-side close-up of threaded valve seats on FOREACH SV10 2-way and 3-way solenoid valves",
  es: "Detalle de los asientos roscados de electroválvulas FOREACH SV10 de 2 y 3 vías, uno junto al otro",
  fr: "Gros plan côte à côte des sièges filetés des électrovannes FOREACH SV10 à 2 et 3 voies",
  ko: "FOREACH SV10 2방향 및 3방향 솔레노이드 밸브의 나사식 밸브 시트 비교 사진",
  ru: "Резьбовые седла двухходового и трёхходового электромагнитных клапанов FOREACH SV10 рядом, крупным планом",
};

const threeWayConnectionOptionsImage = "/images/products/valves/solenoid-valves/foreach-sv10-3-way-connection-options-gallery.webp";
const threeWayConnectionOptionsAlts: Record<SelectionLocale, string> = {
  zh: "FOREACH SV10 三通电磁阀合照，展示基板式、倒刺式和螺纹阀座式连接",
  en: "FOREACH SV10 3-way solenoid valves showing manifold-mount, barbed and threaded connections",
  es: "Electroválvulas FOREACH SV10 de 3 vías con montaje en colector, conexiones de espiga y puertos roscados",
  fr: "Électrovannes FOREACH SV10 à 3 voies avec montage sur collecteur, raccords cannelés et orifices filetés",
  ko: "매니폴드 장착형, 바브형 및 나사식 포트 연결을 보여 주는 FOREACH SV10 3방향 솔레노이드 밸브",
  ru: "Трёхходовые электромагнитные клапаны FOREACH SV10 с монтажом на коллектор, штуцерами и резьбовыми портами",
};

const twoWayNoBasePortsAlts: Record<SelectionLocale, string> = {
  zh: "FOREACH SV10-P-2NO 二通常开基板式电磁阀底部两个端口及 O 形密封圈特写",
  en: "Close-up of two base ports and O-ring seals on a FOREACH SV10-P-2NO 2-way normally open manifold-mount solenoid valve",
  es: "Detalle de los dos puertos de base y juntas tóricas de la electroválvula FOREACH SV10-P-2NO de 2 vías normalmente abierta para montaje en colector",
  fr: "Gros plan des deux orifices de base et des joints toriques de l’électrovanne FOREACH SV10-P-2NO à 2 voies normalement ouverte, montée sur collecteur",
  ko: "FOREACH SV10-P-2NO 2방향 상시 열림 매니폴드 장착형 솔레노이드 밸브의 하부 포트 2개와 O링 씰 확대 사진",
  ru: "Два порта основания и кольцевые уплотнения двухходового нормально открытого электромагнитного клапана FOREACH SV10-P-2NO для монтажа на коллектор крупным планом",
};

export function getSolenoidConfigurationGallery(slug: string, locale: SelectionLocale) {
  const c = getSolenoidConfiguration(slug);
  if (c) {
    const additionalImages: string[] = [];
    const additionalImageAlts: string[] = [];
    if (c.slug === "2-way-no-base") {
      additionalImages.push("/images/products/valves/solenoid-valves/foreach-sv10-p-2-normally-open-base-ports.webp");
      additionalImageAlts.push(twoWayNoBasePortsAlts[locale]);
    }
    if (c.connection === "threaded") {
      additionalImages.push("/images/products/valves/solenoid-valves/foreach-sv10-threaded-valve-seat-comparison.webp");
      additionalImageAlts.push(valveSeatComparisonAlts[locale]);
    }
    if (c.key === "three") {
      additionalImages.push(threeWayConnectionOptionsImage);
      additionalImageAlts.push(threeWayConnectionOptionsAlts[locale]);
    }
    return {additionalImages, additionalImageAlts};
  }
  const files = slug === "2-way" ? twoWayGalleryFiles : threeWayGalleryFiles;
  return {
    additionalImages: [
      ...files.map(name => `/images/products/valves/solenoid-valves/foreach-sv10-${slug}-${name}.webp`),
      ...(slug === "3-way" ? [threeWayConnectionOptionsImage] : []),
    ],
    additionalImageAlts: [
      ...(slug === "2-way" ? twoWayGalleryAlts : threeWayGalleryAlts)[locale],
      ...(slug === "3-way" ? [threeWayConnectionOptionsAlts[locale]] : []),
    ],
  };
}
