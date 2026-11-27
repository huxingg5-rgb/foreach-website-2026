import { getHindiDraftLink, hindiEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import copy from "./installation-guide-copy.hi.json";
import type { InstallationGuidePageData } from "./installation-guide.types";
import type { VideoGuideDetail, VideoGuideLink } from "./video-guide-detail.types";

type GuideCopy = Omit<Partial<VideoGuideDetail>, "sections" | "highlights"> & {
  highlights: readonly { title: string; description: string }[];
  sections?: readonly { title: string; paragraphs: readonly string[]; links?: readonly Pick<VideoGuideLink, "title">[] }[];
};
const guideCopy: Partial<Record<string, GuideCopy>> = copy.videos;
const tags: Readonly<Record<string, string>> = copy.tags;
const productTitles: Readonly<Record<string, string>> = copy.productTitles;
const articleTitles: Readonly<Record<string, string>> = copy.articleTitles;
export const hindiInstallationGuideSlugs = Object.keys(guideCopy);
export const hindiVideoGuideUi = copy.ui;

export function getHindiVideoGuideTitle(id: string) {
  return guideCopy[id]?.title;
}

function hindiVideoEmbed(url: string) {
  const embed = new URL(url);
  if (/(^|\.)youtube(?:-nocookie)?\.com$/.test(embed.hostname)) {
    embed.searchParams.set("hl", "hi");
    embed.searchParams.set("cc_lang_pref", "hi");
  }
  return embed.href;
}

export function getHindiGuideLink(source: VideoGuideLink, title = productTitles[source.title] ?? source.title, markEnglish = true): VideoGuideLink {
  const link = getHindiDraftLink(source.href);
  return { title: title + (markEnglish && link.hrefLang === "en" ? hindiEnglishFallbackSuffix : ""), href: link.href, hrefLang: link.hrefLang };
}

export function getHindiGuideArticleTitle(title: string) {
  return articleTitles[title] ?? title;
}

export function getHindiVideoGuideDetail(base: VideoGuideDetail | undefined): VideoGuideDetail | undefined {
  if (!base) return undefined;
  const translation = guideCopy[base.id];
  if (!translation) return undefined;
  const { sections, highlights, ...text } = translation;
  return {
    ...base, ...text, locale: "hi",
    detailHref: base.detailHref.replace(/^\/en(?=\/)/, "/hi"),
    embedUrl: hindiVideoEmbed(base.embedUrl),
    highlights: base.highlights.map((item, index) => ({ ...item, ...highlights[index] })),
    sections: base.sections?.map((section, index) => ({
      ...section, ...sections?.[index],
      links: section.links?.map((link, linkIndex) => getHindiGuideLink(link, sections?.[index]?.links?.[linkIndex]?.title)),
    })),
    products: base.products.map(link => getHindiGuideLink(link)),
    seriesLink: base.seriesLink ? getHindiGuideLink(base.seriesLink) : undefined,
  };
}

export function getHindiInstallationGuidePageData(english: InstallationGuidePageData): InstallationGuidePageData {
  const { hero, search, sidebar, support } = copy.hub;
  const contact = getHindiDraftLink("/en/contact/");
  return {
    ...english, locale: "hi", hero, search,
    ui: {
      breadcrumbAriaLabel: "पेज का नेविगेशन पथ", breadcrumbHome: hindiVideoGuideUi.home, breadcrumbResources: "संसाधन",
      breadcrumbCurrent: hindiVideoGuideUi.guides, productCategory: "उत्पाद श्रेणी", tags: "कीवर्ड",
      emptyTitle: "मेल खाने वाली कोई गाइड नहीं मिली", emptyDescription: "दूसरा शब्द खोजें या दूसरी उत्पाद श्रृंखला चुनें।",
    },
    sidebar: { title: sidebar.title, tree: english.sidebar.tree.map((item, index) => ({
      ...item, name: sidebar.tree[index].name,
      children: item.children.map((child, childIndex) => ({ ...child, name: sidebar.tree[index].children?.[childIndex]?.name ?? child.name })),
    })) },
    support: {
      ...support, href: contact.href,
      buttonText: support.buttonText + (contact.hrefLang === "en" ? hindiEnglishFallbackSuffix : ""),
    },
    guides: english.guides.flatMap(guide => {
      const translation = guideCopy[guide.id];
      if (!translation?.title || !translation.description) return [];
      const { title, description } = translation;
      const guideTags = guide.tags.map(tag => tags[tag] ?? tag);
      return [{ ...guide, title, description, tags: guideTags,
        detailHref: guide.detailHref?.replace(/^\/en(?=\/)/, "/hi"),
        keywords: [...new Set([title, ...guideTags, ...translation.highlights.map(item => item.title), ...guide.keywords])],
        videoUrl: guide.videoUrl?.startsWith("https://www.youtube.com/embed/") ? hindiVideoEmbed(guide.videoUrl) : guide.videoUrl,
      }];
    }),
  };
}
