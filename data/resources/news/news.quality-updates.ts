/* =========================================================
   news.quality-updates.ts
   恒永达官网｜质量体系、企业荣誉与生产制造专题新闻

   说明：
   1. 本文件包含 ISO 9001、ISO 13485、小巨人及生产制造专题
   2. 六种语言在同一份数据中维护
   3. 图片全部复用官网现有资源
   4. 相同 slug 会覆盖原新闻，避免重复
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
    "id": "quality-manufacturing-capability-2026",
    "slug": "quality-manufacturing-capability-2026",
    "category": "company",
    "date": "2026-07-23",
    "coverImage": "/images/about/quality-cert-bg.webp",
    "isPinned": true,
    "copies": {
      "zh-CN": {
        "title": "从研发验证到稳定交付：走进恒永达生产制造与质量保障体系",
        "summary": "恒永达将质量管理贯穿供应链、研发验证、生产制造、检测放行和客户反馈全过程，以标准化流程与数字化记录支撑微流体核心部件稳定交付。",
        "content": [
          {
            "title": "质量贯穿产品全生命周期",
            "content": "微流体核心部件体积虽小，却直接影响整机液路的流量、压力、密封性和运行稳定性。恒永达围绕泵、阀、传感器、针、管路连接件等产品，将质量要求落实到供应商管理、材料确认、研发验证、生产装配、终检放行和交付服务等环节。"
          },
          {
            "title": "标准化流程与数字化记录",
            "content": "公司通过 PDM、ERP、MES、SVN 等电子化数据平台，对关键物料、工艺过程、检验记录、版本文件和交付信息进行记录、流转与更新，使产品从物料、制造、检测到交付的全过程更加可追溯、可验证。"
          },
          {
            "title": "检测与验证支撑稳定交付",
            "content": "在研发与制造过程中，恒永达围绕关键尺寸、外观结构、装配状态、密封性、压力、流量及电气性能开展检测与确认，并通过精密测量设备、测试工装和过程记录，为产品一致性和批量交付提供依据。"
          },
          {
            "title": "持续改进面向客户应用",
            "content": "当来料、制造、终检或客户使用环节出现异常时，相关信息将进入不合格品控制、原因分析、纠正措施、复检确认和反馈改进流程。恒永达将持续以稳定产品和专业工程支持，服务 IVD、生命科学、实验室自动化、分析仪器等领域客户。"
          }
        ],
        "seoTitle": "恒永达生产制造与质量保障体系｜从研发验证到稳定交付",
        "seoDescription": "了解恒永达如何通过供应链管理、研发验证、生产制造、精密检测和数字化记录，保障微流体核心部件稳定交付。"
      },
      "en": {
        "title": "From Engineering Validation to Reliable Delivery: Inside FOREACH Manufacturing and Quality Assurance",
        "summary": "FOREACH integrates quality management across supplier control, engineering validation, manufacturing, final inspection, delivery, and customer feedback to support reliable microfluidic component supply.",
        "content": [
          {
            "title": "Quality Across the Product Lifecycle",
            "content": "Although microfluidic components are compact, they directly affect flow, pressure, sealing, and long-term instrument stability. FOREACH applies quality requirements across supplier management, material verification, engineering validation, assembly, final inspection, and delivery."
          },
          {
            "title": "Standardized Processes and Digital Records",
            "content": "PDM, ERP, MES, and SVN platforms are used to manage key materials, process information, inspection records, document versions, and delivery data, improving traceability and verification throughout the product lifecycle."
          },
          {
            "title": "Inspection and Validation for Reliable Delivery",
            "content": "FOREACH verifies critical dimensions, appearance, assembly status, sealing, pressure, flow, and electrical performance through precision measuring equipment, dedicated fixtures, and process records."
          },
          {
            "title": "Continuous Improvement for Customer Applications",
            "content": "Quality issues identified during incoming inspection, manufacturing, final inspection, or customer use enter a closed-loop process covering nonconforming product control, cause analysis, corrective action, reinspection, and improvement."
          }
        ],
        "seoTitle": "FOREACH Manufacturing and Quality Assurance | Reliable Microfluidic Component Delivery",
        "seoDescription": "Learn how FOREACH uses supplier control, engineering validation, manufacturing, precision inspection, and digital records to support reliable microfluidic component delivery."
      },
      "es": {
        "title": "De la validación de ingeniería a una entrega fiable: fabricación y aseguramiento de calidad en FOREACH",
        "summary": "FOREACH integra la gestión de calidad en el control de proveedores, la validación, la fabricación, la inspección final, la entrega y la retroalimentación del cliente.",
        "content": [
          {
            "title": "Calidad durante todo el ciclo de vida",
            "content": "Aunque los componentes microfluídicos son pequeños, influyen directamente en el caudal, la presión, la estanqueidad y la estabilidad del instrumento. FOREACH aplica requisitos de calidad desde los proveedores hasta la entrega."
          },
          {
            "title": "Procesos estandarizados y registros digitales",
            "content": "Las plataformas PDM, ERP, MES y SVN permiten gestionar materiales, procesos, inspecciones, versiones de documentos y datos de entrega, mejorando la trazabilidad."
          },
          {
            "title": "Inspección y validación para una entrega estable",
            "content": "FOREACH verifica dimensiones, apariencia, montaje, estanqueidad, presión, caudal y rendimiento eléctrico mediante equipos de medición, utillajes y registros de proceso."
          },
          {
            "title": "Mejora continua orientada a la aplicación",
            "content": "Las incidencias detectadas durante la recepción, fabricación, inspección final o uso del cliente se gestionan mediante análisis de causas, acciones correctivas, reinspección y mejora."
          }
        ],
        "seoTitle": "Fabricación y aseguramiento de calidad FOREACH",
        "seoDescription": "Conozca cómo FOREACH utiliza validación, fabricación, inspección de precisión y registros digitales para garantizar componentes microfluídicos fiables."
      },
      "fr": {
        "title": "De la validation technique à une livraison fiable : fabrication et assurance qualité chez FOREACH",
        "summary": "FOREACH intègre la qualité dans le contrôle fournisseurs, la validation, la fabrication, le contrôle final, la livraison et le retour client.",
        "content": [
          {
            "title": "La qualité sur tout le cycle de vie",
            "content": "Malgré leur petite taille, les composants microfluidiques influencent directement le débit, la pression, l’étanchéité et la stabilité des instruments. FOREACH applique des exigences qualité de l’approvisionnement à la livraison."
          },
          {
            "title": "Processus standardisés et données numériques",
            "content": "Les plateformes PDM, ERP, MES et SVN permettent de gérer les matières, les processus, les contrôles, les versions documentaires et les informations de livraison."
          },
          {
            "title": "Contrôle et validation pour une livraison stable",
            "content": "FOREACH vérifie les dimensions critiques, l’apparence, l’assemblage, l’étanchéité, la pression, le débit et les performances électriques."
          },
          {
            "title": "Amélioration continue orientée client",
            "content": "Les anomalies détectées à la réception, en fabrication, au contrôle final ou chez le client sont traitées par analyse des causes, action corrective, recontrôle et amélioration."
          }
        ],
        "seoTitle": "Fabrication et assurance qualité FOREACH",
        "seoDescription": "Découvrez comment FOREACH associe validation, fabrication, contrôle de précision et traçabilité numérique pour fournir des composants microfluidiques fiables."
      },
      "ko": {
        "title": "설계 검증부터 안정적인 납품까지: FOREACH 생산 및 품질 보증 체계",
        "summary": "FOREACH는 공급망, 설계 검증, 생산, 최종 검사, 납품 및 고객 피드백 전 과정에 품질 관리를 적용합니다.",
        "content": [
          {
            "title": "제품 전 수명주기에 적용되는 품질 관리",
            "content": "미세유체 부품은 크기가 작지만 유량, 압력, 밀봉 성능과 장비 안정성에 직접적인 영향을 줍니다. FOREACH는 공급업체 관리부터 최종 납품까지 품질 요구사항을 적용합니다."
          },
          {
            "title": "표준화된 프로세스와 디지털 기록",
            "content": "PDM, ERP, MES, SVN 시스템을 활용하여 핵심 자재, 공정, 검사 기록, 문서 버전 및 납품 정보를 관리하고 추적성을 높입니다."
          },
          {
            "title": "안정적인 납품을 위한 검사와 검증",
            "content": "정밀 측정 장비와 전용 시험 장치를 통해 치수, 외관, 조립 상태, 밀봉, 압력, 유량 및 전기 성능을 확인합니다."
          },
          {
            "title": "고객 적용을 위한 지속적인 개선",
            "content": "입고, 생산, 최종 검사 또는 고객 사용 과정에서 발견된 이상은 원인 분석, 시정 조치, 재검사 및 개선 절차를 통해 관리됩니다."
          }
        ],
        "seoTitle": "FOREACH 생산 및 품질 보증 체계",
        "seoDescription": "FOREACH가 설계 검증, 생산, 정밀 검사 및 디지털 기록을 통해 미세유체 부품의 안정적인 납품을 지원하는 방법을 소개합니다."
      },
      "ru": {
        "title": "От инженерной валидации до стабильных поставок: производство и обеспечение качества FOREACH",
        "summary": "FOREACH применяет управление качеством на этапах работы с поставщиками, валидации, производства, финального контроля, поставки и обратной связи.",
        "content": [
          {
            "title": "Качество на всем жизненном цикле",
            "content": "Несмотря на малые размеры, микрофлюидные компоненты напрямую влияют на расход, давление, герметичность и стабильность оборудования. FOREACH контролирует качество от поставщиков до поставки."
          },
          {
            "title": "Стандартизированные процессы и цифровые записи",
            "content": "Системы PDM, ERP, MES и SVN используются для управления материалами, процессами, результатами контроля, версиями документов и данными поставки."
          },
          {
            "title": "Контроль и валидация для надежной поставки",
            "content": "FOREACH проверяет размеры, внешний вид, сборку, герметичность, давление, расход и электрические характеристики с помощью измерительного оборудования и испытательной оснастки."
          },
          {
            "title": "Непрерывное улучшение для задач клиентов",
            "content": "Несоответствия, выявленные при приемке, производстве, финальном контроле или эксплуатации, проходят анализ причин, корректирующие действия, повторную проверку и улучшение."
          }
        ],
        "seoTitle": "Производство и обеспечение качества FOREACH",
        "seoDescription": "Узнайте, как FOREACH использует валидацию, производство, точный контроль и цифровую прослеживаемость для стабильных поставок микрофлюидных компонентов."
      }
    }
  },
  {
    "id": "national-little-giant-2024",
    "slug": "national-little-giant-2024",
    "category": "company",
    "date": "2024-09-06",
    "coverImage": "/images/home/company-honors-original/little-giant.png",
    "copies": {
      "zh-CN": {
        "title": "恒永达获评国家级专精特新“小巨人”企业",
        "summary": "恒永达凭借在微流体控制领域的长期专注、技术积累与创新能力，获评国家级专精特新“小巨人”企业。",
        "content": [
          {
            "title": "获得国家级企业认定",
            "content": "在国家级专精特新“小巨人”企业相关公示名单中，深圳市恒永达科技股份有限公司凭借在微流体控制领域的专业化发展、技术创新和产业化能力获得认定。"
          },
          {
            "title": "长期专注微流体核心部件",
            "content": "恒永达持续围绕泵、阀、针、传感器、管路连接件及液路系统支持能力开展研发与产品建设，服务 IVD、生命科学、实验室自动化、分析仪器等应用领域。"
          },
          {
            "title": "以专业能力服务客户",
            "content": "此次认定是对公司专业化、精细化、特色化和创新能力的阶段性认可。恒永达将继续完善产品、制造、质量和工程支持能力，为客户提供稳定可靠的微流体核心部件与流体系统支持。"
          }
        ],
        "seoTitle": "恒永达获评国家级专精特新“小巨人”企业",
        "seoDescription": "恒永达凭借在微流体控制领域的长期专注、技术积累与创新能力，获评国家级专精特新“小巨人”企业。"
      },
      "en": {
        "title": "FOREACH Recognized as a National-Level Specialized and Innovative “Little Giant” Enterprise",
        "summary": "FOREACH received national-level recognition for its specialization, technology development, and innovation in microfluidic control.",
        "content": [
          {
            "title": "National-Level Enterprise Recognition",
            "content": "FOREACH was included in the national-level list of Specialized, Sophisticated, Distinctive and Innovative “Little Giant” enterprises, recognizing its focused development and innovation capability in microfluidic control."
          },
          {
            "title": "Long-Term Focus on Core Microfluidic Components",
            "content": "FOREACH develops pumps, valves, probes, sensors, fittings, tubing components, and fluidic system support for IVD, life science, laboratory automation, and analytical instruments."
          },
          {
            "title": "Professional Capability for Customer Applications",
            "content": "The recognition reflects the company’s specialization and innovation. FOREACH will continue to strengthen product development, manufacturing, quality assurance, and engineering support."
          }
        ],
        "seoTitle": "FOREACH Recognized as a National-Level Specialized and Innovative Little Giant Enterprise",
        "seoDescription": "FOREACH received national-level recognition for specialization and innovation in microfluidic components and fluid control technologies."
      },
      "es": {
        "title": "FOREACH reconocida como empresa nacional especializada e innovadora “Pequeño Gigante”",
        "summary": "FOREACH recibió este reconocimiento nacional por su especialización, desarrollo tecnológico e innovación en control microfluídico.",
        "content": [
          {
            "title": "Reconocimiento empresarial nacional",
            "content": "FOREACH fue incluida en la lista nacional de empresas especializadas, refinadas, diferenciadas e innovadoras conocidas como “Pequeño Gigante”."
          },
          {
            "title": "Enfoque continuo en componentes microfluídicos",
            "content": "FOREACH desarrolla bombas, válvulas, sondas, sensores, racores, tubos y soporte de sistemas para IVD, ciencias de la vida, automatización de laboratorio e instrumentos analíticos."
          },
          {
            "title": "Capacidad profesional para los clientes",
            "content": "El reconocimiento refleja la especialización e innovación de la empresa. FOREACH continuará reforzando el desarrollo, la fabricación, la calidad y el soporte técnico."
          }
        ],
        "seoTitle": "FOREACH reconocida como empresa nacional Pequeño Gigante",
        "seoDescription": "FOREACH obtuvo reconocimiento nacional por su especialización e innovación en componentes microfluídicos y control de fluidos."
      },
      "fr": {
        "title": "FOREACH reconnue comme entreprise nationale spécialisée et innovante « Little Giant »",
        "summary": "Cette reconnaissance nationale souligne la spécialisation, le développement technologique et l’innovation de FOREACH dans le contrôle microfluidique.",
        "content": [
          {
            "title": "Une reconnaissance nationale",
            "content": "FOREACH a intégré la liste nationale des entreprises spécialisées, performantes, distinctives et innovantes dites « Little Giant »."
          },
          {
            "title": "Un engagement durable dans la microfluidique",
            "content": "FOREACH développe pompes, vannes, sondes, capteurs, raccords, tubes et support de systèmes pour l’IVD, les sciences de la vie, l’automatisation de laboratoire et l’analyse."
          },
          {
            "title": "Des compétences au service des clients",
            "content": "Cette reconnaissance reflète la spécialisation et l’innovation de l’entreprise. FOREACH continuera de renforcer le développement produit, la fabrication, la qualité et l’accompagnement technique."
          }
        ],
        "seoTitle": "FOREACH reconnue entreprise nationale Little Giant",
        "seoDescription": "FOREACH obtient une reconnaissance nationale pour sa spécialisation et son innovation dans les composants microfluidiques."
      },
      "ko": {
        "title": "FOREACH, 중국 국가급 전정특신 ‘작은 거인’ 기업으로 선정",
        "summary": "FOREACH는 미세유체 제어 분야의 전문성, 기술 개발 및 혁신 역량을 인정받았습니다.",
        "content": [
          {
            "title": "국가급 기업 인정",
            "content": "FOREACH는 전문화·정밀화·특색화·혁신 역량을 갖춘 기업을 대상으로 하는 중국 국가급 전정특신 ‘작은 거인’ 기업 명단에 선정되었습니다."
          },
          {
            "title": "미세유체 핵심 부품에 대한 지속적인 집중",
            "content": "FOREACH는 IVD, 생명과학, 실험실 자동화 및 분석기기를 위한 펌프, 밸브, 프로브, 센서, 피팅 및 튜빙 부품을 개발합니다."
          },
          {
            "title": "고객 적용을 위한 전문 역량",
            "content": "이번 선정은 회사의 전문성과 혁신 역량을 보여 줍니다. FOREACH는 제품 개발, 생산, 품질 관리 및 엔지니어링 지원을 지속적으로 강화할 것입니다."
          }
        ],
        "seoTitle": "FOREACH, 국가급 전정특신 작은 거인 기업 선정",
        "seoDescription": "FOREACH가 미세유체 핵심 부품과 유체 제어 분야의 전문성 및 혁신 역량을 인정받았습니다."
      },
      "ru": {
        "title": "FOREACH получила статус национального специализированного и инновационного предприятия «Little Giant»",
        "summary": "Национальное признание отражает специализацию, технологическое развитие и инновационный потенциал FOREACH в микрофлюидике.",
        "content": [
          {
            "title": "Национальное признание предприятия",
            "content": "FOREACH была включена в национальный список специализированных и инновационных предприятий категории «Little Giant»."
          },
          {
            "title": "Долгосрочная специализация в микрофлюидике",
            "content": "FOREACH разрабатывает насосы, клапаны, пробоотборные элементы, датчики, фитинги, трубки и системные компоненты для IVD, наук о жизни, лабораторной автоматизации и аналитических приборов."
          },
          {
            "title": "Профессиональная поддержка клиентов",
            "content": "Статус подтверждает специализацию и инновационный потенциал компании. FOREACH продолжит развивать продукцию, производство, качество и инженерную поддержку."
          }
        ],
        "seoTitle": "FOREACH получила национальный статус предприятия Little Giant",
        "seoDescription": "FOREACH получила национальное признание за специализацию и инновации в области микрофлюидных компонентов."
      }
    }
  },
  {
    "id": "iso-9001-certification",
    "slug": "iso-9001-certification",
    "category": "company",
    "date": "2023-11-21",
    "coverImage": "/images/resources/news/articles/iso-9001-certification/cover.webp",
    "copies": {
      "zh-CN": {
        "title": "恒永达通过 ISO 9001 质量管理体系认证",
        "summary": "恒永达通过 ISO 9001 质量管理体系认证，以标准化管理进一步支撑研发、制造、检测、交付和持续改进。",
        "content": [
          {
            "title": "建立标准化质量管理体系",
            "content": "恒永达通过 ISO 9001 质量管理体系认证，标志着公司在质量目标、过程管理、文件控制、内部审核和持续改进等方面形成了更加规范的管理基础。"
          },
          {
            "title": "贯穿研发制造与交付过程",
            "content": "公司将质量要求落实到需求评审、产品研发、供应链管理、生产制造、过程检验、终检放行和售后反馈等环节，为微流体核心部件稳定交付提供体系支持。"
          },
          {
            "title": "持续提升客户服务能力",
            "content": "通过过程记录、问题闭环和持续改进，恒永达将进一步提升产品一致性、交付可靠性和客户需求响应能力，为长期合作提供更加稳定的质量保障。"
          }
        ],
        "seoTitle": "恒永达通过 ISO 9001 质量管理体系认证",
        "seoDescription": "恒永达通过 ISO 9001 质量管理体系认证，以标准化管理支撑产品研发、生产制造、质量检测、交付与持续改进。"
      },
      "en": {
        "title": "FOREACH Achieves ISO 9001 Quality Management System Certification",
        "summary": "ISO 9001 certification strengthens standardized management across product development, manufacturing, inspection, delivery, and continual improvement at FOREACH.",
        "content": [
          {
            "title": "A Standardized Quality Management System",
            "content": "FOREACH has achieved ISO 9001 certification, providing a structured foundation for quality objectives, process control, document management, internal audits, and continual improvement."
          },
          {
            "title": "Supporting Development, Manufacturing, and Delivery",
            "content": "Quality requirements are applied across requirement review, engineering, supplier management, manufacturing, in-process inspection, final release, and customer feedback."
          },
          {
            "title": "Continual Improvement for Customer Value",
            "content": "Through process records, closed-loop issue management, and improvement actions, FOREACH continues to strengthen product consistency, delivery reliability, and customer response."
          }
        ],
        "seoTitle": "FOREACH Achieves ISO 9001 Certification",
        "seoDescription": "FOREACH has achieved ISO 9001 quality management system certification to support standardized development, manufacturing, inspection, delivery, and continual improvement."
      },
      "es": {
        "title": "FOREACH obtiene la certificación del sistema de gestión de calidad ISO 9001",
        "summary": "La certificación ISO 9001 refuerza la gestión estandarizada del desarrollo, la fabricación, la inspección, la entrega y la mejora continua.",
        "content": [
          {
            "title": "Un sistema de gestión de calidad estandarizado",
            "content": "FOREACH ha obtenido la certificación ISO 9001, estableciendo una base estructurada para objetivos de calidad, control de procesos, documentos, auditorías internas y mejora continua."
          },
          {
            "title": "Apoyo al desarrollo, la fabricación y la entrega",
            "content": "Los requisitos de calidad se aplican a la revisión de necesidades, ingeniería, proveedores, fabricación, inspección, liberación final y retroalimentación del cliente."
          },
          {
            "title": "Mejora continua para el cliente",
            "content": "Mediante registros de proceso y gestión cerrada de incidencias, FOREACH mejora la consistencia del producto, la fiabilidad de entrega y la capacidad de respuesta."
          }
        ],
        "seoTitle": "FOREACH obtiene la certificación ISO 9001",
        "seoDescription": "FOREACH obtiene la certificación ISO 9001 para reforzar el desarrollo, la fabricación, la inspección, la entrega y la mejora continua."
      },
      "fr": {
        "title": "FOREACH obtient la certification du système de management de la qualité ISO 9001",
        "summary": "La certification ISO 9001 renforce la gestion standardisée du développement, de la fabrication, du contrôle, de la livraison et de l’amélioration continue.",
        "content": [
          {
            "title": "Un système qualité standardisé",
            "content": "FOREACH a obtenu la certification ISO 9001, établissant un cadre structuré pour les objectifs qualité, la maîtrise des processus, les documents, les audits internes et l’amélioration continue."
          },
          {
            "title": "Soutenir le développement, la fabrication et la livraison",
            "content": "Les exigences qualité couvrent l’analyse des besoins, l’ingénierie, les fournisseurs, la fabrication, les contrôles, la libération finale et le retour client."
          },
          {
            "title": "Amélioration continue au service du client",
            "content": "Grâce aux enregistrements et au traitement en boucle fermée des problèmes, FOREACH améliore la régularité des produits, la fiabilité des livraisons et la réactivité."
          }
        ],
        "seoTitle": "FOREACH obtient la certification ISO 9001",
        "seoDescription": "FOREACH obtient la certification ISO 9001 pour renforcer le développement, la fabrication, le contrôle, la livraison et l’amélioration continue."
      },
      "ko": {
        "title": "FOREACH, ISO 9001 품질경영시스템 인증 획득",
        "summary": "ISO 9001 인증을 통해 제품 개발, 생산, 검사, 납품 및 지속적인 개선을 위한 표준화된 관리 체계를 강화했습니다.",
        "content": [
          {
            "title": "표준화된 품질경영시스템",
            "content": "FOREACH는 ISO 9001 인증을 획득하여 품질 목표, 공정 관리, 문서 관리, 내부 심사 및 지속적인 개선을 위한 체계적인 기반을 구축했습니다."
          },
          {
            "title": "개발·생산·납품 과정 지원",
            "content": "품질 요구사항은 요구 검토, 설계, 공급업체 관리, 생산, 공정 검사, 최종 출하 검사 및 고객 피드백 과정에 적용됩니다."
          },
          {
            "title": "고객 가치를 위한 지속적인 개선",
            "content": "공정 기록과 문제 해결 절차를 통해 제품 일관성, 납품 신뢰성 및 고객 대응 역량을 지속적으로 향상합니다."
          }
        ],
        "seoTitle": "FOREACH ISO 9001 인증 획득",
        "seoDescription": "FOREACH가 제품 개발, 생산, 검사, 납품 및 지속적인 개선을 지원하는 ISO 9001 품질경영시스템 인증을 획득했습니다."
      },
      "ru": {
        "title": "FOREACH получила сертификат системы менеджмента качества ISO 9001",
        "summary": "Сертификация ISO 9001 укрепляет стандартизированное управление разработкой, производством, контролем, поставкой и непрерывным улучшением.",
        "content": [
          {
            "title": "Стандартизированная система менеджмента качества",
            "content": "FOREACH получила сертификат ISO 9001, создав структурированную основу для целей в области качества, управления процессами, документации, внутренних аудитов и улучшений."
          },
          {
            "title": "Поддержка разработки, производства и поставки",
            "content": "Требования качества применяются при анализе требований, разработке, работе с поставщиками, производстве, промежуточном контроле, финальном выпуске и обработке обратной связи."
          },
          {
            "title": "Непрерывное улучшение для клиентов",
            "content": "С помощью записей процессов и замкнутого управления проблемами FOREACH повышает стабильность продукции, надежность поставок и скорость реагирования."
          }
        ],
        "seoTitle": "FOREACH получила сертификат ISO 9001",
        "seoDescription": "FOREACH получила сертификат ISO 9001 для стандартизации разработки, производства, контроля, поставки и непрерывного улучшения."
      }
    }
  },
  {
    "id": "iso-13485-certification",
    "slug": "iso-13485-certification",
    "category": "company",
    "date": "2023-11-15",
    "coverImage": "/images/resources/news/articles/iso-13485-certification/cover.webp",
    "copies": {
      "zh-CN": {
        "title": "恒永达通过 ISO 13485 医疗器械质量管理体系认证",
        "summary": "恒永达通过 ISO 13485 医疗器械质量管理体系认证，进一步强化面向医疗器械、IVD 与生命科学项目的过程管理、文件记录和产品追溯能力。",
        "content": [
          {
            "title": "强化医疗器械质量管理能力",
            "content": "ISO 13485 面向医疗器械及相关服务过程的质量管理要求。通过认证后，恒永达在风险意识、文件管理、过程控制、质量记录和持续改进方面形成了更加系统的管理基础。"
          },
          {
            "title": "支持 IVD 与生命科学客户项目",
            "content": "微流体泵、阀、传感器、针、接头及管路组件广泛应用于 IVD、生命科学和实验室设备。规范的质量管理体系有助于支持客户的供应商审核、项目导入、批次管理和记录追溯。"
          },
          {
            "title": "提升过程控制与可追溯性",
            "content": "恒永达将产品要求、设计验证、供应链管理、生产过程、检验放行和异常处理纳入统一质量流程，通过文件与数据记录提升产品和过程的可追溯性。"
          },
          {
            "title": "认证对象为质量管理体系",
            "content": "ISO 13485 认证体现的是企业质量管理体系符合相关标准要求，并不等同于所有产品已经取得医疗器械产品注册或单独的产品认证。"
          }
        ],
        "seoTitle": "恒永达通过 ISO 13485 医疗器械质量管理体系认证",
        "seoDescription": "恒永达通过 ISO 13485 认证，强化面向医疗器械、IVD 与生命科学项目的过程控制、文件管理和产品追溯能力。"
      },
      "en": {
        "title": "FOREACH Achieves ISO 13485 Medical Device Quality Management System Certification",
        "summary": "ISO 13485 certification strengthens process control, documentation, traceability, and continual improvement for medical device, IVD, and life science customer projects.",
        "content": [
          {
            "title": "Strengthening Medical Device Quality Management",
            "content": "ISO 13485 specifies quality management requirements for medical devices and related services. The certification strengthens FOREACH processes for risk awareness, documentation, process control, quality records, and continual improvement."
          },
          {
            "title": "Supporting IVD and Life Science Projects",
            "content": "Microfluidic pumps, valves, sensors, probes, fittings, and tubing assemblies are used in IVD, life science, and laboratory equipment. A structured quality system supports supplier audits, project introduction, batch management, and traceability."
          },
          {
            "title": "Improved Process Control and Traceability",
            "content": "Product requirements, design validation, supplier management, manufacturing, inspection release, and nonconformance handling are managed through documented quality processes."
          },
          {
            "title": "Quality System Certification",
            "content": "ISO 13485 certification applies to the quality management system. It does not mean that every FOREACH product has received separate medical device registration or individual product certification."
          }
        ],
        "seoTitle": "FOREACH Achieves ISO 13485 Certification",
        "seoDescription": "FOREACH has achieved ISO 13485 certification, strengthening process control, documentation, and traceability for medical device, IVD, and life science applications."
      },
      "es": {
        "title": "FOREACH obtiene la certificación ISO 13485 para sistemas de gestión de calidad de dispositivos médicos",
        "summary": "La certificación ISO 13485 refuerza el control de procesos, la documentación y la trazabilidad para proyectos médicos, IVD y ciencias de la vida.",
        "content": [
          {
            "title": "Gestión de calidad para dispositivos médicos",
            "content": "ISO 13485 establece requisitos de gestión de calidad para dispositivos médicos y servicios relacionados. La certificación refuerza la gestión de riesgos, documentos, procesos, registros y mejora continua."
          },
          {
            "title": "Apoyo a proyectos IVD y de ciencias de la vida",
            "content": "Bombas, válvulas, sensores, sondas, racores y tubos microfluídicos se utilizan en IVD, ciencias de la vida y equipos de laboratorio. El sistema apoya auditorías, introducción de proyectos y trazabilidad."
          },
          {
            "title": "Mayor control y trazabilidad",
            "content": "Los requisitos, la validación, los proveedores, la fabricación, la liberación y las no conformidades se gestionan mediante procesos documentados."
          },
          {
            "title": "Certificación del sistema de calidad",
            "content": "La certificación ISO 13485 se aplica al sistema de gestión de calidad y no significa que todos los productos hayan obtenido un registro médico o una certificación individual."
          }
        ],
        "seoTitle": "FOREACH obtiene la certificación ISO 13485",
        "seoDescription": "FOREACH obtiene ISO 13485 para reforzar el control, la documentación y la trazabilidad en proyectos médicos, IVD y ciencias de la vida."
      },
      "fr": {
        "title": "FOREACH obtient la certification ISO 13485 pour le management de la qualité des dispositifs médicaux",
        "summary": "La certification ISO 13485 renforce la maîtrise des processus, la documentation et la traçabilité pour les projets médicaux, IVD et sciences de la vie.",
        "content": [
          {
            "title": "Management de la qualité des dispositifs médicaux",
            "content": "ISO 13485 définit les exigences qualité applicables aux dispositifs médicaux et services associés. La certification renforce la gestion des risques, des documents, des processus et des enregistrements."
          },
          {
            "title": "Soutenir les projets IVD et sciences de la vie",
            "content": "Les pompes, vannes, capteurs, sondes, raccords et tubes microfluidiques sont utilisés dans l’IVD, les sciences de la vie et les équipements de laboratoire."
          },
          {
            "title": "Maîtrise des processus et traçabilité",
            "content": "Les exigences produit, la validation, les fournisseurs, la fabrication, la libération et les non-conformités sont gérés dans des processus documentés."
          },
          {
            "title": "Certification du système qualité",
            "content": "La certification ISO 13485 concerne le système de management de la qualité. Elle ne signifie pas que chaque produit dispose d’un enregistrement médical ou d’une certification produit individuelle."
          }
        ],
        "seoTitle": "FOREACH obtient la certification ISO 13485",
        "seoDescription": "FOREACH obtient ISO 13485 et renforce la maîtrise des processus, la documentation et la traçabilité pour les applications médicales et IVD."
      },
      "ko": {
        "title": "FOREACH, ISO 13485 의료기기 품질경영시스템 인증 획득",
        "summary": "ISO 13485 인증을 통해 의료기기, IVD 및 생명과학 프로젝트를 위한 공정 관리, 문서화 및 추적성을 강화했습니다.",
        "content": [
          {
            "title": "의료기기 품질 관리 역량 강화",
            "content": "ISO 13485는 의료기기 및 관련 서비스의 품질경영 요구사항을 규정합니다. 인증을 통해 위험 관리, 문서 관리, 공정 관리, 품질 기록 및 지속적인 개선 체계를 강화했습니다."
          },
          {
            "title": "IVD 및 생명과학 프로젝트 지원",
            "content": "미세유체 펌프, 밸브, 센서, 프로브, 피팅 및 튜빙 어셈블리는 IVD, 생명과학 및 실험실 장비에 적용됩니다. 체계적인 품질 시스템은 공급업체 심사와 프로젝트 도입을 지원합니다."
          },
          {
            "title": "공정 관리와 추적성 향상",
            "content": "제품 요구사항, 설계 검증, 공급망, 생산, 검사 승인 및 부적합 처리를 문서화된 품질 절차에 따라 관리합니다."
          },
          {
            "title": "품질경영시스템 인증",
            "content": "ISO 13485는 품질경영시스템에 대한 인증이며, 모든 제품이 개별 의료기기 등록 또는 제품 인증을 취득했다는 의미는 아닙니다."
          }
        ],
        "seoTitle": "FOREACH ISO 13485 인증 획득",
        "seoDescription": "FOREACH가 의료기기, IVD 및 생명과학 분야의 공정 관리, 문서화 및 추적성을 강화하는 ISO 13485 인증을 획득했습니다."
      },
      "ru": {
        "title": "FOREACH получила сертификат ISO 13485 для системы менеджмента качества медицинских изделий",
        "summary": "Сертификация ISO 13485 усиливает управление процессами, документацию и прослеживаемость для медицинских, IVD- и биотехнологических проектов.",
        "content": [
          {
            "title": "Управление качеством медицинских изделий",
            "content": "ISO 13485 устанавливает требования к системе качества медицинских изделий и связанных услуг. Сертификация укрепляет управление рисками, документацией, процессами и записями качества."
          },
          {
            "title": "Поддержка проектов IVD и наук о жизни",
            "content": "Микрофлюидные насосы, клапаны, датчики, пробоотборные элементы, фитинги и трубки применяются в IVD, науках о жизни и лабораторном оборудовании."
          },
          {
            "title": "Управление процессами и прослеживаемость",
            "content": "Требования к продукции, валидация, поставщики, производство, выпуск после контроля и работа с несоответствиями управляются документированными процедурами."
          },
          {
            "title": "Сертификация системы качества",
            "content": "ISO 13485 относится к системе менеджмента качества и не означает, что каждое изделие получило отдельную регистрацию медицинского изделия или индивидуальный сертификат."
          }
        ],
        "seoTitle": "FOREACH получила сертификат ISO 13485",
        "seoDescription": "FOREACH получила ISO 13485, усилив управление процессами, документацию и прослеживаемость для медицинских и IVD-применений."
      }
    }
  }
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
