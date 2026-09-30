import {
 localizeValvelessPumpCategoryPath,
 VALVELESS_PUMP_CATEGORY_LABEL_ZH,
} from "../selection/valveless-pump-routes";

type BreadcrumbData = {[key:string]:unknown;breadcrumbLabel?:unknown;breadcrumbParentLabel?:unknown;breadcrumbParentHref?:unknown};
export function getChineseProductBreadcrumbs(data: BreadcrumbData,locale:string): {label:string;href?:string}[]|null {
 if(!["zh","zh-CN"].includes(locale) || !data.breadcrumbLabel || !data.breadcrumbParentLabel || !data.breadcrumbParentHref) return null;
 const originalHref = String(data.breadcrumbParentHref);
 const parentHref = localizeValvelessPumpCategoryPath(originalHref, locale);
 const parentLabel = parentHref !== originalHref ? VALVELESS_PUMP_CATEGORY_LABEL_ZH : String(data.breadcrumbParentLabel);
 return [{label:"首页",href:"/"},{label:"产品中心",href:"/products/"},{label:parentLabel,href:parentHref},{label:String(data.breadcrumbLabel)}];
}
