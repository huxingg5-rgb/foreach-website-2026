/* =========================================================
   historyMilestones.ts
   恒永达官网｜发展历程多语言数据

   作用：
   1. 集中管理发展历程页面所有年份内容
   2. 支持中文、英文、西班牙语、法语、韩语、俄语
   3. 后续新增年份，只需要在 historyMilestoneSources 里新增一条
   4. 后续接后端时，后端返回类似结构即可
========================================================= */

export const DEFAULT_HISTORY_LOCALE = "zh-CN" as const;

export const SUPPORTED_HISTORY_LOCALES = [
  "zh-CN",
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

export const NON_DEFAULT_HISTORY_LOCALES = [
  "en",
  "es",
  "fr",
  "ko",
  "ru",
] as const;

export type SupportedHistoryLocale =
  (typeof SUPPORTED_HISTORY_LOCALES)[number];

export type HistoryImageSide = "left" | "right";

type LocalizedText = Record<SupportedHistoryLocale, string>;

export type HistoryMilestone = {
  id: string;
  year: number;
  image: string;
  imageAlt: string;
  imageCaption?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSide: HistoryImageSide;
  events: string[];
  enabled: boolean;
};

type HistoryMilestoneSource = {
  id: string;
  year: number;
  image: string;
  imageAlt: LocalizedText;
  imageCaption?: LocalizedText;
  imageWidth?: number;
  imageHeight?: number;
  imageSide: HistoryImageSide;
  events: LocalizedText[];
  enabled: boolean;
};

export type HistoryPageText = {
  title: string;
  metadataTitle: string;
  metadataDescription: string;
  bannerDescription: string;
  titleMain: string;
  titleAccent: string;
  topBannerAriaLabel: string;
  bottomBannerAriaLabel: string;
};

type HistoryPageTextSource = {
  metadataTitle: LocalizedText;
  metadataDescription: LocalizedText;
  bannerDescription: LocalizedText;
  titleMain: LocalizedText;
  titleAccent: LocalizedText;
  topBannerAriaLabel: LocalizedText;
  bottomBannerAriaLabel: LocalizedText;
};

/* 多语言文本快捷函数 */
function t(
  zh: string,
  en: string,
  es: string,
  fr: string,
  ko: string,
  ru: string
): LocalizedText {
  return {
    "zh-CN": zh,
    en,
    es,
    fr,
    ko,
    ru,
  };
}

/* 判断是否是支持的语言 */
export function isSupportedHistoryLocale(
  locale: string
): locale is SupportedHistoryLocale {
  return SUPPORTED_HISTORY_LOCALES.includes(locale as SupportedHistoryLocale);
}

/* 获取安全语言值 */
export function getValidHistoryLocale(
  locale: string | undefined
): SupportedHistoryLocale {
  if (locale && isSupportedHistoryLocale(locale)) {
    return locale;
  }

  return DEFAULT_HISTORY_LOCALE;
}

/* 获取某个多语言字段的当前语言文本 */
function getLocalizedText(
  value: LocalizedText,
  locale: SupportedHistoryLocale
): string {
  return value[locale] || value.en || value["zh-CN"];
}

/* 页面固定文案 */
const historyPageTextSource: HistoryPageTextSource = {
  metadataTitle: t(
        "发展历程｜恒永达科技",
        "Company History & Product Milestones | FOREACH",
        "Historia y evolución de productos | FOREACH",
        "Histoire et évolution des produits | FOREACH",
        "회사 연혁 및 제품 개발 이력 | FOREACH",
        "История компании и развитие продукции | FOREACH"
      ),
  metadataDescription: t(
        "深圳市恒永达科技股份有限公司发展历程，展示公司在微流体核心部件、泵阀产品、技术攻关、企业认证与市场拓展方面的关键节点。",
        "Explore FOREACH’s history since 2012, from pump, valve and fluidic component launches to research projects, company recognition and international expansion.",
        "Conozca la historia de FOREACH desde 2012: bombas, válvulas y componentes fluídicos, proyectos de investigación, reconocimientos y expansión internacional.",
        "Découvrez l’histoire de FOREACH depuis 2012 : pompes, vannes et composants fluidiques, projets de recherche, reconnaissances et expansion internationale.",
        "2012년 설립 이후 FOREACH의 펌프·밸브·유체 부품 출시, 연구개발 과제, 기업 인정 및 해외 시장 진출 이력을 확인하세요.",
        "История FOREACH с 2012 года: насосы, клапаны и компоненты для управления жидкостями, исследовательские проекты, признание компании и выход на зарубежные рынки."
      ),
  bannerDescription: t(
        "用每一寸专注的光明丈量微流体发展",
        "Advancing fluidic component development and manufacturing",
        "Impulsamos el desarrollo y la fabricación de componentes fluídicos",
        "Faire progresser le développement et la fabrication de composants fluidiques",
        "유체 부품 연구개발과 제조의 지속적인 발전",
        "Развитие технологий и производства компонентов для управления жидкостями"
      ),
  titleMain: t(
        "发展",
        "Company",
        "Historia de",
        "Histoire de",
        "회사",
        "История"
      ),
  titleAccent: t(
        "历程",
        "History",
        "la empresa",
        "l’entreprise",
        "연혁",
        "компании"
      ),
  topBannerAriaLabel: t(
        "恒永达发展历程 Banner",
        "FOREACH company history",
        "Historia de FOREACH",
        "Histoire de FOREACH",
        "FOREACH 회사 연혁",
        "История компании FOREACH"
      ),
  bottomBannerAriaLabel: t(
        "恒永达发展历程底部图片 Banner",
        "FOREACH brand promise",
        "Compromiso de FOREACH",
        "Engagement de FOREACH",
        "FOREACH 브랜드 약속",
        "Обещание бренда FOREACH"
      ),
};

/* 页面文案输出函数 */
export function getHistoryPageText(
  locale: SupportedHistoryLocale
): HistoryPageText {
  return {
    title: [historyPageTextSource.titleMain[locale], historyPageTextSource.titleAccent[locale]].join(locale === "zh-CN" ? "" : " "),
    metadataTitle: getLocalizedText(historyPageTextSource.metadataTitle, locale),
    metadataDescription: getLocalizedText(
      historyPageTextSource.metadataDescription,
      locale
    ),
    bannerDescription: getLocalizedText(
      historyPageTextSource.bannerDescription,
      locale
    ),
    titleMain: getLocalizedText(historyPageTextSource.titleMain, locale),
    titleAccent: getLocalizedText(historyPageTextSource.titleAccent, locale),
    topBannerAriaLabel: getLocalizedText(
      historyPageTextSource.topBannerAriaLabel,
      locale
    ),
    bottomBannerAriaLabel: getLocalizedText(
      historyPageTextSource.bottomBannerAriaLabel,
      locale
    ),
  };
}

/* 发展历程原始多语言数据 */
const historyMilestoneSources: HistoryMilestoneSource[] = [
  {
    id: "2025",
    year: 2025,
    image: "/images/about/history/history-2025-certificate-clean.webp",
    imageWidth: 634,
    imageHeight: 460,
    imageAlt: t(
        "恒永达 2025 年发展历程配图",
        "FOREACH’s 2025 Shenzhen Gazelle Enterprise certificate",
        "Certificado de FOREACH como Empresa Gacela de Shenzhen, 2025",
        "Certificat d’entreprise Gazelle de Shenzhen de FOREACH, 2025",
        "FOREACH 2025년 선전시 가젤 기업 증서",
        "Свидетельство FOREACH о статусе предприятия «Газель» города Шэньчжэнь, 2025 год"
      ),
    imageSide: "left",
    events: [
      t(
        "DPL30、DPL60、DPGL800 系列隔膜泵产品发布",
        "Launched the DPL30, DPL60 and DPGL800 series of diaphragm pumps.",
        "Lanzamiento de las series DPL30, DPL60 y DPGL800 de bombas de diafragma.",
        "Lancement des séries DPL30, DPL60 et DPGL800 de pompes à membrane.",
        "DPL30, DPL60, DPGL800 시리즈 다이어프램 펌프 출시",
        "Начат выпуск мембранных насосов серий DPL30, DPL60 и DPGL800."
      ),
      t(
        "荣获深圳市“瞪羚企业”",
        "Recognized as a Shenzhen Gazelle Enterprise.",
        "Reconocimiento como Empresa Gacela de Shenzhen.",
        "Reconnaissance en tant qu’entreprise Gazelle de Shenzhen.",
        "선전시 가젤 기업으로 선정",
        "Получен статус предприятия «Газель» города Шэньчжэнь."
      ),
    ],
    enabled: true,
  },
  {
    id: "2024",
    year: 2024,
    image: "/images/about/history/history-2024-certificate-clean.webp",
    imageWidth: 692,
    imageHeight: 460,
    imageAlt: t(
        "恒永达 2024 年发展历程配图",
        "FOREACH’s 2024 national-level Little Giant enterprise plaque",
        "Placa de FOREACH como empresa nacional «Pequeño Gigante», 2024",
        "Plaque de FOREACH comme entreprise nationale « Petit Géant », 2024",
        "FOREACH 2024년 국가급 작은 거인 기업 현판",
        "Табличка FOREACH о национальном статусе предприятия «Малый гигант», 2024 год"
      ),
    imageSide: "right",
    events: [
      t(
        "6160、6907、HRV、HPP、EAS 等阀系列及泵系列产品发布",
        "Introduced new pump and valve products, including the 6160, 6907, HRV, HPP and EAS series.",
        "Presentación de nuevos productos de bombeo y válvulas, incluidas las series 6160, 6907, HRV, HPP y EAS.",
        "Lancement de nouveaux produits de pompage et de vannes, dont les séries 6160, 6907, HRV, HPP et EAS.",
        "6160, 6907, HRV, HPP, EAS 시리즈를 포함한 새로운 펌프 및 밸브 제품 출시",
        "Представлены новые насосы и клапаны, включая серии 6160, 6907, HRV, HPP и EAS."
      ),
      t(
        "荣获专精特新“小巨人”企业",
        "Recognized as a national-level “Little Giant” enterprise by China’s Ministry of Industry and Information Technology.",
        "Reconocimiento como empresa «Pequeño Gigante» de ámbito nacional por el Ministerio de Industria y Tecnología de la Información de China.",
        "Reconnaissance comme entreprise « Petit Géant » au niveau national par le ministère chinois de l’Industrie et des Technologies de l’information.",
        "중국 공업정보화부의 국가급 ‘작은 거인’ 기업으로 선정",
        "Получен национальный статус предприятия «Малый гигант» от Министерства промышленности и информатизации Китая."
      ),
      t(
        "荣获国家工业信息安全发展研究中心“毛细管内壁磁流体抛光控制系统及方法”科学技术成果登记证书",
        "Received a scientific and technological achievement registration certificate for a capillary inner-surface polishing control system and method.",
        "Obtención de un certificado de registro de resultados científicos y tecnológicos para un sistema y método de control del pulido de la superficie interna de capilares.",
        "Obtention d’un certificat d’enregistrement de résultats scientifiques et technologiques pour un système et une méthode de commande du polissage de la surface interne des capillaires.",
        "모세관 내벽 연마 제어 시스템 및 방법에 대한 과학기술 성과 등록증 취득",
        "Получено свидетельство о регистрации научно-технического результата для системы и метода управления полировкой внутренней поверхности капилляров."
      ),
      t(
        "广东省首家“高性能微流体移液系统工程技术研究中心”认定企业",
        "The company’s Engineering Technology Research Center for High-Performance Microfluidic Pipetting Systems received recognition from Guangdong Province.",
        "Reconocimiento provincial en Guangdong del Centro de Investigación en Ingeniería de la empresa para Sistemas de Pipeteo Microfluídico de Alto Rendimiento.",
        "Reconnaissance par la province du Guangdong du centre de recherche en ingénierie de l’entreprise dédié aux systèmes de pipetage microfluidique haute performance.",
        "회사의 고성능 미세유체 피펫팅 시스템 공정기술 연구센터가 광둥성 연구센터로 인정",
        "Инженерно-технологический исследовательский центр компании по высокопроизводительным микрофлюидным системам пипетирования получил признание провинции Гуандун."
      ),
    ],
    enabled: true,
  },
  {
    id: "2023",
    year: 2023,
    image: "",
    imageAlt: t(
      "恒永达 2023 年发展历程配图",
      "Foreach 2023 milestone image",
      "Imagen de hito de Foreach en 2023",
      "Image du jalon Foreach 2023",
      "Foreach 2023년 연혁 이미지",
      "Изображение этапа Foreach 2023"
    ),
    imageSide: "left",
    events: [
      t(
        "ABD、FOS、TDS、ISC、PDM 等智能控制及热控产品发布",
        "Launched intelligent control and thermal control products, including ABD, FOS, TDS, ISC and PDM.",
        "Lanzamiento de productos de control inteligente y térmico, incluidos ABD, FOS, TDS, ISC y PDM.",
        "Lancement de produits de commande intelligente et de régulation thermique, dont ABD, FOS, TDS, ISC et PDM.",
        "ABD, FOS, TDS, ISC, PDM 등 지능형 제어 및 열 제어 제품 출시",
        "Начат выпуск изделий для интеллектуального управления и терморегулирования, включая ABD, FOS, TDS, ISC и PDM."
      ),
      t(
        "总部迁址深圳市光明区",
        "Relocated the headquarters to Guangming District, Shenzhen.",
        "Traslado de la sede al distrito de Guangming, Shenzhen.",
        "Transfert du siège dans le district de Guangming, à Shenzhen.",
        "본사를 선전시 광밍구로 이전",
        "Штаб-квартира перенесена в район Гуанмин города Шэньчжэнь."
      ),
      t(
        "成功挂牌新三板",
        "Listed on China’s National Equities Exchange and Quotations (NEEQ).",
        "Incorporación al mercado chino National Equities Exchange and Quotations (NEEQ).",
        "Admission à la cotation sur le marché chinois National Equities Exchange and Quotations (NEEQ).",
        "중국 전국중소기업주식양도시스템(NEEQ, 신삼판)에 등록",
        "Акции компании допущены к торгам в китайской системе National Equities Exchange and Quotations (NEEQ)."
      ),
      t(
        "建设医疗器械净化生产车间",
        "Established a cleanroom production area for medical-device manufacturing.",
        "Creación de un área de producción en sala limpia para la fabricación de dispositivos médicos.",
        "Création d’un espace de production en salle propre pour la fabrication de dispositifs médicaux.",
        "의료기기 제조를 위한 클린룸 생산 구역 구축",
        "Создана чистая производственная зона для изготовления медицинских изделий."
      ),
    ],
    enabled: true,
  },
  {
    id: "2022",
    year: 2022,
    image: "",
    imageAlt: t(
      "恒永达 2022 年发展历程配图",
      "Foreach 2022 milestone image",
      "Imagen de hito de Foreach en 2022",
      "Image du jalon Foreach 2022",
      "Foreach 2022년 연혁 이미지",
      "Изображение этапа Foreach 2022"
    ),
    imageSide: "right",
    events: [
      t(
        "新型电磁阀、快插接头、微型隔膜气泵等产品发布",
        "Introduced new solenoid valves, quick-connect fittings and miniature diaphragm air pumps.",
        "Presentación de nuevas electroválvulas, racores de conexión rápida y bombas de diafragma miniatura para aire.",
        "Lancement de nouvelles électrovannes, de raccords rapides et de pompes à membrane miniatures pour l’air.",
        "신형 솔레노이드 밸브, 퀵 커넥트 피팅, 소형 다이어프램 에어 펌프 출시",
        "Представлены новые электромагнитные клапаны, быстроразъёмные фитинги и миниатюрные мембранные воздушные насосы."
      ),
      t(
        "高长径比金属毛细管内壁镜面抛光技术已达到世界领先水平",
        "Advanced mirror polishing of the inner surfaces of metal capillary tubes with high length-to-diameter ratios.",
        "Avances en el pulido espejo de superficies internas de capilares metálicos con una elevada relación longitud/diámetro.",
        "Progrès dans le polissage miroir des surfaces internes de capillaires métalliques présentant un rapport longueur/diamètre élevé.",
        "길이 대 직경 비율이 큰 금속 모세관의 내벽 경면 연마 기술 개발 진전",
        "Достигнут прогресс в зеркальной полировке внутренних поверхностей металлических капилляров с высоким отношением длины к диаметру."
      ),
      t(
        "股改成功，公司正式更名为“深圳市恒永达科技股份有限公司”",
        "Completed its conversion to a joint-stock company and adopted the name Shenzhen FOREACH Technology Co., Ltd.",
        "Transformación en sociedad por acciones y adopción del nombre Shenzhen FOREACH Technology Co., Ltd.",
        "Transformation en société par actions et adoption du nom Shenzhen FOREACH Technology Co., Ltd.",
        "주식회사로 전환하고 회사명을 Shenzhen FOREACH Technology Co., Ltd.로 변경",
        "Завершено преобразование в акционерное общество, принято наименование Shenzhen FOREACH Technology Co., Ltd."
      ),
      t(
        "捐赠教学设备，助力贫困地区教育事业发展",
        "Donated teaching equipment to support education in underserved regions.",
        "Donación de equipos didácticos para apoyar la educación en regiones con recursos limitados.",
        "Don d’équipements pédagogiques pour soutenir l’éducation dans des régions disposant de ressources limitées.",
        "교육 자원이 부족한 지역의 교육 지원을 위해 교육 장비 기부",
        "Передано учебное оборудование для поддержки образования в регионах с ограниченными ресурсами."
      ),
    ],
    enabled: true,
  },
  {
    id: "2020",
    year: 2020,
    image: "",
    imageAlt: t(
      "恒永达 2020 年发展历程配图",
      "Foreach 2020 milestone image",
      "Imagen de hito de Foreach en 2020",
      "Image du jalon Foreach 2020",
      "Foreach 2020년 연혁 이미지",
      "Изображение этапа Foreach 2020"
    ),
    imageSide: "left",
    events: [
      t(
        "移液泵诞生，助力分子诊断行业发展",
        "Developed a pipetting pump for molecular diagnostics applications.",
        "Desarrollo de una bomba de pipeteo para aplicaciones de diagnóstico molecular.",
        "Développement d’une pompe de pipetage pour le diagnostic moléculaire.",
        "분자진단용 피펫팅 펌프 개발",
        "Разработан насос для пипетирования в молекулярной диагностике."
      ),
      t(
        "紧急组织生产隔膜泵、柱塞泵等产品，全力支持抗疫",
        "Mobilized production of diaphragm and piston pumps to support the COVID-19 response.",
        "Movilización de la producción de bombas de diafragma y de pistón para apoyar la respuesta a la COVID-19.",
        "Mobilisation de la production de pompes à membrane et à piston pour soutenir la réponse à la COVID-19.",
        "코로나19 대응 지원을 위해 다이어프램 펌프와 피스톤 펌프 긴급 생산",
        "Организовано срочное производство мембранных и поршневых насосов для поддержки борьбы с COVID-19."
      ),
      t(
        "建立南方科技大学—恒永达产学研试验基地",
        "Established an industry–university research collaboration facility with Southern University of Science and Technology (SUSTech).",
        "Creación de una instalación de colaboración entre empresa y universidad para investigación con Southern University of Science and Technology (SUSTech).",
        "Création d’un site de collaboration en recherche entre l’entreprise et la Southern University of Science and Technology (SUSTech).",
        "남방과학기술대학교(SUSTech)와 산학연 실험기지 설립",
        "Совместно с Южным научно-технологическим университетом (SUSTech) создана экспериментальная база сотрудничества науки и производства."
      ),
      t(
        "成立华东办事处",
        "Opened an office in East China.",
        "Apertura de una oficina en el este de China.",
        "Ouverture d’un bureau dans l’est de la Chine.",
        "중국 화동 지역 사무소 개설",
        "Открыт офис на востоке Китая."
      ),
    ],
    enabled: true,
  },
  {
    id: "2019",
    year: 2019,
    image: "",
    imageAlt: t(
      "恒永达 2019 年发展历程配图",
      "Foreach 2019 milestone image",
      "Imagen de hito de Foreach en 2019",
      "Image du jalon Foreach 2019",
      "Foreach 2019년 연혁 이미지",
      "Изображение этапа Foreach 2019"
    ),
    imageSide: "right",
    events: [
      t(
        "承接深圳市重大技术攻关项目《用于高端 IVD 设备的高精密采样针关键技术》的研发",
        "Undertook a Shenzhen major technology research project on high-precision sampling probes for advanced IVD instruments.",
        "Inicio de un proyecto de investigación tecnológica prioritario de Shenzhen sobre sondas de muestreo de alta precisión para instrumentos avanzados de diagnóstico in vitro (IVD).",
        "Prise en charge d’un projet majeur de recherche technologique de Shenzhen sur les sondes de prélèvement de haute précision pour les instruments avancés de diagnostic in vitro (IVD).",
        "고급 체외진단(IVD) 장비용 고정밀 샘플링 프로브 관련 선전시 중대 기술개발 과제 수행",
        "Начаты работы по крупному технологическому проекту города Шэньчжэнь в области высокоточных пробоотборных зондов для передовых приборов диагностики in vitro (IVD)."
      ),
      t(
        "推出注射泵、旋转阀、高压泵、恒流泵等产品",
        "Launched syringe pumps, rotary valves, high-pressure pumps and constant-flow pumps.",
        "Lanzamiento de bombas de jeringa, válvulas rotativas, bombas de alta presión y bombas de caudal constante.",
        "Lancement de pompes à seringue, de vannes rotatives, de pompes haute pression et de pompes à débit constant.",
        "시린지 펌프, 로터리 밸브, 고압 펌프, 정유량 펌프 출시",
        "Начат выпуск шприцевых насосов, поворотных клапанов, насосов высокого давления и насосов постоянного расхода."
      ),
      t(
        "正式进入环保和实验室设备领域",
        "Expanded into environmental and laboratory equipment applications.",
        "Expansión a aplicaciones en equipos medioambientales y de laboratorio.",
        "Développement des activités dans les équipements pour l’environnement et les laboratoires.",
        "환경 및 실험실 장비 분야로 사업 확대",
        "Расширена сфера применения продукции: экологическое и лабораторное оборудование."
      ),
    ],
    enabled: true,
  },
  {
    id: "2018",
    year: 2018,
    image: "",
    imageAlt: t(
      "恒永达 2018 年发展历程配图",
      "Foreach 2018 milestone image",
      "Imagen de hito de Foreach en 2018",
      "Image du jalon Foreach 2018",
      "Foreach 2018년 연혁 이미지",
      "Изображение этапа Foreach 2018"
    ),
    imageSide: "left",
    events: [
      t(
        "电磁阀研制成功",
        "Completed development of a solenoid valve.",
        "Finalización del desarrollo de una electroválvula.",
        "Achèvement du développement d’une électrovanne.",
        "솔레노이드 밸브 개발 완료",
        "Завершена разработка электромагнитного клапана."
      ),
      t(
        "柱塞泵累计销量达10万台",
        "Cumulative piston pump sales reached 100,000 units.",
        "Las ventas acumuladas de bombas de pistón alcanzaron las 100.000 unidades.",
        "Les ventes cumulées de pompes à piston ont atteint 100 000 unités.",
        "피스톤 펌프 누적 판매량 10만 대 달성",
        "Совокупные продажи поршневых насосов достигли 100 000 единиц."
      ),
      t(
        "进军印度市场",
        "Entered the Indian market.",
        "Entrada en el mercado indio.",
        "Entrée sur le marché indien.",
        "인도 시장 진출",
        "Выход на индийский рынок."
      ),
    ],
    enabled: true,
  },
  {
    id: "2017",
    year: 2017,
    image: "",
    imageAlt: t(
      "恒永达 2017 年发展历程配图",
      "Foreach 2017 milestone image",
      "Imagen de hito de Foreach en 2017",
      "Image du jalon Foreach 2017",
      "Foreach 2017년 연혁 이미지",
      "Изображение этапа Foreach 2017"
    ),
    imageSide: "right",
    events: [
      t(
        "推出传感器和驱动控制器产品系列，向智能化和模块化发展",
        "Introduced sensors and drive controllers, advancing the development of intelligent and modular products.",
        "Lanzamiento de sensores y controladores de accionamiento, avanzando en el desarrollo de productos inteligentes y modulares.",
        "Lancement de capteurs et de contrôleurs d’entraînement, contribuant au développement de produits intelligents et modulaires.",
        "센서 및 구동 컨트롤러 제품군을 출시하며 지능형·모듈형 제품 개발 추진",
        "Представлены датчики и контроллеры приводов, продолжено развитие интеллектуальных и модульных изделий."
      ),
      t(
        "国内首款微型无阀泵产品上市，打破美国垄断",
        "Launched a miniature valveless pump, expanding its fluidic component portfolio.",
        "Lanzamiento de una bomba miniatura sin válvulas, ampliando la gama de componentes fluídicos.",
        "Lancement d’une pompe miniature sans vanne, élargissant la gamme de composants fluidiques.",
        "소형 무밸브 펌프를 출시하여 유체 부품 제품군 확대",
        "Начат выпуск миниатюрного бесклапанного насоса, расширившего ассортимент компонентов для управления жидкостями."
      ),
      t(
        "EA 单一系列产品年销售额首次突破千万元",
        "Annual sales of the EA pump series exceeded RMB 10 million for the first time.",
        "Las ventas anuales de la serie de bombas EA superaron por primera vez los 10 millones de RMB.",
        "Le chiffre d’affaires annuel de la série de pompes EA a dépassé pour la première fois 10 millions de RMB.",
        "EA 펌프 시리즈 연간 매출 최초 1천만 위안 돌파",
        "Годовая выручка от продаж насосов серии EA впервые превысила 10 млн юаней."
      ),
      t(
        "首次参加 AACC",
        "Participated in AACC for the first time.",
        "Primera participación en AACC.",
        "Première participation à l’AACC.",
        "AACC 최초 참가",
        "Первое участие в AACC."
      ),
    ],
    enabled: true,
  },
  {
    id: "2016",
    year: 2016,
    image: "/images/about/history/history-2016-certificate-clean.webp",
    imageWidth: 1261,
    imageHeight: 901,
    imageAlt: t(
        "恒永达 2016 年发展历程配图",
        "FOREACH’s National High-Tech Enterprise certificate, issued in 2025",
        "Certificado de FOREACH como Empresa Nacional de Alta Tecnología, emitido en 2025",
        "Certificat d’entreprise nationale de haute technologie de FOREACH, délivré en 2025",
        "2025년에 발급된 FOREACH 국가 첨단기술기업 증서",
        "Свидетельство FOREACH о статусе национального высокотехнологичного предприятия, выданное в 2025 году"
      ),
    imageCaption: t(
      "",
      "Certificate shown: issued in 2025.",
      "El certificado mostrado se emitió en 2025.",
      "Le certificat présenté a été délivré en 2025.",
      "사진의 증서는 2025년에 발급되었습니다.",
      "На изображении — свидетельство, выданное в 2025 году."
    ),
    imageSide: "left",
    events: [
      t(
        "承接深圳市《基于微流体技术的一体化精密柱塞泵》的技术攻关项目",
        "Undertook a Shenzhen technology research project on an integrated precision piston pump based on microfluidic technology.",
        "Inicio de un proyecto de investigación tecnológica de Shenzhen sobre una bomba de pistón de precisión integrada basada en tecnología microfluídica.",
        "Prise en charge d’un projet de recherche technologique de Shenzhen sur une pompe à piston de précision intégrée fondée sur la microfluidique.",
        "미세유체 기술 기반 일체형 정밀 피스톤 펌프 관련 선전시 기술개발 과제 수행",
        "Начаты работы по технологическому проекту города Шэньчжэнь в области интегрированного прецизионного поршневого насоса на основе микрофлюидики."
      ),
      t(
        "多联泵上市，进军血球市场",
        "Launched a multi-channel pump for hematology analyzers.",
        "Lanzamiento de una bomba multicanal para analizadores hematológicos.",
        "Lancement d’une pompe multicanal pour analyseurs d’hématologie.",
        "혈구 분석기용 다채널 펌프 출시",
        "Начат выпуск многоканального насоса для гематологических анализаторов."
      ),
      t(
        "获得国家高新技术企业认证",
        "Recognized as a National High-Tech Enterprise in China.",
        "Reconocimiento como Empresa Nacional de Alta Tecnología en China.",
        "Reconnaissance comme entreprise nationale de haute technologie en Chine.",
        "중국 국가 첨단기술기업으로 인정",
        "Получен статус национального высокотехнологичного предприятия Китая."
      ),
      t(
        "产品首次远销海外",
        "Began exporting products.",
        "Inicio de las exportaciones de productos.",
        "Début des exportations de produits.",
        "제품 첫 해외 수출",
        "Начат экспорт продукции."
      ),
    ],
    enabled: true,
  },
  {
    id: "2015",
    year: 2015,
    image: "",
    imageAlt: t(
      "恒永达 2015 年发展历程配图",
      "Foreach 2015 milestone image",
      "Imagen de hito de Foreach en 2015",
      "Image du jalon Foreach 2015",
      "Foreach 2015년 연혁 이미지",
      "Изображение этапа Foreach 2015"
    ),
    imageSide: "right",
    events: [
      t(
        "微型柱塞泵上市，进军 POCT 领域",
        "Launched a miniature piston pump for point-of-care testing (POCT) applications.",
        "Lanzamiento de una bomba de pistón miniatura para pruebas en el punto de atención (POCT).",
        "Lancement d’une pompe à piston miniature pour les analyses au point de soins (POCT).",
        "현장진단(POCT)용 소형 피스톤 펌프 출시",
        "Начат выпуск миниатюрного поршневого насоса для диагностики по месту оказания медицинской помощи (POCT)."
      ),
      t(
        "荣获深圳市高新技术企业认证",
        "Recognized as a Shenzhen High-Tech Enterprise.",
        "Reconocimiento como Empresa de Alta Tecnología de Shenzhen.",
        "Reconnaissance comme entreprise de haute technologie de Shenzhen.",
        "선전시 첨단기술기업으로 인정",
        "Получен статус высокотехнологичного предприятия города Шэньчжэнь."
      ),
      t(
        "产品销售额突破千万",
        "Product sales revenue exceeded RMB 10 million.",
        "Los ingresos por ventas de productos superaron los 10 millones de RMB.",
        "Le chiffre d’affaires des produits a dépassé 10 millions de RMB.",
        "제품 매출 1천만 위안 돌파",
        "Выручка от продаж продукции превысила 10 млн юаней."
      ),
    ],
    enabled: true,
  },
  {
    id: "2014",
    year: 2014,
    image: "",
    imageAlt: t(
      "恒永达 2014 年发展历程配图",
      "Foreach 2014 milestone image",
      "Imagen de hito de Foreach en 2014",
      "Image du jalon Foreach 2014",
      "Foreach 2014년 연혁 이미지",
      "Изображение этапа Foreach 2014"
    ),
    imageSide: "left",
    events: [
      t(
        "推出高精度加样针、管路连接件产品系列",
        "Launched high-precision liquid-handling probes and tubing fittings.",
        "Lanzamiento de sondas de alta precisión para manipulación de líquidos y racores para tubos.",
        "Lancement de sondes de haute précision pour la manipulation de liquides et de raccords de tubulure.",
        "고정밀 액체 취급용 프로브 및 튜빙 피팅 출시",
        "Начат выпуск высокоточных зондов для работы с жидкостями и фитингов для трубок."
      ),
    ],
    enabled: true,
  },
  {
    id: "2013",
    year: 2013,
    image: "",
    imageAlt: t(
      "恒永达 2013 年发展历程配图",
      "Foreach 2013 milestone image",
      "Imagen de hito de Foreach en 2013",
      "Image du jalon Foreach 2013",
      "Foreach 2013년 연혁 이미지",
      "Изображение этапа Foreach 2013"
    ),
    imageSide: "right",
    events: [
      t(
        "柱塞泵上市",
        "Launched a piston pump.",
        "Lanzamiento de una bomba de pistón.",
        "Lancement d’une pompe à piston.",
        "피스톤 펌프 출시",
        "Начат выпуск поршневого насоса."
      ),
    ],
    enabled: true,
  },
  {
    id: "2012",
    year: 2012,
    image: "",
    imageAlt: t(
      "恒永达 2012 年发展历程配图",
      "Foreach 2012 milestone image",
      "Imagen de hito de Foreach en 2012",
      "Image du jalon Foreach 2012",
      "Foreach 2012년 연혁 이미지",
      "Изображение этапа Foreach 2012"
    ),
    imageSide: "left",
    events: [
      t(
        "恒永达成立",
        "FOREACH was founded.",
        "Fundación de FOREACH.",
        "Création de FOREACH.",
        "FOREACH 설립",
        "Основана компания FOREACH."
      ),
    ],
    enabled: true,
  },
];

/* 输出当前语言的发展历程数据 */
export function getHistoryMilestones(
  locale: SupportedHistoryLocale
): HistoryMilestone[] {
  return historyMilestoneSources.map((item) => ({
    id: item.id,
    year: item.year,
    image: item.image,
    imageAlt: getLocalizedText(item.imageAlt, locale),
    imageCaption: locale !== "zh-CN" && item.imageCaption ? getLocalizedText(item.imageCaption, locale) : undefined,
    imageWidth: item.imageWidth,
    imageHeight: item.imageHeight,
    imageSide: item.imageSide,
    events: item.events.map((event) => getLocalizedText(event, locale)),
    enabled: item.enabled,
  }));
}
