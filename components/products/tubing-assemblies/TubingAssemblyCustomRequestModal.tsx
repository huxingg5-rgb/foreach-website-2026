"use client";

import { useState } from "react";
import InquiryAttachmentField from "@/components/forms/company-info-request/InquiryAttachmentField";
import CompanyInfoRequestModal, {
  type CompanyInfoFormValue,
} from "@/components/forms/company-info-request/CompanyInfoRequestModal";
import type { TubingCustomizationCopy } from "@/data/products/tubing-assemblies/localized";

interface TubingAssemblyCustomRequestModalProps {
  locale: string;
  copyOverride?: TubingCustomizationCopy;
  productId: string;
  productName: string;
  quantity: number;
  onClose: () => void;
}

export default function TubingAssemblyCustomRequestModal({
  locale,
  copyOverride,
  productId,
  productName,
  quantity,
  onClose,
}: TubingAssemblyCustomRequestModalProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const isChinese = locale === "zh-CN";
  const fallbackCopy: TubingCustomizationCopy = isChinese
    ? {
        title: "定制申请",
        description: "请留下联系信息及简单的定制需求，我们会与您联系确认。",
        summary: "确认申请产品并填写联系信息，验证码将发送至您的邮箱。",
        emailPlaceholder: "请输入联系邮箱",
        notes: "定制需求",
        notesPlaceholder: "可简单说明管径、长度、连接方式或其他需求。",
        back: "返回",
        submit: "提交定制申请",
        successTitle: "定制申请已提交",
        successDescription: "我们会根据您填写的信息与您联系，确认具体定制需求。",
        emptyTitle: "未选择申请产品",
        emptyDescription: "请返回产品详情页选择需要定制的管组件。",
        productType: "管组件",
        quantity: "数量",
        projectStage: "定制需求确认",
        requestType: "管组件定制申请",
      }
    : {
        title: "Customization Request",
        description: "Leave your contact details and a brief description of your requirements.",
        summary: "Confirm the product and enter your contact details. A verification code will be sent to your email.",
        emailPlaceholder: "Your contact email",
        notes: "Customization Requirements",
        notesPlaceholder: "Briefly describe tubing dimensions, length, connections, or other requirements.",
        back: "Back",
        submit: "Submit Customization Request",
        successTitle: "Customization Request Submitted",
        successDescription: "Our team will contact you to confirm your customization requirements.",
        emptyTitle: "No product selected",
        emptyDescription: "Return to the product page and select a tubing assembly.",
        productType: "Tubing Assemblies",
        quantity: "Quantity",
        projectStage: "Customization Review",
        requestType: "Tubing Assembly Customization Request",
      };
  const copy = copyOverride ?? fallbackCopy;

  async function handleSubmit(formValue: CompanyInfoFormValue) {
    const submission = new FormData();
    const fields = {
        name: formValue.name.trim(),
        company: formValue.company.trim(),
        email: formValue.email.trim(),
        phone: formValue.phone.trim(),
        region: formValue.country.trim(),
        requestType: "Tubing Assembly Customization Request",
        productType: copy.productType,
        targetModel: productName.slice(0, 200),
        productName,
        productModel: productName,
        currentUrl: window.location.href,
        projectStage: copy.projectStage,
        message: [
          productName,
          `${copy.quantity}: ${quantity}`,
          formValue.message.trim(),
        ].filter(Boolean).join("\n"),
        locale,
    };
    Object.entries(fields).forEach(([key, value]) => submission.append(key, value));
    selectedFiles.forEach((file) => submission.append("attachments", file, file.name));
    const response = await fetch("/api/inquiry/submit/", {
      method: "POST",
      credentials: "same-origin",
      body: submission,
    });
    const result = (await response.json().catch(() => ({}))) as {
      success?: boolean;
      error?: string;
    };
    if (!response.ok || result.success !== true) {
      throw new Error(result.error || "request_failed");
    }
  }

  return (
    <CompanyInfoRequestModal
      locale={locale}
      isOpen
      title={copy.title}
      description={copy.description}
      copyOverrides={copy}
      renderAttachments={(disabled) => (
        <InquiryAttachmentField
          locale={locale}
          files={selectedFiles}
          disabled={disabled}
          onChange={setSelectedFiles}
        />
      )}
      items={productName ? [{
        id: productId,
        title: productName,
        metaLines: [copy.productType, `${copy.quantity}: ${quantity}`],
      }] : []}
      emptyTitle={copy.emptyTitle}
      emptyDescription={copy.emptyDescription}
      submitLabel={copy.submit}
      successTitle={copy.successTitle}
      successDescription={copy.successDescription}
      analyticsFormId="tubing_assembly_custom_request_form"
      analyticsFormType="customization_request"
      analyticsSourceSection="product_detail"
      onClose={onClose}
      onSubmitPreview={handleSubmit}
    />
  );
}
