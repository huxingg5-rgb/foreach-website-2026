"use client";

import DrawingRequirements from "./DrawingRequirements";
import { drawingRequirementsLine, normalizeDrawingTypes, type CadDrawingType } from "@/data/products/detail/drawing-requirements";
import { pistonView } from "../detail/piston-view";
import { pistonText } from "@/data/products/detail/piston-pump-ui.intl";
import { useEffect, useId, useRef, useState } from "react";
import {
  createEaPumpInquiryConfiguration, eaCommunications,
  eaHasController, eaHasValve, getPistonInquiryOptions,
  getEaMotorOptions, getEaPumpInquiryDefaults, getEaPumpInquiryTarget, normalizeEaPumpInquiryChoice,
  eaPumpInquiryRows, validateEaPumpInquiry,
  type EaPumpInquiryChoice, type EaPumpInquiryConfiguration,
} from "@/data/products/configurator/ea-pump-inquiry";
import ConfiguratorButton from "./ConfiguratorButton";
import ConfiguratorDialogFrame from "./ConfiguratorDialogFrame";
import shared from "./product-variant-configurator.module.css";
import fittingStyles from "./HardTubeWasherConfigurator.module.css";
import formStyles from "./FlangedTubingConfigurator.module.css";

type Props = {
  locale?: string;
  productSlug: string;
  initialValue: EaPumpInquiryConfiguration | null;
  initialQuantity: number;
  initialDrawingTypes?: CadDrawingType[];
  configurationLabel?: string;
  onClose: () => void;
  onConfirm: (configuration: EaPumpInquiryConfiguration, quantity: number, addToList: boolean, drawingTypes: CadDrawingType[]) => void;
};

export default function EaPumpInquiryConfigurator({ locale = "zh", productSlug, initialValue, initialQuantity, initialDrawingTypes, configurationLabel, onClose, onConfirm }: Props) {
  const [drawings, setDrawings] = useState(() => normalizeDrawingTypes(initialDrawingTypes));
  const [choice, setChoice] = useState<EaPumpInquiryChoice>(() => normalizeEaPumpInquiryChoice(initialValue?.choice || getEaPumpInquiryDefaults(productSlug)));
  const [quantity, setQuantity] = useState(String(initialQuantity));
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const prefix = useId();
  const configuration = createEaPumpInquiryConfiguration(choice);
  const options = getPistonInquiryOptions(choice);
  const target = getEaPumpInquiryTarget(choice);
  const confirmHint = target && target.slug !== productSlug
    ? `确认后查看 ${target.model} 详情，已填配置与补充需求将保留。`
    : target ? "确认后在当前页保存选型；也可直接加入询价清单。"
    : "该配置暂无对应详情页，确认后保留在当前页，也可加入询价清单。";

  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    const backdrop = dialogRef.current?.parentElement;
    const background = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== backdrop)
      .map(element => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const handleKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (event.key === "Escape" && !(event.target instanceof HTMLSelectElement)) {
        event.preventDefault();
        onCloseRef.current();
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button, input, select, textarea, [tabindex]') || [])
        .filter(element => !element.matches(':disabled') && element.tabIndex >= 0 && element.getClientRects().length);
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0]?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = overflow;
      background.forEach(({ element, inert }) => { element.inert = inert; });
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  function update(key: keyof EaPumpInquiryChoice, value: string) {
    setChoice(previous => {
      const next = { ...previous, [key]: value };
      if (key === "capacity") {
        const nextOptions = getPistonInquiryOptions(next);
        for (const [field, customField, values] of [
          ["motor", "customMotor", getEaMotorOptions(next)],
          ["port", "customPort", nextOptions.ports],
          ["headMaterial", "customHeadMaterial", nextOptions.headMaterials],
        ] as const) {
          if (!values.some(([value]) => value === next[field])) { next[field] = "unsure"; next[customField] = ""; }
        }
      }
      return next;
    });
    setError("");
  }
  function confirm(addToList: boolean) {
    const validation = validateEaPumpInquiry(choice, Number(quantity));
    if (validation) { setError(validation); return; }
    onConfirm(configuration, Number(quantity), addToList, drawings);
  }
  function selector(label: string, key: keyof EaPumpInquiryChoice, customKey: keyof EaPumpInquiryChoice, options: ReadonlyArray<readonly [string, string]>) {
    return <div className={formStyles.field}>
      <label htmlFor={`${prefix}-${key}`}>{label}</label>
      <select id={`${prefix}-${key}`} value={choice[key]} onChange={event => update(key, event.target.value)}>
        {options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}
      </select>
      {choice[key] === "other" ? <input aria-label={`${label}自定义要求`} placeholder={`请填写${label}要求`} maxLength={160} value={choice[customKey]} onChange={event => update(customKey, event.target.value)} /> : null}
    </div>;
  }

  if (typeof document === "undefined") return null;
  return pistonView(<ConfiguratorDialogFrame
    dialogRef={dialogRef}
    closeRef={closeRef}
    locale={locale}
    className={fittingStyles.selector}
    titleId={`${prefix}-title`}
    descriptionId={`${prefix}-description`}
    title={`${options.series} 柱塞泵基础选型`}
    description={`${configurationLabel ? `${configurationLabel} · ` : ""}选择容量、泵头材质与配套配置，用于报价与技术确认。`}
    closeLabel="关闭基础选型"
    onClose={onClose}
    notice={error ? <span className={formStyles.error} role="alert">{error}</span> : confirmHint}
    actions={<>
      <ConfiguratorButton onClick={() => confirm(true)}>加入询价清单</ConfiguratorButton>
      <ConfiguratorButton variant="primary" onClick={() => confirm(false)}>确认选型</ConfiguratorButton>
    </>}
  >
    <div className={`${shared.main} ${fittingStyles.main}`}>
      <aside className={`${shared.summary} ${fittingStyles.summary}`} aria-label="配置汇总">
        <div className={shared.summaryTitle}>
          <span>本次询价配置 · {target ? "参考型号" : "意向配置"}</span>
          <strong>{configuration.referenceModel}</strong>
          <p className={fittingStyles.productName}>具体供货型号、材料组合与电气匹配将在报价前确认。</p>
        </div>
        <div className={`${shared.summaryTable} ${fittingStyles.summaryTable}`} aria-live="polite">
          {eaPumpInquiryRows(configuration, locale).filter(([label]) => label !== pistonText("参考型号", locale)).map(([label, value]) => <div className={shared.summaryRow} key={label}><span>{label}</span><b translate="no">{value}</b></div>)}
          <div className={shared.summaryRow} translate="no"><span>{drawingRequirementsLine({ drawingTypes: drawings }, locale)}</span></div>
          <div className={shared.summaryRow}><span>询价数量</span><b>{`${quantity || "待填写"} 台`}</b></div>
        </div>
      </aside>
      <section className={`${shared.config} ${fittingStyles.config}`}>
        <div className={shared.sectionHead}><h3>配置选择</h3><span>可选择意向配置，也可补充具体要求</span></div>
        <div className={fittingStyles.configBody}>
          <DrawingRequirements locale={locale} value={drawings} onChange={setDrawings} />
          <fieldset className={shared.optionGroup} aria-label="基础配置">
            <div className={fittingStyles.options}>
              <div className={formStyles.endFields}>
                {selector("标称容量", "capacity", "customCapacity", options.capacities)}
                {selector("泵头材质", "headMaterial", "customHeadMaterial", options.headMaterials)}
                {selector("配置形式", "integration", "customIntegration", options.integrations)}
                {selector("光耦", "optocoupler", "customOptocoupler", options.optocouplers)}
                <div className={formStyles.field}><label htmlFor={`${prefix}-quantity`}>询价数量（台）</label><input id={`${prefix}-quantity`} type="number" min={1} max={1000000} step={1} inputMode="numeric" value={quantity} onChange={event => { setQuantity(event.target.value); setError(""); }} /></div>
              </div>
              {choice.headMaterial === "PMMA" ? <p className={fittingStyles.selectionNote}>PMMA（聚甲基丙烯酸甲酯）不耐酒精及强酸；请一并说明工作液和清洗液。</p> : null}
            </div>
          </fieldset>
          <fieldset className={shared.optionGroup} aria-label="接口与配套">
            <div className={formStyles.endFields}>
              {selector("液路接口", "port", "customPort", options.ports)}
              {selector(options.motorLabel, "motor", "customMotor", getEaMotorOptions(choice))}
              {eaHasController(choice) ? selector("通信接口", "communication", "customCommunication", eaCommunications) : null}
              {eaHasValve(choice) ? <div className={formStyles.field}><label htmlFor={`${prefix}-valve`}>阀路要求（可选）</label><input id={`${prefix}-valve`} placeholder="例如通路数量、阀型、阀电压或液路图说明" maxLength={500} value={choice.valveRequirements} onChange={event => update("valveRequirements", event.target.value)} /></div> : null}
            </div>
            {options.note ? <p className={fittingStyles.selectionNote}>{options.note}</p> : null}
          </fieldset>
          <fieldset className={shared.optionGroup}><legend><label htmlFor={`${prefix}-requirements`}>补充需求（可选）</label></legend>
            <div className={fittingStyles.options}>
              <div className={formStyles.field}><textarea id={`${prefix}-requirements`} rows={4} maxLength={2000} value={choice.requirements} onChange={event => update("requirements", event.target.value)} placeholder="可填写希望的容量、工作液及清洗液、单次加液量、精度、节拍、温度与背压、安装空间、线束要求、预计采购量或交期。选项中没有的要求也可直接写在这里。" /></div>
              <p className={fittingStyles.selectionNote}>参数暂不确定时可选“待确认”，我们会结合使用条件协助选型。</p>
            </div>
          </fieldset>
        </div>
      </section>
    </div>
  </ConfiguratorDialogFrame>, locale);
}
