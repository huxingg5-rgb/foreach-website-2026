import { fittingLocale } from "@/data/products/detail/fitting-ui.intl";

const copy = {
  zh: {
    title: "{material} 管规格选择", empty: "选择内径、外径及供货规格，保存配置用于询价。",
    pvcEmpty: "选择硬度、内径、外径及供货规格，保存配置用于询价。",
    saved: "已保存 {count} 个配置。悬停预览，点击保持展开，点击区域外收起。",
    group: "已保存的配置", configuration: "配置{number}", add: "新增配置", edit: "进入配置", save: "保存配置",
    createTitle: "新增配置{number}", editTitle: "修改配置{number}", code: "商品编码", addToList: "加入清单", viewList: "查看清单",
    remove: "删除配置", confirmRemove: "删除配置{number}？询价清单中的记录会保留。", confirm: "确认删除", cancel: "取消",
  },
  en: {
    title: "{material} tubing selection", empty: "Select inner diameter, outer diameter and supply specifications, then save the configuration for your inquiry.",
    pvcEmpty: "Select hardness, inner diameter, outer diameter and supply specifications, then save the configuration for your inquiry.",
    saved: "{count} configurations saved. Hover to preview, click to keep open, or click outside to collapse.",
    group: "Saved configurations", configuration: "Configuration {number}", add: "Add configuration", edit: "Edit configuration", save: "Save configuration",
    createTitle: "New configuration {number}", editTitle: "Edit configuration {number}", code: "Product code", addToList: "Add to list", viewList: "View list",
    remove: "Delete configuration", confirmRemove: "Delete configuration {number}? Items in the inquiry list will be kept.", confirm: "Confirm deletion", cancel: "Cancel",
  },
  es: {
    title: "Selección de tubo de {material}", empty: "Seleccione el diámetro interior, el diámetro exterior y las especificaciones de suministro y guarde la configuración para solicitar una oferta.",
    pvcEmpty: "Seleccione la dureza, los diámetros interior y exterior y las especificaciones de suministro y guarde la configuración para solicitar una oferta.",
    saved: "{count} configuraciones guardadas. Pase el cursor para previsualizar, pulse para mantener abierta o fuera para cerrar.",
    group: "Configuraciones guardadas", configuration: "Configuración {number}", add: "Añadir configuración", edit: "Editar configuración", save: "Guardar configuración",
    createTitle: "Nueva configuración {number}", editTitle: "Editar configuración {number}", code: "Código de producto", addToList: "Añadir a la lista", viewList: "Ver lista",
    remove: "Eliminar configuración", confirmRemove: "¿Eliminar la configuración {number}? Se conservarán los artículos de la lista de consulta.", confirm: "Confirmar eliminación", cancel: "Cancelar",
  },
  fr: {
    title: "Choix du tube en {material}", empty: "Choisissez les diamètres intérieur et extérieur ainsi que les spécifications de fourniture, puis enregistrez la configuration pour votre demande de devis.",
    pvcEmpty: "Choisissez la dureté, les diamètres intérieur et extérieur ainsi que les spécifications de fourniture, puis enregistrez la configuration pour votre demande de devis.",
    saved: "{count} configurations enregistrées. Survolez pour prévisualiser, cliquez pour garder ouvert ou à l’extérieur pour replier.",
    group: "Configurations enregistrées", configuration: "Configuration {number}", add: "Ajouter une configuration", edit: "Modifier la configuration", save: "Enregistrer la configuration",
    createTitle: "Nouvelle configuration {number}", editTitle: "Modifier la configuration {number}", code: "Code produit", addToList: "Ajouter à la liste", viewList: "Voir la liste",
    remove: "Supprimer la configuration", confirmRemove: "Supprimer la configuration {number} ? Les articles de la liste de demande seront conservés.", confirm: "Confirmer la suppression", cancel: "Annuler",
  },
  ko: {
    title: "{material} 튜브 규격 선택", empty: "내경, 외경 및 공급 사양을 선택한 후 견적 요청용 구성을 저장하세요.",
    pvcEmpty: "경도, 내경, 외경 및 공급 사양을 선택한 후 견적 요청용 구성을 저장하세요.",
    saved: "구성 {count}개가 저장되었습니다. 마우스를 올리면 미리보기, 클릭하면 펼침 유지, 영역 밖을 클릭하면 접힙니다.",
    group: "저장된 구성", configuration: "구성 {number}", add: "구성 추가", edit: "구성 수정", save: "구성 저장",
    createTitle: "새 구성 {number}", editTitle: "구성 {number} 수정", code: "상품 코드", addToList: "목록에 추가", viewList: "목록 보기",
    remove: "구성 삭제", confirmRemove: "구성 {number}을(를) 삭제할까요? 견적 문의 목록의 항목은 유지됩니다.", confirm: "삭제 확인", cancel: "취소",
  },
  ru: {
    title: "Выбор параметров трубки {material}", empty: "Выберите внутренний и наружный диаметры, а также параметры поставки и сохраните конфигурацию для запроса цены.",
    pvcEmpty: "Выберите твёрдость, внутренний и наружный диаметры, а также параметры поставки и сохраните конфигурацию для запроса цены.",
    saved: "Сохранено конфигураций: {count}. Наведите для просмотра, нажмите для закрепления или вне области для сворачивания.",
    group: "Сохранённые конфигурации", configuration: "Конфигурация {number}", add: "Добавить конфигурацию", edit: "Изменить конфигурацию", save: "Сохранить конфигурацию",
    createTitle: "Новая конфигурация {number}", editTitle: "Изменить конфигурацию {number}", code: "Код изделия", addToList: "Добавить в список", viewList: "Открыть список",
    remove: "Удалить конфигурацию", confirmRemove: "Удалить конфигурацию {number}? Позиции в списке запроса останутся.", confirm: "Подтвердить удаление", cancel: "Отмена",
  },
} as const;

export function getTubingConfigurationCopy(locale: string) { return copy[fittingLocale(locale)]; }
export function getSavedConfigurationText(localeValue: string, count: number) {
  const locale = fittingLocale(localeValue);
  const singular = {
    en: "{count} configuration saved. Hover to preview, click to keep open, or click outside to collapse.",
    es: "{count} configuración guardada. Pase el cursor para previsualizar, pulse para mantener abierta o fuera para cerrar.",
    fr: "{count} configuration enregistrée. Survolez pour prévisualiser, cliquez pour garder ouvert ou à l’extérieur pour replier.",
  };
  const template = count === 1 && Object.hasOwn(singular, locale)
    ? singular[locale as keyof typeof singular] : copy[locale].saved;
  return formatTubingConfigurationCopy(template, { count });
}
export function formatTubingConfigurationCopy(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
}
