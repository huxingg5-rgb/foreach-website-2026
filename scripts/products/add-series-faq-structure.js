const fs = require("fs");
const path = require("path");

const root = process.cwd();

const faqFile = path.join(
  root,
  "data",
  "products",
  "detail",
  "product-detail-faq.zh.ts"
);

const serviceFile = path.join(
  root,
  "services",
  "products",
  "detail",
  "getProductDetailPageData.ts"
);

const typeFile = path.join(
  root,
  "data",
  "products",
  "detail",
  "product-detail.types.ts"
);

const clientFile = path.join(
  root,
  "components",
  "products",
  "detail",
  "ProductDetailClient.tsx"
);

const cssFile = path.join(
  root,
  "components",
  "products",
  "detail",
  "product-detail.module.css"
);

function backup(file) {
  if (!fs.existsSync(file)) return;
  const time = new Date().toISOString().replace(/[:.]/g, "-");
  fs.copyFileSync(file, `${file}.backup-series-faq-${time}`);
}

/* =========================================================
   1. 新增 FAQ 数据文件
   说明：
   - FAQ 按产品系列维护
   - 当前先建立结构
   - 没有最终文案时，可以保持数组为空
========================================================= */
backup(faqFile);

const faqContent = `/* =========================================================
   产品详情页 FAQ 数据
   规则：
   1. FAQ 按产品系列维护
   2. 不按单个型号重复维护
   3. 页面会根据 faqSeries / faqKey 自动读取
========================================================= */

export type ProductDetailFaqZhItem = {
  question: string;
  answer: string;
};

export const productDetailFaqZhBySeries: Record<
  string,
  ProductDetailFaqZhItem[]
> = {
  /*
   * EA-100-PMMA / EA-100-PEEK / EA-250-PMMA 等
   * 同属 EA 常规柱塞泵系列，后续统一在这里补 FAQ。
   */
  "EA常规柱塞泵": [],
};

export function getProductDetailFaqZhBySeries(
  series?: string,
): ProductDetailFaqZhItem[] {
  if (!series) {
    return [];
  }

  return productDetailFaqZhBySeries[series] ?? [];
}
`;

fs.writeFileSync(faqFile, faqContent, "utf8");

/* =========================================================
   2. 更新类型：ProductDetailPageData 增加 faqs
========================================================= */
backup(typeFile);

let typeContent = fs.readFileSync(typeFile, "utf8");

if (!typeContent.includes("export type ProductDetailFaqItem")) {
  typeContent = typeContent.replace(
    /export type ProductDetailCategory[\s\S]*?;/,
    (match) => `${match}

export type ProductDetailFaqItem = {
  question: string;
  answer: string;
};`
  );
}

if (!typeContent.includes("faqs?: ProductDetailFaqItem[]")) {
  typeContent = typeContent.replace(
    /faqKey\?: string;/,
    `faqKey?: string;

  /**
   * FAQ 按产品系列读取。
   * 没有配置 FAQ 时不渲染。
   */
  faqs?: ProductDetailFaqItem[];`
  );
}

fs.writeFileSync(typeFile, typeContent, "utf8");

/* =========================================================
   3. 更新详情页 service：根据 faqSeries 读取 FAQ
========================================================= */
backup(serviceFile);

let serviceContent = fs.readFileSync(serviceFile, "utf8");

if (!serviceContent.includes("getProductDetailFaqZhBySeries")) {
  serviceContent = serviceContent.replace(
    /import type \{/,
    `import { getProductDetailFaqZhBySeries } from "@/data/products/detail/product-detail-faq.zh";

import type {`
  );
}

if (!serviceContent.includes("faqs: getProductDetailFaqZhBySeries")) {
  serviceContent = serviceContent.replace(
    /faqKey: detailRecord\.faqSeries \|\| undefined,/,
    `faqKey: detailRecord.faqSeries || undefined,
    faqs: getProductDetailFaqZhBySeries(
      detailRecord.faqSeries,
    ),`
  );
}

fs.writeFileSync(serviceFile, serviceContent, "utf8");

/* =========================================================
   4. 更新详情页组件：规格区下面渲染 FAQ
   有 FAQ 才显示，空数组不显示
========================================================= */
backup(clientFile);

let clientContent = fs.readFileSync(clientFile, "utf8");

if (!clientContent.includes("styles.faqSection")) {
  const insertAfter = `        </section>`;

  const faqBlock = `
        {data.faqs && data.faqs.length > 0 ? (
          <section className={styles.faqSection}>
            <div className={styles.faqHeader}>
              <h2>常见问题</h2>
              <p>FAQ</p>
            </div>

            <div className={styles.faqList}>
              {data.faqs.map((item, index) => (
                <article
                  className={styles.faqItem}
                  key={\`\${item.question}-\${index}\`}
                >
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
`;

  const firstIndex = clientContent.indexOf(insertAfter, clientContent.indexOf("detailSection"));
  if (firstIndex !== -1) {
    clientContent =
      clientContent.slice(0, firstIndex + insertAfter.length) +
      faqBlock +
      clientContent.slice(firstIndex + insertAfter.length);
  } else {
    console.warn("没有找到 detailSection 结束位置，请手动检查 ProductDetailClient.tsx。");
  }
}

fs.writeFileSync(clientFile, clientContent, "utf8");

/* =========================================================
   5. 增加 FAQ 样式
========================================================= */
backup(cssFile);

let cssContent = fs.readFileSync(cssFile, "utf8");

const startMarker = "/* ===== FOREACH product detail FAQ START ===== */";
const endMarker = "/* ===== FOREACH product detail FAQ END ===== */";

const markerPattern = new RegExp(
  `${startMarker.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}[\\s\\S]*?${endMarker.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")}`,
  "g"
);

cssContent = cssContent.replace(markerPattern, "").trimEnd();

const faqCss = `
${startMarker}

.faqSection {
  margin-top: 56px;
  padding-top: 40px;
  border-top: 1px solid #dbe3ee;
}

.faqHeader {
  margin-bottom: 26px;
}

.faqHeader h2 {
  margin: 0;
  color: #0b2f5b;
  font-size: 28px;
  font-weight: 600;
  line-height: 1.25;
}

.faqHeader p {
  margin: 8px 0 0;
  color: #708096;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.faqList {
  display: grid;
  gap: 14px;
}

.faqItem {
  padding: 22px 26px;
  border: 1px solid #dbe3ee;
  background: #ffffff;
}

.faqItem h3 {
  margin: 0;
  color: #0b2f5b;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.45;
}

.faqItem p {
  margin: 10px 0 0;
  color: #32445d;
  font-size: 15px;
  line-height: 1.75;
}

@media (max-width: 768px) {
  .faqSection {
    margin-top: 36px;
    padding-top: 28px;
  }

  .faqHeader h2 {
    font-size: 24px;
  }

  .faqItem {
    padding: 18px 16px;
  }
}

${endMarker}
`;

cssContent = `${cssContent}\n\n${faqCss}\n`;

fs.writeFileSync(cssFile, cssContent, "utf8");

console.log("已完成系列 FAQ 结构搭建。");
console.log("新增文件：", faqFile);
console.log("已更新：", typeFile);
console.log("已更新：", serviceFile);
console.log("已更新：", clientFile);
console.log("已更新：", cssFile);
