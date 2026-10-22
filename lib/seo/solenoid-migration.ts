// Broad legacy pages retain their original scope through a filtered family listing.
export const solenoidLegacyFilters: Record<string, string> = {
  "2-way": "2-way", "3-way": "3-way", "sv10-p": "base", "sv10-b16": "barbed", "sv10-threaded": "threaded",
};
export function getSolenoidRedirectEntries() {
  return ["", "/en", "/es", "/fr", "/ko", "/ru"].flatMap(prefix =>
    Object.entries(solenoidLegacyFilters).map(([slug, filter]) => ({
      source: `${prefix}/products/valves/solenoid-valves/${slug}/`,
      destination: `${prefix}/products/valves/solenoid-valves/?solenoid=${filter}`,
      statusCode: 301 as const,
    })));
}
