# Temporary product-page diagnostics

Local preparation only. No production settings, credentials or deployment are enabled by these files.

## Activation

- Normal URLs do not install capture listeners, retain reports or send diagnostic requests.
- A product URL with ?diagnostics=1 enables an in-memory report for that page only.
- The error page exposes a copyable report in this mode. No localStorage, sessionStorage or cookies are used.
- Optional upload requires #diagnostics-token=<temporary-token> in the URL fragment.
- The server accepts reports only when CLIENT_DIAGNOSTICS_TOKEN matches and CLIENT_DIAGNOSTICS_EXPIRES_AT is in the future, no more than 24 hours away.
- Neither environment setting is created or changed automatically. Missing or expired settings return 404.
- After a separately authorized deployment, use a random token of at least 32 URL-safe characters and a short expiry. Do not put it in query strings. Remove the settings when diagnosis is finished.

## Records and limitations

Reports contain a short page-session ID, product path, browser version, viewport, runtime bundle path, up to eight errors and up to 32 JS/CSS resource timings. Error kinds include runtime, unhandled Promise rejection, failed resource and React global error. Resource status is null when the browser does not expose it; a failure is not automatically called HTTP 404.

Reports deliberately do not read form fields, cookies, browser storage, cart contents or browsing history. URLs lose query strings and fragments. Recognizable emails, credential fields and the temporary token are redacted from error text. Error strings still need to be treated as diagnostic data, not as public content.

The receiver revalidates a field whitelist, checks method, origin and token, caps streamed request bodies at 32 KiB and logs only normalized reports under FOREACH_CLIENT_DIAGNOSTIC. The browser sends no cookies or referrer and makes at most two upload attempts per page. Failed upload leaves the report available to copy; errors are never swallowed from the app.

instrumentation-client.ts installs before hydration; app/global-error.tsx records errors caught by React. A failure that prevents the diagnostic code and error component themselves from loading may still require USB DevTools. This tool does not promise to recover every network failure.

## Validation

From the website checkout:
- node --import tsx --test scripts/diagnostics/client-diagnostics.test.ts
- node node_modules/typescript/bin/tsc --noEmit --incremental false
- node node_modules/eslint/bin/eslint.js instrumentation-client.ts app/global-error.tsx lib/diagnostics/*.ts functions/api/diagnostics/client-error.ts app/api/diagnostics/client-error/route.ts scripts/diagnostics/client-diagnostics.test.ts

A separate minimal Next.js production fixture can exercise a deliberate React error, resource failure and Promise rejection. Do not add deliberate crash pages or test tokens to the real app.
