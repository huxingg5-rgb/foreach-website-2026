const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function backup(rel, suffix) {
  const full = p(rel);
  if (!fs.existsSync(full)) return;

  const bak = full + suffix;
  if (!fs.existsSync(bak)) {
    fs.copyFileSync(full, bak);
    console.log("已备份:", rel + suffix);
  }
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("已修改:", rel);
}

const jsonRel = "data/products/generated/pumps/syringe-pumps/detail/index.json";

if (!fs.existsSync(p(jsonRel))) {
  console.error("未找到:", jsonRel);
  process.exit(1);
}

backup(jsonRel, ".bak.real-specs");

const details = JSON.parse(fs.readFileSync(p(jsonRel), "utf8"));

const realSpecsBySlug = {
  "hmd3-30mm-solenoid-syringe-pump": [
    { label: "产品系列", value: "HMD3 电磁阀系列注射泵" },
    { label: "可选型号", value: "HMD3-1PKFSU28 / HMD3-1PKFDU28 / HMD3-1EIFTU28 / HMD3-1EIFWU28" },
    { label: "商品编码", value: "919037 / 919038 / 919042 / 919047" },
    { label: "行程", value: "30 mm" },
    { label: "通道数", value: "1 通道" },
    { label: "全行程运行时间", value: "1.2–1200 s" },
    { label: "线性速度", value: "0.025–25 mm/s" },
    { label: "分辨率", value: "标准模式：3000 增量；微步模式：24000 增量" },
    { label: "阀头材质", value: "PEEK / PEI" },
    { label: "标准接口", value: "1/4-28 UNF" },
    { label: "量程（玻璃注射器）", value: "50 μL–5.0 mL" },
    { label: "液量精确度（额定行程）", value: "≤0.05%（250 μL 及以上注射器）；≤1%（100 μL 及以下注射器）" },
    { label: "阀门配置（电磁阀）", value: "2端口 / 3端口 / 3端口分配" },
    { label: "使用压力范围", value: "-75 kPa–0.2 MPa；分配阀配置为 -75 kPa–0.1 MPa" },
    { label: "通讯类型", value: "RS-232 / RS-485 / CAN" },
    { label: "安装尺寸（长×宽×高）", value: "116 × 45 × 127 mm" },
    { label: "配置方式", value: "定制配置" }
  ],

  "hmd6-60mm-solenoid-syringe-pump": [
    { label: "产品系列", value: "HMD6 电磁阀系列注射泵" },
    { label: "可选型号", value: "HMD6-1PKFSU28 / HMD6-1PKFDU28 / HMD6-2PKFSU28 / HMD6-3PKFSU28 / HMD6-3PKFDU28 / HMD6-4PKFSU28 / HMD6-6PKFSU28 / HMD6-8PKFSU28 / HMD6-4EIFTU28" },
    { label: "商品编码", value: "919005 / 919006 / 919009 / 919013 / 919014 / 919017 / 919021 / 919023 / 919048" },
    { label: "行程", value: "60 mm" },
    { label: "通道数", value: "1 / 2 / 3 / 4 / 6 / 8 通道" },
    { label: "全行程运行时间", value: "1.2–9600 s" },
    { label: "线性速度", value: "0.00625–60 mm/s" },
    { label: "分辨率", value: "标准模式：6000 增量；微步模式：48000 增量" },
    { label: "阀头材质", value: "PEEK / PEI" },
    { label: "标准接口", value: "1/4-28 UNF" },
    { label: "量程（玻璃注射器）", value: "25 μL–25 mL；通道数超过 1 通道时，不支持 10 mL 和 25 mL 注射器" },
    { label: "液量精确度（额定行程）", value: "≤0.05%（250 μL 及以上注射器）；≤1%（100 μL 及以下注射器）" },
    { label: "阀门配置（电磁阀）", value: "2端口 / 3端口 / 3端口分配" },
    { label: "使用压力范围", value: "-75 kPa–0.2 MPa；分配阀配置为 -75 kPa–0.1 MPa" },
    { label: "通讯类型", value: "RS-232 / RS-485 / CAN" },
    { label: "安装尺寸（长×宽×高）", value: "118 × 视通道数而定 × 254 mm" },
    { label: "配置方式", value: "定制配置" }
  ],

  "hld3-30mm-rotary-valve-syringe-pump": [
    { label: "产品系列", value: "HLD3 旋转阀系列注射泵" },
    { label: "可选型号", value: "HLD3-SRV1-D3B / HLD3-SRV2-NYUH-M / HLD3-SRV2-N9UH-M / HLD3-SRV2-D3UH-M" },
    { label: "商品编码", value: "919096 / 919056 / 919057 / 919061" },
    { label: "行程", value: "30 mm" },
    { label: "通道数", value: "1 通道" },
    { label: "全行程运行时间", value: "1.2–1200 s" },
    { label: "线性速度", value: "0.025–25 mm/s" },
    { label: "分辨率", value: "标准模式：3000 增量；微步模式：24000 增量" },
    { label: "切阀时间", value: "相邻端口 ≤250 ms" },
    { label: "阀结构", value: "平面转阀 / 柱面转阀" },
    { label: "标准接口", value: "1/4-28 UNF" },
    { label: "量程（玻璃注射器）", value: "50 μL–5 mL" },
    { label: "液量精确度（额定行程）", value: "≤0.05%（250 μL 及以上注射器）；≤1%（100 μL 及以下注射器）" },
    { label: "阀门配置", value: "平面转阀：3通分配阀；柱面转阀：3通非分配阀 / 3通分配阀 / 9通分配阀" },
    { label: "转阀耐压", value: "0.41 MPa / 0.7 MPa" },
    { label: "通讯类型", value: "RS-232 / RS-485 / CAN" },
    { label: "安装尺寸（长×宽×高）", value: "107 × 45 × 127 mm / 116 × 45 × 127 mm" },
    { label: "配置方式", value: "定制配置" }
  ],

  "hld6-60mm-rotary-valve-syringe-pump": [
    { label: "产品系列", value: "HLD6 / HLD6M 旋转阀系列注射泵" },
    { label: "可选型号", value: "HLD6-SRV1-D9A / HLD6-SRV2-NYUH-M / HLD6-SRV2-N9UH-M / HLD6M-SRV1-DCB" },
    { label: "商品编码", value: "919085 / 919058 / 919059 / 919093" },
    { label: "行程", value: "60 mm" },
    { label: "通道数", value: "1 通道" },
    { label: "全行程运行时间", value: "1.2–9600 s" },
    { label: "线性速度", value: "0.00625–60 mm/s" },
    { label: "分辨率", value: "标准模式：6000 增量；微步模式：48000 增量" },
    { label: "切阀时间", value: "相邻端口 ≤250 ms" },
    { label: "阀结构", value: "平面转阀 / 柱面转阀" },
    { label: "标准接口", value: "1/4-28 UNF" },
    { label: "量程（玻璃注射器）", value: "25 μL–25 mL" },
    { label: "液量精确度（额定行程）", value: "≤0.05%（250 μL 及以上注射器）；≤1%（100 μL 及以下注射器）" },
    { label: "阀门配置", value: "平面转阀：3通非分配阀 / 5通分配阀 / 9通分配阀；柱面转阀：3通非分配阀 / 9通分配阀" },
    { label: "转阀耐压", value: "0.41 MPa / 0.7 MPa" },
    { label: "通讯类型", value: "RS-232 / RS-485 / CAN" },
    { label: "安装尺寸（长×宽×高）", value: "117 × 71.4 × 254 mm / 117.5 × 72.4 × 254 mm" },
    { label: "配置方式", value: "定制配置" }
  ]
};

for (const item of details) {
  const specs = realSpecsBySlug[item.slug];

  if (!specs) {
    console.log("跳过，未匹配 slug:", item.slug);
    continue;
  }

  item.specs = specs;
  item.specifications = specs;

  item.optionalConfigurations = specs.filter((row) =>
    [
      "可选型号",
      "通道数",
      "阀头材质",
      "阀结构",
      "阀门配置",
      "量程（玻璃注射器）",
      "通讯类型",
      "安装尺寸（长×宽×高）"
    ].includes(row.label)
  );
}

write(jsonRel, JSON.stringify(details, null, 2));

console.log("");
console.log("注射泵详情页真实规格表已更新。");
console.log("请重启 dev 后刷新详情页。");