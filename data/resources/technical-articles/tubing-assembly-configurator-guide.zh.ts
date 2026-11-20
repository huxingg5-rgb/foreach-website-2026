import type { DiaphragmPumpEngineeringArticleCopy } from "./diaphragm-pump-engineering-article.types";
import { flangedTubingAssembliesSlug, tubingAssemblyConfiguratorSlug } from "./technical-article-availability";

const configuratorHref = "/products/tubing-assemblies/flanged-tubing/details/";
const imageRoot = `/images/resources/technical-articles/${tubingAssemblyConfiguratorSlug}`;
const configuratorImage = `${imageRoot}/fep-dual-end-configuration.webp`;
const configuratorAlt = "恒永达管组件配置界面，显示 FEP 管、A 端 1/4-28 UNF、B 端 M6×1 和成品长度 250 ±5 mm";
const drawingImage = `${imageRoot}/fep-dual-end-generated-drawing.webp`;

export const tubingAssemblyConfiguratorCopy: DiaphragmPumpEngineeringArticleCopy = {
  metadata: {
    title: "仪器管组件如何在线配置并自动生成 2D 图纸？",
    seoTitle: "仪器管组件在线配置与 2D 图纸自动生成 | 恒永达",
    seoDescription: "在恒永达官网在线配置仪器管组件，选择管材、管径、成品长度及 A/B 两端接头，预览装配结构并下载 2D 选型图纸，用于方案评审、询价与打样沟通。",
    coverImage: `${imageRoot}/flanged-tubing-assembly-cover.webp`,
    coverAlt: "翻边管组件端部特写，显示白色螺纹接头和金属垫片",
  },
  deck: "在恒永达官网分别配置管材、管径、成品长度及 A/B 两端接头，再生成包含尺寸和物料明细的 2D 选型图纸。本文以两端螺纹不同的 FEP 管组件为例，说明如何出图并核对配置。",
  leadBlocks: [
    {
      type: "paragraph",
      text: "给分析仪器设计一段试剂管路时，工程师需要确定管材、内外径、成品长度和两端连接。有时两端分别接到阀和液路模块，螺纹或密封结构并不相同。恒永达的管组件在线配置工具可以分别设置 A、B 两端，预览装配结构，并自动生成包含尺寸、接头型号和物料明细的 2D 选型图纸。研发、装配和采购可以用同一版 PDF 核对配置。",
    },
  ],
  sections: [
    {
      title: "仪器管组件在线配置需要哪些参数？",
      tocLabel: "配置参数",
      blocks: [
        { type: "paragraph", text: "可直接在上方配置器调整 FEP 示例，或按液路图和两端端口图纸录入实际项目的参数。" },
        { type: "links", items: [{ label: "前往管组件详情页查看已保存配置", href: configuratorHref }] },
        {
          type: "list",
          ordered: true,
          items: [
            "选管材和管径。在工具中按所选管材查看可用尺寸。配置界面按 OD × ID 显示，OD 是外径，ID 是内径。外径用于匹配接头及配套部件，内径影响管内流阻和容积，需要结合液路要求选择。",
            "填写成品长度 L 和公差。先结合实际走管路径确定所需长度，再填写成品长度和允许偏差。图纸评审时，双方应明确 L 从哪两个基准量取。若有弯曲布管，记下测量路径及装配余量，供工程确认。",
            "分别配置 A、B 两端。用液路图标明每一端连接的设备位置，再选择对应的连接方式、接头系列、螺纹和材质。选择双端时，两端可按端口分别配置。选择单端时，A 端配置接头，B 端为自由管端，可填写自由端要求。",
            "补充配套件与标识。按所选端接核对支撑垫片等配件。有多根外观相近的管路时，可填写管标文字，帮助装配人员按液路图识别管路。已建立客户零件号的项目，也可把零件号写入图纸信息。",
          ],
        },
      ],
    },
    {
      title: "仪器管组件两端接口不同，怎么配置？",
      tocLabel: "A/B 两端配置",
      blocks: [
        { type: "paragraph", text: "先以各自设备端口的图纸为准，分别核对 A、B 端的螺纹、密封面和可用安装空间。在线工具提供翻边、卡箍和卡环选项，具体接头与配件按管外径和各端组合匹配。以翻边连接为例，螺纹负责压紧，管端翻边需要贴合端口的平底密封面。即使螺纹能旋入，也要检查翻边和垫片能否在正确的位置受压。" },
        { type: "links", items: [{ label: "查看翻边管组件选型指南", href: `/resources/technical-articles/${flangedTubingAssembliesSlug}/` }] },
        { type: "paragraph", text: "例如，一段仪器内部管路的 A 端接 1/4-28 UNF 平底端口，B 端接 M6×1 平底端口。下面是一组可在工具中复现的双端 FEP 配置，用于演示如何把两端要求落实到接头料号。" },
        {
          type: "table",
          headers: ["配置项", "示例输入"],
          rows: [
            ["管材与尺寸", "透明 FEP，外径 1.6 mm，内径 0.3 mm"],
            ["成品长度", "L = 250 mm，公差 ±5 mm"],
            ["A 端", "翻边，1/4-28 UNF，接头 HFL-U28-16-PV-N，配 SUS 支撑垫片"],
            ["B 端", "翻边，M6×1，接头 HFL-M6-16-PV-N，配 SUS 支撑垫片"],
          ],
        },
        {
          type: "figure",
          src: configuratorImage,
          alt: configuratorAlt,
          width: 1232,
          height: 674,
          caption: "FEP 双端管组件在官网配置器中的实际界面。上方预览和下方参数区分别显示 A、B 端接头及管材尺寸。查看原图",
          captionHref: configuratorImage,
        },
        { type: "paragraph", text: "录入后，可在组件预览和「部件用量明细」中核对 A、B 端是否与液路图一致。这组管径、长度和公差用于演示配置流程，实际项目按介质、流量、走管和装配要求确定。" },
      ],
    },
    {
      title: "自动生成的管组件 2D 图纸怎么看？",
      tocLabel: "生成与核对图纸",
      blocks: [
        { type: "paragraph", text: "完成配置后，点击「生成2D图纸」，即可查看选型图纸并通过「下载PDF」导出。接头外形引用对应的原始零件图，管径、成品长度与物料明细随当前配置更新。以上面的 FEP 示例为例，图纸同时显示 L = 250 ±5 mm 和 A、B 两端各自的接头料号，评审时可以把它与设备端口图一一对照。" },
        {
          type: "figure",
          src: drawingImage,
          alt: "官网生成的 FEP 双端管组件 2D 选型图纸，标注管径、250 ±5 mm 长度、两端螺纹及物料明细",
          width: 850,
          height: 643,
          caption: "由同一组 FEP 配置生成的 2D 选型图纸，含尺寸、两端接头、支撑垫片、物料明细和 R1 版本。查看原图",
          captionHref: drawingImage,
        },
        {
          type: "list",
          items: [
            "研发核对接口和尺寸。查看两端密封形式、螺纹和长度基准，并在整机图上检查走管路径、弯曲空间和工具操作空间。",
            "装配核对方向和配件。确认 A、B 端接到哪两个位置，垫片等配套件是否齐全，管标文字和位置能否让装配人员快速识别。",
            "采购核对图纸版本和物料。将配置名称、版本和客户零件号对应起来，提交询价或打样时同步提供目标数量与端口图纸。",
          ],
        },
        { type: "paragraph", text: "生成图纸时，配置会保存在当前浏览器，可再次进入编辑或另存方案。跨团队评审时，下载并共享对应版本的 PDF。两端接头或长度发生变更后，更新配置并重新出图，避免各团队按不同版本沟通。" },
      ],
    },
    {
      title: "定制管组件从选型图纸到打样还要确认什么？",
      tocLabel: "打样前确认",
      blocks: [
        { type: "paragraph", text: "选型图纸可用于方案评审和询价。进入打样前，请一并提供设备端口图、长度测量基准、介质及清洗液、工作温度、压力或负压，以及样品数量和验收要求。涉及空间避让时，补充实际布管图。恒永达可据此核对配套和正式图纸，装机后再按项目工况验证密封、通流及装配表现。" },
      ],
    },
  ],
  faqTitle: "",
  faqItems: [],
  cta: {
    title: "配置仪器管组件并生成选型图纸",
    description: "已有管径、管长和端口信息，可以直接录入并生成第一版选型图纸。",
    contactLabel: "联系工程师",
    productsLabel: "开始配置管组件",
    productsHref: "#online-configurator",
  },
};
