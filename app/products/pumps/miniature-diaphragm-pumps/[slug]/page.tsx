import DiaphragmPumpDetailRoute, {
  getDiaphragmPumpMetadata,
  getDiaphragmPumpStaticParams,
} from "@/components/products/diaphragm-pumps/DiaphragmPumpDetailRoute";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getDiaphragmPumpStaticParams();
}

export async function generateMetadata({ params }: PageProps) {
  return getDiaphragmPumpMetadata({ params, locale: "zh-CN" });
}

export default function MiniatureDiaphragmPumpDetailPage({
  params,
}: PageProps) {
  return <DiaphragmPumpDetailRoute params={params} locale="zh-CN" />;
}
