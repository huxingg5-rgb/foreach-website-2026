/* =========================================================
   news.quality-updates.ts
   恒永达官网｜质量体系、企业荣誉与制造能力专题新闻

   说明：
   1. 本文件补充 ISO 9001、ISO 13485、国家级专精特新“小巨人”及生产制造专题
   2. 六种语言在同一份数据中维护，避免新闻索引与翻译顺序错位
   3. 图片全部复用官网现有资源，不新增重复图片
   4. 国家级专精特新“小巨人”文章会覆盖旧版同 slug 内容
========================================================= */

import type {
  NewsArticle,
  NewsLocale,
} from "./news.types";

type LocalizedArticleCopy = {
  title: string;
  summary: string;
  content: NewsArticle["content"];
  seoTitle: string;
  seoDescription: string;
};

type LocalizedArticleDefinition = {
  id: string;
  slug: string;
  category: NewsArticle["category"];
  date: string;
  coverImage: string;
  isPinned?: boolean;
  copies: Record<NewsLocale, LocalizedArticleCopy>;
};

const qualityAndRecognitionArticles: LocalizedArticleDefinition[] = [
  {
    id: "quality-manufacturing-capability-2026",
    slug: "quality-manufacturing-capability-2026",
    category: "company",
    date: "2026-07-23",
    coverImage: "/images/about/quality-cert-bg.webp",
    isPinned: true,
    copies: {
      "zh-CN": {
        title: "从研发验证到稳定交付：走进恒永达生产制造与质量保障体系",
        summary:
          "恒永达将质量管理贯穿供应链、研发验证、生产制造、检测放行和客户反馈全过程，以标准化流程与数字化记录支撑微流体核心部件稳定交付。",
        content: [
          {
            title: "质量贯穿产品全生命周期",
            content:
              "微流体核心部件体积虽小，却直接影响整机液路的流量、压力、密封性和运行稳定性。恒永达围绕泵、阀、传感器、管路连接件等产品，将质量要求落实到供应商管理、材料确认、研发验证、生产装配、终检放行和交付服务等环节。",
          },
          {
            title: "标准化流程与数字化记录",
            content:
              "公司通过 PDM、ERP、MES、SVN 等电子化数据平台，对关键物料、工艺过程、检验记录、版本文件和交付信息进行记录与更新，使产品从物料、制造、检测到交付的全过程更加可追溯、可验证。",
          },
          {
            title: "检测与验证支撑稳定交付",
            content:
              "在研发与制造过程中，恒永达围绕关键尺寸、外观结构、装配状态、密封性、压力、流量及电气性能开展检测与确认，并通过精密测量设备、测试工装和过程记录，为产品一致性和批量交付提供依据。",
          },
          {
            title: "持续改进面向客户应用",
            content:
              "当来料、制造、终检或客户使用环节出现异常时，相关信息将进入不合格品控制、原因分析、纠正措施、复检确认和反馈改进流程。恒永达将持续以稳定产品和专业工程支持，服务 IVD、生命科学、实验室自动化、分析仪器等领域客户。",
          },
        ],
        seoTitle: "恒永达生产制造与质量保障体系｜从研发验证到稳定交付",
        seoDescription:
          "了解恒永达如何通过供应链管理、研发验证、生产制造、精密检测和数字化记录，保障微流体核心部件稳定交付。",
      },
      en: {
        title:
          "From Engineering Validation to Reliable Delivery: Inside FOREACH Manufacturing and Quality Assurance",
        summary:
          "FOREACH integrates quality management across supply chain control, engineering validation, manufacturing, final inspection, delivery, and customer feedback to support reliable microfluidic component supply.",
        content: [
          {
            title: "Quality Across the Product Lifecycle",
            content:
              "Microfluidic components may be compact, but they directly affect flow, pressure, sealing, and long-term instrument stability. FOREACH applies quality requirements to supplier management, material verification, engineering validation, assembly, final release, and delivery for pumps, valves, sensors, fittings, and related fluidic components.",
          },
          {
            title: "Standardized Processes and Digital Records",
            content:
              "Digital platforms including PDM, ERP, MES, and SVN are used to manage key materials, process records, inspection data, document versions, and delivery information. This supports traceability and verification from incoming material through manufacturing, inspection, and shipment.",
          },
          {
            title: "Inspection and Validation for Consistent Delivery",
            content:
              "FOREACH verifies critical dimensions, appearance, assembly status, sealing, pressure, flow, and electrical performance through precision measurement equipment, dedicated test fixtures, and documented process controls, providing a basis for product consistency and repeatable production.",
          },
          {
            title: "Continuous Improvement for Customer Applications",
            content:
              "Issues identified during incoming inspection, manufacturing, final testing, or customer use enter a closed-loop process covering nonconformance control, root-cause analysis, corrective action, reinspection, and feedback. FOREACH continues to support IVD, life science, laboratory automation, and analytical instrument customers with reliable products and engineering support.",
          },
        ],
        seoTitle:
          "FOREACH Manufacturing and Quality Assurance | From Validation to Reliable Delivery",
        seoDescription:
          "See how FOREACH combines supply chain control, engineering validation, manufacturing, inspection, and digital records to support reliable microfluidic component delivery.",
      },
      es: {
        title:
          "De la validación de ingeniería a la entrega fiable: fabricación y garantía de calidad en FOREACH",
        summary:
          "FOREACH integra la calidad en la cadena de suministro, la validación, la fabricación, la inspección final, la entrega y la retroalimentación del cliente para garantizar componentes microfluídicos fiables.",
        content: [
          {
            title: "Calidad durante todo el ciclo de vida",
            content:
              "Aunque los componentes microfluídicos son pequeños, influyen directamente en el caudal, la presión, la estanqueidad y la estabilidad del instrumento. FOREACH aplica requisitos de calidad a proveedores, materiales, validación de ingeniería, montaje, liberación final y entrega de bombas, válvulas, sensores, racores y otros componentes fluídicos.",
          },
          {
            title: "Procesos normalizados y registros digitales",
            content:
              "Las plataformas PDM, ERP, MES y SVN permiten gestionar materiales clave, procesos, inspecciones, versiones documentales e información de entrega. Así se refuerzan la trazabilidad y la verificación desde la entrada de materiales hasta la fabricación, la inspección y el envío.",
          },
          {
            title: "Inspección y validación para una entrega consistente",
            content:
              "FOREACH verifica dimensiones críticas, apariencia, montaje, estanqueidad, presión, caudal y rendimiento eléctrico mediante equipos de medición de precisión, útiles de ensayo y controles documentados, creando una base para la consistencia del producto y la producción repetible.",
          },
          {
            title: "Mejora continua para las aplicaciones del cliente",
            content:
              "Las incidencias detectadas en la recepción, la fabricación, la prueba final o el uso del cliente se gestionan mediante control de no conformidades, análisis de causa, acciones correctivas, reinspección y retroalimentación. FOREACH sigue apoyando a IVD, ciencias de la vida, automatización de laboratorio e instrumentos analíticos.",
          },
        ],
        seoTitle:
          "Fabricación y garantía de calidad FOREACH | De la validación a la entrega fiable",
        seoDescription:
          "Conozca cómo FOREACH combina control de proveedores, validación, fabricación, inspección y registros digitales para entregar componentes microfluídicos fiables.",
      },
      fr: {
        title:
          "De la validation technique à la livraison fiable : fabrication et assurance qualité chez FOREACH",
        summary:
          "FOREACH intègre la qualité dans la chaîne d’approvisionnement, la validation, la fabrication, le contrôle final, la livraison et le retour client afin de sécuriser l’approvisionnement en composants microfluidiques.",
        content: [
          {
            title: "La qualité sur l’ensemble du cycle de vie",
            content:
              "Malgré leur petite taille, les composants microfluidiques influencent directement le débit, la pression, l’étanchéité et la stabilité des instruments. FOREACH applique ses exigences qualité aux fournisseurs, aux matériaux, à la validation, à l’assemblage, à la libération finale et à la livraison des pompes, vannes, capteurs, raccords et autres composants fluidiques.",
          },
          {
            title: "Des processus normalisés et des données numériques",
            content:
              "Les plateformes PDM, ERP, MES et SVN permettent de gérer les matières critiques, les processus, les contrôles, les versions documentaires et les informations de livraison. Elles renforcent la traçabilité et la vérification depuis la réception jusqu’à la fabrication, au contrôle et à l’expédition.",
          },
          {
            title: "Contrôle et validation pour une livraison constante",
            content:
              "FOREACH vérifie les dimensions critiques, l’aspect, l’assemblage, l’étanchéité, la pression, le débit et les performances électriques grâce à des équipements de mesure de précision, des moyens d’essai dédiés et des contrôles documentés.",
          },
          {
            title: "Amélioration continue au service des applications",
            content:
              "Les anomalies détectées à la réception, en fabrication, lors du contrôle final ou chez le client suivent un processus fermé : maîtrise des non-conformités, analyse des causes, actions correctives, nouveau contrôle et retour d’expérience. FOREACH accompagne durablement l’IVD, les sciences de la vie, l’automatisation de laboratoire et l’instrumentation analytique.",
          },
        ],
        seoTitle:
          "Fabrication et assurance qualité FOREACH | De la validation à la livraison fiable",
        seoDescription:
          "Découvrez comment FOREACH associe maîtrise fournisseurs, validation, fabrication, contrôle et traçabilité numérique pour livrer des composants microfluidiques fiables.",
      },
      ko: {
        title:
          "엔지니어링 검증에서 안정적인 납품까지: FOREACH의 생산 및 품질보증 체계",
        summary:
          "FOREACH는 공급망 관리, 엔지니어링 검증, 생산, 최종 검사, 납품 및 고객 피드백 전 과정에 품질관리를 적용하여 미세유체 핵심 부품의 안정적인 공급을 지원합니다.",
        content: [
          {
            title: "제품 전 수명주기에 적용되는 품질관리",
            content:
              "미세유체 부품은 크기가 작지만 유량, 압력, 밀봉 성능과 장비의 장기 안정성에 직접적인 영향을 줍니다. FOREACH는 펌프, 밸브, 센서, 피팅 등 제품의 공급업체 관리, 자재 확인, 엔지니어링 검증, 조립, 최종 승인 및 납품 전 과정에 품질 요구사항을 적용합니다.",
          },
          {
            title: "표준화된 공정과 디지털 기록",
            content:
              "PDM, ERP, MES, SVN 등의 전산 플랫폼을 활용하여 핵심 자재, 공정 기록, 검사 데이터, 문서 버전과 납품 정보를 관리합니다. 이를 통해 입고 자재부터 생산, 검사, 출하까지 추적성과 검증 가능성을 높입니다.",
          },
          {
            title: "일관된 납품을 위한 검사와 검증",
            content:
              "FOREACH는 정밀 측정 장비, 전용 시험 치구와 문서화된 공정 관리를 통해 핵심 치수, 외관, 조립 상태, 밀봉, 압력, 유량 및 전기 성능을 확인하여 제품 일관성과 반복 생산의 기반을 마련합니다.",
          },
          {
            title: "고객 적용을 위한 지속적인 개선",
            content:
              "입고 검사, 생산, 최종 시험 또는 고객 사용 단계에서 발견된 이상은 부적합 관리, 원인 분석, 시정 조치, 재검사와 피드백으로 이어지는 폐쇄형 개선 절차로 관리됩니다. FOREACH는 IVD, 생명과학, 실험실 자동화 및 분석기기 고객을 지속적으로 지원합니다.",
          },
        ],
        seoTitle:
          "FOREACH 생산 및 품질보증 체계 | 검증에서 안정적인 납품까지",
        seoDescription:
          "FOREACH가 공급망 관리, 엔지니어링 검증, 생산, 정밀 검사와 디지털 기록을 통해 미세유체 부품의 안정적인 납품을 지원하는 방법을 소개합니다.",
      },
      ru: {
        title:
          "От инженерной валидации до стабильных поставок: производство и обеспечение качества FOREACH",
        summary:
          "FOREACH объединяет контроль поставщиков, инженерную валидацию, производство, финальные испытания, поставку и обратную связь для стабильного выпуска микрофлюидных компонентов.",
        content: [
          {
            title: "Качество на протяжении всего жизненного цикла",
            content:
              "Небольшие микрофлюидные компоненты напрямую влияют на расход, давление, герметичность и стабильность прибора. FOREACH применяет требования качества к поставщикам, материалам, инженерной валидации, сборке, финальному выпуску и поставке насосов, клапанов, датчиков, фитингов и других компонентов.",
          },
          {
            title: "Стандартизированные процессы и цифровые записи",
            content:
              "Платформы PDM, ERP, MES и SVN используются для управления ключевыми материалами, технологическими записями, результатами контроля, версиями документов и данными о поставках. Это повышает прослеживаемость от входного материала до производства, контроля и отгрузки.",
          },
          {
            title: "Контроль и валидация для стабильного результата",
            content:
              "FOREACH проверяет критические размеры, внешний вид, состояние сборки, герметичность, давление, расход и электрические характеристики с помощью точного измерительного оборудования, испытательной оснастки и документированных процедур.",
          },
          {
            title: "Непрерывное улучшение для задач заказчика",
            content:
              "Отклонения, выявленные при входном контроле, производстве, финальных испытаниях или эксплуатации, проходят замкнутый цикл: управление несоответствиями, анализ причин, корректирующие действия, повторный контроль и обратная связь. FOREACH продолжает поддерживать IVD, науки о жизни, лабораторную автоматизацию и аналитические приборы.",
          },
        ],
        seoTitle:
          "Производство и качество FOREACH | От валидации до стабильных поставок",
        seoDescription:
          "Узнайте, как FOREACH сочетает контроль поставщиков, валидацию, производство, инспекцию и цифровую прослеживаемость для надежных поставок микрофлюидных компонентов.",
      },
    },
  },
  {
    id: "national-little-giant-2024",
    slug: "national-little-giant-2024",
    category: "company",
    date: "2024-09-06",
    coverImage: "/images/home/company-honors-original/little-giant.png",
    isPinned: true,
    copies: {
      "zh-CN": {
        title: "恒永达获评国家级专精特新“小巨人”企业",
        summary:
          "恒永达凭借在微流体控制领域的长期专注、技术创新与产业化能力，入选国家级专精特新“小巨人”企业名单。",
        content: [
          {
            title: "获得国家级专精特新“小巨人”认定",
            content:
              "在国家工业和信息化部门于 2024 年 9 月 2 日公布的国家级专精特新“小巨人”企业名单中，深圳市恒永达科技股份有限公司凭借在微流体控制领域的专业积累与持续创新获得认定。",
          },
          {
            title: "长期专注微流体核心部件",
            content:
              "恒永达持续围绕微流体精密控制技术开展研发与产业化，逐步形成泵、阀、针、管路连接件、传感器及液路系统支持等产品与技术能力，服务 IVD、生命科学、实验室自动化、分析仪器等应用领域。",
          },
          {
            title: "以工程能力连接研发与应用",
            content:
              "从产品选型、材料兼容和流体参数，到样品验证、定制开发和批量交付，恒永达不断完善研发、制造、检测与工程支持能力，帮助客户将微流体部件更高效地导入设备与系统。",
          },
          {
            title: "以国家级认可为新的起点",
            content:
              "国家级专精特新“小巨人”认定既是对企业专业化、精细化、特色化与创新能力的认可，也是新的发展起点。恒永达将继续聚焦微流体核心部件和液路技术，为国内外客户提供稳定产品与专业支持。",
          },
        ],
        seoTitle: "恒永达获评国家级专精特新“小巨人”企业",
        seoDescription:
          "恒永达凭借在微流体控制领域的专业积累、技术创新与产业化能力，获评国家级专精特新“小巨人”企业。",
      },
      en: {
        title:
          "FOREACH Recognized as a National-Level Specialized and Innovative “Little Giant” Enterprise",
        summary:
          "FOREACH received national-level recognition for its long-term specialization, innovation, and industrial capabilities in microfluidic control.",
        content: [
          {
            title: "National-Level Specialized and Innovative Recognition",
            content:
              "FOREACH was included in the national-level list of Specialized, Sophisticated, Distinctive and Innovative “Little Giant” enterprises announced on September 2, 2024, recognizing the company’s focused expertise and continued innovation in microfluidic control.",
          },
          {
            title: "Long-Term Focus on Core Microfluidic Components",
            content:
              "FOREACH develops and industrializes precision microfluidic control technologies across pumps, valves, probes, fittings, tubing connections, sensors, and fluidic system support for IVD, life sciences, laboratory automation, analytical instruments, and related applications.",
          },
          {
            title: "Engineering Capability from Development to Application",
            content:
              "From product selection, material compatibility, and fluid parameters to sample validation, customization, and volume delivery, FOREACH continues to strengthen its R&D, manufacturing, inspection, and engineering support capabilities for customer system integration.",
          },
          {
            title: "A New Starting Point for Continued Development",
            content:
              "The national recognition reflects FOREACH’s specialization, refined management, distinctive capabilities, and innovation. The company will continue to focus on core microfluidic components and fluidic technologies while supporting customers worldwide with reliable products and professional engineering service.",
          },
        ],
        seoTitle:
          "FOREACH Recognized as a National-Level Specialized and Innovative Little Giant Enterprise",
        seoDescription:
          "FOREACH received national-level Little Giant recognition for its specialization, innovation, and industrial capabilities in microfluidic control.",
      },
      es: {
        title:
          "FOREACH reconocida como empresa nacional especializada e innovadora “Pequeño Gigante”",
        summary:
          "FOREACH recibió el reconocimiento nacional por su especialización, innovación y capacidad de industrialización en el control microfluídico.",
        content: [
          {
            title: "Reconocimiento nacional a una empresa especializada e innovadora",
            content:
              "FOREACH fue incluida en la lista nacional de empresas especializadas, sofisticadas, distintivas e innovadoras “Pequeño Gigante”, publicada el 2 de septiembre de 2024, por su experiencia y su innovación continua en el control microfluídico.",
          },
          {
            title: "Enfoque a largo plazo en componentes microfluídicos",
            content:
              "FOREACH desarrolla e industrializa bombas, válvulas, sondas, racores, conexiones de tubos, sensores y soporte de sistemas fluídicos para IVD, ciencias de la vida, automatización de laboratorio, instrumentos analíticos y otras aplicaciones.",
          },
          {
            title: "Capacidad de ingeniería desde el desarrollo hasta la aplicación",
            content:
              "Desde la selección, la compatibilidad de materiales y los parámetros de fluidos hasta la validación de muestras, la personalización y la entrega en serie, FOREACH fortalece continuamente sus capacidades de I+D, fabricación, inspección y soporte técnico.",
          },
          {
            title: "Un nuevo punto de partida",
            content:
              "El reconocimiento refleja la especialización, la gestión refinada, la diferenciación y la innovación de FOREACH. La empresa seguirá centrada en componentes microfluídicos y tecnologías de circuitos de fluidos para apoyar a clientes de todo el mundo.",
          },
        ],
        seoTitle:
          "FOREACH reconocida como empresa nacional especializada e innovadora Pequeño Gigante",
        seoDescription:
          "FOREACH recibió el reconocimiento nacional Pequeño Gigante por su especialización, innovación y capacidad industrial en control microfluídico.",
      },
      fr: {
        title:
          "FOREACH reconnue comme entreprise nationale spécialisée et innovante « Little Giant »",
        summary:
          "FOREACH obtient une reconnaissance nationale pour sa spécialisation, son innovation et ses capacités industrielles dans le contrôle microfluidique.",
        content: [
          {
            title: "Une reconnaissance nationale spécialisée et innovante",
            content:
              "FOREACH figure sur la liste nationale des entreprises spécialisées, sophistiquées, distinctives et innovantes « Little Giant », publiée le 2 septembre 2024, en reconnaissance de son expertise ciblée et de son innovation continue dans le contrôle microfluidique.",
          },
          {
            title: "Un engagement durable dans les composants microfluidiques",
            content:
              "FOREACH développe et industrialise des pompes, vannes, sondes, raccords, connexions de tubes, capteurs et moyens d’intégration fluidique pour l’IVD, les sciences de la vie, l’automatisation de laboratoire, l’instrumentation analytique et d’autres applications.",
          },
          {
            title: "Des compétences d’ingénierie du développement à l’application",
            content:
              "De la sélection des produits, de la compatibilité et des paramètres fluidiques à la validation d’échantillons, à la personnalisation et à la livraison en série, FOREACH renforce continuellement ses capacités de R&D, de fabrication, de contrôle et d’assistance technique.",
          },
          {
            title: "Un nouveau point de départ",
            content:
              "Cette reconnaissance reflète la spécialisation, la gestion affinée, les capacités distinctives et l’innovation de FOREACH. L’entreprise poursuivra son travail sur les composants microfluidiques et les technologies fluidiques au service de ses clients internationaux.",
          },
        ],
        seoTitle:
          "FOREACH reconnue entreprise nationale spécialisée et innovante Little Giant",
        seoDescription:
          "FOREACH reçoit la reconnaissance nationale Little Giant pour sa spécialisation, son innovation et ses capacités industrielles dans le contrôle microfluidique.",
      },
      ko: {
        title: "FOREACH, 중국 국가급 전정특신 ‘작은 거인’ 기업으로 선정",
        summary:
          "FOREACH는 미세유체 제어 분야에서의 장기적인 전문성, 기술 혁신 및 산업화 역량을 인정받아 국가급 전정특신 ‘작은 거인’ 기업으로 선정되었습니다.",
        content: [
          {
            title: "국가급 전정특신 ‘작은 거인’ 기업 인정",
            content:
              "FOREACH는 2024년 9월 2일 발표된 중국 국가급 전문화·정밀화·특색화·혁신형 ‘작은 거인’ 기업 명단에 선정되었습니다. 이는 미세유체 제어 분야에 대한 집중적인 전문성과 지속적인 혁신 역량을 인정받은 결과입니다.",
          },
          {
            title: "미세유체 핵심 부품에 대한 장기적인 집중",
            content:
              "FOREACH는 펌프, 밸브, 프로브, 피팅, 튜브 연결부, 센서 및 유로 시스템 지원 기술을 개발하고 산업화하여 IVD, 생명과학, 실험실 자동화, 분석기기 등 다양한 분야에 적용하고 있습니다.",
          },
          {
            title: "개발부터 적용까지 이어지는 엔지니어링 역량",
            content:
              "제품 선정, 재질 호환성, 유체 파라미터부터 샘플 검증, 맞춤 개발과 양산 납품에 이르기까지 FOREACH는 연구개발, 생산, 검사 및 기술지원 역량을 지속적으로 강화하고 있습니다.",
          },
          {
            title: "지속적인 발전을 위한 새로운 출발점",
            content:
              "이번 국가급 인정은 FOREACH의 전문화, 정밀화, 차별화 및 혁신 역량을 보여줍니다. FOREACH는 앞으로도 미세유체 핵심 부품과 유로 기술에 집중하여 글로벌 고객에게 안정적인 제품과 전문적인 지원을 제공하겠습니다.",
          },
        ],
        seoTitle: "FOREACH, 중국 국가급 전정특신 작은 거인 기업 선정",
        seoDescription:
          "FOREACH는 미세유체 제어 분야의 전문성, 혁신 및 산업화 역량을 인정받아 중국 국가급 전정특신 작은 거인 기업으로 선정되었습니다.",
      },
      ru: {
        title:
          "FOREACH получила статус национального специализированного и инновационного предприятия «Little Giant»",
        summary:
          "FOREACH получила национальное признание за специализацию, инновации и промышленную компетенцию в области микрофлюидного управления.",
        content: [
          {
            title: "Национальное признание специализированного и инновационного предприятия",
            content:
              "FOREACH вошла в национальный перечень специализированных, технологичных, отличительных и инновационных предприятий «Little Giant», опубликованный 2 сентября 2024 года, благодаря целенаправленной экспертизе и постоянным инновациям в микрофлюидном управлении.",
          },
          {
            title: "Долгосрочная специализация на микрофлюидных компонентах",
            content:
              "FOREACH разрабатывает и промышленно выпускает насосы, клапаны, пробоотборные элементы, фитинги, соединения трубок, датчики и решения для жидкостных трактов в IVD, науках о жизни, лабораторной автоматизации и аналитических приборах.",
          },
          {
            title: "Инженерные компетенции от разработки до применения",
            content:
              "От выбора продукции, совместимости материалов и параметров потока до валидации образцов, индивидуальной разработки и серийных поставок FOREACH последовательно развивает НИОКР, производство, контроль и инженерную поддержку.",
          },
          {
            title: "Новая точка роста",
            content:
              "Признание отражает специализацию, точное управление, отличительные компетенции и инновационный потенциал FOREACH. Компания продолжит развивать микрофлюидные компоненты и технологии жидкостных трактов для клиентов по всему миру.",
          },
        ],
        seoTitle:
          "FOREACH — национальное специализированное и инновационное предприятие Little Giant",
        seoDescription:
          "FOREACH получила национальный статус Little Giant за специализацию, инновации и промышленную компетенцию в области микрофлюидики.",
      },
    },
  },
  {
    id: "iso-9001-certification-2023",
    slug: "iso-9001-certification-2023",
    category: "company",
    date: "2023-11-21",
    coverImage: "/images/about/quality-certificates/iso-9001.webp",
    copies: {
      "zh-CN": {
        title: "恒永达通过 ISO 9001 质量管理体系认证",
        summary:
          "恒永达通过 ISO 9001 质量管理体系认证，以标准化流程支撑研发、制造、检测、交付和持续改进。",
        content: [
          {
            title: "通过 ISO 9001 质量管理体系认证",
            content:
              "根据证书签发信息，深圳市恒永达科技股份有限公司于 2023 年 11 月 21 日通过 ISO 9001 质量管理体系认证。该认证体现了公司在质量方针、过程管理、文件记录、客户需求响应和持续改进等方面建立的系统化管理基础。",
          },
          {
            title: "覆盖研发、制造与交付全过程",
            content:
              "恒永达将质量管理要求融入产品研发、供应链管理、生产装配、过程检验、成品测试和交付服务，通过明确职责、标准化作业与记录管理，提高产品和服务过程的一致性。",
          },
          {
            title: "为客户项目提供稳定支持",
            content:
              "对于微流体核心部件而言，尺寸、密封、流量、压力及电气性能的一致性直接影响设备运行。标准化质量体系有助于降低过程波动，为样品验证、项目导入和批量供应提供更加稳定的管理基础。",
          },
          {
            title: "以持续改进推动长期发展",
            content:
              "通过认证不是质量工作的终点。恒永达将继续结合客户反馈、内部审核、过程数据和异常闭环，不断优化产品、流程与服务能力，为客户提供可靠的微流体部件与工程支持。",
          },
        ],
        seoTitle: "恒永达通过 ISO 9001 质量管理体系认证",
        seoDescription:
          "恒永达通过 ISO 9001 质量管理体系认证，以标准化流程和持续改进支撑微流体部件研发、制造、检测与交付。",
      },
      en: {
        title: "FOREACH Achieves ISO 9001 Quality Management System Certification",
        summary:
          "FOREACH achieved ISO 9001 certification, strengthening standardized management across R&D, manufacturing, inspection, delivery, and continual improvement.",
        content: [
          {
            title: "ISO 9001 Quality Management System Certification",
            content:
              "According to the certificate issue information, Shenzhen FOREACH Technology Co., Ltd. achieved ISO 9001 quality management system certification on November 21, 2023. The certification reflects a systematic foundation for quality objectives, process management, documentation, customer response, and continual improvement.",
          },
          {
            title: "Quality Management Across Development and Delivery",
            content:
              "FOREACH integrates quality requirements into product development, supply chain management, assembly, process inspection, final testing, and delivery service. Defined responsibilities, standardized work instructions, and controlled records help improve process consistency.",
          },
          {
            title: "Stable Support for Customer Programs",
            content:
              "For microfluidic components, consistency in dimensions, sealing, flow, pressure, and electrical performance directly affects instrument operation. A standardized quality system supports sample validation, project introduction, and repeatable volume supply.",
          },
          {
            title: "Continual Improvement for Long-Term Development",
            content:
              "Certification is not the end of quality improvement. FOREACH will continue to use customer feedback, internal audits, process data, and closed-loop corrective actions to improve products, processes, and engineering support.",
          },
        ],
        seoTitle: "FOREACH Achieves ISO 9001 Quality Management System Certification",
        seoDescription:
          "FOREACH achieved ISO 9001 certification, supporting standardized development, manufacturing, inspection, delivery, and continual improvement for microfluidic components.",
      },
      es: {
        title: "FOREACH obtiene la certificación del sistema de gestión de calidad ISO 9001",
        summary:
          "FOREACH obtuvo la certificación ISO 9001 y refuerza la gestión normalizada en I+D, fabricación, inspección, entrega y mejora continua.",
        content: [
          {
            title: "Certificación ISO 9001",
            content:
              "Según la información de emisión del certificado, Shenzhen FOREACH Technology Co., Ltd. obtuvo la certificación ISO 9001 el 21 de noviembre de 2023. La certificación refleja una base sistemática para objetivos de calidad, gestión de procesos, documentación, respuesta al cliente y mejora continua.",
          },
          {
            title: "Gestión de calidad desde el desarrollo hasta la entrega",
            content:
              "FOREACH integra los requisitos de calidad en el desarrollo, la cadena de suministro, el montaje, la inspección de procesos, las pruebas finales y la entrega. Las responsabilidades definidas, las instrucciones normalizadas y los registros controlados mejoran la consistencia.",
          },
          {
            title: "Soporte estable para los proyectos de clientes",
            content:
              "En los componentes microfluídicos, la consistencia de dimensiones, estanqueidad, caudal, presión y rendimiento eléctrico influye directamente en el funcionamiento del equipo. Un sistema normalizado apoya la validación, la introducción del proyecto y el suministro en serie.",
          },
          {
            title: "Mejora continua a largo plazo",
            content:
              "La certificación no es el final del trabajo de calidad. FOREACH seguirá utilizando la retroalimentación del cliente, auditorías internas, datos de proceso y acciones correctivas para mejorar productos, procesos y soporte técnico.",
          },
        ],
        seoTitle: "FOREACH obtiene la certificación ISO 9001",
        seoDescription:
          "FOREACH obtuvo la certificación ISO 9001 para reforzar la gestión normalizada del desarrollo, la fabricación, la inspección, la entrega y la mejora continua.",
      },
      fr: {
        title: "FOREACH obtient la certification du système de management de la qualité ISO 9001",
        summary:
          "FOREACH obtient la certification ISO 9001 et renforce la gestion normalisée de la R&D, de la fabrication, du contrôle, de la livraison et de l’amélioration continue.",
        content: [
          {
            title: "Certification ISO 9001",
            content:
              "Selon les informations de délivrance du certificat, Shenzhen FOREACH Technology Co., Ltd. a obtenu la certification ISO 9001 le 21 novembre 2023. Elle reflète une base structurée pour les objectifs qualité, la maîtrise des processus, la documentation, la réponse client et l’amélioration continue.",
          },
          {
            title: "La qualité du développement à la livraison",
            content:
              "FOREACH intègre les exigences qualité au développement, à la chaîne d’approvisionnement, à l’assemblage, au contrôle en cours de production, aux essais finaux et à la livraison. Des responsabilités claires, des instructions normalisées et des enregistrements maîtrisés améliorent la cohérence.",
          },
          {
            title: "Un soutien stable aux projets clients",
            content:
              "Pour les composants microfluidiques, la régularité des dimensions, de l’étanchéité, du débit, de la pression et des performances électriques influence directement le fonctionnement des équipements. Un système normalisé soutient la validation, l’introduction du projet et la production en série.",
          },
          {
            title: "L’amélioration continue sur le long terme",
            content:
              "La certification ne constitue pas une fin. FOREACH continuera d’exploiter les retours clients, les audits internes, les données de processus et les actions correctives afin d’améliorer ses produits, ses processus et son assistance technique.",
          },
        ],
        seoTitle: "FOREACH obtient la certification ISO 9001",
        seoDescription:
          "FOREACH obtient la certification ISO 9001 afin de renforcer la gestion normalisée du développement, de la fabrication, du contrôle, de la livraison et de l’amélioration continue.",
      },
      ko: {
        title: "FOREACH, ISO 9001 품질경영시스템 인증 획득",
        summary:
          "FOREACH는 ISO 9001 인증을 획득하여 연구개발, 생산, 검사, 납품 및 지속적 개선 전반의 표준화된 관리를 강화했습니다.",
        content: [
          {
            title: "ISO 9001 품질경영시스템 인증",
            content:
              "인증서 발급 정보에 따르면 Shenzhen FOREACH Technology Co., Ltd.는 2023년 11월 21일 ISO 9001 품질경영시스템 인증을 획득했습니다. 이번 인증은 품질 목표, 공정 관리, 문서 기록, 고객 대응 및 지속적 개선을 위한 체계적인 관리 기반을 보여줍니다.",
          },
          {
            title: "개발부터 납품까지 이어지는 품질관리",
            content:
              "FOREACH는 제품 개발, 공급망 관리, 조립, 공정 검사, 최종 시험 및 납품 서비스에 품질 요구사항을 적용합니다. 명확한 책임, 표준 작업 지침과 통제된 기록을 통해 공정의 일관성을 높입니다.",
          },
          {
            title: "고객 프로젝트를 위한 안정적인 지원",
            content:
              "미세유체 부품의 치수, 밀봉, 유량, 압력 및 전기 성능의 일관성은 장비 운전에 직접적인 영향을 줍니다. 표준화된 품질시스템은 샘플 검증, 프로젝트 도입 및 반복 가능한 양산 공급을 지원합니다.",
          },
          {
            title: "장기적인 발전을 위한 지속적 개선",
            content:
              "인증은 품질개선의 끝이 아닙니다. FOREACH는 고객 피드백, 내부 심사, 공정 데이터와 폐쇄형 시정조치를 활용하여 제품, 공정 및 기술지원 역량을 지속적으로 개선하겠습니다.",
          },
        ],
        seoTitle: "FOREACH, ISO 9001 품질경영시스템 인증 획득",
        seoDescription:
          "FOREACH는 ISO 9001 인증을 통해 미세유체 부품의 개발, 생산, 검사, 납품 및 지속적 개선을 위한 표준화된 관리를 강화했습니다.",
      },
      ru: {
        title: "FOREACH получила сертификат системы менеджмента качества ISO 9001",
        summary:
          "FOREACH получила сертификат ISO 9001, укрепив стандартизированное управление НИОКР, производством, контролем, поставками и непрерывным улучшением.",
        content: [
          {
            title: "Сертификация ISO 9001",
            content:
              "Согласно данным сертификата, Shenzhen FOREACH Technology Co., Ltd. получила сертификацию ISO 9001 21 ноября 2023 года. Сертификация отражает системную основу для целей в области качества, управления процессами, документации, работы с заказчиками и непрерывного улучшения.",
          },
          {
            title: "Качество от разработки до поставки",
            content:
              "FOREACH включает требования качества в разработку, управление поставщиками, сборку, контроль процессов, финальные испытания и поставку. Четкие обязанности, стандартизированные инструкции и управляемые записи повышают стабильность процессов.",
          },
          {
            title: "Стабильная поддержка проектов заказчиков",
            content:
              "Для микрофлюидных компонентов повторяемость размеров, герметичности, расхода, давления и электрических характеристик напрямую влияет на работу оборудования. Стандартизированная система поддерживает валидацию образцов, ввод проекта и серийные поставки.",
          },
          {
            title: "Непрерывное улучшение",
            content:
              "Сертификация не завершает работу над качеством. FOREACH продолжит использовать обратную связь, внутренние аудиты, данные процессов и корректирующие действия для улучшения продукции, процессов и инженерной поддержки.",
          },
        ],
        seoTitle: "FOREACH получила сертификат ISO 9001",
        seoDescription:
          "FOREACH получила сертификат ISO 9001 для стандартизированного управления разработкой, производством, контролем, поставками и непрерывным улучшением.",
      },
    },
  },
  {
    id: "iso-13485-certification-2023",
    slug: "iso-13485-certification-2023",
    category: "company",
    date: "2023-11-15",
    coverImage: "/images/about/quality-certificates/iso-13485.webp",
    copies: {
      "zh-CN": {
        title: "恒永达通过 ISO 13485 医疗器械质量管理体系认证",
        summary:
          "恒永达通过 ISO 13485 医疗器械质量管理体系认证，进一步完善面向医疗器械及 IVD 项目的质量管理、过程控制与可追溯能力。",
        content: [
          {
            title: "通过 ISO 13485 医疗器械质量管理体系认证",
            content:
              "根据证书签发信息，深圳市恒永达科技股份有限公司于 2023 年 11 月 15 日通过 ISO 13485 医疗器械质量管理体系认证。该认证为公司面向医疗器械相关客户开展项目导入、质量审核和供应链协作提供了体系基础。",
          },
          {
            title: "强化风险意识、过程控制与可追溯性",
            content:
              "ISO 13485 更加关注医疗器械相关产品和服务过程中的风险管理、文件控制、生产过程、检验记录和可追溯要求。恒永达将相关要求落实到研发验证、物料管理、生产装配、性能检测、变更管理及交付记录中。",
          },
          {
            title: "支持 IVD 与生命科学设备项目",
            content:
              "微流体泵、阀、传感器、针、接头和管路组件广泛应用于 IVD、生命科学及实验室设备。规范的质量管理体系有助于提高批次一致性、记录完整性和项目沟通效率，更好地配合客户的供应商审核与产品导入。",
          },
          {
            title: "持续提升医疗相关领域服务能力",
            content:
              "恒永达将以 ISO 13485 质量管理体系为基础，持续完善风险识别、过程验证、质量记录、异常处理和持续改进机制，为医疗器械及生命科学客户提供可靠的微流体核心部件和工程支持。",
          },
        ],
        seoTitle: "恒永达通过 ISO 13485 医疗器械质量管理体系认证",
        seoDescription:
          "恒永达通过 ISO 13485 认证，进一步完善面向医疗器械、IVD 与生命科学项目的过程控制、质量记录和可追溯能力。",
      },
      en: {
        title:
          "FOREACH Achieves ISO 13485 Medical Device Quality Management System Certification",
        summary:
          "FOREACH achieved ISO 13485 certification, strengthening quality management, process control, documentation, and traceability for medical device and IVD-related programs.",
        content: [
          {
            title: "ISO 13485 Medical Device Quality Management System Certification",
            content:
              "According to the certificate issue information, Shenzhen FOREACH Technology Co., Ltd. achieved ISO 13485 certification on November 15, 2023. The certification provides a quality-system foundation for project introduction, supplier qualification, and cooperation with medical device-related customers.",
          },
          {
            title: "Risk Awareness, Process Control, and Traceability",
            content:
              "ISO 13485 places particular emphasis on risk-based quality management, document control, production processes, inspection records, and traceability. FOREACH incorporates these requirements into engineering validation, material management, assembly, performance testing, change control, and delivery records.",
          },
          {
            title: "Supporting IVD and Life Science Instrument Programs",
            content:
              "Microfluidic pumps, valves, sensors, probes, fittings, and tubing assemblies are widely used in IVD, life science, and laboratory equipment. A structured quality system supports lot consistency, complete documentation, supplier audits, and efficient product introduction.",
          },
          {
            title: "Continued Improvement for Medical-Related Applications",
            content:
              "Based on the ISO 13485 quality system, FOREACH will continue to improve risk identification, process validation, quality records, nonconformance handling, and continual improvement to provide reliable microfluidic components and engineering support.",
          },
        ],
        seoTitle:
          "FOREACH Achieves ISO 13485 Medical Device Quality Management System Certification",
        seoDescription:
          "FOREACH achieved ISO 13485 certification, strengthening process control, documentation, traceability, and quality support for medical device, IVD, and life science programs.",
      },
      es: {
        title:
          "FOREACH obtiene la certificación ISO 13485 para sistemas de gestión de calidad de dispositivos médicos",
        summary:
          "FOREACH obtuvo la certificación ISO 13485 y refuerza la gestión de calidad, el control de procesos, la documentación y la trazabilidad para proyectos médicos e IVD.",
        content: [
          {
            title: "Certificación ISO 13485",
            content:
              "Según la información de emisión del certificado, Shenzhen FOREACH Technology Co., Ltd. obtuvo la certificación ISO 13485 el 15 de noviembre de 2023. La certificación establece una base de gestión para la introducción de proyectos, la evaluación de proveedores y la cooperación con clientes de dispositivos médicos.",
          },
          {
            title: "Riesgos, control de procesos y trazabilidad",
            content:
              "ISO 13485 presta especial atención a la gestión basada en riesgos, el control documental, los procesos de producción, los registros de inspección y la trazabilidad. FOREACH aplica estos requisitos a la validación, los materiales, el montaje, las pruebas, los cambios y la entrega.",
          },
          {
            title: "Apoyo a proyectos IVD y de ciencias de la vida",
            content:
              "Las bombas, válvulas, sensores, sondas, racores y conjuntos de tubos microfluídicos se utilizan ampliamente en IVD, ciencias de la vida y equipos de laboratorio. Un sistema estructurado apoya la consistencia de lotes, la documentación, las auditorías y la introducción de productos.",
          },
          {
            title: "Mejora continua para aplicaciones médicas",
            content:
              "Sobre la base de ISO 13485, FOREACH seguirá mejorando la identificación de riesgos, la validación de procesos, los registros de calidad, la gestión de no conformidades y la mejora continua para ofrecer componentes y soporte fiables.",
          },
        ],
        seoTitle: "FOREACH obtiene la certificación ISO 13485",
        seoDescription:
          "FOREACH obtuvo la certificación ISO 13485 y refuerza el control de procesos, la documentación y la trazabilidad para proyectos médicos, IVD y de ciencias de la vida.",
      },
      fr: {
        title:
          "FOREACH obtient la certification ISO 13485 pour le management de la qualité des dispositifs médicaux",
        summary:
          "FOREACH obtient la certification ISO 13485 et renforce la qualité, la maîtrise des processus, la documentation et la traçabilité pour les projets médicaux et IVD.",
        content: [
          {
            title: "Certification ISO 13485",
            content:
              "Selon les informations de délivrance du certificat, Shenzhen FOREACH Technology Co., Ltd. a obtenu la certification ISO 13485 le 15 novembre 2023. Cette certification constitue une base de management pour l’introduction de projets, la qualification des fournisseurs et la coopération avec les clients du secteur médical.",
          },
          {
            title: "Risques, maîtrise des processus et traçabilité",
            content:
              "ISO 13485 accorde une attention particulière à la gestion fondée sur les risques, à la maîtrise documentaire, aux processus de production, aux enregistrements de contrôle et à la traçabilité. FOREACH applique ces exigences à la validation, aux matériaux, à l’assemblage, aux essais, aux modifications et à la livraison.",
          },
          {
            title: "Accompagner les projets IVD et sciences de la vie",
            content:
              "Les pompes, vannes, capteurs, sondes, raccords et ensembles de tubes microfluidiques sont largement utilisés dans l’IVD, les sciences de la vie et les équipements de laboratoire. Un système structuré soutient la constance des lots, la documentation, les audits fournisseurs et l’introduction de produits.",
          },
          {
            title: "Amélioration continue pour les applications médicales",
            content:
              "Sur la base du système ISO 13485, FOREACH continuera d’améliorer l’identification des risques, la validation des processus, les enregistrements qualité, la gestion des non-conformités et l’amélioration continue afin de fournir des composants et un support fiables.",
          },
        ],
        seoTitle: "FOREACH obtient la certification ISO 13485",
        seoDescription:
          "FOREACH obtient la certification ISO 13485 et renforce la maîtrise des processus, la documentation et la traçabilité pour les projets médicaux, IVD et sciences de la vie.",
      },
      ko: {
        title: "FOREACH, ISO 13485 의료기기 품질경영시스템 인증 획득",
        summary:
          "FOREACH는 ISO 13485 인증을 획득하여 의료기기 및 IVD 프로젝트를 위한 품질관리, 공정 통제, 문서화와 추적성을 강화했습니다.",
        content: [
          {
            title: "ISO 13485 의료기기 품질경영시스템 인증",
            content:
              "인증서 발급 정보에 따르면 Shenzhen FOREACH Technology Co., Ltd.는 2023년 11월 15일 ISO 13485 인증을 획득했습니다. 이번 인증은 의료기기 관련 고객의 프로젝트 도입, 공급업체 평가 및 협업을 위한 품질시스템 기반을 제공합니다.",
          },
          {
            title: "위험 인식, 공정 통제 및 추적성 강화",
            content:
              "ISO 13485는 위험 기반 품질관리, 문서 통제, 생산 공정, 검사 기록과 추적성을 중요하게 다룹니다. FOREACH는 이러한 요구사항을 엔지니어링 검증, 자재 관리, 조립, 성능 시험, 변경관리 및 납품 기록에 적용합니다.",
          },
          {
            title: "IVD 및 생명과학 장비 프로젝트 지원",
            content:
              "미세유체 펌프, 밸브, 센서, 프로브, 피팅 및 튜브 어셈블리는 IVD, 생명과학 및 실험실 장비에 폭넓게 사용됩니다. 체계적인 품질시스템은 로트 일관성, 기록 완전성, 공급업체 심사와 제품 도입을 지원합니다.",
          },
          {
            title: "의료 관련 적용을 위한 지속적 개선",
            content:
              "FOREACH는 ISO 13485 품질시스템을 기반으로 위험 식별, 공정 검증, 품질 기록, 부적합 관리 및 지속적 개선 체계를 강화하여 신뢰할 수 있는 미세유체 부품과 기술지원을 제공하겠습니다.",
          },
        ],
        seoTitle: "FOREACH, ISO 13485 의료기기 품질경영시스템 인증 획득",
        seoDescription:
          "FOREACH는 ISO 13485 인증을 통해 의료기기, IVD 및 생명과학 프로젝트의 공정 통제, 문서화와 추적성을 강화했습니다.",
      },
      ru: {
        title:
          "FOREACH получила сертификат ISO 13485 для системы менеджмента качества медицинских изделий",
        summary:
          "FOREACH получила сертификат ISO 13485, усилив управление качеством, контроль процессов, документацию и прослеживаемость для медицинских и IVD-проектов.",
        content: [
          {
            title: "Сертификация ISO 13485",
            content:
              "Согласно данным сертификата, Shenzhen FOREACH Technology Co., Ltd. получила сертификацию ISO 13485 15 ноября 2023 года. Сертификация создает основу для запуска проектов, квалификации поставщика и сотрудничества с заказчиками в сфере медицинского оборудования.",
          },
          {
            title: "Риски, контроль процессов и прослеживаемость",
            content:
              "ISO 13485 уделяет особое внимание риск-ориентированному управлению качеством, контролю документации, производственным процессам, записям контроля и прослеживаемости. FOREACH применяет эти требования к валидации, материалам, сборке, испытаниям, изменениям и поставкам.",
          },
          {
            title: "Поддержка проектов IVD и наук о жизни",
            content:
              "Микрофлюидные насосы, клапаны, датчики, пробоотборные элементы, фитинги и трубные сборки широко применяются в IVD, науках о жизни и лабораторном оборудовании. Структурированная система поддерживает стабильность партий, полноту записей, аудиты поставщиков и ввод продукции.",
          },
          {
            title: "Непрерывное улучшение для медицинских применений",
            content:
              "На основе системы ISO 13485 FOREACH продолжит совершенствовать идентификацию рисков, валидацию процессов, записи качества, управление несоответствиями и непрерывное улучшение, обеспечивая надежные компоненты и инженерную поддержку.",
          },
        ],
        seoTitle: "FOREACH получила сертификат ISO 13485",
        seoDescription:
          "FOREACH получила сертификат ISO 13485, усилив контроль процессов, документацию и прослеживаемость для медицинских, IVD- и биотехнологических проектов.",
      },
    },
  },
];

export function getQualityAndRecognitionArticles(
  locale: NewsLocale
): NewsArticle[] {
  return qualityAndRecognitionArticles.map((definition) => {
    const copy = definition.copies[locale];

    return {
      id: definition.id,
      slug: definition.slug,
      category: definition.category,
      date: definition.date,
      coverImage: definition.coverImage,
      isPinned: definition.isPinned,
      title: copy.title,
      summary: copy.summary,
      content: copy.content,
      seoTitle: copy.seoTitle,
      seoDescription: copy.seoDescription,
    };
  });
}
