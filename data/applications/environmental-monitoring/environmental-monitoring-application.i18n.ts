import type { EnvironmentalMonitoringApplicationPageData } from "./environmental-monitoring-application.types";
import { environmentalMonitoringEsExactText } from "./environmental-monitoring-application.es";
import { environmentalMonitoringFrExactText } from "./environmental-monitoring-application.fr";
import { environmentalMonitoringRuExactText } from "./environmental-monitoring-application.ru";
import { environmentalMonitoringApplicationZhData } from "./environmental-monitoring-application.zh";
import { translateFrenchApplicationData } from "../application-french";
import { translateRussianApplicationData } from "../application-russian";
import { translateSpanishApplicationData } from "../application-spanish";

const environmentalMonitoringApplicationEsData =
  translateSpanishApplicationData<EnvironmentalMonitoringApplicationPageData>(
    environmentalMonitoringApplicationZhData,
    environmentalMonitoringEsExactText,
  );

const environmentalMonitoringApplicationFrData =
  translateFrenchApplicationData<EnvironmentalMonitoringApplicationPageData>(
    environmentalMonitoringApplicationZhData,
    environmentalMonitoringFrExactText,
  );

const environmentalMonitoringApplicationRuData =
  translateRussianApplicationData<EnvironmentalMonitoringApplicationPageData>(
    environmentalMonitoringApplicationZhData,
    environmentalMonitoringRuExactText,
  );

export function getEnvironmentalMonitoringApplicationIntlData(
  locale: string,
): EnvironmentalMonitoringApplicationPageData {
  if (locale === "es") {
    return environmentalMonitoringApplicationEsData;
  }

  if (locale === "fr") {
    return environmentalMonitoringApplicationFrData;
  }

  if (locale === "ru") {
    return environmentalMonitoringApplicationRuData;
  }

  return environmentalMonitoringApplicationZhData;
}
