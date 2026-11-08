import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";

// This module belongs to the server-authored fitting detail content only.
// Unlike fittingView (interactive selectors), it resolves an explicit registry
// of pure, hook-free content functions. Never register client components here.
const staticContent = new WeakSet<object>();
const localeAwareDiagrams = new WeakSet<object>();
export function registerFittingDetail(...components: object[]) {
  components.forEach(component => staticContent.add(component));
}
export function registerFittingDetailDiagram(...components:object[]) {
  components.forEach(component=>localeAwareDiagrams.add(component));
}

type Options = { locale: string; text: (value: string) => string };
const textContainers=new Set(["p","li","td","th","h1","h2","h3","h4","figcaption","small","button","label","title","text"]);
const inlineTags=new Set(["a","strong","b","em","i","span","small","code","br","sup","sub"]);

// Translate a sentence as one message, retaining inline links/emphasis as
// React slots. This avoids translating fragments such as "的本体材料为" alone.
function richChildren(children:ReactNode,options:Options):ReactNode {
  const items=Children.toArray(children);
  if (!items.every(child=>!isValidElement(child)||typeof child.type!=="string"||inlineTags.has(child.type))) return fittingDetailView(children,options);
  const slots:ReactNode[]=[];
  const message=items.map(child=>{
    if (typeof child==="string"||typeof child==="number") return String(child);
    return `{R${slots.push(child)-1}}`;
  }).join("");
  let translated=options.text(message);
  const first=slots[0];
  if (message.startsWith("{R0}")&&isValidElement(first)&&first.type==="strong") {
    const label=(first.props as {children?:unknown}).children;
    if(typeof label==="string"&&/[。！？]$/.test(label.trim())) translated="{R0}"+translated.replace("{R0}","").trimStart();
  }
  return translated.split(/(\{R\d+\})/).filter(Boolean).map((part,index)=>{
    const match=/^\{R(\d+)\}$/.exec(part);
    const node=match?fittingDetailView(slots[Number(match[1])],options):part;
    return isValidElement(node)?cloneElement(node,{key:index}):node;
  });
}
function localHref(href: string, locale: string) {
  return locale !== "zh-CN" && /^\/(products|resources|contact)\//.test(href) ? `/${locale}${href}` : href;
}
// These are trusted, source-controlled static HTML fragments, never user HTML.
// Preserve tags, inline markup, drawings and styles; translate text/accessible
// labels and localize page links. HTML entities remain HTML entities.
function localHtml(html: string, {locale,text}: Options) {
  return html.split(/(<style\b[^>]*>[\s\S]*?<\/style>|<!--[\s\S]*?-->|<[^>]*>)/gi).map(part => {
    if (/^<style\b|^<!--/i.test(part)) return part;
    if (!part.startsWith("<")) return text(part).replace(/&(?!#\d+;|#x[\da-f]+;|[a-z][\da-z]+;)/gi,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    return part.replace(/\b(alt|aria-label|title|href)="([^"]*)"/g, (_,key:string,value:string) => {
      const next = key === "href" ? localHref(value,locale) : text(value);
      return `${key}="${next.replace(/"/g,"&quot;")}"`;
    });
  }).join("");
}

export function fittingDetailView(node: ReactNode, options: Options): ReactNode {
  if (typeof node === "string") return options.text(node);
  if (Array.isArray(node)) {
    const combined: ReactNode[]=[];
    for (const child of node) {
      if ((typeof child === "string" || typeof child === "number") && typeof combined.at(-1) === "string") combined[combined.length-1] += String(child);
      else combined.push(typeof child === "number" ? String(child) : child);
    }
    return Children.toArray(combined).map(child=>fittingDetailView(child,options));
  }
  if (!isValidElement(node)) return node;
  const element = node as ReactElement<Record<string,unknown>>;
  if (typeof element.type === "function" && staticContent.has(element.type)) {
    const render = element.type as (props: Record<string,unknown>) => ReactNode;
    const rendered=fittingDetailView(render(element.props),options);
    return element.key!==null&&isValidElement(rendered)?cloneElement(rendered,{key:element.key}):rendered;
  }
  const props: Record<string,unknown>={};
  for (const key of ["children","alt","title","aria-label"]) {
    if (element.props[key] !== undefined) props[key]=key==="children"&&typeof element.type==="string"&&textContainers.has(element.type)
      ?richChildren(element.props[key] as ReactNode,options):fittingDetailView(element.props[key] as ReactNode,options);
  }
  if (typeof element.props.href === "string") props.href=localHref(element.props.href,options.locale);
  const raw=element.props.dangerouslySetInnerHTML as {__html?:string}|undefined;
  if (raw?.__html) props.dangerouslySetInnerHTML={__html:localHtml(raw.__html,options)};
  // Reviewed diagrams already have their own six-language copy and geometry.
  if (localeAwareDiagrams.has(element.type as object)) props.locale=options.locale;
  return cloneElement(element,props);
}
