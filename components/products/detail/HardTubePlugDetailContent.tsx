import Link from "next/link";
import { getHardTubePlugPresentation } from "@/data/products/detail/hard-tube-plugs";
import { getFittingDrawingHref } from "@/data/products/detail/fitting-drawing-assets";
import styles from "./QuickConnectDetailContent.module.css";

type Identity = { model?: string; foreachModel?: string; slug?: string; productCode?: string };

/** Plug-specific content in the established fitting layout, with one six-locale source. */
export default function HardTubePlugDetailContent({ data, locale = "zh", section = "selection" }: {
  data: Identity; locale?: string; section?: "product" | "selection";
}) {
  const p = getHardTubePlugPresentation(data, locale);
  const c = p.copy;
  const prefix = p.locale === "zh" ? "" : `/${p.locale}`;
  const drawing = getFittingDrawingHref("hard-tube-fittings", p.model.toLowerCase());
  return <section className={styles.detail} data-section={section} data-hard-tube-plug={p.model} lang={p.locale === "zh" ? "zh-CN" : p.locale}>
    <div className="fx-sec">
      <h2>{p.name}</h2>
      <p>{p.description}</p>
    </div>
    <div className="fx-sec" id="plug-model-code">
      <h2>{c.coding}</h2>
      <p><strong>{p.model}</strong></p>
      <div className="fx-tw"><table><colgroup><col style={{width:"30%"}}/><col/></colgroup>
        <thead><tr><th scope="col">{c.fields[0]}</th><th scope="col">{c.meaning}</th></tr></thead>
        <tbody>{[[p.family,p.name],[p.threadCode,`${c.fields[3]}: ${p.thread}`],[p.materialCode,`${c.fields[4]}: ${p.material}`],[p.colorCode,`${c.fields[5]}: ${p.color}`]].map(([code,value])=><tr key={code}><th scope="row">{code}</th><td>{value}</td></tr>)}</tbody>
      </table></div>
    </div>
    <div className="fx-sec" id="plug-selection">
      <h2>{c.selection}</h2>
      <div className="fx-grid">{[[c.port,c.portText],[c.space,c.spaceText],[c.medium,c.mediumText]].map(([title,text])=><div className="fx-card" key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
    </div>
    <div className="fx-sec" id="plug-installation">
      <h2>{c.installation}</h2><ol>{c.steps.map(step=><li key={step}>{step}</li>)}</ol>
    </div>
    <div className="fx-sec" id="plug-validation">
      <h2>{c.validation}</h2><p>{c.validationText}</p>
      <ul className="fx-links">
        <li><Link href={`${prefix}/products/fittings/hard-tube-fittings/`}>{c.allProducts}</Link></li>
        {drawing ? <li><a href={drawing} target="_blank" rel="noopener noreferrer">{c.drawing}</a></li> : null}
      </ul>
    </div>
  </section>;
}
