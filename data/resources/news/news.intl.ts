/* =========================================================
   news.intl.ts
   FOREACH Website｜International News Data

   文件路径：
   data/resources/news/news.intl.ts

   说明：
   1. 外语页面第一版统一使用英文新闻数据
   2. /en /es /fr /ko /ru 都先读取这个文件
   3. 后期如果要分别翻译西语、法语、韩语、俄语，可再拆分：
      - news.es.ts
      - news.fr.ts
      - news.ko.ts
      - news.ru.ts
   4. 当前重点是先把多语言路径跑通
========================================================= */

import type { NewsPageData } from "./news.types";

const newsBannerImage =
  "/images/resources/news/banner/resources-news-banner-1920x520-v001.webp";

/* 第一版临时统一封面图
   说明：
   1. 先用公司新闻 Banner 作为所有新闻封面
   2. 后期再逐篇替换为展会图、证书图、项目图
*/
const defaultCoverImage = newsBannerImage;

export const newsIntlData: NewsPageData = {
  locale: "en",

  hero: {
    title: "News",
    description:
      "Follow FOREACH updates in exhibitions, company development, technology innovation, quality systems and important announcements.",
    backgroundImage: newsBannerImage,
  },

  breadcrumbs: [
    {
      label: "Home",
      href: "/en",
    },
    {
      label: "Resources",
      href: "/en/resources",
    },
    {
      label: "News",
    },
  ],

  search: {
    placeholder: "Search news",
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
      id: "adlm-2026",
      slug: "adlm-2026",
      category: "exhibition",
      title:
        "FOREACH to Exhibit at ADLM 2026 with Microfluidic Core Components",
      summary:
        "FOREACH will present pumps, valves, fittings, tubing and sensors for IVD, laboratory automation and life science instruments.",
      date: "2026-06-07",
      coverImage: defaultCoverImage,
      isPinned: true,
      content: [
        {
          title: "For IVD and laboratory automation applications",
          content:
            "FOREACH will showcase core microfluidic components including plunger pumps, syringe pumps, diaphragm pumps, solenoid valves, rotary valves, fittings, tubing and sensors.",
        },
        {
          title: "Reliable fluid control for long-term integration",
          content:
            "During the exhibition, FOREACH will discuss product selection, material compatibility, system integration and localization needs with customers.",
        },
      ],
    },
    {
      id: "whx-labs-dubai-2026",
      slug: "whx-labs-dubai-2026",
      category: "exhibition",
      title:
        "FOREACH to Join WHX Labs Dubai 2026 for International Cooperation",
      summary:
        "FOREACH will present microfluidic products and system solutions at WHX Labs Dubai 2026, supporting overseas customer and channel cooperation.",
      date: "2026-05-28",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "Connecting with international customers and partners",
          content:
            "WHX Labs Dubai focuses on laboratory medicine and diagnostics. FOREACH will use the exhibition to connect with customers and partners from the Middle East, Europe, India and other regions.",
        },
        {
          title: "Showcasing microfluidic component capability",
          content:
            "FOREACH will present fittings, tubing, pumps, valves and related fluid control components to help customers understand product capability and cooperation options.",
        },
      ],
    },
    {
      id: "gazelle-enterprise-2025",
      slug: "gazelle-enterprise-2025",
      category: "company",
      title: "FOREACH Recognized as a Gazelle Enterprise",
      summary:
        "FOREACH was recognized for its technology innovation, growth momentum and market performance in the microfluidics field.",
      date: "2025-07-22",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "Recognized for growth and innovation",
          content:
            "The recognition reflects FOREACH's continuous investment in microfluidic precision control technology and long-term business development.",
        },
        {
          title: "Serving multiple application fields",
          content:
            "Since 2012, FOREACH has developed microfluidic components and system solutions for medical diagnostics, environmental monitoring, laboratory instruments, life sciences and synthetic biology.",
        },
      ],
    },
    {
      id: "national-little-giant-2024",
      slug: "national-little-giant-2024",
      category: "company",
      title:
        "FOREACH Recognized as a National Specialized and Innovative Little Giant Enterprise",
      summary:
        "FOREACH received the national Little Giant recognition for its long-term focus and innovation in microfluidic control technology.",
      date: "2024-09-06",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "Recognition for specialization and innovation",
          content:
            "FOREACH was recognized for its long-term focus, technical development and innovation in microfluidic control components and solutions.",
        },
        {
          title: "Continuing to support global customers",
          content:
            "FOREACH will continue to improve products and services with a focus on specialization, refinement and innovation.",
        },
      ],
    },
    {
      id: "engineering-technology-center-2024",
      slug: "engineering-technology-center-2024",
      category: "company",
      title:
        "FOREACH Recognized as Guangdong Engineering Technology Research Center for High-Performance Microfluidic Pipetting Systems",
      summary:
        "FOREACH was recognized for its R&D platform capability in high-performance microfluidic pipetting systems.",
      date: "2024-04-17",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "Recognition of engineering research capability",
          content:
            "The recognition reflects FOREACH's R&D platform capability in microfluidic pipetting systems and related key components.",
        },
        {
          title: "Focus on engineering applications",
          content:
            "The center will focus on high-precision pumps, valves, needles, tubing, fittings and thermal control modules for engineering applications.",
        },
      ],
    },
    {
      id: "yahuilong-project-acceptance-2024",
      slug: "yahuilong-project-acceptance-2024",
      category: "company",
      title:
        "FOREACH Participated in a High-Precision Sampling Needle Project Successfully Accepted by the Science and Technology Authority",
      summary:
        "A high-precision sampling needle R&D project led by YHLO, with FOREACH as a key participant, successfully passed acceptance.",
      date: "2024-03-05",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "Project acceptance completed",
          content:
            "The project focused on key technologies for high-precision sampling needles used in high-end automated analysis instruments.",
        },
        {
          title: "Collaborative R&D capability",
          content:
            "FOREACH contributed its microfluidic expertise to support the successful progress and acceptance of the project.",
        },
      ],
    },
    {
      id: "mgi-quality-award-2024",
      slug: "mgi-quality-award-2024",
      category: "company",
      title: "FOREACH Received Annual Best Quality Award from MGI",
      summary:
        "FOREACH received the Annual Best Quality Award from MGI, reflecting customer recognition of product and supply quality.",
      date: "2024-03-07",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "Customer recognition for quality",
          content:
            "The award reflects customer recognition of FOREACH's long-term commitment to quality and reliable supply.",
        },
        {
          title: "Supporting long-term cooperation",
          content:
            "FOREACH will continue to strengthen quality management and provide reliable microfluidic components and solutions to partners.",
        },
      ],
    },
    {
      id: "iso13485-2023",
      slug: "iso13485-2023",
      category: "notice",
      title:
        "FOREACH Passed ISO 13485:2016 Medical Device Quality Management System Certification",
      summary:
        "FOREACH successfully passed ISO 13485:2016 certification and obtained the certificate.",
      date: "2023-11-28",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "Quality system for medical device applications",
          content:
            "ISO 13485 is a quality management system standard for organizations involved in medical device design, production, storage, distribution, installation and service.",
        },
        {
          title: "Continuous improvement in quality management",
          content:
            "The certification reflects FOREACH's continuous improvement in quality control across R&D, production, sales and service processes.",
        },
      ],
    },
    {
      id: "three-group-standards-2023",
      slug: "three-group-standards-2023",
      category: "notice",
      title:
        "FOREACH Led the Completion of Three Group Standards for Fluidic Components",
      summary:
        "FOREACH led the completion of group standards covering pipetting needles, micro plunger pumps and low-pressure tubing fittings.",
      date: "2023-12-07",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "Supporting industry standardization",
          content:
            "FOREACH participated with IVD companies and industry organizations in the development of three group standards for key fluidic components.",
        },
        {
          title: "Improving component selection efficiency",
          content:
            "The standards help unify key component requirements, improve selection efficiency and support high-quality development of the IVD industry.",
        },
      ],
    },
    {
      id: "guangming-quality-cultivation-2024",
      slug: "guangming-quality-cultivation-2024",
      category: "notice",
      title:
        "FOREACH Passed the Guangming District Excellence Quality Cultivation Project Review",
      summary:
        "FOREACH passed the 2024 Guangming District Excellence Quality Cultivation Project review, reflecting continued efforts in quality management and innovation.",
      date: "2024-12-02",
      coverImage: defaultCoverImage,
      content: [
        {
          title: "Excellence quality cultivation review",
          content:
            "FOREACH passed the 2024 Guangming District Excellence Quality Cultivation Project review organized by the local market supervision authority.",
        },
        {
          title: "Continuous quality improvement",
          content:
            "This review is both a recognition and a new starting point for FOREACH to further improve quality management and provide reliable solutions.",
        },
      ],
    },
  ],

  bottomBanner: {
    title: "Need more product or cooperation information?",
    description:
      "Submit a product request or learn more about FOREACH product and cooperation support.",
    actions: [
      {
        label: "Contact Us",
        href: "/contact",
      },
    ],
  },
}; 