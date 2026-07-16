import type {
  InstallationGuideLocale,
  InstallationGuidePageData,
} from "./installation-guide.types";

const installationGuideEnglishData: Omit<InstallationGuidePageData, "locale"> = {
  hero: {
    kicker: "INSTALLATION GUIDE",
    title: "Product Installation and Operating Guides",
    description:
      "Find installation steps, setup instructions, calibration methods and troubleshooting guidance for FOREACH microfluidic products.",
  },
  search: {
    placeholder: "Enter a product name or model",
    buttonText: "Search",
    recentLabel: "Recent searches",
    recentKeywords: [
      "Plunger Pump",
      "Q20",
      "Solenoid Valve",
      "High-Pressure Valve",
      "Pressure Sensor",
    ],
  },
  sidebar: {
    title: "Product Series",
    tree: [
      { id: "all", type: "all", name: "All Guides", children: [] },
      {
        id: "fittings",
        type: "category",
        name: "Fittings and Tubing Connections",
        children: [],
      },
      {
        id: "pumps",
        type: "category",
        name: "Pumps",
        children: [
          { id: "plunger-pump", name: "Plunger Pumps" },
          { id: "diaphragm-pump", name: "Diaphragm Pumps" },
          { id: "valveless-pump", name: "Valveless Pumps" },
          { id: "syringe-pump", name: "Syringe Pumps" },
          { id: "high-pressure-pump", name: "High-Pressure Pumps" },
        ],
      },
      {
        id: "valves",
        type: "category",
        name: "Valves",
        children: [
          { id: "rotary-valve", name: "Rotary Valves" },
          { id: "solenoid-valve", name: "Solenoid Valves" },
          { id: "high-pressure-valve", name: "High-Pressure Valves" },
          { id: "pinch-valve", name: "Pinch Valves" },
        ],
      },
      { id: "sensors", type: "category", name: "Sensors", children: [] },
      {
        id: "quality-control",
        type: "category",
        name: "Quality Control",
        children: [],
      },
      { id: "needles", type: "category", name: "Probes and Needles", children: [] },
    ],
  },
  support: {
    title: "Cannot find the guide you need?",
    description:
      "Send us the product model, application details or drawings if you need help with installation, parameter setup or calibration. The FOREACH technical team will assist you.",
    buttonText: "Contact Technical Support",
    href: "/contact",
  },
  guides: [
    {
      id: "hard-tube-fitting-guide",
      title: "Rigid-Tubing Fitting Installation Guide",
      category: "fittings",
      series: "fittings",
      tags: ["Fittings", "Tubing", "Sealing"],
      description:
        "Instructions for inserting rigid tubing, tightening the fitting and checking the seal.",
      keywords: ["rigid tubing", "fitting", "Q20", "Q40", "Q60", "tubing", "seal"],
      videoPlatform: "youtube",
      steps: [
        {
          title: "Prepare the fitting and tubing",
          description:
            "Confirm that the tubing OD matches the fitting and that the cut end is square and clean.",
        },
        {
          title: "Insert the tubing",
          description:
            "Insert the tubing axially into the fitting without angling or forcing it.",
        },
        {
          title: "Tighten and inspect",
          description:
            "After tightening, check that the tubing is secure before running a fluid test.",
        },
      ],
    },
    {
      id: "plunger-pump-install-guide",
      title: "Plunger Pump Installation and Tubing Connections",
      category: "pumps",
      series: "plunger-pump",
      tags: ["Motor", "Wiring", "Commissioning"],
      description:
        "Guidance for mounting a plunger pump, connecting its inlet and outlet, routing tubing and performing an initial operating check.",
      keywords: ["plunger pump", "motor", "wiring", "installation", "commissioning", "tubing"],
      videoPlatform: "youtube",
      steps: [
        {
          title: "Confirm the mounting orientation",
          description:
            "Use the instrument layout to confirm the pump orientation and inlet and outlet positions.",
        },
        {
          title: "Connect the tubing",
          description:
            "Connect the inlet and outlet tubing and confirm that the fitting specifications match.",
        },
        {
          title: "Run an initial check",
          description:
            "Operate at low speed and check for bubbles, leakage or unusual noise.",
        },
      ],
    },
    {
      id: "diaphragm-pump-guide",
      title: "Diaphragm Pump Installation and Tubing Connections",
      category: "pumps",
      series: "diaphragm-pump",
      tags: ["Diaphragm Pump", "Tubing", "Mounting"],
      description:
        "Guidance for pump orientation, inlet and outlet connections, mounting and operating checks.",
      keywords: ["diaphragm pump", "DPL", "installation", "tubing", "connection"],
      videoPlatform: "youtube",
      steps: [
        {
          title: "Confirm the mounting orientation",
          description:
            "Use the pump markings to identify the inlet, outlet and mounting orientation.",
        },
        {
          title: "Connect the tubing",
          description: "Connect the inlet and outlet tubing and verify that the fittings are secure.",
        },
        {
          title: "Run an initial check",
          description:
            "Operate the pump briefly and observe suction, discharge and vibration.",
        },
      ],
    },
    {
      id: "solenoid-valve-guide",
      title: "Solenoid Valve Tubing Connection Guide",
      category: "valves",
      series: "solenoid-valve",
      tags: ["Valve Body", "Wiring", "Function Test"],
      description:
        "Instructions for identifying valve ports, connecting tubing and performing an on/off function test.",
      keywords: ["solenoid valve", "6010", "wiring", "valve body", "function test"],
      videoPlatform: "youtube",
      steps: [
        {
          title: "Identify the ports",
          description: "Confirm the inlet, outlet and drain port orientation.",
        },
        {
          title: "Connect the tubing",
          description: "Connect the tubing in the specified flow direction.",
        },
        {
          title: "Test valve operation",
          description: "Power the valve and perform an on/off test to confirm normal operation.",
        },
      ],
    },
    {
      id: "pressure-sensor-guide",
      title: "Pressure Sensor Installation Guide",
      category: "sensors",
      series: "sensors",
      tags: ["Signal", "Wiring", "Measurement"],
      description:
        "Instructions for sensor orientation, fluidic and electrical connections, and the initial reading check.",
      keywords: ["pressure sensor", "signal", "wiring", "measurement"],
      videoPlatform: "youtube",
      steps: [
        {
          title: "Confirm the installation position",
          description: "Select the sensor position according to the fluid-path direction.",
        },
        {
          title: "Connect the interfaces",
          description: "Connect the fluidic interface and signal cable.",
        },
        {
          title: "Check the signal",
          description: "Power the sensor and confirm that the initial reading is stable.",
        },
      ],
    },
  ],
};

export function getInstallationGuideIntlData(
  locale: InstallationGuideLocale,
): InstallationGuidePageData {
  const prefix = `/${locale}`;

  return {
    ...installationGuideEnglishData,
    locale,
    support: {
      ...installationGuideEnglishData.support,
      href: `${prefix}/contact`,
    },
  };
}
