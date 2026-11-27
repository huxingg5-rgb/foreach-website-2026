import type { HomeHeroLocale } from "@/data/home-hero.intl";
import HomeHeroCarousel from "./HomeHeroCarousel";

export default function HomeHeroSection({ locale }: { locale: HomeHeroLocale }) {
  return <HomeHeroCarousel key={locale} locale={locale} />;
}
