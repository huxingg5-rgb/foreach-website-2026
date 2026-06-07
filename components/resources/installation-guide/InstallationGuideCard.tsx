/* =========================================================
   InstallationGuideCard.tsx
   恒永达官网｜安装教程卡片组件

   文件路径：
   components/resources/installation-guide/InstallationGuideCard.tsx

   作用：
   1. 封装安装教程列表页中的单个卡片
   2. 让 InstallationGuideClient.tsx 不再直接写卡片 JSX
   3. 后续如果要调整卡片样式、封面图、标签显示，只改这个组件
   4. 点击卡片后跳转到独立详情页，不再使用弹窗

   说明：
   1. href 由父组件传入，方便中文 / 多语言路径统一处理
   2. categoryName 由父组件传入，避免组件自己去查分类树
   3. productCategoryLabel / tagsLabel 由父组件传入，方便后续多语言
========================================================= */

import Link from "next/link";
import type { CSSProperties } from "react";

import type { InstallationGuideCard as InstallationGuideCardData } from "@/data/resources/installation-guide/installation-guide.types";

type InstallationGuideCardProps = {
  /* 教程卡片数据 */
  guide: InstallationGuideCardData;

  /* 详情页链接，例如 /resources/installation-guide/xxx */
  href: string;

  /* 产品分类显示名称，例如 柱塞泵 / Plunger Pumps */
  categoryName: string;

  /* “产品分类：”文案，方便多语言 */
  productCategoryLabel: string;

  /* “标签：”文案，方便多语言 */
  tagsLabel: string;
};

export default function InstallationGuideCard({
  guide,
  href,
  categoryName,
  productCategoryLabel,
  tagsLabel,
}: InstallationGuideCardProps) {
  /* =========================================================
     卡片主图样式
     说明：
     1. 如果数据里有 thumbnail，就显示真实封面图
     2. 如果没有 thumbnail，则使用 CSS 里的默认占位背景
     3. 后期每个教程补真实封面图时，只改 data 文件
  ========================================================= */
  const imageStyle: CSSProperties | undefined = guide.thumbnail
    ? {
        backgroundImage: `url(${guide.thumbnail})`,
      }
    : undefined;

  return (
    <Link className="installation-guide-card" href={href}>
      <div className="installation-guide-card-image" style={imageStyle} />

      <div className="installation-guide-card-body">
        <h3>{guide.title}</h3>

        <div className="installation-guide-card-info">
          <div>
            <strong>{productCategoryLabel}</strong>
            <b>{categoryName}</b>
          </div>

          <div>
            <strong>{tagsLabel}</strong>

            <span className="installation-guide-tags">
              {guide.tags.map((tag: string) => (
                <span key={tag}>{tag}</span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 