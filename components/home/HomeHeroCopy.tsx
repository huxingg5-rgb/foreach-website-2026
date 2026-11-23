import Link from "next/link";
import type { CSSProperties } from "react";

export type HomeHeroCopyText = {
  titleLine1: string;
  titleLine2?: string;
  description: string;
};

type HomeHeroCopyProps = HomeHeroCopyText & {
  heading: "h1" | "h2";
  analyticsSection: string;
  primaryAction?: string;
  primaryClassName?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  alignWith?: { variant: "main" | "tubing"; copy: HomeHeroCopyText };
  className?: string;
  style?: CSSProperties;
  hidden?: boolean;
  inactive?: boolean;
};

export default function HomeHeroCopy({
  heading: Heading,
  analyticsSection,
  primaryAction = "primary_cta",
  primaryClassName = "home-hero-btn home-hero-btn-primary",
  titleLine1,
  titleLine2,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  alignWith,
  className,
  style,
  hidden,
  inactive,
}: HomeHeroCopyProps) {
  const title = <>{titleLine1}{titleLine2 !== undefined ? <><br />{titleLine2}</> : null}</>;
  const variant = alignWith?.variant === "main" ? "tubing" : "main";
  return (
    <div className={`home-hero-inner${className ? ` ${className}` : ""}`} style={style} aria-hidden={hidden} data-home-hero-copy={alignWith?.variant}>
      <Heading className="home-hero-title" data-home-hero-title="true">
        {alignWith ? <>
          <span data-home-hero-copy-text={alignWith.variant}>{title}</span>
          <span data-home-hero-copy-text={variant} aria-hidden="true">
            {alignWith.copy.titleLine1}{alignWith.copy.titleLine2 !== undefined ? <><br />{alignWith.copy.titleLine2}</> : null}
          </span>
        </> : title}
      </Heading>
      <p className="home-hero-subtitle" data-home-hero-subtitle="true">
        {alignWith ? <>
          <span data-home-hero-copy-text={alignWith.variant}>{description}</span>
          <span data-home-hero-copy-text={variant} aria-hidden="true">{alignWith.copy.description}</span>
        </> : description}
      </p>
      <div className="home-hero-actions">
        <Link href={primaryHref} data-analytics-section={analyticsSection} data-analytics-hero-action={primaryAction} className={primaryClassName} tabIndex={inactive ? -1 : undefined}>
          {primaryLabel}
        </Link>
        {secondaryHref && secondaryLabel && <Link href={secondaryHref} data-analytics-section={analyticsSection} data-analytics-hero-action="secondary_cta" className="home-hero-btn home-hero-btn-secondary" tabIndex={inactive ? -1 : undefined}>
          {secondaryLabel}
        </Link>}
      </div>
    </div>
  );
}
