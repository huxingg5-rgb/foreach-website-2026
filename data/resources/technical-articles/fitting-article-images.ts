// Article-only WebP image resolution. Supports the published legacy product URLs
// and the descriptive URLs used by the local product-image update.
const webpImages: Record<string, string> = {
  "/images/products/fittings/quick-connect-fittings/products/q2001-pnv-sppe-main.jpg": "/images/products/fittings/quick-connect-fittings/products/q2001-pnv-sppe-main.webp",
  "/images/products/fittings/quick-connect-fittings/products/q2001-smv-sppe-main.jpg": "/images/products/fittings/quick-connect-fittings/products/q2001-smv-sppe-main.webp",
  "/images/products/fittings/quick-connect-fittings/products/q2001-smx-sppe-main.jpg": "/images/products/fittings/quick-connect-fittings/products/q2001-smx-sppe-main.webp",
  "/images/products/fittings/quick-connect-fittings/products/q2001-pnx-sppe-main.jpg": "/images/products/fittings/quick-connect-fittings/products/q2001-pnx-sppe-main.webp",
  "/images/products/fittings/quick-connect-fittings/products/q2002-snx-sppe-main.jpg": "/images/products/fittings/quick-connect-fittings/products/q2002-snx-sppe-main.webp",
  "/images/products/fittings/quick-connect-fittings/products/q2004-snv-lppe-main.jpg": "/images/products/fittings/quick-connect-fittings/products/q2004-snv-lppe-main.webp",
  "/images/products/fittings/quick-connect-fittings/products/q2018n-snv-sppe-main.jpg": "/images/products/fittings/quick-connect-fittings/products/q2018n-snv-sppe-main.webp",
  "/images/products/fittings/quick-connect-fittings/products/q4004-pnv-sppe-main.jpg": "/images/products/fittings/quick-connect-fittings/products/q4004-pnv-sppe-main.webp",
  "/images/products/fittings/quick-connect-fittings/products/q6006-snv-sppe-main.jpg": "/images/products/fittings/quick-connect-fittings/products/q6006-snv-sppe-main.webp",
  "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-straight-male-thread-to-barb-fitting-1-4-28-unf-sa-u28-32d-pp-n.webp": "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-straight-male-thread-to-barb-fitting-1-4-28-unf-sa-u28-32d-pp-n.webp",
  "/images/products/fittings/thread-to-barbed-fittings/products/sa-u28-32d-pp-n.jpg": "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-straight-male-thread-to-barb-fitting-1-4-28-unf-sa-u28-32d-pp-n.webp",
  "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-flat-bottom-seal-male-thread-to-barb-fitting-m5-x-0-8-sb-m5-32d-pp-n.webp": "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-flat-bottom-seal-male-thread-to-barb-fitting-m5-x-0-8-sb-m5-32d-pp-n.webp",
  "/images/products/fittings/thread-to-barbed-fittings/products/sb-m5-32d-pp-n.jpg": "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-flat-bottom-seal-male-thread-to-barb-fitting-m5-x-0-8-sb-m5-32d-pp-n.webp",
  "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-flat-bottom-seal-male-thread-to-barb-fitting-m6-x-1-sbs-m6-32d-pp-n.webp": "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-flat-bottom-seal-male-thread-to-barb-fitting-m6-x-1-sbs-m6-32d-pp-n.webp",
  "/images/products/fittings/thread-to-barbed-fittings/products/sbs-m6-32d-pp-n.jpg": "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-flat-bottom-seal-male-thread-to-barb-fitting-m6-x-1-sbs-m6-32d-pp-n.webp",
  "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-swivel-male-thread-to-barb-fitting-1-4-28-unf-sbr-u28-32-pp-n.webp": "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-swivel-male-thread-to-barb-fitting-1-4-28-unf-sbr-u28-32-pp-n.webp",
  "/images/products/fittings/thread-to-barbed-fittings/products/sbr-u28-32-pp-n.jpg": "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pp-swivel-male-thread-to-barb-fitting-1-4-28-unf-sbr-u28-32-pp-n.webp",
  "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pp-equal-elbow-barbed-fitting-bl-32f-pp-n.webp": "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pp-equal-elbow-barbed-fitting-bl-32f-pp-n.webp",
  "/images/products/fittings/barbed-fittings/products/bl-32f-pp-n-main.jpg": "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pp-equal-elbow-barbed-fitting-bl-32f-pp-n.webp",
  "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pp-equal-elbow-barbed-fitting-bl-32d-pp-n.webp": "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pp-equal-elbow-barbed-fitting-bl-32d-pp-n.webp",
  "/images/products/fittings/barbed-fittings/products/bl-32d-pp-n-main.jpg": "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pp-equal-elbow-barbed-fitting-bl-32d-pp-n.webp",
  "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pp-equal-straight-barbed-fitting-ba-32f-pp-n.webp": "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pp-equal-straight-barbed-fitting-ba-32f-pp-n.webp",
  "/images/products/fittings/barbed-fittings/products/ba-32f-pp-n-main.jpg": "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pp-equal-straight-barbed-fitting-ba-32f-pp-n.webp",
  "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pa-equal-straight-barbed-fitting-ba-32f-pa-w.webp": "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pa-equal-straight-barbed-fitting-ba-32f-pa-w.webp",
  "/images/products/fittings/barbed-fittings/products/ba-32f-pa-w-main.jpg": "/images/products/fittings/barbed-fittings/products/3-2mm-tube-id-pa-equal-straight-barbed-fitting-ba-32f-pa-w.webp",
  "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pa-straight-male-thread-to-barb-fitting-1-4-28-unf-sa-u28-32d-pa-w.webp": "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pa-straight-male-thread-to-barb-fitting-1-4-28-unf-sa-u28-32d-pa-w.webp",
  "/images/products/fittings/thread-to-barbed-fittings/products/sa-u28-32d-pa-w.jpg": "/images/products/fittings/thread-to-barbed-fittings/products/3-2mm-tube-id-pa-straight-male-thread-to-barb-fitting-1-4-28-unf-sa-u28-32d-pa-w.webp"
};

export function fittingArticleImage(source: string): string {
  return webpImages[source] ?? source;
}
