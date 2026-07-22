import TubingDetailStaticPage, { getTubingMetadata } from "../_components/TubingDetailStaticPage";

export const metadata = getTubingMetadata("peek-tubing");

export default function Page() {
  return <TubingDetailStaticPage slug="peek-tubing" />;
}
