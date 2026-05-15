// Next.js 配置文件
// 作用：配置 Next.js 项目的运行方式

import type { NextConfig } from "next"; // 引入 Next.js 配置类型，方便 TypeScript 检查配置是否正确

const nextConfig: NextConfig = {
  // allowedDevOrigins：
  // 作用：允许手机 / 平板通过局域网 IP 访问本机开发服务器
  // 说明：这里的 IP 要和终端里 Network 显示的 IP 一致
  allowedDevOrigins: [
    "192.168.8.253", // 当前电脑在局域网里的 IP，手机访问 http://192.168.8.253:3000 时需要允许这个来源
  ],
};

export default nextConfig; // 导出 Next.js 配置