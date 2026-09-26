import source from "@/data/products/generated/pumps/pipetting-pumps/detail/index.json";

// Exact source-value translations, never substring replacement. Numeric-only values stay intact.
const locales = ["en", "es", "fr", "ko", "ru"];
const labels: Record<string, string[]> = {
  "产品名称": ["Product name", "Nombre del producto", "Nom du produit", "제품명", "Название изделия"],
  "型号": ["Model", "Modelo", "Modèle", "모델", "Модель"],
  "产品系列": ["Product series", "Serie", "Série", "제품 시리즈", "Серия"],
  "移液方式": ["Pipetting method", "Método de pipeteo", "Méthode de pipetage", "피펫팅 방식", "Метод пипетирования"],
  "标称量程": ["Nominal capacity", "Capacidad nominal", "Capacité nominale", "공칭 용량", "Номинальный объём"],
  "驱动设计": ["Drive design", "Diseño del accionamiento", "Conception de l’entraînement", "구동 설계", "Конструкция привода"],
  "定量分辨率": ["Volumetric resolution", "Resolución volumétrica", "Résolution volumétrique", "체적 분해능", "Объёмное разрешение"],
  "满量程步数": ["Full-stroke step count", "Pasos de carrera completa", "Nombre de pas sur la course complète", "전체 스트로크 스텝 수", "Число шагов полного хода"],
  "液面探测": ["Liquid-level detection", "Detección de nivel de líquido", "Détection du niveau de liquide", "액면 감지", "Обнаружение уровня жидкости"],
  "尖端堵塞检测": ["Tip blockage detection", "Detección de obstrucción de la punta", "Détection d’obstruction de l’embout", "팁 막힘 감지", "Обнаружение закупорки наконечника"],
  "吸头有无检测": ["Tip presence detection", "Detección de presencia de punta", "Détection de présence d’embout", "팁 유무 감지", "Обнаружение наличия наконечника"],
  "自动脱吸头": ["Automatic tip ejection", "Expulsión automática de puntas", "Éjection automatique des embouts", "자동 팁 배출", "Автоматический сброс наконечника"],
  "通讯接口": ["Communication interfaces", "Interfaces de comunicación", "Interfaces de communication", "통신 인터페이스", "Интерфейсы связи"],
  "级联能力": ["Cascading capacity", "Capacidad de conexión en cascada", "Capacité de connexion en cascade", "캐스케이드 연결 수", "Количество насосов в каскаде"],
  "运行噪音": ["Operating noise", "Ruido de funcionamiento", "Bruit de fonctionnement", "작동 소음", "Рабочий шум"],
  "运行环境": ["Operating environment", "Entorno de funcionamiento", "Conditions de fonctionnement", "작동 환경", "Условия эксплуатации"],
  "存储环境": ["Storage environment", "Entorno de almacenamiento", "Conditions de stockage", "보관 환경", "Условия хранения"],
  "介质温度": ["Fluid temperature", "Temperatura del fluido", "Température du fluide", "유체 온도", "Температура жидкости"],
  "电源要求": ["Power requirements", "Alimentación eléctrica", "Alimentation électrique", "전원 요구사항", "Электропитание"],
  "吸头适配": ["Tip compatibility", "Compatibilidad de puntas", "Compatibilité des embouts", "팁 호환성", "Совместимость наконечников"],
  "电机转速": ["Motor pulse rate", "Frecuencia de impulsos del motor", "Fréquence d’impulsions moteur", "모터 펄스 주파수", "Частота импульсов двигателя"],
  "适配吸头": ["Tip configuration", "Configuración de puntas", "Configuration des embouts", "팁 구성", "Конфигурация наконечников"],
  "装吸头所需力": ["Tip loading force", "Fuerza de carga de la punta", "Force de chargement de l’embout", "팁 장착력", "Усилие установки наконечника"],
  "脱 TIP 头步数": ["Tip ejection step count", "Pasos para expulsar la punta", "Nombre de pas d’éjection de l’embout", "팁 배출 스텝 수", "Число шагов сброса наконечника"],
  "退 TIP 头推力": ["Tip ejection motor thrust", "Empuje del motor de expulsión", "Poussée du moteur d’éjection", "팁 배출 모터 추력", "Усилие двигателя сброса наконечника"],
  "总体尺寸": ["Overall dimensions", "Dimensiones totales", "Dimensions hors tout", "전체 치수", "Габаритные размеры"],
  "重量": ["Weight", "Peso", "Masse", "무게", "Масса"],
};
const values: Record<string, string[]> = {
  "气体置换式": ["Air displacement", "Desplazamiento de aire", "Déplacement d’air", "공기 치환식", "Воздушное вытеснение"],
  "四线双极步进丝杆电机": ["Four-wire bipolar stepper motor with lead screw", "Motor paso a paso bipolar de cuatro hilos con husillo", "Moteur pas à pas bipolaire à quatre fils avec vis", "4선 바이폴라 리드 스크루 스테퍼 모터", "Четырёхпроводный биполярный шаговый двигатель с ходовым винтом"],
  "标准模式 0.319μL/步；高分辨率模式 0.02μL/微步": ["Standard mode: 0.319 μL/step; high-resolution mode: 0.02 μL/microstep", "Modo estándar: 0.319 μL/paso; alta resolución: 0.02 μL/micropaso", "Mode standard : 0.319 μL/pas ; haute résolution : 0.02 μL/micropas", "표준 모드: 0.319 μL/스텝; 고분해능 모드: 0.02 μL/마이크로스텝", "Стандартный режим: 0.319 мкл/шаг; высокое разрешение: 0.02 мкл/микрошаг"],
  "标准模式 3143 步；高分辨率模式 48000 微步": ["Standard mode: 3143 steps; high-resolution mode: 48000 microsteps", "Modo estándar: 3143 pasos; alta resolución: 48000 micropasos", "Mode standard : 3143 pas ; haute résolution : 48000 micropas", "표준 모드: 3143 스텝; 고분해능 모드: 48000 마이크로스텝", "Стандартный режим: 3143 шага; высокое разрешение: 48000 микрошагов"],
  "支持压力型 pLLD、电容型 cLLD、混合型 hLLD": ["Pressure-based pLLD, capacitive cLLD and hybrid hLLD", "pLLD por presión, cLLD capacitiva y hLLD híbrida", "pLLD par pression, cLLD capacitive et hLLD hybride", "압력식 pLLD, 정전용량식 cLLD 및 하이브리드 hLLD", "pLLD по давлению, ёмкостное cLLD и гибридное hLLD"],
  "支持 TPBD 尖端堵塞检测": ["Supported (TPBD)", "Compatible (TPBD)", "Prise en charge (TPBD)", "지원 (TPBD)", "Поддерживается (TPBD)"],
  "支持 TPON / TPOFF 吸头有无检测": ["Supported (TPON / TPOFF)", "Compatible (TPON / TPOFF)", "Prise en charge (TPON / TPOFF)", "지원 (TPON / TPOFF)", "Поддерживается (TPON / TPOFF)"],
  "支持 ADTP 自动脱吸头": ["Supported (ADTP)", "Compatible (ADTP)", "Prise en charge (ADTP)", "지원 (ADTP)", "Поддерживается (ADTP)"],
  "最多可级联 16 台泵": ["Up to 16 pumps", "Hasta 16 bombas", "Jusqu’à 16 pompes", "최대 16대", "До 16 насосов"],
  "<60 dBA，仅室内使用": ["<60 dBA; indoor use only", "<60 dBA; solo para interiores", "<60 dBA ; utilisation en intérieur uniquement", "<60 dBA; 실내 전용", "<60 dBA; только внутри помещений"],
  "15°C to 40°C，20% to 95% RH at 40°C，无冷凝": ["15°C to 40°C; 20% to 95% RH at 40°C; non-condensing", "15°C a 40°C; 20% a 95% HR a 40°C; sin condensación", "15°C à 40°C ; 20% à 95% HR à 40°C ; sans condensation", "15°C~40°C; 40°C에서 상대습도 20%~95%; 결로 없음", "15°C–40°C; 20%–95% отн. влажности при 40°C; без конденсации"],
  "-20°C to 65°C，30% to 85% RH，无冷凝": ["-20°C to 65°C; 30% to 85% RH; non-condensing", "-20°C a 65°C; 30% a 85% HR; sin condensación", "-20°C à 65°C ; 30% à 85% HR ; sans condensation", "-20°C~65°C; 상대습도 30%~85%; 결로 없음", "-20°C–65°C; 30%–85% отн. влажности; без конденсации"],
  "15°C to 40°C": ["15°C to 40°C", "15°C a 40°C", "15°C à 40°C", "15°C~40°C", "15°C–40°C"],
  "支持主流一次性吸头及定制吸头适配，需根据客户设备结构确认": ["Disposable and custom tips can be adapted; compatibility must be confirmed for the instrument geometry", "Adaptación de puntas desechables y personalizadas; confirmar la compatibilidad con la geometría del equipo", "Adaptation d’embouts jetables et personnalisés ; compatibilité à confirmer selon la géométrie de l’instrument", "일회용 및 맞춤형 팁 적용 가능; 장비 구조에 따른 호환성 확인 필요", "Возможна адаптация одноразовых и специальных наконечников; совместимость подтверждается с учётом конструкции прибора"],
  "根据客户需求定制": ["Customized to application requirements", "Personalizada según los requisitos de la aplicación", "Personnalisée selon les besoins de l’application", "응용 요구사항에 따른 맞춤 구성", "По требованиям применения"],
  "转速 5 r/s 时退枪头电机推力大于 120 N": [">120 N at 5 r/s", ">120 N a 5 r/s", ">120 N à 5 r/s", "5 r/s에서 >120 N", ">120 N при 5 об/с"],
};
const pumpNames = ["air-displacement pipetting pump", "bomba de pipeteo por desplazamiento de aire", "pompe de pipetage à déplacement d’air", "공기 치환식 피펫팅 펌프", "пипетирующий насос с воздушным вытеснением"];
const programmable = ["programmable", "programable", "programmable", "프로그래머블", "программируемый"];

export function getPipettingSpecs(locale: string, slug: string) {
  const language = locales.indexOf(locale);
  const product = source.find(product => product.slug === slug);
  if (language < 0 || !product) return undefined;
  const smtp2 = slug.startsWith("smtp2");
  const series = smtp2 ? "SMTP2" : "SMTP4";
  const capacity = product.specs.find(spec => spec.label === "标称量程")!.value.replace("μL", " μL");
  const pumpName = smtp2 && (locale === "es" || locale === "fr")
    ? pumpNames[language].replace(locale === "es" ? "bomba de pipeteo" : "pompe de pipetage", locale === "es" ? "bomba de pipeteo programable" : "pompe de pipetage programmable")
    : `${smtp2 ? programmable[language] + " " : ""}${pumpNames[language]}`;
  return product.specs.map(spec => {
    const label = labels[spec.label]?.[language];
    if (!label) throw new Error(`Missing pipetting spec label: ${locale}/${spec.label}`);
    let value = values[spec.value]?.[language];
    if (spec.label === "产品名称") value = `${series} ${capacity} ${pumpName}`;
    if (spec.label === "产品系列") value = `${series} ${pumpName}`;
    if (!value && /(?:μL\/步|^\d+ 步$)/.test(spec.value)) {
      const step = ["step", "paso", "pas", "스텝", "шаг"][language];
      value = spec.value.replace("μL/步", ` μL/${step}`).replace(" 步", ` ${["steps", "pasos", "pas", "스텝", "шагов"][language]}`);
    }
    if (!value) {
      if (/[\u3400-\u9fff]/.test(spec.value)) throw new Error(`Missing pipetting spec value: ${locale}/${spec.value}`);
      value = spec.value;
    }
    return { ...spec, label, name: label, title: label, value, content: value };
  });
}
