/* =========================================================
   news.zh.ts
   恒永达官网｜中文公司新闻数据

   说明：
   1. 当前阶段使用本地静态数据
   2. 后期接 CMS / 后台时，这些字段可以直接迁移
   3. 分类只保留：展会活动 / 公司动态 / 公告通知
========================================================= */

import type { NewsPageData } from "./news.types";

const newsBannerImage =
  "/images/resources/news/banner/resources-news-banner-1920x520-v001.webp";

/* 临时封面图
   说明：
   1. 第一版可以先统一使用新闻 Banner 作为封面
   2. 后期再逐篇替换为真实展会图、证书图、项目图
*/
const defaultCoverImage = newsBannerImage;

export const newsZhData: NewsPageData = {
  locale: "zh-CN",

  hero: {
    title: "公司新闻",
    description:
      "了解恒永达在展会活动、企业发展、技术创新、质量体系与重要公告中的最新动态。",
    backgroundImage: newsBannerImage,
  },

  breadcrumbs: [
    {
      label: "首页",
      href: "/",
    },
    {
      label: "资源中心",
      href: "/resources",
    },
    {
      label: "公司新闻",
    },
  ],

  search: {
    placeholder: "请输入关键词",
  },

  categories: [
    {
      key: "all",
      label: "全部",
    },
    {
      key: "exhibition",
      label: "展会活动",
    },
    {
      key: "company",
      label: "公司动态",
    },
    {
      key: "notice",
      label: "公告通知",
    },
  ],

  sectionTitle: "最新动态",

  articles: [
    {
      id: "adlm-2026",
      slug: "adlm-2026",
      category: "exhibition",
      title: "恒永达将参加 ADLM 2026，展示微流体核心零部件产品体系",
      summary:
        "恒永达将在 ADLM 2026 期间展示面向 IVD、实验室自动化与生命科学设备的泵、阀、接头、管路与传感器产品。",
      date: "2026-06-07",
      coverImage: defaultCoverImage,
      isPinned: true,
      content: [
        {
          title: "面向 IVD 与实验室自动化应用",
          content:
            "恒永达将围绕微流体系统关键零部件，展示柱塞泵、注射泵、隔膜泵、电磁阀、旋转阀、管路接头与传感器等产品体系。",
        },
        {
          title: "展示长期稳定的流体控制能力",
          content:
            "展会期间，恒永达将与客户交流产品选型、材料兼容、系统集成和国产替代等应用需求。",
        },
      ],
    },
    {
      id: "whx-labs-dubai-2026",
      slug: "whx-labs-dubai-2026",
      category: "exhibition",
      title: "恒永达将亮相 WHX Labs Dubai 2026，拓展国际市场合作",
      summary:
        "恒永达将携微流体产品与系统解决方案参加 WHX Labs Dubai 2026，持续推进海外市场渠道与客户合作。",
      date: "2026-05-28",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "连接海外客户与渠道伙伴",
          content:
            "WHX Labs Dubai 面向实验室医学与诊断行业，恒永达将借助展会进一步接触中东、欧洲、印度等地区客户与合作伙伴。",
        },
        {
          title: "展示微流体零部件能力",
          content:
            "展会期间将重点展示接头、管材、泵阀及相关流体控制部件，帮助客户快速了解产品能力与合作方式。",
        },
      ],
    },
    {
      id: "gazelle-enterprise-2025",
      slug: "gazelle-enterprise-2025",
      category: "company",
      title: "创新再突破，恒永达科技荣膺“瞪羚企业”",
      summary:
        "恒永达凭借技术创新实力、成长速度和市场表现，获评深圳市瞪羚企业，企业资质与成长能力再次获得认可。",
      date: "2025-07-22",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "获评深圳市瞪羚企业",
          content:
            "恒永达凭借微流体领域的技术创新、成长速度与市场表现，获评深圳市瞪羚企业。这不仅是一项企业荣誉，也体现了公司长期坚持技术创新与稳健发展的价值。",
        },
        {
          title: "深耕微流体领域",
          content:
            "自 2012 年成立以来，恒永达持续围绕微流体精密控制技术进行研发与产业化，产品服务医疗诊断、环保监测、实验室设备、生命科学与合成生物等领域。",
        },
      ],
    },
    {
      id: "national-little-giant-2024",
      slug: "national-little-giant-2024",
      category: "company",
      title: "恒永达荣获国家级专精特新“小巨人”称号",
      summary:
        "恒永达凭借在微流体控制领域的专注与创新，荣获国家级专精特新“小巨人”企业称号。",
      date: "2024-09-06",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "荣获国家级专精特新“小巨人”",
          content:
            "恒永达凭借微流体控制领域的长期专注与创新能力，荣获国家级专精特新“小巨人”企业称号。",
        },
        {
          title: "持续服务全球客户",
          content:
            "公司将继续以专业化、精细化、特色化和新颖化为方向，持续优化产品与服务。",
        },
      ],
    },
    {
      id: "engineering-technology-center-2024",
      slug: "engineering-technology-center-2024",
      category: "company",
      title: "恒永达获广东省高性能微流体移液系统工程技术研究中心认定",
      summary:
        "恒永达获“广东省高性能微流体移液系统工程技术研究中心”认定。",
      date: "2024-04-17",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "获得工程技术研究中心认定",
          content:
            "恒永达获广东省高性能微流体移液系统工程技术研究中心认定，体现公司在微流体移液领域的研发平台能力。",
        },
        {
          title: "聚焦关键部件工程化应用",
          content:
            "中心将围绕高端精密泵、阀、针、管、连接件及热控模块开展机理研究并推动工程化应用。",
        },
      ],
    },
    {
      id: "yahuilong-project-acceptance-2024",
      slug: "yahuilong-project-acceptance-2024",
      category: "company",
      title: "恒永达与亚辉龙携手，针项目被科创局顺利验收",
      summary:
        "由亚辉龙牵头、恒永达作为主要参与单位的高精密采样针关键技术研发项目通过验收。",
      date: "2024-03-05",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "高精密采样针项目通过验收",
          content:
            "在深圳市科技创新局验收下，由亚辉龙牵头、恒永达作为主要参与单位的高精密采样针关键技术研发项目顺利验收。",
        },
        {
          title: "体现协同研发能力",
          content:
            "恒永达充分发挥自身在微流体领域的专业能力，为项目顺利推进贡献重要力量。",
        },
      ],
    },
    {
      id: "mgi-quality-award-2024",
      slug: "mgi-quality-award-2024",
      category: "company",
      title: "恒永达喜获华大智造嘉许，荣膺“年度最佳质量奖”",
      summary:
        "恒永达荣获华大智造颁发的“年度最佳质量奖”，体现客户对公司质量稳定性的认可。",
      date: "2024-03-07",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "获得客户质量奖项",
          content:
            "恒永达荣获华大智造颁发的年度最佳质量奖，体现客户对公司长期坚持质量至上理念的认可。",
        },
        {
          title: "以质量支持长期合作",
          content:
            "恒永达将继续加强供应链质量管理，提升稳定可靠的交付能力，为合作伙伴提供更可靠的微流体零部件及系统解决方案。",
        },
      ],
    },
    {
      id: "iso13485-2023",
      slug: "iso13485-2023",
      category: "notice",
      title: "恒永达顺利通过 ISO 13485:2016 医疗器械质量管理体系认证",
      summary:
        "恒永达顺利通过 ISO 13485:2016 体系认证，并获得认证证书。",
      date: "2023-11-28",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "通过医疗器械质量管理体系认证",
          content:
            "恒永达科技股份有限公司顺利通过 ISO 13485:2016 体系认证，并获得认证证书。",
        },
        {
          title: "质量管理能力持续提升",
          content:
            "该认证覆盖医疗器械法规环境下的质量管理要求，体现公司在研发、生产、销售和服务环节的体系化管理能力。",
        },
      ],
    },
    {
      id: "three-group-standards-2023",
      slug: "three-group-standards-2023",
      category: "notice",
      title: "恒永达牵头完成三大流体零部件团体标准",
      summary:
        "恒永达牵头完成移液针、微量柱塞泵、管路连接件三项流体零部件团体标准。",
      date: "2023-12-07",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "参与推动行业标准建设",
          content:
            "恒永达与多家 IVD 企业及行业机构共同参与三项团体标准制定，覆盖移液针、微量柱塞泵和低压管路连接件。",
        },
        {
          title: "提升选型效率与行业质量",
          content:
            "相关标准有助于统一核心器件要求，提升 IVD 客户零部件选型效率，缩短研发周期，促进行业高质量发展。",
        },
      ],
    },
    {
      id: "guangming-quality-cultivation-2024",
      slug: "guangming-quality-cultivation-2024",
      category: "notice",
      title: "恒永达通过光明区卓越质量培育项目评审",
      summary:
        "恒永达通过光明区 2024 年度卓越质量培育项目评审，体现公司在质量管理与技术创新方面的持续努力。",
      date: "2024-12-02",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "通过卓越质量培育项目评审",
          content:
            "恒永达通过光明区市场监督管理局主办的 2024 年度卓越质量培育项目评审。",
        },
        {
          title: "质量管理持续完善",
          content:
            "该项目通过既是阶段性认可，也是新的起点，恒永达将继续提升质量管理水平，为客户提供高效可靠的解决方案。",
        },
      ],
    },
  ],

  bottomBanner: {
    title: "希望进一步了解产品或合作机会？",
    description:
      "您可以提交产品需求、下载规格书，或了解恒永达面向海外市场的经销商合作支持。",
    actions: [
      {
        label: "联系我们",
        href: "/contact",
      },
    ],
  },
}; 