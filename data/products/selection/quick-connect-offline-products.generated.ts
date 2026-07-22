/* =========================================================
   快插接头临时下架清单
   原因：无图片、图片文件缺失或多个产品复用同一张图片
   数量：16
   生成时间：2026-07-20T10:03:12.567Z
========================================================= */

export const QUICK_CONNECT_OFFLINE_PRODUCT_KEYS = new Set<string>(
  [
  "839091",
  "839092",
  "839097",
  "839104",
  "839105",
  "839106",
  "839107",
  "839108",
  "839109",
  "839110",
  "849018",
  "849052",
  "869005",
  "869009",
  "869025",
  "869029",
  "Q2002-PNV-SACF",
  "Q2002-SNV-SACF",
  "Q2018T-SNV-SACN",
  "Q2018T-SNV-SPPE",
  "Q2018T-SNX-SACN",
  "Q2018T-SNX-SPPE",
  "Q2028U-PNV-SACN",
  "Q2028U-PNV-SPPE",
  "Q2028U-SMV-SACN",
  "Q2028U-SMV-SPPE",
  "Q4004-SNV-SACN",
  "Q4004-SNV-SPPE",
  "Q6006-PNV-SPPE",
  "Q6006-PNX-SPPE",
  "Q6012N-SNV-SPPE",
  "Q6012N-SNX-SPPE"
]
);

function text(value: unknown): string {
  return String(value ?? "").trim();
}

export function isQuickConnectProductOffline(
  product: Record<string, unknown>
): boolean {
  const sourceType = text(product.sourceType).toLowerCase();
  const typeId = text(product.productTypeId).toLowerCase();
  const model = text(product.model);

  const isQuickConnect =
    sourceType.includes("quick-connect") ||
    typeId === "quick-connect-fittings" ||
    /^q\d/i.test(model);

  if (!isQuickConnect) return false;

  const status = text(product.status).toLowerCase();
  if (status && status !== "active") return true;

  return [
    product.productId,
    product.productCode,
    product.sku,
    product.code,
    product.model,
  ]
    .map(text)
    .filter(Boolean)
    .some((key) => QUICK_CONNECT_OFFLINE_PRODUCT_KEYS.has(key));
}
