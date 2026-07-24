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
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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

type PlayerSource =
  | {
      type: "video";
      src: string;
    }
  | {
      type: "iframe";
      src: string;
    }
  | {
      type: "empty";
      src: "";
    };

type InstallationGuideLocale = InstallationGuidePageData["locale"];

const playerText: Record<
  InstallationGuideLocale,
  {
    eyebrow: string;
    emptyTitle: string;
    emptyDescription: string;
    unavailable: string;
    playLabel: string;
    selectedLabel: string;
  }
> = {
  "zh-CN": {
    eyebrow: "当前教程",
    emptyTitle: "请选择一个安装教程",
    emptyDescription: "点击下方教程卡片后，可直接在这里观看视频。",
    unavailable: "该教程视频暂未上传，请稍后查看或联系技术支持。",
    playLabel: "点击观看",
    selectedLabel: "正在播放",
  },

  en: {
    eyebrow: "Current Guide",
    emptyTitle: "Select an installation guide",
    emptyDescription:
      "Click a tutorial card below to watch the video on this page.",
    unavailable:
      "This tutorial video has not been uploaded yet. Please check again later or contact technical support.",
    playLabel: "Watch Video",
    selectedLabel: "Now Playing",
  },

  es: {
    eyebrow: "Tutorial actual",
    emptyTitle: "Seleccione un tutorial",
    emptyDescription:
      "Haga clic en una tarjeta para ver el vídeo directamente en esta página.",
    unavailable:
      "El vídeo de este tutorial todavía no está disponible.",
    playLabel: "Ver vídeo",
    selectedLabel: "Reproduciendo",
  },

  fr: {
    eyebrow: "Tutoriel actuel",
    emptyTitle: "Sélectionnez un tutoriel",
    emptyDescription:
      "Cliquez sur une carte pour regarder la vidéo directement sur cette page.",
    unavailable:
      "La vidéo de ce tutoriel n’est pas encore disponible.",
    playLabel: "Voir la vidéo",
    selectedLabel: "Lecture en cours",
  },

  ko: {
    eyebrow: "현재 튜토리얼",
    emptyTitle: "설치 튜토리얼을 선택하세요",
    emptyDescription:
      "아래 튜토리얼 카드를 클릭하면 이 페이지에서 바로 영상을 볼 수 있습니다.",
    unavailable:
      "이 튜토리얼 영상은 아직 업로드되지 않았습니다.",
    playLabel: "영상 보기",
    selectedLabel: "재생 중",
  },

  ru: {
    eyebrow: "Текущая инструкция",
    emptyTitle: "Выберите инструкцию",
    emptyDescription:
      "Нажмите карточку ниже, чтобы посмотреть видео на этой странице.",
    unavailable:
      "Видео для этой инструкции пока не загружено.",
    playLabel: "Смотреть видео",
    selectedLabel: "Сейчас воспроизводится",
  },
};

/* =========================================================
   给播放器地址增加查询参数
========================================================= */

function appendUrlParameters(
  value: string,
  parameters: Record<string, string>,
) {
  try {
    const url = new URL(value);

    Object.entries(parameters).forEach(([key, parameterValue]) => {
      url.searchParams.set(key, parameterValue);
    });

    return url.toString();
  } catch {
    const separator = value.includes("?") ? "&" : "?";

    const query = Object.entries(parameters)
      .map(
        ([key, parameterValue]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(parameterValue)}`,
      )
      .join("&");

    return `${value}${separator}${query}`;
  }
}

/* =========================================================
   YouTube 地址转嵌入地址
========================================================= */

function getYouTubeEmbedUrl(
  sourceUrl: string,
  autoplay: boolean,
) {
  if (sourceUrl.includes("youtube.com/embed/")) {
    return appendUrlParameters(sourceUrl, {
      autoplay: autoplay ? "1" : "0",
      rel: "0",
    });
  }

  const videoId =
    sourceUrl.match(/[?&]v=([^&]+)/)?.[1] ??
    sourceUrl.match(/youtu\.be\/([^?&/]+)/)?.[1] ??
    sourceUrl.match(/youtube\.com\/shorts\/([^?&/]+)/)?.[1];

  if (!videoId) {
    return sourceUrl;
  }

  return `https://www.youtube.com/embed/${videoId}?autoplay=${
    autoplay ? "1" : "0"
  }&rel=0`;
}

/* =========================================================
   Bilibili 地址转嵌入地址
========================================================= */

function getBilibiliEmbedUrl(
  sourceUrl: string,
  autoplay: boolean,
) {
  if (sourceUrl.includes("player.bilibili.com/player.html")) {
    return appendUrlParameters(sourceUrl, {
      autoplay: autoplay ? "1" : "0",
      high_quality: "1",
      danmaku: "0",
    });
  }

  const bvid =
    sourceUrl.match(/(BV[a-zA-Z0-9]+)/)?.[1];

  if (bvid) {
    return (
      `https://player.bilibili.com/player.html?bvid=${bvid}` +
      `&page=1&high_quality=1&danmaku=0&autoplay=${
        autoplay ? "1" : "0"
      }`
    );
  }

  const aid =
    sourceUrl.match(/\/video\/av(\d+)/i)?.[1] ??
    sourceUrl.match(/[?&]aid=(\d+)/i)?.[1];

  if (aid) {
    return (
      `https://player.bilibili.com/player.html?aid=${aid}` +
      `&page=1&high_quality=1&danmaku=0&autoplay=${
        autoplay ? "1" : "0"
      }`
    );
  }

  return sourceUrl;
}

/* =========================================================
   判断教程使用哪一种播放器
========================================================= */

function getGuidePlayerSource(
  guide: InstallationGuideCard | null,
  autoplay: boolean,
): PlayerSource {
  const sourceUrl = String(guide?.videoUrl ?? "").trim();

  if (!sourceUrl) {
    return {
      type: "empty",
      src: "",
    };
  }

  if (guide?.videoPlatform === "youtube") {
    return {
      type: "iframe",
      src: getYouTubeEmbedUrl(sourceUrl, autoplay),
    };
  }

  if (guide?.videoPlatform === "bilibili") {
    return {
      type: "iframe",
      src: getBilibiliEmbedUrl(sourceUrl, autoplay),
    };
  }

  const isDirectVideo =
    sourceUrl.startsWith("/") ||
    /\.(mp4|webm|ogg)(\?.*)?$/i.test(sourceUrl);

  if (isDirectVideo) {
    return {
      type: "video",
      src: sourceUrl,
    };
  }

  return {
    type: "iframe",
    src: sourceUrl,
  };
}

export default function InstallationGuideClient({
  pageData,
}: InstallationGuideClientProps) {
  const [keyword, setKeyword] = useState("");

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
const videoRef =
    useRef<HTMLVideoElement | null>(null);

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
      isChinesePage ? "安装教程" : "Installation Guide",

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

  const currentPlayerText =
    playerText[pageData.locale] ??
    playerText.en;

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

        return matchFilter && matchKeyword;
      },
    );
  }, [
    activeFilter,
    keyword,
    pageData.guides,
  ]);

  /*
   * playRequestId 为 0：
   * 页面首次进入，不自动播放。
   *
   * 大于 0：
   * 用户已经点击卡片，允许自动播放。
   */
  const activePlayerSource = useMemo(
    () =>
      getGuidePlayerSource(
        selectedGuide,
        playRequestId > 0,
      ),
    [selectedGuide, playRequestId],
  );

  /*
   * 本地视频切换后主动播放。
   * 默认 muted，避免浏览器阻止自动播放。
   */
  useEffect(() => {
    if (
      activePlayerSource.type !== "video" ||
      playRequestId === 0
    ) {
      return;
    }

    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    videoElement.load();

    void videoElement.play().catch(() => {
      /*
       * 浏览器禁止自动播放时，
       * 用户仍可通过原生 controls 手动点击播放。
       */
    });
  }, [
    activePlayerSource,
    playRequestId,
  ]);

  /*
   * 打开弹层时：
   * 1. 锁定页面滚动
   * 2. 按 ESC 可以关闭
   * 3. 关闭后恢复页面滚动
   */
  useEffect(() => {
    if (!isPlayerOpen) {
      return;
    }

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleEscapeKey(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        closePlayer();
      }
    }

    window.addEventListener(
      "keydown",
      handleEscapeKey,
    );

    return () => {
      document.body.style.overflow =
        originalOverflow;

      window.removeEventListener(
        "keydown",
        handleEscapeKey,
      );
    };
  }, [isPlayerOpen]);

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
  }

  function closePlayer() {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.pause();
    }

    setIsPlayerOpen(false);
  }

  return (
    <main className="installation-guide-page">
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
          {filteredGuides.length > 0 ? (
            <div className="installation-guide-card-grid">
              {filteredGuides.map(
                (guide: InstallationGuideCard) => {
                  const imageStyle:
                    | CSSProperties
                    | undefined = guide.thumbnail
                    ? {
                        backgroundImage: `url(${guide.thumbnail})`,
                      }
                    : undefined;

                  const isSelected =
                    isPlayerOpen &&
                    selectedGuide?.id === guide.id;
return (
                    <button
                      key={guide.id}
                      type="button"
                      className={`installation-guide-card ${
                        isSelected ? "is-active" : ""
                      }`}
                      onClick={() =>
                        handleGuideClick(guide)
                      }
                      aria-pressed={isSelected}
                    >
                      <div
                        className="installation-guide-card-image"
                        data-guide-id={guide.id}
                        style={imageStyle}
                      >
                        <span
                          className="installation-guide-card-play"
                          aria-hidden="true"
                        ></span>
                      </div>

                      <div className="installation-guide-card-body">
                        <h3>
                          {guide.title}
                        </h3>

                        {guide.tags.length > 0 ? (
                          <div className="installation-guide-card-tags">
                            {guide.tags.map((tag: string) => (
                              <span key={tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        

                        
                      </div>
                    </button>
                  );
                },
              )}
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

      {/* =====================================================
          页面上层视频播放器

          说明：
          1. 使用 fixed 弹层，不占据页面原有位置
          2. 点击遮罩或关闭按钮可关闭
          3. 本地视频保持自身比例，不裁切、不拉伸
      ===================================================== */}

      {isPlayerOpen && selectedGuide ? (
        <div
          className="installation-guide-modal-backdrop"
          onMouseDown={closePlayer}
        >
          <section
            className="installation-guide-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="installation-guide-modal-title"
            onMouseDown={(event) => {
              event.stopPropagation();
            }}
          >
            {/* 关闭按钮 */}
            <button
              type="button"
              className="installation-guide-modal-close"
              onClick={closePlayer}
              aria-label={
                isChinesePage
                  ? "关闭视频"
                  : "Close video"
              }
            >
              <span aria-hidden="true">×</span>
            </button>

            {/* 视频播放器区域 */}
            <div
              className={`installation-guide-modal-stage ${
                activePlayerSource.type === "iframe"
                  ? "is-iframe"
                  : activePlayerSource.type === "video"
                    ? "is-video"
                    : "is-empty"
              }`}
            >
              {activePlayerSource.type === "video" ? (
                <video
                  key={`${selectedGuide.id}-${playRequestId}`}
                  ref={videoRef}
                  className="installation-guide-modal-video"
                  src={activePlayerSource.src}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                />
              ) : null}

              {activePlayerSource.type === "iframe" ? (
                <iframe
                  key={`${selectedGuide.id}-${playRequestId}`}
                  className="installation-guide-modal-iframe"
                  src={activePlayerSource.src}
                  title={selectedGuide.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : null}

              {activePlayerSource.type === "empty" ? (
                <div className="installation-guide-modal-empty">
                  <span aria-hidden="true">
                    ▶
                  </span>

                  <strong>
                    {currentPlayerText.unavailable}
                  </strong>
                </div>
              ) : null}
            </div>

            {/* 视频下方教程主题 */}
            <div className="installation-guide-modal-title">
              <h2 id="installation-guide-modal-title">
                {selectedGuide.title}
              </h2>
            </div>
          </section>
        </div>
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
