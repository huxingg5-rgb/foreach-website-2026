import type {
  InstallationGuideLocale,
  InstallationGuidePageData,
} from "./installation-guide.types";

const installationGuideEnglishData: Omit<InstallationGuidePageData, "locale"> = {
  hero: {
    kicker: "INSTALLATION GUIDE",
    title: "Product Installation and Operating Guides",
    description:
      "Find installation steps, setup instructions, calibration methods and troubleshooting guidance for FOREACH microfluidic products.",
  },
  search: {
    placeholder: "Enter a product name or model",
    buttonText: "Search",
    recentLabel: "Recent searches",
    recentKeywords: [
      "Plunger Pump",
      "Q20",
      "Solenoid Valve",
      "High-Pressure Valve",
      "Pressure Sensor",
    ],
  },
  sidebar: {
    title: "Product Series",
    tree: [
      { id: "all", type: "all", name: "All Guides", children: [] },
      {
        id: "fittings",
        type: "category",
        name: "Fittings and Tubing Connections",
        children: [],
      },
      {
        id: "pumps",
        type: "category",
        name: "Pumps",
        children: [
          { id: "plunger-pump", name: "Plunger Pumps" },
          { id: "diaphragm-pump", name: "Diaphragm Pumps" },
          { id: "valveless-pump", name: "Valveless Pumps" },
          { id: "syringe-pump", name: "Syringe Pumps" },
          { id: "high-pressure-pump", name: "High-Pressure Pumps" },
        ],
      },
      {
        id: "valves",
        type: "category",
        name: "Valves",
        children: [
          { id: "rotary-valve", name: "Rotary Valves" },
          { id: "solenoid-valve", name: "Solenoid Valves" },
          { id: "high-pressure-valve", name: "High-Pressure Valves" },
          { id: "pinch-valve", name: "Pinch Valves" },
        ],
      },
      { id: "sensors", type: "category", name: "Sensors", children: [] },
      {
        id: "quality-control",
        type: "category",
        name: "Quality Control",
        children: [],
      },
      { id: "needles", type: "category", name: "Probes and Needles", children: [] },
    ],
  },
  support: {
    title: "Cannot find the guide you need?",
    description:
      "Send us the product model, application details or drawings if you need help with installation, parameter setup or calibration. The FOREACH technical team will assist you.",
    buttonText: "Contact Technical Support",
    href: "/contact",
  },
  guides: [
    {
      id: "hard-tube-fitting-guide",
      title: "Rigid-Tubing Fitting Installation Guide",
      category: "fittings",
      series: "fittings",
      tags: ["Fittings", "Tubing", "Sealing"],
      description:
        "Instructions for inserting rigid tubing, tightening the fitting and checking the seal.",
      keywords: ["rigid tubing", "fitting", "Q20", "Q40", "Q60", "tubing", "seal"],
      videoPlatform: "youtube",
      steps: [
        {
          title: "Prepare the fitting and tubing",
          description:
            "Confirm that the tubing OD matches the fitting and that the cut end is square and clean.",
        },
        {
          title: "Insert the tubing",
          description:
            "Insert the tubing axially into the fitting without angling or forcing it.",
        },
        {
          title: "Tighten and inspect",
          description:
            "After tightening, check that the tubing is secure before running a fluid test.",
        },
      ],
    },
    {
      id: "plunger-pump-install-guide",
      title: "Plunger Pump Installation and Tubing Connections",
      category: "pumps",
      series: "plunger-pump",
      tags: ["Motor", "Wiring", "Commissioning"],
      description:
        "Guidance for mounting a plunger pump, connecting its inlet and outlet, routing tubing and performing an initial operating check.",
      keywords: ["plunger pump", "motor", "wiring", "installation", "commissioning", "tubing"],
      videoPlatform: "youtube",
      steps: [
        {
          title: "Confirm the mounting orientation",
          description:
            "Use the instrument layout to confirm the pump orientation and inlet and outlet positions.",
        },
        {
          title: "Connect the tubing",
          description:
            "Connect the inlet and outlet tubing and confirm that the fitting specifications match.",
        },
        {
          title: "Run an initial check",
          description:
            "Operate at low speed and check for bubbles, leakage or unusual noise.",
        },
      ],
    },
    {
      id: "diaphragm-pump-guide",
      title: "Diaphragm Pump Installation and Tubing Connections",
      category: "pumps",
      series: "diaphragm-pump",
      tags: ["Diaphragm Pump", "Tubing", "Mounting"],
      description:
        "Guidance for pump orientation, inlet and outlet connections, mounting and operating checks.",
      keywords: ["diaphragm pump", "DPL", "installation", "tubing", "connection"],
      videoPlatform: "youtube",
      steps: [
        {
          title: "Confirm the mounting orientation",
          description:
            "Use the pump markings to identify the inlet, outlet and mounting orientation.",
        },
        {
          title: "Connect the tubing",
          description: "Connect the inlet and outlet tubing and verify that the fittings are secure.",
        },
        {
          title: "Run an initial check",
          description:
            "Operate the pump briefly and observe suction, discharge and vibration.",
        },
      ],
    },
    {
      id: "solenoid-valve-guide",
      title: "Solenoid Valve Tubing Connection Guide",
      category: "valves",
      series: "solenoid-valve",
      tags: ["Valve Body", "Wiring", "Function Test"],
      description:
        "Instructions for identifying valve ports, connecting tubing and performing an on/off function test.",
      keywords: ["solenoid valve", "6010", "wiring", "valve body", "function test"],
      videoPlatform: "youtube",
      steps: [
        {
          title: "Identify the ports",
          description: "Confirm the inlet, outlet and drain port orientation.",
        },
        {
          title: "Connect the tubing",
          description: "Connect the tubing in the specified flow direction.",
        },
        {
          title: "Test valve operation",
          description: "Power the valve and perform an on/off test to confirm normal operation.",
        },
      ],
    },
    {
      id: "pressure-sensor-guide",
      title: "Pressure Sensor Installation Guide",
      category: "sensors",
      series: "sensors",
      tags: ["Signal", "Wiring", "Measurement"],
      description:
        "Instructions for sensor orientation, fluidic and electrical connections, and the initial reading check.",
      keywords: ["pressure sensor", "signal", "wiring", "measurement"],
      videoPlatform: "youtube",
      steps: [
        {
          title: "Confirm the installation position",
          description: "Select the sensor position according to the fluid-path direction.",
        },
        {
          title: "Connect the interfaces",
          description: "Connect the fluidic interface and signal cable.",
        },
        {
          title: "Check the signal",
          description: "Power the sensor and confirm that the initial reading is stable.",
        },
      ],
    },
  ],
};

type ForeignInstallationLocale = Exclude<InstallationGuideLocale, "zh-CN" | "en">;

type InstallationGuideTranslation = Pick<
  InstallationGuidePageData["guides"][number],
  "title" | "tags" | "description" | "keywords" | "steps"
>;

type InstallationGuideTranslationPack = {
  hero: InstallationGuidePageData["hero"];
  search: InstallationGuidePageData["search"];
  sidebarTitle: string;
  treeNames: Record<string, string>;
  support: Omit<InstallationGuidePageData["support"], "href">;
  ui: NonNullable<InstallationGuidePageData["ui"]>;
  guides: Record<string, InstallationGuideTranslation>;
};

const installationGuideTranslations: Record<
  ForeignInstallationLocale,
  InstallationGuideTranslationPack
> = {
  es: {
    hero: {
      kicker: "GUÍAS DE INSTALACIÓN",
      title: "Guías de instalación y funcionamiento de productos",
      description:
        "Consulte los pasos de instalación, la configuración, los métodos de calibración y la solución de problemas de los productos microfluídicos FOREACH.",
    },
    search: {
      placeholder: "Introduzca un producto o modelo",
      buttonText: "Buscar",
      recentLabel: "Búsquedas recientes",
      recentKeywords: ["Bomba de émbolo", "Q20", "Electroválvula", "Válvula de alta presión", "Sensor de presión"],
    },
    sidebarTitle: "Series de productos",
    treeNames: {
      all: "Todas las guías", fittings: "Racores y conexiones de tubos", pumps: "Bombas",
      "plunger-pump": "Bombas de émbolo", "diaphragm-pump": "Bombas de diafragma",
      "valveless-pump": "Bombas sin válvulas", "syringe-pump": "Bombas de jeringa",
      "high-pressure-pump": "Bombas de alta presión", valves: "Válvulas",
      "rotary-valve": "Válvulas rotativas", "solenoid-valve": "Electroválvulas",
      "high-pressure-valve": "Válvulas de alta presión", "pinch-valve": "Válvulas de pinza",
      sensors: "Sensores", "quality-control": "Control de calidad", needles: "Sondas y agujas",
    },
    support: {
      title: "¿Necesita otra guía?",
      description: "Envíenos el modelo del producto, la aplicación o los detalles del problema y el equipo técnico de FOREACH le ayudará con la instalación, la puesta en marcha o la configuración de parámetros.",
      buttonText: "Solicitar una guía",
    },
    ui: {
      breadcrumbAriaLabel: "Ruta de navegación", breadcrumbHome: "Inicio", breadcrumbResources: "Recursos", breadcrumbCurrent: "Guías de instalación",
      productCategory: "Categoría de producto: ", tags: "Etiquetas: ", emptyTitle: "No se encontraron guías",
      emptyDescription: "Pruebe otra palabra clave o seleccione una serie de productos diferente.",
    },
    guides: {
      "hard-tube-fitting-guide": {
        title: "Guía de instalación de racores para tubos rígidos", tags: ["Racores", "Tubos", "Sellado"],
        description: "Instrucciones para insertar el tubo rígido, apretar el racor y comprobar el sellado.",
        keywords: ["tubo rígido", "racor", "Q20", "Q40", "Q60", "tubo", "sellado"],
        steps: [
          { title: "Prepare el racor y el tubo", description: "Compruebe que el diámetro exterior del tubo coincide con el racor y que el corte es recto y limpio." },
          { title: "Inserte el tubo", description: "Inserte el tubo axialmente en el racor, sin inclinarlo ni forzarlo." },
          { title: "Apriete e inspeccione", description: "Después de apretar, compruebe que el tubo esté firme antes de realizar una prueba con fluido." },
        ],
      },
      "plunger-pump-install-guide": {
        title: "Instalación y conexiones de tubos de una bomba de émbolo", tags: ["Motor", "Cableado", "Puesta en marcha"],
        description: "Orientación para montar una bomba de émbolo, conectar la entrada y la salida, tender los tubos y efectuar la comprobación inicial.",
        keywords: ["bomba de émbolo", "motor", "cableado", "instalación", "puesta en marcha", "tubos"],
        steps: [
          { title: "Confirme la orientación de montaje", description: "Utilice el plano del instrumento para confirmar la orientación de la bomba y las posiciones de entrada y salida." },
          { title: "Conecte los tubos", description: "Conecte los tubos de entrada y salida y compruebe que las especificaciones de los racores sean correctas." },
          { title: "Realice una comprobación inicial", description: "Haga funcionar la bomba a baja velocidad y compruebe si hay burbujas, fugas o ruidos anómalos." },
        ],
      },
      "diaphragm-pump-guide": {
        title: "Instalación y conexiones de tubos de una bomba de diafragma", tags: ["Bomba de diafragma", "Tubos", "Montaje"],
        description: "Orientación sobre la posición de la bomba, las conexiones de entrada y salida, el montaje y las comprobaciones de funcionamiento.",
        keywords: ["bomba de diafragma", "DPL", "instalación", "tubos", "conexión"],
        steps: [
          { title: "Confirme la orientación de montaje", description: "Utilice las marcas de la bomba para identificar la entrada, la salida y la orientación de montaje." },
          { title: "Conecte los tubos", description: "Conecte los tubos de entrada y salida y compruebe que los racores estén bien sujetos." },
          { title: "Realice una comprobación inicial", description: "Accione brevemente la bomba y observe la aspiración, la descarga y la vibración." },
        ],
      },
      "solenoid-valve-guide": {
        title: "Guía de conexión de tubos para electroválvulas", tags: ["Cuerpo de válvula", "Cableado", "Prueba funcional"],
        description: "Instrucciones para identificar los puertos de la válvula, conectar los tubos y realizar una prueba de apertura y cierre.",
        keywords: ["electroválvula", "6010", "cableado", "cuerpo de válvula", "prueba funcional"],
        steps: [
          { title: "Identifique los puertos", description: "Confirme la orientación de la entrada, la salida y el puerto de drenaje." },
          { title: "Conecte los tubos", description: "Conecte los tubos en la dirección de flujo especificada." },
          { title: "Pruebe el funcionamiento", description: "Alimente la válvula y realice una prueba de apertura y cierre para confirmar el funcionamiento normal." },
        ],
      },
      "pressure-sensor-guide": {
        title: "Guía de instalación del sensor de presión", tags: ["Señal", "Cableado", "Medición"],
        description: "Instrucciones sobre la orientación del sensor, las conexiones fluídicas y eléctricas y la comprobación de la lectura inicial.",
        keywords: ["sensor de presión", "señal", "cableado", "medición"],
        steps: [
          { title: "Confirme la posición de instalación", description: "Seleccione la posición del sensor de acuerdo con la dirección del circuito de fluido." },
          { title: "Conecte las interfaces", description: "Conecte la interfaz fluídica y el cable de señal." },
          { title: "Compruebe la señal", description: "Alimente el sensor y confirme que la lectura inicial sea estable." },
        ],
      },
    },
  },
  fr: {
    hero: {
      kicker: "GUIDES D’INSTALLATION",
      title: "Guides d’installation et d’utilisation des produits",
      description: "Retrouvez les étapes d’installation, les instructions de configuration, les méthodes d’étalonnage et le dépannage des produits microfluidiques FOREACH.",
    },
    search: {
      placeholder: "Saisissez un produit ou un modèle", buttonText: "Rechercher", recentLabel: "Recherches récentes",
      recentKeywords: ["Pompe à piston", "Q20", "Électrovanne", "Vanne haute pression", "Capteur de pression"],
    },
    sidebarTitle: "Séries de produits",
    treeNames: {
      all: "Tous les guides", fittings: "Raccords et connexions de tubes", pumps: "Pompes",
      "plunger-pump": "Pompes à piston", "diaphragm-pump": "Pompes à membrane", "valveless-pump": "Pompes sans clapet",
      "syringe-pump": "Pompes à seringue", "high-pressure-pump": "Pompes haute pression", valves: "Vannes",
      "rotary-valve": "Vannes rotatives", "solenoid-valve": "Électrovannes", "high-pressure-valve": "Vannes haute pression",
      "pinch-valve": "Vannes à pincement", sensors: "Capteurs", "quality-control": "Contrôle qualité", needles: "Sondes et aiguilles",
    },
    support: {
      title: "Besoin d’un autre guide ?", description: "Envoyez-nous le modèle du produit, l’application ou les détails du problème. L’équipe technique FOREACH vous aidera pour l’installation, la mise en service ou le réglage des paramètres.", buttonText: "Demander un guide",
    },
    ui: {
      breadcrumbAriaLabel: "Fil d’Ariane", breadcrumbHome: "Accueil", breadcrumbResources: "Ressources", breadcrumbCurrent: "Guides d’installation",
      productCategory: "Catégorie de produit : ", tags: "Étiquettes : ", emptyTitle: "Aucun guide correspondant",
      emptyDescription: "Essayez un autre mot-clé ou sélectionnez une autre série de produits.",
    },
    guides: {
      "hard-tube-fitting-guide": {
        title: "Guide d’installation des raccords pour tubes rigides", tags: ["Raccords", "Tubes", "Étanchéité"],
        description: "Instructions pour insérer un tube rigide, serrer le raccord et contrôler l’étanchéité.", keywords: ["tube rigide", "raccord", "Q20", "Q40", "Q60", "tube", "étanchéité"],
        steps: [
          { title: "Préparer le raccord et le tube", description: "Vérifiez que le diamètre extérieur du tube correspond au raccord et que la coupe est droite et propre." },
          { title: "Insérer le tube", description: "Insérez le tube dans l’axe du raccord, sans l’incliner ni le forcer." },
          { title: "Serrer et contrôler", description: "Après le serrage, vérifiez que le tube est bien maintenu avant d’effectuer un essai avec le fluide." },
        ],
      },
      "plunger-pump-install-guide": {
        title: "Installation et raccordement des tubes d’une pompe à piston", tags: ["Moteur", "Câblage", "Mise en service"],
        description: "Conseils pour monter une pompe à piston, raccorder l’entrée et la sortie, acheminer les tubes et effectuer le contrôle initial.", keywords: ["pompe à piston", "moteur", "câblage", "installation", "mise en service", "tubes"],
        steps: [
          { title: "Vérifier l’orientation de montage", description: "Utilisez le plan de l’instrument pour vérifier l’orientation de la pompe et la position de l’entrée et de la sortie." },
          { title: "Raccorder les tubes", description: "Raccordez les tubes d’entrée et de sortie et vérifiez que les raccords répondent aux spécifications." },
          { title: "Effectuer un contrôle initial", description: "Faites fonctionner la pompe à faible vitesse et recherchez les bulles, les fuites ou les bruits anormaux." },
        ],
      },
      "diaphragm-pump-guide": {
        title: "Installation et raccordement des tubes d’une pompe à membrane", tags: ["Pompe à membrane", "Tubes", "Montage"],
        description: "Conseils sur l’orientation de la pompe, les raccordements d’entrée et de sortie, le montage et les contrôles de fonctionnement.", keywords: ["pompe à membrane", "DPL", "installation", "tubes", "raccordement"],
        steps: [
          { title: "Vérifier l’orientation de montage", description: "Utilisez les repères de la pompe pour identifier l’entrée, la sortie et l’orientation de montage." },
          { title: "Raccorder les tubes", description: "Raccordez les tubes d’entrée et de sortie et vérifiez que les raccords sont bien fixés." },
          { title: "Effectuer un contrôle initial", description: "Faites brièvement fonctionner la pompe et observez l’aspiration, le refoulement et les vibrations." },
        ],
      },
      "solenoid-valve-guide": {
        title: "Guide de raccordement des tubes d’une électrovanne", tags: ["Corps de vanne", "Câblage", "Test fonctionnel"],
        description: "Instructions pour identifier les orifices de la vanne, raccorder les tubes et effectuer un test d’ouverture et de fermeture.", keywords: ["électrovanne", "6010", "câblage", "corps de vanne", "test fonctionnel"],
        steps: [
          { title: "Identifier les orifices", description: "Vérifiez l’orientation de l’entrée, de la sortie et de l’orifice de vidange." },
          { title: "Raccorder les tubes", description: "Raccordez les tubes dans le sens d’écoulement indiqué." },
          { title: "Tester le fonctionnement", description: "Alimentez la vanne et effectuez un test d’ouverture et de fermeture pour confirmer son fonctionnement normal." },
        ],
      },
      "pressure-sensor-guide": {
        title: "Guide d’installation du capteur de pression", tags: ["Signal", "Câblage", "Mesure"],
        description: "Instructions sur l’orientation du capteur, les connexions fluidiques et électriques et le contrôle de la valeur initiale.", keywords: ["capteur de pression", "signal", "câblage", "mesure"],
        steps: [
          { title: "Vérifier la position d’installation", description: "Choisissez la position du capteur en fonction du sens du circuit fluidique." },
          { title: "Raccorder les interfaces", description: "Raccordez l’interface fluidique et le câble de signal." },
          { title: "Contrôler le signal", description: "Alimentez le capteur et vérifiez que la valeur initiale est stable." },
        ],
      },
    },
  },
  ko: {
    hero: {
      kicker: "설치 가이드", title: "제품 설치 및 작동 가이드",
      description: "FOREACH 미세유체 제품의 설치 절차, 설정 지침, 교정 방법 및 문제 해결 정보를 확인하세요.",
    },
    search: {
      placeholder: "제품명 또는 모델을 입력하세요", buttonText: "검색", recentLabel: "최근 검색",
      recentKeywords: ["플런저 펌프", "Q20", "솔레노이드 밸브", "고압 밸브", "압력 센서"],
    },
    sidebarTitle: "제품 시리즈",
    treeNames: {
      all: "전체 가이드", fittings: "피팅 및 튜브 연결", pumps: "펌프", "plunger-pump": "플런저 펌프",
      "diaphragm-pump": "다이어프램 펌프", "valveless-pump": "무밸브 펌프", "syringe-pump": "시린지 펌프",
      "high-pressure-pump": "고압 펌프", valves: "밸브", "rotary-valve": "로터리 밸브", "solenoid-valve": "솔레노이드 밸브",
      "high-pressure-valve": "고압 밸브", "pinch-valve": "핀치 밸브", sensors: "센서", "quality-control": "품질 관리", needles: "프로브 및 니들",
    },
    support: {
      title: "다른 가이드가 필요하신가요?", description: "제품 모델, 적용 분야 또는 문제 내용을 보내 주시면 FOREACH 기술팀이 설치, 시운전 또는 파라미터 설정을 지원해 드립니다.", buttonText: "가이드 요청",
    },
    ui: {
      breadcrumbAriaLabel: "이동 경로", breadcrumbHome: "홈", breadcrumbResources: "자료", breadcrumbCurrent: "설치 가이드",
      productCategory: "제품 분류: ", tags: "태그: ", emptyTitle: "일치하는 가이드가 없습니다",
      emptyDescription: "다른 키워드를 사용하거나 다른 제품 시리즈를 선택하세요.",
    },
    guides: {
      "hard-tube-fitting-guide": {
        title: "경질 튜브 피팅 설치 가이드", tags: ["피팅", "튜브", "밀봉"],
        description: "경질 튜브 삽입, 피팅 체결 및 밀봉 확인 방법입니다.", keywords: ["경질 튜브", "피팅", "Q20", "Q40", "Q60", "튜브", "밀봉"],
        steps: [
          { title: "피팅과 튜브 준비", description: "튜브 외경이 피팅과 일치하고 절단면이 직각이며 깨끗한지 확인합니다." },
          { title: "튜브 삽입", description: "기울이거나 억지로 밀지 말고 튜브를 피팅 축 방향으로 삽입합니다." },
          { title: "체결 및 점검", description: "체결 후 유체 시험을 하기 전에 튜브가 단단히 고정되었는지 확인합니다." },
        ],
      },
      "plunger-pump-install-guide": {
        title: "플런저 펌프 설치 및 튜브 연결", tags: ["모터", "배선", "시운전"],
        description: "플런저 펌프 장착, 입출구 연결, 튜브 배치 및 초기 작동 점검 지침입니다.", keywords: ["플런저 펌프", "모터", "배선", "설치", "시운전", "튜브"],
        steps: [
          { title: "장착 방향 확인", description: "장비 배치도를 사용해 펌프 방향과 입구 및 출구 위치를 확인합니다." },
          { title: "튜브 연결", description: "입출구 튜브를 연결하고 피팅 사양이 일치하는지 확인합니다." },
          { title: "초기 점검 실행", description: "저속으로 작동하면서 기포, 누출 또는 이상 소음이 있는지 확인합니다." },
        ],
      },
      "diaphragm-pump-guide": {
        title: "다이어프램 펌프 설치 및 튜브 연결", tags: ["다이어프램 펌프", "튜브", "장착"],
        description: "펌프 방향, 입출구 연결, 장착 및 작동 점검 지침입니다.", keywords: ["다이어프램 펌프", "DPL", "설치", "튜브", "연결"],
        steps: [
          { title: "장착 방향 확인", description: "펌프 표시를 사용해 입구, 출구 및 장착 방향을 확인합니다." },
          { title: "튜브 연결", description: "입출구 튜브를 연결하고 피팅이 단단히 고정되었는지 확인합니다." },
          { title: "초기 점검 실행", description: "펌프를 잠시 작동하여 흡입, 토출 및 진동 상태를 관찰합니다." },
        ],
      },
      "solenoid-valve-guide": {
        title: "솔레노이드 밸브 튜브 연결 가이드", tags: ["밸브 본체", "배선", "기능 시험"],
        description: "밸브 포트 식별, 튜브 연결 및 개폐 기능 시험 방법입니다.", keywords: ["솔레노이드 밸브", "6010", "배선", "밸브 본체", "기능 시험"],
        steps: [
          { title: "포트 식별", description: "입구, 출구 및 배출 포트 방향을 확인합니다." },
          { title: "튜브 연결", description: "지정된 유동 방향에 맞게 튜브를 연결합니다." },
          { title: "밸브 작동 시험", description: "밸브에 전원을 공급하고 개폐 시험을 수행해 정상 작동을 확인합니다." },
        ],
      },
      "pressure-sensor-guide": {
        title: "압력 센서 설치 가이드", tags: ["신호", "배선", "측정"],
        description: "센서 방향, 유체 및 전기 연결, 초기 판독값 확인 방법입니다.", keywords: ["압력 센서", "신호", "배선", "측정"],
        steps: [
          { title: "설치 위치 확인", description: "유로 방향에 따라 센서 위치를 선택합니다." },
          { title: "인터페이스 연결", description: "유체 인터페이스와 신호 케이블을 연결합니다." },
          { title: "신호 확인", description: "센서에 전원을 공급하고 초기 판독값이 안정적인지 확인합니다." },
        ],
      },
    },
  },
  ru: {
    hero: {
      kicker: "РУКОВОДСТВА ПО МОНТАЖУ", title: "Руководства по монтажу и эксплуатации оборудования",
      description: "Инструкции по монтажу, настройке, калибровке и устранению неисправностей микрофлюидных изделий FOREACH.",
    },
    search: {
      placeholder: "Введите название или модель изделия", buttonText: "Найти", recentLabel: "Недавние запросы",
      recentKeywords: ["Плунжерный насос", "Q20", "Электромагнитный клапан", "Клапан высокого давления", "Датчик давления"],
    },
    sidebarTitle: "Серии продукции",
    treeNames: {
      all: "Все руководства", fittings: "Фитинги и трубные соединения", pumps: "Насосы", "plunger-pump": "Плунжерные насосы",
      "diaphragm-pump": "Мембранные насосы", "valveless-pump": "Бесклапанные насосы", "syringe-pump": "Шприцевые насосы",
      "high-pressure-pump": "Насосы высокого давления", valves: "Клапаны", "rotary-valve": "Поворотные клапаны",
      "solenoid-valve": "Электромагнитные клапаны", "high-pressure-valve": "Клапаны высокого давления",
      "pinch-valve": "Пережимные клапаны", sensors: "Датчики", "quality-control": "Контроль качества", needles: "Зонды и иглы",
    },
    support: {
      title: "Нужно другое руководство?", description: "Сообщите модель изделия, область применения или подробности проблемы. Технические специалисты FOREACH помогут с монтажом, вводом в эксплуатацию и настройкой параметров.", buttonText: "Запросить руководство",
    },
    ui: {
      breadcrumbAriaLabel: "Навигационная цепочка", breadcrumbHome: "Главная", breadcrumbResources: "Ресурсы", breadcrumbCurrent: "Руководства по монтажу",
      productCategory: "Категория продукции: ", tags: "Метки: ", emptyTitle: "Подходящие руководства не найдены",
      emptyDescription: "Попробуйте другой запрос или выберите другую серию продукции.",
    },
    guides: {
      "hard-tube-fitting-guide": {
        title: "Руководство по монтажу фитингов для жёстких трубок", tags: ["Фитинги", "Трубки", "Герметизация"],
        description: "Инструкции по установке жёсткой трубки, затяжке фитинга и проверке герметичности.", keywords: ["жёсткая трубка", "фитинг", "Q20", "Q40", "Q60", "трубка", "герметичность"],
        steps: [
          { title: "Подготовьте фитинг и трубку", description: "Убедитесь, что наружный диаметр трубки соответствует фитингу, а срез выполнен ровно и чисто." },
          { title: "Вставьте трубку", description: "Вставьте трубку в фитинг по оси, не наклоняя и не прилагая чрезмерных усилий." },
          { title: "Затяните и проверьте", description: "После затяжки убедитесь, что трубка закреплена, прежде чем проводить испытание с рабочей средой." },
        ],
      },
      "plunger-pump-install-guide": {
        title: "Монтаж и подключение трубок плунжерного насоса", tags: ["Двигатель", "Электропроводка", "Ввод в эксплуатацию"],
        description: "Рекомендации по установке плунжерного насоса, подключению входа и выхода, прокладке трубок и первичной проверке.", keywords: ["плунжерный насос", "двигатель", "электропроводка", "монтаж", "ввод в эксплуатацию", "трубки"],
        steps: [
          { title: "Проверьте ориентацию при монтаже", description: "По компоновочному чертежу прибора проверьте ориентацию насоса и положение входа и выхода." },
          { title: "Подключите трубки", description: "Подключите входную и выходную трубки и убедитесь, что характеристики фитингов соответствуют требованиям." },
          { title: "Выполните первичную проверку", description: "Запустите насос на малой скорости и проверьте наличие пузырьков, утечек и постороннего шума." },
        ],
      },
      "diaphragm-pump-guide": {
        title: "Монтаж и подключение трубок мембранного насоса", tags: ["Мембранный насос", "Трубки", "Монтаж"],
        description: "Рекомендации по ориентации насоса, подключению входа и выхода, монтажу и проверке работы.", keywords: ["мембранный насос", "DPL", "монтаж", "трубки", "подключение"],
        steps: [
          { title: "Проверьте ориентацию при монтаже", description: "По маркировке насоса определите вход, выход и правильную ориентацию при монтаже." },
          { title: "Подключите трубки", description: "Подключите входную и выходную трубки и убедитесь, что фитинги надёжно закреплены." },
          { title: "Выполните первичную проверку", description: "Кратковременно запустите насос и проверьте всасывание, подачу и вибрацию." },
        ],
      },
      "solenoid-valve-guide": {
        title: "Руководство по подключению трубок электромагнитного клапана", tags: ["Корпус клапана", "Электропроводка", "Функциональная проверка"],
        description: "Инструкции по определению портов клапана, подключению трубок и проверке открытия и закрытия.", keywords: ["электромагнитный клапан", "6010", "электропроводка", "корпус клапана", "функциональная проверка"],
        steps: [
          { title: "Определите порты", description: "Проверьте ориентацию входа, выхода и дренажного порта." },
          { title: "Подключите трубки", description: "Подключите трубки в указанном направлении потока." },
          { title: "Проверьте работу клапана", description: "Подайте питание и выполните цикл открытия и закрытия, чтобы подтвердить нормальную работу." },
        ],
      },
      "pressure-sensor-guide": {
        title: "Руководство по монтажу датчика давления", tags: ["Сигнал", "Электропроводка", "Измерение"],
        description: "Инструкции по ориентации датчика, гидравлическому и электрическому подключению и проверке начального показания.", keywords: ["датчик давления", "сигнал", "электропроводка", "измерение"],
        steps: [
          { title: "Проверьте место установки", description: "Выберите положение датчика с учётом направления потока в гидравлическом контуре." },
          { title: "Подключите интерфейсы", description: "Подключите гидравлический интерфейс и сигнальный кабель." },
          { title: "Проверьте сигнал", description: "Подайте питание на датчик и убедитесь, что начальное показание стабильно." },
        ],
      },
    },
  },
};

export function getInstallationGuideIntlData(
  locale: InstallationGuideLocale,
): InstallationGuidePageData {
  const prefix = `/${locale}`;

  if (locale !== "en" && locale !== "zh-CN") {
    const translation = installationGuideTranslations[locale];

    return {
      ...installationGuideEnglishData,
      locale,
      hero: translation.hero,
      search: translation.search,
      sidebar: {
        title: translation.sidebarTitle,
        tree: installationGuideEnglishData.sidebar.tree.map((item) => ({
          ...item,
          name: translation.treeNames[item.id] ?? item.name,
          children: item.children.map((child) => ({
            ...child,
            name: translation.treeNames[child.id] ?? child.name,
          })),
        })),
      },
      support: { ...translation.support, href: `${prefix}/contact` },
      ui: translation.ui,
      guides: installationGuideEnglishData.guides.map((guide) => ({
        ...guide,
        ...translation.guides[guide.id],
      })),
    };
  }

  return {
    ...installationGuideEnglishData,
    locale,
    support: {
      ...installationGuideEnglishData.support,
      href: `${prefix}/contact`,
    },
  };
}
