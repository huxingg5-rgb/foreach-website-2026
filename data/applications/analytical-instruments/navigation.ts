import { getLocalizedHref, getLocalizedText, getVisibleNavigationItems } from "@/data/navigation";

/** Instrument entries shared by the English desktop document and mobile navigation. */
export function getEnglishAnalyticalInstrumentLinks() {
  const applications = getVisibleNavigationItems("en").find((item) => item.key === "applications");
  const card = applications?.megaDropdown?.cards.find((item) => item.key === "analytical-instruments-card");
  return (card?.images ?? []).flatMap((item) => item.href && item.title ? [{
    key: item.src,
    label: getLocalizedText(item.title, "en"),
    href: getLocalizedHref(item.href, "en"),
  }] : []);
}
