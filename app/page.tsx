import "@/app/contact/contact.css";

import HomePageContent from "@/components/home/HomePageContent";
import HomeLanguageRedirect from "@/components/i18n/HomeLanguageRedirect";
import { defaultLocale } from "@/data/languages";

/**
 * 中文默认首页
 *
 * 说明：
 * 1. 根路径 / 仍然是中文首页
 * 2. HomeLanguageRedirect 只在根首页执行语言判断
 * 3. 已有用户语言偏好时，优先使用用户选择
 * 4. 没有语言偏好时，根据浏览器语言自动跳转
 * 5. 浏览器语言不在支持范围时，默认进入英文 /en/
 */
export default function HomePage() {
  return (
    <>
      <HomeLanguageRedirect />
      <HomePageContent locale={defaultLocale} />
    </>
  );
}