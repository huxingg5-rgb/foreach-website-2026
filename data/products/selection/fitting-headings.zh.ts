import { productOverviewHeadings } from "./product-overview-headings";
import { productIntroductionsZh } from "./product-introductions.zh";
export type FittingIntroZh = {
  title: string;
  image: { src: string; alt: string; width: number; height: number };
  paragraphs: string[];
  features: { title: string; description: string }[];
};

export const fittingOverviewHeadingZh = productOverviewHeadings.fittings.zh;

export const fittingOverviewParagraphsZh = productIntroductionsZh["fittings"];

export const fittingIntrosZh: Partial<Record<string, FittingIntroZh>> = {
  "hard-tube-fittings": {
    "title": "微流体硬管接头：平底翻边、卡箍、卡环与高压连接",
    "image": {
      "src": "/images/products/fittings/series/catalog-a02-hard-tube-fittings.webp",
      "alt": "FOREACH 平底、卡箍、卡环及高压硬管接头组合",
      "width": 1376,
      "height": 665
    },
    "paragraphs": productIntroductionsZh["fittings:hard-tube-fittings"],
    "features": []
  },
  "barbed-fittings": {
    "title": "微型软管倒刺接头：直通、转向、分流与变径连接",
    "image": {
      "src": "/images/products/fittings/series/catalog-a02-barbed-fittings.webp",
      "alt": "FOREACH 直通、L 型、T 型与 Y 型等软管倒刺接头",
      "width": 769,
      "height": 630
    },
    "paragraphs": productIntroductionsZh["fittings:barbed-fittings"],
    "features": []
  },
  "thread-to-barbed-fittings": {
    "title": "螺纹转倒刺接头：螺纹端口与软管连接转换",
    "image": {
      "src": "/images/products/fittings/series/catalog-a02-thread-to-barbed-fittings.webp",
      "alt": "FOREACH 直通、L 型及可旋转螺纹转倒刺接头组合",
      "width": 893,
      "height": 621
    },
    "paragraphs": productIntroductionsZh["fittings:thread-to-barbed-fittings"],
    "features": []
  },
  "luer-fittings": {
    "title": "鲁尔接头：公母端连接、锁紧结构与管路转接",
    "image": {
      "src": "/images/products/fittings/series/catalog-a02-luer-fittings.webp",
      "alt": "FOREACH 公母鲁尔接头、锁圈、穿板螺母与颜色识别环",
      "width": 1122,
      "height": 679
    },
    "paragraphs": productIntroductionsZh["fittings:luer-fittings"],
    "features": []
  },
  "quick-connect-fittings": {
    "title": "微流体快插接头：快速拆装、带阀连接与面板安装",
    "image": {
      "src": "/images/products/fittings/series/catalog-a02-quick-connect-fittings.webp",
      "alt": "FOREACH Q20、Q40、Q60 快插接头公母端与穿板配置",
      "width": 1342,
      "height": 895
    },
    "paragraphs": productIntroductionsZh["fittings:quick-connect-fittings"],
    "features": []
  },
  "female-thread-adapters": {
    "title": "内螺纹连接件与转接头：管路对接、接口转换与分流汇流",
    "image": {
      "src": "/images/products/fittings/series/catalog-a02-female-thread-adapters.webp",
      "alt": "FOREACH 内螺纹二通、方形二通、T 型、Y 型及穿板连接件",
      "width": 1147,
      "height": 609
    },
    "paragraphs": productIntroductionsZh["fittings:female-thread-adapters"],
    "features": []
  },
  "bulkhead-barbed-fittings": {
    "title": "穿板倒刺接头：面板固定与软管贯通连接",
    "image": {
      "src": "/images/products/fittings/series/catalog-a02-bulkhead-barbed-fittings.webp",
      "alt": "FOREACH PMB 穿板倒刺接头与 PMBSN 六角螺母",
      "width": 607,
      "height": 250
    },
    "paragraphs": productIntroductionsZh["fittings:bulkhead-barbed-fittings"],
    "features": []
  },
  "filters": {
    "title": "管路过滤器与单向阀：颗粒过滤与防倒流",
    "image": {
      "src": "/images/products/fittings/series/catalog-a02-filters.webp",
      "alt": "FOREACH 画册中的管路过滤器组合",
      "width": 1000,
      "height": 500
    },
    "paragraphs": productIntroductionsZh["fittings:filters"],
    "features": []
  }
};
