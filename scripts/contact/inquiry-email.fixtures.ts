import { buildInquiryEmails, buildVerificationEmail, type InquiryEmailData, type InquiryEmail } from "../../lib/email/inquiry-email";

export function inquiryFixture(locale = "zh-CN"): InquiryEmailData {
  const zh = locale.startsWith("zh");
  return {
    locale, referenceId: "C83F0445E01", name: zh ? "陈" : "Chen",
    company: zh ? "示例分析仪器有限公司" : "Example Instruments Co., Ltd.",
    email: "engineer@example.com", phone: "+86 138 0000 0000", region: zh ? "中国" : "China",
    requestType: zh ? "产品咨询与询价" : "Product inquiry & quotation",
    productType: zh ? "移液泵、管组件" : "Pipetting pumps and tubing assemblies",
    productName: zh ? "EA-250 · PMMA × 2 套\n管组件搭配方案 × 1 组" : "EA-250 · PMMA × 2 sets\nTubing assembly configuration × 1 set",
    projectStage: zh ? "选型评估" : "Selection & evaluation",
    message: zh ? "用于分析仪样机选型，请协助确认配置、价格与交期，并提供相关图纸。" : "For instrument prototype evaluation. Please confirm configuration, pricing and lead time, and provide the relevant drawings.",
    attachments: [], filesReceived: false,
  };
}

export function inquiryEmailFixtures(): { id: string; lang: "zh" | "en"; email: InquiryEmail }[] {
  return (["zh", "en"] as const).flatMap(lang => {
    const zh = lang === "zh";
    const plain = inquiryFixture(zh ? "zh-CN" : "en");
    const withFiles = { ...plain, attachments: [{ name: zh ? "选型配置清单.pdf" : "Configuration-list.pdf" }, { name: zh ? "液路安装要求.pdf" : "Tubing-requirements.pdf" }] };
    const cad = { ...plain, name: "", requestType: "CAD", productName: "EA-250", productModel: "EA-250 · PMMA", message: zh ? "申请 2D 尺寸图及 3D CAD 模型，用于样机结构设计。" : "Please provide the 2D dimensional drawing and 3D CAD model for prototype mechanical design." };
    const distributor = { ...plain, requestType: "Distributor Partnership", productType: zh ? "微型泵、阀及流体连接件" : "Miniature pumps, valves and fluidic fittings", productName: "", message: zh ? "面向分析仪器行业，希望了解产品范围、经销合作条件及技术支持方式。" : "Serving analytical instrument customers. Please share your product range, distributor terms and available technical support." };
    return [
      { id: "verification", lang, email: buildVerificationEmail("482931", plain.locale) },
      { id: "inquiry", lang, email: buildInquiryEmails(plain).confirmation },
      { id: "inquiry-files", lang, email: buildInquiryEmails({ ...withFiles, filesReceived: true }).confirmation },
      { id: "inquiry-pending", lang, email: buildInquiryEmails(withFiles).confirmation },
      { id: "cad", lang, email: buildInquiryEmails(cad).confirmation },
      { id: "distributor", lang, email: buildInquiryEmails(distributor).confirmation },
      { id: "internal", lang, email: buildInquiryEmails({ ...withFiles, filesReceived: true }).notification },
    ];
  });
}
