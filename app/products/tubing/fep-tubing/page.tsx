import TubingSelectionPage, { getTubingSelectionMetadata } from "@/components/products/selection/TubingSelectionPage";
export const metadata = getTubingSelectionMetadata("fep-tubing", "zh");
export default function Page() { return <TubingSelectionPage material="fep-tubing" locale="zh" />; }
