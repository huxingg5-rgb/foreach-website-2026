import { receiveClientReport } from "@/lib/diagnostics/receive-client-report";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function POST(request: Request) {
  return receiveClientReport(request, {
    CLIENT_DIAGNOSTICS_TOKEN: process.env.CLIENT_DIAGNOSTICS_TOKEN,
    CLIENT_DIAGNOSTICS_EXPIRES_AT: process.env.CLIENT_DIAGNOSTICS_EXPIRES_AT,
  }, (report) => {
    console.info("FOREACH_CLIENT_DIAGNOSTIC " + JSON.stringify(report));
  });
}
