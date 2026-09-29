import { isMrv3Locale, translateMrv3, type Mrv3MessageKey } from "./mrv3-locales";
import { getMrv3ConfigurationImage } from "./mrv3-images";
import type { ProductSelectionProduct } from "../selection/product-selection.types";

// PS-120C-005_001_cn: specifications p. 3; PEEK/PCTFE head options in the p. 9 selection diagram.
export const mrv3Configurations = [
  { slug: "mrv3-d10", model: "MRV3-D10-12-U28APE-MD", code: "689032", channels: "10", bore: "1.2", volume: "15.8", port: "1/4-28 UNF", head: "MRV3-D10-12-U28APE", headCode: "489005" },
  { slug: "mrv3-d16", model: "MRV3-D16-10-U28APE-MD", code: "689025", channels: "16", bore: "1.0", volume: "10", port: "1/4-28 UNF", head: "MRV3-D16-10-U28APE", headCode: "489006" },
  { slug: "mrv3-d24", model: "MRV3-D24-05-U40APK-MD", code: "689030", channels: "24", bore: "0.5", volume: "2.9", port: "6-40 UNF", head: "MRV3-D24-05-U40APK", headCode: "489007" },
] as const;

export const mrv3BasePath = "/products/valves/rotary-valves/";
export function getMrv3Content(slug: string, locale: string) {
  if (!isMrv3Locale(locale)) return null;
  const c = mrv3Configurations.find(item => item.slug === slug);
  if (!c && slug !== "rotary-valves") return null;
  const configurationImage = c ? getMrv3ConfigurationImage(c.channels, locale) : undefined;
  const t = (zh: string, key: Mrv3MessageKey, values: readonly string[] = []) =>
    locale === "zh" ? zh : translateMrv3(locale, key, values);
  const prefix = locale === "zh" ? "" : `/${locale}`;
  const descriptor = c
    ? t(`${c.channels}通道陶瓷旋转阀`, "descriptor", [c.channels])
    : t("陶瓷旋转选择阀", "seriesDescriptor");
  const shortModel = c ? c.slug.toUpperCase() : "MRV3";
  const seriesTitle = t("多通道旋转选择阀，提供PEEK或PCTFE阀头配置", "seriesTitle");
  const cardHeading = c ? t(`${c.channels}通道陶瓷旋转阀，用于试剂选择与清洗路径切换，采用${c.bore} mm通径和${c.port}接口`, "cardHeading", [c.channels, c.bore, c.port]) : seriesTitle;
  const title = c ? `FOREACH ${cardHeading}` : seriesTitle;
  const mrv3IntroductionParagraphs = c ? [
    t(`恒永达 ${shortModel} 是一款面向自动化设备集成的${c.channels}通道陶瓷旋转阀，用于试剂选择与清洗路径切换。产品可集成到仪器及实验室自动化设备的液路系统中，配合泵和设备控制程序，按流程选择不同试剂或清洗液的连接路径。`, "introDefinition", [shortModel, c.channels]),
    t("产品采用氧化锆定子和蓝宝石转子，通过电动驱动完成液路切换。阀头提供 PEEK 或 PCTFE 材料配置，可结合试剂、清洗液和使用条件选择接液材料。", "introMaterials"),
    t("集成选型时，应根据流路图确认连接需求，并核对通径、接口、内容积及安装要求。具体材料组合和参数以对应订货型号为准。", "introIntegration"),
  ] : undefined;
  const description = c
    ? mrv3IntroductionParagraphs!.join("\n\n")
    : t("FOREACH MRV3旋转选择阀是面向分析仪器和实验室自动化设备的OEM液路部件，用于试剂选择与清洗路径切换。系列提供10、16、24通道配置，通过电动旋转切换液体连接路径，配合系统完成自动化液路控制。", "seriesDescription");
  const integrationIntro = t("MRV3采用氧化锆定子和蓝宝石转子，支持RS232 / RS485通信。PEEK或PCTFE阀头的可用配置依具体型号而定。选型时，根据流路连接需求比较通道数、通径、螺纹接口和内容积，并结合试剂与清洗液确认接液材料兼容性。", "seriesIntegration");
  const configurationIntro = t(`按流路连接需求比较10、16、24通道配置。查看[MRV3-D10](${prefix}${mrv3BasePath}mrv3-d10/)、[MRV3-D16](${prefix}${mrv3BasePath}mrv3-d16/)和[MRV3-D24](${prefix}${mrv3BasePath}mrv3-d24/)详情，比较通径、内容积与接口，并确认对应型号的接液材料。`, "seriesConfigurationLinks", [prefix, mrv3BasePath, prefix, mrv3BasePath, prefix, mrv3BasePath]);
  const selection = c?.channels === "10"
    ? t("当试剂、清洗和预留连接可纳入10通道流路时，可从本配置开始比较。1.2 mm通径不代表固定流量；应结合介质、泵、压差和管路确认。", "selection10")
    : c?.channels === "16"
      ? t("当10通道无法覆盖连接需求时，可比较16通道配置。接口仍为1/4-28 UNF，但通径和内容积发生变化，不能直接认定为可互换部件。", "selection16")
      : c?.channels === "24"
        ? t("24通道配置同时改变通径与接口。设计时核对6-40 UNF接头、管路内径及介质状态。2.9 μL是阀内容积，不代表分配体积或携带污染指标。", "selection24")
        : t("先按流路图确定连接数量，再比较通径、接口、材料及内容积。通道数量不代表同时独立输送的液路数量。", "selectionSeries");
  const specs = c ? [
    [t("型号", "model"), shortModel],
    [t("名称", "productType"), t("陶瓷转阀", "ceramicValve")],
    [t("通道数量", "channels"), c.channels],
    [t("通道直径", "bore"), `${c.bore} mm`],
    [t("内容积", "volume"), `${c.volume} μL`],
    [t("螺纹接口", "port"), c.port],
  ] : mrv3Configurations.map(item => [item.slug.toUpperCase(), `${item.channels} ${t("通道", "channelUnit")} / ${item.bore} mm / ${item.volume} μL / ${item.port}`]);
  specs.push(
    [t("耐压", "pressure"), "0.7 MPa"],
    [t("阀头材料选项", "headOptions"), "PEEK / PCTFE"],
    [t("定子 / 转子", "statorRotor"), t("氧化锆陶瓷 / 蓝宝石", "ceramicSapphire")],
    [t("初始位置", "initialPosition"), t("通电自动复位", "homing")],
    [t("切换时间", "switchingTime"), t("≤2 s/圈，相邻端口 <100 ms", "switchingValue")],
    [t("寿命", "serviceLife"), t("100万圈", "serviceLifeValue")],
    [t("电机/驱动器", "motorDriver"), t("可选", "optional")],
    [t("电机减速比", "reductionRatio"), "1:10"],
    [t("通信接口", "communication"), "RS232 / RS485"],
    [t("波特率", "baudRate"), "9600 / 57600 / 115200"],
    [t("适用电源", "powerSupply"), "DC 24 V / 2 A ±10%"],
    [t("最大功率", "maxPower"), "48 W"],
    [t("工作环境温度", "temperature"), "0–50 °C"],
    [t("工作相对湿度", "humidity"), "20–80% RH"],
    [t("重量", "weight"), t("约600 g", "weightValue")],
    [t("内容积定义", "volumeDefinition"), t("COM口流道孔与转子槽的内容积", "volumeDefinitionValue")],
  );
  // Dimensions and mounting figures in p. 3 conflict with the drawings on pp. 4–6; do not publish ambiguous values.
  const faqs = [
    {
      question: t(`${shortModel}陶瓷旋转阀可以用于哪些液路任务？`, "faqTasksQuestion", [shortModel]),
      answer: t(`${shortModel}用于液体路径选择，可配合泵完成不同试剂的顺序取用、样品采集与分配，以及试剂路径和清洗路径之间的切换。设备控制程序负责安排阀的位置和泵的吸排液动作，适用于需要自动选路的仪器及实验室液路模块。`, "faqTasksAnswer", [shortModel]),
    },
    {
      question: c ? t(`什么时候选择${c.channels}通道配置？`, "faqChannelsQuestion", [c.channels]) : t("10、16、24通道配置怎样选择？", "faqChannelsSeriesQuestion"),
      answer: c ? t(`先统计流路图中的试剂、清洗液及预留连接，并核对公共口与各通道的连接关系。${shortModel}提供${c.channels}通道，通径为${c.bore} mm、螺纹接口为${c.port}。选择时需同时考虑连接数量、管路匹配和清洗流程。`, "faqChannelsAnswer", [shortModel, c.channels, c.bore, c.port]) : selection,
    },
    {
      question: t("PEEK和PCTFE阀头怎样选择？", "faqMaterialsQuestion"),
      answer: t("MRV3提供PEEK和PCTFE阀头选项。选择时应同时考虑试剂与清洗液的成分、浓度、温度及接触时间，并核对定子、转子等全部接液零件。提供实际介质和工况，可据此匹配阀头材料及订货配置。", "faqMaterialsAnswer"),
    },
    {
      question: t("怎样控制旋转阀，切换速度是多少？", "faqControlQuestion"),
      answer: t("MRV3采用电机驱动和光耦定位，通电自动复位。支持RS232、RS485通信，波特率为9600、57600或115200；切换时间为≤2 s/圈，相邻端口＜100 ms。电机与驱动器可选，设备集成时需协调阀切换与泵的动作时序。", "faqControlAnswer"),
    },
    {
      question: t("切换不同试剂时，怎样安排液路清洗？", "faqWashQuestion"),
      answer: t("可预留一个通道连接清洗液。更换试剂前，先切换到清洗液通道，由泵将清洗液送过阀和连接管路，再切换到下一种试剂。清洗液用量和清洗次数应根据管路长短、试剂性质及残留要求，通过实际清洗测试确定。", "faqWashAnswer"),
    },
    {
      question: t(`定制${shortModel}需要提供哪些信息？`, "faqCustomQuestion", [shortModel]),
      answer: t("请提供流路图、通道数量、试剂与清洗液、工作压力和温度、管路与接口要求，以及安装空间、通信和切换节拍。我们会根据这些要求匹配阀头材料、电机和驱动器，并确认可提供的组合。", "faqCustomAnswer"),
    },
  ];
  const commonApplications = [t("多试剂切换", "reagentSelection"), t("样品前处理", "samplePreparation"), t("液体顺序分配", "liquidDistribution"), t("管路清洗", "flushing")];
  return {
    __locale: locale, mrv3AuthoredContent: true, slug, category: "valves", categoryId: "valves",
    ...(configurationImage ? {
      mainImage: configurationImage.src, image: configurationImage.src, imageCard: configurationImage.src,
      imageAlt: configurationImage.alt, mainImageAlt: configurationImage.alt,
    } : {}),
    productTypeId: "rotary-valves", productTypeSlug: "rotary-valves", productTypeName: t("旋转选择阀", "rotaryValves"),
    model: title, title, name: title, h1Title: title, pageTitle: title, productName: title, cardHeading,
    modelName: shortModel, displayModel: shortModel, modelDisplay: shortModel, productCode: shortModel, breadcrumbLabel: shortModel,
    breadcrumbCategoryLabel: t("阀", "valves"),
    breadcrumbSeriesLabel: t("MRV3 陶瓷旋转阀", "breadcrumbSeries"),
    breadcrumbCategoryHref: `${prefix}/products/?category=valves`,
    breadcrumbSeriesHref: `${prefix}/products/?category=valves&productType=${encodeURIComponent("旋转阀")}`,
    seoTitle: c ? `${shortModel} ${descriptor} | FOREACH` : `${seriesTitle} | MRV3 | FOREACH`, seoDescription: c
      ? t(`${shortModel}：${c.channels}通道陶瓷旋转阀，用于试剂选择与清洗路径切换。比较通径、接口及PEEK或PCTFE阀头配置。FOREACH恒永达。`, "seoConfiguration", [shortModel, c.channels])
      : t("比较MRV3系列10、16、24通道旋转选择阀，提供PEEK或PCTFE阀头配置，用于自动化试剂选择与清洗路径切换。", "seoSeries"),
    seriesTitle, introParagraphs: [description, integrationIntro, configurationIntro],
    description, summary: description, overview: description, mrv3IntroductionParagraphs,
    isCustomOnly: true, isCustomInquiry: true, detailMode: "custom_inquiry", showCustomInquiryCta: true,
    showStandardModelSelector: false, specSeriesKey: slug,
    specs: specs.map(([label, value]) => ({ label, value })),
    advantages: [selection, t("RS232 / RS485通信；集成前核对供电、安装空间和泵阀动作顺序。", "integrationAdvantage"), t("内容积用于液路体积核算；清洗效果需在完整系统中验证。", "flushingAdvantage")],
    commonApplications, faqs, faq: faqs,
    applicationDetails: {
      tabLabel: t("应用", "applications"), title: t("典型应用", "typicalApplications"),
      intro: [t(`${shortModel}用于设备需要在多个液体连接之间自动切换的环节，例如依次取用不同试剂、切换样品处理步骤，或将液体送往不同位置。旋转阀负责选择连接通道，泵负责吸取和输送，设备程序将两者按操作顺序配合起来。`, "applicationsIntro", [shortModel])],
      items: [
        {
          title: t("分析仪器：按检测步骤切换不同试剂", "reagentTitle"),
          paragraphs: [
            t("一次检测需要先后加入不同试剂时，设备需要在多个试剂瓶之间切换取液。将各试剂瓶接到不同通道，旋转阀按程序选择当前需要的试剂，再由泵送往反应容器或检测单元。", "reagentContext"),
            t(`${shortModel}可承担这一自动切换环节，让试剂连接随检测步骤改变。设计时将试剂和清洗液需要占用的通道一起安排，加入量和输送速度由配套泵及设备程序控制。`, "reagentBenefit", [shortModel]),
          ],
        },
        {
          title: t("样品前处理：衔接取样、加液与清洗步骤", "sampleTitle"),
          paragraphs: [
            t("样品进入后续检测前，处理流程可能需要依次取样、加入处理液，再清洗连接管路。不同步骤需要使用不同液体，也需要让阀的切换与泵的吸排液动作保持一致。", "sampleContext"),
            t(`${shortModel}可按处理顺序选择样品、处理液或清洗液的连接。对于直接通过阀的样品，应重点检查是否含有颗粒、是否容易附着在管路内，以及换样后的残留要求。`, "sampleBenefit", [shortModel]),
          ],
        },
        {
          title: t("自动化供液：将同一液体依次送往不同位置", "distributionTitle"),
          paragraphs: [
            t("多个容器或设备位置需要使用同一种液体时，可通过分配型旋转阀依次选择输送方向。泵完成当前通道的供液后，阀切换到下一个通道，再执行下一次输送。", "distributionContext"),
            t(`${shortModel}为这类顺序供液提供通道切换。各位置的供液量、停留时间和操作顺序由设备控制，通道数量应覆盖实际使用位置及预留连接。`, "distributionBenefit", [shortModel]),
          ],
        },
        {
          title: t("连续运行：在试剂更换之间清洗阀和管路", "washTitle"),
          paragraphs: [
            t("不同试剂经过同一段连接管路时，设备需要在切换之间安排清洗。可将清洗液接入一个通道，在上一种试剂使用结束后切换到清洗液，由泵冲洗阀和管路，再选择下一种试剂。", "washContext"),
            t("清洗过程可加入设备的自动运行程序。清洗液用量和次数根据管路长短、试剂性质及残留要求确定，并用实际液体检查清洗效果。", "washBenefit"),
          ],
        },
      ],
      selectionNote: { title: t("告诉我们您的应用需求", "needsTitle"), paragraphs: [t("请说明设备按什么顺序使用哪些液体、需要连接多少个容器或位置，以及每一步的用量和时间要求。提供管路连接图、试剂与清洗液名称、温度压力、接口及安装空间，我们可据此匹配通道配置、阀头材料、电机和驱动器。", "needsText")] },
      relatedGuides: { title: t("比较MRV3配置", "compareTitle"), links: [
        { label: t("查看全部MRV3旋转阀", "allModels"), href: `${prefix}/products/?category=valves&productType=${encodeURIComponent("旋转阀")}` },
        ...mrv3Configurations.filter(item => item.slug !== slug).map(item => ({ label: t(`${item.slug.toUpperCase()}｜${item.channels}通道陶瓷旋转阀`, "relatedModel", [item.slug.toUpperCase(), item.channels]), href: `${prefix}${mrv3BasePath}${item.slug}/` })),
      ] },
    },
    contactHref: `${prefix}/contact/`, detailHref: `${prefix}${mrv3BasePath}${c ? `${c.slug}/` : ""}`,
    selectionHref: `${prefix}/products/?category=valves&productType=${encodeURIComponent("旋转阀")}`,
    bottomCtaTitle: t("确认MRV3液路配置", "ctaTitle"),
    bottomCtaDescription: t("告诉我们设备需要切换哪些液体、连接哪些位置，我们为您匹配旋转阀配置。", "ctaDescription"),
    bottomCtaButtonText: t("提交选型需求", "ctaButton"), bottomCtaHref: `${prefix}/contact/`,
  };
}

export function expandMrv3Cards(product: ProductSelectionProduct, locale: string): ProductSelectionProduct[] {
  if (product.productId !== "mrv3-ceramic-rotary-valve" || !isMrv3Locale(locale)) return [product];
  return mrv3Configurations.map(c => {
    const copy = getMrv3Content(c.slug, locale)!;
    return { ...product, id: c.slug, productId: c.slug, model: copy.modelName, productCode: copy.modelName, code: copy.modelName,
      slug: c.slug, detailSlug: c.slug, routeSlug: c.slug, seriesId: "MRV3", seriesSlug: "rotary-valves",
      title: copy.title, cardTitle: { [locale]: copy.modelName },
      imageCard: copy.imageCard, image: copy.image, cardImage: copy.imageCard,
      imagePath: copy.image, imageUrl: copy.image, imageAlt: copy.imageAlt,
      cardSubtitle: { [locale]: copy.cardHeading },
      description: copy.description, summary: copy.description, name: copy.modelName, productName: copy.modelName,
      filter01: c.channels, filter02: c.port, filter03: "", filter04: "",
      filters: { filter01: c.channels, filter02: c.port },
      href: `${mrv3BasePath}${c.slug}/`, detailHref: `${mrv3BasePath}${c.slug}/`,
    };
  });
}
