import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import ContactInquiryLink from "@/components/contact/ContactInquiryLink";
import { getContactInquiryLocale } from "@/lib/contact-inquiry-target";
import styles from "./BottomCtaButton.module.css";

type BottomCtaButtonProps =
  | ComponentPropsWithoutRef<typeof Link>
  | ComponentPropsWithoutRef<"button">;

/** Shared bottom-banner action; contact links open the common inquiry dialog. */
export default function BottomCtaButton(props: BottomCtaButtonProps) {
  const className = [styles.button, props.className].filter(Boolean).join(" ");

  if ("href" in props) {
    const inquiryLocale = getContactInquiryLocale(props.href);
    if (inquiryLocale) {
      return <ContactInquiryLink {...props} inquiryLocale={inquiryLocale} className={className} data-bottom-cta-button />;
    }
    return <Link {...props} className={className} data-bottom-cta-button />;
  }

  return (
    <button
      type="button"
      {...props}
      className={className}
      data-bottom-cta-button
    />
  );
}
