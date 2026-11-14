"use client";

import { useId } from "react";
import { getDrawingRequirementsCopy, normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import styles from "../detail/PistonCadRequestModal.module.css";

type Props = {
  locale: string; value: CadDrawingType[]; onChange: (value: CadDrawingType[]) => void;
  disabled?: boolean;
};
export default function DrawingRequirements({ locale, value, onChange, disabled = false }: Props) {
  const copy = getDrawingRequirementsCopy(locale), id = useId();
  return <fieldset className={styles.drawingTypes} aria-label={copy.title} disabled={disabled} data-drawing-requirements="true" translate="no">
    <div>
      {(["2d", "3d"] as const).map(type => <label key={type} htmlFor={`${id}-${type}`}>
        <input id={`${id}-${type}`} type="checkbox" value={type} checked={value.includes(type)}
          onChange={event => onChange(normalizeDrawingTypes(event.target.checked ? [...value, type] : value.filter(item => item !== type)))} />
        <span>{type === "2d" ? copy.twoD : copy.threeD}</span>
      </label>)}
    </div>
  </fieldset>;
}
