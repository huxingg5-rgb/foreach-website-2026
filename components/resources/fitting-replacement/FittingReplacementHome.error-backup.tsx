"use client";

/* =========================================================
   FittingReplacementDetail.tsx
   恒永达官网｜Q20 接头型号替代详情页组件

   文件路径：
   components/resources/fitting-replacement/FittingReplacementDetail.tsx

   作用：
   1. 展示单个 Q20 接头替代详情
   2. 左侧显示产品图
   3. 右侧显示紧凑参数表
   4. 支持加入选型清单
   5. 支持在清单中单独标记“是否需要 2D 图纸”
   6. 右侧清单复用 FittingSelectionCart
   7. 图纸区域默认不加载 PDF，点击“预览图纸”后才加载
   8. 当前不做图纸下载，后续通过清单统一生成资料包 / 邮件发送
========================================================= */

import { useEffect, useMemo, useState } from "react";

import type {
  FittingModelRule,
  ParsedFittingModelField,
} from "@/data/resources/fitting-replacement/fitting-replacement.types";

import type { FittingReplacementDetailPageData } from "../../../services/resources/getFittingReplacementDetailData";

import FittingSelectionCart, {
  type FittingSelectionCartItem,
} from "./FittingSelectionCart";

/* =========================================================
   清单本地缓存 key

   说明：
   1. 必须和首页 FittingReplacementHome.tsx 保持一致
   2. 这样首页加入清单后，详情页还能继续看到
========================================================= */
const CART_STORAGE_KEY = "foreach_fitting_replacement_cart_v1";

interface FittingReplacementDetailProps {
  data: FittingReplacementDetailPageData;
}

/* =========================================================
   解析 Q20 型号代码

   示例：
   Q2001-PMV-SPPE

   拆分为：
   Q20 | 01 | P | M | V | S | PP | E
========================================================= */
function splitQ20Model(model: string): Record<FittingModelRule["fieldKey"], string> {
  const [firstPart = "", secondPart = "", thirdPart = ""] = model.split("-");

  return {
    series: firstPart.slice(0, 3),
    tubeOrThread: firstPart.slice(3),
    gender: secondPart.slice(0, 1),
    panelMount: secondPart.slice(1, 2),
    valved: secondPart.slice(2, 3),
    shape: thirdPart.slice(0, 1),
    housingMaterial: thirdPart.slice(1, -1),
    sealingRingMaterial: thirdPart.slice(-1),
  };
}

/* =========================================================
   根据型号和规则生成解析结果

   注意：
   不能只按代码判断含义。
   例如 S 在不同位置可能分别代表“母端”和“直通”。
========================================================= */
function parseModelWithRules(
  model: string,
  rules: FittingModelRule[]
): ParsedFittingModelField[] {
  const codeMap = splitQ20Model(model);

  const fieldOrder: FittingModelRule["fieldKey"][] = [
    "series",
    "tubeOrThread",
    "gender",
    "panelMount",
    "valved",
    "shape",
    "housingMaterial",
    "sealingRingMaterial",
  ];

  return fieldOrder
    .map((fieldKey) => {
      const code = codeMap[fieldKey];

      const matchedRule = rules.find((rule) => {
        return rule.fieldKey === fieldKey && rule.code === code;
      });

      if (!matchedRule) {
        return null;
      }

      return {
        fieldOrder: matchedRule.fieldOrder,
        fieldKey: matchedRule.fieldKey,
        fieldName: matchedRule.fieldName,
        code,
        meaning: matchedRule.meaning,
      };
    })
    .filter(Boolean) as ParsedFittingModelField[];
}

/* =========================================================
   生成清单复制文本

   说明：
   1. 产品清单和图纸需求分开表达
   2. needDrawing 为 true 时，后续邮件 / 资料包才需要包含图纸
========================================================= */
function buildCartText(cartItems: FittingSelectionCartItem[]) {
  if (cartItems.length === 0) {
    return "暂无选型产品";
  }

  const lines = cartItems.map((item, index) => {
    return [
      `${index + 1}. ${item.foreachModel}`,
      `商品编码：${item.productCode}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return [
    "恒永达接头型号替代查询清单",
    "",
    "请协助确认以下型号、数量及图纸需求：",
    "",
    lines.join("\n\n"),
    "",
    "说明：最终适配性需结合管径、材质、螺纹、耐压及实际应用环境确认。",
  ].join("\n");
}

/* =========================================================
   详情页组件
========================================================= */
export default function FittingReplacementDetail({
  data,
}: FittingReplacementDetailProps) {
  const { product, modelRules, breadcrumbs } = data;

  /* 当前型号对应的 2D PDF 图纸路径
     说明：
     1. 你的 2D 图纸已经按型号命名
     2. PDF 文件放在 public/downloads/... 下面
     3. 当前只用于页面内预览，不直接提供下载入口
  */
  const drawingPdfHref = `/downloads/resources/selection-support/fitting-replacement/q20/drawings/${product.foreachModel}.pdf`;

  const [cartItems, setCartItems] = useState<FittingSelectionCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [printTime, setPrintTime] = useState("");
  const [isDrawingPreviewVisible, setIsDrawingPreviewVisible] = useState(false);

  /* 页面加载后读取本地清单
     说明：
     旧版本 localStorage 里可能没有 needDrawing 字段。
     这里读取后会自动兼容，没写的默认当作 false。
  */
  useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);

      if (rawCart) {
        const parsedCart = JSON.parse(rawCart) as FittingSelectionCartItem[];

        setCartItems(
          parsedCart.map((item) => {
            return {
              ...item,
              needDrawing: Boolean(item.needDrawing),
            };
          })
        );
      }
    } catch {
      setCartItems([]);
    }

    setHasMounted(true);
  }, []);

  /* 清单变化后写入 localStorage */
  useEffect(() => {
    if (!hasMounted) return;

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, hasMounted]);

  /* 当前型号解析结果 */
  const parsedFields = useMemo(() => {
    return parseModelWithRules(product.foreachModel, modelRules);
  }, [product.foreachModel, modelRules]);

  /* 获取某一个字段的解析结果 */
  function getParsedField(fieldKey: FittingModelRule["fieldKey"]) {
    return parsedFields.find((field) => field.fieldKey === fieldKey);
  }

  /* 详情表格字段
     说明：
     1. 两个字段放一行，避免详情表格过长
     2. 不显示包装、备注、系列、代码标签
     3. 不再重复显示恒永达型号，因为标题已经显示型号
  */
  const compactRows: Array<
    [FittingModelRule["fieldKey"], FittingModelRule["fieldKey"] | null]
  > = [
    ["tubeOrThread", "gender"],
    ["panelMount", "valved"],
    ["shape", "housingMaterial"],
    ["sealingRingMaterial", null],
  ];

  /* 加入清单
     重要逻辑：
     1. 加入产品，不代表默认需要图纸
     2. needDrawing 默认为 false
     3. 客户需要图纸时，需要在清单里单独点击“需要图纸”
  */
  function handleAddToCart() {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => {
        return item.productCode === product.productCode;
      });

      if (existingItem) {
        return prev.map((item) => {
          if (item.productCode !== product.productCode) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity + 1,
            needDrawing: Boolean(item.needDrawing),
          };
        });
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
          needDrawing: false,
        },
      ];
    });

    setIsCartOpen(true);
  }

  function handleChangeQuantity(productCode: string, quantity: number) {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.productCode !== productCode) {
          return item;
        }

        return {
          ...item,
          quantity: Math.max(1, quantity),
        };
      });
    });
  }

  /* 修改是否需要 2D 图纸
     true：后续资料包 / 邮件里需要包含该型号图纸
     false：只保留产品报价 / 型号确认需求
  */
  function handleToggleDrawingNeed(productCode: string, needDrawing: boolean) {
    setCartItems((prev) => {
      return prev.map((item) => {
        if (item.productCode !== productCode) {
          return item;
        }

        return {
          ...item,
          needDrawing,
        };
      });
    });
  }

  function handleRemoveCartItem(productCode: string) {
    setCartItems((prev) => {
      return prev.filter((item) => item.productCode !== productCode);
    });
  }

  function handleClearCart() {
    const confirmed = window.confirm("确认清空当前选型清单？");

    if (!confirmed) return;

    setCartItems([]);
  }

  async function handleCopyCart() {
    const text = buildCartText(cartItems);

    try {
      await window.navigator.clipboard.writeText(text);
      window.alert("清单已复制");
    } catch {
      window.alert(text);
    }
  }

  function handleGeneratePdf() {
    if (cartItems.length === 0) {
      window.alert("当前清单为空，请先加入产品。");
      return;
    }

    setPrintTime(new Date().toLocaleString());

    window.setTimeout(() => {
      window.print();
    }, 80);
  }

  const drawingNeedCount = cartItems.filter((item) => item.needDrawing).length;

return (
  <div className="fitting-replacement-detail-page">
    <main className="frd-main">
      <div className="frp-container">
        {/* 面包屑 */}
        <nav className="frp-breadcrumb" aria-label="面包屑导航">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <span className="frp-breadcrumb-item" key={item.label}>
                {item.href && !isLast ? (
                  <a href={item.href}>{item.label}</a> 
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            );
          })}
        </nav> 

          {/* 详情主体 */}
          <section className="frd-detail-section">
            <div className="frd-detail-layout">
              <div className="frd-product-visual">
                <img
                  src={product.imagePath}
                  alt={product.foreachModel}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="frd-info-area">
                <div className="frd-title-block">
                  <h2>{product.foreachModel}</h2>
                </div>

                <table className="frd-compact-table">
                  <tbody>
                    <tr className="frd-head-row">
                      <td className="frd-label">商品编码</td>
                      <td className="frd-value" colSpan={3}>
                        {product.productCode}
                      </td>
                    </tr>

                    <tr>
                      <td className="frd-label">兼容编码</td>
                      <td className="frd-value" colSpan={3}>
                        {product.competitorModels.join(" / ") || "-"}
                      </td>
                    </tr>

                    {compactRows.map(([leftKey, rightKey]) => {
                      const leftField = getParsedField(leftKey);
                      const rightField = rightKey ? getParsedField(rightKey) : null;

                      return (
                        <tr key={`${leftKey}-${rightKey || "empty"}`}>
                          <td className="frd-label">
                            {leftField?.fieldName.zh || "-"}
                          </td>
                          <td className="frd-value">
                            {leftField?.meaning.zh || "-"}
                          </td>

                          {rightField ? (
                            <>
                              <td className="frd-label">
                                {rightField.fieldName.zh}
                              </td>
                              <td className="frd-value">
                                {rightField.meaning.zh}
                              </td>
                            </>
                          ) : (
                            <td className="frd-empty" colSpan={2} />
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <button
                  className="frd-add-button"
                  type="button"
                  onClick={handleAddToCart}
                >
                  加入清单
                </button>
              </div>
            </div>
          </section>

          {/* 2D 图纸预览区
              说明：
              1. 默认不加载 PDF，避免拖慢详情页
              2. 客户点击“预览图纸”后才加载 PDF
              3. 当前只预览，不提供下载按钮
              4. 真正获取图纸需要在清单里标记“需要图纸”，后续通过资料包 / 邮件统一发送
          */}
          <section className="frd-drawing-section">
            <div className="frd-drawing-head">
              <h2>PDF 2D 图纸</h2>
            </div>

            {!isDrawingPreviewVisible ? (
              <div className="frd-drawing-placeholder">
                <strong>当前图纸已准备</strong>
                <p>
                  可先在页面内预览图纸；如需获取图纸文件，请将该型号加入清单，并在清单中标记“需要图纸”。
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setIsDrawingPreviewVisible(true);
                  }}
                >
                  预览图纸
                </button>
              </div>
            ) : (
              <div className="frd-drawing-viewer">
                <object
                  data={drawingPdfHref}
                  type="application/pdf"
                  className="frd-drawing-object"
                >
                  <div className="frd-drawing-fallback">
                    当前浏览器暂不支持 PDF 预览。
                  </div>
                </object>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* 右侧选型清单 */}
      <FittingSelectionCart
        cartItems={cartItems}
        isOpen={isCartOpen}
        onOpen={() => {
          setIsCartOpen(true);
        }}
        onClose={() => {
          setIsCartOpen(false);
        }}
        onChangeQuantity={handleChangeQuantity}
        onToggleDrawingNeed={handleToggleDrawingNeed}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onCopyCart={handleCopyCart}
        onGeneratePdf={handleGeneratePdf}
        showPdfButton
      />

      {/* 打印 / PDF 区域
          说明：
          样式复用 fitting-replacement.css 里的打印样式
      */}
      <section className="frp-print-area">
        <div className="frp-print-page">
          <header className="frp-print-header">
            <div>
              <div className="frp-print-brand">FOREACH</div>
              <div className="frp-print-company">深圳市恒永达科技股份有限公司</div>
            </div>

            <div className="frp-print-doc-info">
              <div>选型支持</div>
              <strong>接头型号替代查询清单</strong>
            </div>
          </header>

          <section className="frp-print-title-block">
            <h1>接头型号替代查询清单</h1>
            <p>
              本清单根据客户选择的兼容型号与恒永达对应型号生成，用于型号确认、报价沟通及内部技术确认。
            </p>
          </section>

          <section className="frp-print-meta-grid">
            <div>
              <span>生成时间</span>
              <strong>{printTime || "-"}</strong>
            </div>

            <div>
              <span>产品数量</span>
              <strong>{cartItems.length} 项</strong>
            </div>

            <div>
              <span>图纸需求</span>
              <strong>{drawingNeedCount} 项</strong>
            </div>
          </section>

          <table className="frp-print-table">
            <thead>
              <tr>
                <th>序号</th>
                <th>商品编码</th>
                <th>兼容编码</th>
                <th>恒永达型号</th>
                <th>数量</th>
                <th>2D 图纸</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan={6}>暂无选型产品</td>
                </tr>
              ) : (
                cartItems.map((item, index) => {
                  return (
                    <tr key={item.productCode}>
                      <td>{index + 1}</td>
                      <td>{item.productCode}</td>
                      <td>{item.competitorModels.join(" / ") || "-"}</td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <section className="frp-print-notice">
            <strong>确认说明</strong>
            <p>
              本清单仅用于型号替代、初步选型及报价沟通。最终适配性需结合管径、材质、密封件、连接方式、
              耐压要求及实际应用环境进行确认。标记“需要 2D 图纸”的型号，后续可纳入资料包或邮件发送范围。
            </p>
          </section>

          <footer className="frp-print-footer">
            <span>FOREACH Fluid Components</span>
            <span>www.foreachtek.com</span>
          </footer>
        </div>
      </section>
    </div>
  );
} 