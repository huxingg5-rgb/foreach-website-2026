/* =========================================================
   ContactPageContent.tsx
   恒永达官网｜联系我们页面主体组件

   文件路径：
   components/contact/ContactPageContent.tsx

   作用：
   1. 负责联系我们页面整体结构
   2. 渲染 Banner、支持内容、填写说明、表单、联系方式、地图、底部 CTA
   3. 表单逻辑交给 ContactInquiryForm.tsx
   4. 地图逻辑交给 AmapBlock.tsx
   5. PDF 生成逻辑交给 buildContactPdfHtml.ts

   规范说明：
   1. 当前文件只做页面结构和模块引用
   2. 不在这里写复杂表单 useState
   3. 不在这里写 PDF HTML
   4. 不在这里写高德地图初始化逻辑
========================================================= */

"use client"; // 当前组件需要支持点击支持卡片后滚动到表单，所以使用客户端组件

import { useState } from "react"; // 引入 React 状态管理，用于记录当前选中的需求类型

import type { ContactPageData } from "@/data/contact-cooperation"; // 引入联系我们页面数据类型
import AmapBlock from "@/components/contact/AmapBlock"; // 引入高德地图组件
import ContactInquiryForm from "@/components/contact/ContactInquiryForm"; // 引入独立联系需求表单组件


/* =========================================================
   组件 Props 类型
========================================================= */

type ContactPageContentProps = {
  data: ContactPageData; // 当前语言的联系我们页面数据
};


/* =========================================================
   平滑滚动到指定模块
   说明：
   1. 点击 Banner 按钮、支持卡片、底部 CTA 时使用
   2. 避免页面瞬间跳转，体验更平滑
========================================================= */

function scrollToSection(targetId: string) {
  const targetElement = document.getElementById(targetId); // 根据模块 id 获取页面元素

  if (!targetElement) return; // 如果页面中没有对应模块，则不执行

  targetElement.scrollIntoView({
    behavior: "smooth", // 平滑滚动
    block: "start", // 滚动到模块顶部
  });
}


/* =========================================================
   ContactPageContent 组件
========================================================= */

export default function ContactPageContent({ data }: ContactPageContentProps) {
  const [selectedRequestType, setSelectedRequestType] = useState(
    data.form.requestTypes[0] ?? "",
  ); // 当前选中的需求类型，默认取需求类型第一个选项


  /* =========================================================
     点击支持内容卡片
     说明：
     1. 根据支持卡片的 requestType 自动带入表单
     2. 然后滚动到表单区域
  ========================================================= */

  function handleSupportItemClick(requestType: string) {
    setSelectedRequestType(requestType); // 更新当前选中的需求类型

    window.setTimeout(() => {
      scrollToSection("form"); // 延迟滚动到表单，确保状态先更新
    }, 0);
  }


  return (
    <main className="contact-page">
      {/* =====================================================
          顶部 Banner
      ===================================================== */}
      <section className="contact-hero">
        <div className="contact-hero-inner">
          <div className="contact-hero-content">
            {/* 页面主标题 */}
            <h1 className="contact-hero-title">
              {data.hero.titlePrefix}
              <span>{data.hero.highlightText}</span>
              {data.hero.titleSuffix}
            </h1>

            {/* Banner 按钮组 */}
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
          支持内容模块
      ===================================================== */}
      <section className="contact-section contact-support-section" id="support">
        <div className="contact-section-inner">
          {/* 模块标题 */}
          <div className="contact-section-head">
            <h2 className="contact-section-title">{data.support.title}</h2>
            <p className="contact-section-desc">{data.support.description}</p>
          </div>

          {/* 支持内容卡片 */}
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
          表单模块
      ===================================================== */}
      <section className="contact-section contact-form-section" id="form">
        <div className="contact-section-inner">
          {/* 模块标题 */}
          <div className="contact-section-head">
            <h2 className="contact-section-title">{data.form.title}</h2>
            <p className="contact-section-desc">{data.form.description}</p>
          </div>

          <div className="contact-form-layout">
            {/* 左侧填写说明 */}
            <aside className="contact-guide-panel">
              <div className="contact-guide-head">
                <h3>{data.guide.title}</h3>
                <p>{data.guide.description}</p>
              </div>

              <div className="contact-guide-list">
                {data.guide.items.map((item) => (
                  <div className="contact-guide-item" key={item.number}>
                    <div className="contact-guide-number">{item.number}</div>

                    <div className="contact-guide-copy">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="contact-guide-note">{data.guide.note}</p>
            </aside>

            {/* 右侧联系需求表单 */}
            <ContactInquiryForm
              data={data}
              presetRequestType={selectedRequestType}
            />
          </div>
        </div>
      </section>


      {/* =====================================================
          联系方式 + 高德地图
      ===================================================== */}
      <section
        className="contact-section contact-info-section"
        id="contact-info"
      >
        <div className="contact-section-inner">
          {/* 模块标题 */}
          <div className="contact-section-head">
            <h2 className="contact-section-title">{data.contactInfo.title}</h2>
            <p className="contact-section-desc">
              {data.contactInfo.description}
            </p>
          </div>

          <div className="contact-info-layout">
            {/* 左侧公司联系信息 */}
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

            {/* 右侧高德地图 */}
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
          底部 CTA
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