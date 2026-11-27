"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type PointerEvent } from "react";
import { homeI18n } from "@/lib/i18n";
import { getHomeHeroHref, homeHeroMainDe, homeHeroMainHi, homeHeroMainIt, homeHeroText, type HomeHeroLocale } from "@/data/home-hero.intl";
import { homeCarouselRole, homeUiText } from "@/data/home-ui.intl";
import HomeHeroCopy from "./HomeHeroCopy";
import HomeTubingAssemblySlide from "./HomeTubingAssemblySlide";
import styles from "./HomeHeroCarousel.module.css";

const TRANSITION_MS = 650;

function subscribeMotion(update: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
}
function reducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function subscribeVisibility(update: () => void) {
  document.addEventListener("visibilitychange", update);
  return () => document.removeEventListener("visibilitychange", update);
}
function visibilitySnapshot() { return document.visibilityState === "visible"; }
const subscribeReady = () => () => {};

export default function HomeHeroCarousel({ locale }: { locale: HomeHeroLocale }) {
  const root = useRef<HTMLElement>(null);
  const swipeStart = useRef<{ pointerId: number; x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const [transition, setTransition] = useState<{ from: number; to: number } | null>(null);
  const [queued, setQueued] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [inView, setInView] = useState(true);
  const reduceMotion = useSyncExternalStore(subscribeMotion, reducedMotionSnapshot, () => false);
  const pageVisible = useSyncExternalStore(subscribeVisibility, visibilitySnapshot, () => true);
  const ready = useSyncExternalStore(subscribeReady, () => true, () => false);
  const copy = locale === "de" ? homeHeroMainDe : locale === "it" ? homeHeroMainIt : locale === "hi" ? homeHeroMainHi : homeI18n[locale];
  const contactHref = getHomeHeroHref("/contact/", locale);
  const heroText = homeHeroText[locale];
  const mainCopy = { titleLine1: copy.heroTitleLine1, titleLine2: copy.heroTitleLine2, description: copy.heroSubtitle };
  const tubingCopy = {
    titleLine1: heroText.tubing.titleLine1,
    titleLine2: heroText.tubing.titleLine2,
    description: [heroText.tubing.descriptionLine1, heroText.tubing.descriptionLine2].join(locale === "zh-CN" ? "" : " "),
  };
  const uiText = homeUiText[locale];
  const slideNames = heroText.slideNames;
  const slideCount = slideNames.length;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  const selectSlide = useCallback((next: number) => {
    if (transition) { setQueued(next); return; }
    if (next === active) return;
    if (reduceMotion) { setActive(next); return; }
    setTransition({ from: active, to: next });
  }, [active, reduceMotion, transition]);

  const finishTransition = useCallback(() => {
    if (!transition) return;
    setActive(transition.to);
    setTransition(null);
  }, [transition]);

  useEffect(() => {
    if (!transition) return;
    const timer = window.setTimeout(finishTransition, TRANSITION_MS + 100);
    return () => window.clearTimeout(timer);
  }, [finishTransition, transition]);

  useEffect(() => {
    if (queued === null || transition) return;
    const frame = window.requestAnimationFrame(() => { setQueued(null); selectSlide(queued); });
    return () => window.cancelAnimationFrame(frame);
  }, [queued, selectSlide, transition]);

  useEffect(() => {
    if (paused || hovered || focused || touching || !inView || !pageVisible || reduceMotion || transition || queued !== null) return;
    // The tubing slide has time to demonstrate the three steps and hold the result.
    const timer = window.setTimeout(() => selectSlide((active + 1) % slideCount), active === 1 ? 10000 : 5000);
    return () => window.clearTimeout(timer);
  }, [active, focused, hovered, inView, pageVisible, paused, queued, reduceMotion, selectSlide, slideCount, touching, transition]);

  const pauseForInteraction = useCallback(() => setPaused(true), []);
  const requested = queued ?? transition?.to ?? active;

  function handleSwipeStart(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "touch" || !event.isPrimary || !window.matchMedia("(max-width: 1000px)").matches) return;
    if ((event.target as Element).closest("a, button, input, label, select, textarea")) return;
    swipeStart.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
    setTouching(true);
  }

  function clearSwipe(event: PointerEvent<HTMLElement>) {
    const start = swipeStart.current;
    if (start?.pointerId !== event.pointerId) return;
    swipeStart.current = null;
    setTouching(false);
    return start;
  }

  function handleSwipeEnd(event: PointerEvent<HTMLElement>) {
    const start = clearSwipe(event);
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < 44 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
    const step = dx < 0 ? 1 : -1;
    setPaused(false);
    selectSlide((requested + step + slideCount) % slideCount);
  }

  function slideProperties(index: number) {
    const next = (active + 1) % slideCount;
    let offset = index === active ? 0 : index === next ? 100 : -100;
    if (transition?.to === index) offset = 0;
    if (transition?.from === index) offset = transition.to === next ? -100 : 100;
    return {
      className: `${styles.panel} home-hero-slide${index === 0 ? " home-hero-product-slide" : index === 2 ? " home-hero-fluid-resistance-slide" : ""}`,
      "aria-hidden": index !== active || Boolean(transition),
      inert: index !== active || Boolean(transition),
      "data-home-slide": index,
      style: {
        transform: `translate3d(${offset}%, 0, 0)`,
        transition: transition && (index === transition.from || index === transition.to) ? `transform ${TRANSITION_MS}ms cubic-bezier(.22,1,.36,1)` : "none",
      },
      onTransitionEnd: (event: React.TransitionEvent<HTMLElement>) => {
        if (event.target === event.currentTarget && event.propertyName === "transform") finishTransition();
      },
    };
  }

  return <section ref={root} className={`${styles.root} home-hero-scroll-shell`} lang={locale} role="region" aria-roledescription={homeCarouselRole[locale]} aria-label={uiText.banners}
    data-home-active-banner={active} data-home-header-theme={requested === 1 ? "light" : "dark"} data-home-carousel-paused={paused}
    onPointerDown={handleSwipeStart} onPointerUp={handleSwipeEnd} onPointerCancel={clearSwipe}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)}
    onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}>
    <article {...slideProperties(0)} aria-label={slideNames[0]}>
      <Image src="/images/home/home-hero-final-banner.webp" alt="" fill priority sizes="100vw" className={styles.background} />
      <div className={styles.mediaShade} />
      <HomeHeroCopy
        className="home-hero-primary-copy"
        heading="h1"
        analyticsSection="home_hero_main"
        italian={locale === "it"}
        hindi={locale === "hi"}
        {...mainCopy}
        alignWith={{ variant: "main", copy: tubingCopy }}
        primaryHref={getHomeHeroHref("/products/", locale)}
        primaryLabel={copy.productButton}
        secondaryHref={contactHref}
        secondaryLabel={copy.contactButton}
      />
    </article>
    <article {...slideProperties(1)} aria-label={slideNames[1]}>
      <HomeTubingAssemblySlide locale={locale} heroCopy={tubingCopy} mainCopy={mainCopy} active={active === 1 && !transition && inView && pageVisible}
        reduceMotion={reduceMotion} onInteraction={pauseForInteraction} />
    </article>
    <article {...slideProperties(2)} aria-label={slideNames[2]}>
      <Image src="/images/home/eas-home-scroll-static.webp" alt="" fill sizes="100vw" className={styles.background} />
      <div className={styles.mediaShade} />
      <HomeHeroCopy
        className="home-hero-primary-copy"
        heading="h2"
        analyticsSection="home_hero_fluid_resistance"
        italian={locale === "it"}
        hindi={locale === "hi"}
        titleLine1={heroText.flow.titleLine1}
        titleLine2={heroText.flow.titleLine2 || undefined}
        description={heroText.flow.description}
        primaryHref={getHomeHeroHref("/resources/calculators/fluid-resistance/", locale)}
        primaryLabel={heroText.flow.button}
        secondaryHref={contactHref}
        secondaryLabel={copy.contactButton}
      />
    </article>
    <div className={styles.pagination} data-on-white={requested === 1} role="group" aria-label={uiText.chooseBanner}>
      {slideNames.map((name, index) => <button key={name} type="button" className={styles.dot}
        disabled={!ready}
        aria-label={`${uiText.showBanner(index + 1)}${locale === "zh-CN" ? "：" : ": "}${name}`} aria-current={requested === index ? "true" : undefined}
        data-active={requested === index}
        data-analytics-section="home_hero"
        data-analytics-hero-action={requested === index ? undefined : ["slide_main", "slide_tubing_assembly", "slide_fluid_resistance"][index]}
        onClick={() => { if (index !== active) setPaused(false); selectSlide(index); }}><span /></button>)}
    </div>
  </section>;
}
