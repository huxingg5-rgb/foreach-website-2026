import type { TubingAssemblyType } from "./tubing-assemblies.en";

type TubingAssemblyIntro = { title: string; paragraphs: readonly string[] };

// Category introduction artwork is independent of product cards and details.
export const tubingAssemblyIntroImages: Partial<Record<TubingAssemblyType["id"], { src: string; alt: string }>> = {
  "retaining-ring-kits": {
    src: "/images/products/tubing-assemblies/retaining-ring-pair-white-shadow-intro.png",
    alt: "白底卡环管组件对比，本色 PEEK 与黑色接头搭配金属压套、密封垫圈及管材",
  },
  "flanged-tubing": {
    src: "/images/products/tubing-assemblies/flanged-tubing-white-shadow-intro.png",
    alt: "白底法兰翻边管组件，黑色与本色接头连接透明管材",
  },
  "ferrule-kits": {
    src: "/images/products/tubing-assemblies/ferrule-tubing-black-intro.png",
    alt: "卡箍管组件，黑色管材搭配黑色接头与管端密封部件",
  },
};

const compliance = "恒永达具备 ISO 9001、ISO 13485 质量管理体系认证。";

export const tubingAssemblyOverviewReview: TubingAssemblyIntro = {
  title: "仪器用定制管组件",
  paragraphs: [
    "恒永达提供法兰翻边、卡环和卡箍三类定制管组件，服务于体外诊断与自动化分析仪器的液路连接，支持设备研发配套、按图定制及批量装配。",
    "管材可选 FEP、PTFE、PFA 和黑色 PTFE，接头材质与结构按组件类型匹配，其中翻边接头可选 PPS、PVDF、PEEK，提供标准及紧凑结构。螺纹包括 M6×1、1/4-28 UNF；翻边、卡环系列可选 6-40 UNF 微型配置，采用 PEEK 接头，适配外径 1.6 mm 管材。管外径可选 1.6、2.0、2.5、3.0、3.2 mm，其中 FEP 管内径覆盖 0.3–2.0 mm，具体内外径按管材及连接结构配套。支持定制长度、单／双端翻边及弹簧管形式，A、B 两端可分别指定接头材质、螺纹规格和连接方式；可按需配置防磨护套、限位管及管路标识，满足不同液路布局、安装空间、避光和介质兼容性需求。",
    compliance,
  ],
};

// Chinese review copy. Geometry and component options follow the A02 catalog,
// pages 6–9, 14–15 and 21–22. Do not extrapolate component pressure ratings.
export const tubingAssemblyTypeIntrosReview: Record<TubingAssemblyType["id"], TubingAssemblyIntro> = {
  "flanged-tubing": {
    title: "定制法兰翻边管组件",
    paragraphs: [
      "恒永达提供单端及双端法兰翻边管组件，用于体外诊断与自动化分析仪器的平底端口液路连接。通过管端翻边、配套接头及垫片形成端面密封，支持设备研发配套、按图定制及批量装配。",
      "管材可选 FEP、PTFE、PFA，按具体翻边工艺及端口匹配；接头可选 PPS、PVDF、PEEK，提供标准及紧凑结构。螺纹包括 M6×1、1/4-28 UNF，部分微型配置支持 6-40 UNF。管外径可选 1.6、2.0、2.5、3.0、3.2 mm，其中 FEP 管内径覆盖 0.3–2.0 mm，具体内外径按规格配套；垫片按型号提供 SUS、PEEK、PTFE 选项。支持长度、A／B 两端接头、弹簧管形式、防磨护套、限位管及管路标识定制。",
      compliance,
    ],
  },
  "retaining-ring-kits": {
    title: "定制卡环管组件",
    paragraphs: [
      "恒永达提供由配套接头、卡环压套、密封垫圈和管材组成的卡环管组件，用于体外诊断与自动化分析仪器的液路连接。通过压套与垫圈的配合固定管端并形成密封，支持设备研发配套、按图定制及批量装配。",
      "6-40 UNF 与 HSF6 两类卡环组件均可选 FEP、PTFE、PFA、黑色 PTFE 管材，并支持弹簧管、防磨护套配置。6-40 UNF 配置采用 PEEK 接头及外径 1.6 mm 管材；HSF6 配置提供 M6×1、1/4-28 UNF 螺纹，管外径按规格提供 1.6、2.0、2.5、3.0、3.2 mm。卡环压套及垫圈按型号匹配 SUS、PEEK 部件，管内径与外径按规格配套。支持管长、A／B 两端连接、限位管及管路标识定制。",
      compliance,
    ],
  },
  "ferrule-kits": {
    title: "定制卡箍管组件",
    paragraphs: [
      "恒永达提供由配套接头、卡箍和管材组成的卡箍管组件（又称卡套管组件），用于体外诊断与自动化分析仪器的液路连接。管端无需预先翻边，通过接头压紧卡箍实现管路固定与密封，支持设备研发配套、按图定制及批量装配。",
      "管材可选 FEP、PTFE、PFA，按具体卡箍结构匹配；接头按系列提供 PPS、PVDF、PEEK、POM、PP 等材质，卡箍可选 PP、ETFE。提供标准及紧凑结构，适配 M6×1、1/4-28 UNF 平底端口，管外径可选 1.6、2.0、2.5、3.0、3.2 mm，其中 FEP 管内径覆盖 0.3–2.0 mm，具体内外径按规格配套。支持定制长度、A／B 两端连接、弹簧管形式、防磨护套、限位管及管路标识；卡箍需与管外径匹配，并按规定方向及扭矩装配。",
      compliance,
    ],
  },
};
