import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  DIAPHRAGM_PUMP_FINAL_PARENT,
  DIAPHRAGM_PUMP_LEGACY_PARENT,
  DIAPHRAGM_PUMP_PUBLIC_LOCALES,
  getDiaphragmPumpRedirectPairs,
} from "../../data/products/detail/diaphragm-pump-routes";

const EXPECTED_REDIRECT_COUNT = 138;
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "../..");
const redirectsPath = resolve(repositoryRoot, "public/_redirects");
const checkOnly = process.argv.includes("--check");

type LineRecord = {
  content: string;
  ending: string;
};

function splitLinesPreservingEndings(value: string): LineRecord[] {
  const records: LineRecord[] = [];
  const linePattern = /([^\r\n]*)(\r\n|\n|$)/g;

  for (const match of value.matchAll(linePattern)) {
    if (!match[0]) continue;
    records.push({ content: match[1], ending: match[2] });
  }

  return records;
}

function getRuleSource(line: string) {
  const trimmed = line.trim();

  if (!trimmed || trimmed.startsWith("#")) return "";

  return trimmed.split(/\s+/, 1)[0] || "";
}

function isManagedDiaphragmPumpRule(line: string) {
  const source = getRuleSource(line);
  const localePrefix = DIAPHRAGM_PUMP_PUBLIC_LOCALES.filter(
    (locale) => locale !== "zh",
  ).join("|");
  const legacySourcePattern = new RegExp(
    `^/(?:(${localePrefix})/)?products/pumps/${DIAPHRAGM_PUMP_LEGACY_PARENT}(?:/|$)`,
  );

  return legacySourcePattern.test(source);
}

function validateGeneratedRules(lines: string[]) {
  if (lines.length !== EXPECTED_REDIRECT_COUNT) {
    throw new Error(
      `Expected ${EXPECTED_REDIRECT_COUNT} diaphragm-pump redirects, received ${lines.length}.`,
    );
  }

  const sources = lines.map((line) => line.split(/\s+/)[0]);
  const duplicateSources = sources.filter(
    (source, index) => sources.indexOf(source) !== index,
  );

  if (duplicateSources.length > 0) {
    throw new Error(
      `Duplicate diaphragm-pump redirect sources: ${[
        ...new Set(duplicateSources),
      ].join(", ")}`,
    );
  }

  const sourceSet = new Set(sources);

  lines.forEach((line, index) => {
    const [source, destination, status, ...unexpected] = line.split(/\s+/);

    if (!isManagedDiaphragmPumpRule(line)) {
      throw new Error(`Rule ${index + 1} does not use the legacy parent: ${line}`);
    }

    if (
      !destination.includes(
        `/products/pumps/${DIAPHRAGM_PUMP_FINAL_PARENT}/`,
      ) ||
      destination.includes(
        `/products/pumps/${DIAPHRAGM_PUMP_LEGACY_PARENT}/`,
      )
    ) {
      throw new Error(`Rule ${index + 1} has an invalid destination: ${line}`);
    }

    if (status !== "301" || unexpected.length > 0) {
      throw new Error(`Rule ${index + 1} is not an exact 301 rule: ${line}`);
    }

    if (/[\*:]/.test(source) || /[\*:]/.test(destination)) {
      throw new Error(`Rule ${index + 1} is not an exact path rule: ${line}`);
    }

    if (sourceSet.has(destination)) {
      throw new Error(`Rule ${index + 1} would create a redirect chain: ${line}`);
    }
  });
}

function buildRedirectFile(currentText: string, generatedLines: string[]) {
  const records = splitLinesPreservingEndings(currentText);
  const firstManagedIndex = records.findIndex((record) =>
    isManagedDiaphragmPumpRule(record.content),
  );
  const fallbackEnding = currentText.includes("\r\n") ? "\r\n" : "\n";
  const generatedEnding =
    (firstManagedIndex >= 0 && records[firstManagedIndex].ending) ||
    fallbackEnding;
  const generatedBlock = generatedLines
    .map((line) => `${line}${generatedEnding}`)
    .join("");

  if (firstManagedIndex < 0) {
    const separator = currentText && !/[\r\n]$/.test(currentText)
      ? fallbackEnding
      : "";
    return `${currentText}${separator}${generatedBlock}`;
  }

  let insertedGeneratedBlock = false;

  return records
    .map((record) => {
      if (!isManagedDiaphragmPumpRule(record.content)) {
        return `${record.content}${record.ending}`;
      }

      if (insertedGeneratedBlock) return "";

      insertedGeneratedBlock = true;
      return generatedBlock;
    })
    .join("");
}

const redirectPairs = getDiaphragmPumpRedirectPairs({
  includeDefensiveReferencePaths: true,
});
const generatedLines = redirectPairs.map(
  ({ source, destination }) => `${source} ${destination} 301`,
);

validateGeneratedRules(generatedLines);

const currentText = readFileSync(redirectsPath, "utf8");
const expectedText = buildRedirectFile(currentText, generatedLines);

if (checkOnly) {
  if (currentText !== expectedText) {
    throw new Error(
      "public/_redirects is out of date. Run this script without --check.",
    );
  }
} else if (currentText !== expectedText) {
  writeFileSync(redirectsPath, expectedText, "utf8");
}

console.log(
  `${checkOnly ? "Verified" : "Generated"} ${generatedLines.length} exact, one-hop diaphragm-pump redirects in public/_redirects.`,
);
