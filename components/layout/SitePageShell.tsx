/* =========================================================
   SitePageShell.tsx
   恒永达官网｜无 Banner 页面公共框架

   当前接入：
   1. 产品中心
   2. 产品详情页

   后续新建的无 Banner 页面可继续复用。
   之前已经完成的其他页面暂不修改。
========================================================= */

import type { ReactNode } from "react";

import SiteBreadcrumb, {
  type SiteBreadcrumbItem,
} from "@/components/common/SiteBreadcrumb";

import styles from "./SitePageShell.module.css";

type SitePageShellProps = {
  children: ReactNode;
  breadcrumbItems: SiteBreadcrumbItem[];
  breadcrumbAriaLabel?: string;
  className?: string;
};

export default function SitePageShell({
  children,
  breadcrumbItems,
  breadcrumbAriaLabel = "Breadcrumb",
  className = "",
}: SitePageShellProps) {
  return (
    <div
      className={[styles.shell, className]
        .filter(Boolean)
        .join(" ")}
    >
      <SiteBreadcrumb
        items={breadcrumbItems}
        ariaLabel={breadcrumbAriaLabel}
        variant="bar"
        className={styles.shellBreadcrumb}
      />

      <div className={styles.content}>{children}</div>
    </div>
  );
}