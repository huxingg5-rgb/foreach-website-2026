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
   5. 当前先用于安装教程页面
   6. 后续规格书、接头替代、产品详情页可以逐步替换

   注意：
   1. 这个组件只负责展示结构
   2. 页面自己传入文案和链接
   3. 中文默认路径不要加 /zh-CN
========================================================= */

import Link from "next/link";
import styles from "./SiteBreadcrumb.module.css";

/* =========================================================
   单个面包屑项目类型

   说明：
   1. label：显示文字
   2. href：如果有 href，并且不是最后一项，则显示为可点击链接
   3. 最后一项永远显示为当前页面，不跳转
========================================================= */
export type SiteBreadcrumbItem = {
  label: string;
  href?: string;
};

type SiteBreadcrumbVariant = "bar" | "inline";

type SiteBreadcrumbProps = {
  /* 面包屑数据 */
  items: SiteBreadcrumbItem[];

  /* 无障碍标签，中文可传“面包屑导航”，英文可传 Breadcrumb */
  ariaLabel?: string;

  /* 显示样式：bar 为整条白底，inline 为内容内轻量样式 */
  variant?: SiteBreadcrumbVariant;

  /* 外部补充 className，方便特殊页面微调 */
  className?: string;
};

export default function SiteBreadcrumb({
  items,
  ariaLabel = "Breadcrumb",
  variant = "bar",
  className = "",
}: SiteBreadcrumbProps) {
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
              {item.href && !isLast ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <strong>{item.label}</strong>
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