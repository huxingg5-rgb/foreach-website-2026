import TubingSelectionPage, { getTubingSelectionMetadata } from "@/components/products/selection/TubingSelectionPage";
export const metadata = getTubingSelectionMetadata("tpu-tubing", "zh");
export default function Page() { return <TubingSelectionPage material="tpu-tubing" locale="zh" />; }
