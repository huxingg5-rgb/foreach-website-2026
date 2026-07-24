const fs = require("fs");
const path = require("path");
const Module = require("module");
const assert = require("assert");

const projectPath = path.resolve(process.argv[2]);
const reportPath = path.resolve(process.argv[3]);
const targetPath = path.join(
  projectPath,
  "services",
  "resources",
  "getFittingReplacementHomeData.ts"
);

const ts = require(
  path.join(projectPath, "node_modules", "typescript")
);

const reportLines = [];

function line(text = "") {
  reportLines.push(String(text));
}

function section(title) {
  line("");
  line("============================================================");
  line(title);
  line("============================================================");
}

function normalize(value) {
  return String(value ?? "")
    .trim()
    .toUpperCase();
}

function samePath(left, right) {
  return path.resolve(left).toLowerCase() ===
    path.resolve(right).toLowerCase();
}

function formatDiagnostic(diagnostic) {
  const message = ts.flattenDiagnosticMessageText(
    diagnostic.messageText,
    "\n"
  );

  if (!diagnostic.file || diagnostic.start == null) {
    return message;
  }

  const position =
    diagnostic.file.getLineAndCharacterOfPosition(
      diagnostic.start
    );

  return `${diagnostic.file.fileName}:${
    position.line + 1
  }:${position.character + 1} ${message}`;
}

line("Q20 快插接头首页桥接验证报告");
line(`生成时间：${new Date().toLocaleString("zh-CN")}`);
line(`项目路径：${projectPath}`);
line(`目标文件：${targetPath}`);

/* =========================================================
   一、TypeScript 项目级类型检查
========================================================= */

section("一、TypeScript 类型检查（只显示目标文件错误）");

const configPath = ts.findConfigFile(
  projectPath,
  ts.sys.fileExists,
  "tsconfig.json"
);

if (!configPath) {
  throw new Error("没有找到 tsconfig.json");
}

const configFile = ts.readConfigFile(
  configPath,
  ts.sys.readFile
);

if (configFile.error) {
  throw new Error(
    formatDiagnostic(configFile.error)
  );
}

const parsedConfig =
  ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(configPath)
  );

if (parsedConfig.errors.length > 0) {
  throw new Error(
    parsedConfig.errors
      .map(formatDiagnostic)
      .join("\n")
  );
}

const program = ts.createProgram({
  rootNames: parsedConfig.fileNames,
  options: parsedConfig.options,
});

const targetDiagnostics =
  ts.getPreEmitDiagnostics(program).filter(
    (diagnostic) =>
      diagnostic.file &&
      samePath(
        diagnostic.file.fileName,
        targetPath
      )
  );

if (targetDiagnostics.length > 0) {
  line(`目标文件类型错误：${targetDiagnostics.length}`);

  for (const diagnostic of targetDiagnostics) {
    line(formatDiagnostic(diagnostic));
  }

  throw new Error(
    `目标 service 存在 ${targetDiagnostics.length} 个 TypeScript 类型错误。`
  );
}

line("目标 service 没有 TypeScript 类型错误。");

/* =========================================================
   二、注册只读 TypeScript 加载器
========================================================= */

section("二、加载修改后的实际 service");

function resolveProjectModule(request) {
  const mappedBase = path.join(
    projectPath,
    request.slice(2)
  );

  const candidates = [
    mappedBase,
    `${mappedBase}.ts`,
    `${mappedBase}.tsx`,
    `${mappedBase}.js`,
    `${mappedBase}.jsx`,
    `${mappedBase}.json`,
    path.join(mappedBase, "index.ts"),
    path.join(mappedBase, "index.tsx"),
    path.join(mappedBase, "index.js"),
    path.join(mappedBase, "index.json"),
  ];

  return (
    candidates.find((candidate) =>
      fs.existsSync(candidate)
    ) || null
  );
}

const originalResolveFilename =
  Module._resolveFilename;

Module._resolveFilename = function (
  request,
  parent,
  isMain,
  options
) {
  if (
    typeof request === "string" &&
    request.startsWith("@/")
  ) {
    const resolved =
      resolveProjectModule(request);

    if (!resolved) {
      throw new Error(
        `无法解析项目别名模块：${request}`
      );
    }

    return resolved;
  }

  return originalResolveFilename.call(
    this,
    request,
    parent,
    isMain,
    options
  );
};

function registerTsExtension(extension) {
  require.extensions[extension] = function (
    module,
    filename
  ) {
    const source = fs.readFileSync(
      filename,
      "utf8"
    );

    const result = ts.transpileModule(
      source,
      {
        fileName: filename,
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.CommonJS,
          moduleResolution:
            ts.ModuleResolutionKind.NodeJs,
          esModuleInterop: true,
          resolveJsonModule: true,
          jsx: ts.JsxEmit.ReactJSX,
        },
        reportDiagnostics: true,
      }
    );

    const syntaxErrors =
      (result.diagnostics || []).filter(
        (diagnostic) =>
          diagnostic.category ===
          ts.DiagnosticCategory.Error
      );

    if (syntaxErrors.length > 0) {
      throw new Error(
        syntaxErrors
          .map(formatDiagnostic)
          .join("\n")
      );
    }

    module._compile(
      result.outputText,
      filename
    );
  };
}

registerTsExtension(".ts");
registerTsExtension(".tsx");

const homeService = require(targetPath);

const selectionData = require(
  path.join(
    projectPath,
    "data",
    "products",
    "selection",
    "quick-connect-fitting-selection.generated.ts"
  )
);

const replacementData = require(
  path.join(
    projectPath,
    "data",
    "resources",
    "fitting-replacement",
    "all-compatible-products.generated.ts"
  )
);

const detailService = require(
  path.join(
    projectPath,
    "services",
    "resources",
    "getFittingReplacementDetailData.ts"
  )
);

const formalProducts =
  selectionData
    .quickConnectFittingSelectionProducts;

const originalReplacementProducts =
  replacementData
    .fittingReplacementAllCompatibleProducts;

const actualProducts =
  homeService
    .getFittingReplacementHomeProducts(
      "q20"
    );

line("实际 service 加载成功。");

/* =========================================================
   三、基础数量
========================================================= */

section("三、基础数量");

const formalQ20AllProducts =
  formalProducts.filter(
    (product) =>
      normalize(product.productTypeId) ===
        "QUICK-CONNECT-FITTINGS" &&
      normalize(product.seriesId) ===
        "Q20"
  );

const formalQ20Products =
  formalQ20AllProducts.filter(
    (product) =>
      normalize(product.status) ===
        "ACTIVE"
  );

const formalQ20InactiveProducts =
  formalQ20AllProducts.filter(
    (product) =>
      normalize(product.status) !==
        "ACTIVE"
  );

line(`产品中心正式快插总数：${formalProducts.length}`);
line(`产品中心 Q20 总数：${formalQ20AllProducts.length}`);
line(`产品中心 Active Q20：${formalQ20Products.length}`);
line(`产品中心非 Active Q20：${formalQ20InactiveProducts.length}`);
line(
  `原替代模块全部产品：${originalReplacementProducts.length}`
);
line(`修改后首页产品：${actualProducts.length}`);

assert.strictEqual(
  formalQ20AllProducts.length,
  98,
  "产品中心 Q20 总数不是 98"
);

assert.strictEqual(
  formalQ20Products.length,
  88,
  "产品中心 Active Q20 数量不是 88"
);

assert.strictEqual(
  formalQ20InactiveProducts.length,
  10,
  "产品中心非 Active Q20 数量不是 10"
);

assert.strictEqual(
  actualProducts.length,
  originalReplacementProducts.length,
  "桥接后改变了替代模块产品总数"
);

/* =========================================================
   四、建立正式 Q20 索引
========================================================= */

const formalByCode = new Map();
const formalByModel = new Map();

for (const product of formalQ20Products) {
  const code = normalize(
    product.productCode ||
      product.productId
  );

  const model = normalize(
    product.foreachModel ||
      product.model
  );

  if (code) {
    assert.ok(
      !formalByCode.has(code),
      `产品中心 Q20 商品编码重复：${code}`
    );

    formalByCode.set(code, product);
  }

  if (model) {
    assert.ok(
      !formalByModel.has(model),
      `产品中心 Q20 型号重复：${model}`
    );

    formalByModel.set(model, product);
  }
}

/* =========================================================
   五、逐条核对桥接结果
========================================================= */

section("四、Q20 实际桥接结果");

let expectedBridgeCount = 0;
let actualBridgeCount = 0;
let unchangedOtherCount = 0;

const bridgeFailures = [];
const missingImages = [];
const invalidDetailHrefs = [];
const bridgedCodes = new Set();

for (
  let index = 0;
  index < originalReplacementProducts.length;
  index += 1
) {
  const original =
    originalReplacementProducts[index];

  const actual =
    actualProducts[index];

  assert.ok(
    actual,
    `修改后缺少第 ${index} 条产品`
  );

  assert.strictEqual(
    normalize(actual.productCode),
    normalize(original.productCode),
    `第 ${index} 条商品编码顺序或内容改变`
  );

  const byCode = formalByCode.get(
    normalize(original.productCode)
  );

  const byModel = formalByModel.get(
    normalize(original.foreachModel)
  );

  const shouldBridge =
    Boolean(byCode) &&
    Boolean(byModel) &&
    byCode === byModel;

  if (shouldBridge) {
    expectedBridgeCount += 1;

    const expectedCode = String(
      byCode.productCode ||
        byCode.productId
    ).trim();

    const expectedModel = String(
      byCode.foreachModel ||
        byCode.model
    ).trim();

    const expectedImage =
      String(byCode.imageCard || "").trim();

    const expectedDetailHref =
      `/resources/selection-support/fitting-replacement/q20/${encodeURIComponent(
        expectedCode
      )}`;

    const checks = {
      productCode:
        actual.productCode ===
        expectedCode,

      foreachModel:
        actual.foreachModel ===
        expectedModel,

      imagePath:
        actual.imagePath ===
        expectedImage,

      detailHref:
        actual.detailHref ===
        expectedDetailHref,

      competitorModels:
        JSON.stringify(
          actual.competitorModels
        ) ===
        JSON.stringify(
          original.competitorModels
        ),
    };

    if (
      Object.values(checks).every(Boolean)
    ) {
      actualBridgeCount += 1;
      bridgedCodes.add(expectedCode);
    } else {
      bridgeFailures.push({
        productCode: original.productCode,
        foreachModel:
          original.foreachModel,
        checks,
        expectedImage,
        actualImage: actual.imagePath,
        expectedDetailHref,
        actualDetailHref:
          actual.detailHref,
      });
    }

    if (
      !actual.detailHref ||
      actual.detailHref !==
        expectedDetailHref
    ) {
      invalidDetailHrefs.push({
        productCode: expectedCode,
        detailHref:
          actual.detailHref || "",
      });
    }

    if (expectedImage) {
      const imageFilePath = path.join(
        projectPath,
        "public",
        expectedImage.replace(
          /^\/+/,
          ""
        )
      );

      if (!fs.existsSync(imageFilePath)) {
        missingImages.push({
          productCode: expectedCode,
          imagePath: expectedImage,
          filePath: imageFilePath,
        });
      }
    }
  } else {
    /*
      其他接头不应因本次 Q20 桥接改变字段内容。
    */
    try {
      assert.deepStrictEqual(
        actual,
        original
      );

      unchangedOtherCount += 1;
    } catch {
      bridgeFailures.push({
        productCode: original.productCode,
        foreachModel:
          original.foreachModel,
        reason:
          "非 Q20 产品内容发生变化",
      });
    }
  }
}

line(`预期可桥接 Q20：${expectedBridgeCount}`);
line(`实际完整桥接 Q20：${actualBridgeCount}`);
line(`保持不变的其他接头：${unchangedOtherCount}`);
line(`桥接失败：${bridgeFailures.length}`);
line(`主图文件缺失：${missingImages.length}`);
line(`详情链接异常：${invalidDetailHrefs.length}`);

assert.strictEqual(
  expectedBridgeCount,
  84,
  "根据当前正式数据计算出的可桥接 Q20 不是 84 条"
);

assert.strictEqual(
  actualBridgeCount,
  84,
  "实际完整桥接的 Q20 不是 84 条"
);

assert.strictEqual(
  bridgeFailures.length,
  0,
  "存在桥接错误或其他接头被改变"
);

assert.strictEqual(
  missingImages.length,
  0,
  "存在正式 Q20 主图文件缺失"
);

assert.strictEqual(
  invalidDetailHrefs.length,
  0,
  "存在 Q20 详情链接异常"
);

/* =========================================================
   六、未配置竞品关系的正式 Q20
========================================================= */

section("五、未配置竞品关系的正式 Q20");

const originalReplacementKeySet = new Set(
  originalReplacementProducts.map(
    (product) =>
      `${normalize(product.productCode)}::${normalize(
        product.foreachModel
      )}`
  )
);

const formalQ20ActiveWithoutReplacement =
  formalQ20Products.filter(
    (product) => {
      const code = normalize(
        product.productCode ||
          product.productId
      );

      const model = normalize(
        product.foreachModel ||
          product.model
      );

      return !originalReplacementKeySet.has(
        `${code}::${model}`
      );
    }
  );

const formalQ20AllWithoutReplacement =
  formalQ20AllProducts.filter(
    (product) => {
      const code = normalize(
        product.productCode ||
          product.productId
      );

      const model = normalize(
        product.foreachModel ||
          product.model
      );

      return !originalReplacementKeySet.has(
        `${code}::${model}`
      );
    }
  );

const inactiveBridgedProducts =
  formalQ20InactiveProducts.filter(
    (product) =>
      bridgedCodes.has(
        String(
          product.productCode ||
            product.productId ||
            ""
        ).trim()
      )
  );

line(
  `Active Q20 中未配置竞品关系：${formalQ20ActiveWithoutReplacement.length}`
);

line(
  `全部 Q20 中未配置竞品关系：${formalQ20AllWithoutReplacement.length}`
);

line(
  `非 Active Q20 被桥接：${inactiveBridgedProducts.length}`
);

line("");
line("全部未配置竞品关系的 Q20：");

for (
  const product of
    formalQ20AllWithoutReplacement
) {
  line(
    `- ${
      product.productCode ||
      product.productId
    } | ${
      product.foreachModel ||
      product.model
    } | status=${product.status}`
  );
}

assert.strictEqual(
  formalQ20ActiveWithoutReplacement.length,
  4,
  "Active Q20 中未配置竞品关系的数量不是 4"
);

assert.strictEqual(
  formalQ20AllWithoutReplacement.length,
  14,
  "全部 Q20 中未配置竞品关系的数量不是 14"
);

assert.strictEqual(
  inactiveBridgedProducts.length,
  0,
  "存在非 Active Q20 被错误桥接"
);

/*
  确认这 14 条没有被伪造成替代记录。
*/
for (
  const product of
    formalQ20AllWithoutReplacement
) {
  const code = normalize(
    product.productCode ||
      product.productId
  );

  const model = normalize(
    product.foreachModel ||
      product.model
  );

  const found = actualProducts.some(
    (item) =>
      normalize(item.productCode) === code &&
      normalize(item.foreachModel) === model
  );

  assert.strictEqual(
    found,
    false,
    `无竞品关系的正式 Q20 被错误加入替代模块：${code} ${model}`
  );
}

/* =========================================================
   七、详情路由静态参数
========================================================= */

section("六、Q20 替代详情路由");

const staticParams =
  detailService
    .getFittingReplacementDetailStaticParams(
      "q20"
    );

const staticCodeSet = new Set(
  staticParams.map((item) =>
    normalize(item.productCode)
  )
);

let missingStaticRouteCount = 0;

for (const code of bridgedCodes) {
  if (
    !staticCodeSet.has(
      normalize(code)
    )
  ) {
    line(
      `缺少静态详情路由：${code}`
    );

    missingStaticRouteCount += 1;
  }
}

line(`Q20 详情静态参数：${staticParams.length}`);
line(
  `已桥接产品缺少静态详情路由：${missingStaticRouteCount}`
);

assert.strictEqual(
  missingStaticRouteCount,
  0,
  "存在桥接后的 Q20 没有静态详情路由"
);

/* =========================================================
   八、最终结论
========================================================= */

section("七、最终结论");

line("验证通过：");
line("1. 目标 service 没有 TypeScript 类型错误。");
line("2. 84 条 Q20 全部使用产品中心正式主图。");
line("3. 84 条 Q20 详情链接全部正确。");
line("4. 84 条 Q20 都有替代详情静态路由。");
line("5. Q20 总数 98，其中 Active 88、非 Active 10。");
line("6. Active Q20 中 84 条有竞品关系，4 条没有竞品关系。");
line("7. 全部 Q20 中 14 条没有竞品关系，均未被伪造加入。");
line("8. 非 Active Q20 没有被桥接。");
line("9. 其他接头数据没有被本次桥接改变。");
line("10. Q40、Q60 没有生成虚假的替代关系。");
line("");
line("本次只读取，没有修改网站源码。");

fs.writeFileSync(
  reportPath,
  reportLines.join("\r\n"),
  "utf8"
);

console.log(
  reportLines.join("\n")
);