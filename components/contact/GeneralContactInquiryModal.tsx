"use client";

import { useMemo } from "react";
import type { ContactInquiryLocale } from "@/lib/contact-inquiry-target";
import { getContactInquiryData } from "@/data/contact-cooperation/inquiry-modal";
import ContactInquiryModal from "./ContactInquiryModal";

type Props = {
  locale: ContactInquiryLocale;
  analyticsSourceSection: string;
  isOpen: boolean;
  onClose: () => void;
  onDraftStart: () => void;
  onComplete: () => void;
};

// Loaded only after a contact CTA is activated, including the form and its data.
export default function GeneralContactInquiryModal({ locale, ...props }: Props) {
  const data = useMemo(() => getContactInquiryData(locale), [locale]);
  return <ContactInquiryModal {...props} locale={locale} data={data} />;
}
