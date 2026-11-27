"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, type ComponentPropsWithoutRef } from "react";
import type { ContactInquiryLocale } from "@/lib/contact-inquiry-target";
import { getAnalyticsSourceSection, trackBeginInquiry } from "@/lib/analytics/track-event";

const GeneralContactInquiryModal = dynamic(() => import("./GeneralContactInquiryModal"), { ssr: false });

type Props = ComponentPropsWithoutRef<typeof Link> & { inquiryLocale: ContactInquiryLocale; analyticsSourceSection?: string };

export default function ContactInquiryLink({ inquiryLocale, analyticsSourceSection, onClick, ...props }: Props) {
  const [session, setSession] = useState<{ open: boolean; hasDraft: boolean; sourceSection: string } | null>(null);

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
          if (session?.open) return;
          const sourceSection = session?.sourceSection
            ?? analyticsSourceSection
            ?? getAnalyticsSourceSection(event.currentTarget);
          setSession({ open: true, hasDraft: session?.hasDraft ?? false, sourceSection });
          if (!session) {
            trackBeginInquiry({
              formId: "contact_inquiry_form", formType: "general_inquiry", sourceSection, locale: inquiryLocale,
            });
          }
        }}
      />
      {session && (
        <GeneralContactInquiryModal
          locale={inquiryLocale}
          analyticsSourceSection={session.sourceSection}
          isOpen={session.open}
          onClose={() => setSession((current) => current?.hasDraft ? { ...current, open: false } : null)}
          onDraftStart={() => setSession((current) => current ? { ...current, hasDraft: true } : current)}
          onComplete={() => setSession(null)}
        />
      )}
    </>
  );
}
