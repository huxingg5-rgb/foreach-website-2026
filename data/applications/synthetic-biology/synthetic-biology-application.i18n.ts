import type { SyntheticBiologyApplicationPageData } from "./synthetic-biology-application.types";
import { syntheticBiologyEsExactText } from "./synthetic-biology-application.es";
import { syntheticBiologyFrExactText } from "./synthetic-biology-application.fr";
import { syntheticBiologyRuExactText } from "./synthetic-biology-application.ru";
import { syntheticBiologyApplicationZhData } from "./synthetic-biology-application.zh";
import { translateFrenchApplicationData } from "../application-french";
import { translateRussianApplicationData } from "../application-russian";
import { translateSpanishApplicationData } from "../application-spanish";

const syntheticBiologyApplicationEsData =
  translateSpanishApplicationData<SyntheticBiologyApplicationPageData>(
    syntheticBiologyApplicationZhData,
    syntheticBiologyEsExactText,
  );

const syntheticBiologyApplicationFrData =
  translateFrenchApplicationData<SyntheticBiologyApplicationPageData>(
    syntheticBiologyApplicationZhData,
    syntheticBiologyFrExactText,
  );

const syntheticBiologyApplicationRuData =
  translateRussianApplicationData<SyntheticBiologyApplicationPageData>(
    syntheticBiologyApplicationZhData,
    syntheticBiologyRuExactText,
  );

export function getSyntheticBiologyApplicationIntlData(
  locale: string,
): SyntheticBiologyApplicationPageData {
  if (locale === "es") {
    return syntheticBiologyApplicationEsData;
  }

  if (locale === "fr") {
    return syntheticBiologyApplicationFrData;
  }

  if (locale === "ru") {
    return syntheticBiologyApplicationRuData;
  }

  return syntheticBiologyApplicationZhData;
}
