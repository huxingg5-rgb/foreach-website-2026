# 过滤器与单向阀当前状态检查

生成时间：2026/7/13 08:00:58

> 本次只检查，没有修改任何项目文件。

## 1. 总体数量

- 过滤器选型记录：0
- 过滤器详情记录：0
- 单向阀选型记录：0
- 单向阀详情记录：0

## 2. 数据完整度

| 类型 | 数据位置 | 数量 | 空型号 | 空商品编码 | 空slug | 有图片路径 | 重复型号 |
|---|---|---:|---:|---:|---:|---:|---:|
| filters | selection | 0 | 0 | 0 | 0 | 0 | 0 |
| filters | detail | 0 | 0 | 0 | 0 | 0 | 0 |
| check-valves | selection | 0 | 0 | 0 | 0 | 0 | 0 |
| check-valves | detail | 0 | 0 | 0 | 0 | 0 | 0 |

## 3. 涉及的数据文件

未找到过滤器或单向阀选型、详情数据。

## 4. 图片路径检查

- 有图片引用的记录：0
- 图片文件真实存在：0
- 图片路径存在但文件缺失：0

## 5. 路由与合并入口

```json
{
  "mergedLabel": true,
  "filtersRouteEntry": true,
  "standaloneCheckValveRouteEntry": false,
  "standalonePlugRouteEntry": false,
  "clientMergedHelper": true,
  "clientMatchesFilters": true,
  "clientMatchesCheckValves": true,
  "dynamicRouteMentionsFilters": false,
  "dynamicRouteMentionsCheckValves": false
}
```

## 6. 产品样本

| 类型 | 数据位置 | 型号 | 商品编码 | slug | 图片 |
|---|---|---|---|---|---|

## 7. 重复型号

### filters

无。

### check-valves

无。

## 8. 下一步判定

根据报告决定后续路径：

1. 已有完整选型和详情数据：直接检查图片、文案和页面。
2. 只有选型数据：先生成详情JSON和静态路由。
3. 没有数据：从权威Excel重新生成选型与详情。
4. 有图片路径但文件缺失：先导入产品图。
5. 过滤器与单向阀继续使用两个内部productTypeId，仅在页面入口合并。

