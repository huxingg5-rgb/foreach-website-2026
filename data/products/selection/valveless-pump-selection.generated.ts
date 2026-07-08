/* =========================================================
   valveless-pump-selection.generated.ts
   产品中心｜无阀泵筛选页数据

   说明：
   1. 无阀泵为定制型产品，不按标准 SKU 做复杂筛选
   2. 页面展示 5 个定制配置卡片：RPL-P4 / RPL-P6.35 / RPL-P15 / DRPL-0109-0100 / DRPL-0119-0060
   3. 不新增独立页面样式，沿用公共产品筛选页组件
========================================================= */

import type {
  ProductSelectionFilterLabel,
  ProductSelectionProduct,
} from "./product-selection.types";

export const valvelessPumpSelectionProducts: ProductSelectionProduct[] = [
  {
    productId: "pump-rpl-p4-valveless",
    categoryId: "pumps",
    productTypeId: "valveless-pump",
    seriesId: "rpl-p4",
    cardTitle: {
      zh: "RPL-P4 小量程无阀泵",
      en: "RPL-P4 Small-Volume Valveless Pump",
      es: "RPL-P4 bomba sin válvulas de pequeño volumen",
      fr: "RPL-P4 pompe sans valve petit volume",
      ko: "RPL-P4 소용량 무밸브 펌프",
      ru: "RPL-P4 бесклапанный насос малого объема",
    },
    cardSubtitle: {
      zh: "12–80 μL/rev 小量程输送\n适用于微量加样、滴定场景\n支持定制排量与接口配置",
      en: "12–80 μL/rev small-volume dispensing\nFor micro dispensing and titration\nCustom displacement and port options",
      es: "Dosificación de pequeño volumen 12–80 μL/rev\nPara microdosificación y titulación\nOpciones personalizadas de desplazamiento y puerto",
      fr: "Dosage petit volume 12–80 μL/rev\nPour microdosage et titration\nOptions personnalisées de déplacement et de port",
      ko: "12–80 μL/rev 소용량 분주\n미량 분주 및 적정용\n맞춤 배출량 및 포트 옵션",
      ru: "Дозирование малого объема 12–80 μL/rev\nДля микродозирования и титрования\nПользовательские варианты рабочего объема и порта",
    },
    filters: {
      filter01: "RPL 无阀泵",
    },
    imageCard: "/images/products/pumps/valveless-pumps/foreach-rpl-p4-valveless-pump.webp",
    detailSlug: "rpl-p4",
    status: "active",
    sortOrder: 1101,
    searchKeywords: {
      zh: "RPL-P4 无阀泵 12–80 μL/rev 小量程 微量加样 滴定 定量输送 valveless pump",
      en: "RPL-P4 valveless pump 12–80 μL/rev micro dispensing titration",
      es: "RPL-P4 bomba sin válvulas 12–80 μL/rev microdosificación titulación",
      fr: "RPL-P4 pompe sans valve 12–80 μL/rev microdosage titration",
      ko: "RPL-P4 무밸브 펌프 12–80 μL/rev 미량 분주 적정",
      ru: "RPL-P4 бесклапанный насос 12–80 μL/rev микродозирование титрование",
    },
  },
  {
    productId: "pump-rpl-p635-valveless",
    categoryId: "pumps",
    productTypeId: "valveless-pump",
    seriesId: "rpl-p635",
    cardTitle: {
      zh: "RPL-P6.35 中小量程无阀泵",
      en: "RPL-P6.35 Mid-Small Volume Valveless Pump",
      es: "RPL-P6.35 bomba sin válvulas de volumen medio-bajo",
      fr: "RPL-P6.35 pompe sans valve moyen-petit volume",
      ko: "RPL-P6.35 중소용량 무밸브 펌프",
      ru: "RPL-P6.35 бесклапанный насос среднего-малого объема",
    },
    cardSubtitle: {
      zh: "50–300 μL/rev 中小量程输送\n适用于加样、灌装场景\n支持清洗口与液路配置",
      en: "50–300 μL/rev mid-small volume dispensing\nFor reagent dispensing and filling\nWash port and fluidic configuration options",
      es: "Dosificación de volumen medio-bajo 50–300 μL/rev\nPara dispensación de reactivos y llenado\nOpciones de puerto de lavado y configuración fluídica",
      fr: "Dosage moyen-petit volume 50–300 μL/rev\nPour distribution de réactifs et remplissage\nOptions de port de lavage et de configuration fluidique",
      ko: "50–300 μL/rev 중소용량 분주\n시약 분주 및 충전용\n세척 포트 및 유체 구성 옵션",
      ru: "Дозирование среднего-малого объема 50–300 μL/rev\nДля дозирования реагентов и наполнения\nВарианты промывочного порта и жидкостной конфигурации",
    },
    filters: {
      filter01: "RPL 无阀泵",
    },
    imageCard: "/images/products/pumps/valveless-pumps/foreach-rpl-p635-valveless-pump.webp",
    detailSlug: "rpl-p635",
    status: "active",
    sortOrder: 1102,
    searchKeywords: {
      zh: "RPL-P6.35 无阀泵 50–300 μL/rev 加样 灌装 清洗口 液路配置 valveless pump",
      en: "RPL-P6.35 valveless pump 50–300 μL/rev dispensing filling wash port",
      es: "RPL-P6.35 bomba sin válvulas 50–300 μL/rev dosificación llenado puerto de lavado",
      fr: "RPL-P6.35 pompe sans valve 50–300 μL/rev distribution remplissage port de lavage",
      ko: "RPL-P6.35 무밸브 펌프 50–300 μL/rev 분주 충전 세척 포트",
      ru: "RPL-P6.35 бесклапанный насос 50–300 μL/rev дозирование наполнение промывочный порт",
    },
  },
  {
    productId: "pump-rpl-p15-valveless",
    categoryId: "pumps",
    productTypeId: "valveless-pump",
    seriesId: "rpl-p15",
    cardTitle: {
      zh: "RPL-P15 中大量程无阀泵",
      en: "RPL-P15 Mid-Large Volume Valveless Pump",
      es: "RPL-P15 bomba sin válvulas de volumen medio-alto",
      fr: "RPL-P15 pompe sans valve moyen-grand volume",
      ko: "RPL-P15 중대용량 무밸브 펌프",
      ru: "RPL-P15 бесклапанный насос среднего-большого объема",
    },
    cardSubtitle: {
      zh: "300–1200 μL/rev 中大量程输送\n适用于加液、灌装场景\n支持接口与安装方式定制",
      en: "300–1200 μL/rev mid-large volume dispensing\nFor liquid addition and filling\nCustom ports and mounting options",
      es: "Dosificación de volumen medio-alto 300–1200 μL/rev\nPara adición de líquidos y llenado\nOpciones personalizadas de puertos y montaje",
      fr: "Dosage moyen-grand volume 300–1200 μL/rev\nPour ajout de liquide et remplissage\nOptions personnalisées de ports et de montage",
      ko: "300–1200 μL/rev 중대용량 분주\n액체 추가 및 충전용\n맞춤 포트 및 장착 옵션",
      ru: "Дозирование среднего-большого объема 300–1200 μL/rev\nДля добавления жидкости и наполнения\nПользовательские варианты портов и монтажа",
    },
    filters: {
      filter01: "RPL 无阀泵",
    },
    imageCard: "/images/products/pumps/valveless-pumps/foreach-rpl-p15-valveless-pump.webp",
    detailSlug: "rpl-p15",
    status: "active",
    sortOrder: 1103,
    searchKeywords: {
      zh: "RPL-P15 无阀泵 300–1200 μL/rev 加液 灌装 接口 安装方式 valveless pump",
      en: "RPL-P15 valveless pump 300–1200 μL/rev liquid addition filling",
      es: "RPL-P15 bomba sin válvulas 300–1200 μL/rev adición de líquidos llenado",
      fr: "RPL-P15 pompe sans valve 300–1200 μL/rev ajout de liquide remplissage",
      ko: "RPL-P15 무밸브 펌프 300–1200 μL/rev 액체 추가 충전",
      ru: "RPL-P15 бесклапанный насос 300–1200 μL/rev добавление жидкости наполнение",
    },
  },
  {
    productId: "pump-drpl-0109-valveless",
    categoryId: "pumps",
    productTypeId: "valveless-pump",
    seriesId: "drpl-0109",
    cardTitle: {
      zh: "DRPL-0109 双头无阀泵",
      en: "DRPL-0109 Dual-Head Valveless Pump",
      es: "DRPL-0109 bomba sin válvulas de doble cabezal",
      fr: "DRPL-0109 pompe sans valve à double tête",
      ko: "DRPL-0109 듀얼 헤드 무밸브 펌프",
      ru: "DRPL-0109 двухголовочный бесклапанный насос",
    },
    cardSubtitle: {
      zh: "1:9 双头比例输送结构\n浓缩液 100 μL，稀释液 900 μL\n适用于 1 mL 配液量场景",
      en: "1:9 dual-head proportional dispensing\n100 μL concentrate and 900 μL diluent\nFor 1 mL dilution and dispensing",
      es: "Dosificación proporcional de doble cabezal 1:9\n100 μL de concentrado y 900 μL de diluyente\nPara dilución y dosificación de 1 mL",
      fr: "Distribution proportionnelle double tête 1:9\n100 μL de concentré et 900 μL de diluant\nPour dilution et distribution de 1 mL",
      ko: "1:9 듀얼 헤드 비례 분주\n농축액 100 μL 및 희석액 900 μL\n1 mL 희석 및 분주용",
      ru: "Двухголовочное пропорциональное дозирование 1:9\n100 μL концентрата и 900 μL разбавителя\nДля разведения и дозирования 1 mL",
    },
    filters: {
      filter01: "DRPL 双头无阀泵",
    },
    imageCard: "/images/products/pumps/valveless-pumps/foreach-drpl-dual-head-valveless-pump.webp",
    detailSlug: "drpl-0109",
    status: "active",
    sortOrder: 1104,
    searchKeywords: {
      zh: "DRPL-0109 双头无阀泵 1:9 浓缩液 100 μL 稀释液 900 μL 配液量 1 mL QMin 60 QMax 300 比例输送 valveless pump",
      en: "DRPL-0109-0100 dual-head valveless pump 1:9 proportional dispensing 100 μL 900 μL 1 mL",
      es: "DRPL-0109-0100 bomba sin válvulas de doble cabezal 1:9 dosificación proporcional 100 μL 900 μL 1 mL",
      fr: "DRPL-0109-0100 pompe sans valve double tête 1:9 distribution proportionnelle 100 μL 900 μL 1 mL",
      ko: "DRPL-0109-0100 듀얼 헤드 무밸브 펌프 1:9 비례 분주 100 μL 900 μL 1 mL",
      ru: "DRPL-0109-0100 двухголовочный бесклапанный насос 1:9 пропорциональное дозирование 100 μL 900 μL 1 mL",
    },
  },
  {
    productId: "pump-drpl-0119-valveless",
    categoryId: "pumps",
    productTypeId: "valveless-pump",
    seriesId: "drpl-0119",
    cardTitle: {
      zh: "DRPL-0119 双头无阀泵",
      en: "DRPL-0119 Dual-Head Valveless Pump",
      es: "DRPL-0119 bomba sin válvulas de doble cabezal",
      fr: "DRPL-0119 pompe sans valve à double tête",
      ko: "DRPL-0119 듀얼 헤드 무밸브 펌프",
      ru: "DRPL-0119 двухголовочный бесклапанный насос",
    },
    cardSubtitle: {
      zh: "1:19 双头比例输送结构\n浓缩液 60 μL，稀释液 1140 μL\n适用于 1.2 mL 配液量场景",
      en: "1:19 dual-head proportional dispensing\n60 μL concentrate and 1140 μL diluent\nFor 1.2 mL dilution and dispensing",
      es: "Dosificación proporcional de doble cabezal 1:19\n60 μL de concentrado y 1140 μL de diluyente\nPara dilución y dosificación de 1.2 mL",
      fr: "Distribution proportionnelle double tête 1:19\n60 μL de concentré et 1140 μL de diluant\nPour dilution et distribution de 1.2 mL",
      ko: "1:19 듀얼 헤드 비례 분주\n농축액 60 μL 및 희석액 1140 μL\n1.2 mL 희석 및 분주용",
      ru: "Двухголовочное пропорциональное дозирование 1:19\n60 μL концентрата и 1140 μL разбавителя\nДля разведения и дозирования 1.2 mL",
    },
    filters: {
      filter01: "DRPL 双头无阀泵",
    },
    imageCard: "/images/products/pumps/valveless-pumps/foreach-drpl-dual-head-valveless-pump.webp",
    detailSlug: "drpl-0119",
    status: "active",
    sortOrder: 1105,
    searchKeywords: {
      zh: "DRPL-0119 双头无阀泵 1:19 浓缩液 60 μL 稀释液 1140 μL 配液量 1.2 mL QMin 72 QMax 360 比例输送 valveless pump",
      en: "DRPL-0119-0060 dual-head valveless pump 1:19 proportional dispensing 60 μL 1140 μL 1.2 mL",
      es: "DRPL-0119-0060 bomba sin válvulas de doble cabezal 1:19 dosificación proporcional 60 μL 1140 μL 1.2 mL",
      fr: "DRPL-0119-0060 pompe sans valve double tête 1:19 distribution proportionnelle 60 μL 1140 μL 1.2 mL",
      ko: "DRPL-0119-0060 듀얼 헤드 무밸브 펌프 1:19 비례 분주 60 μL 1140 μL 1.2 mL",
      ru: "DRPL-0119-0060 двухголовочный бесклапанный насос 1:19 пропорциональное дозирование 60 μL 1140 μL 1.2 mL",
    },
  },
];

export const valvelessPumpFilterLabels: ProductSelectionFilterLabel[] = [
  {
    categoryId: "pumps",
    productTypeId: "valveless-pump",
    filterKey: "filter01",
    label: {
      zh: "产品系列",
      en: "Series",
      es: "Serie",
      fr: "Série",
      ko: "시리즈",
      ru: "Серия",
    },
    inputType: "single",
    sortOrder: 10,
    visible: true,
  },
];