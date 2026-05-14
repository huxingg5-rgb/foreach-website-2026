import HomePageContent from "@/components/home/HomePageContent"; // 引入首页共用内容组件

/**
 * HomePage
 * 中文官网首页
 *
 * 说明：
 * 1. 访问 / 时显示中文首页
 * 2. 中文首页不使用 /zh-CN
 * 3. 英文、西语、法语、韩语、俄语首页后面由 app/[locale]/page.tsx 负责
 */
export default function HomePage() {
  // 渲染中文首页内容
  return <HomePageContent locale="zh-CN" />;
}