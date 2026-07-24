/* =========================================================
   fitting-publication.generated.ts
   接头产品全站统一发布清单

   自动生成，请勿手动修改。
   生成脚本：
   scripts/products/generate-fitting-publication-manifest.ts
========================================================= */

export type FittingOfflineReason =
  | "FORCED_CODE_PREFIX"
  | "NOT_ACTIVE"
  | "PRODUCT_CODE_NOT_FOUND"
  | "PRODUCT_CODE_DUPLICATED"
  | "MODEL_MISMATCH"
  | "NO_MAIN_IMAGE"
  | "MAIN_IMAGE_MISSING"
  | "PLACEHOLDER_IMAGE"
  | "LOGO_IMAGE"
  | "SHARED_IMAGE";

export interface PublishedFittingProduct {
  productCode: string;
  foreachModel: string;
  imageCard: string;
  detailHref: string;
  productTypeId: string;
  productType: string;
  productSeries: string;
  seriesId: string;
}

export const FITTING_PUBLISHED_PRODUCTS: PublishedFittingProduct[] =
[
  {
    "productCode": "129001",
    "foreachModel": "CV-BE-32-PP-N",
    "imageCard": "/images/products/fittings/check-valves/products/cv-be-32-pp-n-main.jpg",
    "detailHref": "/products/fittings/check-valves/cv-be-32-pp-n",
    "productTypeId": "check-valves",
    "productType": "单向阀",
    "productSeries": "膜片式单向阀",
    "seriesId": "cv"
  },
  {
    "productCode": "139001",
    "foreachModel": "F-PE-100-32-PP-N",
    "imageCard": "/images/products/fittings/filters/products/f-pe-100-32-pp-n-main.jpg",
    "detailHref": "/products/fittings/filters/f-pe-100-32-pp-n",
    "productTypeId": "filters",
    "productType": "过滤器",
    "productSeries": "PE系列过滤器",
    "seriesId": "f"
  },
  {
    "productCode": "139003",
    "foreachModel": "F-PE-60-32-PP-N",
    "imageCard": "/images/products/fittings/filters/products/f-pe-60-32-pp-n-main.jpg",
    "detailHref": "/products/fittings/filters/f-pe-60-32-pp-n",
    "productTypeId": "filters",
    "productType": "过滤器",
    "productSeries": "PE系列过滤器",
    "seriesId": "f"
  },
  {
    "productCode": "809002",
    "foreachModel": "SB-U28-16-AC-B",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-u28-16-ac-b.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-u28-16-ac-b",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809013",
    "foreachModel": "SB-U28-40-AC-B",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-u28-40-ac-b.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-u28-40-ac-b",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809020",
    "foreachModel": "SB-M6-24-AC-B",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-m6-24-ac-b.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-m6-24-ac-b",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809027",
    "foreachModel": "SB-M6-40-AC-B",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-m6-40-ac-b.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-m6-40-ac-b",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809030",
    "foreachModel": "HFL-U28-16-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-16-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809032",
    "foreachModel": "HFL-M6-16-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-16-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809035",
    "foreachModel": "HFL-U28-32-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-32-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809037",
    "foreachModel": "HFL-M6-32-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-32-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809040",
    "foreachModel": "HFL-U28-20-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-20-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809041",
    "foreachModel": "HFL-U28-20-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-20-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-20-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809043",
    "foreachModel": "HFL-M6-20-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-20-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809044",
    "foreachModel": "HFL-M6-20-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-20-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-20-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809047",
    "foreachModel": "HFL-U28-30-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-30-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809048",
    "foreachModel": "HFL-M6-30-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-30-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809049",
    "foreachModel": "HFL-M6-30-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-30-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-30-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809052",
    "foreachModel": "HFL-U28-25-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-25-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809054",
    "foreachModel": "HFL-M6-25-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-25-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809058",
    "foreachModel": "HFL6-M6-16-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-16-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl6-m6-16-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809067",
    "foreachModel": "HFL6-U28-32-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-32-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl6-u28-32-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809068",
    "foreachModel": "HFL6-M6-32-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-32-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl6-m6-32-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809078",
    "foreachModel": "HFL6-M6-20-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-20-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl6-m6-20-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809087",
    "foreachModel": "HFL6-U28-30-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-30-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl6-u28-30-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809088",
    "foreachModel": "HFL6-M6-30-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-m6-30-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl6-m6-30-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809097",
    "foreachModel": "HFL6-U28-25-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hfl6-u28-25-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl6-u28-25-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809107",
    "foreachModel": "HNF-U28-16-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-16-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809108",
    "foreachModel": "HNF-M6-16-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-16-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809111",
    "foreachModel": "HNF-U28-32-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-32-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809112",
    "foreachModel": "HNF-M6-32-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-32-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809115",
    "foreachModel": "HNF-U28-20-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-20-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809116",
    "foreachModel": "HNF-M6-20-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-20-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809119",
    "foreachModel": "HNF-U28-30-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-30-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809120",
    "foreachModel": "HNF-M6-30-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-30-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809123",
    "foreachModel": "HNF-U28-25-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-25-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809124",
    "foreachModel": "HNF-M6-25-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-25-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809128",
    "foreachModel": "HNF6-M6-16-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-16-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf6-m6-16-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809130",
    "foreachModel": "LPS-16-PP-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-16-pp-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809137",
    "foreachModel": "HNF6-U28-32-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-32-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf6-u28-32-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809138",
    "foreachModel": "HNF6-M6-32-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-32-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf6-m6-32-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809139",
    "foreachModel": "LPS-32-PP-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-32-pp-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809140",
    "foreachModel": "LPS-32-PP-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-32-pp-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809148",
    "foreachModel": "HNF6-M6-20-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-20-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf6-m6-20-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809149",
    "foreachModel": "LPS-16-PP-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-16-pp-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809150",
    "foreachModel": "LPS-16-PP-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-16-pp-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809157",
    "foreachModel": "HNF6-U28-30-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-30-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf6-u28-30-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809158",
    "foreachModel": "HNF6-M6-30-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-30-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf6-m6-30-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809159",
    "foreachModel": "LPS-16-PP-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-16-pp-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809160",
    "foreachModel": "LPS-16-PP-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-16-pp-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809167",
    "foreachModel": "HNF6-U28-25-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-u28-25-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf6-u28-25-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809168",
    "foreachModel": "HNF6-M6-25-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hnf6-m6-25-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf6-m6-25-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809169",
    "foreachModel": "LPS-16-PP-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-16-pp-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809170",
    "foreachModel": "LPS-16-PP-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-16-pp-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809188",
    "foreachModel": "LPS-24-PP-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-24-pp-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809194",
    "foreachModel": "U-M6-20-AC-B",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/U-M6-20-AC-B.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/u-m6-20-ac-b",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "u",
    "seriesId": "u"
  },
  {
    "productCode": "809195",
    "foreachModel": "U-U28-20-PP-N",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/U-U28-20-PP-N.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/u-u28-20-pp-n",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "u",
    "seriesId": "u"
  },
  {
    "productCode": "809197",
    "foreachModel": "U-M6-20-PP-N",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/U-M6-20-PP-N.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/u-m6-20-pp-n",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "u",
    "seriesId": "u"
  },
  {
    "productCode": "809255",
    "foreachModel": "LP-16D-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-16d-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809256",
    "foreachModel": "LP-16D-PA-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-16d-pa-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809257",
    "foreachModel": "LP-16D-PA-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-16d-pa-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809259",
    "foreachModel": "LP-16D-PA-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-16d-pa-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809260",
    "foreachModel": "LPS-24-PP-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-24-pp-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809261",
    "foreachModel": "LPS-24-PP-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-24-pp-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809269",
    "foreachModel": "SA-U32-32F-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-32f-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809270",
    "foreachModel": "LPS-24-PP-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-24-pp-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809271",
    "foreachModel": "LPS-24-PP-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-24-pp-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809272",
    "foreachModel": "LPS-24-PP-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-24-pp-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809273",
    "foreachModel": "LPS-24-PP-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-24-pp-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809274",
    "foreachModel": "LPS-32-PP-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-32-pp-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809275",
    "foreachModel": "LPS-32-PP-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-32-pp-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809276",
    "foreachModel": "BA-16F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809277",
    "foreachModel": "BA-24F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809278",
    "foreachModel": "BA-32F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-32f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-32f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809279",
    "foreachModel": "BA-40F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-40f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-40f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809280",
    "foreachModel": "LPS-32-PP-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-32-pp-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809281",
    "foreachModel": "LPS-32-PP-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-32-pp-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809282",
    "foreachModel": "LPS-32-PP-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-32-pp-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809283",
    "foreachModel": "BBL-16D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-16d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bbl-16d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "倒刺堵头",
    "seriesId": "bbl"
  },
  {
    "productCode": "809284",
    "foreachModel": "BBL-24D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-24d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bbl-24d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "倒刺堵头",
    "seriesId": "bbl"
  },
  {
    "productCode": "809285",
    "foreachModel": "BBL-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bbl-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "倒刺堵头",
    "seriesId": "bbl"
  },
  {
    "productCode": "809287",
    "foreachModel": "BT-16D-24D-24D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-16d-24d-24d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-16d-24d-24d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809288",
    "foreachModel": "BA-16F-24F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16f-24f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16f-24f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809289",
    "foreachModel": "BA-24F-32F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24f-32f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24f-32f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809290",
    "foreachModel": "LPR-24-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809291",
    "foreachModel": "LPR-24-PA-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pa-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809292",
    "foreachModel": "SC-M6-16-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sc-m6-16-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sc-m6-16-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "内螺纹转倒刺接头",
    "seriesId": "sc"
  },
  {
    "productCode": "809293",
    "foreachModel": "SC-M6-32-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sc-m6-32-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sc-m6-32-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "内螺纹转倒刺接头",
    "seriesId": "sc"
  },
  {
    "productCode": "809294",
    "foreachModel": "BY-16F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-16f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-16f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809295",
    "foreachModel": "BY-24F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-24f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-24f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809296",
    "foreachModel": "BY-32F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-32f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-32f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809297",
    "foreachModel": "BY-40D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-40d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-40d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809298",
    "foreachModel": "BY-64F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-64f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-64f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809299",
    "foreachModel": "LPR-32-PA-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pa-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809300",
    "foreachModel": "BA-16C-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16c-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16c-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809301",
    "foreachModel": "SB-M5-16D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-m5-16d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809302",
    "foreachModel": "SBS-M6-24D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sbs-m6-24d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sbs"
  },
  {
    "productCode": "809303",
    "foreachModel": "SBS-M6-32D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sbs-m6-32d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sbs"
  },
  {
    "productCode": "809304",
    "foreachModel": "PMB-U28-16D-PP-N",
    "imageCard": "/images/products/fittings/bulkhead-barbed-fittings/products/pmb-u28-16d-pp-n-main.jpg",
    "detailHref": "/products/fittings/bulkhead-barbed-fittings/pmb-u28-16d-pp-n",
    "productTypeId": "bulkhead-barbed-fittings",
    "productType": "bulkhead-barbed-fittings",
    "productSeries": "[object Object]",
    "seriesId": "pmb"
  },
  {
    "productCode": "809308",
    "foreachModel": "UY-U28-10-PP-N",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/UY-U28-10-PP-N.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/uy-u28-10-pp-n",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "uy",
    "seriesId": "uy"
  },
  {
    "productCode": "809309",
    "foreachModel": "BT-16F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-16f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-16f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809310",
    "foreachModel": "BT-24F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-24f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-24f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809311",
    "foreachModel": "BT-32F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809312",
    "foreachModel": "LP-16D-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-16d-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809313",
    "foreachModel": "LP-24D-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-24d-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809314",
    "foreachModel": "LP-32D-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-32d-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809319",
    "foreachModel": "LP-16D-PA-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-16d-pa-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809320",
    "foreachModel": "LPR-16-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809321",
    "foreachModel": "BA-16F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809322",
    "foreachModel": "BA-16F-24F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16f-24f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16f-24f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809324",
    "foreachModel": "BA-24F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809325",
    "foreachModel": "BA-24F-32F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24f-32f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24f-32f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809326",
    "foreachModel": "BY-24F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-24f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-24f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809327",
    "foreachModel": "BT-24F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-24f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-24f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809328",
    "foreachModel": "BA-32F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-32f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-32f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809329",
    "foreachModel": "BA-40F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-40f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-40f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809330",
    "foreachModel": "BA-16F-32F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16f-32f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16f-32f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809331",
    "foreachModel": "LPR-16-PA-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pa-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809332",
    "foreachModel": "BA-16F-32F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16f-32f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16f-32f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809333",
    "foreachModel": "LPR-16-PA-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pa-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809334",
    "foreachModel": "BY-16F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-16f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-16f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809335",
    "foreachModel": "BY-32F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-32f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-32f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809336",
    "foreachModel": "BY-64F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-64f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-64f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809337",
    "foreachModel": "BT-16F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-16f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-16f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809338",
    "foreachModel": "BT-32F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809340",
    "foreachModel": "SA-U32-32F-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u32-32f-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-u32-32f-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809341",
    "foreachModel": "BY-48F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-48f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-48f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809342",
    "foreachModel": "LPR-16-PA-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pa-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809343",
    "foreachModel": "BY-48F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-48f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-48f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809344",
    "foreachModel": "LP-16D-PA-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-16d-pa-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809345",
    "foreachModel": "BL-16F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-16f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-16f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809346",
    "foreachModel": "BL-24F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-24f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-24f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809347",
    "foreachModel": "BL-32F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-32f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-32f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809348",
    "foreachModel": "BL-40F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-40f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-40f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809349",
    "foreachModel": "BL-64F-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-64f-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-64f-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809350",
    "foreachModel": "BL-95D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-95d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-95d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809351",
    "foreachModel": "LPR-16-PA-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pa-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809352",
    "foreachModel": "LPR-16-PA-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pa-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809353",
    "foreachModel": "LPR-16-PA-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PA-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pa-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809354",
    "foreachModel": "LP-16D-PA-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-16D-PA-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-16d-pa-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809355",
    "foreachModel": "LPR-24-PA-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pa-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809356",
    "foreachModel": "LPR-24-PA-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pa-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809357",
    "foreachModel": "BL-16F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-16f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-16f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809358",
    "foreachModel": "BL-24F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-24f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-24f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809359",
    "foreachModel": "BL-32F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-32f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-32f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809360",
    "foreachModel": "BL-40F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-40f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-40f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809361",
    "foreachModel": "BL-64F-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-64f-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-64f-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809362",
    "foreachModel": "BL-95D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-95d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-95d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809363",
    "foreachModel": "LPR-24-PA-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pa-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809364",
    "foreachModel": "LPR-24-PA-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pa-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809365",
    "foreachModel": "LPR-24-PA-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PA-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pa-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809366",
    "foreachModel": "LP-24D-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-24d-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809367",
    "foreachModel": "LPR-32-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809368",
    "foreachModel": "LPR-32-PA-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pa-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809369",
    "foreachModel": "BY-40D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-40d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-40d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809370",
    "foreachModel": "BA-32C-64C-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-32c-64c-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-32c-64c-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809371",
    "foreachModel": "BA-32C-64C-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-32c-64c-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-32c-64c-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809372",
    "foreachModel": "LPR-32-PA-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pa-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809373",
    "foreachModel": "LPR-32-PA-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pa-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809374",
    "foreachModel": "BA-32V-40V-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-32v-40v-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-32v-40v-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809375",
    "foreachModel": "BA-32V-40V-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-32v-40v-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-32v-40v-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809376",
    "foreachModel": "BA-24V-40V-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24v-40v-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24v-40v-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809377",
    "foreachModel": "BA-24V-40V-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24v-40v-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24v-40v-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809378",
    "foreachModel": "BA-64V-79V-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-64v-79v-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-64v-79v-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809379",
    "foreachModel": "BA-64V-79V-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-64v-79v-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-64v-79v-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809380",
    "foreachModel": "BY-24D-16D-16D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-24d-16d-16d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-24d-16d-16d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809381",
    "foreachModel": "BY-24D-16D-16D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-24d-16d-16d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-24d-16d-16d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809382",
    "foreachModel": "SAL-U32-16D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u32-16d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "L型螺纹密封螺纹转倒刺接头",
    "seriesId": "sal"
  },
  {
    "productCode": "809383",
    "foreachModel": "SAL-U32-16D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u32-16d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sal-u32-16d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "L型螺纹密封螺纹转倒刺接头",
    "seriesId": "sal"
  },
  {
    "productCode": "809384",
    "foreachModel": "SAL-U32-32D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u32-32d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "L型螺纹密封螺纹转倒刺接头",
    "seriesId": "sal"
  },
  {
    "productCode": "809385",
    "foreachModel": "SAL-U32-32D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u32-32d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sal-u32-32d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "L型螺纹密封螺纹转倒刺接头",
    "seriesId": "sal"
  },
  {
    "productCode": "809386",
    "foreachModel": "SAL-U28-16D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u28-16d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "L型螺纹密封螺纹转倒刺接头",
    "seriesId": "sal"
  },
  {
    "productCode": "809387",
    "foreachModel": "SAL-U28-16D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u28-16d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sal-u28-16d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "L型螺纹密封螺纹转倒刺接头",
    "seriesId": "sal"
  },
  {
    "productCode": "809388",
    "foreachModel": "SAL-U28-32D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u28-32d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "L型螺纹密封螺纹转倒刺接头",
    "seriesId": "sal"
  },
  {
    "productCode": "809389",
    "foreachModel": "SAL-U28-32D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sal-u28-32d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sal-u28-32d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "L型螺纹密封螺纹转倒刺接头",
    "seriesId": "sal"
  },
  {
    "productCode": "809391",
    "foreachModel": "HFL-U28-16-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-16-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-16-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809392",
    "foreachModel": "HFL-U28-25-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-25-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-25-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809393",
    "foreachModel": "HFL-U28-32-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-32-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-32-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809394",
    "foreachModel": "HFL-U28-30-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-u28-30-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-u28-30-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809395",
    "foreachModel": "HNF-U28-16-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-16-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-16-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809396",
    "foreachModel": "HNF-U28-25-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-25-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-25-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809397",
    "foreachModel": "HNF-U28-32-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-32-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-32-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809398",
    "foreachModel": "HNF-U28-20-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-20-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-20-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809399",
    "foreachModel": "HNF-U28-30-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-u28-30-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-u28-30-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809401",
    "foreachModel": "HNF-M6-16-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-16-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-16-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809402",
    "foreachModel": "LPR-32-PA-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pa-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809403",
    "foreachModel": "LPR-32-PA-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PA-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pa-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809406",
    "foreachModel": "BBL-16D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-16d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bbl-16d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "倒刺堵头",
    "seriesId": "bbl"
  },
  {
    "productCode": "809407",
    "foreachModel": "BBL-24D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-24d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bbl-24d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "倒刺堵头",
    "seriesId": "bbl"
  },
  {
    "productCode": "809408",
    "foreachModel": "BBL-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bbl-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bbl-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "倒刺堵头",
    "seriesId": "bbl"
  },
  {
    "productCode": "809410",
    "foreachModel": "BT-16D-24D-24D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-16d-24d-24d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-16d-24d-24d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809413",
    "foreachModel": "HNF-M6-25-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-25-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-25-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809414",
    "foreachModel": "HNF-M6-32-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-32-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-32-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809415",
    "foreachModel": "HNF-M6-20-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-20-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-20-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809416",
    "foreachModel": "HNF-M6-30-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hnf-m6-30-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hnf-m6-30-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809421",
    "foreachModel": "HFL-M6-16-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-16-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-16-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809422",
    "foreachModel": "HFL-M6-25-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-25-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-25-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809423",
    "foreachModel": "HFL-M6-32-PV-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hfl-m6-32-pv-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hfl-m6-32-pv-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809424",
    "foreachModel": "BA-64C-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-64c-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-64c-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809425",
    "foreachModel": "BA-64C-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-64c-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-64c-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809426",
    "foreachModel": "BA-64V-95V-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-64v-95v-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-64v-95v-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809427",
    "foreachModel": "BA-64V-95V-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-64v-95v-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-64v-95v-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809428",
    "foreachModel": "BA-64X-127X-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-64x-127x-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-64x-127x-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809429",
    "foreachModel": "BA-64X-127X-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-64x-127x-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-64x-127x-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809430",
    "foreachModel": "BY-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809431",
    "foreachModel": "BY-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809432",
    "foreachModel": "BY-95X-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-95x-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-95x-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809433",
    "foreachModel": "BY-95X-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-95x-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-95x-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809434",
    "foreachModel": "BY-32D-16D-16D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-32d-16d-16d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-32d-16d-16d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809435",
    "foreachModel": "BY-32D-16D-16D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-32d-16d-16d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-32d-16d-16d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809436",
    "foreachModel": "BY-64D-32D-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-64d-32d-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-64d-32d-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809437",
    "foreachModel": "BY-64D-32D-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-64d-32d-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-64d-32d-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809438",
    "foreachModel": "BT-40C-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-40c-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-40c-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809439",
    "foreachModel": "BT-40C-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-40c-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-40c-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809440",
    "foreachModel": "BT-64C-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-64c-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-64c-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809441",
    "foreachModel": "BT-64C-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-64c-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-64c-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809442",
    "foreachModel": "BT-95X-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-95x-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-95x-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809443",
    "foreachModel": "BT-95X-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-95x-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-95x-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809444",
    "foreachModel": "BT-32D-32D-16D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-32d-16d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-32d-16d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809445",
    "foreachModel": "BT-32D-32D-16D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-32d-16d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-32d-16d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809446",
    "foreachModel": "BT-24D-24D-16D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-24d-24d-16d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-24d-24d-16d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809447",
    "foreachModel": "BT-24D-24D-16D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-24d-24d-16d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-24d-24d-16d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809448",
    "foreachModel": "BT-32D-32D-24D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-32d-24d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-32d-24d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809449",
    "foreachModel": "BT-32D-32D-24D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-32d-24d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-32d-24d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809450",
    "foreachModel": "BT-64D-64D-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-64d-64d-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-64d-64d-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809451",
    "foreachModel": "BT-64D-64D-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-64d-64d-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-64d-64d-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809452",
    "foreachModel": "BT-24D-32D-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-24d-32d-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-24d-32d-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809453",
    "foreachModel": "BT-24D-32D-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-24d-32d-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-24d-32d-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809454",
    "foreachModel": "BT-32D-16D-16D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-16d-16d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-16d-16d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809455",
    "foreachModel": "BT-32D-16D-16D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-16d-16d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-16d-16d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809456",
    "foreachModel": "BT-32D-24D-24D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-24d-24d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-24d-24d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809457",
    "foreachModel": "BT-32D-24D-24D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-24d-24d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-24d-24d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809458",
    "foreachModel": "BT-32D-64T-64T-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-64t-64t-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-64t-64t-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809459",
    "foreachModel": "BT-32D-64T-64T-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-64t-64t-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-64t-64t-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809460",
    "foreachModel": "BT-64V-95V-95V-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-64v-95v-95v-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-64v-95v-95v-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809461",
    "foreachModel": "BT-64V-95V-95V-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-64v-95v-95v-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-64v-95v-95v-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809462",
    "foreachModel": "PMB-U28-24D-PP-N",
    "imageCard": "/images/products/fittings/bulkhead-barbed-fittings/products/pmb-u28-24d-pp-n-main.jpg",
    "detailHref": "/products/fittings/bulkhead-barbed-fittings/pmb-u28-24d-pp-n",
    "productTypeId": "bulkhead-barbed-fittings",
    "productType": "bulkhead-barbed-fittings",
    "productSeries": "[object Object]",
    "seriesId": "pmb"
  },
  {
    "productCode": "809463",
    "foreachModel": "PMB-U28-32D-PP-N",
    "imageCard": "/images/products/fittings/bulkhead-barbed-fittings/products/pmb-u28-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/bulkhead-barbed-fittings/pmb-u28-32d-pp-n",
    "productTypeId": "bulkhead-barbed-fittings",
    "productType": "bulkhead-barbed-fittings",
    "productSeries": "[object Object]",
    "seriesId": "pmb"
  },
  {
    "productCode": "809465",
    "foreachModel": "SA-U28-16D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u28-16d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-u28-16d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809466",
    "foreachModel": "SA-U28-24D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u28-24d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809467",
    "foreachModel": "SA-U28-32D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u28-32d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809468",
    "foreachModel": "SA-U28-40D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u28-40d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809469",
    "foreachModel": "SA-U28-48D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u28-48d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809479",
    "foreachModel": "SB-M5-24D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-m5-24d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-m5-24d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809480",
    "foreachModel": "SB-M5-32D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-m5-32d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-m5-32d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809481",
    "foreachModel": "SB-M5-40D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-m5-40d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-m5-40d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809484",
    "foreachModel": "US-M6-05-AC-B",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/US-M6-05-AC-B.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/us-m6-05-ac-b",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "us",
    "seriesId": "us"
  },
  {
    "productCode": "809485",
    "foreachModel": "LP-24D-PA-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-24d-pa-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809486",
    "foreachModel": "LP-24D-PA-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-24d-pa-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809487",
    "foreachModel": "LP-24D-PA-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-24d-pa-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809488",
    "foreachModel": "LP-24D-PA-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-24d-pa-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809489",
    "foreachModel": "LP-24D-PA-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-24d-pa-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809491",
    "foreachModel": "UY-U28-15-PP-N",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/UY-U28-15-PP-N.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/uy-u28-15-pp-n",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "uy",
    "seriesId": "uy"
  },
  {
    "productCode": "809494",
    "foreachModel": "SA-U28-24D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u28-24d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-u28-24d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809495",
    "foreachModel": "SA-U28-40D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u28-40d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-u28-40d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809496",
    "foreachModel": "PMB-U28-24D-PA-W",
    "imageCard": "/images/products/fittings/bulkhead-barbed-fittings/products/pmb-u28-24d-pa-w-main.jpg",
    "detailHref": "/products/fittings/bulkhead-barbed-fittings/pmb-u28-24d-pa-w",
    "productTypeId": "bulkhead-barbed-fittings",
    "productType": "bulkhead-barbed-fittings",
    "productSeries": "[object Object]",
    "seriesId": "pmb"
  },
  {
    "productCode": "809497",
    "foreachModel": "PMB-U28-32D-PA-W",
    "imageCard": "/images/products/fittings/bulkhead-barbed-fittings/products/pmb-u28-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/bulkhead-barbed-fittings/pmb-u28-32d-pa-w",
    "productTypeId": "bulkhead-barbed-fittings",
    "productType": "bulkhead-barbed-fittings",
    "productSeries": "[object Object]",
    "seriesId": "pmb"
  },
  {
    "productCode": "809500",
    "foreachModel": "SA-U28-32D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u28-32d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-u28-32d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809501",
    "foreachModel": "SA-U28-48D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-u28-48d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-u28-48d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809511",
    "foreachModel": "SB-M5-24D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-m5-24d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-m5-24d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809512",
    "foreachModel": "SB-M5-32D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-m5-32d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-m5-32d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809513",
    "foreachModel": "SB-M5-40D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-m5-40d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-m5-40d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809516",
    "foreachModel": "US-M6-15-PP-N",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/US-M6-15-PP-N.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/us-m6-15-pp-n",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "us",
    "seriesId": "us"
  },
  {
    "productCode": "809517",
    "foreachModel": "PMB-U28-16D-PA-W",
    "imageCard": "/images/products/fittings/bulkhead-barbed-fittings/products/pmb-u28-16d-pa-w-main.jpg",
    "detailHref": "/products/fittings/bulkhead-barbed-fittings/pmb-u28-16d-pa-w",
    "productTypeId": "bulkhead-barbed-fittings",
    "productType": "bulkhead-barbed-fittings",
    "productSeries": "[object Object]",
    "seriesId": "pmb"
  },
  {
    "productCode": "809518",
    "foreachModel": "UT-U28-20-PP-N",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/UT-U28-20-PP-N.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/ut-u28-20-pp-n",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "ut",
    "seriesId": "ut"
  },
  {
    "productCode": "809519",
    "foreachModel": "BA-24C-48C-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24c-48c-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24c-48c-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809520",
    "foreachModel": "BA-24C-48C-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24c-48c-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24c-48c-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809521",
    "foreachModel": "BT-16D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-16d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-16d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809522",
    "foreachModel": "SC-U28-16D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sc-u28-16d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sc-u28-16d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "内螺纹转倒刺接头",
    "seriesId": "sc"
  },
  {
    "productCode": "809523",
    "foreachModel": "SC-U28-24D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sc-u28-24d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sc-u28-24d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "内螺纹转倒刺接头",
    "seriesId": "sc"
  },
  {
    "productCode": "809524",
    "foreachModel": "SC-U28-32D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sc-u28-32d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sc-u28-32d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "内螺纹转倒刺接头",
    "seriesId": "sc"
  },
  {
    "productCode": "809525",
    "foreachModel": "PMU-M12-U28-20-PP-N",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/PMU-M12-U28-20-PP-N.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/pmu-m12-u28-20-pp-n",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "pmu",
    "seriesId": "pmu"
  },
  {
    "productCode": "809528",
    "foreachModel": "SBR-U28-16-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sbr-u28-16-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sbr-u28-16-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "可旋转式螺纹转倒刺接头",
    "seriesId": "sbr"
  },
  {
    "productCode": "809529",
    "foreachModel": "SBR-U28-24-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sbr-u28-24-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sbr-u28-24-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "可旋转式螺纹转倒刺接头",
    "seriesId": "sbr"
  },
  {
    "productCode": "809530",
    "foreachModel": "SBR-U28-32-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sbr-u28-32-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sbr-u28-32-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "可旋转式螺纹转倒刺接头",
    "seriesId": "sbr"
  },
  {
    "productCode": "809531",
    "foreachModel": "US-M6-10-AC-B",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/US-M6-10-AC-B.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/us-m6-10-ac-b",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "us",
    "seriesId": "us"
  },
  {
    "productCode": "809532",
    "foreachModel": "US-M6-15-AC-B",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/US-M6-15-AC-B.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/us-m6-15-ac-b",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "us",
    "seriesId": "us"
  },
  {
    "productCode": "809533",
    "foreachModel": "US-M6-05-PP-N",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/US-M6-05-PP-N.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/us-m6-05-pp-n",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "us",
    "seriesId": "us"
  },
  {
    "productCode": "809534",
    "foreachModel": "US-M6-10-PP-N",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/US-M6-10-PP-N.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/us-m6-10-pp-n",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "us",
    "seriesId": "us"
  },
  {
    "productCode": "809535",
    "foreachModel": "SBS-M6-24D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sbs-m6-24d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sbs-m6-24d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sbs"
  },
  {
    "productCode": "809536",
    "foreachModel": "SBS-M6-32D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sbs-m6-32d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sbs-m6-32d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sbs"
  },
  {
    "productCode": "809545",
    "foreachModel": "BT-16D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-16d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-16d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809547",
    "foreachModel": "BA-16C-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16c-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16c-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809558",
    "foreachModel": "LSL-16-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LSL-16-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lsl-16-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lsl",
    "seriesId": "lsl"
  },
  {
    "productCode": "809560",
    "foreachModel": "LSL-24-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LSL-24-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lsl-24-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lsl",
    "seriesId": "lsl"
  },
  {
    "productCode": "809562",
    "foreachModel": "LSL-32-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LSL-32-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lsl-32-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lsl",
    "seriesId": "lsl"
  },
  {
    "productCode": "809570",
    "foreachModel": "LS-16D-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LS-16D-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/ls-16d-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "ls",
    "seriesId": "ls"
  },
  {
    "productCode": "809571",
    "foreachModel": "LS-24D-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LS-24D-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/ls-24d-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "ls",
    "seriesId": "ls"
  },
  {
    "productCode": "809572",
    "foreachModel": "LS-32D-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LS-32D-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/ls-32d-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "ls",
    "seriesId": "ls"
  },
  {
    "productCode": "809576",
    "foreachModel": "PMLS-U28-16D-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-16D-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/pmls-u28-16d-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "pmls",
    "seriesId": "pmls"
  },
  {
    "productCode": "809577",
    "foreachModel": "PMLS-U28-24D-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-24D-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/pmls-u28-24d-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "pmls",
    "seriesId": "pmls"
  },
  {
    "productCode": "809579",
    "foreachModel": "LCR-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lcr-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lcr",
    "seriesId": "lcr"
  },
  {
    "productCode": "809580",
    "foreachModel": "LCR-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lcr-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lcr",
    "seriesId": "lcr"
  },
  {
    "productCode": "809581",
    "foreachModel": "LCR-PA-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lcr-pa-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lcr",
    "seriesId": "lcr"
  },
  {
    "productCode": "809582",
    "foreachModel": "LCR-PA-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lcr-pa-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lcr",
    "seriesId": "lcr"
  },
  {
    "productCode": "809583",
    "foreachModel": "LCR-PA-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lcr-pa-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lcr",
    "seriesId": "lcr"
  },
  {
    "productCode": "809584",
    "foreachModel": "LCR-PA-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lcr-pa-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lcr",
    "seriesId": "lcr"
  },
  {
    "productCode": "809585",
    "foreachModel": "LCR-PA-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lcr-pa-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lcr",
    "seriesId": "lcr"
  },
  {
    "productCode": "809586",
    "foreachModel": "LCR-PA-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LCR-PA-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lcr-pa-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lcr",
    "seriesId": "lcr"
  },
  {
    "productCode": "809587",
    "foreachModel": "LPT-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpt-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpt",
    "seriesId": "lpt"
  },
  {
    "productCode": "809588",
    "foreachModel": "LPT-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpt-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpt",
    "seriesId": "lpt"
  },
  {
    "productCode": "809589",
    "foreachModel": "LPT-PA-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpt-pa-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpt",
    "seriesId": "lpt"
  },
  {
    "productCode": "809590",
    "foreachModel": "LPT-PA-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpt-pa-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpt",
    "seriesId": "lpt"
  },
  {
    "productCode": "809591",
    "foreachModel": "LPT-PA-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpt-pa-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpt",
    "seriesId": "lpt"
  },
  {
    "productCode": "809592",
    "foreachModel": "LPT-PA-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpt-pa-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpt",
    "seriesId": "lpt"
  },
  {
    "productCode": "809593",
    "foreachModel": "LPT-PA-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpt-pa-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpt",
    "seriesId": "lpt"
  },
  {
    "productCode": "809594",
    "foreachModel": "LPT-PA-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPT-PA-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpt-pa-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpt",
    "seriesId": "lpt"
  },
  {
    "productCode": "809596",
    "foreachModel": "LNS-U28-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lns-u28-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lns",
    "seriesId": "lns"
  },
  {
    "productCode": "809597",
    "foreachModel": "LNS-U28-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lns-u28-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lns",
    "seriesId": "lns"
  },
  {
    "productCode": "809598",
    "foreachModel": "LNS-U28-PA-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lns-u28-pa-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lns",
    "seriesId": "lns"
  },
  {
    "productCode": "809599",
    "foreachModel": "LNS-U28-PA-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lns-u28-pa-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lns",
    "seriesId": "lns"
  },
  {
    "productCode": "809600",
    "foreachModel": "LNS-U28-PA-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lns-u28-pa-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lns",
    "seriesId": "lns"
  },
  {
    "productCode": "809601",
    "foreachModel": "LNS-U28-PA-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lns-u28-pa-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lns",
    "seriesId": "lns"
  },
  {
    "productCode": "809602",
    "foreachModel": "LNS-U28-PA-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lns-u28-pa-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lns",
    "seriesId": "lns"
  },
  {
    "productCode": "809603",
    "foreachModel": "LNS-U28-PA-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LNS-U28-PA-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lns-u28-pa-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lns",
    "seriesId": "lns"
  },
  {
    "productCode": "809604",
    "foreachModel": "BA-16D-24D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16d-24d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16d-24d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809605",
    "foreachModel": "BA-16D-24D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16d-24d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16d-24d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809606",
    "foreachModel": "BA-24D-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24d-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24d-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809607",
    "foreachModel": "BA-24D-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24d-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24d-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809608",
    "foreachModel": "BY-24D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-24d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-24d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809609",
    "foreachModel": "BY-24D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-24d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-24d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809610",
    "foreachModel": "BT-24D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-24d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-24d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809611",
    "foreachModel": "BT-24D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-24d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-24d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809621",
    "foreachModel": "BT-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809622",
    "foreachModel": "BT-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809623",
    "foreachModel": "BY-16D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-16d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-16d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809624",
    "foreachModel": "BY-16D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-16d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-16d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809625",
    "foreachModel": "BA-24D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809626",
    "foreachModel": "BA-24D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-24d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-24d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809627",
    "foreachModel": "BA-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809628",
    "foreachModel": "BA-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809629",
    "foreachModel": "BA-16D-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16d-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16d-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809630",
    "foreachModel": "BA-16D-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16d-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16d-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809631",
    "foreachModel": "UT-U28-15-PS-B",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/UT-U28-15-PS-B.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/ut-u28-15-ps-b",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "ut",
    "seriesId": "ut"
  },
  {
    "productCode": "809632",
    "foreachModel": "BL-16D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-16d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-16d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809633",
    "foreachModel": "BL-16D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-16d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-16d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809634",
    "foreachModel": "BL-24D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-24d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-24d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809635",
    "foreachModel": "BL-24D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-24d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-24d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809636",
    "foreachModel": "BL-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809637",
    "foreachModel": "BL-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809638",
    "foreachModel": "BL-16D-24D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-16d-24d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-16d-24d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809639",
    "foreachModel": "BL-16D-24D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-16d-24d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-16d-24d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809640",
    "foreachModel": "BL-24D-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-24d-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-24d-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809641",
    "foreachModel": "BL-24D-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-24d-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-24d-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809642",
    "foreachModel": "BL-16D-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-16d-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-16d-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809643",
    "foreachModel": "BL-16D-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-16d-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-16d-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809644",
    "foreachModel": "BT-127V-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-127v-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-127v-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809645",
    "foreachModel": "BL-127V-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bl-127v-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bl-127v-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "L型倒刺接头",
    "seriesId": "bl"
  },
  {
    "productCode": "809646",
    "foreachModel": "BY-127V-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/by-127v-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/by-127v-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "Y型倒刺接头",
    "seriesId": "by"
  },
  {
    "productCode": "809647",
    "foreachModel": "SB-M5-16D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sb-m5-16d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sb-m5-16d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通底面密封螺纹转倒刺接头",
    "seriesId": "sb"
  },
  {
    "productCode": "809661",
    "foreachModel": "PNC6-U32-16-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc6-u32-16-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/pnc6-u32-16-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "high-pressure-fitting",
    "seriesId": "high-pressure-fitting"
  },
  {
    "productCode": "809666",
    "foreachModel": "LP-24D-PA-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-24D-PA-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-24d-pa-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809669",
    "foreachModel": "LPS-16-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-16-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-16-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809670",
    "foreachModel": "LPS-24-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-24-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-24-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809671",
    "foreachModel": "LPS-32-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPS-32-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lps-32-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lps",
    "seriesId": "lps"
  },
  {
    "productCode": "809672",
    "foreachModel": "LPR-16-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809673",
    "foreachModel": "LPR-16-PP-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pp-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809674",
    "foreachModel": "LPR-16-PP-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pp-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809675",
    "foreachModel": "LPR-16-PP-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pp-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809676",
    "foreachModel": "LPR-16-PP-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pp-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809677",
    "foreachModel": "LPR-16-PP-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pp-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809678",
    "foreachModel": "LPR-16-PP-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pp-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809679",
    "foreachModel": "LPR-16-PP-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-16-PP-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-16-pp-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809680",
    "foreachModel": "LPR-24-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809681",
    "foreachModel": "LPR-24-PP-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pp-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809682",
    "foreachModel": "LPR-24-PP-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pp-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809683",
    "foreachModel": "LPR-24-PP-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pp-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809684",
    "foreachModel": "LPR-24-PP-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pp-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809685",
    "foreachModel": "LPR-24-PP-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pp-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809687",
    "foreachModel": "LPR-24-PP-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-24-PP-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-24-pp-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809688",
    "foreachModel": "LPR-32-PP-N",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-N.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pp-n",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809689",
    "foreachModel": "LPR-32-PP-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pp-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809690",
    "foreachModel": "LPR-32-PP-B",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-B.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pp-b",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809691",
    "foreachModel": "LPR-32-PP-R",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-R.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pp-r",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809692",
    "foreachModel": "LPR-32-PP-G",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-G.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pp-g",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809693",
    "foreachModel": "LPR-32-PP-U",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-U.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pp-u",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809694",
    "foreachModel": "LPR-32-PP-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pp-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809695",
    "foreachModel": "LPR-32-PP-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LPR-32-PP-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lpr-32-pp-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lpr",
    "seriesId": "lpr"
  },
  {
    "productCode": "809697",
    "foreachModel": "UT-U28-15-PP-N",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/UT-U28-15-PP-N.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/ut-u28-15-pp-n",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "ut",
    "seriesId": "ut"
  },
  {
    "productCode": "809698",
    "foreachModel": "UT-U28-20-PS-B",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/UT-U28-20-PS-B.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/ut-u28-20-ps-b",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "ut",
    "seriesId": "ut"
  },
  {
    "productCode": "809699",
    "foreachModel": "LS-16D-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LS-16D-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/ls-16d-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "ls",
    "seriesId": "ls"
  },
  {
    "productCode": "809700",
    "foreachModel": "LS-24D-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LS-24D-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/ls-24d-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "ls",
    "seriesId": "ls"
  },
  {
    "productCode": "809701",
    "foreachModel": "LS-32D-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LS-32D-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/ls-32d-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "ls",
    "seriesId": "ls"
  },
  {
    "productCode": "809702",
    "foreachModel": "PMLS-U28-16D-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-16D-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/pmls-u28-16d-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "pmls",
    "seriesId": "pmls"
  },
  {
    "productCode": "809703",
    "foreachModel": "PMLS-U28-24D-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-24D-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/pmls-u28-24d-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "pmls",
    "seriesId": "pmls"
  },
  {
    "productCode": "809704",
    "foreachModel": "PMLS-U28-32D-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/PMLS-U28-32D-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/pmls-u28-32d-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "pmls",
    "seriesId": "pmls"
  },
  {
    "productCode": "809705",
    "foreachModel": "LSL-16-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LSL-16-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lsl-16-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lsl",
    "seriesId": "lsl"
  },
  {
    "productCode": "809706",
    "foreachModel": "LRL-16-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LRL-16-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lrl-16-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lrl",
    "seriesId": "lrl"
  },
  {
    "productCode": "809707",
    "foreachModel": "LSL-24-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LSL-24-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lsl-24-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lsl",
    "seriesId": "lsl"
  },
  {
    "productCode": "809708",
    "foreachModel": "LRL-24-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LRL-24-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lrl-24-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lrl",
    "seriesId": "lrl"
  },
  {
    "productCode": "809709",
    "foreachModel": "LSL-32-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LSL-32-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lsl-32-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lsl",
    "seriesId": "lsl"
  },
  {
    "productCode": "809710",
    "foreachModel": "LRL-32-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LRL-32-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lrl-32-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lrl",
    "seriesId": "lrl"
  },
  {
    "productCode": "809714",
    "foreachModel": "HF-U28-20-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-20-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809715",
    "foreachModel": "HF-U28-25-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-25-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809716",
    "foreachModel": "HF-U28-32-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-32-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809717",
    "foreachModel": "HF-M6-20-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-20-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809718",
    "foreachModel": "HF-M6-25-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-25-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809719",
    "foreachModel": "HF-M6-32-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-32-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809720",
    "foreachModel": "HF6-U28-20-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-20-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809721",
    "foreachModel": "HF6-U28-25-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-25-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809722",
    "foreachModel": "HF6-U28-32-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-32-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809723",
    "foreachModel": "HF6-M6-20-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-20-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809724",
    "foreachModel": "HF6-M6-25-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-25-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809725",
    "foreachModel": "HF6-M6-32-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-32-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809726",
    "foreachModel": "HN-U28-16-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-16-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809727",
    "foreachModel": "HN-U28-32-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-32-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809728",
    "foreachModel": "HN-M6-16-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-16-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809729",
    "foreachModel": "HN-M6-32-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-32-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809730",
    "foreachModel": "HN6-U28-16-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn6-u28-16-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809732",
    "foreachModel": "HN6-M6-16-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn6-m6-16-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809733",
    "foreachModel": "HN6-M6-32-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-32-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn6-m6-32-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809740",
    "foreachModel": "HF-U28-20-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-20-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809741",
    "foreachModel": "HF-U28-20-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-20-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-20-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809742",
    "foreachModel": "HF-U28-25-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-25-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809743",
    "foreachModel": "HF-U28-25-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-25-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-25-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809744",
    "foreachModel": "HF-U28-32-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-32-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809745",
    "foreachModel": "HF-U28-32-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-u28-32-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-u28-32-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809746",
    "foreachModel": "HF-M6-20-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-20-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809747",
    "foreachModel": "HF-M6-20-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-20-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-20-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809748",
    "foreachModel": "HF-M6-25-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-25-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809749",
    "foreachModel": "HF-M6-25-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-25-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-25-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809750",
    "foreachModel": "HF-M6-32-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-32-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809751",
    "foreachModel": "HF-M6-32-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-flat-bottom-fitting/hf-m6-32-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf-m6-32-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-flat-bottom-fitting",
    "seriesId": "standard-flat-bottom-fitting"
  },
  {
    "productCode": "809752",
    "foreachModel": "HF6-U28-20-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-20-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809753",
    "foreachModel": "HF6-U28-20-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-20-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-20-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809754",
    "foreachModel": "HF6-U28-25-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-25-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809755",
    "foreachModel": "HF6-U28-25-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-25-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-25-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809756",
    "foreachModel": "HF6-U28-32-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-32-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809757",
    "foreachModel": "HF6-U28-32-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-u28-32-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-u28-32-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809758",
    "foreachModel": "HF6-M6-20-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-20-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809759",
    "foreachModel": "HF6-M6-20-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-20-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-20-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809760",
    "foreachModel": "HF6-M6-25-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-25-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809761",
    "foreachModel": "HF6-M6-25-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-25-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-25-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809762",
    "foreachModel": "HF6-M6-32-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-32-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809763",
    "foreachModel": "HF6-M6-32-PS-B",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-flat-bottom-fitting/hf6-m6-32-ps-b-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hf6-m6-32-ps-b",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-flat-bottom-fitting",
    "seriesId": "compact-flat-bottom-fitting"
  },
  {
    "productCode": "809764",
    "foreachModel": "HN-U28-16-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-16-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-16-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809766",
    "foreachModel": "HN-U28-32-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-u28-32-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn-u28-32-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809768",
    "foreachModel": "HN-M6-16-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-16-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-16-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809770",
    "foreachModel": "HN-M6-32-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/standard-ferrule-fitting/hn-m6-32-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn-m6-32-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "standard-ferrule-fitting",
    "seriesId": "standard-ferrule-fitting"
  },
  {
    "productCode": "809772",
    "foreachModel": "HN6-U28-16-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-u28-16-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn6-u28-16-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809776",
    "foreachModel": "HN6-M6-16-PV-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/compact-ferrule-fitting/hn6-m6-16-pv-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/hn6-m6-16-pv-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "compact-ferrule-fitting",
    "seriesId": "compact-ferrule-fitting"
  },
  {
    "productCode": "809781",
    "foreachModel": "LP-32D-PA-W",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PA-W.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-32d-pa-w",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809786",
    "foreachModel": "LP-32D-PA-O",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PA-O.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-32d-pa-o",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809787",
    "foreachModel": "LP-32D-PA-Y",
    "imageCard": "/images/products/fittings/luer-fittings/products/LP-32D-PA-Y.jpg",
    "detailHref": "/products/fittings/luer-fittings/lp-32d-pa-y",
    "productTypeId": "luer-fittings",
    "productType": "",
    "productSeries": "lp",
    "seriesId": "lp"
  },
  {
    "productCode": "809788",
    "foreachModel": "BA-16F-24F-PV-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16f-24f-pv-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16f-24f-pv-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809790",
    "foreachModel": "UY-U28-20-PP-N",
    "imageCard": "/images/products/fittings/female-thread-adapters/products/UY-U28-20-PP-N.jpg",
    "detailHref": "/products/fittings/female-thread-adapters/uy-u28-20-pp-n",
    "productTypeId": "female-thread-adapters",
    "productType": "",
    "productSeries": "uy",
    "seriesId": "uy"
  },
  {
    "productCode": "809791",
    "foreachModel": "PNC-U32-16-PK-N",
    "imageCard": "/images/products/fittings/hard-tube-fittings/high-pressure-fitting/pnc-u32-16-pk-n-main.jpg",
    "detailHref": "/products/fittings/hard-tube-fittings/pnc-u32-16-pk-n",
    "productTypeId": "hard-tube-fittings",
    "productType": "",
    "productSeries": "high-pressure-fitting",
    "seriesId": "high-pressure-fitting"
  },
  {
    "productCode": "809835",
    "foreachModel": "SA-X32-32D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-x32-32d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-x32-32d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809836",
    "foreachModel": "SA-X32-24D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-x32-24d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-x32-24d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809842",
    "foreachModel": "BT-16D-32D-32D-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-16d-32d-32d-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-16d-32d-32d-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809843",
    "foreachModel": "BA-16V-40V-PA-W",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16v-40v-pa-w-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16v-40v-pa-w",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "809847",
    "foreachModel": "SA-X32-24D-PA-W",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-x32-24d-pa-w.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-x32-24d-pa-w",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809848",
    "foreachModel": "SA-X32-32D-PP-N",
    "imageCard": "/images/products/fittings/thread-to-barbed-fittings/products/sa-x32-32d-pp-n.jpg",
    "detailHref": "/products/fittings/thread-to-barbed-fittings/sa-x32-32d-pp-n",
    "productTypeId": "thread-to-barbed-fittings",
    "productType": "螺纹转倒刺接头",
    "productSeries": "直通螺纹密封螺纹转倒刺接头",
    "seriesId": "sa"
  },
  {
    "productCode": "809851",
    "foreachModel": "BT-16D-32D-32D-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/bt-16d-32d-32d-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/bt-16d-32d-32d-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "T型倒刺接头",
    "seriesId": "bt"
  },
  {
    "productCode": "809854",
    "foreachModel": "BA-16V-40V-PP-N",
    "imageCard": "/images/products/fittings/barbed-fittings/products/ba-16v-40v-pp-n-main.jpg",
    "detailHref": "/products/fittings/barbed-fittings/ba-16v-40v-pp-n",
    "productTypeId": "barbed-fittings",
    "productType": "倒刺接头",
    "productSeries": "直通型倒刺接头",
    "seriesId": "ba"
  },
  {
    "productCode": "839001",
    "foreachModel": "Q2001-SNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-snx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-snx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839002",
    "foreachModel": "Q2002-SNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-snx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-snx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839003",
    "foreachModel": "Q2003-SNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-snx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-snx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839004",
    "foreachModel": "Q2004-SNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-snx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-snx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839005",
    "foreachModel": "Q2002-SNX-LACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-snx-lacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-snx-lacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839006",
    "foreachModel": "Q2004-SNX-LACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-snx-lacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-snx-lacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839007",
    "foreachModel": "Q2018N-SNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2018n-snx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2018n-snx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839008",
    "foreachModel": "Q2001-SMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-smx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-smx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839009",
    "foreachModel": "Q2002-SMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-smx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-smx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839010",
    "foreachModel": "Q2003-SMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-smx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-smx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839011",
    "foreachModel": "Q2004-SMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-smx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-smx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839012",
    "foreachModel": "Q2001-PNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-pnx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-pnx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839013",
    "foreachModel": "Q2002-PNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pnx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pnx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839014",
    "foreachModel": "Q2003-PNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-pnx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-pnx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839015",
    "foreachModel": "Q2004-PNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pnx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pnx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839016",
    "foreachModel": "Q2002-PNX-LACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pnx-lacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pnx-lacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839017",
    "foreachModel": "Q2004-PNX-LACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pnx-lacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pnx-lacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839018",
    "foreachModel": "Q2018N-PNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2018n-pnx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2018n-pnx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839019",
    "foreachModel": "Q2001-PMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-pmx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-pmx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839020",
    "foreachModel": "Q2002-PMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pmx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pmx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839021",
    "foreachModel": "Q2003-PMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-pmx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-pmx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839022",
    "foreachModel": "Q2004-PMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pmx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pmx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839023",
    "foreachModel": "Q2001-SNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-snv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-snv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839024",
    "foreachModel": "Q2002-SNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-snv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-snv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839025",
    "foreachModel": "Q2003-SNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-snv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-snv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839026",
    "foreachModel": "Q2004-SNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-snv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-snv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839027",
    "foreachModel": "Q2002-SNV-LACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-snv-lacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-snv-lacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839028",
    "foreachModel": "Q2004-SNV-LACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-snv-lacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-snv-lacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839029",
    "foreachModel": "Q2018N-SNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2018n-snv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2018n-snv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839030",
    "foreachModel": "Q2001-SMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-smv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-smv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839031",
    "foreachModel": "Q2002-SMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-smv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-smv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839032",
    "foreachModel": "Q2003-SMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-smv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-smv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839033",
    "foreachModel": "Q2004-SMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-smv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-smv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839034",
    "foreachModel": "Q2001-PNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-pnv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-pnv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839035",
    "foreachModel": "Q2002-PNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pnv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pnv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839036",
    "foreachModel": "Q2003-PNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-pnv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-pnv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839037",
    "foreachModel": "Q2004-PNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pnv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pnv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839038",
    "foreachModel": "Q2002-PNV-LACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pnv-lacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pnv-lacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839039",
    "foreachModel": "Q2004-PNV-LACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pnv-lacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pnv-lacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839040",
    "foreachModel": "Q2018N-PNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2018n-pnv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2018n-pnv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839041",
    "foreachModel": "Q2001-PMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-pmv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-pmv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839042",
    "foreachModel": "Q2002-PMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pmv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pmv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839043",
    "foreachModel": "Q2003-PMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-pmv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-pmv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839044",
    "foreachModel": "Q2004-PMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pmv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pmv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839045",
    "foreachModel": "Q2001-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839046",
    "foreachModel": "Q2002-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839047",
    "foreachModel": "Q2003-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839048",
    "foreachModel": "Q2004-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839049",
    "foreachModel": "Q2002-SNX-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-snx-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-snx-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839050",
    "foreachModel": "Q2004-SNX-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-snx-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-snx-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839051",
    "foreachModel": "Q2018N-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2018n-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2018n-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839052",
    "foreachModel": "Q2001-SMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-smx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-smx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839053",
    "foreachModel": "Q2002-SMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-smx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-smx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839054",
    "foreachModel": "Q2003-SMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-smx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-smx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839055",
    "foreachModel": "Q2004-SMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-smx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-smx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839056",
    "foreachModel": "Q2001-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839057",
    "foreachModel": "Q2002-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839058",
    "foreachModel": "Q2003-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839059",
    "foreachModel": "Q2004-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839060",
    "foreachModel": "Q2002-PNX-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pnx-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pnx-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839061",
    "foreachModel": "Q2004-PNX-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pnx-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pnx-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839062",
    "foreachModel": "Q2018N-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2018n-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2018n-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839063",
    "foreachModel": "Q2001-PMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-pmx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-pmx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839064",
    "foreachModel": "Q2002-PMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pmx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pmx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839065",
    "foreachModel": "Q2003-PMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-pmx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-pmx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839066",
    "foreachModel": "Q2004-PMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pmx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pmx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839067",
    "foreachModel": "Q2001-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839068",
    "foreachModel": "Q2002-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839069",
    "foreachModel": "Q2003-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839070",
    "foreachModel": "Q2004-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839071",
    "foreachModel": "Q2002-SNV-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-snv-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-snv-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839072",
    "foreachModel": "Q2004-SNV-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-snv-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-snv-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839073",
    "foreachModel": "Q2018N-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2018n-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2018n-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839074",
    "foreachModel": "Q2001-SMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-smv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-smv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839075",
    "foreachModel": "Q2002-SMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-smv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-smv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839076",
    "foreachModel": "Q2003-SMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-smv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-smv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839077",
    "foreachModel": "Q2004-SMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-smv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-smv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839078",
    "foreachModel": "Q2001-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839079",
    "foreachModel": "Q2002-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839080",
    "foreachModel": "Q2003-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839081",
    "foreachModel": "Q2004-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839082",
    "foreachModel": "Q2002-PNV-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pnv-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pnv-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839083",
    "foreachModel": "Q2004-PNV-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pnv-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pnv-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839084",
    "foreachModel": "Q2018N-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2018n-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2018n-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839085",
    "foreachModel": "Q2001-PMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2001-pmv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2001-pmv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839086",
    "foreachModel": "Q2002-PMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2002-pmv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2002-pmv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839087",
    "foreachModel": "Q2003-PMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2003-pmv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2003-pmv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "839088",
    "foreachModel": "Q2004-PMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q2004-pmv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q2004-pmv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q20",
    "seriesId": "q20"
  },
  {
    "productCode": "849001",
    "foreachModel": "Q4004-SNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-snx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-snx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849002",
    "foreachModel": "Q4005-SNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-snx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-snx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849003",
    "foreachModel": "Q4006-SNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-snx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-snx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849006",
    "foreachModel": "Q4014N-SNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4014n-snx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4014n-snx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849007",
    "foreachModel": "Q4004-SMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-smx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-smx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849008",
    "foreachModel": "Q4005-SMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-smx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-smx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849009",
    "foreachModel": "Q4006-SMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-smx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-smx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849010",
    "foreachModel": "Q4004-PNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-pnx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-pnx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849011",
    "foreachModel": "Q4005-PNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-pnx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-pnx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849012",
    "foreachModel": "Q4006-PNX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-pnx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-pnx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849013",
    "foreachModel": "Q4006-PNX-LACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-pnx-lacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-pnx-lacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849015",
    "foreachModel": "Q4004-PMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-pmx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-pmx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849016",
    "foreachModel": "Q4005-PMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-pmx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-pmx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849017",
    "foreachModel": "Q4006-PMX-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-pmx-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-pmx-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849019",
    "foreachModel": "Q4005-SNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-snv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-snv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849020",
    "foreachModel": "Q4006-SNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-snv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-snv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849023",
    "foreachModel": "Q4014N-SNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4014n-snv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4014n-snv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849024",
    "foreachModel": "Q4004-SMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-smv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-smv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849025",
    "foreachModel": "Q4005-SMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-smv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-smv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849026",
    "foreachModel": "Q4006-SMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-smv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-smv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849027",
    "foreachModel": "Q4004-PNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-pnv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-pnv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849028",
    "foreachModel": "Q4005-PNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-pnv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-pnv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849029",
    "foreachModel": "Q4006-PNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-pnv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-pnv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849030",
    "foreachModel": "Q4004-PNV-LACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-pnv-lacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-pnv-lacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849031",
    "foreachModel": "Q4014N-PNV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4014n-pnv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4014n-pnv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849032",
    "foreachModel": "Q4004-PMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-pmv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-pmv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849033",
    "foreachModel": "Q4005-PMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-pmv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-pmv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849034",
    "foreachModel": "Q4006-PMV-SACN",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-pmv-sacn-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-pmv-sacn",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849035",
    "foreachModel": "Q4004-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849036",
    "foreachModel": "Q4005-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849037",
    "foreachModel": "Q4006-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849040",
    "foreachModel": "Q4014N-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4014n-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4014n-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849041",
    "foreachModel": "Q4004-SMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-smx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-smx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849042",
    "foreachModel": "Q4005-SMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-smx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-smx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849043",
    "foreachModel": "Q4006-SMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-smx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-smx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849044",
    "foreachModel": "Q4004-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849045",
    "foreachModel": "Q4005-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849046",
    "foreachModel": "Q4006-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849047",
    "foreachModel": "Q4006-PNX-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-pnx-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-pnx-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849049",
    "foreachModel": "Q4004-PMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-pmx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-pmx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849050",
    "foreachModel": "Q4005-PMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-pmx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-pmx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849051",
    "foreachModel": "Q4006-PMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-pmx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-pmx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849053",
    "foreachModel": "Q4005-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849054",
    "foreachModel": "Q4006-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849057",
    "foreachModel": "Q4014N-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4014n-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4014n-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849058",
    "foreachModel": "Q4004-SMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-smv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-smv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849059",
    "foreachModel": "Q4005-SMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-smv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-smv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849060",
    "foreachModel": "Q4006-SMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-smv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-smv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849061",
    "foreachModel": "Q4004-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849062",
    "foreachModel": "Q4005-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849063",
    "foreachModel": "Q4006-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849064",
    "foreachModel": "Q4004-PNV-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-pnv-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-pnv-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849065",
    "foreachModel": "Q4014N-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4014n-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4014n-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849066",
    "foreachModel": "Q4004-PMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4004-pmv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4004-pmv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849067",
    "foreachModel": "Q4005-PMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4005-pmv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4005-pmv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "849068",
    "foreachModel": "Q4006-PMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q4006-pmv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q4006-pmv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q40",
    "seriesId": "q40"
  },
  {
    "productCode": "869001",
    "foreachModel": "Q6006-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6006-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6006-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869002",
    "foreachModel": "Q6008-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6008-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6008-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869003",
    "foreachModel": "Q6012-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6012-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6012-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869004",
    "foreachModel": "Q6038N-SNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6038n-snx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6038n-snx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869006",
    "foreachModel": "Q6006-SMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6006-smx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6006-smx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869007",
    "foreachModel": "Q6008-SMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6008-smx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6008-smx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869008",
    "foreachModel": "Q6012-SMX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6012-smx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6012-smx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869010",
    "foreachModel": "Q6008-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6008-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6008-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869011",
    "foreachModel": "Q6012-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6012-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6012-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869012",
    "foreachModel": "Q6006-PNX-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6006-pnx-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6006-pnx-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869013",
    "foreachModel": "Q6008-PNX-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6008-pnx-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6008-pnx-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869014",
    "foreachModel": "Q6038N-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6038n-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6038n-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869015",
    "foreachModel": "Q6012N-PNX-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6012n-pnx-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6012n-pnx-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869018",
    "foreachModel": "Q6006-SMX-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6006-smx-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6006-smx-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869019",
    "foreachModel": "Q6008-SMX-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6008-smx-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6008-smx-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869020",
    "foreachModel": "Q6006-SMV-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6006-smv-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6006-smv-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869021",
    "foreachModel": "Q6006-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6006-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6006-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869022",
    "foreachModel": "Q6008-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6008-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6008-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869023",
    "foreachModel": "Q6012-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6012-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6012-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869024",
    "foreachModel": "Q6038N-SNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6038n-snv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6038n-snv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869026",
    "foreachModel": "Q6006-SMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6006-smv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6006-smv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869027",
    "foreachModel": "Q6008-SMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6008-smv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6008-smv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869028",
    "foreachModel": "Q6012-SMV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6012-smv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6012-smv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869030",
    "foreachModel": "Q6008-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6008-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6008-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869031",
    "foreachModel": "Q6012-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6012-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6012-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869032",
    "foreachModel": "Q6006-PNV-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6006-pnv-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6006-pnv-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869033",
    "foreachModel": "Q6008-PNV-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6008-pnv-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6008-pnv-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869034",
    "foreachModel": "Q6038N-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6038n-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6038n-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869035",
    "foreachModel": "Q6012N-PNV-SPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6012n-pnv-sppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6012n-pnv-sppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869036",
    "foreachModel": "Q6008-SMV-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6008-smv-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6008-smv-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  },
  {
    "productCode": "869041",
    "foreachModel": "Q6008-SNV-LPPE",
    "imageCard": "/images/products/fittings/quick-connect-fittings/products/q6008-snv-lppe-main.jpg",
    "detailHref": "/products/fittings/quick-connect-fittings/q6008-snv-lppe",
    "productTypeId": "quick-connect-fittings",
    "productType": "",
    "productSeries": "Q60",
    "seriesId": "q60"
  }
];

export const FITTING_OFFLINE_PRODUCTS: Array<{
  productCode: string;
  foreachModel: string;
  reasons: FittingOfflineReason[];
}> =
[
  {
    "productCode": "126006",
    "foreachModel": "CV-DE-16-PV-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "126007",
    "foreachModel": "CV-BV-32-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "126009",
    "foreachModel": "CV-BV-48-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "126011",
    "foreachModel": "CV-BV-64-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "126012",
    "foreachModel": "CV-BE-64-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "126013",
    "foreachModel": "CV-BV-79-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "126014",
    "foreachModel": "CV-BE-79-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "126016",
    "foreachModel": "CV-BE-95-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "126025",
    "foreachModel": "CV-BF-16-PV-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "126026",
    "foreachModel": "CV-DE-24-PV-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "126027",
    "foreachModel": "CV-DE-32-PV-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "126028",
    "foreachModel": "CV-BV-48-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "129002",
    "foreachModel": "CV-BE-32-PV-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "129003",
    "foreachModel": "CV-BF-32-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "129004",
    "foreachModel": "CV-BE-24-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "129005",
    "foreachModel": "CV-BF-32-PP-B",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "136003",
    "foreachModel": "G-178-64-PA-V",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "PRODUCT_CODE_DUPLICATED",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "136004",
    "foreachModel": "G-178-48-PA-V",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "136005",
    "foreachModel": "G-178-32-PA-V",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "136009",
    "foreachModel": "F-PE-10-24-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139002",
    "foreachModel": "F-PE-100-32-PV-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139005",
    "foreachModel": "F-SS-150-127-AC-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139006",
    "foreachModel": "F-SS-150-127D-AC-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139007",
    "foreachModel": "F-SS-150-127-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139008",
    "foreachModel": "F-SS-150-127D-PP-N",
    "reasons": [
      "PRODUCT_CODE_DUPLICATED",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139009",
    "foreachModel": "水循环过滤器组件 86x48.8 POM",
    "reasons": [
      "MODEL_MISMATCH",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139010",
    "foreachModel": "水循环过滤器组件 78x46 PP 本色",
    "reasons": [
      "MODEL_MISMATCH",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139011",
    "foreachModel": "F-SS-150-79D-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139012",
    "foreachModel": "F-PA-150-32-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139013",
    "foreachModel": "F-SS-150-95D-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139014",
    "foreachModel": "F-PA-250-32D-PA-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139015",
    "foreachModel": "F-SS-150-191-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "139016",
    "foreachModel": "F-SS-150-95D-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "806033",
    "foreachModel": "BA-32-64-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806036",
    "foreachModel": "BA-24-40-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806037",
    "foreachModel": "BA-40-64-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806055",
    "foreachModel": "BF4-24-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806147",
    "foreachModel": "BA-32-48-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806148",
    "foreachModel": "BA-32-95-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806189",
    "foreachModel": "BF4-32-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806192",
    "foreachModel": "BX4-24-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806197",
    "foreachModel": "BT-24-16-16-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806201",
    "foreachModel": "BA-127-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806208",
    "foreachModel": "BY-64-40-40-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806220",
    "foreachModel": "BX4-16-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806221",
    "foreachModel": "BX4-32-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806224",
    "foreachModel": "BF4-16-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806233",
    "foreachModel": "PMB-M6-40-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "806235",
    "foreachModel": "PMB-M10-64-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "806236",
    "foreachModel": "PMB-M12-79-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "806256",
    "foreachModel": "BA-95-127-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806272",
    "foreachModel": "BA-40-79-AC-W",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806276",
    "foreachModel": "BA-48-95-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "806282",
    "foreachModel": "BY-79-PP-N",
    "reasons": [
      "FORCED_CODE_PREFIX",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809001",
    "foreachModel": "SB-U28-16-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809003",
    "foreachModel": "SB-U28-16-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809004",
    "foreachModel": "SB-U28-16-PP-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809005",
    "foreachModel": "SB-U28-24-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809006",
    "foreachModel": "SB-U28-24-AC-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809007",
    "foreachModel": "SB-U28-24-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809008",
    "foreachModel": "SB-U28-32-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809009",
    "foreachModel": "SB-U28-32-AC-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809010",
    "foreachModel": "SB-U28-32-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809011",
    "foreachModel": "SB-U28-32-PP-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809012",
    "foreachModel": "SB-U28-40-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809014",
    "foreachModel": "SB-U28-40-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809015",
    "foreachModel": "SB-M6-16-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809017",
    "foreachModel": "SB-M6-16-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809018",
    "foreachModel": "SB-M6-16-PP-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809019",
    "foreachModel": "SB-M6-24-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809021",
    "foreachModel": "SB-M6-24-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809022",
    "foreachModel": "SB-M6-32-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809024",
    "foreachModel": "SB-M6-32-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809025",
    "foreachModel": "SB-M6-32-PP-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809026",
    "foreachModel": "SB-M6-40-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809028",
    "foreachModel": "SB-M6-40-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809033",
    "foreachModel": "PMBSN-M12-PA-B",
    "reasons": [
      "NOT_ACTIVE",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809034",
    "foreachModel": "SA-G1/8-64C-PP-N（带O圈）",
    "reasons": [
      "MODEL_MISMATCH",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809057",
    "foreachModel": "HFL6-U28-16-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809077",
    "foreachModel": "HFL6-U28-20-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809098",
    "foreachModel": "HFL6-M6-25-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809127",
    "foreachModel": "HNF6-U28-16-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809147",
    "foreachModel": "HNF6-U28-20-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809178",
    "foreachModel": "HBL-U28-PV-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809180",
    "foreachModel": "HBL-M6-PV-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809184",
    "foreachModel": "HBL6-U28-PS-B",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809189",
    "foreachModel": "HBL6-M6-PS-B",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809192",
    "foreachModel": "U-U28-20-AC-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809198",
    "foreachModel": "U-U28-20-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809201",
    "foreachModel": "CL-0-16-ET-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809202",
    "foreachModel": "CL-0-16-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809203",
    "foreachModel": "CL-0-32-ET-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809204",
    "foreachModel": "CL-0-32-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809205",
    "foreachModel": "CL-0-20-ET-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809206",
    "foreachModel": "CL-0-20-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809207",
    "foreachModel": "CL-0-25-ET-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809208",
    "foreachModel": "CL-0-25-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809209",
    "foreachModel": "CL-0-30-ET-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809210",
    "foreachModel": "CL-0-30-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809268",
    "foreachModel": "SA-U32-24F-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809317",
    "foreachModel": "PU-U32-08-SS-N",
    "reasons": [
      "NOT_ACTIVE",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809323",
    "foreachModel": "SA-U32-24F-PA-W",
    "reasons": [
      "NOT_ACTIVE",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809339",
    "foreachModel": "SA-U32-16F-PA-W",
    "reasons": [
      "NOT_ACTIVE",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809390",
    "foreachModel": "HBL-U28-PV-B",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809400",
    "foreachModel": "HBL-M6-PV-B",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809464",
    "foreachModel": "PMBSN-U28-PP-N",
    "reasons": [
      "PRODUCT_CODE_NOT_FOUND"
    ]
  },
  {
    "productCode": "809470",
    "foreachModel": "SA-1/8NPT-24C-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809471",
    "foreachModel": "SA-1/8NPT-32C-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809472",
    "foreachModel": "SA-1/8NPT-40C-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809473",
    "foreachModel": "SA-1/8NPT-48C-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809474",
    "foreachModel": "SA-1/8NPT-64C-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809475",
    "foreachModel": "SAL-1/8NPT-64D-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809476",
    "foreachModel": "SA-1/4NPT-32D-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809477",
    "foreachModel": "SA-1/4NPT-64D-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809478",
    "foreachModel": "SA-1/4NPT-95D-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809490",
    "foreachModel": "SA-G1/8-40C-PV-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809498",
    "foreachModel": "PMBSN-U28-PA-W",
    "reasons": [
      "PRODUCT_CODE_NOT_FOUND"
    ]
  },
  {
    "productCode": "809502",
    "foreachModel": "SA-1/8NPT-24C-PA-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809503",
    "foreachModel": "SA-1/8NPT-32C-PA-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809504",
    "foreachModel": "SA-1/8NPT-40C-PA-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809505",
    "foreachModel": "SA-1/8NPT-48C-PA-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809506",
    "foreachModel": "SA-1/8NPT-64C-PA-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809507",
    "foreachModel": "SAL-1/8NPT-64D-PA-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809509",
    "foreachModel": "SA-1/4NPT-64D-PA-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809510",
    "foreachModel": "SA-1/4NPT-95D-PA-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809526",
    "foreachModel": "HBL6X-M6-PV-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809527",
    "foreachModel": "HBL6X-U28-PV-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809546",
    "foreachModel": "SA-G1/8-40C-PV-N(O圈FKM)",
    "reasons": [
      "MODEL_MISMATCH",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809549",
    "foreachModel": "HFL6-M6-25-PS-U",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809550",
    "foreachModel": "HFL6-U28-16-PS-U",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809551",
    "foreachModel": "HFL6-U28-20-PS-U",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809553",
    "foreachModel": "HNF6-U28-16-PS-U",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809554",
    "foreachModel": "HNF6-U28-20-PS-U",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809559",
    "foreachModel": "LRL-16-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809561",
    "foreachModel": "LRL-24-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809563",
    "foreachModel": "LRL-32-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809578",
    "foreachModel": "PMLS-U28-32D-PP-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809653",
    "foreachModel": "CL-1X-16",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809654",
    "foreachModel": "CL-1-16",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809655",
    "foreachModel": "CL-1-20",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809656",
    "foreachModel": "CL-1-25",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809657",
    "foreachModel": "CL-1-30",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809658",
    "foreachModel": "CL-1-32",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809659",
    "foreachModel": "PU-U32-U28-08-SS-N",
    "reasons": [
      "NOT_ACTIVE",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809664",
    "foreachModel": "PUT-U32-05-SS-N",
    "reasons": [
      "NOT_ACTIVE",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809665",
    "foreachModel": "PMLS-U28-32D-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809667",
    "foreachModel": "LP-32D-PP-R",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809668",
    "foreachModel": "LP-32D-PP-G",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809686",
    "foreachModel": "LPR-24-PP-O",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809696",
    "foreachModel": "PNF-U32-16-SS-N",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809711",
    "foreachModel": "LRL-16-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809712",
    "foreachModel": "LRL-24-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809713",
    "foreachModel": "LRL-32-PV-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809731",
    "foreachModel": "CL-0X-16-ET-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809734",
    "foreachModel": "CL-0X-20-ET-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809735",
    "foreachModel": "CL-0X-25-ET-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809736",
    "foreachModel": "CL-0X-30-ET-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809765",
    "foreachModel": "HN-U28-16-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809767",
    "foreachModel": "HN-U28-32-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809769",
    "foreachModel": "HN-M6-16-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809771",
    "foreachModel": "HN-M6-32-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809773",
    "foreachModel": "HN6-U28-16-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809774",
    "foreachModel": "HN6-U28-32-PV-N",
    "reasons": [
      "PRODUCT_CODE_DUPLICATED",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809775",
    "foreachModel": "HN6-U28-32-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809777",
    "foreachModel": "HN6-M6-16-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809779",
    "foreachModel": "HN6-M6-32-PS-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809780",
    "foreachModel": "CL-0X-32-ET-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809782",
    "foreachModel": "LP-32D-PA-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809783",
    "foreachModel": "LP-32D-PA-R",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809784",
    "foreachModel": "LP-32D-PA-G",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809785",
    "foreachModel": "LP-32D-PA-U",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809789",
    "foreachModel": "LP-32D-PP-U",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809793",
    "foreachModel": "HN6-U28-32-AC-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809794",
    "foreachModel": "HN-U28-32-AC-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809795",
    "foreachModel": "HN-M6-16-AC-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809796",
    "foreachModel": "HN-M6-32-AC-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809797",
    "foreachModel": "HN6-M6-16-AC-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809798",
    "foreachModel": "HN6-M6-32-AC-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809799",
    "foreachModel": "HN-U28-16-AC-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809800",
    "foreachModel": "HN6-U28-16-AC-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809801",
    "foreachModel": "CL-1S-16",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809802",
    "foreachModel": "CL-1S-20",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809803",
    "foreachModel": "CL-1S-25",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809804",
    "foreachModel": "CL-1S-30",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809805",
    "foreachModel": "CL-1S-32",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809814",
    "foreachModel": "HSF6-U28-16-PS-B",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809815",
    "foreachModel": "HSF6-U28-32-PS-B",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809816",
    "foreachModel": "HSF6-M6-16-PS-B",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809820",
    "foreachModel": "CL-0X-16-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809821",
    "foreachModel": "CL-0X-20-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809822",
    "foreachModel": "CL-0X-25-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809823",
    "foreachModel": "CL-0X-30-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809824",
    "foreachModel": "CL-0X-32-PP-N",
    "reasons": [
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809826",
    "foreachModel": "SA-U32-24F-PV-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809828",
    "foreachModel": "HSF6-U28-32-PK-N",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809830",
    "foreachModel": "LP-32D-PP-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809837",
    "foreachModel": "HSF6-M6-18-PS-B",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809841",
    "foreachModel": "HFL6-U40-16-PK-N",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809861",
    "foreachModel": "HSF-U28-32-PEEK-N",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809862",
    "foreachModel": "BA-40D-64D-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809863",
    "foreachModel": "BT-48D-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809865",
    "foreachModel": "BT-79D-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809866",
    "foreachModel": "LPR-24-PP-O",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809867",
    "foreachModel": "SA-G1/8-40C-PV-N（带O圈）",
    "reasons": [
      "MODEL_MISMATCH",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809868",
    "foreachModel": "SA-G1/8-40C-PP-N（带O圈）",
    "reasons": [
      "MODEL_MISMATCH",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809873",
    "foreachModel": "SA-G1/8-64C-PV-N（带O圈）",
    "reasons": [
      "MODEL_MISMATCH",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809881",
    "foreachModel": "BL-160-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809922",
    "foreachModel": "HNE6-U28-32-PS-B",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE",
      "MODEL_MISMATCH"
    ]
  },
  {
    "productCode": "809923",
    "foreachModel": "HN6-U28-32-PK-B",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809924",
    "foreachModel": "SA-G1/8-64C-PP-N（带O圈）",
    "reasons": [
      "MODEL_MISMATCH",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809927",
    "foreachModel": "HNE-U28-32-PP-N",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE",
      "MODEL_MISMATCH"
    ]
  },
  {
    "productCode": "809932",
    "foreachModel": "LPR-32-PV-N",
    "reasons": [
      "NOT_ACTIVE",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809935",
    "foreachModel": "HN6-U28-32-ET-N",
    "reasons": [
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809937",
    "foreachModel": "HSF-U28-16-PK-N",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809939",
    "foreachModel": "UT-M6-20-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "NO_MAIN_IMAGE"
    ]
  },
  {
    "productCode": "809945",
    "foreachModel": "HSF6-U28-16-PK-N",
    "reasons": [
      "LOGO_IMAGE",
      "SHARED_IMAGE",
      "MODEL_MISMATCH"
    ]
  },
  {
    "productCode": "809948",
    "foreachModel": "SA-U32-16D-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809952",
    "foreachModel": "SA-U32-16D-PA-W",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "809953",
    "foreachModel": "SA-G1/8-64C-PK-N（带o圈）",
    "reasons": [
      "MODEL_MISMATCH",
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "839091",
    "foreachModel": "Q2002-PNV-SACF",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "839092",
    "foreachModel": "Q2002-SNV-SACF",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "839097",
    "foreachModel": "Q2018T-SNV-SPPE",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "839104",
    "foreachModel": "Q2018T-SNX-SPPE",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "839105",
    "foreachModel": "Q2028U-SMV-SPPE",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "839106",
    "foreachModel": "Q2028U-PNV-SPPE",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "839107",
    "foreachModel": "Q2028U-SMV-SACN",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "839108",
    "foreachModel": "Q2028U-PNV-SACN",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "839109",
    "foreachModel": "Q2018T-SNV-SACN",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "839110",
    "foreachModel": "Q2018T-SNX-SACN",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "839936",
    "foreachModel": "SA-3/8NPT-127-PP-N",
    "reasons": [
      "NOT_ACTIVE",
      "LOGO_IMAGE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "849018",
    "foreachModel": "Q4004-SNV-SACN",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "849052",
    "foreachModel": "Q4004-SNV-SPPE",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "869005",
    "foreachModel": "Q6012N-SNX-SPPE",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "869009",
    "foreachModel": "Q6006-PNX-SPPE",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "869025",
    "foreachModel": "Q6012N-SNV-SPPE",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  },
  {
    "productCode": "869029",
    "foreachModel": "Q6006-PNV-SPPE",
    "reasons": [
      "NOT_ACTIVE",
      "SHARED_IMAGE"
    ]
  }
];

export const FITTING_PUBLICATION_SUMMARY =
{
  "totalProductCodes": 866,
  "publishedProductCodes": 630,
  "offlineProductCodes": 236,
  "forced136": 4,
  "forced806": 21,
  "invalidMainImage": 56,
  "logoImage": 95,
  "placeholderImage": 0,
  "sharedImageProductCodes": 178,
  "fittingReplacementOfflineCodes": 44
} as const;

const publishedCodeSet = new Set(
  FITTING_PUBLISHED_PRODUCTS.map((product) => product.productCode)
);

const publishedProductByCode = new Map(
  FITTING_PUBLISHED_PRODUCTS.map((product) => [
    product.productCode,
    product,
  ])
);

const publishedDetailRouteKeySet = new Set(
[
  "barbed-fittings/ba-16c-pa-w",
  "barbed-fittings/ba-16c-pp-n",
  "barbed-fittings/ba-16d-24d-pa-w",
  "barbed-fittings/ba-16d-24d-pp-n",
  "barbed-fittings/ba-16d-32d-pa-w",
  "barbed-fittings/ba-16d-32d-pp-n",
  "barbed-fittings/ba-16f-24f-pa-w",
  "barbed-fittings/ba-16f-24f-pp-n",
  "barbed-fittings/ba-16f-24f-pv-n",
  "barbed-fittings/ba-16f-32f-pa-w",
  "barbed-fittings/ba-16f-32f-pp-n",
  "barbed-fittings/ba-16f-pa-w",
  "barbed-fittings/ba-16f-pp-n",
  "barbed-fittings/ba-16v-40v-pa-w",
  "barbed-fittings/ba-16v-40v-pp-n",
  "barbed-fittings/ba-24c-48c-pa-w",
  "barbed-fittings/ba-24c-48c-pp-n",
  "barbed-fittings/ba-24d-32d-pa-w",
  "barbed-fittings/ba-24d-32d-pp-n",
  "barbed-fittings/ba-24d-pa-w",
  "barbed-fittings/ba-24d-pp-n",
  "barbed-fittings/ba-24f-32f-pa-w",
  "barbed-fittings/ba-24f-32f-pp-n",
  "barbed-fittings/ba-24f-pa-w",
  "barbed-fittings/ba-24f-pp-n",
  "barbed-fittings/ba-24v-40v-pa-w",
  "barbed-fittings/ba-24v-40v-pp-n",
  "barbed-fittings/ba-32c-64c-pa-w",
  "barbed-fittings/ba-32c-64c-pp-n",
  "barbed-fittings/ba-32d-pa-w",
  "barbed-fittings/ba-32d-pp-n",
  "barbed-fittings/ba-32f-pa-w",
  "barbed-fittings/ba-32f-pp-n",
  "barbed-fittings/ba-32v-40v-pa-w",
  "barbed-fittings/ba-32v-40v-pp-n",
  "barbed-fittings/ba-40f-pa-w",
  "barbed-fittings/ba-40f-pp-n",
  "barbed-fittings/ba-64c-pa-w",
  "barbed-fittings/ba-64c-pp-n",
  "barbed-fittings/ba-64v-79v-pa-w",
  "barbed-fittings/ba-64v-79v-pp-n",
  "barbed-fittings/ba-64v-95v-pa-w",
  "barbed-fittings/ba-64v-95v-pp-n",
  "barbed-fittings/ba-64x-127x-pa-w",
  "barbed-fittings/ba-64x-127x-pp-n",
  "barbed-fittings/bbl-16d-pa-w",
  "barbed-fittings/bbl-16d-pp-n",
  "barbed-fittings/bbl-24d-pa-w",
  "barbed-fittings/bbl-24d-pp-n",
  "barbed-fittings/bbl-32d-pa-w",
  "barbed-fittings/bbl-32d-pp-n",
  "barbed-fittings/bl-127v-pp-n",
  "barbed-fittings/bl-16d-24d-pa-w",
  "barbed-fittings/bl-16d-24d-pp-n",
  "barbed-fittings/bl-16d-32d-pa-w",
  "barbed-fittings/bl-16d-32d-pp-n",
  "barbed-fittings/bl-16d-pa-w",
  "barbed-fittings/bl-16d-pp-n",
  "barbed-fittings/bl-16f-pa-w",
  "barbed-fittings/bl-16f-pp-n",
  "barbed-fittings/bl-24d-32d-pa-w",
  "barbed-fittings/bl-24d-32d-pp-n",
  "barbed-fittings/bl-24d-pa-w",
  "barbed-fittings/bl-24d-pp-n",
  "barbed-fittings/bl-24f-pa-w",
  "barbed-fittings/bl-24f-pp-n",
  "barbed-fittings/bl-32d-pa-w",
  "barbed-fittings/bl-32d-pp-n",
  "barbed-fittings/bl-32f-pa-w",
  "barbed-fittings/bl-32f-pp-n",
  "barbed-fittings/bl-40f-pa-w",
  "barbed-fittings/bl-40f-pp-n",
  "barbed-fittings/bl-64f-pa-w",
  "barbed-fittings/bl-64f-pp-n",
  "barbed-fittings/bl-95d-pa-w",
  "barbed-fittings/bl-95d-pp-n",
  "barbed-fittings/bt-127v-pp-n",
  "barbed-fittings/bt-16d-24d-24d-pa-w",
  "barbed-fittings/bt-16d-24d-24d-pp-n",
  "barbed-fittings/bt-16d-32d-32d-pa-w",
  "barbed-fittings/bt-16d-32d-32d-pp-n",
  "barbed-fittings/bt-16d-pa-w",
  "barbed-fittings/bt-16d-pp-n",
  "barbed-fittings/bt-16f-pa-w",
  "barbed-fittings/bt-16f-pp-n",
  "barbed-fittings/bt-24d-24d-16d-pa-w",
  "barbed-fittings/bt-24d-24d-16d-pp-n",
  "barbed-fittings/bt-24d-32d-32d-pa-w",
  "barbed-fittings/bt-24d-32d-32d-pp-n",
  "barbed-fittings/bt-24d-pa-w",
  "barbed-fittings/bt-24d-pp-n",
  "barbed-fittings/bt-24f-pa-w",
  "barbed-fittings/bt-24f-pp-n",
  "barbed-fittings/bt-32d-16d-16d-pa-w",
  "barbed-fittings/bt-32d-16d-16d-pp-n",
  "barbed-fittings/bt-32d-24d-24d-pa-w",
  "barbed-fittings/bt-32d-24d-24d-pp-n",
  "barbed-fittings/bt-32d-32d-16d-pa-w",
  "barbed-fittings/bt-32d-32d-16d-pp-n",
  "barbed-fittings/bt-32d-32d-24d-pa-w",
  "barbed-fittings/bt-32d-32d-24d-pp-n",
  "barbed-fittings/bt-32d-64t-64t-pa-w",
  "barbed-fittings/bt-32d-64t-64t-pp-n",
  "barbed-fittings/bt-32d-pa-w",
  "barbed-fittings/bt-32d-pp-n",
  "barbed-fittings/bt-32f-pa-w",
  "barbed-fittings/bt-32f-pp-n",
  "barbed-fittings/bt-40c-pa-w",
  "barbed-fittings/bt-40c-pp-n",
  "barbed-fittings/bt-64c-pa-w",
  "barbed-fittings/bt-64c-pp-n",
  "barbed-fittings/bt-64d-64d-32d-pa-w",
  "barbed-fittings/bt-64d-64d-32d-pp-n",
  "barbed-fittings/bt-64v-95v-95v-pa-w",
  "barbed-fittings/bt-64v-95v-95v-pp-n",
  "barbed-fittings/bt-95x-pa-w",
  "barbed-fittings/bt-95x-pp-n",
  "barbed-fittings/by-127v-pp-n",
  "barbed-fittings/by-16d-pa-w",
  "barbed-fittings/by-16d-pp-n",
  "barbed-fittings/by-16f-pa-w",
  "barbed-fittings/by-16f-pp-n",
  "barbed-fittings/by-24d-16d-16d-pa-w",
  "barbed-fittings/by-24d-16d-16d-pp-n",
  "barbed-fittings/by-24d-pa-w",
  "barbed-fittings/by-24d-pp-n",
  "barbed-fittings/by-24f-pa-w",
  "barbed-fittings/by-24f-pp-n",
  "barbed-fittings/by-32d-16d-16d-pa-w",
  "barbed-fittings/by-32d-16d-16d-pp-n",
  "barbed-fittings/by-32d-pa-w",
  "barbed-fittings/by-32d-pp-n",
  "barbed-fittings/by-32f-pa-w",
  "barbed-fittings/by-32f-pp-n",
  "barbed-fittings/by-40d-pa-w",
  "barbed-fittings/by-40d-pp-n",
  "barbed-fittings/by-48f-pa-w",
  "barbed-fittings/by-48f-pp-n",
  "barbed-fittings/by-64d-32d-32d-pa-w",
  "barbed-fittings/by-64d-32d-32d-pp-n",
  "barbed-fittings/by-64f-pa-w",
  "barbed-fittings/by-64f-pp-n",
  "barbed-fittings/by-95x-pa-w",
  "barbed-fittings/by-95x-pp-n",
  "bulkhead-barbed-fittings/pmb-u28-16d-pa-w",
  "bulkhead-barbed-fittings/pmb-u28-16d-pp-n",
  "bulkhead-barbed-fittings/pmb-u28-24d-pa-w",
  "bulkhead-barbed-fittings/pmb-u28-24d-pp-n",
  "bulkhead-barbed-fittings/pmb-u28-32d-pa-w",
  "bulkhead-barbed-fittings/pmb-u28-32d-pp-n",
  "check-valves/cv-be-32-pp-n",
  "female-thread-adapters/pmu-m12-u28-20-pp-n",
  "female-thread-adapters/u-m6-20-ac-b",
  "female-thread-adapters/u-m6-20-pp-n",
  "female-thread-adapters/u-u28-20-pp-n",
  "female-thread-adapters/us-m6-05-ac-b",
  "female-thread-adapters/us-m6-05-pp-n",
  "female-thread-adapters/us-m6-10-ac-b",
  "female-thread-adapters/us-m6-10-pp-n",
  "female-thread-adapters/us-m6-15-ac-b",
  "female-thread-adapters/us-m6-15-pp-n",
  "female-thread-adapters/ut-u28-15-pp-n",
  "female-thread-adapters/ut-u28-15-ps-b",
  "female-thread-adapters/ut-u28-20-pp-n",
  "female-thread-adapters/ut-u28-20-ps-b",
  "female-thread-adapters/uy-u28-10-pp-n",
  "female-thread-adapters/uy-u28-15-pp-n",
  "female-thread-adapters/uy-u28-20-pp-n",
  "filters/f-pe-100-32-pp-n",
  "filters/f-pe-60-32-pp-n",
  "hard-tube-fittings/hf-m6-20-pk-n",
  "hard-tube-fittings/hf-m6-20-ps-b",
  "hard-tube-fittings/hf-m6-20-pv-n",
  "hard-tube-fittings/hf-m6-25-pk-n",
  "hard-tube-fittings/hf-m6-25-ps-b",
  "hard-tube-fittings/hf-m6-25-pv-n",
  "hard-tube-fittings/hf-m6-32-pk-n",
  "hard-tube-fittings/hf-m6-32-ps-b",
  "hard-tube-fittings/hf-m6-32-pv-n",
  "hard-tube-fittings/hf-u28-20-pk-n",
  "hard-tube-fittings/hf-u28-20-ps-b",
  "hard-tube-fittings/hf-u28-20-pv-n",
  "hard-tube-fittings/hf-u28-25-pk-n",
  "hard-tube-fittings/hf-u28-25-ps-b",
  "hard-tube-fittings/hf-u28-25-pv-n",
  "hard-tube-fittings/hf-u28-32-pk-n",
  "hard-tube-fittings/hf-u28-32-ps-b",
  "hard-tube-fittings/hf-u28-32-pv-n",
  "hard-tube-fittings/hf6-m6-20-pk-n",
  "hard-tube-fittings/hf6-m6-20-ps-b",
  "hard-tube-fittings/hf6-m6-20-pv-n",
  "hard-tube-fittings/hf6-m6-25-pk-n",
  "hard-tube-fittings/hf6-m6-25-ps-b",
  "hard-tube-fittings/hf6-m6-25-pv-n",
  "hard-tube-fittings/hf6-m6-32-pk-n",
  "hard-tube-fittings/hf6-m6-32-ps-b",
  "hard-tube-fittings/hf6-m6-32-pv-n",
  "hard-tube-fittings/hf6-u28-20-pk-n",
  "hard-tube-fittings/hf6-u28-20-ps-b",
  "hard-tube-fittings/hf6-u28-20-pv-n",
  "hard-tube-fittings/hf6-u28-25-pk-n",
  "hard-tube-fittings/hf6-u28-25-ps-b",
  "hard-tube-fittings/hf6-u28-25-pv-n",
  "hard-tube-fittings/hf6-u28-32-pk-n",
  "hard-tube-fittings/hf6-u28-32-ps-b",
  "hard-tube-fittings/hf6-u28-32-pv-n",
  "hard-tube-fittings/hfl-m6-16-pv-b",
  "hard-tube-fittings/hfl-m6-16-pv-n",
  "hard-tube-fittings/hfl-m6-20-pv-b",
  "hard-tube-fittings/hfl-m6-20-pv-n",
  "hard-tube-fittings/hfl-m6-25-pv-b",
  "hard-tube-fittings/hfl-m6-25-pv-n",
  "hard-tube-fittings/hfl-m6-30-pv-b",
  "hard-tube-fittings/hfl-m6-30-pv-n",
  "hard-tube-fittings/hfl-m6-32-pv-b",
  "hard-tube-fittings/hfl-m6-32-pv-n",
  "hard-tube-fittings/hfl-u28-16-pv-b",
  "hard-tube-fittings/hfl-u28-16-pv-n",
  "hard-tube-fittings/hfl-u28-20-pv-b",
  "hard-tube-fittings/hfl-u28-20-pv-n",
  "hard-tube-fittings/hfl-u28-25-pv-b",
  "hard-tube-fittings/hfl-u28-25-pv-n",
  "hard-tube-fittings/hfl-u28-30-pv-b",
  "hard-tube-fittings/hfl-u28-30-pv-n",
  "hard-tube-fittings/hfl-u28-32-pv-b",
  "hard-tube-fittings/hfl-u28-32-pv-n",
  "hard-tube-fittings/hfl6-m6-16-ps-b",
  "hard-tube-fittings/hfl6-m6-20-ps-b",
  "hard-tube-fittings/hfl6-m6-30-ps-b",
  "hard-tube-fittings/hfl6-m6-32-ps-b",
  "hard-tube-fittings/hfl6-u28-25-ps-b",
  "hard-tube-fittings/hfl6-u28-30-ps-b",
  "hard-tube-fittings/hfl6-u28-32-ps-b",
  "hard-tube-fittings/hn-m6-16-pk-n",
  "hard-tube-fittings/hn-m6-16-pv-n",
  "hard-tube-fittings/hn-m6-32-pk-n",
  "hard-tube-fittings/hn-m6-32-pv-n",
  "hard-tube-fittings/hn-u28-16-pk-n",
  "hard-tube-fittings/hn-u28-16-pv-n",
  "hard-tube-fittings/hn-u28-32-pk-n",
  "hard-tube-fittings/hn-u28-32-pv-n",
  "hard-tube-fittings/hn6-m6-16-pk-n",
  "hard-tube-fittings/hn6-m6-16-pv-n",
  "hard-tube-fittings/hn6-m6-32-pk-n",
  "hard-tube-fittings/hn6-u28-16-pk-n",
  "hard-tube-fittings/hn6-u28-16-pv-n",
  "hard-tube-fittings/hnf-m6-16-pv-b",
  "hard-tube-fittings/hnf-m6-16-pv-n",
  "hard-tube-fittings/hnf-m6-20-pv-b",
  "hard-tube-fittings/hnf-m6-20-pv-n",
  "hard-tube-fittings/hnf-m6-25-pv-b",
  "hard-tube-fittings/hnf-m6-25-pv-n",
  "hard-tube-fittings/hnf-m6-30-pv-b",
  "hard-tube-fittings/hnf-m6-30-pv-n",
  "hard-tube-fittings/hnf-m6-32-pv-b",
  "hard-tube-fittings/hnf-m6-32-pv-n",
  "hard-tube-fittings/hnf-u28-16-pv-b",
  "hard-tube-fittings/hnf-u28-16-pv-n",
  "hard-tube-fittings/hnf-u28-20-pv-b",
  "hard-tube-fittings/hnf-u28-20-pv-n",
  "hard-tube-fittings/hnf-u28-25-pv-b",
  "hard-tube-fittings/hnf-u28-25-pv-n",
  "hard-tube-fittings/hnf-u28-30-pv-b",
  "hard-tube-fittings/hnf-u28-30-pv-n",
  "hard-tube-fittings/hnf-u28-32-pv-b",
  "hard-tube-fittings/hnf-u28-32-pv-n",
  "hard-tube-fittings/hnf6-m6-16-ps-b",
  "hard-tube-fittings/hnf6-m6-20-ps-b",
  "hard-tube-fittings/hnf6-m6-25-ps-b",
  "hard-tube-fittings/hnf6-m6-30-ps-b",
  "hard-tube-fittings/hnf6-m6-32-ps-b",
  "hard-tube-fittings/hnf6-u28-25-ps-b",
  "hard-tube-fittings/hnf6-u28-30-ps-b",
  "hard-tube-fittings/hnf6-u28-32-ps-b",
  "hard-tube-fittings/pnc-u32-16-pk-n",
  "hard-tube-fittings/pnc6-u32-16-pk-n",
  "luer-fittings/lcr-pa-b",
  "luer-fittings/lcr-pa-g",
  "luer-fittings/lcr-pa-o",
  "luer-fittings/lcr-pa-r",
  "luer-fittings/lcr-pa-u",
  "luer-fittings/lcr-pa-w",
  "luer-fittings/lcr-pa-y",
  "luer-fittings/lcr-pp-n",
  "luer-fittings/lns-u28-pa-b",
  "luer-fittings/lns-u28-pa-g",
  "luer-fittings/lns-u28-pa-o",
  "luer-fittings/lns-u28-pa-r",
  "luer-fittings/lns-u28-pa-u",
  "luer-fittings/lns-u28-pa-w",
  "luer-fittings/lns-u28-pa-y",
  "luer-fittings/lns-u28-pp-n",
  "luer-fittings/lp-16d-pa-b",
  "luer-fittings/lp-16d-pa-g",
  "luer-fittings/lp-16d-pa-o",
  "luer-fittings/lp-16d-pa-r",
  "luer-fittings/lp-16d-pa-u",
  "luer-fittings/lp-16d-pa-w",
  "luer-fittings/lp-16d-pa-y",
  "luer-fittings/lp-16d-pp-n",
  "luer-fittings/lp-24d-pa-b",
  "luer-fittings/lp-24d-pa-g",
  "luer-fittings/lp-24d-pa-o",
  "luer-fittings/lp-24d-pa-r",
  "luer-fittings/lp-24d-pa-u",
  "luer-fittings/lp-24d-pa-w",
  "luer-fittings/lp-24d-pa-y",
  "luer-fittings/lp-24d-pp-n",
  "luer-fittings/lp-32d-pa-o",
  "luer-fittings/lp-32d-pa-w",
  "luer-fittings/lp-32d-pa-y",
  "luer-fittings/lp-32d-pp-n",
  "luer-fittings/lpr-16-pa-b",
  "luer-fittings/lpr-16-pa-g",
  "luer-fittings/lpr-16-pa-o",
  "luer-fittings/lpr-16-pa-r",
  "luer-fittings/lpr-16-pa-u",
  "luer-fittings/lpr-16-pa-w",
  "luer-fittings/lpr-16-pa-y",
  "luer-fittings/lpr-16-pp-b",
  "luer-fittings/lpr-16-pp-g",
  "luer-fittings/lpr-16-pp-n",
  "luer-fittings/lpr-16-pp-o",
  "luer-fittings/lpr-16-pp-r",
  "luer-fittings/lpr-16-pp-u",
  "luer-fittings/lpr-16-pp-w",
  "luer-fittings/lpr-16-pp-y",
  "luer-fittings/lpr-24-pa-b",
  "luer-fittings/lpr-24-pa-g",
  "luer-fittings/lpr-24-pa-o",
  "luer-fittings/lpr-24-pa-r",
  "luer-fittings/lpr-24-pa-u",
  "luer-fittings/lpr-24-pa-w",
  "luer-fittings/lpr-24-pa-y",
  "luer-fittings/lpr-24-pp-b",
  "luer-fittings/lpr-24-pp-g",
  "luer-fittings/lpr-24-pp-n",
  "luer-fittings/lpr-24-pp-r",
  "luer-fittings/lpr-24-pp-u",
  "luer-fittings/lpr-24-pp-w",
  "luer-fittings/lpr-24-pp-y",
  "luer-fittings/lpr-32-pa-b",
  "luer-fittings/lpr-32-pa-g",
  "luer-fittings/lpr-32-pa-o",
  "luer-fittings/lpr-32-pa-r",
  "luer-fittings/lpr-32-pa-u",
  "luer-fittings/lpr-32-pa-w",
  "luer-fittings/lpr-32-pa-y",
  "luer-fittings/lpr-32-pp-b",
  "luer-fittings/lpr-32-pp-g",
  "luer-fittings/lpr-32-pp-n",
  "luer-fittings/lpr-32-pp-o",
  "luer-fittings/lpr-32-pp-r",
  "luer-fittings/lpr-32-pp-u",
  "luer-fittings/lpr-32-pp-w",
  "luer-fittings/lpr-32-pp-y",
  "luer-fittings/lps-16-pp-b",
  "luer-fittings/lps-16-pp-g",
  "luer-fittings/lps-16-pp-n",
  "luer-fittings/lps-16-pp-o",
  "luer-fittings/lps-16-pp-r",
  "luer-fittings/lps-16-pp-u",
  "luer-fittings/lps-16-pp-w",
  "luer-fittings/lps-16-pp-y",
  "luer-fittings/lps-24-pp-b",
  "luer-fittings/lps-24-pp-g",
  "luer-fittings/lps-24-pp-n",
  "luer-fittings/lps-24-pp-o",
  "luer-fittings/lps-24-pp-r",
  "luer-fittings/lps-24-pp-u",
  "luer-fittings/lps-24-pp-w",
  "luer-fittings/lps-24-pp-y",
  "luer-fittings/lps-32-pp-b",
  "luer-fittings/lps-32-pp-g",
  "luer-fittings/lps-32-pp-n",
  "luer-fittings/lps-32-pp-o",
  "luer-fittings/lps-32-pp-r",
  "luer-fittings/lps-32-pp-u",
  "luer-fittings/lps-32-pp-w",
  "luer-fittings/lps-32-pp-y",
  "luer-fittings/lpt-pa-b",
  "luer-fittings/lpt-pa-g",
  "luer-fittings/lpt-pa-o",
  "luer-fittings/lpt-pa-r",
  "luer-fittings/lpt-pa-u",
  "luer-fittings/lpt-pa-w",
  "luer-fittings/lpt-pa-y",
  "luer-fittings/lpt-pp-n",
  "luer-fittings/lrl-16-pa-w",
  "luer-fittings/lrl-24-pa-w",
  "luer-fittings/lrl-32-pa-w",
  "luer-fittings/ls-16d-pa-w",
  "luer-fittings/ls-16d-pp-n",
  "luer-fittings/ls-24d-pa-w",
  "luer-fittings/ls-24d-pp-n",
  "luer-fittings/ls-32d-pa-w",
  "luer-fittings/ls-32d-pp-n",
  "luer-fittings/lsl-16-pa-w",
  "luer-fittings/lsl-16-pp-n",
  "luer-fittings/lsl-24-pa-w",
  "luer-fittings/lsl-24-pp-n",
  "luer-fittings/lsl-32-pa-w",
  "luer-fittings/lsl-32-pp-n",
  "luer-fittings/pmls-u28-16d-pa-w",
  "luer-fittings/pmls-u28-16d-pp-n",
  "luer-fittings/pmls-u28-24d-pa-w",
  "luer-fittings/pmls-u28-24d-pp-n",
  "luer-fittings/pmls-u28-32d-pa-w",
  "quick-connect-fittings/q2001-pmv-sacn",
  "quick-connect-fittings/q2001-pmv-sppe",
  "quick-connect-fittings/q2001-pmx-sacn",
  "quick-connect-fittings/q2001-pmx-sppe",
  "quick-connect-fittings/q2001-pnv-sacn",
  "quick-connect-fittings/q2001-pnv-sppe",
  "quick-connect-fittings/q2001-pnx-sacn",
  "quick-connect-fittings/q2001-pnx-sppe",
  "quick-connect-fittings/q2001-smv-sacn",
  "quick-connect-fittings/q2001-smv-sppe",
  "quick-connect-fittings/q2001-smx-sacn",
  "quick-connect-fittings/q2001-smx-sppe",
  "quick-connect-fittings/q2001-snv-sacn",
  "quick-connect-fittings/q2001-snv-sppe",
  "quick-connect-fittings/q2001-snx-sacn",
  "quick-connect-fittings/q2001-snx-sppe",
  "quick-connect-fittings/q2002-pmv-sacn",
  "quick-connect-fittings/q2002-pmv-sppe",
  "quick-connect-fittings/q2002-pmx-sacn",
  "quick-connect-fittings/q2002-pmx-sppe",
  "quick-connect-fittings/q2002-pnv-lacn",
  "quick-connect-fittings/q2002-pnv-lppe",
  "quick-connect-fittings/q2002-pnv-sacn",
  "quick-connect-fittings/q2002-pnv-sppe",
  "quick-connect-fittings/q2002-pnx-lacn",
  "quick-connect-fittings/q2002-pnx-lppe",
  "quick-connect-fittings/q2002-pnx-sacn",
  "quick-connect-fittings/q2002-pnx-sppe",
  "quick-connect-fittings/q2002-smv-sacn",
  "quick-connect-fittings/q2002-smv-sppe",
  "quick-connect-fittings/q2002-smx-sacn",
  "quick-connect-fittings/q2002-smx-sppe",
  "quick-connect-fittings/q2002-snv-lacn",
  "quick-connect-fittings/q2002-snv-lppe",
  "quick-connect-fittings/q2002-snv-sacn",
  "quick-connect-fittings/q2002-snv-sppe",
  "quick-connect-fittings/q2002-snx-lacn",
  "quick-connect-fittings/q2002-snx-lppe",
  "quick-connect-fittings/q2002-snx-sacn",
  "quick-connect-fittings/q2002-snx-sppe",
  "quick-connect-fittings/q2003-pmv-sacn",
  "quick-connect-fittings/q2003-pmv-sppe",
  "quick-connect-fittings/q2003-pmx-sacn",
  "quick-connect-fittings/q2003-pmx-sppe",
  "quick-connect-fittings/q2003-pnv-sacn",
  "quick-connect-fittings/q2003-pnv-sppe",
  "quick-connect-fittings/q2003-pnx-sacn",
  "quick-connect-fittings/q2003-pnx-sppe",
  "quick-connect-fittings/q2003-smv-sacn",
  "quick-connect-fittings/q2003-smv-sppe",
  "quick-connect-fittings/q2003-smx-sacn",
  "quick-connect-fittings/q2003-smx-sppe",
  "quick-connect-fittings/q2003-snv-sacn",
  "quick-connect-fittings/q2003-snv-sppe",
  "quick-connect-fittings/q2003-snx-sacn",
  "quick-connect-fittings/q2003-snx-sppe",
  "quick-connect-fittings/q2004-pmv-sacn",
  "quick-connect-fittings/q2004-pmv-sppe",
  "quick-connect-fittings/q2004-pmx-sacn",
  "quick-connect-fittings/q2004-pmx-sppe",
  "quick-connect-fittings/q2004-pnv-lacn",
  "quick-connect-fittings/q2004-pnv-lppe",
  "quick-connect-fittings/q2004-pnv-sacn",
  "quick-connect-fittings/q2004-pnv-sppe",
  "quick-connect-fittings/q2004-pnx-lacn",
  "quick-connect-fittings/q2004-pnx-lppe",
  "quick-connect-fittings/q2004-pnx-sacn",
  "quick-connect-fittings/q2004-pnx-sppe",
  "quick-connect-fittings/q2004-smv-sacn",
  "quick-connect-fittings/q2004-smv-sppe",
  "quick-connect-fittings/q2004-smx-sacn",
  "quick-connect-fittings/q2004-smx-sppe",
  "quick-connect-fittings/q2004-snv-lacn",
  "quick-connect-fittings/q2004-snv-lppe",
  "quick-connect-fittings/q2004-snv-sacn",
  "quick-connect-fittings/q2004-snv-sppe",
  "quick-connect-fittings/q2004-snx-lacn",
  "quick-connect-fittings/q2004-snx-lppe",
  "quick-connect-fittings/q2004-snx-sacn",
  "quick-connect-fittings/q2004-snx-sppe",
  "quick-connect-fittings/q2018n-pnv-sacn",
  "quick-connect-fittings/q2018n-pnv-sppe",
  "quick-connect-fittings/q2018n-pnx-sacn",
  "quick-connect-fittings/q2018n-pnx-sppe",
  "quick-connect-fittings/q2018n-snv-sacn",
  "quick-connect-fittings/q2018n-snv-sppe",
  "quick-connect-fittings/q2018n-snx-sacn",
  "quick-connect-fittings/q2018n-snx-sppe",
  "quick-connect-fittings/q4004-pmv-sacn",
  "quick-connect-fittings/q4004-pmv-sppe",
  "quick-connect-fittings/q4004-pmx-sacn",
  "quick-connect-fittings/q4004-pmx-sppe",
  "quick-connect-fittings/q4004-pnv-lacn",
  "quick-connect-fittings/q4004-pnv-lppe",
  "quick-connect-fittings/q4004-pnv-sacn",
  "quick-connect-fittings/q4004-pnv-sppe",
  "quick-connect-fittings/q4004-pnx-sacn",
  "quick-connect-fittings/q4004-pnx-sppe",
  "quick-connect-fittings/q4004-smv-sacn",
  "quick-connect-fittings/q4004-smv-sppe",
  "quick-connect-fittings/q4004-smx-sacn",
  "quick-connect-fittings/q4004-smx-sppe",
  "quick-connect-fittings/q4004-snx-sacn",
  "quick-connect-fittings/q4004-snx-sppe",
  "quick-connect-fittings/q4005-pmv-sacn",
  "quick-connect-fittings/q4005-pmv-sppe",
  "quick-connect-fittings/q4005-pmx-sacn",
  "quick-connect-fittings/q4005-pmx-sppe",
  "quick-connect-fittings/q4005-pnv-sacn",
  "quick-connect-fittings/q4005-pnv-sppe",
  "quick-connect-fittings/q4005-pnx-sacn",
  "quick-connect-fittings/q4005-pnx-sppe",
  "quick-connect-fittings/q4005-smv-sacn",
  "quick-connect-fittings/q4005-smv-sppe",
  "quick-connect-fittings/q4005-smx-sacn",
  "quick-connect-fittings/q4005-smx-sppe",
  "quick-connect-fittings/q4005-snv-sacn",
  "quick-connect-fittings/q4005-snv-sppe",
  "quick-connect-fittings/q4005-snx-sacn",
  "quick-connect-fittings/q4005-snx-sppe",
  "quick-connect-fittings/q4006-pmv-sacn",
  "quick-connect-fittings/q4006-pmv-sppe",
  "quick-connect-fittings/q4006-pmx-sacn",
  "quick-connect-fittings/q4006-pmx-sppe",
  "quick-connect-fittings/q4006-pnv-sacn",
  "quick-connect-fittings/q4006-pnv-sppe",
  "quick-connect-fittings/q4006-pnx-lacn",
  "quick-connect-fittings/q4006-pnx-lppe",
  "quick-connect-fittings/q4006-pnx-sacn",
  "quick-connect-fittings/q4006-pnx-sppe",
  "quick-connect-fittings/q4006-smv-sacn",
  "quick-connect-fittings/q4006-smv-sppe",
  "quick-connect-fittings/q4006-smx-sacn",
  "quick-connect-fittings/q4006-smx-sppe",
  "quick-connect-fittings/q4006-snv-sacn",
  "quick-connect-fittings/q4006-snv-sppe",
  "quick-connect-fittings/q4006-snx-sacn",
  "quick-connect-fittings/q4006-snx-sppe",
  "quick-connect-fittings/q4014n-pnv-sacn",
  "quick-connect-fittings/q4014n-pnv-sppe",
  "quick-connect-fittings/q4014n-snv-sacn",
  "quick-connect-fittings/q4014n-snv-sppe",
  "quick-connect-fittings/q4014n-snx-sacn",
  "quick-connect-fittings/q4014n-snx-sppe",
  "quick-connect-fittings/q6006-pnv-lppe",
  "quick-connect-fittings/q6006-pnx-lppe",
  "quick-connect-fittings/q6006-smv-lppe",
  "quick-connect-fittings/q6006-smv-sppe",
  "quick-connect-fittings/q6006-smx-lppe",
  "quick-connect-fittings/q6006-smx-sppe",
  "quick-connect-fittings/q6006-snv-sppe",
  "quick-connect-fittings/q6006-snx-sppe",
  "quick-connect-fittings/q6008-pnv-lppe",
  "quick-connect-fittings/q6008-pnv-sppe",
  "quick-connect-fittings/q6008-pnx-lppe",
  "quick-connect-fittings/q6008-pnx-sppe",
  "quick-connect-fittings/q6008-smv-lppe",
  "quick-connect-fittings/q6008-smv-sppe",
  "quick-connect-fittings/q6008-smx-lppe",
  "quick-connect-fittings/q6008-smx-sppe",
  "quick-connect-fittings/q6008-snv-lppe",
  "quick-connect-fittings/q6008-snv-sppe",
  "quick-connect-fittings/q6008-snx-sppe",
  "quick-connect-fittings/q6012-pnv-sppe",
  "quick-connect-fittings/q6012-pnx-sppe",
  "quick-connect-fittings/q6012-smv-sppe",
  "quick-connect-fittings/q6012-smx-sppe",
  "quick-connect-fittings/q6012-snv-sppe",
  "quick-connect-fittings/q6012-snx-sppe",
  "quick-connect-fittings/q6012n-pnv-sppe",
  "quick-connect-fittings/q6012n-pnx-sppe",
  "quick-connect-fittings/q6038n-pnv-sppe",
  "quick-connect-fittings/q6038n-pnx-sppe",
  "quick-connect-fittings/q6038n-snv-sppe",
  "quick-connect-fittings/q6038n-snx-sppe",
  "thread-to-barbed-fittings/sa-u28-16d-pp-n",
  "thread-to-barbed-fittings/sa-u28-24d-pa-w",
  "thread-to-barbed-fittings/sa-u28-24d-pp-n",
  "thread-to-barbed-fittings/sa-u28-32d-pa-w",
  "thread-to-barbed-fittings/sa-u28-32d-pp-n",
  "thread-to-barbed-fittings/sa-u28-40d-pa-w",
  "thread-to-barbed-fittings/sa-u28-40d-pp-n",
  "thread-to-barbed-fittings/sa-u28-48d-pa-w",
  "thread-to-barbed-fittings/sa-u28-48d-pp-n",
  "thread-to-barbed-fittings/sa-u32-32f-pa-w",
  "thread-to-barbed-fittings/sa-u32-32f-pp-n",
  "thread-to-barbed-fittings/sa-x32-24d-pa-w",
  "thread-to-barbed-fittings/sa-x32-24d-pp-n",
  "thread-to-barbed-fittings/sa-x32-32d-pa-w",
  "thread-to-barbed-fittings/sa-x32-32d-pp-n",
  "thread-to-barbed-fittings/sal-u28-16d-pa-w",
  "thread-to-barbed-fittings/sal-u28-16d-pp-n",
  "thread-to-barbed-fittings/sal-u28-32d-pa-w",
  "thread-to-barbed-fittings/sal-u28-32d-pp-n",
  "thread-to-barbed-fittings/sal-u32-16d-pa-w",
  "thread-to-barbed-fittings/sal-u32-16d-pp-n",
  "thread-to-barbed-fittings/sal-u32-32d-pa-w",
  "thread-to-barbed-fittings/sal-u32-32d-pp-n",
  "thread-to-barbed-fittings/sb-m5-16d-pa-w",
  "thread-to-barbed-fittings/sb-m5-16d-pp-n",
  "thread-to-barbed-fittings/sb-m5-24d-pa-w",
  "thread-to-barbed-fittings/sb-m5-24d-pp-n",
  "thread-to-barbed-fittings/sb-m5-32d-pa-w",
  "thread-to-barbed-fittings/sb-m5-32d-pp-n",
  "thread-to-barbed-fittings/sb-m5-40d-pa-w",
  "thread-to-barbed-fittings/sb-m5-40d-pp-n",
  "thread-to-barbed-fittings/sb-m6-24-ac-b",
  "thread-to-barbed-fittings/sb-m6-40-ac-b",
  "thread-to-barbed-fittings/sb-u28-16-ac-b",
  "thread-to-barbed-fittings/sb-u28-40-ac-b",
  "thread-to-barbed-fittings/sbr-u28-16-pp-n",
  "thread-to-barbed-fittings/sbr-u28-24-pp-n",
  "thread-to-barbed-fittings/sbr-u28-32-pp-n",
  "thread-to-barbed-fittings/sbs-m6-24d-pa-w",
  "thread-to-barbed-fittings/sbs-m6-24d-pp-n",
  "thread-to-barbed-fittings/sbs-m6-32d-pa-w",
  "thread-to-barbed-fittings/sbs-m6-32d-pp-n",
  "thread-to-barbed-fittings/sc-m6-16-pp-n",
  "thread-to-barbed-fittings/sc-m6-32-pp-n",
  "thread-to-barbed-fittings/sc-u28-16d-pp-n",
  "thread-to-barbed-fittings/sc-u28-24d-pp-n",
  "thread-to-barbed-fittings/sc-u28-32d-pp-n"
]
);

function text(value: unknown): string {
  return String(value ?? "").trim();
}

function collectProductCodes(
  product: Record<string, unknown>
): string[] {
  return [
    product.productCode,
    product.productId,
    ...(Array.isArray(product.productCodes)
      ? product.productCodes
      : []),
    ...(Array.isArray(product.productIds)
      ? product.productIds
      : []),
  ]
    .map(text)
    .filter(Boolean);
}

export function isPublishedFittingProductCode(
  productCode: unknown
): boolean {
  return publishedCodeSet.has(text(productCode));
}

export function isPublishedFittingProduct(
  product: Record<string, unknown>
): boolean {
  const codes = collectProductCodes(product);
  return (
    codes.length > 0 &&
    codes.every((code) => publishedCodeSet.has(code))
  );
}

export function getPublishedFittingProductByCode(
  productCode: unknown
): PublishedFittingProduct | null {
  return publishedProductByCode.get(text(productCode)) ?? null;
}

export function isPublishedFittingDetailRoute(
  productTypeId: unknown,
  slug: unknown
): boolean {
  const key = `${text(productTypeId).toLowerCase()}/${text(slug).toLowerCase()}`;
  return publishedDetailRouteKeySet.has(key);
}
