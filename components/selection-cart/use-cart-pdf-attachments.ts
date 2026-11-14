"use client";

import { useEffect, useState } from "react";
import type { SelectionCartItem } from "./selection-cart.types";
import { packageConfigurationPdfs, readPdfAttachment, type GeneratedPdfAttachment } from "@/lib/inquiry/pdf-attachments";
import { assemblyText, assemblyLocale } from "@/data/products/configurator/tubing-assembly.intl";
import { flangedConfigurationValidationError } from "@/data/products/configurator/flanged-tubing-cart";

export function useCartPdfAttachments(items: SelectionCartItem[], enabled: boolean, locale = "zh") {
  const attachments = items.filter(item => item.flangedConfiguration || item.drawingAttachment).map(item => item.drawingAttachment);
  const signature = JSON.stringify({ attachments: enabled ? attachments : [], locale: assemblyLocale(locale) });
  const hasAttachments = enabled && attachments.length > 0;
  const invalid = enabled ? flangedConfigurationValidationError(items.flatMap(item => item.flangedConfiguration ? [item.flangedConfiguration] : []), locale) : null;
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{ signature: string; files?: File[]; error?: string }>({ signature: "" });
  useEffect(() => {
    if (!enabled || !hasAttachments || invalid) return;
    let current = true;
    (async () => {
      const unique = new Map<string, GeneratedPdfAttachment>();
      for (const attachment of JSON.parse(signature).attachments as (GeneratedPdfAttachment | null)[]) {
        if (!attachment) throw new Error("配置图纸附件缺失，请返回对应配置重新加入清单。");
        unique.set(attachment.key, attachment);
      }
      const files: File[] = [];
      for (const attachment of unique.values()) files.push(await readPdfAttachment(attachment));
      const title = assemblyText("FOREACH 管组件配置图纸包", locale);
      return packageConfigurationPdfs(files, { title, filename: `${title}-${files.length}.pdf` });
    })().then(
      files => { if (current) setState({ signature, files }); },
      cause => { if (current) setState({ signature, error: assemblyText(cause instanceof Error ? cause.message : "配置图纸读取失败，请重试。", locale) }); },
    );
    return () => { current = false; };
  }, [enabled, hasAttachments, signature, attempt, invalid, locale]);
  const files = invalid ? undefined : !hasAttachments ? [] : state.signature === signature ? state.files : undefined;
  const error = invalid || (hasAttachments && state.signature === signature ? state.error : undefined);
  return { files, error, pending: hasAttachments && !files && !error, blocked: hasAttachments && !files,
    retry: () => { setState({ signature: "" }); setAttempt(value => value + 1); } };
}
