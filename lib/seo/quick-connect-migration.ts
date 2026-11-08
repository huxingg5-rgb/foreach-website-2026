/** Retired series landing pages now lead directly to the fitting selector. */
export function getQuickConnectSeriesRedirectEntries() {
  return ["", "/en", "/es", "/fr", "/ko", "/ru"].flatMap(prefix =>
    ["q20", "q40", "q60"].map(series => ({
      source: `${prefix}/products/fittings/quick-connect-fittings/${series}`,
      destination: `${prefix}/products/fittings/quick-connect-fittings/`,
      statusCode: 301 as const,
    })),
  );
}
