import type { TechnicalArticleLocale } from "../technical-articles.types";
type DiagramCopy = {
  stages: [string, string, string]; initial: string; crest: string; insert: string;
  expand: string; conform: string; assemblyNote: string; intro: string;
  profile: string; example: string; comparisonNote: string;
  expansion: string; series: string; classic: string;
};
export const barbDiagramCopy: Record<TechnicalArticleLocale | "de" | "it" | "hi", DiagramCopy> = {
  "zh-CN": { stages: ["装配前", "越过峰部", "跨过后贴合"], initial: "初始内径 d", crest: "峰部外径 Db", insert: "装入方向", expand: "管口扩张，越过峰部", conform: "峰后回贴，形成包覆", assemblyNote: "灰色倒刺直接引用原图 F 轮廓；蓝色仅示意软管，壁厚和变形不代表实测结果。", intro: "同样的 3.2 mm 内径，跨过的峰径不同", profile: "型倒刺", example: "尺寸算例", comparisonNote: "F、D 轮廓均引用原图并等比缩放；仅峰径按算例比例比较，其余长度不作为产品尺寸。", expansion: "膨胀率", series: "系列", classic: "经典" },
  en: { stages: ["Before assembly", "Over the crest", "Contact behind the crest"], initial: "Initial ID d", crest: "Crest OD Db", insert: "Insertion", expand: "Expansion over the crest", conform: "Contact behind the crest", assemblyNote: "The gray barb is the original F-profile image. Blue tubing is schematic; wall thickness and deformation are not measurements.", intro: "Same 3.2 mm ID, different crest diameters", profile: "profile", example: "dimensional example", comparisonNote: "Original F/D profiles are scaled uniformly. Only crest widths follow the example ratio; other lengths are not product dimensions.", expansion: "Expansion", series: "Series", classic: "Classic" },
  de: {
    stages: ["Vor der Montage", "Über den Wulst", "Anlage hinter dem Wulst"],
    initial: "Anfangsinnendurchmesser d", crest: "Wulst-Außendurchmesser Db", insert: "Aufsteckrichtung",
    expand: "Aufweiten über dem Wulst", conform: "Anlage hinter dem Wulst",
    assemblyNote: "Die graue Schlauchtülle zeigt das Original des F-Profils. Der blaue Schlauch ist schematisch. Wandstärke und Verformung sind keine Messwerte.",
    intro: "Gleicher Innendurchmesser von 3.2 mm, unterschiedliche Wulstdurchmesser",
    profile: "Profil", example: "Maßbeispiel",
    comparisonNote: "Die Originalprofile F und D wurden jeweils proportional skaliert. Nur die Wulstdurchmesser folgen dem Verhältnis aus dem Beispiel. Die übrigen Längen sind keine Produktmaße.",
    expansion: "Aufweitung", series: "Serie", classic: "Klassisch",
  },
  hi: {
    stages: ["असेंबली से पहले", "बार्ब की चोटी पर", "चोटी के पीछे पकड़"],
    initial: "शुरुआती आंतरिक व्यास d", crest: "चोटी का बाहरी व्यास Db", insert: "लगाने की दिशा",
    expand: "चोटी पर ट्यूब फैलती है", conform: "चोटी के पीछे ट्यूब बैठती है",
    assemblyNote: "स्लेटी बार्ब मूल F प्रोफ़ाइल है। नीली ट्यूब आरेख के लिए है। दीवार की मोटाई और विकृति मापे हुए मान नहीं हैं।",
    intro: "समान 3.2 mm आंतरिक व्यास, अलग-अलग चोटी के व्यास",
    profile: "प्रोफ़ाइल", example: "माप का उदाहरण",
    comparisonNote: "मूल F और D प्रोफ़ाइल को समान अनुपात में स्केल किया गया है। सिर्फ़ चोटी की चौड़ाई उदाहरण के अनुपात पर है। बाकी लंबाई उत्पाद के माप नहीं हैं।",
    expansion: "फैलाव", series: "सीरीज़", classic: "Classic",
  },
  it: {
    stages: ["Prima del montaggio", "Superamento del risalto", "Adesione dietro il risalto"],
    initial: "Ø interno iniziale d", crest: "Ø del risalto Db", insert: "Direzione di inserimento",
    expand: "Dilatazione sul risalto", conform: "Adesione dietro il risalto",
    assemblyNote: "Il portagomma grigio riproduce il profilo F originale. Il tubo blu è schematico. Spessore e deformazione sono illustrativi.",
    intro: "Stesso diametro interno di 3.2 mm, diametri del risalto diversi",
    profile: "profilo", example: "esempio dimensionale",
    comparisonNote: "I profili originali F e D sono scalati in proporzione. Solo i diametri del risalto seguono il rapporto dell’esempio. Le altre quote sono illustrative.",
    expansion: "Dilatazione", series: "Serie", classic: "Classica",
  },
  es: { stages: ["Antes del montaje", "Paso sobre la cresta", "Contacto posterior"], initial: "Diámetro interior inicial d", crest: "Diámetro de cresta Db", insert: "Inserción", expand: "Expansión sobre la cresta", conform: "Contacto detrás de la cresta", assemblyNote: "La espiga gris conserva el perfil F original. El tubo azul es esquemático; pared y deformación no son mediciones.", intro: "Mismo diámetro interior de 3.2 mm, distintas crestas", profile: "perfil", example: "ejemplo dimensional", comparisonNote: "Perfiles F/D originales con escala uniforme. Solo las crestas siguen la proporción del ejemplo; las demás longitudes no son cotas del producto.", expansion: "Expansión", series: "Serie", classic: "Clásica" },
  fr: { stages: ["Avant montage", "Passage de la crête", "Contact derrière la crête"], initial: "Diamètre intérieur initial d", crest: "Diamètre de crête Db", insert: "Insertion", expand: "Expansion sur la crête", conform: "Contact derrière la crête", assemblyNote: "La cannelure grise conserve le profil F d'origine. Le tube bleu est schématique ; paroi et déformation ne sont pas mesurées.", intro: "Même diamètre intérieur de 3.2 mm, crêtes différentes", profile: "profil", example: "exemple dimensionnel", comparisonNote: "Profils F/D d'origine à échelle uniforme. Seules les crêtes suivent le rapport de l'exemple ; les autres longueurs ne sont pas des cotes du produit.", expansion: "Expansion", series: "Série", classic: "Classique" },
  ko: { stages: ["조립 전", "바브 정점 통과", "정점 뒤 밀착"], initial: "초기 내경 d", crest: "최대 외경 Db", insert: "삽입 방향", expand: "정점을 넘으며 확장", conform: "정점 뒤를 감싸며 밀착", assemblyNote: "회색 바브는 원본 F형 이미지입니다. 파란 튜브는 개략도이며 벽 두께·변형은 실측값이 아닙니다.", intro: "같은 내경 3.2 mm, 서로 다른 바브 외경", profile: "형상", example: "치수 예제", comparisonNote: "원본 F·D 형상을 균일 확대했습니다. 최대 외경만 예제 비율로 비교하며 다른 길이는 제품 치수가 아닙니다.", expansion: "확장률", series: "시리즈", classic: "클래식" },
  ru: { stages: ["До сборки", "Прохождение гребня", "Прилегание за гребнем"], initial: "Исходный внутренний диаметр d", crest: "Диаметр гребня Db", insert: "Надевание", expand: "Расширение на гребне", conform: "Прилегание за гребнем", assemblyNote: "Серый штуцер — исходное изображение профиля F. Синяя трубка схематична; стенка и деформация не измерены.", intro: "Внутренний диаметр 3.2 mm, разные гребни", profile: "профиль", example: "пример размеров", comparisonNote: "Исходные профили F/D масштабированы равномерно. Только гребни следуют отношению примера; другие длины не являются размерами изделия.", expansion: "Расширение", series: "Серия", classic: "Классическая" },
};
