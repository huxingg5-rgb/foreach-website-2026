type BreadcrumbData = {[key:string]:unknown;breadcrumbLabel?:unknown;breadcrumbParentLabel?:unknown;breadcrumbParentHref?:unknown};
export function getChineseProductBreadcrumbs(data: BreadcrumbData,locale:string): {label:string;href?:string}[]|null {
 if(!["zh","zh-CN"].includes(locale) || !data.breadcrumbLabel || !data.breadcrumbParentLabel || !data.breadcrumbParentHref) return null;
 return [{label:"首页",href:"/"},{label:"产品中心",href:"/products/"},{label:String(data.breadcrumbParentLabel),href:String(data.breadcrumbParentHref)},{label:String(data.breadcrumbLabel)}];
}
