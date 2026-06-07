"use client";

/* =========================================================
   ProductBasicCard.tsx
   恒永达官网｜公共产品基础卡片组件

   文件路径：
   components/common/product-card/ProductBasicCard.tsx

   作用：
   1. 提供官网通用的产品卡片结构
   2. 可用于：
      - 接头替代查询产品卡片
      - 产品中心产品卡片
      - 规格书下载卡片
      - 图纸下载卡片
      - 后续选型结果卡片
   3. 卡片内部只负责展示，不绑定具体业务逻辑
   4. 具体按钮点击行为由父组件传入
   5. 样式使用 CSS Module，避免污染详情页和其它页面

   设计原则：
   1. 白底 + 细线
   2. 深蓝文字
   3. hover 顶部荧光线
   4. 不做大圆角
   5. 不做大阴影
   6. 保持 B2B 工业产品页面的克制感

   注意：
   1. 这里暂时使用普通 img，不使用 next/image
   2. 原因是当前接头图片路径来自静态数据，保持和旧页面一致最稳
   3. 后续产品中心统一图片规范后，再整体切换 next/image
========================================================= */

import styles from "./ProductBasicCard.module.css";

/* =========================================================
   卡片参数行类型

   示例：
   商品编码：839041
   恒永达型号：Q2001-PMV-SACN
   兼容编码：A0012 / B0001 / C0001
========================================================= */
export interface ProductBasicCardMetaItem {
  label: string;
  value: string;
}

/* =========================================================
   卡片按钮类型

   说明：
   1. 当前主要使用 button + onClick
   2. 后续如果需要链接，也可以传 href
   3. isActive 用于“已加入清单”等状态
========================================================= */
export interface ProductBasicCardAction {
  label: string;
  href?: string;
  onClick?: () => void;
  isActive?: boolean;
  ariaLabel?: string;
}

/* =========================================================
   公共产品卡片 Props
========================================================= */
export interface ProductBasicCardProps {
  title: string;
  imageSrc?: string;
  imageAlt: string;
  metaItems: ProductBasicCardMetaItem[];
  actions: ProductBasicCardAction[];
  className?: string;
}

/* =========================================================
   公共产品基础卡片组件
========================================================= */
export default function ProductBasicCard({
  title,
  imageSrc,
  imageAlt,
  metaItems,
  actions,
  className,
}: ProductBasicCardProps) {
  const cardClassName = className
    ? `${styles.card} ${className}`
    : styles.card;

  return (
    <article className={cardClassName}>
      {/* 产品图片区域 */}
      <div className={styles.imageBox}>
        {imageSrc ? (
          <img
            className={styles.image}
            src={imageSrc}
            alt={imageAlt}
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className={styles.imagePlaceholder}>暂无图片</div>
        )}
      </div>

      {/* 产品标题 */}
      <h3 className={styles.title}>{title}</h3>

      {/* 产品参数信息 */}
      <dl className={styles.metaList}>
        {metaItems.map((item) => {
          return (
            <div className={styles.metaItem} key={`${item.label}-${item.value}`}>
              <dt>{item.label}</dt>
              <dd title={item.value || "-"}>
                {item.value || "-"}
              </dd>
            </div>
          );
        })}
      </dl>

      {/* 操作按钮区 */}
      <div className={styles.actionRow}>
        {actions.map((action) => {
          const actionClassName = action.isActive
            ? `${styles.actionButton} ${styles.isActive}`
            : styles.actionButton;

          if (action.href) {
            return (
              <a
                className={actionClassName}
                href={action.href}
                key={action.label}
                aria-label={action.ariaLabel || action.label}
              >
                {action.label}
              </a>
            );
          }

          return (
            <button
              className={actionClassName}
              type="button"
              key={action.label}
              onClick={action.onClick}
              aria-label={action.ariaLabel || action.label}
            >
              {action.label}
            </button>
          );
        })}
      </div>
    </article>
  );
} 