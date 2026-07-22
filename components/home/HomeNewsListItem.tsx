// 这是关于 components/home/HomeNewsListItem.tsx 的文件：用于管理首页新闻模块右侧列表中的单条新闻卡片
// 这个文件的作用：把 HomeNewsSection.tsx 里的右侧新闻列表卡片拆出来，方便后续维护和复用
// 后端预留说明：这个组件不写死新闻内容，而是通过 props 接收 item 和 detailText，后期后台接口返回新闻列表后可以直接传进来

import Link from "next/link"; // 引入 Next.js 的 Link 组件，用于新闻详情页跳转

type HomeNewsListItemData = { // 定义单条新闻列表数据类型
  id: string; // 新闻稳定 ID，用于 React 列表 key 或后端数据标识
  title: string; // 新闻标题
  desc: string; // 新闻描述
  date: string; // 新闻发布日期
  image: string; // 新闻缩略图路径，后期可以替换为后端返回的图片 URL
  href: string; // 新闻跳转链接，后期可以替换为真实详情页链接
}; // HomeNewsListItemData 类型定义结束

type HomeNewsListItemProps = { // 定义 HomeNewsListItem 组件接收的参数类型
  item: HomeNewsListItemData; // 当前这一条新闻数据
  detailText: string; // “查看详情”按钮文字，支持多语言从父组件传入
}; // HomeNewsListItemProps 类型定义结束

export default function HomeNewsListItem({ // 定义并导出首页新闻右侧单条新闻卡片组件
  item, // 接收当前新闻数据
  detailText, // 接收“查看详情”按钮文字
}: HomeNewsListItemProps) { // 组件参数定义结束
  return ( // 返回单条新闻卡片结构
    <article className="home-news-list-item"> {/* 单条新闻卡片最外层 */}
      <div // 新闻缩略图容器开始
        className="home-news-list-thumb" // 新闻缩略图样式 class
        style={{ // 设置内联背景图样式
          backgroundImage: `url(${item.image})`, // 使用当前新闻的图片作为背景图
        }} // 内联样式结束
        aria-hidden="true" // 缩略图是装饰图，避免屏幕阅读器重复读取
      /> {/* 新闻缩略图容器结束 */}

      <div className="home-news-list-content"> {/* 新闻文字内容区域 */}
        <div className="home-news-list-header"> {/* 新闻标题区域 */}
          <h3 className="home-news-list-title">{item.title}</h3> {/* 新闻标题 */}
        </div> {/* 新闻标题区域结束 */}

        <p className="home-news-list-desc text-limit limit-2"> {/* 新闻描述，限制显示两行 */}
          {item.desc} {/* 新闻描述文字 */}
        </p> {/* 新闻描述结束 */}

        <div className="home-news-list-bottom"> {/* 新闻底部区域：日期 + 查看详情 */}
          <span className="home-news-list-date">{item.date}</span> {/* 新闻发布日期 */}

          <Link className="home-news-list-more" href={item.href}> {/* 查看详情链接 */}
            {detailText} {/* 查看详情多语言文字 */}
          </Link> {/* 查看详情链接结束 */}
        </div> {/* 新闻底部区域结束 */}
      </div> {/* 新闻文字内容区域结束 */}
    </article> // 单条新闻卡片最外层结束
  ); // 返回单条新闻卡片结构结束
} // HomeNewsListItem 组件结束