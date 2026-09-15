// 这是关于 components/home/HomeNewsSection.tsx 的文件：用于管理首页第 5 屏「资讯中心」模块
// 这个文件的作用：只负责资讯中心模块的页面布局和分类按钮交互，不再直接写死新闻内容
// 数据来源说明：新闻标题、分类、日期、图片、描述和链接统一从 data/home-news.ts 读取
// 后端预留说明：后期接后台 / CMS 时，优先替换 data/home-news.ts 的数据来源，组件结构不用大改

"use client"; // 这个组件需要点击分类按钮并切换 activeTab 状态，所以必须是客户端组件

import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于新闻页面或新闻详情页跳转
import { useState } from "react"; // 引入 React 的 useState，用于控制顶部分类按钮选中状态

import HomeNewsListItem from "@/components/home/HomeNewsListItem"; // 引入右侧单条新闻列表卡片组件

import type { LocaleCode } from "@/lib/i18n"; // 引入官网支持的语言代码类型，例如 zh-CN、en、es、fr、ko、ru

import { // 从首页新闻数据文件中引入数据和读取函数
  getHomeNewsHref, // 根据当前语言读取新闻链接
  getHomeNewsText, // 根据当前语言读取新闻文字
  homeNewsData, // 首页新闻模块数据
} from "@/data/home-news"; // 首页新闻数据文件路径

type HomeNewsSectionProps = { // 定义 HomeNewsSection 组件接收的参数类型
  locale: LocaleCode; // 当前页面语言，例如 zh-CN / en / es / fr / ko / ru
}; // HomeNewsSectionProps 类型定义结束

export default function HomeNewsSection({ locale }: HomeNewsSectionProps) { // 定义并导出首页资讯中心组件
  const [activeTab, setActiveTab] = useState(""); // 当前选中的新闻分类 key，空字符串表示没有选中分类

  const featureNews = homeNewsData.featureNews; // 读取左侧主推新闻数据

  const highlightNews = homeNewsData.highlightNews; // 读取中间公告卡片数据

  const sideNewsList = homeNewsData.newsList; // 读取右侧新闻列表数据

  const featureNewsImage = featureNews.image || "/images/home/news/news-feature-01.webp"; // 左侧主推新闻图片，如果数据为空则使用默认图

  return ( // 返回资讯中心模块结构
    <section // 首页资讯中心模块最外层开始
      className="home-news-screen" // 首页资讯中心模块样式 class
      id={homeNewsData.sectionId} // 新闻模块锚点 id，当前为 news
      aria-labelledby="news-title" // 绑定标题 id，提升无障碍语义
    > {/* 首页资讯中心模块最外层开始标签结束 */}
      <div className="home-news-inner"> {/* 新闻模块内容居中容器 */}
        <header className="home-news-header"> {/* 新闻模块顶部区域 */}
          <div className="home-news-title-wrap"> {/* 新闻标题容器 */}
            <h2 id="news-title" className="home-news-main-title"> {/* 新闻模块主标题 */}
              {getHomeNewsText(homeNewsData.title, locale)} {/* 根据当前语言显示“资讯中心 / News Center”等标题 */}
            </h2> {/* 新闻模块主标题结束 */}
          </div> {/* 新闻标题容器结束 */}

          <nav hidden // 新闻分类按钮导航开始
            className="home-news-controls" // 新闻分类按钮区域 class
            aria-label={getHomeNewsText(homeNewsData.tabsAriaLabel, locale)} // 新闻分类按钮区域无障碍说明
          > {/* 新闻分类按钮导航开始标签结束 */}
            {homeNewsData.tabs.map((tab) => ( // 遍历新闻分类按钮 */}
              <button // 单个分类按钮开始
                key={tab.key} // React 列表 key
                type="button" // 设置为普通按钮，避免触发表单提交
                className={`home-news-tab-btn ${activeTab === tab.key ? "active" : ""}`} // 当前分类被选中时增加 active class
                onClick={() => { // 点击分类按钮时执行
                  setActiveTab((current) => (current === tab.key ? "" : tab.key)); // 再次点击同一个分类取消选中，点击不同分类切换选中
                }} // 点击事件结束
              > {/* 单个分类按钮开始标签结束 */}
                {getHomeNewsText(tab.label, locale)} {/* 分类按钮多语言文字 */}
              </button> // 单个分类按钮结束
            ))} {/* 新闻分类按钮遍历结束 */}
          </nav> {/* 新闻分类按钮导航结束 */}
        </header> {/* 新闻模块顶部区域结束 */}

        <div className="home-news-layout"> {/* 新闻模块三栏布局 */}
          <article className="home-news-feature-card"> {/* 左侧：主推新闻大卡片 */}
            <img // 左侧主推新闻图片容器开始
              className="home-news-feature-image" // 左侧主推新闻图片 class
              src={featureNewsImage}
              alt=""
              width={1200}
              height={465}
              loading="lazy"
              decoding="async"
              aria-hidden="true" // 图片作为装饰背景，不重复朗读
            /> {/* 左侧主推新闻图片容器结束 */}

            <div className="home-news-feature-body"> {/* 左侧主推新闻文字内容区域 */}
              <div className="home-news-meta-row"> {/* 左侧主推新闻分类和日期行 */}
                <span className="home-news-category"> {/* 左侧主推新闻分类 */}
                  {getHomeNewsText(featureNews.categoryLabel, locale)} {/* 左侧主推新闻分类多语言文字 */}
                </span> {/* 左侧主推新闻分类结束 */}

                <span className="home-news-date"> {/* 左侧主推新闻日期 */}
                  {featureNews.date} {/* 左侧主推新闻日期文字 */}
                </span> {/* 左侧主推新闻日期结束 */}
              </div> {/* 左侧主推新闻分类和日期行结束 */}

              <h3 className="home-news-feature-title text-limit limit-3"> {/* 左侧主推新闻标题，限制三行 */}
                {getHomeNewsText(featureNews.title, locale)} {/* 左侧主推新闻标题多语言文字 */}
              </h3> {/* 左侧主推新闻标题结束 */}

              <p className="home-news-feature-desc text-limit limit-4"> {/* 左侧主推新闻描述，限制四行 */}
                {featureNews.description // 如果存在描述
                  ? getHomeNewsText(featureNews.description, locale) // 显示对应语言描述
                  : ""} {/* 如果没有描述，则显示空字符串 */}
              </p> {/* 左侧主推新闻描述结束 */}

              <div className="home-news-card-footer"> {/* 左侧主推新闻底部按钮区域 */}
                <Link // 左侧主推新闻查看详情链接开始
                  className="home-news-text-link" // 查看详情链接 class
                  href={getHomeNewsHref(featureNews.href, locale)} // 根据当前语言读取跳转链接
                  prefetch={false}
                > {/* 左侧主推新闻查看详情链接开始标签结束 */}
                  {getHomeNewsText(homeNewsData.viewDetailLabel, locale)} {/* 查看详情按钮文字 */}
                </Link> {/* 左侧主推新闻查看详情链接结束 */}
              </div> {/* 左侧主推新闻底部按钮区域结束 */}
            </div> {/* 左侧主推新闻文字内容区域结束 */}
          </article> {/* 左侧：主推新闻大卡片结束 */}

          <article className="home-news-highlight-card"> {/* 中间：重点公告深蓝卡片 */}
            <div className="home-news-highlight-meta"> {/* 中间公告分类和日期行 */}
              <span className="home-news-highlight-type"> {/* 中间公告分类 */}
                {getHomeNewsText(highlightNews.categoryLabel, locale)} {/* 中间公告分类多语言文字 */}
              </span> {/* 中间公告分类结束 */}

              <span className="home-news-highlight-date"> {/* 中间公告日期 */}
                {highlightNews.date} {/* 中间公告日期文字 */}
              </span> {/* 中间公告日期结束 */}
            </div> {/* 中间公告分类和日期行结束 */}

            <h3 className="home-news-highlight-title text-limit limit-3"> {/* 中间公告标题，限制三行 */}
              {getHomeNewsText(highlightNews.title, locale)} {/* 中间公告标题多语言文字 */}
            </h3> {/* 中间公告标题结束 */}

            <p className="home-news-highlight-desc text-limit limit-5"> {/* 中间公告描述，限制五行 */}
              {highlightNews.description // 如果存在公告描述
                ? getHomeNewsText(highlightNews.description, locale) // 显示对应语言公告描述
                : ""} {/* 如果没有描述，则显示空字符串 */}
            </p> {/* 中间公告描述结束 */}

            <div className="home-news-highlight-footer"> {/* 中间公告底部按钮区域 */}
              <Link // 中间公告查看详情链接开始
                className="home-news-highlight-btn" // 中间公告按钮 class
                href={getHomeNewsHref(highlightNews.href, locale)} // 根据当前语言读取公告跳转链接
                prefetch={false}
                aria-label={getHomeNewsText(homeNewsData.viewAnnouncementAriaLabel, locale)} // 公告按钮无障碍说明
              > {/* 中间公告查看详情链接开始标签结束 */}
                {getHomeNewsText(homeNewsData.viewDetailLabel, locale)} {/* 查看详情按钮文字 */}
              </Link> {/* 中间公告查看详情链接结束 */}
            </div> {/* 中间公告底部按钮区域结束 */}
          </article> {/* 中间：重点公告深蓝卡片结束 */}

          <aside // 右侧：新闻列表开始
            className="home-news-right" // 右侧新闻列表区域 class
            aria-label={getHomeNewsText(homeNewsData.newsListAriaLabel, locale)} // 右侧新闻列表无障碍说明
          > {/* 右侧：新闻列表开始标签结束 */}
            <div className="home-news-list-panel"> {/* 右侧新闻列表卡片容器 */}
              {sideNewsList.map((item, index) => ( // 遍历右侧新闻列表 */}
                <HomeNewsListItem // 调用右侧单条新闻列表卡片组件
                  key={item.key} // React 列表 key
                  item={{ // 传给新闻列表卡片的标准化数据
                    id: item.key, // 新闻 ID
                    title: getHomeNewsText(item.title, locale), // 新闻标题
                    desc: item.description ? getHomeNewsText(item.description, locale) : "", // 新闻描述
                    date: item.date, // 新闻日期
                    image: item.image || `/images/home/news/news-side-0${index + 1}.webp`, // 新闻缩略图，若数据为空则使用默认图
                    href: getHomeNewsHref(item.href, locale), // 新闻跳转链接
                  }} // item 数据结束
                  detailText={getHomeNewsText(homeNewsData.viewDetailLabel, locale)} // 查看详情按钮文字
                /> // 右侧单条新闻列表卡片组件结束
              ))} {/* 右侧新闻列表遍历结束 */}
            </div> {/* 右侧新闻列表卡片容器结束 */}

            <div className="home-news-bottom-actions"> {/* 右下角查看更多按钮区域 */}
              <Link // 查看更多新闻链接开始
                className="home-news-view-all-btn" // 查看更多按钮 class
                href={getHomeNewsHref(homeNewsData.moreNewsHref, locale)} // 根据当前语言读取更多新闻链接
                prefetch={false}
              > {/* 查看更多新闻链接开始标签结束 */}
                {getHomeNewsText(homeNewsData.moreNewsLabel, locale)} <span>›</span> {/* 更多新闻按钮文字和箭头 */}
              </Link> {/* 查看更多新闻链接结束 */}
            </div> {/* 右下角查看更多按钮区域结束 */}
          </aside> {/* 右侧：新闻列表结束 */}
        </div> {/* 新闻模块三栏布局结束 */}
      </div> {/* 新闻模块内容居中容器结束 */}
    </section> // 首页资讯中心模块最外层结束
  ); // 返回资讯中心模块结构结束
} // HomeNewsSection 组件结束
