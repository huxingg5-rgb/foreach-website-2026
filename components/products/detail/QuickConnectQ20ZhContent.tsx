import { registerFittingDetail } from "./fitting-detail-view";
import type { ReactElement } from "react";
import FittingDeliveryZh from "./FittingDeliveryZh";

export type QuickConnectQ20ZhSection = "all" | "product" | "selection" | "delivery";

// A02 printed p64 (PDF p65): Q20 panel cutout and male/female thickness limits.
// Exact Q2001-PMV-SACN drawing: 1/2-24UNS mounting thread and SUS304 nut.
const PANEL_INSTALLATION_HTML = String.raw`<div class="fx-sec" id="fx-panel-install">
  <h2>穿板安装：开孔与板厚</h2>
  <p>Q2001-PMV-SACN 为穿板公端，面板由接头定位面与锁紧螺母夹持。先确认安装孔轮廓和实际板厚，再预留公母端插拔、按键操作及软管布置空间。</p>
  <div class="fx-panel-figures">
    <figure><a href="/images/products/fittings/quick-connect-fittings/q20/q20-panel-cutout-dimensions.webp" target="_blank" rel="noreferrer" aria-label="放大 Q20 穿板安装孔尺寸图">
      <img src="/images/products/fittings/quick-connect-fittings/q20/q20-panel-cutout-dimensions.webp" alt="Q20 带单平边的 D 形安装孔：圆弧直径 13 mm，孔高 12.1 mm，图中标注尺寸公差" width="1500" height="1500" loading="lazy">
    </a><figcaption>Q20 穿板安装孔，单位 mm；点击查看大图。</figcaption></figure>
    <figure><a href="/images/products/fittings/quick-connect-fittings/q20/q2001-pmv-sacn-panel-thread-nut.webp" target="_blank" rel="noreferrer" aria-label="放大 Q2001-PMV-SACN 穿板螺纹与锁紧螺母图">
      <img src="/images/products/fittings/quick-connect-fittings/q20/q2001-pmv-sacn-panel-thread-nut.webp" alt="Q2001-PMV-SACN 零件图局部：1/2-24UNS 穿板螺纹和 SUS304 锁紧螺母" width="1500" height="1500" loading="lazy">
    </a><figcaption>本型号的穿板螺纹与锁紧螺母；点击查看大图。</figcaption></figure>
  </div>
  <div class="fx-tw"><table>
    <thead><tr><th scope="col">核对项目</th><th scope="col">尺寸与选型说明</th></tr></thead>
    <tbody>
      <tr><th scope="row">当前公端可夹持板厚</th><td><strong>≤3.3 mm</strong>，适用于本页 Q2001-PMV-SACN；按面板实际厚度核对。</td></tr>
      <tr><th scope="row">配合端也需穿板时</th><td>Q20 穿板母端的最大板厚为 <strong>8.5 mm</strong>。这是母端安装限值，不能套用于本页公端。</td></tr>
      <tr><th scope="row">安装孔圆弧直径</th><td>Ø13 mm，上偏差 0、下偏差 −0.3 mm，即 <strong>12.7–13.0 mm</strong>。</td></tr>
      <tr><th scope="row">安装孔高度</th><td>12.1 mm，上偏差 0、下偏差 −0.1 mm，即 <strong>12.0–12.1 mm</strong>；从圆弧顶部量至平边。</td></tr>
      <tr><th scope="row">穿板螺纹</th><td><strong>1/2-24UNS</strong>，用于与锁紧螺母配合固定面板。</td></tr>
      <tr><th scope="row">六角螺母对边</th><td><strong>16 mm</strong>，用于核对工具与操作空间，不是安装孔直径。</td></tr>
    </tbody>
  </table></div>
  <h3>安装与布置顺序</h3>
  <ul>
    <li><strong>先开孔、核对板厚：</strong>按图保留 D 形孔的平边，开孔后清除毛刺；公端和母端的板厚限值分别核对。</li>
    <li><strong>再穿板固定：</strong>将接头与孔形对正，穿入面板后装上配套螺母，确认定位面与螺母夹持牢固。</li>
    <li><strong>最后核对操作空间：</strong>对接方向留出插入、拔出的行程，母端按键旁留出手指空间，面板背面留出螺母工具和软管弯曲空间。</li>
  </ul>
  <p class="fx-muted">3.3 mm 与 8.5 mm 表示可夹持的面板厚度，不是相邻安装孔的中心距，也不是两块面板之间的距离。多个接口并排布置时，应结合完整接头、配合端和操作空间确定孔距；加工前核对完整零件图。</p>
  <ul class="fx-links"><li><a href="/downloads/resources/selection-support/fitting-replacement/q20/drawings/Q2001-PMV-SACN.pdf" target="_blank" rel="noreferrer">查看 Q2001-PMV-SACN 完整 2D 图纸</a></li></ul>
</div>`;

const STYLE_HTML = String.raw`<style>
.fx-detail{--fx-navy:#173368;--fx-teal:#09e9b4;--fx-teal-2:#00cfa5;--fx-ink:#111111;--fx-muted:#667085;--fx-line:#dbe3ee;--fx-line-soft:rgba(23,51,104,.14);--fx-card-line:rgba(23,51,104,.16);--fx-bg:#f6f9fc;
  color:var(--fx-ink);font-size:16px;line-height:1.7;width:100%;box-sizing:border-box;margin-top:40px}
.fx-detail *{box-sizing:border-box}
.fx-detail img{max-width:100%}
.fx-detail .fx-sec{border-top:1px solid var(--fx-line-soft);padding-top:52px;margin-top:52px}
.fx-detail#fx-detail-selection > .fx-sec:first-of-type,.fx-detail#fx-detail-delivery > .fx-sec:first-of-type{border-top:0;margin-top:0;padding-top:0}
.fx-detail h2{font-size:26px;line-height:1.25;font-weight:600;color:var(--fx-ink);margin:0 0 22px}
.fx-detail h3{font-size:18px;line-height:1.4;font-weight:600;color:var(--fx-ink);margin:32px 0 12px}
.fx-detail p{margin:0 0 14px}
.fx-detail a{color:var(--fx-navy);text-decoration:none;font-weight:500}
.fx-detail a:hover{text-decoration:underline}
.fx-detail ul{margin:0 0 14px;padding-left:20px}
.fx-detail li{margin:6px 0}
.fx-detail li::marker{color:var(--fx-teal-2)}
.fx-detail strong{color:var(--fx-navy);font-weight:600}
.fx-detail .fx-muted{color:var(--fx-muted);font-size:14px}
.fx-detail .fx-links{list-style:none;padding:0;margin:8px 0 0;display:flex;flex-wrap:wrap;gap:8px 24px;font-size:14px}
.fx-detail .fx-links li{margin:0}
.fx-detail .fx-links a::after{content:" ›"}

/* 衔接标题 */
.fx-detail .fx-intro{border-top:1px solid var(--fx-line-soft);padding-top:52px}
.fx-detail .fx-intro h2{margin-bottom:10px}
.fx-detail .fx-intro p{color:var(--fx-muted);margin:0}
.fx-detail .fx-intro a{margin-left:6px;white-space:nowrap}
/* 页内导航 */
.fx-detail .fx-nav{display:flex;flex-wrap:wrap;gap:6px 22px;padding:14px 0;border-top:1px solid var(--fx-line);border-bottom:1px solid var(--fx-line);font-size:14px}
.fx-detail .fx-nav a{color:var(--fx-ink);font-weight:400}
.fx-detail .fx-nav a:hover{color:var(--fx-teal-2);text-decoration:none}

/* 表格：和规格表一致，无外框，只有行线 */
.fx-detail .fx-tw{overflow-x:auto;margin:0 0 16px}
.fx-detail table{width:100%;border-collapse:collapse;font-size:15px}
.fx-detail th,.fx-detail td{padding:12px 16px;text-align:left;vertical-align:middle;border-bottom:1px solid var(--fx-line);font-weight:400}
.fx-detail thead th{background:var(--fx-bg);color:var(--fx-navy);font-weight:600;font-size:14px;white-space:nowrap;border-bottom:1px solid var(--fx-card-line)}
.fx-detail table.fx-kv{border-top:1px solid var(--fx-line)}
.fx-detail table.fx-kv th{width:30%;color:var(--fx-muted);font-size:14px}
.fx-detail table.fx-wide{min-width:640px}
.fx-detail .fx-hl td{background:#eef6fb}

/* 卡片 */
.fx-detail .fx-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.fx-detail .fx-card{border:1px solid var(--fx-card-line);background:#fff;padding:20px}
.fx-detail .fx-card h3{margin:0 0 8px;font-size:17px;font-weight:700;color:var(--fx-navy)}
.fx-detail .fx-card p{margin:0;font-size:14px;line-height:1.65;color:var(--fx-muted)}

/* 图片 */
.fx-detail figcaption{padding:10px 14px;border-top:1px solid var(--fx-line);font-size:14px;color:var(--fx-muted)}
.fx-detail .fx-curve{margin:0 0 14px;max-width:520px;border:1px solid var(--fx-card-line);background:#fff}
.fx-detail .fx-curve img{display:block;width:100%;height:auto;margin:0;padding:16px;box-sizing:border-box}

/* 型号拆解 */
.fx-detail .fx-pn{display:flex;flex-wrap:wrap;align-items:flex-start;gap:8px;margin:4px 0 22px}
.fx-detail .fx-seg{display:flex;flex-direction:column;align-items:center;min-width:48px}
.fx-detail .fx-seg b{display:block;padding:7px 13px;border:1px solid var(--fx-navy);color:var(--fx-navy);font-size:20px;font-weight:600;line-height:1.1;background:#fff}
.fx-detail .fx-seg small{margin-top:6px;font-size:12px;color:var(--fx-muted)}
.fx-detail .fx-dash{font-size:20px;color:var(--fx-muted);padding-top:7px}

/* 提示框 */
.fx-detail .fx-callout{border-left:3px solid var(--fx-teal);background:var(--fx-bg);padding:16px 20px;margin:0 0 16px}
.fx-detail .fx-callout p{margin:0}

.fx-detail .fx-path-no{display:block;font-size:28px;font-weight:650;line-height:1;color:rgba(23,51,104,.34);margin-bottom:8px}

/* 实物、包装与售后 */
.fx-detail .fx-steps{list-style:none;padding:0;margin:0 0 8px;display:flex;flex-wrap:wrap;gap:8px 0}
.fx-detail .fx-steps li{margin:0;display:flex;align-items:center;font-size:15px;font-weight:600;color:var(--fx-navy)}
.fx-detail .fx-steps li span{font-size:13px;font-weight:650;color:rgba(23,51,104,.34);margin-right:6px}
.fx-detail .fx-steps li:not(:last-child)::after{content:"";width:28px;height:1px;background:var(--fx-teal-2);margin:0 14px}
.fx-detail .fx-row{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:40px;padding:32px 0;border-top:1px solid var(--fx-line-soft);margin-top:24px}
.fx-detail .fx-row-single{grid-template-columns:minmax(0,1fr)}
.fx-detail .fx-row-single>div{max-width:860px}
.fx-detail .fx-row + .fx-row{margin-top:0}
.fx-detail .fx-row h3{margin:0 0 10px;font-size:20px;color:var(--fx-navy)}
.fx-detail .fx-row h3 .fx-path-no{display:inline;font-size:20px;margin:0 10px 0 0}
.fx-detail .fx-row p{margin:0 0 10px}
.fx-detail .fx-row ul{margin:0;padding-left:18px;font-size:15px}
.fx-detail .fx-row li{margin:4px 0}
.fx-detail .fx-pics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-content:start}
.fx-detail .fx-pics figure{margin:0}
.fx-detail .fx-pics img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;background:#fff;border:1px solid var(--fx-line)}
.fx-detail .fx-pics img.fx-delivery-photo{object-fit:contain}
.fx-detail .fx-pics figcaption{border:0;padding:6px 0 0;font-size:13px}
/* Original diagrams on white: trim only the square assets' blank margins. */
.fx-detail .fx-panel-figures{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px;max-width:920px;margin:0 0 24px}
.fx-detail .fx-panel-figures figure{margin:0;min-width:0}
.fx-detail .fx-panel-figures a{display:block;aspect-ratio:1.4;overflow:hidden;background:#fff}
.fx-detail .fx-panel-figures img{display:block;width:100%;height:100%;object-fit:cover}
.fx-detail .fx-panel-figures figcaption{border:0;padding:8px 0 0;font-size:14px;color:var(--fx-muted)}
.fx-detail #fx-panel-install tbody th{width:26%;font-weight:400;vertical-align:top}
/* 待拍实物图占位：拍好后整块换成 <img> */
.fx-detail .fx-shot{display:flex;flex-direction:column;align-items:center;justify-content:center;aspect-ratio:4/3;border:1px dashed rgba(23,51,104,.35);background:var(--fx-bg);color:var(--fx-muted);font-size:13px;text-align:center;padding:12px;box-sizing:border-box}
.fx-detail .fx-shot b{color:var(--fx-navy);font-size:14px;font-weight:600}
/* 待确认文字：确认后改成真实内容，并删掉 <mark class="fx-todo"> 标签 */
.fx-detail mark.fx-todo{background:#fff1c2;color:#7a5200;padding:0 4px}
.fx-detail .fx-contact{border:1px solid var(--fx-card-line);border-left:3px solid var(--fx-teal);background:var(--fx-bg);padding:20px 22px;align-self:start}
.fx-detail .fx-contact b{display:block;font-size:17px;color:var(--fx-navy);margin-bottom:10px}
.fx-detail .fx-contact dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:6px 16px;font-size:15px}
.fx-detail .fx-contact dt{color:var(--fx-muted)}
.fx-detail .fx-contact dd{margin:0}
.fx-detail .fx-contact p{margin:12px 0 0;font-size:14px;color:var(--fx-muted)}

@media (max-width:1024px){
  .fx-detail .fx-grid{grid-template-columns:repeat(2,1fr)}
  .fx-detail .fx-row{grid-template-columns:1fr;gap:20px}
}
@media (max-width:640px){
  .fx-detail .fx-sec{padding-top:36px;margin-top:36px}
  .fx-detail h2{font-size:22px}
  .fx-detail .fx-grid{grid-template-columns:1fr}
  .fx-detail .fx-seg b{font-size:17px;padding:6px 9px}
  .fx-detail table.fx-kv th{width:38%}
  .fx-detail .fx-steps li:not(:last-child)::after{width:14px;margin:0 8px}
  .fx-detail .fx-pics{gap:8px}
  .fx-detail .fx-panel-figures{grid-template-columns:1fr;gap:18px;max-width:440px}
  .fx-detail #fx-panel-install tbody th{width:32%}
  .fx-detail th,.fx-detail td{padding:10px 12px}
}
/* 列表显示圆点（全站基础样式默认去掉了列表符号） */
.fx-detail ul{list-style:disc}
</style>`;
const SECTION_HTML: Record<Exclude<QuickConnectQ20ZhSection, "delivery">, string> = {
  all: String.raw`<!-- 衔接：从「规格」表过渡到系列内容；不再重复上方的产品简介和「常见应用」 -->
<div class="fx-intro">
  <h2>Q20 系列选型说明</h2>
  <p>以下内容适用于全部 Q20 快插接头（1/8" 通径，接管内径 1.6 / 3.2 / 4.8 / 6.4&nbsp;mm），可对照上方规格选择配对型号。<a href="/products/fittings/quick-connect-fittings/">查看全部快插接头型号 ›</a></p>
</div>

<!-- 1 特性与优势 -->
<div class="fx-sec" id="fx-features">
  <h2>特性与优势</h2>
  <div class="fx-grid">
    <div class="fx-card"><h3>咔嗒锁定，单手插拔</h3><p>插入到位时有清晰声响，按键即可解锁。操作人员不用工具，也能确认连接已经到位。</p></div>
    <div class="fx-card"><h3>断开自动关闭流路</h3><p>带阀型号拔下后流路自动封闭，减少更换试剂瓶或拆卸模块时的滴漏。</p></div>
    <div class="fx-card"><h3>可穿板安装</h3><p>穿板型号用配套锁紧螺母固定在设备外壳或面板上，作为设备对外的液路接口。</p></div>
    <div class="fx-card"><h3>同系列互配，两端管径可不同</h3><p>Q20 公端和母端可以任意配对，两端可以各自连接不同内径的管路。</p></div>
    <div class="fx-card"><h3>8.3 bar 工作压力</h3><p>POM 和 PP 两种外壳的标准配置，工作压力均为 8.3 bar。</p></div>
    <div class="fx-card"><h3>整机可统一用一个系列</h3><p>公端 / 母端、带阀 / 不带阀、穿板 / 非穿板、POM / PP 外壳可自由组合，便于整机统一接口。</p></div>
  </div>
</div>

<!-- 2 系列参数（规格表里没有的系列级参数） -->
<div class="fx-sec" id="fx-conditions">
  <h2>Q20 系列参数</h2>
  <div class="fx-tw">
    <table class="fx-kv">
      <tbody>
        <tr><th scope="row">工作压力</th><td>8.3 bar（约 120 psi）</td></tr>
        <tr><th scope="row">工作温度</th><td>POM 外壳 + NBR 密封圈：−40～82&nbsp;℃<br>PP 外壳 + EPDM 密封圈：−20～71&nbsp;℃</td></tr>
        <tr><th scope="row">通径</th><td>1/8"</td></tr>
        <tr><th scope="row">接管内径</th><td>1.6 / 3.2 / 4.8 / 6.4&nbsp;mm</td></tr>
        <tr><th scope="row">插拔方式</th><td>插入锁定，按键解锁</td></tr>
      </tbody>
    </table>
  </div>
  <p class="fx-muted">以上为标准配置下的参考值，实际可用压力和温度取决于流体、密封材料和使用工况。带阀不代表接头适合带压插拔，详见 <a href="/resources/technical-articles/quick-disconnect-coupling-pressure-rating/">快插接头能承受多大压力</a>。</p>
</div>

<!-- 3 型号说明（和上方「型号选择」呼应） -->
<div class="fx-sec" id="fx-pn">
  <h2>型号说明</h2>
  <p>Q20 型号由以下几段组成，以 Q2001-PMV-SACN 为例。在上方「搭配选型」中可以切换母端并整理公母端配对。</p>
  <div class="fx-pn" aria-label="Q20 型号编码拆解">
    <span class="fx-seg"><b>Q20</b><small>系列</small></span>
    <span class="fx-seg"><b>01</b><small>接管内径</small></span>
    <span class="fx-dash">-</span>
    <span class="fx-seg"><b>P</b><small>公母端</small></span>
    <span class="fx-seg"><b>M</b><small>安装方式</small></span>
    <span class="fx-seg"><b>V</b><small>阀门配置</small></span>
    <span class="fx-dash">-</span>
    <span class="fx-seg"><b>SACN</b><small>材质组合</small></span>
  </div>
  <div class="fx-tw">
    <table class="fx-wide">
      <thead><tr><th scope="col">代码段</th><th scope="col">代码</th></tr></thead>
      <tbody>
        <tr><td>系列</td><td>Q20 = 1/8" 通径</td></tr>
        <tr><td>接管内径</td><td>01 = 1.6 mm　02 = 3.2 mm　03 = 4.8 mm　04 = 6.4 mm</td></tr>
        <tr><td>公母端</td><td>P = 公端　S = 母端</td></tr>
        <tr><td>安装方式</td><td>M = 穿板　N = 非穿板</td></tr>
        <tr><td>阀门配置</td><td>V = 带阀　X = 不带阀</td></tr>
        <tr><td>材质组合</td><td>SACN = POM 外壳 + NBR 密封圈　SPPE = PP 外壳 + EPDM 密封圈</td></tr>
      </tbody>
    </table>
  </div>
  <p class="fx-muted">替换其他品牌的快插接头，可参考 <a href="/resources/selection-support/fitting-replacement/">接头替换选型</a>。</p>
</div>

<!-- 4 配对选型 -->
<div class="fx-sec" id="fx-mating">
  <h2>配对选型</h2>
  <p>快插接头需要一个公端（P）和一个母端（S）成对使用，Q20 系列内可以任意配对。断开后哪一侧关闭，取决于两端是否带阀：</p>
  <div class="fx-tw">
    <table class="fx-wide">
      <thead><tr><th scope="col">公端</th><th scope="col">母端</th><th scope="col">断开后</th><th scope="col">适合</th></tr></thead>
      <tbody>
        <tr><td>带阀（V）</td><td>带阀（V）</td><td><strong>两端都关闭</strong></td><td>拆下试剂瓶、废液桶或模块后，两侧都要封闭</td></tr>
        <tr><td>带阀（V）</td><td>不带阀（X）</td><td>仅公端一侧关闭</td><td>只需要公端所在一侧封闭</td></tr>
        <tr><td>不带阀（X）</td><td>带阀（V）</td><td>仅母端一侧关闭</td><td>只需要母端所在一侧封闭</td></tr>
        <tr><td>不带阀（X）</td><td>不带阀（X）</td><td>两端都敞开</td><td>断开后流路可以敞开</td></tr>
      </tbody>
    </table>
  </div>
  <ul>
    <li><strong>两端管径可以不同</strong>：例如接管内径 1.6 mm 的公端可以配 3.2 mm 的母端，只要同为 Q20 系列。</li>
    <li><strong>安装方式按位置选</strong>：固定在设备面板上的一端选穿板（M），接在外部管路上的一端选非穿板（N）。</li>
    <li><strong>两端材质不同时</strong>（如 POM/NBR 配 PP/EPDM），按温度范围较窄、耐化学性较弱的一侧来评估。</li>
  </ul>
</div>

<!-- 5 流量与压降（官网实测曲线，中文站用中文版曲线图） -->
<div class="fx-sec" id="fx-flow">
  <h2>流量与压降</h2>
  <p>快插接头会给流路带来一定压降，流量越大压降越大。选型时，按流路需要的流量对照下方曲线，读出接头带来的压降。</p>
  <figure class="fx-curve">
    <img src="/images/resources/technical-articles/instrument-fluidics/q20-catalog-flow-curves.webp" alt="Q20 快插接头流量—压降曲线" width="835" height="1205" loading="lazy">
    <figcaption>Q20 流量—压降曲线。上图为气体 Nm³/min，下图为液体 L/min；纵轴均为压降 bar。</figcaption>
  </figure>
  <p class="fx-muted">曲线读数、Kv/Cv 估算方法和计算示例见 <a href="/resources/technical-articles/quick-disconnect-coupling-flow-pressure-drop/">快插接头流量怎么算</a>；整条流路的阻力可用 <a href="/resources/calculators/fluid-resistance/">流阻计算器</a> 估算。</p>
</div>

<!-- 6 材质与耐化学性 -->
<div class="fx-sec" id="fx-materials">
  <h2>材质与耐化学性</h2>
  <div class="fx-tw">
    <table class="fx-wide">
      <thead><tr><th scope="col">材质组合</th><th scope="col">外壳材质</th><th scope="col">密封圈材质</th><th scope="col">工作温度</th></tr></thead>
      <tbody>
        <tr><td>SACN</td><td>POM</td><td>NBR</td><td>−40～82 ℃</td></tr>
        <tr><td>SPPE</td><td>PP</td><td>EPDM</td><td>−20～71 ℃</td></tr>
      </tbody>
    </table>
  </div>
  <p>部分型号可选 FKM 密封圈。材质是否适用，取决于流体成分、温度、压力、清洗要求和密封材料；不确定时，可在选型清单中备注工况，由工程师评估。</p>
  <ul class="fx-links">
    <li><a href="/resources/material-compatibility/">材料兼容性</a></li>
    <li><a href="/resources/technical-articles/fitting-material-selection-guide/">接头材质怎么选</a></li>
  </ul>
</div>

<!-- 7 如何选择 -->
<div class="fx-sec" id="fx-choose">
  <h2>如何选择</h2>
  <h3 style="margin-top:0">Q20 系列内的选项</h3>
  <div class="fx-tw">
    <table>
      <thead><tr><th scope="col">选项</th><th scope="col">什么时候选</th></tr></thead>
      <tbody>
        <tr><td><strong>带阀</strong></td><td>断开后流路需要封闭，例如试剂、废液、清洗液管路</td></tr>
        <tr><td><strong>不带阀</strong></td><td>断开后流路可以敞开</td></tr>
        <tr><td><strong>穿板</strong></td><td>接头固定在设备外壳、面板或支架上，作为对外接口</td></tr>
        <tr><td><strong>非穿板</strong></td><td>接头接在管路中间，随管路移动</td></tr>
        <tr><td><strong>POM 外壳 + NBR 密封圈</strong></td><td>工作温度 −40～82&nbsp;℃</td></tr>
        <tr><td><strong>PP 外壳 + EPDM 密封圈</strong></td><td>工作温度 −20～71&nbsp;℃</td></tr>
      </tbody>
    </table>
  </div>
  <h3>Q20、Q40、Q60 系列对比</h3>
  <div class="fx-tw">
    <table class="fx-wide">
      <thead><tr><th scope="col">系列</th><th scope="col">通径</th><th scope="col">接管内径</th><th scope="col">外壳材质</th><th scope="col">工作压力</th></tr></thead>
      <tbody>
        <tr class="fx-hl"><td><strong>Q20</strong>（本系列）</td><td>1/8"</td><td>1.6–6.4&nbsp;mm</td><td>POM / PP</td><td>8.3 bar</td></tr>
        <tr><td><strong>Q40</strong></td><td>1/4"</td><td>6.4–9.5&nbsp;mm</td><td>POM / PP</td><td>8.3 bar</td></tr>
        <tr><td><strong>Q60</strong></td><td>3/8"</td><td>9.5–19.0&nbsp;mm</td><td>PP</td><td>4.2 bar</td></tr>
      </tbody>
    </table>
  </div>
  <p class="fx-muted">更完整的选型思路见 <a href="/resources/technical-articles/what-is-a-quick-disconnect-fitting/">什么是快插接头</a>。</p>
</div>

${PANEL_INSTALLATION_HTML}

<!-- 8 安装与使用注意事项 -->
<div class="fx-sec" id="fx-install">
  <h2>安装与使用注意事项</h2>
  <div class="fx-callout"><p><strong>不要带压插拔。</strong>带阀的作用是断开后封闭流路，不代表接头适合在带压状态下插拔。断开前请先泄压。</p></div>
  <ul>
    <li>本型号的安装孔和板厚限值见上方「穿板安装：开孔与板厚」；固定后检查螺母夹持及接头定位。</li>
    <li>安装位置要留出按键操作、插入拔出和管路弯曲的空间。</li>
    <li>断开时可能有少量残液流出，重新插合时可能带入少量空气；对此敏感的流路，请在实际工况下评估。</li>
    <li>插合后确认听到"咔嗒"声，再通液。</li>
  </ul>
  <ul class="fx-links"><li><a href="/resources/installation-guide/">安装指南</a></li></ul>
</div>

<!-- 9 实物、包装与售后
     01 接头细节：每个系列换一次（Q40、Q60 换成对应系列的实拍）
     02–05 内包装 / 外包装 / 快递 / 售后：所有接头共用，不用改
     黄色底 = 待确认的文字；虚线框 = 待拍的实物图。上线前全部替换。 -->
<div class="fx-sec" id="fx-delivery">
  <h2>实物、包装与售后</h2>
  <p>Q20 接头出厂时的实物细节，以及从包装、发货到售后的全过程，图片均为实拍。恒永达已通过 ISO 9001 和 ISO 13485 质量管理体系认证，详见 <a href="/about/quality/">质量体系与资质</a>。</p>
  <ol class="fx-steps">
    <li><span>01</span>接头细节</li>
    <li><span>02</span>内包装</li>
    <li><span>03</span>外包装</li>
    <li><span>04</span>发货与签收</li>
    <li><span>05</span>售后服务</li>
  </ol>

  <div class="fx-row">
    <div>
      <h3><span class="fx-path-no">01</span>接头细节</h3>
      <p>出厂前按项目质量约定检验，重点看这些部位：</p>
      <ul>
        <li>外观：无毛刺、无损伤，倒刺轮廓完整</li>
        <li>尺寸：关键尺寸和流道用影像测量仪、视觉测量设备检测</li>
        <li>功能与密封：插入锁定、按键解锁，带阀型号断开后封闭</li>
      </ul>
    </div>
    <div class="fx-pics">
      <figure><img src="/images/resources/technical-articles/instrument-fluidics/q20-series-white.webp" alt="Q20 快插接头公端与母端" width="1500" height="1500" loading="lazy" style="object-fit:contain"><figcaption>Q20 公端与母端</figcaption></figure>
      <figure><!-- 拍好后替换为：<img src="/images/products/fittings/quick-connect-fittings/q20/q20-detail-seal.webp" alt="插口端面与密封圈" width="1200" height="900" loading="lazy"> -->
        <div class="fx-shot"><b>插口端面与密封圈</b>微距，正对插口，看清密封圈</div><figcaption>插口端面与密封圈</figcaption></figure>
      <figure><!-- 拍好后替换为：<img src="/images/products/fittings/quick-connect-fittings/q20/q20-detail-barb.webp" alt="按键与接管端倒刺" width="1200" height="900" loading="lazy"> -->
        <div class="fx-shot"><b>按键与接管端倒刺</b>侧面 45°，按键和倒刺同框</div><figcaption>按键与接管端倒刺</figcaption></figure>
      <figure><!-- 拍好后替换为：<img src="/images/products/fittings/quick-connect-fittings/q20/q20-detail-panel.webp" alt="穿板螺纹与锁紧螺母" width="1200" height="900" loading="lazy"> -->
        <div class="fx-shot"><b>穿板螺纹与锁紧螺母</b>穿板型号，螺母拧在螺纹上</div><figcaption>穿板螺纹与锁紧螺母</figcaption></figure>
    </div>
  </div>

  <div class="fx-row">
    <div>
      <h3><span class="fx-path-no">02</span>内包装</h3>
      <p>按型号分袋包装，不同型号不混装。</p>
      <p class="fx-muted">以下为接头产品包装与发货方式实拍示例，标签中的型号、数量和批次以及随货资料以实际订单为准。</p>
      <ul>
        <li>批次号对应生产和检验记录，反馈问题时提供批次号即可追溯</li>
      </ul>
    </div>
    <div class="fx-pics">
      <figure><img class="fx-delivery-photo" src="/images/products/fittings/quick-connect-fittings/q2001-pmv-sacn/delivery/bagged-fittings.webp" alt="恒永达接头分袋包装示例，透明袋内可见接头实物" width="1000" height="750" loading="lazy" decoding="async"><figcaption>分袋包装</figcaption></figure>
      <figure><img class="fx-delivery-photo" src="/images/products/fittings/quick-connect-fittings/q2001-pmv-sacn/delivery/packaging-label.webp" alt="恒永达包装标签示例，显示型号 BT-24D-PP-N、数量及条码编号" width="1000" height="750" loading="lazy" decoding="async"><figcaption>标签特写</figcaption></figure>
    </div>
  </div>

  <div class="fx-row">
    <div>
      <h3><span class="fx-path-no">03</span>外包装</h3>
      <p>内袋固定后封箱，运输中不挤压接头。</p>
      <ul>
        <li>随货附送货单；合格证、检验报告等资料按项目质量约定提供</li>
      </ul>
    </div>
    <div class="fx-pics">
      <figure><img class="fx-delivery-photo" src="/images/products/fittings/quick-connect-fittings/q2001-pmv-sacn/delivery/open-carton.webp" alt="纸箱开箱状态，缓冲材料围护内袋并保持排列" width="1000" height="750" loading="lazy" decoding="async"><figcaption>开箱状态</figcaption></figure>
      <figure><img class="fx-delivery-photo" src="/images/products/fittings/quick-connect-fittings/q2001-pmv-sacn/delivery/inspection-report.webp" alt="纸箱内随附的出厂检验报告与袋装接头示例" width="1000" height="750" loading="lazy" decoding="async"><figcaption>随货资料（检验报告示例）</figcaption></figure>
    </div>
  </div>

  <div class="fx-row">
    <div>
      <h3><span class="fx-path-no">04</span>发货与签收</h3>
      <p>国内订单报价已含运费，默认顺丰发货，送到中国境内的指定地址。</p>
      <ul>
        <li>下单时请提供准确的收货地址和收货人；发货后通知您指定的联系人，如未按时收到货物请及时联系我们</li>
        <li>收货当天请核对货物名称、数量和包装，在送货单上签字并回传</li>
        <li>订单量较大时可能分批发货，每批可单独开具发票</li>
        <li>发货信息记入交付记录，和批次一起可追溯</li>
      </ul>
    </div>
    <div class="fx-pics">
      <figure><img class="fx-delivery-photo" src="/images/products/fittings/quick-connect-fittings/q2001-pmv-sacn/delivery/carton-sealing.webp" alt="工作人员在打包台使用胶带封箱" width="1000" height="750" loading="lazy" decoding="async"><figcaption>封箱打包</figcaption></figure>
      <figure><img class="fx-delivery-photo" src="/images/products/fittings/quick-connect-fittings/q2001-pmv-sacn/delivery/sealed-carton-labels.webp" alt="已封好的恒永达纸箱及箱外物料标识卡" width="1000" height="750" loading="lazy" decoding="async"><figcaption>封箱待发与箱外标签</figcaption></figure>
    </div>
  </div>

  <div class="fx-row fx-row-single">
    <div>
      <h3><span class="fx-path-no">05</span>售后服务</h3>
      <p>提供安装使用、维护建议、问题反馈和质量处理支持。</p>
      <ul>
        <li>保修期：接头产品 12 个月，自产品首次销售之日起计算</li>
        <li>到货验收：请在约定时间内核对外形、尺寸和规格；如有不合格，在约定时间内书面通知我们，经确认是我方原因的，可以退货或换货</li>
        <li>不在保修范围：误用、改装或拆改，未按恒永达规格和使用指引安装使用，以及正常磨损</li>
        <li>退货需先联系我们获得许可，退回的产品请冲洗干净，去除化学品等残留；定制品和非标产品不退换</li>
        <li>反馈问题时请提供：完整型号、批次号、端口照片，介质、压力和温度，以及故障发生在正压、负压、启停还是温升后</li>
        <li>质量问题进入不合格品控制、纠正措施、复检确认和改进流程，闭环处理</li>
      </ul>
    </div>
  </div>
</div>

<div class="fx-sec" style="padding-top:20px;margin-top:40px">
  <ul class="fx-muted" style="margin:0;font-size:13px">
    <li>本页参数为标准配置下的参考值，实际表现取决于流体、温度、压力和使用工况，请在实际设备中验证。</li>
    <li>规格如有变更，以最新图纸和规格书为准。</li>
  </ul>
</div>`,
  product: String.raw`<div class="fx-sec" id="fx-product-detail">
  <h2>产品实物与接口</h2>
  <p>Q20 接头的实物外观、接口结构和出厂检验重点，帮助客户在收到样品或批量产品后快速核对。</p>
  <div class="fx-row">
    <div>
      <h3>接头细节</h3>
      <p>出厂前按项目质量约定检验，重点看这些部位：</p>
      <ul>
        <li>外观：无毛刺、无损伤，倒刺轮廓完整</li>
        <li>尺寸：关键尺寸和流道用影像测量仪、视觉测量设备检测</li>
        <li>功能与密封：插入锁定、按键解锁，带阀型号断开后封闭</li>
      </ul>
    </div>
    <div class="fx-pics">
      <figure><img src="/images/resources/technical-articles/instrument-fluidics/q20-series-white.webp" alt="Q20 快插接头公端与母端" width="1500" height="1500" loading="lazy" style="object-fit:contain"><figcaption>Q20 公端与母端</figcaption></figure>
      <figure><!-- 拍好后替换为：<img src="/images/products/fittings/quick-connect-fittings/q20/q20-detail-seal.webp" alt="插口端面与密封圈" width="1200" height="900" loading="lazy"> -->
        <div class="fx-shot"><b>插口端面与密封圈</b>微距，正对插口，看清密封圈</div><figcaption>插口端面与密封圈</figcaption></figure>
      <figure><!-- 拍好后替换为：<img src="/images/products/fittings/quick-connect-fittings/q20/q20-detail-barb.webp" alt="按键与接管端倒刺" width="1200" height="900" loading="lazy"> -->
        <div class="fx-shot"><b>按键与接管端倒刺</b>侧面 45°，按键和倒刺同框</div><figcaption>按键与接管端倒刺</figcaption></figure>
      <figure><!-- 拍好后替换为：<img src="/images/products/fittings/quick-connect-fittings/q20/q20-detail-panel.webp" alt="穿板螺纹与锁紧螺母" width="1200" height="900" loading="lazy"> -->
        <div class="fx-shot"><b>穿板螺纹与锁紧螺母</b>穿板型号，螺母拧在螺纹上</div><figcaption>穿板螺纹与锁紧螺母</figcaption></figure>
    </div>
  </div>
</div>`,
  selection: String.raw`<!-- 1 特性与优势 -->
<div class="fx-sec" id="fx-features">
  <h2>特性与优势</h2>
  <div class="fx-grid">
    <div class="fx-card"><h3>咔嗒锁定，单手插拔</h3><p>插入到位时有清晰声响，按键即可解锁。操作人员不用工具，也能确认连接已经到位。</p></div>
    <div class="fx-card"><h3>断开自动关闭流路</h3><p>带阀型号拔下后流路自动封闭，减少更换试剂瓶或拆卸模块时的滴漏。</p></div>
    <div class="fx-card"><h3>可穿板安装</h3><p>穿板型号用配套锁紧螺母固定在设备外壳或面板上，作为设备对外的液路接口。</p></div>
    <div class="fx-card"><h3>同系列互配，两端管径可不同</h3><p>Q20 公端和母端可以任意配对，两端可以各自连接不同内径的管路。</p></div>
    <div class="fx-card"><h3>8.3 bar 工作压力</h3><p>POM 和 PP 两种外壳的标准配置，工作压力均为 8.3 bar。</p></div>
    <div class="fx-card"><h3>整机可统一用一个系列</h3><p>公端 / 母端、带阀 / 不带阀、穿板 / 非穿板、POM / PP 外壳可自由组合，便于整机统一接口。</p></div>
  </div>
</div>

<!-- 2 系列参数（规格表里没有的系列级参数） -->
<div class="fx-sec" id="fx-conditions">
  <h2>Q20 系列参数</h2>
  <div class="fx-tw">
    <table class="fx-kv">
      <tbody>
        <tr><th scope="row">工作压力</th><td>8.3 bar（约 120 psi）</td></tr>
        <tr><th scope="row">工作温度</th><td>POM 外壳 + NBR 密封圈：−40～82&nbsp;℃<br>PP 外壳 + EPDM 密封圈：−20～71&nbsp;℃</td></tr>
        <tr><th scope="row">通径</th><td>1/8"</td></tr>
        <tr><th scope="row">接管内径</th><td>1.6 / 3.2 / 4.8 / 6.4&nbsp;mm</td></tr>
        <tr><th scope="row">插拔方式</th><td>插入锁定，按键解锁</td></tr>
      </tbody>
    </table>
  </div>
  <p class="fx-muted">以上为标准配置下的参考值，实际可用压力和温度取决于流体、密封材料和使用工况。带阀不代表接头适合带压插拔，详见 <a href="/resources/technical-articles/quick-disconnect-coupling-pressure-rating/">快插接头能承受多大压力</a>。</p>
</div>

<!-- 3 型号说明（和上方「型号选择」呼应） -->
<div class="fx-sec" id="fx-pn">
  <h2>型号说明</h2>
  <p>Q20 型号由以下几段组成，以 Q2001-PMV-SACN 为例。在上方「搭配选型」中可以切换母端并整理公母端配对。</p>
  <div class="fx-pn" aria-label="Q20 型号编码拆解">
    <span class="fx-seg"><b>Q20</b><small>系列</small></span>
    <span class="fx-seg"><b>01</b><small>接管内径</small></span>
    <span class="fx-dash">-</span>
    <span class="fx-seg"><b>P</b><small>公母端</small></span>
    <span class="fx-seg"><b>M</b><small>安装方式</small></span>
    <span class="fx-seg"><b>V</b><small>阀门配置</small></span>
    <span class="fx-dash">-</span>
    <span class="fx-seg"><b>SACN</b><small>材质组合</small></span>
  </div>
  <div class="fx-tw">
    <table class="fx-wide">
      <thead><tr><th scope="col">代码段</th><th scope="col">代码</th></tr></thead>
      <tbody>
        <tr><td>系列</td><td>Q20 = 1/8" 通径</td></tr>
        <tr><td>接管内径</td><td>01 = 1.6 mm　02 = 3.2 mm　03 = 4.8 mm　04 = 6.4 mm</td></tr>
        <tr><td>公母端</td><td>P = 公端　S = 母端</td></tr>
        <tr><td>安装方式</td><td>M = 穿板　N = 非穿板</td></tr>
        <tr><td>阀门配置</td><td>V = 带阀　X = 不带阀</td></tr>
        <tr><td>材质组合</td><td>SACN = POM 外壳 + NBR 密封圈　SPPE = PP 外壳 + EPDM 密封圈</td></tr>
      </tbody>
    </table>
  </div>
  <p class="fx-muted">替换其他品牌的快插接头，可参考 <a href="/resources/selection-support/fitting-replacement/">接头替换选型</a>。</p>
</div>

<!-- 4 配对选型 -->
<div class="fx-sec" id="fx-mating">
  <h2>配对选型</h2>
  <p>快插接头需要一个公端（P）和一个母端（S）成对使用，Q20 系列内可以任意配对。断开后哪一侧关闭，取决于两端是否带阀：</p>
  <div class="fx-tw">
    <table class="fx-wide">
      <thead><tr><th scope="col">公端</th><th scope="col">母端</th><th scope="col">断开后</th><th scope="col">适合</th></tr></thead>
      <tbody>
        <tr><td>带阀（V）</td><td>带阀（V）</td><td><strong>两端都关闭</strong></td><td>拆下试剂瓶、废液桶或模块后，两侧都要封闭</td></tr>
        <tr><td>带阀（V）</td><td>不带阀（X）</td><td>仅公端一侧关闭</td><td>只需要公端所在一侧封闭</td></tr>
        <tr><td>不带阀（X）</td><td>带阀（V）</td><td>仅母端一侧关闭</td><td>只需要母端所在一侧封闭</td></tr>
        <tr><td>不带阀（X）</td><td>不带阀（X）</td><td>两端都敞开</td><td>断开后流路可以敞开</td></tr>
      </tbody>
    </table>
  </div>
  <ul>
    <li><strong>两端管径可以不同</strong>：例如接管内径 1.6 mm 的公端可以配 3.2 mm 的母端，只要同为 Q20 系列。</li>
    <li><strong>安装方式按位置选</strong>：固定在设备面板上的一端选穿板（M），接在外部管路上的一端选非穿板（N）。</li>
    <li><strong>两端材质不同时</strong>（如 POM/NBR 配 PP/EPDM），按温度范围较窄、耐化学性较弱的一侧来评估。</li>
  </ul>
</div>

<!-- 5 流量与压降（官网实测曲线，中文站用中文版曲线图） -->
<div class="fx-sec" id="fx-flow">
  <h2>流量与压降</h2>
  <p>快插接头会给流路带来一定压降，流量越大压降越大。选型时，按流路需要的流量对照下方曲线，读出接头带来的压降。</p>
  <figure class="fx-curve">
    <img src="/images/resources/technical-articles/instrument-fluidics/q20-catalog-flow-curves.webp" alt="Q20 快插接头流量—压降曲线" width="835" height="1205" loading="lazy">
    <figcaption>Q20 流量—压降曲线。上图为气体 Nm³/min，下图为液体 L/min；纵轴均为压降 bar。</figcaption>
  </figure>
  <p class="fx-muted">曲线读数、Kv/Cv 估算方法和计算示例见 <a href="/resources/technical-articles/quick-disconnect-coupling-flow-pressure-drop/">快插接头流量怎么算</a>；整条流路的阻力可用 <a href="/resources/calculators/fluid-resistance/">流阻计算器</a> 估算。</p>
</div>

<!-- 6 材质与耐化学性 -->
<div class="fx-sec" id="fx-materials">
  <h2>材质与耐化学性</h2>
  <div class="fx-tw">
    <table class="fx-wide">
      <thead><tr><th scope="col">材质组合</th><th scope="col">外壳材质</th><th scope="col">密封圈材质</th><th scope="col">工作温度</th></tr></thead>
      <tbody>
        <tr><td>SACN</td><td>POM</td><td>NBR</td><td>−40～82 ℃</td></tr>
        <tr><td>SPPE</td><td>PP</td><td>EPDM</td><td>−20～71 ℃</td></tr>
      </tbody>
    </table>
  </div>
  <p>部分型号可选 FKM 密封圈。材质是否适用，取决于流体成分、温度、压力、清洗要求和密封材料；不确定时，可在选型清单中备注工况，由工程师评估。</p>
  <ul class="fx-links">
    <li><a href="/resources/material-compatibility/">材料兼容性</a></li>
    <li><a href="/resources/technical-articles/fitting-material-selection-guide/">接头材质怎么选</a></li>
  </ul>
</div>

<!-- 7 如何选择 -->
<div class="fx-sec" id="fx-choose">
  <h2>如何选择</h2>
  <h3 style="margin-top:0">Q20 系列内的选项</h3>
  <div class="fx-tw">
    <table>
      <thead><tr><th scope="col">选项</th><th scope="col">什么时候选</th></tr></thead>
      <tbody>
        <tr><td><strong>带阀</strong></td><td>断开后流路需要封闭，例如试剂、废液、清洗液管路</td></tr>
        <tr><td><strong>不带阀</strong></td><td>断开后流路可以敞开</td></tr>
        <tr><td><strong>穿板</strong></td><td>接头固定在设备外壳、面板或支架上，作为对外接口</td></tr>
        <tr><td><strong>非穿板</strong></td><td>接头接在管路中间，随管路移动</td></tr>
        <tr><td><strong>POM 外壳 + NBR 密封圈</strong></td><td>工作温度 −40～82&nbsp;℃</td></tr>
        <tr><td><strong>PP 外壳 + EPDM 密封圈</strong></td><td>工作温度 −20～71&nbsp;℃</td></tr>
      </tbody>
    </table>
  </div>
  <h3>Q20、Q40、Q60 系列对比</h3>
  <div class="fx-tw">
    <table class="fx-wide">
      <thead><tr><th scope="col">系列</th><th scope="col">通径</th><th scope="col">接管内径</th><th scope="col">外壳材质</th><th scope="col">工作压力</th></tr></thead>
      <tbody>
        <tr class="fx-hl"><td><strong>Q20</strong>（本系列）</td><td>1/8"</td><td>1.6–6.4&nbsp;mm</td><td>POM / PP</td><td>8.3 bar</td></tr>
        <tr><td><strong>Q40</strong></td><td>1/4"</td><td>6.4–9.5&nbsp;mm</td><td>POM / PP</td><td>8.3 bar</td></tr>
        <tr><td><strong>Q60</strong></td><td>3/8"</td><td>9.5–19.0&nbsp;mm</td><td>PP</td><td>4.2 bar</td></tr>
      </tbody>
    </table>
  </div>
  <p class="fx-muted">更完整的选型思路见 <a href="/resources/technical-articles/what-is-a-quick-disconnect-fitting/">什么是快插接头</a>。</p>
</div>

${PANEL_INSTALLATION_HTML}

<!-- 8 安装与使用注意事项 -->
<div class="fx-sec" id="fx-install">
  <h2>安装与使用注意事项</h2>
  <div class="fx-callout"><p><strong>不要带压插拔。</strong>带阀的作用是断开后封闭流路，不代表接头适合在带压状态下插拔。断开前请先泄压。</p></div>
  <ul>
    <li>本型号的安装孔和板厚限值见上方「穿板安装：开孔与板厚」；固定后检查螺母夹持及接头定位。</li>
    <li>安装位置要留出按键操作、插入拔出和管路弯曲的空间。</li>
    <li>断开时可能有少量残液流出，重新插合时可能带入少量空气；对此敏感的流路，请在实际工况下评估。</li>
    <li>插合后确认听到"咔嗒"声，再通液。</li>
  </ul>
  <ul class="fx-links"><li><a href="/resources/installation-guide/">安装指南</a></li></ul>
</div>`,

};

export default function QuickConnectQ20ZhContent({
  section = "all",
}: {
  section?: QuickConnectQ20ZhSection;
}): ReactElement {
  if (section === "delivery") return <FittingDeliveryZh />;
  const html = `<section class="fx-detail" id="fx-detail-${section}">${STYLE_HTML}${SECTION_HTML[section]}</section>`;
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function QuickConnectQ20ZhProductContent(): ReactElement {
  return <QuickConnectQ20ZhContent section="product" />;
}

export function QuickConnectQ20ZhSelectionContent(): ReactElement {
  return <QuickConnectQ20ZhContent section="selection" />;
}

export function QuickConnectQ20ZhDeliveryContent(): ReactElement {
  return <QuickConnectQ20ZhContent section="delivery" />;
}

// Pure server content: resolve the same Chinese template before translating its presentation.
registerFittingDetail(QuickConnectQ20ZhContent, QuickConnectQ20ZhProductContent, QuickConnectQ20ZhSelectionContent, QuickConnectQ20ZhDeliveryContent);
