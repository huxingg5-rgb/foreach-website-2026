import { syringePumpIntroductions } from "./syringe-pump-introductions.locales";
import { syringePumpFaqLocales } from "./syringe-pump-faq.locales";
import { syringePumpApplicationsLocales } from "./syringe-pump-applications.locales";
import { syringePumpCardsLocales } from "../selection/syringe-pump-cards.locales";
import { getSyringeSeriesCopy } from "../selection/syringe-pump-series";
const models: Record<string, { faq: number[]; apps: number[]; series: number }> = {
  "hmd3-30mm-solenoid-syringe-pump": { faq: [0,3,4,5,9], apps: [0,1,2], series: 0 },
  "hmd6-60mm-solenoid-syringe-pump": { faq: [1,8,0,5,9], apps: [3,1,2], series: 0 },
  "hld3-30mm-rotary-valve-syringe-pump": { faq: [2,7,6,0,5], apps: [4,1,5], series: 1 },
  "hld6-60mm-rotary-valve-syringe-pump": { faq: [7,2,0,6,9,5], apps: [4,1,5], series: 1 },
};
export function applySyringePumpDetailCopy<T extends Record<string, any>>(data: T, locale: string): T {
  const config = models[data.slug];
  const lang = locale === "zh-CN" ? "zh" : locale;
  const bank = syringePumpFaqLocales[lang];
  if (!config || !bank) return data;
  const faqs = config.faq.map(i => { const [question, answer] = bank[i]; return { question, answer, q: question, a: answer, title: question, content: answer }; });
  const faqData = { faqs, faq: faqs, faqItems: faqs, faqList: faqs, detailFaqs: faqs };
  const syringeIntroductionParagraphs = syringePumpIntroductions[lang]?.[data.slug];
  const description = syringeIntroductionParagraphs?.join("\n\n") || data.description;
  const introData = { description, summary: description, overview: description, syringeIntroductionParagraphs };
  if (lang === "zh") return { ...data, ...faqData, ...introData };
  const app = syringePumpApplicationsLocales[lang];
  const card = syringePumpCardsLocales[lang]?.[data.slug];
  if (!app || !card) return { ...data, ...faqData };
  const series = getSyringeSeriesCopy(lang, config.series);

  const applicationDetails = { tabLabel: app.tab, title: app.title, intro: [card.heading], items: config.apps.map(i => ({ title: app.tags[i], paragraphs: [app.apps[i]] })), selectionNote: { title: app.selection, paragraphs: [bank[config.series === 1 ? 7 : 0][1], series.paragraphs[1]] } };
  return { ...data, ...faqData, ...introData, commonApplications: config.apps.map(i => app.tags[i]), applicationDetails };
}
