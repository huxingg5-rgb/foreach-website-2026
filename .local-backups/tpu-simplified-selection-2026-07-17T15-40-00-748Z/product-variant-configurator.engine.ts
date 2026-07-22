import type {
  ProductConfiguratorConfig,
  ProductConfiguratorDimension,
  ProductConfiguratorSelection,
  ProductConfiguratorValue,
  ProductConfiguratorVariant,
} from "./product-variant-configurator.types";

export function isSameConfiguratorValue(
  left: ProductConfiguratorValue | undefined,
  right: ProductConfiguratorValue | undefined
): boolean {
  return String(left) === String(right);
}

function uniqueValues(
  values: ProductConfiguratorValue[]
): ProductConfiguratorValue[] {
  const valueMap = new Map<
    string,
    ProductConfiguratorValue
  >();

  values.forEach((value) => {
    valueMap.set(String(value), value);
  });

  return Array.from(valueMap.values());
}

function sortDimensionValues(
  values: ProductConfiguratorValue[],
  dimension: ProductConfiguratorDimension
): ProductConfiguratorValue[] {
  const unique = uniqueValues(values);

  if (
    Array.isArray(dimension.order) &&
    dimension.order.length > 0
  ) {
    const orderMap = new Map(
      dimension.order.map((value, index) => [
        String(value),
        index,
      ])
    );

    return unique.sort((left, right) => {
      const leftOrder =
        orderMap.get(String(left)) ??
        Number.MAX_SAFE_INTEGER;

      const rightOrder =
        orderMap.get(String(right)) ??
        Number.MAX_SAFE_INTEGER;

      return leftOrder - rightOrder;
    });
  }

  return unique.sort((left, right) => {
    if (
      typeof left === "number" &&
      typeof right === "number"
    ) {
      return left - right;
    }

    return String(left).localeCompare(
      String(right),
      "zh-CN",
      {
        numeric: true,
        sensitivity: "base",
      }
    );
  });
}

export function getAllDimensionValues(
  config: ProductConfiguratorConfig,
  dimension: ProductConfiguratorDimension
): ProductConfiguratorValue[] {
  return sortDimensionValues(
    config.variants
      .map(
        (variant) =>
          variant.attributes[dimension.key]
      )
      .filter(
        (
          value
        ): value is ProductConfiguratorValue =>
          value !== undefined
      ),
    dimension
  );
}

export function getAvailableDimensionValues(
  config: ProductConfiguratorConfig,
  selection: ProductConfiguratorSelection,
  dimensionIndex: number
): ProductConfiguratorValue[] {
  const dimension =
    config.dimensions[dimensionIndex];

  if (!dimension) {
    return [];
  }

  const previousDimensions =
    config.dimensions.slice(0, dimensionIndex);

  const matchingVariants =
    config.variants.filter((variant) =>
      previousDimensions.every(
        (previousDimension) => {
          const selectedValue =
            selection[previousDimension.key];

          if (selectedValue === undefined) {
            return true;
          }

          return isSameConfiguratorValue(
            variant.attributes[
              previousDimension.key
            ],
            selectedValue
          );
        }
      )
    );

  return sortDimensionValues(
    matchingVariants
      .map(
        (variant) =>
          variant.attributes[dimension.key]
      )
      .filter(
        (
          value
        ): value is ProductConfiguratorValue =>
          value !== undefined
      ),
    dimension
  );
}

export function getSelectionFromVariant(
  config: ProductConfiguratorConfig,
  variant?: ProductConfiguratorVariant | null
): ProductConfiguratorSelection {
  if (
    !variant &&
    config.emptyInitialSelection
  ) {
    return {};
  }

  const selectedVariant =
    variant ||
    config.variants.find(
      (item) =>
        item.id === config.defaultVariantId
    ) ||
    config.variants[0];

  if (!selectedVariant) {
    return {};
  }

  return Object.fromEntries(
    config.dimensions.map((dimension) => [
      dimension.key,
      selectedVariant.attributes[dimension.key],
    ])
  );
}

export function normalizeConfiguratorSelection(
  config: ProductConfiguratorConfig,
  selection: ProductConfiguratorSelection
): ProductConfiguratorSelection {
  const nextSelection = {
    ...selection,
  };

  config.dimensions.forEach(
    (dimension, dimensionIndex) => {
      const availableValues =
        getAvailableDimensionValues(
          config,
          nextSelection,
          dimensionIndex
        );

      const currentValue =
        nextSelection[dimension.key];

      const currentValueIsAvailable =
        availableValues.some((value) =>
          isSameConfiguratorValue(
            value,
            currentValue
          )
        );

      if (currentValueIsAvailable) {
        return;
      }

      /*
       * 当前规格没有选择时：
       * PVC等需要逐项选择的产品不自动补齐。
       */
      if (
        currentValue === undefined &&
        config.autoSelectFollowingDimensions ===
          false
      ) {
        return;
      }

      /*
       * 已选值因前置条件改变而不可用时，
       * 先清除原值。
       */
      delete nextSelection[dimension.key];

      if (
        config.autoSelectFollowingDimensions ===
        false
      ) {
        return;
      }

      const firstAvailableValue =
        availableValues[0];

      if (firstAvailableValue === undefined) {
        return;
      }

      nextSelection[dimension.key] =
        firstAvailableValue;
    }
  );

  return nextSelection;
}

export function updateConfiguratorSelection(
  config: ProductConfiguratorConfig,
  selection: ProductConfiguratorSelection,
  changedDimensionKey: string,
  nextValue: ProductConfiguratorValue
): ProductConfiguratorSelection {
  const changedDimensionIndex =
    config.dimensions.findIndex(
      (dimension) =>
        dimension.key === changedDimensionKey
    );

  const nextSelection = {
    ...selection,
    [changedDimensionKey]: nextValue,
  };

  if (changedDimensionIndex >= 0) {
    config.dimensions
      .slice(changedDimensionIndex + 1)
      .forEach((dimension) => {
        delete nextSelection[dimension.key];
      });
  }

  if (
    config.autoSelectFollowingDimensions ===
    false
  ) {
    return nextSelection;
  }

  return normalizeConfiguratorSelection(
    config,
    nextSelection
  );
}

export function findMatchingConfiguratorVariant(
  config: ProductConfiguratorConfig,
  selection: ProductConfiguratorSelection
): ProductConfiguratorVariant | undefined {
  return config.variants.find((variant) =>
    config.dimensions.every((dimension) =>
      isSameConfiguratorValue(
        variant.attributes[dimension.key],
        selection[dimension.key]
      )
    )
  );
}

export function formatConfiguratorValue(
  value: ProductConfiguratorValue | undefined,
  unit?: string,
  precision?: number
): string {
  if (value === undefined) {
    return "—";
  }

  let text: string;

  if (typeof value === "number") {
    text =
      typeof precision === "number"
        ? value.toFixed(precision)
        : String(value);
  }
  else {
    text = value;
  }

  return unit ? `${text} ${unit}` : text;
}