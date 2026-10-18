import { tubingAssemblyCards, type TubingAssemblyCard } from "./tubing-assembly-cards.en";

// Temporary Chinese review copy; preserve the existing family routes.
export const tubingAssemblyReviewTypeNames: Record<string, string> = {
  "flanged-tubing": "法兰翻边管组件",
  "retaining-ring-kits": "卡环管组件",
  "ferrule-kits": "卡套管组件",
};

// Ranges summarize existing tube pairs, not arbitrary ID/OD combinations.
// PFA end forming and coil/sleeve dimensions are evaluated per drawing.
const copy: Record<string, { title: string; description: string }> = {
  "tubing-assembly-fep-flanged": {
    title: "FEP 法兰翻边管组件",
    description: "透明 FEP 管，参考内径 0.3–2.0 mm，内外径按规格配套。支持单端、双端翻边，管长及 A、B 两端连接可定制。",
  },
  "tubing-assembly-ptfe-flanged": {
    title: "PTFE 法兰翻边管组件",
    description: "本色 PTFE 管，参考内径 0.5–2.0 mm，内外径按规格配套。支持单端、双端翻边，管长及 A、B 两端连接可定制。",
  },
  "tubing-assembly-pfa-flanged": {
    title: "PFA 法兰翻边管组件",
    description: "PFA 管参考外径 1.6 mm，内径可选 0.5、0.8、1.0 mm。支持管长及端部连接定制，翻边与端口配套按图确认。",
  },
  "tubing-assembly-black-ptfe-flanged": {
    title: "黑色 PTFE 法兰翻边管组件",
    description: "黑色 PTFE 管，参考内径 0.8–2.0 mm，支持管长及两端连接定制。避光配置按试剂敏感波段与遮光要求确认。",
  },
  "tubing-assembly-coiled-flanged": {
    title: "弹簧式法兰翻边管组件",
    description: "管体螺旋成型，两端直管段可配置单端或双端翻边连接。管材、内外径、螺旋直径、圈数及两端直管长度可按图定制。",
  },
  "tubing-assembly-sleeved-flanged": {
    title: "带防磨护套的法兰翻边管组件",
    description: "翻边管组件加装防磨护套，覆盖长度及安装位置可指定。支持管材、管径、成品长度及两端连接定制。",
  },
  "tubing-assembly-retaining-ring-fep": {
    title: "FEP 卡环管组件",
    description: "透明 FEP 管搭配卡环压套与密封垫圈。支持管内外径、管长及 A、B 两端连接定制。",
  },
  "tubing-assembly-retaining-ring-ptfe": {
    title: "PTFE 卡环管组件",
    description: "本色 PTFE 管搭配卡环压套与密封垫圈。支持管内外径、管长及 A、B 两端连接定制。",
  },
  "tubing-assembly-retaining-ring-pfa": {
    title: "PFA 卡环管组件",
    description: "PFA 管搭配卡环压套与密封垫圈。支持管径、管长及两端连接定制，具体管径与端口配套按图确认。",
  },
  "tubing-assembly-retaining-ring-black-ptfe": {
    title: "黑色 PTFE 卡环管组件",
    description: "黑色 PTFE 管采用卡环连接，支持管径、管长及两端连接定制。避光配置按试剂敏感波段与遮光要求确认。",
  },
  "tubing-assembly-retaining-ring-coiled": {
    title: "弹簧式卡环管组件",
    description: "管体螺旋成型，两端配置卡环连接。管材、内外径、螺旋直径、圈数及两端直管长度可按图定制。",
  },
  "tubing-assembly-retaining-ring-sleeved": {
    title: "带防磨护套的卡环管组件",
    description: "卡环管组件加装防磨护套，覆盖长度及安装位置可指定。支持管材、管径、成品长度及两端连接定制。",
  },
  "tubing-assembly-fep-ferrule": {
    title: "FEP 卡套管组件", description: "透明 FEP 管采用卡套连接，管端无需预先翻边，外径可选 1.6、2.0、2.5、3.0、3.2 mm。管内径、管长及 A、B 两端连接可定制。",
  },
  "tubing-assembly-ptfe-ferrule": {
    title: "PTFE 卡套管组件", description: "本色 PTFE 管采用卡套连接，外径可选 1.6、2.0、2.5、3.0、3.2 mm。支持管内径、管长及两端连接定制，材料按工作液与清洗液要求选配。",
  },
  "tubing-assembly-black-ptfe-ferrule": {
    title: "黑色 PTFE 卡套管组件", description: "黑色 PTFE 管采用卡套连接，支持管径、管长、两端连接及管路标识定制。避光配置按试剂敏感波段与遮光要求确认。",
  },
  "tubing-assembly-pfa-ferrule": {
    title: "PFA 卡套管组件", description: "PFA 管采用卡套连接，管端无需预先翻边，支持管长及两端连接定制。具体管径、卡套和端口配置按图纸与工况确认。",
  },
  "tubing-assembly-coiled-ferrule": {
    title: "弹簧式卡套管组件",
    description: "管体螺旋成型，两端配置卡套连接。管材、内外径、螺旋直径、圈数及两端直管长度可按图定制。",
  },
  "tubing-assembly-sleeved-ferrule": {
    title: "带防磨护套的卡套管组件",
    description: "卡套管组件加装防磨护套，覆盖长度及安装位置可指定。支持管材、管径、成品长度及两端连接定制。",
  },
};
const labels: Record<string, string> = {
  Tubing: "管材", Length: "长度", Connection: "连接结构", Ports: "端口",
  "Fitting material": "接头材质", Thread: "螺纹规格",
  "Tube OD": "管外径", "Retaining ring material": "卡环材质",
};
const values: Record<string, string> = {
  "Custom to drawing": "按图纸定制",
  "Retaining sleeve and sealing ring": "卡环压套与密封垫圈", "Matching fitting and ferrule": "配套接头与卡套",
  "Material and dimensions to specify": "按需求指定材质与尺寸", "Match the mating port drawing": "按配合端口图纸匹配",
};
// Existing fitting photos illustrate connection options, not complete tubing assemblies.
const ferruleCardImages: Record<string, { src: string; alt: string }> = {
  "tubing-assembly-ptfe-ferrule": {
    src: "/images/products/fittings/hard-tube-fittings/photos/ferrule-fitting-pvdf-natural-knurled-body.webp",
    alt: "白色卡套接头实拍，作为 PTFE 管组件的接头外观参考",
  },
  "tubing-assembly-pfa-ferrule": {
    src: "/images/products/fittings/hard-tube-fittings/photos/ferrule-fitting-peek-natural-knurled-body-pair.webp",
    alt: "米黄色卡套接头组合实拍，作为 PFA 管组件的接头外观参考",
  },
  "tubing-assembly-black-ptfe-ferrule": {
    src: "/images/products/fittings/hard-tube-fittings/photos/compact-ferrule-fitting-black-bodies.webp",
    alt: "黑色紧凑型卡套接头实拍，作为黑色 PTFE 管组件的接头外观参考",
  },
};

export const tubingAssemblyReviewCards: TubingAssemblyCard[] = tubingAssemblyCards.map(card => ({
  ...card,
  cardTitle: copy[card.productId].title,
  cardSubtitle: copy[card.productId].description,
  imageCard: ferruleCardImages[card.productId]?.src ?? (card.productId === "tubing-assembly-pfa-flanged"
    ? "/images/products/tubing-assemblies/flanged-tubing/pfa/foreach-pfa-flanged-tubing-assembly.png"
    : card.productId === "tubing-assembly-fep-ferrule"
    ? "/images/products/tubing-assemblies/ferrule-kits/fep/foreach-fep-ferrule-tubing-assembly.png"
    : card.productId === "tubing-assembly-fep-flanged"
    ? "/images/products/tubing-assemblies/flanged-tubing/fep/flanged-tube-fitting-washer-layout.png"
    : card.productId === "tubing-assembly-black-ptfe-flanged"
    ? "/images/products/tubing-assemblies/flanged-tubing/black-ptfe/foreach-black-ptfe-flanged-tubing-assembly.png"
    : card.productId === "tubing-assembly-retaining-ring-black-ptfe"
      ? "/images/products/tubing-assemblies/retaining-ring-kits/black-ptfe/foreach-black-ptfe-retaining-ring-tubing-assembly.png"
    : card.imageCard),
  imageCaption: card.productTypeId === "retaining-ring-kits" ? "卡环管组件" : "连接结构参考图",
  imageAlt: ferruleCardImages[card.productId]?.alt ?? (card.productId === "tubing-assembly-pfa-flanged"
    ? "PFA 法兰翻边管组件，透明翻边管端、半透明螺纹接头及金属支撑垫圈"
    : card.productId === "tubing-assembly-fep-ferrule"
    ? "FEP 卡套管组件，透明 FEP 管连接黑色螺纹接头与半透明锥形卡套"
    : card.productId === "tubing-assembly-fep-flanged"
    ? "FEP 法兰翻边管组件，透明翻边管端、黑色螺纹接头及配套垫圈的展开结构"
    : card.productId === "tubing-assembly-black-ptfe-flanged"
    ? "黑色 PTFE 法兰翻边管组件，黑色管材连接半透明螺纹接头及金属支撑垫圈"
    : card.productId === "tubing-assembly-retaining-ring-black-ptfe"
      ? "黑色 PTFE 卡环管组件，黑色管材连接米黄色螺纹接头、金属卡环及密封垫圈"
    : card.productTypeId === "flanged-tubing" ? "法兰翻边管连接结构参考图，管材及选配附件以具体配置为准" : card.productTypeId === "retaining-ring-kits" ? "卡环连接结构参考图，管材及选配附件以具体配置为准" : `${copy[card.productId].title}连接结构参考图`),
  specs: card.specs.map(spec => ({ label: labels[spec.label] ?? spec.label, value: values[spec.value] ?? spec.value })),
}));
