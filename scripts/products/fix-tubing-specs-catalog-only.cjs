const fs = require("fs");
const path = require("path");

const root = process.cwd();
const jsonPath = path.join(root, "data/products/generated/tubing/detail/index.json");

if (!fs.existsSync(jsonPath)) {
  console.error("找不到文件：data/products/generated/tubing/detail/index.json");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
fs.copyFileSync(jsonPath, `${jsonPath}.bak_specs_from_catalog_only_${stamp}`);

const details = JSON.parse(fs.readFileSync(jsonPath, "utf8"));

const specMap = {
  "pvc-tubing": {
    material: "PVC",
    fullName: "聚氯乙烯（PVC）",
    idRange: "1.6mm~19.1mm",
    temp: "-42℃~75℃"
  },
  "tpu-tubing": {
    material: "TPU",
    fullName: "热塑性聚氨酯（TPU）",
    idRange: "3.7mm~7.0mm",
    temp: "-30℃~70℃"
  },
  "fep-tubing": {
    material: "FEP",
    fullName: "氟化乙烯丙烯共聚物（FEP）",
    idRange: "0.3mm~2.0mm",
    temp: "-230℃~200℃"
  },
  "ptfe-tubing": {
    material: "PTFE",
    fullName: "聚四氟乙烯（PTFE）",
    idRange: "1.5mm~2.0mm",
    temp: "-200℃~260℃"
  },
  "peek-tubing": {
    material: "PEEK",
    fullName: "聚醚醚酮（PEEK）",
    idRange: "0.2mm~0.8mm",
    temp: "-180℃~225℃"
  },
  "pfa-tubing": {
    material: "PFA",
    fullName: "全氟烷氧基树脂（PFA）",
    idRange: "0.5mm~1.0mm",
    temp: "-230℃~200℃"
  }
};

for (const item of details) {
  const spec = specMap[item.slug];

  if (!spec) {
    console.log("跳过未知 slug：" + item.slug);
    continue;
  }

  item.specsTitle = "规格";
  item.specTitle = "规格";
  item.specificationTitle = "规格";

  item.specs = [
    { label: "材料", value: spec.material },
    { label: "材料全称", value: spec.fullName },
    { label: "内径范围", value: spec.idRange },
    { label: "工作温度", value: spec.temp }
  ];

  item.material = spec.material;
  item.materialFullName = spec.fullName;
  item.innerDiameterRange = spec.idRange;
  item.workingTemperature = spec.temp;
}

fs.writeFileSync(jsonPath, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("已修正管路详情页规格区。");
console.log("现在规格区只保留规格书明确数据，不再显示适配连接方式、材料合规资料等补充项。");