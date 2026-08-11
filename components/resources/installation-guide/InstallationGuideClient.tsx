"use client";

/* =========================================================
   InstallationGuideClient.tsx
   恒永达官网｜安装教程页面客户端组件

   本次调整：
   1. 取消教程卡片跳转详情页
   2. 页面上方增加视频播放器
   3. 点击卡片后切换视频并平滑滚动到播放器
   4. 支持本地视频、YouTube 和 Bilibili
   5. 当前播放卡片增加选中状态
========================================================= */

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import SiteBreadcrumb from "@/components/common/SiteBreadcrumb";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import TutorialVideoCard from "@/components/resources/installation-guide/TutorialVideoCard";
import InstallationGuideSearchParamsSync, {
  type InstallationGuideSearchParamsSnapshot,
} from "@/components/resources/installation-guide/InstallationGuideSearchParamsSync";
import TutorialVideoPlayerModal, {
  getGuidePlayerSource,
} from "@/components/resources/installation-guide/TutorialVideoPlayerModal";
import { getRelatedResourcesText } from "@/data/resources/related-resources/related-resources.intl";
import { trackResourceView } from "@/lib/analytics/track-event";
import {
  hasSharedRelationKey,
  normalizeRelationKey,
} from "@/lib/related-resources";

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
  const pathname = usePathname();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [searchParamsSnapshot, setSearchParamsSnapshot] =
    useState<InstallationGuideSearchParamsSnapshot>({
      relationKey: "",
      guideId: "",
      queryString: "",
    });

  const [activeFilter, setActiveFilter] =
    useState<ActiveFilter>({
      type: "all",
      id: "all",
    });

  const [openGroupId, setOpenGroupId] =
    useState<string | null>(null);

  /*
   * 页面首次进入时：
   * 1. 优先选中第一条已经配置 videoUrl 的教程
   * 2. 如果暂时都没有视频，则选中第一条教程
   * 3. 首次加载不自动播放
   */
  const [selectedGuide, setSelectedGuide] =
    useState<InstallationGuideCard | null>(() => {
      return (
        pageData.guides.find((guide) =>
          Boolean(String(guide.videoUrl ?? "").trim()),
        ) ??
        pageData.guides[0] ??
        null
      );
    });

  /*
   * 每次点击卡片时增加编号。
   * 即使连续点击同一张卡片，也会重新加载并播放。
   */
  const [playRequestId, setPlayRequestId] =
    useState(0);

  /*
   * 控制播放器弹层是否打开。
   * 页面首次进入时不显示播放器，只有点击教程卡片后才打开。
   */
  const [isPlayerOpen, setIsPlayerOpen] =
    useState(false);

  const isChinesePage =
    pageData.locale === "zh-CN";

  const localePrefix =
    isChinesePage ? "" : `/${pageData.locale}`;

  const ui = pageData.ui ?? {
    breadcrumbAriaLabel:
      isChinesePage ? "面包屑导航" : "Breadcrumb",

    breadcrumbHome:
      isChinesePage ? "首页" : "Home",

    breadcrumbResources:
      isChinesePage ? "资源中心" : "Resources",

    breadcrumbCurrent:
      isChinesePage ? "使用教程" : "Usage Guide",

    productCategory:
      isChinesePage ? "产品分类：" : "Product Category: ",

    tags:
      isChinesePage ? "标签：" : "Tags: ",

    emptyTitle:
      isChinesePage
        ? "暂无匹配教程"
        : "No matching guides found",

    emptyDescription:
      isChinesePage
        ? "欢迎发送邮件说明产品型号和具体问题，我们将与您沟通并评估制作相关教程。"
        : "Try another keyword or select a different product series.",
  };

  const relatedResourcesUi = getRelatedResourcesText(pageData.locale);
  const relationKey = normalizeRelationKey(
    searchParamsSnapshot.relationKey,
  );

  /* SEARCH_GUIDE_AUTO_OPEN_20260805 */
  const requestedGuideId = searchParamsSnapshot.guideId;

  const handleSearchParamsChange = useCallback(
    (snapshot: InstallationGuideSearchParamsSnapshot) => {
      setSearchParamsSnapshot((current) => {
        if (
          current.relationKey === snapshot.relationKey &&
          current.guideId === snapshot.guideId &&
          current.queryString === snapshot.queryString
        ) {
          return current;
        }

        return snapshot;
      });
    },
    [],
  );

  /*
   * 从全站搜索进入时：
   * 1. 保留现有使用教程页面
   * 2. 根据 guide 参数查找对应教程
   * 3. 自动打开现有视频播放器
   * 4. 不创建新的详情页
   */
  useEffect(() => {
    if (!requestedGuideId) {
      return;
    }

    const requestedGuide = pageData.guides.find(
      (guide) => guide.id === requestedGuideId,
    );

    if (!requestedGuide) {
      return;
    }

    const openPlayerTimer = window.setTimeout(() => {
      setSelectedGuide(requestedGuide);
      setIsPlayerOpen(true);
      setPlayRequestId(
        (currentId) => currentId + 1,
      );
    }, 0);

    return () => {
      window.clearTimeout(openPlayerTimer);
    };
  }, [pageData.guides, requestedGuideId]);

  const breadcrumbItems = [
    {
      label: ui.breadcrumbHome,
      href: `${localePrefix || ""}/`,
    },
    {
      label: ui.breadcrumbResources,
      href: `${localePrefix}/resources`,
    },
    {
      label: ui.breadcrumbCurrent,
    },
  ];

  /* =========================================================
     教程筛选
  ========================================================= */

  const filteredGuides = useMemo(() => {
    const nextKeyword =
      keyword.trim().toLowerCase();

    return pageData.guides.filter(
      (guide: InstallationGuideCard) => {
        let matchFilter = true;

        if (activeFilter.type === "category") {
          matchFilter =
            guide.category === activeFilter.id;
        }

        if (activeFilter.type === "series") {
          matchFilter =
            guide.series === activeFilter.id;
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

        const matchKeyword =
          !nextKeyword ||
          searchText.includes(nextKeyword);

        const matchRelationKey =
          !relationKey ||
          hasSharedRelationKey([relationKey], guide.relationKeys);

        return matchFilter && matchKeyword && matchRelationKey;
      },
    );
  }, [
    activeFilter,
    keyword,
    pageData.guides,
    relationKey,
  ]);

  function handleParentClick(
    item: InstallationGuideTreeItem,
  ) {
    setActiveFilter({
      type: item.type,
      id: item.id,
    });

    if (item.children.length > 0) {
      setOpenGroupId((current) =>
        current === item.id ? null : item.id,
      );

      return;
    }

    setOpenGroupId(null);
  }

  function handleChildClick(
    parentId: string,
    childId: string,
  ) {
    setActiveFilter({
      type: "series",
      id: childId,
    });

    setOpenGroupId(parentId);
  }

  function handleSearch(nextKeyword: string) {
    setKeyword(nextKeyword);
  }

  function clearRelationFilter() {
    const nextSearchParams = new URLSearchParams(
      searchParamsSnapshot.queryString,
    );
    nextSearchParams.delete("relationKey");

    const query = nextSearchParams.toString();
    router.replace(`${pathname}${query ? `?${query}` : ""}`, {
      scroll: false,
    });
  }

  /* =========================================================
     点击教程卡片

     说明：
     1. 不再跳转 URL
     2. 切换上方播放器
     3. 平滑滚动到播放器
     4. 立即开始播放
  ========================================================= */

  function handleGuideClick(
    guide: InstallationGuideCard,
  ) {
    /*
     * 点击卡片后：
     * 1. 记录当前教程
     * 2. 打开页面上层弹窗
     * 3. 重新加载并播放对应视频
     * 4. 不改变 URL，不跳转页面
     */
    setSelectedGuide(guide);
    setIsPlayerOpen(true);

    setPlayRequestId(
      (currentId) => currentId + 1,
    );

    const playerSource = getGuidePlayerSource(guide, false);

    if (playerSource.type !== "empty") {
      const sourcePath = playerSource.src.split(/[?#]/)[0];
      const fileType =
        playerSource.type === "video"
          ? sourcePath.split(".").at(-1) || "video"
          : guide.videoPlatform || "embed";

      trackResourceView({
        resourceId: `installation_guide:${guide.id}`,
        resourceType: "installation_guide",
        fileType,
        sourceSection: "installation_guide_cards",
        locale: pageData.locale,
      });
    }
  }

  function closePlayer() {
    setIsPlayerOpen(false);
  }

  return (
    <main className="installation-guide-page">
      <Suspense fallback={null}>
        <InstallationGuideSearchParamsSync
          onChange={handleSearchParamsChange}
        />
      </Suspense>

      <SiteBreadcrumb
        ariaLabel={ui.breadcrumbAriaLabel}
        variant="bar"
        items={breadcrumbItems}
      />

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
          左侧筛选 + 右侧教程卡片
      ===================================================== */}

      <section className="installation-guide-main">
        <aside className="installation-guide-sidebar">
          <div className="installation-guide-sidebar-head">
            <strong>
              {pageData.sidebar.title}
            </strong>
          </div>

          <div className="installation-guide-tree">
            {pageData.sidebar.tree.map(
              (item: InstallationGuideTreeItem) => {
                const hasChildren =
                  item.children.length > 0;

                const isOpen =
                  openGroupId === item.id;

                const isActive =
                  activeFilter.type === item.type &&
                  activeFilter.id === item.id;

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
                      } ${
                        hasChildren
                          ? "has-children"
                          : "no-children"
                      }`}
                      onClick={() =>
                        handleParentClick(item)
                      }
                    >
                      <strong>
                        {item.name}
                      </strong>

                      <span aria-hidden="true" />
                    </button>

                    {hasChildren ? (
                      <div className="installation-guide-tree-children">
                        {item.children.map(
                          (
                            child: InstallationGuideTreeChild,
                          ) => {
                            const isChildActive =
                              activeFilter.type ===
                                "series" &&
                              activeFilter.id ===
                                child.id;

                            return (
                              <button
                                key={child.id}
                                type="button"
                                className={`installation-guide-tree-child ${
                                  isChildActive
                                    ? "is-active"
                                    : ""
                                }`}
                                onClick={() =>
                                  handleChildClick(
                                    item.id,
                                    child.id,
                                  )
                                }
                              >
                                {child.name}
                              </button>
                            );
                          },
                        )}
                      </div>
                    ) : null}
                  </div>
                );
              },
            )}
          </div>
        </aside>

        <section className="installation-guide-content">
          {relationKey ? (
            <div className="installation-guide-relation-filter">
              <span>{relatedResourcesUi.activeSeriesFilter}</span>
              <button type="button" onClick={clearRelationFilter}>
                {relatedResourcesUi.clearSeriesFilter}
              </button>
            </div>
          ) : null}

          {filteredGuides.length > 0 ? (
            <div className="installation-guide-card-grid">
              {filteredGuides.map((guide: InstallationGuideCard) => (
                <TutorialVideoCard
                  key={guide.id}
                  guide={guide}
                  isSelected={
                    isPlayerOpen && selectedGuide?.id === guide.id
                  }
                  onSelect={handleGuideClick}
                />
              ))}
            </div>
          ) : (
            <div className="installation-guide-empty">
              <strong>
                {ui.emptyTitle}
              </strong>

              <span>
                {ui.emptyDescription}
              </span>
            </div>
          )}
        </section>
      </section>

      {isPlayerOpen && selectedGuide ? (
        <TutorialVideoPlayerModal
          guide={selectedGuide}
          locale={pageData.locale}
          playRequestId={playRequestId}
          onClose={closePlayer}
        />
      ) : null}

      <ResourceSupportCta
        title={
          isChinesePage
            ? "没有找到对应教程？"
            : pageData.locale === "en"
              ? "Need another guide?"
              : pageData.support.title
        }
        description={
          isChinesePage
            ? "如果您不确定产品安装方式、调试步骤或参数设置方法，可以提交产品型号、应用场景或问题说明，FOREACH 技术团队将为您提供支持。"
            : pageData.locale === "en"
              ? "Send us the product model, application, or issue details, and the FOREACH technical team will help with installation, commissioning, or parameter setup."
              : pageData.support.description
        }
        buttonText={
          isChinesePage
            ? "提交教程需求"
            : pageData.locale === "en"
              ? "Request a Guide"
              : pageData.support.buttonText
        }
        href={`${localePrefix}/contact`}
      />
    </main>
  );
}
