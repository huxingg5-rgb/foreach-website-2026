import TubingDetailStaticPage, { getTubingMetadata } from "../_components/TubingDetailStaticPage";

export const metadata = getTubingMetadata("fep-tubing");

export default function Page() {
  return <TubingDetailStaticPage slug="fep-tubing" />;
}
