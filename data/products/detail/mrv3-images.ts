import type { Mrv3Locale } from "./mrv3-locales";

const imageAltByLocale: Record<Mrv3Locale, (model: string, channels: string) => string> = {
  zh: (model, channels) => `FOREACH ${model} ${channels}通道陶瓷旋转阀，配备电机和控制器`,
  it: (model, channels) => `FOREACH ${model}, valvola selettrice rotativa a ${channels} vie in ceramica con motore e controllore`,
  hi: (model, channels) => `FOREACH ${model}, मोटर और कंट्रोलर वाला ${channels}-चैनल सिरेमिक रोटरी सिलेक्टर वाल्व`,
  en: (model, channels) => `FOREACH ${model} ${channels}-channel ceramic rotary selector valve with motor and controller`,
  de: (model, channels) => "FOREACH " + model + " Keramik-Drehwahlventil mit " + channels + " Kanälen, Motor und Steuergerät",
  es: (model, channels) => `Válvula selectora rotativa cerámica FOREACH ${model} de ${channels} canales, con motor y controlador`,
  fr: (model, channels) => `Vanne de sélection rotative en céramique FOREACH ${model} à ${channels} voies, avec moteur et contrôleur`,
  ko: (model, channels) => `모터와 제어기를 갖춘 FOREACH ${model} ${channels}채널 세라믹 로터리 선택 밸브`,
  ru: (model, channels) => `Керамический роторный клапан-селектор FOREACH ${model}, ${channels} каналов, с двигателем и контроллером`,
};

export function getMrv3ConfigurationImage(channels: "10" | "16" | "24", locale: Mrv3Locale) {
  const model = `MRV3-D${channels}`;
  return {
    src: `/images/products/valves/rotary-valves/foreach-mrv3-d${channels}-${channels}-channel-ceramic-rotary-selector-valve.webp`,
    alt: imageAltByLocale[locale](model, channels),
  };
}

const seriesGalleryFiles = [
  "valve-heads", "24-channel-assembly", "24-channel-head-close-up",
  "rear-motor-controller", "valve-assemblies",
  "white-head-rear-side", "white-head-assembly",
] as const;

const seriesGalleryAlts: Record<Mrv3Locale, string[]> = {
  zh: [
    "FOREACH 旋转阀系列多种端口布局的阀头实拍",
    "FOREACH 24 通道旋转阀实拍，展示阀头、电机和控制器",
    "FOREACH 24 通道旋转阀阀头端口及编号特写",
    "FOREACH 旋转阀背面实拍，展示电机、控制器及接线",
    "FOREACH 旋转阀系列两种阀头配置的组合实拍",
    "FOREACH 白色阀头旋转阀背侧实拍，展示电机、控制器及接线",
    "FOREACH 白色阀头旋转阀躺放实拍，展示阀头端口及控制器",
  ],
  it: [
    "Testate della serie di valvole rotative FOREACH con diverse disposizioni degli attacchi",
    "Valvola rotativa FOREACH a 24 vie con testata, motore e controllore",
    "Dettaglio degli attacchi numerati della testata della valvola FOREACH a 24 vie",
    "Vista posteriore della valvola rotativa FOREACH con motore, controllore e cablaggio",
    "Gruppi di valvole rotative FOREACH con due configurazioni della testata",
    "Vista posteriore di tre quarti della valvola FOREACH con testata bianca, motore, controllore e cablaggio",
    "Valvola rotativa FOREACH con testata bianca appoggiata di lato, con attacchi e controllore in vista",
  ],
  hi: [
    "अलग-अलग पोर्ट लेआउट वाले FOREACH रोटरी वाल्व सीरीज़ के हेड",
    "FOREACH 24-चैनल रोटरी वाल्व, जिसमें वाल्व हेड, मोटर और कंट्रोलर दिख रहे हैं",
    "FOREACH 24-चैनल रोटरी वाल्व हेड के नंबर वाले पोर्ट का नज़दीकी दृश्य",
    "FOREACH रोटरी वाल्व का पीछे का दृश्य, जिसमें मोटर, कंट्रोलर और वायरिंग दिख रही है",
    "दो अलग-अलग वाल्व हेड कॉन्फ़िगरेशन वाली FOREACH रोटरी वाल्व असेंबली",
    "सफ़ेद हेड वाले FOREACH रोटरी वाल्व का पीछे और बगल का दृश्य, जिसमें मोटर, कंट्रोलर और वायरिंग दिख रही है",
    "बगल में रखे सफ़ेद हेड वाले FOREACH रोटरी वाल्व में हेड पोर्ट और कंट्रोलर",
  ],
  en: [
    "FOREACH rotary valve series heads with different port layouts",
    "FOREACH 24-channel rotary valve showing the valve head, motor and controller",
    "Close-up of numbered ports on a FOREACH 24-channel rotary valve head",
    "Rear view of a FOREACH rotary valve showing the motor, controller and wiring",
    "FOREACH rotary valve series assemblies with two different valve head configurations",
    "Rear-side view of a FOREACH rotary valve with a white head, showing the motor, controller and wiring",
    "FOREACH rotary valve with a white head lying on its side, showing the head ports and controller",
  ],
  de: [
    "Ventilköpfe der FOREACH Drehwahlventile mit unterschiedlichen Anschlussanordnungen",
    "FOREACH Drehwahlventil mit 24 Kanälen, Ventilkopf, Motor und Steuergerät",
    "Nahaufnahme der nummerierten Anschlüsse am Kopf eines FOREACH Drehwahlventils mit 24 Kanälen",
    "Rückansicht eines FOREACH Drehwahlventils mit Motor, Steuergerät und Verdrahtung",
    "Baugruppen der FOREACH Drehwahlventile mit zwei unterschiedlichen Ventilköpfen",
    "Schräge Rückansicht eines FOREACH Drehwahlventils mit weißem Kopf, Motor, Steuergerät und Verdrahtung",
    "Seitlich liegendes FOREACH Drehwahlventil mit weißem Kopf, sichtbaren Anschlüssen und Steuergerät",
  ],
  es: [
    "Cabezales de la serie de válvulas rotativas FOREACH con distintas distribuciones de puertos",
    "Válvula rotativa FOREACH de 24 canales con cabezal, motor y controlador",
    "Detalle de los puertos numerados del cabezal de una válvula rotativa FOREACH de 24 canales",
    "Vista posterior de una válvula rotativa FOREACH con motor, controlador y cableado",
    "Conjuntos de la serie de válvulas rotativas FOREACH con dos configuraciones de cabezal",
    "Vista posterior lateral de una válvula rotativa FOREACH con cabezal blanco, motor, controlador y cableado",
    "Válvula rotativa FOREACH con cabezal blanco apoyada de lado, con los puertos y el controlador visibles",
  ],
  fr: [
    "Têtes de la série de vannes rotatives FOREACH avec différentes dispositions des orifices",
    "Vanne rotative FOREACH à 24 voies avec tête, moteur et contrôleur",
    "Gros plan des orifices numérotés de la tête d’une vanne rotative FOREACH à 24 voies",
    "Vue arrière d’une vanne rotative FOREACH avec moteur, contrôleur et câblage",
    "Ensembles de la série de vannes rotatives FOREACH avec deux configurations de tête",
    "Vue arrière de trois quarts d’une vanne rotative FOREACH à tête blanche, avec moteur, contrôleur et câblage",
    "Vanne rotative FOREACH à tête blanche couchée sur le côté, montrant les orifices et le contrôleur",
  ],
  ko: [
    "서로 다른 포트 배열을 갖춘 FOREACH 로터리 밸브 시리즈의 헤드",
    "밸브 헤드, 모터 및 제어기를 보여 주는 FOREACH 24채널 로터리 밸브",
    "FOREACH 24채널 로터리 밸브 헤드의 번호가 표시된 포트 확대 사진",
    "모터, 제어기 및 배선을 보여 주는 FOREACH 로터리 밸브 후면",
    "서로 다른 두 가지 헤드 구성을 갖춘 FOREACH 로터리 밸브 시리즈 조립체",
    "모터, 제어기 및 배선을 보여 주는 흰색 헤드 FOREACH 로터리 밸브의 후측면",
    "헤드 포트와 제어기를 보여 주는 옆으로 놓인 흰색 헤드 FOREACH 로터리 밸브",
  ],
  ru: [
    "Головки серии роторных клапанов FOREACH с различным расположением портов",
    "24-канальный роторный клапан FOREACH с головкой, двигателем и контроллером",
    "Пронумерованные порты головки 24-канального роторного клапана FOREACH крупным планом",
    "Вид сзади роторного клапана FOREACH с двигателем, контроллером и проводкой",
    "Узлы серии роторных клапанов FOREACH с двумя конфигурациями головок",
    "Вид сзади и сбоку роторного клапана FOREACH с белой головкой, двигателем, контроллером и проводкой",
    "Роторный клапан FOREACH с белой головкой, лежащий на боку: порты головки и контроллер",
  ],
};

export function getMrv3SeriesGallery(locale: Mrv3Locale) {
  return {
    additionalImages: seriesGalleryFiles.map(name => `/images/products/valves/rotary-valves/foreach-rotary-valve-${name}.webp`),
    additionalImageAlts: seriesGalleryAlts[locale],
  };
}
