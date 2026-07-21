/* =========================================================
   app/[locale]/contact/layout.tsx
   多语言联系与合作模块布局文件

   作用：
   1. 让 /en/contact 页面使用 app/contact/contact.css
   2. 让 /en/contact/distributor 页面也使用同一份 contact.css
   3. 经销商合作页面目前先放在英文路径下
========================================================= */

import type { ReactNode } from "react";
import "../../contact/contact.css";

export default function LocaleContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
} 