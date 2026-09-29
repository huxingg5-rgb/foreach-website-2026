/** Remove sentence-ending punctuation while preserving units and closing brackets. */
export function formatProductHeading(value: string): string {
  return value.trimEnd().replace(/[。．.!！?？;；,，:：、…]+$/u, "").trimEnd();
}
