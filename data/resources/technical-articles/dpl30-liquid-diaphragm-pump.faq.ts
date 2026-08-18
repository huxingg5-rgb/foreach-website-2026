import type { TechnicalArticleLocale } from "./technical-articles.types";
import type { Dpl30FaqCopy } from "./dpl30-liquid-diaphragm-pump.types";

export const dpl30ArticleFaqCopy: Record<
  TechnicalArticleLocale,
  Dpl30FaqCopy
> = {
  "zh-CN": {
    title: "常见问题",
    items: [
      {
        question: "DPL30 的 300 mL/min 是什么流量？",
        answer:
          "300 mL/min 是当前 DPL30 规格书在规定测试条件下给出的空载流量参数，不能理解为设备在任何背压、吸程、管路或介质条件下都能达到 300 mL/min。实际流量需要结合液路阻力、流量—压力曲线和实际工作点判断。",
      },
      {
        question: "DPL30 在 100 kPa 下还能达到 300 mL/min 吗？",
        answer:
          "不能直接这样理解。300 mL/min 是空载流量，100 kPa 是额定压力，两者属于不同性能参数，不表示 DPL30 在 100 kPa 下仍能保持 300 mL/min。实际压力下的流量需要结合流量—压力曲线和实际液路确认。",
      },
      {
        question: "DPL30 的自吸高度是多少？",
        answer:
          "DPL30 在规定测试条件下的自吸高度为 6 mH₂O。实际自吸能力会受到液体性质、管径、管长、入口阻力、液位差、系统密封性及安装状态等因素影响，具体应用建议结合实际液路工况进行验证。",
      },
      {
        question: "DPL30 适合做医疗设备或 IVD 废液泵吗？",
        answer:
          "DPL30 可以作为 IVD、分析仪器、实验室自动化等设备废液排放工况的候选方案之一。最终仍需要根据废液介质、工作流量、系统背压、自吸需求、接液材料、运行时间和安装空间进行确认，并在实际液路中验证。",
      },
      {
        question: "DPL30 有刷和无刷版本怎么选？",
        answer:
          "运行时间有限且成本更敏感的设备，可以优先评估有刷版本；运行时间更长、整机生命周期要求更高的设备，可以优先评估无刷版本。当前规格数据为：有刷版本 3000 h，无刷版本 10000 h，测试条件均为额定电压、连续运行。这些寿命数据是规定测试条件下的参考值，不是对所有实际工况的绝对保证。",
      },
      {
        question: "DPL30 可以输送哪些液体？",
        answer:
          "当前规格书规定的标准工作介质是纯化水。其他液体需要结合完整接液材料组合进行评估，包括 PPS 泵头、EPDM 或 PTFE 膜片、EPDM 或 FFKM 阀片，同时还要确认液体名称、浓度、温度、接触时间和清洗方式等条件；不能仅凭 PTFE 或 FFKM 的材料名称判断整泵兼容性。",
      },
      {
        question: "在哪里查看 DPL30 规格书？",
        answer:
          "点击本文下方的“相关产品”，选择对应的 DPL30 产品并进入产品详情页，即可查看该产品当前关联的规格书。请按实际电机类型和具体型号进入相应详情页，避免将不同配置的资料混用。",
      },
      {
        question: "如何申请 DPL30 的 CAD / 3D 图纸？",
        answer:
          "点击本文下方的“相关产品”，选择对应的 DPL30 型号并进入产品详情页，然后在产品详情页提交 CAD / 3D 图纸申请。不同电机类型和具体配置的安装尺寸可能不同，建议按照最终选型申请对应型号的图纸。",
      },
    ],
  },
  en: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "What does the DPL30's 300 mL/min flow rate represent?",
        answer:
          "The 300 mL/min value is the no-load flow rate stated in the current DPL30 datasheet under the specified test conditions. It does not mean that the pump will deliver 300 mL/min under every back-pressure, suction-lift, tubing, or fluid condition. Actual flow should be determined from the fluidic resistance, flow-pressure curve, and operating point.",
      },
      {
        question: "Can the DPL30 still deliver 300 mL/min at 100 kPa?",
        answer:
          "No. The 300 mL/min value is the no-load flow rate, while 100 kPa is the rated pressure. They are separate performance parameters and do not mean that the DPL30 maintains 300 mL/min at 100 kPa. Flow under pressure should be confirmed from the flow-pressure curve and the actual fluidic circuit.",
      },
      {
        question: "What is the self-priming height of the DPL30?",
        answer:
          "Under the specified test conditions, the DPL30 has a self-priming height of 6 mH₂O. Actual self-priming performance may vary depending on fluid properties, tubing diameter and length, inlet resistance, liquid level difference, system sealing, and installation conditions. The final performance should be verified under the actual fluidic system conditions.",
      },
      {
        question: "Is the DPL30 suitable as a waste-liquid pump in medical or IVD equipment?",
        answer:
          "The DPL30 can be considered as one candidate for waste-liquid discharge in IVD instruments, analytical equipment, and laboratory automation systems. Final suitability should be confirmed from the waste-fluid properties, operating flow, system back pressure, self-priming requirement, wetted materials, operating time, and installation space, followed by testing in the actual fluidic circuit.",
      },
      {
        question: "How should I choose between brushed and brushless DPL30 versions?",
        answer:
          "For equipment with limited operating time and greater cost sensitivity, the brushed version can be evaluated first. For longer operating time and higher equipment-lifetime requirements, the brushless version can be prioritized. Current datasheet values are 3000 h for the brushed version and 10000 h for the brushless version, both at rated voltage under continuous operation. These are reference values under specified test conditions, not absolute guarantees for every application.",
      },
      {
        question: "What liquids can the DPL30 transfer?",
        answer:
          "The standard working medium specified in the current datasheet is purified water. Other liquids must be evaluated against the complete wetted-material combination, including the PPS pump head, EPDM or PTFE diaphragm, and EPDM or FFKM valve plates. The liquid name, concentration, temperature, contact time, and cleaning method must also be confirmed; pump compatibility cannot be determined from the PTFE or FFKM material name alone.",
      },
      {
        question: "Where can I view the DPL30 datasheet?",
        answer:
          "Select the applicable DPL30 product under Related Products below this article and open its product detail page to view the currently associated datasheet. Use the page for the actual motor type and model so that documents for different configurations are not mixed.",
      },
      {
        question: "How can I request a CAD / 3D drawing for the DPL30?",
        answer:
          "Select the applicable DPL30 model under Related Products below this article, open its product detail page, and submit a CAD / 3D drawing request there. Installation dimensions may vary by motor type and configuration, so request the drawing for the final selected model.",
      },
    ],
  },
  es: {
    title: "Preguntas frecuentes",
    items: [
      {
        question: "¿Qué representa el caudal de 300 mL/min de la DPL30?",
        answer:
          "Los 300 mL/min son el caudal sin carga indicado en la ficha técnica actual de la DPL30 bajo las condiciones de ensayo especificadas. No significa que la bomba entregue 300 mL/min con cualquier contrapresión, altura de aspiración, tubería o líquido. El caudal real debe determinarse según la resistencia del circuito, la curva caudal-presión y el punto de funcionamiento.",
      },
      {
        question: "¿Puede la DPL30 seguir suministrando 300 mL/min a 100 kPa?",
        answer:
          "No. Los 300 mL/min corresponden al caudal sin carga, mientras que 100 kPa es la presión nominal. Son parámetros de rendimiento distintos y no significan que la DPL30 mantenga 300 mL/min a 100 kPa. El caudal bajo presión debe confirmarse mediante la curva caudal-presión y el circuito real.",
      },
      {
        question: "¿Cuál es la altura de autocebado de la DPL30?",
        answer:
          "En las condiciones de ensayo especificadas, la DPL30 tiene una altura de autocebado de 6 mH₂O. El rendimiento real de autocebado puede variar según las propiedades del líquido, el diámetro y la longitud de la tubería, la resistencia de entrada, la diferencia de nivel, la estanqueidad del sistema y las condiciones de instalación. El rendimiento final debe verificarse en las condiciones reales del circuito de fluidos.",
      },
      {
        question: "¿Es adecuada la DPL30 como bomba de residuos líquidos en equipos médicos o IVD?",
        answer:
          "La DPL30 puede evaluarse como una opción para la descarga de residuos líquidos en instrumentos IVD, equipos analíticos y sistemas de automatización de laboratorio. La idoneidad final debe confirmarse según el líquido residual, el caudal de trabajo, la contrapresión, la necesidad de autocebado, los materiales mojados, el tiempo de funcionamiento y el espacio de instalación, y verificarse en el circuito real.",
      },
      {
        question: "¿Cómo elegir entre las versiones DPL30 con y sin escobillas?",
        answer:
          "Para equipos con tiempo de funcionamiento limitado y mayor sensibilidad al coste, puede evaluarse primero la versión con escobillas. Para periodos de funcionamiento más largos y mayores exigencias de vida útil, puede priorizarse la versión sin escobillas. Los valores actuales son 3000 h y 10000 h, respectivamente, ambos a tensión nominal y en funcionamiento continuo. Son valores de referencia bajo condiciones de ensayo especificadas, no garantías absolutas para todas las aplicaciones.",
      },
      {
        question: "¿Qué líquidos puede transferir la DPL30?",
        answer:
          "El medio de trabajo estándar indicado en la ficha técnica actual es agua purificada. Para otros líquidos debe evaluarse la combinación completa de materiales mojados: cabezal de PPS, diafragma de EPDM o PTFE y válvulas de EPDM o FFKM. También deben confirmarse el nombre, la concentración y la temperatura del líquido, el tiempo de contacto y el método de limpieza; la compatibilidad de la bomba no puede determinarse solo por la denominación PTFE o FFKM.",
      },
      {
        question: "¿Dónde puedo consultar la ficha técnica de la DPL30?",
        answer:
          "Seleccione el producto DPL30 correspondiente en Productos relacionados, al final de este artículo, y abra su página de detalle para consultar la ficha técnica actualmente asociada. Utilice la página del tipo de motor y modelo reales para no mezclar documentos de configuraciones distintas.",
      },
      {
        question: "¿Cómo puedo solicitar un plano CAD / 3D de la DPL30?",
        answer:
          "Seleccione el modelo DPL30 correspondiente en Productos relacionados, abra su página de detalle y envíe allí la solicitud del plano CAD / 3D. Las dimensiones de instalación pueden variar según el motor y la configuración, por lo que debe solicitarse el plano del modelo finalmente seleccionado.",
      },
    ],
  },
  fr: {
    title: "Questions fréquentes",
    items: [
      {
        question: "Que représente le débit de 300 mL/min de la DPL30 ?",
        answer:
          "Les 300 mL/min correspondent au débit à vide indiqué dans la fiche technique actuelle de la DPL30, dans les conditions d’essai spécifiées. Cette valeur ne signifie pas que la pompe délivre 300 mL/min quelles que soient la contre-pression, la hauteur d’aspiration, la tuyauterie ou le liquide. Le débit réel doit être déterminé à partir de la résistance du circuit, de la courbe débit-pression et du point de fonctionnement.",
      },
      {
        question: "La DPL30 peut-elle encore délivrer 300 mL/min à 100 kPa ?",
        answer:
          "Non. Les 300 mL/min correspondent au débit à vide, tandis que 100 kPa est la pression nominale. Il s’agit de deux paramètres de performance distincts qui ne signifient pas que la DPL30 maintient 300 mL/min à 100 kPa. Le débit sous pression doit être confirmé à l’aide de la courbe débit-pression et du circuit réel.",
      },
      {
        question: "Quelle est la hauteur d’auto-amorçage de la DPL30 ?",
        answer:
          "Dans les conditions d’essai spécifiées, la DPL30 présente une hauteur d’auto-amorçage de 6 mH₂O. Les performances réelles d’auto-amorçage peuvent varier selon les propriétés du liquide, le diamètre et la longueur des tubes, la résistance à l’entrée, la différence de niveau, l’étanchéité du système et les conditions d’installation. Les performances finales doivent être vérifiées dans les conditions réelles du circuit fluidique.",
      },
      {
        question: "La DPL30 convient-elle comme pompe d’effluents pour un équipement médical ou IVD ?",
        answer:
          "La DPL30 peut être évaluée comme solution possible pour l’évacuation d’effluents dans les instruments IVD, les équipements analytiques et les systèmes d’automatisation de laboratoire. L’adéquation finale doit être confirmée selon le liquide résiduel, le débit de travail, la contre-pression, le besoin d’auto-amorçage, les matériaux en contact, le temps de fonctionnement et l’espace disponible, puis vérifiée sur le circuit réel.",
      },
      {
        question: "Comment choisir entre les versions DPL30 à balais et brushless ?",
        answer:
          "Pour un équipement au temps de fonctionnement limité et plus sensible au coût, la version à balais peut être évaluée en priorité. Pour des durées de fonctionnement plus longues et des exigences de durée de vie plus élevées, la version brushless peut être privilégiée. Les valeurs actuelles sont respectivement de 3000 h et 10000 h, à la tension nominale et en fonctionnement continu. Il s’agit de valeurs de référence obtenues dans des conditions d’essai spécifiées, et non de garanties absolues pour toutes les applications.",
      },
      {
        question: "Quels liquides la DPL30 peut-elle transférer ?",
        answer:
          "Le fluide de travail standard indiqué dans la fiche technique actuelle est l’eau purifiée. Les autres liquides doivent être évalués avec la combinaison complète de matériaux en contact : tête en PPS, membrane en EPDM ou PTFE et clapets en EPDM ou FFKM. Le nom, la concentration et la température du liquide, le temps de contact et la méthode de nettoyage doivent également être confirmés ; la compatibilité de la pompe ne peut pas être déterminée à partir du seul nom PTFE ou FFKM.",
      },
      {
        question: "Où consulter la fiche technique de la DPL30 ?",
        answer:
          "Sélectionnez le produit DPL30 correspondant dans la section Produits associés sous cet article, puis ouvrez sa page de détail pour consulter la fiche technique actuellement associée. Utilisez la page correspondant au type de moteur et au modèle réels afin de ne pas mélanger les documents de configurations différentes.",
      },
      {
        question: "Comment demander un plan CAD / 3D de la DPL30 ?",
        answer:
          "Sélectionnez le modèle DPL30 correspondant dans la section Produits associés, ouvrez sa page de détail et envoyez-y une demande de plan CAD / 3D. Les dimensions d’installation peuvent varier selon le moteur et la configuration ; demandez donc le plan du modèle finalement sélectionné.",
      },
    ],
  },
  ko: {
    title: "자주 묻는 질문",
    items: [
      {
        question: "DPL30의 300 mL/min 유량은 무엇을 의미합니까?",
        answer:
          "300 mL/min은 현재 DPL30 사양서에 명시된 시험 조건에서의 무부하 유량입니다. 모든 배압, 흡입 높이, 배관 또는 유체 조건에서 항상 300 mL/min을 토출한다는 의미는 아닙니다. 실제 유량은 유로 저항, 유량-압력 곡선 및 실제 운전점을 기준으로 판단해야 합니다.",
      },
      {
        question: "DPL30은 100 kPa에서도 300 mL/min을 유지합니까?",
        answer:
          "아닙니다. 300 mL/min은 무부하 유량이고 100 kPa는 정격 압력으로, 서로 다른 성능 항목입니다. 따라서 DPL30이 100 kPa에서 300 mL/min을 유지한다는 의미가 아닙니다. 압력이 걸린 상태의 유량은 유량-압력 곡선과 실제 유로를 통해 확인해야 합니다.",
      },
      {
        question: "DPL30의 자흡 높이는 얼마입니까?",
        answer:
          "규정된 시험 조건에서 DPL30의 자흡 높이는 6 mH₂O입니다. 실제 자흡 성능은 유체 특성, 튜브 내경과 길이, 입구 저항, 액면 높이 차, 시스템 기밀성 및 설치 조건의 영향을 받을 수 있습니다. 최종 성능은 실제 유로 시스템 조건에서 검증해야 합니다.",
      },
      {
        question: "DPL30은 의료기기 또는 IVD 장비의 폐액 펌프로 적합합니까?",
        answer:
          "DPL30은 IVD 장비, 분석기기 및 실험실 자동화 시스템의 폐액 배출용 후보로 검토할 수 있습니다. 최종 적합성은 폐액의 특성, 운전 유량, 시스템 배압, 자흡 요구 조건, 접액 재질, 운전 시간 및 설치 공간을 기준으로 확인하고 실제 유로에서 검증해야 합니다.",
      },
      {
        question: "DPL30의 브러시 모터와 브러시리스 모터 버전은 어떻게 선택합니까?",
        answer:
          "운전 시간이 제한적이고 비용 민감도가 높은 장비에는 브러시 모터 버전을 우선 검토할 수 있습니다. 운전 시간이 길고 장비 수명 요구가 높은 경우에는 브러시리스 버전을 우선 검토할 수 있습니다. 현재 사양값은 브러시 모터 버전 3000 h, 브러시리스 버전 10000 h이며, 두 값 모두 정격 전압에서 연속 운전한 시험 조건을 기준으로 합니다. 이는 규정된 조건의 참고값이며 모든 실제 적용 조건에 대한 절대적인 보증은 아닙니다.",
      },
      {
        question: "DPL30은 어떤 액체를 이송할 수 있습니까?",
        answer:
          "현재 사양서에 명시된 표준 작동 유체는 정제수입니다. 다른 액체는 PPS 펌프 헤드, EPDM 또는 PTFE 다이어프램, EPDM 또는 FFKM 밸브 플레이트를 포함한 전체 접액 재질 조합을 기준으로 평가해야 합니다. 또한 액체명, 농도, 온도, 접촉 시간 및 세척 방법을 확인해야 하며, PTFE 또는 FFKM이라는 재질명만으로 펌프 전체의 호환성을 판단할 수 없습니다.",
      },
      {
        question: "DPL30 사양서는 어디에서 확인할 수 있습니까?",
        answer:
          "이 문서 하단의 관련 제품에서 해당 DPL30 제품을 선택한 후 제품 상세 페이지에서 현재 연결된 사양서를 확인할 수 있습니다. 서로 다른 구성의 자료가 혼용되지 않도록 실제 모터 유형과 모델에 해당하는 페이지를 이용하십시오.",
      },
      {
        question: "DPL30 CAD / 3D 도면은 어떻게 요청합니까?",
        answer:
          "이 문서 하단의 관련 제품에서 해당 DPL30 모델을 선택하고 제품 상세 페이지에서 CAD / 3D 도면을 요청하십시오. 모터 유형과 구성에 따라 설치 치수가 다를 수 있으므로 최종 선정 모델에 맞는 도면을 요청해야 합니다.",
      },
    ],
  },
  ru: {
    title: "Часто задаваемые вопросы",
    items: [
      {
        question: "Что означает расход DPL30 300 mL/min?",
        answer:
          "300 mL/min — это расход без нагрузки, указанный в текущем паспорте DPL30 для заданных условий испытания. Это не означает, что насос обеспечивает 300 mL/min при любом противодавлении, высоте всасывания, трубопроводе или жидкости. Фактический расход следует определять с учетом сопротивления контура, характеристики расход-давление и рабочей точки.",
      },
      {
        question: "Обеспечивает ли DPL30 расход 300 mL/min при 100 kPa?",
        answer:
          "Нет. 300 mL/min — это расход без нагрузки, а 100 kPa — номинальное давление. Это разные рабочие параметры, и они не означают, что DPL30 сохраняет расход 300 mL/min при 100 kPa. Расход под давлением следует подтверждать по характеристике расход-давление и на реальном гидравлическом контуре.",
      },
      {
        question: "Какова высота самовсасывания DPL30?",
        answer:
          "В заданных условиях испытания высота самовсасывания DPL30 составляет 6 mH₂O. Фактическая способность к самовсасыванию может зависеть от свойств жидкости, внутреннего диаметра и длины трубок, сопротивления на входе, перепада уровня жидкости, герметичности системы и условий монтажа. Окончательные характеристики следует проверять в реальных условиях гидравлического контура.",
      },
      {
        question: "Подходит ли DPL30 в качестве насоса для отвода жидких отходов в медицинском или IVD-оборудовании?",
        answer:
          "DPL30 можно рассматривать как один из вариантов для отвода жидких отходов в IVD-приборах, аналитическом оборудовании и системах лабораторной автоматизации. Окончательную пригодность следует подтверждать с учетом свойств отходов, рабочего расхода, противодавления, требований к самовсасыванию, смачиваемых материалов, времени работы и монтажного пространства, а затем проверять на реальном контуре.",
      },
      {
        question: "Как выбрать щеточную или бесщеточную версию DPL30?",
        answer:
          "Для оборудования с ограниченным временем работы и повышенной чувствительностью к стоимости сначала можно оценить щеточную версию. Для более длительной работы и повышенных требований к ресурсу оборудования приоритетной может быть бесщеточная версия. Текущие значения составляют 3000 h и 10000 h соответственно; оба получены при номинальном напряжении и непрерывной работе. Это справочные значения для заданных условий испытания, а не безусловная гарантия для всех применений.",
      },
      {
        question: "Какие жидкости может перекачивать DPL30?",
        answer:
          "Стандартная рабочая среда в текущем паспорте — очищенная вода. Для других жидкостей необходимо оценить полную комбинацию смачиваемых материалов: головку PPS, мембрану EPDM или PTFE и клапаны EPDM или FFKM. Также необходимо подтвердить название, концентрацию и температуру жидкости, время контакта и способ очистки; совместимость всего насоса нельзя определять только по названию PTFE или FFKM.",
      },
      {
        question: "Где посмотреть паспорт DPL30?",
        answer:
          "Выберите соответствующий продукт DPL30 в разделе сопутствующих продуктов под этой статьей и откройте его страницу, чтобы просмотреть актуальный паспорт. Используйте страницу фактического типа двигателя и модели, чтобы не смешивать документы разных конфигураций.",
      },
      {
        question: "Как запросить CAD / 3D-чертеж DPL30?",
        answer:
          "Выберите соответствующую модель DPL30 в разделе сопутствующих продуктов, откройте страницу продукта и отправьте на ней запрос CAD / 3D-чертежа. Монтажные размеры могут различаться в зависимости от типа двигателя и конфигурации, поэтому запрашивайте чертеж окончательно выбранной модели.",
      },
    ],
  },
};
