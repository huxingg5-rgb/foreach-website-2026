const fs = require("fs");
const path = require("path");

const root = process.cwd();

const detailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "quick-connect-fittings",
  "detail",
  "index.json"
);

if (!fs.existsSync(detailPath)) {
  throw new Error(
    "找不到快插接头详情数据：" +
    path.relative(root, detailPath)
  );
}

function clean(value) {
  return String(
    value ?? ""
  ).trim();
}

function getSpecValue(
  detail,
  labels
) {
  const specs =
    Array.isArray(
      detail.specs
    )
      ? detail.specs
      : [];

  const labelList =
    Array.isArray(labels)
      ? labels
      : [labels];

  const matched =
    specs.find(
      (item) =>
        labelList.includes(
          clean(
            item?.label
          )
        )
    );

  return clean(
    matched?.value
  );
}

function makeSpec(
  label,
  value
) {
  return {
    label,
    value:
      clean(value) ||
      "—",
  };
}

function getConnection(
  detail
) {
  const tubeValue =
    getSpecValue(
      detail,
      "接管内径"
    );

  if (tubeValue) {
    return {
      label:
        "接管内径",

      value:
        tubeValue,

      sentence:
        "适配" +
        tubeValue +
        "接管内径",
    };
  }

  const threadValue =
    getSpecValue(
      detail,
      [
        "螺纹规格",
        "接管内径或螺纹",
      ]
    );

  return {
    label:
      "螺纹规格",

    value:
      threadValue ||
      "—",

    sentence:
      threadValue
        ? "采用" +
          threadValue +
          "螺纹接口"
        : "接口规格以具体型号为准",
  };
}

const stamp =
  new Date()
    .toISOString()
    .replace(
      /[-:T.Z]/g,
      ""
    )
    .slice(
      0,
      14
    );

fs.copyFileSync(
  detailPath,
  detailPath +
    ".bak_content_order_" +
    stamp
);

const details =
  JSON.parse(
    fs.readFileSync(
      detailPath,
      "utf8"
    )
  );

if (
  !Array.isArray(details) ||
  details.length === 0
) {
  throw new Error(
    "快插接头详情数据为空。"
  );
}

for (
  const detail of details
) {
  const model =
    clean(
      detail.model ||
      detail.foreachModel
    );

  const productCode =
    clean(
      detail.productCode ||
      detail.productId
    );

  const series =
    getSpecValue(
      detail,
      "产品系列"
    ) ||
    clean(
      detail.seriesName
    );

  const category =
    getSpecValue(
      detail,
      "产品类别"
    ) ||
    "快插接头";

  const gender =
    getSpecValue(
      detail,
      "公母端"
    );

  const panelMount =
    getSpecValue(
      detail,
      "安装方式"
    );

  const valved =
    getSpecValue(
      detail,
      "阀门配置"
    );

  const shape =
    getSpecValue(
      detail,
      "形状"
    );

  const material =
    getSpecValue(
      detail,
      "外壳材质"
    );

  const sealMaterial =
    getSpecValue(
      detail,
      "密封圈材质"
    );

  const connection =
    getConnection(
      detail
    );

  const productName =
    [
      series,
      gender,
      shape,
      valved,
      "快插接头",
    ]
      .filter(Boolean)
      .join("");

  const mountingSentence =
    panelMount === "穿板"
      ? "支持穿板安装"
      : panelMount === "非穿板"
        ? "采用非穿板结构"
        : panelMount
          ? "安装方式为" +
            panelMount
          : "安装方式以具体型号为准";

  const materialSentence =
    material && sealMaterial
      ? "采用" +
        material +
        "外壳和" +
        sealMaterial +
        "密封圈"
      : material
        ? "采用" +
          material +
          "外壳"
        : "";

  const descriptionParts = [
    model +
      "是一款" +
      productName,

    connection.sentence,

    materialSentence,

    mountingSentence,
  ].filter(Boolean);

  const description =
    descriptionParts.join(
      "，"
    ) +
    "。适用于需要快速拆装的设备液路连接" +
    (
      valved === "带阀"
        ? "，并可在接头断开时关闭流路"
        : ""
    ) +
    "。";

  const commonApplications = [
    "IVD设备内部液路",
    "分析仪器液路模块",

    panelMount === "穿板"
      ? "设备面板液路接口"
      : "设备内部管路连接",

    valved === "带阀"
      ? "需断开关闭流路的连接点"
      : "需频繁拆装的管路节点",
  ];

  const orderedSpecs = [
    makeSpec(
      "型号",
      model
    ),

    makeSpec(
      "商品编码",
      productCode
    ),

    makeSpec(
      "产品类别",
      category
    ),

    makeSpec(
      "产品系列",
      series
    ),

    makeSpec(
      connection.label,
      connection.value
    ),

    makeSpec(
      "公母端",
      gender
    ),

    makeSpec(
      "安装方式",
      panelMount
    ),

    makeSpec(
      "阀门配置",
      valved
    ),

    makeSpec(
      "形状",
      shape
    ),

    makeSpec(
      "外壳材质",
      material
    ),

    makeSpec(
      "密封圈材质",
      sealMaterial
    ),
  ];

  detail.name =
    productName;

  detail.title =
    productName;

  detail.productName =
    productName;

  detail.displayName =
    productName;

  detail.description =
    description;

  detail.shortDescription =
    description;

  detail.heroDescription =
    description;

  detail.commonApplications =
    commonApplications;

  detail.specs =
    orderedSpecs;

  detail.specifications =
    orderedSpecs;

  detail.specGroups = [
    {
      title:
        "技术参数",

      items:
        orderedSpecs,
    },
  ];

  detail.seo = {
    ...(
      detail.seo ||
      {}
    ),

    title:
      model +
      " " +
      productName +
      " | FOREACH",

    description:
      description,
  };
}

fs.writeFileSync(
  detailPath,
  JSON.stringify(
    details,
    null,
    2
  ) +
    "\n",
  "utf8"
);

const first =
  details[0];

console.log("");
console.log(
  "快插接头详情内容修改完成。"
);

console.log(
  "更新数量：" +
  details.length
);

console.log("");
console.log(
  "第一条产品描述："
);

console.log(
  first.description
);

console.log("");
console.log(
  "第一条常见应用："
);

console.log(
  first.commonApplications.join(
    "、"
  )
);

console.log("");
console.log(
  "规格表前两项："
);

console.log(
  first.specs[0]
);

console.log(
  first.specs[1]
);