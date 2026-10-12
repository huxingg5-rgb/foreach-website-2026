import Link from "next/link";
import { isHardTubeGuideModel } from "@/data/resources/technical-articles/hard-tube-fittings-related-products";
import styles from "./HardTubeGuideProductLink.module.css";
import type { TechnicalArticleLocale } from "@/data/resources/technical-articles/technical-articles.types";

const copy = {
  "zh-CN": ["硬管接头选型与维护指南", "需要比较密封结构与拆装要求？", "了解法兰式、卡箍式与卡环式的配套关系，以及管材、避光和常见泄漏问题的排查方法。", "阅读硬管接头选型指南"],
  en: ["Hard-tube fitting selection and maintenance", "Comparing sealing designs and reconnection requirements?", "Explore flanged, ferrule and snap-ring combinations, tubing, light shielding and common leak troubleshooting.", "Read the hard-tube fitting selection guide"],
  es: ["Selección y mantenimiento de racores para tubos", "¿Compara sellado y requisitos de reconexión?", "Consulte las conexiones con reborde, férula o anillo de retención, los tubos, la protección de la luz y el diagnóstico de fugas.", "Leer la guía de selección de racores para tubos"],
  fr: ["Choix et maintenance des raccords pour tubes", "Comparer l’étanchéité et les conditions de reconnexion ?", "Découvrez les associations à collet, à férule et à bague de retenue, les tubes, la protection lumineuse et le diagnostic des fuites.", "Lire le guide de sélection des raccords pour tubes"],
  ko: ["튜브 피팅 선정 및 정비 가이드", "밀봉 구조와 분리·재연결 조건을 비교하시나요?", "플랜지형, 페룰형 및 스냅 링형의 조합과 튜브, 차광 및 일반적인 누설 점검 방법을 확인하세요.", "튜브 피팅 선정 가이드 읽기"],
  ru: ["Выбор и обслуживание фитингов для трубок", "Сравниваете уплотнения и условия переподключения?", "Изучите фланцевые, обжимные и стопорные соединения, трубки, светозащиту и поиск распространённых причин течи.", "Читать руководство по выбору фитингов для трубок"],
};

export default function HardTubeGuideProductLink({ model, locale = "zh-CN" }: { model: string; locale?: TechnicalArticleLocale }) {
  if (!isHardTubeGuideModel(model)) return null;
  const text = copy[locale];
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  return <aside className={styles.guide} aria-label={text[0]}>
    <h2>{text[1]}</h2>
    <p>{text[2]}</p>
    <Link href={`${prefix}/resources/technical-articles/hard-tube-fittings-selection-guide/`}>{text[3]} →</Link>
  </aside>;
}
