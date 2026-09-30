import HpValveDetailPage, {getHpValveMetadata} from '@/components/products/detail/HpValveDetailPage';
export function generateMetadata() { return getHpValveMetadata('zh'); }
export default function Page() { return <HpValveDetailPage locale="zh" />; }
