export const hld3WhiteBackgroundImage = "/images/products/pumps/syringe-pumps/foreach-hld3-rotary-valve-syringe-pump-white-background.webp";

const hld3ImageAlts: Record<string, string> = {
  zh: "FOREACH HLD3 旋转阀注射泵白底侧前视图，展示旋转阀、计量机构和安装侧板",
  en: "FOREACH HLD3 rotary-valve syringe pump on a white background, showing the rotary valve, metering mechanism and mounting side plate",
  es: "Bomba de jeringa con válvula rotativa FOREACH HLD3 sobre fondo blanco, con válvula, mecanismo de dosificación y placa lateral de montaje",
  fr: "Pompe à seringue à vanne rotative FOREACH HLD3 sur fond blanc, avec vanne, mécanisme de dosage et plaque latérale de montage",
  ko: "로터리 밸브, 정량 기구 및 측면 장착판을 보여 주는 흰색 배경의 FOREACH HLD3 로터리 밸브 시린지 펌프",
  ru: "Шприцевой насос FOREACH HLD3 с поворотным клапаном на белом фоне: клапан, дозирующий механизм и боковая монтажная пластина",
};

export function getHld3WhiteBackgroundImageAlt(locale: string) {
  return hld3ImageAlts[locale === "zh-CN" ? "zh" : locale] || hld3ImageAlts.en;
}
