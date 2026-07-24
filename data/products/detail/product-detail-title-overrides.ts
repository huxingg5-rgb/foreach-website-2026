/* =========================================================
   product-detail-title-overrides.ts
   FOREACH 官网｜泵、阀、智控详情页完整多语言标题

   范围：
   - 53 个泵详情
   - 3 个阀详情
   - ABD、PDM5
   - 共 58 个详情产品

   排除：
   - 针
   - 接头
   - 管路
========================================================= */

export type ProductDetailTitleLocale =
  | "en"
  | "es"
  | "fr"
  | "ko"
  | "ru";

type ProductDetailTitleLocaleMap = Record<
  ProductDetailTitleLocale,
  string
>;

export const PRODUCT_DETAIL_TITLE_OVERRIDES: Record<
  string,
  ProductDetailTitleLocaleMap
> = {
  "ea-100-peek": {
    en: "EA-100-PEEK Standard Plunger Pump",
    es: "EA-100-PEEK Bomba de émbolo estándar",
    fr: "EA-100-PEEK Pompe à piston standard",
    ko: "EA-100-PEEK 표준 플런저 펌프",
    ru: "EA-100-PEEK Стандартный плунжерный насос",
  },
  "ea-100-pmma": {
    en: "EA-100-PMMA Standard Plunger Pump",
    es: "EA-100-PMMA Bomba de émbolo estándar",
    fr: "EA-100-PMMA Pompe à piston standard",
    ko: "EA-100-PMMA 표준 플런저 펌프",
    ru: "EA-100-PMMA Стандартный плунжерный насос",
  },
  "ea-1000-peek": {
    en: "EA-1000-PEEK Standard Plunger Pump",
    es: "EA-1000-PEEK Bomba de émbolo estándar",
    fr: "EA-1000-PEEK Pompe à piston standard",
    ko: "EA-1000-PEEK 표준 플런저 펌프",
    ru: "EA-1000-PEEK Стандартный плунжерный насос",
  },
  "ea-1000-pmma": {
    en: "EA-1000-PMMA Standard Plunger Pump",
    es: "EA-1000-PMMA Bomba de émbolo estándar",
    fr: "EA-1000-PMMA Pompe à piston standard",
    ko: "EA-1000-PMMA 표준 플런저 펌프",
    ru: "EA-1000-PMMA Стандартный плунжерный насос",
  },
  "ea-10000-peek": {
    en: "EA-10000-PEEK Standard Plunger Pump",
    es: "EA-10000-PEEK Bomba de émbolo estándar",
    fr: "EA-10000-PEEK Pompe à piston standard",
    ko: "EA-10000-PEEK 표준 플런저 펌프",
    ru: "EA-10000-PEEK Стандартный плунжерный насос",
  },
  "ea-10000-pmma": {
    en: "EA-10000-PMMA Standard Plunger Pump",
    es: "EA-10000-PMMA Bomba de émbolo estándar",
    fr: "EA-10000-PMMA Pompe à piston standard",
    ko: "EA-10000-PMMA 표준 플런저 펌프",
    ru: "EA-10000-PMMA Стандартный плунжерный насос",
  },
  "ea-250-peek": {
    en: "EA-250-PEEK Standard Plunger Pump",
    es: "EA-250-PEEK Bomba de émbolo estándar",
    fr: "EA-250-PEEK Pompe à piston standard",
    ko: "EA-250-PEEK 표준 플런저 펌프",
    ru: "EA-250-PEEK Стандартный плунжерный насос",
  },
  "ea-250-pmma": {
    en: "EA-250-PMMA Standard Plunger Pump",
    es: "EA-250-PMMA Bomba de émbolo estándar",
    fr: "EA-250-PMMA Pompe à piston standard",
    ko: "EA-250-PMMA 표준 플런저 펌프",
    ru: "EA-250-PMMA Стандартный плунжерный насос",
  },
  "ea-2500-peek": {
    en: "EA-2500-PEEK Standard Plunger Pump",
    es: "EA-2500-PEEK Bomba de émbolo estándar",
    fr: "EA-2500-PEEK Pompe à piston standard",
    ko: "EA-2500-PEEK 표준 플런저 펌프",
    ru: "EA-2500-PEEK Стандартный плунжерный насос",
  },
  "ea-2500-pmma": {
    en: "EA-2500-PMMA Standard Plunger Pump",
    es: "EA-2500-PMMA Bomba de émbolo estándar",
    fr: "EA-2500-PMMA Pompe à piston standard",
    ko: "EA-2500-PMMA 표준 플런저 펌프",
    ru: "EA-2500-PMMA Стандартный плунжерный насос",
  },
  "ea-500-peek": {
    en: "EA-500-PEEK Standard Plunger Pump",
    es: "EA-500-PEEK Bomba de émbolo estándar",
    fr: "EA-500-PEEK Pompe à piston standard",
    ko: "EA-500-PEEK 표준 플런저 펌프",
    ru: "EA-500-PEEK Стандартный плунжерный насос",
  },
  "ea-500-pmma": {
    en: "EA-500-PMMA Standard Plunger Pump",
    es: "EA-500-PMMA Bomba de émbolo estándar",
    fr: "EA-500-PMMA Pompe à piston standard",
    ko: "EA-500-PMMA 표준 플런저 펌프",
    ru: "EA-500-PMMA Стандартный плунжерный насос",
  },
  "ea-5000-peek": {
    en: "EA-5000-PEEK Standard Plunger Pump",
    es: "EA-5000-PEEK Bomba de émbolo estándar",
    fr: "EA-5000-PEEK Pompe à piston standard",
    ko: "EA-5000-PEEK 표준 플런저 펌프",
    ru: "EA-5000-PEEK Стандартный плунжерный насос",
  },
  "ea-5000-pmma": {
    en: "EA-5000-PMMA Standard Plunger Pump",
    es: "EA-5000-PMMA Bomba de émbolo estándar",
    fr: "EA-5000-PMMA Pompe à piston standard",
    ko: "EA-5000-PMMA 표준 플런저 펌프",
    ru: "EA-5000-PMMA Стандартный плунжерный насос",
  },
  "sm-100-peek": {
    en: "SM-100-PEEK Miniature Plunger Pump",
    es: "SM-100-PEEK Bomba de émbolo miniatura",
    fr: "SM-100-PEEK Pompe à piston miniature",
    ko: "SM-100-PEEK 소형 플런저 펌프",
    ru: "SM-100-PEEK Миниатюрный плунжерный насос",
  },
  "sm-100-pmma": {
    en: "SM-100-PMMA Miniature Plunger Pump",
    es: "SM-100-PMMA Bomba de émbolo miniatura",
    fr: "SM-100-PMMA Pompe à piston miniature",
    ko: "SM-100-PMMA 소형 플런저 펌프",
    ru: "SM-100-PMMA Миниатюрный плунжерный насос",
  },
  "sm-1000-pmma": {
    en: "SM-1000-PMMA Miniature Plunger Pump",
    es: "SM-1000-PMMA Bomba de émbolo miniatura",
    fr: "SM-1000-PMMA Pompe à piston miniature",
    ko: "SM-1000-PMMA 소형 플런저 펌프",
    ru: "SM-1000-PMMA Миниатюрный плунжерный насос",
  },
  "sm-250-peek": {
    en: "SM-250-PEEK Miniature Plunger Pump",
    es: "SM-250-PEEK Bomba de émbolo miniatura",
    fr: "SM-250-PEEK Pompe à piston miniature",
    ko: "SM-250-PEEK 소형 플런저 펌프",
    ru: "SM-250-PEEK Миниатюрный плунжерный насос",
  },
  "sm-250-pmma": {
    en: "SM-250-PMMA Miniature Plunger Pump",
    es: "SM-250-PMMA Bomba de émbolo miniatura",
    fr: "SM-250-PMMA Pompe à piston miniature",
    ko: "SM-250-PMMA 소형 플런저 펌프",
    ru: "SM-250-PMMA Миниатюрный плунжерный насос",
  },
  "sm-50-pmma": {
    en: "SM-50-PMMA Miniature Plunger Pump",
    es: "SM-50-PMMA Bomba de émbolo miniatura",
    fr: "SM-50-PMMA Pompe à piston miniature",
    ko: "SM-50-PMMA 소형 플런저 펌프",
    ru: "SM-50-PMMA Миниатюрный плунжерный насос",
  },
  "sm-500-pmma": {
    en: "SM-500-PMMA Miniature Plunger Pump",
    es: "SM-500-PMMA Bomba de émbolo miniatura",
    fr: "SM-500-PMMA Pompe à piston miniature",
    ko: "SM-500-PMMA 소형 플런저 펌프",
    ru: "SM-500-PMMA Миниатюрный плунжерный насос",
  },
  "tm-100-pmma": {
    en: "TM-100-PMMA Ultra-Compact Plunger Pump",
    es: "TM-100-PMMA Bomba de émbolo ultracompacta",
    fr: "TM-100-PMMA Pompe à piston ultracompacte",
    ko: "TM-100-PMMA 초소형 플런저 펌프",
    ru: "TM-100-PMMA Ультракомпактный плунжерный насос",
  },
  "tm-250-pmma": {
    en: "TM-250-PMMA Ultra-Compact Plunger Pump",
    es: "TM-250-PMMA Bomba de émbolo ultracompacta",
    fr: "TM-250-PMMA Pompe à piston ultracompacte",
    ko: "TM-250-PMMA 초소형 플런저 펌프",
    ru: "TM-250-PMMA Ультракомпактный плунжерный насос",
  },
  "tm-50-pmma": {
    en: "TM-50-PMMA Ultra-Compact Plunger Pump",
    es: "TM-50-PMMA Bomba de émbolo ultracompacta",
    fr: "TM-50-PMMA Pompe à piston ultracompacte",
    ko: "TM-50-PMMA 초소형 플런저 펌프",
    ru: "TM-50-PMMA Ультракомпактный плунжерный насос",
  },
  "tm-500-pmma": {
    en: "TM-500-PMMA Ultra-Compact Plunger Pump",
    es: "TM-500-PMMA Bomba de émbolo ultracompacta",
    fr: "TM-500-PMMA Pompe à piston ultracompacte",
    ko: "TM-500-PMMA 초소형 플런저 펌프",
    ru: "TM-500-PMMA Ультракомпактный плунжерный насос",
  },
  "hmd3-30mm-solenoid-syringe-pump": {
    en: "HMD3 30 mm Solenoid Valve Syringe Pump",
    es: "HMD3 Bomba de jeringa de 30 mm con electroválvula",
    fr: "HMD3 Pompe seringue de 30 mm à électrovanne",
    ko: "HMD3 30 mm 솔레노이드 밸브 시린지 펌프",
    ru: "HMD3 Шприцевой насос 30 мм с электромагнитным клапаном",
  },
  "hmd6-60mm-solenoid-syringe-pump": {
    en: "HMD6 60 mm Solenoid Valve Syringe Pump",
    es: "HMD6 Bomba de jeringa de 60 mm con electroválvula",
    fr: "HMD6 Pompe seringue de 60 mm à électrovanne",
    ko: "HMD6 60 mm 솔레노이드 밸브 시린지 펌프",
    ru: "HMD6 Шприцевой насос 60 мм с электромагнитным клапаном",
  },
  "hld3-30mm-rotary-valve-syringe-pump": {
    en: "HLD3 30 mm Rotary Valve Syringe Pump",
    es: "HLD3 Bomba de jeringa de 30 mm con válvula rotativa",
    fr: "HLD3 Pompe seringue de 30 mm à vanne rotative",
    ko: "HLD3 30 mm 로터리 밸브 시린지 펌프",
    ru: "HLD3 Шприцевой насос 30 мм с поворотным клапаном",
  },
  "hld6-60mm-rotary-valve-syringe-pump": {
    en: "HLD6 60 mm Rotary Valve Syringe Pump",
    es: "HLD6 Bomba de jeringa de 60 mm con válvula rotativa",
    fr: "HLD6 Pompe seringue de 60 mm à vanne rotative",
    ko: "HLD6 60 mm 로터리 밸브 시린지 펌프",
    ru: "HLD6 Шприцевой насос 60 мм с поворотным клапаном",
  },
  "dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump": {
    en: "DPGL800-24BS6-EP/PS Gas-Liquid Diaphragm Pump",
    es: "DPGL800-24BS6-EP/PS Bomba de diafragma para gas y líquido",
    fr: "DPGL800-24BS6-EP/PS Pompe à membrane pour gaz et liquide",
    ko: "DPGL800-24BS6-EP/PS 기액 혼합 다이어프램 펌프",
    ru: "DPGL800-24BS6-EP/PS Мембранный насос для газожидкостной смеси",
  },
  "dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump": {
    en: "DPGL800-24BS6-FF/PS Gas-Liquid Diaphragm Pump",
    es: "DPGL800-24BS6-FF/PS Bomba de diafragma para gas y líquido",
    fr: "DPGL800-24BS6-FF/PS Pompe à membrane pour gaz et liquide",
    ko: "DPGL800-24BS6-FF/PS 기액 혼합 다이어프램 펌프",
    ru: "DPGL800-24BS6-FF/PS Мембранный насос для газожидкостной смеси",
  },
  "dpgl800-brushless-gas-liquid-diaphragm-pump": {
    en: "DPGL800 Brushless Gas-Liquid Diaphragm Pump — 6 L/min",
    es: "DPGL800 Bomba de diafragma sin escobillas para gas y líquido — 6 L/min",
    fr: "DPGL800 Pompe à membrane sans balais pour gaz et liquide — 6 L/min",
    ko: "DPGL800 브러시리스 기액 혼합 다이어프램 펌프 — 6 L/min",
    ru: "DPGL800 Бесщёточный мембранный насос для газожидкостной смеси — 6 л/мин",
  },
  "dpgl800-gas-liquid-diaphragm-pump": {
    en: "DPGL800 Gas-Liquid Diaphragm Pump",
    es: "DPGL800 Bomba de diafragma para gas y líquido",
    fr: "DPGL800 Pompe à membrane pour gaz et liquide",
    ko: "DPGL800 기액 혼합 다이어프램 펌프",
    ru: "DPGL800 Мембранный насос для газожидкостной смеси",
  },
  "dpl30-24bb-ep-ps-liquid-diaphragm-pump": {
    en: "DPL30-24BB-EP/PS Liquid Diaphragm Pump",
    es: "DPL30-24BB-EP/PS Bomba de diafragma para líquidos",
    fr: "DPL30-24BB-EP/PS Pompe à membrane pour liquides",
    ko: "DPL30-24BB-EP/PS 액체 다이어프램 펌프",
    ru: "DPL30-24BB-EP/PS Мембранный насос для жидкостей",
  },
  "dpl30-24db-ep-ps-liquid-diaphragm-pump": {
    en: "DPL30-24DB-EP/PS Liquid Diaphragm Pump",
    es: "DPL30-24DB-EP/PS Bomba de diafragma para líquidos",
    fr: "DPL30-24DB-EP/PS Pompe à membrane pour liquides",
    ko: "DPL30-24DB-EP/PS 액체 다이어프램 펌프",
    ru: "DPL30-24DB-EP/PS Мембранный насос для жидкостей",
  },
  "dpl30h-24bs-ep-ps-liquid-diaphragm-pump": {
    en: "DPL30H-24BS-EP/PS Liquid Diaphragm Pump",
    es: "DPL30H-24BS-EP/PS Bomba de diafragma para líquidos",
    fr: "DPL30H-24BS-EP/PS Pompe à membrane pour liquides",
    ko: "DPL30H-24BS-EP/PS 액체 다이어프램 펌프",
    ru: "DPL30H-24BS-EP/PS Мембранный насос для жидкостей",
  },
  "dpl30h-24ds-ep-ps-liquid-diaphragm-pump": {
    en: "DPL30H-24DS-EP/PS Liquid Diaphragm Pump",
    es: "DPL30H-24DS-EP/PS Bomba de diafragma para líquidos",
    fr: "DPL30H-24DS-EP/PS Pompe à membrane pour liquides",
    ko: "DPL30H-24DS-EP/PS 액체 다이어프램 펌프",
    ru: "DPL30H-24DS-EP/PS Мембранный насос для жидкостей",
  },
  "dpl60-24bb-ep-ps-liquid-diaphragm-pump": {
    en: "DPL60-24BB-EP/PS Liquid Diaphragm Pump",
    es: "DPL60-24BB-EP/PS Bomba de diafragma para líquidos",
    fr: "DPL60-24BB-EP/PS Pompe à membrane pour liquides",
    ko: "DPL60-24BB-EP/PS 액체 다이어프램 펌프",
    ru: "DPL60-24BB-EP/PS Мембранный насос для жидкостей",
  },
  "dpl60-24db-ep-ps-liquid-diaphragm-pump": {
    en: "DPL60-24DB-EP/PS Liquid Diaphragm Pump",
    es: "DPL60-24DB-EP/PS Bomba de diafragma para líquidos",
    fr: "DPL60-24DB-EP/PS Pompe à membrane pour liquides",
    ko: "DPL60-24DB-EP/PS 액체 다이어프램 펌프",
    ru: "DPL60-24DB-EP/PS Мембранный насос для жидкостей",
  },
  "dpl30-brushless-liquid-diaphragm-pump": {
    en: "DPL30 Brushless Liquid Diaphragm Pump — 300 mL/min, 100 kPa",
    es: "DPL30 Bomba de diafragma sin escobillas para líquidos — 300 mL/min, 100 kPa",
    fr: "DPL30 Pompe à membrane sans balais pour liquides — 300 mL/min, 100 kPa",
    ko: "DPL30 브러시리스 액체 다이어프램 펌프 — 300 mL/min, 100 kPa",
    ru: "DPL30 Бесщёточный мембранный насос для жидкостей — 300 мл/мин, 100 кПа",
  },
  "dpl30-liquid-diaphragm-pump": {
    en: "DPL30 Liquid Diaphragm Pump",
    es: "DPL30 Bomba de diafragma para líquidos",
    fr: "DPL30 Pompe à membrane pour liquides",
    ko: "DPL30 액체 다이어프램 펌프",
    ru: "DPL30 Мембранный насос для жидкостей",
  },
  "dpl30h-brushless-liquid-diaphragm-pump": {
    en: "DPL30H Brushless Liquid Diaphragm Pump — 300 mL/min, 600 kPa",
    es: "DPL30H Bomba de diafragma sin escobillas para líquidos — 300 mL/min, 600 kPa",
    fr: "DPL30H Pompe à membrane sans balais pour liquides — 300 mL/min, 600 kPa",
    ko: "DPL30H 브러시리스 액체 다이어프램 펌프 — 300 mL/min, 600 kPa",
    ru: "DPL30H Бесщёточный мембранный насос для жидкостей — 300 мл/мин, 600 кПа",
  },
  "dpl30h-liquid-diaphragm-pump": {
    en: "DPL30H Liquid Diaphragm Pump",
    es: "DPL30H Bomba de diafragma para líquidos",
    fr: "DPL30H Pompe à membrane pour liquides",
    ko: "DPL30H 액체 다이어프램 펌프",
    ru: "DPL30H Мембранный насос для жидкостей",
  },
  "dpl60-brushless-liquid-diaphragm-pump": {
    en: "DPL60 Brushless Liquid Diaphragm Pump — 600 mL/min, 100 kPa",
    es: "DPL60 Bomba de diafragma sin escobillas para líquidos — 600 mL/min, 100 kPa",
    fr: "DPL60 Pompe à membrane sans balais pour liquides — 600 mL/min, 100 kPa",
    ko: "DPL60 브러시리스 액체 다이어프램 펌프 — 600 mL/min, 100 kPa",
    ru: "DPL60 Бесщёточный мембранный насос для жидкостей — 600 мл/мин, 100 кПа",
  },
  "dpl60-liquid-diaphragm-pump": {
    en: "DPL60 Liquid Diaphragm Pump",
    es: "DPL60 Bomba de diafragma para líquidos",
    fr: "DPL60 Pompe à membrane pour liquides",
    ko: "DPL60 액체 다이어프램 펌프",
    ru: "DPL60 Мембранный насос для жидкостей",
  },
  "drpl-0109": {
    en: "DRPL-0109 1:9 Dilution-Ratio Dual-Head Valveless Piston Pump",
    es: "DRPL-0109 Bomba de pistón sin válvulas de doble cabezal con relación de dilución 1:9",
    fr: "DRPL-0109 Pompe à piston sans clapet à double tête, rapport de dilution 1:9",
    ko: "DRPL-0109 희석비 1:9 듀얼 헤드 무밸브 피스톤 펌프",
    ru: "DRPL-0109 Двухголовочный бесклапанный поршневой насос с коэффициентом разбавления 1:9",
  },
  "drpl-0119": {
    en: "DRPL-0119 1:19 Dilution-Ratio Dual-Head Valveless Piston Pump",
    es: "DRPL-0119 Bomba de pistón sin válvulas de doble cabezal con relación de dilución 1:19",
    fr: "DRPL-0119 Pompe à piston sans clapet à double tête, rapport de dilution 1:19",
    ko: "DRPL-0119 희석비 1:19 듀얼 헤드 무밸브 피스톤 펌프",
    ru: "DRPL-0119 Двухголовочный бесклапанный поршневой насос с коэффициентом разбавления 1:19",
  },
  "rpl-p15": {
    en: "RPL-P15 300–1200 μL/rev Medium-to-Large-Volume Valveless Piston Pump",
    es: "RPL-P15 300–1200 μL/rev Bomba de pistón sin válvulas para volúmenes medios y grandes",
    fr: "RPL-P15 300–1200 μL/rev Pompe à piston sans clapet pour volumes moyens à élevés",
    ko: "RPL-P15 300–1200 μL/rev 중대용량 무밸브 피스톤 펌프",
    ru: "RPL-P15 300–1200 мкл/об Бесклапанный поршневой насос среднего и большого объёма",
  },
  "rpl-p4": {
    en: "RPL-P4 12–80 μL/rev Low-Volume Valveless Piston Pump",
    es: "RPL-P4 12–80 μL/rev Bomba de pistón sin válvulas de bajo volumen",
    fr: "RPL-P4 12–80 μL/rev Pompe à piston sans clapet pour petits volumes",
    ko: "RPL-P4 12–80 μL/rev 소용량 무밸브 피스톤 펌프",
    ru: "RPL-P4 12–80 мкл/об Бесклапанный поршневой насос малого объёма",
  },
  "rpl-p635": {
    en: "RPL-P6.35 50–300 μL/rev Small-to-Medium-Volume Valveless Piston Pump",
    es: "RPL-P6.35 50–300 μL/rev Bomba de pistón sin válvulas para volúmenes pequeños y medios",
    fr: "RPL-P6.35 50–300 μL/rev Pompe à piston sans clapet pour petits et moyens volumes",
    ko: "RPL-P6.35 50–300 μL/rev 중소용량 무밸브 피스톤 펌프",
    ru: "RPL-P6.35 50–300 мкл/об Бесклапанный поршневой насос малого и среднего объёма",
  },
  "smtp2-1000ul": {
    en: "SMTP2 1000 μL Programmable Air-Displacement Pipetting Pump",
    es: "SMTP2 1000 μL Bomba de pipeteo programable por desplazamiento de aire",
    fr: "SMTP2 1000 μL Pompe de pipetage programmable à déplacement d’air",
    ko: "SMTP2 1000 μL 프로그래머블 공기 치환식 피펫팅 펌프",
    ru: "SMTP2 1000 мкл Программируемый пипетирующий насос с вытеснением воздуха",
  },
  "smtp4-100ul": {
    en: "SMTP4 100 μL Air-Displacement Pipetting Pump",
    es: "SMTP4 100 μL Bomba de pipeteo por desplazamiento de aire",
    fr: "SMTP4 100 μL Pompe de pipetage à déplacement d’air",
    ko: "SMTP4 100 μL 공기 치환식 피펫팅 펌프",
    ru: "SMTP4 100 мкл Пипетирующий насос с вытеснением воздуха",
  },
  "smtp4-500ul": {
    en: "SMTP4 500 μL Air-Displacement Pipetting Pump",
    es: "SMTP4 500 μL Bomba de pipeteo por desplazamiento de aire",
    fr: "SMTP4 500 μL Pompe de pipetage à déplacement d’air",
    ko: "SMTP4 500 μL 공기 치환식 피펫팅 펌프",
    ru: "SMTP4 500 мкл Пипетирующий насос с вытеснением воздуха",
  },
  "high-pressure-valves": {
    en: "HP 2-Position 6-Port High-Pressure Rotary Valve with Vent",
    es: "HP Válvula rotativa de alta presión de 2 posiciones y 6 puertos con venteo",
    fr: "HP Vanne rotative haute pression à 2 positions et 6 voies avec évent",
    ko: "HP 2포지션 6포트 벤트형 고압 로터리 밸브",
    ru: "HP Поворотный клапан высокого давления, 2 позиции, 6 портов, с вентиляционным каналом",
  },
  "rotary-valves": {
    en: "MRV3 Ceramic Multiport Rotary Valve",
    es: "MRV3 Válvula rotativa cerámica multivía",
    fr: "MRV3 Vanne rotative céramique multivoies",
    ko: "MRV3 세라믹 다채널 로터리 밸브",
    ru: "MRV3 Керамический многоканальный поворотный клапан",
  },
  "solenoid-valves": {
    en: "6010 Series Solenoid Valve",
    es: "Electroválvula serie 6010",
    fr: "Électrovanne série 6010",
    ko: "6010 시리즈 솔레노이드 밸브",
    ru: "Электромагнитный клапан серии 6010",
  },
  "abd-air-bubble-detector": {
    en: "ABD Air Bubble Detection Module",
    es: "ABD Módulo de detección de burbujas de aire",
    fr: "ABD Module de détection de bulles d’air",
    ko: "ABD 기포 감지 모듈",
    ru: "ABD Модуль обнаружения воздушных пузырьков",
  },
  "pdm5-pressure-sensor": {
    en: "PDM5 Pressure Sensing Module",
    es: "PDM5 Módulo sensor de presión",
    fr: "PDM5 Module de mesure de pression",
    ko: "PDM5 압력 감지 모듈",
    ru: "PDM5 Модуль измерения давления",
  },
};

function normalizeSlug(value: unknown): string {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "");
}

function getLastPathSegment(value: unknown): string {
  const cleanPath = String(value || "")
    .split("?")[0]
    .split("#")[0]
    .replace(/\/+$/g, "");

  const segments = cleanPath
    .split("/")
    .filter(Boolean);

  return normalizeSlug(
    segments[segments.length - 1] || ""
  );
}

export function getProductDetailTitleOverride(
  data: any,
  locale: string | null | undefined,
  pathname = ""
): string {
  if (
    !locale ||
    !["en", "es", "fr", "ko", "ru"].includes(locale)
  ) {
    return "";
  }

  const slugCandidates = [
    data?.slug,
    data?.detailSlug,
    getLastPathSegment(data?.detailHref),
    getLastPathSegment(data?.href),
    getLastPathSegment(pathname),
  ]
    .map(normalizeSlug)
    .filter(Boolean);

  const slug = slugCandidates.find(
    (candidate) =>
      Boolean(PRODUCT_DETAIL_TITLE_OVERRIDES[candidate])
  );

  if (!slug) {
    return "";
  }

  return (
    PRODUCT_DETAIL_TITLE_OVERRIDES[slug][
      locale as ProductDetailTitleLocale
    ] || ""
  );
}