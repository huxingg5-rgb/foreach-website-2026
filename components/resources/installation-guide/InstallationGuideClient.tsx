"use client";

/* =========================================================
   InstallationGuideClient.tsx
   恒永达官网｜安装教程页面客户端组件

   文件路径：
   components/resources/installation-guide/InstallationGuideClient.tsx

   作用：
   1. 渲染安装教程列表页主体
   2. 处理搜索、筛选、折叠展开
   3. 删除原来的弹窗预览逻辑
   4. 点击教程卡片后，跳转到独立详情页
   5. 详情页当前先做空白页，后续再补视频、图文步骤、注意事项等内容
========================================================= */

import Link from "next/link";
import { useMemo, useState } from "react";
import type { CSSProperties } from "react";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";

import type {
  InstallationGuideCard,
  InstallationGuideFilterType,
  InstallationGuidePageData,
  InstallationGuideTreeChild,
  InstallationGuideTreeItem,
} from "@/data/resources/installation-guide/installation-guide.types";

type ActiveFilter = {
  type: InstallationGuideFilterType;
  id: string;
};

type InstallationGuideClientProps = {
  pageData: InstallationGuidePageData;
};

export default function InstallationGuideClient({
  pageData,
}: InstallationGuideClientProps) {
  const [keyword, setKeyword] = useState("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>({
    type: "all",
    id: "all",
  });
  const [openGroupId, setOpenGroupId] = useState<string | null>(null);

  /* =========================================================
     当前语言路径
     说明：
     1. 中文默认不加 /zh-CN
     2. 外语页面自动加 /en /es /fr /ko /ru
     3. 用于生成面包屑和详情页链接
  ========================================================= */
  const isChinesePage = pageData.locale === "zh-CN";
  const localePrefix = isChinesePage ? "" : `/${pageData.locale}`;

  /* =========================================================
     面包屑数据
  ========================================================= */
  const breadcrumbItems = [
    {
      label: isChinesePage ? "首页" : "Home",
      href: `${localePrefix || ""}/`,
    },
    {
      label: isChinesePage ? "资源中心" : "Resources",
      href: `${localePrefix}/resources`,
    },
    {
      label: isChinesePage ? "安装教程" : "Installation Guide",
    },
  ];

  /* =========================================================
     教程筛选
     说明：
     1. 根据左侧分类筛选
     2. 根据搜索关键词筛选
     3. 当前为前端静态筛选，后期可接后端搜索
  ========================================================= */
  const filteredGuides = useMemo(() => {
    const nextKeyword = keyword.trim().toLowerCase();

    return pageData.guides.filter((guide: InstallationGuideCard) => {
      let matchFilter = true;

      if (activeFilter.type === "category") {
        matchFilter = guide.category === activeFilter.id;
      }

      if (activeFilter.type === "series") {
        matchFilter = guide.series === activeFilter.id;
      }

      const searchText = [
        guide.title,
        guide.category,
        guide.series,
        guide.description,
        ...guide.tags,
        ...guide.keywords,
      ]
        .join(" ")
        .toLowerCase();

      const matchKeyword = !nextKeyword || searchText.includes(nextKeyword);

      return matchFilter && matchKeyword;
    });
  }, [activeFilter, keyword, pageData.guides]);

  /* =========================================================
     获取产品分类名称
  ========================================================= */
  function getCategoryName(categoryId: string) {
    return (
      pageData.sidebar.tree.find(
        (item: InstallationGuideTreeItem) => item.id === categoryId,
      )?.name ?? categoryId
    );
  }

  /* =========================================================
     点击父级分类
     说明：
     1. 没有子级的分类：直接筛选
     2. 有子级的分类：展开当前分类，并自动折叠其他分类
  ========================================================= */
  function handleParentClick(item: InstallationGuideTreeItem) {
    setActiveFilter({
      type: item.type,
      id: item.id,
    });

    if (item.children.length > 0) {
      setOpenGroupId((current) => (current === item.id ? null : item.id));
      return;
    }

    setOpenGroupId(null);
  }

  /* =========================================================
     点击子级分类
  ========================================================= */
  function handleChildClick(parentId: string, childId: string) {
    setActiveFilter({
      type: "series",
      id: childId,
    });

    setOpenGroupId(parentId);
  }

  /* =========================================================
     搜索
  ========================================================= */
  function handleSearch(nextKeyword: string) {
    setKeyword(nextKeyword);
  }

  return (
    <main className="installation-guide-page">
      {/* =====================================================
          面包屑导航
      ===================================================== */}
      <SiteBreadcrumb
        ariaLabel={isChinesePage ? "面包屑导航" : "Breadcrumb"}
        variant="bar"
        items={breadcrumbItems}
      />

      {/* =====================================================
          搜索栏
          说明：
          1. ResourceSearchBar 默认使用 frp-* class
          2. 样式来自接头替代查询页面 CSS
      ===================================================== */}
      <ResourceSearchBar
        value={keyword}
        onChange={setKeyword}
        onSearch={handleSearch}
        placeholder={pageData.search.placeholder}
        searchButtonText={pageData.search.buttonText}
        recentLabel={pageData.search.recentLabel}
        recentKeywords={pageData.search.recentKeywords}
      />

      {/* =====================================================
          主体区域：左侧筛选 + 右侧教程卡片
      ===================================================== */}
      <section className="installation-guide-main">
        <aside className="installation-guide-sidebar">
          <div className="installation-guide-sidebar-head">
            <strong>{pageData.sidebar.title}</strong>
          </div>

          <div className="installation-guide-tree">
            {pageData.sidebar.tree.map((item: InstallationGuideTreeItem) => {
              const hasChildren = item.children.length > 0;
              const isOpen = openGroupId === item.id;
              const isActive =
                activeFilter.type === item.type && activeFilter.id === item.id;

              return (
                <div
                  key={item.id}
                  className={`installation-guide-tree-group ${
                    isOpen ? "is-open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className={`installation-guide-tree-parent ${
                      isActive ? "is-active" : ""
                    } ${hasChildren ? "has-children" : "no-children"}`}
                    onClick={() => handleParentClick(item)}
                  >
                    <strong>{item.name}</strong>
                    <span aria-hidden="true" />
                  </button>

                  {hasChildren && (
                    <div className="installation-guide-tree-children">
                      {item.children.map(
                        (child: InstallationGuideTreeChild) => {
                          const isChildActive =
                            activeFilter.type === "series" &&
                            activeFilter.id === child.id;

                          return (
                            <button
                              key={child.id}
                              type="button"
                              className={`installation-guide-tree-child ${
                                isChildActive ? "is-active" : ""
                              }`}
                              onClick={() => handleChildClick(item.id, child.id)}
                            >
                              {child.name}
                            </button>
                          );
                        },
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        <section className="installation-guide-content">
          {filteredGuides.length > 0 ? (
            <div className="installation-guide-card-grid">
              {filteredGuides.map((guide: InstallationGuideCard) => {
                const imageStyle: CSSProperties | undefined = guide.thumbnail
                  ? {
                      backgroundImage: `url(${guide.thumbnail})`,
                    }
                  : undefined;

                const detailHref = `${localePrefix}/resources/installation-guide/${guide.id}`;

                return (
                  <Link
                    key={guide.id}
                    className="installation-guide-card"
                    href={detailHref}
                  >
                    <div
                      className="installation-guide-card-image"
                      style={imageStyle}
                    />

                    <div className="installation-guide-card-body">
                      <h3>{guide.title}</h3>

                      <div className="installation-guide-card-info">
                        <div>
                          <strong>产品分类：</strong>
                          <b>{getCategoryName(guide.category)}</b>
                        </div>

                        <div>
                          <strong>标签：</strong>
                          <span className="installation-guide-tags">
                            {guide.tags.map((tag: string) => (
                              <span key={tag}>{tag}</span>
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="installation-guide-empty">
              <strong>暂无匹配教程</strong>
              <span>可以更换关键词，或选择其他产品系列查看。</span>
            </div>
          )}
        </section>
      </section>

      {/* =====================================================
          全屏宽度底部支持 Banner
      ===================================================== */}
      <ResourceSupportCta
        title="没有找到对应教程？"
        description="如果您不确定产品安装方式、调试步骤或参数设置方法，可以提交产品型号、应用场景或问题说明，FOREACH 技术团队将为您提供支持。"
        buttonText="提交教程需求"
        href="/contact"
      />
    </main>
  );
} 