// 这是关于 components/layout/SiteFooter.tsx 的文件：用于管理网站底部 Footer 组件
// 这个文件的作用：负责 Footer 的页面布局、栏目链接、公司信息、联系方式、二维码区域和手机端栏目展开收起
// 国内 / 海外预留说明：Footer 文案从 data/site-footer.ts 读取，zh-CN 使用国内版，其他语言使用海外版
// 后端接口预留说明：后期可以通过 data/site-footer.ts 里的 getSiteFooterApiPath(locale) 对接 /api/site-footer?market=china 或 /api/site-footer?market=global

"use client"; // Footer 在手机端需要点击展开 / 收起栏目，所以必须是客户端组件

import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于站内链接跳转
import { useState } from "react"; // 引入 useState，用于控制手机端 Footer 栏目展开状态

import type { LocaleCode } from "@/lib/i18n"; // 引入官网支持的语言代码类型，例如 zh-CN / en / es / fr / ko / ru

import { // 从 Footer 数据文件中引入数据和读取函数
  getSiteFooterHref, // 根据当前语言读取 Footer 链接路径
  getSiteFooterText, // 根据当前语言读取 Footer 显示文字
  siteFooterData, // Footer 栏目、公司信息、联系方式等数据
} from "@/data/site-footer"; // Footer 数据文件路径

type SiteFooterProps = { // 定义 SiteFooter 组件接收的参数类型
  locale: LocaleCode; // 当前页面语言，例如 zh-CN / en / es / fr / ko / ru
}; // SiteFooterProps 类型定义结束

export default function SiteFooter({ locale }: SiteFooterProps) { // 定义并导出网站底部 Footer 组件
  const [openColumn, setOpenColumn] = useState(""); // 手机端当前展开的栏目 key，空字符串表示没有栏目展开

  return ( // 返回 Footer 页面结构
    <footer className="site-footer"> {/* 网站底部 Footer 最外层 */}
      <div className="site-footer__main"> {/* Footer 主体区域 */}
        <div className="site-footer__inner"> {/* Footer 内容居中容器 */}
          <div className="site-footer__nav-wrap"> {/* Footer 左侧 / 中间导航栏目容器 */}
            {siteFooterData.columns.map((column) => { // 遍历 Footer 栏目数据
              const isOpen = openColumn === column.key; // 判断当前栏目是否处于展开状态
              const columnTitle = getSiteFooterText(column.title, locale); // 根据当前语言读取栏目标题

              return ( // 返回单个 Footer 栏目
                <nav // Footer 单个导航栏目开始
                  key={column.key} // React 列表 key
                  className={`site-footer__column ${isOpen ? "is-open" : ""}`} // 根据展开状态追加 is-open class
                  aria-label={columnTitle} // 给导航栏目提供无障碍说明
                > {/* Footer 单个导航栏目开始标签结束 */}
                  <button // 手机端栏目标题按钮开始
                    className="site-footer__title" // 栏目标题按钮 class
                    type="button" // 设置为普通按钮，避免触发表单行为
                    aria-expanded={isOpen} // 告诉屏幕阅读器当前栏目是否展开
                    onClick={() => setOpenColumn(isOpen ? "" : column.key)} // 点击同一个栏目收起，点击不同栏目展开
                  > {/* 手机端栏目标题按钮开始标签结束 */}
                    {columnTitle} {/* Footer 栏目标题 */}
                  </button> {/* 手机端栏目标题按钮结束 */}

                  <ul className="site-footer__list"> {/* Footer 栏目链接列表 */}
                    {column.links.map((link) => ( // 遍历当前栏目下的链接 */}
                      <li key={link.key}> {/* Footer 单个链接列表项 */}
                        <Link href={getSiteFooterHref(link.href, locale)}> {/* 根据当前语言读取链接路径 */}
                          {getSiteFooterText(link.label, locale)} {/* 根据当前语言读取链接文字 */}
                        </Link> {/* Footer 链接结束 */}
                      </li> // Footer 单个链接列表项结束
                    ))} {/* Footer 栏目链接遍历结束 */}
                  </ul> {/* Footer 栏目链接列表结束 */}
                </nav> // Footer 单个导航栏目结束
              ); // 单个 Footer 栏目返回结束
            })} {/* Footer 栏目遍历结束 */}
          </div> {/* Footer 左侧 / 中间导航栏目容器结束 */}

          <div className="site-footer__right"> {/* Footer 右侧公司信息区域 */}
            <div className="site-footer__contact"> {/* Footer 公司联系方式容器 */}
              <p className="site-footer__company"> {/* Footer 公司名称 */}
                {getSiteFooterText(siteFooterData.companyName, locale)} {/* 根据国内 / 海外版本显示公司名称 */}
              </p> {/* Footer 公司名称结束 */}

              <p className="site-footer__contact-text"> {/* Footer 地址信息 */}
                {getSiteFooterText(siteFooterData.addressLabel, locale)}：{/* 地址标签，例如“地址 / Address” */}
                {getSiteFooterText(siteFooterData.address, locale)} {/* 根据国内 / 海外版本显示地址 */}

                <a // 地图链接开始
                  className="site-footer__map-link" // 地图链接 class
                  href="#" // 地图链接暂时占位，后期可以换成真实地图 URL
                  target="_blank" // 新窗口打开地图
                  rel="noreferrer" // 避免传递来源信息
                > {/* 地图链接开始标签结束 */}
                  {getSiteFooterText(siteFooterData.mapLabel, locale)} {/* 地图按钮文字 */}
                </a> {/* 地图链接结束 */}
              </p> {/* Footer 地址信息结束 */}

              <p className="site-footer__contact-text"> {/* Footer 邮箱信息 */}
                {getSiteFooterText(siteFooterData.emailLabel, locale)}：{/* 邮箱标签 */}
                {getSiteFooterText(siteFooterData.email, locale)} {/* 根据国内 / 海外版本显示邮箱 */}
              </p> {/* Footer 邮箱信息结束 */}

              <p className="site-footer__contact-text"> {/* Footer 电话信息 */}
                {getSiteFooterText(siteFooterData.phoneLabel, locale)}：{/* 电话标签 */}
                {getSiteFooterText(siteFooterData.phone, locale)} {/* 根据国内 / 海外版本显示电话 */}
              </p> {/* Footer 电话信息结束 */}
            </div> {/* Footer 公司联系方式容器结束 */}

            <div className="site-footer__qrcode-area"> {/* Footer 二维码 / 社媒区域 */}
              <div className="site-footer__qr-row"> {/* Footer 二维码横向排列容器 */}
                <div className="site-footer__qrcode-item"> {/* 第一个二维码 / 社媒项 */}
                  <div className="site-footer__qrcode-box"> {/* 第一个二维码占位框 */}
                    {getSiteFooterText(siteFooterData.wechatLabel, locale)} {/* 国内显示公众号，海外可显示 LinkedIn */}
                    <br /> {/* 换行 */}
                    {getSiteFooterText(siteFooterData.qrCodePlaceholder, locale)} {/* 二维码 / 社媒占位文字 */}
                  </div> {/* 第一个二维码占位框结束 */}

                  <span className="site-footer__qrcode-label"> {/* 第一个二维码下方标签 */}
                    {getSiteFooterText(siteFooterData.wechatLabel, locale)} {/* 国内公众号 / 海外 LinkedIn */}
                  </span> {/* 第一个二维码下方标签结束 */}
                </div> {/* 第一个二维码 / 社媒项结束 */}

                <div className="site-footer__qrcode-item"> {/* 第二个二维码 / 社媒项 */}
                  <div className="site-footer__qrcode-box"> {/* 第二个二维码占位框 */}
                    {getSiteFooterText(siteFooterData.douyinLabel, locale)} {/* 国内显示抖音，海外可显示 YouTube */}
                    <br /> {/* 换行 */}
                    {getSiteFooterText(siteFooterData.qrCodePlaceholder, locale)} {/* 二维码 / 社媒占位文字 */}
                  </div> {/* 第二个二维码占位框结束 */}

                  <span className="site-footer__qrcode-label"> {/* 第二个二维码下方标签 */}
                    {getSiteFooterText(siteFooterData.douyinLabel, locale)} {/* 国内抖音 / 海外 YouTube */}
                  </span> {/* 第二个二维码下方标签结束 */}
                </div> {/* 第二个二维码 / 社媒项结束 */}
              </div> {/* Footer 二维码横向排列容器结束 */}
            </div> {/* Footer 二维码 / 社媒区域结束 */}
          </div> {/* Footer 右侧公司信息区域结束 */}
        </div> {/* Footer 内容居中容器结束 */}
      </div> {/* Footer 主体区域结束 */}

      <div className="site-footer__bottom"> {/* Footer 最底部备案和版权区域 */}
        <div className="site-footer__bottom-inner"> {/* Footer 底部内容居中容器 */}
          <div className="site-footer__bottom-left"> {/* Footer 底部左侧内容 */}
            <p>{getSiteFooterText(siteFooterData.icp, locale)}</p> {/* 国内显示备案号，海外可为空或显示其他说明 */}

            <p>{getSiteFooterText(siteFooterData.copyright, locale)}</p> {/* Footer 版权信息 */}
          </div> {/* Footer 底部左侧内容结束 */}
        </div> {/* Footer 底部内容居中容器结束 */}
      </div> {/* Footer 最底部备案和版权区域结束 */}
    </footer> // 网站底部 Footer 最外层结束
  ); // Footer 页面结构返回结束
} // SiteFooter 组件结束