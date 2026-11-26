"use client";

import { usePathname } from "next/navigation";
import styles from "./ProductDrawingReference.module.css";

const copy = {
  zh: "仅供选型参考　用于设计、装配或采购前，请联系恒永达工程师确认所选型号适用的图纸版本及关键尺寸。",
  en: "For preliminary selection only. Before using this drawing for design, assembly or purchasing, contact FOREACH Engineering to confirm the applicable drawing revision and key dimensions for the selected model.",
  es: "Solo para la selección preliminar. Antes de usar el plano para diseño, montaje o compra, consulte al equipo de ingeniería de FOREACH para confirmar la revisión aplicable y las dimensiones clave del modelo seleccionado.",
  fr: "Pour la présélection uniquement. Avant d’utiliser ce plan pour la conception, le montage ou l’achat, demandez au service d’ingénierie de FOREACH de confirmer la révision applicable et les dimensions clés du modèle sélectionné.",
  ko: "제품 선정 시 참고용입니다. 설계, 조립 또는 구매에 사용하기 전에 FOREACH 엔지니어에게 선택한 모델에 적용되는 도면 버전과 주요 치수를 확인해 주세요.",
  ru: "Только для предварительного подбора. Перед использованием чертежа для проектирования, сборки или закупки уточните у инженеров FOREACH применимую редакцию чертежа и ключевые размеры выбранной модели.",
};

export default function ProductDrawingReference() {
  const pathname = usePathname();
  if (!/(?:^|\/)products\//.test(pathname)) return null;
  const segment = pathname.split("/", 2)[1];
  const locale = segment === "products" ? "zh" : Object.hasOwn(copy, segment) ? segment as keyof typeof copy : null;
  if (!locale) return null;

  return <p className={styles.notice} lang={locale === "zh" ? "zh-CN" : locale} data-product-drawing-reference="true">{copy[locale]}</p>;
}
