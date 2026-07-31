/* =========================================================
   next.config.ts
   恒永达官网｜Vercel、本地与 Cloudflare 双模式配置

   本地开发与普通构建：
   - npm run dev
   - npm run build
   - 不启用静态导出
   - app/api 继续作为 Next.js Route Handler 使用

   Cloudflare Pages 构建：
   - npm run build:cloudflare
   - CF_PAGES=1 时启用 output: "export"
   - 静态文件生成到 out 文件夹
   - /api/inquiry/* 由 functions/api/inquiry 处理

   Cloudflare Pages 会在构建环境自动提供 CF_PAGES=1。
========================================================= */

import type { NextConfig } from "next";

/*
 * Cloudflare Pages 正式环境会自动提供 CF_PAGES=1。
 *
 * CLOUDFLARE_PAGES_BUILD 用于在本地运行：
 * npm run build:cloudflare
 */
const isCloudflarePagesBuild =
  process.env.CF_PAGES === "1" ||
  process.env.CLOUDFLARE_PAGES_BUILD === "1";

const nextConfig: NextConfig = {
  /*
   * 只有 Cloudflare 构建才启用静态导出。
   * 本地和 Vercel 普通构建不添加 output。
   */
  ...(isCloudflarePagesBuild
    ? {
        output: "export" as const,
      }
    : {}),

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
