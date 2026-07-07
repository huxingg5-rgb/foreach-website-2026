/* =========================================================
   selection-cart.types.ts
   恒永达官网｜全局选型清单类型定义

   文件路径：
   components/selection-cart/selection-cart.types.ts

   作用：
   1. 定义全站统一选型清单的数据结构
   2. 后续接头、泵、阀、传感器等产品都可以加入同一个清单
   3. 当前先服务：接头型号替代查询
========================================================= */

/* 清单来源类型
   说明：
   后续如果增加泵、阀、传感器，可以继续扩展字符串。
*/
export type SelectionCartSourceType =
  | "fitting-replacement"
  | "pump-selection"
  | "valve-selection"
  | "sensor-selection"
  | "custom";

/* 全局清单单项 */
export interface SelectionCartItem {
  /* 全局唯一 ID，建议格式：sourceType:productCode */
  id: string;

  /* 来源模块 */
  sourceType: SelectionCartSourceType;

  /* 来源模块中文名称，例如：接头型号替代查询 */
  sourceLabel: string;

  /* 产品分类名称，例如：Q20 快插接头 */
  productName: string;

  /* 商品编码，例如：839034 */
  productCode: string;

  /* 恒永达型号，例如：Q2001-PNV-SACN */
  foreachModel: string;

  /* 兼容编码，例如：A0015 / B0004 / C0004 */
  competitorModels: string[];

  /* 数量 */
  quantity: number;

  /* 是否需要 2D 图纸 */
  needDrawing: boolean;

  /* 产品详情页链接 */
  detailHref?: string;

  /* 产品图片路径 */
  imagePath?: string;
}

/* 加入清单时的输入结构
   说明：
   id 和 quantity 可以自动补齐。
*/
export type SelectionCartItemInput = Omit<
  SelectionCartItem,
  "id" | "quantity"
> & {
  id?: string;
  quantity?: number;
}; 
