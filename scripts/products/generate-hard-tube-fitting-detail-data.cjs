const fs = require("fs");
const path = require("path");

const root = process.cwd();

const selectionPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "hard-tube-fitting-selection.generated.ts"
);

const imageMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "hard-tube-fitting-image-map.generated.json"
);

const outputPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "hard-tube-fittings",
  "detail",
  "index.json"
);

function getText(value) {
  return String(value ?? "").trim();
}

function getLocalizedText(value) {
  if (typeof value === "string") {
    return value.trim();
  }

  if (value && typeof value === "object") {
    return getText(
      value.zh ||
      value.en ||
      Object.values(value)[0]
    );
  }

  return "";
}

function unique(values) {
  return Array.from(
    new Set(values.filter(Boolean))
  );
}

function extractExportedArray(
  source,
  exportName
) {
  const marker =
    `export const ${exportName}`;

  const markerIndex =
    source.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error(
      `找不到导出数据：${exportName}`
    );
  }

  const equalsIndex =
    source.indexOf("=", markerIndex);

  const arrayStart =
    source.indexOf("[", equalsIndex);

  if (arrayStart < 0) {
    throw new Error(
      `找不到数组起始位置：${exportName}`
    );
  }

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (
    let index = arrayStart;
    index < source.length;
    index += 1
  ) {
    const char = source[index];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        inString = false;
        quote = "";
      }

      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      quote = char;
      continue;
    }

    if (char === "[") {
      depth += 1;
      continue;
    }

    if (char === "]") {
      depth -= 1;

      if (depth === 0) {
        const jsonText =
          source.slice(
            arrayStart,
            index + 1
          );

        return JSON.parse(jsonText);
      }
    }
  }

  throw new Error(
    `数组没有正常结束：${exportName}`
  );
}

function getSubtitleValue(
  subtitle,
  label
) {
  const text =
    getLocalizedText(subtitle);

  const line = text
    .split(/\r?\n/)
    .find((item) =>
      item.trim().startsWith(label)
    );

  if (!line) {
    return "";
  }

  const separatorIndex =
    line.indexOf("：");

  if (separatorIndex < 0) {
    return "";
  }

  return line
    .slice(separatorIndex + 1)
    .trim();
}

function getSealMethod(seriesId) {
  const map = {
    "standard-flat-bottom-fitting":
      "法兰垫片底面密封",

    "compact-flat-bottom-fitting":
      "法兰垫片底面密封",

    "standard-ferrule-fitting":
      "卡箍密封",

    "compact-ferrule-fitting":
      "卡箍密封",

    "retaining-ring-fitting":
      "卡环密封",

    "high-pressure-fitting":
      "高压连接结构",
  };

  return (
    map[seriesId] ||
    "硬管连接结构"
  );
}

function getApplications(seriesId) {
  if (
    seriesId ===
    "high-pressure-fitting"
  ) {
    return [
      "高压微流体液路",
      "分析仪器",
      "样品前处理设备",
      "实验室自动化设备",
    ];
  }

  return [
    "微流体液路连接",
    "泵阀接口连接",
    "流路基板连接",
    "IVD与分析仪器",
  ];
}

function getImageData(
  model,
  product,
  imageMap
) {
  const slug =
    model.toLowerCase();

  const mapped =
    imageMap[model] ||
    imageMap[slug] ||
    {};

  const mappedImages = unique([
    ...(Array.isArray(mapped.images)
      ? mapped.images
      : []),

    mapped.imageCard,
    mapped.mainImage,
    mapped.image,
    product.imageCard,
  ]);

  const exactImage =
    mappedImages.find((imagePath) => {
      const filename =
        path.basename(imagePath)
          .toLowerCase();

      return (
        filename === `${slug}.jpg` ||
        filename === `${slug}.jpeg` ||
        filename === `${slug}.png` ||
        filename === `${slug}.webp`
      );
    });

  const mainImage =
    exactImage ||
    mapped.imageCard ||
    mapped.mainImage ||
    mapped.image ||
    mappedImages[0] ||
    product.imageCard ||
    "";

  return {
    mainImage,
    additionalImages:
      mappedImages.filter(
        (item) =>
          item &&
          item !== mainImage
      ),
  };
}

function buildFaqs({
  model,
  tubeOd,
  thread,
  material,
  seriesName,
}) {
  return [
    {
      question:
        `${model}适配多大外径的硬管？`,

      answer:
        `该型号适用于外径${tubeOd}的硬管。选型时还应确认硬管外径公差和管端处理方式。`,
    },
    {
      question:
        `${model}采用什么螺纹？`,

      answer:
        `该型号采用${thread}螺纹，安装前需要确认设备端口的螺纹和密封结构一致。`,
    },
    {
      question:
        `${material}材质如何确认液体兼容性？`,

      answer:
        `需要结合液体介质、浓度、温度、接触时间和清洗方式确认${material}的材料兼容性。`,
    },
    {
      question:
        `${seriesName}安装时需要注意什么？`,

      answer:
        "安装前应检查硬管端面、螺纹、密封件和接口端面是否洁净完整，并避免过度拧紧。",
    },
    {
      question:
        `${model}是否可以申请2D图纸？`,

      answer:
        "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。",
    },
  ];
}

if (!fs.existsSync(selectionPath)) {
  throw new Error(
    `找不到选型数据：${selectionPath}`
  );
}

const source =
  fs.readFileSync(
    selectionPath,
    "utf8"
  );

const products =
  extractExportedArray(
    source,
    "hardTubeFittingSelectionProducts"
  );

const imageMap =
  fs.existsSync(imageMapPath)
    ? JSON.parse(
        fs.readFileSync(
          imageMapPath,
          "utf8"
        )
      )
    : {};

const details =
  products.map((product) => {
    const model =
      getLocalizedText(
        product.cardTitle
      ).toUpperCase();

    const slug =
      model.toLowerCase();

    const seriesName =
      getText(
        product.filters?.filter01
      ) || "硬管接头";

    const thread =
      getText(
        product.filters?.filter02
      );

    const tubeOd =
      getSubtitleValue(
        product.cardSubtitle,
        "接管外径："
      ) ||
      getText(
        product.filters?.filter03
      )
        .split("|")
        .join("、");

    const material =
      getText(
        product.filters?.filter04
      );

    const color =
      getText(
        product.filters?.filter05
      );

    const sealMethod =
      getSealMethod(
        product.seriesId
      );

    const isHighPressure =
      product.seriesId ===
      "high-pressure-fitting";

    const media =
      getImageData(
        model,
        product,
        imageMap
      );
    const description =
      isHighPressure
        ? `${model}是一款适用于外径${tubeOd}硬管的${seriesName}，采用${thread}螺纹和${material}主体，额定耐压25 MPa，适用于分析仪器和实验室自动化设备中的高压硬管连接。`
        : `${model}是一款适用于外径${tubeOd}硬管的${seriesName}，采用${thread}螺纹、${material}主体和${sealMethod}结构，适用于微流体液路、IVD设备、分析仪器及实验室自动化系统中的硬管连接。`;

    const specs = [
      {
        label: "产品型号",
        value: model,
      },
      {
        label: "商品编码",
        value: getText(product.productId),
      },
      {
        label: "产品系列",
        value: seriesName,
      },
      {
        label: "密封方式",
        value: sealMethod,
      },
      {
        label: "螺纹规格",
        value: thread,
      },
      {
        label: "接管外径",
        value: tubeOd,
      },
      {
        label: "主体材质",
        value: material,
      },
      {
        label: "颜色",
        value: color,
      },
    ];

    if (isHighPressure) {
      specs.push({
        label: "额定压力",
        value: "25 MPa",
      });
    }

    return {
      sourceType: "fitting-detail",

      category: "fittings",
      categoryId: "fittings",
      categoryLabel: "接头系列",

      productTypeId:
        "hard-tube-fittings",

      productTypeName:
        seriesName,

      productId:
        product.productId || model,

      productCode:
        product.productId || model,

      seriesId:
        product.seriesId,

      seriesName,

      slug,
      model,

      modelDisplay: model,
      displayModel: model,
      foreachModel: model,

      name: seriesName,
      title: model,

      description,

      advantages: [
        `适配外径${tubeOd}硬管`,
        `${thread}螺纹`,
        `${material}主体`,
        sealMethod,
      ],

      commonApplications:
        getApplications(
          product.seriesId
        ),

      mainImage:
        media.mainImage,

      image:
        media.mainImage,

      heroImage:
        media.mainImage,

      imageCard:
        media.mainImage,

      additionalImages:
        media.additionalImages,

      imageAlt:
        `${model} ${seriesName} ${material}`,

      detailMode:
        "standard_model",

      hideModelAction: false,

      showConfigurator: false,
      showDatasheetRequest: false,
      showDrawingRequest: true,
      show3DRequest: false,

      drawing2dUrl: "",
      drawingPdfUrl: "",

      resources: {
        drawing2dUrl: "",
        model3dUrl: "",
      },

      specSeriesKey:
        product.seriesId,

      specs,
      specifications: specs,

      faqs: buildFaqs({
        model,
        tubeOd,
        thread,
        material,
        seriesName,
      }),

      detailHref:
        `/products/fittings/hard-tube-fittings/${slug}`,

      href:
        `/products/fittings/hard-tube-fittings/${slug}`,

      selectionHref:
        "/products/fittings/hard-tube-fittings",

      seo: {
        title:
          `${model} ${seriesName} | FOREACH`,

        description,
      },

      sectionTitleMap: {
        applications: "常见应用：",
        faq: "常见问题",
      },
    };
  })
  .filter((item) => item.model)
  .sort((a, b) =>
    a.model.localeCompare(
      b.model,
      "en"
    )
  );

if (details.length === 0) {
  throw new Error(
    "没有读取到任何硬管接头产品"
  );
}

fs.mkdirSync(
  path.dirname(outputPath),
  {
    recursive: true,
  }
);

fs.writeFileSync(
  outputPath,
  JSON.stringify(
    details,
    null,
    2
  ) + "\n",
  "utf8"
);

console.log("");
console.log(
  "===== 硬管接头详情数据已生成 ====="
);
console.log(
  `详情数量：${details.length}`
);
console.log(
  `输出文件：${outputPath}`
);
console.log(
  `首个型号：${details[0]?.model}`
);