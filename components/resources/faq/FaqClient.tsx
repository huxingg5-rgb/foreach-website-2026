"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import SitePageShell from "@/components/layout/SitePageShell";
import ResourceCategorySidebar from "@/components/resources/ResourceCategorySidebar";
import ResourceSearchBar from "@/components/resources/ResourceSearchBar";
import ResourcePagination from "@/components/resources/ResourcePagination";
import ResourceSupportCta from "@/components/resources/ResourceSupportCta";
import ContactInquiryModal from "@/components/contact/ContactInquiryModal";
import { trackBeginInquiry } from "@/lib/analytics/track-event";
import { faqSnippet, matchesFaq } from "@/data/resources/faq/faq-search";
import type { FaqPageData } from "@/data/resources/faq/faq-page";
import styles from "./FaqClient.module.css";

const pageSize = 12;
const changeEvent = "foreach-faq-location";
function subscribe(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener("hashchange", listener);
  window.addEventListener(changeEvent, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener("hashchange", listener);
    window.removeEventListener(changeEvent, listener);
  };
}
const getLocation = () => window.location.search + window.location.hash;
const getServerLocation = () => "";

export default function FaqClient({ items, categories: faqCategories, locale, ui, title, path, contactData, productTypeByCategory, requestTypes }: FaqPageData) {
  const countLabel = (count: number) => locale === "zh-CN" ? `（${count}）` : ` (${count})`;
  const location = useSyncExternalStore(subscribe, getLocation, getServerLocation);
  const params = useMemo(() => new URLSearchParams(location.split("#")[0]), [location]);
  const hashId = location.split("#")[1] ?? "";
  const query = params.get("q") ?? "";
  const requestedCategory = params.get("category") ?? "all";
  const category = faqCategories.some((group) => group.key === requestedCategory || group.children.some((child) => child.key === requestedCategory)) ? requestedCategory : "all";
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<{ location: string; id: string | null } | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactHasDraft, setContactHasDraft] = useState(false);
  const [contactDefaults, setContactDefaults] = useState<{ requestType: string; productType: string } | null>(null);
  const openQuestionId = openQuestion?.location === location ? openQuestion.id : hashId;

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const item of items) {
      result[item.category] = (result[item.category] ?? 0) + 1;
      result[item.subcategory] = (result[item.subcategory] ?? 0) + 1;
    }
    return result;
  }, [items]);
  const activeGroup = faqCategories.find((group) => group.key === category || group.children.some((child) => child.key === category));
  const categoryLabel = activeGroup?.children.find((child) => child.key === category)?.label ?? activeGroup?.label ?? ui.all;
  const filtered = useMemo(() => items.filter((item) => (
    (category === "all" || item.category === category || item.subcategory === category) &&
    matchesFaq(item, query, faqCategories)
  )), [items, category, query, faqCategories]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const requestedPage = Number(params.get("page") ?? "1");
  const linkedIndex = filtered.findIndex((item) => item.id === hashId);
  const currentPage = linkedIndex >= 0 ? Math.floor(linkedIndex / pageSize) + 1 :
    Math.min(totalPages, Number.isSafeInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1);

  function update(values: Record<string, string | null>, replace = false, hash = "") {
    const next = new URLSearchParams(params);
    next.delete("tag");
    for (const [key, value] of Object.entries(values)) {
      if (value) next.set(key, value); else next.delete(key);
    }
    const search = next.toString();
    const url = `${path}${search ? `?${search}` : ""}${hash ? `#${hash}` : ""}`;
    window.history[replace ? "replaceState" : "pushState"](null, "", url);
    window.dispatchEvent(new Event(changeEvent));
  }
  function selectCategory(key: string, group?: string) {
    update({ category: key === "all" ? null : key, page: null });
    setExpandedGroup(group ?? (expandedGroup === key ? null : key));
    if (group || key === "all") setMobileFiltersOpen(false);
  }
  function clearFilters() {
    update({ category: null, q: null, page: null });
    setExpandedGroup(null);
  }

  function openContact() {
    if (!contactDefaults) {
      setContactDefaults({
        requestType: activeGroup?.key === "support" || activeGroup?.key === "quality"
          ? requestTypes.support : requestTypes.technical,
        productType: productTypeByCategory[category] ?? productTypeByCategory[activeGroup?.key ?? ""] ?? "",
      });
    }
    setContactOpen(true);
    trackBeginInquiry({
      formId: "contact_inquiry_form", formType: "general_inquiry",
      sourceSection: "faq_contact_support", locale,
    });
  }

  return (
    <main className={styles.page} data-locale={locale}>
      <h1 className={styles.pageTitle}>{title}</h1>
      <SitePageShell breadcrumbAriaLabel={ui.breadcrumb} breadcrumbItems={[{ label: ui.home, href: locale === "zh-CN" ? "/" : `/${locale}/` }, { label: ui.resources }, { label: title }]}>
      <ResourceSearchBar
        value={query}
        onChange={(value) => update({ q: value || null, page: null }, true)}
        onSearch={(value) => { update({ q: value.trim() || null, page: null }, true); setMobileFiltersOpen(false); }}
        placeholder={ui.searchPlaceholder}
        searchButtonText={ui.search}
        showRecentKeywords={false}
        historyLocale={locale}
      />
      <section className={styles.content}>
        <div className={styles.filterColumn}>
          <button type="button" className={styles.mobileFilterToggle} aria-expanded={mobileFiltersOpen} aria-controls="faq-categories" onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}>
            {ui.categories} · {categoryLabel}<span aria-hidden="true">{mobileFiltersOpen ? "−" : "+"}</span>
          </button>
          <div id="faq-categories" className={styles.sidebar} data-open={mobileFiltersOpen}>
            <h2 className={styles.sidebarTitle}>
              <button type="button" className={styles.allButton} aria-pressed={category === "all"} onClick={() => selectCategory("all")}>{ui.all}{countLabel(items.length)}</button>
            </h2>
            {(["产品问题", "服务支持"] as const).map((section) => (
              <ResourceCategorySidebar key={section} collapsible title={section === "服务支持" ? ui.services : ui.products} items={faqCategories.filter((group) => group.section === section && counts[group.key]).map((group) => ({
                id: group.key, label: group.label, countLabel: countLabel(counts[group.key]),
                active: category === group.key,
                expanded: expandedGroup === group.key || group.children.some((child) => child.key === category),
                onSelect: () => selectCategory(group.key),
                children: group.children.filter((child) => counts[child.key]).map((child) => ({
                  id: child.key, label: child.label, countLabel: countLabel(counts[child.key]),
                  active: category === child.key, onSelect: () => selectCategory(child.key, group.key),
                })),
              }))} />
            ))}
          </div>
        </div>
        <div className={styles.main} id="faq-results">
          {filtered.length ? (
            <>
              <div className={styles.questions}>
                {filtered.map((item, index) => {
                  const group = faqCategories.find((value) => value.key === item.category)!;
                  const child = group.children.find((value) => value.key === item.subcategory)!;
                  const isOpen = item.id === openQuestionId;
                  const isVisible = Math.floor(index / pageSize) + 1 === currentPage;
                  return (
                    <article key={item.id} id={item.id} className={styles.question} hidden={!isVisible}>
                      <h3>
                        <button type="button" id={`${item.id}-trigger`} className={styles.trigger} aria-expanded={isOpen} aria-controls={`${item.id}-answer`} onClick={() => setOpenQuestion({ location, id: isOpen ? null : item.id })}>
                          <span><span className={styles.categoryPath}>{group.label} / {child.label}</span><span className={styles.questionText}>{item.question}</span></span>
                          <span className={styles.toggle} aria-hidden="true">{isOpen ? "−" : "+"}</span>
                        </button>
                      </h3>
                      {query && !isOpen && <p className={styles.snippet}>{faqSnippet(item, query)}</p>}
                      <div className={styles.answer} id={`${item.id}-answer`} role="region" aria-labelledby={`${item.id}-trigger`} hidden={!isOpen}>
                        {item.answer.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                        <div className={styles.answerFooter}>
                          <div className={styles.links}>{item.links.map((link) => <Link prefetch={false} key={link.href} href={link.href}>{link.label}</Link>)}</div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
              <ResourcePagination currentPage={currentPage} totalPages={totalPages} ariaLabel={ui.pagination} previousLabel={ui.previous} nextLabel={ui.next} onPageChange={(page) => {
                update({ page: page === 1 ? null : String(page) });
                document.getElementById("faq-results")?.scrollIntoView({ behavior: "auto", block: "start" });
              }} />
            </>
          ) : (
            <div className={styles.empty}>
              <h3>{ui.emptyTitle}</h3>
              <p>{ui.emptyDescription}</p>
              <button type="button" onClick={clearFilters}>{ui.clear}</button>
              <button type="button" aria-haspopup="dialog" onClick={openContact}>{ui.contact}</button>
            </div>
          )}
        </div>
      </section>
      <ResourceSupportCta title={ui.ctaTitle} description={ui.ctaDescription} buttonText={ui.contact} onAction={openContact} />
      </SitePageShell>
      {contactDefaults && (
        <ContactInquiryModal
          isOpen={contactOpen}
          onClose={() => {
            setContactOpen(false);
            if (!contactHasDraft) setContactDefaults(null);
          }}
          onDraftStart={() => setContactHasDraft(true)}
          onComplete={() => {
            setContactOpen(false);
            setContactHasDraft(false);
            setContactDefaults(null);
          }}
          data={contactData}
          locale={locale}
          initialValues={contactDefaults}
          analyticsSourceSection="faq_contact_support"
        />
      )}
    </main>
  );
}
