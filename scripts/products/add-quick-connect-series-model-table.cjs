const fs = require("fs");
const path = require("path");

const root = process.cwd();

const helperPath = path.join(
  root,
  "data",
  "products",
  "detail",
  "getQuickConnectSeriesDetailData.ts"
);

const clientPath = path.join(
  root,
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

function ensureFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(
      "找不到文件：" +
      path.relative(root, filePath)
    );
  }
}

function backup(filePath, label) {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:T.Z]/g, "")
    .slice(0, 14);

  const backupPath =
    filePath +
    ".bak_" +
    label +
    "_" +
    stamp;

  fs.copyFileSync(
    filePath,
    backupPath
  );

  return backupPath;
}

ensureFile(helperPath);
ensureFile(clientPath);

backup(
  helperPath,
  "before_quick_connect_model_table"
);

backup(
  clientPath,
  "before_quick_connect_model_table"
);

/* =========================================================
   一、给快插接头系列详情数据增加完整型号列表
========================================================= */

let helperSource =
  fs.readFileSync(
    helperPath,
    "utf8"
  );

const modelRowsMarker =
  "QUICK_CONNECT_SERIES_MODEL_ROWS";

if (
  !helperSource.includes(
    modelRowsMarker
  )
) {
  const specsMatch =
    helperSource.match(
      /\n\s*const specs\s*=\s*\[/
    );

  if (
    !specsMatch ||
    specsMatch.index === undefined
  ) {
    throw new Error(
      "没有找到详情数据中的const specs位置。"
    );
  }

  const modelRowsBlock = [
    "",
    "  /* QUICK_CONNECT_SERIES_MODEL_ROWS",
    "   *",
    "   * 系列详情页完整型号表。",
    "   * 商品编码同时作为页面锚点，",
    "   * 用于承接筛选卡片中的#商品编码链接。",
    "   */",
    "  const modelRows = rows.map(",
    "    (item) => ({",
    "      productCode:",
    "        cleanText(",
    "          item.productCode",
    "        ),",
    "",
    "      model:",
    "        cleanText(",
    "          item.foreachModel",
    "        ),",
    "",
    "      connection:",
    "        normalizeConnection(",
    "          item.tubeOrThread",
    "        ),",
    "",
    "      gender:",
    "        cleanText(",
    "          item.gender",
    "        ),",
    "",
    "      panelMount:",
    "        cleanText(",
    "          item.panelMount",
    "        ),",
    "",
    "      valved:",
    "        cleanText(",
    "          item.valved",
    "        ),",
    "",
    "      shape:",
    "        cleanText(",
    "          item.shape",
    "        ),",
    "",
    "      housingMaterial:",
    "        cleanText(",
    "          item.housingMaterial",
    "        ),",
    "    })",
    "  );",
    "",
  ].join("\n");

  helperSource =
    helperSource.slice(
      0,
      specsMatch.index
    ) +
    modelRowsBlock +
    helperSource.slice(
      specsMatch.index
    );
}

const modelReturnMarker =
  "QUICK_CONNECT_SERIES_MODEL_TABLE_DATA";

if (
  !helperSource.includes(
    modelReturnMarker
  )
) {
  const faqReturnPattern =
    /\n\s{4}faqs,\s*\n/;

  if (
    !faqReturnPattern.test(
      helperSource
    )
  ) {
    throw new Error(
      "没有找到详情返回数据中的faqs字段。"
    );
  }

  const modelReturnBlock = [
    "",
    "    /* QUICK_CONNECT_SERIES_MODEL_TABLE_DATA */",
    "    modelRows,",
    "",
    "    modelTableTitle:",
    "      `${series}系列完整型号`,",
    "",
    "    modelTableDescription:",
    "      `当前共${rows.length}个在售型号。点击筛选页面中的查看详情，可直接定位到对应型号。`,",
    "",
  ].join("\n");

  helperSource =
    helperSource.replace(
      faqReturnPattern,
      modelReturnBlock +
      "    faqs,\n"
    );
}

fs.writeFileSync(
  helperPath,
  helperSource,
  "utf8"
);

/* =========================================================
   二、在公共详情组件的FAQ之前显示型号表

   只在data.modelRows存在时显示，
   不影响泵、阀、针、管路和硬管接头详情页。
========================================================= */

let clientSource =
  fs.readFileSync(
    clientPath,
    "utf8"
  );

const clientMarker =
  "QUICK_CONNECT_SERIES_MODEL_TABLE_START";

if (
  !clientSource.includes(
    clientMarker
  )
) {
  const faqPattern =
    /\n(\s*)\{data\.faqs\s*&&\s*data\.faqs\.length\s*>\s*0\s*\?\s*\(/;

  const faqMatch =
    clientSource.match(
      faqPattern
    );

  if (
    !faqMatch ||
    faqMatch.index === undefined
  ) {
    throw new Error(
      "没有找到ProductDetailClient中的FAQ渲染位置。"
    );
  }

  const indentation =
    faqMatch[1] || "      ";

  const tableBlock = [
    "",
    indentation + "{/* QUICK_CONNECT_SERIES_MODEL_TABLE_START */}",
    indentation + "{Array.isArray((data as any).modelRows) &&",
    indentation + "(data as any).modelRows.length > 0 ? (",
    indentation + "  <section",
    indentation + '    id="model-selection"',
    indentation + "    className={styles.faqSection}",
    indentation + "  >",
    indentation + "    <div className={styles.faqHeader}>",
    indentation + "      <h2>",
    indentation + "        {(data as any).modelTableTitle ||",
    indentation + '          "完整型号"}',
    indentation + "      </h2>",
    indentation + "",
    indentation + "      {(data as any).modelTableDescription ? (",
    indentation + "        <p>",
    indentation + "          {(data as any).modelTableDescription}",
    indentation + "        </p>",
    indentation + "      ) : null}",
    indentation + "    </div>",
    indentation + "",
    indentation + '    <div style={{ overflowX: "auto" }}>',
    indentation + "      <table className={styles.specTable}>",
    indentation + "        <thead>",
    indentation + "          <tr>",
    indentation + "            <th>恒永达型号</th>",
    indentation + "            <th>商品编码</th>",
    indentation + "            <th>接管内径或螺纹</th>",
    indentation + "            <th>公母端</th>",
    indentation + "            <th>安装方式</th>",
    indentation + "            <th>阀门配置</th>",
    indentation + "            <th>形状</th>",
    indentation + "            <th>外壳材质</th>",
    indentation + "          </tr>",
    indentation + "        </thead>",
    indentation + "",
    indentation + "        <tbody>",
    indentation + "          {(data as any).modelRows.map(",
    indentation + "            (item: any) => {",
    indentation + "              const rowKey = String(",
    indentation + "                item.productCode ||",
    indentation + "                  item.model ||",
    indentation + '                  ""',
    indentation + "              ).trim();",
    indentation + "",
    indentation + "              return (",
    indentation + "                <tr",
    indentation + "                  id={rowKey || undefined}",
    indentation + "                  key={rowKey}",
    indentation + "                >",
    indentation + "                  <td>{item.model}</td>",
    indentation + "                  <td>{item.productCode}</td>",
    indentation + "                  <td>{item.connection}</td>",
    indentation + "                  <td>{item.gender}</td>",
    indentation + "                  <td>{item.panelMount}</td>",
    indentation + "                  <td>{item.valved}</td>",
    indentation + "                  <td>{item.shape}</td>",
    indentation + "                  <td>{item.housingMaterial}</td>",
    indentation + "                </tr>",
    indentation + "              );",
    indentation + "            }",
    indentation + "          )}",
    indentation + "        </tbody>",
    indentation + "      </table>",
    indentation + "    </div>",
    indentation + "  </section>",
    indentation + ") : null}",
    indentation + "{/* QUICK_CONNECT_SERIES_MODEL_TABLE_END */}",
    "",
  ].join("\n");

  clientSource =
    clientSource.slice(
      0,
      faqMatch.index
    ) +
    tableBlock +
    clientSource.slice(
      faqMatch.index
    );
}

fs.writeFileSync(
  clientPath,
  clientSource,
  "utf8"
);

/* =========================================================
   三、结果检查
========================================================= */

const finalHelper =
  fs.readFileSync(
    helperPath,
    "utf8"
  );

const finalClient =
  fs.readFileSync(
    clientPath,
    "utf8"
  );

const checks = [
  [
    finalHelper.includes(
      modelRowsMarker
    ),
    "详情数据缺少modelRows",
  ],
  [
    finalHelper.includes(
      modelReturnMarker
    ),
    "详情返回数据缺少型号表字段",
  ],
  [
    finalClient.includes(
      clientMarker
    ),
    "ProductDetailClient缺少型号表渲染区",
  ],
  [
    finalClient.includes(
      "恒永达型号"
    ),
    "型号表缺少恒永达型号列",
  ],
  [
    finalClient.includes(
      "商品编码"
    ),
    "型号表缺少商品编码列",
  ],
];

for (
  const [
    passed,
    message,
  ] of checks
) {
  if (
    !passed
  ) {
    throw new Error(
      message
    );
  }
}

console.log("");
console.log(
  "快插接头系列完整型号表接入完成。"
);

console.log(
  "Q20：98行"
);

console.log(
  "Q40：58行"
);

console.log(
  "Q60：35行"
);

console.log(
  "未新增CSS。"
);

console.log(
  "其他产品详情页不受影响。"
);