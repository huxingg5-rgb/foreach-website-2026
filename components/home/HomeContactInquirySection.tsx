"use client";

import ContactFormSection from "@/components/contact/ContactFormSection";
import { contactDeData } from "@/data/contact-cooperation/contact.de";
import { contactHiData } from "@/data/contact-cooperation/contact.hi";
import { contactItData } from "@/data/contact-cooperation/contact.it";
import { contactZhData } from "@/data/contact-cooperation/contact.zh";
import { getContactIntlData } from "@/data/contact-cooperation/contact.intl";

import type { ContactPageData } from "@/data/contact-cooperation";
import type { LocaleCode } from "@/lib/i18n";

type HomeContactInquirySectionProps = {
  locale: LocaleCode | "de" | "it" | "hi";
};

function getHomeContactData(locale: LocaleCode | "de" | "it" | "hi"): ContactPageData {
  if (locale === "de") return contactDeData;
  if (locale === "it") return contactItData;
  if (locale === "hi") return contactHiData;
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
        formProps={{
          analyticsFormId: "home_inquiry_form",
          analyticsSourceSection: "home_inquiry_section",
        }}
      />
    </div>
  );
}
