import { installClientDiagnostics } from "./lib/diagnostics/client-capture";

// Next.js runs this before React hydration. No storage and no automatic opt-in.
try {
  installClientDiagnostics(window);
} catch {
  // A diagnostic setup failure must not affect application startup.
}
