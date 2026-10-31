/** Keep word boundaries when replacing unspaced source-language fragments. */
export function replaceTranslatedPhrase(
  value: string,
  source: string,
  target: string,
): string {
  if (!source || source === target || !value.includes(source)) return value;

  const parts = value.split(source);
  const isWordEdge = (character: string) =>
    /[\p{L}\p{N}]/u.test(character) && !/\p{Script=Han}/u.test(character);

  return parts.reduce((translated, part, index) => {
    if (index === 0) return part;
    const before = isWordEdge(translated.slice(-1)) && isWordEdge(target[0] || "") ? " " : "";
    const after = isWordEdge(target.slice(-1)) && isWordEdge(part[0] || "") ? " " : "";
    return `${translated}${before}${target}${after}${part}`;
  }, "");
}
