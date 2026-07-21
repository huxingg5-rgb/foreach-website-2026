const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targetPath = path.join(
  root,
  "scripts",
  "products",
  "integrate-female-thread-adapter-selection.cjs"
);

if (!fs.existsSync(targetPath)) {
  throw new Error(
    "未找到接入脚本：" +
      targetPath
  );
}

let source = fs.readFileSync(
  targetPath,
  "utf8"
);

const startMarker =
  "  const luerDisabledAnchor =";

const endMarker =
  "  const femaleDisabledCode = `";

const startIndex =
  source.indexOf(startMarker);

const endIndex =
  source.indexOf(
    endMarker,
    startIndex
  );

if (
  startIndex < 0 ||
  endIndex < 0
) {
  throw new Error(
    "没有找到需要修正的旧锚点代码。"
  );
}

const replacement = [
  '  /*',
  '   * 查找鲁尔接头联动逻辑所在位置。',
  '   *',
  '   * 当前项目中的标记可能是多行注释，',
  '   * 因此不能只查找完整的单行注释。',
  '   */',
  '  const luerMarkerIndex =',
  '    clientSource.indexOf(',
  '      "LUER_FILTER_OPTION_DISABLED_START"',
  '    );',
  '',
  '  let anchorIndex = -1;',
  '',
  '  if (luerMarkerIndex >= 0) {',
  '    const commentStart =',
  '      clientSource.lastIndexOf(',
  '        "/*",',
  '        luerMarkerIndex',
  '      );',
  '',
  '    anchorIndex =',
  '      commentStart >= 0',
  '        ? commentStart',
  '        : luerMarkerIndex;',
  '  }',
  '',
  '  /*',
  '   * 兼容旧代码中没有标记、',
  '   * 但已经存在鲁尔接头判断的情况。',
  '   */',
  '  if (anchorIndex < 0) {',
  '    const functionStart =',
  '      clientSource.indexOf(',
  '        "function isProductFilterOptionDisabled("',
  '      );',
  '',
  '    if (functionStart >= 0) {',
  '      const functionSource =',
  '        clientSource.slice(',
  '          functionStart',
  '        );',
  '',
  '      const luerConditionPattern =',
  '        /if\\s*\\(\\s*activeProductTypeId\\s*===\\s*"luer-fittings"\\s*\\)\\s*\\{/;',
  '',
  '      const luerConditionMatch =',
  '        functionSource.match(',
  '          luerConditionPattern',
  '        );',
  '',
  '      if (',
  '        luerConditionMatch &&',
  '        luerConditionMatch.index != null',
  '      ) {',
  '        anchorIndex =',
  '          functionStart +',
  '          luerConditionMatch.index;',
  '      }',
  '    }',
  '  }',
  '',
  '  if (anchorIndex < 0) {',
  '    throw new Error(',
  '      "没有找到筛选联动逻辑插入位置。"',
  '    );',
  '  }',
  '',
].join("\n");

source =
  source.slice(
    0,
    startIndex
  ) +
  replacement +
  source.slice(
    endIndex
  );

fs.writeFileSync(
  targetPath,
  source,
  "utf8"
);

console.log("");
console.log(
  "内螺纹互转接头接入脚本锚点已修正。"
);
console.log("");
