import assert from "node:assert/strict";
import { getFaqPageData, getFaqMetadata } from "../../data/resources/faq/faq-page";
import { faqLocales, faqPath } from "../../data/resources/faq/faq.ui";
import { matchesFaq, normalizeFaqText } from "../../data/resources/faq/faq-search";
import { getLanguageHref } from "../../lib/i18n/language-switch";
import { getVisibleNavigationItems } from "../../data/navigation";

const chinese = getFaqPageData("zh-CN");
assert.equal(chinese.items.length, 51);
for (const locale of faqLocales) {
  const data = getFaqPageData(locale);
  assert.deepEqual(data.items.map(item => item.id), chinese.items.map(item => item.id), `${locale}: question coverage/order`);
  assert.equal(new Set(data.items.map(item => item.id)).size, 51);
  const categories = new Set(data.categories.flatMap(group => [group.key, ...group.children.map(child => child.key)]));
  for (const item of data.items) {
    assert(categories.has(item.category) && categories.has(item.subcategory), `${locale}/${item.id}: taxonomy`);
    assert(item.question.trim() && item.answer.every(value => value.trim()), `${locale}/${item.id}: empty translation`);
    assert(!("evidence" in item), "Internal evidence must remain server-side");
    if (locale !== "zh-CN") assert(!/\p{Script=Han}/u.test(JSON.stringify(item)), `${locale}/${item.id}: untranslated Chinese`);
    for (const link of item.links) {
      assert(link.href.startsWith(locale === "zh-CN" ? "/" : `/${locale}/`), `${locale}/${item.id}: link locale`);
      assert(!link.href.includes("undefined"));
    }
  }
  if (locale !== "zh-CN") {
    assert(!/\p{Script=Han}/u.test(JSON.stringify(data.ui)), `${locale}: UI fallback`);
    assert(!/\p{Script=Han}/u.test(JSON.stringify(data.contactData.form)), `${locale}: form fallback`);
  }
  assert(data.contactData.form.requestTypes.includes(data.requestTypes.technical));
  assert(data.contactData.form.requestTypes.includes(data.requestTypes.support));
  const options = data.contactData.form.productGroups.flatMap(group => group.options);
  assert(Object.values(data.productTypeByCategory).every(value => options.includes(value)));
  for (const source of faqLocales) {
    assert.equal(getLanguageHref(faqPath(source), locale, "?category=syringe&q=HLD#syringe-capacity"), `${faqPath(locale)}?category=syringe&q=HLD#syringe-capacity`);
  }
  const menu = getVisibleNavigationItems(locale).find(item => item.key === "resources")!.mobileChildren!.find(item => item.key === "mobile-resource-faq-library")!;
  assert.equal(menu.href?.[locale], faqPath(locale));
  const metadata = getFaqMetadata(locale);
  assert.equal(metadata.alternates?.canonical, faqPath(locale));
  assert.equal(Object.keys(metadata.alternates!.languages!).length, 7);
  const abd = data.items.find(item => item.id === "abd-small-bubbles")!;
  assert.match(abd.answer.join(" "), />\s*0[.,]8\s*mm/);
  const pdm = data.items.find(item => item.id === "pdm5-interface")!;
  assert.match(pdm.answer.join(" "), /I2C/);
  assert.match(pdm.answer.join(" "), /0x6D/);
  assert(data.items.some(item => matchesFaq(item, "DPL30", data.categories)));
  assert(data.items.some(item => matchesFaq(item, "CL-1S-16", data.categories)));
  console.log(`${locale}: 51 questions; taxonomy, translated form, links, menu, language switch and metadata passed`);
}
assert.equal(normalizeFaqText("válvula"), normalizeFaqText("valvula"));
assert.equal(normalizeFaqText("피스톤 펌프"), "피스톤 펌프");
const es = getFaqPageData("es");
assert(es.items.some(item => matchesFaq(item, "piston", es.categories)));
console.log("FAQ locale checks passed.");
