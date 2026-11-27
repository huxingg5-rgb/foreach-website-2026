import type { GermanProductDetailContent } from "./product-detail-content.de";

export function resolveGermanDrawingFaq(
  content: GermanProductDetailContent | undefined,
  hasDrawingPreview: boolean,
): GermanProductDetailContent | undefined {
  if (!content || !hasDrawingPreview || !content.faqs.some((item) => item.drawingPreviewAnswer)) {
    return content;
  }

  return {
    ...content,
    faqs: content.faqs.map((item) => item.drawingPreviewAnswer
      ? { ...item, answer: item.drawingPreviewAnswer }
      : item),
  };
}
