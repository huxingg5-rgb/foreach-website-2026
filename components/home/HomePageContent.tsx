// 杩欐槸鍏充簬 components/home/HomePageContent.tsx 鐨勬枃浠讹細鐢ㄤ簬绠＄悊棣栭〉鎵€鏈夋ā鍧楃殑鎺掑垪椤哄簭
// 杩欎釜鏂囦欢鐨勪綔鐢細鍙礋璐ｂ€滈椤电粨鏋勭粍鍚堚€濓紝涓嶇洿鎺ュ啓 Hero 棣栧睆鐨勫叿浣撳唴瀹?

import HomeApplicationFlowSection from "@/components/home/HomeApplicationFlowSection"; // 寮曞叆棣栭〉绗簩灞忥細搴旂敤棰嗗煙 脳 鏍稿績閮ㄤ欢缁勪欢
import HomeCompanyStrengthSection from "@/components/home/HomeCompanyStrengthSection"; // 寮曞叆棣栭〉绗笁 / 绗洓灞忥細鍏徃浠嬬粛涓庝紒涓氫紭鍔跨粍浠?
import HomeHeroSection from "@/components/home/HomeHeroSection"; // 寮曞叆棣栭〉绗竴灞忥細Hero 棣栧睆缁勪欢
import HomeContactInquirySection from "@/components/home/HomeContactInquirySection";
import HomeNewsSection from "@/components/home/HomeNewsSection"; // 寮曞叆棣栭〉绗簲灞忥細璧勮涓績缁勪欢

import { getLanguageTextLayoutClass } from "@/data/languages"; // 寮曞叆鏍规嵁褰撳墠璇█鑾峰彇鎺掔増 class 鐨勬柟娉?

import type { LocaleCode } from "@/lib/i18n"; // 寮曞叆瀹樼綉鏀寔鐨勮瑷€浠ｇ爜绫诲瀷

/* =========================================================
   棣栭〉鍐呭缁勪欢鍙傛暟绫诲瀷
   璇存槑锛?
   1. locale 鏄綋鍓嶉〉闈㈣瑷€
   2. 渚嬪锛?
      - zh-CN 涓枃
      - en 鑻辨枃
      - es 瑗跨彮鐗欒
      - fr 娉曡
      - ko 闊╄
      - ru 淇勮
========================================================= */

type HomePageContentProps = {
  locale: LocaleCode;
};

/* =========================================================
   棣栭〉鍐呭鎬诲叆鍙ｇ粍浠?
   璇存槑锛?
   1. 杩欎釜缁勪欢鍙礋璐ｇ粍鍚堥椤垫ā鍧?
   2. 姣忎釜妯″潡鐨勫叿浣撳唴瀹瑰垎鍒斁鍦ㄥ搴旂粍浠堕噷
   3. languageTextLayoutClass 鐢ㄤ簬缁欎笉鍚岃瑷€鎻愪緵鎺掔増瀵嗗害 class
   4. 濡傛灉澶氳瑷€椤甸潰鍑虹幇鏂囧瓧鈥滃厛澶у悗灏忊€濈殑璺冲姩闂锛?
      涓嶅缓璁湪杩欓噷鍒犻櫎 languageTextLayoutClass锛?
      搴旇鍘?app/language-typography.css 閲屼慨姝ｅ瓧鍙?鍔ㄧ敾瑙勫垯
========================================================= */

export default function HomePageContent({ locale }: HomePageContentProps) {
  // 鏍规嵁褰撳墠璇█鑾峰彇椤甸潰鎺掔増 class
  // 渚嬪鍙兘杩斿洖锛?
  // site-page--compact
  // site-page--standard
  // site-page--expanded
  const languageTextLayoutClass = getLanguageTextLayoutClass(locale);

  return (
    <div className={`site-page ${languageTextLayoutClass}`}>
      <main>
        {/* 绗竴灞忥細Hero 棣栧睆鍖哄煙 */}
        <HomeHeroSection locale={locale} />

        {/* 绗簩灞忥細搴旂敤棰嗗煙 脳 鏍稿績閮ㄤ欢 */}
        <HomeApplicationFlowSection locale={locale} />

        {/* 绗笁 / 绗洓灞忥細鍏徃浠嬬粛涓庝紒涓氫紭鍔?*/}
        <HomeCompanyStrengthSection locale={locale} />

        {/* 绗簲灞忥細璧勮涓績 */}
        <HomeNewsSection locale={locale} />

        {/* 绗叚灞忥細鍦ㄧ嚎璇㈢洏 */}
        <HomeContactInquirySection locale={locale} />
      </main>
    </div>
  );
}
