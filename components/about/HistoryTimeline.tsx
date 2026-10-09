import type { HistoryMilestone, SupportedHistoryLocale } from "@/data/historyMilestones";

type HistoryTimelineProps = {
  items: HistoryMilestone[];
  locale: SupportedHistoryLocale;
  ariaLabel: string;
};

// All locales share the same semantic, server-rendered timeline.
export default function HistoryTimeline({ items, locale, ariaLabel }: HistoryTimelineProps) {
  return (
    <section className="about-history-section" aria-label={ariaLabel}>
      <div className="about-history-container">
        <div className="about-history-center-line" aria-hidden="true" />
        {items.map(item => {
          const isReverse = item.imageSide === "right";
          return (
            <article
              key={item.id}
              id={"y" + item.id}
              aria-labelledby={"year-" + item.id}
              className={"about-history-row is-visible" + (isReverse ? " about-history-row--reverse" : "")}
            >
              <div className="about-history-col about-history-col--left">
                {isReverse ? renderText(item, locale) : renderImage(item)}
              </div>
              <div className="about-history-node" aria-hidden="true" />
              <div className="about-history-col about-history-col--right">
                {isReverse ? renderImage(item) : renderText(item, locale)}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function renderImage(item: HistoryMilestone) {
  if (!item.image) return null;
  return (
    <figure className="about-history-image">
      {/* Certificate images retain their intrinsic proportions. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.image} alt={item.imageAlt} width={item.imageWidth} height={item.imageHeight} loading="lazy" decoding="async" draggable={false} className="about-history-image-file" />
      {item.imageCaption && <figcaption>{item.imageCaption}</figcaption>}
    </figure>
  );
}

function renderText(item: HistoryMilestone, locale: SupportedHistoryLocale) {
  return (
    <div className="about-history-text">
      <h2 id={"year-" + item.id} className="about-history-year">{item.year}{locale === "zh-CN" ? "年" : ""}</h2>
      <ul className="about-history-list">
        {item.events.map(event => <li key={event}>{event}</li>)}
      </ul>
    </div>
  );
}
