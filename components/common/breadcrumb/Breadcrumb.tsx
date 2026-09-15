/* =========================================================
   Breadcrumb.tsx
   恒永达官网｜公共面包屑组件

   文件路径：
   components/common/breadcrumb/Breadcrumb.tsx

   作用：
   1. 统一官网部分页面的面包屑展示
   2. 支持最后一项不可点击
   3. 页面只负责传入 items 数据
========================================================= */

import Link from "next/link";

import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  ariaLabel?: string;
}

function isResourcesRootHref(href?: string) {
  if (!href) {
    return false;
  }

  const [pathname = ""] = href.split(/[?#]/);
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  return /^\/(?:(?:en|es|fr|ko|ru)\/)?resources$/.test(normalizedPath);
}

export default function Breadcrumb({
  items,
  className,
  ariaLabel = "面包屑导航",
}: BreadcrumbProps) {
  if (!items.length) {
    return null;
  }

  return (
    <nav
      className={`${styles.breadcrumb}${className ? ` ${className}` : ""}`}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span
            className={styles.item}
            key={`${item.label}-${index}`}
          >
            {item.href && !isLast && !isResourcesRootHref(item.href) ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
