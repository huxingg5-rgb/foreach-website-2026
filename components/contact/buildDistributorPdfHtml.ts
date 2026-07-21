/* =========================================================
   buildDistributorPdfHtml.ts
   恒永达官网｜经销商合作申请表 PDF HTML 生成工具

   文件路径：
   components/contact/buildDistributorPdfHtml.ts

   作用：
   1. 专门生成“经销商合作申请表”的 PDF HTML
   2. 复用与联系我们 PDF 相同的页眉、页脚 SVG
   3. 中间正文不再套用“联系我们需求单”的字段结构
   4. 让 PDF 内容真实对应经销商表单字段：
      - Company Name
      - Country / Region
      - Contact Person
      - Email
      - Phone / WhatsApp
      - Company Website
      - Main Industry
      - Interested FOREACH Products
      - Cooperation Background / Project Needs
      - Attachment List

   注意：
   1. 本文件只负责生成 PDF HTML 字符串
   2. 不负责创建 iframe
   3. 不负责调用 print()
   4. iframe 打印逻辑下一步继续放在 DistributorPageContent.tsx 里复用
========================================================= */

import type { DistributorPageData } from "@/data/contact-cooperation/distributor.intl";

/* =========================================================
   页眉页脚 SVG 路径
   说明：
   继续沿用联系我们 PDF 的页眉页脚设计
========================================================= */

const PDF_HEADER_GRAPHIC_SRC =
  "/images/contact-cooperation/pdf/request-form-header-graphic.svg";

const PDF_FOOTER_GRAPHIC_SRC =
  "/images/contact-cooperation/pdf/request-form-footer-graphic.svg";

/* =========================================================
   经销商 PDF 表单数据类型
   说明：
   这个类型对应经销商页面真实表单字段
========================================================= */

export type DistributorPdfFormState = {
  companyName: string;
  country: string;
  contactName: string;
  phone: string;
  email: string;
  emailCode: string;
  website: string;
  industry: string;
  productInterest: string;
  requirement: string;
};

/* =========================================================
   PDF 附件信息类型
========================================================= */

export type DistributorPdfFileMeta = {
  name: string;
  size: number;
  type?: string;
};

/* =========================================================
   buildDistributorPdfHtml 参数类型
========================================================= */

export type BuildDistributorPdfHtmlParams = {
  content: DistributorPageData;
  formData: DistributorPdfFormState;
  selectedFiles: DistributorPdfFileMeta[];
  requestNumber: string;
  createdAtText: string;
  htmlLang?: string;
};

/* =========================================================
   HTML 转义
   说明：
   客户输入内容不能直接拼进 HTML，避免特殊字符破坏结构
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

export function formatDistributorFileSize(size: number) {
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
  if (!fileName.includes(".")) {
    return "FILE";
  }

  const extension = fileName.split(".").pop();

  return extension ? extension.toUpperCase() : "FILE";
}

/* =========================================================
   将数组分组
   说明：
   附件较多时分页显示
========================================================= */

function chunkArray<T>(items: T[], chunkSize: number) {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }

  return chunks;
}

/* =========================================================
   将长需求描述拆分为多页
   说明：
   1. 第一页还有公司信息、市场信息、附件信息，所以不能放太多文字
   2. 续页空间更大
   3. 这里是网页打印 PDF，无法像专业 PDF 引擎一样精确计算高度
========================================================= */

function splitRequirementToPages(requirement: string, fallback: string) {
  const normalizedRequirement = requirement.trim() || fallback;

  const firstPageMaxLength = 700;

  const nextPageMaxLength = 1300;

  const chunks: string[] = [];

  if (normalizedRequirement.length <= firstPageMaxLength) {
    return [normalizedRequirement];
  }

  chunks.push(normalizedRequirement.slice(0, firstPageMaxLength));

  let restText = normalizedRequirement.slice(firstPageMaxLength);

  while (restText.length > 0) {
    chunks.push(restText.slice(0, nextPageMaxLength));
    restText = restText.slice(nextPageMaxLength);
  }

  return chunks;
}

/* =========================================================
   获取行业显示名称
   说明：
   表单里存的是 value，PDF 中显示 label
========================================================= */

function getSelectedIndustryLabel(
  content: DistributorPageData,
  industryValue: string,
) {
  return (
    content.form.options.find((item) => item.value === industryValue)?.label ||
    industryValue ||
    "Not selected"
  );
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
  files: DistributorPdfFileMeta[],
  startIndex: number,
) {
  return files
    .map((file, index) => {
      return `
        <tr>
          <td class="index-col">${startIndex + index + 1}</td>
          <td>${escapeHtml(file.name)}</td>
          <td class="type-col">${escapeHtml(getFileType(file.name))}</td>
          <td class="size-col">${escapeHtml(formatDistributorFileSize(file.size))}</td>
        </tr>
      `;
    })
    .join("");
}

/* =========================================================
   空附件行 HTML
========================================================= */

function buildEmptyAttachmentRows() {
  return `
    <tr>
      <td colspan="4" class="pdf-empty-cell">No attachment uploaded</td>
    </tr>
  `;
}

/* =========================================================
   生成经销商合作申请表 PDF HTML
========================================================= */

export function buildDistributorPdfHtml({
  content,
  formData,
  selectedFiles,
  requestNumber,
  createdAtText,
  htmlLang = "en",
}: BuildDistributorPdfHtmlParams) {
  const notFilledText = "Not filled";

  const notSelectedText = "Not selected";

  const selectedIndustryLabel = getSelectedIndustryLabel(
    content,
    formData.industry,
  );

  const requirementPages = splitRequirementToPages(
    formData.requirement,
    notFilledText,
  );

  const firstRequirementPage = requirementPages[0] ?? notFilledText;

  const requirementContinuationPages = requirementPages.slice(1);

  /*
     第一页附件最多显示 5 个，避免挤压主体内容。
     如果附件超过 5 个，剩余附件单独分页。
  */
  const firstPageFiles = selectedFiles.slice(0, 5);

  const remainingFiles = selectedFiles.slice(5);

  const attachmentChunks =
    remainingFiles.length > 0 ? chunkArray(remainingFiles, 14) : [];

  const totalPages =
    1 + requirementContinuationPages.length + attachmentChunks.length;

  let currentPage = 1;

  /* =========================================================
     续页：合作背景 / 项目需求
  ========================================================= */

  const continuationPagesHtml = requirementContinuationPages
    .map((requirementChunk, index) => {
      currentPage += 1;

      return `
        <article class="pdf-page">
          ${buildHeaderHtml()}

          <main class="pdf-main continuation-main">
            <section class="pdf-section">
              <h2 class="pdf-section-title">
                3. ${escapeHtml(content.form.requirement)} Continued ${index + 1}
              </h2>

              <div class="description-box description-box-large">
                ${escapeHtml(requirementChunk)}
              </div>
            </section>
          </main>

          ${buildFooterHtml(currentPage, totalPages)}
        </article>
      `;
    })
    .join("");

  /* =========================================================
     续页：附件列表
  ========================================================= */

  const attachmentPagesHtml = attachmentChunks
    .map((files, index) => {
      currentPage += 1;

      const startIndex = 5 + index * 14;

      return `
        <article class="pdf-page attachment-page">
          ${buildHeaderHtml()}

          <main class="pdf-main attachment-main">
            <section class="pdf-section">
              <h2 class="pdf-section-title">
                4. Attachment List Continued ${index + 1}
              </h2>

              <table class="pdf-table attachment-table">
                <thead>
                  <tr>
                    <th class="index-col">No.</th>
                    <th>Attachment Name</th>
                    <th class="type-col">Type</th>
                    <th class="size-col">Size</th>
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
  <title>${escapeHtml(content.form.title)}</title>

  <style>
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
       页眉
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
       页脚
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

    /* =========================================================
       标题区
    ========================================================= */

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
      font-size: 27px;
      line-height: 1.12;
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
      min-width: 52mm;
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
      overflow-wrap: anywhere;
    }

    /* =========================================================
       分区
    ========================================================= */

    .pdf-section {
      margin-bottom: 6.5mm;
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
      overflow-wrap: anywhere;
    }

    .pdf-table th {
      width: 32mm;
      color: #52647d;
      background: #f4f7fb;
      text-align: left;
      font-weight: 850;
      white-space: normal;
      line-height: 1.35;
      font-size: 9.2px;
    }

    .pdf-table td {
      color: #12233d;
      font-weight: 650;
    }

    /* =========================================================
       需求描述
    ========================================================= */

    .description-box {
      min-height: 34mm;
      max-height: 72mm;
      padding: 4mm;
      border: 1px solid #d9e1ec;
      background: #ffffff;
      color: #12233d;
      font-size: 10.5px;
      line-height: 1.65;
      white-space: pre-wrap;
      word-break: break-word;
      overflow-wrap: anywhere;
      overflow: hidden;
    }

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
      width: 18mm;
      text-align: center;
    }

    .attachment-table .type-col {
      width: 28mm;
    }

    .attachment-table .size-col {
      width: 28mm;
    }

    .pdf-empty-cell {
      text-align: center;
      color: #7c8aa0;
      font-weight: 800;
    }

    /* =========================================================
       打印时去除阴影和页面间距
    ========================================================= */

    @media print {
      html,
      body {
        width: 210mm;
        background: #ffffff;
      }

      .pdf-page {
        margin: 0;
        box-shadow: none;
        page-break-after: always;
      }

      .pdf-page:last-child {
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
          <h1>${escapeHtml(content.form.title)}</h1>
          <p>Distributor Partnership Form</p>
        </div>

        <div class="pdf-status">
          Website Distributor Partnership Form
        </div>
      </section>

      <section class="pdf-meta">
        <div class="pdf-meta-item">
          <div class="pdf-meta-label">Request No.</div>
          <div class="pdf-meta-value">${escapeHtml(requestNumber)}</div>
        </div>

        <div class="pdf-meta-item">
          <div class="pdf-meta-label">Created At</div>
          <div class="pdf-meta-value">${escapeHtml(createdAtText)}</div>
        </div>

        <div class="pdf-meta-item">
          <div class="pdf-meta-label">Source</div>
          <div class="pdf-meta-value">Website Distributor Partnership Form</div>
        </div>
      </section>

      <section class="pdf-section">
        <h2 class="pdf-section-title">1. Company Information</h2>

        <table class="pdf-table">
          <tbody>
            <tr>
              <th>${escapeHtml(content.form.companyName)}</th>
              <td>${escapeHtml(formData.companyName || notFilledText)}</td>
              <th>${escapeHtml(content.form.country)}</th>
              <td>${escapeHtml(formData.country || notFilledText)}</td>
            </tr>

            <tr>
              <th>${escapeHtml(content.form.contactName)}</th>
              <td>${escapeHtml(formData.contactName || notFilledText)}</td>
              <th>${escapeHtml(content.form.emailVerification)}</th>
              <td>${escapeHtml(formData.email || notFilledText)}</td>
            </tr>

            <tr>
              <th>${escapeHtml(content.form.phone)}</th>
              <td>${escapeHtml(formData.phone || notFilledText)}</td>
              <th>${escapeHtml(content.form.website)}</th>
              <td>${escapeHtml(formData.website || notFilledText)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="pdf-section">
        <h2 class="pdf-section-title">2. Market & Product Interest</h2>

        <table class="pdf-table">
          <tbody>
            <tr>
              <th>${escapeHtml(content.form.industry)}</th>
              <td>${escapeHtml(selectedIndustryLabel || notSelectedText)}</td>
              <th>Interested Products</th>
              <td>${escapeHtml(formData.productInterest || notSelectedText)}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="pdf-section">
        <h2 class="pdf-section-title">3. ${escapeHtml(content.form.requirement)}</h2>

        <div class="description-box">
          ${escapeHtml(firstRequirementPage)}
        </div>
      </section>

      <section class="pdf-section">
        <h2 class="pdf-section-title">4. Attachment List</h2>

        <table class="pdf-table attachment-table">
          <thead>
            <tr>
              <th class="index-col">No.</th>
              <th>Attachment Name</th>
              <th class="type-col">Type</th>
              <th class="size-col">Size</th>
            </tr>
          </thead>

          <tbody>
            ${
              selectedFiles.length > 0
                ? buildAttachmentRows(firstPageFiles, 0)
                : buildEmptyAttachmentRows()
            }
          </tbody>
        </table>
      </section>
    </main>

    ${buildFooterHtml(1, totalPages)}
  </article>

  ${continuationPagesHtml}
  ${attachmentPagesHtml}
</body>
</html>`;
} 