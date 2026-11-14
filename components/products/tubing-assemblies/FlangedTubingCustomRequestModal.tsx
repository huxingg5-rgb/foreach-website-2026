"use client";

import { useMemo, useState } from "react";
import CompanyInfoRequestModal, { type CompanyInfoFormValue } from "@/components/forms/company-info-request/CompanyInfoRequestModal";
import InquiryAttachmentField from "@/components/forms/company-info-request/InquiryAttachmentField";
import { flangedTubingSummary } from "@/data/products/configurator/flanged-tubing";
import type { FlangedConfiguration } from "@/data/products/configurator/flanged-tubing-configurations";
import styles from "./FlangedTubingWorkspace.module.css";
import ConfigurationPdfAttachments, { useFlangedPdfAttachment } from "./ConfigurationPdfAttachments";
import { appendInquiryAttachments, readPdfAttachment } from "@/lib/inquiry/pdf-attachments";

export default function FlangedTubingCustomRequestModal({ record, onClose }: { record: FlangedConfiguration; onClose: () => void }) {
  const [files, setFiles] = useState<File[]>([]), [quantity, setQuantity] = useState("1"), [customerPart, setCustomerPart] = useState(record.choice.customerPart || "");
  const requestRecord = useMemo(() => ({ ...record, choice: { ...record.choice, customerPart: customerPart.trim() } }), [record, customerPart]);
  const pdf = useFlangedPdfAttachment(requestRecord);
  const summary = `${record.name} / R${record.revision}\n${flangedTubingSummary(requestRecord.choice)}`;
  async function submit(value: CompanyInfoFormValue) {
    if (!Number.isSafeInteger(Number(quantity)) || Number(quantity) < 1) throw new Error("请填写大于 0 的整数数量。");
    if (!pdf.attachment) throw new Error(pdf.error || "配置图纸尚未准备完成，请稍后重试。");
    const attachment = await readPdfAttachment(pdf.attachment);
    const form = new FormData();
    const fields = { name: value.name.trim(), company: value.company.trim(), email: value.email.trim(), phone: value.phone.trim(), region: value.country.trim(),
      locale: "zh-CN", requestType: "Tubing Assembly Customization Request", productType: "翻边管组件", targetModel: `${record.name} R${record.revision}`, productName: "FEP 翻边管组件",
      productModel: `${record.name} R${record.revision}`, currentUrl: window.location.href, projectStage: "管组件配置与图纸工程确认",
      message: [summary, `配置标识：${record.id}`, `申请数量：${quantity}`, `客户零件号：${customerPart.trim() || "未填写"}`, `配置 PDF 附件：${attachment.name}；SHA-256：${pdf.attachment.sha256}`, "图纸依据：所提供的 FL/FL6 管组件选型表，物料编码与工程签核由工程确认。", value.message.trim()].filter(Boolean).join("\n") };
    Object.entries(fields).forEach(([key, item]) => form.append(key, item)); appendInquiryAttachments(form, [attachment], files);
    const response = await fetch("/api/inquiry/submit/", { method: "POST", credentials: "same-origin", body: form });
    const result = await response.json().catch(() => ({})); if (!response.ok || result.success !== true) throw new Error(result.error || "request_failed");
  }
  return <CompanyInfoRequestModal locale="zh-CN" isOpen title="管组件配置定制申请" description={`按已保存的 ${record.name} · R${record.revision} 提交，配置与版本将随需求一起发送。`}
    copyOverrides={{ summary: "核对管组件配置、数量与客户零件号，再填写联系信息。", back: "返回配置", notes: "补充技术要求", notesPlaceholder: "测量基准、安装位置、介质、验收或样品需求。" }}
    items={[{ id: record.id, title: `${record.name} · R${record.revision}`, metaLines: ["FEP 翻边管组件", `长度 ${record.choice.length} mm`] }]}
    submissionBlocked={!pdf.attachment}
    renderAttachments={disabled => <div className={styles.requestConfiguration}><div className={styles.requestFields}><label>申请数量<input aria-label="管组件申请数量" type="number" min="1" step="1" value={quantity} disabled={disabled} onChange={event => setQuantity(event.target.value)} /></label><label>客户零件号<input aria-label="管组件客户零件号" maxLength={120} value={customerPart} disabled={disabled} onChange={event => setCustomerPart(event.target.value)} /></label></div><details><summary>查看本次申请的配置快照</summary><pre>{summary}</pre></details><ConfigurationPdfAttachments entries={pdf.attachment ? [{ record: requestRecord, attachment: pdf.attachment }] : []} pending={pdf.pending} error={pdf.error} onRetry={pdf.retry} disabled={disabled} /><InquiryAttachmentField locale="zh-CN" files={files} reservedFiles={[{ size: pdf.attachment?.size || 0 }]} disabled={disabled} onChange={setFiles} /></div>}
    emptyTitle="未选择管组件配置" emptyDescription="请先保存管组件配置。" submitLabel="提交管组件定制申请" successTitle="管组件定制申请已提交" successDescription="我们会按配置版本与您确认正式图纸、配套和交付要求。"
    analyticsFormId="flanged_tubing_configuration_request" analyticsFormType="customization_request" analyticsSourceSection="flanged_tubing_workspace" onClose={onClose} onSubmitPreview={submit} />;
}
