# 隔膜泵详情页按钮问题检查

## 1. ProductDetailClient 按钮渲染区域


### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 300

  function handleOpenConfigurator() {
    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    console.info("添加图纸端口预留", data.slug);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
    console.info("加入清单端口预留", data.slug);
  }

  return (
    <div data-product-breadcrumb-shell="true">
<SitePageShell
      breadcrumbAriaLabel="面包屑导航"
      breadcrumbItems={[
        {
          label: "首页",
          href: "/",
        },

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 301

    console.info("配置选择端口预留", data.slug);
  }

  function handleAddDatasheet() {
    console.info("添加规格书端口预留", data.slug);
  }

  function handleAddDrawing() {
    console.info("添加图纸端口预留", data.slug);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
    console.info("加入清单端口预留", data.slug);
  }

  return (
    <div data-product-breadcrumb-shell="true">
<SitePageShell
      breadcrumbAriaLabel="面包屑导航"
      breadcrumbItems={[
        {
          label: "首页",
          href: "/",
        },
        {

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 308

  function handleAddDrawing() {
    console.info("添加图纸端口预留", data.slug);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
    console.info("加入清单端口预留", data.slug);
  }

  return (
    <div data-product-breadcrumb-shell="true">
<SitePageShell
      breadcrumbAriaLabel="面包屑导航"
      breadcrumbItems={[
        {
          label: "首页",
          href: "/",
        },
        {
          label: "产品中心",
          href: "/products/",
        },
        {
          label: data.model,
        },
      ]}

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 309

    console.info("添加图纸端口预留", data.slug);
  }

  function handleRequest3DFile() {
    console.info("申请3D文件端口预留", data.slug);
  }

  function handleAddList() {
    console.info("加入清单端口预留", data.slug);
  }

  return (
    <div data-product-breadcrumb-shell="true">
<SitePageShell
      breadcrumbAriaLabel="面包屑导航"
      breadcrumbItems={[
        {
          label: "首页",
          href: "/",
        },
        {
          label: "产品中心",
          href: "/products/",
        },
        {
          label: data.model,
        },
      ]}
    >

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 635

                    type="button"
                    onClick={handleOpenConfigurator}
                  >
                    配置选择
                  </button>
                ) : null}
              </div>

              <div data-product-action-grid="true" className={styles.actionRow}>
                {data.showDatasheetRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDatasheet}
                  >
                    添加规格书
                  </button>
                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
                  </button>
                ) : null}


### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 636

                    onClick={handleOpenConfigurator}
                  >
                    配置选择
                  </button>
                ) : null}
              </div>

              <div data-product-action-grid="true" className={styles.actionRow}>
                {data.showDatasheetRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDatasheet}
                  >
                    添加规格书
                  </button>
                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
                  </button>
                ) : null}

                {data.show3DRequest ? (

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 646

                    className={styles.button}
                    type="button"
                    onClick={handleAddDatasheet}
                  >
                    添加规格书
                  </button>
                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
                  </button>
                ) : null}

                {data.show3DRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleRequest3DFile}
                  >
                    申请3D文件
                  </button>
                ) : null}

                <button

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 650

                    添加规格书
                  </button>
                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
                  </button>
                ) : null}

                {data.show3DRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleRequest3DFile}
                  >
                    申请3D文件
                  </button>
                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 652

                ) : null}

                {data.showDrawingRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
                  </button>
                ) : null}

                {data.show3DRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleRequest3DFile}
                  >
                    申请3D文件
                  </button>
                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >
                  加入清单
                </button>

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 656

                    className={styles.button}
                    type="button"
                    onClick={handleAddDrawing}
                  >
                    添加图纸
                  </button>
                ) : null}

                {data.show3DRequest ? (
                  <button
                    className={styles.button}
                    type="button"
                    onClick={handleRequest3DFile}
                  >
                    申请3D文件
                  </button>
                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >
                  加入清单
                </button>
              </div>
            </div>
          </div>
        </section>

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 669

                  >
                    申请3D文件
                  </button>
                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >
                  加入清单
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.detailSection}>
          <nav className={styles.tabNav} aria-label="产品资料切换">
            <button
              className={[
                styles.tabButton,
                activeTab === "spec" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              onClick={() => setActiveTab("spec")}
            >

### F:\WebsiteProjects\foreach-website-2026\components\products\detail\ProductDetailClient.tsx Line 671

                  </button>
                ) : null}

                <button
                  className={styles.button}
                  type="button"
                  onClick={handleAddList}
                >
                  加入清单
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.detailSection}>
          <nav className={styles.tabNav} aria-label="产品资料切换">
            <button
              className={[
                styles.tabButton,
                activeTab === "spec" ? styles.isActive : "",
              ]
                .filter(Boolean)
                .join(" ")}
              type="button"
              onClick={() => setActiveTab("spec")}
            >
              规格
            </button>

---

## 2. 隔膜泵详情页适配层是否传 showDrawingRequest / showAddList


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 81

    description?: string;
    pageTitle?: string;
    path?: string;
  };
  specifications?: DiaphragmSpec[];
  modelConfigurations?: DiaphragmModelConfig[];
  faqs?: DiaphragmFaq[];
  media?: DiaphragmMedia[];
};

const details = detailsJson as DiaphragmDetail[];

const ProductDetailView = ProductDetailClient as unknown as ComponentType<{
  data: any;
}>;

function getText(value: unknown) {
  return String(value || "").trim();
}

function normalizeSlug(value: unknown) {
  const parts = getText(value).split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 260

      .filter((item) => item.label && item.value),
  }));

  return groups.filter((group) => group.items.length > 0);
}

function normalizeFaqs(detail: DiaphragmDetail) {
  return (detail.faqs || [])
    .map((item) => ({
      question: getText(item.question),
      answer: getText(item.answer),
    }))
    .filter((item) => item.question && item.answer);
}

function normalizeModelConfigurations(detail: DiaphragmDetail) {
  return (detail.modelConfigurations || []).map((item) => ({
    itemCode: getText(item.itemCode),
    model: getText(item.model),
    category: getText(item.category),
    motorType: getText(item.motorType),
    voltage: getText(item.voltage),
    connectionType: getText(item.connectionType),

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 261

  }));

  return groups.filter((group) => group.items.length > 0);
}

function normalizeFaqs(detail: DiaphragmDetail) {
  return (detail.faqs || [])
    .map((item) => ({
      question: getText(item.question),
      answer: getText(item.answer),
    }))
    .filter((item) => item.question && item.answer);
}

function normalizeModelConfigurations(detail: DiaphragmDetail) {
  return (detail.modelConfigurations || []).map((item) => ({
    itemCode: getText(item.itemCode),
    model: getText(item.model),
    category: getText(item.category),
    motorType: getText(item.motorType),
    voltage: getText(item.voltage),
    connectionType: getText(item.connectionType),
    portDirection: getText(item.portDirection),

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 316

  const title = getText(detail.title || detail.displayName || detail.seriesId);
  const seriesId = getText(detail.seriesId);
  const description = getText(detail.description);
  const applications = splitApplications(detail.commonApplications);
  const specifications = dedupeSpecifications(normalizeSpecifications(detail));
  const specGroups = groupSpecifications(detail);
  const faqs = normalizeFaqs(detail);
  const modelConfigurations = normalizeModelConfigurations(detail);
  const seriesTypeLabel = getSeriesTypeLabel(detail);

  const mainImageUrl = findMediaUrlByType(detail, "主图");
  const drawing2dUrl = findMediaUrlByType(detail, "2D");
  const model3dUrl = findMediaUrlByType(detail, "3D");
  const curveImageUrl = findMediaUrlByType(detail, "曲线");
  const datasheetUrl = findMediaUrlByType(detail, "规格书");

  return {
    ...detail,

    id: slug,
    productId: slug,
    slug,
    detailSlug: slug,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 321

  const specGroups = groupSpecifications(detail);
  const faqs = normalizeFaqs(detail);
  const modelConfigurations = normalizeModelConfigurations(detail);
  const seriesTypeLabel = getSeriesTypeLabel(detail);

  const mainImageUrl = findMediaUrlByType(detail, "主图");
  const drawing2dUrl = findMediaUrlByType(detail, "2D");
  const model3dUrl = findMediaUrlByType(detail, "3D");
  const curveImageUrl = findMediaUrlByType(detail, "曲线");
  const datasheetUrl = findMediaUrlByType(detail, "规格书");

  return {
    ...detail,

    id: slug,
    productId: slug,
    slug,
    detailSlug: slug,

    name: title,
    title,
    model: title,
    productName: title,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 322

  const faqs = normalizeFaqs(detail);
  const modelConfigurations = normalizeModelConfigurations(detail);
  const seriesTypeLabel = getSeriesTypeLabel(detail);

  const mainImageUrl = findMediaUrlByType(detail, "主图");
  const drawing2dUrl = findMediaUrlByType(detail, "2D");
  const model3dUrl = findMediaUrlByType(detail, "3D");
  const curveImageUrl = findMediaUrlByType(detail, "曲线");
  const datasheetUrl = findMediaUrlByType(detail, "规格书");

  return {
    ...detail,

    id: slug,
    productId: slug,
    slug,
    detailSlug: slug,

    name: title,
    title,
    model: title,
    productName: title,
    productCode: seriesId,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 392

    specifications,
    specs: specifications,
    specList: specifications,
    technicalSpecifications: specifications,
    specGroups,

    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dUrl,
      model3dUrl,
      curveImageUrl,
      datasheetUrl,
    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 394

    specList: specifications,
    technicalSpecifications: specifications,
    specGroups,

    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dUrl,
      model3dUrl,
      curveImageUrl,
      datasheetUrl,
    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 395

    technicalSpecifications: specifications,
    specGroups,

    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dUrl,
      model3dUrl,
      curveImageUrl,
      datasheetUrl,
    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 397


    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dUrl,
      model3dUrl,
      curveImageUrl,
      datasheetUrl,
    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 398

    faqs,

    resources: {
      drawing2dRequestOnly: false,
      model3dRequestOnly: false,
      drawing2dUrl,
      model3dUrl,
      curveImageUrl,
      datasheetUrl,
    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 403

      drawing2dUrl,
      model3dUrl,
      curveImageUrl,
      datasheetUrl,
    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 406

      datasheetUrl,
    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 407

    },

    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 408


    drawing2dRequestOnly: false,
    model3dRequestOnly: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",


### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 410

    model3dRequestOnly: false,

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 411


    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 412

    model3dUrl,
    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 413

    drawing2dUrl,
    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },
      { label: title, href: "/products/pumps/diaphragm-pumps/" + slug },

### F:\WebsiteProjects\foreach-website-2026\app\products\pumps\diaphragm-pumps\[slug]\page.tsx Line 414

    drawingPdfUrl: drawing2dUrl,

    model3dHref: model3dUrl,
    drawing2dHref: drawing2dUrl,
    drawingHref: drawing2dUrl,
    partDrawingUrl: drawing2dUrl,
    partDrawingHref: drawing2dUrl,

    curveImageUrl,
    datasheetUrl,
    datasheetHref: datasheetUrl,

    model3dText: "查看 3D 模型",
    drawing2dText: "查看 2D 图纸",
    drawingText: "查看零件图",
    partDrawingText: "查看零件图",

    breadcrumbs: [
      { label: "产品中心", href: "/products" },
      { label: "泵", href: "/products/pumps" },
      { label: "隔膜泵", href: "/products/pumps/diaphragm-pumps" },
      { label: title, href: "/products/pumps/diaphragm-pumps/" + slug },
    ],

---

## 3. 当前 8 个隔膜泵详情数据里的图纸字段


--- dpl30-24db-ep-ps-liquid-diaphragm-pump ---
media:  => public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp
 => public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-liquid-diaphragm-pump-main.webp
 => public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushed-liquid-diaphragm-pump.glb
 => public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushless-liquid-diaphragm-pump.glb
 => public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf
 => public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf
 => public/images/products/pumps/diaphragm-pumps/dpl30/curves/dpl30-liquid-diaphragm-pump-flow-pressure-curve.webp
 => public/documents/products/pumps/diaphragm-pumps/dpl30/datasheets/dpl30-liquid-diaphragm-pump-datasheet-cn.pdf
keys: modelDisplay | modelButtonText | modelConfigurations

--- dpl30-24bb-ep-ps-liquid-diaphragm-pump ---
media:  => public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushed-liquid-diaphragm-pump-main.webp
 => public/images/products/pumps/diaphragm-pumps/dpl30/images/dpl30-brushless-liquid-diaphragm-pump-main.webp
 => public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushed-liquid-diaphragm-pump.glb
 => public/models/products/pumps/diaphragm-pumps/dpl30/dpl30-brushless-liquid-diaphragm-pump.glb
 => public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushed-liquid-diaphragm-pump-2d-drawing.pdf
 => public/documents/products/pumps/diaphragm-pumps/dpl30/drawings/dpl30-brushless-liquid-diaphragm-pump-2d-drawing.pdf
 => public/images/products/pumps/diaphragm-pumps/dpl30/curves/dpl30-liquid-diaphragm-pump-flow-pressure-curve.webp
 => public/documents/products/pumps/diaphragm-pumps/dpl30/datasheets/dpl30-liquid-diaphragm-pump-datasheet-cn.pdf
keys: modelDisplay | modelButtonText | modelConfigurations

--- dpl60-24db-ep-ps-liquid-diaphragm-pump ---
media:  => public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushed-liquid-diaphragm-pump-main.webp
 => public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushless-liquid-diaphragm-pump-main.webp
 => public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushed-liquid-diaphragm-pump.glb
 => public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushless-liquid-diaphragm-pump.glb
 => public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf
 => public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf
 => public/images/products/pumps/diaphragm-pumps/dpl60/curves/dpl60-liquid-diaphragm-pump-flow-pressure-curve.webp
 => public/documents/products/pumps/diaphragm-pumps/dpl60/datasheets/dpl60-liquid-diaphragm-pump-datasheet-cn.pdf
keys: modelDisplay | modelButtonText | modelConfigurations

--- dpl60-24bb-ep-ps-liquid-diaphragm-pump ---
media:  => public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushed-liquid-diaphragm-pump-main.webp
 => public/images/products/pumps/diaphragm-pumps/dpl60/images/dpl60-brushless-liquid-diaphragm-pump-main.webp
 => public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushed-liquid-diaphragm-pump.glb
 => public/models/products/pumps/diaphragm-pumps/dpl60/dpl60-brushless-liquid-diaphragm-pump.glb
 => public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushed-liquid-diaphragm-pump-2d-drawing.pdf
 => public/documents/products/pumps/diaphragm-pumps/dpl60/drawings/dpl60-brushless-liquid-diaphragm-pump-2d-drawing.pdf
 => public/images/products/pumps/diaphragm-pumps/dpl60/curves/dpl60-liquid-diaphragm-pump-flow-pressure-curve.webp
 => public/documents/products/pumps/diaphragm-pumps/dpl60/datasheets/dpl60-liquid-diaphragm-pump-datasheet-cn.pdf
keys: modelDisplay | modelButtonText | modelConfigurations

--- dpl30h-24ds-ep-ps-liquid-diaphragm-pump ---
media:  => public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushed-liquid-diaphragm-pump-main.webp
 => public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushless-liquid-diaphragm-pump-main.webp
 => public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushed-liquid-diaphragm-pump.glb
 => public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushless-liquid-diaphragm-pump.glb
 => public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf
 => public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf
 => public/images/products/pumps/diaphragm-pumps/dpl30h/curves/dpl30h-liquid-diaphragm-pump-flow-pressure-curve.webp
 => public/documents/products/pumps/diaphragm-pumps/dpl30h/datasheets/dpl30h-liquid-diaphragm-pump-datasheet-cn.pdf
keys: modelDisplay | modelButtonText | modelConfigurations

--- dpl30h-24bs-ep-ps-liquid-diaphragm-pump ---
media:  => public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushed-liquid-diaphragm-pump-main.webp
 => public/images/products/pumps/diaphragm-pumps/dpl30h/images/dpl30h-brushless-liquid-diaphragm-pump-main.webp
 => public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushed-liquid-diaphragm-pump.glb
 => public/models/products/pumps/diaphragm-pumps/dpl30h/dpl30h-brushless-liquid-diaphragm-pump.glb
 => public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushed-liquid-diaphragm-pump-2d-drawing.pdf
 => public/documents/products/pumps/diaphragm-pumps/dpl30h/drawings/dpl30h-brushless-liquid-diaphragm-pump-2d-drawing.pdf
 => public/images/products/pumps/diaphragm-pumps/dpl30h/curves/dpl30h-liquid-diaphragm-pump-flow-pressure-curve.webp
 => public/documents/products/pumps/diaphragm-pumps/dpl30h/datasheets/dpl30h-liquid-diaphragm-pump-datasheet-cn.pdf
keys: modelDisplay | modelButtonText | modelConfigurations

--- dpgl800-24bs6-ep-ps-gas-liquid-diaphragm-pump ---
media:  => public/images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp
 => public/models/products/pumps/diaphragm-pumps/dpgl800/dpgl800-gas-liquid-diaphragm-pump.glb
 => public/documents/products/pumps/diaphragm-pumps/dpgl800/drawings/dpgl800-gas-liquid-diaphragm-pump-2d-drawing.pdf
 => public/images/products/pumps/diaphragm-pumps/dpgl800/curves/dpgl800-gas-liquid-diaphragm-pump-flow-pressure-curve.webp
 => public/images/products/pumps/diaphragm-pumps/dpgl800/curves/dpgl800-gas-liquid-diaphragm-pump-5l-pressure-curve.webp
 => public/documents/products/pumps/diaphragm-pumps/dpgl800/datasheets/dpgl800-gas-liquid-diaphragm-pump-datasheet-cn.pdf
keys: modelDisplay | modelButtonText | modelConfigurations

--- dpgl800-24bs6-ff-ps-gas-liquid-diaphragm-pump ---
media:  => public/images/products/pumps/diaphragm-pumps/dpgl800/images/dpgl800-gas-liquid-diaphragm-pump-main.webp
 => public/models/products/pumps/diaphragm-pumps/dpgl800/dpgl800-gas-liquid-diaphragm-pump.glb
 => public/documents/products/pumps/diaphragm-pumps/dpgl800/drawings/dpgl800-gas-liquid-diaphragm-pump-2d-drawing.pdf
 => public/images/products/pumps/diaphragm-pumps/dpgl800/curves/dpgl800-gas-liquid-diaphragm-pump-flow-pressure-curve.webp
 => public/images/products/pumps/diaphragm-pumps/dpgl800/curves/dpgl800-gas-liquid-diaphragm-pump-5l-pressure-curve.webp
 => public/documents/products/pumps/diaphragm-pumps/dpgl800/datasheets/dpgl800-gas-liquid-diaphragm-pump-datasheet-cn.pdf
keys: modelDisplay | modelButtonText | modelConfigurations

---

## 4. 清单 Provider 是否支持详情页加入清单字段


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 48

  items: SelectionCartItem[];
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;

  addItem: (item: SelectionCartItemInput) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;

  copyCartText: () => Promise<void>;
  generatePdfList: () => void;

  printTime: string;
}

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 49

  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;

  addItem: (item: SelectionCartItemInput) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;

  copyCartText: () => Promise<void>;
  generatePdfList: () => void;

  printTime: string;
}


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 52

  closeCart: () => void;

  addItem: (item: SelectionCartItemInput) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;

  copyCartText: () => Promise<void>;
  generatePdfList: () => void;

  printTime: string;
}

const SelectionCartContext = createContext<SelectionCartContextValue | null>(
  null
);

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 53


  addItem: (item: SelectionCartItemInput) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;

  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;

  copyCartText: () => Promise<void>;
  generatePdfList: () => void;

  printTime: string;
}

const SelectionCartContext = createContext<SelectionCartContextValue | null>(
  null
);


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 57


  changeQuantity: (id: string, quantity: number) => void;
  toggleDrawingNeed: (id: string, needDrawing: boolean) => void;

  getItem: (
    sourceType: SelectionCartSourceType,
    productCode: string
  ) => SelectionCartItem | undefined;

  copyCartText: () => Promise<void>;
  generatePdfList: () => void;

  printTime: string;
}

const SelectionCartContext = createContext<SelectionCartContextValue | null>(
  null
);

/* =========================================================
   生成清单项 ID
========================================================= */
function buildCartItemId(item: {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 75


/* =========================================================
   生成清单项 ID
========================================================= */
function buildCartItemId(item: {
  sourceType: SelectionCartSourceType;
  productCode: string;
}) {
  return `${item.sourceType}:${item.productCode}`;
}

/* =========================================================
   兼容旧版接头清单数据

   说明：
   旧版 FittingSelectionCartItem 没有 sourceType、sourceLabel、productName。
   这里做一次兼容转换。
========================================================= */
function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 77

   生成清单项 ID
========================================================= */
function buildCartItemId(item: {
  sourceType: SelectionCartSourceType;
  productCode: string;
}) {
  return `${item.sourceType}:${item.productCode}`;
}

/* =========================================================
   兼容旧版接头清单数据

   说明：
   旧版 FittingSelectionCartItem 没有 sourceType、sourceLabel、productName。
   这里做一次兼容转换。
========================================================= */
function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 84

}

/* =========================================================
   兼容旧版接头清单数据

   说明：
   旧版 FittingSelectionCartItem 没有 sourceType、sourceLabel、productName。
   这里做一次兼容转换。
========================================================= */
function normalizeLegacyFittingItems(rawItems: unknown): SelectionCartItem[] {
  if (!Array.isArray(rawItems)) return [];

  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;
        foreachModel?: string;
        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 95


  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;
        foreachModel?: string;
        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;
      };

      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 96

  return rawItems
    .map((item) => {
      if (!item || typeof item !== "object") return null;

      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;
        foreachModel?: string;
        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;
      };

      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 98

      if (!item || typeof item !== "object") return null;

      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;
        foreachModel?: string;
        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;
      };

      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 99


      const raw = item as Partial<SelectionCartItem> & {
        productCode?: string;
        foreachModel?: string;
        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;
      };

      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 103

        competitorModels?: string[];
        quantity?: number;
        needDrawing?: boolean;
        imagePath?: string;
      };

      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 108


      if (!raw.productCode || !raw.foreachModel) return null;

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 111

      const normalizedItem: SelectionCartItem = {
        id: buildCartItemId({
          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 113

          sourceType: "fitting-replacement",
          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

/* =========================================================

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 114

          productCode: raw.productCode,
        }),
        sourceType: "fitting-replacement",
        sourceLabel: "接头型号替代查询",
        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

/* =========================================================
   生成复制文本

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 118

        productName: "Q20 快插接头",
        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

/* =========================================================
   生成复制文本
========================================================= */
function buildCartText(items: SelectionCartItem[]) {
  if (items.length === 0) {
    return "暂无选型产品";

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 119

        productCode: raw.productCode,
        foreachModel: raw.foreachModel,
        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

/* =========================================================
   生成复制文本
========================================================= */
function buildCartText(items: SelectionCartItem[]) {
  if (items.length === 0) {
    return "暂无选型产品";
  }

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 121

        competitorModels: Array.isArray(raw.competitorModels)
          ? raw.competitorModels
          : [],
        quantity: Math.max(1, Number(raw.quantity || 1)),
        needDrawing: Boolean(raw.needDrawing),
        imagePath: raw.imagePath,
        detailHref: `/resources/selection-support/fitting-replacement/q20/${raw.productCode}`,
      };

      return normalizedItem;
    })
    .filter(Boolean) as SelectionCartItem[];
}

/* =========================================================
   生成复制文本
========================================================= */
function buildCartText(items: SelectionCartItem[]) {
  if (items.length === 0) {
    return "暂无选型产品";
  }

  const lines = items.map((item, index) => {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 143

  const lines = items.map((item, index) => {
    const isPumpSelection = item.sourceType === "pump-selection";

    if (isPumpSelection) {
      return [
        `#${index + 1}`,
        `来源：${item.sourceLabel}`,
        `产品类型：${item.productName}`,
        `产品型号：${item.foreachModel}`,
        `数量：${item.quantity}`,
        `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
      ].join("\n");
    }

    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 145


    if (isPumpSelection) {
      return [
        `#${index + 1}`,
        `来源：${item.sourceLabel}`,
        `产品类型：${item.productName}`,
        `产品型号：${item.foreachModel}`,
        `数量：${item.quantity}`,
        `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
      ].join("\n");
    }

    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 146

    if (isPumpSelection) {
      return [
        `#${index + 1}`,
        `来源：${item.sourceLabel}`,
        `产品类型：${item.productName}`,
        `产品型号：${item.foreachModel}`,
        `数量：${item.quantity}`,
        `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
      ].join("\n");
    }

    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 147

      return [
        `#${index + 1}`,
        `来源：${item.sourceLabel}`,
        `产品类型：${item.productName}`,
        `产品型号：${item.foreachModel}`,
        `数量：${item.quantity}`,
        `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
      ].join("\n");
    }

    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return lines.join("\n\n");

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 153

        `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
      ].join("\n");
    }

    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return lines.join("\n\n");
}
export function SelectionCartProvider({
  children,
}: {
  children: ReactNode;
}) {

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 155

    }

    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return lines.join("\n\n");
}
export function SelectionCartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<SelectionCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 156


    return [
      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return lines.join("\n\n");
}
export function SelectionCartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<SelectionCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 158

      `#${index + 1}`,
      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return lines.join("\n\n");
}
export function SelectionCartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<SelectionCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [printTime, setPrintTime] = useState("");


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 159

      `来源：${item.sourceLabel}`,
      `产品：${item.productName}`,
      `商品编码：${item.productCode}`,
      `恒永达型号：${item.foreachModel}`,
      `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
      `数量：${item.quantity}`,
      `2D 图纸：${item.needDrawing ? "需要" : "暂不需要"}`,
    ].join("\n");
  });

  return lines.join("\n\n");
}
export function SelectionCartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [items, setItems] = useState<SelectionCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [printTime, setPrintTime] = useState("");

  /* 读取本地缓存 */

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 187

        const parsedGlobalCart = JSON.parse(rawGlobalCart) as SelectionCartItem[];

        setItems(
          parsedGlobalCart.map((item) => {
            return {
              ...item,
              quantity: Math.max(1, Number(item.quantity || 1)),
              needDrawing: Boolean(item.needDrawing),
            };
          })
        );

        setHasMounted(true);
        return;
      }

      /* 兼容旧版接头清单 */
      const rawLegacyCart = window.localStorage.getItem(
        LEGACY_FITTING_CART_STORAGE_KEY
      );

      if (rawLegacyCart) {
        const parsedLegacyCart = JSON.parse(rawLegacyCart);

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 188


        setItems(
          parsedGlobalCart.map((item) => {
            return {
              ...item,
              quantity: Math.max(1, Number(item.quantity || 1)),
              needDrawing: Boolean(item.needDrawing),
            };
          })
        );

        setHasMounted(true);
        return;
      }

      /* 兼容旧版接头清单 */
      const rawLegacyCart = window.localStorage.getItem(
        LEGACY_FITTING_CART_STORAGE_KEY
      );

      if (rawLegacyCart) {
        const parsedLegacyCart = JSON.parse(rawLegacyCart);
        const migratedItems = normalizeLegacyFittingItems(parsedLegacyCart);

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 230

  }

  function closeCart() {
    setIsOpen(false);
  }

  function addItem(input: SelectionCartItemInput) {
    const id =
      input.id ||
      buildCartItemId({
        sourceType: input.sourceType,
        productCode: input.productCode,
      });

    const quantity = Math.max(1, Number(input.quantity || 1));

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id !== id) return item;


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 235


  function addItem(input: SelectionCartItemInput) {
    const id =
      input.id ||
      buildCartItemId({
        sourceType: input.sourceType,
        productCode: input.productCode,
      });

    const quantity = Math.max(1, Number(input.quantity || 1));

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            quantity: item.quantity + quantity,
            needDrawing: Boolean(item.needDrawing || input.needDrawing),
          };

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 238

      input.id ||
      buildCartItemId({
        sourceType: input.sourceType,
        productCode: input.productCode,
      });

    const quantity = Math.max(1, Number(input.quantity || 1));

    setItems((prev) => {
      const existingItem = prev.find((item) => item.id === id);

      if (existingItem) {
        return prev.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            quantity: item.quantity + quantity,
            needDrawing: Boolean(item.needDrawing || input.needDrawing),
          };
        });
      }


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 249

      if (existingItem) {
        return prev.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            quantity: item.quantity + quantity,
            needDrawing: Boolean(item.needDrawing || input.needDrawing),
          };
        });
      }

      return [
        ...prev,
        {
          ...input,
          id,
          quantity,
          needDrawing: Boolean(input.needDrawing),
        },
      ];
    });
  }

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 250

        return prev.map((item) => {
          if (item.id !== id) return item;

          return {
            ...item,
            quantity: item.quantity + quantity,
            needDrawing: Boolean(item.needDrawing || input.needDrawing),
          };
        });
      }

      return [
        ...prev,
        {
          ...input,
          id,
          quantity,
          needDrawing: Boolean(input.needDrawing),
        },
      ];
    });
  }


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 260


      return [
        ...prev,
        {
          ...input,
          id,
          quantity,
          needDrawing: Boolean(input.needDrawing),
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    const confirmed = window.confirm("确认清空当前选型清单？");

    if (!confirmed) return;

    setItems([]);

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 261

      return [
        ...prev,
        {
          ...input,
          id,
          quantity,
          needDrawing: Boolean(input.needDrawing),
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    const confirmed = window.confirm("确认清空当前选型清单？");

    if (!confirmed) return;

    setItems([]);
  }

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 267

          needDrawing: Boolean(input.needDrawing),
        },
      ];
    });
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    const confirmed = window.confirm("确认清空当前选型清单？");

    if (!confirmed) return;

    setItems([]);
  }

  function changeQuantity(id: string, quantity: number) {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 279


    if (!confirmed) return;

    setItems([]);
  }

  function changeQuantity(id: string, quantity: number) {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity: Math.max(1, Number(quantity || 1)),
        };
      });
    });
  }

  function toggleDrawingNeed(id: string, needDrawing: boolean) {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 286

    setItems((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity: Math.max(1, Number(quantity || 1)),
        };
      });
    });
  }

  function toggleDrawingNeed(id: string, needDrawing: boolean) {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          needDrawing,
        };
      });
    });

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 292

          quantity: Math.max(1, Number(quantity || 1)),
        };
      });
    });
  }

  function toggleDrawingNeed(id: string, needDrawing: boolean) {
    setItems((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          needDrawing,
        };
      });
    });
  }

  function getItem(sourceType: SelectionCartSourceType, productCode: string) {
    const id = buildCartItemId({
      sourceType,
      productCode,

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 299

    setItems((prev) => {
      return prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          needDrawing,
        };
      });
    });
  }

  function getItem(sourceType: SelectionCartSourceType, productCode: string) {
    const id = buildCartItemId({
      sourceType,
      productCode,
    });

    return items.find((item) => item.id === id);
  }

  async function copyCartText() {
    const text = buildCartText(items);

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 305

          needDrawing,
        };
      });
    });
  }

  function getItem(sourceType: SelectionCartSourceType, productCode: string) {
    const id = buildCartItemId({
      sourceType,
      productCode,
    });

    return items.find((item) => item.id === id);
  }

  async function copyCartText() {
    const text = buildCartText(items);

    try {
      await window.navigator.clipboard.writeText(text);
      window.alert("清单已复制");
    } catch {
      window.alert(text);

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 308

    });
  }

  function getItem(sourceType: SelectionCartSourceType, productCode: string) {
    const id = buildCartItemId({
      sourceType,
      productCode,
    });

    return items.find((item) => item.id === id);
  }

  async function copyCartText() {
    const text = buildCartText(items);

    try {
      await window.navigator.clipboard.writeText(text);
      window.alert("清单已复制");
    } catch {
      window.alert(text);
    }
  }


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 344

  const contextValue = useMemo<SelectionCartContextValue>(() => {
    return {
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      clearCart,
      changeQuantity,
      toggleDrawingNeed,
      getItem,
      copyCartText,
      generatePdfList,
      printTime,
    };
  }, [items, isOpen, printTime]);

  return (
    <SelectionCartContext.Provider value={contextValue}>
      {children}
    </SelectionCartContext.Provider>
  );

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 345

    return {
      items,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      clearCart,
      changeQuantity,
      toggleDrawingNeed,
      getItem,
      copyCartText,
      generatePdfList,
      printTime,
    };
  }, [items, isOpen, printTime]);

  return (
    <SelectionCartContext.Provider value={contextValue}>
      {children}
    </SelectionCartContext.Provider>
  );
}

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\SelectionCartProvider.tsx Line 347

      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      clearCart,
      changeQuantity,
      toggleDrawingNeed,
      getItem,
      copyCartText,
      generatePdfList,
      printTime,
    };
  }, [items, isOpen, printTime]);

  return (
    <SelectionCartContext.Provider value={contextValue}>
      {children}
    </SelectionCartContext.Provider>
  );
}

/* =========================================================

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 27

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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 34

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


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 40

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


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 43

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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 49

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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 52

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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 55

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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 63

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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 67

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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\selection-cart.types.ts Line 70

*/
export type SelectionCartItemInput = Omit<
  SelectionCartItem,
  "id" | "quantity"
> & {
  id?: string;
  quantity?: number;
}; 

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 88

export default function GlobalSelectionCartDrawer() {
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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 90

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


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 109

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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 134


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
                `产品类型：${item.productName}`,
                `产品型号：${item.foreachModel}`,
                `数量：${item.quantity}`,
              ]
            : [
                `商品编码：${item.productCode}`,

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 141

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
                `产品类型：${item.productName}`,
                `产品型号：${item.foreachModel}`,
                `数量：${item.quantity}`,
              ]
            : [
                `商品编码：${item.productCode}`,
                `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
                `数量：${item.quantity}`,
              ],
      };
    });
  }, [requestDrawingItems]);


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 146

        id: item.id,
        title: item.foreachModel,
        metaLines:
          item.sourceType === "pump-selection"
            ? [
                `产品类型：${item.productName}`,
                `产品型号：${item.foreachModel}`,
                `数量：${item.quantity}`,
              ]
            : [
                `商品编码：${item.productCode}`,
                `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
                `数量：${item.quantity}`,
              ],
      };
    });
  }, [requestDrawingItems]);

  /* =========================================================
     右下角清单按钮轻动效

     说明：
     1. 当清单数量、数量值、图纸需求状态发生变化时触发

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 147

        title: item.foreachModel,
        metaLines:
          item.sourceType === "pump-selection"
            ? [
                `产品类型：${item.productName}`,
                `产品型号：${item.foreachModel}`,
                `数量：${item.quantity}`,
              ]
            : [
                `商品编码：${item.productCode}`,
                `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
                `数量：${item.quantity}`,
              ],
      };
    });
  }, [requestDrawingItems]);

  /* =========================================================
     右下角清单按钮轻动效

     说明：
     1. 当清单数量、数量值、图纸需求状态发生变化时触发
     2. 不自动打开清单

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 150

            ? [
                `产品类型：${item.productName}`,
                `产品型号：${item.foreachModel}`,
                `数量：${item.quantity}`,
              ]
            : [
                `商品编码：${item.productCode}`,
                `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
                `数量：${item.quantity}`,
              ],
      };
    });
  }, [requestDrawingItems]);

  /* =========================================================
     右下角清单按钮轻动效

     说明：
     1. 当清单数量、数量值、图纸需求状态发生变化时触发
     2. 不自动打开清单
     3. 只让右下角清单入口轻微提示
     4. 初次加载 localStorage 数据时不触发动效
  ========================================================= */

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 152

                `产品型号：${item.foreachModel}`,
                `数量：${item.quantity}`,
              ]
            : [
                `商品编码：${item.productCode}`,
                `兼容编码：${item.competitorModels.join(" / ") || "-"}`,
                `数量：${item.quantity}`,
              ],
      };
    });
  }, [requestDrawingItems]);

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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 169

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


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 328

                </tr>
              ) : (
                items.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.sourceLabel}</td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? item.productName
                          : item.productCode}
                      </td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? "定制选型产品"
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
                    </tr>
                  );
                })

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 332

                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.sourceLabel}</td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? item.productName
                          : item.productCode}
                      </td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? "定制选型产品"
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </main>

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 339

                      </td>
                      <td>
                        {item.sourceType === "pump-selection"
                          ? "定制选型产品"
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 340

                      <td>
                        {item.sourceType === "pump-selection"
                          ? "定制选型产品"
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 341

                        {item.sourceType === "pump-selection"
                          ? "定制选型产品"
                          : item.competitorModels.join(" / ") || "-"}
                      </td>
                      <td>{item.foreachModel}</td>
                      <td>{item.quantity}</td>
                      <td>{item.needDrawing ? "需要" : "暂不需要"}</td>
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


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 442

                        <article className={styles.item} key={item.id}>
                          <button
                            className={styles.removeButton}
                            type="button"
                            aria-label="删除该产品"
                            onClick={() => {
                              removeItem(item.id);
                            }}
                          >
                            ×
                          </button>

                          <div className={styles.itemHead}>
                            <div>
                              <span>{item.sourceLabel}</span>

                              {item.detailHref && item.sourceType !== "pump-selection" ? (
                                <Link
                                  className={styles.itemTitleLink}
                                  href={item.detailHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="新窗口打开详情页"

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 450

                          >
                            ×
                          </button>

                          <div className={styles.itemHead}>
                            <div>
                              <span>{item.sourceLabel}</span>

                              {item.detailHref && item.sourceType !== "pump-selection" ? (
                                <Link
                                  className={styles.itemTitleLink}
                                  href={item.detailHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="新窗口打开详情页"
                                >
                                  {item.foreachModel}
                                </Link>
                              ) : (
                                <h3>{item.foreachModel}</h3>
                              )}
                            </div>


### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 452

                          </button>

                          <div className={styles.itemHead}>
                            <div>
                              <span>{item.sourceLabel}</span>

                              {item.detailHref && item.sourceType !== "pump-selection" ? (
                                <Link
                                  className={styles.itemTitleLink}
                                  href={item.detailHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="新窗口打开详情页"
                                >
                                  {item.foreachModel}
                                </Link>
                              ) : (
                                <h3>{item.foreachModel}</h3>
                              )}
                            </div>

                            <button
                              className={

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 455

                            <div>
                              <span>{item.sourceLabel}</span>

                              {item.detailHref && item.sourceType !== "pump-selection" ? (
                                <Link
                                  className={styles.itemTitleLink}
                                  href={item.detailHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="新窗口打开详情页"
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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 460

                                  className={styles.itemTitleLink}
                                  href={item.detailHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="新窗口打开详情页"
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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 463

                                  rel="noopener noreferrer"
                                  title="新窗口打开详情页"
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
                              {item.needDrawing ? "已添加图纸" : "添加图纸"}
                            </button>

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 469

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
                              {item.needDrawing ? "已添加图纸" : "添加图纸"}
                            </button>
                          </div>

                          {item.sourceType === "pump-selection" ? (
                            <div className={styles.infoRow}>
                              <span>产品类型</span>
                              <strong>{item.productName}</strong>

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 475

                                item.needDrawing
                                  ? `${styles.drawingButton} ${styles.active}`
                                  : styles.drawingButton
                              }
                              type="button"
                              onClick={() => {
                                toggleDrawingNeed(item.id, !item.needDrawing);
                              }}
                            >
                              {item.needDrawing ? "已添加图纸" : "添加图纸"}
                            </button>
                          </div>

                          {item.sourceType === "pump-selection" ? (
                            <div className={styles.infoRow}>
                              <span>产品类型</span>
                              <strong>{item.productName}</strong>
                            </div>
                          ) : (
                            <>
                              <div className={styles.infoRow}>
                                <span>兼容编码</span>
                                <strong>

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 478

                              }
                              type="button"
                              onClick={() => {
                                toggleDrawingNeed(item.id, !item.needDrawing);
                              }}
                            >
                              {item.needDrawing ? "已添加图纸" : "添加图纸"}
                            </button>
                          </div>

                          {item.sourceType === "pump-selection" ? (
                            <div className={styles.infoRow}>
                              <span>产品类型</span>
                              <strong>{item.productName}</strong>
                            </div>
                          ) : (
                            <>
                              <div className={styles.infoRow}>
                                <span>兼容编码</span>
                                <strong>
                                  {item.competitorModels.join(" / ") || "-"}
                                </strong>
                              </div>

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 498

                                  {item.competitorModels.join(" / ") || "-"}
                                </strong>
                              </div>

                              <div className={styles.infoRow}>
                                <span>商品编码</span>
                                <strong>{item.productCode}</strong>
                              </div>
                            </>
                          )}

                          <div className={styles.quantityRow}>
                            <label htmlFor={`global-cart-qty-${item.id}`}>
                              数量
                            </label>

                            <input
                              id={`global-cart-qty-${item.id}`}
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(event) => {
                                changeQuantity(

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 503

                                <span>商品编码</span>
                                <strong>{item.productCode}</strong>
                              </div>
                            </>
                          )}

                          <div className={styles.quantityRow}>
                            <label htmlFor={`global-cart-qty-${item.id}`}>
                              数量
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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 512

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

### F:\WebsiteProjects\foreach-website-2026\components\selection-cart\GlobalSelectionCartDrawer.tsx Line 514

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
                <strong>清单说明</strong>
                <p>

---

## 5. build 检查


> foreach-website-2026@0.1.0 build
> next build

鈻?Next.js 16.2.6 (Turbopack)
- Environments: .env.local

  Creating an optimized production build ...
鉁?Compiled successfully in 7.2s
  Running TypeScript ...
  Finished TypeScript in 4.7s ...
  Collecting page data using 23 workers ...
  Generating static pages using 23 workers (0/577) ...
  Generating static pages using 23 workers (144/577) 
  Generating static pages using 23 workers (288/577) 
  Generating static pages using 23 workers (432/577) 
鉁?Generating static pages using 23 workers (577/577) in 2.3s
  Finalizing page optimization ...

Route (app)
鈹?鈼?/
鈹?鈼?/_not-found
鈹?鈼?/[locale]
鈹?鈹?/en
鈹?鈹?/es
鈹?鈹?/fr
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/culture
鈹?鈹?/en/about/culture
鈹?鈹?/es/about/culture
鈹?鈹?/fr/about/culture
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/foreach
鈹?鈹?/en/about/foreach
鈹?鈹?/es/about/foreach
鈹?鈹?/fr/about/foreach
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/history
鈹?鈹?/en/about/history
鈹?鈹?/es/about/history
鈹?鈹?/fr/about/history
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/quality
鈹?鈹?/en/about/quality
鈹?鈹?/es/about/quality
鈹?鈹?/fr/about/quality
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/about/research-manufacturing
鈹?鈹?/en/about/research-manufacturing
鈹?鈹?/es/about/research-manufacturing
鈹?鈹?/fr/about/research-manufacturing
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/analytical-instruments
鈹?鈹?/en/applications/analytical-instruments
鈹?鈹?/es/applications/analytical-instruments
鈹?鈹?/fr/applications/analytical-instruments
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/environmental-monitoring
鈹?鈹?/en/applications/environmental-monitoring
鈹?鈹?/es/applications/environmental-monitoring
鈹?鈹?/fr/applications/environmental-monitoring
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/ivd
鈹?鈹?/en/applications/ivd
鈹?鈹?/es/applications/ivd
鈹?鈹?/fr/applications/ivd
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/lab-automation
鈹?鈹?/en/applications/lab-automation
鈹?鈹?/es/applications/lab-automation
鈹?鈹?/fr/applications/lab-automation
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/life-science
鈹?鈹?/en/applications/life-science
鈹?鈹?/es/applications/life-science
鈹?鈹?/fr/applications/life-science
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/applications/synthetic-biology
鈹?鈹?/en/applications/synthetic-biology
鈹?鈹?/es/applications/synthetic-biology
鈹?鈹?/fr/applications/synthetic-biology
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/contact
鈹?鈹?/en/contact
鈹?鈹?/es/contact
鈹?鈹?/fr/contact
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/contact/distributor
鈹?鈹?/en/contact/distributor
鈹?鈹?/es/contact/distributor
鈹?鈹?/fr/contact/distributor
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/products
鈹?鈹?/en/products
鈹?鈹?/es/products
鈹?鈹?/fr/products
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources
鈹?鈹?/en/resources
鈹?鈹?/es/resources
鈹?鈹?/fr/resources
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/datasheets
鈹?鈹?/en/resources/datasheets
鈹?鈹?/es/resources/datasheets
鈹?鈹?/fr/resources/datasheets
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/installation-guide
鈹?鈹?/en/resources/installation-guide
鈹?鈹?/es/resources/installation-guide
鈹?鈹?/fr/resources/installation-guide
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/installation-guide/[slug]
鈹?鈹?/en/resources/installation-guide/hard-tube-fitting-guide
鈹?鈹?/en/resources/installation-guide/plunger-pump-install-guide
鈹?鈹?/en/resources/installation-guide/diaphragm-pump-guide
鈹?鈹?[+22 more paths]
鈹?鈼?/[locale]/resources/material-compatibility
鈹?鈹?/en/resources/material-compatibility
鈹?鈹?/es/resources/material-compatibility
鈹?鈹?/fr/resources/material-compatibility
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/news
鈹?鈹?/en/resources/news
鈹?鈹?/es/resources/news
鈹?鈹?/fr/resources/news
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/news/[slug]
鈹?鈹?/en/resources/news/adlm-2026
鈹?鈹?/en/resources/news/whx-labs-dubai-2026
鈹?鈹?/en/resources/news/gazelle-enterprise-2025
鈹?鈹?[+47 more paths]
鈹?鈼?/[locale]/resources/selection-support/fitting-replacement
鈹?鈹?/en/resources/selection-support/fitting-replacement
鈹?鈹?/es/resources/selection-support/fitting-replacement
鈹?鈹?/fr/resources/selection-support/fitting-replacement
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/selection-support/fitting-replacement/q20/[productCode]
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839041
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839130
鈹?鈹?/en/resources/selection-support/fitting-replacement/q20/839019
鈹?鈹?[+172 more paths]
鈹?鈼?/[locale]/resources/technical-articles
鈹?鈹?/en/resources/technical-articles
鈹?鈹?/es/resources/technical-articles
鈹?鈹?/fr/resources/technical-articles
鈹?鈹?[+2 more paths]
鈹?鈼?/[locale]/resources/technical-articles/[slug]
鈹?鈹?/en/resources/technical-articles/selecting-microfluidic-fittings
鈹?鈹?/en/resources/technical-articles/peek-ptfe-pfa-material-differences
鈹?鈹?/en/resources/technical-articles/low-pressure-vs-high-pressure-fittings
鈹?鈹?[+57 more paths]
鈹?鈼?/about/culture
鈹?鈼?/about/foreach
鈹?鈼?/about/history
鈹?鈼?/about/quality
鈹?鈼?/about/research-manufacturing
鈹?鈼?/applications/analytical-instruments
鈹?鈼?/applications/environmental-monitoring
鈹?鈼?/applications/ivd
鈹?鈼?/applications/lab-automation
鈹?鈼?/applications/life-science
鈹?鈼?/applications/synthetic-biology
鈹?鈼?/contact
鈹?鈼?/contact/distributor
鈹?鈼?/products
鈹?鈼?/products/[category]
鈹?鈹?/products/pumps
鈹?鈼?/products/[category]/[slug]
鈹?鈹?/products/pumps/plunger-pumps
鈹?鈹?/products/pumps/diaphragm-pumps
鈹?鈹?/products/pumps/pipetting-pumps
鈹?鈹?[+17 more paths]
鈹?鈼?/products/[category]/[slug]/[seriesSlug]
鈹?鈹?/products/pumps/plunger-pumps/ea-standard-piston-pumps
鈹?鈹?/products/pumps/plunger-pumps/sm-miniature-piston-pumps
鈹?鈹?/products/pumps/plunger-pumps/tm-ultra-compact-piston-pumps
鈹?鈹?[+3 more paths]
鈹?鈼?/products/pumps/diaphragm-pumps/[slug]
鈹?鈹?/products/pumps/diaphragm-pumps/dpl30-liquid-diaphragm-pump
鈹?鈹?/products/pumps/diaphragm-pumps/dpl60-liquid-diaphragm-pump
鈹?鈹?/products/pumps/diaphragm-pumps/dpl30h-liquid-diaphragm-pump
鈹?鈹?[+9 more paths]
鈹?鈼?/products/pumps/plunger-pumps/[slug]
鈹?鈹?/products/pumps/plunger-pumps/ea-100-pmma
鈹?鈹?/products/pumps/plunger-pumps/ea-100-peek
鈹?鈹?/products/pumps/plunger-pumps/ea-250-pmma
鈹?鈹?[+30 more paths]
鈹?鈼?/resources
鈹?鈼?/resources/datasheets
鈹?鈼?/resources/installation-guide
鈹?鈼?/resources/installation-guide/[slug]
鈹?鈹?/resources/installation-guide/hard-tube-fitting-guide
鈹?鈹?/resources/installation-guide/plunger-pump-install-guide
鈹?鈹?/resources/installation-guide/diaphragm-pump-guide
鈹?鈹?[+2 more paths]
鈹?鈼?/resources/material-compatibility
鈹?鈼?/resources/news
鈹?鈼?/resources/news/[slug]
鈹?鈹?/resources/news/adlm-2026
鈹?鈹?/resources/news/whx-labs-dubai-2026
鈹?鈹?/resources/news/gazelle-enterprise-2025
鈹?鈹?[+7 more paths]
鈹?鈼?/resources/selection-support/fitting-replacement
鈹?鈼?/resources/selection-support/fitting-replacement/q20/[productCode]
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839041
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839130
鈹?鈹?/resources/selection-support/fitting-replacement/q20/839019
鈹?鈹?[+32 more paths]
鈹?鈼?/resources/technical-articles
鈹?鈼?/resources/technical-articles/[slug]
  鈹?/resources/technical-articles/selecting-microfluidic-fittings
  鈹?/resources/technical-articles/peek-ptfe-pfa-material-differences
  鈹?/resources/technical-articles/low-pressure-vs-high-pressure-fittings
  鈹?[+9 more paths]


鈼? (Static)  prerendered as static content
鈼? (SSG)     prerendered as static HTML (uses generateStaticParams)

