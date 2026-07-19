import type { LifeScienceApplicationPageData } from "./life-science-application.types";
import { lifeScienceEsExactText } from "./life-science-application.es";
import { lifeScienceFrExactText } from "./life-science-application.fr";
import { lifeScienceRuExactText } from "./life-science-application.ru";
import { lifeScienceApplicationZhData } from "./life-science-application.zh";
import { translateFrenchApplicationData } from "../application-french";
import { translateRussianApplicationData } from "../application-russian";
import { translateSpanishApplicationData } from "../application-spanish";

const lifeScienceApplicationEsData =
  translateSpanishApplicationData<LifeScienceApplicationPageData>(
    lifeScienceApplicationZhData,
    lifeScienceEsExactText,
  );

const lifeScienceApplicationFrData =
  translateFrenchApplicationData<LifeScienceApplicationPageData>(
    lifeScienceApplicationZhData,
    lifeScienceFrExactText,
  );

const lifeScienceApplicationRuData =
  translateRussianApplicationData<LifeScienceApplicationPageData>(
    lifeScienceApplicationZhData,
    lifeScienceRuExactText,
  );

export function getLifeScienceApplicationIntlData(
  locale: string,
): LifeScienceApplicationPageData {
  if (locale === "es") {
    return lifeScienceApplicationEsData;
  }

  if (locale === "fr") {
    return lifeScienceApplicationFrData;
  }

  if (locale === "ru") {
    return lifeScienceApplicationRuData;
  }

  return lifeScienceApplicationZhData;
}
