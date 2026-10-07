import ControlSelectionPageZh, { getControlSelectionMetadataZh } from "@/components/products/selection/ControlSelectionPageZh";

export const metadata = getControlSelectionMetadataZh("pressure-sensors");
export default function Page() { return <ControlSelectionPageZh productTypeId="pressure-sensors" />; }
