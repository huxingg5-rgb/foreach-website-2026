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
import ResourceCategorySidebar from "@/components/resources/ResourceCategorySidebar";
import ResourcePagination from "@/components/resources/ResourcePagination";
import { INSTALLATION_GUIDE_PAGE_SIZE, getInstallationGuidePageHref, guidePaginationCopy } from "@/data/resources/installation-guide/installation-guide-pagination";
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
  InstallationGuideTreeItem,
} from "@/data/resources/installation-guide/installation-guide.types";

type ActiveFilter = {
  type: InstallationGuideFilterType;
  id: string;
};

type InstallationGuideClientProps = {
  pageData: InstallationGuidePageData;
  initialPage?: number;
};

function formatInstallationGuideCount(
  locale: InstallationGuidePageData["locale"],
  count: number,
) {
  return locale === "zh-CN" ? `（${count}）` : ` (${count})`;
}

export default function InstallationGuideClient({
  pageData,
  initialPage = 1,
}: InstallationGuideClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [filteredPagination, setFilteredPagination] = useState({ key: "", page: 1 });
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

  const guideCounts = useMemo(() => {
    const category = new Map<string, number>();
    const series = new Map<string, number>();

    for (const guide of pageData.guides) {
      category.set(
        guide.category,
        (category.get(guide.category) ?? 0) + 1,
      );
      series.set(
        guide.series,
        (series.get(guide.series) ?? 0) + 1,
      );
    }

    return {
      all: pageData.guides.length,
      category,
      series,
    };
  }, [pageData.guides]);

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

    // Existing search/bookmark URLs should open the completed watch page too.
    if (requestedGuide.detailHref) {
      router.replace(requestedGuide.detailHref);
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
  }, [pageData.guides, requestedGuideId, router]);

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
      ...(initialPage > 1 ? { href: getInstallationGuidePageHref(pageData.locale) } : {}),
    },
    ...(initialPage > 1 ? [{ label: guidePaginationCopy[pageData.locale].page(initialPage) }] : []),
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

  const hasFilters = activeFilter.type !== "all" || Boolean(keyword.trim()) || Boolean(relationKey);
  const filterKey = JSON.stringify([activeFilter.type, activeFilter.id, keyword, relationKey]);
  const totalPages = Math.max(1, Math.ceil(filteredGuides.length / INSTALLATION_GUIDE_PAGE_SIZE));
  const currentPage = Math.min(totalPages, hasFilters
    ? (filteredPagination.key === filterKey ? filteredPagination.page : 1)
    : initialPage);
  const pagedGuides = filteredGuides.slice(
    (currentPage - 1) * INSTALLATION_GUIDE_PAGE_SIZE,
    currentPage * INSTALLATION_GUIDE_PAGE_SIZE,
  );
  const paginationUi = guidePaginationCopy[pageData.locale];

  function handleParentClick(
    item: InstallationGuideTreeItem,
  ) {
    setFilteredPagination({ key: "", page: 1 });
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
    setFilteredPagination({ key: "", page: 1 });
    setActiveFilter({
      type: "series",
      id: childId,
    });

    setOpenGroupId(parentId);
  }

  function handleSearch(nextKeyword: string) {
    setFilteredPagination({ key: "", page: 1 });
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
        onChange={handleSearch}
        onSearch={handleSearch}
        placeholder={pageData.search.placeholder}
        searchButtonText={pageData.search.buttonText}
        recentLabel={pageData.search.recentLabel}
        historyKey={`installation-guide:${pageData.locale}`}
        historyLocale={pageData.locale}
      />

      {/* =====================================================
          左侧筛选 + 右侧教程卡片
      ===================================================== */}

      <section className="installation-guide-main" id="guide-list">
        <ResourceCategorySidebar
          title={pageData.sidebar.title}
          items={pageData.sidebar.tree.map((item) => ({
            id: item.id,
            label: item.name,
            countLabel: formatInstallationGuideCount(
              pageData.locale,
              item.type === "all" ? guideCounts.all
                : item.type === "series" ? guideCounts.series.get(item.id) ?? 0
                : guideCounts.category.get(item.id) ?? 0,
            ),
            active: activeFilter.type === item.type && activeFilter.id === item.id,
            expanded: openGroupId === item.id,
            onSelect: () => handleParentClick(item),
            children: item.children.map((child) => ({
              id: child.id,
              label: child.name,
              countLabel: formatInstallationGuideCount(pageData.locale, guideCounts.series.get(child.id) ?? 0),
              active: activeFilter.type === "series" && activeFilter.id === child.id,
              onSelect: () => handleChildClick(item.id, child.id),
            })),
          }))}
        />

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
            <>
            <div className="installation-guide-card-grid">
              {pagedGuides.map((guide: InstallationGuideCard) => (
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
            <ResourcePagination
              currentPage={currentPage}
              totalPages={totalPages}
              ariaLabel={paginationUi.pagination}
              previousLabel={paginationUi.previous}
              nextLabel={paginationUi.next}
              {...(hasFilters ? {
                onPageChange: (page: number) => setFilteredPagination({ key: filterKey, page }),
              } : {
                getPageHref: (page: number) => `${getInstallationGuidePageHref(pageData.locale, page)}#guide-list`,
              })}
            />
            </>
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
            ? "如果您不确定产品安装方式、调试步骤或参数设置方法，可以提交产品型号、应用场景或问题说明，Foreach 技术团队将为您提供支持。"
            : pageData.locale === "en"
              ? "Send us the product model, application, or issue details, and the Foreach technical team will help with installation, commissioning, or parameter setup."
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
