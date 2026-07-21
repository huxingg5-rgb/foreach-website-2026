import TubingDetailStaticPage, { getTubingMetadata } from "../_components/TubingDetailStaticPage";

export const metadata = getTubingMetadata("pfa-tubing");

export default function Page() {
  return <TubingDetailStaticPage slug="pfa-tubing" />;
}
