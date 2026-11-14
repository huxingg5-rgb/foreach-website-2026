type WorkspaceCopy = {
  heading: (name: string) => string;
  empty: string;
  fixed: string;
  saved: (count: number) => string;
  configuration: (number: number) => string;
  add: string; edit: string; view: string; remove: string; cancel: string;
  removeQuestion: string; removeConfirm: string;
  addToList: string; viewList: string; model: string; productCode: string;
  downloads: string; datasheet: string; fullCatalog: string;
  chooseModel: string;
};

const COPY: Record<string, WorkspaceCopy> = {
  zh: {
    chooseModel: "选择其他型号",
    heading: name => `${name} 配置`,
    empty: "点击“新增配置”选择所需参数，可将不同配置分别保存并加入清单。",
    fixed: "查看当前配置，核对参数后加入清单。",
    saved: count => `已保存 ${count} 个配置。悬停预览，点击保持展开。`, configuration: number => `配置${number}`,
    add: "新增配置", edit: "修改配置", view: "查看配置", remove: "删除配置", cancel: "取消",
    removeQuestion: "删除此配置？询价清单中的记录会保留。", removeConfirm: "确认删除",
    addToList: "加入清单", viewList: "查看清单", model: "型号", productCode: "商品编码",
    downloads: "资料下载", datasheet: "产品规格书", fullCatalog: "全系列产品手册",
  },
  en: {
    chooseModel: "Select another model",
    heading: name => `${name} configurations`,
    empty: "Select Add configuration to choose the required options. Save different configurations and add them to your inquiry list.",
    fixed: "Review the current configuration and its specifications before adding it to your inquiry list.",
    saved: count => `${count} saved ${count === 1 ? "configuration" : "configurations"}. Hover to preview; click to keep open.`, configuration: number => `Configuration ${number}`,
    add: "Add configuration", edit: "Edit configuration", view: "View configuration", remove: "Delete configuration", cancel: "Cancel",
    removeQuestion: "Delete this configuration? Items already in your inquiry list will be kept.", removeConfirm: "Confirm deletion",
    addToList: "Add to list", viewList: "View list", model: "Model", productCode: "Item code",
    downloads: "Download Resources", datasheet: "Product Datasheet", fullCatalog: "Full Product Catalog",
  },
  es: {
    chooseModel: "Seleccionar otro modelo",
    heading: name => `Configuraciones de ${name}`,
    empty: "Pulse Añadir configuración para elegir las opciones necesarias. Puede guardar distintas configuraciones y añadirlas a su lista de consulta.",
    fixed: "Revise la configuración y sus especificaciones antes de añadirla a su lista de consulta.",
    saved: count => `${count} ${count === 1 ? "configuración guardada" : "configuraciones guardadas"}. Pase el cursor para ver los detalles o haga clic para mantenerlos abiertos.`, configuration: number => `Configuración ${number}`,
    add: "Añadir configuración", edit: "Editar configuración", view: "Ver configuración", remove: "Eliminar configuración", cancel: "Cancelar",
    removeQuestion: "¿Eliminar esta configuración? Se conservarán los artículos que ya estén en su lista de consulta.", removeConfirm: "Confirmar eliminación",
    addToList: "Añadir a la lista", viewList: "Ver lista", model: "Modelo", productCode: "Código de artículo",
    downloads: "Descargar documentación", datasheet: "Ficha técnica del producto", fullCatalog: "Catálogo completo de productos",
  },
  fr: {
    chooseModel: "Choisir un autre modèle",
    heading: name => `Configurations ${name}`,
    empty: "Cliquez sur Ajouter une configuration pour choisir les options requises. Vous pouvez enregistrer plusieurs configurations et les ajouter à votre liste de demande de devis.",
    fixed: "Vérifiez la configuration et ses caractéristiques avant de l’ajouter à votre liste de demande de devis.",
    saved: count => `${count} ${count === 1 ? "configuration enregistrée" : "configurations enregistrées"}. Survolez pour afficher les détails ; cliquez pour les garder ouverts.`, configuration: number => `Configuration ${number}`,
    add: "Ajouter une configuration", edit: "Modifier la configuration", view: "Voir la configuration", remove: "Supprimer la configuration", cancel: "Annuler",
    removeQuestion: "Supprimer cette configuration ? Les articles déjà présents dans votre liste de demande de devis seront conservés.", removeConfirm: "Confirmer la suppression",
    addToList: "Ajouter à la liste", viewList: "Voir la liste", model: "Modèle", productCode: "Code article",
    downloads: "Télécharger la documentation", datasheet: "Fiche technique du produit", fullCatalog: "Catalogue complet des produits",
  },
  ko: {
    chooseModel: "다른 모델 선택",
    heading: name => `${name} 구성`,
    empty: "구성 추가를 눌러 필요한 옵션을 선택하세요. 여러 구성을 저장한 후 견적 요청 목록에 추가할 수 있습니다.",
    fixed: "현재 구성과 사양을 확인한 후 견적 요청 목록에 추가하세요.",
    saved: count => `저장된 구성 ${count}개. 마우스를 올려 미리 보거나 클릭하여 상세 내용을 고정하세요.`, configuration: number => `구성 ${number}`,
    add: "구성 추가", edit: "구성 수정", view: "구성 보기", remove: "구성 삭제", cancel: "취소",
    removeQuestion: "이 구성을 삭제하시겠습니까? 견적 요청 목록에 이미 추가된 항목은 유지됩니다.", removeConfirm: "삭제 확인",
    addToList: "목록에 추가", viewList: "목록 보기", model: "모델", productCode: "품목 코드",
    downloads: "자료 다운로드", datasheet: "제품 사양서", fullCatalog: "전체 제품 카탈로그",
  },
  ru: {
    chooseModel: "Выбрать другую модель",
    heading: name => `Конфигурации ${name}`,
    empty: "Нажмите «Добавить конфигурацию», чтобы выбрать нужные параметры. Разные конфигурации можно сохранить и добавить в список для запроса цены.",
    fixed: "Проверьте текущую конфигурацию и характеристики перед добавлением в список для запроса цены.",
    saved: count => `Сохранено конфигураций: ${count}. Наведите курсор для просмотра или нажмите, чтобы оставить сведения открытыми.`, configuration: number => `Конфигурация ${number}`,
    add: "Добавить конфигурацию", edit: "Изменить конфигурацию", view: "Просмотреть конфигурацию", remove: "Удалить конфигурацию", cancel: "Отмена",
    removeQuestion: "Удалить эту конфигурацию? Позиции, уже добавленные в список для запроса цены, сохранятся.", removeConfirm: "Подтвердить удаление",
    addToList: "Добавить в список", viewList: "Открыть список", model: "Модель", productCode: "Код изделия",
    downloads: "Скачать документацию", datasheet: "Технические характеристики изделия", fullCatalog: "Полный каталог продукции",
  },
};

export const getSelectionWorkspaceCopy = (locale: string) => COPY[locale] || COPY.zh;

export type SelectionWorkspaceContext = "configuration" | "fittings" | "support" | "model" | "custom" | "assembly" | "piston";
type WorkspacePresentation = { title: string; description: string };

const PRESENTATION: Record<string, Record<SelectionWorkspaceContext, WorkspacePresentation>> = {
  zh: {
    configuration: { title: "{name} 配置", description: "选择所需选项（{parameters}），保存配置用于询价。" },
    fittings: { title: "接头与配件选配", description: "按连接需要选配密封件或对接件，保存组合用于询价。" },
    support: { title: "图纸与技术支持", description: "核对当前型号和接口要求，可申请 CAD 或将产品加入询价清单。" },
    model: { title: "型号确认与询价", description: "核对当前型号及规格，将所需产品加入询价清单。" },
    custom: { title: "定制需求", description: "提供介质、接口、安装空间及使用要求，我们会协助确认定制方案。" },
    assembly: { title: "管组件配置", description: "选择管材、长度和两端配件，保存装配方案用于询价。" },
    piston: { title: "{name} 柱塞泵配置", description: "选择容量、泵头材质及配套要求，保存不同配置用于询价。" },
  },
  en: {
    configuration: { title: "{name} configurations", description: "Select the required options ({parameters}) and save the configuration for your inquiry." },
    fittings: { title: "Fittings and accessory selection", description: "Choose compatible sealing components or mating connectors and save the combination for your inquiry." },
    support: { title: "Drawings and technical support", description: "Check the model and interface requirements, then request CAD files or add the product to your inquiry list." },
    model: { title: "Model review and inquiry", description: "Check the model and specifications, then add the required product to your inquiry list." },
    custom: { title: "Customization requirements", description: "Share the fluid, interfaces, available installation space and operating requirements so we can help define a suitable custom solution." },
    assembly: { title: "Tubing assembly configuration", description: "Choose the tubing material, length and end fittings, then save the assembly for your inquiry." },
    piston: { title: "{name} piston pump configurations", description: "Select capacity, pump head material and accessories, then save different configurations for your inquiry." },
  },
  es: {
    configuration: { title: "Configuraciones de {name}", description: "Seleccione las opciones necesarias ({parameters}) y guarde la configuración para solicitar una oferta." },
    fittings: { title: "Selección de racores y accesorios", description: "Elija los elementos de estanqueidad o conectores de acoplamiento compatibles y guarde el conjunto para solicitar una oferta." },
    support: { title: "Planos y asistencia técnica", description: "Compruebe el modelo y los requisitos de conexión; después, solicite los archivos CAD o añada el producto a su lista de consulta." },
    model: { title: "Revisión del modelo y consulta", description: "Compruebe el modelo y las especificaciones y añada el producto que necesita a su lista de consulta." },
    custom: { title: "Requisitos de personalización", description: "Indique el fluido, las conexiones, el espacio de instalación y las condiciones de uso para que podamos definir una solución a medida." },
    assembly: { title: "Configuración del conjunto de tubos", description: "Elija el material y la longitud del tubo y los racores de ambos extremos; guarde el conjunto para solicitar una oferta." },
    piston: { title: "Configuraciones de la bomba de pistón {name}", description: "Seleccione la capacidad, el material del cabezal y los accesorios y guarde las configuraciones para solicitar una oferta." },
  },
  fr: {
    configuration: { title: "Configurations {name}", description: "Choisissez les options souhaitées ({parameters}), puis enregistrez la configuration pour votre demande de devis." },
    fittings: { title: "Choix des raccords et accessoires", description: "Choisissez les éléments d’étanchéité ou les raccords complémentaires compatibles, puis enregistrez l’ensemble pour votre demande de devis." },
    support: { title: "Plans et assistance technique", description: "Vérifiez le modèle et les interfaces, puis demandez les fichiers CAO ou ajoutez le produit à votre liste de demande de devis." },
    model: { title: "Vérification du modèle et demande de devis", description: "Vérifiez le modèle et ses caractéristiques, puis ajoutez le produit souhaité à votre liste de demande de devis." },
    custom: { title: "Besoins de personnalisation", description: "Précisez le fluide, les interfaces, l’espace de montage et les conditions d’utilisation afin de définir une solution adaptée." },
    assembly: { title: "Configuration de l’assemblage de tubes", description: "Choisissez le matériau et la longueur du tube ainsi que les raccords aux deux extrémités, puis enregistrez l’assemblage pour votre demande de devis." },
    piston: { title: "Configurations de la pompe à piston {name}", description: "Choisissez la capacité, le matériau de la tête de pompe et les accessoires, puis enregistrez les configurations pour votre demande de devis." },
  },
  ko: {
    configuration: { title: "{name} 구성", description: "필요한 옵션({parameters})을 선택한 후 견적 요청용 구성을 저장하세요." },
    fittings: { title: "피팅 및 액세서리 선정", description: "호환되는 씰링 부품이나 연결용 커넥터를 선택하고 견적 요청용 조합을 저장하세요." },
    support: { title: "도면 및 기술 지원", description: "모델과 인터페이스 요구 사항을 확인한 후 CAD 파일을 요청하거나 견적 요청 목록에 제품을 추가하세요." },
    model: { title: "모델 확인 및 견적 문의", description: "모델과 사양을 확인한 후 필요한 제품을 견적 요청 목록에 추가하세요." },
    custom: { title: "맞춤 제작 요구 사항", description: "사용 유체, 인터페이스, 설치 공간 및 운전 조건을 알려주시면 적합한 맞춤 제작 사양을 함께 검토합니다." },
    assembly: { title: "튜빙 어셈블리 구성", description: "튜브 재질과 길이, 양 끝의 피팅을 선택한 후 견적 요청용 어셈블리를 저장하세요." },
    piston: { title: "{name} 피스톤 펌프 구성", description: "용량, 펌프 헤드 재질 및 액세서리를 선택하고 견적 요청용 구성을 저장하세요." },
  },
  ru: {
    configuration: { title: "Конфигурации {name}", description: "Выберите нужные параметры ({parameters}) и сохраните конфигурацию для запроса цены." },
    fittings: { title: "Подбор фитингов и принадлежностей", description: "Выберите совместимые уплотнительные элементы или ответные соединители и сохраните комплект для запроса цены." },
    support: { title: "Чертежи и техническая поддержка", description: "Проверьте модель и требования к соединениям, затем запросите файлы CAD или добавьте изделие в список для запроса цены." },
    model: { title: "Проверка модели и запрос цены", description: "Проверьте модель и характеристики и добавьте нужное изделие в список для запроса цены." },
    custom: { title: "Требования к заказному исполнению", description: "Укажите рабочую среду, соединения, монтажное пространство и условия эксплуатации, чтобы согласовать подходящее заказное исполнение." },
    assembly: { title: "Конфигурация трубной сборки", description: "Выберите материал и длину трубки, а также фитинги на обоих концах и сохраните сборку для запроса цены." },
    piston: { title: "Конфигурации поршневого насоса {name}", description: "Выберите объём, материал головки насоса и принадлежности и сохраните конфигурации для запроса цены." },
  },
};

/** Describe the controls available on this page; leave product values and selection rules unchanged. */
export function getSelectionWorkspacePresentation(locale: string, context: SelectionWorkspaceContext, name = "", parameters: string[] = []): WorkspacePresentation {
  const language = Object.hasOwn(PRESENTATION, locale) ? locale : "zh";
  const copy = PRESENTATION[language][context];
  const labels = [...new Set(parameters.map(value => value.trim()).filter(Boolean))];
  const parameterList = new Intl.ListFormat(language, { style: "long", type: "conjunction" }).format(labels);
  return {
    title: copy.title.replace("{name}", name).trim(),
    description: (parameterList ? copy.description.replace("{parameters}", parameterList)
      : copy.description.replace(/\s*[（(]\{parameters\}[）)]/g, "")).trim(),
  };
}
