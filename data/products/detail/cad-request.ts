import type { CadDrawingType } from "./drawing-requirements";
export type { CadDrawingType } from "./drawing-requirements";
import { getSelectionWorkspaceCopy } from "./selection-workspace-copy";
import type { ProductConfiguratorConfig, ProductConfiguratorVariant } from "@/components/products/configurator/product-variant-configurator.types";

export type CadRequestConfiguration = {
  id: string; model: string; rows: [string, string][];
  productType?: string; productSeries?: string; drawingTypes?: CadDrawingType[]; label?: string;
};
export function variantCadConfiguration(config: ProductConfiguratorConfig, variant: ProductConfiguratorVariant, locale: string): CadRequestConfiguration {
  const copy = getSelectionWorkspaceCopy(locale);
  return { id: variant.id, model: variant.model, rows: [
    ...(config.showProductCode !== false ? [[copy.productCode, variant.productCode] as [string, string]] : []),
    ...config.dimensions.flatMap(dimension => variant.attributes[dimension.key] === undefined ? []
      : [[dimension.label, `${variant.attributes[dimension.key]}${dimension.unit ? ` ${dimension.unit}` : ""}`] as [string, string]]),
    ...(config.fixedSummaryRows || []).map(row => [row.label, row.value] as [string, string]),
  ] };
}
type CadCopy = {
  description: string; notice: string; reference: string; current: string; requestFor: string;
  details: string; drawings: string; both: string; twoD: string; threeD: string;
  notes: string; placeholder: string; wait: string; selectDrawing: string; tooLong: string;
  resend: (seconds: number) => string; referenceId: string; quantity: string;
};
const COPY: Record<string, CadCopy> = {
  zh: {
    description: "选择所需图纸，我们会通过邮箱确认该配置可提供的文件。", notice: "申请中将包含所选配置的完整信息。",
    reference: "参考型号", current: "当前产品（未确认配置）", requestFor: "申请配置", details: "查看配置详情",
    drawings: "所需图纸", both: "可选一项或两项", twoD: "2D 尺寸图", threeD: "3D CAD 模型",
    notes: "图纸要求（选填）", placeholder: "请说明文件格式、安装尺寸或其他图纸要求。",
    wait: "请等待当前请求完成。", selectDrawing: "请至少选择一种图纸。", tooLong: "配置和说明超过 4000 字符，请缩短补充说明后再提交。",
    resend: seconds => `重新发送（${seconds}秒）`, referenceId: "申请编号", quantity: "询价数量",
  },
  en: {
    description: "Choose your drawings. We’ll confirm availability for your configuration by email.", notice: "Your selected configuration will be included with the request.",
    reference: "Reference model", current: "Current product · configuration not confirmed", requestFor: "Request for", details: "View configuration details",
    drawings: "Drawings needed", both: "select one or both", twoD: "2D dimension drawing", threeD: "3D CAD model",
    notes: "Drawing requirements (optional)", placeholder: "Preferred file format, mounting dimensions or other drawing requirements.",
    wait: "Please wait for the current request to finish.", selectDrawing: "Select at least one drawing type.", tooLong: "The configuration and notes exceed 4,000 characters. Please shorten the notes before submitting.",
    resend: seconds => `Resend (${seconds}s)`, referenceId: "Reference", quantity: "Inquiry quantity",
  },
  es: {
    description: "Seleccione los planos que necesita. Confirmaremos por correo su disponibilidad para la configuración elegida.", notice: "La solicitud incluirá todos los datos de la configuración seleccionada.",
    reference: "Modelo de referencia", current: "Producto actual · configuración sin confirmar", requestFor: "Configuración solicitada", details: "Ver detalles de la configuración",
    drawings: "Planos necesarios", both: "seleccione una o ambas opciones", twoD: "Plano acotado 2D", threeD: "Modelo CAD 3D",
    notes: "Requisitos de los planos (opcional)", placeholder: "Indique el formato de archivo, las cotas de montaje u otros requisitos.",
    wait: "Espere a que termine la solicitud en curso.", selectDrawing: "Seleccione al menos un tipo de plano.", tooLong: "La configuración y las notas superan los 4000 caracteres. Acorte las notas antes de enviar.",
    resend: seconds => `Reenviar (${seconds}s)`, referenceId: "Referencia", quantity: "Cantidad solicitada",
  },
  fr: {
    description: "Choisissez les plans souhaités. Nous confirmerons par e-mail leur disponibilité pour la configuration sélectionnée.", notice: "Les informations complètes de la configuration sélectionnée seront jointes à la demande.",
    reference: "Modèle de référence", current: "Produit actuel · configuration à confirmer", requestFor: "Configuration demandée", details: "Voir le détail de la configuration",
    drawings: "Plans souhaités", both: "une ou deux options possibles", twoD: "Plan coté 2D", threeD: "Modèle CAO 3D",
    notes: "Exigences relatives aux plans (facultatif)", placeholder: "Précisez le format de fichier, les cotes de montage ou toute autre exigence.",
    wait: "Veuillez attendre la fin de la demande en cours.", selectDrawing: "Sélectionnez au moins un type de plan.", tooLong: "La configuration et les notes dépassent 4 000 caractères. Veuillez raccourcir les notes avant l’envoi.",
    resend: seconds => `Renvoyer (${seconds}s)`, referenceId: "Référence", quantity: "Quantité demandée",
  },
  ko: {
    description: "필요한 도면을 선택하세요. 선택한 구성에 제공 가능한 파일을 이메일로 안내해 드립니다.", notice: "선택한 구성의 전체 정보가 요청에 포함됩니다.",
    reference: "참조 모델", current: "현재 제품 · 구성 확인 필요", requestFor: "요청 구성", details: "구성 상세 보기",
    drawings: "필요한 도면", both: "한 가지 또는 두 가지 모두 선택", twoD: "2D 치수 도면", threeD: "3D CAD 모델",
    notes: "도면 요구 사항 (선택)", placeholder: "파일 형식, 설치 치수 또는 기타 도면 요구 사항을 입력하세요.",
    wait: "현재 요청이 완료될 때까지 기다려 주세요.", selectDrawing: "도면 유형을 하나 이상 선택하세요.", tooLong: "구성과 설명이 4,000자를 초과합니다. 추가 설명을 줄인 후 제출하세요.",
    resend: seconds => `재전송 (${seconds}초)`, referenceId: "요청 번호", quantity: "견적 요청 수량",
  },
  ru: {
    description: "Выберите нужные чертежи. Мы подтвердим по электронной почте, какие файлы доступны для выбранной конфигурации.", notice: "В запрос будут включены полные сведения о выбранной конфигурации.",
    reference: "Модель для справки", current: "Текущее изделие · конфигурация не подтверждена", requestFor: "Запрашиваемая конфигурация", details: "Показать сведения о конфигурации",
    drawings: "Необходимые чертежи", both: "можно выбрать один или оба варианта", twoD: "2D-чертёж с размерами", threeD: "3D-модель CAD",
    notes: "Требования к чертежам (необязательно)", placeholder: "Укажите формат файла, установочные размеры или другие требования.",
    wait: "Дождитесь завершения текущего запроса.", selectDrawing: "Выберите хотя бы один тип чертежа.", tooLong: "Объём конфигурации и примечаний превышает 4 000 символов. Сократите примечания перед отправкой.",
    resend: seconds => `Повторить (${seconds}с)`, referenceId: "Номер запроса", quantity: "Запрашиваемое количество",
  },
};
export const getCadRequestCopy = (locale: string) => COPY[locale] || COPY.zh;
export function cadRequestMessage(locale: string, configuration: CadRequestConfiguration, configurationNumber: number,
  drawings: CadDrawingType[], notes: string): string {
  const copy = getCadRequestCopy(locale), workspace = getSelectionWorkspaceCopy(locale);
  return [
    `${copy.drawings}: ${drawings.map(type => type === "2d" ? copy.twoD : copy.threeD).join(", ")}`,
    configuration.label || (configurationNumber > 0 ? workspace.configuration(configurationNumber) : copy.current),
    `${workspace.model}: ${configuration.model}`,
    ...configuration.rows.map(([label, value]) => `${label}: ${value}`),
    ...(notes.trim() ? [`${copy.notes}: ${notes.trim()}`] : []),
  ].join("\n");
}
