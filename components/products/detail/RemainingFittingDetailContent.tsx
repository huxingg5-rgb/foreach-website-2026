import { registerFittingDetail } from "./fitting-detail-view";
import Link from "next/link";
import type { ReactNode } from "react";
import { getRemainingFittingContent, type RemainingFittingIdentity, type DetailSection, type DetailFigure, type DetailVisualItem } from "@/data/products/detail/remaining-fitting-detail.zh";
import styles from "./RemainingFittingDetailContent.module.css";

function Table({headers,rows}:{headers:string[];rows:ReactNode[][]}) {
  return <div className="fx-tw"><table className={styles.table}><thead><tr>{headers.map(h=><th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}
function Figure({figure,showCaption=true}:{figure:DetailFigure;showCaption?:boolean}) {
  return <figure><a href={figure.src} target="_blank" rel="noopener noreferrer" aria-label={`查看大图：${figure.alt}`}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={figure.src} alt={figure.alt} width={1500} height={1500} loading="lazy" style={{objectFit:"contain"}} />
  </a>{showCaption?<figcaption>{figure.caption}</figcaption>:null}</figure>;
}
function VisualChoices({items,columns}:{items:DetailVisualItem[];columns?:2|3}) {
  return <div className={`${styles.visualGrid}${columns===3?` ${styles.threeColumns}`:""}`}>
    {items.map(item=><article className={`fx-card ${styles.visualItem}`} key={item.title}>
      <div className={styles.visualThumb}><Figure figure={item.figure} showCaption={false}/></div>
      <div className={styles.visualCopy}><h3>{item.title}</h3><p className={styles.visualPurpose}>{item.purpose}</p><p>{item.description}</p>
        {item.action?<p className={styles.visualAction}>{item.action}</p>:null}
      </div>
    </article>)}
  </div>;
}
function Section({section}:{section:DetailSection}) {
  return <div className="fx-sec" id={`fx-remaining-${section.id}`}><h2>{section.title}</h2>
    {section.intro?<p>{section.intro}</p>:null}
    {section.visualItems?<VisualChoices items={section.visualItems} columns={section.visualColumns}/>:null}
    {section.figures?<div className={styles.installationLayout}>
      <div className={`fx-pics ${styles.installationFigures}`}>{section.figures.map(f=><Figure key={f.src} figure={f}/>)}</div>
      {section.rows?<Table headers={section.headers||["项目","说明"]} rows={section.rows}/>:null}
    </div>:section.rows?<Table headers={section.headers||["项目","说明"]} rows={section.rows}/>:null}
    {section.bullets?<ul>{section.bullets.map(p=><li key={p}>{p}</li>)}</ul>:null}
    {section.figure?<div className={`fx-pics ${styles.tool}`}><Figure figure={section.figure}/></div>:null}
    {section.note?<p className="fx-muted">{section.note}</p>:null}
    {section.links?<ul className="fx-links">{section.links.map(l=><li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>:null}
  </div>;
}
export default function RemainingFittingDetailContent({data,section}:{data:RemainingFittingIdentity;section:"product"|"selection"}) {
  const c=getRemainingFittingContent(data);if(!c)return null;
  if(section==="product")return <>
    <div className="fx-sec" id="fx-remaining-product-details" data-remaining-fitting-product={c.family}>
      <h2>产品细节与型号差异</h2><p>从结构、接口和尺寸了解 {c.model}。下方结构图与系列照片用于对照外形差异，材料、颜色及具体规格按完整型号识别；点击图片可查看大图。</p>
      <div className="fx-row"><div><h3>{c.name}细节</h3><ul>{c.points.map(([title,body])=><li key={title}><strong>{title}：</strong>{body}</li>)}</ul></div>
        <div className="fx-pics">{c.figures.map(f=><Figure key={f.src} figure={f}/>)}</div>
      </div>
    </div><Section section={c.comparison}/>
  </>;
  return <>
    <div className="fx-sec" data-remaining-fitting-selection={c.family} id="fx-remaining-features"><h2>特性与优势</h2><div className="fx-grid">{c.features.map(([title,body])=><div className="fx-card" key={title}><h3>{title}</h3><p>{body}</p></div>)}</div></div>
    <div className="fx-sec" id="fx-remaining-model"><h2>型号说明</h2><p>以 {c.model} 为例，按以下代码段识别系列、接口或功能规格、材料与颜色。</p>
      <div className={`fx-pn ${styles.modelCode}`} aria-label={`${c.model} 型号编码拆解`}>{c.parts.map((p,i)=><span className={styles.part} key={`${i}-${p.code}`}>
        {i>0&&!p.joined?<span className={styles.separator} aria-hidden="true">-</span>:null}<span className={`fx-seg ${styles.segment}`}><b>{p.code}</b><small>{p.label}</small></span>
      </span>)}</div>
      <Table headers={["代码段","代码"]} rows={c.modelRows}/><p className="fx-muted">{c.modelNote}</p>
    </div>
    {c.sections.map(s=><Section key={s.id} section={s}/>)}
  </>;
}

// Pure server content: resolve the same Chinese template before translating its presentation.
registerFittingDetail(Table, Figure, VisualChoices, Section, RemainingFittingDetailContent);
