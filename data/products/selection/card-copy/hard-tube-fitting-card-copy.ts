import type {
  ProductSelectionProduct,
  SelectionLocale,
} from "@/data/products/selection/product-selection.types";

type TargetSelectionLocale = Exclude<SelectionLocale, "zh" | "en">;

const TARGET_LOCALES: TargetSelectionLocale[] = ["es", "fr", "ko", "ru"];

const FIELD_LABELS: Record<TargetSelectionLocale, Record<string, string>> = {
  es: {
    "Sealing method": "Método de sellado",
    Thread: "Rosca",
    "Tube OD": "Diámetro exterior del tubo",
    "Pressure rating": "Presión nominal",
    "Flow path ID": "Diámetro interior del paso de flujo",
    "Flow Path ID": "Diámetro interior del paso de flujo",
  },
  fr: {
    "Sealing method": "Méthode d’étanchéité",
    Thread: "Filetage",
    "Tube OD": "Diamètre extérieur du tube",
    "Pressure rating": "Pression nominale",
    "Flow path ID": "Diamètre intérieur du passage de fluide",
    "Flow Path ID": "Diamètre intérieur du passage de fluide",
  },
  ko: {
    "Sealing method": "밀봉 방식",
    Thread: "나사 규격",
    "Tube OD": "튜브 외경",
    "Pressure rating": "정격 압력",
    "Flow path ID": "유로 내경",
    "Flow Path ID": "유로 내경",
  },
  ru: {
    "Sealing method": "Способ уплотнения",
    Thread: "Резьба",
    "Tube OD": "Наружный диаметр трубки",
    "Pressure rating": "Номинальное давление",
    "Flow path ID": "Внутренний диаметр проточного канала",
    "Flow Path ID": "Внутренний диаметр проточного канала",
  },
};

const FIELD_VALUES: Record<TargetSelectionLocale, Record<string, string>> = {
  es: {
    "Flange gasket bottom seal": "Sellado inferior mediante junta de brida",
    "Ferrule seal": "Sellado mediante férula",
    "Retaining-ring seal": "Sellado mediante anillo de retención",
  },
  fr: {
    "Flange gasket bottom seal": "Étanchéité inférieure par joint de bride",
    "Ferrule seal": "Étanchéité par bague",
    "Retaining-ring seal": "Étanchéité par anneau de retenue",
  },
  ko: {
    "Flange gasket bottom seal": "플랜지 개스킷 하부 밀봉",
    "Ferrule seal": "페룰 밀봉",
    "Retaining-ring seal": "리테이닝 링 밀봉",
  },
  ru: {
    "Flange gasket bottom seal": "Нижнее уплотнение фланцевой прокладкой",
    "Ferrule seal": "Уплотнение феррулой",
    "Retaining-ring seal": "Уплотнение стопорным кольцом",
  },
};

function isTargetLocale(locale: SelectionLocale): locale is TargetSelectionLocale {
  return TARGET_LOCALES.includes(locale as TargetSelectionLocale);
}

export function localizeHardTubeFittingCardSubtitle(
  product: ProductSelectionProduct,
  locale: SelectionLocale,
  subtitle: string,
): string {
  if (
    product.categoryId !== "fittings" ||
    product.productTypeId !== "hard-tube-fittings" ||
    !isTargetLocale(locale) ||
    !subtitle
  ) {
    return subtitle;
  }

  return subtitle
    .split("\n")
    .map((line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex < 0) {
        return FIELD_VALUES[locale][line.trim()] || line;
      }

      const label = line.slice(0, separatorIndex).trim();
      const value = line.slice(separatorIndex + 1).trim();
      const localizedLabel = FIELD_LABELS[locale][label] || label;
      const localizedValue = FIELD_VALUES[locale][value] || value;

      return `${localizedLabel}: ${localizedValue}`;
    })
    .join("\n");
}
