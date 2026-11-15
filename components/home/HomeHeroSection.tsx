import type { LocaleCode } from "@/lib/i18n";
import HomeHeroCarousel from "./HomeHeroCarousel";

export default function HomeHeroSection({ locale }: { locale: LocaleCode }) {
  return <HomeHeroCarousel key={locale} locale={locale} />;
}
