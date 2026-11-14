import type { DiaphragmPumpGuide } from "@/data/products/detail/diaphragm-pump-guide";
import { getDiaphragmPumpModelCodeZh } from "@/data/products/detail/diaphragm-pump-model-code.zh";
import { diaphragmView } from "./diaphragm-view";
import base from "@/components/products/detail/EaPumpDetailContent.module.css";
import layout from "@/components/products/detail/EaPumpSelectionContent.module.css";
import styles from "./DiaphragmPumpSelectionGuide.module.css";

export default function DiaphragmPumpModelCode({ guide, locale = "zh" }: { guide: DiaphragmPumpGuide; locale?: string }) {
  const coding = getDiaphragmPumpModelCodeZh(guide);
  return diaphragmView(<section className={layout.section} data-diaphragm-model-code={guide.series}>
    <h2>型号说明</h2>
    <p>{guide.series} 型号按以下字段识别。先展示编码结构与默认项，再说明各代码的含义，并以一个完整型号举例。</p>
    <div className={styles.modelCodeScroll} role="region" aria-label={`${guide.series} 型号编码拆解，小屏可横向查看`} tabIndex={0}>
      <div className={styles.modelCode}>
        {coding.fields.map(field => <div className={styles.modelCodePart} key={field.label}>
          {field.separatorBefore ? <span className={styles.modelCodeSeparator} aria-hidden="true">-</span> : null}
          <div className={styles.modelCodeSegment}><b>{field.code}</b><small>{field.label}</small></div>
        </div>)}
      </div>
    </div>
    <div className={base.tableWrap} role="region" aria-label={`${guide.series} 型号代码含义`} tabIndex={0}>
      <table className={`${layout.table} ${styles.modelCodeTable}`}>
        <thead><tr><th scope="col">代码段</th><th scope="col">代码含义与填写说明</th></tr></thead>
        <tbody>{coding.fields.map(field => <tr key={field.label}>
          <th scope="row">{field.label}</th>
          <td><div className={styles.modelCodeOptions}>{field.options.map(([code, meaning]) => <div className={styles.modelCodeOption} key={code}><span>{code}</span><span>{meaning}</span></div>)}</div>{field.note ? <p className={styles.modelCodeNote}>{field.note}</p> : null}</td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className={layout.note}>{coding.omitted}</p>
    <div className={styles.modelCodeExample}>
      <h3>完整型号举例</h3>
      <p><strong>{coding.example}</strong></p>
      <p>{coding.description}</p>
    </div>
    <p className={layout.note}>以上用于解释编码。电机、出线、端口、方向与材料并非任意组合，订货时按已确认的完整型号与配置选配。</p>
  </section>, locale);
}
