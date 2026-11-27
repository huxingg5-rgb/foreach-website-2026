export function translateGermanAbout<T>(value: T, copy: Readonly<Record<string, string>>): T {
  if (typeof value === "string") return (Object.hasOwn(copy, value) ? copy[value] : value) as T;
  if (Array.isArray(value)) return value.map(item => translateGermanAbout(item, copy)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [
      key, translateGermanAbout(item, copy),
    ])) as T;
  }
  return value;
}
