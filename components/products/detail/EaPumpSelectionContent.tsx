"use client";

import { useState } from "react";
import { pistonView } from "./piston-view";
import { getEaDiagramFile } from "@/data/products/detail/technical-diagrams";

import Link from "next/link";
import { ea500PmmaTroubleshooting } from "@/data/products/detail/ea-500-pmma-detail.zh";
import { eaCareScenarios, eaGuideRoot, eaHeadMaterials, eaHomeSensorPhotos, eaHomeSensors, eaMotorSetupChecks, eaMotorWiring, eaTubeConnections, eaUseSteps, eaVerificationFields } from "@/data/products/detail/ea-pump-selection-guide.zh";
import type { PistonPumpGuide } from "@/data/products/detail/piston-pump-guide.zh";
import PistonPumpCapacityTool from "./PistonPumpCapacityTool";
import base from "./EaPumpDetailContent.module.css";
import styles from "./EaPumpSelectionContent.module.css";

function GuideFigure({ file, alt, caption, locale = "zh" }: { file: string; alt: string; caption?: string; locale?: string }) {
  return <figure className={styles.figure}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={`${eaGuideRoot}${getEaDiagramFile(file, locale)}`} alt={alt} width={1500} height={1125} loading="lazy" decoding="async" />
    {caption ? <figcaption>{caption}</figcaption> : null}
  </figure>;
}

export default function EaPumpSelectionContent({ guide, locale = "zh" }: { guide: PistonPumpGuide; locale?: string }) {
  const [driveId, setDriveId] = useState<string>(guide.drives[0].id);
  const [materialView, setMaterialView] = useState("all");
  const [motorId, setMotorId] = useState<string>(eaMotorWiring[0].id);
  const [sensorId, setSensorId] = useState<string>(eaHomeSensors[0].id);
  const drive = guide.drives.find(item => item.id === driveId) || guide.drives[0];
  const motor = eaMotorWiring.find(item => item.id === motorId) || eaMotorWiring[0];
  const sensor = eaHomeSensors.find(item => item.id === sensorId) || eaHomeSensors[0];
  const compensationReferenceSteps = drive.fullSteps / 100;
  const materials = eaHeadMaterials.filter(item => materialView === "all" || item.transparent === (materialView === "clear"));

  return pistonView(<section lang={locale === "zh" ? "zh-CN" : locale} className={`${base.content} ${styles.guide}`} aria-label={`${guide.model} 选型与使用`} data-ea-selection-guide data-piston-guide={guide.model}>
    <section className={styles.section} id="ea-guide-features">
      <h2>特性与优势</h2>
      <p>EA 通过步进电机带动柱塞往复运动，完成液体吸取与分配。选型应先明确单次液量、连续分配次数、介质和设备节拍，再确定容量、接液材料、阀路与控制配置。</p>
      <div className={styles.featureGrid}>
        <article><h3>按行程控制吸排液</h3><p>用运动步数组织吸液、分配和补液动作，适合分析仪器中的试剂加注、稀释液添加及缓冲液分配。</p></article>
        <article><h3>{`${guide.capacity} μL 标称容量`}</h3><p>{guide.capacityAdvice}</p></article>
        <article><h3>{guide.material === "PMMA" ? "透光泵头便于观察" : "非透光泵头配置"}</h3><p>{guide.materialAdvice}</p></article>
        <article><h3>电机与反馈分别选择</h3><p>按设备需求选择步进电机、初始位置光耦或编码器。光耦用于检测初始位置，不等于已具备运动闭环。</p></article>
        <article><h3>泵、阀与驱动配套</h3><p>阀组件和驱动器按液路及控制方式分别选择，将吸液、分配与换阀动作放在完整工作周期中安排。</p></article>
        <article><h3>明确寿命与维护条件</h3><p>预计寿命 500 万次，对应纯水、常温、50 kPa 背压。含盐或易结晶介质需设计冲洗和停机维护。</p></article>
      </div>
    </section>

    <section className={styles.section} id="ea-guide-capacity">
      <h2>容量、步距角与分辨率怎么选</h2>
      <p>{`${guide.capacity} μL 是标称容量。`} {guide.capacityAdvice}</p>
      <PistonPumpCapacityTool locale={locale} guide={guide} selectedDriveId={driveId} onDriveChange={setDriveId} />
      <div className={styles.compensation}>
        <div><h3>补偿步数与定量步数分开设置</h3><p>换向后先处理机械间隙，再计算有效定量行程。背隙“≤1.0%”是泵的性能指标；补偿动作与阀切换应按实际液路分别设置。</p></div>
        <div className={styles.compensationExample}><span>当前满行程的 1% 换算</span><p data-ea-compensation-reference>{drive.fullSteps} × 1% = <strong>{Number(compensationReferenceSteps.toFixed(4))} 步</strong></p><span>仅作步数换算示例，实际补偿量需验证。</span></div>
      </div>
      <Link className={base.guideLink} href="/resources/technical-articles/clinical-chemistry-piston-pump-100-250-500-ul-selection/">比较 100、250、500 μL 容量</Link>
    </section>

    <section className={styles.section} id="ea-guide-materials">
      <h2>泵头、柱塞和密封材料分别怎么选</h2>
      <figure className={styles.materialPhoto}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${eaGuideRoot}ea-pump-materials-configurations-cropped.webp`} alt="FOREACH EA 系列不同容量与泵头配置的柱塞泵实物合影" width={1500} height={880} loading="lazy" decoding="async" />
      </figure>
      <p>先记录工作液与清洗液的成分、浓度、温度和接触时间，再判断是否需要观察泵腔或避光。当前型号为 {guide.headName} 泵头；下表是 EA 系列的材料比较范围，切换对照不会改变当前型号或供货配置。</p>
      <div className={styles.controls} role="group" aria-label="对照泵头透光性">{[["all", "全部材料"], ["clear", "透光候选"], ["opaque", "非透光候选"]].map(([id, label]) => <button key={id} type="button" aria-pressed={materialView === id} onClick={() => setMaterialView(id)}>{label}</button>)}</div>
      <p className={styles.scrollHint}>左右滑动表格，查看完整的材料限制与选择依据。</p>
      <div className={base.tableWrap} role="region" aria-label="EA 泵头材料对照" tabIndex={0}><table className={`${styles.table} ${styles.materialTable}`} data-ea-material-table><thead><tr><th>泵头材料</th><th>主要比较方向</th><th>明确限制与选择依据</th></tr></thead><tbody>
        {materials.map(item => <tr key={item.name}><th scope="row">{item.name}<span className={styles.materialFullName}>（{item.fullName}）</span><span className={styles.tag}>{item.transparent ? "透光" : "非透光"}{item.name === guide.material ? " · 当前泵头" : ""}</span></th><td>{item.purpose}</td><td>{item.check}</td></tr>)}
      </tbody></table></div>
      <div className={styles.callout}><strong>有酒精清洗，不能只看工作液是否为水性。</strong><p>PMMA（聚甲基丙烯酸甲酯）的使用限制同样适用于清洗过程。PCTG 也有强酸、强碱及次氯酸钠限制，材料替换应按完整配方重新筛选；“非透光”本身不代表耐腐蚀。</p></div>
      <div className={styles.cards}>
        <article><h3>柱塞：区分陶瓷与 PEEK</h3><p>EA 系列的柱塞选项包括氧化锆、氧化铝和 PEEK。当前页面为陶瓷柱塞；若改为 PEEK，应作为另一种接液配置评估，不能继续按陶瓷配置描述。具体陶瓷种类、表面与密封配合由供货配置确定。</p></article>
        <article><h3>密封：与柱塞和介质一起核对</h3><p>密封采用 UHMWPE（超高分子量聚乙烯）。更换泵头材料后，仍要核对密封、柱塞、阀、管路和接头；含盐或易结晶介质还需考虑结晶对密封的影响及密封冲洗选项。</p></article>
      </div>
      <p className={styles.note}>PSU、PEEK、PVDF 的通用材料特性仅作筛选背景，不代表 FOREACH 使用这些品牌的树脂，也不改变本泵的温度、压力和验证要求。参考：<a href="https://www.syensqo.com/en/brands/udel-psu/properties" target="_blank" rel="noreferrer">PSU 特性</a>、<a href="https://www.victrex.com/-/media/downloads/technical-guides/victrex_chemical_resistance_en_us.pdf?rev=bfb8f4c25d1a4cd5bb8ad835a6c43188" target="_blank" rel="noreferrer">PEEK 化学兼容表</a>、<a href="https://hpp.arkema.com/en/product-families/kynar-fluoropolymer-family/chemical-resistance-fuel-resistance/" target="_blank" rel="noreferrer">PVDF 化学兼容说明</a>。</p>
      <Link className={base.guideLink} href="/resources/material-compatibility/">查询已有材料兼容参考</Link>
    </section>

    <section className={styles.section} id="ea-guide-motor">
      <h2>电机配置、驱动选择与接线</h2>
      <p>先按标签、料号与接线资料确定电机版本，再选择驱动器。步距角决定名义步数关系，四线／六线决定绕组接法；两项应分别核对，不能用线束外观推定全部电气参数。</p>
      <div className={styles.configuration}>
        <div className={styles.configurationToolbar}>
          <span className={styles.controlLabel}>电机版本</span>
          <div className={`${styles.controls} ${styles.motorControls}`} role="group" aria-label="电机接线版本">{eaMotorWiring.map(item => <button key={item.id} type="button" aria-pressed={motorId === item.id} onClick={() => setMotorId(item.id)}>{item.label}</button>)}</div>
        </div>
        <div className={styles.diagramRow}>
          <div className={styles.configurationDetails}><h3>{motor.label}</h3><table className={styles.table}><tbody><tr><th scope="row">额定相电流</th><td>{motor.current}</td></tr><tr><th scope="row">绕组电阻（25 ℃）</th><td>{motor.resistance}</td></tr><tr><th scope="row">绕组电感（1 kHz）</th><td>{motor.inductance}</td></tr></tbody></table><p>{motor.note}</p><p>相电流、细分和加减速曲线应与驱动器定义匹配。额定相电流不能直接当作电源输入电流；先核对驱动器电流档位说明，再进行运动与温升检查。</p></div>
          <div className={styles.configurationDiagram}><h3>接线示意图</h3><GuideFigure locale={locale} file={motor.file} alt={`${motor.label}端子编号与绕组接线示意图`} /></div>
        </div>
      </div>
      <div className={styles.callout}><strong>控制器、驱动器与泵体分开理解。</strong><p>步进电机需要匹配驱动器。ISC1000 为可选集成驱动器，其 RS-232、RS-485、CAN 通信能力属于该驱动器，不能套到未配驱动器的裸泵上。阀组件、驱动器和闭环编码器也应分别在配置中确认。</p></div>
      <h3 className={styles.subheading}>按顺序调试运动参数</h3>
      <dl className={styles.referenceRows}>{eaMotorSetupChecks.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
      <Link className={base.guideLink} href="/resources/technical-articles/piston-pump-acceleration-deceleration-curves/">步进电机加减速设置方法</Link>
    </section>

    <section className={styles.section} id="ea-guide-sensor">
      <h2>初始位置光耦的选择与接线</h2>
      <p>光耦用于检测初始位置并配合程序找零；编码器用于另一类运动反馈需求，两者不能互相代替。EA 还可选无光耦或定制光耦，以下按资料中的三种常见配置对照。</p>
      <div className={styles.configuration}>
        <div className={styles.configurationToolbar}>
          <span className={styles.controlLabel}>接线版本</span>
          <div className={styles.controls} role="group" aria-label="光耦接线版本">{eaHomeSensors.map(item => <button key={item.id} type="button" aria-pressed={sensorId === item.id} onClick={() => setSensorId(item.id)}>{item.label}</button>)}</div>
        </div>
        <div className={styles.diagramRow}>
          <div className={styles.configurationDetails}><h3>{sensor.label}</h3><p>{sensor.overview}</p><table className={`${styles.table} ${styles.sensorTable}`}><thead><tr><th>导线</th><th>连接与作用</th></tr></thead><tbody>{sensor.rows.map(([wire, role]) => <tr key={wire}><th scope="row">{wire}</th><td>{role}</td></tr>)}</tbody></table><p className={styles.note}>{sensor.note}</p></div>
          <div className={styles.configurationDiagram}><h3>接线示意图</h3><GuideFigure locale={locale} file={sensor.file} alt={`${sensor.label}电源与信号连接示意图`} /></div>
        </div>
      </div>
      <p className={styles.configurationNote}>首次调试应先读取遮挡与未遮挡状态，确认控制板的有效电平、找零方向与停止逻辑，再进行自动找零。停止余量按对应机构确定，不把其他容量或版本的步数直接复制过来。</p>
      <h3 className={styles.subheading}>工作行程与找零位置</h3>
      <div className={styles.strokeLayout} data-ea-stroke-reference>
        <GuideFigure locale={locale} file="ea-stroke-positions-hd.webp" alt="EA 柱塞泵 A、B、C、D 行程位置示意，展示机械极限、光耦信号跳变点和全行程整步点" />
        <div>
          <dl className={styles.strokeDefinitions}>
            <div><dt>B 点：光耦信号跳变点</dt><dd>柱塞向上到 B 点时进入遮挡区；AB 为遮挡状态，BD 为未遮挡状态。输出电平按上方所选光耦接线版本核对。</dd></div>
            <div><dt>BC：正常工作行程</dt><dd><span data-ea-stroke-steps>{`当前 ${drive.label} 配置的满行程为 ${drive.fullSteps} 整步，对应 ${guide.capacity} μL 标称容量。`}</span></dd></div>
            <div><dt>A、D：机械极限位置</dt><dd>AB 与 CD 为端部预留区，不作为额外加液行程使用。端部余量与停止位置按当前容量和机构确认。</dd></div>
          </dl>
          <p className={styles.note}>配置光耦时，建议每个测试周期结束后进行初始化找零。触发后的停车余量需匹配对应机构、找零速度与停止逻辑，避免顶到机械极限。</p>
        </div>
      </div>
      <div className={styles.photoSection}>
        <div className={styles.mediaHeader}><h3>光耦实物图</h3></div>
        <div className={styles.photoGallery} data-ea-home-sensor-photos>
          {eaHomeSensorPhotos.map(photo => <GuideFigure key={photo.file} file={photo.file} alt={photo.alt} />)}
        </div>
      </div>
    </section>

    <section className={styles.section} id="ea-guide-installation">
      <h2>接口、管路配套与首次使用步骤</h2>
      <div className={styles.cards}>
        <article><h3>接口先核对螺纹与平底密封</h3><p>标准接口为两个 1/4-28 UNF 平底端口，M6 可选。配套时同时核对螺纹、孔深、管外径、接头和垫片；螺纹相同不等于密封结构完全相同。</p></article>
        <article><h3>按定量任务选择管路</h3><p>精确定量可比较 PTFE、FEP、PFA、PEEK 硬管，并按接口匹配翻边／垫片或卡箍连接。20 μL 以内定量加样，建议截止阀下游使用硬管。</p></article>
        <article><h3>阀路按吸液、分配和清洗组织</h3><p>单泵、泵阀一体及带驱动配置应分别核对。需要集成阀或驱动时，可进一步确认 EAV、EAD 或 EAVD 配套，避免把可选部件当作默认随货。</p></article>
      </div>
      <div className={styles.assemblyGrid} data-ea-tube-connections>
        {eaTubeConnections.map(connection => <article key={connection.id} className={styles.assemblyCard}>
          <h3>{connection.title}</h3>
          <div className={styles.assemblyBody}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={connection.image} alt={connection.alt} width={connection.imageWidth} height={connection.imageHeight} loading="lazy" decoding="async" />
            <div><p className={styles.assemblyParts}>{connection.parts.map(part => <span key={part}>{part}</span>)}</p><p>{connection.description}</p><p className={styles.note}>{connection.check}</p></div>
          </div>
        </article>)}
      </div>
      <div className={styles.placeholderGrid}>
        <GuideFigure file="ea-pump-installation-tubing-rack-cropped.webp" alt="柱塞泵在多工位支架上的安装、管路与线束布置实拍" caption="柱塞泵安装与管路布置实拍" />
        <GuideFigure file="ea-pump-heads-interface-photo.webp" alt="多台柱塞泵的透明泵头、侧面接口与橙色防护塞实拍" caption="柱塞泵泵头与接口实拍" />
      </div>
      <ol className={styles.steps}>{eaUseSteps.map(step => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      <div className={styles.verification} data-ea-volume-verification>
        <h3 className={styles.subheading}>按实际液路验证目标液量</h3>
        <p>完成充液排气、找零和换向补偿后，按同一目标液量重复收集，并采用一致的测量方法记录结果。</p>
        <dl className={styles.referenceRows}>{eaVerificationFields.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl>
        <p className={styles.note}>名义步数、柱塞行程指标和实际试剂的加液结果分别记录，实际液量与重复性按目标工况验收。</p>
      </div>
      <div className={styles.links}><Link href="/products/fittings/hard-tube-fittings/">选择硬管接头</Link><Link href="/resources/technical-articles/precision-piston-pump-backlash-compensation/">回程差补偿方法</Link></div>
    </section>

    <section className={styles.section} id="ea-guide-care">
      <h2>日常使用、停机维护与异常排查</h2>
      <dl className={styles.referenceRows}>{eaCareScenarios.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{title === "更换试剂或清洗液" ? guide.materialAdvice : text}</dd></div>)}</dl>
      <div className={base.tableWrap}><table className={styles.table}><thead><tr><th>现象</th><th>优先检查</th></tr></thead><tbody>{ea500PmmaTroubleshooting.map(([symptom, action]) => <tr key={symptom}><th scope="row">{symptom}</th><td>{action}</td></tr>)}</tbody></table></div>
      <p className={styles.note}>实际安装接线以供货版本为准；未授权的改装、拆修及卡死处理应联系技术支持。</p>
    </section>
  </section>, locale);
}
