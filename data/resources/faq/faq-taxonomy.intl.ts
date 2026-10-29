import type { LocaleCode } from "@/lib/i18n";
import { faqCategories } from "./faq-taxonomy.zh";
import type { FaqCategory } from "./faq.types";

// Stable category IDs keep bookmarks and filters valid when switching language.
const locales = ["en", "es", "fr", "ko", "ru"] as const;
const labels: Record<string, readonly [string, string, string, string, string]> = {
  pumps: ["Pumps", "Bombas", "Pompes", "펌프", "Насосы"],
  piston: ["Piston pumps", "Bombas de pistón", "Pompes à piston", "피스톤 펌프", "Поршневые насосы"],
  diaphragm: ["Diaphragm pumps", "Bombas de diafragma", "Pompes à membrane", "다이어프램 펌프", "Мембранные насосы"],
  syringe: ["Syringe pumps", "Bombas de jeringa", "Pompes seringues", "시린지 펌프", "Шприцевые насосы"],
  pipetting: ["Pipetting pumps", "Bombas de pipeteo", "Pompes de pipetage", "피펫팅 펌프", "Пипетирующие насосы"],
  valveless: ["Valveless metering pumps", "Bombas dosificadoras sin válvulas", "Pompes doseuses sans valve", "무밸브 정량 펌프", "Бесклапанные дозирующие насосы"],
  valves: ["Valves", "Válvulas", "Vannes", "밸브", "Клапаны"],
  rotary: ["Rotary valves", "Válvulas rotativas", "Vannes rotatives", "로터리 밸브", "Ротационные клапаны"],
  solenoid: ["Solenoid valves", "Válvulas solenoides", "Électrovannes", "솔레노이드 밸브", "Электромагнитные клапаны"],
  "high-pressure-valve": ["High-pressure valves", "Válvulas de alta presión", "Vannes haute pression", "고압 밸브", "Клапаны высокого давления"],
  "check-valve": ["Check valves", "Válvulas de retención", "Clapets anti-retour", "체크 밸브", "Обратные клапаны"],
  probes: ["Probes", "Sondas", "Sondes", "프로브", "Зонды"],
  "sampling-probe": ["Sampling and reagent probes", "Sondas de muestreo y reactivos", "Sondes de prélèvement et de réactifs", "샘플링 및 시약 프로브", "Зонды для проб и реагентов"],
  "piercing-probe": ["Piercing probes", "Sondas de perforación", "Sondes de perforation", "천공 프로브", "Прокалывающие зонды"],
  "wash-probe": ["Wash probes", "Sondas de lavado", "Sondes de lavage", "세척 프로브", "Промывочные зонды"],
  stirrer: ["Stirring probes and paddles", "Sondas y paletas de agitación", "Sondes et pales d’agitation", "교반 프로브 및 패들", "Мешалки и лопасти"],
  tubing: ["Tubing and assemblies", "Tubos y conjuntos", "Tubes et assemblages", "튜빙 및 어셈블리", "Трубки и сборки"],
  "soft-tubing": ["Flexible tubing", "Tubos flexibles", "Tubes souples", "연질 튜빙", "Гибкие трубки"],
  "hard-tubing": ["Rigid tubing", "Tubos rígidos", "Tubes rigides", "경질 튜빙", "Жёсткие трубки"],
  "tubing-assembly": ["Custom tubing assemblies", "Conjuntos de tubos personalizados", "Assemblages de tubes sur mesure", "맞춤형 튜빙 어셈블리", "Трубные сборки на заказ"],
  fittings: ["Fittings", "Racores", "Raccords", "피팅", "Фитинги"],
  flanged: ["Flanged fittings", "Racores con reborde", "Raccords à collerette", "플랜지 피팅", "Фланцевые фитинги"],
  ferrule: ["Ferrule fittings", "Racores con férula", "Raccords à ferrule", "페룰 피팅", "Фитинги с феррулой"],
  "retaining-ring": ["Compression ring fittings", "Racores con anillo de compresión", "Raccords à bague de compression", "압축 링 피팅", "Фитинги с обжимным кольцом"],
  "high-pressure-fitting": ["High-pressure tubing fittings", "Racores de alta presión", "Raccords haute pression", "고압 튜빙 피팅", "Фитинги высокого давления"],
  barbed: ["Barbed fittings", "Racores de espiga", "Raccords cannelés", "바브 피팅", "Штуцеры-ёлочки"],
  "threaded-barb": ["Threaded hose barb fittings", "Racores roscados de espiga", "Raccords cannelés filetés", "나사형 바브 피팅", "Резьбовые штуцеры-ёлочки"],
  luer: ["Luer fittings", "Racores Luer", "Raccords Luer", "루어 피팅", "Фитинги Luer"],
  "quick-connect": ["Quick-disconnect couplings", "Acoplamientos de desconexión rápida", "Raccords rapides", "퀵 디스커넥트 커플링", "Быстроразъёмные соединения"],
  "thread-adapter": ["Female-thread adapters", "Adaptadores de rosca hembra", "Adaptateurs à filetage femelle", "암나사 어댑터", "Переходники с внутренней резьбой"],
  bulkhead: ["Bulkhead fittings", "Racores pasamuros", "Raccords de traversée", "벌크헤드 피팅", "Переборочные фитинги"],
  control: ["Sensing and control", "Detección y control", "Détection et contrôle", "감지 및 제어", "Датчики и управление"],
  bubble: ["Bubble detection", "Detección de burbujas", "Détection de bulles", "기포 감지", "Обнаружение пузырьков"],
  pressure: ["Fluid pressure sensing", "Medición de presión del fluido", "Mesure de pression du fluide", "유체 압력 감지", "Измерение давления жидкости"],
  purchasing: ["Selection and purchasing", "Selección y compra", "Sélection et achat", "선정 및 구매", "Подбор и закупка"],
  selection: ["Selection requirements", "Datos para la selección", "Données de sélection", "선정 자료", "Данные для подбора"],
  samples: ["Samples and prototyping", "Muestras y prototipos", "Échantillons et prototypes", "샘플 및 시제품", "Образцы и прототипы"],
  customization: ["Customization", "Personalización", "Personnalisation", "맞춤 제작", "Изготовление на заказ"],
  quotation: ["Quotations and delivery", "Presupuestos y entrega", "Devis et livraison", "견적 및 납품", "Расчёт стоимости и поставка"],
  quality: ["Quality and inspection", "Calidad e inspección", "Qualité et inspection", "품질 및 검사", "Качество и контроль"],
  inspection: ["Dimensional and performance checks", "Verificación dimensional y funcional", "Contrôles dimensionnels et fonctionnels", "치수 및 성능 검사", "Контроль размеров и характеристик"],
  compliance: ["Material and compliance documents", "Documentación de materiales y conformidad", "Documents matériaux et conformité", "재료 및 규정 준수 자료", "Документы на материалы и соответствие"],
  traceability: ["Batch traceability", "Trazabilidad de lotes", "Traçabilité des lots", "로트 추적", "Прослеживаемость партий"],
  acceptance: ["Acceptance criteria", "Criterios de aceptación", "Critères de réception", "검수 기준", "Критерии приёмки"],
  support: ["After-sales service", "Servicio posventa", "Service après-vente", "사후 지원", "Послепродажное обслуживание"],
  troubleshooting: ["Fault reporting", "Notificación de fallos", "Signalement de défauts", "문제 보고", "Сообщение о неисправности"],
  maintenance: ["Maintenance", "Mantenimiento", "Maintenance", "유지보수", "Техническое обслуживание"],
  replacement: ["Replacement parts", "Repuestos", "Pièces de rechange", "부품 교체", "Замена комплектующих"],
  repair: ["Repairs and returns", "Reparaciones y devoluciones", "Réparations et retours", "수리 및 반품", "Ремонт и возврат"],
  warranty: ["Warranty information", "Información de garantía", "Informations de garantie", "보증 안내", "Информация о гарантии"],
};

export function getFaqCategories(locale: LocaleCode): FaqCategory[] {
  if (locale === "zh-CN") return faqCategories;
  const index = locales.indexOf(locale);
  const label = (key: string) => {
    if (!labels[key]?.[index]) throw new Error(`Missing FAQ category: ${locale}/${key}`);
    return labels[key][index];
  };
  return faqCategories.map(group => ({ ...group, label: label(group.key), children: group.children.map(child => ({ key: child.key, label: label(child.key) })) }));
}
