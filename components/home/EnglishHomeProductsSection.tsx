import HomeProductsSection from './HomeProductsSection';
import { getHomeProductsSectionData } from '@/data/home-products.intl';

export default function EnglishHomeProductsSection({ locale = 'en' }: { locale?: 'en' | 'de' | 'it' | 'hi' } = {}) {
  return <HomeProductsSection data={getHomeProductsSectionData(locale)} />;
}
