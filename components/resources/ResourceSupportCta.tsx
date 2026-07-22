/* =========================================================
   ResourceSupportCta.tsx
   恒永达官网｜资源中心通用支持 CTA 组件

   文件路径：
   components/resources/ResourceSupportCta.tsx

   作用：
   1. 封装资源中心页面通用底部支持 Banner
   2. 只复用视觉样式：背景、文字大小、按钮样式、整体排版
   3. 不写死具体页面文案
   4. 规格书、安装教程、材料兼容、常见问题等页面都可以复用
========================================================= */

import Link from "next/link";
import styles from "./ResourceSupportCta.module.css";

type ResourceSupportCtaProps = {
  /* 顶部小字，例如 NEED SUPPORT，可不传 */
  kicker?: string;

  /* 主标题，由页面传入 */
  title: string;

  /* 描述文字，由页面传入 */
  description: string;

  /* 按钮文字，由页面传入 */
  buttonText: string;

  /* 按钮跳转地址 */
  href: string;
};

export default function ResourceSupportCta({
  kicker,
  title,
  description,
  buttonText,
  href,
}: ResourceSupportCtaProps) {
  return (
    <section className={styles.resourceSupportCta}>
      <div className={styles.inner}>
        <div className={styles.content}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}

          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <Link className={styles.button} href={href}>
          {buttonText}
        </Link>
      </div>
    </section>
  );
} 