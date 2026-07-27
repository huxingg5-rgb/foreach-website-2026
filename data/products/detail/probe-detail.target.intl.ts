import type { HardTubeTargetLocale } from "./hard-tube-fitting-detail.intl";

type DetailRecord = Record<string, any>;
type ProbeSlug =
  | "sampling-probes"
  | "piercing-probes"
  | "wash-probes"
  | "stirring-paddles";

type ProbeCopy = {
  title: string;
  description: string;
  specsTitle: string;
  commonApplications: string[];
  advantages: string[];
  specs: Array<[label: string, value: string]>;
};

const PROBE_COPY: Record<
  HardTubeTargetLocale,
  Record<ProbeSlug, ProbeCopy>
> = {
  es: {
    "sampling-probes": {
      title: "Serie de agujas de muestreo",
      description:
        "La serie de agujas de muestreo se utiliza para aspirar reactivos y muestras, dispensar líquidos y realizar transferencias cuantitativas en analizadores automatizados. Puede personalizarse a partir de planos según la estructura del instrumento, el tipo de líquido, el volumen objetivo y el método de detección de nivel. El diámetro exterior e interior, la longitud, la punta, los orificios laterales, la dirección de doblado y el montaje se confirman para cada proyecto; también pueden evaluarse el pulido interior, el recubrimiento exterior y la adaptación a detección capacitiva de nivel para reducir la adherencia, los residuos y la contaminación cruzada.",
      specsTitle: "Datos que deben confirmarse",
      commonApplications: [
        "Aspiración de reactivos",
        "Aspiración de muestras",
        "Dispensación de líquidos",
        "Transferencia cuantitativa",
        "Adaptación a cLLD",
        "Circuitos de bajo residuo",
      ],
      advantages: [
        "Diámetro exterior, diámetro interior, longitud total y longitud útil personalizables según el instrumento",
        "Compatible con punta biselada, punta plana, abertura en V, orificios laterales y estructuras dobladas",
        "El pulido interior puede reducir la adherencia, los residuos y la contaminación cruzada",
        "El recubrimiento exterior y la detección capacitiva de nivel se confirman según el proyecto",
        "Adecuada para agujas de reactivos, agujas de muestras y conjuntos de manipulación automatizada de líquidos",
      ],
      specs: [
        ["Planos o muestras", "Proporcione planos 2D, archivos 3D, muestras físicas o fotografías del espacio de instalación del equipo"],
        ["Estructura de aspiración", "Deben confirmarse el diámetro exterior, el diámetro interior, la longitud total, la longitud útil, la dirección de doblado y la estructura del extremo de montaje"],
        ["Punta y orificios", "Deben confirmarse la punta biselada, la punta plana, la abertura en V, la posición y el diámetro de los orificios laterales y la dirección de entrada y salida del líquido"],
        ["Proceso de bajo residuo", "El pulido interior, el recubrimiento exterior y el tratamiento antiadherente deben evaluarse según el tipo de líquido, el volumen objetivo y el método de limpieza"],
        ["Adaptación a detección de nivel", "Si se requiere cLLD o detección capacitiva de nivel, deben confirmarse la estructura de la aguja, la conexión del cable y el método de detección del instrumento"],
        ["Condiciones de uso", "Indique el tipo de líquido, la velocidad de aspiración, el volumen dispensado, el método de limpieza y los requisitos contra la contaminación cruzada"],
      ],
    },
    "piercing-probes": {
      title: "Serie de agujas de perforación",
      description:
        "La serie de agujas de perforación se utiliza para atravesar películas, tapones, depósitos de reactivos, depósitos de muestras y consumibles cerrados en instrumentos automatizados. Puede personalizarse según el objeto y la profundidad de perforación, el recorrido del líquido y las necesidades de venteo. La forma y la resistencia de la punta, la dirección del venteo, la posición de los orificios laterales, la geometría doblada y el montaje se confirman según el espacio disponible del equipo.",
      specsTitle: "Datos que deben confirmarse",
      commonApplications: [
        "Perforación de películas",
        "Perforación de tapones",
        "Extracción desde depósitos de reactivos",
        "Extracción desde depósitos de muestras",
        "Venteo auxiliar",
        "Circuitos para consumibles cerrados",
      ],
      advantages: [
        "Punta personalizable según la película, el tapón o la estructura del consumible",
        "Dirección de venteo, posición de orificios laterales y recorrido del líquido personalizables",
        "Estructura confirmada según la profundidad y dirección de perforación y el espacio de instalación",
        "Adecuada para extraer líquido de depósitos cerrados de reactivos, muestras y otros consumibles",
        "Puede integrar estructuras dobladas, soldadas y de montaje para adaptarse al equipo",
      ],
      specs: [
        ["Planos o muestras", "Proporcione planos del consumible, muestras de película o tapón, un esquema de la posición de perforación o el espacio de instalación del equipo"],
        ["Objeto de perforación", "Deben confirmarse el material, el espesor y la resistencia estructural de la película, el tapón, el depósito de reactivos, el depósito de muestras o el consumible cerrado"],
        ["Estructura de la punta", "La punta, la dirección del filo, el ángulo, la resistencia y el tratamiento superficial deben confirmarse según la resistencia a la perforación"],
        ["Estructura de venteo", "Si se requieren orificios, ranuras o aberturas laterales de venteo, deben confirmarse los recorridos de gas y líquido, la dirección de venteo y la secuencia de extracción"],
        ["Montaje y movimiento", "Deben confirmarse la profundidad y dirección de perforación, la posición objetivo de extracción, la estructura de montaje y el espacio interior del equipo"],
        ["Viabilidad del proceso", "Los orificios laterales, el doblado, la soldadura, el pulido y el recubrimiento deben evaluarse junto con las dimensiones de la aguja, la punta y la estabilidad de perforación"],
      ],
    },
    "wash-probes": {
      title: "Serie de agujas de lavado",
      description:
        "La serie de agujas de lavado se utiliza para lavar la pared exterior, enjuagar el interior, evacuar residuos líquidos y tratar líquido remanente en analizadores automatizados. Puede personalizarse según la estructura de la estación de lavado, los recorridos del líquido de limpieza y de desecho y la dirección de los orificios de pulverización. Hay configuraciones de uno, dos o varios cabezales, con orificios laterales, dobleces y diferentes recubrimientos.",
      specsTitle: "Datos que deben confirmarse",
      commonApplications: [
        "Lavado de la pared exterior de agujas",
        "Enjuague interior de agujas",
        "Extracción de residuos líquidos",
        "Tratamiento de líquido remanente",
        "Integración en estaciones de lavado",
        "Reducción del carry-over",
      ],
      advantages: [
        "Estructuras de uno, dos o varios cabezales personalizables según el espacio de la estación de lavado",
        "Compatible con pulverización lateral, canales de evacuación y recorridos de lavado múltiples",
        "Adecuada para integrar agujas de muestras, agujas de reactivos y circuitos de estaciones de lavado",
        "La orientación de los orificios se confirma según los recorridos del líquido de limpieza y de desecho",
        "Los recubrimientos pueden reducir la adherencia y el riesgo de contaminación cruzada",
      ],
      specs: [
        ["Planos o muestras", "Proporcione el plano de la estación de lavado, el espacio de montaje de la aguja y una descripción de los recorridos del líquido de limpieza y de desecho"],
        ["Objeto de limpieza", "Deben confirmarse las necesidades de limpieza de agujas de muestras o reactivos, lavado exterior, enjuague interior o evacuación de residuos"],
        ["Estructura de pulverización", "El número, diámetro, posición y dirección de los orificios y la zona objetivo deben confirmarse según la secuencia de lavado"],
        ["Estructura de evacuación", "La salida de residuos, el recorrido de recuperación, la dirección de extracción y la posición del depósito deben confirmarse con la estructura de la estación"],
        ["Formato de la aguja", "El cabezal único, doble o múltiple, la estructura doblada y el extremo de montaje se personalizan según el espacio de la estación de lavado"],
        ["Proceso antiresiduos", "La soldadura, el pulido, el recubrimiento y el tratamiento antiadherente deben confirmarse según las propiedades de los líquidos y la vida útil requerida"],
      ],
    },
    "stirring-paddles": {
      title: "Serie de paletas mezcladoras",
      description:
        "La serie de paletas mezcladoras se utiliza para homogeneizar muestras, reactivos, diluyentes y líquidos de reacción en analizadores automatizados. Puede personalizarse a partir de planos según la geometría del recipiente, el volumen objetivo, el espacio de agitación, el rango de velocidad y el resultado de mezcla. La pala puede ser plana, helicoidal o con aletas a 90°, y el recubrimiento, la soldadura, la coaxialidad y el extremo de montaje se confirman para cada proyecto.",
      specsTitle: "Datos que deben confirmarse",
      commonApplications: [
        "Mezcla de muestras",
        "Mezcla de reactivos",
        "Mezcla de líquidos de reacción",
        "Agitación dentro del recipiente",
        "Recubrimiento antiadherente",
        "Analizadores automatizados",
      ],
      advantages: [
        "Compatible con palas planas, helicoidales y con aletas a 90°",
        "Personalizable según el recipiente, el volumen de líquido y el rango de velocidad",
        "Permite confirmar coaxialidad, extremo de montaje y método de soldadura",
        "Puede incorporar recubrimiento superficial para reducir la adherencia y mejorar la limpieza",
        "Adecuada cuando se requieren eficiencia de mezcla, control de salpicaduras y bajo residuo",
      ],
      specs: [
        ["Planos o muestras", "Proporcione la geometría del recipiente, el espacio de agitación, las dimensiones del extremo de montaje, una muestra existente o los requisitos de ensayo de mezcla"],
        ["Recipiente de reacción", "Deben confirmarse las dimensiones y la forma del fondo, la altura del líquido, el espacio disponible de agitación y el riesgo de interferencia mecánica"],
        ["Estructura de la pala", "La pala plana, helicoidal, con aletas a 90° u otra geometría debe confirmarse según el resultado de mezcla y el estado del líquido"],
        ["Condiciones de mezcla", "Indique el volumen objetivo, el rango de velocidad, el tiempo de mezcla y si se permiten burbujas, salpicaduras o sedimentos residuales"],
        ["Estructura de montaje", "Deben confirmarse el formato del extremo de montaje, la coaxialidad, la conexión, la dirección de movimiento y la estructura de accionamiento"],
        ["Tratamiento superficial", "El recubrimiento, el color, la soldadura, los requisitos antiadherentes y el método de limpieza deben confirmarse según el medio y la vida útil"],
      ],
    },
  },
  fr: {
    "sampling-probes": {
      title: "Série d’aiguilles de prélèvement",
      description:
        "La série d’aiguilles de prélèvement est destinée à l’aspiration de réactifs et d’échantillons, à la distribution de liquides et au transfert quantitatif dans les analyseurs automatisés. Elle peut être réalisée sur plan selon l’architecture de l’instrument, le type de liquide, le volume cible et le mode de détection de niveau. Le diamètre extérieur et intérieur, la longueur, la pointe, les orifices latéraux, le sens de cintrage et le montage sont définis pour chaque projet; le polissage intérieur, le revêtement extérieur et l’adaptation à la détection capacitive peuvent aussi être évalués afin de réduire l’adhérence, les résidus et la contamination croisée.",
      specsTitle: "Éléments à confirmer",
      commonApplications: ["Aspiration de réactifs", "Aspiration d’échantillons", "Distribution de liquides", "Transfert quantitatif", "Adaptation cLLD", "Circuits à faible résidu"],
      advantages: [
        "Diamètre extérieur, diamètre intérieur, longueur totale et longueur utile adaptés à l’instrument",
        "Pointes biseautées ou plates, ouverture en V, orifices latéraux et formes cintrées disponibles",
        "Le polissage intérieur peut réduire l’adhérence, les résidus et la contamination croisée",
        "Le revêtement extérieur et la détection capacitive de niveau sont définis selon le projet",
        "Convient aux aiguilles de réactifs, d’échantillons et aux ensembles automatisés de manipulation de liquides",
      ],
      specs: [
        ["Plans ou échantillons", "Fournir des plans 2D, des fichiers 3D, des échantillons physiques ou des photos de l’espace d’installation de l’équipement"],
        ["Structure d’aspiration", "Confirmer le diamètre extérieur, le diamètre intérieur, la longueur totale, la longueur utile, le sens de cintrage et la structure de l’extrémité de montage"],
        ["Pointe et orifices", "Confirmer la pointe biseautée ou plate, l’ouverture en V, la position et le diamètre des orifices latéraux ainsi que le sens de circulation du liquide"],
        ["Procédé à faible résidu", "Évaluer le polissage intérieur, le revêtement extérieur et le traitement anti-adhérence selon le liquide, le volume cible et le mode de nettoyage"],
        ["Adaptation à la détection de niveau", "Si une détection cLLD ou capacitive est requise, confirmer la structure de l’aiguille, le raccordement du câble et le mode de détection de l’instrument"],
        ["Conditions d’utilisation", "Indiquer le type de liquide, la vitesse d’aspiration, le volume distribué, le mode de nettoyage et les exigences de prévention de la contamination croisée"],
      ],
    },
    "piercing-probes": {
      title: "Série d’aiguilles de perçage",
      description:
        "La série d’aiguilles de perçage sert à traverser des films, bouchons, réservoirs de réactifs ou d’échantillons et consommables fermés dans les instruments automatisés. Elle peut être personnalisée selon l’objet et la profondeur de perçage, le trajet du liquide et les besoins d’évent. La forme et la résistance de la pointe, l’orientation de l’évent, la position des orifices latéraux, le cintrage et le montage sont définis en fonction de l’espace disponible.",
      specsTitle: "Éléments à confirmer",
      commonApplications: ["Perçage de films", "Perçage de bouchons", "Prélèvement dans un réservoir de réactifs", "Prélèvement dans un réservoir d’échantillons", "Évent auxiliaire", "Circuits pour consommables fermés"],
      advantages: [
        "Pointe adaptée au film, au bouchon ou à la structure du consommable",
        "Orientation de l’évent, position des orifices latéraux et trajet du liquide personnalisables",
        "Structure définie selon la profondeur et le sens de perçage ainsi que l’espace de montage",
        "Convient au prélèvement dans des réservoirs fermés de réactifs, d’échantillons et autres consommables",
        "Peut intégrer cintrage, soudage et structure de montage pour l’adaptation à l’équipement",
      ],
      specs: [
        ["Plans ou échantillons", "Fournir les plans du consommable, des échantillons de film ou de bouchon, un schéma de la position de perçage ou l’espace d’installation"],
        ["Objet à percer", "Confirmer le matériau, l’épaisseur et la résistance structurelle du film, du bouchon, du réservoir ou du consommable fermé"],
        ["Structure de la pointe", "Définir la pointe, l’orientation du tranchant, l’angle, la résistance et le traitement de surface selon l’effort de perçage"],
        ["Structure d’évent", "Si des trous, rainures ou orifices latéraux sont requis, confirmer les trajets gaz-liquide, le sens d’évent et le mouvement de prélèvement"],
        ["Montage et mouvement", "Confirmer la profondeur et le sens de perçage, la position cible, la structure de montage et l’espace intérieur de l’équipement"],
        ["Faisabilité du procédé", "Évaluer les orifices latéraux, le cintrage, le soudage, le polissage et le revêtement avec les dimensions de l’aiguille, la pointe et la stabilité de perçage"],
      ],
    },
    "wash-probes": {
      title: "Série d’aiguilles de lavage",
      description:
        "La série d’aiguilles de lavage sert au nettoyage de la paroi extérieure, au rinçage intérieur, à l’évacuation des effluents et au traitement des liquides résiduels dans les analyseurs automatisés. Elle peut être personnalisée selon la station de lavage, les trajets du liquide de nettoyage et des effluents et l’orientation des orifices de pulvérisation. Des configurations à une, deux ou plusieurs têtes, avec orifices latéraux, cintrages et différents revêtements, sont disponibles.",
      specsTitle: "Éléments à confirmer",
      commonApplications: ["Lavage de la paroi extérieure", "Rinçage intérieur des aiguilles", "Aspiration des effluents", "Traitement des liquides résiduels", "Intégration dans une station de lavage", "Réduction du carry-over"],
      advantages: [
        "Structures à une, deux ou plusieurs têtes adaptées à l’espace de la station de lavage",
        "Pulvérisation latérale, canaux d’évacuation et circuits de lavage multiples disponibles",
        "Convient à l’intégration des aiguilles d’échantillons, de réactifs et des stations de lavage",
        "Orientation des orifices définie selon les trajets du liquide de lavage et des effluents",
        "Des revêtements peuvent réduire l’adhérence et le risque de contamination croisée",
      ],
      specs: [
        ["Plans ou échantillons", "Fournir le plan de la station de lavage, l’espace de montage de l’aiguille et la description des trajets du liquide de lavage et des effluents"],
        ["Élément à nettoyer", "Confirmer les besoins de lavage des aiguilles d’échantillons ou de réactifs, de la paroi extérieure, de l’intérieur ou d’évacuation des effluents"],
        ["Structure de pulvérisation", "Définir le nombre, le diamètre, la position et l’orientation des orifices ainsi que la zone cible selon la séquence de lavage"],
        ["Structure d’évacuation", "Définir la sortie, le trajet de récupération, le sens d’aspiration et la position du bac d’effluents avec la structure de la station"],
        ["Forme de l’aiguille", "La tête simple, double ou multiple, le cintrage et l’extrémité de montage sont adaptés à l’espace de la station de lavage"],
        ["Procédé anti-résidu", "Le soudage, le polissage, le revêtement et le traitement anti-adhérence sont définis selon les liquides et la durée de vie requise"],
      ],
    },
    "stirring-paddles": {
      title: "Série de palettes de mélange",
      description:
        "La série de palettes de mélange est destinée à l’homogénéisation d’échantillons, de réactifs, de diluants et de liquides réactionnels dans les analyseurs automatisés. Elle peut être réalisée sur plan selon la géométrie du récipient, le volume cible, l’espace d’agitation, la plage de vitesse et le résultat de mélange. La palette peut être plate, hélicoïdale ou munie d’ailettes à 90°; le revêtement, le soudage, la coaxialité et l’extrémité de montage sont définis pour chaque projet.",
      specsTitle: "Éléments à confirmer",
      commonApplications: ["Mélange d’échantillons", "Mélange de réactifs", "Mélange de liquides réactionnels", "Agitation dans le récipient", "Revêtement anti-adhérence", "Analyseurs automatisés"],
      advantages: [
        "Palettes plates, hélicoïdales et à ailettes à 90° disponibles",
        "Adaptation aux dimensions du récipient, au volume et à la plage de vitesse",
        "Coaxialité, extrémité de montage et procédé de soudage définissables",
        "Revêtement de surface possible pour réduire l’adhérence et améliorer le nettoyage",
        "Convient aux applications exigeant efficacité de mélange, maîtrise des projections et faible résidu",
      ],
      specs: [
        ["Plans ou échantillons", "Fournir la géométrie du récipient, l’espace d’agitation, les dimensions de l’extrémité de montage, un échantillon existant ou les exigences d’essai de mélange"],
        ["Récipient de réaction", "Confirmer les dimensions et la forme du fond, la hauteur du liquide, l’espace d’agitation disponible et le risque d’interférence mécanique"],
        ["Structure de la palette", "La palette plate, hélicoïdale, à ailettes à 90° ou d’une autre forme doit être définie selon le résultat de mélange et l’état du liquide"],
        ["Conditions de mélange", "Indiquer le volume cible, la plage de vitesse, le temps de mélange et si les bulles, projections ou dépôts résiduels sont admis"],
        ["Structure de montage", "Confirmer la forme de l’extrémité, la coaxialité, le raccordement, le sens de mouvement et la structure d’entraînement"],
        ["Traitement de surface", "Définir le revêtement, la couleur, le soudage, les exigences anti-adhérence et le nettoyage selon le milieu et la durée de vie"],
      ],
    },
  },
  ko: {
    "sampling-probes": {
      title: "샘플링 프로브 시리즈",
      description:
        "샘플링 프로브 시리즈는 자동 분석 장비에서 시약 및 검체 흡입, 액체 분주와 정량 이송에 사용됩니다. 장비 구조, 액체 종류, 목표 용량과 액면 감지 방식에 맞춰 도면 기반으로 제작할 수 있습니다. 외경, 내경, 길이, 팁 형상, 측면 홀, 굽힘 방향과 장착 구조를 프로젝트별로 확인하며, 내벽 연마, 외벽 코팅과 정전용량식 액면 감지 적용을 통해 액적 부착, 잔류와 교차 오염 위험을 줄일 수 있습니다.",
      specsTitle: "맞춤 제작 확인 항목",
      commonApplications: ["시약 흡입", "검체 흡입", "액체 분주", "정량 이송", "cLLD 적용", "저잔류 유로"],
      advantages: [
        "장비 구조에 맞춰 외경, 내경, 전체 길이와 유효 길이 맞춤 제작",
        "뾰족형, 평형, V형 개구, 측면 홀과 굽힘 구조 지원",
        "내벽 연마를 통해 액적 부착, 잔류와 교차 오염 위험 감소",
        "프로젝트 요구에 따라 외벽 코팅과 정전용량식 액면 감지 적용 확인",
        "시약 프로브, 검체 프로브와 자동 액체 처리용 프로브 어셈블리에 적합",
      ],
      specs: [
        ["도면 또는 샘플", "2D 도면, 3D 파일, 실물 샘플 또는 장비 설치 공간 사진을 제공해 주십시오"],
        ["흡입 구조", "외경, 내경, 전체 길이, 유효 길이, 굽힘 방향과 장착부 구조를 확인해야 합니다"],
        ["팁 및 홀 위치", "뾰족형, 평형, V형 개구, 측면 홀 위치와 직경, 액체 유입·배출 방향을 확인해야 합니다"],
        ["저잔류 공정", "내벽 연마, 외벽 코팅과 액적 부착 방지 처리는 액체 종류, 목표 용량과 세척 방식에 따라 평가해야 합니다"],
        ["액면 감지 적용", "cLLD 또는 정전용량식 액면 감지가 필요한 경우 프로브 구조, 케이블 연결과 장비 감지 방식을 확인해야 합니다"],
        ["사용 조건", "액체 종류, 흡입 속도, 분주 용량, 세척 방식과 교차 오염 방지 요구 사항을 제공해 주십시오"],
      ],
    },
    "piercing-probes": {
      title: "피어싱 프로브 시리즈",
      description:
        "피어싱 프로브 시리즈는 자동화 장비에서 필름, 마개, 시약 저장부, 검체 저장부와 밀폐형 소모품을 관통해 액체를 취하는 용도로 사용됩니다. 관통 대상과 깊이, 액체 경로와 벤트 요구에 맞춰 제작할 수 있습니다. 팁 형상과 강도, 벤트 방향, 측면 홀 위치, 굽힘 구조와 장착 방식은 장비 내부 공간에 따라 확인합니다.",
      specsTitle: "맞춤 제작 확인 항목",
      commonApplications: ["필름 관통", "마개 관통", "시약 저장부 취액", "검체 저장부 취액", "보조 벤트", "밀폐형 소모품 유로"],
      advantages: [
        "필름, 마개와 소모품 구조에 맞춘 팁 형상 제작",
        "벤트 방향, 측면 홀 위치와 액체 경로 맞춤 설계",
        "관통 깊이, 이동 방향과 설치 공간에 따른 구조 확인",
        "밀폐형 시약·검체 저장부와 소모품 취액에 적합",
        "굽힘, 용접과 장착부 구조를 결합해 장비에 적용 가능",
      ],
      specs: [
        ["도면 또는 샘플", "소모품 도면, 필름 또는 마개 샘플, 관통 위치도나 장비 설치 공간 정보를 제공해 주십시오"],
        ["관통 대상", "필름, 마개, 시약 저장부, 검체 저장부 또는 밀폐형 소모품의 재질, 두께와 구조 강도를 확인해야 합니다"],
        ["팁 구조", "관통 팁, 날 방향, 팁 각도와 강도, 표면 처리는 관통 저항에 따라 확인해야 합니다"],
        ["벤트 구조", "벤트 홀, 슬롯 또는 측면 홀이 필요한 경우 기체·액체 경로, 벤트 방향과 취액 동작을 확인해야 합니다"],
        ["장착 및 동작", "관통 깊이와 방향, 목표 취액 위치, 장착부 구조와 장비 내부 공간을 확인해야 합니다"],
        ["공정 타당성", "측면 홀, 굽힘, 용접, 연마와 도금은 프로브 치수, 팁 구조와 관통 안정성을 함께 평가해야 합니다"],
      ],
    },
    "wash-probes": {
      title: "세척 프로브 시리즈",
      description:
        "세척 프로브 시리즈는 자동 분석 장비에서 프로브 외벽 세척, 내벽 플러싱, 폐액 배출과 잔류액 처리에 사용됩니다. 세척 스테이션 구조, 세척액과 폐액 경로, 분사 홀 방향에 맞춰 제작할 수 있습니다. 단일 헤드, 이중 헤드, 다중 헤드, 측면 홀, 굽힘과 다양한 코팅 구조를 지원합니다.",
      specsTitle: "맞춤 제작 확인 항목",
      commonApplications: ["프로브 외벽 세척", "프로브 내벽 플러싱", "폐액 흡입·배출", "잔류액 처리", "세척 스테이션 통합", "carry-over 감소"],
      advantages: [
        "세척 스테이션 공간에 맞춘 단일, 이중 및 다중 헤드 구조",
        "측면 분사, 폐액 채널과 다중 경로 세척 구조 지원",
        "검체·시약 프로브와 세척 스테이션 유로 통합에 적합",
        "세척액과 폐액 경로에 따라 홀 방향 확인",
        "코팅 처리를 통해 액적 부착과 교차 오염 위험 감소",
      ],
      specs: [
        ["도면 또는 샘플", "세척 스테이션 구조도, 프로브 장착 공간, 세척액 경로와 폐액 경로 설명을 제공해 주십시오"],
        ["세척 대상", "검체 프로브, 시약 프로브, 외벽 세척, 내벽 플러싱 또는 폐액 배출 요구를 확인해야 합니다"],
        ["분사 홀 구조", "측면 홀 수량, 직경, 위치, 분사 방향과 목표 세척 영역은 세척 동작에 맞춰 확인해야 합니다"],
        ["폐액 구조", "폐액 출구, 잔류액 회수 경로, 흡입·배출 방향과 폐액조 위치는 세척 스테이션 구조와 함께 확인해야 합니다"],
        ["프로브 형식", "단일, 이중 또는 다중 헤드, 굽힘 구조와 장착부는 세척 스테이션 공간에 맞춰 제작합니다"],
        ["저잔류 공정", "용접, 연마, 코팅과 액적 부착 방지 처리는 세척액·폐액 특성과 수명 요구에 맞춰 확인해야 합니다"],
      ],
    },
    "stirring-paddles": {
      title: "혼합 패들 시리즈",
      description:
        "혼합 패들 시리즈는 자동 분석 장비에서 검체, 시약, 희석액과 반응액을 균일하게 혼합하는 데 사용됩니다. 반응 용기 구조, 목표 액량, 교반 공간, 회전 속도 범위와 혼합 성능에 맞춰 도면 기반으로 제작할 수 있습니다. 평판형, 나선형, 90도 블레이드 등의 구조를 지원하며 표면 코팅, 용접 방식, 동축도와 장착부 구조를 프로젝트별로 확인합니다.",
      specsTitle: "맞춤 제작 확인 항목",
      commonApplications: ["검체 혼합", "시약 혼합", "반응액 혼합", "용기 내 교반", "액적 부착 방지 코팅", "자동 분석 장비"],
      advantages: [
        "평판형, 나선형과 90도 블레이드 구조 지원",
        "반응 용기 치수, 액량과 회전 속도 범위에 맞춘 제작",
        "동축도, 장착부 구조와 용접 방식 확인 가능",
        "표면 코팅을 통해 액적 부착을 줄이고 세척 성능 개선",
        "혼합 효율, 비산 제어와 액체 잔류 관리가 필요한 장비에 적합",
      ],
      specs: [
        ["도면 또는 샘플", "반응 용기 구조, 교반 공간, 장착부 치수, 기존 샘플 또는 혼합 시험 요구 사항을 제공해 주십시오"],
        ["반응 용기", "반응 용기 치수, 바닥 형상, 액면 높이, 사용 가능한 교반 공간과 기계적 간섭 위험을 확인해야 합니다"],
        ["패들 구조", "평판형, 나선형, 90도 블레이드 또는 기타 형상은 혼합 결과와 액체 상태에 따라 확인해야 합니다"],
        ["혼합 조건", "목표 액량, 회전 속도 범위, 혼합 시간과 기포, 비산 또는 침전 잔류 허용 여부를 제공해 주십시오"],
        ["장착 구조", "장착부 형식, 동축도 요구, 연결 방식, 이동 방향과 구동 구조를 확인해야 합니다"],
        ["표면 처리", "코팅, 색상, 용접 방식, 액적 부착 방지 요구와 세척 방식은 매질과 수명 요구에 따라 확인해야 합니다"],
      ],
    },
  },
  ru: {
    "sampling-probes": {
      title: "Серия пробоотборных игл",
      description:
        "Серия пробоотборных игл предназначена для аспирации реагентов и образцов, дозирования жидкостей и количественного переноса в автоматических анализаторах. Изделие можно изготовить по чертежу с учётом конструкции прибора, типа жидкости, целевого объёма и способа определения уровня. Наружный и внутренний диаметры, длина, форма наконечника, боковые отверстия, направление изгиба и монтаж согласуются для каждого проекта; также можно предусмотреть полировку внутренней поверхности, наружное покрытие и ёмкостное определение уровня для снижения налипания, остатков и перекрёстного загрязнения.",
      specsTitle: "Параметры для согласования",
      commonApplications: ["Аспирация реагентов", "Аспирация образцов", "Дозирование жидкостей", "Количественный перенос", "Поддержка cLLD", "Контуры с малым остаточным объёмом"],
      advantages: [
        "Наружный и внутренний диаметры, общая и рабочая длина по конструкции прибора",
        "Заострённый, плоский или V-образный наконечник, боковые отверстия и изогнутые формы",
        "Полировка внутренней поверхности для снижения налипания, остатков и перекрёстного загрязнения",
        "Наружное покрытие и ёмкостное определение уровня согласуются для проекта",
        "Подходит для игл реагентов, образцов и автоматических узлов обработки жидкостей",
      ],
      specs: [
        ["Чертежи или образцы", "Предоставьте чертежи 2D, файлы 3D, физические образцы или фотографии монтажного пространства оборудования"],
        ["Аспирационная часть", "Необходимо согласовать наружный и внутренний диаметры, общую и рабочую длину, направление изгиба и конструкцию монтажного конца"],
        ["Наконечник и отверстия", "Необходимо согласовать заострённый, плоский или V-образный наконечник, положение и диаметр боковых отверстий и направление потока жидкости"],
        ["Технология малого остатка", "Полировка внутренней поверхности, наружное покрытие и антиадгезионная обработка оцениваются по типу жидкости, целевому объёму и способу очистки"],
        ["Определение уровня", "Если требуется cLLD или ёмкостное определение уровня, необходимо согласовать конструкцию иглы, кабельное подключение и способ определения в приборе"],
        ["Условия применения", "Укажите тип жидкости, скорость аспирации, объём дозирования, способ очистки и требования по предотвращению перекрёстного загрязнения"],
      ],
    },
    "piercing-probes": {
      title: "Серия прокалывающих игл",
      description:
        "Серия прокалывающих игл предназначена для отбора жидкости через плёнки, пробки, резервуары реагентов и образцов и другие закрытые расходные материалы в автоматическом оборудовании. Конструкция настраивается под объект и глубину прокола, путь жидкости и требования к вентиляции. Форма и прочность наконечника, направление вентиляции, положение боковых отверстий, изгиб и монтаж согласуются с внутренним пространством оборудования.",
      specsTitle: "Параметры для согласования",
      commonApplications: ["Прокалывание плёнки", "Прокалывание пробок", "Отбор из резервуаров реагентов", "Отбор из резервуаров образцов", "Вспомогательная вентиляция", "Контуры закрытых расходных материалов"],
      advantages: [
        "Форма наконечника под плёнку, пробку или конструкцию расходного материала",
        "Настраиваемые направление вентиляции, положение боковых отверстий и путь жидкости",
        "Конструкция согласуется по глубине и направлению прокола и монтажному пространству",
        "Подходит для отбора из закрытых резервуаров реагентов, образцов и расходных материалов",
        "Возможна интеграция изгиба, сварки и монтажного конца для установки в оборудование",
      ],
      specs: [
        ["Чертежи или образцы", "Предоставьте чертежи расходного материала, образцы плёнки или пробки, схему точки прокола либо данные о монтажном пространстве"],
        ["Объект прокола", "Необходимо согласовать материал, толщину и прочность плёнки, пробки, резервуара реагентов или образцов либо закрытого расходного материала"],
        ["Конструкция наконечника", "Форма наконечника, направление режущей кромки, угол, прочность и обработка поверхности согласуются по сопротивлению проколу"],
        ["Вентиляционная часть", "Если нужны вентиляционные отверстия, канавки или боковые отверстия, необходимо согласовать пути газа и жидкости, направление вентиляции и операцию отбора"],
        ["Монтаж и движение", "Необходимо согласовать глубину и направление прокола, целевую точку отбора, конструкцию монтажного конца и внутреннее пространство оборудования"],
        ["Технологичность", "Боковые отверстия, изгиб, сварка, полировка и покрытие оцениваются с учётом размеров иглы, наконечника и стабильности прокола"],
      ],
    },
    "wash-probes": {
      title: "Серия промывочных игл",
      description:
        "Серия промывочных игл предназначена для очистки наружной поверхности, промывки внутреннего канала, удаления отходов и обработки остаточной жидкости в автоматических анализаторах. Конструкция настраивается под промывочную станцию, пути моющей и отработанной жидкости и направление распылительных отверстий. Доступны исполнения с одной, двумя или несколькими головками, боковыми отверстиями, изгибами и различными покрытиями.",
      specsTitle: "Параметры для согласования",
      commonApplications: ["Промывка наружной поверхности иглы", "Промывка внутреннего канала", "Отвод отработанной жидкости", "Удаление остаточной жидкости", "Интеграция в промывочную станцию", "Снижение carry-over"],
      advantages: [
        "Одна, две или несколько головок под пространство промывочной станции",
        "Боковое распыление, каналы отвода и многоконтурная промывка",
        "Подходит для интеграции игл образцов, реагентов и промывочных станций",
        "Ориентация отверстий согласуется с путями моющей и отработанной жидкости",
        "Покрытие может снизить налипание и риск перекрёстного загрязнения",
      ],
      specs: [
        ["Чертежи или образцы", "Предоставьте схему промывочной станции, монтажное пространство иглы и описание путей моющей и отработанной жидкости"],
        ["Объект очистки", "Необходимо согласовать промывку игл образцов или реагентов, наружной поверхности, внутреннего канала либо отвод отработанной жидкости"],
        ["Распылительные отверстия", "Количество, диаметр, положение и направление отверстий и целевая зона согласуются с операцией промывки"],
        ["Отвод отходов", "Выход, путь возврата остатков, направление аспирации и положение ёмкости согласуются с конструкцией промывочной станции"],
        ["Исполнение иглы", "Одна, две или несколько головок, изгиб и монтажный конец изготавливаются под пространство промывочной станции"],
        ["Антиостаточная обработка", "Сварка, полировка, покрытие и антиадгезионная обработка согласуются по свойствам жидкостей и требуемому ресурсу"],
      ],
    },
    "stirring-paddles": {
      title: "Серия смесительных лопаток",
      description:
        "Серия смесительных лопаток предназначена для перемешивания образцов, реагентов, разбавителей и реакционных жидкостей в автоматических анализаторах. Изделие можно изготовить по чертежу с учётом геометрии сосуда, целевого объёма, пространства для перемешивания, диапазона скорости и требуемого результата. Возможны плоские, спиральные лопатки и лопатки с элементами под углом 90°; покрытие, сварка, соосность и монтажный конец согласуются для проекта.",
      specsTitle: "Параметры для согласования",
      commonApplications: ["Перемешивание образцов", "Перемешивание реагентов", "Перемешивание реакционных жидкостей", "Перемешивание в сосуде", "Антиадгезионное покрытие", "Автоматические анализаторы"],
      advantages: [
        "Плоские, спиральные лопатки и лопатки с элементами под углом 90°",
        "Изготовление под размеры сосуда, объём жидкости и диапазон скорости",
        "Согласование соосности, монтажного конца и способа сварки",
        "Покрытие поверхности для снижения налипания и улучшения очистки",
        "Для задач с требованиями к эффективности перемешивания, контролю разбрызгивания и остатков",
      ],
      specs: [
        ["Чертежи или образцы", "Предоставьте геометрию реакционного сосуда, пространство для перемешивания, размеры монтажного конца, имеющийся образец или требования к испытаниям"],
        ["Реакционный сосуд", "Необходимо согласовать размеры и форму дна, высоту жидкости, доступное пространство и риск механического столкновения"],
        ["Конструкция лопатки", "Плоская, спиральная лопатка, элементы под углом 90° или другая форма выбираются по результату перемешивания и состоянию жидкости"],
        ["Условия перемешивания", "Укажите целевой объём, диапазон скорости, время перемешивания и допустимость пузырьков, разбрызгивания или осадка"],
        ["Монтажная часть", "Необходимо согласовать форму монтажного конца, требования к соосности, соединение, направление движения и привод"],
        ["Обработка поверхности", "Покрытие, цвет, способ сварки, требования по налипанию и способ очистки согласуются по среде и требуемому ресурсу"],
      ],
    },
  },
};

function isProbeSlug(value: unknown): value is ProbeSlug {
  return Object.prototype.hasOwnProperty.call(
    PROBE_COPY.es,
    String(value || ""),
  );
}

function replaceSlug(value: unknown, slug: string, title: string): unknown {
  if (typeof value === "string") {
    return value.replaceAll(slug, title);
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceSlug(item, slug, title));
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        replaceSlug(child, slug, title),
      ]),
    );
  }

  return value;
}

export function localizeProbeDetailData<T extends DetailRecord>(
  sourceData: T,
  localizedData: DetailRecord,
  locale: HardTubeTargetLocale,
  pathname = "",
): T {
  const slug = String(sourceData.slug || "").trim();

  if (!isProbeSlug(slug)) {
    return localizedData as T;
  }

  const copy = PROBE_COPY[locale][slug];
  const sourceSpecs = Array.isArray(sourceData.specs)
    ? sourceData.specs
    : [];
  const specs = copy.specs.map(([label, value], index) => ({
    ...(sourceSpecs[index] || {}),
    label,
    name: label,
    title: label,
    value,
    content: value,
  }));
  const faqs = replaceSlug(localizedData.faqs, slug, copy.title);
  const faq = replaceSlug(localizedData.faq, slug, copy.title);
  const bottomCtaTitle = replaceSlug(
    localizedData.bottomCtaTitle,
    slug,
    copy.title,
  );
  const bottomCtaDescription = replaceSlug(
    localizedData.bottomCtaDescription,
    slug,
    copy.title,
  );
  const detailHref =
    pathname || `/${locale}/products/probes/${slug}`;

  return {
    ...localizedData,
    __locale: locale,
    model: copy.title,
    modelName: copy.title,
    displayModel: copy.title,
    modelDisplay: copy.title,
    h1Title: copy.title,
    pageTitle: copy.title,
    title: copy.title,
    name: copy.title,
    productName: copy.title,
    productTypeName: copy.title,
    productTypeLabel: copy.title,
    description: copy.description,
    summary: copy.description,
    overview: copy.description,
    commonApplications: [...copy.commonApplications],
    advantages: [...copy.advantages],
    specsTitle: copy.specsTitle,
    specTitle: copy.specsTitle,
    specificationTitle: copy.specsTitle,
    specs,
    specifications: specs,
    faqs,
    faq,
    detailHref,
    href: detailHref,
    imageAlt: copy.title,
    imageAltEn: copy.title,
    mainImageAlt: copy.title,
    bottomCtaTitle,
    bottomCtaDescription,
    bottomCtaDesc: bottomCtaDescription,
    customInquiryTitle: bottomCtaTitle,
    customInquiryDescription: bottomCtaDescription,
    seoTitle: `${copy.title} | FOREACH`,
    seoDescription: copy.description,
    seo: {
      ...(localizedData.seo || {}),
      title: `${copy.title} | FOREACH`,
      description: copy.description,
    },
  } as unknown as T;
}
