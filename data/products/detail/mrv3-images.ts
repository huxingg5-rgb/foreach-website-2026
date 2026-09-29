import type { Mrv3Locale } from "./mrv3-locales";

const imageAltByLocale: Record<Mrv3Locale, (model: string, channels: string) => string> = {
  zh: (model, channels) => `FOREACH ${model} ${channels}通道陶瓷旋转阀，配备电机和控制器`,
  en: (model, channels) => `FOREACH ${model} ${channels}-channel ceramic rotary selector valve with motor and controller`,
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
