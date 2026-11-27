import Link from "next/link";
import { getHindiDraftLink, getItalianDraftLink, hindiEnglishFallbackSuffix, italianEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";

import {
  getSamplingProbeGuideHref,
  samplingProbeApplicationSections,
  type SamplingProbeApplication,
  type SamplingProbeGuideLocale,
} from "@/data/resources/technical-articles/sampling-probe-guide-links";

const copy = {
  "zh-CN": {
    label: "采样针选型指南",
    "clinical-probes": "核对样本针和试剂针的内外径、最低液位与底隙，可参阅",
    "immunoassay-probes": "评估固定针加样的针口位置、残留和清洗时，可参阅",
    "hematology-probes": "按全血吸取节拍核对内径和堵塞风险，可参阅",
    "pipetting-probes": "按微量管或深孔板核对固定针的有效长度与 Z 轴行程，可参阅",
  },
  en: {
    label: "sampling probe selection guide",
    "clinical-probes": "To check probe diameters, minimum liquid level and bottom clearance for samples and reagents, see the ",
    "immunoassay-probes": "For tip position, residual liquid and rinsing after fixed-probe sample delivery, see the ",
    "hematology-probes": "For sizing the bore and assessing clogging at the required whole-blood aspiration rate, see the ",
    "pipetting-probes": "To check working length and Z-axis travel for a fixed probe used with microtubes or deep-well plates, see the ",
  },
  es: {
    label: "guía de selección de agujas de muestreo",
    "clinical-probes": "Para comprobar los diámetros, el nivel mínimo y la holgura al fondo con muestras y reactivos, consulte la ",
    "immunoassay-probes": "Para evaluar la posición de la punta, los residuos y el lavado tras la dispensación con aguja fija, consulte la ",
    "hematology-probes": "Para dimensionar el diámetro interior y evaluar el riesgo de obstrucción al aspirar sangre total, consulte la ",
    "pipetting-probes": "Para comprobar la longitud útil y el recorrido en Z de una aguja fija en microtubos o placas de pocillos profundos, consulte la ",
  },
  fr: {
    label: "guide de sélection des aiguilles de prélèvement",
    "clinical-probes": "Pour vérifier les diamètres, le niveau minimal et le jeu au fond pour les échantillons et réactifs, consultez le ",
    "immunoassay-probes": "Pour vérifier la position de pointe, les résidus et le rinçage après la distribution par aiguille fixe, consultez le ",
    "hematology-probes": "Pour dimensionner le diamètre intérieur et évaluer le risque d’obstruction lors de l’aspiration de sang total, consultez le ",
    "pipetting-probes": "Pour vérifier la longueur utile et la course en Z d’une aiguille fixe avec des microtubes ou des plaques à puits profonds, consultez le ",
  },
  ko: {
    label: "샘플링 프로브 선정 가이드",
    "clinical-probes": "시료와 시약용 프로브의 내·외경, 최저 액면과 바닥 간극은 ",
    "immunoassay-probes": "고정 프로브로 시료를 분주할 때 팁 위치, 잔류와 세척은 ",
    "hematology-probes": "전혈 흡입 유량에 따른 내경과 막힘 위험은 ",
    "pipetting-probes": "마이크로튜브 또는 딥웰 플레이트에 맞춘 고정 프로브의 유효 길이와 Z축 이동 거리는 ",
  },
  ru: {
    label: "руководство по выбору пробоотборных игл",
    "clinical-probes": "Чтобы проверить диаметры игл для проб и реагентов, минимальный уровень и зазор до дна, см. ",
    "immunoassay-probes": "Чтобы оценить положение наконечника, остатки и промывку после подачи пробы фиксированной иглой, см. ",
    "hematology-probes": "Чтобы подобрать внутренний диаметр и оценить риск засорения при аспирации цельной крови, см. ",
    "pipetting-probes": "Чтобы проверить рабочую длину фиксированной иглы и ход оси Z для микропробирок или глубоких планшетов, см. ",
  },
  hi: {
    label: "सैंपलिंग प्रोब की चयन मार्गदर्शिका",
    "clinical-probes": "नमूनों और अभिकर्मकों के लिए प्रोब के व्यास, न्यूनतम तरल स्तर और तल से दूरी जाँचने के लिए देखें ",
    "immunoassay-probes": "स्थिर प्रोब से नमूना पहुँचाने के बाद टिप की स्थिति, बचा तरल और रिंसिंग जाँचने के लिए देखें ",
    "hematology-probes": "संपूर्ण रक्त के एस्पिरेशन की आवश्यक दर पर बोर का आकार और रुकावट का जोखिम जाँचने के लिए देखें ",
    "pipetting-probes": "माइक्रोट्यूब या डीप-वेल प्लेट में स्थिर प्रोब की उपयोगी लंबाई और Z-अक्ष की गति जाँचने के लिए देखें ",
  },
  it: {
    label: "guida alla selezione delle sonde di campionamento",
    "clinical-probes": "Per verificare diametri delle sonde, livello minimo del liquido e distanza dal fondo per campioni e reagenti, consulta la ",
    "immunoassay-probes": "Per valutare posizione della punta, residui e risciacquo dopo l’erogazione con sonda fissa, consulta la ",
    "hematology-probes": "Per dimensionare il diametro interno e valutare il rischio di ostruzione alla portata di aspirazione del sangue intero, consulta la ",
    "pipetting-probes": "Per verificare lunghezza utile e corsa dell’asse Z con una sonda fissa per microprovette o piastre a pozzetti profondi, consulta la ",
  },
  de: {
    label: "Leitfaden zur Auswahl von Probennadeln",
    "clinical-probes": "Hinweise zu Nadeldurchmessern, Mindestfüllstand und Bodenabstand bei Proben und Reagenzien finden Sie im ",
    "immunoassay-probes": "Hinweise zu Spitzenposition, Restflüssigkeit und Spülung bei der Probenabgabe mit fest montierter Nadel finden Sie im ",
    "hematology-probes": "Die Auswahl des Innendurchmessers und das Verstopfungsrisiko bei der Vollblutaspiration erläutert der ",
    "pipetting-probes": "Wie Sie Arbeitslänge und Z-Achsenhub einer fest montierten Nadel für Mikroröhrchen oder Deep-Well-Platten prüfen, erfahren Sie im ",
  },
} satisfies Record<SamplingProbeGuideLocale | "it" | "hi", Record<SamplingProbeApplication | "label", string>>;

export default function SamplingProbeApplicationLink({
  context,
  locale = "zh-CN",
  className,
}: {
  context: SamplingProbeApplication;
  locale?: SamplingProbeGuideLocale | "it" | "hi";
  className?: string;
}) {
  const text = copy[locale];
  const source = getSamplingProbeGuideHref(locale === "it" || locale === "hi" ? "en" : locale, samplingProbeApplicationSections[context]);
  const target = locale === "it" ? getItalianDraftLink(source) : locale === "hi" ? getHindiDraftLink(source) : { href: source, hrefLang: locale };
  const label = text.label + (target.hrefLang === "en" ? locale === "it" ? italianEnglishFallbackSuffix : locale === "hi" ? hindiEnglishFallbackSuffix : "" : "");
  return (
    <p lang={locale} data-sampling-probe-application-link={context}>
      {text[context]}
      <Link className={className} href={target.href} hrefLang={target.hrefLang} prefetch={false}>{label}</Link>
      {locale === "ko" ? "를 참고하세요." : locale === "zh-CN" ? "。" : locale === "hi" ? "।" : "."}
    </p>
  );
}
