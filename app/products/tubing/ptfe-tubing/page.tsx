import TubingDetailStaticPage, { getTubingMetadata } from "../_components/TubingDetailStaticPage";

export const metadata = getTubingMetadata("ptfe-tubing");

export default function Page() {
  return <TubingDetailStaticPage slug="ptfe-tubing" />;
}
