// components/layout/SiteFooter.tsx
"use client";

// 网站底部 Footer 组件
//
// 说明：
// 1. 这个组件只负责 Footer 的布局和手机端栏目展开 / 收起
// 2. Footer 栏目、链接、公司信息、版权信息统一从 data/site-footer.ts 读取
// 3. 这样后续多语言维护时，不需要在组件里找中文文字
// 4. 手机端点击栏目标题，可以展开或收起对应栏目

import Link from "next/link";
import { useState } from "react";

import type { LocaleCode } from "@/lib/i18n";

import {
  getSiteFooterHref,
  getSiteFooterText,
  siteFooterData,
} from "@/data/site-footer";

/* ================================
   组件参数类型
================================ */

type SiteFooterProps = {
  locale: LocaleCode; // 当前语言，例如 zh-CN / en / es / fr / ko / ru
};

/**
 * SiteFooter
 * 网站最低栏 Footer
 *
 * 页面内容：
 * 1. 左侧 / 中间：Footer 导航栏目
 * 2. 右侧：公司名称、地址、地图、邮箱、电话、二维码
 * 3. 底部：备案号与版权信息
 */
export default function SiteFooter({ locale }: SiteFooterProps) {
  // 手机端当前展开的栏目 key
  // 说明：
  // 1. 空字符串表示没有栏目展开
  // 2. 点击同一个栏目时会收起
  const [openColumn, setOpenColumn] = useState("");

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__inner">
          {/* Footer 导航栏目 */}
          <div className="site-footer__nav-wrap">
            {siteFooterData.columns.map((column) => {
              const isOpen = openColumn === column.key;
              const columnTitle = getSiteFooterText(column.title, locale);

              return (
                <nav
                  key={column.key}
                  className={`site-footer__column ${isOpen ? "is-open" : ""}`}
                  aria-label={columnTitle}
                >
                  <button
                    className="site-footer__title"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenColumn(isOpen ? "" : column.key)}
                  >
                    {columnTitle}
                  </button>

                  <ul className="site-footer__list">
                    {column.links.map((link) => (
                      <li key={link.key}>
                        <Link href={getSiteFooterHref(link.href, locale)}>
                          {getSiteFooterText(link.label, locale)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}
          </div>

          {/* Footer 右侧公司信息 */}
          <div className="site-footer__right">
            <div className="site-footer__contact">
              <p className="site-footer__company">
                {getSiteFooterText(siteFooterData.companyName, locale)}
              </p>

              <p className="site-footer__contact-text">
                {getSiteFooterText(siteFooterData.addressLabel, locale)}：
                {getSiteFooterText(siteFooterData.address, locale)}

                <a
                  className="site-footer__map-link"
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                >
                  {getSiteFooterText(siteFooterData.mapLabel, locale)}
                </a>
              </p>

              <p className="site-footer__contact-text">
                {getSiteFooterText(siteFooterData.emailLabel, locale)}：
                {siteFooterData.email}
              </p>

              <p className="site-footer__contact-text">
                {getSiteFooterText(siteFooterData.phoneLabel, locale)}：
                {siteFooterData.phone}
              </p>
            </div>

            {/* 二维码区域 */}
            <div className="site-footer__qrcode-area">
              <div className="site-footer__qr-row">
                <div className="site-footer__qrcode-item">
                  <div className="site-footer__qrcode-box">
                    {getSiteFooterText(siteFooterData.wechatLabel, locale)}
                    <br />
                    {getSiteFooterText(
                      siteFooterData.qrCodePlaceholder,
                      locale,
                    )}
                  </div>

                  <span className="site-footer__qrcode-label">
                    {getSiteFooterText(siteFooterData.wechatLabel, locale)}
                  </span>
                </div>

                <div className="site-footer__qrcode-item">
                  <div className="site-footer__qrcode-box">
                    {getSiteFooterText(siteFooterData.douyinLabel, locale)}
                    <br />
                    {getSiteFooterText(
                      siteFooterData.qrCodePlaceholder,
                      locale,
                    )}
                  </div>

                  <span className="site-footer__qrcode-label">
                    {getSiteFooterText(siteFooterData.douyinLabel, locale)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer 最底部备案和版权 */}
      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <div className="site-footer__bottom-left">
            <p>{getSiteFooterText(siteFooterData.icp, locale)}</p>

            <p>{getSiteFooterText(siteFooterData.copyright, locale)}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}