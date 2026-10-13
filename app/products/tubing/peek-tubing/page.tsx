import TubingSelectionPage, { getTubingSelectionMetadata } from "@/components/products/selection/TubingSelectionPage";
export const metadata = getTubingSelectionMetadata("peek-tubing", "zh");
export default function Page() { return <TubingSelectionPage material="peek-tubing" locale="zh" />; }
