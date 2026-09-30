import type { SelectionLocale } from "./product-selection.types";

type HpValveIntroCopy = {
  title: string;
  paragraphs: string[];
  imageAlt: string;
  detailLabel: string;
};

// HP PS-120C-2604-00001-001: function on p. 4, product specifications on p. 6.
const hpValveIntroCopy: Record<SelectionLocale, HpValveIntroCopy> = {
  zh: {
    title: "用于 HPLC 自动进样的 HP 二位六通带排气高压旋转阀",
    paragraphs: [
      "FOREACH HP 高压旋转阀是面向 HPLC 自动进样器和分析仪器的 OEM 液路部件。二位六通主流路配合外接定量环，在装样位准备样品，在进样位将定量环接入流动相路径，并通过独立排气位置管理排气通路。阀与进样机构、HPLC 泵和控制程序配合，完成装样、进样与排气的动作衔接。",
      "HP 最大工作压力为 25 MPa，采用 0.4 mm 通径、0.8 μL 阀内容积和 10-32 UNF 接口。选型时需核对样品、流动相和清洗液与接液材料的兼容性，并结合定量环、管路及接头确认系统压力条件、流路连接和切换时序。",
    ],
    imageAlt: "FOREACH HP 二位六通带排气高压旋转阀产品图",
    detailLabel: "查看 HP 高压旋转阀的流路、参数与应用详情",
  },
  en: {
    title: "HP 2-Position, 6-Port High-Pressure Rotary Valve with Vent for HPLC",
    paragraphs: [
      "The FOREACH HP high-pressure rotary valve is an OEM fluidic component for HPLC autosamplers and analytical instruments. Its two main six-port positions work with an external sample loop: the load position prepares the sample, while the inject position connects the loop to the mobile-phase path. A separate vent position provides a dedicated vent path. The valve works with the sample-loading mechanism, HPLC pump and controller to coordinate these steps.",
      "HP has a maximum working pressure of 25 MPa, a 0.4 mm bore, a 0.8 μL internal valve volume and 10-32 UNF ports. Check wetted-material compatibility with the sample, mobile phase and cleaning fluids, and evaluate the sample loop, tubing and fittings together when confirming system pressure, fluidic connections and switching timing.",
    ],
    imageAlt: "FOREACH HP 2-position, 6-port high-pressure rotary valve with vent",
    detailLabel: "View HP valve flow paths, specifications and applications",
  },
  es: {
    title: "Válvula rotativa HP de alta presión, 2 posiciones y 6 puertos, con venteo para HPLC",
    paragraphs: [
      "La válvula rotativa de alta presión FOREACH HP es un componente fluídico OEM para automuestreadores HPLC e instrumentos analíticos. Sus dos posiciones principales de seis puertos funcionan con un bucle de muestra externo: la posición de carga prepara la muestra y la de inyección incorpora el bucle al circuito de la fase móvil. Una posición de venteo independiente permite gestionar esa vía. La válvula se coordina con el mecanismo de carga de muestras, la bomba HPLC y el controlador.",
      "HP admite una presión máxima de trabajo de 25 MPa y dispone de un diámetro de paso de 0,4 mm, un volumen interno de 0,8 μL y conexiones 10-32 UNF. Compruebe la compatibilidad de los materiales en contacto con la muestra, la fase móvil y los líquidos de limpieza. Evalúe conjuntamente el bucle, los tubos y los racores para definir la presión del sistema, las conexiones y la secuencia de conmutación.",
    ],
    imageAlt: "Válvula rotativa FOREACH HP de alta presión, 2 posiciones y 6 puertos, con venteo",
    detailLabel: "Ver circuitos, especificaciones y aplicaciones de la válvula HP",
  },
  fr: {
    title: "Vanne rotative HP haute pression à 2 positions et 6 voies, avec évent pour HPLC",
    paragraphs: [
      "La vanne rotative haute pression FOREACH HP est un composant fluidique OEM pour les échantillonneurs automatiques HPLC et les instruments d’analyse. Ses deux positions principales à six voies fonctionnent avec une boucle d’échantillonnage externe : la position de chargement prépare l’échantillon et la position d’injection insère la boucle dans le circuit de la phase mobile. Une position d’évent distincte ouvre une voie dédiée à l’évacuation de l’air. La vanne se coordonne avec le mécanisme de chargement, la pompe HPLC et le contrôleur.",
      "HP présente une pression de service maximale de 25 MPa, un diamètre de passage de 0,4 mm, un volume interne de 0,8 μL et des raccordements 10-32 UNF. Vérifiez la compatibilité des matériaux en contact avec l’échantillon, la phase mobile et les liquides de nettoyage. Évaluez ensemble la boucle, les tubes et les raccords pour définir la pression du système, les connexions et la séquence de commutation.",
    ],
    imageAlt: "Vanne rotative FOREACH HP haute pression à 2 positions et 6 voies avec évent",
    detailLabel: "Voir les circuits, caractéristiques et applications de la vanne HP",
  },
  ko: {
    title: "HPLC용 벤트 기능 내장 HP 2포지션 6포트 고압 로터리 밸브",
    paragraphs: [
      "FOREACH HP 고압 로터리 밸브는 HPLC 자동 시료 주입기와 분석 장비를 위한 OEM 유체 부품입니다. 6포트 구조의 두 주요 포지션은 외부 시료 루프와 함께 작동합니다. 로드 포지션에서는 시료를 준비하고, 인젝트 포지션에서는 루프를 이동상 유로에 연결합니다. 별도의 벤트 포지션은 배기 유로를 관리하며, 밸브는 시료 로딩 기구, HPLC 펌프 및 제어기와 연동하여 각 단계를 수행합니다.",
      "HP의 최대 작동 압력은 25 MPa이며, 유로 직경은 0.4 mm, 밸브 내부 체적은 0.8 μL, 연결 규격은 10-32 UNF입니다. 시료, 이동상 및 세척액과 접액 재질의 호환성을 확인하고, 시료 루프·튜브·피팅을 함께 검토하여 시스템 압력, 유로 연결 및 전환 순서를 결정해야 합니다.",
    ],
    imageAlt: "벤트 기능이 있는 FOREACH HP 2포지션 6포트 고압 로터리 밸브",
    detailLabel: "HP 밸브의 유로, 사양 및 적용 분야 보기",
  },
  ru: {
    title: "Роторный клапан HP высокого давления для ВЭЖХ: 2 положения, 6 портов и отвод воздуха",
    paragraphs: [
      "Роторный клапан высокого давления FOREACH HP — это OEM-компонент жидкостного тракта для автосамплеров ВЭЖХ и аналитических приборов. Два основных положения шестипортовой схемы работают с внешней петлёй для пробы: в положении загрузки проба заполняет петлю, а в положении ввода петля включается в поток подвижной фазы. Отдельное положение обеспечивает путь отвода воздуха. Клапан работает совместно с механизмом загрузки пробы, насосом ВЭЖХ и контроллером.",
      "Максимальное рабочее давление HP составляет 25 МПа, диаметр канала — 0,4 мм, внутренний объём клапана — 0,8 мкл, резьба портов — 10-32 UNF. Проверьте совместимость контактирующих с жидкостью материалов с пробой, подвижной фазой и промывочными жидкостями. Петлю, трубки и фитинги следует оценивать совместно при определении давления системы, соединений и последовательности переключения.",
    ],
    imageAlt: "Роторный клапан FOREACH HP высокого давления с 2 положениями, 6 портами и отводом воздуха",
    detailLabel: "Схемы потоков, характеристики и применение клапана HP",
  },
};

export function getHpValveIntro(locale: SelectionLocale) {
  const copy = hpValveIntroCopy[locale];
  const href = `${locale === "zh" ? "" : `/${locale}`}/products/valves/high-pressure-valves/hp/`;
  return {
    title: copy.title,
    paragraphs: [...copy.paragraphs, `[${copy.detailLabel}](${href})`],
    image: {
      src: "/images/products/valves/high-pressure-valves/foreach-high-pressure-valve-main.webp",
      alt: copy.imageAlt,
    },
  };
}
