/* =========================================================
   material-compatibility.intl.ts
   恒永达官网｜材料兼容页面外语数据

   文件路径：
   data/resources/material-compatibility/material-compatibility.intl.ts

   说明：
   1. 中文页面使用 material-compatibility.zh.ts
   2. 外语页面的界面标题、按钮、搜索栏、提示说明按语言区分
   3. 技术资料内容统一使用英文技术数据，避免化学名称多语言机翻不严谨
   4. 后续如果要逐步翻译化学介质，可以在本文件里继续扩展
========================================================= */

import { materialCompatibilityZhData } from "./material-compatibility.zh";

import type {
  CompatibilityRow,
  MaterialCompatibilityBannerData,
  MaterialCompatibilityPageData,
  MaterialCompatibilitySearchCopy,
  MaterialCompatibilityTabItem,
  MaterialCompatibilityUiCopy,
} from "./material-compatibility.types";

/* =========================================================
   外语语言类型

   说明：
   当前官网外语路径支持 en / es / fr / ko / ru
========================================================= */
type MaterialCompatibilityIntlLocale = "en" | "es" | "fr" | "ko" | "ru";

/* =========================================================
   外语页面基础文案结构

   说明：
   这里只放 UI 文案，不放技术表格数据。
========================================================= */
type MaterialCompatibilityIntlCopy = {
  banner: MaterialCompatibilityBannerData;
  tabs: MaterialCompatibilityTabItem[];
  searchCopy: MaterialCompatibilityPageData["searchCopy"];
  certificationColumns: string[];
  ui: MaterialCompatibilityUiCopy;
};

/* =========================================================
   化学介质英文名称映射

   说明：
   1. key 对应中文数据中的 name
   2. value 为外语页面显示的英文技术名称
   3. 如果某个名称暂未映射，会保留中文名称，方便后续补齐
========================================================= */
const chemicalNameEnMap: Record<string, string> = {
  "乙酰胺乙酸50%": "Acetamide acetic acid 50%",
  丙酮: "Acetone",
  "10%蚁酸": "Formic acid 10%",
  "10%氨水溶液": "Ammonia solution 10%",
  环己醇: "Cyclohexanol",
  汽油: "Gasoline",
  苯: "Benzene",
  "10%硼酸水溶液": "Boric acid solution 10%",
  乙酸丁酯: "Butyl acetate",
  "10%氯化钙溶液": "Calcium chloride solution 10%",
  氯苯: "Chlorobenzene",
  氯仿: "Chloroform",
  "氯化联苯 50%": "Chlorinated biphenyl 50%",
  环己胺: "Cyclohexylamine",
  环己酮: "Cyclohexanone",
  十氢化萘: "Decahydronaphthalene",
  柴油: "Diesel",
  甲酰胺: "Formamide",
  邻苯二甲酸二辛酯: "Dioctyl phthalate",
  二氧杂环己烷: "Dioxane",
  浓乙酸: "Concentrated acetic acid",
  "10%乙酸": "Acetic acid 10%",
  "5%乙酸": "Acetic acid 5%",
  "96%乙醇": "Ethanol 96%",
  乙酸乙酯: "Ethyl acetate",
  二乙醚: "Diethyl ether",
  氯乙烯: "Vinyl chloride",
  "40%氢氟酸": "Hydrofluoric acid 40%",
  "30%甲醛水溶液": "Formaldehyde solution 30%",
  氟利昂: "Freon",
  果汁: "Fruit juice",
  乙二醇: "Ethylene glycol",
  "40%乙二醇水溶液": "Ethylene glycol solution 40%",
  丙三醇: "Glycerol",
  燃油: "Fuel oil",
  辛烷: "Octane",
  异丙醇: "Isopropanol",
  碘酒: "Iodine tincture",
  "50%氢氧化钾溶液": "Potassium hydroxide solution 50%",
  "10%氢氧化钾溶液": "Potassium hydroxide solution 10%",
  "10%重铬酸钾溶液": "Potassium dichromate solution 10%",
  "1%硫酸铜溶液": "Copper sulfate solution 1%",
  二甲苯: "Xylene",
  亚麻籽油: "Linseed oil",
  甲醇: "Methanol",
  甲乙酮: "Methyl ethyl ketone",
  二氯甲烷: "Dichloromethane",
  "10%亚硫酸氢钠溶液": "Sodium bisulfite solution 10%",
  "10%碳酸钠溶液": "Sodium carbonate solution 10%",
  "10%氯化钠溶液": "Sodium chloride solution 10%",
  "10%硝酸钠溶液": "Sodium nitrate solution 10%",
  "10%硫代硫酸钠": "Sodium thiosulfate 10%",
  "50%苏打水": "Soda solution 50%",
  硝基苯: "Nitrobenzene",
  "10%的草酸溶液": "Oxalic acid solution 10%",
  臭氧: "Ozone",
  石蜡油: "Paraffin oil",
  四氯乙烯: "Tetrachloroethylene",
  石油: "Petroleum",
  苯酚溶液: "Phenol solution",
  浓磷酸: "Concentrated phosphoric acid",
  "10%磷酸溶液": "Phosphoric acid solution 10%",
  丙醇: "Propanol",
  吡啶: "Pyridine",
  水杨酸: "Salicylic acid",
  "2%硝酸溶液": "Nitric acid solution 2%",
  "36%盐酸溶液": "Hydrochloric acid solution 36%",
  "2%盐酸溶液": "Hydrochloric acid solution 2%",
  二氧化硫: "Sulfur dioxide",
  "98%硫酸溶液": "Sulfuric acid solution 98%",
  "2%硫酸溶液": "Sulfuric acid solution 2%",
  饱和硫化氢溶液: "Saturated hydrogen sulfide solution",
  硅油: "Silicone oil",
  "10%苏打溶液": "Soda solution 10%",
  苯乙烯: "Styrene",
  焦油: "Tar",
  四氢呋喃: "Tetrahydrofuran",
  "1,2,3,4-四氢化萘": "1,2,3,4-Tetrahydronaphthalene",
  油墨: "Ink",
  甲苯: "Toluene",
  三乙醇胺: "Triethanolamine",
  三氯乙烯: "Trichloroethylene",
  "10%氨羧配合剂": "Aminocarboxylate complexing agent 10%",
  "30%过氧化氢": "Hydrogen peroxide 30%",
  酒石酸: "Tartaric acid",
};

/* =========================================================
   生成英文兼容性表

   说明：
   1. 兼容性结果仍然复用中文数据中的 + / (+) / -
   2. 只替换化学介质名称
   3. 空白格保持空白
========================================================= */
function createEnglishCompatibilityRows(): CompatibilityRow[] {
  return materialCompatibilityZhData.compatibilityRows.map((row) => ({
    ...row,
    name: chemicalNameEnMap[row.name] ?? row.name,
  }));
}

/* =========================================================
   英文材料特性表

   说明：
   1. 技术表格内容统一英文
   2. 西语 / 法语 / 韩语 / 俄语页面也先使用这组技术数据
========================================================= */
const englishMaterialFeatureRows: MaterialCompatibilityPageData["materialFeatureRows"] =
  [
    {
      code: "PP",
      name: "Polypropylene",
      feature:
        "Lightweight and fatigue-resistant, with good resistance to acids, alkalis, and common organic solvents.",
      temperature: "-10°C to 120°C",
      application:
        "General fluid paths, reagent connections, disposable consumables",
    },
    {
      code: "PVDF",
      name: "Polyvinylidene Fluoride",
      feature:
        "Balanced chemical resistance and mechanical performance, with good UV and radiation resistance.",
      temperature: "-40°C to 150°C",
      application: "Reagent tubing, fluidic connectors, fluid path components",
    },
    {
      code: "POM",
      name: "Polyoxymethylene",
      feature:
        "High hardness, rigidity, and wear resistance, suitable for structural and precision parts.",
      temperature: "-40°C to 100°C",
      application: "Structural parts, precision parts, mechanical connectors",
    },
    {
      code: "ETFE",
      name: "Ethylene Tetrafluoroethylene",
      feature:
        "Good chemical stability, weather resistance, and impact resistance, with higher mechanical strength than PTFE.",
      temperature: "-80°C to 150°C",
      application: "Corrosion-resistant tubing and fluidic connectors",
    },
    {
      code: "PEEK",
      name: "Polyether Ether Ketone",
      feature:
        "High strength, high temperature resistance, and good chemical resistance for demanding fluidic systems.",
      temperature: "-180°C to 225°C",
      application:
        "High-performance fittings, valve bodies, analytical instrument fluid paths",
    },
    {
      code: "PPS",
      name: "Polyphenylene Sulfide",
      feature:
        "High temperature resistance, chemical resistance, and excellent dimensional stability.",
      temperature: "-40°C to 220°C",
      application: "Engineering structural parts for long-term stable operation",
    },
    {
      code: "PTFE",
      name: "Polytetrafluoroethylene",
      feature:
        "Highly chemically inert, low friction, and high temperature resistance for many strong acids, alkalis, and organic solvents.",
      temperature: "-200°C to 260°C",
      application: "Highly corrosive fluid paths, seals, tubing components",
    },
    {
      code: "PFA",
      name: "Perfluoroalkoxy Alkane",
      feature:
        "Performance close to PTFE, with improved melt processability for high-purity and corrosion-resistant applications.",
      temperature: "-230°C to 200°C",
      application: "High-purity and highly corrosion-resistant applications",
    },
  ];

/* =========================================================
   通用英文技术搜索关键词

   说明：
   关键词保持英文，便于客户直接检索技术词。
========================================================= */
const englishSearchCopy: MaterialCompatibilityPageData["searchCopy"] = {
  compatibility: {
    placeholder: "Search by chemical medium",
    quickKeywords: ["Ethanol", "Methanol", "Sulfuric acid", "Gasoline"],
  },
  features: {
    placeholder: "Search by material",
    quickKeywords: ["PEEK", "PTFE", "PVDF", "PP", "PFA"],
  },
  certification: {
    placeholder: "Search by material or certificate",
    quickKeywords: ["PEEK", "PP", "RoHS", "FDA", "REACH"],
  },
};

/* =========================================================
   外语 UI 文案集合

   说明：
   1. 技术资料内容不翻译
   2. 仅翻译页面标题、按钮、搜索说明、表格说明、CTA 等界面文字
========================================================= */
const intlCopyMap: Record<MaterialCompatibilityIntlLocale, MaterialCompatibilityIntlCopy> =
  {
    en: {
      banner: {
        eyebrow: "",
        title: "Material Compatibility and Reliable Selection",
        highlight: "",
        description:
          "Reference data for material selection based on common chemical media, engineering plastics properties, and compliance documentation for microfluidic tubing, fittings, valves, and fluidic systems.",
      },
      tabs: [
        { key: "compatibility", label: "Compatibility" },
        { key: "features", label: "Material Properties" },
        { key: "certification", label: "Certificates" },
      ],
      searchCopy: englishSearchCopy,
      certificationColumns: [
        "Material",
        "ISO 10993",
        "USP CLASS VI",
        "FDA",
        "UL",
        "NSF/ANSI 61",
        "M/SDS",
        "RoHS",
        "REACH",
      ],
      ui: {
        breadcrumbAriaLabel: "Breadcrumb",
        breadcrumbHome: "Home",
        breadcrumbResources: "Resources",
        breadcrumbCurrent: "Material Compatibility",
        searchButtonText: "Search",
        recentLabel: "Common Searches",
        noteLabel: "Note: ",
        tableCopy: {
          compatibility: {
            title: "Material Compatibility Table",
            description:
              "Reference compatibility data for common chemical media and engineering plastics.",
            note: "+ Compatible;　(+) Limited compatibility;　- Not recommended. Results are affected by concentration, temperature, and contact time.",
          },
          features: {
            title: "Material Properties",
            description:
              "Key properties, temperature ranges, and typical applications of common engineering plastics.",
            note: "Material properties are for general reference only and should be confirmed based on product structure, media, and operating conditions.",
          },
          certification: {
            title: "Material Certificates and Compliance Support",
            description:
              "Compliance documentation available for common engineering plastic materials.",
            note: "Applicable certificates depend on product model, material batch, and application requirements.",
          },
        },
        compatibilityTable: {
          chemicalMedium: "Chemical Medium",
          emptyText:
            "No matching data. Please try another keyword or contact technical support.",
        },
        featureTable: {
          columns: {
            material: "Material",
            name: "Material Name",
            feature: "Key Properties",
            temperature: "Temperature Range",
            application: "Typical Applications",
          },
          emptyText: "No matching material. Please try another keyword.",
        },
        certificationTable: {
          emptyText:
            "No matching certificate data. Please try another keyword or contact sales.",
        },
        supportCta: {
          kicker: "SELECTION SUPPORT",
          title: "Need help confirming material compatibility?",
          description:
            "Submit the medium name, concentration, temperature, pressure, and contact time. The FOREACH technical team can help confirm material selection for your application.",
          buttonText: "Contact Technical Support",
        },
      },
    },

    es: {
      banner: {
        eyebrow: "",
        title: "Compatibilidad de materiales y selección fiable",
        highlight: "",
        description:
          "Datos de referencia para la selección de materiales basados en medios químicos comunes, propiedades de plásticos de ingeniería y documentación de conformidad para tubos, conectores, válvulas y sistemas fluídicos.",
      },
      tabs: [
        { key: "compatibility", label: "Compatibilidad" },
        { key: "features", label: "Propiedades del material" },
        { key: "certification", label: "Certificados" },
      ],
      searchCopy: {
        compatibility: {
          ...englishSearchCopy.compatibility,
          placeholder: "Buscar por medio químico",
        },
        features: {
          ...englishSearchCopy.features,
          placeholder: "Buscar por material",
        },
        certification: {
          ...englishSearchCopy.certification,
          placeholder: "Buscar por material o certificado",
        },
      },
      certificationColumns: [
        "Material",
        "ISO 10993",
        "USP CLASS VI",
        "FDA",
        "UL",
        "NSF/ANSI 61",
        "M/SDS",
        "RoHS",
        "REACH",
      ],
      ui: {
        breadcrumbAriaLabel: "Ruta de navegación",
        breadcrumbHome: "Inicio",
        breadcrumbResources: "Recursos",
        breadcrumbCurrent: "Compatibilidad de materiales",
        searchButtonText: "Buscar",
        recentLabel: "Búsquedas comunes",
        noteLabel: "Nota: ",
        tableCopy: {
          compatibility: {
            title: "Tabla de compatibilidad de materiales",
            description:
              "Datos de referencia sobre compatibilidad entre medios químicos comunes y plásticos de ingeniería.",
            note: "+ Compatible;　(+) Compatibilidad limitada;　- No recomendado. Los resultados dependen de la concentración, la temperatura y el tiempo de contacto.",
          },
          features: {
            title: "Propiedades del material",
            description:
              "Propiedades principales, rangos de temperatura y aplicaciones típicas de plásticos de ingeniería comunes.",
            note: "Las propiedades del material son solo una referencia general y deben confirmarse según la estructura del producto, el medio y las condiciones de operación.",
          },
          certification: {
            title: "Certificados y soporte de conformidad",
            description:
              "Documentación de conformidad disponible para materiales plásticos de ingeniería comunes.",
            note: "Los certificados aplicables dependen del modelo del producto, el lote de material y los requisitos de la aplicación.",
          },
        },
        compatibilityTable: {
          chemicalMedium: "Medio químico",
          emptyText:
            "No hay datos coincidentes. Pruebe con otra palabra clave o contacte con soporte técnico.",
        },
        featureTable: {
          columns: {
            material: "Material",
            name: "Nombre del material",
            feature: "Propiedades principales",
            temperature: "Rango de temperatura",
            application: "Aplicaciones típicas",
          },
          emptyText: "No se encontró material coincidente.",
        },
        certificationTable: {
          emptyText:
            "No hay datos de certificados coincidentes. Pruebe con otra palabra clave o contacte con ventas.",
        },
        supportCta: {
          kicker: "SOPORTE DE SELECCIÓN",
          title: "¿Necesita confirmar la compatibilidad del material?",
          description:
            "Envíe el nombre del medio, la concentración, la temperatura, la presión y el tiempo de contacto. El equipo técnico de FOREACH puede ayudarle a confirmar la selección del material.",
          buttonText: "Contactar soporte técnico",
        },
      },
    },

    fr: {
      banner: {
        eyebrow: "",
        title: "Compatibilité des matériaux et sélection fiable",
        highlight: "",
        description:
          "Données de référence pour la sélection des matériaux, basées sur les milieux chimiques courants, les propriétés des plastiques techniques et les documents de conformité pour tubes, raccords, vannes et systèmes fluidiques.",
      },
      tabs: [
        { key: "compatibility", label: "Compatibilité" },
        { key: "features", label: "Propriétés du matériau" },
        { key: "certification", label: "Certificats" },
      ],
      searchCopy: {
        compatibility: {
          ...englishSearchCopy.compatibility,
          placeholder: "Rechercher par milieu chimique",
        },
        features: {
          ...englishSearchCopy.features,
          placeholder: "Rechercher par matériau",
        },
        certification: {
          ...englishSearchCopy.certification,
          placeholder: "Rechercher par matériau ou certificat",
        },
      },
      certificationColumns: [
        "Matériau",
        "ISO 10993",
        "USP CLASS VI",
        "FDA",
        "UL",
        "NSF/ANSI 61",
        "M/SDS",
        "RoHS",
        "REACH",
      ],
      ui: {
        breadcrumbAriaLabel: "Fil d’Ariane",
        breadcrumbHome: "Accueil",
        breadcrumbResources: "Ressources",
        breadcrumbCurrent: "Compatibilité des matériaux",
        searchButtonText: "Rechercher",
        recentLabel: "Recherches courantes",
        noteLabel: "Remarque : ",
        tableCopy: {
          compatibility: {
            title: "Tableau de compatibilité des matériaux",
            description:
              "Données de référence sur la compatibilité entre milieux chimiques courants et plastiques techniques.",
            note: "+ Compatible ;　(+) Compatibilité limitée ;　- Non recommandé. Les résultats dépendent de la concentration, de la température et du temps de contact.",
          },
          features: {
            title: "Propriétés du matériau",
            description:
              "Propriétés clés, plages de température et applications typiques des plastiques techniques courants.",
            note: "Les propriétés du matériau sont fournies à titre de référence générale et doivent être confirmées selon la structure du produit, le milieu et les conditions d’utilisation.",
          },
          certification: {
            title: "Certificats et conformité",
            description:
              "Documents de conformité disponibles pour les matériaux plastiques techniques courants.",
            note: "Les certificats applicables dépendent du modèle du produit, du lot de matériau et des exigences d’application.",
          },
        },
        compatibilityTable: {
          chemicalMedium: "Milieu chimique",
          emptyText:
            "Aucune donnée correspondante. Essayez un autre mot-clé ou contactez le support technique.",
        },
        featureTable: {
          columns: {
            material: "Matériau",
            name: "Nom du matériau",
            feature: "Propriétés clés",
            temperature: "Plage de température",
            application: "Applications typiques",
          },
          emptyText: "Aucun matériau correspondant.",
        },
        certificationTable: {
          emptyText:
            "Aucune donnée de certificat correspondante. Essayez un autre mot-clé ou contactez le service commercial.",
        },
        supportCta: {
          kicker: "SUPPORT DE SÉLECTION",
          title: "Besoin de confirmer la compatibilité du matériau ?",
          description:
            "Indiquez le nom du milieu, la concentration, la température, la pression et le temps de contact. L’équipe technique FOREACH peut vous aider à confirmer le choix du matériau.",
          buttonText: "Contacter le support technique",
        },
      },
    },

    ko: {
      banner: {
        eyebrow: "",
        title: "재료 적합성과 신뢰성 있는 선정",
        highlight: "",
        description:
          "일반 화학 매질, 엔지니어링 플라스틱 특성 및 적합성 자료를 기반으로 튜브, 피팅, 밸브 및 유체 시스템의 재료 선정에 참고할 수 있는 데이터를 제공합니다.",
      },
      tabs: [
        { key: "compatibility", label: "재료 적합성" },
        { key: "features", label: "재료 특성" },
        { key: "certification", label: "인증 자료" },
      ],
      searchCopy: {
        compatibility: {
          ...englishSearchCopy.compatibility,
          placeholder: "화학 매질로 검색",
        },
        features: {
          ...englishSearchCopy.features,
          placeholder: "재료명으로 검색",
        },
        certification: {
          ...englishSearchCopy.certification,
          placeholder: "재료 또는 인증명으로 검색",
        },
      },
      certificationColumns: [
        "재료",
        "ISO 10993",
        "USP CLASS VI",
        "FDA",
        "UL",
        "NSF/ANSI 61",
        "M/SDS",
        "RoHS",
        "REACH",
      ],
      ui: {
        breadcrumbAriaLabel: "이동 경로",
        breadcrumbHome: "홈",
        breadcrumbResources: "자료실",
        breadcrumbCurrent: "재료 적합성",
        searchButtonText: "검색",
        recentLabel: "자주 찾는 검색어",
        noteLabel: "참고: ",
        tableCopy: {
          compatibility: {
            title: "재료 적합성 표",
            description:
              "일반 화학 매질과 엔지니어링 플라스틱 간의 적합성 참고 데이터입니다.",
            note: "+ 적합;　(+) 제한적 적합;　- 권장하지 않음. 결과는 농도, 온도 및 접촉 시간의 영향을 받을 수 있습니다.",
          },
          features: {
            title: "재료 특성",
            description:
              "일반 엔지니어링 플라스틱의 주요 특성, 온도 범위 및 대표 적용 분야입니다.",
            note: "재료 특성은 일반 참고용이며, 실제 제품 구조, 매질 및 운전 조건에 따라 확인이 필요합니다.",
          },
          certification: {
            title: "인증 및 적합성 자료",
            description:
              "일반 엔지니어링 플라스틱 재료에 대해 제공 가능한 적합성 자료입니다.",
            note: "적용 가능한 인증 자료는 제품 모델, 재료 배치 및 적용 요구사항에 따라 달라질 수 있습니다.",
          },
        },
        compatibilityTable: {
          chemicalMedium: "화학 매질",
          emptyText:
            "일치하는 데이터가 없습니다. 다른 키워드로 검색하거나 기술 지원팀에 문의해 주세요.",
        },
        featureTable: {
          columns: {
            material: "재료",
            name: "재료명",
            feature: "주요 특성",
            temperature: "온도 범위",
            application: "대표 적용 분야",
          },
          emptyText: "일치하는 재료가 없습니다.",
        },
        certificationTable: {
          emptyText:
            "일치하는 인증 자료가 없습니다. 다른 키워드로 검색하거나 영업팀에 문의해 주세요.",
        },
        supportCta: {
          kicker: "선정 지원",
          title: "재료 적합성 확인이 필요하신가요?",
          description:
            "매질명, 농도, 온도, 압력 및 접촉 시간을 보내주시면 FOREACH 기술팀이 적용 조건에 맞는 재료 선정을 확인해 드립니다.",
          buttonText: "기술 지원 문의",
        },
      },
    },

    ru: {
      banner: {
        eyebrow: "",
        title: "Совместимость материалов и надежный подбор",
        highlight: "",
        description:
          "Справочные данные для подбора материалов на основе распространенных химических сред, свойств инженерных пластиков и документов соответствия для трубок, фитингов, клапанов и флюидных систем.",
      },
      tabs: [
        { key: "compatibility", label: "Совместимость" },
        { key: "features", label: "Свойства материала" },
        { key: "certification", label: "Сертификаты" },
      ],
      searchCopy: {
        compatibility: {
          ...englishSearchCopy.compatibility,
          placeholder: "Поиск по химической среде",
        },
        features: {
          ...englishSearchCopy.features,
          placeholder: "Поиск по материалу",
        },
        certification: {
          ...englishSearchCopy.certification,
          placeholder: "Поиск по материалу или сертификату",
        },
      },
      certificationColumns: [
        "Материал",
        "ISO 10993",
        "USP CLASS VI",
        "FDA",
        "UL",
        "NSF/ANSI 61",
        "M/SDS",
        "RoHS",
        "REACH",
      ],
      ui: {
        breadcrumbAriaLabel: "Навигационная цепочка",
        breadcrumbHome: "Главная",
        breadcrumbResources: "Ресурсы",
        breadcrumbCurrent: "Совместимость материалов",
        searchButtonText: "Поиск",
        recentLabel: "Популярные запросы",
        noteLabel: "Примечание: ",
        tableCopy: {
          compatibility: {
            title: "Таблица совместимости материалов",
            description:
              "Справочные данные по совместимости распространенных химических сред и инженерных пластиков.",
            note: "+ Совместимо;　(+) Ограниченная совместимость;　- Не рекомендуется. Результаты зависят от концентрации, температуры и времени контакта.",
          },
          features: {
            title: "Свойства материала",
            description:
              "Основные свойства, температурные диапазоны и типичные области применения распространенных инженерных пластиков.",
            note: "Свойства материалов приведены только для общего справочного использования и должны подтверждаться с учетом конструкции изделия, среды и условий эксплуатации.",
          },
          certification: {
            title: "Сертификаты и документы соответствия",
            description:
              "Документы соответствия, доступные для распространенных инженерных пластиков.",
            note: "Применимые сертификаты зависят от модели изделия, партии материала и требований конкретного применения.",
          },
        },
        compatibilityTable: {
          chemicalMedium: "Химическая среда",
          emptyText:
            "Совпадений не найдено. Попробуйте другой ключевой запрос или обратитесь в техническую поддержку.",
        },
        featureTable: {
          columns: {
            material: "Материал",
            name: "Название материала",
            feature: "Основные свойства",
            temperature: "Температурный диапазон",
            application: "Типичные применения",
          },
          emptyText: "Совпадающий материал не найден.",
        },
        certificationTable: {
          emptyText:
            "Данные сертификатов не найдены. Попробуйте другой запрос или обратитесь в отдел продаж.",
        },
        supportCta: {
          kicker: "ПОДДЕРЖКА ПОДБОРА",
          title: "Нужно подтвердить совместимость материала?",
          description:
            "Укажите название среды, концентрацию, температуру, давление и время контакта. Техническая команда FOREACH поможет подтвердить выбор материала для вашего применения.",
          buttonText: "Связаться с техподдержкой",
        },
      },
    },
  };

/* =========================================================
   判断外语 locale 是否受支持

   说明：
   如果传入未知语言，默认使用英文 UI。
========================================================= */
function getSupportedIntlLocale(
  locale: string,
): MaterialCompatibilityIntlLocale {
  if (locale === "es" || locale === "fr" || locale === "ko" || locale === "ru") {
    return locale;
  }

  return "en";
}

/* =========================================================
   获取外语页面数据

   说明：
   1. UI 文案按 locale 返回
   2. 技术表格统一使用英文
   3. 兼容性结果复用中文数据中的 + / (+) / -
========================================================= */
export function getMaterialCompatibilityIntlData(
  locale: string,
): MaterialCompatibilityPageData {
  const supportedLocale = getSupportedIntlLocale(locale);
  const copy = intlCopyMap[supportedLocale];

  return {
    ...materialCompatibilityZhData,
    banner: copy.banner,
    tabs: copy.tabs,
    searchCopy: copy.searchCopy,
    compatibilityRows: createEnglishCompatibilityRows(),
    materialFeatureRows: englishMaterialFeatureRows,
    certificationColumns: copy.certificationColumns,
    certificationRows: materialCompatibilityZhData.certificationRows,
    ui: copy.ui,
  };
} 