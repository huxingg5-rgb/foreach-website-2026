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

/* =========================================================
   1. 修改针系列详情 JSON：
   把“规格参数”内容改为“定制确认项”
========================================================= */

const detailPath = abs("data/products/generated/probes/detail/index.json");

if (!fs.existsSync(detailPath)) {
  console.error("找不到文件：data/products/generated/probes/detail/index.json");
  process.exit(1);
}

backup(detailPath, "probe_custom_confirm_items");

const details = JSON.parse(fs.readFileSync(detailPath, "utf8"));

const customConfirmMap = {
  "sampling-probes": {
    specsTitle: "定制确认项",
    specsDescription:
      "采样针为来图定制产品，以下内容用于确认加工工艺与仪器适配方向。请提供图纸、样品、安装空间和液路任务信息，FOREACH 将根据实际结构确认针体尺寸、针尖、孔位、抛光、涂层和液位检测适配方案。",
    specs: [
      {
        label: "图纸或样品",
        value: "请提供 2D 图纸、3D 文件、样品或设备安装空间照片",
      },
      {
        label: "针管结构",
        value: "需确认外径、内径、总长、有效长度、折弯方向和安装端结构",
      },
      {
        label: "针尖与孔位",
        value: "需确认尖口、平口、V型口、侧孔位置、孔径和液体进出方向",
      },
      {
        label: "抛光与表面处理",
        value: "内壁抛光、外壁涂层、防挂液处理需根据液体类型和尺寸评估",
      },
      {
        label: "液位检测适配",
        value: "如需 cLLD / 电容式液位检测，需确认针体结构、线缆连接和整机检测方式",
      },
      {
        label: "使用条件",
        value: "请提供液体类型、目标容量、吸液速度、清洗方式和防交叉污染要求",
      },
    ],
  },

  "piercing-probes": {
    specsTitle: "定制确认项",
    specsDescription:
      "穿刺针为来图定制产品，需根据封膜、瓶塞、密闭耗材或试剂仓结构确认针尖强度、穿刺深度、取液路径和排气结构。请提供耗材结构、穿刺位置和设备空间信息。",
    specs: [
      {
        label: "图纸或样品",
        value: "请提供耗材图纸、封膜/瓶塞样品、穿刺位置图或设备安装空间",
      },
      {
        label: "穿刺对象",
        value: "需确认封膜、瓶塞、试剂仓、样本仓或密闭耗材的材料和厚度",
      },
      {
        label: "针尖结构",
        value: "针尖角度、刃口方向、强度和表面处理需根据穿刺阻力确认",
      },
      {
        label: "排气与取液",
        value: "如需排气孔、排气槽或侧孔结构，需确认气液路径和取液动作",
      },
      {
        label: "安装与运动",
        value: "需确认穿刺深度、运动方向、安装端结构和设备内部空间",
      },
      {
        label: "工艺可行性",
        value: "侧孔、折弯、焊接和抛光需结合针管尺寸、针尖结构和穿刺稳定性评估",
      },
    ],
  },

  "wash-probes": {
    specsTitle: "定制确认项",
    specsDescription:
      "清洗针为来图定制产品，需根据清洗站结构、喷孔方向、清洗液路径和废液回收路径确认。请提供清洗站空间、清洗动作和目标清洗区域。",
    specs: [
      {
        label: "图纸或样品",
        value: "请提供清洗站结构图、针体安装空间、清洗路径和废液路径说明",
      },
      {
        label: "清洗对象",
        value: "需确认样本针、试剂针、外壁清洗、内壁冲洗或废液抽排需求",
      },
      {
        label: "喷孔结构",
        value: "侧孔数量、孔径、孔位和喷射方向需根据目标清洗区域确认",
      },
      {
        label: "排废结构",
        value: "废液出口、残液回收路径和抽排方向需结合清洗站结构确认",
      },
      {
        label: "针体形式",
        value: "单头、双头、多头、弯折结构和安装端需根据设备空间定制",
      },
      {
        label: "工艺要求",
        value: "焊接、抛光、涂层和防挂液处理需结合清洗液、废液和寿命要求确认",
      },
    ],
  },

  "stirring-paddles": {
    specsTitle: "定制确认项",
    specsDescription:
      "搅拌桨为来图定制产品，需根据反应杯结构、目标液量、转速范围、混匀时间和是否允许气泡或飞溅确认叶片结构。请提供反应杯尺寸、安装端和混匀效果要求。",
    specs: [
      {
        label: "图纸或样品",
        value: "请提供反应杯结构、搅拌空间、安装端尺寸或现有样品",
      },
      {
        label: "反应容器",
        value: "需确认反应杯尺寸、杯底形状、液面高度和可用搅拌空间",
      },
      {
        label: "桨叶结构",
        value: "平板、螺旋、90度角叶片或其他叶片形状需根据混匀效果确认",
      },
      {
        label: "混匀条件",
        value: "请提供目标液量、转速范围、混匀时间、是否允许气泡或飞溅",
      },
      {
        label: "安装结构",
        value: "需确认安装端形式、同轴度要求、连接方式和运动方向",
      },
      {
        label: "表面处理",
        value: "涂层、颜色、焊接方式和防挂液要求需根据介质和清洗方式确认",
      },
    ],
  },
};

for (const item of details) {
  const update = customConfirmMap[item.slug];

  if (!update) {
    continue;
  }

  item.specsTitle = update.specsTitle;
  item.specTitle = update.specsTitle;
  item.specificationTitle = update.specsTitle;
  item.specsDescription = update.specsDescription;
  item.customConfirmDescription = update.specsDescription;
  item.specs = update.specs;
}

fs.writeFileSync(detailPath, JSON.stringify(details, null, 2) + "\n", "utf8");

console.log("已把 4 个针系列详情页规格表内容改为定制确认项。");

/* =========================================================
   2. 修改针系列详情页 page.tsx：
   - 传递 specsTitle / specsDescription
   - 前台把 Tab “规格”替换为“定制确认项”
========================================================= */

const pagePath = abs("app/products/probes/[slug]/page.tsx");

if (!fs.existsSync(pagePath)) {
  console.error("找不到文件：app/products/probes/[slug]/page.tsx");
  process.exit(1);
}

backup(pagePath, "probe_custom_confirm_tab");

let pageText = fs.readFileSync(pagePath, "utf8");

/*
  2.1 确保 toClientData 中传递 specsTitle 与说明文案。
*/
if (!pageText.includes("specsDescription: detail.specsDescription")) {
  pageText = pageText.replace(
    /specsTitle:\s*detail\.specsTitle\s*\|\|\s*"定制确认项",\s*\n\s*specTitle:\s*detail\.specsTitle\s*\|\|\s*"定制确认项",\s*\n\s*specificationTitle:\s*detail\.specsTitle\s*\|\|\s*"定制确认项",/,
    `specsTitle: detail.specsTitle || "定制确认项",
    specTitle: detail.specsTitle || "定制确认项",
    specificationTitle: detail.specsTitle || "定制确认项",
    specsDescription: detail.specsDescription,
    customConfirmDescription: detail.customConfirmDescription || detail.specsDescription,`
  );
}

/*
  2.2 如果类型里还没有 specsDescription 字段，则补充。
*/
if (!pageText.includes("specsDescription?: string")) {
  pageText = pageText.replace(
    /specsTitle\?:\s*string;/,
    `specsTitle?: string;
  specsDescription?: string;
  customConfirmDescription?: string;`
  );
}

/*
  2.3 给针系列详情页加前台文字替换脚本。
  目的：
  ProductDetailClient 是公共组件，Tab 默认叫“规格”。
  针系列不是标准规格页，因此在针详情页里把“规格”改成“定制确认项”。
*/
if (!pageText.includes("PROBE_DETAIL_CUSTOM_CONFIRM_TAB_20260709")) {
  const oldReturn = "return <ProductDetailView data={toClientData(detail)} />;";

  const newReturn = `return (
    <div data-probe-detail-page="true">
      {/*
        PROBE_DETAIL_CUSTOM_CONFIRM_TAB_20260709

        针系列为来图定制产品。
        公共 ProductDetailClient 默认 Tab 文案为“规格”，
        这里仅在针系列详情页中将其替换为“定制确认项”。
      */}
      <script
        dangerouslySetInnerHTML={{
          __html: \`
            (function () {
              function updateProbeTabText() {
                var root = document.querySelector('[data-probe-detail-page="true"]');
                if (!root) return;

                var nodes = root.querySelectorAll('button, a, [role="tab"], h2, h3, span');
                nodes.forEach(function (node) {
                  var text = (node.textContent || '').trim();

                  if (text === '规格') {
                    node.textContent = '定制确认项';
                  }
                });
              }

              updateProbeTabText();

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', updateProbeTabText);
              }

              setTimeout(updateProbeTabText, 200);
              setTimeout(updateProbeTabText, 800);

              var observer = new MutationObserver(updateProbeTabText);
              observer.observe(document.documentElement, {
                childList: true,
                subtree: true
              });
            })();
          \`,
        }}
      />
      <ProductDetailView data={toClientData(detail)} />
    </div>
  );`;

  if (pageText.includes(oldReturn)) {
    pageText = pageText.replace(oldReturn, newReturn);
  } else {
    console.log("未找到标准 return 语句，可能之前已经包过 div。跳过 Tab 脚本插入。");
  }
}

fs.writeFileSync(pagePath, pageText, "utf8");

console.log("已更新针系列详情页 Tab 文案逻辑。");

console.log("");
console.log("请测试：");
console.log("/products/probes/sampling-probes");
console.log("/products/probes/piercing-probes");
console.log("/products/probes/wash-probes");
console.log("/products/probes/stirring-paddles");