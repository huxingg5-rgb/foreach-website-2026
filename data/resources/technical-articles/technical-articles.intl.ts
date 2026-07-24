/* =========================================================
   technical-articles.intl.ts
   FOREACH Website｜International Technical Articles Data

   说明：
   1. 外语第一版统一使用英文技术文章数据
   2. /en /es /fr /ko /ru 先复用英文内容
   3. 后续可按语言拆分
========================================================= */

import type { TechnicalArticlesPageData } from "./technical-articles.types";

const technicalArticlesBannerImage =
  "/images/resources/technical-articles/banner/resources-technical-articles-banner-1920x520-v001.webp";

const defaultCoverImage = technicalArticlesBannerImage;

export const technicalArticlesIntlData: TechnicalArticlesPageData = {
  locale: "en",

  hero: {
    title: "Technical Articles",
    description:
      "Explore FOREACH technical insights about product selection, material compatibility, tubing connections, sealing methods and microfluidic system applications.",
    backgroundImage: technicalArticlesBannerImage,
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
      label: "Technical Articles",
    },
  ],

  search: {
    placeholder: "Search articles",
  },

  categories: [
    {
      key: "all",
      label: "All",
    },
    {
      key: "fittings-tubing",
      label: "Fittings & Tubing",
    },
    {
      key: "pumps-valves",
      label: "Pumps & Valves",
    },
    {
      key: "materials-compatibility",
      label: "Materials & Compatibility",
    },
    {
      key: "applications",
      label: "Applications",
    },
  ],

  sectionTitle: "Technical Articles",

  articles: [
    {
      id: "cv-kv-correction-for-microfluidics",
      slug: "cv-kv-correction-for-microfluidics",
      category: "pumps-valves",
      title:
        "Engineering Guide | Correcting Cv/Kv for Microfluidic and Precision Restriction Systems",
      summary:
        "Conventional Cv/Kv calculations assume a turbulent resistance regime. At microscale diameters and low Reynolds numbers, that assumption can substantially underpredict pressure drop. This guide presents a practical correction framework for fluidic-system and instrument engineers.",
      date: "2026-07-23",
      coverImage: defaultCoverImage,
      content: [
        {
          title:
            "Why conventional Cv/Kv calculations can fail at microscale",
          content:
            "Microfluidic passages can operate in laminar or transitional conditions where the standard square-law assumption no longer represents actual resistance. Published Cv/Kv values therefore need to be connected to the calibration flow regime.",
        },
        {
          title:
            "A practical Reynolds correction framework",
          content:
            "The effective coefficient can be expressed as Cv(Re)=Cv₀×Fᵣ(Re), while corrected pressure drop can be expressed as ΔPactual=ΔPcalc÷Fᵣ². Long passages and short restrictions require different resistance models.",
        },
      ],
      seoTitle:
        "Cv/Kv Correction for Low-Reynolds-Number Microfluidic Systems",
      seoDescription:
        "Learn why conventional Cv/Kv calculations can underpredict pressure drop in microfluidic systems and how Reynolds correction, Churchill friction factors and orifice corrections can be applied.",
    },
    {
      id: "selecting-microfluidic-fittings",
      slug: "selecting-microfluidic-fittings",
      category: "fittings-tubing",
      title: "How to Select Suitable Fittings for a Microfluidic System",
      summary:
        "Fittings affect sealing performance, assembly efficiency, maintenance convenience and long-term stability. Selection should consider tubing size, connection method, pressure, fluid media and installation space.",
      date: "2026-06-08",
      coverImage:
        "/images/resources/technical-articles/covers/selecting-microfluidic-fittings.webp",
      content: [
        {
          title: "The role of fittings in fluidic systems",
          content:
            "In a microfluidic system, fittings support fluid transfer, sealing and structural connection. Different applications place different requirements on fittings. IVD instruments often focus on long-term stability and batch consistency, while laboratory automation may focus more on assembly and maintenance convenience.",
        },
        {
          title: "Key factors for selection",
          content:
            "Fitting selection starts with tubing outer diameter, inner diameter and interface compatibility. The connection method, such as rigid tubing, flexible tubing, ferrule connection, flanged connection or threaded connection, also needs to be confirmed. Pressure, media compatibility and maintenance conditions should be considered for more demanding systems.",
        },
      ],
    },
    {
      id: "peek-ptfe-pfa-material-differences",
      slug: "peek-ptfe-pfa-material-differences",
      category: "materials-compatibility",
      title: "Differences Between PEEK, PTFE and PFA in Fluidic Systems",
      summary:
        "PEEK, PTFE and PFA are common high-performance materials in microfluidic systems, but they differ in mechanical strength, chemical resistance, transparency, flexibility and processing characteristics.",
      date: "2026-06-07",
      coverImage:
        "/images/resources/technical-articles/covers/peek-ptfe-pfa-material-differences.webp",
      content: [
        {
          title: "Main differences between the three materials",
          content:
            "PEEK provides high mechanical strength and pressure resistance, making it suitable for applications requiring structural stability and wear resistance. PTFE offers excellent chemical inertness and low surface energy, but lower mechanical strength. PFA combines chemical resistance with a degree of transparency, making it useful where visual inspection or cleanliness is required.",
        },
        {
          title: "Material compatibility depends on actual conditions",
          content:
            "Material compatibility should be evaluated together with concentration, temperature, contact time, pressure and cleaning method. For mixed solvents, high temperatures or long-term immersion, sample testing and technical confirmation are recommended.",
        },
      ],
    },
    {
      id: "low-pressure-vs-high-pressure-fittings",
      slug: "low-pressure-vs-high-pressure-fittings",
      category: "fittings-tubing",
      title: "Low-Pressure vs. High-Pressure Fittings: Key Differences",
      summary:
        "Low-pressure fittings focus on assembly efficiency and sealing reliability, while high-pressure fittings require stronger structure, sealing design and pressure stability.",
      date: "2026-06-06",
      coverImage:
        "/images/resources/technical-articles/covers/low-pressure-vs-high-pressure-fittings.webp",
      content: [
        {
          title: "Different application requirements",
          content:
            "Low-pressure fittings are commonly used for reagent transfer, washing lines and general fluid handling. High-pressure fittings are often used in analytical instruments or systems sensitive to pressure fluctuation, where structural strength and sealing design are more critical.",
        },
        {
          title: "Appearance alone is not enough for replacement",
          content:
            "Even when fittings look similar, their pressure rating, sealing structure, applicable tubing and installation method may differ. If pressure is involved, the actual pressure range and full tubing assembly should be confirmed.",
        },
      ],
    },
    {
      id: "rigid-tubing-vs-flexible-tubing",
      slug: "rigid-tubing-vs-flexible-tubing",
      category: "fittings-tubing",
      title: "Rigid Tubing vs. Flexible Tubing in Fluidic Connections",
      summary:
        "Rigid tubing is suitable for stable and well-defined fluid paths, while flexible tubing is better for routing, bending and vibration-tolerant layouts.",
      date: "2026-06-05",
      coverImage:
        "/images/resources/technical-articles/covers/rigid-tubing-vs-flexible-tubing.webp",
      content: [
        {
          title: "Structural differences",
          content:
            "Rigid tubing usually provides better dimensional stability and lower deformation risk, making it suitable for systems requiring stable flow paths and volume control. Flexible tubing provides better bendability and is suitable for limited spaces or layouts requiring flexible routing.",
        },
        {
          title: "Selection depends on system layout",
          content:
            "Rigid tubing requires attention to cutting quality, insertion depth and sealing structure. Flexible tubing selection should consider elasticity, clamping force and aging during long-term use.",
        },
      ],
    },
    {
      id: "common-fitting-sealing-failure-causes",
      slug: "common-fitting-sealing-failure-causes",
      category: "fittings-tubing",
      title: "Common Causes of Fitting Sealing Failure",
      summary:
        "Leakage may be caused by tubing mismatch, installation method, cutting quality, sealing component condition or system pressure, not only by the fitting itself.",
      date: "2026-06-04",
      coverImage:
        "/images/resources/technical-articles/covers/common-fitting-sealing-failure-causes.webp",
      content: [
        {
          title: "Typical causes of leakage",
          content:
            "Common causes include tubing size mismatch, uneven cutting, insufficient insertion depth, loose threads, damaged seals, material incompatibility and system pressure beyond the applicable range.",
        },
        {
          title: "Recommended troubleshooting steps",
          content:
            "Check tubing and fitting specifications first, then inspect the tubing end, seal condition and connection alignment. If corrosive reagents or cleaning solutions are used, long-term material compatibility should also be confirmed.",
        },
      ],
    },
    {
      id: "micro-plunger-pump-selection",
      slug: "micro-plunger-pump-selection",
      category: "pumps-valves",
      title: "Key Parameters for Selecting a Micro Plunger Pump",
      summary:
        "Micro plunger pump selection should consider dispensing volume, accuracy, repeatability, pressure range, interface type, drive method and communication protocol.",
      date: "2026-06-03",
      coverImage:
        "/images/resources/technical-articles/covers/micro-plunger-pump-selection.webp",
      content: [
        {
          title: "Core parameters beyond volume range",
          content:
            "Micro plunger pumps are used in IVD, laboratory automation and analytical instruments for aspiration, dispensing and quantitative transfer. Selection should start from volume range and accuracy, then consider pressure, media, duty cycle and lifetime.",
        },
        {
          title: "System-level matching is important",
          content:
            "The pump works as part of the fluidic system and must match valves, tubing, fittings, sensors and control logic. Interface type, connection method and communication protocol are also important for integration.",
        },
      ],
    },
    {
      id: "solenoid-valves-in-microfluidic-systems",
      slug: "solenoid-valves-in-microfluidic-systems",
      category: "pumps-valves",
      title: "The Role of Solenoid Valves in Microfluidic Systems",
      summary:
        "Solenoid valves control flow on/off, switching and distribution, making them important components for automated fluidic control.",
      date: "2026-06-02",
      coverImage:
        "/images/resources/technical-articles/covers/solenoid-valves-in-microfluidic-systems.webp",
      content: [
        {
          title: "Flow path control",
          content:
            "Solenoid valves are used for reagent on/off control, wash solution switching, waste discharge and gas-liquid path switching. Depending on structure, they may provide two-way, three-way or more complex fluid path control.",
        },
        {
          title: "Selection factors",
          content:
            "Channel configuration, orifice size, pressure range, media type and sealing material should be confirmed. For corrosive media or crystallization risk, valve body material and long-term stability require further evaluation.",
        },
      ],
    },
    {
      id: "material-compatibility-table-reference",
      slug: "material-compatibility-table-reference",
      category: "materials-compatibility",
      title: "Can a Material Compatibility Table Be Used as the Final Selection Basis?",
      summary:
        "A material compatibility table is useful for preliminary screening, but final selection should also consider temperature, concentration, pressure and contact time.",
      date: "2026-06-01",
      coverImage:
        "/images/resources/technical-articles/covers/material-compatibility-table-reference.webp",
      content: [
        {
          title: "Compatibility tables are useful for screening",
          content:
            "Compatibility tables are usually based on common material and chemical media experience. They help quickly exclude obviously unsuitable materials, but real applications may involve mixed fluids and different operating conditions.",
        },
        {
          title: "Complex conditions need confirmation",
          content:
            "For mixed solvents, high concentration reagents, long-term immersion or high-temperature applications, detailed media information and sample testing are recommended before final selection.",
        },
      ],
    },
    {
      id: "ivd-fluidic-system-selection-parameters",
      slug: "ivd-fluidic-system-selection-parameters",
      category: "applications",
      title: "Key Parameters for Fluidic System Selection in IVD Instruments",
      summary:
        "IVD fluidic systems require accuracy, stability, cleanliness, material compatibility and maintainability. Individual component selection affects the whole system.",
      date: "2026-05-31",
      coverImage:
        "/images/resources/technical-articles/covers/ivd-fluidic-system-selection-parameters.webp",
      content: [
        {
          title: "A fluidic system depends on multiple components",
          content:
            "An IVD fluidic system usually includes pumps, valves, tubing, fittings, needles and sensors. These components must work together to support aspiration, dispensing, washing, reaction and waste handling.",
        },
        {
          title: "Parameters and supply capability",
          content:
            "Common concerns include dispensing accuracy, repeatability, material compatibility, bubble control, dead volume, residue, interface consistency and lifetime. For mass-production instruments, product consistency and stable supply are also important.",
        },
      ],
    },
    {
      id: "pressure-flow-material-compatibility",
      slug: "pressure-flow-material-compatibility",
      category: "applications",
      title: "Understanding Pressure, Flow Rate and Material Compatibility",
      summary:
        "Pressure, flow rate and material compatibility are three core factors in fluidic system design and should be evaluated together.",
      date: "2026-05-30",
      coverImage:
        "/images/resources/technical-articles/covers/pressure-flow-material-compatibility.webp",
      content: [
        {
          title: "Three factors should be evaluated together",
          content:
            "Pressure defines the operating range, flow rate affects transfer efficiency and response, and material compatibility determines long-term stability when components contact the fluid.",
        },
        {
          title: "System selection is not about maximizing one parameter",
          content:
            "Higher flow can introduce pressure fluctuation, which increases requirements for fitting sealing, tubing strength and pump-valve stability. If the media is corrosive, all wetted materials must also be confirmed.",
        },
      ],
    },
    {
      id: "why-application-context-matters",
      slug: "why-application-context-matters",
      category: "applications",
      title: "Why Application Context Matters in Microfluidic Product Selection",
      summary:
        "The same product may perform differently in different applications. Selection should consider media, pressure, accuracy, space and maintenance requirements.",
      date: "2026-05-29",
      coverImage:
        "/images/resources/technical-articles/covers/why-application-context-matters.webp",
      content: [
        {
          title: "Different applications have different requirements",
          content:
            "Microfluidic products are used in IVD, life sciences, environmental monitoring, analytical instruments and laboratory automation. IVD systems may focus on long-term stability, while analytical instruments may focus more on material compatibility and low residue.",
        },
        {
          title: "More complete information improves selection accuracy",
          content:
            "When submitting selection requirements, customers are encouraged to provide media, pressure range, flow range, connection method, installation space and target application.",
        },
      ],
    },
    {
      id: "fitting-replacement-by-drawings-or-samples",
      slug: "fitting-replacement-by-drawings-or-samples",
      category: "fittings-tubing",
      title: "How to Select Replacement Fittings Based on Drawings or Samples",
      summary:
        "Replacement selection requires more than external dimensions. Interface specification, sealing structure, material, pressure and application conditions must be confirmed.",
      date: "2026-05-28",
      coverImage:
        "/images/resources/technical-articles/covers/fitting-replacement-by-drawings-or-samples.webp",
      content: [
        {
          title: "Replacement selection is not only about appearance",
          content:
            "In maintenance, localization or supply chain optimization, customers often need replacement fittings based on existing samples or drawings. Dimensions, thread type, tubing size, sealing structure, wetted material and pressure should all be checked.",
        },
        {
          title: "Drawings, samples and application conditions are helpful",
          content:
            "If only a sample is available, clear photos, key dimensions, tubing and media information are recommended. If drawings are available, interface dimensions, tolerance requirements and installation conditions should be provided.",
        },
      ],
    },
  ],

  bottomBanner: {
    title: "Need technical support for product selection?",
    description:
      "Share your media, pressure range, tubing size, application conditions or drawings with FOREACH for product matching and technical confirmation.",
    actions: [
      {
        label: "Contact Us",
        href: "/contact",
      },
    ],
  },
};
