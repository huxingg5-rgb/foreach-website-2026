import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";

import type { LocaleCode } from "@/lib/i18n";

import styles from "./PrivacyPolicyPage.module.css";

type PolicySection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type PrivacyPolicyCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  home: string;
  translationNotice?: string;
  sections: PolicySection[];
  contact: {
    title: string;
    intro: string;
    companyLabel: string;
    company: string;
    emailLabel: string;
    addressLabel: string;
    address: string;
  };
};

const privacyPolicyCopy: Record<
  LocaleCode,
  PrivacyPolicyCopy
> = {
  "zh-CN": {
    eyebrow: "Privacy & Data Protection",
    title: "隐私政策",
    intro:
      "深圳市恒永达科技股份有限公司（FOREACH）重视您的隐私。本政策说明您访问和使用本网站时，我们如何收集、使用、保存和保护相关信息。",
    lastUpdated: "最后更新：2026年7月21日",
    home: "首页",
    sections: [
      {
        title: "1. 本政策的适用范围",
        paragraphs: [
          "本政策适用于 FOREACH 官方网站以及网站中提供的产品查询、技术工具、资料下载、询盘和联系功能。",
          "本政策不适用于通过链接访问的第三方网站、平台或服务。第三方服务将按照其自己的隐私政策处理信息。",
        ],
      },
      {
        title: "2. 我们可能收集的信息",
        paragraphs: [
          "我们仅在实现网站功能、回应业务或技术需求以及改善网站体验所必需的范围内处理信息。",
        ],
        bullets: [
          "您主动提交的信息，例如姓名、公司、国家或地区、电子邮箱、电话号码、产品需求、询盘内容及您选择上传的附件。",
          "必要的技术信息，例如浏览器类型、设备类型、访问时间、请求状态以及保障网站安全和正常运行所需的网络信息。",
          "在您同意分析 Cookie 后产生的网站使用信息，例如访问页面、来源页面、设备类别、浏览器类别、功能使用和页面交互情况。",
          "您输入网站搜索、选型查询或计算工具的数据，用于返回相应的搜索、匹配或计算结果。",
        ],
      },
      {
        title: "3. 我们如何使用信息",
        paragraphs: [
          "我们可能将相关信息用于以下目的：",
        ],
        bullets: [
          "回复产品咨询、技术问题、合作申请和其他联系请求。",
          "提供产品搜索、接头替代查询、流阻计算、资料下载和其他网站功能。",
          "生成和管理询盘记录，并安排后续业务或技术沟通。",
          "维护网站安全、排查错误、防止滥用和改善网站性能。",
          "在取得您的同意后，分析页面访问和功能使用情况，以优化网站内容与用户体验。",
          "履行适用法律法规要求，或维护 FOREACH、客户和其他相关方的合法权益。",
        ],
      },
      {
        title: "4. Cookie 与 Google Analytics",
        paragraphs: [
          "本网站使用必要 Cookie 保存您的隐私选择，并在您明确同意后才加载 Google Analytics。",
          "必要 Cookie“foreach_cookie_consent_v1”用于记录您是否允许分析 Cookie，当前保存期限最长为180天。必要 Cookie无法通过设置面板关闭，因为它用于保存您的选择。",
          "允许分析 Cookie 后，Google Analytics 可能通过相关 Cookie 和网站使用信息帮助我们了解页面访问与功能使用情况。我们不会有意将姓名、电子邮箱、电话号码、询盘正文或附件内容发送到 Google Analytics。",
          "本网站当前未启用用于广告个性化的 Google 广告存储。您可以随时通过网站 Footer 中的“Cookie 设置”修改或撤回分析 Cookie 选择。",
        ],
      },
      {
        title: "5. 信息共享与服务提供商",
        paragraphs: [
          "我们可能委托必要的服务提供商支持网站托管、安全防护、邮件通信和网站分析。这些服务提供商仅在提供相关服务所必需的范围内处理信息。",
          "使用 Google Analytics 时，相关分析数据可能由 Google 按照其服务条款和隐私规则进行处理。",
          "除法律要求、保护合法权益、完成企业重组或获得您的授权外，我们不会无故向无关第三方披露您提交的个人信息。",
        ],
      },
      {
        title: "6. 跨境处理",
        paragraphs: [
          "由于本网站面向全球客户，部分网站服务提供商或接收业务请求的团队可能位于您所在国家或地区以外。",
          "发生跨境处理时，我们将根据适用法律以及相应服务安排采取合理保护措施。",
        ],
      },
      {
        title: "7. 保存期限",
        paragraphs: [
          "我们仅在实现本政策所述目的、履行业务义务、解决争议及满足法律或合规要求所需的期限内保存信息。",
          "询盘和业务联系信息的保存期限将根据沟通状态、客户关系和必要的业务记录要求确定。Google Analytics 数据按照网站 GA4 属性中配置的期限保存。",
          "当信息不再需要时，我们会根据实际情况删除、匿名化或采取合理方式限制继续使用。",
        ],
      },
      {
        title: "8. 您的选择与权利",
        paragraphs: [
          "根据您所在国家或地区适用的法律，您可能有权请求访问、更正、删除或限制处理相关个人信息，也可能有权反对特定处理、撤回同意或请求提供信息副本。",
          "撤回分析 Cookie 同意不会影响撤回前已经合法进行的处理。您可以通过 Footer 中的“Cookie 设置”随时修改分析选择。",
          "为保护信息安全，我们在处理相关请求前可能需要核实您的身份和请求范围。",
        ],
      },
      {
        title: "9. 信息安全",
        paragraphs: [
          "我们采取合理的技术和管理措施，减少信息遭到未经授权访问、泄露、篡改、丢失或滥用的风险。",
          "互联网传输和电子存储无法保证绝对安全，因此我们无法承诺任何传输或存储方式不存在风险。",
        ],
      },
      {
        title: "10. 未成年人",
        paragraphs: [
          "本网站主要面向企业客户、工程师和行业专业人员，不以未成年人为目标。",
          "我们不会通过本网站故意收集未成年人的个人信息。如发现相关信息被误提交，请联系我们处理。",
        ],
      },
      {
        title: "11. 政策更新",
        paragraphs: [
          "我们可能根据网站功能、服务提供商或适用要求的变化更新本政策。",
          "更新后的版本将在本页面发布，并在页面顶部标注最新更新日期。重大变化可能通过网站提示或其他适当方式说明。",
        ],
      },
    ],
    contact: {
      title: "12. 联系我们",
      intro:
        "如对本政策、Cookie 设置或个人信息处理有疑问，可通过以下方式联系 FOREACH：",
      companyLabel: "公司",
      company: "深圳市恒永达科技股份有限公司",
      emailLabel: "电子邮箱",
      addressLabel: "地址",
      address:
        "广东省深圳市光明区玉塘街道玉律社区光侨大道1008号裕丰达工业园2栋1301",
    },
  },

  en: {
    eyebrow: "Privacy & Data Protection",
    title: "Privacy Policy",
    intro:
      "Shenzhen FOREACH Technology Co., Ltd. (“FOREACH”, “we”, “us” or “our”) respects your privacy. This policy explains how we collect, use, retain and protect information when you visit or use this website.",
    lastUpdated: "Last updated: July 21, 2026",
    home: "Home",
    translationNotice:
      "Translation notice: This version was translated and reviewed by our team with support from translation tools. Please contact us if any wording is unclear.",
    sections: [
      {
        title: "1. Scope of this policy",
        paragraphs: [
          "This policy applies to the FOREACH official website and its product search, technical tools, downloads, inquiry and contact features.",
          "It does not govern third-party websites, platforms or services reached through external links. Those services process information under their own privacy policies.",
        ],
      },
      {
        title: "2. Information we may collect",
        paragraphs: [
          "We process information only to the extent reasonably necessary to operate the website, respond to business or technical requests and improve the website experience.",
        ],
        bullets: [
          "Information you submit, such as your name, company, country or region, email address, telephone number, product requirements, inquiry details and attachments you choose to upload.",
          "Technical information required for operation and security, such as browser type, device type, access time, request status and network information.",
          "Website usage information generated after you consent to analytics cookies, such as pages visited, referring page, device category, browser category and feature interactions.",
          "Inputs entered into site search, product-selection queries or calculation tools so that the website can return the requested result.",
        ],
      },
      {
        title: "3. How we use information",
        paragraphs: [
          "We may use relevant information to:",
        ],
        bullets: [
          "Respond to product inquiries, technical questions, cooperation requests and other communications.",
          "Provide product search, fitting replacement search, fluid resistance calculations, downloads and other website functions.",
          "Create and manage inquiry records and arrange business or technical follow-up.",
          "Maintain security, diagnose errors, prevent misuse and improve website performance.",
          "With your consent, analyse page visits and feature usage to improve content and user experience.",
          "Comply with applicable requirements and protect the lawful interests of FOREACH, our customers and other parties.",
        ],
      },
      {
        title: "4. Cookies and Google Analytics",
        paragraphs: [
          "The website uses an essential cookie to remember your privacy choice and loads Google Analytics only after you give consent.",
          "The essential cookie “foreach_cookie_consent_v1” records whether analytics cookies are permitted and is currently stored for up to 180 days. It cannot be disabled in the settings panel because it is needed to remember your choice.",
          "When analytics cookies are allowed, Google Analytics may use related cookies and website usage information to help us understand page visits and feature usage. We do not intentionally send names, email addresses, telephone numbers, inquiry text or attachment contents to Google Analytics.",
          "Advertising personalisation storage is not currently enabled on this website. You can change or withdraw analytics consent through “Cookie settings” in the website footer.",
        ],
      },
      {
        title: "5. Sharing and service providers",
        paragraphs: [
          "We may use service providers for website hosting, security, email communications and website analytics. They process information only as reasonably necessary to provide those services.",
          "Where Google Analytics is used, related analytics information may be processed by Google under its service terms and privacy practices.",
          "We do not disclose submitted personal information to unrelated third parties without a valid reason, except where required by law, needed to protect lawful interests, connected with a corporate transaction or authorised by you.",
        ],
      },
      {
        title: "6. International processing",
        paragraphs: [
          "Because this website serves customers worldwide, some service providers or teams receiving business requests may be located outside your country or region.",
          "Where information is processed across borders, we take reasonable measures in accordance with applicable requirements and relevant service arrangements.",
        ],
      },
      {
        title: "7. Retention",
        paragraphs: [
          "We retain information only for as long as needed for the purposes described in this policy, business obligations, dispute resolution and applicable legal or compliance requirements.",
          "Inquiry and business-contact information is retained according to the status of the communication, customer relationship and necessary business-record requirements. Google Analytics data is retained according to the period configured in our GA4 property.",
          "When information is no longer required, we take reasonable steps to delete, anonymise or restrict further use.",
        ],
      },
      {
        title: "8. Your choices and rights",
        paragraphs: [
          "Depending on applicable law, you may have the right to request access, correction, deletion or restriction of personal information, object to certain processing, withdraw consent or request a copy of relevant information.",
          "Withdrawing analytics consent does not affect processing lawfully carried out before withdrawal. You can update your analytics choice through “Cookie settings” in the footer.",
          "To protect information, we may need to verify your identity and the scope of a request before responding.",
        ],
      },
      {
        title: "9. Security",
        paragraphs: [
          "We use reasonable technical and organisational measures to reduce the risk of unauthorised access, disclosure, alteration, loss or misuse.",
          "No internet transmission or electronic storage method can be guaranteed to be completely secure.",
        ],
      },
      {
        title: "10. Children",
        paragraphs: [
          "This website is primarily intended for business customers, engineers and industry professionals and is not directed to children.",
          "We do not knowingly collect children's personal information through this website. Please contact us if such information has been submitted by mistake.",
        ],
      },
      {
        title: "11. Changes to this policy",
        paragraphs: [
          "We may update this policy when website functions, service providers or applicable requirements change.",
          "The updated version will be published on this page with a revised date. Material changes may also be communicated through a website notice or another appropriate method.",
        ],
      },
    ],
    contact: {
      title: "12. Contact us",
      intro:
        "For questions about this policy, cookie settings or our handling of personal information, contact FOREACH:",
      companyLabel: "Company",
      company: "Shenzhen FOREACH Technology Co., Ltd.",
      emailLabel: "Email",
      addressLabel: "Address",
      address:
        "1301, Building 2, Yufengda Industrial Park, No. 1008 Guangqiao Avenue, Yulv Community, Yutang Subdistrict, Guangming District, Shenzhen, Guangdong, China",
    },
  },

  es: {
    eyebrow: "Privacidad y protección de datos",
    title: "Política de privacidad",
    intro:
      "Shenzhen FOREACH Technology Co., Ltd. (“FOREACH”, “nosotros” o “nuestro”) respeta su privacidad. Esta política explica cómo recopilamos, utilizamos, conservamos y protegemos la información cuando visita o utiliza este sitio web.",
    lastUpdated: "Última actualización: 21 de julio de 2026",
    home: "Inicio",
    translationNotice:
      "Aviso de traducción: esta versión fue traducida y revisada por nuestro equipo con el apoyo de herramientas de traducción. Póngase en contacto con nosotros si algún texto no resulta claro.",
    sections: [
      {
        title: "1. Ámbito de esta política",
        paragraphs: [
          "Esta política se aplica al sitio web oficial de FOREACH y a sus funciones de búsqueda de productos, herramientas técnicas, descargas, consultas y contacto.",
          "No se aplica a sitios web, plataformas o servicios de terceros accesibles mediante enlaces externos.",
        ],
      },
      {
        title: "2. Información que podemos recopilar",
        paragraphs: [
          "Tratamos información únicamente en la medida razonablemente necesaria para operar el sitio, responder a solicitudes comerciales o técnicas y mejorar la experiencia.",
        ],
        bullets: [
          "Información que usted proporciona, como nombre, empresa, país o región, correo electrónico, teléfono, requisitos de producto, contenido de la consulta y archivos adjuntos.",
          "Información técnica necesaria para el funcionamiento y la seguridad, como navegador, dispositivo, hora de acceso, estado de la solicitud e información de red.",
          "Datos de uso generados después de aceptar cookies analíticas, como páginas visitadas, página de referencia, categoría del dispositivo, navegador e interacciones.",
          "Datos introducidos en la búsqueda, consultas de selección o herramientas de cálculo para devolver el resultado solicitado.",
        ],
      },
      {
        title: "3. Cómo utilizamos la información",
        paragraphs: ["Podemos utilizar la información para:"],
        bullets: [
          "Responder consultas de productos, preguntas técnicas, solicitudes de cooperación y otras comunicaciones.",
          "Proporcionar búsquedas de productos, búsquedas de sustitución de racores, cálculos de resistencia de fluidos y descargas.",
          "Crear y gestionar registros de consultas y organizar el seguimiento comercial o técnico.",
          "Mantener la seguridad, diagnosticar errores, prevenir usos indebidos y mejorar el rendimiento.",
          "Con su consentimiento, analizar visitas y uso de funciones para mejorar el contenido y la experiencia.",
          "Cumplir requisitos aplicables y proteger intereses legítimos.",
        ],
      },
      {
        title: "4. Cookies y Google Analytics",
        paragraphs: [
          "El sitio utiliza una cookie esencial para recordar su elección de privacidad y carga Google Analytics únicamente después de recibir su consentimiento.",
          "La cookie esencial “foreach_cookie_consent_v1” registra si permite cookies analíticas y se conserva actualmente hasta 180 días.",
          "Cuando se permiten cookies analíticas, Google Analytics puede utilizar cookies relacionadas y datos de uso. No enviamos intencionadamente nombres, correos electrónicos, teléfonos, textos de consultas ni archivos adjuntos a Google Analytics.",
          "Actualmente no está habilitado el almacenamiento para personalización publicitaria. Puede cambiar o retirar su consentimiento mediante “Configuración de cookies” en el pie de página.",
        ],
      },
      {
        title: "5. Proveedores y divulgación",
        paragraphs: [
          "Podemos utilizar proveedores para alojamiento, seguridad, correo electrónico y análisis web, únicamente en la medida necesaria para prestar esos servicios.",
          "Los datos relacionados con Google Analytics pueden ser tratados por Google conforme a sus condiciones y prácticas de privacidad.",
          "No divulgamos información personal a terceros no relacionados sin una razón válida, salvo obligación legal, protección de intereses legítimos, operación corporativa o autorización del usuario.",
        ],
      },
      {
        title: "6. Tratamiento internacional",
        paragraphs: [
          "Como el sitio presta servicio a clientes de todo el mundo, algunos proveedores o equipos pueden encontrarse fuera de su país o región.",
          "Cuando exista tratamiento transfronterizo, adoptaremos medidas razonables de acuerdo con los requisitos aplicables.",
        ],
      },
      {
        title: "7. Conservación",
        paragraphs: [
          "Conservamos la información únicamente durante el tiempo necesario para los fines indicados, las obligaciones comerciales, la resolución de controversias y los requisitos legales.",
          "Los datos de consultas se conservan según el estado de la comunicación y las necesidades de registro. Los datos de Google Analytics se conservan según el periodo configurado en nuestra propiedad GA4.",
          "Cuando la información deja de ser necesaria, adoptamos medidas razonables para eliminarla, anonimizarla o limitar su uso.",
        ],
      },
      {
        title: "8. Sus opciones y derechos",
        paragraphs: [
          "Según la legislación aplicable, puede solicitar acceso, corrección, eliminación o limitación, oponerse a determinados tratamientos, retirar su consentimiento o solicitar una copia.",
          "Puede modificar su elección analítica mediante “Configuración de cookies” en el pie de página.",
          "Podemos necesitar verificar su identidad y el alcance de la solicitud.",
        ],
      },
      {
        title: "9. Seguridad",
        paragraphs: [
          "Aplicamos medidas técnicas y organizativas razonables para reducir riesgos de acceso, divulgación, modificación, pérdida o uso no autorizado.",
          "Ningún sistema de transmisión o almacenamiento electrónico puede garantizar una seguridad absoluta.",
        ],
      },
      {
        title: "10. Menores",
        paragraphs: [
          "El sitio está dirigido principalmente a clientes empresariales, ingenieros y profesionales del sector, no a menores.",
          "No recopilamos intencionadamente información personal de menores mediante este sitio.",
        ],
      },
      {
        title: "11. Cambios en la política",
        paragraphs: [
          "Podemos actualizar esta política cuando cambien las funciones, proveedores o requisitos aplicables.",
          "La versión actualizada se publicará en esta página con una nueva fecha.",
        ],
      },
    ],
    contact: {
      title: "12. Contacto",
      intro:
        "Para preguntas sobre esta política, las cookies o el tratamiento de información personal, contacte con FOREACH:",
      companyLabel: "Empresa",
      company: "Shenzhen FOREACH Technology Co., Ltd.",
      emailLabel: "Correo electrónico",
      addressLabel: "Dirección",
      address:
        "1301, Building 2, Yufengda Industrial Park, No. 1008 Guangqiao Avenue, Guangming District, Shenzhen, Guangdong, China",
    },
  },

  fr: {
    eyebrow: "Confidentialité et protection des données",
    title: "Politique de confidentialité",
    intro:
      "Shenzhen FOREACH Technology Co., Ltd. (« FOREACH », « nous » ou « notre ») respecte votre vie privée. Cette politique décrit la manière dont nous collectons, utilisons, conservons et protégeons les informations lorsque vous utilisez ce site.",
    lastUpdated: "Dernière mise à jour : 21 juillet 2026",
    home: "Accueil",
    translationNotice:
      "Avis de traduction : cette version a été traduite et relue par notre équipe avec l’appui d’outils de traduction. Contactez-nous si une formulation n’est pas claire.",
    sections: [
      {
        title: "1. Champ d’application",
        paragraphs: [
          "Cette politique s’applique au site officiel de FOREACH et à ses fonctions de recherche de produits, outils techniques, téléchargements, demandes et contacts.",
          "Elle ne régit pas les sites, plateformes ou services tiers accessibles par des liens externes.",
        ],
      },
      {
        title: "2. Informations susceptibles d’être collectées",
        paragraphs: [
          "Nous traitons les informations uniquement dans la mesure raisonnablement nécessaire au fonctionnement du site, aux réponses commerciales ou techniques et à l’amélioration de l’expérience.",
        ],
        bullets: [
          "Les informations fournies volontairement : nom, entreprise, pays ou région, e-mail, téléphone, besoins produits, contenu de la demande et pièces jointes.",
          "Les informations techniques nécessaires au fonctionnement et à la sécurité : navigateur, appareil, heure d’accès, état de la requête et informations réseau.",
          "Les données d’utilisation générées après votre consentement aux cookies analytiques : pages consultées, provenance, appareil, navigateur et interactions.",
          "Les données saisies dans la recherche, les outils de sélection ou les calculateurs afin de fournir le résultat demandé.",
        ],
      },
      {
        title: "3. Utilisation des informations",
        paragraphs: ["Nous pouvons utiliser les informations pour :"],
        bullets: [
          "Répondre aux demandes de produits, questions techniques, demandes de coopération et autres communications.",
          "Fournir la recherche de produits, la recherche de raccords de remplacement, les calculs de résistance fluidique et les téléchargements.",
          "Créer et gérer les dossiers de demandes et organiser le suivi commercial ou technique.",
          "Maintenir la sécurité, diagnostiquer les erreurs, prévenir les abus et améliorer les performances.",
          "Avec votre consentement, analyser les visites et l’utilisation des fonctions pour améliorer le site.",
          "Respecter les exigences applicables et protéger les intérêts légitimes.",
        ],
      },
      {
        title: "4. Cookies et Google Analytics",
        paragraphs: [
          "Le site utilise un cookie essentiel pour mémoriser votre choix et ne charge Google Analytics qu’après votre consentement.",
          "Le cookie « foreach_cookie_consent_v1 » indique si les cookies analytiques sont autorisés et est actuellement conservé jusqu’à 180 jours.",
          "Lorsque les cookies analytiques sont autorisés, Google Analytics peut utiliser des cookies associés et des données d’utilisation. Nous n’envoyons pas intentionnellement les noms, e-mails, téléphones, textes de demandes ou pièces jointes à Google Analytics.",
          "Le stockage destiné à la personnalisation publicitaire n’est actuellement pas activé. Vous pouvez modifier ou retirer votre consentement via « Paramètres des cookies » dans le pied de page.",
        ],
      },
      {
        title: "5. Prestataires et divulgation",
        paragraphs: [
          "Nous pouvons faire appel à des prestataires pour l’hébergement, la sécurité, les communications par e-mail et l’analyse du site.",
          "Les informations liées à Google Analytics peuvent être traitées par Google conformément à ses conditions et pratiques de confidentialité.",
          "Nous ne communiquons pas les informations personnelles à des tiers non liés sans motif valable, sauf obligation légale, protection d’intérêts légitimes, opération d’entreprise ou autorisation.",
        ],
      },
      {
        title: "6. Traitement international",
        paragraphs: [
          "Le site étant destiné à des clients du monde entier, certains prestataires ou équipes peuvent se trouver en dehors de votre pays ou région.",
          "En cas de traitement transfrontalier, nous prenons des mesures raisonnables conformément aux exigences applicables.",
        ],
      },
      {
        title: "7. Conservation",
        paragraphs: [
          "Nous conservons les informations uniquement pendant la durée nécessaire aux finalités décrites, aux obligations commerciales, aux litiges et aux exigences légales.",
          "Les demandes sont conservées selon l’état des échanges et les besoins de tenue de dossiers. Les données Google Analytics sont conservées selon la durée configurée dans notre propriété GA4.",
          "Lorsque les informations ne sont plus nécessaires, nous prenons des mesures raisonnables pour les supprimer, les anonymiser ou en limiter l’utilisation.",
        ],
      },
      {
        title: "8. Vos choix et vos droits",
        paragraphs: [
          "Selon la loi applicable, vous pouvez demander l’accès, la rectification, la suppression ou la limitation des informations, vous opposer à certains traitements, retirer votre consentement ou demander une copie.",
          "Vous pouvez modifier votre choix analytique depuis « Paramètres des cookies » dans le pied de page.",
          "Nous pouvons devoir vérifier votre identité et la portée de la demande.",
        ],
      },
      {
        title: "9. Sécurité",
        paragraphs: [
          "Nous utilisons des mesures techniques et organisationnelles raisonnables pour réduire les risques d’accès, divulgation, modification, perte ou utilisation abusive.",
          "Aucune transmission ou méthode de stockage électronique ne peut être garantie comme totalement sécurisée.",
        ],
      },
      {
        title: "10. Mineurs",
        paragraphs: [
          "Ce site est principalement destiné aux entreprises, ingénieurs et professionnels du secteur, et non aux mineurs.",
          "Nous ne collectons pas sciemment de données personnelles de mineurs via ce site.",
        ],
      },
      {
        title: "11. Modifications",
        paragraphs: [
          "Nous pouvons mettre à jour cette politique lorsque les fonctions, prestataires ou exigences applicables changent.",
          "La version mise à jour sera publiée sur cette page avec une nouvelle date.",
        ],
      },
    ],
    contact: {
      title: "12. Nous contacter",
      intro:
        "Pour toute question concernant cette politique, les cookies ou le traitement des informations personnelles, contactez FOREACH :",
      companyLabel: "Société",
      company: "Shenzhen FOREACH Technology Co., Ltd.",
      emailLabel: "E-mail",
      addressLabel: "Adresse",
      address:
        "1301, Building 2, Yufengda Industrial Park, No. 1008 Guangqiao Avenue, Guangming District, Shenzhen, Guangdong, China",
    },
  },

  ko: {
    eyebrow: "개인정보 및 데이터 보호",
    title: "개인정보 처리방침",
    intro:
      "Shenzhen FOREACH Technology Co., Ltd.(이하 “FOREACH” 또는 “당사”)는 개인정보를 중요하게 생각합니다. 본 방침은 웹사이트 이용 시 정보를 수집, 이용, 보관 및 보호하는 방법을 설명합니다.",
    lastUpdated: "최종 업데이트: 2026년 7월 21일",
    home: "홈",
    translationNotice:
      "번역 안내: 이 버전은 번역 도구의 지원을 받아 담당자가 번역하고 검토했습니다. 표현이 불분명한 경우 당사에 문의해 주십시오.",
    sections: [
      {
        title: "1. 적용 범위",
        paragraphs: [
          "본 방침은 FOREACH 공식 웹사이트와 제품 검색, 기술 도구, 자료 다운로드, 문의 및 연락 기능에 적용됩니다.",
          "외부 링크를 통해 방문하는 제3자 웹사이트, 플랫폼 또는 서비스에는 적용되지 않습니다.",
        ],
      },
      {
        title: "2. 수집할 수 있는 정보",
        paragraphs: [
          "웹사이트 운영, 비즈니스 또는 기술 문의 대응 및 이용 경험 개선에 합리적으로 필요한 범위에서만 정보를 처리합니다.",
        ],
        bullets: [
          "이름, 회사, 국가 또는 지역, 이메일, 전화번호, 제품 요구사항, 문의 내용 및 사용자가 업로드한 첨부파일.",
          "브라우저, 기기, 접속 시간, 요청 상태 및 네트워크 정보 등 운영과 보안에 필요한 기술 정보.",
          "분석 쿠키에 동의한 후 생성되는 방문 페이지, 유입 페이지, 기기 및 브라우저 유형, 기능 이용 정보.",
          "검색, 제품 선택 조회 또는 계산 도구에 입력하여 요청한 결과를 제공하는 데 사용되는 정보.",
        ],
      },
      {
        title: "3. 정보 이용 목적",
        paragraphs: ["정보는 다음 목적으로 이용될 수 있습니다."],
        bullets: [
          "제품 문의, 기술 질문, 협력 요청 및 기타 연락에 응답.",
          "제품 검색, 피팅 대체 검색, 유체 저항 계산, 다운로드 등 웹사이트 기능 제공.",
          "문의 기록 관리 및 비즈니스 또는 기술 후속 연락.",
          "보안 유지, 오류 진단, 오용 방지 및 성능 개선.",
          "동의 후 방문 및 기능 이용을 분석하여 콘텐츠와 이용 경험 개선.",
          "적용되는 요구사항 준수 및 정당한 권익 보호.",
        ],
      },
      {
        title: "4. 쿠키 및 Google Analytics",
        paragraphs: [
          "웹사이트는 개인정보 선택을 기억하기 위한 필수 쿠키를 사용하며, 동의를 받은 후에만 Google Analytics를 로드합니다.",
          "필수 쿠키 “foreach_cookie_consent_v1”은 분석 쿠키 허용 여부를 기록하며 현재 최대 180일 동안 저장됩니다.",
          "분석 쿠키를 허용하면 Google Analytics가 관련 쿠키와 이용 정보를 처리할 수 있습니다. 이름, 이메일, 전화번호, 문의 본문 또는 첨부파일 내용을 Google Analytics에 의도적으로 전송하지 않습니다.",
          "현재 광고 개인화 저장 기능은 사용하지 않습니다. Footer의 “쿠키 설정”에서 언제든지 분석 동의를 변경하거나 철회할 수 있습니다.",
        ],
      },
      {
        title: "5. 서비스 제공업체 및 제공",
        paragraphs: [
          "웹 호스팅, 보안, 이메일 통신 및 분석을 위해 필요한 범위에서 서비스 제공업체를 이용할 수 있습니다.",
          "Google Analytics 관련 정보는 Google의 서비스 약관과 개인정보 보호 관행에 따라 처리될 수 있습니다.",
          "법적 요구, 정당한 권익 보호, 기업 거래 또는 사용자 승인 없이 관련 없는 제3자에게 개인정보를 제공하지 않습니다.",
        ],
      },
      {
        title: "6. 국외 처리",
        paragraphs: [
          "전 세계 고객을 대상으로 하므로 일부 서비스 제공업체나 담당 팀이 사용자의 국가 또는 지역 밖에 있을 수 있습니다.",
          "국외 처리가 발생하는 경우 적용되는 요구사항에 따라 합리적인 보호 조치를 취합니다.",
        ],
      },
      {
        title: "7. 보관 기간",
        paragraphs: [
          "명시된 목적, 비즈니스 의무, 분쟁 해결 및 법적 요구에 필요한 기간 동안만 정보를 보관합니다.",
          "문의 정보는 연락 상태와 기록 필요성에 따라 보관합니다. Google Analytics 데이터는 GA4 속성에 설정된 기간에 따라 보관됩니다.",
          "더 이상 필요하지 않은 정보는 합리적인 방법으로 삭제, 익명화하거나 이용을 제한합니다.",
        ],
      },
      {
        title: "8. 선택 및 권리",
        paragraphs: [
          "적용 법률에 따라 열람, 정정, 삭제, 처리 제한, 특정 처리에 대한 이의 제기, 동의 철회 또는 정보 사본 요청 권리가 있을 수 있습니다.",
          "Footer의 “쿠키 설정”에서 분석 선택을 변경할 수 있습니다.",
          "요청 처리 전 본인과 요청 범위를 확인할 수 있습니다.",
        ],
      },
      {
        title: "9. 보안",
        paragraphs: [
          "무단 접근, 공개, 변경, 분실 또는 오용 위험을 줄이기 위해 합리적인 기술적·관리적 조치를 사용합니다.",
          "인터넷 전송이나 전자 저장 방식은 절대적인 보안을 보장할 수 없습니다.",
        ],
      },
      {
        title: "10. 미성년자",
        paragraphs: [
          "본 웹사이트는 주로 기업 고객, 엔지니어 및 산업 전문가를 대상으로 하며 미성년자를 대상으로 하지 않습니다.",
          "웹사이트를 통해 미성년자의 개인정보를 고의로 수집하지 않습니다.",
        ],
      },
      {
        title: "11. 방침 변경",
        paragraphs: [
          "기능, 서비스 제공업체 또는 적용 요구사항이 변경되면 본 방침을 업데이트할 수 있습니다.",
          "업데이트된 버전은 변경된 날짜와 함께 본 페이지에 게시됩니다.",
        ],
      },
    ],
    contact: {
      title: "12. 문의",
      intro:
        "본 방침, 쿠키 설정 또는 개인정보 처리와 관련된 문의는 FOREACH로 연락해 주십시오.",
      companyLabel: "회사",
      company: "Shenzhen FOREACH Technology Co., Ltd.",
      emailLabel: "이메일",
      addressLabel: "주소",
      address:
        "1301, Building 2, Yufengda Industrial Park, No. 1008 Guangqiao Avenue, Guangming District, Shenzhen, Guangdong, China",
    },
  },

  ru: {
    eyebrow: "Конфиденциальность и защита данных",
    title: "Политика конфиденциальности",
    intro:
      "Shenzhen FOREACH Technology Co., Ltd. («FOREACH», «мы» или «наш») уважает вашу конфиденциальность. В этой политике описано, как мы собираем, используем, храним и защищаем информацию при использовании сайта.",
    lastUpdated: "Последнее обновление: 21 июля 2026 года",
    home: "Главная",
    translationNotice:
      "Примечание о переводе: эта версия переведена и проверена нашей командой с использованием вспомогательных инструментов перевода. Свяжитесь с нами, если какая-либо формулировка неясна.",
    sections: [
      {
        title: "1. Область применения",
        paragraphs: [
          "Политика применяется к официальному сайту FOREACH, поиску продукции, техническим инструментам, загрузкам, запросам и контактным функциям.",
          "Она не распространяется на сторонние сайты, платформы и сервисы, доступные по внешним ссылкам.",
        ],
      },
      {
        title: "2. Информация, которую мы можем собирать",
        paragraphs: [
          "Мы обрабатываем информацию только в разумно необходимом объёме для работы сайта, ответа на деловые или технические запросы и улучшения взаимодействия.",
        ],
        bullets: [
          "Предоставленные вами данные: имя, компания, страна или регион, электронная почта, телефон, требования к продукции, содержание запроса и вложения.",
          "Техническая информация для работы и безопасности: браузер, устройство, время доступа, состояние запроса и сетевые данные.",
          "Данные об использовании после согласия на аналитические Cookie: посещённые страницы, источник перехода, тип устройства, браузер и взаимодействия.",
          "Данные, вводимые в поиск, подбор продукции или калькуляторы для предоставления запрошенного результата.",
        ],
      },
      {
        title: "3. Использование информации",
        paragraphs: ["Информация может использоваться для:"],
        bullets: [
          "Ответа на запросы о продукции, технические вопросы, предложения о сотрудничестве и другие обращения.",
          "Работы поиска продукции, поиска аналогов фитингов, расчёта гидравлического сопротивления и загрузок.",
          "Создания записей о запросах и организации последующего делового или технического общения.",
          "Поддержания безопасности, диагностики ошибок, предотвращения злоупотреблений и улучшения производительности.",
          "Анализа посещений и использования функций с вашего согласия.",
          "Соблюдения применимых требований и защиты законных интересов.",
        ],
      },
      {
        title: "4. Cookie и Google Analytics",
        paragraphs: [
          "Сайт использует необходимый Cookie для сохранения вашего выбора и загружает Google Analytics только после получения согласия.",
          "Cookie «foreach_cookie_consent_v1» хранит информацию о разрешении аналитических Cookie и в настоящее время сохраняется до 180 дней.",
          "При разрешении аналитических Cookie Google Analytics может использовать связанные Cookie и данные об использовании. Мы намеренно не передаём в Google Analytics имена, адреса электронной почты, телефоны, тексты запросов или содержимое вложений.",
          "Хранилище для рекламной персонализации сейчас не включено. Изменить или отозвать согласие можно через «Настройки Cookie» в Footer.",
        ],
      },
      {
        title: "5. Поставщики услуг и раскрытие",
        paragraphs: [
          "Мы можем использовать поставщиков услуг для хостинга, безопасности, электронной почты и веб-аналитики только в необходимом объёме.",
          "Информация Google Analytics может обрабатываться Google в соответствии с его условиями и правилами конфиденциальности.",
          "Мы не раскрываем персональную информацию несвязанным третьим лицам без действительной причины, кроме требований закона, защиты законных интересов, корпоративной сделки или вашего разрешения.",
        ],
      },
      {
        title: "6. Международная обработка",
        paragraphs: [
          "Поскольку сайт обслуживает клиентов по всему миру, некоторые поставщики или команды могут находиться за пределами вашей страны или региона.",
          "При трансграничной обработке мы принимаем разумные меры в соответствии с применимыми требованиями.",
        ],
      },
      {
        title: "7. Срок хранения",
        paragraphs: [
          "Мы храним информацию только в течение срока, необходимого для описанных целей, деловых обязательств, разрешения споров и правовых требований.",
          "Данные запросов хранятся с учётом статуса общения и требований к деловым записям. Данные Google Analytics хранятся в соответствии с периодом, настроенным в свойстве GA4.",
          "Когда информация больше не нужна, мы принимаем разумные меры для её удаления, обезличивания или ограничения использования.",
        ],
      },
      {
        title: "8. Ваш выбор и права",
        paragraphs: [
          "В зависимости от применимого законодательства вы можете иметь право запросить доступ, исправление, удаление или ограничение обработки, возразить против определённой обработки, отозвать согласие или получить копию данных.",
          "Изменить аналитические настройки можно через «Настройки Cookie» в Footer.",
          "Перед выполнением запроса нам может потребоваться подтвердить вашу личность и объём запроса.",
        ],
      },
      {
        title: "9. Безопасность",
        paragraphs: [
          "Мы применяем разумные технические и организационные меры для снижения риска несанкционированного доступа, раскрытия, изменения, потери или неправомерного использования.",
          "Ни один способ передачи или электронного хранения не может гарантировать абсолютную безопасность.",
        ],
      },
      {
        title: "10. Несовершеннолетние",
        paragraphs: [
          "Сайт предназначен прежде всего для корпоративных клиентов, инженеров и специалистов отрасли, а не для несовершеннолетних.",
          "Мы сознательно не собираем персональные данные несовершеннолетних через сайт.",
        ],
      },
      {
        title: "11. Изменения политики",
        paragraphs: [
          "Мы можем обновлять политику при изменении функций, поставщиков услуг или применимых требований.",
          "Обновлённая версия будет опубликована на этой странице с новой датой.",
        ],
      },
    ],
    contact: {
      title: "12. Связаться с нами",
      intro:
        "По вопросам политики, Cookie или обработки персональной информации свяжитесь с FOREACH:",
      companyLabel: "Компания",
      company: "Shenzhen FOREACH Technology Co., Ltd.",
      emailLabel: "Электронная почта",
      addressLabel: "Адрес",
      address:
        "1301, Building 2, Yufengda Industrial Park, No. 1008 Guangqiao Avenue, Guangming District, Shenzhen, Guangdong, China",
    },
  },
};

type PrivacyPolicyPageProps = {
  locale: LocaleCode;
};

function getHomeHref(locale: LocaleCode) {
  return locale === "zh-CN" ? "/" : `/${locale}`;
}

export default function PrivacyPolicyPage({
  locale,
}: PrivacyPolicyPageProps) {
  const copy = privacyPolicyCopy[locale];

  return (
    <main className={styles.page}>
      <SiteBreadcrumb
        className={styles.breadcrumb}
        variant="bar"
        items={[
          {
            label: copy.home,
            href: getHomeHref(locale),
          },
          {
            label: copy.title,
          },
        ]}
      />

      <div className={styles.container}>

        <header className={styles.header}>
          <h1 className={styles.title}>
            {copy.title}
          </h1>

          <p className={styles.intro}>
            {copy.intro}
          </p>

          <p className={styles.updated}>
            {copy.lastUpdated}
          </p>

          {copy.translationNotice ? (
            <aside className={styles.translationNotice}>
              {copy.translationNotice}
            </aside>
          ) : null}
        </header>

        <div className={styles.content}>
          {copy.sections.map((section) => (
            <section
              className={styles.section}
              key={section.title}
            >
              <h2 className={styles.sectionTitle}>
                {section.title}
              </h2>

              {section.paragraphs.map((paragraph) => (
                <p
                  className={styles.paragraph}
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets ? (
                <ul className={styles.list}>
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              {copy.contact.title}
            </h2>

            <p className={styles.paragraph}>
              {copy.contact.intro}
            </p>

            <div className={styles.contactCard}>
              <p className={styles.contactLine}>
                <span className={styles.contactLabel}>
                  {copy.contact.companyLabel}:{" "}
                </span>
                {copy.contact.company}
              </p>

              <p className={styles.contactLine}>
                <span className={styles.contactLabel}>
                  {copy.contact.emailLabel}:{" "}
                </span>

                <a
                  className={styles.contactLink}
                  href="mailto:sales@foreachtek.com"
                >
                  sales@foreachtek.com
                </a>
              </p>

              <p className={styles.contactLine}>
                <span className={styles.contactLabel}>
                  {copy.contact.addressLabel}:{" "}
                </span>
                {copy.contact.address}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}