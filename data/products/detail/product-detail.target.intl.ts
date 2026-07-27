import { localizeProductDetailData } from "./product-detail.intl";
import {
  isHardTubeTargetLocale,
  localizeHardTubeFittingDetailData,
  type HardTubeTargetLocale,
} from "./hard-tube-fitting-detail.intl";
import { localizeProbeDetailData } from "./probe-detail.target.intl";

type DetailRecord = Record<string, any>;
type ProductKind =
  | "plunger-pump" | "diaphragm-pump" | "pipetting-pump" | "syringe-pump" | "valveless-pump"
  | "barbed-fitting" | "bulkhead-barbed-fitting" | "hard-tube-fitting" | "thread-to-barbed-fitting"
  | "quick-connect-fitting" | "luer-fitting" | "female-thread-adapter" | "filter" | "check-valve"
  | "tubing" | "rotary-valve" | "high-pressure-valve" | "solenoid-valve"
  | "sampling-probe" | "piercing-probe" | "wash-probe" | "mixing-paddle"
  | "air-bubble-detector" | "pressure-sensor" | "product";

const PRODUCT_NAMES: Record<HardTubeTargetLocale, Record<ProductKind, string>> = {
  es: {
    "plunger-pump": "bomba de émbolo", "diaphragm-pump": "bomba de diafragma", "pipetting-pump": "bomba de pipeteo", "syringe-pump": "bomba de jeringa", "valveless-pump": "bomba sin válvulas",
    "barbed-fitting": "racor de espiga", "bulkhead-barbed-fitting": "racor de espiga pasamuros", "hard-tube-fitting": "racor para tubo rígido", "thread-to-barbed-fitting": "racor de rosca a espiga", "quick-connect-fitting": "racor de conexión rápida", "luer-fitting": "racor Luer", "female-thread-adapter": "adaptador roscado hembra", filter: "filtro en línea", "check-valve": "válvula antirretorno",
    tubing: "tubo para fluidos", "rotary-valve": "válvula rotativa", "high-pressure-valve": "válvula de alta presión", "solenoid-valve": "electroválvula", "sampling-probe": "aguja de muestreo", "piercing-probe": "aguja de perforación", "wash-probe": "aguja de lavado", "mixing-paddle": "paleta mezcladora", "air-bubble-detector": "detector de burbujas de aire", "pressure-sensor": "sensor de presión", product: "componente fluídico de precisión",
  },
  fr: {
    "plunger-pump": "pompe à piston", "diaphragm-pump": "pompe à membrane", "pipetting-pump": "pompe de pipetage", "syringe-pump": "pompe seringue", "valveless-pump": "pompe sans valve",
    "barbed-fitting": "raccord cannelé", "bulkhead-barbed-fitting": "raccord cannelé traversant", "hard-tube-fitting": "raccord pour tube rigide", "thread-to-barbed-fitting": "raccord filetage-cannelure", "quick-connect-fitting": "raccord rapide", "luer-fitting": "raccord Luer", "female-thread-adapter": "adaptateur fileté femelle", filter: "filtre en ligne", "check-valve": "clapet anti-retour",
    tubing: "tube fluidique", "rotary-valve": "vanne rotative", "high-pressure-valve": "vanne haute pression", "solenoid-valve": "électrovanne", "sampling-probe": "aiguille de prélèvement", "piercing-probe": "aiguille de perçage", "wash-probe": "aiguille de lavage", "mixing-paddle": "palette de mélange", "air-bubble-detector": "détecteur de bulles d’air", "pressure-sensor": "capteur de pression", product: "composant fluidique de précision",
  },
  ko: {
    "plunger-pump": "플런저 펌프", "diaphragm-pump": "다이어프램 펌프", "pipetting-pump": "피펫팅 펌프", "syringe-pump": "시린지 펌프", "valveless-pump": "무밸브 펌프",
    "barbed-fitting": "바브 피팅", "bulkhead-barbed-fitting": "벌크헤드 바브 피팅", "hard-tube-fitting": "경질 튜브 피팅", "thread-to-barbed-fitting": "나사-바브 피팅", "quick-connect-fitting": "퀵 커넥트 피팅", "luer-fitting": "루어 피팅", "female-thread-adapter": "암나사 어댑터", filter: "인라인 필터", "check-valve": "체크 밸브",
    tubing: "유체 튜브", "rotary-valve": "로터리 밸브", "high-pressure-valve": "고압 밸브", "solenoid-valve": "솔레노이드 밸브", "sampling-probe": "샘플링 프로브", "piercing-probe": "피어싱 프로브", "wash-probe": "세척 프로브", "mixing-paddle": "혼합 패들", "air-bubble-detector": "기포 감지기", "pressure-sensor": "압력 센서", product: "정밀 유체 부품",
  },
  ru: {
    "plunger-pump": "плунжерный насос", "diaphragm-pump": "мембранный насос", "pipetting-pump": "пипетирующий насос", "syringe-pump": "шприцевой насос", "valveless-pump": "бесклапанный насос",
    "barbed-fitting": "штуцер", "bulkhead-barbed-fitting": "проходной штуцер", "hard-tube-fitting": "фитинг для жёстких трубок", "thread-to-barbed-fitting": "переходник резьба–штуцер", "quick-connect-fitting": "быстроразъёмное соединение", "luer-fitting": "фитинг Люэра", "female-thread-adapter": "адаптер с внутренней резьбой", filter: "линейный фильтр", "check-valve": "обратный клапан",
    tubing: "трубка для жидкостных систем", "rotary-valve": "поворотный клапан", "high-pressure-valve": "клапан высокого давления", "solenoid-valve": "электромагнитный клапан", "sampling-probe": "пробоотборная игла", "piercing-probe": "прокалывающая игла", "wash-probe": "промывочная игла", "mixing-paddle": "смесительная лопатка", "air-bubble-detector": "детектор воздушных пузырьков", "pressure-sensor": "датчик давления", product: "прецизионный компонент жидкостной системы",
  },
};

const VALVELESS_PRODUCT_NAMES: Record<
  HardTubeTargetLocale,
  Record<"RPL" | "DRPL", string>
> = {
  es: {
    RPL: "bomba sin válvulas RPL",
    DRPL: "bomba sin válvulas de doble cabezal DRPL",
  },
  fr: {
    RPL: "pompe sans valve RPL",
    DRPL: "pompe sans valve à double tête DRPL",
  },
  ko: {
    RPL: "RPL 무밸브 펌프",
    DRPL: "DRPL 듀얼 헤드 무밸브 펌프",
  },
  ru: {
    RPL: "бесклапанный насос RPL",
    DRPL: "двухголовочный бесклапанный насос DRPL",
  },
};

const CATEGORY_NAMES: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: { pumps: "Bombas", fittings: "Racores", tubing: "Tubos", valves: "Válvulas", probes: "Agujas y sondas", control: "Módulos de control" },
  fr: { pumps: "Pompes", fittings: "Raccords", tubing: "Tubes", valves: "Vannes", probes: "Aiguilles et sondes", control: "Modules de contrôle" },
  ko: { pumps: "펌프", fittings: "피팅", tubing: "튜브", valves: "밸브", probes: "니들 및 프로브", control: "제어 모듈" },
  ru: { pumps: "Насосы", fittings: "Фитинги", tubing: "Трубки", valves: "Клапаны", probes: "Иглы и зонды", control: "Модули управления" },
};

const SPEC_LABELS: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: { Name: "Nombre", Specifications: "Especificaciones", "Product Series": "Serie", "Product Category": "Categoría", "Product Type": "Tipo de producto", Model: "Modelo", "Product Code": "Código de producto", Stroke: "Carrera", "Number of Channels": "Número de canales", "Full-Stroke Travel Time": "Tiempo de carrera completa", "Linear Speed": "Velocidad lineal", Resolution: "Resolución", "Pump Head Material": "Material del cabezal de bomba", "Valve Head Material": "Material del cabezal de válvula", "Plunger Material": "Material del émbolo", "Diaphragm Material": "Material de la membrana", "Body Material": "Material del cuerpo", "Housing Material": "Material de la carcasa", "Wetted Materials": "Materiales en contacto con el fluido", "Standard Port": "Puerto estándar", "Port Type": "Tipo de puerto", "Communication Interface": "Interfaz de comunicación", "Operating Temperature": "Temperatura de servicio", "Pressure Range": "Rango de presión", "Operating Pressure Range": "Rango de presión de servicio", "Flow Range": "Rango de caudal", "Volume Range": "Rango de volumen", Accuracy: "Exactitud", Repeatability: "Repetibilidad", "Service Life": "Vida útil", "Mounting Method": "Método de montaje", "Connection Type": "Tipo de conexión", "Tube ID": "Diámetro interior del tubo", "Tube OD": "Diámetro exterior del tubo", Material: "Material", "Seal Material": "Material de sellado", Color: "Color", "Fluid Temperature": "Temperatura del fluido", "Working Fluid": "Fluido de trabajo", "Rated Pressure": "Presión nominal", "Pressure Rating": "Presión nominal", "Orifice Diameter": "Diámetro del orificio", "Internal Volume": "Volumen interno", "Overall Dimensions": "Dimensiones totales", "Motor Type": "Tipo de motor", "Rated Voltage": "Tensión nominal", "Power Requirements": "Requisitos de alimentación", "Free-Flow Rate": "Caudal libre", "Self-Priming Lift": "Altura de autocebado", Weight: "Peso", "Thread Size": "Tamaño de rosca", Gender: "Tipo de conexión", Shape: "Forma", "Complete Model Numbers": "Modelos completos", "FOREACH Model": "Modelo FOREACH" },
  fr: { Name: "Nom", Specifications: "Caractéristiques", "Product Series": "Série", "Product Category": "Catégorie", "Product Type": "Type de produit", Model: "Modèle", "Product Code": "Code produit", Stroke: "Course", "Number of Channels": "Nombre de canaux", "Full-Stroke Travel Time": "Temps de course complète", "Linear Speed": "Vitesse linéaire", Resolution: "Résolution", "Pump Head Material": "Matériau de la tête de pompe", "Valve Head Material": "Matériau de la tête de vanne", "Plunger Material": "Matériau du piston", "Diaphragm Material": "Matériau de la membrane", "Body Material": "Matériau du corps", "Housing Material": "Matériau du boîtier", "Wetted Materials": "Matériaux en contact avec le fluide", "Standard Port": "Port standard", "Port Type": "Type de port", "Communication Interface": "Interface de communication", "Operating Temperature": "Température de service", "Pressure Range": "Plage de pression", "Operating Pressure Range": "Plage de pression de service", "Flow Range": "Plage de débit", "Volume Range": "Plage de volume", Accuracy: "Exactitude", Repeatability: "Répétabilité", "Service Life": "Durée de vie", "Mounting Method": "Méthode de montage", "Connection Type": "Type de raccordement", "Tube ID": "Diamètre intérieur du tube", "Tube OD": "Diamètre extérieur du tube", Material: "Matériau", "Seal Material": "Matériau du joint", Color: "Couleur", "Fluid Temperature": "Température du fluide", "Working Fluid": "Fluide de service", "Rated Pressure": "Pression nominale", "Pressure Rating": "Pression nominale", "Orifice Diameter": "Diamètre de passage", "Internal Volume": "Volume interne", "Overall Dimensions": "Dimensions hors tout", "Motor Type": "Type de moteur", "Rated Voltage": "Tension nominale", "Power Requirements": "Alimentation requise", "Free-Flow Rate": "Débit libre", "Self-Priming Lift": "Hauteur d’auto-amorçage", Weight: "Poids", "Thread Size": "Dimension du filetage", Gender: "Type de raccord", Shape: "Forme", "Complete Model Numbers": "Références complètes", "FOREACH Model": "Modèle FOREACH" },
  ko: { Name: "명칭", Specifications: "사양", "Product Series": "제품 시리즈", "Product Category": "제품 범주", "Product Type": "제품 유형", Model: "모델", "Product Code": "제품 코드", Stroke: "스트로크", "Number of Channels": "채널 수", "Full-Stroke Travel Time": "전체 행정 시간", "Linear Speed": "선형 속도", Resolution: "분해능", "Pump Head Material": "펌프 헤드 재질", "Valve Head Material": "밸브 헤드 재질", "Plunger Material": "플런저 재질", "Diaphragm Material": "다이어프램 재질", "Body Material": "본체 재질", "Housing Material": "하우징 재질", "Wetted Materials": "접액부 재질", "Standard Port": "표준 포트", "Port Type": "포트 형식", "Communication Interface": "통신 인터페이스", "Operating Temperature": "사용 온도", "Pressure Range": "압력 범위", "Operating Pressure Range": "사용 압력 범위", "Flow Range": "유량 범위", "Volume Range": "용량 범위", Accuracy: "정확도", Repeatability: "반복성", "Service Life": "수명", "Mounting Method": "장착 방식", "Connection Type": "연결 방식", "Tube ID": "튜브 내경", "Tube OD": "튜브 외경", Material: "재질", "Seal Material": "씰 재질", Color: "색상", "Fluid Temperature": "유체 온도", "Working Fluid": "사용 유체", "Rated Pressure": "정격 압력", "Pressure Rating": "정격 압력", "Orifice Diameter": "오리피스 직경", "Internal Volume": "내부 체적", "Overall Dimensions": "외형 치수", "Motor Type": "모터 유형", "Rated Voltage": "정격 전압", "Power Requirements": "전원 요구 사항", "Free-Flow Rate": "무부하 유량", "Self-Priming Lift": "자흡 높이", Weight: "중량", "Thread Size": "나사 규격", Gender: "연결 타입", Shape: "형상", "Complete Model Numbers": "전체 모델", "FOREACH Model": "FOREACH 모델" },
  ru: { Name: "Наименование", Specifications: "Характеристики", "Product Series": "Серия", "Product Category": "Категория", "Product Type": "Тип продукта", Model: "Модель", "Product Code": "Код продукта", Stroke: "Ход", "Number of Channels": "Количество каналов", "Full-Stroke Travel Time": "Время полного хода", "Linear Speed": "Линейная скорость", Resolution: "Разрешение", "Pump Head Material": "Материал головки насоса", "Valve Head Material": "Материал головки клапана", "Plunger Material": "Материал плунжера", "Diaphragm Material": "Материал мембраны", "Body Material": "Материал корпуса", "Housing Material": "Материал корпуса", "Wetted Materials": "Материалы, контактирующие с жидкостью", "Standard Port": "Стандартный порт", "Port Type": "Тип порта", "Communication Interface": "Интерфейс связи", "Operating Temperature": "Рабочая температура", "Pressure Range": "Диапазон давления", "Operating Pressure Range": "Диапазон рабочего давления", "Flow Range": "Диапазон расхода", "Volume Range": "Диапазон объёма", Accuracy: "Точность", Repeatability: "Повторяемость", "Service Life": "Срок службы", "Mounting Method": "Способ монтажа", "Connection Type": "Тип соединения", "Tube ID": "Внутренний диаметр трубки", "Tube OD": "Наружный диаметр трубки", Material: "Материал", "Seal Material": "Материал уплотнения", Color: "Цвет", "Fluid Temperature": "Температура жидкости", "Working Fluid": "Рабочая жидкость", "Rated Pressure": "Номинальное давление", "Pressure Rating": "Номинальное давление", "Orifice Diameter": "Диаметр отверстия", "Internal Volume": "Внутренний объём", "Overall Dimensions": "Габаритные размеры", "Motor Type": "Тип двигателя", "Rated Voltage": "Номинальное напряжение", "Power Requirements": "Требования к питанию", "Free-Flow Rate": "Расход без нагрузки", "Self-Priming Lift": "Высота самовсасывания", Weight: "Масса", "Thread Size": "Размер резьбы", Gender: "Тип соединения", Shape: "Форма", "Complete Model Numbers": "Полный перечень моделей", "FOREACH Model": "Модель FOREACH" },
};

const VALUE_COPY: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: { Yes: "Sí", No: "No", Optional: "Opcional", Standard: "Estándar", Custom: "Personalizado", Male: "Macho", Female: "Hembra", Straight: "Recto", Elbow: "Acodado", "Panel Mount": "Montaje en panel", "Non-Panel Mount": "Sin montaje en panel", Valved: "Con válvula", "Non-Valved": "Sin válvula", Natural: "Natural", White: "Blanco", Black: "Negro", "Brushed DC Motor": "Motor CC con escobillas", "Brushless DC Motor": "Motor CC sin escobillas" },
  fr: { Yes: "Oui", No: "Non", Optional: "En option", Standard: "Standard", Custom: "Sur mesure", Male: "Mâle", Female: "Femelle", Straight: "Droit", Elbow: "Coudé", "Panel Mount": "Montage sur panneau", "Non-Panel Mount": "Sans montage sur panneau", Valved: "Avec valve", "Non-Valved": "Sans valve", Natural: "Naturel", White: "Blanc", Black: "Noir", "Brushed DC Motor": "Moteur CC à balais", "Brushless DC Motor": "Moteur CC sans balais" },
  ko: { Yes: "예", No: "아니요", Optional: "선택 사양", Standard: "표준", Custom: "맞춤형", Male: "수", Female: "암", Straight: "직선형", Elbow: "엘보형", "Panel Mount": "패널 장착", "Non-Panel Mount": "비패널 장착", Valved: "밸브 내장", "Non-Valved": "무밸브", Natural: "내추럴", White: "흰색", Black: "검은색", "Brushed DC Motor": "브러시 DC 모터", "Brushless DC Motor": "브러시리스 DC 모터" },
  ru: { Yes: "Да", No: "Нет", Optional: "Опционально", Standard: "Стандартное исполнение", Custom: "По заказу", Male: "Штыревой", Female: "Гнездовой", Straight: "Прямой", Elbow: "Угловой", "Panel Mount": "Панельный монтаж", "Non-Panel Mount": "Непанельный монтаж", Valved: "С клапаном", "Non-Valved": "Без клапана", Natural: "Натуральный", White: "Белый", Black: "Чёрный", "Brushed DC Motor": "Щёточный двигатель постоянного тока", "Brushless DC Motor": "Бесщёточный двигатель постоянного тока" },
};

const SOURCE_SPEC_LABELS: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: { "标称容量": "Volumen nominal", "当前展示泵头材质": "Material del cabezal mostrado", "泵头材质可选范围": "Materiales opcionales del cabezal", "柱塞材质可选范围": "Materiales opcionales del émbolo", "液路接口": "Interfaz fluídica", "行程": "Carrera", "推荐最高转速": "Velocidad máxima recomendada", "电机步距角": "Ángulo de paso del motor", "导程": "Paso del husillo", "满量程步数": "Pasos de carrera completa", "100%量程准确性": "Exactitud al 100 % del rango", "100%量程重复性": "Repetibilidad al 100 % del rango", "2%量程准确性": "Exactitud al 2 % del rango", "2%量程重复性": "Repetibilidad al 2 % del rango", "背隙": "Holgura", "设计寿命": "Vida útil de diseño", "最大流体压力": "Presión máxima del fluido" },
  fr: { "标称容量": "Volume nominal", "当前展示泵头材质": "Matériau de la tête présentée", "泵头材质可选范围": "Matériaux de tête disponibles", "柱塞材质可选范围": "Matériaux de piston disponibles", "液路接口": "Interface fluidique", "行程": "Course", "推荐最高转速": "Vitesse maximale recommandée", "电机步距角": "Angle de pas du moteur", "导程": "Pas de la vis", "满量程步数": "Nombre de pas sur la course complète", "100%量程准确性": "Exactitude à 100 % de la plage", "100%量程重复性": "Répétabilité à 100 % de la plage", "2%量程准确性": "Exactitude à 2 % de la plage", "2%量程重复性": "Répétabilité à 2 % de la plage", "背隙": "Jeu mécanique", "设计寿命": "Durée de vie nominale", "最大流体压力": "Pression maximale du fluide" },
  ko: { "标称容量": "정격 용량", "当前展示泵头材质": "표시된 펌프 헤드 재질", "泵头材质可选范围": "선택 가능한 펌프 헤드 재질", "柱塞材质可选范围": "선택 가능한 플런저 재질", "液路接口": "유체 인터페이스", "行程": "스트로크", "推荐最高转速": "권장 최고 회전 속도", "电机步距角": "모터 스텝 각도", "导程": "리드", "满量程步数": "전체 행정 스텝 수", "100%量程准确性": "100% 용량 정확도", "100%量程重复性": "100% 용량 반복성", "2%量程准确性": "2% 용량 정확도", "2%量程重复性": "2% 용량 반복성", "背隙": "백래시", "设计寿命": "설계 수명", "最大流体压力": "최대 유체 압력" },
  ru: { "标称容量": "Номинальный объём", "当前展示泵头材质": "Материал представленной головки насоса", "泵头材质可选范围": "Доступные материалы головки насоса", "柱塞材质可选范围": "Доступные материалы плунжера", "液路接口": "Жидкостный интерфейс", "行程": "Ход", "推荐最高转速": "Рекомендуемая максимальная скорость", "电机步距角": "Угол шага двигателя", "导程": "Шаг ходового винта", "满量程步数": "Количество шагов полного хода", "100%量程准确性": "Точность при 100 % диапазона", "100%量程重复性": "Повторяемость при 100 % диапазона", "2%量程准确性": "Точность при 2 % диапазона", "2%量程重复性": "Повторяемость при 2 % диапазона", "背隙": "Люфт", "设计寿命": "Расчётный ресурс", "最大流体压力": "Максимальное давление жидкости" },
};

const SOURCE_VALUE_COPY: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: { "聚甲基丙烯酸甲酯（PMMA）": "Polimetilmetacrilato (PMMA)", "聚醚醚酮（PEEK）": "Polieteretercetona (PEEK)", "PCTG / PMMA / PEEK；其他工程材料可根据液体兼容性、结构强度、加工方式和项目批量评估": "PCTG / PMMA / PEEK; otros materiales de ingeniería pueden evaluarse según la compatibilidad del fluido, la resistencia estructural, el proceso y el volumen del proyecto", "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估": "Cerámica de circonia / cerámica de alúmina / PEEK / zafiro; la combinación se evalúa según el fluido, la vida útil, el espacio y los requisitos del proyecto", "500 万次": "5 millones de ciclos", "2000 Step": "2.000 pasos" },
  fr: { "聚甲基丙烯酸甲酯（PMMA）": "Polyméthacrylate de méthyle (PMMA)", "聚醚醚酮（PEEK）": "Polyétheréthercétone (PEEK)", "PCTG / PMMA / PEEK；其他工程材料可根据液体兼容性、结构强度、加工方式和项目批量评估": "PCTG / PMMA / PEEK ; d’autres matériaux techniques peuvent être évalués selon la compatibilité du fluide, la résistance, le procédé et le volume du projet", "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估": "Céramique de zircone / céramique d’alumine / PEEK / saphir ; la combinaison est évaluée selon le fluide, la durée de vie, l’espace et les exigences du projet", "500 万次": "5 millions de cycles", "2000 Step": "2 000 pas" },
  ko: { "聚甲基丙烯酸甲酯（PMMA）": "폴리메틸메타크릴레이트(PMMA)", "聚醚醚酮（PEEK）": "폴리에테르에테르케톤(PEEK)", "PCTG / PMMA / PEEK；其他工程材料可根据液体兼容性、结构强度、加工方式和项目批量评估": "PCTG / PMMA / PEEK; 기타 엔지니어링 소재는 유체 적합성, 구조 강도, 가공 방식 및 프로젝트 수량에 따라 검토", "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估": "지르코니아 세라믹 / 알루미나 세라믹 / PEEK / 사파이어; 조합은 유체 특성, 수명, 설치 공간 및 프로젝트 요구 사항에 따라 검토", "500 万次": "500만 회", "2000 Step": "2,000스텝" },
  ru: { "聚甲基丙烯酸甲酯（PMMA）": "Полиметилметакрилат (ПММА)", "聚醚醚酮（PEEK）": "Полиэфирэфиркетон (ПЭЭК)", "PCTG / PMMA / PEEK；其他工程材料可根据液体兼容性、结构强度、加工方式和项目批量评估": "PCTG / PMMA / PEEK; другие инженерные материалы оцениваются с учётом совместимости с жидкостью, прочности, технологии и объёма проекта", "氧化锆陶瓷 / 氧化铝陶瓷 / 聚醚醚酮（PEEK） / 蓝宝石；具体组合根据液体特性、寿命要求、结构空间和项目需求评估": "Циркониевая керамика / алюмооксидная керамика / PEEK / сапфир; сочетание выбирается с учётом жидкости, ресурса, пространства и требований проекта", "500 万次": "5 млн циклов", "2000 Step": "2 000 шагов" },
};

const COMMON_SOURCE_SPEC_LABELS: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: { "型号": "Modelo", "商品编码": "Código de producto", "产品类别": "Categoría de producto", "产品类型": "Tipo de producto", "产品结构": "Estructura", "接口形式": "Tipo de conexión", "接管内径": "Diámetro interior del tubo", "接管外径": "Diámetro exterior del tubo", "材质": "Material", "颜色": "Color", "产品系列": "Serie", "螺纹规格": "Tamaño de rosca", "螺纹": "Rosca", "密封方式": "Método de sellado", "壳体材质": "Material del cuerpo", "外壳材质": "Material del cuerpo", "过滤精度": "Grado de filtración", "滤网材质": "Material filtrante", "通径": "Diámetro de paso", "耐压": "Presión nominal", "安装方式": "Método de montaje", "形状": "Forma", "公母端": "Tipo de conexión" },
  fr: { "型号": "Modèle", "商品编码": "Code produit", "产品类别": "Catégorie de produit", "产品类型": "Type de produit", "产品结构": "Structure", "接口形式": "Type de raccordement", "接管内径": "Diamètre intérieur du tube", "接管外径": "Diamètre extérieur du tube", "材质": "Matériau", "颜色": "Couleur", "产品系列": "Série", "螺纹规格": "Dimension du filetage", "螺纹": "Filetage", "密封方式": "Méthode d’étanchéité", "壳体材质": "Matériau du corps", "外壳材质": "Matériau du corps", "过滤精度": "Seuil de filtration", "滤网材质": "Matériau filtrant", "通径": "Diamètre de passage", "耐压": "Pression nominale", "安装方式": "Méthode de montage", "形状": "Forme", "公母端": "Type de raccord" },
  ko: { "型号": "모델", "商品编码": "제품 코드", "产品类别": "제품 범주", "产品类型": "제품 유형", "产品结构": "제품 구조", "接口形式": "연결 방식", "接管内径": "튜브 내경", "接管外径": "튜브 외경", "材质": "재질", "颜色": "색상", "产品系列": "제품 시리즈", "螺纹规格": "나사 규격", "螺纹": "나사", "密封方式": "밀봉 방식", "壳体材质": "본체 재질", "外壳材质": "하우징 재질", "过滤精度": "여과 정밀도", "滤网材质": "필터 재질", "通径": "유로 직경", "耐压": "정격 압력", "安装方式": "장착 방식", "形状": "형상", "公母端": "연결 타입" },
  ru: { "型号": "Модель", "商品编码": "Код продукта", "产品类别": "Категория продукта", "产品类型": "Тип продукта", "产品结构": "Конструкция", "接口形式": "Тип соединения", "接管内径": "Внутренний диаметр трубки", "接管外径": "Наружный диаметр трубки", "材质": "Материал", "颜色": "Цвет", "产品系列": "Серия", "螺纹规格": "Размер резьбы", "螺纹": "Резьба", "密封方式": "Способ уплотнения", "壳体材质": "Материал корпуса", "外壳材质": "Материал корпуса", "过滤精度": "Тонкость фильтрации", "滤网材质": "Материал фильтра", "通径": "Диаметр прохода", "耐压": "Номинальное давление", "安装方式": "Способ монтажа", "形状": "Форма", "公母端": "Тип соединения" },
};

const SOURCE_VALUE_TERMS: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: { "穿板倒刺接头": "racor de espiga pasamuros", "螺纹转倒刺接头": "racor de rosca a espiga", "硬管接头": "racor para tubo rígido", "快插接头": "racor de conexión rápida", "倒刺接头": "racor de espiga", "鲁尔接头": "racor Luer", "内螺纹互转接头": "adaptador roscado hembra", "过滤器": "filtro", "单向阀": "válvula antirretorno", "直通型": "tipo recto", "弯头": "codo", "2通等径": "dos vías de igual diámetro", "2通异径": "dos vías reductoras", "3通等径": "tres vías de igual diámetro", "3通异径": "tres vías reductoras", "4通等径": "cuatro vías de igual diámetro", "本色": "natural", "白色": "blanco", "黑色": "negro" },
  fr: { "穿板倒刺接头": "raccord cannelé traversant", "螺纹转倒刺接头": "raccord filetage-cannelure", "硬管接头": "raccord pour tube rigide", "快插接头": "raccord rapide", "倒刺接头": "raccord cannelé", "鲁尔接头": "raccord Luer", "内螺纹互转接头": "adaptateur fileté femelle", "过滤器": "filtre", "单向阀": "clapet anti-retour", "直通型": "type droit", "弯头": "coude", "2通等径": "deux voies de même diamètre", "2通异径": "deux voies réductrices", "3通等径": "trois voies de même diamètre", "3通异径": "trois voies réductrices", "4通等径": "quatre voies de même diamètre", "本色": "naturel", "白色": "blanc", "黑色": "noir" },
  ko: { "穿板倒刺接头": "벌크헤드 바브 피팅", "螺纹转倒刺接头": "나사-바브 피팅", "硬管接头": "경질 튜브 피팅", "快插接头": "퀵 커넥트 피팅", "倒刺接头": "바브 피팅", "鲁尔接头": "루어 피팅", "内螺纹互转接头": "암나사 어댑터", "过滤器": "필터", "单向阀": "체크 밸브", "直通型": "직선형", "弯头": "엘보형", "2通等径": "2방향 동일 구경", "2通异径": "2방향 이경", "3通等径": "3방향 동일 구경", "3通异径": "3방향 이경", "4通等径": "4방향 동일 구경", "本色": "내추럴", "白色": "흰색", "黑色": "검은색" },
  ru: { "穿板倒刺接头": "проходной штуцер", "螺纹转倒刺接头": "переходник резьба–штуцер", "硬管接头": "фитинг для жёстких трубок", "快插接头": "быстроразъёмное соединение", "倒刺接头": "штуцер", "鲁尔接头": "фитинг Люэра", "内螺纹互转接头": "адаптер с внутренней резьбой", "过滤器": "фильтр", "单向阀": "обратный клапан", "直通型": "прямой тип", "弯头": "угловой", "2通等径": "двухходовой равнопроходной", "2通异径": "двухходовой переходной", "3通等径": "трёхходовой равнопроходной", "3通异径": "трёхходовой переходной", "4通等径": "четырёхходовой равнопроходной", "本色": "натуральный", "白色": "белый", "黑色": "чёрный" },
};

const EXTRA_SOURCE_SPEC_LABELS: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: { "产品种类": "Tipo de producto", "额定功率": "Potencia nominal", "自吸高度": "Altura de autocebado", "工作介质": "Fluido de trabajo", "接管规格": "Especificación del tubo", "噪音": "Nivel de ruido", "工作环境温度": "Temperatura ambiente de trabajo", "工作环境相对湿度": "Humedad relativa de trabajo", "存储环境温度": "Temperatura de almacenamiento", "存储环境相对湿度": "Humedad relativa de almacenamiento", "泵头材质": "Material del cabezal de bomba", "膜片材质": "Material de la membrana", "阀片材质": "Material de la válvula", "寿命": "Vida útil", "阀门配置": "Configuración de válvula", "密封圈材质": "Material de la junta", "密度（g/cm³）": "Densidad (g/cm³)", "吸水性（%）": "Absorción de agua (%)", "硬度（Shore A）": "Dureza (Shore A)", "硬度（Shore D）": "Dureza (Shore D)", "介电常数（KV/mm）": "Rigidez dieléctrica (kV/mm)", "拉伸强度（MPa）": "Resistencia a la tracción (MPa)", "弯曲强度（MPa）": "Resistencia a la flexión (MPa)", "低温脆化（℃）": "Fragilización a baja temperatura (°C)", "线膨胀系数（cm/cm/℃）": "Coeficiente de dilatación térmica (cm/cm/°C)", "融化温度（℃）": "Temperatura de fusión (°C)" },
  fr: { "产品种类": "Type de produit", "额定功率": "Puissance nominale", "自吸高度": "Hauteur d’auto-amorçage", "工作介质": "Fluide de service", "接管规格": "Spécification du tube", "噪音": "Niveau sonore", "工作环境温度": "Température ambiante de service", "工作环境相对湿度": "Humidité relative de service", "存储环境温度": "Température de stockage", "存储环境相对湿度": "Humidité relative de stockage", "泵头材质": "Matériau de la tête de pompe", "膜片材质": "Matériau de la membrane", "阀片材质": "Matériau du clapet", "寿命": "Durée de vie", "阀门配置": "Configuration de vanne", "密封圈材质": "Matériau du joint", "密度（g/cm³）": "Masse volumique (g/cm³)", "吸水性（%）": "Absorption d’eau (%)", "硬度（Shore A）": "Dureté (Shore A)", "硬度（Shore D）": "Dureté (Shore D)", "介电常数（KV/mm）": "Rigidité diélectrique (kV/mm)", "拉伸强度（MPa）": "Résistance à la traction (MPa)", "弯曲强度（MPa）": "Résistance à la flexion (MPa)", "低温脆化（℃）": "Fragilisation à basse température (°C)", "线膨胀系数（cm/cm/℃）": "Coefficient de dilatation thermique (cm/cm/°C)", "融化温度（℃）": "Température de fusion (°C)" },
  ko: { "产品种类": "제품 유형", "额定功率": "정격 전력", "自吸高度": "자흡 높이", "工作介质": "사용 유체", "接管规格": "튜브 규격", "噪音": "소음", "工作环境温度": "사용 환경 온도", "工作环境相对湿度": "사용 환경 상대 습도", "存储环境温度": "보관 온도", "存储环境相对湿度": "보관 상대 습도", "泵头材质": "펌프 헤드 재질", "膜片材质": "다이어프램 재질", "阀片材质": "밸브 재질", "寿命": "수명", "阀门配置": "밸브 구성", "密封圈材质": "씰 재질", "密度（g/cm³）": "밀도(g/cm³)", "吸水性（%）": "수분 흡수율(%)", "硬度（Shore A）": "경도(Shore A)", "硬度（Shore D）": "경도(Shore D)", "介电常数（KV/mm）": "유전 강도(kV/mm)", "拉伸强度（MPa）": "인장 강도(MPa)", "弯曲强度（MPa）": "굴곡 강도(MPa)", "低温脆化（℃）": "저온 취화 온도(°C)", "线膨胀系数（cm/cm/℃）": "열팽창 계수(cm/cm/°C)", "融化温度（℃）": "용융 온도(°C)" },
  ru: { "产品种类": "Тип продукта", "额定功率": "Номинальная мощность", "自吸高度": "Высота самовсасывания", "工作介质": "Рабочая жидкость", "接管规格": "Размер трубки", "噪音": "Уровень шума", "工作环境温度": "Рабочая температура окружающей среды", "工作环境相对湿度": "Рабочая относительная влажность", "存储环境温度": "Температура хранения", "存储环境相对湿度": "Относительная влажность при хранении", "泵头材质": "Материал головки насоса", "膜片材质": "Материал мембраны", "阀片材质": "Материал клапана", "寿命": "Срок службы", "阀门配置": "Конфигурация клапана", "密封圈材质": "Материал уплотнения", "密度（g/cm³）": "Плотность (г/см³)", "吸水性（%）": "Водопоглощение (%)", "硬度（Shore A）": "Твёрдость (Shore A)", "硬度（Shore D）": "Твёрдость (Shore D)", "介电常数（KV/mm）": "Диэлектрическая прочность (кВ/мм)", "拉伸强度（MPa）": "Прочность на растяжение (МПа)", "弯曲强度（MPa）": "Прочность на изгиб (МПа)", "低温脆化（℃）": "Температура хрупкости (°C)", "线膨胀系数（cm/cm/℃）": "Коэффициент теплового расширения (см/см/°C)", "融化温度（℃）": "Температура плавления (°C)" },
};

const EXTRA_SOURCE_VALUE_TERMS: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: { "液体隔膜泵": "Bomba de diafragma para líquidos", "RPL 无阀泵": "Bomba sin válvulas RPL", "纯化水，其他液体介质需实际评估": "Agua purificada; otros fluidos deben evaluarse", "可接内径 3.2 mm 软管": "Para tubo con diámetro interior de 3.2 mm", "公端": "Macho", "母端": "Hembra", "穿板": "Montaje en panel", "非穿板": "Sin montaje en panel", "带阀": "Con válvula", "不带阀": "Sin válvula", "直通": "Recto" },
  fr: { "液体隔膜泵": "Pompe à membrane pour liquides", "RPL 无阀泵": "Pompe sans valve RPL", "纯化水，其他液体介质需实际评估": "Eau purifiée ; les autres fluides doivent être évalués", "可接内径 3.2 mm 软管": "Pour tube de diamètre intérieur 3,2 mm", "公端": "Mâle", "母端": "Femelle", "穿板": "Montage sur panneau", "非穿板": "Sans montage sur panneau", "带阀": "Avec valve", "不带阀": "Sans valve", "直通": "Droit" },
  ko: { "液体隔膜泵": "액체 다이어프램 펌프", "RPL 无阀泵": "RPL 무밸브 펌프", "纯化水，其他液体介质需实际评估": "정제수; 기타 유체는 실제 평가 필요", "可接内径 3.2 mm 软管": "내경 3.2 mm 튜브 적용", "公端": "수", "母端": "암", "穿板": "패널 장착", "非穿板": "비패널 장착", "带阀": "밸브 내장", "不带阀": "무밸브", "直通": "직선형" },
  ru: { "液体隔膜泵": "Жидкостный мембранный насос", "RPL 无阀泵": "Бесклапанный насос RPL", "纯化水，其他液体介质需实际评估": "Очищенная вода; другие жидкости требуют оценки", "可接内径 3.2 mm 软管": "Для трубки с внутренним диаметром 3,2 мм", "公端": "Штыревой", "母端": "Гнездовой", "穿板": "Панельный монтаж", "非穿板": "Непанельный монтаж", "带阀": "С клапаном", "不带阀": "Без клапана", "直通": "Прямой" },
};

const TUBING_SOURCE_SPEC_LABELS: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: { "拉伸强度（Mpa）": "Resistencia a la tracción (MPa)", "弯曲强度（Mpa）": "Resistencia a la flexión (MPa)", "工作温度（℃）": "Temperatura de servicio (°C)" },
  fr: { "拉伸强度（Mpa）": "Résistance à la traction (MPa)", "弯曲强度（Mpa）": "Résistance à la flexion (MPa)", "工作温度（℃）": "Température de service (°C)" },
  ko: { "拉伸强度（Mpa）": "인장 강도(MPa)", "弯曲强度（Mpa）": "굴곡 강도(MPa)", "工作温度（℃）": "사용 온도(°C)" },
  ru: { "拉伸强度（Mpa）": "Прочность на растяжение (МПа)", "弯曲强度（Mpa）": "Прочность на изгиб (МПа)", "工作温度（℃）": "Рабочая температура (°C)" },
};

const ADVANCED_SOURCE_SPEC_LABELS: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: {
    "密封类型": "Tipo de sellado", "连接结构": "Estructura de conexión", "鲁尔结构": "Configuración Luer",
    "检测方式": "Método de detección", "检测对象": "Objeto detectado", "适配管外径": "Diámetro exterior de tubo compatible", "适配管材": "Materiales de tubo compatibles", "检测介质": "Medio detectado", "可检测尺寸": "Tamaño mínimo detectable", "通讯协议": "Protocolo de comunicación", "输出方式": "Tipo de salida", "工作电压": "Tensión de funcionamiento", "工作电流": "Corriente de funcionamiento", "响应时间": "Tiempo de respuesta", "储存温度": "Temperatura de almacenamiento",
    "产品名称": "Nombre del producto", "移液方式": "Método de pipeteo", "标称量程": "Volumen nominal", "驱动设计": "Diseño del accionamiento", "定量分辨率": "Resolución de dosificación", "满量程步数": "Pasos de carrera completa", "液面探测": "Detección de nivel de líquido", "尖端堵塞检测": "Detección de obstrucción de punta", "吸头有无检测": "Detección de presencia de punta", "自动脱吸头": "Expulsión automática de punta", "级联能力": "Capacidad de conexión en cascada", "运行噪音": "Ruido de funcionamiento", "运行环境": "Entorno de funcionamiento", "存储环境": "Entorno de almacenamiento", "吸头适配": "Compatibilidad de puntas",
    "切阀时间": "Tiempo de conmutación de válvula", "阀结构": "Estructura de válvula", "量程（玻璃注射器）": "Rango de volumen (jeringa de vidrio)", "液量精确度（额定行程）": "Exactitud de volumen (carrera nominal)", "转阀耐压": "Presión nominal de la válvula rotativa", "通讯类型": "Interfaz de comunicación", "安装尺寸（长×宽×高）": "Dimensiones de instalación (L×An×Al)",
    "稀释比": "Relación de dilución", "浓缩液份数": "Partes de concentrado", "稀释液份数": "Partes de diluyente", "浓缩液定量（μL）": "Volumen de concentrado (μL)", "稀释液定量（μL）": "Volumen de diluyente (μL)", "配液量（mL）": "Volumen preparado (mL)", "转速": "Velocidad de giro", "流量 QMin，mL/min": "Caudal Qmin (mL/min)", "流量 QMax，mL/min": "Caudal Qmax (mL/min)", "试剂A 工作液路接口": "Puerto de trabajo del reactivo A", "试剂B 工作液路接口": "Puerto de trabajo del reactivo B", "试剂A 清洗液路接口": "Puerto de lavado del reactivo A", "试剂B 清洗液路接口": "Puerto de lavado del reactivo B", "试剂A 端耐压": "Presión nominal del puerto A", "试剂B 端耐压": "Presión nominal del puerto B", "尺寸/mm": "Dimensiones (mm)",
    "空载流量（单头）": "Caudal libre (un cabezal)", "最大正压": "Presión positiva máxima", "最大负压": "Vacío máximo", "接口": "Puerto",
  },
  fr: {
    "密封类型": "Type d’étanchéité", "连接结构": "Structure de raccordement", "鲁尔结构": "Configuration Luer",
    "检测方式": "Méthode de détection", "检测对象": "Objet détecté", "适配管外径": "Diamètre extérieur de tube compatible", "适配管材": "Matériaux de tube compatibles", "检测介质": "Milieu détecté", "可检测尺寸": "Taille minimale détectable", "通讯协议": "Protocole de communication", "输出方式": "Type de sortie", "工作电压": "Tension de service", "工作电流": "Courant de service", "响应时间": "Temps de réponse", "储存温度": "Température de stockage",
    "产品名称": "Nom du produit", "移液方式": "Méthode de pipetage", "标称量程": "Volume nominal", "驱动设计": "Conception de l’entraînement", "定量分辨率": "Résolution de dosage", "满量程步数": "Nombre de pas sur la course complète", "液面探测": "Détection du niveau de liquide", "尖端堵塞检测": "Détection d’obstruction de l’embout", "吸头有无检测": "Détection de présence d’embout", "自动脱吸头": "Éjection automatique de l’embout", "级联能力": "Capacité de mise en cascade", "运行噪音": "Bruit de fonctionnement", "运行环境": "Environnement de fonctionnement", "存储环境": "Environnement de stockage", "吸头适配": "Compatibilité des embouts",
    "切阀时间": "Temps de commutation de la vanne", "阀结构": "Structure de la vanne", "量程（玻璃注射器）": "Plage de volume (seringue en verre)", "液量精确度（额定行程）": "Exactitude volumétrique (course nominale)", "转阀耐压": "Pression nominale de la vanne rotative", "通讯类型": "Interface de communication", "安装尺寸（长×宽×高）": "Dimensions d’installation (L×l×H)",
    "稀释比": "Rapport de dilution", "浓缩液份数": "Parts de concentré", "稀释液份数": "Parts de diluant", "浓缩液定量（μL）": "Volume de concentré (μL)", "稀释液定量（μL）": "Volume de diluant (μL)", "配液量（mL）": "Volume préparé (mL)", "转速": "Vitesse de rotation", "流量 QMin，mL/min": "Débit Qmin (mL/min)", "流量 QMax，mL/min": "Débit Qmax (mL/min)", "试剂A 工作液路接口": "Port de service du réactif A", "试剂B 工作液路接口": "Port de service du réactif B", "试剂A 清洗液路接口": "Port de lavage du réactif A", "试剂B 清洗液路接口": "Port de lavage du réactif B", "试剂A 端耐压": "Pression nominale du port A", "试剂B 端耐压": "Pression nominale du port B", "尺寸/mm": "Dimensions (mm)",
    "空载流量（单头）": "Débit libre (une tête)", "最大正压": "Pression positive maximale", "最大负压": "Vide maximal", "接口": "Port",
  },
  ko: {
    "密封类型": "씰 유형", "连接结构": "연결 구조", "鲁尔结构": "루어 구성",
    "检测方式": "검출 방식", "检测对象": "검출 대상", "适配管外径": "호환 튜브 외경", "适配管材": "호환 튜브 재질", "检测介质": "검출 매체", "可检测尺寸": "최소 검출 크기", "通讯协议": "통신 프로토콜", "输出方式": "출력 방식", "工作电压": "사용 전압", "工作电流": "사용 전류", "响应时间": "응답 시간", "储存温度": "보관 온도",
    "产品名称": "제품명", "移液方式": "피펫팅 방식", "标称量程": "공칭 용량", "驱动设计": "구동 설계", "定量分辨率": "분주 분해능", "满量程步数": "전체 행정 스텝 수", "液面探测": "액면 감지", "尖端堵塞检测": "팁 막힘 감지", "吸头有无检测": "팁 장착 감지", "自动脱吸头": "자동 팁 배출", "级联能力": "캐스케이드 연결 대수", "运行噪音": "동작 소음", "运行环境": "사용 환경", "存储环境": "보관 환경", "吸头适配": "팁 호환성",
    "切阀时间": "밸브 전환 시간", "阀结构": "밸브 구조", "量程（玻璃注射器）": "용량 범위(유리 주사기)", "液量精确度（额定行程）": "용량 정확도(정격 행정)", "转阀耐压": "로터리 밸브 정격 압력", "通讯类型": "통신 인터페이스", "安装尺寸（长×宽×高）": "설치 치수(L×W×H)",
    "稀释比": "희석비", "浓缩液份数": "농축액 비율", "稀释液份数": "희석액 비율", "浓缩液定量（μL）": "농축액 용량(μL)", "稀释液定量（μL）": "희석액 용량(μL)", "配液量（mL）": "조제 용량(mL)", "转速": "회전 속도", "流量 QMin，mL/min": "유량 Qmin(mL/min)", "流量 QMax，mL/min": "유량 Qmax(mL/min)", "试剂A 工作液路接口": "시약 A 작동 유로 포트", "试剂B 工作液路接口": "시약 B 작동 유로 포트", "试剂A 清洗液路接口": "시약 A 세척 유로 포트", "试剂B 清洗液路接口": "시약 B 세척 유로 포트", "试剂A 端耐压": "시약 A 포트 정격 압력", "试剂B 端耐压": "시약 B 포트 정격 압력", "尺寸/mm": "치수(mm)",
    "空载流量（单头）": "무부하 유량(단일 헤드)", "最大正压": "최대 양압", "最大负压": "최대 진공압", "接口": "포트",
  },
  ru: {
    "密封类型": "Тип уплотнения", "连接结构": "Конструкция соединения", "鲁尔结构": "Конфигурация Люэра",
    "检测方式": "Метод обнаружения", "检测对象": "Объект обнаружения", "适配管外径": "Совместимый наружный диаметр трубки", "适配管材": "Совместимые материалы трубки", "检测介质": "Контролируемая среда", "可检测尺寸": "Минимальный обнаруживаемый размер", "通讯协议": "Протокол связи", "输出方式": "Тип выхода", "工作电压": "Рабочее напряжение", "工作电流": "Рабочий ток", "响应时间": "Время отклика", "储存温度": "Температура хранения",
    "产品名称": "Наименование продукта", "移液方式": "Метод пипетирования", "标称量程": "Номинальный объём", "驱动设计": "Конструкция привода", "定量分辨率": "Разрешение дозирования", "满量程步数": "Количество шагов полного хода", "液面探测": "Определение уровня жидкости", "尖端堵塞检测": "Контроль засорения наконечника", "吸头有无检测": "Контроль наличия наконечника", "自动脱吸头": "Автоматический сброс наконечника", "级联能力": "Каскадное подключение", "运行噪音": "Рабочий шум", "运行环境": "Условия эксплуатации", "存储环境": "Условия хранения", "吸头适配": "Совместимость с наконечниками",
    "切阀时间": "Время переключения клапана", "阀结构": "Конструкция клапана", "量程（玻璃注射器）": "Диапазон объёма (стеклянный шприц)", "液量精确度（额定行程）": "Точность объёма (номинальный ход)", "转阀耐压": "Номинальное давление поворотного клапана", "通讯类型": "Интерфейс связи", "安装尺寸（长×宽×高）": "Монтажные размеры (Д×Ш×В)",
    "稀释比": "Коэффициент разбавления", "浓缩液份数": "Доли концентрата", "稀释液份数": "Доли разбавителя", "浓缩液定量（μL）": "Объём концентрата (μL)", "稀释液定量（μL）": "Объём разбавителя (μL)", "配液量（mL）": "Приготовленный объём (mL)", "转速": "Частота вращения", "流量 QMin，mL/min": "Расход Qmin (mL/min)", "流量 QMax，mL/min": "Расход Qmax (mL/min)", "试剂A 工作液路接口": "Рабочий порт реагента A", "试剂B 工作液路接口": "Рабочий порт реагента B", "试剂A 清洗液路接口": "Промывочный порт реагента A", "试剂B 清洗液路接口": "Промывочный порт реагента B", "试剂A 端耐压": "Номинальное давление порта A", "试剂B 端耐压": "Номинальное давление порта B", "尺寸/mm": "Размеры (mm)",
    "空载流量（单头）": "Свободный расход (одна головка)", "最大正压": "Максимальное положительное давление", "最大负压": "Максимальное разрежение", "接口": "Порт",
  },
};

const SPECIAL_SOURCE_VALUE_COPY: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: {
    "气液混合隔膜泵": "Bomba de diafragma para gas y líquido", "气体、气液混合物": "Gas y mezcla gas-líquido", "G1/8（内螺纹）": "G1/8 (rosca hembra)",
    "标准模式 0.319μL/步；高分辨率模式 0.02μL/微步": "Modo estándar 0.319 μL/paso; modo de alta resolución 0.02 μL/micropaso", "标准模式 3143 步；高分辨率模式 48000 微步": "Modo estándar 3143 pasos; modo de alta resolución 48000 micropasos",
    "最多可级联 16 台泵": "Hasta 16 bombas en cascada", "<60 dBA，仅室内使用": "<60 dBA; solo para uso en interiores", "15°C to 40°C，20% to 95% RH at 40°C，无冷凝": "15 °C–40 °C; 20 %–95 % HR a 40 °C, sin condensación", "-20°C to 65°C，30% to 85% RH，无冷凝": "-20 °C–65 °C; 30 %–85 % HR, sin condensación", "支持主流一次性吸头及定制吸头适配，需根据客户设备结构确认": "Compatible con puntas desechables habituales y puntas personalizadas; debe confirmarse según la estructura del equipo",
  },
  fr: {
    "气液混合隔膜泵": "Pompe à membrane pour gaz et liquide", "气体、气液混合物": "Gaz et mélange gaz-liquide", "G1/8（内螺纹）": "G1/8 (filetage femelle)",
    "标准模式 0.319μL/步；高分辨率模式 0.02μL/微步": "Mode standard 0,319 μL/pas ; mode haute résolution 0,02 μL/micropas", "标准模式 3143 步；高分辨率模式 48000 微步": "Mode standard 3143 pas ; mode haute résolution 48000 micropas",
    "最多可级联 16 台泵": "Jusqu’à 16 pompes en cascade", "<60 dBA，仅室内使用": "<60 dBA ; utilisation en intérieur uniquement", "15°C to 40°C，20% to 95% RH at 40°C，无冷凝": "15 °C–40 °C ; 20 %–95 % HR à 40 °C, sans condensation", "-20°C to 65°C，30% to 85% RH，无冷凝": "-20 °C–65 °C ; 30 %–85 % HR, sans condensation", "支持主流一次性吸头及定制吸头适配，需根据客户设备结构确认": "Compatible avec les embouts jetables courants et les embouts personnalisés ; à confirmer selon la structure de l’équipement",
  },
  ko: {
    "气液混合隔膜泵": "기액 혼합 다이어프램 펌프", "气体、气液混合物": "가스 및 기액 혼합물", "G1/8（内螺纹）": "G1/8(암나사)",
    "标准模式 0.319μL/步；高分辨率模式 0.02μL/微步": "표준 모드 0.319 μL/스텝, 고분해능 모드 0.02 μL/마이크로스텝", "标准模式 3143 步；高分辨率模式 48000 微步": "표준 모드 3143스텝, 고분해능 모드 48000마이크로스텝",
    "最多可级联 16 台泵": "최대 16대 펌프 캐스케이드 연결", "<60 dBA，仅室内使用": "<60 dBA, 실내 전용", "15°C to 40°C，20% to 95% RH at 40°C，无冷凝": "15 °C–40 °C, 40 °C에서 RH 20%–95%, 비응축", "-20°C to 65°C，30% to 85% RH，无冷凝": "-20 °C–65 °C, RH 30%–85%, 비응축", "支持主流一次性吸头及定制吸头适配，需根据客户设备结构确认": "주요 일회용 팁 및 맞춤형 팁과 호환되며 장비 구조에 따라 확인이 필요합니다",
  },
  ru: {
    "气液混合隔膜泵": "Газожидкостный мембранный насос", "气体、气液混合物": "Газ и газожидкостная смесь", "G1/8（内螺纹）": "G1/8 (внутренняя резьба)",
    "标准模式 0.319μL/步；高分辨率模式 0.02μL/微步": "Стандартный режим 0,319 μL/шаг; режим высокого разрешения 0,02 μL/микрошаг", "标准模式 3143 步；高分辨率模式 48000 微步": "Стандартный режим 3143 шага; режим высокого разрешения 48000 микрошагов",
    "最多可级联 16 台泵": "Каскадное подключение до 16 насосов", "<60 dBA，仅室内使用": "<60 dBA; только для эксплуатации в помещении", "15°C to 40°C，20% to 95% RH at 40°C，无冷凝": "15 °C–40 °C; 20 %–95 % RH при 40 °C, без конденсации", "-20°C to 65°C，30% to 85% RH，无冷凝": "-20 °C–65 °C; 30 %–85 % RH, без конденсации", "支持主流一次性吸头及定制吸头适配，需根据客户设备结构确认": "Совместим с распространёнными одноразовыми и заказными наконечниками; требуется подтверждение с учётом конструкции прибора",
  },
};

const ADVANCED_VALUE_TERMS: Record<HardTubeTargetLocale, Record<string, string>> = {
  es: {
    "Air Bubble Detection Module": "Módulo de detección de burbujas de aire", "Non-contact infrared detection": "Detección infrarroja sin contacto", "Air bubbles / droplets / gas-liquid state": "Burbujas de aire / gotas / estado gas-líquido", "Liquid / Gas": "Líquido / gas", "Width": "Ancho", "UART/TTL digital signal, 0–5 V IO analog voltage, and IO digital alarm signal": "Señal digital UART/TTL, salida analógica IO de 0–5 V y señal digital de alarma IO", "Air-bubble detection": "Detección de burbujas", "liquid detection": "detección de líquido",
    "Diaphragm Type": "Tipo de membrana", "Two-Way": "Dos vías", "Luer Fitting": "Racor Luer", "Thread Seal": "Sellado por rosca", "Straight Type": "Tipo recto", "Diaphragm Pump": "Bomba de diafragma", "Gas / Gas-Liquid Mixture": "Gas / mezcla gas-líquido", "female thread": "rosca hembra", "Quick-Connect Fitting": "Racor de conexión rápida",
    "programmable gas-displacementPipetting Pump": "bomba de pipeteo programable por desplazamiento de aire", "programmable gas-displacement Pipetting Pump": "bomba de pipeteo programable por desplazamiento de aire", "gas-displacement": "desplazamiento de aire", "Four-Wire Bipolar Stepper Lead-Screw Motor": "Motor paso a paso bipolar de cuatro hilos con husillo", "High-Resolution Mode": "Modo de alta resolución", "Microstep Mode": "Modo de micropasos", "Standard Mode": "Modo estándar", "microsteps": "micropasos", "steps": "pasos", "supportspressure pLLD, cLLD, hLLD": "Compatible con pLLD por presión, cLLD capacitivo y hLLD híbrido", "supports TPBD Clog Detection": "Compatible con detección de obstrucción TPBD", "supports TPON / TPOFF": "Compatible con TPON / TPOFF", "supports ADTP": "Compatible con ADTP", "Non-Condensing": "Sin condensación", "channel": "canal",
    "HLD3 Rotary Valve Syringe Pump Series": "Serie HLD3 de bombas de jeringa con válvula rotativa", "Adjacent Ports": "Puertos adyacentes", "Planar Rotary Valve": "Válvula rotativa plana", "Cylindrical Rotary Valve": "Válvula rotativa cilíndrica", "3-way Nonn-Distribution Valve": "Válvula de 3 vías sin distribución", "3-way Distribution Valve": "Válvula distribuidora de 3 vías", "9-way Distribution Valve": "Válvula distribuidora de 9 vías", "and above": "y superiores", "and below": "e inferiores", "Cycles": "ciclos", "Max:": "Máx.:", "Max：": "Máx.:",
  },
  fr: {
    "Air Bubble Detection Module": "Module de détection de bulles d’air", "Non-contact infrared detection": "Détection infrarouge sans contact", "Air bubbles / droplets / gas-liquid state": "Bulles d’air / gouttelettes / état gaz-liquide", "Liquid / Gas": "Liquide / gaz", "Width": "Largeur", "UART/TTL digital signal, 0–5 V IO analog voltage, and IO digital alarm signal": "Signal numérique UART/TTL, sortie analogique IO 0–5 V et signal d’alarme numérique IO", "Air-bubble detection": "Détection de bulles", "liquid detection": "détection de liquide",
    "Diaphragm Type": "Type à membrane", "Two-Way": "Deux voies", "Luer Fitting": "Raccord Luer", "Thread Seal": "Étanchéité filetée", "Straight Type": "Type droit", "Diaphragm Pump": "Pompe à membrane", "Gas / Gas-Liquid Mixture": "Gaz / mélange gaz-liquide", "female thread": "filetage femelle", "Quick-Connect Fitting": "Raccord rapide",
    "programmable gas-displacementPipetting Pump": "pompe de pipetage programmable à déplacement d’air", "programmable gas-displacement Pipetting Pump": "pompe de pipetage programmable à déplacement d’air", "gas-displacement": "déplacement d’air", "Four-Wire Bipolar Stepper Lead-Screw Motor": "Moteur pas à pas bipolaire quatre fils à vis-mère", "High-Resolution Mode": "Mode haute résolution", "Microstep Mode": "Mode micropas", "Standard Mode": "Mode standard", "microsteps": "micropas", "steps": "pas", "supportspressure pLLD, cLLD, hLLD": "Compatible avec pLLD par pression, cLLD capacitif et hLLD hybride", "supports TPBD Clog Detection": "Compatible avec la détection d’obstruction TPBD", "supports TPON / TPOFF": "Compatible avec TPON / TPOFF", "supports ADTP": "Compatible avec ADTP", "Non-Condensing": "Sans condensation", "channel": "canal",
    "HLD3 Rotary Valve Syringe Pump Series": "Série HLD3 de pompes seringues à vanne rotative", "Adjacent Ports": "Ports adjacents", "Planar Rotary Valve": "Vanne rotative plane", "Cylindrical Rotary Valve": "Vanne rotative cylindrique", "3-way Nonn-Distribution Valve": "Vanne 3 voies non distributrice", "3-way Distribution Valve": "Vanne distributrice 3 voies", "9-way Distribution Valve": "Vanne distributrice 9 voies", "and above": "et plus", "and below": "et moins", "Cycles": "cycles", "Max:": "Max. :", "Max：": "Max. :",
  },
  ko: {
    "Air Bubble Detection Module": "기포 감지 모듈", "Non-contact infrared detection": "비접촉 적외선 감지", "Air bubbles / droplets / gas-liquid state": "기포 / 액적 / 기액 상태", "Liquid / Gas": "액체 / 가스", "Width": "폭", "UART/TTL digital signal, 0–5 V IO analog voltage, and IO digital alarm signal": "UART/TTL 디지털 신호, 0–5 V IO 아날로그 전압 및 IO 디지털 알람 신호", "Air-bubble detection": "기포 감지", "liquid detection": "액체 감지",
    "Diaphragm Type": "다이어프램형", "Two-Way": "2방향", "Luer Fitting": "루어 피팅", "Thread Seal": "나사 밀봉", "Straight Type": "직선형", "Diaphragm Pump": "다이어프램 펌프", "Gas / Gas-Liquid Mixture": "가스 / 기액 혼합물", "female thread": "암나사", "Quick-Connect Fitting": "퀵 커넥트 피팅",
    "programmable gas-displacementPipetting Pump": "프로그래머블 공기 치환식 피펫팅 펌프", "programmable gas-displacement Pipetting Pump": "프로그래머블 공기 치환식 피펫팅 펌프", "gas-displacement": "공기 치환식", "Four-Wire Bipolar Stepper Lead-Screw Motor": "4선 바이폴라 스테퍼 리드스크루 모터", "High-Resolution Mode": "고분해능 모드", "Microstep Mode": "마이크로스텝 모드", "Standard Mode": "표준 모드", "microsteps": "마이크로스텝", "steps": "스텝", "supportspressure pLLD, cLLD, hLLD": "압력식 pLLD, 정전용량식 cLLD 및 하이브리드 hLLD 지원", "supports TPBD Clog Detection": "TPBD 막힘 감지 지원", "supports TPON / TPOFF": "TPON / TPOFF 지원", "supports ADTP": "ADTP 지원", "Non-Condensing": "비응축", "channel": "채널",
    "HLD3 Rotary Valve Syringe Pump Series": "HLD3 로터리 밸브 주사기 펌프 시리즈", "Adjacent Ports": "인접 포트", "Planar Rotary Valve": "평면 로터리 밸브", "Cylindrical Rotary Valve": "원통형 로터리 밸브", "3-way Nonn-Distribution Valve": "3방향 비분배 밸브", "3-way Distribution Valve": "3방향 분배 밸브", "9-way Distribution Valve": "9방향 분배 밸브", "and above": "이상", "and below": "이하", "Cycles": "사이클", "Max:": "최대:", "Max：": "최대:",
  },
  ru: {
    "Air Bubble Detection Module": "Модуль обнаружения воздушных пузырьков", "Non-contact infrared detection": "Бесконтактное инфракрасное обнаружение", "Air bubbles / droplets / gas-liquid state": "Воздушные пузырьки / капли / газожидкостное состояние", "Liquid / Gas": "Жидкость / газ", "Width": "Ширина", "UART/TTL digital signal, 0–5 V IO analog voltage, and IO digital alarm signal": "Цифровой сигнал UART/TTL, аналоговый выход IO 0–5 V и цифровой аварийный сигнал IO", "Air-bubble detection": "Обнаружение пузырьков", "liquid detection": "обнаружение жидкости",
    "Diaphragm Type": "Мембранное исполнение", "Two-Way": "Двухходовое исполнение", "Luer Fitting": "Фитинг Люэра", "Thread Seal": "Резьбовое уплотнение", "Straight Type": "Прямое исполнение", "Diaphragm Pump": "Мембранный насос", "Gas / Gas-Liquid Mixture": "Газ / газожидкостная смесь", "female thread": "внутренняя резьба", "Quick-Connect Fitting": "Быстроразъёмное соединение",
    "programmable gas-displacementPipetting Pump": "программируемый пипетирующий насос с вытеснением воздуха", "programmable gas-displacement Pipetting Pump": "программируемый пипетирующий насос с вытеснением воздуха", "gas-displacement": "вытеснение воздуха", "Four-Wire Bipolar Stepper Lead-Screw Motor": "Четырёхпроводный биполярный шаговый двигатель с ходовым винтом", "High-Resolution Mode": "Режим высокого разрешения", "Microstep Mode": "Микрошаговый режим", "Standard Mode": "Стандартный режим", "microsteps": "микрошагов", "steps": "шагов", "supportspressure pLLD, cLLD, hLLD": "Поддержка pLLD по давлению, ёмкостного cLLD и гибридного hLLD", "supports TPBD Clog Detection": "Поддержка контроля засорения TPBD", "supports TPON / TPOFF": "Поддержка TPON / TPOFF", "supports ADTP": "Поддержка ADTP", "Non-Condensing": "Без конденсации", "Нетn-Condensing": "Без конденсации", "channel": "канал",
    "HLD3 Rotary Valve Syringe Pump Series": "Серия шприцевых насосов HLD3 с поворотным клапаном", "Adjacent Ports": "Соседние порты", "Planar Rotary Valve": "Плоский поворотный клапан", "Cylindrical Rotary Valve": "Цилиндрический поворотный клапан", "3-way Nonn-Distribution Valve": "Трёхходовой нераспределительный клапан", "3-way Distribution Valve": "Трёхходовой распределительный клапан", "9-way Distribution Valve": "Девятиходовой распределительный клапан", "and above": "и более", "and below": "и менее", "Cycles": "циклов", "Max:": "Макс.:", "Max：": "Макс.:",
  },
};

function localizeSourceValue(value: string, locale: HardTubeTargetLocale) {
  const special = SPECIAL_SOURCE_VALUE_COPY[locale][value];
  if (special) return special;
  const exact = SOURCE_VALUE_COPY[locale][value];
  if (exact) return exact;

  return Object.entries(SOURCE_VALUE_TERMS[locale])
    .concat(Object.entries(EXTRA_SOURCE_VALUE_TERMS[locale]))
    .sort(([a], [b]) => b.length - a.length)
    .reduce((text, [source, target]) => text.split(source).join(target), value);
}

function localizeAdvancedValue(value: unknown, locale: HardTubeTargetLocale): unknown {
  if (typeof value !== "string") return value;
  const localized = Object.entries(ADVANCED_VALUE_TERMS[locale])
    .sort(([a], [b]) => b.length - a.length)
    .reduce((text, [source, target]) => text.split(source).join(target), value)
    .replace(/\s+to\s+/gi, "–");
  const incrementLabel = locale === "es" ? "incrementos" : locale === "fr" ? "incréments" : locale === "ko" ? "증분" : "приращений";
  return localized.replace(/\bincrements\b/gi, incrementLabel);
}

function inferKind(data: DetailRecord, pathname = ""): ProductKind {
  const text = [pathname, data.detailHref, data.href, data.selectionHref, data.productTypeId, data.productTypeName, data.categoryLabel, data.slug, data.title, data.name].filter(Boolean).join(" ").toLowerCase();
  const rules: Array<[ProductKind, RegExp]> = [
    ["hard-tube-fitting", /hard[- ]tube|硬管/], ["bulkhead-barbed-fitting", /bulkhead[- ]barbed|穿板倒刺/], ["thread-to-barbed-fitting", /thread[- ]to[- ]barb|thread to barb|螺纹转倒刺/], ["quick-connect-fitting", /quick[- ]connect|快插|快速接头/], ["luer-fitting", /luer|鲁尔/], ["female-thread-adapter", /female[- ]thread|内螺纹/], ["barbed-fitting", /barbed[- ]fitting|barbed fitting|倒刺接头/], ["check-valve", /check[- ]valve|单向阀/], ["filter", /filter|过滤器/],
    ["plunger-pump", /plunger[- ]pump|柱塞泵/], ["diaphragm-pump", /diaphragm[- ]pump|隔膜泵/], ["pipetting-pump", /pipett|移液泵/], ["syringe-pump", /syringe[- ]pump|注射泵/], ["valveless-pump", /valveless|无阀/], ["tubing", /tubing|管路|软管/],
    ["high-pressure-valve", /high[- ]pressure[- ]valve|高压阀/], ["solenoid-valve", /solenoid[- ]valve|电磁阀/], ["rotary-valve", /rotary[- ]valve|旋转阀|转阀/], ["sampling-probe", /sampling[- ]probe|采样针/], ["piercing-probe", /piercing[- ]probe|穿刺针/], ["wash-probe", /wash[- ]probe|清洗针/], ["mixing-paddle", /mixing[- ]paddle|搅拌桨/], ["air-bubble-detector", /air[- ]bubble|气泡/], ["pressure-sensor", /pressure[- ]sensor|压力传感/],
  ];
  return rules.find(([, pattern]) => pattern.test(text))?.[0] || "product";
}

function inferCategory(kind: ProductKind) {
  if (kind.endsWith("pump")) return "pumps";
  if (["barbed-fitting", "bulkhead-barbed-fitting", "hard-tube-fitting", "thread-to-barbed-fitting", "quick-connect-fitting", "luer-fitting", "female-thread-adapter", "filter", "check-valve"].includes(kind)) return "fittings";
  if (kind === "tubing") return "tubing";
  if (kind.endsWith("valve")) return "valves";
  if (["sampling-probe", "piercing-probe", "wash-probe", "mixing-paddle"].includes(kind)) return "probes";
  return "control";
}

function localizeValue(value: unknown, locale: HardTubeTargetLocale): unknown {
  if (typeof value !== "string") return value;
  const exact = VALUE_COPY[locale][value.trim()];
  if (exact) return exact;
  return Object.entries(VALUE_COPY[locale]).sort(([a], [b]) => b.length - a.length).reduce((text, [source, target]) => text.split(source).join(target), value);
}

function buildDescription(locale: HardTubeTargetLocale, model: string, productName: string) {
  if (locale === "es") return `${model}: ${productName} FOREACH para sistemas de manipulación de fluidos de precisión. Consulte las especificaciones, los materiales, las conexiones y las condiciones de trabajo para confirmar su compatibilidad con el fluido, el caudal, la presión, la limpieza y el espacio de instalación.`;
  if (locale === "fr") return `${model} : ${productName} FOREACH pour les systèmes de gestion précise des fluides. Consultez les caractéristiques, les matériaux, les raccordements et les conditions de service afin de confirmer la compatibilité avec le fluide, le débit, la pression, le nettoyage et l’espace d’installation.`;
  if (locale === "ko") return `${model}은 정밀 유체 제어 시스템용 FOREACH ${productName}입니다. 유체, 유량, 압력, 세척 방식 및 설치 공간과의 적합성을 확인하려면 사양, 재질, 연결 방식과 사용 조건을 검토하십시오.`;
  return `${model} — ${productName} FOREACH для прецизионных жидкостных систем. Для подтверждения совместимости с рабочей жидкостью, расходом, давлением, способом очистки и монтажным пространством проверьте характеристики, материалы, соединения и условия эксплуатации.`;
}

function buildApplications(locale: HardTubeTargetLocale, category: string) {
  const copy: Record<HardTubeTargetLocale, Record<string, string[]>> = {
    es: { pumps: ["Dosificación precisa de reactivos", "Manipulación automatizada de líquidos", "Instrumentos IVD y de análisis"], fittings: ["Conexión de circuitos fluídicos", "Instrumentos IVD y de laboratorio", "Equipos analíticos automatizados"], tubing: ["Transferencia de reactivos y muestras", "Circuitos de lavado y residuos", "Sistemas fluídicos de laboratorio"], valves: ["Conmutación y distribución de fluidos", "Selección multicanal de reactivos", "Automatización de instrumentos analíticos"], probes: ["Muestreo y dosificación", "Lavado y perforación de consumibles", "Automatización IVD"], control: ["Supervisión del circuito fluídico", "Protección de instrumentos automatizados", "Control de procesos líquidos"] },
    fr: { pumps: ["Dosage précis de réactifs", "Gestion automatisée des liquides", "Instruments IVD et analytiques"], fittings: ["Raccordement de circuits fluidiques", "Instruments IVD et de laboratoire", "Équipements analytiques automatisés"], tubing: ["Transfert de réactifs et d’échantillons", "Circuits de lavage et de déchets", "Systèmes fluidiques de laboratoire"], valves: ["Commutation et distribution des fluides", "Sélection multicanal de réactifs", "Automatisation d’instruments analytiques"], probes: ["Prélèvement et dosage", "Lavage et perçage de consommables", "Automatisation IVD"], control: ["Surveillance du circuit fluidique", "Protection des instruments automatisés", "Contrôle des procédés liquides"] },
    ko: { pumps: ["정밀 시약 분주", "자동화 액체 처리", "IVD 및 분석 장비"], fittings: ["유체 회로 연결", "IVD 및 실험실 장비", "자동화 분석 장비"], tubing: ["시약 및 샘플 이송", "세척 및 폐액 회로", "실험실 유체 시스템"], valves: ["유체 전환 및 분배", "다채널 시약 선택", "분석 장비 자동화"], probes: ["샘플링 및 분주", "소모품 세척 및 천공", "IVD 자동화"], control: ["유체 회로 모니터링", "자동화 장비 보호", "액체 공정 제어"] },
    ru: { pumps: ["Точное дозирование реагентов", "Автоматизированная работа с жидкостями", "IVD- и аналитические приборы"], fittings: ["Соединение жидкостных контуров", "IVD- и лабораторные приборы", "Автоматизированное аналитическое оборудование"], tubing: ["Перенос реагентов и образцов", "Промывочные и сливные контуры", "Лабораторные жидкостные системы"], valves: ["Переключение и распределение потоков", "Многоканальный выбор реагентов", "Автоматизация аналитических приборов"], probes: ["Отбор и дозирование проб", "Промывка и прокалывание расходных материалов", "Автоматизация IVD"], control: ["Контроль жидкостного контура", "Защита автоматизированных приборов", "Управление жидкостными процессами"] },
  };
  return copy[locale][category] || copy[locale].control;
}

function buildFaqs(locale: HardTubeTargetLocale, model: string, productName: string) {
  if (locale === "es") return [
    { question: `¿Cómo se selecciona la configuración de ${model}?`, answer: `Confirme el fluido, el rango de trabajo, los materiales en contacto, las conexiones, el método de control y el espacio de instalación. FOREACH verificará la configuración del ${productName}.` },
    { question: `¿Cómo se comprueba la compatibilidad química de ${model}?`, answer: "Evalúe el fluido, su concentración, la temperatura, el tiempo de contacto y el método de limpieza frente a todos los materiales en contacto." },
    { question: `¿Se puede personalizar ${model}?`, answer: "Las opciones dependen del modelo. Indique la cantidad, las interfaces, los materiales, el montaje y los requisitos de rendimiento para una evaluación técnica." },
  ];
  if (locale === "fr") return [
    { question: `Comment sélectionner la configuration de ${model} ?`, answer: `Confirmez le fluide, la plage de fonctionnement, les matériaux en contact, les raccordements, la commande et l’espace d’installation. FOREACH vérifiera la configuration du ${productName}.` },
    { question: `Comment vérifier la compatibilité chimique de ${model} ?`, answer: "Évaluez le fluide, sa concentration, la température, la durée de contact et la méthode de nettoyage pour tous les matériaux en contact." },
    { question: `${model} peut-il être personnalisé ?`, answer: "Les options dépendent du modèle. Indiquez la quantité, les interfaces, les matériaux, le montage et les performances attendues pour une étude technique." },
  ];
  if (locale === "ko") return [
    { question: `${model}의 구성은 어떻게 선정합니까?`, answer: `유체, 사용 범위, 접액부 재질, 연결 방식, 제어 방식 및 설치 공간을 확인하면 FOREACH가 ${productName} 구성을 검토합니다.` },
    { question: `${model}의 내화학성은 어떻게 확인합니까?`, answer: "유체 종류, 농도, 온도, 접촉 시간 및 세척 방법을 모든 접액부 재질과 함께 검토하십시오." },
    { question: `${model}을 맞춤 제작할 수 있습니까?`, answer: "맞춤 옵션은 모델에 따라 다릅니다. 수량, 인터페이스, 재질, 장착 방식과 성능 요구 사항을 알려주시면 기술 검토를 진행합니다." },
  ];
  return [
    { question: `Как выбрать конфигурацию ${model}?`, answer: `Укажите рабочую жидкость, диапазон параметров, контактирующие материалы, соединения, способ управления и монтажное пространство. FOREACH проверит конфигурацию изделия «${productName}».` },
    { question: `Как проверить химическую совместимость ${model}?`, answer: "Оцените рабочую жидкость, её концентрацию, температуру, время контакта и способ очистки для всех материалов, контактирующих с жидкостью." },
    { question: `Можно ли изготовить ${model} по индивидуальным требованиям?`, answer: "Возможности зависят от модели. Для технической оценки сообщите количество, требования к интерфейсам, материалам, монтажу и рабочим характеристикам." },
  ];
}

function localizePath(value: unknown, locale: HardTubeTargetLocale, fallback: string) {
  const path = String(value || fallback || "");
  if (!path.startsWith("/")) return path;
  return `/${locale}${path.replace(/^\/(?:en|es|fr|ko|ru)(?=\/|$)/, "")}`;
}

/* ===== FOREACH TARGET PRODUCT DETAIL TITLE OVERRIDES START ===== */

/*
 * 非中英文产品详情页完整标题覆盖。
 *
 * 说明：
 * 1. 这里保存的是详情页 H1 和面包屑标题；
 * 2. 不用于型号选择区域；
 * 3. 型号区域仍然使用 foreachModel / productCode；
 * 4. 后续其他产品需要特殊标题时，可继续在对应语言中增加。
 */
const TARGET_PRODUCT_DETAIL_TITLE_OVERRIDES: Record<
  HardTubeTargetLocale,
  Record<string, string>
> = {
  es: {
    "rpl-p4":
      "RPL-P4 12–80 μL/rev Bomba de pistón sin válvulas de bajo volumen",
  },
  fr: {
    "rpl-p4":
      "RPL-P4 12–80 μL/rev Pompe à piston sans clapet à faible volume",
  },
  ko: {
    "rpl-p4":
      "RPL-P4 12–80 μL/rev 저용량 무밸브 피스톤 펌프",
  },
  ru: {
    "rpl-p4":
      "RPL-P4 12–80 μL/rev Бесклапанный поршневой насос для малых объёмов",
  },
};

/*
 * 从产品详情数据中识别产品。
 * 优先读取 slug 和产品编码，避免依赖已经翻译过的标题。
 */
function getTargetProductDetailTitleKey(data: any): string {
  const candidates = [
    data?.slug,
    data?.productId,
    data?.productCode,
    data?.foreachModel,
    data?.seriesId,
    data?.seriesSlug,
    data?.model,
  ];

  const normalized = candidates
    .map((value) =>
      String(value || "")
        .trim()
        .toLowerCase()
    )
    .filter(Boolean)
    .join(" ");

  if (normalized.includes("rpl-p4")) {
    return "rpl-p4";
  }

  return "";
}

/*
 * 返回目标语言详情页的显示标题。
 *
 * fallback 通常是当前 data.model：
 * - 有专用标题时，返回本地化完整标题；
 * - 没有专用标题时，保持原来的标题。
 */
export function getTargetProductDetailDisplayTitle(
  data: any,
  locale: HardTubeTargetLocale | null | undefined,
  fallback = ""
): string {
  const fallbackTitle = String(
    fallback ||
      data?.title ||
      data?.name ||
      data?.model ||
      data?.foreachModel ||
      data?.productCode ||
      ""
  ).trim();

  if (!locale || !isHardTubeTargetLocale(locale)) {
    return fallbackTitle;
  }

  const productKey =
    getTargetProductDetailTitleKey(data);

  if (!productKey) {
    return fallbackTitle;
  }

  return (
    TARGET_PRODUCT_DETAIL_TITLE_OVERRIDES[locale]?.[
      productKey
    ] || fallbackTitle
  );
}

/* ===== FOREACH TARGET PRODUCT DETAIL TITLE OVERRIDES END ===== */

export function localizeTargetProductDetailData<T extends DetailRecord>(sourceData: T, locale: HardTubeTargetLocale, pathname = ""): T {
  const kind = inferKind(sourceData, pathname);
  if (kind === "hard-tube-fitting") {
    const specialized = localizeHardTubeFittingDetailData(sourceData, locale) as DetailRecord;
    if (pathname) specialized.detailHref = specialized.href = pathname;
    return specialized as T;
  }

  const english = localizeProductDetailData(sourceData) as DetailRecord;
  const genericProductName = PRODUCT_NAMES[locale][kind];
  const category = inferCategory(kind);
  const pathnameSlug = String(pathname).split("/").filter(Boolean).at(-1) || "";
  const cleanDisplayModel = [sourceData.displayModel, sourceData.modelDisplay, sourceData.foreachModel, sourceData.model, sourceData.productCode]
    .map((value) => String(value || "").trim())
    .find((value) => value && !/[\u3400-\u9fff]/.test(value) && /[A-Za-z]/.test(value));
  const tubingMaterial = kind === "tubing" ? pathnameSlug.split("-")[0]?.toUpperCase() : "";
  const tubingTitle = tubingMaterial ? (locale === "es" ? `Tubo de ${tubingMaterial}` : locale === "fr" ? `Tube en ${tubingMaterial}` : locale === "ko" ? `${tubingMaterial} 튜브` : `Трубка из ${tubingMaterial}`) : "";
  const cleanedPathnameSlug = pathnameSlug
    .replace(/-(?:liquid|gas|gas-liquid|air-liquid)-diaphragm-pump$/i, "")
    .replace(/-(?:rotary-valve|solenoid)-syringe-pump$/i, "")
    .replace(/-(?:air-bubble-detector|pressure-sensor)$/i, "");
  const modelFromPath = (/\d/.test(cleanedPathnameSlug) || cleanedPathnameSlug !== pathnameSlug)
    ? cleanedPathnameSlug.toUpperCase().replace(/-EP-PS$/, "-EP/PS")
    : "";
  const rawModel = String(tubingTitle || cleanDisplayModel || modelFromPath || sourceData.slug || genericProductName).replace(/[.。]+$/, "").trim();
  const model = rawModel.replace(/\s+(Plunger|Diaphragm|Pipetting|Syringe|Valveless|Rotary|Solenoid|High-Pressure).*$/i, "").trim() || rawModel;
  const valvelessSeries = /^DRPL(?:-|$)/i.test(model) ? "DRPL" : "RPL";
  const productName =
    kind === "valveless-pump"
      ? VALVELESS_PRODUCT_NAMES[locale][valvelessSeries]
      : genericProductName;
  const englishSpecs = Array.isArray(english.specs) ? english.specs : Array.isArray(english.specifications) ? english.specifications : [];
  const sourceSpecs = Array.isArray(sourceData.specs) ? sourceData.specs : Array.isArray(sourceData.specifications) ? sourceData.specifications : [];
  const plungerSpecKeys = ["标称容量", "当前展示泵头材质", "泵头材质可选范围", "柱塞材质可选范围", "液路接口", "行程", "推荐最高转速", "电机步距角", "导程", "满量程步数", "100%量程准确性", "100%量程重复性", "2%量程准确性", "2%量程重复性", "背隙", "设计寿命", "最大流体压力"];
  const specs = englishSpecs.map((item: DetailRecord, index: number) => {
    const sourceItem = sourceSpecs[index] || {};
    const sourceLabel = String(sourceItem.label || "");
    const localizedSourceLabel = SOURCE_SPEC_LABELS[locale][sourceLabel] || COMMON_SOURCE_SPEC_LABELS[locale][sourceLabel] || EXTRA_SOURCE_SPEC_LABELS[locale][sourceLabel] || TUBING_SOURCE_SPEC_LABELS[locale][sourceLabel] || ADVANCED_SOURCE_SPEC_LABELS[locale][sourceLabel] || (kind === "plunger-pump" ? SOURCE_SPEC_LABELS[locale][plungerSpecKeys[index]] : undefined);
    const sourceValue = String(sourceItem.value ?? "");
    const localizedSourceValue = localizeSourceValue(sourceValue, locale);

    return {
      ...item,
      label: localizedSourceLabel || SPEC_LABELS[locale][String(item.label || "")] || (locale === "es" ? "Especificación" : locale === "fr" ? "Caractéristique" : locale === "ko" ? "사양" : "Характеристика"),
      value: localizeAdvancedValue(
        localizedSourceLabel && !/[\u3400-\u9fff]/.test(localizedSourceValue) && /[\p{L}\p{N}]/u.test(localizedSourceValue)
          ? localizedSourceValue
          : localizeValue(item.value, locale),
        locale,
      ),
    };
  });
  const description = buildDescription(locale, model, productName);
  const detailHref = pathname || localizePath(english.detailHref || english.href, locale, "");
  const ctaTitle = locale === "es" ? `Confirme la configuración de ${model}` : locale === "fr" ? `Confirmez la configuration de ${model}` : locale === "ko" ? `${model} 구성 확인` : `Подтвердите конфигурацию ${model}`;
  const ctaDescription = locale === "es" ? "Comparta el fluido, el rango de trabajo, los materiales, las conexiones, el método de control, la cantidad y los requisitos de instalación. El equipo de ingeniería de FOREACH le ayudará a confirmar una configuración adecuada." : locale === "fr" ? "Indiquez le fluide, la plage de fonctionnement, les matériaux, les raccordements, la commande, la quantité et les contraintes d’installation. L’équipe d’ingénierie FOREACH vous aidera à valider une configuration adaptée." : locale === "ko" ? "유체, 사용 범위, 재질, 연결 방식, 제어 방식, 수량 및 설치 요구 사항을 알려주시면 FOREACH 엔지니어링 팀이 적합한 구성을 확인해 드립니다." : "Сообщите рабочую жидкость, диапазон параметров, материалы, соединения, способ управления, количество и требования к монтажу. Инженеры FOREACH помогут подтвердить подходящую конфигурацию.";
  const ctaButton = locale === "es" ? "Contactar con un ingeniero" : locale === "fr" ? "Contacter un ingénieur" : locale === "ko" ? "엔지니어에게 문의" : "Связаться с инженером";

  const localized = {
    ...english,
    __locale: locale,
    model,
    displayModel: model,
    modelDisplay: model,
    foreachModel: model,
    h1Title: model,
    pageTitle: model,
    title: model,
    name: productName,
    productTypeName: productName,
    categoryLabel: CATEGORY_NAMES[locale][category],
    description,
    advantages: specs.slice(0, 4).map((item: DetailRecord) => `${item.label}: ${item.value}`),
    commonApplications: buildApplications(locale, category),
    specs,
    specifications: specs,
    faqs: buildFaqs(locale, model, productName),
    faq: buildFaqs(locale, model, productName),
    detailHref,
    href: detailHref,
    selectionHref: localizePath(english.selectionHref, locale, "/products"),
    imageAlt: `${model} ${productName}`,
    mainImageAlt: `${model} ${productName}`,
    bottomCtaTitle: ctaTitle,
    bottomCtaDescription: ctaDescription,
    bottomCtaDesc: ctaDescription,
    bottomCtaButtonText: ctaButton,
    bottomCtaButton: ctaButton,
    bottomCtaHref: `/${locale}/contact`,
    customInquiryTitle: ctaTitle,
    customInquiryDescription: ctaDescription,
    customInquiryButtonText: ctaButton,
    customInquiryHref: `/${locale}/contact`,
    seo: { ...(english.seo || {}), title: `${model} ${productName} | FOREACH`, description },
  } as unknown as T;

  if (
    kind === "sampling-probe" ||
    kind === "piercing-probe" ||
    kind === "wash-probe" ||
    kind === "mixing-paddle"
  ) {
    return localizeProbeDetailData(
      sourceData,
      localized,
      locale,
      pathname,
    );
  }

  return localized;
}

export function getTargetProductMetadataCopy(segments: string[], locale: HardTubeTargetLocale) {
  const pathText = segments.join("/");
  const kind = inferKind({ detailHref: pathText }, pathText);
  const productName = PRODUCT_NAMES[locale][kind];
  const selectionSlugs = new Set([
    "plunger-pumps", "diaphragm-pumps", "pipetting-pumps", "syringe-pumps", "valveless-pumps",
    "hard-tube-fittings", "barbed-fittings", "thread-to-barbed-fittings", "luer-fittings", "quick-connect-fittings", "female-thread-adapters", "bulkhead-barbed-fittings", "filters", "check-valves",
    "high-pressure-valves", "rotary-valves", "solenoid-valves", "piercing-probes", "sampling-probes", "stirring-paddles", "wash-probes",
  ]);
  const isSelectionRoute = segments.length === 1 || (segments.length === 2 && selectionSlugs.has(String(segments.at(-1))));
  if (isSelectionRoute) {
    const categoryKey = segments[0] === "control" ? "control" : segments[0];
    const selectionName = segments.length === 1 ? (CATEGORY_NAMES[locale][categoryKey] || productName) : productName;
    const description = locale === "es"
      ? `Explore la gama FOREACH de ${selectionName}, compare configuraciones, materiales, interfaces y especificaciones para sistemas de manipulación de fluidos de precisión.`
      : locale === "fr"
        ? `Découvrez la gamme FOREACH de ${selectionName} et comparez les configurations, matériaux, raccordements et caractéristiques pour les systèmes de gestion précise des fluides.`
        : locale === "ko"
          ? `FOREACH ${selectionName} 제품군의 구성, 재질, 인터페이스 및 사양을 비교하여 정밀 유체 제어 시스템에 적합한 제품을 선정하십시오.`
          : `Изучите линейку FOREACH «${selectionName}» и сравните конфигурации, материалы, соединения и характеристики для прецизионных жидкостных систем.`;
    return { title: `${selectionName} | FOREACH`, description, keywords: [selectionName, CATEGORY_NAMES[locale][inferCategory(kind)] || selectionName, "FOREACH"] };
  }
  const slug = String(segments.at(-1) || "FOREACH");
  const tubingMaterial = kind === "tubing" ? slug.replace(/-tubing$/i, "").toUpperCase() : "";
  const tubingTitle = tubingMaterial
    ? (locale === "es" ? `Tubo de ${tubingMaterial}` : locale === "fr" ? `Tube en ${tubingMaterial}` : locale === "ko" ? `${tubingMaterial} 튜브` : `Трубка из ${tubingMaterial}`)
    : "";
  const model = tubingTitle || slug
    .replace(/-(?:liquid|gas|gas-liquid|air-liquid)-diaphragm-pump$/i, "")
    .replace(/-(?:rotary-valve|solenoid)-syringe-pump$/i, "")
    .replace(/-(?:plunger|pipetting|syringe|valveless-piston|rotary|solenoid|high-pressure)-(?:pump|valve)$/i, "")
    .replace(/-(?:air-bubble-detector|pressure-sensor)$/i, "")
    .toUpperCase()
    .replace(/-EP-PS$/, "-EP/PS");
  const description = buildDescription(locale, model, productName);
  return { title: `${model} ${productName} | FOREACH`, description, keywords: [model, productName, CATEGORY_NAMES[locale][inferCategory(kind)], "FOREACH"] };
}

export { isHardTubeTargetLocale };
