import type { KeyboardEvent } from "react";

export type ProductResourceSelection = {
  label: string;
  value: string;
  options: { value: string; label: string; disabled?: boolean }[];
  onChange: (value: string) => void;
};

/** The same selection drives the drawing, CAD model and unavailable states. */
export default function ProductResourceSelector({ selection, className, layout = "choices" }: {
  selection: ProductResourceSelection; className?: string; layout?: "choices" | "select";
}) {
  const enabled = selection.options.filter(option => !option.disabled);
  const tabValue = enabled.find(option => option.value === selection.value)?.value || enabled[0]?.value;
  const select = (value: string) => {
    if (value !== selection.value && enabled.some(option => option.value === value)) selection.onChange(value);
  };
  const navigate = (event: KeyboardEvent<HTMLButtonElement>, value: string) => {
    if (!enabled.length || !["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const index = enabled.findIndex(option => option.value === value);
    const next = event.key === "Home" ? 0 : event.key === "End" ? enabled.length - 1
      : (index + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1) + enabled.length) % enabled.length;
    select(enabled[next].value);
  };
  const dropdown = <select className={layout === "select" ? className : undefined}
    aria-label={selection.label} value={selection.value} data-product-resource-selection="true"
    onChange={event => select(event.target.value)}>
    {selection.options.map(option => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
  </select>;
  if (layout === "select") return dropdown;
  return <div className={className}>
    <div role="radiogroup" aria-label={selection.label} aria-orientation="vertical" data-product-resource-selection="true">
      {selection.options.map(option => <button key={option.value} type="button" role="radio"
        aria-checked={option.value === selection.value} disabled={option.disabled}
        data-product-resource-value={option.value} tabIndex={option.value === tabValue ? 0 : -1}
        onClick={() => select(option.value)} onKeyDown={event => navigate(event, option.value)}>
        {option.label}
      </button>)}
    </div>
    {dropdown}
  </div>;
}
