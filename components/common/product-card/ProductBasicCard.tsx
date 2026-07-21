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

"use client";

import type {
  ElementType,
  MouseEventHandler,
  ReactNode,
} from "react";

import styles from "./ProductBasicCard.module.css";

export type ProductBasicCardMetaItem = {
  label?: ReactNode;
  value?: ReactNode;
  text?: ReactNode;
  children?: ReactNode;
};

export type ProductBasicCardAction = {
  label: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "ghost";
  active?: boolean;
  isActive?: boolean;
  disabled?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  className?: string;
};

export type ProductBasicCardProps = {
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  summary?: ReactNode;
  eyebrow?: ReactNode;

  imageSrc?: string;
  image?: string;
  imageAlt?: string;
  alt?: string;

  href?: string;
  detailHref?: string;

  meta?: ProductBasicCardMetaItem[];
  metas?: ProductBasicCardMetaItem[];
  metaItems?: ProductBasicCardMetaItem[];

  tags?: ReactNode[];
  badges?: ReactNode[];
  badgeItems?: ReactNode[];

  actions?: ProductBasicCardAction[];
  primaryAction?: ProductBasicCardAction;
  secondaryAction?: ProductBasicCardAction;

  renderVisual?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;

  className?: string;
  imageClassName?: string;
  visualClassName?: string;
  bodyClassName?: string;

  isActive?: boolean;
  selected?: boolean;

  titleAs?: ElementType;
  onClick?: MouseEventHandler<HTMLElement>;
};

function cx(...items: Array<string | false | null | undefined>) {
  return items.filter(Boolean).join(" ");
}

function getActionClassName(action: ProductBasicCardAction, index: number) {
  const isPrimary = action.variant === "primary";
  const isGhost = action.variant === "ghost";
  const isActive = action.active || action.isActive;

  return cx(
    styles.action,
    isPrimary ? styles.actionPrimary : styles.actionSecondary,
    isGhost && styles.actionGhost,
    isActive && styles.active,
    action.className
  );
}

function renderAction(action: ProductBasicCardAction, index: number) {
  const actionClassName = getActionClassName(action, index);
  const rel =
    action.rel ??
    (action.target === "_blank" ? "noopener noreferrer" : undefined);

  if (action.href) {
    return (
      <a
        key={index}
        className={actionClassName}
        href={action.disabled ? undefined : action.href}
        target={action.target}
        rel={rel}
        aria-label={action.ariaLabel}
        aria-disabled={action.disabled || undefined}
        tabIndex={action.disabled ? -1 : undefined}
        onClick={
          action.onClick as MouseEventHandler<HTMLAnchorElement> | undefined
        }
      >
        {action.label}
      </a>
    );
  }

  return (
    <button
      key={index}
      className={actionClassName}
      type={action.type ?? "button"}
      disabled={action.disabled}
      aria-label={action.ariaLabel}
      onClick={
        action.onClick as MouseEventHandler<HTMLButtonElement> | undefined
      }
    >
      {action.label}
    </button>
  );
}

export default function ProductBasicCard({
  title,
  subtitle,
  description,
  summary,
  eyebrow,

  imageSrc,
  image,
  imageAlt,
  alt,

  href,
  detailHref,

  meta,
  metas,
  metaItems,

  tags,
  badges,
  badgeItems,

  actions,
  primaryAction,
  secondaryAction,

  renderVisual,
  children,
  footer,

  className,
  imageClassName,
  visualClassName,
  bodyClassName,

  isActive,
  selected,

  titleAs,
  onClick,
}: ProductBasicCardProps) {
  const TitleTag = titleAs ?? "h3";

  const imageValue = imageSrc ?? image;
  const titleText = typeof title === "string" ? title : "产品图片";
  const finalImageAlt = imageAlt ?? alt ?? titleText;

  const finalMeta = meta ?? metas ?? metaItems ?? [];
  const finalTags = tags ?? badges ?? badgeItems ?? [];

  const finalActions =
    actions ??
    [primaryAction, secondaryAction].filter(
      Boolean
    ) as ProductBasicCardAction[];

  const descriptionNode = description ?? summary;
  const finalHref = href ?? detailHref;

  return (
    <article
      className={cx(
        styles.card,
        (isActive || selected) && styles.isActive,
        className
      )}
      onClick={onClick}
    >
      <span className={styles.selectedBar} />

      <div
        className={cx(styles.image, imageClassName)}
        aria-label={finalImageAlt}
      >
        <div className={cx(styles.productVisual, visualClassName)}>
          {renderVisual ? (
            renderVisual
          ) : imageValue ? (
            <img
              className={styles.imageElement}
              src={imageValue}
              alt={finalImageAlt}
              loading="lazy"
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>{titleText}</span>
            </div>
          )}
        </div>
      </div>

      <div className={cx(styles.body, bodyClassName)}>
        {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}

        {finalHref ? (
          <a className={styles.titleLink} href={finalHref}>
            <TitleTag className={styles.title}>{title}</TitleTag>
          </a>
        ) : (
          <TitleTag className={styles.title}>{title}</TitleTag>
        )}

        {subtitle ? <div className={styles.subtitle}>{subtitle}</div> : null}

        {descriptionNode ? (
          <div className={styles.description}>{descriptionNode}</div>
        ) : null}

        {finalMeta.length > 0 ? (
          <div className={styles.metaList}>
            {finalMeta.map((item, index) => {
              const value = item.value ?? item.text ?? item.children;

              return (
                <div className={styles.metaItem} key={index}>
                  {item.label ? (
                    <span className={styles.metaLabel}>{item.label}</span>
                  ) : null}
                  <span className={styles.metaValue}>{value}</span>
                </div>
              );
            })}
          </div>
        ) : null}

        {finalTags.length > 0 ? (
          <div className={styles.tags}>
            {finalTags.map((tag, index) => (
              <span className={styles.tag} key={index}>
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        {children ? <div className={styles.children}>{children}</div> : null}

        {finalActions.length > 0 ? (
          <div className={styles.actions}>
            {finalActions.map((action, index) => renderAction(action, index))}
          </div>
        ) : null}

        {footer ? <div className={styles.footer}>{footer}</div> : null}
      </div>
    </article>
  );
}
