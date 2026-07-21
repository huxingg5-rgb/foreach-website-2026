# 详情数据数组读取器检查

生成时间：2026/7/13 00:11:57

> 本次只检查当前详情生成脚本和两个选型数据文件，没有修改任何项目文件。

## 1. 详情生成脚本状态

- 文件：`scripts/products/generate-luer-female-thread-detail-data.cjs`
- 总行数：1328
- Node语法：✅ 通过

## 2. extractJsonArray完整函数

- 起始行：157
- 结束行：257

```js
function extractJsonArray(
  source,
  exportName
) {
  const marker =
    `export const ${exportName}`;

  const markerIndex =
    source.indexOf(marker);

  if (markerIndex < 0) {
    throw new Error(
      `未找到导出：${exportName}`
    );
  }

  const assignmentIndex =
    source.indexOf(
      "=",
      markerIndex
    );

  if (assignmentIndex < 0) {
    throw new Error(
      `${exportName} 没有找到赋值符号。`
    );
  }

  const arrayStart =
    source.indexOf(
      "[",
      assignmentIndex
    );

  if (arrayStart < 0) {
    throw new Error(
      `${exportName} 没有数组起点。`
    );
  }

  let depth = 0;
  let quote = "";
  let escaped = false;

  for (
    let index = arrayStart;
    index < source.length;
    index += 1
  ) {
    const char =
      source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === "\\") {
        escaped = true;
        continue;
      }

      if (char === quote) {
        quote = "";
      }

      continue;
    }

    if (
      char === '"' ||
      char === "'"
    ) {
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
        return JSON.parse(
          source.slice(
            arrayStart,
            index + 1
          )
        );
      }
    }
  }

  throw new Error(
    `${exportName} 数组没有正常结束。`
  );
}
```

## 3. 相关关键字位置

### extractJsonArray（第 157 行）

```js
  153 |     )
  154 |   );
  155 | }
  156 | 
  157 | function extractJsonArray(
  158 |   source,
  159 |   exportName
  160 | ) {
  161 |   const marker =
  162 |     `export const ${exportName}`;
  163 | 
  164 |   const markerIndex =
  165 |     source.indexOf(marker);
  166 | 
  167 |   if (markerIndex < 0) {
```

### extractJsonArray（第 1084 行）

```js
 1080 |       "utf8"
 1081 |     );
 1082 | 
 1083 |   const products =
 1084 |     extractJsonArray(
 1085 |       selectionSource,
 1086 |       target.exportName
 1087 |     );
 1088 | 
 1089 |   const rawAssetMap =
 1090 |     readJson(
 1091 |       target.assetMapPath,
 1092 |       {}
 1093 |     );
 1094 | 
```

### markerIndex（第 164 行）

```js
  160 | ) {
  161 |   const marker =
  162 |     `export const ${exportName}`;
  163 | 
  164 |   const markerIndex =
  165 |     source.indexOf(marker);
  166 | 
  167 |   if (markerIndex < 0) {
  168 |     throw new Error(
  169 |       `未找到导出：${exportName}`
  170 |     );
  171 |   }
  172 | 
  173 |   const assignmentIndex =
  174 |     source.indexOf(
```

### markerIndex（第 167 行）

```js
  163 | 
  164 |   const markerIndex =
  165 |     source.indexOf(marker);
  166 | 
  167 |   if (markerIndex < 0) {
  168 |     throw new Error(
  169 |       `未找到导出：${exportName}`
  170 |     );
  171 |   }
  172 | 
  173 |   const assignmentIndex =
  174 |     source.indexOf(
  175 |       "=",
  176 |       markerIndex
  177 |     );
```

### markerIndex（第 176 行）

```js
  172 | 
  173 |   const assignmentIndex =
  174 |     source.indexOf(
  175 |       "=",
  176 |       markerIndex
  177 |     );
  178 | 
  179 |   if (assignmentIndex < 0) {
  180 |     throw new Error(
  181 |       `${exportName} 没有找到赋值符号。`
  182 |     );
  183 |   }
  184 | 
  185 |   const arrayStart =
  186 |     source.indexOf(
```

### arrayStart（第 185 行）

```js
  181 |       `${exportName} 没有找到赋值符号。`
  182 |     );
  183 |   }
  184 | 
  185 |   const arrayStart =
  186 |     source.indexOf(
  187 |       "[",
  188 |       assignmentIndex
  189 |     );
  190 | 
  191 |   if (arrayStart < 0) {
  192 |     throw new Error(
  193 |       `${exportName} 没有数组起点。`
  194 |     );
  195 |   }
```

### arrayStart（第 191 行）

```js
  187 |       "[",
  188 |       assignmentIndex
  189 |     );
  190 | 
  191 |   if (arrayStart < 0) {
  192 |     throw new Error(
  193 |       `${exportName} 没有数组起点。`
  194 |     );
  195 |   }
  196 | 
  197 |   let depth = 0;
  198 |   let quote = "";
  199 |   let escaped = false;
  200 | 
  201 |   for (
```

### arrayStart（第 202 行）

```js
  198 |   let quote = "";
  199 |   let escaped = false;
  200 | 
  201 |   for (
  202 |     let index = arrayStart;
  203 |     index < source.length;
  204 |     index += 1
  205 |   ) {
  206 |     const char =
  207 |       source[index];
  208 | 
  209 |     if (quote) {
  210 |       if (escaped) {
  211 |         escaped = false;
  212 |         continue;
```

### arrayStart（第 246 行）

```js
  242 | 
  243 |       if (depth === 0) {
  244 |         return JSON.parse(
  245 |           source.slice(
  246 |             arrayStart,
  247 |             index + 1
  248 |           )
  249 |         );
  250 |       }
  251 |     }
  252 |   }
  253 | 
  254 |   throw new Error(
  255 |     `${exportName} 数组没有正常结束。`
  256 |   );
```

### assignmentIndex（第 173 行）

```js
  169 |       `未找到导出：${exportName}`
  170 |     );
  171 |   }
  172 | 
  173 |   const assignmentIndex =
  174 |     source.indexOf(
  175 |       "=",
  176 |       markerIndex
  177 |     );
  178 | 
  179 |   if (assignmentIndex < 0) {
  180 |     throw new Error(
  181 |       `${exportName} 没有找到赋值符号。`
  182 |     );
  183 |   }
```

### assignmentIndex（第 179 行）

```js
  175 |       "=",
  176 |       markerIndex
  177 |     );
  178 | 
  179 |   if (assignmentIndex < 0) {
  180 |     throw new Error(
  181 |       `${exportName} 没有找到赋值符号。`
  182 |     );
  183 |   }
  184 | 
  185 |   const arrayStart =
  186 |     source.indexOf(
  187 |       "[",
  188 |       assignmentIndex
  189 |     );
```

### assignmentIndex（第 188 行）

```js
  184 | 
  185 |   const arrayStart =
  186 |     source.indexOf(
  187 |       "[",
  188 |       assignmentIndex
  189 |     );
  190 | 
  191 |   if (arrayStart < 0) {
  192 |     throw new Error(
  193 |       `${exportName} 没有数组起点。`
  194 |     );
  195 |   }
  196 | 
  197 |   let depth = 0;
  198 |   let quote = "";
```

### source.indexOf（第 165 行）

```js
  161 |   const marker =
  162 |     `export const ${exportName}`;
  163 | 
  164 |   const markerIndex =
  165 |     source.indexOf(marker);
  166 | 
  167 |   if (markerIndex < 0) {
  168 |     throw new Error(
  169 |       `未找到导出：${exportName}`
  170 |     );
  171 |   }
  172 | 
  173 |   const assignmentIndex =
  174 |     source.indexOf(
  175 |       "=",
```

### source.indexOf（第 174 行）

```js
  170 |     );
  171 |   }
  172 | 
  173 |   const assignmentIndex =
  174 |     source.indexOf(
  175 |       "=",
  176 |       markerIndex
  177 |     );
  178 | 
  179 |   if (assignmentIndex < 0) {
  180 |     throw new Error(
  181 |       `${exportName} 没有找到赋值符号。`
  182 |     );
  183 |   }
  184 | 
```

### source.indexOf（第 186 行）

```js
  182 |     );
  183 |   }
  184 | 
  185 |   const arrayStart =
  186 |     source.indexOf(
  187 |       "[",
  188 |       assignmentIndex
  189 |     );
  190 | 
  191 |   if (arrayStart < 0) {
  192 |     throw new Error(
  193 |       `${exportName} 没有数组起点。`
  194 |     );
  195 |   }
  196 | 
```

## 4. 鲁尔接头选型导出结构

- 文件：`data/products/selection/luer-fitting-selection.generated.ts`
- 找到导出：是

### 导出附近代码

```ts
   15 |   ProductSelectionTaxonomyItem,
   16 | } from "./product-selection.types";
   17 | 
   18 | export const luerFittingSelectionProducts:
   19 |   ProductSelectionProduct[] =
   20 | [
   21 |   {
   22 |     "productId": "809558",
   23 |     "categoryId": "fittings",
   24 |     "productTypeId": "luer-fittings",
   25 |     "seriesId": "lsl",
   26 |     "cardTitle": {
   27 |       "zh": "LSL-16-PP-N",
   28 |       "en": "LSL-16-PP-N"
   29 |     },
   30 |     "cardSubtitle": {
   31 |       "zh": "固定公鲁尔芯子\n适配1.6mm内径软管\nPP材质",
   32 |       "en": "固定公鲁尔芯子\n适配1.6mm内径软管\nPP材质"
   33 |     },
```

### 数组定位结果

- export名称后的第一个 `[`：索引 405
- export名称后的第一个 `=`：索引 408
- 等号后的第一个 `[`：索引 410

#### export名称后的第一个 `[` 附近

```ts
[] =
[
  {
    "productId": "809558",
    "categoryId": "fittings",
    "product
```

#### 第一个 `=` 附近

```ts
=
[
  {
    "productId": "809558",
    "categoryId": "fittings",
    "productTypeId": "luer-fittings
```

#### 等号后的第一个 `[` 附近

```ts
[
  {
    "productId": "809558",
    "categoryId": "fittings",
    "productTypeI
```

## 5. 内螺纹互转接头选型导出结构

- 文件：`data/products/selection/female-thread-adapter-selection.generated.ts`
- 找到导出：是

### 导出附近代码

```ts
   16 |   ProductSelectionTaxonomyItem,
   17 | } from "./product-selection.types";
   18 | 
   19 | export const femaleThreadAdapterSelectionProducts:
   20 |   ProductSelectionProduct[] =
   21 | [
   22 |   {
   23 |     "productId": "809484",
   24 |     "categoryId": "fittings",
   25 |     "productTypeId": "female-thread-adapters",
   26 |     "seriesId": "us",
   27 |     "cardTitle": {
   28 |       "zh": "US-M6-05-AC-B",
   29 |       "en": "US-M6-05-AC-B"
   30 |     },
   31 |     "cardSubtitle": {
   32 |       "zh": "二通M6螺纹互转\n通径为0.5mm\nAC材质",
   33 |       "en": "二通M6螺纹互转\n通径为0.5mm\nAC材质"
   34 |     },
```

### 数组定位结果

- export名称后的第一个 `[`：索引 422
- export名称后的第一个 `=`：索引 425
- 等号后的第一个 `[`：索引 427

#### export名称后的第一个 `[` 附近

```ts
[] =
[
  {
    "productId": "809484",
    "categoryId": "fittings",
    "product
```

#### 第一个 `=` 附近

```ts
=
[
  {
    "productId": "809484",
    "categoryId": "fittings",
    "productTypeId": "female-thread
```

#### 等号后的第一个 `[` 附近

```ts
[
  {
    "productId": "809484",
    "categoryId": "fittings",
    "productTypeI
```

## 6. 当前初步结论

- 鲁尔接头导出名称后的第一个 `[` 位于赋值符号之前，说明它属于 TypeScript 类型声明。
- 内螺纹互转接头也存在类型声明数组，需要跳过赋值符号之前的 `[]`。

下一步应根据 extractJsonArray 的真实代码结构进行精确修改，而不是继续按固定整段文本替换。

