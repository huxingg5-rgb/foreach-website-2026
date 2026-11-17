import { assemblyPreviewConfig, type AssemblyPreviewConfig } from "@/data/products/configurator/tubing-assembly-preview";
import type { FlangedTubingChoice } from "@/data/products/configurator/flanged-tubing";

export type AssemblyPreviewRenderer = {
  render: (config: AssemblyPreviewConfig) => Promise<boolean>;
  dispose: () => void;
};
type PreviewModule = {
  createFlangedAssemblyRenderer: (canvas: HTMLCanvasElement) => AssemblyPreviewRenderer;
  preloadFlangedAssembly: (config: AssemblyPreviewConfig) => Promise<void>;
};
let moduleRequest: Promise<PreviewModule> | null = null;

/** One runtime module and its decoded-CAD cache are shared by all assemblies. */
export function loadFlangedAssemblyPreview(): Promise<PreviewModule> {
  if (!moduleRequest) {
    const moduleUrl = "/models/products/tubing-assemblies/flanged-assembly-renderer.mjs?v=17-preview-buffered";
    const request: Promise<PreviewModule> = import(/* webpackIgnore: true */ moduleUrl);
    moduleRequest = request;
    void request.catch(() => { if (moduleRequest === request) moduleRequest = null; });
  }
  return moduleRequest;
}

export async function preloadFlangedAssemblyPreview(choice: FlangedTubingChoice): Promise<void> {
  const runtime = await loadFlangedAssemblyPreview();
  await runtime.preloadFlangedAssembly(assemblyPreviewConfig(choice));
}

/** Prepare only this entry's defaults, after foreground page work has settled.
 * Data-saving/slow connections keep the normal on-demand loading path. */
export function scheduleFlangedAssemblyPreview(choice: FlangedTubingChoice): () => void {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || "")) return () => undefined;
  let canceled = false, idle: number | undefined, timer: number | undefined;
  function run() { if (!canceled) void preloadFlangedAssemblyPreview(choice).catch(() => undefined); }
  function schedule() {
    if (document.visibilityState === "hidden") return;
    document.removeEventListener("visibilitychange", schedule);
    if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(run);
    else timer = window.setTimeout(run, 1200);
  }
  if (document.visibilityState === "hidden") document.addEventListener("visibilitychange", schedule);
  else schedule();
  return () => {
    canceled = true;
    document.removeEventListener("visibilitychange", schedule);
    if (idle !== undefined) window.cancelIdleCallback(idle);
    if (timer !== undefined) window.clearTimeout(timer);
  };
}
