/* =========================================================
   buildContactPdfHtml.ts
   恒永达官网｜联系我们表单 PDF 需求单生成工具

   文件路径：
   components/contact/buildContactPdfHtml.ts

   作用：
   1. 生成“联系需求单”的 HTML 字符串
   2. ContactInquiryForm.tsx 会把这个 HTML 写入隐藏 iframe
   3. 浏览器通过 print() 调出打印 / 保存 PDF 窗口
   4. 页眉页脚直接引用用户设计好的 SVG
   5. 中间正文根据客户填写内容动态生成
   6. 页眉永远固定在 A4 顶部
   7. 页脚永远固定在 A4 底部
   8. 内容少时，页脚不会跟着内容往上跑

   注意：
   1. 这里不是 React 组件，不需要 "use client"
   2. 必须保留 buildContactPdfHtml、formatFileSize、ContactFormState 的导出
   3. 如果 SVG 文件名或路径变化，需要同步修改下面两个常量
========================================================= */

import type { ContactPageData } from "@/data/contact-cooperation";

/* =========================================================
   PDF 页眉页脚 SVG 路径
========================================================= */

const PDF_HEADER_GRAPHIC_SRC =
  "/images/contact-cooperation/pdf/request-form-header-graphic.svg";

const PDF_FOOTER_GRAPHIC_SRC =
  "/images/contact-cooperation/pdf/request-form-footer-graphic.svg";

/* =========================================================
   表单数据类型
========================================================= */

export type ContactFormState = {
  name: string; // 姓名
  company: string; // 公司名称
  email: string; // 邮箱
  emailCode: string; // 邮箱验证码
  phone: string; // 中文：电话 / 微信；外语：Phone / WhatsApp
  requestType: string; // 需求类型
  productType: string; // 目标产品 / 部件类型
  targetModel: string; // 具体型号 / 竞品型号
  projectStage: string; // 当前阶段
  message: string; // 需求描述
};

/* =========================================================
   PDF 附件信息类型
========================================================= */

export type ContactPdfFileMeta = {
  name: string; // 文件名
  size: number; // 文件大小，单位 byte
  type?: string; // 文件 MIME 类型，可选
};

/* =========================================================
   buildContactPdfHtml 参数类型
========================================================= */

export type BuildContactPdfHtmlParams = {
  data: ContactPageData; // 当前语言页面数据
  formData: ContactFormState; // 当前表单填写的数据
  selectedFiles: ContactPdfFileMeta[]; // 当前已选择的附件列表
  requestNumber: string; // 需求单号
  createdAtText: string; // 生成时间文字
  htmlLang?: string; // HTML lang，例如 zh-CN / en / es / fr / ko / ru
};

/* =========================================================
   HTML 转义函数
========================================================= */

export function escapeHtml(value: string | number | null | undefined) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   文件大小格式化函数
========================================================= */

export function formatFileSize(size: number) {
  const sizeInKb = size / 1024;

  if (sizeInKb < 1024) {
    return `${sizeInKb.toFixed(1)} KB`;
  }

  return `${(sizeInKb / 1024).toFixed(2)} MB`;
}

/* =========================================================
   获取附件类型
========================================================= */

function getFileType(fileName: string) {
  const hasExtension = fileName.includes(".");

  if (!hasExtension) {
    return "FILE";
  }

  const extension = fileName.split(".").pop();

  return extension ? extension.toUpperCase() : "FILE";
}

/* =========================================================
   判断是否中文 PDF
========================================================= */

function isChineseLanguage(htmlLang: string) {
  return htmlLang.toLowerCase().startsWith("zh");
}

/* =========================================================
   生成联系需求单 HTML
========================================================= */

export function buildContactPdfHtml({
  data,
  formData,
  selectedFiles,
  requestNumber,
  createdAtText,
  htmlLang = "zh-CN",
}: BuildContactPdfHtmlParams) {
  const pdfTexts = data.form.pdfTexts;

  const notFilledText = pdfTexts.notFilled;

  const notSelectedText = pdfTexts.notSelected;

  const isChinesePdf = isChineseLanguage(htmlLang);

  /* 中文 PDF 强制显示“电话 / 微信”，避免出现 WhatsApp */
  const phoneLabel = isChinesePdf
    ? "电话 / 微信"
    : data.form.fields.phone.label;

  const attachmentRows =
    selectedFiles.length > 0
      ? selectedFiles
          .map((file, index) => {
            const fileName = escapeHtml(file.name);

            const fileType = escapeHtml(getFileType(file.name));

            const fileSize = escapeHtml(formatFileSize(file.size));

            return `
              <tr>
                <td class="pdf-attachment-index">${index + 1}</td>
                <td>${fileName}</td>
                <td class="pdf-attachment-type">${fileType}</td>
                <td class="pdf-attachment-size">${fileSize}</td>
              </tr>
            `;
          })
          .join("")
      : `
          <tr>
            <td colspan="4" class="pdf-empty-cell">${escapeHtml(
              pdfTexts.noAttachment,
            )}</td>
          </tr>
        `;

  return `<!DOCTYPE html>
<html lang="${escapeHtml(htmlLang)}">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(pdfTexts.documentTitle)}</title>

  <style>
    /* =========================================================
       A4 打印基础设置

       关键说明：
       1. @page 的 margin 用来给每一页预留页眉页脚空间
       2. 页眉页脚使用 fixed 固定到页面顶部/底部
       3. 通过负值 top / bottom 把 fixed 元素拉回纸张真实边缘
       4. 内容区不会遮住“联系需求单”
       5. 内容少时，页脚也永远在页面底部
    ========================================================= */

    @page {
      size: A4;
      margin: 32mm 0 34mm 0;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    html,
    body {
      width: 210mm;
      min-height: 297mm;
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #12233d;
      font-family: "Microsoft YaHei", "Noto Sans SC", Arial, sans-serif;
      line-height: 1.55;
    }

    .pdf-page {
      position: relative;
      width: 210mm;
      min-height: 297mm;
      background: #ffffff;
      overflow: visible;
    }

    /* =========================================================
       固定页眉
       屏幕预览时 absolute，打印时 fixed
    ========================================================= */

    .pdf-header {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 25mm;
      background: #ffffff;
      z-index: 20;
    }

    .pdf-header-graphic {
      display: block;
      width: 210mm;
      height: 25mm;
      object-fit: fill;
    }

    /* =========================================================
       固定页脚
       屏幕预览时 absolute，打印时 fixed
    ========================================================= */

    .pdf-footer {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 31mm;
      background: #ffffff;
      z-index: 20;
    }

    .pdf-footer-graphic {
      display: block;
      width: 210mm;
      height: 31mm;
      object-fit: fill;
    }

    /* =========================================================
       正文区域
       屏幕预览时用 padding 让内容避开页眉页脚
    ========================================================= */

    .pdf-main {
      padding: 35mm 12mm 38mm;
    }

    .pdf-title-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 10mm;
      margin-bottom: 7mm;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .pdf-title h1 {
      margin: 0;
      color: #173368;
      font-size: 28px;
      line-height: 1.1;
      font-weight: 900;
      letter-spacing: -0.04em;
    }

    .pdf-title p {
      margin: 2mm 0 0;
      color: #7c8aa0;
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .pdf-status {
      min-width: 42mm;
      padding: 3mm 4mm;
      border-left: 3px solid #09e9b4;
      background: #f4f7fb;
      color: #173368;
      font-size: 10px;
      font-weight: 800;
      text-align: right;
    }

    /* 顶部三栏信息：标签和内容之间增加横线 */
    .pdf-meta {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      border: 1px solid #d9e1ec;
      margin-bottom: 8mm;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .pdf-meta-item {
      min-height: 13mm;
      padding: 0;
      border-right: 1px solid #d9e1ec;
    }

    .pdf-meta-item:last-child {
      border-right: 0;
    }

    .pdf-meta-label {
      padding: 2.4mm 4mm 1.8mm;
      border-bottom: 1px solid #d9e1ec;
      color: #7c8aa0;
      font-size: 9px;
      font-weight: 700;
    }

    .pdf-meta-value {
      padding: 2.4mm 4mm 2.8mm;
      color: #12233d;
      font-size: 10.5px;
      font-weight: 750;
      word-break: break-word;
    }

    .pdf-section {
      margin-bottom: 7mm;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    /*
      需求描述可能很长，需要允许跨页；
      否则浏览器会为了避免拆分而产生大空白。
    */
    .pdf-section-description {
      break-inside: auto;
      page-break-inside: auto;
    }

    .pdf-section-attachments {
      break-inside: auto;
      page-break-inside: auto;
    }

    /* 分区标题：去掉左侧荧光色竖条，改为底部分隔线 */
    .pdf-section-title {
      display: block;
      margin: 0 0 3mm;
      padding-bottom: 2mm;
      border-bottom: 1px solid #d9e1ec;
      color: #173368;
      font-size: 14px;
      line-height: 1.3;
      font-weight: 900;
    }

    .pdf-section-title::before {
      content: none;
    }

    .pdf-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      border: 1px solid #d9e1ec;
    }

    .pdf-table th,
    .pdf-table td {
      border: 1px solid #d9e1ec;
      padding: 3mm 3.2mm;
      vertical-align: top;
      font-size: 10.2px;
      word-break: break-word;
    }

    /* 字段名尽量一行显示，避免“电话 / 微信”等换行 */
    .pdf-table th {
      width: 32mm;
      color: #52647d;
      background: #f4f7fb;
      text-align: left;
      font-weight: 850;
      white-space: nowrap;
      font-size: 9.4px;
    }

    .pdf-table td {
      color: #12233d;
      font-weight: 650;
    }

    .pdf-table tr {
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .description-box {
      min-height: 32mm;
      padding: 4mm;
      border: 1px solid #d9e1ec;
      background: #ffffff;
      color: #12233d;
      font-size: 10.5px;
      white-space: pre-wrap;
      word-break: break-word;
      break-inside: auto;
      page-break-inside: auto;
    }

    .attachment-table th,
    .attachment-table td {
      font-size: 10px;
    }

    .pdf-attachment-index {
      width: 16mm;
      text-align: center;
    }

    .pdf-attachment-type {
      width: 26mm;
    }

    .pdf-attachment-size {
      width: 25mm;
    }

    .pdf-empty-cell {
      text-align: center;
      color: #7c8aa0;
      font-weight: 650;
    }

    /* =========================================================
       屏幕预览
    ========================================================= */

    @media screen {
      body {
        background: #eef2f7;
      }

      .pdf-page {
        margin: 0 auto;
        box-shadow: 0 18px 60px rgba(16, 36, 72, 0.16);
      }
    }

    /* =========================================================
       打印模式

       关键：
       1. @page 已给每一页预留 32mm 顶部和 34mm 底部
       2. fixed 页眉默认会出现在内容区顶部
       3. 所以用 top: -27mm 把页眉拉回纸张顶部
       4. fixed 页脚默认会出现在内容区底部
       5. 所以用 bottom: -31mm 把页脚拉回纸张底部
       6. 正文只保留左右边距和少量上下间距
    ========================================================= */

    @media print {
      html,
      body {
        background: #ffffff;
      }

      .pdf-page {
        margin: 0;
        box-shadow: none;
        overflow: visible;
      }

      .pdf-header {
        position: fixed;
        top: -27mm;
        left: 0;
        right: 0;
        height: 25mm;
      }

      .pdf-header-graphic {
        width: 210mm;
        height: 25mm;
      }

      .pdf-footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: -31mm;
        height: 31mm;
      }

      .pdf-footer-graphic {
        width: 210mm;
        height: 31mm;
      }

      .pdf-main {
        padding: 3mm 12mm 4mm;
      }
    }
  </style>
</head>

<body>
  <article class="pdf-page">
    <header class="pdf-header">
      <img
        class="pdf-header-graphic"
        src="${PDF_HEADER_GRAPHIC_SRC}"
        alt="FOREACH request form header"
      />
    </header>

    <main class="pdf-main">
      <section class="pdf-title-row">
        <div class="pdf-title">
          <h1>${escapeHtml(pdfTexts.documentTitle)}</h1>
          <p>Contact Request Form</p>
        </div>

        <div class="pdf-status">${escapeHtml(pdfTexts.sourceValue)}</div>
      </section>

      <section class="pdf-meta">
        <div class="pdf-meta-item">
          <div class="pdf-meta-label">${escapeHtml(
            pdfTexts.requestNumber,
          )}</div>
          <div class="pdf-meta-value">${escapeHtml(requestNumber)}</div>
        </div>

        <div class="pdf-meta-item">
          <div class="pdf-meta-label">${escapeHtml(pdfTexts.createdAt)}</div>
          <div class="pdf-meta-value">${escapeHtml(createdAtText)}</div>
        </div>

        <div class="pdf-meta-item">
          <div class="pdf-meta-label">${escapeHtml(pdfTexts.source)}</div>
          <div class="pdf-meta-value">${escapeHtml(pdfTexts.sourceValue)}</div>
        </div>
      </section>

      <section class="pdf-section">
        <h2 class="pdf-section-title">${escapeHtml(pdfTexts.customerInfo)}</h2>

        <table class="pdf-table">
          <tr>
            <th>${escapeHtml(data.form.fields.name.label)}</th>
            <td>${escapeHtml(formData.name || notFilledText)}</td>
            <th>${escapeHtml(data.form.fields.company.label)}</th>
            <td>${escapeHtml(formData.company || notFilledText)}</td>
          </tr>

          <tr>
            <th>${escapeHtml(data.form.emailVerification.emailLabel)}</th>
            <td>${escapeHtml(formData.email || notFilledText)}</td>
            <th>${escapeHtml(phoneLabel)}</th>
            <td>${escapeHtml(formData.phone || notFilledText)}</td>
          </tr>
        </table>
      </section>

      <section class="pdf-section">
        <h2 class="pdf-section-title">${escapeHtml(
          pdfTexts.requirementInfo,
        )}</h2>

        <table class="pdf-table">
          <tr>
            <th>${escapeHtml(data.form.labels.requestType)}</th>
            <td>${escapeHtml(formData.requestType || notSelectedText)}</td>
            <th>${escapeHtml(data.form.labels.productType)}</th>
            <td>${escapeHtml(formData.productType || notSelectedText)}</td>
          </tr>

          <tr>
            <th>${escapeHtml(data.form.fields.targetModel.label)}</th>
            <td>${escapeHtml(formData.targetModel || notFilledText)}</td>
            <th>${escapeHtml(data.form.labels.projectStage)}</th>
            <td>${escapeHtml(formData.projectStage || notSelectedText)}</td>
          </tr>
        </table>
      </section>

      <section class="pdf-section pdf-section-description">
        <h2 class="pdf-section-title">${escapeHtml(
          pdfTexts.requirementDescription,
        )}</h2>

        <div class="description-box">${escapeHtml(
          formData.message || notFilledText,
        )}</div>
      </section>

      <section class="pdf-section pdf-section-attachments">
        <h2 class="pdf-section-title">${escapeHtml(
          pdfTexts.attachmentList,
        )}</h2>

        <table class="pdf-table attachment-table">
          <thead>
            <tr>
              <th class="pdf-attachment-index">${escapeHtml(
                pdfTexts.index,
              )}</th>
              <th>${escapeHtml(pdfTexts.attachmentName)}</th>
              <th class="pdf-attachment-type">${escapeHtml(
                pdfTexts.attachmentType,
              )}</th>
              <th class="pdf-attachment-size">${escapeHtml(
                pdfTexts.attachmentSize,
              )}</th>
            </tr>
          </thead>

          <tbody>
            ${attachmentRows}
          </tbody>
        </table>
      </section>
    </main>

    <footer class="pdf-footer">
      <img
        class="pdf-footer-graphic"
        src="${PDF_FOOTER_GRAPHIC_SRC}"
        alt="FOREACH request form footer"
      />
    </footer>
  </article>
</body>
</html>`;
} 