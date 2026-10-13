import TubingSelectionPage, { getTubingSelectionMetadata } from "@/components/products/selection/TubingSelectionPage";
export const metadata = getTubingSelectionMetadata("ptfe-tubing", "zh");
export default function Page() { return <TubingSelectionPage material="ptfe-tubing" locale="zh" />; }
