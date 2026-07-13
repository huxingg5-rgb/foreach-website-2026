const fs = require("fs");
const path = require("path");

const root = process.cwd();

const detailJsonPath = path.join(
  root,
  "data",
  "products",
  "generated",
  "fittings",
  "thread-to-barbed-fittings",
  "detail",
  "index.json"
);

const routeMapPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "thread-to-barbed-detail-route-map.generated.ts"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "selection",
  "ProductSelectionClient.tsx"
);

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "未找到文件：" + filePath
    );
  }

  return fs.readFileSync(
    filePath,
    "utf8"
  );
}

function backup(filePath) {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  const backupPath =
    filePath +
    ".bak_thread_to_barbed_detail_href_" +
    stamp;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  console.log(
    "已备份：" + backupPath
  );
}

const details =
  JSON.parse(
    read(detailJsonPath)
  );

if (
  !Array.isArray(details) ||
  details.length !== 101
) {
  throw new Error(
    "详情数据数量异常：" +
      (
        Array.isArray(details)
          ? details.length
          : "不是数组"
      )
  );
}

/* =========================================================
   1. 生成商品编码 → 详情地址映射
   ========================================================= */

const hrefByProductCode = {};
const hrefByModel = {};

for (const detail of details) {
  const productCode =
    String(
      detail.productCode ||
      detail.productId ||
      ""
    ).trim();

  const model =
    String(
      detail.model ||
      ""
    ).trim();

  const slug =
    String(
      detail.slug ||
      ""
    ).trim();

  if (!slug) {
    throw new Error(
      "发现空 slug：" +
        productCode +
        " / " +
        model
    );
  }

  const href =
    "/products/fittings/thread-to-barbed-fittings/" +
    slug;

  if (productCode) {
    hrefByProductCode[
      productCode
    ] = href;
  }

  if (model) {
    hrefByModel[
      model
    ] = href;
  }
}

const routeMapSource = `/*
 * 自动生成：螺纹转倒刺接头详情路由映射
 *
 * 数据源：
 * data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json
 *
 * 不要手工修改。
 */

export const threadToBarbedDetailHrefByProductCode:
  Record<string, string> =
${JSON.stringify(
  hrefByProductCode,
  null,
  2
)};

export const threadToBarbedDetailHrefByModel:
  Record<string, string> =
${JSON.stringify(
  hrefByModel,
  null,
  2
)};
`;

fs.writeFileSync(
  routeMapPath,
  routeMapSource,
  "utf8"
);

console.log(
  "已生成路由映射：" +
    routeMapPath
);

/* =========================================================
   2. 接入 ProductSelectionClient
   ========================================================= */

let clientSource =
  read(clientPath);

backup(clientPath);

const importCode = `import {
  threadToBarbedDetailHrefByModel,
  threadToBarbedDetailHrefByProductCode,
} from "@/data/products/selection/thread-to-barbed-detail-route-map.generated";`;

if (
  !clientSource.includes(
    "threadToBarbedDetailHrefByProductCode"
  )
) {
  const importAnchor =
    'import ProductCardGrid from "./ProductCardGrid";';

  if (
    !clientSource.includes(
      importAnchor
    )
  ) {
    throw new Error(
      "没有找到 ProductCardGrid import 锚点。"
    );
  }

  clientSource =
    clientSource.replace(
      importAnchor,
      importCode +
        "\n\n" +
        importAnchor
    );
}

const startMarker =
  "THREAD_TO_BARBED_DETAIL_HREF_START";

if (
  !clientSource.includes(
    startMarker
  )
) {
  const blockAnchor =
    "/* BARBED_FITTING_DETAIL_HREF_START */";

  if (
    !clientSource.includes(
      blockAnchor
    )
  ) {
    throw new Error(
      "没有找到 BARBED_FITTING_DETAIL_HREF_START 锚点。"
    );
  }

  const detailHrefBlock = `/* THREAD_TO_BARBED_DETAIL_HREF_START */

  /*
   * 螺纹转倒刺接头具体型号详情链接。
   *
   * 优先按商品编码匹配，
   * 避免相同基础型号、不同 O 圈配置产生重复地址。
   */
  {
    const rawProductTypeId =
      String(
        (product as any)
          ?.productTypeId ||
        ""
      ).trim();

    const rawExistingHref =
      String(
        (product as any)
          ?.detailHref ||
        (product as any)
          ?.href ||
        ""
      ).trim();

    const isThreadToBarbed =
      rawProductTypeId ===
        "thread-to-barbed-fittings" ||
      rawExistingHref.includes(
        "/products/fittings/thread-to-barbed-fittings"
      );

    if (isThreadToBarbed) {
      const productCode =
        String(
          (product as any)
            ?.productCode ||
          (product as any)
            ?.productId ||
          ""
        ).trim();

      const rawCardTitle =
        (product as any)
          ?.cardTitle;

      const cardTitleText =
        typeof rawCardTitle ===
        "string"
          ? rawCardTitle
          : String(
              rawCardTitle?.zh ||
              rawCardTitle?.["zh-CN"] ||
              rawCardTitle?.en ||
              ""
            ).trim();

      const model =
        String(
          (product as any)?.model ||
          (product as any)
            ?.foreachModel ||
          (product as any)
            ?.modelCode ||
          (product as any)
            ?.modelDisplay ||
          (product as any)
            ?.displayModel ||
          cardTitleText ||
          ""
        ).trim();

      const matchedHref =
        threadToBarbedDetailHrefByProductCode[
          productCode
        ] ||
        threadToBarbedDetailHrefByModel[
          model
        ];

      if (matchedHref) {
        return matchedHref;
      }

      return (
        rawExistingHref ||
        "/products/fittings/thread-to-barbed-fittings"
      );
    }
  }

  /* THREAD_TO_BARBED_DETAIL_HREF_END */

  `;

  clientSource =
    clientSource.replace(
      blockAnchor,
      detailHrefBlock +
        blockAnchor
    );
}

fs.writeFileSync(
  clientPath,
  clientSource,
  "utf8"
);

console.log(
  "已修改：" +
    clientPath
);

console.log("");
console.log("============================================");
console.log("螺纹转倒刺详情跳转接入完成");
console.log("============================================");
console.log(
  "商品编码映射：" +
    Object.keys(
      hrefByProductCode
    ).length
);
console.log(
  "型号映射：" +
    Object.keys(
      hrefByModel
    ).length
);
console.log("");
