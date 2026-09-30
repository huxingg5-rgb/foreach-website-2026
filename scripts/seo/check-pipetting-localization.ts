import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getPipettingApplications } from "../../data/products/detail/pipetting-pump-applications.locales";
import { getPipettingSpecs } from "../../data/products/detail/pipetting-pump-specs.locales";
import { applyInstrumentFluidicsChineseCopy } from "../../data/products/detail/instrument-fluidics-copy.zh";
import { getPipettingFaqs } from "../../data/products/detail/pipetting-pump-faq.locales";
import { getPipettingModelPath } from "../../data/products/selection/pipetting-pump-routes";
import source from "../../data/products/generated/pumps/pipetting-pumps/detail/index.json";

const reportDir = process.env.SMTP_REPORT_DIR;
const base = process.env.SMTP_BASE_URL;
const out = process.env.SMTP_OUT_DIR;
const flatten = (app: any): string[] => [app.tabLabel, app.title, ...app.intro, ...app.items.flatMap((i: any) => [i.title, ...i.paragraphs]), app.selectionNote.title, ...app.selectionNote.paragraphs];
const normalize = (value: string) => value.replace(/&(?:amp|lt|gt|quot|apos|#x27|#39|nbsp);/g, entity => ({"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"', "&apos;":"'", "&#x27;":"'", "&#39;":"'", "&nbsp;":" "}[entity]!)).replace(/\s+/g, " ").trim();
const results: unknown[] = [];
let comparison = "# SMTP 应用正文中英文对照\n\n中文基准：instrument-fluidics-copy.zh.ts。英文按同一字段、标题和段落对应；其余语言保持同样结构。页面仍为单语言展示。\n";

async function main() {
  for (const product of source) {
    const zh = (applyInstrumentFluidicsChineseCopy(product, "zh") as any).applicationDetails;
    const en = getPipettingApplications("en", product.slug)!;
    comparison += `\n## ${product.slug}\n`;
    flatten(zh).forEach((text, index) => { comparison += `\n**中文**：${text}\n\n**English**: ${flatten(en)[index]}\n`; });
    for (const locale of ["en", "es", "fr", "ko", "ru"]) {
      const app = getPipettingApplications(locale, product.slug)!;
      const specs = getPipettingSpecs(locale, product.slug)!;
      const faqs = getPipettingFaqs(locale, product.slug)!;
      assert.deepEqual(app.items.map(i => i.paragraphs.length), zh.items.map((i: any) => i.paragraphs.length));
      assert.equal(flatten(app).length, flatten(zh).length);
      assert.equal(specs.length, product.specs.length);
      assert.equal(faqs.length, product.slug.startsWith("smtp2") ? 6 : 5);
      for (let index = 0; index < specs.length; index++) {
        const original = locale === "ko" ? product.specs[index].value.replace("四线", "4선") : product.specs[index].value;
        assert.deepEqual(specs[index].value.match(/\d+(?:\.\d+)?/g)?.sort(), original.match(/\d+(?:\.\d+)?/g)?.sort(), `${locale}/${product.slug}: numerical spec ${index}`);
      }
      const authored = [...flatten(app), ...specs.flatMap(s => [s.label, s.value]), ...faqs.flatMap(f => [f.question, f.answer])];
      assert(!/[\u3400-\u9fff]/.test(authored.join("\n")), `${locale}/${product.slug}: Chinese remains`);
      const urlPath = getPipettingModelPath(locale, product.slug);
      assert(urlPath, `Missing route: ${locale}/${product.slug}`);
      if (base || out) {
        const html = base ? await (async () => { const r = await fetch(new URL(urlPath, base)); assert.equal(r.status, 200, urlPath); return r.text(); })() : fs.readFileSync(path.join(out!, urlPath, "index.html"), "utf8");
        const visible = normalize(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "").replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " "));
        for (const text of authored) assert(visible.includes(normalize(text)), `${locale}/${product.slug}: missing rendered text ${text.slice(0,100)}`);
        assert(!/[\u3400-\u9fff]/.test(visible.replaceAll("简体中文", "")), `${locale}/${product.slug}: rendered Chinese remains`);
        assert(!/structureconfirm|gas-displacementPipetting|is used for and and|supports and Custom/.test(visible), `${locale}/${product.slug}: malformed copy`);
        const imageAlts = [...html.matchAll(/<img\b[^>]*\balt="([^"]*)"/g)].map(match => normalize(match[1]));
        assert(imageAlts.includes(`FOREACH ${specs[0].value}`), `${locale}/${product.slug}: localized product image ALT`);
      }
      results.push({ locale, model: product.slug, applicationTextFields: flatten(app).length, specs: specs.length, faqs: faqs.length, rendered: Boolean(base || out), passed: true });
    }
  }
  if (reportDir) {
    fs.mkdirSync(reportDir, { recursive: true });
    fs.writeFileSync(path.join(reportDir, "中英文逐段对照.md"), comparison);
    fs.writeFileSync(path.join(reportDir, base ? "live-check.json" : out ? "export-check.json" : "source-check.json"), JSON.stringify(results, null, 2));
  }
  console.log(JSON.stringify({ passed: results.length, results }, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
