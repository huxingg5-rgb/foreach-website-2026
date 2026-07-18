"use client";

type ProductSelectionPaginationProps = {
  currentPage: number;
  totalPages: number;
  previousText: string;
  nextText: string;
  ariaLabel?: string;
  onPageChange: (page: number) => void;
};

export default function ProductSelectionPagination({
  currentPage,
  totalPages,
  previousText,
  nextText,
  ariaLabel,
  onPageChange,
}: ProductSelectionPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="product-pagination" aria-label={ariaLabel || "产品分页"}>
      <button
        className="product-page-button"
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
      >
        {previousText}
      </button>

      <span className="product-page-status">
        {currentPage} / {totalPages}
      </span>

      <button
        className="product-page-button"
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
      >
        {nextText}
      </button>
    </nav>
  );
}
