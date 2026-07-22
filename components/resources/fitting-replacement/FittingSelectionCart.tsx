"use client";

/* =========================================================
   FittingSelectionCart.tsx
   恒永达官网｜接头替代查询选型清单组件

   文件路径：
   components/resources/fitting-replacement/FittingSelectionCart.tsx

   作用：
   1. 显示右侧“选型清单”抽屉
   2. 首页和详情页都复用这个组件
   3. 展示已加入的接头型号、兼容编码、数量和图纸需求状态
   4. 支持在侧边栏内直接切换“需要图纸 / 不需要图纸”
   5. 后续提交需求 / 发送邮件时，根据 needDrawing 判断是否发送图纸

   当前交互逻辑：
   1. 加入清单 = 加入产品需求
   2. 需要图纸 = 可在详情页按钮切换，也可在侧边栏卡片中切换
   3. 点击“需要图纸 / 不需要图纸”按钮，会同步更新 localStorage 中的清单数据
========================================================= */

import type { FittingReplacementProduct } from "@/data/resources/fitting-replacement/fitting-replacement.types";

/* =========================================================
   清单产品类型

   说明：
   1. FittingReplacementProduct 是接头替代查询的基础产品数据
   2. quantity 是客户需要的数量
   3. needDrawing 表示客户是否需要该型号 2D 图纸
   4. 后续发邮件 / 生成资料包时，会根据 needDrawing 判断是否附带图纸
========================================================= */
export type FittingSelectionCartItem = FittingReplacementProduct & {
  quantity: number;
  needDrawing?: boolean;
};

/* =========================================================
   组件参数
========================================================= */
interface FittingSelectionCartProps {
  /* 当前清单产品 */
  cartItems: FittingSelectionCartItem[];

  /* 清单是否打开 */
  isOpen: boolean;

  /* 打开清单 */
  onOpen: () => void;

  /* 关闭清单 */
  onClose: () => void;

  /* 修改数量 */
  onChangeQuantity: (productCode: string, quantity: number) => void;

  /* 修改是否需要 2D 图纸 */
  onToggleDrawingNeed?: (productCode: string, needDrawing: boolean) => void;

  /* 删除单个产品 */
  onRemoveItem: (productCode: string) => void;

  /* 清空清单 */
  onClearCart: () => void;

  /* 复制分享 */
  onCopyCart: () => void | Promise<void>;

  /* 生成 PDF 清单 */
  onGeneratePdf?: () => void | Promise<void>;

  /* 是否显示生成 PDF 按钮 */
  showPdfButton?: boolean;
}

/* =========================================================
   选型清单组件
========================================================= */
export default function FittingSelectionCart({
  cartItems,
  isOpen,
  onOpen,
  onClose,
  onChangeQuantity,
  onToggleDrawingNeed,
  onRemoveItem,
  onClearCart,
  onCopyCart,
  onGeneratePdf,
  showPdfButton = true,
}: FittingSelectionCartProps) {
  const drawingNeedCount = cartItems.filter((item) => item.needDrawing).length;

  return (
    <>
      {/* =====================================================
          右下角浮动按钮
      ===================================================== */}
      <div className={`frp-floating-actions ${isOpen ? "is-hidden" : ""}`}>
        <button
          type="button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          顶部
        </button>

        <button type="button" onClick={onOpen}>
          清单
          <span>{cartItems.length}</span>
        </button>
      </div>

      {/* =====================================================
          右侧选型清单抽屉
      ===================================================== */}
      {isOpen && (
        <>
          <div className="frp-cart-mask" onClick={onClose} />

          <aside className="frp-cart-drawer" aria-label="选型清单">
            <div className="frp-cart-head">
              <div>
                <h2>选型清单</h2>
                <p>确认型号、数量与图纸需求，后续可统一提交或生成资料包。</p>
              </div>

              <button type="button" onClick={onClose} aria-label="关闭选型清单">
                ×
              </button>
            </div>

            <div className="frp-cart-body">
              {cartItems.length === 0 ? (
                <div className="frp-cart-empty">
                  暂无选型产品
                  <br />
                  可先选择型号并加入清单
                </div>
              ) : (
                <>
                  {/* ================================
                      清单摘要
                  ================================ */}
                  <div className="frp-cart-summary">
                    <div>
                      <span>产品数量</span>
                      <strong>{cartItems.length}</strong>
                      <em>项</em>
                    </div>

                    <div>
                      <span>图纸需求</span>
                      <strong>{drawingNeedCount}</strong>
                      <em>项</em>
                    </div>
                  </div>

                  {/* ================================
                      清单列表
                  ================================ */}
                  <div className="frp-cart-list">
                    {cartItems.map((item) => {
                      const hasDrawingNeed = Boolean(item.needDrawing);

                      return (
                        <article className="frp-cart-item" key={item.productCode}>
                          <button
                            className="frp-cart-item-remove"
                            type="button"
                            onClick={() => {
                              onRemoveItem(item.productCode);
                            }}
                            aria-label="删除该产品"
                          >
                            ×
                          </button>

                          <div className="frp-cart-item-head">
                            <h3>{item.foreachModel}</h3>

                            <button
                              className={
                                hasDrawingNeed
                                  ? "frp-cart-drawing-toggle is-active"
                                  : "frp-cart-drawing-toggle"
                              }
                              type="button"
                              onClick={() => {
                                onToggleDrawingNeed?.(
                                  item.productCode,
                                  !hasDrawingNeed
                                );
                              }}
                              aria-label={
                                hasDrawingNeed
                                  ? "取消该型号的图纸需求"
                                  : "添加该型号的图纸需求"
                              }
                            >
                             {item.needDrawing ? "已添加图纸" : "添加图纸"}
                            </button>
                          </div>

                          <div className="frp-cart-code-line">
                            <span>兼容编码</span>
                            <strong>
                              {item.competitorModels.join(" / ") || "-"}
                            </strong>
                          </div>

                          <div className="frp-cart-code-line">
                            <span>商品编码</span>
                            <strong>{item.productCode}</strong>
                          </div>

                          <div className="frp-cart-qty-row">
                            <label htmlFor={`cart-qty-${item.productCode}`}>
                              数量
                            </label>

                            <input
                              id={`cart-qty-${item.productCode}`}
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(event) => {
                                onChangeQuantity(
                                  item.productCode,
                                  Number(event.target.value || 1)
                                );
                              }}
                            />
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </>
              )}

              <div className="frp-cart-note">
                <strong>清单说明</strong>
                <p>
                  产品加入清单后不会默认发送图纸。需要图纸的型号，可在详情页或清单中切换。
                  后续提交需求时，只会把标记“需要图纸”的型号纳入图纸发送范围。
                </p>
              </div>
            </div>

            <div className="frp-cart-footer">
              <div className="frp-cart-footer-actions">
                {showPdfButton && (
                  <button
                    className="frp-cart-action-primary"
                    type="button"
                    onClick={onGeneratePdf}
                  >
                    生成 PDF 清单
                  </button>
                )}

                <button
                  className="frp-cart-action-secondary"
                  type="button"
                  onClick={onCopyCart}
                >
                  复制分享
                </button>

                <button
                  className="frp-cart-action-ghost"
                  type="button"
                  onClick={onClearCart}
                >
                  清空
                </button>
              </div>
            </div>
          </aside>
        </>
      )}
    </>
  );
}  