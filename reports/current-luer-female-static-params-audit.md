# 当前接头详情静态参数检查

生成时间：2026/7/13 00:32:09

> 本次只检查当前路由文件和详情JSON，没有修改任何项目文件。

## 1. 路由文件状态

- 文件：`app/products/[category]/[slug]/[seriesSlug]/page.tsx`
- 总行数：512
- Node直接语法检查：不适用于TSX或失败
- generateStaticParams起始行：324

## 2. 当前 generateStaticParams 完整代码

```tsx
export function generateStaticParams() {
  const existingSeriesParams =
    getSeriesRouteParams();

  const hardTubeParams =
    hardTubeDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "hard-tube-fittings",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const threadToBarbedParams =
    threadToBarbedDetails.map(
      (detail) => ({
        category:
          "fittings",

        slug:
          "thread-to-barbed-fittings",

        seriesSlug:
          normalizeSegment(
            detail.slug
          ),
      })
    );

  const routeMap =
    new Map<
      string,
      {
        category: string;
        slug: string;
        seriesSlug: string;
      }
    >();

  [
    ...existingSeriesParams,
    ...hardTubeParams,
    ...threadToBarbedParams,
  ].forEach((item) => {
    const key = [
      item.category,
      item.slug,
      item.seriesSlug,
    ].join("/");

    routeMap.set(
      key,
      item
    );
  });

  return Array.from(
    routeMap.values()
  );
}
```

## 3. 路由接入标记数量

```json
{
  "luerImport": 0,
  "femaleImport": 0,
  "luerCollection": 0,
  "femaleCollection": 0,
  "luerResolve": 0,
  "femaleResolve": 0,
  "luerParams": 0,
  "femaleParams": 0,
  "spreadLuer": 0,
  "spreadFemale": 0
}
```

## 4. 四套详情数据检查

### hardTubeDetails

- 数量：147
- 空slug：0
- 重复slug：0

### threadToBarbedDetails

- 数量：101
- 空slug：0
- 重复slug：0

### luerDetails

- 数量：151
- 空slug：0
- 重复slug：0

### femaleThreadDetails

- 数量：24
- 空slug：0
- 重复slug：0

## 5. 隔离执行 generateStaticParams

执行失败：

```text
generateStaticParams-isolated.js:41
        category: string;
                        ^

SyntaxError: Unexpected token ';'
    at new Script (node:vm:117:7)
    at createScript (node:vm:269:10)
    at Object.runInNewContext (node:vm:310:10)
    at Object.<anonymous> (F:\WebsiteProjects\foreach-website-2026\scripts\products\audit-current-luer-female-static-params.cjs:408:6)
    at Module._compile (node:internal/modules/cjs/loader:1830:14)
    at Object..js (node:internal/modules/cjs/loader:1961:10)
    at Module.load (node:internal/modules/cjs/loader:1553:32)
    at Module._load (node:internal/modules/cjs/loader:1355:12)
    at wrapModuleLoad (node:internal/modules/cjs/loader:255:19)
    at Module.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:154:5)
```

## 6. 检查结论

当前 generateStaticParams 本身无法独立执行，需要根据上面的完整函数修复。

