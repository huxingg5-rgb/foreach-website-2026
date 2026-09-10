import type { DiaphragmPumpReferenceCopyKey } from "@/data/products/detail/diaphragm-pump-reference-models";

type ProductPhoto = {
  src: string;
  alt: { zh: string; en: string };
};

// Approved application-based descriptions for the real product photos.
// Other international pages use the existing English fallback.
const PRODUCT_PHOTOS: Partial<Record<DiaphragmPumpReferenceCopyKey, ProductPhoto[]>> = {
  "dpgl800-brushless": [
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-diaphragm-vacuum-pump.webp",
      "alt": {
        "zh": "FOREACH DPGL800 无刷微型隔膜真空泵，单头空载气体流量 6 L/min，用于仪器负压建立",
        "en": "FOREACH DPGL800 brushless miniature diaphragm vacuum pump with 6 L/min no-load gas flow per head for vacuum generation in instruments"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-diaphragm-waste-aspiration-pump.webp",
      "alt": {
        "zh": "FOREACH DPGL800 无刷隔膜废液抽吸泵，单头空载气体流量 6 L/min，用于生化分析仪含气废液抽吸",
        "en": "FOREACH DPGL800 brushless diaphragm waste aspiration pump with 6 L/min no-load gas flow per head for gas-liquid waste handling in chemistry analyzers"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-gas-liquid-diaphragm-pump.webp",
      "alt": {
        "zh": "FOREACH DPGL800 无刷微型气液混合隔膜泵，单头空载气体流量 6 L/min，用于实验室自动化设备残液抽吸",
        "en": "FOREACH DPGL800 brushless miniature gas-liquid diaphragm pump with 6 L/min no-load gas flow per head for residual liquid aspiration in laboratory automation"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpgl800/images/foreach-dpgl800-6l-min-gas-brushless-diaphragm-tubing-evacuation-pump.webp",
      "alt": {
        "zh": "FOREACH DPGL800 无刷隔膜管路排空泵，单头空载气体流量 6 L/min，用于清除仪器管路中的空气和残液",
        "en": "FOREACH DPGL800 brushless diaphragm evacuation pump with 6 L/min no-load gas flow per head for removing air and residual liquid from instrument tubing"
      }
    }
  ],
  "dpl30h-brushless": [
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-analyzer-wash-pump.webp",
      "alt": {
        "zh": "FOREACH DPL30H 无刷高压隔膜清洗液泵，空载流量 300 mL/min，用于生化分析仪高阻力清洗液路",
        "en": "FOREACH DPL30H brushless high-pressure diaphragm wash pump with 300 mL/min free-flow capacity for high-resistance wash circuits in chemistry analyzers"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-liquid-supply-pump.webp",
      "alt": {
        "zh": "FOREACH DPL30H 无刷高背压隔膜供液泵，空载流量 300 mL/min，用于实验室自动化设备多阀液路供液",
        "en": "FOREACH DPL30H brushless diaphragm liquid supply pump with 300 mL/min free-flow capacity for elevated-backpressure circuits with multiple valves in laboratory automation"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-flow-cell-feed-pump.webp",
      "alt": {
        "zh": "FOREACH DPL30H 无刷高压隔膜辅助供液泵，空载流量 300 mL/min，用于分析仪器流通池前端供液",
        "en": "FOREACH DPL30H brushless high-pressure diaphragm feed pump with 300 mL/min free-flow capacity for auxiliary liquid supply to analyzer flow cells"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushless-diaphragm-liquid-circulation-pump.webp",
      "alt": {
        "zh": "FOREACH DPL30H 无刷隔膜液体循环泵，空载流量 300 mL/min，用于仪器高背压液路循环",
        "en": "FOREACH DPL30H brushless diaphragm liquid circulation pump with 300 mL/min free-flow capacity for instrument circuits with elevated backpressure"
      }
    }
  ],
  "dpl30h-brushed": [
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushed-diaphragm-probe-wash-pump.webp",
      "alt": {
        "zh": "FOREACH DPL30H 有刷高压隔膜探针冲洗泵，空载流量 300 mL/min，用于分析仪器探针清洗供液",
        "en": "FOREACH DPL30H brushed high-pressure diaphragm probe wash pump with 300 mL/min free-flow capacity for probe cleaning in analytical instruments"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushed-diaphragm-pressurized-liquid-transfer-pump.webp",
      "alt": {
        "zh": "FOREACH DPL30H 有刷高压隔膜输液泵，空载流量 300 mL/min，用于小内径管路加压输液",
        "en": "FOREACH DPL30H brushed high-pressure diaphragm liquid transfer pump with 300 mL/min free-flow capacity for pressurized delivery through small-bore tubing"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushed-diaphragm-filter-feed-pump.webp",
      "alt": {
        "zh": "FOREACH DPL30H 有刷高压隔膜辅助供液泵，空载流量 300 mL/min，用于仪器过滤器前端供液",
        "en": "FOREACH DPL30H brushed high-pressure diaphragm feed pump with 300 mL/min free-flow capacity for auxiliary liquid supply upstream of instrument filters"
      }
    },
    {
      "src": "/images/products/pumps/diaphragm-pumps/dpl30h/images/foreach-dpl30h-300ml-min-brushed-diaphragm-fluid-circuit-flushing-pump.webp",
      "alt": {
        "zh": "FOREACH DPL30H 有刷高压隔膜冲洗泵，空载流量 300 mL/min，用于自动化设备高阻力液路冲洗",
        "en": "FOREACH DPL30H brushed high-pressure diaphragm flushing pump with 300 mL/min free-flow capacity for high-resistance fluid circuits in automated equipment"
      }
    }
  ]
};

export function getDiaphragmPumpProductPhotos(
  copyKey: DiaphragmPumpReferenceCopyKey | undefined,
  locale: string,
) {
  const photos = copyKey ? PRODUCT_PHOTOS[copyKey] : undefined;
  return photos?.map(({ src, alt }) => ({
    src,
    alt: locale === "zh" || locale === "zh-CN" ? alt.zh : alt.en,
  }));
}
