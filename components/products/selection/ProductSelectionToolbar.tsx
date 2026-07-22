"use client";

import type { ProductSelectionSelectedTag } from "./product-selection-ui.types";

type ProductSelectionToolbarProps = {
  total: number;
  resultPrefix: string;
  resultSuffix: string;
  resetButtonText: string;
  selectedTags: ProductSelectionSelectedTag[];

  /*
   * 说明：
   * 1. onRemoveTag 目前保留在类型里，是为了兼容 ProductSelectionClient.tsx 现有传参
   * 2. 上方已选标签区域只作为状态展示，不再提供单个删除功能
   * 3. 后续统一清理代码时，可以再从 ProductSelectionClient.tsx 里移除 onRemoveTag 传参
   */
  onRemoveTag?: (
    key: ProductSelectionSelectedTag["key"],
    value: string
  ) => void;

  onResetFilters: () => void;
};

export default function ProductSelectionToolbar({
  total,
  resultPrefix,
  resultSuffix,
  resetButtonText,
  selectedTags,
  onResetFilters,
}: ProductSelectionToolbarProps) {
  return (
    <div className="product-toolbar">
      <div>
        <div className="toolbar-summary">
          {resultPrefix}
          {total}
          {resultSuffix}
        </div>

        <div className="selected-tags">
          {selectedTags.map((item) => (
            <span className="selected-tag" key={`${item.key}-${item.value}`}>
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <button className="toolbar-reset" type="button" onClick={onResetFilters}>
        {resetButtonText}
      </button>
    </div>
  );
}
