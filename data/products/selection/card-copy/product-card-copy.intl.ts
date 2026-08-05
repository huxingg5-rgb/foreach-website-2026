import type {
  ProductSelectionProduct,
  SelectionLocale,
} from "@/data/products/selection/product-selection.types";
import { getDiaphragmPumpCopy } from "@/data/products/detail/diaphragm-pump-copy";
import { localizeHardTubeFittingCardSubtitle } from "./hard-tube-fitting-card-copy";

type TargetLocale = Exclude<SelectionLocale, "zh" | "en">;

const TARGET_LOCALES: TargetLocale[] = ["es", "fr", "ko", "ru"];

const TITLE_COPY: Record<TargetLocale, Record<string, string>> = {
  es: { "PVC Tubing": "Tubo de PVC", "TPU Tubing": "Tubo de TPU", "FEP Tubing": "Tubo de FEP", "PTFE Tubing": "Tubo de PTFE", "PEEK Tubing": "Tubo de PEEK", "PFA Tubing": "Tubo de PFA", "Silicone Tubing": "Tubo de silicona", "PharMed Tubing": "Tubo PharMed" },
  fr: { "PVC Tubing": "Tube en PVC", "TPU Tubing": "Tube en TPU", "FEP Tubing": "Tube en FEP", "PTFE Tubing": "Tube en PTFE", "PEEK Tubing": "Tube en PEEK", "PFA Tubing": "Tube en PFA", "Silicone Tubing": "Tube en silicone", "PharMed Tubing": "Tube PharMed" },
  ko: { "PVC Tubing": "PVC 튜브", "TPU Tubing": "TPU 튜브", "FEP Tubing": "FEP 튜브", "PTFE Tubing": "PTFE 튜브", "PEEK Tubing": "PEEK 튜브", "PFA Tubing": "PFA 튜브", "Silicone Tubing": "실리콘 튜브", "PharMed Tubing": "PharMed 튜브" },
  ru: { "PVC Tubing": "Трубка из ПВХ", "TPU Tubing": "Трубка из ТПУ", "FEP Tubing": "Трубка из ФЭП", "PTFE Tubing": "Трубка из ПТФЭ", "PEEK Tubing": "Трубка из ПЭЭК", "PFA Tubing": "Трубка из ПФА", "Silicone Tubing": "Силиконовая трубка", "PharMed Tubing": "Трубка PharMed" },
};

const PHRASE_COPY: Record<TargetLocale, Record<string, string>> = {
  es: {
    "High-Pressure T-Shaped Three-Way Female Thread Adapter": "Adaptador roscado hembra en T de tres vías para alta presión",
    "High-Pressure Two-Way Female Thread Adapter": "Adaptador roscado hembra de dos vías para alta presión",
    "Straight Thread-Seal Thread to Barb Fitting": "Racor recto de rosca a espiga con sellado por rosca",
    "Straight Bottom-Seal Thread to Barb Fitting": "Racor recto de rosca a espiga con sellado inferior",
    "Elbow Thread-Seal Thread to Barb Fitting": "Racor acodado de rosca a espiga con sellado por rosca",
    "Male In-line Valved Quick-Connect Fitting": "Racor de conexión rápida macho recto con válvula",
    "Female In-line Valved Quick-Connect Fitting": "Racor de conexión rápida hembra recto con válvula",
    "Male Elbow Valved Quick-Connect Fitting": "Racor de conexión rápida macho acodado con válvula",
    "Female Elbow Valved Quick-Connect Fitting": "Racor de conexión rápida hembra acodado con válvula",
    "Male In-line Non-Valved Quick-Connect Fitting": "Racor de conexión rápida macho recto sin válvula",
    "Female In-line Non-Valved Quick-Connect Fitting": "Racor de conexión rápida hembra recto sin válvula",
    "Male Elbow Non-Valved Quick-Connect Fitting": "Racor de conexión rápida macho acodado sin válvula",
    "Female Elbow Non-Valved Quick-Connect Fitting": "Racor de conexión rápida hembra acodado sin válvula",
    "Two-Way Female Thread Adapter": "Adaptador roscado hembra de dos vías", "Three-Way Female Thread Adapter": "Adaptador roscado hembra de tres vías",
    "Bulkhead Barbed Fitting": "Racor de espiga pasamuros", "Straight Barbed Fitting": "Racor de espiga recto", "Elbow Barbed Fitting": "Racor de espiga acodado", "Tee Barbed Fitting": "Racor de espiga en T", "Cross Barbed Fitting": "Racor de espiga en cruz", "Y-Shaped Barbed Fitting": "Racor de espiga en Y", "Pi-Shaped Barbed Fitting": "Racor de espiga en π",
    "Male Luer Stationary Lock": "Conector Luer macho fijo", "Male Luer Rotating Lock": "Conector Luer macho giratorio", "Female Luer Fitting": "Conector Luer hembra", "Integrated Male Luer Fitting": "Conector Luer macho integrado", "Rotating-Lock Male Luer Fitting": "Conector Luer macho con cierre giratorio", "Fixed-Lock Male Luer Fitting": "Conector Luer macho con cierre fijo",
    "Fluorinated Ethylene Propylene (FEP)": "Etileno propileno fluorado (FEP)", "Thermoplastic Polyurethane (TPU)": "Poliuretano termoplástico (TPU)", "Polyvinyl Chloride (PVC)": "Policloruro de vinilo (PVC)", "Polytetrafluoroethylene (PTFE)": "Politetrafluoroetileno (PTFE)", "Polyether Ether Ketone (PEEK)": "Polieteretercetona (PEEK)", "Perfluoroalkoxy Alkane (PFA)": "Perfluoroalcoxi alcano (PFA)", "Fluidic Ports": "Puertos fluídicos", "at Full Stroke": "a carrera completa", "Standalone / Valve / Controller Options": "Opciones de bomba autónoma / válvula / controlador", "Thread": "Rosca",
    "Service life": "Vida útil", "Brushed motor": "Motor con escobillas", "Brushless motor": "Motor sin escobillas", "Filtration Rating": "Grado de filtración", "Housing Material": "Material del cuerpo", "Flow Path Diameter": "Diámetro del paso de flujo", "Working temperature": "Temperatura de trabajo", "ID range": "Rango de diámetro interior", "Tube I.D.": "Diámetro interior del tubo", "Tube ID": "Diámetro interior del tubo", "tube ID": "diámetro interior del tubo", "Fits": "Para", "For": "Para", "thread": "rosca", "housing": "cuerpo", "material": "material", "filter media": "medio filtrante", "Panel Mount": "Montaje en panel", "Non-Panel Mount": "Sin montaje en panel", "Mesh Filter": "Filtro de malla", "Check Valve": "Válvula antirretorno", "Quick-Connect Fitting": "Racor de conexión rápida", "Thread to Barb Fitting": "Racor de rosca a espiga", "Female Thread Adapter": "Adaptador roscado hembra", "Luer Fitting": "Racor Luer", "Barbed Fitting": "Racor de espiga", "Filter": "Filtro", "Hex Nut": "Tuerca hexagonal", "Natural": "Natural", "White": "Blanco", "Black": "Negro", "本色": "Natural", "白色": "Blanco", "黑色": "Negro", "body": "cuerpo", "ID tubing": "de diámetro interior",
  },
  fr: {
    "High-Pressure T-Shaped Three-Way Female Thread Adapter": "Adaptateur fileté femelle en T à trois voies haute pression", "High-Pressure Two-Way Female Thread Adapter": "Adaptateur fileté femelle à deux voies haute pression",
    "Straight Thread-Seal Thread to Barb Fitting": "Raccord droit filetage-cannelure à étanchéité filetée", "Straight Bottom-Seal Thread to Barb Fitting": "Raccord droit filetage-cannelure à étanchéité de fond", "Elbow Thread-Seal Thread to Barb Fitting": "Raccord coudé filetage-cannelure à étanchéité filetée",
    "Male In-line Valved Quick-Connect Fitting": "Raccord rapide mâle droit avec valve", "Female In-line Valved Quick-Connect Fitting": "Raccord rapide femelle droit avec valve", "Male Elbow Valved Quick-Connect Fitting": "Raccord rapide mâle coudé avec valve", "Female Elbow Valved Quick-Connect Fitting": "Raccord rapide femelle coudé avec valve", "Male In-line Non-Valved Quick-Connect Fitting": "Raccord rapide mâle droit sans valve", "Female In-line Non-Valved Quick-Connect Fitting": "Raccord rapide femelle droit sans valve", "Male Elbow Non-Valved Quick-Connect Fitting": "Raccord rapide mâle coudé sans valve", "Female Elbow Non-Valved Quick-Connect Fitting": "Raccord rapide femelle coudé sans valve",
    "Two-Way Female Thread Adapter": "Adaptateur fileté femelle à deux voies", "Three-Way Female Thread Adapter": "Adaptateur fileté femelle à trois voies", "Bulkhead Barbed Fitting": "Raccord cannelé traversant", "Straight Barbed Fitting": "Raccord cannelé droit", "Elbow Barbed Fitting": "Raccord cannelé coudé", "Tee Barbed Fitting": "Raccord cannelé en T", "Cross Barbed Fitting": "Raccord cannelé en croix", "Y-Shaped Barbed Fitting": "Raccord cannelé en Y", "Pi-Shaped Barbed Fitting": "Raccord cannelé en π",
    "Male Luer Stationary Lock": "Raccord Luer mâle fixe", "Male Luer Rotating Lock": "Raccord Luer mâle rotatif", "Female Luer Fitting": "Raccord Luer femelle", "Integrated Male Luer Fitting": "Raccord Luer mâle monobloc", "Rotating-Lock Male Luer Fitting": "Raccord Luer mâle à verrou rotatif", "Fixed-Lock Male Luer Fitting": "Raccord Luer mâle à verrou fixe",
    "Fluorinated Ethylene Propylene (FEP)": "Éthylène-propylène fluoré (FEP)", "Thermoplastic Polyurethane (TPU)": "Polyuréthane thermoplastique (TPU)", "Polyvinyl Chloride (PVC)": "Polychlorure de vinyle (PVC)", "Polytetrafluoroethylene (PTFE)": "Polytétrafluoroéthylène (PTFE)", "Polyether Ether Ketone (PEEK)": "Polyétheréthercétone (PEEK)", "Perfluoroalkoxy Alkane (PFA)": "Perfluoroalcoxy (PFA)", "Fluidic Ports": "Ports fluidiques", "at Full Stroke": "sur la course complète", "Standalone / Valve / Controller Options": "Options de pompe autonome / vanne / contrôleur", "Thread": "Filetage",
    "Service life": "Durée de vie", "Brushed motor": "Moteur à balais", "Brushless motor": "Moteur sans balais", "Filtration Rating": "Seuil de filtration", "Housing Material": "Matériau du corps", "Flow Path Diameter": "Diamètre du passage de fluide", "Working temperature": "Température de service", "ID range": "Plage de diamètre intérieur", "Tube I.D.": "Diamètre intérieur du tube", "Tube ID": "Diamètre intérieur du tube", "tube ID": "diamètre intérieur du tube", "Fits": "Pour", "For": "Pour", "thread": "filetage", "housing": "corps", "material": "matériau", "filter media": "média filtrant", "Panel Mount": "Montage sur panneau", "Non-Panel Mount": "Sans montage sur panneau", "Mesh Filter": "Filtre à maille", "Check Valve": "Clapet anti-retour", "Quick-Connect Fitting": "Raccord rapide", "Thread to Barb Fitting": "Raccord filetage-cannelure", "Female Thread Adapter": "Adaptateur fileté femelle", "Luer Fitting": "Raccord Luer", "Barbed Fitting": "Raccord cannelé", "Filter": "Filtre", "Hex Nut": "Écrou hexagonal", "Natural": "Naturel", "White": "Blanc", "Black": "Noir", "本色": "Naturel", "白色": "Blanc", "黑色": "Noir", "body": "corps", "ID tubing": "de diamètre intérieur",
  },
  ko: {
    "High-Pressure T-Shaped Three-Way Female Thread Adapter": "고압 T형 3방향 암나사 어댑터", "High-Pressure Two-Way Female Thread Adapter": "고압 2방향 암나사 어댑터", "Straight Thread-Seal Thread to Barb Fitting": "나사 밀봉형 직선 나사-바브 피팅", "Straight Bottom-Seal Thread to Barb Fitting": "하부 밀봉형 직선 나사-바브 피팅", "Elbow Thread-Seal Thread to Barb Fitting": "나사 밀봉형 엘보 나사-바브 피팅",
    "Male In-line Valved Quick-Connect Fitting": "밸브 내장 직선형 수 퀵 커넥트 피팅", "Female In-line Valved Quick-Connect Fitting": "밸브 내장 직선형 암 퀵 커넥트 피팅", "Male Elbow Valved Quick-Connect Fitting": "밸브 내장 엘보형 수 퀵 커넥트 피팅", "Female Elbow Valved Quick-Connect Fitting": "밸브 내장 엘보형 암 퀵 커넥트 피팅", "Male In-line Non-Valved Quick-Connect Fitting": "무밸브 직선형 수 퀵 커넥트 피팅", "Female In-line Non-Valved Quick-Connect Fitting": "무밸브 직선형 암 퀵 커넥트 피팅", "Male Elbow Non-Valved Quick-Connect Fitting": "무밸브 엘보형 수 퀵 커넥트 피팅", "Female Elbow Non-Valved Quick-Connect Fitting": "무밸브 엘보형 암 퀵 커넥트 피팅",
    "Two-Way Female Thread Adapter": "2방향 암나사 어댑터", "Three-Way Female Thread Adapter": "3방향 암나사 어댑터", "Bulkhead Barbed Fitting": "벌크헤드 바브 피팅", "Straight Barbed Fitting": "직선형 바브 피팅", "Elbow Barbed Fitting": "엘보형 바브 피팅", "Tee Barbed Fitting": "T형 바브 피팅", "Cross Barbed Fitting": "십자형 바브 피팅", "Y-Shaped Barbed Fitting": "Y형 바브 피팅", "Pi-Shaped Barbed Fitting": "π형 바브 피팅",
    "Male Luer Stationary Lock": "고정형 수 루어 커넥터", "Male Luer Rotating Lock": "회전형 수 루어 커넥터", "Female Luer Fitting": "암 루어 피팅", "Integrated Male Luer Fitting": "일체형 수 루어 피팅", "Rotating-Lock Male Luer Fitting": "회전 잠금형 수 루어 피팅", "Fixed-Lock Male Luer Fitting": "고정 잠금형 수 루어 피팅",
    "Fluorinated Ethylene Propylene (FEP)": "불소화 에틸렌 프로필렌(FEP)", "Thermoplastic Polyurethane (TPU)": "열가소성 폴리우레탄(TPU)", "Polyvinyl Chloride (PVC)": "폴리염화비닐(PVC)", "Polytetrafluoroethylene (PTFE)": "폴리테트라플루오로에틸렌(PTFE)", "Polyether Ether Ketone (PEEK)": "폴리에테르에테르케톤(PEEK)", "Perfluoroalkoxy Alkane (PFA)": "과불소알콕시(PFA)", "Fluidic Ports": "유체 포트", "at Full Stroke": "전체 행정에서", "Standalone / Valve / Controller Options": "독립형 / 밸브 / 컨트롤러 옵션", "Thread": "나사 규격",
    "Service life": "수명", "Brushed motor": "브러시 모터", "Brushless motor": "브러시리스 모터", "Filtration Rating": "여과 정밀도", "Housing Material": "본체 재질", "Flow Path Diameter": "유로 직경", "Working temperature": "사용 온도", "ID range": "내경 범위", "Tube I.D.": "튜브 내경", "Tube ID": "튜브 내경", "tube ID": "튜브 내경", "Fits": "적용 규격", "For": "용도:", "thread": "나사", "housing": "본체", "material": "재질", "filter media": "필터 매체", "Panel Mount": "패널 장착", "Non-Panel Mount": "비패널 장착", "Mesh Filter": "메시 필터", "Check Valve": "체크 밸브", "Quick-Connect Fitting": "퀵 커넥트 피팅", "Thread to Barb Fitting": "나사-바브 피팅", "Female Thread Adapter": "암나사 어댑터", "Luer Fitting": "루어 피팅", "Barbed Fitting": "바브 피팅", "Filter": "필터", "Hex Nut": "육각 너트", "Natural": "내추럴", "White": "흰색", "Black": "검은색", "本色": "내추럴", "白色": "흰색", "黑色": "검은색", "body": "본체", "ID tubing": "내경 튜브",
  },
  ru: {
    "High-Pressure T-Shaped Three-Way Female Thread Adapter": "Т-образный трёхходовой резьбовой адаптер высокого давления с внутренней резьбой", "High-Pressure Two-Way Female Thread Adapter": "Двухходовой резьбовой адаптер высокого давления с внутренней резьбой", "Straight Thread-Seal Thread to Barb Fitting": "Прямой переходник резьба–штуцер с резьбовым уплотнением", "Straight Bottom-Seal Thread to Barb Fitting": "Прямой переходник резьба–штуцер с торцевым уплотнением", "Elbow Thread-Seal Thread to Barb Fitting": "Угловой переходник резьба–штуцер с резьбовым уплотнением",
    "Male In-line Valved Quick-Connect Fitting": "Прямое быстроразъёмное соединение со штыревым концом и клапаном", "Female In-line Valved Quick-Connect Fitting": "Прямое быстроразъёмное соединение с гнездовым концом и клапаном", "Male Elbow Valved Quick-Connect Fitting": "Угловое быстроразъёмное соединение со штыревым концом и клапаном", "Female Elbow Valved Quick-Connect Fitting": "Угловое быстроразъёмное соединение с гнездовым концом и клапаном", "Male In-line Non-Valved Quick-Connect Fitting": "Прямое быстроразъёмное соединение со штыревым концом без клапана", "Female In-line Non-Valved Quick-Connect Fitting": "Прямое быстроразъёмное соединение с гнездовым концом без клапана", "Male Elbow Non-Valved Quick-Connect Fitting": "Угловое быстроразъёмное соединение со штыревым концом без клапана", "Female Elbow Non-Valved Quick-Connect Fitting": "Угловое быстроразъёмное соединение с гнездовым концом без клапана",
    "Two-Way Female Thread Adapter": "Двухходовой адаптер с внутренней резьбой", "Three-Way Female Thread Adapter": "Трёхходовой адаптер с внутренней резьбой", "Bulkhead Barbed Fitting": "Проходной штуцер", "Straight Barbed Fitting": "Прямой штуцер", "Elbow Barbed Fitting": "Угловой штуцер", "Tee Barbed Fitting": "Тройниковый штуцер", "Cross Barbed Fitting": "Крестовой штуцер", "Y-Shaped Barbed Fitting": "Y-образный штуцер", "Pi-Shaped Barbed Fitting": "π-образный штуцер",
    "Male Luer Stationary Lock": "Неподвижный штекерный разъём Люэра", "Male Luer Rotating Lock": "Поворотный штекерный разъём Люэра", "Female Luer Fitting": "Гнездовой фитинг Люэра", "Integrated Male Luer Fitting": "Цельный штекерный фитинг Люэра", "Rotating-Lock Male Luer Fitting": "Штекерный фитинг Люэра с поворотным фиксатором", "Fixed-Lock Male Luer Fitting": "Штекерный фитинг Люэра с неподвижным фиксатором",
    "Fluorinated Ethylene Propylene (FEP)": "Фторированный этилен-пропилен (ФЭП)", "Thermoplastic Polyurethane (TPU)": "Термопластичный полиуретан (ТПУ)", "Polyvinyl Chloride (PVC)": "Поливинилхлорид (ПВХ)", "Polytetrafluoroethylene (PTFE)": "Политетрафторэтилен (ПТФЭ)", "Polyether Ether Ketone (PEEK)": "Полиэфирэфиркетон (ПЭЭК)", "Perfluoroalkoxy Alkane (PFA)": "Перфторалкокси (ПФА)", "Fluidic Ports": "Жидкостные порты", "at Full Stroke": "на полном ходе", "Standalone / Valve / Controller Options": "Варианты: автономный насос / клапан / контроллер", "Thread": "Резьба",
    "Service life": "Срок службы", "Brushed motor": "Щёточный двигатель", "Brushless motor": "Бесщёточный двигатель", "Filtration Rating": "Тонкость фильтрации", "Housing Material": "Материал корпуса", "Flow Path Diameter": "Диаметр проточного канала", "Working temperature": "Рабочая температура", "ID range": "Диапазон внутреннего диаметра", "Tube I.D.": "Внутренний диаметр трубки", "Tube ID": "Внутренний диаметр трубки", "tube ID": "внутренний диаметр трубки", "Fits": "Для", "For": "Для", "thread": "резьба", "housing": "корпус", "material": "материал", "filter media": "фильтрующий материал", "Panel Mount": "Панельный монтаж", "Non-Panel Mount": "Непанельный монтаж", "Mesh Filter": "Сетчатый фильтр", "Check Valve": "Обратный клапан", "Quick-Connect Fitting": "Быстроразъёмное соединение", "Thread to Barb Fitting": "Переходник резьба–штуцер", "Female Thread Adapter": "Адаптер с внутренней резьбой", "Luer Fitting": "Фитинг Люэра", "Barbed Fitting": "Штуцер", "Filter": "Фильтр", "Hex Nut": "Шестигранная гайка", "Natural": "Натуральный", "White": "Белый", "Black": "Чёрный", "本色": "Натуральный", "白色": "Белый", "黑色": "Чёрный", "body": "корпус", "ID tubing": "трубки с внутренним диаметром",
  },
};

function isTargetLocale(locale: SelectionLocale): locale is TargetLocale {
  return TARGET_LOCALES.includes(locale as TargetLocale);
}

function replacePhrases(value: string, locale: TargetLocale) {
  const localized = Object.entries(PHRASE_COPY[locale])
    .sort(([a], [b]) => b.length - a.length)
    .reduce((text, [source, target]) => text.split(source).join(target), value)
    .replace(/\s+\|\s+/g, " · ")
    .trim();
  const twoWay = locale === "es" ? "2 vías" : locale === "fr" ? "2 voies" : locale === "ko" ? "2방향" : "2-ходовой";
  const threeWay = locale === "es" ? "3 vías" : locale === "fr" ? "3 voies" : locale === "ko" ? "3방향" : "3-ходовой";
  const microstep = locale === "es" ? "micropaso" : locale === "fr" ? "micropas" : locale === "ko" ? "마이크로스텝" : "микрошаг";
  const duckbill = locale === "es" ? "Pico de pato" : locale === "fr" ? "Bec de canard" : locale === "ko" ? "덕빌형" : "Утиный клюв";
  const diaphragm = locale === "es" ? "membrana" : locale === "fr" ? "membrane" : locale === "ko" ? "다이어프램" : "мембрана";
  const connector = locale === "es" ? " a " : locale === "fr" ? " vers " : " → ";
  return localized
    .replace(/\b2-Way\b/gi, twoWay)
    .replace(/\b3-Way\b/gi, threeWay)
    .replace(/\bmicrostep\b/gi, microstep)
    .replace(/\bDuckbill\b/g, duckbill)
    .replace(/\bdiaphragm\b/gi, diaphragm)
    .replace(/\s+to\s+/gi, connector)
    .trim();
}

export function localizeProductCardTitle(
  product: ProductSelectionProduct,
  locale: SelectionLocale,
  title: string,
) {
  const diaphragmCopy = getDiaphragmPumpCopy(product, locale);

  if (diaphragmCopy) return diaphragmCopy.title;
  if (!isTargetLocale(locale) || !title) return title;
  return TITLE_COPY[locale][title] || replacePhrases(title, locale);
}

export function localizeProductCardSubtitle(
  product: ProductSelectionProduct,
  locale: SelectionLocale,
  subtitle: string,
) {
  const diaphragmCopy = getDiaphragmPumpCopy(product, locale);

  if (diaphragmCopy) return diaphragmCopy.cardParameters.join("\n");
  if (!isTargetLocale(locale) || !subtitle) return subtitle;

  const hardTubeLocalized = localizeHardTubeFittingCardSubtitle(product, locale, subtitle);
  if (hardTubeLocalized !== subtitle) return hardTubeLocalized;

  return subtitle.split("\n").map((line) => replacePhrases(line, locale)).join("\n");
}
