import TubingDetailStaticPage, { getTubingMetadata } from "../_components/TubingDetailStaticPage";

export const metadata = getTubingMetadata("tpu-tubing");

export default function Page() {
  return <TubingDetailStaticPage slug="tpu-tubing" />;
}
