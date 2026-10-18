import type { TubingAssemblySizeTableData } from "@/data/products/detail/product-detail.types";
import detailStyles from "../detail/product-detail.module.css";
import styles from "./tubing-assembly-specifications.module.css";

function formatDiameter(value: string) {
  return /^\d+$/.test(value) ? `${value}.0` : value;
}

export default function TubingAssemblySizeTable({ data, copy }: { data: TubingAssemblySizeTableData; copy?: { materialOd: string; od: string; id: string } }) {
  const materials = [...new Set(data.rows.map(row => row.material))];
  const hasMultipleMaterials = materials.length > 1;
  return (
    <section className={styles.sizeSection} aria-label={data.title}>
      <h2 className={styles.sectionTitle}>{data.title}</h2>
      <table className={`${detailStyles.specTable} ${styles.sizeTable}`}>
        {!hasMultipleMaterials && materials[0] ? <caption>{materials[0]}</caption> : null}
        <thead>
          <tr data-product-spec-row="true">
            <th scope="col"><span className={detailStyles.specCellText}>{hasMultipleMaterials ? copy?.materialOd ?? "管材 / 外径（mm）" : copy?.od ?? "管外径（mm）"}</span></th>
            <th scope="col"><span className={detailStyles.specCellText}>{copy?.id ?? "对应管内径（mm）"}</span></th>
          </tr>
        </thead>
        <tbody>
          {data.rows.map(row => (
            <tr data-product-spec-row="true" key={`${row.material}-${row.outerDiameter}`}>
              <th scope="row"><span className={detailStyles.specCellText}>{hasMultipleMaterials ? `${row.material} · ` : ""}{formatDiameter(row.outerDiameter)}</span></th>
              <td><span className={detailStyles.specCellText}>{row.innerDiameters.split(" / ").map(formatDiameter).join(" / ")}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.notes}>
        {data.notes.map(note => <p key={note}>{note}</p>)}
      </div>
    </section>
  );
}
