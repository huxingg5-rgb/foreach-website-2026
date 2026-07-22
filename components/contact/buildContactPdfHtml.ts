/* =========================================================
   buildContactPdfHtml.ts
   恒永达官网｜联系我们表单 PDF 需求单 HTML 生成工具

   文件路径：
   components/contact/buildContactPdfHtml.ts

   当前方案：
   1. 使用 HTML + 浏览器打印 / 保存 PDF
   2. 不使用 pdfmake
   3. 自己生成固定 A4 页面
   4. 页眉固定在每页顶部
   5. 页脚固定在每页底部
   6. 正文只显示在页眉和页脚之间
   7. 内容少时页脚不会往上跑
   8. 需求描述不限制客户输入字数，但 PDF 内部会按安全显示区域拆成续页
   9. 附件如有内容，单独放到附件页
   10. 页码由我们自己写入：1 / 1、1 / 2、2 / 2

   注意：
   1. 打印预览里需要关闭浏览器自带“页眉和页脚”
   2. 这里必须保留 buildContactPdfHtml、formatFileSize、ContactFormState 导出
   3. ContactInquiryForm.tsx 会引用这些导出
========================================================= */

import type { ContactPageData } from "@/data/contact-cooperation";

/* =========================================================
   页眉页脚 SVG 路径
   说明：
   这两个文件来自你做好的 Illustrator / SVG 设计稿
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
  phone: string; // 中文：电话 / 微信；英文：Phone / WhatsApp
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
  type?: string; // MIME 类型，可选
};

/* =========================================================
   buildContactPdfHtml 参数类型
========================================================= */

export type BuildContactPdfHtmlParams = {
  data: ContactPageData; // 当前语言页面数据
  formData: ContactFormState; // 表单填写内容
  selectedFiles: ContactPdfFileMeta[]; // 附件列表
  requestNumber: string; // 需求单号
  createdAtText: string; // 生成时间
  htmlLang?: string; // 当前语言
};

/* =========================================================
   HTML 转义
   说明：
   客户填写的内容不能直接拼进 HTML，避免特殊字符破坏结构
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
   文件大小格式化
========================================================= */

export function formatFileSize(size: number) {
  const sizeInKb = size / 1024;

  if (sizeInKb < 1024) {
    return `${sizeInKb.toFixed(1)} KB`;
  }

  return `${(sizeInKb / 1024).toFixed(2)} MB`;
}

/* =========================================================
   判断中文
========================================================= */

function isChineseLanguage(lang: string) {
  return lang.toLowerCase().startsWith("zh");
}

/* =========================================================
   获取附件类型
========================================================= */

function getFileType(fileName: string) {
  if (!fileName.includes(".")) {
    return "FILE";
  }

  const extension = fileName.split(".").pop();

  return extension ? extension.toUpperCase() : "FILE";
}

/* =========================================================
   将数组分组
   说明：
   附件较多时，按固定数量拆成多页，避免超过页脚区域
========================================================= */

function chunkArray<T>(items: T[], chunkSize: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
}

/* =========================================================
   将长文本粗略拆成多页
   说明：
   1. 这里不是限制客户输入字数
   2. 客户仍然可以输入很长的需求描述
   3. 这里的数字只是 PDF 每一页大概能显示多少内容
   4. HTML 打印无法像专业 PDF 引擎一样精准计算每行高度
   5. 所以用较宽松的字符数量做分页，减少空白页感
========================================================= */

function splitMessageToPages(message: string, fallback: string) {
  const normalizedMessage = message.trim() || fallback;

  /*
     第一页还包含：
     1. 联系需求单标题
     2. 需求单号 / 生成时间 / 来源
     3. 客户信息
     4. 需求信息

     所以第一页需求描述不能放得太满。
     这里从原来的 520 调大到 900，让第一页多显示一些内容。
  */
  const firstPageMaxLength = 650;

  /*
     续页只有“需求描述（续）”，空间更大。
     这里从原来的 1200 调大到 1800，减少续页数量。
  */
  const nextPageMaxLength = 1200;

  const chunks: string[] = [];

  if (normalizedMessage.length <= firstPageMaxLength) {
    return [normalizedMessage];
  }

  chunks.push(normalizedMessage.slice(0, firstPageMaxLength));

  let restText = normalizedMessage.slice(firstPageMaxLength);

  while (restText.length > 0) {
    chunks.push(restText.slice(0, nextPageMaxLength));
    restText = restText.slice(nextPageMaxLength);
  }

  return chunks;
}

/* =========================================================
   页眉 HTML
========================================================= */

function buildHeaderHtml() {
  return `
    <header class="pdf-header">
      <img
        class="pdf-header-graphic"
        src="${PDF_HEADER_GRAPHIC_SRC}"
        alt="FOREACH request form header"
      />
    </header>
  `;
}

/* =========================================================
   页脚 HTML
========================================================= */

function buildFooterHtml(pageNumber: number, totalPages: number) {
  return `
    <footer class="pdf-footer">
      <img
        class="pdf-footer-graphic"
        src="${PDF_FOOTER_GRAPHIC_SRC}"
        alt="FOREACH request form footer"
      />

      <div class="pdf-page-number">${pageNumber} / ${totalPages}</div>
    </footer>
  `;
}

/* =========================================================
   附件行 HTML
========================================================= */

function buildAttachmentRows(
  files: ContactPdfFileMeta[],
  startIndex: number,
) {
  return files
    .map((file, index) => {
      return `
        <tr>
          <td class="index-col">${startIndex + index + 1}</td>
          <td>${escapeHtml(file.name)}</td>
          <td class="type-col">${escapeHtml(getFileType(file.name))}</td>
          <td class="size-col">${escapeHtml(formatFileSize(file.size))}</td>
        </tr>
      `;
    })
    .join("");
}

/* =========================================================
   空附件行 HTML
========================================================= */

function buildEmptyAttachmentRows(noAttachmentText: string) {
  return `
    <tr>
      <td colspan="4" class="pdf-empty-cell">${escapeHtml(noAttachmentText)}</td>
    </tr>
  `;
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

  const phoneLabel = isChinesePdf
    ? "电话"
    : data.form.fields.phone.label;

  const messagePages = splitMessageToPages(formData.message, notFilledText);

  const messageContinuationPages = messagePages.slice(1);

  /*
     附件每页最多显示 14 条。
     附件页单独分页，避免挤占第一页正文空间。
  */
  const attachmentChunks =
    selectedFiles.length > 0 ? chunkArray(selectedFiles, 14) : [];

  const hasAttachmentPages = attachmentChunks.length > 0;

  const totalPages =
    1 + messageContinuationPages.length + attachmentChunks.length;

  let currentPage = 1;

  const continuationPagesHtml = messageContinuationPages
    .map((messageChunk, index) => {
      currentPage += 1;

      const pageTitle = isChinesePdf
        ? `${pdfTexts.requirementDescription}（续 ${index + 1}）`
        : `${pdfTexts.requirementDescription} Continued ${index + 1}`;

      return `
        <article class="pdf-page">
          ${buildHeaderHtml()}

          <main class="pdf-main continuation-main">
            <section class="pdf-section">
              <h2 class="pdf-section-title">${escapeHtml(pageTitle)}</h2>
              <div class="description-box description-box-large">${escapeHtml(
                messageChunk,
              )}</div>
            </section>
          </main>

          ${buildFooterHtml(currentPage, totalPages)}
        </article>
      `;
    })
    .join("");

  const attachmentPagesHtml = attachmentChunks
    .map((files, index) => {
      currentPage += 1;

      const pageTitle =
        index === 0
          ? pdfTexts.attachmentList
          : isChinesePdf
            ? `${pdfTexts.attachmentList}（续 ${index}）`
            : `${pdfTexts.attachmentList} Continued ${index}`;

      const startIndex = index * 14;

      return `
        <article class="pdf-page attachment-page">
          ${buildHeaderHtml()}

          <main class="pdf-main attachment-main">
            <section class="pdf-section">
              <h2 class="pdf-section-title">${escapeHtml(pageTitle)}</h2>

              <table class="pdf-table attachment-table">
                <thead>
                  <tr>
                    <th class="index-col">${escapeHtml(pdfTexts.index)}</th>
                    <th>${escapeHtml(pdfTexts.attachmentName)}</th>
                    <th class="type-col">${escapeHtml(pdfTexts.attachmentType)}</th>
                    <th class="size-col">${escapeHtml(pdfTexts.attachmentSize)}</th>
                  </tr>
                </thead>

                <tbody>
                  ${buildAttachmentRows(files, startIndex)}
                </tbody>
              </table>
            </section>
          </main>

          ${buildFooterHtml(currentPage, totalPages)}
        </article>
      `;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="${escapeHtml(htmlLang)}">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(pdfTexts.documentTitle)}</title>

  <style>
    /* =========================================================
       打印页面基础设置
    ========================================================= */

    @page {
      size: A4;
      margin: 0;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    html,
    body {
      width: 210mm;
      margin: 0;
      padding: 0;
      background: #ffffff;
      color: #12233d;
      font-family: "Microsoft YaHei", "Noto Sans SC", Arial, sans-serif;
      line-height: 1.55;
    }

    body {
      background: #eef2f7;
    }

    /* =========================================================
       A4 页面
       说明：
       1. 每个 .pdf-page 就是一张 A4
       2. 页眉页脚固定在这一张 A4 内
       3. 内容少时页脚不会往上跑
    ========================================================= */

    .pdf-page {
      position: relative;
      width: 210mm;
      height: 297mm;
      min-height: 297mm;
      margin: 0 auto 18px;
      background: #ffffff;
      overflow: hidden;
      box-shadow: 0 18px 60px rgba(16, 36, 72, 0.16);
    }

    /* =========================================================
       固定页眉
    ========================================================= */

    .pdf-header {
      position: absolute;
      left: 0;
      top: 0;
      width: 210mm;
      height: 25mm;
      background: #ffffff;
      z-index: 5;
    }

    .pdf-header-graphic {
      display: block;
      width: 210mm;
      height: 25mm;
      object-fit: fill;
    }

    /* =========================================================
       固定页脚
    ========================================================= */

    .pdf-footer {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 210mm;
      height: 31mm;
      background: #ffffff;
      z-index: 5;
    }

    .pdf-footer-graphic {
      display: block;
      width: 210mm;
      height: 31mm;
      object-fit: fill;
    }

    .pdf-page-number {
      position: absolute;
      right: 12mm;
      bottom: 7mm;
      color: #173368;
      font-size: 9px;
      font-weight: 900;
      line-height: 1;
      z-index: 8;
    }

    /* =========================================================
       正文安全区域
       说明：
       1. top: 25mm 避开页眉
       2. bottom: 31mm 避开页脚
       3. 正文只允许显示在中间区域
    ========================================================= */

    .pdf-main {
      position: absolute;
      left: 0;
      right: 0;
      top: 25mm;
      bottom: 31mm;
      padding: 9mm 12mm 7mm;
      overflow: hidden;
      background: #ffffff;
      z-index: 1;
    }

    .pdf-title-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 10mm;
      margin-bottom: 7mm;
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

    /* =========================================================
       顶部三栏信息
    ========================================================= */

    .pdf-meta {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      border: 1px solid #d9e1ec;
      margin-bottom: 8mm;
    }

    .pdf-meta-item {
      min-height: 13mm;
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

    /* =========================================================
       分区标题
    ========================================================= */

    .pdf-section {
      margin-bottom: 7mm;
    }

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
      display: none;
    }

    /* =========================================================
       表格
    ========================================================= */

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

    /* =========================================================
       需求描述
    ========================================================= */

    .description-box {
      min-height: 36mm;
      max-height: 78mm;
      padding: 4mm; 
      border: 1px solid #d9e1ec;
      background: #ffffff;
      color: #12233d;
      font-size: 10.5px;
      white-space: pre-wrap;
      word-break: break-word;
      overflow: hidden;
    }

    /*
       续页需求描述框：
       1. 原来 min-height 是 184mm，文字少时空白太明显
       2. 现在改成 150mm，减少空白感
       3. max-height 仍保持 184mm，避免压到页脚
    */
    .description-box-large {
      min-height: 150mm;
      max-height: 170mm;
    }

    .attachment-main,
    .continuation-main {
      padding-top: 12mm;
    }

    /* =========================================================
       附件表格
    ========================================================= */

    .attachment-table th,
    .attachment-table td {
      font-size: 10px;
    }

    .attachment-table .index-col {
      width: 16mm;
      text-align: center;
    }

    .attachment-table .type-col {
      width: 26mm;
    }

    .attachment-table .size-col {
      width: 25mm;
    }

    .pdf-empty-cell {
      text-align: center;
      color: #7c8aa0;
      font-weight: 650;
    }

    /* =========================================================
       打印模式
    ========================================================= */

    @media print {
      body {
        background: #ffffff;
      }

      .pdf-page {
        margin: 0;
        box-shadow: none;
        break-after: page;
        page-break-after: always;
      }

      .pdf-page:last-child {
        break-after: auto;
        page-break-after: auto;
      }
    }
  </style>
</head>

<body>
  <article class="pdf-page">
    ${buildHeaderHtml()}

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
          <div class="pdf-meta-label">${escapeHtml(pdfTexts.requestNumber)}</div>
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
        <h2 class="pdf-section-title">${escapeHtml(pdfTexts.requirementInfo)}</h2>

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

      <section class="pdf-section">
        <h2 class="pdf-section-title">${escapeHtml(pdfTexts.requirementDescription)}</h2>

        <div class="description-box">${escapeHtml(messagePages[0])}</div>
      </section>

      ${
        !hasAttachmentPages
          ? `
            <section class="pdf-section">
              <h2 class="pdf-section-title">${escapeHtml(pdfTexts.attachmentList)}</h2>

              <table class="pdf-table attachment-table">
                <thead>
                  <tr>
                    <th class="index-col">${escapeHtml(pdfTexts.index)}</th>
                    <th>${escapeHtml(pdfTexts.attachmentName)}</th>
                    <th class="type-col">${escapeHtml(pdfTexts.attachmentType)}</th>
                    <th class="size-col">${escapeHtml(pdfTexts.attachmentSize)}</th>
                  </tr>
                </thead>

                <tbody>
                  ${buildEmptyAttachmentRows(pdfTexts.noAttachment)}
                </tbody>
              </table>
            </section>
          `
          : ""
      }
    </main>

    ${buildFooterHtml(1, totalPages)}
  </article>

  ${continuationPagesHtml}

  ${attachmentPagesHtml}
</body>
</html>`;
}
