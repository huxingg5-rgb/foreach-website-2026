const fs = require("fs");
const path = require("path");

const root = process.cwd();

const dataPath = path.join(
  root,
  "data",
  "products",
  "selection",
  "quick-connect-fitting-selection.generated.ts"
);

if (!fs.existsSync(dataPath)) {
  throw new Error(
    "Missing generated quick-connect selection file."
  );
}

const stamp = new Date()
  .toISOString()
  .replace(/[-:T.Z]/g, "")
  .slice(0, 14);

fs.copyFileSync(
  dataPath,
  dataPath +
    ".bak_card_copy_" +
    stamp
);

let source = fs.readFileSync(
  dataPath,
  "utf8"
);

const productsPattern =
  /export const quickConnectFittingSelectionProducts\s*=\s*([\s\S]*?)\s*as unknown as ProductSelectionProduct\[\];/;

const filtersPattern =
  /export const quickConnectFittingFilterLabels\s*=\s*([\s\S]*?)\s*as ProductSelectionFilterLabel\[\];/;

const productsMatch =
  source.match(
    productsPattern
  );

const filtersMatch =
  source.match(
    filtersPattern
  );

if (!productsMatch) {
  throw new Error(
    "Cannot locate quickConnectFittingSelectionProducts."
  );
}

if (!filtersMatch) {
  throw new Error(
    "Cannot locate quickConnectFittingFilterLabels."
  );
}

const products =
  JSON.parse(
    productsMatch[1]
  );

const filterLabels =
  JSON.parse(
    filtersMatch[1]
  );

function cleanText(value) {
  return String(
    value ?? ""
  ).trim();
}

function isMetricTubeSize(value) {
  return /^\d+(?:\.\d+)?\s*mm$/i.test(
    cleanText(value)
  );
}

function compactMetricSize(value) {
  return cleanText(value)
    .replace(
      /\s*mm$/i,
      "mm"
    );
}

let updatedProductCount = 0;

for (const product of products) {
  const series =
    cleanText(
      product.series
    );

  const gender =
    cleanText(
      product.gender
    );

  const shape =
    cleanText(
      product.shape
    );

  const valved =
    cleanText(
      product.valved
    );

  const tubeOrThread =
    cleanText(
      product.tubeOrThread
    );

  const housingMaterial =
    cleanText(
      product.housingMaterial
    );

  const panelMount =
    cleanText(
      product.panelMount
    );

  const line1 =
    series +
    gender +
    shape +
    valved +
    "快插接头";

  const line2 =
    isMetricTubeSize(
      tubeOrThread
    )
      ? "适配" +
        compactMetricSize(
          tubeOrThread
        ) +
        "接管内径"
      : "适配" +
        tubeOrThread +
        "螺纹接口";

  const line3 =
    housingMaterial +
    "材质，" +
    (
      panelMount === "穿板"
        ? "可穿板"
        : "非穿板"
    );

  const cardText =
    [
      line1,
      line2,
      line3,
    ].join("\n");

  product.cardSubtitle = {
    ...(
      product.cardSubtitle ||
      {}
    ),
    zh: cardText,
  };

  if (
    product.cardSubtitle &&
    Object.prototype.hasOwnProperty.call(
      product.cardSubtitle,
      "china"
    )
  ) {
    product.cardSubtitle.china =
      cardText;
  }

  if (
    product.filters &&
    typeof product.filters ===
      "object"
  ) {
    delete product.filters.filter08;
  }

  updatedProductCount += 1;
}

const nextFilterLabels =
  filterLabels.filter(
    (item) =>
      item.filterKey !==
      "filter08"
  );

source = source.replace(
  productsPattern,
  "export const quickConnectFittingSelectionProducts =\n" +
    JSON.stringify(
      products,
      null,
      2
    ) +
    " as unknown as ProductSelectionProduct[];"
);

source = source.replace(
  filtersPattern,
  "export const quickConnectFittingFilterLabels =\n" +
    JSON.stringify(
      nextFilterLabels,
      null,
      2
    ) +
    " as ProductSelectionFilterLabel[];"
);

fs.writeFileSync(
  dataPath,
  source,
  "utf8"
);

const verifySource =
  fs.readFileSync(
    dataPath,
    "utf8"
  );

const requiredTexts = [
  "Q20公端直通带阀快插接头",
  "适配1.6mm接管内径",
  "POM材质，可穿板",
];

for (
  const requiredText of
  requiredTexts
) {
  if (
    !verifySource.includes(
      requiredText
    )
  ) {
    throw new Error(
      "Verification failed: " +
      requiredText
    );
  }
}

if (
  verifySource.includes(
    '"filterKey": "filter08"'
  )
) {
  throw new Error(
    "Seal material filter still exists."
  );
}

console.log("");
console.log(
  "Updated products: " +
  updatedProductCount
);

console.log(
  "Filter labels: " +
  filterLabels.length +
  " -> " +
  nextFilterLabels.length
);

console.log("");
console.log(
  "Card example:"
);

console.log(
  "Q20公端直通带阀快插接头"
);

console.log(
  "适配1.6mm接管内径"
);

console.log(
  "POM材质，可穿板"
);

console.log("");
console.log(
  "Seal material filter removed."
);

console.log(
  "Underlying seal data retained."
);