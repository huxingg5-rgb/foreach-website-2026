import type { AnalyticalInstrumentsApplicationPageData } from "./analytical-instruments-application.types";
import { analyticalInstrumentsEsExactText } from "./analytical-instruments-application.es";
import { analyticalInstrumentsFrExactText } from "./analytical-instruments-application.fr";
import { analyticalInstrumentsRuExactText } from "./analytical-instruments-application.ru";
import { analyticalInstrumentsApplicationZhData } from "./analytical-instruments-application.zh";
import { translateFrenchApplicationData } from "../application-french";
import { translateRussianApplicationData } from "../application-russian";
import { translateSpanishApplicationData } from "../application-spanish";
import { translateKoreanApplicationData } from "../application-korean.generated";

const analyticalInstrumentsApplicationEsData =
  translateSpanishApplicationData<AnalyticalInstrumentsApplicationPageData>(
    analyticalInstrumentsApplicationZhData,
    analyticalInstrumentsEsExactText,
  );

const analyticalInstrumentsApplicationFrData =
  translateFrenchApplicationData<AnalyticalInstrumentsApplicationPageData>(
    analyticalInstrumentsApplicationZhData,
    analyticalInstrumentsFrExactText,
  );

const analyticalInstrumentsApplicationRuData =
  translateRussianApplicationData<AnalyticalInstrumentsApplicationPageData>(
    analyticalInstrumentsApplicationZhData,
    analyticalInstrumentsRuExactText,
  );

const analyticalInstrumentsApplicationKoData =
  translateKoreanApplicationData<AnalyticalInstrumentsApplicationPageData>(
    analyticalInstrumentsApplicationZhData,
  );

export function getAnalyticalInstrumentsApplicationIntlData(
  locale: string,
): AnalyticalInstrumentsApplicationPageData {
  if (locale === "es") {
    return analyticalInstrumentsApplicationEsData;
  }

  if (locale === "fr") {
    return analyticalInstrumentsApplicationFrData;
  }

  if (locale === "ko") {
    return analyticalInstrumentsApplicationKoData;
  }

  if (locale === "ru") {
    return analyticalInstrumentsApplicationRuData;
  }

  return analyticalInstrumentsApplicationZhData;
}
