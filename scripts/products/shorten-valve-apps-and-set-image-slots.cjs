const fs = require("fs");
const path = require("path");

const root = process.cwd();

function stamp() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}

function abs(relativePath) {
  return path.join(root, relativePath);
}

function backup(filePath, tag) {
  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak_${tag}_${stamp()}`;
    fs.copyFileSync(filePath, backupPath);
    console.log("已备份：" + path.relative(root, backupPath));
  }
}

function ensureDir(relativeDir) {
  const dirPath = abs(relativeDir);
  fs.mkdirSync(dirPath, { recursive: true });
  console.log("已确认图片目录：" + relativeDir);
}

/*
  阀系列图片预留路径。
  你后续只要把图片按下面文件名放到 public 对应目录即可显示。
*/
const imageMap = {
  "rotary-valves": {
    image: "/images/products/valves/rotary-valves/mrv3-ceramic-rotary-valve-main.webp",
    imageAlt: "MRV3 10/16/24通道陶瓷多通道旋转阀",
    dir: "public/images/products/valves/rotary-valves",
    file: "mrv3-ceramic-rotary-valve-main.webp"
  },
  "high-pressure-valves": {
    image: "/images/products/valves/high-pressure-valves/hp-3-position-7-port-high-pressure-valve-main.webp",
    imageAlt: "HP 25MPa三位七通高压阀",
    dir: "public/images/products/valves/high-pressure-valves",
    file: "hp-3-position-7-port-high-pressure-valve-main.webp"
  },
  "solenoid-valves": {
    image: "/images/products/valves/solenoid-valves/6010-solenoid-valve-main.webp",
    imageAlt: "6010 2/3通摆臂隔膜电磁阀",
    dir: "public/images/products/valves/solenoid-valves",
    file: "6010-solenoid-valve-main.webp"
  }
};

for (const item of Object.values(imageMap)) {
  ensureDir(item.dir);

  const readmePath = abs(path.join(item.dir, "README.txt"));
  const readme = `把主图放到当前目录，并使用下面文件名：\n\n${item.file}\n\n官网访问路径：\n${item.image}\n`;

  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, readme, "utf8");
  }
}

/* =========================================================
   1. 修改详情页 JSON：
   - 常见应用缩短
   - 主图改为预留路径
   - 保留规格表 specs 不动
========================================================= */

const detailPath = abs("data/products/generated/valves/detail/index.json");

if (!fs.existsSync(detailPath)) {
  console.error("找不到详情数据：data/products/generated/valves/detail/index.json");
  process.exit(1);
}

backup(detailPath, "short_apps_image_slots");

const details = JSON.parse(fs.readFileSync(detailPath, "utf8"));

const shortApps = {
  "rotary-valves": [
    "多试剂选择",
    "样本分配",
    "清洗液切换",
    "废液路径管理",
    "多通道液路集成",
    "实验室自动化"
  ],
  "high-pressure-valves": [
    "HPLC自动进样",
    "高压流路切换",
    "系统排气",
    "样品旁路",
    "高压分析模块",
    "低内体积液路"
  ],
  "solenoid-valves": [
    "试剂通断控制",
    "清洗液控制",
    "废液控制",
    "阀组集成",
    "样本针清洗",
    "低压液路开关"
  ]
};

for (const item of details) {
  const imageInfo = imageMap[item.slug];

  if (shortApps[item.slug]) {
    item.commonApplications = shortApps[item.slug];
  }

  if (imageInfo) {
    item.image = imageInfo.image;
    item.imageAlt = imageInfo.imageAlt;

    /*
      多图字段先预留空数组，沿用公共详情页逻辑。
      后续如果需要 5 张主图/缩略图，再在这里加 additionalImages。
    */
    item.additionalImages = [];
    item.images = [];
    item.thumbnails = [];
  }
}

fs.writeFileSync(detailPath, JSON.stringify(details, null, 2) + "\n", "utf8");
console.log("已更新详情页常见应用和主图预留路径。");

/* =========================================================
   2. 同步产品中心卡片图片路径
========================================================= */

const selectionPath = abs("data/products/selection/valve-selection.generated.ts");

if (fs.existsSync(selectionPath)) {
  backup(selectionPath, "image_slots");

  let text = fs.readFileSync(selectionPath, "utf8");

  const replacements = [
    {
      slug: "rotary-valves",
      oldPatterns: [
        /image:\s*"[^"]*Rotary valve_200x200_01_v001\.jpg"/g,
        /imagePath:\s*"[^"]*Rotary valve_200x200_01_v001\.jpg"/g,
        /imageUrl:\s*"[^"]*Rotary valve_200x200_01_v001\.jpg"/g
      ],
      image: imageMap["rotary-valves"].image
    },
    {
      slug: "high-pressure-valves",
      oldPatterns: [
        /image:\s*"\/images\/products\/common\/product-placeholder\.svg"/g,
        /imagePath:\s*"\/images\/products\/common\/product-placeholder\.svg"/g,
        /imageUrl:\s*"\/images\/products\/common\/product-placeholder\.svg"/g
      ],
      image: imageMap["high-pressure-valves"].image
    },
    {
      slug: "solenoid-valves",
      oldPatterns: [
        /image:\s*"[^"]*Solenoid valve_200x200_01_v001\.jpg"/g,
        /imagePath:\s*"[^"]*Solenoid valve_200x200_01_v001\.jpg"/g,
        /imageUrl:\s*"[^"]*Solenoid valve_200x200_01_v001\.jpg"/g
      ],
      image: imageMap["solenoid-valves"].image
    }
  ];

  for (const item of replacements) {
    for (const pattern of item.oldPatterns) {
      text = text.replace(pattern, (match) => {
        if (match.startsWith("imagePath")) {
          return `imagePath: "${item.image}"`;
        }

        if (match.startsWith("imageUrl")) {
          return `imageUrl: "${item.image}"`;
        }

        return `image: "${item.image}"`;
      });
    }
  }

  /*
    如果之前已经被替换过，确保三组路径最终都存在。
  */
  text = text
    .replace(/image:\s*"\/images\/products\/valves\/rotary-valves\/[^"]*"/g, `image: "${imageMap["rotary-valves"].image}"`)
    .replace(/imagePath:\s*"\/images\/products\/valves\/rotary-valves\/[^"]*"/g, `imagePath: "${imageMap["rotary-valves"].image}"`)
    .replace(/imageUrl:\s*"\/images\/products\/valves\/rotary-valves\/[^"]*"/g, `imageUrl: "${imageMap["rotary-valves"].image}"`)

    .replace(/image:\s*"\/images\/products\/valves\/high-pressure-valves\/[^"]*"/g, `image: "${imageMap["high-pressure-valves"].image}"`)
    .replace(/imagePath:\s*"\/images\/products\/valves\/high-pressure-valves\/[^"]*"/g, `imagePath: "${imageMap["high-pressure-valves"].image}"`)
    .replace(/imageUrl:\s*"\/images\/products\/valves\/high-pressure-valves\/[^"]*"/g, `imageUrl: "${imageMap["high-pressure-valves"].image}"`)

    .replace(/image:\s*"\/images\/products\/valves\/solenoid-valves\/[^"]*"/g, `image: "${imageMap["solenoid-valves"].image}"`)
    .replace(/imagePath:\s*"\/images\/products\/valves\/solenoid-valves\/[^"]*"/g, `imagePath: "${imageMap["solenoid-valves"].image}"`)
    .replace(/imageUrl:\s*"\/images\/products\/valves\/solenoid-valves\/[^"]*"/g, `imageUrl: "${imageMap["solenoid-valves"].image}"`);

  fs.writeFileSync(selectionPath, text, "utf8");
  console.log("已同步产品中心卡片图片预留路径。");
} else {
  console.log("未找到 valve-selection.generated.ts，跳过卡片图片同步。");
}

console.log("");
console.log("图片请放到以下位置：");
for (const item of Object.values(imageMap)) {
  console.log("- " + item.dir + "\\" + item.file);
}

console.log("");
console.log("访问路径：");
for (const item of Object.values(imageMap)) {
  console.log("- " + item.image);
}

console.log("");
console.log("请重新测试：");
console.log("/products");
console.log("/products/valves/rotary-valves");
console.log("/products/valves/high-pressure-valves");
console.log("/products/valves/solenoid-valves");