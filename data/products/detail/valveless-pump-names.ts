// Small shared labels for navigation and filters; do not pull long application copy into the site header.
const names = {
  en: { categoryName: "Valveless Metering Pump", singleName: "RPL Single-Head Valveless Metering Pump", dualName: "DRPL Dual-Head Valveless Metering Pump" },
  es: { categoryName: "Bomba dosificadora sin válvulas", singleName: "RPL: bomba dosificadora sin válvulas de un cabezal", dualName: "DRPL: bomba dosificadora sin válvulas de doble cabezal" },
  fr: { categoryName: "Pompe doseuse sans valve", singleName: "RPL : pompe doseuse sans valve à une tête", dualName: "DRPL : pompe doseuse sans valve à double tête" },
  ko: { categoryName: "무밸브 정량 펌프", singleName: "RPL 싱글 헤드 무밸브 정량 펌프", dualName: "DRPL 듀얼 헤드 무밸브 정량 펌프" },
  ru: { categoryName: "Бесклапанный дозирующий насос", singleName: "RPL: одноголовочный бесклапанный дозирующий насос", dualName: "DRPL: двухголовочный бесклапанный дозирующий насос" },
};
export function getValvelessPumpNames(locale: string) {
  return names[locale as keyof typeof names];
}
