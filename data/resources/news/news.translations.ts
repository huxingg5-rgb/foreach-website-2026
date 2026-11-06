import type { NewsLocale, NewsPageData } from "./news.types";

type ForeignLocale = Exclude<NewsLocale, "zh-CN" | "en">;

type LegacyArticleTranslation = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

type StructuredArticleTranslation = {
  title: string;
  summary: string;
  /** 封面图说明（可选，不填沿用英文） */
  coverAlt?: string;
  content: readonly {
    title: string;
    content: string;
  }[];
  seoTitle?: string;
  seoDescription?: string;
};

type ArticleTranslation =
  | LegacyArticleTranslation
  | StructuredArticleTranslation;
const pageTranslations: Record<ForeignLocale, {
  heroTitle: string;
  heroDescription: string;
  home: string;
  resources: string;
  current: string;
  search: string;
  categories: readonly [string, string, string, string];
  sectionTitle: string;
  bannerTitle: string;
  bannerDescription: string;
  contact: string;
}> = {
  es: {
    heroTitle: "Noticias", heroDescription: "Siga las novedades de Foreach sobre ferias, desarrollo empresarial, innovación tecnológica, sistemas de calidad y anuncios importantes.",
    home: "Inicio", resources: "Recursos", current: "Noticias", search: "Introduzca palabras clave",
    categories: ["Todas", "Ferias", "Novedades de la empresa", "Anuncios"], sectionTitle: "Últimas novedades",
    bannerTitle: "¿Necesita más información sobre productos o colaboración?", bannerDescription: "Puede enviar sus requisitos, descargar fichas técnicas o conocer el apoyo de Foreach a sus distribuidores.", contact: "Contactar",
  },
  fr: {
    heroTitle: "Actualités", heroDescription: "Suivez les actualités Foreach sur les salons, le développement de l’entreprise, l’innovation technologique, la qualité et les annonces importantes.",
    home: "Accueil", resources: "Ressources", current: "Actualités", search: "Saisissez des mots-clés",
    categories: ["Toutes", "Salons", "Actualités de l’entreprise", "Annonces"], sectionTitle: "Dernières actualités",
    bannerTitle: "Besoin de plus d’informations sur nos produits ou nos partenariats ?", bannerDescription: "Transmettez vos besoins, téléchargez les fiches techniques ou découvrez l’accompagnement des distributeurs Foreach.", contact: "Nous contacter",
  },
  ko: {
    heroTitle: "뉴스", heroDescription: "전시회, 기업 발전, 기술 혁신, 품질 시스템 및 주요 공지에 관한 Foreach의 최신 소식을 확인하세요.",
    home: "홈", resources: "자료", current: "뉴스", search: "키워드를 입력하세요",
    categories: ["전체", "전시회", "기업 소식", "공지"], sectionTitle: "최신 소식",
    bannerTitle: "제품 또는 협력 정보가 더 필요하신가요?", bannerDescription: "제품 요구 사항을 제출하거나 데이터시트를 다운로드하고 Foreach 대리점 협력 지원을 확인할 수 있습니다.", contact: "문의하기",
  },
  ru: {
    heroTitle: "Новости", heroDescription: "Новости Foreach о выставках, развитии компании, технологических инновациях, системе качества и важных объявлениях.",
    home: "Главная", resources: "Ресурсы", current: "Новости", search: "Введите ключевые слова",
    categories: ["Все", "Выставки", "Новости компании", "Объявления"], sectionTitle: "Последние новости",
    bannerTitle: "Нужна дополнительная информация о продукции или сотрудничестве?", bannerDescription: "Отправьте требования, загрузите технические описания или узнайте о поддержке дистрибьюторов Foreach.", contact: "Связаться",
  },
};

const articleTranslations: Record<ForeignLocale, readonly ArticleTranslation[]> = {
  es: [
        {
          title: "Conozca a Foreach en ADLM 2026",
          summary:
            "Foreach participará en ADLM 2026, que se celebrará del 26 al 30 de julio de 2026 en Anaheim, California. Le invitamos a visitar el stand 4105 para conocer nuestros componentes de control de fluidos y soluciones para sistemas fluídicos.",
          content: [
            {
              title: "Foreach estará presente en ADLM 2026",
              content:
                "Del 26 al 30 de julio de 2026, Foreach participará en ADLM 2026 en Anaheim, California.\n\nEn el stand 4105, nuestro equipo conversará con fabricantes de instrumentos, ingenieros y socios del sector sobre selección de componentes, compatibilidad de materiales e integración de sistemas fluídicos.",
            },
            {
              title: "Productos y soluciones que presentaremos",
              content:
                "Presentaremos bombas de precisión, válvulas miniatura, racores, tubos, sensores de presión, sistemas de detección de burbujas y soluciones fluídicas personalizadas.\n\nEstos productos se utilizan en funciones clave como dosificación precisa, transferencia de líquidos, conmutación de circuitos, supervisión de presión, detección de burbujas y conexión de líneas de fluido.",
            },
            {
              title: "Soporte para diferentes aplicaciones",
              content:
                "Foreach ofrece productos y soporte técnico para diagnóstico in vitro, ciencias de la vida, instrumentos analíticos y automatización de laboratorio.\n\nNuestro equipo también ayuda a los clientes a evaluar productos alternativos, seleccionar materiales compatibles y simplificar la integración de los componentes en sus equipos.",
            },
            {
              title: "Experiencia técnica y desarrollo continuo",
              content:
                "Foreach desarrolla tecnologías de control preciso de fluidos y ha creado una gama de productos que incluye bombas, válvulas, sondas, racores, tubos y sensores.\n\nLa empresa ha recibido reconocimientos en China por su especialización, capacidad de innovación y crecimiento empresarial.",
            },
            {
              title: "Le esperamos en el stand 4105",
              content:
                "Si busca componentes fluídicos, alternativas para productos existentes o apoyo para resolver necesidades de selección e integración, le invitamos a visitar nuestro stand.\n\nEvento: ADLM 2026\nFecha: 26–30 de julio de 2026\nLugar: Anaheim, California, Estados Unidos\nStand: 4105\n\nEsperamos poder conversar con usted en Anaheim.",
            },
          ],
          seoTitle: "Foreach en ADLM 2026 | Stand 4105",
          seoDescription:
            "Visite el stand 4105 de Foreach en ADLM 2026 para conocer componentes de control de fluidos y soluciones para sistemas fluídicos.",
        },
    ["Foreach presentará sus componentes microfluídicos principales en ADLM 2026", "Foreach participará en ADLM 2026 con bombas, válvulas, racores, tubos, sensores y componentes fluídicos para IVD, automatización de laboratorio y ciencias de la vida.", "Para aplicaciones IVD y de automatización de laboratorio", "Foreach presentará bombas de pistón, jeringa y diafragma, electroválvulas, válvulas rotativas, racores, tubos y sensores.", "Control de fluidos fiable para integración a largo plazo", "Durante la feria, Foreach abordará con clientes y socios la selección, la compatibilidad de materiales, la integración del sistema y las necesidades de aplicación.", "Conozca a Foreach", "Invitamos a profesionales de IVD, ciencias de la vida, automatización e instrumentos analíticos a conversar con nuestro equipo sobre el control y la integración de fluidos."],
    ["Foreach participará en ME Supply Chain Expo 2026", "Foreach estará en el stand 2-M46 y mostrará productos principales, capacidades técnicas y soluciones para múltiples aplicaciones.", "Información de la feria", "La feria se celebrará en Shenzhen World Exhibition & Convention Center, China. El stand de Foreach es el 2-M46.", "Qué presentaremos", "Foreach mostrará productos, capacidades técnicas y soluciones para que los visitantes comprendan mejor nuestro valor y capacidad de servicio.", "Comunicación en el stand", "Visite el stand 2-M46 para hablar con nuestro equipo sobre aplicaciones, necesidades del mercado y oportunidades de cooperación."],
    ["Invitación de Foreach a Guangzhou High Medical Expo 2026", "Foreach participará del 30 de marzo al 1 de abril en el stand B529.", "Información de la feria", "Foreach estará en Guangzhou Airport Expo Center, China, del 30 de marzo al 1 de abril de 2026. Nuestro stand es el B529.", "Exposición de productos y soluciones", "Presentaremos productos, capacidades técnicas y soluciones industriales para explicar sus características y ventajas.", "Bienvenidos al stand", "Invitamos a clientes, socios y profesionales a visitar el stand B529 y conversar sobre aplicaciones, selección y cooperación."],
    ["Invitación: visite Foreach en CACLP 2026", "Foreach participará en CACLP 2026 del 21 al 23 de marzo en el stand 2-0424.", "Información de la feria", "CACLP 2026 se celebrará del 21 al 23 de marzo en Xiamen International Expo Center, China. El stand de Foreach es el 2-0424.", "Qué presentaremos", "Mostraremos productos principales, capacidades técnicas y soluciones industriales para explicar nuestras ventajas de producto y servicio.", "Bienvenidos al stand 2-0424", "Invitamos a clientes, socios y profesionales a visitar el stand para conversar sobre productos y oportunidades de cooperación."],
    ["Foreach participará en WHX Labs Dubai 2026", "Foreach estará en el stand H2.F34 con productos microfluídicos, capacidades técnicas y soluciones de aplicación.", "Información de la feria", "Foreach participará del 10 al 13 de febrero de 2026 en Dubai World Trade Centre, EAU. Nuestro stand es el H2.F34.", "Comunicación con el mercado internacional", "Esta feria es una oportunidad para ampliar el diálogo internacional y presentar productos, capacidades y soluciones para distintos escenarios.", "Conozca a nuestro equipo", "Los visitantes podrán conversar sobre características, aplicaciones, personalización y modalidades de cooperación con el equipo de Foreach."],
    ["Foreach fue invitada a la Conferencia 2025 de desarrollo de pymes especializadas e innovadoras", "Foreach asistió como una de las empresas representativas invitadas de Shenzhen.", "Empresa representante invitada", "La conferencia se inauguró en Chongqing el 12 de noviembre y Foreach participó como empresa representativa de Shenzhen.", "Delegación de Shenzhen", "La delegación reunió a representantes públicos, organizaciones industriales y empresas nacionales especializadas e innovadoras Little Giant.", "Compromiso continuo con la microfluídica", "Como empresa nacional Little Giant, Foreach seguirá centrada en componentes microfluídicos, sistemas fluídicos e innovación orientada a aplicaciones."],
    ["Invitación de Foreach a Medical Device Innovation Expo 2025", "Foreach participará del 21 al 23 de agosto en el stand B36.", "Información de la feria", "La feria tendrá lugar del 21 al 23 de agosto de 2025 en Suzhou International Expo Center, China. El stand de Foreach es el B36.", "Exposición de productos", "Foreach mostrará productos, capacidades técnicas y soluciones industriales para presentar su valor de producto y servicio.", "Bienvenidos al stand", "Invitamos a clientes, socios y profesionales al stand B36 para hablar sobre tendencias, aplicaciones y cooperación futura."],
    ["Foreach reconocida como empresa gacela", "Foreach recibió este reconocimiento por su capacidad de innovación, ritmo de crecimiento y desempeño en el mercado.", "Reconocimiento al crecimiento y la innovación", "La distinción como empresa gacela refleja la capacidad innovadora, el impulso de crecimiento y el desempeño de Foreach.", "Enfoque continuo en tecnología microfluídica", "Foreach desarrolla e industrializa tecnologías de control microfluídico para diagnóstico médico, medio ambiente, laboratorio, ciencias de la vida y biología sintética.", "Innovación para las aplicaciones de los clientes", "Seguiremos mejorando bombas, válvulas, sondas, racores, sensores y el soporte de sistemas para ofrecer productos y servicios fiables."],
    ["Foreach superó la revisión del proyecto de excelencia de calidad del distrito de Guangming", "La aprobación de 2024 refleja los avances continuos en gestión de calidad e innovación tecnológica.", "Revisión del proyecto superada", "Foreach superó la revisión, que reconoce el desarrollo de la gestión de calidad, la innovación y la mejora continua de la empresa.", "Mejora continua de la gestión de calidad", "La gestión de calidad sustenta el suministro estable de componentes microfluídicos. Foreach seguirá mejorando su sistema y sus servicios.", "Apoyo fiable a los clientes", "Foreach continuará apoyando a IVD, ciencias de la vida, automatización de laboratorio y sectores relacionados con productos estables y servicios profesionales."],
    ["Foreach reconocida como empresa nacional especializada e innovadora Little Giant", "El reconocimiento distingue su dedicación e innovación de largo plazo en el control microfluídico.", "Reconocimiento nacional Little Giant", "Foreach fue reconocida por su especialización e innovación en tecnología de control microfluídico.", "Enfoque en el control microfluídico", "Foreach desarrolla componentes y capacidades de sistemas, como bombas, válvulas, sondas, racores, sensores y módulos.", "Apoyo profesional a los clientes", "Seguiremos mejorando productos y servicios especializados, refinados, diferenciados e innovadores para ofrecer componentes y soluciones fiables."],
    ["Foreach concluyó con éxito CMEF & ICMD Otoño 2014", "Foreach presentó nuevas líneas de producto y analizó aplicaciones de sistemas microfluídicos con sus clientes.", "Una feria exitosa", "Foreach presentó productos actualizados y nuevas líneas, que atrajeron la atención de numerosos visitantes y clientes.", "Intercambio técnico", "Foreach compartió conocimientos en el foro de innovación tecnológica de servicios personalizados para fabricación de dispositivos médicos.", "Apoyo a IVD y sectores relacionados", "Numerosos clientes conocieron nuestras series y capacidades. Foreach seguirá apoyando a IVD con productos y servicios profesionales."],
        {
          title: "Visite a Foreach en MEDICA 2026 | Stand 1H39-1",
          summary:
            "Del 16 al 19 de noviembre de 2026, Foreach estará en el stand 1H39-1 de MEDICA 2026 en Düsseldorf (Alemania) para hablar con fabricantes de instrumentos OEM sobre evaluación de segundo proveedor, pruebas de muestras y suministro a largo plazo de bombas, válvulas y componentes fluídicos. Le invitamos a reservar una reunión con antelación.",
          coverAlt: "Entrada de Messe Düsseldorf",
          content: [
            {
              title: "Por qué visitar el stand 1H39-1",
              content:
                "MEDICA es una de las mayores ferias B2B del sector médico a nivel mundial y se celebra junto con COMPAMED, la feria de la cadena de suministro de dispositivos médicos. En esta edición, Foreach se centra en proyectos de instrumentos OEM ya en producción o en desarrollo, y ofrece un segundo proveedor que puede evaluar, homologar como alternativa y mantener a largo plazo, para reducir el riesgo de depender de una sola fuente.\n\nHomologación de proveedores: apoyamos la evaluación de alta de proveedores y las auditorías del sistema de calidad.\nPruebas rápidas de muestras: disponemos rápidamente de muestras de bombas, válvulas y componentes fluídicos para validarlas en su equipo.\nEvaluación de sustitución: comparamos con sus piezas actuales la compatibilidad de interfaces, prestaciones y materiales.\nSuministro a largo plazo: suministro en serie estable y continuo para proyectos de instrumentos OEM.",
            },
            {
              title: "Productos que puede consultar en el stand",
              content:
                "Durante la feria, puede hablar con nuestro equipo sobre selección, sustitución y personalización de las siguientes líneas de producto:\n\n[Series de bombas](/es/products/pumps): dosificación precisa, suministro continuo, pipeteo automatizado y transferencia estable\n[Series de válvulas](/es/products/valves): control de apertura/cierre, cierre de tubos y conmutación multicanal\n[Series de sondas](/es/products/probes): sondas de muestreo, sondas de enjuague, sondas de perforación, agitadores y conjuntos de sondas personalizados\n[Series de racores](/es/products/fittings): conectores para tubos, racores para tubos rígidos, racores Luer, conectores rápidos y conjuntos de tubos personalizados\n[Series de tubos](/es/products/tubing): tubos flexibles multimaterial, tubos rígidos y líneas de fluido transparentes\n[Serie de control inteligente](/es/products/control): monitoreo de presión de fluido, detección de burbujas y protección del sistema",
            },
            {
              title: "Calidad y credenciales",
              content:
                "Para un segundo proveedor, la calidad estable y los procesos controlados son el núcleo de la evaluación del cliente.\n\nSistemas certificados: sistema de gestión de calidad ISO 9001 y sistema de gestión de calidad para dispositivos médicos ISO 13485.\nProducción controlada: sala limpia de clase 100 000; los tubos se fabrican en nuestro propio taller de extrusión dentro de la sala limpia, con tolerancias de diámetro interior y exterior y frecuencia de muestreo definidas para cada especificación; las piezas clave, como los componentes estructurales de bombas y válvulas y los conectores, se mecanizan en nuestro propio centro de mecanizado.\n![Centro de extrusión (sala limpia)](/images/about/research-manufacturing/ability/extrusion-center.webp 1220x760)\n![Centro de mecanizado](/images/about/research-manufacturing/ability/machining-center.webp 1220x760)\n![Inspección de calidad](/images/about/quality-management.webp 1200x760)\nDocumentación de conformidad: la documentación de materiales y de conformidad (como los informes RoHS de los tubos) está disponible bajo petición.\nCredenciales de la empresa: fundada en 2012, Foreach está reconocida como Empresa nacional especializada e innovadora «Little Giant» y Empresa gacela de Shenzhen, y cuenta con un Centro de investigación de tecnología de ingeniería de Guangdong.\n![Empresa nacional especializada e innovadora «Little Giant»](/images/about/foreach/honors/honor-row2-little-giant.webp 692x460)\n![Empresa gacela de Shenzhen](/images/about/foreach/honors/honor-row2-gazelle.webp 634x460)\n![Centro de investigación de tecnología de ingeniería de Guangdong](/images/about/foreach/honors/honor-row2-engineering-center.webp 756x460)",
            },
            {
              title: "Reserve una reunión en el stand",
              content:
                "Tanto si busca un segundo proveedor para un equipo ya en producción como si está seleccionando bombas, válvulas y conexiones fluídicas para un nuevo proyecto, le invitamos a reservar con antelación; organizaremos la reunión según su agenda.\n\nCómo reservar: escriba a info@foreachtek.com y le confirmaremos la hora de la reunión.\nIndique en su solicitud: los productos o referencias actuales que le interesan, la fecha y la franja horaria preferidas y los temas que desea tratar (como evaluación de sustitución, pruebas de muestras o auditoría de proveedores).\nHorario de cierre: el último día de la feria (jueves 19 de noviembre) cierra a las 16:00; tenga en cuenta este horario al planificar su visita.\n\nEsperamos verle en Düsseldorf.",
            },
          ],
          seoTitle: "Foreach en MEDICA 2026 | Stand 1H39-1",
          seoDescription:
            "Visite a Foreach en el stand 1H39-1 de MEDICA 2026 (Düsseldorf, 16–19 de noviembre): evaluación de segundo proveedor, muestras y suministro de bombas, válvulas y componentes fluídicos.",
        },
  ],
  fr: [
        {
          title: "Rencontrez Foreach à l’ADLM 2026",
          summary:
            "Foreach participera à l’ADLM 2026, organisée du 26 au 30 juillet 2026 à Anaheim, en Californie. Retrouvez-nous au stand 4105 pour découvrir nos composants de contrôle des fluides et nos solutions destinées aux systèmes fluidiques.",
          content: [
            {
              title: "Foreach participera à l’ADLM 2026",
              content:
                "Du 26 au 30 juillet 2026, Foreach participera à l’ADLM 2026 à Anaheim, en Californie.\n\nAu stand 4105, notre équipe échangera avec les fabricants d’instruments, les ingénieurs et les partenaires du secteur autour de la sélection des composants, de la compatibilité des matériaux et de l’intégration des circuits fluidiques.",
            },
            {
              title: "Composants et solutions présentés",
              content:
                "Foreach présentera des pompes de précision, des vannes miniatures, des raccords fluidiques, des tubes, des solutions de mesure de pression, des détecteurs de bulles ainsi que des solutions fluidiques personnalisées.\n\nCes produits répondent aux principales fonctions de dosage, de transfert de liquide, de commutation des circuits, de surveillance de la pression, de détection des bulles et de connexion fluidique.",
            },
            {
              title: "Accompagnement des applications instrumentales",
              content:
                "Nos composants sont destinés au diagnostic in vitro, aux sciences de la vie, aux instruments d’analyse et à l’automatisation de laboratoire.\n\nNotre équipe technique accompagne les clients dans le choix des produits, l’analyse de la compatibilité chimique, l’évaluation de solutions de remplacement et l’intégration des composants dans leurs instruments.",
            },
            {
              title: "Une expertise développée dans le contrôle des fluides",
              content:
                "Foreach développe et industrialise des technologies de contrôle précis des fluides couvrant les pompes, les vannes, les sondes, les raccords, les tubes, les capteurs et les solutions fluidiques intégrées.\n\nL’entreprise a été reconnue en Chine pour sa spécialisation technologique, sa capacité d’innovation et son développement continu.",
            },
            {
              title: "Retrouvez-nous au stand 4105",
              content:
                "Que vous recherchiez un composant fluidique, une solution de remplacement ou un accompagnement pour l’intégration de votre circuit, notre équipe sera disponible pour étudier votre application.\n\nSalon : ADLM 2026\nDates : du 26 au 30 juillet 2026\nLieu : Anaheim, Californie, États-Unis\nStand : 4105\n\nNous serons heureux de vous rencontrer à Anaheim.",
            },
          ],
          seoTitle: "Foreach à l’ADLM 2026 | Stand 4105",
          seoDescription:
            "Retrouvez Foreach au stand 4105 de l’ADLM 2026 pour découvrir nos composants de contrôle des fluides et nos solutions fluidiques.",
        },
    ["Foreach présentera ses principaux composants microfluidiques à l’ADLM 2026", "Foreach exposera des pompes, vannes, raccords, tubes, capteurs et composants pour l’IVD, l’automatisation de laboratoire et les sciences de la vie.", "Pour l’IVD et l’automatisation de laboratoire", "Foreach présentera des pompes à piston, à seringue et à membrane, des électrovannes, des vannes rotatives, des raccords, des tubes et des capteurs.", "Un contrôle fluidique fiable pour l’intégration à long terme", "Foreach échangera avec ses clients et partenaires sur la sélection, la compatibilité, l’intégration et les besoins applicatifs.", "Venez rencontrer Foreach", "Nous invitons les professionnels de l’IVD, des sciences de la vie, de l’automatisation et de l’analyse à discuter de leurs exigences avec notre équipe."],
    ["Foreach participera au ME Supply Chain Expo 2026", "Foreach exposera au stand 2-M46 ses principaux produits, compétences techniques et solutions multi-applications.", "Informations sur le salon", "Le salon se tiendra au Shenzhen World Exhibition & Convention Center, en Chine. Le stand Foreach porte le numéro 2-M46.", "Ce que nous présenterons", "Foreach présentera ses produits, compétences et solutions afin d’illustrer clairement sa valeur et sa capacité de service.", "Échanges sur place", "Rendez-vous au stand 2-M46 pour parler applications, besoins du marché et possibilités de coopération avec notre équipe."],
    ["Invitation Foreach au Guangzhou High Medical Expo 2026", "Foreach exposera du 30 mars au 1er avril au stand B529.", "Informations sur le salon", "Foreach sera au Guangzhou Airport Expo Center, en Chine, du 30 mars au 1er avril 2026. Notre stand est le B529.", "Présentation des produits et solutions", "Nous présenterons produits, compétences techniques et solutions sectorielles pour expliquer leurs caractéristiques et avantages.", "Bienvenue sur notre stand", "Clients, partenaires et professionnels sont invités au stand B529 pour échanger sur les applications, la sélection et la coopération."],
    ["Invitation : retrouvez Foreach au CACLP 2026", "Foreach exposera au CACLP du 21 au 23 mars au stand 2-0424.", "Informations sur le salon", "Le CACLP 2026 se déroulera du 21 au 23 mars au Xiamen International Expo Center, en Chine. Le stand Foreach est le 2-0424.", "Ce que nous présenterons", "Nous présenterons produits, compétences et solutions sectorielles afin d’expliquer les avantages de notre offre et de nos services.", "Bienvenue au stand 2-0424", "Nous invitons clients, partenaires et professionnels à venir discuter produits et possibilités de coopération."],
    ["Foreach participera au WHX Labs Dubai 2026", "Foreach exposera au stand H2.F34 ses principaux produits microfluidiques, ses compétences et ses solutions.", "Informations sur le salon", "Foreach sera au Dubai World Trade Centre, aux EAU, du 10 au 13 février 2026. Notre stand est le H2.F34.", "Échanges avec le marché international", "Ce salon permettra d’intensifier les échanges internationaux et de présenter nos produits, compétences et solutions multi-applications.", "Rencontrez notre équipe", "Les visiteurs pourront discuter caractéristiques, applications, personnalisation et modèles de coopération avec l’équipe Foreach."],
    ["Foreach invitée à la Conférence 2025 sur le développement des PME spécialisées et innovantes", "Foreach y a participé comme entreprise représentative invitée de Shenzhen.", "Entreprise représentative invitée", "La conférence s’est ouverte à Chongqing le 12 novembre et Foreach y a représenté les entreprises invitées de Shenzhen.", "Délégation de Shenzhen", "La délégation réunissait représentants publics, organisations professionnelles et entreprises nationales Little Giant spécialisées et innovantes.", "Un engagement durable dans la microfluidique", "En tant qu’entreprise nationale Little Giant, Foreach poursuivra son travail sur les composants, les systèmes fluidiques et l’innovation applicative."],
    ["Invitation Foreach au Medical Device Innovation Expo 2025", "Foreach exposera du 21 au 23 août au stand B36.", "Informations sur le salon", "Le salon aura lieu du 21 au 23 août 2025 au Suzhou International Expo Center, en Chine. Le stand Foreach est le B36.", "Présentation des produits", "Foreach présentera ses produits, compétences et solutions sectorielles afin d’illustrer leurs caractéristiques et la valeur de ses services.", "Bienvenue sur notre stand", "Clients, partenaires et professionnels sont invités au stand B36 pour parler tendances, applications et coopération future."],
    ["Foreach reconnue comme entreprise Gazelle", "Cette distinction récompense sa capacité d’innovation, sa dynamique de croissance et ses performances sur le marché.", "Une reconnaissance de la croissance et de l’innovation", "Le statut d’entreprise Gazelle reflète la capacité d’innovation, la croissance et les performances de Foreach.", "Priorité constante à la technologie microfluidique", "Foreach développe et industrialise le contrôle microfluidique pour le diagnostic, l’environnement, les laboratoires, les sciences de la vie et la biologie synthétique.", "Innover pour les applications clients", "Nous continuerons d’améliorer pompes, vannes, sondes, raccords, capteurs et systèmes pour fournir des produits et services fiables."],
    ["Foreach a validé le projet de développement de l’excellence qualité du district de Guangming", "La validation 2024 reflète les progrès continus en gestion de la qualité et en innovation technologique.", "Validation du projet", "Cette validation reconnaît le développement de la gestion de la qualité, l’innovation technologique et l’amélioration continue de Foreach.", "Amélioration continue de la qualité", "La gestion de la qualité est essentielle à la livraison stable des composants microfluidiques. Foreach continuera d’améliorer son système et ses services.", "Un soutien fiable aux clients", "Foreach continuera d’accompagner l’IVD, les sciences de la vie, l’automatisation de laboratoire et les secteurs associés."],
    ["Foreach reconnue entreprise nationale spécialisée et innovante Little Giant", "Cette reconnaissance salue son engagement et son innovation durables dans le contrôle microfluidique.", "Reconnaissance nationale Little Giant", "Foreach a été reconnue pour sa spécialisation et son innovation dans les technologies de contrôle microfluidique.", "Priorité au contrôle microfluidique", "Foreach développe composants et systèmes, notamment pompes, vannes, sondes, raccords, capteurs et modules associés.", "Un soutien professionnel aux clients", "Nous améliorerons produits et services spécialisés, raffinés, distinctifs et innovants afin de fournir des composants et solutions fiables."],
    ["Foreach a conclu avec succès le CMEF & ICMD Automne 2014", "Foreach y a présenté de nouvelles gammes et échangé avec ses clients sur les applications microfluidiques.", "Un salon réussi", "Foreach a présenté des produits améliorés et de nouvelles gammes qui ont suscité l’intérêt de nombreux visiteurs et clients.", "Échanges techniques", "Foreach a partagé son expertise lors du forum sur l’innovation technologique des services personnalisés de fabrication de dispositifs médicaux.", "Soutenir l’IVD et les secteurs associés", "De nombreux clients ont découvert nos gammes et nos capacités. Foreach continuera d’accompagner l’IVD avec des produits et services professionnels."],
        {
          title: "Rencontrez Foreach à MEDICA 2026 | Stand 1H39-1",
          summary:
            "Du 16 au 19 novembre 2026, Foreach sera présent au stand 1H39-1 de MEDICA 2026 à Düsseldorf (Allemagne) pour échanger avec les fabricants d’instruments OEM sur l’évaluation d’un second fournisseur, les tests d’échantillons et l’approvisionnement à long terme en pompes, vannes et composants fluidiques. Prenez rendez-vous dès maintenant.",
          coverAlt: "Entrée du parc des expositions Messe Düsseldorf",
          content: [
            {
              title: "Pourquoi venir au stand 1H39-1",
              content:
                "MEDICA est l’un des plus grands salons B2B au monde pour le secteur médical et se tient en même temps que COMPAMED, le salon de la chaîne d’approvisionnement des dispositifs médicaux. Cette année, Foreach s’adresse en priorité aux projets d’instruments OEM déjà en production ou en développement, en proposant une seconde source que vous pouvez évaluer, qualifier en substitution et pérenniser, afin de réduire le risque lié à une source unique.\n\nQualification fournisseur : nous accompagnons les évaluations de référencement et les audits du système qualité.\nÉchantillons rapides : des échantillons de pompes, vannes et composants fluidiques sont rapidement disponibles pour validation sur votre équipement.\nÉvaluation de substitution : nous comparons avec vos pièces actuelles la compatibilité des interfaces, des performances et des matériaux.\nApprovisionnement durable : des livraisons en série stables et continues pour les projets d’instruments OEM.",
            },
            {
              title: "Produits présentés sur le stand",
              content:
                "Pendant le salon, vous pourrez échanger avec notre équipe sur la sélection, la substitution et la personnalisation des gammes suivantes :\n\n[Séries de pompes](/fr/products/pumps) : dosage précis, alimentation continue, pipetage automatisé et transfert stable\n[Séries de vannes](/fr/products/valves) : commande marche/arrêt, fermeture de tubes et commutation multicanal\n[Séries de sondes](/fr/products/probes) : sondes d’échantillonnage, sondes de rinçage, sondes de perçage, agitateurs et assemblages de sondes personnalisés\n[Séries de raccords](/fr/products/fittings) : connecteurs pour tubes, raccords pour tubes rigides, raccords Luer, connecteurs rapides et assemblages de tubes personnalisés\n[Séries de tubes](/fr/products/tubing) : tubes souples multi-matériaux, tubes rigides et lignes fluidiques transparentes\n[Série de contrôle intelligent](/fr/products/control) : surveillance de la pression fluidique, détection de bulles et protection du système",
            },
            {
              title: "Qualité et références",
              content:
                "Pour un second fournisseur, la stabilité de la qualité et la maîtrise des procédés sont au cœur de l’évaluation client.\n\nSystèmes certifiés : système de management de la qualité ISO 9001 et système de management de la qualité des dispositifs médicaux ISO 13485.\nProduction maîtrisée : salle blanche de classe 100 000 ; les tubes sont extrudés dans notre propre atelier d’extrusion situé dans la salle blanche, avec des tolérances de diamètres intérieur et extérieur et une fréquence d’échantillonnage définies pour chaque référence ; les pièces clés, comme les composants structurels des pompes et vannes et les connecteurs, sont usinées dans notre propre centre d’usinage.\n![Centre d’extrusion (salle blanche)](/images/about/research-manufacturing/ability/extrusion-center.webp 1220x760)\n![Centre d’usinage](/images/about/research-manufacturing/ability/machining-center.webp 1220x760)\n![Contrôle qualité](/images/about/quality-management.webp 1200x760)\nDocuments de conformité : les documents matières et de conformité (comme les rapports RoHS des tubes) sont disponibles sur demande.\nRéférences de l’entreprise : fondée en 2012, Foreach est reconnue Entreprise nationale spécialisée et innovante « Little Giant » et Entreprise gazelle de Shenzhen, et dispose d’un Centre de recherche en technologie d’ingénierie du Guangdong.\n![Entreprise nationale spécialisée et innovante « Little Giant »](/images/about/foreach/honors/honor-row2-little-giant.webp 692x460)\n![Entreprise gazelle de Shenzhen](/images/about/foreach/honors/honor-row2-gazelle.webp 634x460)\n![Centre de recherche en technologie d’ingénierie du Guangdong](/images/about/foreach/honors/honor-row2-engineering-center.webp 756x460)",
            },
            {
              title: "Prendre rendez-vous sur le stand",
              content:
                "Que vous recherchiez une seconde source pour un équipement déjà en production ou que vous sélectionniez des pompes, vannes et connexions fluidiques pour un nouveau projet, n’hésitez pas à prendre rendez-vous à l’avance : nous organiserons l’entretien selon votre agenda.\n\nComment réserver : écrivez à info@foreachtek.com et nous vous confirmerons l’horaire du rendez-vous.\nÀ préciser : les produits ou références actuelles qui vous intéressent, la date et le créneau souhaités, ainsi que les sujets à aborder (évaluation de substitution, tests d’échantillons, audit fournisseur, etc.).\nFermeture : le dernier jour du salon (jeudi 19 novembre), les halls ferment à 16h00 ; merci d’en tenir compte dans votre programme.\n\nAu plaisir de vous rencontrer à Düsseldorf.",
            },
          ],
          seoTitle: "Foreach à MEDICA 2026 | Stand 1H39-1",
          seoDescription:
            "Foreach au stand 1H39-1 de MEDICA 2026 (Düsseldorf, 16–19 novembre) : évaluation de second fournisseur, échantillons et approvisionnement en pompes, vannes et composants fluidiques.",
        },
  ],
  ko: [
        {
          title: "ADLM 2026에서 Foreach를 만나보세요",
          summary:
            "Foreach는 2026년 7월 26일부터 30일까지 미국 캘리포니아 애너하임에서 개최되는 ADLM 2026에 참가합니다. 부스 4105에서 정밀 유체 제어 부품과 장비용 유로 솔루션을 확인해 보십시오.",
          content: [
            {
              title: "Foreach의 ADLM 2026 참가",
              content:
                "Foreach는 2026년 7월 26일부터 30일까지 애너하임에서 개최되는 ADLM 2026에 참가합니다.\n\n부스 4105에서 체외진단, 생명과학, 분석기기 및 실험실 자동화 장비 제조사와 엔지니어를 만나 유체 제어와 시스템 통합 요구사항을 상담할 예정입니다.",
            },
            {
              title: "주요 전시 제품",
              content:
                "정밀 펌프, 소형 밸브, 유체 피팅, 튜빙, 압력 감지, 기포 감지 제품과 맞춤형 유로 솔루션을 전시합니다.\n\n각 제품은 정밀 정량, 액체 이송, 유로 전환, 압력 모니터링, 기포 감지 및 안정적인 유체 연결에 적용할 수 있습니다.",
            },
            {
              title: "장비 적용을 위한 기술 지원",
              content:
                "Foreach는 개별 부품 공급뿐만 아니라 재질 호환성 검토, 제품 선정, 대체품 검토 및 유로 시스템 통합을 지원합니다.\n\n장비의 소형화, 자동화 및 복잡한 유로 설계 요구사항에 맞춰 필요한 부품과 솔루션을 제안합니다.",
            },
            {
              title: "정밀 유체 제어 기술 역량",
              content:
                "Foreach는 펌프, 밸브, 프로브, 피팅, 튜빙, 센서 및 유로 솔루션 분야에서 정밀 유체 제어 기술을 지속적으로 개발해 왔습니다.\n\n기술 전문성, 제품 개발 능력 및 기업 성장성을 바탕으로 중국 내 전문 혁신 기업 및 고성장 기업으로 인정받았습니다.",
            },
            {
              title: "부스 4105 방문 안내",
              content:
                "새로운 유체 부품, 기존 제품의 대체품 또는 재질 호환성과 시스템 통합 지원이 필요한 경우 부스 4105를 방문해 주십시오.\n\n전시회: ADLM 2026\n일정: 2026년 7월 26일–30일\n장소: 미국 캘리포니아 애너하임\n부스: 4105\n\n애너하임에서 만나 뵙기를 기대합니다.",
            },
          ],
          seoTitle: "ADLM 2026에서 Foreach를 만나보세요 | 부스 4105",
          seoDescription:
            "ADLM 2026 부스 4105에서 Foreach의 정밀 유체 제어 부품과 장비용 유로 솔루션을 확인해 보십시오.",
        },
    ["Foreach, ADLM 2026에서 핵심 미세유체 부품 전시", "Foreach는 IVD, 실험실 자동화 및 생명과학 장비용 펌프, 밸브, 피팅, 튜브, 센서와 유체 부품을 선보입니다.", "IVD 및 실험실 자동화 적용", "피스톤·시린지·다이어프램 펌프, 솔레노이드·로터리 밸브, 피팅, 튜브와 센서를 전시합니다.", "장기 통합을 위한 신뢰성 높은 유체 제어", "전시 기간에 제품 선정, 재질 호환성, 시스템 통합 및 적용 요구를 고객과 논의합니다.", "Foreach를 만나 보세요", "IVD, 생명과학, 실험실 자동화 및 분석 장비 고객을 초대해 유체 제어와 시스템 요구를 상담합니다."],
    ["Foreach, 2026 ME Supply Chain Expo 참가", "Foreach는 2-M46 부스에서 핵심 제품, 기술 역량과 다양한 적용 솔루션을 선보입니다.", "전시 정보", "중국 Shenzhen World Exhibition & Convention Center에서 개최되며 Foreach 부스는 2-M46입니다.", "주요 전시 내용", "제품과 기술 역량, 다양한 솔루션을 소개하여 제품 가치와 서비스 역량을 전달합니다.", "현장 상담", "2-M46 부스에서 제품 적용, 시장 요구 및 협력 기회를 논의해 보세요."],
    ["Foreach, Guangzhou High Medical Expo 2026 초청", "Foreach는 3월 30일부터 4월 1일까지 B529 부스에 참가합니다.", "전시 정보", "2026년 3월 30일부터 4월 1일까지 중국 Guangzhou Airport Expo Center에서 열리며 부스는 B529입니다.", "제품 및 솔루션 전시", "핵심 제품, 기술 역량과 산업 솔루션을 통해 특징과 장점을 소개합니다.", "방문 안내", "고객, 파트너 및 업계 관계자를 B529 부스로 초대해 적용, 선정 및 협력을 상담합니다."],
    ["초청: CACLP 2026 Foreach 부스 방문", "Foreach는 3월 21일부터 23일까지 2-0424 부스에 참가합니다.", "전시 정보", "중국 Xiamen International Expo Center에서 2026년 3월 21일부터 23일까지 열리며 부스는 2-0424입니다.", "주요 전시 내용", "핵심 제품, 기술 역량과 산업 솔루션을 소개하여 제품과 서비스의 장점을 전달합니다.", "2-0424 부스 방문", "고객, 파트너와 업계 관계자를 초대해 제품과 협력 기회를 논의합니다."],
    ["Foreach, WHX Labs Dubai 2026 참가", "Foreach는 H2.F34 부스에서 핵심 미세유체 제품, 기술력과 적용 솔루션을 선보입니다.", "전시 정보", "2026년 2월 10일부터 13일까지 UAE Dubai World Trade Centre에서 열리며 부스는 H2.F34입니다.", "국제 시장 소통", "국제 시장과의 교류를 확대하고 다양한 적용을 위한 제품, 기술과 솔루션을 소개합니다.", "팀과의 만남", "현장에서 제품 특징, 적용 분야, 맞춤 요구 및 협력 방식을 상담할 수 있습니다."],
    ["Foreach, 2025 전문화·혁신 중소기업 발전 회의 초청 참가", "Foreach는 선전의 초청 대표 기업 중 하나로 회의에 참가했습니다.", "초청 대표 기업", "11월 12일 충칭에서 열린 회의에 Foreach가 선전 대표 기업으로 참가했습니다.", "선전 대표단", "정부와 산업 단체 관계자 및 국가급 전문화·혁신 Little Giant 기업 대표가 함께했습니다.", "미세유체 분야에 지속 집중", "국가급 Little Giant 기업으로서 핵심 미세유체 부품, 유체 시스템과 적용 중심 혁신에 계속 집중합니다."],
    ["Foreach, 2025 Medical Device Innovation Expo 초청", "Foreach는 8월 21일부터 23일까지 B36 부스에 참가합니다.", "전시 정보", "2025년 8월 21일부터 23일까지 중국 Suzhou International Expo Center에서 열리며 부스는 B36입니다.", "제품 전시", "핵심 제품, 기술 역량과 산업 솔루션을 소개하여 제품 특성과 서비스 가치를 전달합니다.", "방문 안내", "B36 부스에서 산업 동향, 적용 요구와 향후 협력 기회를 논의해 보세요."],
    ["Foreach, 가젤 기업으로 선정", "Foreach는 혁신 역량, 성장 동력과 시장 성과를 인정받아 가젤 기업으로 선정되었습니다.", "성장과 혁신에 대한 인정", "가젤 기업 선정은 Foreach의 혁신 역량과 성장세 및 시장 성과를 보여 줍니다.", "미세유체 기술에 지속 집중", "의료 진단, 환경, 실험실, 생명과학과 합성생물학을 위한 정밀 미세유체 제어 기술을 개발하고 산업화합니다.", "고객 적용을 위한 혁신", "펌프, 밸브, 프로브, 피팅, 센서와 시스템 지원 역량을 계속 강화해 신뢰할 수 있는 제품과 서비스를 제공합니다."],
    ["Foreach, 광밍구 우수 품질 육성 프로젝트 심사 통과", "2024년 심사 통과는 품질 관리와 기술 혁신의 지속적인 발전을 보여 줍니다.", "프로젝트 심사 통과", "Foreach의 품질 관리 발전, 기술 혁신과 지속적인 개선을 인정받았습니다.", "품질 관리의 지속 개선", "품질 관리는 미세유체 핵심 부품의 안정적 공급 기반입니다. Foreach는 품질 시스템과 서비스 역량을 계속 개선합니다.", "고객을 위한 신뢰성 높은 지원", "IVD, 생명과학, 실험실 자동화와 관련 분야에 안정적인 제품과 전문 서비스를 계속 제공합니다."],
    ["Foreach, 국가급 전문화·혁신 Little Giant 기업으로 선정", "미세유체 제어에 대한 장기적인 집중과 혁신을 인정받았습니다.", "국가급 Little Giant 인정", "Foreach는 미세유체 제어 기술의 전문성과 혁신을 인정받았습니다.", "미세유체 제어에 집중", "펌프, 밸브, 프로브, 피팅, 센서 및 관련 모듈을 포함한 핵심 부품과 시스템 역량을 개발합니다.", "고객을 위한 전문 지원", "전문화, 정교화, 차별화와 혁신을 바탕으로 신뢰할 수 있는 부품과 시스템 솔루션을 제공합니다."],
    ["Foreach, CMEF & ICMD 2014 가을 전시회 성공적으로 마무리", "Foreach는 신제품 라인을 선보이고 고객과 미세유체 시스템 적용을 논의했습니다.", "성공적인 전시", "업그레이드 제품과 신제품 라인이 많은 방문객과 고객의 관심을 받았습니다.", "기술 교류", "의료기기 제조 맞춤 서비스 기술 혁신 포럼에서 산업 과제와 전문 솔루션에 대한 기술 정보를 공유했습니다.", "IVD 및 관련 분야 지원", "많은 고객이 제품 시리즈와 시스템 역량을 확인했습니다. Foreach는 전문 제품과 서비스로 IVD 산업을 계속 지원합니다."],
        {
          title: "MEDICA 2026에서 Foreach를 만나보세요 | 부스 1H39-1",
          summary:
            "Foreach는 2026년 11월 16~19일 독일 뒤셀도르프에서 열리는 MEDICA 2026의 1H39-1 부스에서 OEM 장비 제조사와 펌프, 밸브 및 유체 부품의 세컨드 소스 평가, 샘플 테스트, 장기 공급에 대해 상담합니다. 현장 미팅을 미리 예약해 주세요.",
          coverAlt: "메세 뒤셀도르프 전시장 입구",
          content: [
            {
              title: "1H39-1 부스를 방문해야 하는 이유",
              content:
                "MEDICA는 세계 최대 규모의 의료 산업 B2B 전시회 중 하나로, 의료기기 공급망 전시회인 COMPAMED와 함께 개최됩니다. 이번 전시회에서 Foreach는 이미 양산 중이거나 개발 중인 OEM 장비 프로젝트를 중심으로, 평가와 대체 적용이 가능하고 장기 공급이 가능한 세컨드 소스를 제공하여 단일 공급원 리스크를 줄일 수 있도록 지원합니다.\n\n공급업체 자격 심사: 공급업체 등록 평가와 품질 시스템 감사를 지원합니다.\n신속한 샘플 테스트: 펌프, 밸브 및 유체 부품 샘플을 신속하게 제공하여 고객 장비에서 검증할 수 있습니다.\n호환 대체 평가: 기존 부품과 비교해 인터페이스, 성능 및 소재 적합성을 평가합니다.\n장기 양산 공급: OEM 장비 프로젝트에 안정적이고 지속적인 양산 공급을 제공합니다.",
            },
            {
              title: "부스에서 상담 가능한 제품",
              content:
                "전시 기간 동안 아래 제품군의 선정, 대체 및 맞춤 제작 요구 사항에 대해 저희 팀과 현장에서 상담하실 수 있습니다.\n\n[펌프 시리즈](/ko/products/pumps): 정밀 정량, 연속 공급, 자동 피펫팅 및 안정적인 이송\n[밸브 시리즈](/ko/products/valves): 온오프 제어, 튜빙 차단 및 다중 채널 전환\n[프로브 시리즈](/ko/products/probes): 샘플링 프로브, 린싱 프로브, 피어싱 프로브, 교반기 및 맞춤형 프로브 어셈블리\n[피팅 시리즈](/ko/products/fittings): 튜빙 커넥터, 리지드 튜빙 피팅, 루어 피팅, 퀵 커넥터 및 맞춤형 튜빙 어셈블리\n[튜빙 시리즈](/ko/products/tubing): 다중 소재 플렉시블 튜빙, 리지드 튜빙 및 투명 유체 라인\n[스마트 제어 시리즈](/ko/products/control): 유체 압력 모니터링, 기포 감지 및 시스템 보호",
            },
            {
              title: "품질 및 인증",
              content:
                "세컨드 소스 공급업체에게 안정적인 품질과 공정 관리는 고객 평가의 핵심입니다.\n\n인증 체계: ISO 9001 품질경영시스템, ISO 13485 의료기기 품질경영시스템.\n생산 관리: 10만 등급 클린룸을 운영하며, 튜빙은 클린룸 내 자체 압출 작업장에서 생산하고 규격별로 내경·외경 공차와 샘플링 검사 주기를 설정합니다. 펌프·밸브 구조 부품과 커넥터 등 핵심 부품은 자체 가공 센터에서 가공합니다.\n![압출 센터(클린룸)](/images/about/research-manufacturing/ability/extrusion-center.webp 1220x760)\n![가공 센터](/images/about/research-manufacturing/ability/machining-center.webp 1220x760)\n![품질 검사](/images/about/quality-management.webp 1200x760)\n규제 준수 문서: 소재 및 규제 준수 문서(예: 튜빙 RoHS 보고서)는 요청 시 제공합니다.\n기업 자격: 2012년에 설립되었으며, 국가급 전정특신 ‘작은 거인’ 기업 및 선전시 가젤 기업으로 인정받았고, 광둥성 공정기술 연구센터를 보유하고 있습니다.\n![국가급 전정특신 ‘작은 거인’ 기업](/images/about/foreach/honors/honor-row2-little-giant.webp 692x460)\n![선전시 가젤 기업](/images/about/foreach/honors/honor-row2-gazelle.webp 634x460)\n![광둥성 공정기술 연구센터](/images/about/foreach/honors/honor-row2-engineering-center.webp 756x460)",
            },
            {
              title: "현장 미팅 예약",
              content:
                "이미 양산 중인 장비의 세컨드 소스를 찾고 계시든, 신규 프로젝트를 위한 펌프, 밸브 및 유체 연결 부품을 선정하고 계시든, 미리 예약해 주시면 일정에 맞춰 현장 미팅을 준비하겠습니다.\n\n예약 방법: info@foreachtek.com으로 이메일을 보내 주시면 미팅 시간을 확인해 드립니다.\n예약 시 기재 사항: 관심 제품 또는 현재 사용 중인 부품 모델, 희망 날짜와 시간대, 논의하고 싶은 내용(예: 대체 평가, 샘플 테스트, 공급업체 심사)을 알려 주세요.\n폐장 안내: 전시회 마지막 날(11월 19일 목요일)은 16:00에 폐장하니 일정에 참고해 주세요.\n\n뒤셀도르프에서 뵙기를 기대합니다.",
            },
          ],
          seoTitle: "MEDICA 2026 Foreach | 부스 1H39-1",
          seoDescription:
            "Foreach는 2026년 11월 16~19일 독일 뒤셀도르프 MEDICA 2026 1H39-1 부스에서 OEM 장비 프로젝트를 위한 펌프, 밸브 및 유체 부품의 세컨드 소스 평가, 샘플 테스트, 장기 공급을 지원합니다. 현장 미팅을 예약하세요.",
        },
  ],
  ru: [
        {
          title: "Встретьтесь с Foreach на выставке ADLM 2026",
          summary:
            "Foreach примет участие в выставке ADLM 2026, которая пройдет с 26 по 30 июля 2026 года в Анахайме, штат Калифорния. На стенде 4105 будут представлены компоненты для точного управления жидкостями и решения для интеграции жидкостных систем.",
          content: [
            {
              title: "Участие Foreach в ADLM 2026",
              content:
                "С 26 по 30 июля 2026 года Foreach примет участие в выставке ADLM 2026 в Анахайме, штат Калифорния.\n\nНа стенде 4105 специалисты компании будут обсуждать с производителями приборов и инженерами вопросы выбора компонентов, совместимости материалов и интеграции жидкостных систем.",
            },
            {
              title: "Оборудование и компоненты на стенде",
              content:
                "На выставке будут представлены прецизионные насосы, миниатюрные клапаны, фитинги, трубки, датчики давления, системы обнаружения пузырьков и решения для индивидуальной конфигурации жидкостных контуров.\n\nКомпоненты предназначены для точного дозирования, транспортировки жидкости, переключения потоков, контроля давления, обнаружения пузырьков и надежного соединения элементов системы.",
            },
            {
              title: "Поддержка приборных применений",
              content:
                "Решения Foreach применяются в системах диагностики in vitro, оборудовании для наук о жизни, аналитических приборах и лабораторной автоматизации.\n\nКомпания оказывает поддержку при подборе компонентов, анализе химической совместимости материалов, поиске аналогов и интеграции компонентов в существующие системы.",
            },
            {
              title: "Опыт в области точного управления жидкостями",
              content:
                "Foreach последовательно развивает технологии точного управления жидкостями, включая насосы, клапаны, зонды, фитинги, трубки, датчики и комплексные жидкостные решения.\n\nТехническая специализация, разработка продукции и устойчивый рост компании получили отраслевое признание в Китае.",
            },
            {
              title: "Посетите стенд 4105",
              content:
                "Если вам требуется новый компонент, замена существующего изделия или техническая поддержка по совместимости материалов и интеграции системы, посетите стенд 4105.\n\nВыставка: ADLM 2026\nДаты: 26–30 июля 2026 года\nМесто: Анахайм, Калифорния, США\nСтенд: 4105\n\nБудем рады обсудить ваши технические задачи на выставке.",
            },
          ],
          seoTitle: "Foreach на выставке ADLM 2026 | Стенд 4105",
          seoDescription:
            "Посетите стенд Foreach 4105 на выставке ADLM 2026 и ознакомьтесь с компонентами для точного управления жидкостями.",
        },
    ["Foreach представит ключевые микрофлюидные компоненты на ADLM 2026", "Foreach покажет насосы, клапаны, фитинги, трубки, датчики и компоненты для IVD, лабораторной автоматизации и наук о жизни.", "Для IVD и лабораторной автоматизации", "Будут представлены поршневые, шприцевые и мембранные насосы, электромагнитные и поворотные клапаны, фитинги, трубки и датчики.", "Надёжное управление жидкостью для длительной интеграции", "Foreach обсудит с клиентами подбор, совместимость материалов, системную интеграцию и прикладные требования.", "Встретьтесь с Foreach", "Приглашаем специалистов IVD, наук о жизни, автоматизации и аналитических приборов обсудить управление жидкостью и системные задачи."],
    ["Foreach примет участие в ME Supply Chain Expo 2026", "На стенде 2-M46 Foreach представит ключевую продукцию, технические возможности и решения для разных применений.", "Информация о выставке", "Выставка пройдёт в Shenzhen World Exhibition & Convention Center, Китай. Стенд Foreach — 2-M46.", "Что мы представим", "Продукция, технические возможности и решения помогут посетителям лучше понять ценность и сервисные возможности Foreach.", "Общение на стенде", "Посетите стенд 2-M46, чтобы обсудить применение продукции, потребности рынка и сотрудничество."],
    ["Приглашение Foreach на Guangzhou High Medical Expo 2026", "Foreach будет участвовать с 30 марта по 1 апреля на стенде B529.", "Информация о выставке", "Выставка пройдёт в Guangzhou Airport Expo Center, Китай, с 30 марта по 1 апреля 2026 года. Наш стенд — B529.", "Продукция и решения", "Мы представим ключевую продукцию, технические возможности и отраслевые решения, их особенности и преимущества.", "Приглашаем посетить", "Ждём клиентов, партнёров и специалистов на стенде B529 для обсуждения задач, подбора и сотрудничества."],
    ["Приглашение: встретьтесь с Foreach на CACLP 2026", "Foreach будет участвовать с 21 по 23 марта на стенде 2-0424.", "Информация о выставке", "CACLP 2026 пройдёт с 21 по 23 марта в Xiamen International Expo Center, Китай. Стенд Foreach — 2-0424.", "Что мы представим", "Ключевая продукция, технические возможности и отраслевые решения продемонстрируют преимущества наших продуктов и сервиса.", "Приглашаем на стенд 2-0424", "Ждём клиентов, партнёров и специалистов для обсуждения продукции и возможностей сотрудничества."],
    ["Foreach примет участие в WHX Labs Dubai 2026", "На стенде H2.F34 Foreach представит ключевую микрофлюидную продукцию, технологии и прикладные решения.", "Информация о выставке", "Выставка пройдёт с 10 по 13 февраля 2026 года в Dubai World Trade Centre, ОАЭ. Наш стенд — H2.F34.", "Диалог с международным рынком", "Это возможность расширить международное общение и показать продукцию, технологии и решения для разных задач.", "Встретьтесь с нашей командой", "Обсудите характеристики, применения, индивидуальные требования и модели сотрудничества с командой Foreach."],
    ["Foreach приглашена на конференцию 2025 года по развитию специализированных и инновационных МСП", "Foreach участвовала как одно из приглашённых предприятий — представителей Шэньчжэня.", "Приглашённое предприятие", "Конференция открылась 12 ноября в Чунцине, где Foreach выступила представителем предприятий Шэньчжэня.", "Делегация Шэньчжэня", "В делегацию вошли представители властей, отраслевых организаций и национальных предприятий Little Giant.", "Продолжение работы в микрофлюидике", "Как национальное предприятие Little Giant, Foreach продолжит развивать компоненты, гидравлические системы и прикладные инновации."],
    ["Приглашение Foreach на Medical Device Innovation Expo 2025", "Foreach будет участвовать с 21 по 23 августа на стенде B36.", "Информация о выставке", "Выставка пройдёт с 21 по 23 августа 2025 года в Suzhou International Expo Center, Китай. Стенд Foreach — B36.", "Экспозиция продукции", "Foreach представит ключевую продукцию, технические возможности и отраслевые решения, их особенности и сервисную ценность.", "Приглашаем посетить", "Ждём клиентов, партнёров и специалистов на стенде B36 для обсуждения тенденций, задач и сотрудничества."],
    ["Foreach признана предприятием-газелью", "Признание отражает инновационный потенциал, темпы роста и рыночные результаты компании.", "Признание роста и инноваций", "Статус предприятия-газели подтверждает инновационные возможности, динамику роста и рыночные результаты Foreach.", "Постоянное внимание микрофлюидным технологиям", "Foreach разрабатывает и внедряет точное микрофлюидное управление для диагностики, экологии, лабораторий, наук о жизни и синтетической биологии.", "Инновации для задач клиентов", "Мы продолжим совершенствовать насосы, клапаны, зонды, фитинги, датчики и системную поддержку для надёжных продуктов и услуг."],
    ["Foreach прошла проверку проекта повышения качества района Гуанмин", "Проверка 2024 года отражает постоянный прогресс в управлении качеством и технологических инновациях.", "Проверка проекта пройдена", "Результат подтверждает развитие управления качеством, технологические инновации и постоянное совершенствование Foreach.", "Постоянное улучшение управления качеством", "Управление качеством — основа стабильных поставок компонентов. Foreach продолжит улучшать систему и сервис.", "Надёжная поддержка клиентов", "Foreach продолжит поддерживать IVD, науки о жизни, лабораторную автоматизацию и смежные области стабильной продукцией и профессиональным сервисом."],
    ["Foreach признана национальным специализированным и инновационным предприятием Little Giant", "Признание отмечает многолетнюю специализацию и инновации в области микрофлюидного управления.", "Национальное признание Little Giant", "Foreach получила признание за специализацию и инновации в технологиях микрофлюидного управления.", "Работа над микрофлюидным управлением", "Foreach развивает насосы, клапаны, зонды, фитинги, датчики, модули и поддержку гидравлических систем.", "Профессиональная поддержка клиентов", "Мы продолжим совершенствовать специализированные, точные, отличительные и инновационные продукты и услуги для надёжных системных решений."],
    ["Foreach успешно завершила участие в CMEF & ICMD Осень 2014", "Foreach представила новые линейки и обсудила с клиентами применение микрофлюидных систем.", "Успешная выставка", "Обновлённая продукция и новые линейки Foreach привлекли внимание многочисленных посетителей и клиентов.", "Технический обмен", "На форуме инноваций в производстве медицинских изделий Foreach поделилась техническими знаниями и обсудила отраслевые задачи.", "Поддержка IVD и смежных областей", "Многие клиенты познакомились с нашими сериями и системными возможностями. Foreach продолжит профессионально поддерживать отрасль IVD."],
        {
          title: "Foreach на выставке MEDICA 2026 | Стенд 1H39-1",
          summary:
            "С 16 по 19 ноября 2026 года Foreach будет работать на стенде 1H39-1 выставки MEDICA 2026 в Дюссельдорфе (Германия) и обсуждать с производителями OEM-оборудования оценку второго поставщика, тестирование образцов и долгосрочные поставки насосов, клапанов и жидкостных компонентов. Приглашаем заранее записаться на встречу.",
          coverAlt: "Вход в выставочный центр Messe Düsseldorf",
          content: [
            {
              title: "Почему стоит посетить стенд 1H39-1",
              content:
                "MEDICA — одна из крупнейших в мире B2B-выставок медицинской отрасли; она проходит одновременно с COMPAMED — выставкой цепочки поставок для производителей медицинских изделий. На этой выставке Foreach ориентируется на проекты OEM-оборудования, которые уже выпускаются серийно или находятся в разработке, и предлагает второй источник поставок, который можно оценить, квалифицировать для замены и получать на долгосрочной основе, снижая риск зависимости от одного поставщика.\n\nКвалификация поставщика: помогаем пройти оценку при включении в перечень поставщиков и аудит системы качества.\nБыстрые образцы: образцы насосов, клапанов и жидкостных компонентов предоставляются оперативно для проверки на вашем оборудовании.\nОценка замены: сравниваем с вашими текущими деталями совместимость интерфейсов, характеристик и материалов.\nДолгосрочные поставки: стабильные и непрерывные серийные поставки для проектов OEM-оборудования.",
            },
            {
              title: "Продукция для обсуждения на стенде",
              content:
                "Во время выставки вы сможете обсудить с нашей командой подбор, замену и индивидуальные решения по следующим линейкам продукции:\n\n[Серии насосов](/ru/products/pumps): точное дозирование, непрерывная подача, автоматическое пипетирование и стабильная передача\n[Серии клапанов](/ru/products/valves): управление вкл./выкл., перекрытие трубок и многоканальное переключение\n[Серии зондов](/ru/products/probes): пробоотборные зонды, промывочные зонды, прокалывающие зонды, мешалки и индивидуальные узлы зондов\n[Серии фитингов](/ru/products/fittings): соединители для трубок, фитинги для жестких трубок, фитинги Luer, быстроразъемные соединители и индивидуальные трубные сборки\n[Серии трубок](/ru/products/tubing): многоматериальные гибкие трубки, жесткие трубки и прозрачные жидкостные линии\n[Серия интеллектуального управления](/ru/products/control): мониторинг давления жидкости, обнаружение пузырьков и защита системы",
            },
            {
              title: "Качество и квалификация",
              content:
                "Для второго поставщика стабильное качество и управляемые процессы — главное, что оценивает заказчик.\n\nСертифицированные системы: система менеджмента качества ISO 9001 и система менеджмента качества медицинских изделий ISO 13485.\nКонтролируемое производство: чистое помещение класса 100 000; трубки производятся на собственном экструзионном участке внутри чистого помещения, для каждого типоразмера заданы допуски на внутренний и наружный диаметр и периодичность выборочного контроля; ключевые детали, включая конструктивные элементы насосов и клапанов и соединители, изготавливаются в собственном механообрабатывающем центре.\n![Экструзионный центр (чистое помещение)](/images/about/research-manufacturing/ability/extrusion-center.webp 1220x760)\n![Механообрабатывающий центр](/images/about/research-manufacturing/ability/machining-center.webp 1220x760)\n![Контроль качества](/images/about/quality-management.webp 1200x760)\nДокументы о соответствии: документы на материалы и о соответствии (например, отчеты RoHS для трубок) предоставляются по запросу.\nСтатус компании: основана в 2012 году; признана Национальным специализированным инновационным предприятием «Малый гигант» и Газель-предприятием города Шэньчжэнь, имеет Инженерно-технологический исследовательский центр провинции Гуандун.\n![Национальное специализированное инновационное предприятие «Малый гигант»](/images/about/foreach/honors/honor-row2-little-giant.webp 692x460)\n![Газель-предприятие города Шэньчжэнь](/images/about/foreach/honors/honor-row2-gazelle.webp 634x460)\n![Инженерно-технологический исследовательский центр провинции Гуандун](/images/about/foreach/honors/honor-row2-engineering-center.webp 756x460)",
            },
            {
              title: "Запись на встречу на стенде",
              content:
                "Если вы ищете второй источник поставок для уже выпускаемого оборудования или подбираете насосы, клапаны и жидкостные соединения для нового проекта, запишитесь на встречу заранее — мы организуем ее с учетом вашего графика.\n\nКак записаться: напишите на info@foreachtek.com, и мы подтвердим время встречи.\nУкажите в письме: интересующую продукцию или номера используемых деталей, удобные дату и время, а также темы для обсуждения (например, оценка замены, тестирование образцов, аудит поставщика).\nВремя закрытия: в последний день выставки (четверг, 19 ноября) павильоны закрываются в 16:00 — учтите это при планировании.\n\nБудем рады встрече в Дюссельдорфе.",
            },
          ],
          seoTitle: "Foreach на MEDICA 2026 | Стенд 1H39-1",
          seoDescription:
            "Foreach на MEDICA 2026 (Дюссельдорф, 16–19 ноября), стенд 1H39-1: оценка второго поставщика, образцы и долгосрочные поставки насосов, клапанов и жидкостных компонентов.",
        },
  ],
};

function isStructuredArticleTranslation(
  translation: ArticleTranslation
): translation is StructuredArticleTranslation {
  return !Array.isArray(translation);
}

export function localizeNews(
  locale: ForeignLocale,
  base: NewsPageData
): NewsPageData {
  const copy = pageTranslations[locale];
  const translations = articleTranslations[locale];

  return {
    ...base,
    locale,
    hero: {
      ...base.hero,
      title: copy.heroTitle,
      description: copy.heroDescription,
    },
    breadcrumbs: [
      { label: copy.home, href: `/${locale}` },
      {
        label: copy.resources,
        href: `/${locale}/resources`,
      },
      { label: copy.current },
    ],
    search: { placeholder: copy.search },
    categories: base.categories.map(
      (category, index) => ({
        ...category,
        label:
          copy.categories[index] ?? category.label,
      })
    ),
    sectionTitle: copy.sectionTitle,
    articles: base.articles.map((article, index) => {
      const translation = translations[index];

      if (!translation) {
        return article;
      }

      if (isStructuredArticleTranslation(translation)) {
        return {
          ...article,
          title: translation.title,
          summary: translation.summary,
          coverAlt: translation.coverAlt ?? article.coverAlt,
          content: translation.content.map((block) => ({
            title: block.title,
            content: block.content,
          })),
          seoTitle:
            translation.seoTitle ?? translation.title,
          seoDescription:
            translation.seoDescription ??
            translation.summary,
        };
      }

      return {
        ...article,
        title: translation[0],
        summary: translation[1],
        content: [
          {
            title: translation[2],
            content: translation[3],
          },
          {
            title: translation[4],
            content: translation[5],
          },
          {
            title: translation[6],
            content: translation[7],
          },
        ],
        seoTitle: translation[0],
        seoDescription: translation[1],
      };
    }),
    bottomBanner: {
      title: copy.bannerTitle,
      description: copy.bannerDescription,
      actions: [
        {
          label: copy.contact,
          href: `/${locale}/contact`,
        },
      ],
    },
  };
}
