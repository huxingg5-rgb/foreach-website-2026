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
const localizedChemicalNameMap: Record<
  Exclude<MaterialCompatibilityIntlLocale, "en">,
  Record<string, string>
> = {
  es: {
    "乙酰胺乙酸50%": "Ácido acetamidoacético al 50%",
    丙酮: "Acetona",
    "10%蚁酸": "Ácido fórmico al 10%",
    "10%氨水溶液": "Solución de amoníaco al 10%",
    环己醇: "Ciclohexanol",
    汽油: "Gasolina",
    苯: "Benceno",
    "10%硼酸水溶液": "Solución de ácido bórico al 10%",
    乙酸丁酯: "Acetato de butilo",
    "10%氯化钙溶液": "Solución de cloruro de calcio al 10%",
    氯苯: "Clorobenceno",
    氯仿: "Cloroformo",
    "氯化联苯 50%": "Bifenilo clorado al 50%",
    环己胺: "Ciclohexilamina",
    环己酮: "Ciclohexanona",
    十氢化萘: "Decalina",
    柴油: "Diésel",
    甲酰胺: "Formamida",
    邻苯二甲酸二辛酯: "Ftalato de dioctilo",
    二氧杂环己烷: "Dioxano",
    浓乙酸: "Ácido acético concentrado",
    "10%乙酸": "Ácido acético al 10%",
    "5%乙酸": "Ácido acético al 5%",
    "96%乙醇": "Etanol al 96%",
    乙酸乙酯: "Acetato de etilo",
    二乙醚: "Éter dietílico",
    氯乙烯: "Cloruro de vinilo",
    "40%氢氟酸": "Ácido fluorhídrico al 40%",
    "30%甲醛水溶液": "Solución de formaldehído al 30%",
    氟利昂: "Freón",
    果汁: "Zumo de frutas",
    乙二醇: "Etilenglicol",
    "40%乙二醇水溶液": "Solución de etilenglicol al 40%",
    丙三醇: "Glicerol",
    燃油: "Fuelóleo",
    辛烷: "Octano",
    异丙醇: "Isopropanol",
    碘酒: "Tintura de yodo",
    "50%氢氧化钾溶液": "Solución de hidróxido de potasio al 50%",
    "10%氢氧化钾溶液": "Solución de hidróxido de potasio al 10%",
    "10%重铬酸钾溶液": "Solución de dicromato de potasio al 10%",
    "1%硫酸铜溶液": "Solución de sulfato de cobre al 1%",
    二甲苯: "Xileno",
    亚麻籽油: "Aceite de linaza",
    甲醇: "Metanol",
    甲乙酮: "Metiletilcetona",
    二氯甲烷: "Diclorometano",
    "10%亚硫酸氢钠溶液": "Solución de bisulfito de sodio al 10%",
    "10%碳酸钠溶液": "Solución de carbonato de sodio al 10%",
    "10%氯化钠溶液": "Solución de cloruro de sodio al 10%",
    "10%硝酸钠溶液": "Solución de nitrato de sodio al 10%",
    "10%硫代硫酸钠": "Tiosulfato de sodio al 10%",
    "50%苏打水": "Solución de sosa al 50%",
    硝基苯: "Nitrobenceno",
    "10%的草酸溶液": "Solución de ácido oxálico al 10%",
    臭氧: "Ozono",
    石蜡油: "Aceite de parafina",
    四氯乙烯: "Tetracloroetileno",
    石油: "Petróleo",
    苯酚溶液: "Solución de fenol",
    浓磷酸: "Ácido fosfórico concentrado",
    "10%磷酸溶液": "Solución de ácido fosfórico al 10%",
    丙醇: "Propanol",
    吡啶: "Piridina",
    水杨酸: "Ácido salicílico",
    "2%硝酸溶液": "Solución de ácido nítrico al 2%",
    "36%盐酸溶液": "Solución de ácido clorhídrico al 36%",
    "2%盐酸溶液": "Solución de ácido clorhídrico al 2%",
    二氧化硫: "Dióxido de azufre",
    "98%硫酸溶液": "Solución de ácido sulfúrico al 98%",
    "2%硫酸溶液": "Solución de ácido sulfúrico al 2%",
    饱和硫化氢溶液: "Solución saturada de sulfuro de hidrógeno",
    硅油: "Aceite de silicona",
    "10%苏打溶液": "Solución de sosa al 10%",
    苯乙烯: "Estireno",
    焦油: "Alquitrán",
    四氢呋喃: "Tetrahidrofurano",
    "1,2,3,4-四氢化萘": "1,2,3,4-Tetrahidronaftaleno",
    油墨: "Tinta",
    甲苯: "Tolueno",
    三乙醇胺: "Trietanolamina",
    三氯乙烯: "Tricloroetileno",
    "10%氨羧配合剂": "Agente complejante aminocarboxilato al 10%",
    "30%过氧化氢": "Peróxido de hidrógeno al 30%",
    酒石酸: "Ácido tartárico",
  },
  fr: {
    "乙酰胺乙酸50%": "Acide acétamidoacétique à 50 %",
    丙酮: "Acétone",
    "10%蚁酸": "Acide formique à 10 %",
    "10%氨水溶液": "Solution d’ammoniaque à 10 %",
    环己醇: "Cyclohexanol",
    汽油: "Essence",
    苯: "Benzène",
    "10%硼酸水溶液": "Solution d’acide borique à 10 %",
    乙酸丁酯: "Acétate de butyle",
    "10%氯化钙溶液": "Solution de chlorure de calcium à 10 %",
    氯苯: "Chlorobenzène",
    氯仿: "Chloroforme",
    "氯化联苯 50%": "Biphényle chloré à 50 %",
    环己胺: "Cyclohexylamine",
    环己酮: "Cyclohexanone",
    十氢化萘: "Décaline",
    柴油: "Gazole",
    甲酰胺: "Formamide",
    邻苯二甲酸二辛酯: "Phtalate de dioctyle",
    二氧杂环己烷: "Dioxane",
    浓乙酸: "Acide acétique concentré",
    "10%乙酸": "Acide acétique à 10 %",
    "5%乙酸": "Acide acétique à 5 %",
    "96%乙醇": "Éthanol à 96 %",
    乙酸乙酯: "Acétate d’éthyle",
    二乙醚: "Éther diéthylique",
    氯乙烯: "Chlorure de vinyle",
    "40%氢氟酸": "Acide fluorhydrique à 40 %",
    "30%甲醛水溶液": "Solution de formaldéhyde à 30 %",
    氟利昂: "Fréon",
    果汁: "Jus de fruits",
    乙二醇: "Éthylène glycol",
    "40%乙二醇水溶液": "Solution d’éthylène glycol à 40 %",
    丙三醇: "Glycérol",
    燃油: "Fioul",
    辛烷: "Octane",
    异丙醇: "Isopropanol",
    碘酒: "Teinture d’iode",
    "50%氢氧化钾溶液": "Solution d’hydroxyde de potassium à 50 %",
    "10%氢氧化钾溶液": "Solution d’hydroxyde de potassium à 10 %",
    "10%重铬酸钾溶液": "Solution de dichromate de potassium à 10 %",
    "1%硫酸铜溶液": "Solution de sulfate de cuivre à 1 %",
    二甲苯: "Xylène",
    亚麻籽油: "Huile de lin",
    甲醇: "Méthanol",
    甲乙酮: "Méthyléthylcétone",
    二氯甲烷: "Dichlorométhane",
    "10%亚硫酸氢钠溶液": "Solution de bisulfite de sodium à 10 %",
    "10%碳酸钠溶液": "Solution de carbonate de sodium à 10 %",
    "10%氯化钠溶液": "Solution de chlorure de sodium à 10 %",
    "10%硝酸钠溶液": "Solution de nitrate de sodium à 10 %",
    "10%硫代硫酸钠": "Thiosulfate de sodium à 10 %",
    "50%苏打水": "Solution de soude à 50 %",
    硝基苯: "Nitrobenzène",
    "10%的草酸溶液": "Solution d’acide oxalique à 10 %",
    臭氧: "Ozone",
    石蜡油: "Huile de paraffine",
    四氯乙烯: "Tétrachloroéthylène",
    石油: "Pétrole",
    苯酚溶液: "Solution de phénol",
    浓磷酸: "Acide phosphorique concentré",
    "10%磷酸溶液": "Solution d’acide phosphorique à 10 %",
    丙醇: "Propanol",
    吡啶: "Pyridine",
    水杨酸: "Acide salicylique",
    "2%硝酸溶液": "Solution d’acide nitrique à 2 %",
    "36%盐酸溶液": "Solution d’acide chlorhydrique à 36 %",
    "2%盐酸溶液": "Solution d’acide chlorhydrique à 2 %",
    二氧化硫: "Dioxyde de soufre",
    "98%硫酸溶液": "Solution d’acide sulfurique à 98 %",
    "2%硫酸溶液": "Solution d’acide sulfurique à 2 %",
    饱和硫化氢溶液: "Solution saturée de sulfure d’hydrogène",
    硅油: "Huile de silicone",
    "10%苏打溶液": "Solution de soude à 10 %",
    苯乙烯: "Styrène",
    焦油: "Goudron",
    四氢呋喃: "Tétrahydrofurane",
    "1,2,3,4-四氢化萘": "1,2,3,4-Tétrahydronaphtalène",
    油墨: "Encre",
    甲苯: "Toluène",
    三乙醇胺: "Triéthanolamine",
    三氯乙烯: "Trichloroéthylène",
    "10%氨羧配合剂": "Agent complexant aminocarboxylate à 10 %",
    "30%过氧化氢": "Peroxyde d’hydrogène à 30 %",
    酒石酸: "Acide tartrique",
  },
  ko: {
    "乙酰胺乙酸50%": "아세트아미도아세트산 50%",
    丙酮: "아세톤",
    "10%蚁酸": "개미산 10%",
    "10%氨水溶液": "암모니아수 10%",
    环己醇: "사이클로헥산올",
    汽油: "가솔린",
    苯: "벤젠",
    "10%硼酸水溶液": "붕산 수용액 10%",
    乙酸丁酯: "아세트산 부틸",
    "10%氯化钙溶液": "염화칼슘 용액 10%",
    氯苯: "클로로벤젠",
    氯仿: "클로로포름",
    "氯化联苯 50%": "염화비페닐 50%",
    环己胺: "사이클로헥실아민",
    环己酮: "사이클로헥사논",
    十氢化萘: "데칼린",
    柴油: "디젤유",
    甲酰胺: "포름아미드",
    邻苯二甲酸二辛酯: "프탈산 디옥틸",
    二氧杂环己烷: "다이옥산",
    浓乙酸: "농축 아세트산",
    "10%乙酸": "아세트산 10%",
    "5%乙酸": "아세트산 5%",
    "96%乙醇": "에탄올 96%",
    乙酸乙酯: "아세트산 에틸",
    二乙醚: "디에틸에터",
    氯乙烯: "염화비닐",
    "40%氢氟酸": "불산 40%",
    "30%甲醛水溶液": "포름알데히드 수용액 30%",
    氟利昂: "프레온",
    果汁: "과즙",
    乙二醇: "에틸렌글리콜",
    "40%乙二醇水溶液": "에틸렌글리콜 수용액 40%",
    丙三醇: "글리세롤",
    燃油: "연료유",
    辛烷: "옥테인",
    异丙醇: "아이소프로판올",
    碘酒: "요오드 팅크",
    "50%氢氧化钾溶液": "수산화칼륨 용액 50%",
    "10%氢氧化钾溶液": "수산화칼륨 용액 10%",
    "10%重铬酸钾溶液": "중크롬산칼륨 용액 10%",
    "1%硫酸铜溶液": "황산구리 용액 1%",
    二甲苯: "자일렌",
    亚麻籽油: "아마인유",
    甲醇: "메탄올",
    甲乙酮: "메틸에틸케톤",
    二氯甲烷: "디클로로메탄",
    "10%亚硫酸氢钠溶液": "아황산수소나트륨 용액 10%",
    "10%碳酸钠溶液": "탄산나트륨 용액 10%",
    "10%氯化钠溶液": "염화나트륨 용액 10%",
    "10%硝酸钠溶液": "질산나트륨 용액 10%",
    "10%硫代硫酸钠": "티오황산나트륨 10%",
    "50%苏打水": "소다 용액 50%",
    硝基苯: "니트로벤젠",
    "10%的草酸溶液": "옥살산 용액 10%",
    臭氧: "오존",
    石蜡油: "파라핀 오일",
    四氯乙烯: "테트라클로로에틸렌",
    石油: "석유",
    苯酚溶液: "페놀 용액",
    浓磷酸: "농축 인산",
    "10%磷酸溶液": "인산 용액 10%",
    丙醇: "프로판올",
    吡啶: "피리딘",
    水杨酸: "살리실산",
    "2%硝酸溶液": "질산 용액 2%",
    "36%盐酸溶液": "염산 용액 36%",
    "2%盐酸溶液": "염산 용액 2%",
    二氧化硫: "이산화황",
    "98%硫酸溶液": "황산 용액 98%",
    "2%硫酸溶液": "황산 용액 2%",
    饱和硫化氢溶液: "포화 황화수소 용액",
    硅油: "실리콘 오일",
    "10%苏打溶液": "소다 용액 10%",
    苯乙烯: "스타이렌",
    焦油: "타르",
    四氢呋喃: "테트라하이드로푸란",
    "1,2,3,4-四氢化萘": "1,2,3,4-테트라하이드로나프탈렌",
    油墨: "잉크",
    甲苯: "톨루엔",
    三乙醇胺: "트리에탄올아민",
    三氯乙烯: "트리클로로에틸렌",
    "10%氨羧配合剂": "아미노카복실레이트 착화제 10%",
    "30%过氧化氢": "과산화수소 30%",
    酒石酸: "타르타르산",
  },
  ru: {
    "乙酰胺乙酸50%": "Ацетамидоуксусная кислота 50%",
    丙酮: "Ацетон",
    "10%蚁酸": "Муравьиная кислота 10%",
    "10%氨水溶液": "Раствор аммиака 10%",
    环己醇: "Циклогексанол",
    汽油: "Бензин",
    苯: "Бензол",
    "10%硼酸水溶液": "Раствор борной кислоты 10%",
    乙酸丁酯: "Бутилацетат",
    "10%氯化钙溶液": "Раствор хлорида кальция 10%",
    氯苯: "Хлорбензол",
    氯仿: "Хлороформ",
    "氯化联苯 50%": "Хлорированный бифенил 50%",
    环己胺: "Циклогексиламин",
    环己酮: "Циклогексанон",
    十氢化萘: "Декалин",
    柴油: "Дизельное топливо",
    甲酰胺: "Формамид",
    邻苯二甲酸二辛酯: "Диоктилфталат",
    二氧杂环己烷: "Диоксан",
    浓乙酸: "Концентрированная уксусная кислота",
    "10%乙酸": "Уксусная кислота 10%",
    "5%乙酸": "Уксусная кислота 5%",
    "96%乙醇": "Этанол 96%",
    乙酸乙酯: "Этилацетат",
    二乙醚: "Диэтиловый эфир",
    氯乙烯: "Винилхлорид",
    "40%氢氟酸": "Плавиковая кислота 40%",
    "30%甲醛水溶液": "Раствор формальдегида 30%",
    氟利昂: "Фреон",
    果汁: "Фруктовый сок",
    乙二醇: "Этиленгликоль",
    "40%乙二醇水溶液": "Раствор этиленгликоля 40%",
    丙三醇: "Глицерин",
    燃油: "Топочный мазут",
    辛烷: "Октан",
    异丙醇: "Изопропанол",
    碘酒: "Йодная настойка",
    "50%氢氧化钾溶液": "Раствор гидроксида калия 50%",
    "10%氢氧化钾溶液": "Раствор гидроксида калия 10%",
    "10%重铬酸钾溶液": "Раствор дихромата калия 10%",
    "1%硫酸铜溶液": "Раствор сульфата меди 1%",
    二甲苯: "Ксилол",
    亚麻籽油: "Льняное масло",
    甲醇: "Метанол",
    甲乙酮: "Метилэтилкетон",
    二氯甲烷: "Дихлорметан",
    "10%亚硫酸氢钠溶液": "Раствор бисульфита натрия 10%",
    "10%碳酸钠溶液": "Раствор карбоната натрия 10%",
    "10%氯化钠溶液": "Раствор хлорида натрия 10%",
    "10%硝酸钠溶液": "Раствор нитрата натрия 10%",
    "10%硫代硫酸钠": "Тиосульфат натрия 10%",
    "50%苏打水": "Раствор соды 50%",
    硝基苯: "Нитробензол",
    "10%的草酸溶液": "Раствор щавелевой кислоты 10%",
    臭氧: "Озон",
    石蜡油: "Парафиновое масло",
    四氯乙烯: "Тетрахлорэтилен",
    石油: "Нефть",
    苯酚溶液: "Раствор фенола",
    浓磷酸: "Концентрированная фосфорная кислота",
    "10%磷酸溶液": "Раствор фосфорной кислоты 10%",
    丙醇: "Пропанол",
    吡啶: "Пиридин",
    水杨酸: "Салициловая кислота",
    "2%硝酸溶液": "Раствор азотной кислоты 2%",
    "36%盐酸溶液": "Раствор соляной кислоты 36%",
    "2%盐酸溶液": "Раствор соляной кислоты 2%",
    二氧化硫: "Диоксид серы",
    "98%硫酸溶液": "Раствор серной кислоты 98%",
    "2%硫酸溶液": "Раствор серной кислоты 2%",
    饱和硫化氢溶液: "Насыщенный раствор сероводорода",
    硅油: "Силиконовое масло",
    "10%苏打溶液": "Раствор соды 10%",
    苯乙烯: "Стирол",
    焦油: "Дёготь",
    四氢呋喃: "Тетрагидрофуран",
    "1,2,3,4-四氢化萘": "1,2,3,4-Тетрагидронафталин",
    油墨: "Чернила",
    甲苯: "Толуол",
    三乙醇胺: "Триэтаноламин",
    三氯乙烯: "Трихлорэтилен",
    "10%氨羧配合剂": "Аминокарбоксилатный комплексообразователь 10%",
    "30%过氧化氢": "Пероксид водорода 30%",
    酒石酸: "Винная кислота",
  },
};

function createLocalizedCompatibilityRows(
  locale: MaterialCompatibilityIntlLocale,
): CompatibilityRow[] {
  const localizedNames =
    locale === "en" ? chemicalNameEnMap : localizedChemicalNameMap[locale];

  return materialCompatibilityZhData.compatibilityRows.map((row) => ({
    ...row,
    name: localizedNames[row.name] ?? chemicalNameEnMap[row.name] ?? row.name,
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

const localizedMaterialFeatureCopy: Record<
  Exclude<MaterialCompatibilityIntlLocale, "en">,
  Record<string, Pick<MaterialCompatibilityPageData["materialFeatureRows"][number], "name" | "feature" | "application">>
> = {
  es: {
    PP: { name: "Polipropileno", feature: "Ligero, resistente a la fatiga y con buena resistencia a ácidos, álcalis y disolventes orgánicos comunes.", application: "Circuitos de fluidos generales, conexiones de reactivos y consumibles desechables" },
    PVDF: { name: "Fluoruro de polivinilideno", feature: "Equilibrio entre resistencia química y rendimiento mecánico, con buena resistencia a los rayos UV y a la radiación.", application: "Tubos para reactivos, conectores fluídicos y componentes de circuitos de fluidos" },
    POM: { name: "Polioximetileno", feature: "Alta dureza, rigidez y resistencia al desgaste; adecuado para piezas estructurales y de precisión.", application: "Piezas estructurales, piezas de precisión y conectores mecánicos" },
    ETFE: { name: "Etileno tetrafluoroetileno", feature: "Buena estabilidad química, resistencia a la intemperie y a los impactos, con mayor resistencia mecánica que el PTFE.", application: "Tubos y conectores fluídicos resistentes a la corrosión" },
    PEEK: { name: "Poliéter éter cetona", feature: "Alta resistencia mecánica y térmica, con buena resistencia química para sistemas fluídicos exigentes.", application: "Conectores de altas prestaciones, cuerpos de válvula y circuitos de instrumentos analíticos" },
    PPS: { name: "Sulfuro de polifenileno", feature: "Alta resistencia térmica y química, y excelente estabilidad dimensional.", application: "Piezas estructurales de ingeniería para funcionamiento estable a largo plazo" },
    PTFE: { name: "Politetrafluoroetileno", feature: "Gran inercia química, baja fricción y alta resistencia térmica frente a numerosos ácidos, álcalis y disolventes orgánicos fuertes.", application: "Circuitos de fluidos muy corrosivos, juntas y componentes de tubería" },
    PFA: { name: "Perfluoroalcoxi alcano", feature: "Prestaciones próximas al PTFE y mejor procesabilidad por fusión para aplicaciones de alta pureza y resistencia a la corrosión.", application: "Aplicaciones de alta pureza y elevada resistencia a la corrosión" },
  },
  fr: {
    PP: { name: "Polypropylène", feature: "Léger et résistant à la fatigue, avec une bonne tenue aux acides, aux bases et aux solvants organiques courants.", application: "Circuits fluidiques généraux, raccordement de réactifs et consommables à usage unique" },
    PVDF: { name: "Polyfluorure de vinylidène", feature: "Bon équilibre entre résistance chimique et performances mécaniques, avec une bonne tenue aux UV et aux rayonnements.", application: "Tubes pour réactifs, raccords fluidiques et composants de circuits" },
    POM: { name: "Polyoxyméthylène", feature: "Dureté, rigidité et résistance à l’usure élevées, adaptées aux pièces structurelles et de précision.", application: "Pièces structurelles, pièces de précision et raccords mécaniques" },
    ETFE: { name: "Éthylène tétrafluoroéthylène", feature: "Bonne stabilité chimique, résistance aux intempéries et aux chocs, avec une résistance mécanique supérieure à celle du PTFE.", application: "Tubes et raccords fluidiques résistants à la corrosion" },
    PEEK: { name: "Polyétheréthercétone", feature: "Résistance mécanique et thermique élevée, avec une bonne tenue chimique pour les systèmes fluidiques exigeants.", application: "Raccords hautes performances, corps de vannes et circuits d’instruments analytiques" },
    PPS: { name: "Polysulfure de phénylène", feature: "Résistance élevée à la température et aux produits chimiques, avec une excellente stabilité dimensionnelle.", application: "Pièces structurelles techniques destinées à un fonctionnement stable à long terme" },
    PTFE: { name: "Polytétrafluoroéthylène", feature: "Très forte inertie chimique, faible frottement et haute tenue en température face à de nombreux acides, bases et solvants organiques puissants.", application: "Circuits très corrosifs, joints et composants de tuyauterie" },
    PFA: { name: "Perfluoroalkoxy alcane", feature: "Performances proches du PTFE, avec une meilleure aptitude à la transformation à l’état fondu pour les applications de haute pureté et anticorrosion.", application: "Applications de haute pureté et de forte résistance à la corrosion" },
  },
  ko: {
    PP: { name: "폴리프로필렌", feature: "가볍고 피로 저항성이 우수하며 산, 알칼리 및 일반 유기용제에 대한 내성이 좋습니다.", application: "일반 유체 경로, 시약 연결부 및 일회용 소모품" },
    PVDF: { name: "폴리비닐리덴 플루오라이드", feature: "내화학성과 기계적 성능의 균형이 우수하고 자외선 및 방사선 저항성이 좋습니다.", application: "시약 튜빙, 유체 피팅 및 유체 경로 부품" },
    POM: { name: "폴리옥시메틸렌", feature: "경도, 강성 및 내마모성이 높아 구조 부품과 정밀 부품에 적합합니다.", application: "구조 부품, 정밀 부품 및 기계식 커넥터" },
    ETFE: { name: "에틸렌 테트라플루오로에틸렌", feature: "화학적 안정성, 내후성 및 내충격성이 우수하며 PTFE보다 기계적 강도가 높습니다.", application: "내식성 튜빙 및 유체 피팅" },
    PEEK: { name: "폴리에테르에테르케톤", feature: "강도와 내열성이 높고 내화학성이 우수하여 까다로운 유체 시스템에 적합합니다.", application: "고성능 피팅, 밸브 바디 및 분석 장비 유체 경로" },
    PPS: { name: "폴리페닐렌 설파이드", feature: "내열성과 내화학성이 높고 치수 안정성이 매우 우수합니다.", application: "장기 안정 운전을 위한 엔지니어링 구조 부품" },
    PTFE: { name: "폴리테트라플루오로에틸렌", feature: "화학적 불활성이 매우 높고 마찰이 낮으며 다양한 강산, 강알칼리 및 유기용제에 대한 내열성이 우수합니다.", application: "고부식성 유체 경로, 씰 및 튜빙 부품" },
    PFA: { name: "퍼플루오로알콕시 알케인", feature: "PTFE에 가까운 성능과 개선된 용융 가공성을 제공하여 고순도 및 내식성 용도에 적합합니다.", application: "고순도 및 고내식성 적용 분야" },
  },
  ru: {
    PP: { name: "Полипропилен", feature: "Лёгкий и стойкий к усталости материал с хорошей устойчивостью к кислотам, щелочам и распространённым органическим растворителям.", application: "Общие флюидные тракты, соединения для реагентов и одноразовые расходные материалы" },
    PVDF: { name: "Поливинилиденфторид", feature: "Сбалансированная химическая стойкость и механические свойства, хорошая устойчивость к УФ-излучению и радиации.", application: "Трубки для реагентов, флюидные фитинги и компоненты жидкостных трактов" },
    POM: { name: "Полиоксиметилен", feature: "Высокая твёрдость, жёсткость и износостойкость; подходит для конструкционных и прецизионных деталей.", application: "Конструкционные и прецизионные детали, механические соединители" },
    ETFE: { name: "Этилентетрафторэтилен", feature: "Хорошая химическая стабильность, атмосферостойкость и ударная прочность; механическая прочность выше, чем у PTFE.", application: "Коррозионностойкие трубки и флюидные фитинги" },
    PEEK: { name: "Полиэфирэфиркетон", feature: "Высокая прочность и термостойкость, хорошая химическая стойкость для требовательных флюидных систем.", application: "Высокоэффективные фитинги, корпуса клапанов и жидкостные тракты аналитических приборов" },
    PPS: { name: "Полифениленсульфид", feature: "Высокая термо- и химическая стойкость, отличная стабильность размеров.", application: "Инженерные конструкционные детали для длительной стабильной эксплуатации" },
    PTFE: { name: "Политетрафторэтилен", feature: "Высокая химическая инертность, низкое трение и термостойкость к воздействию многих сильных кислот, щелочей и органических растворителей.", application: "Сильноагрессивные жидкостные тракты, уплотнения и компоненты трубопроводов" },
    PFA: { name: "Перфторалкоксиалкан", feature: "Свойства близки к PTFE, но материал лучше перерабатывается из расплава и подходит для высокочистых и коррозионностойких применений.", application: "Высокочистые и особо коррозионностойкие применения" },
  },
};

function createLocalizedMaterialFeatureRows(
  locale: MaterialCompatibilityIntlLocale,
): MaterialCompatibilityPageData["materialFeatureRows"] {
  if (locale === "en") return englishMaterialFeatureRows;

  const localizedCopy = localizedMaterialFeatureCopy[locale];
  return englishMaterialFeatureRows.map((row) => ({
    ...row,
    ...localizedCopy[row.code],
  }));
}

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
          quickKeywords: ["Etanol", "Metanol", "Ácido sulfúrico", "Gasolina"],
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
          quickKeywords: ["Éthanol", "Méthanol", "Acide sulfurique", "Essence"],
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
          quickKeywords: ["에탄올", "메탄올", "황산", "가솔린"],
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
          quickKeywords: ["Этанол", "Метанол", "Серная кислота", "Бензин"],
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
    compatibilityRows: createLocalizedCompatibilityRows(supportedLocale),
    materialFeatureRows: createLocalizedMaterialFeatureRows(supportedLocale),
    certificationColumns: copy.certificationColumns,
    certificationRows: materialCompatibilityZhData.certificationRows,
    ui: copy.ui,
  };
}
