import HomeProductsSection from './HomeProductsSection';
import { getHomeProductsSectionData } from '@/data/home-products.intl';

export default function EnglishHomeProductsSection() {
  return <HomeProductsSection data={getHomeProductsSectionData('en')} />;
}
