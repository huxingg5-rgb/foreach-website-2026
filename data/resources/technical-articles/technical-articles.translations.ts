import type {
  TechnicalArticleLocale,
  TechnicalArticlesSourcePageData,
} from "./technical-articles.types";

type ForeignLocale = Exclude<TechnicalArticleLocale, "zh-CN" | "en">;
type ArticleTranslation = readonly [string, string, string, string, string, string];

const pageTranslations: Record<ForeignLocale, {
  heroTitle: string;
  heroDescription: string;
  home: string;
  resources: string;
  current: string;
  search: string;
  sectionTitle: string;
  bannerTitle: string;
  bannerDescription: string;
  contact: string;
}> = {
  es: {
    heroTitle: "Artículos técnicos",
    heroDescription: "Explore conocimientos técnicos de FOREACH sobre selección de productos, compatibilidad de materiales, conexiones de tubos, métodos de sellado y aplicaciones de sistemas microfluídicos.",
    home: "Inicio", resources: "Recursos", current: "Artículos técnicos", search: "Buscar artículos",
    sectionTitle: "Artículos técnicos", bannerTitle: "¿Necesita asistencia técnica para seleccionar productos?",
    bannerDescription: "Comparta con FOREACH el fluido, el rango de presión, el tamaño del tubo, las condiciones de aplicación o los planos para confirmar el producto adecuado.", contact: "Contactar",
  },
  fr: {
    heroTitle: "Articles techniques",
    heroDescription: "Découvrez l’expertise FOREACH sur la sélection des produits, la compatibilité des matériaux, les raccordements de tubes, l’étanchéité et les applications microfluidiques.",
    home: "Accueil", resources: "Ressources", current: "Articles techniques", search: "Rechercher des articles",
    sectionTitle: "Articles techniques", bannerTitle: "Besoin d’une assistance technique pour votre sélection ?",
    bannerDescription: "Communiquez à FOREACH le fluide, la plage de pression, la taille du tube, les conditions d’application ou les plans afin de confirmer le produit adapté.", contact: "Nous contacter",
  },
  ko: {
    heroTitle: "기술 자료",
    heroDescription: "제품 선정, 재질 호환성, 튜브 연결, 밀봉 방식 및 미세유체 시스템 적용에 관한 FOREACH의 기술 정보를 확인하세요.",
    home: "홈", resources: "자료", current: "기술 자료", search: "자료 검색",
    sectionTitle: "기술 자료", bannerTitle: "제품 선정에 기술 지원이 필요하신가요?",
    bannerDescription: "유체, 압력 범위, 튜브 크기, 적용 조건 또는 도면을 FOREACH에 보내 주시면 제품 매칭과 기술 확인을 지원합니다.", contact: "문의하기",
  },
  ru: {
    heroTitle: "Технические статьи",
    heroDescription: "Материалы FOREACH по подбору продукции, совместимости материалов, трубным соединениям, герметизации и применению микрофлюидных систем.",
    home: "Главная", resources: "Ресурсы", current: "Технические статьи", search: "Поиск статей",
    sectionTitle: "Технические статьи", bannerTitle: "Нужна техническая помощь при подборе?",
    bannerDescription: "Сообщите FOREACH рабочую среду, диапазон давления, размер трубки, условия применения или приложите чертежи для подбора и технического подтверждения.", contact: "Связаться",
  },
};

const articleTranslations: Record<ForeignLocale, readonly ArticleTranslation[]> = {
  es: [
    [
      "Guía práctica de ingeniería: corrección de Cv/Kv en microfluídica y restricciones de precisión",
      "Los cálculos Cv/Kv convencionales parten de un régimen turbulento. En pasos muy pequeños y con números de Reynolds bajos pueden subestimar la pérdida real de presión. Esta guía ofrece un método práctico para selección e integración.",
      "Cuándo deja de ser válida la relación cuadrática",
      "En equipos IVD, instrumentos analíticos y automatización, los conductos de 0.1 a 0.5 mm pueden funcionar en régimen laminar o de transición. En estas condiciones, el coeficiente publicado no debe tratarse como una constante universal.",
      "Corrección por Reynolds y geometría real",
      "El factor Fᵣ permite adaptar el Cv/Kv a la condición de trabajo. Los microcanales largos deben evaluarse mediante fricción distribuida, mientras que los orificios cortos requieren una corrección de pérdidas locales.",
    ],
    ["Cómo seleccionar racores adecuados para un sistema microfluídico", "Los racores influyen en el sellado, el montaje, el mantenimiento y la estabilidad. Deben elegirse según el tubo, la conexión, la presión, el fluido y el espacio disponible.", "Función de los racores en los sistemas fluídicos", "En un sistema microfluídico, los racores permiten transferir el fluido, sellar y unir la estructura. Los instrumentos IVD suelen exigir estabilidad y uniformidad a largo plazo, mientras que la automatización de laboratorio prioriza el montaje y el mantenimiento.", "Factores clave de selección", "Compruebe los diámetros del tubo y la compatibilidad de la interfaz. Confirme también si la conexión es para tubo rígido o flexible, con férula, brida o rosca, además de la presión, el fluido y las condiciones de mantenimiento."],
    ["Diferencias entre PEEK, PTFE y PFA en sistemas fluídicos", "PEEK, PTFE y PFA son materiales de alto rendimiento, pero difieren en resistencia mecánica y química, transparencia, flexibilidad y procesabilidad.", "Principales diferencias entre los tres materiales", "PEEK ofrece resistencia mecánica y a la presión; PTFE destaca por su inercia química y baja energía superficial; PFA combina resistencia química con cierta transparencia para aplicaciones que requieren inspección o limpieza.", "La compatibilidad depende de las condiciones reales", "Evalúe concentración, temperatura, tiempo de contacto, presión y método de limpieza. Para mezclas, altas temperaturas o inmersión prolongada se recomiendan pruebas de muestras y confirmación técnica."],
    ["Racores de baja y alta presión: diferencias clave", "Los racores de baja presión priorizan el montaje y el sellado; los de alta presión requieren una estructura, un diseño de sellado y una estabilidad más robustos.", "Requisitos de aplicación diferentes", "Los racores de baja presión se usan en transferencia de reactivos, lavado y manipulación general. Los de alta presión son habituales en instrumentos analíticos o sistemas sensibles a las variaciones de presión.", "La apariencia no basta para sustituirlos", "Aunque dos racores parezcan iguales, pueden diferir en presión nominal, sellado, tubo aplicable y montaje. Confirme el rango de presión y el conjunto completo de tubos."],
    ["Tubos rígidos y flexibles en conexiones fluídicas", "Los tubos rígidos sirven para recorridos estables y definidos; los flexibles facilitan el encaminamiento, la curvatura y la tolerancia a vibraciones.", "Diferencias estructurales", "El tubo rígido conserva mejor las dimensiones y reduce la deformación. El flexible se curva con facilidad y se adapta a espacios limitados o recorridos variables.", "La selección depende del diseño del sistema", "En tubos rígidos cuide el corte, la profundidad de inserción y el sellado. En tubos flexibles evalúe elasticidad, fuerza de sujeción y envejecimiento."],
    ["Causas frecuentes de fallos de sellado en racores", "Las fugas pueden deberse al tubo, la instalación, el corte, las juntas o la presión del sistema, y no solo al racor.", "Causas típicas de fuga", "Entre las causas habituales están un tamaño de tubo incorrecto, corte irregular, inserción insuficiente, roscas flojas, juntas dañadas, incompatibilidad de materiales o presión excesiva.", "Pasos de diagnóstico recomendados", "Compruebe primero las especificaciones del tubo y el racor y después el extremo, la junta y la alineación. Con reactivos corrosivos o limpiadores, confirme la compatibilidad a largo plazo."],
    ["Parámetros clave para seleccionar una microbomba de émbolo", "La selección debe considerar volumen, precisión, repetibilidad, presión, interfaz, accionamiento y protocolo de comunicación.", "Parámetros esenciales además del volumen", "Estas bombas realizan aspiración, dosificación y transferencia cuantitativa en IVD, automatización e instrumentos analíticos. Tras el volumen y la precisión, evalúe presión, fluido, ciclo de trabajo y vida útil.", "Es importante la compatibilidad del sistema", "La bomba debe funcionar con válvulas, tubos, racores, sensores y lógica de control. La interfaz, el método de conexión y el protocolo de comunicación también condicionan la integración."],
    ["Función de las electroválvulas en sistemas microfluídicos", "Las electroválvulas controlan apertura, cierre, conmutación y distribución del flujo en sistemas automatizados.", "Control del circuito de fluido", "Se emplean para controlar reactivos, cambiar soluciones de lavado, descargar residuos y conmutar gas y líquido. Pueden ofrecer dos, tres o más vías según su estructura.", "Factores de selección", "Confirme canales, diámetro de paso, presión, tipo de fluido y material de sellado. Para medios corrosivos o con riesgo de cristalización, evalúe el cuerpo y la estabilidad a largo plazo."],
    ["¿Puede una tabla de compatibilidad ser la base final de selección?", "Una tabla resulta útil para el cribado inicial, pero la selección final también debe considerar temperatura, concentración, presión y tiempo de contacto.", "Las tablas son útiles para el cribado", "Se basan en la experiencia con materiales y sustancias habituales y permiten descartar opciones inadecuadas, pero una aplicación real puede incluir mezclas y condiciones distintas.", "Las condiciones complejas deben confirmarse", "Para disolventes mezclados, altas concentraciones, inmersión prolongada o alta temperatura, aporte información detallada y realice pruebas antes de la selección final."],
    ["Parámetros clave para seleccionar el sistema fluídico de un equipo IVD", "Un sistema IVD exige precisión, estabilidad, limpieza, compatibilidad y facilidad de mantenimiento; cada componente afecta al conjunto.", "El sistema depende de varios componentes", "Bombas, válvulas, tubos, racores, agujas y sensores deben trabajar juntos durante aspiración, dosificación, lavado, reacción y gestión de residuos.", "Parámetros y capacidad de suministro", "Evalúe precisión, repetibilidad, compatibilidad, burbujas, volumen muerto, residuos, interfaces y vida útil. Para producción en serie también importan la uniformidad y un suministro estable."],
    ["Comprender la presión, el caudal y la compatibilidad de materiales", "La presión, el caudal y la compatibilidad son tres factores esenciales que deben evaluarse conjuntamente.", "Los tres factores se evalúan juntos", "La presión fija el rango de trabajo, el caudal condiciona la eficiencia y la respuesta, y la compatibilidad determina la estabilidad de los componentes en contacto con el fluido.", "No se trata de maximizar un solo parámetro", "Un caudal mayor puede provocar variaciones de presión y exigir más al sellado, al tubo y a bombas y válvulas. Con medios corrosivos, confirme todos los materiales mojados."],
    ["Por qué importa el contexto de aplicación al seleccionar productos microfluídicos", "Un producto puede comportarse de forma distinta según la aplicación. Considere el fluido, la presión, la precisión, el espacio y el mantenimiento.", "Cada aplicación tiene requisitos diferentes", "IVD puede priorizar la estabilidad a largo plazo, mientras que los instrumentos analíticos pueden requerir mayor compatibilidad y pocos residuos.", "Más información mejora la selección", "Al solicitar una selección, indique el fluido, los rangos de presión y caudal, el tipo de conexión, el espacio de montaje y la aplicación prevista."],
    ["Cómo seleccionar racores de sustitución a partir de planos o muestras", "La sustitución requiere confirmar interfaz, sellado, material, presión y condiciones, además de las dimensiones exteriores.", "La sustitución no depende solo del aspecto", "Para mantenimiento o localización deben comprobarse dimensiones, rosca, tamaño del tubo, sellado, materiales mojados y presión.", "Los planos, muestras y condiciones ayudan", "Si solo hay una muestra, aporte fotos claras, dimensiones, tubo y fluido. Si hay planos, incluya dimensiones de interfaz, tolerancias y condiciones de montaje."],
  ],
  fr: [
    [
      "Guide d’ingénierie : limites et correction du Cv/Kv en microfluidique",
      "Les calculs Cv/Kv classiques reposent sur un régime turbulent. Dans les passages de très faible diamètre et à bas nombre de Reynolds, ils peuvent sous-estimer la perte de charge. Cette méthode relie le coefficient publié au régime réel.",
      "Pourquoi la loi quadratique atteint ses limites",
      "Dans les instruments IVD et analytiques, les passages de 0.1 à 0.5 mm peuvent fonctionner en régime laminaire ou transitoire. Le Cv/Kv doit alors être considéré comme une donnée d’étalonnage et non comme une constante universelle.",
      "Correction de Reynolds et géométrie du composant",
      "Le facteur Fᵣ adapte le coefficient aux conditions réelles. Les microcanaux longs sont évalués par les pertes réparties, tandis que les orifices courts nécessitent une correction des pertes singulières.",
    ],
    ["Comment choisir des raccords adaptés à un système microfluidique", "Les raccords influencent l’étanchéité, le montage, la maintenance et la stabilité. Le choix dépend du tube, de la connexion, de la pression, du fluide et de l’espace disponible.", "Rôle des raccords dans un système fluidique", "Les raccords assurent le transfert, l’étanchéité et la liaison structurelle. Les instruments IVD privilégient souvent la stabilité et la régularité, tandis que l’automatisation de laboratoire accorde plus d’importance au montage et à la maintenance.", "Principaux critères de sélection", "Vérifiez les diamètres du tube et la compatibilité de l’interface. Confirmez aussi le type de connexion, la pression, le fluide et les conditions de maintenance."],
    ["Différences entre PEEK, PTFE et PFA dans les systèmes fluidiques", "Ces matériaux haute performance diffèrent par leur résistance mécanique et chimique, leur transparence, leur souplesse et leur transformation.", "Principales différences", "Le PEEK offre résistance mécanique et tenue en pression ; le PTFE présente une excellente inertie chimique ; le PFA associe résistance chimique et transparence partielle.", "La compatibilité dépend des conditions réelles", "Évaluez concentration, température, durée de contact, pression et nettoyage. Pour les mélanges, températures élevées ou immersions longues, effectuez des essais."],
    ["Raccords basse et haute pression : différences essentielles", "Les raccords basse pression privilégient le montage et l’étanchéité ; les modèles haute pression exigent une structure et une stabilité renforcées.", "Des exigences d’application différentes", "La basse pression concerne le transfert de réactifs, le lavage et la manipulation courante. La haute pression intervient souvent dans les instruments analytiques.", "L’apparence ne suffit pas pour un remplacement", "Deux raccords similaires peuvent différer par la pression nominale, le joint, le tube et le montage. Confirmez la plage réelle et l’ensemble de la tuyauterie."],
    ["Tubes rigides ou souples dans les connexions fluidiques", "Le tube rigide convient aux circuits stables ; le tube souple facilite le cheminement, les courbes et l’absorption des vibrations.", "Différences structurelles", "Le tube rigide conserve mieux ses dimensions. Le tube souple se courbe facilement et s’adapte aux espaces réduits.", "Le choix dépend de l’implantation", "Pour un tube rigide, contrôlez coupe, insertion et étanchéité. Pour un tube souple, évaluez élasticité, serrage et vieillissement."],
    ["Causes courantes de défaut d’étanchéité des raccords", "Une fuite peut provenir du tube, du montage, de la coupe, des joints ou de la pression, et pas seulement du raccord.", "Causes typiques", "Diamètre incorrect, coupe irrégulière, insertion insuffisante, filetage desserré, joint endommagé, incompatibilité ou surpression sont des causes fréquentes.", "Dépannage recommandé", "Vérifiez les spécifications, puis l’extrémité du tube, le joint et l’alignement. Confirmez la compatibilité à long terme avec les réactifs corrosifs."],
    ["Paramètres clés pour choisir une micropompe à piston", "Le choix tient compte du volume, de la précision, de la répétabilité, de la pression, de l’interface, de l’entraînement et de la communication.", "Au-delà de la plage de volume", "Ces pompes assurent aspiration, dosage et transfert quantitatif. Après le volume et la précision, examinez pression, fluide, cycle et durée de vie.", "L’intégration système est essentielle", "La pompe doit être compatible avec les vannes, tubes, raccords, capteurs et la commande. Interface, connexion et protocole comptent aussi."],
    ["Rôle des électrovannes dans les systèmes microfluidiques", "Les électrovannes assurent l’ouverture, la fermeture, la commutation et la distribution automatisées du fluide.", "Commande du circuit fluidique", "Elles commandent les réactifs, le lavage, les déchets et la commutation gaz-liquide, avec deux, trois voies ou davantage.", "Critères de sélection", "Confirmez les voies, l’orifice, la pression, le fluide et le joint. Pour un milieu corrosif ou cristallisable, évaluez le corps et la stabilité à long terme."],
    ["Un tableau de compatibilité suffit-il pour la sélection finale ?", "Il aide au présélectionnement, mais la décision finale doit aussi tenir compte de la température, de la concentration, de la pression et du temps de contact.", "Un outil utile de présélection", "Les tableaux permettent d’écarter rapidement les matériaux inadaptés, mais les conditions réelles peuvent inclure des mélanges.", "Confirmer les conditions complexes", "Pour les solvants mélangés, fortes concentrations, immersions longues ou températures élevées, fournissez les détails et réalisez des essais."],
    ["Paramètres clés d’un système fluidique pour instrument IVD", "Un système IVD exige précision, stabilité, propreté, compatibilité et maintenance ; chaque composant influence l’ensemble.", "Plusieurs composants interdépendants", "Pompes, vannes, tubes, raccords, aiguilles et capteurs coopèrent pour l’aspiration, le dosage, le lavage, la réaction et les déchets.", "Paramètres et capacité d’approvisionnement", "Examinez précision, répétabilité, compatibilité, bulles, volume mort, résidus, interfaces et durée de vie. En série, régularité et disponibilité sont essentielles."],
    ["Comprendre pression, débit et compatibilité des matériaux", "Ces trois facteurs fondamentaux doivent être évalués ensemble lors de la conception.", "Trois facteurs indissociables", "La pression définit la plage de travail, le débit influence l’efficacité et la réponse, et la compatibilité détermine la stabilité au contact du fluide.", "Ne pas maximiser un seul paramètre", "Un débit supérieur peut créer des fluctuations et renforcer les exigences sur les joints, les tubes, les pompes et les vannes. Confirmez tous les matériaux mouillés."],
    ["Pourquoi le contexte d’application compte dans la sélection microfluidique", "Un même produit peut se comporter différemment selon l’application. Tenez compte du fluide, de la pression, de la précision, de l’espace et de la maintenance.", "Des exigences propres à chaque application", "L’IVD peut privilégier la stabilité, tandis que l’analyse instrumentale insiste sur la compatibilité et les faibles résidus.", "Des informations complètes améliorent la sélection", "Indiquez le fluide, les plages de pression et de débit, la connexion, l’espace de montage et l’application visée."],
    ["Comment choisir des raccords de remplacement à partir de plans ou d’échantillons", "Le remplacement exige de confirmer l’interface, le joint, le matériau, la pression et les conditions, au-delà des dimensions extérieures.", "Pas seulement une question d’apparence", "Pour la maintenance ou la relocalisation, vérifiez dimensions, filetage, tube, joint, matériaux mouillés et pression.", "Plans, échantillons et conditions sont utiles", "Avec un échantillon, fournissez photos, dimensions, tube et fluide. Avec un plan, indiquez interfaces, tolérances et conditions de montage."],
  ],
  ko: [
    [
      "설계 실무 가이드: 미세유체 저레이놀즈수 조건의 Cv/Kv 보정",
      "일반 Cv/Kv 계산은 난류 저항 영역을 전제로 합니다. 미세 유로와 낮은 레이놀즈수 조건에서는 실제 압력 손실을 낮게 평가할 수 있습니다. 본 자료는 장비 설계와 부품 선정에 적용할 수 있는 보정 방법을 설명합니다.",
      "미세 유로에서 제곱 법칙이 달라지는 이유",
      "IVD 및 분석기기의 0.1～0.5 mm 유로는 층류 또는 천이 영역에서 운전될 수 있습니다. 이 경우 표시된 Cv/Kv를 모든 조건에서 일정한 값으로 적용하면 안 됩니다.",
      "레이놀즈수와 실제 형상을 이용한 보정",
      "Fᵣ를 이용해 운전 조건의 유량계수를 계산합니다. 긴 미세 유로는 분포 마찰로, 짧은 오리피스는 국부 손실을 중심으로 평가해야 합니다.",
    ],
    ["미세유체 시스템에 적합한 피팅 선정 방법", "피팅은 밀봉, 조립, 유지보수 및 장기 안정성에 영향을 줍니다. 튜브, 연결 방식, 압력, 유체 및 설치 공간을 함께 고려해야 합니다.", "유체 시스템에서 피팅의 역할", "피팅은 유체 이송, 밀봉 및 구조 연결을 담당합니다. IVD 장비는 장기 안정성과 일관성을, 실험실 자동화는 조립과 유지보수 편의성을 중시합니다.", "주요 선정 요소", "튜브 내외경과 인터페이스 호환성을 확인하고 경질·연질 튜브, 페룰, 플랜지 또는 나사 연결 방식과 압력, 유체, 유지보수 조건을 검토합니다."],
    ["유체 시스템에서 PEEK, PTFE 및 PFA의 차이", "세 재질은 고성능이지만 기계적 강도, 내화학성, 투명성, 유연성 및 가공 특성이 다릅니다.", "세 재질의 주요 차이", "PEEK는 강도와 내압성이 높고, PTFE는 화학적 불활성과 낮은 표면 에너지가 뛰어나며, PFA는 내화학성과 일정 수준의 투명성을 제공합니다.", "실제 조건에 따른 호환성", "농도, 온도, 접촉 시간, 압력 및 세척 방법을 함께 평가하십시오. 혼합 용매, 고온 또는 장기 침지에는 샘플 시험과 기술 확인이 권장됩니다."],
    ["저압 피팅과 고압 피팅의 주요 차이", "저압 피팅은 조립성과 밀봉 신뢰성을, 고압 피팅은 강한 구조와 밀봉 설계 및 압력 안정성을 중시합니다.", "서로 다른 적용 요구", "저압 피팅은 시약 이송과 세척에, 고압 피팅은 분석 장비나 압력 변동에 민감한 시스템에 주로 사용됩니다.", "외관만으로 대체할 수 없음", "모양이 비슷해도 정격 압력, 밀봉 구조, 적용 튜브 및 설치 방식이 다를 수 있으므로 실제 압력과 전체 튜브 조립체를 확인해야 합니다."],
    ["유체 연결의 경질 튜브와 연질 튜브", "경질 튜브는 안정된 유로에, 연질 튜브는 배치, 굽힘 및 진동 허용이 필요한 구조에 적합합니다.", "구조적 차이", "경질 튜브는 치수 안정성이 높고 변형이 적습니다. 연질 튜브는 잘 휘어 제한된 공간에 적합합니다.", "시스템 배치에 따른 선정", "경질 튜브는 절단, 삽입 깊이와 밀봉을, 연질 튜브는 탄성, 체결력과 장기 노화를 고려합니다."],
    ["피팅 밀봉 불량의 일반적인 원인", "누출은 피팅 자체뿐 아니라 튜브 불일치, 설치, 절단, 밀봉 부품 또는 시스템 압력 때문에 발생할 수 있습니다.", "주요 누출 원인", "튜브 규격 불일치, 불균일한 절단, 삽입 부족, 느슨한 나사, 손상된 씰, 재질 비호환 또는 과압이 흔한 원인입니다.", "권장 점검 절차", "튜브와 피팅 사양을 먼저 확인하고 튜브 끝, 씰 상태와 정렬을 점검합니다. 부식성 시약에는 장기 호환성도 확인합니다."],
    ["마이크로 플런저 펌프 선정의 핵심 파라미터", "토출량, 정확도, 반복성, 압력, 인터페이스, 구동 방식과 통신 프로토콜을 고려해야 합니다.", "용량 범위 이외의 핵심 파라미터", "흡입, 분주와 정량 이송에 사용되므로 용량과 정확도에 이어 압력, 유체, 듀티 사이클과 수명을 평가합니다.", "시스템 단위 매칭의 중요성", "펌프는 밸브, 튜브, 피팅, 센서 및 제어 로직과 맞아야 하며 인터페이스, 연결 방식과 통신 프로토콜도 중요합니다."],
    ["미세유체 시스템에서 솔레노이드 밸브의 역할", "솔레노이드 밸브는 유로의 개폐, 전환과 분배를 제어하는 자동화 핵심 부품입니다.", "유로 제어", "시약 개폐, 세척액 전환, 폐액 배출 및 기액 전환에 사용되며 구조에 따라 2방향, 3방향 이상의 제어를 제공합니다.", "선정 요소", "채널, 오리피스, 압력, 유체와 씰 재질을 확인하십시오. 부식성 유체나 결정화 위험이 있으면 밸브 본체와 장기 안정성을 평가합니다."],
    ["재질 호환성 표를 최종 선정 기준으로 사용할 수 있을까?", "호환성 표는 1차 선별에 유용하지만 온도, 농도, 압력과 접촉 시간도 고려해야 합니다.", "선별에 유용한 호환성 표", "일반적인 경험을 바탕으로 부적합 재질을 빠르게 제외할 수 있지만 실제 적용에는 혼합 유체와 다른 조건이 있을 수 있습니다.", "복잡한 조건은 확인 필요", "혼합 용매, 고농도, 장기 침지 또는 고온 조건에서는 상세 유체 정보와 샘플 시험 후 최종 선정하십시오."],
    ["IVD 장비 유체 시스템 선정의 핵심 파라미터", "IVD 유체 시스템은 정확도, 안정성, 청정도, 재질 호환성과 유지보수성이 필요하며 각 부품이 전체에 영향을 줍니다.", "여러 부품으로 구성되는 유체 시스템", "펌프, 밸브, 튜브, 피팅, 니들과 센서가 함께 흡입, 분주, 세척, 반응 및 폐액 처리를 수행합니다.", "파라미터와 공급 능력", "정확도, 반복성, 호환성, 기포, 데드 볼륨, 잔류, 인터페이스와 수명을 평가합니다. 양산 장비는 일관성과 안정 공급도 중요합니다."],
    ["압력, 유량 및 재질 호환성 이해", "압력, 유량과 재질 호환성은 유체 시스템 설계에서 함께 평가해야 할 세 가지 핵심 요소입니다.", "함께 평가하는 세 요소", "압력은 작동 범위를, 유량은 이송 효율과 응답을, 호환성은 유체 접촉 부품의 장기 안정성을 결정합니다.", "한 파라미터만 극대화하지 않기", "유량이 높으면 압력 변동이 생겨 씰, 튜브, 펌프와 밸브 요구가 높아집니다. 부식성 유체는 모든 접액 재질을 확인합니다."],
    ["미세유체 제품 선정에서 적용 환경이 중요한 이유", "같은 제품도 적용 분야에 따라 성능이 달라질 수 있으므로 유체, 압력, 정확도, 공간과 유지보수를 고려해야 합니다.", "적용 분야별 요구 차이", "IVD는 장기 안정성을, 분석 장비는 재질 호환성과 낮은 잔류를 더 중시할 수 있습니다.", "정보가 많을수록 정확한 선정", "선정 요청 시 유체, 압력과 유량 범위, 연결 방식, 설치 공간 및 목표 적용 분야를 제공하십시오."],
    ["도면 또는 샘플로 대체 피팅을 선정하는 방법", "외형 치수뿐 아니라 인터페이스, 밀봉 구조, 재질, 압력 및 적용 조건을 확인해야 합니다.", "외관만으로 선정하지 않기", "유지보수나 국산화에는 치수, 나사, 튜브 크기, 씰, 접액 재질과 압력을 모두 점검합니다.", "도면, 샘플과 적용 조건 활용", "샘플만 있으면 선명한 사진, 주요 치수, 튜브와 유체 정보를 제공하고 도면이 있으면 인터페이스 치수, 공차와 설치 조건을 포함합니다."],
  ],
  ru: [
    [
      "Инженерная практика: коррекция Cv/Kv в микрофлюидных каналах при низком числе Рейнольдса",
      "Классические расчёты Cv/Kv основаны на турбулентном режиме. В каналах малого диаметра и при низком числе Рейнольдса они могут существенно занижать фактический перепад давления. В статье приведена практическая схема коррекции.",
      "Почему квадратичный закон имеет ограниченную область применения",
      "В диагностическом и аналитическом оборудовании каналы диаметром 0.1～0.5 mm могут работать в ламинарной или переходной области. Паспортный Cv/Kv необходимо связывать с условиями калибровки.",
      "Коррекция по Reynolds и фактической геометрии",
      "Коэффициент Fᵣ адаптирует пропускную способность к рабочему режиму. Для длинных каналов учитывают распределённое трение, а для коротких отверстий — местные потери.",
    ],
    ["Как выбрать фитинги для микрофлюидной системы", "Фитинги влияют на герметичность, сборку, обслуживание и стабильность. Учитывайте трубку, соединение, давление, среду и место монтажа.", "Роль фитингов в гидравлической системе", "Фитинги обеспечивают перенос среды, герметизацию и конструктивное соединение. Для IVD важны стабильность и повторяемость, для лабораторной автоматизации — удобство сборки и обслуживания.", "Основные критерии выбора", "Проверьте диаметры трубки и совместимость интерфейса, способ соединения, давление, рабочую среду и условия обслуживания."],
    ["Различия PEEK, PTFE и PFA в гидравлических системах", "Эти высокоэффективные материалы различаются прочностью, химической стойкостью, прозрачностью, гибкостью и технологичностью.", "Главные различия", "PEEK обладает высокой прочностью и выдерживает давление; PTFE химически инертен; PFA сочетает химическую стойкость с некоторой прозрачностью.", "Совместимость зависит от условий", "Оценивайте концентрацию, температуру, контакт, давление и очистку. Для смесей, высокой температуры и длительного погружения нужны испытания."],
    ["Фитинги низкого и высокого давления: основные различия", "Для низкого давления важны удобство сборки и герметичность, для высокого — усиленная конструкция и стабильность.", "Разные требования к применению", "Низкое давление характерно для подачи реагентов и промывки, высокое — для аналитических приборов и чувствительных к колебаниям систем.", "Внешнего сходства недостаточно", "Похожие фитинги могут иметь разное номинальное давление, уплотнение, трубку и монтаж. Проверяйте реальный диапазон и весь трубопровод."],
    ["Жёсткие и гибкие трубки в гидравлических соединениях", "Жёсткие трубки подходят для стабильных трасс, гибкие — для изгибов, прокладки и компенсации вибрации.", "Конструктивные различия", "Жёсткая трубка лучше сохраняет размеры, гибкая удобнее в ограниченном пространстве.", "Выбор зависит от компоновки", "Для жёсткой трубки важны качество среза, глубина установки и уплотнение; для гибкой — эластичность, усилие зажима и старение."],
    ["Типичные причины нарушения герметичности фитингов", "Утечка может быть связана с трубкой, монтажом, срезом, уплотнением или давлением, а не только с фитингом.", "Причины утечек", "Несоответствие размера, неровный срез, малая глубина, слабая резьба, повреждённое уплотнение, несовместимость и превышение давления — частые причины.", "Рекомендуемая диагностика", "Проверьте спецификации, конец трубки, уплотнение и соосность. Для агрессивных реагентов подтвердите долгосрочную совместимость."],
    ["Ключевые параметры выбора микроплунжерного насоса", "Учитывайте объём, точность, повторяемость, давление, интерфейс, привод и протокол связи.", "Параметры помимо диапазона объёма", "Насосы выполняют аспирацию, дозирование и количественную подачу. После объёма и точности оцените давление, среду, цикл и ресурс.", "Важно системное согласование", "Насос должен соответствовать клапанам, трубкам, фитингам, датчикам и логике управления. Важны также интерфейс, соединение и связь."],
    ["Роль электромагнитных клапанов в микрофлюидных системах", "Они управляют открытием, закрытием, переключением и распределением потока в автоматизированной системе.", "Управление гидравлическим контуром", "Клапаны управляют реагентами, промывкой, сливом и переключением газа и жидкости и могут иметь два, три и более каналов.", "Критерии выбора", "Проверьте каналы, отверстие, давление, среду и материал уплотнения. Для агрессивных и кристаллизующихся сред оцените корпус и стабильность."],
    ["Можно ли считать таблицу совместимости окончательным основанием выбора?", "Таблица полезна для первичного отбора, но нужно учитывать температуру, концентрацию, давление и время контакта.", "Таблицы помогают при отборе", "Они позволяют исключить явно неподходящие материалы, однако реальные условия могут включать смеси.", "Сложные условия требуют проверки", "Для смесей, высокой концентрации, длительного погружения и высокой температуры предоставьте подробности и проведите испытания."],
    ["Ключевые параметры гидравлической системы прибора IVD", "Для IVD нужны точность, стабильность, чистота, совместимость и ремонтопригодность; каждый компонент влияет на систему.", "Система состоит из многих компонентов", "Насосы, клапаны, трубки, фитинги, иглы и датчики совместно обеспечивают аспирацию, дозирование, промывку, реакцию и слив.", "Параметры и поставки", "Оценивайте точность, повторяемость, совместимость, пузырьки, мёртвый объём, остатки, интерфейсы и ресурс. Для серийного выпуска важны стабильные поставки."],
    ["Давление, расход и совместимость материалов", "Эти три ключевых фактора проектирования следует оценивать совместно.", "Три взаимосвязанных фактора", "Давление определяет рабочий диапазон, расход — эффективность и отклик, совместимость — стабильность деталей при контакте со средой.", "Не нужно максимизировать один параметр", "Высокий расход может вызвать колебания и повысить требования к уплотнениям, трубкам, насосам и клапанам. Проверяйте все смачиваемые материалы."],
    ["Почему условия применения важны при выборе микрофлюидной продукции", "Один продукт ведёт себя по-разному в разных задачах. Учитывайте среду, давление, точность, место и обслуживание.", "Разные применения — разные требования", "Для IVD важна долговременная стабильность, для аналитических приборов — совместимость и малый остаточный объём.", "Полная информация повышает точность выбора", "Укажите среду, диапазоны давления и расхода, способ соединения, место монтажа и назначение."],
    ["Как подобрать замену фитинга по чертежу или образцу", "Помимо внешних размеров нужно подтвердить интерфейс, уплотнение, материал, давление и условия применения.", "Внешнего вида недостаточно", "При обслуживании или локализации проверяйте размеры, резьбу, трубку, уплотнение, смачиваемые материалы и давление.", "Полезны чертежи, образцы и условия", "Для образца приложите фотографии, размеры, данные трубки и среды; для чертежа — интерфейсы, допуски и условия монтажа."],
  ],
};

export function localizeTechnicalArticles(
  locale: ForeignLocale,
  base: TechnicalArticlesSourcePageData,
): TechnicalArticlesSourcePageData {
  const copy = pageTranslations[locale];
  const translations = articleTranslations[locale];

  return {
    ...base,
    locale,
    hero: { ...base.hero, title: copy.heroTitle, description: copy.heroDescription },
    breadcrumbs: [
      { label: copy.home, href: `/${locale}` },
      { label: copy.resources, href: `/${locale}/resources` },
      { label: copy.current },
    ],
    search: { placeholder: copy.search },
    sectionTitle: copy.sectionTitle,
    articles: base.articles.map((article, index) => {
      const translation = translations[index];
      if (!translation) return article;
      return {
        ...article,
        title: translation[0],
        summary: translation[1],
        content: [
          { title: translation[2], content: translation[3] },
          { title: translation[4], content: translation[5] },
        ],
        seoTitle: translation[0],
        seoDescription: translation[1],
      };
    }),
    bottomBanner: {
      title: copy.bannerTitle,
      description: copy.bannerDescription,
      actions: [{ label: copy.contact, href: `/${locale}/contact` }],
    },
  };
}
