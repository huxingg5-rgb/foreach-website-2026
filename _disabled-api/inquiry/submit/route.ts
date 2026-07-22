// app/api/inquiry/submit/route.ts

import { NextResponse } from "next/server";
export const runtime = "edge";

/**
 * POST /api/inquiry/submit
 *
 * 这是首页询盘提交接口预留。
 *
 * 前端会提交：
 * {
 *   name: "姓名",
 *   company: "公司名称",
 *   email: "邮箱",
 *   product: "感兴趣产品",
 *   region: "国家 / 地区",
 *   application: "应用领域",
 *   message: "需求描述"
 * }
 *
 * 正式开发时，这里可以继续扩展：
 * 1. 保存到数据库
 * 2. 发送邮件通知销售
 * 3. 根据国家 / 地区分配对应销售
 * 4. 同步到 CRM
 * 5. 记录来源页面、语言、UTM 参数
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const company = String(body.company || "").trim();
    const email = String(body.email || "").trim();
    const product = String(body.product || "").trim();
    const region = String(body.region || "").trim();
    const application = String(body.application || "").trim();
    const message = String(body.message || "").trim();

    /**
     * 基础字段校验
     *
     * 说明：
     * - 前端已经校验过一次
     * - 后端仍然必须再校验一次，避免异常提交
     */
    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "请填写姓名。",
        },
        { status: 400 },
      );
    }

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          message: "请填写公司名称。",
        },
        { status: 400 },
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        {
          success: false,
          message: "请填写正确的邮箱。",
        },
        { status: 400 },
      );
    }

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "请选择感兴趣产品。",
        },
        { status: 400 },
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message: "请填写需求描述。",
        },
        { status: 400 },
      );
    }

    /**
     * 开发阶段先打印到 VS Code 终端
     *
     * 正式上线后，这里可以替换成：
     * - 数据库存储
     * - 邮件发送
     * - CRM 同步
     * - 销售分配逻辑
     */
    console.log("【收到首页询盘】", {
      name,
      company,
      email,
      product,
      region,
      application,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "询盘提交成功，我们会尽快与您联系。",
    });
  } catch (error) {
    console.error("提交询盘接口错误：", error);

    return NextResponse.json(
      {
        success: false,
        message: "服务器错误，询盘提交失败。",
      },
      { status: 500 },
    );
  }
}