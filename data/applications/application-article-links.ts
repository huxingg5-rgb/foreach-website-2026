import { applicationDocumentHref, resolveApplicationHref } from "./application-routes";
/** English application articles replace the former query-driven selection UI. */
export const applicationArticleGroups: Record<string, readonly string[]> = {
  ivd: ['clinical','immunoassay','hematology','coagulation','molecular'],
  'life-science': ['genomics','cellCulture','automation','protein','bioProcess'],
  'lab-automation': ['samplePrep','pipetting','microplate','reagentDispensing','systemIntegration'],
  'analytical-instruments': ['chromatography','spectroscopy','waterQuality','samplePrep','labAnalyzer'],
  'environmental-monitoring': ['waterQuality','wastewater','gasPretreatment','samplingPrep','systemIntegration'],
  'synthetic-biology': ['microBioreactor','biofoundry','feedingControl','onlineSampling','bioProcessIntegration'],
};

export function applicationArticleSlug(kind: string, group: string) {
  return kind === 'analytical-instruments' && group === 'chromatography'
    ? 'liquid-chromatography'
    : `guide-${group.replace(/[A-Z]/g, char => '-'+char.toLowerCase())}`;
}
export function applicationArticleHref(kind: string, group: string) {
  return applicationDocumentHref(kind, applicationArticleSlug(kind, group));
}
export function applicationArticleSection(kind: string, group: string, module: string) {
  if(kind==='analytical-instruments'&&group==='chromatography') {
    return ({injection:'pump-names',solvent:'pump-names',wash:'product-direction',connection:'selection-start'} as Record<string,string>)[module];
  }
  return `task-${module}`;
}

/** Only English application query links change; every other locale/link stays intact. */
export function resolveEnglishApplicationArticleHref(href: string) {
  if(!href.startsWith('/en/applications/')||!href.includes('?')) return resolveApplicationHref(href);
  const url=new URL(href,'https://www.foreachtek.com');
  const kind=url.pathname.match(/^\/en\/applications\/([^/]+)\/?$/)?.[1];
  const group=url.searchParams.get('application')??url.searchParams.get('instrument');
  if(!kind||!group||!applicationArticleGroups[kind]?.includes(group)) return resolveApplicationHref(href);
  const moduleKey=url.searchParams.get('module');
  const section=moduleKey ? applicationArticleSection(kind,group,moduleKey) : undefined;
  return resolveApplicationHref(applicationArticleHref(kind,group)+(section ? '#'+section : url.hash));
}
