"use client";

import { useState } from "react";
import { pistonView } from "./piston-view";

import { formatPumpNumber, type PistonPumpGuide } from "@/data/products/detail/piston-pump-guide.zh";
import styles from "./EaPumpSelectionContent.module.css";

export default function PistonPumpCapacityTool({ guide, selectedDriveId, onDriveChange, locale = "zh" }: {
  locale?: string;
  guide: PistonPumpGuide;
  selectedDriveId: string;
  onDriveChange: (id: string) => void;
}) {
  const [amount, setAmount] = useState(String(guide.capacity / 10));
  const drive = guide.drives.find(item => item.id === selectedDriveId) || guide.drives[0];
  const volume = Number(amount);
  const valid = amount.trim() !== "" && Number.isFinite(volume) && volume > 0 && volume <= guide.capacity;
  // Calculate from exact capacity and stroke, never from the rounded display resolution.
  const steps = volume / guide.capacity * drive.fullSteps;
  const fractional = Math.abs(steps - Math.round(steps)) > 1e-8;
  const id = `${guide.slug}-volume`;
  return pistonView(<>
    <div className={styles.capacityTool} data-piston-capacity-tool={guide.model}>
      <div className={styles.drivePanel}>
        <h3>{`${guide.capacity} μL 配置对照`}</h3>
        <table className={`${styles.table} ${styles.driveTable}`} aria-label={`${guide.model} 行程配置对照`}>
          <thead><tr><th scope="col">{guide.series === "SM" ? "行程配置" : "步距角"}</th><th scope="col">满行程整步数</th><th scope="col">名义每步液量</th></tr></thead>
          <tbody>{guide.drives.map(item => <tr key={item.id} data-selected={selectedDriveId === item.id}>
            <th scope="row"><label className={styles.driveChoice}><input type="radio" name={`${guide.slug}-drive`} checked={selectedDriveId === item.id} onChange={() => onDriveChange(item.id)} aria-label={item.label} /><span>{item.label}</span></label></th>
            <td>{item.fullSteps} 步</td><td>{formatPumpNumber(item.resolution)} μL/步</td>
          </tr>)}</tbody>
        </table>
      </div>
      <div className={styles.calculationPanel}>
        <h3>名义步数试算</h3>
        <div className={styles.amount}><label htmlFor={id}>目标液量</label><div className={styles.amountInput}>
          <input id={id} aria-label="目标液量（μL）" type="number" min="0" max={guide.capacity} step="any" value={amount} onChange={event => setAmount(event.target.value)} aria-invalid={!valid} aria-describedby={`${id}-note${valid ? "" : ` ${id}-error`}`} /><span aria-hidden="true">μL</span>
        </div></div>
        <div className={styles.calculationResult} aria-live="polite" aria-atomic="true">
          <span className={styles.resultLabel}>名义步数</span>
          <p className={styles.result} data-piston-nominal-steps>{valid ? <><strong>{formatPumpNumber(steps)}</strong><span>步</span></> : <span className={styles.inputError} id={`${id}-error`}>{`请输入大于 0、且不超过 ${guide.capacity} μL 的目标液量。`}</span>}</p>
          {valid ? <p className={styles.formula}>{volume} μL ÷ {guide.capacity} μL × {drive.fullSteps} 步 = {formatPumpNumber(steps)} 步</p> : null}
        </div>
      </div>
    </div>
    <p className={`${styles.note} ${styles.capacityNote}`} id={`${id}-note`}><span>名义步数仅用于指令对照，不代表最小可靠加液量或实测准确性。</span><span>按容量与满行程步数计算；表中每步液量为显示值。细分、回程差、气泡、阀与管路影响需在目标液量下验证。</span></p>
    {valid && fractional ? <p className={`${styles.note} ${styles.stepNotice}`}>该目标量不对应整数整步，需结合驱动细分或调整目标量另行计算，不能直接取整后视为原目标液量。</p> : null}
  </>, locale);
}
