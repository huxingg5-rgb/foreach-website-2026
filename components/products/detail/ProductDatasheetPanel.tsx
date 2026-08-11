"use client";

import PdfDrawingPreview from "@/components/common/PdfDrawingPreview";
import {
  getProductDetailResourceCopy,
  type ProductDatasheet,
  type ProductDetailResourceLocale,
} from "@/data/products/detail/product-detail-resources";

import styles from "./ProductDatasheetPanel.module.css";

type ProductDatasheetPanelProps = {
  datasheet: ProductDatasheet | null;
  fallbackTitle: string;
  locale: ProductDetailResourceLocale;
};

export default function ProductDatasheetPanel({
  datasheet,
  fallbackTitle,
  locale,
}: ProductDatasheetPanelProps) {
  const copy = getProductDetailResourceCopy(locale);

  if (!datasheet) {
    return (
      <div className={styles.empty} data-product-datasheet-empty-state="true">
        <h3>{copy.unavailableTitle}</h3>
        <p>{copy.unavailableDescription}</p>
      </div>
    );
  }

  const title = datasheet.title || `${fallbackTitle} Datasheet`;
  const shortTitle = datasheet.shortTitle || fallbackTitle;
  const previewUrl = `${datasheet.file}#toolbar=0&navpanes=0&scrollbar=1`;

  return (
    <section className={styles.content} aria-label={title}>
      <div className={styles.actions}>
        <a
          className={styles.downloadLink}
          href={datasheet.file}
          download
        >
          {copy.downloadDatasheet(shortTitle)}
        </a>
      </div>

      <div className={styles.preview} id="product-datasheet-preview">
        <PdfDrawingPreview
          pdfPreviewUrl={previewUrl}
          previewHref={datasheet.file}
          deferDesktopUntilOpen
          showPreviewDescription={false}
          analyticsResourceId={`datasheet:${datasheet.id}`}
          analyticsResourceType="datasheet"
          analyticsSection="product_datasheet_preview"
          previousPageLabel={copy.previousPage}
          nextPageLabel={copy.nextPage}
          previousPageVisibleLabel={copy.previousPageShort}
          nextPageVisibleLabel={copy.nextPageShort}
          documentTitle={title}
          text={{
            title,
            loadingLabel: copy.previewLoading,
            previewButton: copy.viewDatasheet(shortTitle),
            description: "",
          }}
        />
      </div>
    </section>
  );
}
