/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");

const sourcePath = process.argv[2];
const outputPath = path.resolve(
  __dirname,
  "../../data/products/detail/diaphragm-pump-copy.generated.json",
);

if (!sourcePath) {
  throw new Error(
    "Usage: node scripts/products/generate-diaphragm-pump-copy.js <copy-markdown-path>",
  );
}

const source = fs.readFileSync(path.resolve(sourcePath), "utf8");
const localeHeadings = [
  ["zh", /^# 中文 zh-CN\s*$/m],
  ["en", /^# English en\s*$/m],
  ["es", /^# Español es\s*$/m],
  ["fr", /^# Français fr\s*$/m],
  ["ko", /^# 한국어 ko\s*$/m],
  ["ru", /^# Русский ru\s*$/m],
];

function parseFaqs(productBlock, locale, key) {
  const faqHeadingIndex = productBlock.indexOf("### FAQ");

  if (faqHeadingIndex < 0) {
    throw new Error(`Missing FAQ section for ${locale}/${key}`);
  }

  const lines = productBlock.slice(faqHeadingIndex).split(/\r?\n/);
  const faqs = [];

  for (let index = 0; index < lines.length; index += 1) {
    const questionMatch = lines[index].match(/^\d+\.\s+\*\*(.+?)\*\*\s*$/);

    if (!questionMatch) continue;

    const answerLines = [];

    for (index += 1; index < lines.length; index += 1) {
      if (/^\d+\.\s+\*\*/.test(lines[index]) || /^---\s*$/.test(lines[index])) {
        index -= 1;
        break;
      }

      const answerLine = lines[index].trim();
      if (answerLine) answerLines.push(answerLine);
    }

    faqs.push({
      question: questionMatch[1],
      answer: answerLines.join(" "),
    });
  }

  if (faqs.length !== 5) {
    throw new Error(
      `Expected 5 FAQs for ${locale}/${key}, received ${faqs.length}`,
    );
  }

  return faqs;
}

function parseLocaleSection(locale, section) {
  const productMatches = Array.from(
    section.matchAll(/^## \d+\. `([^`]+)`\s*$/gm),
  );
  const products = {};

  for (let index = 0; index < productMatches.length; index += 1) {
    const current = productMatches[index];
    const next = productMatches[index + 1];
    const key = current[1];
    const productBlock = section.slice(
      current.index,
      next ? next.index : section.length,
    );
    const textBlocks = Array.from(
      productBlock.matchAll(/```text\r?\n([\s\S]*?)\r?\n```/g),
      (match) => match[1].trim(),
    );

    if (textBlocks.length !== 5) {
      throw new Error(
        `Expected 5 text blocks for ${locale}/${key}, received ${textBlocks.length}`,
      );
    }

    products[key] = {
      title: textBlocks[0],
      cardParameters: textBlocks[1].split(/\r?\n/),
      intro: textBlocks[2],
      applications: textBlocks[3],
      breadcrumbs: textBlocks[4].split(" / "),
      faqs: parseFaqs(productBlock, locale, key),
    };
  }

  if (Object.keys(products).length !== 7) {
    throw new Error(
      `Expected 7 products for ${locale}, received ${Object.keys(products).length}`,
    );
  }

  return products;
}

const output = {};

for (let index = 0; index < localeHeadings.length; index += 1) {
  const [locale, headingPattern] = localeHeadings[index];
  const headingMatch = headingPattern.exec(source);

  if (!headingMatch) {
    throw new Error(`Missing locale heading for ${locale}`);
  }

  const nextHeading = localeHeadings[index + 1];
  const nextMatch = nextHeading ? nextHeading[1].exec(source) : null;
  const section = source.slice(
    headingMatch.index,
    nextMatch ? nextMatch.index : source.length,
  );

  output[locale] = parseLocaleSection(locale, section);
}

fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

console.log(`Generated ${outputPath}`);
console.log("Validated 6 locales × 7 products × 5 FAQs.");
