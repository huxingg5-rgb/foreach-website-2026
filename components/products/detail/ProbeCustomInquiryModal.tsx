"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import CompanyInfoRequestModal, {
  type CompanyInfoFormValue,
} from "@/components/forms/company-info-request/CompanyInfoRequestModal";
import InquiryAttachmentField from "@/components/forms/company-info-request/InquiryAttachmentField";
import { probeLang, probeText } from "@/data/products/detail/probe-guide.intl";

type Props = {
  locale?: string;
  productId: string;
  productName: string;
  drawingFocus: string;
  onClose: () => void;
};

export default function ProbeCustomInquiryModal({ locale = "zh", productId, productName, drawingFocus, onClose }: Props) {
  const t = (text: string) => probeText(text, locale);
  const [files, setFiles] = useState<File[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    const previousPadding = root.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      root.style.paddingRight = `${parseFloat(getComputedStyle(root).paddingRight) + scrollbarWidth}px`;
    }
    containerRef.current?.querySelector<HTMLElement>('[role="dialog"] button')?.focus({ preventScroll: true });

    return () => {
      root.style.overflow = previousOverflow;
      root.style.paddingRight = previousPadding;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
      '[role="dialog"] button, [role="dialog"] input, [role="dialog"] textarea, [role="dialog"] select, [role="dialog"] a[href], [role="dialog"] [tabindex]',
    )).filter((element) => !element.matches(":disabled") && element.tabIndex >= 0 && element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  async function handleSubmit(value: CompanyInfoFormValue) {
    const message = [productName, t("来图定制需求"), value.message.trim()].filter(Boolean).join("\n");
    if (message.length > 4_000) throw new Error(t("定制需求较长，请精简文字，详细要求可作为附件上传。"));
    const submission = new FormData();
    const fields = {
      name: value.name.trim(),
      company: value.company.trim(),
      email: value.email.trim(),
      phone: value.phone.trim(),
      region: value.country.trim(),
      locale: probeLang(locale),
      requestType: t("针系列来图定制询盘"),
      productType: t("针系列"),
      targetModel: productName,
      productName,
      productSeries: productName,
      currentUrl: window.location.href,
      projectStage: t("定制需求确认"),
      message,
    };
    Object.entries(fields).forEach(([key, item]) => submission.append(key, item));
    files.forEach((file) => submission.append("attachments", file, file.name));
    const response = await fetch("/api/inquiry/submit/", {
      method: "POST",
      credentials: "same-origin",
      body: submission,
    });
    const result = (await response.json().catch(() => ({}))) as { success?: boolean; error?: string };
    if (!response.ok || result.success !== true) throw new Error(result.error || "request_failed");
  }

  if (typeof document === "undefined") return null;

  return createPortal(
    <div ref={containerRef} onKeyDown={handleKeyDown} lang={probeLang(locale)}>
      <CompanyInfoRequestModal
        locale={probeLang(locale)}
        isOpen
        title={t("来图定制询盘")}
        description={t("请留下联系方式，可上传图纸或样品照片。我们会结合您的应用确认定制方案。")}
        copyOverrides={{
          summary: t("当前产品已带入询盘。请填写联系信息与定制需求，验证码将发送至您的邮箱。"),
          emailPlaceholder: t("请输入接收定制方案回复的邮箱"),
          notes: t("定制需求"),
          notesPlaceholder: [t("可说明使用场景、样品数量或预计用量。"), drawingFocus, t("暂无图纸时，可先提供样品照片。")].join(" "),
          back: t("返回产品"),
        }}
        items={[{ id: productId, title: productName, metaLines: [t("来图定制 · 结构与参数以确认图纸为准")] }]}
        renderAttachments={(disabled) => <InquiryAttachmentField locale={probeLang(locale)} files={files} disabled={disabled} onChange={setFiles} />}
        emptyTitle={t("未选择定制产品")}
        emptyDescription={t("请返回产品详情页选择需要定制的产品。")}
        submitLabel={t("提交定制询盘")}
        successTitle={t("定制询盘已提交")}
        successDescription={t("我们已收到您的需求，将通过您留下的联系方式确认图纸、样品及交付要求。")}
        analyticsFormId="probe_custom_inquiry_form"
        analyticsFormType="customization_request"
        analyticsSourceSection="product_detail"
        onClose={onClose}
        onSubmitPreview={handleSubmit}
      />
    </div>,
    document.body,
  );
}
