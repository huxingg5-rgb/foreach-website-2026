"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { TpuGuideVariant, TpuSelectionGuideData } from "@/data/products/tubing/tpu-selection-guide";
import fittingStyles from "./QuickConnectDetailContent.module.css";
import toolStyles from "./ThreadToBarbedSelectionContent.module.css";
import styles from "./TpuTubingSelectionContent.module.css";
import { TubingManufacturingContent } from "./TubingContentPhotos";
import { TubingConnectionPhotos, TubingMaterialPhoto } from "./TubingSelectionVisuals";
import { tubingView } from "./tubing-view";
import { tubingHtmlLocale } from "@/data/products/tubing/detail-locales";

const hardnesses = ["80A", "85A", "95A"];
const mmPixels = 96 / 25.4;
const number = (value: number) => Number(value.toFixed(2)).toString();
const dimension = (variant: TpuGuideVariant) => `${variant.innerDiameter.toFixed(1)} × ${variant.outerDiameter.toFixed(1)} mm`;

// Background: NewAge Top 20 Tubing & Hose Buying Tips, part 2, section 11;
// Parker 0700P, N28; W3C CSS Values and Units, absolute lengths.
// These are selection trends, not FOREACH pressure, bend-radius or service-life ratings.
export default function TpuTubingSelectionContent({
  guide,
  selectedProductCode,
  locale = "zh",
}: {
  guide: TpuSelectionGuideData;
  selectedProductCode?: string;
  locale?: string;
}) {
  const initial = guide.variants.find((variant) => variant.productCode === selectedProductCode)
    || guide.variants.find((variant) => variant.hardness === "85A" && variant.innerDiameter === 3.2)
    || guide.variants[0];
  const [variantId, setVariantId] = useState(initial.id);
  const [sizeMode, setSizeMode] = useState<"diagram" | "actual">("diagram");
  const [screenScale, setScreenScale] = useState(1);
  const [calibrated, setCalibrated] = useState(false);
  const variant = guide.variants.find((item) => item.id === variantId) || initial;
  const variants = guide.variants.filter((item) => item.hardness === variant.hardness);
  const barbs = guide.barbs.filter((item) => item.tubeId === variant.innerDiameter);
  const pixelsPerMm = mmPixels * (sizeMode === "diagram" ? 4 : screenScale);
  const cutterInRange = variant.outerDiameter <= 6;

  useEffect(() => {
    const invalidateCalibration = () => setCalibrated(false);
    window.addEventListener("resize", invalidateCalibration);
    return () => window.removeEventListener("resize", invalidateCalibration);
  }, []);

  function changeHardness(hardness: string) {
    const next = guide.variants.find((item) => item.hardness === hardness
      && item.innerDiameter === variant.innerDiameter && item.outerDiameter === variant.outerDiameter)
      || guide.variants.find((item) => item.hardness === hardness);
    if (next) setVariantId(next.id);
  }

  return tubingView(
    <div className={`${fittingStyles.detail} ${styles.guide}`} lang={tubingHtmlLocale(locale)} data-section="selection" data-tpu-selection-guide="true">
      <section className={`fx-sec ${styles.section}`} id="tpu-features">
        <h2>01 TPU 管适合气路、运动连接，还是也能输送液体？</h2>
        <p>TPU 管兼具柔性、回弹和耐磨特性，可用于仪器气路、气动连接及需要柔性布管的位置。选择时，可结合硬度、内外径和连接结构，确定适合设备布局的管材配置。</p>
        <TubingMaterialPhoto material="tpu" locale={locale} />
        <div className={`fx-grid ${styles.twoColumns}`}>
          <div className="fx-card"><h3>柔性与回弹，便于设备内部布管</h3><p>在泵阀、气动元件与运动部件之间布置连接管段时，可结合安装空间安排走向，并为弯曲和移动留出余量。实际运动行程与循环条件需通过布管试验确认。</p></div>
          <div className="fx-card"><h3>耐磨特性，适合关注摩擦的位置</h3><p>管路与支架、导向件或相邻管线存在接触时，可将 TPU 纳入材料比较。合理固定和导向仍然重要，应避免锐边、持续刮擦和接口处受力。</p></div>
          <div className="fx-card"><h3>多种硬度与尺寸，便于配套选择</h3><p>现有型号提供 80A、85A、95A 硬度，内径覆盖 1.6–7.0 mm、外径覆盖 3.2–10.0 mm。各硬度与尺寸按实际组合供应，可在下方对照管腔和壁厚。</p></div>
          <div className="fx-card"><h3>按型号区分颜色，便于管路识别</h3><p>现有配置包括本色、红色和蓝色，可结合设备管路标识管理。颜色随具体型号提供，不代表相同尺寸可以任意选择全部颜色。</p></div>
        </div>
        <p className={`fx-muted ${styles.note}`}>液体输送需先核对具体材料牌号与介质。以上为选型方向，具体耐压、弯曲和长期使用表现按实际型号及工况确认。</p>
      </section>

      <section className={`fx-sec ${styles.section}`} id="tpu-hardness">
        <h2>02 80A、85A、95A 怎么选，内外径与壁厚怎样搭配？</h2>
        <h3>80A、85A、95A 怎么选</h3>
        <p>这里的 A 指 Shore A 硬度标尺。同一标尺内，数值较低通常表示材料较软；实际管子的弯曲和装配表现，还受内外径、壁厚及材料配方影响。</p>
        <div className="fx-grid">
          <div className="fx-card"><h3>80A：关注柔性与固定</h3><p>需要柔性布管时可纳入比较。重点检查紧弯、夹持变形与接口保持；吸液或真空工况还需检查管腔是否变形。</p></div>
          <div className="fx-card"><h3>85A：比较布管与装配</h3><p>同时比较柔性、回弹和插装表现。现有 2.4 × 4.0 mm、3.2 × 6.4 mm 规格也提供 95A 配置，便于按相同名义尺寸试配。</p></div>
          <div className="fx-card"><h3>95A：关注装配扩张</h3><p>相对较硬，倒刺连接时尤其要核对峰径、壁厚和导入轮廓。遇到明显发白、开裂或难以装到位时，应重新选择组合。</p></div>
        </div>
        <p className={`fx-muted ${styles.note}`}>硬度不等于耐压等级。允许压力、最小弯曲半径和使用寿命，需按具体型号与工况确认；Shore A 与 Shore D 也不能直接按数字大小比较。</p>
        <div className={styles.subsection} id="tpu-size-guide">
        <h3>用截面看内径、外径与壁厚</h3>
        <p>外圆表示管外径，白色内圆表示管腔，圆环表示管壁。倒刺端先按软管内径筛选，快插端先按管外径筛选，两种尺寸不能互相代替。</p>
        <div className="fx-callout"><p><strong>壁厚 =（外径 − 内径）÷ 2</strong></p></div>

        <div className={styles.controls}>
          <div className={styles.controlGroup} role="group" aria-label="对照硬度">
            <strong>对照硬度</strong>
            {hardnesses.map((hardness) => <button key={hardness} type="button" aria-pressed={variant.hardness === hardness}
              onClick={() => changeHardness(hardness)}>{hardness}</button>)}
          </div>
          <div className={styles.controlGroup} role="group" aria-label="尺寸图显示方式">
            <button type="button" aria-pressed={sizeMode === "diagram"} onClick={() => setSizeMode("diagram")}>比例示意（放大 4 倍）</button>
            <button type="button" aria-pressed={sizeMode === "actual"} onClick={() => setSizeMode("actual")}>实物对照（需校准）</button>
          </div>
        </div>

        {sizeMode === "actual" ? (
          <div className={styles.calibration} data-tpu-calibration="true">
            <h3>先用直尺校准 50 mm 基准线</h3>
            <p>请将浏览器缩放设为 <strong>100%</strong>，不要放大或缩小本图。用直尺贴近屏幕，调节下方滑块，直到两端刻线间距实际为 50 mm。仅设置 100% 不能保证实物尺寸一致。</p>
            <div className={styles.rulerViewport} tabIndex={0} aria-label="50毫米基准线，可横向滚动">
              <div className={styles.ruler} data-tpu-calibration-line="true" style={{ width: 50 * mmPixels * screenScale }}><span>50 mm</span></div>
            </div>
            <label className={styles.scaleControl}>调节基准线长度
              <input type="range" min="0.5" max="3" step="0.005" value={screenScale}
                onChange={(event) => { setScreenScale(Number(event.target.value)); setCalibrated(false); }} />
            </label>
            <label className={styles.confirmCalibration}><input type="checkbox" checked={calibrated}
              onChange={(event) => setCalibrated(event.target.checked)} />我已用直尺确认基准线为 50 mm</label>
            <p className={`fx-muted ${styles.note}`} role="status">{calibrated ? "已按您的确认使用当前屏幕比例。" : "尚未确认校准，圆形仅作尺寸参考。"}{locale === "zh" || locale === "zh-CN" ? "" : " "}更换屏幕、改变浏览器缩放或系统显示缩放后，请重新校准。手机请勿双指缩放；空间不足时可横向滑动基准线。</p>
          </div>
        ) : <p className={`fx-muted ${styles.note}`}>以下截面统一按名义尺寸放大 4 倍绘制，用于比较管腔与壁厚，不是实物 1∶1 大小。需要贴近屏幕对照时，请切换到“实物对照”并校准。</p>}

        <div className={styles.sizeGrid} role="group" tabIndex={0} aria-label={`${variant.hardness} 管材截面对照，手机可横向滑动`}>
          {variants.map((item) => (
            <button className={styles.sizeCard} type="button" key={item.id} data-tpu-guide-variant={item.id}
              aria-pressed={item.id === variant.id} aria-label={`${item.hardness}，内径 ${item.innerDiameter} 毫米，外径 ${item.outerDiameter} 毫米，商品编码 ${item.productCode}`}
              onClick={() => setVariantId(item.id)}>
              <span className={styles.circleStage}>
                <svg role="img" aria-label={`内径 ${item.innerDiameter}、外径 ${item.outerDiameter} 毫米截面`}
                  viewBox={`0 0 ${item.outerDiameter} ${item.outerDiameter}`}
                  width={item.outerDiameter * pixelsPerMm} height={item.outerDiameter * pixelsPerMm} data-tpu-size-circle="true">
                  <circle cx={item.outerDiameter / 2} cy={item.outerDiameter / 2} r={item.outerDiameter / 2} fill="#c6d8e9" />
                  <circle cx={item.outerDiameter / 2} cy={item.outerDiameter / 2} r={item.innerDiameter / 2} fill="#ffffff" />
                </svg>
              </span>
              <strong>{dimension(item)}</strong>
              <span>壁厚 {number(item.wall)} mm · {item.color}</span>
            </button>
          ))}
        </div>

        <div className={styles.currentSize} aria-live="polite" data-tpu-guide-current="true">
          <strong>当前对照：{dimension(variant)} · {variant.hardness}</strong>
          <span>型号 {variant.model}　商品编码 {variant.productCode}　壁厚 {number(variant.wall)} mm</span>
        </div>
        <p className={`fx-muted ${styles.note}`}>以上为现有型号的名义尺寸，硬度与尺寸按实际组合显示。手机可横向滑动比较，圆形不会随卡片缩小。截面图用于辅助识别，不作为验收量具；实物内外径与公差请以测量和对应规格确认。</p>
        </div>
      </section>

      <section className={`fx-sec ${styles.section}`} id="tpu-material">
        <h2>03 长期接触水、试剂和清洗液，需要确认什么？</h2>
        <p>TPU 是热塑性聚氨酯，具有弹性体的柔性与回弹特点。同样标为 TPU 或具有相同硬度的管材，其化学类型、配方和使用表现仍可能不同；材料名称和硬度需要与具体牌号一起确认。</p>
        <div className="fx-grid">
          <div className="fx-card"><h3>聚醚型与聚酯型</h3><p>不同类型在耐水解、机械表现和介质耐受方面存在差异。聚醚型 TPU 通常在耐水解方面更有优势，但不能据此将未确认牌号的管材直接判定为适合长期输水或湿热使用。</p></div>
          <div className="fx-card"><h3>工作液与清洗液一起确认</h3><p>记录介质成分、浓度、温度及接触时间，清洗剂和消毒条件也要纳入。出现溶胀、硬化或回弹变化时，管材与接头之间的配合也可能改变。</p></div>
          <div className="fx-card"><h3>材料数据与成品管路分别核对</h3><p>材料的强度、硬度或熔化温度，不能直接代替成品管材的允许压力、工作温度或寿命。食品接触、医疗用途和灭菌要求，应核对所选型号对应的资料。</p></div>
        </div>
        <p className={`fx-muted ${styles.note}`}>本页不将现有型号统一认定为聚醚型或聚酯型。若项目涉及长期浸液、湿热或特殊清洗，请在选型时确认具体材料牌号及相应验证要求。</p>
        <div className="fx-links"><Link href="/resources/material-compatibility/">查询材料兼容性参考</Link></div>
      </section>

      <section className={`fx-sec ${styles.section}`} id="tpu-barb-match">
        <h2>04 倒刺、快插和设备端口，怎样与管子配套？</h2>
        <p>先按管路任务选择接头结构，再核对各端软管内径、倒刺轮廓及材料。接头本体结构决定连接走向，D、F 等代码用于识别具体接管端的倒刺轮廓，两者分别选择。</p>
        <TubingConnectionPhotos material="tpu" locale={locale} />
        <div className={`fx-grid ${styles.twoColumns}`}>
          <div className="fx-card"><h3>两段软管直线连接：BA</h3><p>按两端软管内径选择等径或异径直通型号；两端的尺寸和轮廓需分别核对。</p></div>
          <div className="fx-card"><h3>转角布管：BL</h3><p>L 型接头用于改变出管方向，同时为软管弯曲、安装和支承留出空间。</p></div>
          <div className="fx-card"><h3>分支连接：BT、BY</h3><p>按 T 型或 Y 型走向布置支路，逐端确认软管规格。分支结构本身不保证各路流量相同。</p></div>
          <div className="fx-card"><h3>连接设备端口：SA、SAL</h3><p>螺纹侧与设备端口配合，倒刺侧连接软管；同时确认螺纹、密封方式、接头材料和出管方向。</p></div>
        </div>
        <h3>按当前内径比较 D／F 倒刺候选</h3>
        <p>以下随尺寸对照联动，列出名义接管内径相同、已有峰径资料的部分 PP 本色 SA 系列 D／F 候选。这里的 D、F 是倒刺轮廓代码，与 Shore D 硬度标尺无关。</p>
        <div className={styles.matchStatus}><strong>{variant.innerDiameter.toFixed(1)} mm 内径 · {variant.hardness}</strong><span>尺寸初筛，需试配确认</span></div>
        {barbs.length ? (
          <div className="fx-tw" tabIndex={0} role="region" aria-label="倒刺接头候选型号，可横向滚动">
            <table className={styles.matchTable} data-tpu-barb-table="true">
              <thead><tr><th scope="col">候选型号</th><th scope="col">轮廓</th><th scope="col">倒刺峰径</th><th scope="col">名义扩张量</th><th scope="col">设备端螺纹</th></tr></thead>
              <tbody>{barbs.map((barb) => <tr key={barb.model}>
                <td><Link href={barb.href}>{barb.model}</Link></td><td>{barb.profile} 型</td><td>{number(barb.crest)} mm</td>
                <td>{number((barb.crest / variant.innerDiameter - 1) * 100)}%</td><td>{barb.thread}</td>
              </tr>)}</tbody>
            </table>
          </div>
        ) : <div className={styles.emptyMatch} data-tpu-barb-empty="true"><strong>当前对照范围内暂无已列出的候选</strong><p>请提交 {dimension(variant)}、{variant.hardness}、介质与工作条件，由工程师进一步核对。不要将相邻内径规格直接视为可互换；这里未列出，也不代表没有其他连接方案。</p><Link href="/contact/">联系工程师确认连接</Link></div>}
        <div className="fx-callout"><p><strong>名义扩张量 =（倒刺峰径 − 软管未装配内径）÷ 软管未装配内径 × 100%</strong></p></div>
        {variant.innerDiameter === 3.2 ? <p>以这两款接头为例，F 型峰径 4.0 mm、扩张量 25%；D 型峰径 4.5 mm、扩张量约 40.6%。若较硬 TPU 难以插装，可先比较扩张量较小的候选，实际插入力还受导入面、摩擦及管壁影响；两款设备端螺纹也不同，不能直接互换。</p> : null}
        <div className={`fx-grid ${styles.twoColumns}`}>
          <div className="fx-card"><h3>不能只按硬度指定 D 或 F</h3><p>同内径下，不同硬度和壁厚会改变装配表现。没有“80A 一律选 D、95A 一律选 F”的通用规则；也不能把本例峰径推广到所有同字母接头。</p></div>
          <div className="fx-card"><h3>能插入，还要验证能否使用</h3><p>用实际软管检查能否无损装到位，再验证密封、抗拔、弯折与使用后状态。较大扩张量不等于更高可靠性；额外固定件需结合软管和倒刺结构确认。</p></div>
        </div>
        <p className={`fx-muted ${styles.note}`}>表中扩张量按名义尺寸计算，没有纳入尺寸公差，不代表该接头与当前 TPU 已完成耐压、抗拔或寿命验证。候选接头本体为 PP，接头与软管的介质兼容性需分别确认。</p>
        <div className="fx-links"><Link href="/products/fittings/barbed-fittings/">查看倒刺接头结构</Link><Link href="/resources/technical-articles/barbed-fitting-expansion-ratio/">了解膨胀比与试配</Link></div>
      </section>

      <section className={`fx-sec ${styles.section}`} id="tpu-conditions">
        <h2>05 温度、压力和反复运动怎样评估，切管工具怎么选？</h2>
        <div className="fx-grid">
          <div className="fx-card"><h3>温度、压力与真空</h3><p>按具体管材型号和完整连接组合确定允许范围。升温、脉动或负压条件应单独评估；吸液时还需检查弯曲和夹持位置的管腔变形。</p></div>
          <div className="fx-card"><h3>弯曲、摩擦与反复运动</h3><p>避免折弯、锐边和持续拉伸。紧弯、拖链或连续往复位置，需要按实际行程、频率、固定方式和循环后的状态验证，不能仅凭“柔性”判断适用。</p></div>
          <div className="fx-card"><h3>清洗、消毒与长期接触</h3><p>清洗液、湿热、消毒和灭菌可能改变材料及连接状态。采用高温蒸汽、特殊溶剂或长期浸液前，应取得所选型号适用性的依据。</p></div>
        </div>

        <div className={`${toolStyles.toolRow} ${styles.toolRow}`}>
          <div>
            <h3>裁切前，先核对工具的外径范围</h3>
            <div className="fx-tw">
              <table className="fx-kv"><tbody>
                <tr><th scope="row">工具型号</th><td>T-PC-6</td></tr>
                <tr><th scope="row">商品编码</th><td>959009</td></tr>
                <tr><th scope="row">最大切管外径</th><td>6 mm（宣传册详细规格页标注）</td></tr>
              </tbody></table>
            </div>
            <p>该工具用于管子裁剪，宣传册介绍其体积小、操作简单、切口平整。裁切前仍需用实际 TPU 管确认硬度、壁厚、支承和切口表现；外径在标注范围内，不等于所有管材组合均已验证。</p>
            <div className="fx-callout" data-tpu-cutter-fit={cutterInRange ? "within-range" : "outside-range"} aria-live="polite">
              <strong>当前对照：{dimension(variant)} · {variant.hardness}</strong>
              <p>{cutterInRange
                ? `管外径 ${number(variant.outerDiameter)} mm 未超过该工具标注的 6 mm 上限，可进一步用样管试切确认；请勿仅按软管内径判断。`
                : `管外径 ${number(variant.outerDiameter)} mm 超过该工具标注的 6 mm 上限，不在 T-PC-6 的标注尺寸范围内，请另选适合该外径的工具。`}</p>
            </div>
            <a href="/downloads/resources/datasheets/zh-CN/Tubing-and-Fittings/foreach-fittings-and-elastomer-tubing-catalog-a02-cn.pdf#page=106" target="_blank" rel="noopener noreferrer">查看宣传册详细规格（印刷页 105）</a>
          </div>
          <figure className={toolStyles.toolFigure}>
            <Image src="/images/products/tubing/tpu-tubing/foreach-t-pc-6-tube-cutter-catalog.webp"
              width={1500} height={1500} sizes="(max-width: 760px) 100vw, 340px"
              alt="FOREACH T-PC-6 裁管机，带切刀和管材定位支承结构，图片截自 A02 宣传册" />
            <figcaption>T-PC-6 裁管机 · 宣传册图片</figcaption>
          </figure>
        </div>

        <h3>裁切加工与端面检查</h3>
        <ol className={styles.installation}>
          <li><strong>确认规格与裁切要求。</strong>按管外径、壁厚和硬度选择刀具及支承，明确目标长度和测量方法。不同管材与尺寸换用后，应重新试切。</li>
          <li><strong>自然放置并可靠定位。</strong>管材保持无明显拉伸、扭转和压扁的状态，按工具说明放置和支承；避免通过过度夹紧来固定柔软管材。</li>
          <li><strong>检查切口与管腔。</strong>先做样管裁切，检查端面是否平整、垂直，管腔有无压扁、毛刺或残屑。刀具磨损或切口不良时，先调整或维护工具。</li>
          <li><strong>复核长度后再批量加工。</strong>在约定的无拉伸测量状态下复核切长与一致性，再进行批量裁切。换规格、换刀或调整加工方法后，重新确认首件。</li>
        </ol>
        <p className={`fx-muted ${styles.note}`}>使用其他自动裁管设备时，还需核对送料夹持、放卷张力和速度对管材拉伸、打滑及压扁的影响，并以样管试切结果确认成品切长；设备设定长度或分辨率不直接等于加工精度。</p>
      </section>

      <section className={`fx-sec ${styles.section}`} id="tpu-installation">
        <h2>06 怎样安装、试运行和判断是否该换管？</h2>
        <p>使用合格的裁切管段，按接头与设备的装配要求完成连接，再按完整管路的工作条件检查。</p>
        <ol className={styles.installation}>
          <li><strong>准备管端。</strong>切口齐整、清除残屑，检查裂口、压扁及异常扩口。不用尖锐工具撑管口；润滑或其他辅助装配方法需确认与管材及介质兼容。</li>
          <li><strong>沿轴向装到规定位置。</strong>支承接头本体，将软管沿倒刺轴向推入，越过峰部并贴合接管段。遇到异常阻力或管口损伤时，停止并核对尺寸、轮廓与硬度。</li>
          <li><strong>留出弯曲与运动余量。</strong>避免紧贴接口急弯、拉扯或扭转。运动部件要检查整个行程中的布管状态，让端部固定承担合适的支承作用。</li>
          <li><strong>按实际使用条件验证。</strong>在目标介质、温度、压力或真空下检查泄漏、进气、松脱和管腔变形；有往复运动或清洗循环时，检查相应循环后的连接状态。</li>
        </ol>
        <p>维护时检查管材有无硬化、开裂、异常扩口或磨损，以及接口处是否松脱、渗漏或进气。出现损伤或使用表现变化时，应核查原因，并按设备维护要求更换相应管段或配套件。</p>
        <div className={`fx-grid ${styles.twoColumns}`}>
          <div className="fx-card"><h3>需要快插连接时</h3><p>另行核对外径、公差、圆度、硬度及接头允许的管材，是否需要管内支撑也按具体组合确认。不能因为外径相同，就默认所有 TPU 都能用于同一快插接头。</p></div>
          <div className="fx-card"><h3>向工程师提供哪些信息</h3><p>提供管材型号、内外径、硬度、管长、介质与浓度、温度、压力或真空、接头完整型号，以及运动、清洗和固定要求。</p></div>
        </div>
        <div className="fx-links"><Link href="/resources/material-compatibility/">查询材料兼容性参考</Link><Link href="/contact/">提交管材与接头配置需求</Link></div>
      </section>

      <section className={`fx-sec ${styles.section}`} id="tpu-assemblies">
        <h2>07 只买卷管，还是把接头和定长管段一起配好？</h2>
        <p><strong>样机走线还在调整时，可先购买卷管试装；长度和连接确定后，可提出定长裁切、接头配套与装配需求。</strong>TPU 按软管连接结构匹配，不直接套用 FEP、PTFE 等材料的翻边或卡环管组件配置。</p>
        <div className="fx-tw" tabIndex={0} role="region" aria-label="TPU 定长与组件配套要求">
          <table className={styles.matchTable}>
            <thead><tr><th scope="col">需要配好的内容</th><th scope="col">图纸或清单写清</th><th scope="col">样件先检查什么</th></tr></thead>
            <tbody>
              <tr><td>定长管段</td><td>管材型号、硬度、颜色、切长及公差、测量状态。</td><td>无拉伸状态下的长度、切口、管腔和放卷回弹。</td></tr>
              <tr><td>A/B 两端接头</td><td>接头完整型号或端部图、插入深度、固定方式。</td><td>能否无损装到位，静态与运动条件下的密封和抗拔。</td></tr>
              <tr><td>安装与识别</td><td>走线路径、运动行程、标签、分装数量与用途。</td><td>全行程是否急弯、摩擦、拉扯，标识能否对应设备流路。</td></tr>
            </tbody>
          </table>
        </div>
        <p>把工作液或气体、清洗条件、温度、压力或真空一并说明，由同一套样件确认管子与接头。颜色用于识别，也要与实际型号对应。</p>
        <div className="fx-links"><Link href="/contact/">提交定长管与端部配套需求</Link></div>
      </section>
      <section className={`fx-sec ${styles.section}`} id="tpu-troubleshooting">
        <h2>08 流量下降、接口漏气或运动磨损，先查哪里？</h2>
        <div className="fx-tw" tabIndex={0} role="region" aria-label="TPU 管使用异常排查">
          <table className={styles.matchTable}>
            <thead><tr><th scope="col">问题现象</th><th scope="col">先检查</th><th scope="col">下一步</th></tr></thead>
            <tbody>
              <tr><td>吸液时流量变小</td><td>负压下的管腔、急弯、扎带夹持和入口阻力。</td><td>先调整限制位置，再比较硬度、壁厚与实际连接。</td></tr>
              <tr><td>接头处漏气或松脱</td><td>内外径基准、倒刺或快插配套、插入位置及端部损伤。</td><td>停机卸压后检查；更换受损管端并重新试配。</td></tr>
              <tr><td>往复位置磨损或开裂</td><td>全行程的摩擦点、弯曲路径、固定和端部拉力。</td><td>调整支承与余量，按实际行程和频率做循环检查。</td></tr>
              <tr><td>接液后发黏、溶胀或回弹变化</td><td>材料牌号、介质、清洗剂、温度和接触时间。</td><td>停止使用受损管段，重新评估具体材料与使用条件。</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      <section className={`fx-sec ${styles.section}`} id="tpu-manufacturing">
        <h2>09 对洁净度与尺寸一致性有要求，选管时看什么？</h2>
        <TubingManufacturingContent locale={locale} />
      </section>
    </div>, locale
  );
}
