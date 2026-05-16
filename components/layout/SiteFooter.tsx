"use client";

import { useState } from "react";

/**
 * SiteFooter
 * 网站最低栏 Footer
 *
 * 说明：
 * 1. 桌面端栏目直接展开
 * 2. 手机端栏目折叠，点击标题后展开
 * 3. 内容只保留当前确认过的官网栏目
 */
export default function SiteFooter() {
  /** 手机端当前展开的栏目 */
  const [openColumn, setOpenColumn] = useState("");

  const footerColumns = [
    {
      title: "首页",
      links: ["首页"],
    },
    {
      title: "产品中心",
      links: ["泵类", "阀类", "管路", "连接件", "采样针", "传感器"],
    },
    {
      title: "应用领域",
      links: ["IVD 体外诊断", "生命科学", "合成生物", "高端分析仪器", "实验室自动化"],
    },
    {
      title: "资源中心",
      links: ["产品资料下载", "产品目录", "认证与资质资料", "选型指南", "安装说明", "技术文章 / FAQ"],
    },
    {
      title: "关于我们",
      links: ["公司介绍", "研发制造能力", "质量体系", "企业资质", "全球服务"],
    },
    {
      title: "联系我们",
      links: ["询盘表单", "联系方式", "地址信息", "销售支持入口"],
    },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="site-footer__inner">
          <div className="site-footer__nav-wrap">
            {footerColumns.map((column) => {
              const isOpen = openColumn === column.title;

              return (
                <nav
                  key={column.title}
                  className={`site-footer__column ${isOpen ? "is-open" : ""}`}
                  aria-label={`${column.title}导航`}
                >
                  <button
                    className="site-footer__title"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenColumn(isOpen ? "" : column.title)}
                  >
                    {column.title}
                  </button>

                  <ul className="site-footer__list">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a href="#">{link}</a>
                      </li>
                    ))}
                  </ul>
                </nav>
              );
            })}
          </div>

          <div className="site-footer__right">
            <div className="site-footer__contact">
              <p className="site-footer__company">深圳市恒永达科技股份有限公司</p>

              <p className="site-footer__contact-text">
                地址：广东省深圳市光明区玉塘街道玉律社区光侨大道1008号裕丰达工业园2栋1301
                <a className="site-footer__map-link" href="#" target="_blank" rel="noreferrer">
                  查看地图
                </a>
              </p>

              <p className="site-footer__contact-text">邮箱：sales@foreachtek.com</p>
              <p className="site-footer__contact-text">咨询电话：0755 8655 3831</p>
            </div>

            <div className="site-footer__qrcode-area">
              <div className="site-footer__qr-row">
                <div className="site-footer__qrcode-item">
                  <div className="site-footer__qrcode-box">
                    公众号
                    <br />
                    二维码
                  </div>
                  <span className="site-footer__qrcode-label">公众号</span>
                </div>

                <div className="site-footer__qrcode-item">
                  <div className="site-footer__qrcode-box">
                    抖音
                    <br />
                    二维码
                  </div>
                  <span className="site-footer__qrcode-label">抖音</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <div className="site-footer__bottom-left">
            <p>粤ICP备XXXXXXXX号</p>
            <p>© 2026 深圳市恒永达科技股份有限公司 版权所有</p>
          </div>
        </div>
      </div>
    </footer>
  );
}