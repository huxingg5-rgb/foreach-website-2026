import type { LabAutomationApplicationPageData } from "./lab-automation-application.types";
import { labAutomationEsExactText } from "./lab-automation-application.es";
import { labAutomationFrExactText } from "./lab-automation-application.fr";
import { labAutomationRuExactText } from "./lab-automation-application.ru";
import { labAutomationApplicationZhData } from "./lab-automation-application.zh";
import { translateFrenchApplicationData } from "../application-french";
import { translateRussianApplicationData } from "../application-russian";
import { translateSpanishApplicationData } from "../application-spanish";
import { translateKoreanApplicationData } from "../application-korean.generated";

const labAutomationApplicationEsData =
  translateSpanishApplicationData<LabAutomationApplicationPageData>(
    labAutomationApplicationZhData,
    labAutomationEsExactText,
  );

const labAutomationApplicationFrData =
  translateFrenchApplicationData<LabAutomationApplicationPageData>(
    labAutomationApplicationZhData,
    labAutomationFrExactText,
  );

const labAutomationApplicationRuData =
  translateRussianApplicationData<LabAutomationApplicationPageData>(
    labAutomationApplicationZhData,
    labAutomationRuExactText,
  );

const labAutomationApplicationKoData =
  translateKoreanApplicationData<LabAutomationApplicationPageData>(
    labAutomationApplicationZhData,
  );

export function getLabAutomationApplicationIntlData(
  locale: string,
): LabAutomationApplicationPageData {
  if (locale === "es") {
    return labAutomationApplicationEsData;
  }

  if (locale === "fr") {
    return labAutomationApplicationFrData;
  }

  if (locale === "ko") {
    return labAutomationApplicationKoData;
  }

  if (locale === "ru") {
    return labAutomationApplicationRuData;
  }

  return labAutomationApplicationZhData;
}
