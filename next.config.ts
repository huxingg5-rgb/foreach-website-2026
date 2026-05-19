// next.config.ts
// Next.js 官网项目配置文件
//
// 说明：
// 1. 这个文件是 Next.js 项目的全局配置文件
// 2. 修改这里之后，需要重新启动 npm run dev 才会生效
// 3. allowedDevOrigins 用于允许局域网手机访问开发服务器
// 4. 当前手机访问用的电脑局域网 IP：192.168.8.253

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许开发环境下，从指定局域网 IP 访问 Next.js dev server
  // 说明：
  // 1. 手机访问电脑本地开发网站时，需要允许这个来源
  // 2. 这里不要写 http://，只写 IP 或域名
  // 3. 如果以后电脑 IP 变了，这里也要跟着改
  allowedDevOrigins: ["192.168.8.253"],
};

export default nextConfig;