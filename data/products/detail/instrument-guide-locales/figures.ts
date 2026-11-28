import type { InstrumentGuideLocale } from "../instrument-product-guides.intl";

// Numbered annotations correspond to the original drawings. Electrical tables
// moved out of the raster image remain available here and in the guide tables.
const legends: Record<string, Record<InstrumentGuideLocale, readonly string[]>> = {
  "smtp2-adapter.webp": {
    en: ["1 Tip length · 2 Adapter fitting diameter · 3 Overall length. LTE045 (45 mm) is the illustrated example."],
    es: ["1 Longitud de punta · 2 Diámetro de acoplamiento · 3 Longitud total. Ejemplo ilustrado LTE045 (45 mm)."],
    fr: ["1 Longueur de pointe · 2 Diamètre d’emmanchement · 3 Longueur totale. Exemple illustré LTE045 (45 mm)."],
    ko: ["1 팁 길이 · 2 어댑터 결합 직경 · 3 전체 길이. LTE045(45 mm) 예시입니다."],
    ru: ["1 Длина наконечника · 2 Посадочный диаметр · 3 Общая длина. Показан пример LTE045 (45 mm)."],
  },
  "smtp4-optocoupler.webp": {
    en: ["1 Internal circuit. A: LED anode through Rf; K: cathode to ground; C: collector through RL; E: emitter to ground.", "At 24 VDC: Rf 1–2 kΩ, RL 10 kΩ. These resistors are not fitted on the adapter board. For another supply, design Rf for 20 mA < IF < 25 mA."],
    es: ["1 Circuito interno. A: ánodo mediante Rf; K: cátodo a tierra; C: colector mediante RL; E: emisor a tierra.", "A 24 VDC: Rf 1–2 kΩ, RL 10 kΩ. La placa no incorpora estas resistencias. Con otra tensión, diseñe Rf para 20 mA < IF < 25 mA."],
    fr: ["1 Circuit interne. A : anode via Rf ; K : cathode à la masse ; C : collecteur via RL ; E : émetteur à la masse.", "Sous 24 VDC : Rf 1–2 kΩ, RL 10 kΩ. Ces résistances sont absentes de la carte. Pour une autre tension, dimensionnez Rf pour 20 mA < IF < 25 mA."],
    ko: ["1 내부 회로. A: Rf를 통한 발광 다이오드 애노드, K: 접지 캐소드, C: RL을 통한 컬렉터, E: 접지 이미터.", "24 VDC에서 Rf 1–2 kΩ, RL 10 kΩ이며 변환 보드에 포함되지 않습니다. 다른 전원은 20 mA < IF < 25 mA가 되도록 Rf를 설계하세요."],
    ru: ["1 Внутренняя цепь. A: анод светодиода через Rf; K: катод на общий; C: коллектор через RL; E: эмиттер на общий.", "При 24 VDC: Rf 1–2 kΩ, RL 10 kΩ. На плате этих резисторов нет. При другом питании рассчитайте Rf для 20 mA < IF < 25 mA."],
  },
  "hmd-valve-paths.webp": {
    en: ["I Two-port configuration · II Three-port configuration. S: syringe; IN: inlet; OUT: outlet; Bypass: bypass path. Valve commands I/O/B connect the highlighted path to S."],
    es: ["I Dos puertos · II Tres puertos. S: jeringa; IN: entrada; OUT: salida; Bypass: derivación. Órdenes I/O/B conectan la vía resaltada con S."],
    fr: ["I Deux ports · II Trois ports. S : seringue ; IN : entrée ; OUT : sortie ; Bypass : dérivation. Les commandes I/O/B relient le trajet surligné à S."],
    ko: ["I 2포트 · II 3포트 구성. S: 주사기, IN: 입구, OUT: 출구, Bypass: 우회 유로. I/O/B 명령은 강조된 경로를 S에 연결합니다."],
    ru: ["I Два порта · II Три порта. S: шприц; IN: вход; OUT: выход; Bypass: байпас. Команды I/O/B соединяют выделенный путь с S."],
  },
  "mrv3-controller.webp": {
    en: ["Table headers: I Connector · II Pin number · III Pin function. J1 is power; J2 contains the listed communication and signal pins."],
    es: ["Cabeceras: I Conector · II Pin · III Función. J1 alimentación; J2 comunicación y señales indicadas."],
    fr: ["En-têtes : I Connecteur · II Broche · III Fonction. J1 alimentation ; J2 communication et signaux indiqués."],
    ko: ["표 제목: I 커넥터 · II 핀 번호 · III 핀 기능. J1은 전원, J2는 표시된 통신·신호 핀입니다."],
    ru: ["Заголовки: I Разъём · II Номер вывода · III Функция. J1 — питание; J2 — указанные линии связи и сигналов."],
  },
  "hp-flow-paths.webp": {
    en: ["H Home reference · I Home position · II Working positions. View from the numbered stator face.", "Adjacent ports 1–6 are 60° apart. The vent position is 30° from port 1; the optocoupler flag edge is 9° from the centerline. Motor reduction ratio: 5:1."],
    es: ["H Referencia de origen · I Posición de origen · II Posiciones de trabajo. Vista desde el estator numerado.", "Puertos 1–6 separados 60°. Purga a 30° del puerto 1; borde de bandera óptica a 9° del eje. Reducción: 5:1."],
    fr: ["H Référence d’origine · I Position d’origine · II Positions de travail. Vue côté stator numéroté.", "Ports 1–6 espacés de 60°. Purge à 30° du port 1 ; bord du drapeau optique à 9° de l’axe. Réduction : 5:1."],
    ko: ["H 원점 기준 · I 원점 위치 · II 작동 위치. 스테이터 숫자면 기준입니다.", "1–6번 인접 포트 간격 60°, 배기 위치와 1번 포트 간격 30°, 광커플러 차광판 가장자리와 중심선 간격 9°입니다. 감속비는 5:1입니다."],
    ru: ["H Исходная отметка · I Исходное положение · II Рабочие положения. Вид со стороны цифр статора.", "Между соседними портами 1–6 — 60°. Удаление воздуха на 30° от порта 1; край флажка оптопары на 9° от оси. Редукция 5:1."],
  },
  "abd-pinout.webp": {
    en: ["1 Mounting holes: 2 × Ø3.5 mm. The source ABD-06M-Vxx drawing has common outline/mounting dimensions; the clamp OD varies (V16/V20/V25/V32/V48/V60/V64/V40).", "Connector S6B-ZR-SM4A-TF: 1 supply +5 VDC; 2 GND; 3 analog 0–5 V; 4 Rx TTL; 5 Tx TTL; 6 IO alarm, high level 5 V, pull-up required. Pin 6: applied voltage <25 V, sink current <50 mA."],
    es: ["1 Taladros: 2 × Ø3.5 mm. El plano ABD-06M-Vxx comparte dimensiones exteriores/montaje; varía el diámetro de abrazadera (V16/V20/V25/V32/V48/V60/V64/V40).", "Conector S6B-ZR-SM4A-TF: 1 +5 VDC; 2 GND; 3 analógica 0–5 V; 4 Rx TTL; 5 Tx TTL; 6 alarma IO, alto 5 V, requiere pull-up. Pin 6: tensión <25 V, corriente de sumidero <50 mA."],
    fr: ["1 Trous : 2 × Ø3.5 mm. Le plan ABD-06M-Vxx conserve dimensions extérieures/montage ; le diamètre de pince varie (V16/V20/V25/V32/V48/V60/V64/V40).", "Connecteur S6B-ZR-SM4A-TF : 1 +5 VDC ; 2 GND ; 3 analogique 0–5 V ; 4 Rx TTL ; 5 Tx TTL ; 6 alarme IO, haut 5 V, rappel requis. Broche 6 : tension <25 V, courant absorbé <50 mA."],
    ko: ["1 설치 홀: 2 × Ø3.5 mm. 원본 ABD-06M-Vxx 도면의 외형·설치 치수는 공통이며 클램프 외경은 V16/V20/V25/V32/V48/V60/V64/V40에 따라 다릅니다.", "S6B-ZR-SM4A-TF: 1 +5 VDC, 2 GND, 3 아날로그 0–5 V, 4 Rx TTL, 5 Tx TTL, 6 IO 경보(높음 5 V, 풀업 필요). 6번 핀 인가 전압 <25 V, 싱크 전류 <50 mA."],
    ru: ["1 Крепёжные отверстия: 2 × Ø3.5 mm. Чертёж ABD-06M-Vxx имеет общие габариты/крепление; диаметр зажима различается (V16/V20/V25/V32/V48/V60/V64/V40).", "S6B-ZR-SM4A-TF: 1 +5 VDC; 2 GND; 3 аналог 0–5 V; 4 Rx TTL; 5 Tx TTL; 6 тревога IO, высокий 5 V, нужна подтяжка. Вывод 6: напряжение <25 V, ток стока <50 mA."],
  },
  "pdm5-pinout.webp": {
    en: ["Pins: 1 VCC; 2/3 GND; 4 SCLK clock; 5 SDA data; 6 unused. Confirm connector orientation and leave pin 6 unconnected."],
    es: ["Pines: 1 VCC; 2/3 GND; 4 reloj SCLK; 5 datos SDA; 6 sin uso. Confirme orientación y deje el pin 6 libre."],
    fr: ["Broches : 1 VCC ; 2/3 GND ; 4 horloge SCLK ; 5 données SDA ; 6 inutilisée. Vérifiez l’orientation et laissez 6 libre."],
    ko: ["핀: 1 VCC, 2/3 GND, 4 SCLK 클록, 5 SDA 데이터, 6 미사용. 커넥터 방향을 확인하고 6번은 연결하지 마세요."],
    ru: ["Выводы: 1 VCC; 2/3 GND; 4 такт SCLK; 5 данные SDA; 6 не используется. Проверьте ориентацию и не подключайте 6."],
  },
  "sv10-structure.webp": {
    en: ["1 Ø2.3 through hole · 2 Housing · 3 Leads, red positive/black negative, length 300 mm. Port marks: 1 NC, 2 COM, 3 NO; two-way versions have only two working ports. Mounting locations depend on the model.", "Series material table: seat options PVDF/PTFE/PMMA/POM/PEEK/PFA; O-ring and diaphragm combinations EPDM/EPDM, FKM/FKM or FFKM/FFKM; base PEEK/PFA. Base-mounted and barbed versions have no separate seat-material option and default to PEEK bases. Confirm PFA seat/base availability with FOREACH."],
    es: ["1 Taladro Ø2.3 · 2 Carcasa · 3 Cables, rojo positivo/negro negativo, 300 mm. Puertos: 1 NC, 2 COM, 3 NO; dos vías solo tiene dos puertos. Posición de montaje según modelo.", "Tabla de serie: asiento PVDF/PTFE/PMMA/POM/PEEK/PFA; junta tórica/diafragma EPDM/EPDM, FKM/FKM o FFKM/FFKM; base PEEK/PFA. Base y espiga no permiten asiento independiente y llevan base PEEK por defecto. Confirme disponibilidad PFA con FOREACH."],
    fr: ["1 Trou traversant Ø2.3 · 2 Boîtier · 3 Fils rouge positif/noir négatif, 300 mm. Ports : 1 NC, 2 COM, 3 NO ; deux voies n’a que deux ports. Montage selon modèle.", "Table de série : siège PVDF/PTFE/PMMA/POM/PEEK/PFA ; joint/membrane EPDM/EPDM, FKM/FKM ou FFKM/FFKM ; embase PEEK/PFA. Versions sur embase et cannelées sans choix de siège distinct, embase PEEK par défaut. Confirmez PFA auprès de FOREACH."],
    ko: ["1 Ø2.3 관통 홀 · 2 하우징 · 3 리드(빨강 +/검정 −, 300 mm). 포트 표시는 1 NC, 2 COM, 3 NO이며 2방향형은 작동 포트가 두 개입니다. 설치 위치는 모델에 따릅니다.", "계열 재질표: 시트 PVDF/PTFE/PMMA/POM/PEEK/PFA, O링·다이어프램 EPDM/EPDM·FKM/FKM·FFKM/FFKM, 베이스 PEEK/PFA. 베이스형·바브형은 독립 시트 재질 옵션 없이 기본 PEEK 베이스입니다. PFA 시트·베이스 공급 조합은 FOREACH에 확인하세요."],
    ru: ["1 Сквозное отверстие Ø2.3 · 2 Корпус · 3 Провода, красный плюс/чёрный минус, 300 mm. Порты: 1 NC, 2 COM, 3 NO; у двухходовой версии только два. Место крепления зависит от модели.", "Таблица серии: седло PVDF/PTFE/PMMA/POM/PEEK/PFA; O-кольцо/мембрана EPDM/EPDM, FKM/FKM либо FFKM/FFKM; основание PEEK/PFA. Версии на основании и со штуцером «ёлочка» без отдельного выбора седла, основание PEEK по умолчанию. Наличие PFA уточняйте у FOREACH."],
  },
  "drpl-motor-wiring.webp": {
    en: ["# Pin numbering. RED A and GRN C form one winding; YEL B and BLU D the other. Follow the supplied connector orientation."],
    es: ["# Numeración. RED A y GRN C forman un bobinado; YEL B y BLU D el otro. Respete orientación del conector."],
    fr: ["# Numérotation. RED A et GRN C forment un enroulement ; YEL B et BLU D l’autre. Respectez l’orientation du connecteur."],
    ko: ["# 핀 번호. RED A·GRN C가 한 권선, YEL B·BLU D가 다른 권선입니다. 공급 커넥터 방향을 따르세요."],
    ru: ["# Нумерация выводов. RED A и GRN C — одна обмотка; YEL B и BLU D — другая. Соблюдайте ориентацию разъёма."],
  },
  "drpl-optocoupler-wiring.webp": {
    en: ["1 Brown supply · 2 Black output, light-ON · 3 White output, dark-ON · 4 Blue 0 V · 5 Load. Supply 5–24 VDC ±10%. Insulate unused output wires."],
    es: ["1 Marrón alimentación · 2 Negro ON con luz · 3 Blanco ON sin luz · 4 Azul 0 V · 5 Carga. Fuente 5–24 VDC ±10%. Aísle salidas no usadas."],
    fr: ["1 Brun alimentation · 2 Noir ON éclairé · 3 Blanc ON occulté · 4 Bleu 0 V · 5 Charge. Alimentation 5–24 VDC ±10 %. Isolez les sorties inutilisées."],
    ko: ["1 갈색 전원 · 2 검정 입광 ON · 3 흰색 차광 ON · 4 파랑 0 V · 5 부하. 전원 5–24 VDC ±10%. 미사용 출력선은 절연하세요."],
    ru: ["1 Коричневый питание · 2 Чёрный ON при свете · 3 Белый ON без света · 4 Синий 0 V · 5 Нагрузка. Питание 5–24 VDC ±10%. Изолируйте свободные выходы."],
  },
  "drpl-working-cycle.webp": {
    en: ["1 Aspiration → 2 Aspiration complete → 3 Discharge → 4 Discharge complete."],
    es: ["1 Aspiración → 2 Aspiración completa → 3 Descarga → 4 Descarga completa."],
    fr: ["1 Aspiration → 2 Fin d’aspiration → 3 Refoulement → 4 Fin de refoulement."],
    ko: ["1 흡입 → 2 흡입 완료 → 3 배출 → 4 배출 완료."],
    ru: ["1 Всасывание → 2 Конец всасывания → 3 Нагнетание → 4 Конец нагнетания."],
  },
};

export function getInstrumentFigureLegend(file: string, locale: InstrumentGuideLocale): readonly string[] | undefined {
  return legends[file]?.[locale];
}

const ratio = {
  hi: { concentrate: "सांद्र द्रव", diluent: "तनुकारक", nominal: "नाममात्र कुल मात्रा", perRev: "/चक्कर", validation: "बाद की मिश्रण प्रक्रिया में एकरूपता की पुष्टि करें।", ratio: "आयतन अनुपात" },
  it: { concentrate: "Concentrato", diluent: "Diluente", nominal: "Totale nominale", perRev: "/giro", validation: "Verificare l'omogeneità dopo la miscelazione a valle.", ratio: "Rapporto volumetrico" },
  de: { concentrate: "Konzentrat", diluent: "Verdünnungsmittel", nominal: "Nominale Gesamtmenge", perRev: "/Umdr.", validation: "Prüfen Sie die Homogenität beim nachgeschalteten Mischen.", ratio: "Volumenverhältnis" },
  zh: { concentrate: "浓缩液", diluent: "稀释液", nominal: "名义合计", perRev: "/圈", validation: "混合均匀性由下游混合过程验证。", ratio: "体积比" },
  en: { concentrate: "Concentrate", diluent: "Diluent", nominal: "Nominal total", perRev: "/rev", validation: "Validate uniformity in the downstream mixing process.", ratio: "Volume ratio" },
  es: { concentrate: "Concentrado", diluent: "Diluyente", nominal: "Total nominal", perRev: "/vuelta", validation: "Valide la uniformidad en el proceso de mezcla posterior.", ratio: "Proporción volumétrica" },
  fr: { concentrate: "Concentré", diluent: "Diluant", nominal: "Total nominal", perRev: "/tour", validation: "Validez l’homogénéité dans le mélange en aval.", ratio: "Rapport volumique" },
  ko: { concentrate: "농축액", diluent: "희석액", nominal: "공칭 합계", perRev: "/회전", validation: "혼합 균일성은 후단 혼합 과정으로 검증하세요.", ratio: "체적비" },
  ru: { concentrate: "Концентрат", diluent: "Разбавитель", nominal: "Номинальная сумма", perRev: "/об", validation: "Однородность проверяйте в последующем процессе смешивания.", ratio: "Объёмное отношение" },
} as const;
export const getInstrumentRatioCopy = (locale: string) => ratio[locale as keyof typeof ratio] ?? ratio.zh;

export function getInstrumentRatioPartLabel(locale: string, count: number, liquid: "concentrate" | "diluent"): string {
  switch (locale) {
    case "en": return `${count} ${count === 1 ? "part" : "parts"} ${liquid}`;
    case "es": return `${count} ${count === 1 ? "parte" : "partes"} de ${liquid === "concentrate" ? "concentrado" : "diluyente"}`;
    case "fr": return `${count} ${count === 1 ? "part" : "parts"} de ${liquid === "concentrate" ? "concentré" : "diluant"}`;
    case "ko": return `${liquid === "concentrate" ? "농축액" : "희석액"} ${count}부`;
    case "ru": {
      const lastTwo = count % 100;
      const part = lastTwo >= 11 && lastTwo <= 14 ? "частей" : count % 10 === 1 ? "часть" : count % 10 >= 2 && count % 10 <= 4 ? "части" : "частей";
      return `${count} ${part} ${liquid === "concentrate" ? "концентрата" : "разбавителя"}`;
    }
    default: return `${count} 份${liquid === "concentrate" ? "浓缩液" : "稀释液"}`;
  }
}
