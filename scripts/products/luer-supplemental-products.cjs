const records = require('../../data-source/product-center/fittings/luer-supplemental-products.json');

function selectionProducts(startOrder = 151) {
  return records.map((record, index) => ({
    productId: record.productCode,
    categoryId: 'fittings',
    productTypeId: 'luer-fittings',
    seriesId: record.series.toLowerCase(),
    cardTitle: { zh: record.model, en: record.model },
    cardSubtitle: {
      zh: `公鲁尔堵头\n${record.material}材质｜${record.color}\n鲁尔接头专用堵头`,
      en: `Male Luer Plug\n${record.material} material | ${record.colorCode === 'W' ? 'White' : 'Natural'}\nPlug for Luer fittings`,
    },
    filters: {
      filter01: record.productType,
      filter02: 'LPBL 公鲁尔堵头',
      filter05: record.material,
      filter06: `${record.colorCode} - ${record.color}`,
    },
    imageCard: record.imageCard,
    detailSlug: record.model.toLowerCase(),
    status: 'active',
    sortOrder: startOrder + index + 1,
    searchKeywords: {
      zh: `${record.model} ${record.productCode} 公鲁尔堵头 ${record.material} ${record.color}`,
      en: `${record.model} ${record.productCode} male luer plug ${record.material}`,
    },
  }));
}

function assetMap() {
  return Object.fromEntries(records.map(record => [record.productCode, {
    productCode: record.productCode,
    itemNumber: '',
    fullModel: `${record.productType} ${record.model}`,
    model: record.model,
    slug: record.model.toLowerCase(),
    series: record.series,
    imageCard: record.imageCard,
    drawingPdfUrl: '',
    imageSourceFile: record.imageCard.split('/').pop(),
    drawingSourceFile: '',
    has2DFlag: false,
    has3DFlag: false,
    source: record.source,
  }]));
}

module.exports = { records, selectionProducts, assetMap };
