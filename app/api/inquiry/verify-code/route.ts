// app/api/inquiry/verify-code/route.ts

import { NextResponse } from "next/server";
export const runtime = "edge";


/**
 * 这里继续使用发送验证码接口里创建的全局验证码存储
 *
 * 注意：
 * - 开发阶段临时使用
 * - 正式上线建议换成 Redis / 数据库 / KV，并设置验证码过期时间
 */
declare global {
  var __foreachEmailCodeStore: Map<string, string> | undefined;
}

const emailCodeStore =
  globalThis.__foreachEmailCodeStore ?? new Map<string, string>();

globalThis.__foreachEmailCodeStore = emailCodeStore;

/**
 * POST /api/inquiry/verify-code
 *
 * 前端传入：
 * {
 *   email: "客户邮箱",
 *   code: "客户填写的验证码"
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "").trim();
    const code = String(body.code || "").trim();

    if (!email || !code) {
      return NextResponse.json(
        {
          success: false,
          message: "请填写邮箱和验证码。",
        },
        { status: 400 },
      );
    }

    /**
     * 读取之前保存的验证码
     */
    const savedCode = emailCodeStore.get(email);

    if (!savedCode) {
      return NextResponse.json(
        {
          success: false,
          message: "请先发送验证码。",
        },
        { status: 400 },
      );
    }

    if (savedCode !== code) {
      return NextResponse.json(
        {
          success: false,
          message: "验证码不正确。",
        },
        { status: 400 },
      );
    }

    /**
     * 验证通过后，可以删除验证码，避免重复使用
     */
    emailCodeStore.delete(email);

    return NextResponse.json({
      success: true,
      message: "邮箱验证通过。",
    });
  } catch (error) {
    console.error("校验验证码接口错误：", error);

    return NextResponse.json(
      {
        success: false,
        message: "服务器错误，验证码校验失败。",
      },
      { status: 500 },
    );
  }
}