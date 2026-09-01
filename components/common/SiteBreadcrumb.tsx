/* =========================================================
   SiteBreadcrumb.tsx
   恒永达官网｜全站通用面包屑组件

   文件路径：
   components/common/SiteBreadcrumb.tsx

   作用：
   1. 统一官网所有页面的面包屑结构
   2. 避免每个页面重复写 nav / Link / 分隔符
   3. 支持中文页面和多语言页面
   4. 支持两种常用视觉：
      - bar：Banner 下方整条白底面包屑，适合资源中心、关于我们
      - inline：内容容器内轻量面包屑，适合详情页

   注意：
   1. 这个组件只负责展示结构
   2. 页面自己传入文案和链接
   3. 中文默认路径不要加 /zh-CN
========================================================= */

import Link from "next/link";

import styles from "./SiteBreadcrumb.module.css";

export type SiteBreadcrumbItem = {
  label: string;
  href?: string;
};

type SiteBreadcrumbVariant = "bar" | "inline";

type SiteBreadcrumbProps = {
  items: SiteBreadcrumbItem[];
  ariaLabel?: string;
  variant?: SiteBreadcrumbVariant;
  className?: string;
};

function isResourcesRootHref(href?: string) {
  if (!href) {
    return false;
  }

  const [pathname = ""] = href.split(/[?#]/);
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  return /^\/(?:(?:en|es|fr|ko|ru)\/)?resources$/.test(normalizedPath);
}

export default function SiteBreadcrumb({
  items,
  ariaLabel = "Breadcrumb",
  variant = "bar",
  className = "",
}: SiteBreadcrumbProps) {
  if (!items.length) {
    return null;
  }

  return (
    <nav
      className={`${styles.breadcrumb} ${styles[variant]} ${className}`}
      aria-label={ariaLabel}
    >
      <div className={styles.inner}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <span className={styles.item} key={`${item.label}-${index}`}>
              {item.href && !isLast && !isResourcesRootHref(item.href) ? (
                <Link href={item.href}>{item.label}</Link>
              ) : isLast ? (
                <strong>{item.label}</strong>
              ) : (
                <span>{item.label}</span>
              )}

              {!isLast ? (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
    </nav>
  );
}
