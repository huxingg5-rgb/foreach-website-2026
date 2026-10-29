"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, type ComponentPropsWithoutRef } from "react";
import type { LocaleCode } from "@/lib/i18n";
import { trackBeginInquiry } from "@/lib/analytics/track-event";

const GeneralContactInquiryModal = dynamic(() => import("./GeneralContactInquiryModal"), { ssr: false });

type Props = ComponentPropsWithoutRef<typeof Link> & { inquiryLocale: LocaleCode };

export default function ContactInquiryLink({ inquiryLocale, onClick, ...props }: Props) {
  const [session, setSession] = useState<{ open: boolean; hasDraft: boolean } | null>(null);

  return (
    <>
      <Link
        {...props}
        prefetch={false}
        aria-haspopup="dialog"
        aria-expanded={session?.open ?? false}
        onClick={(event) => {
          onClick?.(event);
          // Preserve normal link behavior for new-tab/modified clicks and no-JS fallback.
          if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey ||
              event.shiftKey || event.altKey || (props.target && props.target !== "_self")) return;
          event.preventDefault();
          setSession((current) => ({ open: true, hasDraft: current?.hasDraft ?? false }));
          trackBeginInquiry({
            formId: "contact_inquiry_form", formType: "general_inquiry", sourceSection: "bottom_cta_contact", locale: inquiryLocale,
          });
        }}
      />
      {session && (
        <GeneralContactInquiryModal
          locale={inquiryLocale}
          isOpen={session.open}
          onClose={() => setSession((current) => current?.hasDraft ? { ...current, open: false } : null)}
          onDraftStart={() => setSession((current) => current ? { ...current, hasDraft: true } : current)}
          onComplete={() => setSession(null)}
        />
      )}
    </>
  );
}
