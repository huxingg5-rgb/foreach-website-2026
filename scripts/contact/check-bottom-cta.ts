import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { createHash } from "node:crypto";
import { getContactInquiryLocale } from "../../lib/contact-inquiry-target";
import { getContactInquiryData } from "../../data/contact-cooperation/inquiry-modal";
import { inquiryModalCopy } from "../../data/contact-cooperation/inquiry-modal.copy";
import { getFaqPageData } from "../../data/resources/faq/faq-page";
import { faqLocales } from "../../data/resources/faq/faq.ui";

for (const locale of faqLocales) {
  const prefix = locale === "zh-CN" ? "" : `/${locale}`;
  for (const suffix of ["", "/", "/#form", "?source=cta#form"]) {
    assert.equal(getContactInquiryLocale(`${prefix}/contact${suffix}`), locale);
    assert.equal(getContactInquiryLocale(`https://www.foreachtek.com${prefix}/contact${suffix}`), locale);
  }
  assert.equal(getContactInquiryLocale({ pathname: `${prefix}/contact/`, hash: "#form" }), locale);
  assert.deepEqual(getContactInquiryData(locale), getFaqPageData(locale).contactData);
  assert(Object.values(inquiryModalCopy[locale]).every(value => value.trim().length > 0));
  if (locale !== "zh-CN") assert(!/\p{Script=Han}/u.test(JSON.stringify(inquiryModalCopy[locale])));
}
for (const href of ["#form", "#contact-info", "/contact/#contact-info", "/en/contact/#addresses", "/products/", "/en/products/", "/contact/distributors/", "mailto:sales@foreachtek.com", "https://example.com/contact/", "//example.com/en/contact/", "javascript:void(0)", "/de/contact/"]) {
  assert.equal(getContactInquiryLocale(href), null, `Must preserve ordinary navigation: ${href}`);
}
assert.equal(getContactInquiryLocale({ pathname: "/en/contact/", hostname: "example.com" }), null);
assert.equal(getContactInquiryLocale({ pathname: "/en/contact/", protocol: "ftp:" }), null);

function tsxFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? tsxFiles(path) : path.endsWith(".tsx") ? [path] : [];
  });
}
const consumers = tsxFiles("components").filter(path => /<BottomCtaButton\b|<ResourceSupportCta\b/.test(readFileSync(path, "utf8")));
for (const group of ["products", "applications", "resources", "about"]) {
  assert(consumers.some(path => relative("components", path).startsWith(group)), `${group}: shared CTA coverage`);
}

// Optional pre-change snapshot proves the six-locale collection form is untouched.
if (process.argv[2]) {
  const snapshot = JSON.parse(readFileSync(process.argv[2], "utf8"));
  for (const locale of faqLocales) assert.deepEqual(getContactInquiryData(locale), snapshot.formData[locale], `${locale}: original form contract`);
  for (const [path, hash] of Object.entries(snapshot.files)) {
    assert.equal(createHash("sha256").update(readFileSync(path)).digest("hex"), hash, `${path}: protected form file`);
  }
  console.log("Original six-locale form data, form logic, PDF generation and form styles are unchanged.");
}
console.log(`Passed: six-locale contact targets, normal-link exclusions and ${consumers.length} shared CTA consumers.`);
