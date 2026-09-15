import { MAX_DIAGNOSTIC_BYTES, normalizeDiagnosticReport, type ClientDiagnosticReport } from "./client-report";

export type DiagnosticEnvironment = {
  CLIENT_DIAGNOSTICS_TOKEN?: string;
  CLIENT_DIAGNOSTICS_EXPIRES_AT?: string;
};
function response(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
export async function receiveClientReport(
  request: Request,
  env: DiagnosticEnvironment,
  log: (report: ClientDiagnosticReport) => void,
  now = Date.now(),
): Promise<Response> {
  const token = env.CLIENT_DIAGNOSTICS_TOKEN || "";
  const expires = Date.parse(env.CLIENT_DIAGNOSTICS_EXPIRES_AT || "");
  // Disabled unless a high-entropy token AND a short-lived expiry are configured.
  if (!/^[a-zA-Z0-9_-]{32,128}$/.test(token) || !Number.isFinite(expires)
    || expires <= now || expires > now + 24 * 60 * 60 * 1000) {
    return response(404, { error: "not_found" });
  }
  if (request.method !== "POST") return response(405, { error: "method_not_allowed" });
  if (request.headers.get("Origin") !== new URL(request.url).origin
    || request.headers.get("X-Diagnostics-Token") !== token) {
    return response(403, { error: "forbidden" });
  }
  if (request.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return response(415, { error: "json_required" });
  }
  if (Number(request.headers.get("Content-Length")) > MAX_DIAGNOSTIC_BYTES) {
    return response(413, { error: "too_large" });
  }
  const reader = request.body?.getReader();
  if (!reader) return response(400, { error: "empty_body" });
  try {
    const decoder = new TextDecoder();
    let size = 0;
    let text = "";
    for (;;) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > MAX_DIAGNOSTIC_BYTES) {
        await reader.cancel();
        return response(413, { error: "too_large" });
      }
      text += decoder.decode(part.value, { stream: true });
    }
    text += decoder.decode();
    const report = normalizeDiagnosticReport(JSON.parse(text), token);
    if (!report) return response(400, { error: "invalid_report" });
    log(report);
    return response(202, { accepted: true, id: report.id });
  } catch {
    return response(400, { error: "invalid_report" });
  } finally {
    reader.releaseLock();
  }
}
