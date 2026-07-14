# 过滤器与单向阀生成模板结构检查

生成时间：2026/7/13 08:07:07

> 本次只读取现有文件，没有修改项目。

## 1. 选型数据模板

### data/products/selection/barbed-fitting-selection.generated.ts

#### barbedFittingSelectionProducts

- 数量：166
- 首条字段：productId、productCode、sourceType、categoryId、categoryLabel、productTypeId、productTypeName、seriesId、seriesCode、seriesName、model、cardTitle、cardSubtitle、filters、portCount、portValues、materialCode、colorCode、imageCard、detailSlug、detailHref、status、sourceIndex、sortOrder、searchKeywords

```json
{
  "productId": "809276",
  "productCode": "809276",
  "sourceType": "barbed-fitting-selection",
  "categoryId": "fittings",
  "categoryLabel": "接头系列",
  "productTypeId": "barbed-fittings",
  "productTypeName": "倒刺接头",
  "seriesId": "ba",
  "seriesCode": "BA",
  "seriesName": "直通型倒刺接头",
  "model": "BA-16F-PP-N",
  "cardTitle": {
    "zh": "BA-16F-PP-N",
    "en": "BA-16F-PP-N",
    "es": "BA-16F-PP-N",
    "fr": "BA-16F-PP-N",
    "ko": "BA-16F-PP-N",
    "ru": "BA-16F-PP-N"
  },
  "cardSubtitle": {
    "zh": "直通倒刺接头\n适用1.6 mm内径软管\nPP材质，本色",
    "en": "Straight Barbed Fitting\nTube ID: 1.6 mm\nPP body | 本色",
    "es": "Straight Barbed Fitting\nTube ID: 1.6 mm\nPP body | 本色",
    "fr": "Straight Barbed Fitting\nTube ID: 1.6 mm\nPP body | 本色",
    "ko": "Straight Barbed Fitting\nTube ID: 1.6 mm\nPP body | 本色",
    "ru": "Straight Barbed Fitting\nTube ID: 1.6 mm\nPP body | 本色"
  },
  "filters": {
    "filter01": "直通型",
    "filter02": "1.6 mm",
    "filter03": "1.6 mm",
    "filter04": "",
    "filter05": "PP",
    "filter06": "本色"
  },
  "portCount": 2,
  "portValues": [
    "1.6 mm",
    "1.6 mm"
  ],
  "materialCode": "PP",
  "colorCode": "N",
  "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16f-pp-n-main.jpg",
  "detailSlug": "barbed-fittings",
  "detailHref": "/products/fittings/barbed-fittings",
  "status": "active",
  "sourceIndex": 0,
  "sortOrder": 10000,
  "searchKeywords": {
    "zh": "倒刺接头 直通型倒刺接头 BA BA-16F-PP-N 809276 1.6 mm 1.6 mm PP 本色",
    "en": "barbed fitting Straight Barbed Fitting BA BA-16F-PP-N 809276 1.6 mm 1.6 mm PP 本色",
    "es": "barbed fitting Straight Barbed Fitting BA BA-16F-PP-N 809276 1.6 mm 1.6 mm PP 本色",
    "fr": "barbed fitting Straight Barbed Fitting BA BA-16F-PP-N 809276 1.6 mm 1.6 mm PP 本色",
    "ko": "barbed fitting Straight Barbed Fitting BA BA-16F-PP-N 809276 1.6 mm 1.6 mm PP 本色",
    "ru": "barbed fitting Straight Barbed Fitting BA BA-16F-PP-N 809276 1.6 mm 1.6 mm PP 本色"
  }
}
```

#### barbedFittingTaxonomyItems

- 数量：1
- 首条字段：type、id、label、sortOrder

```json
{
  "type": "productType",
  "id": "barbed-fittings",
  "label": {
    "zh": "倒刺接头",
    "en": "Barbed Fittings",
    "es": "Barbed Fittings",
    "fr": "Barbed Fittings",
    "ko": "Barbed Fittings",
    "ru": "Barbed Fittings"
  },
  "sortOrder": 402
}
```

#### barbedFittingFilterLabels

- 数量：6
- 首条字段：categoryId、productTypeId、filterKey、label、inputType、sortOrder、visible

```json
{
  "categoryId": "fittings",
  "productTypeId": "barbed-fittings",
  "filterKey": "filter01",
  "label": {
    "zh": "产品结构",
    "en": "Structure",
    "es": "Structure",
    "fr": "Structure",
    "ko": "Structure",
    "ru": "Structure"
  },
  "inputType": "single",
  "sortOrder": 10,
  "visible": true
}
```

### data/products/selection/quick-connect-fitting-selection.generated.ts

#### quickConnectFittingSelectionProducts

- 数量：191
- 首条字段：productId、categoryId、productTypeId、seriesId、cardTitle、cardSubtitle、filters、imageCard、detailSlug、status、sortOrder、searchKeywords、sourceType、productCode、model、foreachModel、competitorModels、series、tubeCode、tubeOrThread、genderCode、gender、panelCode、panelMount、valvedCode、valved、shapeCode、shape、housingCode、housingMaterial、sealingCode、sealingRingMaterial、needDrawing、needModel3d、detailHref、href

```json
{
  "productId": "839041",
  "categoryId": "fittings",
  "productTypeId": "quick-connect-fittings",
  "seriesId": "q20",
  "cardTitle": {
    "zh": "Q2001-PMV-SACN",
    "en": "Q2001-PMV-SACN"
  },
  "cardSubtitle": {
    "zh": "Q20公端直通带阀快插接头\n适配1.6mm接管内径\nPOM材质，可穿板",
    "en": "Q20公端直通带阀快插接头\\n适配1.6 mm螺纹接口\\nPOM材质，可穿板"
  },
  "filters": {
    "filter01": "Q20",
    "filter02": "1.6 mm",
    "filter03": "公端",
    "filter04": "穿板",
    "filter05": "带阀",
    "filter06": "直通",
    "filter07": "POM"
  },
  "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-pmv-sacn-main.jpg",
  "detailSlug": "quick-connect-fittings",
  "status": "active",
  "sortOrder": 440033,
  "searchKeywords": {
    "zh": "快插接头 Q20 Q2001-PMV-SACN 839041 1.6 mm 公端 穿板 带阀 直通 POM NBR",
    "en": "quick-connect fitting Q20 Q2001-PMV-SACN 839041 1.6 mm 公端 穿板 带阀 直通 POM NBR"
  },
  "sourceType": "quick-connect-selection",
  "productCode": "839041",
  "model": "Q2001-PMV-SACN",
  "foreachModel": "Q2001-PMV-SACN",
  "competitorModels": [],
  "series": "Q20",
  "tubeCode": "01",
  "tubeOrThread": "1.6 mm",
  "genderCode": "P",
  "gender": "公端",
  "panelCode": "M",
  "panelMount": "穿板",
  "valvedCode": "V",
  "valved": "带阀",
  "shapeCode": "S",
  "shape": "直通",
  "housingCode": "AC",
  "housingMaterial": "POM",
  "sealingCode": "N",
  "sealingRingMaterial": "NBR",
  "needDrawing": true,
  "needModel3d": true,
  "detailHref": "/products/fittings/quick-connect-fittings",
  "href": "/products/fittings/quick-connect-fittings"
}
```

#### quickConnectFittingFilterLabels

- 数量：7
- 首条字段：categoryId、productTypeId、filterKey、label、inputType、sortOrder、visible

```json
{
  "categoryId": "fittings",
  "productTypeId": "quick-connect-fittings",
  "filterKey": "filter01",
  "label": {
    "zh": "产品系列",
    "en": "Product Series",
    "es": "Product Series",
    "fr": "Product Series",
    "ko": "Product Series",
    "ru": "Product Series"
  },
  "inputType": "multiple",
  "sortOrder": 10,
  "visible": true
}
```

#### quickConnectFittingTaxonomyItems

- 数量：4
- 首条字段：type、id、label、sortOrder

```json
{
  "type": "productType",
  "id": "quick-connect-fittings",
  "label": {
    "zh": "快插接头",
    "en": "Quick-connect Fittings",
    "es": "Quick-connect Fittings",
    "fr": "Quick-connect Fittings",
    "ko": "Quick-connect Fittings",
    "ru": "Quick-connect Fittings"
  },
  "sortOrder": 440
}
```

## 2. 详情数据模板

### data/products/generated/fittings/barbed-fittings/detail/index.json

- 数量：166
- 首条字段：sourceType、category、categoryId、categoryLabel、productTypeId、productTypeName、productId、productCode、seriesId、seriesName、slug、model、name、title、displayName、productName、modelDisplay、displayModel、foreachModel、description、shortDescription、heroDescription、commonApplications、mainImage、image、imagePath、imageUrl、heroImage、imageCard、additionalImages、images、thumbnails、imageAlt、detailMode、hideModelAction、showConfigurator、showDatasheetRequest、showDrawingRequest、show3DRequest、specs、specifications、specGroups、faqs、faq、detailHref、href、selectionHref、contactHref、bottomCta、seo、sectionTitleMap、sourceIndex

```json
{
  "sourceType": "fitting-detail",
  "category": "fittings",
  "categoryId": "fittings",
  "categoryLabel": "接头系列",
  "productTypeId": "barbed-fittings",
  "productTypeName": "直通等径倒刺接头",
  "productId": "809276",
  "productCode": "809276",
  "seriesId": "barbed-fittings",
  "seriesName": "直通等径倒刺接头",
  "slug": "ba-16f-pp-n",
  "model": "BA-16F-PP-N",
  "name": "直通等径倒刺接头",
  "title": "直通等径倒刺接头",
  "displayName": "直通等径倒刺接头",
  "productName": "直通等径倒刺接头",
  "modelDisplay": "BA-16F-PP-N",
  "displayModel": "BA-16F-PP-N",
  "foreachModel": "BA-16F-PP-N",
  "description": "BA-16F-PP-N是一款直通等径倒刺接头，用于同一规格软管的直线连接和管路延长。两端均适配1.6 mm内径软管，适合仪器内部需要保持直线走管的连接位置。采用PP材质，颜色为本色。选型时应结合软管材质、硬度、尺寸公差及实际装配要求确认匹配性。",
  "shortDescription": "BA-16F-PP-N是一款直通等径倒刺接头，用于同一规格软管的直线连接和管路延长。两端均适配1.6 mm内径软管，适合仪器内部需要保持直线走管的连接位置。采用PP材质，颜色为本色。选型时应结合软管材质、硬度、尺寸公差及实际装配要求确认匹配性。",
  "heroDescription": "BA-16F-PP-N是一款直通等径倒刺接头，用于同一规格软管的直线连接和管路延长。两端均适配1.6 mm内径软管，适合仪器内部需要保持直线走管的连接位置。采用PP材质，颜色为本色。选型时应结合软管材质、硬度、尺寸公差及实际装配要求确认匹配性。",
  "commonApplications": [
    "同规格软管直线连接",
    "仪器内部管路延长",
    "泵阀与软管连接",
    "液路直线转接"
  ],
  "mainImage": "/images/products/fittings/barbed-fittings/products/ba-16f-pp-n-main.jpg",
  "image": "/images/logo/foreach-logo-color.svg",
  "imagePath": "/images/logo/foreach-logo-color.svg",
  "imageUrl": "/images/logo/foreach-logo-color.svg",
  "heroImage": "/images/logo/foreach-logo-color.svg",
  "imageCard": "/images/logo/foreach-logo-color.svg",
  "additionalImages": [],
  "images": [],
  "thumbnails": [],
  "imageAlt": "BA-16F-PP-N 直通等径倒刺接头",
  "detailMode": "standard_model",
  "hideModelAction": false,
  "showConfigurator": false,
  "showDatasheetRequest": false,
  "showDrawingRequest": true,
  "show3DRequest": false,
  "specs": [
    {
      "label": "型号",
      "value": "BA-16F-PP-N"
    },
    {
      "label": "商品编码",
      "value": "809276"
    },
    {
      "label": "产品类别",
      "value": "倒刺接头"
    },
    {
      "label": "产品结构",
      "value": "直通型"
    },
    {
      "label": "接口形式",
      "value": "2通等径"
    },
    {
      "label": "接管内径",
      "value": "1.6 mm"
    },
    {
      "label": "材质",
      "value": "PP"
    },
    {
      "label": "颜色",
      "value": "本色"
    }
  ],
  "specifications": [
    {
      "label": "型号",
      "value": "BA-16F-PP-N"
    },
    {
      "label": "商品编码",
      "value": "809276"
    },
    {
      "label": "产品类别",
      "value": "倒刺接头"
    },
    {
      "label": "产品结构",
      "value": "直通型"
    },
    {
      "label": "接口形式",
      "value": "2通等径"
    },
    {
      "label": "接管内径",
      "value": "1.6 mm"
    },
    {
      "label": "材质",
      "value": "PP"
    },
    {
      "label": "颜色",
      "value": "本色"
    }
  ],
  "specGroups": [
    {
      "title": "技术参数",
      "items": [
        {
          "label": "型号",
          "value": "BA-16F-PP-N"
        },
        {
          "label": "商品编码",
          "value": "809276"
        },
        {
          "label": "产品类别",
          "value": "倒刺接头"
        },
        {
          "label": "产品结构",
          "value": "直通型"
        },
        {
          "label": "接口形式",
          "value": "2通等径"
        },
        {
          "label": "接管内径",
          "value": "1.6 mm"
        },
        {
          "label": "材质",
          "value": "PP"
        },
        {
          "label": "颜色",
          "value": "本色"
        }
      ]
    }
  ],
  "faqs": [
    {
      "question": "BA-16F-PP-N适配什么规格的软管？",
      "answer": "适用1.6 mm内径软管。选型时应以软管实际内径及装配匹配情况为准。"
    },
    {
      "question": "直通等径倒刺接头的等径和异径如何区分？",
      "answer": "各接管端内径规格相同的为等径结构，不同接管端采用不同内径规格的为异径结构。"
    },
    {
      "question": "倒刺接头尺寸对应软管内径还是外径？",
      "answer": "本页面接管尺寸按适配软管内径显示，实际装配前应同时确认软管材质、硬度和尺寸公差。"
    },
    {
      "question": "PP材质是否适合当前介质？",
      "answer": "需要结合输送介质、工作温度、压力和清洁要求确认，无法确定时请提交工况由工程师协助核对。"
    },
    {
      "question": "BA-16F-PP-N是否可以申请2D图纸？",
      "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
    }
  ],
  "faq": [
    {
      "question": "BA-16F-PP-N适配什么规格的软管？",
      "answer": "适用1.6 mm内径软管。选型时应以软管实际内径及装配匹配情况为准。"
    },
    {
      "question": "直通等径倒刺接头的等径和异径如何区分？",
      "answer": "各接管端内径规格相同的为等径结构，不同接管端采用不同内径规格的为异径结构。"
    },
    {
      "question": "倒刺接头尺寸对应软管内径还是外径？",
      "answer": "本页面接管尺寸按适配软管内径显示，实际装配前应同时确认软管材质、硬度和尺寸公差。"
    },
    {
      "question": "PP材质是否适合当前介质？",
      "answer": "需要结合输送介质、工作温度、压力和清洁要求确认，无法确定时请提交工况由工程师协助核对。"
    },
    {
      "question": "BA-16F-PP-N是否可以申请2D图纸？",
      "answer": "可以将当前型号加入清单并添加图纸需求，由工程师确认对应版本后提供。"
    }
  ],
  "detailHref": "/products/fittings/barbed-fittings/ba-16f-pp-n",
  "href": "/products/fittings/barbed-fittings/ba-16f-pp-n",
  "selectionHref": "/products/fittings/barbed-fittings",
  "contactHref": "/contact",
  "bottomCta": {
    "title": "需要确认倒刺接头规格？",
    "description": "提交软管内径、产品结构、材质、颜色及使用工况，由工程师协助确认标准型号或定制方案。",
    "buttonText": "联系工程师",
    "href": "/contact"
  },
  "seo": {
    "title": "BA-16F-PP-N 直通等径倒刺接头 | FOREACH",
    "description": "BA-16F-PP-N是一款直通等径倒刺接头，用于同一规格软管的直线连接和管路延长。两端均适配1.6 mm内径软管，适合仪器内部需要保持直线走管的连接位置。采用PP材质，颜色为本色。选型时应结合软管材质、硬度、尺寸公差及实际装配要求确认匹配性。"
  },
  "sectionTitleMap": {
    "specification": "规格参数",
    "applications": "常见应用",
    "faq": "常见问题"
  },
  "sourceIndex": 0
}
```

### data/products/generated/fittings/quick-connect-fittings/detail/index.json

- 数量：191
- 首条字段：sourceType、category、categoryId、categoryLabel、productTypeId、productTypeName、productTypeLabel、productId、productCode、seriesId、seriesName、slug、model、name、title、displayName、productName、modelDisplay、displayModel、foreachModel、description、shortDescription、heroDescription、advantages、commonApplications、mainImage、image、imagePath、imageUrl、heroImage、imageCard、additionalImages、images、thumbnails、imageAlt、mainImageAlt、detailMode、hideModelAction、showConfigurator、showDatasheetRequest、showDrawingRequest、show3DRequest、drawing2dUrl、drawingPdfUrl、resources、specSeriesKey、specs、specifications、specGroups、faqs、faq、detailHref、href、selectionHref、contactHref、bottomCta、seo、sectionTitleMap、sourceIndex

```json
{
  "sourceType": "fitting-detail",
  "category": "fittings",
  "categoryId": "fittings",
  "categoryLabel": "接头系列",
  "productTypeId": "quick-connect-fittings",
  "productTypeName": "Q20公端直通带阀快插接头",
  "productTypeLabel": "快插接头",
  "productId": "839041",
  "productCode": "839041",
  "seriesId": "q20",
  "seriesName": "Q20",
  "slug": "q2001-pmv-sacn",
  "model": "Q2001-PMV-SACN",
  "name": "Q20公端直通带阀快插接头",
  "title": "Q20公端直通带阀快插接头",
  "displayName": "Q20公端直通带阀快插接头",
  "productName": "Q20公端直通带阀快插接头",
  "modelDisplay": "Q2001-PMV-SACN",
  "displayModel": "Q2001-PMV-SACN",
  "foreachModel": "Q2001-PMV-SACN",
  "description": "Q2001-PMV-SACN是一款Q20公端直通带阀快插接头，适配1.6 mm接管内径，采用POM外壳和NBR密封圈，支持穿板安装。适用于需要快速拆装的设备液路连接，并可在接头断开时关闭流路。",
  "shortDescription": "Q2001-PMV-SACN是一款Q20公端直通带阀快插接头，适配1.6 mm接管内径，采用POM外壳和NBR密封圈，支持穿板安装。适用于需要快速拆装的设备液路连接，并可在接头断开时关闭流路。",
  "heroDescription": "Q2001-PMV-SACN是一款Q20公端直通带阀快插接头，适配1.6 mm接管内径，采用POM外壳和NBR密封圈，支持穿板安装。适用于需要快速拆装的设备液路连接，并可在接头断开时关闭流路。",
  "advantages": [
    "适配1.6 mm接管内径",
    "带阀",
    "可穿板安装",
    "POM外壳材质"
  ],
  "commonApplications": [
    "IVD设备内部液路",
    "分析仪器液路模块",
    "设备面板液路接口",
    "需断开关闭流路的连接点"
  ],
  "mainImage": "/images/products/fittings/quick-connect-fittings/products/q2001-pmv-sacn-main.jpg",
  "image": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
  "imagePath": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
  "imageUrl": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
  "heroImage": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
  "imageCard": "/images/resources/selection-support/fitting-replacement/q20/products/Q2001-PMV-SACN.webp",
  "additionalImages": [],
  "images": [],
  "thumbnails": [],
  "imageAlt": "Q2001-PMV-SACN Q20公端直通带阀快插接头",
  "mainImageAlt": "Q2001-PMV-SACN Q20公端直通带阀快插接头",
  "detailMode": "standard_model",
  "hideModelAction": false,
  "showConfigurator": false,
  "showDatasheetRequest": false,
  "showDrawingRequest": true,
  "show3DRequest": false,
  "drawing2dUrl": "",
  "drawingPdfUrl": "",
  "resources": {},
  "specSeriesKey": "q20",
  "specs": [
    {
      "label": "型号",
      "value": "Q2001-PMV-SACN"
    },
    {
      "label": "商品编码",
      "value": "839041"
    },
    {
      "label": "产品类别",
      "value": "快插接头"
    },
    {
      "label": "产品系列",
      "value": "Q20"
    },
    {
      "label": "接管内径",
      "value": "1.6 mm"
    },
    {
      "label": "公母端",
      "value": "公端"
    },
    {
      "label": "安装方式",
      "value": "穿板"
    },
    {
      "label": "阀门配置",
      "value": "带阀"
    },
    {
      "label": "形状",
      "value": "直通"
    },
    {
      "label": "外壳材质",
      "value": "POM"
    },
    {
      "label": "密封圈材质",
      "value": "NBR"
    }
  ],
  "specifications": [
    {
      "label": "型号",
      "value": "Q2001-PMV-SACN"
    },
    {
      "label": "商品编码",
      "value": "839041"
    },
    {
      "label": "产品类别",
      "value": "快插接头"
    },
    {
      "label": "产品系列",
      "value": "Q20"
    },
    {
      "label": "接管内径",
      "value": "1.6 mm"
    },
    {
      "label": "公母端",
      "value": "公端"
    },
    {
      "label": "安装方式",
      "value": "穿板"
    },
    {
      "label": "阀门配置",
      "value": "带阀"
    },
    {
      "label": "形状",
      "value": "直通"
    },
    {
      "label": "外壳材质",
      "value": "POM"
    },
    {
      "label": "密封圈材质",
      "value": "NBR"
    }
  ],
  "specGroups": [
    {
      "title": "技术参数",
      "items": [
        {
          "label": "型号",
          "value": "Q2001-PMV-SACN"
        },
        {
          "label": "商品编码",
          "value": "839041"
        },
        {
          "label": "产品类别",
          "value": "快插接头"
        },
        {
          "label": "产品系列",
          "value": "Q20"
        },
        {
          "label": "接管内径",
          "value": "1.6 mm"
        },
        {
          "label": "公母端",
          "value": "公端"
        },
        {
          "label": "安装方式",
          "value": "穿板"
        },
        {
          "label": "阀门配置",
          "value": "带阀"
        },
        {
          "label": "形状",
          "value": "直通"
        },
        {
          "label": "外壳材质",
          "value": "POM"
        },
        {
          "label": "密封圈材质",
          "value": "NBR"
        }
      ]
    }
  ],
  "faqs": [
    {
      "question": "Q2001-PMV-SACN适配什么接口？",
      "answer": "适配1.6 mm接管内径。选型时还需要同时确认公母端、阀门配置和设备安装方式。"
    },
    {
      "question": "Q2001-PMV-SACN是带阀还是不带阀？",
      "answer": "该型号为带阀结构。带阀型号在接头断开时可以关闭流路，不带阀型号断开后流路保持开放。"
    },
    {
      "question": "Q20公端直通带阀快插接头是否支持穿板安装？",
      "answer": "该型号支持穿板安装，适用于设备面板、机壳或固定支架上的接口布置。"
    },
    {
      "question": "POM材质是否适合当前介质？",
      "answer": "需要结合输送介质、工作温度、压力、清洁要求和密封圈材质综合确认，无法确定时请提交工况由工程师协助核对。"
    },
    {
      "question": "Q2001-PMV-SACN是否可以申请二维图纸？",
      "answer": "可以将当前型号加入清单并添加图纸需求，由工程师核对商品编码和资料版本后提供。"
    }
  ],
  "faq": [
    {
      "question": "Q2001-PMV-SACN适配什么接口？",
      "answer": "适配1.6 mm接管内径。选型时还需要同时确认公母端、阀门配置和设备安装方式。"
    },
    {
      "question": "Q2001-PMV-SACN是带阀还是不带阀？",
      "answer": "该型号为带阀结构。带阀型号在接头断开时可以关闭流路，不带阀型号断开后流路保持开放。"
    },
    {
      "question": "Q20公端直通带阀快插接头是否支持穿板安装？",
      "answer": "该型号支持穿板安装，适用于设备面板、机壳或固定支架上的接口布置。"
    },
    {
      "question": "POM材质是否适合当前介质？",
      "answer": "需要结合输送介质、工作温度、压力、清洁要求和密封圈材质综合确认，无法确定时请提交工况由工程师协助核对。"
    },
    {
      "question": "Q2001-PMV-SACN是否可以申请二维图纸？",
      "answer": "可以将当前型号加入清单并添加图纸需求，由工程师核对商品编码和资料版本后提供。"
    }
  ],
  "detailHref": "/products/fittings/quick-connect-fittings/q2001-pmv-sacn",
  "href": "/products/fittings/quick-connect-fittings/q2001-pmv-sacn",
  "selectionHref": "/products/fittings/quick-connect-fittings",
  "contactHref": "/contact",
  "bottomCta": {
    "title": "需要确认快插接头型号？",
    "description": "提交接口尺寸、公母端、阀门配置、安装方式、材质及使用工况，由工程师协助确认标准型号。",
    "buttonText": "联系工程师",
    "href": "/contact"
  },
  "seo": {
    "title": "Q2001-PMV-SACN Q20公端直通带阀快插接头 | FOREACH",
    "description": "Q2001-PMV-SACN是一款Q20公端直通带阀快插接头，适配1.6 mm接管内径，采用POM外壳和NBR密封圈，支持穿板安装。适用于需要快速拆装的设备液路连接，并可在接头断开时关闭流路。"
  },
  "sectionTitleMap": {
    "specification": "规格参数",
    "applications": "常见应用",
    "faq": "常见问题"
  },
  "sourceIndex": 35
}
```

## 3. 类型、选型汇总与详情路由

### components/products/selection/product-selection-ui.types.ts

```tsx
    1 | ﻿import type {
    2 |   ProductSelectionProduct,
    3 |   SelectionFilterKey,
    4 | } from "@/data/products/selection/product-selection.types";
    5 | 
    6 | export type ProductSelectionCategoryItem = {
    7 |   id: string;
    8 |   label: string;
    9 |   description: string;
   10 |   sortOrder: number;
   11 | };
   12 | 
   13 | export type ProductSelectionFilterOption = {
   14 |   value: string;
   15 |   label: string;
   16 | };
   17 | 
   18 | export type ProductSelectionFilterGroup = {
   19 |   key: "productType" | SelectionFilterKey;
   20 |   title: string;
   21 |   inputType: "single" | "multiple";
   22 |   options: ProductSelectionFilterOption[];`r`n  layout?: "one" | "two" | "three";
   23 | };
   24 | 
   25 | export type ProductSelectionSelectedTag = {
   26 |   key: "productType" | SelectionFilterKey;
   27 |   value: string;
   28 |   label: string;
   29 | };
   30 | 
   31 | export type ProductSelectionProductItem = ProductSelectionProduct;
   32 | 
   33 | export type ProductSelectionPageText = {
   34 |   breadcrumbHome: string;
   35 |   breadcrumbCurrent: string;
   36 |   searchPlaceholder: string;
   37 |   searchButton: string;
   38 |   mobileCategoryPrefix: string;
   39 |   productTypeLabel: string;
   40 |   resultPrefix: string;
   41 |   resultSuffix: string;
   42 |   resetFilters: string;
   43 |   submitRequirement: string;
   44 |   detailButton: string;
   45 |   addToList: string;
   46 |   addedToList: string;
   47 |   previousPage: string;
   48 |   nextPage: string;
   49 |   filterEmpty: string;
   50 |   emptyTitle: string;
   51 |   emptyDescription: string;
   52 | };
   53 | 
```

### components/products/selection/ProductSelectionClient.tsx

```tsx
   11 |   getProductTypeFilterOptionsByCategory,
   12 |   getProductTypeHrefByIds,
   13 |   getSeriesFilterOptionsByProductType,
   14 |   getSeriesHrefByFilterValue,
   15 |   hasProductTypeRouteByIds,
   16 | } from "@/data/products/selection/product-route-map";
   17 | import { getProductTypeIntroByIds } from "@/data/products/selection/product-type-intro";
   18 | import { getProductFilterOptions } from "@/data/products/selection/filter-rules/product-filter-rules.index";
   19 | import {
   20 |   selectionFilterLabels as baseSelectionFilterLabels,
   21 |   selectionProducts as baseSelectionProducts,
   22 |   selectionTaxonomyItems as baseSelectionTaxonomyItems,
   23 | } from "@/data/products/selection/product-selection.generated";
   24 | import {
   25 |   diaphragmPumpSelectionProducts,
   26 |   diaphragmPumpTaxonomyItems,
   27 |   diaphragmPumpFilterLabels,
   28 | } from "@/data/products/selection/diaphragm-pump-selection.generated";
   29 | import {
   30 |   pipettingPumpSelectionProducts,
   31 |   pipettingPumpFilterLabels,
   32 | } from "@/data/products/selection/pipetting-pump-selection.generated";
   33 | import {
   34 |   valvelessPumpSelectionProducts,
   35 |   valvelessPumpFilterLabels,
   36 | } from "@/data/products/selection/valveless-pump-selection.generated";
   37 | import {
   38 |   valveSelectionProducts,
   39 |   valveFilterLabels,
   40 | } from "@/data/products/selection/valve-selection.generated";
   41 | import {
   42 |   probeSelectionProducts,
   43 |   probeFilterLabels,
```

```tsx
   46 | import { plungerPumpDetails as plungerPumpDetails } from "@/data/products/detail/plunger-pump-detail.generated";
   47 | 
   48 | import { tubingSelectionProducts } from "@/data/products/selection/tubing-selection.generated";
   49 | import {
   50 |   hardTubeFittingFilterLabels,
   51 |   hardTubeFittingSelectionProducts,
   52 |   hardTubeFittingTaxonomyItems,
   53 | } from "@/data/products/selection/hard-tube-fitting-selection.generated";
   54 | import {
   55 |   barbedFittingFilterLabels,
   56 |   barbedFittingSelectionProducts,
   57 |   barbedFittingTaxonomyItems,
   58 | } from "@/data/products/selection/barbed-fitting-selection.generated";
   59 | import {
   60 |   quickConnectFittingFilterLabels,
   61 |   quickConnectFittingSelectionProducts,
   62 |   quickConnectFittingTaxonomyItems,
   63 | } from "@/data/products/selection/quick-connect-fitting-selection.generated";
   64 | import {
   65 |   threadToBarbedFittingFilterLabels,
   66 |   threadToBarbedFittingSelectionProducts,
   67 |   threadToBarbedFittingTaxonomyItems,
   68 | } from "@/data/products/selection/thread-to-barbed-fitting-selection.generated";
   69 | 
   70 | import {
   71 |   luerFittingSelectionFilterLabels,
   72 |   luerFittingSelectionProducts,
   73 |   luerFittingSelectionTaxonomyItems,
   74 | } from "@/data/products/selection/luer-fitting-selection.generated";
   75 | 
   76 | import {
   77 |   femaleThreadAdapterFilterLabels,
   78 |   femaleThreadAdapterSelectionProducts,
   79 |   femaleThreadAdapterTaxonomyItems,
   80 | } from "@/data/products/selection/female-thread-adapter-selection.generated";
   81 | 
   82 | import {
   83 |   threadToBarbedDetailHrefByModel,
   84 |   threadToBarbedDetailHrefByProductCode,
   85 | } from "@/data/products/selection/thread-to-barbed-detail-route-map.generated";
   86 | 
   87 | import ProductCardGrid from "./ProductCardGrid";
   88 | import ProductCategoryTabs from "./ProductCategoryTabs";
   89 | import ProductEmptyState from "./ProductEmptyState";
   90 | import ProductFilterPanel from "./ProductFilterPanel";
```

```tsx
  104 |   SelectionLocale,
  105 | } from "@/data/products/selection/product-selection.types";
  106 | 
  107 | import type {
  108 |   ProductSelectionCategoryItem,
  109 |   ProductSelectionFilterGroup,
  110 |   ProductSelectionSelectedTag,
  111 | } from "./product-selection-ui.types";
  112 | import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
  113 | 
  114 | const selectionProducts = [
  115 |     ...femaleThreadAdapterSelectionProducts,
  116 | ...luerFittingSelectionProducts,
  117 |     ...quickConnectFittingSelectionProducts,
  118 |   ...threadToBarbedFittingSelectionProducts,
  119 | ...baseSelectionProducts,
  120 |   ...diaphragmPumpSelectionProducts,
  121 |   ...pipettingPumpSelectionProducts,
  122 |   ...valvelessPumpSelectionProducts,
  123 |   ...valveSelectionProducts,
  124 |   ...probeSelectionProducts,
  125 |   ...tubingSelectionProducts,
  126 |   ...hardTubeFittingSelectionProducts,
  127 |   ...barbedFittingSelectionProducts,
  128 |   ...syringePumpSelectionProducts,
  129 |   ...controlModuleSelectionProducts,
  130 | ].filter((product, index, array) => {
  131 |   return index === array.findIndex((item) => item.productId === product.productId);
  132 | });
  133 | 
  134 | const selectionTaxonomyItems = [
  135 |     ...femaleThreadAdapterTaxonomyItems,
  136 | ...luerFittingSelectionTaxonomyItems,
  137 |     ...quickConnectFittingTaxonomyItems,
  138 |   ...threadToBarbedFittingTaxonomyItems,
  139 | ...baseSelectionTaxonomyItems,
  140 |   ...hardTubeFittingTaxonomyItems,
  141 |   ...barbedFittingTaxonomyItems,
  142 |   ...diaphragmPumpTaxonomyItems,
  143 |   ...controlModuleTaxonomyItems,
  144 | ].filter((item, index, array) => {
  145 |   return index === array.findIndex((entry) => entry.id === item.id);
  146 | });
  147 | 
  148 | const selectionFilterLabels = [
  149 |     ...femaleThreadAdapterFilterLabels,
```

```tsx
  407 | function getProductsByCategory(categoryId: string) {
  408 |   
  409 |   /*
  410 |     TUBING_GET_PRODUCTS_BY_CATEGORY_20260707
  411 |     管路系列直接返回 6 张材料卡片。
  412 |   */
  413 |   if (String(arguments[0] || "") === "tubing") {
  414 |     return tubingSelectionProducts;
  415 |   }
  416 | 
  417 | return selectionProducts
  418 |     .filter((product) => product.categoryId === categoryId)
  419 |     .filter((product, index, array) => {
  420 |       return (
  421 |         index ===
  422 |         array.findIndex((item) => item.productId === product.productId)
  423 |       );
  424 |     });
  425 | }
  426 | 
  427 | function getFirstProductTypeId(categoryId: string) {
  428 |   
  429 |   /*
  430 |     TUBING_GET_FIRST_PRODUCT_TYPE_20260707
  431 |   */
  432 |   if (String(arguments[0] || "") === "tubing") {
  433 |     return "tubing";
  434 |   }
  435 | 
  436 | const products = getProductsByCategory(categoryId);
  437 |   const first = products[0];
  438 | 
  439 |   if (first?.productTypeId) {
```

### app/products/[category]/[slug]/[seriesSlug]/page.tsx

```tsx
   18 | import ProductDetailClient from "@/components/products/detail/ProductDetailClient";
   19 | import ProductSelectionClient from "@/components/products/selection/ProductSelectionClient";
   20 | 
   21 | import {
   22 |   getSeriesRouteParams,
   23 |   resolveSeriesRoute,
   24 | } from "@/data/products/selection/product-route-map";
   25 | 
   26 | import hardTubeDetailsJson from "@/data/products/generated/fittings/hard-tube-fittings/detail/index.json";
   27 | 
   28 | import threadToBarbedDetailsJson from "@/data/products/generated/fittings/thread-to-barbed-fittings/detail/index.json";
   29 | 
   30 | import luerDetailsJson from "@/data/products/generated/fittings/luer-fittings/detail/index.json";
   31 | 
   32 | import femaleThreadDetailsJson from "@/data/products/generated/fittings/female-thread-adapters/detail/index.json";
   33 | 
   34 | import "../../../products.css";
   35 | 
   36 | type ProductsSeriesRoutePageProps = {
   37 |   params: Promise<{
   38 |     category: string;
   39 |     slug: string;
   40 |     seriesSlug: string;
   41 |   }>;
   42 | };
   43 | 
   44 | type FittingDetailRecord = {
   45 |   slug: string;
   46 |   model: string;
   47 | 
   48 |   title?: string;
   49 |   name?: string;
   50 |   description?: string;
```

```tsx
  135 |   return (
  136 |     details.find(
  137 |       (item) =>
  138 |         normalizeSegment(
  139 |           item.slug
  140 |         ) === targetSlug
  141 |     ) || null
  142 |   );
  143 | }
  144 | 
  145 | function findFittingDetail(
  146 |   category: string,
  147 |   slug: string,
  148 |   seriesSlug: string
  149 | ): ResolvedFittingDetail | null {
  150 |   if (category !== "fittings") {
  151 |     return null;
  152 |   }
  153 | 
  154 |   if (
  155 |     slug ===
  156 |     "hard-tube-fittings"
  157 |   ) {
  158 |     const detail =
  159 |       findDetailInCollection(
  160 |         hardTubeDetails,
  161 |         seriesSlug
  162 |       );
  163 | 
  164 |     return detail
  165 |       ? {
  166 |           detail,
  167 |           productTypeId:
  168 |             "hard-tube-fittings",
  169 |           fallbackName:
  170 |             "硬管接头",
  171 |         }
  172 |       : null;
  173 |   }
  174 | 
  175 |   if (
  176 |     slug ===
  177 |     "thread-to-barbed-fittings"
  178 |   ) {
  179 |     const detail =
  180 |       findDetailInCollection(
  181 |         threadToBarbedDetails,
  182 |         seriesSlug
  183 |       );
  184 | 
  185 |     return detail
  186 |       ? {
  187 |           detail,
  188 |           productTypeId:
  189 |             "thread-to-barbed-fittings",
  190 |           fallbackName:
  191 |             "螺纹转倒刺接头",
  192 |         }
  193 |       : null;
  194 |   }
  195 | 
  196 |   /* LUER_FEMALE_DETAIL_RESOLVE_START */
  197 | 
  198 |   if (
  199 |     category ===
  200 |       "fittings" &&
  201 |     slug ===
  202 |       "luer-fittings"
  203 |   ) {
  204 |     const detail =
  205 |       findDetailInCollection(
  206 |         luerDetails,
  207 |         seriesSlug
  208 |       );
  209 | 
  210 |     return detail
  211 |       ? {
```

```tsx
  378 |       `/products/fittings/${productTypeId}/${detail.slug}`,
  379 | 
  380 |     href:
  381 |       `/products/fittings/${productTypeId}/${detail.slug}`,
  382 | 
  383 |     selectionHref:
  384 |       `/products/fittings/${productTypeId}`,
  385 |   };
  386 | }
  387 | 
  388 | export function generateStaticParams() {
  389 |   const existingSeriesParams =
  390 |     getSeriesRouteParams();
  391 | 
  392 |   const hardTubeParams =
  393 |     hardTubeDetails.map(
  394 |       (detail) => ({
  395 |         category:
  396 |           "fittings",
  397 | 
  398 |         slug:
  399 |           "hard-tube-fittings",
  400 | 
  401 |         seriesSlug:
  402 |           normalizeSegment(
  403 |             detail.slug
  404 |           ),
  405 |       })
  406 |     );
  407 | 
  408 |   const threadToBarbedParams =
  409 |     threadToBarbedDetails.map(
  410 |       (detail) => ({
  411 |         category:
  412 |           "fittings",
  413 | 
  414 |         slug:
  415 |           "thread-to-barbed-fittings",
  416 | 
  417 |         seriesSlug:
  418 |           normalizeSegment(
  419 |             detail.slug
  420 |           ),
  421 |       })
  422 |     );
  423 | 
  424 |   const luerParams =
  425 |     luerDetails.map(
  426 |       (detail) => ({
  427 |         category:
  428 |           "fittings",
  429 | 
  430 |         slug:
  431 |           "luer-fittings",
  432 | 
  433 |         seriesSlug:
  434 |           normalizeSegment(
  435 |             detail.slug
  436 |           ),
  437 |       })
```

```tsx
  500 | export async function generateMetadata({
  501 |   params,
  502 | }: ProductsSeriesRoutePageProps): Promise<Metadata> {
  503 |   const {
  504 |     category,
  505 |     slug,
  506 |     seriesSlug,
  507 |   } = await params;
  508 | 
  509 |   const fittingDetail =
  510 |     findFittingDetail(
  511 |       category,
  512 |       slug,
  513 |       seriesSlug
  514 |     );
  515 | 
  516 |   if (fittingDetail) {
  517 |     const {
  518 |       detail,
  519 |       fallbackName,
  520 |     } = fittingDetail;
  521 | 
  522 |     return {
  523 |       title:
  524 |         detail.seo?.title ||
  525 |         `${detail.model} ${
  526 |           detail.name ||
  527 |           detail.title ||
  528 |           fallbackName
  529 |         } | FOREACH`,
  530 | 
  531 |       description:
  532 |         detail.seo?.description ||
```

```tsx
  558 | export default async function ProductsSeriesRoutePage({
  559 |   params,
  560 | }: ProductsSeriesRoutePageProps) {
  561 |   const {
  562 |     category,
  563 |     slug,
  564 |     seriesSlug,
  565 |   } = await params;
  566 | 
  567 |   const fittingDetail =
  568 |     findFittingDetail(
  569 |       category,
  570 |       slug,
  571 |       seriesSlug
  572 |     );
  573 | 
  574 |   if (fittingDetail) {
  575 |     return (
  576 |       <ProductDetailView
  577 |         data={
  578 |           toFittingClientData(
  579 |             fittingDetail
  580 |           )
  581 |         }
  582 |       />
  583 |     );
  584 |   }
  585 | 
  586 |   const route =
  587 |     resolveSeriesRoute(
  588 |       category,
  589 |       slug,
  590 |       seriesSlug
```

## 4. 正式生成口径

- Excel原始行：38
- 去除完全重复商业产品后：36个SKU
- 按型号归并后：34个详情页
- 无型号组件：使用商品编码作为页面标识
- 过滤器内部类型：`filters`
- 单向阀内部类型：`check-valves`
- 前台入口：过滤器与单向阀
- 通用PDF模糊匹配结果不得绑定

