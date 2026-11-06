"use client";

/* =========================================================
   ExhibitionBookingLink.tsx
   恒永达官网｜点击打开「预约现场洽谈」弹窗的链接（顶部公告条“立即预约”在用）

   说明：
   1. 用法与 ContactInquiryLink 一样：普通 <Link> + 点击打开弹窗
   2. 新标签 / Ctrl·⌘ 点击 / 无 JS 时，仍按 href 正常跳转（兜底链接）
   3. 弹窗点击后才加载（next/dynamic），已填写内容时关闭会保留草稿
========================================================= */

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, type ComponentPropsWithoutRef } from "react";
import type { LocaleCode } from "@/lib/i18n";

const ExhibitionBookingDialog = dynamic(() => import("./ExhibitionBookingDialog"), { ssr: false });

type Props = ComponentPropsWithoutRef<typeof Link> & {
  bookingLocale: LocaleCode;
  /** 统计来源，默认顶部公告条 */
  sourceSection?: string;
};

export default function ExhibitionBookingLink({ bookingLocale, sourceSection, onClick, ...props }: Props) {
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
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            (props.target && props.target !== "_self")
          ) {
            return;
          }
          event.preventDefault();
          setSession((current) => ({ open: true, hasDraft: current?.hasDraft ?? false }));
        }}
      />
      {session && (
        <ExhibitionBookingDialog
          locale={bookingLocale}
          sourceSection={sourceSection}
          isOpen={session.open}
          onClose={() => setSession((current) => (current?.hasDraft ? { ...current, open: false } : null))}
          onDraftStart={() => setSession((current) => (current ? { ...current, hasDraft: true } : current))}
          onComplete={() => setSession(null)}
        />
      )}
    </>
  );
}
