/** Public FOREACH counter ID. A build-time override of "" explicitly disables it. */
const rawCounterId = (process.env.NEXT_PUBLIC_YANDEX_METRICA_ID ?? "113688105").trim();

export const YANDEX_METRICA_ID =
  /^[1-9]\d*$/.test(rawCounterId) && Number.isSafeInteger(Number(rawCounterId))
    ? Number(rawCounterId)
    : 0;

export const YANDEX_CONSENT_REVISION = "ga4-yandex-2026-10";
