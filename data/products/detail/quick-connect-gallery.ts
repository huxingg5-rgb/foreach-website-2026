export const quickConnectSupplementaryImage =
  "/images/resources/technical-articles/quick-disconnect-fitting/quick-disconnect-fittings-photo.webp";

export function appendQuickConnectSupplementaryImage(images: readonly string[] = []): string[] {
  return images.includes(quickConnectSupplementaryImage)
    ? [...images]
    : [...images, quickConnectSupplementaryImage];
}

const supplementaryImageAlts: Record<string, string> = {
  zh: "恒永达快插接头产品合照：三款不同尺寸与形状的接头",
  en: "FOREACH quick disconnect fitting family photo: three sizes and configurations",
  es: "Foto de la familia de acoplamientos rápidos FOREACH: tres tamaños y configuraciones",
  fr: "Photo de la gamme de raccords rapides FOREACH : trois tailles et configurations",
  ko: "FOREACH 퀵 디스커넥트 피팅 제품군 사진: 크기와 형상이 다른 세 종류",
  ru: "Фото серии быстроразъёмных соединений FOREACH: три размера и конфигурации",
};

export function getQuickConnectSupplementaryImageAlt(locale: string): string {
  return supplementaryImageAlts[locale] ?? supplementaryImageAlts.zh;
}
