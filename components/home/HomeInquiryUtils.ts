// 这是关于 components/home/HomeInquiryUtils.ts 的文件：用于存放首页询盘模块的通用工具函数
// 这个文件的作用：把 HomeInquirySection.tsx 里的邮箱校验和验证码倒计时文字函数拆出来，减少主组件复杂度

import type { LocaleCode } from "@/lib/i18n"; // 引入官网支持的语言代码类型，例如 zh-CN、en、es、fr、ko、ru

export function isValidEmail(email: string) { // 定义邮箱格式基础判断函数
  return email.includes("@") && email.includes("."); // 当前只做基础判断：邮箱必须包含 @ 和 .
} // isValidEmail 函数结束

export function getCountdownLabel( // 定义验证码倒计时按钮文字函数
  countdown: number, // 当前倒计时秒数
  locale: LocaleCode, // 当前页面语言
) { // getCountdownLabel 函数参数结束
  if (locale === "zh-CN") { // 如果当前语言是中文
    return `${countdown}秒后重发`; // 返回中文倒计时文字
  } // 中文判断结束

  if (locale === "ko") { // 如果当前语言是韩语
    return `${countdown}초 후 재전송`; // 返回韩语倒计时文字
  } // 韩语判断结束

  if (locale === "ru") { // 如果当前语言是俄语
    return `${countdown} с`; // 返回俄语倒计时文字
  } // 俄语判断结束

  return `${countdown}s`; // 其他语言默认使用英文/通用秒数格式
} // getCountdownLabel 函数结束