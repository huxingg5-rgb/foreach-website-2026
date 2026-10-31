import type { ProductSelectionProduct } from "@/data/products/selection/product-selection.types";

import { getTubingMaterialCopy } from "@/data/products/tubing/content";

const baseTubingProducts: ProductSelectionProduct[] = [
  {
    "productId": "pvc-tubing",
    "categoryId": "tubing",
    "productTypeId": "tubing",
    "seriesId": "tubing",
    "detailSlug": "pvc-tubing",
    "slug": "pvc-tubing",
    "cardTitle": {
      "zh": "PVC 管",
      "en": "PVC Tubing"
    },
    "cardSubtitle": {
      "zh": "聚氯乙烯（PVC）\n内径范围：1.6mm~19.1mm\n工作温度：-42℃~75℃",
      "en": "Polyvinyl Chloride (PVC)\nID range: 1.6mm~19.1mm\nWorking temperature: -42℃~75℃"
    },
    "description": {
      "zh": "聚氯乙烯（PVC），内径范围 1.6mm~19.1mm，工作温度 -42℃~75℃。",
      "en": "Polyvinyl Chloride (PVC), ID range 1.6mm~19.1mm, working temperature -42℃~75℃."
    },
    "imageCard": "/images/products/tubing/pvc-tubing/pvc-tubing-main.webp",
    "imagePath": "/images/products/tubing/pvc-tubing/pvc-tubing-main.webp",
    "imageAlt": {
      "zh": "FOREACH 透明柔性 PVC 管盘卷及管口展示",
      "en": "FOREACH clear flexible PVC tubing coil with an exposed tube end"
    },
    "href": "/products/tubing/pvc-tubing",
    "detailHref": "/products/tubing/pvc-tubing",
    "productDetailHref": "/products/tubing/pvc-tubing",
    "selectionHref": "/products",
    "filters": {},
    "searchKeywords": {
      "zh": "PVC 管 聚氯乙烯（PVC） 管路 管材",
      "en": "PVC Tubing Polyvinyl Chloride (PVC) tubing"
    }
  },
  {
    "productId": "peek-tubing",
    "categoryId": "tubing",
    "productTypeId": "tubing",
    "seriesId": "tubing",
    "detailSlug": "peek-tubing",
    "slug": "peek-tubing",
    "cardTitle": {
      "zh": "PEEK 管",
      "en": "PEEK Tubing"
    },
    "cardSubtitle": {
      "zh": "聚醚醚酮（PEEK）\n内径范围：0.2mm~0.8mm\n工作温度：-180℃~225℃",
      "en": "Polyether Ether Ketone (PEEK)\nID range: 0.2mm~0.8mm\nWorking temperature: -180℃~225℃"
    },
    "description": {
      "zh": "聚醚醚酮（PEEK），内径范围 0.2mm~0.8mm，工作温度 -180℃~225℃。",
      "en": "Polyether Ether Ketone (PEEK), ID range 0.2mm~0.8mm, working temperature -180℃~225℃."
    },
    "imageCard": "/images/products/tubing/peek-tubing/foreach-chemical-resistant-peek-tubing-color-options.webp",
    "imagePath": "/images/products/tubing/peek-tubing/foreach-chemical-resistant-peek-tubing-color-options.webp",
    "imageAlt": {
      "zh": "FOREACH 耐化学 PEEK 管材，展示黄色、橙色和绿色管身",
      "en": "FOREACH chemical-resistant PEEK tubing shown in yellow, orange and green"
    },
    "href": "/products/tubing/peek-tubing",
    "detailHref": "/products/tubing/peek-tubing",
    "productDetailHref": "/products/tubing/peek-tubing",
    "selectionHref": "/products",
    "filters": {},
    "searchKeywords": {
      "zh": "PEEK 管 聚醚醚酮（PEEK） 管路 管材",
      "en": "PEEK Tubing Polyether Ether Ketone (PEEK) tubing"
    }
  },
  {
    "productId": "fep-tubing",
    "categoryId": "tubing",
    "productTypeId": "tubing",
    "seriesId": "tubing",
    "detailSlug": "fep-tubing",
    "slug": "fep-tubing",
    "cardTitle": {
      "zh": "FEP 管",
      "en": "FEP Tubing"
    },
    "cardSubtitle": {
      "zh": "氟化乙烯丙烯共聚物（FEP）\n内径范围：0.3mm~2.0mm\n工作温度：-230℃~200℃",
      "en": "Fluorinated Ethylene Propylene (FEP)\nID range: 0.3mm~2.0mm\nWorking temperature: -230℃~200℃"
    },
    "description": {
      "zh": "氟化乙烯丙烯共聚物（FEP），内径范围 0.3mm~2.0mm，工作温度 -230℃~200℃。",
      "en": "Fluorinated Ethylene Propylene (FEP), ID range 0.3mm~2.0mm, working temperature -230℃~200℃."
    },
    "imageCard": "/images/products/tubing/fep-tubing/foreach-fep-tubing-clear-black-options.webp",
    "imagePath": "/images/products/tubing/fep-tubing/foreach-fep-tubing-clear-black-options.webp",
    "imageAlt": {
      "zh": "FOREACH 透明与黑色 FEP 管材展示",
      "en": "FOREACH FEP tubing in clear and black versions"
    },
    "href": "/products/tubing/fep-tubing",
    "detailHref": "/products/tubing/fep-tubing",
    "productDetailHref": "/products/tubing/fep-tubing",
    "selectionHref": "/products",
    "filters": {},
    "searchKeywords": {
      "zh": "FEP 管 氟化乙烯丙烯共聚物（FEP） 管路 管材",
      "en": "FEP Tubing Fluorinated Ethylene Propylene (FEP) tubing"
    }
  },
  {
    "productId": "tpu-tubing",
    "categoryId": "tubing",
    "productTypeId": "tubing",
    "seriesId": "tubing",
    "detailSlug": "tpu-tubing",
    "slug": "tpu-tubing",
    "cardTitle": {
      "zh": "TPU 管",
      "en": "TPU Tubing"
    },
    "cardSubtitle": {
      "zh": "热塑性聚氨酯（TPU）\n内径范围：3.7mm~7.0mm\n工作温度：-30℃~70℃",
      "en": "Thermoplastic Polyurethane (TPU)\nID range: 3.7mm~7.0mm\nWorking temperature: -30℃~70℃"
    },
    "description": {
      "zh": "热塑性聚氨酯（TPU），内径范围 3.7mm~7.0mm，工作温度 -30℃~70℃。",
      "en": "Thermoplastic Polyurethane (TPU), ID range 3.7mm~7.0mm, working temperature -30℃~70℃."
    },
    "imageCard": "/images/products/tubing/tpu-tubing/foreach-flexible-tpu-tubing-instrument-routing.webp",
    "imagePath": "/images/products/tubing/tpu-tubing/foreach-flexible-tpu-tubing-instrument-routing.webp",
    "imageAlt": {
      "zh": "FOREACH 柔性 TPU 管弯曲排列，展示仪器布管用管材",
      "en": "FOREACH flexible TPU tubing arranged in curves for instrument routing"
    },
    "href": "/products/tubing/tpu-tubing",
    "detailHref": "/products/tubing/tpu-tubing",
    "productDetailHref": "/products/tubing/tpu-tubing",
    "selectionHref": "/products",
    "filters": {},
    "searchKeywords": {
      "zh": "TPU 管 热塑性聚氨酯（TPU） 管路 管材",
      "en": "TPU Tubing Thermoplastic Polyurethane (TPU) tubing"
    }
  },
  {
    "productId": "ptfe-tubing",
    "categoryId": "tubing",
    "productTypeId": "tubing",
    "seriesId": "tubing",
    "detailSlug": "ptfe-tubing",
    "slug": "ptfe-tubing",
    "cardTitle": {
      "zh": "PTFE 管",
      "en": "PTFE Tubing"
    },
    "cardSubtitle": {
      "zh": "聚四氟乙烯（PTFE）\n内径范围：1.5mm~2.0mm\n工作温度：-200℃~260℃",
      "en": "Polytetrafluoroethylene (PTFE)\nID range: 1.5mm~2.0mm\nWorking temperature: -200℃~260℃"
    },
    "description": {
      "zh": "聚四氟乙烯（PTFE），内径范围 1.5mm~2.0mm，工作温度 -200℃~260℃。",
      "en": "Polytetrafluoroethylene (PTFE), ID range 1.5mm~2.0mm, working temperature -200℃~260℃."
    },
    "imageCard": "/images/products/tubing/ptfe-tubing/ptfe-tubing-main.webp",
    "imagePath": "/images/products/tubing/ptfe-tubing/ptfe-tubing-main.webp",
    "imageAlt": {
      "zh": "FOREACH 本色与黑色 PTFE 管盘卷展示",
      "en": "Foreach natural and black PTFE tubing coils shown together"
    },
    "href": "/products/tubing/ptfe-tubing",
    "detailHref": "/products/tubing/ptfe-tubing",
    "productDetailHref": "/products/tubing/ptfe-tubing",
    "selectionHref": "/products",
    "filters": {},
    "searchKeywords": {
      "zh": "PTFE 管 聚四氟乙烯（PTFE） 管路 管材",
      "en": "PTFE Tubing Polytetrafluoroethylene (PTFE) tubing"
    }
  },
  {
    "productId": "pfa-tubing",
    "categoryId": "tubing",
    "productTypeId": "tubing",
    "seriesId": "tubing",
    "detailSlug": "pfa-tubing",
    "slug": "pfa-tubing",
    "cardTitle": {
      "zh": "PFA 管",
      "en": "PFA Tubing"
    },
    "cardSubtitle": {
      "zh": "全氟烷氧基树脂（PFA）\n内径范围：0.5mm~1.0mm\n工作温度：-230℃~200℃",
      "en": "Perfluoroalkoxy Alkane (PFA)\nID range: 0.5mm~1.0mm\nWorking temperature: -230℃~200℃"
    },
    "description": {
      "zh": "全氟烷氧基树脂（PFA），内径范围 0.5mm~1.0mm，工作温度 -230℃~200℃。",
      "en": "Perfluoroalkoxy Alkane (PFA), ID range 0.5mm~1.0mm, working temperature -230℃~200℃."
    },
    "imageCard": "/images/products/tubing/pfa-tubing/pfa-tubing-main.webp",
    "imagePath": "/images/products/tubing/pfa-tubing/pfa-tubing-main.webp",
    "imageAlt": {
      "zh": "PFA 管",
      "en": "PFA Tubing"
    },
    "href": "/products/tubing/pfa-tubing",
    "detailHref": "/products/tubing/pfa-tubing",
    "productDetailHref": "/products/tubing/pfa-tubing",
    "selectionHref": "/products",
    "filters": {},
    "searchKeywords": {
      "zh": "PFA 管 全氟烷氧基树脂（PFA） 管路 管材",
      "en": "PFA Tubing Perfluoroalkoxy Alkane (PFA) tubing"
    }
  }
];

// Authored material copy is shared by cards, details and search indexing.
export const tubingSelectionProducts: ProductSelectionProduct[] = baseTubingProducts.map((product) => {
  const zh = getTubingMaterialCopy(product.productId, "zh")!;
  const en = getTubingMaterialCopy(product.productId, "en")!;
  return {
    ...product,
    cardTitle: { zh: zh.cardTitle, en: en.cardTitle },
    cardSubtitle: { zh: zh.cardHeading, en: en.cardHeading },
    description: { zh: zh.seoDescription, en: en.seoDescription },
    imageAlt: { zh: zh.imageAlt, en: en.imageAlt },
    searchKeywords: { zh: `${zh.cardTitle} ${product.productId} 管材 管路`, en: `${en.cardTitle} ${product.productId} instrument tubing` },
  };
});

export const tubingSelectionCards = tubingSelectionProducts;

export default tubingSelectionProducts;
