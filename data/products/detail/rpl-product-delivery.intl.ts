import hindi from "./rpl-guide-locales/delivery.hi.json";
import type { RplGuideLocale } from "./rpl-guide-locales/types";

type RplDeliveryLocale = RplGuideLocale | "de" | "it" | "hi";

type RplDeliveryCopy = {
  lead: string;
  rows: readonly { title: string; paragraphs: readonly string[]; photos: readonly (readonly [string, string])[] }[];
  warranty: string;
  warrantyParagraphs: readonly string[];
  email: string;
  phone: string;
  hours: string;
  support: string;
};

// Translations of the approved Chinese RPL delivery copy. Shipping terms do not
// extend domestic arrangements to overseas orders.
const copy: Record<RplDeliveryLocale, RplDeliveryCopy> = {
  hi: {
    ...hindi,
    rows: hindi.rows.map(row => ({
      ...row,
      photos: row.photos.map(([alt, caption]) => [alt, caption] as const),
    })),
  },
  de: {
    lead: "Wir liefern das bestätigte Modell in der vereinbarten Ausführung. Die Fotos zeigen die tatsächliche Verpackung der ventillosen Pumpen. Einlagen, Zubehör, Stückzahl je Karton und Begleitunterlagen richten sich nach der Bestellung.",
    rows: [
      {
        title: "Innenverpackung",
        paragraphs: [
          "Produktschutz: Schaumstoff, Trenner oder andere Schutzmaterialien werden passend zum bestätigten Produktaufbau ausgewählt, um Stöße und Druck beim Transport zu mindern.",
          "Zubehör: Kabelbäume und weiteres Zubehör entsprechen der bestätigten Konfiguration und werden getrennt vom Produkt verpackt.",
          "Kennzeichnung: Prüfen Sie nach Erhalt Modell, Artikelnummer, Stückzahl und Angaben zur Rückverfolgbarkeit.",
        ],
        photos: [["Ventillose Pumpen und Kabelbäume in getrennten Schaumstofffächern", "Getrennter Schutz für Produkte und Kabelbäume"], ["Schützende Schaumstoffabdeckung über den ventillosen Pumpen im Karton", "Schaumstoffabdeckung"]],
      },
      {
        title: "Außenverpackung und Begleitunterlagen",
        paragraphs: [
          "Schutzverpackung: Einlage und Außenkarton schützen Produkt und Zubehör. Die Anzahl pro Verpackung richtet sich nach der Bestellung.",
          "Betriebsinformationen: Unterlagen zu Verdrahtung, Einbau und Betrieb werden entsprechend der gelieferten Ausführung und der Bestellvereinbarung bereitgestellt.",
          "Qualitätsunterlagen: Konformitätsnachweise und Prüfberichte werden entsprechend der Projektvereinbarung bereitgestellt.",
        ],
        photos: [["In einer Schutzhülle verpacktes und mitgeliefertes Werksprüfprotokoll", "Beiliegendes Prüfprotokoll"], ["Materialetikett und Rückverfolgbarkeitskennzeichnung am Pumpenkarton", "Kartonkennzeichnung und Rückverfolgbarkeit"]],
      },
      {
        title: "Versand und Wareneingang",
        paragraphs: [
          "Versand: Wir versenden gemäß bestätigtem Liefertermin und vereinbarter Versand- oder Transportart. Die Sendungsverfolgung wird nach Versand bereitgestellt.",
          "Wareneingang: Prüfen Sie Modell, Stückzahl und Verpackung. Bei Schäden oder fehlenden Teilen bewahren Sie die Verpackung und Fotos auf und kontaktieren Sie uns zeitnah.",
          "Abnahme: Prüfen Sie Maße, Konfiguration und Qualitätsanforderungen anhand der Bestellung oder Qualitätsvereinbarung. Geben Sie besondere Lieferanforderungen bei der Bestellung an.",
        ],
        photos: [["Mitarbeiter beim Prüfen und Verpacken ventilloser Pumpen", "Verpackungsarbeiten"], ["Verschlossener FOREACH-Karton mit ventillosen Pumpen für den Versand", "Verschlossen und versandbereit"]],
      },
    ],
    warranty: "Garantie und Kundendienst",
    warrantyParagraphs: [
      "Garantiezeit: Für Pumpen gilt ab dem ersten Verkauf eine Garantie von 18 Monaten.",
      "Garantieumfang: Die Garantie umfasst Herstellungs- und Materialfehler. Ausgeschlossen sind unsachgemäße Verwendung, nicht genehmigte Änderungen, nicht vorschriftsgemäße Installation oder Nutzung sowie normaler Verschleiß.",
      "Rücksendungen: Kontaktieren Sie uns vor dem Versand und holen Sie eine Freigabe ein. Entfernen Sie Chemikalien und andere gefährliche Rückstände aus medienberührten Produkten. Für Verpackung, Zubehör, Kosten und Risiken gelten die Verkaufsbedingungen und die vereinbarte Rücksenderegelung. Rückgabe und Umtausch kundenspezifischer und nicht standardisierter Produkte richten sich nach den Verkaufsbedingungen.",
    ],
    email: "E-Mail",
    phone: "Telefon",
    hours: "Servicezeiten: Montag bis Freitag, 08:30–18:00 Uhr Pekinger Zeit (UTC+8).",
    support: "Kontaktieren Sie den Kundendienst per Telefon, E-Mail, über das folgende Formular oder Ihre Vertriebsvertretung. Geben Sie Modell, Betriebsbedingungen und die wichtigsten Symptome an.",
  },
  it: {
    lead: "La consegna segue il modello e la configurazione confermati. Le foto mostrano l'imballaggio effettivo della serie senza valvole. Inserti, accessori, quantità per scatola e documenti di accompagnamento dipendono dall'ordine.",
    rows: [
      {
        title: "Imballaggio interno",
        paragraphs: [
          "Schiuma, divisori o altre protezioni sono scelti in base alla struttura del prodotto confermato per limitare urti e compressioni durante il trasporto.",
          "Cablaggi e altri accessori rispettano la configurazione confermata e sono confezionati separatamente dal prodotto.",
          "Al ricevimento verificare modello, codice articolo, quantità e dati di tracciabilità.",
        ],
        photos: [["Pompe senza valvole e cablaggi in scomparti separati di schiuma", "Protezione separata di pompe e cablaggi"], ["Coperchio in schiuma sopra le pompe senza valvole nella scatola", "Coperchio protettivo in schiuma"]],
      },
      {
        title: "Imballaggio esterno e documenti di accompagnamento",
        paragraphs: [
          "L'inserto e la scatola esterna proteggono prodotto e accessori. La quantità per confezione segue l'ordine.",
          "Le informazioni su cablaggio, montaggio e funzionamento sono fornite secondo la versione consegnata e quanto concordato nell'ordine.",
          "Certificati di conformità e rapporti di controllo sono forniti secondo gli accordi di progetto.",
        ],
        photos: [["Rapporto di collaudo confezionato con le pompe senza valvole", "Rapporto di collaudo allegato"], ["Scheda di identificazione e marcature di tracciabilità sulla scatola", "Identificazione e tracciabilità della scatola"]],
      },
      {
        title: "Spedizione e verifiche al ricevimento",
        paragraphs: [
          "La spedizione segue la data e il mezzo di trasporto confermati. I dati di tracciamento vengono forniti dopo la partenza.",
          "Al ricevimento verificare modello, quantità e condizioni dell'imballaggio. In caso di danni o parti mancanti, conservare imballaggio e foto e contattarci tempestivamente.",
          "Verificare dimensioni, configurazione e requisiti di qualità secondo l'ordine o l'accordo di qualità. Indicare eventuali esigenze particolari al momento dell'ordine.",
        ],
        photos: [["Addetto al controllo e all'imballaggio delle pompe senza valvole", "Operazione d'imballaggio"], ["Scatola FOREACH sigillata con pompe senza valvole, pronta per la spedizione", "Scatola chiusa pronta per la spedizione"]],
      },
    ],
    warranty: "Garanzia e assistenza post-vendita",
    warrantyParagraphs: [
      "Le pompe sono coperte da garanzia per 18 mesi dalla data della prima vendita.",
      "La garanzia copre difetti di fabbricazione e dei materiali. Sono esclusi uso improprio, modifiche non autorizzate, installazione o uso non conformi e normale usura.",
      "Contattarci e ottenere l'autorizzazione prima di restituire un prodotto. Rimuovere sostanze chimiche e altri residui pericolosi dai componenti a contatto con il fluido. Imballaggio, accessori, costi e rischi seguono le condizioni di vendita e le modalità di reso concordate. Resi e sostituzioni di prodotti personalizzati o non standard sono regolati dalle condizioni di vendita.",
    ],
    email: "E-mail", phone: "Telefono", hours: "Assistenza dal lunedì al venerdì, 08:30–18:00 ora di Pechino (UTC+8).",
    support: "Contatta l'assistenza per telefono, e-mail o tramite il modulo qui sotto, oppure rivolgiti al referente commerciale. Indica modello, condizioni operative e sintomi principali.",
  },
  en: {
    lead: "Delivered in the confirmed model and configuration. The photos show actual packaging for the valveless pump series. Inserts, accessories, packing quantity and accompanying documents depend on the order.",
    rows: [
      { title: "Inner packaging", paragraphs: ["Product protection: foam, dividers or other protection are selected for the confirmed product structure to reduce impact and compression during transport.", "Accessories: harnesses and other accessories follow the confirmed configuration and are packed separately from the product.", "Identification: on receipt, check the model, part number, quantity and traceability information."], photos: [["Valveless pumps and harnesses in separate foam compartments", "Separate protection for products and harnesses"], ["Protective foam cover above the valveless pumps inside the carton", "Protective foam cover"]] },
      { title: "Outer packaging and accompanying documents", paragraphs: ["Cushioned packing: the insert and outer carton protect the product and accessories. The number packed follows the order.", "Operating information: wiring, installation and operating information are supplied according to the delivered version and order agreement.", "Quality documents: certificates of conformity and inspection reports are provided as agreed for the project."], photos: [["Bagged factory inspection record packed with the valveless pumps", "Accompanying inspection record"], ["Material identification card and traceability markings on the valveless pump carton", "Carton identification and traceability"]] },
      { title: "Dispatch and receiving checks", paragraphs: ["Dispatch: shipment follows the confirmed delivery date and courier or transport method. Tracking information is provided after dispatch.", "Receiving checks: check the model, quantity and packaging. If damage or missing items are found, retain the packaging and photos and contact us promptly.", "Acceptance: confirm dimensions, configuration and quality requirements against the order or quality agreement. State any special delivery requirements when ordering."], photos: [["Staff member checking and packing valveless pumps at the packing station", "Packing operation"], ["FOREACH valveless pump carton sealed and ready for dispatch", "Sealed and ready for dispatch"]] },
    ],
    warranty: "Warranty and after-sales support",
    warrantyParagraphs: ["Warranty period: pump products are covered for 18 months from the date the product is first sold.", "Coverage: defects in workmanship and materials. Misuse, unauthorized modification, non-compliant installation or use, and normal wear are not covered.", "Returns: contact us and obtain authorization before returning a product. Remove chemicals and other hazardous residues from wetted products. Return packaging, accessories, costs and risks follow the sales terms and the agreed return arrangements. Returns or exchanges of custom and non-standard products are governed by the sales terms."],
    email: "Email", phone: "Telephone", hours: "Service hours: Monday–Friday, 08:30–18:00 Beijing time (UTC+8).", support: "Contact support by telephone, email, the form below or your sales representative. Include the model, operating conditions and main symptoms.",
  },
  es: {
    lead: "Se entrega el modelo y la configuración confirmados. Las fotos muestran embalajes reales de la serie de bombas sin válvulas. Los insertos, accesorios, unidades por caja y documentos dependen del pedido.",
    rows: [
      { title: "Embalaje interior", paragraphs: ["Protección: se seleccionan espuma, separadores u otras protecciones según la estructura confirmada del producto para reducir golpes y compresión durante el transporte.", "Accesorios: los cables y demás accesorios corresponden a la configuración confirmada y se colocan separados del producto.", "Identificación: al recibirlo, compruebe modelo, referencia, cantidad e información de trazabilidad."], photos: [["Bombas sin válvulas y cables en compartimentos separados de espuma", "Protección separada de productos y cables"], ["Cubierta protectora de espuma sobre las bombas dentro de la caja", "Cubierta protectora de espuma"]] },
      { title: "Embalaje exterior y documentación", paragraphs: ["Protección en caja: el inserto y la caja exterior protegen el producto y sus accesorios. La cantidad embalada se ajusta al pedido.", "Información de uso: la información de cableado, instalación y funcionamiento se facilita según la versión suministrada y lo acordado en el pedido.", "Documentos de calidad: los certificados de conformidad e informes de inspección se facilitan según el acuerdo de calidad del proyecto."], photos: [["Registro de inspección de fábrica embolsado y colocado con las bombas", "Registro de inspección adjunto"], ["Tarjeta de identificación del material y marcas de trazabilidad en la caja", "Identificación y trazabilidad de la caja"]] },
      { title: "Envío y comprobaciones de recepción", paragraphs: ["Envío: se organiza según la fecha y el medio de transporte confirmados. Tras la expedición se facilitan los datos de seguimiento.", "Recepción: compruebe modelo, cantidad y estado del embalaje. Si hay daños o faltan piezas, conserve embalaje y fotos y contacte con nosotros de inmediato.", "Aceptación: verifique dimensiones, configuración y requisitos de calidad según el pedido o acuerdo de calidad. Indique las necesidades especiales de entrega al realizar el pedido."], photos: [["Personal revisando y embalando bombas sin válvulas en el puesto de embalaje", "Operación de embalaje"], ["Caja FOREACH de bombas sin válvulas cerrada y preparada para el envío", "Caja cerrada y lista para el envío"]] },
    ],
    warranty: "Garantía y asistencia posventa",
    warrantyParagraphs: ["Plazo de garantía: las bombas tienen una garantía de 18 meses desde la fecha de primera venta del producto.", "Cobertura: defectos de fabricación y materiales. Quedan excluidos el uso indebido, las modificaciones no autorizadas, la instalación o utilización contrarias a los requisitos y el desgaste normal.", "Devoluciones: contacte con nosotros y obtenga autorización antes de devolver el producto. Elimine productos químicos y residuos peligrosos de los componentes mojados. Embalaje, accesorios, costes y riesgos se rigen por las condiciones de venta y la solución de devolución acordada. Las devoluciones y cambios de productos personalizados o no estándar se rigen por las condiciones de venta."],
    email: "Correo electrónico", phone: "Teléfono", hours: "Horario de atención: lunes a viernes, 08:30–18:00, hora de Pekín (UTC+8).", support: "Contacte por teléfono, correo electrónico, el formulario siguiente o su representante comercial. Indique modelo, condiciones de uso y síntomas principales.",
  },
  fr: {
    lead: "Livraison selon le modèle et la configuration confirmés. Les photos montrent le conditionnement réel de la série de pompes sans valve. Calages, accessoires, quantité par carton et documents dépendent de la commande.",
    rows: [
      { title: "Emballage intérieur", paragraphs: ["Protection : mousses, séparateurs ou autres protections sont choisis selon la structure confirmée du produit pour limiter chocs et compression pendant le transport.", "Accessoires : faisceaux et autres accessoires correspondent à la configuration confirmée et sont placés séparément du produit.", "Identification : à réception, vérifiez modèle, référence, quantité et informations de traçabilité."], photos: [["Pompes et faisceaux dans des compartiments de mousse séparés", "Protection séparée des produits et faisceaux"], ["Plaque de mousse protégeant les pompes à l’intérieur du carton", "Plaque de protection en mousse"]] },
      { title: "Emballage extérieur et documents joints", paragraphs: ["Calage : l’insert et le carton extérieur protègent le produit et les accessoires. La quantité emballée suit la commande.", "Informations d’utilisation : les informations de câblage, d’installation et de fonctionnement sont fournies selon la version livrée et l’accord de commande.", "Documents qualité : certificats de conformité et rapports de contrôle sont fournis selon l’accord qualité du projet."], photos: [["Relevé de contrôle de sortie placé sous sachet avec les pompes", "Relevé de contrôle joint"], ["Fiche d’identification et marquages de traçabilité du carton", "Identification et traçabilité du carton"]] },
      { title: "Expédition et contrôle à réception", paragraphs: ["Expédition : elle suit la date de livraison et le mode de transport confirmés. Les informations de suivi sont communiquées après l’envoi.", "Réception : vérifiez modèle, quantité et état de l’emballage. En cas de dommage ou de pièce manquante, conservez emballage et photos et contactez-nous rapidement.", "Acceptation : vérifiez dimensions, configuration et exigences qualité selon la commande ou l’accord qualité. Précisez tout besoin particulier de livraison à la commande."], photos: [["Contrôle et mise en carton de pompes sans valve au poste d’emballage", "Opération d’emballage"], ["Carton FOREACH fermé et prêt à expédier", "Carton fermé, prêt à expédier"]] },
    ],
    warranty: "Garantie et service après-vente",
    warrantyParagraphs: ["Durée de garantie : les pompes sont garanties 18 mois à compter de la première vente du produit.", "Couverture : défauts de fabrication et de matériaux. Sont exclus l’usage inapproprié, les modifications non autorisées, une installation ou utilisation non conforme et l’usure normale.", "Retours : contactez-nous et obtenez une autorisation avant tout retour. Éliminez les produits chimiques et résidus dangereux des pièces en contact avec le liquide. Emballage, accessoires, frais et risques sont régis par les conditions de vente et les modalités de retour convenues. Les retours et échanges de produits personnalisés ou non standard relèvent des conditions de vente."],
    email: "E-mail", phone: "Téléphone", hours: "Horaires : du lundi au vendredi, 08:30–18:00, heure de Pékin (UTC+8).", support: "Contactez le SAV par téléphone, e-mail, formulaire ci-dessous ou par votre interlocuteur commercial. Précisez le modèle, les conditions d’utilisation et les principaux symptômes.",
  },
  ko: {
    lead: "확정된 모델과 구성으로 납품합니다. 사진은 무밸브 펌프 시리즈의 실제 포장입니다. 완충재, 부속품, 포장 수량과 동봉 자료는 주문 구성에 따라 달라집니다.",
    rows: [
      { title: "내부 포장", paragraphs: ["제품 보호: 확정된 제품 구조에 맞춰 폼, 칸막이 등 보호재를 배치하여 운송 중 충격과 압축을 줄입니다.", "부속품: 배선과 기타 부속품은 확정 구성에 따라 제공하며 제품과 분리해 포장합니다.", "제품 식별: 수령 시 모델, 품번, 수량과 추적 정보를 확인하세요."], photos: [["폼 내부에 무밸브 펌프와 배선을 분리해 배치한 포장", "제품과 배선 분리 보호"], ["상자 안에서 펌프 위를 덮는 폼 보호 덮개", "폼 보호 덮개"]] },
      { title: "외부 포장 및 동봉 자료", paragraphs: ["완충 포장: 내부 완충재와 외부 상자가 제품 및 부속품을 보호합니다. 포장 수량은 주문에 따라 정합니다.", "사용 자료: 배선, 설치 및 사용 자료는 실제 공급 사양과 주문 시 합의에 따라 제공합니다.", "품질 문서: 적합성 증명서와 검사 보고서 등은 프로젝트 품질 합의에 따라 제공합니다."], photos: [["봉투에 넣어 펌프와 함께 포장한 출하 검사 기록", "동봉 검사 기록"], ["무밸브 펌프 상자의 자재 식별 카드와 추적 표시", "외부 상자 식별 및 추적 표시"]] },
      { title: "출하 및 수령 확인", paragraphs: ["출하: 확정된 납기와 택배 또는 운송 방식에 따라 출하하고 이후 운송 조회 정보를 제공합니다.", "수령 확인: 모델, 수량과 포장 상태를 확인하세요. 운송 손상이나 누락이 있으면 포장과 사진을 보관하고 신속히 연락해 주세요.", "검수: 치수, 구성과 품질 요구 사항은 주문 또는 품질 합의에 따라 확인하세요. 특별한 납품 요구는 주문 시 알려 주세요."], photos: [["포장 작업대에서 무밸브 펌프의 포장을 점검하는 작업자", "포장 작업"], ["봉함을 마치고 출하를 기다리는 FOREACH 무밸브 펌프 상자", "봉함 후 출하 대기"]] },
    ],
    warranty: "보증 및 사후 지원",
    warrantyParagraphs: ["보증 기간: 펌프 제품은 최초 판매일로부터 18개월 동안 보증합니다.", "보증 범위: 제조 공정과 재료의 결함에 적용됩니다. 오사용, 무단 개조, 설치·사용 요구 사항 미준수와 정상 마모는 보증 대상에서 제외됩니다.", "반송: 먼저 연락하여 승인을 받은 후 확정된 절차에 따라 반송하세요. 접액 제품의 화학 물질과 기타 유해 잔류물을 제거해야 합니다. 반송 포장, 부속품, 비용과 위험 부담은 판매 조건 및 합의된 절차에 따릅니다. 맞춤형 및 비표준 제품의 반품·교환은 판매 조건에 따릅니다."],
    email: "이메일", phone: "전화", hours: "지원 시간: 월요일~금요일 08:30–18:00, 베이징 시간(UTC+8).", support: "전화, 이메일, 아래 양식 또는 영업 담당자를 통해 문의할 수 있습니다. 모델, 사용 조건과 주요 증상을 알려 주세요.",
  },
  ru: {
    lead: "Поставка осуществляется по подтверждённой модели и комплектации. На фотографиях показана реальная упаковка серии бесклапанных насосов. Вкладыши, принадлежности, количество в коробке и документы зависят от заказа.",
    rows: [
      { title: "Внутренняя упаковка", paragraphs: ["Защита изделия: пеноматериал, разделители и другие средства выбираются по подтверждённой конструкции для снижения ударов и сжатия при перевозке.", "Принадлежности: жгуты и другие принадлежности соответствуют подтверждённой комплектации и размещаются отдельно от изделия.", "Идентификация: при получении проверьте модель, артикул, количество и данные прослеживаемости."], photos: [["Бесклапанные насосы и жгуты в отдельных отсеках пеноматериала", "Раздельная защита изделий и жгутов"], ["Защитная пенопластовая крышка над насосами внутри коробки", "Защитная крышка из пеноматериала"]] },
      { title: "Внешняя упаковка и документы", paragraphs: ["Укладка: вкладыш и внешняя коробка защищают изделие и принадлежности. Количество в упаковке определяется заказом.", "Информация по эксплуатации: сведения о подключении, монтаже и работе предоставляются для поставленной версии согласно заказу.", "Документы качества: сертификаты соответствия и протоколы контроля предоставляются по соглашению о качестве проекта."], photos: [["Упакованный в пакет протокол выходного контроля вместе с насосами", "Протокол контроля в комплекте"], ["Карточка идентификации материала и маркировка прослеживаемости на коробке", "Идентификация и прослеживаемость коробки"]] },
      { title: "Отправка и приёмка", paragraphs: ["Отправка: по согласованным срокам и способу перевозки. После отправки предоставляются данные отслеживания.", "Приёмка: проверьте модель, количество и состояние упаковки. При повреждениях или недостаче сохраните упаковку и фотографии и своевременно свяжитесь с нами.", "Проверка соответствия: размеры, комплектацию и требования к качеству сверяйте с заказом или соглашением о качестве. Особые требования к поставке укажите при заказе."], photos: [["Сотрудник проверяет упаковку бесклапанных насосов на упаковочном участке", "Упаковочные работы"], ["Заклеенная коробка FOREACH с бесклапанными насосами перед отправкой", "Коробка готова к отправке"]] },
    ],
    warranty: "Гарантия и послепродажная поддержка",
    warrantyParagraphs: ["Гарантийный срок: для насосов — 18 месяцев с даты первой продажи изделия.", "Покрытие: дефекты изготовления и материалов. Неправильное использование, несанкционированные изменения, нарушение требований монтажа или эксплуатации и нормальный износ не покрываются.", "Возврат: сначала свяжитесь с нами и получите разрешение. Удалите химические вещества и другие опасные остатки из смачиваемых изделий. Упаковка, принадлежности, расходы и риски регулируются условиями продажи и согласованным порядком возврата. Возврат и обмен заказных и нестандартных изделий определяются условиями продажи."],
    email: "Электронная почта", phone: "Телефон", hours: "Время работы: понедельник–пятница, 08:30–18:00 по пекинскому времени (UTC+8).", support: "Обратитесь по телефону, электронной почте, через форму ниже или к своему менеджеру. Укажите модель, условия работы и основные симптомы.",
  },
};

export function getRplDeliveryCopy(locale: string) {
  return copy[locale as RplDeliveryLocale];
}
