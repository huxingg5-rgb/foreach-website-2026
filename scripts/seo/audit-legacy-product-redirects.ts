import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

import { onRequest } from "../../functions/_middleware";
import { LEGACY_PRODUCT_REDIRECTS } from "../../functions/legacy-product-redirects";

const CANONICAL_ORIGIN = "https://www.foreachtek.com";
const EXPECTED_IDS = ["12634", "12635", "12636", "12637"];

async function requestLegacyUrl(
  pathAndQuery: string,
  method = "GET",
): Promise<{ response: Response; fellThrough: boolean }> {
  let fellThrough = false;
  const response = await onRequest({
    request: new Request(`${CANONICAL_ORIGIN}${pathAndQuery}`, { method }),
    next: async () => {
      fellThrough = true;
      return new Response(null, { status: 204 });
    },
  });

  return { response, fellThrough };
}

async function main(): Promise<void> {
  assert.deepEqual(
    Object.keys(LEGACY_PRODUCT_REDIRECTS).sort(),
    EXPECTED_IDS,
    "试点映射必须且只能包含四个已确认旧 ID",
  );

  for (const legacyId of EXPECTED_IDS) {
    const mapping = LEGACY_PRODUCT_REDIRECTS[legacyId];

    for (const language of ["cn", "en"] as const) {
      const { response, fellThrough } = await requestLegacyUrl(
        `/${language}/ProductInfo.aspx?Id=${legacyId}&utm_source=legacy-test`,
      );

      assert.equal(fellThrough, false, `${language}/${legacyId} 不应放行`);
      assert.equal(response.status, 301, `${language}/${legacyId} 必须返回 301`);
      assert.equal(
        response.headers.get("location"),
        `${CANONICAL_ORIGIN}${mapping[language]}`,
        `${language}/${legacyId} 目标错误或残留查询参数`,
      );
    }
  }

  const unknownId = await requestLegacyUrl(
    "/cn/ProductInfo.aspx?Id=999999",
  );
  assert.equal(unknownId.fellThrough, true, "未知 ID 必须放行，不能猜测跳转");
  assert.equal(unknownId.response.status, 204);

  const missingId = await requestLegacyUrl("/en/ProductInfo.aspx");
  assert.equal(missingId.fellThrough, true, "缺失 ID 必须放行");

  const lowerCaseId = await requestLegacyUrl(
    "/cn/ProductInfo.aspx?id=12634",
  );
  assert.equal(lowerCaseId.fellThrough, true, "仅接受旧 CMS 的权威参数名 Id");

  const postRequest = await requestLegacyUrl(
    "/cn/ProductInfo.aspx?Id=12634",
    "POST",
  );
  assert.equal(postRequest.fellThrough, true, "非 GET/HEAD 请求必须放行");

  const headRequest = await requestLegacyUrl(
    "/cn/ProductInfo.aspx?Id=12634",
    "HEAD",
  );
  assert.equal(headRequest.fellThrough, false, "HEAD 请求应执行同一条 301");
  assert.equal(headRequest.response.status, 301);
  assert.equal(
    headRequest.response.headers.get("location"),
    `${CANONICAL_ORIGIN}${LEGACY_PRODUCT_REDIRECTS["12634"].cn}`,
  );

  let alternateHostFellThrough = false;
  await onRequest({
    request: new Request(
      "https://www.foreachtek.com.cn/cn/ProductInfo.aspx?Id=12634",
    ),
    next: async () => {
      alternateHostFellThrough = true;
      return new Response(null, { status: 204 });
    },
  });
  assert.equal(
    alternateHostFellThrough,
    true,
    ".com.cn 仍由旧站 IIS 规则负责，不应在此错误声明已接管",
  );

  const routesConfig = JSON.parse(
    await readFile(path.join(process.cwd(), "public", "_routes.json"), "utf8"),
  ) as { include: string[] };
  assert(routesConfig.include.includes("/cn/ProductInfo.aspx"));
  assert(routesConfig.include.includes("/en/ProductInfo.aspx"));

  const staticRedirects = await readFile(
    path.join(process.cwd(), "public", "_redirects"),
    "utf8",
  );
  assert.equal(
    /^\/en\/ProductInfo\.aspx\s+/mu.test(staticRedirects),
    false,
    "静态宽泛规则会覆盖产品级映射，必须删除",
  );

  console.log(
    `Legacy product redirect audit passed: ${EXPECTED_IDS.length} IDs, ` +
      `${EXPECTED_IDS.length * 2} language targets, unknown IDs fall through.`,
  );
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
