import type { InstrumentInquiryChoice } from "@/data/products/configurator/instrument-inquiry";
import { instrumentInquiryText } from "@/data/products/configurator/instrument-inquiry.intl";
import {
  resolveSyringePumpInquiry,
  syringePumpCodeOptions,
  type SyringePumpInquiryFamily,
} from "@/data/products/detail/syringe-pump-ordering";
import styles from "./CompactInstrumentGuide.module.css";

const copy = {
  zh: {
    heading: "型号解析", example: "订货示例", productCode: "料号",
    segment: "代码段", meaning: "代码含义", pumpSeries: "泵系列", valveSeries: "阀系列",
    solenoid: "电磁阀注射泵", rotary: "旋转阀注射泵", noSuffix: "无后缀",
    rotaryNote: (valve: string, pump: string) => `选型表中的三口非分配阀代码为 ${valve}。整泵订货表另列 ${pump}。`,
  },
  en: {
    heading: "Reading the model code", example: "Ordering example", productCode: "Part number",
    segment: "Code segment", meaning: "Meaning", pumpSeries: "Pump series", valveSeries: "Valve series",
    solenoid: "solenoid-valve syringe pump", rotary: "rotary-valve syringe pump", noSuffix: "No suffix",
    rotaryNote: (valve: string, pump: string) => `The selection table uses ${valve} for the 3-port non-distributing valve. The pump order list also includes ${pump}.`,
  },
  de: {
    heading: "Modellcode entschlüsseln", example: "Bestellbeispiel", productCode: "Artikelnummer",
    segment: "Codeabschnitt", meaning: "Bedeutung", pumpSeries: "Pumpenserie", valveSeries: "Ventilserie",
    solenoid: "Spritzenpumpe mit Magnetventil", rotary: "Spritzenpumpe mit Drehventil", noSuffix: "Ohne Suffix",
    rotaryNote: (valve: string, pump: string) => `In der Auswahltabelle steht ${valve} für das Ventil mit 3 Anschlüssen ohne Verteilerfunktion. Die Bestellliste der Pumpe führt zusätzlich ${pump} auf.`,
  },
  it: {
    heading: "Lettura del codice modello", example: "Esempio di ordine", productCode: "Codice articolo",
    segment: "Segmento del codice", meaning: "Significato", pumpSeries: "Serie della pompa", valveSeries: "Serie della valvola",
    solenoid: "pompa a siringa con elettrovalvola", rotary: "pompa a siringa con valvola rotativa", noSuffix: "Senza suffisso",
    rotaryNote: (valve: string, pump: string) => `Nella tabella di selezione, ${valve} identifica la valvola a 3 attacchi senza funzione di distribuzione. L'elenco per l'ordine della pompa include anche ${pump}.`,
  },
  hi: {
    heading: "मॉडल कोड कैसे पढ़ें", example: "ऑर्डर का उदाहरण", productCode: "पार्ट नंबर",
    segment: "कोड का हिस्सा", meaning: "अर्थ", pumpSeries: "पंप सीरीज़", valveSeries: "वाल्व सीरीज़",
    solenoid: "सोलनॉइड वाल्व वाला सिरिंज पंप", rotary: "रोटरी वाल्व वाला सिरिंज पंप", noSuffix: "कोई प्रत्यय नहीं",
    rotaryNote: (valve: string, pump: string) => `चयन तालिका में वितरण सुविधा के बिना 3-पोर्ट वाले वाल्व का कोड ${valve} है। पंप की ऑर्डर सूची में ${pump} भी शामिल है।`,
  },
  es: {
    heading: "Cómo leer el código del modelo", example: "Ejemplo de pedido", productCode: "Referencia",
    segment: "Parte del código", meaning: "Significado", pumpSeries: "Serie de la bomba", valveSeries: "Serie de la válvula",
    solenoid: "bomba de jeringa con válvula solenoide", rotary: "bomba de jeringa con válvula rotativa", noSuffix: "Sin sufijo",
    rotaryNote: (valve: string, pump: string) => `La tabla de selección identifica la válvula de 3 puertos sin distribución como ${valve}. La lista de pedido de la bomba también incluye ${pump}.`,
  },
  fr: {
    heading: "Lecture du code modèle", example: "Exemple de commande", productCode: "Référence",
    segment: "Élément du code", meaning: "Signification", pumpSeries: "Série de pompe", valveSeries: "Série de vanne",
    solenoid: "pompe à seringue avec électrovanne", rotary: "pompe à seringue avec vanne rotative", noSuffix: "Sans suffixe",
    rotaryNote: (valve: string, pump: string) => `Le tableau de sélection identifie la vanne à 3 orifices sans distribution par le code ${valve}. La liste de commande de la pompe comprend également ${pump}.`,
  },
  ko: {
    heading: "모델 코드 읽기", example: "주문 모델 예시", productCode: "품번",
    segment: "코드 항목", meaning: "코드 의미", pumpSeries: "펌프 시리즈", valveSeries: "밸브 시리즈",
    solenoid: "솔레노이드 밸브 시린지 펌프", rotary: "로터리 밸브 시린지 펌프", noSuffix: "접미사 없음",
    rotaryNote: (valve: string, pump: string) => `선정표의 3포트 비분배형 밸브 코드는 ${valve}입니다. 펌프 주문표에는 ${pump} 모델도 기재되어 있습니다.`,
  },
  ru: {
    heading: "Расшифровка кода модели", example: "Пример заказа", productCode: "Артикул",
    segment: "Элемент кода", meaning: "Значение", pumpSeries: "Серия насоса", valveSeries: "Серия клапана",
    solenoid: "шприцевой насос с электромагнитным клапаном", rotary: "шприцевой насос с поворотным клапаном", noSuffix: "Без суффикса",
    rotaryNote: (valve: string, pump: string) => `В таблице выбора 3-портовый клапан без распределения указан под кодом ${valve}. В перечне исполнений насоса для заказа также указан ${pump}.`,
  },
} as const;

type Segment = {
  code: string;
  label: string;
  meaning: string;
  separated?: boolean;
};

const formatCodes = (options: readonly (readonly [string, string])[]) =>
  options.map(([code, meaning]) => `${code} = ${meaning}`).join(" · ");

export default function SyringePumpModelCode({ family, locale }: { family: SyringePumpInquiryFamily; locale: string }) {
  const labels = copy[locale as keyof typeof copy] ?? copy.zh;
  const t = (key: Parameters<typeof instrumentInquiryText>[0]) => instrumentInquiryText(key, locale);
  const rotary = family === "HLD3" || family === "HLD6";
  const choice: InstrumentInquiryChoice = rotary
    ? { valve: family === "HLD3" ? "D3A" : "D6A" }
    : { channels: family === "HMD3" ? "1" : "2", seat: "PK", diaphragm: "F", valve: "S", thread: "U28", drive: "with-drive" };
  const example = resolveSyringePumpInquiry(family, choice);
  const options = syringePumpCodeOptions;
  const stroke = family.endsWith("6") ? "60 mm" : "30 mm";
  const segments: Segment[] = [
    { code: family, label: labels.pumpSeries, meaning: `${family} = ${rotary ? labels.rotary : labels.solenoid} · ${t("syringeStroke")} ${stroke}` },
    ...(rotary ? [
      { code: "SRV1", label: labels.valveSeries, meaning: `SRV1 · ${t("port")} 1/4-28 UNF-2B`, separated: true },
      { code: choice.valve, label: t("syringeValve"), meaning: formatCodes(options.rotaryValves.map(([code, key]) => [code, t(key)])), separated: true },
    ] : [
      { code: choice.channels, label: t("syringeChannels"), meaning: family === "HMD3" ? "1" : options.hmd6Channels.join(", "), separated: true },
      { code: choice.seat, label: t("valveSeat"), meaning: formatCodes(options.seats) },
      { code: choice.diaphragm, label: t("valveDiaphragm"), meaning: formatCodes(options.diaphragms) },
      { code: choice.valve, label: t("syringeValve"), meaning: formatCodes(options.solenoidValves.map(([code, key]) => [code, t(key)])) },
      { code: choice.thread, label: t("valveThread"), meaning: formatCodes(options.threads) },
    ]),
  ];
  const nonDistributing = rotary ? options.nonDistributing[family] : undefined;
  const titleId = `syringe-model-code-${family.toLowerCase()}`;

  return <section className={styles.subsection} data-syringe-model-code={family} aria-labelledby={titleId}>
    <h3 id={titleId}>1.1 {labels.heading}</h3>
    <p>{labels.example} · {example.model} · {labels.productCode} {example.productCode}</p>
    <div className={`${styles.modelCode} ${styles.wrappingModelCode}`} role="group" aria-label={example.model}>
      {segments.map(({ code, label, separated }) => <span key={label} className={styles.codeSegment}>
        {separated && <span className={styles.codeDash} aria-hidden="true">-</span>}
        <span className={styles.codeValue}>{code}</span>
        <small>{label}</small>
      </span>)}
    </div>
    <table className={styles.table} aria-labelledby={titleId}>
      <thead><tr><th scope="col">{labels.segment}</th><th scope="col">{labels.meaning}</th></tr></thead>
      <tbody>
        {segments.map(({ label, meaning }) => <tr key={label}><th scope="row">{label}</th><td>{meaning}</td></tr>)}
        {!rotary && <tr><th scope="row">{t("syringeDrive")}</th>
          <td>{labels.noSuffix} = {t("withDrive")}{family === "HMD6" && ` · N = ${t("withoutDrive")}`}</td>
        </tr>}
      </tbody>
    </table>
    {nonDistributing && <p className={styles.note}>
      {labels.rotaryNote(`SRV1-${nonDistributing.selectionCode}`, `${family}-SRV1-${nonDistributing.orderCode}`)}
    </p>}
  </section>;
}
