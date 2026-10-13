import TubingSelectionPage, { getTubingSelectionMetadata } from "@/components/products/selection/TubingSelectionPage";
export const metadata = getTubingSelectionMetadata("pvc-tubing", "zh");
export default function Page() { return <TubingSelectionPage material="pvc-tubing" locale="zh" />; }
