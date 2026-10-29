import type { FaqCategory, FaqItem } from "./faq.types";

const synonyms = [
  ["快插", "快接", "快速接头", "快速断开", "quick connect", "quick disconnect"],
  ["漏液", "泄漏", "渗漏", "漏水", "leak", "leakage", "fuga", "fugas", "fuite", "fuites", "누액", "누설", "утечка", "утечки"],
  ["鲁尔", "luer"], ["倒刺", "宝塔", "barbed"],
  ["智控", "检测与控制", "传感器"], ["质控", "质量", "检验"],
  ["售后", "故障", "维修", "返修"], ["气泡", "bubble", "bubbles", "burbuja", "burbujas", "bulle", "bulles", "기포", "пузырьки", "пузырьков"],
  ["syringe", "jeringa", "seringue", "seringues", "시린지", "шприцевые"],
  ["piston", "pistón", "피스톤", "поршневые"],
  ["quick connect", "quick disconnect", "quick-disconnect", "desconexión rápida", "raccords rapides", "퀵 디스커넥트", "быстроразъёмные"],
];

export function normalizeFaqText(value: string) {
  return value.normalize("NFKC").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC")
    .replace(/\s+/g, " ").trim();
}

const normalizedSynonyms = synonyms.map(group => group.map(normalizeFaqText));

export function faqSearchTerms(query: string) {
  const normalized = normalizeFaqText(query);
  if (!normalized) return [];
  // Keep a known multiword alias intact before splitting independent terms.
  if (normalizedSynonyms.some((group) => group.includes(normalized))) return [normalized];
  return normalized.split(/\s+/).filter(Boolean);
}

export function matchesFaq(item: FaqItem, query: string, categories: FaqCategory[]) {
  const category = categories.find((value) => value.key === item.category);
  const child = category?.children.find((value) => value.key === item.subcategory);
  const text = normalizeFaqText([
    item.question, ...item.answer, ...item.tags, ...item.aliases,
    category?.label, category?.section, child?.label, ...(child?.aliases ?? []),
  ].join(" "));
  return faqSearchTerms(query).every((term) => {
    if (text.includes(term)) return true;
    return normalizedSynonyms.some((group) => group.includes(term) && group.some((alias) => text.includes(alias)));
  });
}

export function faqSnippet(item: FaqItem, query: string) {
  const terms = faqSearchTerms(query);
  const alternatives = terms.flatMap((term) => normalizedSynonyms.find((group) => group.includes(term)) ?? [term]);
  const paragraph = item.answer.find((answer) => alternatives.some((term) => normalizeFaqText(answer).includes(term))) ?? item.answer[0];
  const normalized = normalizeFaqText(paragraph);
  const first = alternatives.map((term) => normalized.indexOf(term)).filter((index) => index >= 0).sort((a, b) => a - b)[0] ?? 0;
  const start = Math.max(0, first - 24);
  return `${start ? "…" : ""}${paragraph.slice(start, start + 105)}${paragraph.length > start + 105 ? "…" : ""}`;
}
