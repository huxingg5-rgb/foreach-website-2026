/* =========================================================
   app/contact/distributor/page.tsx
   中文经销商路径兜底页面

   页面访问路径：
   /contact/distributor

   作用：
   1. 解决从外语经销商页面切换中文时出现 404 的问题
   2. 中文站当前不直接开放经销商合作页面
   3. 用温和提示页形式，引导中文用户返回联系我们页面
   4. 保留英文经销商页面入口

   样式文件：
   app/contact/distributor/distributor-cn.module.css

   图片路径：
   public/images/contact-cooperation/distributor-cn-fallback.webp
========================================================= */

import Image from "next/image";
import Link from "next/link";
import styles from "./distributor-cn.module.css";

/* =========================================================
   中文用户常用入口说明
========================================================= */

const supportCards = [
  {
    title: "产品咨询",
    description:
      "获取泵、阀、管路、连接件、传感器等产品选型支持。",
  },
  {
    title: "资料与图纸申请",
    description:
      "申请产品目录、规格书、图纸、认证资料或 BOM 沟通。",
  },
  {
    title: "技术与样品支持",
    description:
      "提交应用场景、参数要求或样品测试需求，便于我们安排跟进。",
  },
];

export default function ChineseDistributorFallbackPage() {
  return (
    <main className={styles.page}>
      {/* =====================================================
          主视觉提示区
      ===================================================== */}
      <section className={styles.hero}>
        {/* 背景图片层 */}
        <div className={styles.heroImageWrap}>
          <Image
            src="/images/contact-cooperation/distributor-cn-fallback.webp"
            alt="恒永达客户沟通与技术支持"
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>

        {/* 浅色遮罩层，保证左侧文字可读 */}
        <div className={styles.heroMask} />

        <div className={styles.inner}>
          <div className={styles.panel}>

            <h1>该页面暂未开放中文版本</h1>

            <p className={styles.desc}>
              当前经销商合作页面主要面向海外渠道伙伴开放。如您需要产品咨询、
              资料申请、样品测试或技术支持，可返回“联系我们”页面提交需求，
              我们会根据您的应用场景安排跟进。
            </p>

            <div className={styles.actions}>
              <Link href="/contact" className={styles.primaryButton}>
                返回联系我们
              </Link>

              <Link
                href="/en/contact/distributor"
                className={styles.secondaryButton}
              >
                查看英文经销商页面
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          下方引导入口
      ===================================================== */}
      <section className={styles.supportSection}>
        <div className={styles.inner}>
          <div className={styles.supportGrid}>
            {supportCards.map((item) => (
              <article className={styles.supportCard} key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 