import type { SelectionLocale } from "../selection/product-selection.types";

const imageAltByLocale: Record<SelectionLocale, (ways: "2" | "3") => string> = {
  zh: ways => `FOREACH SV10-${ways} ${ways === "2" ? "二通" : "三通"}微型电磁阀，展示螺纹接口和底部密封接口`,
  en: ways => `FOREACH SV10-${ways} ${ways}-way miniature solenoid valve, showing threaded ports and base seals`,
  es: ways => `Electroválvula miniatura FOREACH SV10-${ways} de ${ways} vías, con conexiones roscadas y juntas en la base`,
  fr: ways => `Électrovanne miniature FOREACH SV10-${ways} à ${ways} voies, avec raccords filetés et joints de base`,
  ko: ways => `나사식 포트와 하부 씰을 보여 주는 FOREACH SV10-${ways} ${ways}방향 소형 솔레노이드 밸브`,
  ru: ways => `Миниатюрный ${ways}-ходовой электромагнитный клапан FOREACH SV10-${ways} с резьбовыми портами и уплотнениями основания`,
};

export function getSolenoidConfigurationImage(slug: "2-way" | "3-way", locale: SelectionLocale) {
  return {
    src: `/images/products/valves/solenoid-valves/foreach-6010-${slug}-miniature-solenoid-valve.webp`,
    alt: imageAltByLocale[locale](slug === "2-way" ? "2" : "3"),
  };
}

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

export function getSolenoidConfigurationGallery(slug: "2-way" | "3-way", locale: SelectionLocale) {
  return slug === "3-way" ? {
    additionalImages: threeWayGalleryFiles.map(name => `/images/products/valves/solenoid-valves/foreach-6010-3-way-${name}.webp`),
    additionalImageAlts: threeWayGalleryAlts[locale],
  } : { additionalImages: [], additionalImageAlts: [] };
}
