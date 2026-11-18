import { instrumentInquiryText as text } from "./instrument-inquiry.intl";
import type { InstrumentInquiryChoice, InstrumentInquiryField } from "./instrument-inquiry";
import { syringePumpCodeOptions, type SyringePumpInquiryFamily } from "../detail/syringe-pump-ordering";
export { isSyringePumpInquiryFamily, resolveSyringePumpInquiry, type SyringePumpInquiryFamily } from "../detail/syringe-pump-ordering";
const baseCapacities = [50, 100, 250, 500, 1000, 2500, 5000];
const communicationInterfaces = ["RS-232", "RS-485", "CAN"];

const isRotary = (family: SyringePumpInquiryFamily): family is "HLD3" | "HLD6" => family === "HLD3" || family === "HLD6";

export function getSyringePumpInquiryFields(
  family: SyringePumpInquiryFamily,
  locale: string,
  choice: InstrumentInquiryChoice,
): InstrumentInquiryField[] {
  const t = (key: Parameters<typeof text>[0]) => text(key, locale);
  const field = (
    key: string,
    heading: Parameters<typeof text>[0],
    options: InstrumentInquiryField["options"],
  ): InstrumentInquiryField => ({ key, label: t(heading), options: [...options, ["unsure", t("unsure")]] });

  const longStroke = family.endsWith("6");
  // HMD6 p. 9: 10 mL and 25 mL syringes are supported on single-channel units only.
  const allowsLargeSyringe = family === "HLD6" || (family === "HMD6" && choice.channels === "1");
  const capacities = [...(longStroke ? [25] : []), ...baseCapacities, ...(allowsLargeSyringe ? [10000, 25000] : [])];
  const capacity = field("capacity", "syringeCapacity", capacities.map(value => [
    String(value), value < 1000 ? `${value} μL` : `${value / 1000} mL`,
  ]));
  const communication = field("communication", "communication", communicationInterfaces.map(value => [value, value]));
  const codes = syringePumpCodeOptions;

  if (isRotary(family)) {
    // The non-distributing valve code in table 2 differs from the pump order code in table 3.
    const { selectionCode, orderCode } = codes.nonDistributing[family];
    return [
      capacity,
      field("valve", "syringeValve", [
        [selectionCode, `${t("rotaryNonDistributing")} · SRV1-${selectionCode}`],
        ...codes.rotaryValves.map(([code, key]) => [code, `${t(key)} · SRV1-${code}`] as const),
        [orderCode, `${family}-SRV1-${orderCode} · ${t("standardPumpOrder")}`],
      ]),
      communication,
    ];
  }

  return [
    ...(family === "HMD6" ? [field("channels", "syringeChannels", codes.hmd6Channels.map(value => [value, value]))] : []),
    capacity,
    field("valve", "syringeValve", codes.solenoidValves.map(([code, key]) => [code, `${t(key)} · ${code}`])),
    field("seat", "valveSeat", codes.seats),
    field("diaphragm", "valveDiaphragm", codes.diaphragms),
    field("thread", "valveThread", codes.threads),
    ...(family === "HMD6" ? [field("drive", "syringeDrive", [
      ["with-drive", t("withDrive")],
      ["without-drive", `${t("withoutDrive")} · N`],
    ])] : []),
    communication,
  ];
}

export function syringePumpInquiryFixedRows(
  family: SyringePumpInquiryFamily,
  choice: InstrumentInquiryChoice,
  locale: string,
): Array<[string, string]> {
  const rows: Array<[string, string]> = [[text("syringeStroke", locale), family.endsWith("6") ? "60 mm" : "30 mm"]];
  if (family === "HMD3") rows.push([text("syringeChannels", locale), "1"], [text("syringeDrive", locale), text("withDrive", locale)]);
  if (isRotary(family)) rows.push([text("port", locale), "1/4-28 UNF-2B"]);
  if (family !== "HMD6" || choice.drive === "with-drive") rows.push([text("voltage", locale), "24 V DC ±10%"]);
  return rows;
}
