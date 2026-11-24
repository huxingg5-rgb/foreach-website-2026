import assert from "node:assert/strict";
import { test } from "node:test";
import { build } from "esbuild";
import { runInNewContext } from "node:vm";
import { buildInquiryEmails, buildVerificationEmail, resolveInquiryEmailLocale } from "../../lib/email/inquiry-email";
import { inquiryEmailAssets } from "../../lib/email/inquiry-email-assets";
import { CONTACT_INQUIRY_RATE_LIMIT, sendResendEmail, sha256, type InquiryKvNamespace } from "../../lib/cloudflare/inquiry";
import { onRequestPost as submitCloudflare } from "../../functions/api/inquiry/submit";
import { onRequestPost as sendCodeCloudflare } from "../../functions/api/inquiry/send-code";
import { inquiryEmailFixtures, inquiryFixture } from "./inquiry-email.fixtures";

test("fourteen designs keep the mail-safe structure, neutral greeting, localized footer and PNG MIME references", () => {
  const fixtures = inquiryEmailFixtures();
  assert.equal(fixtures.length, 14);
  for (const { id, lang, email } of fixtures) {
    assert.match(email.html, /data-mail-content="true"/);
    assert.match(email.html, /width="640"/);
    assert.match(email.html, /o:PixelsPerInch>96/);
    assert.doesNotMatch(email.html, /<(?:script|iframe|form|input|svg)\b|data:image|display\s*:\s*(?:flex|grid)|position\s*:\s*absolute|<link\b|@import/i);
    assert.doesNotMatch(email.html, /Ms\. Chen|Mr\. Chen|陈女士|陈先生/);
    assert(Buffer.byteLength(email.html) < 96_000);
    if (id !== "verification" && id !== "internal") assert.match(email.text, lang === "zh" ? /^您好：/ : /^Hello,/);
    assert.equal(email.replyTo, lang === "zh" ? "sales@foreachtek.com" : "info@foreachtek.com");
    if (lang === "zh") {
      assert.doesNotMatch(email.html, /cid:foreach-(?:linkedin|facebook|youtube|instagram|x)"/);
      assert.match(email.html, /padding-top:4px/);
    } else assert.doesNotMatch(email.text, /\p{Script=Han}/u);
    for (const match of email.html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(match[0], /width="\d+"/);
      assert.match(match[0], /height="\d+"/);
      const cid = /src="cid:([^"]+)"/.exec(match[0])?.[1];
      const asset = inquiryEmailAssets.find(item => item.content_id === cid);
      assert(asset, `Missing PNG for ${id}/${lang}: ${cid}`);
      assert.equal(Buffer.from(asset.content, "base64").subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    }
  }
});

test("attachment and application wording follows real submission state", () => {
  for (const locale of ["zh-CN", "en"]) {
    const data = inquiryFixture(locale);
    const zh = locale === "zh-CN";
    const noFiles = buildInquiryEmails(data).confirmation;
    const pending = buildInquiryEmails({ ...data, attachments: [{ name: "requirements.pdf" }] }).confirmation;
    const received = buildInquiryEmails({ ...data, attachments: [{ name: "requirements.pdf" }], filesReceived: true }).confirmation;
    assert.doesNotMatch(noFiles.text, /原始文件|original files|files have been received/i);
    assert.match(pending.text, zh ? /请将原始文件发送至/ : /Please send the original files/);
    assert.doesNotMatch(pending.text, /询盘及附件已收到|received your inquiry and files/);
    assert.match(received.text, zh ? /询盘及附件已收到/ : /received your inquiry and files/);
    const cad = buildInquiryEmails({ ...data, name: "", requestType: "CAD", message: "" }).confirmation;
    assert.match(cad.subject, zh ? /资料申请已收到/ : /Request Received/);
    assert.match(cad.text, zh ? /核对需求后提供/ : /after reviewing your request/);
    assert.match(buildInquiryEmails({ ...data, requestType: "Distributor Partnership" }).confirmation.subject, zh ? /合作申请已收到/ : /Application Received/);
  }
  assert.equal(resolveInquiryEmailLocale("ZH_cn"), "zh");
  assert.equal(resolveInquiryEmailLocale("zh-Hans"), "zh");
  for (const locale of [undefined, "en", "fr", "ko"]) assert.equal(resolveInquiryEmailLocale(locale), "en");
  assert.throws(() => buildVerificationEmail('<img/>', "en"));
});

test("all user fields stay escaped and present; header text cannot introduce extra MIME headers", () => {
  const attack = '<img src=x onerror="alert(1)">&\'"';
  const data = { ...inquiryFixture("en"), name: attack, company: attack + "\r\nBcc: injected@example.com", message: attack + "\nSecond line", productModel: attack, currentUrl: "javascript:alert(1)", attachments: [{ name: attack }] };
  const { notification, confirmation } = buildInquiryEmails(data);
  for (const email of [notification, confirmation]) {
    assert.doesNotMatch(email.html, /<img src=x|href="javascript:|<script\b/);
    assert.match(email.html, /&lt;img src=x onerror=&quot;/);
    assert.match(email.html, /Second line/);
    assert.match(email.text, /Second line/);
    assert.doesNotMatch(email.subject, /[\r\n]/);
  }
  assert.match(notification.text, /javascript:alert\(1\)/);
  assert.match(notification.html, /font-weight:400;color:#666666/);
});

test("transport sends provider-supported CID parts and preserves actual customer attachments", async () => {
  const originalFetch = globalThis.fetch;
  const captures: Record<string, unknown>[] = [];
  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), "https://api.resend.com/emails");
    captures.push(JSON.parse(String(init?.body)));
    return Response.json({ id: "mock-delivery" });
  };
  try {
    for (const locale of ["zh-CN", "en"]) {
      const email = buildVerificationEmail("123456", locale);
      await sendResendEmail("test-key", { from: "preview@example.com", to: "customer@example.com", ...email, attachments: [{ filename: "requirements.pdf", content: "JVBERi0xLjc=" }], idempotencyKey: "test-only" });
    }
    for (const [index, payload] of captures.entries()) {
      const attachments = payload.attachments as { filename: string; content: string; content_id?: string }[];
      assert.equal(attachments.filter(item => !item.content_id).length, 1);
      assert.equal(attachments.filter(item => item.content_id).length, index === 0 ? 3 : 8);
      assert.equal(attachments[0].filename, "requirements.pdf");
      assert(attachments.every(item => item.content.length > 0));
    }
  } finally { globalThis.fetch = originalFetch; }
});

test("Cloudflare and Next endpoints send both locales, real files and pending-file receipts without network delivery", async () => {
  const verified = { email: "engineer@example.com", verifiedAt: Date.now(), expiresAt: Date.now() + 600_000 };
  const verifiedKey = "inquiry:verified:" + await sha256(verified.email);
  const clientIp = "192.0.2.15";
  const rateKey = "inquiry:general:ip:" + await sha256(clientIp);
  let submissions = 0;
  const deleted: string[] = [];
  const kv: InquiryKvNamespace = {
    get: async key => {
      if (key === rateKey) return String(submissions);
      return key === verifiedKey ? JSON.stringify(verified) : null;
    },
    put: async (key, value) => {
      if (key === rateKey) submissions = Number(value);
    },
    delete: async key => { deleted.push(key); },
  };
  const redis = {
    get: async (key: string) => key === verifiedKey ? verified : null,
    set: async () => "OK",
    del: async (key: string) => { deleted.push(key); return 1; },
    incr: async (key: string) => { assert.equal(key, rateKey); return ++submissions; },
    expire: async () => 1,
  };
  const calls: Record<string, unknown>[] = [];
  const mockFetch: typeof fetch = async (input, init) => {
    assert.equal(String(input), "https://api.resend.com/emails", "No external requests are permitted in this test");
    calls.push(JSON.parse(String(init?.body)));
    return Response.json({ id: "mock-delivery" });
  };
  async function nextHandler(entry: string) {
    const output = await build({ entryPoints: [entry], absWorkingDir: process.cwd(), bundle: true, write: false, format: "cjs", platform: "node", logLevel: "silent", plugins: [{ name: "fake-email-storage", setup(builder) {
      builder.onLoad({ filter: /lib[\\/]vercel[\\/]inquiry-runtime\.ts$/ }, () => ({ contents: 'export const getInquiryRedis=()=>globalThis.fakeRedis;export const getInquiryEmailConfig=()=>({apiKey:"test-key",from:"preview@example.com",recipients:["sales@example.com"]});', loader: "js" }));
    } }] });
    const testModule = { exports: {} as { POST?: (request: Request) => Promise<Response> } };
    runInNewContext(output.outputFiles[0].text, { module: testModule, exports: testModule.exports, fakeRedis: redis, fetch: mockFetch, Request, Response, File, FormData, TextEncoder, TextDecoder, crypto: globalThis.crypto, Uint8Array, Buffer, console, URL, btoa, atob });
    assert(testModule.exports.POST);
    return testModule.exports.POST;
  }
  const nextSubmit = await nextHandler("app/api/inquiry/submit/route.ts");
  const nextCode = await nextHandler("app/api/inquiry/send-code/route.ts");
  const env = { INQUIRY_KV: kv, RESEND_API_KEY: "test-key", INQUIRY_FROM_EMAIL: "preview@example.com", INQUIRY_TO_EMAIL: "sales@example.com" };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = mockFetch;
  try {
    for (const platform of ["cloudflare", "next"] as const) {
      for (const locale of ["zh-CN", "en"]) {
        const codeRequest = new Request("https://example.com/api/inquiry/send-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: verified.email, locale }) });
        const codeResponse = platform === "cloudflare" ? await sendCodeCloudflare({ request: codeRequest, env }) : await nextCode(codeRequest);
        assert.equal(codeResponse.status, 200);
        assert.match(String(calls.at(-1)?.subject), locale === "zh-CN" ? /邮箱验证码/ : /email verification/);
        for (const attachmentState of ["none", "pending", "received"] as const) {
          const data = inquiryFixture(locale);
          let request: Request;
          if (attachmentState === "received") {
            const body = new FormData();
            for (const [key, value] of Object.entries(data)) if (typeof value === "string") body.set(key, value);
            body.append("attachments", new File(["%PDF-1.7\nfixture"], "requirements.pdf", { type: "application/pdf" }));
            request = new Request("https://example.com/api/inquiry/submit", { method: "POST", body });
          } else {
            request = new Request("https://example.com/api/inquiry/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, attachments: attachmentState === "pending" ? [{ name: "requirements.pdf", size: 12, type: "application/pdf" }] : [] }) });
          }
          const before = calls.length;
          const response = platform === "cloudflare" ? await submitCloudflare({ request, env }) : await nextSubmit(request);
          assert.equal(response.status, 200, `${platform}/${locale}/${attachmentState}: ${await response.clone().text()}`);
          assert.equal(calls.length - before, 2);
          const notification = calls[before];
          const receipt = calls[before + 1];
          assert.equal(notification.reply_to, verified.email);
          assert.equal(receipt.reply_to, locale === "zh-CN" ? "sales@foreachtek.com" : "info@foreachtek.com");
          assert.match(String(receipt.html), locale === "zh-CN" ? /您好：/ : /Hello,/);
          const receiptFiles = receipt.attachments as { content_id?: string }[];
          assert(receiptFiles.every(item => item.content_id), "Customer uploads must not be echoed into the customer receipt");
          if (attachmentState === "received") assert((notification.attachments as { filename: string }[]).some(item => item.filename === "requirements.pdf"));
          if (attachmentState === "pending") assert.match(String(receipt.text), locale === "zh-CN" ? /请将原始文件发送至/ : /Please send the original files/);
        }
      }
    }
    for (const platform of ["cloudflare", "next"] as const) {
      for (const invalid of [
        { ...inquiryFixture("en"), productType: "", expected: 400 },
        { ...inquiryFixture("en"), email: "unverified@example.com", expected: 403 },
      ]) {
        const request = new Request("https://example.com/api/inquiry/submit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(invalid) });
        const response = platform === "cloudflare" ? await submitCloudflare({ request, env }) : await nextSubmit(request);
        assert.equal(response.status, invalid.expected);
      }
    }
    for (const platform of ["cloudflare", "next"] as const) {
      const submit = (request: Request) => platform === "cloudflare"
        ? submitCloudflare({ request, env })
        : nextSubmit(request);
      const requestUrl = "https://example.com/api/inquiry/submit";
      const fields = { formType: "general_inquiry", name: "Contact Person", company: "Contact Company", email: "no-code@example.com" };

      submissions = 0;
      const headers = { "CF-Connecting-IP": clientIp, "x-forwarded-for": clientIp };
      const body = new FormData();
      for (const [key, value] of Object.entries(fields)) body.set(key, value);
      const before = calls.length;
      const response = await submit(new Request(requestUrl, { method: "POST", headers, body }));
      assert.equal(response.status, 200, platform);
      assert.equal(calls.length - before, 2);
      const [notification, receipt] = calls.slice(before);
      assert.equal(notification.reply_to, fields.email);
      assert.match(String(notification.text), /Contact Person/);
      assert.match(String(notification.text), /Contact Company/);
      assert.doesNotMatch(String(notification.text), /verified request/);
      assert.doesNotMatch(String(receipt.text), /Contact Person|Contact Company/);

      const cases = [
        { payload: { ...fields, name: " " }, status: 400, error: "name_required" },
        { payload: { ...fields, company: " " }, status: 400, error: "company_required" },
        { payload: { ...fields, email: "invalid" }, status: 400, error: "invalid_email" },
        { payload: { ...fields, requestType: "CAD", productType: "Pump" }, status: 403, error: "email_not_verified" },
        { payload: { ...fields, requestType: "Distributor Partnership", productType: "Pump", message: "Partner request" }, status: 403, error: "email_not_verified" },
      ];
      for (const { payload, status, error } of cases) {
        const failure = await submit(new Request(requestUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }));
        assert.equal(failure.status, status, platform);
        assert.equal((await failure.json()).error, error, platform);
      }
      submissions = CONTACT_INQUIRY_RATE_LIMIT.maxPerWindow;
      const throttled = await submit(new Request(requestUrl, { method: "POST", headers, body }));
      assert.equal(throttled.status, 429, platform);
      assert.equal(calls.length - before, 2, "Invalid and throttled submissions must not send email");
    }
    assert(deleted.includes(`inquiry:verified:${await sha256(verified.email)}`));
    assert.equal(calls.length, 32);
  } finally { globalThis.fetch = originalFetch; }
});
