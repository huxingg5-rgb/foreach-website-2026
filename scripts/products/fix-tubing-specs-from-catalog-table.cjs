const fs = require("fs");
const path = require("path");

const root = process.cwd();
const jsonPath = path.join(root, "data/products/generated/tubing/detail/index.json");

if (!fs.existsSync(jsonPath)) {
  console.error("找不到文件：data/products/generated/tubing/detail/index.json");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(jsonPath, `${jsonPath}.bak_catalog_specs_full_${stamp}`);

const details = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const specsBySlug = {
  "pvc-tubing": [
    ["密度（g/cm³）", "1.18"],
    ["拉伸强度（Mpa）", "14.3"],
    ["弯曲强度（Mpa）", "68"],
    ["介电常数（KV/mm）", "4"],
    ["吸水性（%）", "0.12"],
    ["工作温度（℃）", "-42~75"],
    ["线膨胀系数（cm/cm/℃）", "6X10⁻⁵"],
    ["融化温度（℃）", "185"],
    ["低温脆化（℃）", "-46"],
    ["硬度（Shore A）", "55、65"]
  ],

  "tpu-tubing": [
    ["密度（g/cm³）", "1.22"],
    ["拉伸强度（MPa）", "46"],
    ["弯曲强度（MPa）", "83"],
    ["介电常数（KV/mm）", "2.8"],
    ["吸水性（%）", "1.5（ASTM D570）"],
    ["硬度（Shore）", "80A、85A、95A、64D"],
    ["工作温度（℃）", "-30~70"],
    ["线膨胀系数（cm/cm/℃）", "9X10⁻⁵"],
    ["融化温度（℃）", "185"],
    ["低温脆化（℃）", "-40"]
  ],

  "fep-tubing": [
    ["密度（g/cm³）", "2.13"],
    ["拉伸强度（MPa）", "27.6"],
    ["弯曲强度（MPa）", "18.5（ASTM D790）"],
    ["介电常数（KV/mm）", "2.1（IEC60243-1）"],
    ["吸水性（%）", "<0.01（ASTM D570）"],
    ["硬度（Shore D）", "50、60"],
    ["工作温度（℃）", "-230~200"],
    ["线膨胀系数（cm/cm/℃）", "9.9X10⁻⁵"],
    ["融化温度（℃）", "260"],
    ["低温脆化（℃）", "-250"]
  ],

  "ptfe-tubing": [
    ["密度（g/cm³）", "2.2"],
    ["拉伸强度（MPa）", "27.6"],
    ["弯曲强度（MPa）", "174（ASTM D790）"],
    ["介电常数（KV/mm）", "2.1（IEC60243-1）"],
    ["吸水性（%）", "0.05（ASTM D570）"],
    ["硬度（Shore D）", "50、65"],
    ["工作温度（℃）", "-101~260"],
    ["线膨胀系数（cm/cm/℃）", "1.2X10⁻⁵"],
    ["融化温度（℃）", "327"]
  ],

  "peek-tubing": [
    ["密度（g/cm³）", "1.32"],
    ["拉伸强度（MPa）", "180"],
    ["弯曲强度（MPa）", "265（ASTM D790）"],
    ["介电常数（KV/mm）", "24"],
    ["吸水性（%）", "0.2（ISO 62）"],
    ["工作温度（℃）", "-180~225"],
    ["线膨胀系数（cm/cm/℃）", "4.5X10⁻⁵"],
    ["融化温度（℃）", "343"]
  ],

  "pfa-tubing": [
    ["密度（g/cm³）", "2.17"],
    ["拉伸强度（MPa）", "35"],
    ["介电常数（KV/mm）", "2.1"],
    ["硬度（Shore D）", "50~60"],
    ["线膨胀系数（cm/cm/℃）", "9X10⁻⁵"],
    ["融化温度（℃）", "310"]
  ]
};

for (const item of details) {
  const rows = specsBySlug[item.slug];

  if (!rows) {
    console.log("跳过未知 slug：" + item.slug);
    continue;
  }

  item.specsTitle = "规格";
  item.specTitle = "规格";
  item.specificationTitle = "规格";
  item.specs = rows.map(([label, value]) => ({ label, value }));

  console.log("已更新规格：" + item.slug);
}

fs.writeFileSync(jsonPath, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("");
console.log("完成：规格区已按你发的规格书材料性能表更新。");
console.log("已删除之前自己补的适配连接方式、材料合规资料等规格行。");