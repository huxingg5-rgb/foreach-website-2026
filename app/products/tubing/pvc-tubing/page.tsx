import TubingDetailStaticPage, { getTubingMetadata } from "../_components/TubingDetailStaticPage";

export const metadata = getTubingMetadata("pvc-tubing");

export default function Page() {
  return <TubingDetailStaticPage slug="pvc-tubing" />;
}
