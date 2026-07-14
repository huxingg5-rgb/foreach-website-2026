# 内螺纹互转生成脚本污染检查

生成时间：2026/7/12 23:28:15

> 本次只检查，没有修改或恢复任何文件。

## 1. 当前生成脚本

- 文件：`F:\WebsiteProjects\foreach-website-2026\scripts\products\generate-female-thread-adapter-selection-and-assets.cjs`
- 文件大小：20531 bytes
- 总行数：1191
- Node 语法检查：❌ 失败
- 可疑 PowerShell 内容：2 处

### Node 语法错误

```text
F:\WebsiteProjects\foreach-website-2026\scripts\products\generate-female-thread-adapter-selection-and-assets.cjs:235
    $m.Value + @'
               ^

SyntaxError: Invalid or unexpected token
    at wrapSafe (node:internal/modules/cjs/loader:1763:18)
    at checkSyntax (node:internal/main/check_syntax:76:3)

Node.js v24.15.0
```

## 2. 第 235 行附近

```text
  215 |   };
  216 | }
  217 | 
  218 | function countBy(items, getter) {
  219 |   const result = {};
  220 | 
  221 |   for (const item of items) {
  222 |     const key =
  223 |       text(getter(item)) ||
  224 |       "（空）";
  225 | 
  226 |     result[key] =
  227 |       (result[key] || 0) + 1;
  228 |   }
  229 | 
  230 |   return result;
  231 | }
  232 | 
  233 | 
  234 |     param($m)
  235 |     $m.Value + @'
  236 | 
  237 | const structureGroupMap = {
  238 |   US: "二通",
  239 |   PMU: "二通",
  240 |   U: "二通",
  241 |   PMBSN: "二通",
  242 |   PU: "二通",
  243 |   UT: "三通",
  244 |   UY: "三通",
  245 |   PUT: "三通",
  246 | };
  247 | '@
  248 |   
  249 | 
  250 | const threadMap = {
  251 |   M6: "M6",
  252 |   M12: "M12",
  253 |   U28: "1/4-28 UNF",
  254 |   U32: "10-32 UNF",
  255 | };
  256 | 
  257 | const diameterMap = {
  258 |   "05": "0.5 mm",
  259 |   "08": "0.8 mm",
  260 |   "10": "1.0 mm",
  261 |   "15": "1.5 mm",
  262 |   "20": "2.0 mm",
  263 | };
  264 | 
  265 | const colorMap = {
```

## 3. 可疑内容

| 行号 | 类型 | 内容 |
|---:|---|---|
| 234 | PowerShell 变量 | `param($m)` |
| 235 | PowerShell 变量 | `$m.Value + @'` |

## 4. 现有备份语法检查

| 备份文件 | 修改时间 | 大小 | Node语法 | 可疑内容 |
|---|---|---:|---|---:|
| generate-female-thread-adapter-selection-and-assets.cjs.bak_force_filter01_20260712152644 | 2026/7/12 23:20:43 | 20065 | ❌ 失败 | 2 |
| generate-female-thread-adapter-selection-and-assets.cjs.bak_force_structure_20260712152433 | 2026/7/12 23:20:43 | 20065 | ❌ 失败 | 2 |
| generate-female-thread-adapter-selection-and-assets.cjs.bak_structure_groups_20260712152043 | 2026/7/12 23:20:34 | 20065 | ❌ 失败 | 2 |
| generate-female-thread-adapter-selection-and-assets.cjs.bak_structure_groups_20260712152034 | 2026/7/12 23:19:40 | 20065 | ❌ 失败 | 2 |
| generate-female-thread-adapter-selection-and-assets.cjs.bak_simplify_structure_20260712_231940 | 2026/7/12 23:17:08 | 19959 | ❌ 失败 | 0 |
| generate-female-thread-adapter-selection-and-assets.cjs.bak_before_female_thread_integration_20260712151708 | 2026/7/12 23:15:03 | 19959 | ❌ 失败 | 0 |
| generate-female-thread-adapter-selection-and-assets.cjs.bak_before_female_thread_integration_20260712151503 | 2026/7/12 23:08:22 | 19557 | ❌ 失败 | 0 |

## 5. 最近的有效备份

未找到通过 Node 语法检查的备份。

## 6. 检查结论

当前生成脚本已损坏，并且没有找到语法正常的备份，需要根据脚本结构重建损坏区域。

