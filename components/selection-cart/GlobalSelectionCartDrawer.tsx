"use client";

/* =========================================================
   GlobalSelectionCartDrawer.tsx
   恒永达官网｜全局选型清单抽屉

   文件路径：
   components/selection-cart/GlobalSelectionCartDrawer.tsx

   作用：
   1. 全站只挂载一次
   2. 固定在页面最高层
   3. 首页、详情页、后续产品页共用同一个清单
   4. 支持修改数量、切换图纸需求、删除、清空、复制、生成 PDF 清单
   5. 支持从清单点击型号进入对应详情页
   6. 点击加入清单 / 添加图纸后，不自动打开清单，只让右下角清单按钮轻微动效提示
   7. “申请图纸”弹窗使用通用 CompanyInfoRequestModal 组件
   8. 图纸申请使用正式邮箱验证码、Redis 验证状态和邮件提交接口
   9. 生成 PDF 清单：
      - 页眉使用 request-form-header-graphic.svg
      - 页脚使用 request-form-footer-graphic.svg
      - 不额外添加 Logo
      - 打印区域通过 portal 挂到 body 最高层，避免多页空白
========================================================= */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";

import CompanyInfoRequestModal, {
  type CompanyInfoFormValue,
  type CompanyInfoRequestItem,
} from "@/components/forms/company-info-request/CompanyInfoRequestModal";
import { getDrawingRequestCopy } from "@/components/forms/company-info-request/copy";
import { getLocaleFromPathname, isInternationalLocale, type LocaleCode } from "@/lib/i18n";
import { getInternationalUiText } from "@/lib/international-ui";

import styles from "./GlobalSelectionCartDrawer.module.css";
import { useSelectionCart } from "./SelectionCartProvider";
import { getSelectionCartCopy } from "./selection-cart.i18n";

/* =========================================================
   PDF 页眉 / 页脚 SVG 路径

   注意：
   1. 文件实际放在 public/images/contact-cooperation/pdf/
   2. 页面引用时不写 public
   3. 所以路径从 /images/... 开始
   4. 不在页面中额外添加 Logo，直接使用 SVG 作为页眉 / 页脚
========================================================= */
const PDF_HEADER_GRAPHIC_SRC =
  "/images/contact-cooperation/pdf/request-form-header-graphic.svg";

const PDF_FOOTER_GRAPHIC_SRC =
  "/images/contact-cooperation/pdf/request-form-footer-graphic.svg";

/* =========================================================
   预加载图片

   说明：
   1. 生成 PDF 前先预加载页眉 / 页脚 SVG
   2. 避免浏览器打印时图片还没加载完成
   3. 如果加载失败，也不阻断打印，避免功能卡死
========================================================= */
function preloadPrintImage(src: string) {
  return new Promise<void>((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    const image = new window.Image();

    image.onload = () => {
      resolve();
    };

    image.onerror = () => {
      resolve();
    };

    image.src = src;
  });
}

function getCartDetailHref(
  href: string | undefined,
  locale: LocaleCode,
) {
  if (
    !href ||
    locale === "zh-CN" ||
    !href.startsWith("/") ||
    new RegExp(`^/${locale}(?:/|$)`).test(href)
  ) {
    return href;
  }

  const unprefixedHref = href.replace(/^\/(?:en|es|fr|ko|ru)(?=\/|$)/, "");
  return `/${locale}${unprefixedHref}`;
}

export default function GlobalSelectionCartDrawer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  // 国际站尚未单独维护的清单术语统一回退英文，禁止回退中文。
  const isEnglish = isInternationalLocale(locale);
  const t = (text: string) => getInternationalUiText(locale, text);
  const drawingCopy = getDrawingRequestCopy(locale);
  const cartCopy = getSelectionCartCopy(locale);

  const {
    items,
    isOpen,
    openCart,
    closeCart,
    changeQuantity,
    toggleDrawingNeed,
    setAllDrawingNeeds,
    removeItem,
    clearCart,
    copyCartText,
    generatePdfList,
    printTime,
  } = useSelectionCart();

  /* =========================================================
     是否已经在浏览器端挂载

     说明：
     1. 打印区域使用 createPortal 挂到 document.body
     2. document 只在浏览器端存在
     3. 所以需要等组件挂载后再创建 portal
  ========================================================= */
  const [isMounted, setIsMounted] = useState(false);

  /* 已经标记“已添加图纸”的型号 */
  const requestDrawingItems = useMemo(() => {
    return items.filter((item) => item.needDrawing);
  }, [items]);

  /* 图纸需求数量 */
  const drawingNeedCount = requestDrawingItems.length;

  /* 右下角清单按钮动效状态 */
  const [isCartButtonBumping, setIsCartButtonBumping] = useState(false);

  /* 图纸申请弹窗是否打开 */
  const [isDrawingRequestModalOpen, setIsDrawingRequestModalOpen] =
    useState(false);

  /* 用于记录清单变化，避免页面初次加载时触发动效 */
  const previousCartSignatureRef = useRef("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* =========================================================
     把清单中的图纸需求转换成通用弹窗条目

     说明：
     1. CompanyInfoRequestModal 不依赖具体业务字段
     2. 所以这里把 productCode / competitorModels 转成 metaLines
     3. 后续规格书申请也可以用类似方式转换数据
  ========================================================= */
  const drawingRequestModalItems = useMemo<CompanyInfoRequestItem[]>(() => {
    return requestDrawingItems.map((item) => {
      return {
        id: item.id,
        title: item.foreachModel,
        metaLines:
          item.sourceType === "pump-selection"
            ? [
                `${isEnglish ? t("Product Type") : "产品类型"}: ${item.productName}`,
                `${isEnglish ? t("Product Model") : "产品型号"}: ${item.foreachModel}`,
                `${isEnglish ? t("Quantity") : "数量"}: ${item.quantity}`,
              ]
            : [
                `${isEnglish ? t("Product Code") : "商品编码"}: ${item.productCode}`,
                `${isEnglish ? t("Compatible Models") : "兼容编码"}: ${item.competitorModels.join(" / ") || "-"}`,
                `${isEnglish ? t("Quantity") : "数量"}: ${item.quantity}`,
              ],
      };
    });
  }, [isEnglish, locale, requestDrawingItems]);

  /* =========================================================
     右下角清单按钮轻动效

     说明：
     1. 当清单数量、数量值、图纸需求状态发生变化时触发
     2. 不自动打开清单
     3. 只让右下角清单入口轻微提示
     4. 初次加载 localStorage 数据时不触发动效
  ========================================================= */
  useEffect(() => {
    const currentSignature = items
      .map((item) => `${item.id}:${item.quantity}:${item.needDrawing}`)
      .join("|");

    if (!previousCartSignatureRef.current) {
      previousCartSignatureRef.current = currentSignature;
      return;
    }

    if (previousCartSignatureRef.current !== currentSignature) {
      setIsCartButtonBumping(true);

      const timer = window.setTimeout(() => {
        setIsCartButtonBumping(false);
      }, 420);

      previousCartSignatureRef.current = currentSignature;

      return () => {
        window.clearTimeout(timer);
      };
    }

    previousCartSignatureRef.current = currentSignature;
  }, [items]);

  /* =========================================================
     点击申请图纸

     说明：
     1. 当前打开通用公司信息弹窗
     2. 如果没有添加图纸，弹窗内会显示空状态
     3. 不使用浏览器 alert，体验更像官网表单
  ========================================================= */
  function handleOpenDrawingRequestModal() {
    /*
     * “申请图纸”代表客户希望为当前清单统一申请图纸。
     *
     * 因此点击后：
     * 1. 把当前清单全部标记为需要图纸
     * 2. 弹窗会通过同一个 SelectionCartProvider 读取这些型号
     * 3. 弹窗项目数量与当前产品清单数量保持一致
     * 4. 弹窗有项目后，发送验证码按钮自动解除禁用
     */
    if (items.length > 0) {
      setAllDrawingNeeds(true);
    }

    setIsDrawingRequestModalOpen(true);
  }

  /* =========================================================
     生成 PDF 清单

     说明：
     1. 预加载页眉 / 页脚 SVG
     2. 给 body 添加 selection-cart-printing 类名
     3. 打印样式只显示 portal 到 body 的打印区域
     4. 打印结束后移除类名
     5. 这样可以避免原网页高度导致打印多页空白
  ========================================================= */
  async function handleGeneratePdfList() {
    await Promise.all([
      preloadPrintImage(PDF_HEADER_GRAPHIC_SRC),
      preloadPrintImage(PDF_FOOTER_GRAPHIC_SRC),
    ]);

    document.documentElement.classList.add("selection-cart-printing");
    document.body.classList.add("selection-cart-printing");

    function cleanupPrintClass() {
      document.documentElement.classList.remove("selection-cart-printing");
      document.body.classList.remove("selection-cart-printing");
      window.removeEventListener("afterprint", cleanupPrintClass);
    }

    window.addEventListener("afterprint", cleanupPrintClass);

    /*
       兜底清理：
       部分浏览器关闭打印预览后 afterprint 触发不稳定。
       这里增加兜底，避免页面一直停留在打印状态。
    */
    window.setTimeout(() => {
      cleanupPrintClass();
    }, 5000);

    await generatePdfList();
  }

  /* =========================================================
     图纸申请正式提交

     流程：
     1. 邮箱验证码已由 CompanyInfoRequestModal 校验
     2. 将客户信息和图纸型号清单提交到正式询盘接口
     3. 公司邮箱收到完整申请
     4. 客户邮箱收到带申请编号的确认邮件
     5. 提交成功后取消本次型号的图纸标记，但保留选型清单
  ========================================================= */
  async function handleSubmitDrawingRequest(
    formValue: CompanyInfoFormValue,
  ) {
    if (requestDrawingItems.length === 0) {
      throw new Error("required_fields_missing");
    }

    const requestedDrawingLines = requestDrawingItems.map(
      (item, index) => {
        if (item.sourceType === "pump-selection") {
          return [
            `${index + 1}. ${item.foreachModel}`,
            `Product Type: ${item.productName}`,
            `Product Model: ${item.foreachModel}`,
            `Quantity: ${item.quantity}`,
          ].join("\n");
        }

        return [
          `${index + 1}. ${item.foreachModel}`,
          `Product: ${item.productName}`,
          `Product Code: ${item.productCode}`,
          `Compatible Models: ${
            item.competitorModels.join(" / ") || "-"
          }`,
          `Quantity: ${item.quantity}`,
        ].join("\n");
      },
    );

    const productTypeText = Array.from(
      new Set(
        requestDrawingItems.map((item) => item.productName),
      ),
    ).join(" / ");

    const targetModelText = requestDrawingItems
      .map((item) => item.foreachModel)
      .join(" / ");

    const requirementText = [
      `Country / Region: ${formValue.country.trim() || "-"}`,
      "",
      "Requested Drawing Items:",
      requestedDrawingLines.join("\n\n"),
      formValue.message.trim()
        ? `\nNotes:\n${formValue.message.trim()}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    const response = await fetch("/api/inquiry/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        name: formValue.name.trim(),
        company: formValue.company.trim(),
        email: formValue.email.trim(),
        phone: formValue.phone.trim(),
        requestType: "Drawing Request",
        productType:
          productTypeText.slice(0, 200) || "Selected Products",
        targetModel: targetModelText.slice(0, 200),
        projectStage: "Drawing Request Review",
        message: requirementText,
        locale,
        attachments: [],
      }),
    });

    const data = (await response
      .json()
      .catch(() => ({}))) as {
      success?: boolean;
      error?: string;
      referenceId?: string;
    };

    if (!response.ok || data.success !== true) {
      throw new Error(data.error || "request_failed");
    }

    /*
     * 只取消本次成功提交型号的图纸标记。
     * 选型产品本身继续保留，便于客户后续生成 PDF 或提交报价需求。
     */
    setAllDrawingNeeds(false);
  }
  /* =========================================================
     打印区域

     说明：
     1. 这里做成变量，后面通过 createPortal 挂载到 body
     2. 挂到 body 后，打印时可以直接隐藏 body 下其他元素
     3. 这样可以解决打印出现多页空白的问题
  ========================================================= */
  const printDocument = (
    <section className={`${styles.printArea} selection-cart-print-root`}>
      <div className={styles.printPage}>
        {/* PDF 正式页眉 SVG */}
        <header className={styles.printGraphicHeader}>
          <img src={PDF_HEADER_GRAPHIC_SRC} alt={cartCopy.pdfHeaderAlt} />
        </header>

        <main className={styles.printContent}>
          <section className={styles.printTitleBlock}>
            <h1>{cartCopy.printTitle}</h1>
            <p>{cartCopy.printDescription}</p>
          </section>

          <section className={styles.printMetaGrid}>
            <div>
              <span>{cartCopy.generated}</span>
              <strong>{printTime || "-"}</strong>
            </div>

            <div>
              <span>{cartCopy.productsCount}</span>
              <strong>{items.length} {cartCopy.itemUnit}</strong>
            </div>

            <div>
              <span>{cartCopy.drawingRequests}</span>
              <strong>{drawingNeedCount} {cartCopy.itemUnit}</strong>
            </div>
          </section>

          <table className={styles.printTable}>
            <thead>
              <tr>
                <th>{cartCopy.number}</th>
                <th>{cartCopy.source}</th>
                <th>{cartCopy.product}</th>
                <th>{cartCopy.relatedInformation}</th>
                <th>{cartCopy.model}</th>
                <th>{isEnglish ? t("Quantity") : "数量"}</th>
                <th>{cartCopy.drawing}</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    {isEnglish ? t("No products selected") : "暂无选型产品"}
                  </td>
                </tr>
              ) : (
                items.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? cartCopy.sourceLabels.products
                          : cartCopy.sourceLabels.fittingReplacement}
                      </td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? item.productName
                          : item.productCode}
                      </td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? cartCopy.configuredProduct
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>
                        {item.needDrawing
                          ? cartCopy.required
                          : cartCopy.notRequired}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </main>

        {/* PDF 正式页脚 SVG */}
        <footer className={styles.printGraphicFooter}>
          <img src={PDF_FOOTER_GRAPHIC_SRC} alt={cartCopy.pdfFooterAlt} />
        </footer>
      </div>
    </section>
  );

  return (
    <>
      {/* =====================================================
          右下角浮动按钮
      ===================================================== */}
      <div
        className={`${styles.floatingActions} ${
          isOpen ? styles.hidden : ""
        } ${isCartButtonBumping ? styles.bump : ""}`}
      >
        <button
          type="button"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          {isEnglish ? t("Top") : "顶部"}
        </button>

        <button type="button" onClick={openCart}>
          {isEnglish ? t("List") : "清单"}
          <span>{items.length}</span>
        </button>
      </div>

      {/* =====================================================
          右侧选型清单抽屉
      ===================================================== */}
      {isOpen && (
        <>
          <button
            className={styles.mask}
            type="button"
            aria-label={isEnglish ? `${t("Close")} ${t("Product Selection List")}` : "关闭选型清单"}
            onClick={closeCart}
          />

          <aside
            className={styles.drawer}
            aria-label={isEnglish ? t("Product Selection List") : "选型清单"}
          >
            <div className={styles.head}>
              <div>
                <h2>{isEnglish ? t("Product Selection List") : "选型清单"}</h2>
                <p>{cartCopy.headerDescription}</p>
              </div>

              <button
                type="button"
                onClick={closeCart}
                aria-label={isEnglish ? `${t("Close")} ${t("Product Selection List")}` : "关闭选型清单"}
              >
                <svg
                  viewBox="0 0 20 20"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path d="M5 5L15 15M15 5L5 15" />
                </svg>
              </button>
            </div>

            <div className={styles.body}>
              {items.length === 0 ? (
                <div className={styles.empty}>
                  {isEnglish ? t("No products selected") : "暂无选型产品"}
                  <br />
                  {cartCopy.emptyHint}
                </div>
              ) : (
                <>
                  <div className={styles.summary}>
                    <div>
                      <span>{cartCopy.productsCount}</span>
                      <strong>{items.length}</strong>
                      <em>{cartCopy.itemUnit}</em>
                    </div>

                    <div>
                      <span>{cartCopy.drawingRequests}</span>
                      <strong>{drawingNeedCount}</strong>
                      <em>{cartCopy.itemUnit}</em>
                    </div>
                  </div>

                  <div className={styles.list}>
                    {items.map((item) => {
                      return (
                        <article className={styles.item} key={item.id}>
                          <button
                            className={styles.removeButton}
                            type="button"
                            aria-label={isEnglish ? t("Remove") : "删除该产品"}
                            onClick={() => {
                              removeItem(item.id);
                            }}
                          >
                            ×
                          </button>

                          <div className={styles.itemHead}>
                            <div>
                              <span>
                                {item.sourceType === "pump-selection"
                                  ? cartCopy.sourceLabels.products
                                  : cartCopy.sourceLabels.fittingReplacement}
                              </span>

                              {item.detailHref && item.sourceType !== "pump-selection" ? (
                                <Link
                                  className={styles.itemTitleLink}
                                  href={getCartDetailHref(item.detailHref, locale) ?? "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={cartCopy.openDetailsTitle}
                                >
                                  {item.foreachModel}
                                </Link>
                              ) : (
                                <h3>{item.foreachModel}</h3>
                              )}
                            </div>

                            <button
                              className={
                                item.needDrawing
                                  ? `${styles.drawingButton} ${styles.active}`
                                  : styles.drawingButton
                              }
                              type="button"
                              onClick={() => {
                                toggleDrawingNeed(item.id, !item.needDrawing);
                              }}
                            >
                              {item.needDrawing
                                ? isEnglish ? t("Drawing Added") : "已添加图纸"
                                : isEnglish ? t("Add Drawing") : "添加图纸"}
                            </button>
                          </div>

                          {item.sourceType === "pump-selection" ? (
                            <div className={styles.infoRow}>
                              <span>{isEnglish ? t("Product Type") : "产品类型"}</span>
                              <strong>{item.productName}</strong>
                            </div>
                          ) : (
                            <>
                              <div className={styles.infoRow}>
                                <span>{isEnglish ? t("Compatible Models") : "兼容编码"}</span>
                                <strong>
                                  {item.competitorModels.join(" / ") || "-"}
                                </strong>
                              </div>

                              <div className={styles.infoRow}>
                                <span>{isEnglish ? t("Product Code") : "商品编码"}</span>
                                <strong>{item.productCode}</strong>
                              </div>
                            </>
                          )}

                          <div className={styles.quantityRow}>
                            <label htmlFor={`global-cart-qty-${item.id}`}>
                              {isEnglish ? t("Quantity") : "数量"}
                            </label>

                            <input
                              id={`global-cart-qty-${item.id}`}
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(event) => {
                                changeQuantity(
                                  item.id,
                                  Number(event.target.value || 1),
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

              <div className={styles.note}>
                <strong>{cartCopy.noteTitle}</strong>
                <p>{cartCopy.noteDescription}</p>
              </div>
            </div>

            <div className={styles.footer}>
              <button
                className={styles.requestDrawingButton}
                type="button"
                onClick={handleOpenDrawingRequestModal}
              >
                {isEnglish ? t("Request Drawings") : "申请图纸"}
              </button>

              <button
                className={styles.primaryButton}
                type="button"
                onClick={handleGeneratePdfList}
              >
                {isEnglish ? t("Generate PDF List") : "生成 PDF 清单"}
              </button>

              <button
                className={styles.secondaryButton}
                type="button"
                onClick={copyCartText}
              >
                {isEnglish ? t("Copy List") : "复制分享"}
              </button>

              <button
                className={styles.secondaryButton}
                type="button"
                onClick={clearCart}
              >
                {isEnglish ? t("Clear") : "清空"}
              </button>
            </div>
          </aside>
        </>
      )}

      {/* =====================================================
          通用公司信息弹窗｜当前用于申请图纸
      ===================================================== */}
      <CompanyInfoRequestModal
        locale={locale}
        isOpen={isDrawingRequestModalOpen}
        title={isEnglish ? t("Request Drawings") : "申请图纸"}
        description={drawingCopy.description}
        items={drawingRequestModalItems}
        emptyTitle={drawingCopy.emptyTitle}
        emptyDescription={drawingCopy.emptyDescription}
        submitLabel={drawingCopy.submit}
        successTitle={drawingCopy.successTitle}
        successDescription={drawingCopy.successDescription}
        enableEmailVerification
        onClose={() => {
          setIsDrawingRequestModalOpen(false);
        }}
        onSubmitPreview={handleSubmitDrawingRequest}
      />

      {/* =====================================================
          打印区域通过 portal 放到 body 下
          说明：
          这样打印时可以直接隐藏 body 下其他元素，
          避免原网页高度造成多页空白。
      ===================================================== */}
      {isMounted ? createPortal(printDocument, document.body) : null}
    </>
  );
}




