import HomeApplicationsSection from "./HomeApplicationsSection";
import { getHomeApplicationsSectionData } from "@/data/home-applications.intl";

export default function EnglishHomeApplicationsSection() {
  return <HomeApplicationsSection data={getHomeApplicationsSectionData("en")} />;
}
