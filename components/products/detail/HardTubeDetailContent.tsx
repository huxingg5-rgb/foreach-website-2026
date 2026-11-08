import { registerFittingDetail } from "./fitting-detail-view";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  formatTubeDiameters,
  getHardTubeAccessoryConfig,
  hardTubeProductCodeText,
} from "@/data/products/configurator/hard-tube-accessories";
import styles from "./QuickConnectDetailContent.module.css";
import HflM616PvNZhContent from "./HflM616PvNZhContent";
import HardTubeSeriesZhContent from "./HardTubeSeriesZhContent";
import { getHardTubeZhProfile } from "@/data/products/detail/hard-tube-content.zh";

type DetailIdentity = {
  slug?: string;
  model?: string;
  foreachModel?: string;
  productCode?: string;
  productTypeName?: string;
  seriesName?: string;
  name?: string;
  specs?: Array<{ label: string; value: string }>;
};
type Structure = "flanged" | "ferrule" | "ring" | "pressure" | "other";

function spec(data: DetailIdentity, ...labels: string[]) {
  return data.specs?.find(row => labels.includes(row.label))?.value?.trim() || "";
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <div className="fx-sec" id={id}><h2>{title}</h2>{children}</div>;
}

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return <div className="fx-tw"><table className={headers.length > 2 ? "fx-wide" : undefined}>
    {headers.length === 2 ? <colgroup><col style={{ width: "30%" }} /><col /></colgroup> : null}
    <thead><tr>{headers.map(label => <th scope="col" key={label}>{label}</th>)}</tr></thead>
    <tbody>{rows.map((row, index) => <tr key={index}>{row.map((cell, column) => column === 0
      ? <th scope="row" key={column}>{cell}</th> : <td key={column}>{cell}</td>)}</tr>)}</tbody>
  </table></div>;
}

// Structure and use boundaries come from the reviewed hard-tube guide and
// current catalogue. Compatibility is read from the configurator's source.
function structureFor(family: string): Structure {
  if (/^(HF|HF6|HFL|HFL6)$/.test(family)) return "flanged";
  if (/^(HN|HN6|HNF|HNF6|HNE|HNE6)$/.test(family)) return "ferrule";
  if (/^(HSF|HSF6)$/.test(family)) return "ring";
  if (/^(PNC|PNC6|PNF|PU|PUT)$/.test(family)) return "pressure";
  return "other";
}

const STRUCTURES: Record<Structure, { title: string; mechanism: string; assembly: string; maintenance: string }> = {
  flanged: {
    title: "法兰翻边与平底密封",
    mechanism: "管端先加工法兰翻边，配套垫片位于翻边与接头本体之间，用于支承翻边并传递压紧力。旋紧接头后，管端翻边贴合接收端口的平底密封面。",
    assembly: "先确认接头、垫片与管材的套装顺序，再按管组件要求加工翻边；也可选用已完成翻边的管组件。检查翻边平整、无裂纹，垫片正确就位后再装入匹配的平底端口。",
    maintenance: "重新接驳前检查翻边、垫片和端口底面。翻边开裂、压偏或受损时应处理或更换相应管组件，不能靠继续拧紧弥补密封面损伤。",
  },
  ferrule: {
    title: "卡箍夹持与密封",
    mechanism: "管端无需翻边。接头与配套卡箍套入平切的管材，旋紧时卡箍受压夹持管外壁，并与匹配端口形成密封。接头本体、卡箍和端口需要作为一组核对。",
    assembly: "用适合管材的工具获得平整切口，清除残屑。按具体卡箍的方向套入零件，确认管端位置与接收端口匹配，在保持管材和卡箍就位的情况下锁紧。",
    maintenance: "卡箍按单次安装要求安排更换；拆下重装时准备匹配的新卡箍，并检查原管端的夹持部位是否划伤、压扁或变形。接头本体能否继续使用，应另行检查螺纹和受力部位。",
  },
  ring: {
    title: "卡环管端组件",
    mechanism: "卡环连接由接头与配套的卡环压套、垫圈共同组成。按对应组件要求定位和压装后，通过管端组件与端口配合形成密封。卡环组件与普通卡箍的零件和装配方法不同。",
    assembly: "按对应套件说明依次装入接头、压套和垫圈，确认方向、压装位置以及管端与垫圈端面的关系。预压装方法与工具要求按具体套件确认。",
    maintenance: "完整管端组件的重新接驳与拆下旧压套再压装是不同操作。维护时检查组件状态，按具体组合确认允许的拆接和更换条件，不把完整组件可接驳理解为旧压套可任意复用。",
  },
  pressure: {
    title: "高压连接与端口配合",
    mechanism: "按本型号的螺纹、端口几何和配套管端组件确认连接。高压接头的规格需要与管材、接收端口和装配条件共同核对，螺纹相同并不代表密封结构可以互换。",
    assembly: "使用与本型号相匹配的管端组件和接收端口。核对管端插入位置、密封部件及有效螺纹配合，按对应图纸和装配说明锁紧。",
    maintenance: "拆卸前停止供液并释放系统压力。重新装配前检查螺纹、密封部件和管端，按具体零件要求安排更换，随后重新验证连接的密封状态。",
  },
  other: {
    title: "连接结构与配合要求",
    mechanism: "按本型号图纸核对螺纹、管路接口、密封面和配套部件。接口尺寸相同仍需确认密封结构与安装深度。",
    assembly: "先检查管端、螺纹和密封部件，再按本型号装配说明完成定位与锁紧。",
    maintenance: "拆卸前停机并泄压；再次装配前检查管端和密封部件，按具体配置要求安排更换。",
  },
};

export default function HardTubeDetailContent({ data, section }: {
  data: DetailIdentity;
  section: "product" | "selection";
}) {
  const model = String(data.model || data.foreachModel || data.slug || "").toUpperCase();
  if (data.slug === "hfl-m6-16-pv-n" && model === "HFL-M6-16-PV-N") {
    return <HflM616PvNZhContent section={section} config={getHardTubeAccessoryConfig(data, "zh")} />;
  }
  const profile = getHardTubeZhProfile(model);
  if (profile) return <HardTubeSeriesZhContent data={data} profile={profile} section={section} />;
  const family = model.split("-")[0];
  const structure = structureFor(family);
  const copy = STRUCTURES[structure];
  const config = getHardTubeAccessoryConfig(data, "zh");
  const tubeOd = spec(data, "接管外径");
  const flowId = spec(data, "流道内径");
  const thread = spec(data, "螺纹规格");
  const material = spec(data, "主体材质");
  const pressure = spec(data, "额定压力", "耐压");
  const compatibleTube = config?.tubeOuterDiameters.length ? formatTubeDiameters(config.tubeOuterDiameters) : tubeOd;
  const sharedBody = Boolean(config && config.tubeOuterDiameters.length > 1);
  const accessoryLabel = config?.accessoryKind || (structure === "ring" ? "卡环组件" : "配套部件");

  if (section === "product") return <section className={styles.detail} data-section="product" id="ht-detail-product">
    <Section id="ht-structure" title="连接结构与配套">
      <h3>{model} · {copy.title}</h3>
      <p>{copy.mechanism}</p>
      <div className="fx-grid">
        <div className="fx-card"><h3>设备端口</h3><p>{thread ? `本型号采用 ${thread} 螺纹。` : "按本型号图纸核对螺纹。"}同时核对端口深度、密封面位置和装配后的外露尺寸，不能只凭螺纹可旋入判断兼容。</p></div>
        <div className="fx-card"><h3>{flowId ? "流道尺寸" : "管径匹配"}</h3><p>{flowId
          ? `本型号标注的 ${flowId} 为流道内径，用于评估流路衔接；它不是适配管外径，连接端的管组件需按图纸另行核对。`
          : compatibleTube ? `按管外径 ${compatibleTube} 核对管材和${accessoryLabel}。管内径、壁厚与公差还需结合流量、压力和装配要求确认。`
            : "管外径用于核对接头配合，管内径与管长影响流阻和管内容积。两类尺寸需要分别确认。"}</p></div>
        <div className="fx-card"><h3>材料组合</h3><p>{material ? `本型号主体材质为 ${material}。` : "主体材质见上方规格。"}配套件和管材需要分别选定；根据实际接液部件核对介质、清洗液、温度及接触时间。</p></div>
      </div>
    </Section>
    {config?.accessories.length ? <Section id="ht-accessories" title={`本型号可选${accessoryLabel}`}>
      <p>以下配套范围与上方选型区一致。按实际管外径选择{accessoryLabel}，再确认材料与使用工况；配套件是否随接头供货，以清单和订单为准。</p>
      {sharedBody ? <p className="fx-callout">本接头本体覆盖 {compatibleTube} 管外径，{accessoryLabel}仍需按具体管径选择，不能将同一个密封件用于所有管径。</p> : null}
      <Table headers={[`${accessoryLabel}型号`, "商品编码", "材质", "适配管外径"]} rows={config.accessories.map(item => [
        item.model,
        hardTubeProductCodeText(item),
        item.materialLabel,
        formatTubeDiameters(item.tubeOuterDiameters.filter(value => config.tubeOuterDiameters.includes(value))),
      ])} />
      {structure === "flanged" ? <p className="fx-muted">垫片的内孔尺寸与适配管外径是不同字段。垫片还需核对外径与厚度，并与翻边和端口空间共同配合。</p> : <p className="fx-muted">不同卡箍系列的几何结构不同。即使适配管外径相同，也不能跨系列互换；按本表及上方选型区选择对应零件。</p>}
    </Section> : null}
    <Section id="ht-drawing-check" title="图纸与装配核对">
      <Table headers={["核对项目", "用于确认"]} rows={[
        ["螺纹与端口剖面", "螺纹规格、端口深度、密封面与接头前端的配合关系"],
        ["外形与安装空间", "头部直径、轴向长度、旋拧空间和相邻接口间距；紧凑外形不等于所有方向都更短"],
        ["管端与配套件", structure === "flanged" ? "翻边、垫片及管端位置" : structure === "ferrule" ? "卡箍系列、方向和管端位置" : structure === "ring" ? "卡环压套、垫圈及压装位置" : "管路接口、配套密封部件及管端位置"],
      ]} />
      <p className="fx-muted">可结合上方 2D / 3D 资料检查结构与空间；装配尺寸和公差以确认版本的图纸为准。如需用于设计评审，可点击「添加图纸」，随型号提交接收端口与管材信息。</p>
    </Section>
  </section>;

  return <section className={styles.detail} data-section="selection" id="ht-detail-selection">
    <Section id="ht-select" title="如何选择本型号">
      <p>围绕 {model} 的使用位置，依次核对接收端口、管材、配套零件和运行工况。</p>
      <Table headers={["选型步骤", "本型号需要核对的内容"]} rows={[
        ["1. 确认接收端口", `${thread ? `先确认 ${thread} 螺纹，` : "先确认螺纹，"}再检查端口剖面、密封面和安装深度。${structure === "flanged" ? "法兰翻边需要匹配平底密封面，不能直接接入锥底端口。" : "仅有螺纹规格不足以判断整组兼容。"}`],
        ["2. 确认管路尺寸", flowId ? `本型号的 ${flowId} 是流道内径。需另行核对连接端所用管组件的外径、端口结构与密封方式。` : `${compatibleTube ? `按 ${compatibleTube} 管外径选配，` : "确认管外径，"}并提供管材、内径、壁厚和外径公差；外径相同仍需确认管壁受力与流路要求。`],
        ["3. 确认配套零件", config ? `从本型号配套清单中选择${accessoryLabel}的完整型号及材料。${sharedBody ? "同一档本体适用多个管外径时，密封件必须跟随实际管径选择。" : "不要只按外观或管径代码替代配套件。"}` : structure === "ring" ? "按接头完整型号确认卡环压套与垫圈组成的套件，同时确认预压装方法。" : "按完整型号与图纸确认管端组件、密封部件及供货范围。"],
        ["4. 确认工况与空间", "提供介质、浓度、工作温度、持续及峰值压力、负压条件、拆接频率和安装位置。运动管路还需留出活动余量并设置支撑。"],
      ]} />
    </Section>
    <Section id="ht-materials" title="材料与压力条件">
      <p>{material ? `${material} 是本型号的主体材质，` : "接头主体材质、"}管材与{accessoryLabel}的材料也应分别确认。材料兼容性需结合工作液、清洗液、浓度、温度和接触时间评估。</p>
      <p>{pressure
        ? `本型号规格中标注的压力为 ${pressure}。实际应用还需核对该数据对应的温度、管材、端口和装配条件；整条液路的工作边界由各组成部件及连接组合共同确定。`
        : "本型号当前规格未给出统一的工作压力或温度范围。请按接头、配套件、管材与端口的完整组合确认，不能套用其他系列或专用高压接头的耐压值。"}</p>
      <ul className="fx-links"><li><Link href="/resources/material-compatibility/">查看材料兼容性</Link></li><li><Link href="/resources/technical-articles/fitting-material-selection-guide/">接头材质选型</Link></li></ul>
    </Section>
    <Section id="ht-install" title="安装与使用">
      <div className="fx-callout"><p><strong>拆装前停机并泄压。</strong>排出或妥善处理残液，避免在带压状态下松开接头。</p></div>
      <div className="fx-grid">
        <div className="fx-card"><h3>检查零件</h3><p>检查管端、螺纹、端口密封面及配套件，清除切屑和异物。发现裂纹、压伤、毛刺或明显变形时，先处理或更换再装配。</p></div>
        <div className="fx-card"><h3>按结构装配</h3><p>{copy.assembly}</p></div>
        <div className="fx-card"><h3>控制锁紧与走线</h3><p>锁紧方法和扭矩按具体型号确认，不能给所有塑料或金属接头套用统一数值。避免管路急弯、侧向拉扯及运动载荷集中在接头根部。</p></div>
      </div>
    </Section>
    <Section id="ht-validation" title="通液检查与维护">
      <p>装配后在已确认的介质、温度与压力条件下检查连接，并覆盖设备实际的启停和运动工况。</p>
      <Table headers={["检查情形", "重点与处理"]} rows={[
        ["首次通液", "检查接头周围渗漏、管端位移和流量变化；吸液侧同时检查进气与气泡来源。"],
        ["启停或温度变化后", "检查压力峰值、热变化及管路拉扯引起的松动或泄漏；静态检查通过后仍需验证实际运行。"],
        ["拆卸后重新装配", copy.maintenance],
        ["发现泄漏或松脱", "先停止运行并泄压，核对配套件、管端和密封面。不要持续加大锁紧力掩盖结构不匹配或零件损伤。"],
      ]} />
    </Section>
    <Section id="ht-selection-info" title="提交选型时需要的信息">
      <p>将 {model} 加入清单，并备注接收端口图纸、管材与内外径、所需{accessoryLabel}、介质与清洗方式、温度、压力及拆接要求。需要完整管组件时，再提供管长、两端接口与走线条件。</p>
      <ul className="fx-links">
        <li><Link href="/products/fittings/hard-tube-fittings/">查看硬管接头型号</Link></li>
        <li><Link href="/resources/technical-articles/hard-tube-fittings-selection-guide/">硬管接头选型指南</Link></li>
        {structure === "ferrule" ? <li><Link href="/resources/technical-articles/what-is-a-ferrule-fitting/">卡箍接头的结构与安装</Link></li> : null}
        {structure === "ring" ? <li><Link href="/resources/technical-articles/what-is-a-compression-ring-fitting/">卡环接头的结构与安装</Link></li> : null}
      </ul>
    </Section>
  </section>;
}

// Pure server content: resolve the same Chinese template before translating its presentation.
registerFittingDetail(Section, Table, HardTubeDetailContent);
