/* =========================================================
   Breadcrumb.tsx
   恒永达官网｜公共面包屑组件

   文件路径：
   components/common/breadcrumb/Breadcrumb.tsx

   作用：
   1. 统一官网所有页面的面包屑展示
   2. 支持中文 / 多语言文案
   3. 支持最后一项不可点击
   4. 页面只负责传入 breadcrumbs 数据
   5. 组件不负责判断当前路径、不负责翻译

   使用示例：
   <Breadcrumb
     items={[
       { label: "首页", href: "/" },
       { label: "资源中心", href: "/resources" },
       { label: "接头替代查询" },
     ]}
   />
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
}

/* =========================================================
   公共面包屑组件
========================================================= */
export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  if (!items.length) {
    return null;
  }

  return (
    <nav
      className={`${styles.breadcrumb}${className ? ` ${className}` : ""}`}
      aria-label="面包屑导航"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span
            className={styles.item}
            key={`${item.label}-${index}`}
          >
            {item.href && !isLast ? (
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