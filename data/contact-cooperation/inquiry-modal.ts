import type { LocaleCode } from "@/lib/i18n";
import { contactZhData } from "./contact.zh";
import { getContactIntlData } from "./contact.intl";
import { inquiryModalCopy } from "./inquiry-modal.copy";

/** The existing FAQ form contract, shared without changing its fields or options. */
export function getContactInquiryData(locale: LocaleCode) {
  const source = locale === "zh-CN" ? contactZhData : getContactIntlData(locale);
  const copy = inquiryModalCopy[locale];
  return {
    ...source,
    form: {
      ...source.form,
      fields: {
        ...source.form.fields,
        message: { label: copy.messageLabel, placeholder: copy.messagePlaceholder },
      },
    },
  };
}
