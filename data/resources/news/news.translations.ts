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
    heroTitle: "Noticias", heroDescription: "Siga las novedades de FOREACH sobre ferias, desarrollo empresarial, innovación tecnológica, sistemas de calidad y anuncios importantes.",
    home: "Inicio", resources: "Recursos", current: "Noticias", search: "Introduzca palabras clave",
    categories: ["Todas", "Ferias", "Novedades de la empresa", "Anuncios"], sectionTitle: "Últimas novedades",
    bannerTitle: "¿Necesita más información sobre productos o colaboración?", bannerDescription: "Puede enviar sus requisitos, descargar fichas técnicas o conocer el apoyo de FOREACH a sus distribuidores.", contact: "Contactar",
  },
  fr: {
    heroTitle: "Actualités", heroDescription: "Suivez les actualités FOREACH sur les salons, le développement de l’entreprise, l’innovation technologique, la qualité et les annonces importantes.",
    home: "Accueil", resources: "Ressources", current: "Actualités", search: "Saisissez des mots-clés",
    categories: ["Toutes", "Salons", "Actualités de l’entreprise", "Annonces"], sectionTitle: "Dernières actualités",
    bannerTitle: "Besoin de plus d’informations sur nos produits ou nos partenariats ?", bannerDescription: "Transmettez vos besoins, téléchargez les fiches techniques ou découvrez l’accompagnement des distributeurs FOREACH.", contact: "Nous contacter",
  },
  ko: {
    heroTitle: "뉴스", heroDescription: "전시회, 기업 발전, 기술 혁신, 품질 시스템 및 주요 공지에 관한 FOREACH의 최신 소식을 확인하세요.",
    home: "홈", resources: "자료", current: "뉴스", search: "키워드를 입력하세요",
    categories: ["전체", "전시회", "기업 소식", "공지"], sectionTitle: "최신 소식",
    bannerTitle: "제품 또는 협력 정보가 더 필요하신가요?", bannerDescription: "제품 요구 사항을 제출하거나 데이터시트를 다운로드하고 FOREACH 대리점 협력 지원을 확인할 수 있습니다.", contact: "문의하기",
  },
  ru: {
    heroTitle: "Новости", heroDescription: "Новости FOREACH о выставках, развитии компании, технологических инновациях, системе качества и важных объявлениях.",
    home: "Главная", resources: "Ресурсы", current: "Новости", search: "Введите ключевые слова",
    categories: ["Все", "Выставки", "Новости компании", "Объявления"], sectionTitle: "Последние новости",
    bannerTitle: "Нужна дополнительная информация о продукции или сотрудничестве?", bannerDescription: "Отправьте требования, загрузите технические описания или узнайте о поддержке дистрибьюторов FOREACH.", contact: "Связаться",
  },
};

const articleTranslations: Record<ForeignLocale, readonly ArticleTranslation[]> = {
  es: [
        {
          title: "Conozca a FOREACH en ADLM 2026",
          summary:
            "FOREACH participará en ADLM 2026, que se celebrará del 26 al 30 de julio de 2026 en Anaheim, California. Le invitamos a visitar el stand 4105 para conocer nuestros componentes de control de fluidos y soluciones para sistemas fluídicos.",
          content: [
            {
              title: "FOREACH estará presente en ADLM 2026",
              content:
                "Del 26 al 30 de julio de 2026, FOREACH participará en ADLM 2026 en Anaheim, California.\n\nEn el stand 4105, nuestro equipo conversará con fabricantes de instrumentos, ingenieros y socios del sector sobre selección de componentes, compatibilidad de materiales e integración de sistemas fluídicos.",
            },
            {
              title: "Productos y soluciones que presentaremos",
              content:
                "Presentaremos bombas de precisión, válvulas miniatura, racores, tubos, sensores de presión, sistemas de detección de burbujas y soluciones fluídicas personalizadas.\n\nEstos productos se utilizan en funciones clave como dosificación precisa, transferencia de líquidos, conmutación de circuitos, supervisión de presión, detección de burbujas y conexión de líneas de fluido.",
            },
            {
              title: "Soporte para diferentes aplicaciones",
              content:
                "FOREACH ofrece productos y soporte técnico para diagnóstico in vitro, ciencias de la vida, instrumentos analíticos y automatización de laboratorio.\n\nNuestro equipo también ayuda a los clientes a evaluar productos alternativos, seleccionar materiales compatibles y simplificar la integración de los componentes en sus equipos.",
            },
            {
              title: "Experiencia técnica y desarrollo continuo",
              content:
                "FOREACH desarrolla tecnologías de control preciso de fluidos y ha creado una gama de productos que incluye bombas, válvulas, sondas, racores, tubos y sensores.\n\nLa empresa ha recibido reconocimientos en China por su especialización, capacidad de innovación y crecimiento empresarial.",
            },
            {
              title: "Le esperamos en el stand 4105",
              content:
                "Si busca componentes fluídicos, alternativas para productos existentes o apoyo para resolver necesidades de selección e integración, le invitamos a visitar nuestro stand.\n\nEvento: ADLM 2026\nFecha: 26–30 de julio de 2026\nLugar: Anaheim, California, Estados Unidos\nStand: 4105\n\nEsperamos poder conversar con usted en Anaheim.",
            },
          ],
          seoTitle: "FOREACH en ADLM 2026 | Stand 4105",
          seoDescription:
            "Visite el stand 4105 de FOREACH en ADLM 2026 para conocer componentes de control de fluidos y soluciones para sistemas fluídicos.",
        },,
    ["FOREACH presentará sus componentes microfluídicos principales en ADLM 2026", "FOREACH participará en ADLM 2026 con bombas, válvulas, racores, tubos, sensores y componentes fluídicos para IVD, automatización de laboratorio y ciencias de la vida.", "Para aplicaciones IVD y de automatización de laboratorio", "FOREACH presentará bombas de émbolo, jeringa y diafragma, electroválvulas, válvulas rotativas, racores, tubos y sensores.", "Control de fluidos fiable para integración a largo plazo", "Durante la feria, FOREACH abordará con clientes y socios la selección, la compatibilidad de materiales, la integración del sistema y las necesidades de aplicación.", "Conozca a FOREACH", "Invitamos a profesionales de IVD, ciencias de la vida, automatización e instrumentos analíticos a conversar con nuestro equipo sobre el control y la integración de fluidos."],
    ["FOREACH participará en ME Supply Chain Expo 2026", "FOREACH estará en el stand 2-M46 y mostrará productos principales, capacidades técnicas y soluciones para múltiples aplicaciones.", "Información de la feria", "La feria se celebrará en Shenzhen World Exhibition & Convention Center, China. El stand de FOREACH es el 2-M46.", "Qué presentaremos", "FOREACH mostrará productos, capacidades técnicas y soluciones para que los visitantes comprendan mejor nuestro valor y capacidad de servicio.", "Comunicación en el stand", "Visite el stand 2-M46 para hablar con nuestro equipo sobre aplicaciones, necesidades del mercado y oportunidades de cooperación."],
    ["Invitación de FOREACH a Guangzhou High Medical Expo 2026", "FOREACH participará del 30 de marzo al 1 de abril en el stand B529.", "Información de la feria", "FOREACH estará en Guangzhou Airport Expo Center, China, del 30 de marzo al 1 de abril de 2026. Nuestro stand es el B529.", "Exposición de productos y soluciones", "Presentaremos productos, capacidades técnicas y soluciones industriales para explicar sus características y ventajas.", "Bienvenidos al stand", "Invitamos a clientes, socios y profesionales a visitar el stand B529 y conversar sobre aplicaciones, selección y cooperación."],
    ["Invitación: visite FOREACH en CACLP 2026", "FOREACH participará en CACLP 2026 del 21 al 23 de marzo en el stand 2-0424.", "Información de la feria", "CACLP 2026 se celebrará del 21 al 23 de marzo en Xiamen International Expo Center, China. El stand de FOREACH es el 2-0424.", "Qué presentaremos", "Mostraremos productos principales, capacidades técnicas y soluciones industriales para explicar nuestras ventajas de producto y servicio.", "Bienvenidos al stand 2-0424", "Invitamos a clientes, socios y profesionales a visitar el stand para conversar sobre productos y oportunidades de cooperación."],
    ["FOREACH participará en WHX Labs Dubai 2026", "FOREACH estará en el stand H2.F34 con productos microfluídicos, capacidades técnicas y soluciones de aplicación.", "Información de la feria", "FOREACH participará del 10 al 13 de febrero de 2026 en Dubai World Trade Centre, EAU. Nuestro stand es el H2.F34.", "Comunicación con el mercado internacional", "Esta feria es una oportunidad para ampliar el diálogo internacional y presentar productos, capacidades y soluciones para distintos escenarios.", "Conozca a nuestro equipo", "Los visitantes podrán conversar sobre características, aplicaciones, personalización y modalidades de cooperación con el equipo de FOREACH."],
    ["FOREACH fue invitada a la Conferencia 2025 de desarrollo de pymes especializadas e innovadoras", "FOREACH asistió como una de las empresas representativas invitadas de Shenzhen.", "Empresa representante invitada", "La conferencia se inauguró en Chongqing el 12 de noviembre y FOREACH participó como empresa representativa de Shenzhen.", "Delegación de Shenzhen", "La delegación reunió a representantes públicos, organizaciones industriales y empresas nacionales especializadas e innovadoras Little Giant.", "Compromiso continuo con la microfluídica", "Como empresa nacional Little Giant, FOREACH seguirá centrada en componentes microfluídicos, sistemas fluídicos e innovación orientada a aplicaciones."],
    ["Invitación de FOREACH a Medical Device Innovation Expo 2025", "FOREACH participará del 21 al 23 de agosto en el stand B36.", "Información de la feria", "La feria tendrá lugar del 21 al 23 de agosto de 2025 en Suzhou International Expo Center, China. El stand de FOREACH es el B36.", "Exposición de productos", "FOREACH mostrará productos, capacidades técnicas y soluciones industriales para presentar su valor de producto y servicio.", "Bienvenidos al stand", "Invitamos a clientes, socios y profesionales al stand B36 para hablar sobre tendencias, aplicaciones y cooperación futura."],
    ["FOREACH reconocida como empresa gacela", "FOREACH recibió este reconocimiento por su capacidad de innovación, ritmo de crecimiento y desempeño en el mercado.", "Reconocimiento al crecimiento y la innovación", "La distinción como empresa gacela refleja la capacidad innovadora, el impulso de crecimiento y el desempeño de FOREACH.", "Enfoque continuo en tecnología microfluídica", "FOREACH desarrolla e industrializa tecnologías de control microfluídico para diagnóstico médico, medio ambiente, laboratorio, ciencias de la vida y biología sintética.", "Innovación para las aplicaciones de los clientes", "Seguiremos mejorando bombas, válvulas, sondas, racores, sensores y el soporte de sistemas para ofrecer productos y servicios fiables."],
    ["FOREACH superó la revisión del proyecto de excelencia de calidad del distrito de Guangming", "La aprobación de 2024 refleja los avances continuos en gestión de calidad e innovación tecnológica.", "Revisión del proyecto superada", "FOREACH superó la revisión, que reconoce el desarrollo de la gestión de calidad, la innovación y la mejora continua de la empresa.", "Mejora continua de la gestión de calidad", "La gestión de calidad sustenta el suministro estable de componentes microfluídicos. FOREACH seguirá mejorando su sistema y sus servicios.", "Apoyo fiable a los clientes", "FOREACH continuará apoyando a IVD, ciencias de la vida, automatización de laboratorio y sectores relacionados con productos estables y servicios profesionales."],
    ["FOREACH reconocida como empresa nacional especializada e innovadora Little Giant", "El reconocimiento distingue su dedicación e innovación de largo plazo en el control microfluídico.", "Reconocimiento nacional Little Giant", "FOREACH fue reconocida por su especialización e innovación en tecnología de control microfluídico.", "Enfoque en el control microfluídico", "FOREACH desarrolla componentes y capacidades de sistemas, como bombas, válvulas, sondas, racores, sensores y módulos.", "Apoyo profesional a los clientes", "Seguiremos mejorando productos y servicios especializados, refinados, diferenciados e innovadores para ofrecer componentes y soluciones fiables."],
    ["FOREACH concluyó con éxito CMEF & ICMD Otoño 2014", "FOREACH presentó nuevas líneas de producto y analizó aplicaciones de sistemas microfluídicos con sus clientes.", "Una feria exitosa", "FOREACH presentó productos actualizados y nuevas líneas, que atrajeron la atención de numerosos visitantes y clientes.", "Intercambio técnico", "FOREACH compartió conocimientos en el foro de innovación tecnológica de servicios personalizados para fabricación de dispositivos médicos.", "Apoyo a IVD y sectores relacionados", "Numerosos clientes conocieron nuestras series y capacidades. FOREACH seguirá apoyando a IVD con productos y servicios profesionales."],
  ],
  fr: [
        {
          title: "Rencontrez FOREACH à l’ADLM 2026",
          summary:
            "FOREACH participera à l’ADLM 2026, organisée du 26 au 30 juillet 2026 à Anaheim, en Californie. Retrouvez-nous au stand 4105 pour découvrir nos composants de contrôle des fluides et nos solutions destinées aux systèmes fluidiques.",
          content: [
            {
              title: "FOREACH participera à l’ADLM 2026",
              content:
                "Du 26 au 30 juillet 2026, FOREACH participera à l’ADLM 2026 à Anaheim, en Californie.\n\nAu stand 4105, notre équipe échangera avec les fabricants d’instruments, les ingénieurs et les partenaires du secteur autour de la sélection des composants, de la compatibilité des matériaux et de l’intégration des circuits fluidiques.",
            },
            {
              title: "Composants et solutions présentés",
              content:
                "FOREACH présentera des pompes de précision, des vannes miniatures, des raccords fluidiques, des tubes, des solutions de mesure de pression, des détecteurs de bulles ainsi que des solutions fluidiques personnalisées.\n\nCes produits répondent aux principales fonctions de dosage, de transfert de liquide, de commutation des circuits, de surveillance de la pression, de détection des bulles et de connexion fluidique.",
            },
            {
              title: "Accompagnement des applications instrumentales",
              content:
                "Nos composants sont destinés au diagnostic in vitro, aux sciences de la vie, aux instruments d’analyse et à l’automatisation de laboratoire.\n\nNotre équipe technique accompagne les clients dans le choix des produits, l’analyse de la compatibilité chimique, l’évaluation de solutions de remplacement et l’intégration des composants dans leurs instruments.",
            },
            {
              title: "Une expertise développée dans le contrôle des fluides",
              content:
                "FOREACH développe et industrialise des technologies de contrôle précis des fluides couvrant les pompes, les vannes, les sondes, les raccords, les tubes, les capteurs et les solutions fluidiques intégrées.\n\nL’entreprise a été reconnue en Chine pour sa spécialisation technologique, sa capacité d’innovation et son développement continu.",
            },
            {
              title: "Retrouvez-nous au stand 4105",
              content:
                "Que vous recherchiez un composant fluidique, une solution de remplacement ou un accompagnement pour l’intégration de votre circuit, notre équipe sera disponible pour étudier votre application.\n\nSalon : ADLM 2026\nDates : du 26 au 30 juillet 2026\nLieu : Anaheim, Californie, États-Unis\nStand : 4105\n\nNous serons heureux de vous rencontrer à Anaheim.",
            },
          ],
          seoTitle: "FOREACH à l’ADLM 2026 | Stand 4105",
          seoDescription:
            "Retrouvez FOREACH au stand 4105 de l’ADLM 2026 pour découvrir nos composants de contrôle des fluides et nos solutions fluidiques.",
        },,
    ["FOREACH présentera ses principaux composants microfluidiques à l’ADLM 2026", "FOREACH exposera des pompes, vannes, raccords, tubes, capteurs et composants pour l’IVD, l’automatisation de laboratoire et les sciences de la vie.", "Pour l’IVD et l’automatisation de laboratoire", "FOREACH présentera des pompes à piston, à seringue et à membrane, des électrovannes, des vannes rotatives, des raccords, des tubes et des capteurs.", "Un contrôle fluidique fiable pour l’intégration à long terme", "FOREACH échangera avec ses clients et partenaires sur la sélection, la compatibilité, l’intégration et les besoins applicatifs.", "Venez rencontrer FOREACH", "Nous invitons les professionnels de l’IVD, des sciences de la vie, de l’automatisation et de l’analyse à discuter de leurs exigences avec notre équipe."],
    ["FOREACH participera au ME Supply Chain Expo 2026", "FOREACH exposera au stand 2-M46 ses principaux produits, compétences techniques et solutions multi-applications.", "Informations sur le salon", "Le salon se tiendra au Shenzhen World Exhibition & Convention Center, en Chine. Le stand FOREACH porte le numéro 2-M46.", "Ce que nous présenterons", "FOREACH présentera ses produits, compétences et solutions afin d’illustrer clairement sa valeur et sa capacité de service.", "Échanges sur place", "Rendez-vous au stand 2-M46 pour parler applications, besoins du marché et possibilités de coopération avec notre équipe."],
    ["Invitation FOREACH au Guangzhou High Medical Expo 2026", "FOREACH exposera du 30 mars au 1er avril au stand B529.", "Informations sur le salon", "FOREACH sera au Guangzhou Airport Expo Center, en Chine, du 30 mars au 1er avril 2026. Notre stand est le B529.", "Présentation des produits et solutions", "Nous présenterons produits, compétences techniques et solutions sectorielles pour expliquer leurs caractéristiques et avantages.", "Bienvenue sur notre stand", "Clients, partenaires et professionnels sont invités au stand B529 pour échanger sur les applications, la sélection et la coopération."],
    ["Invitation : retrouvez FOREACH au CACLP 2026", "FOREACH exposera au CACLP du 21 au 23 mars au stand 2-0424.", "Informations sur le salon", "Le CACLP 2026 se déroulera du 21 au 23 mars au Xiamen International Expo Center, en Chine. Le stand FOREACH est le 2-0424.", "Ce que nous présenterons", "Nous présenterons produits, compétences et solutions sectorielles afin d’expliquer les avantages de notre offre et de nos services.", "Bienvenue au stand 2-0424", "Nous invitons clients, partenaires et professionnels à venir discuter produits et possibilités de coopération."],
    ["FOREACH participera au WHX Labs Dubai 2026", "FOREACH exposera au stand H2.F34 ses principaux produits microfluidiques, ses compétences et ses solutions.", "Informations sur le salon", "FOREACH sera au Dubai World Trade Centre, aux EAU, du 10 au 13 février 2026. Notre stand est le H2.F34.", "Échanges avec le marché international", "Ce salon permettra d’intensifier les échanges internationaux et de présenter nos produits, compétences et solutions multi-applications.", "Rencontrez notre équipe", "Les visiteurs pourront discuter caractéristiques, applications, personnalisation et modèles de coopération avec l’équipe FOREACH."],
    ["FOREACH invitée à la Conférence 2025 sur le développement des PME spécialisées et innovantes", "FOREACH y a participé comme entreprise représentative invitée de Shenzhen.", "Entreprise représentative invitée", "La conférence s’est ouverte à Chongqing le 12 novembre et FOREACH y a représenté les entreprises invitées de Shenzhen.", "Délégation de Shenzhen", "La délégation réunissait représentants publics, organisations professionnelles et entreprises nationales Little Giant spécialisées et innovantes.", "Un engagement durable dans la microfluidique", "En tant qu’entreprise nationale Little Giant, FOREACH poursuivra son travail sur les composants, les systèmes fluidiques et l’innovation applicative."],
    ["Invitation FOREACH au Medical Device Innovation Expo 2025", "FOREACH exposera du 21 au 23 août au stand B36.", "Informations sur le salon", "Le salon aura lieu du 21 au 23 août 2025 au Suzhou International Expo Center, en Chine. Le stand FOREACH est le B36.", "Présentation des produits", "FOREACH présentera ses produits, compétences et solutions sectorielles afin d’illustrer leurs caractéristiques et la valeur de ses services.", "Bienvenue sur notre stand", "Clients, partenaires et professionnels sont invités au stand B36 pour parler tendances, applications et coopération future."],
    ["FOREACH reconnue comme entreprise Gazelle", "Cette distinction récompense sa capacité d’innovation, sa dynamique de croissance et ses performances sur le marché.", "Une reconnaissance de la croissance et de l’innovation", "Le statut d’entreprise Gazelle reflète la capacité d’innovation, la croissance et les performances de FOREACH.", "Priorité constante à la technologie microfluidique", "FOREACH développe et industrialise le contrôle microfluidique pour le diagnostic, l’environnement, les laboratoires, les sciences de la vie et la biologie synthétique.", "Innover pour les applications clients", "Nous continuerons d’améliorer pompes, vannes, sondes, raccords, capteurs et systèmes pour fournir des produits et services fiables."],
    ["FOREACH a validé le projet de développement de l’excellence qualité du district de Guangming", "La validation 2024 reflète les progrès continus en gestion de la qualité et en innovation technologique.", "Validation du projet", "Cette validation reconnaît le développement de la gestion de la qualité, l’innovation technologique et l’amélioration continue de FOREACH.", "Amélioration continue de la qualité", "La gestion de la qualité est essentielle à la livraison stable des composants microfluidiques. FOREACH continuera d’améliorer son système et ses services.", "Un soutien fiable aux clients", "FOREACH continuera d’accompagner l’IVD, les sciences de la vie, l’automatisation de laboratoire et les secteurs associés."],
    ["FOREACH reconnue entreprise nationale spécialisée et innovante Little Giant", "Cette reconnaissance salue son engagement et son innovation durables dans le contrôle microfluidique.", "Reconnaissance nationale Little Giant", "FOREACH a été reconnue pour sa spécialisation et son innovation dans les technologies de contrôle microfluidique.", "Priorité au contrôle microfluidique", "FOREACH développe composants et systèmes, notamment pompes, vannes, sondes, raccords, capteurs et modules associés.", "Un soutien professionnel aux clients", "Nous améliorerons produits et services spécialisés, raffinés, distinctifs et innovants afin de fournir des composants et solutions fiables."],
    ["FOREACH a conclu avec succès le CMEF & ICMD Automne 2014", "FOREACH y a présenté de nouvelles gammes et échangé avec ses clients sur les applications microfluidiques.", "Un salon réussi", "FOREACH a présenté des produits améliorés et de nouvelles gammes qui ont suscité l’intérêt de nombreux visiteurs et clients.", "Échanges techniques", "FOREACH a partagé son expertise lors du forum sur l’innovation technologique des services personnalisés de fabrication de dispositifs médicaux.", "Soutenir l’IVD et les secteurs associés", "De nombreux clients ont découvert nos gammes et nos capacités. FOREACH continuera d’accompagner l’IVD avec des produits et services professionnels."],
  ],
  ko: [
        {
          title: "ADLM 2026에서 FOREACH를 만나보세요",
          summary:
            "FOREACH는 2026년 7월 26일부터 30일까지 미국 캘리포니아 애너하임에서 개최되는 ADLM 2026에 참가합니다. 부스 4105에서 정밀 유체 제어 부품과 장비용 유로 솔루션을 확인해 보십시오.",
          content: [
            {
              title: "FOREACH의 ADLM 2026 참가",
              content:
                "FOREACH는 2026년 7월 26일부터 30일까지 애너하임에서 개최되는 ADLM 2026에 참가합니다.\n\n부스 4105에서 체외진단, 생명과학, 분석기기 및 실험실 자동화 장비 제조사와 엔지니어를 만나 유체 제어와 시스템 통합 요구사항을 상담할 예정입니다.",
            },
            {
              title: "주요 전시 제품",
              content:
                "정밀 펌프, 소형 밸브, 유체 피팅, 튜빙, 압력 감지, 기포 감지 제품과 맞춤형 유로 솔루션을 전시합니다.\n\n각 제품은 정밀 정량, 액체 이송, 유로 전환, 압력 모니터링, 기포 감지 및 안정적인 유체 연결에 적용할 수 있습니다.",
            },
            {
              title: "장비 적용을 위한 기술 지원",
              content:
                "FOREACH는 개별 부품 공급뿐만 아니라 재질 호환성 검토, 제품 선정, 대체품 검토 및 유로 시스템 통합을 지원합니다.\n\n장비의 소형화, 자동화 및 복잡한 유로 설계 요구사항에 맞춰 필요한 부품과 솔루션을 제안합니다.",
            },
            {
              title: "정밀 유체 제어 기술 역량",
              content:
                "FOREACH는 펌프, 밸브, 프로브, 피팅, 튜빙, 센서 및 유로 솔루션 분야에서 정밀 유체 제어 기술을 지속적으로 개발해 왔습니다.\n\n기술 전문성, 제품 개발 능력 및 기업 성장성을 바탕으로 중국 내 전문 혁신 기업 및 고성장 기업으로 인정받았습니다.",
            },
            {
              title: "부스 4105 방문 안내",
              content:
                "새로운 유체 부품, 기존 제품의 대체품 또는 재질 호환성과 시스템 통합 지원이 필요한 경우 부스 4105를 방문해 주십시오.\n\n전시회: ADLM 2026\n일정: 2026년 7월 26일–30일\n장소: 미국 캘리포니아 애너하임\n부스: 4105\n\n애너하임에서 만나 뵙기를 기대합니다.",
            },
          ],
          seoTitle: "ADLM 2026에서 FOREACH를 만나보세요 | 부스 4105",
          seoDescription:
            "ADLM 2026 부스 4105에서 FOREACH의 정밀 유체 제어 부품과 장비용 유로 솔루션을 확인해 보십시오.",
        },,
    ["FOREACH, ADLM 2026에서 핵심 미세유체 부품 전시", "FOREACH는 IVD, 실험실 자동화 및 생명과학 장비용 펌프, 밸브, 피팅, 튜브, 센서와 유체 부품을 선보입니다.", "IVD 및 실험실 자동화 적용", "플런저·시린지·다이어프램 펌프, 솔레노이드·로터리 밸브, 피팅, 튜브와 센서를 전시합니다.", "장기 통합을 위한 신뢰성 높은 유체 제어", "전시 기간에 제품 선정, 재질 호환성, 시스템 통합 및 적용 요구를 고객과 논의합니다.", "FOREACH를 만나 보세요", "IVD, 생명과학, 실험실 자동화 및 분석 장비 고객을 초대해 유체 제어와 시스템 요구를 상담합니다."],
    ["FOREACH, 2026 ME Supply Chain Expo 참가", "FOREACH는 2-M46 부스에서 핵심 제품, 기술 역량과 다양한 적용 솔루션을 선보입니다.", "전시 정보", "중국 Shenzhen World Exhibition & Convention Center에서 개최되며 FOREACH 부스는 2-M46입니다.", "주요 전시 내용", "제품과 기술 역량, 다양한 솔루션을 소개하여 제품 가치와 서비스 역량을 전달합니다.", "현장 상담", "2-M46 부스에서 제품 적용, 시장 요구 및 협력 기회를 논의해 보세요."],
    ["FOREACH, Guangzhou High Medical Expo 2026 초청", "FOREACH는 3월 30일부터 4월 1일까지 B529 부스에 참가합니다.", "전시 정보", "2026년 3월 30일부터 4월 1일까지 중국 Guangzhou Airport Expo Center에서 열리며 부스는 B529입니다.", "제품 및 솔루션 전시", "핵심 제품, 기술 역량과 산업 솔루션을 통해 특징과 장점을 소개합니다.", "방문 안내", "고객, 파트너 및 업계 관계자를 B529 부스로 초대해 적용, 선정 및 협력을 상담합니다."],
    ["초청: CACLP 2026 FOREACH 부스 방문", "FOREACH는 3월 21일부터 23일까지 2-0424 부스에 참가합니다.", "전시 정보", "중국 Xiamen International Expo Center에서 2026년 3월 21일부터 23일까지 열리며 부스는 2-0424입니다.", "주요 전시 내용", "핵심 제품, 기술 역량과 산업 솔루션을 소개하여 제품과 서비스의 장점을 전달합니다.", "2-0424 부스 방문", "고객, 파트너와 업계 관계자를 초대해 제품과 협력 기회를 논의합니다."],
    ["FOREACH, WHX Labs Dubai 2026 참가", "FOREACH는 H2.F34 부스에서 핵심 미세유체 제품, 기술력과 적용 솔루션을 선보입니다.", "전시 정보", "2026년 2월 10일부터 13일까지 UAE Dubai World Trade Centre에서 열리며 부스는 H2.F34입니다.", "국제 시장 소통", "국제 시장과의 교류를 확대하고 다양한 적용을 위한 제품, 기술과 솔루션을 소개합니다.", "팀과의 만남", "현장에서 제품 특징, 적용 분야, 맞춤 요구 및 협력 방식을 상담할 수 있습니다."],
    ["FOREACH, 2025 전문화·혁신 중소기업 발전 회의 초청 참가", "FOREACH는 선전의 초청 대표 기업 중 하나로 회의에 참가했습니다.", "초청 대표 기업", "11월 12일 충칭에서 열린 회의에 FOREACH가 선전 대표 기업으로 참가했습니다.", "선전 대표단", "정부와 산업 단체 관계자 및 국가급 전문화·혁신 Little Giant 기업 대표가 함께했습니다.", "미세유체 분야에 지속 집중", "국가급 Little Giant 기업으로서 핵심 미세유체 부품, 유체 시스템과 적용 중심 혁신에 계속 집중합니다."],
    ["FOREACH, 2025 Medical Device Innovation Expo 초청", "FOREACH는 8월 21일부터 23일까지 B36 부스에 참가합니다.", "전시 정보", "2025년 8월 21일부터 23일까지 중국 Suzhou International Expo Center에서 열리며 부스는 B36입니다.", "제품 전시", "핵심 제품, 기술 역량과 산업 솔루션을 소개하여 제품 특성과 서비스 가치를 전달합니다.", "방문 안내", "B36 부스에서 산업 동향, 적용 요구와 향후 협력 기회를 논의해 보세요."],
    ["FOREACH, 가젤 기업으로 선정", "FOREACH는 혁신 역량, 성장 동력과 시장 성과를 인정받아 가젤 기업으로 선정되었습니다.", "성장과 혁신에 대한 인정", "가젤 기업 선정은 FOREACH의 혁신 역량과 성장세 및 시장 성과를 보여 줍니다.", "미세유체 기술에 지속 집중", "의료 진단, 환경, 실험실, 생명과학과 합성생물학을 위한 정밀 미세유체 제어 기술을 개발하고 산업화합니다.", "고객 적용을 위한 혁신", "펌프, 밸브, 프로브, 피팅, 센서와 시스템 지원 역량을 계속 강화해 신뢰할 수 있는 제품과 서비스를 제공합니다."],
    ["FOREACH, 광밍구 우수 품질 육성 프로젝트 심사 통과", "2024년 심사 통과는 품질 관리와 기술 혁신의 지속적인 발전을 보여 줍니다.", "프로젝트 심사 통과", "FOREACH의 품질 관리 발전, 기술 혁신과 지속적인 개선을 인정받았습니다.", "품질 관리의 지속 개선", "품질 관리는 미세유체 핵심 부품의 안정적 공급 기반입니다. FOREACH는 품질 시스템과 서비스 역량을 계속 개선합니다.", "고객을 위한 신뢰성 높은 지원", "IVD, 생명과학, 실험실 자동화와 관련 분야에 안정적인 제품과 전문 서비스를 계속 제공합니다."],
    ["FOREACH, 국가급 전문화·혁신 Little Giant 기업으로 선정", "미세유체 제어에 대한 장기적인 집중과 혁신을 인정받았습니다.", "국가급 Little Giant 인정", "FOREACH는 미세유체 제어 기술의 전문성과 혁신을 인정받았습니다.", "미세유체 제어에 집중", "펌프, 밸브, 프로브, 피팅, 센서 및 관련 모듈을 포함한 핵심 부품과 시스템 역량을 개발합니다.", "고객을 위한 전문 지원", "전문화, 정교화, 차별화와 혁신을 바탕으로 신뢰할 수 있는 부품과 시스템 솔루션을 제공합니다."],
    ["FOREACH, CMEF & ICMD 2014 가을 전시회 성공적으로 마무리", "FOREACH는 신제품 라인을 선보이고 고객과 미세유체 시스템 적용을 논의했습니다.", "성공적인 전시", "업그레이드 제품과 신제품 라인이 많은 방문객과 고객의 관심을 받았습니다.", "기술 교류", "의료기기 제조 맞춤 서비스 기술 혁신 포럼에서 산업 과제와 전문 솔루션에 대한 기술 정보를 공유했습니다.", "IVD 및 관련 분야 지원", "많은 고객이 제품 시리즈와 시스템 역량을 확인했습니다. FOREACH는 전문 제품과 서비스로 IVD 산업을 계속 지원합니다."],
  ],
  ru: [
        {
          title: "Встретьтесь с FOREACH на выставке ADLM 2026",
          summary:
            "FOREACH примет участие в выставке ADLM 2026, которая пройдет с 26 по 30 июля 2026 года в Анахайме, штат Калифорния. На стенде 4105 будут представлены компоненты для точного управления жидкостями и решения для интеграции жидкостных систем.",
          content: [
            {
              title: "Участие FOREACH в ADLM 2026",
              content:
                "С 26 по 30 июля 2026 года FOREACH примет участие в выставке ADLM 2026 в Анахайме, штат Калифорния.\n\nНа стенде 4105 специалисты компании будут обсуждать с производителями приборов и инженерами вопросы выбора компонентов, совместимости материалов и интеграции жидкостных систем.",
            },
            {
              title: "Оборудование и компоненты на стенде",
              content:
                "На выставке будут представлены прецизионные насосы, миниатюрные клапаны, фитинги, трубки, датчики давления, системы обнаружения пузырьков и решения для индивидуальной конфигурации жидкостных контуров.\n\nКомпоненты предназначены для точного дозирования, транспортировки жидкости, переключения потоков, контроля давления, обнаружения пузырьков и надежного соединения элементов системы.",
            },
            {
              title: "Поддержка приборных применений",
              content:
                "Решения FOREACH применяются в системах диагностики in vitro, оборудовании для наук о жизни, аналитических приборах и лабораторной автоматизации.\n\nКомпания оказывает поддержку при подборе компонентов, анализе химической совместимости материалов, поиске аналогов и интеграции компонентов в существующие системы.",
            },
            {
              title: "Опыт в области точного управления жидкостями",
              content:
                "FOREACH последовательно развивает технологии точного управления жидкостями, включая насосы, клапаны, зонды, фитинги, трубки, датчики и комплексные жидкостные решения.\n\nТехническая специализация, разработка продукции и устойчивый рост компании получили отраслевое признание в Китае.",
            },
            {
              title: "Посетите стенд 4105",
              content:
                "Если вам требуется новый компонент, замена существующего изделия или техническая поддержка по совместимости материалов и интеграции системы, посетите стенд 4105.\n\nВыставка: ADLM 2026\nДаты: 26–30 июля 2026 года\nМесто: Анахайм, Калифорния, США\nСтенд: 4105\n\nБудем рады обсудить ваши технические задачи на выставке.",
            },
          ],
          seoTitle: "FOREACH на выставке ADLM 2026 | Стенд 4105",
          seoDescription:
            "Посетите стенд FOREACH 4105 на выставке ADLM 2026 и ознакомьтесь с компонентами для точного управления жидкостями.",
        },,
    ["FOREACH представит ключевые микрофлюидные компоненты на ADLM 2026", "FOREACH покажет насосы, клапаны, фитинги, трубки, датчики и компоненты для IVD, лабораторной автоматизации и наук о жизни.", "Для IVD и лабораторной автоматизации", "Будут представлены плунжерные, шприцевые и мембранные насосы, электромагнитные и поворотные клапаны, фитинги, трубки и датчики.", "Надёжное управление жидкостью для длительной интеграции", "FOREACH обсудит с клиентами подбор, совместимость материалов, системную интеграцию и прикладные требования.", "Встретьтесь с FOREACH", "Приглашаем специалистов IVD, наук о жизни, автоматизации и аналитических приборов обсудить управление жидкостью и системные задачи."],
    ["FOREACH примет участие в ME Supply Chain Expo 2026", "На стенде 2-M46 FOREACH представит ключевую продукцию, технические возможности и решения для разных применений.", "Информация о выставке", "Выставка пройдёт в Shenzhen World Exhibition & Convention Center, Китай. Стенд FOREACH — 2-M46.", "Что мы представим", "Продукция, технические возможности и решения помогут посетителям лучше понять ценность и сервисные возможности FOREACH.", "Общение на стенде", "Посетите стенд 2-M46, чтобы обсудить применение продукции, потребности рынка и сотрудничество."],
    ["Приглашение FOREACH на Guangzhou High Medical Expo 2026", "FOREACH будет участвовать с 30 марта по 1 апреля на стенде B529.", "Информация о выставке", "Выставка пройдёт в Guangzhou Airport Expo Center, Китай, с 30 марта по 1 апреля 2026 года. Наш стенд — B529.", "Продукция и решения", "Мы представим ключевую продукцию, технические возможности и отраслевые решения, их особенности и преимущества.", "Приглашаем посетить", "Ждём клиентов, партнёров и специалистов на стенде B529 для обсуждения задач, подбора и сотрудничества."],
    ["Приглашение: встретьтесь с FOREACH на CACLP 2026", "FOREACH будет участвовать с 21 по 23 марта на стенде 2-0424.", "Информация о выставке", "CACLP 2026 пройдёт с 21 по 23 марта в Xiamen International Expo Center, Китай. Стенд FOREACH — 2-0424.", "Что мы представим", "Ключевая продукция, технические возможности и отраслевые решения продемонстрируют преимущества наших продуктов и сервиса.", "Приглашаем на стенд 2-0424", "Ждём клиентов, партнёров и специалистов для обсуждения продукции и возможностей сотрудничества."],
    ["FOREACH примет участие в WHX Labs Dubai 2026", "На стенде H2.F34 FOREACH представит ключевую микрофлюидную продукцию, технологии и прикладные решения.", "Информация о выставке", "Выставка пройдёт с 10 по 13 февраля 2026 года в Dubai World Trade Centre, ОАЭ. Наш стенд — H2.F34.", "Диалог с международным рынком", "Это возможность расширить международное общение и показать продукцию, технологии и решения для разных задач.", "Встретьтесь с нашей командой", "Обсудите характеристики, применения, индивидуальные требования и модели сотрудничества с командой FOREACH."],
    ["FOREACH приглашена на конференцию 2025 года по развитию специализированных и инновационных МСП", "FOREACH участвовала как одно из приглашённых предприятий — представителей Шэньчжэня.", "Приглашённое предприятие", "Конференция открылась 12 ноября в Чунцине, где FOREACH выступила представителем предприятий Шэньчжэня.", "Делегация Шэньчжэня", "В делегацию вошли представители властей, отраслевых организаций и национальных предприятий Little Giant.", "Продолжение работы в микрофлюидике", "Как национальное предприятие Little Giant, FOREACH продолжит развивать компоненты, гидравлические системы и прикладные инновации."],
    ["Приглашение FOREACH на Medical Device Innovation Expo 2025", "FOREACH будет участвовать с 21 по 23 августа на стенде B36.", "Информация о выставке", "Выставка пройдёт с 21 по 23 августа 2025 года в Suzhou International Expo Center, Китай. Стенд FOREACH — B36.", "Экспозиция продукции", "FOREACH представит ключевую продукцию, технические возможности и отраслевые решения, их особенности и сервисную ценность.", "Приглашаем посетить", "Ждём клиентов, партнёров и специалистов на стенде B36 для обсуждения тенденций, задач и сотрудничества."],
    ["FOREACH признана предприятием-газелью", "Признание отражает инновационный потенциал, темпы роста и рыночные результаты компании.", "Признание роста и инноваций", "Статус предприятия-газели подтверждает инновационные возможности, динамику роста и рыночные результаты FOREACH.", "Постоянное внимание микрофлюидным технологиям", "FOREACH разрабатывает и внедряет точное микрофлюидное управление для диагностики, экологии, лабораторий, наук о жизни и синтетической биологии.", "Инновации для задач клиентов", "Мы продолжим совершенствовать насосы, клапаны, зонды, фитинги, датчики и системную поддержку для надёжных продуктов и услуг."],
    ["FOREACH прошла проверку проекта повышения качества района Гуанмин", "Проверка 2024 года отражает постоянный прогресс в управлении качеством и технологических инновациях.", "Проверка проекта пройдена", "Результат подтверждает развитие управления качеством, технологические инновации и постоянное совершенствование FOREACH.", "Постоянное улучшение управления качеством", "Управление качеством — основа стабильных поставок компонентов. FOREACH продолжит улучшать систему и сервис.", "Надёжная поддержка клиентов", "FOREACH продолжит поддерживать IVD, науки о жизни, лабораторную автоматизацию и смежные области стабильной продукцией и профессиональным сервисом."],
    ["FOREACH признана национальным специализированным и инновационным предприятием Little Giant", "Признание отмечает многолетнюю специализацию и инновации в области микрофлюидного управления.", "Национальное признание Little Giant", "FOREACH получила признание за специализацию и инновации в технологиях микрофлюидного управления.", "Работа над микрофлюидным управлением", "FOREACH развивает насосы, клапаны, зонды, фитинги, датчики, модули и поддержку гидравлических систем.", "Профессиональная поддержка клиентов", "Мы продолжим совершенствовать специализированные, точные, отличительные и инновационные продукты и услуги для надёжных системных решений."],
    ["FOREACH успешно завершила участие в CMEF & ICMD Осень 2014", "FOREACH представила новые линейки и обсудила с клиентами применение микрофлюидных систем.", "Успешная выставка", "Обновлённая продукция и новые линейки FOREACH привлекли внимание многочисленных посетителей и клиентов.", "Технический обмен", "На форуме инноваций в производстве медицинских изделий FOREACH поделилась техническими знаниями и обсудила отраслевые задачи.", "Поддержка IVD и смежных областей", "Многие клиенты познакомились с нашими сериями и системными возможностями. FOREACH продолжит профессионально поддерживать отрасль IVD."],
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
