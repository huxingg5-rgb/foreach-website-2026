"use client";

import { useState } from "react";
import { pistonView } from "./piston-view";

import Link from "next/link";
import type { PistonPumpGuide } from "@/data/products/detail/piston-pump-guide.zh";
import { getCompactCare, getCompactMotors, getCompactSensors, getCompactSteps } from "@/data/products/detail/compact-piston-pump-guide.zh";
import PistonPumpCapacityTool from "./PistonPumpCapacityTool";
import base from "./EaPumpDetailContent.module.css";
import styles from "./EaPumpSelectionContent.module.css";

function TechnicalFigure({ src, alt }: { src: string; alt: string }) {
  return <figure className={styles.figure}>
    {/* Source drawing rendered without changing its linework, terminals or layout. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} width={1500} height={1125} loading="lazy" decoding="async" />
  </figure>;
}

export default function CompactPistonPumpSelectionContent({ guide, locale = "zh" }: { guide: PistonPumpGuide; locale?: string }) {
  const tm = guide.series === "TM";
  const sm50 = !tm && guide.capacity === 50;
  const motors = getCompactMotors(guide);
  const sensors = getCompactSensors(guide);
  const [driveId, setDriveId] = useState(guide.drives[0].id);
  const [motorId, setMotorId] = useState(motors[0].id);
  const [sensorId, setSensorId] = useState(sensors[0].id);
  const motor = motors.find(item => item.id === motorId) || motors[0];
  const sensor = sensors.find(item => item.id === sensorId) || sensors[0];
  return pistonView(<section lang={locale === "zh" ? "zh-CN" : locale} className={`${base.content} ${styles.guide}`} aria-label={`${guide.model} 选型与使用`} data-piston-guide={guide.model}>
    <section className={styles.section}>
      <h2>特性与选型方向</h2>
      <p>{guide.model} 用于设备内的液体吸取与定量分配。{tm ? "超微型结构适合安装空间较紧的机构，选型时应同时核对接头尺寸、微小液量表现和外部光耦电路。" : "微型结构采用 28 步进电机，选型时把容量、工作行程、四孔安装面和驱动配置一起核对。"}</p>
      <div className={styles.featureGrid}>
        <article><h3>{`${guide.capacity} μL 标称容量`}</h3><p>{guide.capacityAdvice}</p></article>
        <article><h3>{guide.material === "PMMA" ? "透明泵头" : "非透光泵头"}</h3><p>{guide.materialAdvice}</p></article>
        <article><h3>{tm ? "超微型安装" : "紧凑机构安装"}</h3><p>{guide.mounting}。{tm ? "整泵重量 96 g，管路和线束的弯曲空间也应计入设备布局。" : "工作行程与外部安装尺寸分别确认；给接头、线束和运动机构留出空间。"}</p></article>
        <article><h3>{tm ? "2540 步行程" : sm50 ? "50 μL 独立配置" : "按行程配置换算"}</h3><p>{tm ? "1.8° 步距角与 2540 步满行程配套使用；改变驱动细分后要同步换算控制指令。" : sm50 ? "本配置采用 M6 平底接口、2000 步行程和 0.67 A/相电机，绕组电阻为 3 Ω ±0.3 Ω。" : "2000、2400、4000 步对应不同的满行程配置，不能只由步距角判断；以所选版本计算每步液量。"}</p></article>
        <article><h3>泵与控制配套</h3><p>{guide.integration}</p></article>
        <article><h3>工况与维护</h3><p>流体温度 {guide.fluidTemperature}，流体压力 &lt;0.30 MPa。预计寿命 {guide.life}；实际介质、驱动与维护条件应同时纳入验证。</p></article>
      </div>
    </section>

    <section className={styles.section}>
      <h2>容量、行程与定量步数</h2>
      <p>{guide.capacityAdvice}</p>
      <PistonPumpCapacityTool locale={locale} guide={guide} selectedDriveId={driveId} onDriveChange={setDriveId} />
      <div className={styles.callout}><strong>{tm ? "2540 步是满行程参数，不能改成 2000 步套算。" : sm50 ? "先确认 50 μL 的供货版本。" : "满行程配置与驱动细分分开确认。"}</strong><p>{tm ? "回程差指标为 <2.0%，换向补偿需通过实际液路测定；不能直接将满行程的 2% 当作每次补偿指令。" : sm50 ? "当前 2000 步配置的名义增量为 0.025 μL/步。它不等于最小可靠加样量；改用其他行程或电机后，应重新核对换算关系、接口和接线。" : "表中 2000、2400、4000 步是系列行程选项，切换表格不会改变当前供货配置。选择驱动器微步模式后，再将整步单位换算为对应指令。"}</p></div>
      <Link className={base.guideLink} href="/resources/technical-articles/precision-piston-pump-backlash-compensation/">回程差补偿方法</Link>
    </section>

    <section className={styles.section}>
      <h2>泵头、柱塞与接液材料</h2>
      <p>当前型号采用 {guide.headName} 泵头和陶瓷柱塞。{guide.materialAdvice}</p>
      {tm ? <div className={styles.cards}>
        <article><h3>工作液与清洗液一并核对</h3><p>逐项记录成分、浓度、液温及接触时间。当前 PMMA（聚甲基丙烯酸甲酯）泵头不能用于酒精及强酸；需要改材料时，先确认对应 TM 配置的可供性与安装尺寸。</p></article>
        <article><h3>整条液路相容性</h3><p>同时核对陶瓷柱塞、密封、接头、管路和阀件。更换泵头候选材料后，应重新验证密封与分配表现，不能直接采用 EA 的材料选项作为 TM 默认配置。</p></article>
      </div> : <>
        <div className={base.tableWrap} role="region" aria-label="SM 泵头材料对照" tabIndex={0}><table className={`${styles.table} ${styles.materialTable}`}>
          <thead><tr><th>泵头材料</th><th>选型方向</th><th>配套检查</th></tr></thead>
          <tbody>
            <tr><th>PMMA（聚甲基丙烯酸甲酯）<span className={styles.tag}>透光{guide.material === "PMMA" ? " · 当前泵头" : ""}</span></th><td>需要直接观察充液和气泡时比较。</td><td>不耐酒精及强酸，清洗过程同样适用。</td></tr>
            <tr><th>PSU（聚砜）<span className={styles.tag}>透光候选</span></th><td>需要透光时的另一材料候选。</td><td>按实际牌号、介质与密封组合确认；材料名称不改变整泵温度范围。</td></tr>
            <tr><th>PEEK（聚醚醚酮）<span className={styles.tag}>非透光{guide.material === "PEEK" ? " · 当前泵头" : ""}</span></th><td>需要非透光或进一步比较介质相容性时选择。</td><td>按配方、浓度和温度核对，不能视为耐所有酸碱与溶剂。</td></tr>
            <tr><th>POM（聚甲醛）<span className={styles.tag}>非透光候选</span></th><td>结合泵头结构和介质要求比较。</td><td>酸、氧化性清洗液与长期浸液条件应单独确认。</td></tr>
          </tbody>
        </table></div>
        <p className={styles.note}>以上为 SM 系列材料比较，实际泵头、接口与密封仍需成套确认。柱塞可按项目比较氧化锆陶瓷、SUS316L 不锈钢或 PEEK（聚醚醚酮）；当前陶瓷配置不能直接按其他柱塞材料使用。UHMWPE（超高分子量聚乙烯）密封也需纳入介质评估。</p>
      </>}
      <Link className={base.guideLink} href="/resources/material-compatibility/">查询已有材料兼容参考</Link>
    </section>

    <section className={styles.section}>
      <h2>电机、驱动与绕组接线</h2>
      <p>{tm ? "TM 的额定相电流为 0.5 A，使用两相步进驱动器；按成对绕组接线，再匹配电流档位与起停曲线。" : sm50 ? "50 μL 配置使用 0.67 A/相、3 Ω 绕组电机。电机端与转接端的编号不同，接线时需先辨认连接器。" : "SM 的两种电机配置具有不同的电流、绕组电阻与线色。先核对电机标签与对应接线图，再设置驱动器；不能只按 28 电机外形判断。"}</p>
      <div className={styles.configuration}>
        {motors.length > 1 ? <div className={styles.configurationToolbar}><span className={styles.controlLabel}>电机版本</span><div className={`${styles.controls} ${styles.motorControls}`} role="group" aria-label="SM 电机版本">{motors.map(item => <button key={item.id} type="button" aria-pressed={motorId === item.id} onClick={() => setMotorId(item.id)}>{item.label}</button>)}</div></div> : null}
        <div className={styles.diagramRow}>
          <div className={styles.configurationDetails}><h3>{motor.label}</h3><table className={styles.table}><tbody>{motor.rows.map(([name, value]) => <tr key={name}><th scope="row">{name}</th><td>{value}</td></tr>)}</tbody></table>
            <table className={styles.table}><thead><tr><th>端子 / 线色</th><th>绕组</th></tr></thead><tbody>{motor.pins.map(([pin, value]) => <tr key={pin}><th scope="row">{pin}</th><td>{value}</td></tr>)}</tbody></table><p>{motor.note}</p></div>
          <div className={styles.configurationDiagram}><h3>接线示意图</h3><TechnicalFigure src={motor.image} alt={`${guide.series} ${motor.label}安装面与绕组接线原图`} /></div>
        </div>
      </div>
      <p className={styles.note}>额定相电流是绕组参数，不能直接当作电源输入电流。核对驱动器峰值／有效值定义，设置细分与加减速后，重新检查运动、温升和分配结果。</p>
      {!tm ? <div className={styles.callout}><strong>选择集成 SMVD 时另行匹配控制流程。</strong><p>集成驱动配置使用对应供电、地址与通信协议；先完成初始化与找零，再发送运动指令，并检查忙状态及错误反馈。协议位置单位需结合行程和细分换算，不能直接当作 μL。</p></div> : null}
      <Link className={base.guideLink} href="/resources/technical-articles/piston-pump-acceleration-deceleration-curves/">步进电机加减速设置方法</Link>
    </section>

    <section className={styles.section}>
      <h2>光耦接线与初始位置检测</h2>
      <p>{tm ? "TM 光耦按发光侧与受光侧分开接入，外部限流和上拉电阻是接线的一部分。先确认两种光路状态，再设置找零方向与停止逻辑。" : sm50 ? "当前 50 μL 配置采用四线式光耦，分别连接 LED 支路与信号输出。先检查外部限流、上拉以及控制板输入电平。" : "三线、四线和五线光耦的供电与输出定义不同。按实际供货版本选择；光耦检测初始位置，不等于整个运动过程已有闭环反馈。"}</p>
      <div className={styles.configuration}>
        {sensors.length > 1 ? <div className={styles.configurationToolbar}><span className={styles.controlLabel}>接线版本</span><div className={styles.controls} role="group" aria-label="SM 光耦接线版本">{sensors.map(item => <button key={item.id} type="button" aria-pressed={sensorId === item.id} onClick={() => setSensorId(item.id)}>{item.label}</button>)}</div></div> : null}
        <div className={styles.diagramRow}>
          <div className={styles.configurationDetails}><h3>{sensor.label}</h3><table className={`${styles.table} ${styles.sensorTable}`}><thead><tr><th>端子 / 导线</th><th>连接与作用</th></tr></thead><tbody>{sensor.rows.map(([wire, role]) => <tr key={wire}><th scope="row">{wire}</th><td>{role}</td></tr>)}</tbody></table><p>{sensor.note}</p></div>
          <div className={styles.configurationDiagram}><h3>接线示意图</h3><TechnicalFigure src={sensor.image} alt={`${guide.series} ${sensor.label}电源与信号连接原图`} /></div>
        </div>
      </div>
      <p className={styles.configurationNote}>找零触发后的停车余量应结合当前机构、速度与停止方式验证，防止碰到机械极限。更换电机、光耦或驱动设置后，重新检查初始位置和有效工作行程。</p>
    </section>

    <section className={styles.section}>
      <h2>接口配套与首次使用步骤</h2>
      <div className={styles.cards}>
        <article><h3>{tm ? "6-40 UNF 接口配套" : sm50 ? "M6 平底端口" : "平底端口与密封"}</h3><p>{guide.ports}。{tm ? "先核对细牙接头、密封件和插入深度，避免将其他系列的较大螺纹接头用于本泵。" : "接头、密封件及管外径成套匹配；相同螺纹也需核对端口孔深和密封面。"}</p></article>
        <article><h3>{tm ? "微小液量的管路布置" : "小液量与管路刚性"}</h3><p>{tm ? "在满足设备安装的前提下减少不必要的管路残留体积，检查气泡、阀切换和出口尾液。改变管径或管长后，应在相同目标液量下复测。" : "20 μL 以内定量加样建议在截止阀下游使用硬管；管径、长度、阀位和连接方式都会影响实际液量。"}</p></article>
        <article><h3>确认环境与液温</h3><p>流体 {guide.fluidTemperature}，环境 {guide.ambientTemperature}，湿度 30%～85% RH、无冷凝。{sm50 ? "50 μL 配置的液温上限为 30 ℃，不沿用其他容量的 40 ℃。" : "清洗和长时间运行也需保持在当前配置范围内。"}</p></article>
      </div>
      <ol className={styles.steps}>{getCompactSteps(guide).map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      <div className={styles.verification}><h3 className={styles.subheading}>按目标工作点验收</h3><p>记录介质、温度、背压、目标液量、每次实际收集量，以及管路、阀时序、驱动和补偿设置。比较平均偏差与重复分配波动；改变其中任何一项后，在相同测量方法下复测。</p></div>
    </section>

    <section className={styles.section}>
      <h2>日常维护与异常排查</h2>
      <dl className={styles.referenceRows}>{getCompactCare(guide).map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
      <p className={styles.note}>维护后重新核对初始位置、充液排气和目标液量；涉及拆修或卡滞处理时联系技术支持。</p>
    </section>
  </section>, locale);
}
