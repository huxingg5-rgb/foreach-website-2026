"use client";

import { useId, useState } from "react";
import type { DiaphragmPumpGuide } from "@/data/products/detail/diaphragm-pump-guide";
import { normalizeDiaphragmPumpLocale } from "@/data/products/detail/diaphragm-pump-routes";
import { diaphragmView } from "./diaphragm-view";
import base from "@/components/products/detail/EaPumpDetailContent.module.css";
import layout from "@/components/products/detail/EaPumpSelectionContent.module.css";
import styles from "./DiaphragmPumpSelectionGuide.module.css";

type Wire = { label: string; color: string; text: string; feedback?: boolean };

// Compact labels fit the diagram boxes; the adjacent table carries the full conditions.
const diagramLabels = {
  zh: ["匹配直流电源", "按标签选择额定电压", "有刷电机", "无刷电机配置", "泵的驱动部分", "设备主控接口", "电平与信号定义匹配", "通过供电启停接入设备流程", "供电与信号关系示意，非连接器针脚图"],
  en: ["DC supply", "Rated voltage on label", "Brushed DC motor", "Brushless DC motor", "Pump drive", "Controller", "Match signal levels", "On/off via power", "Power and signal logic; not a connector pinout"],
  es: ["Fuente CC", "Según etiqueta", "Motor con escobillas", "Motor sin escobillas", "Accionamiento", "Controlador", "Niveles compatibles", "Encendido/apagado por alimentación", "Lógica de alimentación y señales; no es un pinout"],
  fr: ["Alimentation CC", "Selon l’étiquette", "Moteur à balais", "Moteur sans balais", "Entraînement", "Contrôleur", "Niveaux compatibles", "Marche/arrêt par alimentation", "Logique d’alimentation et des signaux ; pas un brochage"],
  ko: ["DC 전원", "라벨 정격 전압 적용", "브러시 모터", "브러시리스 모터", "펌프 구동부", "장비 제어기", "신호 레벨 일치", "전원으로 기동·정지", "전원·신호 관계도이며 커넥터 핀 배치도가 아닙니다"],
  ru: ["Питание DC", "По маркировке", "Щёточный мотор", "Бесщёточный мотор", "Привод насоса", "Контроллер", "Уровни сигналов", "Включение питанием", "Связи питания и сигналов; не распиновка разъёма"],
} as const;

function WiringLogic({ wires, brushed, controls, locale }: { wires: Wire[]; brushed: boolean; controls: boolean; locale: string }) {
  const marker = `signal-${useId().replace(/:/g, "")}`;
  const controlWires = wires.slice(2);
  const lang = normalizeDiaphragmPumpLocale(locale);
  const labels = diagramLabels[lang];
  return diaphragmView(<svg viewBox="0 0 800 600" className={styles.wiringDiagram} role="img" aria-label={controls ? "隔膜泵电源、控制输入与转速反馈逻辑示意" : "隔膜泵电源正负极连接逻辑示意"}>
    <defs><marker id={marker} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto-start-reverse"><path d="M0 0 L8 4 L0 8 Z" fill="#173368" /></marker></defs>
    <rect x="50" y="105" width="220" height="165" fill="#f6f9fc" stroke="#cbd5e1" />
    <text x="160" y="145" textAnchor="middle" fill="#173368" fontSize={lang === "zh" ? 24 : 22}>{labels[0]}</text>
    <text x="160" y="177" textAnchor="middle" fill="#465369" fontSize={lang === "zh" ? 18 : 16}>{labels[1]}</text>
    <rect x="475" y="105" width="275" height="400" fill="white" stroke="#173368" strokeWidth="2" />
    <text x="612" y="150" textAnchor="middle" fill="#173368" fontSize={lang === "zh" ? 25 : 21}>{labels[brushed ? 2 : 3]}</text>
    <text x="612" y="184" textAnchor="middle" fill="#465369" fontSize="18">{labels[4]}</text>
    {wires.slice(0, 2).map((wire, i) => <g key={wire.label}>
      <line x1="270" y1={215 + i * 52} x2="475" y2={215 + i * 52} stroke={wire.color} strokeWidth="4" />
      <text x="372" y={203 + i * 52} textAnchor="middle" fill="#173368" fontSize="19">{wire.label}</text>
    </g>)}
    {controls ? <>
      <rect x="50" y="325" width="220" height="180" fill="#f6f9fc" stroke="#cbd5e1" />
      <text x="160" y="365" textAnchor="middle" fill="#173368" fontSize="24">{labels[5]}</text>
      <text x="160" y="397" textAnchor="middle" fill="#465369" fontSize={lang === "zh" ? 18 : 16}>{labels[6]}</text>
      {controlWires.map((wire, i) => <g key={wire.label}>
        <line x1={wire.feedback ? 475 : 270} y1={350 + i * 62} x2={wire.feedback ? 270 : 475} y2={350 + i * 62} stroke={wire.color} strokeWidth="4" markerEnd={`url(#${marker})`} />
        <text x="372" y={337 + i * 62} textAnchor="middle" fill="#173368" fontSize="19">{wire.label}</text>
      </g>)}
    </> : <text x="400" y="400" textAnchor="middle" fill="#465369" fontSize="21">{labels[7]}</text>}
    <text x="400" y="560" textAnchor="middle" fill="#465369" fontSize="19">{labels[8]}</text>
  </svg>, lang);
}

export function DiaphragmWiringTools({ guide, locale = "zh" }: { guide: DiaphragmPumpGuide; locale?: string }) {
  const [view, setView] = useState<"power" | "control">("power");
  const brushed = guide.motor === "brushed";
  const controls = !brushed && view === "control";
  const wires: Wire[] = brushed ? [
    { label: "＋标记端", color: "#173368", text: "接电源正极；按电机端子标记识别，不依靠未经确认的线色。" },
    { label: "负极端", color: "#465369", text: "接电源负极；按供货资料核对两端，确认额定电压后进行启停测试。" },
  ] : [
    { label: "VCC · 红", color: "#c83735", text: "电机电源正极；使用标签对应的直流电压，不将调速电压当作电机供电。" },
    { label: "GND · 黑", color: "#222222", text: "电源负极／地；与主控接口的参考地按实际接线方案匹配。" },
    ...(controls ? [
      { label: "PWM · 蓝", color: "#2563eb", text: guide.highPressure ? "对应 DPL30H 控制版本支持 PWM 或 0～5 V 调速：0～0.25 V 停止；悬空或 4.5～5 V 全速。" : guide.gasLiquid ? "DPGL800 的调速选配线；悬空时默认全速。输入电平和 PWM 频率在配置确认时确定。" : "调速选配输入，用于不同工作阶段的转速切换；输入电平、频率和低速运行范围按所选驱动确定。" },
      ...(!guide.gasLiquid ? [{ label: "DIR · 黄", color: "#a87900", text: guide.highPressure ? "对应 DPL30H 版本高电平或悬空为 CW、低电平为 CCW。电机换向不意味着泵的流体方向可反转。" : "电机转向选配输入；具体有效状态按实际版本确定。泵的进出口仍按液路标识连接。" }] : []),
      { label: "FG · 绿", color: "#16835d", feedback: true, text: guide.gasLiquid ? "DPGL800 对应选配版本：转速 rpm＝FG 频率 Hz ×10。该倍率不能套到 DPL30H。" : guide.highPressure ? "DPL30H 对应版本每转输出 3 个方波：转速 rpm＝FG 频率 Hz ×20。" : "转速反馈选配输出；脉冲数与转速换算按对应版本确定，不能直接套用其他系列。" },
    ] : []),
  ];
  return diaphragmView(<div className={layout.configuration} data-diaphragm-wiring-tools>
    <div className={layout.configurationToolbar}>
      <span className={layout.controlLabel}>接线对照</span>
      <div className={`${layout.controls} ${layout.motorControls} ${styles.wireChoices}`} role="group" aria-label="隔膜泵接线对照">
        <button type="button" aria-pressed={!controls} onClick={() => setView("power")}>{brushed ? "有刷供电" : "两线供电"}</button>
        {!brushed ? <button type="button" aria-pressed={controls} onClick={() => setView("control")}>{guide.gasLiquid ? "PWM／FG 选配" : "调速与反馈选配"}</button> : null}
      </div>
    </div>
    <div className={layout.diagramRow}>
      <div className={layout.configurationDetails}>
        <h3>{controls ? `${guide.series} 控制与反馈` : `${guide.model} ${guide.motor === "series" ? "无刷供电示例" : "供电连接"}`}</h3>
        <table className={layout.table}><thead><tr><th>导线／标识</th><th>连接与使用条件</th></tr></thead><tbody>{wires.map(wire => <tr key={wire.label}><th scope="row">{wire.label}</th><td>{wire.text}</td></tr>)}</tbody></table>
        <p>这里的对照不会改变当前型号或供货线束；选配功能在下单配置中分别确定。</p>
        {controls ? <p>FG 表示电机转速。即使频率正常，入口漏气、阀片状态或出口负载仍可能使输送与抽吸不足；需要流量或真空闭环时，配套相应过程传感器和控制逻辑。</p> : null}
      </div>
      <div className={layout.configurationDiagram}><h3>供电与信号逻辑</h3><WiringLogic wires={wires} brushed={brushed} controls={controls} locale={locale} /></div>
    </div>
    {guide.series === "DPL60" && !brushed ? <div className={styles.wirePhotos}>
      {["2", "5"].map(count => <figure key={count}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/resources/technical-articles/brushless-diaphragm-pump-2-wire-vs-5-wire/dpl60-${count}-wire-brushless-motor.webp`} alt={`DPL60 ${count} 线无刷电机出线实拍示例`} width={count === "2" ? 1021 : 1017} height={count === "2" ? 683 : 615} loading="lazy" decoding="async" />
        <figcaption>DPL60 {count} 线出线实拍示例</figcaption>
      </figure>)}
    </div> : null}
    <div className={base.specNotes}><p>独立 PWM 调速与对电源直接斩波是不同驱动方式，不能仅凭“无刷”或线数推定兼容。上电前确认供电、控制输入与反馈输出的完整定义。</p></div>
  </div>, locale);
}
