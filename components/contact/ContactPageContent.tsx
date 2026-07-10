/* =========================================================
   ContactPageContent.tsx
   鎭掓案杈惧畼缃戯綔鑱旂郴鎴戜滑椤甸潰涓讳綋缁勪欢

   鏂囦欢璺緞锛?
   components/contact/ContactPageContent.tsx

   浣滅敤锛?
   1. 璐熻矗鑱旂郴鎴戜滑椤甸潰鏁翠綋缁撴瀯
   2. 娓叉煋 Banner銆佹敮鎸佸唴瀹广€佸～鍐欒鏄庛€佽〃鍗曘€佽仈绯绘柟寮忋€佸湴鍥俱€佸簳閮?CTA
   3. 琛ㄥ崟閫昏緫浜ょ粰 ContactInquiryForm.tsx
   4. 鍦板浘閫昏緫浜ょ粰 AmapBlock.tsx
   5. PDF 鐢熸垚閫昏緫浜ょ粰 buildContactPdfHtml.ts

   瑙勮寖璇存槑锛?
   1. 褰撳墠鏂囦欢鍙仛椤甸潰缁撴瀯鍜屾ā鍧楀紩鐢?
   2. 涓嶅湪杩欓噷鍐欏鏉傝〃鍗?useState
   3. 涓嶅湪杩欓噷鍐?PDF HTML
   4. 涓嶅湪杩欓噷鍐欓珮寰峰湴鍥惧垵濮嬪寲閫昏緫
========================================================= */

"use client"; // 褰撳墠缁勪欢闇€瑕佹敮鎸佺偣鍑绘敮鎸佸崱鐗囧悗婊氬姩鍒拌〃鍗曪紝鎵€浠ヤ娇鐢ㄥ鎴风缁勪欢

import { useState } from "react"; // 寮曞叆 React 鐘舵€佺鐞嗭紝鐢ㄤ簬璁板綍褰撳墠閫変腑鐨勯渶姹傜被鍨?

import type { ContactPageData } from "@/data/contact-cooperation"; // 寮曞叆鑱旂郴鎴戜滑椤甸潰鏁版嵁绫诲瀷
import AmapBlock from "@/components/contact/AmapBlock"; // 寮曞叆楂樺痉鍦板浘缁勪欢
import ContactFormSection from "@/components/contact/ContactFormSection";

/* =========================================================
   缁勪欢 Props 绫诲瀷
========================================================= */

type ContactPageContentProps = {
  data: ContactPageData; // 褰撳墠璇█鐨勮仈绯绘垜浠〉闈㈡暟鎹?
};

/* =========================================================
   骞虫粦婊氬姩鍒版寚瀹氭ā鍧?
   璇存槑锛?
   1. 鐐瑰嚮 Banner 鎸夐挳銆佹敮鎸佸崱鐗囥€佸簳閮?CTA 鏃朵娇鐢?
   2. 閬垮厤椤甸潰鐬棿璺宠浆锛屼綋楠屾洿骞虫粦
========================================================= */

function scrollToSection(targetId: string) {
  const targetElement = document.getElementById(targetId); // 鏍规嵁妯″潡 id 鑾峰彇椤甸潰鍏冪礌

  if (!targetElement) return; // 濡傛灉椤甸潰涓病鏈夊搴旀ā鍧楋紝鍒欎笉鎵ц

  targetElement.scrollIntoView({
    behavior: "smooth", // 骞虫粦婊氬姩
    block: "start", // 婊氬姩鍒版ā鍧楅《閮?
  });
}

/* =========================================================
   ContactPageContent 缁勪欢
========================================================= */

export default function ContactPageContent({ data }: ContactPageContentProps) {
  const [selectedRequestType, setSelectedRequestType] = useState(
    data.form.requestTypes[0] ?? "",
  ); // 褰撳墠閫変腑鐨勯渶姹傜被鍨嬶紝榛樿鍙栭渶姹傜被鍨嬬涓€涓€夐」

  /* =========================================================
     鐐瑰嚮鏀寔鍐呭鍗＄墖
     璇存槑锛?
     1. 鏍规嵁鏀寔鍗＄墖鐨?requestType 鑷姩甯﹀叆琛ㄥ崟
     2. 鐒跺悗婊氬姩鍒拌〃鍗曞尯鍩?
  ========================================================= */

  function handleSupportItemClick(requestType: string) {
    setSelectedRequestType(requestType); // 鏇存柊褰撳墠閫変腑鐨勯渶姹傜被鍨?

    window.setTimeout(() => {
      scrollToSection("form"); // 寤惰繜婊氬姩鍒拌〃鍗曪紝纭繚鐘舵€佸厛鏇存柊
    }, 0);
  }

  return (
    <main className="contact-page">
      {/* =====================================================
          椤堕儴 Banner
      ===================================================== */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-hero-content">
            {/* 椤甸潰涓绘爣棰?*/}
            <h1 className="contact-hero-title">
              {data.hero.titlePrefix}
              <span>{data.hero.highlightText}</span>
              {data.hero.titleSuffix}
            </h1>

            {/* Banner 鎸夐挳缁?*/}
            <div className="contact-hero-actions">
              <button
                className="contact-button"
                type="button"
                onClick={() => scrollToSection("support")}
              >
                {data.hero.buttons.support.label}
              </button>

              <button
                className="contact-button"
                type="button"
                onClick={() => scrollToSection("form")}
              >
                {data.hero.buttons.form.label}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          鏀寔鍐呭妯″潡
      ===================================================== */}
      <section className="contact-section contact-support-section" id="support">
        <div className="contact-section-inner">
          {/* 妯″潡鏍囬 */}
          <div className="contact-section-head">
            <h2 className="contact-section-title">{data.support.title}</h2>
            <p className="contact-section-desc">{data.support.description}</p>
          </div>

          {/* 鏀寔鍐呭鍗＄墖 */}
          <div className="contact-support-grid">
            {data.support.items.map((item) => (
              <button
                key={item.key}
                className="contact-support-item"
                type="button"
                onClick={() => handleSupportItemClick(item.requestType)}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          琛ㄥ崟妯″潡
      ===================================================== */}
      <ContactFormSection
        data={data}
        presetRequestType={selectedRequestType}
      />

      {/* =====================================================
          鑱旂郴鏂瑰紡 + 楂樺痉鍦板浘
      ===================================================== */}
      <section
        className="contact-section contact-info-section"
        id="contact-info"
      >
        <div className="contact-section-inner">
          {/* 妯″潡鏍囬 */}
          <div className="contact-section-head">
            <h2 className="contact-section-title">{data.contactInfo.title}</h2>
            <p className="contact-section-desc">
              {data.contactInfo.description}
            </p>
          </div>

          <div className="contact-info-layout">
            {/* 宸︿晶鍏徃鑱旂郴淇℃伅 */}
            <section className="contact-company-panel">
              <h3>
                {data.contactInfo.companyName}
                <span>{data.contactInfo.companyPosition}</span>
              </h3>

              {data.contactInfo.rows.map((row) => (
                <div className="contact-info-row" key={row.label}>
                  <div>{row.label}</div>
                  <div>{row.value}</div>
                </div>
              ))}
            </section>

            {/* 鍙充晶楂樺痉鍦板浘 */}
            <AmapBlock
              title={data.contactInfo.map.title}
              address={data.contactInfo.map.address}
              lng={data.contactInfo.map.lng}
              lat={data.contactInfo.map.lat}
              mapUrl={data.contactInfo.map.mapUrl}
              loadingText={data.form.mapTexts.loading}
              errorText={data.form.mapTexts.error}
              openMapText={data.form.mapTexts.openMap}
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          搴曢儴 CTA
      ===================================================== */}
      <section className="contact-bottom-cta">
        <div className="contact-bottom-cta-inner">
          <div>
            <h2>{data.bottomCta.title}</h2>
            <p>{data.bottomCta.description}</p>
          </div>

          <div className="contact-bottom-actions">
            <button
              className="contact-button"
              type="button"
              onClick={() => scrollToSection("form")}
            >
              {data.bottomCta.buttons.form.label}
            </button>

            <button
              className="contact-button"
              type="button"
              onClick={() => scrollToSection("contact-info")}
            >
              {data.bottomCta.buttons.contact.label}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
