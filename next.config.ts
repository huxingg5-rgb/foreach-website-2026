/* =========================================================
   next.config.ts
   恒永达官网｜Vercel 部署配置

   说明：
   1. Vercel 分支不再使用 output: "export"
   2. 页面仍会尽可能生成静态页面
   3. /app/api 下的询盘接口由 Vercel Functions 运行
   4. trailingSlash 保留原官网 URL 结构
   5. images.unoptimized 保留现有图片加载方式
========================================================= */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;