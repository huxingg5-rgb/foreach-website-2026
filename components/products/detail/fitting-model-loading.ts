/** Defer a fitting viewer until the current page's initial resources have
 * loaded and the browser has an idle slot. Manual activation can cancel this
 * schedule; a hidden tab waits until it becomes visible. No model is fetched
 * here: the single existing viewer owns its request and cache. */
export function scheduleFittingModelLoad(
  start: () => void,
  host: Window = window,
  page: Document = document,
): () => void {
  let stopped = false;
  let queued = false;
  let idle: number | undefined;
  let timer: number | undefined;
  const cancelQueued = () => {
    if (idle !== undefined) host.cancelIdleCallback(idle);
    if (timer !== undefined) host.clearTimeout(timer);
    idle = timer = undefined;
    queued = false;
  };
  const stop = () => {
    stopped = true;
    cancelQueued();
    host.removeEventListener("load", schedule);
    page.removeEventListener("visibilitychange", schedule);
  };
  const begin = () => {
    queued = false;
    idle = timer = undefined;
    if (stopped || page.hidden) return;
    stop();
    start();
  };
  function schedule() {
    if (stopped) return;
    if (page.hidden) { cancelQueued(); return; }
    if (page.readyState !== "complete" || queued) return;
    queued = true;
    if (typeof host.requestIdleCallback === "function") {
      idle = host.requestIdleCallback(begin, { timeout: 2500 });
    } else {
      timer = host.setTimeout(begin, 200);
    }
  }
  host.addEventListener("load", schedule);
  page.addEventListener("visibilitychange", schedule);
  schedule();
  return stop;
}

/** Downloading and rendering have separate lifetimes. An offscreen viewer
 * remains mounted to reuse the downloaded model, while its rendering loop and
 * first-frame timeout are paused via the existing `active` prop. */
export function observeFittingModelActivity(
  element: Element,
  change: (active: boolean) => void,
  host: Window = window,
  page: Document = document,
): () => void {
  let stopped = false;
  let visible = false;
  let timer: number | undefined;
  const publish = () => { if (!stopped) change(visible && !page.hidden); };
  const Observer = (host as Window & { IntersectionObserver?: typeof IntersectionObserver }).IntersectionObserver;
  const observer = Observer ? new Observer(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    publish();
  }) : null;
  if (observer) observer.observe(element);
  else timer = host.setTimeout(() => { visible = true; publish(); }, 0);
  page.addEventListener("visibilitychange", publish);
  return () => {
    stopped = true;
    observer?.disconnect();
    if (timer !== undefined) host.clearTimeout(timer);
    page.removeEventListener("visibilitychange", publish);
  };
}
