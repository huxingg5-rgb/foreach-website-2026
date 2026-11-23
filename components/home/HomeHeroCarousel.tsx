"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { homeI18n, replacePathLocale, type LocaleCode } from "@/lib/i18n";
import { homeHeroText } from "@/data/home-hero.intl";
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

export default function HomeHeroCarousel({ locale }: { locale: LocaleCode }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [transition, setTransition] = useState<{ from: number; to: number } | null>(null);
  const [queued, setQueued] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);
  const reduceMotion = useSyncExternalStore(subscribeMotion, reducedMotionSnapshot, () => false);
  const pageVisible = useSyncExternalStore(subscribeVisibility, visibilitySnapshot, () => true);
  const ready = useSyncExternalStore(subscribeReady, () => true, () => false);
  const copy = homeI18n[locale];
  const heroText = homeHeroText[locale];
  const mainCopy = { titleLine1: copy.heroTitleLine1, titleLine2: copy.heroTitleLine2, description: copy.heroSubtitle };
  const tubingCopy = {
    titleLine1: heroText.tubing.titleLine1,
    titleLine2: heroText.tubing.titleLine2,
    description: [heroText.tubing.descriptionLine1, heroText.tubing.descriptionLine2].join(locale === "zh-CN" ? "" : " "),
  };
  const uiText = homeUiText[locale];
  const slideNames = heroText.slideNames;

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
    if (paused || hovered || focused || !inView || !pageVisible || reduceMotion || transition || queued !== null) return;
    // The tubing slide has time to demonstrate the three steps and hold the result.
    const timer = window.setTimeout(() => selectSlide((active + 1) % 3), active === 1 ? 10000 : 5000);
    return () => window.clearTimeout(timer);
  }, [active, focused, hovered, inView, pageVisible, paused, queued, reduceMotion, selectSlide, transition]);

  const pauseForInteraction = useCallback(() => setPaused(true), []);
  const requested = queued ?? transition?.to ?? active;

  function slideProperties(index: number) {
    const offset = transition ? index === transition.to ? 0 : index === transition.from ? -100 : 100 : index === active ? 0 : 100;
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
        {...mainCopy}
        alignWith={{ variant: "main", copy: tubingCopy }}
        primaryHref={replacePathLocale("/products/", locale)}
        primaryLabel={copy.productButton}
        secondaryHref={replacePathLocale("/contact/", locale)}
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
        titleLine1={heroText.flow.titleLine1}
        titleLine2={heroText.flow.titleLine2 || undefined}
        description={heroText.flow.description}
        primaryHref={replacePathLocale("/resources/calculators/fluid-resistance/", locale)}
        primaryLabel={heroText.flow.button}
        secondaryHref={replacePathLocale("/contact/", locale)}
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
