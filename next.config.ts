
/* =========================================================
   next.config.ts
   恒永达官网 Next.js 配置文件

   说明：
   1. 当前为了适配 Cloudflare Pages 免费版，先使用静态导出 output: "export"
   2. 静态导出不会生成 Cloudflare Worker，因此不会触发 3 MiB Worker 限制
   3. images.unoptimized 是必须的，否则 next/image 在静态导出时可能报错 
   4. 后续如果切换到阿里云 ECS 或完整 Node.js 部署，可以再恢复服务端能力
========================================================= */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
    静态导出：
    npm run build 后会生成 out 文件夹
  */
  output: "export",

  /*
    静态部署时，禁用 Next.js 图片优化服务
    因为 Cloudflare Pages 静态模式没有 Next.js 图片优化服务器
  */
  images: {
    unoptimized: true,
  },
};

export default nextConfig;