// app/page.tsx
// 中文默认首页入口
//
// 说明：
// 1. 中文默认路径是 /
// 2. 不再使用 /zh
// 3. 首页内容统一交给 HomePageContent 组件渲染
// 4. defaultLocale 从 data/languages.ts 读取，避免语言代码到处写死

import HomePageContent from "@/components/home/HomePageContent"; // 引入首页内容组件
import { defaultLocale } from "@/data/languages"; // 引入默认语言，当前是 zh-CN

/**
 * HomePage
 * 中文默认首页
 *
 * 说明：
 * 1. 访问 / 时显示中文首页
 * 2. locale 传入 zh-CN
 */
export default function HomePage() {
  return <HomePageContent locale={defaultLocale} />;
}