import type { InstrumentInquiryChoice } from "../configurator/instrument-inquiry";

export const syringePumpInquiryFamilies = ["HMD3", "HMD6", "HLD3", "HLD6"] as const;
export type SyringePumpInquiryFamily = typeof syringePumpInquiryFamilies[number];

export function isSyringePumpInquiryFamily(value: unknown): value is SyringePumpInquiryFamily {
  return syringePumpInquiryFamilies.some(family => family === value);
}

// PS-130B-2507-00001/00002 001, p. 9, and PS-130B-2507-00003/00004 001, p. 10.
const orderCodes: Record<SyringePumpInquiryFamily, Record<string, string>> = {
  HLD3: { NYA: "919082", D3A: "919081", D6A: "919086", D9A: "919084" },
  HLD6: { NYB: "919083", D6A: "919087", D9A: "919085" },
  HMD3: { "1PKFSU28": "919037", "1PKFDU28": "919038", "1EIFTU28": "919042", "1EIFWU28": "919047" },
  HMD6: {
    "1PKFSU28": "919005", "1PKFDU28": "919006",
    "2PKFSU28": "919009", "2PKFDU28": "919010",
    "3PKFSU28": "919013", "3PKFDU28": "919014",
    "4PKFSU28": "919017", "4PKFDU28": "919018",
    "6PKFSU28": "919021", "6PKFDU28": "919024",
    "8PKFSU28": "919023", "8PKFDU28": "919031",
    "4EIFTU28": "919048",
  },
};

export const syringePumpCodeOptions = {
  hmd6Channels: ["1", "2", "3", "4", "6", "8"],
  seats: [["PK", "PEEK"], ["AC", "POM"], ["EI", "PEI"], ["MA", "PMMA"]],
  diaphragms: [["F", "FKM"], ["K", "FFKM"], ["E", "EPDM"]],
  threads: [["U28", "1/4-28 UNF"], ["M6", "M6 × 1"]],
  solenoidValves: [["S", "solenoid2"], ["D", "solenoid3"], ["T", "solenoidDispensing3"], ["W", "solenoidNonDispensing2"]],
  rotaryValves: [["D3A", "rotary3"], ["D6A", "rotary6"], ["D9A", "rotary9"]],
  nonDistributing: {
    HLD3: { selectionCode: "N3A", orderCode: "NYA" },
    HLD6: { selectionCode: "NYA", orderCode: "NYB" },
  },
} as const;

const isRotary = (family: SyringePumpInquiryFamily): family is "HLD3" | "HLD6" => family === "HLD3" || family === "HLD6";

export function resolveSyringePumpInquiry(family: SyringePumpInquiryFamily, choice: InstrumentInquiryChoice) {
  const rotary = isRotary(family);
  const suffix = rotary
    ? choice.valve
    : (family === "HMD3" || choice.drive === "with-drive")
      ? `${family === "HMD3" ? "1" : choice.channels}${choice.seat}${choice.diaphragm}${choice.valve}${choice.thread}`
      : "";
  const productCode = orderCodes[family][suffix];
  // The selection charts describe possible requests. Only exact entries in the pump order tables have SKUs.
  return typeof productCode === "string"
    ? { model: `${family}-${rotary ? "SRV1-" : ""}${suffix}`, productCode }
    : { model: family, productCode: "" };
}
