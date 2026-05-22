// app/api/inquiry/send-code/route.ts

import { NextResponse } from "next/server";
export const runtime = "edge";
/**
 * 指定运行环境为 Node.js
 *
 * 说明：
 * 1. 这里使用了 globalThis 临时保存验证码
 * 2. 所以明确指定 nodejs 更稳
 * 3. 正式上线后建议换成 Redis、数据库、Cloudflare KV 等方式保存验证码
 * export const runtime = "nodejs";
 */

 

/**
 * 给 TypeScript 声明一个全局变量
 *
 * 作用：
 * - 开发阶段临时保存邮箱验证码
 * - key 是邮箱
 * - value 是验证码
 *
 * 注意：
 * - 这只是开发阶段演示用
 * - 正式上线不能依赖内存保存验证码
 */
declare global {
  var __foreachEmailCodeStore: Map<string, string> | undefined;
}

/**
 * 初始化验证码存储
 *
 * 说明：
 * - 如果全局已经有，就继续使用
 * - 如果没有，就新建一个 Map
 */
const emailCodeStore =
  globalThis.__foreachEmailCodeStore ?? new Map<string, string>();

globalThis.__foreachEmailCodeStore = emailCodeStore;

/**
 * POST /api/inquiry/send-code
 *
 * 前端传入：
 * {
 *   email: "客户邮箱"
 * }
 *
 * 当前开发阶段：
 * - 生成 6 位验证码
 * - 保存到内存
 * - 在 VS Code 终端打印验证码
 *
 * 正式开发阶段：
 * - 这里接企业邮箱 SMTP / SendGrid / Resend / 阿里云邮件推送等服务
 * - 把验证码真正发送到客户邮箱
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email || "").trim();

    if (!email || !email.includes("@") || !email.includes(".")) {
      return NextResponse.json(
        {
          success: false,
          message: "邮箱格式不正确。",
        },
        { status: 400 },
      );
    }

    /**
     * 生成 6 位随机验证码
     */
    const code = String(Math.floor(100000 + Math.random() * 900000));

    /**
     * 开发阶段临时保存验证码
     */
    emailCodeStore.set(email, code);

    /**
     * 开发阶段把验证码打印到 VS Code 终端
     * 你测试时看终端即可
     */
    console.log("【开发阶段邮箱验证码】", {
      email,
      code,
    });

    return NextResponse.json({
      success: true,
      message: "验证码已发送。开发阶段请在 VS Code 终端查看验证码。",
    });
  } catch (error) {
    console.error("发送验证码接口错误：", error);

    return NextResponse.json(
      {
        success: false,
        message: "服务器错误，验证码发送失败。",
      },
      { status: 500 },
    );
  }
}