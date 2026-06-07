/* =========================================================
   next.config.ts
   恒永达官网｜Next.js 配置文件

   说明：
   1. 当前为了适配 Cloudflare Pages 免费版，使用静态导出 output: "export"
   2. 静态导出不会生成 Cloudflare Worker，因此不会触发 Worker 体积限制
   3. images.unoptimized 是必须的，否则 next/image 在静态导出时可能报错
   4. trailingSlash: true 用于让导出路径生成 index.html 目录结构
      例如：
      /resources/technical-articles
      对应：
      out/resources/technical-articles/index.html
   5. 这样更适合 Cloudflare Pages 这类静态托管平台
========================================================= */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;