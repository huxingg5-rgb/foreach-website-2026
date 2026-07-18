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
   8. 当前阶段不真正发送邮件，后续再接 services/resources/requestDrawing.ts
   9. 生成 PDF 清单：
      - 页眉使用 request-form-header-graphic.svg
      - 页脚使用 request-form-footer-graphic.svg
      - 不额外添加 Logo
      - 打印区域通过 portal 挂到 body 最高层，避免多页空白
========================================================= */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import CompanyInfoRequestModal, {
  type CompanyInfoFormValue,
  type CompanyInfoRequestItem,
} from "@/components/forms/company-info-request/CompanyInfoRequestModal";
import { getLocaleFromPathname } from "@/lib/i18n";

import styles from "./GlobalSelectionCartDrawer.module.css";
import { useSelectionCart } from "./SelectionCartProvider";

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

const TARGET_CART_TRANSLATIONS: Record<
  "es" | "fr" | "ko" | "ru",
  Record<string, string>
> = {
  es: {
    "Product Type": "Tipo de producto",
    "Product Model": "Modelo de producto",
    Quantity: "Cantidad",
    "Product Code": "Código de producto",
    "Compatible Models": "Modelos compatibles",
    "FOREACH Product Selection List": "Lista de selección de productos FOREACH",
    "This list is generated from the selected models for model confirmation, quotation discussions, and technical review.": "Esta lista se genera a partir de los modelos seleccionados y sirve para confirmar modelos, solicitar presupuestos y realizar revisiones técnicas internas.",
    Generated: "Generado",
    Products: "Productos",
    items: "elementos",
    "Drawing Requests": "Planos solicitados",
    "No.": "N.º",
    Source: "Origen",
    Product: "Producto",
    "Related Information": "Información relacionada",
    Model: "Modelo",
    "2D Drawing": "Plano 2D",
    "No products selected": "No hay productos seleccionados",
    "Configured Product": "Producto configurado",
    Required: "Requerido",
    "Not Required": "No requerido",
    Top: "Arriba",
    List: "Lista",
    "Close selection list": "Cerrar la lista de selección",
    "Product selection list": "Lista de selección de productos",
    "Product Selection List": "Lista de selección de productos",
    "Confirm models, quantities, and drawing requirements before submitting or generating a PDF list.": "Confirme los modelos, las cantidades y los planos necesarios antes de enviar la solicitud o generar la lista en PDF.",
    "Select a model and add it to the list.": "Seleccione un modelo y añádalo a la lista.",
    "Remove product": "Eliminar producto",
    "Open product details in a new window": "Abrir los detalles del producto en una ventana nueva",
    "Drawing Added": "Plano añadido",
    "Add Drawing": "Añadir plano",
    "List Notes": "Notas de la lista",
    "Adding a product does not automatically request a drawing. Mark the required models here or on the product page; only marked models will be included in the drawing request.": "Añadir un producto no solicita automáticamente su plano. Marque aquí o en la página del producto los modelos necesarios; solo los modelos marcados se incluirán en la solicitud de planos.",
    "Request Drawings": "Solicitar planos",
    "Generate PDF List": "Generar lista en PDF",
    "Copy List": "Copiar lista",
    Clear: "Vaciar",
    "Confirm the models that require drawings and provide your contact information.": "Confirme los modelos para los que necesita planos e indique sus datos de contacto.",
    "No drawings requested": "No se han solicitado planos",
    "Return to the list and select Add Drawing for each required model before submitting the request.": "Vuelva a la lista y seleccione Añadir plano para cada modelo antes de enviar la solicitud.",
    "Submit Drawing Request": "Enviar solicitud de planos",
    "Drawing Request Submitted": "Solicitud de planos enviada",
    "This is currently a front-end preview. Once the email service is connected, the request will be reviewed and the relevant drawings will be sent after confirmation.": "Esta función es actualmente una vista previa. Cuando se conecte el servicio de correo, la solicitud se revisará y los planos correspondientes se enviarán tras su confirmación.",
    "Fitting Replacement Search": "Búsqueda de racores equivalentes",
  },
  fr: {
    "Product Type": "Type de produit",
    "Product Model": "Modèle de produit",
    Quantity: "Quantité",
    "Product Code": "Code produit",
    "Compatible Models": "Modèles compatibles",
    "FOREACH Product Selection List": "Liste de sélection de produits FOREACH",
    "This list is generated from the selected models for model confirmation, quotation discussions, and technical review.": "Cette liste est générée à partir des modèles sélectionnés pour confirmer les références, préparer les échanges de devis et effectuer la validation technique interne.",
    Generated: "Généré le",
    Products: "Produits",
    items: "éléments",
    "Drawing Requests": "Plans demandés",
    "No.": "N°",
    Source: "Source",
    Product: "Produit",
    "Related Information": "Informations associées",
    Model: "Modèle",
    "2D Drawing": "Plan 2D",
    "No products selected": "Aucun produit sélectionné",
    "Configured Product": "Produit configuré",
    Required: "Requis",
    "Not Required": "Non requis",
    Top: "Haut",
    List: "Liste",
    "Close selection list": "Fermer la liste de sélection",
    "Product selection list": "Liste de sélection de produits",
    "Product Selection List": "Liste de sélection de produits",
    "Confirm models, quantities, and drawing requirements before submitting or generating a PDF list.": "Confirmez les modèles, les quantités et les plans requis avant l'envoi ou la génération de la liste PDF.",
    "Select a model and add it to the list.": "Sélectionnez un modèle et ajoutez-le à la liste.",
    "Remove product": "Retirer le produit",
    "Open product details in a new window": "Ouvrir les détails du produit dans une nouvelle fenêtre",
    "Drawing Added": "Plan ajouté",
    "Add Drawing": "Ajouter le plan",
    "List Notes": "Remarques sur la liste",
    "Adding a product does not automatically request a drawing. Mark the required models here or on the product page; only marked models will be included in the drawing request.": "L'ajout d'un produit ne demande pas automatiquement son plan. Marquez les modèles requis ici ou sur leur page produit ; seuls les modèles marqués seront inclus dans la demande de plans.",
    "Request Drawings": "Demander des plans",
    "Generate PDF List": "Générer la liste PDF",
    "Copy List": "Copier la liste",
    Clear: "Vider",
    "Confirm the models that require drawings and provide your contact information.": "Confirmez les modèles nécessitant des plans et renseignez vos coordonnées.",
    "No drawings requested": "Aucun plan demandé",
    "Return to the list and select Add Drawing for each required model before submitting the request.": "Revenez à la liste et sélectionnez Ajouter le plan pour chaque modèle requis avant d'envoyer la demande.",
    "Submit Drawing Request": "Envoyer la demande de plans",
    "Drawing Request Submitted": "Demande de plans envoyée",
    "This is currently a front-end preview. Once the email service is connected, the request will be reviewed and the relevant drawings will be sent after confirmation.": "Cette fonction est actuellement proposée en aperçu. Une fois le service de messagerie connecté, la demande sera examinée et les plans concernés seront envoyés après confirmation.",
    "Fitting Replacement Search": "Recherche de raccords équivalents",
  },
  ko: {
    "Product Type": "제품 유형",
    "Product Model": "제품 모델",
    Quantity: "수량",
    "Product Code": "제품 코드",
    "Compatible Models": "호환 모델",
    "FOREACH Product Selection List": "FOREACH 제품 선정 목록",
    "This list is generated from the selected models for model confirmation, quotation discussions, and technical review.": "이 목록은 선택한 모델을 기준으로 생성되며 모델 확인, 견적 협의 및 내부 기술 검토에 사용됩니다.",
    Generated: "생성 일시",
    Products: "제품",
    items: "개",
    "Drawing Requests": "도면 요청",
    "No.": "번호",
    Source: "출처",
    Product: "제품",
    "Related Information": "관련 정보",
    Model: "모델",
    "2D Drawing": "2D 도면",
    "No products selected": "선택한 제품이 없습니다",
    "Configured Product": "구성 제품",
    Required: "필요",
    "Not Required": "불필요",
    Top: "맨 위",
    List: "목록",
    "Close selection list": "제품 선정 목록 닫기",
    "Product selection list": "제품 선정 목록",
    "Product Selection List": "제품 선정 목록",
    "Confirm models, quantities, and drawing requirements before submitting or generating a PDF list.": "요청을 제출하거나 PDF 목록을 생성하기 전에 모델, 수량 및 도면 필요 여부를 확인하십시오.",
    "Select a model and add it to the list.": "모델을 선택하여 목록에 추가하십시오.",
    "Remove product": "제품 삭제",
    "Open product details in a new window": "새 창에서 제품 상세 정보 열기",
    "Drawing Added": "도면 추가됨",
    "Add Drawing": "도면 추가",
    "List Notes": "목록 안내",
    "Adding a product does not automatically request a drawing. Mark the required models here or on the product page; only marked models will be included in the drawing request.": "제품을 목록에 추가해도 도면이 자동으로 요청되지는 않습니다. 여기 또는 제품 페이지에서 필요한 모델을 표시하면 표시된 모델만 도면 요청에 포함됩니다.",
    "Request Drawings": "도면 요청",
    "Generate PDF List": "PDF 목록 생성",
    "Copy List": "목록 복사",
    Clear: "비우기",
    "Confirm the models that require drawings and provide your contact information.": "도면이 필요한 모델을 확인하고 연락처 정보를 입력하십시오.",
    "No drawings requested": "요청한 도면이 없습니다",
    "Return to the list and select Add Drawing for each required model before submitting the request.": "목록으로 돌아가 필요한 각 모델에서 도면 추가를 선택한 후 요청을 제출하십시오.",
    "Submit Drawing Request": "도면 요청 제출",
    "Drawing Request Submitted": "도면 요청이 제출되었습니다",
    "This is currently a front-end preview. Once the email service is connected, the request will be reviewed and the relevant drawings will be sent after confirmation.": "현재는 프런트엔드 미리보기 기능입니다. 이메일 서비스가 연결되면 요청을 검토하고 확인 후 관련 도면을 발송합니다.",
    "Fitting Replacement Search": "피팅 대체품 검색",
  },
  ru: {
    "Product Type": "Тип продукции",
    "Product Model": "Модель продукции",
    Quantity: "Количество",
    "Product Code": "Код продукции",
    "Compatible Models": "Совместимые модели",
    "FOREACH Product Selection List": "Список выбранной продукции FOREACH",
    "This list is generated from the selected models for model confirmation, quotation discussions, and technical review.": "Список сформирован на основе выбранных моделей и предназначен для подтверждения моделей, обсуждения коммерческого предложения и внутренней технической проверки.",
    Generated: "Сформировано",
    Products: "Продукция",
    items: "поз.",
    "Drawing Requests": "Запрошенные чертежи",
    "No.": "№",
    Source: "Источник",
    Product: "Продукция",
    "Related Information": "Связанная информация",
    Model: "Модель",
    "2D Drawing": "2D-чертеж",
    "No products selected": "Продукция не выбрана",
    "Configured Product": "Сконфигурированная продукция",
    Required: "Требуется",
    "Not Required": "Не требуется",
    Top: "Наверх",
    List: "Список",
    "Close selection list": "Закрыть список выбранной продукции",
    "Product selection list": "Список выбранной продукции",
    "Product Selection List": "Список выбранной продукции",
    "Confirm models, quantities, and drawing requirements before submitting or generating a PDF list.": "Перед отправкой или созданием списка PDF проверьте модели, количество и необходимость чертежей.",
    "Select a model and add it to the list.": "Выберите модель и добавьте ее в список.",
    "Remove product": "Удалить продукцию",
    "Open product details in a new window": "Открыть сведения о продукции в новом окне",
    "Drawing Added": "Чертеж добавлен",
    "Add Drawing": "Добавить чертеж",
    "List Notes": "Примечания к списку",
    "Adding a product does not automatically request a drawing. Mark the required models here or on the product page; only marked models will be included in the drawing request.": "Добавление продукции не создает запрос чертежа автоматически. Отметьте необходимые модели здесь или на странице продукции; в запрос войдут только отмеченные модели.",
    "Request Drawings": "Запросить чертежи",
    "Generate PDF List": "Создать список PDF",
    "Copy List": "Копировать список",
    Clear: "Очистить",
    "Confirm the models that require drawings and provide your contact information.": "Подтвердите модели, для которых нужны чертежи, и укажите контактные данные.",
    "No drawings requested": "Чертежи не запрошены",
    "Return to the list and select Add Drawing for each required model before submitting the request.": "Вернитесь к списку и выберите Добавить чертеж для каждой требуемой модели перед отправкой запроса.",
    "Submit Drawing Request": "Отправить запрос чертежей",
    "Drawing Request Submitted": "Запрос чертежей отправлен",
    "This is currently a front-end preview. Once the email service is connected, the request will be reviewed and the relevant drawings will be sent after confirmation.": "Сейчас функция работает в режиме предварительного просмотра. После подключения почтового сервиса запрос будет рассмотрен, а соответствующие чертежи будут отправлены после подтверждения.",
    "Fitting Replacement Search": "Поиск аналогов фитингов",
  },
};

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

function getEnglishCartSourceLabel(sourceType: string) {
  return sourceType === "pump-selection"
    ? "Products"
    : "Fitting Replacement Search";
}

function getCartDetailHref(
  href: string | undefined,
  isInternational: boolean,
) {
  if (
    !href ||
    !isInternational ||
    !href.startsWith("/") ||
    href.startsWith("/en/") ||
    href === "/en"
  ) {
    return href;
  }

  return `/en${href}`;
}

export default function GlobalSelectionCartDrawer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const isEnglish = locale === "en";
  const isInternational = locale !== "zh-CN";
  const cartText = useCallback((english: string, chinese: string) => {
    if (isEnglish) return english;
    if (locale === "zh-CN") return chinese;

    return TARGET_CART_TRANSLATIONS[
      locale as "es" | "fr" | "ko" | "ru"
    ]?.[english] || english;
  }, [isEnglish, locale]);

  const {
    items,
    isOpen,
    openCart,
    closeCart,
    changeQuantity,
    toggleDrawingNeed,
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
                `${cartText("Product Type", "产品类型")}: ${item.productName}`,
                `${cartText("Product Model", "产品型号")}: ${item.foreachModel}`,
                `${cartText("Quantity", "数量")}: ${item.quantity}`,
              ]
            : [
                `${cartText("Product Code", "商品编码")}: ${item.productCode}`,
                `${cartText("Compatible Models", "兼容编码")}: ${item.competitorModels.join(" / ") || "-"}`,
                `${cartText("Quantity", "数量")}: ${item.quantity}`,
              ],
      };
    });
  }, [cartText, requestDrawingItems]);

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
     图纸申请模拟提交

     说明：
     1. 当前只打印数据，方便后续确认字段结构
     2. 不发送邮件
     3. 后续正式提交改为调用：
        services/resources/requestDrawing.ts
  ========================================================= */
  function handleSubmitDrawingRequest(formValue: CompanyInfoFormValue) {
    const payload = {
      customer: formValue,
      drawingItems: requestDrawingItems,
      fullCartItems: items,
    };

    console.log("图纸申请前端模拟数据：", payload);
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
          <img src={PDF_HEADER_GRAPHIC_SRC} alt="FOREACH PDF Header" />
        </header>

        <main className={styles.printContent}>
          <section className={styles.printTitleBlock}>
            <h1>{cartText("FOREACH Product Selection List", "恒永达选型清单")}</h1>
            <p>
              {cartText(
                "This list is generated from the selected models for model confirmation, quotation discussions, and technical review.",
                "本清单根据客户选择的型号生成，用于型号确认、报价沟通及内部技术确认。",
              )}
            </p>
          </section>

          <section className={styles.printMetaGrid}>
            <div>
              <span>{cartText("Generated", "生成时间")}</span>
              <strong>{printTime || "-"}</strong>
            </div>

            <div>
              <span>{cartText("Products", "产品数量")}</span>
              <strong>{items.length} {cartText("items", "项")}</strong>
            </div>

            <div>
              <span>{cartText("Drawing Requests", "图纸需求")}</span>
              <strong>{drawingNeedCount} {cartText("items", "项")}</strong>
            </div>
          </section>

          <table className={styles.printTable}>
            <thead>
              <tr>
                <th>{cartText("No.", "序号")}</th>
                <th>{cartText("Source", "来源")}</th>
                <th>{cartText("Product", "产品信息")}</th>
                <th>{cartText("Related Information", "关联信息")}</th>
                <th>{cartText("Model", "型号")}</th>
                <th>{cartText("Quantity", "数量")}</th>
                <th>{cartText("2D Drawing", "2D 图纸")}</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    {cartText("No products selected", "暂无选型产品")}
                  </td>
                </tr>
              ) : (
                items.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        {cartText(
                          getEnglishCartSourceLabel(item.sourceType),
                          item.sourceLabel,
                        )}
                      </td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? item.productName
                          : item.productCode}
                      </td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? cartText("Configured Product", "定制选型产品")
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>
                        {item.needDrawing
                          ? cartText("Required", "需要")
                          : cartText("Not Required", "暂不需要")}
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
          <img src={PDF_FOOTER_GRAPHIC_SRC} alt="FOREACH PDF Footer" />
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
          {cartText("Top", "顶部")}
        </button>

        <button type="button" onClick={openCart}>
          {cartText("List", "清单")}
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
            aria-label={cartText("Close selection list", "关闭选型清单")}
            onClick={closeCart}
          />

          <aside
            className={styles.drawer}
            aria-label={cartText("Product selection list", "选型清单")}
          >
            <div className={styles.head}>
              <div>
                <h2>{cartText("Product Selection List", "选型清单")}</h2>
                <p>
                  {cartText(
                    "Confirm models, quantities, and drawing requirements before submitting or generating a PDF list.",
                    "确认型号、数量与图纸需求，后续可统一提交或生成资料包。",
                  )}
                </p>
              </div>

              <button
                type="button"
                onClick={closeCart}
                aria-label={cartText("Close selection list", "关闭选型清单")}
              >
                ×
              </button>
            </div>

            <div className={styles.body}>
              {items.length === 0 ? (
                <div className={styles.empty}>
                  {cartText("No products selected", "暂无选型产品")}
                  <br />
                  {cartText(
                    "Select a model and add it to the list.",
                    "可先选择型号并加入清单",
                  )}
                </div>
              ) : (
                <>
                  <div className={styles.summary}>
                    <div>
                      <span>{cartText("Products", "产品数量")}</span>
                      <strong>{items.length}</strong>
                      <em>{cartText("items", "项")}</em>
                    </div>

                    <div>
                      <span>{cartText("Drawing Requests", "图纸需求")}</span>
                      <strong>{drawingNeedCount}</strong>
                      <em>{cartText("items", "项")}</em>
                    </div>
                  </div>

                  <div className={styles.list}>
                    {items.map((item) => {
                      return (
                        <article className={styles.item} key={item.id}>
                          <button
                            className={styles.removeButton}
                            type="button"
                            aria-label={cartText("Remove product", "删除该产品")}
                            onClick={() => {
                              removeItem(item.id);
                            }}
                          >
                            ×
                          </button>

                          <div className={styles.itemHead}>
                            <div>
                              <span>
                                {cartText(
                                  getEnglishCartSourceLabel(item.sourceType),
                                  item.sourceLabel,
                                )}
                              </span>

                              {item.detailHref && item.sourceType !== "pump-selection" ? (
                                <Link
                                  className={styles.itemTitleLink}
                                  href={getCartDetailHref(item.detailHref, isInternational) ?? "#"}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={cartText("Open product details in a new window", "新窗口打开详情页")}
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
                                ? cartText("Drawing Added", "已添加图纸")
                                : cartText("Add Drawing", "添加图纸")}
                            </button>
                          </div>

                          {item.sourceType === "pump-selection" ? (
                            <div className={styles.infoRow}>
                              <span>{cartText("Product Type", "产品类型")}</span>
                              <strong>{item.productName}</strong>
                            </div>
                          ) : (
                            <>
                              <div className={styles.infoRow}>
                                <span>{cartText("Compatible Models", "兼容编码")}</span>
                                <strong>
                                  {item.competitorModels.join(" / ") || "-"}
                                </strong>
                              </div>

                              <div className={styles.infoRow}>
                                <span>{cartText("Product Code", "商品编码")}</span>
                                <strong>{item.productCode}</strong>
                              </div>
                            </>
                          )}

                          <div className={styles.quantityRow}>
                            <label htmlFor={`global-cart-qty-${item.id}`}>
                              {cartText("Quantity", "数量")}
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
                <strong>{cartText("List Notes", "清单说明")}</strong>
                <p>
                  {cartText(
                    "Adding a product does not automatically request a drawing. Mark the required models here or on the product page; only marked models will be included in the drawing request.",
                    "产品加入清单后不会默认发送图纸。需要图纸的型号，可在详情页或清单中切换。后续提交需求时，只会把标记“需要图纸”的型号纳入图纸发送范围。",
                  )}
                </p>
              </div>
            </div>

            <div className={styles.footer}>
              <button
                className={styles.requestDrawingButton}
                type="button"
                onClick={handleOpenDrawingRequestModal}
              >
                {cartText("Request Drawings", "申请图纸")}
              </button>

              <button
                className={styles.primaryButton}
                type="button"
                onClick={handleGeneratePdfList}
              >
                {cartText("Generate PDF List", "生成 PDF 清单")}
              </button>

              <button
                className={styles.secondaryButton}
                type="button"
                onClick={copyCartText}
              >
                {cartText("Copy List", "复制分享")}
              </button>

              <button
                className={styles.secondaryButton}
                type="button"
                onClick={clearCart}
              >
                {cartText("Clear", "清空")}
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
        title={cartText("Request Drawings", "申请图纸")}
        description={
          cartText(
            "Confirm the models that require drawings and provide your contact information.",
            "请确认需要申请的图纸型号，并留下联系信息。",
          )
        }
        items={drawingRequestModalItems}
        emptyTitle={cartText("No drawings requested", "当前还没有图纸需求")}
        emptyDescription={
          cartText(
            "Return to the list and select Add Drawing for each required model before submitting the request.",
            "请先回到清单，在需要图纸的型号旁点击“添加图纸”，再提交图纸申请。",
          )
        }
        submitLabel={cartText("Submit Drawing Request", "提交申请图纸")}
        successTitle={cartText("Drawing Request Submitted", "图纸申请已提交")}
        successDescription={
          cartText(
            "This is currently a front-end preview. Once the email service is connected, the request will be reviewed and the relevant drawings will be sent after confirmation.",
            "当前为前端视觉模拟。正式上线后，我们会通过邮件接口接收申请，并在确认信息后发送相关图纸资料。",
          )
        }
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




