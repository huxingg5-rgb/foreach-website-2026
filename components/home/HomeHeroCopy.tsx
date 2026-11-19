import Link from "next/link";
import type { CSSProperties } from "react";

type HomeHeroCopyProps = {
  heading: "h1" | "h2";
  analyticsSection: string;
  titleLine1: string;
  titleLine2?: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  className?: string;
  style?: CSSProperties;
  hidden?: boolean;
  inactive?: boolean;
};

export default function HomeHeroCopy({
  heading: Heading,
  analyticsSection,
  titleLine1,
  titleLine2,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  className,
  style,
  hidden,
  inactive,
}: HomeHeroCopyProps) {
  return (
    <div className={`home-hero-inner${className ? ` ${className}` : ""}`} style={style} aria-hidden={hidden}>
      <Heading className="home-hero-title" data-home-hero-title="true">
        {titleLine1}
        {titleLine2 !== undefined ? <><br />{titleLine2}</> : null}
      </Heading>
      <p className="home-hero-subtitle" data-home-hero-subtitle="true">{description}</p>
      <div className="home-hero-actions">
        <Link href={primaryHref} data-analytics-section={analyticsSection} data-analytics-hero-action="primary_cta" className="home-hero-btn home-hero-btn-primary" tabIndex={inactive ? -1 : undefined}>
          {primaryLabel}
        </Link>
        <Link href={secondaryHref} data-analytics-section={analyticsSection} data-analytics-hero-action="secondary_cta" className="home-hero-btn home-hero-btn-secondary" tabIndex={inactive ? -1 : undefined}>
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}
