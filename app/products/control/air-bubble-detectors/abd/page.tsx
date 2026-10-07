import ProductDetailRoutePage, { generateMetadata as getProductMetadata } from "@/app/products/[category]/[slug]/page";

const getDetailParams = () => Promise.resolve({ category: "control", slug: "abd" });

export function generateMetadata() {
  return getProductMetadata({ params: getDetailParams() });
}

export default function Page() {
  return ProductDetailRoutePage({ params: getDetailParams() });
}
