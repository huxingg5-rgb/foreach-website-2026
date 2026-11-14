import type { SelectionCartItem } from "@/components/selection-cart/selection-cart.types";
import { getDrawingTypes, type CadDrawingType, type DrawingRequirement } from "./drawing-requirements";
import { HARD_TUBE_ACCESSORY_CONFIGS, getHardTubeAccessory } from "../configurator/hard-tube-accessories";
import { formatHardTubeCopy, getHardTubeAccessoryCopy, getHardTubeAccessoryKindLabel, getHardTubeMaterialLabel } from "../configurator/hard-tube-accessories.intl";
import { FITTING_PUBLISHED_PRODUCTS } from "../selection/fitting-publication.generated";
import type { FittingConfigurationChoice } from "../configurator/fitting-configurations";

export function isDefaultInquiryChoice(value?: FittingConfigurationChoice) {
  return value?.kind === "luer" ? value.choice.mode === "single"
    : Boolean(value && value.choice === "none");
}

export function isSameInquiryDetailHref(first = "", second = "") {
  const normalize = (href: string) => href.replace(/^\/(?:en|es|fr|ko|ru)(?=\/)/, "").replace(/\/+$/, "");
  return Boolean(first && second && normalize(first) === normalize(second));
}

export type DefaultInquiryIdentity = Pick<SelectionCartItem, "foreachModel" | "productCode" | "sourceType">;
export function findDefaultInquiryCartItem<T extends DefaultInquiryIdentity & Pick<SelectionCartItem, "bundleId" | "bundleRole">>(items: readonly T[], identity: DefaultInquiryIdentity) {
  return items.find(item => item.foreachModel === identity.foreachModel && item.productCode === identity.productCode
    && item.sourceType === identity.sourceType && !item.bundleId && item.bundleRole !== "accessory");
}

/** A saved Chinese cart label must not leak into another language's inquiry. */
export function defaultInquiryAccessoryName(item: Pick<SelectionCartItem, "productCode" | "foreachModel" | "detailHref" | "bundleRole">, locale: string) {
  if (item.bundleRole !== "accessory") return undefined;
  const config = HARD_TUBE_ACCESSORY_CONFIGS.find(part => isSameInquiryDetailHref(item.detailHref, part.detailHref));
  if (!config) return undefined;
  const accessory = getHardTubeAccessory(config, item.productCode);
  if (!accessory || accessory.model !== item.foreachModel) return undefined;
  const language = locale === "zh-CN" ? "zh" : locale;
  return formatHardTubeCopy(getHardTubeAccessoryCopy(language).accessoryProduct, {
    material: getHardTubeMaterialLabel(accessory.material, language),
    kind: getHardTubeAccessoryKindLabel(accessory.kind, language), model: config.model,
  });
}

export function defaultInquiryDrawingTypes(canRequestCad: boolean, saved?: DrawingRequirement): CadDrawingType[] {
  if (saved) return getDrawingTypes(saved);
  return canRequestCad ? ["2d", "3d"] : [];
}

type InquiryCartItem = DefaultInquiryIdentity & Pick<SelectionCartItem, "bundleId" | "bundleRole" | "inquiryMode" | "eaPumpConfiguration">;
const publishedIdentities = new Set(FITTING_PUBLISHED_PRODUCTS.map(item => `${item.foreachModel}:${item.productCode}`));
function isProductInquiryItem(item: InquiryCartItem) {
  return Boolean(item.foreachModel && item.productCode && (item.inquiryMode === "product"
    || (item.sourceType === "pump-selection" && publishedIdentities.has(`${item.foreachModel}:${item.productCode}`))));
}
export function isDefaultInquiryCart(items: readonly InquiryCartItem[]): boolean {
  const primaryItems = items.filter(item => item.bundleRole !== "accessory");
  if (!primaryItems.some(isProductInquiryItem) || !primaryItems.every(item => isProductInquiryItem(item) || item.eaPumpConfiguration)) return false;
  const bundleIds = new Set(primaryItems.flatMap(item => item.bundleId ? [item.bundleId] : []));
  return items.every(item => item.bundleRole !== "accessory" || Boolean(item.bundleId && bundleIds.has(item.bundleId)));
}

export function defaultInquirySubmission(items: readonly InquiryCartItem[]) {
  return isDefaultInquiryCart(items) ? {
    formId: "product_inquiry_form",
    formType: "product_inquiry" as const,
    requestType: "Product Inquiry",
    projectStage: "Product Selection and Quotation",
    itemsHeading: "Product Inquiry Items:",
  } : undefined;
}

const COPY = {
  zh: {
    defaultLabel: "默认配置", cancel: "取消加入",
    helper: "点击“默认配置”加入或取消，悬停查看详情。",
    touchHelper: "点击配置展开详情，再点收起；可在详情中加入或取消。",
    additionalHelper: "其他搭配可通过“新增配置”选择。",
    title: "产品咨询与询价", action: "咨询与询价", submit: "提交咨询",
    description: "型号、数量和资料需求已带入。请留下联系方式，我们会协助确认选型、配套、价格与交期。",
    summary: "请填写联系信息并验证邮箱，以便接收产品与报价回复。",
    emailPlaceholder: "请输入接收产品与报价回复的邮箱",
    notes: "补充说明", notesPlaceholder: "可补充使用场景、配套需求或预计用量；暂不确定也可以直接咨询。",
    listDescription: "核对型号与数量后即可咨询，配套和使用条件可由我们协助确认。",
    listNote: "型号、数量及勾选的资料需求将随咨询提交。您可按需调整，无需先确定全部配套参数。",
    successTitle: "咨询已提交", successDescription: "我们已收到您的型号与需求，将通过所留联系方式跟进。",
  },
  en: {
    defaultLabel: "Default configuration", cancel: "Remove from list",
    helper: "Click Default configuration to add or remove it; hover to view details.",
    touchHelper: "Tap a configuration to view its details; tap again to close. Add or remove it from the list in the details.",
    additionalHelper: "Use Add configuration for other combinations.",
    title: "Product inquiry and quotation", action: "Inquire about these products", submit: "Send inquiry",
    description: "Your model, quantity and document selections are included. Leave your contact details for help with selection, matching parts, pricing and lead time.",
    summary: "Enter your contact details and verify your email to receive product and quotation support.",
    emailPlaceholder: "Email for product and quotation support",
    notes: "Additional information", notesPlaceholder: "Tell us about your application, matching parts or expected quantity. You can also inquire before these details are final.",
    listDescription: "Check the model and quantity, then send your inquiry. We can help confirm matching parts and operating conditions.",
    listNote: "Your models, quantities and selected documents will be included. You can adjust them without finalizing every configuration detail.",
    successTitle: "Inquiry sent", successDescription: "We have received your models and requirements and will follow up using the contact details provided.",
  },
  es: {
    defaultLabel: "Configuración predeterminada", cancel: "Quitar de la lista",
    helper: "Haga clic en Configuración predeterminada para añadirla o quitarla; pase el cursor para ver los detalles.",
    touchHelper: "Toque una configuración para ver los detalles y vuelva a tocarla para cerrarlos. Desde los detalles puede añadirla a la lista o quitarla.",
    additionalHelper: "Utilice Añadir configuración para elegir otras combinaciones.",
    title: "Consulta de producto y presupuesto", action: "Consultar estos productos", submit: "Enviar consulta",
    description: "El modelo, la cantidad y los documentos seleccionados ya están incluidos. Déjenos sus datos para recibir ayuda con la selección, los componentes compatibles, el precio y el plazo de entrega.",
    summary: "Introduzca sus datos de contacto y verifique su correo para recibir asistencia y un presupuesto.",
    emailPlaceholder: "Correo para consultas de producto y presupuestos",
    notes: "Información adicional", notesPlaceholder: "Puede indicar la aplicación, los componentes necesarios o la cantidad prevista. También puede consultar sin tener todos los detalles definidos.",
    listDescription: "Revise el modelo y la cantidad y envíe su consulta. Le ayudaremos a confirmar los componentes compatibles y las condiciones de uso.",
    listNote: "La consulta incluirá los modelos, las cantidades y los documentos seleccionados. No es necesario definir todos los detalles de la configuración.",
    successTitle: "Consulta enviada", successDescription: "Hemos recibido sus modelos y requisitos. Nos pondremos en contacto con usted a través de los datos facilitados.",
  },
  fr: {
    defaultLabel: "Configuration par défaut", cancel: "Retirer de la liste",
    helper: "Cliquez sur Configuration par défaut pour l’ajouter ou la retirer ; survolez-la pour afficher les détails.",
    touchHelper: "Touchez une configuration pour afficher ses détails, puis touchez-la à nouveau pour les refermer. Ajoutez-la à la liste ou retirez-la depuis les détails.",
    additionalHelper: "Utilisez Ajouter une configuration pour choisir d’autres combinaisons.",
    title: "Renseignements produit et devis", action: "Demander des renseignements", submit: "Envoyer la demande",
    description: "Le modèle, la quantité et les documents sélectionnés sont déjà inclus. Laissez vos coordonnées pour obtenir de l’aide sur le choix du produit, les composants compatibles, le prix et le délai de livraison.",
    summary: "Renseignez vos coordonnées et vérifiez votre adresse e-mail pour recevoir une réponse technique et commerciale.",
    emailPlaceholder: "E-mail pour les renseignements produit et devis",
    notes: "Informations complémentaires", notesPlaceholder: "Précisez, si vous le souhaitez, l’application, les composants nécessaires ou la quantité envisagée. Vous pouvez aussi nous consulter avant de finaliser ces points.",
    listDescription: "Vérifiez le modèle et la quantité, puis envoyez votre demande. Nous pouvons vous aider à confirmer les composants compatibles et les conditions d’utilisation.",
    listNote: "Votre demande comprendra les modèles, les quantités et les documents sélectionnés. Il n’est pas nécessaire de finaliser tous les détails de la configuration.",
    successTitle: "Demande envoyée", successDescription: "Nous avons reçu vos modèles et vos besoins. Nous vous répondrons aux coordonnées indiquées.",
  },
  ko: {
    defaultLabel: "기본 구성", cancel: "목록에서 제거",
    helper: "‘기본 구성’을 클릭하면 목록에 추가하거나 취소할 수 있으며, 마우스를 올리면 상세 정보가 표시됩니다.",
    touchHelper: "구성을 누르면 상세 정보가 펼쳐지고, 다시 누르면 접힙니다. 상세 정보에서 목록에 추가하거나 제거할 수 있습니다.",
    additionalHelper: "다른 조합은 ‘구성 추가’에서 선택하세요.",
    title: "제품 및 견적 문의", action: "제품 및 견적 문의", submit: "문의 보내기",
    description: "모델, 수량, 선택한 자료가 자동으로 포함됩니다. 연락처를 남겨 주시면 제품 선정, 호환 부품, 가격 및 납기를 안내해 드립니다.",
    summary: "제품 및 견적 안내를 받으실 연락처를 입력하고 이메일을 인증해 주세요.",
    emailPlaceholder: "제품 및 견적 안내를 받으실 이메일",
    notes: "추가 문의 사항", notesPlaceholder: "사용 용도, 필요한 부품 또는 예상 수량을 알려 주세요. 아직 정해지지 않은 사항이 있어도 문의하실 수 있습니다.",
    listDescription: "모델과 수량을 확인한 후 문의를 보내세요. 호환 부품과 사용 조건은 함께 확인해 드립니다.",
    listNote: "모델, 수량 및 선택한 자료가 문의에 포함됩니다. 모든 구성 조건을 미리 확정하지 않아도 됩니다.",
    successTitle: "문의가 접수되었습니다", successDescription: "모델과 요청 사항을 확인했습니다. 남겨 주신 연락처로 안내해 드리겠습니다.",
  },
  ru: {
    defaultLabel: "Базовая конфигурация", cancel: "Удалить из списка",
    helper: "Нажмите «Базовая конфигурация», чтобы добавить её в список или убрать; наведите курсор для просмотра параметров.",
    touchHelper: "Коснитесь конфигурации, чтобы раскрыть параметры, и коснитесь её ещё раз, чтобы свернуть. Добавить конфигурацию в список или убрать её можно в раскрытом блоке.",
    additionalHelper: "Другие сочетания компонентов можно выбрать через «Добавить конфигурацию».",
    title: "Консультация и запрос цены", action: "Запросить консультацию и цену", submit: "Отправить запрос",
    description: "Модель, количество и выбранные документы уже включены в запрос. Оставьте контактные данные — мы поможем с подбором, совместимыми компонентами, ценой и сроком поставки.",
    summary: "Укажите контактные данные и подтвердите электронную почту для получения консультации и коммерческого предложения.",
    emailPlaceholder: "Электронная почта для ответа и коммерческого предложения",
    notes: "Дополнительная информация", notesPlaceholder: "При желании укажите применение, необходимые компоненты или предполагаемое количество. Можно обратиться и до уточнения всех деталей.",
    listDescription: "Проверьте модель и количество и отправьте запрос. Мы поможем уточнить совместимые компоненты и условия эксплуатации.",
    listNote: "В запрос будут включены модели, количество и выбранные документы. Заранее определять все параметры конфигурации не обязательно.",
    successTitle: "Запрос отправлен", successDescription: "Мы получили ваши модели и требования и свяжемся с вами по указанным контактным данным.",
  },
};

export function getDefaultInquiryCopy(locale: string, additionalConfigurations = true) {
  const copy = COPY[locale === "zh-CN" ? "zh" : locale as keyof typeof COPY] || COPY.en;
  const suffix = additionalConfigurations ? ` ${copy.additionalHelper}` : "";
  return { ...copy, helper: copy.helper + suffix, touchHelper: copy.touchHelper + suffix };
}
