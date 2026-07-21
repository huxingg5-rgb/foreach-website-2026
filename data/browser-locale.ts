// data/browser-locale.ts
// 根据浏览器语言推荐官网语言
//
// 说明：
// 1. 这个文件不根据 IP 判断国家
// 2. 只读取浏览器请求头里的 Accept-Language
// 3. 如果浏览器语言不在官网支持范围内，默认推荐英文
// 4. 这样更适合海外客户访问，也避免 IP 判断不准的问题

import type { LocaleCode } from "@/data/languages"; // 引入官网统一语言类型

// 官网默认兜底推荐语言
// 说明：
// 1. 当浏览器语言不是中文、英文、西语、法语、韩语、俄语时
// 2. 默认进入英文页面 /en
export const fallbackBrowserLocale: LocaleCode = "en";

// 根据浏览器语言获取推荐语言
// 说明：
// 1. acceptLanguage 来自浏览器请求头 Accept-Language
// 2. 常见格式类似：zh-CN,zh;q=0.9,en;q=0.8
// 3. 当前阶段按关键词判断即可，不需要做太复杂
export function getLocaleByAcceptLanguage(
  acceptLanguage: string | null
): LocaleCode {
  // 如果浏览器没有传语言信息，直接返回英文
  if (!acceptLanguage) {
    return fallbackBrowserLocale;
  }

  // 统一转小写，方便后面判断
  const lowerAcceptLanguage = acceptLanguage.toLowerCase();

  // 中文浏览器
  // 示例：zh-CN、zh-TW、zh
  if (
    lowerAcceptLanguage.includes("zh-cn") ||
    lowerAcceptLanguage.includes("zh")
  ) {
    return "zh-CN";
  }

  // 韩语浏览器
  // 示例：ko、ko-KR
  if (lowerAcceptLanguage.includes("ko")) {
    return "ko";
  }

  // 俄语浏览器
  // 示例：ru、ru-RU
  if (lowerAcceptLanguage.includes("ru")) {
    return "ru";
  }

  // 法语浏览器
  // 示例：fr、fr-FR、fr-CA
  if (lowerAcceptLanguage.includes("fr")) {
    return "fr";
  }

  // 西班牙语浏览器
  // 示例：es、es-ES、es-MX
  if (lowerAcceptLanguage.includes("es")) {
    return "es";
  }

  // 英语浏览器
  // 示例：en、en-US、en-GB
  if (lowerAcceptLanguage.includes("en")) {
    return "en";
  }

  // 其他没匹配到的语言，例如德语、日语、意大利语等
  // 默认进入英文页面
  return fallbackBrowserLocale;
}