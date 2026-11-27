import { getItalianDraftLink, italianEnglishFallbackSuffix } from "@/lib/i18n/draft-languages";
import copy from "./installation-guide-copy.it.json";
import type { InstallationGuidePageData } from "./installation-guide.types";
import type { VideoGuideDetail, VideoGuideLink } from "./video-guide-detail.types";

type ItalianGuideCopy = Omit<Partial<VideoGuideDetail>, "sections" | "highlights"> & {
  highlights: readonly { title: string; description: string }[];
  sections?: readonly { title: string; paragraphs: readonly string[]; links?: readonly Pick<VideoGuideLink, "title">[] }[];
};
const guideCopy: Partial<Record<string, ItalianGuideCopy>> = copy.videos;
const tags: Readonly<Record<string, string>> = copy.tags;
const productTitles: Readonly<Record<string, string>> = copy.productTitles;
const articleTitles: Readonly<Record<string, string>> = copy.articleTitles;
const articleFallbackSummaries: Readonly<Partial<Record<string, string>>> = copy.articleFallbackSummaries;
export const italianInstallationGuideSlugs = Object.keys(guideCopy);
export const italianVideoGuideUi = copy.ui;

export function getItalianVideoGuideTitle(id: string) {
  return guideCopy[id]?.title;
}

function italianVideoEmbed(url: string) {
  const embed = new URL(url);
  embed.searchParams.set("hl", "it");
  embed.searchParams.set("cc_lang_pref", "it");
  return embed.href;
}

export function getItalianGuideLink(source: VideoGuideLink, title = productTitles[source.title] ?? source.title, markEnglish = true): VideoGuideLink {
  const videoSlug = source.href.match(/^\/en\/resources\/installation-guide\/([^/?#]+)(?:[/?#]|$)/)?.[1];
  const link = videoSlug && italianInstallationGuideSlugs.includes(videoSlug)
    ? { href: source.href.replace(/^\/en(?=\/)/, "/it"), hrefLang: "it" as const }
    : getItalianDraftLink(source.href);
  return { title: title + (markEnglish && link.hrefLang === "en" ? italianEnglishFallbackSuffix : ""), href: link.href, hrefLang: link.hrefLang };
}

export function getItalianGuideFallbackArticleCopy(slug: string, title: string) {
  const summary = articleFallbackSummaries[slug];
  const translatedTitle = articleTitles[title];
  return summary && translatedTitle ? { summary, title: translatedTitle } : undefined;
}

export function getItalianVideoGuideDetail(base: VideoGuideDetail | undefined): VideoGuideDetail | undefined {
  if (!base) return undefined;
  const translation = guideCopy[base.id];
  if (!translation) return undefined;
  const { sections, highlights, ...text } = translation;
  return {
    ...base, ...text, locale: "it",
    detailHref: base.detailHref.replace(/^\/en(?=\/)/, "/it"),
    embedUrl: italianVideoEmbed(base.embedUrl),
    highlights: base.highlights.map((item, index) => ({ ...item, ...highlights[index] })),
    sections: base.sections?.map((section, index) => ({
      ...section, ...sections?.[index],
      links: section.links?.map((link, linkIndex) => getItalianGuideLink(link, sections?.[index]?.links?.[linkIndex]?.title)),
    })),
    products: base.products.map(link => getItalianGuideLink(link)),
    seriesLink: base.seriesLink ? getItalianGuideLink(base.seriesLink) : undefined,
  };
}

export function getItalianInstallationGuidePageData(english: InstallationGuidePageData): InstallationGuidePageData {
  const { hero, search, sidebar, support } = copy.hub;
  return {
    ...english, locale: "it", hero, search,
    ui: {
      breadcrumbAriaLabel: "Percorso di navigazione", breadcrumbHome: italianVideoGuideUi.home, breadcrumbResources: "Risorse",
      breadcrumbCurrent: italianVideoGuideUi.guides, productCategory: "Categoria di prodotto", tags: "Tag",
      emptyTitle: "Nessuna guida corrispondente", emptyDescription: "Prova un’altra parola chiave o scegli un’altra serie di prodotti.",
    },
    sidebar: { title: sidebar.title, tree: english.sidebar.tree.map((item, index) => ({
      ...item, name: sidebar.tree[index].name,
      children: item.children.map((child, childIndex) => ({ ...child, name: sidebar.tree[index].children?.[childIndex]?.name ?? child.name })),
    })) },
    support: { ...support, href: "/it/contact/" },
    guides: english.guides.flatMap(guide => {
      const translation = guideCopy[guide.id];
      if (!translation?.title || !translation.description) return [];
      const title = translation.title;
      const guideTags = guide.tags.map(tag => tags[tag] ?? tag);
      return [{ ...guide, title, description: translation.description, tags: guideTags,
        detailHref: guide.detailHref?.replace(/^\/en(?=\/)/, "/it"),
        keywords: [...new Set([title, ...guideTags, ...translation.highlights.map(item => item.title), ...guide.keywords])],
        videoUrl: guide.videoUrl?.startsWith("https://www.youtube.com/embed/") ? italianVideoEmbed(guide.videoUrl) : guide.videoUrl,
      }];
    }),
  };
}
