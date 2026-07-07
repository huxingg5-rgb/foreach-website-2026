const fs = require("fs");
const path = require("path");

const root = process.cwd();
const dataDir = path.join(root, "data");

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".json") && !e.name.includes(".bak_")) out.push(p);
  }
  return out;
}

function firstJsonValue(s) {
  let start = 0;
  if (s.charCodeAt(0) === 0xfeff) start = 1;
  while (start < s.length && /\s/.test(s[start])) start++;

  const pairs = { "{": "}", "[": "]" };
  if (!pairs[s[start]]) return null;

  const stack = [];
  let inStr = false;
  let esc = false;

  for (let i = start; i < s.length; i++) {
    const ch = s[i];

    if (inStr) {
      if (esc) esc = false;
      else if (ch === "\\") esc = true;
      else if (ch === '"') inStr = false;
      continue;
    }

    if (ch === '"') inStr = true;
    else if (ch === "{" || ch === "[") stack.push(pairs[ch]);
    else if (ch === "}" || ch === "]") {
      if (stack.pop() !== ch) return null;
      if (stack.length === 0) return s.slice(0, i + 1);
    }
  }

  return null;
}

let bad = 0;
let fixed = 0;

for (const file of walk(dataDir)) {
  const raw = fs.readFileSync(file, "utf8");

  try {
    JSON.parse(raw);
    continue;
  } catch (err) {
    bad++;
    const first = firstJsonValue(raw);

    if (first) {
      try {
        JSON.parse(first);
        fs.copyFileSync(file, file + ".bak_json_repair_" + Date.now());
        fs.writeFileSync(file, first + "\n", "utf8");
        fixed++;
        console.log("已修复：" + path.relative(root, file));
      } catch {
        console.log("无法自动修复：" + path.relative(root, file));
      }
    } else {
      console.log("无法识别 JSON 起始结构：" + path.relative(root, file));
    }
  }
}

console.log("");
console.log("损坏 JSON 数量：" + bad);
console.log("已修复数量：" + fixed);