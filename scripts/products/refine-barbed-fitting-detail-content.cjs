const fs = require("fs");
const path = require("path");

const root = process.cwd();

const detailPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "barbed-fittings",
  "detail",
  "index.json"
);

if (!fs.existsSync(detailPath)) {
  throw new Error(
    `Detail data not found: ${detailPath}`
  );
}

function text(value) {
  return String(value ?? "").trim();
}

function getSpec(
  detail,
  label
) {
  const specs =
    Array.isArray(detail.specs)
      ? detail.specs
      : [];

  return specs.find(
    (item) =>
      text(item?.label) === label
  );
}

function getSpecValue(
  detail,
  label
) {
  return text(
    getSpec(
      detail,
      label
    )?.value
  );
}

function inferStructure(
  detail
) {
  const specStructure =
    getSpecValue(
      detail,
      "产品结构"
    );

  if (specStructure) {
    return specStructure;
  }

  const source =
    [
      detail.name,
      detail.title,
      detail.productName,
    ]
      .map(text)
      .join(" ");

  if (source.includes("十字")) {
    return "十字型";
  }

  if (source.includes("π型")) {
    return "π型";
  }

  if (source.includes("T型")) {
    return "T型";
  }

  if (source.includes("Y型")) {
    return "Y型";
  }

  if (source.includes("L型")) {
    return "L型";
  }

  if (
    source.includes("堵头")
  ) {
    return "倒刺堵头";
  }

  return "直通型";
}

function getDiameterSpecs(
  detail
) {
  const specs =
    Array.isArray(detail.specs)
      ? detail.specs
      : [];

  return specs
    .filter(
      (item) =>
        /^接管内径\d*$/.test(
          text(item?.label)
        )
    )
    .sort(
      (current, next) => {
        const currentMatch =
          text(
            current.label
          ).match(/\d+$/);

        const nextMatch =
          text(
            next.label
          ).match(/\d+$/);

        const currentIndex =
          currentMatch
            ? Number(
                currentMatch[0]
              )
            : 0;

        const nextIndex =
          nextMatch
            ? Number(
                nextMatch[0]
              )
            : 0;

        return (
          currentIndex -
          nextIndex
        );
      }
    );
}

function normalizeSize(
  value
) {
  const matched =
    text(value).match(
      /\d+(?:\.\d+)?/
    );

  return matched
    ? `${matched[0]} mm`
    : text(value);
}

function formatMultiSizes(
  sizes
) {
  const values =
    sizes
      .map(
        (size) =>
          normalizeSize(
            size
          ).replace(
            /\s*mm$/i,
            ""
          )
      )
      .filter(Boolean);

  return values.length
    ? `${values.join(" / ")} mm`
    : "";
}

function formatTubeRange(
  structure,
  sizes,
  isReducer
) {
  const validSizes =
    sizes
      .map(normalizeSize)
      .filter(Boolean);

  if (
    validSizes.length === 0
  ) {
    return "软管";
  }

  if (!isReducer) {
    return (
      `${validSizes[0]}` +
      "内径软管"
    );
  }

  if (
    structure === "直通型" ||
    structure === "L型"
  ) {
    return (
      `${validSizes[0]}` +
      "转" +
      `${validSizes[1]}` +
      "内径软管"
    );
  }

  return (
    formatMultiSizes(
      validSizes
    ) +
    "内径软管"
  );
}

function buildDescription({
  model,
  productName,
  structure,
  tubeRange,
  material,
  color,
  isReducer,
}) {
  const materialText =
    material
      ? `采用${material}材质`
      : "主体材质以当前规格为准";

  const colorText =
    color
      ? `，颜色为${color}`
      : "";

  const ending =
    `${materialText}${colorText}。` +
    "选型时应结合软管材质、硬度、尺寸公差及实际装配要求确认匹配性。";

  if (
    structure === "直通型"
  ) {
    return isReducer
      ? `${model}是一款${productName}，用于不同内径软管之间的直线过渡连接。两端分别适配${tubeRange}，可用于仪器内部管径转换和液路转接。${ending}`
      : `${model}是一款${productName}，用于同一规格软管的直线连接和管路延长。两端均适配${tubeRange}，适合仪器内部需要保持直线走管的连接位置。${ending}`;
  }

  if (
    structure === "L型"
  ) {
    return isReducer
      ? `${model}是一款${productName}，用于改变软管走向并完成不同内径软管之间的过渡连接。两端分别适配${tubeRange}，适合安装空间受限或需要转角布管的位置。${ending}`
      : `${model}是一款${productName}，用于改变软管走向，减少连接位置对直线安装空间的要求。两端均适配${tubeRange}，适合仪器内部转角管路连接。${ending}`;
  }

  if (
    structure === "T型"
  ) {
    return `${model}是一款${productName}，用于三路软管的分流、汇流和支路连接。三个接管端适配${tubeRange}，可用于试剂管路、清洗管路以及仪器内部支路布置。${ending}`;
  }

  if (
    structure === "Y型"
  ) {
    return `${model}是一款${productName}，用于三路软管的分流、汇流和支路连接。三个接管端适配${tubeRange}，适合需要Y型支路布置的仪器内部液路。${ending}`;
  }

  if (
    structure === "π型"
  ) {
    return `${model}是一款${productName}，用于四路软管的多支路连接、液路分配和汇流。各接管端适配${tubeRange}，适合仪器内部多通道管路布置。${ending}`;
  }

  if (
    structure === "十字型"
  ) {
    return `${model}是一款${productName}，用于四路软管的交叉分配、汇流和多支路连接。各接管端适配${tubeRange}，适合试剂、清洗及仪器内部多通道液路布置。${ending}`;
  }

  if (
    structure === "倒刺堵头"
  ) {
    return `${model}是一款倒刺堵头，用于封堵${tubeRange}端部或暂时关闭预留支路。可用于设备装配、调试、维护及运输过程中的管路封闭。${ending}`;
  }

  return `${model}是一款${productName}，适配${tubeRange}连接。${ending}`;
}

function buildApplications(
  structure,
  isReducer
) {
  if (
    structure === "直通型"
  ) {
    return isReducer
      ? [
          "不同内径软管过渡连接",
          "仪器内部管径转换",
          "泵阀接口与软管适配",
          "液路直线转接",
        ]
      : [
          "同规格软管直线连接",
          "仪器内部管路延长",
          "泵阀与软管连接",
          "液路直线转接",
        ];
  }

  if (
    structure === "L型"
  ) {
    return [
      "软管转向连接",
      "有限空间管路布置",
      "泵阀周边液路连接",
      "仪器内部转角管路",
    ];
  }

  if (
    structure === "T型"
  ) {
    return [
      "三路软管分流与汇流",
      "试剂与清洗液路分配",
      "仪器内部支路连接",
      "泵阀管路连接",
    ];
  }

  if (
    structure === "Y型"
  ) {
    return [
      "三路软管分流与汇流",
      "样品与试剂支路连接",
      "仪器内部支路布置",
      "实验室自动化液路",
    ];
  }

  if (
    structure === "π型" ||
    structure === "十字型"
  ) {
    return [
      "四路软管分配与汇流",
      "多支路液路连接",
      "试剂与清洗液路分配",
      "仪器内部多通道布置",
    ];
  }

  if (
    structure === "倒刺堵头"
  ) {
    return [
      "软管端部封堵",
      "预留支路临时关闭",
      "设备维护期间管路封闭",
      "运输与装配过程防护",
    ];
  }

  return [
    "仪器内部软管连接",
    "液路转接",
    "泵阀管路连接",
    "实验室自动化设备",
  ];
}

function reorderSpecs(
  detail
) {
  const specs =
    Array.isArray(detail.specs)
      ? detail.specs
      : [];

  const fixedLabels = [
    "型号",
    "商品编码",
    "产品类别",
    "产品结构",
    "接口形式",
  ];

  const endingLabels = [
    "材质",
    "颜色",
  ];

  const used =
    new Set();

  const result = [];

  fixedLabels.forEach(
    (label) => {
      const item =
        specs.find(
          (spec) =>
            text(
              spec?.label
            ) === label
        );

      if (item) {
        result.push(item);
        used.add(item);
      }
    }
  );

  getDiameterSpecs(
    detail
  ).forEach(
    (item) => {
      result.push(item);
      used.add(item);
    }
  );

  endingLabels.forEach(
    (label) => {
      const item =
        specs.find(
          (spec) =>
            text(
              spec?.label
            ) === label
        );

      if (item) {
        result.push(item);
        used.add(item);
      }
    }
  );

  specs.forEach(
    (item) => {
      if (!used.has(item)) {
        result.push(item);
      }
    }
  );

  return result;
}

const details =
  JSON.parse(
    fs.readFileSync(
      detailPath,
      "utf8"
    )
  );

if (
  !Array.isArray(details)
) {
  throw new Error(
    "Barbed fitting detail JSON must be an array."
  );
}

details.forEach(
  (detail) => {
    const model =
      text(
        detail.model ||
        detail.modelDisplay ||
        detail.productId
      );

    const productName =
      text(
        detail.name ||
        detail.productName ||
        detail.title
      );

    const structure =
      inferStructure(
        detail
      );

    const diameterSpecs =
      getDiameterSpecs(
        detail
      );

    const sizes =
      diameterSpecs
        .map(
          (item) =>
            text(item.value)
        )
        .filter(Boolean);

    const uniqueSizes =
      Array.from(
        new Set(
          sizes.map(
            normalizeSize
          )
        )
      );

    const isReducer =
      productName.includes(
        "异径"
      ) ||
      uniqueSizes.length > 1;

    const material =
      getSpecValue(
        detail,
        "材质"
      );

    const color =
      getSpecValue(
        detail,
        "颜色"
      );

    const tubeRange =
      formatTubeRange(
        structure,
        sizes,
        isReducer
      );

    const description =
      buildDescription({
        model,
        productName,
        structure,
        tubeRange,
        material,
        color,
        isReducer,
      });

    const orderedSpecs =
      reorderSpecs(
        detail
      );

    detail.description =
      description;

    detail.shortDescription =
      description;

    detail.heroDescription =
      description;

    detail.commonApplications =
      buildApplications(
        structure,
        isReducer
      );

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

    if (
      detail.seo &&
      typeof detail.seo ===
        "object"
    ) {
      detail.seo.description =
        description;
    }
  }
);

fs.writeFileSync(
  detailPath,
  JSON.stringify(
    details,
    null,
    2
  ) + "\n",
  "utf8"
);

console.log("");
console.log(
  `Refined detail records: ${details.length}`
);
console.log(
  "Descriptions expanded."
);
console.log(
  "Applications updated by structure."
);
console.log(
  "Specification order updated."
);