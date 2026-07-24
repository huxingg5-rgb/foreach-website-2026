/* =========================================================
   news.intl.ts
   FOREACH Website | International News Data

   Notes:
   1. International pages currently share English news content.
   2. Locale-specific routes are handled in services/resources/news/getNewsPageData.ts.
   3. Categories: exhibition / company / notice.
========================================================= */

import type { NewsPageData } from "./news.types";

const newsBannerImage =
  "/images/resources/news/banner/resources-news-banner-1920x520-v001.webp";

const defaultCoverImage = newsBannerImage;

export const newsIntlData: NewsPageData = {
  locale: "en",

  hero: {
    title: "News",
    description:
      "Follow FOREACH updates in exhibitions, company development, technology innovation, quality systems, and important announcements.",
    backgroundImage: newsBannerImage,
  },

  breadcrumbs: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Resources",
      href: "/resources",
    },
    {
      label: "News",
    },
  ],

  search: {
    placeholder: "Enter keywords",
  },

  categories: [
    {
      key: "all",
      label: "All",
    },
    {
      key: "exhibition",
      label: "Exhibitions",
    },
    {
      key: "company",
      label: "Company Updates",
    },
    {
      key: "notice",
      label: "Announcements",
    },
  ],

  sectionTitle: "Latest Updates",

  articles: [
    {
      id: "adlm-2026-team-departure",
      slug: "adlm-2026-team-departure",
      category: "exhibition",
      title: "Meet FOREACH at ADLM 2026",
      summary:
        "FOREACH will exhibit at ADLM 2026 in Anaheim from July 26 to 30, 2026. Visit Booth 4105 to explore precision fluid control components and application-focused fluidic solutions for IVD, life science, analytical instruments, and laboratory automation.",
      date: "2026-07-23",
      coverImage: "/images/resources/news/articles/adlm-2026-team-departure/cover.webp",
      isPinned: true,
      content: [
        {
          title: "Meet FOREACH in Anaheim",
          content:
            "FOREACH will participate in ADLM 2026, taking place in Anaheim, California, from July 26 to 30, 2026.\n\nAt Booth 4105, our team will meet with instrument manufacturers, engineers, and industry partners to discuss fluid control challenges, component selection, and fluidic system integration.",
        },
        {
          title: "What We Will Present",
          content:
            "Our exhibition portfolio will include precision pumps, miniature valves, fluidic fittings, tubing, pressure sensing, bubble detection, and customized fluidic solutions.\n\nThese products support critical fluidic functions such as accurate liquid metering, fluid transfer, flow-path switching, pressure monitoring, bubble detection, and reliable fluid connections.",
        },
        {
          title: "Engineering Support for Instrument Applications",
          content:
            "FOREACH supports applications in in vitro diagnostics, life science, analytical instruments, and laboratory automation.\n\nBeyond supplying individual components, our engineering team assists customers with material compatibility, product selection, alternative component evaluation, and fluidic system integration.",
        },
        {
          title: "Experience in Precision Fluid Control",
          content:
            "FOREACH continues to develop and industrialize precision fluid control technologies across pumps, valves, probes, fittings, tubing, sensors, and integrated fluidic solutions.\n\nThe company has received recognition in China for specialized innovation and high-growth development, reflecting its continued investment in product development, engineering capability, and manufacturing.",
        },
        {
          title: "Visit Booth 4105",
          content:
            "Whether you are looking for a new fluidic component, an alternative to an existing product, or support with material compatibility and system integration, we welcome you to visit Booth 4105.\n\nEvent: ADLM 2026\nDate: July 26–30, 2026\nLocation: Anaheim, California, USA\nBooth: 4105\n\nWe look forward to meeting you in Anaheim.",
        },
      ],
      seoTitle: "Meet FOREACH at ADLM 2026 | Booth 4105",
      seoDescription:
        "Visit FOREACH at Booth 4105 during ADLM 2026 in Anaheim and explore precision fluid control components and application-focused fluidic solutions.",
    },
    {
      id: "adlm-2026",
      slug: "adlm-2026",
      category: "exhibition",
      title:
        "FOREACH to Exhibit at ADLM 2026 with Core Microfluidic Components",
      summary:
        "FOREACH will exhibit at ADLM 2026, presenting pumps, valves, fittings, tubing, sensors, and fluidic components for IVD, laboratory automation, and life science instruments.",
      date: "2026-06-07",
      coverImage: defaultCoverImage,
      isPinned: true,
      content: [
        {
          title: "For IVD and Laboratory Automation Applications",
          content:
            "FOREACH will present core microfluidic components, including plunger pumps, syringe pumps, diaphragm pumps, solenoid valves, rotary valves, fittings, tubing, and sensors.",
        },
        {
          title: "Reliable Fluid Control for Long-term Integration",
          content:
            "During the exhibition, FOREACH will discuss product selection, material compatibility, system integration, and application needs with customers and partners.",
        },
        {
          title: "Welcome to Meet FOREACH",
          content:
            "We welcome customers from IVD, life sciences, laboratory automation, and analytical instruments to discuss fluidic control, connection integration, and system-level requirements with our team.",
        },
      ],
      seoTitle:
        "ADLM 2026 | FOREACH Core Microfluidic Components and Fluidic Solutions",
      seoDescription:
        "FOREACH will exhibit at ADLM 2026 with core microfluidic components and fluidic solutions for IVD, laboratory automation, and life science instruments.",
    },
    {
      id: "me-supply-chain-expo-2026",
      slug: "me-supply-chain-expo-2026",
      category: "exhibition",
      title: "FOREACH to Exhibit at the 2026 ME Supply Chain Expo",
      summary:
        "FOREACH will exhibit at the 2026 ME Supply Chain Expo at Booth 2-M46, presenting core products, technical capabilities, and multi-scenario application solutions.",
      date: "2026-03-27",
      coverImage: "/images/resources/news/articles/me-supply-chain-expo-2026/cover.webp",
      isPinned: true,
      content: [
        {
          title: "Exhibition Information",
          content:
            "FOREACH will participate in the 2026 ME Supply Chain Expo at Shenzhen World Exhibition & Convention Center, China. Our booth number is 2-M46.",
        },
        {
          title: "What We Will Present",
          content:
            "During the exhibition, FOREACH will present core products, technical capabilities, and multi-scenario application solutions to help visitors understand our product value and service capability more directly.",
        },
        {
          title: "On-site Communication",
          content:
            "Visitors are welcome to meet our team at Booth 2-M46 to discuss product applications, market needs, and cooperation opportunities.",
        },
      ],
      seoTitle: "FOREACH at 2026 ME Supply Chain Expo | Booth 2-M46",
      seoDescription:
        "FOREACH will exhibit at the 2026 ME Supply Chain Expo at Booth 2-M46, presenting core products and application solutions.",
    },
    {
      id: "guangzhou-high-med-expo-2026",
      slug: "guangzhou-high-med-expo-2026",
      category: "exhibition",
      title: "FOREACH Invitation to Guangzhou High Medical Expo 2026",
      summary:
        "FOREACH will exhibit at Guangzhou High Medical Expo 2026 from March 30 to April 1 at Booth B529.",
      date: "2026-03-26",
      coverImage: "/images/resources/news/articles/guangzhou-high-med-expo-2026/cover.webp",
      content: [
        {
          title: "Exhibition Information",
          content:
            "FOREACH will exhibit at Guangzhou High Medical Expo 2026 from March 30 to April 1, 2026, at Guangzhou Airport Expo Center, China. Our booth number is B529.",
        },
        {
          title: "Product and Solution Display",
          content:
            "FOREACH will present core products, technical capabilities, and industry application solutions, helping customers better understand our product features and solution advantages.",
        },
        {
          title: "Welcome to Visit",
          content:
            "We welcome customers, partners, and industry professionals to visit Booth B529 and discuss application needs, product selection, and cooperation opportunities.",
        },
      ],
      seoTitle: "FOREACH at Guangzhou High Medical Expo 2026 | Booth B529",
      seoDescription:
        "FOREACH will exhibit at Guangzhou High Medical Expo 2026 at Booth B529, presenting core products and industry application solutions.",
    },
    {
      id: "caclp-2026",
      slug: "caclp-2026",
      category: "exhibition",
      title: "Invitation: Meet FOREACH at CACLP 2026",
      summary:
        "FOREACH will exhibit at CACLP 2026 from March 21 to 23 at Booth 2-0424.",
      date: "2026-03-17",
      coverImage: "/images/resources/news/articles/caclp-2026/cover.webp",
      isPinned: true,
      content: [
        {
          title: "Exhibition Information",
          content:
            "FOREACH will participate in CACLP 2026 from March 21 to March 23, 2026, at Xiamen International Expo Center, China. Our booth number is 2-0424.",
        },
        {
          title: "What We Will Present",
          content:
            "At the booth, FOREACH will present core products, technical capabilities, and industry application solutions to help customers better understand our product features and service advantages.",
        },
        {
          title: "Welcome to Booth 2-0424",
          content:
            "We sincerely invite customers, partners, and industry professionals to visit Booth 2-0424 for product discussions and cooperation opportunities.",
        },
      ],
      seoTitle: "CACLP 2026 Invitation | FOREACH Booth 2-0424",
      seoDescription:
        "FOREACH invites you to visit Booth 2-0424 at CACLP 2026 and explore microfluidic products, technical capabilities, and application solutions.",
    },
    {
      id: "whx-labs-dubai-2026",
      slug: "whx-labs-dubai-2026",
      category: "exhibition",
      title: "FOREACH to Exhibit at WHX Labs Dubai 2026",
      summary:
        "FOREACH will exhibit at WHX Labs Dubai 2026 at Booth H2.F34, presenting core microfluidic products, technical strengths, and application solutions.",
      date: "2026-02-07",
      coverImage: "/images/resources/news/articles/whx-labs-dubai-2026/cover.webp",
      isPinned: true,
      content: [
        {
          title: "Exhibition Information",
          content:
            "FOREACH will exhibit at WHX Labs Dubai 2026 from February 10 to February 13, 2026, at Dubai World Trade Centre, UAE. Our booth number is H2.F34.",
        },
        {
          title: "International Market Communication",
          content:
            "This exhibition is an important opportunity for FOREACH to expand international market communication. We will present core products, technical strengths, and application solutions for multiple scenarios.",
        },
        {
          title: "Meet Our Team",
          content:
            "Visitors can meet the FOREACH team on site to discuss product features, application scenarios, customization needs, and cooperation models.",
        },
      ],
      seoTitle: "FOREACH at WHX Labs Dubai 2026 | Booth H2.F34",
      seoDescription:
        "FOREACH will exhibit at WHX Labs Dubai 2026 at Booth H2.F34, presenting core microfluidic products and application solutions.",
    },
    {
      id: "specialized-new-conference-2025",
      slug: "specialized-new-conference-2025",
      category: "company",
      title:
        "FOREACH Invited to Attend the 2025 Specialized and Innovative SME Development Conference",
      summary:
        "FOREACH attended the 2025 Specialized and Innovative SME Development Conference as one of the invited representative enterprises from Shenzhen.",
      date: "2025-11-13",
      coverImage: "/images/resources/news/articles/specialized-new-conference-2025/cover.png",
      content: [
        {
          title: "Invited Representative Enterprise",
          content:
            "The 2025 Specialized and Innovative SME Development Conference opened in Chongqing on November 12. FOREACH participated as one of the invited representative enterprises from Shenzhen.",
        },
        {
          title: "Shenzhen Delegation",
          content:
            "The Shenzhen delegation included government representatives, industry organization leaders, and representatives from national Specialized and Innovative Little Giant enterprises.",
        },
        {
          title: "Continuing Focus on Microfluidics",
          content:
            "As a national Specialized and Innovative Little Giant enterprise, FOREACH will continue to focus on core microfluidic components, fluidic system support, and application-oriented innovation.",
        },
      ],
      seoTitle:
        "FOREACH Attended the 2025 Specialized and Innovative SME Development Conference",
      seoDescription:
        "FOREACH attended the 2025 Specialized and Innovative SME Development Conference as one of the invited representative enterprises from Shenzhen.",
    },
    {
      id: "medical-device-innovation-2025",
      slug: "medical-device-innovation-2025",
      category: "exhibition",
      title: "FOREACH Invitation to 2025 Medical Device Innovation Expo",
      summary:
        "FOREACH will exhibit at the 2025 Medical Device Innovation Expo from August 21 to 23 at Booth B36.",
      date: "2025-08-15",
      coverImage: "/images/resources/news/articles/medical-device-innovation-2025/cover.png",
      content: [
        {
          title: "Exhibition Information",
          content:
            "FOREACH will participate in the 2025 Medical Device Innovation Expo from August 21 to August 23, 2025, at Suzhou International Expo Center, China. Our booth number is B36.",
        },
        {
          title: "Product Display",
          content:
            "FOREACH will present core products, technical capabilities, and industry application solutions to help visitors understand our product features and service value.",
        },
        {
          title: "Welcome to Visit",
          content:
            "We welcome customers, partners, and industry professionals to visit Booth B36 and discuss industry trends, application needs, and future cooperation opportunities.",
        },
      ],
      seoTitle: "FOREACH at 2025 Medical Device Innovation Expo | Booth B36",
      seoDescription:
        "FOREACH will exhibit at the 2025 Medical Device Innovation Expo at Booth B36, presenting core products and application solutions.",
    },
    {
      id: "gazelle-enterprise-2025",
      slug: "gazelle-enterprise-2025",
      category: "company",
      title: "FOREACH Recognized as a Gazelle Enterprise",
      summary:
        "FOREACH was recognized as a Gazelle Enterprise for its innovation capability, growth momentum, and market performance.",
      date: "2025-07-22",
      coverImage: "/images/resources/news/articles/gazelle-enterprise-2025/cover.png",
      isPinned: true,
      content: [
        {
          title: "Recognition for Growth and Innovation",
          content:
            "FOREACH was recognized as a Gazelle Enterprise, reflecting its innovation capability, growth momentum, and market performance.",
        },
        {
          title: "Continuing Focus on Microfluidic Technology",
          content:
            "FOREACH continues to focus on the R&D and industrialization of precision microfluidic control technologies, serving applications in medical diagnostics, environmental monitoring, laboratory equipment, life sciences, and synthetic biology.",
        },
        {
          title: "Innovation for Customer Applications",
          content:
            "FOREACH will continue to improve pumps, valves, probes, fittings, sensors, and fluidic system support capabilities to provide stable and reliable products and services.",
        },
      ],
      seoTitle: "FOREACH Recognized as a Gazelle Enterprise",
      seoDescription:
        "FOREACH was recognized as a Gazelle Enterprise for its innovation capability, growth momentum, and market performance.",
    },
    {
      id: "guangming-quality-cultivation-2024",
      slug: "guangming-quality-cultivation-2024",
      category: "notice",
      title:
        "FOREACH Passed the Guangming District Excellence Quality Cultivation Project Review",
      summary:
        "FOREACH passed the 2024 Guangming District Excellence Quality Cultivation Project review, reflecting continuous progress in quality management and technology innovation.",
      date: "2024-12-02",
      coverImage: "/images/resources/news/articles/guangming-quality-cultivation-2024/cover.png",
      content: [
        {
          title: "Project Review Passed",
          content:
            "FOREACH passed the 2024 Guangming District Excellence Quality Cultivation Project review. This represents recognition of the company's quality management development, technology innovation, and continuous improvement.",
        },
        {
          title: "Continuous Quality Management Improvement",
          content:
            "Quality management capability is an important foundation for stable delivery of microfluidic core components. FOREACH will continue to improve its quality management system and service capability.",
        },
        {
          title: "Reliable Support for Customers",
          content:
            "FOREACH will continue to support customers in IVD, life sciences, laboratory automation, and related fields with stable products and professional services.",
        },
      ],
      seoTitle:
        "FOREACH Passed the Guangming District Excellence Quality Cultivation Project Review",
      seoDescription:
        "FOREACH passed the 2024 Guangming District Excellence Quality Cultivation Project review, reflecting continuous quality management improvement.",
    },
    {
      id: "national-little-giant-2024",
      slug: "national-little-giant-2024",
      category: "company",
      title:
        "FOREACH Recognized as a National Specialized and Innovative Little Giant Enterprise",
      summary:
        "FOREACH was recognized as a national Specialized and Innovative Little Giant enterprise for its long-term focus and innovation in microfluidic control.",
      date: "2024-09-06",
      coverImage: "/images/resources/news/articles/national-little-giant-2024/cover.png",
      content: [
        {
          title: "National Little Giant Recognition",
          content:
            "FOREACH was recognized as a national Specialized and Innovative Little Giant enterprise for its focus and innovation in microfluidic control technology.",
        },
        {
          title: "Focus on Microfluidic Control",
          content:
            "FOREACH continues to develop core microfluidic components and fluidic system support capabilities, including pumps, valves, probes, fittings, sensors, and related modules.",
        },
        {
          title: "Professional Support for Customers",
          content:
            "FOREACH will continue to improve products and services in a specialized, refined, distinctive, and innovative direction, supporting customers with reliable microfluidic components and system solutions.",
        },
      ],
      seoTitle:
        "FOREACH Recognized as a National Specialized and Innovative Little Giant Enterprise",
      seoDescription:
        "FOREACH was recognized as a national Specialized and Innovative Little Giant enterprise for its long-term focus and innovation in microfluidic control.",
    },
    {
      id: "cmef-icmd-2014",
      slug: "cmef-icmd-2014",
      category: "exhibition",
      title: "FOREACH Successfully Concluded CMEF & ICMD Autumn 2014",
      summary:
        "FOREACH participated in CMEF & ICMD Autumn 2014, presenting new product lines and discussing microfluidic system applications with customers.",
      date: "2014-10-26",
      coverImage: "/images/resources/news/articles/cmef-icmd-2014/cover.jpg",
      content: [
        {
          title: "Successful Exhibition",
          content:
            "During CMEF & ICMD Autumn 2014, FOREACH presented upgraded products as well as new product lines, attracting attention from many visitors and customers.",
        },
        {
          title: "Technical Exchange",
          content:
            "During the exhibition, FOREACH shared technical insights at the Medical Device Manufacturing Customized Service Technology Innovation Forum, discussing industry challenges and professional solutions.",
        },
        {
          title: "Supporting IVD and Related Fields",
          content:
            "Many customers visited the FOREACH booth to learn about product series and microfluidic system support capabilities. FOREACH will continue to support IVD and related industries with professional products and services.",
        },
      ],
      seoTitle: "FOREACH Successfully Concluded CMEF & ICMD Autumn 2014",
      seoDescription:
        "FOREACH participated in CMEF & ICMD Autumn 2014, presenting new product lines and microfluidic system applications.",
    },
  ],

  bottomBanner: {
    title: "Need more product or cooperation information?",
    description:
      "You can submit product requirements, download datasheets, or learn more about FOREACH distributor cooperation support.",
    actions: [
      {
        label: "Contact Us",
        href: "/contact",
      },
    ],
  },
};
