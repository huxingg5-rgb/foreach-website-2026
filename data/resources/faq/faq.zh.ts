import { barbedFittingCopy, barbedFittingSlug } from "../technical-articles/what-is-a-barbed-fitting.zh";
import { luerFittingCopy, luerFittingSlug } from "../technical-articles/what-is-a-luer-fitting.zh";
import { ferruleFittingCopy, ferruleFittingSlug } from "../technical-articles/what-is-a-ferrule-fitting.zh";
import { compressionRingFittingCopy, compressionRingFittingSlug } from "../technical-articles/what-is-a-compression-ring-fitting.zh";
import { quickDisconnectFittingCopy } from "../technical-articles/quick-disconnect-fitting.zh";
import { threadedHoseBarbFittingsCopy } from "../technical-articles/threaded-hose-barb-fittings.zh";
import { femaleThreadAdaptersCopy } from "../technical-articles/female-thread-adapters.zh";
import { bulkheadBarbedFittingCopy } from "../technical-articles/bulkhead-barbed-fitting.zh";
import { rotaryValveArticles } from "../technical-articles/rotary-valve-articles.zh";
import { syringePumpFaqLocales } from "@/data/products/detail/syringe-pump-faq.locales";
import { getEaPumpContent } from "@/data/products/detail/applications/ea-pump-content";
import { getPipettingFaqs } from "@/data/products/detail/pipetting-pump-faq.locales";
import { dpl30ArticleFaqCopy } from "../technical-articles/dpl30-liquid-diaphragm-pump.faq";
import { rplSelectionFaqItems, rplSelectionArticleSlug } from "../technical-articles/rpl-valveless-metering-pump-selection.article";
import { controlModuleDetails } from "@/data/products/control-modules/control-module-detail.generated";
import probeDetails from "@/data/products/generated/probes/detail/index.json";
import tubingContent from "@/data/products/tubing/content.json";
import type { FaqItem, ReviewedFaqItem } from "./faq.types";

// Server-side composition: published article/product answers remain authoritative.
// The intent bank is planning evidence, not proof of customer frequency. No
// delivery, warranty, certification or compatibility promises are inferred.
type SourceQuestion = { question: string; answer: string };
type Seed = {
  source: string;
  intent: string;
  category: string;
  subcategory: string;
  questions: readonly SourceQuestion[];
  href: string;
  label: string;
  aliases?: string[];
};

function selected(seed: Seed, picks: [id: string, question: string, tags: string[], displayQuestion?: string][]): ReviewedFaqItem[] {
  return picks.map(([id, question, tags, displayQuestion]) => {
    const original = seed.questions.find((item) => item.question === question);
    if (!original) throw new Error(`FAQ source question missing: ${id} (${seed.source})`);
    return {
      id, category: seed.category, subcategory: seed.subcategory, question: displayQuestion ?? question,
      answer: [original.answer.replaceAll("本文", "该系列说明中").replaceAll("carry-over", "携带污染")],
      tags, aliases: seed.aliases ?? [], links: [{ label: seed.label, href: seed.href }],
      evidence: { source: seed.source, intent: seed.intent, sourceQuestion: question, note: "复用现有产品或文章答案；提供独立问答入口。" },
    };
  });
}
const article = (slug: string) => `/resources/technical-articles/${slug}/`;
const fittingSource = (filename: string, intent: string, subcategory: string, questions: readonly SourceQuestion[], href: string, aliases: string[] = []): Seed => ({
  source: `data/resources/technical-articles/${filename}`, intent, category: "fittings", subcategory,
  questions, href, label: "查看详细说明", aliases,
});
const syringeQuestions = syringePumpFaqLocales.zh.map(([question, answer]) => ({ question, answer }));
const needle = (slug: string, subcategory: string): Seed => ({
  source: "data/products/generated/probes/detail/index.json", intent: "针类问题库：规格匹配与定制配套；现有产品 FAQ",
  category: "probes", subcategory, questions: probeDetails.find((item) => item.slug === slug)!.faq,
  href: `/products/probes/${slug}/`, label: "查看产品与定制说明",
});

export const reviewedFaqItems: ReviewedFaqItem[] = [
  ...selected({ source: "data/products/detail/applications/ea-pump-content.ts", intent: "P01：性能与介质匹配；现有 EA FAQ", category: "pumps", subcategory: "piston", questions: getEaPumpContent("ea-500-pmma", "zh")!.faqs, href: "/products/pumps/piston-pump/ea-500-pmma/", label: "查看 EA 柱塞泵", aliases: ["EA", "试剂泵", "加液", "陶瓷柱塞"] }, [
    ["piston-accuracy", "准确性和重复性 ≤0.5% 适用于所有加液量吗？", ["性能验证"], "EA 柱塞泵的准确性和重复性 ≤0.5% 适用于所有加液量吗？"],
    ["piston-crystallization", "输送含盐或易结晶试剂时需要注意什么？", ["材料兼容", "清洗"], "EA 柱塞泵输送含盐或易结晶试剂时需要注意什么？"],
  ]),
  ...selected({ source: "data/resources/technical-articles/dpl30-liquid-diaphragm-pump.faq.ts", intent: "P02：流量与工况匹配；现有 DPL30 FAQ", category: "pumps", subcategory: "diaphragm", questions: dpl30ArticleFaqCopy["zh-CN"].items, href: "/products/pumps/miniature-diaphragm-pumps/", label: "查看微型隔膜泵", aliases: ["DPL30", "微型液泵", "流量", "背压"] }, [
    ["diaphragm-free-flow", "DPL30 的 300 mL/min 是什么流量？", ["性能验证", "选型"]],
    ["diaphragm-working-point", "DPL30 在 100 kPa 下还能达到 300 mL/min 吗？", ["压力", "选型"]],
  ]),
  ...selected({ source: "data/products/detail/syringe-pump-faq.locales.ts", intent: "P05：规格匹配；现有注射泵 FAQ", category: "pumps", subcategory: "syringe", questions: syringeQuestions, href: "/products/pumps/syringe-pumps/", label: "查看注射泵", aliases: ["加样", "分注", "加液", "HLD", "HMD"] }, [
    ["syringe-capacity", "怎样选择注射器容量与工作行程？", ["规格匹配"]],
    ["syringe-bottle-change", "换瓶后前几次加液偏少，应怎样检查？", ["故障排查", "气泡"]],
    ["syringe-accuracy", "怎样评估准确度与重复性？", ["性能验证"]],
    ["syringe-continuity", "是否可以持续不中断供液？", ["选型"]],
  ]),
  ...selected({ source: "data/products/detail/pipetting-pump-faq.locales.ts", intent: "移液泵问题库：检测与分液；现有 SMTP2 FAQ", category: "pumps", subcategory: "pipetting", questions: getPipettingFaqs("zh-CN", "smtp2-1000ul")!, href: "/products/pumps/pipetting-pumps/", label: "查看移液泵", aliases: ["SMTP2", "移液", "吸头", "液面检测"] }, [
    ["pipetting-level", "pLLD、cLLD 和 hLLD 有什么区别，怎样选择？", ["选型", "检测原理"]],
    ["pipetting-multiple", "SMTP2 能否一次吸液后分装到多个容器？", ["分液", "性能验证"]],
  ]),
  ...selected({ source: "data/resources/technical-articles/rpl-valveless-metering-pump-selection.article.ts", intent: "无阀计量泵问题库：排量与系统配套；现有 RPL FAQ", category: "pumps", subcategory: "valveless", questions: rplSelectionFaqItems, href: article(rplSelectionArticleSlug), label: "查看无阀计量泵选型指南", aliases: ["RPL", "分装", "加液", "转速"] }, [
    ["valveless-speed", "降低转速，就能减小每次加液量吗？", ["控制", "工作原理"], "RPL 无阀计量泵降低转速，就能减小每次加液量吗？"],
    ["valveless-system", "无阀结构是否意味着设备中完全不需要阀？", ["配套", "工作原理"]],
  ]),
  ...selected({ source: "data/resources/technical-articles/rotary-valve-articles.zh.ts", intent: "V01：应用匹配与规格匹配；现有旋转阀 FAQ", category: "valves", subcategory: "rotary", questions: rotaryValveArticles[0].copy.faqItems, href: article(rotaryValveArticles[0].slug), label: "查看旋转阀工作原理", aliases: ["MRV3", "选路", "切换"] }, [
    ["rotary-metering", "旋转阀可以直接控制每次加多少液体吗？", ["工作原理"]],
    ["rotary-solenoid", "旋转阀和电磁阀有什么区别？", ["选型"]],
    ["rotary-reset", "断电后可以沿用上一次通道编号吗？", ["控制", "故障排查"]],
  ]),
  ...selected({ source: "data/products/detail/syringe-pump-faq.locales.ts", intent: "V03：应用匹配；现有泵阀时序 FAQ", category: "valves", subcategory: "solenoid", questions: syringeQuestions, href: "/products/valves/solenoid-valves/", label: "查看电磁阀" }, [
    ["solenoid-sequence", "电磁阀与注射器动作应怎样配合？", ["控制", "安装"]],
  ]),
  ...selected(needle("sampling-probes", "sampling-probe"), [
    ["probe-drawing", "采样针定制前是否必须提供图纸？", ["定制"]],
    ["probe-carryover", "采样针如何降低挂液和交叉污染风险？", ["清洗", "残留"]],
  ]),
  ...selected(needle("piercing-probes", "piercing-probe"), [["piercing-difference", "穿刺针和采样针有什么区别？", ["选型"]]]),
  ...selected(needle("stirring-paddles", "stirrer"), [["stirrer-dimensions", "搅拌桨为什么需要按反应杯定制？", ["定制"]]]),
  ...selected({ source: "data/products/tubing/content.json", intent: "管路问题库：材料与规格匹配；现有 PVC FAQ", category: "tubing", subcategory: "soft-tubing", questions: tubingContent.materials.pvc.zh.faqs, href: "/products/tubing/pvc-tubing/", label: "查看 PVC 管材", aliases: ["PVC", "管子", "内径", "外径"] }, [
    ["pvc-reagent", "PVC 管可以直接用于所有试剂吗？", ["材料兼容"]],
    ["tubing-wall", "相同内径为什么有不同外径？", ["规格匹配"]],
    ["pvc-peristaltic", "PVC 管能作蠕动泵管吗？", ["选型"]],
  ]),
  ...selected({ source: "data/products/tubing/content.json", intent: "管路问题库：工况与材料匹配；现有 PTFE FAQ", category: "tubing", subcategory: "hard-tubing", questions: tubingContent.materials.ptfe.zh.faqs, href: "/products/tubing/ptfe-tubing/", label: "查看 PTFE 管材", aliases: ["PTFE", "铁氟龙", "管子"] }, [
    ["ptfe-transparency", "PTFE 管一定是透明的吗？", ["材料", "气泡"]],
  ]),
  ...selected(fittingSource("what-is-a-barbed-fitting.zh.ts", "J05-03/05：规格与配管条件", "barbed", barbedFittingCopy.faqItems, article(barbedFittingSlug), ["宝塔", "软管接头"]), [
    ["barb-tube-size", "倒刺接头按软管内径还是外径选择？", ["规格匹配"]],
    ["barb-clamp", "倒刺连接是否必须使用管夹？", ["安装", "密封"]],
    ["barb-reducer", "变径倒刺接头怎样选两端尺寸？", ["规格匹配"]],
  ]),
  ...selected(fittingSource("quick-disconnect-fitting.zh.ts", "J08-03/05/07：阀配置与替代", "quick-connect", quickDisconnectFittingCopy.faqItems, article("what-is-a-quick-disconnect-fitting"), ["Q20", "Q40", "Q60", "滴漏", "漏液", "换瓶"]), [
    ["quick-valves", "快插接头带阀与不带阀有什么区别？", ["选型", "密封"]],
    ["quick-push-in", "快插接头与插管式接头有何不同？", ["连接方式"]],
    ["quick-interchange", "不同品牌的快插接头能否互配？", ["替代"]],
  ]),
  ...selected(fittingSource("what-is-a-luer-fitting.zh.ts", "J07-03/05：公母配合与拆装", "luer", luerFittingCopy.faqItems, article(luerFittingSlug)), [
    ["luer-pressure", "锁紧式鲁尔一定比插入式更耐压吗？", ["压力", "选型"]],
    ["luer-shutoff", "鲁尔接头拆开后会自动止液吗？", ["密封"]],
  ]),
  ...selected(fittingSource("what-is-a-ferrule-fitting.zh.ts", "J02-03/07：配套与装配", "ferrule", ferruleFittingCopy.faqItems, article(ferruleFittingSlug), ["免翻边", "CL-0", "CL-0X"]), [
    ["ferrule-tools", "卡箍接头一定不需要工具吗？", ["安装"]],
    ["ferrule-pairing", "管外径相同，CL-0 与 CL-0X 可以互换吗？", ["配套", "替代"]],
  ]),
  ...selected(fittingSource("what-is-a-compression-ring-fitting.zh.ts", "J03-06/07：配套与组件验证", "retaining-ring", compressionRingFittingCopy.faqItems, article(compressionRingFittingSlug), ["卡环套", "垫圈", "CL-1S", "CL-1X"]), [
    ["ring-flangeless", "卡环接头也属于免翻边接头吗？", ["连接方式"]],
    ["ring-tools", "卡环接头需要专用安装工具吗？", ["安装"]],
  ]),
  ...selected(fittingSource("threaded-hose-barb-fittings.zh.ts", "J06-03/06：端口匹配", "threaded-barb", threadedHoseBarbFittingsCopy.faqItems, article("threaded-hose-barb-fittings-selection-guide"), ["SA", "SB", "UNF", "NPT"]), [
    ["thread-unf-npt", "1/4-28 UNF 和 1/4 NPT 可以互换吗？", ["螺纹", "配套"]],
    ["thread-seal-tape", "螺纹转倒刺接头都要缠生料带吗？", ["安装", "密封"]],
  ]),
  ...selected(fittingSource("female-thread-adapters.zh.ts", "J09-05：端口适配", "thread-adapter", femaleThreadAdaptersCopy.faqItems, article("female-thread-adapters-selection-guide")), [
    ["adapter-leak", "内螺纹接头漏液时，可以缠生料带或继续拧紧吗？", ["故障排查", "密封"]],
  ]),
  ...selected(fittingSource("bulkhead-barbed-fitting.zh.ts", "J10-04/05：面板安装", "bulkhead", bulkheadBarbedFittingCopy.faqItems, article("what-is-a-bulkhead-barbed-fitting"), ["PMB", "PMBSN", "穿板倒刺"]), [
    ["bulkhead-leak", "软管端漏液，继续拧紧面板螺母有用吗？", ["安装", "故障排查"]],
    ["bulkhead-tank", "穿板倒刺接头可以直接作为储液罐穿壁密封件吗？", ["选型", "密封"]],
  ]),
  ...selected({ source: "data/products/control-modules/control-module-detail.generated.ts", intent: "D01-02/03：检测与管径匹配", category: "control", subcategory: "bubble", questions: controlModuleDetails.find((item) => item.slug === "abd-air-bubble-detector")!.faqs, href: "/products/control/air-bubble-detectors/abd/", label: "查看 ABD 气泡检测模块", aliases: ["ABD", "智控", "传感器", "缺液"] }, [
    ["abd-contact", "ABD 气泡检测模块是否接触液体？", ["检测原理"]],
    ["abd-small-bubbles", "ABD 能否检测很小的微气泡？", ["检测条件"]],
  ]),
  ...selected({ source: "data/products/control-modules/control-module-detail.generated.ts", intent: "D02-05：通讯集成", category: "control", subcategory: "pressure", questions: controlModuleDetails.find((item) => item.slug.startsWith("pdm5"))!.faqs, href: "/products/control/pdm5-pressure-sensor/", label: "查看 PDM5 压力检测模块", aliases: ["PDM5", "智控", "传感器"] }, [
    ["pdm5-interface", "PDM5 使用什么通讯方式？", ["控制", "接口"]],
  ]),
  {
    id: "assembly-inputs", category: "tubing", subcategory: "tubing-assembly",
    question: "定制管组件需要提供哪些尺寸和接口信息？",
    answer: ["提供管材、内径与外径、管长及公差、两端端口图纸、接头和密封件要求，以及安装空间和标识要求。翻边、卡环、卡箍等端接方式应分别确认配套，不能仅用螺纹相同来判断可互换。", "同时说明介质及清洗液、浓度、温度、压力或真空、目标流量和使用周期，使样件验证覆盖实际装配与运行条件。"],
    tags: ["定制", "配套"], aliases: ["管子", "FEP", "PTFE", "翻边", "卡环"], links: [{ label: "查看管路与管材", href: "/products/tubing/" }],
    evidence: { source: "data/products/tubing/content.json: category.zh; 接头文章 CTA", intent: "J01-06/J03-03：定制管组件", note: "从已核对的组件与选型条件整理，不承诺任意定制。" },
  },
  {
    id: "selection-inputs", category: "purchasing", subcategory: "selection",
    question: "咨询接头或管路选型时，需要准备哪些资料？",
    answer: ["先提供液路连接示意、各端螺纹及密封面图纸、管内外径与材料，再补充介质、浓度、压力、温度、流量和安装空间。已有零件时，附上完整型号、照片或样品信息。", "快速接头还需说明断开后哪一侧需要截止；穿板接头需提供面板厚度与孔形。资料中应区分必须满足的条件和可调整的条件。"],
    tags: ["选型", "资料"], aliases: ["采购", "询价", "接头", "管组件"], links: [{ label: "提交选型需求", href: "/contact/" }],
    evidence: { source: "quick-disconnect-fitting.zh.ts / bulkhead-barbed-fitting.zh.ts / female-thread-adapters.zh.ts: cta", intent: "J08-03/J09-05/J10-05：配套条件", note: "整合已有选型资料清单。" },
  },
  {
    id: "sample-validation", category: "purchasing", subcategory: "samples",
    question: "接头样件确认后，批量采购前还应固定哪些要求？",
    answer: ["将完整型号、材料配置、图纸版本、实际软管规格和已确认的装配方式记录下来，同时约定验收项目及所需材料、质量文件。样件验证应覆盖安装、密封、受拉及实际启停工况，吸液段还需观察负压进气。", "接头或管材变更时，应评估原验证结论是否仍适用；不能只按外观相同沿用样件结论。"],
    tags: ["打样", "验收"], aliases: ["采购", "批量", "送样"], links: [{ label: "查看倒刺接头选型与验证", href: article(barbedFittingSlug) }],
    evidence: { source: "what-is-a-barbed-fitting.zh.ts: quality / selection-example", intent: "J05-06：样件与批量检验", note: "复用已确认验收与变更判断，不承诺免费送样或交期。" },
  },
  {
    id: "material-documents", category: "quality", subcategory: "compliance",
    question: "有 RoHS、REACH 或 SDS 资料，就能证明接头耐试剂吗？",
    answer: ["不能。RoHS、REACH 资料用于核查相应范围的物质合规信息，SDS 用于材料安全、处理和储存信息；它们不能单独证明某个接头适合长期接触某种试剂，也不证明连接不漏液。", "应核对文件对应的材料或型号、版本与适用范围，再结合试剂成分、浓度、温度、接触时间和实际连接组合完成兼容性及密封验证。"],
    tags: ["材料兼容", "资料"], aliases: ["质控", "认证", "报告", "MSDS"], links: [{ label: "查看材料文件与质量说明", href: article(barbedFittingSlug) }],
    evidence: { source: "what-is-a-barbed-fitting.zh.ts: material-documents", intent: "J05-04/06：质量资料", note: "依据现有质量资料段落，区分合规与工况验证。" },
  },
  {
    id: "batch-traceability", category: "quality", subcategory: "traceability",
    question: "批量接头的插装手感或密封表现变化，应该核对哪些记录？",
    answer: ["将当前批次与已确认样件比较，核对完整型号、材料配置、图纸版本、软管内外径及材料、装配方式和交付记录。检查倒刺轮廓、关键尺寸、流道、毛刺或损伤，以及型号与材料标识。", "如果管材、接头材料或装配条件发生变化，应评估并重新验证受影响的项目；抽检比例、测试项目和随货资料按项目质量约定执行。"],
    tags: ["检验", "密封"], aliases: ["质控", "批次", "追溯", "验收"], links: [{ label: "查看质量与验证说明", href: article(barbedFittingSlug) }],
    evidence: { source: "what-is-a-barbed-fitting.zh.ts: batch-quality", intent: "J05-06：批次尺寸检验", note: "复用批量一致性与变更追溯要求。" },
  },
  {
    id: "support-leak-report", category: "support", subcategory: "troubleshooting",
    question: "反馈接头漏液或管路进气时，提供什么信息更方便排查？",
    answer: ["先停机并按设备操作要求卸压。记录漏点是在螺纹端、软管端还是公母连接处，说明故障发生在正压输送、负压吸液、启停还是温升后。", "提供接头完整型号、管材与内外径、端口照片或图纸、介质、压力和温度，以及近期更换或拆装记录。软管端漏液、端面密封失效和公母配合问题需要分别检查，不能统一用加大锁紧力处理。"],
    tags: ["故障排查", "密封"], aliases: ["售后", "维修", "返修", "漏液", "漏水", "漏气"], links: [{ label: "联系技术支持", href: "/contact/" }],
    evidence: { source: "bulkhead-barbed-fitting.zh.ts / female-thread-adapters.zh.ts: faqItems; quick-disconnect-fitting.zh.ts: cta", intent: "J08-07/J09-05/J10-04：故障与配套核对", note: "依据现有排查和选型输入整理，不包含维修或质保承诺。" },
  },
  {
    id: "support-replacement", category: "support", subcategory: "replacement",
    question: "更换接头密封件或卡环套件时，只看管径够吗？",
    answer: ["不够。需同时核对接头本体、端口密封形式、管径和密封件或套件的完整型号。不同系列即使管外径相同，其几何结构和配套关系也可能不同。", "例如 CL-1S-16 与 CL-1X-16 都适配 1.6 mm 管外径，但对应的接头和端口不同。更换前核对配套资料及管端状态，按对应装配方法安装后再检漏。"],
    tags: ["配件更换", "配套"], aliases: ["售后", "维护", "卡环", "垫圈"], links: [{ label: "查看卡环套件配套与安装", href: article(compressionRingFittingSlug) }],
    evidence: { source: "what-is-a-compression-ring-fitting.zh.ts: faqItems; what-is-a-ferrule-fitting.zh.ts: faqItems", intent: "J02-07/J03-06：维护配件", note: "复用具体配套限制，不推定通用互换。" },
  },
];

// Internal source paths and intent IDs are never sent to the browser.
export function getChineseFaqItems(): FaqItem[] {
  return reviewedFaqItems.map(({ evidence, ...item }) => {
    void evidence;
    return item;
  });
}
