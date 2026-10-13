import TubingSelectionPage, { getTubingSelectionMetadata } from "@/components/products/selection/TubingSelectionPage";
export const metadata = getTubingSelectionMetadata("pfa-tubing", "zh");
export default function Page() { return <TubingSelectionPage material="pfa-tubing" locale="zh" />; }
