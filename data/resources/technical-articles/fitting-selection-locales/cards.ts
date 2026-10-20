import type { TechnicalArticleLocale } from "../technical-articles.types";
type ForeignLocale = Exclude<TechnicalArticleLocale, "zh-CN">;
// Product-family names follow product-detail.target.intl.ts; model codes remain unchanged.
export const fittingCardCopy: Record<ForeignLocale, {
  threaded: string[]; expansion: string[]; materials: string[];
  threadedSidebar: string[]; expansionSidebar: string[]; materialsSidebar: string[];
  photo: string; threadedPhoto: string;
}> = {
  en: {
    threadedPhoto: "FOREACH product photograph",
    threadedSidebar: ["Rotary thread-to-barb fitting", "Thread-to-Barb Fitting"],
    threaded: ["SA straight thread-sealing fitting", "SB straight bottom-face-sealing fitting", "SBS M6 bottom-face-sealing fitting", "SBR rotary thread-to-barb fitting"],
    expansion: ["F-profile barbed elbow", "D-profile barbed elbow", "F-profile straight barbed fitting", "Thread-to-Barb Fitting"],
    materials: ["Natural PP straight barbed fitting", "White PA straight barbed fitting", "Natural PP thread-to-barb fitting", "White PA thread-to-barb fitting"],
    expansionSidebar: ["Y barbed fittings", "Barbed elbows"],
    materialsSidebar: ["Thread-to-Barb Fittings", "Barbed Fittings"],
    photo: "FOREACH product photograph, multiple sizes",
  },
  es: {
    threadedPhoto: "Fotografía del producto FOREACH",
    threadedSidebar: ["Racor giratorio de rosca a espiga", "Racor de rosca a espiga"],
    threaded: ["SA recto con sellado de rosca", "SB recto con sellado de cara inferior", "SBS M6 con sellado de cara inferior", "SBR giratorio de rosca a espiga"],
    expansion: ["Racor de espiga acodado, perfil F", "Racor de espiga acodado, perfil D", "Racor de espiga recto, perfil F", "Racor de rosca a espiga"],
    materials: ["Racor de espiga recto en PP natural", "Racor de espiga recto en PA blanco", "Racor de rosca a espiga en PP natural", "Racor de rosca a espiga en PA blanco"],
    expansionSidebar: ["Racores de espiga en Y", "Racores de espiga acodados"],
    materialsSidebar: ["Racores de rosca a espiga", "Racores de espiga"],
    photo: "Fotografía de productos FOREACH de varios tamaños",
  },
  fr: {
    threadedPhoto: "Photographie du produit FOREACH",
    threadedSidebar: ["Raccord orientable filetage-cannelure", "Raccord filetage-cannelure"],
    threaded: ["SA droit à étanchéité de filetage", "SB droit à étanchéité de face inférieure", "SBS M6 à étanchéité de face inférieure", "SBR orientable filetage-cannelure"],
    expansion: ["Raccord cannelé coudé, profil F", "Raccord cannelé coudé, profil D", "Raccord cannelé droit, profil F", "Raccord filetage-cannelure"],
    materials: ["Raccord cannelé droit en PP naturel", "Raccord cannelé droit en PA blanc", "Raccord filetage-cannelure en PP naturel", "Raccord filetage-cannelure en PA blanc"],
    expansionSidebar: ["Raccords cannelés en Y", "Raccords cannelés coudés"],
    materialsSidebar: ["Raccords filetage-cannelure", "Raccords cannelés"],
    photo: "Photographie de produits FOREACH de différentes tailles",
  },
  ko: {
    threadedPhoto: "FOREACH 제품 실물 사진",
    threadedSidebar: ["회전형 나사-바브 피팅", "나사-바브 피팅"],
    threaded: ["SA 일자형 나사부 밀봉 피팅", "SB 일자형 하단면 밀봉 피팅", "SBS M6 하단면 밀봉 피팅", "SBR 회전형 나사-바브 피팅"],
    expansion: ["F형 바브 엘보 피팅", "D형 바브 엘보 피팅", "F형 일자 바브 피팅", "나사-바브 피팅"],
    materials: ["자연색 PP 일자 바브 피팅", "흰색 PA 일자 바브 피팅", "자연색 PP 나사-바브 피팅", "흰색 PA 나사-바브 피팅"],
    expansionSidebar: ["Y형 바브 피팅", "엘보형 바브 피팅"],
    materialsSidebar: ["나사-바브 피팅", "바브 피팅"],
    photo: "다양한 크기의 FOREACH 제품 실물 사진",
  },
  ru: {
    threadedPhoto: "Фотография изделия FOREACH",
    threadedSidebar: ["Поворотный переходник резьба–штуцер", "Переходник резьба–штуцер"],
    threaded: ["SA прямой с уплотнением по резьбе", "SB прямой с уплотнением по нижнему торцу", "SBS M6 с уплотнением по нижнему торцу", "SBR поворотный переходник резьба–штуцер"],
    expansion: ["Угловой штуцер профиля F", "Угловой штуцер профиля D", "Прямой штуцер профиля F", "Переходник резьба–штуцер"],
    materials: ["Прямой штуцер из PP натурального цвета", "Прямой штуцер из белого PA", "Переходник резьба–штуцер из PP натурального цвета", "Переходник резьба–штуцер из белого PA"],
    expansionSidebar: ["Y-образные штуцеры", "Угловые штуцеры"],
    materialsSidebar: ["Переходники резьба–штуцер", "Штуцеры"],
    photo: "Фотография изделий FOREACH разных размеров",
  },
};
