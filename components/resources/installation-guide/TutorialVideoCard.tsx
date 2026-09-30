"use client";

import type { CSSProperties } from "react";
import Link from "next/link";

import type { InstallationGuideCard } from "@/data/resources/installation-guide/installation-guide.types";

type TutorialVideoCardProps = {
  guide: InstallationGuideCard;
  isSelected?: boolean;
  onSelect: (guide: InstallationGuideCard) => void;
  /**
   * `related` 只提供关联资源模块使用的样式标识；默认卡片的结构和尺寸保持不变。
   */
  variant?: "default" | "related";
};

export default function TutorialVideoCard({
  guide,
  isSelected = false,
  onSelect,
  variant = "default",
}: TutorialVideoCardProps) {
  const imageStyle: CSSProperties | undefined = guide.thumbnail
    ? { backgroundImage: `url(${guide.thumbnail})` }
    : undefined;

  const className = `installation-guide-card ${
    variant === "related" ? "installation-guide-card--related" : ""
  } ${isSelected ? "is-active" : ""}`;
  const content = (
    <>
      <div
        className="installation-guide-card-image"
        data-guide-id={guide.id}
        style={imageStyle}
      >
        <span className="installation-guide-card-play" aria-hidden="true" />
      </div>

      <div className="installation-guide-card-body">
        <h3>{guide.title}</h3>

        {guide.tags.length > 0 ? (
          <div className="installation-guide-card-tags">
            {guide.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );

  if (guide.detailHref) {
    return <Link href={guide.detailHref} className={className}
      style={{ display: "block", color: "inherit", textDecoration: "none" }}>
      {content}
    </Link>;
  }

  return <button type="button" className={className}
    onClick={() => onSelect(guide)} aria-pressed={isSelected}>
    {content}
  </button>;
}
