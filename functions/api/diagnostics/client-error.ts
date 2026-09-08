import { receiveClientReport, type DiagnosticEnvironment } from "../../../lib/diagnostics/receive-client-report";

export const onRequest = ({ request, env }: {
  request: Request;
  env: DiagnosticEnvironment;
}) => receiveClientReport(request, env, (report) => {
  // Only the normalized report is logged. Never log headers, cookies or raw body.
  console.info("FOREACH_CLIENT_DIAGNOSTIC " + JSON.stringify(report));
});
