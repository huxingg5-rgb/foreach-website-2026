import type { BrushlessWiringArticleCopy } from "./brushless-diaphragm-pump-2-wire-vs-5-wire.types";

export const brushlessWiringArticleEnCopy = {
  metadata: {
    title:
      "2-Wire vs 5-Wire Brushless Diaphragm Pumps: What Is the Difference and Which Should You Choose?",
    seoTitle: "2-Wire vs 5-Wire Brushless Diaphragm Pumps | FOREACH",
    seoDescription:
      "Learn the differences between 2-wire and 5-wire brushless diaphragm pump configurations, including VCC, GND, PWM, DIR and FG signals, when to use each option, and configuration considerations for FOREACH DPL30, DPL60, DPL30H and DPGL800 series.",
    coverAlt: "FOREACH DPL60 2-wire brushless motor",
  },
  kicker: "Brushless Diaphragm Pump · 2-Wire vs 5-Wire",
  deck:
    "When selecting a miniature diaphragm pump, two lead configurations may be offered for the same type of DC brushless motor: 2-wire and 5-wire. The main difference is not the pump's basic delivery principle, but how much control and operating-status information the equipment requires from the motor.",
  conclusion: {
    title: "1. The Answer in Brief",
    label: "In brief:",
    text:
      "A 2-wire brushless motor is primarily used for power supply and start/stop operation. Its simple wiring suits fixed-speed operation. In addition to power, a 5-wire brushless motor can add PWM speed control, direction control and speed feedback, making it more suitable when the host controller must participate in pump control. Choose 2-wire when stable fixed operation is all that is needed; choose 5-wire when speed control, feedback or more complex control is required.",
  },
  twoWire: {
    title: "2. What Is a 2-Wire Brushless Motor?",
    intro: "A 2-wire configuration normally retains only the basic power connections:",
    headers: ["Connection", "Primary function"],
    rows: [
      ["VCC", "Power supply positive"],
      ["GND", "Power supply negative / ground"],
    ],
    paragraphs: [
      "Basic drive control is integrated inside the motor. The motor runs when power is applied and stops when power is removed.",
      "The main advantages of a 2-wire configuration are therefore simple wiring, simple control and straightforward system integration.",
    ],
    figureAlt: "FOREACH DPL60 2-wire brushless motor",
    figureCaption:
      "Figure 1 | DPL60 2-wire brushless motor. The 2-wire configuration retains the basic power connections.",
    selectionTitle: "When should you choose 2-wire?",
    selectionIntro:
      "A 2-wire configuration is generally the first option to consider when the equipment meets the following conditions:",
    selectionItems: [
      "The pump operates at a fixed speed for long periods.",
      "Only start and stop control is required.",
      "Motor speed does not need to be read.",
      "External PWM speed control is not required.",
      "Host-controller interface resources are limited.",
      "The goal is to minimize harness and control-logic complexity.",
    ],
    closing:
      "For many liquid transfer, drainage and cleaning applications within a fixed flow range, 2-wire operation can meet the basic requirement when the overall instrument does not need dynamic speed control.",
  },
  fiveWire: {
    title: "3. What Is a 5-Wire Brushless Motor?",
    intro:
      "In addition to power supply positive and ground, a 5-wire configuration adds control and feedback connections.",
    exampleIntro: "A common configuration is shown below:",
    headers: ["Connection", "Primary function"],
    rows: [
      ["VCC", "Power supply positive"],
      ["GND", "Ground"],
      ["PWM", "Speed control signal, optional"],
      ["DIR", "Direction control signal, optional"],
      ["FG", "Speed feedback signal, optional"],
    ],
    paragraphs: [
      "Compared with 2-wire operation, the main advantage of 5-wire operation is that the host controller can further control motor operation and obtain speed feedback.",
      "For example, a PWM signal can adjust motor speed, while an FG signal can help determine whether the motor is running normally. Exact wire order and control logic may differ by model, so always follow the electrical specification for the selected product.",
    ],
    figureAlt: "FOREACH DPL60 5-wire brushless motor",
    figureCaption:
      "Figure 2 | DPL60 5-wire brushless motor. Control and feedback connections can be added in addition to power.",
    selectionTitle: "When should you choose 5-wire?",
    selectionIntro:
      "A 5-wire configuration is more suitable when the equipment has the following requirements:",
    selectionItems: [
      "Pump speed must be adjusted through PWM.",
      "Different operating stages require different speeds.",
      "Motor speed must be read.",
      "The system must determine whether the pump is operating normally.",
      "The pump must interact with the host controller.",
      "Automation control and operating monitoring requirements are higher.",
    ],
    closing:
      "In IVD instruments, analytical equipment and laboratory automation systems, for example, 5-wire operation is often more appropriate when the fluid path changes pump speed between process stages or when the host controller needs motor feedback.",
  },
  diagramSectionTitle: "4. Wiring Logic for 2-Wire and 5-Wire Configurations",
  diagram: {
    ariaLabel: "Control logic diagram for 2-wire and 5-wire brushless motors",
    twoWireTitle: "2-Wire",
    twoWireSubtitle: "Fixed speed · Simple start/stop",
    fiveWireTitle: "5-Wire",
    fiveWireSubtitle: "Power + control + feedback",
    motor: "Brushless Motor",
    integratedDriver: "Integrated driver",
    controlInterface: "Control interface",
    redPower: "Red · Power positive",
    blackGround: "Black · Ground",
    optional: "Optional",
    typicalUse: "Typical use",
    twoWireUses: [
      "Fixed-speed operation",
      "Power on/off start-stop",
      "No external speed control or feedback",
    ],
    fiveWireUses: [
      "PWM speed control",
      "DIR direction control",
      "FG speed feedback",
      "Host controller integration",
    ],
    footer: "2-wire / 5-wire describes wiring and control, not brushed / brushless motor type",
    caption:
      "Figure 3 | Control logic for 2-wire and 5-wire brushless motors. Wire colors and functions follow the specification: VCC red, GND black, PWM blue, DIR yellow and FG green. PWM, DIR and FG are optional control or feedback functions. Exact pin order, electrical parameters, input/output logic and final configuration are subject to the formal specification and project confirmation for the selected model.",
  },
  comparison: {
    title: "5. Core Differences Between 2-Wire and 5-Wire Brushless Motors",
    headers: ["Comparison", "2-wire brushless", "5-wire brushless"],
    rows: [
      ["Basic power", "Supported", "Supported"],
      ["Start/stop control", "Supported", "Supported"],
      ["PWM speed control", "External control normally not required", "Can be supported"],
      ["Speed feedback", "Normally unavailable", "FG feedback can be supported"],
      ["Direction control", "Normally no external control", "Can be supported"],
      ["Wiring complexity", "Low", "Higher"],
      ["Host-interface demand", "Low", "Higher"],
      ["Suitable use", "Fixed operation", "Speed control, feedback and automation"],
    ],
    conclusion:
      "A 2-wire or 5-wire configuration is therefore not a performance ranking; it reflects different system-control requirements.",
  },
  selection: {
    title: "6. When Should You Use 2-Wire or 5-Wire?",
    intro: "The choice can be made directly from the equipment's control requirements.",
    twoWireTitle: "Choose 2-wire",
    twoWireIntro: "If the required sequence is:",
    twoWireLogicTitle: "Typical 2-wire control logic",
    twoWireLogic: "Power on → complete liquid transfer or drainage → stop",
    twoWireClosing:
      "and pump speed does not change during operation and motor status does not need to be read, a 2-wire brushless configuration is normally the preferred choice.",
    fiveWireTitle: "Choose 5-wire",
    fiveWireIntro: "If the required sequence is:",
    fiveWireLogicTitle: "Typical 5-wire control logic",
    fiveWireLogic:
      "Host controller changes pump speed by process stage → obtains operating feedback → controls the pump more precisely",
    fiveWireClosing: "a 5-wire brushless configuration is more suitable.",
    decision:
      "The first selection question is not whether 2-wire or 5-wire is better. It is whether the equipment's host controller needs to participate in pump speed control and status monitoring.",
    fixedSpeedCaution:
      "If the equipment only requires fixed-speed operation, choosing 5-wire does not automatically improve performance. It instead adds harness, interface and software-control complexity.",
    futureControl:
      "Conversely, if later requirements include speed adjustment, operating monitoring or more precise fluid-path control, choosing 5-wire early in the design leaves more room for system control.",
    confusionTitle: "A commonly confused concept",
    confusionText:
      "Brushed / brushless describes the motor type; 2-wire / 5-wire describes the lead and control method. They are not the same concept. A 2-wire motor is not necessarily brushed, and a 5-wire motor is not what makes a motor brushless.",
  },
  products: {
    title: "Which FOREACH Miniature Diaphragm Pumps Can Use 2-Wire or 5-Wire Configurations?",
    intro:
      "Several FOREACH miniature diaphragm pump series can be configured with the appropriate lead arrangement according to the specific model and project-control requirements, including:",
    cards: [
      {
        label: "Miniature liquid diaphragm pump",
        model: "DPL30",
        note: "Confirm by model and project requirement",
        slug: "dpl30-liquid-diaphragm-pump",
      },
      {
        label: "Miniature liquid diaphragm pump",
        model: "DPL60",
        note: "Confirm by model and project requirement",
        slug: "dpl60-liquid-diaphragm-pump",
      },
      {
        label: "High-pressure miniature diaphragm pump",
        model: "DPL30H",
        note: "Confirm by model and project requirement",
        slug: "dpl30h-liquid-diaphragm-pump",
      },
      {
        label: "Gas-liquid mixing pump",
        model: "DPGL800",
        note: "Confirm by model and project requirement",
        slug: "dpgl800-gas-liquid-diaphragm-pump",
      },
    ],
    paragraphs: [
      "When selecting a model from these series, confirm the equipment's lead and control requirements together with flow, pressure, self-priming capability, voltage, motor type and wetted materials.",
      "If the instrument only needs simple start/stop operation, evaluate a 2-wire configuration first. If speed control, feedback or more complex automation is required, confirm a 5-wire configuration.",
      "Final configuration, exact wire order, electrical interface and control method are subject to the formal specification for the selected model and the project confirmation documents.",
    ],
  },
  faqTitle: "FAQ",
  faqItems: [
    {
      question:
        "1. What is the main difference between a 2-wire and 5-wire brushless diaphragm pump?",
      answer:
        "The main difference is the available control functionality. A 2-wire configuration primarily provides basic power and operation. In addition to power, a 5-wire configuration can provide PWM speed control, direction control and FG speed feedback.",
    },
    {
      question: "2. Is a 2-wire brushless motor actually a brushed motor?",
      answer:
        "No. Brushed / brushless describes the motor type, while 2-wire / 5-wire describes the lead and control method. A brushless motor can use different lead configurations according to the control design.",
    },
    {
      question: "3. Is a 5-wire brushless diaphragm pump always better than a 2-wire version?",
      answer:
        "No. If the equipment only needs fixed-speed operation, 2-wire is usually simpler and easier to integrate. The advantages of 5-wire become relevant when speed control, feedback or host controller integration is required.",
    },
    {
      question: "4. When is PWM speed control required?",
      answer:
        "PWM speed control may be considered when different operating stages need different pump speeds, such as rapid aspiration, low-speed drainage or switching between fluid-path cycle rates.",
    },
    {
      question: "5. What is FG feedback used for?",
      answer:
        "FG normally provides motor-operation or speed feedback. The host controller can use the signal to determine whether the motor is running or combine it with control software to monitor operating status.",
    },
    {
      question:
        "6. Can DPL30, DPL60, DPL30H and DPGL800 use 2-wire and 5-wire configurations?",
      answer:
        "The corresponding lead configuration can be selected according to the specific model and project-control requirements. For DPL30, DPL60, DPL30H and DPGL800 projects, the 2-wire or 5-wire requirement can be confirmed during selection. Final configuration and exact connection definitions are subject to the applicable product specification and project confirmation.",
    },
  ],
  cta: {
    title: "Need to confirm 2-wire or 5-wire?",
    description:
      "For a DPL30, DPL60, DPL30H or DPGL800 project, provide the supply voltage, target flow, working pressure, and whether PWM speed control, DIR control or FG feedback is required so the appropriate configuration can be confirmed.",
    contactLabel: "Contact an Engineer",
    productsLabel: "View Product Center",
  },
  sourceNote:
    "Note: The 2-wire and 5-wire diagrams in this article explain functional relationships and are not final wiring instructions. Colors, wire order, input/output parameters and control logic may vary by model. Always follow the formal specification or project confirmation document for the selected model.",
} satisfies BrushlessWiringArticleCopy;
