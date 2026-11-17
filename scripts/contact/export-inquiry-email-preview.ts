import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { inquiryEmailAssets } from "../../lib/email/inquiry-email-assets";
import { inquiryEmailFixtures } from "./inquiry-email.fixtures";

// Explicit local output and approved H5 paths; this command never sends mail.
const output = process.argv[2];
const approvedPreview = process.argv[3];
if (!output || !approvedPreview) throw new Error("Usage: tsx scripts/contact/export-inquiry-email-preview.ts <output-directory> <approved-preview-directory>");
for (const directory of [output, path.join(output, "assets"), path.join(output, "email-html"), path.join(output, "eml")]) mkdirSync(directory, { recursive: true });
for (const asset of inquiryEmailAssets) writeFileSync(path.join(output, "assets", asset.filename), Buffer.from(asset.content, "base64"));
const catalog = JSON.parse(readFileSync(path.join(approvedPreview, "design-manifest.json"), "utf8")).cases;
const wrap = (content: string) => content.match(/.{1,76}/g)?.join("\r\n") || "";
const base64 = (content: string) => wrap(Buffer.from(content, "utf8").toString("base64"));
function encodedSubject(subject: string) {
  const chunks: string[] = [];
  let current = "";
  for (const character of subject) {
    if (Buffer.byteLength(current + character) > 42) { chunks.push(current); current = ""; }
    current += character;
  }
  if (current) chunks.push(current);
  return chunks.map(chunk => `=?UTF-8?B?${Buffer.from(chunk).toString("base64")}?=`).join("\r\n ");
}

const results = inquiryEmailFixtures().map(({ id, lang, email }) => {
  const filename = `${id}-${lang}`;
  let browserHtml = email.html;
  const usedAssets = inquiryEmailAssets.filter(asset => email.html.includes(`src="cid:${asset.content_id}"`));
  for (const asset of usedAssets) browserHtml = browserHtml.replaceAll(`cid:${asset.content_id}`, `assets/${asset.filename}`);
  writeFileSync(path.join(output, filename + ".html"), browserHtml);
  writeFileSync(path.join(output, "email-html", filename + ".html"), email.html);
  const related = "foreach-related-" + filename;
  const alternative = "foreach-alternative-" + filename;
  const parts = [
    "From: FOREACH Preview <preview@example.com>", "To: customer@example.com", `Reply-To: ${email.replyTo}`,
    "Subject: " + encodedSubject(email.subject), "Date: Tue, 17 Nov 2026 08:00:00 +0000", "MIME-Version: 1.0",
    `Content-Type: multipart/related; boundary="${related}"`, "", `--${related}`,
    `Content-Type: multipart/alternative; boundary="${alternative}"`, "", `--${alternative}`,
    'Content-Type: text/plain; charset="UTF-8"', "Content-Transfer-Encoding: base64", "", base64(email.text),
    `--${alternative}`, 'Content-Type: text/html; charset="UTF-8"', "Content-Transfer-Encoding: base64", "", base64(email.html), `--${alternative}--`,
  ];
  for (const asset of usedAssets) parts.push(`--${related}`, `Content-Type: image/png; name="${asset.filename}"`, "Content-Transfer-Encoding: base64", `Content-Disposition: inline; filename="${asset.filename}"`, `Content-ID: <${asset.content_id}>`, "", wrap(asset.content));
  parts.push(`--${related}--`, "");
  writeFileSync(path.join(output, "eml", filename + ".eml"), parts.join("\r\n"));
  const item = catalog.find((entry: { id: string }) => entry.id === id);
  item.versions[lang] = { file: filename + ".html", subject: email.subject, title: email.subject };
  return { id, lang, htmlBytes: Buffer.byteLength(email.html), inlineImages: usedAssets.length };
});
let index = readFileSync(path.join(approvedPreview, "index.html"), "utf8");
index = index.replace(/const catalog=[\s\S]*?;\s*const frame=/, "const catalog=" + JSON.stringify(catalog) + ";\nconst frame=");
index = index.replace("整套设计 · H5 预览", "Outlook / Gmail 兼容版预览").replace("设计预览 · 示例内容 · 640 px", "邮件兼容版 · 示例内容 · 640 px");
const resize = `\nfunction fitEmail(){const mail=frame.contentDocument?.querySelector('[data-mail-content]');if(mail)frame.style.height=Math.ceil(mail.getBoundingClientRect().height)+'px'}\nframe.addEventListener('load',()=>{fitEmail();frame.contentDocument?.fonts?.ready.then(fitEmail)});\n`;
index = index.replace("</script>", resize + "</script>");
writeFileSync(path.join(output, "index.html"), index);
writeFileSync(path.join(output, "compatibility-manifest.json"), JSON.stringify({ date: "2026-11-17", productionRenderer: "lib/email/inquiry-email.ts", width: 640, liveEmailsSent: false, deployed: false, outlookInboxTested: false, gmailInboxTested: false, fixtures: results, references: ["https://developers.google.com/workspace/gmail/design/css", "https://learn.microsoft.com/en-us/troubleshoot/dynamics-365/customer-insights/journeys/email/email-troubleshoot-rendering", "https://resend.com/docs/dashboard/emails/embed-inline-images"] }, null, 2));
writeFileSync(path.join(output, "使用说明.txt"), "FOREACH 询盘邮件兼容版\n\nindex.html：中英文邮件预览。\nemail-html：实际发送的 HTML，图片使用 cid。\neml：含纯文本、HTML 和 PNG 内嵌图片的示例邮件，可用于本地收件客户端检查。\nassets：从已确认设计转换的 PNG 品牌资源。\n\n本地模拟测试通过，两套发送接口共用模板。尚未部署，未实际向 Outlook 或 Gmail 发信，不能将浏览器预览等同于真实客户端收件实测。\n示例邮件使用演示数据，无真实客户资料。\n", "utf8");
console.log(JSON.stringify({ output, previews: results.length, maxHtmlBytes: Math.max(...results.map(item => item.htmlBytes)), eml: results.length }));
