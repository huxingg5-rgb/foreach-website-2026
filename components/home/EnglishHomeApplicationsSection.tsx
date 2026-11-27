import HomeApplicationsSection from "./HomeApplicationsSection";
import { getHomeApplicationsSectionData } from "@/data/home-applications.intl";

export default function EnglishHomeApplicationsSection({ locale = "en" }: { locale?: "en" | "de" | "it" | "hi" } = {}) {
  return <HomeApplicationsSection data={getHomeApplicationsSectionData(locale)} />;
}
