import { isSyringePumpInquiryFamily } from "@/data/products/detail/syringe-pump-ordering";
import { instrumentDetailProfiles, getInstrumentGuideSectionSource } from "@/data/products/detail/instrument-detail-content.zh";
import { getCompactInstrumentGuideUi } from "@/data/products/detail/compact-instrument-guide-ui.intl";
import type { GuideSection, InstrumentProductGuide } from "@/data/products/detail/instrument-product-guides.zh";
import InstrumentGuideVisual, { isNativeInstrumentFigure } from "./InstrumentGuideVisual";
import { GuideBlock } from "./InstrumentGuideBlock";
import SyringePumpModelCode from "./SyringePumpModelCode";
import base from "./EaPumpDetailContent.module.css";
import styles from "./CompactInstrumentGuide.module.css";

function SelectionBlock({ guide, section, number, heading, columns, locale }: {
  guide: InstrumentProductGuide;
  section: GuideSection;
  number: string;
  heading?: "h2";
  columns?: readonly [string, string];
  locale: string;
}) {
  const content = locale === "zh" || locale === "zh-CN" ? getInstrumentGuideSectionSource(guide, section) : section;
  const useNativeVisual = content.figure && isNativeInstrumentFigure(content.figure.file);
  return <GuideBlock section={useNativeVisual ? { ...content, figure: undefined } : content} number={number} heading={heading} columns={columns} locale={locale}>
    {useNativeVisual && <InstrumentGuideVisual family={guide.family} section={section.id} model={guide.model} locale={locale} />}
  </GuideBlock>;
}

export default function InstrumentSelectionGuideContent({ guide, locale = "zh" }: { guide: InstrumentProductGuide; locale?: string }) {
  const profile = instrumentDetailProfiles[guide.family];
  if (!profile) return null;

  const sections = new Map(guide.sections.map(section => [section.id, section]));
  const selection = profile.selection.flatMap(id => sections.get(id) ?? []);
  const installation = profile.installation.flatMap(id => sections.get(id) ?? []);
  const verification = guide.sections.filter(section => ["commissioning", "verification", "care"].includes(section.id));
  const chinese = locale === "zh" || locale === "zh-CN";
  const ui = getCompactInstrumentGuideUi(locale);
  const syringeFamily = guide.family === "syringe" && isSyringePumpInquiryFamily(guide.model) ? guide.model : undefined;

  return <section lang={chinese ? "zh-CN" : locale} className={`${base.content} ${styles.guide} ${styles.engineeringGuide}`}
    aria-label={`${guide.model} · ${ui.selection}`} data-instrument-selection-guide={guide.slug}
    data-instrument-guide-family={guide.family} data-compact-instrument-selection>
    <section className={styles.phase}>
      <h2>1 {ui.configuration}</h2>
      <p>{guide.lead}</p>
      {syringeFamily && <SyringePumpModelCode family={syringeFamily} locale={locale} />}
      {selection.map((section, index) => (
        <SelectionBlock key={section.id} guide={guide} section={section} number={`1.${index + (syringeFamily ? 2 : 1)}`} locale={locale}
          columns={index === 0 ? [guide.family === "mrv3" ? ui.model : ui.item, ui.checks] : undefined} />
      ))}
    </section>
    <section className={styles.phase}>
      <h2>2 {ui.integration}</h2>
      {installation.map((section, index) => (
        <SelectionBlock key={section.id} guide={guide} section={section} number={`2.${index + 1}`} locale={locale} />
      ))}
    </section>
    {verification.map((section, index) => (
      <SelectionBlock key={section.id} guide={guide} section={section} number={String(index + 3)} heading="h2" locale={locale} />
    ))}
  </section>;
}
