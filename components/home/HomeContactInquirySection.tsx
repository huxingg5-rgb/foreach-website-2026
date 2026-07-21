"use client";

import ContactFormSection from "@/components/contact/ContactFormSection";
import { contactZhData } from "@/data/contact-cooperation/contact.zh";
import { getContactIntlData } from "@/data/contact-cooperation/contact.intl";

import type { ContactPageData } from "@/data/contact-cooperation";
import type { LocaleCode } from "@/lib/i18n";

type HomeContactInquirySectionProps = {
  locale: LocaleCode;
};

function getHomeContactData(locale: LocaleCode): ContactPageData {
  if (locale === "zh-CN") {
    return contactZhData;
  }

  return getContactIntlData(locale) || contactZhData;
}

export default function HomeContactInquirySection({
  locale,
}: HomeContactInquirySectionProps) {
  const data = getHomeContactData(locale);

  return (
    <div className="contact-page home-contact-inquiry-wrapper" id="contact">
      <ContactFormSection
        data={data}
        id="form"
        className="home-contact-inquiry-form-section"
      />
    </div>
  );
}
