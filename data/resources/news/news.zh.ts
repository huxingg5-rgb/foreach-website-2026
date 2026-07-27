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
      id: "adlm-2026-team-departure",
      slug: "adlm-2026-team-departure",
      category: "exhibition",
      title: "启程赴美｜恒永达参展团队即将亮相 ADLM 2026",
      summary:
        "恒永达市场总监一行已启程赴美，将参加 ADLM 2026，并在 4105 展位展示微流体核心部件、流体连接产品及液路系统解决方案。",
      date: "2026-07-23",
      coverImage: "/images/resources/news/articles/adlm-2026-team-departure/cover.webp",
      isPinned: true,
      content: [
        {
          title: "恒永达将参加 ADLM 2026",
          content:
            "近日，恒永达市场总监一行启程赴美，将参加于 2026 年 7 月 26 日至 30 日在美国加利福尼亚州阿纳海姆举办的 ADLM 2026。\n\n本次展会，恒永达将在 4105 展位与来自体外诊断、生命科学、分析仪器和实验室自动化等领域的客户、工程师及行业伙伴进行现场交流。",
        },
        {
          title: "展会信息",
          content:
            "展会：ADLM 2026\n时间：2026 年 7 月 26 日至 30 日\n地点：美国加利福尼亚州阿纳海姆\n展位：4105",
        },
        {
          title: "展示微流体核心部件与液路解决方案",
          content:
            "展会期间，恒永达将集中展示面向仪器设备应用的微流体核心产品与液路解决方案，覆盖液体输送、精密计量、流路切换、压力监测、气泡检测及流体连接等关键环节。\n\n相关产品可应用于体外诊断、生命科学、分析仪器和实验室自动化等领域，为客户提供从核心部件选型、材料兼容到液路系统集成的支持。",
        },
        {
          title: "长期专注微流体精密控制",
          content:
            "恒永达长期专注于微流体精密控制技术的研发与产业化，持续完善泵、阀、针、接头、管路、传感器及液路系统支持能力。\n\n围绕体外诊断、生命科学、实验室自动化、分析仪器及相关设备应用，恒永达持续为客户提供微流体核心部件、材料兼容支持、产品选型建议及定制化液路方案。",
        },
        {
          title: "专业能力与成长实力获得持续认可",
          content:
            "凭借在技术研发、产品创新和产业化应用方面的持续积累，恒永达先后获评国家级专精特新“小巨人”企业和深圳市瞪羚企业，专业能力、创新能力和企业成长实力获得进一步认可。",
        },
        {
          title: "为仪器应用提供更完整的工程支持",
          content:
            "通过稳定可靠的产品与面向应用的工程支持，恒永达帮助客户提升流体控制精度，简化液路系统集成，并满足仪器小型化、自动化和复杂流路设计需求。\n\n无论客户正在寻找微流体核心部件、现有产品的替代方案，还是需要解决材料兼容、产品选型、液路集成及定制开发等问题，恒永达团队都将结合具体应用需求提供相应支持。",
        },
        {
          title: "诚邀莅临 4105 展位",
          content:
            "展会期间，恒永达团队将在 4105 展位与您面对面交流，共同探讨微流体核心部件、产品替代、材料兼容和液路系统集成等需求。\n\n期待在 ADLM 2026 与您相见。",
        },
      ],
      seoTitle: "启程赴美｜恒永达参展团队即将亮相 ADLM 2026",
      seoDescription:
        "恒永达市场总监一行已启程赴美，将参加 ADLM 2026，并在 4105 展位展示精密泵、微型阀、流体连接件、管路、传感器及液路系统解决方案。",
    },
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
        {
          title: "欢迎现场交流",
          content:
            "欢迎 IVD、生命科学、实验室自动化及分析仪器领域客户与恒永达团队交流液路控制、流体连接与系统集成相关需求。",
        },
      ],
      seoTitle: "ADLM 2026｜恒永达将展示微流体核心零部件产品体系",
      seoDescription:
        "恒永达将参加 ADLM 2026，展示面向 IVD、实验室自动化与生命科学设备的微流体核心零部件产品体系。",
    },
    {
      id: "me-supply-chain-expo-2026",
      slug: "me-supply-chain-expo-2026",
      category: "exhibition",
      title: "2026 ME 供应链生态展｜恒永达诚邀您的莅临指导",
      summary:
        "恒永达将参加 2026 ME 供应链生态展，展位号 2-M46，展示核心产品、技术能力及多场景应用方案。",
      date: "2026-03-27",
      coverImage: "/images/resources/news/articles/me-supply-chain-expo-2026/me-2026-news.webp",
      isPinned: true,
      content: [
        {
          title: "展会信息",
          content:
            "恒永达将参加在中国・深圳国际会展中心举办的 2026 ME 供应链生态展，展位号为 2-M46。",
        },
        {
          title: "展示内容",
          content:
            "本次参展将重点展示公司的核心产品、技术能力及多场景应用方案，面向客户需求提供更直观的产品体验与专业交流服务。",
        },
        {
          title: "现场交流",
          content:
            "展会期间，客户可以进一步了解恒永达产品特点、应用优势以及在相关行业中的解决方案能力，并与团队面对面交流市场需求、产品应用及合作方向。",
        },
      ],
      seoTitle: "2026 ME 供应链生态展｜恒永达展位 2-M46",
      seoDescription:
        "恒永达将参加 2026 ME 供应链生态展，展位号 2-M46，展示核心产品、技术能力及多场景应用方案。",
    },
    {
      id: "guangzhou-high-med-expo-2026",
      slug: "guangzhou-high-med-expo-2026",
      category: "exhibition",
      title: "2026 广州高医展｜恒永达科技诚邀您莅临展位参观交流",
      summary:
        "恒永达将于 2026 年 3 月 30 日至 4 月 1 日参加广州高医展，展位号 B529。",
      date: "2026-03-26",
      coverImage: "/images/resources/news/articles/guangzhou-high-med-expo-2026/cover.webp",
      content: [
        {
          title: "展会信息",
          content:
            "恒永达将于 2026 年 3 月 30 日至 4 月 1 日参加在中国・广州空港博览中心举办的广州高医展，展位号为 B529。",
        },
        {
          title: "展示内容",
          content:
            "本次参展将围绕公司核心产品、技术能力及行业应用方案进行展示，向客户和合作伙伴呈现更直观、更完整的产品与服务内容。",
        },
        {
          title: "交流方向",
          content:
            "展会现场，观众可进一步了解产品特点、应用场景及解决方案优势，并与恒永达团队面对面沟通行业需求、产品应用及合作机会。",
        },
      ],
      seoTitle: "2026 广州高医展｜恒永达展位 B529",
      seoDescription:
        "恒永达将参加 2026 广州高医展，展位号 B529，展示核心产品、技术能力及行业应用方案。",
    },
    {
      id: "caclp-2026",
      slug: "caclp-2026",
      category: "exhibition",
      title: "邀请函｜恒永达诚邀您参加 2026 CACLP",
      summary:
        "恒永达将于 2026 年 3 月 21 日至 23 日参加 CACLP，展位号 2-0424，欢迎新老客户莅临交流。",
      date: "2026-03-17",
      coverImage: "/images/resources/news/articles/caclp-2026/cover.webp",
      isPinned: true,
      content: [
        {
          title: "展会信息",
          content:
            "恒永达将于 2026 年 3 月 21 日至 3 月 23 日参加在中国・厦门国际博览中心举办的 2026 CACLP，展位号为 2-0424。",
        },
        {
          title: "展示内容",
          content:
            "本次参展将集中展示公司的核心产品、技术能力及行业应用方案，帮助客户更加直观地了解产品特点、应用场景与服务优势。",
        },
        {
          title: "诚邀莅临",
          content:
            "恒永达诚邀新老客户、合作伙伴及行业同仁莅临 2-0424 展位参观指导，共同探讨行业发展趋势与市场合作机遇。",
        },
      ],
      seoTitle: "2026 CACLP 邀请函｜恒永达展位 2-0424",
      seoDescription:
        "恒永达诚邀您参加 2026 CACLP，展位号 2-0424，现场展示核心产品、技术能力及行业应用方案。",
    },
    {
      id: "whx-labs-dubai-2026",
      slug: "whx-labs-dubai-2026",
      category: "exhibition",
      title: "迪拜实验室展｜期待在现场与您相见",
      summary:
        "恒永达将参加迪拜实验室展，展位号 H2.F34，展示核心产品、技术优势及多场景应用方案。",
      date: "2026-02-07",
      coverImage: "/images/resources/news/articles/whx-labs-dubai-2026/cover.webp",
      isPinned: true,
      content: [
        {
          title: "展会信息",
          content:
            "恒永达将于 2026 年 2 月 10 日至 2 月 13 日参加在阿联酋迪拜世界贸易中心举办的迪拜实验室展，展位号为 H2.F34。",
        },
        {
          title: "海外市场交流",
          content:
            "本次参展是公司拓展海外市场、加强国际交流的重要机会。展会期间，恒永达将重点展示公司的核心产品、技术优势及多场景应用方案。",
        },
        {
          title: "现场沟通",
          content:
            "客户可以在展会现场与恒永达专业团队面对面沟通，深入了解产品特点、应用场景、定制需求及合作模式。",
        },
      ],
      seoTitle: "迪拜实验室展｜恒永达展位 H2.F34",
      seoDescription:
        "恒永达将参加 2026 迪拜实验室展，展位号 H2.F34，展示微流体核心产品、技术优势及多场景应用方案。",
    },
    {
      id: "specialized-new-conference-2025",
      slug: "specialized-new-conference-2025",
      category: "company",
      title: "我司受国家工信部邀参出席 2025 专精特新大会",
      summary:
        "恒永达作为深圳 15 家专精特新企业受邀代表之一，参与 2025 专精特新中小企业发展大会。",
      date: "2025-11-13",
      coverImage: "/images/resources/news/articles/specialized-new-conference-2025/cover.png",
      content: [
        {
          title: "受邀参会",
          content:
            "2025 专精特新中小企业发展大会于 11 月 12 日在重庆开幕。此次会议中，恒永达作为深圳 15 家专精特新企业受邀代表之一参与大会。",
        },
        {
          title: "深圳代表团出席",
          content:
            "出席本次大会的深圳代表团由市工业和信息化局党组成员、市中小企业服务局局长吕哲率队，深圳市中小企业发展促进会组织相关企业代表参会。",
        },
        {
          title: "持续专注微流体领域",
          content:
            "作为国家级专精特新“小巨人”企业，恒永达将继续围绕微流体核心零部件、液路系统支持与行业应用需求进行持续创新。",
        },
      ],
      seoTitle: "恒永达受邀出席 2025 专精特新中小企业发展大会",
      seoDescription:
        "恒永达作为深圳 15 家专精特新企业受邀代表之一，参与 2025 专精特新中小企业发展大会。",
    },
    {
      id: "medical-device-innovation-2025",
      slug: "medical-device-innovation-2025",
      category: "exhibition",
      title: "2025 医疗器械创新展｜恒永达诚邀您莅临",
      summary:
        "恒永达将于 2025 年 8 月 21 日至 23 日参加 2025 医疗器械创新展，展位号 B36。",
      date: "2025-08-15",
      coverImage: "/images/resources/news/articles/medical-device-innovation-2025/cover.png",
      content: [
        {
          title: "展会信息",
          content:
            "恒永达将于 2025 年 8 月 21 日至 8 月 23 日参加在中国・苏州・苏州国际博览中心举办的 2025 医疗器械创新展，展位号为 B36。",
        },
        {
          title: "展示方向",
          content:
            "本次参展将集中展示公司的核心产品、技术能力及行业应用方案，围绕客户需求呈现更直观、更完整的产品与服务内容。",
        },
        {
          title: "诚邀交流",
          content:
            "恒永达诚邀新老客户、合作伙伴及行业同仁莅临 B36 展位参观指导，共同探讨行业发展趋势、产品应用需求及未来合作机会。",
        },
      ],
      seoTitle: "2025 医疗器械创新展｜恒永达展位 B36",
      seoDescription:
        "恒永达将参加 2025 医疗器械创新展，展位号 B36，展示核心产品、技术能力及行业应用方案。",
    },
    {
      id: "gazelle-enterprise-2025",
      slug: "gazelle-enterprise-2025",
      category: "company",
      title: "创新再突破，恒永达科技荣膺“瞪羚企业”",
      summary:
        "恒永达凭借技术创新实力、成长速度和市场表现，获评深圳市瞪羚企业，企业资质与成长能力再次获得认可。",
      date: "2025-07-22",
      coverImage: "/images/resources/news/articles/gazelle-enterprise-2025/cover.png",
      isPinned: true,
      content: [
        {
          title: "获评深圳市瞪羚企业",
          content:
            "恒永达凭借技术创新实力、成长速度和市场表现，获评深圳市瞪羚企业。这不仅是一项企业荣誉，也体现了公司长期坚持技术创新与稳健发展的价值。",
        },
        {
          title: "持续深耕微流体领域",
          content:
            "自成立以来，恒永达持续围绕微流体精密控制技术进行研发与产业化，产品服务医疗诊断、环保监测、实验室设备、生命科学与合成生物等领域。",
        },
        {
          title: "以创新支撑客户应用",
          content:
            "未来，恒永达将继续围绕泵、阀、针、管路连接件、传感器及液路系统支持能力进行持续优化，为客户提供稳定可靠的产品与服务。",
        },
      ],
      seoTitle: "恒永达科技荣膺深圳市瞪羚企业",
      seoDescription:
        "恒永达凭借技术创新实力、成长速度和市场表现，获评深圳市瞪羚企业。",
    },
    {
      id: "guangming-quality-cultivation-2024",
      slug: "guangming-quality-cultivation-2024",
      category: "notice",
      title: "恒永达通过光明区卓越质量培育项目评审",
      summary:
        "恒永达通过光明区 2024 年度卓越质量培育项目评审，体现公司在质量管理与技术创新方面的持续努力。",
      date: "2024-12-02",
      coverImage: "/images/resources/news/articles/guangming-quality-cultivation-2024/cover.png",
      content: [
        {
          title: "通过卓越质量培育项目评审",
          content:
            "恒永达通过光明区 2024 年度卓越质量培育项目评审。这是对公司质量管理建设、技术创新能力和持续改进工作的阶段性认可。",
        },
        {
          title: "持续完善质量管理",
          content:
            "质量管理能力是微流体核心零部件长期稳定交付的重要基础。恒永达将继续完善质量管理体系，推动产品、流程与服务能力持续提升。",
        },
        {
          title: "为客户提供可靠支持",
          content:
            "未来，公司将继续以稳定可靠的产品交付和专业服务支持客户应用，为 IVD、生命科学、实验室自动化等行业客户提供更高效的解决方案。",
        },
      ],
      seoTitle: "恒永达通过光明区卓越质量培育项目评审",
      seoDescription:
        "恒永达通过光明区 2024 年度卓越质量培育项目评审，体现公司在质量管理与技术创新方面的持续努力。",
    },
    {
      id: "national-little-giant-2024",
      slug: "national-little-giant-2024",
      category: "company",
      title: "恒永达荣获国家级专精特新“小巨人”称号",
      summary:
        "恒永达凭借在微流体控制领域的长期专注与创新能力，荣获国家级专精特新“小巨人”企业称号。",
      date: "2024-09-06",
      coverImage: "/images/resources/news/articles/national-little-giant-2024/cover.png",
      content: [
        {
          title: "荣获国家级专精特新“小巨人”",
          content:
            "在国家工信部公布的国家级专精特新“小巨人”企业名单中，深圳市恒永达科技股份有限公司凭借其在微流体控制领域的专注与创新荣获此项殊荣。",
        },
        {
          title: "专注微流体控制领域",
          content:
            "恒永达长期围绕微流体系统核心零部件开展研发与产业化，持续建设泵、阀、针、管路连接件、传感器及液路系统支持能力。",
        },
        {
          title: "以专业能力服务客户",
          content:
            "公司将继续以专业化、精细化、特色化和创新化为方向，持续优化产品与服务，为客户提供稳定可靠的微流体核心部件与系统支持。",
        },
      ],
      seoTitle: "恒永达荣获国家级专精特新“小巨人”称号",
      seoDescription:
        "恒永达凭借在微流体控制领域的长期专注与创新能力，荣获国家级专精特新“小巨人”企业称号。",
    },
    {
      id: "cmef-icmd-2014",
      slug: "cmef-icmd-2014",
      category: "exhibition",
      title: "恒永达科技——CMEF & ICMD 2014 秋季会圆满结束",
      summary:
        "恒永达科技参加 CMEF & ICMD 2014 秋季会，展示新产品线并与客户深入交流微流体系统应用。",
      date: "2014-10-26",
      coverImage: "/images/resources/news/articles/cmef-icmd-2014/cover.jpg",
      content: [
        {
          title: "展会圆满结束",
          content:
            "在 CMEF & ICMD 2014 秋季会中，恒永达科技不仅在原有产品上推陈出新，也带来了全新的产品线，吸引了众多客户关注。",
        },
        {
          title: "技术交流获得关注",
          content:
            "展会期间，公司总经理钟志刚在第二届医疗器械制造定制服务技术创新论坛中进行技术分享，从行业现状和专业解决方案角度与现场嘉宾展开交流。",
        },
        {
          title: "持续服务 IVD 与相关行业",
          content:
            "展会期间，众多新老客户莅临恒永达展位，对各系列产品和微流体系统支持能力表现出浓厚兴趣。恒永达将继续为 IVD 及相关领域客户提供专业支持。",
        },
      ],
      seoTitle: "恒永达科技 CMEF & ICMD 2014 秋季会圆满结束",
      seoDescription:
        "恒永达科技参加 CMEF & ICMD 2014 秋季会，展示新产品线并与客户深入交流微流体系统应用。",
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
