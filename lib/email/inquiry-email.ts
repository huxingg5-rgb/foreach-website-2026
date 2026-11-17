import { escapeHtml, htmlText } from "../cloudflare/inquiry";

export type InquiryEmailLocale = "zh" | "en";
export type InquiryEmail = { subject: string; html: string; text: string; replyTo: string };
export type InquiryEmailData = {
  locale: string;
  referenceId: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  region?: string;
  requestType: string;
  productType?: string;
  targetModel?: string;
  projectStage?: string;
  productName?: string;
  productSeries?: string;
  productModel?: string;
  currentUrl?: string;
  message?: string;
  attachments: readonly { name: string }[];
  filesReceived: boolean;
};

const NAVY = "#173368";
const FONT = 'Arial,\'Microsoft YaHei\',\'PingFang SC\',sans-serif';
const TABLE = "border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;";
const WEBSITE = "https://www.foreachtek.com";

export function resolveInquiryEmailLocale(value: unknown): InquiryEmailLocale {
  return /^zh(?:[-_]|$)/i.test(String(value ?? "").trim()) ? "zh" : "en";
}

export function inquiryEmailContact(locale: InquiryEmailLocale): string {
  return locale === "zh" ? "sales@foreachtek.com" : "info@foreachtek.com";
}

function table(content: string, width: number | string = "100%", extra = ""): string {
  return `<table role="presentation"${width === "auto" ? "" : ` width="${width}"`} border="0" cellspacing="0" cellpadding="0" style="${TABLE}${width === 640 ? "width:640px;table-layout:fixed;" : ""}" ${extra}>${content}</table>`;
}

function image(id: string, width: number, height: number, alt = ""): string {
  return `<img src="cid:foreach-${id}" width="${width}" height="${height}" alt="${escapeHtml(alt)}" border="0" style="display:block;border:0;outline:none;text-decoration:none;width:${width}px;height:${height}px;color:#09e9b4;font-family:${FONT};font-size:16px;">`;
}

function paragraph(content: string, size = 15, color = "#263a59", top = 0): string {
  return `<p style="margin:${top}px 0 0;font-family:${FONT};font-size:${size}px;line-height:${size === 15 ? 27 : size + 9}px;mso-line-height-rule:at-least;color:${color};">${content}</p>`;
}

function emailLink(address: string): string {
  return `<a href="mailto:${encodeURIComponent(address).replace(/%40/g, "@")}" style="color:#245c9c;text-decoration:none;">${escapeHtml(address)}</a>`;
}

function button(locale: InquiryEmailLocale): string {
  const zh = locale === "zh";
  const width = zh ? 95 : 83;
  return table(`<tr><td width="${width}" height="${zh ? 32 : 28}" align="center" valign="middle" style="border:1px solid #ffffff;font-family:${FONT};font-size:10px;line-height:18px;color:#ffffff;"><a href="${WEBSITE}${zh ? "/" : "/en/"}" style="color:#ffffff;text-decoration:none;">${zh ? "访问官网" : "Visit Website"}</a></td></tr>`, width);
}

function footerContact(locale: InquiryEmailLocale, width: number): string {
  const contact = inquiryEmailContact(locale);
  const linkStyle = `font-family:${FONT};font-size:10px;line-height:18px;color:#ffffff;text-decoration:none;white-space:nowrap;`;
  return table(`<tr><td width="50%" align="left">${table(`<tr><td width="11" valign="middle">${image("phone", 11, 11)}</td><td style="padding-left:6px;"><a href="tel:+8675586553831" style="${linkStyle}">+86 (0755)-8655-3831</a></td></tr>`, "auto")}</td><td width="50%" align="right">${table(`<tr><td width="12" valign="middle">${image("email", 12, 12)}</td><td style="padding-left:4px;"><a href="mailto:${contact}" style="${linkStyle}">${contact}</a></td></tr>`, "auto")}</td></tr>`, width);
}

function footer(locale: InquiryEmailLocale): string {
  if (locale === "zh") {
    return `<tr><td bgcolor="${NAVY}" style="background-color:${NAVY};padding:27px 35px 35px;">${table(`<tr><td width="285" valign="top">${table(`<tr><td>${image("logo", 157, 35, "FOREACH")}</td></tr><tr><td style="padding:32px 0 0 4px;">${button(locale)}</td></tr>`, 285)}</td><td width="285" valign="top" style="padding-top:8px;">${table(`<tr><td align="right" style="font-family:${FONT};font-size:20px;line-height:27px;font-weight:500;color:#ffffff;white-space:nowrap;">深圳市恒永达科技股份有限公司</td></tr><tr><td align="right" style="padding-top:4px;font-family:${FONT};font-size:11px;line-height:14px;color:#ffffff;">广东省深圳市光明区光侨大道1008号裕丰达工业园2栋1301，邮编518132</td></tr><tr><td style="padding-top:5px;">${footerContact(locale, 280)}</td></tr>`, 285)}</td></tr>`, 570)}</td></tr>`;
  }
  const social = [
    ["linkedin", "https://www.linkedin.com/company/102748876/", "LinkedIn", 21, 21],
    ["facebook", "https://www.facebook.com/people/Foreach-Technology/61586049132811/", "Facebook", 28, 28],
    ["youtube", "https://www.youtube.com/@ForeachFluid", "YouTube", 23, 23],
    ["instagram", "https://www.instagram.com/foreachtechnology/", "Instagram", 27, 26],
    ["x", "https://x.com/ForeachFluid", "X", 20, 20],
  ] as const;
  const socials = table(`<tr>${social.map(([id, href, alt, w, h]) => `<td width="58" align="${id === "linkedin" ? "left" : id === "x" ? "right" : "center"}" valign="middle"><a href="${href}" style="text-decoration:none;">${image(id, w, h, alt)}</a></td>`).join("")}</tr>`, 292);
  return `<tr><td bgcolor="${NAVY}" style="background-color:${NAVY};padding:34px 50px 27px;">${table(`<tr><td width="248" valign="top" style="padding-top:5px;">${table(`<tr><td>${image("logo", 185, 41, "FOREACH")}</td></tr><tr><td style="padding-top:30px;">${button(locale)}</td></tr>`, 248)}</td><td width="292" valign="top">${table(`<tr><td height="28">${socials}</td></tr><tr><td height="17" style="height:17px;border-bottom:1px solid #ffffff;font-size:1px;line-height:1px;">&nbsp;</td></tr><tr><td style="padding-top:10px;font-family:${FONT};font-size:12px;font-weight:700;line-height:18px;color:#ffffff;">Shenzhen Foreach Technology Co., Ltd.</td></tr><tr><td style="padding-top:8px;font-family:${FONT};font-size:10px;line-height:12px;color:#d7dfec;">13F, Building 2, Yufengda Industrial Park, Guangming District,<br>Shenzhen 518132, China</td></tr><tr><td style="padding-top:9px;">${footerContact(locale, 292)}</td></tr>`, 292)}</td></tr><tr><td colspan="2" style="padding-top:24px;font-family:${FONT};font-size:10px;line-height:12px;color:#c5d0e2;">FOREACH · Website Inquiry</td></tr>`, 540)}</td></tr>`;
}

function shell(locale: InquiryEmailLocale, title: string, eyebrow: string, body: string): string {
  const header = `<tr><td height="104" bgcolor="${NAVY}" style="height:104px;background-color:${NAVY};padding:0 32px;">${table(`<tr><td width="185" height="104" valign="middle">${image("logo", 185, 41, "FOREACH")}</td><td width="391" height="104" align="right" valign="middle"><p style="margin:0;font-family:${FONT};font-size:9px;line-height:13px;font-weight:600;letter-spacing:1.7px;color:#09e9b4;">${escapeHtml(eyebrow)}</p><h1 style="margin:7px 0 0;font-family:${FONT};font-size:20px;line-height:25px;font-weight:600;color:#ffffff;">${escapeHtml(title)}</h1></td></tr>`, 576)}</td></tr>`;
  return `<!doctype html><html lang="${locale === "zh" ? "zh-CN" : "en"}" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="utf-8"><meta name="viewport" content="width=640"><meta name="format-detection" content="telephone=no"><meta name="color-scheme" content="light"><title>${escapeHtml(title)}</title><!--[if mso]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]--></head><body style="margin:0;padding:0;background-color:#f2f5f8;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">${table(`<tr><td align="center" valign="top">${table(`${header}<tr><td style="padding:30px 32px 32px;background-color:#ffffff;">${body}</td></tr>${footer(locale)}`, 640, 'data-mail-content="true" bgcolor="#ffffff"')}</td></tr>`)}</body></html>`;
}

type Row = { zh: string; en: string; value?: string; email?: boolean };

function summary(rows: readonly Row[], locale: InquiryEmailLocale): string {
  // Keep padding inside a nested cell. Adding padding to an explicitly sized
  // outer column makes Word/browser table algorithms expand the 640px shell.
  const paddedCell = (content: string, color: string) => table(`<tr><td align="left" valign="top" style="padding:11px 14px;font-family:${FONT};font-size:14px;line-height:24px;font-weight:400;color:${color};word-break:break-word;overflow-wrap:anywhere;">${content}</td></tr>`);
  return `<table width="576" border="0" cellspacing="0" cellpadding="0" aria-label="${locale === "zh" ? "需求摘要" : "Request summary"}" style="${TABLE}width:576px;table-layout:fixed;border:1px solid #e1e7ee;">${rows.map(row => `<tr><th scope="row" width="142" align="left" valign="top" bgcolor="#fafbfc" style="width:142px;padding:0;border-bottom:1px solid #e5eaf0;background-color:#fafbfc;font-weight:400;">${paddedCell(escapeHtml(locale === "zh" ? row.zh : row.en), "#666666")}</th><td width="433" align="left" valign="top" style="width:433px;padding:0;border-bottom:1px solid #e5eaf0;">${paddedCell(row.email ? emailLink(row.value || "") : htmlText(row.value || "-"), "#222222")}</td></tr>`).join("")}</table>`;
}

function plainSummary(rows: readonly Row[], locale: InquiryEmailLocale): string {
  return rows.map(row => `${locale === "zh" ? row.zh : row.en}: ${row.value || "-"}`).join("\n");
}

function subject(value: string): string {
  return value.replace(/[\r\n]+/g, " ").slice(0, 240);
}

function finish(locale: InquiryEmailLocale, title: string, eyebrow: string, content: string, plain: string, mailSubject: string): InquiryEmail {
  const zh = locale === "zh";
  const contact = inquiryEmailContact(locale);
  return {
    subject: subject(mailSubject),
    html: shell(locale, title, eyebrow, content),
    text: plain + `\n\nFOREACH\n${zh ? "深圳市恒永达科技股份有限公司\n广东省深圳市光明区光侨大道1008号裕丰达工业园2栋1301，邮编518132" : "Shenzhen Foreach Technology Co., Ltd.\n13F, Building 2, Yufengda Industrial Park, Guangming District, Shenzhen 518132, China"}\n+86 (0755)-8655-3831\n${contact}\n${WEBSITE}${zh ? "/" : "/en/"}`,
    replyTo: contact,
  };
}

export function buildVerificationEmail(code: string, language: unknown): InquiryEmail {
  if (!/^\d{6}$/.test(code)) throw new Error("Invalid verification code format.");
  const locale = resolveInquiryEmailLocale(language);
  const zh = locale === "zh";
  const intro = zh ? "您正在 FOREACH 官网提交需求，请使用下方验证码验证您的邮箱。" : "Please use the code below to verify your email address and continue submitting your request on the FOREACH website.";
  const expiry = zh ? "验证码在 10 分钟内有效" : "This code is valid for 10 minutes.";
  const followup = zh ? "请返回官网输入验证码，继续提交需求。" : "Return to the website and enter this code to continue.";
  const security = zh ? "如非本人操作，可忽略此邮件。请勿向他人透露验证码。" : "If you did not request this code, you can ignore this email. Do not share your code.";
  const panel = table(`<tr><td align="center" bgcolor="#f5f7fa" style="padding:23px 20px 22px;background-color:#f5f7fa;border:1px solid #e5eaf0;">${paragraph(zh ? "邮箱验证码" : "Your verification code", 12, "#666666")}<p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:40px;line-height:60px;font-weight:600;letter-spacing:10px;color:${NAVY};">${code}</p>${paragraph(expiry, 12, "#666666", 9)}</td></tr>`, 576);
  return finish(locale, zh ? "验证您的邮箱" : "Verify Your Email", zh ? "邮箱验证" : "EMAIL VERIFICATION",
    paragraph(intro) + table(`<tr><td style="padding-top:24px;">${panel}</td></tr>`, 576) + paragraph(followup, 13, "#5e6a79", 20) + paragraph(security, 12, "#87919d", 14) + paragraph(zh ? "FOREACH 团队" : "The FOREACH Team", 13, "#263a59", 20),
    `${intro}\n\n${code}\n${expiry}\n\n${followup}\n${security}`, zh ? "FOREACH 官网邮箱验证码" : "FOREACH website email verification");
}

export function buildInquiryEmails(data: InquiryEmailData): { notification: InquiryEmail; confirmation: InquiryEmail } {
  const locale = resolveInquiryEmailLocale(data.locale);
  const zh = locale === "zh";
  const isCad = data.requestType.toUpperCase() === "CAD";
  const isDistributor = data.requestType === "Distributor Partnership";
  const requestLabel = isCad ? (zh ? "图纸资料申请" : "Drawing request") : isDistributor ? (zh ? "经销商合作申请" : "Distributor partnership") : data.requestType;
  const pendingFiles = data.attachments.length > 0 && !data.filesReceived;
  const contact = inquiryEmailContact(locale);
  const refLabel = zh ? (isCad || isDistributor ? "申请编号：" : "询盘编号：") : "Reference: ";
  const reference = paragraph(`${refLabel}<strong style="font-weight:600;color:#596679;">${escapeHtml(data.referenceId)}</strong>`, 12, "#7b8594", 8);
  const attachmentNames = data.attachments.map(file => file.name).join("\n");
  const product = Array.from(new Set([data.productName, data.productModel, data.targetModel, data.productType].filter((value): value is string => Boolean(value)))).join("\n");
  const fileRow: Row = { zh: "附件", en: "Attachments", value: attachmentNames };
  const customerRows: Row[] = [
    { zh: "公司名称", en: "Company", value: data.company },
    ...(isDistributor ? [{ zh: "联系人", en: "Contact", value: data.name }] : []),
    { zh: "电子邮箱", en: "Email", value: data.email, email: true },
    ...(isDistributor && data.region ? [{ zh: "国家 / 地区", en: "Country / region", value: data.region }] : []),
    { zh: "需求类型", en: "Request type", value: requestLabel },
    { zh: isDistributor ? "关注产品" : "产品 / 型号", en: isDistributor ? "Products of interest" : "Product / model", value: product },
    ...(data.message ? [{ zh: isDistributor ? "合作需求" : "需求描述", en: isDistributor ? "Partnership details" : "Requirements", value: data.message }] : []),
    ...(data.attachments.length ? [fileRow] : []),
  ];
  let lead: string;
  if (isCad) lead = zh ? "您的图纸资料申请已收到。我们会核对产品与所需资料，并通过邮件与您联系。" : "We have received your drawing request. Our team will review the product and requested documents, then contact you by email.";
  else if (isDistributor) lead = zh ? "感谢您关注 FOREACH 经销商合作。您的申请已收到，我们会查看公司的业务与合作需求，并与您联系。" : "Thank you for your interest in becoming a FOREACH distributor. We have received your application and will review your business and partnership requirements.";
  else if (pendingFiles) lead = zh ? "感谢联系 FOREACH，您的询盘已收到。请将下方列出的原始文件补充发送给我们，以便进一步确认需求。" : "Thank you for contacting FOREACH. We have received your inquiry. Please send the original files listed below so we can review your requirements.";
  else if (data.filesReceived && data.attachments.length) lead = zh ? "感谢联系 FOREACH，您的询盘及附件已收到。我们会结合您提供的资料查看需求并与您联系。" : "Thank you for contacting FOREACH. We have received your inquiry and files. Our team will review the details and contact you.";
  else lead = zh ? "感谢联系 FOREACH，您的询盘已成功提交。我们会查看需求并与您联系。" : "Thank you for contacting FOREACH. We have received your inquiry. Our team will review your requirements and contact you.";
  const followup = isCad
    ? (zh ? "相关图纸资料由团队核对需求后提供。" : "Our team will provide the relevant documents after reviewing your request.")
    : pendingFiles
      ? (zh ? `请将原始文件发送至 ${contact}，并注明${isDistributor ? "申请" : "询盘"}编号 ${data.referenceId}。` : `Please send the original files to ${contact} and include reference ${data.referenceId}.`)
      : (zh ? `如需补充信息，请联系 ${contact}，并注明${isDistributor ? "申请" : "询盘"}编号。` : `For additional details, contact ${contact} and include your reference number.`);
  const title = isCad ? (zh ? "资料申请已收到" : "Request Received") : isDistributor ? (zh ? "合作申请已收到" : "Application Received") : (zh ? "您的询盘已收到" : "Inquiry Received");
  const eyebrow = isCad ? (zh ? "图纸资料申请" : "DRAWING REQUEST") : isDistributor ? (zh ? "经销商合作申请" : "PARTNERSHIP APPLICATION") : (zh ? "询盘提交确认" : "INQUIRY CONFIRMATION");
  const greeting = zh ? "您好：" : "Hello,";
  const heading = isCad || isDistributor ? (zh ? "申请摘要" : "Request summary") : (zh ? "您的需求" : "Your request");
  const body = paragraph(greeting) + paragraph(lead, 15, "#263a59", 10) + reference + table(`<tr><td style="padding-top:24px;padding-bottom:10px;">${paragraph(heading, 13, NAVY)}</td></tr>`, 576) + summary(customerRows, locale) + paragraph(escapeHtml(followup).replace(escapeHtml(contact), emailLink(contact)), 13, "#5e6a79", 20) + paragraph(zh ? "FOREACH 团队" : "The FOREACH Team", 13, "#263a59", 20);
  const confirmation = finish(locale, title, eyebrow, body, `${greeting}\n\n${lead}\n${refLabel}${data.referenceId}\n\n${plainSummary(customerRows, locale)}\n\n${followup}`, `FOREACH | ${title} · ${data.referenceId}`);

  const notificationRows: Row[] = [
    { zh: "姓名", en: "Name", value: data.name },
    { zh: "公司名称", en: "Company", value: data.company },
    { zh: "电子邮箱", en: "Email", value: data.email, email: true },
    { zh: "电话 / WhatsApp", en: "Phone / WhatsApp", value: data.phone },
    { zh: "国家 / 地区", en: "Country / region", value: data.region },
    { zh: "需求类型", en: "Request type", value: requestLabel },
    { zh: "产品类型", en: "Product type", value: data.productType },
    { zh: "目标产品 / 网站 / 型号", en: "Target / website / model", value: data.targetModel },
    { zh: "行业 / 项目阶段", en: "Industry / project stage", value: data.projectStage },
    { zh: "网站语言", en: "Website language", value: data.locale },
    { zh: "产品名称", en: "Product name", value: data.productName },
    { zh: "产品系列", en: "Product series", value: data.productSeries },
    { zh: "产品型号", en: "Product model", value: data.productModel },
    { zh: "当前页面地址", en: "Current URL", value: data.currentUrl },
    { zh: "需求描述", en: "Requirements", value: data.message },
    fileRow,
  ].filter(row => Boolean(row.value));
  const notificationLead = zh ? "收到一条通过 FOREACH 官网提交的新询盘，客户邮箱已验证。" : "A new verified request has been submitted through the FOREACH website.";
  const notificationTitle = isDistributor ? (zh ? "新的经销商合作申请" : "New Partnership Application") : (zh ? "新的官网询盘" : "New Website Inquiry");
  const notification = finish(locale, notificationTitle, zh ? "官网询盘通知" : "INQUIRY NOTIFICATION", paragraph(notificationLead) + reference + table(`<tr><td style="padding-top:24px;">${summary(notificationRows, locale)}</td></tr>`, 576) + (pendingFiles ? paragraph(zh ? "以上仅记录所选文件名，客户仍需补充原始文件。" : "Only the selected file names were recorded. The original files still need to be provided.", 13, "#5e6a79", 20) : ""), `${notificationLead}\n${refLabel}${data.referenceId}\n\n${plainSummary(notificationRows, locale)}${pendingFiles ? (zh ? "\n\n以上仅记录文件名，尚未收到原始文件。" : "\n\nOnly file names were recorded. The original files have not been received.") : ""}`, zh ? `【FOREACH 官网询盘】${data.company} · ${data.requestType}` : `[FOREACH Website Inquiry] ${data.company} · ${data.requestType}`);
  return { notification, confirmation };
}
